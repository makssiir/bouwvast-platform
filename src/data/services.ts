import type { TranslationKey } from "../i18n/translations"
import type { ServiceName } from "./cities"

export type ServiceIcon = "renovation" | "finishing" | "painting" | "facade" | "assembly" | "maintenance" | "bathroom" | "general" | "tools"

export interface Service {
  /** URL-safe identifier, stable across languages — the basis for Service × City routing. */
  slug: string
  /** Canonical NL name, matching cities.ts SERVICE_NAMES so a service can be paired with a city. */
  name: ServiceName
  icon: ServiceIcon
  nameKey: TranslationKey
  descKey: TranslationKey
  image: string
  /** Translation key for the long-form intro. */
  introKey: TranslationKey
  /** Translation keys for concrete deliverables. */
  includesKeys: TranslationKey[]
}

export const SERVICES: Service[] = [
  {
    slug: "renovatie",
    name: "Renovatie",
    icon: "renovation",
    nameKey: "svc_renovation",
    descKey: "svc_renovation_desc",
    image: "/images/renovation-ladder.webp",
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
    image: "/images/kitchen-renovation.webp",
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
    slug: "afbouw",
    name: "Afbouw",
    icon: "finishing",
    nameKey: "svc_finishing",
    descKey: "svc_finishing_desc",
    image: "/images/carpentry-work.webp",
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
    slug: "gevel-buitenwerk",
    name: "Gevel & Buitenwerk",
    icon: "facade",
    nameKey: "svc_facade",
    descKey: "svc_facade_desc",
    image: "/images/site-team.webp",
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
  {
    slug: "loodgieter",
    name: "Loodgieter",
    icon: "bathroom",
    nameKey: "svc_plumber",
    descKey: "svc_plumber_desc",
    image: "/images/tile-work.webp",
    introKey: "svc_plumber_intro",
    includesKeys: [
      "svc_plumber_inc_1",
      "svc_plumber_inc_2",
      "svc_plumber_inc_3",
      "svc_plumber_inc_4",
      "svc_plumber_inc_5",
    ],
  },
  {
    slug: "onderhoud-reparatie",
    name: "Onderhoud & Reparatie",
    icon: "maintenance",
    nameKey: "svc_maintenance",
    descKey: "svc_maintenance_desc",
    image: "/images/tools-detail.webp",
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
    slug: "algemeen",
    name: "Algemene Bouwwerkzaamheden",
    icon: "general",
    nameKey: "svc_general",
    descKey: "svc_general_desc",
    image: "/images/renovation-ladder.webp",
    introKey: "svc_general_intro",
    includesKeys: [
      "svc_general_inc_1",
      "svc_general_inc_2",
      "svc_general_inc_3",
      "svc_general_inc_4",
    ],
  },
]

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
)
