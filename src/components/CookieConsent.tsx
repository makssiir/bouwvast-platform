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
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 bg-[rgba(15,23,42,0.32)] backdrop-blur-sm">
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cookie_title")}
        className="w-full max-w-[420px] rounded-[28px] border border-slate-200 bg-white/95 p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.16)] ring-1 ring-white/50 animate-[fade-in-up_0.35s_ease-out]"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-subtle)] text-[var(--brand-dark)] shadow-inner ring-1 ring-[var(--brand-tint)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l7 4v5c0 4.5-2.7 8.8-7 10-4.3-1.2-7-5.5-7-10V7l7-4z" />
              <path d="M9.5 12.5l1.7 1.7 3.3-4.2" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-[1.7rem] font-extrabold tracking-[-0.04em] text-[var(--fg)] leading-none">
            {t("cookie_title")}
          </h2>
        </div>

        <p className="mb-5 text-sm sm:text-[0.98rem] leading-relaxed text-[var(--muted)]">
          {t("cookie_desc")}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={handleDecline}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
          >
            {t("cookie_decline")}
          </button>
          <button
            onClick={handleAccept}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(21,128,61,0.22)] transition-all hover:bg-[var(--brand-dark)] active:scale-[0.99] cursor-pointer"
          >
            {t("cookie_accept")}
          </button>
        </div>
      </aside>
    </div>
  )
}
