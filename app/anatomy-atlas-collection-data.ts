export type AtlasSpot={
 id:string;name:string;group:string;x:number;y:number;
 description:string;function:string;clinical:string;aliases?:string[];
};
export type AtlasView={
 id:string;title:string;short:string;subtitle:string;image:string;source:string;
 credit:string;ratio:string;alt:string;background?:string;spots:AtlasSpot[];
};
export const atlasViews:AtlasView[]=[
 {
  id:"posterior",title:"Esqueleto — vista posterior",short:"Vista posterior",
  subtitle:"Explore escápulas, coluna, pelve e ossos dos membros vistos por trás.",
  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/500px-Human_skeleton_back_no-text_no-color.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:Human_skeleton_back_no-text_no-color.svg",
  credit:"Mariana Ruiz Villarreal (LadyofHats) · Wikimedia Commons · domínio público",
  ratio:"343 / 807",alt:"Ilustração em vista posterior do esqueleto humano sem legendas",
  spots:[
   {id:"occipital",name:"Osso occipital",group:"Crânio",x:50,y:8,description:"Forma a porção posterior e inferior do neurocrânio e contém o forame magno.",function:"Protege a região posterior do encéfalo e contribui para a articulação com a primeira vértebra cervical.",clinical:"O forame magno permite a continuidade entre encéfalo e medula espinal.",aliases:["occipital"]},
   {id:"escapula",name:"Escápula",group:"Cintura escapular",x:36,y:25,description:"Osso plano triangular sobre a parede torácica posterior, articulado ao úmero e à clavícula.",function:"Participa da estabilidade e da mobilidade da cintura escapular.",clinical:"A espinha da escápula é um marco palpável da superfície posterior do ombro."},
   {id:"costelas-post",name:"Costelas posteriores",group:"Tórax",x:62,y:31,description:"Arcos ósseos articulados posteriormente às vértebras torácicas.",function:"Compõem a caixa torácica e participam da mecânica respiratória.",clinical:"Os ângulos costais são marcos anatômicos utilizados na avaliação do tórax.",aliases:["costelas"]},
   {id:"vertebras-toracicas",name:"Vértebras torácicas",group:"Coluna",x:50,y:33,description:"Doze vértebras que se articulam com as costelas na região torácica.",function:"Oferecem suporte ao tronco e protegem a medula espinal.",clinical:"A região torácica corresponde à porção da coluna associada à caixa torácica.",aliases:["coluna toracica","toracicas"]},
   {id:"umero-posterior",name:"Úmero",group:"Braço",x:24,y:38,description:"Osso longo do braço, situado entre a escápula e os ossos do antebraço.",function:"Transmite forças entre ombro e cotovelo.",clinical:"O sulco do nervo radial é uma relação anatômica importante na face posterior do úmero.",aliases:["umero"]},
   {id:"lombares",name:"Vértebras lombares",group:"Coluna",x:50,y:46,description:"Cinco vértebras robustas entre a região torácica e o sacro.",function:"Suportam grande parte das cargas do tronco e permitem movimentos da coluna.",clinical:"São maiores que as cervicais por sua função de sustentação.",aliases:["coluna lombar","lombares"]},
   {id:"sacro-post",name:"Sacro",group:"Pelve",x:50,y:56,description:"Osso triangular formado pela fusão das vértebras sacrais.",function:"Conecta a coluna à pelve por meio das articulações sacroilíacas.",clinical:"A crista sacral mediana é visível na face posterior.",aliases:["osso sacro"]},
   {id:"pelve-post",name:"Osso do quadril",group:"Pelve",x:34,y:54,description:"Osso coxal formado por ílio, ísquio e púbis.",function:"Transfere carga do tronco aos membros inferiores.",clinical:"A crista ilíaca é um importante marco anatômico palpável.",aliases:["pelve","osso coxal"]},
   {id:"femur-post",name:"Fêmur",group:"Coxa",x:39,y:69,description:"Osso longo da coxa, que se articula proximalmente com o acetábulo.",function:"Sustentação e alavanca para a locomoção.",clinical:"Os côndilos femorais participam da articulação do joelho.",aliases:["femur"]},
   {id:"tibia-post",name:"Tíbia",group:"Perna",x:43,y:85,description:"Osso medial e principal suporte de carga da perna.",function:"Transmite carga do joelho ao tornozelo.",clinical:"O maléolo medial é formado pela extremidade distal da tíbia.",aliases:["tibia"]},
   {id:"calcaneo-post",name:"Calcâneo",group:"Pé",x:43,y:95,description:"Maior osso do tarso, situado na região do calcanhar.",function:"Recebe cargas do retropé e oferece inserção ao tendão calcâneo.",clinical:"O tendão calcâneo insere-se na sua tuberosidade posterior.",aliases:["calcaneo"]}
  ]
 },
 {
  id:"cranio",title:"Crânio — ossos da face e neurocrânio",short:"Crânio",
  subtitle:"Reconheça os principais ossos visíveis na vista frontal do crânio.",
  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Human_skull_front_bones.svg/500px-Human_skull_front_bones.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:Human_skull_front_bones.svg",
  credit:"Mariana Ruiz Villarreal (LadyofHats) · Wikimedia Commons · domínio público",
  ratio:"695 / 563",alt:"Ilustração anatômica frontal do crânio humano",
  spots:[
   {id:"frontal",name:"Osso frontal",group:"Neurocrânio",x:64,y:18,description:"Forma a fronte, parte do teto orbitário e a porção anterior do neurocrânio.",function:"Protege os lobos frontais e compõe o limite superior das órbitas.",clinical:"A região supraorbitária é um importante marco de referência."},
   {id:"parietal",name:"Osso parietal",group:"Neurocrânio",x:41,y:32,description:"Osso pareado situado principalmente na calvária e na parede superolateral do crânio.",function:"Forma grande parte do teto e das paredes laterais da caixa craniana.",clinical:"Encontra o frontal na sutura coronal."},
   {id:"temporal",name:"Osso temporal",group:"Neurocrânio",x:82,y:41,description:"Osso lateral e inferior do crânio, incluindo a porção petrosa.",function:"Abriga estruturas do ouvido e participa da articulação temporomandibular.",clinical:"O processo mastoide é um marco ósseo palpável."},
   {id:"nasal",name:"Osso nasal",group:"Face",x:63,y:49,description:"Par de ossos pequenos que forma a ponte óssea do nariz.",function:"Dá suporte à porção superior do dorso nasal.",clinical:"A ponte nasal é formada pelo encontro dos ossos nasais."},
   {id:"zigomatico",name:"Osso zigomático",group:"Face",x:83,y:60,description:"Osso proeminente da região malar, articulado ao maxilar e ao temporal.",function:"Contribui para a parede lateral da órbita e para o arco zigomático.",clinical:"A proeminência da maçã do rosto corresponde ao zigomático.",aliases:["zigomatico","malar"]},
   {id:"maxila",name:"Maxila",group:"Face",x:63,y:69,description:"Osso pareado da face que sustenta a arcada dentária superior.",function:"Forma parte do palato duro, do assoalho da órbita e da cavidade nasal.",clinical:"A região alveolar da maxila abriga os dentes superiores."},
   {id:"mandibula-cranio",name:"Mandíbula",group:"Face",x:64,y:87,description:"Único osso móvel do crânio fora dos ossículos da audição.",function:"Sustenta os dentes inferiores e participa da mastigação e da fala.",clinical:"Os côndilos mandibulares articulam-se com os ossos temporais.",aliases:["mandibula"]}
  ]
 },
 {
  id:"coluna",title:"Coluna vertebral",short:"Coluna",
  subtitle:"Identifique as regiões vertebrais e suas transições anatômicas.",
  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Vertebral_column_%28PSF%29.png/500px-Vertebral_column_%28PSF%29.png",
  source:"https://commons.wikimedia.org/wiki/File:Vertebral_column_(PSF).png",
  credit:"Pearson Scott Foresman · Wikimedia Commons · domínio público",
  ratio:"3138 / 4015",alt:"Ilustração didática de coluna vertebral humana",
  spots:[
   {id:"cervicais",name:"Vértebras cervicais",group:"Região cervical",x:42,y:22,description:"Sete vértebras, de C1 a C7, na região do pescoço.",function:"Sustentam a cabeça e possibilitam movimentos da coluna cervical.",clinical:"Atlas (C1) e áxis (C2) têm anatomia especializada.",aliases:["coluna cervical","cervical"]},
   {id:"atlas-vertebra",name:"Atlas (C1)",group:"Região cervical",x:42,y:15,description:"Primeira vértebra cervical, de formato anular, sem corpo vertebral típico.",function:"Sustenta o crânio e participa da flexoextensão da cabeça.",clinical:"Articula-se com os côndilos occipitais." ,aliases:["c1","atlas"]},
   {id:"toracicas",name:"Vértebras torácicas",group:"Região torácica",x:41,y:43,description:"Doze vértebras, de T1 a T12, associadas às costelas.",function:"Formam a parte torácica da coluna e ajudam a compor a parede posterior do tórax.",clinical:"A presença de facetas costais é característica frequente das vértebras torácicas.",aliases:["coluna toracica","toracicas"]},
   {id:"lombares-coluna",name:"Vértebras lombares",group:"Região lombar",x:41,y:68,description:"Cinco vértebras, de L1 a L5, com corpos volumosos.",function:"Oferecem suporte a grandes cargas e permitem movimentação lombar.",clinical:"A região lombar fica abaixo de T12 e acima do sacro.",aliases:["lombares","coluna lombar"]},
   {id:"sacro-coluna",name:"Sacro",group:"Região sacral",x:40,y:78,description:"Osso formado pela fusão de cinco vértebras sacrais.",function:"Liga a coluna aos ossos do quadril.",clinical:"O canal sacral é continuação do canal vertebral.",aliases:["osso sacro"]},
   {id:"coccix",name:"Cóccix",group:"Extremidade inferior",x:46,y:87,description:"Pequeno conjunto de vértebras geralmente fusionadas abaixo do sacro.",function:"Serve de inserção para ligamentos e músculos do assoalho pélvico.",clinical:"Constitui a extremidade inferior da coluna vertebral.",aliases:["coccix"]}
  ]
 },
 {
  id:"membro-superior",title:"Membro superior — ossos e articulações",short:"Membro superior",
  subtitle:"Da região do braço até os dedos: identifique os ossos principais.",
  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Human_Arm_Bones_%28NIH_BioArt_208_-_630553%29.svg/500px-Human_Arm_Bones_%28NIH_BioArt_208_-_630553%29.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:Human_Arm_Bones_(NIH_BioArt_208_-_630553).svg",
  credit:"Ryan Kissinger / NIAID NIH BioArt · Wikimedia Commons · domínio público nos EUA",
  ratio:"512 / 1042",background:"#110b1e",alt:"Ilustração dos ossos de ambos os membros superiores",
  spots:[
   {id:"umero-ms",name:"Úmero",group:"Braço",x:30,y:25,description:"Osso longo entre ombro e cotovelo.",function:"Age como alavanca para movimentos do braço e integra as articulações do ombro e do cotovelo.",clinical:"A cabeça umeral articula-se com a cavidade glenoidal.",aliases:["umero"]},
   {id:"radio-ms",name:"Rádio",group:"Antebraço",x:20,y:58,description:"Osso lateral do antebraço, do lado do polegar em posição anatômica.",function:"Participa dos movimentos de pronação e supinação e da articulação do punho.",clinical:"A cabeça do rádio participa da articulação radioulnar proximal.",aliases:["radio"]},
   {id:"ulna-ms",name:"Ulna",group:"Antebraço",x:10,y:61,description:"Osso medial do antebraço em posição anatômica.",function:"Forma com o úmero a principal articulação de dobradiça do cotovelo.",clinical:"O olécrano é a projeção óssea palpável na face posterior do cotovelo.",aliases:["cubito"]},
   {id:"carpos-ms",name:"Ossos do carpo",group:"Punho",x:11,y:77,description:"Oito pequenos ossos distribuídos em duas fileiras no punho.",function:"Participam da mobilidade e estabilidade da articulação do punho.",clinical:"O escafoide é um dos ossos do carpo mais estudados em traumatologia.",aliases:["carpo","carpos"]},
   {id:"metacarpos-ms",name:"Metacarpos",group:"Mão",x:10,y:85,description:"Cinco ossos que compõem a estrutura da palma da mão.",function:"Oferecem suporte e transmissão de força para os dedos.",clinical:"Suas cabeças formam parte das articulações metacarpofalângicas.",aliases:["metacarpos","metacarpianos"]},
   {id:"falanges-ms",name:"Falanges da mão",group:"Dedos",x:8,y:94,description:"Ossos dos dedos: três em cada dedo longo e duas no polegar.",function:"Permitem movimentos finos de preensão e manipulação.",clinical:"As articulações interfalângicas contribuem para flexão e extensão dos dedos.",aliases:["falanges","falanges da mao"]}
  ]
 },
 {
  id:"membro-inferior",title:"Membro inferior — ossos e articulações",short:"Membro inferior",
  subtitle:"Da coxa ao pé, reconheça as estruturas responsáveis pela sustentação.",
  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Human_leg_bones_labeled.svg/500px-Human_leg_bones_labeled.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:Human_leg_bones_labeled.svg",
  credit:"Derivado de Mariana Ruiz Villarreal (LadyofHats) · Wikimedia Commons · licença indicada na fonte",
  ratio:"512 / 775",background:"#110b1e",alt:"Ilustração anterior da pelve e de ambos os membros inferiores",
  spots:[
   {id:"femur-mi",name:"Fêmur",group:"Coxa",x:40,y:29,description:"Maior osso longo do corpo humano, entre quadril e joelho.",function:"Transfere carga e participa da locomoção.",clinical:"A cabeça do fêmur encaixa-se no acetábulo.",aliases:["femur"]},
   {id:"patela-mi",name:"Patela",group:"Joelho",x:40,y:52,description:"Osso sesamoide anterior à articulação do joelho.",function:"Aumenta a eficiência mecânica do músculo quadríceps.",clinical:"Integra o mecanismo extensor do joelho.",aliases:["rotula"]},
   {id:"tibia-mi",name:"Tíbia",group:"Perna",x:40,y:70,description:"Osso medial, maior e principal suporte de carga da perna.",function:"Transmite carga do joelho à articulação do tornozelo.",clinical:"O maléolo medial é a projeção distal da tíbia.",aliases:["tibia"]},
   {id:"fibula-mi",name:"Fíbula",group:"Perna",x:32,y:71,description:"Osso lateral e delgado da perna, paralelo à tíbia.",function:"Contribui para a estabilidade do tornozelo e para inserções musculares.",clinical:"Sua porção distal forma o maléolo lateral.",aliases:["fibula","peronio"]},
   {id:"tarsos-mi",name:"Ossos do tarso",group:"Retropé e mediopé",x:39,y:85,description:"Conjunto de sete ossos do tornozelo e da região posterior do pé.",function:"Participam do apoio do peso e da adaptação do pé ao solo.",clinical:"Tálus e calcâneo pertencem ao tarso.",aliases:["tarsos","tarso"]},
   {id:"metatarsos-mi",name:"Metatarsos",group:"Antepé",x:34,y:91,description:"Cinco ossos longos entre tarso e falanges.",function:"Contribuem para os arcos do pé e para a propulsão na marcha.",clinical:"As cabeças metatarsais participam do apoio durante a fase final do passo.",aliases:["metatarsos","metatarsianos"]},
   {id:"falanges-mi",name:"Falanges do pé",group:"Dedos",x:29,y:97,description:"Ossos dos dedos do pé, em geral três por dedo, exceto o hálux.",function:"Auxiliam no equilíbrio e na propulsão durante a marcha.",clinical:"O hálux possui duas falanges.",aliases:["falanges","falanges do pe"]}
  ]
 },
 {
  id:"torax",title:"Tórax — caixa torácica e cintura escapular",short:"Tórax",
  subtitle:"Conheça esterno, costelas, cartilagens costais, clavículas e escápulas na vista anterior.",
  image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Pectoral_girdle_front_diagram.svg/960px-Pectoral_girdle_front_diagram.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:Pectoral_girdle_front_diagram.svg",
  credit:"Mariana Ruiz Villarreal (LadyofHats) · Wikimedia Commons · domínio público",
  ratio:"512 / 402",background:"#110b1e",alt:"Vista frontal da caixa torácica e cintura escapular humana",
  spots:[
   {id:"clavicula-torax",name:"Clavícula",group:"Cintura escapular",x:26,y:15,description:"Osso longo em forma de S situado entre o manúbrio do esterno e o acrômio da escápula.",function:"Mantém o membro superior afastado do tronco e transfere forças ao esqueleto axial.",clinical:"Fraturas no terço médio da clavícula são frequentes; o osso é palpável em quase toda sua extensão.",aliases:["clavicula"]},
   {id:"escapula-torax",name:"Escápula",group:"Cintura escapular",x:78,y:36,description:"Osso plano triangular situado sobre a face posterior da parede torácica.",function:"Fornece ampla superfície de inserção muscular e participa da mobilidade do ombro.",clinical:"A cavidade glenoidal da escápula articula-se com a cabeça do úmero.",aliases:["omoplata"]},
   {id:"manubrio",name:"Manúbrio do esterno",group:"Esterno",x:50,y:24,description:"Parte superior do esterno, onde se articulam as clavículas e as primeiras cartilagens costais.",function:"Compõe a parede anterior do tórax e estabelece conexão com a cintura escapular.",clinical:"A incisura jugular e o ângulo esternal são marcos palpáveis importantes.",aliases:["manubrio"]},
   {id:"corpo-esterno",name:"Corpo do esterno",group:"Esterno",x:54,y:36,description:"Segmento mais extenso do esterno, entre o manúbrio e o processo xifoide.",function:"Fornece articulação às cartilagens de várias costelas e protege estruturas mediastinais.",clinical:"A parede esternal participa da proteção de coração e grandes vasos.",aliases:["esterno","corpo do esterno"]},
   {id:"xifoide",name:"Processo xifoide",group:"Esterno",x:55,y:52,description:"Pequena extremidade inferior do esterno, inicialmente cartilaginosa.",function:"Serve de inserção ao diafragma e a músculos da parede abdominal.",clinical:"A posição do xifoide deve ser respeitada em manobras compressivas no tórax.",aliases:["apendice xifoide","xifoide"]},
   {id:"costelas-verdadeiras",name:"Costelas verdadeiras",group:"Costelas 1–7",x:33,y:37,description:"Os sete primeiros pares de costelas, que se conectam diretamente ao esterno por cartilagens próprias.",function:"Compõem o arcabouço torácico e participam da expansão durante a inspiração.",clinical:"A identificação dos espaços intercostais auxilia em exames físicos.",aliases:["costelas superiores"]},
   {id:"costelas-falsas",name:"Costelas falsas",group:"Costelas 8–10",x:71,y:65,description:"Pares de costelas cujas cartilagens se conectam indiretamente ao esterno pelo arco costal.",function:"Formam a porção inferior móvel da caixa torácica.",clinical:"A margem costal é um marco da transição toracoabdominal.",aliases:["costelas inferiores"]},
   {id:"costelas-flutuantes",name:"Costelas flutuantes",group:"Costelas 11–12",x:40,y:75,description:"Os dois últimos pares de costelas, sem conexão anterior com o esterno.",function:"Protegem parcialmente estruturas posteriores do tronco e servem de inserção muscular.",clinical:"As extremidades anteriores são livres, ao contrário das costelas superiores.",aliases:["flutuantes"]},
   {id:"cartilagens-costais",name:"Cartilagens costais",group:"Junções costocondrais",x:63,y:42,description:"Segmentos de cartilagem hialina que prolongam anteriormente as costelas.",function:"Acrescentam elasticidade à caixa torácica e viabilizam sua movimentação.",clinical:"O ângulo esternal permite localizar a segunda cartilagem costal.",aliases:["cartilagens"]},
   {id:"umero-torax",name:"Úmero proximal",group:"Articulação do ombro",x:14,y:53,description:"Extremidade proximal do osso do braço, relacionada à cavidade glenoidal.",function:"Integra a articulação glenoumeral e permite amplitude de movimentos do ombro.",clinical:"A cabeça do úmero articula-se com a escápula.",aliases:["umero","úmero"]}
  ]
 },
 {
  id:"pelve",title:"Pelve — cintura pélvica e sacro",short:"Pelve",
  subtitle:"Explore as estruturas que ligam a coluna aos membros inferiores.",
  image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/202201_Anterior_view_of_male_pelvis.svg/500px-202201_Anterior_view_of_male_pelvis.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:202201_Anterior_view_of_male_pelvis.svg",
  credit:"DataBase Center for Life Science (DBCLS) · CC BY 4.0 · Wikimedia Commons · vista anterior masculina",
  ratio:"512 / 512",alt:"Ilustração anatômica anterior da pelve óssea masculina",
  spots:[
   {id:"crista-iliaca",name:"Crista ilíaca",group:"Ílio",x:24,y:14,description:"Borda superior curva da asa do ílio.",function:"Oferece inserção a músculos abdominais e do quadril.",clinical:"É um marco ósseo palpável usado na orientação anatômica.",aliases:["crista iliaca"]},
   {id:"ilio-pelve",name:"Ílio",group:"Osso coxal",x:27,y:33,description:"Maior porção superior do osso do quadril, com asa e corpo.",function:"Contribui para a parede lateral da pelve e a transmissão de carga.",clinical:"A face auricular do ílio articula-se com o sacro.",aliases:["ilio"]},
   {id:"sacro-pelve",name:"Sacro",group:"Coluna sacral",x:50,y:42,description:"Osso triangular central formado pela fusão de cinco vértebras sacrais.",function:"Transmite forças da coluna para os ossos do quadril.",clinical:"Articula-se bilateralmente com os ílios por meio das articulações sacroilíacas.",aliases:["osso sacro"]},
   {id:"sacroiliaca-pelve",name:"Articulação sacroilíaca",group:"Articulações",x:63,y:42,description:"Articulação entre a face auricular do sacro e a do ílio.",function:"Transfere cargas com amplitude de movimento limitada.",clinical:"Sua estabilidade depende de ligamentos fortes e da arquitetura articular.",aliases:["sacroiliaca"]},
   {id:"acetabulo-pelve",name:"Acetábulo",group:"Quadril",x:20,y:63,description:"Cavidade lateral do osso coxal formada por ílio, ísquio e púbis.",function:"Recebe a cabeça do fêmur para formar a articulação do quadril.",clinical:"Sua orientação e profundidade influenciam a estabilidade do quadril.",aliases:["acetabulo"]},
   {id:"isquio-pelve",name:"Ísquio",group:"Osso coxal",x:29,y:80,description:"Porção posteroinferior do osso coxal.",function:"Suporta parte do peso corporal ao sentar por meio de sua tuberosidade.",clinical:"A tuberosidade isquiática é palpável na região glútea inferior.",aliases:["isquio"]},
   {id:"pubis-pelve",name:"Púbis",group:"Osso coxal",x:43,y:72,description:"Porção anteroinferior do osso coxal, com corpo e ramos.",function:"Forma a parte anterior do anel pélvico.",clinical:"Une-se ao púbis oposto na sínfise púbica.",aliases:["pubis"]},
   {id:"sinfise-pubica",name:"Sínfise púbica",group:"Articulações",x:53,y:72,description:"Articulação cartilaginosa mediana que une os ossos púbicos.",function:"Estabiliza o anel pélvico e permite discreta movimentação.",clinical:"Localiza-se na linha mediana da parede anterior da pelve.",aliases:["sinfise","sinfise pubica"]},
   {id:"coccix-pelve",name:"Cóccix",group:"Extremidade vertebral",x:50,y:62,description:"Estrutura óssea terminal da coluna, logo abaixo do sacro.",function:"Serve de inserção para ligamentos e músculos do assoalho pélvico.",clinical:"É uma referência anatômica importante na região posterior do períneo.",aliases:["coccix"]}
  ]
 },
 {
  id:"pe",title:"Pé — tarso, metatarso e falanges",short:"Pé",
  subtitle:"Identifique os ossos do pé direito vistos por cima, do calcanhar ao hálux.",
  image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/202110_Dorsal_view_of_bones_of_right_foot.svg/500px-202110_Dorsal_view_of_bones_of_right_foot.svg.png",
  source:"https://commons.wikimedia.org/wiki/File:202110_Dorsal_view_of_bones_of_right_foot.svg",
  credit:"DataBase Center for Life Science (DBCLS) · CC BY 4.0 · Wikimedia Commons · vista dorsal do pé direito",
  ratio:"512 / 512",alt:"Ilustração dorsal dos ossos do pé direito, com tarso, metatarso e falanges",
  spots:[
   {id:"calcaneo-pe",name:"Calcâneo",group:"Tarso · retropé",x:55,y:88,description:"Maior osso do tarso, localizado na parte posterior do pé e responsável pela proeminência do calcanhar.",function:"Participa do apoio do peso e da inserção do tendão calcâneo.",clinical:"A tuberosidade posterior recebe a inserção do tendão calcâneo.",aliases:["calcaneo"]},
   {id:"talus-pe",name:"Tálus",group:"Tarso · retropé",x:49,y:75,description:"Osso do tarso situado entre tíbia, fíbula e calcâneo.",function:"Transmite forças entre perna e pé e participa da articulação talocrural.",clinical:"A tróclea do tálus articula-se com a pinça tibiofibular.",aliases:["talus","astrágalo"]},
   {id:"navicular-pe",name:"Navicular",group:"Tarso · mediopé",x:37,y:63,description:"Osso medial do tarso localizado anteriormente à cabeça do tálus.",function:"Integra o arco longitudinal medial do pé.",clinical:"A tuberosidade do navicular é uma referência de inserção do tibial posterior.",aliases:["navicular"]},
   {id:"cuboide-pe",name:"Cuboide",group:"Tarso · mediopé",x:59,y:64,description:"Osso lateral do tarso que se articula posteriormente ao calcâneo.",function:"Ajuda a sustentar a coluna lateral do pé.",clinical:"Possui sulco plantar para o tendão do músculo fibular longo.",aliases:["cuboide"]},
   {id:"cuneiformes-pe",name:"Ossos cuneiformes",group:"Tarso · mediopé",x:43,y:54,description:"Três ossos entre o navicular e os primeiros metatarsos.",function:"Contribuem para a estabilidade do mediopé e dos arcos plantares.",clinical:"São denominados medial, intermédio e lateral.",aliases:["cuneiformes"]},
   {id:"metatarso-primeiro-pe",name:"Primeiro metatarso",group:"Metatarso",x:34,y:40,description:"Osso longo que une a região medial do tarso à base do hálux.",function:"Participa do suporte de carga e da propulsão da marcha.",clinical:"A articulação metatarsofalângica do hálux é importante para o impulso final.",aliases:["1 metatarso","primeiro metatarsiano"]},
   {id:"metatarsos-pe",name:"Metatarsos II–V",group:"Metatarso",x:54,y:40,description:"Quatro ossos longos que conectam a região central e lateral do tarso aos dedos.",function:"Contribuem para os arcos do pé e a distribuição de carga no antepé.",clinical:"Fraturas por estresse podem envolver os metatarsos.",aliases:["metatarsos","metatarsianos"]},
   {id:"falanges-pe",name:"Falanges dos dedos",group:"Dedos",x:57,y:19,description:"Ossos articulados dos dedos do pé, geralmente três em cada dedo do II ao V.",function:"Auxiliam a estabilização e a propulsão durante a caminhada.",clinical:"As articulações interfalângicas permitem flexão e extensão.",aliases:["falanges"]},
   {id:"halux-pe",name:"Hálux",group:"Primeiro dedo",x:34,y:19,description:"Primeiro dedo do pé, formado por duas falanges.",function:"Exerce papel importante na transferência de carga durante o impulso da marcha.",clinical:"Possui articulação metatarsofalângica e interfalângica.",aliases:["halux","dedao","dedão do pé"]}
  ]
 }
];
