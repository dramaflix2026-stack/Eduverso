"use client";

import {useEffect,useMemo,useState} from "react";
import {getPrepGoal,getSuggestedPrepTracks,prepCatalog,prepGroups,type PrepGroup} from "./preparation-catalog";
import styles from "./preparation-hub.module.css";

type Props={onOpenTrack:(subject:string,topic:string)=>void};
type Category="todas"|PrepGroup;
const progressKey="eduverso:objetivos:estudos:v1";
function folded(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR");}

export default function PreparationHub({onOpenTrack}:Props){
  const [category,setCategory]=useState<Category>("todas");
  const [query,setQuery]=useState("");
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const [admissionId,setAdmissionId]=useState("enem-sisu");
  const [reviewed,setReviewed]=useState<Record<string,boolean>>({});
  useEffect(()=>{
    const restore=()=>setSelectedId(getPrepGoal(new URLSearchParams(window.location.search).get("objetivo"))?.id??null);
    restore();
    window.addEventListener("popstate",restore);
    try{const saved=window.localStorage.getItem(progressKey);if(saved){const value=JSON.parse(saved);if(value&&typeof value==="object"&&!Array.isArray(value))setReviewed(value);}}catch{}
    return()=>window.removeEventListener("popstate",restore);
  },[]);
  const results=useMemo(()=>prepCatalog.filter(goal=>(category==="todas"||goal.group===category)&&folded(goal.title+" "+goal.subtitle+" "+goal.id).includes(folded(query.trim()))),[category,query]);
  const goal=getPrepGoal(selectedId);
  const tracks=goal?getSuggestedPrepTracks(goal):[];
  const reviewedCount=goal?tracks.filter(track=>reviewed[goal.id+"|"+track.subject+"|"+track.topic]).length:0;
  const institution=getPrepGoal(admissionId);
  function selectGoal(id:string|null){
    setSelectedId(id);
    const url=new URL(window.location.href);
    if(id)url.searchParams.set("objetivo",id);else url.searchParams.delete("objetivo");
    window.history.pushState({},"",url.pathname+url.search+url.hash);
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function toggleReviewed(subject:string,topic:string){
    if(!goal)return;
    const key=goal.id+"|"+subject+"|"+topic;
    const next={...reviewed,[key]:!reviewed[key]};
    setReviewed(next);
    try{window.localStorage.setItem(progressKey,JSON.stringify(next));}catch{}
  }
  return <div className={styles.hub}>
    {!goal?<>
      <section className={styles.hero}>
        <div>
          <div className={styles.heroKicker}>✦ Seu próximo objetivo começa aqui</div>
          <h1>Escolha onde você quer <span>chegar.</span></h1>
          <p>Explore vestibulares, carreiras, concursos e exames profissionais. Organize um roteiro inicial e comece pelas trilhas de aprendizagem já disponíveis no Eduverso.</p>
          <div className={styles.statRow}>
            <span className={styles.stat}><b>50</b> objetivos</span>
            <span className={styles.stat}><b>4</b> caminhos</span>
            <span className={styles.stat}>Estudo por etapas</span>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">🎯</div>
      </section>
      <section className={styles.tools} aria-label="Localizar objetivo">
        <div className={styles.groupTabs} role="group" aria-label="Filtrar objetivos por categoria">
          <button type="button" className={styles.tab+" "+(category==="todas"?styles.tabActive:"")} aria-pressed={category==="todas"} onClick={()=>setCategory("todas")}>Todos (50)</button>
          {prepGroups.map(g=><button key={g.key} type="button" className={styles.tab+" "+(category===g.key?styles.tabActive:"")} aria-pressed={category===g.key} onClick={()=>setCategory(g.key)}>{g.icon} {g.title} ({prepCatalog.filter(goal=>goal.group===g.key).length})</button>)}
        </div>
        <label className={styles.search}><span aria-hidden="true">⌕</span><input aria-label="Buscar universidades, cursos, concursos e exames" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busque Medicina, USP, INSS, Polícia Federal..."/></label>
        <p className={styles.count}>{results.length} {results.length===1?"opção encontrada":"opções encontradas"}</p>
      </section>
      {results.length>0?<section className={styles.cards} aria-label="Objetivos de preparação">
        {results.map((item,i)=>{
          const group=prepGroups.find(g=>g.key===item.group)!;
          return <button type="button" key={item.id} className={styles.goalCard} onClick={()=>selectGoal(item.id)} aria-label={"Abrir plano de "+item.title}>
            <span className={styles.cardIcon} aria-hidden="true">{group.icon}</span>
            <span className={styles.cardBadge}>{group.title}</span>
            <strong>{item.title}</strong>
            <small>{item.subtitle}</small>
            <span className={styles.open}>Ver roteiro de estudo ↗</span>
          </button>;
        })}
      </section>:<div className={styles.empty}>Nenhum objetivo encontrado. Tente outra busca ou selecione outra categoria.</div>}
      <p className={styles.footer}>As opções representam caminhos de preparação, não inscrições abertas nem editais vigentes. Requisitos, disciplinas, pesos, datas e etapas devem ser verificados nos canais oficiais.</p>
    </>:<>
      <button className={styles.back} type="button" onClick={()=>selectGoal(null)}>← Voltar aos 50 objetivos</button>
      <section className={styles.detailHead}>
        <div className={styles.heroKicker}>{prepGroups.find(g=>g.key===goal.group)?.icon} {prepGroups.find(g=>g.key===goal.group)?.title}</div>
        <h1 className={styles.detailTitle}>{goal.title}<span style={{color:"#b394ff"}}>.</span></h1>
        <p className={styles.detailDesc}>{goal.subtitle}</p>
        {goal.group==="cursos"&&<div className={styles.field}>
          <label htmlFor="select-vestibular">Qual vestibular ou instituição você deseja priorizar?</label>
          <select id="select-vestibular" value={admissionId} onChange={e=>setAdmissionId(e.target.value)}>
            {prepCatalog.filter(item=>item.group==="vestibulares").map(item=><option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
          <div className={styles.note}>Você escolheu {institution?.title??"um processo seletivo"}. Este roteiro apresenta fundamentos para a graduação desejada; confira as provas, pesos e disciplinas da instituição selecionada antes de definir sua estratégia final.
            {institution?.officialUrl&&<> <a href={institution.officialUrl} target="_blank" rel="noopener noreferrer" className={styles.pathLink}>Consultar portal oficial ↗</a></>}
          </div>
        </div>}
        {goal.officialUrl&&<a className={styles.pathLink} href={goal.officialUrl} target="_blank" rel="noopener noreferrer">Consultar página oficial ↗</a>}
      </section>
      <div className={styles.note}><strong>Roteiro inicial, não edital.</strong> As trilhas abaixo aproveitam o conteúdo existente no Eduverso e são sugestões de base geral. Provas específicas podem exigir outras disciplinas, legislações, habilidades e formatos ainda não cadastrados. Use o edital vigente para validar sua preparação.</div>
      <div className={styles.sectionTitle}><h2>Seu caminho de estudos</h2><span>{reviewedCount} de {tracks.length} trilhas revisadas</span></div>
      <div className={styles.progress} role="progressbar" aria-label="Progresso do roteiro" aria-valuenow={reviewedCount} aria-valuemin={0} aria-valuemax={tracks.length}>
        <div className={styles.progressFill} style={{width:(tracks.length?100*reviewedCount/tracks.length:0)+"%"}}/>
      </div>
      <section className={styles.trackGrid} aria-label="Trilhas sugeridas para o objetivo">
        {tracks.map((track,index)=>{
          const isDone=!!reviewed[goal.id+"|"+track.subject+"|"+track.topic];
          return <article key={track.subject+"|"+track.topic} className={styles.track}>
            <div className={styles.trackTop}>
              <span className={styles.trackNumber}>{String(index+1).padStart(2,"0")}</span>
              <div className={styles.trackNames}><strong>{track.topic}</strong><small>{track.subject}</small></div>
            </div>
            <div className={styles.trackActions}>
              <button className={styles.studyButton} type="button" onClick={()=>onOpenTrack(track.subject,track.topic)}>Começar a estudar ↗</button>
              <button className={styles.markButton+" "+(isDone?styles.marked:"")} type="button" aria-pressed={isDone} onClick={()=>toggleReviewed(track.subject,track.topic)}>{isDone?"✓ Revisada":"Marcar revisada"}</button>
            </div>
          </article>;
        })}
      </section>
      <p className={styles.footer}>As marcações de revisão são salvas somente neste navegador. Não constituem comprovação de domínio ou histórico sincronizado com sua conta.</p>
    </>}
  </div>;
}
