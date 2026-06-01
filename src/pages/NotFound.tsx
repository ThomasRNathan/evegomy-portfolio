import { Link } from "react-router-dom";
import { useT } from "@/i18n/strings";

export default function NotFound() {
  const t = useT();
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col items-start gap-12 px-6 pt-12 pb-20 md:flex-row md:items-stretch md:gap-16 md:px-10 md:pt-20">
      <div className="aspect-[3/4] w-full max-w-md overflow-hidden bg-cream md:w-1/2">
        <img
          src="/placeholders/eve-souris-rose.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="md:flex-1 md:pt-10">
        <p className="eyebrow">{t.notFound.eyebrow}</p>
        <h1 className="display mt-4 text-4xl leading-[1.05] md:text-6xl">
          {t.notFound.title}
        </h1>
        <Link
          to="/"
          className="mt-10 inline-block border border-ink px-6 py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          {t.notFound.backHome}
        </Link>
      </div>
    </section>
  );
}
