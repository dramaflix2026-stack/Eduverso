"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import styles from "./atlas.module.css";
type Point={name:string;x:number;y:number;description:string};
type Scene={file:string;label:string;description:string;points:Point[]};
type Question={q:string;answers:string[];correct:number;explain:string};
type Lab={title:string;intro:string;scenes:Scene[];quiz:Question[]};
const labs:Record<string,Lab>={
  "tecido-osseo": {
    "title": "Tecido ósseo",
    "intro": "Explore a organização microscópica e macroscópica do osso, relacionando sua arquitetura à resistência mecânica, vascularização e remodelação.",
    "scenes": [
      {
        "file": "compacto.webp",
        "label": "Osso compacto",
        "description": "Ampliação didática do tecido cortical.",
        "points": [
          {
            "name": "Ósteon",
            "x": 45,
            "y": 47,
            "description": "Unidade estrutural típica do osso compacto lamelar, formada por lamelas concêntricas em torno de um canal central."
          },
          {
            "name": "Canal de Havers",
            "x": 44,
            "y": 48,
            "description": "Canal central que abriga vasos sanguíneos e nervos. Os canais longitudinais ajudam a nutrir o tecido ósseo."
          },
          {
            "name": "Lamelas concêntricas",
            "x": 72,
            "y": 39,
            "description": "Camadas de matriz mineralizada com orientação alternada de fibras colágenas, que contribuem para resistência mecânica."
          },
          {
            "name": "Canal perfurante",
            "x": 32,
            "y": 61,
            "description": "Canal de Volkmann: conecta canais centrais e vasos periosteais ou medulares; não é rodeado por lamelas concêntricas próprias."
          }
        ]
      },
      {
        "file": "esponjoso.webp",
        "label": "Osso esponjoso",
        "description": "Rede tridimensional de trabéculas ósseas.",
        "points": [
          {
            "name": "Trabécula",
            "x": 53,
            "y": 49,
            "description": "Placa ou haste de matriz óssea que suporta e distribui cargas conforme sua orientação."
          },
          {
            "name": "Espaço medular",
            "x": 64,
            "y": 61,
            "description": "Espaços entre as trabéculas podem conter medula óssea, vasos e tecido adiposo; a imagem simplifica esse conteúdo."
          },
          {
            "name": "Junção trabecular",
            "x": 27,
            "y": 66,
            "description": "As trabéculas interconectadas formam uma rede que distribui forças com menor massa que uma estrutura maciça."
          }
        ]
      },
      {
        "file": "longitudinal.webp",
        "label": "Corte longitudinal",
        "description": "Organização de um osso longo em corte didático.",
        "points": [
          {
            "name": "Epífise proximal",
            "x": 49,
            "y": 11,
            "description": "Extremidade do osso longo, geralmente rica em osso trabecular e recoberta por cartilagem nas superfícies articulares."
          },
          {
            "name": "Diáfise",
            "x": 46,
            "y": 43,
            "description": "Corpo alongado do osso, com parede cortical e cavidade medular."
          },
          {
            "name": "Cavidade medular",
            "x": 50,
            "y": 56,
            "description": "Compartimento interno da diáfise que, em adultos, costuma conter predominantemente medula amarela."
          },
          {
            "name": "Epífise distal",
            "x": 49,
            "y": 89,
            "description": "Extremidade distal do osso, com tecido trabecular interno e superfície articular."
          }
        ]
      },
      {
        "file": "transversal.webp",
        "label": "Corte transversal",
        "description": "Corte esquemático de osso longo com córtex e região medular.",
        "points": [
          {
            "name": "Córtex",
            "x": 50,
            "y": 26,
            "description": "Camada externa densa de osso compacto, cuja distribuição contribui para resistir à flexão e torção."
          },
          {
            "name": "Trabéculas",
            "x": 36,
            "y": 43,
            "description": "Rede interna de osso esponjoso, mais abundante nas regiões próximas das extremidades dos ossos longos."
          },
          {
            "name": "Medula óssea",
            "x": 48,
            "y": 49,
            "description": "Tecido que ocupa espaços internos; a medula amarela é rica em adipócitos e a vermelha participa da hematopoiese."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Uma estrutura cortical contém lamelas ao redor de um vaso longitudinal. Qual unidade está sendo observada?",
        "answers": [
          "Trabécula",
          "Ósteon",
          "Epífise",
          "Cartilagem"
        ],
        "correct": 1,
        "explain": "O ósteon reúne lamelas concêntricas ao redor do canal de Havers."
      },
      {
        "q": "Qual estrutura conecta canais vasculares longitudinais no osso compacto?",
        "answers": [
          "Canalículos dentinários",
          "Cavidade articular",
          "Canal de Volkmann",
          "Menisco"
        ],
        "correct": 2,
        "explain": "Os canais perfurantes de Volkmann conectam canais centrais e vasos de outras regiões."
      },
      {
        "q": "Por que o osso esponjoso suporta cargas com massa relativamente baixa?",
        "answers": [
          "Por não conter matriz mineralizada",
          "Pela rede de trabéculas orientadas às solicitações",
          "Por ser composto somente de medula",
          "Por não sofrer remodelação"
        ],
        "correct": 1,
        "explain": "A arquitetura trabecular distribui cargas preservando uma relação eficiente entre resistência e massa."
      },
      {
        "q": "Em um osso longo adulto, qual região contém predominantemente medula amarela?",
        "answers": [
          "Cartilagem articular",
          "Periósteo externo",
          "Superfície epifisária",
          "Cavidade medular diafisária"
        ],
        "correct": 3,
        "explain": "A cavidade da diáfise geralmente abriga medula amarela no adulto."
      },
      {
        "q": "Qual combinação de células participa diretamente da remodelação óssea?",
        "answers": [
          "Osteoclastos e osteoblastos",
          "Hemácias e plaquetas",
          "Condrócitos e neurônios",
          "Adipócitos e miócitos"
        ],
        "correct": 0,
        "explain": "Osteoclastos reabsorvem matriz; osteoblastos sintetizam nova matriz óssea."
      },
      {
        "q": "A resistência do osso à flexão depende especialmente de qual característica?",
        "answers": [
          "Ausência de córtex",
          "Distribuição da massa cortical em relação ao eixo",
          "Ausência de colágeno",
          "Apenas volume da medula"
        ],
        "correct": 1,
        "explain": "A distribuição geométrica do córtex influencia fortemente o momento de inércia e a resistência à flexão."
      }
    ]
  },
  "anatomia-aplicada": {
    "title": "Anatomia aplicada",
    "intro": "Relacione estruturas do esqueleto a exemplos de fratura, movimento, alteração do alinhamento vertebral e degeneração articular. As cenas são didáticas e não permitem diagnóstico.",
    "scenes": [
      {
        "file": "fratura.webp",
        "label": "Fratura óssea",
        "description": "Exemplo ilustrativo de fratura oblíqua na diáfise femoral.",
        "points": [
          {
            "name": "Traço de fratura",
            "x": 47,
            "y": 46,
            "description": "Interrupção da continuidade óssea. A orientação e o deslocamento dos fragmentos são descritos na avaliação da fratura."
          },
          {
            "name": "Fragmento proximal",
            "x": 45,
            "y": 34,
            "description": "Porção acima da fratura; sua posição depende da lesão e das forças musculares."
          },
          {
            "name": "Fragmento distal",
            "x": 48,
            "y": 62,
            "description": "Porção abaixo do traço de fratura. O alinhamento é avaliado em conjunto com a região proximal."
          }
        ]
      },
      {
        "file": "biomecanica.webp",
        "label": "Biomecânica",
        "description": "Vista lateral de um membro inferior em flexão.",
        "points": [
          {
            "name": "Quadril",
            "x": 33,
            "y": 24,
            "description": "Articulação esferoide que permite movimentos em múltiplos planos; nesta cena, destaca-se a flexão."
          },
          {
            "name": "Joelho",
            "x": 75,
            "y": 40,
            "description": "A flexão aproxima a face posterior da perna da coxa; a patela atua no mecanismo extensor."
          },
          {
            "name": "Tornozelo",
            "x": 43,
            "y": 71,
            "description": "A articulação talocrural realiza principalmente dorsiflexão e flexão plantar."
          },
          {
            "name": "Pé",
            "x": 43,
            "y": 82,
            "description": "Arcos e articulações do pé contribuem para adaptação ao solo, apoio e propulsão."
          }
        ]
      },
      {
        "file": "escoliose.webp",
        "label": "Alteração da coluna",
        "description": "Representação didática de curvatura lateral vertebral.",
        "points": [
          {
            "name": "Curva torácica",
            "x": 58,
            "y": 30,
            "description": "Desvio lateral ilustrativo. A escoliose é uma deformidade tridimensional que envolve também rotação vertebral."
          },
          {
            "name": "Curva lombar",
            "x": 43,
            "y": 52,
            "description": "Uma curva compensatória pode contribuir para o equilíbrio do tronco; a configuração varia entre indivíduos."
          },
          {
            "name": "Sacro",
            "x": 49,
            "y": 79,
            "description": "Base óssea da coluna que transmite carga à pelve pelas articulações sacroilíacas."
          }
        ]
      },
      {
        "file": "desgaste.webp",
        "label": "Desgaste articular",
        "description": "Exemplo de degeneração de superfícies articulares do joelho.",
        "points": [
          {
            "name": "Cartilagem femoral",
            "x": 33,
            "y": 36,
            "description": "A cartilagem articular reduz atrito e distribui carga; a degeneração pode causar perda de espessura e irregularidades."
          },
          {
            "name": "Superfície tibial",
            "x": 65,
            "y": 52,
            "description": "A cartilagem recobre o platô tibial. Alterações articulares podem envolver cartilagem e osso subcondral."
          },
          {
            "name": "Menisco",
            "x": 32,
            "y": 48,
            "description": "Fibrocartilagem que contribui para congruência articular e distribuição das cargas."
          },
          {
            "name": "Ligamentos cruzados",
            "x": 50,
            "y": 42,
            "description": "Estruturas estabilizadoras que limitam translação e contribuem para controle rotacional do joelho."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Uma linha de fratura atravessa a diáfise em ângulo com seu eixo longitudinal. Como é descrita?",
        "answers": [
          "Oblíqua",
          "Transversal pura",
          "Avulsão epifisária",
          "Luxação"
        ],
        "correct": 0,
        "explain": "O traço oblíquo atravessa o osso diagonalmente em relação ao seu eixo."
      },
      {
        "q": "Qual estrutura melhora o braço de momento do quadríceps na extensão do joelho?",
        "answers": [
          "Fíbula",
          "Patela",
          "Calcâneo",
          "Acetábulo"
        ],
        "correct": 1,
        "explain": "A patela funciona como componente do mecanismo extensor e melhora a vantagem mecânica do quadríceps."
      },
      {
        "q": "Além da curvatura lateral, qual característica integra a deformidade tridimensional da escoliose?",
        "answers": [
          "Fusão obrigatória das vértebras",
          "Ausência de discos",
          "Rotação vertebral",
          "Fratura do sacro"
        ],
        "correct": 2,
        "explain": "A escoliose inclui componente rotacional; uma imagem isolada não estabelece diagnóstico."
      },
      {
        "q": "Qual tecido recobre as superfícies femorotibiais e reduz o atrito?",
        "answers": [
          "Periósteo",
          "Medula amarela",
          "Tendão",
          "Cartilagem articular"
        ],
        "correct": 3,
        "explain": "A cartilagem articular hialina facilita o deslizamento e distribui carga."
      },
      {
        "q": "Qual estrutura do joelho ajuda a distribuir cargas entre fêmur e tíbia?",
        "answers": [
          "Menisco",
          "Tendão de Aquiles",
          "Lábio acetabular",
          "Disco intervertebral"
        ],
        "correct": 0,
        "explain": "Os meniscos aumentam a área de contato e ajudam a distribuir cargas."
      },
      {
        "q": "A flexão plantar ocorre principalmente em qual articulação?",
        "answers": [
          "Radiocárpica",
          "Talocrural",
          "Glenoumeral",
          "Coxofemoral"
        ],
        "correct": 1,
        "explain": "A talocrural é a principal articulação para flexão plantar e dorsiflexão."
      }
    ]
  }
};
export default function SkeletalStudy({slug}:{slug:"tecido-osseo"|"anatomia-aplicada"}){
 const lab=labs[slug];
 const [view,setView]=useState(0),[selected,setSelected]=useState(0),[zoom,setZoom]=useState(1),[missing,setMissing]=useState<Record<string,boolean>>({}),[step,setStep]=useState(0),[answer,setAnswer]=useState<number|null>(null),[unlocked,setUnlocked]=useState(false);
 useEffect(()=>{let live=true;fetch("/api/atlas-premium/status",{cache:"no-store",credentials:"same-origin"}).then(r=>r.ok?r.json():null).then(d=>{if(live)setUnlocked(d?.hasAccess===true)}).catch(()=>{});return()=>{live=false}},[]);
 const scene=lab.scenes[view],point=scene.points[selected],question=lab.quiz[step];
 const changeView=(index:number)=>{setView(index);setSelected(0);setZoom(1)};
 const choose=(i:number)=>{if(unlocked||i<2)setSelected(i)};
 return <main className={styles.root}><div className={styles.wrap}>
 <header className={styles.header}><Link href="/atlas-premium/sistema/esqueletico" className={styles.back}>← Sistema Esquelético</Link><div className={styles.brand}>✦ EDUVERSO <span>ATLAS PREMIUM</span></div><span className={styles.status}>{unlocked?"Acesso liberado":"Demonstração"}</span></header>
 <section className={styles.labPage}>
 <nav className={styles.crumb} aria-label="Caminho de navegação"><Link href="/atlas-premium">Atlas Premium</Link><span>›</span><Link href="/atlas-premium/sistema/esqueletico">Sistema Esquelético</Link><span>›</span><span>{lab.title}</span></nav>
 <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LABORATÓRIO ANATÔMICO · {slug==="tecido-osseo"?"ITEM 7":"ITEM 8"}</span><h1>{lab.title}</h1><p>{lab.intro}</p></div><span className={styles.chip}>4 cenas anatômicas</span></div>
 <div className={styles.labGrid}><section className={styles.viewer} aria-label="Explorador anatômico">
 <div className={styles.tabs} role="group" aria-label="Selecionar cena">{lab.scenes.map((s,i)=><button key={s.file} type="button" aria-pressed={view===i} className={view===i?styles.tabActive:""} onClick={()=>changeView(i)}>{s.label}</button>)}</div>
 <div className={styles.visualFrame}><div className={styles.zoomLayer} style={{transform:"scale("+zoom+")"}}><div className={styles.lowerDiagramStage}>
 {missing[scene.file]?<div role="status" style={{padding:40,minHeight:240}}>Imagem temporariamente indisponível. Selecione as estruturas pelo nome.</div>:<><img key={scene.file} src={"/atlas-premium/"+slug+"/"+scene.file} width={1024} height={1536} style={{display:"block",width:"100%",height:"auto"}} alt={"Ilustração anatômica: "+scene.label} decoding="async" onError={()=>setMissing(prev=>({...prev,[scene.file]:true}))}/><div className={styles.pins}>{scene.points.map((p,i)=>{const locked=!unlocked&&i>1;return <button key={p.name} type="button" className={styles.pin+" "+styles.spinePin+(selected===i&&!locked?" "+styles.pinActive:"")} style={{left:p.x+"%",top:p.y+"%"}} aria-label={locked?"Bloqueado: "+p.name:"Selecionar "+p.name} title={locked?"Desbloqueie o Atlas Premium":p.name} aria-pressed={selected===i&&!locked} disabled={locked} onClick={()=>choose(i)}>{locked?"🔒":i+1}</button>})}</div></>}
 </div></div></div>
 <div className={styles.zoomControls} role="group" aria-label="Controles de zoom"><button type="button" aria-label="Diminuir zoom" disabled={zoom<=1} onClick={()=>setZoom(z=>Math.max(1,z-.25))}>−</button><span>{Math.round(zoom*100)}%</span><button type="button" aria-label="Aumentar zoom" disabled={zoom>=2.5} onClick={()=>setZoom(z=>Math.min(2.5,z+.25))}>+</button><button type="button" disabled={zoom===1} onClick={()=>setZoom(1)}>Redefinir</button></div>
 <p className={styles.diagramNote}>{scene.description} Toque nos marcadores para estudar. {!unlocked?"Prévia limitada a duas estruturas por cena. ":""}Imagens geradas por IA, com marcadores aproximados, pendentes de revisão anatômica.</p>
 </section><aside className={styles.details}><span className={styles.eyebrow}>ESTRUTURA SELECIONADA</span><h3>{point.name}</h3><p>{unlocked||selected<2?point.description:"Estrutura disponível no Atlas Premium."}</p><div className={styles.divider}/><span className={styles.eyebrow}>OUTRAS ESTRUTURAS</span><div className={styles.spineRegions} role="group" aria-label="Selecionar estrutura">{scene.points.map((p,i)=><button key={p.name} type="button" disabled={!unlocked&&i>1} aria-pressed={selected===i} className={selected===i?styles.regionSelected:""} onClick={()=>choose(i)}>{!unlocked&&i>1?"🔒 ":""}{p.name}</button>)}</div><div className={styles.divider}/><span className={styles.muted}>Material educativo, não diagnóstico. Revisão anatômica especializada necessária antes do uso comercial.</span></aside></div>
 <section className={styles.spineQuiz} aria-label="Desafio anatômico"><span className={styles.eyebrow}>DESAFIO DE ANATOMIA</span><h2>Teste seus conhecimentos</h2><p>Questão {step+1} de {lab.quiz.length}</p><h3>{question.q}</h3><div className={styles.spineAnswers}>{question.answers.map((option,i)=><button type="button" key={option} disabled={answer!==null} aria-pressed={answer===i} className={answer===i?styles.regionSelected:""} onClick={()=>setAnswer(i)}>{option}</button>)}</div>{answer!==null&&<div className={styles.answer} role="status"><strong>{answer===question.correct?"✓ Resposta correta!":"Resposta incorreta."}</strong><p>{question.explain}</p></div>}<button className={styles.primary} type="button" disabled={answer===null} onClick={()=>{setStep(i=>(i+1)%lab.quiz.length);setAnswer(null)}}>{step===lab.quiz.length-1?"Reiniciar desafio":"Próxima questão →"}</button></section>
 <div className={styles.returnLink}><Link href="/atlas-premium/sistema/esqueletico">← Voltar aos subitens do Sistema Esquelético</Link></div></section><footer className={styles.footer}>Atlas Premium Eduverso · Conteúdo em revisão · <Link href="/plataforma">Voltar ao Eduverso</Link></footer></div></main>;
}
