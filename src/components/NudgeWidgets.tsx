import { whatsappHref } from "../data/contact"
import { useLang } from "../i18n/LangContext"
import Icon from "./Icon"

/**
 * A single, quiet WhatsApp shortcut on desktop — only when a confirmed
 * WhatsApp number exists. The previous timed pop-up bubble and sticky scroll
 * bar repeated the header's call to action and promised reply times nobody
 * had confirmed, so they are gone.
 */
export default function NudgeWidgets({ onOpenQuote: _onOpenQuote }: { onOpenQuote: () => void }) {
  const { t } = useLang()
  const href = whatsappHref(t("nudge_wa_bubble"))
  if (!href) return null

  return (
    <div className="nudge-container select-none max-md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label={t("nudge_wa_btn")}
      >
        <Icon name="whatsapp" size={28} />
      </a>
    </div>
  )
}
