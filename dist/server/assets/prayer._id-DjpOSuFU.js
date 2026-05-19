import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppLayout } from "./app-layout-B_7fCuwf.js";
import { R as Route, a as prayers } from "./router-y3Ku7_p9.js";
import { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { p as prayerTranslations, g as getPrayerText, L as LANGUAGE_LABELS } from "./translations-BAGvPC92.js";
import { u as useCustomPrayers, a as useFavorites } from "./custom-prayers-BL1HuWWf.js";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@tanstack/react-query";
function PrayerDetail() {
  const {
    id
  } = Route.useParams();
  const {
    customPrayers,
    ready
  } = useCustomPrayers();
  const prayer = prayers.find((p) => p.id === id) ?? customPrayers.find((p) => p.id === id);
  const [language, setLanguage] = useState("en");
  const {
    isFavorite,
    toggle
  } = useFavorites();
  if (!prayer && id.startsWith("custom-") && !ready) {
    return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx("div", { className: "py-20 text-center text-sm text-muted-foreground", children: "Loading prayer…" }) });
  }
  if (!prayer) {
    return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl", children: "Prayer not found" }),
      /* @__PURE__ */ jsx(Link, { to: "/prayers", className: "mt-4 inline-block text-primary", children: "← Back to prayers" })
    ] }) });
  }
  const availableLanguages = ["en"];
  if (prayer.latin) availableLanguages.push("la");
  const t = prayerTranslations[prayer.id];
  if (t?.sw) availableLanguages.push("sw");
  if (t?.kip) availableLanguages.push("kip");
  const {
    text
  } = getPrayerText(prayer.id, prayer.text, prayer.latin, language);
  const fav = isFavorite(prayer.id);
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/prayers", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " All prayers"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => toggle(prayer.id), "aria-pressed": fav, "aria-label": fav ? "Remove from favorites" : "Add to favorites", className: `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${fav ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${fav ? "fill-current" : ""}` }),
        fav ? "Saved" : "Save"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "mt-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: prayer.category }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl sm:text-5xl", children: prayer.title }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-5 mx-auto w-24" })
    ] }),
    availableLanguages.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "inline-flex flex-wrap justify-center rounded-full border border-border p-1 text-xs", children: availableLanguages.map((lang) => /* @__PURE__ */ jsx("button", { onClick: () => setLanguage(lang), className: `px-3 py-1 rounded-full transition-colors ${language === lang ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`, children: LANGUAGE_LABELS[lang] }, lang)) }) }),
    /* @__PURE__ */ jsxs("article", { className: "mt-10 max-w-2xl mx-auto rounded-xl border border-border bg-card p-8 sm:p-12", children: [
      /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap font-serif text-lg leading-relaxed text-center", children: text }),
      (language === "sw" || language === "kip") && /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "Community translation — corrections welcome." })
    ] })
  ] });
}
export {
  PrayerDetail as component
};
