import "server-only";
import {cookies} from "next/headers";
import {supabaseRequest,type AuthUser} from "./eduverso-auth";

export type PremiumProduct="atlas"|"redacao";
type Entitlement={status:string;expires_at:string|null};

/** Fail closed: a premium area is never unlocked from client state, URL params or editable user metadata. */
export async function premiumUserId(product:PremiumProduct):Promise<string|null>{
 try{
  const accessToken=(await cookies()).get("eduverso_access")?.value;
  if(!accessToken)return null;
  const identity=await supabaseRequest<AuthUser>("/auth/v1/user",{accessToken});
  const userId=identity.ok&&typeof identity.data.id==="string"&&/^[0-9a-f-]{36}$/i.test(identity.data.id)?identity.data.id:null;
  if(!userId)return null;
  const endpoint="/rest/v1/eduverso_premium_entitlements?select=status,expires_at"+
   "&user_id=eq."+encodeURIComponent(userId)+"&product=eq."+product+"&limit=1";
  const lookup=await supabaseRequest<Entitlement[]>(endpoint,{accessToken});
  const row=lookup.ok&&Array.isArray(lookup.data)?lookup.data[0]:null;
  if(!row||row.status!=="active")return null;
  if(row.expires_at&&(!Number.isFinite(Date.parse(row.expires_at))||Date.parse(row.expires_at)<=Date.now()))return null;
  return userId;
 }catch{return null;}
}
