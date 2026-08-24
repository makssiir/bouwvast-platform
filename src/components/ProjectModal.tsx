import React, { useEffect } from "react";
import Icon from "./Icon";

export interface ProjectDetail {
  title: string;
  category: string;
  city: string;
  image: string;
  desc: string;
  duration?: string;
  materials?: string;
  serviceSlug: string;
}

export default function ProjectModal({
  project,
  onClose,
  onRequestQuote,
}: {
  project: ProjectDetail | null;
  onClose: () => void;
  onRequestQuote: (serviceSlug: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-xs animate-[fade-in_0.2s_ease-out]" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-[var(--border)] animate-[scale-up_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[rgba(15,23,42,0.7)] text-white flex items-center justify-center hover:bg-[var(--brand)] transition-colors border-0 cursor-pointer"
          aria-label="Sluiten"
        >
          <Icon name="close" size={20} />
        </button>

        {/* Image */}
        <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[var(--brand)] shadow-md">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[rgba(15,23,42,0.85)] shadow-md">
              📍 {project.city}
            </span>
          </div>
        </div>

        {/* Body details */}
        <div className="p-6 md:p-8">
          <h2 id="project-modal-title" className="text-2xl font-bold mb-3 text-[var(--fg)]">{project.title}</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
            {project.desc}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--muted-bg)] border border-[var(--border)] mb-6 text-xs text-[var(--fg)]">
            <div>
              <span className="text-[var(--muted)] block mb-0.5">Doorlooptijd:</span>
              <span className="font-bold">{project.duration || "2 tot 3 weken"}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block mb-0.5">Toegepaste materialen:</span>
              <span className="font-bold">{project.materials || "A-merk bouwmaterialen & garantie"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="btn btn-white"
            >
              Sluiten
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(project.serviceSlug);
              }}
              className="btn btn-primary"
            >
              <Icon name="check" size={18} />
              Vraag vergelijkbare offerte aan &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
