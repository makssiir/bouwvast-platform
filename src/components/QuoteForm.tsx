import React, { useEffect, useId, useRef, useState } from "react"
import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"
import { acceptablePhotos, newLeadId } from "../lib/leads"
import type { Lead } from "../lib/leads"
import { LEAD_LIMITS, validateLead } from "../lib/leadSchema.ts"
import type { LeadField } from "../lib/leadSchema.ts"
import { useLeadSubmission } from "../lib/useLeadSubmission"
import { useQuoteDraft } from "../lib/quoteDraft"
import LeadFallback from "./LeadFallback"
import { track } from "../lib/analytics"
import { hrefForPage } from "../lib/routes"

type FormState = {
  name: string
  phone: string
  email: string
  city: string
  description: string
  hp: string
}

const EMPTY: FormState = { name: "", phone: "", email: "", city: "", description: "", hp: "" }

/**
 * One screen, a few fields. The visitor's input lives in React state for the
 * whole life of the form — sending, failing, retrying and editing never clear
 * it. An estimate from the calculator is attached separately and never
 * overwrites what the visitor typed.
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
  const [form, setForm] = useState<FormState>({ ...EMPTY, city: presetCity })
  const [photos, setPhotos] = useState<File[]>([])
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({})
  const leadId = useRef<string | null>(null)
  const lastLead = useRef<Lead | null>(null)
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const lead = useLeadSubmission(sourcePage)
  const { estimate, setEstimate } = useQuoteDraft()
  const photoCheck = acceptablePhotos(photos)

  // Server-side field errors come back through the hook.
  useEffect(() => {
    if (lead.failure === "invalid" && Object.keys(lead.fieldErrors).length > 0) {
      setErrors(lead.fieldErrors)
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

  const message = (field: LeadField, code: string | undefined): string | undefined => {
    if (!code) return undefined
    if (field === "phone" && code === "invalid") {
      return pick({ nl: "Vul een geldig telefoonnummer in, bijvoorbeeld 06 12345678.", en: "Enter a valid phone number, e.g. +31 6 12345678.", uk: "Введіть дійсний номер телефону, напр. +31 6 12345678.", ru: "Введите действительный номер телефона, напр. +31 6 12345678." })
    }
    if (field === "email" && code === "invalid") {
      return pick({ nl: "Vul een geldig e-mailadres in of laat het veld leeg.", en: "Enter a valid email address or leave it empty.", uk: "Введіть дійсну e-mail адресу або залиште поле порожнім.", ru: "Введите действительный e-mail или оставьте поле пустым." })
    }
    if (code === "required") return pick({ nl: "Dit veld is verplicht.", en: "This field is required.", uk: "Це поле обов'язкове.", ru: "Это поле обязательно." })
    if (code === "too_short") return pick({ nl: "Dit is te kort.", en: "This is too short.", uk: "Занадто коротко.", ru: "Слишком коротко." })
    if (code === "too_long") return pick({ nl: "Dit is te lang.", en: "This is too long.", uk: "Занадто довго.", ru: "Слишком длинно." })
    return pick({ nl: "Controleer dit veld.", en: "Please check this field.", uk: "Перевірте це поле.", ru: "Проверьте это поле." })
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
      service: presetService,
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

    const payload = buildLead()
    const check = validateLead(payload as unknown as Record<string, unknown>)
    if (!check.ok) {
      const { id: _id, ...fieldErrors } = check.errors
      setErrors(fieldErrors)
      const order: LeadField[] = ["description", "name", "phone", "email", "city"]
      const first = order.find((f) => fieldErrors[f])
      if (first) document.getElementById(fid(first))?.focus()
      return
    }

    setErrors({})
    lastLead.current = payload
    await lead.send(payload, photoCheck.files)
  }

  if (lead.status === "sending") {
    return (
      <div className="py-12 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-3 border-[var(--border)] border-t-[var(--brand)]" aria-hidden="true" />
        <p className="text-sm font-semibold text-[var(--muted)]">{t("form_sending")}</p>
      </div>
    )
  }

  if (lead.status === "failed" && lastLead.current) {
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <LeadFallback
          lead={lastLead.current}
          failure={lead.failure}
          onRetry={() => lastLead.current && void lead.send(lastLead.current, photoCheck.files)}
          onEdit={() => {
            lead.edit()
            window.setTimeout(() => formRef.current?.querySelector<HTMLElement>("textarea, input")?.focus(), 0)
          }}
        />
      </div>
    )
  }

  if (lead.status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} className="py-12 text-center outline-none" role="status">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name="check" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[var(--fg)]">{t("form_success_title")}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{t("form_success_sub")}</p>
        {lead.reference && (
          <p className="mt-3 text-xs text-[var(--muted)]">
            {pick({ nl: "Referentie", en: "Reference", uk: "Номер запиту", ru: "Номер запроса" })}:{" "}
            <strong className="font-mono text-[var(--fg)]">{lead.reference}</strong>
          </p>
        )}
        {lead.photosSkipped && (
          <p className="mx-auto mt-3 max-w-sm text-xs text-[var(--muted)]">{t("form_photos_too_big")}</p>
        )}
      </div>
    )
  }

  const field = (name: LeadField) => ({
    id: fid(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? fid(`${name}-error`) : undefined,
  })

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
      {lead.failure === "invalid" && Object.keys(errors).length > 0 && (
        <p role="alert" className="m-0 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {pick({ nl: "Controleer de gemarkeerde velden.", en: "Please check the highlighted fields.", uk: "Перевірте позначені поля.", ru: "Проверьте отмеченные поля." })}
        </p>
      )}

      <Field id={fid("description")} label={t("form_desc")} required error={message("description", errors.description)}>
        <textarea
          {...field("description")}
          required
          rows={compact ? 3 : 4}
          maxLength={LEAD_LIMITS.description.max}
          value={form.description}
          onChange={(event) => up("description", event.target.value)}
          className="field resize-y"
        />
      </Field>

      {estimate && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-[var(--brand-tint)] bg-[var(--brand-subtle)] p-3 text-xs text-[var(--fg)]">
          <div>
            <span className="block font-bold text-[var(--brand-dark)]">{t("est_title")}</span>
            <span>{estimate.summary}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              leadId.current = null
              setEstimate(null)
            }}
            className="shrink-0 cursor-pointer rounded border-0 bg-transparent p-1 text-[var(--muted)] underline hover:text-[var(--fg)]"
          >
            {pick({ nl: "Verwijderen", en: "Remove", uk: "Видалити", ru: "Удалить" })}
          </button>
        </div>
      )}

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

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field id={fid("email")} label={`${t("form_email")} — ${t("form_optional")}`} error={message("email", errors.email)}>
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
      </div>

      <div>
        <label htmlFor={fid("photos")} className="mb-1.5 block text-xs font-bold text-[var(--fg)]">
          {t("form_photos")} — {t("form_optional")}
        </label>
        <input
          id={fid("photos")}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          aria-describedby={fid("photos-hint")}
          onChange={(event) => {
            leadId.current = null
            setPhotos(Array.from(event.target.files ?? []))
          }}
          className="block w-full text-sm text-[var(--muted)] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--brand)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        <p id={fid("photos-hint")} className="mt-1.5 mb-0 text-xs text-[var(--muted)]">
          {pick({
            nl: "Maximaal 5 foto's (JPG, PNG of WebP), samen tot 12 MB.",
            en: "Up to 5 photos (JPG, PNG or WebP), 12 MB in total.",
            uk: "До 5 фото (JPG, PNG або WebP), разом до 12 МБ.",
            ru: "До 5 фото (JPG, PNG или WebP), всего до 12 МБ.",
          })}
        </p>
        {photoCheck.files.length > 0 && (
          <p className="mt-1 text-xs font-semibold text-[var(--brand)]">
            {t("form_photos_selected", { n: String(photoCheck.files.length) })}
          </p>
        )}
        {photoCheck.skipped && (
          <p className="mt-1 text-xs text-amber-800" role="status">
            {pick({
              nl: "Niet alle foto's kunnen mee (te groot, te veel of geen JPG/PNG/WebP). De overige foto's worden wel verstuurd.",
              en: "Not all photos can be sent (too large, too many or not JPG/PNG/WebP). The others will be sent.",
              uk: "Не всі фото можна надіслати (завеликі, забагато або не JPG/PNG/WebP). Решту буде надіслано.",
              ru: "Не все фото можно отправить (слишком большие, слишком много или не JPG/PNG/WebP). Остальные будут отправлены.",
            })}
          </p>
        )}
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

      <button
        type="submit"
        className="btn btn-primary w-full py-4 text-base font-bold shadow-md"
      >
        {t("btn_submit_request")}
      </button>

      <p className="m-0 text-center text-xs text-[var(--muted)]">
        {t("form_privacy")}{" "}
        <a href={hrefForPage("privacy")} className="underline text-[var(--muted)] hover:text-[var(--fg)]">
          {t("footer_privacy")}
        </a>
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-[var(--fg)]">
        {label}
        {required && <span className="text-[var(--brand-dark)]" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 mb-0 text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
