import{b as w,c as d,j as a,L as l}from"./index-BFZ5rw8c.js";import{c as g,A as m}from"./app-layout-DhK1YB4h.js";import{a as p}from"./prayers-data-B7Sc-Zun.js";import{u as b,H as x}from"./favorites-CiN_K4O9.js";const f=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],j=g("arrow-left",f),v={en:"English",la:"Latin",sw:"Kiswahili",kip:"Kipsigis"},c={"our-father":{sw:`Baba yetu uliye mbinguni,
jina lako litukuzwe;
ufalme wako ufike,
utakalo lifanyike
duniani kama mbinguni.
Utupe leo riziki yetu;
utusamehe makosa yetu,
kama nasi tunavyowasamehe waliotukosea;
usitutie majaribuni,
lakini utuopoe maovuni.
Amina.`,kip:`Kwanda nyon ne mi kipsengwet,
kainet ne nyit kainet nengung;
nyo bounatet nengung,
yaaite mageny chebo iyin
em ng'wony ko u kipsengwet.
Konech rani amitwogik chechok chebo betut,
ak isatech ngalek chechok,
ko u keisatei che osachech;
me yet inyam yomet,
ago tilewech ng'wony che ya.
Amen.`},"hail-mary":{sw:`Salamu Maria, umejaa neema,
Bwana yu nawe.
Umebarikiwa kuliko wanawake wote,
naye Yesu mzao wa tumbo lako amebarikiwa.
Maria mtakatifu, Mama wa Mungu,
utuombee sisi wakosefu,
sasa na saa ya kufa kwetu.
Amina.`,kip:`Chamuge Maria, ne i'eng kororindo,
Kiptaiyat ko miten ak iin.
Ki berurin ng'alek tugul,
ak ki berurin Yesu ne kibo kelduny'ung.
Maria ne tilil, Kamet nebo Iyin,
saeech echek che yach,
rani ak saa ne keimet echek.
Amen.`},"glory-be":{sw:`Atukuzwe Baba, na Mwana, na Roho Mtakatifu;
kama ilivyokuwa mwanzo, na sasa, na siku zote,
hata milele na milele.
Amina.`,kip:`Kotorornech Kwanda, ak Werindo, ak Tamirmiriet ne tilil;
ko u kiimi tai, ak rani, ak betusiek tugul,
ago me yaaitin akwek.
Amen.`},"morning-offering":{sw:`Ee Yesu, kwa njia ya Moyo Safi wa Maria,
ninakutolea sala, kazi, furaha na mateso yangu ya leo,
kwa nia zote za Moyo wako Mtakatifu,
kwa umoja na Sadaka Takatifu ya Misa duniani kote.
Amina.`,kip:`Yesu, ko u Mukulelwet ne tilil nebo Maria,
akonin saet, boisiet, boiboiyet ak nyalilet chechok chebo betut,
amu mageny tugul che bo Mukulelwet nengung ne tilil.
Amen.`},"night-prayer":{sw:`Tunakuomba Ee Bwana,
likae nyumba hii, ukatufukuzie mbali hila zote za adui;
malaika wako watakatifu wakae nasi watutunze kwa amani;
baraka yako iwe juu yetu daima,
kwa Yesu Kristo Bwana wetu.
Amina.`,kip:`Saeech, Kiptaiyat,
iribchin koret ne, ak iut tugul ya che bo bunyot;
ko menye malaikaisiek chebo iyin ne tilil ak echek,
ago ko nyolu kayanet nengung kechok.
Amen.`},"guardian-angel":{sw:`Malaika wa Mungu, mlinzi wangu mpendwa,
ambaye chiyetangu Mungu amenikabidhi kwako,
leo unilinde, uniongoze, unitawale na unilinde.
Amina.`,kip:`Malaikat nebo Iyin, ne iribene anan,
ne ki konech Iyin amu chamanet,
rani iribana, iut, ak iyaa anan.
Amen.`},"grace-before-meals":{sw:`Utubariki Ee Bwana, na vipawa hivi vyako,
ambavyo tutavipokea kutoka kwa ukarimu wako,
kwa Kristo Bwana wetu.
Amina.`,kip:`Iberur echek, Kiptaiyat, ak konetik chu chebo iyin,
che keyuoge ko u kororet nengung,
ko u Kristo Kiptaiyat nyon.
Amen.`},"st-michael-prayer":{sw:`Mtakatifu Mikaeli Malaika Mkuu,
tutetee katika vita;
uwe ulinzi wetu dhidi ya hila na uovu wa shetani;
Mungu amkemee, twaomba kwa unyenyekevu;
nawe, Ee Mkuu wa jeshi la mbinguni,
kwa nguvu ya Mungu, mtumbukize jehanamu shetani
na pepo wengine wabaya wanaozunguka ulimwenguni
wakitafuta kuwaangamiza roho.
Amina.`,kip:`Mikaeli ne tilil, Malaikat ne ngwanindet,
iribana ko u biik chebo loseet;
ibe iyin ne yoche shetani;
ko iyin nyolu kayanet, saeech;
ago iin, Kiptaiyat nebo malaikaisiek,
ko u kamuktaet nebo Iyin, irurchi shetani jehanamu
ak tamirmirio tugul che ya che mengeche em ng'wony.
Amen.`}};function M(s,e,n,t){if(t==="en")return{text:e,available:!0};if(t==="la")return{text:n??e,available:!!n};const u=c[s]?.[t];return{text:u??e,available:!!u}}function L(){const{id:s}=w.useParams(),e=p.find(i=>i.id===s),[n,t]=d.useState("en"),{isFavorite:u,toggle:y}=b();if(!e)return a.jsx(m,{children:a.jsxs("div",{className:"py-20 text-center",children:[a.jsx("h1",{className:"font-serif text-3xl",children:"Prayer not found"}),a.jsx(l,{to:"/prayers",className:"mt-4 inline-block text-primary",children:"← Back to prayers"})]})});const o=["en"];e.latin&&o.push("la");const k=c[e.id];k?.sw&&o.push("sw"),k?.kip&&o.push("kip");const{text:h}=M(e.id,e.text,e.latin,n),r=u(e.id);return a.jsxs(m,{children:[a.jsxs("div",{className:"flex items-center justify-between",children:[a.jsxs(l,{to:"/prayers",className:"inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",children:[a.jsx(j,{className:"h-4 w-4"})," All prayers"]}),a.jsxs("button",{onClick:()=>y(e.id),"aria-pressed":r,"aria-label":r?"Remove from favorites":"Add to favorites",className:`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${r?"border-primary bg-primary/10 text-primary":"border-border text-muted-foreground hover:text-foreground"}`,children:[a.jsx(x,{className:`h-4 w-4 ${r?"fill-current":""}`}),r?"Saved":"Save"]})]}),a.jsxs("header",{className:"mt-6 text-center",children:[a.jsx("p",{className:"text-xs uppercase tracking-[0.3em] text-primary",children:e.category}),a.jsx("h1",{className:"mt-3 font-serif text-4xl sm:text-5xl",children:e.title}),a.jsx("div",{className:"gold-divider mt-5 mx-auto w-24"})]}),o.length>1&&a.jsx("div",{className:"mt-6 flex justify-center",children:a.jsx("div",{className:"inline-flex flex-wrap justify-center rounded-full border border-border p-1 text-xs",children:o.map(i=>a.jsx("button",{onClick:()=>t(i),className:`px-3 py-1 rounded-full transition-colors ${n===i?"bg-primary/15 text-primary":"text-muted-foreground hover:text-foreground"}`,children:v[i]},i))})}),a.jsxs("article",{className:"mt-10 max-w-2xl mx-auto rounded-xl border border-border bg-card p-8 sm:p-12",children:[a.jsx("pre",{className:"whitespace-pre-wrap font-serif text-lg leading-relaxed text-center",children:h}),(n==="sw"||n==="kip")&&a.jsx("p",{className:"mt-6 text-center text-xs text-muted-foreground",children:"Corrections welcomed."})]})]})}export{L as component};
