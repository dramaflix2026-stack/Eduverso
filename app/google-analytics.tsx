"use client";
import {useEffect,useLayoutEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {articles,tools} from "./seo/catalog";
import "./google-analytics.css";

const ID="G-SVKWQGPTND", KEY="eduverso-ga4-consent-v1", DISABLE="ga-disable-G-SVKWQGPTND";
type Choice="accepted"|"declined"|null;
type GWin=Window & {dataLayer?:unknown[];gtag?:(...args:unknown[])=>void;[DISABLE]?:boolean};
const publicPages=new Map<string,string>([["/","landing"],["/blog","blog_index"],["/ferramentas","tools_index"],...articles.map(a=>["/blog/"+a.slug,"article"] as [string,string]),...tools.map(t=>["/ferramentas/"+t.slug,"tool"] as [string,string])]);
const safePath=(p:string)=>p==="/"?p:p.replace(/\/+$/,"");
const canonical="https://eduversoai.com.br";
let allowed=false,installed=false,lastPage="",previousPage="";
function gw(){return window as GWin}
function safeReferrer(){try{const u=new URL(document.referrer);if(u.origin===location.origin){const p=safePath(u.pathname);return publicPages.has(p)?canonical+p:""}return /^https?:$/.test(u.protocol)?u.origin:""}catch{return ""}}
function suspend(){allowed=false;if(typeof window!=="undefined"){gw()[DISABLE]=true}lastPage="";previousPage=""}
function locationFields(){const path=safePath(location.pathname);return {page_location:canonical+path,page_title:path==="/"? "Eduverso":articles.find(a=>"/blog/"+a.slug===path)?.title||tools.find(t=>"/ferramentas/"+t.slug===path)?.name||(path==="/blog"?"Eduverso Blog":"Ferramentas Eduverso"),page_type:publicPages.get(path)||""}}
function send(name:string,params:Record<string,string>={}){if(!allowed||!publicPages.has(safePath(location.pathname)))return;gw().gtag?.("event",name,{...locationFields(),...params,send_to:ID})}
function activate(){
 const w=gw();w[DISABLE]=false;allowed=true;
 if(!installed){
  if(typeof w.gtag!=="function"){w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer!.push(arguments)}}
  w.gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
  w.gtag("consent","update",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
  w.gtag("js",new Date());
  w.gtag("config",ID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,...locationFields(),page_referrer:safeReferrer()});
  const script=document.createElement("script");script.async=true;script.src="https://www.googletagmanager.com/gtag/js?id="+ID;script.dataset.eduversoGa4="true";document.head.appendChild(script);installed=true;
 }else{w.gtag?.("consent","update",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"})}
}
export function trackToolUse(slug:string){if(tools.some(t=>t.slug===slug)&&safePath(location.pathname)==="/ferramentas/"+slug)send("tool_used",{tool_slug:slug})}
export default function GoogleAnalytics(){
 const pathname=usePathname(),path=safePath(pathname||"/"),isPublic=publicPages.has(path),[choice,setChoice]=useState<Choice>(null),[ready,setReady]=useState(false),[open,setOpen]=useState(false);
 const lastScroll=useRef("");
 useEffect(()=>{try{const v=localStorage.getItem(KEY);if(v==="accepted"||v==="declined")setChoice(v)}catch{}setReady(true);function sync(e:StorageEvent){if(e.key===KEY){const v=e.newValue;setChoice(v==="accepted"||v==="declined"?v:null);if(v!=="accepted")suspend()}}window.addEventListener("storage",sync);return()=>window.removeEventListener("storage",sync)},[]);
 useLayoutEffect(()=>{if(!isPublic||choice!=="accepted"||!ready)suspend()},[isPublic,choice,ready]);
 useEffect(()=>{
  if(!ready||choice!=="accepted"||!isPublic)return;
  activate();if(lastPage!==path){
   const ref=previousPage?canonical+previousPage:safeReferrer(),fields=locationFields();
   gw().gtag?.("set",{...fields,page_referrer:ref});
   send("page_view",{page_referrer:ref});
   lastPage=path;previousPage=path;
  }
  function click(e:MouseEvent){const a=e.target instanceof Element?e.target.closest("a"):null;if(!a)return;try{const u=new URL(a.href,location.href);if(u.protocol==="https:"&&u.hostname==="pay.kiwify.com.br"){send("checkout_click");return}if(u.origin!==location.origin)return;if(safePath(u.pathname)==="/"&&u.hash==="#planos")send("plans_click");else if(publicPages.get(safePath(u.pathname))==="tool"&&publicPages.get(path)==="article")send("article_tool_click",{tool_slug:safePath(u.pathname).split("/").pop()||""})}catch{}}
  function scroll(){const h=document.documentElement;if(lastScroll.current!==path&&h.scrollHeight>innerHeight&&scrollY+innerHeight>=h.scrollHeight*.9){lastScroll.current=path;send("content_scroll_90")}}
  document.addEventListener("click",click,true);window.addEventListener("scroll",scroll,{passive:true});return()=>{document.removeEventListener("click",click,true);window.removeEventListener("scroll",scroll)};
 },[path,isPublic,choice,ready]);
 function decide(next:Exclude<Choice,null>){if(next==="declined"){suspend();gw().gtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"})}try{localStorage.setItem(KEY,next)}catch{}setChoice(next);setOpen(false)}
 if(!isPublic||!ready)return null;
 return <div className="ev-ga-privacy">{choice===null||open?<section className="ev-ga-panel" aria-label="Preferências de análise de navegação"><strong>Privacidade e análise de navegação</strong><p>Com sua autorização, usamos o Google Analytics para entender quais páginas e ferramentas são utilizadas. Não enviamos respostas, notas ou dados de cadastro nos eventos personalizados. Você pode recusar ou alterar sua escolha a qualquer momento.</p><div><button type="button" onClick={()=>decide("declined")}>Recusar análise</button><button type="button" onClick={()=>decide("accepted")}>Permitir análise</button></div></section>:<button type="button" className="ev-ga-settings" onClick={()=>setOpen(true)}>Cookies de análise</button>}</div>
}
