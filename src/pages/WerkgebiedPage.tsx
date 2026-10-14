import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import { CITIES, REGION_LABELS } from "../data/cities"
import Icon from "../components/Icon"
import PostalCodeChecker from "../components/home/PostalCodeChecker"
import { useLang } from "../i18n/LangContext"

const REGIONS = ["kern", "utrecht", "gooi", "gelderland"] as const

export default function WerkgebiedPage({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t, pick } = useLang()
  const citiesByRegion = (region: string) =>
    CITIES.filter((c) => c.region === region)

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_area") }]}
        eyebrow={t("nav_area")}
        title={t("area_page_title")}
        lead={t("area_page_sub")}
      />

      <PostalCodeChecker navigate={navigate} showRegions={false} />

      <section className="section">
        <div className="container">
          {/* Regions Grid */}
          {REGIONS.map((region) => {
            const cities = citiesByRegion(region)
            return (
              <div key={region} className="mb-12">
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="m-0 text-2xl">
                    {t(REGION_LABELS[region])}
                  </h2>
                  <div className="h-px flex-1 bg-line" />
                  <span className="tag">
                    {cities.length} {t("area_places")}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
                  {cities.map((city) => (
                    <PageLink
                      key={city.name}
                      to={{ type: "city", city: city.name }}
                      navigate={navigate}
                      className="card group flex items-center gap-3.5 p-4 text-left"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pine-50 text-pine-700">
                        <Icon name="pin" size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-bold text-ink transition-colors group-hover:text-pine-700">
                          {city.name}
                        </span>
                        <span className="block text-[0.8125rem] text-subtle">{city.province}</span>
                      </span>
                      <span className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-pine-700" aria-hidden="true">
                        <Icon name="arrow-right" size={18} />
                      </span>
                    </PageLink>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="cta-band mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="mb-2 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
                {pick({
                  nl: "Staat uw woonplaats er niet bij?",
                  en: "Is your town not listed?",
                  uk: "Вашого міста немає у списку?",
                  ru: "Вашего города нет в списке?",
                })}
              </h2>
              <p className="m-0 max-w-[46ch]">
                {pick({
                  nl: "Beschrijf uw project en vermeld uw woonplaats in de aanvraag. We laten u weten of we u kunnen helpen.",
                  en: "Describe your project and mention your town in the request. We will let you know whether we can help.",
                  uk: "Опишіть свій проєкт і вкажіть місто в запиті. Ми повідомимо, чи зможемо допомогти.",
                  ru: "Опишите свой проект и укажите город в запросе. Мы сообщим, сможем ли помочь.",
                })}
              </p>
            </div>
            <PageLink to="contact" navigate={navigate} className="btn btn-white btn-lg">
              {t("cta_btn")}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} />
              </span>
            </PageLink>
          </div>
        </div>
      </section>
    </>
  )
}
