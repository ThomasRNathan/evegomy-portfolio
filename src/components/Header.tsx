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
    { to: "/", label: t.nav.all, end: true },
    { to: "/books", label: t.nav.books },
    { to: "/shop", label: t.nav.shop },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1400px] grid-cols-3 items-center gap-4 px-6 py-4 md:px-10 md:py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt=""
              className="h-9 w-auto md:h-11"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>
        </div>

        {/* Big name — centered */}
        <Link
          to="/"
          className="display whitespace-nowrap text-center text-2xl leading-none md:text-4xl lg:text-5xl"
        >
          Eve Gomy
        </Link>

        {/* Utility cluster — right */}
        <div className="flex items-center justify-end gap-3 text-[0.7rem] tracking-widest text-muted">
          <button
            type="button"
            onClick={openCart}
            aria-label={`${t.cart.title} (${itemCount})`}
            className="relative inline-flex items-center text-lg leading-none transition-transform hover:scale-110"
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

      {/* Section nav — centered, lezedh-style */}
      <nav className="border-t border-line/40">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-10 px-6 py-3 md:gap-16 md:px-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "link-underline whitespace-nowrap text-xs uppercase tracking-widest md:text-sm",
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
