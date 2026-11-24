"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {atlasAreas,atlasViews,skullLandmarks,type Landmark} from "./catalog";
import styles from "./atlas.module.css";
import {muscularLabs} from "./muscular-data";

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
type AtlasMode="home"|"system"|"lab";
export default function PremiumAtlasClient({mode="home",systemId="esqueletico"}:{mode?:AtlasMode;systemId?:string}){
 const [gate,setGate]=useState<Gate>({authenticated:false,hasAccess:false,status:"unavailable"});
 const [view,setView]=useState<View>("frontal");
 const [active,setActive]=useState<string|null>(null);
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
 const selectedSystem=atlasAreas.find(a=>a.id===systemId)??atlasAreas[0];
 const selectedPoint=skullLandmarks.find(p=>p.id===active)||null;
 const changeView=(next:View)=>{setView(next);setActive(null);setQuiz(null)};
 return <main className={styles.root}>
  <div className={styles.wrap}>
   <header className={styles.header}><Link href={mode==="home"?"/plataforma":mode==="lab"?"/atlas-premium/sistema/esqueletico":"/atlas-premium"} className={styles.back}>← {mode==="home"?"Voltar ao Eduverso":mode==="lab"?"Sistema Esquelético":"Todos os sistemas"}</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>{gate.hasAccess?"Acesso liberado":"Complemento exclusivo"}</span></header>

   {mode==="home"&&<>
    <section className={styles.hero}><div><span className={styles.eyebrow}>ATLAS PREMIUM · LABORATÓRIO DE ANATOMIA</span><h1>Explore cada sistema. <em>Aprenda cada estrutura.</em></h1><p>Escolha um sistema anatômico para abrir os subitens em uma página própria. Depois, entre diretamente no laboratório disponível — sem rolagem interminável.</p><Link className={styles.primary} href="/atlas-premium/sistema/esqueletico">Explorar o sistema esquelético <span>↗</span></Link></div><div className={styles.heroArt}><span>🫀</span><strong>12 sistemas</strong><small>Biblioteca anatômica em expansão</small></div></section>
    {!gate.hasAccess&&<div className={styles.lockbar}><span>🔒</span><div><strong>{gate.authenticated?"Atlas Premium ainda não adquirido":"Conheça o Atlas Premium"}</strong><p>Demonstração disponível. A compra do complemento será habilitada após a integração específica com a Kiwify.</p></div><span className={styles.price}>R$ 29,90</span></div>}
    <section className={styles.catalog} aria-labelledby="catalog-title">
     <div className={styles.sectionHead}><div><span className={styles.eyebrow}>CATÁLOGO ANATÔMICO</span><h2 id="catalog-title">Escolha um sistema</h2></div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar sistema ou estrutura..." aria-label="Buscar sistema ou estrutura"/></div>
     <div className={styles.cards}>{filtered.map(item=><Link href={"/atlas-premium/sistema/"+item.id} key={item.id} className={styles.card}><span className={styles.cardIcon}>{item.icon}</span><strong>{item.name}</strong><small>{item.description}</small><span className={styles.cardBottom}>{item.topics.length} subitens · {item.available?"Laboratório disponível":"Em preparação"} ↗</span></Link>)}</div>
     {filtered.length===0&&<p className={styles.empty}>Nenhum sistema encontrado. Tente outra palavra.</p>}
    </section>
   </>}

   {mode==="system"&&<section className={styles.systemPage}>
    <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><span>{selectedSystem.name}</span></nav>
    <div className={styles.systemIntro}><span className={styles.eyebrow}>SISTEMA ANATÔMICO</span><span className={styles.systemGlyph} aria-hidden="true">{selectedSystem.icon}</span><h1>{selectedSystem.name}</h1><p>{selectedSystem.description} Selecione uma área de estudo abaixo.</p><span className={styles.systemCount}>{selectedSystem.topics.length} subitens organizados</span></div>
    <div className={styles.topicGrid}>{selectedSystem.topics.map((topic,i)=>{
     const muscular=selectedSystem.id==="muscular";
     const ready=(selectedSystem.id==="esqueletico"&&i<8)||muscular;
     const paths=["/atlas-premium/cranio/estudo","/atlas-premium/coluna-vertebral/estudo","/atlas-premium/caixa-toracica/estudo","/atlas-premium/membros-superiores/estudo","/atlas-premium/membros-inferiores/estudo","/atlas-premium/articulacoes/estudo","/atlas-premium/tecido-osseo/estudo","/atlas-premium/anatomia-aplicada/estudo"];
     const summaries=["4 vistas HD, zoom, pontos clicáveis e desafio inicial","4 vistas ilustradas, estudo das 5 regiões e desafio explicado","4 cenas ilustradas, 6 marcadores anatômicos e questões comentadas","4 ilustrações frontais, 6 estruturas interativas e desafio explicado","4 imagens HD, 6 estruturas clicáveis e desafio comentado","4 vistas, 6 articulações explicadas e desafio comentado","4 cenas HD, microarquitetura óssea e 6 questões comentadas","4 cenas clínicas didáticas, marcadores e 6 questões comentadas"];
     const muscularPaths=["cabeca-pescoco","torax-abdomen","costas","membros-superiores","membros-inferiores","tendoes-fascias","contracao","biomecanica"];
     const muscularReadyCount=muscular?muscularLabs[muscularPaths[i]]?.scenes.filter(s=>s.ready).length??0:0;
     const muscularComplete=muscularReadyCount===4;
     return ready?<Link href={muscular?"/atlas-premium/muscular/"+muscularPaths[i]+"/estudo":paths[i]} key={topic} className={styles.topicCard}><span className={styles.topicNumber}>{String(i+1).padStart(2,"0")}</span><strong>{topic}</strong><small>{muscular?(muscularComplete?"4 vistas anatômicas, marcadores e 6 questões comentadas":muscularReadyCount>0?muscularReadyCount+"/4 imagens integradas · 6 questões comentadas":"4 cenas de estudo e 6 questões · imagens em preparação"):summaries[i]}</small><span className={styles.topicReady}>{muscular&&!muscularComplete?"Abrir prévia de estudo ↗":"Abrir laboratório ↗"}</span></Link>
       :<div key={topic} className={styles.topicCard+" "+styles.topicPending}><span className={styles.topicNumber}>{String(i+1).padStart(2,"0")}</span><strong>{topic}</strong><small>Conteúdo anatômico em preparação</small><span className={styles.topicUnavailable}>Em desenvolvimento</span></div>;
    })}</div>
    <div className={styles.returnLink}><Link href="/atlas-premium">← Escolher outro sistema anatômico</Link></div>
   </section>}

   {mode==="lab"&&<section className={styles.labPage}>
    <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Crânio e face</span></nav>
    <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO</span><h1>Crânio humano</h1><p>Quatro vistas em alta definição com marcadores e zoom. Imagens geradas por IA, pendentes de revisão anatômica. Modelo 3D real em preparação.</p></div><span className={styles.chip}>Demonstração</span></div>
    <div className={styles.labGrid}><div className={styles.viewer}><div className={styles.tabs} role="group" aria-label="Selecionar vista">{atlasViews.map(item=><button key={item.id} type="button" className={view===item.id?styles.tabActive:""} onClick={()=>changeView(item.id)}>{item.label}</button>)}</div><SkullDiagram view={view} select={setActive} active={active} unlocked={gate.hasAccess}/><div className={styles.diagramNote}>Toque nos marcadores para identificar estruturas. A prévia é limitada até a compra do complemento.</div></div>
     <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span>{lessonDescription(selectedPoint,gate.hasAccess)}<div className={styles.divider}/><strong>Desafio rápido</strong><p>Qual osso participa da formação da testa?</p><div className={styles.quiz}>{["Frontal","Temporal","Occipital"].map(answer=><button type="button" key={answer} onClick={()=>setQuiz(answer)}>{answer}</button>)}</div>{quiz&&<div className={styles.answer} role="status">{quiz==="Frontal"?"✓ Correto! O frontal forma a região da testa.":"Ainda não. O osso frontal constitui a testa; tente novamente."}</div>}<div className={styles.divider}/><span className={styles.muted}>Material educativo, não diagnóstico. Imagens geradas por IA: detalhes e marcadores precisam de validação técnica.</span></aside></div>
    <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
   </section>}

   <footer className={styles.footer}>Atlas Premium Eduverso · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
  </div>
 </main>;
}
