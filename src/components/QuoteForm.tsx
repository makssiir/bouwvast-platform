import React, { useRef, useState } from "react"
import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"
import { photosFitBudget } from "../lib/leads"
import type { Lead } from "../lib/leads"
import { useLeadSubmission } from "../lib/useLeadSubmission"
import LeadFallback from "./LeadFallback"
import { track } from "../lib/analytics"

/**
 * One screen, four fields. Everything else — which service, when, budget — is
 * a question for the phone call, not a hurdle between a visitor and asking.
 */
export default function QuoteForm({
  compact,
  sourcePage = "website",
  presetService = "",
}: {
  /** Stacks the fields for a narrow sidebar instead of pairing them. */
  compact?: boolean
  sourcePage?: string
  presetService?: string
}) {
  const { t, lang } = useLang()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    description: "",
    honeypot: "",
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [lastLead, setLastLead] = useState<Lead | null>(null)
  const started = useRef(false)
  const lead = useLeadSubmission(sourcePage)
  const photosTooLarge = photos.length > 0 && !photosFitBudget(photos)

  const up = (key: keyof typeof form, value: string) => {
    if (!started.current) {
      started.current = true
      track("form_started", { sourcePage })
    }
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (form.honeypot) return
    if (lead.status === "sending") return

    const search = new URLSearchParams(window.location.search)
    // Reusing the id on a retry keeps one request from becoming two leads.
    const payload: Lead = {
      id: lastLead?.id ?? crypto.randomUUID(),
      name: form.name,
      phone: form.phone,
      email: "",
      city: form.city,
      postcode: "",
      service: presetService,
      description: form.description,
      photos: photos.map((file) => file.name).join(","),
      preferredDate: null,
      preferredTime: "",
      language: lang,
      sourcePage,
      utm_source: search.get("utm_source") ?? undefined,
      utm_medium: search.get("utm_medium") ?? undefined,
      utm_campaign: search.get("utm_campaign") ?? undefined,
      createdAt: new Date().toISOString(),
    }

    setLastLead(payload)
    await lead.send(payload, photos)
  }

  if (lead.status === "sending" && lastLead) {
    return (
      <div className="py-12 text-center" aria-live="polite">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-3 border-[var(--border)] border-t-[var(--brand)]" />
        <p className="text-sm font-semibold text-[var(--muted)]">
          {t("form_sending")}
        </p>
      </div>
    )
  }

  if (lead.status === "failed" && lastLead) {
    return (
      <LeadFallback
        lead={lastLead}
        queued={lead.queued}
        onRetry={() => void lead.send(lastLead, photos)}
      />
    )
  }

  if (lead.status === "sent") {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name="check" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[var(--fg)]">
          {t("form_success_title")}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {t("form_success_sub")}
        </p>
        {lead.photosSkipped && (
          <p className="mx-auto mt-3 max-w-sm text-xs text-[var(--muted)]">
            {t("form_photos_too_big")}
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field id="quote-description" label={t("form_desc")} required>
        <textarea
          id="quote-description"
          required
          rows={compact ? 3 : 4}
          value={form.description}
          onChange={(event) => up("description", event.target.value)}
          className="field resize-none"
        />
      </Field>

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field id="quote-name" label={t("form_name")} required>
          <input
            id="quote-name"
            required
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => up("name", event.target.value)}
            className="field"
          />
        </Field>

        <Field id="quote-phone" label={t("form_phone")} required>
          <input
            id="quote-phone"
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => up("phone", event.target.value)}
            className="field"
          />
        </Field>
      </div>

      <Field id="quote-city" label={t("form_city")} required>
        <input
          id="quote-city"
          required
          type="text"
          autoComplete="address-level2"
          value={form.city}
          onChange={(event) => up("city", event.target.value)}
          className="field"
        />
      </Field>

      <div>
        <label
          htmlFor="quote-photos"
          className="mb-1.5 block text-xs font-bold text-[var(--fg)]"
        >
          {t("form_photos")} — {t("form_optional")}
        </label>
        <input
          id="quote-photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(event) =>
            setPhotos(Array.from(event.target.files ?? []).slice(0, 5))
          }
          className="block w-full text-sm text-[var(--muted)] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--brand)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        {photos.length > 0 && !photosTooLarge && (
          <p className="mt-2 text-xs font-semibold text-[var(--brand)]">
            {t("form_photos_selected").replace("{n}", String(photos.length))}
          </p>
        )}
        {photosTooLarge && (
          <p className="mt-2 text-xs text-amber-700">{t("form_photos_too_big")}</p>
        )}
      </div>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="quote-company">Bedrijf</label>
        <input
          id="quote-company"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(event) => up("honeypot", event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={lead.status === "sending"}
        className="btn btn-primary w-full py-4 text-base font-bold shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {lead.status === "sending" ? t("form_sending") : t("btn_submit_request")}
      </button>

      <p className="m-0 text-center text-xs text-[var(--muted)]">
        {t("form_privacy")}
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold text-[var(--fg)]"
      >
        {label}
        {required && <span className="text-[var(--brand)]"> *</span>}
      </label>
      {children}
    </div>
  )
}
