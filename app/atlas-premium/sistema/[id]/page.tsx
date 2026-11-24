import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {atlasAreas} from "../../catalog";
import PremiumAtlasClient from "../../atlas-client";
export async function generateStaticParams(){return atlasAreas.map(item=>({id:item.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
 const {id}=await params;const area=atlasAreas.find(a=>a.id===id);
 return {title:(area?area.name:"Sistema anatômico")+" | Atlas Premium Eduverso"};
}
export default async function AtlasSystemPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 if(!atlasAreas.some(area=>area.id===id))notFound();
 return <PremiumAtlasClient mode="system" systemId={id}/>;
}
