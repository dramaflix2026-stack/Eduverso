"use client";
import {useRef,useState,type ReactNode,type TouchEvent} from "react";
import {bones,type Bone} from "./anatomy-atlas-data";
import styles from "./anatomy-atlas-vector.module.css";
type Mode="explorar"|"desafio"|"flashcards";
type Props={mode:Mode;selectedId:string|null;targetId:string|null;answerId:string|null;disabled:boolean;onSelect:(bone:Bone)=>void};
type RegionProps=Props&{id:string;showNames:boolean;children:ReactNode};
type Geometry={id:string;paths:string[]};
const geometry:Geometry[]=[{"id":"cranio","paths":["M300 67C264 66 246 94 249 132C249 150 259 160 267 169L278 178H322L333 169C342 154 351 139 351 122C351 89 333 67 300 67Z"]},{"id":"mandibula","paths":["M261 158L270 190Q281 203 300 203Q319 203 330 190L339 158L325 177Q301 190 275 177Z"]},{"id":"clavicula","paths":["M291 222Q269 210 249 216Q225 219 198 237L204 249Q239 240 258 229Q280 232 291 232Z","M309 222Q331 210 351 216Q375 219 402 237L396 249Q361 240 342 229Q320 232 309 232Z"]},{"id":"costelas","paths":["M290 249Q260 244 217 259Q205 278 225 293","M310 249Q340 244 383 259Q395 278 375 293","M290 267Q260 262 215.6 277Q205 291 227 309","M310 267Q340 262 384.4 277Q395 291 373 309","M290 285Q260 280 214.2 295Q205 304 229 325","M310 285Q340 280 385.8 295Q395 304 371 325","M290 303Q260 298 212.8 313Q205 317 231 341","M310 303Q340 298 387.2 313Q395 317 369 341","M290 321Q260 316 211.4 331Q205 330 233 357","M310 321Q340 316 388.6 331Q395 330 367 357","M290 339Q260 334 210 349Q205 343 235 373","M310 339Q340 334 390 349Q395 343 365 373","M290 357Q260 352 208.6 367Q205 356 237 389","M310 357Q340 352 391.4 367Q395 356 363 389"]},{"id":"coluna","paths":["M292 211h16v12h-16Z","M292 225.5h16v12h-16Z","M292 240h16v12h-16Z","M292 254.5h16v12h-16Z","M292 269h16v12h-16Z","M292 283.5h16v12h-16Z","M292 298h16v12h-16Z","M292 312.5h16v12h-16Z","M292 327h16v12h-16Z","M292 341.5h16v12h-16Z","M292 356h16v12h-16Z","M292 370.5h16v12h-16Z","M291.25 385h17.5v12h-17.5Z","M290.5 399.5h19v12h-19Z","M289.75 414h20.5v12h-20.5Z","M289 428.5h22v12h-22Z","M288.25 443h23.5v12h-23.5Z","M287.5 457.5h25v12h-25Z","M286.75 472h26.5v12h-26.5Z"]},{"id":"esterno","paths":["M290 239Q300 233 310 239L315 269L310 340L300 354L290 340L285 269Z"]},{"id":"umero","paths":["M195 243Q184 237 176 250L164 290L143 415Q142 434 151 439Q162 443 171 426L205 278Q214 252 195 243Z","M405 243Q416 237 424 250L436 290L457 415Q458 434 449 439Q438 443 429 426L395 278Q386 252 405 243Z"]},{"id":"radio","paths":["M151 450Q143 452 140 464L116 592Q112 615 120 625L134 628Q139 619 139 603L168 468Q166 454 151 450Z","M449 450Q457 452 460 464L484 592Q488 615 480 625L466 628Q461 619 461 603L432 468Q434 454 449 450Z"]},{"id":"pelve","paths":["M278 471Q246 458 224 470Q210 485 214 511Q219 545 257 580L281 570L289 546L275 528L252 528Q246 508 272 499Z","M322 471Q354 458 376 470Q390 485 386 511Q381 545 343 580L319 570L311 546L325 528L348 528Q354 508 328 499Z","M282 486Q300 476 318 486L314 556L300 576L286 556Z"]},{"id":"femur","paths":["M255 581Q233 583 232 607L244 771L237 818Q243 838 255 833L270 789L278 609Q280 587 255 581Z","M345 581Q367 583 368 607L356 771L363 818Q357 838 345 833L330 789L322 609Q320 587 345 581Z"]},{"id":"patela","paths":["M249 817Q233 824 236 844Q239 861 252 863Q266 859 267 842Q267 823 249 817Z","M351 817Q367 824 364 844Q361 861 348 863Q334 859 333 842Q333 823 351 817Z"]},{"id":"tibia","paths":["M240 865Q227 869 230 894L229 1058Q225 1074 236 1085L249 1078L252 1055L263 897Q266 869 255 865Z","M360 865Q373 869 370 894L371 1058Q375 1074 364 1085L351 1078L348 1055L337 897Q334 869 345 865Z"]}];
const labels:{id:string;x:number;y:number;text:string}[]=[{"id":"cranio","x":300,"y":94,"text":"Crânio"},{"id":"mandibula","x":300,"y":188,"text":"Mandíbula"},{"id":"clavicula","x":236,"y":226,"text":"Clavícula"},{"id":"costelas","x":372,"y":345,"text":"Costelas"},{"id":"esterno","x":300,"y":288,"text":"Esterno"},{"id":"coluna","x":300,"y":423,"text":"Coluna"},{"id":"umero","x":174,"y":330,"text":"Úmero"},{"id":"radio","x":135,"y":535,"text":"Rádio"},{"id":"pelve","x":300,"y":505,"text":"Pelve"},{"id":"femur","x":250,"y":686,"text":"Fêmur"},{"id":"patela","x":251,"y":843,"text":"Patela"},{"id":"tibia","x":245,"y":965,"text":"Tíbia"}];
function Region({id,mode,selectedId,targetId,answerId,disabled,onSelect,showNames,children}:RegionProps){
 const bone=bones.find(b=>b.id===id)!;
 const number=bones.findIndex(b=>b.id===id)+1;
 const highlight=mode==="flashcards"?targetId:mode==="explorar"?selectedId:answerId;
 const correct=mode==="desafio"&&answerId!==null?targetId:highlight;
 const classes=[styles.region];
 if(id===correct)classes.push(mode==="desafio"?styles.correct:mode==="flashcards"?styles.flash:styles.active);
 if(mode==="desafio"&&id===answerId&&id!==targetId)classes.push(styles.incorrect);
 if(correct&&correct!==id)classes.push(styles.dim);
 if(disabled||mode==="flashcards")classes.push(styles.disabledRegion);
 const select=()=>{if(!disabled&&mode!=="flashcards")onSelect(bone);};
 return <g className={classes.join(" ")} role={mode==="flashcards"?"img":"button"} tabIndex={disabled||mode==="flashcards"?-1:0}
  aria-label={mode==="desafio"?"Região anatômica "+number:mode==="flashcards"?"Região destacada":bone.name}
  onClick={select} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();select();}}}>
  {showNames&&mode==="explorar"&&<title>{bone.name}</title>}{children}
 </g>;
}
export default function AnatomySkeletonVector({mode,selectedId,targetId,answerId,disabled,onSelect}:Props){
 const [zoom,setZoom]=useState(1);
 const [showNames,setShowNames]=useState(false);
 const [info,setInfo]=useState(false);
 const pinch=useRef<{distance:number;zoom:number}|null>(null);
 const zoomTo=(value:number)=>setZoom(Math.min(3,Math.max(1,Math.round(value*10)/10)));
 function startPinch(event:TouchEvent<HTMLDivElement>){if(event.touches.length===2){const a=event.touches[0],b=event.touches[1];pinch.current={distance:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),zoom};}}
 function movePinch(event:TouchEvent<HTMLDivElement>){if(event.touches.length===2&&pinch.current){const a=event.touches[0],b=event.touches[1];if(pinch.current.distance>0)zoomTo(pinch.current.zoom*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/pinch.current.distance);}}
 const regionProps={mode,selectedId,targetId,answerId,disabled,onSelect,showNames};
 return <section className={styles.root} aria-label="Modelo vetorial interativo do esqueleto humano, vista anterior">
  <div className={styles.toolbar}><span>✦ ATLAS ANATÔMICO · VISTA ANTERIOR</span><div className={styles.controls} role="group" aria-label="Zoom do esqueleto">
   <button type="button" aria-label="Diminuir zoom" disabled={zoom<=1} onClick={()=>zoomTo(zoom-.4)}>−</button><output>{Math.round(zoom*100)}%</output>
   <button type="button" aria-label="Aumentar zoom" disabled={zoom>=3} onClick={()=>zoomTo(zoom+.4)}>+</button><button type="button" disabled={zoom===1} onClick={()=>zoomTo(1)}>Ajustar</button>
  </div></div>
  <div className={styles.toolbarSecondary}><button type="button" disabled={mode!=="explorar"} aria-pressed={showNames} onClick={()=>setShowNames(v=>!v)}>{showNames?"◉ Nomes visíveis":"◎ Mostrar nomes"}</button>
   <button type="button" aria-expanded={info} onClick={()=>setInfo(v=>!v)}>{info?"− Ocultar informações":"+ Sobre esta arte"}</button>
  </div>
  {info&&<p className={styles.disclaimer}>Ilustração vetorial original, didática e esquemática: proporções e agrupamentos simplificados. As regiões podem ser tocadas, sem marcadores sobrepostos. Para estudo detalhado, consulte também a <a href="https://commons.wikimedia.org/wiki/File:Human_skeleton_front_no-text_no-color.svg" target="_blank" rel="noopener noreferrer">ilustração anatômica de referência</a>.</p>}
  <div className={styles.viewport+(zoom>1?" "+styles.zoomed:"")} onTouchStart={startPinch} onTouchMove={movePinch} onTouchEnd={e=>{if(e.touches.length<2)pinch.current=null;}}>
   <svg className={styles.figure} style={{width:zoom*100+"%"}} viewBox="0 0 600 1160" role="group" aria-label="Esqueleto frontal esquemático com doze regiões selecionáveis" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="eduverso-bone-fill" x1="0" y1="0" x2=".6" y2="1"><stop stopColor="#fff9e9"/><stop offset="56%" stopColor="#e6d6ba"/><stop offset="100%" stopColor="#c3b39b"/></linearGradient>
     <radialGradient id="eduverso-skeleton-glow"><stop stopColor="#b098fa" stopOpacity=".24"/><stop offset="100%" stopColor="#b098fa" stopOpacity="0"/></radialGradient>
     <pattern id="eduverso-skeleton-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#d8c5ff" strokeOpacity=".07"/></pattern>
    </defs>
    <rect width="600" height="1160" rx="24" fill="#171426"/><rect width="600" height="1160" rx="24" fill="url(#eduverso-skeleton-grid)"/>
    <ellipse cx="300" cy="550" rx="270" ry="525" fill="url(#eduverso-skeleton-glow)"/>
    <g className={styles.orbits}><ellipse cx="300" cy="554" rx="223" ry="505"/><path d="M300 20V1120M70 580H530" strokeDasharray="6 11"/></g>
    <text x="28" y="48" className={styles.label}>EDUVERSO · OSTEOLOGIA</text><text x="28" y="1136" className={styles.bottom}>VISTA ANTERIOR / FRONTAL</text>
    <text x="570" y="1136" textAnchor="end" className={styles.bottom}>DESENHO DIDÁTICO</text>
    <g className={styles.context}><path d="M278 161L272 201M322 161L328 201" strokeWidth="7" fill="none"/>
     <path d="M225 218L195 256L211 300L259 254ZM375 218L405 256L389 300L341 254Z"/>
     <path d="M165 451L151 614M435 451L449 614M226 876L219 1058M374 876L381 1058" fill="none" strokeWidth="11" strokeLinecap="round"/>
     <path d="M129 628L121 676M135 629L148 680M141 629L159 670M471 628L479 676M465 629L452 680M459 629L441 670" fill="none" strokeWidth="6" strokeLinecap="round"/>
     <path d="M238 1083L207 1113L188 1117M362 1083L393 1113L412 1117" fill="none" strokeWidth="11" strokeLinecap="round"/>
     {[0,1,2,3].map(i=><g key={i} fill="none" strokeWidth="4.5" strokeLinecap="round"><path d={"M"+(120-i*3)+" "+(649+i*5)+"l"+(-13-i*4)+" 22"}/><path d={"M"+(480+i*3)+" "+(649+i*5)+"l"+(13+i*4)+" 22"}/><path d={"M"+(216-i*9)+" 1108l-14 "+(13+i)}/><path d={"M"+(384+i*9)+" 1108l14 "+(13+i)}/></g>)}
    </g>
    {geometry.map(region=><Region key={region.id} id={region.id} {...regionProps}>{region.paths.map((d,i)=><path key={i} d={d} fill={region.id==="costelas"?"none":undefined} strokeWidth={region.id==="costelas"?12:undefined}/>)}</Region>)}
    <path className={styles.hole} d="M264 113Q279 104 291 114Q289 135 276 138Q263 137 264 113ZM309 114Q320 104 336 113Q336 137 323 138Q310 135 309 114Z"/>
    <path className={styles.hole} d="M243 519Q250 525 257 539L271 555L257 564Q238 546 232 529ZM357 519Q350 525 343 539L329 555L343 564Q362 546 368 529Z"/>
    {showNames&&mode==="explorar"&&<g className={styles.nameLabels} aria-hidden="true">{labels.map(item=><text key={item.id} x={item.x} y={item.y} textAnchor="middle">{item.text}</text>)}</g>}
    {mode==="flashcards"&&<text x="300" y="1104" textAnchor="middle" className={styles.flashPrompt}>IDENTIFIQUE A REGIÃO DESTACADA</text>}
   </svg>
  </div>
  <p className={styles.hint}>Toque diretamente em um osso para selecioná-lo. Amplie com dois dedos ou +/− e arraste a imagem quando estiver ampliada. O desenho é esquemático.</p>
  {mode==="explorar"&&<div className={styles.quickList}><strong>Seleção rápida das estruturas</strong><div>{bones.map(b=><button type="button" key={b.id} aria-pressed={selectedId===b.id} onClick={()=>onSelect(b)}>{b.name}</button>)}</div></div>}
 </section>;
}
