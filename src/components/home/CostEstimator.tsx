import React, { useState } from "react";
import Icon from "../Icon";

interface EstimatorOption {
  id: string;
  name: string;
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
    name: "Stuc- & Pleisterwerk",
    unit: "m² wand / plafond",
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
    name: "Schilderwerk Binnen",
    unit: "m² oppervlakte",
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
    name: "Badkamer Renovatie",
    unit: "m² vloeroppervlakte",
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
    name: "Woningrenovatie",
    unit: "m² woonoppervlak",
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
    const calculationSummary = `${selectedService.name} (${qty} ${selectedService.unit}) - Niveau: ${tier.toUpperCase()}, Inclusief materialen: ${includeMaterials ? 'Ja' : 'Nee'}, Sloopwerk: ${includeDemo ? 'Ja' : 'Nee'}. Geschatte richtprijs: €${totalMin.toLocaleString()} - €${totalMax.toLocaleString()}`;
    
    if (onSelectCalculation) {
      onSelectCalculation(calculationSummary);
    }

    const quoteEl = document.getElementById("quote");
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" });
      const descInput = document.getElementById("quote-description") as HTMLTextAreaElement;
      if (descInput) {
        descInput.value = `Ik heb de online calculator gebruikt voor een berekening:\n${calculationSummary}\n\nGraag ontvang ik een definitieve offerte.`;
      }
    }
  };

  return (
    <section className="section bg-[var(--muted-bg)] border-y border-[var(--border)]" id="calculator">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">Direct inzicht</span>
          <h2>Bereken direct uw richtprijs</h2>
          <p className="lead">
            Selecteer uw type werkzaamheden en oppervlakte voor een realtime indicatie van de kosten.
          </p>
        </div>

        <div className="max-w-4xl mx-auto card p-6 md:p-10 shadow-lg border-2 border-[var(--brand)] bg-white">
          {/* Step 1: Select Service */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
              1. Kies het type werkzaamheden
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SERVICES_DATA.map((s) => {
                const isActive = selectedService.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleServiceChange(s)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${isActive ? 'border-[var(--brand)] bg-[var(--brand-subtle)] text-[var(--brand-dark)] shadow-xs' : 'border-[var(--border)] bg-white text-[var(--fg)] hover:border-[var(--brand)]'}`}
                  >
                    <Icon name={s.icon} size={22} color={isActive ? "var(--brand)" : "var(--muted)"} />
                    <span className="text-xs font-bold leading-tight">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Sliders & Quantity */}
          <div className="mb-8 bg-[var(--muted-bg)] p-5 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-[var(--fg)]">
                2. Geschatte omvang ({selectedService.unit})
              </label>
              <span className="text-xl font-extrabold text-[var(--brand)] bg-white px-3 py-1 rounded-lg border border-[var(--border)]">
                {qty} {selectedService.unit.split(" ")[0]}
              </span>
            </div>
            <input
              type="range"
              min={selectedService.minQty}
              max={selectedService.maxQty}
              step={selectedService.step}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
            />
            <div className="flex justify-between text-xs text-[var(--muted)] mt-2">
              <span>Min. {selectedService.minQty} {selectedService.unit.split(" ")[0]}</span>
              <span>Gemiddeld {selectedService.defaultQty}</span>
              <span>Max. {selectedService.maxQty} {selectedService.unit.split(" ")[0]}</span>
            </div>
          </div>

          {/* Step 3: Tier & Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">
                3. Afwerkingsniveau
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "standard", label: "Standaard" },
                  { id: "premium", label: "Hoogwaardig" },
                  { id: "luxury", label: "Turn-key Luxe" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id as any)}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${tier === t.id ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'bg-white border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">
                4. Extra opties
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs font-medium text-[var(--fg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMaterials}
                    onChange={(e) => setIncludeMaterials(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--brand)]"
                  />
                  Inclusief A-merk materialen & levering
                </label>
                <label className="flex items-center gap-2.5 text-xs font-medium text-[var(--fg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDemo}
                    onChange={(e) => setIncludeDemo(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--brand)]"
                  />
                  Inclusief slopen en puinafvoer
                </label>
              </div>
            </div>
          </div>

          {/* Calculation Output Box */}
          <div className="rounded-2xl p-6 bg-[linear-gradient(135deg,#14532d,#15803d)] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#86efac] font-bold">
                Geschatte richtprijs (incl. btw)
              </span>
              <div className="text-3xl md:text-4xl font-extrabold mt-1 tracking-tight">
                € {totalMin.toLocaleString("nl-NL")} – € {totalMax.toLocaleString("nl-NL")}
              </div>
              <p className="text-xs text-[#dcfce7] m-0 mt-1">
                * Indicatieve bandbreedte. Definitieve prijs volgt na vrijblijvende opname.
              </p>
            </div>

            <button
              onClick={handleApply}
              className="btn btn-white btn-lg shrink-0 font-extrabold text-[var(--brand-dark)] shadow-lg hover:scale-105"
            >
              Vraag offerte aan met deze berekening &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
