import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppLayout } from "./app-layout-25FhAqjL.js";
import { g as getCurrentSeason } from "./liturgical-BnruEgxp.js";
import "@tanstack/react-router";
import "lucide-react";
import "react";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "./router-Ci5J6gTK.js";
import "@tanstack/react-query";
import "@radix-ui/react-label";
const SEASONS = [{
  name: "Advent",
  color: "Violet",
  desc: "Four weeks of joyful expectation, preparing for the coming of Christ at Christmas and at the end of the age."
}, {
  name: "Christmas",
  color: "White",
  desc: "From the Nativity to the Baptism of the Lord — the celebration of the Word made flesh."
}, {
  name: "Ordinary Time (I)",
  color: "Green",
  desc: "After Christmas, weeks of growth in the mystery of Christ before Lent."
}, {
  name: "Lent",
  color: "Violet",
  desc: "Forty days of prayer, fasting, and almsgiving in preparation for the Paschal Mystery."
}, {
  name: "Sacred Paschal Triduum",
  color: "Red / White",
  desc: "Holy Thursday, Good Friday, and the Easter Vigil — the summit of the liturgical year."
}, {
  name: "Easter",
  color: "White",
  desc: "Fifty days of paschal joy, culminating in Pentecost."
}, {
  name: "Ordinary Time (II)",
  color: "Green",
  desc: "After Pentecost, the longest stretch of the year, walking with Christ in his public ministry."
}];
function CalendarPage() {
  const current = getCurrentSeason();
  const swatch = (color) => {
    const c = color.toLowerCase();
    if (c.includes("violet")) return "bg-purple-700";
    if (c.includes("red")) return "bg-red-700";
    if (c.includes("white")) return "bg-stone-100";
    if (c.includes("green")) return "bg-emerald-700";
    if (c.includes("rose")) return "bg-rose-400";
    return "bg-primary";
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Liturgical Year" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-3xl sm:text-4xl", children: "The Church's Year" }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-5 mx-auto w-24" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-10 rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-widest text-primary", children: "Right now" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 font-serif text-4xl", children: current.name }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        "Liturgical color: ",
        current.color
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed", children: current.description })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: SEASONS.map((s) => {
      const active = current.name === s.name || current.name === s.name.replace(/ \(.+\)/, "");
      return /* @__PURE__ */ jsxs("li", { className: `flex items-start gap-4 rounded-xl border p-5 ${active ? "border-primary bg-primary/5" : "border-border bg-card"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `mt-1 inline-block h-4 w-4 shrink-0 rounded-full border border-border ${swatch(s.color)}` }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl", children: s.name }),
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: s.color })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground leading-relaxed", children: s.desc })
        ] })
      ] }, s.name);
    }) })
  ] });
}
export {
  CalendarPage as component
};
