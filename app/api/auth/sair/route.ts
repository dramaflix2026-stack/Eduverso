import {NextRequest,NextResponse} from "next/server";
import {authenticate,clearTokens,sameOrigin,supabaseRequest} from "../../../lib/eduverso-auth";
export const dynamic="force-dynamic";
export async function POST(request:NextRequest){
 if(!sameOrigin(request))return NextResponse.json({error:"Origem não autorizada."},{status:403});
 try{
  const session=await authenticate(request);
  if(session)await supabaseRequest("/auth/v1/logout",{method:"POST",accessToken:session.accessToken}).catch(()=>null);
 }catch{/* On any upstream failure always remove local session cookies. */}
 const response=NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
 clearTokens(response);
 return response;
}
