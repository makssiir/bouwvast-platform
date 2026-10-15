import type { City } from "../data/cities"
import { listJoin } from "../data/cities"
import { SERVICE_LOCAL, capitalize } from "../data/serviceLocal"
import type { Lang, TranslationKey } from "../i18n/translations"

export interface FaqItem {
  q: string
  a: string
}

type Translate = (key: TranslationKey, params?: Record<string, string>) => string

/**
 * The questions on a place page and on a service × place page. Built from the
 * place's own data (districts, housing traits), so every page answers with
 * what is true for that place. Used by the pages and their FAQPage markup.
 */
export function cityFaq(city: City, t: Translate): FaqItem[] {
  const vars = { city: city.name, districts: listJoin(city.districts.slice(0, 3), t("word_and")) }
  return [
    { q: t("city_faq_1_q", vars), a: t(city.districts.length > 0 ? "city_faq_1_a" : "city_faq_1_a_short", vars) },
    { q: t("city_faq_2_q", vars), a: t("city_faq_2_a", vars) },
    { q: t("city_faq_3_q", vars), a: t("city_faq_3_a", vars) },
    { q: t("city_faq_4_q", vars), a: t("city_faq_4_a", vars) },
  ]
}

export function serviceCityFaq(
  city: City,
  slug: string,
  lang: Lang,
  t: Translate,
  { calculator }: { calculator: boolean },
): FaqItem[] {
  const local = SERVICE_LOCAL[slug]
  const noun = local ? (local.noun[lang] ?? local.noun.nl) : ""
  const and = t("word_and")
  const vars = {
    city: city.name,
    noun,
    Noun: capitalize(noun),
    districts: listJoin(city.districts.slice(0, 3), and),
    allDistricts: listJoin(city.districts, and),
  }

  const items: FaqItem[] = [
    {
      q: t("sc_faq_cost_q", vars),
      a: calculator ? `${t("sc_faq_cost_a", vars)} ${t("sc_faq_cost_a_calc", vars)}` : t("sc_faq_cost_a", vars),
    },
    { q: t("sc_faq_start_q", vars), a: t("sc_faq_start_a", vars) },
  ]
  if (city.districts.length > 0) {
    items.push({ q: t("sc_faq_districts_q", vars), a: t("sc_faq_districts_a", vars) })
  }
  const monuments = city.traits.includes("monuments")
  if (local?.group !== "wet" || monuments) {
    items.push({
      q: t("sc_faq_permit_q", vars),
      a: monuments ? `${t("sc_faq_permit_a", vars)} ${t("sc_faq_permit_monuments", vars)}` : t("sc_faq_permit_a", vars),
    })
  }
  if (city.traits.includes("apartments")) {
    items.push({ q: t("sc_faq_vve_q", vars), a: t("sc_faq_vve_a", vars) })
  }
  return items
}

/** schema.org FAQPage for questions that are visible on the page. */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
}
