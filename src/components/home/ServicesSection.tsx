import type { Page } from "../../App"
import { useLang } from "../../i18n/LangContext"
import { SERVICES } from "../../data/services"

export default function ServicesSection({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t, lang } = useLang()

  // Show top 6 highlighted services on home
  const highlightedServices = SERVICES.slice(0, 6)

  const featuredServices = highlightedServices.slice(0, 2)
  const standardServices = highlightedServices.slice(2, 6)

  const priceMap: Record<string, Record<string, string>> = {
    uk: {
      renovatie: "За проєктом",
      afbouw: "Від €45/м²",
      schilderwerk: "Від €35/м²",
      "gevel-buitenwerk": "Від €48/м²",
      timmerman: "Від €55/год",
      "badkamer-keuken": "Фіксований кошторис",
      montage: "Від €58/год",
      loodgieter: "Від €65/год",
      "onderhoud-reparatie": "Від €55/год",
      algemeen: "Від €55/год",
    },
    en: {
      renovatie: "By project",
      afbouw: "From €45/m²",
      schilderwerk: "From €35/m²",
      "gevel-buitenwerk": "From €48/m²",
      timmerman: "From €55/hr",
      "badkamer-keuken": "Fixed quote",
      montage: "From €58/hr",
      loodgieter: "From €65/hr",
      "onderhoud-reparatie": "From €55/hr",
      algemeen: "From €55/hr",
    },
    ru: {
      renovatie: "Под проект",
      afbouw: "От €45/м²",
      schilderwerk: "От €35/м²",
      "gevel-buitenwerk": "От €48/м²",
      timmerman: "От €55/час",
      "badkamer-keuken": "Фиксированная смета",
      montage: "От €58/час",
      loodgieter: "От €65/час",
      "onderhoud-reparatie": "От €55/час",
      algemeen: "От €55/час",
    },
    nl: {
      renovatie: "Projectmatig",
      afbouw: "Vanaf €45/m²",
      schilderwerk: "Vanaf €35/m²",
      "gevel-buitenwerk": "Vanaf €48/m²",
      timmerman: "Vanaf €55/uur",
      "badkamer-keuken": "Vaste offerte",
      montage: "Vanaf €58/uur",
      loodgieter: "Vanaf €65/uur",
      "onderhoud-reparatie": "Vanaf €55/uur",
      algemeen: "Vanaf €55/uur",
    },
  }

  const getPrice = (slug: string) => {
    return priceMap[lang]?.[slug] ?? priceMap.nl[slug] ?? "€55/uur"
  }

  const popularLabel =
    lang === "uk"
      ? "Популярне"
      : lang === "ru"
        ? "Популярно"
        : lang === "en"
          ? "Popular"
          : "Populair"

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
                  {popularLabel}
                </div>
                <div
                  className="service-card-media relative"
                  aria-hidden="true"
                  style={{ height: "240px" }}
                >
                  <img
                    src={service.image}
                    alt={displayName}
                    loading="lazy"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <span className="service-card-price">
                    {getPrice(service.slug)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="service-card-media" aria-hidden="true" style={{ height: "210px" }}>
                  <img
                    src={service.image}
                    alt={displayName}
                    loading="lazy"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <span className="service-card-price">
                    {getPrice(service.slug)}
                  </span>
                </div>
                <div className="service-card-body flex-grow">
                  <h3 className="text-base font-bold mb-2">{displayName}</h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-3 mb-4 leading-relaxed">
                    {displayDesc}
                  </p>
                  <span className="more text-xs font-bold">{t("more_info")}</span>
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
