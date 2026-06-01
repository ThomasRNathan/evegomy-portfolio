# evegomy-portfolio

Portfolio + shop for Eve Gomy — author and illustrator (Paris).
[evegomy.com](https://evegomy.com)

## Stack

- Vite + React + TypeScript
- Tailwind CSS · Fraunces / Inter / Shippori Mincho
- React Router · cart context with localStorage
- Stripe Checkout (Vercel Function in `api/`)
- Resend email on completed order (Vercel Function `api/stripe-webhook.ts`)
- Deployed on Vercel — designed to be edited in [Lovable](https://lovable.dev) via GitHub.

## Develop

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`.
The Stripe Checkout function only runs on Vercel (`vercel dev`) — locally it 404s.

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | What |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | yes | Stripe secret key (`sk_test_…` to test, `sk_live_…` to take real money) |
| `STRIPE_WEBHOOK_SECRET` | optional | Signing secret from the Stripe webhook (enables order email) |
| `RESEND_API_KEY` | optional | Resend API key — without it the webhook 200s but doesn't email |
| `ORDER_NOTIFICATION_TO` | optional | Where to send order emails (defaults to `evegomyh@gmail.com`) |
| `ORDER_NOTIFICATION_FROM` | optional | Sender (defaults to `Eve Gomy Shop <orders@evegomy.com>`) |
| `PUBLIC_SITE_URL` | optional | e.g. `https://evegomy.com` |

## Stripe webhook setup (order notification email)

1. **Get a Resend API key** — [resend.com](https://resend.com) → Account → API keys. Free up to 100 emails/day. Verify the `evegomy.com` sender domain (Resend gives you DNS records to add at OVH).
2. **Add `RESEND_API_KEY`** to Vercel env vars.
3. **In Stripe dashboard** → Developers → Webhooks → Add endpoint:
   - URL: `https://evegomy.com/api/stripe-webhook`
   - Event: `checkout.session.completed`
4. Stripe shows a **Signing secret** (starts `whsec_…`) — add as `STRIPE_WEBHOOK_SECRET` in Vercel.
5. Redeploy (any push, or click Redeploy in Vercel).
6. Test from Stripe → Webhook → **Send test event** → expect 200, email in your inbox.

Without `STRIPE_WEBHOOK_SECRET` or `RESEND_API_KEY` the cart still works — Stripe just won't notify Eve by email when an order lands.

## Editing content

All content lives in `src/data/`:

- `bio.ts` — name, contact, About copy
- `books.ts` — book list with purchase links and translations
- `objects.ts` — buyable items + collaborations; **update `editionRemaining` here as orders ship**
- `gallery.ts` — Home hero + mosaic images

Images live in `public/placeholders/`.

## Deploy

Pushed to `main` → auto-deploys to Vercel.

## Domain

`evegomy.com` is registered at OVH. DNS records:

| Type | Subdomain | Target |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| A | `www` | `76.76.21.21` |
