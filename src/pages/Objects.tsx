import { useMemo, useState } from "react";
import { objects, type ObjectCategory } from "@/data/objects";
import { WorkCard } from "@/components/WorkCard";
import { useT } from "@/i18n/strings";

type Filter = "all" | "Posters" | "Foulards" | "Skateboards" | "Collaborations";

export default function Objects() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return objects;
    return objects.filter((o) => o.category === (filter as ObjectCategory));
  }, [filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.objects.filters.all },
    { key: "Posters", label: t.objects.filters.posters },
    { key: "Foulards", label: t.objects.filters.foulards },
    { key: "Skateboards", label: t.objects.filters.skateboards },
    { key: "Collaborations", label: t.objects.filters.collaborations },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">{t.objects.eyebrow}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.objects.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.objects.intro}
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
        {visible.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
