"use client";
import {useEffect,useMemo,useState} from "react";
import type {MedTopic} from "./medicine-curriculum";
import type {DeepChapter,DeepQuestion} from "./medicine-anatomy-deep";
import styles from "./medicine-deep-chapter.module.css";
import AnatomyAtlas from "./anatomy-atlas";

type View="aulas"|"questoes"|"resumo"|"atlas";
type SavedProgress={visited:number[];results:Record<string,boolean>};
type Props={topic:MedTopic;chapter:DeepChapter;disciplineTitle:string;coverSrc:string;onBack:()=>void;onNext:()=>void;onComplete:()=>void;onAnswer:(correct:boolean)=>void};
function storageKey(id:string){
 // Compatibilidade com as cinco disciplinas já publicadas: nunca migrar chaves existentes.
 const slug=id.slice(0,id.lastIndexOf("-"));
 const oldKeys:Record<string,string>={
  "anatomia-humana":"anatomia:avanco:","histologia":"histologia:avanco:","embriologia":"embriologia:avanco:",
  "bioquimica":"bioquimica:avanco:","fisiologia":"fisiologia:avanco:"
 };
 return "eduverso:medicina:"+(oldKeys[slug]??("curso:"+slug+":avanco:"))+id;
}
function loadProgress(topicId:string):SavedProgress{
 try{
  const raw=window.localStorage.getItem(storageKey(topicId));
  if(raw){
   const saved=JSON.parse(raw) as SavedProgress;
   if(saved&&Array.isArray(saved.visited)&&saved.results&&typeof saved.results==="object"){
    return {visited:saved.visited.filter(x=>Number.isInteger(x)&&x>=0&&x<4),results:saved.results};
   }
  }
 }catch{}
 return {visited:[],results:{}};
}
export default function MedicineDeepChapter({topic,chapter,disciplineTitle,coverSrc,onBack,onNext,onComplete,onAnswer}:Props){
 const [view,setView]=useState<View>("aulas");
 const hasAtlas=topic.id.startsWith("anatomia-humana-");
 const [lessonIndex,setLessonIndex]=useState(0);
 const [quizIndex,setQuizIndex]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [progress,setProgress]=useState<SavedProgress>({visited:[],results:{}});
 const [hydrated,setHydrated]=useState(false);
 const questions=useMemo<DeepQuestion[]>(()=>[
  {id:topic.id+"-original",prompt:topic.question,options:topic.options,correct:topic.correct,explanation:topic.feedback},
  ...(chapter?.questions??[])
 ],[topic,chapter]);
 useEffect(()=>{
  setProgress(loadProgress(topic.id));
  setHydrated(true);
 },[topic.id]);
 useEffect(()=>{
  if(!hydrated)return;
  try{window.localStorage.setItem(storageKey(topic.id),JSON.stringify(progress));}catch{}
 },[progress,hydrated,topic.id]);
 useEffect(()=>{
  if(!hydrated||view!=="aulas")return;
  setProgress(prev=>prev.visited.includes(lessonIndex)?prev:{...prev,visited:[...prev.visited,lessonIndex]});
 },[lessonIndex,view,hydrated]);
 if(!chapter)return null;
 const activeLesson=chapter.sections[lessonIndex];
 const activeQuestion=questions[quizIndex];
 const correctCount=questions.filter(q=>progress.results[q.id]===true).length;
 const finishedQuestions=questions.filter(q=>Object.prototype.hasOwnProperty.call(progress.results,q.id)).length;
 const allCorrect=correctCount===questions.length;
 const sectionPct=Math.round(100*progress.visited.length/chapter.sections.length);
 function check(){
  if(choice===null||checked)return;
  const isCorrect=choice===activeQuestion.correct;
  setChecked(true);
  setProgress(prev=>({...prev,results:{...prev.results,[activeQuestion.id]:isCorrect||prev.results[activeQuestion.id]===true}}));
  onAnswer(isCorrect);
 }
 function nextQuiz(){
  if(quizIndex<questions.length-1){
   setQuizIndex(i=>i+1);
   setChoice(null);setChecked(false);
  }else{
   const latest={...progress.results,[activeQuestion.id]:choice===activeQuestion.correct||progress.results[activeQuestion.id]===true};
   if(questions.every(q=>latest[q.id]===true))onComplete();
   setView("resumo");
  }
 }
 function retryUnresolved(){
  const nextIndex=questions.findIndex(q=>progress.results[q.id]!==true);
  setQuizIndex(Math.max(nextIndex,0));setChoice(null);setChecked(false);setView("questoes");
 }
 return <article className={styles.chapter}>
  <div className={styles.chapterHead}>
   <button type="button" className={styles.back} onClick={onBack}>← Voltar aos 6 módulos</button>
   <span className={styles.kicker}>{disciplineTitle.toUpperCase()} · MATERIAL APROFUNDADO</span>
   <h2>{chapter.title}</h2>
   <div className={styles.metadata}><span>4 aulas</span><span>4 questões comentadas</span><span>≈ {chapter.minutes} min</span></div>
   <p className={styles.lead}>Este módulo aprofunda a trilha do Eduverso com explicações progressivas, observação morfológica e revisão por questões.</p>
  </div>
  <div className={styles.progressWrap}>
   <div className={styles.progressTop}><strong>Seu avanço nas aulas</strong><span>{progress.visited.length} de 4 abertas</span></div>
   <div className={styles.progress} role="progressbar" aria-label="Aulas acessadas" aria-valuenow={sectionPct} aria-valuemin={0} aria-valuemax={100}><span style={{width:sectionPct+"%"}}/></div>
  </div>
  <div className={styles.modeNav+" "+(hasAtlas?styles.modeNavFour:"")} role="group" aria-label="Etapas do módulo">
   <button type="button" aria-pressed={view==="aulas"} onClick={()=>setView("aulas")} className={view==="aulas"?styles.selected:""}>📚 Aulas</button>
   <button type="button" aria-pressed={view==="questoes"} onClick={()=>setView("questoes")} className={view==="questoes"?styles.selected:""}>✍️ Questões</button>
   <button type="button" aria-pressed={view==="resumo"} onClick={()=>setView("resumo")} className={view==="resumo"?styles.selected:""}>📊 Revisão</button>
   {hasAtlas&&<button type="button" aria-pressed={view==="atlas"} onClick={()=>setView("atlas")} className={view==="atlas"?styles.selected:""}>🦴 Atlas interativo</button>}
  </div>
  {view==="atlas"&&hasAtlas&&<AnatomyAtlas/>}
  {view==="aulas"&&<>
   <section className={styles.objectives}>
    <h3>O que você vai aprender</h3>
    <ul>{chapter.objectives.map(item=><li key={item}>{item}</li>)}</ul>
   </section>
   <figure className={styles.visual}>
    <img src={coverSrc} alt={"Ilustração de apoio à disciplina "+disciplineTitle+". Não substitui observação de lâminas ou atlas acadêmicos."} loading="lazy"/>
    <figcaption>Imagem didática ilustrativa. Para reconhecimento de estruturas reais, utilize também atlas, lâminas e modelos de laboratório supervisionado.</figcaption>
   </figure>
   <nav className={styles.lessonNav} aria-label="Selecionar aula">
    {chapter.sections.map((part,i)=><button type="button" key={part.title} aria-current={lessonIndex===i?"step":undefined} className={lessonIndex===i?styles.activeLesson:""} onClick={()=>setLessonIndex(i)}>
      <span className={styles.lessonNumber}>{String(i+1).padStart(2,"0")}</span><span>{part.title}</span>{progress.visited.includes(i)&&<span className={styles.visited}>✓</span>}
    </button>)}
   </nav>
   <section className={styles.lessonBody}>
    <span className={styles.kicker}>AULA {lessonIndex+1} DE 4</span>
    <h3>{activeLesson.title}</h3>
    {activeLesson.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
    <div className={styles.keyBox}><strong>Fixe os conceitos</strong><ul>{activeLesson.bullets.map(b=><li key={b}>{b}</li>)}</ul></div>
    <div className={styles.actions}>
     <button type="button" className={styles.secondary} disabled={lessonIndex===0} onClick={()=>setLessonIndex(i=>Math.max(0,i-1))}>← Aula anterior</button>
     <button type="button" className={styles.primary} onClick={()=>lessonIndex===3?setView("questoes"):setLessonIndex(i=>i+1)}>{lessonIndex===3?"Praticar com questões →":"Próxima aula →"}</button>
    </div>
   </section>
  </>}
  {view==="questoes"&&<section className={styles.quiz}>
    <div className={styles.quizTop}><span className={styles.kicker}>QUESTÃO {quizIndex+1} DE {questions.length}</span><span className={styles.muted}>{finishedQuestions} respondidas · {correctCount} acertos registrados</span></div>
    <h3>{activeQuestion.prompt}</h3>
    <div className={styles.options} role="group" aria-label="Alternativas da questão">
     {activeQuestion.options.map((opt,i)=><button key={i} type="button" disabled={checked} aria-pressed={choice===i} className={choice===i?styles.chosen:""} onClick={()=>setChoice(i)}><strong>{String.fromCharCode(65+i)}.</strong> {opt}</button>)}
    </div>
    {!checked?<button type="button" className={styles.primary} disabled={choice===null} onClick={check}>Conferir resposta</button>:<div className={styles.feedback} role="status"><strong>{choice===activeQuestion.correct?"✓ Resposta correta":"↻ Vamos rever o conceito"}</strong><p>{activeQuestion.explanation}</p>{choice!==activeQuestion.correct&&<p>Resposta esperada: <strong>{activeQuestion.options[activeQuestion.correct]}</strong>.</p>}</div>}
    <div className={styles.actions}>
     <button type="button" className={styles.secondary} disabled={quizIndex===0} onClick={()=>{setQuizIndex(i=>Math.max(0,i-1));setChecked(false);setChoice(null)}}>← Anterior</button>
     <button type="button" className={styles.primary} disabled={!checked} onClick={nextQuiz}>{quizIndex===questions.length-1?"Ver revisão →":"Próxima questão →"}</button>
    </div>
   </section>}
  {view==="resumo"&&<section className={styles.summary}>
   <span className={styles.kicker}>REVISÃO DO MÓDULO</span>
   <h3>{correctCount} de {questions.length} questões resolvidas corretamente</h3>
   <p>Seu progresso é salvo neste navegador. As questões são didáticas do Eduverso, não provas oficiais nem avaliação de competência profissional.</p>
   <div className={styles.keyBox}><strong>Aplicação contextualizada</strong><p>{chapter.caseStudy}</p></div>
   <h4>Glossário de revisão</h4>
   <dl>{chapter.glossary.map(g=><div key={g.term}><dt>{g.term}</dt><dd>{g.definition}</dd></div>)}</dl>
   <p className={styles.reference}>Referência complementar para leitura: <a href={chapter.reference} target="_blank" rel="noopener noreferrer">OpenStax · Anatomy and Physiology 2e ↗</a>. O conteúdo da plataforma é uma adaptação didática autoral, não uma reprodução integral da obra.</p>
   <div className={styles.actions}>
    {!allCorrect&&<button type="button" className={styles.primary} onClick={retryUnresolved}>Refazer questões pendentes ({questions.length-correctCount})</button>}
    <button type="button" className={allCorrect?styles.primary:styles.secondary} onClick={onNext}>{allCorrect?"Módulo concluído ✓ · Próximo →":"Voltar e escolher outro módulo →"}</button>
   </div>
  </section>}
  <p className={styles.disclaimer}>Material universitário de revisão. As imagens são ilustrativas e não substituem observação de lâminas, atlas de referência, laboratório ou formação profissional supervisionada.</p>
 </article>;
}
