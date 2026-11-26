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
   <style>{`.edu-plan-desktop{display:none}@media(min-width:768px){.edu-lp .lp-pricing-redesign .lp-pricing-grid{max-width:1060px;gap:24px}.edu-plan-mobile{display:none}.edu-plan-desktop{display:flex;flex-direction:column;height:100%;box-sizing:border-box;padding:32px;border:1px solid #67458c;border-radius:24px;background:radial-gradient(ellipse at top right,#59258a55,transparent 65%),#171022;color:#fff}.edu-plan-tag{font-size:13px;color:#c69aff;font-weight:700}.edu-plan-desktop h3{font-size:30px;margin:16px 0 8px}.edu-plan-desktop p{color:#cbbfd9;font-size:15px;line-height:1.5;min-height:48px;margin:0}.edu-plan-price{font-size:56px;font-weight:800;color:#bf7bff;line-height:1.1;margin-top:24px}.edu-plan-price small{font-size:24px;color:#fff}.edu-plan-period{font-size:13px;color:#cbbfd9;margin-top:6px}.edu-plan-desktop ul{list-style:none;padding:0;margin:24px 0;display:grid;gap:12px}.edu-plan-desktop li{display:flex;gap:10px;font-size:15px;line-height:1.4}.edu-plan-desktop li span{color:#c395ff}.edu-plan-desktop a{margin-top:auto;display:flex;align-items:center;justify-content:center;gap:10px;text-align:center;min-height:52px;padding:10px 16px;background:linear-gradient(100deg,#a34ce8,#8614ca);border-radius:12px;color:white;font-size:15px;font-weight:700;text-decoration:none}}@media(max-width:767px){.lp-pricing-redesign .lp-container{width:100%;max-width:none;padding:0}.lp-pricing-redesign .lp-pricing-grid{display:block;gap:0;margin:0}.lp-pricing-redesign .lp-pricing-grid article{margin:0}.lp-pricing-redesign .lp-pricing-top,.lp-pricing-redesign .lp-pricing-trust{padding-inline:16px}}`}</style><div className="lp-pricing-grid">
    {plans.map(plan=><article key={plan.id} style={{minWidth:0,background:"transparent",border:0,padding:0,boxShadow:"none"}}>
     <div className="edu-plan-mobile" style={{position:"relative",width:"100%"}}>
      <img src={plan.featured?"/images/file_000000005800820e8e9387ef2408d90a.webp":"/images/file_000000004b64820eafc9c10a5c7eb495.webp"} alt={plan.name+" — R$ "+plan.price+", pagamento único, sem mensalidades. Compra pela Kiwify, 7 dias de garantia."} style={{display:"block",width:"100%",height:"auto"}} loading="lazy"/>
      <a href={plan.checkoutUrl} onClick={(event)=>trackEduversoCheckout(event,{productId:plan.productId,productName:plan.name,value:plan.amount,checkoutUrl:plan.checkoutUrl})} aria-label={"Comprar "+plan.name+" na Kiwify"} style={{position:"absolute",left:"10.3%",width:"79.4%",top:plan.featured?"82.7%":"81.3%",height:plan.featured?"6%":"6.9%",borderRadius:40,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"clamp(13px,4vw,23px)",textDecoration:"none",background:"linear-gradient(100deg,#a34ce8,#8614ca)"}}>Quero o Eduverso {plan.featured?"Estudante":"Professor"} →</a>
     {plan.planned&&<span style={{position:"absolute",left:"8%",width:"84%",top:"89%",fontSize:"clamp(10px,2.8vw,15px)",textAlign:"center",color:"#e5d5fa"}}>Pagamento único · Sem mensalidades</span>}
     </div>
     <div className="edu-plan-desktop"><span className="edu-plan-tag">{plan.featured?"01 — Estudante":"02 — Professor"}</span><h3>{plan.name}</h3><p>{plan.caption}</p><div className="edu-plan-price"><small>R$</small> {plan.price}</div><span className="edu-plan-period">Pagamento único · Sem mensalidades</span><ul>{plan.points.map(point=><li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul><a href={plan.checkoutUrl} onClick={(event)=>trackEduversoCheckout(event,{productId:plan.productId,productName:plan.name,value:plan.amount,checkoutUrl:plan.checkoutUrl})}>Quero o {plan.name} <span aria-hidden="true">→</span></a></div>
    </article>)}
   </div>
   
  </div>
 </section>;
}
