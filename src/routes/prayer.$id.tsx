import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { prayers } from "@/lib/prayers-data";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/prayer/$id")({
  component: PrayerDetail,
});

function PrayerDetail() {
  const { id } = Route.useParams();
  const prayer = prayers.find((p) => p.id === id);
  const [showLatin, setShowLatin] = useState(false);

  if (!prayer) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <h1 className="font-serif text-3xl">Prayer not found</h1>
          <Link to="/prayers" className="mt-4 inline-block text-primary">
            ← Back to prayers
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link
        to="/prayers"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All prayers
      </Link>

      <header className="mt-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{prayer.category}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{prayer.title}</h1>
        <div className="gold-divider mt-5 mx-auto w-24" />
      </header>

      {prayer.latin && (
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-full border border-border p-1 text-xs">
            <button
              onClick={() => setShowLatin(false)}
              className={`px-3 py-1 rounded-full transition-colors ${
                !showLatin ? "bg-primary/15 text-primary" : "text-muted-foreground"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setShowLatin(true)}
              className={`px-3 py-1 rounded-full transition-colors ${
                showLatin ? "bg-primary/15 text-primary" : "text-muted-foreground"
              }`}
            >
              Latin
            </button>
            <button
              onClick={() => setShowLatin(false)}
              className={`px-3 py-1 rounded-full transition-colors ${
                showLatin ? "bg-primary/15 text-primary" : "text-muted-foreground"
              }`}
            >
              Kalenjin
            </button>
          </div>
        </div>
      )}

      <article className="mt-10 max-w-2xl mx-auto rounded-xl border border-border bg-card p-8 sm:p-12">
        <pre className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-center">
          {showLatin && prayer.latin ? prayer.latin : prayer.text}
        </pre>
      </article>
    </AppLayout>
  );
}