
import Link from "next/link";
import type {ReactNode} from "react";
import {site,tools,articles} from "./catalog";
import styles from "./portal.module.css";
export function Portal({children}:{children:ReactNode}){
 return <div className={styles.shell}><header className={styles.header}><div className={styles.nav}><Link className={styles.brand} href="/">✦ Eduverso<span>.</span></Link><nav aria-label="Portal educacional"><Link href="/blog">Blog</Link><Link href="/ferramentas">Ferramentas grátis</Link><Link href="/#planos" className={styles.button}>Conhecer planos</Link></nav></div></header><main className={styles.main}>{children}</main><footer className={styles.footer}><Link href="/">Eduverso</Link><Link href="/blog">Blog</Link><Link href="/ferramentas">Ferramentas</Link><Link href="/entrar">Área do aluno</Link><span>© {new Date().getFullYear()} Eduverso</span></footer></div>;
}
export function Breadcrumb({section,href,title}:{section:string,href:string,title?:string}){return <nav className={styles.crumb} aria-label="Localização"><Link href="/">Início</Link><span>›</span>{title?<><Link href={href}>{section}</Link><span>›</span><span aria-current="page">{title}</span></>:<span aria-current="page">{section}</span>}</nav>}
export function CTA(){return <aside className={styles.cta}><div><span className={styles.kicker}>DÊ O PRÓXIMO PASSO</span><h2>Seu estudo completo, em um só lugar.</h2><p>Conheça aulas, questões comentadas, revisões e materiais do Eduverso.</p></div><Link className={styles.button} href="/#planos">Conhecer os planos ↗</Link></aside>}
export function ToolGrid(){return <div className={styles.grid}>{tools.map(t=><Link className={styles.card} key={t.slug} href={"/ferramentas/"+t.slug}><span className={styles.icon}>{t.icon}</span><small>{t.category} · Grátis</small><h2>{t.name}</h2><p>{t.description}</p><strong>Usar ferramenta →</strong></Link>)}</div>}
export function ArticleGrid(){return <div className={styles.grid}>{articles.map(a=><Link className={styles.card} key={a.slug} href={"/blog/"+a.slug}><span className={styles.icon}>✦</span><small>{a.category}</small><h2>{a.title}</h2><p>{a.description}</p><strong>Ler artigo →</strong></Link>)}</div>}
export function structuredData(data:Record<string,unknown>){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>}
export function breadcrumbData(section:string,href:string,title:string,path:string){return {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Início",item:site},{"@type":"ListItem",position:2,name:section,item:site+href},{"@type":"ListItem",position:3,name:title,item:site+path}]}}
