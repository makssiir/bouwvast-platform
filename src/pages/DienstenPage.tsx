import type { Page } from "../App";
import QuoteForm from "../components/QuoteForm";
import { useLang } from "../i18n/LangContext";
import { SERVICES } from "../data/services";
import Icon from "../components/Icon";

export default function DienstenPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  const priceMap: Record<string, string> = {
    renovatie: "Projectmatig",
    afbouw: "Vanaf €45/m²",
    schilderwerk: "Vanaf €35/m²",
    "gevel-buitenwerk": "Vanaf €55/uur",
    montage: "Vanaf €58/uur",
    "onderhoud-reparatie": "Vanaf €55/uur",
    "badkamer-keuken": "Maatwerk",
    loodgieter: "Vanaf €65/uur",
    elektricien: "Vanaf €65/uur",
    timmerman: "Vanaf €58/uur",
    timmerbedrijf: "Op offerte",
    klusjesman: "Vanaf €50/uur",
    klusbedrijf: "Op offerte",
    algemeen: "Vanaf €55/uur",
  };

  return (
    <main>
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">Diensten</span>
          </div>
          <h1>{t("services_title")}</h1>
          <p className="lead-xl max-w-2xl">
            Van kleine vakkundige klussen en reparaties tot complete woningrenovaties. Altijd met een heldere aanpak, transparante tarieven en één vast aanspreekpunt.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <button
                key={s.slug}
                onClick={() => navigate({ type: "service", slug: s.slug })}
                className="card service-card-link text-left cursor-pointer border-0 bg-white"
              >
                <div className="service-card-media" aria-hidden="true">
                  <img
                    src={s.image}
                    alt={t(s.nameKey)}
                    width={600}
                    height={400}
                    loading="lazy"
                  />
                  <span className="service-card-price">
                    {priceMap[s.slug] || "Vanaf €55/uur"}
                  </span>
                </div>
                <div className="service-card-body">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={s.icon} size={18} color="var(--brand)" />
                    <h3 className="m-0 text-lg font-bold">{t(s.nameKey)}</h3>
                  </div>
                  <p className="text-sm text-[var(--muted)] line-clamp-3 mb-4 mt-2">
                    {s.intro}
                  </p>
                  <span className="more">Bekijk dienst & details &rarr;</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="section section--muted">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <span className="eyebrow">Direct aanvragen</span>
              <h2>Offerte voor uw werkzaamheden</h2>
              <p className="text-[var(--muted)] text-base mb-6">
                Vertel ons welke werkzaamheden u wilt laten uitvoeren. We reageren binnen 24 uur met een vrijblijvend voorstel.
              </p>
              <div className="space-y-3 text-sm text-[var(--fg)] font-medium">
                <div className="flex items-center gap-2.5">
                  <span className="text-[var(--brand)] font-bold">✓</span> Vaste richtprijzen zonder verrassingen
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[var(--brand)] font-bold">✓</span> Vakkundige gecertificeerde vakmensen
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[var(--brand)] font-bold">✓</span> Volledige kwaliteitsgarantie op het werk
                </div>
              </div>
            </div>
            <div className="card p-6 md:p-8 shadow-md">
              <QuoteForm sourcePage="diensten" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
