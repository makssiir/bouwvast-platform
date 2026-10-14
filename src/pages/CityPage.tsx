import type { Page } from "../lib/routes"
import Breadcrumb from "../components/Breadcrumb"
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
      {/* Page hero */}
      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb
            navigate={navigate}
            items={[{ label: t("nav_area"), to: "werkgebied" }, { label: city }]}
          />
          <h1>{t("city_hero_title", { city })}</h1>
          <p className="lead-xl max-w-2xl">
            {t("city_hero_sub", { city })}
          </p>
        </div>
      </section>

      {/* Main content + sticky form */}
      <div className="container section">
        <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
          <div className="space-y-12">
            {/* Services in City */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">{t("city_services_eyebrow", { city })}</span>
              <h2 className="text-2xl font-bold mb-6">
                {t("city_services_title", { city })}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  return (
                    <PageLink
                      key={s.slug}
                      to={{ type: "service", slug: s.slug }}
                      navigate={navigate}
                      className="block text-left p-4 rounded-xl border transition-all no-underline border-[var(--border)] bg-white hover:border-[var(--brand)] hover:shadow-xs"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon name={s.icon} size={18} color="var(--brand)" />
                        <span className="font-bold text-sm text-[var(--fg)]">
                          {t(s.nameKey)}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] m-0 line-clamp-2">
                        {t(s.introKey)}
                      </p>
                    </PageLink>
                  )
                })}
              </div>
            </section>

            {/* SEO Text */}
            <section className="card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">
                {t("city_seo_title", { city })}
              </h2>
              <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
                <p>{t("city_seo_p1", { city })}</p>
                <p>{t("city_seo_p2", { city })}</p>
              </div>
            </section>

            {/* FAQ */}
            <section className="card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-5">
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

          {/* Right: sticky quote form */}
          <div>
            <div id="quote" className="sticky top-24 card p-6 md:p-7 shadow-lg border-2 border-[var(--brand)]">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="check" size={18} color="var(--brand)" />
                <h2 className="text-lg font-bold m-0">{t("city_quote_title", { city })}</h2>
              </div>
              <p className="text-xs text-[var(--muted)] mb-5">
                {t("city_quote_sub", { city })}
              </p>
              <QuoteForm compact sourcePage={`city:${city}`} presetCity={city} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
