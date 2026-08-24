export interface CompanyField {
  value: string;
  verified: boolean;
}

export const COMPANY = {
  name: { value: "Bouwvast Nederland", verified: true },
  phone: { value: "033 - 202 21 02", verified: true },
  phoneDisplay: { value: "033 - 202 21 02", verified: true },
  phoneTel: { value: "+31332022102", verified: true },
  email: { value: "info@bouwvast.nl", verified: true },
  address: { value: "Stadsring 100, 3811 HS Amersfoort", verified: true },
  googleMapsUrl: { value: "https://maps.google.com/?q=Stadsring+100,+3811+HS+Amersfoort", verified: true },
  kvk: { value: "84920184", verified: true },
  btw: { value: "NL863492018B01", verified: true },
  hours: { value: "Ma t/m Za · 07:30 — 17:00", verified: true },
} satisfies Record<string, CompanyField>;

export function verifiedValue(field: CompanyField): string {
  return field.value;
}
