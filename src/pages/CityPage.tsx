import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import { SERVICES } from "../data/services"
import Icon from "../components/Icon"
import QuoteForm from "../components/QuoteForm"
import { useLang } from "../i18n/LangContext"

export default function CityPage({
  city,
  navigate,
}: {
  city: string
  navigate: (p: Page) => void
}) {
  const { t } = useLang()

  const faqItems = [
    {
      q: t("city_faq_1_q", { city }),
      a: t("city_faq_1_a", { city }),
    },
    {
      q: t("city_faq_2_q", { city }),
      a: t("city_faq_2_a", { city }),
    },
    {
      q: t("city_faq_3_q", { city }),
      a: t("city_faq_3_a", { city }),
    },
    {
      q: t("city_faq_4_q", { city }),
      a: t("city_faq_4_a", { city }),
    },
  ]

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_area"), to: "werkgebied" }, { label: city }]}
        eyebrow={t("nav_area")}
        title={t("city_hero_title", { city })}
        lead={t("city_hero_sub", { city })}
      />

      {/* Main content + sticky form */}
      <div className="container section">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="space-y-6">
            {/* Services in City */}
            <section className="card p-6 md:p-8">
              <p className="eyebrow">{t("city_services_eyebrow", { city })}</p>
              <h2 className="mb-6 text-2xl md:text-[1.75rem]">
                {t("city_services_title", { city })}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  return (
                    <PageLink
                      key={s.slug}
                      to={{ type: "service", slug: s.slug }}
                      navigate={navigate}
                      className="block rounded-xl border border-line bg-white p-4 text-left transition-colors hover:border-pine-500 hover:bg-pine-50 hover:no-underline"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <Icon name={s.icon} size={18} color="var(--color-pine-700)" />
                        <span className="font-display text-[0.95rem] font-bold text-ink">
                          {t(s.nameKey)}
                        </span>
                      </div>
                      <p className="m-0 line-clamp-2 text-sm text-muted">
                        {t(s.introKey)}
                      </p>
                    </PageLink>
                  )
                })}
              </div>
            </section>

            {/* SEO Text */}
            <section className="card p-6 md:p-8">
              <h2 className="mb-4 text-2xl">
                {t("city_seo_title", { city })}
              </h2>
              <div className="space-y-3 leading-relaxed text-muted">
                <p>{t("city_seo_p1", { city })}</p>
                <p>{t("city_seo_p2", { city })}</p>
              </div>
            </section>

            {/* FAQ */}
            <section className="card p-6 md:p-8">
              <h2 className="mb-5 text-2xl">
                {t("city_faq_title", { city })}
              </h2>
              <div className="faq">
                {faqItems.map((item, i) => (
                  <details key={i}>
                    <summary>{item.q}</summary>
                    <div className="answer">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside id="quote" className="form-card lg:sticky lg:top-24" aria-labelledby="city-quote-title">
            <h2 id="city-quote-title" className="mb-1 text-xl">
              {t("city_quote_title", { city })}
            </h2>
            <p className="mb-5 text-sm text-muted">{t("city_quote_sub", { city })}</p>
            <QuoteForm compact sourcePage={`city:${city}`} presetCity={city} />
          </aside>
        </div>
      </div>
    </>
  )
}
