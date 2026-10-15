import type { Page } from "../../lib/routes"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { imageSize } from "../../data/images"
import { scrollToQuote } from "../../lib/quoteDraft"

const MAIN_IMAGE = "/images/living-after.webp"
const SUB_IMAGE = "/images/tile-work.webp"

export default function HeroSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()

  const handleQuoteClick = () => {
    if (!scrollToQuote()) navigate("contact")
  }

  const handleCalculatorClick = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    document.getElementById("calculator")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="container home-hero-grid">
        <div>
          <p className="eyebrow">{t("hero_label")}</p>

          <h1 id="home-hero-title">
            <span className="hero-title-line">{t("hero_title")}</span>{" "}
            <span className="hero-title-line">{t("hero_title_second")}</span>{" "}
            <span className="accent">{t("hero_title_accent")}</span>
          </h1>

          <p className="lead">{t("hero_sub")}</p>

          <div className="btn-row">
            <button type="button" onClick={handleQuoteClick} className="btn btn-primary btn-lg">
              {t("hero_cta_primary")}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} strokeWidth={2} />
              </span>
            </button>
            <button type="button" onClick={handleCalculatorClick} className="btn btn-outline btn-lg">
              <Icon name="calculator" size={18} />
              {t("hero_cta_calc")}
            </button>
          </div>

          <p className="hero-cta-note">
            <Icon name="check" size={16} strokeWidth={2.2} />
            {t("quote_project_first")}
          </p>
        </div>

        <div className="hero-media">
          <figure className="hero-media-main">
            <img
              src={MAIN_IMAGE}
              alt={pick({
                nl: "Wooninspiratie: een lichte woonkamer met strakke wanden en een eiken visgraatvloer",
                en: "Home inspiration: a bright living room with smooth walls and an oak herringbone floor",
                uk: "Інтер'єр для натхнення: світла вітальня з рівними стінами та дубовою підлогою ялинкою",
                ru: "Интерьер для вдохновения: светлая гостиная с ровными стенами и дубовым полом ёлочкой",
              })}
              {...imageSize(MAIN_IMAGE)}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
          <figure className="hero-media-sub">
            <img
              src={SUB_IMAGE}
              alt={pick({
                nl: "Vakman meet een werkblad uit met een waterpas",
                en: "Tradesman levelling a worktop with a spirit level",
                uk: "Майстер вирівнює стільницю за допомогою рівня",
                ru: "Мастер выравнивает столешницу с помощью уровня",
              })}
              {...imageSize(SUB_IMAGE)}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p className="hero-media-badge m-0">
            <span className="badge-icon" aria-hidden="true">
              <Icon name="home" size={16} strokeWidth={2} />
            </span>
            {t("hero_inspiration")}
          </p>
        </div>
      </div>
    </section>
  )
}
