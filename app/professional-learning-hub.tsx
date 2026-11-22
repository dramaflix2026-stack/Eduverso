"use client";
import {useEffect,useMemo,useState} from "react";
import {getProfessionalTrack,professionalTracks} from "./learning-professions";
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

 useEffect(()=>{
  setCompleted(readProgress(track.id,track.lessons.length));
  setLessonIndex(0);setTab("aulas");setChoice(null);setChecked(false);
  setReviewAnswers({});setReviewChecked(false);
 },[track.id,track.lessons.length]);

 const lesson=track.lessons[Math.min(lessonIndex,track.lessons.length-1)];
 const progress=Math.round(100*completed.length/Math.max(track.lessons.length,1));
 const chapterOrder=useMemo(()=>orderFor(lessonIndex,track.id.length),[lessonIndex,track.id]);
 const reviewScore=track.lessons.reduce((total,item,i)=>total+(reviewAnswers[i]===item.correct?1:0),0);

 function openLesson(index:number){
  setTab("aulas");setLessonIndex(index);setChoice(null);setChecked(false);
  if(typeof window!=="undefined")window.scrollTo({top:0,behavior:"smooth"});
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
  if(choice===lesson.correct)markCompleted(lessonIndex);
 }
 function switchTrack(id:string){
  onSelectTrack(id);
 }
 if(!lesson)return <section className={styles.root}><p>Esta formação ainda não possui capítulos cadastrados.</p></section>;
 return <div className={styles.root}>
  <header className={styles.hero}>
   <span className={styles.kicker}>✦ EDUVERSO · FORMAÇÕES PROFISSIONAIS</span>
   <div className={styles.heroMain}><div className={styles.heroCopy}>
    <div className={styles.heroIcon}>{track.icon}</div>
    <div><p className={styles.category}>{track.category}</p><h1>{track.name}<span>.</span></h1><p className={styles.description}>{track.description} Estude os fundamentos, veja aplicações práticas e revise com questões comentadas.</p></div>
   </div><button type="button" className={styles.bookletButton} onClick={()=>onOpenBooklet(track.id)}>↓ Gerar apostila PDF</button></div>
   <div className={styles.heroNumbers}>
    <span><strong>{track.lessons.length}</strong> capítulos com conteúdo</span>
    <span><strong>{track.lessons.length}</strong> questões de revisão</span>
    <span><strong>{completed.length}/{track.lessons.length}</strong> aulas concluídas neste navegador</span>
   </div>
   <div className={styles.progressText}><span>Minha evolução nesta formação</span><b>{progress}%</b></div>
   <div className={styles.progressBar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Aulas concluídas"><span style={{width:progress+"%"}}/></div>
  </header>

  <section className={styles.switcher} aria-label="Escolha uma formação profissional">
   <div className={styles.sectionTitle}><div><span>EXPLORE OUTRAS ÁREAS</span><h2>Formações disponíveis</h2></div></div>
   <div className={styles.trackGrid}>{professionalTracks.map(item=>
    <button type="button" key={item.id} aria-pressed={track.id===item.id}
     className={styles.trackCard+(track.id===item.id?" "+styles.trackActive:"")}
     onClick={()=>switchTrack(item.id)}>
     <span className={styles.trackEmoji}>{item.icon}</span><span><strong>{item.name}</strong><small>{item.lessons.length} capítulos · {item.category}</small></span><span aria-hidden="true">↗</span>
    </button>)}</div>
  </section>

  <div className={styles.tabBar} role="group" aria-label="Modo de aprendizado">
   <button type="button" aria-pressed={tab==="aulas"} className={tab==="aulas"?styles.tabActive:""} onClick={()=>setTab("aulas")}>📖 Aulas e conteúdos</button>
   <button type="button" aria-pressed={tab==="revisao"} className={tab==="revisao"?styles.tabActive:""} onClick={()=>setTab("revisao")}>📝 Revisão final ({track.lessons.length} questões)</button>
  </div>

  {tab==="aulas"?<div className={styles.studyLayout}>
   <aside className={styles.syllabus}>
    <div className={styles.syllabusTitle}><span>SEU ROTEIRO DE ESTUDO</span><h2>Capítulos</h2><p>Selecione um para abrir a aula completa.</p></div>
    <div className={styles.chapterList}>{track.lessons.map((item,i)=>
     <button type="button" key={item.title} aria-current={lessonIndex===i?"step":undefined}
      className={styles.chapter+(lessonIndex===i?" "+styles.chapterCurrent:"")} onClick={()=>openLesson(i)}>
      <span className={styles.chapterNumber}>{completed.includes(i)?"✓":String(i+1).padStart(2,"0")}</span>
      <span><strong>{item.title}</strong><small>{completed.includes(i)?"Concluído":"Abrir aula e praticar"}</small></span><span aria-hidden="true">›</span>
     </button>)}</div>
   </aside>

   <article className={styles.lessonCard}>
    <div className={styles.lessonTop}><span>CAPÍTULO {String(lessonIndex+1).padStart(2,"0")} DE {String(track.lessons.length).padStart(2,"0")}</span><span>{completed.includes(lessonIndex)?"✓ Concluído":"Leitura + atividade"}</span></div>
    <h2>{lesson.title}</h2>
    <section className={styles.reading}><h3>Entenda o conteúdo</h3><p>{lesson.explain||lesson.body}</p></section>
    <section className={styles.example}><div className={styles.noteIcon}>✦</div><div><h3>Exemplo aplicado</h3><p>{lesson.example}</p></div></section>
    <section className={styles.reading}><h3>Na prática profissional</h3><p>{lesson.context}</p></section>
    <section className={styles.warning}><span aria-hidden="true">!</span><div><h3>Erro comum que você deve evitar</h3><p>{lesson.pitfall}</p></div></section>
    <section className={styles.exercise}>
     <div className={styles.exerciseHeading}><span>FIXAÇÃO DO CAPÍTULO</span><h3>Agora pratique</h3><p>Responda à pergunta antes de visualizar a explicação.</p></div>
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
    </section>
    <div className={styles.navigation}>
     <button type="button" onClick={()=>openLesson(Math.max(0,lessonIndex-1))} disabled={lessonIndex===0}>← Aula anterior</button>
     {lessonIndex<track.lessons.length-1?<button type="button" className={styles.next} onClick={()=>openLesson(lessonIndex+1)}>Próxima aula →</button>:<button type="button" className={styles.next} onClick={()=>{setTab("revisao");window.scrollTo({top:0,behavior:"smooth"})}}>Ir para revisão final →</button>}
    </div>
    <p className={styles.reference}>Leitura complementar: <a href={track.reference} target="_blank" rel="noopener noreferrer">Consultar referência da área ↗</a>. Material educativo introdutório; não equivale a certificação profissional.</p>
   </article>
  </div>:<section className={styles.review}>
   <div className={styles.reviewIntro}><span>REVISÃO DE APRENDIZAGEM</span><h2>Teste seu conhecimento em {track.name}</h2><p>São {track.lessons.length} questões dos capítulos desta formação. O gabarito comentado aparece depois de corrigir.</p></div>
   {track.lessons.map((item,i)=>{
    const shuffled=orderFor(i,track.id.length+1);
    return <div className={styles.reviewQuestion} key={item.title}>
     <small>QUESTÃO {String(i+1).padStart(2,"0")} · {item.title}</small>
     <strong>{item.question}</strong>
     <div className={styles.options} role="group" aria-label={"Alternativas da questão "+(i+1)}>{shuffled.map((answerIndex,j)=>
      <button key={answerIndex} type="button" disabled={reviewChecked} aria-pressed={reviewAnswers[i]===answerIndex}
       className={styles.option+(reviewAnswers[i]===answerIndex?" "+styles.optionSelected:"")+(reviewChecked&&answerIndex===item.correct?" "+styles.optionCorrect:"")+(reviewChecked&&reviewAnswers[i]===answerIndex&&answerIndex!==item.correct?" "+styles.optionIncorrect:"")}
       onClick={()=>setReviewAnswers(current=>({...current,[i]:answerIndex}))}>
       <b>{["A","B","C"][j]}</b><span>{item.options[answerIndex]}</span></button>)}</div>
     {reviewChecked&&<p className={styles.reviewFeedback}><strong>{reviewAnswers[i]===item.correct?"✓ Correto.":"Resposta correta: "+item.options[item.correct]+"."}</strong> {item.feedback}</p>}
    </div>;
   })}
   {reviewChecked?<div className={styles.score} role="status"><strong>{reviewScore} de {track.lessons.length} questões corretas</strong><p>Revise as explicações antes de iniciar outra tentativa.</p><button onClick={()=>{setReviewAnswers({});setReviewChecked(false)}} type="button">↻ Fazer outra revisão</button></div>:
    <button type="button" className={styles.verifyButton} disabled={Object.keys(reviewAnswers).length!==track.lessons.length} onClick={()=>{setReviewChecked(true);track.lessons.forEach((item,i)=>{if(reviewAnswers[i]===item.correct)markCompleted(i);});}}>Corrigir revisão ({Object.keys(reviewAnswers).length}/{track.lessons.length})</button>}
  </section>}
 </div>;
}
