import Icon from "./Icon"
import { CONTACT } from "../data/contact"
import { useLang } from "../i18n/LangContext"
import type { Lead } from "../lib/leads"

/** Turns the request the visitor already typed into a message they can send. */
export function leadSummary(lead: Lead): string {
  const lines = [
    `${lead.service || "-"}`,
    lead.description,
    "",
    `${lead.name} · ${lead.phone}`,
    lead.email,
    lead.city,
  ]
  return lines.filter(Boolean).join("\n")
}

/**
 * Shown when a request did not reach us. The visitor keeps their typed input
 * and gets a channel that works right now, instead of a dead end.
 */
export default function LeadFallback({
  lead,
  queued,
  onRetry,
}: {
  lead: Lead
  queued: boolean
  onRetry: () => void
}) {
  const { t } = useLang()
  const summary = leadSummary(lead)
  const whatsappNumber = CONTACT.whatsapp.replace(/\D/g, "")
  const subject = `${t("form_error_subject")}: ${lead.service || lead.city}`

  return (
    <div className="py-8" role="alert">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <Icon name="close" size={30} color="currentColor" />
      </div>

      <h3 className="text-center text-2xl font-bold text-[var(--fg)]">
        {t("form_error_title")}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm text-[var(--muted)]">
        {t("form_error_sub")}
      </p>
      {queued && (
        <p className="mx-auto mt-2 max-w-sm text-center text-xs text-[var(--muted)]">
          {t("form_error_queued")}
        </p>
      )}

      <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summary)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary flex items-center justify-center gap-2 py-3 text-sm font-bold no-underline"
        >
          <Icon name="whatsapp" size={16} color="currentColor" />
          {t("form_error_whatsapp")}
        </a>
        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`}
          className="btn flex items-center justify-center gap-2 border border-[var(--border)] bg-white py-3 text-sm font-semibold text-[var(--fg)] no-underline"
        >
          <Icon name="mail" size={16} color="var(--brand)" />
          {t("form_error_email")}
        </a>
        <a
          href={`tel:${CONTACT.phoneTel}`}
          className="btn flex items-center justify-center gap-2 border border-[var(--border)] bg-white py-3 text-sm font-semibold text-[var(--fg)] no-underline"
        >
          <Icon name="phone" size={16} color="var(--brand)" />
          {t("form_error_call")}
        </a>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="mx-auto mt-4 block cursor-pointer border-0 bg-transparent text-sm font-semibold text-[var(--brand)] underline"
      >
        {t("form_error_retry")}
      </button>
    </div>
  )
}
