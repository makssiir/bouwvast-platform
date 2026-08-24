import React, { useState } from "react";
import type { Page } from "../App";
import QuoteForm from "../components/QuoteForm";
import Icon from "../components/Icon";
import { CONTACT } from "../data/contact";
import { ARTICLES } from "../data/articles";

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
  const facts = [
    { value: "25+", label: "jaar ervaring" },
    { value: "1.500+", label: "projecten afgerond" },
    { value: "VCA", label: "gecertificeerd" },
    { value: "€55", label: "vanaf tarief p/u incl. btw" },
  ];

  return (
    <section className="stats-band" aria-label="Bouwvast in het kort">
      <div className="container">
        <dl className="stats">
          {facts.map((fact) => (
            <div className="stat" key={fact.label}>
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
  return (
    <section className="section home-audience-strip">
      <div className="container">
        <div className="home-audience-heading">
          <div>
            <span className="eyebrow">Voor wie</span>
            <h2>Voor particulieren én zakelijke partners</h2>
          </div>
          <p className="text-[var(--muted)] text-base m-0">
            Of u nu een woning verbouwt, een badkamer renoveert of als aannemer/beheerder vaste capaciteit zoekt: Bouwvast staat klaar.
          </p>
        </div>

        <div className="home-audience-grid">
          <article className="card home-audience-card">
            <div className="business-card-icon">
              <Icon name="renovation" size={24} color="var(--brand)" />
            </div>
            <span className="card-eyebrow">Particulier</span>
            <h3>Voor uw woning en verbouwing</h3>
            <p className="text-[var(--muted)] mb-4">
              Complete verbouwingen, badkamers, keukens, stuc- en schilderwerk met duidelijke afspraken en één vast aanspreekpunt.
            </p>
            <button 
              onClick={() => navigate("diensten")}
              className="more bg-transparent border-0 p-0 cursor-pointer"
            >
              Bekijk diensten voor particulieren &rarr;
            </button>
          </article>

          <article className="card home-audience-card home-audience-card--partner">
            <div className="business-card-icon">
              <Icon name="tools" size={24} color="#0284c7" />
            </div>
            <span className="card-eyebrow">Zakelijk & Partners</span>
            <h3>Voor aannemers, VvE's & keukenzaken</h3>
            <p className="text-[var(--muted)] mb-4">
              Vaste uitvoerende partij voor afbouw, onderhoud en montage. Flexibel inzetbaar, professioneel en volgens de normen.
            </p>
            <button 
              onClick={() => navigate("zakelijk")}
              className="more text-[#0284c7] bg-transparent border-0 p-0 cursor-pointer"
            >
              Bekijk zakelijke samenwerking &rarr;
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
          <span className="eyebrow">Ervaringen</span>
          <h2>Wat onze klanten zeggen</h2>
          <div className="rating-banner mt-3">
            <span className="stars text-xl">★★★★★</span>
            <span className="font-bold text-lg">5.0</span>
            <span className="text-[var(--muted)] text-sm">op basis van geverifieerde beoordelingen</span>
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
                  <span className="text-xs text-[var(--muted)]">{r.city} · {r.time}</span>
                </div>
              </div>
              <div className="stars text-sm mb-3">★★★★★</div>
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
          <span className="eyebrow">Tarieven</span>
          <h2>Duidelijke prijzen vooraf</h2>
          <p className="text-[var(--muted)] mb-6">
            Bij Bouwvast hanteren we transparante tarieven zonder verborgen kosten achteraf.
            Voor afgebakende werkzaamheden ontvangt u altijd vooraf een duidelijke richtprijs of vaste offerte inclusief materialen.
          </p>
          <button 
            className="btn btn-outline"
            onClick={() => navigate("diensten")}
          >
            Bekijk alle diensten & richtprijzen
          </button>
        </div>

        <div className="table-wrap">
          <div className="table-head">Veelgevraagde werkzaamheden</div>
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
   5. DE VAKMAN / FOUNDER PROOF CARD
   ========================================================================== */
function FounderTrustCard({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section className="section">
      <div className="container">
        <div className="founder-card">
          <div className="about-photo">
            <img 
              src="/images/site-team.webp" 
              alt="Bouwvast vakmensen" 
              width={200}
              height={200}
            />
          </div>
          <div>
            <span className="eyebrow">Betrouwbaarheid</span>
            <h2>Vaste vakmensen, duidelijke afspraken</h2>
            <p className="lead text-base m-0 mb-3" style={{ maxWidth: "none" }}>
              De intake en planning lopen centraal via Bouwvast; het werk zelf wordt uitgevoerd door gediplomeerde en gecertificeerde vakmensen met jarenlange ervaring.
            </p>
            <p className="text-[var(--muted)] text-sm mb-6">
              Wij werken uitsluitend met hoogwaardige bouwmaterialen, hanteren strenge kwaliteitsnormen en zorgen altijd voor een nette, bezemvaste oplevering.
            </p>
            <div className="btn-row">
              <button 
                className="btn btn-outline" 
                onClick={() => navigate("over-ons")}
              >
                Meer over Bouwvast
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate("contact")}
              >
                Neem direct contact op
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. REAL PROJECT GALLERY
   ========================================================================== */
function ProjectGallery({
  onOpenProject,
  navigate,
}: {
  onOpenProject: (p: ProjectDetail) => void;
  navigate: (p: Page) => void;
}) {
  const gallery: ProjectDetail[] = [
    {
      title: "Moderne Keukenrenovatie",
      category: "Keuken",
      city: "Amersfoort Vathorst",
      image: "/images/kitchen-renovation.webp",
      desc: "Complete herinrichting van leidingen, inbouwspots, strak tegelwerk en aansluiting van apparatuur.",
      duration: "2 weken",
      materials: "Knauf stuc, Grohe sanitair, A-merk LED",
      serviceSlug: "badkamer-keuken",
    },
    {
      title: "Woningrenovatie & Uitbouw",
      category: "Renovatie",
      city: "Leusden",
      image: "/images/renovation-ladder.webp",
      desc: "Turn-key renovatie van een gezinswoning inclusief isolatie, stucwerk en nieuwe binnendeuren.",
      duration: "3.5 weken",
      materials: "Hoogrendementsglas, Sigma lakwerk, vloerverwarming",
      serviceSlug: "renovatie",
    },
    {
      title: "Maatwerk Timmerwerk & Deuren",
      category: "Timmerwerk",
      city: "Soest",
      image: "/images/carpentry-work.webp",
      desc: "Plaatsen van houten kozijnen, binnendeuren en op maat gemaakte inbouwkasten.",
      duration: "1 week",
      materials: "Hardhouten kozijnen, FSC gekeurd hout",
      serviceSlug: "timmerman",
    },
    {
      title: "Badkamer & Sanitair Renovatie",
      category: "Badkamer",
      city: "Utrecht",
      image: "/images/tile-work.webp",
      desc: "Moderne inloopdouche met grootformaat tegels, drain en luxe sanitair.",
      duration: "2 weken",
      materials: "Kimband waterdichting, Villeroy & Boch sanitair",
      serviceSlug: "badkamer-keuken",
    },
    {
      title: "Strak Binnen- & Sauswerk",
      category: "Schilderwerk",
      city: "Hilversum",
      image: "/images/tools-detail.webp",
      desc: "Wanden sausklaar gemaakt en voorzien van hoogwaardige schrobvaste matte muurverf.",
      duration: "4 dagen",
      materials: "Sikkens Alphacryl Pure Mat SF",
      serviceSlug: "schilderwerk",
    },
    {
      title: "Afbouw & Wandmontage",
      category: "Afbouw",
      city: "Baarn",
      image: "/images/tools-rack.webp",
      desc: "Nieuwe metal-stud scheidingswanden, akoestische isolatie en stucafwerking.",
      duration: "1.5 week",
      materials: "Gyproc gipsplaten, Rockwool isolatie",
      serviceSlug: "afbouw",
    },
  ];

  return (
    <section className="section section--muted" id="projecten">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">Portfolio</span>
          <h2>Echte beelden van uitgevoerd werk</h2>
          <p className="lead">
            Klik op een project voor uitgebreide details, toegepaste materialen en doorlooptijd.
          </p>
        </div>

        <div className="gallery">
          {gallery.map((item, i) => (
            <figure 
              key={i}
              className="cursor-pointer group"
              onClick={() => onOpenProject(item)}
            >
              <img src={item.image} alt={item.title} loading="lazy" width={500} height={350} />
              <figcaption className="flex justify-between items-center">
                <span>{item.title}</span>
                <span className="text-[var(--brand-light)] text-xs font-bold bg-[rgba(0,0,0,0.5)] px-2 py-0.5 rounded">
                  Bekijk &rarr;
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="btn-row centered-actions">
          <button 
            className="btn btn-outline"
            onClick={() => navigate("projecten")}
          >
            Bekijk alle projecten
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. KENNISBANK & ADVICE PREVIEW
   ========================================================================== */
function KennisbankPreviewSection({ navigate }: { navigate: (p: Page) => void }) {
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <section className="section" id="kennisbank">
      <div className="container">
        <div className="center mb-12">
          <span className="eyebrow">Advies & Gidsen</span>
          <h2>Praktische verbouwingsgidsen</h2>
          <p className="lead">
            Lees onze nieuwste artikelen over kosten, vergunningen, btw-regels en stappenplannen.
          </p>
        </div>

        <div className="grid grid-3">
          {previewArticles.map((art) => (
            <article
              key={art.slug}
              onClick={() => navigate("kennisbank" as any)}
              className="card p-0 overflow-hidden cursor-pointer hover:border-[var(--brand)] hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[var(--brand)] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {art.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-[var(--brand)] transition-colors line-clamp-2">
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
            Bekijk alle gidsen & artikelen
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
  const faqs = [
    {
      q: "Hoe snel kan mijn project van start gaan?",
      a: "Na het eerste contact en akkoord op de offerte kunnen we voor kleine opdrachten vaak al binnen 1 tot 2 weken starten. Voor grotere renovaties stemmen we de planning nauwkeurig met u af.",
    },
    {
      q: "Ontvang ik vooraf een vaste prijs of richtprijs?",
      a: "Ja. Op basis van uw omschrijving, foto's of een vrijblijvende opname op locatie ontvangt u vooraf een heldere offerte zodat u precies weet waar u aan toe bent.",
    },
    {
      q: "In welke regio's is Bouwvast actief?",
      a: "Wij zijn voornamelijk actief in Amersfoort, Utrecht, Het Gooi, Soest, Leusden, Zeist, Baarn, Hoevelaken en omliggende gemeenten.",
    },
    {
      q: "Krijg ik garantie op de uitgevoerde werkzaamheden?",
      a: "Absoluut. Wij staan voor kwaliteit en geven volledige garantie op zowel onze arbeid als de door ons geleverde bouwmaterialen.",
    },
    {
      q: "Kan ik ook voor kleine klussen of reparaties terecht?",
      a: "Zeker. We hebben gespecialiseerde vakmensen voor zowel kleine reparaties als omvangrijke turn-key verbouwingen.",
    },
    {
      q: "Heb ik één vast aanspreekpunt tijdens de verbouwing?",
      a: "Ja, vanaf de eerste opname tot de eindoplevering heeft u één vaste contactpersoon die het project coördineert en al uw vragen beantwoordt.",
    },
  ];

  return (
    <section className="section section--muted" id="faq">
      <div className="container" style={{ maxWidth: "840px" }}>
        <div className="center mb-10">
          <span className="eyebrow">Vragen</span>
          <h2>Veelgestelde vragen</h2>
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
  return (
    <section id="quote" className="section">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <span className="eyebrow">Direct aanvragen</span>
            <h2>Vertel ons over uw project</h2>
            <p className="text-[var(--muted)] text-base mb-6">
              Vul het formulier in voor een snelle, vrijblijvende offerte. We reageren binnen 24 uur met een passend voorstel.
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
  const handleQuoteClick = () => {
    const quoteEl = document.getElementById("quote");
    if (quoteEl) quoteEl.scrollIntoView({ behavior: "smooth" });
    else navigate("contact");
  };

  return (
    <section className="section section--muted">
      <div className="container">
        <div className="cta-band">
          <h2>Leg uw klus of verbouwing voor aan Bouwvast</h2>
          <p>
            Deel uw plannen met ons en ontvang binnen 24 uur een duidelijk voorstel met richtprijs en planning.
          </p>
          <div className="btn-row justify-center">
            <button 
              onClick={handleQuoteClick}
              className="btn btn-white btn-lg"
            >
              <Icon name="check" size={20} />
              Vrijblijvende offerte aanvragen
            </button>
            <a 
              href={`tel:${CONTACT.phoneTel}`}
              className="btn btn-outline-white btn-lg"
            >
              <Icon name="phone" size={20} />
              Bel {CONTACT.phoneDisplay}
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
