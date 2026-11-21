import {NextRequest,NextResponse} from "next/server";
import {safeError,sameOrigin,supabaseRequest,writeTokens} from "../../../lib/eduverso-auth";
export const dynamic="force-dynamic";
type Login={access_token?:string;refresh_token?:string;expires_in?:number};
export async function POST(request:NextRequest){
 if(!sameOrigin(request))return NextResponse.json({error:"Origem não autorizada."},{status:403});
 try{
  const input=await request.json();
  const email=typeof input.email==="string"?input.email.trim().toLowerCase():"";
  const password=typeof input.password==="string"?input.password:"";
  if(email.length>254||!/^\S+@\S+\.\S+$/.test(email)||password.length<1||password.length>128)
   return NextResponse.json({error:"Informe e-mail e senha válidos."},{status:400});
  const result=await supabaseRequest<Login>("/auth/v1/token?grant_type=password",{method:"POST",body:{email,password}});
  if(!result.ok||!result.data.access_token||!result.data.refresh_token)return NextResponse.json({error:safeError(result.data,"E-mail ou senha incorretos.")},{status:401});
  const response=NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  writeTokens(response,{access_token:result.data.access_token,refresh_token:result.data.refresh_token,expires_in:result.data.expires_in||3600});
  return response;
 }catch{return NextResponse.json({error:"Não foi possível autenticar. Tente novamente."},{status:500});}
}
