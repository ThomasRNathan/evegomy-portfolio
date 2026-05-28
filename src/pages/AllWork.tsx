import { useMemo, useState } from "react";
import { books } from "@/data/books";
import { objects, type ObjectCategory } from "@/data/objects";
import { BookCard } from "@/components/BookCard";
import { WorkCard } from "@/components/WorkCard";
import { useT } from "@/i18n/strings";

type Filter = "all" | "books" | ObjectCategory;

export default function AllWork() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const showBooks = filter === "all" || filter === "books";
  const filteredObjects = useMemo(() => {
    if (filter === "all") return objects;
    if (filter === "books") return [];
    return objects.filter((o) => o.category === filter);
  }, [filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.work.filters.all },
    { key: "books", label: t.work.filters.books },
    { key: "Posters", label: t.work.filters.posters },
    { key: "Foulards", label: t.work.filters.foulards },
    { key: "Skateboards", label: t.work.filters.skateboards },
    { key: "Collaborations", label: t.work.filters.collaborations },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">{t.work.eyebrow}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.work.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.work.intro}
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
        {showBooks && books.map((b) => <BookCard key={`b-${b.id}`} book={b} />)}
        {filteredObjects.map((o) => <WorkCard key={`o-${o.id}`} item={o} />)}
      </div>
    </section>
  );
}
