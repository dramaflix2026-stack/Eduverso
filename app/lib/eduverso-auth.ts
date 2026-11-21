import "server-only";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

const ACCESS_COOKIE="eduverso_access";
const REFRESH_COOKIE="eduverso_refresh";
export type AuthUser={id:string;email?:string;email_confirmed_at?:string|null;user_metadata?:Record<string,unknown>};
type Tokens={access_token:string;refresh_token:string;expires_in:number;user?:AuthUser};
export type Session={user:AuthUser;accessToken:string;renewed?:Tokens};
type HttpResult<T>={ok:boolean;status:number;data:T};

export function supabaseConfig(){
 const url=process.env.SUPABASE_URL||process.env.EDUVERSO_SUPABASE_URL;
 const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.EDUVERSO_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw new Error("Supabase Eduverso not configured");
 const parsed=new URL(url);
 if(parsed.protocol!=="https:"||!parsed.hostname.endsWith(".supabase.co"))throw new Error("Invalid Supabase host");
 return {url:parsed.origin,key};
}
export async function supabaseRequest<T>(endpoint:string,options:{method?:string;body?:unknown;accessToken?:string;headers?:Record<string,string>}={}):Promise<HttpResult<T>>{
 const {url,key}=supabaseConfig();
 const response=await fetch(url+endpoint,{
  method:options.method||"GET",
  headers:{"apikey":key,...(options.body!==undefined?{"Content-Type":"application/json"}:{}),...(options.accessToken?{Authorization:"Bearer "+options.accessToken}:{}),...options.headers},
  body:options.body===undefined?undefined:JSON.stringify(options.body),
  cache:"no-store",
 });
 const body=await response.text();
 let data:unknown={};
 try{data=body?JSON.parse(body):{}}catch{data={message:"Resposta inválida do serviço de autenticação."};}
 return {ok:response.ok,status:response.status,data:data as T};
}
export function safeError(data:unknown,otherwise:string){
 if(!data||typeof data!=="object")return otherwise;
 const value=data as Record<string,unknown>;
 const code=typeof value.error_code==="string"?value.error_code:"";
 if(["invalid_credentials","email_not_confirmed"].includes(code))return code==="email_not_confirmed"?"Confirme seu e-mail antes de entrar.":"E-mail ou senha incorretos.";
 if(code==="user_already_exists"||code==="email_exists")return "Se já possui conta, entre com sua senha ou use a recuperação de acesso.";
 if(code==="over_email_send_rate_limit")return "Limite de envios atingido. Tente novamente mais tarde.";
 if(code==="signup_disabled")return "Cadastro temporariamente indisponível.";
 if(code==="weak_password")return "Escolha uma senha mais forte.";
 return otherwise;
}
function cookieOptions(maxAge:number){
 return {httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax" as const,path:"/",maxAge};
}
export function writeTokens(response:NextResponse,tokens:Tokens){
 response.cookies.set(ACCESS_COOKIE,tokens.access_token,cookieOptions(Math.max(60,Math.min(tokens.expires_in||3600,3600))));
 response.cookies.set(REFRESH_COOKIE,tokens.refresh_token,cookieOptions(60*60*24*30));
}
export function clearTokens(response:NextResponse){
 response.cookies.set(ACCESS_COOKIE,"",{...cookieOptions(0)});
 response.cookies.set(REFRESH_COOKIE,"",{...cookieOptions(0)});
}
export async function authenticate(request:NextRequest):Promise<Session|null>{
 let access=request.cookies.get(ACCESS_COOKIE)?.value;
 if(access){
  const candidate=await supabaseRequest<AuthUser>("/auth/v1/user",{accessToken:access});
  if(candidate.ok&&typeof candidate.data.id==="string")return {user:candidate.data,accessToken:access};
 }
 const refresh=request.cookies.get(REFRESH_COOKIE)?.value;
 if(!refresh)return null;
 const renewed=await supabaseRequest<Tokens>("/auth/v1/token?grant_type=refresh_token",{method:"POST",body:{refresh_token:refresh}});
 if(!renewed.ok||!renewed.data.access_token||!renewed.data.refresh_token)return null;
 access=renewed.data.access_token;
 const checked=await supabaseRequest<AuthUser>("/auth/v1/user",{accessToken:access});
 if(!checked.ok||typeof checked.data.id!=="string")return null;
 return {user:checked.data,accessToken:access,renewed:renewed.data};
}
export function authResponse(request:NextRequest,data:unknown,status=200,session?:Session|null){
 const response=NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store, max-age=0","Vary":"Cookie","X-Content-Type-Options":"nosniff"}});
 if(session?.renewed)writeTokens(response,session.renewed);
 return response;
}
export function sameOrigin(request:NextRequest){
 const origin=request.headers.get("origin");
 const fetchSite=request.headers.get("sec-fetch-site");
 return (!origin||origin===request.nextUrl.origin)&&(!fetchSite||fetchSite==="same-origin"||fetchSite==="none");
}
export async function ensureProfile(session:Session){
 const metadata=session.user.user_metadata||{};
 const name=(typeof metadata.full_name==="string"&&metadata.full_name.trim().slice(0,120))||
           (typeof metadata.name==="string"&&metadata.name.trim().slice(0,120))||
           "Estudante";
 // INSERT only: never overwrites an existing Eduverso profile or ownership.
 await supabaseRequest("/rest/v1/eduverso_profiles?on_conflict=user_id",{
  method:"POST",accessToken:session.accessToken,
  headers:{"Prefer":"resolution=ignore-duplicates,return=minimal"},
  body:{user_id:session.user.id,full_name:name}
 });
 const profile=await supabaseRequest<Array<{full_name:string}>>(
  "/rest/v1/eduverso_profiles?select=full_name&user_id=eq."+encodeURIComponent(session.user.id)+"&limit=1",
  {accessToken:session.accessToken}
 );
 return profile.ok&&Array.isArray(profile.data)&&profile.data[0]?.full_name?profile.data[0].full_name:name;
}
export async function hasPaidAccess(session:Session){
 const access=await supabaseRequest<Array<{status:string}>>(
  "/rest/v1/eduverso_entitlements?select=status&user_id=eq."+encodeURIComponent(session.user.id)+"&limit=1",
  {accessToken:session.accessToken}
 );
 return access.ok&&Array.isArray(access.data)&&access.data[0]?.status==="active";
}
