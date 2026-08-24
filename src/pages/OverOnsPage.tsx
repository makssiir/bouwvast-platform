import type { Page } from "../App";
import { useLang } from "../i18n/LangContext";
import Icon from "../components/Icon";

export default function OverOnsPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  const values = [
    {
      title: "Vakmanschap & Precisie",
      desc: "We werken uitsluitend met ervaren vakmensen en materialen van A-kwaliteit voor een duurzaam resultaat.",
      icon: "tools",
    },
    {
      title: "Transparantie in Prijs",
      desc: "Heldere offertes vooraf zonder verborgen posten, meerwerk in duidelijke samenspraak.",
      icon: "check",
    },
    {
      title: "Één Vaste Contactpersoon",
      desc: "Directe communicatie van eerste intake tot en met de oplevering en nazorg.",
      icon: "user",
    },
    {
      title: "Gegarandeerde Kwaliteit",
      desc: "Volledige garantie op zowel arbeid als materialen. We zijn pas klaar als u 100% tevreden bent.",
      icon: "shield",
    },
  ];

  return (
    <main>
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">Over Bouwvast</span>
          </div>
          <h1>Over Bouwvast</h1>
          <p className="lead-xl max-w-2xl">
            Het platform voor betrouwbare vakmensen in Amersfoort en Midden-Nederland. Kwaliteit, rust en duidelijkheid bij elke verbouwing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="eyebrow">Onze Filosofie</span>
              <h2>Bouwen en verbouwen zonder zorgen</h2>
              <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed mt-4">
                <p>
                  Een verbouwing of renovatie is een ingrijpende gebeurtenis. Bij Bouwvast geloven we dat goed vakmanschap begint bij duidelijke communicatie en betrouwbare planning.
                </p>
                <p>
                  Wij koppelen particulieren en bedrijven aan gecertificeerde vakmensen die hun vak verstaan. Van een enkele badkamer of schilderklus tot een complete casco renovatie.
                </p>
                <p>
                  Onze kernwaarden: afspraak is afspraak, nette en bezemvaste oplevering, en altijd heldere prijzen vooraf.
                </p>
              </div>

              <div className="btn-row mt-8">
                <button 
                  onClick={() => navigate("contact")}
                  className="btn btn-primary"
                >
                  Neem contact op
                </button>
                <button 
                  onClick={() => navigate("diensten")}
                  className="btn btn-outline"
                >
                  Bekijk onze diensten
                </button>
              </div>
            </div>

            <div className="founder-card shadow-md">
              <div className="about-photo" style={{ width: 160, height: 160 }}>
                <img src="/images/site-team.webp" alt="Bouwvast team" width={160} height={160} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Bouwvast Team</h3>
                <p className="text-xs font-semibold text-[var(--brand)] mb-3">Gecertificeerde Vakmensen</p>
                <p className="text-xs text-[var(--muted)] m-0 leading-relaxed">
                  "Wij combineren ambachtelijk vakmanschap met moderne projectbegeleiding. Zo weet u altijd waar u aan toe bent."
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card p-6">
                <div className="business-card-icon mb-4">
                  <Icon name={v.icon} size={22} color="var(--brand)" />
                </div>
                <h3 className="text-base font-bold mb-2">{v.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed m-0">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
