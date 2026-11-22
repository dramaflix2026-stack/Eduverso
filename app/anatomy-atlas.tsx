"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {bones,imageUrl,sourceUrl,type Bone} from "./anatomy-atlas-data";
import styles from "./anatomy-atlas.module.css";
import studyStyles from "./anatomy-atlas-collection.module.css";
import {studySections,studySummary,reviewPrompt} from "./anatomy-atlas-flash-content";
import type {AtlasView} from "./anatomy-atlas-collection-data";
const anteriorView={id:"anterior"} as AtlasView;
type Mode="explorar"|"desafio"|"flashcards";
type Score={hits:number;misses:number;ms:number;remembered:number;forgotten:number;level:number;due:string|null};
type RecordMap=Record<string,Score>;
const key="eduverso:atlas:esqueleto:v1";
const empty=():Score=>({hits:0,misses:0,ms:0,remembered:0,forgotten:0,level:0,due:null});
function getSaved():RecordMap{
 try{
  const obj=JSON.parse(window.localStorage.getItem(key)||"{}");
  if(!obj||typeof obj!=="object"||Array.isArray(obj))return {};
  const out:RecordMap={};
  for(const b of bones){
   const v=obj[b.id];if(!v||typeof v!=="object")continue;
   const num=(k:string)=>typeof v[k]==="number"&&Number.isFinite(v[k])?Math.max(0,v[k]):0;
   out[b.id]={hits:num("hits"),misses:num("misses"),ms:num("ms"),remembered:num("remembered"),forgotten:num("forgotten"),level:Math.min(3,num("level")),due:num("hits")===0&&num("misses")>0&&num("remembered")===0?null:(typeof v.due==="string"?v.due:null)};
  }
  return out;
 }catch{return {};}
}
const nextReview=(days:number)=>new Date(Date.now()+days*86400000).toISOString();
// Comparação estrita, ignorando apenas acentos, pontuação, artigos e apelidos anatômicos conhecidos.
const normalizeAnswer=(text:string)=>text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim().replace(/^(o|a|os|as)\s+/,"");
const acceptedNames:Record<string,string[]>={
 cranio:["cranio"],
 mandibula:["mandibula","maxilar inferior"],
 clavicula:["clavicula"],
 esterno:["esterno"],
 costelas:["costelas","costela"],
 umero:["umero"],
 coluna:["coluna vertebral","coluna","espinha dorsal"],
 pelve:["osso do quadril","osso coxal","coxal"],
 radio:["radio"],
 femur:["femur"],
 patela:["patela","rotula"],
 tibia:["tibia"]
};
function isCorrectName(bone:Bone,answer:string){
 const value=normalizeAnswer(answer);
 return [bone.name,...(acceptedNames[bone.id]??[])].some(name=>normalizeAnswer(name)===value);
}
export default function AnatomyAtlas(){
 const [mode,setMode]=useState<Mode>("explorar");
 const [picked,setPicked]=useState<string|null>(null);
 const [scores,setScores]=useState<RecordMap>({});
 const [loaded,setLoaded]=useState(false);
 const [imageOk,setImageOk]=useState(true);
 const [q,setQ]=useState(0);
 const [answer,setAnswer]=useState<string|null>(null);
 const [sessionHits,setSessionHits]=useState(0);
 const [completed,setCompleted]=useState(false);
 const [f,setF]=useState(0);
 const [typed,setTyped]=useState("");
 const [submitted,setSubmitted]=useState(false);
 const [typedCorrect,setTypedCorrect]=useState(false);
 const [flashRated,setFlashRated]=useState(false);
 const exploreDetailRef=useRef<HTMLDivElement>(null);
 const started=useRef(Date.now());
 useEffect(()=>{setScores(getSaved());setLoaded(true);},[]);
 useEffect(()=>{if(loaded)try{localStorage.setItem(key,JSON.stringify(scores));}catch{}},[scores,loaded]);
 useEffect(()=>{
  if(mode==="explorar"&&picked)exploreDetailRef.current?.scrollIntoView({behavior:"smooth",block:"start"});
 },[mode,picked]);
 const metrics=useMemo(()=>{
  const v=Object.values(scores),hits=v.reduce((a,b)=>a+b.hits,0),misses=v.reduce((a,b)=>a+b.misses,0),n=hits+misses;
  const total=v.reduce((a,b)=>a+b.ms,0);
  const due=bones.filter(b=>!scores[b.id]?.due||Date.parse(scores[b.id].due||"")<=Date.now()).length;
  return {accuracy:n?Math.round(hits*100/n):0,attempts:n,average:n?Math.round(total/n/1000):0,due};
 },[scores]);
 const target=bones[q],flash=bones[f],selected=bones.find(b=>b.id===picked);
 function show(next:Mode){
  setMode(next);setPicked(null);setTyped("");setSubmitted(false);setTypedCorrect(false);setFlashRated(false);setAnswer(null);started.current=Date.now();
  if(next==="desafio"){setQ(0);setSessionHits(0);setCompleted(false);}
 }
 function selectBone(b:Bone){
  if(mode==="explorar"){setPicked(b.id);return;}
  if(mode!=="desafio"||answer!==null||completed||!imageOk)return;
  const correct=b.id===target.id;
  setAnswer(b.id);if(correct)setSessionHits(v=>v+1);
  const ms=Math.max(0,Math.min(600000,Date.now()-started.current));
  setScores(prev=>{const old=prev[target.id]||empty();return {...prev,[target.id]:{...old,hits:old.hits+(correct?1:0),misses:old.misses+(correct?0:1),ms:old.ms+ms,due:correct?nextReview(1):new Date().toISOString()}};});
 }
 function nextQuestion(){if(q===bones.length-1){setCompleted(true);}else{setQ(v=>v+1);setAnswer(null);started.current=Date.now();}}
 function checkFlash(){
  if(submitted||!typed.trim())return;
  const correct=isCorrectName(flash,typed);
  setTypedCorrect(correct);setSubmitted(true);setFlashRated(true);
  setScores(prev=>{
   const old=prev[flash.id]||empty();
   const level=correct?Math.min(3,old.level+1):0;
   return {...prev,[flash.id]:{...old,level,remembered:old.remembered+(correct?1:0),forgotten:old.forgotten+(correct?0:1),due:correct?nextReview([1,7,30][level-1]):new Date().toISOString()}};
  });
 }
 function revealFlash(){if(submitted)return;setSubmitted(true);setFlashRated(false);}
 function rateFlash(correct:boolean){
  if(!submitted||flashRated)return;
  setTypedCorrect(correct);setFlashRated(true);
  setScores(prev=>{
   const old=prev[flash.id]||empty();
   const level=correct?Math.min(3,old.level+1):0;
   return {...prev,[flash.id]:{...old,level,remembered:old.remembered+(correct?1:0),forgotten:old.forgotten+(correct?0:1),due:correct?nextReview([1,7,30][level-1]):new Date().toISOString()}};
  });
 }
 function nextFlash(){
  if(!submitted||!flashRated)return;
  setF(v=>(v+1)%bones.length);setTyped("");setSubmitted(false);setTypedCorrect(false);setFlashRated(false);
 }
 return <section className={styles.atlas} aria-label="Atlas anatômico interativo">
  <header className={styles.hero}><span>✦ EDUVERSO · ATLAS INTERATIVO</span><h2>Sistema esquelético</h2><p>Estude por imagens, identifique estruturas e pratique a memorização. Esta experiência é independente das aulas e dos simulados.</p></header>
  <div className={styles.metrics}>
   <div><strong>{metrics.accuracy}%</strong><small>Acertos em {metrics.attempts} tentativas</small></div>
   <div><strong>{metrics.average}s</strong><small>Tempo médio para identificar</small></div>
   <div><strong>{metrics.due}</strong><small>Estruturas novas ou pendentes de revisão</small></div>
  </div>
  <div className={styles.tabs} role="group" aria-label="Modos de estudo">
   <button type="button" aria-pressed={mode==="explorar"} className={mode==="explorar"?styles.active:""} onClick={()=>show("explorar")}>🔎 Explorar</button>
   <button type="button" aria-pressed={mode==="desafio"} className={mode==="desafio"?styles.active:""} onClick={()=>show("desafio")}>🎯 Desafio</button>
   <button type="button" aria-pressed={mode==="flashcards"} className={mode==="flashcards"?styles.active:""} onClick={()=>show("flashcards")}>🧠 Flashcards</button>
  </div>
  <div className={styles.panel}>
   <div className={styles.title}><div><h3>{mode==="explorar"?"Explore os ossos":mode==="desafio"?"Identifique na imagem":"Memorização ativa"}</h3>
    <p>{mode==="explorar"?"Toque nos números para conhecer cada estrutura.":mode==="desafio"?"Encontre o osso solicitado tocando em um dos pontos.":"Observe o marcador amarelo, digite o nome do osso e confira seu resultado."}</p>
   </div><small>{mode==="explorar"?"12 estruturas":mode==="desafio"?(completed?"Concluído":q+1+" de 12"):f+1+" de 12"}</small></div>
   {mode==="desafio"&&<div className={styles.progress} role="progressbar" aria-label="Progresso do desafio" aria-valuemin={0} aria-valuemax={bones.length} aria-valuenow={completed?bones.length:q}><span style={{width:(100*(completed?bones.length:q)/bones.length)+"%"}}/></div>}
   {mode==="desafio"&&!completed&&<div className={styles.mobilePrompt}><small>QUESTÃO {q+1} DE {bones.length}</small><strong>Onde está {target.name}?</strong><p>Toque no número correspondente na imagem abaixo.</p></div>}
   {mode==="flashcards"&&<div className={styles.mobilePrompt}><small>FLASHCARD {f+1} DE {bones.length}</small><strong>Qual é o osso destacado em amarelo?</strong><p>Observe a imagem e depois escreva o nome no campo de resposta.</p></div>}
   <div className={styles.columns+" "+(mode==="explorar"?styles.exploreColumns:"")}>
    <div className={styles.imageArea}>
     {imageOk?<div className={styles.diagram}>
      <img src={imageUrl} width={500} height={1015} alt="Esqueleto humano em vista anterior e sem identificação de ossos" onError={()=>setImageOk(false)}/>
      {bones.map((b,i)=>{
       if(mode==="flashcards"&&flash.id!==b.id)return null;
       const style={left:b.x+"%",top:b.y+"%"};
       const hit=mode==="desafio"&&answer!==null&&b.id===target.id;
       const fail=mode==="desafio"&&answer===b.id&&b.id!==target.id;
       const selectedExplore=mode==="explorar"&&picked===b.id;
       const cls=styles.dot+" "+(mode==="flashcards"?styles.flashDot:hit?styles.hit:fail?styles.fail:selectedExplore?styles.selectedDot:styles.normalDot);
       return mode==="flashcards"?<span key={b.id} style={style} className={cls} aria-hidden="true">?</span>:
        <button key={b.id} type="button" className={cls} style={style} aria-label={mode==="explorar"?"Mostrar "+b.name:"Ponto "+(i+1)}
         aria-pressed={selectedExplore||Boolean(mode==="desafio"&&answer===b.id)} disabled={mode==="desafio"&&(answer!==null||completed)} onClick={()=>selectBone(b)}>{i+1}</button>;
      })}
     </div>:<div role="alert" className={styles.error}>Não foi possível carregar a imagem. Confira sua conexão ou <a href={sourceUrl} target="_blank" rel="noopener noreferrer">abra a imagem original</a>. O desafio fica indisponível sem a imagem.</div>}
     <small>Vista anterior · representação didática</small>
    </div>
    <div className={styles.sidebar} ref={exploreDetailRef}>
     {mode==="explorar"&&<div className={styles.card}>
      {selected?<><small>{selected.group} · GUIA DE ESTUDO</small><h4>{selected.name}</h4>{studySections(selected,anteriorView).map(section=><div className={studyStyles.studySection} key={section.title}><strong>{section.title}</strong><p>{section.text}</p></div>)}<div className={studyStyles.reviewPrompt}><strong>Pergunta de revisão</strong><p>{reviewPrompt(selected)}</p></div></>:<><h4>Selecione uma estrutura</h4><p>Toque em um ponto numerado para descobrir o nome e uma explicação sobre o osso.</p></>}
      <button type="button" className={styles.primary} onClick={()=>show("desafio")}>Praticar identificação →</button>
     </div>}
     {mode==="desafio"&&<div className={styles.card}>
      {!completed?<>{answer!==null?<div className={styles.feedback} role="status">
        <strong>{answer===target.id?"✓ Correto!":"↻ Ainda não. A resposta correta está destacada em verde."}</strong>
        <p><b>{target.name}:</b> {target.description}</p>
       </div>:<p className={styles.actionHint}>Selecione um dos pontos do esqueleto para liberar a próxima estrutura.</p>}
       <button type="button" className={styles.primary} disabled={answer===null} onClick={nextQuestion}>{q===bones.length-1?"Ver resultado":"Próxima estrutura →"}</button>
      </>:<><h4>Rodada concluída!</h4><p>Você acertou {sessionHits} de {bones.length} identificações nesta rodada.</p>
       <button type="button" className={styles.primary} onClick={()=>show("desafio")}>Refazer desafio</button><button type="button" className={styles.secondary} onClick={()=>show("flashcards")}>Revisar flashcards</button></>}
     </div>}
     {mode==="flashcards"&&<div className={styles.card+" "+styles.flashCard}>
      <small>{flash.group} · cartão {f+1} de {bones.length}</small>
      {!submitted?<><h4>Que osso está destacado?</h4><p>Observe o marcador amarelo e tente lembrar a estrutura.</p>
       <form className={styles.answerForm} onSubmit={e=>{e.preventDefault();if(typed.trim())checkFlash();else revealFlash();}}>
        <label htmlFor="atlas-typed-answer">Nome anatômico (opcional)</label>
        <input id="atlas-typed-answer" autoComplete="off" autoCapitalize="sentences" spellCheck={false} maxLength={80}
         value={typed} onChange={e=>setTyped(e.target.value)} disabled={submitted} placeholder="Digite ou revele a resposta"/>
        <p>Você pode digitar ou estudar diretamente o verso do cartão.</p>
        <button type="submit" className={styles.primary} >{typed.trim()?"Conferir e revelar":"Revelar resposta completa"}</button>
       </form></>:
       <div className={studyStyles.flashBack} role="region" aria-label={"Verso do cartão "+flash.name}>
        <div className={studyStyles.flashBackTitle}><span>RESPOSTA COMPLETA</span><h4>{flash.name}</h4><p>{studySummary(flash)}</p></div>
        {studySections(flash,anteriorView).map(section=><section className={studyStyles.studySection} key={section.title}><strong>{section.title}</strong><p>{section.text}</p></section>)}
        <div className={studyStyles.reviewPrompt}><strong>Pergunta de revisão</strong><p>{reviewPrompt(flash)}</p></div>
        {typed.trim()&&<p className={studyStyles.flashStatus}>{typedCorrect?"✓ Sua resposta está correta.":"↻ Compare sua resposta com o nome anatômico."}</p>}
        {!flashRated&&<div className={studyStyles.flashRate}>
         <p>Você se lembrou do conteúdo?</p>
         <button type="button" className={styles.secondary} onClick={()=>rateFlash(false)}>Preciso revisar</button>
         <button type="button" className={styles.primary} onClick={()=>rateFlash(true)}>Lembrei corretamente</button>
        </div>}
        {flashRated&&<button type="button" className={styles.primary} onClick={nextFlash}>Próximo cartão →</button>}
       </div>}
      <p>Acertos são agendados para revisão em 1, 7 e 30 dias; erros ficam pendentes neste navegador.</p>
     </div>}
    </div>
   </div>
  </div>
  <p className={styles.foot}>Progresso salvo apenas neste navegador e separado do histórico de aulas. Ilustração em domínio público: Mariana Ruiz Villarreal (LadyofHats), <a href={sourceUrl} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>. Conteúdo introdutório, não substitui atlas especializado ou aulas práticas.</p>
 </section>;
}
