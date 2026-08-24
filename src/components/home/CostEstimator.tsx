import React, { useState } from "react";
import Icon from "../Icon";
import { useLang } from "../../i18n/LangContext";

interface EstimatorOption {
  id: string;
  nameKey: string;
  defaultName: string;
  unit: string;
  defaultQty: number;
  minQty: number;
  maxQty: number;
  step: number;
  baseRateMin: number;
  baseRateMax: number;
  icon: string;
}

const SERVICES_DATA: EstimatorOption[] = [
  {
    id: "stucwerk",
    nameKey: "svc_finishing",
    defaultName: "Stuc- & Pleisterwerk",
    unit: "m²",
    defaultQty: 60,
    minQty: 15,
    maxQty: 250,
    step: 5,
    baseRateMin: 28,
    baseRateMax: 42,
    icon: "finishing",
  },
  {
    id: "schilderwerk",
    nameKey: "svc_painting",
    defaultName: "Schilderwerk Binnen",
    unit: "m²",
    defaultQty: 80,
    minQty: 20,
    maxQty: 300,
    step: 10,
    baseRateMin: 22,
    baseRateMax: 35,
    icon: "painting",
  },
  {
    id: "badkamer",
    nameKey: "svc_bathroom",
    defaultName: "Badkamer Renovatie",
    unit: "m²",
    defaultQty: 7,
    minQty: 3,
    maxQty: 25,
    step: 1,
    baseRateMin: 950,
    baseRateMax: 1600,
    icon: "bathroom",
  },
  {
    id: "renovatie",
    nameKey: "svc_renovation",
    defaultName: "Woningrenovatie",
    unit: "m²",
    defaultQty: 50,
    minQty: 20,
    maxQty: 200,
    step: 5,
    baseRateMin: 180,
    baseRateMax: 340,
    icon: "renovation",
  },
];

export default function CostEstimator({
  onSelectCalculation,
}: {
  onSelectCalculation?: (details: string) => void;
}) {
  const { t } = useLang();
  const [selectedService, setSelectedService] = useState<EstimatorOption>(SERVICES_DATA[0]);
  const [qty, setQty] = useState(SERVICES_DATA[0].defaultQty);
  const [tier, setTier] = useState<"standard" | "premium" | "luxury">("premium");
  const [includeDemo, setIncludeDemo] = useState(false);
  const [includeMaterials, setIncludeMaterials] = useState(true);

  const handleServiceChange = (s: EstimatorOption) => {
    setSelectedService(s);
    setQty(s.defaultQty);
  };

  const tierMultiplier = tier === "standard" ? 0.88 : tier === "premium" ? 1.0 : 1.25;
  const demoMultiplier = includeDemo ? 1.15 : 1.0;
  const materialsMultiplier = includeMaterials ? 1.18 : 1.0;

  const rawMin = Math.round(selectedService.baseRateMin * qty * tierMultiplier * demoMultiplier * (includeMaterials ? 1.15 : 1.0));
  const rawMax = Math.round(selectedService.baseRateMax * qty * tierMultiplier * demoMultiplier * materialsMultiplier);

  // Round to nearest 50
  const totalMin = Math.round(rawMin / 50) * 50;
  const totalMax = Math.round(rawMax / 50) * 50;

  const handleApply = () => {
    const serviceName = t(selectedService.nameKey as any) || selectedService.defaultName;
    const calculationSummary = `${serviceName} (${qty} ${selectedService.unit}) - ${tier.toUpperCase()}: €${totalMin.toLocaleString()} - €${totalMax.toLocaleString()}`;
    
    if (onSelectCalculation) {
      onSelectCalculation(calculationSummary);
    }

    const quoteEl = document.getElementById("quote");
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" });
      const descInput = document.getElementById("quote-description") as HTMLTextAreaElement;
      if (descInput) {
        descInput.value = `${t("est_title")}:\n${calculationSummary}`;
      }
    }
  };

  return (
    <section className="section bg-[var(--muted-bg)] border-y border-[var(--border)]" id="calculator">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">{t("est_eyebrow")}</span>
          <h2>{t("est_title")}</h2>
          <p className="lead">{t("est_sub")}</p>
        </div>

        <div className="max-w-4xl mx-auto card p-6 md:p-10 shadow-lg border-2 border-[var(--brand)] bg-white">
          {/* Step 1: Select Service */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
              {t("est_step_1")}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SERVICES_DATA.map((s) => {
                const isActive = selectedService.id === s.id;
                const displayName = t(s.nameKey as any) || s.defaultName;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleServiceChange(s)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${isActive ? 'border-[var(--brand)] bg-[var(--brand-subtle)] text-[var(--brand-dark)] shadow-xs' : 'border-[var(--border)] bg-white text-[var(--fg)] hover:border-[var(--brand)]'}`}
                  >
                    <Icon name={s.icon} size={22} color={isActive ? "var(--brand)" : "var(--muted)"} />
                    <span className="text-xs font-bold leading-tight">{displayName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Sliders & Quantity */}
          <div className="mb-8 bg-[var(--muted-bg)] p-5 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-[var(--fg)]">
                {t("est_step_2")} ({selectedService.unit})
              </label>
              <span className="text-xl font-extrabold text-[var(--brand)] bg-white px-3 py-1 rounded-lg border border-[var(--border)]">
                {qty} {selectedService.unit}
              </span>
            </div>
            <input
              type="range"
              min={selectedService.minQty}
              max={selectedService.maxQty}
              step={selectedService.step}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              aria-label={t("est_step_2")}
              aria-valuemin={selectedService.minQty}
              aria-valuemax={selectedService.maxQty}
              aria-valuenow={qty}
              className="w-full accent-[var(--brand)] h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[var(--muted)] mt-1.5 font-medium">
              <span>{selectedService.minQty} {selectedService.unit}</span>
              <span>{Math.round((selectedService.minQty + selectedService.maxQty) / 2)} {selectedService.unit}</span>
              <span>{selectedService.maxQty} {selectedService.unit}</span>
            </div>
          </div>

          {/* Step 3: Material Quality Tier */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
              {t("est_step_3")}
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "standard", name: t("est_tier_std"), desc: t("est_tier_std_desc") },
                { id: "premium", name: t("est_tier_prem"), desc: t("est_tier_prem_desc") },
                { id: "luxury", name: t("est_tier_lux"), desc: t("est_tier_lux_desc") },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTier(item.id as any)}
                  aria-pressed={tier === item.id}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${tier === item.id ? 'border-[var(--brand)] bg-[var(--brand-subtle)] ring-1 ring-[var(--brand)]' : 'border-[var(--border)] bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[var(--fg)]">{item.name}</span>
                    {tier === item.id && <span className="text-[var(--brand)] text-xs font-bold">✓</span>}
                  </div>
                  <span className="text-[11px] text-[var(--muted)] block leading-tight">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Options: Demolition & Materials */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8 pt-4 border-t border-[var(--border)]">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white cursor-pointer hover:bg-gray-50 text-xs">
              <input
                type="checkbox"
                checked={includeDemo}
                onChange={(e) => setIncludeDemo(e.target.checked)}
                className="w-4 h-4 accent-[var(--brand)] rounded"
              />
              <span className="font-semibold text-[var(--fg)]">{t("est_opt_demo")}</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white cursor-pointer hover:bg-gray-50 text-xs">
              <input
                type="checkbox"
                checked={includeMaterials}
                onChange={(e) => setIncludeMaterials(e.target.checked)}
                className="w-4 h-4 accent-[var(--brand)] rounded"
              />
              <span className="font-semibold text-[var(--fg)]">{t("est_opt_mat")}</span>
            </label>
          </div>

          {/* Result Price Band */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#4ade80] font-bold block mb-1">
                {t("est_est_price")}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
                <span>€{totalMin.toLocaleString()}</span>
                <span className="text-gray-400 font-light text-2xl">—</span>
                <span>€{totalMax.toLocaleString()}</span>
              </div>
              <span className="text-[11px] text-gray-400 block mt-1.5">
                {t("est_disclaimer")}
              </span>
            </div>

            <button
              onClick={handleApply}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 border-0"
            >
              <Icon name="check" size={18} />
              {t("est_apply_btn")} &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
