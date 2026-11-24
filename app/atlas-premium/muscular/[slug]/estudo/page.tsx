import type {Metadata} from "next";
import {notFound} from "next/navigation";
import MuscularStudy from "../../../muscular-study-client";
import {muscularLabs} from "../../../muscular-data";
export function generateStaticParams(){return Object.keys(muscularLabs).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;return {title:(muscularLabs[slug]?.title??"Sistema Muscular")+" | Atlas Premium Eduverso"};}
export default async function StudyPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!Object.prototype.hasOwnProperty.call(muscularLabs,slug))notFound();return <MuscularStudy slug={slug}/>;}
