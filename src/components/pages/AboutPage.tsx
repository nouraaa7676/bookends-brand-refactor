const AboutPage = () => {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-secondary">
        📜 About BookEnds
      </h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        The story of our platform...
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border-2 border-border bg-card p-6">
            <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
              ✨ Welcome, Dear Reader
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              In the heart of Dubai's Silicon Oasis, BookEnds was born with a simple mission —
              to give every book a second chance and every reader access to affordable, quality reads.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>BookEnds</strong> is more than just a bookstore — it's a sanctuary for book lovers,
              a gathering place for readers, and a platform connecting thousands of used books with new homes.
            </p>
          </div>

          <div className="rounded-xl border-2 border-border bg-card p-6">
            <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
              🔮 Our Recommendation System
            </h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Our AI-powered system helps you discover books using:
            </p>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>Content-Based Filtering</strong>: We analyze the essence of each book
              </li>
              <li>
                <strong>TF-IDF Analysis</strong>: Understanding text patterns and relevance
              </li>
              <li>
                <strong>Cosine Similarity</strong>: Finding kindred spirits among books
              </li>
              <li>
                <strong>Smart Ranking</strong>: Presenting the most relevant recommendations first
              </li>
            </ol>
          </div>

          <div className="rounded-xl border-2 border-border bg-card p-6">
            <h3 className="mb-3 font-heading text-lg font-semibold text-secondary">
              🏢 Visit Us
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Location:</strong> Dubai Digital Park, Silicon Oasis Building A3, Lower Ground
              </p>
              <p>
                <strong>Hours:</strong> Daily, 10:00 AM - 10:00 PM
              </p>
              <p>
                <strong>Contact:</strong> support@bookends.ae
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-border bg-accent p-6 text-center">
            <h3 className="mb-2 font-heading text-lg font-semibold text-primary">
              ✨ Our Promise
            </h3>
            <p className="text-sm text-muted-foreground">
              Every recommendation is crafted with care, every question answered with dedication,
              and every reader treated as a valued member of our community.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border-2 border-border bg-card p-5">
            <h3 className="mb-3 font-heading text-base font-semibold text-secondary">
              🛠️ Built With
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>⚛️ <strong>React</strong> — Frontend framework</li>
              <li>🎨 <strong>Tailwind CSS</strong> — Styling</li>
              <li>📊 <strong>Recharts</strong> — Visualizations</li>
              <li>🤖 <strong>TF-IDF</strong> — Recommendation engine</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-border bg-card p-5">
            <h3 className="mb-3 font-heading text-base font-semibold text-secondary">
              📜 Version Info
            </h3>
            <p className="text-sm font-semibold text-primary">BookEnds AI v2.0</p>
            <p className="mt-1 text-xs italic text-muted-foreground">
              The BookEnds Edition
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Released: 2024</p>
          </div>

          <div className="rounded-xl border-2 border-border bg-card p-5">
            <h3 className="mb-3 font-heading text-base font-semibold text-secondary">
              💫 A Final Word
            </h3>
            <blockquote className="border-l-4 border-primary pl-3 text-sm italic text-muted-foreground">
              "A reader lives a thousand lives before they die..."
            </blockquote>
            <p className="mt-2 text-right text-xs text-muted-foreground">
              — George R.R. Martin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
