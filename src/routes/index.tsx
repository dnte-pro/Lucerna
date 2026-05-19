import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { getCurrentSeason, formatDate } from "@/lib/liturgical";
import { useDailyReading } from "@/lib/daily-readings";
import { prayers } from "@/lib/prayers-data";
import { BookOpen, Hand, Calendar, Sparkles, Sunrise, Moon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const season = getCurrentSeason();
  const { reading } = useDailyReading();
  const morning = prayers.find((p) => p.id === "morning-offering")!;
  const evening = prayers.find((p) => p.id === "night-prayer")!;

  return (
    <AppLayout>
      <section className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {formatDate()}
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-tight">
          Peace be with you.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
          A daily companion for prayer, the Word, and the rhythm of the Church.
        </p>
        <div className="gold-divider mt-6 mx-auto w-32" />
      </section>

      {/* Bento grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(140px,auto)]">
        {/* Today's reading — large */}
        <Link
          to="/readings"
          className="group sm:col-span-2 lg:row-span-2 rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <BookOpen className="h-4 w-4" /> Today's Gospel
          </div>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl">{reading.gospel.ref}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-[8] sm:line-clamp-[10]">
            {reading.gospel.text}
          </p>
          {reading.source === "api" && (
            <p className="mt-3 text-xs text-muted-foreground">
              Live readings loaded · full text opens on the readings page
            </p>
          )}
          <p className="mt-6 text-sm text-primary group-hover:underline">
            Read all of today's readings →
          </p>
        </Link>

        {/* Season */}
        <Link
          to="/calendar"
          className="rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Calendar className="h-4 w-4" /> Liturgical Season
          </div>
          <h3 className="mt-3 font-serif text-2xl">{season.name}</h3>
          <p className="mt-2 text-xs text-muted-foreground">Color: {season.color}</p>
          <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
            {season.description}
          </p>
        </Link>

        {/* Reflection */}
        <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/40 p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" /> Reflection
          </div>
          <p className="mt-3 font-serif italic text-lg leading-snug">
            “{reading.reflection}”
          </p>
        </div>

        {/* Morning */}
        <Link
          to="/prayer/$id"
          params={{ id: morning.id }}
          className="rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sunrise className="h-4 w-4" /> Morning
          </div>
          <h3 className="mt-3 font-serif text-xl">{morning.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            Offer the day to the Sacred Heart.
          </p>
        </Link>

        {/* Evening */}
        <Link
          to="/prayer/$id"
          params={{ id: evening.id }}
          className="rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Moon className="h-4 w-4" /> Evening
          </div>
          <h3 className="mt-3 font-serif text-xl">{evening.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            Commend the night to the Lord's keeping.
          </p>
        </Link>

        {/* Prayers library */}
        <Link
          to="/prayers"
          className="sm:col-span-2 rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Hand className="h-4 w-4" /> Treasury of Prayers
          </div>
          <h3 className="mt-3 font-serif text-2xl">
            {prayers.length} prayers · 6 categories
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            From the Pater Noster to the Litany of the Blessed Virgin Mary.
          </p>
        </Link>
      </section>
    </AppLayout>
  );
}
