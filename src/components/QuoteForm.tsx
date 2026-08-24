import React, { useRef, useState } from "react";
import Icon from "./Icon";
import { useLang } from "../i18n/LangContext";
import { submitLead } from "../lib/leads";
import { track } from "../lib/analytics";
import { SERVICES } from "../data/services";

export default function QuoteForm({
  compact,
  sourcePage = "website",
  presetService = "",
}: {
  compact?: boolean;
  sourcePage?: string;
  presetService?: string;
}) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: presetService,
    description: "",
    preferredDate: "",
    preferredTime: "",
    honeypot: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);

  const up = (key: keyof typeof form, value: string) => {
    if (!started.current) {
      started.current = true;
      track("form_started", { sourcePage });
    }
    setForm((current) => ({ ...current, [key]: value }));
  };

  const fields = [
    ["quote-name", t("form_name"), "name", "text", true],
    ["quote-phone", t("form_phone"), "phone", "tel", true],
    ["quote-email", t("form_email"), "email", "email", true],
    ["quote-city", t("form_city"), "city", "text", true],
  ] as const;

  const services = SERVICES.map((s) => s.name);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.honeypot) return;
    const search = new URLSearchParams(window.location.search);
    await submitLead({
      id: crypto.randomUUID(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      postcode: "",
      service: form.service,
      description: form.description,
      photos: photos.map((file) => file.name).join(","),
      preferredDate: form.preferredDate || null,
      preferredTime: form.preferredTime,
      language: lang,
      sourcePage,
      utm_source: search.get("utm_source") ?? undefined,
      utm_medium: search.get("utm_medium") ?? undefined,
      utm_campaign: search.get("utm_campaign") ?? undefined,
      createdAt: new Date().toISOString(),
    });
    track("form_submitted", { sourcePage });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name="check" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[var(--fg)]">{t("form_success_title")}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{t("form_success_sub")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-[var(--border)] px-3.5 py-2 text-xs bg-[var(--muted-bg)]">
        <span className="font-semibold text-[var(--fg)]">Uw aanvraag</span>
        <span className="text-[var(--muted)]">Velden met * zijn verplicht</span>
      </div>

      <div className={compact ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        {fields.map(([id, label, key, type, required]) => (
          <Field key={id} id={id} label={label} required={required}>
            <input
              id={id}
              required={required}
              type={type}
              value={form[key]}
              onChange={(e) => up(key, e.target.value)}
              className="field"
              placeholder={label}
            />
          </Field>
        ))}

        <Field id="quote-service" label={t("form_type")} required>
          <select
            id="quote-service"
            required
            value={form.service}
            onChange={(e) => up("service", e.target.value)}
            className="field"
          >
            <option value="">{t("form_required")}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>

        <Field id="quote-time" label={t("form_time")} required>
          <select
            id="quote-time"
            required
            value={form.preferredTime}
            onChange={(e) => up("preferredTime", e.target.value)}
            className="field"
          >
            <option value="">{t("form_choose_time")}</option>
            <option value="morning">{t("form_time_morning")}</option>
            <option value="afternoon">{t("form_time_afternoon")}</option>
            <option value="all-day">{t("form_time_all_day")}</option>
            <option value="consultation">{t("form_time_consultation")}</option>
          </select>
        </Field>
      </div>

      <Field id="quote-description" label={t("form_desc")} required>
        <textarea
          id="quote-description"
          required
          rows={3}
          value={form.description}
          onChange={(e) => up("description", e.target.value)}
          className="field resize-none"
          placeholder="Omschrijf kort uw klus, verbouwing of situatie..."
        />
      </Field>

      <Field id="quote-photos" label={`${t("form_photos")} — ${t("form_optional")}`}>
        <div className="rounded-lg border border-dashed border-[var(--border)] p-3.5 bg-[var(--brand-subtle)] hover:border-[var(--brand)] transition-colors">
          <input
            id="quote-photos"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => {
              setPhotos(Array.from(e.target.files ?? []).slice(0, 5));
              up("description", form.description);
            }}
            className="block w-full text-sm text-[var(--muted)] file:mr-3 file:border-0 file:bg-[var(--brand)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:rounded-md cursor-pointer"
          />
          <p className="mt-2 text-xs text-[var(--muted)]">{t("form_photos_hint")}</p>
          {photos.length > 0 && (
            <p className="mt-2 text-xs font-semibold text-[var(--brand)]">
              {t("form_photos_selected").replace("{n}", String(photos.length))}
            </p>
          )}
        </div>
      </Field>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="quote-company">Bedrijf</label>
        <input
          id="quote-company"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => up("honeypot", e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full py-4 text-base font-bold shadow-md"
      >
        {t("form_submit")} &rarr;
      </button>
      <p className="text-center text-xs text-[var(--muted)] m-0">
        {t("form_privacy")}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-[var(--fg)]">
        {label}
        {required && <span className="text-[var(--brand)]"> *</span>}
      </label>
      {children}
    </div>
  );
}
