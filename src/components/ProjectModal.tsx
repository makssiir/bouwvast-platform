import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"
import { useDialog } from "../lib/useDialog"
import type { Project } from "../data/projects"

export default function ProjectModal({
  project,
  onClose,
  onRequestQuote,
}: {
  project: Project | null
  onClose: () => void
  onRequestQuote: (serviceSlug: string) => void
}) {
  const { pick } = useLang()
  const dialogRef = useDialog<HTMLDivElement>(Boolean(project), onClose)

  if (!project) return null

  const closeLabel = pick({ nl: "Sluiten", en: "Close", uk: "Закрити", ru: "Закрыть" })

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-night/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[20px] border border-line bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-night/70 text-white flex items-center justify-center hover:bg-pine-700 transition-colors border-0 cursor-pointer"
          aria-label={closeLabel}
        >
          <Icon name="close" size={20} />
        </button>

        <div className="relative w-full overflow-hidden bg-night">
          <img
            src={project.image}
            alt={pick(project.imageAlt)}
            width={project.imageWidth}
            height={project.imageHeight}
            className="w-full h-72 md:h-96 object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-full bg-pine-700 px-3 py-1 text-xs font-semibold text-white shadow-md">
              {pick(project.category)}
            </span>
            <span className="rounded-full bg-night/85 px-3 py-1 text-xs font-semibold text-white shadow-md">
              {project.city}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 id="project-modal-title" className="mb-3 text-2xl text-ink">
            {pick(project.title)}
          </h2>
          <p className="mb-6 text-muted">
            {pick(project.description)}
          </p>

          {(project.duration || project.materials) && (
            <dl className="mb-6 grid gap-4 rounded-xl border border-line bg-sand-50 p-4 text-sm text-ink sm:grid-cols-2">
              {project.duration && (
                <div>
                  <dt className="mb-0.5 text-subtle">
                    {pick({ nl: "Doorlooptijd", en: "Duration", uk: "Тривалість", ru: "Длительность" })}
                  </dt>
                  <dd className="m-0 font-semibold">{pick(project.duration)}</dd>
                </div>
              )}
              {project.materials && (
                <div>
                  <dt className="mb-0.5 text-subtle">
                    {pick({ nl: "Materialen", en: "Materials", uk: "Матеріали", ru: "Материалы" })}
                  </dt>
                  <dd className="m-0 font-semibold">{pick(project.materials)}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={onClose} className="btn btn-outline">
              {closeLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                onRequestQuote(project.serviceSlug)
              }}
              className="btn btn-primary"
            >
              {pick({
                nl: "Vraag een vergelijkbare offerte aan",
                en: "Request a similar quote",
                uk: "Замовити схожу пропозицію",
                ru: "Запросить похожее предложение",
              })}
              <span className="btn-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
