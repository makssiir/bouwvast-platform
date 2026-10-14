import type { TranslationKey } from "../i18n/translations"

export interface City {
  name: string
  province: string
  region: string
  /** Four-digit postcode ranges (inclusive) of the town, for the area checker. */
  postcodes: [number, number][]
  /** Districts and villages that belong to the town, matched by name. */
  aliases?: string[]
}

/**
 * Places with their own page under /werkgebied/. Restricted to the region the
 * site already names (Amersfoort and surroundings). The prototype also listed
 * Amsterdam, Rotterdam, Maastricht, Groningen and other cities far outside
 * that region, which would advertise a service area that has not been
 * confirmed. The owner should confirm this list before launch.
 */
export const CITIES: City[] = [
  { name: "Amersfoort", province: "Utrecht", region: "kern", postcodes: [[3800, 3829]], aliases: ["Hoogland", "Hooglanderveen", "Vathorst", "Nieuwland", "Kattenbroek", "Schothorst"] },
  { name: "Soest", province: "Utrecht", region: "kern", postcodes: [[3760, 3769]], aliases: ["Soesterberg", "Soestduinen"] },
  { name: "Leusden", province: "Utrecht", region: "kern", postcodes: [[3830, 3833], [3791, 3791]], aliases: ["Achterveld"] },
  { name: "Baarn", province: "Utrecht", region: "kern", postcodes: [[3740, 3744], [3749, 3749]], aliases: ["Lage Vuursche"] },
  { name: "Hoevelaken", province: "Gelderland", region: "kern", postcodes: [[3871, 3871]] },
  { name: "Nijkerk", province: "Gelderland", region: "kern", postcodes: [[3860, 3864]], aliases: ["Nijkerkerveen"] },
  { name: "Utrecht", province: "Utrecht", region: "utrecht", postcodes: [[3500, 3585], [3450, 3455]], aliases: ["Leidsche Rijn", "Vleuten", "De Meern"] },
  { name: "Zeist", province: "Utrecht", region: "utrecht", postcodes: [[3700, 3712], [3734, 3735]], aliases: ["Den Dolder", "Huis ter Heide", "Austerlitz", "Bosch en Duin"] },
  { name: "Veenendaal", province: "Utrecht", region: "utrecht", postcodes: [[3900, 3907]] },
  { name: "Hilversum", province: "Noord-Holland", region: "gooi", postcodes: [[1200, 1223]] },
  { name: "Bussum", province: "Noord-Holland", region: "gooi", postcodes: [[1400, 1406]] },
  { name: "Naarden", province: "Noord-Holland", region: "gooi", postcodes: [[1410, 1412]] },
  { name: "Harderwijk", province: "Gelderland", region: "gelderland", postcodes: [[3840, 3849]], aliases: ["Hierden"] },
  { name: "Barneveld", province: "Gelderland", region: "gelderland", postcodes: [[3770, 3774], [3780, 3781]], aliases: ["Voorthuizen", "Kootwijkerbroek"] },
  { name: "Ede", province: "Gelderland", region: "gelderland", postcodes: [[6710, 6718], [6721, 6721], [6741, 6741]], aliases: ["Bennekom", "Lunteren"] },
]

export const REGION_LABELS: Record<string, TranslationKey> = {
  kern: "region_kern",
  utrecht: "region_utrecht",
  gooi: "region_gooi",
  gelderland: "region_gelderland",
}

export type AreaMatch =
  | { status: "covered"; city: City; place: string }
  | { status: "unknown"; place: string }
  | { status: "invalid" }

const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()

/**
 * The area checker's answer, derived from the same list as /werkgebied/ so
 * the two can never disagree. A postcode or place that is not on the list is
 * "unknown" (we check personally), never "not covered".
 */
export function findServiceArea(input: string): AreaMatch {
  const raw = input.trim().slice(0, 80)
  if (raw.length < 2) return { status: "invalid" }

  const postcode = raw.match(/\b([1-9]\d{3})(?:\s?([a-z]{2}))?\b/i)
  if (postcode) {
    const code = Number(postcode[1])
    const place = postcode[2] ? `${postcode[1]} ${postcode[2].toUpperCase()}` : postcode[1]
    const city = CITIES.find((c) => c.postcodes.some(([from, to]) => code >= from && code <= to))
    return city ? { status: "covered", city, place: `${place} (${city.name})` } : { status: "unknown", place }
  }

  const query = ` ${fold(raw)} `
  if (query.trim().length < 2) return { status: "invalid" }
  for (const city of CITIES) {
    if (query.includes(` ${fold(city.name)} `)) return { status: "covered", city, place: city.name }
    const alias = city.aliases?.find((a) => query.includes(` ${fold(a)} `))
    if (alias) return { status: "covered", city, place: `${alias} (${city.name})` }
  }
  return { status: "unknown", place: raw }
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
