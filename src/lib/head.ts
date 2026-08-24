import type { Lang } from "../i18n/translations";

const SITE_NAME = "Bouwvast";
const ORIGIN = typeof window !== "undefined" ? window.location.origin : "";

/** Map our internal lang codes to valid BCP-47 attribute values. */
const HTML_LANG: Record<Lang, string> = { nl: "nl", en: "en", uk: "uk", ru: "ru" };

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export interface PageMeta {
  title: string;
  description: string;
  /** Path fragment used for canonical URL, e.g. "diensten" or "stad/amersfoort". */
  path: string;
}

/** Sync <title>, meta description and canonical/lang for the active page. */
export function applyPageMeta(lang: Lang, { title, description, path }: PageMeta) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  document.title = fullTitle;
  document.documentElement.lang = HTML_LANG[lang];

  upsertMeta('meta[name="description"]', "name", "description", description);
  upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
  upsertMeta('meta[property="og:description"]', "property", "og:description", description);
  upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
  upsertMeta('meta[property="og:locale"]', "property", "og:locale", HTML_LANG[lang]);

  const canonical = `${ORIGIN}/${path}`.replace(/\/+$/, "") || ORIGIN;
  upsertLink("canonical", canonical);
}
