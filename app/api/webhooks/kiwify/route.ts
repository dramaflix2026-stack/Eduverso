import {NextRequest,NextResponse} from "next/server";
import {timingSafeEqual} from "node:crypto";
export const runtime="nodejs";
export const dynamic="force-dynamic";
// Does nothing until a Kiwify product ID, a webhook token and a Supabase server key
// are explicitly configured on Railway. NEVER use a publishable key to grant access.
const deny=(message:string,status:number)=>NextResponse.json({error:message},{status,headers:{"Cache-Control":"no-store"}});
function equalsSecret(received:string,expected:string){
 const first=Buffer.from(received),second=Buffer.from(expected);
 return first.length===second.length&&first.length>0&&timingSafeEqual(first,second);
}
function safeText(value:unknown,max=200){
 return typeof value==="string"?value.trim().slice(0,max):"";
}
type WebhookPayload={
 order_id?:unknown;
 order_status?:unknown;
 webhook_event_type?:unknown;
 Product?:{product_id?:unknown};
 Customer?:{email?:unknown};
};
export async function POST(request:NextRequest){
 const configuredToken=process.env.EDUVERSO_KIWIFY_WEBHOOK_TOKEN||"";
 const productId=process.env.EDUVERSO_KIWIFY_PRODUCT_ID||"";
 const serverKey=process.env.SUPABASE_SERVICE_ROLE_KEY||"";
 const supabase=process.env.SUPABASE_URL||"";
 if(configuredToken.length<24||!productId||!serverKey||!supabase)
  return deny("Webhook não configurado.",503);
 const received=request.headers.get("x-eduverso-webhook-token")||request.nextUrl.searchParams.get("token")||"";
 if(!equalsSecret(received,configuredToken))return deny("Não autorizado.",401);
 const length=Number(request.headers.get("content-length")||0);
 if(length>1024*96)return deny("Payload excede limite.",413);
 let payload:WebhookPayload;
 try{payload=await request.json() as WebhookPayload;}catch{return deny("Formato inválido.",400);}
 const order=safeText(payload.order_id,150),email=safeText(payload.Customer?.email,320).toLowerCase();
 const currentProduct=safeText(payload.Product?.product_id,150);
 const evt=safeText(payload.webhook_event_type,80).toLowerCase();
 const originalStatus=safeText(payload.order_status,40).toLowerCase();
 if(currentProduct!==productId)return deny("Produto não pertence ao Eduverso.",403);
 if(!order||!email||!/^\S+@\S+\.\S+$/.test(email))return deny("Pedido sem identificadores válidos.",400);
 let status:"paid"|"refunded"|"chargeback"|"canceled"|null=null;
 if(originalStatus==="chargeback"||evt.includes("chargeback"))status="chargeback";
 else if(originalStatus==="refunded"||evt.includes("refund"))status="refunded";
 else if(originalStatus==="canceled"||evt==="order_canceled"||evt==="subscription_canceled")status="canceled";
 else if(originalStatus==="paid"&&["order_approved","subscription_renewed","order_paid"].includes(evt))status="paid";
 if(!status)return NextResponse.json({ok:true,ignored:true},{headers:{"Cache-Control":"no-store"}});
 const headers={"apikey":serverKey,"Authorization":"Bearer "+serverKey,"Content-Type":"application/json"};
 const base=new URL(supabase);
 if(base.protocol!=="https:"||!base.hostname.endsWith(".supabase.co"))return deny("Configuração de banco inválida.",503);
 // Never reactivate refunded/chargeback orders with stale paid-event retries.
 if(status==="paid"){
  const old=await fetch(base.origin+"/rest/v1/eduverso_purchases?select=payment_status&order_id=eq."+encodeURIComponent(order)+"&limit=1",{headers,cache:"no-store"});
  if(!old.ok)return deny("Falha ao consultar pagamento.",502);
  const rows=await old.json() as Array<{payment_status:string}>;
  if(["refunded","chargeback"].includes(rows[0]?.payment_status||""))
   return NextResponse.json({ok:true,ignored:true},{headers:{"Cache-Control":"no-store"}});
 }
 const saved=await fetch(base.origin+"/rest/v1/eduverso_purchases?on_conflict=order_id",{
  method:"POST",headers:{...headers,Prefer:"resolution=merge-duplicates,return=minimal"},
  body:JSON.stringify({order_id:order,product_id:productId,buyer_email:email,payment_status:status,webhook_event:evt,updated_at:new Date().toISOString()}),
  cache:"no-store"
 });
 if(!saved.ok)return deny("Não foi possível registrar pagamento.",502);
 return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
}
