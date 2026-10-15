import type { Lang } from "../i18n/translations"

const SITE_NAME = "Huisklusdienst"

/** Map our internal lang codes to valid BCP-47 attribute values. */
const OG_LOCALE: Record<Lang, string> = { nl: "nl_NL", en: "en_GB", uk: "uk_UA", ru: "ru_RU" }

const HTML_LANG: Record<Lang, string> = {
  nl: "nl",
  en: "en",
  uk: "uk",
  ru: "ru",
}

/**
 * Canonicals must point at the production host, never at whichever preview or
 * staging domain happens to serve the page. The build injects the same value
 * the prerenderer uses (SITE_ORIGIN → VITE_SITE_ORIGIN); without it no
 * canonical is written at all.
 */
export function siteOrigin(): string {
  try {
    return String(import.meta.env.VITE_SITE_ORIGIN ?? "").trim().replace(/\/+$/, "")
  } catch {
    return ""
  }
}

/** Staging and preview builds set SITE_INDEXING=false to keep out of search. */
export function siteIndexable(): boolean {
  try {
    return String(import.meta.env.VITE_SITE_INDEXING ?? "true") !== "false"
  } catch {
    return true
  }
}

export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "")
  const origin = siteOrigin()
  return clean ? `${origin}/${clean}/` : `${origin}/`
}

/**
 * Absolute URL for structured data, or "" when no origin is configured.
 * Page paths get a trailing slash; file paths (with an extension) do not.
 */
export function siteUrl(path: string): string {
  const origin = siteOrigin()
  if (!origin) return ""
  const clean = path.replace(/^\/+|\/+$/g, "")
  if (!clean) return `${origin}/`
  return /\.[a-z0-9]+$/i.test(clean) ? `${origin}/${clean}` : `${origin}/${clean}/`
}

function upsertMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export interface PageMeta {
  title: string
  description: string
  /** Path fragment used for the canonical URL, e.g. "diensten/renovatie". */
  path: string
  /** False for pages that exist but should not be offered to search engines. */
  indexable?: boolean
  /** False for pages that must not declare a canonical (the 404 page). */
  canonical?: boolean
}

export function pageTitle(title: string): string {
  return title ? `${title} · ${SITE_NAME}` : SITE_NAME
}

/** Sync <title>, meta description, robots and canonical for the active page. */
export function applyPageMeta(
  lang: Lang,
  { title, description, path, indexable = true, canonical: withCanonical = true }: PageMeta,
) {
  const fullTitle = pageTitle(title)
  document.title = fullTitle
  document.documentElement.lang = HTML_LANG[lang]

  const canonical = canonicalUrl(path)
  const origin = siteOrigin()

  upsertMeta('meta[name="description"]', "name", "description", description)
  upsertMeta(
    'meta[name="robots"]',
    "name",
    "robots",
    indexable && siteIndexable() ? "index, follow" : "noindex, follow",
  )
  upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle)
  upsertMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    description,
  )
  upsertMeta('meta[property="og:type"]', "property", "og:type", "website")
  if (withCanonical && origin) {
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical)
  }
  upsertMeta(
    'meta[property="og:locale"]',
    "property",
    "og:locale",
    OG_LOCALE[lang],
  )

  const existing = document.head.querySelector('link[rel="canonical"]')
  if (withCanonical && origin) upsertLink("canonical", canonical)
  else existing?.remove()
}
