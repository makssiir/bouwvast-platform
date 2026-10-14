import { useEffect, useId, useRef, useState } from "react"
import { COMPANY } from "../data/company"
import { whatsappHref } from "../data/contact"
import { useLang } from "../i18n/LangContext"
import { track } from "../lib/analytics"
import Icon from "./Icon"
import { LogoMark } from "./Logo"

const SEEN_KEY = "bv-nudge-seen"
/** Time on the site before the pop-up may appear. */
const FIRST_DELAY_MS = 9000
/** When the visitor is busy (typing, in a widget, reading the form), try again later. */
const RETRY_MS = 4000

let seenThisLoad = false

function alreadySeen(): boolean {
  if (seenThisLoad) return true
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1"
  } catch {
    return false
  }
}

function markSeen(): void {
  seenThisLoad = true
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1")
  } catch {
    /* blocked storage: the in-memory flag covers this visit */
  }
}

/** True while a pop-up would get in the visitor's way. */
function visitorIsBusy(): boolean {
  if (document.activeElement?.closest("form, [role=dialog], #calculator, #werkgebied-check")) return true
  if (document.querySelector("[aria-modal=true]")) return true
  const quote = document.getElementById("quote")
  if (quote) {
    const rect = quote.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return true
  }
  return false
}

/**
 * Desktop pop-up, once per browser session, after the visitor has spent a
 * little time on the site. With a confirmed WhatsApp number it offers a chat
 * (plus the floating WhatsApp button); without one it points to the quote
 * request instead — never to a placeholder number. Small screens use the
 * bottom contact bar instead, so this is hidden there.
 */
export default function NudgeWidgets({
  onOpenQuote,
  suppress = false,
}: {
  onOpenQuote: () => void
  /** Hide the pop-up, e.g. on the contact page where the form is in view. */
  suppress?: boolean
}) {
  const { t } = useLang()
  const uid = useId().replace(/:/g, "")
  const [open, setOpen] = useState(false)
  const suppressed = useRef(suppress)
  const chat = whatsappHref(t("nudge_wa_msg"))
  const float = whatsappHref()

  // The timer below outlives page changes, so it reads the latest value.
  useEffect(() => {
    suppressed.current = suppress
  }, [suppress])

  useEffect(() => {
    if (alreadySeen()) return
    let timer = 0
    const attempt = () => {
      // Phones and small tablets: the contact bar already covers this.
      if (window.matchMedia?.("(max-width: 768px)").matches) return
      if (suppressed.current || visitorIsBusy()) {
        timer = window.setTimeout(attempt, RETRY_MS)
        return
      }
      markSeen()
      setOpen(true)
    }
    timer = window.setTimeout(attempt, FIRST_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const visible = open && !suppress
  if (!visible && !float) return null

  const close = () => setOpen(false)

  return (
    <div className="nudge-container">
      {visible && (
        <aside
          className="nudge-bubble"
          aria-labelledby={`${uid}-title`}
          data-testid="nudge"
          onKeyDown={(event) => {
            if (event.key === "Escape") close()
          }}
        >
          <button type="button" className="nudge-close" aria-label={t("nudge_close")} onClick={close}>
            <Icon name="close" size={16} strokeWidth={2.2} />
          </button>

          {chat ? (
            <>
              <div className="nudge-head">
                <span className="nudge-avatar" aria-hidden="true">
                  <LogoMark size={40} />
                </span>
                <div className="min-w-0">
                  <p className="nudge-name">{COMPANY.brand.value}</p>
                  <p id={`${uid}-title`} className="nudge-title">
                    {t("nudge_wa_title")}
                  </p>
                </div>
              </div>
              <p className="nudge-text nudge-text--bubble">{t("nudge_wa_bubble")}</p>
              <a
                href={chat}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
                onClick={() => {
                  track("whatsapp_clicked", { source: "nudge" })
                  close()
                }}
              >
                <Icon name="whatsapp" size={18} />
                {t("nudge_wa_btn")}
              </a>
            </>
          ) : (
            <>
              <span className="nudge-icon" aria-hidden="true">
                <Icon name="chat" size={20} />
              </span>
              <p id={`${uid}-title`} className="nudge-title">
                {t("nudge_quote_title")}
              </p>
              <p className="nudge-text">{t("nudge_quote_text")}</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  close()
                  onOpenQuote()
                }}
              >
                {t("nav_cta")}
                <span className="btn-arrow" aria-hidden="true">
                  <Icon name="arrow-right" size={16} />
                </span>
              </button>
            </>
          )}
        </aside>
      )}

      {float && (
        <a
          href={float}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="WhatsApp"
          onClick={() => track("whatsapp_clicked", { source: "float" })}
        >
          <Icon name="whatsapp" size={28} />
        </a>
      )}
    </div>
  )
}
