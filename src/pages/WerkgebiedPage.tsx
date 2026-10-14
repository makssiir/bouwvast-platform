import type { Page } from "../lib/routes"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
import { CITIES, REGION_LABELS } from "../data/cities"
import Icon from "../components/Icon"
import { useLang } from "../i18n/LangContext"

const REGIONS = ["kern", "utrecht", "gooi", "gelderland"] as const

export default function WerkgebiedPage({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t } = useLang()
  const citiesByRegion = (region: string) =>
    CITIES.filter((c) => c.region === region)

  return (
    <>
      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: t("nav_area") }]} />
          <h1>{t("area_page_title")}</h1>
          <p className="lead-xl max-w-2xl">{t("area_page_sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Regions Grid */}
          {REGIONS.map((region) => {
            const cities = citiesByRegion(region)
            return (
              <div key={region} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold m-0">
                    {t(REGION_LABELS[region])}
                  </h2>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    {cities.length} {t("area_places")}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {cities.map((city) => (
                    <PageLink
                      key={city.name}
                      to={{ type: "city", city: city.name }}
                      navigate={navigate}
                      className="card p-4 text-left no-underline hover:border-[var(--brand)] hover:shadow-xs group"
                    >
                      <div className="mb-1.5">
                        <Icon name="pin" size={16} color="var(--brand)" />
                      </div>
                      <span className="block font-bold text-sm m-0 text-[var(--fg)] group-hover:text-[var(--brand)] transition-colors">
                        {city.name}
                      </span>
                      <span className="block text-xs text-[var(--muted)] m-0 mt-0.5">
                        {city.province}
                      </span>
                    </PageLink>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
