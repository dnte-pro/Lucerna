import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { getTodayReading } from "@/lib/daily-readings";
import { formatDate } from "@/lib/liturgical";

export const Route = createFileRoute("/readings")({
  component: ReadingsPage,
  head: () => ({
    meta: [
      { title: "Daily Readings — Lumen" },
      { name: "description", content: "Today's Mass readings: the Word for this day in the Church." },
    ],
  }),
});

function ReadingsPage() {
  const r = getTodayReading();
  return (
    <AppLayout>
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Daily Readings
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl">{formatDate()}</h1>
        <p className="mt-2 text-sm text-primary">
          {r.season} · Liturgical color: {r.seasonColor}
        </p>
        <div className="gold-divider mt-5 mx-auto w-24" />
      </header>

      <article className="space-y-10 max-w-2xl mx-auto">
        <ReadingBlock label="First Reading" reference={r.firstReading.ref}>
          <p className="font-serif leading-relaxed">{r.firstReading.text}</p>
        </ReadingBlock>

        <ReadingBlock label="Responsorial Psalm" reference={r.psalm.ref}>
          <p className="font-serif italic text-primary">R. {r.psalm.response}</p>
          <p className="mt-3 font-serif leading-relaxed">{r.psalm.text}</p>
        </ReadingBlock>

        <ReadingBlock label="Gospel" reference={r.gospel.ref}>
          <p className="font-serif leading-relaxed">{r.gospel.text}</p>
        </ReadingBlock>

        <section className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-widest text-primary">Reflection</p>
          <p className="mt-3 font-serif italic text-lg leading-snug">“{r.reflection}”</p>
        </section>
      </article>
    </AppLayout>
  );
}

function ReadingBlock({
  label,
  reference,
  children,
}: {
  label: string;
  reference: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-border/60 pb-2">
        <h2 className="text-xs uppercase tracking-widest text-primary">{label}</h2>
        <span className="text-xs text-muted-foreground">{reference}</span>
      </div>
      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}