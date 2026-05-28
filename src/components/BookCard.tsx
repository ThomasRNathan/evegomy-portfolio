import type { Book } from "@/data/books";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";

export function BookCard({ book }: { book: Book }) {
  const { locale } = useLocale();
  const t = useT();

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl">{book.title}</h3>
        {book.year ? <span className="text-xs text-muted">{book.year}</span> : null}
      </div>
      <p className="mt-1 text-xs uppercase tracking-widest text-muted">
        {book.publisher}
        {book.series ? <span className="ml-1 text-muted/70">— {book.series}</span> : null}
      </p>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/80">
        {book.description[locale]}
      </p>

      {book.translations && book.translations.length > 0 ? (
        <div className="mt-4">
          <p className="eyebrow">{t.books.translations}</p>
          <ul className="mt-2 space-y-1 text-xs text-muted">
            {book.translations.map((tr) => (
              <li key={tr.lang}>
                <span className="uppercase tracking-widest">{tr.lang}</span>{" — "}
                <em className="not-italic text-ink/70">{tr.title}</em>
                {" · "}
                {tr.publisher}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {book.purchaseLinks && book.purchaseLinks.length > 0 ? (
        <div className="mt-4">
          <p className="eyebrow">{t.books.buyOnline}</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {book.purchaseLinks.map((p) => (
              <li key={p.retailer}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-ink"
                >
                  {p.retailer}
                  {p.region ? <span className="ml-1 text-muted">({p.region})</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
