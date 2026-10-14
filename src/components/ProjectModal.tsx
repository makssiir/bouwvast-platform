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
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-[var(--border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[rgba(15,23,42,0.7)] text-white flex items-center justify-center hover:bg-[var(--brand)] transition-colors border-0 cursor-pointer"
          aria-label={closeLabel}
        >
          <Icon name="close" size={20} />
        </button>

        <div className="relative w-full overflow-hidden bg-gray-900">
          <img
            src={project.image}
            alt={pick(project.imageAlt)}
            width={project.imageWidth}
            height={project.imageHeight}
            className="w-full h-72 md:h-96 object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[var(--brand)] shadow-md">
              {pick(project.category)}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[rgba(15,23,42,0.85)] shadow-md">
              {project.city}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 id="project-modal-title" className="text-2xl font-bold mb-3 text-[var(--fg)]">
            {pick(project.title)}
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
            {pick(project.description)}
          </p>

          {(project.duration || project.materials) && (
            <dl className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--muted-bg)] border border-[var(--border)] mb-6 text-xs text-[var(--fg)]">
              {project.duration && (
                <div>
                  <dt className="text-[var(--muted)] mb-0.5">
                    {pick({ nl: "Doorlooptijd", en: "Duration", uk: "Тривалість", ru: "Длительность" })}
                  </dt>
                  <dd className="font-bold m-0">{pick(project.duration)}</dd>
                </div>
              )}
              {project.materials && (
                <div>
                  <dt className="text-[var(--muted)] mb-0.5">
                    {pick({ nl: "Materialen", en: "Materials", uk: "Матеріали", ru: "Материалы" })}
                  </dt>
                  <dd className="font-bold m-0">{pick(project.materials)}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={onClose} className="btn btn-white">
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
              <Icon name="check" size={18} />
              {pick({
                nl: "Vraag een vergelijkbare offerte aan",
                en: "Request a similar quote",
                uk: "Замовити схожу пропозицію",
                ru: "Запросить похожее предложение",
              })}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
