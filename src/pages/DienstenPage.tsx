import type { Page } from "../lib/routes"
import QuoteForm from "../components/QuoteForm"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
import Icon from "../components/Icon"
import { useLang } from "../i18n/LangContext"
import { SERVICES } from "../data/services"
import { imageSize } from "../data/images"

export default function DienstenPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

  return (
    <>
      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: t("nav_services") }]} />
          <h1>{t("services_title")}</h1>
          <p className="lead-xl max-w-2xl">{t("services_sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid grid-3 list-none p-0">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <PageLink
                  to={{ type: "service", slug: s.slug }}
                  navigate={navigate}
                  className="card service-card-link text-left no-underline bg-white h-full"
                >
                  <div className="service-card-media">
                    <img src={s.image} alt="" {...imageSize(s.image)} loading="lazy" decoding="async" />
                  </div>
                  <div className="service-card-body">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={s.icon} size={18} color="var(--brand)" />
                      <h2 className="m-0 text-lg font-bold">{t(s.nameKey)}</h2>
                    </div>
                    <p className="text-sm text-[var(--muted)] line-clamp-3 mb-4 mt-2">{t(s.introKey)}</p>
                    <span className="more" aria-hidden="true">
                      {t("link_more")} &rarr;
                    </span>
                  </div>
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="quote" className="section section--muted">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <h2>{t("form_title")}</h2>
              <p className="text-[var(--muted)] text-base mb-6">{t("form_sub")}</p>
              <ul className="space-y-3 text-sm text-[var(--fg)] font-medium list-none p-0">
                {(["hero_trust_1", "hero_trust_2", "hero_trust_3"] as const).map((key) => (
                  <li key={key} className="flex items-center gap-2.5">
                    <span className="text-[var(--brand)] font-bold" aria-hidden="true">✓</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 md:p-8 shadow-md">
              <QuoteForm sourcePage="diensten" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
