"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import AnatomyAtlas from "./anatomy-atlas";
import AnatomySkullInteractive from "./anatomy-skull-interactive";
import {skullViews,skullViewIsValid} from "./anatomy-skull-views";
import {spineViews,spineViewIsValid} from "./anatomy-spine-views";
import {thoraxViews,thoraxViewIsValid} from "./anatomy-thorax-views";
import {upperLimbViews,upperLimbViewIsValid} from "./anatomy-upper-limb-views";
import {lowerLimbViews,lowerLimbViewIsValid} from "./anatomy-lower-limb-views";
import {pelvisViews,pelvisViewIsValid} from "./anatomy-pelvis-views";
import {footViews,footViewIsValid} from "./anatomy-foot-views";
import {bones,imageUrl} from "./anatomy-atlas-data";
import {atlasViews,type AtlasSpot,type AtlasView} from "./anatomy-atlas-collection-data";
import {expandedAtlasViews} from "./anatomy-atlas-extension";
import AtlasArt,{atlasFamily} from "./anatomy-atlas-art";
import {studySections,studySummary,reviewPrompt} from "./anatomy-atlas-flash-content";
import styles from "./anatomy-atlas-collection.module.css";

type Mode="explorar"|"desafio"|"flashcards";
type RecordScore={right:number;wrong:number;due:string|null};
type Progress=Record<string,RecordScore>;
const keyFor=(id:string)=>"eduverso:atlas:vistas:"+(id==="cranio-frontal"?"cranio":id==="coluna-completa"?"coluna":id==="torax-anterior"?"torax":id==="pelve-anterior"?"pelve":id==="pe-dorsal"?"pe":id)+":v1";
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
function shuffleQuestions(count:number){
 const order=Array.from({length:count},(_,i)=>i);
 for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 return order;
}
function AtlasStudy({view}:{view:AtlasView}){
 const [mode,setMode]=useState<Mode>("explorar");
 const [picked,setPicked]=useState<string|null>(null);
 const [scores,setScores]=useState<Progress>({});
 const [ready,setReady]=useState(false);
 const [imageFallback,setImageFallback]=useState(false);
 const [imageFailed,setImageFailed]=useState(false);
 const [q,setQ]=useState(0);
 const [questionOrder,setQuestionOrder]=useState<number[]>([]);
 const [answer,setAnswer]=useState<string|null>(null);
 const [hits,setHits]=useState(0);
 const [completed,setCompleted]=useState(false);
 const [f,setF]=useState(0);
 const [typed,setTyped]=useState("");
 const [submitted,setSubmitted]=useState(false);
 const [flashCorrect,setFlashCorrect]=useState(false);
 const [flashRated,setFlashRated]=useState(false);
 const detail=useRef<HTMLDivElement>(null);
 const items=view.spots;
 const listMode=view.spotMode==="list";
 const skullMode=skullViewIsValid(view.id)||spineViewIsValid(view.id)||thoraxViewIsValid(view.id)||upperLimbViewIsValid(view.id)||lowerLimbViewIsValid(view.id)||pelvisViewIsValid(view.id)||footViewIsValid(view.id);
 const localizedMode=listMode;
 useEffect(()=>{setScores(restore(view.id));setReady(true);},[view.id]);
 useEffect(()=>{if(ready)try{localStorage.setItem(keyFor(view.id),JSON.stringify(scores));}catch{}},[ready,scores,view.id]);
 useEffect(()=>{
  if(mode==="explorar"&&picked)detail.current?.scrollIntoView({behavior:"smooth",block:"nearest"});
 },[picked,mode]);
 const stats=useMemo(()=>{
  const v=Object.values(scores),right=v.reduce((n,s)=>n+s.right,0),wrong=v.reduce((n,s)=>n+s.wrong,0);
  return {right,attempts:right+wrong,due:items.filter(b=>!scores[b.id]?.due||Date.parse(scores[b.id].due||"")<=Date.now()).length};
 },[scores,items]);
 const selected=items.find(b=>b.id===picked),target=items[questionOrder[q]??q],flash=items[f];
 const quizChoices=target?(()=>{const others=items.filter(v=>v.id!==target.id),pool=[target,...[0,2,4].map((step)=>others[(q*3+step)%others.length])];const offset=q%pool.length;return [...pool.slice(offset),...pool.slice(0,offset)];})():[];
 const fallbackUrl=view.fallbackImage||view.source.replace("/wiki/File:","/wiki/Special:FilePath/");
 function selectMode(next:Mode){
  setMode(next);setPicked(null);setAnswer(null);setTyped("");setSubmitted(false);setFlashRated(false);
  if(next==="desafio"){setQuestionOrder(shuffleQuestions(items.length));setQ(0);setHits(0);setCompleted(false);}
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
  if(mode!=="desafio"||answer!==null||completed||!target||(!localizedMode&&imageFailed))return;
  const correct=b.id===target.id;
  setAnswer(b.id);if(correct)setHits(n=>n+1);saveResult(target,correct);
 }
 function advance(){
  if(q===items.length-1){setCompleted(true);return;}
  setQ(v=>v+1);setAnswer(null);
 }
 function submitFlash(){
  if(submitted||(!localizedMode&&imageFailed)||!flash)return;
  const hasGuess=Boolean(typed.trim());
  const correct=hasGuess&&matches(flash,typed);
  setFlashCorrect(correct);setSubmitted(true);
  if(hasGuess){saveResult(flash,correct);setFlashRated(true);}
 }
 function rateFlash(correct:boolean){
  if(!submitted||flashRated||!flash)return;
  saveResult(flash,correct);setFlashCorrect(correct);setFlashRated(true);
 }
 function advanceFlash(){
  if(!submitted||!flashRated)return;
  setF(v=>(v+1)%items.length);setTyped("");setSubmitted(false);setFlashCorrect(false);setFlashRated(false);
 }
 return <div className={styles.study+(skullMode?" "+styles.skullStudy:"")}>
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
   <small>QUESTÃO {q+1} DE {items.length}</small><strong>{localizedMode?"Qual estrutura corresponde à descrição?":"Encontre: "+target.name}</strong>
   <p>{localizedMode?target.description:skullMode?"Toque no marcador correspondente à estrutura solicitada.":"Toque no ponto numerado que corresponde à estrutura solicitada."}</p>
   <div className={styles.progress} role="progressbar" aria-label="Progresso do desafio" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={q}><span style={{width:(q/items.length*100)+"%"}}/></div>
  </div>}
  {mode==="flashcards"&&flash&&<div className={styles.question}>
   <small>CARTÃO {f+1} DE {items.length}</small>
   <strong>{localizedMode?"Identifique a estrutura descrita:":"Que estrutura está marcada em amarelo?"}</strong>
   <p>{localizedMode?flash.description:skullMode?"Observe o marcador amarelo e digite o nome da estrutura antes de revelar a resposta.":"Observe a imagem e escreva o nome sem consultar a resposta."}</p>
  </div>}
  <div className={styles.studyColumns}>
   <figure className={styles.figure}>
    {skullMode?<AnatomySkullInteractive mode={mode} spots={items} selectedId={picked}
      targetId={mode==="flashcards"?flash?.id??null:mode==="desafio"?target?.id??null:null}
      answerId={mode==="desafio"?answer:null}
      disabled={mode==="desafio"&&(completed||answer!==null)} onSelect={clickPoint}
      src={view.image} alt={view.alt} heading={view.short} subject={spineViewIsValid(view.id)?"Coluna":thoraxViewIsValid(view.id)?"Tórax":upperLimbViewIsValid(view.id)?"Membro Superior":lowerLimbViewIsValid(view.id)?"Membro Inferior":pelvisViewIsValid(view.id)?"Pelve":footViewIsValid(view.id)?"Pé":"Crânio"} ratio={view.ratio} imageCrop={view.imageCrop}/>:
      imageFailed?<div className={styles.failure} role="alert">
       Não foi possível carregar a ilustração anatômica. <a href={view.source} target="_blank" rel="noreferrer noopener">Abrir a imagem original</a>.
      </div>
    :<div className={styles.diagram} style={{aspectRatio:view.ratio,background:"#f6f3fa"}}>
      <img alt={view.alt} src={imageFallback?fallbackUrl:view.image} loading="eager"
        style={listMode?{objectFit:"contain"}:undefined}
        onError={()=>{if(imageFallback)setImageFailed(true);else setImageFallback(true);}}/>
      {!listMode&&items.map((b,i)=>{
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
    <figcaption>{skullMode?"Ilustração anatômica com marcadores interativos · selecione os pontos para estudar.":listMode?
      "Ilustração anatômica detalhada · consulte as estruturas abaixo com nomenclatura em português.":
      "Ilustração anatômica detalhada · toque nos marcadores para consultar os nomes em português."}
    </figcaption>
   </figure>
   <div className={styles.details} ref={detail}>
    {listMode&&mode==="explorar"&&<div className={styles.structureList} aria-label="Legenda anatômica em português">
      <h4 className={styles.legendTitle}>Estruturas da imagem — português (Brasil)</h4>
      {items.map((b,i)=><button type="button" key={b.id}
       className={picked===b.id?styles.structureActive:""} aria-pressed={picked===b.id}
       onClick={()=>clickPoint(b)}><span>{String(i+1).padStart(2,"0")}</span>{b.name}</button>)}
     </div>}
    {!listMode&&!skullMode&&mode==="explorar"&&<details className={styles.auxLegend}>
     <summary>Ver lista de estruturas em português</summary>
     <div className={styles.structureList}>
      {items.map((b,i)=><button key={b.id} type="button" className={picked===b.id?styles.structureActive:""} aria-pressed={picked===b.id} onClick={()=>clickPoint(b)}><span>{String(i+1).padStart(2,"0")}</span>{b.name}</button>)}
     </div>
    </details>}
    {localizedMode&&mode==="desafio"&&answer===null&&!completed&&<div className={styles.quizList} role="group" aria-label="Alternativas do desafio">{quizChoices.map((b,i)=><button type="button" key={b.id} onClick={()=>clickPoint(b)}><b>{String.fromCharCode(65+i)})</b> {b.name}</button>)}</div>}
    {mode==="explorar"&&<article className={styles.detailCard}>
     {selected?<><small>{selected.group} · GUIA ANATÔMICO</small><h4>{selected.name}</h4>
       {studySections(selected,view).map(block=><div className={styles.studySection} key={block.title}><strong>{block.title}</strong><p>{block.text}</p></div>)}
       <div className={styles.reviewPrompt}><strong>Pergunta de revisão</strong><p>{reviewPrompt(selected)}</p></div>
      </>:<><h4>{localizedMode?"Escolha uma estrutura":skullMode?"Selecione um ponto":"Selecione um ponto"}</h4><p>{localizedMode?"Toque em uma das estruturas em português para estudar o que é, a função, a aplicação clínica e revisar o assunto.":skullMode?"Toque nos pontos numerados da imagem para abrir o nome, a função e a explicação clínica da estrutura.":"Toque nos marcadores numerados para explorar cada estrutura, entender sua função e conhecer uma correlação clínica."}</p></>}
     <button type="button" className={styles.primary} onClick={()=>selectMode("desafio")}>Praticar identificação →</button>
    </article>}
    {mode==="desafio"&&<article className={styles.detailCard}>
     {!completed?<>{answer===null?<p>{localizedMode?"Escolha uma das alternativas para conferir a resposta.":skullMode?"Selecione o ponto correspondente à estrutura solicitada para conferir sua resposta.":"Escolha um marcador na ilustração para conferir a resposta."}</p>:
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
    {mode==="flashcards"&&flash&&<article className={styles.detailCard+" "+styles.fullFlashcard}>
     <div className={styles.flashTopline}><small>{flash.group.toUpperCase()} · CARTÃO {f+1} DE {items.length}</small><span>REVISÃO ATIVA</span></div>
     {!submitted?<div className={styles.flashFront}>
       <span className={styles.flashQuestionIcon} aria-hidden="true">?</span>
       <h4>Você consegue identificar a estrutura?</h4>
       <p>{localizedMode?flash.description:skullMode?"Observe o ponto amarelo e tente lembrar o nome da estrutura.":"Observe o marcador amarelo e recorde a estrutura destacada."}</p>
       <form className={styles.answerForm} onSubmit={e=>{e.preventDefault();submitFlash();}}>
        <label htmlFor={"atlas-answer-"+view.id}>Sua resposta (opcional)</label>
        <input id={"atlas-answer-"+view.id} value={typed} onChange={e=>setTyped(e.target.value)}
         maxLength={100} autoComplete="off" spellCheck={false} placeholder="Digite o nome anatômico"/>
        <p>Você também pode revelar a resposta e avaliar sua memorização.</p>
        <button type="submit" className={styles.primary}>{typed.trim()?"Conferir e revelar a resposta":"Revelar resposta completa"}</button>
       </form>
      </div>:
      <div className={styles.flashBack} role="region" aria-label={"Verso do cartão "+flash.name}>
       <div className={styles.flashBackTitle}><span>RESPOSTA · {String(f+1).padStart(2,"0")}</span><h4>{flash.name}</h4><p>{studySummary(flash)}</p></div>
       {studySections(flash,view).map(block=><section className={styles.studySection} key={block.title}><strong>{block.title}</strong><p>{block.text}</p></section>)}
       <div className={styles.reviewPrompt}><strong>Teste de fixação</strong><p>{reviewPrompt(flash)}</p></div>
       {typed.trim()&&<p className={styles.flashStatus}>{flashCorrect?"✓ Você identificou corretamente a estrutura.":"↻ A resposta digitada não corresponde ao nome registrado. Revise a explicação."}</p>}
       {!flashRated&&<div className={styles.flashRate}>
        <p>Como foi sua recordação?</p>
        <button type="button" className={styles.secondary} onClick={()=>rateFlash(false)}>Preciso revisar</button>
        <button type="button" className={styles.primary} onClick={()=>rateFlash(true)}>Lembrei corretamente</button>
       </div>}
       {flashRated&&<button type="button" className={styles.primary} onClick={advanceFlash}>Próximo flashcard →</button>}
      </div>}
    </article>}
   </div>
  </div>
  <p className={styles.credit}>{view.credit}. <a href={view.source} target="_blank" rel="noopener noreferrer">Consultar a fonte da imagem</a>{view.credit.includes("CC BY 4.0")&&<> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">Licença CC BY 4.0</a></>}{view.credit.includes("CC BY-SA 2.1 JP")&&<> · <a href="https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en" target="_blank" rel="noopener noreferrer">Licença CC BY-SA 2.1 JP</a></>}. Os nomes anatômicos, as legendas interativas e as explicações do Eduverso estão em português. Algumas imagens de referência preservadas podem conter legendas impressas em inglês. Material didático introdutório; não substitui formação ou prática supervisionada. Progresso salvo neste navegador.</p>
 </div>;
}
type AtlasSelection="anterior"|AtlasView["id"]|null;
type Category="ossos"|"muscular"|"neuro"|"cardio"|"orgaos"|"outros";
const atlasCoverNames:Record<Category,string>={
 ossos:"sistema-esqueletico.webp",
 muscular:"musculos-movimento.webp",
 neuro:"neuroanatomia.webp",
 cardio:"cardiovascular-respiratorio.webp",
 orgaos:"orgaos-sistemas-internos.webp",
 outros:"sentidos-outros-sistemas.webp"
};

function AtlasCategoryCover({family,title}:{family:Category;title:string}){
 const [missing,setMissing]=useState(false);
 if(missing)return <AtlasArt family={family} id={"capa-"+family} title={title}/>;
 return <img className={styles.atlasCoverImage}
  src={"/images/anatomia/capas/"+atlasCoverNames[family]}
  alt={"Capa ilustrativa — "+title}
  loading="lazy"
  onError={()=>setMissing(true)}/>;
}

const groupCatalog:{id:Category;title:string;description:string;icon:string;cover:string;ids:string[]}[]=[
 {id:"ossos",title:"Sistema esquelético",description:"Esqueleto, crânio, coluna, tórax, pelve e membros. Osteologia por regiões.",icon:"🦴",
  cover:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Human_skeleton_front_no-text_no-color.svg/500px-Human_skeleton_front_no-text_no-color.svg.png",
  ids:["anterior","posterior","cranio","coluna","torax","membro-superior","pelve","membro-inferior","pe"]},
 {id:"muscular",title:"Músculos e movimento",description:"Musculatura anterior e posterior, face, pescoço e membros.",icon:"💪",
  cover:expandedAtlasViews.find(v=>v.id==="musculos-anterior")?.image||"",
  ids:["musculos-anterior","musculos-posterior","musculos-face","musculos-superiores","musculos-inferiores"]},
 {id:"neuro",title:"Neuroanatomia",description:"Encéfalo, medula espinal e sistema nervoso periférico.",icon:"🧠",
  cover:expandedAtlasViews.find(v=>v.id==="cerebro")?.image||"",
  ids:["cerebro","medula-espinal","nervos-perifericos"]},
 {id:"cardio",title:"Cardiovascular e respiratório",description:"Coração, circulação, pulmões e vias respiratórias.",icon:"🫀",
  cover:expandedAtlasViews.find(v=>v.id==="coracao")?.image||"",
  ids:["coracao","vasos-sanguineos","pulmoes"]},
 {id:"orgaos",title:"Órgãos e sistemas internos",description:"Aparelho digestório, fígado, pâncreas, rins e sistemas reprodutores.",icon:"🫁",
  cover:expandedAtlasViews.find(v=>v.id==="sistema-digestorio")?.image||"",
  ids:["sistema-digestorio","figado-pancreas","sistema-urinario","reprodutor-feminino","reprodutor-masculino"]},
 {id:"outros",title:"Sentidos e outros sistemas",description:"Endócrino, olho, ouvido, pele e sistema linfático.",icon:"👁️",
  cover:expandedAtlasViews.find(v=>v.id==="olho")?.image||"",
  ids:["endocrino","olho","ouvido","pele","linfatico"]}
];
const allViews:AtlasView[]=[...atlasViews,...expandedAtlasViews,...skullViews,...spineViews,...thoraxViews,...upperLimbViews,...lowerLimbViews,...pelvisViews,...footViews];
const groupParentIds=["cranio","coluna","torax","membro-superior","membro-inferior","pelve","pe"];
const fullCount=bones.length+allViews.filter(v=>!groupParentIds.includes(v.id)).reduce((n,v)=>n+v.spots.length,0);
const interactiveAtlasCount=1+allViews.filter(v=>!groupParentIds.includes(v.id)).length; // vista anterior + atlas regionais, sem contar cards que apenas abrem subcards
function categoryOf(id:AtlasSelection):Category|null{
 if(skullViewIsValid(id)||spineViewIsValid(id)||thoraxViewIsValid(id)||upperLimbViewIsValid(id)||lowerLimbViewIsValid(id)||pelvisViewIsValid(id)||footViewIsValid(id))return "ossos";
 return groupCatalog.find(g=>id!==null&&g.ids.includes(id))?.id??null;
}
function fromLocation():{view:AtlasSelection;category:Category|null}{
 const params=new URLSearchParams(window.location.search);
 const raw=params.get("atlasVista");
 const view:AtlasSelection=raw==="anterior"?"anterior":allViews.find(v=>v.id===raw)?.id??null;
 const category=categoryOf(view)??groupCatalog.find(g=>g.id===params.get("atlasCategoria"))?.id??null;
 return {view,category};
}
export default function AnatomyAtlasCollection(){
 const [selected,setSelected]=useState<AtlasSelection>(null);
 const [category,setCategory]=useState<Category|null>(null);
 const [term,setTerm]=useState("");
 useEffect(()=>{
  const restoreView=()=>{const data=fromLocation();setSelected(data.view);setCategory(data.category);};
  restoreView();window.addEventListener("popstate",restoreView);
  return()=>window.removeEventListener("popstate",restoreView);
 },[]);
 function navigate(view:AtlasSelection,group:Category|null){
  const url=new URL(window.location.href);
  if(view)url.searchParams.set("atlasVista",view);else url.searchParams.delete("atlasVista");
  if(group)url.searchParams.set("atlasCategoria",group);else url.searchParams.delete("atlasCategoria");
  url.searchParams.set("atlas","1");url.searchParams.set("disciplina","Medicina");url.searchParams.set("area","faculdade");
  window.history.pushState({},"",url.pathname+url.search+url.hash);
  setSelected(view);setCategory(group);setTerm("");
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function openView(view:AtlasSelection){navigate(view,categoryOf(view));}
 function openCategory(group:Category|null){navigate(null,group);}
 const group=groupCatalog.find(g=>g.id===category);
 const visibleIds=group?group.ids:[];
 const searchResults=term.trim()?allViews.filter(v=>(v.short+" "+v.title+" "+v.subtitle+" "+v.spots.map(p=>p.name).join(" ")).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(term.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim())):[];
 const shown=term.trim()?searchResults:allViews.filter(v=>visibleIds.includes(v.id));
 const active=allViews.find(v=>v.id===selected);
 const subGroup=selected==="cranio"?{title:"Crânio",views:skullViews}:selected==="coluna"?{title:"Coluna",views:spineViews}:selected==="torax"?{title:"Tórax",views:thoraxViews}:selected==="membro-superior"?{title:"Membro Superior",views:upperLimbViews}:selected==="membro-inferior"?{title:"Membro Inferior",views:lowerLimbViews}:selected==="pelve"?{title:"Pelve",views:pelvisViews}:selected==="pe"?{title:"Pé",views:footViews}:null;
 const subParent=skullViewIsValid(selected)?"cranio":spineViewIsValid(selected)?"coluna":thoraxViewIsValid(selected)?"torax":upperLimbViewIsValid(selected)?"membro-superior":lowerLimbViewIsValid(selected)?"membro-inferior":pelvisViewIsValid(selected)?"pelve":footViewIsValid(selected)?"pe":null;
 return <section className={styles.collection} aria-label="Biblioteca de atlas de anatomia">
  <header className={styles.collectionHero}>
   <span>✦ EDUVERSO · ATLAS DE ANATOMIA</span>
   <h2>{selected?active?.short||"Vista anterior":group?group.title:"Atlas humano por segmentos"}<span>.</span></h2>
   <p>{subGroup?"Escolha uma das cinco imagens interativas de "+subGroup.title+". Cada vista tem estruturas, desafios e flashcards próprios.":selected?"Explore estruturas, funções e correlações clínicas por meio de imagens e atividades.":group?group.description:"Biblioteca de anatomia dividida em sistemas. Escolha uma categoria, explore seus atlas e estude com desafios ou flashcards."}</p>
   <div className={styles.heroStats}><span>{String(interactiveAtlasCount).padStart(2,"0")} atlas interativos</span><span>{fullCount} estruturas</span><span>{groupCatalog.length} segmentos</span><span>3 modos de estudo</span></div>
  </header>
  {selected?<button type="button" className={styles.return} onClick={()=>subParent?navigate(subParent,"ossos"):openCategory(categoryOf(selected))}>{subParent?"← Voltar às 5 vistas de "+(subParent==="cranio"?"Crânio":subParent==="coluna"?"Coluna":subParent==="torax"?"Tórax":subParent==="membro-superior"?"Membro Superior":subParent==="membro-inferior"?"Membro Inferior":subParent==="pelve"?"Pelve":"Pé"):"← Voltar aos atlas de "+(groupCatalog.find(g=>g.id===categoryOf(selected))?.title||"anatomia")}</button>:category?<button type="button" className={styles.return} onClick={()=>openCategory(null)}>← Todos os sistemas anatômicos</button>:null}
  {!selected&&<label className={styles.searchBox}><span aria-hidden="true">⌕</span><input type="search" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Buscar atlas, região ou estrutura..." aria-label="Buscar no atlas de anatomia"/></label>}
  {!selected&&!category&&!term.trim()&&<div className={styles.segmentGrid}>
    {groupCatalog.map(g=><button key={g.id} type="button" className={styles.segmentCard} onClick={()=>openCategory(g.id)}>
     <span className={styles.segmentPreview}><AtlasCategoryCover family={g.id} title={g.title}/></span>
     <span className={styles.segmentInfo}><span className={styles.segmentIcon} aria-hidden="true">{g.icon}</span><strong>{g.title}</strong><small>{g.description}</small><em>{g.ids.length} atlas · Explorar →</em></span>
    </button>)}
   </div>}
  {!selected&&(category||term.trim())&&<>
   <div className={styles.sectionLabel}><strong>{term.trim()?"Resultados da busca":group?.title}</strong><span>{shown.length+(visibleIds.includes("anterior")&&!term.trim()?1:0)} atlas</span></div>
   <div className={styles.cards}>
    {visibleIds.includes("anterior")&&!term.trim()&&<button type="button" className={styles.atlasCard} onClick={()=>openView("anterior")}>
      <span className={styles.cardMedia+" "+styles.scientificMedia}><img src={imageUrl} loading="lazy" alt="Ilustração colorida do esqueleto humano em vista anterior"/></span>
      <span className={styles.cardInfo}><small>ATLAS INTERATIVO</small><strong>Vista anterior</strong><span>{bones.length} estruturas · exploração e revisão</span><em>Explorar atlas →</em></span>
     </button>}
    {shown.map(v=><button key={v.id} type="button" className={styles.atlasCard} onClick={()=>openView(v.id)}>
      <span className={styles.cardMedia+" "+styles.scientificMedia}>
        <img src={v.image} loading="lazy" alt={v.alt}
          onError={event=>{const el=event.currentTarget;const original=v.fallbackImage;
            if(original&&el.getAttribute("data-fallback")!=="1"){el.setAttribute("data-fallback","1");el.src=original;}
            else{el.style.opacity="0";el.alt="Ilustração indisponível — "+v.short;}
          }}/>
      </span>
      <span className={styles.cardInfo}><small>{groupParentIds.includes(v.id)?"5 VISTAS INTERATIVAS":v.spotMode==="list"?"ATLAS DE SISTEMAS":"ATLAS REGIONAL"}</small><strong>{v.short}</strong><span>{groupParentIds.includes(v.id)?"5 imagens internas · Explorar, Desafio e Flashcards":v.spots.length+" estruturas · desafios e flashcards"}</span><em>{groupParentIds.includes(v.id)?"Ver as 5 vistas →":"Explorar atlas →"}</em></span>
     </button>)}
   </div>
   {!shown.length&&!visibleIds.includes("anterior")&&<p className={styles.noResults}>Nenhum atlas encontrado. Tente outra palavra ou volte aos sistemas anatômicos.</p>}
  </>}
  {subGroup&&<>
   <div className={styles.sectionLabel}><strong>Escolha a vista de {subGroup.title}</strong><span>5 imagens interativas</span></div>
   <div className={styles.skullSubGrid}>
    {subGroup.views.map((view,index)=><button type="button" key={view.id} className={styles.skullSubCard}
      onClick={()=>navigate(view.id,"ossos")} aria-label={"Abrir "+view.short+" de "+subGroup.title}>
      <span className={styles.skullSubImage}>{view.imageCrop?
       <span className={styles.skullCropThumb} style={{aspectRatio:`${view.imageCrop.width}/${view.imageCrop.height}`}}>
        <img src={view.image} alt={view.alt} loading="lazy" style={{position:"absolute",maxWidth:"none",objectFit:"fill",width:(10000/view.imageCrop.width)+"%",height:(10000/view.imageCrop.height)+"%",left:-(100*view.imageCrop.left/view.imageCrop.width)+"%",top:-(100*view.imageCrop.top/view.imageCrop.height)+"%"}} onError={event=>{event.currentTarget.style.opacity="0";}}/>
       </span>:
       <img src={view.image} alt={view.alt} loading="lazy" onError={event=>{event.currentTarget.style.opacity="0";}}/>}</span>
      <span className={styles.skullSubInfo}><small>{String(index+1).padStart(2,"0")} · ATLAS INTERATIVO</small>
       <strong>{view.short}</strong><span>{view.spots.length} estruturas · Explorar, Desafio e Flashcards</span><em>Estudar esta vista →</em></span>
     </button>)}
   </div>
   <p className={styles.skullIndexNote}>Cinco imagens anatômicas com marcadores e perguntas próprios. Os pontos estão em fase de validação didática.</p>
  </>}
  {selected==="anterior"&&<AnatomyAtlas/>}
  {selected!=="anterior"&&!subGroup&&active&&<AtlasStudy key={active.id} view={active}/>}
 </section>;
}
