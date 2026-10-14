import { useLang } from "../../i18n/LangContext"
import { claim } from "../../data/claims"

export default function HowItWorksSection() {
  const { t } = useLang()
  const steps = [
    // The calculator is only mentioned while it is actually shown.
    { title: t("how_1_title"), text: claim("pricing") ? t("how_1_desc") : t("how_1_desc_form") },
    { title: t("how_2_title"), text: t("how_2_desc") },
    { title: t("how_3_title"), text: t("how_3_desc") },
    { title: t("how_4_title"), text: t("how_4_desc") },
  ]

  return (
    <section className="section section--muted" id="hoe-het-werkt" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("how_label")}</p>
            <h2 id="how-title">{t("how_title")}</h2>
          </div>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li className="card step-item" key={step.title}>
              <span className="step-no" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
