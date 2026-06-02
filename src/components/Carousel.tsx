import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CarouselImage = {
  src: string;
  alt: string;
};

export function Carousel({
  images,
  blurred = false,
}: {
  images: CarouselImage[];
  blurred?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    // Recompute after each image loads (natural widths change after layout).
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => img.addEventListener("load", updateButtons));
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
      imgs.forEach((img) => img.removeEventListener("load", updateButtons));
    };
  }, [updateButtons, images.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const step = slide ? slide.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (images.length === 0) return null;
  const single = images.length === 1;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={cn(
          "flex h-[55vh] min-h-[320px] max-h-[600px] snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-smooth",
          "md:h-[60vh] md:max-h-[680px] md:gap-4",
          single && "justify-center",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {images.map((img, i) => (
          <figure
            key={i}
            data-slide
            className="relative h-full shrink-0 snap-start overflow-hidden bg-cream"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "block h-full w-auto max-w-none",
                blurred && "scale-110 blur-2xl"
              )}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </figure>
        ))}
      </div>

      {!single ? (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className={cn(
              "absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm backdrop-blur transition-opacity hover:bg-ivory",
              !canPrev && "pointer-events-none opacity-0"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className={cn(
              "absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm backdrop-blur transition-opacity hover:bg-ivory",
              !canNext && "pointer-events-none opacity-0"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
