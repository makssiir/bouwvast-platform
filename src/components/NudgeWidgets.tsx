import React, { useState, useEffect } from "react";
import { CONTACT } from "../data/contact";
import { useLang } from "../i18n/LangContext";
import Icon from "./Icon";

export default function NudgeWidgets({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: () => void;
}) {
  const { t } = useLang();
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [showScrollNudge, setShowScrollNudge] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    // Show speech bubble after 2.5 seconds on the page
    const timer = setTimeout(() => {
      if (!bubbleDismissed) {
        setBubbleOpen(true);
      }
    }, 2500);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Show scroll bar after 400px of scrolling, hide near bottom form
      if (scrollY > 400 && scrollY + winHeight < docHeight - 600) {
        setShowScrollNudge(true);
      } else {
        setShowScrollNudge(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bubbleDismissed]);

  return (
    <>
      {/* 1. Floating WhatsApp with Non-Overlapping Speech Bubble */}
      <div className="nudge-container select-none">
        
        {/* Animated Speech Bubble (Cleanly stacked above button) */}
        {bubbleOpen && !bubbleDismissed && (
          <div 
            className="nudge-bubble animate-[fade-in-up_0.25s_ease-out]"
            role="status"
            aria-live="polite"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setBubbleOpen(false);
                setBubbleDismissed(true);
              }}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center text-xs border-0 cursor-pointer transition-colors"
              aria-label="Sluit melding"
            >
              ✕
            </button>

            {/* Header: Status */}
            <div className="flex items-center gap-2 mb-2 pr-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">
                {t("nudge_wa_online")}
              </span>
            </div>

            {/* Content text */}
            <p className="text-xs text-gray-700 leading-relaxed m-0 mb-3 font-medium">
              {t("nudge_wa_bubble")}
            </p>

            {/* Single full-width clean WhatsApp Action */}
            <a
              href={CONTACT.whatsappTemplate ?? `tel:${CONTACT.phoneTel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold text-center no-underline flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="whatsapp" size={16} />
              <span>{t("nudge_wa_btn")}</span>
            </a>

            {/* Downward triangle pointer targeting the WhatsApp button */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-[var(--border)] rotate-45 pointer-events-none" />
          </div>
        )}

        {/* WhatsApp Floating Circle Button (Directly below bubble with margin) */}
        <a
          href={CONTACT.whatsappTemplate ?? `tel:${CONTACT.phoneTel}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="Direct contact via WhatsApp"
        >
          <Icon name="whatsapp" size={28} />
        </a>
      </div>

      {/* 2. Desktop & Tablet Smart Sticky Nudge Bar */}
      {showScrollNudge && (
        <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-[fade-in-up_0.25s_ease-out]">
          <div className="flex items-center gap-4 py-3 px-5 rounded-full bg-[rgba(15,23,42,0.92)] backdrop-blur-md text-white shadow-2xl border border-slate-700">
            <span className="text-xs font-medium text-slate-200">
              💡 {t("nudge_bar_text")}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={CONTACT.whatsappTemplate ?? `tel:${CONTACT.phoneTel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold no-underline flex items-center gap-1 shadow-xs transition-colors"
              >
                <Icon name="whatsapp" size={14} />
                <span>{t("nudge_bar_wa")}</span>
              </a>
              <button
                onClick={onOpenQuoteModal}
                className="px-3.5 py-1.5 rounded-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white text-xs font-bold border-0 cursor-pointer shadow-xs transition-colors flex items-center gap-1"
              >
                <span>{t("nudge_bar_quote")}</span>
              </button>
              <button
                onClick={() => setShowScrollNudge(false)}
                className="text-slate-400 hover:text-white text-xs p-1 bg-transparent border-0 cursor-pointer ml-1"
                aria-label="Sluit balk"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
