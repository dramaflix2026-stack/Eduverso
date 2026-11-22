"use client";
import {useMemo,useState} from "react";
import {medicineDisciplines,type MedTopic} from "./medicine-curriculum";
import {advancedMedCourses} from "./medicine-advanced-catalog";
import styles from "./medicine-hub.module.css";
type Question=MedTopic&{discipline:string};
export default function MedicineMockExam({scope,onClose,profile="faculdade"}:{scope?:string|null;onClose:()=>void;profile?:"faculdade"|"revalida"}){
 const pool=useMemo(()=>{
  const originals=medicineDisciplines.filter(d=>(!scope||d.slug===scope)&&(profile!=="revalida"||d.cycle!=="basico"||d.slug==="saude-coletiva")).flatMap(d=>d.topics.map(topic=>({...topic,discipline:d.title,bank:"fundamentos" as const})));
  const deeper=Object.entries(advancedMedCourses).filter(([slug])=>(!scope||slug===scope)&&(profile!=="revalida"||medicineDisciplines.some(d=>d.slug===slug&&(d.cycle!=="basico"||slug==="saude-coletiva")))).flatMap(([,course])=>
   course.chapters.flatMap(ch=>ch.questions.map(q=>({
    id:q.id,name:ch.title,theory:q.explanation,example:ch.caseStudy,question:q.prompt,options:q.options,correct:q.correct,
    feedback:q.explanation,cycle:"basico" as const,discipline:course.title,bank:"aprofundado" as const
   }))));
  return [...originals,...deeper];
 },[scope,profile]);
 const [seed,setSeed]=useState(0);
 const [level,setLevel]=useState<"fundamentos"|"aprofundado">("aprofundado");
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [finished,setFinished]=useState(false);
 const questions=useMemo(()=>{
   // Variar seleção entre tentativas sem depender de serviços de IA.
   const eligible=pool.filter(q=>q.bank===level);
   const sorted=eligible.map((t,i)=>({t,sort:(i*23+seed*19)%Math.max(eligible.length,1)})).sort((a,b)=>a.sort-b.sort);
   return sorted.slice(0,Math.min(scope?10:15,sorted.length)).map(x=>x.t);
 },[pool,seed,scope,level]);
 const current=questions[index];
 const total=questions.length;
 const answered=Object.keys(answers).filter(id=>questions.some(q=>q.id===id)).length;
 const score=questions.filter(q=>answers[q.id]===q.correct).length;
 function next(){if(index+1<total)setIndex(i=>i+1);else setFinished(true)}
 function restart(){setSeed(n=>n+1);setIndex(0);setAnswers({});setFinished(false)}
 if(!total)return <div className={styles.empty}>Não há questões cadastradas para esse nível e recorte. Experimente outra disciplina.</div>;
 return <section className={styles.study} aria-label="Simulado de Medicina">
   <button className={styles.back} onClick={onClose} type="button">← Voltar ao catálogo</button>
   <span className={styles.eyebrow}>SIMULADO EDUVERSO · QUESTÕES AUTORAIS</span>
   <h2>{profile==="revalida"?"Treino clínico — Revalida e Residência":scope?"Simulado da disciplina":"Simulado geral de Medicina"}</h2>
   <p>Questões autorais do Eduverso: o modo aprofundado usa capítulos de estudo avançado; fundamentos usa exercícios introdutórios. A seleção clínica prioriza assuntos de ciclo clínico, internato e saúde coletiva, mas não reproduz o conteúdo oficial nem avalia competência profissional.</p>
   <div className={styles.filters} role="group" aria-label="Selecionar nível do simulado">
    <button type="button" aria-pressed={level==="aprofundado"} className={styles.filter+" "+(level==="aprofundado"?styles.filterActive:"")} onClick={()=>{setLevel("aprofundado");setIndex(0);setAnswers({});setFinished(false);setSeed(v=>v+1)}}>🔥 Banco aprofundado</button>
    <button type="button" aria-pressed={level==="fundamentos"} className={styles.filter+" "+(level==="fundamentos"?styles.filterActive:"")} onClick={()=>{setLevel("fundamentos");setIndex(0);setAnswers({});setFinished(false);setSeed(v=>v+1)}}>📘 Fundamentos</button>
   </div>
   {!finished&&current?<div className={styles.quiz}>
     <div className={styles.sectionHead}><h3>Questão {index+1} de {total}</h3><small>{current.discipline} · {level==="aprofundado"?"Aprofundamento":"Fundamentos"}</small></div>
     <p>{current.question}</p>
     <div className={styles.options}>
     {current.options.map((v,i)=><button key={i} className={answers[current.id]===i?styles.chosen:""} aria-pressed={answers[current.id]===i} onClick={()=>setAnswers(prev=>({...prev,[current.id]:i}))} type="button">{String.fromCharCode(65+i)}. {v}</button>)}
     </div>
     <div className={styles.actions}><button className={styles.secondary} onClick={()=>setIndex(i=>Math.max(0,i-1))} disabled={index===0} type="button">← Anterior</button><button className={styles.primary} disabled={answers[current.id]===undefined} onClick={next} type="button">{index===total-1?"Corrigir simulado":"Próxima questão →"}</button></div>
     <span className={styles.note}>{answered} de {total} respondidas · Você poderá conferir todas as respostas ao finalizar.</span>
    </div>:<div className={styles.quiz}>
     <h3>Resultado: {score} de {total} acertos ({Math.round(100*score/total)}%)</h3>
     <p>Revise especialmente as questões em que você errou. Um simulado introdutório não mede competência clínica ou substitui avaliações acadêmicas.</p>
     {questions.map((q,i)=><div key={q.id} className={styles.feedback}><strong>{answers[q.id]===q.correct?"✓":"✕"} {i+1}. {q.discipline} — {q.name}</strong><p>{q.question}</p><p>Resposta: {q.options[q.correct]}. {q.theory}</p></div>)}
     <div className={styles.actions}><button className={styles.primary} onClick={restart}>Novo simulado ↗</button><button className={styles.secondary} onClick={onClose}>Voltar à faculdade</button></div>
    </div>}
  </section>;
}
