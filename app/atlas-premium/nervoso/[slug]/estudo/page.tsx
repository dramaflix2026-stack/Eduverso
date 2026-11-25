import type {Metadata} from "next";
import {notFound} from "next/navigation";
import NervosoStudy from "../../../nervoso-study-client";
import {nervosoLabs} from "../../../nervoso-data";
export function generateStaticParams(){return Object.keys(nervosoLabs).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;return {title:(nervosoLabs[slug]?.title??"Sistema Nervoso")+" | Atlas Premium Eduverso"};}
export default async function StudyPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!Object.prototype.hasOwnProperty.call(nervosoLabs,slug))notFound();return <NervosoStudy slug={slug}/>;}
