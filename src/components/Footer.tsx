import { bio } from "@/data/bio";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line/60">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="display text-3xl">Eve Gomy</p>
          <p className="mt-2 text-sm text-muted">{bio.role} — {bio.location}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted md:items-end">
          <a className="link-underline text-ink" href={`mailto:${bio.contact.email}`}>
            {bio.contact.email}
          </a>
          <a
            className="link-underline text-ink"
            href={bio.contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram {bio.contact.instagramHandle}
          </a>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} Eve Gomy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
