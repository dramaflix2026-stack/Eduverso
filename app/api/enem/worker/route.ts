import {readFile} from "node:fs/promises";
import {join} from "node:path";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
 try{
  const data=await readFile(join(process.cwd(),"node_modules","pdfjs-dist","legacy","build","pdf.worker.min.mjs"));
  return new Response(data,{headers:{"Content-Type":"text/javascript; charset=utf-8","Cache-Control":"public, max-age=86400, s-maxage=2592000"}});
 }catch{
  return new Response("PDF worker indisponível",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}});
 }
}
