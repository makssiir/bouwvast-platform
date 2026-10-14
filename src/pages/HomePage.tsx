import type { Page } from "../lib/routes"
import PageLink from "../components/PageLink"
import QuoteSection from "../components/QuoteSection"
import More from "../components/More"
import Icon from "../components/Icon"
import { ARTICLES } from "../data/articles"
import { useLang } from "../i18n/LangContext"
import JsonLd from "../components/JsonLd"
import { faqEntries } from "../data/faq"
import { scrollToQuote } from "../lib/quoteDraft"

import HeroSection from "../components/home/HeroSection"
import ServicesSection from "../components/home/ServicesSection"
import HowItWorksSection from "../components/home/HowItWorksSection"
import CostEstimator from "../components/home/CostEstimator"
import PostalCodeChecker from "../components/home/PostalCodeChecker"
import BeforeAfter from "../components/home/BeforeAfter"

/**
 * Sections that make a factual claim (statistics, reviews, projects, team,
 * prices) only render when the matching switch in data/claims.ts is on. The
 * widgets below make none: the calculator is labelled an indication, the
 * before/after pairs are labelled impressions until real projects exist,
 * and the area checker answers from the same list as /werkgebied/.
 */
export default function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <HeroSection navigate={navigate} />
      <ServicesSection navigate={navigate} />
      <CostEstimator />
      <BeforeAfter navigate={navigate} />
      <HowItWorksSection />
      <PostalCodeChecker navigate={navigate} />
      <KennisbankPreviewSection navigate={navigate} />
      <FAQSection navigate={navigate} />
      <QuoteSection sourcePage="home" />
    </>
  )
}

function KennisbankPreviewSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const previewArticles = ARTICLES.slice(0, 3)

  return (
    <section className="section" id="kennisbank" aria-labelledby="kb-preview-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              {pick({ nl: "Advies & tips", en: "Advice & tips", uk: "Поради та рекомендації", ru: "Советы и рекомендации" })}
            </p>
            <h2 id="kb-preview-title">
              {pick({
                nl: "Kennisbank voor huiseigenaren",
                en: "Knowledge base for homeowners",
                uk: "База знань для власників житла",
                ru: "База знаний для владельцев жилья",
              })}
            </h2>
            <p>{t("kb_page_sub")}</p>
          </div>
          <PageLink to="kennisbank" navigate={navigate} className="btn btn-outline">
            {t("nav_kennisbank")}
          </PageLink>
        </div>

        <ul className="grid grid-3 list-none m-0 p-0">
          {previewArticles.map((art) => (
            <li key={art.slug}>
              <article className="card article-card">
                <div className="article-meta">
                  <span className="tag">{art.category}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" size={14} />
                    {art.readTime}
                  </span>
                </div>
                <h3>
                  <PageLink to={{ type: "article", slug: art.slug }} navigate={navigate}>
                    {art.title}
                  </PageLink>
                </h3>
                <p className="line-clamp-3">{art.excerpt}</p>
                <More hidden>{t("kb_read_article")}</More>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FAQSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const faqs = faqEntries(t)

  return (
    <section className="section section--soft" id="faq" aria-labelledby="faq-title">
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
      <div className="container faq-layout">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">{t("faq_label")}</p>
          <h2 id="faq-title">{t("faq_title")}</h2>
          <p className="lead">
            {pick({
              nl: "Staat uw vraag er niet tussen? Beschrijf uw situatie in het aanvraagformulier, dan nemen we contact met u op.",
              en: "Is your question not listed? Describe your situation in the request form and we will get in touch.",
              uk: "Не знайшли свого запитання? Опишіть ситуацію у формі запиту, і ми з вами зв'яжемося.",
              ru: "Не нашли свой вопрос? Опишите ситуацию в форме запроса, и мы с вами свяжемся.",
            })}
          </p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              if (!scrollToQuote()) navigate("contact")
            }}
          >
            {t("cta_btn")}
          </button>
        </div>

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
