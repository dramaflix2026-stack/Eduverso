"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";

const demos=[
 {id:"aula",name:"Aulas e questões",icon:"✎",heading:"Aula explicada, prática e correção",description:"Abra uma aula de Frações em Matemática e veja exercícios com correção comentada.",href:"/plataforma?disciplina=Matem%C3%A1tica&trilha=Fra%C3%A7%C3%B5es",asset:"/images/home/matematica.webp"},
 {id:"atlas",name:"Atlas anatômico",icon:"◉",heading:"Aprenda anatomia explorando o corpo",description:"Conheça o atlas do sistema esquelético com desafios e flashcards interativos.",href:"/plataforma?disciplina=Medicina&area=faculdade&atlas=1",asset:"/images/home/anatomia.webp"},
 {id:"enem",name:"Provas do ENEM",icon:"▤",heading:"Provas e gabaritos para estudar",description:"Acesse a seção de provas passadas do ENEM e seus documentos oficiais.",href:"/plataforma?disciplina=ENEM%20e%20Vestibulares&trilha=Provas%20Passadas",asset:"/images/home/enem-e-vestibulares.webp"}
] as const;

export default function LandingPreview(){
 const [active,setActive]=useState(0);
 const [opened,setOpened]=useState(false);
 const current=demos[active];
 function choose(index:number){setActive(index);setOpened(false);}
 return <div className="lp-demo-layout">
  <div className="lp-demo-selector" role="group" aria-label="Escolha uma demonstração">
   {demos.map((demo,i)=><button type="button" key={demo.id} className={"lp-demo-selector-item"+(active===i?" lp-demo-active":"")} aria-pressed={active===i} onClick={()=>choose(i)}>
    <span className="lp-demo-selector-icon" aria-hidden="true">{demo.icon}</span>
    <span><strong>{demo.name}</strong><small>{demo.description}</small></span>
    <span className="lp-demo-selector-arrow" aria-hidden="true">↗</span>
   </button>)}
   <div className="lp-demo-detail">
    <span className="lp-eyebrow">EXPERIÊNCIA DO ALUNO</span>
    <h3>{current.heading}</h3>
    <p>{current.description}</p>
    <Link href={current.href} className="lp-button lp-demo-open">Abrir na plataforma <span aria-hidden="true">↗</span></Link>
   </div>
  </div>
  <div className="lp-demo-device">
   <div className="lp-demo-device-top"><span className="lp-demo-dots" aria-hidden="true">● ● ●</span><span>Eduverso · demonstração real</span><span className="lp-demo-live">● Ao vivo</span></div>
   <div className="lp-demo-view">
    {opened?<iframe key={current.id} src={current.href} title={"Prévia interativa real: "+current.name} loading="lazy" referrerPolicy="same-origin" />:
     <div className="lp-demo-placeholder">
      <Image src={current.asset} alt="" fill sizes="(max-width: 620px) 86vw, 48vw"/>
      <span className="lp-demo-placeholder-shade" aria-hidden="true"/>
      <div className="lp-demo-placeholder-content"><span className="lp-demo-label">PLATAFORMA EDUVERSO</span><strong>{current.heading}</strong><p>Acesse uma prévia interativa desta funcionalidade sem sair da página.</p><button type="button" onClick={()=>setOpened(true)}>Carregar demonstração real <span aria-hidden="true">↗</span></button></div>
     </div>}
   </div>
   <div className="lp-demo-device-footer"><span>{opened?"Prévia navegável da plataforma":"Carregamento sob demanda para economizar dados"}</span><Link href={current.href}>Abrir em tela cheia ↗</Link></div>
  </div>
 </div>;
}
