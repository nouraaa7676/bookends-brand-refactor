import { useState } from "react";
import bookEndsLogo from "@/assets/bookends-logo.webp";
import { Home, Search, MessageCircle, BarChart3, Info } from "lucide-react";

export type PageId = "home" | "find" | "faq" | "dashboard" | "about";

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home size={18} /> },
  { id: "find", label: "Find Books", icon: <Search size={18} /> },
  { id: "faq", label: "Ask Us", icon: <MessageCircle size={18} /> },
  { id: "dashboard", label: "Library Map", icon: <BarChart3 size={18} /> },
  { id: "about", label: "About", icon: <Info size={18} /> },
];

interface SidebarNavProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const SidebarNav = ({ activePage, onNavigate }: SidebarNavProps) => {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-secondary text-secondary-foreground">
      {/* Logo */}
      <div className="border-b border-sidebar-border p-4">
        <img src={bookEndsLogo} alt="BookEnds UAE" className="w-full rounded-lg" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider opacity-60">
          Navigation
        </p>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                activePage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground/80 hover:bg-sidebar-accent hover:text-secondary-foreground"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 text-center text-xs opacity-50">
        <p>BookEnds UAE © 2024</p>
        <p className="mt-1">UAE's largest online used book platform</p>
      </div>
    </aside>
  );
};

export default SidebarNav;
