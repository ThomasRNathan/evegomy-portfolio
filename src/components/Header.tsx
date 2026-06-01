import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocale, LOCALES, LOCALE_LABEL } from "@/i18n";
import { useT } from "@/i18n/strings";
import { useCart } from "@/cart";

export function Header() {
  const { locale, setLocale } = useLocale();
  const { itemCount, openCart } = useCart();
  const t = useT();

  const links = [
    { to: "/shop", label: t.nav.shop, accent: true },
    { to: "/work", label: t.nav.work },
    { to: "/books", label: t.nav.books },
    { to: "/objects", label: t.nav.objects },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ivory/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-5 md:px-10">
        <Link to="/" className="display text-2xl md:text-3xl leading-none whitespace-nowrap">
          Eve Gomy
        </Link>
        <nav className="hidden flex-wrap items-baseline gap-x-5 gap-y-2 md:flex lg:gap-x-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "link-underline whitespace-nowrap text-sm tracking-wider",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                  l.accent && !isActive ? "text-ink" : ""
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-[0.7rem] tracking-widest text-muted">
          <button
            type="button"
            onClick={openCart}
            aria-label={`${t.cart.title} (${itemCount})`}
            className="relative inline-flex items-center text-lg leading-none hover:scale-110 transition-transform"
          >
            <span aria-hidden>🛒</span>
            {itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-terracotta px-1 text-[0.6rem] font-medium text-ivory">
                {itemCount}
              </span>
            ) : null}
          </button>
          <span className="text-muted/40">·</span>
          {LOCALES.map((l, i) => (
            <span key={l} className="flex items-center">
              {i > 0 ? <span className="mx-1 text-muted/50">·</span> : null}
              <button
                type="button"
                onClick={() => setLocale(l)}
                className={cn(
                  "uppercase",
                  locale === l ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {LOCALE_LABEL[l]}
              </button>
            </span>
          ))}
        </div>
      </div>
      <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line/40 px-6 py-3 md:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              cn(
                "text-xs tracking-wider",
                isActive ? "text-ink" : "text-muted"
              )
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
