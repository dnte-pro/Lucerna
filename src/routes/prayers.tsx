import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AppLayout } from "@/components/app-layout";
import { prayers, prayerCategories } from "@/lib/prayers-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Heart, Sparkles, PenLine } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { useCustomPrayers } from "@/lib/custom-prayers";

export const Route = createFileRoute("/prayers")({
  component: PrayersPage,
  head: () => ({
    meta: [
      { title: "Catholic Prayers — Lucerna" },
      { name: "description", content: "The treasury of Catholic prayers — Our Father, Hail Mary, litanies, devotions, and more." },
    ],
  }),
});

function PrayersPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [favOnly, setFavOnly] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customText, setCustomText] = useState("");
  const { isFavorite, toggle, favorites } = useFavorites();
  const { customPrayers, addCustomPrayer } = useCustomPrayers();

  const allPrayers = useMemo(
    () => [...customPrayers, ...prayers],
    [customPrayers],
  );

  const categories = useMemo(
    () => (customPrayers.length > 0 ? ["All", "Custom", ...prayerCategories] : ["All", ...prayerCategories]),
    [customPrayers.length],
  );

  const filtered = allPrayers.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase().trim();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
    const matchFav = !favOnly || isFavorite(p.id);
    return matchCat && matchQ && matchFav;
  });

  const canSaveCustom = customTitle.trim().length > 0 && customText.trim().length > 0;

  function handleCustomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSaveCustom) return;

    addCustomPrayer({ title: customTitle, text: customText });
    setCategory("Custom");
    setFavOnly(false);
    setQuery("");
    setCustomTitle("");
    setCustomText("");
    setCustomOpen(false);
  }

  return (
    <AppLayout>
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Treasury
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl">Catholic Prayers</h1>
        <div className="gold-divider mt-5 mx-auto w-24" />
      </header>

      <Link
        to="/rosary"
        className="mb-8 block rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-6 transition-colors hover:border-primary"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
          <Sparkles className="h-4 w-4" /> Marian Devotion
        </div>
        <h2 className="mt-2 font-serif text-2xl">The Holy Rosary →</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pray the Rosary in order, with today's mysteries already selected.
        </p>
      </Link>

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
        <div className="grid gap-2 sm:w-40">
          <button
            onClick={() => setCustomOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs text-primary transition-colors hover:border-primary"
          >
            <PenLine className="h-4 w-4" />
            New prayer
          </button>
          <button
            onClick={() => setFavOnly((v) => !v)}
            className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors ${
              favOnly
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className={`h-4 w-4 ${favOnly ? "fill-current" : ""}`} />
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
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
        {filtered.map((p) => {
          const fav = isFavorite(p.id);
          return (
            <li key={p.id} className="flex items-center gap-3 py-4 group">
              <button
                onClick={() => toggle(p.id)}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                className={`shrink-0 rounded-full p-2 transition-colors ${
                  fav ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
              </button>
              <Link
                to="/prayer/$id"
                params={{ id: p.id }}
                className="flex flex-1 items-center justify-between"
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
          );
        })}
        {filtered.length === 0 && (
          <li className="py-12 text-center text-muted-foreground">No prayers found.</li>
        )}
      </ul>

      <Dialog open={customOpen} onOpenChange={setCustomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Add Custom Prayer</DialogTitle>
            <DialogDescription>
              Save a personal prayer to this device.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-prayer-title">Title</Label>
              <Input
                id="custom-prayer-title"
                value={customTitle}
                onChange={(event) => setCustomTitle(event.target.value)}
                placeholder="Prayer title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-prayer-text">Prayer</Label>
              <Textarea
                id="custom-prayer-text"
                value={customText}
                onChange={(event) => setCustomText(event.target.value)}
                placeholder="Write your prayer…"
                className="min-h-40 font-serif leading-relaxed"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCustomOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!canSaveCustom}>
                Save prayer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
