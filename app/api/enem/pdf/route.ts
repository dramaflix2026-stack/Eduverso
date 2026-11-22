import {NextRequest,NextResponse} from "next/server";
import {getEnemCatalog,isOfficialEnemDocument} from "../../../lib/enem-archive";
export const runtime="nodejs";
export const dynamic="force-dynamic";

function jsonError(message:string,status:number){
 return NextResponse.json({error:message},{status,headers:{"Cache-Control":"no-store"}});
}
export async function GET(request:NextRequest){
 const p=request.nextUrl.searchParams;
 const year=Number(p.get("ano"));
 const bookId=p.get("livro")||"";
 const docId=p.get("documento")||"";
 if(!Number.isInteger(year)||year<1998||year>2026||bookId.length>160||docId.length>180)
  return jsonError("Parâmetros de documento inválidos.",400);
 // Compatibilidade com links existentes do ENEM 2025.
 const oldDay=Number(p.get("dia")),oldBook=Number(p.get("caderno"));
 const oldKind=p.get("tipo");
 try{
  const catalog=await getEnemCatalog(year);
  let document=catalog.books.find(b=>b.id===bookId)?.documents.find(d=>d.id===docId);
  if(!document&&year===2025&&((oldDay===1&&oldBook>=1&&oldBook<=4)||(oldDay===2&&oldBook>=5&&oldBook<=8))&&(oldKind==="prova"||oldKind==="gabarito")){
   const group=catalog.books.find(b=>b.day===oldDay&&b.number===oldBook&&b.application==="Aplicação regular");
   document=group?.documents.find(d=>d.kind===oldKind);
  }
  if(!document||!isOfficialEnemDocument(document.url))return jsonError("Documento oficial não encontrado para esta seleção.",404);
  let current=document.url,remote:Response|null=null;
  // Nunca permitir redirecionamentos para provedores não autorizados.
  for(let i=0;i<3;i++){
   const r=await fetch(current,{signal:AbortSignal.timeout(30000),redirect:"manual",cache:"no-store",
    headers:{"Accept":"application/pdf","User-Agent":"Eduverso/1.0 (educational reader)"}});
   if(r.status>=300&&r.status<400){
    const location=r.headers.get("location");
    if(!location)return jsonError("O documento oficial mudou de endereço.",502);
    current=new URL(location,current).href;
    if(!isOfficialEnemDocument(current))return jsonError("Redirecionamento externo bloqueado.",502);
    continue;
   }
   remote=r;break;
  }
  if(!remote?.ok||!remote.body)return jsonError("O arquivo oficial está temporariamente indisponível.",502);
  const type=remote.headers.get("content-type")||"";
  if(!type.includes("pdf")&&!type.includes("octet-stream"))
   return jsonError("O Inep não retornou um PDF válido.",502);
  const byteLength=Number(remote.headers.get("content-length")||"0");
  if(byteLength>70*1024*1024)return jsonError("O arquivo excede o limite de leitura online.",413);
  const filename="enem-"+year+"-"+(document.kind==="prova"?"prova":"gabarito")+"-"+(bookId||"caderno")+".pdf";
  return new Response(remote.body,{status:200,headers:{
   "Content-Type":"application/pdf","Content-Disposition":'inline; filename="'+filename+'"',
   "Cache-Control":"public, max-age=3600, s-maxage=21600","X-Content-Type-Options":"nosniff"
  }});
 }catch{
  return jsonError("Não foi possível carregar o documento do Inep. Tente novamente ou consulte a fonte oficial.",502);
 }
}
