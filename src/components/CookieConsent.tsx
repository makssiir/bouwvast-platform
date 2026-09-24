import React, { useState, useEffect } from "react"
import { useLang } from "../i18n/LangContext"

export default function CookieConsent({
  onOpenStateChange,
}: {
  onOpenStateChange?: (open: boolean) => void
}) {
  const [show, setShow] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const consent = localStorage.getItem("bouwvast_cookie_consent")
    const shouldShow = !consent

    setShow(shouldShow)
    onOpenStateChange?.(shouldShow)

    if (!shouldShow) return

    const timer = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timer)
  }, [onOpenStateChange])

  const closeConsent = (value: "accepted" | "declined") => {
    localStorage.setItem("bouwvast_cookie_consent", value)
    setShow(false)
    onOpenStateChange?.(false)
  }

  const handleAccept = () => closeConsent("accepted")
  const handleDecline = () => closeConsent("declined")

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cookie_title")}
        className="w-full max-w-sm p-6 rounded-2xl bg-white border border-[var(--border)] shadow-2xl animate-[fade-in-up_0.4s_ease-out]"
      >
        <h2 className="text-base font-bold text-[var(--fg)] mb-2">
          {t("cookie_title")}
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
          {t("cookie_desc")}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--muted)] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {t("cookie_decline")}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-xl bg-[var(--brand)] text-white text-sm font-bold hover:bg-[var(--brand-dark)] shadow-md transition-colors cursor-pointer"
          >
            {t("cookie_accept")}
          </button>
        </div>
      </aside>
    </div>
  )
}
