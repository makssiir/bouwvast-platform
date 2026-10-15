export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  content: string[]
  tips?: string[]
  relatedServiceSlug?: string
}

export const ARTICLES: Article[] = [
  {
    slug: "verbouwing-kosten-gids-2026",
    title:
      "Wat kost een verbouwing? Zo leest u een gespecificeerde offerte",
    excerpt:
      "Welke kosten horen in een offerte en hoe herkent u of btw is inbegrepen? Een praktische gids voor uw verbouwbudget.",
    category: "Kosten & budget",
    readTime: "5 min leestijd",
    date: "Februari 2026",
    image: "/images/kitchen-renovation.webp",
    content: [
      "Bij het plannen van een verbouwing is een realistische begroting essentieel. De kosten van een verbouwing hangen af van het type werk, de oppervlakte, de staat van de woning en het gekozen afwerkingsniveau.",
      "Vraag om een uitsplitsing van arbeid, materialen, demontage, afvalafvoer en eventuele voorrijkosten. In de onderbouwing kunnen bedragen exclusief btw staan, met de btw en het totaal inclusief btw apart vermeld.",
      "Prijzen voor particulieren op deze site zijn inclusief btw. Bij zakelijke offertes staan bedragen doorgaans exclusief btw; de offerte vermeldt dat expliciet. Tarieven en mogelijke uitzonderingen moeten per aanvraag worden bevestigd.",
      "Tip van Huisklusdienst: vergelijk de totale prijs inclusief btw én wat er is inbegrepen. Een laag nettobedrag zegt weinig als materialen, afvoer of noodzakelijke bijkomende kosten ontbreken.",
    ],
    tips: [
      "Spreek af hoe onvoorziene werkzaamheden worden gemeld, begroot en goedgekeurd.",
      "Combineer werkzaamheden (zoals leidingwerk en stucwerk) om voorrijkosten te drukken.",
      "Check of u recht heeft op het lage 9% btw-tarief op schilder- en stucwerk voor woningen ouder dan 2 jaar.",
    ],
    relatedServiceSlug: "renovatie",
  },
  {
    slug: "badkamer-renoveren-stappenplan",
    title: "Badkamer renoveren: stappenplan van sloop tot strakke oplevering",
    excerpt:
      "Van leidingen verleggen en waterdichting tot tegelwerk en sanitair montage. Zo verloopt een vakkundige badkamerrenovatie.",
    category: "Renovatiegids",
    readTime: "6 min leestijd",
    date: "Januari 2026",
    image: "/images/tile-work.webp",
    content: [
      "Een nieuwe badkamer is een waardevolle investering in uw wooncomfort én de waarde van uw woning. Een complete badkamerrenovatie duurt gemiddeld 2 tot 3 weken.",
      "Stap 1: Slopen & voorbereiding. Het oude sanitair en tegelwerk worden zorgvuldig verwijderd en afgevoerd. Leidingen voor water, afvoer en elektra worden op de juiste posities ingefreesd.",
      "Stap 2: Waterdichting (Kimband & pasta). Cruciaal voor het voorkomen van lekkages. Alle hoeken en doorvoeren worden voorzien van waterdichte afdichtingsband.",
      "Stap 3: Tegelwerk & voegen. Grootformaat tegels of mozaïek worden strak geplaatst met een precisie-levelingsysteem.",
      "Stap 4: Sanitair montage & afkitten. Het plaatsen van het badkamermeubel, inloopdouche, kranen en schimmelwerend kitwerk.",
    ],
    tips: [
      "Zorg voor voldoende ventilatie om vocht- en schimmelproblemen op lange termijn te voorkomen.",
      "Kies voor antislip (R10/R11) vloertegels in de inloopdouche.",
      "Laat elektra in natte zones altijd uitvoeren door een gecertificeerd elektricien volgens NEN 1010 zone-indeling.",
    ],
    relatedServiceSlug: "badkamer-keuken",
  },
  {
    slug: "stucwerk-droogtijd-kosten",
    title: "Stucwerk: droogtijden, soorten afwerking en kosten per m²",
    excerpt:
      "Alles wat u moet weten over sausklaar stucwerk, behangklaar stucen, spackspuiten en de benodigde droogtijd voor u gaat schilderen.",
    category: "Afbouw & stucwerk",
    readTime: "4 min leestijd",
    date: "Februari 2026",
    image: "/images/carpentry-work.webp",
    content: [
      "Stucwerk vormt de basis voor strakke wanden en plafonds. Er zijn twee belangrijke afwerkingsniveaus:",
      "1. Sausklaar stucwerk: Volledig glad en spiegelglad afgewerkt, direct geschikt om met latexverf te rollen of airless te spuiten.",
      "2. Behangklaar stucwerk: Iets grovere afwerking, perfect als ondergrond voor renovlies, glasvezelbehang of traditioneel behang.",
      "Droogtijd: Reken als vuistregel op 1 dag droogtijd per millimeter stucwerk bij een temperatuur van 18-20°C en goede ventilatie. Begin nooit te vroeg met schilderen om blaasvorming en vochtschade te voorkomen.",
    ],
    tips: [
      "Ventileer de ruimte continu met ramen op een kier; gebruik bij koud weer bouwdrogers op lage stand.",
      "Gebruik altijd een goede voorstrijk (fixeermiddel) voor u gaat schilderen om zuiging te reguleren.",
    ],
    relatedServiceSlug: "afbouw",
  },
  {
    slug: "laag-btw-tarief-verbouwing-regels",
    title:
      "9% btw op verbouwing: voor welke werkzaamheden geldt het lage tarief?",
    excerpt:
      "Het btw-tarief hangt af van de werkzaamheden en de voorwaarden. Laat de juiste behandeling per onderdeel bevestigen.",
    category: "Regelgeving & subsidie",
    readTime: "4 min leestijd",
    date: "Januari 2026",
    image: "/images/tools-detail.webp",
    content: [
      "Voor bepaald schilder- en stucwerk aan woningen ouder dan 2 jaar kan het verlaagde btw-tarief van 9% gelden. Dat betekent niet dat een volledige verbouwing automatisch onder het lage tarief valt.",
      "Laat per onderdeel controleren welke voorwaarden gelden en welk tarief van toepassing is. Arbeid, levering van materialen en andere werkzaamheden kunnen verschillend worden behandeld.",
      "Een gespecificeerde offerte vermeldt bedragen zonder btw, de btw per toepasselijk tarief en het totaal inclusief btw. Voor consumenten moet de totale prijs duidelijk zijn.",
      "Voor zakelijke opdrachten kunnen aanvullende regels gelden, zoals btw-verlegging. Pas dit niet automatisch toe: laat de behandeling voor de concrete opdracht bevestigen.",
      "De calculator op deze site geeft een indicatieve totaalprijs inclusief btw, geen fiscale berekening of bindende offerte. Een eventuele afwijkende behandeling wordt in de definitieve offerte verwerkt.",
    ],
    tips: [
      "Laat de leeftijd van uw woning vooraf vastleggen in de offerte en factuur.",
      "Controleer actuele voorwaarden bij de Belastingdienst en bespreek uitzonderingen vóór akkoord op de offerte.",
    ],
    relatedServiceSlug: "schilderwerk",
  },
]

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a]),
)
