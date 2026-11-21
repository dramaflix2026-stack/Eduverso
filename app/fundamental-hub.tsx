"use client";
import {useEffect,useMemo,useState} from "react";
import {fundamentalLessons,subjectMetadata,type FundamentalGrade,type FundamentalSubjectId} from "./fundamental-curriculum";
import styles from "./fundamental-hub.module.css";

const grades=[1,2,3,4,5,6,7,8,9] as FundamentalGrade[];
type Stage="aula"|"exemplo"|"atividade"|"revisao";
type ProgressEntry={attempts:number;correct:number;completed:boolean};
type Progress=Record<string,ProgressEntry>;
const storageKey="eduverso:fundamental:progresso:v1";
function storageRead():Progress{
 try{
  const stored=JSON.parse(localStorage.getItem(storageKey)||"{}");
  if(!stored||typeof stored!=="object"||Array.isArray(stored))return {};
  const result:Progress={};
  for(const [key,value] of Object.entries(stored)){
   if(!/^[1-9]:[a-z-]+$/.test(key)||!value||typeof value!=="object")continue;
   const item=value as Record<string,unknown>;
   result[key]={attempts:typeof item.attempts==="number"&&Number.isFinite(item.attempts)?Math.max(0,item.attempts):0,
    correct:typeof item.correct==="number"&&Number.isFinite(item.correct)?Math.max(0,item.correct):0,
    completed:item.completed===true};
  }
  return result;
 }catch{return {};}
}
function readQuery(){
 if(typeof window==="undefined")return {year:1 as FundamentalGrade,subject:null as FundamentalSubjectId|null};
 const params=new URLSearchParams(window.location.search);
 const raw=Number(params.get("fundAno"));
 const year=grades.includes(raw as FundamentalGrade)?raw as FundamentalGrade:1;
 const desired=params.get("fundMateria");
 const subject=subjectMetadata.find(s=>s.id===desired&&(year>=6||s.id!=="ingles"))?.id??null;
 return {year,subject};
}
export default function FundamentalHub(){
 const [year,setYear]=useState<FundamentalGrade>(1);
 const [subject,setSubject]=useState<FundamentalSubjectId|null>(null);
 const [stage,setStage]=useState<Stage>("aula");
 const [answer,setAnswer]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [progress,setProgress]=useState<Progress>({});
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{
  const restore=()=>{const state=readQuery();setYear(state.year);setSubject(state.subject);setStage("aula");setAnswer(null);setChecked(false);};
  restore();setProgress(storageRead());setHydrated(true);
  window.addEventListener("popstate",restore);
  return()=>window.removeEventListener("popstate",restore);
 },[]);
 useEffect(()=>{if(hydrated)try{localStorage.setItem(storageKey,JSON.stringify(progress));}catch{}},[hydrated,progress]);
 const available=useMemo(()=>subjectMetadata.filter(s=>year>=6||s.id!=="ingles"),[year]);
 const lesson=subject?fundamentalLessons[year]?.[subject]:null;
 const metadata=subjectMetadata.find(s=>s.id===subject);
 const moduleKey=subject?year+":"+subject:"";
 const myProgress=progress[moduleKey]??{attempts:0,correct:0,completed:false};
 const completedAtYear=available.filter(s=>progress[year+":"+s.id]?.completed).length;
 function changeYear(value:FundamentalGrade){
  setYear(value);setSubject(null);setStage("aula");setAnswer(null);setChecked(false);
  const url=new URL(window.location.href);url.searchParams.set("fundAno",String(value));url.searchParams.delete("fundMateria");
  window.history.pushState({},"",url.pathname+url.search+url.hash);
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function openSubject(value:FundamentalSubjectId|null){
  setSubject(value);setStage("aula");setAnswer(null);setChecked(false);
  const url=new URL(window.location.href);
  if(value)url.searchParams.set("fundMateria",value);else url.searchParams.delete("fundMateria");
  url.searchParams.set("fundAno",String(year));
  window.history.pushState({},"",url.pathname+url.search+url.hash);
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function openStage(value:Stage){
  setStage(value);
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function verify(){
  if(!lesson||answer===null||checked)return;
  const correct=answer===lesson.correct;
  setChecked(true);
  setProgress(previous=>{
   const old=previous[moduleKey]??{attempts:0,correct:0,completed:false};
   return {...previous,[moduleKey]:{attempts:old.attempts+1,correct:old.correct+(correct?1:0),completed:old.completed||correct}};
  });
 }
 return <div className={styles.fundamental}>
  <header className={styles.hero}>
   <span className={styles.eyebrow}>✦ EDUVERSO · ESTUDOS ESCOLARES</span>
   <h1>Ensino <span>Fundamental.</span></h1>
   <p>Do 1º ao 9º ano: escolha sua turma, explore as matérias e estude com uma aula explicada, exemplo aplicado e atividade com correção.</p>
   <div className={styles.heroMeta}><span>9 anos escolares</span><span>76 aulas introdutórias</span><span>Progresso independente</span></div>
  </header>
  <div className={styles.yearPanel}>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>QUAL É O SEU ANO?</span><h2>Escolha seu ano escolar</h2></div></div>
   <div className={styles.yearGroups}>
    <section className={styles.group}><strong>Anos iniciais</strong><small>1º ao 5º ano</small><div className={styles.yearButtons}>{grades.filter(y=>y<=5).map(y=><button type="button" key={y} className={year===y?styles.yearActive:""} aria-pressed={year===y} onClick={()=>changeYear(y)}>{y}º</button>)}</div></section>
    <section className={styles.group}><strong>Anos finais</strong><small>6º ao 9º ano</small><div className={styles.yearButtons}>{grades.filter(y=>y>=6).map(y=><button type="button" key={y} className={year===y?styles.yearActive:""} aria-pressed={year===y} onClick={()=>changeYear(y)}>{y}º</button>)}</div></section>
   </div>
  </div>
  {!subject?<section className={styles.section}>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>TRILHAS POR DISCIPLINA</span><h2>Matérias do {year}º ano</h2><p>Aulas iniciais disponíveis para todas as matérias exibidas, incluindo questões e acompanhamento.</p></div><span className={styles.count}>{completedAtYear}/{available.length} concluídas</span></div>
   <div className={styles.subjectGrid}>{available.map(item=>{
    const complete=progress[year+":"+item.id]?.completed;
    return <button type="button" key={item.id} className={styles.subjectCard} onClick={()=>openSubject(item.id)}>
     <span className={styles.symbol}>{item.symbol}</span><span className={styles.subjectText}><small>{item.category}</small><strong>{item.name}</strong><span>{item.description}</span></span>
     <span className={styles.status}>{complete?"✓ Aula inicial concluída":"Explorar aula inicial →"}</span>
    </button>;
   })}</div>
   <p className={styles.disclaimer}>Ensino Religioso: componente previsto na BNCC, oferecido conforme organização da escola e com respeito à liberdade de crença. A Língua Inglesa integra os anos finais nesta seleção.</p>
  </section>:lesson&&metadata?<section className={styles.section}>
   <button type="button" className={styles.back} onClick={()=>openSubject(null)}>← Voltar às matérias do {year}º ano</button>
   <div className={styles.lessonHero}>
    <span className={styles.eyebrow}>{year}º ANO · {metadata.category.toUpperCase()}</span>
    <h2>{metadata.name}</h2>
    <p>Trilha introdutória: <strong>{lesson.title}</strong></p>
    <span className={styles.statusLine}>{myProgress.completed?"✓ Atividade concluída":myProgress.attempts?myProgress.attempts+" tentativa(s) registrada(s)":"Comece pela aula e avance para a atividade"}</span>
   </div>
   <div className={styles.studyCards} role="group" aria-label="Etapas da aula">
    {([
      {id:"aula",icon:"📖",title:"Aula explicada",desc:"Compreenda o assunto"},
      {id:"exemplo",icon:"🔎",title:"Exemplo aplicado",desc:"Veja na prática"},
      {id:"atividade",icon:"✍️",title:"Praticar",desc:"Questão com correção"},
      {id:"revisao",icon:"📊",title:"Minha revisão",desc:"Acompanhe seus acertos"}
    ] as const).map(item=><button key={item.id} type="button" onClick={()=>openStage(item.id)} aria-pressed={stage===item.id} className={styles.studyCard+" "+(stage===item.id?styles.studyCardActive:"")}>
     <span>{item.icon}</span><strong>{item.title}</strong><small>{item.desc}</small>
    </button>)}
   </div>
   <article className={styles.content}>
    {stage==="aula"&&<><span className={styles.eyebrow}>AULA 1 · CONCEITOS FUNDAMENTAIS</span><h3>{lesson.title}</h3><p>{lesson.theory}</p><div className={styles.noteBox}><strong>O que você vai aprender</strong><p>Compreender o conceito e reconhecê-lo em uma situação do dia a dia.</p></div><button type="button" className={styles.primary} onClick={()=>openStage("exemplo")}>Ver exemplo aplicado →</button></>}
    {stage==="exemplo"&&<><span className={styles.eyebrow}>APLICANDO O CONHECIMENTO</span><h3>Exemplo explicado</h3><p>{lesson.example}</p><div className={styles.noteBox}><strong>Lembre-se</strong><p>{lesson.theory}</p></div><button type="button" className={styles.primary} onClick={()=>openStage("atividade")}>Praticar agora →</button></>}
    {stage==="atividade"&&<><span className={styles.eyebrow}>ATIVIDADE 1 · {year}º ANO</span><h3>Vamos conferir o que você aprendeu</h3><p className={styles.question}>{lesson.question}</p><div className={styles.options} role="group" aria-label="Alternativas">
      {lesson.choices.map((choice,i)=><button type="button" key={i} disabled={checked} aria-pressed={answer===i} className={answer===i?styles.optionSelected:""} onClick={()=>setAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{choice}</button>)}
     </div>
     {!checked?<button type="button" className={styles.primary} onClick={verify} disabled={answer===null}>Conferir resposta</button>:<div className={styles.feedback} role="status"><strong>{answer===lesson.correct?"✓ Você acertou!":"↻ Vamos revisar essa ideia"}</strong><p>{lesson.feedback}</p><button type="button" className={styles.secondary} onClick={()=>{setAnswer(null);setChecked(false);}}>Tentar novamente</button><button type="button" className={styles.primary} onClick={()=>openStage("revisao")}>Ver minha revisão →</button></div>}
    </>}
    {stage==="revisao"&&<><span className={styles.eyebrow}>MEU APRENDIZADO</span><h3>Resumo da sua primeira aula</h3><div className={styles.summaryGrid}><div><strong>{myProgress.attempts}</strong><small>Tentativas</small></div><div><strong>{myProgress.correct}</strong><small>Respostas corretas</small></div><div><strong>{myProgress.completed?"Sim":"Ainda não"}</strong><small>Aula concluída</small></div></div><p>Uma atividade fica concluída após pelo menos uma resposta correta. Você pode revisá-la quantas vezes quiser.</p><button type="button" className={styles.primary} onClick={()=>{setAnswer(null);setChecked(false);openStage("atividade");}}>Refazer atividade →</button></>}
   </article>
  </section>:<section className={styles.section}><h2>Conteúdo ainda indisponível</h2><p>Retorne à lista de matérias e escolha outra trilha.</p><button className={styles.secondary} onClick={()=>openSubject(null)}>Voltar às matérias</button></section>}
  <footer className={styles.footer}><p>Esta é a primeira camada de aulas de introdução por ano e componente, com conteúdos produzidos para o Eduverso. Não é o currículo integral da BNCC nem substitui a escola ou o professor. Os resultados são salvos neste navegador, separadamente do Ensino Médio.</p><a href="https://basenacionalcomum.mec.gov.br/" target="_blank" rel="noopener noreferrer">Consultar BNCC oficial ↗</a></footer>
 </div>;
}
