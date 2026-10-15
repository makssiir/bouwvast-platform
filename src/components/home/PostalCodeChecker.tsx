import React, { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Icon from "../Icon"
import LeadFallback from "../LeadFallback"
import { Field } from "../QuoteForm"
import { useLang } from "../../i18n/LangContext"
import type { TranslationKey } from "../../i18n/translations"
import { SERVICES } from "../../data/services"
import { CITIES } from "../../data/cities"
import { LEAD_LIMITS, validateLead } from "../../lib/leadSchema.ts"
import type { ContactPreference, LeadField } from "../../lib/leadSchema.ts"
import { newLeadId } from "../../lib/leads"
import type { Lead } from "../../lib/leads"
import { leadFieldMessage } from "../../lib/leadMessages"
import { useLeadSubmission } from "../../lib/useLeadSubmission"
import { useDialog } from "../../lib/useDialog"
import { hrefForPage } from "../../lib/routes"
import { track } from "../../lib/analytics"
import { useQuoteDraft } from "../../lib/quoteDraft"

const POSTCODE = /^([1-9]\d{3})\s?([a-z]{2})?$/i
const PLACE = /^\p{L}[\p{L}\s'’.-]{1,59}$/u

/** "1012ab" → "1012 AB", "utrecht" → "Utrecht"; null when it is neither a postcode nor a place name. */
function normalizePlace(raw: string): string | null {
  const value = raw.trim().replace(/\s+/g, " ")
  const code = POSTCODE.exec(value)
  if (code) return code[2] ? `${code[1]} ${code[2].toUpperCase()}` : code[1]
  if (!PLACE.test(value)) return null
  return CITIES.find((city) => city.name.toLowerCase() === value.toLowerCase())?.name ?? value
}

const PREFERENCES: { id: ContactPreference; icon: string; label: TranslationKey }[] = [
  { id: "phone", icon: "phone", label: "area_modal_pref_phone" },
  { id: "whatsapp", icon: "whatsapp", label: "area_modal_pref_whatsapp" },
  { id: "email", icon: "mail", label: "area_modal_pref_email" },
]

/**
 * "Postcode → what do you need → how may we reach you": a short lead flow
 * for any place in the Netherlands. It never claims a place is covered; the
 * dialog says we come back personally on whether and when we can do the job.
 * The postcode field is deliberately not a <form>: on most pages the quote
 * form is the page's only one, and the dialog brings its own.
 */
export default function PostalCodeChecker({ sourcePage }: { sourcePage: string }) {
  const { t } = useLang()
  const uid = useId().replace(/:/g, "")
  const [query, setQuery] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [place, setPlace] = useState<string | null>(null)
  const { suggest } = useQuoteDraft()

  const run = () => {
    const normalized = normalizePlace(query)
    if (!normalized) {
      setInvalid(true)
      track("area_checked", { status: "invalid" })
      return
    }
    setInvalid(false)
    setPlace(normalized)
    // Also offered to the page's quote form, in case the visitor uses that instead.
    suggest({ city: normalized })
    track("area_lead_opened", { sourcePage })
  }

  return (
    <section className="section section--night area-check" id="werkgebied-check" aria-labelledby={`${uid}-title`}>
      <div className="container area-check-grid">
        <div className="area-check-intro">
          <p className="eyebrow eyebrow--on-dark">{t("area_eyebrow")}</p>
          <h2 id={`${uid}-title`}>{t("area_title")}</h2>
          <p className="area-check-desc">{t("area_desc")}</p>
          <ul className="area-check-points">
            {t("area_points")
              .split(" · ")
              .map((point) => (
                <li key={point}>
                  <Icon name="check" size={16} strokeWidth={2.6} />
                  {point}
                </li>
              ))}
          </ul>
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
                enterKeyHint="go"
                placeholder={t("area_placeholder")}
                aria-invalid={invalid ? true : undefined}
                aria-describedby={invalid ? `${uid}-error` : undefined}
                onChange={(event) => {
                  setQuery(event.target.value)
                  if (invalid) setInvalid(false)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    run()
                  }
                }}
              />
            </div>
            <button type="button" className="btn btn-primary" aria-haspopup="dialog" onClick={run}>
              {t("area_btn")}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} />
              </span>
            </button>
          </div>
          {invalid && (
            <p id={`${uid}-error`} className="field-error" role="alert">
              {t("area_invalid")}
            </p>
          )}
        </div>
      </div>

      {place !== null && <AreaLeadDialog place={place} sourcePage={sourcePage} onClose={() => setPlace(null)} />}
    </section>
  )
}

type FormState = {
  /** A service slug, "other", or "" when nothing was picked yet. */
  service: string
  description: string
  name: string
  phone: string
  email: string
  city: string
  preference: ContactPreference
  hp: string
}

function AreaLeadDialog({ place, sourcePage, onClose }: { place: string; sourcePage: string; onClose: () => void }) {
  const { t, lang, pick } = useLang()
  const uid = useId().replace(/:/g, "")
  const fid = (name: string) => `${uid}-${name}`
  const dialogRef = useDialog<HTMLDivElement>(true, onClose)
  const source = `area-check:${sourcePage}`
  const lead = useLeadSubmission(source)
  const [form, setForm] = useState<FormState>({
    service: "",
    description: "",
    name: "",
    phone: "",
    email: "",
    city: place,
    preference: "phone",
    hp: "",
  })
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({})
  const leadId = useRef<string | null>(null)
  const lastLead = useRef<Lead | null>(null)
  const started = useRef(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const chosen = SERVICES.find((service) => service.slug === form.service)
  const needsDescription = !chosen

  // Server-side field errors come back through the hook.
  useEffect(() => {
    if (lead.failure === "invalid" && Object.keys(lead.fieldErrors).length > 0) setErrors(lead.fieldErrors)
  }, [lead.failure, lead.fieldErrors])

  useEffect(() => {
    if (lead.status === "sent" || lead.status === "failed") resultRef.current?.focus()
  }, [lead.status])

  const up = (key: keyof FormState, value: string) => {
    if (!started.current) {
      started.current = true
      track("form_started", { sourcePage: source })
    }
    leadId.current = null
    setForm((current) => ({ ...current, [key]: value }))
    const field = key === "service" ? "description" : key === "preference" ? "email" : key
    setErrors((current) => (current[field as LeadField] ? { ...current, [field]: undefined } : current))
  }

  const message = (field: LeadField, code: string | undefined) => {
    if (field === "description" && code === "required") return t("area_modal_desc_required")
    if (field === "email" && code === "required") return t("area_modal_email_required")
    return leadFieldMessage(field, code, pick)
  }

  const buildLead = (): Lead => {
    const search = new URLSearchParams(window.location.search)
    if (!leadId.current) leadId.current = newLeadId()
    return {
      id: leadId.current,
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      service: chosen?.name ?? "",
      description: form.description,
      contactPreference: form.preference,
      estimate: "",
      language: lang,
      sourcePage: source,
      utm_source: search.get("utm_source") ?? undefined,
      utm_medium: search.get("utm_medium") ?? undefined,
      utm_campaign: search.get("utm_campaign") ?? undefined,
      createdAt: new Date().toISOString(),
      hp: form.hp,
    }
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (lead.status === "sending") return
    const payload = buildLead()
    const { id: _id, ...fieldErrors } = validateLead(payload as unknown as Record<string, unknown>).errors
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      const order: LeadField[] = ["description", "name", "phone", "email", "city"]
      const first = order.find((field) => fieldErrors[field])
      if (first) document.getElementById(fid(first))?.focus()
      return
    }
    setErrors({})
    lastLead.current = payload
    await lead.send(payload)
  }

  const aria = (name: LeadField) => ({
    id: fid(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fid(name)}-error` : undefined,
  })

  const preferenceLabel = t(PREFERENCES.find((p) => p.id === form.preference)?.label ?? "area_modal_pref_phone")

  let body: React.ReactNode
  if (lead.status === "sending") {
    body = (
      <div className="py-12 text-center" role="status" aria-live="polite">
        <div
          className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-3 border-line border-t-pine-700"
          aria-hidden="true"
        />
        <p className="m-0 text-sm font-semibold text-muted">{t("form_sending")}</p>
      </div>
    )
  } else if (lead.status === "failed" && lastLead.current) {
    body = (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <LeadFallback
          lead={lastLead.current}
          failure={lead.failure}
          onRetry={() => lastLead.current && void lead.send(lastLead.current)}
          onEdit={() => lead.edit()}
        />
      </div>
    )
  } else if (lead.status === "sent") {
    body = (
      <div
        ref={resultRef}
        tabIndex={-1}
        className="py-8 text-center outline-none"
        role="status"
        data-testid="area-lead-success"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pine-100 text-pine-700">
          <Icon name="check" size={32} />
        </div>
        <h3 className="m-0 text-2xl text-ink">{t("area_modal_success_title")}</h3>
        <p className="mx-auto mt-2 mb-0 max-w-sm text-muted">{t("area_modal_success_text")}</p>
        <p className="mt-3 mb-0 text-sm text-muted">
          {t("area_modal_pref_label")}: <strong className="text-ink">{preferenceLabel}</strong>
        </p>
        {lead.reference && (
          <p className="mt-4 mb-0 inline-flex items-center gap-2 rounded-full bg-sand-100 px-3.5 py-1.5 text-sm text-muted">
            {pick({ nl: "Referentie", en: "Reference", uk: "Номер запиту", ru: "Номер запроса" })}:{" "}
            <strong className="font-mono text-ink">{lead.reference}</strong>
          </p>
        )}
        <div className="mt-6">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </div>
    )
  } else {
    body = (
      <form onSubmit={submit} className="space-y-5" noValidate>
        {lead.failure === "invalid" && Object.keys(errors).length > 0 && (
          <p role="alert" className="notice">
            {pick({
              nl: "Controleer de gemarkeerde velden.",
              en: "Please check the highlighted fields.",
              uk: "Перевірте позначені поля.",
              ru: "Проверьте отмеченные поля.",
            })}
          </p>
        )}

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="field-label">{t("area_modal_service")}</legend>
          <div className="choice-grid">
            {SERVICES.map((service) => (
              <label key={service.slug} className="choice">
                <input
                  type="radio"
                  name={fid("service")}
                  value={service.slug}
                  checked={form.service === service.slug}
                  onChange={() => up("service", service.slug)}
                />
                <span>{t(service.nameKey)}</span>
              </label>
            ))}
            <label className="choice">
              <input
                type="radio"
                name={fid("service")}
                value="other"
                checked={form.service === "other"}
                onChange={() => up("service", "other")}
              />
              <span>{t("area_modal_other")}</span>
            </label>
          </div>
        </fieldset>

        <Field
          id={fid("description")}
          label={t("area_modal_desc_label")}
          required={needsDescription}
          optional={needsDescription ? undefined : t("form_optional")}
          error={message("description", errors.description)}
        >
          <textarea
            {...aria("description")}
            rows={3}
            maxLength={LEAD_LIMITS.description.max}
            placeholder={t("area_modal_desc_placeholder")}
            value={form.description}
            onChange={(event) => up("description", event.target.value)}
            className="field resize-y"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={fid("name")} label={t("form_name")} required error={message("name", errors.name)}>
            <input
              {...aria("name")}
              required
              type="text"
              autoComplete="name"
              maxLength={LEAD_LIMITS.name.max}
              value={form.name}
              onChange={(event) => up("name", event.target.value)}
              className="field"
            />
          </Field>
          <Field id={fid("phone")} label={t("form_phone")} required error={message("phone", errors.phone)}>
            <input
              {...aria("phone")}
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={LEAD_LIMITS.phone.max}
              value={form.phone}
              onChange={(event) => up("phone", event.target.value)}
              className="field"
            />
          </Field>
        </div>

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="field-label">{t("area_modal_contact")}</legend>
          <div className="choice-grid">
            {PREFERENCES.map((preference) => (
              <label key={preference.id} className="choice">
                <input
                  type="radio"
                  name={fid("preference")}
                  value={preference.id}
                  checked={form.preference === preference.id}
                  onChange={() => up("preference", preference.id)}
                />
                <span>
                  <Icon name={preference.icon} size={16} />
                  {t(preference.label)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id={fid("email")}
            label={t("form_email")}
            required={form.preference === "email"}
            optional={form.preference === "email" ? undefined : t("form_optional")}
            error={message("email", errors.email)}
          >
            <input
              {...aria("email")}
              type="email"
              autoComplete="email"
              required={form.preference === "email"}
              maxLength={LEAD_LIMITS.email.max}
              value={form.email}
              onChange={(event) => up("email", event.target.value)}
              className="field"
            />
          </Field>
          <Field id={fid("city")} label={t("area_label")} required error={message("city", errors.city)}>
            <input
              {...aria("city")}
              required
              type="text"
              autoComplete="postal-code"
              maxLength={LEAD_LIMITS.city.max}
              value={form.city}
              onChange={(event) => up("city", event.target.value)}
              className="field"
            />
          </Field>
        </div>

        {/* Honeypot: hidden from people and assistive technology. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={fid("hp")}>Website</label>
          <input
            id={fid("hp")}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.hp}
            onChange={(event) => setForm((current) => ({ ...current, hp: event.target.value }))}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-full">
          {t("area_modal_submit")}
          <span className="btn-arrow" aria-hidden="true">
            <Icon name="arrow-right" size={18} />
          </span>
        </button>
        <p className="m-0 text-center text-[0.8125rem] text-subtle">
          {t("form_privacy")}{" "}
          <a href={hrefForPage("privacy")} className="text-subtle underline hover:text-ink">
            {t("footer_privacy")}
          </a>
        </p>
      </form>
    )
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-night/80 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={fid("title")}
        aria-describedby={fid("sub")}
        tabIndex={-1}
        data-testid="area-dialog"
        className="area-dialog relative max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-[20px] border border-line bg-white px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl outline-none sm:rounded-[20px] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={fid("title")} className="mb-1 pr-12 text-[1.5rem]">
          {t("area_modal_title")}
        </h2>
        <p id={fid("sub")} className="mb-5 text-sm text-muted">
          {t("area_modal_sub", { place })}
        </p>
        {body}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 right-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-0 bg-sand-100 text-ink transition-colors hover:bg-sand-200"
        >
          <Icon name="close" size={20} />
        </button>
      </div>
    </div>,
    document.body,
  )
}
