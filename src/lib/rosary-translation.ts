import type { PrayerLanguage } from "@/lib/translations";

// Translations of the Rosary step prayers in Kiswahili (sw) and Kipsigis (kip).
// Keys correspond to the `label` of each entry in `rosarySteps`.
// English text lives in rosary-data.ts and is used as the fallback.

type Lang = Exclude<PrayerLanguage, "la">;

export const rosaryStepTranslations: Record<string, Partial<Record<Exclude<Lang, "en">, { instruction?: string; prayer?: string }>>> = {
  "1. Sign of the Cross & Apostles' Creed": {
    sw: {
      instruction: "Shika msalaba.",
      prayer:
        "Kwa jina la Baba, na la Mwana, na la Roho Mtakatifu. Amina.\n\nNasadiki kwa Mungu Baba Mwenyezi, Muumba wa mbingu na nchi. Na kwa Yesu Kristo, Mwana wake wa pekee, Bwana wetu, aliyechukuliwa mimba kwa uweza wa Roho Mtakatifu, akazaliwa na Bikira Maria, akateswa zamani za Pontio Pilato, akasulibiwa, akafa, akazikwa; akashuka kuzimu, siku ya tatu akafufuka katika wafu; akapaa mbinguni, ameketi kuume kwa Mungu Baba Mwenyezi; kutoka huko atakuja kuwahukumu wazima na wafu. Nasadiki kwa Roho Mtakatifu, Kanisa Katoliki Takatifu, ushirika wa watakatifu, maondoleo ya dhambi, ufufuko wa mwili, na uzima wa milele. Amina.",
    },
    kip: {
      instruction: "Nam mbarendet.",
      prayer:
        "Ko u kainet nebo Kwanda, ak Werindo, ak Tamirmiriet ne tilil. Amen.\n\nIyandet Iyin Kwanda ne Kamuktoindet, ne kichobu kipsengwet ak ng'wony; ak Yesu Kristo, Werindo nebo agenge, Kiptaiyat nyon, ne kichobtoi ko u Tamirmiriet ne tilil, ne ki kasiretab Maria ne tilil, ne ki nyalil em betusiek che bo Pontio Pilato, ki saamin, ki me, ki keinde; ki rute kobit toror, em betut nebo somok ki ng'eet kobun che me; ki teete kipsengwet, ki tebe muito ne ya nebo Iyin Kwanda ne Kamuktoindet; iyo ko nyo kotetut chii che songoroon ak che me. Iyandet Tamirmiriet ne tilil, Kanisa Katolik ne tilil, kibagenge nebo biik che tilil, isatet ne bo ngalek, ng'eetabchaisietab borto, ak sobet ne yaaitin akwek. Amen.",
    },
  },
  "2. Our Father": {
    sw: {
      instruction: "Kwenye shanga la kwanza kubwa.",
      prayer:
        "Baba yetu uliye mbinguni, jina lako litukuzwe; ufalme wako ufike, utakalo lifanyike duniani kama mbinguni. Utupe leo riziki yetu; utusamehe makosa yetu, kama nasi tunavyowasamehe waliotukosea; usitutie majaribuni, lakini utuopoe maovuni. Amina.",
    },
    kip: {
      instruction: "Em logoiyot ne oo ne tai.",
      prayer:
        "Kwanda nyon ne mi kipsengwet, kainet ne nyit kainet nengung; nyo bounatet nengung, yaaite mageny chebo iyin em ng'wony ko u kipsengwet. Konech rani amitwogik chechok chebo betut, ak isatech ngalek chechok, ko u keisatei che osachech; me yet inyam yomet, ago tilewech ng'wony che ya. Amen.",
    },
  },
  "3. Three Hail Marys": {
    sw: {
      instruction: "Kwenye shanga tatu zinazofuata — kwa imani, tumaini, na mapendo.",
      prayer:
        "Salamu Maria, umejaa neema, Bwana yu nawe. Umebarikiwa kuliko wanawake wote, naye Yesu mzao wa tumbo lako amebarikiwa. Maria mtakatifu, Mama wa Mungu, utuombee sisi wakosefu, sasa na saa ya kufa kwetu. Amina.",
    },
    kip: {
      instruction: "Em logoiyat somok che mengech — amu iyandanet, kayanet ak chamanet.",
      prayer:
        "Chamuge Maria, ne i'eng kororindo, Kiptaiyat ko miten ak iin. Ki berurin ng'alek tugul, ak ki berurin Yesu ne kibo kelduny'ung. Maria ne tilil, Kamet nebo Iyin, saeech echek che yach, rani ak saa ne keimet echek. Amen.",
    },
  },
  "4. Glory Be": {
    sw: {
      prayer:
        "Atukuzwe Baba, na Mwana, na Roho Mtakatifu; kama ilivyokuwa mwanzo, na sasa, na siku zote, hata milele na milele. Amina.",
    },
    kip: {
      prayer:
        "Kotorornech Kwanda, ak Werindo, ak Tamirmiriet ne tilil; ko u kiimi tai, ak rani, ak betusiek tugul, ago me yaaitin akwek. Amen.",
    },
  },
  "5. Announce the First Mystery": {
    sw: {
      instruction:
        "Tafakari fumbo, kisha sali Baba Yetu kwenye shanga kubwa.",
    },
    kip: {
      instruction:
        "Iyae ng'alek che muguleldosi, ago ibwat Kwanda nyon em logoiyot ne oo.",
    },
  },
  "6. Ten Hail Marys (a decade)": {
    sw: {
      instruction: "Moja kwa kila shanga moja kati ya kumi, ukitafakari fumbo.",
      prayer:
        "Salamu Maria, umejaa neema, Bwana yu nawe. Umebarikiwa kuliko wanawake wote, naye Yesu mzao wa tumbo lako amebarikiwa. Maria mtakatifu, Mama wa Mungu, utuombee sisi wakosefu, sasa na saa ya kufa kwetu. Amina.",
    },
    kip: {
      instruction: "Agenge em logoiyat tugul che taman, ki iyae ng'alek che muguleldosi.",
      prayer:
        "Chamuge Maria, ne i'eng kororindo, Kiptaiyat ko miten ak iin. Ki berurin ng'alek tugul, ak ki berurin Yesu ne kibo kelduny'ung. Maria ne tilil, Kamet nebo Iyin, saeech echek che yach, rani ak saa ne keimet echek. Amen.",
    },
  },
  "7. Glory Be & Fatima Prayer": {
    sw: {
      instruction: "Baada ya kila kumi.",
      prayer:
        "Atukuzwe Baba, na Mwana, na Roho Mtakatifu; kama ilivyokuwa mwanzo, na sasa, na siku zote, hata milele na milele. Amina.\n\nEe Yesu wangu, utusamehe dhambi zetu, utuokoe na moto wa jehanamu, uziongoze roho zote mbinguni, hasa zile zinazohitaji rehema yako zaidi. Amina.",
    },
    kip: {
      instruction: "Ko baibai logoiyot agetugul nebo taman.",
      prayer:
        "Kotorornech Kwanda, ak Werindo, ak Tamirmiriet ne tilil; ko u kiimi tai, ak rani, ak betusiek tugul, ago me yaaitin akwek. Amen.\n\nYesu nyon, isatech ngalek chechok, iyoteech ko u maat ne bo jehanamu, ribchin tamirmirio tugul kipsengwet, ko muguleldo che maache kanyitiet nengung. Amen.",
    },
  },
  "8. Repeat for the remaining four mysteries": {
    sw: {
      instruction:
        "Tangaza kila fumbo, kisha Baba Yetu, Salamu Maria kumi, Atukuzwe, na Sala ya Fatima.",
    },
    kip: {
      instruction:
        "Iyae mageny agetugul, ago Kwanda nyon, Chamuge Maria taman, Kotorornech, ak saet nebo Fatima.",
    },
  },
  "9. Hail, Holy Queen": {
    sw: {
      instruction: "Baada ya kumi zote tano.",
      prayer:
        "Salamu Malkia, Mama wa huruma, salamu uzima wetu, utamu wetu na tumaini letu. Kwako tunalia sisi wana wa Hawa tuliohamishwa; kwako tunatuma kuugua kwetu, tukiomboleza na kulia katika bonde hili la machozi. Basi, ewe mtetezi wetu, geuza macho yako ya huruma kwetu; na baada ya uhamisho huu, utuonyeshe Yesu, mzao wa tumbo lako uliyebarikiwa. Ee mwenye huruma, ee mpole, ee mtamu, Bikira Maria! Utuombee, ee Mama Mtakatifu wa Mungu, ili tustahili ahadi za Kristo. Amina.",
    },
    kip: {
      instruction: "Ko baibai logoiyatosiek tugul mut.",
      prayer:
        "Chamuge, Kiptaiyo ne tilil, Kamet nebo kanyitiet, chamuge sobet nyon, anyiny nyon ak kayanet nyon. Iin keribchini lakwetab Hawa che kichoorchin; iin kekochi inyiy nyon, kerere ak kerub em emet ne bo elalweet. Ole, iin kiyolu nyon, weech konyek che bo kanyitiet kechok; ago ko baibai chooret nyon, iboru Yesu, kelduny'ung ne kiberur. Iyo ne bo kanyitiet, iyo ne anyiny, iyo Maria ne tilil! Saeech echek, Kamet ne tilil nebo Iyin, kotyongoge ng'alek che kibwoot Kristo. Amen.",
    },
  },
  "10. Closing Prayer & Sign of the Cross": {
    sw: {
      prayer:
        "Ee Mungu, ambaye Mwana wako wa pekee, kwa maisha yake, kifo na ufufuko, ametustahilishia thawabu za uzima wa milele: tunakuomba, kwa kutafakari mafumbo haya ya Rozari Takatifu ya Bikira Maria, tuyaige yaliyomo na kupata yale yanayoahidi. Kwa Kristo Bwana wetu. Amina.\n\nKwa jina la Baba, na la Mwana, na la Roho Mtakatifu. Amina.",
    },
    kip: {
      prayer:
        "Iyin, ne Werindo nebo agenge, ko u sobet nengung, meet ak ng'eetabchaisiet, ki konech baibai nebo sobet ne yaaitin akwek: saeech, ko u keyaaie ng'alek che mageny chu chebo Rosari ne tilil nebo Maria ne tilil, keibanen che mi tai ak kenam che kibwootin. Ko u Kristo Kiptaiyat nyon. Amen.\n\nKo u kainet nebo Kwanda, ak Werindo, ak Tamirmiriet ne tilil. Amen.",
    },
  },
};

export function getRosaryStepText(
  label: string,
  englishInstruction: string,
  englishPrayer: string | undefined,
  language: Lang,
): { instruction: string; prayer?: string } {
  if (language === "en") {
    return withOptionalPrayer(englishInstruction, englishPrayer);
  }

  const t = rosaryStepTranslations[label]?.[language];
  return withOptionalPrayer(t?.instruction ?? englishInstruction, t?.prayer ?? englishPrayer);
}

function withOptionalPrayer(
  instruction: string,
  prayer: string | undefined,
): { instruction: string; prayer?: string } {
  return prayer === undefined ? { instruction } : { instruction, prayer };
}
