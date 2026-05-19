import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import {
  mysteries,
  rosarySteps,
  getTodaysMystery,
} from "@/lib/rosary-data";
import type { MysterySet } from "@/lib/rosary-data";
import { ArrowLeft, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getRosaryStepText } from "@/lib/rosary-translation";
import { LANGUAGE_LABELS } from "@/lib/translations";
import type { PrayerLanguage } from "@/lib/translations";

type RosaryLang = Exclude<PrayerLanguage, "la">;
const ROSARY_LANGS: RosaryLang[] = ["en", "sw", "kip"];

export const Route = createFileRoute("/rosary")({
  component: RosaryPage,
  head: () => ({
    meta: [
      { title: "The Holy Rosary — Lucerna" },
      {
        name: "description",
        content:
          "Pray the Holy Rosary in order, with the mysteries aligned to today.",
      },
      { property: "og:title", content: "The Holy Rosary — Lucerna" },
      {
        property: "og:description",
        content: "Daily Rosary with the proper mysteries for today.",
      },
    ],
  }),
});

const SETS: MysterySet[] = ["Joyful", "Sorrowful", "Glorious", "Luminous"];

function RosaryPage() {
  const today = getTodaysMystery();
  const [selected, setSelected] = useState<MysterySet>(today);
  const [language, setLanguage] = useState<RosaryLang>("en");
  const active = mysteries[selected];

  return (
    <AppLayout>
      <Link
        to="/prayers"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All prayers
      </Link>

      <header className="mt-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Marian Devotion</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">The Holy Rosary</h1>
        <div className="gold-divider mt-5 mx-auto w-24" />
        <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
          Today is {new Date().toLocaleDateString(undefined, { weekday: "long" })} —
          the <span className="text-primary">{today}</span> Mysteries are prayed today.
        </p>
      </header>

      {/* Mystery selector */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Mysteries of the Rosary</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SETS.map((set) => {
            const isToday = set === today;
            const isActive = set === selected;
            return (
              <button
                key={set}
                onClick={() => setSelected(set)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {set}
                {isToday && (
                  <span className="ml-2 text-xs uppercase tracking-widest text-primary/80">
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {selected}: {mysteries[selected].day}
        </p>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {active.mysteries.map((m, i) => (
            <li
              key={m.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                <Sparkles className="h-3.5 w-3.5" /> {i + 1}{ordinal(i + 1)} Mystery
              </div>
              <h3 className="mt-2 font-serif text-xl">{m.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{m.scripture}</p>
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Fruit: </span>
                {m.fruit}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Order of prayers */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl">How to Pray the Rosary</h2>
        <div className="gold-divider mt-3 w-16" />

        <div className="mt-4 flex justify-center">
          <div className="inline-flex flex-wrap justify-center rounded-full border border-border p-1 text-xs">
            {ROSARY_LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  language === lang
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>

        <Accordion type="multiple" className="mt-6 space-y-3">
          {rosarySteps.map((step) => {
            const { instruction, prayer } = getRosaryStepText(
              step.label,
              step.instruction,
              step.prayer,
              language,
            );
            return (
              <AccordionItem
                key={step.label}
                value={step.label}
                className="rounded-xl border border-border bg-card px-5 border-b"
              >
                <AccordionTrigger className="font-serif text-lg text-primary hover:no-underline">
                  {step.label}
                </AccordionTrigger>
                <AccordionContent>
                  {instruction && (
                    <p className="text-sm text-muted-foreground">{instruction}</p>
                  )}
                  {prayer && (
                    <pre className="mt-3 whitespace-pre-wrap font-serif text-base leading-relaxed">
                      {prayer}
                    </pre>
                  )}
                  {language !== "en" && (
                    <p className="mt-4 text-xs text-muted-foreground">
                      Community translation.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <p className="mt-8 text-center text-xs text-muted-foreground ornament">
          Holy Mary, pray for us.
        </p>
      </section>
    </AppLayout>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
