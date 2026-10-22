import type { Page } from "./routes"
import { pathForPage } from "./routes"
import { CITIES, PROVINCES } from "../data/cities"
import { CITY_INTROS } from "../data/cityIntros"
import { SERVICES } from "../data/services"
import { SERVICE_LOCAL } from "../data/serviceLocal"
import { TRAITS } from "../data/localTraits"
import { ARTICLES } from "../data/articles"
import { faqEntries } from "../data/faq"
import { CONTACT } from "../data/contact"
import { t as translate } from "../i18n/translations"
import type { TranslationKey } from "../i18n/translations"

const t = (key: TranslationKey) => translate("nl", key)

/**
 * /llms.txt and /llms-full.txt (https://llmstxt.org): the site's facts in
 * plain Markdown for AI assistants and answer engines. Generated from the
 * same data as the pages, so it can never say more than the site does.
 */
function linker(origin: string) {
  return (page: Page) => {
    const path = pathForPage(page)
    return `${origin}/${path ? `${path}/` : ""}`
  }
}

function summary(): string {
  return [
    "> Huisklusdienst is een klusbedrijf voor verbouwing, renovatie, onderhoud en reparaties aan huis,",
    "> met pagina's voor plaatsen door heel Nederland. Bezoekers beschrijven hun klus online (met foto's als",
    "> ze willen) en ontvangen een gespecificeerde offerte. In English: Huisklusdienst is a Dutch home",
    "> improvement company for renovations, bathrooms and kitchens, extensions, dormers, painting,",
    "> carpentry, plumbing, maintenance and repairs in places across the Netherlands.",
  ].join("\n")
}

function contactLines(link: (page: Page) => string): string[] {
  const lines = [`- Offerte aanvragen of contact: ${link("contact")}`]
  if (CONTACT.legalName) lines.push(`- Bedrijfsnaam / website-exploitant: ${CONTACT.legalName}`)
  if (CONTACT.tradeName && CONTACT.legalName) lines.push(`- ${CONTACT.tradeName} is een handelsnaam van ${CONTACT.legalName}.`)
  if (CONTACT.contactPerson) lines.push(`- Contactpersoon: ${CONTACT.contactPerson}`)
  if (CONTACT.phoneDisplay) lines.push(`- Telefoon: ${CONTACT.phoneDisplay}`)
  if (CONTACT.email) lines.push(`- E-mail: ${CONTACT.email}`)
  if (CONTACT.locality) lines.push(`- Plaats: ${CONTACT.locality}`)
  if (CONTACT.kvk) lines.push(`- KvK: ${CONTACT.kvk}`)
  if (CONTACT.btw) lines.push(`- Btw-identificatienummer: ${CONTACT.btw}`)
  lines.push("- Talen op de site: Nederlands, Engels, Oekraïens en Russisch")
  return lines
}

export function llmsTxt(origin: string): string {
  const link = linker(origin)
  const out: string[] = ["# Huisklusdienst", "", summary(), "", ...contactLines(link), "", "## Diensten", ""]

  for (const service of SERVICES) {
    out.push(`- [${t(service.nameKey)}](${link({ type: "service", slug: service.slug })}): ${t(service.descKey)}`)
  }

  out.push("", "## Werkgebied", "", `- [Alle plaatsen per provincie](${link("werkgebied")})`)
  for (const city of CITIES) {
    const label = t("city_hero_title").replace("{city}", city.name)
    out.push(`- [${label}](${link({ type: "city", city: city.name })}) (${city.province})`)
  }

  out.push("", "## Kennisbank", "")
  for (const article of ARTICLES) {
    out.push(`- [${article.title}](${link({ type: "article", slug: article.slug })}): ${article.excerpt}`)
  }

  out.push(
    "",
    "## Optional",
    "",
    `- [Volledige tekst: alle diensten, plaatsen en veelgestelde vragen](${origin}/llms-full.txt)`,
    `- [Sitemap](${origin}/sitemap.xml)`,
    "",
  )
  return out.join("\n")
}

export function llmsFullTxt(origin: string): string {
  const link = linker(origin)
  const out: string[] = ["# Huisklusdienst — volledige informatie", "", summary(), "", ...contactLines(link), ""]

  out.push("## Diensten", "")
  for (const service of SERVICES) {
    out.push(`### ${t(service.nameKey)}`, "", `URL: ${link({ type: "service", slug: service.slug })}`, "")
    out.push(t(service.introKey), "", "Wat valt hieronder:")
    for (const key of service.includesKeys) out.push(`- ${t(key)}`)
    if (service.noteKey) out.push("", t(service.noteKey))
    out.push("")
  }

  out.push("## Veelgestelde vragen", "")
  for (const item of faqEntries(t)) out.push(`### ${item.q}`, "", item.a, "")

  out.push("## Werkgebied", "", `Overzicht: ${link("werkgebied")}`, "")
  for (const province of PROVINCES) {
    const places = CITIES.filter((city) => city.province === province)
    if (places.length === 0) continue
    out.push(`### ${province}`, "")
    for (const city of places) {
      out.push(`#### ${city.name}`, "", `URL: ${link({ type: "city", city: city.name })}`, "")
      if (CITY_INTROS[city.name]) out.push(CITY_INTROS[city.name].nl, "")
      if (city.districts.length > 0) out.push(`Wijken en kernen: ${city.districts.join(", ")}.`, "")
      for (const id of city.traits) out.push(`- ${TRAITS[id].title.nl}: ${TRAITS[id].text.nl}`)
      if (city.traits.length > 0) out.push("")
      if (city.major) {
        out.push(`Diensten in ${city.name}:`)
        for (const service of SERVICES) {
          const local = SERVICE_LOCAL[service.slug]
          if (!local) continue
          out.push(
            `- [${local.title.nl.replace("{city}", city.name)}](${link({ type: "serviceCity", slug: service.slug, city: city.name })})`,
          )
        }
        out.push("")
      }
    }
  }

  out.push("## Kennisbank", "")
  for (const article of ARTICLES) {
    out.push(`### ${article.title}`, "", `URL: ${link({ type: "article", slug: article.slug })}`, "", article.excerpt, "")
  }
  return out.join("\n")
}
