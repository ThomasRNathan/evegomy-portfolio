import type { Book } from "@/data/books";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl">{book.title}</h3>
        <span className="text-xs text-muted">{book.year}</span>
      </div>
      {book.publisher ? (
        <p className="mt-1 text-xs uppercase tracking-widest text-muted">
          {book.publisher}
        </p>
      ) : null}
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/80">
        {book.description}
      </p>
    </article>
  );
}
