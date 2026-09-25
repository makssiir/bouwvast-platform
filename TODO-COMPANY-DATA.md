# Company data required before launch

The following public-facing values are currently intentionally hidden because they have not been verified by the owner:

- Registered company name
- Business phone number
- Customer-service email address
- Business address and service radius
- Opening hours
- KvK registration number
- VAT/BTW number
- WhatsApp number and approved message template
- Any published project photos, project locations, testimonials, certifications, prices, response-time claims, warranties, and years of experience

## Before launch: lead delivery

Set `VITE_LEAD_ENDPOINT` (see `.env.example`) to the address that should receive
a submitted quote request. Until it is set, the form tells every visitor that
the request did not go through and offers WhatsApp, email and phone instead —
which is correct, but it means the site collects nothing.

Verify with `npm run verify:leads` and `npm run typecheck`.

## Before launch: the production address

Set `SITE_ORIGIN` when building, for example:

    SITE_ORIGIN=https://www.bouwvast.nl npm run build

Without it the build still writes every page, but skips canonicals, sitemap.xml
and structured data, because none of those can be written without knowing the
real address. The build says so out loud.

Serve `dist/` as plain static files. Do **not** configure a catch-all rewrite to
`index.html`: every real URL now has its own file, and a catch-all would turn
every typo into a soft 404.

Verify with `npm run verify:routes` after a build, and `npm run verify:browser`
if Playwright is installed.

## Removed because it was invented

The homepage section **"Wat klanten zeggen"** is gone and stays gone. It held
three reviews with invented names, cities and dates ("Mark van Dijk,
Amersfoort, 2 weken geleden") under a 5.0 Google rating, and the floating
activity toast ("Badkamer & Keuken, Amersfoort Vathorst, 8 minuten geleden")
did the same thing. Made-up testimonials presented as real are a misleading
commercial practice, not a design choice. Both come back the moment there are
real reviews to show.

## Still on the site and still unverified

These are live right now and this file already says they have not been checked:

- The statistics band on the homepage: "25+ jaar ervaring", "1.500+ projecten
  afgerond", "VCA gecertificeerd", "€55 vanaf tarief p/u incl. btw".
- The "VCA Gecertificeerd" badge in the trust card.
- Every price in the rate table and in the cost estimator.
- Company name, phone, e-mail, address, opening hours, KvK 84920184 and VAT
  number, all marked `verified: true` in `src/data/company.ts`.
- The WhatsApp number `+31612345678` in `src/data/contact.ts`, which is a
  placeholder and is what the form's fallback sends people to when a request
  cannot be delivered.

A certification the company does not hold, or a KvK number that belongs to
someone else, is a legal problem rather than a copy problem.

## Removed pages

`/over-ons` no longer exists: the page, its route and every link to it are
gone. Nothing redirects there, so if that URL was ever shared or indexed it
now returns the host's 404.
