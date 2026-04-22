import { useState, useEffect } from "react";
import { loadBooks, Book } from "@/lib/books";
import SidebarNav, { PageId } from "@/components/SidebarNav";
import HomePage from "@/components/pages/HomePage";
import FindBooksPage from "@/components/pages/FindBooksPage";
import FaqPage from "@/components/pages/FaqPage";
import DashboardPage from "@/components/pages/DashboardPage";
import AboutPage from "@/components/pages/AboutPage";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageId>("home");

  useEffect(() => {
    loadBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">📖 Loading the library...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SidebarNav activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-y-auto p-8">
        {activePage === "home" && <HomePage books={books} />}
        {activePage === "find" && <FindBooksPage books={books} />}
        {activePage === "faq" && <FaqPage />}
        {activePage === "dashboard" && <DashboardPage books={books} />}
        {activePage === "about" && <AboutPage />}

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>📖 Every book is a new adventure waiting to begin 📖</p>
          <p className="mt-1 text-xs">
            © 2024 BookEnds UAE | UAE's largest online used book platform
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
