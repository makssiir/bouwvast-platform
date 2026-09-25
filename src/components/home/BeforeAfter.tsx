import React, { useState, useRef } from "react"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"

export default function BeforeAfter() {
  const { t, lang } = useLang()
  const [activeIdx, setActiveIdx] = useState(0)
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const comparisonsByLang: Record<
    string,
    { id: string; title: string; location: string; beforeImg: string; afterImg: string; desc: string }[]
  > = {
    uk: [
      {
        id: "kitchen",
        title: "Комплексний ремонт кухні",
        location: "Амерсфорт Ватгорст",
        beforeImg: "/images/kitchen-before.jpg",
        afterImg: "/images/kitchen-after.jpg",
        desc: "Від старих дубових шаф до сучасної преміум-кухні з матовими антрацитовими фасадами, індукцією та паркетом ялинкою.",
      },
      {
        id: "renovation",
        title: "Ремонт житла та штукатурка",
        location: "Леусден",
        beforeImg: "/images/living-before.jpg",
        afterImg: "/images/living-after.jpg",
        desc: "Повна переробка необроблених стін, дзеркально-гладка штукатурка під фарбування та дубова паркетна підлога.",
      },
      {
        id: "bathroom",
        title: "Ремонт ванної кімнати та сантехніки",
        location: "Утрехт Схід",
        beforeImg: "/images/bath-before.jpg",
        afterImg: "/images/bath-after.jpg",
        desc: "Від старої плитки до сучасної безбар'єрної душової зони з великоформатною керамікою під бетон та меблями з масиву дуба.",
      },
    ],
    en: [
      {
        id: "kitchen",
        title: "Complete Kitchen Remodel",
        location: "Amersfoort Vathorst",
        beforeImg: "/images/kitchen-before.jpg",
        afterImg: "/images/kitchen-after.jpg",
        desc: "From outdated oak cabinets to a modern luxury kitchen with matte anthracite cabinetry, induction, and herringbone flooring.",
      },
      {
        id: "renovation",
        title: "Home Renovation & Plastering",
        location: "Leusden",
        beforeImg: "/images/living-before.jpg",
        afterImg: "/images/living-after.jpg",
        desc: "Complete overhaul of raw walls, mirror-smooth plastering, and oak herringbone flooring throughout.",
      },
      {
        id: "bathroom",
        title: "Bathroom & Sanitary Renovation",
        location: "Utrecht East",
        beforeImg: "/images/bath-before.jpg",
        afterImg: "/images/bath-after.jpg",
        desc: "From dated tiling to a modern walk-in shower with large-format concrete-look tiles and an oak vanity.",
      },
    ],
    ru: [
      {
        id: "kitchen",
        title: "Комплексный ремонт кухни",
        location: "Амерсфорт Ватхорст",
        beforeImg: "/images/kitchen-before.jpg",
        afterImg: "/images/kitchen-after.jpg",
        desc: "От устаревших дубовых шкафов к современной кухне с матовыми антрацитовыми фасадами, индукцией и паркетом елочкой.",
      },
      {
        id: "renovation",
        title: "Ремонт дома и штукатурка",
        location: "Леусден",
        beforeImg: "/images/living-before.jpg",
        afterImg: "/images/living-after.jpg",
        desc: "Полная отделка сырых стен, зеркально гладкая штукатурка под покраску и дубовый паркет.",
      },
      {
        id: "bathroom",
        title: "Ремонт ванной комнаты и сантехники",
        location: "Утрехт Восток",
        beforeImg: "/images/bath-before.jpg",
        afterImg: "/images/bath-after.jpg",
        desc: "От старой плитки к современной душевой зоне с крупноформатной плиткой под бетон и дубовой мебелью.",
      },
    ],
    nl: [
      {
        id: "kitchen",
        title: "Complete Keukenrenovatie",
        location: "Amersfoort Vathorst",
        beforeImg: "/images/kitchen-before.jpg",
        afterImg: "/images/kitchen-after.jpg",
        desc: "Van gedateerde eikenhouten kasten naar een moderne luxe keuken met mat-antraciet kasten, inductie en visgraatvloer.",
      },
      {
        id: "renovation",
        title: "Woningrenovatie & Stucwerk",
        location: "Leusden",
        beforeImg: "/images/living-before.jpg",
        afterImg: "/images/living-after.jpg",
        desc: "Complete aanpak van ruwe wanden, strak sausklaar stucwerk en eikenhouten visgraatvloer.",
      },
      {
        id: "bathroom",
        title: "Badkamer & Sanitair Renovatie",
        location: "Utrecht Oost",
        beforeImg: "/images/bath-before.jpg",
        afterImg: "/images/bath-after.jpg",
        desc: "Van gedateerd tegelwerk naar een moderne inloopdouche met grootformaat betonlook tegels en eiken meubel.",
      },
    ],
  }

  const comparisons = comparisonsByLang[lang] ?? comparisonsByLang.uk
  const current = comparisons[activeIdx] ?? comparisons[0]

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }

  return (
    <section className="section" id="voor-na">
      <div className="container">
        <div className="center mb-10">
          <span className="eyebrow">{t("ba_label")}</span>
          <h2>{t("ba_title")}</h2>
          <p className="lead">{t("ba_sub")}</p>

          {/* Selector pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-4">
            {comparisons.map((comp, idx) => (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveIdx(idx)
                  setPos(50)
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeIdx === idx
                    ? "bg-[var(--brand)] text-white shadow-md"
                    : "bg-white border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--brand)]"
                }`}
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
              dragging.current = true
              ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
              setFromClientX(e.clientX)
            }}
            onPointerMove={(e) => {
              if (dragging.current) setFromClientX(e.clientX)
            }}
            onPointerUp={() => {
              dragging.current = false
            }}
            role="slider"
            aria-label={t("ba_hint")}
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5))
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5))
            }}
          >
            {/* After (Base Layer) */}
            <img
              src={current.afterImg}
              alt={t("ba_after")}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <span className="absolute top-4 right-4 z-10 px-3.5 py-1 rounded-full text-xs font-bold text-white bg-[var(--brand)] shadow-lg">
              {t("ba_after")}
            </span>

            {/* Before (Clipped Layer) */}
            <img
              src={current.beforeImg}
              alt={t("ba_before")}
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
              {t("ba_before")}
            </span>

            {/* Divider Line & Glow Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-full w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[var(--brand)] flex items-center justify-center shadow-2xl border-2 border-[var(--brand)]">
                <Icon
                  name="swap"
                  size={20}
                  color="var(--brand)"
                  strokeWidth={2.4}
                />
              </div>
            </div>

            {/* Helper label */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[rgba(15,23,42,0.8)] backdrop-blur-xs shadow-md pointer-events-none">
              ◀ {t("ba_hint")} ▶
            </span>
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-lg font-bold text-[var(--fg)] m-0">
              {current.title} — {current.location}
            </h3>
            <p className="text-sm text-[var(--muted)] mt-1.5 max-w-xl mx-auto">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
