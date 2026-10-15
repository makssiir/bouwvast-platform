import type { Localized } from "../i18n/LangContext"
import type { LeadField } from "./leadSchema.ts"

type Pick = <T>(copy: Localized<T>) => T

/** Turns a validation code from lib/leadSchema.ts into a sentence for the visitor. */
export function leadFieldMessage(field: LeadField, code: string | undefined, pick: Pick): string | undefined {
  if (!code) return undefined
  if (field === "phone" && code === "invalid") {
    return pick({
      nl: "Vul een geldig telefoonnummer in, bijvoorbeeld 06 12345678.",
      en: "Enter a valid phone number, e.g. +31 6 12345678.",
      uk: "Введіть дійсний номер телефону, напр. +31 6 12345678.",
      ru: "Введите действительный номер телефона, напр. +31 6 12345678.",
    })
  }
  if (field === "email" && code === "invalid") {
    return pick({
      nl: "Vul een geldig e-mailadres in of laat het veld leeg.",
      en: "Enter a valid email address or leave it empty.",
      uk: "Введіть дійсну e-mail адресу або залиште поле порожнім.",
      ru: "Введите действительный e-mail или оставьте поле пустым.",
    })
  }
  if (code === "required") {
    return pick({ nl: "Dit veld is verplicht.", en: "This field is required.", uk: "Це поле обов'язкове.", ru: "Это поле обязательно." })
  }
  if (code === "too_short") return pick({ nl: "Dit is te kort.", en: "This is too short.", uk: "Занадто коротко.", ru: "Слишком коротко." })
  if (code === "too_long") return pick({ nl: "Dit is te lang.", en: "This is too long.", uk: "Занадто довго.", ru: "Слишком длинно." })
  return pick({ nl: "Controleer dit veld.", en: "Please check this field.", uk: "Перевірте це поле.", ru: "Проверьте это поле." })
}
