import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { prayers } from "@/lib/prayers-data";
import { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import {
  LANGUAGE_LABELS,
  getPrayerText,
  prayerTranslations,
} from "@/lib/translations";
import type { PrayerLanguage } from "@/lib/translations";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/prayer/$id")({
  component: PrayerDetail,
});

function PrayerDetail() {
  const { id } = Route.useParams();
  const prayer = prayers.find((p) => p.id === id);
  const [language, setLanguage] = useState<PrayerLanguage>("en");
  const { isFavorite, toggle } = useFavorites();

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

  const availableLanguages: PrayerLanguage[] = ["en"];
  if (prayer.latin) availableLanguages.push("la");
  const t = prayerTranslations[prayer.id];
  if (t?.sw) availableLanguages.push("sw");
  if (t?.kip) availableLanguages.push("kip");

  const { text } = getPrayerText(prayer.id, prayer.text, prayer.latin, language);
  const fav = isFavorite(prayer.id);

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <Link
          to="/prayers"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All prayers
        </Link>
        <button
          onClick={() => toggle(prayer.id)}
          aria-pressed={fav}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
            fav
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
          {fav ? "Saved" : "Save"}
        </button>
      </div>

      <header className="mt-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{prayer.category}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{prayer.title}</h1>
        <div className="gold-divider mt-5 mx-auto w-24" />
      </header>

      {availableLanguages.length > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="inline-flex flex-wrap justify-center rounded-full border border-border p-1 text-xs">
            {availableLanguages.map((lang) => (
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
      )}

      <article className="mt-10 max-w-2xl mx-auto rounded-xl border border-border bg-card p-8 sm:p-12">
        <pre className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-center">
          {text}
        </pre>
        {(language === "sw" || language === "kip") && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Corrections welcomed.
          </p>
        )}
      </article>
    </AppLayout>
  );
}