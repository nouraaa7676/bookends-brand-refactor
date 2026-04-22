import { Book } from "@/lib/books";

interface BookCardProps {
  book: Book;
}

const qualityColor = (quality: string) => {
  switch (quality.toLowerCase()) {
    case "like new": return "bg-primary/10 text-primary";
    case "good": return "bg-accent text-accent-foreground";
    case "fair": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="group rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 animate-fade-in">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold leading-tight text-secondary line-clamp-2">
          {book.title}
        </h3>
        <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
          AED {book.price}
        </span>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">by {book.author}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${qualityColor(book.quality)}`}>
          {book.quality}
        </span>
        <span className="inline-block rounded-full bg-muted px-3 py-0.5 text-xs text-muted-foreground">
          {book.genre}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
