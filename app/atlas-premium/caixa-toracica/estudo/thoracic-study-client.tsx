"use client";
import Link from "next/link";
import {useState} from "react";
import styles from "../../atlas.module.css";

type Scene="anterior"|"lateral"|"esterno"|"cartilagens";
type Point={x:number;y:number;id:number};
type SceneData={id:Scene;label:string;src:string;description:string;points:Point[]};
const scenes:SceneData[]=[
 {id:"anterior",label:"Vista anterior",src:"/atlas-premium/caixa-toracica/rascunhos/file_00000000cf58820ea9de8a43c585957c.webp",description:"Vista frontal ilustrativa: esterno, arcos costais e cartilagens.",points:[{id:0,x:50,y:36},{id:1,x:32,y:28},{id:2,x:73,y:69},{id:3,x:20,y:82},{id:4,x:38,y:58},{id:5,x:51,y:80}]},
 {id:"lateral",label:"Vista lateral",src:"/atlas-premium/caixa-toracica/rascunhos/file_0000000053c8820e9546630db935faa4.webp",description:"Vista lateral ilustrativa da curvatura costal e sua conexão com a coluna torácica.",points:[{id:0,x:80,y:32},{id:1,x:49,y:30},{id:2,x:52,y:64},{id:3,x:42,y:78},{id:4,x:73,y:62},{id:5,x:27,y:48}]},
 {id:"esterno",label:"Detalhe do esterno",src:"/atlas-premium/caixa-toracica/rascunhos/file_0000000040d8820e8e4c9768d75214b4.webp",description:"Outra ilustração frontal para explorar o manúbrio, o corpo do esterno e o processo xifoide.",points:[{id:0,x:51,y:32},{id:1,x:29,y:35},{id:2,x:75,y:69},{id:3,x:29,y:84},{id:4,x:42,y:60},{id:5,x:51,y:76}]},
 {id:"arco-costal",label:"Arcos costais",src:"/atlas-premium/caixa-toracica/rascunhos/file_00000000f9ec820e97f5a63c6dc29167.webp",description:"Outra ilustração frontal para observar cartilagens e margens costais. Não é uma vista posterior.",points:[{id:0,x:50,y:33},{id:1,x:34,y:33},{id:2,x:76,y:67},{id:3,x:23,y:85},{id:4,x:43,y:67},{id:5,x:50,y:77}]}
];
const structures=[
 {name:"Esterno",label:"Manúbrio, corpo e xifoide",summary:"Osso plano mediano da parede anterior do tórax.",detail:"O esterno tem três partes principais: manúbrio, corpo e processo xifoide. Nele se articulam as cartilagens das costelas verdadeiras, direta ou indiretamente, e as clavículas por meio das articulações esternoclaviculares."},
 {name:"Costelas verdadeiras",label:"1ª a 7ª",summary:"Os primeiros sete pares se conectam diretamente ao esterno por suas cartilagens.",detail:"Cada costela verdadeira tem cartilagem costal própria, alcançando o esterno diretamente. O conjunto participa da proteção dos órgãos torácicos e dos movimentos respiratórios."},
 {name:"Costelas falsas",label:"8ª a 10ª",summary:"Costelas com conexão indireta ao esterno pelo arco costal.",detail:"As cartilagens das costelas 8 a 10 geralmente se articulam à cartilagem superior, formando parte da margem costal. A classificação pode variar em alguns materiais; aqui, as costelas flutuantes são tratadas separadamente."},
 {name:"Costelas flutuantes",label:"11ª e 12ª",summary:"Pares inferiores sem ligação anterior ao esterno.",detail:"Os 11º e 12º pares de costelas terminam anteriormente livres na parede abdominal. Conectam-se posteriormente a vértebras torácicas e protegem parcialmente estruturas superiores do abdômen."},
 {name:"Cartilagens costais",label:"Conexões anteriores",summary:"Estruturas de cartilagem hialina que oferecem elasticidade à parede torácica.",detail:"As cartilagens costais conectam costelas ao esterno ou a cartilagens adjacentes. São relevantes para a complacência torácica durante inspiração e expiração."},
 {name:"Vértebras torácicas",label:"T1 a T12",summary:"Coluna posterior com articulações costovertebrais.",detail:"As doze vértebras torácicas possuem facetas articulares adaptadas para as costelas. As articulações costovertebrais e costotransversárias contribuem para os movimentos da caixa torácica."}
];
const questions=[
 {q:"Quais costelas possuem conexão direta com o esterno por suas cartilagens?",choices:["1ª a 7ª","8ª a 10ª","11ª e 12ª","Todas as 12"],correct:0,why:"As costelas verdadeiras (1ª a 7ª) ligam-se diretamente ao esterno por cartilagens costais."},
 {q:"Qual componente está localizado na extremidade inferior do esterno?",choices:["Acrômio","Processo xifoide","Processo espinhoso","Atlas"],correct:1,why:"O esterno é constituído por manúbrio, corpo e processo xifoide, sua porção inferior."},
 {q:"Quais pares de costelas são considerados flutuantes?",choices:["1º e 2º","5º e 6º","8º a 10º","11º e 12º"],correct:3,why:"As costelas 11 e 12 não se conectam anteriormente ao esterno."},
 {q:"Qual estrutura fornece elasticidade às conexões anteriores das costelas?",choices:["Cartilagem costal","Medula espinhal","Plexo braquial","Osso temporal"],correct:0,why:"As cartilagens costais, formadas por cartilagem hialina, ajudam a acomodar os movimentos respiratórios."}
];
export default function ThoracicStudyClient(){
 const [scene,setScene]=useState<Scene>("anterior");
 const [selected,setSelected]=useState(0);
 const [zoom,setZoom]=useState(1);
 const [question,setQuestion]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const shown=scenes.find(s=>s.id===scene)!;
 const quiz=questions[question];
 return <main className={styles.root}><div className={styles.wrap}>
  <header className={styles.header}><Link className={styles.back} href="/atlas-premium/sistema/esqueletico">← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>Prévia anatômica</span></header>
  <section className={styles.labPage}>
   <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>Caixa torácica</span></nav>
   <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · ESTUDO GUIADO</span><h1>Caixa torácica</h1><p>Examine o esterno, os doze pares de costelas, suas cartilagens e as vértebras torácicas. Quatro cenas ilustradas com seis pontos interativos, explicações e perguntas comentadas.</p></div><span className={styles.chip}>Prévia em desenvolvimento</span></div>
   <div className={styles.labGrid}>
    <section className={styles.viewer} aria-label="Explorador da caixa torácica">
     <div className={styles.tabs} role="group" aria-label="Selecionar imagem">{scenes.map(s=><button key={s.id} type="button" aria-pressed={scene===s.id} className={scene===s.id?styles.tabActive:""} onClick={()=>{setScene(s.id);setZoom(1)}}>{s.label}</button>)}</div>
     <div className={styles.visualFrame}><div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}><div className={styles.spineImageContainer}><img className={styles.spineImage} src={shown.src} width={1279} height={1279} decoding="async" alt={"Ilustração da caixa torácica — "+shown.label}/><div className={styles.pins} role="group" aria-label="Estruturas da caixa torácica">{shown.points.map(p=><button type="button" key={p.id} aria-label={"Selecionar "+structures[p.id].name} title={structures[p.id].name} aria-pressed={selected===p.id} className={styles.pin+" "+styles.spinePin+(selected===p.id?" "+styles.pinActive:"")} style={{left:p.x+"%",top:p.y+"%"}} onClick={()=>setSelected(p.id)}>{p.id+1}</button>)}</div></div></div></div>
     <div className={styles.spineSelectedCallout} role="status"><span className={styles.spineSelectedNumber}>{selected+1}</span><div><strong>{structures[selected].name} · {structures[selected].label}</strong><p>{structures[selected].summary}</p></div></div>
     <div className={styles.zoomControls} role="group" aria-label="Controles de zoom"><button type="button" onClick={()=>setZoom(v=>Math.max(1,Math.round((v-.25)*100)/100))} disabled={zoom<=1} aria-label="Diminuir zoom">−</button><span>{Math.round(zoom*100)}%</span><button type="button" onClick={()=>setZoom(v=>Math.min(2.5,Math.round((v+.25)*100)/100))} disabled={zoom>=2.5} aria-label="Aumentar zoom">+</button><button type="button" onClick={()=>setZoom(1)} disabled={zoom===1}>Redefinir</button></div>
     <p className={styles.diagramNote}>{shown.description} Imagens geradas por IA; a localização dos marcadores é aproximada e requer revisão anatômica antes do lançamento comercial.</p>
    </section>
    <aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURAS E FUNÇÕES</span><h3>Conheça a caixa torácica</h3><p>O arcabouço ósseo protege coração e pulmões e participa dos movimentos respiratórios.</p>
     <div className={styles.spineRegions} role="group" aria-label="Selecionar estrutura">{structures.map((s,i)=><button key={s.name} type="button" aria-pressed={selected===i} className={selected===i?styles.regionSelected:""} onClick={()=>setSelected(i)}>{s.name}</button>)}</div>
     <div className={styles.regionDetail}><strong>{structures[selected].name}<span>{structures[selected].label}</span></strong><p>{structures[selected].summary}</p><p>{structures[selected].detail}</p></div>
     <span className={styles.muted}>Esta demonstração contém ilustrações de IA não revisadas. Não use a posição dos marcadores como referência anatômica clínica.</span>
    </aside>
   </div>
   <section className={styles.spineQuiz} aria-labelledby="thorax-quiz"><span className={styles.eyebrow}>TREINO ANATÔMICO</span><h2 id="thorax-quiz">Desafio da caixa torácica</h2><p>Questão {question+1} de {questions.length}</p><h3>{quiz.q}</h3><div className={styles.spineAnswers}>{quiz.choices.map((choice,i)=><button type="button" key={choice} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""} onClick={()=>setAnswer(i)}>{choice}</button>)}</div>
   {answer!==null&&<div className={styles.answer} role="status"><strong>{answer===quiz.correct?"✓ Resposta correta!":"Resposta incorreta."}</strong><p>{quiz.why}</p></div>}
   <button type="button" className={styles.primary} onClick={()=>{setQuestion(q=>(q+1)%questions.length);setAnswer(null)}}>Próxima questão →</button>
   </section>
   <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div>
  </section><footer className={styles.footer}>Atlas Premium Eduverso · Conteúdo ilustrativo em revisão · <Link href="/plataforma">Voltar ao Eduverso</Link></footer>
 </div></main>;
}
