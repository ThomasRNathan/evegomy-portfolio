import type { Book } from "@/data/books";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";
import { ProjectBanner } from "@/components/ProjectBanner";
import { BuyLinks } from "@/components/BuyLinks";

export function BookBanner({ book, reverse }: { book: Book; reverse?: boolean }) {
  const { locale } = useLocale();
  const t = useT();

  const images = (book.images && book.images.length > 0 ? book.images : [book.cover]).map(
    (src) => ({ src, alt: book.title })
  );

  return (
    <ProjectBanner
      eyebrow={`${book.publisher}${book.series ? ` — ${book.series}` : ""}`}
      title={book.title}
      year={book.year}
      description={book.description[locale]}
      images={images}
      reverse={reverse}
      meta={
        <>
          {book.translations && book.translations.length > 0 ? (
            <ul className="mt-4 space-y-1 text-xs text-muted">
              <li className="eyebrow">{t.books.translations}</li>
              {book.translations.map((tr) => (
                <li key={tr.lang}>
                  <span className="uppercase tracking-widest">{tr.lang}</span>
                  {" — "}
                  <em className="not-italic text-ink/70">{tr.title}</em>
                  {" · "}
                  {tr.publisher}
                </li>
              ))}
            </ul>
          ) : null}
          {book.purchaseLinks && book.purchaseLinks.length > 0 ? (
            <BuyLinks links={book.purchaseLinks} />
          ) : null}
        </>
      }
    />
  );
}
