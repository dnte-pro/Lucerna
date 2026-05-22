import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useMemo } from "react";
import { c as cn, A as AppLayout, I as Input, L as Label, B as Button } from "./app-layout-CQSfll1D.js";
import { a as prayers, p as prayerCategories } from "./router-CC1Bbzc7.js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X, Sparkles, Search, PenLine, Heart } from "lucide-react";
import { a as useFavorites, u as useCustomPrayers } from "./custom-prayers-BhMD-ZHo.js";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@tanstack/react-query";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = SheetPrimitive.Root;
const DialogPortal = SheetPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
function PrayersPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [favOnly, setFavOnly] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customText, setCustomText] = useState("");
  const {
    isFavorite,
    toggle,
    favorites
  } = useFavorites();
  const {
    customPrayers,
    addCustomPrayer
  } = useCustomPrayers();
  const allPrayers = useMemo(() => [...customPrayers, ...prayers], [customPrayers]);
  const categories = useMemo(() => customPrayers.length > 0 ? ["All", "Custom", ...prayerCategories] : ["All", ...prayerCategories], [customPrayers.length]);
  const filtered = allPrayers.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase().trim();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
    const matchFav = !favOnly || isFavorite(p.id);
    return matchCat && matchQ && matchFav;
  });
  const canSaveCustom = customTitle.trim().length > 0 && customText.trim().length > 0;
  function handleCustomSubmit(event) {
    event.preventDefault();
    if (!canSaveCustom) return;
    addCustomPrayer({
      title: customTitle,
      text: customText
    });
    setCategory("Custom");
    setFavOnly(false);
    setQuery("");
    setCustomTitle("");
    setCustomText("");
    setCustomOpen(false);
  }
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
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:w-40", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setCustomOpen(true), className: "inline-flex items-center justify-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs text-primary transition-colors hover:border-primary", children: [
          /* @__PURE__ */ jsx(PenLine, { className: "h-4 w-4" }),
          "New prayer"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setFavOnly((v) => !v), className: `inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors ${favOnly ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${favOnly ? "fill-current" : ""}` }),
          "Favorites ",
          favorites.length > 0 && `(${favorites.length})`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: categories.map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => setCategory(cat), className: `rounded-full border px-3 py-1.5 text-xs transition-colors ${category === cat ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`, children: cat }, cat)) }),
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
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: customOpen, onOpenChange: setCustomOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "font-serif text-2xl", children: "Add Custom Prayer" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Save a personal prayer to this device." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleCustomSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "custom-prayer-title", children: "Title" }),
          /* @__PURE__ */ jsx(Input, { id: "custom-prayer-title", value: customTitle, onChange: (event) => setCustomTitle(event.target.value), placeholder: "Prayer title" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "custom-prayer-text", children: "Prayer" }),
          /* @__PURE__ */ jsx(Textarea, { id: "custom-prayer-text", value: customText, onChange: (event) => setCustomText(event.target.value), placeholder: "Write your prayer…", className: "min-h-40 font-serif leading-relaxed" })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setCustomOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !canSaveCustom, children: "Save prayer" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PrayersPage as component
};
