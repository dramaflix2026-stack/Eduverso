"use client";
import Link from "next/link";

type Plan = {id:"inicial"|"avancado"|"professores";name:string;price:string;subtitle:string;caption:string;points:string[];featured?:boolean};
const plans:Plan[]=[
 {id:"inicial",name:"Inicial",price:"29,90",subtitle:"Seu ponto de partida",caption:"Para quem está construindo uma rotina de estudos",points:["Encontre seu caminho de aprendizagem","Conheça aulas e questões da plataforma","Estude pelo celular ou computador"]},
 {id:"avancado",name:"Avançado",price:"49,90",subtitle:"Para ir mais longe",caption:"Para quem procura aprofundamento e prática frequente",points:["Explore diferentes áreas de estudo","Conheça simulados, revisão e atividades","Organize uma jornada de preparação"],featured:true},
 {id:"professores",name:"Professores",price:"79,90",subtitle:"Para quem ensina",caption:"Opção voltada a profissionais da educação",points:["Cadastro com interesse em uso docente","Conheça os recursos educacionais existentes","Funcionalidades específicas para professores em planejamento"]}
];
export default function LandingPricing(){
 return <section className="lp-section lp-pricing-wrap" id="planos" aria-labelledby="lp-pricing-title">
  <div className="lp-container">
   <div className="lp-pricing-top">
    <div><span className="lp-eyebrow">PLANOS DO EDUVERSO</span><h2 id="lp-pricing-title">Escolha como <em>quer evoluir.</em></h2><p>Três opções para diferentes momentos de estudo. Compare os valores e manifeste interesse no acesso que combina com você.</p></div>
    <div className="lp-pricing-intro-card"><span aria-hidden="true">✦</span><strong>A partir de R$ 29,90</strong><small>Encontre uma opção para seu momento</small></div>
   </div>
   <div className="lp-pricing-grid">
    {plans.map(plan=><article key={plan.id} className={"lp-price-card"+(plan.featured?" lp-price-card-featured":"")}>
     <div className="lp-price-head"><span className="lp-price-name">{plan.name}</span>{plan.featured&&<span className="lp-price-highlight">Em destaque</span>}</div>
     <h3>{plan.subtitle}</h3><p className="lp-price-caption">{plan.caption}</p>
     <div className="lp-price-amount"><span>R$</span><strong>{plan.price}</strong></div>
     <p className="lp-price-period">Periodicidade a confirmar antes da contratação</p>
     <div className="lp-price-line"/>
     <ul>{plan.points.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
     <Link className={plan.featured?"lp-button":"lp-outline"} href={"/cadastro?plano="+plan.id}>{plan.id==="professores"?"Tenho interesse":"Escolher "+plan.name} <span aria-hidden="true">↗</span></Link>
    </article>)}
   </div>
   <div className="lp-pricing-trust"><span aria-hidden="true">ⓘ</span><p>Os preços indicados são os valores informados para esta apresentação. A forma de cobrança, a periodicidade e os benefícios exclusivos de cada plano ainda precisam ser definidos antes de iniciar as vendas. Esta página não cobra nem ativa assinaturas. Não há prazo promocional ou limite de vagas anunciado.</p></div>
  </div>
 </section>;
}
