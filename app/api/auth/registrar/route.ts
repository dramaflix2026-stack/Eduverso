import {NextRequest,NextResponse} from "next/server";
import {safeError,sameOrigin,supabaseRequest,writeTokens} from "../../../lib/eduverso-auth";
export const dynamic="force-dynamic";
type Signup={user?:{id:string};access_token?:string;refresh_token?:string;expires_in?:number};
export async function POST(request:NextRequest){
 if(!sameOrigin(request))return NextResponse.json({error:"Origem não autorizada."},{status:403});
 try{
  const input=await request.json();
  const name=typeof input.name==="string"?input.name.trim().replace(/\s+/g," "):"";
  const email=typeof input.email==="string"?input.email.trim().toLowerCase():"";
  const password=typeof input.password==="string"?input.password:"";
  const confirm=typeof input.confirm==="string"?input.confirm:"";
  if(name.length<2||name.length>120||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||password.length<8||password.length>128||password!==confirm)
   return NextResponse.json({error:"Confira nome, e-mail e senhas (mínimo de 8 caracteres, duas senhas iguais)."},{status:400});
  const redirect=new URL("/entrar?confirmado=1",request.nextUrl.origin).toString();
  const result=await supabaseRequest<Signup&{error_code?:string}>("/auth/v1/signup?redirect_to="+encodeURIComponent(redirect),{
   method:"POST",body:{email,password,data:{full_name:name,app:"eduverso"}}
  });
  if(!result.ok)return NextResponse.json({error:safeError(result.data,"Não foi possível concluir o cadastro. Tente novamente.")},{status:result.status===429?429:400});
  const authenticated=!!(result.data.access_token&&result.data.refresh_token);
  const response=NextResponse.json({ok:true,authenticated,message:authenticated?"Conta criada e sessão iniciada.":"Se o endereço estiver apto a cadastro, você receberá um e-mail para confirmar sua conta."},{headers:{"Cache-Control":"no-store"}});
  if(authenticated)writeTokens(response,{access_token:result.data.access_token!,refresh_token:result.data.refresh_token!,expires_in:result.data.expires_in||3600});
  return response;
 }catch{return NextResponse.json({error:"Não foi possível processar o cadastro."},{status:500});}
}
