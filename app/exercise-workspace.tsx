"use client";
import {useMemo,useState} from "react";
import type {LessonSource,ExerciseItem} from "./exercise-bank";
import {buildExercises} from "./exercise-bank";
import {downloadStudyPdf,type PdfSection} from "./lib/lesson-pdf";
import styles from "./exercise-workspace.module.css";

type Props={
 subject:string;topic:string;lessonTitle:string;lessonExplain:string;lessonExample:string;
 lessons:LessonSource[];mathStages?:boolean;
};
type Panel="listas"|"resolucoes"|"materiais";
const labels:Record<Panel,string>={listas:"📝 Listas de exercícios",resolucoes:"📖 Resoluções comentadas",materiais:"↓ Materiais para baixar"};
const stages=["Fundamentos","Desenvolvimento","Aprofundamento"] as const;
const cleanFilename=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,70);
export default function ExerciseWorkspace({subject,topic,lessonTitle,lessonExplain,lessonExample,lessons,mathStages=false}:Props){
 const [opened,setOpened]=useState<Panel|null>(null);
 const [listNumber,setListNumber]=useState(1);
 const [count,setCount]=useState(10);
 const [attempt,setAttempt]=useState(0);
 const [level,setLevel]=useState(0);
 const [answers,setAnswers]=useState<Record<number,number>>({});
 const [submitted,setSubmitted]=useState(false);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const focus=useMemo(()=>{
  if(!mathStages)return undefined;
  const length=lessons.length;
  const starts=[0,Math.floor(length/3),Math.floor(2*length/3)];
  const ends=[Math.max(1,Math.floor(length/3)),Math.max(1,Math.floor(2*length/3)),length];
  const ids=Array.from({length:Math.max(0,ends[level]-starts[level])},(_,n)=>n+starts[level]);
  return ids.length?ids:undefined;
 },[lessons.length,mathStages,level]);
 const selected=buildExercises(lessons,count,(listNumber-1)*17+attempt*41,focus,subject,topic);
 const scored=selected.filter((q,i)=>answers[i]===q.correct).length;
 const answered=selected.filter((_,i)=>answers[i]!==undefined).length;
 const fallbackCount=selected.filter(q=>q.sourceIndex>=0&&focus&&!focus.includes(q.sourceIndex)&&q.kind!=="calculado").length;
 function clear(){setAnswers({});setSubmitted(false);setNotice("");}
 function changeList(n:number){setListNumber(n);setAttempt(0);clear();}
 function next(){setAttempt(n=>n+1);clear();}
 const base=`Disciplina: ${subject}. Tema: ${topic}. Aula: ${lessonTitle}.\nExplicação: ${lessonExplain}.\nExemplo: ${lessonExample}.\n`+
  lessons.slice(0,10).map(l=>`Aula ${l.title}. Conceito: ${l.body||l.explain||""}. Exemplo: ${l.example}`).join("\n");
 async function saveAnswers(){
  setBusy(true);setNotice("");
  try{
   const sections:PdfSection[]=[
    {heading:"Minhas respostas",paragraphs:[`Disciplina: ${subject} | Tema: ${topic} | Lista ${listNumber} | Rodada ${attempt+1}`,`Questões respondidas: ${answered} de ${selected.length}. ${submitted?"Pontuação: "+scored+" acertos.":"Correção ainda não finalizada."}`]},
    ...selected.map((q,i)=>({
     heading:`Questão ${i+1}: ${q.sourceTitle}`,
     paragraphs:[
      q.question,
      ...q.options.map((option,n)=>`${String.fromCharCode(65+n)}) ${option}`),
      `Minha resposta: ${answers[i]===undefined?"Não respondida":String.fromCharCode(65+answers[i])+") "+q.options[answers[i]]}`,
      `Resposta correta: ${String.fromCharCode(65+q.correct)}) ${q.options[q.correct]}`,
      `Comentário: ${q.explanation}`
     ]
    }))
   ];
   await downloadStudyPdf({
    title:"Minhas questões e respostas",subtitle:subject+" | "+topic,
    fileName:`eduverso-minhas-respostas-${cleanFilename(topic)}-lista-${listNumber}.pdf`,sections,
    note:"Material de apoio do Eduverso. Inclui as respostas assinaladas no navegador e o gabarito. Confira as explicações antes de reutilizar o conteúdo."
   });
   setNotice("PDF de suas questões, alternativas, respostas e correções preparado.");
  }catch{setNotice("Não foi possível criar o PDF. Tente novamente.");}
  finally{setBusy(false);}
 }
 async function saveGuide(){
  setBusy(true);setNotice("");
  let material="";let ai=false;let fallback="";
  try{
   const result=await fetch("/api/estudos/gerar",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({subject,topic,title:lessonTitle,material:base.slice(0,5600)})});
   if(result.ok){const data=await result.json();if(typeof data.material==="string"&&data.generatedByAI===true){material=data.material;ai=true;}}
   else if(result.status===401)fallback="Você precisa entrar na conta para usar IA; foi criado um guia de estudo com base nas aulas.";
   else fallback="A IA ainda não está ativa; o arquivo reúne conteúdo revisado do catálogo editorial.";
  }catch{fallback="O gerador de IA está indisponível; o arquivo reúne conteúdo editorial do Eduverso.";}
  try{
   const guide=ai?[
    {heading:"Novo material elaborado por inteligência artificial",paragraphs:material.split("\n").filter(Boolean)}
   ]:[
    {heading:"O que você vai aprender",paragraphs:[`Tema: ${topic}`,`Objetivo: compreender ${lessonTitle}, reconhecer o conceito e praticar aplicações.`]},
    {heading:"Primeiro, entenda a matéria",paragraphs:[lessonExplain,lessonExample]},
    ...lessons.slice(0,8).map((l,i)=>({heading:`${i+1}. ${l.title}`,paragraphs:[l.body||l.explain||"Releia o conteúdo da aula para aprofundar.",`Exemplo aplicado: ${l.example}`]})),
    {heading:"Pratique com questões comentadas",paragraphs:selected.slice(0,10).flatMap((q,i)=>[
     `${i+1}. ${q.question}`,
     ...q.options.map((a,j)=>`${String.fromCharCode(65+j)}) ${a}`),
     `Gabarito: ${String.fromCharCode(65+q.correct)}) ${q.options[q.correct]}`,
     `Explicação: ${q.explanation}`
    ])},
    {heading:"Checklist de revisão ativa",paragraphs:[
     "Explique em voz alta os conceitos com suas próprias palavras.",
     "Refaça as questões erradas sem consultar o gabarito.",
     "Volte às aulas que apresentaram dificuldade e compare os exemplos.",
     "Revise este material depois de um intervalo de estudo."
    ]}
   ];
   await downloadStudyPdf({
    title:"Novo material de estudo",subtitle:subject+" | "+topic,
    fileName:`eduverso-novo-material-${cleanFilename(topic)}.pdf`,sections:guide,
    note:ai?"Conteúdo gerado por IA a partir de aulas do Eduverso. Pode conter imprecisões; revise as respostas e os conceitos com fontes confiáveis.":"Guia montado automaticamente a partir das aulas cadastradas no Eduverso. Não é conteúdo criado por inteligência artificial."
   });
   setNotice(ai?"Novo material gerado por IA e PDF preparado. Revise as explicações.":fallback||"PDF preparado a partir das aulas cadastradas; não utiliza IA.");
  }catch{setNotice("Não foi possível gerar o material em PDF. Tente novamente.");}
  finally{setBusy(false);}
 }
 return <section className={styles.wrapper} aria-label="Central de exercícios e materiais">
  <h3 className={styles.heading}>Continue aprendendo: {lessonTitle}</h3>
  {(["listas","resolucoes","materiais"] as const).map(panel=><div key={panel} className={styles.card}>
   <button type="button" className={styles.cardToggle} aria-expanded={opened===panel} onClick={()=>{setOpened(opened===panel?null:panel);setNotice("");}}>
    <span>{labels[panel]}</span><span className={styles.toggleIcon}>{opened===panel?"−":"+"}</span>
   </button>
   {opened===panel&&<div className={styles.body}>
    {panel==="materiais"?<>
     <p>Escolha um dos dois downloads. O primeiro reúne sua lista e as respostas que você marcou. O segundo prepara um novo roteiro de revisão do assunto, com exemplos e exercícios.</p>
     <div className={styles.downloadGrid}>
      <button type="button" className={styles.primary} disabled={busy} onClick={saveAnswers}>↓ Baixar minhas questões e respostas</button>
      <button type="button" className={styles.secondary} disabled={busy} onClick={saveGuide}>✦ Gerar e baixar novo material</button>
     </div>
     <p className={styles.hint}>O segundo material é montado a partir das aulas do Eduverso. Quando um provedor de IA estiver habilitado, ele poderá produzir um texto novo e será identificado como gerado por IA.</p>
    </>:<>
     <p>{panel==="listas"?"Escolha quantas perguntas deseja responder. Cada lista apresenta questões diferentes, sem repetir enunciados no mesmo conjunto.":"Veja o gabarito e a explicação das questões selecionadas na lista atual."}</p>
     <div className={styles.tabs} role="group" aria-label="Escolha uma lista">
      {[1,2,3,4,5,6].map(n=><button type="button" key={n} aria-pressed={listNumber===n} className={listNumber===n?styles.active:""} onClick={()=>changeList(n)}>Lista {n}</button>)}
     </div>
     <div className={styles.filters}>
      {mathStages&&<label>Etapa do currículo<select value={level} onChange={e=>{setLevel(Number(e.target.value));clear();}}>{stages.map((s,i)=><option value={i} key={s}>{s}</option>)}</select></label>}
      <label>Quantidade de questões<select value={count} onChange={e=>{setCount(Number(e.target.value));clear();}}>{[5,10,15,20,30,50].map(n=><option key={n} value={n}>{n} questões</option>)}</select></label>
     </div>
     <p className={styles.info}>Lista {listNumber} · Rodada {attempt+1} · <strong>{selected.length} questões diferentes</strong></p>
     {selected.length<count&&<p className={styles.warning} role="status">Há {selected.length} questões distintas disponíveis neste conteúdo. Não repetimos ou inventamos perguntas para completar as {count} solicitadas.</p>}
     {fallbackCount>0&&<p className={styles.note}>Para completar esta quantidade sem repetir, {fallbackCount} questões foram selecionadas de outras etapas do mesmo tema.</p>}
     {panel==="listas"?<div className={styles.questions}>
      {selected.map((q,i)=><fieldset className={styles.question} key={listNumber+"-"+attempt+"-"+i}>
       <legend>{i+1}. {q.question}</legend>
       {q.options.map((option,j)=><label className={styles.answer+" "+(answers[i]===j?styles.chosen:"")} key={j}>
        <input type="radio" name={`eduverso-q-${subject}-${topic}-${listNumber}-${attempt}-${i}`} checked={answers[i]===j} disabled={submitted}
         onChange={()=>{setAnswers(p=>({...p,[i]:j}));setSubmitted(false)}}/>
        <span>{String.fromCharCode(65+j)}) {option}</span>
       </label>)}
       {submitted&&<div role="status" className={styles.solution}><strong>{answers[i]===q.correct?"✓ Resposta correta":`Resposta correta: ${String.fromCharCode(65+q.correct)}) ${q.options[q.correct]}`}</strong><p>{q.explanation}</p></div>}
      </fieldset>)}
     </div>:<div className={styles.questions}>
      {selected.map((q,i)=><div className={styles.question} key={i}><strong>{i+1}. {q.question}</strong><p className={styles.correct}>✓ {String.fromCharCode(65+q.correct)}) {q.options[q.correct]}</p><p>{q.explanation}</p></div>)}
     </div>}
     {panel==="listas"&&<>
      <button className={styles.primary} type="button" disabled={answered<selected.length||selected.length===0||submitted} onClick={()=>setSubmitted(true)}>Finalizar e corrigir lista</button>
      {submitted&&<p className={styles.score} role="status">Você acertou {scored} de {selected.length} questões.</p>}
      <button className={styles.secondary} type="button" onClick={next}>↻ Gerar outra rodada</button>
     </>}
    </>}
    {notice&&<p className={styles.notice} role="status">{notice}</p>}
   </div>}
  </div>)}
 </section>;
}
