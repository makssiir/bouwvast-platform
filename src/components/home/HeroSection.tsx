import type { Page } from "../../App"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { CONTACT } from "../../data/contact"

export default function HeroSection({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t, lang } = useLang()

  const handleQuoteClick = () => {
    const quoteEl = document.getElementById("quote")
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("contact")
    }
  }

  const handleCalculatorClick = () => {
    const calcEl = document.getElementById("calculator")
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  const badgeCaption =
    lang === "uk"
      ? "Bouwvast · Якість та Гарантія"
      : lang === "ru"
        ? "Bouwvast · Качество и Гарантия"
        : lang === "en"
          ? "Bouwvast · Quality & Warranty"
          : "Bouwvast · Kwaliteit & Garantie"

  return (
    <section className="hero hero--home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-xs w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t("hero_label")}</span>
          </div>

          <h1>
            {t("hero_title")}{" "}
            <span className="text-[#4ade80] block">
              {t("hero_title_accent")}
            </span>
          </h1>

          <p className="lead-xl">{t("hero_sub")}</p>

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

          <div className="quick-pillars" aria-label="Популярні послуги">
            <div
              onClick={() => navigate({ type: "service", slug: "renovatie" })}
              className="pillar-card"
            >
              <span className="pillar-top">🔨 {lang === "uk" ? "Комплексний ремонт" : lang === "nl" ? "Woningrenovatie" : lang === "ru" ? "Комплексный ремонт" : "Home Renovation"}</span>
              <span className="pillar-sub">{lang === "uk" ? "Квартири та будинки під ключ" : lang === "nl" ? "Totaalproject onder 1 dak" : lang === "ru" ? "Квартиры и дома под ключ" : "Full turnkey service"}</span>
            </div>

            <div
              onClick={() => navigate({ type: "service", slug: "badkamer-keuken" })}
              className="pillar-card"
            >
              <span className="pillar-top">🚿 {lang === "uk" ? "Ванна та Санвузол" : lang === "nl" ? "Badkamer & Sanitair" : lang === "ru" ? "Ванная и Санузел" : "Bath & Sanitary"}</span>
              <span className="pillar-sub">{lang === "uk" ? "Плитка, душ та сантехніка" : lang === "nl" ? "Tegels, inloopdouche & leidingen" : lang === "ru" ? "Плитка, душ и сантехника" : "Tiles, walk-in shower & pipes"}</span>
            </div>

            <div
              onClick={() => navigate({ type: "service", slug: "afbouw" })}
              className="pillar-card"
            >
              <span className="pillar-top">🧱 {lang === "uk" ? "Штукатурка та Стіни" : lang === "nl" ? "Stuc- & Afbouwwerk" : lang === "ru" ? "Штукатурка и Стены" : "Plaster & Drywall"}</span>
              <span className="pillar-sub">{lang === "uk" ? "Ідеально під фарбування" : lang === "nl" ? "Strak & schilderklaar" : lang === "ru" ? "Идеально под покраску" : "Smooth & paint-ready"}</span>
            </div>

            <div
              onClick={() => navigate({ type: "service", slug: "loodgieter" })}
              className="pillar-card"
            >
              <span className="pillar-top">⚡ {lang === "uk" ? "Сантехніка & Мережі" : lang === "nl" ? "Loodgieter & Elektra" : lang === "ru" ? "Сантехника и Сети" : "Plumbing & Wiring"}</span>
              <span className="pillar-sub">{lang === "uk" ? "Комунікації та обладнання" : lang === "nl" ? "Vakkundige aansluitingen" : lang === "ru" ? "Коммуникации и монтаж" : "Certified installation"}</span>
            </div>
          </div>

          <div className="hero-sub" aria-label="Certificeringen en garanties">
            <span>
              <Icon name="check" size={16} color="#4ade80" />{" "}
              {t("hero_trust_1")}
            </span>
            <span>
              <Icon name="shield" size={16} color="#4ade80" />{" "}
              {t("hero_trust_2")}
            </span>
            <span>
              <Icon name="check" size={16} color="#4ade80" />{" "}
              {t("hero_trust_3")}
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
            <span>{badgeCaption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
