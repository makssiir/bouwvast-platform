import { createContext, useContext, useState } from "react";
import type { Lang } from "./translations";
import { t as translate, type TranslationKey } from "./translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const SUPPORTED: Lang[] = ["nl", "en", "uk", "ru"];
const STORAGE_KEY = "bouwvast.lang";

function initialLang(): Lang {
  if (typeof window === "undefined") return "nl";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && SUPPORTED.includes(stored)) return stored;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  const detected = SUPPORTED.find((l) => l === nav);
  return detected ?? "nl";
}

const LangContext = createContext<LangCtx>({
  lang: "nl",
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage may be unavailable (private mode); language still updates in-session */
    }
  };
  const t = (key: TranslationKey) => translate(lang, key);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
