import type { Page } from "../../App";

export default function HowItWorksSection({ navigate }: { navigate: (p: Page) => void }) {
  const steps = [
    {
      no: 1,
      title: "1. Stuur uw situatie & wensen",
      text: "Deel uw woonplaats, een korte omschrijving van uw klus of verbouwing en eventueel een paar duidelijke foto's.",
    },
    {
      no: 2,
      title: "2. Ontvang een helder voorstel",
      text: "Bouwvast beoordeelt uw aanvraag en stuurt u binnen 24 uur een transparant overzicht van aanpak, richtprijs en planning.",
    },
    {
      no: 3,
      title: "3. Vakkundige oplevering",
      text: "Na akkoord voeren onze ervaren vakmensen het werk netjes en volgens afspraak uit, inclusief garantie en nazorg.",
    },
  ];

  return (
    <section className="section section--muted" id="hoe-het-werkt">
      <div className="container">
        <h2 className="center">Zo werkt het</h2>
        <p className="lead center">
          Eén vertrouwd aanspreekpunt voor intake en planning, met vakkundige uitvoering op locatie.
        </p>

        <ol className="grid grid-3 list-none p-0 m-0">
          {steps.map((step) => (
            <li className="card step-item" key={step.no}>
              <span className="step-no" aria-hidden="true">
                {step.no}
              </span>
              <h3>{step.title}</h3>
              <p className="text-[var(--muted)] m-0">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="btn-row centered-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              const quoteEl = document.getElementById("quote");
              if (quoteEl) quoteEl.scrollIntoView({ behavior: "smooth" });
              else navigate("contact");
            }}
          >
            Start uw aanvraag
          </button>
        </div>
      </div>
    </section>
  );
}
