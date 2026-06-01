import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { Resend } from "resend";

// Disable Vercel's default body parser so we can verify Stripe's signature
// against the raw bytes.
export const config = {
  api: { bodyParser: false },
};

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer | string) => {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function formatAddress(addr: Stripe.Address | null | undefined) {
  if (!addr) return "—";
  return [
    addr.line1,
    addr.line2,
    [addr.postal_code, addr.city].filter(Boolean).join(" "),
    addr.country,
  ]
    .filter(Boolean)
    .join("<br/>");
}

async function sendOrderEmail(session: Stripe.Checkout.Session, stripe: Stripe) {
  const resendKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.ORDER_NOTIFICATION_TO ?? "evegomyh@gmail.com";
  const fromAddress = process.env.ORDER_NOTIFICATION_FROM ?? "Eve Gomy Shop <orders@evegomy.com>";
  if (!resendKey) {
    // We still 200 the webhook so Stripe doesn't retry — Resend is optional.
    console.warn("[stripe-webhook] RESEND_API_KEY missing — skipping email");
    return;
  }

  // Fetch line items separately (not expanded by default).
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 25 });
  const itemsHtml = lineItems.data
    .map(
      (li) =>
        `<tr><td>${li.quantity ?? 1} × ${li.description ?? "Item"}</td><td style="text-align:right">${formatPrice(li.amount_total ?? 0, li.currency ?? "eur")}</td></tr>`
    )
    .join("");

  const shipping = session.shipping_details ?? session.collected_information?.shipping_details;
  const shippingHtml = formatAddress(shipping?.address);
  const phone = (session.customer_details?.phone) ?? "—";
  const madeToOrder = session.metadata?.madeToOrder === "true";

  const total = formatPrice(session.amount_total ?? 0, session.currency ?? "eur");

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1F1B16;">
      <h1 style="font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin: 0 0 8px;">New order — ${total}</h1>
      <p style="color:#8B8378; font-size: 13px; margin: 0 0 24px;">Stripe session <code>${session.id}</code></p>

      ${madeToOrder ? `<p style="background:#FAF2E5; padding:12px; border-left:3px solid #A65A3D; font-size: 14px;"><strong>Custom commission</strong> — reach out to the buyer within 48 hours to agree on the motif.</p>` : ""}

      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.18em; color:#8B8378; margin: 24px 0 8px;">Items</h2>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        ${itemsHtml}
        <tr><td colspan="2" style="border-top:1px solid #E8E2D7; padding-top:8px;"><strong>Total — ${total}</strong></td></tr>
      </table>

      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.18em; color:#8B8378; margin: 32px 0 8px;">Customer</h2>
      <p style="font-size: 14px; margin: 0;">
        ${session.customer_details?.name ?? "—"}<br/>
        <a href="mailto:${session.customer_details?.email ?? ""}">${session.customer_details?.email ?? "—"}</a><br/>
        Phone — ${phone}
      </p>

      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.18em; color:#8B8378; margin: 24px 0 8px;">Ship to</h2>
      <p style="font-size: 14px; margin: 0;">
        ${shipping?.name ?? session.customer_details?.name ?? ""}<br/>
        ${shippingHtml}
      </p>

      <p style="margin-top:32px; color:#8B8378; font-size: 12px;">Open in Stripe → <a href="https://dashboard.stripe.com/payments/${session.payment_intent}">${session.payment_intent}</a></p>
    </div>
  `;

  const resend = new Resend(resendKey);
  await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    subject: `New order — ${total}${madeToOrder ? " (custom)" : ""}`,
    html,
    replyTo: session.customer_details?.email ?? undefined,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return res.status(500).json({ error: "Stripe webhook not configured" });
  }

  const sig = req.headers["stripe-signature"];
  if (!sig || typeof sig !== "string") {
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  const stripe = new Stripe(secret);
  let event: Stripe.Event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bad signature";
    return res.status(400).json({ error: `Webhook verification failed: ${message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await sendOrderEmail(session, stripe);
    } catch (err) {
      console.error("[stripe-webhook] Email failed:", err);
      // Still 200 so Stripe doesn't retry indefinitely. Logged for review.
    }
  }

  return res.status(200).json({ received: true });
}
