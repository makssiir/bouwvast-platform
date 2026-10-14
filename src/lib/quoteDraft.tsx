import { createContext, useContext, useState } from "react"

/**
 * Structured details another component (the cost estimator) wants attached to
 * the next quote request. Held in React state — never written into a DOM
 * field — so it survives every edit the visitor makes and reaches the payload.
 */
export interface QuoteEstimate {
  service: string
  quantity: number
  unit: string
  tier: string
  includeDemolition: boolean
  includeMaterials: boolean
  priceMin: number
  priceMax: number
  /** Human-readable one-liner shown to the visitor and included in the lead. */
  summary: string
}

interface QuoteDraftCtx {
  estimate: QuoteEstimate | null
  setEstimate: (estimate: QuoteEstimate | null) => void
}

const Ctx = createContext<QuoteDraftCtx>({ estimate: null, setEstimate: () => {} })

export function QuoteDraftProvider({ children }: { children: React.ReactNode }) {
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null)
  return <Ctx.Provider value={{ estimate, setEstimate }}>{children}</Ctx.Provider>
}

export function useQuoteDraft() {
  return useContext(Ctx)
}

/** Scrolls to the on-page quote form if there is one; otherwise returns false. */
export function scrollToQuote(): boolean {
  const el = typeof document === "undefined" ? null : document.getElementById("quote")
  if (!el) return false
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  const field = el.querySelector<HTMLElement>("textarea, input:not([type=hidden])")
  window.setTimeout(() => field?.focus({ preventScroll: true }), reduce ? 0 : 400)
  return true
}
