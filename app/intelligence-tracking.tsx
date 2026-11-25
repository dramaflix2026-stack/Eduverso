"use client";
import { useEffect, useRef, useState } from "react";

const CHOICE="eduverso-navigation-analytics-v1", SESSION="eduverso-navigation-session-v1";
const TTL=30*60*1000;
type Kind="landing_view"|"engaged"|"cta_click"|"checkout_redirect";
type Session={id:string;last:number;campaign:string|null;ad:string|null};
const numeric=(v:string|null)=>v&&/^\d{1,25}$/.test(v)?v:null;
function attribution(){
 const p=new URLSearchParams(location.search);
 return {campaign:numeric(p.get("campaign_id")||p.get("utm_campaign")),ad:numeric(p.get("ad_id")||p.get("utm_content"))};
}
function session():Session{
 const a=attribution(), now=Date.now();
 let old:Session|null=null;
 try{old=JSON.parse(sessionStorage.getItem(SESSION)||"null")}catch{}
 if(old&&/^[a-f0-9-]{36}$/i.test(old.id)&&Number.isFinite(old.last)&&now-old.last<TTL&&now>=old.last&&(!a.campaign||old.campaign===a.campaign)&&(!a.ad||old.ad===a.ad)){
  old.last=now;return old;
 }
 return {id:crypto.randomUUID(),last:now,...a};
}
function send(s:Session,kind:Kind){
 s.last=Date.now();
 try{sessionStorage.setItem(SESSION,JSON.stringify(s))}catch{}
 const body={event_id:crypto.randomUUID(),session_id:s.id,at:new Date().toISOString(),kind,campaign_id:s.campaign,ad_id:s.ad};
 void fetch("/api/intelligence-event",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),credentials:"omit",referrerPolicy:"no-referrer",keepalive:true,cache:"no-store"}).catch(()=>{});
}
export default function IntelligenceTracking(){
 const [enabled,setEnabled]=useState(false),[loaded,setLoaded]=useState(false);
 const current=useRef<Session|null>(null);
 useEffect(()=>{try{setEnabled(localStorage.getItem(CHOICE)==="accepted")}catch{}setLoaded(true)},[]);
 useEffect(()=>{
  if(!enabled||!loaded||typeof crypto.randomUUID!=="function")return;
  let timer:ReturnType<typeof setTimeout>|undefined,viewed=false,engaged=false,cta=false,checkout=false,visibleMs=0,started=0;
  current.current=session();
  function event(kind:Kind){
   const s=current.current;if(!s)return;
   if(Date.now()-s.last>=TTL){current.current=session();viewed=false;engaged=false;cta=false;checkout=false;visibleMs=0;}
   const active=current.current!;
   if(!viewed){viewed=true;send(active,"landing_view")}
   if(kind==="landing_view")return;
   if(kind==="engaged"){if(engaged)return;engaged=true}
   if(kind==="cta_click"){if(cta)return;cta=true}
   if(kind==="checkout_redirect"){if(checkout)return;checkout=true}
   send(active,kind);
  }
  function visibility(){
   if(timer)clearTimeout(timer);
   if(started){visibleMs+=Date.now()-started;started=0}
   if(document.visibilityState!=="visible")return;
   event("landing_view");started=Date.now();
   if(!engaged)timer=setTimeout(()=>{if(document.visibilityState==="visible")event("engaged")},Math.max(0,15000-visibleMs));
  }
  function click(e:MouseEvent){
   const a=e.target instanceof Element?e.target.closest("a"):null;
   if(!a||!document.querySelector(".edu-lp")?.contains(a))return;
   let url:URL;try{url=new URL(a.href,location.href)}catch{return}
   if(url.protocol==="https:"&&url.hostname==="pay.kiwify.com.br"){
    event("cta_click");event("checkout_redirect");
   }else if(url.origin===location.origin&&["#planos","#produto"].includes(url.hash)){event("cta_click")}
  }
  visibility();document.addEventListener("visibilitychange",visibility);document.addEventListener("click",click,true);
  return ()=>{if(timer)clearTimeout(timer);document.removeEventListener("visibilitychange",visibility);document.removeEventListener("click",click,true);current.current=null};
 },[enabled,loaded]);
 function choose(){
  const next=!enabled;try{localStorage.setItem(CHOICE,next?"accepted":"declined");if(!next)sessionStorage.removeItem(SESSION)}catch{}
  setEnabled(next);
 }
 if(!loaded)return null;
 return <button type="button" className="eduverso-privacy-choice" title="Medição opcional de sessões, engajamento e cliques na página pública, sem dados de conta." onClick={choose}>{enabled?"Desativar análise de navegação":"Ativar análise de navegação"}</button>;
}
