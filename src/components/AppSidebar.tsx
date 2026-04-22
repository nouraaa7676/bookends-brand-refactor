import { useState, useMemo } from "react";
import bookEndsLogo from "@/assets/bookends-logo.webp";
import { Book } from "@/lib/books";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  books: Book[];
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  search: string;
  genre: string;
  quality: string;
}

const AppSidebar = ({ books, onFilterChange }: SidebarProps) => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [quality, setQuality] = useState("");

  const genres = useMemo(() => {
    const set = new Set(books.map((b) => b.genre));
    return ["All Genres", ...Array.from(set).sort()];
  }, [books]);

  const qualities = useMemo(() => {
    const set = new Set(books.map((b) => b.quality));
    return ["All Conditions", ...Array.from(set).sort()];
  }, [books]);

  const update = (s: string, g: string, q: string) => {
    setSearch(s);
    setGenre(g);
    setQuality(q);
    onFilterChange({ search: s, genre: g, quality: q });
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-secondary text-secondary-foreground">
      <div className="border-b border-sidebar-border p-4">
        <img src={bookEndsLogo} alt="BookEnds UAE" className="w-full rounded-lg" />
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider opacity-70">
            Search
          </label>
          <Input
            placeholder="Search books..."
            value={search}
            onChange={(e) => update(e.target.value, genre, quality)}
            className="border-sidebar-border bg-sidebar-accent text-secondary-foreground placeholder:text-secondary-foreground/40"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider opacity-70">
            Genre
          </label>
          <select
            value={genre}
            onChange={(e) => update(search, e.target.value, quality)}
            className="w-full rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-sm text-secondary-foreground"
          >
            {genres.map((g) => (
              <option key={g} value={g === "All Genres" ? "" : g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider opacity-70">
            Condition
          </label>
          <select
            value={quality}
            onChange={(e) => update(search, genre, e.target.value)}
            className="w-full rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-sm text-secondary-foreground"
          >
            {qualities.map((q) => (
              <option key={q} value={q === "All Conditions" ? "" : q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => update("", "", "")}
          className="mt-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Clear Filters
        </button>
      </div>

      <div className="border-t border-sidebar-border p-4 text-center text-xs opacity-60">
        © 2024 BookEnds UAE
      </div>
    </aside>
  );
};

export default AppSidebar;
