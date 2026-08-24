export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
  tips?: string[];
  relatedServiceSlug?: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "verbouwing-kosten-gids-2026",
    title: "Wat kost een verbouwing in 2026? Complete richtprijzen & bespaartips",
    excerpt: "Een helder overzicht van de gemiddelde kosten per m², uurtarieven van vakmensen, en hoe u onverwachte meerkosten voorkomt.",
    category: "Kosten & Budget",
    readTime: "5 min leestijd",
    date: "Februari 2026",
    image: "/images/kitchen-renovation.webp",
    content: [
      "Bij het plannen van een verbouwing is een realistische begroting essentieel. De kosten van een verbouwing hangen af van het type werk, de oppervlakte, de staat van de woning en het gekozen afwerkingsniveau.",
      "Voor een gemiddelde woningrenovatie moet u rekening houden met een richtbedrag tussen de €600 en €1.200 per m² voor een standaard renovatie, en €1.200 tot €2.000+ per m² voor een complete hoogwaardige turn-key verbouwing.",
      "Vakmensen hanteren in 2026 gemiddelde uurtarieven tussen de €50 en €70 exclusief btw, afhankelijk van de specialisatie (loodgieters en elektriciens zitten vaak aan de bovenkant, schilders en tegelzetters werken vaak met m²-prijzen).",
      "Tip van Bouwvast: Vraag altijd een gespecificeerde offerte waarin arbeid, materialen, afvalafvoer en eventuele voorrijkosten duidelijk gescheiden zijn."
    ],
    tips: [
      "Reserveer minimaal 10-15% van uw totale budget voor onvoorziene kosten.",
      "Combineer werkzaamheden (zoals leidingwerk en stucwerk) om voorrijkosten te drukken.",
      "Check of u recht heeft op het lage 9% btw-tarief op schilder- en stucwerk voor woningen ouder dan 2 jaar."
    ],
    relatedServiceSlug: "renovatie"
  },
  {
    slug: "badkamer-renoveren-stappenplan",
    title: "Badkamer renoveren: Stappenplan van sloop tot strakke oplevering",
    excerpt: "Van leidingen verleggen en waterdichting tot tegelwerk en sanitair montage. Zo verloopt een vakkundige badkamerrenovatie.",
    category: "Renovatie Gids",
    readTime: "6 min leestijd",
    date: "Januari 2026",
    image: "/images/tile-work.webp",
    content: [
      "Een nieuwe badkamer is een waardevolle investering in uw wooncomfort én de waarde van uw woning. Een complete badkamerrenovatie duurt gemiddeld 2 tot 3 weken.",
      "Stap 1: Slopen & voorbereiding. Het oude sanitair en tegelwerk worden zorgvuldig verwijderd en afgevoerd. Leidingen voor water, afvoer en elektra worden op de juiste posities ingefreesd.",
      "Stap 2: Waterdichting (Kimband & pasta). Cruciaal voor het voorkomen van lekkages. Alle hoeken en doorvoeren worden voorzien van waterdichte afdichtingsband.",
      "Stap 3: Tegelwerk & voegen. Grootformaat tegels of mozaïek worden strak geplaatst met een precisie-levelingsysteem.",
      "Stap 4: Sanitair montage & afkitten. Het plaatsen van het badkamermeubel, inloopdouche, kranen en schimmelwerend kitwerk."
    ],
    tips: [
      "Zorg voor voldoende ventilatie om vocht- en schimmelproblemen op lange termijn te voorkomen.",
      "Kies voor antislip (R10/R11) vloertegels in de inloopdouche.",
      "Laat elektra in natte zones altijd uitvoeren door een gecertificeerd elektricien volgens NEN 1010 zone-indeling."
    ],
    relatedServiceSlug: "badkamer-keuken"
  },
  {
    slug: "stucwerk-droogtijd-kosten",
    title: "Stucwerk: Droogtijden, soorten afwerking en kosten per m²",
    excerpt: "Alles wat u moet weten over sausklaar stucwerk, behangklaar stucen, spackspuiten en de benodigde droogtijd voor u gaat schilderen.",
    category: "Afbouw & Stuc",
    readTime: "4 min leestijd",
    date: "Februari 2026",
    image: "/images/carpentry-work.webp",
    content: [
      "Stucwerk vormt de basis voor strakke wanden en plafonds. Er zijn twee belangrijke afwerkingsniveaus:",
      "1. Sausklaar stucwerk: Volledig glad en spiegelglad afgewerkt, direct geschikt om met latexverf te rollen of airless te spuiten.",
      "2. Behangklaar stucwerk: Iets grovere afwerking, perfect als ondergrond voor renovlies, glasvezelbehang of traditioneel behang.",
      "Droogtijd: Reken als vuistregel op 1 dag droogtijd per millimeter stucwerk bij een temperatuur van 18-20°C en goede ventilatie. Begin nooit te vroeg met schilderen om blaasvorming en vochtschade te voorkomen."
    ],
    tips: [
      "Ventileer de ruimte continu met ramen op een kier; gebruik bij koud weer bouwdrogers op lage stand.",
      "Gebruik altijd een goede voorstrijk (fixeermiddel) voor u gaat schilderen om zuiging te reguleren."
    ],
    relatedServiceSlug: "afbouw"
  },
  {
    slug: "laag-btw-tarief-verbouwing-regels",
    title: "9% Btw op verbouwing: Voor welke werkzaamheden geldt het lage tarief?",
    excerpt: "Bespaar honderden tot duizenden euro's op uw verbouwing dankzij het verlaagde btw-tarief op schilderen, stukadoren en isoleren.",
    category: "Regelgeving & Subsidie",
    readTime: "4 min leestijd",
    date: "Januari 2026",
    image: "/images/tools-detail.webp",
    content: [
      "Wanneer uw woning ouder is dan 2 jaar na eerste ingebruikname, profiteert u voor bepaalde werkzaamheden van het lage btw-tarief van 9% in plaats van 21%.",
      "Voor welke werkzaamheden geldt 9% btw?",
      "• Binnen- en buitenschilderwerk aan de woning.",
      "• Stucwerk en wandafwerking door een professionele stukadoor.",
      "• Aanbrengen van isolatiematerialen aan vloeren, gevels en daken.",
      "Voor andere werkzaamheden (zoals timmerwerk, loodgieterswerk, sanitair levering en complete uitbouwen) geldt het standaard 21% tarief op arbeid en materialen."
    ],
    tips: [
      "Laat de leeftijd van uw woning vooraf vastleggen in de offerte en factuur.",
      "Informeer bij uw gemeente naar aanvullende ISDE-subsidies voor isolatie en verduurzaming."
    ],
    relatedServiceSlug: "schilderwerk"
  }
];

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a])
);
