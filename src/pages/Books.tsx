import { books } from "@/data/books";
import { BookBanner } from "@/components/BookBanner";
import { useT } from "@/i18n/strings";

export default function Books() {
  const t = useT();
  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-10 md:px-10 md:pt-16">
      <p className="eyebrow">{t.books.eyebrow}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.books.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.books.intro}
      </p>
      <div className="mt-6">
        {books.map((b, i) => (
          <BookBanner key={b.id} book={b} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
