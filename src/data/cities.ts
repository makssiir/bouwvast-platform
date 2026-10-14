import type { TranslationKey } from "../i18n/translations"

export interface City {
  name: string
  province: string
  region: string
}

/**
 * Places with their own page under /werkgebied/. Restricted to the region the
 * site already names (Amersfoort and surroundings). The prototype also listed
 * Amsterdam, Rotterdam, Maastricht, Groningen and other cities far outside
 * that region, which would advertise a service area that has not been
 * confirmed. The owner should confirm this list before launch.
 */
export const CITIES: City[] = [
  { name: "Amersfoort", province: "Utrecht", region: "kern" },
  { name: "Soest", province: "Utrecht", region: "kern" },
  { name: "Leusden", province: "Utrecht", region: "kern" },
  { name: "Baarn", province: "Utrecht", region: "kern" },
  { name: "Hoevelaken", province: "Gelderland", region: "kern" },
  { name: "Nijkerk", province: "Gelderland", region: "kern" },
  { name: "Utrecht", province: "Utrecht", region: "utrecht" },
  { name: "Zeist", province: "Utrecht", region: "utrecht" },
  { name: "Veenendaal", province: "Utrecht", region: "utrecht" },
  { name: "Hilversum", province: "Noord-Holland", region: "gooi" },
  { name: "Bussum", province: "Noord-Holland", region: "gooi" },
  { name: "Naarden", province: "Noord-Holland", region: "gooi" },
  { name: "Harderwijk", province: "Gelderland", region: "gelderland" },
  { name: "Barneveld", province: "Gelderland", region: "gelderland" },
  { name: "Ede", province: "Gelderland", region: "gelderland" },
]

export const REGION_LABELS: Record<string, TranslationKey> = {
  kern: "region_kern",
  utrecht: "region_utrecht",
  gooi: "region_gooi",
  gelderland: "region_gelderland",
}

export const SERVICES_LIST = [
  "Renovatie",
  "Afbouw",
  "Schilderwerk",
  "Gevel & Buitenwerk",
  "Montage",
  "Onderhoud & Reparatie",
  "Badkamer & Keuken",
  "Algemene Bouwwerkzaamheden",
  "Loodgieter",
  "Elektricien",
  "Timmerman",
  "Timmerbedrijf",
  "Klusjesman",
  "Klusbedrijf",
] as const

export type ServiceName = typeof SERVICES_LIST[number]
