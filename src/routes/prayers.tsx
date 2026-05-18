import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { prayers, prayerCategories } from "@/lib/prayers-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/prayers")({
  component: PrayersPage,
  head: () => ({
    meta: [
      { title: "Catholic Prayers — Lumen" },
      { name: "description", content: "The treasury of Catholic prayers — Our Father, Hail Mary, litanies, devotions, and more." },
    ],
  }),
});

function PrayersPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = prayers.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase().trim();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <AppLayout>
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Treasury
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl">Catholic Prayers</h1>
        <div className="gold-divider mt-5 mx-auto w-24" />
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prayers…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...prayerCategories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              category === cat
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-border/60 border-y border-border/60">
        {filtered.map((p) => (
          <li key={p.id}>
            <Link
              to="/prayer/$id"
              params={{ id: p.id }}
              className="flex items-center justify-between py-4 group"
            >
              <div>
                <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-12 text-center text-muted-foreground">No prayers found.</li>
        )}
      </ul>
    </AppLayout>
  );
}