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
export {
  LANGUAGE_LABELS as L,
  getPrayerText as g,
  prayerTranslations as p
};
