import type { ReactNode } from "react"
import QuoteForm from "./QuoteForm"
import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"

/** Two-column quote block: reassurance on the left, the form on the right. */
export default function QuoteSection({
  sourcePage,
  eyebrow,
  title,
  sub,
  muted = true,
  children,
}: {
  sourcePage: string
  eyebrow?: string
  title?: string
  sub?: string
  muted?: boolean
  children?: ReactNode
}) {
  const { t } = useLang()

  return (
    <section id="quote" className={`section ${muted ? "section--muted" : ""}`} aria-labelledby="quote-title">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{eyebrow ?? t("cta_btn")}</p>
            <h2 id="quote-title">{title ?? t("form_title")}</h2>
            <p className="lead">{sub ?? t("form_sub")}</p>
            <ul className="check-list check-list--stacked">
              {(["hero_trust_1", "hero_trust_2", "hero_trust_3"] as const).map((key) => (
                <li key={key}>
                  <span className="check-dot" aria-hidden="true">
                    <Icon name="check" size={13} strokeWidth={2.6} />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
            {children}
          </div>
          <div className="form-card">
            <QuoteForm sourcePage={sourcePage} />
          </div>
        </div>
      </div>
    </section>
  )
}
