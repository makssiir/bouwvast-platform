# Launch checklist

`npm run check:launch` turns every item marked **(gate)** into a hard failure.
Nothing in this list may be filled in with guesses: the site deliberately shows
less until the owner supplies real, verifiable facts.

## 1. Company facts — `src/data/company.ts`

For each field: fill in `value`, set `verified: true`, note the `source`
(e.g. "KvK-uittreksel 2026-02-01").

- [x] Registered name (`legalName`): Slim-Team Bouw B.V. — owner supplied **(gate)**
- [x] Phone, as displayed and as `tel:` (`phoneDisplay`, `phoneTel`): 06 17 55 25 58 / +31617552558 **(gate)**
- [ ] Customer e-mail (`email`) **(gate)**
- [x] KvK number (`kvk`): 97996939 — owner supplied, not independently registry-checked **(gate)**
- [x] VAT/BTW number (`btw`): NL828110670B01 — owner supplied, not independently registry-checked
- [x] Public location (`locality`): Baarn; no street address or postcode is published.
      Confirm the registered visiting address is shielded in the Business Register before launch.
- [x] Contact person (`contactPerson`): Maksym Usyk
- [ ] Exact trade name (`tradeName`): owner wrote “Klusvakdienst”; existing website is “Huisklusdienst”.
      Confirm before publishing a trade-name statement or renaming the brand/domain.
      Until then the site names Slim-Team Bouw B.V. as its operator without asserting a trade name.
- [ ] Opening hours (`hours`)
- [ ] WhatsApp number (`whatsapp`) — only if someone actually answers it.
      Until then every WhatsApp button stays hidden and the desktop pop-up
      points to the quote form instead.

Contact page, footer, form fallback and structured data pick these up
automatically; unverified fields are never rendered.

## 2. Claims that need evidence — `src/data/claims.ts`

Every switch is off. Turn one on only together with a `source` **(gate)**.
The UI requires both the enabled switch and a nonempty source to render a claim.
Do not add generic "Licensed", "Fully insured" or "Bonded" badges: verify the
actual Dutch registration, policy, certificate or warranty first.

| Switch | Shows | Evidence needed |
| --- | --- | --- |
| `pricing` | "Vanaf" prices on service cards | Real price list in `SERVICE_PRICES`, `src/data/pricing.ts`; consumer prices incl. btw **(gate)** |
| `projects` | `/projecten` gallery; real photos in the before/after slider | Entries in `src/data/projects.ts`: own photos (`beforeImage` for the slider), client permission, town-level location only |
| `reviews` | Ratings/testimonials | Linkable review platform; no copied or invented quotes |
| `stats`, `team`, `warranty`, `responseTime`, `freeSurvey`, `certification` | Respective statements | Certificate, warranty terms, staffing that makes the promise true |

### Widgets that are always on

- **Reassurance bar**: uses only the existing request-process statements, not
  unverified certifications, reviews, guarantees or response-time promises.
- **Three-step quote request**: project → place/details → contact. Contact
  details appear only at the end. Nothing is sent before the final submit.
  Service pages and the calculator carry their context into the request;
  going back preserves the visitor's text and photos.
- **Cost calculator** ("Bereken direct uw richtprijs", home page and the four
  matching service pages). Rates in `ESTIMATOR`, `src/data/pricing.ts`, were
  copied from the original site and are unchecked. Compare them with the real
  price list, then set `ratesChecked: true` **(gate)**. The result is always
  shown as an indication incl. btw, never as a quote.
- **VAT wording**: confirm rates per enquiry. Itemise net amounts, VAT by
  applicable rate and the gross total. Public consumer totals include VAT;
  business net amounts must explicitly say excl. btw. Do not add a uniform
  VAT percentage to every job or treat reverse charging as automatic.
- **Heat-pump scope and qualifications**: confirm the actual permitted work,
  certificates and any specialist arrangement. Set `HEAT_PUMP_SCOPE.reviewed`
  and record evidence in `source` in `src/data/services.ts` **(gate)**.
  Heating copy does not imply gas-appliance or refrigerant authorisation.
- **Hero image**: AI-generated interior and craftsperson, explicitly labelled
  as an illustration, not the company's team or completed project. Replace
  with genuine permitted photography when available.
- **Service photographs**: generated scenes are presented as illustrative
  examples ("Sfeerbeeld"), not as a real project portfolio. There are no
  public AI badges. Do not attach invented clients, addresses or completion
  dates to these scenes or enable the real-projects claim for them.
- **Before/after slider**: shows AI illustrations labelled "Impressie"
  (`src/data/impressions.ts`) until `projects` is on and projects have a
  `beforeImage`. The caption explicitly says they are not completed
  Huisklusdienst projects. Buttons offer a non-drag alternative; the CTA
  preselects the matching service without inventing a budget or location.
- **Postcode → job → contact dialog** (home page and `/werkgebied/`): takes
  any Dutch postcode or place, asks what the job is and how the visitor wants
  to be contacted (call, WhatsApp, e-mail), and sends it as a normal lead
  (`sourcePage` `area-check:…`, field `contactPreference`). It never says a
  place is covered: the text promises a personal answer on whether and when.

## 3. Service area — `src/data/cities.ts`, `src/data/cityIntros.ts`

The site has a page for 58 places in all twelve provinces, and the 47 larger
places also get a page per service (`/werkgebied/<plaats>/<dienst>/`,
47 × 17 = 799 pages). Every one of those pages tells visitors and search
engines that you take on work there.

- [ ] Remove every place the team cannot actually serve (delete it from
      `CITIES` and its intro from `CITY_INTROS`); set `major: false` for places
      that should keep one page but no page per service. Pages, sitemap,
      footer, `llms.txt` and structured data follow automatically.
- [ ] Read the intro, districts and traits of the places you keep; correct
      anything that does not match reality.
- [ ] Add real local proof as it comes in (projects with town-level location,
      reviews). Local pages with nothing but template text are what search
      engines treat as doorway pages; `INDEX_CITY_PAGES=false` keeps them
      reachable but out of search while you work on that.

## 3b. Being found by search engines and AI assistants

What the site already does: prerendered HTML for every URL, a sitemap,
`robots.txt` that explicitly admits the AI crawlers (GPTBot, OAI-SearchBot,
ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, …), `/llms.txt` and
`/llms-full.txt` generated from the same data as the pages, and schema.org
markup (business, service per page, place with province, FAQ).

What only the owner can do — and what decides rankings in Google, Bing (which
ChatGPT search uses) and AI answers far more than anything on the site:

- [ ] Google Business Profile and Bing Places with the same name, phone and
      address as `company.ts` (service-area business if there is no shop).
- [ ] KvK registration visible on the site (`kvk`), consistent NAP details on
      Werkspot, Trustoo, Homedeal, Yelp/Gouden Gids and similar directories.
- [ ] Real reviews on a public platform (Google, Trustoo, Werkspot); then turn
      on the `reviews` claim with a link.
- [ ] Real project photos and descriptions per town (`projects` claim).
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- [ ] Nobody can guarantee a #1 position in ChatGPT or Google; anyone who
      promises it is selling something.

## 4. Legal — `src/data/legal.ts`, `src/pages/LegalPages.tsx`

- [ ] Have the draft privacy statement checked (it describes what the site
      really does: form data, photos, truncated IP, retention, no tracking
      cookies). Set `privacy.approved` and `privacy.lastUpdated` **(gate)**.
- [ ] List processors (hosting, e-mail/webhook provider, backups) with
      location **(gate)**.
- [ ] Decide the retention period; keep `leadRetentionMonths` and the server's
      `LEAD_RETENTION_DAYS` equal **(gate)**.
- [ ] Supply general terms (text or PDF in `public/`, `terms.documentHref`) and
      set `terms.approved` **(gate)**.
- [ ] If analytics or marketing tags are ever added: a consent banner first.

## 5. Hosting and configuration — `.env` (see `.env.example`)

- [ ] Domain and HTTPS; `SITE_ORIGIN=https://…` at build time **(gate)**.
- [ ] `SITE_INDEXING=false` on staging, `true` (default) in production.
- [ ] Lead notification: `LEAD_WEBHOOK_URL` + `LEAD_WEBHOOK_SECRET`, or
      `RESEND_API_KEY` + `LEAD_NOTIFY_TO` + `LEAD_NOTIFY_FROM` (verified sender
      domain) **(gate)**.
- [ ] `DATA_DIR` on a persistent, backed-up volume, readable only by the server.
- [ ] `TRUST_PROXY=true` only behind a proxy that sets `X-Forwarded-For`.
- [ ] Monitor `GET /healthz` (storage writable, notifications configured).

## 6. Before going live

```bash
npm run release:check      # typecheck, lead tests, build, route checks
npm run verify:browser     # needs Playwright
npm run check:launch       # must print "Ready for launch"
```

Then submit one real test request from a phone, confirm the notification
arrives with photos, and delete the test lead from `DATA_DIR/leads/`.
