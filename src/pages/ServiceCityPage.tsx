import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import NotFoundPage from "./NotFoundPage"
import Icon from "../components/Icon"
import JsonLd from "../components/JsonLd"
import QuoteForm from "../components/QuoteForm"
import CostEstimator from "../components/home/CostEstimator"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
import { MAJOR_CITIES, cityByName, listJoin, nearbyCities } from "../data/cities"
import { CITY_INTROS } from "../data/cityIntros"
import { SERVICE_LOCAL, capitalize, withCity } from "../data/serviceLocal"
import { TRAITS } from "../data/localTraits"
import { estimatorServiceFor } from "../data/pricing"
import { useLang } from "../i18n/LangContext"
import { scrollToQuote } from "../lib/quoteDraft"
import { faqPageSchema, serviceCityFaq } from "../lib/localFaq"

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
const chipLink = `${chip} transition-colors hover:border-pine-600 hover:text-pine-800 hover:no-underline`

/**
 * One service in one place (/werkgebied/<plaats>/<dienst>/): what the job
 * involves, what the local housing stock means for it, the districts, and
 * questions answered for that place. Every block comes from the place's own
 * data, so no two of these pages say the same thing.
 */
export default function ServiceCityPage({
  slug,
  city: cityName,
  navigate,
}: {
  slug: string
  city: string
  navigate: (p: Page) => void
}) {
  const { t, lang, pick } = useLang()
  const service = SERVICE_BY_SLUG[slug]
  const local = SERVICE_LOCAL[slug]
  const city = cityByName(cityName)

  if (!service || !local || !city?.major) return <NotFoundPage navigate={navigate} />

  const name = t(service.nameKey)
  const noun = pick(local.noun)
  const vars = {
    city: city.name,
    noun,
    Noun: capitalize(noun),
    districts: listJoin(city.districts.slice(0, 3), t("word_and")),
    service: name,
  }
  const estimator = estimatorServiceFor(service.slug)
  const tips = city.traits.slice(0, 4).map((id) => {
    const trait = TRAITS[id]
    return { id, title: pick(trait.title), text: pick(trait.tips[local.group] ?? trait.text) }
  })
  const faq = serviceCityFaq(city, service.slug, lang, t, { calculator: Boolean(estimator) })
  const steps = [
    { title: t("how_1_title"), desc: estimator ? t("how_1_desc") : t("how_1_desc_form") },
    { title: t("how_2_title"), desc: t("how_2_desc") },
    { title: t("how_3_title"), desc: t("how_3_desc") },
  ]
  const others = SERVICES.filter((s) => s.slug !== service.slug && SERVICE_LOCAL[s.slug])
  const nearby = nearbyCities(city, 6, MAJOR_CITIES)

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[
          { label: t("nav_area"), to: "werkgebied" },
          { label: city.name, to: { type: "city", city: city.name } },
          { label: name },
        ]}
        eyebrow={name}
        title={withCity(pick(local.title), city.name)}
        lead={city.districts.length > 0 ? t("sc_lead", vars) : t("sc_meta_desc_short", vars)}
        image={service.image}
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
            <section className="card p-6 md:p-8" aria-labelledby="sc-about-title">
              <p className="eyebrow">{t("service_includes_eyebrow")}</p>
              <h2 id="sc-about-title" className="text-2xl md:text-[1.75rem]">
                {t("sc_about_title", vars)}
              </h2>
              <p className="text-muted">{t(service.introKey)}</p>
              <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
                {service.includesKeys.map((itemKey) => (
                  <li key={itemKey} className="flex items-start gap-3 rounded-xl border border-line bg-sand-50 p-3.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine-100 text-pine-800">
                      <Icon name="check" size={12} strokeWidth={2.8} />
                    </span>
                    <span className="text-[0.95rem] font-medium text-ink">{t(itemKey)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card p-6 md:p-8" aria-labelledby="sc-tips-title">
              <p className="eyebrow">{t("sc_tips_eyebrow")}</p>
              <h2 id="sc-tips-title" className="text-2xl md:text-[1.75rem]">
                {t("sc_tips_title", vars)}
              </h2>
              {CITY_INTROS[city.name] && <p className="text-muted">{pick(CITY_INTROS[city.name])}</p>}
              {tips.length > 0 && (
                <ul className="mt-5 grid list-none gap-4 p-0">
                  {tips.map((tip) => (
                    <li key={tip.id} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-pine-50 text-pine-700">
                        <Icon name="info" size={15} />
                      </span>
                      <div>
                        <h3 className="mb-1 text-base">{tip.title}</h3>
                        <p className="m-0 text-[0.95rem] text-muted">{tip.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="card p-6 md:p-8" aria-labelledby="sc-process-title">
              <p className="eyebrow">{t("service_process_eyebrow")}</p>
              <h2 id="sc-process-title" className="text-2xl md:text-[1.75rem]">
                {t("service_process_title")}
              </h2>
              <ol className="mt-6 grid list-none gap-6 p-0">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="step-no mb-0" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-1 text-lg">{step.title}</h3>
                      <p className="m-0 text-[0.95rem] text-muted">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {city.districts.length > 0 && (
              <section className="card p-6 md:p-8" aria-labelledby="sc-districts-title">
                <h2 id="sc-districts-title" className="text-2xl md:text-[1.75rem]">
                  {t("sc_districts_title", vars)}
                </h2>
                <p className="text-muted">{t("sc_districts_text")}</p>
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {city.districts.map((district) => (
                    <li key={district} className={chip}>
                      <Icon name="pin" size={14} color="var(--color-pine-600)" />
                      {district}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="card p-6 md:p-8" aria-labelledby="sc-faq-title">
              <JsonLd data={faqPageSchema(faq)} />
              <h2 id="sc-faq-title" className="mb-5 text-2xl">
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

          <aside id="quote" className="form-card lg:sticky lg:top-24" aria-labelledby="sc-quote-title">
            <h2 id="sc-quote-title" className="mb-1 text-xl">
              {t("city_quote_title", vars)}
            </h2>
            <p className="mb-5 text-sm text-muted">{t("city_quote_sub", vars)}</p>
            <QuoteForm
              key={`${service.slug}:${city.name}`}
              compact
              sourcePage={`service-city:${service.slug}:${city.name}`}
              presetService={service.name}
              presetCity={city.name}
            />
          </aside>
        </div>
      </div>

      {estimator && <CostEstimator initialService={estimator.id} />}

      <section className={`section ${estimator ? "" : "section--muted"}`} aria-labelledby="sc-other-title">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <h2 id="sc-other-title" className="mb-5 text-2xl md:text-[1.75rem]">
              {t("sc_other_title", vars)}
            </h2>
            <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
              {others.map((s) => (
                <li key={s.slug}>
                  <PageLink
                    to={{ type: "serviceCity", slug: s.slug, city: city.name }}
                    navigate={navigate}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-white p-3.5 text-left transition-colors hover:border-pine-500 hover:bg-pine-50 hover:no-underline"
                  >
                    <Icon name={s.icon} size={18} color="var(--color-pine-700)" />
                    <span className="font-display text-[0.95rem] font-bold text-ink">{t(s.nameKey)}</span>
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-2xl md:text-[1.75rem]">{t("sc_nearby_title", vars)}</h2>
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {nearby.map((other) => (
                <li key={other.name}>
                  <PageLink
                    to={{ type: "serviceCity", slug: service.slug, city: other.name }}
                    navigate={navigate}
                    className={chipLink}
                  >
                    <Icon name="pin" size={14} color="var(--color-pine-600)" />
                    {other.name}
                  </PageLink>
                </li>
              ))}
            </ul>
            <PageLink
              to={{ type: "city", city: city.name }}
              navigate={navigate}
              className="btn btn-outline mt-6"
            >
              {t("city_hero_title", vars)}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={16} />
              </span>
            </PageLink>
          </div>
        </div>
      </section>
    </>
  )
}
