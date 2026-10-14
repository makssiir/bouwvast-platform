import type { Page } from "../lib/routes"
import QuoteForm from "../components/QuoteForm"
import PageLink from "../components/PageLink"
import { ARTICLES } from "../data/articles"
import { claim } from "../data/claims"
import { useLang } from "../i18n/LangContext"
import JsonLd from "../components/JsonLd"
import { faqEntries } from "../data/faq"

import HeroSection from "../components/home/HeroSection"
import ServicesSection from "../components/home/ServicesSection"
import HowItWorksSection from "../components/home/HowItWorksSection"
import CostEstimator from "../components/home/CostEstimator"
import PostalCodeChecker from "../components/home/PostalCodeChecker"
import BeforeAfter from "../components/home/BeforeAfter"
import BottomConversionBand from "../components/home/BottomConversionBand"

/**
 * Sections that make a factual claim (statistics, reviews, projects, team,
 * prices) only render when the matching switch in data/claims.ts is on.
 */
export default function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <HeroSection navigate={navigate} />
      {claim("pricing") && <CostEstimator />}
      {claim("serviceArea") && <PostalCodeChecker navigate={navigate} />}
      <ServicesSection navigate={navigate} />
      {claim("projects") && <BeforeAfter />}
      <HowItWorksSection navigate={navigate} />
      <KennisbankPreviewSection navigate={navigate} />
      <FAQSection />
      <QuoteFormSection />
      <BottomConversionBand navigate={navigate} />
    </>
  )
}

/* ==========================================================================
   7. KENNISBANK PREVIEW
   ========================================================================== */
function KennisbankPreviewSection({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t, pick } = useLang()
  const previewArticles = ARTICLES.slice(0, 3)

  const kbLabels = {
    eyebrow: pick({ nl: "Advies & tips", en: "Advice & tips", uk: "Поради та рекомендації", ru: "Советы и рекомендации" }),
    title: pick({ nl: "Kennisbank voor huiseigenaren", en: "Knowledge base for homeowners", uk: "База знань для власників житла", ru: "База знаний для владельцев жилья" }),
    sub: t("kb_page_sub"),
  }

  return (
    <section
      className="section bg-[var(--muted-bg)] border-t border-[var(--border)]"
      id="kennisbank"
    >
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">{kbLabels.eyebrow}</span>
          <h2>{kbLabels.title}</h2>
          <p className="lead">{kbLabels.sub}</p>
        </div>

        <div className="grid grid-3">
          {previewArticles.map((art) => (
            <article
              key={art.slug}
              className="card overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-white relative"
            >
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-3">
                    <span className="font-bold text-[var(--brand)]">
                      {art.category}
                    </span>
                    <span>⏱ {art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--fg)] mb-2 leading-snug">
                    <PageLink
                      to={{ type: "article", slug: art.slug }}
                      navigate={navigate}
                      className="text-inherit no-underline after:absolute after:inset-0 after:content-['']"
                    >
                      {art.title}
                    </PageLink>
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2 mb-4 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <span className="more text-xs font-bold" aria-hidden="true">
                  {t("kb_read_article")} &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="btn-row centered-actions">
          <PageLink to="kennisbank" navigate={navigate} className="btn btn-outline no-underline">
            {t("nav_kennisbank")}
          </PageLink>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   8. FAQ SECTION
   ========================================================================== */
function FAQSection() {
  const { t } = useLang()
  const faqs = faqEntries(t)

  return (
    <section className="section section--muted" id="faq">
      <div className="container" style={{ maxWidth: "840px" }}>
        <div className="center mb-10">
          <span className="eyebrow">{t("faq_label")}</span>
          <h2>{t("faq_title")}</h2>
        </div>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />

        <div className="faq">
          {faqs.map((item, idx) => (
            <details key={idx}>
              <summary>{item.q}</summary>
              <div className="answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   9. CRM QUOTE FORM SECTION
   ========================================================================== */
function QuoteFormSection() {
  const { t } = useLang()

  return (
    <section id="quote" className="section">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <span className="eyebrow">{t("cta_btn")}</span>
            <h2>{t("form_title")}</h2>
            <p className="text-[var(--muted)] text-base mb-6">
              {t("form_sub")}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-sm font-semibold text-[var(--fg)]">
                  {t("hero_trust_1")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-sm font-semibold text-[var(--fg)]">
                  {t("hero_trust_2")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-sm font-semibold text-[var(--fg)]">
                  {t("hero_trust_3")}
                </span>
              </div>
            </div>
          </div>

          <div className="card p-6 md:p-8 shadow-md">
            <QuoteForm sourcePage="home" />
          </div>
        </div>
      </div>
    </section>
  )
}

