import { bio } from "@/data/bio";
import { useT } from "@/i18n/strings";

export default function Contact() {
  const t = useT();
  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">{t.contact.title}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{t.contact.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
        {t.contact.intro}
      </p>

      <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-16">
        <div>
          <p className="eyebrow">{t.contact.email}</p>
          <a
            className="display mt-4 block text-2xl link-underline text-ink"
            href={`mailto:${bio.contact.email}`}
          >
            {bio.contact.email}
          </a>
        </div>
        <div>
          <p className="eyebrow">{t.contact.instagram}</p>
          <a
            className="display mt-4 block text-2xl link-underline text-ink"
            href={bio.contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            {bio.contact.instagramHandle}
          </a>
        </div>
        <div>
          <p className="eyebrow">{t.contact.studio}</p>
          <p className="display mt-4 text-2xl text-ink">{t.contact.paris}</p>
        </div>
      </div>
    </section>
  );
}
