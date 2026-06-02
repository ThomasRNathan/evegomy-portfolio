import { useMemo } from "react";
import { objects } from "@/data/objects";
import { ObjectBanner } from "@/components/ObjectBanner";
import { useT } from "@/i18n/strings";

export default function Shop() {
  const t = useT();

  // Shop = everything purchasable (not "Collaborations" — those are showcase).
  const items = useMemo(
    () =>
      objects.filter(
        (o) => o.category !== "Collaborations" && !!o.priceCents && !o.comingSoon
      ),
    []
  );

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-10 md:px-10 md:pt-16">
      <p className="eyebrow">{t.shop.eyebrow}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.shop.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.shop.intro}
      </p>
      <div className="mt-6">
        {items.map((it, i) => (
          <ObjectBanner key={it.id} item={it} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
