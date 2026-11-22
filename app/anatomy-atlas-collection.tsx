"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import AnatomyAtlas from "./anatomy-atlas";
import {bones} from "./anatomy-atlas-data";
import {atlasViews,type AtlasSpot,type AtlasView} from "./anatomy-atlas-collection-data";
import styles from "./anatomy-atlas-collection.module.css";

type Mode="explorar"|"desafio"|"flashcards";
type RecordScore={right:number;wrong:number;due:string|null};
type Progress=Record<string,RecordScore>;
const keyFor=(id:string)=>"eduverso:atlas:vistas:"+id+":v1";
const normalize=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR")
 .replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim().replace(/^(o|a|os|as)\s+/,"");
function matches(spot:AtlasSpot,value:string){
 const answer=normalize(value);
 return Boolean(answer)&&[spot.name,...(spot.aliases??[])].some(a=>normalize(a)===answer);
}
function restore(id:string):Progress{
 try{
  const raw=JSON.parse(localStorage.getItem(keyFor(id))||"{}");
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};
  const next:Progress={};
  for(const [name,value] of Object.entries(raw)){
   const v=value as Partial<RecordScore>|null;
   if(!v||typeof v!=="object")continue;
   next[name]={right:Math.max(0,Number(v.right)||0),wrong:Math.max(0,Number(v.wrong)||0),due:typeof v.due==="string"?v.due:null};
  }
  return next;
 }catch{return {};}
}
function nextReview(days:number){return new Date(Date.now()+days*86400000).toISOString();}
function AtlasStudy({view}:{view:AtlasView}){
 const [mode,setMode]=useState<Mode>("explorar");
 const [picked,setPicked]=useState<string|null>(null);
 const [scores,setScores]=useState<Progress>({});
 const [ready,setReady]=useState(false);
 const [imageFallback,setImageFallback]=useState(false);
 const [imageFailed,setImageFailed]=useState(false);
 const [q,setQ]=useState(0);
 const [answer,setAnswer]=useState<string|null>(null);
 const [hits,setHits]=useState(0);
 const [completed,setCompleted]=useState(false);
 const [f,setF]=useState(0);
 const [typed,setTyped]=useState("");
 const [submitted,setSubmitted]=useState(false);
 const [flashCorrect,setFlashCorrect]=useState(false);
 const detail=useRef<HTMLDivElement>(null);
 const items=view.spots;
 useEffect(()=>{setScores(restore(view.id));setReady(true);},[view.id]);
 useEffect(()=>{if(ready)try{localStorage.setItem(keyFor(view.id),JSON.stringify(scores));}catch{}},[ready,scores,view.id]);
 useEffect(()=>{
  if(mode==="explorar"&&picked)detail.current?.scrollIntoView({behavior:"smooth",block:"nearest"});
 },[picked,mode]);
 const stats=useMemo(()=>{
  const v=Object.values(scores),right=v.reduce((n,s)=>n+s.right,0),wrong=v.reduce((n,s)=>n+s.wrong,0);
  return {right,attempts:right+wrong,due:items.filter(b=>!scores[b.id]?.due||Date.parse(scores[b.id].due||"")<=Date.now()).length};
 },[scores,items]);
 const selected=items.find(b=>b.id===picked),target=items[q],flash=items[f];
 const fallbackUrl=view.source.replace("/wiki/File:","/wiki/Special:FilePath/");
 function selectMode(next:Mode){
  setMode(next);setPicked(null);setAnswer(null);setTyped("");setSubmitted(false);
  if(next==="desafio"){setQ(0);setHits(0);setCompleted(false);}
  if(next==="flashcards")setF(0);
 }
 function saveResult(b:AtlasSpot,correct:boolean){
  setScores(prev=>{
   const old=prev[b.id]??{right:0,wrong:0,due:null};
   return {...prev,[b.id]:{
    right:old.right+(correct?1:0),wrong:old.wrong+(correct?0:1),
    due:correct?nextReview(1):new Date().toISOString()
   }};
  });
 }
 function clickPoint(b:AtlasSpot){
  if(mode==="explorar"){setPicked(b.id);return;}
  if(mode!=="desafio"||answer!==null||completed||!target||imageFailed)return;
  const correct=b.id===target.id;
  setAnswer(b.id);if(correct)setHits(n=>n+1);saveResult(target,correct);
 }
 function advance(){
  if(q===items.length-1){setCompleted(true);return;}
  setQ(v=>v+1);setAnswer(null);
 }
 function submitFlash(){
  if(!typed.trim()||submitted||imageFailed||!flash)return;
  const correct=matches(flash,typed);setFlashCorrect(correct);setSubmitted(true);saveResult(flash,correct);
 }
 function advanceFlash(){if(!submitted)return;setF(v=>(v+1)%items.length);setTyped("");setSubmitted(false);setFlashCorrect(false);}
 return <div className={styles.study}>
  <header className={styles.studyHeader}>
   <span>ATLAS INTERATIVO · {view.spots.length} ESTRUTURAS</span>
   <h3>{view.title}</h3>
   <p>{view.subtitle}</p>
  </header>
  <div className={styles.metrics}>
   <div><strong>{stats.attempts?Math.round(100*stats.right/stats.attempts):0}%</strong><small>Precisão nos exercícios</small></div>
   <div><strong>{stats.attempts}</strong><small>Respostas registradas</small></div>
   <div><strong>{stats.due}</strong><small>Pontos novos ou para revisar</small></div>
  </div>
  <div className={styles.modes} role="group" aria-label={"Modos do atlas "+view.short}>
   {([{id:"explorar",label:"🔎 Explorar"},{id:"desafio",label:"🎯 Desafio"},{id:"flashcards",label:"🧠 Flashcards"}] as const).map(m=>
    <button type="button" key={m.id} aria-pressed={mode===m.id} className={mode===m.id?styles.chosen:""} onClick={()=>selectMode(m.id)}>{m.label}</button>
   )}
  </div>
  {mode==="desafio"&&!completed&&target&&<div className={styles.question} role="status">
   <small>QUESTÃO {q+1} DE {items.length}</small><strong>Encontre: {target.name}</strong>
   <p>Toque no ponto numerado que corresponde à estrutura solicitada.</p>
   <div className={styles.progress} role="progressbar" aria-label="Progresso do desafio" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={q}><span style={{width:(q/items.length*100)+"%"}}/></div>
  </div>}
  {mode==="flashcards"&&flash&&<div className={styles.question}>
   <small>CARTÃO {f+1} DE {items.length}</small>
   <strong>Que estrutura está marcada em amarelo?</strong>
   <p>Observe a imagem e escreva o nome sem consultar a resposta.</p>
  </div>}
  <div className={styles.studyColumns}>
   <figure className={styles.figure}>
    {imageFailed?
     <div className={styles.failure} role="alert">
      Não foi possível carregar esta ilustração. <a href={view.source} target="_blank" rel="noreferrer noopener">Abrir fonte original</a>.
     </div>
    :<div className={styles.diagram} style={{aspectRatio:view.ratio}}>
      <img alt={view.alt} src={imageFallback?fallbackUrl:view.image} loading="eager"
        onError={()=>{if(imageFallback)setImageFailed(true);else setImageFallback(true);}}/>
      {items.map((b,i)=>{
       if(mode==="flashcards"&&flash?.id!==b.id)return null;
       const pos={left:b.x+"%",top:b.y+"%"};
       const correct=mode==="desafio"&&answer!==null&&b.id===target?.id;
       const wrong=mode==="desafio"&&answer===b.id&&b.id!==target?.id;
       const selectedExplore=mode==="explorar"&&picked===b.id;
       const cls=styles.pin+" "+(mode==="flashcards"?styles.pinFlash:correct?styles.pinCorrect:wrong?styles.pinWrong:selectedExplore?styles.pinSelected:styles.pinDefault);
       return mode==="flashcards"?<span key={b.id} className={cls} style={pos} aria-hidden="true">?</span>:
        <button type="button" key={b.id} className={cls} style={pos}
          aria-label={mode==="explorar"?"Mostrar "+b.name:"Ponto "+(i+1)}
          aria-pressed={selectedExplore||Boolean(mode==="desafio"&&answer===b.id)}
          disabled={mode==="desafio"&&(completed||answer!==null)}
          onClick={()=>clickPoint(b)}>{i+1}</button>;
      })}
     </div>}
    <figcaption>{view.alt.replace("Ilustração ","")} · representação didática</figcaption>
   </figure>
   <div className={styles.details} ref={detail}>
    {mode==="explorar"&&<article className={styles.detailCard}>
     {selected?<><small>{selected.group}</small><h4>{selected.name}</h4>
       <p>{selected.description}</p>
       <strong>Função anatômica</strong><p>{selected.function}</p>
       <strong>Correlação clínica</strong><p>{selected.clinical}</p>
      </>:<><h4>Selecione um ponto</h4><p>Toque nos marcadores numerados para explorar cada estrutura, entender sua função e conhecer uma correlação clínica.</p></>}
     <button type="button" className={styles.primary} onClick={()=>selectMode("desafio")}>Praticar identificação →</button>
    </article>}
    {mode==="desafio"&&<article className={styles.detailCard}>
     {!completed?<>{answer===null?<p>Escolha um marcador na ilustração para conferir a resposta.</p>:
       <div className={styles.feedback} role="status">
        <strong>{answer===target.id?"✓ Resposta correta!":"↻ Resposta diferente da esperada"}</strong>
        <p><b>{target.name}</b> — {target.description}</p>
        <p>{target.function}</p>
       </div>}
       <button type="button" className={styles.primary} disabled={answer===null} onClick={advance}>{q===items.length-1?"Concluir desafio":"Próxima estrutura →"}</button>
      </>:<><h4>Rodada concluída!</h4><p>Você acertou {hits} de {items.length} estruturas.</p>
       <button type="button" className={styles.primary} onClick={()=>selectMode("desafio")}>Refazer desafio</button>
       <button type="button" className={styles.secondary} onClick={()=>selectMode("flashcards")}>Revisar flashcards</button>
      </>}
    </article>}
    {mode==="flashcards"&&flash&&<article className={styles.detailCard}>
     <small>{flash.group} · cartão {f+1} de {items.length}</small>
     <form className={styles.answerForm} onSubmit={e=>{e.preventDefault();submitFlash();}}>
      <label htmlFor={"atlas-answer-"+view.id}>Nome anatômico</label>
      <input id={"atlas-answer-"+view.id} value={typed} onChange={e=>setTyped(e.target.value)}
       maxLength={100} disabled={submitted} autoComplete="off" spellCheck={false}
       placeholder="Digite o nome da estrutura"/>
      <p>A correção ignora acentos e maiúsculas.</p>
      {!submitted&&<button type="submit" disabled={!typed.trim()||imageFailed} className={styles.primary}>Conferir resposta</button>}
     </form>
     {submitted&&<div className={styles.feedback} role="status">
      <strong>{flashCorrect?"✓ Muito bem!":"↻ Revise esta estrutura"}</strong>
      <p>Resposta correta: <b>{flash.name}</b></p><p>{flash.description}</p>
     </div>}
     {submitted&&<button type="button" className={styles.primary} onClick={advanceFlash}>Próximo cartão →</button>}
    </article>}
   </div>
  </div>
  <p className={styles.credit}>{view.credit}. <a href={view.source} target="_blank" rel="noopener noreferrer">Consultar fonte da imagem</a>. Material didático introdutório; não substitui formação ou prática supervisionada. Progresso salvo neste navegador.</p>
 </div>;
}
type AtlasSelection="anterior"|AtlasView["id"]|null;
function fromLocation():AtlasSelection{
 const raw=new URLSearchParams(window.location.search).get("atlasVista");
 if(raw==="anterior")return raw;
 return atlasViews.find(v=>v.id===raw)?.id??null;
}
export default function AnatomyAtlasCollection(){
 const [selected,setSelected]=useState<AtlasSelection>(null);
 useEffect(()=>{
  const restoreView=()=>setSelected(fromLocation());
  restoreView();window.addEventListener("popstate",restoreView);
  return()=>window.removeEventListener("popstate",restoreView);
 },[]);
 function openView(view:AtlasSelection){
  const url=new URL(window.location.href);
  if(view)url.searchParams.set("atlasVista",view);else url.searchParams.delete("atlasVista");
  url.searchParams.set("atlas","1");url.searchParams.set("disciplina","Medicina");url.searchParams.set("area","faculdade");
  window.history.pushState({},"",url.pathname+url.search+url.hash);
  setSelected(view);window.scrollTo({top:0,behavior:"smooth"});
 }
 const active=atlasViews.find(v=>v.id===selected);
 return <section className={styles.collection} aria-label="Biblioteca de atlas de anatomia">
   <header className={styles.collectionHero}>
    <span>✦ EDUVERSO · ATLAS DE ANATOMIA</span>
    <h2>Explore o corpo humano por regiões<span>.</span></h2>
    <p>Seis atlas ósseos para estudar estruturas reais com pontos interativos, exercícios de identificação e flashcards. Selecione a região que deseja explorar.</p>
    <div className={styles.heroStats}><span>06 atlas disponíveis</span><span>{12+atlasViews.reduce((n,v)=>n+v.spots.length,0)} estruturas mapeadas</span><span>3 modos por atlas</span></div>
   </header>
   {selected&&<button type="button" className={styles.return} onClick={()=>openView(null)}>← Voltar à biblioteca de atlas</button>}
   {!selected?<div className={styles.cards}>
    <button type="button" className={styles.atlasCard} onClick={()=>openView("anterior")}>
     <span className={styles.cardMedia}><img alt="Esqueleto humano visto pela frente" loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Human_skeleton_front_no-text_no-color.svg/500px-Human_skeleton_front_no-text_no-color.svg.png"/></span>
     <span className={styles.cardInfo}><small>01 · ESQUELETO</small><strong>Vista anterior</strong><span>12 pontos anatômicos · corpo inteiro</span><em>Explorar atlas →</em></span>
    </button>
    {atlasViews.map((v,i)=><button key={v.id} type="button" className={styles.atlasCard} onClick={()=>openView(v.id)}>
      <span className={styles.cardMedia}><img alt={v.alt} loading="lazy" src={v.image}/></span>
      <span className={styles.cardInfo}><small>{String(i+2).padStart(2,"0")} · ATLAS ANATÔMICO</small><strong>{v.short}</strong><span>{v.spots.length} estruturas · exercícios e flashcards</span><em>Explorar atlas →</em></span>
     </button>)}
   </div>:selected==="anterior"?<AnatomyAtlas/>:active?<AtlasStudy key={active.id} view={active}/>:null}
 </section>;
}
