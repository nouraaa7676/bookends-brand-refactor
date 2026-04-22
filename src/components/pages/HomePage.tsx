import { useMemo } from "react";
import { Book } from "@/lib/books";
import RecommendationCard from "@/components/RecommendationCard";

interface HomePageProps {
  books: Book[];
}

const HomePage = ({ books }: HomePageProps) => {
  const stats = useMemo(() => {
    const genres = new Set(books.map((b) => b.genre));
    const authors = new Set(books.map((b) => b.author));
    const genreCounts: Record<string, number> = {};
    books.forEach((b) => {
      genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
    });
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    return { total: books.length, genres: genres.size, authors: authors.size, topGenre };
  }, [books]);

  const featured = useMemo(() => {
    const shuffled = [...books].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6).map((b) => ({
      title: b.title,
      author: b.author,
      genre: b.genre,
      price: b.price,
      quality: b.quality,
      similarity: 0.85,
    }));
  }, [books]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, dear reader";
    if (hour < 17) return "Good afternoon, story seeker";
    return "Good evening, book wanderer";
  })();

  return (
    <div>
      {/* Header Banner */}
      <div className="rounded-2xl bg-secondary p-8 text-center text-secondary-foreground">
        <h1 className="font-heading text-3xl font-bold">
          BookEnds UAE
        </h1>
        <p className="mt-2 text-sm opacity-80">
          UAE's largest online used book platform — Where every book finds a new home
        </p>
      </div>

      {/* Welcome Banner */}
      <div className="mt-6 rounded-xl border-2 border-border bg-accent p-6 text-center">
        <h2 className="font-heading text-xl font-semibold text-primary">
          ✨ {greeting} ✨
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to your book haven. Let us help you find your next great read...
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6">
        <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
          📖 Our Library's Tale
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "📚 Books Available", value: stats.total },
            { label: "✍️ Authors", value: stats.authors },
            { label: "🏷️ Genres", value: stats.genres },
            { label: "🌟 Top Genre", value: stats.topGenre },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border-2 border-border bg-card p-4 text-center transition-transform hover:-translate-y-1"
            >
              <p className="font-heading text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Books */}
      <div className="mt-8">
        <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
          🌟 Featured Books
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Popular stories our readers love...
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((rec) => (
            <RecommendationCard key={rec.title} rec={rec} />
          ))}
        </div>
      </div>

      {/* Info Columns */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-border bg-card p-6">
          <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
            🎭 How It Works
          </h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li><strong>Choose your path</strong> — By genre, title, or mood</li>
            <li><strong>Our AI</strong> searches through all books</li>
            <li><strong>Discover</strong> your next great read</li>
          </ol>
          <p className="mt-3 text-xs italic text-muted-foreground">
            Each recommendation is crafted with care...
          </p>
        </div>
        <div className="rounded-xl border-2 border-border bg-card p-6">
          <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
            ✨ Features
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>🔮 <strong>Ask Us</strong> — Get answers to common questions</li>
            <li>📚 <strong>Genre Search</strong> — Explore by category</li>
            <li>🎯 <strong>Similar Books</strong> — Find books like your favorites</li>
            <li>💭 <strong>Mood Search</strong> — Search by feeling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
