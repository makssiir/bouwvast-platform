import React, { useState } from "react";
import type { Page } from "../App";
import { ARTICLES, type Article } from "../data/articles";
import Icon from "../components/Icon";

export default function KennisbankPage({ navigate }: { navigate: (p: Page) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = [
    { id: "all", label: "Alle artikelen" },
    { id: "Kosten & Budget", label: "Kosten & Budget" },
    { id: "Renovatie Gids", label: "Renovatie Gidsen" },
    { id: "Afbouw & Stuc", label: "Afbouw & Stuc" },
    { id: "Regelgeving & Subsidie", label: "Regels & Btw" },
  ];

  const filtered = selectedCategory === "all" 
    ? ARTICLES 
    : ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <main>
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">Kennisbank</span>
          </div>
          <h1>Kennisbank & Verbouwingsgidsen</h1>
          <p className="lead-xl max-w-2xl">
            Praktische gidsen, actuele richtprijzen en vakkundig advies voor uw verbouwing of renovatie.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedCategory === c.id ? 'bg-[var(--brand)] text-white shadow-xs' : 'bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((article) => (
              <article
                key={article.slug}
                onClick={() => setActiveArticle(article)}
                className="card p-0 overflow-hidden cursor-pointer hover:border-[var(--brand)] hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[var(--brand)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {article.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-[rgba(15,23,42,0.85)] text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {article.readTime}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs text-[var(--muted)] block mb-2">{article.date}</span>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--brand)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="more font-bold text-sm">
                    Lees volledige gids &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-xs"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-6 md:p-10 border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--muted-bg)] text-gray-700 flex items-center justify-center border-0 cursor-pointer text-base hover:bg-gray-200"
            >
              ✕
            </button>

            <span className="eyebrow">{activeArticle.category} · {activeArticle.readTime}</span>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-6 mt-2 text-[var(--fg)]">
              {activeArticle.title}
            </h1>

            <div className="relative h-64 rounded-xl overflow-hidden mb-8">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-base text-[var(--muted)] leading-relaxed mb-8">
              {activeArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {activeArticle.tips && activeArticle.tips.length > 0 && (
              <div className="p-6 rounded-xl bg-[var(--brand-subtle)] border border-[var(--brand-tint)] mb-8">
                <h3 className="text-base font-bold text-[var(--brand-dark)] mb-3 flex items-center gap-2">
                  <Icon name="check" size={18} color="var(--brand)" /> Tips van de vakman
                </h3>
                <ul className="space-y-2 text-sm text-[var(--fg)] pl-5 list-disc">
                  {activeArticle.tips.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-[var(--border)]">
              <button
                onClick={() => setActiveArticle(null)}
                className="btn btn-white"
              >
                Sluiten
              </button>
              {activeArticle.relatedServiceSlug && (
                <button
                  onClick={() => {
                    const slug = activeArticle.relatedServiceSlug;
                    setActiveArticle(null);
                    if (slug) navigate({ type: "service", slug });
                  }}
                  className="btn btn-primary"
                >
                  Bekijk bijbehorende dienst &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
