"use client";
import Link from "next/link";
import {useState} from "react";
import styles from "../../atlas.module.css";

type View="frontal"|"lateral"|"posterior"|"obliqua";
type Joint="ombro"|"cotovelo"|"punho"|"quadril"|"joelho"|"tornozelo";
type Pin={joint:Joint;x:number;y:number};
const location="/atlas-premium/articulacoes/";
const views:{id:View;label:string;file:string;description:string;pins:Pin[]}[]=[
 {id:"frontal",label:"Vista frontal",file:"frontal.webp",description:"Vista anterior do esqueleto, com articulações destacadas.",pins:[{joint:"ombro",x:39,y:23},{joint:"cotovelo",x:35,y:35},{joint:"punho",x:30,y:44},{joint:"quadril",x:44,y:49},{joint:"joelho",x:44,y:67},{joint:"tornozelo",x:44,y:85}]},
 {id:"lateral",label:"Vista lateral",file:"lateral.webp",description:"Observe as articulações em perfil e as relações entre os segmentos.",pins:[{joint:"ombro",x:52,y:24},{joint:"cotovelo",x:51,y:35},{joint:"punho",x:48,y:45},{joint:"quadril",x:52,y:50},{joint:"joelho",x:51,y:68},{joint:"tornozelo",x:51,y:85}]},
 {id:"posterior",label:"Vista posterior",file:"posterior.webp",description:"Vista de trás, útil para comparar cintura escapular, quadril e membros.",pins:[{joint:"ombro",x:40,y:23},{joint:"cotovelo",x:35,y:36},{joint:"punho",x:31,y:44},{joint:"quadril",x:44,y:50},{joint:"joelho",x:44,y:68},{joint:"tornozelo",x:45,y:85}]},
 {id:"obliqua",label:"Vista oblíqua",file:"obliqua.webp",description:"Perspectiva oblíqua para observar a disposição espacial das articulações.",pins:[{joint:"ombro",x:57,y:23},{joint:"cotovelo",x:65,y:36},{joint:"punho",x:64,y:45},{joint:"quadril",x:54,y:51},{joint:"joelho",x:55,y:67},{joint:"tornozelo",x:55,y:86}]}
];
const joints:{id:Joint;name:string;kind:string;summary:string;detail:string;practice:string}[]=[
 {id:"ombro",name:"Ombro (glenoumeral)",kind:"Sinovial esferoide",summary:"União entre a cabeça do úmero e a cavidade glenoidal da escápula.",detail:"Permite flexão, extensão, abdução, adução e rotações. Sua grande mobilidade depende de estruturas estabilizadoras, como a cápsula articular, o lábio glenoidal e os músculos do manguito rotador.",practice:"Compare a mobilidade do ombro à do quadril: ambas são esferoides, mas o ombro prioriza amplitude e depende muito de estabilização muscular."},
 {id:"cotovelo",name:"Cotovelo",kind:"Complexo sinovial",summary:"Envolve as articulações úmero-ulnar, úmero-radial e rádio-ulnar proximal.",detail:"As articulações do complexo permitem flexão e extensão do cotovelo; a rádio-ulnar proximal participa da pronação e supinação do antebraço. A estabilidade depende também de ligamentos colaterais.",practice:"Na pronação, o rádio gira em relação à ulna. Não confunda essa rotação com flexão do cotovelo."},
 {id:"punho",name:"Punho (radiocárpica)",kind:"Sinovial elipsoide",summary:"Articulação entre o rádio distal, o disco articular e ossos proximais do carpo.",detail:"Participa da flexão, extensão e dos desvios radial e ulnar. Os movimentos da mão também envolvem articulações mediocárpicas e intercarpais.",practice:"O punho faz desvio radial quando a mão se desloca para o lado do polegar."},
 {id:"quadril",name:"Quadril (coxofemoral)",kind:"Sinovial esferoide",summary:"A cabeça do fêmur articula-se no acetábulo do osso do quadril.",detail:"A articulação permite movimentos em múltiplos planos, mas apresenta grande estabilidade óssea e ligamentar. O lábio acetabular aprofunda a cavidade e contribui para a congruência articular.",practice:"Ao caminhar, o quadril deve conciliar suporte de peso, estabilidade pélvica e mobilidade."},
 {id:"joelho",name:"Joelho",kind:"Sinovial complexa",summary:"Articulações femorotibiais e femoropatelar com meniscos e ligamentos.",detail:"A flexão e a extensão predominam, com pequena rotação associada, especialmente em flexão. Meniscos ajudam na distribuição de cargas. Ligamentos cruzados e colaterais contribuem para a estabilidade.",practice:"Os ligamentos cruzados limitam movimentos de translação e contribuem para a estabilidade rotacional."},
 {id:"tornozelo",name:"Tornozelo (talocrural)",kind:"Sinovial do tipo gínglimo",summary:"Articulação entre tíbia, fíbula e tálus, formando uma pinça óssea.",detail:"A articulação talocrural realiza principalmente dorsiflexão e flexão plantar. Inversão e eversão envolvem sobretudo articulações do retropé, especialmente a subtalar.",practice:"Levantar a ponta do pé em direção à perna é dorsiflexão; apontar o pé para baixo é flexão plantar."}
];
const quiz=[
 {q:"Qual articulação permite ampla mobilidade em três eixos, com a cabeça do úmero na cavidade glenoidal?",answers:["Radiocárpica","Glenoumeral","Talocrural","Femoropatelar"],correct:1,explain:"A glenoumeral é uma articulação sinovial esferoide de grande mobilidade."},
 {q:"Qual estrutura aumenta a congruência das superfícies femorotibiais e ajuda a distribuir carga?",answers:["Meniscos","Lábio glenoidal","Olécrano","Disco intervertebral"],correct:0,explain:"Os meniscos do joelho colaboram na distribuição de carga e congruência articular."},
 {q:"Em qual complexo articular ocorre a pronação do antebraço?",answers:["Articulação talocrural","Articulação radiocárpica isolada","Articulações rádio-ulnares","Articulação glenoumeral"],correct:2,explain:"A pronação e a supinação ocorrem pelas articulações rádio-ulnares proximal e distal."},
 {q:"Qual articulação é mais diretamente responsável pela dorsiflexão do pé?",answers:["Subtalar","Glenoumeral","Coxofemoral","Talocrural"],correct:3,explain:"A talocrural permite principalmente dorsiflexão e flexão plantar."},
 {q:"Qual estrutura contribui para aprofundar o acetábulo?",answers:["Ligamento patelar","Lábio acetabular","Menisco lateral","Cartilagem costal"],correct:1,explain:"O lábio acetabular é um anel fibrocartilaginoso que aprofunda a cavidade do acetábulo."},
 {q:"Um estudante executa desvio ulnar do punho. Para que lado a mão se desloca?",answers:["Lado do dedo mínimo","Lado do polegar","Em direção ao cotovelo","Em direção ao ombro"],correct:0,explain:"O desvio ulnar desloca a mão para o lado da ulna, ou seja, do dedo mínimo."}
];
function Placeholder({view}:{view:View}){
 return <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid meet" className={styles.jointsFallbackSvg} role="img" aria-label={"Esquema provisório do corpo em "+view}>
  <defs><radialGradient id="joints-background"><stop stopColor="#421875"/><stop offset="1" stopColor="#110820"/></radialGradient></defs>
  <rect width="600" height="750" fill="url(#joints-background)"/>
  <g stroke="#e1c49b" strokeWidth="16" strokeLinecap="round" fill="none" opacity=".88">
   <path d="M300 140 L300 315 M265 180 L335 180 M265 180 L220 260 L196 355 M335 180 L380 260 L405 355 M260 322 L340 322 M270 335 L246 482 L248 641 M330 335 L353 482 L351 641"/>
  </g>
  <g fill="#ebcda4" stroke="#a77d5a" strokeWidth="4"><circle cx="300" cy="104" r="43"/><ellipse cx="300" cy="320" rx="65" ry="33"/></g>
  {[[265,180],[335,180],[220,260],[380,260],[196,355],[405,355],[270,335],[330,335],[246,482],[353,482],[248,641],[351,641]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="16" fill="#ad73ef" stroke="#efdcff" strokeWidth="4" opacity=".92"/>)}
  <text x="300" y="718" textAnchor="middle" fill="#d7c4f0" fontSize="15">AGUARDANDO IMAGENS ANATÔMICAS</text>
 </svg>;
}
export default function JointStudyClient(){
 const [view,setView]=useState<View>("frontal");
 const [missing,setMissing]=useState<Record<string,boolean>>({});
 const [selected,setSelected]=useState<Joint>("ombro");
 const [zoom,setZoom]=useState(1);
 const [step,setStep]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const current=views.find(s=>s.id===view)!;
 const selectedInfo=joints.find(s=>s.id===selected)!;
 const question=quiz[step];
 const changeView=(next:View)=>{setView(next);setZoom(1)};
 return <main className={styles.root}><div className={styles.wrap}>
  <header className={styles.header}><Link className={styles.back} href="/atlas-premium/sistema/esqueletico">← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>Conteúdo em revisão</span></header>
  <section className={styles.labPage}>
   <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Articulações</span></nav>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · ITEM 6</span><h1>Articulações</h1><p>Selecione uma articulação diretamente no esqueleto para conhecer sua classificação, movimentos e estruturas de estabilização. As quatro ilustrações de IA exigem revisão anatômica antes do uso comercial.</p></div><span className={styles.chip}>Demonstração em desenvolvimento</span></div>
   <div className={styles.labGrid}>
    <section className={styles.viewer} aria-label="Explorador de articulações">
     <div className={styles.tabs} role="group" aria-label="Selecionar vista">{views.map(s=><button key={s.id} type="button" aria-pressed={view===s.id} className={view===s.id?styles.tabActive:""} onClick={()=>changeView(s.id)}>{s.label}</button>)}</div>
     <div className={styles.visualFrame}>
      <div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}>
       <div className={styles.jointsStage}>
        {missing[view]?<Placeholder view={view}/>:<img key={current.file} src={location+current.file} alt={"Ilustração anatômica — "+current.label} width={1122} height={1402} className={styles.jointsImage} decoding="async" onError={()=>setMissing(prev=>({...prev,[view]:true}))}/>}
        {!missing[view]&&<div className={styles.pins} role="group" aria-label="Identificar articulações na imagem">{current.pins.map((p,i)=><button type="button" key={p.joint} style={{left:p.x+"%",top:p.y+"%"}} className={styles.pin+" "+styles.spinePin+(selected===p.joint?" "+styles.pinActive:"")} onClick={()=>setSelected(p.joint)} aria-label={"Selecionar "+joints.find(j=>j.id===p.joint)!.name} aria-pressed={selected===p.joint} title={joints.find(j=>j.id===p.joint)!.name}>{i+1}</button>)}</div>}
       </div>
      </div>
     </div>
     <div className={styles.spineSelectedCallout} role="status"><span className={styles.spineSelectedNumber}>{joints.findIndex(s=>s.id===selected)+1}</span><div><strong>{selectedInfo.name} · {selectedInfo.kind}</strong><p>{selectedInfo.summary}</p></div></div>
     <div className={styles.zoomControls} role="group" aria-label="Controles de zoom"><button type="button" aria-label="Diminuir zoom" onClick={()=>setZoom(v=>Math.max(1,Math.round((v-.25)*100)/100))} disabled={zoom<=1}>−</button><span>{Math.round(zoom*100)}%</span><button type="button" aria-label="Aumentar zoom" onClick={()=>setZoom(v=>Math.min(2.5,Math.round((v+.25)*100)/100))} disabled={zoom>=2.5}>+</button><button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Redefinir</button></div>
     <p className={styles.diagramNote}>{current.description} {missing[view]?"A imagem ainda não foi enviada ao GitHub. A seleção por nomes permanece funcional.":"Marcadores aproximados em ilustrações geradas por IA, pendentes de revisão."}</p>
    </section>
    <aside className={styles.details}><span className={styles.eyebrow}>ARTICULAÇÃO SELECIONADA</span><h3>{selectedInfo.name}</h3><p>{selectedInfo.kind}</p><p>{selectedInfo.summary}</p><div className={styles.divider}/><p>{selectedInfo.detail}</p><div className={styles.divider}/><strong>Aplicação anatômica</strong><p>{selectedInfo.practice}</p><div className={styles.divider}/><span className={styles.eyebrow}>OUTRAS ARTICULAÇÕES</span>
     <div className={styles.spineRegions} role="group" aria-label="Escolher articulação">{joints.map(j=><button type="button" key={j.id} aria-pressed={selected===j.id} className={selected===j.id?styles.regionSelected:""} onClick={()=>setSelected(j.id)}>{j.name}</button>)}</div>
     <span className={styles.muted}>Material introdutório. As imagens e os pontos não substituem materiais clínicos ou anatômicos revisados.</span>
    </aside>
   </div>
   <section className={styles.spineQuiz} aria-labelledby="joints-quiz"><span className={styles.eyebrow}>DESAFIO DE ANATOMIA</span><h2 id="joints-quiz">Teste o que aprendeu</h2><p>Questão {step+1} de {quiz.length}</p><h3>{question.q}</h3>
    <div className={styles.spineAnswers}>{question.answers.map((option,i)=><button type="button" key={option} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""} onClick={()=>setAnswer(i)}>{option}</button>)}</div>
    {answer!==null&&<div className={styles.answer} role="status"><strong>{answer===question.correct?"✓ Resposta correta!":"Não é essa a resposta."}</strong><p>{question.explain}</p></div>}
    <button type="button" className={styles.primary} onClick={()=>{setStep(i=>(i+1)%quiz.length);setAnswer(null)}}>Próxima questão →</button>
   </section>
   <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
  </section>
  <footer className={styles.footer}>Atlas Premium Eduverso · Conteúdo em revisão · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
 </div></main>;
}
