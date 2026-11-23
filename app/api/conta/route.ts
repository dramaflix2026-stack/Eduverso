import {NextRequest} from "next/server";
import {authenticate,authResponse,ensureProfile,getPaidPlan} from "../../lib/eduverso-auth";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 try{
  const session=await authenticate(request);
  if(!session)return authResponse(request,{user:null,authenticated:false,access:"guest"});
  const name=await ensureProfile(session);
  const plan=await getPaidPlan(session);
  return authResponse(request,{
   user:{id:session.user.id,name,email:session.user.email||""},
   authenticated:true,access:plan?"active":"pending",plan,
  },200,session);
 }catch{
  return authResponse(request,{user:null,authenticated:false,error:"Serviço de autenticação indisponível."},503);
 }
}
