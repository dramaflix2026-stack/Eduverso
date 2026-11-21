"use client";
import Link from "next/link";
import {FormEvent,useMemo,useState} from "react";
import {useRouter} from "next/navigation";

const topics=[
 {label:"Matemática",description:"Números, operações, funções e geometria",href:"/plataforma?disciplina=Matem%C3%A1tica",keywords:"algebra fracoes equacoes porcentagem"},
 {label:"Português",description:"Leitura, redação e gramática",href:"/plataforma?disciplina=Portugu%C3%AAs",keywords:"redacao gramatica interpretacao"},
 {label:"Biologia",description:"A vida e suas conexões",href:"/plataforma?disciplina=Biologia",keywords:"genetica ecologia celulas"},
 {label:"História",description:"Brasil, mundo e civilizações",href:"/plataforma?disciplina=Hist%C3%B3ria",keywords:"historia do brasil guerras"},
 {label:"Física",description:"Movimento, forças e energia",href:"/plataforma?disciplina=F%C3%ADsica",keywords:"mecanica eletricidade"},
 {label:"Química",description:"Elementos, reações e transformações",href:"/plataforma?disciplina=Qu%C3%ADmica",keywords:"quimica tabela periodica"},
 {label:"Geografia",description:"Territórios e natureza",href:"/plataforma?disciplina=Geografia",keywords:"geopolitica clima cartografia"},
 {label:"Inglês",description:"Vocabulário e compreensão",href:"/plataforma?disciplina=Ingl%C3%AAs",keywords:"idiomas ingles conversacao"},
 {label:"Anatomia",description:"Sistemas do corpo humano",href:"/plataforma?disciplina=Anatomia",keywords:"corpo humano ossos musculos medicina"},
 {label:"ENEM e Vestibulares",description:"Preparação, simulados e provas",href:"/plataforma?disciplina=ENEM%20e%20Vestibulares",keywords:"vestibular provas passadas enem"},
 {label:"Concursos",description:"Preparação e carreiras",href:"/plataforma?disciplina=Minha%20Prepara%C3%A7%C3%A3o&categoria=concursos",keywords:"concursos publicos carreira"},
 {label:"Ensino Fundamental",description:"1º ao 9º ano",href:"/plataforma?disciplina=Ensino%20Fundamental",keywords:"fundamental criancas ensino escolar"},
 {label:"Ensino Médio",description:"1º ao 3º ano",href:"/plataforma?disciplina=Ensino%20M%C3%A9dio",keywords:"ensino medio escola"},
 {label:"Medicina",description:"Vestibular, faculdade e residência",href:"/plataforma?disciplina=Medicina&area=faculdade",keywords:"medico saude atlas anatomico"}
];
const chips=["Matemática","Português","ENEM e Vestibulares","Biologia","Inglês","Anatomia"];
function normalized(input:string){return input.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}
export default function LandingSearch(){
 const [query,setQuery]=useState("");
 const router=useRouter();
 const matches=useMemo(()=>{
  const needle=normalized(query);
  if(needle.length<2)return [];
  return topics.filter(x=>normalized(x.label+" "+x.description+" "+x.keywords).includes(needle)).slice(0,6);
 },[query]);
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(matches.length)router.push(matches[0].href);
 }
 return <div className="lp-find">
  <form onSubmit={submit} role="search" className="lp-find-form">
   <span aria-hidden="true" className="lp-search-icon">⌕</span>
   <input aria-label="Buscar disciplina, matéria ou prova" type="search" autoComplete="off" placeholder="Buscar disciplina, matéria ou prova..." value={query} onChange={e=>setQuery(e.target.value)} />
   <button type="submit" disabled={matches.length===0} aria-label="Abrir primeiro resultado">→</button>
  </form>
  {query.trim().length>=2?
   <div className="lp-find-results" aria-live="polite">
    {matches.length?matches.map(x=><Link href={x.href} key={x.href}><span><strong>{x.label}</strong><small>{x.description}</small></span><span aria-hidden="true">↗</span></Link>):<p>Nenhuma correspondência. Tente outra disciplina ou assunto.</p>}
   </div>:
   <div className="lp-chips" aria-label="Pesquisas rápidas">{chips.map(label=>{const item=topics.find(x=>x.label===label)!;return <Link href={item.href} key={label}>{label}</Link>})}</div>
  }
 </div>;
}
