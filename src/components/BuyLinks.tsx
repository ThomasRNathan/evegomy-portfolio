import type { PurchaseLink } from "@/data/books";
import { useT } from "@/i18n/strings";

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function BuyLinks({ links }: { links: PurchaseLink[] }) {
  const t = useT();
  if (!links || links.length === 0) return null;
  return (
    <div className="mt-6 border-t border-line pt-5">
      <p className="eyebrow mb-3">{t.books.buyOnline}</p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => {
          const domain = domainOf(l.url);
          return (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 border border-line bg-ivory px-3 py-2 text-[0.7rem] uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
            >
              {domain ? (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                  alt=""
                  aria-hidden
                  className="h-4 w-4 shrink-0 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : null}
              <span>{l.retailer}</span>
              {l.region ? (
                <span className="text-muted group-hover:text-ivory/70">· {l.region}</span>
              ) : null}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-60">
                <path
                  d="M2 8L8 2M8 2H4M8 2V6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
}
