
import type {Metadata} from "next";
import {Portal,Breadcrumb,ArticleGrid,CTA} from "../seo/portal";
import {articles,site} from "../seo/catalog";
import s from "../seo/portal.module.css";
export const metadata:Metadata={title:"Blog Eduverso | Guias de estudo, ENEM e aprendizagem",description:`Explore ${articles.length} guias gratuitos de matemática, ciências, anatomia, ENEM e pedagogia, com exemplos e ferramentas interativas.`,alternates:{canonical:site+"/blog"},openGraph:{title:"Blog Eduverso — guias gratuitos de estudo",description:"Guias de estudo com exemplos e ferramentas interativas.",url:site+"/blog",type:"website",locale:"pt_BR",siteName:"Eduverso"}};
export default function Page(){return <Portal><Breadcrumb section="Blog" href="/blog"/><div className={s.hero}><span className={s.kicker}>EDUVERSO BLOG</span><h1>Aprender abre novos caminhos.</h1><p>Guias práticos, explicações e exemplos para organizar seus estudos e desenvolver conhecimento no seu ritmo.</p></div><ArticleGrid/><CTA/></Portal>}
