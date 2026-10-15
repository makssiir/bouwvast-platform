import { useEffect, useId, useRef, useState } from "react"
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react"
import Icon from "../Icon"
import PageLink from "../PageLink"
import More from "../More"
import { useLang } from "../../i18n/LangContext"
import { claim } from "../../data/claims"
import { PROJECTS } from "../../data/projects"
import { IMPRESSIONS } from "../../data/impressions"
import type { Comparison } from "../../data/impressions"
import { imageSize } from "../../data/images"
import type { Page } from "../../lib/routes"
import { scrollToQuote, useQuoteDraft } from "../../lib/quoteDraft"
import { track } from "../../lib/analytics"

/** Real projects with a before photo win; otherwise the labelled impressions. */
function comparisons(): Comparison[] {
  if (!claim("projects")) return IMPRESSIONS
  const real = PROJECTS.filter((p) => p.beforeImage).map<Comparison>((p) => {
    const size = imageSize(p.image)
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      scope: { nl: [] },
      before: p.beforeImage!,
      after: p.image,
      beforeAlt: p.beforeImageAlt ?? p.imageAlt,
      afterAlt: p.imageAlt,
      width: size.width ?? p.imageWidth,
      height: size.height ?? p.imageHeight,
      serviceSlug: p.serviceSlug,
      city: p.city,
      impression: false,
    }
  })
  return real.length > 0 ? real : IMPRESSIONS
}

const clamp = (n: number) => Math.min(100, Math.max(0, n))

/**
 * "Voor & na" comparison slider: drag anywhere on the photo, or focus the
 * handle and use the arrow keys. Vertical swipes still scroll the page.
 */
export default function BeforeAfter({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const { suggest } = useQuoteDraft()
  const uid = useId().replace(/:/g, "")
  const items = comparisons()
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const [touched, setTouched] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const interacted = useRef(false)
  const current = items[active] ?? items[0]

  const touch = () => {
    interacted.current = true
    setTouched(true)
  }

  // One gentle sweep the first time the slider comes into view, so it is
  // obvious that it moves. Skipped for reduced motion or once touched.
  useEffect(() => {
    const el = frame.current
    if (!el || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(() => {
          const start = performance.now()
          const tick = (now: number) => {
            if (interacted.current) return
            const p = Math.min(1, (now - start) / 1800)
            setPos(50 - 16 * Math.sin(p * 2 * Math.PI) * (1 - p * 0.35))
            if (p < 1) raf = requestAnimationFrame(tick)
            else setPos(50)
          }
          raf = requestAnimationFrame(tick)
        }, 350)
      },
      { threshold: 0.55 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [])

  const setFromClientX = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    touch()
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5
    const next: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      PageDown: pos - 10,
      PageUp: pos + 10,
      Home: 0,
      End: 100,
    }
    if (!(e.key in next)) return
    e.preventDefault()
    touch()
    setPos(clamp(next[e.key]))
  }

  const rounded = Math.round(pos)

  const requestSimilar = () => {
    // An inspiration image is not evidence of the visitor's budget, place
    // or exact wishes. Only pass the service they deliberately selected.
    suggest({ service: current.serviceSlug })
    track("project_inspiration_selected", { service: current.serviceSlug, example: current.id })
    if (!scrollToQuote()) navigate("contact")
  }

  return (
    <section className="section" id="voor-na" aria-labelledby={`${uid}-title`}>
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("ba_label")}</p>
            <h2 id={`${uid}-title`}>{t("ba_title")}</h2>
            <p>{t("ba_sub")}</p>
          </div>
        </div>

        {items.length > 1 && (
          <div className="chip-row ba-tabs" role="group" aria-label={t("ba_choose")}>
            {items.map((item, idx) => (
              <button
                type="button"
                key={item.id}
                className="chip"
                aria-pressed={idx === active}
                onClick={() => {
                  touch()
                  setActive(idx)
                  setPos(50)
                }}
              >
                {pick(item.title)}
              </button>
            ))}
          </div>
        )}

        <div className="ba-layout">
          <div>
            <div
              ref={frame}
              className={`ba-frame${touched ? " is-touched" : ""}`}
              style={
                {
                  "--pos": `${pos}%`,
                  "--ratio": `${current.width} / ${current.height}`,
                } as CSSProperties
              }
              onPointerDown={onPointerDown}
              onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
              onLostPointerCapture={() => (dragging.current = false)}
            >
              <img
                key={`${current.id}-after`}
                src={current.after}
                alt={pick(current.afterAlt)}
                width={current.width}
                height={current.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="ba-img"
              />
              <img
                key={`${current.id}-before`}
                src={current.before}
                alt={pick(current.beforeAlt)}
                width={current.width}
                height={current.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="ba-img ba-img--before"
              />
              <span className="ba-tag ba-tag--before" aria-hidden="true" style={{ opacity: pos > 14 ? 1 : 0 }}>
                {t("ba_before")}
              </span>
              <span className="ba-tag ba-tag--after" aria-hidden="true" style={{ opacity: pos < 86 ? 1 : 0 }}>
                {t("ba_after")}
              </span>
              {current.impression && (
                <span className="ba-impression" aria-hidden="true">
                  {t("ba_impression")}
                </span>
              )}
              <div className="ba-divider" aria-hidden="true" />
              <div
                role="slider"
                tabIndex={0}
                className="ba-handle"
                aria-label={t("ba_slider")}
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={rounded}
                aria-valuetext={t("ba_value", {
                  before: String(rounded),
                  after: String(100 - rounded),
                })}
                aria-describedby={current.impression ? `${uid}-note` : undefined}
                onKeyDown={onKeyDown}
              >
                <Icon name="arrows-h" size={20} strokeWidth={2.2} />
              </div>
              <span className="ba-hint" aria-hidden="true">
                {t("ba_hint")}
              </span>
            </div>
            <div className="ba-controls" role="group" aria-label={t("ba_view")}>
              {([
                { value: 100, label: "ba_before" },
                { value: 50, label: "ba_compare" },
                { value: 0, label: "ba_after" },
              ] as const).map((control) => (
                <button
                  key={control.value}
                  type="button"
                  aria-pressed={Math.abs(pos - control.value) < 0.5}
                  onClick={() => {
                    touch()
                    setPos(control.value)
                  }}
                >
                  {t(control.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="ba-info">
            <div className="article-meta">
              <span className="tag">{current.impression ? t("ba_impression") : current.city}</span>
            </div>
            <h3>{pick(current.title)}</h3>
            <p>{pick(current.description)}</p>
            {pick(current.scope).length > 0 && (
              <>
                <p className="ba-scope-label">{t("ba_scope")}</p>
                <ul className="check-list check-list--stacked">
                  {pick(current.scope).map((item) => (
                    <li key={item}>
                      <span className="check-dot" aria-hidden="true">
                        <Icon name="check" size={13} strokeWidth={2.6} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="ba-project-cta">
              <p>{t("ba_project_prompt")}</p>
              <button type="button" className="btn btn-primary" onClick={requestSimilar}>
                {t("ba_project_cta")}
                <span className="btn-arrow" aria-hidden="true"><Icon name="arrow-right" size={17} /></span>
              </button>
            </div>
            <PageLink to={{ type: "service", slug: current.serviceSlug }} navigate={navigate} className="ba-link">
              <More>{t("ba_service_link")}</More>
            </PageLink>
            {current.impression && <p id={`${uid}-note`} className="fine-print">{t("ba_impression_note")}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
