import { useEffect, useId, useRef, useState } from "react"
import type { CSSProperties } from "react"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import type { TranslationKey } from "../../i18n/translations"
import { useQuoteDraft, scrollToQuote } from "../../lib/quoteDraft"
import { whatsappHref } from "../../data/contact"
import { ESTIMATOR, estimateRange } from "../../data/pricing"
import type { EstimatorService, EstimatorServiceId, EstimatorTier } from "../../data/pricing"
import { track } from "../../lib/analytics"

const TIERS: {
  id: EstimatorTier
  nameKey: TranslationKey
  descKey: TranslationKey
  symbol: string
}[] = [
  {
    id: "standard",
    nameKey: "est_tier_std",
    descKey: "est_tier_std_desc",
    symbol: "€",
  },
  {
    id: "premium",
    nameKey: "est_tier_prem",
    descKey: "est_tier_prem_desc",
    symbol: "€€",
  },
  {
    id: "luxury",
    nameKey: "est_tier_lux",
    descKey: "est_tier_lux_desc",
    symbol: "€€€",
  },
]

const STEPS: { tab: TranslationKey; question: TranslationKey }[] = [
  { tab: "est_tab_1", question: "est_step_1" },
  { tab: "est_tab_2", question: "est_step_2" },
  { tab: "est_tab_3", question: "est_step_3" },
]

const euro = (n: number) => `€\u00a0${n.toLocaleString("nl-NL")}`

/** Value that settles once the input has stopped changing for `ms`. */
function useSettled<T>(value: T, ms: number): T {
  const [settled, setSettled] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(value), ms)
    return () => window.clearTimeout(timer)
  }, [value, ms])
  return settled
}

/**
 * "Bereken direct uw richtprijs": three short steps with a live price range.
 * "Offerte aanvragen voor deze berekening" attaches the calculation to the
 * quote request and fills in the description, then moves to the form.
 * Rates live in data/pricing.ts (ESTIMATOR).
 */
export default function CostEstimator({
  initialService,
  onApplied,
  muted = true,
}: {
  initialService?: EstimatorServiceId
  /** Called when there is no on-page form to scroll to. */
  onApplied?: () => void
  muted?: boolean
}) {
  const { t, pick, lang } = useLang()
  const uid = useId().replace(/:/g, "")
  const { estimate, setEstimate, suggest } = useQuoteDraft()
  const first = ESTIMATOR.services.find((s) => s.id === initialService) ?? ESTIMATOR.services[0]
  const [service, setService] = useState<EstimatorService>(first)
  const [qty, setQty] = useState(first.defaultQty)
  const [tier, setTier] = useState<EstimatorTier>("premium")
  const [demolition, setDemolition] = useState(false)
  const [materials, setMaterials] = useState(true)
  const [step, setStep] = useState(1)
  const [applied, setApplied] = useState(false)
  const resultRef = useRef<HTMLElement>(null)

  const range = estimateRange({ service, qty, tier, demolition, materials })
  const perMin = Math.round(range.min / qty)
  const perMax = Math.round(range.max / qty)
  const serviceName = t(service.nameKey)
  const tierName = t(TIERS.find((x) => x.id === tier)!.nameKey)
  const extras = [demolition ? t("est_extra_demo") : "", materials ? t("est_extra_mat") : ""].filter(Boolean)
  const extrasText = extras.join(pick({ nl: " en ", en: " and ", uk: " і ", ru: " и " }))
  const capitalised = extrasText ? extrasText.charAt(0).toUpperCase() + extrasText.slice(1) : t("est_none")
  const summary = [
    serviceName,
    `${qty} ${ESTIMATOR.unit}`,
    tierName,
    ...(extras.length ? [`${t("est_sum_extras")}: ${extras.join(", ")}`] : []),
    `${euro(range.min)} – ${euro(range.max)}`,
  ].join(" · ")
  const announced = useSettled(`${t("est_est_price")}: ${euro(range.min)} – ${euro(range.max)}`, 700)
  const wa = whatsappHref(t("est_wa_msg", { summary }))

  // Any change after applying makes the attached calculation stale.
  useEffect(() => setApplied(false), [service, qty, tier, demolition, materials])
  useEffect(() => {
    if (!estimate) setApplied(false)
  }, [estimate])

  const chooseService = (next: EstimatorService) => {
    setService(next)
    setQty(next.defaultQty)
  }
  const clampQty = (value: number) => Math.min(service.maxQty, Math.max(service.minQty, value))

  const apply = (focusPhotos = false) => {
    const lower = lang === "nl" || lang === "en"
    setEstimate({
      service: service.id,
      quantity: qty,
      unit: ESTIMATOR.unit,
      tier,
      includeDemolition: demolition,
      includeMaterials: materials,
      priceMin: range.min,
      priceMax: range.max,
      summary,
    })
    suggest({
      service: service.serviceSlug,
      description: t("est_desc_seed", {
        service: lower ? serviceName.toLowerCase() : serviceName,
        qty: String(qty),
        tier: lower ? tierName.toLowerCase() : tierName,
        extras: extrasText ? t("est_desc_extras", { extras: extrasText }) : "",
      }),
    })
    setApplied(true)
    track("estimate_applied", { service: service.id, tier })
    if (!scrollToQuote()) {
      onApplied?.()
      return
    }
    if (focusPhotos) {
      window.setTimeout(() => {
        const input = document.querySelector<HTMLElement>("#quote .file-picker-input")
        const details = input?.closest("details")
        if (details) details.open = true
        input?.focus({ preventScroll: true })
      }, 450)
    }
  }

  const showResult = () => {
    const el = resultRef.current
    if (!el) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    el.focus({ preventScroll: true })
  }

  const fill = ((qty - service.minQty) / (service.maxQty - service.minQty)) * 100

  return (
    <section className={`section ${muted ? "section--soft" : ""}`} id="calculator" aria-labelledby={`${uid}-title`}>
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("est_eyebrow")}</p>
            <h2 id={`${uid}-title`}>{t("est_title")}</h2>
            <p>{t("est_sub")}</p>
          </div>
        </div>

        <div className="estimator">
          <div className="estimator-main">
            <ol className="estimator-steps">
              {STEPS.map((s, i) => {
                const n = i + 1
                const state = n < step ? "done" : n === step ? "current" : "todo"
                return (
                  <li key={s.tab}>
                    <button
                      type="button"
                      className="estimator-step"
                      data-state={state}
                      aria-current={n === step ? "step" : undefined}
                      onClick={() => setStep(n)}
                    >
                      <span className="estimator-step-no" aria-hidden="true">
                        {n < step ? <Icon name="check" size={14} strokeWidth={2.8} /> : n}
                      </span>
                      <span className="estimator-step-label">{t(s.tab)}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="estimator-panel" key={step}>
              <h3 id={`${uid}-q`} className="estimator-q">
                {t(STEPS[step - 1].question)}
              </h3>

              {step === 1 && (
                <div className="estimator-options" role="group" aria-labelledby={`${uid}-q`}>
                  {ESTIMATOR.services.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      aria-pressed={s.id === service.id}
                      className="estimator-option"
                      onClick={() => chooseService(s)}
                    >
                      <span className="estimator-option-icon" aria-hidden="true">
                        <Icon name={s.icon} size={22} />
                      </span>
                      <span className="estimator-option-text">
                        <span className="estimator-option-title">{t(s.nameKey)}</span>
                        <span className="estimator-option-hint">{pick(s.hint)}</span>
                      </span>
                      <span className="estimator-radio" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="estimator-area">
                    <div className="estimator-area-head">
                      <label htmlFor={`${uid}-qty`} className="field-label mb-0">
                        {t("est_area")} <span className="font-normal text-muted">({t(service.nameKey)})</span>
                      </label>
                      <div className="estimator-counter">
                        <button
                          type="button"
                          aria-label={t("est_less")}
                          disabled={qty <= service.minQty}
                          onClick={() => setQty((q) => clampQty(q - service.step))}
                        >
                          <Icon name="minus" size={18} strokeWidth={2.2} />
                        </button>
                        <output htmlFor={`${uid}-qty`} className="estimator-qty">
                          {qty}
                          <span> {ESTIMATOR.unit}</span>
                        </output>
                        <button
                          type="button"
                          aria-label={t("est_more")}
                          disabled={qty >= service.maxQty}
                          onClick={() => setQty((q) => clampQty(q + service.step))}
                        >
                          <Icon name="plus" size={18} strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>
                    <input
                      id={`${uid}-qty`}
                      type="range"
                      className="range"
                      min={service.minQty}
                      max={service.maxQty}
                      step={service.step}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      aria-valuetext={`${qty} ${ESTIMATOR.unit}`}
                      style={{ "--fill": `${fill}%` } as CSSProperties}
                    />
                    <div className="estimator-scale" aria-hidden="true">
                      <span>
                        {service.minQty} {ESTIMATOR.unit}
                      </span>
                      <span>
                        {service.maxQty} {ESTIMATOR.unit}
                      </span>
                    </div>
                  </div>

                  <div className="estimator-extras">
                    {(
                      [
                        ["est_opt_demo", "est_opt_demo_desc", demolition, setDemolition],
                        ["est_opt_mat", "est_opt_mat_desc", materials, setMaterials],
                      ] as const
                    ).map(([title, desc, checked, set]) => (
                      <label key={title} className="estimator-toggle">
                        <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} />
                        <span className="estimator-toggle-box" aria-hidden="true">
                          <Icon name="check" size={14} strokeWidth={3} />
                        </span>
                        <span>
                          <span className="estimator-toggle-title">{t(title)}</span>
                          <span className="estimator-toggle-hint">{t(desc)}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="estimator-options estimator-options--tiers" role="group" aria-labelledby={`${uid}-q`}>
                  {TIERS.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      aria-pressed={tier === item.id}
                      className="estimator-option"
                      onClick={() => setTier(item.id)}
                    >
                      <span className="estimator-option-text">
                        <span className="estimator-tier-symbol" aria-hidden="true">
                          {item.symbol}
                        </span>
                        <span className="estimator-option-title">{t(item.nameKey)}</span>
                        <span className="estimator-option-hint">{t(item.descKey)}</span>
                      </span>
                      <span className="estimator-radio" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="estimator-nav">
              {step > 1 ? (
                <button type="button" className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
                  <span className="btn-arrow btn-arrow--back" aria-hidden="true">
                    <Icon name="arrow-right" size={18} />
                  </span>
                  {t("btn_back")}
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button type="button" className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
                  {t("btn_next")}
                  <span className="btn-arrow" aria-hidden="true">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </button>
              ) : (
                // Stacked layout only: the price sits below the steps.
                <button type="button" className="btn btn-primary estimator-to-result" onClick={showResult}>
                  {t("est_show_result")}
                  <span className="btn-arrow btn-arrow--down" aria-hidden="true">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </button>
              )}
            </div>
          </div>

          <aside ref={resultRef} tabIndex={-1} className="estimator-result" aria-label={t("est_est_price")}>
            <p className="estimator-result-label">{t("est_est_price")}</p>
            <p className="estimator-price" data-testid="estimate-price">
              <span>{euro(range.min)}</span>
              <span className="estimator-price-sep" aria-hidden="true">
                –
              </span>
              <span>{euro(range.max)}</span>
            </p>
            <p className="estimator-vat-basis">{t("est_vat_basis")}</p>
            <p className="estimator-per-unit">{t("est_per_unit", { min: euro(perMin), max: euro(perMax) })}</p>
            <p className="sr-only" aria-live="polite">
              {announced}
            </p>

            <dl className="estimator-summary">
              <div>
                <dt>{t("est_sum_work")}</dt>
                <dd>{serviceName}</dd>
              </div>
              <div>
                <dt>{t("est_sum_area")}</dt>
                <dd>
                  {qty} {ESTIMATOR.unit}
                </dd>
              </div>
              <div>
                <dt>{t("est_sum_quality")}</dt>
                <dd>{tierName}</dd>
              </div>
              <div>
                <dt>{t("est_sum_extras")}</dt>
                <dd>{capitalised}</dd>
              </div>
            </dl>

            <button type="button" className="btn btn-white btn-lg w-full" onClick={() => apply()}>
              {t("est_apply_btn")}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} />
              </span>
            </button>
            <p className="estimator-note" role="status">
              <Icon name="check" size={15} strokeWidth={2.4} />
              <span>{applied ? t("est_applied") : t("est_apply_note")}</span>
            </p>
            <p className="estimator-disclaimer">{t("est_disclaimer")}</p>
            <details className="estimator-vat">
              <summary>{t("vat_details_title")}</summary>
              <p>{t("vat_estimator_note")}</p>
            </details>
          </aside>
        </div>

        <div className="estimator-tip">
          <span className="estimator-tip-icon" aria-hidden="true">
            <Icon name="camera" size={20} />
          </span>
          <p>{wa ? t("est_tip_wa") : t("est_tip_form")}</p>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              onClick={() => track("whatsapp_clicked", { source: "estimator" })}
            >
              <Icon name="whatsapp" size={17} />
              {t("est_wa_btn")}
            </a>
          ) : (
            <button type="button" className="btn btn-outline btn-sm" onClick={() => apply(true)}>
              {t("est_form_btn")}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={16} />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
