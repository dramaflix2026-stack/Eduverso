"use client";
import Image from "next/image";
import {useEffect,useRef,useState,type ReactNode} from "react";
const slides=[
 {title:"Painel inicial",file:"file_0000000005f4820ea5cd5625687e29d1.webp"},
 {title:"Aulas visuais",file:"file_000000000180820e99acf12b054900f3.webp"},
 {title:"Questões comentadas",file:"file_00000000506c820e814e88c287428c89.webp"},
 {title:"Atlas interativo",file:"file_00000000f664820e841e744c3e6ed726.webp"},
 {title:"Gerador de provas",file:"file_000000003530820e93488779d2418bb2.webp"},
 {title:"Criador de apostilas",file:"file_00000000ef04820eb0d46b90c2205b3f.webp"},
];
export default function LandingDemoCarousel({children}:{children:ReactNode}){
 const track=useRef<HTMLDivElement>(null);
 const details=useRef<HTMLDetailsElement>(null);
 const [active,setActive]=useState(0);
 const [visible,setVisible]=useState(false);
 const [paused,setPaused]=useState(false);
 const [hovered,setHovered]=useState(false);
 const [focused,setFocused]=useState(false);
 const [reduced,setReduced]=useState(false);
 const lastManual=useRef(0);
 function step(delta:number){
  const el=track.current;if(!el)return;
  const cards=Array.from(el.querySelectorAll<HTMLElement>(".lp-demo-gallery-card"));
  if(cards.length<2)return;
  const max=Math.max(0,el.scrollWidth-el.clientWidth);
  const unit=cards[1].offsetLeft-cards[0].offsetLeft;
  const next=delta>0&&el.scrollLeft>=max-3?0:delta<0&&el.scrollLeft<=3?max:Math.max(0,Math.min(max,el.scrollLeft+delta*unit));
  el.scrollTo({left:next,behavior:reduced?"instant":"smooth"});
 }
 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  const change=()=>setReduced(media.matches);change();media.addEventListener("change",change);
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});
  if(track.current)observer.observe(track.current);
  const openDemo=()=>{if(window.location.hash==="#demonstracao"&&details.current){details.current.open=true;requestAnimationFrame(()=>details.current?.scrollIntoView({block:"start"}));}};
  openDemo();window.addEventListener("hashchange",openDemo);
  return()=>{media.removeEventListener("change",change);observer.disconnect();window.removeEventListener("hashchange",openDemo);};
 },[]);
 useEffect(()=>{
  if(!visible||paused||hovered||focused||reduced)return;
  const timer=window.setInterval(()=>{if(Date.now()-lastManual.current>4500){
   const el=track.current;if(!el)return;
   const cards=el.querySelectorAll<HTMLElement>(".lp-demo-gallery-card");
   if(cards.length<2)return;
   const max=el.scrollWidth-el.clientWidth;
   const unit=cards[1].offsetLeft-cards[0].offsetLeft;
   el.scrollTo({left:el.scrollLeft>=max-3?0:Math.min(max,el.scrollLeft+unit),behavior:el.scrollLeft>=max-3?"instant":"smooth"});
  }},4000);return()=>window.clearInterval(timer);
 },[visible,paused,hovered,focused,reduced]);
 return <>
  <div className="lp-demo-gallery" role="region" aria-roledescription="carrossel" aria-label="Ferramentas do Eduverso"
   onPointerEnter={e=>{if(e.pointerType==="mouse")setHovered(true)}} onPointerLeave={()=>setHovered(false)}
   onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setFocused(false)}}>
   <div ref={track} className="lp-demo-gallery-track" tabIndex={0} aria-label="Deslize para explorar as ferramentas"
    onPointerDown={()=>{lastManual.current=Date.now()}} onScroll={()=>{const el=track.current;if(!el)return;const cards=el.querySelectorAll<HTMLElement>(".lp-demo-gallery-card");if(cards.length>1){const unit=cards[1].offsetLeft-cards[0].offsetLeft;setActive(Math.min(slides.length-1,Math.round(el.scrollLeft/unit)));}}}
    onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();lastManual.current=Date.now();step(e.key==="ArrowRight"?1:-1);}}}>
    {slides.map(slide=><article className="lp-demo-gallery-card" key={slide.file}><div className="lp-demo-gallery-art"><Image src={"/images/"+slide.file} alt={"Arte ilustrativa — "+slide.title} fill sizes="(max-width: 680px) 76vw, (max-width: 1000px) 34vw, 260px" loading="lazy" draggable={false}/>{slide.title==="Aulas visuais"&&<span className="lp-demo-gallery-overlay">Conteúdo visual e explicações passo a passo</span>}</div><h3>{slide.title}</h3></article>)}
   </div>
   <div className="lp-demo-gallery-controls">
    <button className="lp-coverflow-arrow" type="button" aria-label="Anterior" onClick={()=>{lastManual.current=Date.now();step(-1)}}>‹</button>
    <span className="lp-demo-gallery-position">{String(active+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span>
    <button className="lp-coverflow-arrow" type="button" aria-label="Próximo" onClick={()=>{lastManual.current=Date.now();step(1)}}>›</button>
    {!reduced&&<button className="lp-demo-gallery-motion" type="button" aria-label={paused?"Retomar carrossel":"Pausar carrossel"} title={paused?"Retomar":"Pausar"} onClick={()=>setPaused(v=>!v)}>{paused?"▶":"Ⅱ"}</button>}
   </div>
   <p className="lp-demo-gallery-note">Artes ilustrativas das funcionalidades; consulte os recursos disponíveis em cada plano.</p>
   <a className="lp-button lp-demo-gallery-cta" href="#planos">Quero ter acesso ao Eduverso <span aria-hidden="true">↗</span></a>
  </div>
  <details className="lp-demo-disclosure" id="demonstracao" ref={details}>
   <summary><span><strong>Experimente uma questão grátis</strong><small>Teste a plataforma antes de começar.</small></span><span className="lp-demo-disclosure-plus" aria-hidden="true">+</span></summary>
   <div className="lp-demo-disclosure-content">{children}</div>
  </details>
 </>;
}
