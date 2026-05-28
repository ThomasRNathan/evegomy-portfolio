import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocale, LOCALES, LOCALE_LABEL } from "@/i18n";
import { useT } from "@/i18n/strings";

export function Header() {
  const { locale, setLocale } = useLocale();
  const t = useT();

  const links = [
    { to: "/work", label: t.nav.work },
    { to: "/books", label: t.nav.books },
    { to: "/objects", label: t.nav.objects },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ivory/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-baseline justify-between gap-6 px-6 py-5 md:px-10">
        <Link to="/" className="display text-2xl md:text-3xl leading-none whitespace-nowrap">
          Eve Gomy
        </Link>
        <nav className="hidden flex-wrap items-baseline gap-4 md:flex md:gap-7 lg:gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "link-underline whitespace-nowrap text-sm tracking-wider",
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1 text-[0.7rem] tracking-widest text-muted">
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
      <nav className="flex flex-wrap gap-4 border-t border-line/40 px-6 py-3 md:hidden">
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
