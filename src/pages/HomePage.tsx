import React, { useState } from "react"
import type { Page } from "../App"
import QuoteForm from "../components/QuoteForm"
import Icon from "../components/Icon"
import { CONTACT } from "../data/contact"
import { ARTICLES } from "../data/articles"
import { useLang } from "../i18n/LangContext"
import JsonLd from "../components/JsonLd"
import { faqEntries } from "../data/faq"

import HeroSection from "../components/home/HeroSection"
import ServicesSection from "../components/home/ServicesSection"
import HowItWorksSection from "../components/home/HowItWorksSection"
import CostEstimator from "../components/home/CostEstimator"
import BeforeAfter from "../components/home/BeforeAfter"
import ReviewsSection from "../components/home/ReviewsSection"
import ProjectModal, { type ProjectDetail } from "../components/ProjectModal"

export default function HomePage({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null)

  const handleRequestQuoteFromProject = (serviceSlug: string) => {
    navigate({ type: "service", slug: serviceSlug })
  }

  return (
    <main id="main">
      <HeroSection navigate={navigate} />
      <StatsBand />
      <CostEstimator />
      <ServicesSection navigate={navigate} />
      <BeforeAfter />
      <AudienceSection navigate={navigate} />
      <HowItWorksSection navigate={navigate} />
      <PricingPreviewSection navigate={navigate} />
      <FounderTrustCard />
      <ReviewsSection />
      <ProjectGallery
        onOpenProject={(p) => setActiveProject(p)}
        navigate={navigate}
      />
      <KennisbankPreviewSection navigate={navigate} />
      <FAQSection />
      <QuoteFormSection />
      <CTASection navigate={navigate} />

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestQuote={handleRequestQuoteFromProject}
      />
    </main>
  )
}

/* ==========================================================================
   1. STATS BAND
   ========================================================================== */
function StatsBand() {
  const { t } = useLang()
  const facts = [
    { value: t("stat_1_val"), label: t("stat_1_lbl") },
    { value: t("stat_2_val"), label: t("stat_2_lbl") },
    { value: t("stat_3_val"), label: t("stat_3_lbl") },
    { value: t("stat_4_val"), label: t("stat_4_lbl") },
  ]

  return (
    <section className="stats-band" aria-label="Bouwvast in het kort">
      <div className="container">
        <dl className="stats">
          {facts.map((fact, idx) => (
            <div className="stat" key={idx}>
              <dd className="num">{fact.value}</dd>
              <dt className="label">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ==========================================================================
   2. AUDIENCE SECTION ("Voor wie")
   ========================================================================== */
function AudienceSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

  return (
    <section className="section home-audience-strip">
      <div className="container">
        <div className="home-audience-heading">
          <div>
            <span className="eyebrow">{t("aud_label")}</span>
            <h2>{t("aud_title")}</h2>
          </div>
          <p className="text-[var(--muted)] text-base m-0">{t("aud_sub")}</p>
        </div>

        <div className="home-audience-grid">
          <article className="card home-audience-card">
            <div className="business-card-icon">
              <Icon name="renovation" size={24} color="var(--brand)" />
            </div>
            <span className="card-eyebrow">{t("aud_part_title")}</span>
            <h3>{t("aud_part_heading")}</h3>
            <p className="text-[var(--muted)] mb-4">{t("aud_part_desc")}</p>
            <button
              onClick={() => navigate("diensten")}
              className="more bg-transparent border-0 p-0 cursor-pointer"
            >
              {t("services_all")} &rarr;
            </button>
          </article>

          <article className="card home-audience-card home-audience-card--partner">
            <div className="business-card-icon">
              <Icon name="tools" size={24} color="#0284c7" />
            </div>
            <span className="card-eyebrow">{t("aud_b2b_title")}</span>
            <h3>{t("aud_b2b_heading")}</h3>
            <p className="text-[var(--muted)] mb-4">{t("aud_b2b_desc")}</p>
            <button
              onClick={() => navigate("zakelijk")}
              className="more text-[#0284c7] bg-transparent border-0 p-0 cursor-pointer"
            >
              {t("nav_business")} &rarr;
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   4. TRANSPARANTE TARIEVEN
   ========================================================================== */
function PricingPreviewSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, lang } = useLang()

  const pricesData: Record<string, { label: string; price: string; slug: string }[]> = {
    uk: [
      { label: "Погодинна ставка майстра", price: "€55 / год", slug: "algemeen" },
      { label: "Комплексний ремонт будинку", price: "Фіксована ціна", slug: "renovatie" },
      { label: "Ремонт ванної кімнати та санвузла", price: "Фіксована ціна", slug: "badkamer-keuken" },
      { label: "Штукатурка та чистове оздоблення", price: "Від €45 / м²", slug: "afbouw" },
      { label: "Внутрішнє фарбування та стіни", price: "Від €35 / м²", slug: "schilderwerk" },
      { label: "Столярні роботи, вікна та двері", price: "Від €55 / год", slug: "timmerman" },
      { label: "Сантехнічні роботи та комунікації", price: "Від €65 / год", slug: "loodgieter" },
      { label: "Фасадні роботи та розшивка швів", price: "Від €48 / м²", slug: "gevel-buitenwerk" },
    ],
    en: [
      { label: "Craftsman hourly rate", price: "€55 / hr", slug: "algemeen" },
      { label: "Complete house renovation", price: "Fixed quote", slug: "renovatie" },
      { label: "Bathroom & sanitary remodeling", price: "Fixed price", slug: "badkamer-keuken" },
      { label: "Plastering & wall finishing", price: "From €45 / m²", slug: "afbouw" },
      { label: "Interior painting & coats", price: "From €35 / m²", slug: "schilderwerk" },
      { label: "Carpentry, frames & doors", price: "From €55 / hr", slug: "timmerman" },
      { label: "Plumbing & piping", price: "From €65 / hr", slug: "loodgieter" },
      { label: "Facade renovation & repointing", price: "From €48 / m²", slug: "gevel-buitenwerk" },
    ],
    ru: [
      { label: "Почасовая ставка мастера", price: "€55 / час", slug: "algemeen" },
      { label: "Комплексный ремонт дома", price: "Фиксированная цена", slug: "renovatie" },
      { label: "Ремонт ванной комнаты и санузла", price: "Фиксированная цена", slug: "badkamer-keuken" },
      { label: "Штукатурка и чистовая отделка", price: "От €45 / м²", slug: "afbouw" },
      { label: "Внутренняя покраска и стены", price: "От €35 / м²", slug: "schilderwerk" },
      { label: "Столярные работы, окна и двери", price: "От €55 / час", slug: "timmerman" },
      { label: "Сантехнические работы и трубы", price: "От €65 / час", slug: "loodgieter" },
      { label: "Фасадные работы и швы", price: "От €48 / м²", slug: "gevel-buitenwerk" },
    ],
    nl: [
      { label: "Uurtarief vakman (arbeid)", price: "€55 / uur", slug: "algemeen" },
      { label: "Complete woningrenovatie", price: "Vaste offerte", slug: "renovatie" },
      { label: "Badkamer- & sanitairrenovatie", price: "Vaste projectprijs", slug: "badkamer-keuken" },
      { label: "Stucwerk & wandafwerking", price: "Vanaf €45 / м²", slug: "afbouw" },
      { label: "Binnenschilderwerk & sauswerk", price: "Vanaf €35 / м²", slug: "schilderwerk" },
      { label: "Timmerwerk, kozijnen & deuren", price: "Vanaf €55 / uur", slug: "timmerman" },
      { label: "Loodgieter & leidingwerk", price: "Vanaf €65 / uur", slug: "loodgieter" },
      { label: "Gevelrenovatie & voegwerk", price: "Vanaf €48 / м²", slug: "gevel-buitenwerk" },
    ],
  }

  const prices = pricesData[lang] ?? pricesData.nl

  return (
    <section className="section section--muted" id="tarieven">
      <div className="container price-preview">
        <div>
          <span className="eyebrow">{t("price_label")}</span>
          <h2>{t("price_title")}</h2>
          <p className="text-[var(--muted)] mb-6">{t("price_sub")}</p>
          <button
            className="btn btn-outline"
            onClick={() => navigate("diensten")}
          >
            {t("services_all")}
          </button>
        </div>

        <div className="table-wrap">
          <div className="table-head">{t("services_title")}</div>
          <table className="price-table">
            <colgroup>
              <col className="w-[60%] sm:w-[64%]" />
              <col className="w-[40%] sm:w-[36%]" />
            </colgroup>
            <tbody>
              {prices.map((row) => (
                <tr key={row.label}>
                  <td>
                    <button
                      onClick={() =>
                        navigate({ type: "service", slug: row.slug })
                      }
                      className="bg-transparent border-0 p-0 text-left font-semibold text-[var(--fg)] hover:text-[var(--brand)] cursor-pointer text-sm sm:text-base leading-snug"
                    >
                      {row.label}
                    </button>
                  </td>
                  <td className="price">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   5. FOUNDER TRUST CARD
   ========================================================================== */
function FounderTrustCard() {
  const { t, lang } = useLang()

  const teamCaption =
    lang === "uk"
      ? "Команда майстрів Bouwvast у Нідерландах"
      : lang === "ru"
        ? "Команда мастеров Bouwvast в Нидерландах"
        : lang === "en"
          ? "Bouwvast Team of Craftsmen Netherlands"
          : "Vakteam Bouwvast Nederland"

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8 md:p-12 shadow-2xl border border-slate-700/50">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#4ade80] font-bold block mb-2">
                {t("trust_card_label")}
              </span>
              <h2 className="trust-card-title text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                {t("trust_card_title")}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {t("trust_card_desc")}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200 mb-6">
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <span className="text-[#4ade80]">✓</span> {t("trust_badge_1")}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <span className="text-[#4ade80]">✓</span> {t("trust_badge_2")}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <span className="text-[#4ade80]">✓</span> {t("trust_badge_3")}
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 border-2 border-slate-700">
              <img
                src="/images/site-team.webp"
                alt="Bouwvast vaklieden"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white">
                  {teamCaption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   6. PROJECT GALLERY
   ========================================================================== */
function ProjectGallery({
  onOpenProject,
  navigate,
}: {
  onOpenProject: (p: ProjectDetail) => void
  navigate: (p: Page) => void
}) {
  const { t, lang } = useLang()

  const projectsByLang: Record<string, ProjectDetail[]> = {
    uk: [
      {
        title: "Комплексний ремонт кухні та паркет ялинкою",
        category: "Кухні та оздоблення",
        city: "Амерсфорт Ватгорст",
        image: "/images/kitchen-after.jpg",
        desc: "Повна заміна труб, електропроводки, укладання плитки та бездоганне оздоблення стін із вбудованим освітленням.",
        duration: "3 тижні",
        materials: "Матові антрацитові фасади, композитна стільниця, дубовий паркет",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Капітальний ремонт житла та дзеркальна штукатурка",
        category: "Реновація житла",
        city: "Леусден",
        image: "/images/living-after.jpg",
        desc: "Комплексна підготовка стін, утеплення та бездоганне фарбування всього першого поверху будинку.",
        duration: "4 тижні",
        materials: "Штукатурка Knauf MP75, фарба Sigma Sigmatex",
        serviceSlug: "renovatie",
      },
      {
        title: "Елітна ванна кімната з душовою зоною",
        category: "Ванні кімнати та санвузли",
        city: "Утрехт Схід",
        image: "/images/bath-after.jpg",
        desc: "Облаштування просторої душової зони з великоформатною керамічною плиткою під бетон, нішевим світлом і дубовими меблями.",
        duration: "2.5 тижні",
        materials: "Керамічна плитка 60x120 см, змішувачі Grohe",
        serviceSlug: "badkamer-keuken",
      },
    ],
    en: [
      {
        title: "Complete Kitchen Remodel & Herringbone Flooring",
        category: "Kitchen & Finishing",
        city: "Amersfoort Vathorst",
        image: "/images/kitchen-after.jpg",
        desc: "Complete overhaul of plumbing, electrics, tiling, and pristine wall finishes with integrated lighting.",
        duration: "3 weeks",
        materials: "Matte anthracite cabinets, composite countertop, oak herringbone",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Home Renovation & Mirror-Smooth Plastering",
        category: "Home Renovation",
        city: "Leusden",
        image: "/images/living-after.jpg",
        desc: "Full wall preparation, insulation, and immaculate spray painting across the entire ground floor.",
        duration: "4 weeks",
        materials: "Knauf MP75 plastering, Sigma Sigmatex paint",
        serviceSlug: "renovatie",
      },
      {
        title: "Luxury Bathroom Remodel with Walk-In Shower",
        category: "Bathroom & Sanitary",
        city: "Utrecht East",
        image: "/images/bath-after.jpg",
        desc: "Conversion to walk-in shower with large-format concrete-look tiles, niche LED illumination, and oak vanity.",
        duration: "2.5 weeks",
        materials: "60x120cm ceramic tiles, Grohe concealed faucets",
        serviceSlug: "badkamer-keuken",
      },
    ],
    nl: [
      {
        title: "Complete Keukenrenovatie & Visgraatvloer",
        category: "Keuken & Afbouw",
        city: "Amersfoort Vathorst",
        image: "/images/kitchen-after.jpg",
        desc: "Volledige vernieuwing van leidingwerk, elektra, tegelwerk en strakke wandafwerking met inbouwverlichting.",
        duration: "3 weken",
        materials: "Mat-antraciet kasten, composiet werkblad, eiken visgraat",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Woningrenovatie & Spiegelglad Stucwerk",
        category: "Woningrenovatie",
        city: "Leusden",
        image: "/images/living-after.jpg",
        desc: "Complete aanpak van wanden, isolatie en strak sauswerk in de gehele benedenverdieping.",
        duration: "4 weken",
        materials: "Knauf MP75 pleisterwerk, Sigma Sigmatex sauswerk",
        serviceSlug: "renovatie",
      },
      {
        title: "Luxe Badkamerrenovatie met Inloopdouche",
        category: "Badkamer & Sanitair",
        city: "Utrecht Oost",
        image: "/images/bath-after.jpg",
        desc: "Ombouw naar luxe inloopdouche met grootformaat betonlook tegels, nisverlichting en eiken meubel.",
        duration: "2.5 weken",
        materials: "60x120cm keramische tegels, Grohe inbouwkranen",
        serviceSlug: "badkamer-keuken",
      },
    ],
  }

  const sampleProjects = projectsByLang[lang] ?? projectsByLang.uk

  const viewProjectLabel =
    lang === "uk"
      ? "Переглянути проєкт"
      : lang === "ru"
        ? "Посмотреть проект"
        : lang === "en"
          ? "View project"
          : "Bekijk project"

  return (
    <section className="section" id="projecten">
      <div className="container">
        <div className="center mb-12">
          <span className="eyebrow">{t("projects_label")}</span>
          <h2>{t("projects_title")}</h2>
          <p className="lead">{t("projects_sub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleProjects.map((p, i) => (
            <div
              key={i}
              className="card overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between rounded-2xl border border-[var(--border)]"
              onClick={() => onOpenProject(p)}
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[var(--brand)] shadow-md">
                  {p.category}
                </span>
                <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[rgba(15,23,42,0.85)] backdrop-blur-xs shadow-md">
                  📍 {p.city}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-2.5 group-hover:text-[var(--brand)] transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    ⏱ {p.duration}
                  </span>
                  <span className="text-sm font-bold text-[var(--brand)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {viewProjectLabel} &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-row centered-actions mt-10">
          <button
            className="btn btn-primary"
            onClick={() => navigate("projecten")}
          >
            {t("projects_title")} &rarr;
          </button>
        </div>
      </div>
    </section>
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
  const { t, lang } = useLang()
  const previewArticles = ARTICLES.slice(0, 3)

  const kbLabels = {
    eyebrow: lang === "uk" ? "Поради та рекомендації" : "Advies & Tips",
    title: lang === "uk" ? "База знань для власників житла" : "Kennisbank voor huiseigenaren",
    sub:
      lang === "uk"
        ? "Практичні рекомендації щодо вартості ремонту, підготовки та будівельних норм."
        : "Praktische gidsen over verbouwingskosten, voorbereiding en bouwvoorschriften.",
    readMore: lang === "uk" ? "Читати статтю" : "Lees artikel",
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
              onClick={() => navigate("kennisbank" as any)}
              className="card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-white"
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
                    {art.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2 mb-4 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <span className="more text-xs font-bold">
                  {kbLabels.readMore} &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="btn-row centered-actions">
          <button
            className="btn btn-outline"
            onClick={() => navigate("kennisbank" as any)}
          >
            {t("nav_kennisbank")}
          </button>
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

/* ==========================================================================
   10. CTA SECTION
   ========================================================================== */
function CTASection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

  const handleQuoteClick = () => {
    const quoteEl = document.getElementById("quote")
    if (quoteEl) quoteEl.scrollIntoView({ behavior: "smooth" })
    else navigate("contact")
  }

  return (
    <section className="section section--muted">
      <div className="container">
        <div className="cta-band">
          <h2>{t("cta_title")}</h2>
          <p>{t("cta_sub")}</p>
          <div className="btn-row justify-center">
            <button onClick={handleQuoteClick} className="btn btn-white btn-lg">
              <Icon name="check" size={20} />
              {t("cta_btn")}
            </button>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="btn btn-outline-white btn-lg"
            >
              <Icon name="phone" size={20} />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionLabel({
  children,
  white,
}: {
  children: string
  white?: boolean
}) {
  return (
    <span className={`eyebrow ${white ? "text-white/80" : ""}`}>
      {children}
    </span>
  )
}

export function H2({
  children,
  className = "",
  white,
}: {
  children: React.ReactNode
  className?: string
  white?: boolean
}) {
  return (
    <h2 className={`${className} ${white ? "text-white" : ""}`}>{children}</h2>
  )
}
