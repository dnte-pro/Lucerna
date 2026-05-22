import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link } from "@tanstack/react-router";
import { X, Settings, Sun, Moon, Bell, BellOff, Home, BookOpen, Book, Calendar } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { u as useSettings, l as loadNotifySettings, r as requestPermission, s as saveNotifySettings } from "./router-CC1Bbzc7.js";
import * as LabelPrimitive from "@radix-ui/react-label";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const families = [
  { value: "serif", label: "Classic Missal", sample: "Libre Baskerville" },
  { value: "sans", label: "Modern Clean", sample: "IBM Plex Sans" },
  { value: "modern", label: "Editorial", sample: "Inter / Plex Serif" }
];
const sizes = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra large" }
];
function SettingsSheet() {
  const { theme, setTheme, fontFamily, setFontFamily, fontSize, setFontSize } = useSettings();
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [notifyTime, setNotifyTime] = useState("07:30");
  const [permission, setPermission] = useState(
    "default"
  );
  useEffect(() => {
    const s = loadNotifySettings();
    setNotifyEnabled(s.enabled);
    setNotifyTime(s.time);
    if (typeof Notification === "undefined") setPermission("unsupported");
    else setPermission(Notification.permission);
  }, []);
  async function toggleNotifications() {
    if (!notifyEnabled) {
      const p = await requestPermission();
      setPermission(p);
      if (p !== "granted") return;
      setNotifyEnabled(true);
      saveNotifySettings({ enabled: true, time: notifyTime });
    } else {
      setNotifyEnabled(false);
      saveNotifySettings({ enabled: false, time: notifyTime });
    }
  }
  function onTimeChange(v) {
    setNotifyTime(v);
    saveNotifySettings({ enabled: notifyEnabled, time: v });
  }
  return /* @__PURE__ */ jsxs(Sheet, { children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Settings", children: /* @__PURE__ */ jsx(Settings, { className: "h-5 w-5" }) }) }),
    /* @__PURE__ */ jsxs(SheetContent, { className: "w-full sm:max-w-md overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsx(SheetTitle, { className: "font-serif text-2xl", children: "Settings" }),
        /* @__PURE__ */ jsx(SheetDescription, { children: "Tune the appearance and reading experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-8 px-1", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Appearance" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setTheme("light"),
                className: `flex items-center justify-center gap-2 rounded-md border p-3 text-sm transition-colors ${theme === "light" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }),
                  " Light"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setTheme("dark"),
                className: `flex items-center justify-center gap-2 rounded-md border p-3 text-sm transition-colors ${theme === "dark" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }),
                  " Dark"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Font family" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: families.map((f) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setFontFamily(f.value),
              className: `w-full rounded-md border p-3 text-left transition-colors ${fontFamily === f.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm", children: f.label }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: f.sample })
              ]
            },
            f.value
          )) })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Font size" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-4 gap-2", children: sizes.map((s) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setFontSize(s.value),
              className: `rounded-md border p-3 text-sm transition-colors ${fontSize === s.value ? "border-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"}`,
              children: s.label
            },
            s.value
          )) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
            "Preview: ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "The Lord is my shepherd." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "border-t border-border/60 pt-4 text-center text-xs text-muted-foreground", children: "Settings are saved on this device." }),
        /* @__PURE__ */ jsxs("section", { className: "border-t border-border/60 pt-6", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Daily prayer reminder" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: toggleNotifications,
              disabled: permission === "unsupported" || permission === "denied",
              className: `mt-3 w-full flex items-center justify-center gap-2 rounded-md border p-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${notifyEnabled ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`,
              children: [
                notifyEnabled ? /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(BellOff, { className: "h-4 w-4" }),
                notifyEnabled ? "Reminder on" : "Enable daily reminder"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "notify-time", className: "text-sm text-muted-foreground", children: "Time" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "notify-time",
                type: "time",
                value: notifyTime,
                onChange: (e) => onTimeChange(e.target.value),
                className: "max-w-[140px]"
              }
            )
          ] }),
          permission === "denied" && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-destructive", children: "Notifications are blocked in your browser settings." }),
          permission === "unsupported" && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Notifications aren't supported here." }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Reminders fire while the app is open. For background alerts on iOS, install Lucerna to your home screen first." })
        ] })
      ] })
    ] })
  ] });
}
const nav = [
  { to: "/", label: "Today", icon: Home },
  { to: "/readings", label: "Readings", icon: BookOpen },
  { to: "/prayers", label: "Prayers", icon: Book },
  { to: "/calendar", label: "Calendar", icon: Calendar }
];
function AppLayout({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-serif text-xl tracking-wide gold-text", children: "Lucerna" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline", children: "Officium" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1", children: nav.map((item) => {
        const active = pathname === item.to;
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: item.to,
            className: `px-3 py-2 text-sm rounded-md transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
            children: item.label
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsx(SettingsSheet, {})
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pb-24 md:pb-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10", children }) }),
    /* @__PURE__ */ jsx("nav", { className: "md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border/60 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl grid grid-cols-4", children: nav.map((item) => {
      const Icon = item.icon;
      const active = pathname === item.to;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.to,
          className: `flex flex-col items-center gap-1 py-3 text-xs transition-colors ${active ? "text-primary" : "text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: item.label })
          ]
        },
        item.to
      );
    }) }) }),
    /* @__PURE__ */ jsx("footer", { className: "hidden md:block border-t border-border/40 py-6 text-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsx("span", { className: "ornament", children: "For the Greater Glory of God" }) })
  ] });
}
export {
  AppLayout as A,
  Button as B,
  Input as I,
  Label as L,
  cn as c
};
