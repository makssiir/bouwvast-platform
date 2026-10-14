import { useState, useRef, useEffect } from "react"
import type { Page } from "../App"
import { Logo } from "./Logo"
import { useLang } from "../i18n/LangContext"
import { LANG_NAMES, type Lang } from "../i18n/translations"
import Icon from "./Icon"
import { CONTACT, phoneHref } from "../data/contact"
import { track } from "../lib/analytics"
import PageLink from "./PageLink"

const LANGS: Lang[] = ["nl", "en", "uk", "ru"]

export default function Header({
  page,
  navigate,
  menuOpen,
  setMenuOpen,
}: {
  page: string
  navigate: (p: Page) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
}) {
  const { t, lang, setLang, pick } = useLang()
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const langButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const tel = phoneHref()

  useEffect(() => {
    const handlePointer = (event: MouseEvent | FocusEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handlePointer)
    document.addEventListener("focusin", handlePointer)
    return () => {
      document.removeEventListener("mousedown", handlePointer)
      document.removeEventListener("focusin", handlePointer)
    }
  }, [])

  // Escape closes whichever menu is open and returns focus to its button.
  useEffect(() => {
    if (!langDropdownOpen && !menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      if (langDropdownOpen) {
        setLangDropdownOpen(false)
        langButtonRef.current?.focus()
      } else if (menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [langDropdownOpen, menuOpen, setMenuOpen])

  // Lock body scroll while the mobile menu is open, move focus into it, and
  // close it if the layout grows back to desktop.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    mobileMenuRef.current?.querySelector<HTMLElement>("a, button")?.focus()
    const media = window.matchMedia("(min-width: 1024px)")
    const onChange = () => media.matches && setMenuOpen(false)
    media.addEventListener?.("change", onChange)
    return () => {
      document.body.style.overflow = previous
      media.removeEventListener?.("change", onChange)
    }
  }, [menuOpen, setMenuOpen])

  const NAV = [
    { label: t("nav_services"), page: "diensten" },
    { label: t("nav_projects"), page: "projecten" },
    { label: t("nav_area"), page: "werkgebied" },
    { label: t("nav_kennisbank"), page: "kennisbank" },
    { label: t("nav_business"), page: "zakelijk" },
    { label: t("nav_contact"), page: "contact" },
  ] as const

  return (
    <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
      <div className="container nav">
        <PageLink
          to="home"
          navigate={navigate}
          className="brand no-underline"
          ariaLabel={`Bouwvast — ${t("nav_home")}`}
        >
          <Logo />
        </PageLink>

        <nav
          aria-label={pick({ nl: "Hoofdnavigatie", en: "Main navigation", uk: "Головна навігація", ru: "Главная навигация" })}
          className="hidden lg:flex items-center"
        >
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.page}>
                <PageLink
                  to={n.page as Page}
                  navigate={navigate}
                  ariaCurrent={page === n.page ? "page" : undefined}
                  className={`no-underline text-sm font-semibold transition-colors ${
                    page === n.page
                      ? "text-[#15803d] font-extrabold"
                      : "text-[#0f172a] hover:text-[#16a34a]"
                  }`}
                >
                  {n.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta">
          {/* Compact Dropdown Language Switcher Toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={langButtonRef}
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold text-[#0f172a] bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 rounded-lg shadow-2xs transition-all cursor-pointer"
              aria-expanded={langDropdownOpen}
              aria-controls="lang-options"
              aria-label={`${pick({ nl: "Taal kiezen", en: "Choose language", uk: "Вибрати мову", ru: "Выбрать язык" })}: ${LANG_NAMES[lang]}`}
            >
              <span className="text-sm leading-none" aria-hidden="true">
                🌐
              </span>
              <span>{lang.toUpperCase()}</span>
              <span
                className={`text-[10px] text-slate-600 transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {langDropdownOpen && (
              <ul
                id="lang-options"
                className="absolute right-0 mt-2 w-44 rounded-xl bg-white border-2 border-slate-200 shadow-2xl py-1 z-50 animate-[fade-in-up_0.15s_ease-out] list-none m-0 p-0"
              >
                {LANGS.map((l) => (
                  <li key={l}>
                  <button
                    type="button"
                    lang={l}
                    aria-pressed={lang === l}
                    onClick={() => {
                      setLang(l)
                      setLangDropdownOpen(false)
                      langButtonRef.current?.focus()
                      track("language_changed", { language: l })
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold flex items-center justify-between hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-dark)] transition-colors cursor-pointer border-0 bg-transparent ${
                      lang === l
                        ? "text-[var(--brand-dark)] font-extrabold bg-[var(--brand-subtle)]"
                        : "text-[#0f172a]"
                    }`}
                  >
                    <span>{LANG_NAMES[l]}</span>
                    {lang === l && (
                      <span className="text-[var(--brand-dark)] font-extrabold" aria-hidden="true">✓</span>
                    )}
                  </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <PageLink
            to="contact"
            navigate={navigate}
            className="btn btn-primary btn-sm btn-hide-mobile hidden sm:inline-flex no-underline"
          >
            <Icon name="check" size={16} />
            {t("nav_cta")}
          </PageLink>

          {tel && (
            <a
              href={tel}
              className="btn btn-outline btn-sm btn-hide-mobile hidden md:inline-flex"
            >
              <Icon name="phone" size={16} />
              {CONTACT.phoneDisplay}
            </a>
          )}

          <button
            ref={menuButtonRef}
            aria-controls="nav-mobile"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("close") : "Menu"}
            className="nav-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="nav-mobile" className="open" ref={mobileMenuRef}>
          <nav aria-label={pick({ nl: "Mobiele navigatie", en: "Mobile navigation", uk: "Мобільна навігація", ru: "Мобильная навигация" })}>
          <ul className="nav-mobile-list">
            {NAV.map((n) => (
              <li key={n.page}>
                <PageLink
                  to={n.page as Page}
                  navigate={(next) => {
                    navigate(next)
                    setMenuOpen(false)
                  }}
                  ariaCurrent={page === n.page ? "page" : undefined}
                  className={`nav-mobile-link ${
                    page === n.page ? "active" : ""
                  }`}
                >
                  <span>{n.label}</span>
                  <span className="nav-mobile-arrow">→</span>
                </PageLink>
              </li>
            ))}
          </ul>
          </nav>

          <div className="nav-mobile-footer">
            <PageLink
              to="contact"
              navigate={(next) => {
                navigate(next)
                setMenuOpen(false)
              }}
              className="btn btn-primary w-full justify-center py-3.5 text-base font-bold shadow-md no-underline"
            >
              <Icon name="check" size={18} />
              <span>{t("nav_cta")}</span>
            </PageLink>

            {tel && (
              <a
                href={tel}
                className="btn btn-outline w-full justify-center py-3 text-sm font-bold no-underline text-[var(--fg)]"
              >
                <Icon name="phone" size={16} />
                <span>{t("nav_call")} ({CONTACT.phoneDisplay})</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
