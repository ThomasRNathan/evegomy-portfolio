import { Link } from "react-router-dom";
import { hero, mosaic } from "@/data/gallery";
import { ImageMosaic } from "@/components/ImageMosaic";
import { bio } from "@/data/bio";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-6 md:px-10 md:pt-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-cream md:aspect-[21/9]">
          <img
            src={hero.src}
            alt={hero.alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">{bio.role} — {bio.location}</p>
            <h1 className="display mt-4 text-4xl leading-[1.05] md:text-6xl">
              Books, illustrations and quiet objects —
              <span className="font-jp"> 余白 </span>
              between dawn and dusk.
            </h1>
          </div>
          <p className="text-base leading-relaxed text-ink/80 md:col-span-5 md:pt-2">
            {bio.short}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-24 md:px-10">
        <div className="mb-6 flex items-baseline justify-between md:mb-10">
          <p className="eyebrow">Selected work</p>
          <Link to="/portfolio" className="link-underline text-sm">
            See all
          </Link>
        </div>
        <ImageMosaic items={mosaic} />
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-6 md:mt-32 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <Link
            to="/portfolio"
            className="group block border-t border-line pt-8"
          >
            <p className="eyebrow">01 — Portfolio</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">
              Books, prints and illustrations.
            </h2>
            <span className="mt-6 inline-block link-underline text-sm">Enter</span>
          </Link>
          <Link
            to="/shop"
            className="group block border-t border-line pt-8"
          >
            <p className="eyebrow">02 — Shop</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">
              Foulards, skateboards, editions.
            </h2>
            <span className="mt-6 inline-block link-underline text-sm">Browse</span>
          </Link>
        </div>
      </section>
    </>
  );
}
