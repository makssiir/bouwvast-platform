import type { TranslationKey } from "../i18n/translations";
import type { ServiceName } from "./cities";

export type ServiceIcon =
  | "renovation" | "finishing" | "painting" | "facade"
  | "assembly" | "maintenance" | "bathroom" | "general" | "tools";

export interface Service {
  /** URL-safe identifier, stable across languages — the basis for Service × City routing. */
  slug: string;
  /** Canonical NL name, matching cities.ts SERVICE_NAMES so a service can be paired with a city. */
  name: ServiceName;
  icon: ServiceIcon;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  image: string;
  /** NL long-form intro. Structured so translations can be layered on later without a rewrite. */
  intro: string;
  /** Concrete deliverables — what actually falls under this service. */
  includes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "renovatie",
    name: "Renovatie",
    icon: "renovation",
    nameKey: "svc_renovation",
    descKey: "svc_renovation_desc",
    image: "/images/renovation-ladder.webp",
    intro:
      "Van een enkele woonlaag tot een complete turn-key woningrenovatie. We begeleiden uw verbouwing van sloop tot oplevering met één vast aanspreekpunt, heldere planning en vaste prijsafspraken.",
    includes: [
      "Complete woningrenovatie en herindeling",
      "Draagmuur doorbraken & stalen balken (berekend)",
      "Vloerisolatie, dekvloeren & vloerverwarming",
      "Plafonds, stucwerk en schilderklare afwerking",
      "Turn-key oplevering inclusief bouwafval afvoer",
    ],
  },
  {
    slug: "badkamer-keuken",
    name: "Badkamer & Keuken",
    icon: "bathroom",
    nameKey: "svc_bathroom",
    descKey: "svc_bathroom_desc",
    image: "/images/kitchen-renovation.webp",
    intro:
      "Specialist in complete badkamer- en keukenverbouwingen. Van leidingwerk en waterdichte kimband tot grootformaat tegelwerk en luxe sanitairmontage.",
    includes: [
      "Volledige badkamerrenovatie & inloopdouche",
      "Leidingen infrezen (water, afvoer, elektra)",
      "Grootformaat tegelwerk & precisie leveling",
      "Keukens vakkundig plaatsen en aansluiten",
      "Schimmelwerend sanitair kitwerk met garantie",
    ],
  },
  {
    slug: "afbouw",
    name: "Afbouw",
    icon: "finishing",
    nameKey: "svc_finishing",
    descKey: "svc_finishing_desc",
    image: "/images/carpentry-work.webp",
    intro:
      "Strak stucwerk en complete afbouw voor renovatie en nieuwbouw. Spiegelglad sausklaar pleisterwerk, scheidingswanden en verlaagde plafonds.",
    includes: [
      "Sausklaar stucwerk (spiegelglad)",
      "Behangklaar stucen & renovlies aanbrengen",
      "Metal-stud scheidingswanden & isolatie",
      "Gipsplaten plafonds met inbouwspots",
      "Deuropeningen en kozijnen strak afwerken",
    ],
  },
  {
    slug: "schilderwerk",
    name: "Schilderwerk",
    icon: "painting",
    nameKey: "svc_painting",
    descKey: "svc_painting_desc",
    image: "/images/tools-detail.webp",
    intro:
      "Vakkundig binnen- en buitenschilderwerk met professionele verfsystemen. Strakke sauswanden, zijdeglans lakwerk op kozijnen en grondig houtrotherstel.",
    includes: [
      "Airless spuitwerk & handmatig sauswerk",
      "Kozijnen, ramen en binnendeuren lakken",
      "Buitenschilderwerk & gevelbehandeling",
      "Houtrotherstel met 2-componenten epoxy",
      "Profiteer van 9% verlaagd btw-tarief",
    ],
  },
  {
    slug: "timmerman",
    name: "Timmerman",
    icon: "finishing",
    nameKey: "svc_finishing",
    descKey: "svc_finishing_desc",
    image: "/images/carpentry-work.webp",
    intro:
      "Ervaren timmerlieden voor maatwerk houtconstructies, binnendeuren afhangen, kozijnen vernieuwen en dakkapel aftimmering.",
    includes: [
      "Hardhouten & kunststof kozijnen plaatsen",
      "Binnendeuren en buitendeuren afhangen",
      "Maatwerk inbouwkasten & cinewalls",
      "Dakkapel en zolder aftimmering",
      "Houten vloeren en plinten monteren",
    ],
  },
  {
    slug: "gevel-buitenwerk",
    name: "Gevel & Buitenwerk",
    icon: "facade",
    nameKey: "svc_facade",
    descKey: "svc_facade_desc",
    image: "/images/site-team.webp",
    intro:
      "Duurzaam herstel en onderhoud aan de buitenschil van uw woning. Voegwerk, metselreparaties, gevelreiniging en buitengevelisolatie.",
    includes: [
      "Voegwerk uithakken & opnieuw invoegen",
      "Metselwerk herstellen & scheurvorming repareren",
      "Gevelreiniging & hydrofoberen (impregneren)",
      "Boeidelen en dakgoten vernieuwen",
      "Buitengevelisolatie en afwerking",
    ],
  },
  {
    slug: "montage",
    name: "Montage",
    icon: "assembly",
    nameKey: "svc_assembly",
    descKey: "svc_assembly_desc",
    image: "/images/tools-rack.webp",
    intro:
      "Nauwkeurig montagewerk voor woningen en bedrijfspanden. Van kasten en schuifwanden tot deuren, verlichting en meubelinstallatie.",
    includes: [
      "Keukenmontage & apparatuur inbouw",
      "Deuren, schuifdeursystemen & hang- en sluitwerk",
      "Wandpanelen, akoestische panelen & cinewalls",
      "Dakraam (Velux) montage & aftimmering",
      "Plinten en lijstwerk strak verstek zagen",
    ],
  },
  {
    slug: "loodgieter",
    name: "Loodgieter",
    icon: "bathroom",
    nameKey: "svc_bathroom",
    descKey: "svc_bathroom_desc",
    image: "/images/tile-work.webp",
    intro:
      "Betrouwbare loodgieters voor leidingwerk bij verbouwingen, sanitair aansluiten, vloerverwarming en acute lekkages.",
    includes: [
      "Water- en afvoerleidingen verleggen",
      "Inloopdouche drains & inbouwkranen aansluiten",
      "Vloerverwarming verdelers & leidingen",
      "Lekkages opsporen en direct verhelpen",
      "Radiatoren vervangen & CV-aanpassingen",
    ],
  },
  {
    slug: "onderhoud-reparatie",
    name: "Onderhoud & Reparatie",
    icon: "maintenance",
    nameKey: "svc_maintenance",
    descKey: "svc_maintenance_desc",
    image: "/images/tools-detail.webp",
    intro:
      "Onderhoudswerkzaamheden en herstelklussen aan uw woning of vastgoedcomplex. Preventief, vakkundig en met garantie.",
    includes: [
      "Herstel van vochtschade & stucwerk",
      "Deursloten en hang- en sluitwerk vernieuwen (SKG***)",
      "Vervangen van beschadigde tegels of plinten",
      "Onderhoudsbeurten voor woningen en VvE's",
      "Snel ter plaatse voor noodreparaties",
    ],
  },
  {
    slug: "algemeen",
    name: "Algemene Bouwwerkzaamheden",
    icon: "general",
    nameKey: "svc_general",
    descKey: "svc_general_desc",
    image: "/images/renovation-ladder.webp",
    intro:
      "Heeft u een combinatieproject of een specifieke verbouwklus? Wij denken mee vanaf de ontwerpfase tot aan de bezemvaste oplevering.",
    includes: [
      "Multidisciplinaire verbouwingen",
      "Persoonlijk bouwadvies en opname op locatie",
      "Transparante calculatie zonder verborgen kosten",
      "Vaste planning met één bouwcoördinator",
    ],
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);
