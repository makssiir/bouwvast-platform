import { useState, useRef, useEffect } from "react";
import type { Page } from "../App";
import { Logo } from "./Logo";
import { useLang } from "../i18n/LangContext";
import { LANG_NAMES, type Lang } from "../i18n/translations";
import Icon from "./Icon";
import { CONTACT } from "../data/contact";
import { track } from "../lib/analytics";

const LANGS: Lang[] = ["nl", "en", "uk", "ru"];

export default function Header({
  page,
  navigate,
  menuOpen,
  setMenuOpen,
}: {
  page: string;
  navigate: (p: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const { t, lang, setLang } = useLang();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NAV = [
    { label: t("nav_services"), page: "diensten" },
    { label: t("nav_projects"), page: "projecten" },
    { label: t("nav_area"), page: "werkgebied" },
    { label: "Kennisbank", page: "kennisbank" },
    { label: t("nav_business"), page: "zakelijk" },
    { label: t("nav_about"), page: "over-ons" },
    { label: t("nav_contact"), page: "contact" },
  ] as const;

  return (
    <header className="site-header">
      <div className="container nav">
        <button 
          onClick={() => navigate("home")} 
          className="brand bg-transparent border-0 cursor-pointer p-0 text-left"
          aria-label="Bouwvast Home"
        >
          <Logo />
        </button>

        <nav aria-label="Hoofdnavigatie" className="hidden lg:flex items-center">
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.page}>
                <button
                  onClick={() => navigate(n.page as Page)}
                  aria-current={page === n.page ? "page" : undefined}
                  className={`bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold transition-colors ${page === n.page ? 'text-[var(--brand)] font-bold' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`}
                >
                  {n.label}
                </button>
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
              <span className="text-sm leading-none" aria-hidden="true">🌐</span>
              <span>{lang.toUpperCase()}</span>
              <span className={`text-[10px] text-gray-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true">▾</span>
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
                      setLang(l);
                      setLangDropdownOpen(false);
                      track("language_changed", { language: l });
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-dark)] transition-colors cursor-pointer border-0 bg-transparent ${lang === l ? 'text-[var(--brand)] font-bold bg-[var(--brand-subtle)]' : 'text-[var(--fg)]'}`}
                  >
                    <span>{LANG_NAMES[l]}</span>
                    {lang === l && <span className="text-[var(--brand)] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("contact")}
            className="btn btn-primary btn-sm btn-hide-mobile hidden sm:inline-flex"
          >
            <Icon name="check" size={16} />
            {t("nav_cta")}
          </button>

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
        <div id="nav-mobile" className="open container">
          <ul>
            {NAV.map((n) => (
              <li key={n.page}>
                <button
                  onClick={() => { navigate(n.page as Page); setMenuOpen(false); }}
                  className={`w-full text-left py-2 bg-transparent border-0 cursor-pointer text-base font-semibold ${page === n.page ? 'text-[var(--brand)] font-bold' : 'text-[var(--fg)]'}`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-3 border-t border-[var(--border)]">
            <button
              onClick={() => { navigate("contact"); setMenuOpen(false); }}
              className="btn btn-primary w-full"
            >
              <Icon name="check" size={18} />
              {t("nav_cta")}
            </button>
            <a
              className="btn btn-outline w-full"
              href={`tel:${CONTACT.phoneTel}`}
            >
              <Icon name="phone" size={18} />
              Bel direct: {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
