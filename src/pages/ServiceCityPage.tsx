import { useState } from "react"
import type { Page } from "../App"
import { SERVICE_BY_SLUG, SERVICES } from "../data/services"
import Icon from "../components/Icon"
import QuoteForm from "../components/QuoteForm"
import { useLang } from "../i18n/LangContext"

export default function ServiceCityPage({
  city,
  serviceSlug,
  navigate,
}: {
  city: string
  serviceSlug: string
  navigate: (p: Page) => void
}) {
  const { t } = useLang()
  // const [openFaq, setOpenFaq] = useState<number | null>(null) // removed unused
  const activeService = serviceSlug ? SERVICE_BY_SLUG[serviceSlug] : undefined

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

  const heroTitle = activeService
    ? `${t(activeService.nameKey)} in ${city}` // Assuming 'in' is acceptable across languages, or they add a key later
    : t("city_hero_title", { city })

  const heroSub = activeService
    ? t(activeService.introKey)
    : t("city_hero_sub", { city })

  return (
    <main>
      {/* Page hero */}
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button
              onClick={() => navigate("home")}
              className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer"
            >
              {t("nav_home")}
            </button>
            <span className="mx-2">›</span>
            <button
              onClick={() => navigate("werkgebied")}
              className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer"
            >
              {t("nav_areas")}
            </button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">{city}</span>
          </div>
          <h1>{heroTitle}</h1>
          <p className="lead-xl max-w-2xl">{heroSub}</p>
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
                  const isActive = activeService?.slug === s.slug
                  return (
                    <button
                      key={s.slug}
                      onClick={() =>
                        navigate({ type: "service_city", city, serviceSlug: s.slug })
                      }
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? "border-[var(--brand)] bg-[var(--brand-subtle)]"
                          : "border-[var(--border)] bg-white hover:border-[var(--brand)] hover:shadow-xs"
                      }`}
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
                    </button>
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
            <div className="sticky top-24 card p-6 md:p-7 shadow-lg border-2 border-[var(--brand)]">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="check" size={18} color="var(--brand)" />
                <h3 className="text-lg font-bold m-0">{t("city_quote_title", { city })}</h3>
              </div>
              <p className="text-xs text-[var(--muted)] mb-5">
                {t("city_quote_sub", { city })}
              </p>
              <QuoteForm
                compact
                sourcePage={`service_city:${city}:${serviceSlug}`}
                presetService={activeService?.name}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
