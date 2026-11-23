import {atlasViews,type AtlasView} from "./anatomy-atlas-collection-data";
import {skullViews} from "./anatomy-skull-views";
import {thoraxViews} from "./anatomy-thorax-views";
import {pelvisViews} from "./anatomy-pelvis-views";
import {lowerLimbViews} from "./anatomy-lower-limb-views";

/**
 * Vista posterior — cinco imagens anatômicas independentes.
 * Reaproveita fontes e hotspots documentados no próprio Eduverso,
 * sem apagar os atlas de origem. A primeira vista mantém os IDs
 * e progresso anteriores da vista posterior completa.
 *
 * As coordenadas foram mapeadas didaticamente e ainda exigem revisão
 * visual/anatômica antes da aprovação definitiva.
 */
function requiredView(views:AtlasView[],id:string):AtlasView{
 const found=views.find(view=>view.id===id);
 if(!found)throw new Error("Vista de anatomia não encontrada: "+id);
 return found;
}
const original=requiredView(atlasViews,"posterior");
const skull=requiredView(skullViews,"cranio-posterior");
const thorax=requiredView(thoraxViews,"torax-posterior");
const pelvis=requiredView(pelvisViews,"pelve-posterior");
const leg=requiredView(lowerLimbViews,"membro-inferior-perna-posterior");

export const posteriorViews:AtlasView[]=[
 {
  ...original,id:"posterior-corpo",
  title:"Esqueleto — vista posterior completa",
  short:"Corpo completo",
  subtitle:"Estude 11 marcos ósseos do esqueleto humano, da nuca ao calcâneo, na vista dorsal.",
  alt:"Esqueleto humano completo visto por trás, com regiões clicáveis"
 },
 {
  ...skull,id:"posterior-cranio",
  title:"Vista posterior — crânio e suturas",
  short:"Crânio posterior",
  subtitle:"Explore o occipital, os parietais e as suturas cranianas na face posterior.",
  alt:"Modelo anatômico do crânio visto por trás, com áreas de identificação"
 },
 {
  ...thorax,id:"posterior-torax",
  title:"Vista posterior — tórax e costelas",
  short:"Tórax posterior",
  subtitle:"Localize vértebras torácicas e arcos costais na parede posterior do tórax.",
  alt:"Caixa torácica posterior, com vértebras e costelas para identificação"
 },
 {
  ...pelvis,id:"posterior-pelve",
  title:"Vista posterior — pelve e sacro",
  short:"Pelve posterior",
  subtitle:"Identifique cristas ilíacas, sacro, articulação sacroilíaca e marcos do ísquio.",
  alt:"Anatomia óssea posterior da pelve com o sacro em destaque"
 },
 {
  ...leg,id:"posterior-perna",
  title:"Vista posterior — tíbia e perna",
  short:"Perna posterior",
  subtitle:"Estude os côndilos, a linha do sóleo, a diáfise e o maléolo medial da tíbia.",
  alt:"Osso da tíbia em vista posterior, com marcos ósseos identificáveis"
 }
];

export const posteriorViewIds=new Set(posteriorViews.map(view=>view.id));
export function posteriorViewIsValid(id:string|null):boolean{
 return id!==null&&posteriorViewIds.has(id);
}
