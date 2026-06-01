import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { objects } from "@/data/objects";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";
import { useCart } from "@/cart";
import { formatPrice, cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { locale } = useLocale();
  const t = useT();
  const { addItem, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const item = objects.find((o) => o.id === id);
  if (!item) {
    return (
      <section className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10">
        <p className="eyebrow">404</p>
        <h1 className="display mt-3 text-3xl">{t.notFound.title}</h1>
        <Link to="/shop" className="mt-6 inline-block link-underline">
          {t.success.backToShop}
        </Link>
      </section>
    );
  }

  const buyable = !item.comingSoon && !!item.priceCents;
  const editionLine = (() => {
    if (item.madeToOrder && item.leadTime) {
      return `${t.edition.madeToOrder} — ${item.leadTime[locale]}`;
    }
    if (item.editionSize === 1) return t.edition.unique;
    if (item.editionRemaining != null && item.editionSize && item.editionRemaining < item.editionSize) {
      return t.edition.remaining(item.editionRemaining, item.editionSize);
    }
    if (item.editionSize) return t.edition.ofN(item.editionSize);
    return null;
  })();

  const onAdd = () => {
    addItem(item.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };
  const onBuyNow = () => {
    addItem(item.id);
    openCart();
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10 md:pt-14">
      <button
        onClick={() => navigate(-1)}
        className="link-underline text-xs uppercase tracking-widest text-muted"
      >
        {t.pdp.back}
      </button>

      <div className="mt-6 grid gap-10 md:grid-cols-12 md:gap-16">
        {/* Gallery */}
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            <img
              src={item.images[activeImage]}
              alt={item.title[locale]}
              className={cn(
                "h-full w-full object-cover",
                item.blurred && "scale-110 blur-2xl"
              )}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          {item.images.length > 1 ? (
            <div className="mt-3 grid grid-cols-5 gap-3">
              {item.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square overflow-hidden bg-cream",
                    i === activeImage ? "outline outline-1 outline-ink" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Detail */}
        <div className="md:col-span-5 md:pt-2">
          <p className="eyebrow">{item.category}</p>
          <h1 className="display mt-3 text-3xl leading-tight md:text-5xl">
            {item.title[locale]}
          </h1>
          {item.priceCents ? (
            <p className="display mt-4 text-2xl">
              {formatPrice(item.priceCents, item.currency ?? "EUR")}
            </p>
          ) : null}
          {editionLine ? (
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">
              {editionLine}
            </p>
          ) : null}

          <p className="mt-6 text-base leading-relaxed text-ink/85">
            {(item.longDescription ?? item.description)[locale]}
          </p>

          {buyable ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onBuyNow}
                className="bg-ink px-6 py-3 text-xs uppercase tracking-widest text-ivory transition-opacity hover:opacity-90"
              >
                {t.pdp.buyNow}
              </button>
              <button
                onClick={onAdd}
                className={cn(
                  "border border-ink px-6 py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory",
                  added && "bg-ink text-ivory"
                )}
              >
                {added ? t.pdp.added : t.pdp.addToCart}
              </button>
            </div>
          ) : item.comingSoon ? (
            <p className="mt-8 inline-block bg-ink/85 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-ivory">
              {t.objects.comingSoon}
            </p>
          ) : null}

          {item.details && item.details.length > 0 ? (
            <dl className="mt-10 border-t border-line pt-6 text-sm">
              {item.details.map((d, i) => (
                <div key={i} className="flex justify-between gap-6 py-2">
                  <dt className="uppercase tracking-widest text-[0.7rem] text-muted">
                    {d.label[locale]}
                  </dt>
                  <dd className="max-w-[60%] text-right text-ink/85">{d.value[locale]}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-10 space-y-6 border-t border-line pt-6 text-sm leading-relaxed text-ink/80">
            <div>
              <p className="eyebrow">{t.pdp.shippingTitle}</p>
              <p className="mt-2">{t.pdp.shippingBody}</p>
            </div>
            <div>
              <p className="eyebrow">{t.pdp.returnsTitle}</p>
              <p className="mt-2">{t.pdp.returnsBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
