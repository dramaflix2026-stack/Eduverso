import Link from "next/link";

/**
 * Espaço independente reservado para um atlas clínico ORIGINAL.
 * NÃO importar nem reutilizar módulos, imagens, hotspots ou conteúdo do atlas básico.
 * A implementação pedagógica e visual começa somente após aprovação de um novo briefing.
 */
export default function AtlasClinicoPremium({userId}:{userId:string}){
 void userId;
 return <main style={{maxWidth:960,margin:"0 auto",padding:"clamp(24px,5vw,52px)",color:"#f3ebff",minHeight:"100vh"}}>
  <Link href={"/plataforma?disciplina="+encodeURIComponent("Atlas Clínico Premium")}
   style={{color:"#d1b9ff",fontSize:13,textDecoration:"none"}}>← Voltar ao Eduverso</Link>
  <section style={{marginTop:30,padding:"clamp(24px,5vw,45px)",border:"1px solid #7653a0",borderRadius:24,background:"linear-gradient(140deg,#241535,#131024)"}}>
   <p style={{color:"#cba5ff",fontWeight:800,fontSize:12,letterSpacing:1.5}}>EDUVERSO · ÁREA RESERVADA</p>
   <h1 style={{fontSize:"clamp(30px,5vw,48px)",lineHeight:1.1,margin:"14px 0"}}>Atlas Clínico Premium<span style={{color:"#ad84ff"}}>.</span></h1>
   <p style={{color:"#d2c6e0",fontSize:15,lineHeight:1.8,maxWidth:660}}>
    Este módulo será desenvolvido do zero, com identidade própria, imagens anatômicas originais e interações
    criadas exclusivamente para a experiência premium. Nenhuma imagem, componente ou questão do atlas atual
    foi reaproveitada aqui.
   </p>
   <p style={{padding:"14px 18px",borderRadius:12,border:"1px solid #795e9a",background:"#2e2341",fontSize:13,color:"#e7d5fa"}}>
    Estrutura preparada. Conteúdo e atividades ainda não disponíveis.
   </p>
  </section>
 </main>;
}
