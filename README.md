# Spot Group Real Estate

Marketing and lead-generation website for Nav Sidhu — Lower Mainland REALTOR® and licensed builder.

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Home: hero search, featured listings, cash-offer CTA, services, exclusive teaser |
| `/listings` | MLS®-style search with city, property type, price, bed, bath, status and sort filters |
| `/listings/[slug]` | Listing detail with photo gallery, facts and a showing-request form |
| `/new-listings` | Just listed and coming soon |
| `/exclusive` | Off-market / exclusive inventory plus buyer-list signup |
| `/sell-as-is` | Seller lead capture for as-is cash offers (wholesale) |
| `/services`, `/about`, `/contact` | Positioning and general enquiries |
| `/api/listings` | JSON search endpoint backed by the active listings provider |
| `/api/leads` | Lead intake for every form on the site |

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Listing data

Listings are served through the `ListingsProvider` interface in
`src/lib/listings/provider.ts`. The site currently runs on `DemoListingsProvider`,
which reads the demonstration inventory in `src/lib/listings/demo-data.ts`.

To go live with real MLS® data you need a licensed feed — normally CREA's Data
Distribution Facility (DDF®) or a Greater Vancouver / Fraser Valley board IDX
feed. Once credentials exist:

1. Implement `DdfListingsProvider` against the RESO Web API using the field
   mapping already written in `src/lib/listings/ddf.ts`.
2. Return it from `getListingsProvider()` when `LISTINGS_PROVIDER=ddf`.
3. Set the DDF environment variables (see `.env.example`).

Nothing in the pages or components changes — they all consume the `Listing` type.

## Leads

All forms `POST` to `/api/leads`. Leads are validated in `src/lib/leads.ts`, written
as newline-delimited JSON to `LEADS_FILE` (default `./data/leads.jsonl`) and, when
`LEADS_WEBHOOK_URL` is set, forwarded to a CRM or automation endpoint. Replace
`saveLead` with a database or CRM client when one is chosen.

## Configuration

Brand name, agent details, phone, email, service areas and navigation live in
`src/lib/site.ts`.
