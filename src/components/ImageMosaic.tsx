import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/data/gallery";

const spanClass: Record<NonNullable<GalleryItem["span"]>, string> = {
  sm: "col-span-2 row-span-2",
  md: "col-span-3 row-span-2",
  lg: "col-span-4 row-span-3",
  tall: "col-span-2 row-span-3",
  wide: "col-span-4 row-span-2",
};

export function ImageMosaic({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid auto-rows-[120px] grid-cols-6 gap-3 md:auto-rows-[140px] md:gap-4">
      {items.map((item) => (
        <figure
          key={item.id}
          className={cn(
            "group relative overflow-hidden bg-cream",
            spanClass[item.span ?? "sm"]
          )}
        >
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/70 to-transparent p-3 text-xs text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {item.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
