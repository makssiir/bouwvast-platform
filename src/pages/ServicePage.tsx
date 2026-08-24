import type { Page } from "../App";
import { SERVICE_BY_SLUG, SERVICES } from "../data/services";
import { CITIES } from "../data/cities";
import Icon from "../components/Icon";
import QuoteForm from "../components/QuoteForm";
import { useLang } from "../i18n/LangContext";

export default function ServicePage({ slug, navigate }: { slug: string; navigate: (p: Page) => void }) {
  const { t } = useLang();
  const service = SERVICE_BY_SLUG[slug];

  if (!service) {
    navigate("diensten");
    return null;
  }

  const steps = [
    { num: "01", title: t("how_1_title"), desc: t("how_1_desc") },
    { num: "02", title: t("how_2_title"), desc: t("how_2_desc") },
    { num: "03", title: t("how_3_title"), desc: t("how_3_desc") },
  ];
  const coreCities = CITIES.slice(0, 10);
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main>
      {/* Service Hero */}
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <button onClick={() => navigate("diensten")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Diensten</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">{t(service.nameKey)}</span>
          </div>
          <h1>{t(service.nameKey)} in regio Amersfoort</h1>
          <p className="lead-xl max-w-2xl">{service.intro}</p>
        </div>
      </section>

      {/* Content + sticky form */}
      <div className="container section">
        <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
          <div className="space-y-12">
            
            {/* What's included */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">Wat valt hieronder</span>
              <h2 className="text-2xl font-bold mb-6">Werkzaamheden die wij verzorgen</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--muted-bg)] border border-[var(--border)]">
                    <span className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)] font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-[var(--fg)]">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">Aanpak</span>
              <h2 className="text-2xl font-bold mb-6">Hoe wij te werk gaan</h2>
              <div className="grid gap-6">
                {steps.map((s, i) => (
                  <div key={s.num} className="flex gap-4 items-start">
                    <span className="step-no shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="text-base font-bold mb-1">{s.title}</h3>
                      <p className="text-sm text-[var(--muted)] m-0">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Service × City — internal linking */}
            <section className="card p-6 md:p-8">
              <span className="eyebrow">Werkgebied</span>
              <h2 className="text-2xl font-bold mb-3">{t(service.nameKey)} in uw regio</h2>
              <p className="text-sm text-[var(--muted)] mb-6">
                Wij zijn actief in Amersfoort en omliggende plaatsen. Bekijk wat we in uw woonplaats voor u kunnen verzorgen.
              </p>
              <div className="flex flex-wrap gap-2">
                {coreCities.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => navigate({ type: "city", city: c.name, serviceSlug: service.slug })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-white text-xs font-semibold text-[var(--fg)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all cursor-pointer"
                  >
                    <Icon name="pin" size={13} color="var(--brand)" />
                    {t(service.nameKey)} in {c.name}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky quote form */}
          <div>
            <div className="sticky top-24 card p-6 md:p-7 shadow-lg border-2 border-[var(--brand)]">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="check" size={18} color="var(--brand)" />
                <h3 className="text-lg font-bold m-0">Vrijblijvende offerte</h3>
              </div>
              <p className="text-xs text-[var(--muted)] mb-5">
                Vraag direct een prijsindicatie aan voor {t(service.nameKey).toLowerCase()}.
              </p>
              <QuoteForm compact sourcePage={`service:${service.slug}`} presetService={service.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Related services */}
      <section className="section section--muted">
        <div className="container">
          <span className="eyebrow">Verder kijken</span>
          <h2>Andere diensten van Bouwvast</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {related.map((s) => (
              <button
                key={s.slug}
                onClick={() => navigate({ type: "service", slug: s.slug })}
                className="card service-card-link text-left cursor-pointer border-0 bg-white"
              >
                <div className="service-card-media" style={{ height: 140 }}>
                  <img src={s.image} alt={t(s.nameKey)} width={400} height={250} loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-1">{t(s.nameKey)}</h3>
                  <span className="more text-xs">Meer informatie &rarr;</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
