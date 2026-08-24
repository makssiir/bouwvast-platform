import type { Page } from "../App";
import QuoteForm from "../components/QuoteForm";
import { useLang } from "../i18n/LangContext";
import Icon from "../components/Icon";

export default function BusinessPage({ navigate }: { navigate: (page: Page) => void }) {
  const { t } = useLang();

  const audiences = [
    {
      num: "01",
      icon: "tools",
      title: "Voor Aannemers & Bouwbedrijven",
      text: "Vaste partner voor afbouw, stucwerk, schilderwerk en specialistische montagewerkzaamheden.",
    },
    {
      num: "02",
      icon: "bathroom",
      title: "Voor Keukenzaken & Showrooms",
      text: "Vakkundige demontage, leidingwerk, elektra, tegelwerk en montage bij uw klanten op locatie.",
    },
    {
      num: "03",
      icon: "shield",
      title: "Voor VvE's & Vastgoedbeheerders",
      text: "Periodiek onderhoud, spoedreparaties, schilderwerk en verduurzaming van wooncomplexen.",
    },
  ];

  const steps = [
    "Intake & kennismaking: we bespreken uw capaciteitsbehoefte en projecten.",
    "Heldere raamovereenkomst of projectofferte met vaste uurtarieven.",
    "Betrouwbare planning en vakkundige uitvoering volgens VCA en NEN-normen.",
  ];

  return (
    <main>
      <section className="hero hero--business">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">Zakelijk & Partners</span>
          </div>
          <h1>Zakelijke Samenwerking — Bouwvast</h1>
          <p className="lead-xl max-w-2xl">
            Uw betrouwbare uitvoerende partner voor aannemers, keukenzaken, VvE's en vastgoedbeheerders in Midden-Nederland.
          </p>
        </div>
      </section>

      {/* Stats Band */}
      <section className="stats-band">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <span className="num">100%</span>
              <span className="label">VCA gecertificeerd</span>
            </div>
            <div className="stat">
              <span className="num">24u</span>
              <span className="label">Reactietijd bij spoed</span>
            </div>
            <div className="stat">
              <span className="num">Vast</span>
              <span className="label">Aanspreekpunt</span>
            </div>
            <div className="stat">
              <span className="num">Flexibel</span>
              <span className="label">Inzetbare capaciteit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="section">
        <div className="container">
          <div className="center mb-12">
            <span className="eyebrow">Doelgroepen</span>
            <h2>Met wie werken wij samen?</h2>
            <p className="lead">
              Wij ontzorgen zakelijke opdrachtgevers met vakkundige arbeid, duidelijke planning en representatieve communicatie.
            </p>
          </div>

          <div className="grid grid-3">
            {audiences.map((item) => (
              <div key={item.num} className="card">
                <div className="business-card-icon">
                  <Icon name={item.icon} size={22} color="var(--brand)" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] m-0 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow">Aanpak</span>
              <h2>Hoe verloopt een zakelijke samenwerking?</h2>
              <p className="text-[var(--muted)] mb-6">
                Van een eenmalige opdracht tot een langdurig partnership: we maken heldere afspraken over tarieven, planning en kwaliteitsnormen.
              </p>
              <button 
                onClick={() => {
                  const q = document.getElementById("quote");
                  if (q) q.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-primary"
              >
                Start een samenwerking &rarr;
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="card flex items-start gap-4 p-5">
                  <span className="step-no shrink-0 text-sm" style={{ width: 36, height: 36 }}>{idx + 1}</span>
                  <p className="text-sm font-medium text-[var(--fg)] m-0 pt-1.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="section">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <span className="eyebrow">Aanvraag</span>
              <h2>Bespreek uw zakelijke project</h2>
              <p className="text-[var(--muted)] text-base mb-6">
                Laat uw contactgegevens en wensen achter. Wij nemen binnen 1 werkdag contact met u op voor een persoonlijk gesprek.
              </p>
              <div className="space-y-2 text-sm text-[var(--fg)]">
                <p>✓ Directe lijn met projectcoördinatie</p>
                <p>✓ Vaste staffeltarieven mogelijk</p>
                <p>✓ Facturatie op maat</p>
              </div>
            </div>
            <div className="card p-6 md:p-8 shadow-md">
              <QuoteForm sourcePage="business" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
