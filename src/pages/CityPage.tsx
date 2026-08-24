import { useState } from "react";
import type { Page } from "../App";
import { SERVICE_BY_SLUG, SERVICES } from "../data/services";
import Icon from "../components/Icon";
import QuoteForm from "../components/QuoteForm";
import { useLang } from "../i18n/LangContext";

export default function CityPage({
  city,
  serviceSlug,
  navigate,
}: {
  city: string;
  serviceSlug?: string;
  navigate: (p: Page) => void;
}) {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const activeService = serviceSlug ? SERVICE_BY_SLUG[serviceSlug] : undefined;

  const faqItems = [
    {
      q: `Voert Bouwvast ook werkzaamheden uit in ${city}?`,
      a: `Ja, ${city} valt binnen ons vaste werkgebied. We verzorgen hier regelmatig verbouwingen, renovaties, schilderwerk en onderhoud.`,
    },
    {
      q: "Hoe snel kunnen jullie ter plaatse zijn voor een opname?",
      a: "Voor een vrijblijvende opname of spoedklus in de regio kunnen we meestal binnen enkele werkdagen bij u langskomen.",
    },
    {
      q: "Zijn de tarieven in alle gemeenten gelijk?",
      a: "Ja, wij hanteren transparante tarieven zonder onverwachte voorrijkosten binnen ons kernwerkgebied.",
    },
    {
      q: "Krijg ik garantie op de werkzaamheden in mijn woning?",
      a: "Zeker, op alle uitgevoerde werkzaamheden en geleverde materialen ontvangt u standaard volledige kwaliteitsgarantie.",
    },
  ];

  return (
    <main>
      {/* Page hero */}
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <button onClick={() => navigate("werkgebied")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Werkgebied</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">{city}</span>
          </div>
          <h1>{activeService ? `${t(activeService.nameKey)} in ${city}` : `Vakman in ${city} — Bouwvast`}</h1>
          <p className="lead-xl max-w-2xl">
            {activeService ? activeService.intro : `Betrouwbare bouw-, renovatie- en onderhoudswerkzaamheden in ${city} en omstreken.`}
          </p>
        </div>
      </section>

      {/* Main content + sticky form */}
      <div className="container section">
        <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
          <div className="space-y-12">
            
            {/* Services in City */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">Diensten in {city}</span>
              <h2 className="text-2xl font-bold mb-6">Werkzaamheden in {city}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const isActive = activeService?.slug === s.slug;
                  return (
                    <button
                      key={s.slug}
                      onClick={() => navigate({ type: "city", city, serviceSlug: s.slug })}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${isActive ? 'border-[var(--brand)] bg-[var(--brand-subtle)]' : 'border-[var(--border)] bg-white hover:border-[var(--brand)] hover:shadow-xs'}`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon name={s.icon} size={18} color="var(--brand)" />
                        <span className="font-bold text-sm text-[var(--fg)]">{t(s.nameKey)}</span>
                      </div>
                      <p className="text-xs text-[var(--muted)] m-0 line-clamp-2">{s.intro}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SEO Text */}
            <section className="card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Waarom kiezen voor Bouwvast in {city}?</h2>
              <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
                <p>
                  Woont u in {city} of heeft u hier een bedrijfspand en zoekt u een betrouwbare vakman voor uw verbouwing, badkamer, schilderwerk of onderhoud? Bouwvast biedt een compleet pakket van vakkundige disciplines onder één dak.
                </p>
                <p>
                  Met één vast aanspreekpunt, duidelijke afspraken en vakmensen met jarenlange ervaring garanderen we dat uw project soepel en naar volle tevredenheid verloopt.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-5">Veelgestelde vragen over {city}</h2>
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
                <h3 className="text-lg font-bold m-0">Offerte in {city}</h3>
              </div>
              <p className="text-xs text-[var(--muted)] mb-5">
                Vrijblijvende prijsindicatie binnen 24 uur.
              </p>
              <QuoteForm compact sourcePage={`city:${city}`} presetService={activeService?.name} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
