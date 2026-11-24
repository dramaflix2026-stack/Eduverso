"use client";
import Link from "next/link";
import {useState} from "react";
import styles from "../../atlas.module.css";
type Scene="geral-a"|"geral-b"|"comparacao"|"revisao";
type Point={id:string;x:number;y:number};
const prefix="/atlas-premium/membros-superiores/rascunhos/";
const scenes:{id:Scene;label:string;src:string;description:string;points:Point[]}[]=[
 {id:"geral-a",label:"Vista geral A",src:prefix+"file_000000007f38820e86b118753b885e56.webp",description:"Ilustração frontal dos dois membros superiores: cintura escapular, braço, antebraço e mão.",points:[{id:"clavicula",x:36,y:8},{id:"escapula",x:39,y:17},{id:"umero",x:24,y:34},{id:"radio",x:22,y:62},{id:"ulna",x:29,y:60},{id:"mao",x:20,y:87}]},
 {id:"geral-b",label:"Vista geral B",src:prefix+"file_0000000051e0820e9743e9552fc1e82a.webp",description:"Outra ilustração frontal dos ossos dos membros superiores, para comparação de detalhes.",points:[{id:"clavicula",x:36,y:8},{id:"escapula",x:39,y:18},{id:"umero",x:25,y:35},{id:"radio",x:22,y:62},{id:"ulna",x:29,y:60},{id:"mao",x:20,y:86}]},
 {id:"comparacao",label:"Comparação",src:prefix+"file_000000002514820e9784974b9331ed29.webp",description:"Ilustração frontal alternativa; use os marcadores para comparar a disposição dos ossos.",points:[{id:"clavicula",x:36,y:9},{id:"escapula",x:38,y:18},{id:"umero",x:24,y:34},{id:"radio",x:21,y:61},{id:"ulna",x:29,y:60},{id:"mao",x:19,y:87}]},
 {id:"revisao",label:"Revisão visual",src:prefix+"file_00000000ed70820e94f058f6e7ec39d1.webp",description:"Quarta ilustração frontal para revisão das estruturas. Uma vista posterior e os detalhes isolados ainda serão produzidos.",points:[{id:"clavicula",x:36,y:9},{id:"escapula",x:38,y:18},{id:"umero",x:24,y:34},{id:"radio",x:21,y:62},{id:"ulna",x:29,y:60},{id:"mao",x:19,y:86}]}
];
const structures:{id:string;name:string;label:string;summary:string;detail:string}[]=[
 {id:"clavicula",name:"Clavícula",label:"Cintura escapular",summary:"Osso longo de formato aproximadamente em S, situado na região superior do tórax.",detail:"Articula-se medialmente com o manúbrio do esterno e lateralmente com o acrômio da escápula. Participa da sustentação e mobilidade do complexo do ombro."},
 {id:"escapula",name:"Escápula",label:"Cintura escapular",summary:"Osso plano triangular localizado na parede posterolateral do tórax.",detail:"Possui cavidade glenoidal para articulação com a cabeça do úmero, além de acrômio, processo coracoide e espinha da escápula. Sua anatomia posterior não pode ser avaliada plenamente nestes rascunhos frontais."},
 {id:"umero",name:"Úmero",label:"Braço",summary:"Osso longo do braço, situado entre o ombro e o cotovelo.",detail:"A cabeça do úmero articula-se com a cavidade glenoidal. Distalmente, o úmero participa das articulações do cotovelo com rádio e ulna."},
 {id:"radio",name:"Rádio",label:"Antebraço lateral",summary:"Osso do antebraço localizado no lado do polegar, na posição anatômica.",detail:"O rádio participa das articulações do cotovelo, radioulnares e radiocárpica. A posição relativa dos ossos do antebraço muda com a pronação e a supinação."},
 {id:"ulna",name:"Ulna",label:"Antebraço medial",summary:"Osso do antebraço localizado no lado do dedo mínimo, na posição anatômica.",detail:"A ulna apresenta olécrano e incisura troclear na região proximal, importantes para a articulação com o úmero. Sua extremidade distal participa da articulação radioulnar distal."},
 {id:"mao",name:"Ossos da mão",label:"Carpo, metacarpo e falanges",summary:"A mão reúne ossos do carpo, cinco metacarpais e falanges.",detail:"O carpo possui oito ossos organizados em duas fileiras. Cada dedo, exceto o polegar, possui três falanges; o polegar possui duas."}
];
const questions=[
 {q:"Qual osso do antebraço fica no lado do polegar na posição anatômica?",answers:["Ulna","Rádio","Úmero","Escápula"],correct:1,why:"O rádio ocupa o lado lateral (lado do polegar) do antebraço na posição anatômica."},
 {q:"Com qual estrutura a cabeça do úmero se articula?",answers:["Cavidade glenoidal","Manúbrio do esterno","Olécrano","Processo xifoide"],correct:0,why:"A articulação glenoumeral ocorre entre a cabeça do úmero e a cavidade glenoidal da escápula."},
 {q:"Quantos ossos compõem normalmente o carpo?",answers:["5","7","8","12"],correct:2,why:"O carpo tem oito ossos distribuídos em duas fileiras."},
 {q:"Quantas falanges há normalmente no polegar?",answers:["Uma","Duas","Três","Quatro"],correct:1,why:"O polegar normalmente possui duas falanges: proximal e distal."},
 {q:"Qual osso apresenta o olécrano?",answers:["Rádio","Clavícula","Escápula","Ulna"],correct:3,why:"O olécrano é uma projeção proximal da ulna, importante para a anatomia posterior do cotovelo."},
 {q:"Qual é a articulação lateral da clavícula?",answers:["Esternocostal","Radiocárpica","Acromioclavicular","Umeroulnar"],correct:2,why:"A extremidade lateral da clavícula articula-se com o acrômio da escápula."}
];
export default function UpperLimbsClient(){
 const [scene,setScene]=useState<Scene>("geral-a");
 const [zoom,setZoom]=useState(1);
 const [selected,setSelected]=useState("clavicula");
 const [question,setQuestion]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const shown=scenes.find(s=>s.id===scene)!;
 const structure=structures.find(s=>s.id===selected)!;
 const quiz=questions[question];
 const changeScene=(next:Scene)=>{setScene(next);setZoom(1)};
 return <main className={styles.root}><div className={styles.wrap}>
  <header className={styles.header}><Link className={styles.back} href="/atlas-premium/sistema/esqueletico">← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>Prévia anatômica</span></header>
  <section className={styles.labPage}>
   <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Membros superiores</span></nav>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · ESTUDO GUIADO</span><h1>Membros superiores</h1><p>Explore clavícula, escápula, úmero, rádio, ulna e ossos da mão. As quatro imagens disponíveis são variações ilustrativas predominantemente frontais — as vistas posteriores e laterais ainda precisam ser produzidas e revisadas.</p></div><span className={styles.chip}>Prévia em desenvolvimento</span></div>
   <div className={styles.labGrid}>
    <section className={styles.viewer} aria-label="Explorador dos membros superiores">
     <div className={styles.tabs} role="group" aria-label="Selecionar ilustração anatômica">{scenes.map(s=><button type="button" key={s.id} aria-pressed={scene===s.id} className={scene===s.id?styles.tabActive:""} onClick={()=>changeScene(s.id)}>{s.label}</button>)}</div>
     <div className={styles.visualFrame}><div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}><div className={styles.spineImageContainer}>
      <img className={styles.spineImage} src={shown.src} width={1169} height={1536} alt={"Ilustração dos membros superiores: "+shown.label} decoding="async"/>
      <div className={styles.pins} role="group" aria-label="Selecionar estruturas dos membros superiores">{shown.points.map((p,i)=><button type="button" key={p.id} aria-label={"Selecionar "+structures.find(s=>s.id===p.id)!.name} title={structures.find(s=>s.id===p.id)!.name} aria-pressed={selected===p.id} className={styles.pin+" "+styles.spinePin+(selected===p.id?" "+styles.pinActive:"")} style={{left:p.x+"%",top:p.y+"%"}} onClick={()=>setSelected(p.id)}>{i+1}</button>)}</div>
     </div></div></div>
     <div className={styles.spineSelectedCallout} role="status"><span className={styles.spineSelectedNumber}>{shown.points.findIndex(p=>p.id===selected)+1}</span><div><strong>{structure.name} · {structure.label}</strong><p>{structure.summary}</p></div></div>
     <div className={styles.zoomControls} role="group" aria-label="Controles de ampliação"><button type="button" aria-label="Diminuir zoom" onClick={()=>setZoom(z=>Math.max(1,Math.round((z-.25)*100)/100))} disabled={zoom<=1}>−</button><span>{Math.round(zoom*100)}%</span><button type="button" aria-label="Aumentar zoom" onClick={()=>setZoom(z=>Math.min(2.5,Math.round((z+.25)*100)/100))} disabled={zoom>=2.5}>+</button><button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Redefinir</button></div>
     <p className={styles.diagramNote}>{shown.description} Os marcadores são aproximados; imagens e posições precisam de revisão anatômica antes da comercialização.</p>
    </section>
    <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span><h3>{structure.name}</h3><p>{structure.label}</p><p>{structure.summary}</p><div className={styles.divider}/><p>{structure.detail}</p><div className={styles.divider}/><span className={styles.eyebrow}>EXPLORE MAIS</span><div className={styles.spineRegions} role="group" aria-label="Escolher estrutura">{structures.map(s=><button key={s.id} type="button" aria-pressed={selected===s.id} className={selected===s.id?styles.regionSelected:""} onClick={()=>setSelected(s.id)}>{s.name}</button>)}</div><span className={styles.muted}>Material educativo preliminar. Rascunhos gerados por IA não substituem atlas revisados por especialista.</span></aside>
   </div>
   <section className={styles.spineQuiz} aria-labelledby="upper-quiz-title"><span className={styles.eyebrow}>DESAFIO DE ANATOMIA</span><h2 id="upper-quiz-title">Teste o conhecimento</h2><p>Questão {question+1} de {questions.length}</p><h3>{quiz.q}</h3><div className={styles.spineAnswers}>{quiz.answers.map((a,i)=><button type="button" key={a} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""} onClick={()=>setAnswer(i)}>{a}</button>)}</div>{answer!==null&&<div className={styles.answer} role="status"><strong>{answer===quiz.correct?"✓ Resposta correta!":"Resposta incorreta."}</strong><p>{quiz.why}</p></div>}<button type="button" className={styles.primary} onClick={()=>{setQuestion(q=>(q+1)%questions.length);setAnswer(null)}}>Próxima questão →</button></section>
   <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
  </section><footer className={styles.footer}>Atlas Premium Eduverso · Conteúdo em revisão · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
 </div></main>;
}
