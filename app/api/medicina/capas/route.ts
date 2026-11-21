import {NextResponse} from "next/server";
import {readdir} from "node:fs/promises";
import {join} from "node:path";
import {medicineDisciplines} from "../../../medicine-curriculum";
export const runtime="nodejs";
export const dynamic="force-dynamic";
/**
 * Covers are optional assets uploaded to public/images/medicina.
 * Return only filenames matching a registered discipline to avoid exposing
 * unrelated filesystem entries or making 18 requests to missing images.
 */
export async function GET(){
 const dir=join(process.cwd(),"public","images","medicina");
 const valid=new Set(medicineDisciplines.map(d=>d.slug));
 let files:string[]=[];
 try{files=await readdir(dir)}catch{}
 const covers:Record<string,string>={};
 for(const file of files){
  const match=/^([a-z0-9-]+)\.(webp|png|jpg|jpeg)$/i.exec(file);
  if(match&&valid.has(match[1])&&!covers[match[1]]){
   covers[match[1]]="/images/medicina/"+file;
  }
 }
 return NextResponse.json({covers},{headers:{"Cache-Control":"public, max-age=30, stale-while-revalidate=60"}});
}