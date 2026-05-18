import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppLayout } from "./app-layout-eHvklV8A.js";
import { g as getTodayReading } from "./daily-readings-BAxjsgpZ.js";
import { f as formatDate } from "./liturgical-BnruEgxp.js";
import "@tanstack/react-router";
import "lucide-react";
import "react";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "./router--Zspq7xM.js";
import "@tanstack/react-query";
import "@radix-ui/react-label";
function ReadingsPage() {
  const r = getTodayReading();
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Daily Readings" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-3xl sm:text-4xl", children: formatDate() }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-primary", children: [
        r.season,
        " · Liturgical color: ",
        r.seasonColor
      ] }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-5 mx-auto w-24" })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "space-y-10 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsx(ReadingBlock, { label: "First Reading", reference: r.firstReading.ref, children: /* @__PURE__ */ jsx("p", { className: "font-serif leading-relaxed", children: r.firstReading.text }) }),
      /* @__PURE__ */ jsxs(ReadingBlock, { label: "Responsorial Psalm", reference: r.psalm.ref, children: [
        /* @__PURE__ */ jsxs("p", { className: "font-serif italic text-primary", children: [
          "R. ",
          r.psalm.response
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 font-serif leading-relaxed", children: r.psalm.text })
      ] }),
      /* @__PURE__ */ jsx(ReadingBlock, { label: "Gospel", reference: r.gospel.ref, children: /* @__PURE__ */ jsx("p", { className: "font-serif leading-relaxed", children: r.gospel.text }) }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-widest text-primary", children: "Reflection" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 font-serif italic text-lg leading-snug", children: [
          "“",
          r.reflection,
          "”"
        ] })
      ] })
    ] })
  ] });
}
function ReadingBlock({
  label,
  reference,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between border-b border-border/60 pb-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xs uppercase tracking-widest text-primary", children: label }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: reference })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children })
  ] });
}
export {
  ReadingsPage as component
};
