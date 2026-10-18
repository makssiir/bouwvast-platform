# Huisklusdienst website

Marketing site and quote-request form for Huisklusdienst (huisklusdienst.nl): klussen,
renovatie en onderhoud in en om het huis, with a page per place and per service × place.
React 19 + Vite 8 + Tailwind v4, prerendered to static HTML per route, served by
a small dependency-free Node server that also receives quote requests.

## Quick start

```bash
npm ci
npm run dev                 # Vite dev server (form posts need the real server)
npm run build && npm start  # production build + server on http://localhost:3000
```

Node ≥ 22.18 (`.nvmrc`). Copy `.env.example` to `.env` for local settings;
`build`, `start` and `check:launch` read it automatically.

## How it fits together

| Part | Where | Notes |
| --- | --- | --- |
| Pages & routes | `src/pages`, `src/lib/routes.ts` | One route table drives navigation, prerendering, sitemap and robots |
| Translations | `src/i18n/translations.ts` | nl (canonical), en, uk, ru; preference stored client-side |
| Owner facts | `src/data/company.ts`, `claims.ts`, `pricing.ts`, `projects.ts`, `legal.ts`, `cities.ts` | Unverified values are never rendered — see `LAUNCH-CHECKLIST.md` |
| Local pages | `src/data/cities.ts`, `cityIntros.ts`, `localTraits.ts`, `heatingTips.ts`, `serviceLocal.ts` | 58 places (`/werkgebied/<plaats>/`), 47 × 17 service × place pages (`/werkgebied/<plaats>/<dienst>/`), loaded as a separate chunk |
| Prerender | `scripts/prerender.mjs` | Writes `dist/<route>/index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` |
| Structured data | `src/lib/schema.ts`, `src/lib/localFaq.ts` | Business, service and place per page; FAQ markup for visible questions |
| Server | `server/` | Static files with security headers + `POST /api/leads` + `GET /healthz` |
| Lead validation | `src/lib/leadSchema.ts` | Shared by the browser form and the server |

### Quote requests

The browser posts multipart data to `VITE_LEAD_ENDPOINT` (`/api/leads`). The
server validates (same schema as the client), checks the origin, rate-limits,
verifies photo file signatures, stores the lead under
`DATA_DIR/leads/<id>/`, and returns a receipt number. The form only shows
success when it receives that receipt; otherwise the visitor keeps their text
and sees the verified contact channels. Notifications go out by signed webhook
and/or Resend e-mail and are retried until delivered. Leads older than
`LEAD_RETENTION_DAYS` are purged automatically.

### Project-first conversion flow

- The reassurance bar below the navigation describes the existing process:
  a no-obligation request, a quote up front and personal contact. It does not
  imply a licence, insurance policy, certification or warranty.
- The shared quote form has three steps: project → place/details → contact.
  A service-page visit, calculator or inspiration CTA can preselect the service
  and skip the first question. A known service makes the description optional;
  other work requires a short description. Name and phone remain required in
  the final step, and e-mail and photos remain optional.
- Only the final submit button sends data. Going back, validation errors and
  retries keep the text, photo selection and attached calculation. Personal
  form data is held in memory, not written to browser storage. Unrelated work
  drops a stale estimate without deleting the visitor's own description.
- The before/after slider also has Before / Compare / After buttons, keyboard
  support and a service-specific request CTA. AI illustrations are explicitly
  labelled as inspiration, not completed Huisklusdienst projects. Real photos
  replace them only when the projects claim has evidence.
- `src/lib/analytics.ts` remains a no-op integration boundary. Step-view and
  inspiration-choice hooks contain no personal data; no analytics provider,
  cookie or conversion-uplift claim has been added.

### Services, images and VAT

- There are 17 service pages. Heat pumps, underfloor heating, heating systems,
  new window/door installation and old window/door removal have their own pages and request choices. Plumbing
  explicitly includes concealed toilet frames; renovation covers reconfiguration
  and restoration without claiming architectural or structural qualifications.
- All 17 choices are immediately visible in both enquiry forms, organised into
  four categories from the shared `SERVICE_GROUPS` catalogue. No services are
  hidden behind a "more services" toggle. The public services page uses the
  same categories, with category links and service-specific photographs.
- The homepage uses one stronger architectural/craftsmanship image instead of
  the downward-looking worker inset. Six additional generated scenes illustrate
  renovation, plumbing, radiators, facades, new windows/doors and old-frame
  removal. Public copy uses an illustrative/inspiration context, without AI
  badges; images are never presented as real projects, the real team or proof
  of experience. Genuine projects still require the verified projects claim.
- Consumer-facing indicative prices remain **including VAT**. Quote breakdowns
  show net amounts, VAT at the applicable rates and a gross total. Business
  quotes usually show net amounts, explicitly labelled; rates and exceptions
  are confirmed per enquiry. No fictitious uniform VAT split is calculated.
  See [ACM's consumer-price guidance](https://www.acm.nl/nl/verkoop-aan-consumenten/consumenten-informeren/prijzen-vermelden).
- Heat-pump refrigerant work requires the appropriate qualifications; no
  certification is claimed. Confirm the real scope, certificates and any
  specialist arrangement in `HEAT_PUMP_SCOPE` in `src/data/services.ts`
  before launch. See [official refrigerant certification guidance](https://business.gov.nl/regulations/certificates-working-with-f-gases/).
- All existing routes remain stable. New service pages are automatically added
  to the sitemap, structured data and `llms.txt` / `llms-full.txt`.

### Git history

This update continues the existing history from `78aa324` (baseline), including
all prior website updates. It does not reinitialise or squash the repository.
The handoff includes a full-history Git bundle and a clean repository archive.
See `GIT-HANDOFF.md` for importing into an existing clone and pushing safely.

## Checks

```bash
npm run typecheck
npm run verify:content  # service registry, translations, VAT and FAQ consistency
npm run verify:leads    # client ↔ server lead flow (48 cases)
npm run verify:routes   # every prerendered page: claims, links, SEO, a11y basics
npm run verify:browser  # real browser against the real server (needs Playwright)
npm run check:launch    # owner data, legal approval, production config
npm run release:check   # typecheck + content + leads + build + routes
```

CI runs the same in `.github/workflows/ci.yml`.

## Deploy

**Docker**

```bash
docker build --build-arg SITE_ORIGIN=https://huisklusdienst.nl -t huisklusdienst .
docker run -d -p 3000:3000 -v huisklusdienst-data:/data --env-file .env huisklusdienst
```

**Any Node host**: `npm ci && npm run build && npm start` with the environment
from `.env.example`, `DATA_DIR` on persistent storage, behind HTTPS.

Static-only hosting is possible for the pages, but then `/api/leads` must be
provided elsewhere (set `VITE_LEAD_ENDPOINT` and `CSP_CONNECT_SRC`), and the
security headers from `server/static.mjs` must be replicated. Do not add a
catch-all rewrite to `index.html`: every URL has its own file and unknown URLs
must return the 404 page.
