import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Carousel } from "@/components/Carousel";

export type BannerImage = { src: string; alt: string };

export function ProjectBanner({
  eyebrow,
  title,
  year,
  description,
  images,
  blurred,
  price,
  ctas,
  meta,
  reverse,
}: {
  eyebrow?: string;
  title: string;
  year?: number;
  description: string;
  images: BannerImage[];
  blurred?: boolean;
  price?: string;
  ctas?: ReactNode;
  meta?: ReactNode;
  /** Flip text/image side every other banner for editorial rhythm */
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-12 md:py-20">
      <div className={reverse ? "md:order-2 md:col-span-5" : "md:col-span-5"}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h2 className="display text-3xl leading-[1.05] md:text-5xl">
            {title}
          </h2>
          {year ? <span className="text-sm text-muted">{year}</span> : null}
        </div>
        {price ? (
          <p className="mt-3 display text-2xl">{price}</p>
        ) : null}
        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/85">
          {description}
        </p>
        {meta}
        {ctas ? <div className="mt-6 flex flex-wrap items-center gap-4">{ctas}</div> : null}
      </div>
      <div className={reverse ? "md:order-1 md:col-span-7" : "md:col-span-7"}>
        <Carousel images={images} aspect="aspect-[3/2]" blurred={blurred} />
      </div>
    </article>
  );
}

export function ProjectBannerLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="link-underline text-xs uppercase tracking-widest">
      {children}
    </Link>
  );
}
