import { useState } from "react";
import { Link } from "react-router-dom";
import type { WorkItem } from "@/data/objects";
import { formatPrice, cn } from "@/lib/utils";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";
import { useCart } from "@/cart";
import { ProjectBanner } from "@/components/ProjectBanner";

function editionLine(
  item: WorkItem,
  t: ReturnType<typeof useT>,
  locale: ReturnType<typeof useLocale>["locale"]
): string | null {
  if (item.madeToOrder && item.leadTime) {
    return `${t.edition.madeToOrder} — ${item.leadTime[locale]}`;
  }
  if (item.editionSize === 1) return t.edition.unique;
  if (
    item.editionRemaining != null &&
    item.editionSize &&
    item.editionRemaining < item.editionSize
  ) {
    return t.edition.remaining(item.editionRemaining, item.editionSize);
  }
  if (item.editionSize) return t.edition.ofN(item.editionSize);
  return null;
}

export function ObjectBanner({ item, reverse }: { item: WorkItem; reverse?: boolean }) {
  const { locale } = useLocale();
  const t = useT();
  const { addItem } = useCart();
  const [pulse, setPulse] = useState(false);

  const images = item.images.map((src) => ({ src, alt: item.title[locale] }));
  const buyable = !item.comingSoon && !!item.priceCents;
  const ed = editionLine(item, t, locale);

  const onAdd = () => {
    addItem(item.id);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 700);
  };

  return (
    <ProjectBanner
      eyebrow={item.category}
      title={item.title[locale]}
      description={item.description[locale]}
      images={images}
      blurred={item.blurred}
      reverse={reverse}
      price={
        buyable && item.priceCents
          ? formatPrice(item.priceCents, item.currency ?? "EUR")
          : undefined
      }
      meta={
        ed ? <p className="mt-3 text-xs uppercase tracking-widest text-muted">{ed}</p> : null
      }
      imageOverlay={
        item.comingSoon ? (
          <div className="pointer-events-none absolute left-4 top-4 z-20">
            <span className="bg-ink/85 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-ivory backdrop-blur-sm">
              {t.objects.comingSoon}
            </span>
          </div>
        ) : null
      }
      ctas={
        buyable ? (
          <>
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
            <Link
              to={`/shop/${item.id}`}
              className="link-underline text-xs uppercase tracking-widest text-muted"
            >
              {t.pdp.details}
            </Link>
          </>
        ) : null
      }
    />
  );
}
