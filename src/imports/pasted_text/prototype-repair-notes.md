# PROMPT — Bouwvast: repair the prototype before extending it

## 0. Read this first

You are not starting a new website. A prototype already exists in this repo and it
**builds cleanly** (`vite build` succeeds, `tsc --noEmit` is silent). The visual design
is largely good and should be preserved.

The problem is not missing features. The problem is that the parts a customer and a
search engine actually rely on are either **dead, fabricated, or blocked**. Fix those
first. Do not add new pages, sections, or animations until Phase 1 passes.

Repo facts you can rely on (verified):

- Stack: Vite 8 + React 19 + Tailwind v4, running inside Figma Make. No router, no SSR.
- 7 page components in `src/pages/`, one `src/components/QuoteForm.tsx`, i18n in `src/i18n/`.
- ~3,000 LOC total. Everything is small enough to change safely.

---

## 0.5 Scope

**This is a lead-generation website for one contractor.** It is not a marketplace, not a
platform, and has no worker-side functionality. Pricing models, master selection, hourly
rates, platform margin, categories beyond what this contractor delivers, and any
worker-facing flow are out of scope — see §6.

Business decisions already taken by the owner, treat as fixed:

- **The form is the lead channel.** Not WhatsApp, not phone-first. See §1.5.
- **No custom CRM.** An existing cheap/free CRM will be selected later. The site's job is
  to produce a clean lead payload and hand it off. See §1.1.
- **Speed of response is the product.** The form must notify a human immediately.

### Demo cut — if a demo is due before this whole document can be executed

Do these seven and stop. They are all inside the current Figma Make repo, need no
migration, and take roughly one working session:

1. Render `QuoteForm` on the homepage (directly below the hero) and on the contact page.
2. Header CTA: WhatsApp → **"Offerte aanvragen"**, scrolls to the form. Mobile bottom bar:
   form primary, phone secondary, WhatsApp gone.
3. Delete the fabricated KvK, BTW, phone number, address, `Vanaf €45/uur`, and the
   "U betaalt pas als het werk naar wens is uitgevoerd" guarantee (§1.3).
4. Reduce the language switcher to NL + EN (§1.2). One line change; prevents the demo
   showing German or Polish copy, or three languages on one screen.
5. Fix `reinigung` → `reiniging` in the three Dutch strings (§1.7).
6. Hide the before/after slider — it currently pairs two unrelated stock photos (§1.4).
7. `htmlFor`/`id` on every form field and a visible focus ring (§1.6).

State out loud in the demo that the nine portfolio projects are visual placeholders with
stock photography, not this contractor's work. Do not let a viewer assume otherwise.

---

## 1. Blocking defects — fix these in order, nothing else first

Each item lists the evidence. Verify it yourself before changing it; if the repo
contradicts this list, trust the repo and say so.

### 1.1 The lead form does not exist on the live site

`QuoteForm` is imported at `src/pages/HomePage.tsx:3` and **never rendered**. It appears
in no page's JSX. `ContactPage.tsx` contains **no form at all** — it routes every visitor
to WhatsApp, phone, or email. `CityPage.tsx` has a separate 4-field inline form.

So the site's stated primary conversion mechanism ships as dead code, and there are two
competing form implementations neither of which is the real one.

Required:
- One form component. Delete the `CityPage` inline form and reuse `QuoteForm`.
- Render it on: homepage (above the fold or immediately below the hero), contact page,
  every service page, every city page.
- Fields: name, phone, email, city/postcode, service, description, **photo upload**
  (currently only a dashed grey note saying photos would be nice), preferred start date,
  and a **preferred time window** (ochtend / middag / hele dag / in overleg). The owner
  has specified the request shape as: photos of the work + type of work + preferred time.
- Photo upload is not optional. It is the field that makes a remote estimate possible and
  it is the main reason a visitor would use the form instead of phoning.
- On submit: build a typed `Lead` object and pass it to a single `submitLead()` function in
  `src/lib/leads.ts`. That function may write to console in the prototype, but the call
  site and the payload shape must be production-shaped, not a `console.log` in the
  component.
- **Keep the payload flat, JSON-serialisable, and webhook-shaped.** No custom CRM will be
  built; an off-the-shelf one will be chosen and pointed at this endpoint. Anything that
  cannot be expressed as a flat key/value pair will cost a mapping layer later.
- Success state must set an expectation the owner can actually keep. If no response-time
  commitment has been verified, say what happens next ("we nemen contact op om de klus door
  te nemen"), not how fast.

### 1.2 Two of the four languages are fake

`src/i18n/translations.ts`, bottom of file:

```ts
const contentLang = lang === "uk" || lang === "ru" ? "en" : lang;
```

The UA and RU buttons change the highlighted state and nothing else — the site stays in
English. Worse: the `uk` block contains **German** and the `ru` block contains **Polish**.
200 keys each, wrong language, and unreachable.

`ContactPage.tsx` then works around this with its own inline `words` object holding real
Ukrainian and Russian — a second, parallel translation system. Result: with RU selected,
the contact page shows Russian headings, English navigation, and hardcoded Dutch process
steps and FAQ on the same screen.

Before fixing this, answer who UA/RU is for. **The paying customers are Dutch
homeowners.** Ukrainian and Russian on a customer-facing lead page serve almost no lead
flow — they serve *worker* recruitment, which is a different audience with a different
page and a different CTA.

Required:
- **Customer site: NL + EN only.** Remove UA/RU from the switcher. Two honest languages
  beat four dishonest ones, and the removed ones were never rendering anyway.
- If the owner wants Ukrainian/Russian reach, that becomes a single separate page
  (`/werken-bij` — "Voor vakmensen") with its own CTA, not a language mode on the quote
  funnel. Do not build it in this pass.
- If the owner overrules this and wants four full languages: write genuine Ukrainian and
  Russian for all 200 keys, delete the fallback line, and delete the inline `words` object
  in `ContactPage` so all copy goes through one system. Partial is not an option.

Do not leave a language selectable that is not fully translated. Add a build-time check
that fails if any language block has a key whose value is identical to the English one.

### 1.3 Fabricated company data is rendered as fact

`src/data/contact.ts` and `src/App.tsx` footer currently ship:

| Value | Where | Status |
|---|---|---|
| `+31 6 12 34 56 78` | contact.ts | placeholder pattern rendered as a real number |
| `KvK: 87654321` | App.tsx footer | sequential, not a real registration |
| `BTW: NL864238123B01` | App.tsx footer | unverified VAT number |
| `Bremerbergweg 12, 3817 SG Amersfoort` | contact.ts | street/postcode pairing needs verification |
| `Vanaf €45/uur` (`price_from`) | shown on every city page | invented price |
| `U betaalt pas als het werk naar wens is uitgevoerd` (`city_seo_2`) | every city page | invented payment guarantee |

A fake KvK and BTW number in a public footer is a legal exposure, not a cosmetic issue.
An invented hourly rate and an invented payment guarantee are commercial claims.

Required:
- Move every unverified value into `src/data/company.ts` with an explicit
  `verified: boolean` flag per field.
- Fields marked unverified must **not render**. Render the surrounding component with a
  visible, styled empty state instead (e.g. the footer legal line simply omits KvK/BTW).
- Delete `price_from` entirely and show "Op offerte" everywhere until real pricing exists.
- Delete the payment-guarantee sentence.
- Add a single `TODO-COMPANY-DATA.md` listing exactly which real values the owner must
  supply. One file, not comments scattered across the codebase.

### 1.4 Every image is hotlinked stock photography

All 11 images load from `images.unsplash.com` with no `width`/`height`, no `srcset`, no
`loading="lazy"`. The before/after slider on the homepage compares two **unrelated**
stock scenes: a bathroom as "after" and an exterior-painting photo as "before" — the same
exterior photo is used elsewhere as a separate portfolio project called "Buitenschilderwerk".

The nine "projects" in `ProjectenPage.tsx` and six in `HomePage.tsx` are invented, with
stock photos, invented cities, and invented descriptions.

Required:
- Self-host images in `public/`, serve WebP, set explicit `width`/`height`, add
  `loading="lazy"` to everything below the fold and `fetchpriority="high"` to the hero.
- Replace the invented project list with a `Project[]` data structure that is **empty by
  default**, plus a well-designed empty state ("Projectfoto's volgen") — the same honest
  approach already used correctly for reviews (`test_placeholder`).
- The before/after slider stays, but hide it entirely when no real matched pair exists.
  Never pair two unrelated photos.

### 1.5 WhatsApp has displaced the form as the primary CTA

Header CTA is WhatsApp. The mobile bottom bar is 50% WhatsApp. The contact page's only
conversion paths are WhatsApp/phone/email. The form — the only channel that captures a
structured, qualifiable lead — is not on screen anywhere.

The owner has since decided explicitly: **the lead channel is the site's own form, not
WhatsApp and not phone.** The current implementation is the opposite of that decision.

Required:
- Header CTA becomes **"Offerte aanvragen"**, linking to the form.
- Mobile bottom bar: "Offerte aanvragen" primary, "Bellen" secondary. WhatsApp becomes a
  tertiary option on the contact page, or is removed.
- Keep one consistent CTA label across the whole site.

Sizing note for whoever reviews this: a local service site converts in the low single
digits. Every field, every extra tap, and every ambiguity in the form is a direct
multiplier on the only number that matters. The form is not a page section — it is the
product.

### 1.6 Accessibility floor is not met

- `htmlFor` appears **zero times** in the codebase. No form label is programmatically
  associated with its input.
- All navigation is `<button onClick>`, not `<a href>` — no middle-click, no open-in-new-tab,
  no link semantics for screen readers, nothing for a crawler to follow.
- Footer "Privacybeleid" and "Algemene voorwaarden" are `<span className="cursor-pointer">`
  with no handler. They look like links and do nothing.
- The before/after slider is mouse/touch only. No keyboard control, no `role="slider"`,
  no `aria-valuenow`.
- Only `border-color` changes on `:focus`. No visible focus ring.

Required: `htmlFor`/`id` on every field, real `<a href>` for every navigation target,
working privacy/terms pages (or remove the links), arrow-key support on the slider,
a `:focus-visible` outline that meets 3:1 contrast against both `--color-canvas` and
`--color-dark`.

### 1.7 Language leaks in Dutch copy

`reinigung` / `Gevelreinigung` (German) appear in three Dutch strings:
`ProjectenPage.tsx:10`, `DienstenPage.tsx:39`, `HomePage.tsx:55`. Correct Dutch is
`reiniging` / `gevelreiniging`.

The `detail` copy for all 8 services in `DienstenPage.tsx` is hardcoded Dutch and renders
untranslated in every language. Same for `ContactPage`'s process steps and FAQ.

Required: proofread every Dutch string by a native standard, and move all hardcoded copy
into the translation layer.

---

## 2. Decision gate — do not skip this

**The current runtime cannot deliver the SEO architecture the project is for.**

The production build currently ships:

```html
<html lang="en">
<title>Figma Make App</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Connects clients with skilled professionals for home services…">
```

and `robots.txt` containing `Disallow: /`. A crawler with JS disabled sees exactly four
words: "Figma Make App". There is no sitemap, no canonical, no hreflang, no structured data.
The meta description describes a marketplace — leftover from an earlier brief, and the
opposite of the current positioning.

The deeper issue is architectural: `App.tsx` switches pages with
`useState<Page>`. **The entire site is one URL.** No deep links, no browser back button,
no shareable service or city page. 28 cities × 8 services = 224 pages the SEO plan depends
on, and there are currently 0 addressable URLs. Per-page titles, canonicals and hreflang
are not "missing" — they are impossible in this structure.

### 2.1 Check the premise before paying for the fix

There is a working assumption that organic search is the acquisition channel. The owner's
own competitor research suggests otherwise: that the incumbent's volume comes largely
through partner funnels and paid lead distribution rather than direct Google searches, and
that its ~1,000–2,000 service×city pages are expensive to maintain.

If that is true, then building 224 city pages for a brand-new contractor means competing
on the one axis the incumbent has owned for a decade, on a 6–12 month payback, while the
channels that would produce leads next month are:

- Google Business Profile and the local pack — requires a **verified, consistent** name,
  address and phone. Which is blocked by §1.3, not by any of this section.
- Paid search on high-intent terms, landing on a fast page with the form above the fold
  and UTM capture working. Which is Phase 1, not Phase 2.
- Referral and trade relationships.

Treat the competitor-traffic claim as a hypothesis, not a fact. It is cheap to check
(where the incumbent's city pages actually rank; whether their traffic is branded). Check
it before committing months to page generation.

This does not make the SEO architecture wrong — it makes it **later**. Ship Phase 1, run
paid and GBP, and let real query data decide which city and service pages are worth
writing properly.

Present these two options to the owner and **wait for a decision** before building any
SEO work:

**Option A — Figma Make stays the design prototype.**
Do Phase 1 here. Treat this repo as the visual reference. Accept that it will never rank.

**Option B — migrate to Next.js App Router.**
Port the existing design system (`src/index.css` tokens, the components) into a Next.js
project with `app/[lang]/…` routing, `generateStaticParams` for cities and services,
`generateMetadata` per route, and static generation. This is the only path that satisfies
sections 10, 13, 14 and 16 of the original brief.

Recommendation: **Option B**, with the Figma Make repo kept as the design source of truth.
The design work is not wasted; the runtime is the wrong one.

Whichever is chosen: remove `"robots": {"index": false}` from `.figma/make/site.json` and
fix the `description` before any deploy that is meant to be found.

---

## 3. If Option B is chosen — SEO architecture

Only after Phase 1 passes.

### 3.1 Data model

`src/data/cities.ts` currently holds `{ name, province, region }`. That is not enough to
generate a page worth indexing. Extend to:

```ts
interface City {
  slug: string;
  name: string;
  province: string;
  region: string;
  postcodeRanges: string[];
  nearbyCitySlugs: string[];
  availableServiceSlugs: string[];
  // Per-city, per-language editorial content. NOT a template.
  content: Record<Lang, {
    metaTitle: string;
    metaDescription: string;
    intro: string;          // ≥ 150 words, specific to this city
    localNotes: string[];   // housing stock, typical work, districts served
  }> | null;                // null = not yet written = not published
}
```

Add the same shape for `Service`.

### 3.2 The thin-content rule — this is the important one

`CityPage.tsx` today builds every city page by token substitution:

```tsx
{t("city_seo_1_1")} {city} {t("city_seo_1_2")}
```

Every one of the 28 city pages is byte-identical apart from the city name. That is the
doorway-page pattern the brief explicitly forbids, and Google treats it accordingly.

Enforce this as a hard rule in code:

> A city or service×city page is only routable if `content[lang] !== null` **and** its
> `intro` is at least 150 words that do not appear on any other page. Everything else
> returns 404 and is excluded from the sitemap.

Ship 3–5 genuinely written city pages rather than 28 generated ones. Add a script
`scripts/check-duplicate-content.ts` that fails CI when two published pages exceed 80%
shingle similarity.

### 3.3 Routes

```
/[lang]                                  lang ∈ nl | en   (nl = default, no prefix)
/[lang]/diensten
/[lang]/diensten/[service]
/[lang]/diensten/[service]/[city]        only where both have real content
/[lang]/werkgebied
/[lang]/werkgebied/[city]
/[lang]/projecten            /[lang]/projecten/[project]
/[lang]/over-ons  /[lang]/contact  /[lang]/veelgestelde-vragen
/[lang]/privacybeleid  /[lang]/cookiebeleid  /[lang]/algemene-voorwaarden
```

Per route: unique `<title>`, unique meta description, self-referencing canonical,
reciprocal `hreflang` for every published language plus `x-default`, breadcrumbs.
`sitemap.xml` generated from published content only.

Structured data — only where it describes visible content: `LocalBusiness` (omit
`address` until verified), `Service`, `BreadcrumbList`, `FAQPage`.

### 3.4 Lead plumbing

```ts
interface Lead {
  id: string; name: string; phone: string; email: string;
  city: string; postcode: string; service: string; description: string;
  photos: string[]; preferredDate: string | null;
  language: Lang; sourcePage: string;
  utm: { source?: string; medium?: string; campaign?: string };
  createdAt: string;
}
```

Capture UTM params on first visit, persist for the session, attach on submit. Server-side
validation, file type and size limits on uploads, a honeypot field, and rate limiting.

Analytics: one `track(event, props)` function. Events: `page_view`, `service_view`,
`city_view`, `project_view`, `form_started` (fires **once**, on first interaction — the
current `onChange` handler on the `<form>` element fires on every keystroke),
`form_submitted`, `phone_clicked`, `email_clicked`, `language_changed`.

---

## 4. Standing rules

**Never invent.** No project, review, statistic, certification, price, guarantee, address,
KvK number, response time, or years of experience unless it is supplied as verified data.
If a section needs data that does not exist, build the component with an honest empty state.
The existing `test_placeholder` ("Binnenkort vindt u hier ervaringen van onze klanten") is
the correct pattern — copy it.

**Only list services this contractor can actually and legally deliver.** The service list
is currently 8 categories chosen at design time and not confirmed against the contractor's
capability. Regulated trades — electrical work in particular — must not appear on the site
until certification is confirmed in writing. Listing a trade you cannot deliver converts
a lead into a refusal, which is worse than not ranking for it. Reconcile the list with the
owner before publishing, and drop anything unconfirmed rather than hedging the copy.

**The trust layer is the conversion layer.** A visible KvK number, a real address, and
verifiable insurance are exactly what a Dutch customer checks before letting a stranger
into their house — and they are what separates the customers who pay properly from the
ones who don't. A fabricated KvK number is checkable against the public register in
seconds. §1.3 is not compliance housekeeping; it is the highest-leverage conversion work
on the site.

**One implementation per concern.** One form, one translation system, one analytics
function, one company-data file. The current codebase has two form implementations, two
translation systems, and `console.log` as analytics. Do not add a third of anything.

**Preserve the design.** The colour tokens, type scale and layout in `src/index.css` and
the page components are good. This is a repair job, not a redesign. If you change a visual
decision, say why.

**Report, don't paper over.** If you cannot complete an item, write it in the summary.
A stub that looks finished is worse than a gap that is labelled.

---

## 5. Acceptance test — run before declaring done

Mechanical (must pass, verifiable without judgement):

1. `tsc --noEmit` silent, `vite build` (or `next build`) succeeds.
2. `grep -rn "<QuoteForm" src` returns at least 4 matches.
3. `grep -rn "console.log" src` returns 0 matches.
4. `grep -rn "87654321\|NL864238123B01\|12 34 56 78\|€45" src` returns 0 matches.
5. `grep -rc "htmlFor" src/components/QuoteForm.tsx` equals the number of form fields.
6. No `images.unsplash.com` in `src/`.
7. No `robots: noindex` and no `Disallow: /` in the production build.
8. Every `<img>` has `alt`, `width`, `height`.
9. Every language in the switcher has 100% coverage with no value equal to its English
   counterpart.
10. Keyboard-only: reach and submit the form, operate the before/after slider, open every
    nav item. No focus trap, focus ring always visible.

Judgement (answer honestly in the summary, one line each):

11. Can a visitor request a quote in under 2 minutes on a phone, without scrolling past
    the fold to find how?
12. Does every published city page contain a paragraph that could not be copy-pasted onto
    another city's page?
13. Does any screen show two languages at once?
14. Is there a single claim on the site that the owner could not prove if asked?

Item 14 is the one that decides whether this is shippable.

---

## 6. Explicitly out of scope

Do not build: CRM (an existing off-the-shelf one will be selected), chatbot, customer or professional accounts, lead distribution,
partner tracking, admin dashboard, AI content generation, animated
counters, additional cities beyond those with real written content.

Explicitly out of scope for this site, even though they are live business questions:
hourly rates and platform margin, master/professional selection and profiles, worker
accounts, price comparison between professionals, lead resale, and any marketplace
functionality. None of it belongs on a single contractor's lead page, and putting rates
on the site removes the reason to submit the form.

Leave the floating "Hulp nodig?" element unbuilt. An empty slot is fine.

---

## 7. Deliverable

A summary containing: what you fixed, what you deliberately did not fix and why, every
place you found data that could not be verified, and the exact list of real-world values
the owner must supply before this site can go live.