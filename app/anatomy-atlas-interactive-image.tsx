"use client";

import {useRef,useState,type TouchEvent} from "react";
import {bones,imageUrl,type Bone} from "./anatomy-atlas-data";
import AnatomySkeletonVector from "./anatomy-atlas-vector";
import styles from "./anatomy-atlas-interactive-image.module.css";

type Mode="explorar"|"desafio"|"flashcards";
type Props={
 mode:Mode;
 selectedId:string|null;
 targetId:string|null;
 answerId:string|null;
 disabled:boolean;
 onSelect:(bone:Bone)=>void;
};
type Area={id:string;polygons:number[][][];label:[number,number]};

/**
 * Initial hit-map for the exact uploaded 1086×1448 illustration.
 * A coordinate maps to a visual region, not an automatically inferred bone boundary.
 * Independently test and clinically review polygons before using as a reference-grade atlas.
 */
const areas:Area[]=[
 {id:"cranio",label:[532,88],polygons:[[[480,23],[510,17],[551,18],[584,39],[601,67],[602,112],[585,148],[563,151],[525,153],[483,142],[458,109],[458,64]]]},
 {id:"mandibula",label:[538,165],polygons:[[[477,136],[493,142],[495,165],[509,176],[551,180],[573,168],[583,144],[594,138],[589,176],[563,195],[515,199],[487,181]]]},
 {id:"clavicula",label:[441,264],polygons:[[[381,257],[397,251],[424,251],[476,269],[514,276],[518,286],[490,287],[449,272],[411,271],[388,280]],[[569,277],[614,268],[660,252],[679,256],[675,280],[638,272],[589,289],[570,287]]]},
 {id:"costelas",label:[440,385],polygons:[[[477,274],[444,270],[416,282],[397,322],[397,373],[402,440],[422,493],[438,524],[457,531],[494,496],[508,451],[514,310]],[[610,275],[641,275],[661,308],[667,369],[665,425],[649,478],[626,525],[610,527],[574,485],[560,444],[559,315]]]},
 {id:"coluna",label:[532,523],polygons:[[[506,193],[548,194],[556,267],[508,265]],[[510,435],[551,436],[557,628],[551,681],[532,696],[511,680],[497,627]]]},
 {id:"umero",label:[371,387],polygons:[[[361,276],[382,275],[409,294],[408,348],[377,486],[366,512],[337,508],[348,479],[348,322]],[[666,286],[695,275],[711,297],[738,478],[743,507],[710,514],[689,494],[665,345]]]},
 {id:"radio",label:[303,573],polygons:[[[333,506],[350,517],[335,578],[311,653],[291,681],[254,674],[262,646],[292,555]],[[734,512],[756,506],[789,568],[810,644],[809,674],[782,683],[761,647],[732,571]]]},
 {id:"pelve",label:[437,628],polygons:[[[433,571],[479,573],[498,592],[493,643],[473,655],[475,689],[496,719],[514,730],[513,752],[481,759],[453,740],[429,701],[406,645],[396,619],[404,584]],[[650,571],[604,573],[587,592],[592,642],[614,655],[611,689],[589,720],[572,731],[571,752],[607,758],[635,740],[656,703],[674,645],[680,618],[673,583]],[[498,699],[528,689],[558,698],[579,735],[558,752],[528,749],[503,750]]]},
 {id:"femur",label:[444,817],polygons:[[[413,676],[443,675],[465,698],[470,762],[480,914],[481,941],[457,960],[422,954],[423,913],[400,732],[389,704]],[[642,674],[611,674],[598,696],[593,762],[585,914],[583,941],[609,958],[637,953],[638,911],[660,736],[672,707]]]},
 {id:"tibia",label:[451,1100],polygons:[[[425,991],[472,990],[478,1010],[465,1134],[475,1247],[461,1263],[437,1261],[436,1241],[420,1136]],[[582,990],[632,990],[640,1011],[631,1134],[641,1247],[624,1263],[601,1261],[603,1240],[581,1135]]]},
 {id:"esterno",label:[534,342],polygons:[[[512,278],[545,276],[559,290],[555,414],[543,436],[529,439],[511,412]]]},
 {id:"patela",label:[453,963],polygons:[[[443,932],[459,931],[477,947],[481,972],[468,989],[442,991],[425,977],[425,952]],[[612,932],[599,931],[581,946],[578,970],[592,991],[620,992],[637,972],[632,949]]]}
];

function clampZoom(value:number){return Math.round(Math.min(3,Math.max(1,value))*10)/10;}
export default function AnatomySkeletonInteractiveImage({mode,selectedId,targetId,answerId,disabled,onSelect}:Props){
 const [zoom,setZoom]=useState(1);
 const [showAreas,setShowAreas]=useState(false);
 const [imageFailed,setImageFailed]=useState(false);
 const [showGuide,setShowGuide]=useState(false);
 const pinch=useRef<{distance:number;zoom:number}|null>(null);
 const chosen=mode==="flashcards"?targetId:mode==="explorar"?selectedId:answerId;
 const revealCorrect=mode==="desafio"&&answerId!==null?targetId:null;

 function startPinch(event:TouchEvent<HTMLDivElement>){
  if(event.touches.length!==2)return;
  const a=event.touches[0],b=event.touches[1];
  pinch.current={distance:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),zoom};
 }
 function movePinch(event:TouchEvent<HTMLDivElement>){
  if(event.touches.length!==2||!pinch.current)return;
  const a=event.touches[0],b=event.touches[1];
  const length=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
  if(pinch.current.distance>0)setZoom(clampZoom(pinch.current.zoom*length/pinch.current.distance));
 }
 if(imageFailed)return <div className={styles.fallback}><p role="alert">A imagem enviada não pôde ser carregada. Exibindo o desenho vetorial de reserva.</p><AnatomySkeletonVector mode={mode} selectedId={selectedId} targetId={targetId} answerId={answerId} disabled={disabled} onSelect={onSelect}/></div>;
 return <section className={styles.root} aria-label="Esqueleto humano colorido, vista anterior, com regiões interativas">
  <div className={styles.topbar}>
   <span>✦ EDUVERSO · ANATOMIA INTERATIVA</span>
   <div className={styles.zoomButtons} role="group" aria-label="Ampliar ou reduzir o atlas">
    <button type="button" aria-label="Diminuir" disabled={zoom<=1} onClick={()=>setZoom(z=>clampZoom(z-.5))}>−</button>
    <output aria-label="Ampliação atual">{Math.round(zoom*100)}%</output>
    <button type="button" aria-label="Ampliar" disabled={zoom>=3} onClick={()=>setZoom(z=>clampZoom(z+.5))}>+</button>
    <button type="button" disabled={zoom===1} onClick={()=>setZoom(1)}>Ajustar</button>
   </div>
  </div>
  <div className={styles.actions}>
   <button type="button" disabled={mode!=="explorar"} aria-pressed={showAreas&&mode==="explorar"} onClick={()=>setShowAreas(s=>!s)}>{showAreas?"◉ Ocultar regiões":"◎ Mostrar áreas clicáveis"}</button>
   <button type="button" aria-expanded={showGuide} onClick={()=>setShowGuide(s=>!s)}>{showGuide?"− Ocultar instruções":"+ Como interagir"}</button>
  </div>
  {showGuide&&<p className={styles.guide}>Toque na própria estrutura óssea. Em Explorar, ela abre a explicação. Em Desafio, sua escolha é comparada com a resposta esperada; verde significa acerto e rosa indica outra região. Em Flashcards, o destaque amarelo indica a estrutura para você nomear. Este primeiro mapa de áreas é aproximado e está em validação.</p>}
  <div className={styles.viewport+(zoom>1?" "+styles.zoomed:"")} onTouchStart={startPinch} onTouchMove={movePinch} onTouchEnd={event=>{if(event.touches.length<2)pinch.current=null;}}>
   <div className={styles.canvas} style={{width:zoom*100+"%"}}>
    <img src={imageUrl} alt="Ilustração didática colorida de esqueleto humano em vista anterior" onError={()=>setImageFailed(true)} draggable={false}/>
    <svg className={styles.overlay} viewBox="0 0 1086 1448" role="group" aria-label="Doze áreas anatômicas selecionáveis" xmlns="http://www.w3.org/2000/svg">
     {areas.map((area,index)=>{
      const bone=bones.find(item=>item.id===area.id)!;
      const locked=disabled||mode==="flashcards";
      const correct=area.id===revealCorrect;
      const wrong=mode==="desafio"&&area.id===answerId&&answerId!==targetId;
      const highlight=area.id===chosen;
      const classes=[styles.area,showAreas&&mode==="explorar"?styles.outlined:"",correct?styles.correct:wrong?styles.incorrect:highlight?(mode==="flashcards"?styles.flash:styles.active):"",locked?styles.locked:""].filter(Boolean).join(" ");
      function pick(){if(!locked)onSelect(bone);}
      return <g key={area.id} role={mode==="flashcards"?"img":"button"} tabIndex={locked?-1:0} className={classes}
       aria-label={mode==="explorar"?bone.name:mode==="desafio"?"Região "+(index+1):"Região destacada"}
       onClick={pick} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();pick();}}}>
        <title>{mode==="explorar"?bone.name:mode==="desafio"?"Região "+(index+1):"Região em destaque"}</title>
        {area.polygons.map((points,i)=><polygon key={i} points={points.map(pair=>pair.join(",")).join(" ")}/>)}
       </g>;
     })}
     {showAreas&&mode==="explorar"&&areas.map((area,index)=><text key={area.id} className={styles.areaNumber} x={area.label[0]} y={area.label[1]} textAnchor="middle" aria-hidden="true">{index+1}</text>)}
    </svg>
   </div>
  </div>
  <p className={styles.hint}>Toque nos ossos para identificar as estruturas. Use +/− para ampliar; com zoom, deslize a imagem para explorar áreas menores.</p>
  {mode==="explorar"&&<div className={styles.quickList}><strong>Selecionar por nome</strong><div>{bones.map(b=><button key={b.id} type="button" aria-pressed={selectedId===b.id} onClick={()=>onSelect(b)}>{b.name}</button>)}</div></div>}
 </section>;
}
