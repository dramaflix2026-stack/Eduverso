import {redirect} from "next/navigation";
import RedacaoLab from "../../redacao-lab";
import {premiumUserId} from "../../lib/premium-entitlements";
export const dynamic="force-dynamic";
export default async function RedacaoPremiumPage(){
 const userId=await premiumUserId("redacao");
 if(!userId)redirect("/plataforma?disciplina="+encodeURIComponent("Laboratório de Redação ENEM"));
 return <RedacaoLab userId={userId}/>;
}
