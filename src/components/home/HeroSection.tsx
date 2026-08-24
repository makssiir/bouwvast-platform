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

  const handleCalculatorClick = () => {
    const calcEl = document.getElementById("calculator");
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero hero--home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-xs w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t("hero_label")}</span>
          </div>

          <h1>
            {t("hero_title")} <span className="text-[#4ade80] block">{t("hero_title_accent")}</span>
          </h1>

          <p className="lead-xl">
            {t("hero_sub")}
          </p>

          <div className="btn-row hero-actions">
            <button 
              onClick={handleQuoteClick}
              className="btn btn-primary btn-lg"
            >
              <Icon name="check" size={20} />
              {t("hero_cta_primary")}
            </button>
            <button 
              onClick={handleCalculatorClick}
              className="btn btn-outline-white btn-lg"
            >
              <Icon name="tools" size={20} />
              {t("est_eyebrow")}
            </button>
          </div>

          <div className="hero-sub" aria-label="Certificeringen en garanties">
            <span>
              <Icon name="check" size={16} color="#4ade80" /> {t("hero_trust_1")}
            </span>
            <span>
              <Icon name="shield" size={16} color="#4ade80" /> {t("hero_trust_2")}
            </span>
            <span>
              <Icon name="check" size={16} color="#4ade80" /> {t("hero_trust_3")}
            </span>
          </div>
        </div>

        <figure className="hero-photo">
          <img
            src="/images/renovation-ladder.webp"
            alt="Bouwvast project"
            width={1100}
            height={730}
            fetchPriority="high"
          />
          <figcaption className="hero-person-badge">
            <Icon name="check" size={18} color="#4ade80" />
            <span>Bouwvast · Kwaliteit & Garantie</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
