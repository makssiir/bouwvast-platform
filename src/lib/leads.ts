import type { Lang } from "../i18n/translations";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  postcode: string;
  service: string;
  description: string;
  photos: string;
  preferredDate: string | null;
  preferredTime: string;
  language: Lang;
  sourcePage: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  createdAt: string;
}

export async function submitLead(lead: Lead): Promise<void> {
  await Promise.resolve(lead);
}
