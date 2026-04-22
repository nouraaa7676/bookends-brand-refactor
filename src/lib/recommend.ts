import { Book } from "./books";

export interface Recommendation {
  title: string;
  author: string;
  genre: string;
  price: number;
  quality: string;
  similarity: number;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function cosineSim(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  a.forEach((v, k) => {
    dot += v * (b.get(k) || 0);
    magA += v * v;
  });
  b.forEach((v) => {
    magB += v * v;
  });
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function bookToVector(book: Book): Map<string, number> {
  const tokens = tokenize(
    `${book.title} ${book.author} ${book.genre} ${book.description}`
  );
  const freq = new Map<string, number>();
  tokens.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1));
  return freq;
}

export function recommendByTitle(
  title: string,
  books: Book[],
  topN = 5
): Recommendation[] {
  const target = books.find(
    (b) => b.title.toLowerCase() === title.toLowerCase()
  );
  if (!target) return [];

  const targetVec = bookToVector(target);
  const scored = books
    .filter((b) => b.title !== target.title)
    .map((b) => ({
      book: b,
      score: cosineSim(targetVec, bookToVector(b)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored.map((s) => ({
    title: s.book.title,
    author: s.book.author,
    genre: s.book.genre,
    price: s.book.price,
    quality: s.book.quality,
    similarity: s.score,
  }));
}

export function recommendByGenre(
  genre: string,
  books: Book[],
  topN = 6
): Recommendation[] {
  const filtered = books.filter((b) =>
    b.genre.toLowerCase().includes(genre.toLowerCase())
  );
  const selected =
    filtered.length > topN
      ? filtered.sort(() => Math.random() - 0.5).slice(0, topN)
      : filtered;

  return selected.map((b) => ({
    title: b.title,
    author: b.author,
    genre: b.genre,
    price: b.price,
    quality: b.quality,
    similarity: 1.0,
  }));
}

export function recommendByMood(
  text: string,
  books: Book[],
  topN = 6
): Recommendation[] {
  const keywords = tokenize(text);
  if (keywords.length === 0) return [];

  const scored = books
    .map((b) => {
      const combined = `${b.title} ${b.author} ${b.genre} ${b.description}`.toLowerCase();
      let matches = 0;
      keywords.forEach((k) => {
        if (combined.includes(k)) matches++;
      });
      return { book: b, score: matches / keywords.length };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored.map((s) => ({
    title: s.book.title,
    author: s.book.author,
    genre: s.book.genre,
    price: s.book.price,
    quality: s.book.quality,
    similarity: s.score,
  }));
}
