import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import More from "../components/More"
import NotFoundPage from "./NotFoundPage"
import { imageSize } from "../data/images"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
import { MAJOR_CITIES } from "../data/cities"
import { SERVICE_LOCAL } from "../data/serviceLocal"
import Icon from "../components/Icon"
import QuoteForm from "../components/QuoteForm"
import { useLang } from "../i18n/LangContext"
import { scrollToQuote } from "../lib/quoteDraft"
import { estimatorServiceFor } from "../data/pricing"
import CostEstimator from "../components/home/CostEstimator"

export default function ServicePage({ slug, navigate }: { slug: string; navigate: (p: Page) => void }) {
  const { t } = useLang()
  const service = SERVICE_BY_SLUG[slug]

  if (!service) return <NotFoundPage navigate={navigate} />

  const estimator = estimatorServiceFor(service.slug)
  const steps = [
    // Only mention the calculator where it is on the page.
    { title: t("how_1_title"), desc: estimator ? t("how_1_desc") : t("how_1_desc_form") },
    { title: t("how_2_title"), desc: t("how_2_desc") },
    { title: t("how_3_title"), desc: t("how_3_desc") },
  ]
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)
  const name = t(service.nameKey)

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_services"), to: "diensten" }, { label: name }]}
        title={name + t("service_hero_suffix")}
        lead={t(service.introKey)}
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
            <section className="card p-6 md:p-8" aria-labelledby="includes-title">
              <p className="eyebrow">{t("service_includes_eyebrow")}</p>
              <h2 id="includes-title" className="text-2xl md:text-[1.75rem]">
                {t("service_includes_title")}
              </h2>
              <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2">
                {service.includesKeys.map((itemKey) => (
                  <li
                    key={itemKey}
                    className="flex items-start gap-3 rounded-xl border border-line bg-sand-50 p-3.5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine-100 text-pine-800">
                      <Icon name="check" size={12} strokeWidth={2.8} />
                    </span>
                    <span className="text-[0.95rem] font-medium text-ink">{t(itemKey)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card p-6 md:p-8" aria-labelledby="process-title">
              <p className="eyebrow">{t("service_process_eyebrow")}</p>
              <h2 id="process-title" className="text-2xl md:text-[1.75rem]">
                {t("service_process_title")}
              </h2>
              <ol className="mt-6 grid list-none gap-6 p-0">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4">
                    <span className="step-no mb-0" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-1 text-lg">{s.title}</h3>
                      <p className="m-0 text-[0.95rem] text-muted">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="card p-6 md:p-8" aria-labelledby="area-title">
              <p className="eyebrow">{t("service_area_eyebrow")}</p>
              <h2 id="area-title" className="text-2xl md:text-[1.75rem]">
                {t("service_area_title", { service: name })}
              </h2>
              <p className="text-muted">{t("service_area_desc")}</p>
              <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
                {MAJOR_CITIES.map((c) => (
                  <li key={c.name}>
                    <PageLink
                      to={
                        SERVICE_LOCAL[service.slug]
                          ? { type: "serviceCity", slug: service.slug, city: c.name }
                          : { type: "city", city: c.name }
                      }
                      navigate={navigate}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-pine-600 hover:text-pine-800 hover:no-underline"
                    >
                      <Icon name="pin" size={14} color="var(--color-pine-600)" />
                      {c.name}
                    </PageLink>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside id="quote" className="form-card lg:sticky lg:top-24" aria-labelledby="service-quote-title">
            <h2 id="service-quote-title" className="mb-1 text-xl">
              {t("service_quote_title")}
            </h2>
            <p className="mb-5 text-sm text-muted">
              {t("service_quote_sub", { service: name.toLowerCase() })}
            </p>
            <QuoteForm key={service.slug} compact sourcePage={`service:${service.slug}`} presetService={service.name} />
          </aside>
        </div>
      </div>

      {estimator && <CostEstimator initialService={estimator.id} />}

      <section className={`section ${estimator ? "" : "section--muted"}`} aria-labelledby="related-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t("service_related_eyebrow")}</p>
              <h2 id="related-title">{t("service_related_title")}</h2>
            </div>
            <PageLink to="diensten" navigate={navigate} className="btn btn-outline">
              {t("services_all")}
            </PageLink>
          </div>
          <ul className="grid grid-3 list-none m-0 p-0">
            {related.map((s) => (
              <li key={s.slug}>
                <PageLink to={{ type: "service", slug: s.slug }} navigate={navigate} className="card service-card-link">
                  <div className="service-card-media">
                    <img src={s.image} alt="" {...imageSize(s.image)} loading="lazy" decoding="async" />
                  </div>
                  <div className="service-card-body">
                    <h3>{t(s.nameKey)}</h3>
                    <More hidden>{t("link_more")}</More>
                  </div>
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
