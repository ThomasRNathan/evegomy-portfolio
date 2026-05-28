import { useState } from "react";
import type { WorkItem } from "@/data/objects";
import { formatPrice, cn } from "@/lib/utils";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";

async function startCheckout(item: WorkItem) {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: item.id, quantity: 1 }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Checkout failed");
  }
  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

export function WorkCard({ item }: { item: WorkItem }) {
  const { locale } = useLocale();
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      await startCheckout(item);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setLoading(false);
    }
  };

  const buyable = !item.comingSoon && !!item.priceCents;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={item.images[0]}
          alt={item.title[locale]}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]",
            item.blurred && "scale-110 blur-2xl"
          )}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {item.comingSoon ? (
          <div className="absolute inset-0 flex items-end justify-start p-5">
            <span className="bg-ink/85 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-ivory">
              {t.objects.comingSoon}
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl">{item.title[locale]}</h3>
        {buyable && item.priceCents ? (
          <span className="text-sm text-ink">
            {formatPrice(item.priceCents, item.currency ?? "EUR")}
          </span>
        ) : null}
      </div>
      {item.edition ? (
        <p className="mt-1 text-xs uppercase tracking-widest text-muted">
          {item.edition[locale]}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        {item.description[locale]}
      </p>
      {buyable ? (
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={onBuy}
            disabled={loading || !item.inStock}
            className="border border-ink px-5 py-2 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!item.inStock ? t.objects.soldOut : loading ? t.objects.loading : t.objects.addToBag}
          </button>
          {error ? <span className="text-xs text-terracotta">{error}</span> : null}
        </div>
      ) : null}
    </article>
  );
}
