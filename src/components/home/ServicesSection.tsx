import type { Page } from "../../lib/routes"
import { useLang } from "../../i18n/LangContext"
import { SERVICES } from "../../data/services"
import { claim } from "../../data/claims"
import { SERVICE_PRICES } from "../../data/pricing"
import { imageSize } from "../../data/images"
import PageLink from "../PageLink"
import More from "../More"

export default function ServicesSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const highlighted = ["renovatie", "warmtepompen", "vloerverwarming", "loodgieter", "ramen-deuren", "badkamer-keuken"]
    .map((slug) => SERVICES.find((service) => service.slug === slug)!)
  const price = (slug: string) => {
    const value = SERVICE_PRICES[slug]
    return claim("pricing") && value ? pick(value) : undefined
  }

  return (
    <section className="section" id="diensten" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("services_label")}</p>
            <h2 id="services-title">{t("services_title")}</h2>
            <p>{t("services_sub")}</p>
          </div>
          <PageLink to="diensten" navigate={navigate} className="btn btn-outline">
            {t("services_all")} ({SERVICES.length})
          </PageLink>
        </div>

        <ul className="grid grid-3 list-none m-0 p-0">
          {highlighted.map((service) => (
            <li key={service.slug}>
              <PageLink
                to={{ type: "service", slug: service.slug }}
                navigate={navigate}
                className="card service-card-link"
              >
                <div className="service-card-media">
                  <img src={service.image} alt="" {...imageSize(service.image)} loading="lazy" decoding="async" />
                  {price(service.slug) && <span className="service-card-price">{price(service.slug)}</span>}
                </div>
                <div className="service-card-body">
                  <h3>{t(service.nameKey)}</h3>
                  <p className="line-clamp-3">{t(service.descKey) || t(service.introKey)}</p>
                  <More hidden>{t("more_info")}</More>
                </div>
              </PageLink>
            </li>
          ))}
        </ul>
        <p className="service-images-note">{t("service_images_note")}</p>
      </div>
    </section>
  )
}
