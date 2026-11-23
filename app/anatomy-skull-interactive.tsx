"use client";
import {useRef,useState,type TouchEvent} from "react";
import type {AtlasSpot} from "./anatomy-atlas-collection-data";
import styles from "./anatomy-skull-interactive.module.css";

type Mode="explorar"|"desafio"|"flashcards";
type Props={
 mode:Mode;spots:AtlasSpot[];selectedId:string|null;targetId:string|null;
 answerId:string|null;disabled:boolean;onSelect:(spot:AtlasSpot)=>void;
 src:string;alt:string;
};

/** Coordenadas percentuais sobre a imagem frontal 900×900 do Anatomography.
 * Os sete pontos foram posicionados manualmente, não por reconhecimento automático.
 * As regiões laterais estão representadas por um ponto em cada osso pareado.
 */
const hotspots:Record<string,{x:number;y:number}>={
 frontal:{x:51,y:24},
 parietal:{x:22,y:27},
 temporal:{x:23,y:45},
 nasal:{x:50,y:52},
 zigomatico:{x:27,y:61},
 maxila:{x:40,y:72},
 "mandibula-cranio":{x:50,y:87},
};
const bound=(n:number)=>Math.max(1,Math.min(2.5,Math.round(n*10)/10));

export default function AnatomySkullInteractive({mode,spots,selectedId,targetId,answerId,disabled,onSelect,src,alt}:Props){
 const [zoom,setZoom]=useState(1);
 const [failed,setFailed]=useState(false);
 const pinch=useRef<{distance:number;zoom:number}|null>(null);
 function startPinch(e:TouchEvent<HTMLDivElement>){
  if(e.touches.length!==2)return;
  const [a,b]=[e.touches[0],e.touches[1]];
  pinch.current={distance:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),zoom};
 }
 function movePinch(e:TouchEvent<HTMLDivElement>){
  if(e.touches.length!==2||!pinch.current||pinch.current.distance<=0)return;
  const [a,b]=[e.touches[0],e.touches[1]];
  setZoom(bound(pinch.current.zoom*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/pinch.current.distance));
 }
 const showCorrect=mode==="desafio"&&answerId!==null;
 return <section className={styles.root} aria-label="Atlas do crânio, vista anterior com sete pontos interativos">
  <div className={styles.heading}>
   <div className={styles.headingText}><small>✦ ANATOMIA INTERATIVA</small><strong>Crânio · Vista anterior</strong></div>
   <div className={styles.controls} role="group" aria-label="Ampliação da imagem">
    <button type="button" aria-label="Diminuir zoom" disabled={zoom===1} onClick={()=>setZoom(n=>bound(n-.5))}>−</button>
    <output aria-live="polite">{Math.round(zoom*100)}%</output>
    <button type="button" aria-label="Aumentar zoom" disabled={zoom===2.5} onClick={()=>setZoom(n=>bound(n+.5))}>+</button>
    <button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Ajustar</button>
   </div>
  </div>
  {failed?<div role="alert" className={styles.fallback}>Não foi possível carregar a imagem anatômica. Tente atualizar a página.</div>:
   <div className={styles.viewport+(zoom>1?" "+styles.zoomed:"")}
     onTouchStart={startPinch} onTouchMove={movePinch} onTouchEnd={e=>{if(e.touches.length<2)pinch.current=null;}}>
    <div className={styles.canvas} style={{width:(zoom*100)+"%"}}>
     <img src={src} alt={alt} onError={()=>setFailed(true)} width={900} height={900} draggable={false}/>
     {spots.map((spot,index)=>{
      const p=hotspots[spot.id];
      if(!p)return null;
      const isFlash=mode==="flashcards";
      if(isFlash&&targetId!==spot.id)return null;
      const selected=mode==="explorar"&&selectedId===spot.id;
      const correct=showCorrect&&targetId===spot.id;
      const wrong=showCorrect&&answerId===spot.id&&answerId!==targetId;
      const inactive=disabled||isFlash;
      const classes=[styles.hotspot,selected?styles.selected:"",correct?styles.correct:"",wrong?styles.wrong:"",isFlash?styles.flash:""].filter(Boolean).join(" ");
      return <button type="button" key={spot.id} className={classes}
       style={{left:p.x+"%",top:p.y+"%"}}
       aria-label={mode==="explorar"?"Explorar "+spot.name:isFlash?"Estrutura destacada":"Região "+(index+1)}
       aria-pressed={selected||(mode==="desafio"&&answerId===spot.id)}
       disabled={inactive}
       title={mode==="explorar"?spot.name:undefined}
       onClick={()=>onSelect(spot)}>
        {isFlash?"?":index+1}
        {selected&&<span className={styles.tip}>{spot.name}</span>}
       </button>;
     })}
    </div>
   </div>}
  <p className={styles.help}>Selecione os pontos sobre os ossos. No Desafio, toque no ponto pedido; nos Flashcards, identifique o ponto amarelo e digite o nome. Use +/− para ampliar.</p>
  {mode==="explorar"&&<div className={styles.legend}><strong>Seleção rápida</strong><div>{spots.map(spot=><button type="button" key={spot.id} aria-pressed={selectedId===spot.id} onClick={()=>onSelect(spot)}>{spot.name}</button>)}</div></div>}
 </section>;
}
