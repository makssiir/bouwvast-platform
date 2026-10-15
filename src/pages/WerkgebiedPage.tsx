import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import Icon from "../components/Icon"
import PostalCodeChecker from "../components/home/PostalCodeChecker"
import { CITIES, PROVINCES } from "../data/cities"
import { useLang } from "../i18n/LangContext"

/**
 * Every place with a page, by province: provinces with the most places first
 * (ties keep the north-to-south order), larger places first within a province.
 */
const BY_PROVINCE = PROVINCES.map((province) => {
  const places = CITIES.filter((city) => city.province === province)
  return { province, places: [...places.filter((c) => c.major), ...places.filter((c) => !c.major)] }
})
  .filter((group) => group.places.length > 0)
  .sort((a, b) => b.places.length - a.places.length)

const PLURAL_KEY = { one: "area_places_one", few: "area_places_few" } as const

export default function WerkgebiedPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, lang } = useLang()
  const plural = new Intl.PluralRules(lang)
  const countLabel = (count: number) => {
    const form = plural.select(count)
    return `${count} ${t(form === "one" || form === "few" ? PLURAL_KEY[form] : "area_places")}`
  }

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_area") }]}
        eyebrow={t("nav_area")}
        title={t("area_page_title")}
        lead={t("area_page_sub")}
      />

      <PostalCodeChecker sourcePage="werkgebied" />

      <section className="section">
        <div className="container">
          {BY_PROVINCE.map(({ province, places }) => (
            <div key={province} className="mb-12">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="m-0 text-2xl">{province}</h2>
                <div className="h-px flex-1 bg-line" />
                <span className="tag">{countLabel(places.length)}</span>
              </div>

              <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 min-[420px]:grid-cols-2 md:grid-cols-3">
                {places.map((city) => (
                  <li key={city.name}>
                    <PageLink
                      to={{ type: "city", city: city.name }}
                      navigate={navigate}
                      className="card group flex h-full items-center gap-3.5 p-4 text-left"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pine-50 text-pine-700">
                        <Icon name="pin" size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-bold text-ink transition-colors group-hover:text-pine-700">
                          {city.name}
                        </span>
                        <span className="block truncate text-[0.8125rem] text-subtle">
                          {city.districts.length > 0 ? city.districts.slice(0, 3).join(", ") : province}
                        </span>
                      </span>
                      <span
                        className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-pine-700"
                        aria-hidden="true"
                      >
                        <Icon name="arrow-right" size={18} />
                      </span>
                    </PageLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="cta-band mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="mb-2 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{t("area_cta_title")}</h2>
              <p className="m-0 max-w-[46ch]">{t("area_cta_text")}</p>
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
