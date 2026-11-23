import {atlasViews,type AtlasView} from "./anatomy-atlas-collection-data";

/**
 * Pelve: cinco estudos independentes com imagens 3D de foco regional (1125x1125 px).
 * Anatomography / DBCLS (Wikimedia Commons), licença CC BY-SA 2.1 JP.
 * Coordenadas percentuais feitas manualmente sobre as imagens; solicitar revisão anatômica
 * e visual no navegador antes de declarar precisão clínica.
 */
const previous=atlasViews.find(view=>view.id==="pelve");
if(!previous)throw new Error("Pelve principal não encontrada");

const frontPositions:Record<string,[number,number]>={
  "crista-iliaca": [
    22,
    16
  ],
  "ilio-pelve": [
    23,
    28
  ],
  "sacro-pelve": [
    50,
    42
  ],
  "sacroiliaca-pelve": [
    59,
    42
  ],
  "acetabulo-pelve": [
    26,
    62
  ],
  "isquio-pelve": [
    33,
    76
  ],
  "pubis-pelve": [
    43,
    71
  ],
  "sinfise-pubica": [
    50,
    73
  ],
  "coccix-pelve": [
    50,
    66
  ]
};
const pelvisFront:AtlasView={
 ...previous,
 id:"pelve-anterior",title:"Pelve — vista frontal",short:"Vista frontal",
 subtitle:"Identifique as principais estruturas do anel pélvico na vista anterior.",
 image:"https://upload.wikimedia.org/wikipedia/commons/5/55/Pelvis_(male)_02_-_anterior_view.png",
 source:"https://commons.wikimedia.org/wiki/File:Pelvis_(male)_02_-_anterior_view.png",credit:"Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
 ratio:"1 / 1",alt:"Ilustração anatômica 3D: pelve — vista frontal, sem legendas impressas",
 spots:previous.spots.map(spot=>{
   const point=frontPositions[spot.id];
   if(!point)throw new Error("Estrutura frontal sem mapeamento: "+spot.id);
   return {...spot,x:point[0],y:point[1]};
 })
};

export const pelvisViews:AtlasView[]=[
 pelvisFront,
{
  "id": "pelve-posterior",
  "short": "Vista posterior",
  "title": "Pelve — vista posterior",
  "subtitle": "Identifique os marcos ósseos posteriores do quadril e do sacro.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Pelvis_(male)_02_-_posterior_view.png",
  "source": "https://commons.wikimedia.org/wiki/File:Pelvis_(male)_02_-_posterior_view.png",
  "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica 3D: pelve — vista posterior, sem legendas impressas",
  "spots": [
    {
      "id": "pel-post-crista",
      "name": "Crista ilíaca",
      "group": "Ílio posterior",
      "x": 20,
      "y": 19,
      "description": "Borda superior curvada do ílio, visível na vista posterior.",
      "function": "Oferece inserções para músculos do tronco e do quadril.",
      "clinical": "É um importante marco ósseo palpável na cintura pélvica.",
      "aliases": [
        "crista iliaca"
      ]
    },
    {
      "id": "pel-post-ilio",
      "name": "Face glútea do ílio",
      "group": "Osso coxal",
      "x": 18,
      "y": 34,
      "description": "Superfície externa posterior e lateral da asa ilíaca.",
      "function": "Serve como área de origem para músculos glúteos.",
      "clinical": "Contribui para a estabilidade do quadril.",
      "aliases": [
        "ilio",
        "face glutea"
      ]
    },
    {
      "id": "pel-post-sacro",
      "name": "Sacro posterior",
      "group": "Coluna sacral",
      "x": 50,
      "y": 42,
      "description": "Face dorsal do sacro, no centro posterior do anel pélvico.",
      "function": "Transmite forças entre a coluna vertebral e a pelve.",
      "clinical": "A crista sacral mediana representa processos espinhosos fusionados.",
      "aliases": [
        "sacro"
      ]
    },
    {
      "id": "pel-post-forames",
      "name": "Forames sacrais posteriores",
      "group": "Sacro",
      "x": 43,
      "y": 50,
      "description": "Aberturas pares na face dorsal do sacro.",
      "function": "Permitem a passagem de ramos posteriores dos nervos sacrais.",
      "clinical": "São referências na anatomia neurovascular da região sacral.",
      "aliases": [
        "forames sacrais"
      ]
    },
    {
      "id": "pel-post-sacroiliaca",
      "name": "Articulação sacroilíaca",
      "group": "Articulações",
      "x": 37,
      "y": 38,
      "description": "Articulação entre a face auricular do sacro e a do ílio.",
      "function": "Transfere peso do esqueleto axial para a cintura pélvica.",
      "clinical": "Possui mobilidade reduzida e forte estabilização ligamentar.",
      "aliases": [
        "sacroiliaca"
      ]
    },
    {
      "id": "pel-post-isquio",
      "name": "Tuberosidade isquiática",
      "group": "Ísquio",
      "x": 28,
      "y": 75,
      "description": "Proeminência inferoposterior do osso do quadril.",
      "function": "Recebe carga quando a pessoa se senta e fornece inserções musculares.",
      "clinical": "É referência anatômica de inserção dos músculos posteriores da coxa.",
      "aliases": [
        "isquio",
        "tuberosidade isquiatica"
      ]
    },
    {
      "id": "pel-post-coccix",
      "name": "Cóccix",
      "group": "Extremidade vertebral",
      "x": 50,
      "y": 69,
      "description": "Estrutura terminal da coluna, abaixo do sacro.",
      "function": "Oferece inserção a ligamentos e músculos pélvicos.",
      "clinical": "Pode ser envolvido em quadros de dor coccígea.",
      "aliases": [
        "coccix"
      ]
    }
  ]
},
{
  "id": "pelve-lateral",
  "short": "Vista lateral",
  "title": "Pelve — vista lateral",
  "subtitle": "Explore a pelve vista de perfil e sua relação com a articulação do quadril.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Pelvis_(male)_02_-_lateral_view.png",
  "source": "https://commons.wikimedia.org/wiki/File:Pelvis_(male)_02_-_lateral_view.png",
  "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica 3D: pelve — vista lateral, sem legendas impressas",
  "spots": [
    {
      "id": "pel-lat-crista",
      "name": "Crista ilíaca",
      "group": "Ílio",
      "x": 39,
      "y": 18,
      "description": "Margem superior arqueada do osso do quadril, observada de perfil.",
      "function": "Oferece inserções para músculos abdominais e do quadril.",
      "clinical": "É uma referência palpável lateral.",
      "aliases": [
        "crista iliaca"
      ]
    },
    {
      "id": "pel-lat-ilio",
      "name": "Asa do ílio",
      "group": "Osso coxal",
      "x": 41,
      "y": 31,
      "description": "Porção superior alargada do osso coxal.",
      "function": "Constitui a parede lateral da pelve e a base para músculos glúteos.",
      "clinical": "Faz parte da transmissão de forças pelo anel pélvico.",
      "aliases": [
        "ilio"
      ]
    },
    {
      "id": "pel-lat-acetabulo",
      "name": "Acetábulo",
      "group": "Articulação do quadril",
      "x": 54,
      "y": 55,
      "description": "Cavidade lateral do osso coxal onde se articula a cabeça femoral.",
      "function": "Forma o encaixe articular do quadril.",
      "clinical": "A profundidade da cavidade contribui para a estabilidade da articulação.",
      "aliases": [
        "acetabulo"
      ]
    },
    {
      "id": "pel-lat-pubis",
      "name": "Púbis",
      "group": "Osso coxal",
      "x": 61,
      "y": 65,
      "description": "Componente anteroinferior do osso do quadril.",
      "function": "Integra a porção anterior do anel pélvico.",
      "clinical": "O púbis contralateral conecta-se pela sínfise púbica.",
      "aliases": [
        "pubis"
      ]
    },
    {
      "id": "pel-lat-isquio",
      "name": "Ísquio",
      "group": "Osso coxal",
      "x": 35,
      "y": 72,
      "description": "Porção posteroinferior do osso coxal.",
      "function": "Contribui para sustentação e origem muscular.",
      "clinical": "A tuberosidade isquiática suporta peso na posição sentada.",
      "aliases": [
        "isquio"
      ]
    },
    {
      "id": "pel-lat-forame",
      "name": "Forame obturado",
      "group": "Osso coxal",
      "x": 48,
      "y": 73,
      "description": "Grande abertura delimitada por púbis e ísquio.",
      "function": "Reduz a massa óssea e abriga a membrana obturatória.",
      "clinical": "O canal obturatório dá passagem a nervo e vasos obturatórios.",
      "aliases": [
        "forame obturador",
        "forame obturado"
      ]
    }
  ]
},
{
  "id": "pelve-sacro",
  "short": "Sacro",
  "title": "Pelve — sacro em destaque",
  "subtitle": "Estude o sacro anterior e seus forames sobre a anatomia pélvica.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/Sacrum_-_anterior_view04.png",
  "source": "https://commons.wikimedia.org/wiki/File:Sacrum_-_anterior_view04.png",
  "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica 3D: pelve — sacro em destaque, sem legendas impressas",
  "spots": [
    {
      "id": "pel-sac-base",
      "name": "Base do sacro",
      "group": "Sacro",
      "x": 50,
      "y": 31,
      "description": "Extremidade superior alargada do sacro.",
      "function": "Recebe forças da quinta vértebra lombar.",
      "clinical": "Integra a junção lombossacral.",
      "aliases": [
        "base sacral"
      ]
    },
    {
      "id": "pel-sac-asa",
      "name": "Asa do sacro",
      "group": "Sacro",
      "x": 35,
      "y": 33,
      "description": "Expansão lateral superior ao lado do corpo da primeira vértebra sacral.",
      "function": "Ajuda a integrar a base sacral ao anel pélvico.",
      "clinical": "Relaciona-se à transferência de forças na região sacroilíaca.",
      "aliases": [
        "asa sacral"
      ]
    },
    {
      "id": "pel-sac-promontorio",
      "name": "Promontório sacral",
      "group": "Sacro superior",
      "x": 50,
      "y": 35,
      "description": "Margem anterior saliente da base da primeira vértebra sacral.",
      "function": "Constitui limite posterior da abertura superior da pelve.",
      "clinical": "É uma referência obstétrica e anatômica importante.",
      "aliases": [
        "promontorio"
      ]
    },
    {
      "id": "pel-sac-forames",
      "name": "Forames sacrais anteriores",
      "group": "Sacro",
      "x": 43,
      "y": 48,
      "description": "Aberturas pares na face pélvica do sacro.",
      "function": "Permitem a passagem de ramos anteriores dos nervos sacrais.",
      "clinical": "São marcos importantes da anatomia pélvica.",
      "aliases": [
        "forames anteriores"
      ]
    },
    {
      "id": "pel-sac-corpo",
      "name": "Corpos sacrais fusionados",
      "group": "Sacro",
      "x": 50,
      "y": 48,
      "description": "Estrutura central formada pela fusão dos corpos das vértebras sacrais.",
      "function": "Sustenta a parede posterior da pelve.",
      "clinical": "As linhas transversas marcam antigas separações intervertebrais.",
      "aliases": [
        "corpos sacrais"
      ]
    },
    {
      "id": "pel-sac-apice",
      "name": "Ápice do sacro",
      "group": "Sacro inferior",
      "x": 50,
      "y": 60,
      "description": "Extremidade inferior estreita do sacro.",
      "function": "Articula-se com a base do cóccix.",
      "clinical": "É o limite inferior do sacro.",
      "aliases": [
        "apice sacral"
      ]
    }
  ]
},
{
  "id": "pelve-acetabulo",
  "short": "Acetábulo",
  "title": "Pelve — acetábulo e osso coxal",
  "subtitle": "Localize a cavidade acetabular e as estruturas próximas no osso do quadril.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Acetabulum_04_lateral_view_(Right_hip_bone).png",
  "source": "https://commons.wikimedia.org/wiki/File:Acetabulum_04_lateral_view_(Right_hip_bone).png",
  "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica 3D: pelve — acetábulo e osso coxal, sem legendas impressas",
  "spots": [
    {
      "id": "pel-acet-ilio",
      "name": "Ílio",
      "group": "Osso coxal",
      "x": 40,
      "y": 26,
      "description": "Porção alargada superior do osso coxal.",
      "function": "Integra a cintura pélvica e a formação superior do acetábulo.",
      "clinical": "Recebe inserção de músculos glúteos.",
      "aliases": [
        "ilio"
      ]
    },
    {
      "id": "pel-acet-cavidade",
      "name": "Acetábulo",
      "group": "Cavidade articular",
      "x": 49,
      "y": 65,
      "description": "Cavidade lateral do quadril, representada em vermelho na imagem.",
      "function": "Recebe a cabeça do fêmur e forma a articulação coxofemoral.",
      "clinical": "O lábio acetabular contribui para a congruência articular.",
      "aliases": [
        "acetabulo"
      ]
    },
    {
      "id": "pel-acet-superficie",
      "name": "Superfície semilunar",
      "group": "Acetábulo",
      "x": 44,
      "y": 61,
      "description": "Área articular em forma de ferradura no interior do acetábulo.",
      "function": "Contato articular com a cabeça do fêmur.",
      "clinical": "É revestida por cartilagem na articulação saudável.",
      "aliases": [
        "face semilunar",
        "superficie semilunar"
      ]
    },
    {
      "id": "pel-acet-incisura",
      "name": "Incisura acetabular",
      "group": "Acetábulo",
      "x": 50,
      "y": 74,
      "description": "Abertura na margem inferior da cavidade acetabular.",
      "function": "É transposta pelo ligamento transverso do acetábulo.",
      "clinical": "Serve como referência para delimitar a margem acetabular.",
      "aliases": [
        "incisura acetabular"
      ]
    },
    {
      "id": "pel-acet-forame",
      "name": "Forame obturado",
      "group": "Osso coxal",
      "x": 50,
      "y": 83,
      "description": "Grande abertura inferior ao acetábulo, delimitada por púbis e ísquio.",
      "function": "Acomoda a membrana obturatória.",
      "clinical": "O canal obturatório conduz estruturas neurovasculares.",
      "aliases": [
        "forame obturador"
      ]
    },
    {
      "id": "pel-acet-isquio",
      "name": "Ísquio",
      "group": "Osso coxal",
      "x": 33,
      "y": 86,
      "description": "Porção posteroinferior do osso coxal.",
      "function": "Contribui para a sustentação do peso ao sentar.",
      "clinical": "A tuberosidade isquiática fornece inserções para músculos da coxa.",
      "aliases": [
        "isquio"
      ]
    }
  ]
}
];
export const pelvisViewIds=new Set(pelvisViews.map(view=>view.id));
export const pelvisViewIsValid=(id:string|null)=>id!==null&&pelvisViewIds.has(id);
