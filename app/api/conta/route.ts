import {NextRequest} from "next/server";
import {authenticate,authResponse,ensureProfile,hasPaidAccess} from "../../lib/eduverso-auth";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 try{
  const session=await authenticate(request);
  if(!session)return authResponse(request,{user:null,authenticated:false,access:"guest"});
  const name=await ensureProfile(session);
  const paid=await hasPaidAccess(session);
  return authResponse(request,{
   user:{name,email:session.user.email||""},
   authenticated:true,access:paid?"active":"pending",
  },200,session);
 }catch{
  return authResponse(request,{user:null,authenticated:false,error:"Serviço de autenticação indisponível."},503);
 }
}
