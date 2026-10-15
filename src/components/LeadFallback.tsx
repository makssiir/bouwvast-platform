import Icon from "./Icon"
import { emailHref, hasDirectChannel, phoneHref, whatsappHref } from "../data/contact"
import { useLang } from "../i18n/LangContext"
import type { Lead, LeadFailure } from "../lib/leads"

/** Turns the request the visitor already typed into a message they can send. */
export function leadSummary(lead: Lead, preference?: string): string {
  const lines = [
    lead.service,
    lead.description,
    lead.estimate,
    "",
    [lead.name, lead.phone].filter(Boolean).join(" · "),
    lead.email,
    lead.city,
    preference,
  ]
  return lines.filter((line, i) => Boolean(line) || i === 3).join("\n").trim()
}

const PREFERENCE_KEYS = {
  phone: "area_modal_pref_phone",
  whatsapp: "area_modal_pref_whatsapp",
  email: "area_modal_pref_email",
} as const

/**
 * Shown when a request did not reach us. The visitor keeps their typed input,
 * can edit or retry it, and is offered only channels that actually exist.
 */
export default function LeadFallback({
  lead,
  failure,
  onRetry,
  onEdit,
}: {
  lead: Lead
  failure?: LeadFailure
  onRetry: () => void
  onEdit: () => void
}) {
  const { t, pick } = useLang()
  const summary = leadSummary(
    lead,
    lead.contactPreference
      ? `${t("area_modal_pref_label")}: ${t(PREFERENCE_KEYS[lead.contactPreference])}`
      : undefined,
  )
  const subject = `${t("form_error_subject")}: ${lead.service || lead.city}`
  const wa = whatsappHref(summary)
  const mail = emailHref(subject, summary)
  const tel = phoneHref()
  const canRetry = failure !== "unconfigured"

  const detail =
    failure === "unconfigured"
      ? pick({
          nl: "Het online formulier is op dit moment niet beschikbaar.",
          en: "The online form is not available at the moment.",
          uk: "Онлайн-форма наразі недоступна.",
          ru: "Онлайн-форма сейчас недоступна.",
        })
      : failure === "rate_limited"
        ? pick({
            nl: "Er zijn kort achter elkaar te veel aanvragen verstuurd. Probeer het over een paar minuten opnieuw.",
            en: "Too many requests were sent in a short time. Please try again in a few minutes.",
            uk: "Забагато запитів за короткий час. Спробуйте ще раз за кілька хвилин.",
            ru: "Слишком много запросов за короткое время. Попробуйте снова через несколько минут.",
          })
        : pick({
            nl: "Er ging iets mis met de verbinding. Uw gegevens staan nog klaar; probeer het opnieuw.",
            en: "Something went wrong with the connection. Your details are still filled in; please try again.",
            uk: "Сталася помилка з'єднання. Ваші дані збережено; спробуйте ще раз.",
            ru: "Произошла ошибка соединения. Ваши данные сохранены; попробуйте ещё раз.",
          })

  return (
    <div className="py-8" role="alert">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-700">
        <Icon name="close" size={30} color="currentColor" />
      </div>

      <h3 className="text-center text-2xl font-bold text-[var(--fg)]">{t("form_error_title")}</h3>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm text-[var(--muted)]">{detail}</p>

      {hasDirectChannel() && (
        <>
          <p className="mx-auto mt-4 max-w-sm text-center text-sm text-[var(--muted)]">
            {pick({
              nl: "U kunt uw aanvraag ook direct sturen:",
              en: "You can also send your request directly:",
              uk: "Ви також можете надіслати запит напряму:",
              ru: "Вы также можете отправить запрос напрямую:",
            })}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center justify-center gap-2 py-3 text-sm font-bold no-underline">
                <Icon name="whatsapp" size={16} color="currentColor" />
                {t("form_error_whatsapp")}
              </a>
            )}
            {mail && (
              <a href={mail} className="btn flex items-center justify-center gap-2 border border-[var(--border)] bg-white py-3 text-sm font-semibold text-[var(--fg)] no-underline">
                <Icon name="mail" size={16} color="var(--brand)" />
                {t("form_error_email")}
              </a>
            )}
            {tel && (
              <a href={tel} className="btn flex items-center justify-center gap-2 border border-[var(--border)] bg-white py-3 text-sm font-semibold text-[var(--fg)] no-underline">
                <Icon name="phone" size={16} color="var(--brand)" />
                {t("form_error_call")}
              </a>
            )}
          </div>
        </>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-4">
        {canRetry && (
          <button type="button" onClick={onRetry} className="btn btn-primary text-sm font-bold">
            {t("form_error_retry")}
          </button>
        )}
        <button type="button" onClick={onEdit} className="btn btn-outline text-sm font-semibold">
          {pick({ nl: "Aanvraag aanpassen", en: "Edit request", uk: "Редагувати запит", ru: "Изменить запрос" })}
        </button>
      </div>
    </div>
  )
}
