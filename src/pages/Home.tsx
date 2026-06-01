import { Link } from "react-router-dom";
import { hero, mosaic } from "@/data/gallery";
import { ImageMosaic } from "@/components/ImageMosaic";
import { useT } from "@/i18n/strings";

export default function Home() {
  const t = useT();
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
            <p className="eyebrow">{t.home.role} — {t.home.location}</p>
            <h1 className="display mt-4 text-4xl leading-[1.05] md:text-6xl">
              {t.home.heroLeft}
              <span className="font-jp"> {t.home.heroJp} </span>
              {t.home.heroRight}
            </h1>
          </div>
          <p className="text-base leading-relaxed text-ink/80 md:col-span-5 md:pt-2">
            {t.home.bio}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-24 md:px-10">
        <div className="mb-6 flex items-baseline justify-between md:mb-10">
          <p className="eyebrow">{t.home.selectedWork}</p>
          <Link to="/work" className="link-underline text-sm">
            {t.home.seeAll}
          </Link>
        </div>
        <ImageMosaic items={mosaic} />
      </section>

    </>
  );
}
