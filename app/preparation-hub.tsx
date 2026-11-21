"use client";

import {useEffect,useMemo,useState} from "react";
import {getPrepGoal,getSuggestedPrepTracks,prepCatalog,prepGroups,type PrepGroup} from "./preparation-catalog";
import styles from "./preparation-hub.module.css";
import {getHistoricalPapers} from "./preparation-papers";
import PreparationStudyTools from "./preparation-study-tools";

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
  const [detailTab,setDetailTab]=useState<"roteiro"|"provas"|"pratica"|"ia">("roteiro");
  useEffect(()=>{
    const restore=()=>{
      const params=new URLSearchParams(window.location.search);
      setSelectedId(getPrepGoal(params.get("objetivo"))?.id??null);
      const group=params.get("categoria");
      setCategory(group==="vestibulares"||group==="cursos"||group==="concursos"||group==="profissionais"?group:"todas");
    };
    restore();
    window.addEventListener("popstate",restore);
    try{const saved=window.localStorage.getItem(progressKey);if(saved){const value=JSON.parse(saved);if(value&&typeof value==="object"&&!Array.isArray(value))setReviewed(value);}}catch{}
    return()=>window.removeEventListener("popstate",restore);
  },[]);
  const results=useMemo(()=>prepCatalog.filter(goal=>(category==="todas"||goal.group===category)&&!(category==="cursos"&&goal.id==="medicina")&&folded(goal.title+" "+goal.subtitle+" "+goal.id).includes(folded(query.trim()))),[category,query]);
  const goal=getPrepGoal(selectedId);
  const tracks=goal?getSuggestedPrepTracks(goal):[];
  const reviewedCount=goal?tracks.filter(track=>reviewed[goal.id+"|"+track.subject+"|"+track.topic]).length:0;
  const papers=goal?getHistoricalPapers(goal.id,goal.group==="cursos"?admissionId:undefined):[];
  const institution=getPrepGoal(admissionId);
  function changeCategory(next:Category){
    setCategory(next);
    const url=new URL(window.location.href);
    if(next==="todas")url.searchParams.delete("categoria");else url.searchParams.set("categoria",next);
    window.history.replaceState({},"",url.pathname+url.search+url.hash);
  }
  function selectGoal(id:string|null){
    setSelectedId(id);
    setDetailTab("roteiro");
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
          <button type="button" className={styles.tab+" "+(category==="todas"?styles.tabActive:"")} aria-pressed={category==="todas"} onClick={()=>changeCategory("todas")}>Todos (50)</button>
          {prepGroups.map(g=><button key={g.key} type="button" className={styles.tab+" "+(category===g.key?styles.tabActive:"")} aria-pressed={category===g.key} onClick={()=>changeCategory(g.key)}>{g.icon} {g.title} ({prepCatalog.filter(goal=>goal.group===g.key&&!(g.key==="cursos"&&goal.id==="medicina")).length})</button>)}
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
      <div className={styles.detailTabs} role="tablist" aria-label="Conteúdo da preparação">
        {([
        ["roteiro","🧭 Roteiro"],
        ["provas","📄 Provas anteriores"],
        ["pratica","📚 Aulas e questões"],
        ["ia","✨ IA personalizada"]
        ] as const).map(([id,label])=><button type="button" key={id} role="tab" aria-selected={detailTab===id} className={styles.detailTab+" "+(detailTab===id?styles.activeDetailTab:"")} onClick={()=>setDetailTab(id)}>{label}</button>)}
      </div>
      {detailTab==="roteiro"&&<>
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
      {detailTab==="provas"&&<section className={styles.library} aria-label={"Provas anteriores para "+goal.title}>
        <div className={styles.sectionTitle}><h2>Provas anteriores</h2><span>{papers.length} {papers.length===1?"fonte cadastrada":"fontes cadastradas"}</span></div>
        <p className={styles.libraryIntro}>Acesse cadernos e gabaritos de edições anteriores nos portais oficiais. Os links levam à página de cada edição ou acervo; não são PDFs hospedados pelo Eduverso.</p>
        {papers.length?<div className={styles.paperList}>{papers.map(item=><a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.paperCard}>
          <span className={styles.paperYear}>{item.year??"ACERVO"}</span><span className={styles.paperCopy}><strong>{item.title}</strong><small>{item.publisher}{item.note?" · "+item.note:""}</small></span><span className={styles.paperArrow} aria-hidden="true">↗</span>
        </a>)}</div>:<div className={styles.emptyPane}><strong>Acervo específico ainda não cadastrado</strong><p>Esta categoria pode incluir diferentes bancas, instituições, cargos e edições. Nenhum arquivo oficial foi validado para este objetivo até o momento. Não exibimos provas inventadas.</p>{goal.officialUrl&&<a href={goal.officialUrl} target="_blank" rel="noopener noreferrer">Consultar página oficial ↗</a>}</div>}
        {goal.group==="cursos"&&<p className={styles.libraryIntro}>Os documentos apresentados correspondem ao vestibular selecionado acima, e não a uma prova exclusiva para o curso de {goal.title}.</p>}
      </section>}
      {detailTab==="pratica"&&<PreparationStudyTools key={goal.id} goal={goal} onOpenTrack={onOpenTrack}/>}
      {detailTab==="ia"&&<section className={styles.aiPanel}>
        <span className={styles.heroKicker}>✨ Conteúdo personalizado</span>
        <h2>IA de preparação</h2>
        <p>A proposta é gerar aulas aprofundadas, explicações antes das questões, simulados inéditos, correções comentadas e revisões adaptadas às dificuldades do aluno — sempre identificando conteúdo gerado por IA.</p>
        <div className={styles.aiIdeas}><span>📚 Aulas por tema</span><span>🧠 Exercícios inéditos</span><span>📝 Simulados personalizados</span><span>📊 Revisões por desempenho</span></div>
        <div className={styles.note}><strong>Ainda não ativada.</strong> A plataforma está sem autenticação real e sem credencial de um provedor de IA configurada. Antes de permitir geração automática, precisamos integrar login, proteger o uso da API e configurar limite de custos. Enquanto isso, use a aba “Aulas e questões”, com material já disponível.</div>
        <button type="button" className={styles.studyButton} onClick={()=>setDetailTab("pratica")}>Usar aulas e questões existentes ↗</button>
      </section>}
    </>}
  </div>;
}
