import React, { useState, useRef } from "react";
import Icon from "../Icon";

const COMPARISONS = [
  {
    id: "kitchen",
    title: "Complete Keukenrenovatie",
    location: "Amersfoort Vathorst",
    beforeImg: "/images/kitchen-before.jpg",
    afterImg: "/images/kitchen-after.jpg",
    desc: "Van gestripte leidingen en kaal metselwerk naar een moderne luxe keuken met mat-antraciet kasten, inductie en visgraatvloer.",
  },
  {
    id: "renovation",
    title: "Woningrenovatie & Stucwerk",
    location: "Leusden",
    beforeImg: "/images/living-before.jpg",
    afterImg: "/images/living-after.jpg",
    desc: "Complete aanpak van ruwe wanden, elektra-inbouw, spiegelglad stucwerk en eikenhouten visgraatvloer.",
  },
  {
    id: "bathroom",
    title: "Badkamer & Sanitair Renovatie",
    location: "Utrecht Oost",
    beforeImg: "/images/bath-before.jpg",
    afterImg: "/images/bath-after.jpg",
    desc: "Van gedateerd tegel- en sloopwerk naar een moderne inloopdouche met grootformaat betonlook tegels en eiken meubel.",
  },
];

export default function BeforeAfter() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const current = COMPARISONS[activeIdx];

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section className="section" id="voor-na">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">Het verschil</span>
          <h2>Voor & Na: Echte transformaties</h2>
          <p className="lead">
            Sleep met de balk om het verschil vóór en na onze werkzaamheden te bekijken.
          </p>

          {/* Selector pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-4">
            {COMPARISONS.map((comp, idx) => (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setPos(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeIdx === idx ? 'bg-[var(--brand)] text-white shadow-md' : 'bg-white border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--brand)]'}`}
              >
                {comp.title}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl select-none touch-none aspect-video md:aspect-[16/9] cursor-ew-resize bg-black"
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging.current) setFromClientX(e.clientX);
            }}
            onPointerUp={() => {
              dragging.current = false;
            }}
            role="slider"
            aria-label="Voor en na schuifregelaar"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
            }}
          >
            {/* After (Base Layer) */}
            <img
              src={current.afterImg}
              alt="Na renovatie"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <span className="absolute top-4 right-4 z-10 px-3.5 py-1 rounded-full text-xs font-bold text-white bg-[var(--brand)] shadow-lg">
              Ná oplevering
            </span>

            {/* Before (Clipped Layer) */}
            <img
              src={current.beforeImg}
              alt="Vóór renovatie"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: `inset(0 ${100 - pos}% 0 0)`,
                filter: "brightness(0.96)",
              }}
              draggable={false}
            />
            <span
              className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full text-xs font-bold text-white bg-[rgba(15,23,42,0.85)] backdrop-blur-xs shadow-lg transition-opacity"
              style={{ opacity: pos > 15 ? 1 : 0 }}
            >
              Vóór aanvang
            </span>

            {/* Divider Line & Glow Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-full w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[var(--brand)] flex items-center justify-center shadow-2xl border-2 border-[var(--brand)]">
                <Icon name="swap" size={20} color="var(--brand)" strokeWidth={2.4} />
              </div>
            </div>

            {/* Helper label */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[rgba(15,23,42,0.8)] backdrop-blur-xs shadow-md pointer-events-none">
              ◀ Sleep om te vergelijken ▶
            </span>
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-lg font-bold text-[var(--fg)] m-0">{current.title} — {current.location}</h3>
            <p className="text-sm text-[var(--muted)] mt-1.5 max-w-xl mx-auto">{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
