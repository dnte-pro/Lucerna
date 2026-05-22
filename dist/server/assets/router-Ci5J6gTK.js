import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
const appCss = "/Lucerna/assets/styles-DFlLqfBm.css";
const KEY = "lucerna-notify";
function loadNotifySettings() {
  if (typeof window === "undefined") return { enabled: false, time: "07:30" };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { enabled: false, time: "07:30" };
}
function saveNotifySettings(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
  scheduleNext(s);
}
async function requestPermission() {
  if (typeof Notification === "undefined") return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return await Notification.requestPermission();
}
let timer = null;
function nextOccurrence(time) {
  const [h, m] = time.split(":").map(Number);
  const now = /* @__PURE__ */ new Date();
  const next = /* @__PURE__ */ new Date();
  next.setHours(h || 7, m || 30, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}
function scheduleNext(s) {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  if (!s.enabled || typeof Notification === "undefined") return;
  if (Notification.permission !== "granted") return;
  const delay = nextOccurrence(s.time);
  timer = window.setTimeout(() => {
    try {
      new Notification("Lucerna — Time to pray", {
        body: "Pause for your daily prayer and reading.",
        icon: `${"/Lucerna/"}icon.svg`
      });
    } catch {
    }
    scheduleNext(s);
  }, Math.min(delay, 2147e6));
}
function bootNotifications() {
  const s = loadNotifySettings();
  if (s.enabled) scheduleNext(s);
}
const SettingsContext = createContext(null);
const FAMILY_MAP = {
  serif: {
    serif: '"Libre Baskerville", Georgia, serif',
    sans: '"IBM Plex Sans", system-ui, sans-serif'
  },
  sans: {
    serif: '"IBM Plex Sans", system-ui, sans-serif',
    sans: '"IBM Plex Sans", system-ui, sans-serif'
  },
  modern: {
    serif: '"IBM Plex Serif", Georgia, serif',
    sans: '"Inter", system-ui, sans-serif'
  }
};
const SIZE_MAP = {
  sm: "0.9",
  md: "1",
  lg: "1.15",
  xl: "1.3"
};
function SettingsProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [fontFamily, setFamilyState] = useState("serif");
  const [fontSize, setSizeState] = useState("md");
  useEffect(() => {
    try {
      const raw = localStorage.getItem("lumen-settings");
      if (raw) {
        const s = JSON.parse(raw);
        if (s.theme) setThemeState(s.theme);
        if (s.fontFamily) setFamilyState(s.fontFamily);
        if (s.fontSize) setSizeState(s.fontSize);
      }
    } catch {
    }
    bootNotifications();
    if ("serviceWorker" in navigator) {
      const inIframe = (() => {
        try {
          return window.self !== window.top;
        } catch {
          return true;
        }
      })();
      const host = window.location.hostname;
      const isPreview = host.includes("id-preview--") || host.includes("lovableproject.com") || host.includes("lovable.app");
      if (!inIframe && !isPreview) {
        navigator.serviceWorker.register(`${"/Lucerna/"}sw.js`).catch(() => {
        });
      } else {
        navigator.serviceWorker.getRegistrations().then(
          (rs) => rs.forEach((r) => r.unregister())
        );
      }
    }
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    const f = FAMILY_MAP[fontFamily];
    root.style.setProperty("--font-serif-family", f.serif);
    root.style.setProperty("--font-sans-family", f.sans);
    root.style.setProperty("--font-scale", SIZE_MAP[fontSize]);
    try {
      localStorage.setItem(
        "lumen-settings",
        JSON.stringify({ theme, fontFamily, fontSize })
      );
    } catch {
    }
  }, [theme, fontFamily, fontSize]);
  return /* @__PURE__ */ jsx(
    SettingsContext.Provider,
    {
      value: {
        theme,
        fontFamily,
        fontSize,
        setTheme: setThemeState,
        setFontFamily: setFamilyState,
        setFontSize: setSizeState
      },
      children
    }
  );
}
function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
const baseUrl = "/Lucerna/";
const withBase = (path) => `${baseUrl}${path}`.replace(/\/{2,}/g, "/");
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: baseUrl,
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lucerna — Catholic Prayer & Daily Readings" },
      { name: "description", content: "Daily Mass readings, the treasury of Catholic prayers, and the living rhythm of the liturgical year." },
      { name: "author", content: "Lucerna" },
      { name: "theme-color", content: "#0d0d0d" },
      { property: "og:title", content: "Lucerna — Catholic Prayer & Daily Readings" },
      { property: "og:description", content: "Daily readings, the treasury of Catholic prayers, and the liturgical year — beautifully presented." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "icon", href: withBase("icon.svg") },
      { rel: "manifest", href: withBase("manifest.json") }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(SettingsProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const prayerCategories = [
  "Essential",
  "Marian",
  "Morning & Evening",
  "Sacraments",
  "Devotions",
  "Litanies"
];
const prayers = [
  {
    id: "our-father",
    title: "Our Father",
    category: "Essential",
    text: "Our Father, who art in heaven,\nhallowed be thy name;\nthy kingdom come,\nthy will be done\non earth as it is in heaven.\nGive us this day our daily bread,\nand forgive us our trespasses,\nas we forgive those who trespass against us;\nand lead us not into temptation,\nbut deliver us from evil.\nAmen."
  },
  {
    id: "hail-mary",
    title: "Hail Mary",
    category: "Marian",
    text: "Hail Mary, full of grace,\nthe Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\nAmen."
  },
  {
    id: "glory-be",
    title: "Glory Be",
    category: "Essential",
    text: "Glory be to the Father,\nand to the Son,\nand to the Holy Spirit,\nas it was in the beginning,\nis now, and ever shall be,\nworld without end.\nAmen."
  },
  {
    id: "apostles-creed",
    title: "Apostles' Creed",
    category: "Essential",
    text: "I believe in God,\nthe Father Almighty,\nCreator of heaven and earth,\nand in Jesus Christ, His only Son, our Lord,\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died and was buried;\nHe descended into hell;\non the third day He rose again from the dead;\nHe ascended into heaven,\nand is seated at the right hand of God the Father Almighty;\nfrom there He will come to judge the living and the dead.\nI believe in the Holy Spirit,\nthe Holy Catholic Church,\nthe communion of Saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\nAmen."
  },
  {
    id: "act-of-contrition",
    title: "Act of Contrition",
    category: "Sacraments",
    text: "O my God, I am heartily sorry\nfor having offended Thee,\nand I detest all my sins\nbecause of Thy just punishments,\nbut most of all because they offend Thee, my God,\nwho art all good and deserving of all my love.\nI firmly resolve, with the help of Thy grace,\nto sin no more\nand to avoid the near occasions of sin.\nAmen."
  },
  {
    id: "memorare",
    title: "Memorare",
    category: "Marian",
    text: "Remember, O most gracious Virgin Mary,\nthat never was it known\nthat anyone who fled to thy protection,\nimplored thy help, or sought thy intercession\nwas left unaided.\nInspired by this confidence,\nI fly unto thee, O Virgin of virgins, my Mother.\nTo thee do I come, before thee I stand,\nsinful and sorrowful.\nO Mother of the Word Incarnate,\ndespise not my petitions,\nbut in thy mercy hear and answer me.\nAmen."
  },
  {
    id: "hail-holy-queen",
    title: "Hail, Holy Queen",
    category: "Marian",
    text: "Hail, holy Queen, Mother of mercy,\nhail, our life, our sweetness and our hope.\nTo thee do we cry, poor banished children of Eve;\nto thee do we send up our sighs,\nmourning and weeping in this valley of tears.\nTurn, then, most gracious Advocate,\nthine eyes of mercy toward us,\nand after this, our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\nO clement, O loving, O sweet Virgin Mary!\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ.\nAmen."
  },
  {
    id: "angelus",
    title: "The Angelus",
    category: "Devotions",
    text: "V. The Angel of the Lord declared unto Mary,\nR. And she conceived of the Holy Spirit.\n\nHail Mary…\n\nV. Behold the handmaid of the Lord,\nR. Be it done unto me according to thy word.\n\nHail Mary…\n\nV. And the Word was made flesh,\nR. And dwelt among us.\n\nHail Mary…\n\nV. Pray for us, O holy Mother of God,\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray: Pour forth, we beseech Thee, O Lord,\nThy grace into our hearts;\nthat we, to whom the Incarnation of Christ, Thy Son,\nwas made known by the message of an angel,\nmay by His Passion and Cross\nbe brought to the glory of His Resurrection;\nthrough the same Christ our Lord.\nAmen."
  },
  {
    id: "morning-offering",
    title: "Morning Offering",
    category: "Morning & Evening",
    text: "O Jesus, through the Immaculate Heart of Mary,\nI offer You my prayers, works, joys, and sufferings of this day\nfor all the intentions of Your Sacred Heart,\nin union with the Holy Sacrifice of the Mass throughout the world,\nfor the salvation of souls,\nthe reparation of sins,\nthe reunion of all Christians,\nand in particular for the intentions of the Holy Father this month.\nAmen."
  },
  {
    id: "night-prayer",
    title: "Night Prayer",
    category: "Morning & Evening",
    text: "Visit, we beseech Thee, O Lord,\nthis dwelling, and drive from it all the snares of the enemy;\nlet Thy holy angels dwell herein to preserve us in peace;\nand let Thy blessing be upon us\nthrough Jesus Christ our Lord.\nAmen."
  },
  {
    id: "divine-mercy-chaplet",
    title: "Chaplet of Divine Mercy",
    category: "Devotions",
    text: "Opening: Our Father…, Hail Mary…, Apostles' Creed.\n\nOn the Our Father beads:\nEternal Father, I offer You the Body and Blood,\nSoul and Divinity of Your dearly beloved Son,\nOur Lord Jesus Christ,\nin atonement for our sins and those of the whole world.\n\nOn the Hail Mary beads:\nFor the sake of His sorrowful Passion,\nhave mercy on us and on the whole world.\n\nClosing (3x):\nHoly God, Holy Mighty One, Holy Immortal One,\nhave mercy on us and on the whole world."
  },
  {
    id: "st-michael-prayer",
    title: "Prayer to St. Michael",
    category: "Devotions",
    text: "Saint Michael the Archangel,\ndefend us in battle.\nBe our protection against the wickedness\nand snares of the devil;\nmay God rebuke him, we humbly pray;\nand do thou, O Prince of the heavenly host,\nby the power of God,\nthrust into hell Satan and all evil spirits\nwho wander through the world\nseeking the ruin of souls.\nAmen."
  },
  {
    id: "guardian-angel",
    title: "Guardian Angel Prayer",
    category: "Morning & Evening",
    text: "Angel of God, my guardian dear,\nto whom God's love commits me here,\never this day be at my side,\nto light and guard, to rule and guide.\nAmen."
  },
  {
    id: "grace-before-meals",
    title: "Grace Before Meals",
    category: "Essential",
    text: "Bless us, O Lord,\nand these Thy gifts,\nwhich we are about to receive\nfrom Thy bounty,\nthrough Christ our Lord.\nAmen."
  },
  {
    id: "grace-after-meals",
    title: "Grace After Meals",
    category: "Essential",
    text: "We give Thee thanks,\nAlmighty God,\nfor all Thy benefits,\nwho livest and reignest\nworld without end.\nAmen.\n\nMay the souls of the faithful departed,\nthrough the mercy of God,\nrest in peace.\nAmen."
  },
  {
    id: "anima-christi",
    title: "Anima Christi",
    category: "Sacraments",
    text: "Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\nO good Jesus, hear me.\nWithin Your wounds hide me.\nSeparated from You, let me never be.\nFrom the malignant enemy, defend me.\nAt the hour of death, call me.\nAnd close to You bid me.\nThat with Your saints, I may be,\npraising You forever and ever.\nAmen."
  },
  {
    id: "litany-blessed-virgin",
    title: "Litany of the Blessed Virgin Mary",
    category: "Litanies",
    text: "Lord, have mercy. Christ, have mercy.\nLord, have mercy. Christ, hear us.\nChrist, graciously hear us.\n\nGod, the Father of Heaven, have mercy on us.\nGod the Son, Redeemer of the world, have mercy on us.\nGod the Holy Spirit, have mercy on us.\nHoly Trinity, One God, have mercy on us.\n\nHoly Mary, pray for us.\nHoly Mother of God, pray for us.\nHoly Virgin of virgins, pray for us.\nMother of Christ, pray for us.\nMother of the Church, pray for us.\nMother of divine grace, pray for us.\nMother most pure, pray for us.\nMother most chaste, pray for us.\nMother inviolate, pray for us.\nMother undefiled, pray for us.\nMother most amiable, pray for us.\nMother most admirable, pray for us.\nMother of good counsel, pray for us.\nMother of our Creator, pray for us.\nMother of our Savior, pray for us.\n\nVirgin most prudent, pray for us.\nVirgin most venerable, pray for us.\nVirgin most renowned, pray for us.\nVirgin most powerful, pray for us.\nVirgin most merciful, pray for us.\nVirgin most faithful, pray for us.\n\nMirror of justice, pray for us.\nSeat of wisdom, pray for us.\nCause of our joy, pray for us.\nSpiritual vessel, pray for us.\nVessel of honor, pray for us.\nSingular vessel of devotion, pray for us.\nMystical rose, pray for us.\nTower of David, pray for us.\nTower of ivory, pray for us.\nHouse of gold, pray for us.\nArk of the covenant, pray for us.\nGate of heaven, pray for us.\nMorning star, pray for us.\nHealth of the sick, pray for us.\nRefuge of sinners, pray for us.\nComforter of the afflicted, pray for us.\nHelp of Christians, pray for us.\n\nQueen of Angels, pray for us.\nQueen of Patriarchs, pray for us.\nQueen of Prophets, pray for us.\nQueen of Apostles, pray for us.\nQueen of Martyrs, pray for us.\nQueen of Confessors, pray for us.\nQueen of Virgins, pray for us.\nQueen of all Saints, pray for us.\nQueen conceived without original sin, pray for us.\nQueen assumed into Heaven, pray for us.\nQueen of the most holy Rosary, pray for us.\nQueen of families, pray for us.\nQueen of peace, pray for us.\n\nLamb of God, who takest away the sins of the world,\nspare us, O Lord.\nLamb of God, who takest away the sins of the world,\ngraciously hear us, O Lord.\nLamb of God, who takest away the sins of the world,\nhave mercy on us.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ.\nAmen."
  }
];
const BASE_URL = "";
const Route$6 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/readings",
          "/prayers",
          "/calendar",
          ...prayers.map((p) => `/prayer/${p.id}`)
        ];
        const urls = paths.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$5 = () => import("./rosary-M-thyYfs.js");
const Route$5 = createFileRoute("/rosary")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "The Holy Rosary — Lucerna"
    }, {
      name: "description",
      content: "Pray the Holy Rosary in order, with the mysteries aligned to today."
    }, {
      property: "og:title",
      content: "The Holy Rosary — Lucerna"
    }, {
      property: "og:description",
      content: "Daily Rosary with the proper mysteries for today."
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./readings-BBZdO2pI.js");
const Route$4 = createFileRoute("/readings")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Daily Readings — Lucerna"
    }, {
      name: "description",
      content: "Today's Mass readings: the Word for this day in the Church."
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./prayers-CwAE6xf9.js");
const Route$3 = createFileRoute("/prayers")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Catholic Prayers — Lucerna"
    }, {
      name: "description",
      content: "The treasury of Catholic prayers — Our Father, Hail Mary, litanies, devotions, and more."
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./calendar-CpeQkhqO.js");
const Route$2 = createFileRoute("/calendar")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Liturgical Calendar — Lucerna"
    }, {
      name: "description",
      content: "Where we are in the Church's year — the season, its color, and its meaning."
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./index-CycsKRuc.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./prayer._id-B5zYuIJg.js");
const Route = createFileRoute("/prayer/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$6.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$7
});
const RosaryRoute = Route$5.update({
  id: "/rosary",
  path: "/rosary",
  getParentRoute: () => Route$7
});
const ReadingsRoute = Route$4.update({
  id: "/readings",
  path: "/readings",
  getParentRoute: () => Route$7
});
const PrayersRoute = Route$3.update({
  id: "/prayers",
  path: "/prayers",
  getParentRoute: () => Route$7
});
const CalendarRoute = Route$2.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const PrayerIdRoute = Route.update({
  id: "/prayer/$id",
  path: "/prayer/$id",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  CalendarRoute,
  PrayersRoute,
  ReadingsRoute,
  RosaryRoute,
  SitemapDotxmlRoute,
  PrayerIdRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const basepath = "/Lucerna/".replace(/\/$/, "");
  const router2 = createRouter({
    routeTree,
    basepath,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  prayers as a,
  router as b,
  loadNotifySettings as l,
  prayerCategories as p,
  requestPermission as r,
  saveNotifySettings as s,
  useSettings as u
};
