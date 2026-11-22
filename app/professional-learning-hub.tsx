"use client";
import {useEffect,useMemo,useState} from "react";
import {getProfessionalTrack,professionalTracks} from "./learning-professions";
import {getProfessionalDepth} from "./professional-depth";
import styles from "./professional-learning-hub.module.css";

type Props={trackId:string;onSelectTrack:(id:string)=>void;onOpenBooklet:(id:string)=>void};
type Tab="aulas"|"revisao";
const storageKey=(id:string)=>"eduverso:profissionais:concluidas:v1:"+id;

function readProgress(id:string,max:number):number[]{
 try{
  const parsed:unknown=JSON.parse(localStorage.getItem(storageKey(id))||"[]");
  return Array.isArray(parsed)?[...new Set(parsed.filter((i):i is number=>Number.isInteger(i)&&i>=0&&i<max))].sort((a,b)=>a-b):[];
 }catch{return [];}
}
function orderFor(index:number,offset:number):number[]{
 const base=[0,1,2];const shift=(index+offset)%base.length;
 return [...base.slice(shift),...base.slice(0,shift)];
}
export default function ProfessionalLearningHub({trackId,onSelectTrack,onOpenBooklet}:Props){
 const track=getProfessionalTrack(trackId)??professionalTracks[0];
 const [tab,setTab]=useState<Tab>("aulas");
 const [lessonIndex,setLessonIndex]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [completed,setCompleted]=useState<number[]>([]);
 const [reviewAnswers,setReviewAnswers]=useState<Record<number,number>>({});
 const [reviewChecked,setReviewChecked]=useState(false);
 const [chaptersOpen,setChaptersOpen]=useState(false);
 const [practiceOpen,setPracticeOpen]=useState(false);
 const [secondChoice,setSecondChoice]=useState<number|null>(null);
 const [secondChecked,setSecondChecked]=useState(false);

 useEffect(()=>{
  setCompleted(readProgress(track.id,track.lessons.length));
  setLessonIndex(0);setTab("aulas");setChoice(null);setChecked(false);
  setReviewAnswers({});setReviewChecked(false);setChaptersOpen(false);setPracticeOpen(false);setSecondChoice(null);setSecondChecked(false);
 },[track.id,track.lessons.length]);

 const lesson=track.lessons[Math.min(lessonIndex,track.lessons.length-1)];
 const depth=getProfessionalDepth(track.id,lessonIndex);
 const secondQuiz=depth?.quiz;
 const reviewItems=track.lessons.flatMap((item,i)=>{const extra=getProfessionalDepth(track.id,i)?.quiz;return [{chapter:i,title:item.title,question:item.question,options:item.options,correct:item.correct,explanation:item.feedback||item.explain},...(extra?[{chapter:i,title:item.title,question:extra.question,options:extra.options,correct:extra.correct,explanation:extra.explanation}]:[])];});
 const progress=Math.round(100*completed.length/Math.max(track.lessons.length,1));
 const chapterOrder=useMemo(()=>orderFor(lessonIndex,track.id.length),[lessonIndex,track.id]);
 const reviewScore=reviewItems.reduce((total,item,i)=>total+(reviewAnswers[i]===item.correct?1:0),0);

 function openLesson(index:number){
  setTab("aulas");setLessonIndex(index);setChoice(null);setChecked(false);setSecondChoice(null);setSecondChecked(false);setPracticeOpen(false);setChaptersOpen(false);
  if(typeof window!=="undefined")requestAnimationFrame(()=>document.getElementById("eduverso-professional-lesson")?.scrollIntoView({behavior:"smooth",block:"start"}));
 }
 function markCompleted(index:number){
  setCompleted(current=>{
   if(current.includes(index))return current;
   const updated=[...current,index].sort((a,b)=>a-b);
   try{localStorage.setItem(storageKey(track.id),JSON.stringify(updated));}catch{/* private browsing */}
   return updated;
  });
 }
 function verify(){
  if(choice===null||checked)return;
  setChecked(true);
  if(choice===lesson.correct&&(!secondQuiz||(secondChecked&&secondChoice===secondQuiz.correct)))markCompleted(lessonIndex);
 }
 function verifySecond(){
  if(!secondQuiz||secondChoice===null||secondChecked)return;
  setSecondChecked(true);
  if(secondChoice===secondQuiz.correct&&checked&&choice===lesson.correct)markCompleted(lessonIndex);
 }
 function switchTrack(id:string){
  onSelectTrack(id);
 }
 if(trackId==="catalog")return <div className={styles.root}>
  <header className={styles.catalogHero}><span className={styles.kicker}>✦ EDUVERSO · NOVOS CAMINHOS</span><h1>Formações profissionais<span>.</span></h1><p>Escolha uma área para aprender conceitos, ver demonstrações, resolver desafios práticos e acompanhar seu progresso. Cada formação possui {professionalTracks[0]?.lessons.length??0} aulas estruturadas.</p></header>
  <section className={styles.catalog} aria-label="Catálogo de formações profissionais">
   <div className={styles.sectionTitle}><div><span>ESCOLHA SEU CURSO</span><h2>Nove áreas para desenvolver habilidades</h2></div></div>
   <div className={styles.catalogGrid}>{professionalTracks.map(item=><button type="button" key={item.id} className={styles.catalogCard} onClick={()=>onSelectTrack(item.id)}>
    <span className={styles.catalogIcon}>{item.icon}</span><span className={styles.catalogCategory}>{item.category}</span><strong>{item.name}</strong><p>{item.description}</p><span className={styles.catalogMeta}>{item.lessons.length} aulas · {item.lessons.length*3} atividades guiadas</span><span className={styles.catalogAction}>Entrar no curso →</span>
   </button>)}</div>
  </section>
 </div>;
 if(!lesson)return <section className={styles.root}><p>Esta formação ainda não possui capítulos cadastrados.</p></section>;
 return <div className={styles.root}>
  <header className={styles.hero}>
   <div className={styles.courseNavigation}><button type="button" onClick={()=>onSelectTrack("catalog")}>← Todas as formações</button><span>{track.category} · Curso introdutório</span></div>
   <div className={styles.heroMain}><div className={styles.heroCopy}>
    <div className={styles.heroIcon}>{track.icon}</div>
    <div><h1>{track.name}<span>.</span></h1><p className={styles.description}>{track.description}</p></div>
   </div></div>
   <div className={styles.courseStats}><span>📚 {track.lessons.length} aulas</span><span>✍️ {track.lessons.length*3} atividades de estudo</span><span>✓ {completed.length} concluídas</span></div>
   <div className={styles.courseFooter}><div className={styles.courseProgress}><div className={styles.progressText}><span>Minha evolução</span><b>{progress}%</b></div><div className={styles.progressBar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Aulas concluídas"><span style={{width:progress+"%"}}/></div></div>
   <button type="button" className={styles.bookletButton} onClick={()=>onOpenBooklet(track.id)}>↓ Apostila PDF</button></div>
  </header>
  <div className={styles.tabBar} role="group" aria-label="Modo de aprendizado">
   <button type="button" aria-pressed={tab==="aulas"} className={tab==="aulas"?styles.tabActive:""} onClick={()=>setTab("aulas")}>📖 Aulas e conteúdos</button>
   <button type="button" aria-pressed={tab==="revisao"} className={tab==="revisao"?styles.tabActive:""} onClick={()=>setTab("revisao")}>📝 Revisão final ({reviewItems.length} questões)</button>
  </div>

  {tab==="aulas"&&<button className={styles.chaptersToggle} type="button" aria-expanded={chaptersOpen} onClick={()=>setChaptersOpen(v=>!v)}>{chaptersOpen?"▴ Ocultar lista de aulas":"☷ Ver os "+track.lessons.length+" capítulos do curso"}</button>}
  {tab==="aulas"?<div className={styles.studyLayout}>
   <aside className={styles.syllabus+(chaptersOpen?" "+styles.syllabusOpen:"")}>
    <div className={styles.syllabusTitle}><span>SEU ROTEIRO DE ESTUDO</span><h2>Capítulos</h2><p>Selecione um para abrir a aula completa.</p></div>
    <div className={styles.chapterList}>{track.lessons.map((item,i)=>
     <button type="button" key={item.title} aria-current={lessonIndex===i?"step":undefined}
      className={styles.chapter+(lessonIndex===i?" "+styles.chapterCurrent:"")} onClick={()=>openLesson(i)}>
      <span className={styles.chapterNumber}>{completed.includes(i)?"✓":String(i+1).padStart(2,"0")}</span>
      <span><strong>{item.title}</strong><small>{completed.includes(i)?"Concluído":"Abrir aula e praticar"}</small></span><span aria-hidden="true">›</span>
     </button>)}</div>
   </aside>

   <article id="eduverso-professional-lesson" className={styles.lessonCard}>
    <div className={styles.lessonTop}><span>CAPÍTULO {String(lessonIndex+1).padStart(2,"0")} DE {String(track.lessons.length).padStart(2,"0")}</span><span>{completed.includes(lessonIndex)?"✓ Concluído":"Leitura + atividade"}</span></div>
    <h2>{lesson.title}</h2>
    <section className={styles.reading}><h3>Entenda o conteúdo</h3><p>{lesson.explain||lesson.body}</p></section>
    {depth&&<section className={styles.deepSection}><span className={styles.deepKicker}>OBJETIVO DE APRENDIZAGEM</span><h3>{depth.objective}</h3><p>{depth.explanation}</p></section>}
    <section className={styles.example}><div className={styles.noteIcon}>✦</div><div><h3>Exemplo aplicado</h3><p>{lesson.example}</p></div></section>
    <section className={styles.reading}><h3>Na prática profissional</h3><p>{lesson.context}</p></section>
    {depth&&<section className={styles.stepsSection}><span className={styles.deepKicker}>APRENDA FAZENDO</span><h3>Passo a passo</h3><ol>{depth.steps.map((step,i)=><li key={i}><span>{i+1}</span><p>{step}</p></li>)}</ol></section>}
    <section className={styles.warning}><span aria-hidden="true">!</span><div><h3>Erro comum que você deve evitar</h3><p>{lesson.pitfall}</p></div></section>
    {depth&&<section className={styles.challenge}><span className={styles.deepKicker}>DESAFIO PRÁTICO</span><h3>Experimente resolver</h3><p>{depth.practice}</p><button type="button" aria-expanded={practiceOpen} onClick={()=>setPracticeOpen(v=>!v)}>{practiceOpen?"Ocultar resolução comentada":"Ver resolução comentada"} <span aria-hidden="true">{practiceOpen?"▴":"▾"}</span></button>{practiceOpen&&<div role="note" className={styles.solution}><strong>Resolução orientada</strong><p>{depth.solution}</p></div>}</section>}
    <section className={styles.exercise}>
     <div className={styles.exerciseHeading}><span>FIXAÇÃO DO CAPÍTULO</span><h3>Teste sua compreensão</h3><p>Duas questões comentadas por aula, além do desafio prático. Responda e confira sua justificativa.</p></div>
     <span className={styles.questionCount}>QUESTÃO 1 DE {secondQuiz?2:1}</span>
     <strong className={styles.question}>{lesson.question}</strong>
     <div className={styles.options} role="group" aria-label="Alternativas da questão">{chapterOrder.map((answerIndex,displayIndex)=>
      <button key={answerIndex} type="button" disabled={checked} aria-pressed={choice===answerIndex}
       className={styles.option+(choice===answerIndex?" "+styles.optionSelected:"")+(checked&&answerIndex===lesson.correct?" "+styles.optionCorrect:"")+(checked&&choice===answerIndex&&choice!==lesson.correct?" "+styles.optionIncorrect:"")}
       onClick={()=>setChoice(answerIndex)}>
       <b>{["A","B","C"][displayIndex]}</b><span>{lesson.options[answerIndex]}</span>
      </button>)}</div>
     {!checked?<button className={styles.verifyButton} type="button" disabled={choice===null} onClick={verify}>Conferir resposta</button>:
      <div className={styles.feedback} role="status"><strong>{choice===lesson.correct?"✓ Resposta correta! Capítulo concluído.":"Revise a explicação e tente novamente."}</strong>
       <p>{lesson.feedback||lesson.explain}</p>
       {choice!==lesson.correct&&<button type="button" onClick={()=>{setChoice(null);setChecked(false)}}>↻ Tentar novamente</button>}
      </div>}
     {secondQuiz&&<div className={styles.secondExercise}>
       <span className={styles.questionCount}>QUESTÃO 2 DE 2 · APLICAÇÃO</span>
       <strong className={styles.question}>{secondQuiz.question}</strong>
       <div className={styles.options} role="group" aria-label="Alternativas da segunda questão">{orderFor(lessonIndex,track.id.length+1).map((answerIndex,displayIndex)=>
        <button type="button" key={answerIndex} disabled={secondChecked} aria-pressed={secondChoice===answerIndex}
        className={styles.option+(secondChoice===answerIndex?" "+styles.optionSelected:"")+(secondChecked&&answerIndex===secondQuiz.correct?" "+styles.optionCorrect:"")+(secondChecked&&secondChoice===answerIndex&&answerIndex!==secondQuiz.correct?" "+styles.optionIncorrect:"")}
        onClick={()=>setSecondChoice(answerIndex)}><b>{["A","B","C"][displayIndex]}</b><span>{secondQuiz.options[answerIndex]}</span></button>)}</div>
       {!secondChecked?<button type="button" disabled={secondChoice===null} className={styles.verifyButton} onClick={verifySecond}>Conferir segunda resposta</button>:
        <div className={styles.feedback} role="status"><strong>{secondChoice===secondQuiz.correct?"✓ Resposta correta!":"Essa alternativa não é a adequada."}</strong><p>{secondQuiz.explanation}</p>{secondChoice!==secondQuiz.correct&&<button type="button" onClick={()=>{setSecondChoice(null);setSecondChecked(false)}}>↻ Tentar novamente</button>}</div>}
      </div>}
      <p className={styles.completionHint}>{completed.includes(lessonIndex)?"✓ Capítulo concluído. Continue para a próxima aula.":"A aula será marcada como concluída quando você acertar as duas questões."}</p>
    </section>
    <div className={styles.navigation}>
     <button type="button" onClick={()=>openLesson(Math.max(0,lessonIndex-1))} disabled={lessonIndex===0}>← Aula anterior</button>
     {lessonIndex<track.lessons.length-1?<button type="button" className={styles.next} onClick={()=>openLesson(lessonIndex+1)}>Próxima aula →</button>:<button type="button" className={styles.next} onClick={()=>{setTab("revisao");window.scrollTo({top:0,behavior:"smooth"})}}>Ir para revisão final →</button>}
    </div>
    <p className={styles.reference}>Leitura complementar: <a href={track.reference} target="_blank" rel="noopener noreferrer">Consultar referência da área ↗</a>. Material educativo introdutório; não equivale a certificação profissional.</p>
   </article>
  </div>:<section className={styles.review}>
   <div className={styles.reviewIntro}><span>REVISÃO DE APRENDIZAGEM</span><h2>Teste seu conhecimento em {track.name}</h2><p>São {reviewItems.length} questões contextualizadas. O gabarito comentado aparece depois de corrigir todas.</p></div>
   {reviewItems.map((item,i)=>{
    const shuffled=orderFor(i,track.id.length+1);
    return <div className={styles.reviewQuestion} key={item.title+"-"+i}>
     <small>QUESTÃO {String(i+1).padStart(2,"0")} DE {reviewItems.length} · {item.title}</small>
     <strong>{item.question}</strong>
     <div className={styles.options} role="group" aria-label={"Alternativas da questão "+(i+1)}>{shuffled.map((answerIndex,j)=>
      <button key={answerIndex} type="button" disabled={reviewChecked} aria-pressed={reviewAnswers[i]===answerIndex}
       className={styles.option+(reviewAnswers[i]===answerIndex?" "+styles.optionSelected:"")+(reviewChecked&&answerIndex===item.correct?" "+styles.optionCorrect:"")+(reviewChecked&&reviewAnswers[i]===answerIndex&&answerIndex!==item.correct?" "+styles.optionIncorrect:"")}
       onClick={()=>setReviewAnswers(current=>({...current,[i]:answerIndex}))}>
       <b>{["A","B","C"][j]}</b><span>{item.options[answerIndex]}</span></button>)}</div>
     {reviewChecked&&<p className={styles.reviewFeedback}><strong>{reviewAnswers[i]===item.correct?"✓ Correto.":"Resposta correta: "+item.options[item.correct]+"."}</strong> {item.explanation}</p>}
    </div>;
   })}
   {reviewChecked?<div className={styles.score} role="status"><strong>{reviewScore} de {reviewItems.length} questões corretas</strong><p>Revise as explicações antes de iniciar outra tentativa.</p><button onClick={()=>{setReviewAnswers({});setReviewChecked(false)}} type="button">↻ Fazer outra revisão</button></div>:
    <button type="button" className={styles.verifyButton} disabled={Object.keys(reviewAnswers).length!==reviewItems.length} onClick={()=>{setReviewChecked(true);track.lessons.forEach((item,i)=>{const entries=reviewItems.map((q,j)=>({...q,j})).filter(q=>q.chapter===i);if(entries.every(q=>reviewAnswers[q.j]===q.correct))markCompleted(i);});}}>Corrigir revisão ({Object.keys(reviewAnswers).length}/{reviewItems.length})</button>}
  </section>}
 </div>;
}
