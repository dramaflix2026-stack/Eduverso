import {NextRequest,NextResponse} from "next/server";
import {getEnemCatalog} from "../../../lib/enem-archive";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const year=Number(request.nextUrl.searchParams.get("ano"));
 if(!Number.isInteger(year)||year<1998||year>2026)
  return NextResponse.json({error:"Ano fora do acervo do ENEM."},{status:400});
 try{
  const data=await getEnemCatalog(year);
  return NextResponse.json(data,{headers:{"Cache-Control":"public, max-age=300, s-maxage=1800"}});
 }catch{
  return NextResponse.json({error:"Não foi possível consultar o acervo do Inep."},{status:502});
 }
}

/** Teste de integração temporário: POST de leitura sem alterações. */
export async function POST(request:NextRequest){
 const year=Number(request.nextUrl.searchParams.get("ano"));
 if(!Number.isInteger(year)||year<1998||year>2026)return NextResponse.json({error:"Ano inválido"},{status:400});
 const data=await getEnemCatalog(year);
 console.info("ENEM-CATALOG-TEST",JSON.stringify({year,groups:data.books.length,
  files:data.books.reduce((sum,b)=>sum+b.documents.length,0),sample:data.books.slice(0,2)}));
 return NextResponse.json(data,{status:data.books.length?200:503});
}
