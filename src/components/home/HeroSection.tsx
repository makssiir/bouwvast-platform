import type { Page } from "../../lib/routes"
import Icon from "../Icon"
import PageLink from "../PageLink"
import { useLang } from "../../i18n/LangContext"
import { claim } from "../../data/claims"
import { scrollToQuote } from "../../lib/quoteDraft"

export default function HeroSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()

  const handleQuoteClick = () => {
    if (!scrollToQuote()) navigate("contact")
  }

  const handleCalculatorClick = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
  }

  const pillars: { slug: string; icon: string; title: string; sub: string }[] = [
    {
      slug: "renovatie",
      icon: "🔨",
      title: pick({ nl: "Woningrenovatie", en: "Home renovation", uk: "Комплексний ремонт", ru: "Комплексный ремонт" }),
      sub: pick({ nl: "Totaalproject onder één dak", en: "One point of contact for the whole job", uk: "Квартири та будинки під ключ", ru: "Квартиры и дома под ключ" }),
    },
    {
      slug: "badkamer-keuken",
      icon: "🚿",
      title: pick({ nl: "Badkamer & keuken", en: "Bathroom & kitchen", uk: "Ванна та кухня", ru: "Ванная и кухня" }),
      sub: pick({ nl: "Tegels, inloopdouche & leidingen", en: "Tiles, walk-in shower & pipes", uk: "Плитка, душ та сантехніка", ru: "Плитка, душ и сантехника" }),
    },
    {
      slug: "afbouw",
      icon: "🧱",
      title: pick({ nl: "Stuc- & afbouwwerk", en: "Plaster & drywall", uk: "Штукатурка та стіни", ru: "Штукатурка и стены" }),
      sub: pick({ nl: "Strak & schilderklaar", en: "Smooth & paint-ready", uk: "Ідеально під фарбування", ru: "Идеально под покраску" }),
    },
    {
      slug: "loodgieter",
      icon: "🔧",
      title: pick({ nl: "Loodgieterswerk", en: "Plumbing", uk: "Сантехніка", ru: "Сантехника" }),
      sub: pick({ nl: "Leidingen, afvoer & sanitair", en: "Pipes, drainage & fixtures", uk: "Труби, каналізація та сантехніка", ru: "Трубы, канализация и сантехника" }),
    },
  ]

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
              type="button"
              onClick={handleQuoteClick}
              className="btn btn-primary btn-lg"
            >
              <Icon name="check" size={20} />
              {t("hero_cta_primary")}
            </button>
            {claim("pricing") && (
              <button
                type="button"
                onClick={handleCalculatorClick}
                className="btn btn-outline-white btn-lg"
              >
                <Icon name="tools" size={20} />
                {t("est_eyebrow")}
              </button>
            )}
          </div>

          <nav
            className="quick-pillars"
            aria-label={pick({ nl: "Populaire diensten", en: "Popular services", uk: "Популярні послуги", ru: "Популярные услуги" })}
          >
            {pillars.map((pillar) => (
              <PageLink
                key={pillar.slug}
                to={{ type: "service", slug: pillar.slug }}
                navigate={navigate}
                className="pillar-card no-underline"
              >
                <span className="pillar-top">
                  <span aria-hidden="true">{pillar.icon}</span> {pillar.title}
                </span>
                <span className="pillar-sub">{pillar.sub}</span>
              </PageLink>
            ))}
          </nav>

          <div className="hero-sub">
            <span>
              <Icon name="check" size={16} color="#4ade80" />{" "}
              {t("hero_trust_1")}
            </span>
            <span>
              <Icon name="check" size={16} color="#4ade80" />{" "}
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
            alt={pick({ nl: "Vakman op een ladder tijdens renovatiewerk", en: "Tradesman on a ladder during renovation work", uk: "Майстер на драбині під час ремонту", ru: "Мастер на лестнице во время ремонта" })}
            width={1400}
            height={932}
            decoding="async"
            fetchPriority="high"
          />
          <figcaption className="hero-person-badge">
            <Icon name="check" size={18} color="#4ade80" />
            <span>{pick({ nl: "Bouw, renovatie & afbouw", en: "Construction, renovation & finishing", uk: "Будівництво, ремонт та оздоблення", ru: "Строительство, ремонт и отделка" })}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
