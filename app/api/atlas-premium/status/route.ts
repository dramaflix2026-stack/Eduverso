import {NextRequest,NextResponse} from "next/server";
import {authenticate} from "../../../lib/eduverso-auth";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"private, no-store, max-age=0","Vary":"Cookie"};
export async function GET(request:NextRequest){
 try{
  const session=await authenticate(request);
  if(!session)return NextResponse.json({authenticated:false,hasAccess:false,status:"guest"},{headers});
  // Server-side entitlement gate, isolated from Estudante/Professor plans.
  const base=process.env.SUPABASE_URL||"";
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY||"";
  if(!key||!base)return NextResponse.json({authenticated:true,hasAccess:false,status:"unavailable"},{headers,status:503});
  const url=new URL(base);
  if(url.protocol!=="https:"||!url.hostname.endsWith(".supabase.co"))throw new Error("Invalid DB");
  const endpoint=url.origin+"/rest/v1/eduverso_addon_entitlements?select=status&user_id=eq."+
    encodeURIComponent(session.user.id)+"&addon=eq.atlas-premium&limit=1";
  const response=await fetch(endpoint,{headers:{apikey:key,Authorization:"Bearer "+key},cache:"no-store"});
  if(!response.ok)throw new Error("Entitlement unavailable");
  const rows=await response.json() as Array<{status:string}>;
  const hasAccess=rows[0]?.status==="active";
  return NextResponse.json({authenticated:true,hasAccess,status:hasAccess?"active":"locked"},{headers});
 }catch{return NextResponse.json({authenticated:false,hasAccess:false,status:"unavailable"},{headers,status:503});}
}
