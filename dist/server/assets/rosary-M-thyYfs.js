import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { A as AppLayout } from "./app-layout-25FhAqjL.js";
import { ArrowLeft, Sparkles } from "lucide-react";
import { L as LANGUAGE_LABELS } from "./translations-DeB0rAtn.js";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "./router-Ci5J6gTK.js";
import "@tanstack/react-query";
import "@radix-ui/react-label";
const mysteries = {
  Joyful: {
    day: "Monday & Saturday",
    mysteries: [
      { title: "The Annunciation", fruit: "Humility", scripture: "Luke 1:26–38" },
      { title: "The Visitation", fruit: "Love of neighbor", scripture: "Luke 1:39–56" },
      { title: "The Nativity", fruit: "Poverty of spirit", scripture: "Luke 2:1–20" },
      { title: "The Presentation in the Temple", fruit: "Obedience", scripture: "Luke 2:22–38" },
      { title: "The Finding of Jesus in the Temple", fruit: "Joy in finding Jesus", scripture: "Luke 2:41–52" }
    ]
  },
  Sorrowful: {
    day: "Tuesday & Friday",
    mysteries: [
      { title: "The Agony in the Garden", fruit: "Sorrow for sin", scripture: "Matthew 26:36–46" },
      { title: "The Scourging at the Pillar", fruit: "Purity", scripture: "Matthew 27:26" },
      { title: "The Crowning with Thorns", fruit: "Moral courage", scripture: "Matthew 27:27–31" },
      { title: "The Carrying of the Cross", fruit: "Patience", scripture: "Luke 23:26–32" },
      { title: "The Crucifixion", fruit: "Self-denial", scripture: "Luke 23:33–46" }
    ]
  },
  Glorious: {
    day: "Wednesday & Sunday",
    mysteries: [
      { title: "The Resurrection", fruit: "Faith", scripture: "Matthew 28:1–10" },
      { title: "The Ascension", fruit: "Hope", scripture: "Acts 1:6–11" },
      { title: "The Descent of the Holy Spirit", fruit: "Wisdom and love of God", scripture: "Acts 2:1–13" },
      { title: "The Assumption of Mary", fruit: "Grace of a happy death", scripture: "Revelation 12:1" },
      { title: "The Coronation of Mary", fruit: "Trust in Mary's intercession", scripture: "Revelation 12:1" }
    ]
  },
  Luminous: {
    day: "Thursday",
    mysteries: [
      { title: "The Baptism of Jesus in the Jordan", fruit: "Openness to the Holy Spirit", scripture: "Matthew 3:13–17" },
      { title: "The Wedding at Cana", fruit: "Fidelity through Mary's intercession", scripture: "John 2:1–11" },
      { title: "The Proclamation of the Kingdom", fruit: "Repentance and trust in God", scripture: "Mark 1:14–15" },
      { title: "The Transfiguration", fruit: "Desire for holiness", scripture: "Matthew 17:1–8" },
      { title: "The Institution of the Eucharist", fruit: "Eucharistic love", scripture: "Matthew 26:26–29" }
    ]
  }
};
function getTodaysMystery(date = /* @__PURE__ */ new Date()) {
  switch (date.getDay()) {
    case 1:
    // Monday
    case 6:
      return "Joyful";
    case 2:
    // Tuesday
    case 5:
      return "Sorrowful";
    case 4:
      return "Luminous";
    case 0:
    // Sunday
    case 3:
    // Wednesday
    default:
      return "Glorious";
  }
}
const rosarySteps = [
  {
    label: "1. Sign of the Cross & Apostles' Creed",
    instruction: "Hold the crucifix.",
    prayer: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nI believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of Saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen."
  },
  {
    label: "2. Our Father",
    instruction: "On the first large bead.",
    prayer: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen."
  },
  {
    label: "3. Three Hail Marys",
    instruction: "On the next three small beads — for faith, hope, and charity.",
    prayer: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."
  },
  {
    label: "4. Glory Be",
    instruction: "",
    prayer: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen."
  },
  {
    label: "5. Announce the First Mystery",
    instruction: "Meditate on the mystery, then pray the Our Father on the large bead."
  },
  {
    label: "6. Ten Hail Marys (a decade)",
    instruction: "One on each of the ten small beads, meditating on the mystery.",
    prayer: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."
  },
  {
    label: "7. Glory Be & Fatima Prayer",
    instruction: "After each decade.",
    prayer: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy. Amen."
  },
  {
    label: "8. Repeat for the remaining four mysteries",
    instruction: "Announce each mystery, then Our Father, ten Hail Marys, Glory Be, and Fatima Prayer."
  },
  {
    label: "9. Hail, Holy Queen",
    instruction: "After all five decades.",
    prayer: "Hail, holy Queen, Mother of mercy, hail, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn, then, most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
  },
  {
    label: "10. Closing Prayer & Sign of the Cross",
    instruction: "",
    prayer: "O God, whose only-begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life: grant, we beseech Thee, that meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise. Through the same Christ our Lord. Amen.\n\nIn the name of the Father, and of the Son, and of the Holy Spirit. Amen."
  }
];
const rosaryStepTranslations = {
  "1. Sign of the Cross & Apostles' Creed": {
    sw: {
      instruction: "Shika msalaba.",
      prayer: "Kwa jina la Baba, na la Mwana, na la Roho Mtakatifu. Amina.\n\nNasadiki kwa Mungu Baba Mwenyezi, Muumba wa mbingu na nchi. Na kwa Yesu Kristo, Mwana wake wa pekee, Bwana wetu, aliyechukuliwa mimba kwa uweza wa Roho Mtakatifu, akazaliwa na Bikira Maria, akateswa zamani za Pontio Pilato, akasulibiwa, akafa, akazikwa; akashuka kuzimu, siku ya tatu akafufuka katika wafu; akapaa mbinguni, ameketi kuume kwa Mungu Baba Mwenyezi; kutoka huko atakuja kuwahukumu wazima na wafu. Nasadiki kwa Roho Mtakatifu, Kanisa Katoliki Takatifu, ushirika wa watakatifu, maondoleo ya dhambi, ufufuko wa mwili, na uzima wa milele. Amina."
    },
    kip: {
      instruction: "Nam mbarendet.",
      prayer: "Ko u kainet nebo Kwanda, ak Werindo, ak Tamirmiriet ne tilil. Amen.\n\nIyandet Iyin Kwanda ne Kamuktoindet, ne kichobu kipsengwet ak ng'wony; ak Yesu Kristo, Werindo nebo agenge, Kiptaiyat nyon, ne kichobtoi ko u Tamirmiriet ne tilil, ne ki kasiretab Maria ne tilil, ne ki nyalil em betusiek che bo Pontio Pilato, ki saamin, ki me, ki keinde; ki rute kobit toror, em betut nebo somok ki ng'eet kobun che me; ki teete kipsengwet, ki tebe muito ne ya nebo Iyin Kwanda ne Kamuktoindet; iyo ko nyo kotetut chii che songoroon ak che me. Iyandet Tamirmiriet ne tilil, Kanisa Katolik ne tilil, kibagenge nebo biik che tilil, isatet ne bo ngalek, ng'eetabchaisietab borto, ak sobet ne yaaitin akwek. Amen."
    }
  },
  "2. Our Father": {
    sw: {
      instruction: "Kwenye shanga la kwanza kubwa.",
      prayer: "Baba yetu uliye mbinguni, jina lako litukuzwe; ufalme wako ufike, utakalo lifanyike duniani kama mbinguni. Utupe leo riziki yetu; utusamehe makosa yetu, kama nasi tunavyowasamehe waliotukosea; usitutie majaribuni, lakini utuopoe maovuni. Amina."
    },
    kip: {
      instruction: "Em logoiyot ne oo ne tai.",
      prayer: "Kwanda nyon ne mi kipsengwet, kainet ne nyit kainet nengung; nyo bounatet nengung, yaaite mageny chebo iyin em ng'wony ko u kipsengwet. Konech rani amitwogik chechok chebo betut, ak isatech ngalek chechok, ko u keisatei che osachech; me yet inyam yomet, ago tilewech ng'wony che ya. Amen."
    }
  },
  "3. Three Hail Marys": {
    sw: {
      instruction: "Kwenye shanga tatu zinazofuata — kwa imani, tumaini, na mapendo.",
      prayer: "Salamu Maria, umejaa neema, Bwana yu nawe. Umebarikiwa kuliko wanawake wote, naye Yesu mzao wa tumbo lako amebarikiwa. Maria mtakatifu, Mama wa Mungu, utuombee sisi wakosefu, sasa na saa ya kufa kwetu. Amina."
    },
    kip: {
      instruction: "Em logoiyat somok che mengech — amu iyandanet, kayanet ak chamanet.",
      prayer: "Chamuge Maria, ne i'eng kororindo, Kiptaiyat ko miten ak iin. Ki berurin ng'alek tugul, ak ki berurin Yesu ne kibo kelduny'ung. Maria ne tilil, Kamet nebo Iyin, saeech echek che yach, rani ak saa ne keimet echek. Amen."
    }
  },
  "4. Glory Be": {
    sw: {
      prayer: "Atukuzwe Baba, na Mwana, na Roho Mtakatifu; kama ilivyokuwa mwanzo, na sasa, na siku zote, hata milele na milele. Amina."
    },
    kip: {
      prayer: "Kotorornech Kwanda, ak Werindo, ak Tamirmiriet ne tilil; ko u kiimi tai, ak rani, ak betusiek tugul, ago me yaaitin akwek. Amen."
    }
  },
  "5. Announce the First Mystery": {
    sw: {
      instruction: "Tafakari fumbo, kisha sali Baba Yetu kwenye shanga kubwa."
    },
    kip: {
      instruction: "Iyae ng'alek che muguleldosi, ago ibwat Kwanda nyon em logoiyot ne oo."
    }
  },
  "6. Ten Hail Marys (a decade)": {
    sw: {
      instruction: "Moja kwa kila shanga moja kati ya kumi, ukitafakari fumbo.",
      prayer: "Salamu Maria, umejaa neema, Bwana yu nawe. Umebarikiwa kuliko wanawake wote, naye Yesu mzao wa tumbo lako amebarikiwa. Maria mtakatifu, Mama wa Mungu, utuombee sisi wakosefu, sasa na saa ya kufa kwetu. Amina."
    },
    kip: {
      instruction: "Agenge em logoiyat tugul che taman, ki iyae ng'alek che muguleldosi.",
      prayer: "Chamuge Maria, ne i'eng kororindo, Kiptaiyat ko miten ak iin. Ki berurin ng'alek tugul, ak ki berurin Yesu ne kibo kelduny'ung. Maria ne tilil, Kamet nebo Iyin, saeech echek che yach, rani ak saa ne keimet echek. Amen."
    }
  },
  "7. Glory Be & Fatima Prayer": {
    sw: {
      instruction: "Baada ya kila kumi.",
      prayer: "Atukuzwe Baba, na Mwana, na Roho Mtakatifu; kama ilivyokuwa mwanzo, na sasa, na siku zote, hata milele na milele. Amina.\n\nEe Yesu wangu, utusamehe dhambi zetu, utuokoe na moto wa jehanamu, uziongoze roho zote mbinguni, hasa zile zinazohitaji rehema yako zaidi. Amina."
    },
    kip: {
      instruction: "Ko baibai logoiyot agetugul nebo taman.",
      prayer: "Kotorornech Kwanda, ak Werindo, ak Tamirmiriet ne tilil; ko u kiimi tai, ak rani, ak betusiek tugul, ago me yaaitin akwek. Amen.\n\nYesu nyon, isatech ngalek chechok, iyoteech ko u maat ne bo jehanamu, ribchin tamirmirio tugul kipsengwet, ko muguleldo che maache kanyitiet nengung. Amen."
    }
  },
  "8. Repeat for the remaining four mysteries": {
    sw: {
      instruction: "Tangaza kila fumbo, kisha Baba Yetu, Salamu Maria kumi, Atukuzwe, na Sala ya Fatima."
    },
    kip: {
      instruction: "Iyae mageny agetugul, ago Kwanda nyon, Chamuge Maria taman, Kotorornech, ak saet nebo Fatima."
    }
  },
  "9. Hail, Holy Queen": {
    sw: {
      instruction: "Baada ya kumi zote tano.",
      prayer: "Salamu Malkia, Mama wa huruma, salamu uzima wetu, utamu wetu na tumaini letu. Kwako tunalia sisi wana wa Hawa tuliohamishwa; kwako tunatuma kuugua kwetu, tukiomboleza na kulia katika bonde hili la machozi. Basi, ewe mtetezi wetu, geuza macho yako ya huruma kwetu; na baada ya uhamisho huu, utuonyeshe Yesu, mzao wa tumbo lako uliyebarikiwa. Ee mwenye huruma, ee mpole, ee mtamu, Bikira Maria! Utuombee, ee Mama Mtakatifu wa Mungu, ili tustahili ahadi za Kristo. Amina."
    },
    kip: {
      instruction: "Ko baibai logoiyatosiek tugul mut.",
      prayer: "Chamuge, Kiptaiyo ne tilil, Kamet nebo kanyitiet, chamuge sobet nyon, anyiny nyon ak kayanet nyon. Iin keribchini lakwetab Hawa che kichoorchin; iin kekochi inyiy nyon, kerere ak kerub em emet ne bo elalweet. Ole, iin kiyolu nyon, weech konyek che bo kanyitiet kechok; ago ko baibai chooret nyon, iboru Yesu, kelduny'ung ne kiberur. Iyo ne bo kanyitiet, iyo ne anyiny, iyo Maria ne tilil! Saeech echek, Kamet ne tilil nebo Iyin, kotyongoge ng'alek che kibwoot Kristo. Amen."
    }
  },
  "10. Closing Prayer & Sign of the Cross": {
    sw: {
      prayer: "Ee Mungu, ambaye Mwana wako wa pekee, kwa maisha yake, kifo na ufufuko, ametustahilishia thawabu za uzima wa milele: tunakuomba, kwa kutafakari mafumbo haya ya Rozari Takatifu ya Bikira Maria, tuyaige yaliyomo na kupata yale yanayoahidi. Kwa Kristo Bwana wetu. Amina.\n\nKwa jina la Baba, na la Mwana, na la Roho Mtakatifu. Amina."
    },
    kip: {
      prayer: "Iyin, ne Werindo nebo agenge, ko u sobet nengung, meet ak ng'eetabchaisiet, ki konech baibai nebo sobet ne yaaitin akwek: saeech, ko u keyaaie ng'alek che mageny chu chebo Rosari ne tilil nebo Maria ne tilil, keibanen che mi tai ak kenam che kibwootin. Ko u Kristo Kiptaiyat nyon. Amen.\n\nKo u kainet nebo Kwanda, ak Werindo, ak Tamirmiriet ne tilil. Amen."
    }
  }
};
function getRosaryStepText(label, englishInstruction, englishPrayer, language) {
  if (language === "en") {
    return withOptionalPrayer(englishInstruction, englishPrayer);
  }
  const t = rosaryStepTranslations[label]?.[language];
  return withOptionalPrayer(t?.instruction ?? englishInstruction, t?.prayer ?? englishPrayer);
}
function withOptionalPrayer(instruction, prayer) {
  return prayer === void 0 ? { instruction } : { instruction, prayer };
}
const ROSARY_LANGS = ["en", "sw", "kip"];
const SETS = ["Joyful", "Sorrowful", "Glorious", "Luminous"];
function RosaryPage() {
  const today = getTodaysMystery();
  const [selected, setSelected] = useState(today);
  const [language, setLanguage] = useState("en");
  const active = mysteries[selected];
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs(Link, { to: "/prayers", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      " All prayers"
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "mt-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Marian Devotion" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl sm:text-5xl", children: "The Holy Rosary" }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-5 mx-auto w-24" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-muted-foreground max-w-xl mx-auto", children: [
        "Today is ",
        (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
          weekday: "long"
        }),
        " — the ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: today }),
        " Mysteries are prayed today."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl", children: "Mysteries of the Rosary" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: SETS.map((set) => {
        const isToday = set === today;
        const isActive = set === selected;
        return /* @__PURE__ */ jsxs("button", { onClick: () => setSelected(set), className: `rounded-full border px-4 py-2 text-sm transition-colors ${isActive ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`, children: [
          set,
          isToday && /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs uppercase tracking-widest text-primary/80", children: "Today" })
        ] }, set);
      }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
        selected,
        ": ",
        mysteries[selected].day
      ] }),
      /* @__PURE__ */ jsx("ol", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: active.mysteries.map((m, i) => /* @__PURE__ */ jsxs("li", { className: "rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " ",
          i + 1,
          ordinal(i + 1),
          " Mystery"
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 font-serif text-xl", children: m.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: m.scripture }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Fruit: " }),
          m.fruit
        ] })
      ] }, m.title)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl", children: "How to Pray the Rosary" }),
      /* @__PURE__ */ jsx("div", { className: "gold-divider mt-3 w-16" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "inline-flex flex-wrap justify-center rounded-full border border-border p-1 text-xs", children: ROSARY_LANGS.map((lang) => /* @__PURE__ */ jsx("button", { onClick: () => setLanguage(lang), className: `px-3 py-1 rounded-full transition-colors ${language === lang ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`, children: LANGUAGE_LABELS[lang] }, lang)) }) }),
      /* @__PURE__ */ jsx("ol", { className: "mt-6 space-y-4", children: rosarySteps.map((step) => {
        const {
          instruction,
          prayer
        } = getRosaryStepText(step.label, step.instruction, step.prayer, language);
        return /* @__PURE__ */ jsxs("li", { className: "rounded-xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg text-primary", children: step.label }),
          instruction && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: instruction }),
          prayer && /* @__PURE__ */ jsx("pre", { className: "mt-3 whitespace-pre-wrap font-serif text-base leading-relaxed", children: prayer }),
          language !== "en" && /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "Community translation — corrections welcome." })
        ] }, step.label);
      }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-center text-xs text-muted-foreground ornament", children: "Ave Maria, gratia plena" })
    ] })
  ] });
}
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
export {
  RosaryPage as component
};
