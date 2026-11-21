"use client";
import {useEffect,useMemo,useState} from "react";
import styles from "./eduverso-home.module.css";

type Track={name:string;description:string};
type Subject={name:string;description:string;topics:Track[]};
type Area="vestibular"|"faculdade"|"exames";
type Props={
 subjects:Subject[];
 onOpen:(subject:string)=>void;
 onOpenMedicine:(area:Area)=>void;
 onOpenPreparation:(category:"todas"|"vestibulares"|"cursos"|"concursos"|"profissionais")=>void;
 onOpenTopic:(subject:string,topic:string)=>void;
};
const universe=[
 {key:"fundamental",tag:"ESTUDOS ESCOLARES",title:"Ensino Fundamental",detail:"Do 1º ao 9º ano",icon:"✏",image:"/images/home/matematica.webp"},
 {key:"medio",tag:"ESTUDOS ESCOLARES",title:"Ensino Médio",detail:"1º, 2º e 3º ano",icon:"∑",image:"/images/home/fisica.webp"},
 {key:"medicina",tag:"ÁREA UNIVERSITÁRIA",title:"Medicina",detail:"Vestibular, faculdade e residência",icon:"✚",image:"/images/home/anatomia.webp"},
 {key:"enem",tag:"PREPARAÇÃO",title:"ENEM e Vestibulares",detail:"Matérias, revisão e provas",icon:"✦",image:"/images/home/enem-e-vestibulares.webp"},
 {key:"concursos",tag:"CARREIRA",title:"Concursos",detail:"Preparação por objetivo",icon:"▣",image:"/images/home/concursos.webp"},
 {key:"idiomas",tag:"IDIOMAS",title:"Inglês",detail:"Do básico à prática",icon:"EN",image:"/images/home/ingles.webp"}
] as const;
const featured=["Matemática","Português","Biologia","História","Geografia","Física"];
const images:Record<string,string>={
 "Matemática":"matematica","Português":"portugues","Biologia":"biologia","História":"historia",
 "Geografia":"geografia","Física":"fisica","Química":"quimica","Anatomia":"anatomia","Inglês":"ingles"
};
const clean=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
type Match={title:string;detail:string;group:string;key:string;subject?:string;topic?:string};
export default function EduversoHome({subjects,onOpen,onOpenMedicine,onOpenPreparation,onOpenTopic}:Props){
 const [query,setQuery]=useState("");
 const [allSubjects,setAllSubjects]=useState(false);
 const [recent,setRecent]=useState<{label:string;href:string;detail:string}|null>(null);
 useEffect(()=>{
  try{
   const value=JSON.parse(localStorage.getItem("eduverso:recent")||"null");
   if(value&&typeof value.label==="string"&&typeof value.href==="string"&&value.href.startsWith("/plataforma?"))setRecent(value);
  }catch{/* Browsing without saved history is supported */}
 },[]);
 const go=(key:string)=>{
  switch(key){
   case "fundamental":onOpen("Ensino Fundamental");break;
   case "medio":onOpen("Ensino Médio");break;
   case "medicina":onOpenMedicine("faculdade");break;
   case "enem":onOpen("ENEM e Vestibulares");break;
   case "concursos":onOpenPreparation("concursos");break;
   case "idiomas":onOpen("Inglês");break;
  }
 };
 const matches=useMemo<Match[]>(()=>{
  if(query.trim().length<2)return [];
  const needle=clean(query);
  const group=universe.filter(x=>clean(x.title+" "+x.detail+" "+x.tag).includes(needle)).map(x=>({title:x.title,detail:x.detail,group:"Universo",key:x.key}));
  const courses=subjects.filter(x=>!["Concursos","ENEM e Vestibulares"].includes(x.name)&&clean(x.name+" "+x.description).includes(needle)).map(x=>({title:x.name,detail:x.description,group:"Disciplina",key:"",subject:x.name}));
  const tracks=subjects.flatMap(x=>x.topics.filter(t=>clean(t.name+" "+t.description).includes(needle)).slice(0,3).map(t=>({title:t.name,detail:x.name+" · "+t.description,group:"Assunto",key:"",subject:x.name,topic:t.name})));
  return [...group,...courses,...tracks].slice(0,8);
 },[query,subjects]);
 function follow(m:Match){if(m.topic&&m.subject)onOpenTopic(m.subject,m.topic);else if(m.subject)onOpen(m.subject);else go(m.key)}
 const subjectsToShow=subjects.filter(s=>images[s.name]&&!["Concursos","ENEM e Vestibulares"].includes(s.name)).filter(s=>allSubjects||featured.includes(s.name));
 return <div className={styles.home}>
  <section className={styles.welcome}>
   <div className={styles.welcomeText}><span className={styles.eyebrow}>✦ BEM-VINDO AO EDUVERSO</span><h1>Seu conhecimento,<br/><em>sem limites.</em></h1><p>Escolha seu caminho e comece a aprender no seu ritmo.</p></div>
   <div className={styles.heroImage}><picture><source media="(max-width: 760px)" srcSet="/images/hero-eduverso/home-mobile.png"/><img src="/images/hero-eduverso/home-desktop.png" alt="Livros e elementos do conhecimento em uma cena roxa" width={1600} height={900} fetchPriority="high"/></picture><button type="button" className={styles.heroAction} onClick={()=>document.getElementById("edu-universes")?.scrollIntoView({behavior:"smooth",block:"start"})}>Escolher meu caminho <span aria-hidden="true">→</span></button></div>
  </section>
  <section className={styles.finder} aria-label="Busca de estudos">
   <div className={styles.searchHeader}><div><span className={styles.eyebrow}>ENCONTRE O QUE PRECISA</span><h2>O que vamos estudar hoje?</h2></div></div>
   <div className={styles.searchWrap}><span aria-hidden="true" className={styles.magnify}>⌕</span><input aria-label="Buscar disciplina, matéria, assunto ou prova" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar disciplina, matéria ou prova..." autoComplete="off"/>{query&&<button aria-label="Limpar busca" type="button" onClick={()=>setQuery("")}>×</button>}</div>
   {query.trim().length>=2?<div className={styles.results} aria-label="Resultados da busca" aria-live="polite">{matches.length?matches.map((m,i)=><button type="button" key={m.group+":"+m.title+":"+i} onClick={()=>follow(m)}><span><small>{m.group}</small><strong>{m.title}</strong><em>{m.detail}</em></span><b aria-hidden="true">↗</b></button>):<p>Nenhuma correspondência. Tente uma disciplina ou outro assunto.</p>}</div>:<div className={styles.chips} aria-label="Acessos rápidos">{["Matemática","Português","ENEM e Vestibulares","Concursos","Biologia","Inglês"].map(name=><button type="button" key={name} onClick={()=>name==="Concursos"?go("concursos"):onOpen(name)}>{name}</button>)}</div>}
  </section>
  {recent&&<section className={styles.resume} aria-label="Acesso recente"><div><small>↗ RETOMAR ESTUDOS</small><strong>{recent.label}</strong><p>{recent.detail||"Continue de onde você acessou por último."}</p></div><a href={recent.href}>Continuar <span aria-hidden="true">→</span></a></section>}
  <section id="edu-universes" className={styles.area}>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>EXPLORE O EDUVERSO</span><h2>Escolha seu universo</h2><p>Primeiro o objetivo. Depois, as matérias e atividades.</p></div></div>
   <div className={styles.universeGrid}>{universe.map(x=><button type="button" className={styles.universeCard} key={x.key} onClick={()=>go(x.key)}><img src={x.image} alt="" loading="lazy"/><span className={styles.universeShade}/><span className={styles.universeContent}><small>{x.tag}</small><strong>{x.title}</strong><em>{x.detail}</em><b>Explorar <span aria-hidden="true">↗</span></b></span></button>)}</div>
  </section>
  <section className={styles.area}>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>ACESSO DIRETO</span><h2>Disciplinas em destaque</h2><p>Vá direto para uma matéria do seu interesse.</p></div><button type="button" className={styles.seeAll} onClick={()=>setAllSubjects(v=>!v)} aria-expanded={allSubjects}>{allSubjects?"Mostrar menos":"Ver todas as disciplinas"} <span aria-hidden="true">→</span></button></div>
   <div className={styles.disciplineGrid}>{subjectsToShow.map(x=><button type="button" className={styles.disciplineCard} key={x.name} onClick={()=>onOpen(x.name)}><img src={"/images/home/"+images[x.name]+".webp"} alt="" loading="lazy"/><span><strong>{x.name}</strong><small>Explorar assuntos ↗</small></span></button>)}</div>
  </section>
  <section className={styles.area}>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>ESTUDE DO SEU JEITO</span><h2>Ferramentas de aprendizagem</h2><p>Encontre experiências específicas sem misturá-las às disciplinas.</p></div></div>
   <div className={styles.toolsGrid}>
    <button type="button" onClick={()=>onOpenTopic("ENEM e Vestibulares","Provas Passadas")}><span className={styles.toolIcon}>▤</span><span><strong>Provas passadas</strong><small>Cadernos e gabaritos do ENEM</small></span><b>↗</b></button>
    <button type="button" onClick={()=>onOpenMedicine("faculdade")}><span className={styles.toolIcon}>◉</span><span><strong>Atlas anatômico</strong><small>Exploração visual e flashcards</small></span><b>↗</b></button>
    <button type="button" onClick={()=>onOpen("Ensino Fundamental")}><span className={styles.toolIcon}>✧</span><span><strong>Aulas e revisões</strong><small>Pratique por ano e disciplina</small></span><b>↗</b></button>
   </div>
  </section>
  <div className={styles.footerNote}>✦ Eduverso — Cada conquista começa com uma descoberta.</div>
 </div>
}
export function HighSchoolHome({subjects,onOpen}:{subjects:Subject[];onOpen:(subject:string)=>void}){
 const list=subjects.filter(s=>images[s.name]&&s.name!=="Anatomia"&&s.name!=="Concursos"&&s.name!=="ENEM e Vestibulares");
 return <div className={styles.home}><section className={styles.highSchoolHero}><span className={styles.eyebrow}>✦ EDUVERSO · ESTUDOS ESCOLARES</span><h1>Ensino <em>Médio.</em></h1><p>Estude as disciplinas do 1º ao 3º ano. Escolha uma matéria e filtre o ano escolar na próxima tela.</p><div className={styles.highSchoolTags}><span>1º ano</span><span>2º ano</span><span>3º ano</span></div></section><section className={styles.area}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>ESCOLHA UMA MATÉRIA</span><h2>Disciplinas do Ensino Médio</h2></div></div><div className={styles.disciplineGrid}>{list.map(s=><button type="button" className={styles.disciplineCard} key={s.name} onClick={()=>onOpen(s.name)}><img src={"/images/home/"+images[s.name]+".webp"} loading="lazy" alt=""/><span><strong>{s.name}</strong><small>Ver trilhas por ano ↗</small></span></button>)}</div></section><p className={styles.footerNote}>A distribuição por ano é orientativa e pode variar entre escolas.</p></div>
}
