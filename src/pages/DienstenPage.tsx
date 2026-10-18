import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import PageLink from "../components/PageLink"
import QuoteSection from "../components/QuoteSection"
import Icon from "../components/Icon"
import More from "../components/More"
import { useLang } from "../i18n/LangContext"
import { SERVICE_BY_SLUG, SERVICE_GROUPS } from "../data/services"
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

      <section className="section service-catalogue">
        <div className="container">
          <nav className="service-category-nav" aria-label={t("services_categories")}>
            {SERVICE_GROUPS.map((group) => (
              <a className="chip" href={`#services-${group.id}`} key={group.id}>{t(group.titleKey)}</a>
            ))}
          </nav>
          {SERVICE_GROUPS.map((group) => (
            <section className="service-category" id={`services-${group.id}`} key={group.id} aria-labelledby={`title-${group.id}`}>
              <div className="service-category-heading">
                <h2 id={`title-${group.id}`}>{t(group.titleKey)}</h2>
                <p>{t(group.descKey)}</p>
              </div>
              <ul className={`grid ${group.slugs.length === 4 ? "grid-2" : "grid-3"} list-none m-0 p-0`}>
                {group.slugs.map((slug) => {
                  const service = SERVICE_BY_SLUG[slug]
                  return (
                    <li key={service.slug}>
                      <PageLink
                        to={{ type: "service", slug: service.slug }}
                        navigate={navigate}
                        className="card service-card-link"
                      >
                        <div className="service-card-media">
                          <img src={service.image} alt="" {...imageSize(service.image)} loading="lazy" decoding="async" />
                        </div>
                        <div className="service-card-body">
                          <span className="icon-tile" aria-hidden="true">
                            <Icon name={service.icon} size={20} />
                          </span>
                          <h3 className="text-xl">{t(service.nameKey)}</h3>
                          <p>{t(service.descKey)}</p>
                          <More hidden>{t("link_more")}</More>
                        </div>
                      </PageLink>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
          <p className="service-images-note">{t("service_images_note")}</p>
        </div>
      </section>

      <QuoteSection sourcePage="diensten" />
    </>
  )
}
