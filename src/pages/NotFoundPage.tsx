import type { Page } from "../lib/routes"
import { useLang } from "../i18n/LangContext"
import PageLink from "../components/PageLink"

export default function NotFoundPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()

  return (
    <section className="section">
      <div className="container center max-w-2xl mx-auto py-16">
        <span className="eyebrow">404</span>
        <h1>{t("notfound_title")}</h1>
        <p className="lead mb-8">{t("notfound_sub")}</p>
        <div className="btn-row justify-center">
          <PageLink to="home" navigate={navigate} className="btn btn-primary no-underline">
            {t("nav_home")}
          </PageLink>
          <PageLink to="diensten" navigate={navigate} className="btn btn-outline no-underline">
            {t("nav_services")}
          </PageLink>
          <PageLink to="contact" navigate={navigate} className="btn btn-outline no-underline">
            {t("nav_contact")}
          </PageLink>
        </div>
      </div>
    </section>
  )
}
