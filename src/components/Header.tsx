import { useState, useRef, useEffect } from "react"
import type { Page } from "../App"
import { Logo } from "./Logo"
import { useLang } from "../i18n/LangContext"
import { LANG_NAMES, type Lang } from "../i18n/translations"
import Icon from "./Icon"
import { CONTACT } from "../data/contact"
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
  const { t, lang, setLang } = useLang()
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Lock body scroll when mobile menu overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const NAV = [
    { label: t("nav_services"), page: "diensten" },
    { label: t("nav_projects"), page: "projecten" },
    { label: t("nav_area"), page: "werkgebied" },
    { label: t("nav_kennisbank"), page: "kennisbank" },
    { label: t("nav_business"), page: "zakelijk" },
    { label: t("nav_contact"), page: "contact" },
  ] as const

  return (
    <header className="site-header">
      <div className="container nav">
        <PageLink
          to="home"
          navigate={navigate}
          className="brand no-underline"
          ariaLabel="Bouwvast Home"
        >
          <Logo />
        </PageLink>

        <nav
          aria-label="Hoofdnavigatie"
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
                      ? "text-[var(--brand)] font-bold"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
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
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[var(--fg)] bg-white hover:bg-gray-50 border border-[var(--border)] rounded-lg shadow-2xs transition-all cursor-pointer"
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
              aria-label="Taalkeuze menu"
            >
              <span className="text-sm leading-none" aria-hidden="true">
                🌐
              </span>
              <span>{lang.toUpperCase()}</span>
              <span
                className={`text-[10px] text-gray-500 transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-40 rounded-xl bg-white border border-[var(--border)] shadow-xl py-1 z-50 animate-[fade-in-up_0.15s_ease-out]"
                role="menu"
                aria-label="Beschikbare talen"
              >
                {LANGS.map((l) => (
                  <button
                    key={l}
                    role="menuitem"
                    onClick={() => {
                      setLang(l)
                      setLangDropdownOpen(false)
                      track("language_changed", { language: l })
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-dark)] transition-colors cursor-pointer border-0 bg-transparent ${
                      lang === l
                        ? "text-[var(--brand)] font-bold bg-[var(--brand-subtle)]"
                        : "text-[var(--fg)]"
                    }`}
                  >
                    <span>{LANG_NAMES[l]}</span>
                    {lang === l && (
                      <span className="text-[var(--brand)] font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
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

          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="btn btn-outline btn-sm btn-hide-mobile hidden md:inline-flex"
          >
            <Icon name="phone" size={16} />
            {CONTACT.phoneDisplay}
          </a>

          <button
            aria-controls="nav-mobile"
            aria-expanded={menuOpen}
            aria-label="Menu"
            className="nav-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="nav-mobile" className="open">
          <ul>
            {NAV.map((n) => (
              <li key={n.page}>
                <PageLink
                  to={n.page as Page}
                  navigate={(next) => {
                    navigate(next)
                    setMenuOpen(false)
                  }}
                  ariaCurrent={page === n.page ? "page" : undefined}
                  className={`block w-full text-left py-4 no-underline text-base font-semibold ${
                    page === n.page
                      ? "text-[var(--brand)] font-bold"
                      : "text-[var(--fg)]"
                  }`}
                >
                  {n.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
