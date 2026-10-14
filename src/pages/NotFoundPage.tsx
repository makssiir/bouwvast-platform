import type { Page } from "../lib/routes"
import { useLang } from "../i18n/LangContext"
import PageLink from "../components/PageLink"

export default function NotFoundPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

  return (
    <section className="page-hero page-hero--center">
      <div className="container page-hero-inner">
        <div>
          <p className="error-code" aria-hidden="true">
            404
          </p>
          <h1>{t("notfound_title")}</h1>
          <p className="lead">{t("notfound_sub")}</p>
          <div className="btn-row page-hero-actions">
            <PageLink to="home" navigate={navigate} className="btn btn-primary">
              {t("nav_home")}
            </PageLink>
            <PageLink to="diensten" navigate={navigate} className="btn btn-outline">
              {t("nav_services")}
            </PageLink>
            <PageLink to="contact" navigate={navigate} className="btn btn-outline">
              {t("nav_contact")}
            </PageLink>
          </div>
        </div>
      </div>
    </section>
  )
}
