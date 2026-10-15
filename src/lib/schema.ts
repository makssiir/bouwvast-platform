import type { Page } from "./routes"
import { pathForPage } from "./routes"
import type { City } from "../data/cities"
import { cityByName } from "../data/cities"
import { CITY_INTROS } from "../data/cityIntros"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
import { SERVICE_LOCAL, withCity } from "../data/serviceLocal"
import { CONTACT } from "../data/contact"
import { t as translate } from "../i18n/translations"
import type { TranslationKey } from "../i18n/translations"

type SchemaNode = Record<string, unknown>

const NAME = "Huisklusdienst"
const t = (key: TranslationKey) => translate("nl", key)

/**
 * schema.org nodes for each prerendered page (scripts/prerender.mjs adds them
 * to the page's @graph): the business on every page, plus the service the
 * page is about and where it is offered. Only what the page itself shows;
 * contact details only once the owner has confirmed them (data/company.ts).
 */
export function schemaNodes(page: Page, origin: string): SchemaNode[] {
  if (!origin || page === "notfound") return []
  const url = (target: Page) => {
    const path = pathForPage(target)
    return path ? `${origin}/${path}/` : `${origin}/`
  }
  const provider = { "@id": `${origin}/#organization` }
  const nodes: SchemaNode[] = [organization(origin, url)]
  if (typeof page === "string" || page.type === "article") return nodes

  const self = url(page)
  if (page.type === "service") {
    const service = SERVICE_BY_SLUG[page.slug]
    if (!service) return nodes
    nodes.push({
      "@type": "Service",
      "@id": `${self}#service`,
      name: t(service.nameKey),
      serviceType: t(service.nameKey),
      description: t(service.introKey),
      url: self,
      image: `${origin}${service.image}`,
      provider,
      areaServed: { "@type": "Country", name: "Nederland" },
    })
    return nodes
  }

  const city = cityByName(page.city)
  if (!city) return nodes

  if (page.type === "serviceCity") {
    const service = SERVICE_BY_SLUG[page.slug]
    const local = SERVICE_LOCAL[page.slug]
    if (!service || !local) return nodes
    nodes.push({
      "@type": "Service",
      "@id": `${self}#service`,
      name: withCity(local.title.nl, city.name),
      serviceType: t(service.nameKey),
      description: t(service.introKey),
      url: self,
      image: `${origin}${service.image}`,
      provider,
      areaServed: place(city),
    })
    return nodes
  }

  nodes.push({
    "@type": "Service",
    "@id": `${self}#service`,
    name: t("city_hero_title").replace("{city}", city.name),
    description: CITY_INTROS[city.name]?.nl ?? t("city_hero_sub").replace("{city}", city.name),
    url: self,
    provider,
    areaServed: place(city),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Diensten in ${city.name}`,
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t(service.nameKey),
          url:
            city.major && SERVICE_LOCAL[service.slug]
              ? url({ type: "serviceCity", slug: service.slug, city: city.name })
              : url({ type: "service", slug: service.slug }),
        },
      })),
    },
  })
  return nodes
}

function place(city: City): SchemaNode {
  return {
    "@type": "City",
    name: city.name,
    containedInPlace: { "@type": "AdministrativeArea", name: city.province },
    geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng },
  }
}

function organization(origin: string, url: (page: Page) => string): SchemaNode {
  const node: SchemaNode = {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${origin}/#organization`,
    name: NAME,
    url: `${origin}/`,
    logo: `${origin}/apple-touch-icon.png`,
    image: `${origin}/og-image.jpg`,
    description: t("footer_desc"),
    areaServed: { "@type": "Country", name: "Nederland" },
    knowsLanguage: ["nl", "en", "uk", "ru"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Diensten",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t(service.nameKey), url: url({ type: "service", slug: service.slug }) },
      })),
    },
  }
  if (CONTACT.legalName) node.legalName = CONTACT.legalName
  if (CONTACT.phoneTel) node.telephone = CONTACT.phoneTel
  if (CONTACT.email) node.email = CONTACT.email
  if (CONTACT.address) node.address = { "@type": "PostalAddress", streetAddress: CONTACT.address, addressCountry: "NL" }
  if (CONTACT.kvk) node.identifier = { "@type": "PropertyValue", propertyID: "KvK", value: CONTACT.kvk }
  if (CONTACT.btw) node.vatID = CONTACT.btw
  return node
}
