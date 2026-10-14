import type { Lang } from "../i18n/translations"

const SITE_NAME = "Bouwvast"

/** Map our internal lang codes to valid BCP-47 attribute values. */
const HTML_LANG: Record<Lang, string> = {
  nl: "nl",
  en: "en",
  uk: "uk",
  ru: "ru",
}

/**
 * Canonicals must point at the production host, not at whichever preview or
 * staging domain happens to serve the page. Falls back to the current origin
 * until VITE_SITE_ORIGIN is configured.
 */
export function siteOrigin(): string {
  let configured = ""
  try {
    configured = String(import.meta.env.VITE_SITE_ORIGIN ?? "").trim()
  } catch {
    configured = ""
  }
  if (configured) return configured.replace(/\/+$/, "")
  return typeof window === "undefined" ? "" : window.location.origin
}

export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "")
  const origin = siteOrigin()
  return clean ? `${origin}/${clean}` : origin || "/"
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
}

export function pageTitle(title: string): string {
  return title ? `${title} · ${SITE_NAME}` : SITE_NAME
}

/** Sync <title>, meta description, robots and canonical for the active page. */
export function applyPageMeta(
  lang: Lang,
  { title, description, path, indexable = true }: PageMeta,
) {
  const fullTitle = pageTitle(title)
  document.title = fullTitle
  document.documentElement.lang = HTML_LANG[lang]

  const canonical = canonicalUrl(path)

  upsertMeta('meta[name="description"]', "name", "description", description)
  upsertMeta(
    'meta[name="robots"]',
    "name",
    "robots",
    indexable ? "index, follow" : "noindex, follow",
  )
  upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle)
  upsertMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    description,
  )
  upsertMeta('meta[property="og:type"]', "property", "og:type", "website")
  upsertMeta('meta[property="og:url"]', "property", "og:url", canonical)
  upsertMeta(
    'meta[property="og:locale"]',
    "property",
    "og:locale",
    HTML_LANG[lang],
  )

  upsertLink("canonical", canonical)
}
