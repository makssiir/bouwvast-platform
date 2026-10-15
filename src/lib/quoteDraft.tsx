import { createContext, useCallback, useContext, useMemo, useState } from "react"

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

/**
 * Suggested text for empty form fields, so a visitor who used the calculator
 * or the area checker lands on a request that is already filled in. The form
 * only uses it for fields that are empty (or still hold an earlier
 * suggestion): it never overwrites what the visitor typed.
 */
export interface QuotePrefill {
  city?: string
  description?: string
  /** Changes on every request, so the same suggestion can be applied twice. */
  nonce: number
}

interface QuoteDraftCtx {
  estimate: QuoteEstimate | null
  setEstimate: (estimate: QuoteEstimate | null) => void
  prefill: QuotePrefill | null
  suggest: (fields: Omit<QuotePrefill, "nonce">) => void
}

const Ctx = createContext<QuoteDraftCtx>({
  estimate: null,
  setEstimate: () => {},
  prefill: null,
  suggest: () => {},
})

export function QuoteDraftProvider({ children }: { children: React.ReactNode }) {
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null)
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null)
  const suggest = useCallback((fields: Omit<QuotePrefill, "nonce">) => {
    setPrefill((current) => ({ ...current, ...fields, nonce: (current?.nonce ?? 0) + 1 }))
  }, [])
  const value = useMemo(() => ({ estimate, setEstimate, prefill, suggest }), [estimate, prefill, suggest])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
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
  window.setTimeout(() => {
    // Never pull focus out of a dialog that opened in the meantime.
    if (document.querySelector('[aria-modal="true"]')) return
    field?.focus({ preventScroll: true })
  }, reduce ? 0 : 400)
  return true
}
