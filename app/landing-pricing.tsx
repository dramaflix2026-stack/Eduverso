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
   <style>{`.edu-lp .lp-pricing-redesign .lp-pricing-grid{max-width:1060px;gap:24px}.edu-plan-desktop{display:flex;flex-direction:column;height:100%;box-sizing:border-box;padding:32px;border:1px solid #67458c;border-radius:24px;background:radial-gradient(ellipse at top right,#59258a55,transparent 65%),#171022;color:#fff}.edu-plan-tag{font-size:13px;color:#c69aff;font-weight:700}.edu-plan-desktop h3{font-size:30px;margin:16px 0 8px}.edu-plan-desktop p{color:#cbbfd9;font-size:15px;line-height:1.5;min-height:48px;margin:0}.edu-plan-price{font-size:56px;font-weight:800;color:#bf7bff;line-height:1.1;margin-top:24px}.edu-plan-price small{font-size:24px;color:#fff}.edu-plan-period{font-size:13px;color:#cbbfd9;margin-top:6px}.edu-plan-desktop ul{list-style:none;padding:0;margin:24px 0;display:grid;gap:12px}.edu-plan-desktop li{display:flex;gap:10px;font-size:15px;line-height:1.4}.edu-plan-desktop li span{color:#c395ff}.edu-plan-desktop a{margin-top:auto;display:flex;align-items:center;justify-content:center;gap:10px;text-align:center;min-height:52px;padding:10px 16px;background:linear-gradient(100deg,#a34ce8,#8614ca);border-radius:12px;color:white;font-size:15px;font-weight:700;text-decoration:none}@media(max-width:767px){.lp-pricing-redesign .lp-container{width:100%;max-width:none;padding:0}.lp-pricing-redesign .lp-pricing-grid{display:block;gap:0;margin:0}.lp-pricing-redesign .lp-pricing-grid article{margin:0}.lp-pricing-redesign .lp-pricing-top,.lp-pricing-redesign .lp-pricing-trust{padding-inline:16px}.edu-lp .lp-pricing-redesign .lp-pricing-grid{display:grid;grid-template-columns:1fr;gap:14px!important;padding:0 16px;box-sizing:border-box}.edu-lp .lp-pricing-redesign .lp-pricing-grid article,.edu-lp .lp-pricing-redesign .lp-pricing-grid article+article{width:100%!important;margin:0!important}.edu-plan-desktop{padding:23px 20px;border-radius:19px;height:auto}.edu-plan-desktop h3{font-size:25px;margin:12px 0 7px}.edu-plan-desktop p{min-height:0;font-size:14px}.edu-plan-price{font-size:48px;margin-top:18px}.edu-plan-price small{font-size:21px}.edu-plan-desktop ul{gap:10px;margin:19px 0}.edu-plan-desktop li{font-size:13px}.edu-lp .lp-pricing-redesign .lp-pricing-grid .edu-plan-desktop a{font-size:13px!important;min-height:48px;box-sizing:border-box;width:100%}.edu-plan-period{font-size:12px}}`}</style><div className="lp-pricing-grid">
    {plans.map(plan=><article key={plan.id} style={{minWidth:0,background:"transparent",border:0,padding:0,boxShadow:"none"}}>
     <div className="edu-plan-desktop"><span className="edu-plan-tag">{plan.featured?"01 — Estudante":"02 — Professor"}</span><h3>{plan.name}</h3><p>{plan.caption}</p><div className="edu-plan-price"><small>R$</small> {plan.price}</div><span className="edu-plan-period">Pagamento único · Sem mensalidades</span><ul>{plan.points.map(point=><li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul><a href={plan.checkoutUrl} onClick={(event)=>trackEduversoCheckout(event,{productId:plan.productId,productName:plan.name,value:plan.amount,checkoutUrl:plan.checkoutUrl})}>Quero o {plan.name} <span aria-hidden="true">→</span></a></div>
    </article>)}
   </div>
   
  </div>
 </section>;
}
