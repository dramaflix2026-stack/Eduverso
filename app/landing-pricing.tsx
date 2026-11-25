"use client";
import { trackEduversoCheckout } from "./meta-pixel";

type Plan = {
 id:"estudante"|"professores";
 name:string;
 price:string;
 amount:number;
 productId:string;
 subtitle:string;
 caption:string;
 points:string[];
 checkoutUrl:string;
 featured?:boolean;
 planned?:boolean;
};
const plans:Plan[]=[
 {
  id:"estudante",
  name:"Eduverso Estudante",
  price:"49,90",
  amount:49.90,
  productId:"2ff451d0-e6c6-11f1-8587-35b29347523e",
  subtitle:"Seu universo de estudos",
  caption:"Aprenda no seu ritmo, pratique e acompanhe sua evolução.",
  points:["Ensino Fundamental e Médio","Preparação para ENEM, vestibulares e concursos","Trilhas de Medicina e formações profissionais","Aulas explicadas e questões comentadas","Revisões, exercícios e simulados"],
  checkoutUrl:"https://pay.kiwify.com.br/pE7Jcf1",
  featured:true
 },
 {
  id:"professores",
  name:"Eduverso Professor",
  price:"79,90",
  amount:79.90,
  productId:"4be5a3d0-e6c6-11f1-9972-d949ca894c7b",
  subtitle:"Mais possibilidades para ensinar",
  caption:"Para educadores que desejam organizar estudos e preparar materiais com mais agilidade.",
  points:["Acesso aos recursos de estudo existentes","Trilhas e conteúdos para apoio pedagógico","Aulas, exercícios e questões comentadas"],
  checkoutUrl:"https://pay.kiwify.com.br/htmdQJL",
  planned:true
 }
];
export default function LandingPricing(){
 return <section className="lp-section lp-pricing-wrap lp-pricing-redesign" id="planos" aria-labelledby="lp-pricing-title">
  <div className="lp-container">
   <div className="lp-pricing-top">
    <div><span className="lp-eyebrow">ESCOLHA SEU EDUVERSO</span><h2 id="lp-pricing-title">Invista no seu futuro. <em>Pague uma única vez.</em></h2><p>Escolha o acesso ideal para a sua jornada. Sem mensalidades.</p></div>
   </div>
   <div className="lp-pricing-grid">
    {plans.map(plan=><article key={plan.id} className={"lp-price-card"+(plan.featured?" lp-price-card-featured":"")+(plan.planned?" lp-price-card-planned":"")}>
     <div className="lp-price-head">
      <span className="lp-price-emblem" aria-hidden="true">{plan.featured?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5-10-5zM6 11v6c4 3 8 3 12 0v-6M22 9v7"/></svg>:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M12 16v5m-5 0h10M8 8h8m-8 4h5"/></svg>}</span>
      <span className="lp-price-name">{plan.name}</span>
      <span className="lp-price-audience">{plan.featured?"PARA ESTUDANTES":"PARA PROFESSORES"}</span>
     </div>
     <h3>{plan.subtitle}</h3><p className="lp-price-caption">{plan.caption}</p>
     <div className="lp-price-ticket"><span className="lp-price-ticket-label">PAGAMENTO ÚNICO</span><div className="lp-price-amount"><span>R$</span><strong>{plan.price}</strong></div><p className="lp-price-period">Sem mensalidade</p></div>
     <p className="lp-price-includes">O que você encontra no plano</p>
     <ul>{plan.points.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
     {plan.planned&&<div className="lp-price-future"><strong>Em desenvolvimento</strong><p>Geração de questões e avaliações em massa, gabaritos comentados e exportação em PDF para professores. Esses recursos ainda não integram o acesso disponível.</p></div>}
     <a className="lp-button lp-price-buy" href={plan.checkoutUrl} onClick={(event)=>trackEduversoCheckout(event,{productId:plan.productId,productName:plan.name,value:plan.amount,checkoutUrl:plan.checkoutUrl})} aria-label={"Comprar "+plan.name+" na Kiwify"}>{plan.planned?"Quero o Eduverso Professor":"Quero o Eduverso Estudante"} <span aria-hidden="true">↗</span></a>
     <span className="lp-price-safe">✓ Compra pela Kiwify · 7 dias de garantia</span>
    </article>)}
   </div>
   <div className="lp-pricing-trust"><span aria-hidden="true">ⓘ</span><p>Use no cadastro o mesmo e-mail da compra e confirme-o para vincular seu acesso. Complementos premium são vendidos separadamente. Consulte as condições no checkout.</p></div>
  </div>
 </section>;
}
