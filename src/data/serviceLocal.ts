import type { Localized } from "../i18n/LangContext"
import type { ServiceGroup } from "./localTraits"

/**
 * How each service is named on its page per place (/werkgebied/<plaats>/<dienst>/):
 * the wording people actually search for ("Loodgieter in Utrecht"), the
 * kind of work it is (which local tips apply) and a noun for sentences.
 * Nouns are in the form that fits "{noun} in {city}" in each language.
 */
export interface ServiceLocal {
  group: ServiceGroup
  title: Localized<string>
  noun: Localized<string>
  /** Sitemap priority: the larger jobs first. */
  priority: number
}

export const SERVICE_LOCAL: Record<string, ServiceLocal> = {
  renovatie: {
    group: "build",
    priority: 0.8,
    title: { nl: "Woningrenovatie in {city}", en: "Home renovation in {city}", uk: "Ремонт житла у {city}", ru: "Ремонт жилья в {city}" },
    noun: { nl: "een woningrenovatie", en: "a home renovation", uk: "ремонт житла", ru: "ремонт жилья" },
  },
  "badkamer-keuken": {
    group: "wet",
    priority: 0.8,
    title: {
      nl: "Badkamer- en keukenrenovatie in {city}",
      en: "Bathroom and kitchen renovation in {city}",
      uk: "Ремонт ванної та кухні у {city}",
      ru: "Ремонт ванной и кухни в {city}",
    },
    noun: {
      nl: "een nieuwe badkamer of keuken",
      en: "a new bathroom or kitchen",
      uk: "нова ванна кімната чи кухня",
      ru: "новая ванная или кухня",
    },
  },
  "uitbouw-aanbouw": {
    group: "build",
    priority: 0.8,
    title: {
      nl: "Uitbouw of aanbouw in {city}",
      en: "House extension in {city}",
      uk: "Прибудова до будинку у {city}",
      ru: "Пристройка к дому в {city}",
    },
    noun: { nl: "een uitbouw of aanbouw", en: "an extension", uk: "прибудова", ru: "пристройка" },
  },
  "dakkapel-zolder": {
    group: "outside",
    priority: 0.75,
    title: {
      nl: "Dakkapel en zolderverbouwing in {city}",
      en: "Dormer and loft conversion in {city}",
      uk: "Дормер і облаштування горища у {city}",
      ru: "Дормер и обустройство чердака в {city}",
    },
    noun: {
      nl: "een dakkapel of zolderverbouwing",
      en: "a dormer or loft conversion",
      uk: "дормер чи облаштування горища",
      ru: "дормер или обустройство чердака",
    },
  },
  algemeen: {
    group: "build",
    priority: 0.75,
    title: {
      nl: "Aannemer in {city}",
      en: "Building contractor in {city}",
      uk: "Будівельний підрядник у {city}",
      ru: "Строительный подрядчик в {city}",
    },
    noun: { nl: "een verbouwing", en: "a building project", uk: "будівельні роботи", ru: "строительные работы" },
  },
  afbouw: {
    group: "build",
    priority: 0.6,
    title: {
      nl: "Afbouw en stucwerk in {city}",
      en: "Finishing and plastering in {city}",
      uk: "Оздоблення та штукатурка у {city}",
      ru: "Отделка и штукатурка в {city}",
    },
    noun: { nl: "afbouw- en stucwerk", en: "finishing and plastering", uk: "оздоблення та штукатурка", ru: "отделка и штукатурка" },
  },
  "gevel-buitenwerk": {
    group: "outside",
    priority: 0.6,
    title: {
      nl: "Gevel- en metselwerk in {city}",
      en: "Facade and brickwork in {city}",
      uk: "Фасадні та мурувальні роботи у {city}",
      ru: "Фасадные и каменные работы в {city}",
    },
    noun: {
      nl: "gevel- en metselwerk",
      en: "facade and brickwork",
      uk: "фасадні та мурувальні роботи",
      ru: "фасадные и каменные работы",
    },
  },
  schilderwerk: {
    group: "outside",
    priority: 0.6,
    title: { nl: "Schilder in {city}", en: "Painter and decorator in {city}", uk: "Маляр у {city}", ru: "Маляр в {city}" },
    noun: {
      nl: "schilderwerk binnen of buiten",
      en: "interior or exterior painting",
      uk: "малярні роботи всередині чи зовні",
      ru: "малярные работы внутри или снаружи",
    },
  },
  timmerman: {
    group: "outside",
    priority: 0.6,
    title: { nl: "Timmerman in {city}", en: "Carpenter in {city}", uk: "Тесля у {city}", ru: "Плотник в {city}" },
    noun: { nl: "timmerwerk", en: "carpentry", uk: "теслярські роботи", ru: "плотницкие работы" },
  },
  loodgieter: {
    group: "wet",
    priority: 0.6,
    title: { nl: "Loodgieter in {city}", en: "Plumber in {city}", uk: "Сантехнік у {city}", ru: "Сантехник в {city}" },
    noun: { nl: "loodgieterswerk", en: "plumbing", uk: "сантехнічні роботи", ru: "сантехнические работы" },
  },
  "onderhoud-reparatie": {
    group: "build",
    priority: 0.55,
    title: {
      nl: "Onderhoud en schadeherstel in {city}",
      en: "Maintenance and repairs in {city}",
      uk: "Обслуговування та ремонт пошкоджень у {city}",
      ru: "Обслуживание и ремонт повреждений в {city}",
    },
    noun: { nl: "onderhoud of een reparatie", en: "maintenance or a repair", uk: "обслуговування чи ремонт", ru: "обслуживание или ремонт" },
  },
  montage: {
    group: "build",
    priority: 0.55,
    title: {
      nl: "Montage en afwerking in {city}",
      en: "Installation and finishing in {city}",
      uk: "Монтаж і оздоблення у {city}",
      ru: "Монтаж и отделка в {city}",
    },
    noun: { nl: "montage en afwerking", en: "installation and finishing", uk: "монтаж і оздоблення", ru: "монтаж и отделка" },
  },
}

/** Fills {city} in a localized title or noun. */
export function withCity(text: string, city: string): string {
  return text.split("{city}").join(city)
}

/** First letter upper case, for nouns that start a sentence. */
export function capitalize(text: string): string {
  return text ? text.charAt(0).toLocaleUpperCase() + text.slice(1) : text
}
