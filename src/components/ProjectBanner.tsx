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
  imageOverlay,
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
  reverse?: boolean;
  imageOverlay?: ReactNode;
}) {
  return (
    <article className="grid items-center gap-6 border-t border-line py-6 md:grid-cols-12 md:gap-10 md:py-10">
      <div className={reverse ? "md:order-2 md:col-span-5" : "md:col-span-5"}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <h2 className="display text-2xl leading-[1.05] md:text-4xl">{title}</h2>
          {year ? <span className="text-xs text-muted">{year}</span> : null}
        </div>
        {price ? <p className="mt-2 display text-xl">{price}</p> : null}
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/85 md:text-[0.95rem]">
          {description}
        </p>
        {meta}
        {ctas ? <div className="mt-4 flex flex-wrap items-center gap-3">{ctas}</div> : null}
      </div>
      <div className={"relative " + (reverse ? "md:order-1 md:col-span-7" : "md:col-span-7")}>
        <Carousel images={images} blurred={blurred} />
        {imageOverlay}
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
