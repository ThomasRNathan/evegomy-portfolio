import { useMemo, useState } from "react";
import { books } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { useT } from "@/i18n/strings";

type Filter = "all" | "colorSeries" | "album" | "bookCd";

export default function Books() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return books;
    if (filter === "colorSeries") return books.filter((b) => b.series === "Color Series");
    if (filter === "album") return books.filter((b) => b.series === "Album");
    return books.filter((b) => b.series === "Book-CD");
  }, [filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.books.filters.all },
    { key: "colorSeries", label: t.books.filters.colorSeries },
    { key: "album", label: t.books.filters.album },
    { key: "bookCd", label: t.books.filters.bookCd },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">{t.books.eyebrow}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.books.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.books.intro}
      </p>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={
              "text-xs uppercase tracking-widest " +
              (filter === f.key ? "text-ink" : "text-muted hover:text-ink")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
        {visible.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  );
}
