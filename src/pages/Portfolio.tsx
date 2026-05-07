import { useMemo, useState } from "react";
import { books } from "@/data/books";
import { BookCard } from "@/components/BookCard";

const filters = ["All", "Color Series", "Standalone"] as const;
type Filter = (typeof filters)[number];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return books;
    if (filter === "Color Series") return books.filter((b) => b.series === "Color Series");
    return books.filter((b) => !b.series);
  }, [filter]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">Portfolio</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">Books & illustrations</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        A growing collection of picture books, series and one-off illustrations.
        Each piece is a slow walk: light, weather, the passing of a season.
      </p>

      <div className="mt-12 flex gap-6 border-b border-line pb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "text-xs uppercase tracking-widest " +
              (filter === f ? "text-ink" : "text-muted hover:text-ink")
            }
          >
            {f}
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
