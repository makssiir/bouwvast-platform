import type * as LocalPagesModule from "../pages/localPages"
import type { Page } from "./routes"

export type LocalPages = typeof LocalPagesModule

let loaded: LocalPages | null = null
let pending: Promise<LocalPages> | null = null

/** Starts (or reuses) the download of the place pages chunk. */
export function loadLocalPages(): Promise<LocalPages> {
  pending ??= import("../pages/localPages").then(
    (module) => (loaded = module),
    (error) => {
      pending = null
      throw error
    },
  )
  return pending
}

/** The place pages if they are already loaded, so rendering can stay synchronous. */
export function loadedLocalPages(): LocalPages | null {
  return loaded
}

export function needsLocalPages(page: Page): boolean {
  return typeof page === "object" && (page.type === "city" || page.type === "serviceCity")
}
