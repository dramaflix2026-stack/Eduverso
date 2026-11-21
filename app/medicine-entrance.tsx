"use client";
import {useEffect,useMemo,useState} from "react";
import styles from "./medicine-hub.module.css";

export type EntranceTopic={name:string;description:string;image?:string};
export type EntranceSubject={
 id:string;name:string;subject:string;description:string;image:string;
 focusTopics?:string[];
};
export const entranceSubjects:EntranceSubject[]=[
 {id:"biologia",name:"Biologia",subject:"Biologia",description:"Genética, ecologia, células e fisiologia",image:"/images/home/biologia.webp"},
 {id:"quimica",name:"Química",subject:"Química",description:"Estequiometria, orgânica, soluções e reações",image:"/images/home/quimica.webp"},
 {id:"fisica",name:"Física",subject:"Física",description:"Mecânica, eletricidade, energia e ondas",image:"/images/home/fisica.webp"},
 {id:"matematica",name:"Matemática",subject:"Matemática",description:"Funções, estatística, geometria e probabilidade",image:"/images/home/matematica.webp"},
 {id:"portugues",name:"Português",subject:"Português",description:"Interpretação, gramática e linguagens",image:"/images/home/portugues.webp"},
 {id:"redacao",name:"Redação",subject:"Português",description:"Produção textual, argumentação e repertório",image:"/images/trilhas/09_Redacao.png",focusTopics:["Redação","Argumentação e repertório","Coesão e coerência","Tipologia textual","Gêneros textuais","Pontuação"]},
 {id:"historia",name:"História",subject:"História",description:"Brasil, história geral e mundo contemporâneo",image:"/images/home/historia.webp"},
 {id:"geografia",name:"Geografia",subject:"Geografia",description:"Cartografia, clima, geopolítica e sociedade",image:"/images/home/geografia.webp"},
 {id:"literatura",name:"Literatura",subject:"Português",description:"Obras, escolas literárias e leitura crítica",image:"/images/trilhas/10_Literatura.png",focusTopics:["Literatura","Escolas literárias","Literatura brasileira"]},
 {id:"ingles",name:"Inglês",subject:"Inglês",description:"Interpretação de textos e vocabulário",image:"/images/home/ingles.webp"}
];
type Props={
 getTopics:(subject:string)=>EntranceTopic[];
 onOpenTrack:(subject:string,topic:string)=>void;
 onOpenGoal:(category:"vestibulares"|"cursos"|"profissionais",goal?:string)=>void;
};
const normal=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

export default function MedicineEntrance({getTopics,onOpenTrack,onOpenGoal}:Props){
 const [selectedId,setSelectedId]=useState<string|null>(null);
 const [query,setQuery]=useState("");
 useEffect(()=>{
   const restore=()=>{
     const requested=new URLSearchParams(window.location.search).get("vestMateria");
     setSelectedId(entranceSubjects.find(s=>s.id===requested)?.id??null);
   };
   restore();window.addEventListener("popstate",restore);
   return()=>window.removeEventListener("popstate",restore);
 },[]);
 const selected=entranceSubjects.find(s=>s.id===selectedId);
 const topics=useMemo(()=>{
   if(!selected)return [];
   const all=getTopics(selected.subject);
   return selected.focusTopics?all.filter(t=>selected.focusTopics!.includes(t.name)):all;
 },[selected,getTopics]);
 const visibleSubjects=entranceSubjects.filter(s=>normal(s.name+" "+s.description).includes(normal(query.trim())));
 const visibleTopics=topics.filter(t=>normal(t.name+" "+t.description).includes(normal(query.trim())));
 function navigate(id:string|null){
   const url=new URL(window.location.href);
   if(id)url.searchParams.set("vestMateria",id);else url.searchParams.delete("vestMateria");
   window.history.pushState({},"",url.pathname+url.search+url.hash);
   setSelectedId(id);setQuery("");
   window.scrollTo({top:0,behavior:"smooth"});
 }
 return <section className={styles.entrance} aria-label="Matérias do vestibular de Medicina">
   {selected?<>
    <button type="button" className={styles.back} onClick={()=>navigate(null)}>← Voltar às matérias do vestibular</button>
    <div className={styles.sectionHead}><div><span className={styles.eyebrow}>VESTIBULAR DE MEDICINA · {selected.name.toUpperCase()}</span><h2>Assuntos de {selected.name}</h2></div><small>{visibleTopics.length} trilhas</small></div>
    <p className={styles.note}>Selecione um assunto para estudar com a explicação, os exemplos e as questões que já existem no Eduverso.</p>
    <label className={styles.search}><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar assunto..." aria-label={"Buscar assuntos de "+selected.name}/></label>
    {visibleTopics.length?<div className={styles.discGrid}>
      {visibleTopics.map(t=><button type="button" key={selected.id+"|"+t.name} className={styles.disciplineCard} onClick={()=>onOpenTrack(selected.subject,t.name)} aria-label={"Estudar "+t.name}>
        <img src={t.image||selected.image} className={styles.cardImage} alt="" loading="lazy"/>
        <span className={styles.cardOverlay} aria-hidden="true"/>
        <span className={styles.cardInfo}><span className={styles.tag}>TRILHA · {selected.name}</span><strong>{t.name}</strong><small>{t.description}</small><span className={styles.cardAction}>Começar a estudar ↗</span></span>
      </button>)}
     </div>:<div className={styles.empty}>Nenhum assunto encontrado. Limpe a busca para ver todas as trilhas.</div>}
   </>:<>
    <div className={styles.sectionHead}><div><span className={styles.eyebrow}>PREPARAÇÃO PARA INGRESSO</span><h2>Matérias do Vestibular de Medicina</h2></div><small>{entranceSubjects.length} áreas</small></div>
    <p className={styles.note}>Escolha uma matéria e depois um assunto para estudar. As trilhas usam conteúdos já existentes e não substituem o edital de cada vestibular.</p>
    <label className={styles.search}><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar Biologia, Química, Redação..." aria-label="Buscar matérias do vestibular de Medicina"/></label>
    {visibleSubjects.length?<div className={styles.discGrid}>
     {visibleSubjects.map(s=><button type="button" key={s.id} className={styles.disciplineCard} onClick={()=>navigate(s.id)} aria-label={"Explorar "+s.name}>
       <img src={s.image} className={styles.cardImage} alt="" loading="lazy"/>
       <span className={styles.cardOverlay} aria-hidden="true"/>
       <span className={styles.cardInfo}><span className={styles.tag}>MATÉRIA · MEDICINA</span><strong>{s.name}</strong><small>{s.description}</small><span className={styles.cardAction}>Ver assuntos ↗</span></span>
     </button>)}
    </div>:<div className={styles.empty}>Nenhuma matéria encontrada.</div>}
    <div className={styles.entranceResources}>
     <div className={styles.resource}><strong>📄 Provas anteriores do ENEM</strong><p>Acesse os cadernos e gabaritos por ano, separados das questões criadas para estudo.</p><button className={styles.primary} type="button" onClick={()=>onOpenTrack("ENEM e Vestibulares","Provas Passadas")}>Explorar provas anteriores ↗</button></div>
     <div className={styles.resource}><strong>🎓 Provas de Medicina por instituição</strong><p>FUVEST, ENEM e outros processos seletivos têm regras e cadernos próprios.</p><button className={styles.primary} type="button" onClick={()=>onOpenGoal("cursos","medicina")}>Escolher vestibular ↗</button></div>
    </div>
   </>}
 </section>;
}
