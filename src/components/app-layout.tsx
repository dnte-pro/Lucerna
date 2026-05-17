import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";
import { Home, BookOpen, Hand, Calendar } from "lucide-react";
import { SettingsSheet } from "./settings-sheet";

const nav = [
  { to: "/", label: "Today", icon: Home },
  { to: "/readings", label: "Readings", icon: BookOpen },
  { to: "/prayers", label: "Prayers", icon: Hand },
  { to: "/calendar", label: "Calendar", icon: Calendar },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-wide gold-text">Lumen</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
              Officium
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SettingsSheet />
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-12">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-5xl grid grid-cols-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <footer className="hidden md:block border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        <span className="ornament">Ad maiorem Dei gloriam</span>
      </footer>
    </div>
  );
}