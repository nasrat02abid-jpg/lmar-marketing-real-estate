# LMAR Marketing Real Estate Platform

A full-stack real-estate website for LMAR Marketing. It combines a public property experience with a protected management dashboard for projects, leads, and site-visit requests.

## Included features

- Public projects and property listings
- Prices, down payments, and installment plans
- Project comparison and investment calculator
- Construction progress updates
- Brochure, video, map, and WhatsApp links
- Customer inquiries and site-visit bookings
- Protected admin dashboard
- Project, lead, and booking management
- Persistent Cloudflare D1 database
- Responsive mobile and desktop layout

## Technology

- Next.js 16, React 19, and TypeScript
- Vinext/Vite for Cloudflare Workers
- Tailwind CSS
- Drizzle ORM and Cloudflare D1
- ChatGPT sign-in for the protected administrator area

## Requirements

- Node.js 22.13 or newer
- pnpm 11

## Local setup

```bash
pnpm install
pnpm run build
pnpm run dev
```

The public website is available at `/`, and the protected dashboard is available at `/admin`.

## Database

The schema is defined in `db/schema.ts`, and generated migrations are stored in `drizzle/`.

Main tables:

- `projects`
- `leads`
- `site_visits`

After changing the schema, generate a migration with:

```bash
pnpm run db:generate
```

## Main structure

```text
app/
  admin/                 Protected dashboard
  api/projects/          Project APIs
  api/leads/             Inquiry APIs
  api/visits/            Site-visit APIs
  page.tsx               Public website
  globals.css            Brand and responsive styling
db/
  index.ts               Database connection
  schema.ts              Drizzle database schema
drizzle/                 SQL migrations
public/                   Logos, photos, brochure, and favicon
```

## Configuration

The deployment configuration is stored in `.openai/hosting.json`. The application expects a D1 binding named `DB`.

The LMAR WhatsApp number and demo project records are in `app/page.tsx`. Replace them with official project information before the final business launch.

## Important note

Current prices and projects are demonstration data. Official LMAR project information, images, payment plans, brochures, and map links should be entered through the admin dashboard or updated in the source before production use.

## Owner

LMAR Marketing  
Project prepared by Nasrat Abid
