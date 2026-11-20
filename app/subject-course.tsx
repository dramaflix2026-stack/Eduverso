"use client";
import {useEffect,useState} from "react";
import {getLessons} from "./course-catalog";

export default function SubjectCourse({subject,topic}:{subject:string;topic:string}){
 const lessons=getLessons(subject,topic);
 const [active,setActive]=useState(0);
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [checked,setChecked]=useState<Record<string,boolean>>({});
 const [list,setList]=useState(1);
 const [count,setCount]=useState(5);
 const [attempt,setAttempt]=useState(0);
 const [practiceAnswers,setPracticeAnswers]=useState<Record<number,number>>({});
 const [graded,setGraded]=useState(false);
 const key=subject+"|"+topic;
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem("eduverso-subject-progress-v1")||"{}");if(Number.isInteger(saved[key]))setActive(Math.min(lessons.length-1,Math.max(0,saved[key])))}catch{}},[key,lessons.length]);
 function selectLesson(i:number){setActive(i);try{const saved=JSON.parse(localStorage.getItem("eduverso-subject-progress-v1")||"{}");saved[key]=i;localStorage.setItem("eduverso-subject-progress-v1",JSON.stringify(saved))}catch{}}
 if(!lessons.length)return <p>Conteúdo desta trilha em preparação.</p>;
 const lesson=lessons[active];
 const questionKey=key+"|"+active+"|"+list+"|"+attempt;
 const choice=answers[questionKey];
 const done=checked[questionKey];
 function reset(){setAttempt(v=>v+1);setPracticeAnswers({});setGraded(false)}
 const offset=((list-1)*Math.ceil(lessons.length/3)+attempt)%lessons.length;
 const selectedLessons=Array.from({length:Math.min(count,lessons.length)},(_,i)=>lessons[(offset+i)%lessons.length]);
 const score=selectedLessons.filter((l,i)=>practiceAnswers[i]===l.correct).length;
 return <div className="subject-course">
  <div className="fraction-top"><div><span className="eyebrow">CURSO · {subject.toUpperCase()}</span><h2>{topic} na prática</h2><p>Estude os conceitos, exemplos e atividades desta trilha.</p></div><div className="fraction-progress"><strong>Aula {active+1} de {lessons.length}</strong><div className="fraction-track"><span style={{width:(active+1)/lessons.length*100+"%"}}/></div></div></div>
  <div className="math-modules">{[{title:"Fundamentos",items:lessons.length>=10?[0,1,2]:lessons.length>3?[0,1]:[0]},{title:"Aplicações",items:lessons.length>=10?[3,4,5,6]:lessons.length>3?[2,3]:[1]},{title:"Revisão e prática",items:lessons.length>=10?Array.from({length:lessons.length-7},(_,i)=>i+7):lessons.length>3?Array.from({length:lessons.length-4},(_,i)=>i+4):[2]}].map(module=><details className="math-module" key={module.title} style={{border:"1px solid #403750",borderRadius:16,overflow:"hidden",marginBottom:12,background:"#191627"}}><summary style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"18px 20px",cursor:"pointer",listStyle:"none",fontWeight:800,color:"#f1eaff"}}><span>{module.title}</span><span style={{display:"flex",alignItems:"center",gap:12,color:"#b9a6d5",fontSize:14,fontWeight:600}}>{module.items.filter(i=>i<lessons.length).length} aula(s) <span aria-hidden="true" style={{fontSize:19}}>⌄</span></span></summary><div className="fraction-steps" style={{padding:"0 14px 16px"}}>{module.items.filter(i=>i<lessons.length).map(i=><button key={i} className={active===i?"current":""} aria-current={active===i?"step":undefined} onClick={()=>selectLesson(i)}><span>{String(i+1).padStart(2,"0")}</span>{lessons[i].title}</button>)}</div></details>)}</div>
  <article className="subject-lesson"><span className="eyebrow">AULA {String(active+1).padStart(2,"0")} / {String(lessons.length).padStart(2,"0")}</span><h3>{lesson.title}</h3>
  <div className="subject-example"><strong>Entenda o conteúdo</strong><p>{lesson.explain}</p><strong>Exemplo de aplicação</strong><p>{lesson.example}</p><p>Agora tente resolver a atividade abaixo. A resposta e a explicação da questão aparecem somente após a correção.</p></div>
  <div className="subject-quiz"><span className="eyebrow">VERIFIQUE SEU APRENDIZADO</span><h4>{lesson.question}</h4>{lesson.options.map((option,i)=><button key={i} disabled={done} className={"subject-answer "+(choice===i?"selected ":"")+(done&&i===lesson.correct?"correct":"")} onClick={()=>setAnswers(a=>({...a,[questionKey]:i}))}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}<button className="subject-primary" disabled={choice===undefined||done} onClick={()=>setChecked(c=>({...c,[questionKey]:true}))}>Corrigir resposta</button>{done&&<div role="status" className="subject-feedback"><strong>{choice===lesson.correct?"✓ Resposta correta!":"Vamos revisar a questão."}</strong><p><b>Questão:</b> {lesson.question}</p><p><b>Resposta correta:</b> {lesson.options[lesson.correct]}</p><p><b>Explicação:</b> {lesson.feedback.replace(/^Resposta:\s*[^.]+\.\s*/i,"")}</p></div>}</div>
  <div className="subject-extras">
   <details><summary>📝 Listas de exercícios <span>+</span></summary><div className="subject-detail"><p>Escolha a lista, marque as respostas e confira o gabarito correspondente.</p><div className="subject-list-tabs">{[1,2,3].map(n=><button key={n} className={list===n?"current":""} onClick={()=>{setList(n);reset()}}>Lista {n}</button>)}</div><label>Quantidade de perguntas <select value={count} onChange={e=>{setCount(Number(e.target.value));setPracticeAnswers({});setGraded(false)}}>{[5,10,15,20].map(n=><option key={n} value={n}>{n}</option>)}</select></label><p className="subject-note">{selectedLessons.length} questões nesta lista, de {lessons.length} disponíveis. As listas variam o ponto de partida; questões podem se repetir entre listas quando o banco é limitado.</p><div className="subject-practice">{selectedLessons.map((l,i)=><fieldset key={list+"-"+attempt+"-"+i} style={{border:0,borderBottom:"1px solid #493d5c",padding:"18px 0",margin:0,minWidth:0}}><legend style={{fontWeight:750,paddingBottom:12}}>{i+1}. {l.question}</legend>{l.options.map((option,j)=><label key={j} style={{display:"flex",alignItems:"center",gap:12,padding:"12px",marginBottom:8,border:"1px solid #4b405e",borderRadius:12,cursor:"pointer",background:practiceAnswers[i]===j?"#43315e":"transparent"}}><input type="radio" name={"practice-"+key+"-"+list+"-"+attempt+"-"+i} checked={practiceAnswers[i]===j} onChange={()=>{setPracticeAnswers(p=>({...p,[i]:j}));setGraded(false)}}/><span><b>{String.fromCharCode(65+j)}.</b> {option}</span></label>)}{graded&&<p role="status">{practiceAnswers[i]===l.correct?"✓ Correto.":"Resposta correta: "+l.options[l.correct]+"."}</p>}</fieldset>)}</div><button className="subject-primary" disabled={Object.keys(practiceAnswers).length!==selectedLessons.length} onClick={()=>setGraded(true)}>Corrigir lista</button>{graded&&<p role="status" className="subject-feedback">Você acertou {score} de {selectedLessons.length} questões. Confira as explicações em Resoluções comentadas.</p>} <button className="subject-primary" onClick={reset}>Refazer lista</button></div></details>
   <details><summary>📖 Resoluções comentadas <span>+</span></summary><div className="subject-detail"><p>Gabarito da Lista {list}: as mesmas {selectedLessons.length} questões, na mesma ordem.</p>{selectedLessons.map((l,i)=><div className="subject-solution" key={list+"-"+attempt+"-"+i}><strong>{i+1}. {l.question}</strong><p><b>✓ Resposta correta:</b> {l.options[l.correct]}</p><p>{l.feedback}</p></div>)}</div></details>
   <details><summary>↓ Materiais para estudar <span>+</span></summary><div className="subject-detail"><p>Você pode imprimir ou salvar o conteúdo desta aula em PDF pelo navegador.</p><button className="subject-primary" onClick={()=>window.print()}>Imprimir ou salvar como PDF</button></div></details>
  </div>
  <div className="subject-pagination"><button disabled={active===0} onClick={()=>selectLesson(active-1)}>← Aula anterior</button><button disabled={active===lessons.length-1} onClick={()=>selectLesson(active+1)}>Próxima aula →</button></div>
  </article>
 </div>
}
