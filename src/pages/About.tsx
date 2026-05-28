import { bio } from "@/data/bio";

export default function About() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow">About</p>
      <div className="mt-3 grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h1 className="display text-4xl leading-[1.1] md:text-6xl">
            {bio.short}
          </h1>
          <div className="mt-12 space-y-6 text-base leading-relaxed text-ink/85">
            {bio.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <aside className="border-t border-line pt-8 md:col-span-5 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="eyebrow">Contact</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <span className="text-muted">Email — </span>
              <a className="link-underline" href={`mailto:${bio.contact.email}`}>
                {bio.contact.email}
              </a>
            </li>
            <li>
              <span className="text-muted">Instagram — </span>
              <a
                className="link-underline"
                href={bio.contact.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {bio.contact.instagramHandle}
              </a>
            </li>
            <li>
              <span className="text-muted">Based in — </span>
              {bio.location}
            </li>
          </ul>

          <p className="eyebrow mt-12">Publishers</p>
          <ul className="mt-6 space-y-2 text-sm text-ink/80">
            <li>Seuil Jeunesse <span className="text-muted">— Color Series</span></li>
            <li>Didier Jeunesse <span className="text-muted">— Dans la nature</span></li>
            <li>Franco Cosimo Panini <span className="text-muted">— Italian editions</span></li>
          </ul>

          <p className="eyebrow mt-12">Education</p>
          <p className="mt-6 text-sm text-ink/80">
            HEAR — Haute école des arts du Rhin, Strasbourg
            <br />
            DNSEP / Master in Illustration, 2021
          </p>
        </aside>
      </div>

      <div className="mt-24 border-t border-line pt-12">
        <p className="eyebrow">Latest from Instagram</p>
        <p className="mt-3 text-sm text-muted">
          Follow{" "}
          <a
            className="link-underline text-ink"
            href={bio.contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            {bio.contact.instagramHandle}
          </a>{" "}
          for new work, sketches and process.
        </p>
      </div>
    </section>
  );
}
