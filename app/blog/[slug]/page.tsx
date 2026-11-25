
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {articles,tools,site} from "../../seo/catalog";
import {Portal,Breadcrumb,CTA,structuredData,breadcrumbData} from "../../seo/portal";
import s from "../../seo/portal.module.css";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export const dynamicParams=false;
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params,a=articles.find(x=>x.slug===slug);if(!a)return {};return {title:a.title+" | Eduverso",description:a.description,alternates:{canonical:site+"/blog/"+a.slug},openGraph:{title:a.title,description:a.description,url:site+"/blog/"+a.slug,type:"article",locale:"pt_BR",siteName:"Eduverso"}}}
export default async function Page({params}:Props){const {slug}=await params,a=articles.find(x=>x.slug===slug);if(!a)notFound();const t=tools.find(x=>x.slug===a.tool);return <Portal>{structuredData(breadcrumbData("Blog","/blog",a.title,"/blog/"+a.slug))}{structuredData({"@context":"https://schema.org","@type":"Article",headline:a.title,description:a.description,author:{"@type":"Organization",name:"Eduverso",url:site},publisher:{"@type":"Organization",name:"Eduverso"},mainEntityOfPage:site+"/blog/"+a.slug,inLanguage:"pt-BR"})}<Breadcrumb section="Blog" href="/blog" title={a.title}/><article className={s.article}><span className={s.kicker}>{a.category.toUpperCase()}</span><h1>{a.title}</h1><p className={s.lead}>{a.intro}</p>{a.sections.map(([title,body])=><section key={title}><h2>{title}</h2><p>{body}</p></section>)}<p className={s.example}>{a.example}</p>{t&&<aside className={s.cta}><div><span className={s.kicker}>PRATIQUE AGORA</span><h2>{t.name}</h2><p>{t.description}</p></div><Link className={s.button} href={"/ferramentas/"+t.slug}>Usar grátis →</Link></aside>}<div className={s.related}><h2>Continue aprendendo</h2><ul>{articles.filter(x=>x.slug!==a.slug).slice(0,3).map(x=><li key={x.slug}><Link href={"/blog/"+x.slug}>{x.title}</Link></li>)}</ul></div><CTA/></article></Portal>}
