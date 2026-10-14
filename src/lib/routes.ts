import { CITIES } from "../data/cities"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
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

export type Page =
  | StaticPage
  | { type: "service"; slug: string }
  | { type: "city"; city: string }
  | { type: "service_city"; city: string; serviceSlug: string }

export const STATIC_PAGES: StaticPage[] = [
  "home",
  "diensten",
  "projecten",
  "werkgebied",
  "contact",
  "zakelijk",
  "kennisbank",
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
  if (typeof page === "string") return page === "home" ? "" : page
  if (page.type === "service") return `diensten/${page.slug}`
  if (page.type === "service_city") {
    return `diensten/${page.serviceSlug}/${slugify(page.city)}`
  }
  const city = slugify(page.city)
  return `werkgebied/${city}`
}

export function hrefForPage(page: Page): string {
  const path = pathForPage(page)
  return path ? `/${path}` : "/"
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

  const [first, second, third] = segments

  if (segments.length === 1) {
    const match = STATIC_PAGES.find((page) => page !== "home" && page === first)
    return match ?? null
  }

  if (first === "diensten" && segments.length === 2) {
    return SERVICE_BY_SLUG[second] ? { type: "service", slug: second } : null
  }

  if (first === "diensten" && segments.length === 3) {
    const city = cityForSlug(third)
    return SERVICE_BY_SLUG[second] && city
      ? { type: "service_city", city, serviceSlug: second }
      : null
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
  diensten: { titleKey: "nav_services", descKey: "services_title" },
  projecten: { titleKey: "nav_projects", descKey: "projects_sub" },
  werkgebied: { titleKey: "nav_area", descKey: "area_page_sub" },
  contact: { titleKey: "nav_contact", descKey: "cta_sub" },
  zakelijk: { titleKey: "nav_business", descKey: "b2b_page_sub" },
  kennisbank: { titleKey: "kb_page_title", descKey: "kb_page_sub" },
}

export interface PageMetaText {
  title: string
  description: string
}

export function metaForPage(page: Page, lang: Lang): PageMetaText {
  const t = (key: TranslationKey) => translate(lang, key)

  if (typeof page === "string") {
    const meta = STATIC_META[page]
    return { title: t(meta.titleKey), description: t(meta.descKey) }
  }

  if (page.type === "service") {
    const service = SERVICE_BY_SLUG[page.slug]
    if (!service) return { title: t("nav_services"), description: t("services_title") }
    return {
      title: `${t(service.nameKey)} in regio Amersfoort`,
      description: service.intro,
    }
  }

  if (page.type === "service_city") {
    const service = SERVICE_BY_SLUG[page.serviceSlug]
    return {
      title: service
        ? `${t(service.nameKey)} in ${page.city}`
        : `${t("city_page_title")} ${page.city}`,
      description: service ? service.intro : `${t("city_page_sub")} ${page.city}`,
    }
  }

  return {
    title: `${t("city_page_title")} ${page.city}`,
    description: `${t("city_page_sub")} ${page.city}`,
  }
}

/**
 * A service x city page is the same template with two words swapped. Ten
 * services across thirty-six cities is 360 near-identical pages, which is how
 * a small contractor gets filtered out rather than found. They stay reachable
 * as deep links, but they are not offered for indexing until each one carries
 * content of its own.
 */
export function isIndexable(page: Page): boolean {
  if (typeof page === "string") return true
  if (page.type === "service") return Boolean(SERVICE_BY_SLUG[page.slug])
  if (page.type === "service_city") return false
  return true
}

export interface IndexableRoute {
  page: Page
  path: string
  priority: number
  changefreq: "weekly" | "monthly" | "yearly"
}

/** Every URL offered to search engines, in sitemap order. */
export function indexableRoutes(): IndexableRoute[] {
  const routes: IndexableRoute[] = []

  const staticPriority: Record<StaticPage, number> = {
    home: 1.0,
    diensten: 0.9,
    werkgebied: 0.8,
    contact: 0.8,
    projecten: 0.7,
    zakelijk: 0.7,
    kennisbank: 0.7,
  }

  for (const page of STATIC_PAGES) {
    routes.push({
      page,
      path: pathForPage(page),
      priority: staticPriority[page],
      changefreq: page === "home" ? "weekly" : "monthly",
    })
  }

  for (const service of SERVICES) {
    const page: Page = { type: "service", slug: service.slug }
    routes.push({ page, path: pathForPage(page), priority: 0.85, changefreq: "monthly" })
  }

  for (const city of CITIES) {
    const page: Page = { type: "city", city: city.name }
    routes.push({ page, path: pathForPage(page), priority: 0.6, changefreq: "yearly" })
  }

  return routes
}
