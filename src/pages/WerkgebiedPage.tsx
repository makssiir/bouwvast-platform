import type { Page } from "../App";
import { CITIES, REGION_LABELS } from "../data/cities";
import Icon from "../components/Icon";
import { useLang } from "../i18n/LangContext";

const REGIONS = ["groot", "kern", "utrecht", "gooi", "gelderland"] as const;

export default function WerkgebiedPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();
  const citiesByRegion = (region: string) => CITIES.filter((c) => c.region === region);

  return (
    <main>
      <section className="hero hero--service">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">{t("nav_area")}</span>
          </div>
          <h1>{t("area_page_title")}</h1>
          <p className="lead-xl max-w-2xl">
            {t("area_page_sub")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Quick Coverage Chips */}
          <div className="card p-6 mb-12 bg-white">
            <span className="eyebrow">Direct naar uw gemeente</span>
            <div className="flex flex-wrap gap-2 mt-3">
              {CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => navigate({ type: "city", city: c.name })}
                  className="px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--muted-bg)] text-xs font-semibold text-[var(--fg)] hover:border-[var(--brand)] hover:text-[var(--brand)] hover:bg-white transition-all cursor-pointer"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Regions Grid */}
          {REGIONS.map((region) => {
            const cities = citiesByRegion(region);
            return (
              <div key={region} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold m-0">{REGION_LABELS[region]}</h2>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    {cities.length} {t("area_places")}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {cities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => navigate({ type: "city", city: city.name })}
                      className="card p-4 text-left cursor-pointer hover:border-[var(--brand)] hover:shadow-xs group"
                    >
                      <div className="mb-1.5">
                        <Icon name="pin" size={16} color="var(--brand)" />
                      </div>
                      <p className="font-bold text-sm m-0 text-[var(--fg)] group-hover:text-[var(--brand)] transition-colors">
                        {city.name}
                      </p>
                      <p className="text-xs text-[var(--muted)] m-0 mt-0.5">
                        {city.province}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
