"use client";
import Link from "next/link";
import {useState} from "react";
import styles from "../../atlas.module.css";
type Angle="anterior"|"lateral"|"posterior"|"obliqua";
const photos:{id:Angle;title:string;src:string;description:string}[]=[
 {id:"anterior",title:"Vista anterior",src:"/atlas-premium/coluna-vertebral/rascunhos/file_000000002c90820e827c48315422ba0a.webp",description:"Observação frontal das regiões vertebrais e do sacro."},
 {id:"lateral",title:"Vista lateral",src:"/atlas-premium/coluna-vertebral/rascunhos/file_0000000013d4820e8eb5ca143435b694.webp",description:"Permite observar as curvaturas naturais da coluna."},
 {id:"posterior",title:"Vista posterior",src:"/atlas-premium/coluna-vertebral/rascunhos/file_00000000b5e8820eb7ad0d93fa3014f1.webp",description:"Destaca a disposição posterior dos processos vertebrais."},
 {id:"obliqua",title:"Vista oblíqua",src:"/atlas-premium/coluna-vertebral/rascunhos/file_000000005e7c820eb63f2e4ac455e1bf.webp",description:"Perspectiva tridimensional ilustrada das vértebras e discos intervertebrais."}
];
const regions=[
 {name:"Região cervical",label:"C1 a C7",summary:"Sete vértebras sustentam a cabeça e permitem grande amplitude de movimento.",detail:"As duas primeiras vértebras são especializadas: o atlas (C1) sustenta o crânio, enquanto o áxis (C2) possui o processo odontoide, importante para a rotação da cabeça. A lordose cervical é uma curvatura fisiológica."},
 {name:"Região torácica",label:"T1 a T12",summary:"Doze vértebras articulam-se com as costelas e ajudam a formar a caixa torácica.",detail:"As vértebras torácicas apresentam características articulares relacionadas às costelas. Essa região acompanha a cifose torácica fisiológica e possui mobilidade relativamente menor do que a cervical."},
 {name:"Região lombar",label:"L1 a L5",summary:"Cinco vértebras robustas suportam grande parte das cargas do tronco.",detail:"Os corpos vertebrais maiores contribuem para a transmissão de cargas. A região lombar apresenta lordose fisiológica e participa de flexão, extensão e inclinação lateral."},
 {name:"Sacro",label:"S1 a S5",summary:"Cinco vértebras geralmente fusionadas conectam a coluna à pelve.",detail:"O sacro transmite forças para os ossos do quadril por meio das articulações sacroilíacas. Os forames sacrais permitem a passagem de ramos dos nervos espinais."},
 {name:"Cóccix",label:"Segmentos coccígeos",summary:"Pequena estrutura terminal formada por vértebras geralmente fusionadas.",detail:"O cóccix serve de ponto de fixação para ligamentos e músculos do assoalho pélvico. O número de segmentos pode variar."}
];
// Posições aproximadas das regiões sobre cada imagem ilustrativa (porcentagens).
// Os marcadores são guias visuais, não delimitações anatômicas exatas.
const hotspots:Record<Angle,{x:number;y:number}[]>={
 anterior:[{x:50,y:19},{x:50,y:43},{x:50,y:69},{x:50,y:86},{x:50,y:96}],
 lateral:[{x:44,y:19},{x:45,y:43},{x:44,y:68},{x:47,y:85},{x:50,y:95}],
 posterior:[{x:50,y:19},{x:50,y:43},{x:50,y:68},{x:50,y:85},{x:50,y:95}],
 obliqua:[{x:44,y:19},{x:48,y:43},{x:46,y:67},{x:53,y:85},{x:51,y:95}]
};
const questions=[
 {q:"Quantas vértebras compõem normalmente a região cervical?",answers:["5","7","12","24"],correct:1,why:"A região cervical possui sete vértebras, identificadas de C1 a C7."},
 {q:"Qual região da coluna se articula diretamente com as costelas?",answers:["Lombar","Coccígea","Torácica","Cervical"],correct:2,why:"As doze vértebras torácicas participam das articulações com as costelas."},
 {q:"Qual região é formada por cinco vértebras geralmente fusionadas?",answers:["Sacro","Lombar","Cervical","Torácica"],correct:0,why:"O sacro é geralmente constituído pela fusão das vértebras S1 a S5."},
 {q:"Qual é a principal função dos discos intervertebrais?",answers:["Produzir sangue","Amortecer cargas e permitir movimento","Secretar hormônios","Formar nervos"],correct:1,why:"Os discos contribuem para distribuir cargas e possibilitam movimentos entre os corpos vertebrais."}
];
export default function SpineStudyClient(){
 const [view,setView]=useState<Angle>("anterior");
 const [zoom,setZoom]=useState(1);
 const [region,setRegion]=useState(0);
 const [question,setQuestion]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const photo=photos.find(p=>p.id===view)!;
 const test=questions[question];
 const changeView=(next:Angle)=>{setView(next);setZoom(1)};
 return <main className={styles.root}><div className={styles.wrap}>
  <header className={styles.header}><Link className={styles.back} href="/atlas-premium/sistema/esqueletico">← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>Prévia anatômica</span></header>
  <section className={styles.labPage}>
   <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Coluna vertebral</span></nav>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · ESTUDO GUIADO</span><h1>Coluna vertebral</h1><p>Explore diferentes perspectivas, identifique as cinco regiões e pratique com perguntas explicadas. As imagens são rascunhos gerados por IA e aguardam revisão anatômica antes de uso comercial.</p></div><span className={styles.chip}>Prévia em desenvolvimento</span></div>
   <div className={styles.labGrid}>
    <section className={styles.viewer} aria-label="Explorador da coluna vertebral">
     <div className={styles.tabs} role="group" aria-label="Selecionar vista anatômica">{photos.map(p=><button key={p.id} type="button" aria-pressed={view===p.id} className={view===p.id?styles.tabActive:""} onClick={()=>changeView(p.id)}>{p.title}</button>)}</div>
     <div className={styles.visualFrame}><div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}><div className={styles.spineImageContainer}><img className={styles.spineImage} src={photo.src} width={1024} height={1536} alt={"Ilustração da coluna vertebral, "+photo.title.toLowerCase()} decoding="async"/><div className={styles.pins} role="group" aria-label="Cinco regiões da coluna; selecione um marcador">{regions.map((r,i)=><button type="button" key={r.name} aria-label={"Selecionar "+r.name+" ("+r.label+")"} aria-pressed={region===i} title={r.name+" • "+r.label} className={styles.pin+" "+styles.spinePin+(region===i?" "+styles.pinActive:"")} style={{left:hotspots[view][i].x+"%",top:hotspots[view][i].y+"%"}} onClick={()=>setRegion(i)}>{i+1}</button>)}</div></div></div></div>
     <div className={styles.spineSelectedCallout} role="status"><span className={styles.spineSelectedNumber}>{region+1}</span><div><strong>{regions[region].name} · {regions[region].label}</strong><p>{regions[region].summary}</p></div></div>
     <div className={styles.zoomControls} role="group" aria-label="Ampliar ou reduzir a vista"><button type="button" onClick={()=>setZoom(v=>Math.max(1,Math.round((v-.25)*100)/100))} disabled={zoom<=1} aria-label="Reduzir zoom">−</button><span>{Math.round(zoom*100)}%</span><button type="button" onClick={()=>setZoom(v=>Math.min(2.5,Math.round((v+.25)*100)/100))} disabled={zoom>=2.5} aria-label="Ampliar zoom">+</button><button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Redefinir</button></div>
     <p className={styles.diagramNote}>{photo.description} Toque em um dos cinco círculos para identificar a região correspondente. Os pontos são aproximações sobre ilustrações geradas por IA e precisam de revisão técnica.</p>
    </section>
    <aside className={styles.details}><span className={styles.eyebrow}>APRENDA POR REGIÃO</span><h3>As cinco regiões da coluna</h3><p>A coluna oferece suporte ao tronco, permite movimentos e participa da proteção da medula espinhal. A localização das estruturas deve ser conferida em atlas de referência.</p>
     <div className={styles.spineRegions} role="group" aria-label="Selecionar região">{regions.map((r,i)=><button type="button" key={r.name} className={region===i?styles.regionSelected:""} aria-pressed={region===i} onClick={()=>setRegion(i)}>{r.name}</button>)}</div>
     <div className={styles.regionDetail}><strong>{regions[region].name} <span>{regions[region].label}</span></strong><p>{regions[region].summary}</p><p>{regions[region].detail}</p></div>
     <span className={styles.muted}>Este é conteúdo introdutório. As vértebras, os discos, os ligamentos e as relações nervosas exigem material de referência validado para estudos avançados.</span>
    </aside>
   </div>
   <section className={styles.spineQuiz} aria-labelledby="spine-quiz-title"><div><span className={styles.eyebrow}>PRATIQUE O QUE APRENDEU</span><h2 id="spine-quiz-title">Desafio de anatomia</h2><p>Questão {question+1} de {questions.length}</p></div><h3>{test.q}</h3><div className={styles.spineAnswers}>{test.answers.map((choice,i)=><button type="button" key={choice} onClick={()=>setAnswer(i)} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""}>{choice}</button>)}</div>
    {answer!==null&&<div className={styles.answer} role="status"><strong>{answer===test.correct?"✓ Resposta correta!":"Resposta incorreta."}</strong><p>{test.why}</p></div>}
    <button type="button" className={styles.primary} onClick={()=>{setQuestion(q=>(q+1)%questions.length);setAnswer(null)}}>Próxima questão →</button>
   </section>
   <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
  </section>
  <footer className={styles.footer}>Atlas Premium Eduverso · Conteúdo em desenvolvimento · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
 </div></main>;
}
