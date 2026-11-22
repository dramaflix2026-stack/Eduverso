import type {AtlasView,AtlasSpot} from "./anatomy-atlas-collection-data";
type Source={id:string;title:string;short:string;file:string;spots:[string,string,string,string][]};
const commons=(file:string)=>"https://commons.wikimedia.org/wiki/File:"+encodeURIComponent(file.replace(/ /g,"_"));
const image=(file:string)=>"https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file.replace(/ /g,"_"));
const sources:Source[]=[
 {
  "id": "musculos-anterior",
  "title": "Músculos — vista anterior",
  "short": "Musculatura anterior",
  "file": "1105 Anterior and Posterior Views of Muscles.jpg",
  "spots": [
   [
    "Peitoral maior",
    "Músculo superficial que cobre a parede torácica anterior.",
    "Aduz e roda medialmente o úmero.",
    "Participa dos movimentos de empurrar."
   ],
   [
    "Deltoide",
    "Músculo triangular que recobre a articulação do ombro.",
    "Abduz o braço, com porções que contribuem para flexão e extensão.",
    "A aplicação intramuscular exige conhecimento dos marcos anatômicos."
   ],
   [
    "Bíceps braquial",
    "Músculo anterior do braço com duas cabeças.",
    "Flexiona o cotovelo e supina o antebraço.",
    "Seu tendão distal é palpável na fossa cubital."
   ],
   [
    "Reto do abdome",
    "Músculo longitudinal da parede abdominal anterior.",
    "Flexiona o tronco e estabiliza a parede abdominal.",
    "É envolvido pela bainha do reto."
   ],
   [
    "Oblíquo externo",
    "Músculo superficial das paredes laterais do abdome.",
    "Roda e flexiona o tronco e auxilia a compressão abdominal.",
    "Contribui para a formação da aponeurose abdominal."
   ],
   [
    "Quadríceps femoral",
    "Conjunto de quatro músculos da região anterior da coxa.",
    "Estende o joelho; o reto femoral também auxilia na flexão do quadril.",
    "Seu tendão se relaciona à patela."
   ],
   [
    "Tibial anterior",
    "Músculo da face anterolateral da perna.",
    "Realiza dorsiflexão e inversão do pé.",
    "Sua função é avaliada na marcha sobre os calcanhares."
   ]
  ]
 },
 {
  "id": "musculos-posterior",
  "title": "Músculos — vista posterior",
  "short": "Musculatura posterior",
  "file": "1105 Anterior and Posterior Views of Muscles.jpg",
  "spots": [
   [
    "Trapézio",
    "Músculo superficial que ocupa nuca e parte superior das costas.",
    "Move e estabiliza a escápula.",
    "A fraqueza pode prejudicar a elevação do ombro."
   ],
   [
    "Latíssimo do dorso",
    "Músculo amplo da região posterior do tronco.",
    "Estende, aduz e roda medialmente o braço.",
    "Ativo em movimentos de puxada."
   ],
   [
    "Romboides",
    "Músculos profundos entre coluna e borda medial da escápula.",
    "Retraem e estabilizam a escápula.",
    "Participam da postura escapular."
   ],
   [
    "Tríceps braquial",
    "Músculo posterior do braço, com três cabeças.",
    "É principal extensor do cotovelo.",
    "Relaciona-se ao nervo radial."
   ],
   [
    "Eretores da espinha",
    "Grupo muscular longitudinal ao longo da coluna.",
    "Promove extensão e estabilidade vertebral.",
    "Importante para manutenção da postura."
   ],
   [
    "Glúteo máximo",
    "Músculo volumoso da região glútea.",
    "Estende e roda lateralmente o quadril.",
    "Muito ativo na subida de escadas."
   ],
   [
    "Gastrocnêmio",
    "Músculo superficial da panturrilha.",
    "Realiza flexão plantar e auxilia a flexão do joelho.",
    "Integra o tendão calcâneo com o sóleo."
   ]
  ]
 },
 {
  "id": "musculos-face",
  "title": "Músculos da face e pescoço",
  "short": "Face e pescoço",
  "file": "Facial muscles.jpg",
  "spots": [
   [
    "Frontal",
    "Ventre frontal do músculo occipitofrontal.",
    "Eleva sobrancelhas e produz rugas horizontais na testa.",
    "Inervado pelo nervo facial."
   ],
   [
    "Orbicular dos olhos",
    "Músculo circular ao redor das órbitas.",
    "Promove fechamento das pálpebras.",
    "Sua contração protege a superfície ocular."
   ],
   [
    "Orbicular da boca",
    "Músculo que circunda a abertura oral.",
    "Fecha e projeta os lábios.",
    "Participa de fala, sucção e expressão."
   ],
   [
    "Masseter",
    "Músculo espesso da face lateral da mandíbula.",
    "Eleva a mandíbula durante a mastigação.",
    "Inervado pelo nervo mandibular do trigêmeo."
   ],
   [
    "Temporal",
    "Músculo mastigatório que recobre a fossa temporal.",
    "Eleva e retrai a mandíbula.",
    "Seu tendão insere-se no processo coronoide."
   ],
   [
    "Esternocleidomastoideo",
    "Músculo superficial bilateral do pescoço.",
    "Flexiona o pescoço e roda a cabeça contralateralmente quando unilateral.",
    "Inervação motora pelo nervo acessório."
   ],
   [
    "Platisma",
    "Músculo superficial delgado da parte anterior do pescoço.",
    "Tensiona a pele cervical e auxilia movimentos da mandíbula.",
    "É um músculo da expressão facial."
   ]
  ]
 },
 {
  "id": "musculos-superiores",
  "title": "Músculos dos membros superiores",
  "short": "Membro superior",
  "file": "Illu upper extremity muscles.jpg",
  "spots": [
   [
    "Deltoide",
    "Músculo que cobre o ombro.",
    "Abduz o braço e auxilia em diversos movimentos glenoumerais.",
    "A integridade do nervo axilar influencia sua função."
   ],
   [
    "Bíceps braquial",
    "Músculo anterior do braço de duas cabeças.",
    "Flexiona o cotovelo e supina o antebraço.",
    "Inervado pelo nervo musculocutâneo."
   ],
   [
    "Braquial",
    "Músculo profundo ao bíceps na face anterior do braço.",
    "É flexor potente do cotovelo.",
    "Atua independentemente da posição do antebraço."
   ],
   [
    "Tríceps braquial",
    "Músculo posterior do braço.",
    "Estende o cotovelo.",
    "Inervado pelo nervo radial."
   ],
   [
    "Braquiorradial",
    "Músculo superficial da face lateral do antebraço.",
    "Flexiona o cotovelo, sobretudo na posição neutra.",
    "É referência da região lateral do antebraço."
   ],
   [
    "Flexores do punho",
    "Grupo anterior do antebraço.",
    "Promove flexão da mão e auxilia preensão.",
    "O nervo mediano participa da inervação de vários flexores."
   ],
   [
    "Extensores dos dedos",
    "Músculos posteriores do antebraço.",
    "Estendem os dedos e ajudam a estabilizar o punho.",
    "Dependem principalmente de ramos do nervo radial."
   ]
  ]
 },
 {
  "id": "musculos-inferiores",
  "title": "Músculos dos membros inferiores",
  "short": "Membro inferior",
  "file": "1105 Anterior and Posterior Views of Muscles.jpg",
  "spots": [
   [
    "Glúteo médio",
    "Músculo lateral do quadril, parcialmente profundo ao glúteo máximo.",
    "Abduz a coxa e estabiliza a pelve ao caminhar.",
    "Fraqueza pode produzir sinal de Trendelenburg."
   ],
   [
    "Iliopsoas",
    "Conjunto funcional de psoas maior e ilíaco.",
    "É flexor importante da articulação do quadril.",
    "Relaciona-se à região profunda da virilha."
   ],
   [
    "Quadríceps femoral",
    "Grupo anterior da coxa com quatro componentes.",
    "Estende a articulação do joelho.",
    "A contração é avaliada na extensão contra resistência."
   ],
   [
    "Isquiotibiais",
    "Grupo posterior da coxa, incluindo semitendíneo, semimembranáceo e bíceps femoral.",
    "Flexiona joelho e contribui para extensão do quadril.",
    "A inserção distal ajuda a delimitar a fossa poplítea."
   ],
   [
    "Adutores da coxa",
    "Grupo medial que inclui adutor longo, curto e magno.",
    "Promove adução do quadril.",
    "Lesões podem ocorrer em esforços esportivos."
   ],
   [
    "Gastrocnêmio",
    "Músculo superficial da panturrilha.",
    "Flexiona plantarmente o tornozelo e auxilia flexão do joelho.",
    "Compõe o tendão calcâneo."
   ],
   [
    "Sóleo",
    "Músculo profundo ao gastrocnêmio.",
    "Realiza flexão plantar e auxilia a manutenção postural.",
    "Ativo na sustentação do corpo em pé."
   ]
  ]
 },
 {
  "id": "cerebro",
  "title": "Cérebro e encéfalo",
  "short": "Encéfalo",
  "file": "Brain human sagittal section.svg",
  "spots": [
   [
    "Lobo frontal",
    "Região cortical anterior aos sulcos centrais.",
    "Participa de planejamento, funções executivas e movimento voluntário.",
    "O giro pré-central contém o córtex motor primário."
   ],
   [
    "Lobo parietal",
    "Parte superior e posterior do hemisfério cerebral.",
    "Integra sensações somáticas e informações espaciais.",
    "O giro pós-central contém o córtex somatossensorial primário."
   ],
   [
    "Lobo temporal",
    "Região inferolateral dos hemisférios cerebrais.",
    "Participa da audição, memória e linguagem.",
    "Áreas temporais mediais relacionam-se à memória."
   ],
   [
    "Lobo occipital",
    "Região posterior do córtex cerebral.",
    "Processa informação visual.",
    "Abriga a área visual primária."
   ],
   [
    "Corpo caloso",
    "Grande feixe de fibras comissurais entre hemisférios.",
    "Permite comunicação inter-hemisférica.",
    "É visível em corte sagital mediano."
   ],
   [
    "Cerebelo",
    "Estrutura posterior ao tronco encefálico.",
    "Coordena equilíbrio, postura e precisão do movimento.",
    "Alterações podem gerar ataxia."
   ],
   [
    "Tronco encefálico",
    "Conjunto formado por mesencéfalo, ponte e bulbo.",
    "Conecta encéfalo e medula e abriga núcleos de nervos cranianos.",
    "Contém centros fundamentais para funções automáticas."
   ]
  ]
 },
 {
  "id": "medula-espinal",
  "title": "Medula espinal",
  "short": "Medula",
  "file": "Spinal Cord Sectional Anatomy.png",
  "spots": [
   [
    "Substância cinzenta",
    "Região central da medula, com formato aproximado de H.",
    "Integra circuitos neuronais motores e sensitivos.",
    "Os cornos anteriores contêm neurônios motores somáticos."
   ],
   [
    "Substância branca",
    "Camada externa rica em feixes de axônios mielinizados.",
    "Conduz impulsos ascendentes e descendentes.",
    "Organizada em funículos anterior, lateral e posterior."
   ],
   [
    "Corno posterior",
    "Região posterior da substância cinzenta.",
    "Recebe e processa sinais sensoriais.",
    "Relaciona-se às vias de dor e temperatura."
   ],
   [
    "Corno anterior",
    "Região anterior da substância cinzenta.",
    "Contém corpos celulares de neurônios motores.",
    "Lesões podem provocar fraqueza motora periférica."
   ],
   [
    "Raiz dorsal",
    "Conjunto de fibras sensitivas que entram na medula.",
    "Conduz sinais aferentes ao sistema nervoso central.",
    "Associa-se ao gânglio da raiz dorsal."
   ],
   [
    "Raiz ventral",
    "Feixe de fibras eferentes que sai da medula.",
    "Conduz impulsos motores para a periferia.",
    "Une-se à raiz dorsal para formar nervo espinal."
   ]
  ]
 },
 {
  "id": "nervos-perifericos",
  "title": "Sistema nervoso periférico",
  "short": "Nervos periféricos",
  "file": "202106 Peripheral nervous system.svg",
  "spots": [
   [
    "Nervos cranianos",
    "Doze pares de nervos conectados principalmente ao encéfalo.",
    "Conduzem funções sensitivas, motoras e autonômicas.",
    "A avaliação dos pares cranianos integra o exame neurológico."
   ],
   [
    "Nervos espinais",
    "Trinta e um pares de nervos associados à medula espinal.",
    "Distribuem fibras motoras, sensitivas e autonômicas.",
    "Seus ramos organizam plexos e nervos periféricos."
   ],
   [
    "Plexo braquial",
    "Rede nervosa formada principalmente pelos ramos anteriores de C5 a T1.",
    "Inerva grande parte do membro superior.",
    "Lesões podem causar déficits sensitivos e motores do braço."
   ],
   [
    "Nervo mediano",
    "Nervo do membro superior formado pelo plexo braquial.",
    "Inerva músculos do antebraço e mão e regiões cutâneas.",
    "Pode sofrer compressão no túnel do carpo."
   ],
   [
    "Nervo ciático",
    "Maior nervo do corpo, oriundo do plexo sacral.",
    "Inerva, por seus ramos, grande parte da perna e pé.",
    "Sua trajetória é importante na avaliação de dor irradiada."
   ],
   [
    "Sistema autônomo",
    "Componentes simpático e parassimpático de regulação visceral.",
    "Modula frequência cardíaca, secreções e motilidade visceral.",
    "Atua de forma involuntária."
   ]
  ]
 },
 {
  "id": "coracao",
  "title": "Coração — câmaras e válvulas",
  "short": "Coração",
  "file": "Heart chambers and valves schematic.svg",
  "spots": [
   [
    "Átrio direito",
    "Câmara superior direita que recebe sangue venoso sistêmico.",
    "Encaminha o sangue ao ventrículo direito.",
    "Recebe sangue das veias cavas e do seio coronário."
   ],
   [
    "Ventrículo direito",
    "Câmara inferior direita do coração.",
    "Bombeia sangue para o tronco pulmonar.",
    "Sua saída é regulada pela valva pulmonar."
   ],
   [
    "Átrio esquerdo",
    "Câmara superior esquerda do coração.",
    "Recebe sangue oxigenado das veias pulmonares.",
    "Comunica-se com o ventrículo esquerdo pela valva mitral."
   ],
   [
    "Ventrículo esquerdo",
    "Câmara inferior esquerda com miocárdio espesso.",
    "Impulsiona sangue para a circulação sistêmica pela aorta.",
    "Relaciona-se ao ápice cardíaco."
   ],
   [
    "Valva tricúspide",
    "Valva atrioventricular direita formada por três cúspides.",
    "Ajuda a evitar refluxo ventricular para o átrio direito.",
    "Integra o conjunto de válvulas cardíacas."
   ],
   [
    "Valva mitral",
    "Valva atrioventricular esquerda com dois folhetos.",
    "Evita refluxo para o átrio esquerdo durante a sístole.",
    "Conhecida também como valva bicúspide."
   ],
   [
    "Aorta",
    "Principal artéria sistêmica originada do ventrículo esquerdo.",
    "Distribui sangue oxigenado ao organismo.",
    "Suas porções incluem ascendente, arco e descendente."
   ]
  ]
 },
 {
  "id": "vasos-sanguineos",
  "title": "Artérias, veias e circulação",
  "short": "Circulação",
  "file": "Circulatory System en.svg",
  "spots": [
   [
    "Aorta",
    "Maior artéria da circulação sistêmica.",
    "Distribui o sangue bombeado pelo ventrículo esquerdo.",
    "Ramifica-se em grandes vasos arteriais."
   ],
   [
    "Artérias carótidas",
    "Grandes artérias cervicais que irrigam cabeça e pescoço.",
    "Conduzem sangue para encéfalo e estruturas craniofaciais.",
    "A carótida comum bifurca-se em interna e externa."
   ],
   [
    "Artéria subclávia",
    "Artéria que segue sob a clavícula em direção ao membro superior.",
    "Fornece sangue ao membro superior e ramos cervicais.",
    "Continua como artéria axilar."
   ],
   [
    "Artérias renais",
    "Ramos pares da aorta abdominal.",
    "Conduzem sangue para os rins.",
    "São referência no estudo da vascularização renal."
   ],
   [
    "Veia cava superior",
    "Grande veia formada pelas veias braquiocefálicas.",
    "Drena regiões superiores do corpo para o átrio direito.",
    "Sua desembocadura ocorre no átrio direito."
   ],
   [
    "Veia cava inferior",
    "Grande veia abdominal que drena os membros inferiores e vísceras.",
    "Retorna sangue da metade inferior do corpo ao coração.",
    "Passa pelo diafragma antes de atingir o átrio direito."
   ],
   [
    "Vasos capilares",
    "Microscópicos vasos entre arteríolas e vênulas.",
    "Permitem trocas de gases, nutrientes e metabólitos.",
    "Possuem paredes endoteliais delgadas."
   ]
  ]
 },
 {
  "id": "pulmoes",
  "title": "Pulmões e vias respiratórias",
  "short": "Respiratório",
  "file": "Respiratory system complete numbered.svg",
  "spots": [
   [
    "Cavidade nasal",
    "Região de entrada de ar pelas fossas nasais.",
    "Filtra, aquece e umidifica o ar inspirado.",
    "A mucosa nasal possui importante vascularização."
   ],
   [
    "Faringe",
    "Canal musculomembranoso entre cavidades nasal, oral e laringe.",
    "Participa da condução do ar e do alimento.",
    "Subdivide-se em nasofaringe, orofaringe e laringofaringe."
   ],
   [
    "Laringe",
    "Conjunto cartilaginoso situado acima da traqueia.",
    "Protege a via aérea e participa da fonação.",
    "Contém as pregas vocais."
   ],
   [
    "Traqueia",
    "Tubo respiratório reforçado por anéis cartilaginosos.",
    "Conduz ar até os brônquios principais.",
    "Bifurca-se na carina."
   ],
   [
    "Brônquios principais",
    "Dois ramos que surgem na bifurcação da traqueia.",
    "Conduzem ar aos pulmões direito e esquerdo.",
    "O brônquio direito tende a ser mais vertical."
   ],
   [
    "Pulmões",
    "Órgãos pareados de trocas gasosas torácicas.",
    "Permitem oxigenação do sangue e eliminação de dióxido de carbono.",
    "O pulmão direito possui três lobos; o esquerdo geralmente dois."
   ],
   [
    "Alvéolos",
    "Pequenas unidades aéreas terminais do pulmão.",
    "São local importante de difusão de oxigênio e gás carbônico.",
    "Relacionam-se diretamente aos capilares pulmonares."
   ]
  ]
 },
 {
  "id": "sistema-digestorio",
  "title": "Sistema digestório",
  "short": "Digestório",
  "file": "Digestive system diagram en.svg",
  "spots": [
   [
    "Esôfago",
    "Tubo muscular entre faringe e estômago.",
    "Transporta bolo alimentar por peristaltismo.",
    "Atravessa o diafragma pelo hiato esofágico."
   ],
   [
    "Estômago",
    "Órgão muscular situado principalmente no quadrante superior esquerdo.",
    "Armazena e mistura alimentos com secreções gástricas.",
    "Possui cárdia, fundo, corpo e região pilórica."
   ],
   [
    "Duodeno",
    "Primeiro segmento do intestino delgado.",
    "Recebe quimo, bile e secreções pancreáticas.",
    "Contorna parte da cabeça do pâncreas."
   ],
   [
    "Jejuno e íleo",
    "Segmentos distais do intestino delgado.",
    "Realizam grande parte da absorção de nutrientes.",
    "O íleo terminal conecta-se ao ceco."
   ],
   [
    "Cólon",
    "Porção principal do intestino grosso.",
    "Absorve água e participa da formação das fezes.",
    "Divide-se em ascendente, transverso, descendente e sigmoide."
   ],
   [
    "Reto",
    "Porção final do intestino grosso.",
    "Armazena fezes antes da defecação.",
    "Continua-se com o canal anal."
   ],
   [
    "Apêndice vermiforme",
    "Tubo estreito ligado ao ceco.",
    "Contém tecido linfoide e possui função imunológica.",
    "Sua posição pode variar anatomicamente."
   ]
  ]
 },
 {
  "id": "figado-pancreas",
  "title": "Fígado, pâncreas e vias biliares",
  "short": "Hepatobiliar",
  "file": "Location of the Gallbladder, Liver, and Pancreas.png",
  "spots": [
   [
    "Fígado",
    "Maior glândula do corpo, situada predominantemente no hipocôndrio direito.",
    "Participa do metabolismo, síntese proteica, detoxificação e produção de bile.",
    "A veia porta transporta sangue esplâncnico ao fígado."
   ],
   [
    "Lobo direito hepático",
    "Maior lobo anatômico do fígado.",
    "Contribui para funções metabólicas e excretoras hepáticas.",
    "Está relacionado ao diafragma e à vesícula biliar."
   ],
   [
    "Vesícula biliar",
    "Reservatório de bile na face visceral do fígado.",
    "Armazena e concentra bile entre refeições.",
    "Conecta-se ao ducto cístico."
   ],
   [
    "Ducto colédoco",
    "Canal biliar formado pela união de ductos hepático comum e cístico.",
    "Conduz bile para o duodeno.",
    "Relaciona-se à cabeça do pâncreas."
   ],
   [
    "Pâncreas",
    "Glândula alongada retroperitoneal e parcialmente posterior ao estômago.",
    "Libera enzimas digestivas e hormônios como insulina.",
    "Sua cabeça está abraçada pelo duodeno."
   ],
   [
    "Ducto pancreático",
    "Conduto principal das secreções exócrinas pancreáticas.",
    "Leva enzimas e bicarbonato ao duodeno.",
    "Pode desembocar junto ao colédoco na papila duodenal maior."
   ]
  ]
 },
 {
  "id": "sistema-urinario",
  "title": "Rins e sistema urinário",
  "short": "Urinário",
  "file": "Urinary system.svg",
  "spots": [
   [
    "Rins",
    "Órgãos retroperitoneais pares.",
    "Filtram o plasma e participam do controle hidroeletrolítico.",
    "Constituídos por córtex e medula renais."
   ],
   [
    "Córtex renal",
    "Camada externa do parênquima renal.",
    "Contém corpúsculos renais e partes dos túbulos.",
    "É importante na filtração glomerular."
   ],
   [
    "Medula renal",
    "Região interna formada por pirâmides renais.",
    "Participa da concentração da urina.",
    "As papilas drenam para cálices menores."
   ],
   [
    "Pelve renal",
    "Cavidade coletora proximal do ureter.",
    "Recebe urina dos cálices renais.",
    "Localiza-se próximo ao hilo renal."
   ],
   [
    "Ureteres",
    "Dois tubos musculares entre rins e bexiga.",
    "Transportam urina por peristaltismo.",
    "Possuem pontos de estreitamento anatômico."
   ],
   [
    "Bexiga urinária",
    "Órgão muscular oco na pelve.",
    "Armazena urina até a micção.",
    "O músculo detrusor forma sua parede."
   ],
   [
    "Uretra",
    "Canal que conduz urina da bexiga ao exterior.",
    "Realiza esvaziamento urinário.",
    "Seu comprimento e relações variam conforme a anatomia reprodutiva."
   ]
  ]
 },
 {
  "id": "reprodutor-feminino",
  "title": "Sistema reprodutor feminino",
  "short": "Reprodutor feminino",
  "file": "Female reproductive system - anterior view.svg",
  "spots": [
   [
    "Ovário",
    "Gônada feminina situada na pelve.",
    "Produz oócitos e hormônios sexuais.",
    "Relacionado ao ligamento próprio do ovário."
   ],
   [
    "Tuba uterina",
    "Ducto muscular entre região ovariana e útero.",
    "Transporta o oócito e é local frequente da fecundação.",
    "Possui infundíbulo, ampola, istmo e parte uterina."
   ],
   [
    "Útero",
    "Órgão muscular pélvico de parede espessa.",
    "Participa da gestação e da menstruação.",
    "Divide-se em fundo, corpo e colo."
   ],
   [
    "Endométrio",
    "Revestimento mucoso interno do útero.",
    "Sofre alterações cíclicas em resposta a hormônios.",
    "Sua camada funcional é eliminada na menstruação."
   ],
   [
    "Colo uterino",
    "Porção inferior estreita do útero.",
    "Conecta cavidade uterina e vagina.",
    "Contém canal cervical e orifícios interno e externo."
   ],
   [
    "Vagina",
    "Canal fibromuscular entre colo uterino e vestíbulo.",
    "Participa de relações sexuais, menstruação e parto vaginal.",
    "Situa-se posterior à uretra e à bexiga."
   ]
  ]
 },
 {
  "id": "reprodutor-masculino",
  "title": "Sistema reprodutor masculino",
  "short": "Reprodutor masculino",
  "file": "Human male reproductive system en.svg",
  "spots": [
   [
    "Testículo",
    "Gônada masculina localizada no escroto.",
    "Produz espermatozoides e testosterona.",
    "Contém túbulos seminíferos."
   ],
   [
    "Epidídimo",
    "Ducto enrolado associado à margem posterior testicular.",
    "Participa da maturação e armazenamento de espermatozoides.",
    "Continua-se com o ducto deferente."
   ],
   [
    "Ducto deferente",
    "Canal muscular do trato genital masculino.",
    "Transporta espermatozoides durante a emissão.",
    "Integra o cordão espermático."
   ],
   [
    "Vesícula seminal",
    "Glândula par situada posteriormente à bexiga.",
    "Contribui com parte do líquido seminal.",
    "Seu ducto une-se ao deferente formando o ejaculatório."
   ],
   [
    "Próstata",
    "Glândula localizada abaixo da bexiga, ao redor da uretra prostática.",
    "Produz componentes do líquido seminal.",
    "Possui relações estreitas com colo vesical e reto."
   ],
   [
    "Pênis",
    "Órgão genital externo com corpos cavernosos e corpo esponjoso.",
    "Participa de micção e função sexual.",
    "A uretra esponjosa percorre o corpo esponjoso."
   ]
  ]
 },
 {
  "id": "endocrino",
  "title": "Sistema endócrino",
  "short": "Endócrino",
  "file": "Endocrine system.svg",
  "spots": [
   [
    "Hipotálamo",
    "Região do diencéfalo conectada à hipófise.",
    "Integra controle endócrino, autonômico e homeostático.",
    "Produz hormônios liberadores e inibidores."
   ],
   [
    "Hipófise",
    "Glândula endócrina situada na sela túrcica.",
    "Coordena eixos hormonais por meio de suas porções.",
    "A neuro-hipófise libera ADH e ocitocina produzidos no hipotálamo."
   ],
   [
    "Tireoide",
    "Glândula cervical anterior à traqueia.",
    "Produz T3, T4 e calcitonina.",
    "Sua regulação hormonal envolve TSH."
   ],
   [
    "Paratireoides",
    "Pequenas glândulas geralmente posteriores à tireoide.",
    "Liberam PTH para regulação do cálcio.",
    "A anatomia e o número podem variar."
   ],
   [
    "Suprarrenais",
    "Glândulas situadas sobre os polos superiores renais.",
    "Córtex produz esteroides; medula, catecolaminas.",
    "Separadas em córtex e medula."
   ],
   [
    "Ilhotas pancreáticas",
    "Conjuntos endócrinos distribuídos pelo pâncreas.",
    "Secretam insulina, glucagon e outros hormônios.",
    "Atuam na regulação metabólica."
   ]
  ]
 },
 {
  "id": "olho",
  "title": "Olho — anatomia ocular",
  "short": "Olho",
  "file": "Schematic diagram of the human eye.svg",
  "spots": [
   [
    "Córnea",
    "Estrutura transparente e avascular anterior ao globo ocular.",
    "Contribui fortemente para a refração da luz.",
    "Possui rica inervação sensitiva."
   ],
   [
    "Íris",
    "Diafragma pigmentado com abertura pupilar central.",
    "Controla a quantidade de luz que entra no olho.",
    "Seus músculos ajustam o diâmetro pupilar."
   ],
   [
    "Cristalino",
    "Lente biconvexa transparente posterior à íris.",
    "Ajusta o foco das imagens na retina.",
    "Sua acomodação depende do músculo ciliar."
   ],
   [
    "Retina",
    "Camada neural interna do globo ocular.",
    "Converte luz em sinais elétricos.",
    "Contém fotorreceptores cones e bastonetes."
   ],
   [
    "Mácula",
    "Região central da retina responsável pela visão de detalhes.",
    "Permite alta acuidade visual.",
    "A fóvea fica no centro da mácula."
   ],
   [
    "Nervo óptico",
    "Feixe de axônios de células ganglionares retinianas.",
    "Transmite informação visual ao encéfalo.",
    "Corresponde ao segundo nervo craniano."
   ]
  ]
 },
 {
  "id": "ouvido",
  "title": "Ouvido e equilíbrio",
  "short": "Ouvido",
  "file": "Ear-anatomy.svg",
  "spots": [
   [
    "Pavilhão auricular",
    "Estrutura cartilaginosa externa da orelha.",
    "Auxilia a captação e direcionamento de ondas sonoras.",
    "É revestido por pele."
   ],
   [
    "Meato acústico externo",
    "Canal entre concha auricular e membrana timpânica.",
    "Conduz som ao tímpano.",
    "Contém glândulas produtoras de cerume."
   ],
   [
    "Membrana timpânica",
    "Membrana que separa o ouvido externo do médio.",
    "Vibra em resposta às ondas sonoras.",
    "Relaciona-se ao cabo do martelo."
   ],
   [
    "Ossículos auditivos",
    "Martelo, bigorna e estribo na cavidade timpânica.",
    "Transmitem vibrações ao ouvido interno.",
    "O estribo comunica vibrações à janela oval."
   ],
   [
    "Cóclea",
    "Estrutura espiralada do ouvido interno.",
    "Converte vibrações sonoras em sinais neurais.",
    "Contém o órgão espiral de Corti."
   ],
   [
    "Canais semicirculares",
    "Estruturas do labirinto membranoso e ósseo.",
    "Detectam acelerações angulares da cabeça.",
    "Participam da função vestibular."
   ]
  ]
 },
 {
  "id": "pele",
  "title": "Pele e anexos cutâneos",
  "short": "Pele",
  "file": "Human Skin Structure-FR.svg",
  "spots": [
   [
    "Epiderme",
    "Camada epitelial externa da pele.",
    "Atua como barreira contra perda hídrica e agentes externos.",
    "Composta principalmente por queratinócitos."
   ],
   [
    "Derme",
    "Camada conjuntiva abaixo da epiderme.",
    "Fornece resistência mecânica, nutrição e sensibilidade.",
    "Contém vasos, nervos e anexos cutâneos."
   ],
   [
    "Hipoderme",
    "Tecido subcutâneo predominantemente conjuntivo e adiposo.",
    "Favorece isolamento térmico e amortecimento.",
    "Sua espessura varia conforme a região."
   ],
   [
    "Folículo piloso",
    "Invaginação epidérmica que produz pelos.",
    "Participa da proteção e da sensibilidade cutânea.",
    "Relaciona-se ao músculo eretor do pelo."
   ],
   [
    "Glândula sudorípara",
    "Glândula exócrina presente na pele.",
    "Contribui para termorregulação e secreção.",
    "As glândulas écrinas distribuem-se amplamente."
   ],
   [
    "Glândula sebácea",
    "Glândula geralmente associada a folículos pilosos.",
    "Produz sebo para lubrificação cutânea.",
    "Mais abundante em face e couro cabeludo."
   ]
  ]
 },
 {
  "id": "linfatico",
  "title": "Sistema linfático e imunidade",
  "short": "Linfático",
  "file": "TE-Lymphatic system diagram.svg",
  "spots": [
   [
    "Vasos linfáticos",
    "Rede de vasos que recolhe líquido intersticial.",
    "Devolve líquido e proteínas à circulação venosa.",
    "Possuem válvulas que favorecem fluxo unidirecional."
   ],
   [
    "Linfonodos",
    "Pequenos órgãos linfoides distribuídos ao longo dos vasos.",
    "Filtram linfa e participam da resposta imune.",
    "Grupos cervicais, axilares e inguinais são marcos clínicos."
   ],
   [
    "Baço",
    "Órgão linfoide situado no hipocôndrio esquerdo.",
    "Filtra sangue e participa da resposta imunológica.",
    "Não é responsável pela drenagem primária da linfa tecidual."
   ],
   [
    "Timo",
    "Órgão linfoide primário localizado no mediastino anterior.",
    "Participa da maturação dos linfócitos T.",
    "Sofre involução relativa após a puberdade."
   ],
   [
    "Tonsilas",
    "Agregados de tecido linfoide ao redor da faringe.",
    "Participam da defesa imune local.",
    "Incluem tonsilas palatinas, faríngea e linguais."
   ],
   [
    "Ducto torácico",
    "Principal tronco de drenagem linfática do corpo.",
    "Desemboca na junção venosa esquerda.",
    "Drena a maior parte do corpo, exceto quadrante superior direito."
   ]
  ]
 }
];
export const expandedAtlasViews:AtlasView[]=sources.map(source=>({
 id:source.id,title:source.title,short:source.short,
 subtitle:"Estude as principais estruturas com imagem de referência, descrição, função e correlação clínica.",
 image:image(source.file),source:commons(source.file),
 credit:"Ilustração do acervo Wikimedia Commons · autoria e condições de uso descritas no arquivo original",
 ratio:"4 / 5",alt:"Ilustração de referência para "+source.title,
 spotMode:"list",
 spots:source.spots.map(([name,description,functionText,clinical],i):AtlasSpot=>({
  id:source.id+"-"+i,name,description,function:functionText,clinical,group:source.short,x:50,y:50
 }))
}));
