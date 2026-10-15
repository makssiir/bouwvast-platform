import type { TraitId } from "./localTraits"

/**
 * Places with their own page under /werkgebied/. Major places also get a page
 * per service (/werkgebied/<plaats>/<dienst>/). Every page here tells
 * visitors and search engines that we take on work in that place, so the
 * owner should remove any place the team cannot actually serve.
 *
 * Districts, traits and the intros (data/cityIntros.ts) are general,
 * checkable facts about the housing stock — no figures that age, no
 * promises about the service.
 * Must stay runnable in plain Node (scripts/check-launch.mjs imports it):
 * type-only imports, no JSX, no path aliases.
 */
export type Province =
  | "Groningen"
  | "Friesland"
  | "Drenthe"
  | "Overijssel"
  | "Flevoland"
  | "Gelderland"
  | "Utrecht"
  | "Noord-Holland"
  | "Zuid-Holland"
  | "Zeeland"
  | "Noord-Brabant"
  | "Limburg"

/** North to south, the order the provinces are usually listed in. */
export const PROVINCES: Province[] = [
  "Groningen",
  "Friesland",
  "Drenthe",
  "Overijssel",
  "Flevoland",
  "Gelderland",
  "Utrecht",
  "Noord-Holland",
  "Zuid-Holland",
  "Zeeland",
  "Noord-Brabant",
  "Limburg",
]

export interface City {
  name: string
  province: Province
  /** Larger places get a page per service; the rest get one page. */
  major: boolean
  lat: number
  lng: number
  /** Well-known districts, neighbourhoods and villages, shown as written locally. */
  districts: string[]
  /** What the housing stock is like; see data/localTraits.ts. */
  traits: TraitId[]
}

export const CITIES: City[] = [
  {
    name: "Amsterdam",
    province: "Noord-Holland",
    major: true,
    lat: 52.3676,
    lng: 4.9041,
    districts: ["Centrum", "Jordaan", "De Pijp", "Oud-Zuid", "Oud-West", "Oost", "IJburg", "Noord", "Nieuw-West", "Zuidoost"],
    traits: ["monuments", "prewar", "woodenPiles", "apartments", "busyCentre"],
  },
  {
    name: "Rotterdam",
    province: "Zuid-Holland",
    major: true,
    lat: 51.9225,
    lng: 4.4792,
    districts: ["Centrum", "Kralingen", "Hillegersberg", "Blijdorp", "Oude Noorden", "Delfshaven", "Kop van Zuid", "Feijenoord", "Charlois", "IJsselmonde", "Prins Alexander", "Overschie"],
    traits: ["postwar", "prewar", "woodenPiles", "apartments", "busyCentre"],
  },
  {
    name: "Den Haag",
    province: "Zuid-Holland",
    major: true,
    lat: 52.0705,
    lng: 4.3007,
    districts: ["Centrum", "Scheveningen", "Statenkwartier", "Duinoord", "Benoordenhout", "Bezuidenhout", "Segbroek", "Loosduinen", "Escamp", "Laak", "Ypenburg", "Leidschenveen"],
    traits: ["prewar", "monuments", "apartments", "coast", "newbuild"],
  },
  {
    name: "Utrecht",
    province: "Utrecht",
    major: true,
    lat: 52.0907,
    lng: 5.1214,
    districts: ["Binnenstad", "Wittevrouwen", "Lombok", "Oost", "Zuid", "Tuindorp", "Overvecht", "Kanaleneiland", "Lunetten", "Leidsche Rijn", "Vleuten", "De Meern"],
    traits: ["monuments", "prewar", "students", "newbuild", "busyCentre"],
  },
  {
    name: "Eindhoven",
    province: "Noord-Brabant",
    major: true,
    lat: 51.4416,
    lng: 5.4697,
    districts: ["Centrum", "Strijp", "Stratum", "Gestel", "Tongelre", "Woensel-Zuid", "Woensel-Noord", "Meerhoven"],
    traits: ["industrial", "prewar", "postwar", "newbuild"],
  },
  {
    name: "Groningen",
    province: "Groningen",
    major: true,
    lat: 53.2194,
    lng: 6.5665,
    districts: ["Binnenstad", "Oosterpoort", "Schildersbuurt", "Helpman", "Korrewegwijk", "Paddepoel", "Selwerd", "Vinkhuizen", "Beijum", "Lewenborg", "Meerstad", "Haren"],
    traits: ["monuments", "prewar", "students", "gasExtraction"],
  },
  {
    name: "Tilburg",
    province: "Noord-Brabant",
    major: true,
    lat: 51.5555,
    lng: 5.0913,
    districts: ["Centrum", "Oud-Noord", "Oud-Zuid", "Noord", "West", "Zuid", "Reeshof", "Berkel-Enschot", "Udenhout"],
    traits: ["industrial", "prewar", "seventies", "students"],
  },
  {
    name: "Almere",
    province: "Flevoland",
    major: true,
    lat: 52.3508,
    lng: 5.2647,
    districts: ["Almere Haven", "Almere Stad", "Almere Buiten", "Almere Hout", "Almere Poort", "Almere Pampus", "Oosterwold"],
    traits: ["newTown", "seventies", "newbuild"],
  },
  {
    name: "Breda",
    province: "Noord-Brabant",
    major: true,
    lat: 51.5719,
    lng: 4.7683,
    districts: ["Centrum", "Ginneken", "Princenhage", "Heuvel", "Belcrum", "Haagse Beemden", "Hoge Vucht", "Bavel", "Teteringen", "Prinsenbeek"],
    traits: ["monuments", "prewar", "villas", "seventies", "busyCentre"],
  },
  {
    name: "Nijmegen",
    province: "Gelderland",
    major: true,
    lat: 51.8126,
    lng: 5.8372,
    districts: ["Centrum", "Oost", "Bottendaal", "Hunnerberg", "Hazenkamp", "Hatert", "Dukenburg", "Lindenholt", "Lent", "Oosterhout"],
    traits: ["monuments", "prewar", "seventies", "students", "newbuild"],
  },
  {
    name: "Apeldoorn",
    province: "Gelderland",
    major: true,
    lat: 52.2112,
    lng: 5.9699,
    districts: ["Centrum", "Apeldoorn-Zuid", "Apeldoorn-Noord", "Apeldoorn-Oost", "De Maten", "Zevenhuizen", "Zuidbroek", "Ugchelen", "Beekbergen", "Loenen"],
    traits: ["villas", "seventies", "newbuild"],
  },
  {
    name: "Arnhem",
    province: "Gelderland",
    major: true,
    lat: 51.9851,
    lng: 5.8987,
    districts: ["Centrum", "Sonsbeek", "Burgemeesterswijk", "Spijkerkwartier", "Klarendal", "Geitenkamp", "Presikhaaf", "Malburgen", "Rijkerswoerd", "Schuytgraaf", "Elden"],
    traits: ["prewar", "villas", "postwar", "newbuild"],
  },
  {
    name: "Haarlem",
    province: "Noord-Holland",
    major: true,
    lat: 52.3874,
    lng: 4.6462,
    districts: ["Centrum", "Haarlem-Noord", "Kleverpark", "Koninginnebuurt", "Haarlem-Oost", "Schalkwijk", "Zuid-West", "Spaarndam"],
    traits: ["monuments", "prewar", "seventies", "busyCentre"],
  },
  {
    name: "Hoofddorp",
    province: "Noord-Holland",
    major: true,
    lat: 52.3061,
    lng: 4.6907,
    districts: ["Centrum", "Bornholm", "Overbos", "Toolenburg", "Floriande", "Graan voor Visch", "Nieuw-Vennep", "Badhoevedorp"],
    traits: ["seventies", "newbuild"],
  },
  {
    name: "Amersfoort",
    province: "Utrecht",
    major: true,
    lat: 52.1561,
    lng: 5.3878,
    districts: ["Binnenstad", "Bergkwartier", "Leusderkwartier", "Soesterkwartier", "Schothorst", "Kattenbroek", "Nieuwland", "Vathorst", "Hoogland", "Hooglanderveen"],
    traits: ["monuments", "prewar", "seventies", "newbuild"],
  },
  {
    name: "Zaanstad",
    province: "Noord-Holland",
    major: true,
    lat: 52.442,
    lng: 4.8292,
    districts: ["Zaandam", "Koog aan de Zaan", "Zaandijk", "Wormerveer", "Krommenie", "Westzaan", "Assendelft"],
    traits: ["woodenHouses", "industrial", "woodenPiles", "postwar"],
  },
  {
    name: "Enschede",
    province: "Overijssel",
    major: true,
    lat: 52.2215,
    lng: 6.8937,
    districts: ["Centrum", "Roombeek", "Pathmos", "Lasonder", "Boswinkel", "Wesselerbrink", "Stroinkslanden", "Helmerhoek", "De Eschmarke", "Glanerbrug"],
    traits: ["industrial", "prewar", "postwar", "seventies", "students"],
  },
  {
    name: "'s-Hertogenbosch",
    province: "Noord-Brabant",
    major: true,
    lat: 51.6978,
    lng: 5.3037,
    districts: ["Binnenstad", "Het Zand", "Muntel", "Vliert", "Graafsewijk", "De Hambaken", "Maaspoort", "Rosmalen", "Empel", "De Groote Wielen"],
    traits: ["monuments", "prewar", "postwar", "newbuild", "busyCentre"],
  },
  {
    name: "Zwolle",
    province: "Overijssel",
    major: true,
    lat: 52.5168,
    lng: 6.083,
    districts: ["Binnenstad", "Assendorp", "Diezerpoort", "Wipstrik", "Holtenbroek", "Aa-landen", "Westenholte", "Stadshagen", "Zwolle-Zuid"],
    traits: ["monuments", "prewar", "postwar", "newbuild"],
  },
  {
    name: "Zoetermeer",
    province: "Zuid-Holland",
    major: true,
    lat: 52.0575,
    lng: 4.4931,
    districts: ["Dorp", "Palenstein", "Meerzicht", "Driemanspolder", "Buytenwegh", "De Leyens", "Seghwaert", "Noordhove", "Rokkeveen", "Oosterheem"],
    traits: ["newTown", "seventies", "newbuild"],
  },
  {
    name: "Leiden",
    province: "Zuid-Holland",
    major: true,
    lat: 52.1601,
    lng: 4.497,
    districts: ["Binnenstad", "Professorenwijk", "Burgemeesterswijk", "Leiden-Noord", "Roodenburg", "Morsweg", "Merenwijk", "Stevenshof", "Bos- en Gasthuisdistrict"],
    traits: ["monuments", "woodenPiles", "students", "busyCentre"],
  },
  {
    name: "Leeuwarden",
    province: "Friesland",
    major: true,
    lat: 53.2012,
    lng: 5.7999,
    districts: ["Binnenstad", "Oud-Oost", "Huizum", "Bilgaard", "Vrijheidswijk", "Camminghaburen", "Zuiderburen", "Nijlân", "De Zuidlanden"],
    traits: ["monuments", "prewar", "postwar", "seventies", "newbuild"],
  },
  {
    name: "Maastricht",
    province: "Limburg",
    major: true,
    lat: 50.8514,
    lng: 5.691,
    districts: ["Binnenstad", "Jekerkwartier", "Wyck", "Céramique", "Sint Pieter", "Randwyck", "Heer", "Amby", "Scharn", "Malberg", "Daalhof", "Caberg"],
    traits: ["monuments", "postwar", "students", "busyCentre"],
  },
  {
    name: "Dordrecht",
    province: "Zuid-Holland",
    major: true,
    lat: 51.8133,
    lng: 4.6901,
    districts: ["Binnenstad", "Reeland", "Krispijn", "Wielwijk", "Crabbehof", "Zuidhoven", "Sterrenburg", "Stadspolders", "Dubbeldam"],
    traits: ["monuments", "prewar", "postwar", "seventies"],
  },
  {
    name: "Ede",
    province: "Gelderland",
    major: true,
    lat: 52.0402,
    lng: 5.6649,
    districts: ["Centrum", "Ede-Zuid", "Ede-West", "Veldhuizen", "Rietkampen", "Kernhem", "Bennekom", "Lunteren", "Ederveen", "Otterlo"],
    traits: ["postwar", "seventies", "newbuild"],
  },
  {
    name: "Alkmaar",
    province: "Noord-Holland",
    major: true,
    lat: 52.6324,
    lng: 4.7534,
    districts: ["Binnenstad", "Oudorp", "De Hoef", "Overdie", "Huiswaard", "Daalmeer", "Koedijk", "De Mare", "Vroonermeer", "Graft-De Rijp"],
    traits: ["monuments", "prewar", "postwar", "seventies", "busyCentre"],
  },
  {
    name: "Emmen",
    province: "Drenthe",
    major: true,
    lat: 52.7792,
    lng: 6.9061,
    districts: ["Centrum", "Angelslo", "Emmerhout", "Bargeres", "Rietlanden", "Delftlanden", "Klazienaveen", "Emmer-Compascuum", "Nieuw-Amsterdam", "Schoonebeek"],
    traits: ["seventies", "postwar", "newbuild"],
  },
  {
    name: "Delft",
    province: "Zuid-Holland",
    major: true,
    lat: 52.0116,
    lng: 4.3571,
    districts: ["Binnenstad", "Hof van Delft", "Vrijenban", "Wippolder", "Voordijkshoorn", "Voorhof", "Buitenhof", "Tanthof"],
    traits: ["monuments", "woodenPiles", "students", "postwar", "busyCentre"],
  },
  {
    name: "Deventer",
    province: "Overijssel",
    major: true,
    lat: 52.255,
    lng: 6.1639,
    districts: ["Binnenstad", "Bergkwartier", "Voorstad", "Zandweerd", "Keizerslanden", "Borgele", "Platvoet", "Colmschate", "Vijfhoek", "Bathmen"],
    traits: ["monuments", "prewar", "postwar", "seventies"],
  },
  {
    name: "Amstelveen",
    province: "Noord-Holland",
    major: true,
    lat: 52.3114,
    lng: 4.8701,
    districts: ["Stadshart", "Elsrijk", "Randwijck", "Keizer Karelpark", "Bankras-Kostverloren", "Groenelaan", "Middenhoven", "Westwijk", "Bovenkerk", "Nes aan de Amstel"],
    traits: ["postwar", "seventies", "apartments"],
  },
  {
    name: "Hilversum",
    province: "Noord-Holland",
    major: true,
    lat: 52.2292,
    lng: 5.1669,
    districts: ["Centrum", "Trompenberg", "Boomberg", "Kleine Driftbuurt", "Electrobuurt", "Over 't Spoor", "Erfgooiersbuurt", "Kerkelanden", "Hilversumse Meent"],
    traits: ["villas", "prewar", "monuments", "postwar"],
  },
  {
    name: "Venlo",
    province: "Limburg",
    major: true,
    lat: 51.3704,
    lng: 6.1724,
    districts: ["Binnenstad", "Venlo-Oost", "Venlo-Zuid", "Blerick", "Tegelen", "Belfeld", "Arcen", "Velden"],
    traits: ["postwar", "prewar", "seventies"],
  },
  {
    name: "Helmond",
    province: "Noord-Brabant",
    major: true,
    lat: 51.4793,
    lng: 5.657,
    districts: ["Centrum", "Helmond-Noord", "Helmond-Oost", "Helmond-West", "Mierlo-Hout", "Rijpelberg", "Brouwhuis", "Stiphout", "Dierdonk", "Brandevoort"],
    traits: ["industrial", "postwar", "seventies", "newbuild"],
  },
  {
    name: "Oss",
    province: "Noord-Brabant",
    major: true,
    lat: 51.765,
    lng: 5.5181,
    districts: ["Centrum", "Ussen", "Schadewijk", "Ruwaard", "Berghem", "Ravenstein", "Lith", "Megen"],
    traits: ["industrial", "postwar", "seventies"],
  },
  {
    name: "Heerlen",
    province: "Limburg",
    major: true,
    lat: 50.8882,
    lng: 5.9795,
    districts: ["Centrum", "Heerlerbaan", "Heerlerheide", "Hoensbroek", "Meezenbroek", "Schandelen", "Welten", "Molenberg"],
    traits: ["industrial", "prewar", "postwar"],
  },
  {
    name: "Hengelo",
    province: "Overijssel",
    major: true,
    lat: 52.2659,
    lng: 6.7932,
    districts: ["Centrum", "'t Lansink", "Berflo Es", "Groot Driene", "Hasseler Es", "Woolde", "Slangenbeek"],
    traits: ["industrial", "prewar", "postwar"],
  },
  {
    name: "Purmerend",
    province: "Noord-Holland",
    major: true,
    lat: 52.505,
    lng: 4.9592,
    districts: ["Centrum", "Overwhere", "Wheermolen", "Weidevenne", "Purmer", "Gors", "Where", "Middenbeemster"],
    traits: ["newTown", "seventies", "newbuild"],
  },
  {
    name: "Lelystad",
    province: "Flevoland",
    major: true,
    lat: 52.5185,
    lng: 5.4714,
    districts: ["Centrum", "Atolwijk", "Waterwijk", "Boswijk", "Zuiderzeewijk", "Bolder", "Lelystad-Haven", "Hollandse Hout", "Warande"],
    traits: ["newTown", "seventies", "newbuild"],
  },
  {
    name: "Gouda",
    province: "Zuid-Holland",
    major: true,
    lat: 52.0115,
    lng: 4.7105,
    districts: ["Binnenstad", "Korte Akkeren", "Kort Haarlem", "Oosterwei", "Plaswijck", "Bloemendaal", "Goverwelle", "Westergouwe"],
    traits: ["monuments", "woodenPiles", "postwar", "seventies", "busyCentre"],
  },
  {
    name: "Alphen aan den Rijn",
    province: "Zuid-Holland",
    major: true,
    lat: 52.1292,
    lng: 4.6588,
    districts: ["Centrum", "Kerk en Zanen", "Ridderveld", "Ellekoot", "Oudshoorn", "Boskoop", "Hazerswoude-Dorp", "Koudekerk aan den Rijn", "Aarlanderveen"],
    traits: ["postwar", "seventies"],
  },
  {
    name: "Schiedam",
    province: "Zuid-Holland",
    major: true,
    lat: 51.9192,
    lng: 4.3889,
    districts: ["Centrum", "Oost", "West", "Nieuwland", "Groenoord", "Kethel", "Woudhoek", "Spaland"],
    traits: ["monuments", "prewar", "postwar", "seventies"],
  },
  {
    name: "Nieuwegein",
    province: "Utrecht",
    major: true,
    lat: 52.029,
    lng: 5.0819,
    districts: ["Stadscentrum", "Vreeswijk", "Jutphaas", "Batau", "Fokkesteeg", "Zuilenstein", "Galecop", "Hoog-Zandveld", "Doorslag", "Merwestein"],
    traits: ["newTown", "seventies"],
  },
  {
    name: "Middelburg",
    province: "Zeeland",
    major: true,
    lat: 51.4988,
    lng: 3.6136,
    districts: ["Binnenstad", "Dauwendaele", "Magistraatwijk", "Stromenwijk", "Mortiere", "Arnemuiden", "Nieuw- en Sint Joosland"],
    traits: ["monuments", "coast", "prewar", "postwar"],
  },
  {
    name: "Assen",
    province: "Drenthe",
    major: true,
    lat: 52.9925,
    lng: 6.5649,
    districts: ["Centrum", "Assen-Oost", "Pittelo", "Lariks", "Noorderpark", "Marsdijk", "Peelo", "Kloosterveen"],
    traits: ["postwar", "seventies", "newbuild"],
  },
  {
    name: "Hoorn",
    province: "Noord-Holland",
    major: true,
    lat: 52.6424,
    lng: 5.0599,
    districts: ["Binnenstad", "Grote Waal", "Kersenboogerd", "Risdam", "Bangert en Oosterpolder", "Zwaag", "Blokker"],
    traits: ["monuments", "seventies", "newbuild"],
  },
  {
    name: "Roermond",
    province: "Limburg",
    major: true,
    lat: 51.1942,
    lng: 5.987,
    districts: ["Binnenstad", "Maasniel", "Herten", "Kapel in 't Zand", "De Kemp", "Donderberg", "Swalmen"],
    traits: ["monuments", "prewar", "postwar"],
  },
  {
    name: "Doetinchem",
    province: "Gelderland",
    major: true,
    lat: 51.9654,
    lng: 6.2886,
    districts: ["Centrum", "De Huet", "Overstegen", "Dichteren", "Wijnbergen", "Gaanderen", "Wehl"],
    traits: ["postwar", "seventies"],
  },
  {
    name: "Soest",
    province: "Utrecht",
    major: false,
    lat: 52.1734,
    lng: 5.2919,
    districts: ["Soest-Zuid", "Soestdijk", "Soesterberg", "Soestduinen"],
    traits: ["villas", "postwar"],
  },
  {
    name: "Leusden",
    province: "Utrecht",
    major: false,
    lat: 52.1325,
    lng: 5.4306,
    districts: ["Leusden-Centrum", "Leusden-Zuid", "Achterveld", "Stoutenburg"],
    traits: ["seventies"],
  },
  {
    name: "Baarn",
    province: "Utrecht",
    major: false,
    lat: 52.2113,
    lng: 5.2876,
    districts: ["Centrum", "Lage Vuursche", "Eembrugge"],
    traits: ["villas", "monuments"],
  },
  {
    name: "Hoevelaken",
    province: "Gelderland",
    major: false,
    lat: 52.1739,
    lng: 5.4597,
    districts: [],
    traits: ["seventies"],
  },
  {
    name: "Nijkerk",
    province: "Gelderland",
    major: false,
    lat: 52.2203,
    lng: 5.4864,
    districts: ["Centrum", "Nijkerkerveen", "Hoevelaken"],
    traits: ["postwar", "seventies"],
  },
  {
    name: "Zeist",
    province: "Utrecht",
    major: false,
    lat: 52.0894,
    lng: 5.2372,
    districts: ["Centrum", "Zeist-West", "Zeist-Noord", "Kerckebosch", "Den Dolder", "Huis ter Heide", "Austerlitz", "Bosch en Duin"],
    traits: ["villas", "monuments", "postwar"],
  },
  {
    name: "Veenendaal",
    province: "Utrecht",
    major: false,
    lat: 52.0277,
    lng: 5.5587,
    districts: ["Centrum", "Dragonder", "Veenendaal-Oost", "Petenbos", "Dichterswijk", "Engelenburg", "Franse Gats"],
    traits: ["postwar", "seventies", "newbuild"],
  },
  {
    name: "Bussum",
    province: "Noord-Holland",
    major: false,
    lat: 52.2734,
    lng: 5.1612,
    districts: ["Centrum", "Het Spiegel", "Bussum-Zuid"],
    traits: ["villas", "prewar", "postwar"],
  },
  {
    name: "Naarden",
    province: "Noord-Holland",
    major: false,
    lat: 52.2953,
    lng: 5.1622,
    districts: ["Naarden-Vesting"],
    traits: ["monuments", "postwar"],
  },
  {
    name: "Harderwijk",
    province: "Gelderland",
    major: false,
    lat: 52.3415,
    lng: 5.6206,
    districts: ["Binnenstad", "Stadsweiden", "Frankrijk", "Tweelingstad", "Drielanden", "Waterfront", "Hierden"],
    traits: ["monuments", "postwar", "newbuild"],
  },
  {
    name: "Barneveld",
    province: "Gelderland",
    major: false,
    lat: 52.1396,
    lng: 5.5858,
    districts: ["Centrum", "Voorthuizen", "Kootwijkerbroek", "Garderen", "Stroe", "De Glind"],
    traits: ["postwar", "newbuild"],
  },
]

/** Places that get a page per service, in list order (largest first). */
export const MAJOR_CITIES: City[] = CITIES.filter((city) => city.major)

const CITY_BY_NAME = new Map(CITIES.map((city) => [city.name, city]))

export function cityByName(name: string): City | undefined {
  return CITY_BY_NAME.get(name)
}

/** Straight-line distance in km; accurate enough to sort neighbours. */
function distanceKm(a: City, b: City): number {
  const rad = Math.PI / 180
  const x = (b.lng - a.lng) * rad * Math.cos(((a.lat + b.lat) / 2) * rad)
  const y = (b.lat - a.lat) * rad
  return Math.sqrt(x * x + y * y) * 6371
}

/** The places closest to `city`, nearest first. */
export function nearbyCities(city: City, count: number, pool: City[] = CITIES): City[] {
  return pool
    .filter((other) => other.name !== city.name)
    .map((other) => ({ other, km: distanceKm(city, other) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count)
    .map(({ other }) => other)
}

/** "A, B en C" in the visitor's language; `and` is the translated word. */
export function listJoin(items: string[], and: string): string {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`
}

export const SERVICES_LIST = [
  "Renovatie",
  "Afbouw",
  "Schilderwerk",
  "Gevel & Buitenwerk",
  "Montage",
  "Onderhoud & Reparatie",
  "Badkamer & Keuken",
  "Uitbouw & Aanbouw",
  "Dakkapel & Zolder",
  "Algemene Bouwwerkzaamheden",
  "Loodgieter",
  "Elektricien",
  "Timmerman",
  "Timmerbedrijf",
  "Klusjesman",
  "Klusbedrijf",
] as const

export type ServiceName = (typeof SERVICES_LIST)[number]
