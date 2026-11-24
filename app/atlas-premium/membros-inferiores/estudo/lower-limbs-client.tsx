"use client";
import Link from "next/link";
import {useState} from "react";
import styles from "../../atlas.module.css";

type Scene="anterior"|"posterior"|"lateral"|"pe";
type StructureId="pelve"|"femur"|"patela"|"tibia"|"fibula"|"pe";
type Point={id:StructureId;x:number;y:number};
const scenes:{id:Scene;name:string;description:string;points:Point[]}[]=[
 {id:"anterior",name:"Esquema anterior",description:"Vista frontal simplificada do esqueleto dos membros inferiores.",points:[{id:"pelve",x:50,y:19},{id:"femur",x:39,y:42},{id:"patela",x:41,y:57},{id:"tibia",x:40,y:71},{id:"fibula",x:32,y:77},{id:"pe",x:38,y:92}]},
 {id:"posterior",name:"Esquema posterior",description:"Vista posterior esquemática, destacando os ossos longos das pernas.",points:[{id:"pelve",x:50,y:18},{id:"femur",x:39,y:40},{id:"tibia",x:40,y:72},{id:"fibula",x:32,y:77},{id:"pe",x:38,y:91}]},
 {id:"lateral",name:"Esquema lateral",description:"Representação lateral simplificada de um membro inferior.",points:[{id:"pelve",x:50,y:18},{id:"femur",x:51,y:42},{id:"patela",x:60,y:57},{id:"tibia",x:51,y:71},{id:"fibula",x:46,y:79},{id:"pe",x:57,y:93}]},
 {id:"pe",name:"Detalhe do pé",description:"Mapa esquemático do pé, com destaque para tarso, metatarso e falanges.",points:[{id:"pe",x:50,y:57}]}
];
const structures:{id:StructureId;name:string;label:string;summary:string;detail:string}[]=[
 {id:"pelve",name:"Cintura pélvica",label:"Ossos do quadril",summary:"Os ossos do quadril conectam os membros inferiores ao esqueleto axial.",detail:"Cada osso do quadril é formado pela fusão do ílio, do ísquio e do púbis. O acetábulo recebe a cabeça do fêmur, formando a articulação do quadril. A pelve também envolve o sacro, que pertence ao esqueleto axial."},
 {id:"femur",name:"Fêmur",label:"Coxa",summary:"Maior osso do corpo humano; transmite forças entre o quadril e o joelho.",detail:"A cabeça e o colo femorais situam-se proximalmente. Distalmente, os côndilos femorais participam da articulação do joelho com a tíbia e a patela."},
 {id:"patela",name:"Patela",label:"Região anterior do joelho",summary:"Osso sesamoide situado no tendão do músculo quadríceps femoral.",detail:"A patela articula-se com a tróclea femoral e aumenta o braço de alavanca do mecanismo extensor do joelho. Não é visível diretamente em uma vista posterior do esqueleto."},
 {id:"tibia",name:"Tíbia",label:"Perna medial",summary:"Principal osso de sustentação de peso da perna.",detail:"A tíbia articula-se proximalmente com o fêmur e a fíbula e distalmente com o tálus, formando parte da articulação do tornozelo. O maléolo medial é sua projeção distal."},
 {id:"fibula",name:"Fíbula",label:"Perna lateral",summary:"Osso mais delgado, situado lateralmente à tíbia na posição anatômica.",detail:"A fíbula contribui para a estabilidade do tornozelo e oferece inserção muscular. Sua extremidade distal forma o maléolo lateral; transmite muito menos carga axial do que a tíbia."},
 {id:"pe",name:"Ossos do pé",label:"Tarso, metatarso e falanges",summary:"Os ossos do pé formam uma estrutura articulada de apoio e propulsão.",detail:"O tarso normalmente possui sete ossos, incluindo tálus e calcâneo; há cinco metatarsais e quatorze falanges. O hálux possui duas falanges, enquanto os demais dedos geralmente possuem três."}
];
const questions=[
 {q:"Qual osso suporta a maior parte do peso transmitido pela perna?",options:["Fíbula","Patela","Tíbia","Navicular"],correct:2,explain:"A tíbia é o principal osso de suporte de carga da perna."},
 {q:"Qual estrutura recebe a cabeça do fêmur?",options:["Acetábulo","Forame obturado","Incisura isquiática","Maléolo medial"],correct:0,explain:"A cabeça femoral articula-se com o acetábulo do osso do quadril."},
 {q:"A patela é classificada como qual tipo de osso?",options:["Plano","Sesamoide","Pneumático","Irregular"],correct:1,explain:"A patela é um osso sesamoide desenvolvido no tendão do quadríceps."},
 {q:"Qual osso forma o maléolo lateral?",options:["Fêmur","Tíbia","Tálus","Fíbula"],correct:3,explain:"A extremidade distal da fíbula forma o maléolo lateral."},
 {q:"Quantos ossos há normalmente no tarso de um pé?",options:["5","7","8","14"],correct:1,explain:"O tarso é constituído habitualmente por sete ossos."},
 {q:"Quantas falanges há normalmente no hálux?",options:["2","3","4","5"],correct:0,explain:"O hálux tem duas falanges, proximal e distal."}
];
function BoneDiagram({scene}:{scene:Scene}){
 const bilateral=scene==="anterior"||scene==="posterior";
 const showPatella=scene==="anterior";
 return <svg viewBox="0 0 600 820" preserveAspectRatio="xMidYMid meet" className={styles.lowerDiagramSvg} role="img" aria-label={"Ilustração vetorial esquemática: "+scene}>
  <defs>
   <radialGradient id="lower-bg"><stop stopColor="#4a1e80"/><stop offset="1" stopColor="#130824"/></radialGradient>
   <linearGradient id="lower-bone" x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#fff0d2"/><stop offset=".45" stopColor="#c9985f"/><stop offset="1" stopColor="#f6d5a6"/></linearGradient>
  </defs>
  <rect width="600" height="820" fill="url(#lower-bg)"/>
  {scene==="pe"?<g stroke="#8a5d3f" strokeWidth="3" fill="url(#lower-bone)" strokeLinejoin="round">
    <path d="M216 633 C178 595 182 542 199 487 C220 453 273 460 294 488 L335 530 L363 588 Q323 650 265 667Z"/>
    <ellipse cx="282" cy="473" rx="68" ry="60"/>
    <path d="M237 446 L194 335 L222 285 L263 414 Z"/><path d="M271 426 L268 308 L298 282 L310 428Z"/><path d="M318 435 L345 307 L372 327 L357 466Z"/>
    {[-2,-1,0,1,2].map((i)=><g key={i} transform={"translate("+(302+i*42)+" 0) rotate("+(i*10)+" 302 440)"}>
     <path d="M-11 280 Q-17 208 -8 145 L8 145 Q18 205 12 280Z" transform="translate(-302 0)"/>
     <rect x="-11" y="98" width="22" height="42" rx="10" transform="translate(-302 0)"/>
     <rect x="-10" y="67" width="20" height="27" rx="9" transform="translate(-302 0)"/>
    </g>)}
   </g>:<g fill="url(#lower-bone)" stroke="#956b4b" strokeWidth="3" strokeLinejoin="round">
   <path d="M223 77 C194 76 175 99 175 128 L181 205 C202 237 230 219 245 208 L270 246 Q300 261 330 246 L355 208 C371 219 400 237 419 205 L424 128 C424 100 407 76 376 77 L340 113 Q300 127 259 113 Z"/>
   <path d="M275 150 Q302 130 326 150 L323 207 Q300 232 277 207 Z"/>
   <ellipse cx="220" cy="190" rx="28" ry="17" fill="#2b1646"/><ellipse cx="380" cy="190" rx="28" ry="17" fill="#2b1646"/>
   {bilateral?([-1,1] as const).map(side=><g key={side} transform={side===-1?"":"translate(600 0) scale(-1 1)"}>
    <path d="M235 231 Q205 248 209 283 L224 429 Q224 451 240 469 L267 468 Q281 448 267 425 L264 277 Q273 248 253 233Z"/>
    <circle cx="239" cy="464" r="30"/>
    <path d="M217 488 Q224 473 244 480 L256 670 Q252 694 237 697 Q220 693 218 670Z"/>
    <path d="M270 485 Q263 493 262 516 L266 689 Q279 697 286 683 L282 506Z"/>
    {showPatella&&<ellipse cx="240" cy="483" rx="23" ry="26" fill="#eee1bf"/>}
    <path d="M220 694 Q240 714 267 703 L284 727 L282 756 Q254 779 204 772 L193 744 Z"/>
    <path d="M204 751 Q183 749 166 757 L162 773 Q186 791 224 781 Z"/>
   </g>):<g>
    <path d="M305 235 Q280 247 286 285 L302 434 Q304 456 327 477 L348 463 L331 421 L334 289 Q344 255 324 236Z"/>
    <ellipse cx="325" cy="466" rx="27" ry="27"/>
    <path d="M306 488 Q310 473 333 482 L343 680 L324 700 L309 681Z"/>
    <path d="M352 484 Q344 500 347 521 L353 680 L368 678 L361 502Z"/>
    <ellipse cx="340" cy="484" rx="19" ry="25"/>
    <path d="M311 686 L349 699 L380 724 L382 762 Q342 780 282 767 L280 750 Q289 722 311 686Z"/>
   </g>}
   </g>}
  <text x="300" y="800" fill="#e4d5fa" fontSize="13" fontFamily="Arial" textAnchor="middle">ESQUEMA DIDÁTICO · NÃO REPRESENTA MEDIDAS REAIS</text>
 </svg>
}
export default function LowerLimbsClient(){
 const [scene,setScene]=useState<Scene>("anterior");
 const [selected,setSelected]=useState<StructureId>("pelve");
 const [zoom,setZoom]=useState(1);
 const [question,setQuestion]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const current=scenes.find(item=>item.id===scene)!;
 const selection=structures.find(item=>item.id===selected)!;
 const quiz=questions[question];
 const changeScene=(next:Scene)=>{setScene(next);setSelected(scenes.find(s=>s.id===next)!.points[0].id);setZoom(1)};
 return <main className={styles.root}><div className={styles.wrap}>
  <header className={styles.header}><Link href="/atlas-premium/sistema/esqueletico" className={styles.back}>← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>Prévia ilustrativa</span></header>
  <section className={styles.labPage}>
   <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Membros inferiores</span></nav>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · PRÉVIA INTERATIVA</span><h1>Membros inferiores</h1><p>Identifique os principais ossos do quadril, da coxa, da perna e do pé. Enquanto as imagens anatômicas HD não são disponibilizadas, esta prévia utiliza esquemas vetoriais simplificados com marcadores interativos.</p></div><span className={styles.chip}>Esquemas provisórios</span></div>
   <div className={styles.labGrid}>
    <section className={styles.viewer} aria-label="Explorador dos membros inferiores">
     <div className={styles.tabs} role="group" aria-label="Selecionar esquema">{scenes.map(s=><button key={s.id} type="button" onClick={()=>changeScene(s.id)} aria-pressed={scene===s.id} className={scene===s.id?styles.tabActive:""}>{s.name}</button>)}</div>
     <div className={styles.visualFrame}><div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}><div className={styles.lowerDiagramStage}><BoneDiagram scene={scene}/><div className={styles.pins} role="group" aria-label="Selecionar estrutura no esquema">{current.points.map((p,i)=><button key={p.id} type="button" onClick={()=>setSelected(p.id)} title={structures.find(x=>x.id===p.id)!.name} aria-label={"Selecionar "+structures.find(x=>x.id===p.id)!.name} aria-pressed={selected===p.id} style={{left:p.x+"%",top:p.y+"%"}} className={styles.pin+" "+styles.spinePin+(selected===p.id?" "+styles.pinActive:"")}>{i+1}</button>)}</div></div></div></div>
     <div className={styles.spineSelectedCallout} role="status"><span className={styles.spineSelectedNumber}>{current.points.findIndex(p=>p.id===selected)+1}</span><div><strong>{selection.name} · {selection.label}</strong><p>{selection.summary}</p></div></div>
     <div className={styles.zoomControls} role="group" aria-label="Controles de zoom"><button type="button" aria-label="Reduzir zoom" disabled={zoom<=1} onClick={()=>setZoom(v=>Math.max(1,Math.round((v-.25)*100)/100))}>−</button><span>{Math.round(zoom*100)}%</span><button type="button" aria-label="Aumentar zoom" disabled={zoom>=2.5} onClick={()=>setZoom(v=>Math.min(2.5,Math.round((v+.25)*100)/100))}>+</button><button type="button" disabled={zoom===1} onClick={()=>setZoom(1)}>Redefinir</button></div>
     <p className={styles.diagramNote}>{current.description} Pontos aproximados; a anatomia e as proporções destes esquemas não são indicadas para avaliações clínicas ou identificação precisa de marcos.</p>
    </section>
    <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span><h3>{selection.name}</h3><p>{selection.label}</p><p>{selection.summary}</p><div className={styles.divider}/><p>{selection.detail}</p><div className={styles.divider}/><span className={styles.eyebrow}>OUTRAS ESTRUTURAS</span><div className={styles.spineRegions} role="group" aria-label="Selecionar estrutura pelo nome">{structures.map(s=><button key={s.id} type="button" aria-pressed={selected===s.id} className={selected===s.id?styles.regionSelected:""} onClick={()=>{const available=current.points.some(p=>p.id===s.id);if(!available){const next=scenes.find(scene=>scene.points.some(p=>p.id===s.id));if(next){setScene(next.id);setZoom(1)}}setSelected(s.id)}}>{s.name}</button>)}</div><span className={styles.muted}>Prévia didática. As futuras imagens anatômicas e os pontos correspondentes exigem validação técnica antes do lançamento.</span></aside>
   </div>
   <section className={styles.spineQuiz} aria-labelledby="lower-quiz"><span className={styles.eyebrow}>DESAFIO ANATÔMICO</span><h2 id="lower-quiz">Teste seus conhecimentos</h2><p>Questão {question+1} de {questions.length}</p><h3>{quiz.q}</h3><div className={styles.spineAnswers}>{quiz.options.map((option,i)=><button type="button" key={option} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""} onClick={()=>setAnswer(i)}>{option}</button>)}</div>{answer!==null&&<div className={styles.answer} role="status"><strong>{answer===quiz.correct?"✓ Resposta correta!":"Resposta incorreta."}</strong><p>{quiz.explain}</p></div>}<button type="button" className={styles.primary} onClick={()=>{setQuestion(q=>(q+1)%questions.length);setAnswer(null)}}>Próxima questão →</button></section>
   <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
  </section><footer className={styles.footer}>Atlas Premium Eduverso · Esquemas em desenvolvimento · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
 </div></main>;
}
