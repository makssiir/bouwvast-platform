import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import QuoteSection from "../components/QuoteSection"
import Icon from "../components/Icon"
import More from "../components/More"
import { useLang } from "../i18n/LangContext"
import { SERVICES } from "../data/services"
import { imageSize } from "../data/images"

export default function DienstenPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_services") }]}
        eyebrow={t("services_label")}
        title={t("services_title")}
        lead={t("services_sub")}
      />

      <section className="section">
        <div className="container">
          <ul className="grid grid-3 list-none m-0 p-0">
            {SERVICES.map((s, index) => {
              const wide = index === SERVICES.length - 1 && SERVICES.length % 3 === 1
              return (
                <li key={s.slug} className={wide ? "lg:col-span-3" : undefined}>
                  <PageLink
                    to={{ type: "service", slug: s.slug }}
                    navigate={navigate}
                    className={`card service-card-link ${wide ? "service-card-wide" : ""}`}
                  >
                    <div className="service-card-media">
                      <img src={s.image} alt="" {...imageSize(s.image)} loading="lazy" decoding="async" />
                    </div>
                    <div className="service-card-body">
                      <span className="icon-tile" aria-hidden="true">
                        <Icon name={s.icon} size={20} />
                      </span>
                      <h2 className="text-xl">{t(s.nameKey)}</h2>
                      <p className={wide ? undefined : "line-clamp-3"}>{t(s.introKey)}</p>
                      <More hidden>{t("link_more")}</More>
                    </div>
                  </PageLink>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <QuoteSection sourcePage="diensten" />
    </>
  )
}
