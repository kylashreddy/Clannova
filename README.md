# CLANNOVA — Build Beyond Limits.

Marketing website for CLANNOVA, built with Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS v4, Framer Motion, Lucide and React Three Fiber.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill in what you have.

## Enquiry form and lead storage

`POST /api/leads` validates with the shared schema in `src/lib/lead-schema.ts`.

- With `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set, leads are inserted into the
  `leads` table (create it with `supabase/schema.sql`) and the form shows a success state.
- Without them the API answers `503 NOT_CONFIGURED` and the form tells the visitor their
  enquiry was **not** sent, keeping their details and offering copy/email fallbacks.

## Optional integrations (each switches on when its variables are set)

- **Email alerts:** `RESEND_API_KEY` + `LEAD_ALERT_EMAIL` email every new enquiry.
  Without a verified domain (`LEAD_ALERT_FROM`), Resend only delivers to your own account email.
- **Bot protection:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` add Cloudflare Turnstile to the form.
- **WhatsApp:** `NEXT_PUBLIC_WHATSAPP_NUMBER` shows a floating click-to-chat button.
- **Analytics:** Vercel Analytics is built in; enable it in the Vercel project's Analytics tab.
- Rate limiting: 3 enquiries per email per 10 minutes, checked against the database.

## Deploying to Vercel

Import the GitHub repo in Vercel (framework is detected automatically), add the variables from
`.env.example` under Settings → Environment Variables, and set `NEXT_PUBLIC_SITE_URL` to your domain.

## Brand assets

The official logo source lives in `assets-src/clannova-logo-source.png`.
`node scripts/prepare-logo.mjs` derives, without redrawing the artwork:

- `public/assets/clannova-logo.png`: full stacked logo, transparent
- `public/assets/clannova-icon.png`: icon-only mark, transparent
- `public/assets/clannova-wordmark.png`: wordmark for the navigation lockup
- `src/app/icon.png`, `apple-icon.png`, `opengraph-image.jpg`

## Where things live

- `src/lib/content.ts`: all section copy (services, industries, process, work, engagement)
- `src/lib/finder.ts`: recommendation rules for "Find Your Business Solution"
- `src/lib/site.ts`: contact details and social links (env-driven; hidden until set)
- `src/components/sections/*`: one component per page section
- `src/app/services/[slug]`, `src/app/industries/[slug]`: SEO landing pages generated from content
- `src/app/globals.css`: brand tokens (`--c-*`) and Tailwind theme mapping

Projects in "Selected work" are concept demonstrations and are labelled as such.
The Privacy Policy and Terms are templates to be reviewed by a legal adviser.
