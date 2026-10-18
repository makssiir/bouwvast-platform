import type { TranslationKey } from "../i18n/translations"
import type { ServiceName } from "./cities"

export type ServiceIcon = "renovation" | "finishing" | "painting" | "facade" | "assembly" | "maintenance" | "bathroom" | "general" | "tools" | "heatpump" | "underfloor" | "heating" | "window"

export interface Service {
  /** URL-safe identifier, stable across languages — the basis for Service × City routing. */
  slug: string
  /** Canonical NL name (cities.ts SERVICES_LIST), sent with a lead so the office knows the job. */
  name: ServiceName
  icon: ServiceIcon
  nameKey: TranslationKey
  descKey: TranslationKey
  image: string
  /** Generated service imagery is decorative, not evidence of a completed job. */
  illustration?: boolean
  /** Important limits or assessment requirements for this kind of work. */
  noteKey?: TranslationKey
  /** Translation key for the long-form intro. */
  introKey: TranslationKey
  /** Translation keys for concrete deliverables. */
  includesKeys: TranslationKey[]
}

/** Larger, higher-value jobs first: the homepage shows the first six. */
export const SERVICES: Service[] = [
  {
    slug: "renovatie",
    name: "Renovatie",
    icon: "renovation",
    nameKey: "svc_renovation",
    descKey: "svc_renovation_desc",
    image: "/images/renovated-interior.webp",
    illustration: true,
    introKey: "svc_renovation_intro",
    includesKeys: [
      "svc_renovation_inc_1",
      "svc_renovation_inc_2",
      "svc_renovation_inc_3",
      "svc_renovation_inc_4",
      "svc_renovation_inc_5",
    ],
  },
  {
    slug: "badkamer-keuken",
    name: "Badkamer & Keuken",
    icon: "bathroom",
    nameKey: "svc_bathroom",
    descKey: "svc_bathroom_desc",
    image: "/images/bath-after.webp",
    introKey: "svc_bathroom_intro",
    includesKeys: [
      "svc_bathroom_inc_1",
      "svc_bathroom_inc_2",
      "svc_bathroom_inc_3",
      "svc_bathroom_inc_4",
      "svc_bathroom_inc_5",
    ],
  },
  {
    slug: "uitbouw-aanbouw",
    name: "Uitbouw & Aanbouw",
    icon: "renovation",
    nameKey: "svc_extension",
    descKey: "svc_extension_desc",
    image: "/images/living-before.webp",
    introKey: "svc_extension_intro",
    includesKeys: [
      "svc_extension_inc_1",
      "svc_extension_inc_2",
      "svc_extension_inc_3",
      "svc_extension_inc_4",
      "svc_extension_inc_5",
    ],
  },
  {
    slug: "dakkapel-zolder",
    name: "Dakkapel & Zolder",
    icon: "general",
    nameKey: "svc_dormer",
    descKey: "svc_dormer_desc",
    image: "/images/attic-conversion.webp",
    illustration: true,
    introKey: "svc_dormer_intro",
    includesKeys: [
      "svc_dormer_inc_1",
      "svc_dormer_inc_2",
      "svc_dormer_inc_3",
      "svc_dormer_inc_4",
      "svc_dormer_inc_5",
    ],
  },
  {
    slug: "warmtepompen",
    name: "Warmtepompen",
    icon: "heatpump",
    nameKey: "svc_heatpump",
    descKey: "svc_heatpump_desc",
    image: "/images/heat-pump.webp",
    illustration: true,
    introKey: "svc_heatpump_intro",
    noteKey: "svc_heatpump_note",
    includesKeys: [
      "svc_heatpump_inc_1",
      "svc_heatpump_inc_2",
      "svc_heatpump_inc_3",
      "svc_heatpump_inc_4",
      "svc_heatpump_inc_5",
    ],
  },
  {
    slug: "vloerverwarming",
    name: "Vloerverwarming",
    icon: "underfloor",
    nameKey: "svc_underfloor",
    descKey: "svc_underfloor_desc",
    image: "/images/underfloor-heating.webp",
    illustration: true,
    introKey: "svc_underfloor_intro",
    noteKey: "svc_underfloor_note",
    includesKeys: [
      "svc_underfloor_inc_1",
      "svc_underfloor_inc_2",
      "svc_underfloor_inc_3",
      "svc_underfloor_inc_4",
      "svc_underfloor_inc_5",
    ],
  },
  {
    slug: "verwarming",
    name: "Verwarming",
    icon: "heating",
    nameKey: "svc_heating",
    descKey: "svc_heating_desc",
    image: "/images/radiator-heating.webp",
    illustration: true,
    introKey: "svc_heating_intro",
    noteKey: "svc_heating_note",
    includesKeys: [
      "svc_heating_inc_1",
      "svc_heating_inc_2",
      "svc_heating_inc_3",
      "svc_heating_inc_4",
      "svc_heating_inc_5",
    ],
  },
  {
    slug: "ramen-deuren",
    name: "Ramen & Deuren",
    icon: "window",
    nameKey: "svc_windows",
    descKey: "svc_windows_desc",
    image: "/images/windows-doors.webp",
    illustration: true,
    introKey: "svc_windows_intro",
    noteKey: "svc_windows_note",
    includesKeys: [
      "svc_windows_inc_1",
      "svc_windows_inc_2",
      "svc_windows_inc_3",
      "svc_windows_inc_4",
      "svc_windows_inc_5",
    ],
  },
  {
    slug: "demontage-ramen-deuren",
    name: "Demontage ramen & deuren",
    icon: "window",
    nameKey: "svc_dismantling",
    descKey: "svc_dismantling_desc",
    image: "/images/window-removal.webp",
    illustration: true,
    introKey: "svc_dismantling_intro",
    noteKey: "svc_dismantling_note",
    includesKeys: [
      "svc_dismantling_inc_1",
      "svc_dismantling_inc_2",
      "svc_dismantling_inc_3",
      "svc_dismantling_inc_4",
      "svc_dismantling_inc_5",
    ],
  },
  {
    slug: "algemeen",
    name: "Algemene Bouwwerkzaamheden",
    icon: "general",
    nameKey: "svc_general",
    descKey: "svc_general_desc",
    image: "/images/living-after.webp",
    introKey: "svc_general_intro",
    includesKeys: [
      "svc_general_inc_1",
      "svc_general_inc_2",
      "svc_general_inc_3",
      "svc_general_inc_4",
    ],
  },
  {
    slug: "afbouw",
    name: "Afbouw",
    icon: "finishing",
    nameKey: "svc_finishing",
    descKey: "svc_finishing_desc",
    image: "/images/kitchen-renovation.webp",
    introKey: "svc_finishing_intro",
    includesKeys: [
      "svc_finishing_inc_1",
      "svc_finishing_inc_2",
      "svc_finishing_inc_3",
      "svc_finishing_inc_4",
      "svc_finishing_inc_5",
    ],
  },
  {
    slug: "gevel-buitenwerk",
    name: "Gevel & Buitenwerk",
    icon: "facade",
    nameKey: "svc_facade",
    descKey: "svc_facade_desc",
    image: "/images/brick-facade.webp",
    illustration: true,
    introKey: "svc_facade_intro",
    includesKeys: [
      "svc_facade_inc_1",
      "svc_facade_inc_2",
      "svc_facade_inc_3",
      "svc_facade_inc_4",
      "svc_facade_inc_5",
    ],
  },
  {
    slug: "schilderwerk",
    name: "Schilderwerk",
    icon: "painting",
    nameKey: "svc_painting",
    descKey: "svc_painting_desc",
    image: "/images/tools-detail.webp",
    introKey: "svc_painting_intro",
    includesKeys: [
      "svc_painting_inc_1",
      "svc_painting_inc_2",
      "svc_painting_inc_3",
      "svc_painting_inc_4",
      "svc_painting_inc_5",
    ],
  },
  {
    slug: "timmerman",
    name: "Timmerman",
    icon: "finishing",
    nameKey: "svc_carpenter",
    descKey: "svc_carpenter_desc",
    image: "/images/carpentry-work.webp",
    introKey: "svc_carpenter_intro",
    includesKeys: [
      "svc_carpenter_inc_1",
      "svc_carpenter_inc_2",
      "svc_carpenter_inc_3",
      "svc_carpenter_inc_4",
      "svc_carpenter_inc_5",
    ],
  },
  {
    slug: "loodgieter",
    name: "Loodgieter",
    icon: "bathroom",
    nameKey: "svc_plumber",
    descKey: "svc_plumber_desc",
    image: "/images/plumbing-installation.webp",
    illustration: true,
    introKey: "svc_plumber_intro",
    includesKeys: [
      "svc_plumber_inc_1",
      "svc_plumber_inc_2",
      "svc_plumber_inc_3",
      "svc_plumber_inc_4",
      "svc_plumber_inc_5",
      "svc_plumber_inc_6",
    ],
  },
  {
    slug: "onderhoud-reparatie",
    name: "Onderhoud & Reparatie",
    icon: "maintenance",
    nameKey: "svc_maintenance",
    descKey: "svc_maintenance_desc",
    image: "/images/bath-before.webp",
    introKey: "svc_maintenance_intro",
    includesKeys: [
      "svc_maintenance_inc_1",
      "svc_maintenance_inc_2",
      "svc_maintenance_inc_3",
      "svc_maintenance_inc_4",
      "svc_maintenance_inc_5",
    ],
  },
  {
    slug: "montage",
    name: "Montage",
    icon: "assembly",
    nameKey: "svc_assembly",
    descKey: "svc_assembly_desc",
    image: "/images/tools-rack.webp",
    introKey: "svc_assembly_intro",
    includesKeys: [
      "svc_assembly_inc_1",
      "svc_assembly_inc_2",
      "svc_assembly_inc_3",
      "svc_assembly_inc_4",
      "svc_assembly_inc_5",
    ],
  },
]

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
)

/**
 * One public catalogue for the service overview and both enquiry forms.
 * Every service appears once; nothing is hidden behind a "more services" toggle.
 */
export const SERVICE_GROUPS: {
  id: string
  titleKey: TranslationKey
  descKey: TranslationKey
  slugs: string[]
}[] = [
  {
    id: "installations",
    titleKey: "services_group_installations",
    descKey: "services_group_installations_desc",
    slugs: ["warmtepompen", "vloerverwarming", "verwarming", "loodgieter"],
  },
  {
    id: "windows",
    titleKey: "services_group_windows",
    descKey: "services_group_windows_desc",
    slugs: ["ramen-deuren", "demontage-ramen-deuren", "timmerman"],
  },
  {
    id: "renovation",
    titleKey: "services_group_renovation",
    descKey: "services_group_renovation_desc",
    slugs: ["renovatie", "badkamer-keuken", "uitbouw-aanbouw", "dakkapel-zolder", "afbouw"],
  },
  {
    id: "maintenance",
    titleKey: "services_group_maintenance",
    descKey: "services_group_maintenance_desc",
    slugs: ["gevel-buitenwerk", "schilderwerk", "onderhoud-reparatie", "montage", "algemeen"],
  },
]

/**
 * Owner launch gate, not a public certification claim. Confirm the actual scope,
 * required certificates and any specialist arrangement before marking reviewed.
 */
export const HEAT_PUMP_SCOPE = { reviewed: false, source: "" }
