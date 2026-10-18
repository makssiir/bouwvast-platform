import React, { useEffect, useId, useRef, useState } from "react"
import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"
import { acceptablePhotos, newLeadId } from "../lib/leads"
import type { Lead } from "../lib/leads"
import { LEAD_LIMITS, validateLead } from "../lib/leadSchema.ts"
import type { LeadField } from "../lib/leadSchema.ts"
import { useLeadSubmission } from "../lib/useLeadSubmission"
import { leadFieldMessage } from "../lib/leadMessages"
import { useQuoteDraft } from "../lib/quoteDraft"
import LeadFallback from "./LeadFallback"
import { track } from "../lib/analytics"
import { hrefForPage } from "../lib/routes"
import { SERVICES, SERVICE_BY_SLUG, SERVICE_GROUPS } from "../data/services"
import { ESTIMATOR } from "../data/pricing"

type FormState = {
  service: string
  name: string
  phone: string
  email: string
  city: string
  description: string
  hp: string
}

type Step = 1 | 2 | 3
const STEPS = [1, 2, 3] as const
const FIELD_ORDER: LeadField[] = ["city", "description", "photos", "name", "phone", "email"]
const stepForField = (field: LeadField): Step => ["city", "description", "photos"].includes(field) ? 2 : 3
const serviceSlug = (value: string | undefined) =>
  SERVICES.find((s) => s.slug === value || s.name === value)?.slug ?? ""
const EMPTY: FormState = { service: "", name: "", phone: "", email: "", city: "", description: "", hp: "" }

/**
 * Three small steps: choose the work, describe the project, then contact
 * details. Only the last step can send a request. All panels stay mounted so
 * going back preserves typed text and the native photo selection.
 */
export default function QuoteForm({
  compact,
  sourcePage = "website",
  presetService = "",
  presetCity = "",
}: {
  compact?: boolean
  sourcePage?: string
  presetService?: string
  presetCity?: string
}) {
  const { t, lang, pick } = useLang()
  const uid = useId()
  const fid = (name: string) => `${uid}-${name}`.replace(/:/g, "")
  const { estimate, setEstimate, prefill, resetDraft } = useQuoteDraft()
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY,
    service: serviceSlug(presetService || prefill?.service),
    city: presetCity || prefill?.city || "",
    description: prefill?.description ?? "",
  }))
  const [step, setStep] = useState<Step>(() => serviceSlug(presetService || prefill?.service) ? 2 : 1)
  const [choiceError, setChoiceError] = useState(false)
  // What the widgets last suggested, so a newer suggestion may replace it.
  const suggested = useRef({
    service: serviceSlug(prefill?.service),
    city: prefill?.city,
    description: prefill?.description,
    serviceNonce: prefill?.serviceNonce,
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({})
  const leadId = useRef<string | null>(null)
  const lastLead = useRef<Lead | null>(null)
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const lead = useLeadSubmission(sourcePage)
  const photoCheck = acceptablePhotos(photos)
  const chosen = SERVICES.find((s) => s.slug === form.service)
  const needsDescription = !chosen
  const chosenName = chosen ? t(chosen.nameKey) : t("quote_other")

  const focusStep = (fieldName?: LeadField) => {
    window.setTimeout(() => {
      const target = fieldName ? document.getElementById(fid(fieldName)) : headingRef.current
      const details = target?.closest("details")
      if (details) details.open = true
      target?.focus({ preventScroll: true })
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" })
    }, 0)
  }

  const goToStep = (next: Step, fieldName?: LeadField) => {
    setStep(next)
    focusStep(fieldName)
  }

  useEffect(() => {
    track("quote_step_viewed", { sourcePage, step: String(step) })
  }, [sourcePage, step])

  // Suggestions from the calculator or the area checker fill empty fields
  // (or replace an earlier suggestion), never text the visitor wrote.
  useEffect(() => {
    if (!prefill) return
    const previous = suggested.current
    setForm((current) => {
      const next = { ...current }
      const service = serviceSlug(prefill.service)
      if (service && (!current.service || current.service === previous.service)) next.service = service
      if (prefill.city && (!current.city.trim() || current.city === previous.city)) {
        next.city = prefill.city
      }
      if (prefill.description && (!current.description.trim() || current.description === previous.description)) {
        next.description = prefill.description
      }
      return next
    })
    suggested.current = {
      service: serviceSlug(prefill.service) || previous.service,
      city: prefill.city ?? previous.city,
      description: prefill.description ?? previous.description,
      serviceNonce: prefill.serviceNonce,
    }
    leadId.current = null
    setErrors((e) => ({ ...e, city: undefined, description: undefined }))
    // Calculator and inspiration links have already answered step one.
    if (serviceSlug(prefill.service) && prefill.serviceNonce !== previous.serviceNonce) {
      setStep((current) => current === 1 ? 2 : current)
    }
  }, [prefill])

  // Server-side field errors come back through the hook.
  useEffect(() => {
    if (lead.failure === "invalid" && Object.keys(lead.fieldErrors).length > 0) {
      setErrors(lead.fieldErrors)
      const first = FIELD_ORDER.find((f) => lead.fieldErrors[f])
      if (first) goToStep(stepForField(first), first)
    }
  }, [lead.failure, lead.fieldErrors])

  useEffect(() => {
    if (lead.status === "sent" || lead.status === "failed") resultRef.current?.focus()
  }, [lead.status])

  const up = (key: keyof FormState, value: string) => {
    if (!started.current) {
      started.current = true
      track("form_started", { sourcePage })
    }
    // Any edit makes this a new request with a new id.
    leadId.current = null
    setForm((current) => ({ ...current, [key]: value }))
    if (errors[key as LeadField]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const choose = (slug: string) => {
    up("service", slug)
    if (slug !== form.service && form.description === suggested.current.description) {
      setForm((current) => ({ ...current, description: "" }))
    }
    setChoiceError(false)
    setErrors((current) => ({ ...current, description: undefined }))
    // Do not carry a bathroom estimate into an unrelated extension request.
    const estimatedSlug = ESTIMATOR.services.find((s) => s.id === estimate?.service)?.serviceSlug
    if (estimate && estimatedSlug !== slug) setEstimate(null)
    goToStep(2)
  }

  const message = (field: LeadField, code: string | undefined) => leadFieldMessage(field, code, pick)

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
      estimate: estimate?.summary ?? "",
      language: lang,
      sourcePage,
      utm_source: search.get("utm_source") ?? undefined,
      utm_medium: search.get("utm_medium") ?? undefined,
      utm_campaign: search.get("utm_campaign") ?? undefined,
      createdAt: new Date().toISOString(),
      hp: form.hp,
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (lead.status === "sending") return
    if (step === 1) {
      setChoiceError(true)
      return
    }

    const payload = buildLead()
    const check = validateLead(payload as unknown as Record<string, unknown>)
    const { id: _id, ...allErrors } = check.errors
    const fieldErrors = step === 2
      ? { city: allErrors.city, description: allErrors.description, photos: errors.photos }
      : { ...allErrors, photos: errors.photos }
    if (Object.values(fieldErrors).some(Boolean)) {
      setErrors(fieldErrors)
      const first = FIELD_ORDER.find((f) => fieldErrors[f])
      if (first) goToStep(stepForField(first), first)
      return
    }

    setErrors({})
    if (step === 2) {
      goToStep(3)
      return
    }
    lastLead.current = payload
    await lead.send(payload, photos)
  }

  if (lead.status === "sending") {
    return (
      <div className="py-12 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-3 border-line border-t-pine-700" aria-hidden="true" />
        <p className="m-0 text-sm font-semibold text-muted">{t("form_sending")}</p>
      </div>
    )
  }

  if (lead.status === "failed" && lastLead.current) {
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <LeadFallback
          lead={lastLead.current}
          failure={lead.failure}
          onRetry={() => lastLead.current && void lead.send(lastLead.current, photos)}
          onEdit={() => {
            lead.edit()
            focusStep()
          }}
        />
      </div>
    )
  }

  if (lead.status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} className="py-12 text-center outline-none" role="status">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pine-100 text-pine-700">
          <Icon name="check" size={32} />
        </div>
        <h3 className="m-0 text-2xl text-ink">{t("form_success_title")}</h3>
        <p className="mx-auto mt-2 mb-0 max-w-sm text-muted">{t("form_success_sub")}</p>
        {lead.reference && (
          <p className="mt-4 mb-0 inline-flex items-center gap-2 rounded-full bg-sand-100 px-3.5 py-1.5 text-sm text-muted">
            {pick({ nl: "Referentie", en: "Reference", uk: "Номер запиту", ru: "Номер запроса" })}:{" "}
            <strong className="font-mono text-ink">{lead.reference}</strong>
          </p>
        )}
        {lead.photosSkipped && (
          <p className="mx-auto mt-3 mb-0 max-w-sm text-sm text-muted">{t("form_photos_too_big")}</p>
        )}
        <button
          type="button"
          className="btn btn-outline mt-6"
          onClick={() => {
            lead.edit()
            leadId.current = null
            lastLead.current = null
            started.current = false
            setErrors({})
            setPhotos([])
            resetDraft()
            suggested.current = { service: "", city: undefined, description: undefined, serviceNonce: undefined }
            setForm({ ...EMPTY, service: serviceSlug(presetService), city: presetCity })
            goToStep(serviceSlug(presetService) ? 2 : 1)
          }}
        >
          {t("quote_new_request")}
        </button>
      </div>
    )
  }

  const field = (name: LeadField) => ({
    id: fid(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? fid(`${name}-error`) : undefined,
  })

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="quote-form space-y-5" data-step={step} noValidate>
      <noscript><p className="notice">{t("quote_js_required")}</p></noscript>

      <ol className="quote-progress" aria-label={t("quote_progress")}>
        {STEPS.map((n) => (
          <li key={n}>
            <button
              type="button"
              disabled={n > step}
              data-state={n < step ? "done" : n === step ? "current" : "todo"}
              aria-current={n === step ? "step" : undefined}
              onClick={() => goToStep(n)}
            >
              <span className="quote-progress-no" aria-hidden="true">
                {n < step ? <Icon name="check" size={14} strokeWidth={2.5} /> : n}
              </span>
              <span>{t(`quote_tab_${n}`)}</span>
            </button>
          </li>
        ))}
      </ol>

      <div>
        <p className="quote-step-count">{t("quote_step_count", { n: String(step) })}</p>
        <h3 ref={headingRef} tabIndex={-1} id={fid("step-title")} className="quote-step-title">
          {t(`quote_question_${step}`)}
        </h3>
        <p className="quote-step-hint">{t(`quote_hint_${step}`)}</p>
      </div>

      {lead.failure === "invalid" && Object.values(errors).some(Boolean) && (
        <p role="alert" className="notice">
          {pick({ nl: "Controleer de gemarkeerde velden.", en: "Please check the highlighted fields.", uk: "Перевірте позначені поля.", ru: "Проверьте отмеченные поля." })}
        </p>
      )}

      <div hidden={step !== 1}>
        <p className="quote-service-count">{t("quote_service_count", { n: String(SERVICES.length) })}</p>
        <div className="quote-service-catalogue" role="group" aria-labelledby={fid("step-title")}>
          {SERVICE_GROUPS.map((group) => (
            <section className="quote-service-group" key={group.id} aria-labelledby={fid(`group-${group.id}`)}>
              <h4 id={fid(`group-${group.id}`)}>{t(group.titleKey)}</h4>
              <div className="project-choices">
                {group.slugs.map((slug) => {
                  const service = SERVICE_BY_SLUG[slug]
                  return (
                    <button
                      type="button"
                      key={service.slug}
                      className="project-choice"
                      data-service={service.slug}
                      aria-pressed={form.service === service.slug}
                      onClick={() => choose(service.slug)}
                    >
                      <span className="project-choice-icon"><Icon name={service.icon} size={20} /></span>
                      <span>{t(service.nameKey)}</span>
                      <Icon name="arrow-right" size={17} />
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
          <button
            type="button"
            className="project-choice project-choice-other"
            data-service="other"
            aria-pressed={form.service === "other"}
            onClick={() => choose("other")}
          >
            <span className="project-choice-icon"><Icon name="tools" size={22} /></span>
            <span>{t("quote_other")}</span>
            <Icon name="arrow-right" size={17} />
          </button>
        </div>
        {choiceError && <p role="alert" className="field-error">{t("quote_choose_error")}</p>}
        <p className="quote-safe-note"><Icon name="check" size={16} />{t("quote_project_first")}</p>
      </div>

      <div hidden={step !== 2} className="space-y-4" role="group" aria-labelledby={fid("step-title")}>
        <div className="quote-selection">
          <span><Icon name={chosen?.icon ?? "tools"} size={18} />{chosenName}</span>
          <button type="button" onClick={() => goToStep(1)}>{t("quote_change")}</button>
        </div>

        <Field id={fid("city")} label={t("form_city")} required error={message("city", errors.city)}>
          <input
            {...field("city")}
            required
            type="text"
            autoComplete="address-level2"
            maxLength={LEAD_LIMITS.city.max}
            value={form.city}
            onChange={(event) => up("city", event.target.value)}
            className="field"
          />
        </Field>

        <Field
          id={fid("description")}
          label={t("form_desc")}
          required={needsDescription}
          optional={!needsDescription ? t("form_optional") : undefined}
          error={message("description", errors.description)}
        >
          <textarea
            {...field("description")}
            required={needsDescription}
            rows={3}
            placeholder={t("quote_desc_placeholder")}
            maxLength={LEAD_LIMITS.description.max}
            value={form.description}
            onChange={(event) => up("description", event.target.value)}
            className="field resize-y"
          />
        </Field>

        {estimate && (
          <div className="estimate-attached" data-testid="estimate-attached">
            <span className="estimate-attached-icon" aria-hidden="true">
              <Icon name="calculator" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="estimate-attached-label">
                {pick({
                  nl: "Uw berekening is toegevoegd",
                  en: "Your calculation is attached",
                  uk: "Ваш розрахунок додано",
                  ru: "Ваш расчёт добавлен",
                })}
              </span>
              <span className="estimate-attached-text">{estimate.summary}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                leadId.current = null
                setEstimate(null)
              }}
              className="estimate-attached-remove"
            >
              {pick({ nl: "Verwijderen", en: "Remove", uk: "Видалити", ru: "Удалить" })}
            </button>
          </div>
        )}

        <details className="quote-photo-details">
          <summary><Icon name="camera" size={18} />{t("form_photos")} <span>{t("form_optional")}</span></summary>
          <div className="pt-3">
            <PhotoPicker
              fid={fid}
              photos={photos}
              photoCheck={photoCheck}
              error={message("photos", errors.photos)}
              onChange={(files) => {
                leadId.current = null
                setPhotos(files)
                setErrors((current) => ({ ...current, photos: undefined }))
              }}
            />
          </div>
        </details>
      </div>

      <div hidden={step !== 3} className="space-y-4" role="group" aria-labelledby={fid("step-title")}>
        <div className="quote-review">
          <div className="quote-review-head">
            <strong>{t("quote_summary")}</strong>
            <button type="button" onClick={() => goToStep(2)}>{t("quote_change")}</button>
          </div>
          <p>{chosenName} <span aria-hidden="true">·</span> {form.city}</p>
          {form.description && <p className="quote-review-description">{form.description}</p>}
          {estimate && <p className="quote-review-estimate">{estimate.summary}</p>}
          {photos.length > 0 && <p>{t("form_photos_selected", { n: String(photoCheck.files.length) })}</p>}
        </div>

        <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
          <Field id={fid("name")} label={t("form_name")} required error={message("name", errors.name)}>
            <input
              {...field("name")}
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
              {...field("phone")}
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

        <Field id={fid("email")} label={t("form_email")} optional={t("form_optional")} error={message("email", errors.email)}>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            maxLength={LEAD_LIMITS.email.max}
            value={form.email}
            onChange={(event) => up("email", event.target.value)}
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
          onChange={(event) => setForm((c) => ({ ...c, hp: event.target.value }))}
        />
      </div>

      {step > 1 && (
        <div className="quote-actions">
          <button type="button" className="btn btn-outline" onClick={() => goToStep(step === 3 ? 2 : 1)}>
            {t("btn_back")}
          </button>
          <button type="submit" className="btn btn-primary">
            {step === 3 ? t("btn_submit_request") : t("quote_continue")}
            <span className="btn-arrow" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
          </button>
        </div>
      )}

      {step === 3 && (
        <>
          <p className="quote-safe-note"><Icon name="check" size={16} />{t("quote_no_commitment")}</p>
          <p className="quote-vat-note">{t("quote_vat_note")}</p>
          <p className="m-0 text-center text-sm text-subtle">
            {t("form_privacy")}{" "}
            <a href={hrefForPage("privacy")} className="text-subtle underline hover:text-ink">
              {t("footer_privacy")}
            </a>
          </p>
        </>
      )}
    </form>
  )
}

function PhotoPicker({
  fid,
  photos,
  photoCheck,
  error,
  onChange,
}: {
  fid: (name: string) => string
  photos: File[]
  photoCheck: ReturnType<typeof acceptablePhotos>
  error?: string
  onChange: (files: File[]) => void
}) {
  const { t, pick } = useLang()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <span id={fid("photos-label")} className="sr-only">{t("form_photos")}</span>
      {/* A styled label stands in for the native control so its text follows the page language. */}
      <input
        ref={inputRef}
        id={fid("photos")}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        aria-labelledby={fid("photos-label")}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${fid("photos-status")} ${fid("photos-hint")}${error ? ` ${fid("photos-error")}` : ""}`}
        onChange={(event) => {
          onChange(Array.from(event.target.files ?? []))
        }}
        className="file-picker-input sr-only"
      />
      <label htmlFor={fid("photos")} className="file-picker">
        <span className="file-picker-btn" aria-hidden="true">
          <Icon name="camera" size={18} />
          {pick({ nl: "Foto's kiezen", en: "Choose photos", uk: "Вибрати фото", ru: "Выбрать фото" })}
        </span>
        <span id={fid("photos-status")} className={`file-picker-status ${photos.length > 0 ? "is-selected" : ""}`}>
          {photos.length > 0
            ? t("form_photos_selected", { n: String(photoCheck.files.length) })
            : pick({ nl: "Nog geen foto's gekozen", en: "No photos chosen yet", uk: "Фото ще не вибрано", ru: "Фото ещё не выбраны" })}
        </span>
      </label>
      <p id={fid("photos-hint")} className="mt-2 mb-0 text-sm text-subtle">
        {pick({
          nl: "Maximaal 5 foto's (JPG, PNG of WebP): tot 8 MB per foto en 12 MB samen.",
          en: "Up to 5 photos (JPG, PNG or WebP): 8 MB per photo, 12 MB in total.",
          uk: "До 5 фото (JPG, PNG або WebP): до 8 МБ кожне, разом до 12 МБ.",
          ru: "До 5 фото (JPG, PNG или WebP): до 8 МБ каждое, всего до 12 МБ.",
        })}
      </p>
      {photoCheck.skipped && (
        <p className="mt-1.5 mb-0 text-sm text-amber-ink" role="status">
          {pick({
            nl: "Niet alle foto's kunnen mee (te groot, te veel of geen JPG/PNG/WebP). De overige foto's worden wel verstuurd.",
            en: "Not all photos can be sent (too large, too many or not JPG/PNG/WebP). The others will be sent.",
            uk: "Не всі фото можна надіслати (завеликі, забагато або не JPG/PNG/WebP). Решту буде надіслано.",
            ru: "Не все фото можно отправить (слишком большие, слишком много или не JPG/PNG/WebP). Остальные будут отправлены.",
          })}
        </p>
      )}
      {error && <p id={fid("photos-error")} className="mt-2 mb-0 text-sm font-semibold text-danger" role="alert">{error}</p>}
      {photos.length > 0 && (
        <button
          type="button"
          className="btn btn-outline mt-3"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = ""
            onChange([])
          }}
        >
          {pick({ nl: "Foto's verwijderen", en: "Remove photos", uk: "Видалити фото", ru: "Удалить фото" })}
        </button>
      )}
    </div>
  )
}

export function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  optional?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-pine-700" aria-hidden="true"> *</span>}
        {optional && <span className="optional"> — {optional}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 mb-0 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
