export const runtime="nodejs";
export const dynamic="force-dynamic";
const endpoint="https://eduverso-intelligence-production.up.railway.app/api/funnel/events";
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const kinds=new Set(["landing_view","engaged","cta_click","checkout_redirect"]);
const fields=new Set(["event_id","session_id","at","kind","campaign_id","ad_id"]);
let minute=0,count=0;
const reply=(status:number)=>new Response(null,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request:Request){
 const origin=request.headers.get("origin"),host=request.headers.get("host");
 if(request.headers.get("sec-fetch-site")!=="same-origin"||!origin||!host)return reply(403);
 try{if(new URL(origin).host!==host||new URL(origin).protocol!=="https:")return reply(403)}catch{return reply(403)}
 if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type")||""))return reply(415);
 const key=process.env.EDUVERSO_INTELLIGENCE_FUNNEL_TOKEN;
 if(!key||!/^ef_[a-f0-9]{64}$/.test(key))return reply(503);
 if(Number(request.headers.get("content-length")||0)>2048)return reply(413);
 const reader=request.body?.getReader();if(!reader)return reply(400);
 const chunks:Uint8Array[]=[];let bytes=0;
 try{for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>2048){await reader.cancel();return reply(413)}chunks.push(value)}}catch{return reply(400)}
 let p:Record<string,unknown>;try{p=JSON.parse(Buffer.concat(chunks).toString("utf8"))}catch{return reply(400)}
 if(!p||typeof p!=="object"||Array.isArray(p)||Object.keys(p).some(k=>!fields.has(k)))return reply(400);
 if(typeof p.event_id!=="string"||!uuid.test(p.event_id)||typeof p.session_id!=="string"||!uuid.test(p.session_id)||typeof p.kind!=="string"||!kinds.has(p.kind)||typeof p.at!=="string"||!Number.isFinite(Date.parse(p.at))||Math.abs(Date.now()-Date.parse(p.at))>10*60*1000)return reply(400);
 for(const k of ["campaign_id","ad_id"])if(p[k]!=null&&(typeof p[k]!=="string"||!/^\d{1,25}$/.test(p[k] as string)))return reply(400);
 const t=Math.floor(Date.now()/60000);if(t!==minute){minute=t;count=0}if(++count>600)return reply(429);
 try{
  const result=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+key},body:JSON.stringify({event_id:p.event_id,session_id:p.session_id,kind:p.kind,at:new Date(p.at).toISOString(),campaign_id:p.campaign_id??null,ad_id:p.ad_id??null}),cache:"no-store",redirect:"error",signal:AbortSignal.timeout(4000)});
  return reply(result.ok?204:result.status===400?400:502);
 }catch{return reply(502)}
}
