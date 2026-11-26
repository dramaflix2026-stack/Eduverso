
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {tools,site} from "../../seo/catalog";
import {Portal,Breadcrumb,CTA,structuredData,breadcrumbData} from "../../seo/portal";
import ToolClient from "../../seo/tools-client";
import s from "../../seo/portal.module.css";
import {Illustration} from "../../seo/visuals";
import {guidesForTool,relatedTools} from "../../seo/related";
import {editorial} from "../../seo/editorial";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return tools.map(t=>({slug:t.slug}))}
export const dynamicParams=false;
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params,t=tools.find(x=>x.slug===slug);if(!t)return {};return {title:t.name+" | Eduverso",description:t.description,alternates:{canonical:site+"/ferramentas/"+t.slug},openGraph:{title:t.name,description:t.description,url:site+"/ferramentas/"+t.slug,locale:"pt_BR",siteName:"Eduverso",type:"website"},twitter:{card:"summary",title:t.name,description:t.description}}}
export default async function Page({params}:Props){const {slug}=await params,t=tools.find(x=>x.slug===slug);if(!t)notFound();const guides=guidesForTool(t);return <Portal>{structuredData(breadcrumbData("Ferramentas","/ferramentas",t.name,"/ferramentas/"+t.slug))}{structuredData({"@context":"https://schema.org","@type":"WebApplication",name:t.name,description:t.description,url:site+"/ferramentas/"+t.slug,applicationCategory:"EducationalApplication",operatingSystem:"Any",browserRequirements:"JavaScript",inLanguage:"pt-BR",isAccessibleForFree:true,offers:{"@type":"Offer",price:0,priceCurrency:"BRL"},publisher:{"@type":"Organization",name:"Eduverso",url:site}})}<Breadcrumb section="Ferramentas" href="/ferramentas" title={t.name}/><div className={s.toolIntro}><div className={s.hero}><span className={s.kicker}>{t.category.toUpperCase()} · FERRAMENTA GRATUITA</span><h1>{t.name}</h1><p>{t.description}</p><div className={s.toolFacts}><span>✓ Sem cadastro</span><span>✓ Gratuito</span><span>✓ No navegador</span></div></div><div className={s.toolArt}><Illustration kind={t.slug} compact/></div></div><ToolClient slug={t.slug}/><article className={s.article}><h2>Como utilizar esta ferramenta</h2><p>{t.guide}</p>{guides.length>0&&<div className={s.related}><h2>Aprenda com nossos guias</h2><ul>{guides.map(a=><li key={a.slug}><Link href={"/blog/"+a.slug}>{a.title}</Link></li>)}</ul></div>}<section className={s.faq}><h2>Perguntas frequentes</h2>{editorial[t.slug].faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section><div className={s.related}><h2>Outras ferramentas gratuitas</h2><ul>{relatedTools(t).map(x=><li key={x.slug}><Link href={"/ferramentas/"+x.slug}>{x.name}</Link></li>)}</ul></div><CTA context={editorial[t.slug].cta}/></article></Portal>}
