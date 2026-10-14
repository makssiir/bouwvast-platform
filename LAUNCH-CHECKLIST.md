# Launch checklist

`npm run check:launch` turns every item marked **(gate)** into a hard failure.
Nothing in this list may be filled in with guesses: the site deliberately shows
less until the owner supplies real, verifiable facts.

## 1. Company facts — `src/data/company.ts`

For each field: fill in `value`, set `verified: true`, note the `source`
(e.g. "KvK-uittreksel 2026-02-01").

- [ ] Registered name (`legalName`) **(gate)**
- [ ] Phone, as displayed and as `tel:` (`phoneDisplay`, `phoneTel`) **(gate)**
- [ ] Customer e-mail (`email`) **(gate)**
- [ ] KvK number (`kvk`) **(gate)**
- [ ] VAT/BTW number (`btw`)
- [ ] Visiting/postal address (`address`) — enables full LocalBusiness data
- [ ] Opening hours (`hours`)
- [ ] WhatsApp number (`whatsapp`) — only if someone actually answers it.
      Until then every WhatsApp button stays hidden and the desktop pop-up
      points to the quote form instead.

Contact page, footer, form fallback and structured data pick these up
automatically; unverified fields are never rendered.

## 2. Claims that need evidence — `src/data/claims.ts`

Every switch is off. Turn one on only together with a `source` **(gate)**.

| Switch | Shows | Evidence needed |
| --- | --- | --- |
| `pricing` | "Vanaf" prices on service cards | Real price list in `SERVICE_PRICES`, `src/data/pricing.ts` (incl./excl. btw) **(gate)** |
| `projects` | `/projecten` gallery; real photos in the before/after slider | Entries in `src/data/projects.ts`: own photos (`beforeImage` for the slider), client permission, town-level location only |
| `reviews` | Ratings/testimonials | Linkable review platform; no copied or invented quotes |
| `stats`, `team`, `warranty`, `responseTime`, `freeSurvey`, `certification` | Respective statements | Certificate, warranty terms, staffing that makes the promise true |

### Widgets that are always on

- **Cost calculator** ("Bereken direct uw richtprijs", home page and the four
  matching service pages). Rates in `ESTIMATOR`, `src/data/pricing.ts`, were
  copied from the original site and are unchecked. Compare them with the real
  price list, then set `ratesChecked: true` **(gate)**. The result is always
  shown as an indication incl. btw, never as a quote.
- **Before/after slider**: shows AI illustrations labelled "Impressie"
  (`src/data/impressions.ts`) until `projects` is on and projects have a
  `beforeImage`.
- **Area checker**: answers from `src/data/cities.ts` (names and postcode
  ranges, the same list as `/werkgebied/`); unknown places get "we check
  personally", never "no".

## 3. Service area — `src/data/cities.ts`

- [ ] Confirm the 15 places around Amersfoort (remove or add as needed) and
      their postcode ranges (`postcodes`), which the area checker uses.
- [ ] Keep `INDEX_CITY_PAGES=false` until each `/werkgebied/<plaats>/` page has
      genuine local content (projects, photos). Otherwise they are thin
      doorway pages.

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
