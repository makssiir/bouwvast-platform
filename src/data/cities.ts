export interface City {
  name: string;
  province: string;
  region: string;
}

export const CITIES: City[] = [
  // Grote steden van Nederland (Top Metropolen & Regio's)
  { name: "Amsterdam", province: "Noord-Holland", region: "groot" },
  { name: "Rotterdam", province: "Zuid-Holland", region: "groot" },
  { name: "Den Haag", province: "Zuid-Holland", region: "groot" },
  { name: "Utrecht", province: "Utrecht", region: "groot" },
  { name: "Eindhoven", province: "Noord-Brabant", region: "groot" },
  { name: "Groningen", province: "Groningen", region: "groot" },
  { name: "Tilburg", province: "Noord-Brabant", region: "groot" },
  { name: "Almere", province: "Flevoland", region: "groot" },
  { name: "Breda", province: "Noord-Brabant", region: "groot" },
  { name: "Nijmegen", province: "Gelderland", region: "groot" },
  { name: "Apeldoorn", province: "Gelderland", region: "groot" },
  { name: "Arnhem", province: "Gelderland", region: "groot" },
  { name: "Haarlem", province: "Noord-Holland", region: "groot" },
  { name: "Enschede", province: "Overijssel", region: "groot" },
  { name: "Amersfoort", province: "Utrecht", region: "groot" },
  { name: "Zaanstad", province: "Noord-Holland", region: "groot" },
  { name: "'s-Hertogenbosch", province: "Noord-Brabant", region: "groot" },
  { name: "Zwolle", province: "Overijssel", region: "groot" },
  { name: "Leiden", province: "Zuid-Holland", region: "groot" },
  { name: "Leeuwarden", province: "Friesland", region: "groot" },
  { name: "Maastricht", province: "Limburg", region: "groot" },
  { name: "Dordrecht", province: "Zuid-Holland", region: "groot" },
  { name: "Ede", province: "Gelderland", region: "groot" },
  { name: "Hilversum", province: "Noord-Holland", region: "groot" },

  // Kern & Midden-Nederland
  { name: "Soest", province: "Utrecht", region: "kern" },
  { name: "Leusden", province: "Utrecht", region: "kern" },
  { name: "Zeist", province: "Utrecht", region: "kern" },
  { name: "Baarn", province: "Utrecht", region: "kern" },
  { name: "Hoevelaken", province: "Gelderland", region: "kern" },
  { name: "Nijkerk", province: "Gelderland", region: "kern" },
  { name: "Bussum", province: "Noord-Holland", region: "gooi" },
  { name: "Naarden", province: "Noord-Holland", region: "gooi" },
  { name: "Harderwijk", province: "Gelderland", region: "gelderland" },
  { name: "Barneveld", province: "Gelderland", region: "gelderland" },
  { name: "Veenendaal", province: "Utrecht", region: "utrecht" },
];

export const REGION_LABELS: Record<string, string> = {
  groot: "Grote Steden Nederland",
  kern: "Kernwerkgebied",
  utrecht: "Regio Utrecht",
  gooi: "Gooi & Eemland",
  gelderland: "Gelderland",
};

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
] as const;

export type ServiceName = typeof SERVICES_LIST[number];
