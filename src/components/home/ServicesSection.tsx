import type { Page } from "../../App";
import { useLang } from "../../i18n/LangContext";
import { SERVICES } from "../../data/services";

export default function ServicesSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  // Show top 6 highlighted services on home
  const highlightedServices = SERVICES.slice(0, 6);

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
  };

  return (
    <section className="section" id="diensten">
      <div className="container">
        <div className="center mb-12">
          <span className="eyebrow">Onze Vakgebieden</span>
          <h2>Waarmee kan Bouwvast u helpen?</h2>
          <p className="lead">
            Bekijk per dienst wat we voor u kunnen betekenen, wat erbij hoort en welke richtprijzen gelden.
          </p>
        </div>

        <div className="grid grid-3">
          {highlightedServices.map((service) => (
            <button
              key={service.slug}
              onClick={() => navigate({ type: "service", slug: service.slug })}
              className="card service-card-link text-left cursor-pointer border-0 bg-white"
            >
              <div className="service-card-media" aria-hidden="true">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <span className="service-card-price">
                  {priceMap[service.slug] || "Vanaf €55/uur"}
                </span>
              </div>
              <div className="service-card-body">
                <h3>{service.name}</h3>
                <p>{service.intro}</p>
                <span className="more">Bekijk dienst &rarr;</span>
              </div>
            </button>
          ))}
        </div>

        <div className="btn-row centered-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => navigate("diensten")}
          >
            Bekijk alle diensten ({SERVICES.length})
          </button>
        </div>
      </div>
    </section>
  );
}
