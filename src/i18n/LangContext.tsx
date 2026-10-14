import { createContext, useContext, useEffect, useState } from "react"
import type { Lang } from "./translations"
import { t as translate, type TranslationKey } from "./translations"
import { readPreference, writePreference } from "../lib/storage"

/**
 * Dutch is the site's primary language: it is what the server renders, what
 * search engines index and what every visitor sees first. Other languages are
 * an opt-in switch for the visitor and are remembered as a preference.
 */
export const DEFAULT_LANG: Lang = "nl"
export const SUPPORTED_LANGS: Lang[] = ["nl", "en", "uk", "ru"]
const STORAGE_KEY = "bouwvast.lang"

export type Localized<T> = { nl: T } & Partial<Record<Lang, T>>

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
  /** Inline copy for one-off strings: falls back to Dutch, never to a key. */
  pick: <T>(copy: Localized<T>) => T
}

function storedLang(): Lang | null {
  const stored = readPreference(STORAGE_KEY) as Lang | null
  return stored && SUPPORTED_LANGS.includes(stored) ? stored : null
}

function format(str: string, params?: Record<string, string>) {
  if (!params) return str
  let out = str
  for (const [k, v] of Object.entries(params)) {
    out = out.split(`{${k}}`).join(v)
  }
  return out
}

function makeCtx(lang: Lang, setLang: (l: Lang) => void): LangCtx {
  return {
    lang,
    setLang,
    t: (key, params) => format(translate(lang, key), params),
    pick: (copy) => (copy[lang] ?? copy.nl) as never,
  }
}

const LangContext = createContext<LangCtx>(makeCtx(DEFAULT_LANG, () => {}))

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Always start in the language the server rendered, so hydration matches;
  // a remembered choice is applied right after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  useEffect(() => {
    const stored = storedLang()
    if (stored && stored !== DEFAULT_LANG) setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    writePreference(STORAGE_KEY, l)
  }

  return (
    <LangContext.Provider value={makeCtx(lang, setLang)}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
