import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Laboratório de Redação ENEM | Eduverso",description:"Conheça o próximo complemento premium do Eduverso para praticar redações do ENEM."};
export default function RedacaoPremium(){
 return <main style={{minHeight:"100vh",background:"radial-gradient(circle at 85% 5%,#4d277d66,transparent 35%),#0b0c1b",color:"#f5f0ff",fontFamily:"Arial,Helvetica,sans-serif",padding:"24px 18px 70px"}}>
  <div style={{maxWidth:850,margin:"0 auto"}}>
   <Link href="/plataforma" style={{display:"inline-block",color:"#c6aaff",textDecoration:"none",padding:"15px 0"}}>← Voltar ao Eduverso</Link>
   <section style={{border:"1px solid #a775ec55",borderRadius:26,padding:"clamp(24px,6vw,60px)",marginTop:35,background:"linear-gradient(135deg,#251b41,#111221)"}}>
    <span style={{color:"#c8aaff",fontSize:12,letterSpacing:2,fontWeight:800}}>COMPLEMENTO PREMIUM · EM DESENVOLVIMENTO</span>
    <h1 style={{fontSize:"clamp(32px,6vw,58px)",lineHeight:1.1,margin:"18px 0 20px"}}>Laboratório de <span style={{color:"#b28cff"}}>Redação ENEM</span></h1>
    <p style={{fontSize:17,color:"#c6bfda",lineHeight:1.7}}>Um espaço separado para praticar, revisar e desenvolver suas redações. O recurso ainda está em construção e não está disponível para compra.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:13,marginTop:30}}>
     {["Treino pelas 5 competências","Correção explicada","Plano de reescrita","Repertório e estrutura"].map(x=><div key={x} style={{border:"1px solid #ffffff22",borderRadius:14,padding:19,background:"#ffffff0a",color:"#e7dfff"}}>✦ {x}<div style={{color:"#aa9fbc",fontSize:12,marginTop:11}}>Planejado para as próximas entregas</div></div>)}
    </div>
    <p style={{color:"#b9aace",fontSize:13,marginTop:32}}>Valor planejado: R$ 19,90 · Pagamento único. O checkout será habilitado somente após a implementação e validação.</p>
   </section>
  </div>
 </main>;
}
