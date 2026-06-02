import { books } from "@/data/books";
import { objects } from "@/data/objects";
import { BookBanner } from "@/components/BookBanner";
import { ObjectBanner } from "@/components/ObjectBanner";

const find = <T extends { id: string }>(list: T[], id: string): T | null =>
  list.find((x) => x.id === id) ?? null;

export default function Home() {
  // Curated banner stream — books and objects interleaved.
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
    <section className="mx-auto max-w-[1400px] px-6 md:px-10">
      {stream.map((row, i) =>
        row.kind === "book" ? (
          <BookBanner key={`b-${row.item!.id}`} book={row.item!} reverse={i % 2 === 1} />
        ) : (
          <ObjectBanner key={`o-${row.item!.id}`} item={row.item!} reverse={i % 2 === 1} />
        )
      )}
    </section>
  );
}
