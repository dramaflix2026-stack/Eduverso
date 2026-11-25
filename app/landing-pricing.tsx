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
   <style>{`@media(max-width:767px){.lp-pricing-redesign .lp-container{width:100%;max-width:none;padding:0}.lp-pricing-redesign .lp-pricing-grid{display:block;gap:0;margin:0}.lp-pricing-redesign .lp-pricing-grid article{margin:0}.lp-pricing-redesign .lp-pricing-top,.lp-pricing-redesign .lp-pricing-trust{padding-inline:16px}}`}</style><div className="lp-pricing-grid">
    {plans.map(plan=><article key={plan.id} style={{minWidth:0,background:"transparent",border:0,padding:0,boxShadow:"none"}}>
     <div style={{position:"relative",width:"100%"}}>
      <img src={plan.featured?"/images/file_00000000ca08820eb3ac1c098eed269d.webp":"/images/file_000000008d14820e979c6b2522510441.webp"} alt={plan.name+" — R$ "+plan.price+", pagamento único, sem mensalidades. Compra pela Kiwify, 7 dias de garantia."} style={{display:"block",width:"100%",height:"auto"}} loading="lazy"/>
      <a href={plan.checkoutUrl} onClick={(event)=>trackEduversoCheckout(event,{productId:plan.productId,productName:plan.name,value:plan.amount,checkoutUrl:plan.checkoutUrl})} aria-label={"Comprar "+plan.name+" na Kiwify"} style={{position:"absolute",left:"8%",width:"84%",top:plan.featured?"86.7%":"81.4%",height:"6.4%",borderRadius:40}}/>
     </div>
     {plan.planned&&<p style={{margin:"10px 0 0",fontSize:14,lineHeight:1.5,color:"#c8b9df",textAlign:"center"}}>Em desenvolvimento: avaliações e questões em massa, gabaritos comentados e exportação em PDF para professores. Esses recursos ainda não integram o acesso disponível.</p>}
    </article>)}
   </div>
   <div className="lp-pricing-trust"><span aria-hidden="true">ⓘ</span><p>Use no cadastro o mesmo e-mail da compra e confirme-o para vincular seu acesso. Complementos premium são vendidos separadamente. Consulte as condições no checkout.</p></div>
  </div>
 </section>;
}
