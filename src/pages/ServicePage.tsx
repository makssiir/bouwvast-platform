import type { Page } from "../lib/routes"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
import NotFoundPage from "./NotFoundPage"
import { imageSize } from "../data/images"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
import { CITIES } from "../data/cities"
import Icon from "../components/Icon"
import QuoteForm from "../components/QuoteForm"
import { useLang } from "../i18n/LangContext"

export default function ServicePage({
  slug,
  navigate,
}: {
  slug: string
  navigate: (p: Page) => void
}) {
  const { t } = useLang()
  const service = SERVICE_BY_SLUG[slug]

  if (!service) return <NotFoundPage navigate={navigate} />

  const steps = [
    { num: "01", title: t("how_1_title"), desc: t("how_1_desc") },
    { num: "02", title: t("how_2_title"), desc: t("how_2_desc") },
    { num: "03", title: t("how_3_title"), desc: t("how_3_desc") },
  ]
  const coreCities = CITIES.slice(0, 10)
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      {/* Service Hero */}
      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb
            navigate={navigate}
            items={[{ label: t("nav_services"), to: "diensten" }, { label: t(service.nameKey) }]}
          />
          <h1>{t(service.nameKey) + t("service_hero_suffix")}</h1>
          <p className="lead-xl max-w-2xl">{t(service.introKey)}</p>
        </div>
      </section>

      {/* Content + sticky form */}
      <div className="container section">
        <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
          <div className="space-y-12">
            {/* What's included */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">{t("service_includes_eyebrow")}</span>
              <h2 className="text-2xl font-bold mb-6">
                {t("service_includes_title")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.includesKeys.map((itemKey) => (
                  <div
                    key={itemKey}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--muted-bg)] border border-[var(--border)]"
                  >
                    <span className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)] font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-[var(--fg)]">
                      {t(itemKey)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">{t("service_process_eyebrow")}</span>
              <h2 className="text-2xl font-bold mb-6">{t("service_process_title")}</h2>
              <div className="grid gap-6">
                {steps.map((s, i) => (
                  <div key={s.num} className="flex gap-4 items-start">
                    <span className="step-no shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="text-base font-bold mb-1">{s.title}</h3>
                      <p className="text-sm text-[var(--muted)] m-0">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Service × City — internal linking */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">{t("service_area_eyebrow")}</span>
              <h2 className="text-2xl font-bold mb-3">
                {t("service_area_title", { service: t(service.nameKey) })}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-6">
                {t("service_area_desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                {coreCities.map((c) => (
                  <PageLink
                    key={c.name}
                    to={{ type: "city", city: c.name }}
                    navigate={navigate}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-white text-xs font-semibold text-[var(--fg)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all no-underline"
                  >
                    <Icon name="pin" size={13} color="var(--brand)" />
                    {c.name}
                  </PageLink>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky quote form */}
          <div>
            <div id="quote" className="sticky top-24 card p-6 md:p-7 shadow-lg border-2 border-[var(--brand)]">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="check" size={18} color="var(--brand)" />
                <h2 className="text-lg font-bold m-0">{t("service_quote_title")}</h2>
              </div>
              <p className="text-xs text-[var(--muted)] mb-5">
                {t("service_quote_sub", { service: t(service.nameKey).toLowerCase() })}
              </p>
              <QuoteForm
                compact
                sourcePage={`service:${service.slug}`}
                presetService={service.name}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related services */}
      <section className="section section--muted">
        <div className="container">
          <span className="eyebrow">{t("service_related_eyebrow")}</span>
          <h2>{t("service_related_title")}</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {related.map((s) => (
              <PageLink
                key={s.slug}
                to={{ type: "service", slug: s.slug }}
                navigate={navigate}
                className="card service-card-link text-left no-underline bg-white"
              >
                <div className="service-card-media" style={{ height: 140 }}>
                  <img src={s.image} alt="" {...imageSize(s.image)} loading="lazy" decoding="async" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-1">{t(s.nameKey)}</h3>
                  <span className="more text-xs" aria-hidden="true">{t("link_more")} &rarr;</span>
                </div>
              </PageLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
