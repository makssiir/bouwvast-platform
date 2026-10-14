import type { Localized } from "../i18n/LangContext"

/**
 * Completed projects shown on /projecten and the homepage.
 *
 * Intentionally empty. Add a project only when it is real: own photos (or
 * photos you hold the rights to), the client's permission to publish, and a
 * location no more precise than the town. The section and the page switch on
 * when `CLAIMS.projects` is enabled AND this list is not empty.
 */
export interface Project {
  /** Stable identifier, used as React key. */
  id: string
  title: Localized<string>
  category: Localized<string>
  /** Town only. Never a street or anything that identifies the client. */
  city: string
  /** Path under /public, e.g. "/images/projects/badkamer-leusden.webp". */
  image: string
  imageAlt: Localized<string>
  /** Optional "before" photo of the same view; the project then also appears in the before/after slider. */
  beforeImage?: string
  beforeImageAlt?: Localized<string>
  imageWidth: number
  imageHeight: number
  description: Localized<string>
  /** As actually recorded, e.g. "3 weken". Leave out when unknown. */
  duration?: Localized<string>
  materials?: Localized<string>
  serviceSlug: string
}

export const PROJECTS: Project[] = []
