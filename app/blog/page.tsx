
import type {Metadata} from "next";
import {Portal,Breadcrumb,ArticleGrid,CTA} from "../seo/portal";
import s from "../seo/portal.module.css";
export const metadata:Metadata={title:"Blog Eduverso | Guias de estudo, ENEM e aprendizagem",description:"Explore 60 guias gratuitos de matemática, ciências, ENEM, organização e métodos de estudo, com exemplos resolvidos e ferramentas interativas.",alternates:{canonical:"https://eduversoai.com.br/blog"}};
export default function Page(){return <Portal><Breadcrumb section="Blog" href="/blog"/><div className={s.hero}><span className={s.kicker}>EDUVERSO BLOG</span><h1>Aprender abre novos caminhos.</h1><p>Guias práticos, explicações e exemplos para organizar seus estudos e desenvolver conhecimento no seu ritmo.</p></div><ArticleGrid/><CTA/></Portal>}
