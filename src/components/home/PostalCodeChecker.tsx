import { useId, useState } from "react"
import Icon from "../Icon"
import PageLink from "../PageLink"
import { useLang } from "../../i18n/LangContext"
import { whatsappHref } from "../../data/contact"
import { claim } from "../../data/claims"
import { CITIES, REGION_LABELS, findServiceArea } from "../../data/cities"
import type { AreaMatch } from "../../data/cities"
import { scrollToQuote, useQuoteDraft } from "../../lib/quoteDraft"
import { track } from "../../lib/analytics"
import type { Page } from "../../lib/routes"

/** Quick picks: the main towns of each region, with a typical postcode. */
const QUICK = [
  { city: "Amersfoort", code: "3811" },
  { city: "Utrecht", code: "3511" },
  { city: "Hilversum", code: "1211" },
  { city: "Zeist", code: "3701" },
  { city: "Leusden", code: "3831" },
  { city: "Soest", code: "3762" },
]

const REGIONS = Object.keys(REGION_LABELS)

/**
 * "Werkgebied & beschikbaarheid". Answers from the same list of places as
 * /werkgebied/ (data/cities.ts), so the checker can never promise more than
 * the site does elsewhere. Anything not on the list is "we check personally",
 * never "no". Deliberately not a <form>: the quote form is the page's only one.
 */
export default function PostalCodeChecker({
  navigate,
  showRegions = true,
}: {
  navigate: (p: Page) => void
  /** Off on /werkgebied/, which lists the regions right below. */
  showRegions?: boolean
}) {
  const { t, pick } = useLang()
  const uid = useId().replace(/:/g, "")
  const { suggest } = useQuoteDraft()
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<AreaMatch | null>(null)

  const run = (value: string) => {
    const match = findServiceArea(value)
    setResult(match)
    track("area_checked", { status: match.status })
  }

  const place = result && result.status !== "invalid" ? result.place : ""
  // What goes into the form's "Woonplaats of postcode" field.
  const formCity =
    result?.status === "covered"
      ? place.replace(/ \((.+)\)$/, /^\d/.test(place) ? " $1" : ", $1")
      : result?.status === "unknown"
        ? place
        : ""

  const requestQuote = () => {
    if (formCity) suggest({ city: formCity })
    if (!scrollToQuote()) navigate("contact")
  }

  const wa =
    result && result.status !== "invalid"
      ? whatsappHref(
          pick({
            nl: `Hallo Bouwvast, ik woon in ${formCity}. Kunnen jullie daar een project voor mij uitvoeren?`,
            en: `Hello Bouwvast, I live in ${formCity}. Could you carry out a project for me there?`,
            uk: `Вітаю, Bouwvast! Я живу в ${formCity}. Чи можете ви виконати там проєкт для мене?`,
            ru: `Здравствуйте, Bouwvast! Я живу в ${formCity}. Можете ли вы выполнить там проект для меня?`,
          }),
        )
      : undefined

  return (
    <section className="section section--night area-check" id="werkgebied-check" aria-labelledby={`${uid}-title`}>
      <div className="container area-check-grid">
        <div className="area-check-intro">
          <p className="eyebrow eyebrow--on-dark">{t("area_eyebrow")}</p>
          <h2 id={`${uid}-title`}>{t("area_title")}</h2>
          <p className="area-check-desc">
            {t("area_desc")}
            {claim("freeSurvey") ? ` ${t("area_free_survey")}` : ""}
          </p>
          {showRegions && (
            <>
              <p className="area-check-regions-label">{t("area_regions")}</p>
              <ul className="area-check-regions">
                {REGIONS.map((region) => (
                  <li key={region}>
                    <Icon name="pin" size={15} />
                    <span>{t(REGION_LABELS[region])}</span>
                    <span className="area-check-region-count">
                      {CITIES.filter((c) => c.region === region)
                        .map((c) => c.name)
                        .join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="area-check-card">
          <label htmlFor={`${uid}-input`} className="field-label">
            {t("area_label")}
          </label>
          <div className="area-check-row">
            <div className="area-check-input">
              <Icon name="pin" size={18} />
              <input
                id={`${uid}-input`}
                type="text"
                className="field"
                value={query}
                maxLength={60}
                autoComplete="postal-code"
                enterKeyHint="search"
                placeholder={t("area_placeholder")}
                aria-invalid={result?.status === "invalid" ? true : undefined}
                aria-describedby={result?.status === "invalid" ? `${uid}-error` : undefined}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    run(query)
                  }
                }}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => run(query)}>
              {t("area_btn")}
            </button>
          </div>
          {result?.status === "invalid" && (
            <p id={`${uid}-error`} className="field-error">
              {t("area_invalid")}
            </p>
          )}

          <div className="area-check-quick">
            <span>{t("area_quick")}</span>
            <div className="chip-row">
              {QUICK.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className="chip chip--sm"
                  onClick={() => {
                    setQuery(item.code)
                    run(item.code)
                  }}
                >
                  {item.city} ({item.code})
                </button>
              ))}
            </div>
          </div>

          <div aria-live="polite">
            {result && result.status !== "invalid" && (
              <div
                className={`area-result ${result.status === "covered" ? "area-result--ok" : "area-result--unknown"}`}
                data-testid="area-result"
                data-status={result.status}
              >
                <span className="area-result-icon" aria-hidden="true">
                  <Icon
                    name={result.status === "covered" ? "check" : "info"}
                    size={18}
                    strokeWidth={result.status === "covered" ? 2.6 : 2}
                  />
                </span>
                <div className="min-w-0">
                  <p className="area-result-title">
                    {result.status === "covered" ? t("area_ok_title", { place }) : t("area_unknown_title", { place })}
                  </p>
                  <p className="area-result-text">
                    {result.status === "covered" ? t("area_ok_text") : t("area_unknown_text")} {t("area_prefilled")}
                  </p>
                  <div className="area-result-actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={requestQuote}>
                      {t("nav_cta")}
                      <span className="btn-arrow" aria-hidden="true">
                        <Icon name="arrow-right" size={16} />
                      </span>
                    </button>
                    {result.status === "covered" && (
                      <PageLink
                        to={{ type: "city", city: result.city.name }}
                        navigate={navigate}
                        className="btn btn-outline btn-sm"
                      >
                        {t("area_city_link", { city: result.city.name })}
                      </PageLink>
                    )}
                    {wa && (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        onClick={() => track("whatsapp_clicked", { source: "area-check" })}
                      >
                        <Icon name="whatsapp" size={16} />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
