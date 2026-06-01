import { Link } from "react-router-dom";
import { hero } from "@/data/gallery";
import { useT } from "@/i18n/strings";

export default function Home() {
  const t = useT();
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-6 md:px-10 md:pt-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream md:aspect-[21/10]">
          <img
            src={hero.src}
            alt={hero.alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mt-16 flex flex-col items-center gap-10 pb-8 text-center md:mt-24 md:gap-14 md:pb-16">
          <p className="eyebrow">{t.home.role} — {t.home.location}</p>
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-20">
            <Link
              to="/work"
              className="display text-3xl tracking-tight link-underline md:text-5xl"
            >
              {t.home.ctaAllWork}
            </Link>
            <span aria-hidden className="text-muted">·</span>
            <Link
              to="/objects"
              className="display text-3xl tracking-tight link-underline md:text-5xl"
            >
              {t.home.ctaShop}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
