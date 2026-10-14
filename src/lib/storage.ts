/**
 * Preference storage that can never take the site down.
 *
 * Safari private mode, blocked cookies, sandboxed iframes and full quotas all
 * make `localStorage` throw — sometimes on the first property access. Every
 * read and write goes through here and falls back to an in-memory map, so the
 * worst case is that a preference is forgotten on the next visit.
 */
const memory = new Map<string, string>()

function backing(): Storage | null {
  try {
    if (typeof window === "undefined") return null
    const storage = window.localStorage
    return storage ?? null
  } catch {
    return null
  }
}

export function readPreference(key: string): string | null {
  try {
    const value = backing()?.getItem(key)
    if (value !== undefined && value !== null) return value
  } catch {
    /* fall through to memory */
  }
  return memory.get(key) ?? null
}

export function writePreference(key: string, value: string): void {
  memory.set(key, value)
  try {
    backing()?.setItem(key, value)
  } catch {
    /* in-memory copy is enough for this visit */
  }
}

export function removePreference(key: string): void {
  memory.delete(key)
  try {
    backing()?.removeItem(key)
  } catch {
    /* nothing to clean up */
  }
}
