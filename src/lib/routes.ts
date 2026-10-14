import { CITIES } from "../data/cities"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
import { ARTICLE_BY_SLUG, ARTICLES } from "../data/articles"
import { claim } from "../data/claims"
import { t as translate } from "../i18n/translations"
import type { Lang, TranslationKey } from "../i18n/translations"

export type StaticPage =
  | "home"
  | "diensten"
  | "projecten"
  | "werkgebied"
  | "contact"
  | "zakelijk"
  | "kennisbank"
  | "privacy"
  | "voorwaarden"

export type Page =
  | StaticPage
  | "notfound"
  | { type: "service"; slug: string }
  | { type: "city"; city: string }
  | { type: "article"; slug: string }

export const STATIC_PAGES: StaticPage[] = [
  "home",
  "diensten",
  "projecten",
  "werkgebied",
  "contact",
  "zakelijk",
  "kennisbank",
  "privacy",
  "voorwaarden",
]

/** URL-safe form of a city name: "'s-Hertogenbosch" becomes "s-hertogenbosch". */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const CITY_BY_SLUG: Map<string, string> = new Map(
  CITIES.map((city) => [slugify(city.name), city.name]),
)

export function cityForSlug(slug: string): string | undefined {
  return CITY_BY_SLUG.get(slug)
}

/** Path without leading or trailing slash. The homepage is the empty string. */
export function pathForPage(page: Page): string {
  if (page === "notfound") return "404"
  if (typeof page === "string") return page === "home" ? "" : page
  if (page.type === "service") return `diensten/${page.slug}`
  if (page.type === "article") return `kennisbank/${page.slug}`
  const city = slugify(page.city)
  return `werkgebied/${city}`
}

export function hrefForPage(page: Page): string {
  const path = pathForPage(page)
  return path ? `/${path}/` : "/"
}

/** Resolves a URL back to a page. Returns null for anything we do not serve. */
export function pageForPath(pathname: string): Page | null {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })

  if (segments.length === 0) return "home"

  const [first, second] = segments

  if (segments.length === 1) {
    const match = STATIC_PAGES.find((page) => page !== "home" && page === first)
    return match ?? null
  }

  if (first === "diensten" && segments.length === 2) {
    return SERVICE_BY_SLUG[second] ? { type: "service", slug: second } : null
  }

  if (first === "kennisbank" && segments.length === 2) {
    return ARTICLE_BY_SLUG[second] ? { type: "article", slug: second } : null
  }

  if (first === "werkgebied" && segments.length === 2) {
    const city = cityForSlug(second)
    return city ? { type: "city", city } : null
  }

  return null
}

const STATIC_META: Record<
  StaticPage,
  { titleKey: TranslationKey; descKey: TranslationKey }
> = {
  home: { titleKey: "hero_title", descKey: "hero_sub" },
  diensten: { titleKey: "nav_services", descKey: "services_sub" },
  projecten: { titleKey: "nav_projects", descKey: "projects_sub" },
  werkgebied: { titleKey: "nav_area", descKey: "area_page_sub" },
  contact: { titleKey: "nav_contact", descKey: "cta_sub" },
  zakelijk: { titleKey: "nav_business", descKey: "b2b_page_sub" },
  kennisbank: { titleKey: "kb_page_title", descKey: "kb_page_sub" },
  privacy: { titleKey: "footer_privacy", descKey: "privacy_meta_desc" },
  voorwaarden: { titleKey: "footer_terms", descKey: "terms_meta_desc" },
}

export interface PageMetaText {
  title: string
  description: string
}

export function metaForPage(page: Page, lang: Lang): PageMetaText {
  const t = (key: TranslationKey) => translate(lang, key)

  if (page === "notfound") {
    return { title: t("notfound_title"), description: t("notfound_sub") }
  }

  if (typeof page === "string") {
    const meta = STATIC_META[page]
    return { title: t(meta.titleKey), description: t(meta.descKey) }
  }

  if (page.type === "service") {
    const service = SERVICE_BY_SLUG[page.slug]
    if (!service) return { title: t("nav_services"), description: t("services_sub") }
    return {
      title: `${t(service.nameKey)}${t("service_hero_suffix")}`,
      description: t(service.introKey),
    }
  }

  if (page.type === "article") {
    const article = ARTICLE_BY_SLUG[page.slug]
    return article
      ? { title: article.title, description: article.excerpt }
      : { title: t("kb_page_title"), description: t("kb_page_sub") }
  }

  return {
    title: `${t("city_page_title")} ${page.city}`,
    description: translate(lang, "city_hero_sub").split("{city}").join(page.city),
  }
}

/**
 * Whether a page is offered to search engines.
 *
 * City pages are the same template with one word swapped. Until each carries
 * genuine local content (projects, reviews, photos) they stay reachable but
 * `noindex`, so a small contractor is not filtered out as a doorway site.
 * The projects page has nothing to show until real projects are approved.
 * Set SITE_INDEX_CITY_PAGES=true at build time to index them anyway.
 */
export function isIndexable(page: Page): boolean {
  if (page === "notfound") return false
  if (page === "projecten") return claim("projects")
  if (typeof page === "string") return true
  if (page.type === "service") return Boolean(SERVICE_BY_SLUG[page.slug])
  if (page.type === "article") return Boolean(ARTICLE_BY_SLUG[page.slug])
  return indexCityPages()
}

function indexCityPages(): boolean {
  try {
    return String(import.meta.env.VITE_INDEX_CITY_PAGES ?? "") === "true"
  } catch {
    return false
  }
}

export interface IndexableRoute {
  page: Page
  path: string
  priority: number
  changefreq: "weekly" | "monthly" | "yearly"
}

/** Every URL the site serves, in sitemap order. Each gets its own HTML file. */
export function allRoutes(): IndexableRoute[] {
  const routes: IndexableRoute[] = []

  const staticPriority: Record<StaticPage, number> = {
    home: 1.0,
    diensten: 0.9,
    werkgebied: 0.8,
    contact: 0.8,
    projecten: 0.7,
    zakelijk: 0.7,
    kennisbank: 0.7,
    privacy: 0.2,
    voorwaarden: 0.2,
  }

  for (const page of STATIC_PAGES) {
    routes.push({
      page,
      path: pathForPage(page),
      priority: staticPriority[page],
      changefreq: page === "home" ? "weekly" : page === "privacy" || page === "voorwaarden" ? "yearly" : "monthly",
    })
  }

  for (const service of SERVICES) {
    const page: Page = { type: "service", slug: service.slug }
    routes.push({ page, path: pathForPage(page), priority: 0.85, changefreq: "monthly" })
  }

  for (const article of ARTICLES) {
    const page: Page = { type: "article", slug: article.slug }
    routes.push({ page, path: pathForPage(page), priority: 0.6, changefreq: "yearly" })
  }

  for (const city of CITIES) {
    const page: Page = { type: "city", city: city.name }
    routes.push({ page, path: pathForPage(page), priority: 0.5, changefreq: "yearly" })
  }

  return routes
}

/** The subset offered to search engines (sitemap). */
export function indexableRoutes(): IndexableRoute[] {
  return allRoutes().filter((route) => isIndexable(route.page))
}
