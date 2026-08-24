import React, { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("bouwvast_cookie_consent");
    if (!consent) {
      const t = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("bouwvast_cookie_consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("bouwvast_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside aria-label="Cookie instellingen" className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl bg-white border border-[var(--border)] shadow-2xl animate-[fade-in-up_0.4s_ease-out]">
      <h2 className="text-sm font-bold text-[var(--fg)] mb-1.5">Cookies & Privacy</h2>
      <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
        Wij gebruiken functionele en analytische cookies om onze website te optimaliseren en u een soepele gebruikservaring te bieden.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleDecline}
          className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] text-xs font-semibold text-[var(--muted)] hover:bg-gray-50"
        >
          Weigeren
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 rounded-lg bg-[var(--brand)] text-white text-xs font-bold hover:bg-[var(--brand-dark)] shadow-xs"
        >
          Accepteren
        </button>
      </div>
    </aside>
  );
}
