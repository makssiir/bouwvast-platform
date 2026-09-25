import { useState } from "react"
import { submitLead } from "./leads"
import type { Lead, LeadFailure, LeadResult } from "./leads"
import { track } from "./analytics"

export type LeadStatus = "idle" | "sending" | "sent" | "failed"

export interface LeadSubmission {
  status: LeadStatus
  failure?: LeadFailure
  /** The lead was stored locally and will be retried on a later visit. */
  queued: boolean
  /** Photos were left out of the request because they were too large. */
  photosSkipped: boolean
  send: (lead: Lead, files?: File[]) => Promise<LeadResult>
  reset: () => void
}

/**
 * One submit path for every quote form on the site. Success is reported only
 * after the endpoint confirms receipt, so the visitor is never shown a thank
 * you page for a request that went nowhere.
 */
export function useLeadSubmission(sourcePage: string): LeadSubmission {
  const [status, setStatus] = useState<LeadStatus>("idle")
  const [failure, setFailure] = useState<LeadFailure | undefined>(undefined)
  const [queued, setQueued] = useState(false)
  const [photosSkipped, setPhotosSkipped] = useState(false)

  const send = async (lead: Lead, files: File[] = []): Promise<LeadResult> => {
    setStatus("sending")
    const result = await submitLead(lead, files)

    setQueued(result.queued)
    setPhotosSkipped(result.photosSkipped)

    if (result.delivered) {
      // Only a confirmed delivery counts as a conversion.
      track("form_submitted", { sourcePage })
      setFailure(undefined)
      setStatus("sent")
    } else {
      setFailure(result.failure)
      setStatus("failed")
    }

    return result
  }

  const reset = () => {
    setStatus("idle")
    setFailure(undefined)
  }

  return { status, failure, queued, photosSkipped, send, reset }
}
