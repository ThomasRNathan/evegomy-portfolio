import { useMemo, useState } from "react";
import { products } from "@/data/crafts";
import { ProductCard } from "@/components/ProductCard";

const categories = ["All", "Foulards", "Skateboards", "Prints"] as const;
type Category = (typeof categories)[number];

const map: Record<Category, (string | null)[]> = {
  All: [],
  Foulards: ["foulard"],
  Skateboards: ["skateboard"],
  Prints: ["print"],
};

export default function Shop() {
  const [category, setCategory] = useState<Category>("All");

  const visible = useMemo(() => {
    if (category === "All") return products;
    const allowed = map[category];
    return products.filter((p) => allowed.includes(p.type));
  }, [category]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">Shop</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">Editions & objects</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        Foulards, hand-painted skateboards and limited prints. Made in small
        editions, signed and numbered. Shipped from Paris.
      </p>

      <div className="mt-12 flex gap-6 border-b border-line pb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              "text-xs uppercase tracking-widest " +
              (category === c ? "text-ink" : "text-muted hover:text-ink")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
