import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// Keep this in sync with src/data/objects.ts — buyable items only.
const PRODUCTS: Record<string, { name: string; priceCents: number; currency: string }> = {
  "foulard-aube":           { name: "Foulard — Aube",            priceCents: 22000, currency: "eur" },
  "foulard-crepuscule":     { name: "Foulard — Crépuscule",      priceCents: 22000, currency: "eur" },
  "skate-lune":             { name: "Skateboard — Lune",          priceCents: 18000, currency: "eur" },
  "skate-soleil":           { name: "Skateboard — Soleil",        priceCents: 18000, currency: "eur" },
  "poster-series-bleu":     { name: "Affiche — Series Bleu",      priceCents:  5000, currency: "eur" },
  "poster-salon-livre":     { name: "Affiche — Salon du livre",   priceCents:  5000, currency: "eur" },
  "poster-filles-qui-dorment": { name: "Affiche — Filles qui dorment", priceCents: 5000, currency: "eur" },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  const { productId, quantity } = (req.body ?? {}) as {
    productId?: string;
    quantity?: number;
  };
  const product = productId ? PRODUCTS[productId] : undefined;
  if (!product) return res.status(400).json({ error: "Unknown product" });

  const stripe = new Stripe(secret);
  const origin =
    req.headers.origin ?? process.env.PUBLIC_SITE_URL ?? "https://evegomy.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: product.currency,
            unit_amount: product.priceCents,
            product_data: { name: product.name },
          },
          quantity: Math.max(1, Math.min(5, quantity ?? 1)),
        },
      ],
      success_url: `${origin}/objects?status=success`,
      cancel_url: `${origin}/objects?status=cancelled`,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "LU", "CH", "DE", "IT", "ES", "NL", "GB", "US", "CA"],
      },
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return res.status(500).json({ error: message });
  }
}
