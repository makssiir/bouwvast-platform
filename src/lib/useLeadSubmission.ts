import { useRef, useState } from "react"
import { submitLead } from "./leads"
import type { Lead, LeadFailure, LeadResult } from "./leads"
import type { LeadField } from "./leadSchema.ts"
import { track } from "./analytics"

export type LeadStatus = "idle" | "sending" | "sent" | "failed"

export interface LeadSubmission {
  status: LeadStatus
  failure?: LeadFailure
  fieldErrors: Partial<Record<LeadField, string>>
  photosSkipped: boolean
  reference?: string
  send: (lead: Lead, files?: File[]) => Promise<LeadResult | null>
  /** Back to the (still filled-in) form. */
  edit: () => void
}

/**
 * One submit path for every quote form on the site. Success is reported only
 * after the endpoint confirms receipt of this exact lead, so the visitor is
 * never shown a thank-you for a request that went nowhere. Concurrent sends
 * (double clicks, Enter + click) are ignored.
 */
export function useLeadSubmission(sourcePage: string): LeadSubmission {
  const [status, setStatus] = useState<LeadStatus>("idle")
  const [failure, setFailure] = useState<LeadFailure | undefined>(undefined)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<LeadField, string>>>({})
  const [photosSkipped, setPhotosSkipped] = useState(false)
  const [reference, setReference] = useState<string | undefined>(undefined)
  const inFlight = useRef(false)

  const send = async (lead: Lead, files: File[] = []): Promise<LeadResult | null> => {
    if (inFlight.current) return null
    inFlight.current = true
    setStatus("sending")
    try {
      const result = await submitLead(lead, files)
      setPhotosSkipped(result.photosSkipped)
      setFieldErrors(result.fieldErrors ?? {})

      if (result.delivered) {
        track("form_submitted", { sourcePage })
        setFailure(undefined)
        setReference(result.reference)
        setStatus("sent")
      } else if (result.failure === "invalid") {
        // Content problem: back to the form with the fields highlighted.
        setFailure("invalid")
        setStatus("idle")
      } else {
        setFailure(result.failure)
        setStatus("failed")
      }
      return result
    } finally {
      inFlight.current = false
    }
  }

  const edit = () => {
    setStatus("idle")
    setFailure(undefined)
  }

  return { status, failure, fieldErrors, photosSkipped, reference, send, edit }
}
