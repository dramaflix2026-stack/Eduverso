"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {atlasAreas,atlasViews,skullLandmarks,type Landmark} from "./catalog";
import styles from "./atlas.module.css";

type Gate={authenticated:boolean;hasAccess:boolean;status:"guest"|"locked"|"active"|"unavailable"};
type View=typeof atlasViews[number]["id"];
function SkullDiagram({view,select,active,unlocked}:{view:View;select:(id:string)=>void;active:string|null;unlocked:boolean}){
 const current=skullLandmarks.filter(item=>item.view===view);
 const imageByView:Record<Exclude<View,"3d">,string>={
  frontal:"/atlas-premium/cranio/file_00000000c6a0820ea00f04273a6a00c2.webp",
  lateral:"/atlas-premium/cranio/file_000000002da8820e98301ea893946a63.webp",
  posterior:"/atlas-premium/cranio/file_0000000026c4820e9b7ff7ba08152f15.webp",
  inferior:"/atlas-premium/cranio/file_00000000363c820eabaf4385cff0ed5d.webp"
 };
 const [zoom,setZoom]=useState(1);
 useEffect(()=>setZoom(1),[view]);
 return <div className={styles.diagramShell}>
  {view==="3d"?<div className={styles.placeholder3d}><span aria-hidden="true">◇</span><strong>Modelo tridimensional</strong><p>Em preparação. A rotação 3D real será disponibilizada após a produção e revisão de um modelo anatômico GLB.</p></div>:<>
   <div className={styles.visualFrame}>
    <div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}>
     <img className={styles.skullPhoto} src={imageByView[view]} alt={"Ilustração anatômica em alta definição do crânio humano — "+atlasViews.find(item=>item.id===view)?.label} width={1101} height={1376} decoding="async"/>
     <div className={styles.pins}>{current.map((item,i)=>{const disabled=!unlocked&&i>1;return <button key={item.id} type="button" style={{left:item.x+"%",top:item.y+"%"}} className={styles.pin+(active===item.id?" "+styles.pinActive:"")} onClick={()=>select(item.id)} disabled={disabled} aria-label={(disabled?"Bloqueado: ":"Selecionar ")+item.name} title={disabled?"Desbloqueie o Atlas Premium":item.name}>{disabled?"🔒":i+1}</button>})}</div>
    </div>
   </div>
   <div className={styles.zoomControls} role="group" aria-label="Zoom da imagem anatômica"><button type="button" onClick={()=>setZoom(v=>Math.max(1,Math.round((v-.25)*100)/100))} disabled={zoom===1} aria-label="Diminuir zoom">−</button><span>{Math.round(zoom*100)}%</span><button type="button" onClick={()=>setZoom(v=>Math.min(2.5,Math.round((v+.25)*100)/100))} disabled={zoom>=2.5} aria-label="Aumentar zoom">+</button><button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Redefinir</button></div>
  </>}
 </div>;
}
function lessonDescription(point:Landmark|null,unlocked:boolean){
 if(!point)return <p>Selecione um marcador sobre a imagem para conhecer a localização e a função de uma estrutura.</p>;
 const current=skullLandmarks.filter(p=>p.view===point.view);if(!unlocked&&current.findIndex(p=>p.id===point.id)>1)return <p>Esta estrutura exige a liberação do complemento.</p>;
 return <><h3>{point.name}</h3><p>{point.description}</p><small>Texto introdutório. A imagem e a posição dos marcadores são ilustrativas e dependem de revisão anatômica antes do lançamento comercial.</small></>;
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
   <section id="laboratorio" className={styles.lab}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>PRIMEIRO LABORATÓRIO</span><h2>Crânio humano · exploração inicial</h2><p>Quatro vistas em alta definição com pontos interativos e zoom. Imagens ilustrativas geradas por IA, ainda pendentes de revisão anatômica; modelo 3D real em preparação.</p></div><span className={styles.chip}>Versão de demonstração</span></div>
    <div className={styles.labGrid}><div className={styles.viewer}><div className={styles.tabs} role="group" aria-label="Selecionar vista">{atlasViews.map(item=><button key={item.id} type="button" className={view===item.id?styles.tabActive:""} onClick={()=>changeView(item.id)}>{item.label}</button>)}</div><SkullDiagram view={view} select={setActive} active={active} unlocked={gate.hasAccess}/><div className={styles.diagramNote}>Selecione os marcadores para identificar estruturas. Pontos adicionais permanecem bloqueados até a compra.</div></div>
    <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span>{lessonDescription(selectedPoint,gate.hasAccess)}<div className={styles.divider}/><strong>Desafio rápido</strong><p>Qual osso participa da formação da testa?</p><div className={styles.quiz}>{["Frontal","Temporal","Occipital"].map(answer=><button type="button" key={answer} onClick={()=>setQuiz(answer)}>{answer}</button>)}</div>{quiz&&<div className={styles.answer} role="status">{quiz==="Frontal"?"✓ Correto! O frontal forma a região da testa.":"Ainda não. O osso frontal constitui a testa; tente novamente."}</div>}<div className={styles.divider}/><span className={styles.muted}>Material educativo, não diagnóstico. As imagens foram geradas por IA e não são fotografias de peças anatômicas; detalhes e marcadores exigem revisão técnica.</span></aside></div>
   </section>
   <footer className={styles.footer}>Atlas Premium Eduverso · Desenvolvimento independente do Atlas gratuito · <Link href="/plataforma">Voltar aos estudos</Link></footer>
  </div>
 </main>;
}
