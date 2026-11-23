import {redirect} from "next/navigation";
import AtlasClinicoPremium from "../../atlas-clinico-premium";
import {premiumUserId} from "../../lib/premium-entitlements";
export const dynamic="force-dynamic";
export default async function AtlasPremiumPage(){
 const userId=await premiumUserId("atlas");
 if(!userId)redirect("/plataforma?disciplina="+encodeURIComponent("Atlas Clínico Premium"));
 return <AtlasClinicoPremium userId={userId}/>;
}
