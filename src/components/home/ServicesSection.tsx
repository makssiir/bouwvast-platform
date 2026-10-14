import type { Page } from "../../lib/routes"
import { useLang } from "../../i18n/LangContext"
import { SERVICES } from "../../data/services"
import { claim } from "../../data/claims"
import { SERVICE_PRICES } from "../../data/pricing"
import PageLink from "../PageLink"

export default function ServicesSection({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t, pick } = useLang()

  // Show top 6 highlighted services on home
  const highlightedServices = SERVICES.slice(0, 6)

  const featuredServices = highlightedServices.slice(0, 2)
  const standardServices = highlightedServices.slice(2, 6)

  const getPrice = (slug: string) => {
    const price = SERVICE_PRICES[slug]
    return price ? pick(price) : undefined
  }

  return (
    <section className="section" id="diensten">
      <div className="container">
        <div className="center mb-12">
          <span className="eyebrow">{t("services_label")}</span>
          <h2>{t("services_title")}</h2>
          <p className="lead">{t("services_sub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredServices.map((service) => {
            const displayName = t(service.nameKey) || service.name
            const displayDesc = t(service.descKey) || t(service.introKey)

            return (
              <PageLink
                key={service.slug}
                to={{ type: "service", slug: service.slug }}
                navigate={navigate}
                className="card service-card-link text-left bg-white relative overflow-hidden flex flex-col h-full border-l-4 border-l-brand no-underline text-inherit"
              >
                <div
                  className="service-card-media relative"
                  aria-hidden="true"
                  style={{ height: "240px" }}
                >
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {claim("pricing") && getPrice(service.slug) && (
                    <span className="service-card-price">{getPrice(service.slug)}</span>
                  )}
                </div>
                <div className="service-card-body flex-grow">
                  <h3>{displayName}</h3>
                  <p>{displayDesc}</p>
                  <span className="more">{t("more_info")}</span>
                </div>
              </PageLink>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standardServices.map((service) => {
            const displayName = t(service.nameKey) || service.name
            const displayDesc = t(service.descKey) || t(service.introKey)

            return (
              <PageLink
                key={service.slug}
                to={{ type: "service", slug: service.slug }}
                navigate={navigate}
                className="card service-card-link text-left bg-white flex flex-col h-full no-underline text-inherit"
              >
                <div className="service-card-media" aria-hidden="true" style={{ height: "210px" }}>
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {claim("pricing") && getPrice(service.slug) && (
                    <span className="service-card-price">{getPrice(service.slug)}</span>
                  )}
                </div>
                <div className="service-card-body flex-grow">
                  <h3 className="text-base font-bold mb-2">{displayName}</h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-3 mb-4 leading-relaxed">
                    {displayDesc}
                  </p>
                  <span className="more text-xs font-bold">{t("more_info")}</span>
                </div>
              </PageLink>
            )
          })}
        </div>

        <div className="btn-row centered-actions">
          <PageLink to="diensten" navigate={navigate} className="btn btn-primary no-underline">
            {t("services_all")} ({SERVICES.length}) &rarr;
          </PageLink>
        </div>
      </div>
    </section>
  )
}
