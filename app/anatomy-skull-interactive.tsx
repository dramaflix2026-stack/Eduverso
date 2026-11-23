"use client";
import {useRef,useState,type ReactNode,type TouchEvent} from "react";
import type {AtlasSpot} from "./anatomy-atlas-collection-data";
import styles from "./anatomy-skull-interactive.module.css";

type Mode="explorar"|"desafio"|"flashcards";
type Props={mode:Mode;spots:AtlasSpot[];selectedId:string|null;targetId:string|null;answerId:string|null;disabled:boolean;onSelect:(spot:AtlasSpot)=>void};
type RegionProps={id:string;mode:Mode;selectedId:string|null;targetId:string|null;answerId:string|null;disabled:boolean;spots:AtlasSpot[];onSelect:(spot:AtlasSpot)=>void;children:ReactNode};
function Region({id,mode,selectedId,targetId,answerId,disabled,spots,onSelect,children}:RegionProps){
 const spot=spots.find(x=>x.id===id);
 if(!spot)return <g>{children}</g>;
 const reveal=mode==="flashcards"?targetId:mode==="explorar"?selectedId:answerId!==null?targetId:null;
 const isCorrect=mode==="desafio"&&answerId!==null&&id===targetId;
 const isWrong=mode==="desafio"&&answerId!==null&&answerId===id&&answerId!==targetId;
 const cls=[styles.region,id===reveal?(mode==="flashcards"?styles.flash:mode==="desafio"?styles.correct:styles.active):"",isWrong?styles.wrong:"",reveal&&id!==reveal&&!isWrong?styles.dim:""].filter(Boolean).join(" ");
 const inactive=disabled||mode==="flashcards";
 function select(){if(!inactive)onSelect(spot);}
 return <g className={cls} role="button" aria-disabled={inactive} aria-label={mode==="explorar"?spot.name:"Selecionar região anatômica"} tabIndex={inactive?-1:0}
  onClick={select} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();select();}}}>
  <title>{mode==="explorar"?spot.name:"Região anatômica"}</title>{children}
 </g>;
}
/**
 * Esquema original de crânio frontal em SVG, com regiões vetoriais independentes.
 * Uso didático: limites e proporções são simplificados e exigem validação anatômica
 * antes de uso especializado. Os sete IDs são preservados do atlas pré-existente.
 */
export default function AnatomySkullInteractive({mode,spots,selectedId,targetId,answerId,disabled,onSelect}:Props){
 const [zoom,setZoom]=useState(1);
 const [showGuide,setShowGuide]=useState(false);
 const [showNames,setShowNames]=useState(false);
 const pinch=useRef<{distance:number;zoom:number}|null>(null);
 const rProps={mode,selectedId,targetId,answerId,disabled,spots,onSelect};
 const clamp=(x:number)=>Math.max(1,Math.min(3,Math.round(x*10)/10));
 function startPinch(e:TouchEvent<HTMLDivElement>){if(e.touches.length===2){const a=e.touches[0],b=e.touches[1];pinch.current={distance:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),zoom};}}
 function movePinch(e:TouchEvent<HTMLDivElement>){if(e.touches.length===2&&pinch.current){const a=e.touches[0],b=e.touches[1];if(pinch.current.distance)setZoom(clamp(pinch.current.zoom*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/pinch.current.distance));}}
 const teeth=Array.from({length:12},(_,i)=>i);
 return <section className={styles.root} aria-label="Atlas interativo do crânio — vista anterior">
  <div className={styles.header}><div><span>✦ MODELO ANATÔMICO</span><strong>Crânio · Vista frontal</strong></div><div className={styles.zoom} role="group" aria-label="Zoom do atlas">
   <button type="button" aria-label="Reduzir zoom" disabled={zoom===1} onClick={()=>setZoom(x=>clamp(x-.5))}>−</button>
   <output aria-live="polite">{Math.round(zoom*100)}%</output>
   <button type="button" aria-label="Ampliar" disabled={zoom===3} onClick={()=>setZoom(x=>clamp(x+.5))}>+</button>
   <button type="button" disabled={zoom===1} onClick={()=>setZoom(1)}>Ajustar</button>
  </div></div>
  <div className={styles.options}>
   <button type="button" disabled={mode!=="explorar"} aria-pressed={showNames} onClick={()=>setShowNames(v=>!v)}>{showNames?"◉ Ocultar nomes":"◎ Mostrar nomes"}</button>
   <button type="button" onClick={()=>setShowGuide(v=>!v)} aria-expanded={showGuide}>{showGuide?"− Ocultar instruções":"+ Como interagir"}</button>
  </div>
  {showGuide&&<p className={styles.guide}>Toque diretamente em uma região óssea. Em Explorar, abra a explicação; em Desafio, encontre o osso pedido e receba a correção; em Flashcards, identifique o osso amarelo e escreva seu nome. A ilustração é esquemática, criada para este primeiro teste.</p>}
  <div className={styles.viewport+(zoom>1?" "+styles.zoomed:"")}
   onTouchStart={startPinch} onTouchMove={movePinch} onTouchEnd={e=>{if(e.touches.length<2)pinch.current=null;}}>
   <svg className={styles.svg} style={{width:zoom*100+"%"}} viewBox="0 0 700 800" role="group" aria-label="Ossos frontal, parietal, temporal, nasal, zigomático, maxila e mandíbula">
    <defs>
     <linearGradient id="skull-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f8f4ff"/><stop offset="1" stopColor="#e6e1f4"/></linearGradient>
     <linearGradient id="skull-frontal" x1=".1" y1="0" x2=".9" y2="1"><stop stopColor="#e7c9ff"/><stop offset=".65" stopColor="#c69bec"/><stop offset="1" stopColor="#916abf"/></linearGradient>
     <linearGradient id="skull-maxila" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffd9bd"/><stop offset="1" stopColor="#db9889"/></linearGradient>
     <linearGradient id="skull-mandibula" x1=".1" y1="0" x2=".8" y2="1"><stop stopColor="#fcb8bd"/><stop offset=".8" stopColor="#d9799a"/></linearGradient>
     <linearGradient id="skull-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffeab1"/><stop offset="1" stopColor="#d6a64e"/></linearGradient>
     <linearGradient id="skull-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c4e7fd"/><stop offset="1" stopColor="#799ddc"/></linearGradient>
     <linearGradient id="skull-green" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c4eecd"/><stop offset="1" stopColor="#66bea8"/></linearGradient>
     <linearGradient id="skull-nasal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b9f6ec"/><stop offset="1" stopColor="#56b9b7"/></linearGradient>
     <filter id="skull-shadow"><feDropShadow dx="0" dy="9" stdDeviation="12" floodColor="#8d78b7" floodOpacity=".15"/></filter>
    </defs>
    <rect x="0" y="0" width="700" height="800" rx="24" fill="url(#skull-bg)"/>
    <g aria-hidden="true" opacity=".4" fill="none" stroke="#e2d7f2"><path d="M350 30V767M26 398H674" strokeDasharray="5 10"/><ellipse cx="350" cy="395" rx="293" ry="357"/></g>
    <g filter="url(#skull-shadow)">
     <g className={styles.backBone} aria-hidden="true"><path d="M350 54C231 54 147 120 140 252C129 349 155 423 195 463L193 552C198 656 277 740 350 745C426 740 503 654 507 551L505 463C547 420 572 345 560 249C553 122 467 54 350 54Z"/></g>
     <Region id="parietal" {...rProps}>
      <path fill="url(#skull-blue)" d="M346 64C230 59 166 120 159 234L165 317Q190 329 220 312L238 247Q240 161 293 117Z"/>
      <path fill="url(#skull-blue)" d="M354 64C470 59 534 120 541 234L535 317Q510 329 480 312L462 247Q460 161 407 117Z"/>
     </Region>
     <Region id="frontal" {...rProps}>
      <path fill="url(#skull-frontal)" d="M350 65C280 65 216 91 191 162Q173 204 182 271L203 315Q226 302 247 288Q292 268 350 275Q408 268 453 288Q476 302 497 315L518 271Q527 204 509 162C484 91 421 65 350 65Z"/>
     </Region>
     <Region id="temporal" {...rProps}>
      <path fill="url(#skull-green)" d="M166 282L197 293L215 346L201 438L170 468Q142 431 143 381Q143 325 166 282Z"/>
      <path fill="url(#skull-green)" d="M534 282L503 293L485 346L499 438L530 468Q558 431 557 381Q557 325 534 282Z"/>
     </Region>
     <Region id="zigomatico" {...rProps}>
      <path fill="url(#skull-gold)" d="M205 336Q181 352 170 389L160 430Q171 472 216 494L260 455L270 411L244 381Q218 379 205 336Z"/>
      <path fill="url(#skull-gold)" d="M495 336Q519 352 530 389L540 430Q529 472 484 494L440 455L430 411L456 381Q482 379 495 336Z"/>
     </Region>
     <Region id="maxila" {...rProps}>
      <path fill="url(#skull-maxila)" d="M278 404Q317 411 350 425Q383 411 422 404L464 450L460 536L420 594Q390 614 350 613Q310 614 280 594L240 536L236 450Z"/>
     </Region>
     <Region id="nasal" {...rProps}>
      <path fill="url(#skull-nasal)" d="M326 316L345 304L350 318L355 304L374 316L383 396L354 425L346 425L317 396Z"/>
     </Region>
     <Region id="mandibula-cranio" {...rProps}>
      <path fill="url(#skull-mandibula)" d="M185 489Q183 464 201 457L227 489L237 565Q255 606 291 633L323 646Q350 652 377 646L409 633Q445 606 463 565L473 489L499 457Q517 464 515 489L502 617Q479 690 405 718Q350 739 295 718Q221 690 198 617Z"/>
     </Region>
     <g className={styles.detail} aria-hidden="true">
      <path d="M351 75Q337 196 350 274" strokeWidth="1.5" stroke="#8e70ad" strokeDasharray="4 7" fill="none"/>
      <path d="M195 281Q210 287 233 280M505 281Q490 287 467 280" strokeWidth="2" fill="none" stroke="#8c69ae"/>
      <path d="M310 321L350 303L390 321" fill="none" stroke="#785987" strokeWidth="2.7"/>
      <path d="M210 339Q247 307 296 327Q305 335 306 354Q300 395 270 410Q228 411 202 372Q198 353 210 339Z" className={styles.orbit}/>
      <path d="M490 339Q453 307 404 327Q395 335 394 354Q400 395 430 410Q472 411 498 372Q502 353 490 339Z" className={styles.orbit}/>
      <path d="M339 405L350 371L361 405Q350 416 339 405Z" className={styles.hole}/>
      <path d="M301 446Q331 435 350 447Q369 435 399 446Q417 462 411 497Q387 513 350 510Q313 513 289 497Q283 462 301 446Z" className={styles.nasalHole}/>
      <path d="M250 538Q350 557 450 538" fill="none" stroke="#875f7a" strokeWidth="4"/>
      {teeth.map(i=>{
       const x=263+i*14.8;const d=Math.abs(5.5-i);
       return <g key={i}>
        <rect x={x} y={523+d*2} width="13" height={29-d*1.8} rx="4" fill="#fff9ed" stroke="#987c86" strokeWidth="1.6"/>
        <rect x={x+1} y={557+d*.7} width="12" height={26-d*1.5} rx="4" fill="#fff5e9" stroke="#987c86" strokeWidth="1.3"/>
       </g>;
      })}
      <path d="M216 489Q240 536 246 582M484 489Q460 536 454 582" fill="none" stroke="#a36983" strokeWidth="4"/>
      <path d="M298 668Q350 691 402 668" fill="none" stroke="#b66c8c" strokeWidth="3" opacity=".7"/>
     </g>
     {showNames&&mode==="explorar"&&<g className={styles.visibleLabels} aria-hidden="true">
      <text x="350" y="184" textAnchor="middle">FRONTAL</text>
      <text x="177" y="209" textAnchor="middle">PARIETAL</text>
      <text x="524" y="209" textAnchor="middle">PARIETAL</text>
      <text x="151" y="398" textAnchor="middle">TEMPORAL</text>
      <text x="548" y="398" textAnchor="middle">TEMPORAL</text>
      <text x="212" y="451" textAnchor="middle">ZIGOMÁTICO</text>
      <text x="488" y="451" textAnchor="middle">ZIGOMÁTICO</text>
      <text x="350" y="369" textAnchor="middle">NASAL</text>
      <text x="350" y="477" textAnchor="middle">MAXILA</text>
      <text x="350" y="690" textAnchor="middle">MANDÍBULA</text>
     </g>}
    </g>
    <g aria-hidden="true" className={styles.canvasCaption}><text x="26" y="775">EDUVERSO · ATLAS PREMIUM</text><text x="674" y="775" textAnchor="end">ILUSTRAÇÃO DIDÁTICA</text></g>
   </svg>
  </div>
  <p className={styles.hint}>Toque nas regiões coloridas para estudar. Amplie com +/− ou dois dedos; arraste a imagem ampliada para explorar detalhes.</p>
  {mode==="explorar"&&<div className={styles.quick}><strong>Estruturas disponíveis</strong><div>{spots.map(b=><button type="button" key={b.id} aria-pressed={selectedId===b.id} onClick={()=>onSelect(b)}>{b.name}</button>)}</div></div>}
 </section>;
}
