import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppLayout } from "./app-layout-eHvklV8A.js";
import { R as Route, a as prayers } from "./router--Zspq7xM.js";
import { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { u as useFavorites } from "./favorites-vNY2znCb.js";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@tanstack/react-query";
const LANGUAGE_LABELS = {
  en: "English",
  la: "Latin",
  sw: "Kiswahili",
  kip: "Kipsigis"
};
const prayerTranslations = {
  "our-father": {
    sw: "Baba yetu uliye mbinguni,\njina lako litukuzwe;\nufalme wako ufike,\nutakalo lifanyike\nduniani kama mbinguni.\nUtupe leo riziki yetu;\nutusamehe makosa yetu,\nkama nasi tunavyowasamehe waliotukosea;\nusitutie majaribuni,\nlakini utuopoe maovuni.\nAmina.",
    kip: "Kwanda nyon ne mi kipsengwet,\nkainet ne nyit kainet nengung;\nnyo bounatet nengung,\nyaaite mageny chebo iyin\nem ng'wony ko u kipsengwet.\nKonech rani amitwogik chechok chebo betut,\nak isatech ngalek chechok,\nko u keisatei che osachech;\nme yet inyam yomet,\nago tilewech ng'wony che ya.\nAmen."
  },
  "hail-mary": {
    sw: "Salamu Maria, umejaa neema,\nBwana yu nawe.\nUmebarikiwa kuliko wanawake wote,\nnaye Yesu mzao wa tumbo lako amebarikiwa.\nMaria mtakatifu, Mama wa Mungu,\nutuombee sisi wakosefu,\nsasa na saa ya kufa kwetu.\nAmina.",
    kip: "Chamuge Maria, ne i'eng kororindo,\nKiptaiyat ko miten ak iin.\nKi berurin ng'alek tugul,\nak ki berurin Yesu ne kibo kelduny'ung.\nMaria ne tilil, Kamet nebo Iyin,\nsaeech echek che yach,\nrani ak saa ne keimet echek.\nAmen."
  },
  "glory-be": {
    sw: "Atukuzwe Baba, na Mwana, na Roho Mtakatifu;\nkama ilivyokuwa mwanzo, na sasa, na siku zote,\nhata milele na milele.\nAmina.",
    kip: "Kotorornech Kwanda, ak Werindo, ak Tamirmiriet ne tilil;\nko u kiimi tai, ak rani, ak betusiek tugul,\nago me yaaitin akwek.\nAmen."
  },
  "morning-offering": {
    sw: "Ee Yesu, kwa njia ya Moyo Safi wa Maria,\nninakutolea sala, kazi, furaha na mateso yangu ya leo,\nkwa nia zote za Moyo wako Mtakatifu,\nkwa umoja na Sadaka Takatifu ya Misa duniani kote.\nAmina.",
    kip: "Yesu, ko u Mukulelwet ne tilil nebo Maria,\nakonin saet, boisiet, boiboiyet ak nyalilet chechok chebo betut,\namu mageny tugul che bo Mukulelwet nengung ne tilil.\nAmen."
  },
  "night-prayer": {
    sw: "Tunakuomba Ee Bwana,\nlikae nyumba hii, ukatufukuzie mbali hila zote za adui;\nmalaika wako watakatifu wakae nasi watutunze kwa amani;\nbaraka yako iwe juu yetu daima,\nkwa Yesu Kristo Bwana wetu.\nAmina.",
    kip: "Saeech, Kiptaiyat,\niribchin koret ne, ak iut tugul ya che bo bunyot;\nko menye malaikaisiek chebo iyin ne tilil ak echek,\nago ko nyolu kayanet nengung kechok.\nAmen."
  },
  "guardian-angel": {
    sw: "Malaika wa Mungu, mlinzi wangu mpendwa,\nambaye chiyetangu Mungu amenikabidhi kwako,\nleo unilinde, uniongoze, unitawale na unilinde.\nAmina.",
    kip: "Malaikat nebo Iyin, ne iribene anan,\nne ki konech Iyin amu chamanet,\nrani iribana, iut, ak iyaa anan.\nAmen."
  },
  "grace-before-meals": {
    sw: "Utubariki Ee Bwana, na vipawa hivi vyako,\nambavyo tutavipokea kutoka kwa ukarimu wako,\nkwa Kristo Bwana wetu.\nAmina.",
    kip: "Iberur echek, Kiptaiyat, ak konetik chu chebo iyin,\nche keyuoge ko u kororet nengung,\nko u Kristo Kiptaiyat nyon.\nAmen."
  },
  "st-michael-prayer": {
    sw: "Mtakatifu Mikaeli Malaika Mkuu,\ntutetee katika vita;\nuwe ulinzi wetu dhidi ya hila na uovu wa shetani;\nMungu amkemee, twaomba kwa unyenyekevu;\nnawe, Ee Mkuu wa jeshi la mbinguni,\nkwa nguvu ya Mungu, mtumbukize jehanamu shetani\nna pepo wengine wabaya wanaozunguka ulimwenguni\nwakitafuta kuwaangamiza roho.\nAmina.",
    kip: "Mikaeli ne tilil, Malaikat ne ngwanindet,\niribana ko u biik chebo loseet;\nibe iyin ne yoche shetani;\nko iyin nyolu kayanet, saeech;\nago iin, Kiptaiyat nebo malaikaisiek,\nko u kamuktaet nebo Iyin, irurchi shetani jehanamu\nak tamirmirio tugul che ya che mengeche em ng'wony.\nAmen."
  }
};
function getPrayerText(prayerId, englishText, latin, language) {
  if (language === "en") return { text: englishText, available: true };
  if (language === "la") return { text: latin ?? englishText, available: !!latin };
  const t = prayerTranslations[prayerId]?.[language];
  return { text: t ?? englishText, available: !!t };
}
function PrayerDetail() {
  const {
    id
  } = Route.useParams();
  const prayer = prayers.find((p) => p.id === id);
  const [language, setLanguage] = useState("en");
  const {
    isFavorite,
    toggle
  } = useFavorites();
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
      (language === "sw" || language === "kip") && /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "Corrections welcomed." })
    ] })
  ] });
}
export {
  PrayerDetail as component
};
