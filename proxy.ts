import {NextRequest,NextResponse} from "next/server";
import {authenticate,ensureProfile,hasPaidAccess,writeTokens} from "./app/lib/eduverso-auth";
export async function proxy(request:NextRequest){
 // Commercial paywall is not enabled until the Kiwify webhook is configured.
 if(process.env.EDUVERSO_REQUIRE_PURCHASE!=="true")return NextResponse.next();
 try{
  const session=await authenticate(request);
  if(!session)return NextResponse.redirect(new URL("/entrar",request.url));
  await ensureProfile(session);
  const authorized=await hasPaidAccess(session);
  const response=authorized?NextResponse.next():NextResponse.redirect(new URL("/acesso-pendente",request.url));
  if(session.renewed)writeTokens(response,session.renewed);
  return response;
 }catch{return NextResponse.redirect(new URL("/entrar",request.url));}
}
export const config={matcher:["/plataforma/:path*","/api/medicina/:path*","/api/materiais/:path*"]};
