import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { getCurrentSeason } from "@/lib/liturgical";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  head: () => ({
    meta: [
      { title: "Liturgical Calendar — Lucerna" },
      { name: "description", content: "Where we are in the Church's year — the season, its color, and its meaning." },
    ],
  }),
});

const SEASONS = [
  { name: "Advent", color: "Violet", desc: "Four weeks of joyful expectation, preparing for the coming of Christ at Christmas and at the end of the age." },
  { name: "Christmas", color: "White", desc: "From the Nativity to the Baptism of the Lord — the celebration of the Word made flesh." },
  { name: "Ordinary Time (I)", color: "Green", desc: "After Christmas, weeks of growth in the mystery of Christ before Lent." },
  { name: "Lent", color: "Violet", desc: "Forty days of prayer, fasting, and almsgiving in preparation for the Paschal Mystery." },
  { name: "Sacred Paschal Triduum", color: "Red / White", desc: "Holy Thursday, Good Friday, and the Easter Vigil — the summit of the liturgical year." },
  { name: "Easter", color: "White", desc: "Fifty days of paschal joy, culminating in Pentecost." },
  { name: "Ordinary Time (II)", color: "Green", desc: "After Pentecost, the longest stretch of the year, walking with Christ in his public ministry." },
];

function CalendarPage() {
  const current = getCurrentSeason();

  const swatch = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes("violet")) return "bg-purple-700";
    if (c.includes("red")) return "bg-red-700";
    if (c.includes("white")) return "bg-stone-100";
    if (c.includes("green")) return "bg-emerald-700";
    if (c.includes("rose")) return "bg-rose-400";
    return "bg-primary";
  };

  return (
    <AppLayout>
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Liturgical Year
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl">The Church's Year</h1>
        <div className="gold-divider mt-5 mx-auto w-24" />
      </header>

      <section className="mb-10 rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-primary">Right now</p>
        <h2 className="mt-2 font-serif text-4xl">{current.name}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Liturgical color: {current.color}</p>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          {current.description}
        </p>
      </section>

      <ul className="space-y-3">
        {SEASONS.map((s) => {
          const active = current.name === s.name || current.name === s.name.replace(/ \(.+\)/, "");
          return (
            <li
              key={s.name}
              className={`flex items-start gap-4 rounded-xl border p-5 ${
                active ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <span className={`mt-1 inline-block h-4 w-4 shrink-0 rounded-full border border-border ${swatch(s.color)}`} />
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-serif text-xl">{s.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.color}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </AppLayout>
  );
}