
import type {Metadata} from "next";
import {Portal,Breadcrumb,ToolGrid,CTA} from "../seo/portal";
import s from "../seo/portal.module.css";
export const metadata:Metadata={title:"Ferramentas gratuitas para estudar | Eduverso",description:"30 ferramentas gratuitas de estudo: calculadoras de matemática, conversor de unidades, cronograma, revisão, flashcards, simulado e Pomodoro. Sem cadastro.",alternates:{canonical:"https://eduversoai.com.br/ferramentas"}};
export default function Page(){return <Portal><Breadcrumb section="Ferramentas" href="/ferramentas"/><div className={s.hero}><span className={s.kicker}>EDUVERSO TOOLS · GRÁTIS</span><h1>Ferramentas que facilitam seu estudo.</h1><p>Planeje, pratique e revise com recursos gratuitos que funcionam diretamente no navegador, sem precisar criar uma conta.</p></div><ToolGrid/><CTA/></Portal>}
