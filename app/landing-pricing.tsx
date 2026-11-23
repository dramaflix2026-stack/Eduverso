"use client";

type Plan = {
 id:"estudante"|"professores";
 name:string;
 price:string;
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
  subtitle:"Tudo para sua jornada de estudos",
  caption:"Para quem quer estudar, praticar e acompanhar sua evolução.",
  points:["Trilhas de Ensino Fundamental, Médio e preparação para provas","Aulas explicadas, exercícios e correções comentadas","Simulados, revisão e atlas anatômico disponíveis"],
  checkoutUrl:"https://pay.kiwify.com.br/pE7Jcf1",
  featured:true
 },
 {
  id:"professores",
  name:"Eduverso Professor",
  price:"79,90",
  subtitle:"Mais ferramentas para quem ensina",
  caption:"Para educadores que querem preparar aulas e materiais com mais agilidade.",
  points:["Acesso aos recursos de estudo existentes","Gerador de questões e avaliações em massa — em desenvolvimento","Gabaritos comentados e exportação em PDF — previstos"],
  checkoutUrl:"https://pay.kiwify.com.br/htmdQJL",
  planned:true
 }
];
export default function LandingPricing(){
 return <section className="lp-section lp-pricing-wrap" id="planos" aria-labelledby="lp-pricing-title">
  <div className="lp-container">
   <div className="lp-pricing-top">
    <div><span className="lp-eyebrow">ESCOLHA SEU EDUVERSO</span><h2 id="lp-pricing-title">Um só pagamento. <em>Seu jeito de evoluir.</em></h2><p>Dois caminhos: aprender com autonomia ou preparar conteúdos para ensinar. Escolha a opção que combina com você.</p></div>
    <div className="lp-pricing-intro-card"><span aria-hidden="true">✦</span><strong>A partir de R$ 49,90</strong><small>Pagamento único, sem mensalidade</small></div>
   </div>
   <div className="lp-pricing-grid">
    {plans.map(plan=><article key={plan.id} className={"lp-price-card"+(plan.featured?" lp-price-card-featured":"")+(plan.planned?" lp-price-card-planned":"")}>
     <div className="lp-price-head">
      <span className="lp-price-name">{plan.name}</span>
      {plan.featured&&<span className="lp-price-highlight">Para estudar</span>}
      {plan.planned&&<span className="lp-price-soon">Ferramentas em desenvolvimento</span>}
     </div>
     <h3>{plan.subtitle}</h3><p className="lp-price-caption">{plan.caption}</p>
     <div className="lp-price-amount"><span>R$</span><strong>{plan.price}</strong></div>
     <p className="lp-price-period">Pagamento único · sem mensalidade</p>
     <div className="lp-price-line"/>
     <ul>{plan.points.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
     {plan.planned&&<p className="lp-price-development">A geração em massa ainda está em desenvolvimento e não integra os recursos atualmente disponíveis. Confira as condições da oferta antes de comprar.</p>}
     <a className={plan.featured?"lp-button":"lp-outline"} href={plan.checkoutUrl} aria-label={"Comprar "+plan.name+" na Kiwify"}>{plan.planned?"Comprar Professor":"Comprar Estudante"} <span aria-hidden="true">↗</span></a>
    </article>)}
   </div>
   <div className="lp-pricing-trust"><span aria-hidden="true">ⓘ</span><p>Cada botão de compra leva diretamente ao checkout do respectivo produto na Kiwify. Para associar seu acesso no Eduverso, utilize no cadastro o mesmo e-mail informado na compra e confirme o e-mail. A geração de conteúdo em massa para professores ainda está em desenvolvimento; confira os recursos disponíveis e as condições no checkout.</p></div>
  </div>
 </section>;
}
