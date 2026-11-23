import {bones,imageUrl,sourceUrl} from "./anatomy-atlas-data";
import {atlasViews,type AtlasView} from "./anatomy-atlas-collection-data";
import {thoraxViews} from "./anatomy-thorax-views";
import {upperLimbViews} from "./anatomy-upper-limb-views";
import {lowerLimbViews} from "./anatomy-lower-limb-views";

/**
 * Vista Anterior: cinco imagens distintas, com conjuntos independentes de estudo.
 *
 * A primeira é o atlas vetorial de regiões clicáveis do Eduverso, renderizado
 * pelo componente AnatomyAtlas original, preservando seu armazenamento.
 * As quatro seguintes reutilizam imagens/anotações anatômicas já presentes no
 * Eduverso, com IDs e históricos separados.
 *
 * Posições do motor de hotspots são didáticas e requerem revisão visual.
 */
function requiredView(views:AtlasView[],id:string):AtlasView{
 const view=views.find(item=>item.id===id);
 if(!view)throw new Error("Imagem anatômica não encontrada: "+id);
 return view;
}
const axial=requiredView(thoraxViews,"torax-anterior");
const shoulder=requiredView(upperLimbViews,"membro-superior-ombro");
const upper=requiredView(atlasViews,"membro-superior");
const lower=requiredView(lowerLimbViews,"membro-inferior-quadril");

export const anteriorViews:AtlasView[]=[
 {
  id:"anterior-corpo",
  title:"Esqueleto humano — vista anterior completa",
  short:"Corpo completo",
  subtitle:"Explore o esqueleto inteiro com 12 regiões ósseas clicáveis, perguntas e flashcards.",
  image:imageUrl,source:sourceUrl,
  credit:"Ilustração didática colorida do Eduverso · áreas interativas originais · referência anatômica disponível na fonte",
  ratio:"1086 / 1448",
  alt:"Ilustração colorida do esqueleto humano completo, com áreas interativas por osso",
  spots:bones.map(bone=>({...bone}))
 },
 {
  ...axial,id:"anterior-axial",
  title:"Vista anterior — componente axial do tórax",
  short:"Esqueleto axial",
  subtitle:"Foco no componente torácico do esqueleto axial: esterno, costelas e conexões cartilaginosas.",
  alt:"Caixa torácica anterior do esqueleto axial, com esterno e arcos costais"
 },
 {
  ...shoulder,id:"anterior-escapular",
  title:"Vista anterior — cintura escapular",
  short:"Cintura escapular",
  subtitle:"Estude clavícula, escápula, glenoide e úmero proximal na região do ombro.",
  alt:"Vista anterior da cintura escapular e da articulação do ombro"
 },
 {
  ...upper,id:"anterior-superiores",
  title:"Vista anterior — ossos dos membros superiores",
  short:"Membros superiores",
  subtitle:"Reconheça úmero, rádio, ulna, carpo, metacarpos e falanges nas extremidades superiores.",
  alt:"Ilustração dos ossos dos membros superiores em vista anterior"
 },
 {
  ...lower,id:"anterior-inferiores",
  title:"Vista anterior — quadril e fêmur",
  short:"Membros inferiores",
  subtitle:"Estude o início dos membros inferiores com foco no quadril, acetábulo e fêmur proximal.",
  alt:"Anatomia óssea anterior do quadril e do fêmur proximal"
 }
];

export const anteriorViewIds=new Set(anteriorViews.map(view=>view.id));
export function anteriorViewIsValid(id:string|null):boolean{
 return id!==null&&anteriorViewIds.has(id);
}
