import { createContext, useContext, useState } from "react"
import type { Lang } from "./translations"
import { t as translate, type TranslationKey } from "./translations"

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
}

const SUPPORTED: Lang[] = ["uk", "nl", "en", "ru"]
const STORAGE_KEY = "bouwvast.lang"

function initialLang(): Lang {
  if (typeof window === "undefined") return "uk"
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored && SUPPORTED.includes(stored)) return stored
  const nav = window.navigator.language.slice(0, 2).toLowerCase()
  const detected = SUPPORTED.find((l) => l === nav)
  return detected ?? "uk"
}

const LangContext = createContext<LangCtx>({
  lang: "uk",
  setLang: () => {},
  t: (key) => key,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage may be unavailable (private mode); language still updates in-session */
    }
  }
  const t = (key: TranslationKey, params?: Record<string, string>) => {
    let str = translate(lang, key)
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, "g"), v)
      }
    }
    return str
  }
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
