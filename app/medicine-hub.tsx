"use client";
import {useEffect,useMemo,useState} from "react";
import {getMedDiscipline,medicineDisciplines,medCycles,type MedCycle} from "./medicine-curriculum";
import styles from "./medicine-hub.module.css";
import MedicineMockExam from "./medicine-mock-exam";
import MedicineEntrance,{type EntranceTopic} from "./medicine-entrance";
import MedicineDeepChapter from "./medicine-deep-chapter";
import AnatomyAtlas from "./anatomy-atlas";
import {advancedMedCourses} from "./medicine-advanced-catalog";

export type MedicineArea="faculdade"|"vestibular"|"exames";
type Props={
 area:MedicineArea;
 onChangeArea:(next:MedicineArea)=>void;
 onOpenGoal:(category:"vestibulares"|"cursos"|"profissionais",goal?:string)=>void;
 onOpenTrack:(subject:string,topic:string)=>void;
 getSubjectTopics:(subject:string)=>EntranceTopic[];
};
type Cycle="todos"|MedCycle;
const localKey="eduverso:medicina:revisoes:v1";
const attemptsKey="eduverso:medicina:tentativas:v1";
type Attempt={right:number;wrong:number};
const strip=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

export default function MedicineHub({area,onChangeArea,onOpenGoal,onOpenTrack,getSubjectTopics}:Props){
 const [cycle,setCycle]=useState<Cycle>("todos");
 const [year,setYear]=useState(0);
 const [search,setSearch]=useState("");
 const [discipline,setDiscipline]=useState<string|null>(null);
 const [topic,setTopic]=useState<string|null>(null);
 const [chosen,setChosen]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [mockOpen,setMockOpen]=useState(false);
 const [atlasOpen,setAtlasOpen]=useState(false);
 const [completed,setCompleted]=useState<Record<string,boolean>>({});
 const [coverAssets,setCoverAssets]=useState<Record<string,string>>({});
 const [attempts,setAttempts]=useState<Record<string,Attempt>>({});
 useEffect(()=>{
  let cancelled=false;
  fetch("/api/medicina/capas").then(async response=>response.ok?response.json():null).then(data=>{if(!cancelled&&data?.covers)setCoverAssets(data.covers)}).catch(()=>{});
  return()=>{cancelled=true};
 },[]);
 useEffect(()=>{
  const restore=()=>{
   const params=new URLSearchParams(window.location.search);
   setDiscipline(getMedDiscipline(params.get("materia"))?.slug??null);
   setTopic(params.get("assunto")??null);
  };
  restore();window.addEventListener("popstate",restore);
  try{const saved=window.localStorage.getItem(localKey);if(saved){const obj=JSON.parse(saved);if(obj&&typeof obj==="object"&&!Array.isArray(obj))setCompleted(obj)}
   const attemptsValue=window.localStorage.getItem(attemptsKey);
   if(attemptsValue){const obj=JSON.parse(attemptsValue);if(obj&&typeof obj==="object"&&!Array.isArray(obj))setAttempts(obj)}}catch{}
  return()=>window.removeEventListener("popstate",restore);
 },[]);
 const currentDiscipline=getMedDiscipline(discipline);
 const currentTopic=currentDiscipline?.topics.find(t=>t.id===topic);
 const yearMatch=(range:string,year:number)=>{const parts=[...range.matchAll(/\d/g)].map(m=>Number(m[0]));return !year||(parts.length>1?year>=parts[0]&&year<=parts[parts.length-1]:parts.includes(year));};
 const visible=useMemo(()=>medicineDisciplines.filter(d=>(cycle==="todos"||d.cycle===cycle)&&yearMatch(d.years,year)&&strip(d.title+" "+d.description+" "+d.topics.map(t=>t.name).join(" ")).includes(strip(search))),[cycle,year,search]);
 function pushLocation(d:string|null,t:string|null){
  const url=new URL(window.location.href);
  if(d)url.searchParams.set("materia",d);else url.searchParams.delete("materia");
  if(t)url.searchParams.set("assunto",t);else url.searchParams.delete("assunto");
  window.history.pushState({},"",url.pathname+url.search+url.hash);
  setDiscipline(d);setTopic(t);setChosen(null);setChecked(false);setMockOpen(false);setAtlasOpen(false);
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function changeArea(next:MedicineArea){
  if(next===area)return;
  pushLocation(null,null);setSearch("");setCycle("todos");setYear(0);onChangeArea(next);
 }
 function verify(){
  if(chosen===null||!currentTopic)return;
  setChecked(true);
  const old=attempts[currentTopic.id]??{right:0,wrong:0};
  const nextAttempts={...attempts,[currentTopic.id]:{right:old.right+(chosen===currentTopic.correct?1:0),wrong:old.wrong+(chosen===currentTopic.correct?0:1)}};
  setAttempts(nextAttempts);
  try{window.localStorage.setItem(attemptsKey,JSON.stringify(nextAttempts));}catch{}
  if(chosen===currentTopic.correct){
   const next={...completed,[currentTopic.id]:true};setCompleted(next);
   try{window.localStorage.setItem(localKey,JSON.stringify(next));}catch{}
  }
 }
 function nextTopic(){
  if(!currentDiscipline||!currentTopic)return;
  const index=currentDiscipline.topics.findIndex(t=>t.id===currentTopic.id);
  if(index<currentDiscipline.topics.length-1)pushLocation(currentDiscipline.slug,currentDiscipline.topics[index+1].id);
  else pushLocation(currentDiscipline.slug,null);
 }
 const studiedCount=medicineDisciplines.reduce((total,d)=>total+d.topics.filter(t=>completed[t.id]).length,0);
 const suggestedReviews=medicineDisciplines.flatMap(d=>d.topics.map(t=>({discipline:d.slug,disciplineTitle:d.title,topic:t,errors:attempts[t.id]?.wrong??0,acertos:attempts[t.id]?.right??0}))).filter(v=>v.errors>0).sort((a,b)=>(b.errors-b.acertos)-(a.errors-a.acertos)||b.errors-a.errors).slice(0,4);
 return <div className={styles.med}>
  <section className={styles.hero+" "+(area==="vestibular"?styles.heroCompact:"")}>
   <span className={styles.eyebrow}>✦ {area==="vestibular"?"EDUVERSO · PREPARAÇÃO":area==="faculdade"?"EDUVERSO · FACULDADE":"EDUVERSO · ESPECIALIZAÇÃO"}</span>
   <h1>{area==="vestibular"?<>Vestibular de <span>Medicina.</span></>:area==="faculdade"?<>Faculdade de <span>Medicina.</span></>:<>Revalida e <span>Residência.</span></>}</h1>
   <p>{area==="vestibular"?"Escolha uma matéria, explore os assuntos e comece a estudar com as trilhas já existentes no Eduverso.":area==="faculdade"?"Explore disciplinas universitárias, aulas comentadas, exercícios e simulados por ciclo e ano.":"Consulte os exames profissionais e os acervos oficiais de questões anteriores."}</p>
   {area==="faculdade"&&<div className={styles.stats}><span>18 disciplinas universitárias</span><span>108 assuntos iniciais</span></div>}
  </section>
  <div className={styles.areaTabs} role="group" aria-label="Áreas de Medicina">
    {([
      {id:"vestibular",label:"🎓 Vestibular"},
      {id:"faculdade",label:"🫀 Faculdade"},
      {id:"exames",label:"📋 Revalida e residência"}
    ] as const).map(item=><button type="button" key={item.id} onClick={()=>changeArea(item.id)} aria-pressed={area===item.id} className={styles.areaTab+" "+(area===item.id?styles.areaTabActive:"")}>{item.label}</button>)}
  </div>
  {area==="vestibular"&&<MedicineEntrance getTopics={getSubjectTopics} onOpenGoal={onOpenGoal} onOpenTrack={onOpenTrack}/>}
  {area==="exames"&&<>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>EXAMES E ESPECIALIZAÇÃO</span><h2>Revalida, Enamed e Residência</h2></div></div>
   <div className={styles.pathNotes}>
    {[
     {title:"Revalida",desc:"Revalidação de diplomas médicos obtidos no exterior, com acesso a acervo de provas e gabaritos oficiais.",id:"revalida",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/revalida/provas-e-gabaritos"},
     {title:"ENARE / Residência",desc:"Preparação para seleção de residência conforme edital e modalidade; consulte as provas e gabaritos da banca.",id:"enare",url:"https://enare2026.conhecimento.fgv.br/provas/"},
     {title:"Enamed",desc:"Avaliação da formação médica: provas, gabaritos e informações oficiais do Inep.",id:"enamed",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enamed/provas-e-gabaritos"}
    ].map(item=><div key={item.id} className={styles.resource}><strong>{item.title}</strong><p>{item.desc}</p><button type="button" className={styles.primary} onClick={()=>onOpenGoal("profissionais",item.id)}>Ver roteiro ↗</button><a href={item.url} target="_blank" rel="noopener noreferrer">Consultar provas e gabaritos oficiais ↗</a></div>)}
   </div>
   <p className={styles.note}>Residência médica não é uma prova única: programas, modalidades, instituições e edições têm critérios diferentes. O roteiro geral precisa ser complementado com o edital específico.</p>
  </>}
  {area==="faculdade"&&mockOpen?<MedicineMockExam scope={currentDiscipline?.slug} onClose={()=>setMockOpen(false)}/>:null}
  {area==="faculdade"&&!currentDiscipline&&!mockOpen&&!atlasOpen&&<>
   <button type="button" className={styles.atlasFeature} onClick={()=>{setAtlasOpen(true);window.scrollTo({top:0,behavior:"smooth"});}} aria-label="Abrir Atlas Anatômico Interativo">
    <span aria-hidden="true" className={styles.atlasIcon}>🦴</span>
    <span><strong>Atlas Anatômico Interativo</strong><small>Ferramenta de estudo visual · 12 estruturas ósseas · Desafios de identificação · Flashcards</small></span>
    <span aria-hidden="true" className={styles.atlasArrow}>Explorar →</span>
   </button>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>DISCIPLINAS DE GRADUAÇÃO</span><h2>Escolha uma disciplina</h2></div><button className={styles.primary} type="button" onClick={()=>setMockOpen(true)}>📝 Simulado geral</button></div>
   <div className={styles.toolbar}>
    <div className={styles.filters} role="group" aria-label="Filtrar pelo ciclo">
     <span className={styles.filterLabel}>Ciclo</span>
     {([{value:"todos",label:"Todos"},{value:"basico",label:"Básico"},{value:"clinico",label:"Clínico"},{value:"internato",label:"Internato"}] as const).map(item=><button key={item.value} type="button" aria-pressed={cycle===item.value} onClick={()=>setCycle(item.value)} className={styles.filter+" "+(cycle===item.value?styles.filterActive:"")}>{item.label}</button>)}
    </div>
    <div className={styles.filters} role="group" aria-label="Filtrar pelo ano da graduação">
     <span className={styles.filterLabel}>Ano</span>
     {[0,1,2,3,4,5,6].map(y=><button key={y} type="button" aria-pressed={year===y} onClick={()=>setYear(y)} className={styles.filter+" "+(year===y?styles.filterActive:"")}>{y===0?"Todos":y+"º"}</button>)}
    </div>
    <label className={styles.search}><span aria-hidden="true">⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar disciplina ou assunto..." aria-label="Buscar disciplinas de Medicina"/></label>
    <p className={styles.note}>Divisão por ciclos e anos é orientativa: universidades podem adotar currículos integrados e sequências próprias. {studiedCount} de 108 assuntos concluídos corretamente neste navegador.</p>
   </div>
   {suggestedReviews.length>0&&<div className={styles.resource}><strong>🧠 Revisão recomendada pelo seu desempenho</strong><p>Assuntos em que você teve erros são priorizados. Essa recomendação é baseada nas suas respostas, sem geração de IA ou avaliação médica.</p>
    <div className={styles.actions}>{suggestedReviews.map(v=><button key={v.topic.id} type="button" className={styles.secondary} onClick={()=>pushLocation(v.discipline,v.topic.id)}>{v.disciplineTitle}: {v.topic.name} ({v.errors} {v.errors===1?"erro":"erros"}) ↗</button>)}</div>
   </div>}
   {visible.length?<div className={styles.discGrid} aria-label="Disciplinas da Faculdade de Medicina">
    {visible.map(d=><button type="button" key={d.slug} className={styles.disciplineCard} onClick={()=>pushLocation(d.slug,null)}>
     <img className={styles.cardImage} src={coverAssets[d.slug]??d.image} loading="lazy" alt="" onError={e=>{if(e.currentTarget.src!==new URL(d.image,window.location.href).href)e.currentTarget.src=d.image}}/>
     <span className={styles.cardOverlay} aria-hidden="true"/>
     <span className={styles.cardInfo}><span className={styles.tag}>{medCycles.find(c=>c.value===d.cycle)?.label} • {d.years}</span><strong>{d.title}</strong><small>{d.description}</small><span className={styles.cardAction}>Explorar 6 assuntos ↗</span></span>
    </button>)}
   </div>:<div className={styles.empty}>Nenhuma disciplina encontrada. Tente remover algum filtro.</div>}
   <div className={styles.note}>Conteúdo acadêmico de revisão. Não substitui formação clínica, prática supervisionada ou protocolos profissionais. Para situações de saúde reais, procure atendimento qualificado.</div>
  </>}
  {area==="faculdade"&&!currentDiscipline&&atlasOpen&&!mockOpen&&<>
   <button type="button" className={styles.back} onClick={()=>setAtlasOpen(false)}>← Voltar às 18 disciplinas</button>
   <AnatomyAtlas/>
  </>}
  {area==="faculdade"&&currentDiscipline&&!currentTopic&&!mockOpen&&!atlasOpen&&<>
   <button type="button" className={styles.back} onClick={()=>pushLocation(null,null)}>← Voltar às 18 disciplinas</button>
   <section className={styles.hero}>
    <span className={styles.eyebrow}>{medCycles.find(c=>c.value===currentDiscipline.cycle)?.label} · {currentDiscipline.years}</span><h1>{currentDiscipline.title}<span>.</span></h1><p>{currentDiscipline.description}. Abra uma trilha para acessar explicação, exemplo aplicado e exercício comentado.</p>
    <div className={styles.stats}><span>{currentDiscipline.topics.length} módulos</span>{advancedMedCourses[currentDiscipline.slug]&&<><span>{advancedMedCourses[currentDiscipline.slug].metrics.lessons} aulas aprofundadas</span><span>{advancedMedCourses[currentDiscipline.slug].metrics.extraQuestions+currentDiscipline.topics.length} questões de revisão</span></>}<span>{currentDiscipline.topics.filter(t=>completed[t.id]).length} revisados corretamente</span></div>
   </section>
   {currentDiscipline.slug==="anatomia-humana"&&<button type="button" className={styles.atlasFeature} onClick={()=>{setAtlasOpen(true);window.scrollTo({top:0,behavior:"smooth"});}}><span aria-hidden="true" className={styles.atlasIcon}>🦴</span><span><strong>Atlas Anatômico Interativo</strong><small>Explore 12 estruturas · Desafios · Flashcards</small></span><span aria-hidden="true" className={styles.atlasArrow}>Explorar →</span></button>}
   <div className={styles.sectionHead}><h2>Assuntos de {currentDiscipline.title}</h2><button type="button" className={styles.primary} onClick={()=>setMockOpen(true)}>📝 Simulado da matéria</button></div>
   <div className={styles.topicGrid}>
    {currentDiscipline.topics.map((t,i)=><button type="button" key={t.id} className={styles.topicCard} onClick={()=>pushLocation(currentDiscipline.slug,t.id)}>
     <span>{String(i+1).padStart(2,"0")}</span><strong>{t.name}</strong><small>{completed[t.id]?"✓ Módulo concluído":advancedMedCourses[currentDiscipline.slug]?"4 aulas · Aplicação · 4 questões":"Aula, exemplo e questão comentada"}</small><span className={styles.cardAction}>Estudar assunto ↗</span>
    </button>)}
   </div>
   {currentDiscipline.slug==="anatomia-humana"&&<div className={styles.resource}><strong>Integração com Anatomia do Eduverso</strong><p>Você também pode explorar as trilhas visuais de ossos, músculos, sistemas corporais e outras estruturas já existentes na plataforma.</p><button className={styles.primary} onClick={()=>onOpenTrack("Anatomia","Sistema ósseo")}>Abrir trilhas de Anatomia ↗</button></div>}
  </>}
  {area==="faculdade"&&currentDiscipline?.slug==="anatomia-humana"&&!currentTopic&&atlasOpen&&!mockOpen&&<><button type="button" className={styles.back} onClick={()=>setAtlasOpen(false)}>← Voltar aos módulos de Anatomia</button><AnatomyAtlas/></>}
  {area==="faculdade"&&currentDiscipline&&advancedMedCourses[currentDiscipline.slug]&&currentTopic&&!mockOpen&&
    <MedicineDeepChapter key={currentTopic.id} topic={currentTopic}
      chapter={advancedMedCourses[currentDiscipline.slug].byTopic[currentTopic.id]}
      disciplineTitle={currentDiscipline.title}
      coverSrc={coverAssets[currentDiscipline.slug]??currentDiscipline.image}
      onBack={()=>pushLocation(currentDiscipline.slug,null)}
      onNext={nextTopic}
      onComplete={()=>{
        setCompleted(prev=>{
          const next={...prev,[currentTopic.id]:true};
          try{window.localStorage.setItem(localKey,JSON.stringify(next));}catch{}
          return next;
        });
      }}
      onAnswer={correct=>{
        setAttempts(prev=>{
          const old=prev[currentTopic.id]??{right:0,wrong:0};
          const next={...prev,[currentTopic.id]:{right:old.right+(correct?1:0),wrong:old.wrong+(correct?0:1)}};
          try{window.localStorage.setItem(attemptsKey,JSON.stringify(next));}catch{}
          return next;
        });
      }}
    />}
  {area==="faculdade"&&currentDiscipline&&!advancedMedCourses[currentDiscipline.slug]&&currentTopic&&!mockOpen&&<>
   <button type="button" className={styles.back} onClick={()=>pushLocation(currentDiscipline.slug,null)}>← Voltar a {currentDiscipline.title}</button>
   <article className={styles.study}>
    <span className={styles.eyebrow}>{currentDiscipline.title} · Trilha {currentDiscipline.topics.findIndex(t=>t.id===currentTopic.id)+1} de {currentDiscipline.topics.length}</span>
    <h2>{currentTopic.name}</h2>
    <p>{currentTopic.theory}</p>
    <div className={styles.example}><h3>Exemplo para aplicar o conceito</h3><p>{currentTopic.example}</p></div>
    <div className={styles.quiz}>
     <h3>Verifique o que aprendeu</h3>
     <p>{currentTopic.question}</p>
     <div className={styles.options} role="group" aria-label="Alternativas da questão">
      {currentTopic.options.map((a,i)=><button type="button" key={i} disabled={checked} aria-pressed={chosen===i} className={chosen===i?styles.chosen:""} onClick={()=>setChosen(i)}>{String.fromCharCode(65+i)}. {a}</button>)}
     </div>
     {!checked?<button type="button" className={styles.primary} disabled={chosen===null} onClick={verify}>Conferir resposta</button>:<div role="status" className={styles.feedback}><strong>{chosen===currentTopic.correct?"✓ Correto!":"✕ Vamos revisar esse conceito."}</strong><p>{currentTopic.feedback}</p></div>}
    </div>
    <div className={styles.example}>
      <h3>✨ Tutor de IA — integração preparada</h3>
      <p>O gerador poderá aprofundar esta aula, criar exercícios inéditos e propor revisões adaptadas ao seu desempenho. A API protegida já está implementada, mas a geração está desativada até a integração do login e das credenciais do provedor. As explicações e exercícios acima são conteúdos editoriais que já funcionam.</p>
    </div>
    <div className={styles.actions}><button type="button" className={styles.secondary} onClick={()=>pushLocation(currentDiscipline.slug,null)}>Ver todos os assuntos</button><button type="button" className={styles.primary} onClick={nextTopic}>Próximo assunto →</button></div>
    <div className={styles.note}>Material para aprendizagem teórica. Não é diagnóstico, indicação de tratamento nem procedimento para realização sem supervisão profissional.</div>
   </article>
  </>}
 </div>;
}
