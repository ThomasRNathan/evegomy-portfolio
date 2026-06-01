import { useMemo, useState } from "react";
import { objects, type ObjectCategory } from "@/data/objects";
import { WorkCard } from "@/components/WorkCard";
import { useT } from "@/i18n/strings";

type Filter = "all" | "Posters" | "Foulards" | "Skateboards";

export default function Shop() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");

  // Shop = everything buyable except Collaborations
  const shopItems = useMemo(
    () => objects.filter((o) => o.category !== "Collaborations" && !!o.priceCents),
    []
  );

  const visible = useMemo(() => {
    if (filter === "all") return shopItems;
    return shopItems.filter((o) => o.category === (filter as ObjectCategory));
  }, [filter, shopItems]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.shop.filters.all },
    { key: "Posters", label: t.shop.filters.posters },
    { key: "Foulards", label: t.shop.filters.foulards },
    { key: "Skateboards", label: t.shop.filters.skateboards },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">{t.shop.eyebrow}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.shop.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.shop.intro}
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
