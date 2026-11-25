
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {articles,tools,site} from "../../seo/catalog";
import {Portal,Breadcrumb,CTA,structuredData,breadcrumbData} from "../../seo/portal";
import ToolClient from "../../seo/tools-client";
import s from "../../seo/portal.module.css";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return tools.map(t=>({slug:t.slug}))}
export const dynamicParams=false;
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params,t=tools.find(x=>x.slug===slug);if(!t)return {};return {title:t.name+" | Eduverso",description:t.description,alternates:{canonical:site+"/ferramentas/"+t.slug},openGraph:{title:t.name,description:t.description,url:site+"/ferramentas/"+t.slug,locale:"pt_BR",siteName:"Eduverso",type:"website"}}}
export default async function Page({params}:Props){const {slug}=await params,t=tools.find(x=>x.slug===slug);if(!t)notFound();const a=articles.find(x=>x.slug===t.article);return <Portal>{structuredData(breadcrumbData("Ferramentas","/ferramentas",t.name,"/ferramentas/"+t.slug))}<Breadcrumb section="Ferramentas" href="/ferramentas" title={t.name}/><div className={s.hero}><span className={s.kicker}>{t.category.toUpperCase()} · FERRAMENTA GRATUITA</span><h1>{t.name}</h1><p>{t.description}</p></div><ToolClient slug={t.slug}/><article className={s.article}><h2>Como utilizar esta ferramenta</h2><p>{t.guide}</p>{a&&<p><Link className={s.inline} href={"/blog/"+a.slug}>Leia o guia completo: {a.title} →</Link></p>}<div className={s.related}><h2>Outras ferramentas gratuitas</h2><ul>{tools.filter(x=>x.slug!==t.slug).map(x=><li key={x.slug}><Link href={"/ferramentas/"+x.slug}>{x.name}</Link></li>)}</ul></div><CTA/></article></Portal>}
