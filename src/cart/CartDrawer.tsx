import { useEffect, useState } from "react";
import { useCart } from "@/cart";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";
import { formatPrice, cn } from "@/lib/utils";

async function startCheckout(items: { productId: string; quantity: number }[]) {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Checkout failed");
  }
  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

export function CartDrawer() {
  const t = useT();
  const { locale } = useLocale();
  const { isOpen, closeCart, enriched, subtotalCents, itemCount, removeItem, updateQuantity, lines } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const onCheckout = async () => {
    if (lines.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      await startCheckout(lines);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={cn(
          "fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        role="dialog"
        aria-label={t.cart.title}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-baseline justify-between border-b border-line px-6 py-5">
          <h2 className="display text-2xl">
            {t.cart.title}
            {itemCount > 0 ? (
              <span className="ml-2 text-sm text-muted">({itemCount})</span>
            ) : null}
          </h2>
          <button
            onClick={closeCart}
            className="text-xs uppercase tracking-widest text-muted hover:text-ink"
          >
            {t.cart.close}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {enriched.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted">{t.cart.empty}</p>
          ) : (
            <ul className="space-y-6">
              {enriched.map((line) => (
                <li key={line.productId} className="flex gap-4">
                  <div className="aspect-square w-20 shrink-0 overflow-hidden bg-cream">
                    <img
                      src={line.item.images[0]}
                      alt={line.item.title[locale]}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="display text-base leading-tight">
                        {line.item.title[locale]}
                      </p>
                      <span className="text-sm text-ink whitespace-nowrap">
                        {formatPrice(line.lineCents, line.item.currency ?? "EUR")}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                          className="px-2 py-1 text-muted hover:text-ink"
                          aria-label="−"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                          className="px-2 py-1 text-muted hover:text-ink"
                          aria-label="+"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.productId)}
                        className="link-underline text-muted hover:text-ink"
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-line px-6 py-5">
          {enriched.length > 0 ? (
            <>
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">{t.cart.subtotal}</span>
                <span className="display text-2xl">
                  {formatPrice(subtotalCents, "EUR")}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{t.cart.shippingNote}</p>
              {error ? (
                <p className="mt-3 text-xs text-terracotta">{error}</p>
              ) : null}
              <div className="mt-5 flex flex-col gap-3">
                <button
                  onClick={onCheckout}
                  disabled={loading}
                  className="w-full bg-ink py-3 text-xs uppercase tracking-widest text-ivory transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  {loading ? t.cart.loading : t.cart.checkout}
                </button>
                <button
                  onClick={closeCart}
                  className="w-full border border-ink py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={closeCart}
              className="w-full border border-ink py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              {t.cart.continueShopping}
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
