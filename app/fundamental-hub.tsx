"use client";
import {useEffect,useMemo,useState} from "react";
import {subjectMetadata,type FundamentalGrade,type FundamentalSubjectId} from "./fundamental-curriculum";
import {fundamentalTopicCount,getFundamentalTopics,type FundamentalTopic} from "./fundamental-topic-catalog";
import styles from "./fundamental-hub.module.css";
import {recordStudyActivity} from "./lib/study-activity";

const grades=[1,2,3,4,5,6,7,8,9] as FundamentalGrade[];
type Stage="aula"|"exemplo"|"atividade"|"revisao";
type ProgressEntry={attempts:number;correct:number;completed:boolean;sessions?:number;bestPercent?:number;lastPercent?:number};
type Progress=Record<string,ProgressEntry>;
const key="eduverso:fundamental:progresso:v1";
function readSaved():Progress{
 try{
  const v=JSON.parse(localStorage.getItem(key)||"{}");
  if(!v||typeof v!=="object"||Array.isArray(v))return {};
  const clean:Progress={};
  for(const [name,raw] of Object.entries(v)){
   if(!/^[1-9]:[a-z-]+(?::[a-z-]+)?$/.test(name)||!raw||typeof raw!=="object")continue;
   const p=raw as Record<string,unknown>;
   const num=(prop:string)=>typeof p[prop]==="number"&&Number.isFinite(p[prop])?Math.max(0,Number(p[prop])):0;
   clean[name]={attempts:num("attempts"),correct:num("correct"),completed:p.completed===true,
    sessions:num("sessions"),bestPercent:Math.min(100,num("bestPercent")),lastPercent:Math.min(100,num("lastPercent"))};
  }
  return clean;
 }catch{return {};}
}
function parseLocation(){
 if(typeof window==="undefined")return {year:1 as FundamentalGrade,subject:null as FundamentalSubjectId|null,topicId:null as string|null};
 const params=new URLSearchParams(window.location.search);
 const raw=Number(params.get("fundAno"));
 const year=grades.includes(raw as FundamentalGrade)?raw as FundamentalGrade:1;
 const name=params.get("fundMateria");
 const subject=subjectMetadata.find(s=>s.id===name&&(year>=6||s.id!=="ingles"))?.id??null;
 const candidate=params.get("fundAssunto");
 const topicId=subject&&getFundamentalTopics(year,subject).some(t=>t.id===candidate)?candidate:null;
 return {year,subject,topicId};
}
function syncUrl(year:FundamentalGrade,subject:FundamentalSubjectId|null,topicId:string|null){
 const url=new URL(window.location.href);
 url.searchParams.set("fundAno",String(year));
 if(subject)url.searchParams.set("fundMateria",subject);else url.searchParams.delete("fundMateria");
 if(subject&&topicId)url.searchParams.set("fundAssunto",topicId);else url.searchParams.delete("fundAssunto");
 window.history.pushState({},"",url.pathname+url.search+url.hash);
 window.scrollTo({top:0,behavior:"smooth"});
}
const oldRecord=(all:Progress,year:number,subject:FundamentalSubjectId,topic:FundamentalTopic)=>{
 return all[year+":"+subject+":"+topic.id]??(topic.id==="introducao"?all[year+":"+subject]:undefined);
};
const noProgress:ProgressEntry={attempts:0,correct:0,completed:false,sessions:0,bestPercent:0,lastPercent:0};
export default function FundamentalHub(){
 const [year,setYear]=useState<FundamentalGrade>(1);
 const [subject,setSubject]=useState<FundamentalSubjectId|null>(null);
 const [topicId,setTopicId]=useState<string|null>(null);
 const [stage,setStage]=useState<Stage>("aula");
 const [questionIndex,setQuestionIndex]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const [verified,setVerified]=useState(false);
 const [sessionHits,setSessionHits]=useState(0);
 const [quizDone,setQuizDone]=useState(false);
 const [progress,setProgress]=useState<Progress>({});
 const [loaded,setLoaded]=useState(false);
 const [voiceError,setVoiceError]=useState(false);
 useEffect(()=>{
  const restore=()=>{
   const loc=parseLocation();setYear(loc.year);setSubject(loc.subject);setTopicId(loc.topicId);
   setStage("aula");setQuestionIndex(0);setAnswer(null);setVerified(false);setQuizDone(false);setSessionHits(0);
  };
  restore();setProgress(readSaved());setLoaded(true);
  window.addEventListener("popstate",restore);
  return()=>window.removeEventListener("popstate",restore);
 },[]);
 useEffect(()=>{if(loaded)try{localStorage.setItem(key,JSON.stringify(progress));}catch{}},[progress,loaded]);
 const subjects=useMemo(()=>subjectMetadata.filter(s=>year>=6||s.id!=="ingles"),[year]);
 const topics=useMemo(()=>subject?getFundamentalTopics(year,subject):[],[year,subject]);
 const topic=topics.find(t=>t.id===topicId)??null;
 const meta=subjectMetadata.find(s=>s.id===subject)??null;
 const question=topic?.questions[questionIndex]??null;
 const selectedProgress=subject&&topic?oldRecord(progress,year,subject,topic)??noProgress:noProgress;
 const topicCount=subjects.reduce((n,s)=>n+getFundamentalTopics(year,s.id).length,0);
 const practicedCount=subjects.reduce((n,s)=>n+getFundamentalTopics(year,s.id).filter(t=>oldRecord(progress,year,s.id,t)?.completed).length,0);
 function restartQuiz(){
  setQuestionIndex(0);setAnswer(null);setVerified(false);setSessionHits(0);setQuizDone(false);
 }
 function chooseYear(next:FundamentalGrade){
  setYear(next);setSubject(null);setTopicId(null);setStage("aula");restartQuiz();setVoiceError(false);
  syncUrl(next,null,null);
 }
 function chooseSubject(next:FundamentalSubjectId|null){
  setSubject(next);setTopicId(null);setStage("aula");restartQuiz();setVoiceError(false);
  syncUrl(year,next,null);
 }
 function chooseTopic(next:string|null){
  if(next&&subject){const selected=getFundamentalTopics(year,subject).find(item=>item.id===next);recordStudyActivity("Ensino Fundamental",selected?.title||next);}
  setTopicId(next);setStage("aula");restartQuiz();setVoiceError(false);
  syncUrl(year,subject,next);
 }
 function chooseStage(next:Stage){
  setStage(next);setVoiceError(false);
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function check(){
  if(!question||answer===null||verified||quizDone)return;
  setVerified(true);
  if(answer===question.correct)setSessionHits(v=>v+1);
 }
 function finishQuiz(){
  if(!topic||!subject||!verified||quizDone)return;
  if(questionIndex<topic.questions.length-1){
   setQuestionIndex(i=>i+1);setAnswer(null);setVerified(false);return;
  }
  const percentage=Math.round(100*sessionHits/topic.questions.length);
  const saveKey=year+":"+subject+":"+topic.id;
  setProgress(previous=>{
   const old=oldRecord(previous,year,subject,topic)??noProgress;
   return {...previous,[saveKey]:{
    attempts:old.attempts+topic.questions.length,correct:old.correct+sessionHits,completed:true,
    sessions:(old.sessions??0)+1,bestPercent:Math.max(old.bestPercent??0,percentage),lastPercent:percentage
   }};
  });
  recordStudyActivity("Ensino Fundamental",topic.title,"completed");
  setQuizDone(true);
 }
 function readAloud(text:string){
  setVoiceError(false);
  if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance==="undefined"){setVoiceError(true);return;}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);utterance.lang="pt-BR";utterance.rate=year<=3?0.85:1;
  window.speechSynthesis.speak(utterance);
 }
 return <div className={styles.fundamental}>
  {!subject&&<>
   <header className={styles.hero}>
    <span className={styles.eyebrow}>✦ EDUVERSO · ESTUDOS ESCOLARES</span>
    <h1>Ensino <span>Fundamental.</span></h1>
    <p>Escolha seu ano escolar, entre em uma matéria e descubra os assuntos disponíveis. Aprenda com explicações, exemplos e atividades adequadas a cada etapa.</p>
    <div className={styles.heroMeta}><span>1º ao 9º ano</span><span>{fundamentalTopicCount} assuntos introdutórios</span><span>Progresso independente</span></div>
   </header>
   <section className={styles.yearPanel}>
    <div className={styles.sectionHead}><div><span className={styles.eyebrow}>ESCOLHA SUA ETAPA</span><h2>Em qual ano você estuda?</h2></div></div>
    <div className={styles.yearGroups}>
     <div className={styles.group}><strong>Anos iniciais</strong><small>1º ao 5º ano</small><div className={styles.yearButtons}>{grades.filter(y=>y<=5).map(y=><button type="button" key={y} aria-pressed={year===y} className={year===y?styles.yearActive:""} onClick={()=>chooseYear(y)}>{y}º</button>)}</div></div>
     <div className={styles.group}><strong>Anos finais</strong><small>6º ao 9º ano</small><div className={styles.yearButtons}>{grades.filter(y=>y>=6).map(y=><button type="button" key={y} aria-pressed={year===y} className={year===y?styles.yearActive:""} onClick={()=>chooseYear(y)}>{y}º</button>)}</div></div>
    </div>
   </section>
   <section className={styles.section} aria-label={"Disciplinas do "+year+"º ano"}>
    <div className={styles.sectionHead}><div><span className={styles.eyebrow}>DISCIPLINAS POR ANO</span><h2>Matérias do {year}º ano</h2><p>Selecione uma disciplina para consultar seus assuntos introdutórios.</p></div><span className={styles.count}>{practicedCount} de {topicCount} assuntos praticados</span></div>
    <div className={styles.subjectGrid}>{subjects.map(item=>{
     const list=getFundamentalTopics(year,item.id);
     const practiced=list.filter(t=>oldRecord(progress,year,item.id,t)?.completed).length;
     return <button type="button" key={item.id} className={styles.subjectCard} onClick={()=>chooseSubject(item.id)}>
      <span className={styles.symbol} aria-hidden="true">{item.symbol}</span>
      <span className={styles.subjectText}><small>{item.category}</small><strong>{item.name}</strong><span>{item.description}</span></span>
      <span className={styles.status}>{list.length} {list.length===1?"assunto":"assuntos"} · {practiced} praticado{practiced===1?"":"s"} <span aria-hidden="true">→</span></span>
     </button>;
    })}</div>
    <p className={styles.disclaimer}>Ensino Religioso é apresentado com respeito à diversidade de crenças e filosofias de vida; a participação segue as regras de matrícula da escola. A Língua Inglesa aparece do 6º ao 9º ano nesta organização.</p>
   </section>
  </>}
  {subject&&!topic&&meta&&<section className={styles.section}>
   <nav className={styles.breadcrumb} aria-label="Retornar na navegação"><button type="button" onClick={()=>chooseSubject(null)}>← Voltar às matérias do {year}º ano</button></nav>
   <header className={styles.subjectHeader}>
    <span className={styles.eyebrow}>{year}º ANO · {meta.category.toUpperCase()}</span>
    <h2>{meta.name}</h2>
    <p>Escolha o assunto que deseja estudar. Cada card abre uma explicação, exemplos e atividades. Os temas indicados como introdutórios são uma primeira etapa do currículo.</p>
    <small>{topics.length} {topics.length===1?"assunto disponível":"assuntos disponíveis"}</small>
   </header>
   <div className={styles.topicGrid}>{topics.map((t,i)=>{
    const record=oldRecord(progress,year,subject,t);
    return <button type="button" key={t.id} className={styles.topicCard} onClick={()=>chooseTopic(t.id)}>
     <span className={styles.topicIndex}>{String(i+1).padStart(2,"0")}</span>
     <strong>{t.title}</strong><span>{t.objective}</span>
     <small>{t.questions.length} {t.questions.length===1?"questão introdutória":"questões para praticar"} · {record?.completed?"Atividade realizada":"Ainda não praticado"}</small>
     <span className={styles.topicLink}>Abrir assunto →</span>
    </button>;
   })}</div>
   <p className={styles.disclaimer}>Os assuntos apresentados integram uma trilha introdutória em expansão. Um bom resultado nas atividades não substitui uma avaliação escolar completa.</p>
  </section>}
  {subject&&topic&&meta&&<section className={styles.section}>
   <nav className={styles.breadcrumb} aria-label="Retornar na navegação"><button type="button" onClick={()=>chooseTopic(null)}>← Voltar aos assuntos de {meta.name}</button></nav>
   <header className={styles.lessonHero}>
    <span className={styles.eyebrow}>{year}º ANO · {meta.name.toUpperCase()}</span>
    <h2>{topic.title}</h2><p>{topic.objective}</p>
    <div className={styles.lessonPills}><span>{topic.questions.length} {topic.questions.length===1?"questão":"questões"}</span>
     <span>{selectedProgress.completed?"✓ Atividade realizada":"Atividade disponível"}</span></div>
   </header>
   <div className={styles.studyCards} role="group" aria-label="Etapas do assunto">
    {([
     {id:"aula",icon:"📖",name:"Aula explicada",desc:"Entenda o assunto"},
     {id:"exemplo",icon:"🔎",name:"Exemplos",desc:"Veja como funciona"},
     {id:"atividade",icon:"✍️",name:"Praticar",desc:"Responda e aprenda"},
     {id:"revisao",icon:"📊",name:"Meu desempenho",desc:"Confira sua evolução"}
    ] as const).map(item=><button type="button" key={item.id} aria-pressed={stage===item.id} className={styles.studyCard+" "+(stage===item.id?styles.studyCardActive:"")} onClick={()=>chooseStage(item.id)}>
     <span aria-hidden="true">{item.icon}</span><strong>{item.name}</strong><small>{item.desc}</small>
    </button>)}
   </div>
   <article className={styles.content}>
    {stage==="aula"&&<>
     <span className={styles.eyebrow}>AULA · {topic.title.toUpperCase()}</span><h3>Vamos aprender: {topic.title}</h3>
     <div className={styles.objective}><strong>Objetivo desta aula</strong><p>{topic.objective}</p></div>
     {topic.sections.map((paragraph,i)=><p key={i} className={styles.explanation}>{paragraph}</p>)}
     {topic.visual.length>0&&<div className={styles.learningVisual} aria-label="Representação visual para a aula">{topic.visual.map((token,i)=><span key={i}>{token}</span>)}</div>}
     {year<=3&&<><button type="button" className={styles.secondary} onClick={()=>readAloud(topic.sections.join(" "))}>🔊 Ouvir explicação</button>{voiceError&&<p role="status">A leitura em voz alta não está disponível neste navegador.</p>}</>}
     {!topic.expanded&&<p className={styles.introNotice}>Este é o conteúdo introdutório do assunto. A trilha terá novas explicações e atividades em futuras expansões.</p>}
     <button type="button" className={styles.primary} onClick={()=>chooseStage("exemplo")}>Ver exemplos →</button>
    </>}
    {stage==="exemplo"&&<>
     <span className={styles.eyebrow}>APLICANDO O CONHECIMENTO</span><h3>Entenda com exemplos</h3>
     {topic.examples.map((value,i)=><div className={styles.exampleCard} key={i}><strong>Exemplo {i+1}</strong><p>{value}</p></div>)}
     {topic.visual.length>0&&<div className={styles.learningVisual} aria-label="Material de apoio visual">{topic.visual.map((token,i)=><span key={i}>{token}</span>)}</div>}
     {year<=3&&<button type="button" className={styles.secondary} onClick={()=>readAloud(topic.examples.join(" "))}>🔊 Ouvir exemplos</button>}
     <button type="button" className={styles.primary} onClick={()=>chooseStage("atividade")}>Praticar agora →</button>
    </>}
    {stage==="atividade"&&!quizDone&&question&&<>
     <span className={styles.eyebrow}>ATIVIDADE · QUESTÃO {questionIndex+1} DE {topic.questions.length}</span>
     <h3>Escolha a resposta</h3>
     <div className={styles.progressBar} role="progressbar" aria-label="Progresso das questões" aria-valuemin={0} aria-valuemax={topic.questions.length} aria-valuenow={questionIndex}><span style={{width:(questionIndex/topic.questions.length*100)+"%"}}/></div>
     <p className={styles.question}>{question.prompt}</p>
     <div className={styles.options} role="group" aria-label="Alternativas">
      {question.choices.map((choice,i)=><button key={i} type="button" aria-pressed={answer===i} disabled={verified} className={answer===i?styles.optionSelected:""} onClick={()=>setAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{choice}</button>)}
     </div>
     {!verified?<button type="button" className={styles.primary} disabled={answer===null} onClick={check}>Conferir resposta</button>:
      <div className={styles.feedback} role="status"><strong>{answer===question.correct?"✓ Resposta correta!":"↻ Ainda não. Vamos aprender com o resultado."}</strong>
       <p><b>Resposta esperada:</b> {question.choices[question.correct]}</p><p>{question.explanation}</p>
       <button type="button" className={styles.primary} onClick={finishQuiz}>{questionIndex+1===topic.questions.length?"Ver meu resultado →":"Próxima questão →"}</button>
      </div>}
    </>}
    {stage==="atividade"&&quizDone&&<>
     <span className={styles.eyebrow}>ATIVIDADE FINALIZADA</span><h3>Seu resultado nesta rodada</h3>
     <div className={styles.summaryGrid}><div><strong>{sessionHits}/{topic.questions.length}</strong><small>Acertos</small></div>
      <div><strong>{Math.round(100*sessionHits/topic.questions.length)}%</strong><small>Precisão</small></div>
      <div><strong>{topic.questions.length>=5&&sessionHits/topic.questions.length>=.8?"Bom avanço":"Continue praticando"}</strong><small>Avaliação inicial</small></div></div>
     <p>O resultado representa apenas as questões respondidas nesta rodada. Continue estudando para consolidar seu aprendizado.</p>
     <button type="button" className={styles.primary} onClick={()=>chooseStage("revisao")}>Ver meu desempenho →</button>
     <button type="button" className={styles.secondary} onClick={restartQuiz}>Refazer atividade</button>
    </>}
    {stage==="revisao"&&<>
     <span className={styles.eyebrow}>MINHA EVOLUÇÃO · {topic.title.toUpperCase()}</span><h3>Meu desempenho</h3>
     <div className={styles.summaryGrid}><div><strong>{selectedProgress.attempts}</strong><small>Questões respondidas</small></div>
      <div><strong>{selectedProgress.correct}</strong><small>Respostas certas</small></div>
      <div><strong>{selectedProgress.completed?"Sim":"Não"}</strong><small>Atividade realizada</small></div></div>
     {selectedProgress.sessions!==undefined&&selectedProgress.sessions>0&&<p>Melhor resultado registrado: {selectedProgress.bestPercent??0}%. Última rodada: {selectedProgress.lastPercent??0}%.</p>}
     <p>O registro indica atividades realizadas, não aprovação escolar ou domínio completo do conteúdo. Você pode repetir a prática sempre que desejar.</p>
     <button type="button" className={styles.primary} onClick={()=>{restartQuiz();chooseStage("atividade");}}>Refazer atividade →</button>
    </>}
   </article>
  </section>}
  <footer className={styles.footer}><p>Trilhas didáticas introdutórias do Eduverso. O conjunto ainda não representa a cobertura integral da BNCC e não substitui a escola ou o professor. O histórico é salvo somente neste navegador, separado do Ensino Médio.</p>
   <a href="https://basenacionalcomum.mec.gov.br/" target="_blank" rel="noopener noreferrer">Consultar a BNCC oficial ↗</a>
  </footer>
 </div>;
}
