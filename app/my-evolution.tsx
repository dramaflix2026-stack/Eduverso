"use client";

import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {medicineDisciplines} from "./medicine-curriculum";
import {subjectMetadata} from "./fundamental-curriculum";
import {readStudyActivities,type StudyActivity} from "./lib/study-activity";
import styles from "./my-evolution.module.css";

type CloudItem={area:string;subject:string;topic:string;last_visited_at:string;correct_answers:number;answered_questions:number};
type AreaProgress={name:string;category:string;completed:number;answered:number;correct:number;visited:number};
type Snapshot={answered:number;correct:number;completed:number;medicalCompleted:number;fundamentalCompleted:number;reviewed:number;subjects:AreaProgress[];activities:StudyActivity[]};
type Props={signedIn:boolean;name?:string|null};

const empty:Snapshot={answered:0,correct:0,completed:0,medicalCompleted:0,fundamentalCompleted:0,reviewed:0,subjects:[],activities:[]};
function objectValue(value:unknown):Record<string,unknown>{
 return value&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:{};
}
function readValue(key:string):unknown{
 try{return JSON.parse(window.localStorage.getItem(key)||"null");}catch{return null;}
}
function count(value:unknown):number{
 return typeof value==="number"&&Number.isFinite(value)?Math.min(100000,Math.max(0,Math.floor(value))):0;
}
function dayKey(value:string):string{
 const date=new Date(value);
 if(!Number.isFinite(date.getTime()))return "";
 return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
}
function dateLabel(value:string):string{
 const d=new Date(value);
 return Number.isFinite(d.getTime())?d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}):"—";
}
function shortDay(date:Date):string{
 return date.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".","");
}
function readSnapshot():Snapshot{
 const attempts=objectValue(readValue("eduverso:medicina:tentativas:v1"));
 const completed=objectValue(readValue("eduverso:medicina:revisoes:v1"));
 const fundamental=objectValue(readValue("eduverso:fundamental:progresso:v1"));
 const reviews=objectValue(readValue("eduverso:objetivos:estudos:v1"));
 const groups:AreaProgress[]=[];
 let medAnswered=0,medCorrect=0,medFinished=0,fundAnswered=0,fundCorrect=0,fundFinished=0;
 const knownMedicalTopics=new Set<string>();
 for(const discipline of medicineDisciplines){
  let answered=0,correct=0,done=0;
  for(const topic of discipline.topics){
   knownMedicalTopics.add(topic.id);
   const attempt=objectValue(attempts[topic.id]);
   const right=count(attempt.right),wrong=count(attempt.wrong);
   correct+=right;answered+=right+wrong;
   if(completed[topic.id]===true)done++;
  }
  if(answered||done)groups.push({name:discipline.title,category:"Medicina",completed:done,answered,correct,visited:0});
  medAnswered+=answered;medCorrect+=correct;medFinished+=done;
 }
 // Dados de versões anteriores ainda contam, mesmo que um tema tenha mudado de catálogo.
 for(const [id,value] of Object.entries(attempts)){
  if(knownMedicalTopics.has(id))continue;
  const attempt=objectValue(value);
  const right=count(attempt.right),wrong=count(attempt.wrong);
  medAnswered+=right+wrong;medCorrect+=right;
 }
 for(const [id,value] of Object.entries(completed)){
  if(!knownMedicalTopics.has(id)&&value===true)medFinished++;
 }
 const fundamentalGroups=new Map<string,AreaProgress>();
 for(const [id,raw] of Object.entries(fundamental)){
  const match=id.match(/^([1-9]):([a-z-]+):/);
  if(!match)continue;
  const data=objectValue(raw);
  const attempts=count(data.attempts),correct=Math.min(attempts,count(data.correct));
  const done=data.completed===true?1:0;
  fundAnswered+=attempts;fundCorrect+=correct;fundFinished+=done;
  const label=subjectMetadata.find(item=>item.id===match[2])?.name??"Outra disciplina";
  const key=label+" · "+match[1]+"º ano";
  const group=fundamentalGroups.get(key)??{name:key,category:"Ensino Fundamental",completed:0,answered:0,correct:0,visited:0};
  group.answered+=attempts;group.correct+=correct;group.completed+=done;fundamentalGroups.set(key,group);
 }
 groups.push(...fundamentalGroups.values());
 const reviewed=Object.values(reviews).filter(x=>x===true).length;
 return {answered:medAnswered+fundAnswered,correct:medCorrect+fundCorrect,completed:medFinished+fundFinished,medicalCompleted:medFinished,fundamentalCompleted:fundFinished,reviewed,subjects:groups,activities:readStudyActivities()};
}

function isCloudItem(v:unknown):v is CloudItem{
 if(!v||typeof v!=="object")return false;
 const x=v as Partial<CloudItem>;
 return typeof x.subject==="string"&&typeof x.topic==="string"&&typeof x.area==="string"&&typeof x.last_visited_at==="string"&&Number.isFinite(Date.parse(x.last_visited_at));
}

export default function MyEvolution({signedIn,name}:Props){
 const [local,setLocal]=useState<Snapshot>(empty);
 const [cloud,setCloud]=useState<CloudItem[]>([]);
 const [status,setStatus]=useState<"loading"|"ready"|"error"|"visitor">("loading");
 const [windowDays,setWindowDays]=useState<7|30>(7);
 const [goal,setGoal]=useState<3|4|5|7>(4);
 const [filter,setFilter]=useState<"todas"|"access"|"answer"|"completed">("todas");
 const [refreshIndex,setRefreshIndex]=useState(0);
 useEffect(()=>{
  setLocal(readSnapshot());
  try{
   const saved=Number(window.localStorage.getItem("eduverso:evolution:goal:v1"));
   if(saved===3||saved===4||saved===5||saved===7)setGoal(saved);
  }catch{}
  const reload=()=>setLocal(readSnapshot());
  window.addEventListener("focus",reload);
  window.addEventListener("eduverso:study-activity",reload);
  return()=>{window.removeEventListener("focus",reload);window.removeEventListener("eduverso:study-activity",reload);};
 },[]);
 useEffect(()=>{
  if(!signedIn){setCloud([]);setStatus("visitor");return;}
  const abort=new AbortController();
  setStatus("loading");
  fetch("/api/progresso",{method:"GET",credentials:"same-origin",cache:"no-store",signal:abort.signal})
   .then(async response=>{
    if(!response.ok)throw new Error("Não foi possível carregar o progresso.");
    return response.json() as Promise<{items?:unknown}>;
   })
   .then(data=>{if(!abort.signal.aborted){setCloud(Array.isArray(data.items)?data.items.filter(isCloudItem):[]);setStatus("ready");}})
   .catch(()=>{if(!abort.signal.aborted){setCloud([]);setStatus("error");}});
  return()=>abort.abort();
 },[signedIn,refreshIndex]);
 const activities=useMemo(()=>{
  const fromCloud:StudyActivity[]=cloud.filter(e=>e.subject.trim()).map(e=>({at:e.last_visited_at,subject:e.subject,topic:e.topic,kind:"access"}));
  const ordered=[...local.activities,...fromCloud].sort((a,b)=>Date.parse(b.at)-Date.parse(a.at));
  const keys=new Set<string>();
  return ordered.filter(e=>{
   // A API guarda o último acesso por assunto, não o histórico completo de visitas.
   const duplicateKey=e.kind==="access"?[dayKey(e.at),e.kind,e.subject,e.topic].join("|"):null;
   if(duplicateKey&&keys.has(duplicateKey))return false;
   if(duplicateKey)keys.add(duplicateKey);
   return true;
  });
 },[local.activities,cloud]);
 const recentSubjects=useMemo(()=>{
  const map=new Map<string,AreaProgress>();
  for(const item of local.subjects)map.set(item.category+"|"+item.name,{...item});
  for(const row of cloud){
   if(!row.subject.trim())continue;
   const label=row.subject.trim();
   const key="Navegação|"+label;
   const subject=map.get(key)??{name:label,category:"Acessos da conta",completed:0,answered:0,correct:0,visited:0};
   if(row.topic.trim())subject.visited++;
   map.set(key,subject);
  }
  return [...map.values()].filter(e=>e.completed+e.answered+e.visited>0)
   .sort((a,b)=>(b.completed*4+b.answered+b.visited)-(a.completed*4+a.answered+a.visited)).slice(0,8);
 },[cloud,local.subjects]);
 const days=useMemo(()=>{
  const result:{key:string;day:string;date:string;count:number}[]=[];
  for(let i=windowDays-1;i>=0;i--){
   const dt=new Date();dt.setHours(12,0,0,0);dt.setDate(dt.getDate()-i);
   const key=dayKey(dt.toISOString());
   result.push({key,day:shortDay(dt),date:String(dt.getDate()).padStart(2,"0"),count:activities.filter(a=>dayKey(a.at)===key).length});
  }
  return result;
 },[activities,windowDays]);
 const maxCount=Math.max(1,...days.map(d=>d.count));
 const monday=new Date();monday.setHours(0,0,0,0);monday.setDate(monday.getDate()-(monday.getDay()+6)%7);
 const thisWeek=new Set(activities.filter(item=>Date.parse(item.at)>=monday.getTime()&&Date.parse(item.at)<=Date.now()).map(item=>dayKey(item.at))).size;
 const accuracy=local.answered?Math.round(100*local.correct/local.answered):null;
 const lastActivity=activities[0]??null;
 const filteredActivities=activities.filter(a=>filter==="todas"||a.kind===filter).slice(0,7);
 const milestones=[
  {icon:"✦",name:"Primeiro aprendizado",detail:"Responda sua primeira questão",done:local.answered>=1},
  {icon:"◈",name:"Conquistando assuntos",detail:"Conclua 5 tópicos",done:local.completed>=5},
  {icon:"⚡",name:"Constância nos estudos",detail:"Registre atividade em 3 dias da semana",done:thisWeek>=3}
 ];
 const progress=Math.min(100,Math.round(100*thisWeek/goal));
 return <div className={styles.page}>
  <section className={styles.hero}>
   <div className={styles.heroContent}>
    <span className={styles.eyebrow}>✦ MINHA ÁREA · DESEMPENHO</span>
    <h1>Minha Evolução<span>.</span></h1>
    <p>{name?name.split(" ")[0]+", acompanhe":"Acompanhe"} suas conquistas, identifique os próximos passos e mantenha o ritmo nos estudos.</p>
    <div className={styles.heroMeta}>
     <span className={styles.statusDot}/>{status==="loading"?"Consultando dados da conta":status==="ready"?"Dados da conta e deste navegador":status==="error"?"Dados locais disponíveis; sincronização indisponível":"Dados deste navegador"}
    </div>
   </div>
   <div className={styles.heroGraphic} aria-hidden="true"><div className={styles.orbit}><span>✦</span></div><strong>{accuracy===null?"↗":accuracy+"%"}</strong><small>{accuracy===null?"Sua jornada começa aqui":"Acertos nas questões registradas"}</small></div>
  </section>

  <div className={styles.titleLine}><div><span className={styles.eyebrow}>SEU PAINEL</span><h2>Seu progresso em números</h2></div><button className={styles.refresh} type="button" onClick={()=>{setLocal(readSnapshot());setRefreshIndex(v=>v+1);}}>↻ Atualizar dados</button></div>
  <div className={styles.stats}>
   <article className={styles.stat}><span className={styles.statIcon}>☷</span><small>Questões respondidas</small><strong>{local.answered.toLocaleString("pt-BR")}</strong><p>Medicina e Fundamental · neste aparelho</p></article>
   <article className={styles.stat}><span className={styles.statIcon}>✓</span><small>Taxa de acerto</small><strong>{accuracy===null?"—":accuracy+"%"}</strong><p>{accuracy===null?"Responda exercícios para calcular":local.correct+" respostas corretas registradas"}</p></article>
   <article className={styles.stat}><span className={styles.statIcon}>◇</span><small>Tópicos concluídos</small><strong>{local.completed}</strong><p>{local.medicalCompleted} de Medicina · {local.fundamentalCompleted} do Fundamental</p></article>
   <article className={styles.stat}><span className={styles.statIcon}>↗</span><small>Revisões marcadas</small><strong>{local.reviewed}</strong><p>Roteiros da Minha Preparação</p></article>
  </div>

  <div className={styles.dashboard}>
   <section className={styles.panel}>
    <div className={styles.panelHeading}><div><span className={styles.eyebrow}>HÁBITO DE ESTUDO</span><h2>Atividade registrada</h2></div><div className={styles.segment} role="group" aria-label="Período do gráfico"><button type="button" aria-pressed={windowDays===7} onClick={()=>setWindowDays(7)}>7 dias</button><button type="button" aria-pressed={windowDays===30} onClick={()=>setWindowDays(30)}>30 dias</button></div></div>
    <div className={styles.graph} aria-label="Registros diários de estudo">
     {days.map(day=><div key={day.key} className={styles.graphDay} title={day.count+" registros em "+day.date}>
      <span className={styles.graphCount}>{day.count||""}</span><div className={styles.barTrack}><span style={{height:day.count?Math.max(9,day.count/maxCount*100)+"%":"0%"}}/></div>
      <small>{windowDays===7?day.day:day.date}</small>
     </div>)}
    </div>
    <p className={styles.finePrint}>O gráfico representa registros disponíveis de acesso, respostas e conclusões. A conta guarda apenas o acesso mais recente por assunto; não representa todo o histórico nem horas estudadas.</p>
   </section>
   <section className={styles.panel+" "+styles.goalPanel}>
    <span className={styles.eyebrow}>ROTINA DE APRENDIZAGEM</span>
    <h2>Minha meta semanal</h2>
    <div className={styles.goalMain}><div className={styles.ring} style={{background:"conic-gradient(#ac82ff "+progress+"%, #342b4a "+progress+"% 100%)"}}><span><strong>{thisWeek}</strong><small>de {goal} dias</small></span></div><div className={styles.goalText}><strong>{thisWeek>=goal?"Meta alcançada! ✨":"Um dia de cada vez."}</strong><p>Registre atividades em {goal} dias diferentes da semana.</p></div></div>
    <label className={styles.goalLabel} htmlFor="evolution-goal">Sua meta</label>
    <select id="evolution-goal" className={styles.select} value={goal} onChange={e=>{const v=Number(e.target.value);if(v!==3&&v!==4&&v!==5&&v!==7)return;setGoal(v);try{window.localStorage.setItem("eduverso:evolution:goal:v1",String(v));}catch{}}}><option value={3}>3 dias por semana</option><option value={4}>4 dias por semana</option><option value={5}>5 dias por semana</option><option value={7}>7 dias por semana</option></select>
    <p className={styles.finePrint}>A meta é armazenada neste navegador. Um dia é considerado ativo quando há registro de atividade.</p>
   </section>
  </div>

  <div className={styles.dashboard}>
   <section className={styles.panel}>
    <div className={styles.panelHeading}><div><span className={styles.eyebrow}>ONDE VOCÊ AVANÇOU</span><h2>Por disciplina</h2></div><span className={styles.cornerCount}>{recentSubjects.length} áreas</span></div>
    {recentSubjects.length? <div className={styles.subjectList}>{recentSubjects.map(item=><div className={styles.subject} key={item.category+item.name}><span className={styles.subjectMark}>{item.category==="Medicina"?"✚":item.category==="Ensino Fundamental"?"✎":"↗"}</span><div><strong>{item.name}</strong><small>{item.category}</small></div><div className={styles.subjectNumbers}>{item.completed>0&&<span>{item.completed} concluídos</span>}{item.answered>0&&<span>{item.answered} respostas</span>}{item.visited>0&&<span>{item.visited} assuntos acessados</span>}</div></div>)}</div>
    :<div className={styles.emptyState}><span>◇</span><strong>Seu primeiro avanço começa hoje.</strong><p>Abra uma disciplina, pratique questões e seus resultados aparecerão aqui.</p><Link href="/plataforma">Explorar disciplinas ↗</Link></div>}
   </section>
   <section className={styles.panel}>
    <div className={styles.panelHeading}><div><span className={styles.eyebrow}>HISTÓRICO</span><h2>Atividades recentes</h2></div></div>
    <div className={styles.filters} role="group" aria-label="Filtrar atividades"><button type="button" aria-pressed={filter==="todas"} onClick={()=>setFilter("todas")}>Todas</button><button type="button" aria-pressed={filter==="access"} onClick={()=>setFilter("access")}>Acessos</button><button type="button" aria-pressed={filter==="answer"} onClick={()=>setFilter("answer")}>Respostas</button><button type="button" aria-pressed={filter==="completed"} onClick={()=>setFilter("completed")}>Concluídos</button></div>
    {filteredActivities.length?<div className={styles.timeline}>{filteredActivities.map((item,i)=><div className={styles.timelineItem} key={item.at+i+item.subject}><span className={styles.timelineIcon}>{item.kind==="completed"?"✓":item.kind==="answer"?"✎":"↗"}</span><div><strong>{item.topic||item.subject}</strong><small>{item.kind==="completed"?"Tópico concluído":item.kind==="answer"?"Resposta registrada":"Área acessada"} · {item.subject}</small></div><time dateTime={item.at}>{dateLabel(item.at)}</time></div>)}</div>:<div className={styles.emptySmall}>Nenhuma atividade registrada para este filtro.</div>}
    <p className={styles.finePrint}>{lastActivity?"Último registro em "+new Date(lastActivity.at).toLocaleDateString("pt-BR")+".":"Ainda não há registros de atividade."} Registros locais passam a ser acompanhados nesta versão.</p>
   </section>
  </div>

  <section className={styles.panel+" "+styles.achievements}>
   <div className={styles.panelHeading}><div><span className={styles.eyebrow}>MARCOS DE APRENDIZAGEM</span><h2>Suas conquistas</h2></div></div>
   <div className={styles.achievementGrid}>{milestones.map(item=><div key={item.name} className={styles.achievement} data-done={item.done}><span className={styles.achievementIcon}>{item.icon}</span><div><strong>{item.name}</strong><small>{item.detail}</small></div><span className={styles.achievementStatus}>{item.done?"Conquistado":"A conquistar"}</span></div>)}</div>
  </section>

  {status==="error"&&<p className={styles.notice} role="status">Não foi possível consultar os registros da conta agora. Os dados deste navegador continuam disponíveis. Use “Atualizar dados” para tentar novamente.</p>}
  {!signedIn&&<p className={styles.notice}>Você está visualizando registros deste navegador. <Link href="/entrar">Entre na sua conta</Link> para consultar também os acessos salvos na nuvem.</p>}
  <div className={styles.footerAction}><div><span className={styles.eyebrow}>PRÓXIMO PASSO</span><h2>Continue construindo seu conhecimento.</h2><p>Cada assunto praticado é um novo passo na sua jornada.</p></div><Link href="/plataforma">Voltar aos estudos <span aria-hidden="true">↗</span></Link></div>
 </div>;
}
