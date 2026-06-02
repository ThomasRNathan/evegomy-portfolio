import { hero } from "@/data/gallery";
import { books } from "@/data/books";
import { objects } from "@/data/objects";
import { useT } from "@/i18n/strings";
import { BookBanner } from "@/components/BookBanner";
import { ObjectBanner } from "@/components/ObjectBanner";

const find = <T extends { id: string }>(list: T[], id: string): T | null =>
  list.find((x) => x.id === id) ?? null;

export default function Home() {
  const t = useT();

  // Curated banner stream — books and objects interleaved for editorial rhythm.
  const stream = [
    { kind: "book" as const, item: find(books, "dans-la-nature") },
    { kind: "object" as const, item: find(objects, "foulard-aube") },
    { kind: "book" as const, item: find(books, "ecureuil-bleu") },
    { kind: "object" as const, item: find(objects, "tea-packaging") },
    { kind: "object" as const, item: find(objects, "poster-series-bleu") },
    { kind: "book" as const, item: find(books, "grenouille-rouge") },
    { kind: "object" as const, item: find(objects, "skate-lune") },
    { kind: "object" as const, item: find(objects, "bedding") },
    { kind: "book" as const, item: find(books, "quatre-saisons") },
    { kind: "object" as const, item: find(objects, "poster-filles-qui-dorment") },
    { kind: "book" as const, item: find(books, "chat-jaune") },
    { kind: "object" as const, item: find(objects, "foulard-crepuscule") },
    { kind: "book" as const, item: find(books, "souris-rose") },
    { kind: "object" as const, item: find(objects, "skate-custom") },
    { kind: "object" as const, item: find(objects, "poster-salon-livre") },
    { kind: "object" as const, item: find(objects, "gin") },
  ].filter((row) => row.item !== null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[calc(100dvh-9rem)] min-h-[420px] w-full overflow-hidden bg-cream">
        <img
          src={hero.src}
          alt={hero.alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory via-ivory/0 to-ivory/0" />
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-6 text-center md:bottom-12">
          <p className="eyebrow text-ink/70">
            {t.home.role} — {t.home.location}
          </p>
          <p className="font-jp inline-block animate-yohaku text-2xl md:text-4xl">
            {t.home.heroJp}
          </p>
        </div>
      </section>

      {/* Curated banner stream */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        {stream.map((row, i) =>
          row.kind === "book" ? (
            <BookBanner key={`b-${row.item!.id}`} book={row.item!} reverse={i % 2 === 1} />
          ) : (
            <ObjectBanner key={`o-${row.item!.id}`} item={row.item!} reverse={i % 2 === 1} />
          )
        )}
      </section>
    </>
  );
}
