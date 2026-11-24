"use client";
import Link from "next/link";
import {useState} from "react";
import styles from "../../atlas.module.css";
type SceneId="anterior"|"lateral"|"costelas"|"esterno";
type Hotspot={id:string;x:number;y:number};
const base="/atlas-premium/caixa-toracica/rascunhos/";
const scenes:{id:SceneId;title:string;src:string;description:string;pins:Hotspot[]}[]=[
 {id:"anterior",title:"Vista anterior",src:base+"file_0000000040d8820e8e4c9768d75214b4.webp",description:"Vista frontal geral da caixa torácica.",pins:[{id:"manubrio",x:50,y:22},{id:"corpo",x:50,y:42},{id:"xifoide",x:50,y:58},{id:"costelas",x:24,y:40},{id:"cartilagens",x:39,y:50}]},
 {id:"lateral",title:"Vista lateral",src:base+"file_0000000062b8820e826901bf45cbe8aa.webp",description:"Vista lateral: curvatura das costelas e relações com a coluna torácica.",pins:[{id:"vertebras",x:24,y:45},{id:"costelas",x:54,y:43},{id:"cartilagens",x:75,y:55},{id:"corpo",x:82,y:39}]},
 {id:"costelas",title:"Costelas e coluna",src:base+"file_0000000053c8820e9546630db935faa4.webp",description:"Outra perspectiva lateral ilustrativa das costelas e de suas articulações posteriores.",pins:[{id:"vertebras",x:24,y:47},{id:"costelas",x:54,y:35},{id:"cartilagens",x:72,y:59},{id:"xifoide",x:84,y:51}]},
 {id:"esterno",title:"Esterno e cartilagens",src:base+"file_00000000cf58820ea9de8a43c585957c.webp",description:"Enquadramento anterior para estudar o esterno e as cartilagens costais.",pins:[{id:"manubrio",x:50,y:24},{id:"corpo",x:50,y:41},{id:"xifoide",x:50,y:58},{id:"cartilagens",x:38,y:45},{id:"costelas",x:77,y:44}]}
];
const structures:{id:string;name:string;subtitle:string;intro:string;detail:string}[]=[
 {id:"manubrio",name:"Manúbrio do esterno",subtitle:"Porção superior do esterno",intro:"Forma a parte superior do esterno e articula-se com as clavículas e com a primeira cartilagem costal.",detail:"A incisura jugular e as incisuras claviculares ficam nessa região. A articulação manúbrio-esternal corresponde ao ângulo do esterno, referência clínica para localizar a segunda costela."},
 {id:"corpo",name:"Corpo do esterno",subtitle:"Porção central do esterno",intro:"Porção longa e central do esterno, relacionada às cartilagens costais.",detail:"Contribui para a parede anterior do tórax. Suas bordas laterais oferecem pontos de articulação para cartilagens costais de diversas costelas."},
 {id:"xifoide",name:"Processo xifoide",subtitle:"Extremidade inferior do esterno",intro:"Pequena projeção na extremidade inferior do esterno, variável em tamanho e forma.",detail:"Serve de inserção a estruturas musculares e ligamentares e é um marco de superfície importante. Sua posição varia entre indivíduos."},
 {id:"costelas",name:"Costelas",subtitle:"12 pares na anatomia habitual",intro:"O esqueleto torácico possui, habitualmente, 12 pares de costelas ligados posteriormente às vértebras torácicas.",detail:"As costelas 1–7 são chamadas verdadeiras, 8–10 falsas (com conexão indireta ao esterno) e 11–12 flutuantes. A curvatura costal contribui para proteger órgãos torácicos e permitir a mecânica respiratória."},
 {id:"cartilagens",name:"Cartilagens costais",subtitle:"Conexões cartilaginosas anteriores",intro:"Prolongamentos de cartilagem hialina que conectam as extremidades anteriores das costelas.",detail:"Ajudam a conferir elasticidade à parede torácica. As cartilagens superiores se conectam diretamente ao esterno; outras participam do arco costal."},
 {id:"vertebras",name:"Vértebras torácicas",subtitle:"T1 a T12",intro:"Doze vértebras torácicas formam a parte posterior da caixa torácica.",detail:"Apresentam superfícies articulares próprias para costelas, com variações conforme o nível vertebral. Trabalham junto às costelas na sustentação e mobilidade do tórax."}
];
const quizzes=[
 {q:"Quantos pares de costelas existem habitualmente no ser humano adulto?",answers:["10 pares","11 pares","12 pares","14 pares"],correct:2,why:"O padrão anatômico habitual é de 12 pares de costelas."},
 {q:"Qual estrutura forma a parte superior do esterno?",answers:["Processo xifoide","Manúbrio","Corpo do esterno","Arco costal"],correct:1,why:"O manúbrio ocupa a porção superior do esterno."},
 {q:"Quais costelas são tradicionalmente denominadas flutuantes?",answers:["1 e 2","4 e 5","8 e 9","11 e 12"],correct:3,why:"As costelas 11 e 12 não se conectam anteriormente ao esterno e são denominadas flutuantes."},
 {q:"Qual tecido compõe predominantemente as cartilagens costais?",answers:["Cartilagem hialina","Fibrocartilagem","Tecido ósseo compacto","Cartilagem elástica"],correct:0,why:"As cartilagens costais são constituídas predominantemente por cartilagem hialina."},
 {q:"Qual marco anatômico ajuda a identificar a segunda costela na superfície do tórax?",answers:["Processo xifoide","Incisura jugular","Ângulo do esterno","Arco costal"],correct:2,why:"O ângulo do esterno corresponde à articulação manúbrio-esternal e é uma referência para a segunda costela."}
];
export default function ThoraxStudyClient(){
 const [scene,setScene]=useState<SceneId>("anterior");
 const [zoom,setZoom]=useState(1);
 const [selected,setSelected]=useState("manubrio");
 const [question,setQuestion]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const current=scenes.find(s=>s.id===scene)!;
 const structure=structures.find(s=>s.id===selected)!;
 const quiz=quizzes[question];
 const changeScene=(next:SceneId)=>{const target=scenes.find(s=>s.id===next)!;setScene(next);setZoom(1);setSelected(target.pins[0].id)};
 return <main className={styles.root}><div className={styles.wrap}>
  <header className={styles.header}><Link className={styles.back} href="/atlas-premium/sistema/esqueletico">← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>Prévia anatômica</span></header>
  <section className={styles.labPage}>
   <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Caixa torácica</span></nav>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · ESTUDO GUIADO</span><h1>Caixa torácica</h1><p>Explore o esterno, as costelas, as cartilagens e as vértebras torácicas com círculos interativos. As quatro cenas são ilustrações geradas por IA e ainda aguardam revisão anatômica antes do lançamento comercial.</p></div><span className={styles.chip}>Prévia em desenvolvimento</span></div>
   <div className={styles.labGrid}>
    <section className={styles.viewer} aria-label="Explorador da caixa torácica">
     <div className={styles.tabs} role="group" aria-label="Selecionar vista ou detalhe">{scenes.map(s=><button type="button" key={s.id} aria-pressed={scene===s.id} className={scene===s.id?styles.tabActive:""} onClick={()=>changeScene(s.id)}>{s.title}</button>)}</div>
     <div className={styles.visualFrame}>
      <div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}>
       <div className={styles.thoraxImageContainer}>
        <img className={styles.thoraxImage} src={current.src} width={1152} height={1152} alt={"Ilustração da caixa torácica — "+current.title.toLowerCase()} decoding="async"/>
        <div className={styles.pins} role="group" aria-label="Selecionar estrutura na imagem">{current.pins.map((p,i)=><button type="button" key={p.id} aria-label={"Selecionar "+structures.find(s=>s.id===p.id)!.name} aria-pressed={selected===p.id} title={structures.find(s=>s.id===p.id)!.name} className={styles.pin+" "+styles.thoraxPin+(selected===p.id?" "+styles.pinActive:"")} style={{left:p.x+"%",top:p.y+"%"}} onClick={()=>setSelected(p.id)}>{i+1}</button>)}</div>
       </div>
      </div>
     </div>
     <div className={styles.spineSelectedCallout} role="status"><span className={styles.spineSelectedNumber}>{current.pins.findIndex(p=>p.id===selected)+1}</span><div><strong>{structure.name}</strong><p>{structure.intro}</p></div></div>
     <div className={styles.zoomControls} role="group" aria-label="Controles de zoom"><button type="button" onClick={()=>setZoom(z=>Math.max(1,Math.round((z-.25)*100)/100))} disabled={zoom<=1} aria-label="Diminuir zoom">−</button><span>{Math.round(zoom*100)}%</span><button type="button" onClick={()=>setZoom(z=>Math.min(2.5,Math.round((z+.25)*100)/100))} disabled={zoom>=2.5} aria-label="Aumentar zoom">+</button><button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Redefinir</button></div>
     <p className={styles.diagramNote}>{current.description} As posições dos marcadores são aproximadas e não substituem atlas anatômicos revisados.</p>
    </section>
    <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span><h3>{structure.name}</h3><p>{structure.subtitle}</p><p>{structure.intro}</p><div className={styles.divider}/><p>{structure.detail}</p>
     <div className={styles.divider}/><span className={styles.eyebrow}>EXPLORE MAIS</span><div className={styles.spineRegions} role="group" aria-label="Escolher estrutura">{structures.map(s=><button type="button" key={s.id} aria-pressed={selected===s.id} className={selected===s.id?styles.regionSelected:""} onClick={()=>{const included=current.pins.some(p=>p.id===s.id);if(!included){const alt=scenes.find(scene=>scene.pins.some(p=>p.id===s.id));if(alt){setScene(alt.id);setZoom(1)}}setSelected(s.id)}}>{s.name}</button>)}</div><span className={styles.muted}>Uso educacional. Ilustrações de IA e marcações precisam de validação de precisão anatômica.</span>
    </aside>
   </div>
   <section className={styles.spineQuiz} aria-labelledby="thorax-quiz-title"><span className={styles.eyebrow}>DESAFIO DE ANATOMIA</span><h2 id="thorax-quiz-title">Teste seus conhecimentos</h2><p>Questão {question+1} de {quizzes.length}</p><h3>{quiz.q}</h3><div className={styles.spineAnswers}>{quiz.answers.map((a,i)=><button type="button" key={a} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""} onClick={()=>setAnswer(i)}>{a}</button>)}</div>{answer!==null&&<div className={styles.answer} role="status"><strong>{answer===quiz.correct?"✓ Correto!":"Não é essa a resposta."}</strong><p>{quiz.why}</p></div>}<button type="button" className={styles.primary} onClick={()=>{setQuestion(q=>(q+1)%quizzes.length);setAnswer(null)}}>Próxima questão →</button></section>
   <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
  </section>
  <footer className={styles.footer}>Atlas Premium Eduverso · Conteúdo em desenvolvimento · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
 </div></main>;
}
