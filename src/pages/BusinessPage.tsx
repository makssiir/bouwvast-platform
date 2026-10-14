import type { Page } from "../lib/routes"
import QuoteForm from "../components/QuoteForm"
import Breadcrumb from "../components/Breadcrumb"
import Icon from "../components/Icon"
import { useLang } from "../i18n/LangContext"
import { scrollToQuote } from "../lib/quoteDraft"

export default function BusinessPage({ navigate }: { navigate: (page: Page) => void }) {
  const { t, pick } = useLang()

  const audiences = [
    {
      icon: "tools",
      title: pick({ nl: "Aannemers & bouwbedrijven", en: "Contractors & builders", uk: "Підрядники та будівельні компанії", ru: "Подрядчики и строительные компании" }),
      text: pick({
        nl: "Ondersteuning bij afbouw, stucwerk, schilderwerk en montagewerk binnen uw projecten.",
        en: "Support with finishing, plastering, painting and assembly work within your projects.",
        uk: "Допомога з оздобленням, штукатуркою, фарбуванням і монтажем у ваших проєктах.",
        ru: "Помощь с отделкой, штукатуркой, покраской и монтажом в ваших проектах.",
      }),
    },
    {
      icon: "bathroom",
      title: pick({ nl: "Keukenzaken & showrooms", en: "Kitchen & bathroom showrooms", uk: "Кухонні салони та шоуруми", ru: "Кухонные салоны и шоурумы" }),
      text: pick({
        nl: "Demontage, leidingwerk, tegelwerk en montage bij uw klanten op locatie.",
        en: "Removal, pipework, tiling and installation at your customers' homes.",
        uk: "Демонтаж, сантехнічні роботи, плитка та монтаж у ваших клієнтів.",
        ru: "Демонтаж, сантехнические работы, плитка и монтаж у ваших клиентов.",
      }),
    },
    {
      icon: "shield",
      title: pick({ nl: "VvE's & vastgoedbeheerders", en: "Owners' associations & property managers", uk: "Об'єднання власників і керуючі нерухомістю", ru: "Объединения собственников и управляющие недвижимостью" }),
      text: pick({
        nl: "Onderhoud, reparaties en schilderwerk aan woongebouwen, in overleg ingepland.",
        en: "Maintenance, repairs and painting of residential buildings, scheduled in consultation.",
        uk: "Обслуговування, ремонт і фарбування житлових будівель за погодженим графіком.",
        ru: "Обслуживание, ремонт и покраска жилых зданий по согласованному графику.",
      }),
    },
  ]

  const steps = [
    pick({
      nl: "Kennismaking: we bespreken uw projecten en wat u nodig heeft.",
      en: "Introduction: we discuss your projects and what you need.",
      uk: "Знайомство: обговорюємо ваші проєкти та потреби.",
      ru: "Знакомство: обсуждаем ваши проекты и потребности.",
    }),
    pick({
      nl: "Een projectofferte of raamafspraak met heldere tarieven en voorwaarden.",
      en: "A project quote or framework agreement with clear rates and terms.",
      uk: "Проєктна пропозиція або рамкова домовленість із чіткими тарифами та умовами.",
      ru: "Проектное предложение или рамочное соглашение с понятными тарифами и условиями.",
    }),
    pick({
      nl: "Uitvoering volgens de gemaakte afspraken over planning en kwaliteit.",
      en: "Execution according to the agreements on schedule and quality.",
      uk: "Виконання згідно з домовленостями щодо графіка та якості.",
      ru: "Выполнение согласно договорённостям по срокам и качеству.",
    }),
  ]

  return (
    <>
      <section className="hero hero--business">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: t("nav_business") }]} />
          <h1>{t("b2b_page_title")}</h1>
          <p className="lead-xl max-w-2xl">{t("b2b_page_sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center mb-12">
            <h2>{pick({ nl: "Met wie werken wij samen?", en: "Who do we work with?", uk: "З ким ми співпрацюємо?", ru: "С кем мы сотрудничаем?" })}</h2>
          </div>
          <ul className="grid grid-3 list-none p-0">
            {audiences.map((item) => (
              <li key={item.title} className="card">
                <div className="business-card-icon">
                  <Icon name={item.icon} size={22} color="var(--brand)" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] m-0 leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2>
                {pick({ nl: "Hoe verloopt een samenwerking?", en: "How does working together go?", uk: "Як відбувається співпраця?", ru: "Как проходит сотрудничество?" })}
              </h2>
              <button type="button" onClick={() => scrollToQuote()} className="btn btn-primary mt-4">
                {pick({ nl: "Bespreek uw project", en: "Discuss your project", uk: "Обговорити проєкт", ru: "Обсудить проект" })} &rarr;
              </button>
            </div>
            <ol className="space-y-4 list-none p-0 m-0">
              {steps.map((step, idx) => (
                <li key={idx} className="card flex items-start gap-4 p-5">
                  <span className="step-no shrink-0 text-sm" style={{ width: 36, height: 36 }} aria-hidden="true">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-[var(--fg)] m-0 pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="quote" className="section">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <h2>{pick({ nl: "Bespreek uw zakelijke project", en: "Discuss your business project", uk: "Обговоріть ваш бізнес-проєкт", ru: "Обсудите ваш бизнес-проект" })}</h2>
              <p className="text-[var(--muted)] text-base mb-6">{t("form_sub")}</p>
            </div>
            <div className="card p-6 md:p-8 shadow-md">
              <QuoteForm sourcePage="business" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
