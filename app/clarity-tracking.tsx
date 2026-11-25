"use client";
import {useEffect,useRef,useState} from "react";

const PROJECT="zj7gd7kk27";
type ClarityFn=((...args:unknown[])=>void)&{q?:unknown[][]};
type ClarityWindow=Window & {clarity?:ClarityFn};
const cw=()=>window as ClarityWindow;
function eligible(){
 if(location.pathname!=="/"||location.search||location.hash)return false;
 try{if(document.referrer){const ref=new URL(document.referrer);if(ref.search||ref.hash||(ref.origin===location.origin&&ref.pathname!=="/"))return false}}catch{return false}
 return true;
}
function grant(){cw().clarity?.("consentv2",{analytics_Storage:"granted",ad_Storage:"denied"})}
function revoke(){cw().clarity?.("consentv2",{analytics_Storage:"denied",ad_Storage:"denied"})}
export default function ClarityTracking(){
 const [ready,setReady]=useState(false),[adult,setAdult]=useState(false),[enabled,setEnabled]=useState(false),[status,setStatus]=useState("");
 const active=useRef(false);
 useEffect(()=>{
  setReady(eligible());
  // The recording script is confined to this document. Cross-page navigation
  // uses a full document load, not a client-side transition.
  const exit=()=>{if(active.current&&location.pathname!=="/"){revoke();location.reload()}};
  const restore=(event:PageTransitionEvent)=>{if(event.persisted&&active.current){revoke();location.reload()}};
  window.addEventListener("popstate",exit);
  window.addEventListener("pageshow",restore);
  return()=>{window.removeEventListener("popstate",exit);window.removeEventListener("pageshow",restore);if(active.current){revoke();if(location.pathname!=="/")location.reload()}};
 },[]);
 function enable(){
  if(!adult||!eligible()||active.current)return;
  // Mask page text and interactive content before the tag is loaded.
  document.body.setAttribute("data-clarity-mask","true");
  const w=cw();
  if(!w.clarity){const f=((...args:unknown[])=>{(f.q??=[]).push(args)}) as ClarityFn;w.clarity=f}
  grant();
  const script=document.createElement("script");
  script.async=true;script.src="https://www.clarity.ms/tag/"+PROJECT;script.dataset.eduversoClarity="true";
  script.onload=()=>setStatus("Análise visual autorizada.");
  script.onerror=()=>{revoke();setStatus("Não foi possível carregar o Clarity. Você pode continuar navegando normalmente.")};
  active.current=true;setEnabled(true);document.head.appendChild(script);
 }
 function disable(){revoke();active.current=false;location.reload()}
 if(!ready)return null;
 return <details className="eduverso-privacy-settings"><summary>Análise visual da página (18+)</summary><div className="eduverso-privacy-panel"><p>Opcional e exclusiva para adultos. O Microsoft Clarity registra interações de navegação para análise de usabilidade. A autorização vale apenas nesta página e não é necessária para comprar ou estudar.</p>{enabled?<><p role="status">{status||"Carregando análise visual..."}</p><button type="button" className="eduverso-privacy-choice" onClick={disable}>Desativar análise visual</button></>:<><label style={{display:"flex",gap:8,alignItems:"center",fontSize:13}}><input type="checkbox" checked={adult} onChange={e=>setAdult(e.target.checked)}/>Confirmo que tenho 18 anos ou mais.</label><button type="button" className="eduverso-privacy-choice" disabled={!adult} onClick={enable}>Autorizar gravação de navegação</button><button type="button" className="eduverso-privacy-choice" onClick={()=>{setAdult(false);setStatus("Análise visual desativada.")}}>Não autorizar</button>{status&&<p role="status">{status}</p>}</>}</div></details>
}
