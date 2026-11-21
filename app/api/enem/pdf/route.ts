import {NextRequest,NextResponse} from "next/server";
export const runtime="nodejs";
export const dynamic="force-dynamic";

/** Explicit upstream host and limited ENEM 2025 regular-application cadernos only. */
export async function GET(request:NextRequest){
 const p=request.nextUrl.searchParams;
 if(p.get("ano")!=="2025")return NextResponse.json({error:"Edição ainda não disponível no leitor interno."},{status:404});
 const day=Number(p.get("dia"));
 const book=Number(p.get("caderno"));
 const kind=p.get("tipo");
 const valid=(day===1&&book>=1&&book<=4)||(day===2&&book>=5&&book<=8);
 if(!valid||!Number.isInteger(book)||(kind!=="prova"&&kind!=="gabarito")){
  return NextResponse.json({error:"Documento não encontrado."},{status:400});
 }
 const file=`2025_${kind==="prova"?"PV":"GB"}_impresso_D${day}_CD${book}.pdf`;
 const upstreamUrl=`https://download.inep.gov.br/enem/provas_e_gabaritos/${file}`;
 try{
  const remote=await fetch(upstreamUrl,{
   signal:AbortSignal.timeout(25000),
   cache:"no-store",
   headers:{"Accept":"application/pdf","User-Agent":"Eduverso/1.0 (educational PDF reader)"}
  });
  if(!remote.ok||!remote.body){
   return NextResponse.json({error:"O Inep não disponibilizou o arquivo no momento. Use o link oficial."},{status:502});
  }
  const type=remote.headers.get("content-type")||"";
  if(!type.includes("pdf")&&!type.includes("octet-stream")){
   return NextResponse.json({error:"A origem não retornou um PDF. Consulte o acervo oficial."},{status:502});
  }
  return new Response(remote.body,{
   status:200,
   headers:{
    "Content-Type":"application/pdf",
    "Content-Disposition":`inline; filename="${file}"`,
    "Cache-Control":"public, max-age=3600, s-maxage=86400",
    "X-Content-Type-Options":"nosniff"
   }
  });
 }catch{
  return NextResponse.json({error:"Não foi possível acessar o arquivo oficial. Tente novamente ou abra no Inep."},{status:502});
 }
}
