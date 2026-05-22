import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppLayout } from "./app-layout-CQSfll1D.js";
import { g as getCurrentSeason, f as formatDate } from "./liturgical-BnruEgxp.js";
import { u as useDailyReading } from "./daily-readings-BCzdyg_I.js";
import { a as prayers } from "./router-CC1Bbzc7.js";
import { BookOpen, Calendar, Sparkles, Sunrise, Moon, Hand } from "lucide-react";
import "react";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@tanstack/react-query";
function Index() {
  const season = getCurrentSeason();
  const {
    reading
  } = useDailyReading();
  const morning = prayers.find((p) => p.id === "morning-offering");
  const evening = prayers.find((p) => p.id === "night-prayer");
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: formatDate() }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl sm:text-5xl leading-tight", children: "Peace be with you." }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-xl mx-auto", children: "A daily companion for prayer, the Word, and the rhythm of the Church." }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-6 mx-auto w-32" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(140px,auto)]", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/readings", className: "group sm:col-span-2 lg:row-span-2 rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
          " Today's Gospel"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-serif text-2xl sm:text-3xl", children: reading.gospel.ref }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed line-clamp-[8] sm:line-clamp-[10]", children: reading.gospel.text }),
        reading.source === "api" && /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Live readings loaded · full text opens on the readings page" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-primary group-hover:underline", children: "Read all of today's readings →" })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/calendar", className: "rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
          " Liturgical Season"
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-2xl", children: season.name }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          "Color: ",
          season.color
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground line-clamp-3", children: season.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-gradient-to-br from-card to-card/40 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
          " Reflection"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 font-serif italic text-lg leading-snug", children: [
          "“",
          reading.reflection,
          "”"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/prayer/$id", params: {
        id: morning.id
      }, className: "rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(Sunrise, { className: "h-4 w-4" }),
          " Morning"
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-xl", children: morning.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: "Offer the day to the Sacred Heart." })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/prayer/$id", params: {
        id: evening.id
      }, className: "rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }),
          " Evening"
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-xl", children: evening.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: "Commend the night to the Lord's keeping." })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/prayers", className: "sm:col-span-2 rounded-xl border border-border bg-card p-6 hover:border-primary/60 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(Hand, { className: "h-4 w-4" }),
          " Treasury of Prayers"
        ] }),
        /* @__PURE__ */ jsxs("h3", { className: "mt-3 font-serif text-2xl", children: [
          prayers.length,
          " prayers · 6 categories"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "From the Pater Noster to the Litany of the Blessed Virgin Mary." })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
