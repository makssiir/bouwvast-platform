import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import { SERVICES } from "../data/services";
import { submitLead } from "../lib/leads";
import { track } from "../lib/analytics";
import { useLang } from "../i18n/LangContext";

export default function QuoteModal({
  isOpen,
  onClose,
  initialService = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService,
    description: "",
    preferredDate: "",
    preferredTime: "all-day",
    name: "",
    phone: "",
    email: "",
    city: "Amersfoort",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !formData.service) return;
    if (step === 2 && !formData.description) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLead({
      id: crypto.randomUUID(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      postcode: "",
      service: formData.service,
      description: formData.description,
      photos: photos.map((f) => f.name).join(","),
      preferredDate: formData.preferredDate || null,
      preferredTime: formData.preferredTime,
      language: lang,
      sourcePage: "quote_modal",
      createdAt: new Date().toISOString(),
    });
    track("form_submitted", { sourcePage: "quote_modal" });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-xs animate-[fade-in_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-[var(--border)] animate-[scale-up_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--muted-bg)]">
          <div>
            <span className="eyebrow text-xs">Vrijblijvende Aanvraag</span>
            <h2 className="text-xl font-bold text-[var(--fg)] m-0">Offerte in 3 stappen</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-gray-500 hover:text-gray-900 border border-[var(--border)] flex items-center justify-center cursor-pointer"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="w-full bg-gray-100 h-1.5">
            <div
              className="bg-[var(--brand)] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center mx-auto mb-4">
                <Icon name="check" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--fg)] mb-2">Aanvraag succesvol ontvangen!</h3>
              <p className="text-sm text-[var(--muted)] max-w-sm mx-auto mb-6">
                Bedankt voor uw aanvraag. We beoordelen uw gegevens en nemen binnen 24 uur contact met u op.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  onClose();
                }}
                className="btn btn-primary"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <div>
              {/* Step 1: Select service */}
              {step === 1 && (
                <div>
                  <h3 className="text-base font-bold mb-4">1. Waarmee kunnen we u helpen?</h3>
                  <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {SERVICES.map((s) => {
                      const isSelected = formData.service === s.name;
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, service: s.name }))}
                          className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${isSelected ? 'border-[var(--brand)] bg-[var(--brand-subtle)] font-bold text-[var(--brand-dark)] shadow-xs' : 'border-[var(--border)] bg-white hover:border-[var(--brand)] text-[var(--fg)]'}`}
                        >
                          <Icon name={s.icon} size={20} color={isSelected ? "var(--brand)" : "var(--muted)"} />
                          <span className="text-xs">{s.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      disabled={!formData.service}
                      onClick={handleNext}
                      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Volgende stap &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Description & Photos */}
              {step === 2 && (
                <div>
                  <h3 className="text-base font-bold mb-4">2. Omschrijf uw klus of verbouwing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--fg)] mb-1">
                        Omschrijving van het werk *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                        className="field resize-none text-sm"
                        placeholder="Bijv. Nieuwe badkamer plaatsen van 8m2, leidingen verleggen en tegelwerk..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--fg)] mb-1">
                        Gewenste startperiode
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData((p) => ({ ...p, preferredTime: e.target.value }))}
                        className="field text-sm"
                      >
                        <option value="asap">Zo snel mogelijk / met spoed</option>
                        <option value="1-month">Binnen 1 maand</option>
                        <option value="3-months">Binnen 1 tot 3 maanden</option>
                        <option value="orienting">Nog aan het oriënteren</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--fg)] mb-1">
                        Foto's van de huidige situatie (optioneel)
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setPhotos(Array.from(e.target.files ?? []))}
                        className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[var(--brand)] file:text-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button type="button" onClick={handleBack} className="btn btn-white">
                      &larr; Terug
                    </button>
                    <button
                      type="button"
                      disabled={!formData.description}
                      onClick={handleNext}
                      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Volgende stap &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-base font-bold mb-4">3. Uw contactgegevens</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[var(--fg)] mb-1">Uw naam *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="field text-sm"
                        placeholder="Bijv. Jan de Vries"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[var(--fg)] mb-1">Telefoonnummer *</label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="field text-sm"
                          placeholder="06 12345678"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--fg)] mb-1">Woonplaats *</label>
                        <input
                          required
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                          className="field text-sm"
                          placeholder="Bijv. Amersfoort"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--fg)] mb-1">E-mailadres *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="field text-sm"
                        placeholder="uw@email.nl"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button type="button" onClick={handleBack} className="btn btn-white">
                      &larr; Terug
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Verzend aanvraag &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
