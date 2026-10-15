import type { Page } from "../../lib/routes"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { imageSize } from "../../data/images"
import { scrollToQuote } from "../../lib/quoteDraft"

const MAIN_IMAGE = "/images/hero-craftsmanship.webp"

export default function HeroSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

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
              srcSet="/images/hero-craftsmanship-720.webp 720w, /images/hero-craftsmanship.webp 1200w"
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 960px) 640px, 560px"
              alt={t("hero_visual_alt")}
              {...imageSize(MAIN_IMAGE)}
              decoding="async"
              fetchPriority="high"
            />
            <figcaption className="hero-media-caption">
              <span className="hero-caption-icon" aria-hidden="true"><Icon name="ruler" size={23} /></span>
              <span>
                <strong>{t("hero_visual_title")}</strong>
                <span>{t("hero_visual_sub")}</span>
              </span>
            </figcaption>
          </figure>
          <p className="hero-media-badge m-0">
            <span className="badge-icon" aria-hidden="true">
              <Icon name="home" size={16} strokeWidth={2} />
            </span>
            {t("hero_inspiration")}
          </p>
          <p className="hero-media-disclosure">{t("hero_visual_disclosure")}</p>
        </div>
      </div>
    </section>
  )
}
