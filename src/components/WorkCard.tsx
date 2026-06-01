import { useState } from "react";
import { Link } from "react-router-dom";
import type { WorkItem } from "@/data/objects";
import { formatPrice, cn } from "@/lib/utils";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";
import { useCart } from "@/cart";

function editionLabel(item: WorkItem, t: ReturnType<typeof useT>): string | null {
  if (item.madeToOrder && item.leadTime) {
    const { locale } = { locale: "en" as const }; // not used
    void locale;
    return t.edition.madeToOrder;
  }
  if (item.editionSize === 1) return t.edition.unique;
  if (item.editionRemaining != null && item.editionSize && item.editionRemaining < item.editionSize) {
    return t.edition.remaining(item.editionRemaining, item.editionSize);
  }
  if (item.editionSize) return t.edition.ofN(item.editionSize);
  return null;
}

export function WorkCard({ item, href }: { item: WorkItem; href?: string }) {
  const { locale } = useLocale();
  const t = useT();
  const { addItem } = useCart();
  const [pulse, setPulse] = useState(false);

  const buyable = !item.comingSoon && !!item.priceCents;
  const linkTo = href ?? `/shop/${item.id}`;
  const ed = editionLabel(item, t);

  const onAdd = () => {
    addItem(item.id);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 600);
  };

  return (
    <article className="group">
      <Link to={linkTo} className="block">
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
      </Link>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl">
          <Link to={linkTo} className="link-underline">{item.title[locale]}</Link>
        </h3>
        {buyable && item.priceCents ? (
          <span className="text-sm text-ink whitespace-nowrap">
            {formatPrice(item.priceCents, item.currency ?? "EUR")}
          </span>
        ) : null}
      </div>
      {ed ? (
        <p className="mt-1 text-xs uppercase tracking-widest text-muted">{ed}</p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        {item.description[locale]}
      </p>
      {buyable ? (
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={onAdd}
            disabled={!item.inStock}
            className={cn(
              "border border-ink px-5 py-2 text-xs uppercase tracking-widest text-ink transition-all hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40",
              pulse && "bg-ink text-ivory scale-[1.03]"
            )}
          >
            {!item.inStock ? t.objects.soldOut : pulse ? t.pdp.added : t.objects.addToCart}
          </button>
          <Link to={linkTo} className="link-underline text-xs uppercase tracking-widest text-muted">
            {t.pdp.details}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
