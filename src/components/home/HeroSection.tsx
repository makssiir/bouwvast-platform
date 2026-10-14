import type { Page } from "../../lib/routes"
import Icon from "../Icon"
import PageLink from "../PageLink"
import { useLang } from "../../i18n/LangContext"
import { claim } from "../../data/claims"
import { imageSize } from "../../data/images"
import { scrollToQuote } from "../../lib/quoteDraft"

const MAIN_IMAGE = "/images/living-before.webp"
const SUB_IMAGE = "/images/tile-work.webp"

export default function HeroSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()

  const handleQuoteClick = () => {
    if (!scrollToQuote()) navigate("contact")
  }

  const handleCalculatorClick = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="container home-hero-grid">
        <div>
          <p className="eyebrow">{t("hero_label")}</p>

          <h1 id="home-hero-title">
            {t("hero_title")} <span className="accent">{t("hero_title_accent")}</span>
          </h1>

          <p className="lead">{t("hero_sub")}</p>

          <div className="btn-row">
            <button type="button" onClick={handleQuoteClick} className="btn btn-primary btn-lg">
              {t("hero_cta_primary")}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} strokeWidth={2} />
              </span>
            </button>
            {claim("pricing") ? (
              <button type="button" onClick={handleCalculatorClick} className="btn btn-outline btn-lg">
                <Icon name="ruler" size={18} />
                {t("est_eyebrow")}
              </button>
            ) : (
              <PageLink to="diensten" navigate={navigate} className="btn btn-outline btn-lg">
                {t("services_all")}
              </PageLink>
            )}
          </div>

          <ul className="check-list">
            {[t("hero_trust_1"), t("hero_trust_2"), t("hero_trust_3")].map((item) => (
              <li key={item}>
                <span className="check-dot" aria-hidden="true">
                  <Icon name="check" size={13} strokeWidth={2.6} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-media">
          <figure className="hero-media-main">
            <img
              src={MAIN_IMAGE}
              alt={pick({
                nl: "Woonkamer tijdens een renovatie, met steigerwerk en nieuwe leidingen",
                en: "Living room during a renovation, with scaffolding and new wiring",
                uk: "Вітальня під час ремонту з риштуванням і новою проводкою",
                ru: "Гостиная во время ремонта со строительными лесами и новой проводкой",
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
            {pick({
              nl: "Bouw, renovatie & afbouw",
              en: "Construction, renovation & finishing",
              uk: "Будівництво, ремонт та оздоблення",
              ru: "Строительство, ремонт и отделка",
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
