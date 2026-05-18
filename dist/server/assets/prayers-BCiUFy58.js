import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { A as AppLayout, I as Input } from "./app-layout-eHvklV8A.js";
import { a as prayers, p as prayerCategories } from "./router--Zspq7xM.js";
import { Sparkles, Search, Heart } from "lucide-react";
import { u as useFavorites } from "./favorites-vNY2znCb.js";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@tanstack/react-query";
function PrayersPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [favOnly, setFavOnly] = useState(false);
  const {
    isFavorite,
    toggle,
    favorites
  } = useFavorites();
  const filtered = prayers.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase().trim();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
    const matchFav = !favOnly || isFavorite(p.id);
    return matchCat && matchQ && matchFav;
  });
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Treasury" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-3xl sm:text-4xl", children: "Catholic Prayers" }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-5 mx-auto w-24" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/rosary", className: "mb-8 block rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-6 transition-colors hover:border-primary", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
        " Marian Devotion"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 font-serif text-2xl", children: "The Holy Rosary →" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Pray the Rosary in order, with today's mysteries already selected." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search prayers…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setFavOnly((v) => !v), className: `inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors ${favOnly ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${favOnly ? "fill-current" : ""}` }),
        "Favorites ",
        favorites.length > 0 && `(${favorites.length})`
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: ["All", ...prayerCategories].map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => setCategory(cat), className: `rounded-full border px-3 py-1.5 text-xs transition-colors ${category === cat ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`, children: cat }, cat)) }),
    /* @__PURE__ */ jsxs("ul", { className: "divide-y divide-border/60 border-y border-border/60", children: [
      filtered.map((p) => {
        const fav = isFavorite(p.id);
        return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 py-4 group", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => toggle(p.id), "aria-label": fav ? "Remove from favorites" : "Add to favorites", className: `shrink-0 rounded-full p-2 transition-colors ${fav ? "text-primary" : "text-muted-foreground hover:text-foreground"}`, children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${fav ? "fill-current" : ""}` }) }),
          /* @__PURE__ */ jsxs(Link, { to: "/prayer/$id", params: {
            id: p.id
          }, className: "flex flex-1 items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg group-hover:text-primary transition-colors", children: p.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: p.category })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: "→" })
          ] })
        ] }, p.id);
      }),
      filtered.length === 0 && /* @__PURE__ */ jsx("li", { className: "py-12 text-center text-muted-foreground", children: "No prayers found." })
    ] })
  ] });
}
export {
  PrayersPage as component
};
