import { useState, useEffect } from "react"
import { useLang } from "../i18n/LangContext"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showToTop, setShowToTop] = useState(false)
  const { pick } = useLang()

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
      setShowToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    document.getElementById("main")?.focus({ preventScroll: true })
  }

  return (
    <>
      {/* Top progress bar */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[110] h-[3px] w-full origin-left bg-gradient-to-r from-pine-500 to-pine-700"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* Back to top button (desktop only to prevent mobile overlap) */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          type="button"
          className="hidden md:flex fixed bottom-8 left-8 z-40 h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink shadow-[var(--shadow)] transition-colors hover:border-pine-700 hover:text-pine-700 animate-[fade-in_0.3s_ease-out]"
          aria-label={pick({ nl: "Terug naar boven", en: "Back to top", uk: "Вгору", ru: "Наверх" })}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </>
  )
}
