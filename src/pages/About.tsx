import { bio } from "@/data/bio";
import { useLocale } from "@/i18n";
import { useT } from "@/i18n/strings";

export default function About() {
  const t = useT();
  const { locale } = useLocale();
  const paragraphs = bio.aboutParagraphs[locale];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">{t.about.title}</p>
      <div className="mt-3 grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h1 className="display text-4xl leading-[1.1] md:text-6xl">
            {t.home.bio}
          </h1>
          <div className="mt-10 aspect-[4/5] overflow-hidden bg-cream md:max-w-md">
            <img
              src="/placeholders/eve-portrait.jpg"
              alt="Eve Gomy"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-ink/85">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <aside className="border-t border-line pt-8 md:col-span-5 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="eyebrow">{t.about.publishers}</p>
          <ul className="mt-6 space-y-2 text-sm text-ink/80">
            <li>
              Seuil Jeunesse <span className="text-muted">— Color Series</span>
            </li>
            <li>
              Didier Jeunesse <span className="text-muted">— Dans la nature</span>
            </li>
            <li>
              ACCÈS Éditions <span className="text-muted">— Les Quatre Saisons</span>
            </li>
            <li>
              Franco Cosimo Panini{" "}
              <span className="text-muted">— Italian editions</span>
            </li>
            <li>
              Leetra{" "}
              <span className="text-muted">— Spanish editions (México)</span>
            </li>
          </ul>

          <p className="eyebrow mt-12">{t.about.education}</p>
          <p className="mt-6 text-sm text-ink/80">
            {t.about.educationLine1}
            <br />
            {t.about.educationLine2}
          </p>
        </aside>
      </div>

      <div className="mt-24 border-t border-line pt-12">
        <p className="eyebrow">{t.about.latestInsta}</p>
        <p className="mt-3 text-sm text-muted">
          {t.about.followPre}{" "}
          <a
            className="link-underline text-ink"
            href={bio.contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            {bio.contact.instagramHandle}
          </a>{" "}
          {t.about.followPost}
        </p>
      </div>
    </section>
  );
}
