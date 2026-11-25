"use client";

import Image from "next/image";
import {useState} from "react";

type Demo = {
 id:"aula"|"atlas"|"enem";name:string;icon:string;heading:string;description:string;href:string;asset:string;
 prompt:string;answers:[string,string,string];correct:number;explanation:string;label:string;
};
const demos:Demo[]=[
 {id:"aula",name:"Aulas e questões",icon:"✎",heading:"Aprenda com uma questão comentada",description:"Veja como uma explicação ajuda a compreender a resposta.",href:"/plataforma?disciplina=Matem%C3%A1tica&trilha=Fra%C3%A7%C3%B5es",asset:"/images/home/matematica.webp",label:"EXEMPLO DIDÁTICO · MATEMÁTICA",prompt:"Qual fração é equivalente a 1/2?",answers:["1/4","2/4","3/5"],correct:1,explanation:"Dividindo numerador e denominador de 2/4 por 2, obtemos 1/2. Frações equivalentes representam a mesma quantidade."},
 {id:"atlas",name:"Atlas anatômico",icon:"◉",heading:"Teste seus conhecimentos de anatomia",description:"Conheça a prática de identificação de estruturas do corpo humano.",href:"/plataforma?disciplina=Medicina&area=faculdade&atlas=1",asset:"/images/home/anatomia.webp",label:"EXEMPLO DIDÁTICO · ANATOMIA",prompt:"Qual estrutura óssea ajuda a proteger os pulmões?",answers:["Costelas","Fêmur","Mandíbula"],correct:0,explanation:"As costelas, junto com o esterno e as vértebras torácicas, formam a caixa torácica, que protege os pulmões e outros órgãos."},
 {id:"enem",name:"Preparação ENEM",icon:"▤",heading:"Experimente uma questão de preparação",description:"Pratique uma resolução e depois explore os cadernos de provas anteriores.",href:"/plataforma?disciplina=ENEM%20e%20Vestibulares&trilha=Provas%20Passadas",asset:"/images/home/enem-e-vestibulares.webp",label:"EXEMPLO AUTORAL · NÃO É QUESTÃO OFICIAL",prompt:"Um livro custa R$ 60 e tem desconto de 10%. Quanto será pago?",answers:["R$ 56","R$ 54","R$ 50"],correct:1,explanation:"10% de 60 é 6. Portanto, o valor com desconto é R$ 60 − R$ 6 = R$ 54."}
];
export default function LandingPreview(){
 const [active,setActive]=useState(0);
 const [selected,setSelected]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [opened,setOpened]=useState(false);
 const demo=demos[active];
 const choose=(index:number)=>{setActive(index);setSelected(null);setChecked(false);setOpened(false);};
 return <div className="lp-demo-layout">
  <div className="lp-demo-selector" role="group" aria-label="Escolha uma demonstração">
   {demos.map((item,index)=><button type="button" key={item.id} className={"lp-demo-selector-item"+(active===index?" lp-demo-active":"")} aria-pressed={active===index} onClick={()=>choose(index)}>
    <span className="lp-demo-selector-icon" aria-hidden="true">{item.icon}</span>
    <span><strong>{item.name}</strong><small>{item.description}</small></span>
    <span className="lp-demo-selector-arrow" aria-hidden="true">↗</span>
   </button>)}
   <div className="lp-demo-detail"><span className="lp-eyebrow">EXPERIMENTE NA PRÁTICA</span><h3>{demo.heading}</h3><p>{demo.description}</p>
    <a className="lp-button lp-demo-open" href={demo.href}>Abrir na plataforma <span aria-hidden="true">↗</span></a>
   </div>
  </div>
  <div className="lp-demo-device">
   <div className="lp-demo-device-top"><span className="lp-demo-dots" aria-hidden="true">● ● ●</span><span>Eduverso · exemplo interativo</span><span className="lp-demo-live">● Teste agora</span></div>
   <div className="lp-demo-view">
    {opened?<iframe key={demo.id} src={demo.href} title={"Plataforma Eduverso: "+demo.name} loading="lazy" referrerPolicy="same-origin"/>:
    <div className="lp-live-demo" key={demo.id}>
     <div className="lp-live-demo-banner">
      <Image src={demo.asset} alt="" fill sizes="(max-width: 620px) 90vw, 40vw" />
      <span className="lp-live-demo-banner-shade" aria-hidden="true"/>
      <strong>{demo.name}</strong>
     </div>
     <div className="lp-live-demo-main">
      <span className="lp-demo-label">{demo.label}</span>
      <h3>{demo.prompt}</h3>
      <div className="lp-live-options" role="group" aria-label="Alternativas da questão">
       {demo.answers.map((answer,index)=><button type="button" key={answer} className={"lp-live-option"+(selected===index?" is-selected":"")+(checked&&index===demo.correct?" is-correct":"")} aria-pressed={selected===index} disabled={checked} onClick={()=>setSelected(index)}><span>{String.fromCharCode(65+index)}</span>{answer}</button>)}
      </div>
      {checked&&selected!==null&&<div role="status" className={"lp-live-result"+(selected===demo.correct?" success":"")}><strong>{selected===demo.correct?"Acertou!":"Vamos revisar?"}</strong><p>{demo.explanation}</p></div>}
      <div className="lp-live-actions">
       {!checked?<button type="button" disabled={selected===null} onClick={()=>setChecked(true)} className="lp-button lp-live-check">Ver resultado ↗</button>:
        <button type="button" onClick={()=>{setSelected(null);setChecked(false);}} className="lp-outline lp-live-check">Tentar de novo ↻</button>}
       <button type="button" className="lp-live-more" onClick={()=>setOpened(true)}>Ver tela completa ↗</button>
      </div>
     </div>
    </div>}
   </div>
   <div className="lp-demo-device-footer"><span>{opened?"Navegação pela plataforma":"Experimente uma questão sem cadastro"}</span><a href={demo.href}>Abrir na plataforma ↗</a></div>
  </div>
 </div>;
}
