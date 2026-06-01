import { Link } from "react-router-dom";
import { hero } from "@/data/gallery";
import { useT } from "@/i18n/strings";

export default function Home() {
  const t = useT();
  return (
    <>
      {/* Full-bleed cinematic hero */}
      <section className="relative -mt-[1px] h-[calc(100dvh-5.5rem)] min-h-[520px] w-full overflow-hidden bg-cream md:h-[calc(100dvh-4.5rem)]">
        <img
          src={hero.src}
          alt={hero.alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory via-ivory/0 to-ivory/0" />
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-4 px-6 text-center md:bottom-12">
          <p className="eyebrow text-ink/70">
            {t.home.role} — {t.home.location}
          </p>
          <p className="display text-2xl leading-tight md:text-4xl">
            <span className="font-jp inline-block animate-yohaku">{t.home.heroJp}</span>
          </p>
        </div>
      </section>

      {/* Centered CTA pair */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mt-16 flex flex-col items-center gap-10 pb-8 text-center md:mt-24 md:gap-14 md:pb-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-20">
            <Link
              to="/work"
              className="display text-3xl tracking-tight link-underline md:text-5xl"
            >
              {t.home.ctaAllWork}
            </Link>
            <span aria-hidden className="text-muted">·</span>
            <Link
              to="/shop"
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
