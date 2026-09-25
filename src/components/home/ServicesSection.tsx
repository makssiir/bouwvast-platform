import type { Page } from "../../App"
import { useLang } from "../../i18n/LangContext"
import { SERVICES } from "../../data/services"

export default function ServicesSection({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t } = useLang()

  // Show top 6 highlighted services on home
  const highlightedServices = SERVICES.slice(0, 6)

  const featuredServices = highlightedServices.slice(0, 2)
  const standardServices = highlightedServices.slice(2, 6)

  const priceMap: Record<string, string> = {
    renovatie: "Projectmatig",
    afbouw: "Vanaf €45/m²",
    schilderwerk: "Vanaf €35/m²",
    "gevel-buitenwerk": "Vanaf €48/m²",
    timmerman: "Vanaf €55/uur",
    "badkamer-keuken": "Vaste offerte",
    montage: "Vanaf €58/uur",
    loodgieter: "Vanaf €65/uur",
    "onderhoud-reparatie": "Vanaf €55/uur",
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
            const displayDesc = t(service.descKey) || service.intro

            return (
              <button
                key={service.slug}
                onClick={() =>
                  navigate({ type: "service", slug: service.slug })
                }
                className="card service-card-link text-left cursor-pointer border-0 bg-white relative overflow-hidden flex flex-col h-full border-l-4 border-l-brand"
              >
                <div className="absolute top-4 right-4 z-10 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Populair
                </div>
                <div className="service-card-media relative" aria-hidden="true" style={{ height: "240px" }}>
                  <img
                    src={service.image}
                    alt={displayName}
                    loading="lazy"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <span className="service-card-price">
                    {priceMap[service.slug] || "Vanaf €55/uur"}
                  </span>
                </div>
                <div className="service-card-body flex-grow">
                  <h3>{displayName}</h3>
                  <p>{displayDesc}</p>
                  <span className="more">{t("more_info")}</span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {standardServices.map((service) => {
            const displayName = t(service.nameKey) || service.name
            const displayDesc = t(service.descKey) || service.intro

            return (
              <button
                key={service.slug}
                onClick={() =>
                  navigate({ type: "service", slug: service.slug })
                }
                className="card service-card-link text-left cursor-pointer border-0 bg-white flex flex-col h-full"
              >
                <div className="service-card-media" aria-hidden="true">
                  <img
                    src={service.image}
                    alt={displayName}
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                  <span className="service-card-price">
                    {priceMap[service.slug] || "Vanaf €55/uur"}
                  </span>
                </div>
                <div className="service-card-body flex-grow">
                  <h3>{displayName}</h3>
                  <p>{displayDesc}</p>
                  <span className="more">{t("more_info")}</span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="btn-row centered-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("diensten")}
          >
            {t("services_all")} ({SERVICES.length}) &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
