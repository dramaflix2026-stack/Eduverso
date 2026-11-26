
import type {Metadata} from "next";
import {Portal,Breadcrumb,ToolGrid,CTA} from "../seo/portal";
import {tools,site} from "../seo/catalog";
import s from "../seo/portal.module.css";
export const metadata:Metadata={title:"Ferramentas gratuitas para estudar | Eduverso",description:`Use ${tools.length} ferramentas gratuitas de estudo: calculadoras, quizzes, cronogramas, flashcards e recursos para professores. Sem cadastro.`,alternates:{canonical:site+"/ferramentas"},openGraph:{title:"Ferramentas gratuitas de estudo | Eduverso",description:"Calculadoras, quizzes e planejamento para estudar sem cadastro.",url:site+"/ferramentas",type:"website",locale:"pt_BR",siteName:"Eduverso"}};
export default function Page(){return <Portal><Breadcrumb section="Ferramentas" href="/ferramentas"/><div className={s.hero}><span className={s.kicker}>EDUVERSO TOOLS · GRÁTIS</span><h1>Ferramentas que facilitam seu estudo.</h1><p>Planeje, pratique e revise com recursos gratuitos que funcionam diretamente no navegador, sem precisar criar uma conta.</p></div><ToolGrid/><CTA/></Portal>}
