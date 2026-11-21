"use client";
import {useMemo,useState} from "react";
import {getLessons} from "./course-catalog";
import {getSuggestedPrepTracks,type PrepGoal} from "./preparation-catalog";
import styles from "./preparation-study-tools.module.css";

type Props={goal:PrepGoal;onOpenTrack:(subject:string,topic:string)=>void};
export default function PreparationStudyTools({goal,onOpenTrack}:Props){
 const tracks=getSuggestedPrepTracks(goal);
 const [trackIndex,setTrackIndex]=useState(0);
 const [lessonIndex,setLessonIndex]=useState(0);
 const [option,setOption]=useState<number|null>(null);
 const [submitted,setSubmitted]=useState(false);
 const [mode,setMode]=useState<"aula"|"questoes">("aula");
 const target=tracks[Math.min(trackIndex,Math.max(0,tracks.length-1))];
 const lessons=useMemo(()=>target?getLessons(target.subject,target.topic):[],[target?.subject,target?.topic]);
 const index=Math.min(lessonIndex,Math.max(0,lessons.length-1));
 const lesson=lessons[index];
 function chooseTrack(n:number){setTrackIndex(n);setLessonIndex(0);setOption(null);setSubmitted(false)}
 function next(){setLessonIndex(i=>Math.min(i+1,lessons.length-1));setOption(null);setSubmitted(false)}
 if(!target||!lesson)return <div className={styles.notice}>Ainda não existem aulas internas para este objetivo. Use as trilhas de disciplinas para começar.</div>;
 return <div className={styles.tools}>
  <div className={styles.notice}><strong>Banco de estudos disponível.</strong> Aqui você pratica com as aulas já cadastradas no Eduverso. Não é conteúdo gerado por IA, nem questões oficiais de uma prova passada. A geração generativa personalizada será ativada após integração segura de autenticação e API.</div>
  <div className={styles.controls}>
   <label htmlFor="prep-select-topic">Escolha uma trilha</label>
   <select id="prep-select-topic" value={trackIndex} onChange={e=>chooseTrack(Number(e.target.value))}>{tracks.map((t,i)=><option key={t.subject+"|"+t.topic} value={i}>{t.subject} · {t.topic}</option>)}</select>
  </div>
  <div className={styles.tabs} role="group" aria-label="Modo de estudo">
   <button aria-pressed={mode==="aula"} className={mode==="aula"?styles.active:""} onClick={()=>{setMode("aula");setOption(null);setSubmitted(false)}}>📚 Aprender</button>
   <button aria-pressed={mode==="questoes"} className={mode==="questoes"?styles.active:""} onClick={()=>{setMode("questoes");setOption(null);setSubmitted(false)}}>✍️ Praticar</button>
  </div>
  <article className={styles.lesson}>
   <span className={styles.overline}>{target.subject} · Aula {index+1} de {lessons.length}</span>
   <h3>{lesson.title}</h3>
   <p>{lesson.explain}</p>
   <div className={styles.example}><strong>Exemplo comentado</strong><p>{lesson.example}</p></div>
   {mode==="questoes"&&<div className={styles.question}>
    <h4>Hora de praticar</h4>
    <p>{lesson.question}</p>
    <div className={styles.options}>{lesson.options.map((v,i)=><button key={i} type="button" aria-pressed={option===i} disabled={submitted} className={option===i?styles.selected:""} onClick={()=>setOption(i)}>{String.fromCharCode(65+i)}. {v}</button>)}</div>
    {!submitted?<button className={styles.primary} disabled={option===null} onClick={()=>setSubmitted(true)}>Conferir resposta</button>:<div role="status" className={styles.answer}><strong>{option===lesson.correct?"✓ Correto!":"✕ Vamos revisar"}</strong><p>{lesson.feedback}</p></div>}
   </div>}
   <div className={styles.actions}><button onClick={()=>{setLessonIndex(i=>Math.max(i-1,0));setOption(null);setSubmitted(false)}} disabled={index===0}>← Anterior</button><button onClick={next} disabled={index>=lessons.length-1}>Próxima aula →</button><button className={styles.primary} onClick={()=>onOpenTrack(target.subject,target.topic)}>Abrir trilha completa ↗</button></div>
  </article>
 </div>;
}
