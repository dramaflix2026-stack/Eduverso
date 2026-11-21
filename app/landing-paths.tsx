"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

type PathItem={title:string;subtitle:string;href:string};
type StudyPath={
 id:"escola"|"provas"|"medicina";
 icon:string;
 label:string;
 short:string;
 eyebrow:string;
 title:string;
 description:string;
 image:string;
 imageAlt:string;
 options:PathItem[];
};

const paths:StudyPath[]=[
 {
  id:"escola",icon:"▤",label:"Estudos escolares",short:"Escola",
  eyebrow:"FUNDAMENTAL E ENSINO MÉDIO",title:"Aprenda em cada etapa.",
  description:"Matérias organizadas para acompanhar o seu ano escolar, com aulas e atividades.",
  image:"/images/home/matematica.webp",imageAlt:"Elementos visuais da matemática",
  options:[
   {title:"Ensino Fundamental",subtitle:"Do 1º ao 9º ano",href:"/plataforma?disciplina=Ensino%20Fundamental"},
   {title:"Ensino Médio",subtitle:"Do 1º ao 3º ano",href:"/plataforma?disciplina=Ensino%20M%C3%A9dio"}
  ]
 },
 {
  id:"provas",icon:"◎",label:"Preparação e carreiras",short:"Provas",
  eyebrow:"ENEM, VESTIBULARES E CONCURSOS",title:"Prepare-se com direção.",
  description:"Encontre conteúdos, questões e trilhas para se preparar para o seu próximo desafio.",
  image:"/images/home/enem-e-vestibulares.webp",imageAlt:"Estudante se preparando para exames",
  options:[
   {title:"ENEM e Vestibulares",subtitle:"Matérias, revisão e provas",href:"/plataforma?disciplina=ENEM%20e%20Vestibulares"},
   {title:"Concursos",subtitle:"Preparação por objetivo",href:"/plataforma?disciplina=Minha%20Prepara%C3%A7%C3%A3o&categoria=concursos"}
  ]
 },
 {
  id:"medicina",icon:"✚",label:"Medicina",short:"Medicina",
  eyebrow:"DA PREPARAÇÃO À VIDA ACADÊMICA",title:"Estude Medicina em cada fase.",
  description:"Vestibular, graduação e exames profissionais, com estudos e recursos dedicados.",
  image:"/images/home/anatomia.webp",imageAlt:"Ilustração anatômica do corpo humano",
  options:[
   {title:"Vestibular de Medicina",subtitle:"Preparação para ingressar",href:"/plataforma?disciplina=Medicina&area=vestibular"},
   {title:"Faculdade de Medicina",subtitle:"Disciplinas e atlas interativo",href:"/plataforma?disciplina=Medicina&area=faculdade"},
   {title:"Revalida e residência",subtitle:"Revisão e aprofundamento",href:"/plataforma?disciplina=Medicina&area=exames"}
  ]
 }
];

export default function LandingPaths(){
 const [selected,setSelected]=useState<StudyPath["id"]>("escola");
 const current=paths.find(p=>p.id===selected)??paths[0];
 return <div className="lp-chooser">
  <div className="lp-chooser-tabs" role="group" aria-label="Escolha seu objetivo de estudo">
   {paths.map(p=><button type="button" key={p.id} aria-pressed={selected===p.id}
    className={"lp-chooser-tab"+(selected===p.id?" is-selected":"")} onClick={()=>setSelected(p.id)}>
    <span className="lp-chooser-tab-icon" aria-hidden="true">{p.icon}</span>
    <span className="lp-chooser-tab-title">{p.short}</span>
    <small>{p.id==="escola"?"Fundamental e Médio":p.id==="provas"?"ENEM e concursos":"Vestibular à residência"}</small>
    <span className="lp-chooser-indicator" aria-hidden="true"/>
   </button>)}
  </div>
  <div className="lp-chooser-panel" aria-live="polite">
   <div className="lp-chooser-panel-top">
    <div className="lp-chooser-panel-copy">
     <span className="lp-eyebrow">{current.eyebrow}</span>
     <h3>{current.title}</h3>
     <p>{current.description}</p>
    </div>
    <div className="lp-chooser-image"><Image src={current.image} alt={current.imageAlt}
      fill sizes="(max-width: 560px) 104px, (max-width: 820px) 180px, 240px"/></div>
   </div>
   <div className="lp-chooser-links" aria-label={"Caminhos de "+current.label}>
    {current.options.map(opt=><Link key={opt.title} href={opt.href}>
      <span className="lp-chooser-link-copy"><strong>{opt.title}</strong><small>{opt.subtitle}</small></span>
      <span className="lp-chooser-link-arrow" aria-hidden="true">↗</span>
     </Link>)}
   </div>
  </div>
 </div>;
}
