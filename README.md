# evegomy-portfolio

Portfolio + shop for Eve Gomy — author and illustrator (Paris).
[evegomy.com](https://evegomy.com)

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- Stripe Checkout (Vercel Function in `api/`)
- Deployed on Vercel — designed to be edited in [Lovable](https://lovable.dev) via GitHub.

## Develop

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`.
The Stripe Checkout function only runs on Vercel (`vercel dev`) — locally it 404s, which is fine.

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | Where | What |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Vercel → Project → Settings → Environment Variables | Stripe secret key (`sk_live_…` or `sk_test_…`) |
| `PUBLIC_SITE_URL` | Vercel | Public site URL (e.g. `https://evegomy.com`) |

## Editing content

All content lives in `src/data/`:

- `bio.ts` — name, role, contact, About copy
- `books.ts` — portfolio book list
- `crafts.ts` — shop products (also mirror in `api/create-checkout-session.ts`)
- `gallery.ts` — Home hero + mosaic images

Images live in `public/placeholders/` (swap for the real ones).

## Deploy

Pushed to `main` → auto-deploys to Vercel.

## Domain

`evegomy.com` is registered at OVH. DNS records are set in OVH and point to Vercel.
