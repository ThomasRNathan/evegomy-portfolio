import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/strings";
import { useCart } from "@/cart";
import { bio } from "@/data/bio";

export default function Success() {
  const t = useT();
  const { clear } = useCart();

  // Empty the cart on successful return from Stripe.
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="mx-auto max-w-[900px] px-6 pt-20 pb-24 text-center md:px-10 md:pt-32">
      <p className="eyebrow">{t.success.eyebrow}</p>
      <h1 className="display mt-4 text-4xl leading-[1.1] md:text-6xl">
        {t.success.title}
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink/85">
        {t.success.body}
      </p>
      <div className="mt-12 flex flex-col items-center gap-6">
        <Link
          to="/shop"
          className="border border-ink px-8 py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          {t.success.backToShop}
        </Link>
        <p className="text-sm text-muted">
          {t.success.contact}{" "}
          <a className="link-underline text-ink" href={`mailto:${bio.contact.email}`}>
            {bio.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
