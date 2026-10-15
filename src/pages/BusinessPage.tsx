import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import QuoteSection from "../components/QuoteSection"
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
    {
      title: pick({ nl: "Kennismaking", en: "Introduction", uk: "Знайомство", ru: "Знакомство" }),
      text: pick({
        nl: "We bespreken uw projecten en wat u nodig heeft.",
        en: "We discuss your projects and what you need.",
        uk: "Обговорюємо ваші проєкти та потреби.",
        ru: "Обсуждаем ваши проекты и потребности.",
      }),
    },
    {
      title: pick({ nl: "Offerte of raamafspraak", en: "Quote or framework agreement", uk: "Пропозиція або рамкова домовленість", ru: "Предложение или рамочное соглашение" }),
      text: pick({
        nl: "Per project of als raamafspraak, met heldere tarieven en voorwaarden.",
        en: "Per project or as a framework agreement, with clear rates and terms.",
        uk: "Для окремого проєкту або як рамкова домовленість — з чіткими тарифами та умовами.",
        ru: "Для отдельного проекта или как рамочное соглашение — с понятными тарифами и условиями.",
      }),
    },
    {
      title: pick({ nl: "Uitvoering", en: "Execution", uk: "Виконання", ru: "Выполнение" }),
      text: pick({
        nl: "Volgens de gemaakte afspraken over planning en kwaliteit.",
        en: "According to the agreements on schedule and quality.",
        uk: "Згідно з домовленостями щодо графіка та якості.",
        ru: "Согласно договорённостям по срокам и качеству.",
      }),
    },
  ]

  const discuss = pick({ nl: "Bespreek uw project", en: "Discuss your project", uk: "Обговорити проєкт", ru: "Обсудить проект" })

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_business") }]}
        eyebrow={t("nav_business")}
        title={t("b2b_page_title")}
        lead={t("b2b_page_sub")}
        image="/images/tools-rack.webp"
      >
        <button type="button" onClick={() => scrollToQuote()} className="btn btn-primary btn-lg">
          {discuss}
          <span className="btn-arrow" aria-hidden="true">
            <Icon name="arrow-right" size={18} />
          </span>
        </button>
      </PageHero>

      <section className="section" aria-labelledby="audiences-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{pick({ nl: "Voor wie", en: "Who it's for", uk: "Для кого", ru: "Для кого" })}</p>
              <h2 id="audiences-title">
                {pick({ nl: "Met wie werken wij samen?", en: "Who do we work with?", uk: "З ким ми співпрацюємо?", ru: "С кем мы сотрудничаем?" })}
              </h2>
            </div>
          </div>
          <ul className="grid grid-3 m-0 list-none p-0">
            {audiences.map((item) => (
              <li key={item.title} className="card">
                <span className="icon-tile" aria-hidden="true">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="mb-2 text-lg">{item.title}</h3>
                <p className="m-0 text-[0.9375rem] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="collab-title">
        <div className="container">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow">{pick({ nl: "Werkwijze", en: "How we work", uk: "Як ми працюємо", ru: "Как мы работаем" })}</p>
              <h2 id="collab-title">
                {pick({ nl: "Hoe verloopt een samenwerking?", en: "How does working together go?", uk: "Як відбувається співпраця?", ru: "Как проходит сотрудничество?" })}
              </h2>
              <button type="button" onClick={() => scrollToQuote()} className="btn btn-outline mt-3">
                {discuss}
                <span className="btn-arrow" aria-hidden="true">
                  <Icon name="arrow-right" size={18} />
                </span>
              </button>
            </div>
            <ol className="mini-steps mini-steps--lg">
              {steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="business-vat-note" aria-labelledby="business-vat-title">
            <Icon name="info" size={22} />
            <div>
              <h3 id="business-vat-title">{t("vat_business_title")}</h3>
              <p>{t("vat_business_note")}</p>
            </div>
          </aside>
        </div>
      </section>

      <QuoteSection
        sourcePage="business"
        muted={false}
        eyebrow={t("nav_business")}
        title={pick({ nl: "Bespreek uw zakelijke project", en: "Discuss your business project", uk: "Обговоріть ваш бізнес-проєкт", ru: "Обсудите ваш бизнес-проект" })}
      />
    </>
  )
}
