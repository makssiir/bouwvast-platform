import React, { useState } from "react";
import type { Page } from "../App";
import QuoteForm from "../components/QuoteForm";
import Icon from "../components/Icon";
import { CONTACT } from "../data/contact";
import { ARTICLES } from "../data/articles";
import { useLang } from "../i18n/LangContext";

import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import CostEstimator from "../components/home/CostEstimator";
import BeforeAfter from "../components/home/BeforeAfter";
import ProjectModal, { type ProjectDetail } from "../components/ProjectModal";

export default function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const handleRequestQuoteFromProject = (serviceSlug: string) => {
    navigate({ type: "service", slug: serviceSlug });
  };

  return (
    <main id="main">
      <HeroSection navigate={navigate} />
      <StatsBand />
      <CostEstimator />
      <ServicesSection navigate={navigate} />
      <BeforeAfter />
      <AudienceSection navigate={navigate} />
      <HowItWorksSection navigate={navigate} />
      <GoogleReviews />
      <PricingPreviewSection navigate={navigate} />
      <FounderTrustCard navigate={navigate} />
      <ProjectGallery onOpenProject={(p) => setActiveProject(p)} navigate={navigate} />
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
  );
}

/* ==========================================================================
   1. STATS BAND
   ========================================================================== */
function StatsBand() {
  const { t } = useLang();
  const facts = [
    { value: t("stat_1_val"), label: t("stat_1_lbl") },
    { value: t("stat_2_val"), label: t("stat_2_lbl") },
    { value: t("stat_3_val"), label: t("stat_3_lbl") },
    { value: t("stat_4_val"), label: t("stat_4_lbl") },
  ];

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
  );
}

/* ==========================================================================
   2. AUDIENCE SECTION ("Voor wie")
   ========================================================================== */
function AudienceSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  return (
    <section className="section home-audience-strip">
      <div className="container">
        <div className="home-audience-heading">
          <div>
            <span className="eyebrow">{t("aud_label")}</span>
            <h2>{t("aud_title")}</h2>
          </div>
          <p className="text-[var(--muted)] text-base m-0">
            {t("aud_sub")}
          </p>
        </div>

        <div className="home-audience-grid">
          <article className="card home-audience-card">
            <div className="business-card-icon">
              <Icon name="renovation" size={24} color="var(--brand)" />
            </div>
            <span className="card-eyebrow">{t("aud_part_title")}</span>
            <h3>{t("aud_part_heading")}</h3>
            <p className="text-[var(--muted)] mb-4">
              {t("aud_part_desc")}
            </p>
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
            <p className="text-[var(--muted)] mb-4">
              {t("aud_b2b_desc")}
            </p>
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
  );
}

/* ==========================================================================
   3. GOOGLE REVIEWS
   ========================================================================== */
function GoogleReviews() {
  const { t } = useLang();
  const reviews = [
    {
      name: "Mark van Dijk",
      city: "Amersfoort",
      time: "2 weken geleden",
      text: "Onze badkamer en toilet compleet laten renoveren door Bouwvast. Erg tevreden over de strakke afwerking, duidelijke communicatie en het meedenken tijdens de werkzaamheden!",
    },
    {
      name: "Sanne & Pieter",
      city: "Leusden",
      time: "1 maand geleden",
      text: "Volledige benedenverdieping gestukt en geschilderd. Ze werkten ontzettend netjes, hielden zich exact aan de offerte en planning. Een absolute aanrader.",
    },
    {
      name: "Robbert Jansen",
      city: "Soest",
      time: "2 maanden geleden",
      text: "Snel geholpen met een acute lekkage en herstel van leidingwerk. Duidelijke prijsafspraak vooraf en binnen no-time vakkundig opgelost.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">{t("rev_label")}</span>
          <h2>{t("rev_title")}</h2>
          <div className="rating-banner mt-3">
            <span className="stars text-xl">★★★★★</span>
            <span className="font-bold text-lg">5.0</span>
            <span className="text-[var(--muted)] text-sm">{t("rev_sub")}</span>
          </div>
        </div>

        <div className="reviews-scroll">
          {reviews.map((r, i) => (
            <div className="card" key={i}>
              <div className="review-head">
                <div className="avatar">
                  {r.name[0]}
                </div>
                <div>
                  <h3 className="text-base m-0 font-bold">{r.name}</h3>
                  <span className="text-xs text-[var(--muted)]">📍 {r.city} · {r.time}</span>
                </div>
              </div>
              <p className="text-[var(--muted)] text-sm leading-relaxed m-0">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. TRANSPARANTE TARIEVEN
   ========================================================================== */
function PricingPreviewSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();
  const prices = [
    { label: "Uurtarief vakman (arbeid)", price: "€55 / uur", slug: "algemeen" },
    { label: "Complete woningrenovatie", price: "Vaste offerte", slug: "renovatie" },
    { label: "Badkamer- & sanitairrenovatie", price: "Vaste projectprijs", slug: "badkamer-keuken" },
    { label: "Stucwerk & wandafwerking", price: "Vanaf €45 / m²", slug: "afbouw" },
    { label: "Binnenschilderwerk & sauswerk", price: "Vanaf €35 / m²", slug: "schilderwerk" },
    { label: "Timmerwerk, kozijnen & deuren", price: "Vanaf €55 / uur", slug: "timmerman" },
    { label: "Loodgieter & leidingwerk", price: "Vanaf €65 / uur", slug: "loodgieter" },
    { label: "Gevelrenovatie & voegwerk", price: "Vanaf €48 / m²", slug: "gevel-buitenwerk" },
  ];

  return (
    <section className="section section--muted" id="tarieven">
      <div className="container price-preview">
        <div>
          <span className="eyebrow">{t("price_label")}</span>
          <h2>{t("price_title")}</h2>
          <p className="text-[var(--muted)] mb-6">
            {t("price_sub")}
          </p>
          <button 
            className="btn btn-outline"
            onClick={() => navigate("diensten")}
          >
            {t("services_all")}
          </button>
        </div>

        <div className="table-wrap">
          <div className="table-head">{t("services_title")}</div>
          <table>
            <tbody>
              {prices.map((row) => (
                <tr key={row.label}>
                  <td>
                    <button 
                      onClick={() => navigate({ type: "service", slug: row.slug })}
                      className="bg-transparent border-0 p-0 text-left font-semibold text-[var(--fg)] hover:text-[var(--brand)] cursor-pointer"
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
  );
}

/* ==========================================================================
   5. FOUNDER TRUST CARD
   ========================================================================== */
function FounderTrustCard({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8 md:p-12 shadow-2xl border border-slate-700/50">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#4ade80] font-bold block mb-2">
                Vakmanschap & Betrouwbaarheid
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                "Bouwen op vertrouwen en heldere afspraken."
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Bij Bouwvast geloven we dat een verbouwing soepel en zorgeloos moet verlopen. Wij combineren jarenlange praktijkervaring met één vast aanspreekpunt en transparante prijzen. Geen verrassingen achteraf, maar een resultaat waar u jarenlang van geniet.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200 mb-6">
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <span className="text-[#4ade80]">✓</span> VCA Gecertificeerd
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <span className="text-[#4ade80]">✓</span> Garantie op Uitvoering
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <span className="text-[#4ade80]">✓</span> Vaste Prijscalculatie
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("over-ons")}
                  className="btn btn-white btn-sm"
                >
                  {t("nav_about")} &rarr;
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 border-2 border-slate-700">
              <img
                src="/images/site-team.webp"
                alt="Bouwvast vaklieden"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white">Vakteam Bouwvast Nederland</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. PROJECT GALLERY
   ========================================================================== */
function ProjectGallery({
  onOpenProject,
  navigate,
}: {
  onOpenProject: (p: ProjectDetail) => void;
  navigate: (p: Page) => void;
}) {
  const { t } = useLang();
  const sampleProjects: ProjectDetail[] = [
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
  ];

  return (
    <section className="section" id="projecten">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">{t("projects_label")}</span>
          <h2>{t("projects_title")}</h2>
          <p className="lead">{t("projects_sub")}</p>
        </div>

        <div className="grid grid-3">
          {sampleProjects.map((p, i) => (
            <div
              key={i}
              className="card overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              onClick={() => onOpenProject(p)}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-900">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-[var(--brand)] shadow-md">
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-[rgba(15,23,42,0.85)] shadow-xs">
                  📍 {p.city}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--fg)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <span className="more mt-3 text-xs font-bold block text-[var(--brand)]">
                  Bekijk project &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-row centered-actions mt-8">
          <button
            className="btn btn-primary"
            onClick={() => navigate("projecten")}
          >
            {t("projects_title")} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. KENNISBANK PREVIEW
   ========================================================================== */
function KennisbankPreviewSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <section className="section bg-[var(--muted-bg)] border-t border-[var(--border)]" id="kennisbank">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">Advies & Tips</span>
          <h2>Kennisbank voor huiseigenaren</h2>
          <p className="lead">
            Praktische gidsen over verbouwingskosten, voorbereiding en bouwvoorschriften.
          </p>
        </div>

        <div className="grid grid-3">
          {previewArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigate("kennisbank" as any)}
              className="card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-white"
            >
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-3">
                    <span className="font-bold text-[var(--brand)]">{art.category}</span>
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
                  Lees artikel &rarr;
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
  );
}

/* ==========================================================================
   8. FAQ SECTION
   ========================================================================== */
function FAQSection() {
  const { t } = useLang();
  const faqs = [
    { q: t("faq_1_q"), a: t("faq_1_a") },
    { q: t("faq_2_q"), a: t("faq_2_a") },
    { q: t("faq_3_q"), a: t("faq_3_a") },
    { q: t("faq_4_q"), a: t("faq_4_a") },
  ];

  return (
    <section className="section section--muted" id="faq">
      <div className="container" style={{ maxWidth: "840px" }}>
        <div className="center mb-10">
          <span className="eyebrow">{t("faq_label")}</span>
          <h2>{t("faq_title")}</h2>
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
  );
}

/* ==========================================================================
   9. CRM QUOTE FORM SECTION
   ========================================================================== */
function QuoteFormSection() {
  const { t } = useLang();

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
                <span className="text-sm font-semibold text-[var(--fg)]">100% vrijblijvend & gratis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-sm font-semibold text-[var(--fg)]">Binnen 24 uur een heldere reactie</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-sm font-semibold text-[var(--fg)]">Eén vast aanspreekpunt</span>
              </div>
            </div>
          </div>

          <div className="card p-6 md:p-8 shadow-md">
            <QuoteForm sourcePage="home" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   10. CTA SECTION
   ========================================================================== */
function CTASection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  const handleQuoteClick = () => {
    const quoteEl = document.getElementById("quote");
    if (quoteEl) quoteEl.scrollIntoView({ behavior: "smooth" });
    else navigate("contact");
  };

  return (
    <section className="section section--muted">
      <div className="container">
        <div className="cta-band">
          <h2>{t("cta_title")}</h2>
          <p>{t("cta_sub")}</p>
          <div className="btn-row justify-center">
            <button 
              onClick={handleQuoteClick}
              className="btn btn-white btn-lg"
            >
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
  );
}

export function SectionLabel({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={className}>{children}</h2>;
}
