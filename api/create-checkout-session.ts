import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// Keep this in sync with src/data/objects.ts — buyable items only.
const PRODUCTS: Record<
  string,
  { name: string; priceCents: number; currency: string; madeToOrder?: boolean }
> = {
  "foulard-aube":              { name: "Foulard — Aube",                priceCents: 22000, currency: "eur" },
  "foulard-crepuscule":        { name: "Foulard — Crépuscule",          priceCents: 22000, currency: "eur" },
  "skate-lune":                { name: "Skateboard — hand-painted",     priceCents: 50000, currency: "eur" },
  "skate-custom":              { name: "Skateboard — made to order",    priceCents: 100000, currency: "eur", madeToOrder: true },
  "poster-series-bleu":        { name: "Poster — Series Bleu",          priceCents:  5000, currency: "eur" },
  "poster-salon-livre":        { name: "Poster — Salon du livre",       priceCents:  5000, currency: "eur" },
  "poster-filles-qui-dorment": { name: "Poster — Filles qui dorment",   priceCents:  5000, currency: "eur" },
};

type IncomingItem = { productId?: string; quantity?: number };

function normalize(body: unknown): IncomingItem[] {
  if (!body || typeof body !== "object") return [];
  const b = body as { items?: unknown; productId?: unknown; quantity?: unknown };
  if (Array.isArray(b.items)) {
    return b.items.filter((x): x is IncomingItem => !!x && typeof x === "object");
  }
  if (typeof b.productId === "string") {
    return [{ productId: b.productId, quantity: typeof b.quantity === "number" ? b.quantity : 1 }];
  }
  return [];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  const items = normalize(req.body);
  if (items.length === 0) {
    return res.status(400).json({ error: "No items" });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let containsMadeToOrder = false;
  for (const it of items) {
    const product = it.productId ? PRODUCTS[it.productId] : undefined;
    if (!product) {
      return res.status(400).json({ error: `Unknown product: ${it.productId ?? "?"}` });
    }
    if (product.madeToOrder) containsMadeToOrder = true;
    const qty = Math.max(1, Math.min(5, it.quantity ?? 1));
    lineItems.push({
      price_data: {
        currency: product.currency,
        unit_amount: product.priceCents,
        product_data: { name: product.name },
      },
      quantity: qty,
    });
  }

  const stripe = new Stripe(secret);
  const origin =
    req.headers.origin ?? process.env.PUBLIC_SITE_URL ?? "https://evegomy.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?status=cancelled`,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "LU", "CH", "DE", "IT", "ES", "NL", "GB", "US", "CA"],
      },
      phone_number_collection: { enabled: containsMadeToOrder },
      metadata: containsMadeToOrder ? { madeToOrder: "true" } : undefined,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return res.status(500).json({ error: message });
  }
}
