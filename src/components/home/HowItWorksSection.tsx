import type { Page } from "../../App"
import { useLang } from "../../i18n/LangContext"

export default function HowItWorksSection({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t } = useLang()

  const steps = [
    {
      no: 1,
      title: t("how_1_title"),
      text: t("how_1_desc"),
    },
    {
      no: 2,
      title: t("how_2_title"),
      text: t("how_2_desc"),
    },
    {
      no: 3,
      title: t("how_3_title"),
      text: t("how_3_desc"),
    },
    {
      no: 4,
      title: t("how_4_title"),
      text: t("how_4_desc"),
    },
  ]

  return (
    <section className="section section--muted" id="hoe-het-werkt">
      <div className="container">
        <div className="center mb-12">
          <span className="eyebrow">{t("how_label")}</span>
          <h2>{t("how_title")}</h2>
          <p className="lead">
            {t("hero_sub")}
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0">
          {steps.map((step) => (
            <li className="card step-item" key={step.no}>
              <span className="step-no" aria-hidden="true">
                {step.no}
              </span>
              <h3>{step.title}</h3>
              <p className="text-[var(--muted)] m-0">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="btn-row centered-actions mt-10">
          <button
            className="btn btn-primary"
            onClick={() => {
              const quoteEl = document.getElementById("quote")
              if (quoteEl) quoteEl.scrollIntoView({ behavior: "smooth" })
              else navigate("contact")
            }}
          >
            {t("how_cta")}
          </button>
        </div>
      </div>
    </section>
  )
}
