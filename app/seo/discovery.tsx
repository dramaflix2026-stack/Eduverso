
"use client";
import {useState} from "react";
import Link from "next/link";
import {articles,tools} from "./catalog";
import {Illustration} from "./visuals";
import s from "./portal.module.css";
const normalized=(x:string)=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
export default function Discovery({mode}:{mode:"blog"|"tools"}){
 const [query,setQuery]=useState(""),[category,setCategory]=useState("Todos");
 const items=mode==="blog"?articles.map(a=>({slug:a.slug,title:a.title,category:a.category,description:a.description,kind:a.tool,href:"/blog/"+a.slug})):tools.map(t=>({slug:t.slug,title:t.name,category:t.category,description:t.description,kind:t.slug,href:"/ferramentas/"+t.slug}));
 const cats=["Todos",...new Set(items.map(x=>x.category))],filtered=items.filter(x=>(category==="Todos"||x.category===category)&&normalized(x.title+" "+x.description+" "+x.category).includes(normalized(query.trim())));
 return <><div className={s.discovery}><label className={s.searchBox}><span aria-hidden="true">⌕</span><input type="search" aria-label="Buscar conteúdo" placeholder={mode==="blog"?"Buscar assuntos de estudo…":"Encontrar uma ferramenta…"} value={query} onChange={e=>setQuery(e.target.value)}/></label><div className={s.filters} aria-label="Categorias">{cats.map(c=><button key={c} type="button" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div></div><div className={s.sectionTitle}><h2>{mode==="blog"?"Explore os guias":"Explore as ferramentas"}</h2><span aria-live="polite">{filtered.length} resultados</span></div><div className={s.grid}>{filtered.map((x,i)=><Link className={s.card+" "+(mode==="blog"&&i===0&&!query&&category==="Todos"?s.featureCard:s.compactCard)} key={x.slug} href={x.href}><div className={s.cover}><Illustration kind={x.kind}/></div><div className={s.cardBody}><small>{x.category}{mode==="tools"?" · GRATUITO":""}</small><h3>{x.title}</h3><p>{x.description}</p><strong>{mode==="blog"?"Ler guia":"Usar gratuitamente"} →</strong></div></Link>)}</div>{!filtered.length&&<p role="status">Nenhum resultado. Experimente outro termo.</p>}</>
}
