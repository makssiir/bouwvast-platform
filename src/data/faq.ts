import type { TranslationKey } from "../i18n/translations"

export interface FaqEntry {
  q: string
  a: string
}

const KEYS: [TranslationKey, TranslationKey][] = [
  ["faq_1_q", "faq_1_a"],
  ["faq_2_q", "faq_2_a"],
  ["faq_1b_q", "faq_1b_a"],
  ["faq_2b_q", "faq_2b_a"],
  ["faq_3_q", "faq_3_a"],
  ["faq_4_q", "faq_4_a"],
]

/** One source for both the rendered list and the FAQPage structured data. */
export function faqEntries(t: (key: TranslationKey) => string): FaqEntry[] {
  return KEYS.map(([question, answer]) => ({ q: t(question), a: t(answer) }))
}
