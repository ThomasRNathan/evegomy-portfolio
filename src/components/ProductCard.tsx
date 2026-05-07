import { useState } from "react";
import type { Product } from "@/data/crafts";
import { formatPrice } from "@/lib/utils";

async function startCheckout(product: Product) {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: product.id, quantity: 1 }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Checkout failed");
  }
  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

export function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      await startCheckout(product);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl">{product.title}</h3>
        <span className="text-sm text-ink">
          {formatPrice(product.priceCents, product.currency)}
        </span>
      </div>
      {product.edition ? (
        <p className="mt-1 text-xs uppercase tracking-widest text-muted">
          {product.edition}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        {product.description}
      </p>
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={onBuy}
          disabled={loading || !product.inStock}
          className="border border-ink px-5 py-2 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!product.inStock ? "Sold out" : loading ? "Loading…" : "Add to bag"}
        </button>
        {error ? <span className="text-xs text-terracotta">{error}</span> : null}
      </div>
    </article>
  );
}
