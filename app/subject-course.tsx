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
 const key=subject+"|"+topic;
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem("eduverso-subject-progress-v1")||"{}");if(Number.isInteger(saved[key]))setActive(Math.min(lessons.length-1,Math.max(0,saved[key])))}catch{}},[key,lessons.length]);
 function selectLesson(i:number){setActive(i);try{const saved=JSON.parse(localStorage.getItem("eduverso-subject-progress-v1")||"{}");saved[key]=i;localStorage.setItem("eduverso-subject-progress-v1",JSON.stringify(saved))}catch{}}
 if(!lessons.length)return <p>Conteúdo desta trilha em preparação.</p>;
 const lesson=lessons[active];
 const questionKey=key+"|"+active+"|"+list+"|"+attempt;
 const choice=answers[questionKey];
 const done=checked[questionKey];
 function reset(){setAttempt(v=>v+1)}
 return <div className="subject-course">
  <div className="fraction-top"><div><span className="eyebrow">CURSO · {subject.toUpperCase()}</span><h2>{topic} na prática</h2><p>Estude os conceitos, exemplos e atividades desta trilha.</p></div><div className="fraction-progress"><strong>Aula {active+1} de {lessons.length}</strong><div className="fraction-track"><span style={{width:(active+1)/lessons.length*100+"%"}}/></div></div></div>
  <div className="math-modules">{[{title:"Fundamentos",items:lessons.length>3?[0,1]:[0]},{title:"Aplicações",items:lessons.length>3?[2,3]:[1]},{title:"Revisão e prática",items:lessons.length>3?Array.from({length:lessons.length-4},(_,i)=>i+4):[2]}].map(module=><details className="math-module" key={module.title} style={{border:"1px solid #403750",borderRadius:16,overflow:"hidden",marginBottom:12,background:"#191627"}}><summary style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"18px 20px",cursor:"pointer",listStyle:"none",fontWeight:800,color:"#f1eaff"}}><span>{module.title}</span><span style={{display:"flex",alignItems:"center",gap:12,color:"#b9a6d5",fontSize:14,fontWeight:600}}>{module.items.filter(i=>i<lessons.length).length} aula(s) <span aria-hidden="true" style={{fontSize:19}}>⌄</span></span></summary><div className="fraction-steps" style={{padding:"0 14px 16px"}}>{module.items.filter(i=>i<lessons.length).map(i=><button key={i} className={active===i?"current":""} aria-current={active===i?"step":undefined} onClick={()=>selectLesson(i)}><span>{String(i+1).padStart(2,"0")}</span>{lessons[i].title}</button>)}</div></details>)}</div>
  <article className="subject-lesson"><span className="eyebrow">AULA {String(active+1).padStart(2,"0")} / {String(lessons.length).padStart(2,"0")}</span><h3>{lesson.title}</h3><p>{lesson.explain}</p>
  <div className="subject-example"><strong>Exemplo comentado</strong><p>{lesson.example}</p><p><b>Entenda o raciocínio:</b> {lesson.feedback}</p></div>
  <div className="subject-quiz"><span className="eyebrow">VERIFIQUE SEU APRENDIZADO</span><h4>{lesson.question}</h4>{lesson.options.map((option,i)=><button key={i} disabled={done} className={"subject-answer "+(choice===i?"selected ":"")+(done&&i===lesson.correct?"correct":"")} onClick={()=>setAnswers(a=>({...a,[questionKey]:i}))}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}<button className="subject-primary" disabled={choice===undefined||done} onClick={()=>setChecked(c=>({...c,[questionKey]:true}))}>Corrigir resposta</button>{done&&<p role="status" className="subject-feedback">{choice===lesson.correct?"Resposta correta!":"Vamos revisar:"} {lesson.feedback}</p>}</div>
  <div className="subject-extras">
   <details><summary>📝 Listas de exercícios <span>+</span></summary><div className="subject-detail"><p>Escolha a lista, defina quantas questões quer praticar e refaça quando desejar.</p><div className="subject-list-tabs">{[1,2,3].map(n=><button key={n} className={list===n?"current":""} onClick={()=>{setList(n);reset()}}>Lista {n}</button>)}</div><label>Quantidade de perguntas <select value={count} onChange={e=>setCount(Number(e.target.value))}>{[5,10,15,20].map(n=><option key={n} value={n}>{n}</option>)}</select></label><p className="subject-note">Esta trilha possui {lessons.length} questões distintas cadastradas. Para não repetir a mesma pergunta como se fosse inédita, a lista utiliza as questões disponíveis; a quantidade selecionada é uma meta para futuras ampliações.</p><div className="subject-practice">{lessons.slice(0,Math.min(count,lessons.length)).map((l,i)=><div key={i}><strong>{i+1}. {l.question}</strong><p>{l.options.join(" · ")}</p></div>)}</div><button className="subject-primary" onClick={reset}>Refazer lista</button></div></details>
   <details><summary>📖 Resoluções comentadas <span>+</span></summary><div className="subject-detail"><div className="subject-list-tabs">{[1,2,3].map(n=><button key={n} className={list===n?"current":""} onClick={()=>setList(n)}>Lista {n}</button>)}</div>{lessons.map((l,i)=><div className="subject-solution" key={i}><strong>{i+1}. {l.question}</strong><p>Resposta: {l.options[l.correct]}</p><p>{l.feedback}</p></div>)}</div></details>
   <details><summary>↓ Materiais para estudar <span>+</span></summary><div className="subject-detail"><p>Você pode imprimir ou salvar o conteúdo desta aula em PDF pelo navegador.</p><button className="subject-primary" onClick={()=>window.print()}>Imprimir ou salvar como PDF</button></div></details>
  </div>
  <div className="subject-pagination"><button disabled={active===0} onClick={()=>selectLesson(active-1)}>← Aula anterior</button><button disabled={active===lessons.length-1} onClick={()=>selectLesson(active+1)}>Próxima aula →</button></div>
  </article>
 </div>
}
