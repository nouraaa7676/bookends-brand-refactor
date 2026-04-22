import { useState, useEffect, useMemo } from "react";
import { loadBooks, Book } from "@/lib/books";
import AppSidebar, { Filters } from "@/components/AppSidebar";
import BookCard from "@/components/BookCard";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: "", genre: "", quality: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        !filters.search ||
        b.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.author.toLowerCase().includes(filters.search.toLowerCase());
      const matchGenre = !filters.genre || b.genre === filters.genre;
      const matchQuality = !filters.quality || b.quality === filters.quality;
      return matchSearch && matchGenre && matchQuality;
    });
  }, [books, filters]);

  const stats = useMemo(() => {
    const genres = new Set(books.map((b) => b.genre));
    const authors = new Set(books.map((b) => b.author));
    return { total: books.length, genres: genres.size, authors: authors.size };
  }, [books]);

  return (
    <div className="flex min-h-screen">
      <AppSidebar books={books} onFilterChange={setFilters} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="border-b border-border bg-secondary px-8 py-6">
          <h1 className="text-3xl font-bold text-secondary-foreground">
            BookEnds UAE
          </h1>
          <p className="mt-1 text-sm text-secondary-foreground/70">
            UAE's largest online used book platform
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 border-b border-border px-8 py-4">
          {[
            { label: "Books", value: stats.total },
            { label: "Genres", value: stats.genres },
            { label: "Authors", value: stats.authors },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-accent p-3 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Book Grid */}
        <div className="p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-secondary">
              {filters.search || filters.genre || filters.quality
                ? `Results (${filtered.length})`
                : `All Books (${filtered.length})`}
            </h2>
          </div>

          {loading ? (
            <p className="py-12 text-center text-muted-foreground">Loading books…</p>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No books match your filters.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((book) => (
                <BookCard key={book.sku} book={book} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
