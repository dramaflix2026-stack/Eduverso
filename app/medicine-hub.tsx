"use client";
import {useEffect,useMemo,useState} from "react";
import {getMedDiscipline,medicineDisciplines,medCycles,type MedCycle} from "./medicine-curriculum";
import styles from "./medicine-hub.module.css";
import MedicineMockExam from "./medicine-mock-exam";

export type MedicineArea="faculdade"|"vestibular"|"exames";
type Props={
 area:MedicineArea;
 onChangeArea:(next:MedicineArea)=>void;
 onOpenGoal:(category:"vestibulares"|"cursos"|"profissionais",goal?:string)=>void;
 onOpenTrack:(subject:string,topic:string)=>void;
};
type Cycle="todos"|MedCycle;
const localKey="eduverso:medicina:revisoes:v1";
const strip=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

export default function MedicineHub({area,onChangeArea,onOpenGoal,onOpenTrack}:Props){
 const [cycle,setCycle]=useState<Cycle>("todos");
 const [year,setYear]=useState(0);
 const [search,setSearch]=useState("");
 const [discipline,setDiscipline]=useState<string|null>(null);
 const [topic,setTopic]=useState<string|null>(null);
 const [chosen,setChosen]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [mockOpen,setMockOpen]=useState(false);
 const [completed,setCompleted]=useState<Record<string,boolean>>({});
 useEffect(()=>{
  const restore=()=>{
   const params=new URLSearchParams(window.location.search);
   setDiscipline(getMedDiscipline(params.get("materia"))?.slug??null);
   setTopic(params.get("assunto")??null);
  };
  restore();window.addEventListener("popstate",restore);
  try{const saved=window.localStorage.getItem(localKey);if(saved){const obj=JSON.parse(saved);if(obj&&typeof obj==="object"&&!Array.isArray(obj))setCompleted(obj)}}catch{}
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
  setDiscipline(d);setTopic(t);setChosen(null);setChecked(false);setMockOpen(false);
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function changeArea(next:MedicineArea){
  if(next===area)return;
  pushLocation(null,null);setSearch("");setCycle("todos");setYear(0);onChangeArea(next);
 }
 function verify(){
  if(chosen===null||!currentTopic)return;
  setChecked(true);
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
 return <div className={styles.med}>
  <section className={styles.hero}>
   <span className={styles.eyebrow}>✦ Eduverso Medicina</span>
   <h1>Seu caminho na <span>Medicina.</span></h1>
   <p>Da preparação para o vestibular ao aprendizado universitário e às seleções profissionais. Conteúdo estruturado por disciplinas e assuntos, com revisões comentadas.</p>
   <div className={styles.stats}><span>18 disciplinas universitárias</span><span>108 assuntos iniciais</span><span>3 caminhos de aprendizagem</span></div>
  </section>
  <div className={styles.tracks} aria-label="Escolha sua etapa na Medicina">
   {([
    {id:"vestibular",icon:"🎓",title:"Vestibular de Medicina",desc:"Preparação para ENEM, FUVEST e outros processos de ingresso."},
    {id:"faculdade",icon:"🫀",title:"Faculdade de Medicina",desc:"Disciplinas, ciclos, aulas e exercícios comentados."},
    {id:"exames",icon:"📋",title:"Revalida e Residência",desc:"Exames profissionais e provas anteriores oficiais."}
   ] as const).map(item=><button key={item.id} type="button" onClick={()=>changeArea(item.id)} aria-pressed={area===item.id} className={styles.path+" "+(area===item.id?styles.pathActive:"")}><span aria-hidden="true">{item.icon}</span><strong>{item.title}</strong><small>{item.desc}</small><i>{area===item.id?"Selecionado ✓":"Explorar ↗"}</i></button>)}
  </div>
  {area==="vestibular"&&<>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>PREPARAÇÃO PARA INGRESSO</span><h2>Seu vestibular de Medicina</h2></div></div>
   <p className={styles.note}>A aprovação em Medicina depende do vestibular ou modalidade de ingresso, não de uma prova nacional exclusiva do curso. Escolha a instituição e use as matérias da preparação geral e as provas oficiais correspondentes.</p>
   <div className={styles.pathNotes}>
    {[
     {title:"Medicina — plano de estudos",desc:"Selecione o processo seletivo desejado, estude Ciências da Natureza, Matemática, Linguagens e Redação e acompanhe o roteiro.",id:"medicina",cat:"cursos" as const},
     {title:"USP / FUVEST",desc:"Trilhas de preparação para a Universidade de São Paulo e acervo por edição.",id:"usp-fuvest",cat:"vestibulares" as const},
     {title:"ENEM e Sisu",desc:"Aulas, redação, simulados e provas do ENEM em fonte oficial.",id:"enem-sisu",cat:"vestibulares" as const},
     {title:"Outros vestibulares",desc:"Explore Unicamp, Unesp, UERJ, instituições federais e outras seleções.",id:undefined,cat:"vestibulares" as const}
    ].map(item=><div key={item.title} className={styles.resource}><strong>{item.title}</strong><p>{item.desc}</p><button type="button" className={styles.primary} onClick={()=>onOpenGoal(item.cat,item.id)}>Ver preparação e provas ↗</button></div>)}
   </div>
   <div className={styles.note}>As exigências e pesos variam por universidade, curso e edição. Consulte o edital vigente da instituição.</div>
  </>}
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
  {area==="faculdade"&&!currentDiscipline&&!mockOpen&&<>
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
   {visible.length?<div className={styles.discGrid} aria-label="Disciplinas da Faculdade de Medicina">
    {visible.map(d=><button type="button" key={d.slug} className={styles.disciplineCard} onClick={()=>pushLocation(d.slug,null)}>
     <img className={styles.cardImage} src={d.image} loading="lazy" alt=""/>
     <span className={styles.cardOverlay} aria-hidden="true"/>
     <span className={styles.cardInfo}><span className={styles.tag}>{medCycles.find(c=>c.value===d.cycle)?.label} • {d.years}</span><strong>{d.title}</strong><small>{d.description}</small><span className={styles.cardAction}>Explorar 6 assuntos ↗</span></span>
    </button>)}
   </div>:<div className={styles.empty}>Nenhuma disciplina encontrada. Tente remover algum filtro.</div>}
   <div className={styles.note}>Conteúdo acadêmico de revisão. Não substitui formação clínica, prática supervisionada ou protocolos profissionais. Para situações de saúde reais, procure atendimento qualificado.</div>
  </>}
  {area==="faculdade"&&currentDiscipline&&!currentTopic&&!mockOpen&&<>
   <button type="button" className={styles.back} onClick={()=>pushLocation(null,null)}>← Voltar às 18 disciplinas</button>
   <section className={styles.hero}>
    <span className={styles.eyebrow}>{medCycles.find(c=>c.value===currentDiscipline.cycle)?.label} · {currentDiscipline.years}</span><h1>{currentDiscipline.title}<span>.</span></h1><p>{currentDiscipline.description}. Abra uma trilha para acessar explicação, exemplo aplicado e exercício comentado.</p>
    <div className={styles.stats}><span>{currentDiscipline.topics.length} assuntos</span><span>{currentDiscipline.topics.filter(t=>completed[t.id]).length} revisados corretamente</span></div>
   </section>
   <div className={styles.sectionHead}><h2>Assuntos de {currentDiscipline.title}</h2><button type="button" className={styles.primary} onClick={()=>setMockOpen(true)}>📝 Simulado da matéria</button></div>
   <div className={styles.topicGrid}>
    {currentDiscipline.topics.map((t,i)=><button type="button" key={t.id} className={styles.topicCard} onClick={()=>pushLocation(currentDiscipline.slug,t.id)}>
     <span>{String(i+1).padStart(2,"0")}</span><strong>{t.name}</strong><small>{completed[t.id]?"✓ Exercício resolvido corretamente":"Aula, exemplo e questão comentada"}</small><span className={styles.cardAction}>Estudar assunto ↗</span>
    </button>)}
   </div>
   {currentDiscipline.slug==="anatomia-humana"&&<div className={styles.resource}><strong>Integração com Anatomia do Eduverso</strong><p>Você também pode explorar as trilhas visuais de ossos, músculos, sistemas corporais e outras estruturas já existentes na plataforma.</p><button className={styles.primary} onClick={()=>onOpenTrack("Anatomia","Sistema ósseo")}>Abrir trilhas de Anatomia ↗</button></div>}
  </>}
  {area==="faculdade"&&currentDiscipline&&currentTopic&&!mockOpen&&<>
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
    <div className={styles.actions}><button type="button" className={styles.secondary} onClick={()=>pushLocation(currentDiscipline.slug,null)}>Ver todos os assuntos</button><button type="button" className={styles.primary} onClick={nextTopic}>Próximo assunto →</button></div>
    <div className={styles.note}>Material para aprendizagem teórica. Não é diagnóstico, indicação de tratamento nem procedimento para realização sem supervisão profissional.</div>
   </article>
  </>}
 </div>;
}
