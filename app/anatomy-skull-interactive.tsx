"use client";
import {useRef,useState,type TouchEvent} from "react";
import type {AtlasSpot} from "./anatomy-atlas-collection-data";
import styles from "./anatomy-skull-interactive.module.css";

type Mode="explorar"|"desafio"|"flashcards";
type Props={
 mode:Mode;spots:AtlasSpot[];selectedId:string|null;targetId:string|null;
 answerId:string|null;disabled:boolean;onSelect:(spot:AtlasSpot)=>void;
 src:string;alt:string;heading:string;subject?:string;ratio?:string;imageCrop?:{left:number;top:number;width:number;height:number};
};

/** Cada vista recebe coordenadas próprias de seus AtlasSpot. */
const bound=(n:number)=>Math.max(1,Math.min(2.5,Math.round(n*10)/10));

export default function AnatomySkullInteractive({mode,spots,selectedId,targetId,answerId,disabled,onSelect,src,alt,heading,subject="Crânio",ratio="1 / 1"}:Props){
 const [zoom,setZoom]=useState(1);
 const [failed,setFailed]=useState(false);
 const [challengeLevel,setChallengeLevel]=useState<"normal"|"dificil">("normal");
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
 const isChallenge=mode==="desafio";
 return <section className={styles.root} aria-label={"Atlas interativo de "+subject+": "+heading}>
  <div className={styles.heading}>
   <div className={styles.headingText}><small>✦ ANATOMIA INTERATIVA</small><strong>{subject} · {heading}</strong></div>
   <div className={styles.controls} role="group" aria-label="Ampliação da imagem">
    <button type="button" aria-label="Diminuir zoom" disabled={zoom===1} onClick={()=>setZoom(n=>bound(n-.5))}>−</button>
    <output aria-live="polite">{Math.round(zoom*100)}%</output>
    <button type="button" aria-label="Aumentar zoom" disabled={zoom===2.5} onClick={()=>setZoom(n=>bound(n+.5))}>+</button>
    <button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Ajustar</button>
   </div>
  </div>
  {isChallenge&&<div className={styles.challengeControls} role="group" aria-label="Nível de dificuldade do Desafio">
   <span>Dificuldade</span>
   <button type="button" aria-pressed={challengeLevel==="normal"} onClick={()=>setChallengeLevel("normal")}>Normal · pontos discretos</button>
   <button type="button" aria-pressed={challengeLevel==="dificil"} onClick={()=>setChallengeLevel("dificil")}>Difícil · sem pistas</button>
  </div>}
  {failed?<div role="alert" className={styles.fallback}>Não foi possível carregar a imagem anatômica. Tente atualizar a página.</div>:
   <div className={styles.viewport+(zoom>1?" "+styles.zoomed:"")}
     onTouchStart={startPinch} onTouchMove={movePinch} onTouchEnd={e=>{if(e.touches.length<2)pinch.current=null;}}>
    <div className={styles.canvas} style={{width:(zoom*100)+"%",aspectRatio:ratio.replace(/\s/g,"")}}>
     <img src={src} alt={alt} onError={()=>setFailed(true)} width={900} height={900} draggable={false}/>
     {spots.map((spot,index)=>{
      const p={x:spot.x,y:spot.y};
      const isFlash=mode==="flashcards";
      if(isFlash&&targetId!==spot.id)return null;
      const selected=mode==="explorar"&&selectedId===spot.id;
      const correct=showCorrect&&targetId===spot.id;
      const wrong=showCorrect&&answerId===spot.id&&answerId!==targetId;
      const inactive=disabled||isFlash;
      const classes=[styles.hotspot,selected?styles.selected:"",correct?styles.correct:"",wrong?styles.wrong:"",isFlash?styles.flash:"",isChallenge?(challengeLevel==="normal"?styles.challengeNormal:styles.challengeHard):"",isChallenge&&(correct||wrong)?styles.revealed:""].filter(Boolean).join(" ");
      return <button type="button" key={spot.id} className={classes}
       style={{left:p.x+"%",top:p.y+"%"}}
       aria-label={mode==="explorar"?"Explorar "+spot.name:isFlash?"Estrutura destacada":"Região "+(index+1)}
       aria-pressed={selected||(mode==="desafio"&&answerId===spot.id)}
       disabled={inactive}
       title={mode==="explorar"?spot.name:undefined}
       onClick={()=>onSelect(spot)}>
        {isFlash?"?":mode==="explorar"?index+1:showCorrect?(correct?"✓":wrong?"×":""):""}
        {selected&&<span className={styles.tip}>{spot.name}</span>}
       </button>;
     })}
    </div>
   </div>}
  <p className={styles.help}>{isChallenge?challengeLevel==="dificil"?"Desafio difícil: marque a posição correta diretamente na imagem, sem pontos visíveis. Depois da resposta, os acertos e erros aparecem em cores.":"Desafio normal: os pontos não têm números e ficam discretos. Identifique a estrutura pela posição anatômica.": "Toque nos marcadores desta vista. Nos Flashcards, identifique o ponto amarelo e escreva o nome."} Use +/− para ampliar.</p>
  {mode==="explorar"&&<div className={styles.legend}><strong>Seleção rápida</strong><div>{spots.map(spot=><button type="button" key={spot.id} aria-pressed={selectedId===spot.id} onClick={()=>onSelect(spot)}>{spot.name}</button>)}</div></div>}
 </section>;
}
