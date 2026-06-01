import { Link } from "react-router-dom";
import { bio } from "@/data/bio";
import { useT } from "@/i18n/strings";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-32 border-t border-line/60">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-5">
          <p className="display text-3xl">Eve Gomy</p>
          <p className="mt-2 text-sm text-muted">
            {t.footer.role} — {bio.location}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/75">
            {t.footer.tagline}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">{t.footer.cols.shop}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li><Link className="link-underline" to="/shop">{t.nav.shop}</Link></li>
            <li><Link className="link-underline" to="/books">{t.nav.books}</Link></li>
            <li><Link className="link-underline" to="/objects">{t.nav.objects}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow">{t.footer.cols.about}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li><Link className="link-underline" to="/about">{t.nav.about}</Link></li>
            <li><Link className="link-underline" to="/contact">{t.nav.contact}</Link></li>
            <li>
              <a className="link-underline" href={bio.contact.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow">{t.footer.cols.legal}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <a className="link-underline" href={`mailto:${bio.contact.email}`}>
                {bio.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-5 text-[0.7rem] uppercase tracking-widest text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Eve Gomy. {t.footer.rights}</p>
          <p>Made in France · Signed & numbered · Tracked shipping worldwide</p>
        </div>
      </div>
    </footer>
  );
}
