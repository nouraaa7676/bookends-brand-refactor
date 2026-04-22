import { useState, useMemo } from "react";
import { Book } from "@/lib/books";
import { recommendByGenre, recommendByTitle, recommendByMood, Recommendation } from "@/lib/recommend";
import RecommendationCard from "@/components/RecommendationCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FindBooksPageProps {
  books: Book[];
}

const FindBooksPage = ({ books }: FindBooksPageProps) => {
  const [genreResults, setGenreResults] = useState<Recommendation[]>([]);
  const [titleResults, setTitleResults] = useState<Recommendation[]>([]);
  const [moodResults, setMoodResults] = useState<Recommendation[]>([]);
  const [moodText, setMoodText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [searched, setSearched] = useState({ genre: false, title: false, mood: false });

  const genres = useMemo(
    () => [...new Set(books.map((b) => b.genre))].sort(),
    [books]
  );

  const titles = useMemo(() => books.map((b) => b.title).sort(), [books]);

  const moodExamples = ["inspiring", "mysterious", "heartwarming", "adventurous", "romantic"];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-secondary">
        🔍 Find Your Next Read
      </h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Discover books that match your taste...
      </p>

      <Tabs defaultValue="genre">
        <TabsList className="mb-6 w-full justify-start gap-2 bg-accent p-1">
          <TabsTrigger value="genre" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            📚 By Genre
          </TabsTrigger>
          <TabsTrigger value="title" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🎯 By Title
          </TabsTrigger>
          <TabsTrigger value="mood" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            💭 By Mood
          </TabsTrigger>
        </TabsList>

        {/* By Genre */}
        <TabsContent value="genre">
          <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
            Enter a genre portal
          </h3>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="mb-4 w-full max-w-sm rounded-lg border-2 border-border bg-card px-4 py-2.5 text-sm text-foreground"
          >
            <option value="">Choose a genre...</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <br />
          <button
            onClick={() => {
              if (selectedGenre) {
                setGenreResults(recommendByGenre(selectedGenre, books));
                setSearched((s) => ({ ...s, genre: true }));
              }
            }}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            🔮 Explore Genre
          </button>
          {searched.genre && (
            <div className="mt-6">
              {genreResults.length === 0 ? (
                <p className="text-sm text-muted-foreground">No books found in this genre.</p>
              ) : (
                <>
                  <h4 className="mb-3 font-heading text-base font-semibold text-secondary">
                    ✨ Books from the {selectedGenre} genre
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {genreResults.map((r) => (
                      <RecommendationCard key={r.title} rec={r} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </TabsContent>

        {/* By Title */}
        <TabsContent value="title">
          <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
            Find books similar to one you love
          </h3>
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="mb-4 w-full max-w-md rounded-lg border-2 border-border bg-card px-4 py-2.5 text-sm text-foreground"
          >
            <option value="">Choose a book...</option>
            {titles.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <br />
          <button
            onClick={() => {
              if (selectedTitle) {
                setTitleResults(recommendByTitle(selectedTitle, books));
                setSearched((s) => ({ ...s, title: true }));
              }
            }}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            🔮 Find Similar Books
          </button>
          {searched.title && (
            <div className="mt-6">
              {titleResults.length === 0 ? (
                <p className="text-sm text-muted-foreground">No similar books found.</p>
              ) : (
                <>
                  <h4 className="mb-3 font-heading text-base font-semibold text-secondary">
                    📚 Books similar to '{selectedTitle}'
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {titleResults.map((r) => (
                      <RecommendationCard key={r.title} rec={r} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </TabsContent>

        {/* By Mood */}
        <TabsContent value="mood">
          <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
            Describe the mood you seek
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            What feelings do you want your next book to bring?
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {moodExamples.map((m) => (
              <button
                key={m}
                onClick={() => setMoodText(m)}
                className="rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {m}
              </button>
            ))}
          </div>
          <textarea
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            placeholder="e.g., 'books that make my heart soar' or 'mysterious adventures'"
            className="mb-4 w-full max-w-md rounded-lg border-2 border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
            rows={3}
          />
          <br />
          <button
            onClick={() => {
              if (moodText.trim()) {
                setMoodResults(recommendByMood(moodText, books));
                setSearched((s) => ({ ...s, mood: true }));
              }
            }}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            🔮 Find by Mood
          </button>
          {searched.mood && (
            <div className="mt-6">
              {moodResults.length === 0 ? (
                <p className="text-sm text-muted-foreground">No books match that mood. Try different words!</p>
              ) : (
                <>
                  <h4 className="mb-3 font-heading text-base font-semibold text-secondary">
                    ✨ Books That Match Your Mood
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {moodResults.map((r) => (
                      <RecommendationCard key={r.title} rec={r} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FindBooksPage;
