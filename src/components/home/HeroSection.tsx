import type { Page } from "../../App";
import Icon from "../Icon";
import { useLang } from "../../i18n/LangContext";
import { CONTACT } from "../../data/contact";

export default function HeroSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  const handleQuoteClick = () => {
    const quoteEl = document.getElementById("quote");
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("contact");
    }
  };

  return (
    <section className="hero hero--home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>Vakkundige bouw & renovatie — vakkundig en betrouwbaar geregeld</h1>
          <p className="lead-xl">
            Bouwvast verzorgt renovaties, afbouw, schilderwerk, badkamers, keukens en montagewerk.
            Vanuit één vast aanspreekpunt regelen we de intake, heldere planning en vakkundige uitvoering.
          </p>

          <div className="btn-row hero-actions">
            <button 
              onClick={handleQuoteClick}
              className="btn btn-primary btn-lg"
            >
              <Icon name="check" size={20} />
              Vrijblijvende offerte aanvragen
            </button>
            <a 
              href={`tel:${CONTACT.phoneTel}`}
              className="btn btn-outline-white btn-lg"
            >
              <Icon name="phone" size={20} />
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <p className="hero-hint">
            Binnen 24 uur een heldere reactie en richtprijs voor uw klus of verbouwing.
          </p>

          <div className="hero-sub" aria-label="Certificeringen en garanties">
            <span>
              <Icon name="check" size={16} /> 25+ jaar gecombineerde ervaring
            </span>
            <span>
              <Icon name="shield" size={16} /> VCA gecertificeerd & garantie
            </span>
            <span>
              <Icon name="pin" size={16} /> Regio Amersfoort, Utrecht & Gooi
            </span>
          </div>
        </div>

        <figure className="hero-photo">
          <img
            src="/images/renovation-ladder.webp"
            alt="Vakman aan het werk bij een renovatieproject van Bouwvast"
            width={1100}
            height={730}
            fetchPriority="high"
          />
          <figcaption className="hero-person-badge">
            <Icon name="check" size={18} />
            <span>Bouwvast-project · Regio Amersfoort</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
