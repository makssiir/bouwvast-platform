import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import NotFoundPage from "./NotFoundPage"
import Icon from "../components/Icon"
import JsonLd from "../components/JsonLd"
import QuoteForm from "../components/QuoteForm"
import { SERVICES } from "../data/services"
import { cityByName, listJoin, nearbyCities } from "../data/cities"
import { CITY_INTROS } from "../data/cityIntros"
import { SERVICE_LOCAL } from "../data/serviceLocal"
import { TRAITS } from "../data/localTraits"
import { useLang } from "../i18n/LangContext"
import { scrollToQuote } from "../lib/quoteDraft"
import { cityFaq, faqPageSchema } from "../lib/localFaq"

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-sm font-medium text-ink"

/**
 * A place page (/werkgebied/<plaats>/): the housing stock and what it means
 * for a job, the districts, and every service. Major places link each
 * service to its own page for that place.
 */
export default function CityPage({ city: cityName, navigate }: { city: string; navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const city = cityByName(cityName)

  if (!city) return <NotFoundPage navigate={navigate} />

  const vars = { city: city.name, districts: listJoin(city.districts.slice(0, 3), t("word_and")) }
  const faq = cityFaq(city, t)
  const nearby = nearbyCities(city, 8)

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_area"), to: "werkgebied" }, { label: city.name }]}
        eyebrow={city.province}
        title={t("city_hero_title", vars)}
        lead={CITY_INTROS[city.name] ? pick(CITY_INTROS[city.name]) : t("city_hero_sub", vars)}
      >
        <button type="button" className="btn btn-primary btn-lg" onClick={() => scrollToQuote()}>
          {t("cta_btn")}
          <span className="btn-arrow" aria-hidden="true">
            <Icon name="arrow-right" size={18} strokeWidth={2} />
          </span>
        </button>
      </PageHero>

      <div className="container section">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="space-y-6">
            <section className="card p-6 md:p-8" aria-labelledby="city-services-title">
              <p className="eyebrow">{t("city_services_eyebrow", vars)}</p>
              <h2 id="city-services-title" className="mb-6 text-2xl md:text-[1.75rem]">
                {t("city_services_title", vars)}
              </h2>
              <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <PageLink
                      to={
                        city.major && SERVICE_LOCAL[s.slug]
                          ? { type: "serviceCity", slug: s.slug, city: city.name }
                          : { type: "service", slug: s.slug }
                      }
                      navigate={navigate}
                      className="block h-full rounded-xl border border-line bg-white p-4 text-left transition-colors hover:border-pine-500 hover:bg-pine-50 hover:no-underline"
                    >
                      <span className="mb-1.5 flex items-center gap-2">
                        <Icon name={s.icon} size={18} color="var(--color-pine-700)" />
                        <span className="font-display text-[0.95rem] font-bold text-ink">{t(s.nameKey)}</span>
                      </span>
                      <span className="block text-sm text-muted">{t(s.descKey)}</span>
                    </PageLink>
                  </li>
                ))}
              </ul>
            </section>

            {city.traits.length > 0 && (
              <section className="card p-6 md:p-8" aria-labelledby="city-traits-title">
                <p className="eyebrow">{t("city_traits_eyebrow", vars)}</p>
                <h2 id="city-traits-title" className="text-2xl md:text-[1.75rem]">
                  {t("city_traits_title", vars)}
                </h2>
                <ul className="mt-5 grid list-none gap-4 p-0">
                  {city.traits.map((id) => (
                    <li key={id} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-pine-50 text-pine-700">
                        <Icon name="info" size={15} />
                      </span>
                      <div>
                        <h3 className="mb-1 text-base">{pick(TRAITS[id].title)}</h3>
                        <p className="m-0 text-[0.95rem] text-muted">{pick(TRAITS[id].text)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {city.districts.length > 0 && (
              <section className="card p-6 md:p-8" aria-labelledby="city-districts-title">
                <h2 id="city-districts-title" className="text-2xl md:text-[1.75rem]">
                  {t("city_districts_title")}
                </h2>
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {city.districts.map((district) => (
                    <li key={district} className={chip}>
                      <Icon name="pin" size={14} color="var(--color-pine-600)" />
                      {district}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 mb-0 text-sm text-muted">{t("city_districts_note")}</p>
              </section>
            )}

            <section className="card p-6 md:p-8" aria-labelledby="city-faq-title">
              <JsonLd data={faqPageSchema(faq)} />
              <h2 id="city-faq-title" className="mb-5 text-2xl">
                {t("city_faq_title", vars)}
              </h2>
              <div className="faq">
                {faq.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <div className="answer">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside id="quote" className="form-card lg:sticky lg:top-24" aria-labelledby="city-quote-title">
            <h2 id="city-quote-title" className="mb-1 text-xl">
              {t("city_quote_title", vars)}
            </h2>
            <p className="mb-5 text-sm text-muted">{t("city_quote_sub", vars)}</p>
            <QuoteForm key={city.name} compact sourcePage={`city:${city.name}`} presetCity={city.name} />
          </aside>
        </div>
      </div>

      <section className="section section--muted" aria-labelledby="city-nearby-title">
        <div className="container">
          <h2 id="city-nearby-title" className="mb-5 text-2xl md:text-[1.75rem]">
            {t("city_nearby_title", vars)}
          </h2>
          <ul className="flex list-none flex-wrap gap-2 p-0">
            {nearby.map((other) => (
              <li key={other.name}>
                <PageLink
                  to={{ type: "city", city: other.name }}
                  navigate={navigate}
                  className={`${chip} transition-colors hover:border-pine-600 hover:text-pine-800 hover:no-underline`}
                >
                  <Icon name="pin" size={14} color="var(--color-pine-600)" />
                  {other.name}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
