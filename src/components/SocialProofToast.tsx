import React, { useState, useEffect } from "react"
import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"
import type { TranslationKey } from "../i18n/translations"

const RECENT_ACTIVITIES: Array<{
  serviceKey: TranslationKey
  city: string
  timeNum: number
  timeUnit: TranslationKey
  typeKey: TranslationKey
}> = [
  {
    serviceKey: "svc_bathroom",
    city: "Amersfoort Vathorst",
    timeNum: 8,
    timeUnit: "toast_minutes",
    typeKey: "toast_request",
  },
  {
    serviceKey: "svc_painting",
    city: "Leusden",
    timeNum: 22,
    timeUnit: "toast_minutes",
    typeKey: "toast_quote",
  },
  {
    serviceKey: "svc_finishing",
    city: "Soest",
    timeNum: 41,
    timeUnit: "toast_minutes",
    typeKey: "toast_request",
  },
  {
    serviceKey: "svc_renovation",
    city: "Utrecht Oost",
    timeNum: 1,
    timeUnit: "toast_hour",
    typeKey: "toast_request",
  },
  {
    serviceKey: "svc_general",
    city: "Zeist",
    timeNum: 2,
    timeUnit: "toast_hour",
    typeKey: "toast_quote",
  },
]

export default function SocialProofToast() {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return

    // Show initial toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true)
    }, 4000)

    // Cycle every 12 seconds
    const cycleInterval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length)
        setVisible(true)
      }, 600)
    }, 12000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(cycleInterval)
    }
  }, [dismissed])

  if (dismissed || !visible) return null

  const current = RECENT_ACTIVITIES[index]

  return (
    <aside
      aria-label="Recente aanvragen"
      className="fixed bottom-20 max-md:top-24 max-md:bottom-auto left-6 max-md:left-4 max-md:right-4 z-50 max-w-sm bg-white rounded-xl border border-[var(--border)] p-3.5 shadow-xl transition-all duration-500 animate-[fade-in-up_0.4s_ease-out]"
    >
      <div className="flex items-start gap-3">
        {/* Pulsing Green Dot */}
        <div className="relative mt-1 shrink-0">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand)] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand)]" />
          </span>
        </div>

        <div className="flex-1 pr-2">
          <p className="text-xs font-bold text-[var(--fg)] m-0 leading-tight">
            {t("toast_new")} {t(current.typeKey)}:{" "}
            <span className="text-[var(--brand-dark)]">
              {t(current.serviceKey)}
            </span>
          </p>
          <p className="text-[11px] text-[var(--muted)] m-0 mt-0.5">
            📍 {current.city} ·{" "}
            <span className="font-medium">
              {current.timeNum} {t(current.timeUnit)} {t("toast_ago")}
            </span>
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-gray-600 bg-transparent border-0 p-0 cursor-pointer text-sm leading-none"
          aria-label={t("close")}
        >
          ×
        </button>
      </div>
    </aside>
  )
}
