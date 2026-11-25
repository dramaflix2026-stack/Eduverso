"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";

const slides = [
 {title:"Ensino Fundamental",file:"file_00000000c4d0820e91311a2432ac0c40.webp",summary:"Do 1º ao 9º ano"},
 {title:"Ensino Médio",file:"file_00000000d04c820e81984109da7e54c8.webp",summary:"Aulas, questões e revisão",coverFooter:true},
 {title:"ENEM, Vestibulares e Concursos",file:"file_00000000ec64820e88aea0ad0ccba768.webp",summary:"Prepare-se para seus objetivos"},
 {title:"Medicina",file:"file_000000004f2c820ea5419cb1f6d1162f.webp",summary:"Do vestibular à residência"},
 {title:"Atlas de Anatomia",file:"file_0000000011c8820e8d65c59570e19082.webp",summary:"Explore estruturas anatômicas",coverFooter:true},
 {title:"Formações Profissionais",file:"file_000000003214820e88bfcb670a9644c9.webp",summary:"Tecnologia, design e marketing",coverFooter:true},
 {title:"Central de Criação com IA",file:"file_00000000ca38820e918a36b327e835ae.webp",summary:"Provas, apostilas e materiais"},
] as const;
const count=slides.length;
const wrap=(index:number)=>(index+count)%count;
export default function LandingCarousel(){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const [hovered,setHovered]=useState(false);
 const [focused,setFocused]=useState(false);
 const [reduced,setReduced]=useState(false);
 const [visible,setVisible]=useState(false);
 const region=useRef<HTMLDivElement>(null);
 const gesture=useRef<{x:number;y:number}|null>(null);
 const lastSwipe=useRef(0);
 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setReduced(media.matches);
  update();media.addEventListener("change",update);
  const node=region.current;
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.2});
  if(node)observer.observe(node);
  return()=>{media.removeEventListener("change",update);observer.disconnect();};
 },[]);
 useEffect(()=>{
  if(paused||hovered||focused||reduced||!visible)return;
  const timer=window.setTimeout(()=>setActive(index=>wrap(index+1)),3000);
  return()=>window.clearTimeout(timer);
 },[active,paused,hovered,focused,reduced,visible]);
 const step=(delta:number)=>setActive(index=>wrap(index+delta));
 return <div ref={region} className="lp-coverflow" role="region" aria-roledescription="carrossel" aria-label="Conheça os recursos do Eduverso"
  onPointerEnter={e=>{if(e.pointerType==="mouse")setHovered(true);}} onPointerLeave={()=>setHovered(false)}
  onFocusCapture={e=>{if(e.target.matches(":focus-visible"))setFocused(true);}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setFocused(false);}}
  onKeyDown={e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();step(e.key==="ArrowLeft"?-1:1);}}}>
  <div className="lp-coverflow-viewport"
   onTouchStart={e=>{const t=e.touches[0];gesture.current={x:t.clientX,y:t.clientY};}}
   onTouchCancel={()=>{gesture.current=null;}}
   onTouchEnd={e=>{const start=gesture.current;gesture.current=null;if(!start)return;const t=e.changedTouches[0];const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)*1.2){lastSwipe.current=Date.now();step(dx<0?1:-1);}}}>
   {slides.map((slide,index)=>{
    const offset=((index-active+count+3)%count)-3;
    const shown=Math.abs(offset)<=2;
    return <div key={slide.file} className="lp-coverflow-card" data-offset={offset} aria-hidden={index!==active}>
     <Image src={"/images/"+slide.file} alt={slide.title+" — "+slide.summary} fill sizes="(max-width: 680px) 60vw, 310px" loading={index===0?"eager":"lazy"} draggable={false}/>
     {"coverFooter" in slide&&<div className="lp-coverflow-art-footer"><span aria-hidden="true">✦</span> {slide.summary}</div>}
     {shown&&index!==active&&<button type="button" className="lp-coverflow-side-hit" aria-label={"Mostrar "+slide.title} tabIndex={-1} onClick={()=>{if(Date.now()-lastSwipe.current>400)setActive(index);}}/>}
    </div>;
   })}
  </div>
  <div className="lp-coverflow-caption" aria-live={paused||focused?"polite":"off"}><strong>{slides[active].title}</strong><span>{slides[active].summary}</span></div>
  <div className="lp-coverflow-controls">
   <button type="button" className="lp-coverflow-arrow" aria-label="Imagem anterior" onClick={()=>step(-1)}>‹</button>
   <div className="lp-coverflow-dots">{slides.map((slide,index)=><button type="button" key={slide.file} className="lp-coverflow-dot" aria-label={"Mostrar "+slide.title} aria-current={index===active?"true":undefined} onClick={()=>setActive(index)}><span/></button>)}</div>
   <button type="button" className="lp-coverflow-arrow" aria-label="Próxima imagem" onClick={()=>step(1)}>›</button>
  </div>
  {!reduced&&<button type="button" className="lp-coverflow-motion" onClick={()=>setPaused(value=>!value)}>{paused?"Retomar animação":"Pausar animação"}</button>}
 </div>;
}
