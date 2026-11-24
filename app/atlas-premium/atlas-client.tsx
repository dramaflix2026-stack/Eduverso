"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {atlasAreas,atlasViews,skullLandmarks,type Landmark} from "./catalog";
import styles from "./atlas.module.css";

type Gate={authenticated:boolean;hasAccess:boolean;status:"guest"|"locked"|"active"|"unavailable"};
type View=typeof atlasViews[number]["id"];
function SkullDiagram({view,select,active,unlocked}:{view:View;select:(id:string)=>void;active:string|null;unlocked:boolean}){
 const current=skullLandmarks.filter(item=>item.view===view);
 const skull=(view==="lateral")?<>
  <path d="M 74 220 C 65 133 142 64 248 64 C 361 64 429 133 420 219 C 417 257 395 282 371 296 L 356 355 279 390 213 382 178 339 134 326 116 277 Z" />
  <path d="M 149 219 Q 182 170 222 199 Q 244 229 215 253 Q 184 267 155 245 Z" className={styles.hole}/>
  <path d="M 292 253 Q 326 215 362 248 Q 384 280 355 306 L 311 299 Z" className={styles.hole}/>
  <path d="M 300 298 L 284 373 L 212 371 L 194 333" className={styles.seam}/>
  <path d="M 215 91 Q 245 180 235 212" className={styles.seam}/>
 </>:view==="inferior"?<>
  <path d="M 237 47 C 355 47 433 123 431 234 C 430 339 355 424 240 425 C 119 424 43 336 44 232 C 45 128 120 49 237 47 Z"/>
  <ellipse cx="238" cy="280" rx="56" ry="72" className={styles.hole}/>
  <path d="M 119 151 Q 240 97 355 150 M 116 190 Q 240 140 357 190" className={styles.seam}/>
  <path d="M 92 257 L 151 299 M 384 257 L 326 298" className={styles.seam}/>
 </>:<>
  <path d="M 239 40 C 353 40 429 133 424 245 C 421 291 409 339 370 366 L 336 398 288 420 188 420 140 398 107 365 C 66 339 55 285 54 241 C 51 132 128 41 239 40 Z"/>
  <path d="M 117 242 C 138 206 187 201 215 232 C 232 253 217 297 190 306 C 159 317 117 290 117 242 Z M 262 232 C 290 200 340 206 361 242 C 361 290 319 317 287 306 C 261 295 245 254 262 232 Z" className={styles.hole}/>
  <path d="M 239 264 L 218 331 259 331 Z" className={styles.hole}/>
  <path d="M 161 340 Q 240 365 318 340 L 317 379 Q 240 420 164 379 Z" className={styles.jaw}/>
  <path d="M 238 80 L 238 200 M 96 180 Q 238 220 382 180" className={styles.seam}/>
  <path d="M 170 385 Q 238 405 305 385" className={styles.seam}/>
  {view==="posterior"&&<><path d="M 120 211 Q 240 260 360 211" className={styles.seam}/><path d="M 170 340 Q 240 300 310 340" className={styles.seam}/></>}
 </>;
 return <div className={styles.diagramShell}>
  {view==="3d"?<div className={styles.placeholder3d}><span aria-hidden="true">◇</span><strong>Modelo tridimensional</strong><p>Em preparação. Esta primeira entrega não usa rotação simulada nem reaproveita o Atlas gratuito.</p></div>:<>
   <svg className={styles.anatomy} viewBox="0 0 480 480" role="img" aria-label={"Esquema ilustrativo de crânio humano — "+view}>
    <defs><radialGradient id="bone"><stop stopColor="#ebe9dc"/><stop offset=".63" stopColor="#c2bda9"/><stop offset="1" stopColor="#898374"/></radialGradient></defs>
    <g className={styles.bone}>{skull}</g>
    <text x="240" y="465" textAnchor="middle" fill="#aaa6cb" fontSize="11">ESQUEMA DIDÁTICO • NÃO SUBSTITUI PEÇA ANATÔMICA</text>
   </svg>
   <div className={styles.pins}>{current.map((item,i)=>{const disabled=!unlocked&&i>1;return <button key={item.id} type="button" style={{left:item.x+"%",top:item.y+"%"}} className={styles.pin+(active===item.id?" "+styles.pinActive:"")} onClick={()=>select(item.id)} disabled={disabled} aria-label={(disabled?"Bloqueado: ":"Selecionar ")+item.name} title={disabled?"Desbloqueie o Atlas Premium":item.name}>{disabled?"🔒":i+1}</button>})}</div>
  </>}
 </div>;
}
function lessonDescription(point:Landmark|null,unlocked:boolean){
 if(!point)return <p>Selecione um marcador sobre a ilustração para estudar a localização e a função de uma estrutura.</p>;
 const current=skullLandmarks.filter(p=>p.view===point.view);if(!unlocked&&current.findIndex(p=>p.id===point.id)>1)return <p>Esta estrutura exige a liberação do complemento.</p>;
 return <><h3>{point.name}</h3><p>{point.description}</p><small>Conteúdo introdutório ilustrativo. A revisão anatômica final e as imagens HD estão na etapa de produção editorial.</small></>;
}
export default function PremiumAtlasClient(){
 const [gate,setGate]=useState<Gate>({authenticated:false,hasAccess:false,status:"unavailable"});
 const [view,setView]=useState<View>("frontal");
 const [active,setActive]=useState<string|null>(null);
 const [area,setArea]=useState("esqueletico");
 const [query,setQuery]=useState("");
 const [quiz,setQuiz]=useState<string|null>(null);
 useEffect(()=>{
  let live=true;
  fetch("/api/atlas-premium/status",{cache:"no-store",credentials:"same-origin"}).then(r=>r.ok?r.json():null).then((data:Gate|null)=>{
   if(live)setGate(data&&typeof data.hasAccess==="boolean"?data:{authenticated:false,hasAccess:false,status:"unavailable"});
  }).catch(()=>{if(live)setGate({authenticated:false,hasAccess:false,status:"unavailable"})});
  return()=>{live=false};
 },[]);
 const filtered=useMemo(()=>atlasAreas.filter(a=>(a.name+" "+a.topics.join(" ")).toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR").trim())),[query]);
 const selectedPoint=skullLandmarks.find(p=>p.id===active)||null;
 const changeView=(next:View)=>{setView(next);setActive(null);setQuiz(null)};
 return <main className={styles.root}>
  <div className={styles.wrap}>
   <header className={styles.header}><Link href="/plataforma" className={styles.back}>← Voltar ao Eduverso</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>{gate.hasAccess?"Acesso liberado":"Complemento exclusivo"}</span></header>
   <section className={styles.hero}><div><span className={styles.eyebrow}>ANATOMIA EM OUTRA DIMENSÃO</span><h1>Conheça cada detalhe. <em>Entenda o corpo humano.</em></h1><p>Uma biblioteca anatômica independente com exploração visual, estruturas identificáveis e experiências de estudo. Construída do zero para o Eduverso.</p><a className={styles.primary} href="#laboratorio">Explorar demonstração <span>↗</span></a></div><div className={styles.heroArt}><span>🫀</span><strong>12 sistemas</strong><small>Catálogo em construção</small></div></section>
   {!gate.hasAccess&&<div className={styles.lockbar}><span>🔒</span><div><strong>{gate.authenticated?"Atlas Premium ainda não adquirido":"Conheça o Atlas Premium"}</strong><p>A demonstração é gratuita. O conteúdo completo será liberado após a compra específica do complemento. Integração Kiwify em preparação; ainda não há checkout ativo.</p></div><span className={styles.price}>R$ 29,90</span></div>}
   <section className={styles.catalog} aria-labelledby="catalog-title"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>CATÁLOGO ANATÔMICO</span><h2 id="catalog-title">Explore os sistemas</h2></div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar sistema ou estrutura..." aria-label="Buscar sistema ou estrutura"/></div>
    <div className={styles.cards}>{filtered.map(item=><button type="button" key={item.id} className={styles.card+(area===item.id?" "+styles.selected:"")} onClick={()=>setArea(item.id)}><span className={styles.cardIcon}>{item.icon}</span><strong>{item.name}</strong><small>{item.description}</small><span className={styles.cardBottom}>{item.topics.length} subtemas · {item.available?"Prévia disponível":"Em preparação"}</span></button>)}</div>
    {filtered.length===0&&<p className={styles.empty}>Nenhuma área encontrada. Tente outra palavra.</p>}
    <div className={styles.topics}><strong>Subitens · {atlasAreas.find(a=>a.id===area)?.name}</strong><div>{atlasAreas.find(a=>a.id===area)?.topics.map((t,i)=><span key={t} className={i===0&&area==="esqueletico"?styles.topicAvailable:""}>{t}{i===0&&area==="esqueletico"?" · demonstração":""}</span>)}</div></div>
   </section>
   <section id="laboratorio" className={styles.lab}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>PRIMEIRO LABORATÓRIO</span><h2>Crânio humano · exploração inicial</h2><p>Um protótipo interativo com esquemas autorais. As imagens HD revisadas e o modelo 3D real serão adicionados nas próximas etapas.</p></div><span className={styles.chip}>Versão de demonstração</span></div>
    <div className={styles.labGrid}><div className={styles.viewer}><div className={styles.tabs} role="group" aria-label="Selecionar vista">{atlasViews.map(item=><button key={item.id} type="button" className={view===item.id?styles.tabActive:""} onClick={()=>changeView(item.id)}>{item.label}</button>)}</div><SkullDiagram view={view} select={setActive} active={active} unlocked={gate.hasAccess}/><div className={styles.diagramNote}>Selecione os marcadores para identificar estruturas. Pontos adicionais permanecem bloqueados até a compra.</div></div>
    <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span>{lessonDescription(selectedPoint,gate.hasAccess)}<div className={styles.divider}/><strong>Desafio rápido</strong><p>Qual osso participa da formação da testa?</p><div className={styles.quiz}>{["Frontal","Temporal","Occipital"].map(answer=><button type="button" key={answer} onClick={()=>setQuiz(answer)}>{answer}</button>)}</div>{quiz&&<div className={styles.answer} role="status">{quiz==="Frontal"?"✓ Correto! O frontal forma a região da testa.":"Ainda não. O osso frontal constitui a testa; tente novamente."}</div>}<div className={styles.divider}/><span className={styles.muted}>Material educativo, não diagnóstico. Os esquemas são ilustrativos e não representam cortes ou medidas anatômicas.</span></aside></div>
   </section>
   <footer className={styles.footer}>Atlas Premium Eduverso · Desenvolvimento independente do Atlas gratuito · <Link href="/plataforma">Voltar aos estudos</Link></footer>
  </div>
 </main>;
}
