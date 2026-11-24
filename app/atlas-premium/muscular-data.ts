export type Point={name:string;description:string;x:number|null;y:number|null};
export type Scene={file:string;label:string;description:string;ready:boolean;points:Point[]};
export type Question={q:string;answers:string[];correct:number;explain:string};
export type Lab={title:string;intro:string;scenes:Scene[];quiz:Question[]};
export const muscularLabs:Record<string,Lab>={
  "cabeca-pescoco": {
    "title": "Cabeça e pescoço",
    "intro": "Mímica facial, mastigação e mobilidade cervical.",
    "scenes": [
      {
        "file": "frontal.webp",
        "label": "Vista frontal",
        "description": "Estudo anatômico: vista frontal.",
        "ready": true,
        "points": [
          {
            "name": "Orbicular do olho",
            "description": "Fecha as pálpebras; recebe inervação do nervo facial (VII).",
            "x": 32,
            "y": 24
          },
          {
            "name": "Orbicular da boca",
            "description": "Fecha e protrai os lábios, atuando na fala e na vedação oral.",
            "x": 49,
            "y": 44
          },
          {
            "name": "Frontal",
            "description": "Eleva as sobrancelhas e produz rugas horizontais na testa.",
            "x": 36,
            "y": 13
          }
        ]
      },
      {
        "file": "lateral.webp",
        "label": "Vista lateral",
        "description": "Estudo anatômico: vista lateral.",
        "ready": true,
        "points": [
          {
            "name": "Masseter",
            "description": "Eleva a mandíbula; é inervado pelo ramo mandibular do trigêmeo (V3).",
            "x": 58,
            "y": 39
          },
          {
            "name": "Temporal",
            "description": "Eleva a mandíbula; suas fibras posteriores contribuem para a retração mandibular.",
            "x": 43,
            "y": 19
          },
          {
            "name": "Zigomático maior",
            "description": "Eleva e desloca lateralmente o ângulo da boca durante o sorriso.",
            "x": 75,
            "y": 32
          }
        ]
      },
      {
        "file": "posterior.webp",
        "label": "Vista posterior",
        "description": "Vista superficial da nuca e do couro cabeludo. Os músculos cervicais profundos não estão diretamente expostos.",
        "ready": true,
        "points": [
          {
            "name": "Trapézio superior",
            "description": "Eleva e auxilia a rotação superior da escápula; pode contribuir para extensão cervical com a cintura fixa.",
            "x": 33,
            "y": 71
          },
          {
            "name": "Ventre occipital",
            "description": "Porção posterior do músculo occipitofrontal, que traciona o couro cabeludo posteriormente e se continua com a aponeurose epicraniana.",
            "x": 33,
            "y": 30
          },
          {
            "name": "Aponeurose epicraniana",
            "description": "Lâmina tendínea que conecta os ventres frontal e occipital do músculo occipitofrontal, permitindo a transmissão de tensão no couro cabeludo.",
            "x": 50,
            "y": 13
          }
        ]
      },
      {
        "file": "profunda.webp",
        "label": "Região cervical profunda",
        "description": "Estudo anatômico: região cervical profunda.",
        "ready": true,
        "points": [
          {
            "name": "Longo do pescoço",
            "description": "Flexor cervical profundo, auxilia a estabilização segmentar anterior da coluna cervical.",
            "x": 43,
            "y": 60
          },
          {
            "name": "Escaleno anterior",
            "description": "Flexiona lateralmente o pescoço e pode elevar a primeira costela na inspiração forçada.",
            "x": 65,
            "y": 62
          },
          {
            "name": "Esternocleidomastoideo",
            "description": "Unilateralmente, inclina a cabeça para o mesmo lado e roda para o lado oposto.",
            "x": 76,
            "y": 52
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Uma lesão do VII compromete o fechamento palpebral. Qual músculo está diretamente envolvido?",
        "answers": [
          "Orbicular da boca",
          "Orbicular do olho",
          "Frontal",
          "Masseter"
        ],
        "correct": 1,
        "explain": "Fecha as pálpebras; recebe inervação do nervo facial (VII)."
      },
      {
        "q": "Qual músculo realiza o fechamento ativo dos lábios?",
        "answers": [
          "Temporal",
          "Zigomático maior",
          "Trapézio superior",
          "Orbicular da boca"
        ],
        "correct": 3,
        "explain": "Fecha e protrai os lábios, atuando na fala e na vedação oral."
      },
      {
        "q": "Qual músculo eleva a mandíbula durante a mastigação e é inervado por V3?",
        "answers": [
          "Masseter",
          "Ventre occipital",
          "Aponeurose epicraniana",
          "Longo do pescoço"
        ],
        "correct": 0,
        "explain": "Eleva a mandíbula; é inervado pelo ramo mandibular do trigêmeo (V3)."
      },
      {
        "q": "Qual músculo mastigatório possui fibras posteriores que retraem a mandíbula?",
        "answers": [
          "Escaleno anterior",
          "Esternocleidomastoideo",
          "Temporal",
          "Orbicular do olho"
        ],
        "correct": 2,
        "explain": "Eleva a mandíbula; suas fibras posteriores contribuem para a retração mandibular."
      },
      {
        "q": "Qual músculo superficial une região occipital e cintura escapular e auxilia a elevação da escápula?",
        "answers": [
          "Orbicular da boca",
          "Trapézio superior",
          "Frontal",
          "Masseter"
        ],
        "correct": 1,
        "explain": "Eleva e auxilia a rotação superior da escápula; pode contribuir para extensão cervical com a cintura fixa."
      },
      {
        "q": "Qual músculo anterior profundo contribui para a estabilização segmentar cervical?",
        "answers": [
          "Temporal",
          "Zigomático maior",
          "Trapézio superior",
          "Longo do pescoço"
        ],
        "correct": 3,
        "explain": "Flexor cervical profundo, auxilia a estabilização segmentar anterior da coluna cervical."
      }
    ]
  },
  "torax-abdomen": {
    "title": "Tórax e abdômen",
    "intro": "Parede torácica, musculatura abdominal e respiração.",
    "scenes": [
      {
        "file": "frontal.webp",
        "label": "Vista anterior",
        "description": "Estudo anatômico: vista anterior.",
        "ready": true,
        "points": [
          {
            "name": "Peitoral maior",
            "description": "Aduz e roda medialmente o úmero; a porção clavicular auxilia a flexão.",
            "x": 32,
            "y": 24
          },
          {
            "name": "Reto do abdômen",
            "description": "Flexiona o tronco e contribui para a pressão intra-abdominal.",
            "x": 43,
            "y": 49
          },
          {
            "name": "Oblíquo externo",
            "description": "Com o oblíquo interno oposto, participa da rotação contralateral do tronco.",
            "x": 28,
            "y": 67
          }
        ]
      },
      {
        "file": "lateral.webp",
        "label": "Vista lateral",
        "description": "Vista lateral com serrátil anterior, região intercostal e parede abdominal; o oblíquo interno não está claramente individualizado.",
        "ready": true,
        "points": [
          {
            "name": "Serrátil anterior",
            "description": "Protrai a escápula e auxilia sua rotação superior; inervado pelo nervo torácico longo.",
            "x": 34,
            "y": 37
          },
          {
            "name": "Intercostal externo",
            "description": "Auxilia a elevação das costelas na inspiração.",
            "x": 46,
            "y": 39
          },
          {
            "name": "Reto do abdômen",
            "description": "Músculo longitudinal da parede abdominal anterior. Flexiona o tronco e contribui para a pressão intra-abdominal; visível na margem anterior desta ilustração lateral.",
            "x": 70,
            "y": 61
          }
        ]
      },
      {
        "file": "profunda.webp",
        "label": "Parede abdominal profunda",
        "description": "Estudo anatômico: parede abdominal profunda.",
        "ready": true,
        "points": [
          {
            "name": "Transverso do abdômen",
            "description": "Comprime o conteúdo abdominal e contribui para a estabilidade do tronco.",
            "x": 24,
            "y": 56
          },
          {
            "name": "Bainha do reto",
            "description": "Formada por aponeuroses dos músculos laterais, envolve o reto abdominal com organização variável acima e abaixo da linha arqueada.",
            "x": 36,
            "y": 62
          },
          {
            "name": "Linha alba",
            "description": "Rafe fibrosa mediana que recebe aponeuroses da parede abdominal.",
            "x": 50,
            "y": 54
          }
        ]
      },
      {
        "file": "diafragma.webp",
        "label": "Diafragma",
        "description": "Estudo anatômico: diafragma.",
        "ready": true,
        "points": [
          {
            "name": "Diafragma",
            "description": "Principal músculo inspiratório; sua contração aumenta o volume torácico, com inervação frênica C3–C5.",
            "x": 25,
            "y": 40
          },
          {
            "name": "Centro tendíneo",
            "description": "Região aponeurótica central sobre a qual convergem fibras musculares.",
            "x": 49,
            "y": 33
          },
          {
            "name": "Pilares diafragmáticos",
            "description": "Fixações musculotendíneas lombares que participam da organização dos hiatos.",
            "x": 43,
            "y": 65
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual músculo superficial do tórax aduz e roda medialmente o úmero?",
        "answers": [
          "Reto do abdômen",
          "Peitoral maior",
          "Oblíquo externo",
          "Serrátil anterior"
        ],
        "correct": 1,
        "explain": "Aduz e roda medialmente o úmero; a porção clavicular auxilia a flexão."
      },
      {
        "q": "Qual músculo longitudinal da parede anterior flexiona o tronco?",
        "answers": [
          "Intercostal externo",
          "Oblíquo interno",
          "Transverso do abdômen",
          "Reto do abdômen"
        ],
        "correct": 3,
        "explain": "Flexiona o tronco e contribui para a pressão intra-abdominal."
      },
      {
        "q": "Qual músculo, se paralisado por lesão do nervo torácico longo, favorece escápula alada?",
        "answers": [
          "Serrátil anterior",
          "Bainha do reto",
          "Linha alba",
          "Diafragma"
        ],
        "correct": 0,
        "explain": "Protrai a escápula e auxilia sua rotação superior; inervado pelo nervo torácico longo."
      },
      {
        "q": "Qual grupo intercostal contribui tipicamente para elevar as costelas durante a inspiração?",
        "answers": [
          "Centro tendíneo",
          "Pilares diafragmáticos",
          "Intercostal externo",
          "Peitoral maior"
        ],
        "correct": 2,
        "explain": "Auxilia a elevação das costelas na inspiração."
      },
      {
        "q": "Qual músculo abdominal profundo possui fibras predominantemente transversais?",
        "answers": [
          "Reto do abdômen",
          "Transverso do abdômen",
          "Oblíquo externo",
          "Serrátil anterior"
        ],
        "correct": 1,
        "explain": "Comprime o conteúdo abdominal e contribui para a estabilidade do tronco."
      },
      {
        "q": "Qual músculo é o principal responsável pela inspiração tranquila?",
        "answers": [
          "Intercostal externo",
          "Oblíquo interno",
          "Transverso do abdômen",
          "Diafragma"
        ],
        "correct": 3,
        "explain": "Principal músculo inspiratório; sua contração aumenta o volume torácico, com inervação frênica C3–C5."
      }
    ]
  },
  "costas": {
    "title": "Costas",
    "intro": "Camadas superficiais e profundas do dorso.",
    "scenes": [
      {
        "file": "superficial.webp",
        "label": "Camada superficial",
        "description": "Estudo anatômico: camada superficial.",
        "ready": true,
        "points": [
          {
            "name": "Trapézio",
            "description": "Mobiliza e estabiliza a escápula; suas fibras atuam de formas distintas conforme a região.",
            "x": 43,
            "y": 30
          },
          {
            "name": "Latíssimo do dorso",
            "description": "Estende, aduz e roda medialmente o úmero.",
            "x": 34,
            "y": 47
          },
          {
            "name": "Deltoide posterior",
            "description": "Auxilia a extensão e abdução horizontal do ombro.",
            "x": 22,
            "y": 31
          }
        ]
      },
      {
        "file": "intermediaria.webp",
        "label": "Camada escapular",
        "description": "Estudo anatômico: camada escapular.",
        "ready": true,
        "points": [
          {
            "name": "Romboide maior",
            "description": "Retrai e auxilia a rotação inferior da escápula.",
            "x": 39,
            "y": 50
          },
          {
            "name": "Elevador da escápula",
            "description": "Eleva a escápula e auxilia sua rotação inferior.",
            "x": 34,
            "y": 31
          },
          {
            "name": "Romboide menor",
            "description": "Auxilia retração e estabilização escapular.",
            "x": 41,
            "y": 36
          }
        ]
      },
      {
        "file": "profunda.webp",
        "label": "Camada profunda",
        "description": "Estudo anatômico: camada profunda.",
        "ready": true,
        "points": [
          {
            "name": "Eretor da espinha",
            "description": "Grupo formado por iliocostal, longuíssimo e espinal; bilateralmente estende a coluna.",
            "x": 37,
            "y": 45
          },
          {
            "name": "Multífido",
            "description": "Estabiliza segmentos vertebrais e auxilia extensão e rotação contralateral.",
            "x": 46.5,
            "y": 64
          },
          {
            "name": "Processos espinhosos",
            "description": "Projeções ósseas posteriores das vértebras, que servem de referência e inserção para ligamentos e músculos profundos do dorso. Os rotadores não estão individualizados nesta ilustração.",
            "x": 50,
            "y": 36
          }
        ]
      },
      {
        "file": "lombar.webp",
        "label": "Região lombar",
        "description": "Estudo anatômico: região lombar.",
        "ready": true,
        "points": [
          {
            "name": "Crista ilíaca",
            "description": "Margem superior do ílio, que serve de fixação a músculos e estruturas fasciais. O quadrado lombar situa-se profundamente e não está individualizado nesta imagem.",
            "x": 18,
            "y": 67
          },
          {
            "name": "Fáscia toracolombar",
            "description": "Estrutura conjuntiva que integra músculos do dorso e parede abdominal e transmite forças.",
            "x": 47,
            "y": 57
          },
          {
            "name": "Glúteo máximo",
            "description": "Músculo superficial da região glútea que realiza extensão potente do quadril e contribui para sua estabilidade.",
            "x": 24,
            "y": 83
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual músculo superficial possui fibras superiores, médias e inferiores com ações escapulares distintas?",
        "answers": [
          "Latíssimo do dorso",
          "Trapézio",
          "Deltoide posterior",
          "Romboide maior"
        ],
        "correct": 1,
        "explain": "Mobiliza e estabiliza a escápula; suas fibras atuam de formas distintas conforme a região."
      },
      {
        "q": "Qual músculo amplo do dorso auxilia a puxar o braço para trás e em direção ao tronco?",
        "answers": [
          "Elevador da escápula",
          "Romboide menor",
          "Eretor da espinha",
          "Latíssimo do dorso"
        ],
        "correct": 3,
        "explain": "Estende, aduz e roda medialmente o úmero."
      },
      {
        "q": "Qual músculo liga processos espinhosos torácicos à margem medial da escápula e promove retração?",
        "answers": [
          "Romboide maior",
          "Multífido",
          "Rotadores",
          "Quadrado lombar"
        ],
        "correct": 0,
        "explain": "Retrai e auxilia a rotação inferior da escápula."
      },
      {
        "q": "Qual músculo liga vértebras cervicais superiores ao ângulo superior da escápula?",
        "answers": [
          "Fáscia toracolombar",
          "Iliocostal lombar",
          "Elevador da escápula",
          "Trapézio"
        ],
        "correct": 2,
        "explain": "Eleva a escápula e auxilia sua rotação inferior."
      },
      {
        "q": "Qual grupo muscular é responsável pela extensão global da coluna e inclui o iliocostal?",
        "answers": [
          "Latíssimo do dorso",
          "Eretor da espinha",
          "Deltoide posterior",
          "Romboide maior"
        ],
        "correct": 1,
        "explain": "Grupo formado por iliocostal, longuíssimo e espinal; bilateralmente estende a coluna."
      },
      {
        "q": "Qual músculo da parede abdominal posterior fixa a 12ª costela?",
        "answers": [
          "Elevador da escápula",
          "Romboide menor",
          "Eretor da espinha",
          "Quadrado lombar"
        ],
        "correct": 3,
        "explain": "Inclina lateralmente o tronco e estabiliza a 12ª costela."
      }
    ]
  },
  "membros-superiores": {
    "title": "Membros superiores",
    "intro": "Ombro, braço, antebraço e mão.",
    "scenes": [
      {
        "file": "anterior.webp",
        "label": "Vista anterior",
        "description": "Estudo anatômico: vista anterior.",
        "ready": true,
        "points": [
          {
            "name": "Bíceps braquial",
            "description": "Flexiona o cotovelo e supina o antebraço; recebe inervação musculocutânea.",
            "x": 19,
            "y": 31
          },
          {
            "name": "Braquiorradial",
            "description": "Músculo superficial lateral do antebraço que auxilia a flexão do cotovelo, sobretudo na posição intermediária entre pronação e supinação. O braquial não está claramente individualizado nesta vista.",
            "x": 10,
            "y": 52
          },
          {
            "name": "Deltoide",
            "description": "A porção média abduz o braço, enquanto as porções anterior e posterior têm ações distintas.",
            "x": 17,
            "y": 16
          }
        ]
      },
      {
        "file": "posterior.webp",
        "label": "Vista posterior",
        "description": "Estudo anatômico: vista posterior.",
        "ready": true,
        "points": [
          {
            "name": "Tríceps braquial",
            "description": "Estende o cotovelo; a cabeça longa também cruza o ombro.",
            "x": 20,
            "y": 43
          },
          {
            "name": "Infraespinal",
            "description": "Integra o manguito rotador e promove rotação lateral do úmero.",
            "x": 32,
            "y": 34
          },
          {
            "name": "Redondo menor",
            "description": "Auxilia a rotação lateral do ombro e a estabilidade glenoumeral.",
            "x": 26,
            "y": 38
          }
        ]
      },
      {
        "file": "antebraco.webp",
        "label": "Antebraço",
        "description": "Estudo anatômico: antebraço.",
        "ready": true,
        "points": [
          {
            "name": "Pronador redondo",
            "description": "Prona o antebraço e auxilia a flexão do cotovelo.",
            "x": 50,
            "y": 17
          },
          {
            "name": "Flexor superficial dos dedos",
            "description": "Flexiona as articulações interfalângicas proximais dos dedos II a V.",
            "x": 51,
            "y": 31
          },
          {
            "name": "Retináculo dos flexores",
            "description": "Espessamento fibroso na região palmar do punho que forma o teto do túnel do carpo e contribui para manter os tendões flexores próximos aos ossos.",
            "x": 45,
            "y": 56
          }
        ]
      },
      {
        "file": "mao.webp",
        "label": "Mão",
        "description": "Vista palmar ilustrativa da mão, com tendões flexores e musculatura intrínseca superficial. Os interósseos dorsais não são individualizados nesta vista.",
        "ready": true,
        "points": [
          {
            "name": "Tendões flexores dos dedos",
            "description": "Transmitem a força dos músculos flexores extrínsecos do antebraço aos dedos, permitindo a flexão das articulações digitais.",
            "x": 40,
            "y": 36
          },
          {
            "name": "Musculatura tenar",
            "description": "Grupo muscular na base do polegar que participa da oposição, abdução e flexão do polegar. Seus componentes não estão completamente individualizados nesta ilustração.",
            "x": 69,
            "y": 62
          },
          {
            "name": "Musculatura hipotenar",
            "description": "Grupo muscular na base do dedo mínimo que contribui para seus movimentos e para a adaptação da palma à preensão.",
            "x": 22,
            "y": 62
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual músculo do braço realiza supinação e flexão do cotovelo?",
        "answers": [
          "Braquial",
          "Bíceps braquial",
          "Deltoide",
          "Tríceps braquial"
        ],
        "correct": 1,
        "explain": "Flexiona o cotovelo e supina o antebraço; recebe inervação musculocutânea."
      },
      {
        "q": "Qual músculo é um flexor do cotovelo eficaz mesmo com antebraço pronado?",
        "answers": [
          "Infraespinal",
          "Redondo menor",
          "Pronador redondo",
          "Braquial"
        ],
        "correct": 3,
        "explain": "Flexiona o cotovelo independentemente da posição de pronação ou supinação."
      },
      {
        "q": "Qual músculo possui três cabeças e é o principal extensor do cotovelo?",
        "answers": [
          "Tríceps braquial",
          "Flexor superficial dos dedos",
          "Extensor dos dedos",
          "Interósseos dorsais"
        ],
        "correct": 0,
        "explain": "Estende o cotovelo; a cabeça longa também cruza o ombro."
      },
      {
        "q": "Qual músculo ocupa a fossa infraespinal e roda lateralmente o úmero?",
        "answers": [
          "Oponente do polegar",
          "Lumbricais",
          "Infraespinal",
          "Bíceps braquial"
        ],
        "correct": 2,
        "explain": "Integra o manguito rotador e promove rotação lateral do úmero."
      },
      {
        "q": "Qual músculo superficial do antebraço anterior realiza pronação?",
        "answers": [
          "Braquial",
          "Pronador redondo",
          "Deltoide",
          "Tríceps braquial"
        ],
        "correct": 1,
        "explain": "Prona o antebraço e auxilia a flexão do cotovelo."
      },
      {
        "q": "Qual grupo realiza a abdução dos dedos da mão em relação ao terceiro dedo?",
        "answers": [
          "Infraespinal",
          "Redondo menor",
          "Pronador redondo",
          "Interósseos dorsais"
        ],
        "correct": 3,
        "explain": "Abduzem os dedos em relação ao eixo do terceiro dedo e auxiliam a ação extensora interfalângica."
      }
    ]
  },
  "membros-inferiores": {
    "title": "Membros inferiores",
    "intro": "Quadril, coxa, perna e pé.",
    "scenes": [
      {
        "file": "anterior.webp",
        "label": "Vista anterior",
        "description": "Estudo anatômico: vista anterior.",
        "ready": true,
        "points": [
          {
            "name": "Reto femoral",
            "description": "Estende o joelho e flexiona o quadril por cruzar ambas as articulações.",
            "x": 35,
            "y": 23
          },
          {
            "name": "Vasto medial",
            "description": "Estende o joelho e contribui para o controle patelar.",
            "x": 40,
            "y": 36
          },
          {
            "name": "Tibial anterior",
            "description": "Realiza dorsiflexão e auxilia inversão do pé.",
            "x": 30,
            "y": 63
          }
        ]
      },
      {
        "file": "posterior.webp",
        "label": "Vista posterior",
        "description": "Estudo anatômico: vista posterior.",
        "ready": true,
        "points": [
          {
            "name": "Glúteo máximo",
            "description": "Principal extensor potente do quadril, especialmente ao levantar-se ou subir escadas.",
            "x": 37,
            "y": 15
          },
          {
            "name": "Bíceps femoral",
            "description": "Flexiona o joelho; a cabeça longa também estende o quadril.",
            "x": 29,
            "y": 34
          },
          {
            "name": "Gastrocnêmio",
            "description": "Realiza flexão plantar e auxilia flexão do joelho.",
            "x": 34,
            "y": 61
          }
        ]
      },
      {
        "file": "lateral.webp",
        "label": "Vista lateral",
        "description": "Estudo anatômico: vista lateral.",
        "ready": true,
        "points": [
          {
            "name": "Glúteo médio",
            "description": "Abduz o quadril e estabiliza a pelve durante apoio unipodal.",
            "x": 47,
            "y": 4
          },
          {
            "name": "Trato iliotibial",
            "description": "Espessamento lateral da fáscia lata, que recebe forças do tensor da fáscia lata e do glúteo máximo.",
            "x": 48,
            "y": 31
          },
          {
            "name": "Gastrocnêmio",
            "description": "Músculo superficial da panturrilha que auxilia a flexão plantar e a flexão do joelho.",
            "x": 39,
            "y": 61
          }
        ]
      },
      {
        "file": "profunda.webp",
        "label": "Camada profunda",
        "description": "Dissecação anterior ilustrativa com estruturas musculares e ósseas da coxa, pelve e perna. O compartimento posterior profundo da perna não está diretamente individualizado.",
        "ready": true,
        "points": [
          {
            "name": "Patela",
            "description": "Osso sesamoide do mecanismo extensor do joelho, que aumenta o braço de momento do quadríceps.",
            "x": 33,
            "y": 43
          },
          {
            "name": "Tendão do quadríceps",
            "description": "Transmite a força do quadríceps à patela durante a extensão do joelho.",
            "x": 34,
            "y": 37
          },
          {
            "name": "Tíbia",
            "description": "Osso medial da perna, que transmite carga entre o joelho e o tornozelo.",
            "x": 30,
            "y": 64
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual componente do quadríceps cruza quadril e joelho?",
        "answers": [
          "Vasto medial",
          "Reto femoral",
          "Tibial anterior",
          "Glúteo máximo"
        ],
        "correct": 1,
        "explain": "Estende o joelho e flexiona o quadril por cruzar ambas as articulações."
      },
      {
        "q": "Qual componente medial do quadríceps participa da extensão e do controle da patela?",
        "answers": [
          "Bíceps femoral",
          "Gastrocnêmio",
          "Glúteo médio",
          "Vasto medial"
        ],
        "correct": 3,
        "explain": "Estende o joelho e contribui para o controle patelar."
      },
      {
        "q": "Qual músculo é especialmente ativo na extensão potente do quadril?",
        "answers": [
          "Glúteo máximo",
          "Tensor da fáscia lata",
          "Fibular longo",
          "Sóleo"
        ],
        "correct": 0,
        "explain": "Principal extensor potente do quadril, especialmente ao levantar-se ou subir escadas."
      },
      {
        "q": "Qual músculo isquiotibial possui uma cabeça longa que cruza o quadril e uma curta que não o cruza?",
        "answers": [
          "Tibial posterior",
          "Flexor longo dos dedos",
          "Bíceps femoral",
          "Reto femoral"
        ],
        "correct": 2,
        "explain": "Flexiona o joelho; a cabeça longa também estende o quadril."
      },
      {
        "q": "Qual músculo é fundamental para evitar queda contralateral da pelve no apoio unipodal?",
        "answers": [
          "Vasto medial",
          "Glúteo médio",
          "Tibial anterior",
          "Glúteo máximo"
        ],
        "correct": 1,
        "explain": "Abduz o quadril e estabiliza a pelve durante apoio unipodal."
      },
      {
        "q": "Qual músculo da panturrilha realiza flexão plantar sem cruzar o joelho?",
        "answers": [
          "Bíceps femoral",
          "Gastrocnêmio",
          "Glúteo médio",
          "Sóleo"
        ],
        "correct": 3,
        "explain": "Flexor plantar monoarticular do tornozelo, importante na postura."
      }
    ]
  },
  "tendoes-fascias": {
    "title": "Tendões e fáscias",
    "intro": "Transmissão de força, inserções e compartimentos.",
    "scenes": [
      {
        "file": "calcaneo.webp",
        "label": "Tendão calcâneo",
        "description": "Estudo anatômico: tendão calcâneo.",
        "ready": true,
        "points": [
          {
            "name": "Tendão calcâneo",
            "description": "Transmite força do tríceps sural ao calcâneo.",
            "x": 50,
            "y": 67
          },
          {
            "name": "Sóleo",
            "description": "Integra o tríceps sural, contribuindo para a flexão plantar sem cruzar o joelho.",
            "x": 39,
            "y": 45
          },
          {
            "name": "Calcâneo",
            "description": "Osso do retropé que recebe a inserção do tendão calcâneo.",
            "x": 50,
            "y": 91
          }
        ]
      },
      {
        "file": "joelho.webp",
        "label": "Mecanismo extensor",
        "description": "Estudo anatômico: mecanismo extensor.",
        "ready": true,
        "points": [
          {
            "name": "Tendão do quadríceps",
            "description": "Conecta o quadríceps à patela, transmitindo sua força.",
            "x": 49,
            "y": 33
          },
          {
            "name": "Ligamento patelar",
            "description": "Une patela à tuberosidade da tíbia e transmite força do mecanismo extensor.",
            "x": 49,
            "y": 73
          },
          {
            "name": "Retináculos patelares",
            "description": "Expansões fibrosas que contribuem para estabilidade e acompanhamento patelar.",
            "x": 31,
            "y": 48
          }
        ]
      },
      {
        "file": "fascia-lata.webp",
        "label": "Fáscia lata",
        "description": "Estudo anatômico: fáscia lata.",
        "ready": false,
        "points": [
          {
            "name": "Trato iliotibial",
            "description": "Espessamento lateral da fáscia lata, recebe fibras do tensor da fáscia lata e glúteo máximo.",
            "x": null,
            "y": null
          },
          {
            "name": "Fáscia lata",
            "description": "Envolve a musculatura da coxa e contribui para a delimitação dos compartimentos.",
            "x": null,
            "y": null
          },
          {
            "name": "Septos intermusculares",
            "description": "Extensões fasciais que separam grupos musculares em compartimentos.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "plantar.webp",
        "label": "Fáscia plantar",
        "description": "Estudo anatômico: fáscia plantar.",
        "ready": true,
        "points": [
          {
            "name": "Aponeurose plantar",
            "description": "Banda fibrosa que auxilia manutenção do arco longitudinal; tensiona-se na extensão dos dedos.",
            "x": 48,
            "y": 62
          },
          {
            "name": "Tuberosidade do calcâneo",
            "description": "Região proximal de fixação da aponeurose plantar.",
            "x": 49,
            "y": 91
          },
          {
            "name": "Bandas digitais",
            "description": "Prolongamentos distais da aponeurose que se relacionam com os dedos.",
            "x": 48,
            "y": 25
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual tendão transmite força do gastrocnêmio e sóleo ao calcâneo?",
        "answers": [
          "Sóleo",
          "Tendão calcâneo",
          "Calcâneo",
          "Tendão do quadríceps"
        ],
        "correct": 1,
        "explain": "Transmite força do tríceps sural ao calcâneo."
      },
      {
        "q": "Qual componente do tríceps sural não cruza o joelho?",
        "answers": [
          "Ligamento patelar",
          "Retináculos patelares",
          "Trato iliotibial",
          "Sóleo"
        ],
        "correct": 3,
        "explain": "Integra o tríceps sural, contribuindo para a flexão plantar sem cruzar o joelho."
      },
      {
        "q": "Qual estrutura conecta os músculos do quadríceps à patela?",
        "answers": [
          "Tendão do quadríceps",
          "Fáscia lata",
          "Septos intermusculares",
          "Aponeurose plantar"
        ],
        "correct": 0,
        "explain": "Conecta o quadríceps à patela, transmitindo sua força."
      },
      {
        "q": "Qual estrutura continua distalmente o mecanismo extensor entre patela e tíbia?",
        "answers": [
          "Tuberosidade do calcâneo",
          "Bandas digitais",
          "Ligamento patelar",
          "Tendão calcâneo"
        ],
        "correct": 2,
        "explain": "Une patela à tuberosidade da tíbia e transmite força do mecanismo extensor."
      },
      {
        "q": "Qual espessamento fascial lateral da coxa recebe forças do glúteo máximo e tensor da fáscia lata?",
        "answers": [
          "Sóleo",
          "Trato iliotibial",
          "Calcâneo",
          "Tendão do quadríceps"
        ],
        "correct": 1,
        "explain": "Espessamento lateral da fáscia lata, recebe fibras do tensor da fáscia lata e glúteo máximo."
      },
      {
        "q": "Qual estrutura contribui para o mecanismo de molinete (windlass) do pé?",
        "answers": [
          "Ligamento patelar",
          "Retináculos patelares",
          "Trato iliotibial",
          "Aponeurose plantar"
        ],
        "correct": 3,
        "explain": "Banda fibrosa que auxilia manutenção do arco longitudinal; tensiona-se na extensão dos dedos."
      }
    ]
  },
  "contracao": {
    "title": "Contração muscular",
    "intro": "Organização da fibra, sarcômero e acoplamento excitação-contração.",
    "scenes": [
      {
        "file": "fibra.webp",
        "label": "Fibra muscular",
        "description": "Estudo anatômico: fibra muscular.",
        "ready": false,
        "points": [
          {
            "name": "Miofibrila",
            "description": "Estrutura intracelular constituída por sarcômeros em série.",
            "x": null,
            "y": null
          },
          {
            "name": "Sarcolema",
            "description": "Membrana plasmática da fibra muscular, conduz a despolarização.",
            "x": null,
            "y": null
          },
          {
            "name": "Retículo sarcoplasmático",
            "description": "Armazena cálcio e o libera em resposta à ativação elétrica.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "sarcomero.webp",
        "label": "Sarcômero em repouso",
        "description": "Estudo anatômico: sarcômero em repouso.",
        "ready": false,
        "points": [
          {
            "name": "Linha Z",
            "description": "Delimita o sarcômero e ancora filamentos finos.",
            "x": null,
            "y": null
          },
          {
            "name": "Filamento fino",
            "description": "Composto principalmente por actina, tropomiosina e troponina.",
            "x": null,
            "y": null
          },
          {
            "name": "Filamento grosso",
            "description": "Composto principalmente por miosina II, que forma pontes cruzadas.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "encurtamento.webp",
        "label": "Sarcômero contraído",
        "description": "Estudo anatômico: sarcômero contraído.",
        "ready": false,
        "points": [
          {
            "name": "Banda A",
            "description": "Corresponde ao comprimento dos filamentos grossos e permanece aproximadamente constante durante o encurtamento.",
            "x": null,
            "y": null
          },
          {
            "name": "Banda I",
            "description": "Região com filamentos finos sem sobreposição com grossos; diminui durante o encurtamento.",
            "x": null,
            "y": null
          },
          {
            "name": "Zona H",
            "description": "Região central com filamentos grossos sem sobreposição de finos; reduz-se durante contração.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "juncao.webp",
        "label": "Junção neuromuscular",
        "description": "Estudo anatômico: junção neuromuscular.",
        "ready": false,
        "points": [
          {
            "name": "Placa motora",
            "description": "Região pós-sináptica especializada com receptores nicotínicos de acetilcolina.",
            "x": null,
            "y": null
          },
          {
            "name": "Terminal axonal",
            "description": "Libera acetilcolina na fenda sináptica após entrada de cálcio.",
            "x": null,
            "y": null
          },
          {
            "name": "Fenda sináptica",
            "description": "Espaço entre neurônio e fibra muscular, onde a acetilcolinesterase degrada acetilcolina.",
            "x": null,
            "y": null
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual estrutura intracelular é composta por sarcômeros dispostos em série?",
        "answers": [
          "Sarcolema",
          "Miofibrila",
          "Retículo sarcoplasmático",
          "Linha Z"
        ],
        "correct": 1,
        "explain": "Estrutura intracelular constituída por sarcômeros em série."
      },
      {
        "q": "Qual estrutura da fibra muscular conduz o potencial de ação pela superfície celular?",
        "answers": [
          "Filamento fino",
          "Filamento grosso",
          "Banda A",
          "Sarcolema"
        ],
        "correct": 3,
        "explain": "Membrana plasmática da fibra muscular, conduz a despolarização."
      },
      {
        "q": "Qual estrutura delimita as extremidades de um sarcômero?",
        "answers": [
          "Linha Z",
          "Banda I",
          "Zona H",
          "Placa motora"
        ],
        "correct": 0,
        "explain": "Delimita o sarcômero e ancora filamentos finos."
      },
      {
        "q": "Qual filamento contém actina e proteínas reguladoras associadas?",
        "answers": [
          "Terminal axonal",
          "Fenda sináptica",
          "Filamento fino",
          "Miofibrila"
        ],
        "correct": 2,
        "explain": "Composto principalmente por actina, tropomiosina e troponina."
      },
      {
        "q": "Qual banda mantém aproximadamente seu comprimento durante o deslizamento dos filamentos?",
        "answers": [
          "Sarcolema",
          "Banda A",
          "Retículo sarcoplasmático",
          "Linha Z"
        ],
        "correct": 1,
        "explain": "Corresponde ao comprimento dos filamentos grossos e permanece aproximadamente constante durante o encurtamento."
      },
      {
        "q": "Qual região contém receptores nicotínicos que recebem acetilcolina do neurônio motor?",
        "answers": [
          "Filamento fino",
          "Filamento grosso",
          "Banda A",
          "Placa motora"
        ],
        "correct": 3,
        "explain": "Região pós-sináptica especializada com receptores nicotínicos de acetilcolina."
      }
    ]
  },
  "biomecanica": {
    "title": "Biomecânica",
    "intro": "Alavancas, torque, estabilidade e tipos de ação muscular.",
    "scenes": [
      {
        "file": "cotovelo.webp",
        "label": "Flexão do cotovelo",
        "description": "Estudo anatômico: flexão do cotovelo.",
        "ready": false,
        "points": [
          {
            "name": "Bíceps braquial",
            "description": "Produz torque de flexão; em uma configuração típica de flexão com carga na mão, a força muscular atua entre eixo e resistência.",
            "x": null,
            "y": null
          },
          {
            "name": "Eixo do cotovelo",
            "description": "Referência aproximada em torno da qual ocorre flexão e extensão.",
            "x": null,
            "y": null
          },
          {
            "name": "Carga distal",
            "description": "A resistência externa produz torque dependente da força e do braço de momento.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "quadril.webp",
        "label": "Estabilidade pélvica",
        "description": "Estudo anatômico: estabilidade pélvica.",
        "ready": false,
        "points": [
          {
            "name": "Abdutores do quadril",
            "description": "Geram torque que se opõe à queda da pelve contralateral no apoio unipodal.",
            "x": null,
            "y": null
          },
          {
            "name": "Centro articular do quadril",
            "description": "Referência de rotação para análise do torque no plano frontal.",
            "x": null,
            "y": null
          },
          {
            "name": "Pelve",
            "description": "Segmento cuja orientação é controlada pela ação muscular e pelas forças externas.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "joelho.webp",
        "label": "Controle do joelho",
        "description": "Estudo anatômico: controle do joelho.",
        "ready": false,
        "points": [
          {
            "name": "Quadríceps",
            "description": "Pode atuar concentricamente na subida ou excentricamente no controle da descida, dependendo da tarefa.",
            "x": null,
            "y": null
          },
          {
            "name": "Isquiotibiais",
            "description": "Participam da flexão do joelho e podem coativar para estabilização articular.",
            "x": null,
            "y": null
          },
          {
            "name": "Patela",
            "description": "Aumenta o braço de momento do mecanismo extensor do joelho.",
            "x": null,
            "y": null
          }
        ]
      },
      {
        "file": "tornozelo.webp",
        "label": "Propulsão plantar",
        "description": "Estudo anatômico: propulsão plantar.",
        "ready": false,
        "points": [
          {
            "name": "Tríceps sural",
            "description": "Gera torque de flexão plantar e contribui para a propulsão na marcha.",
            "x": null,
            "y": null
          },
          {
            "name": "Cabeças metatarsais",
            "description": "Região de apoio no antepé durante elevação do calcanhar.",
            "x": null,
            "y": null
          },
          {
            "name": "Tendão calcâneo",
            "description": "Transmite força muscular e pode armazenar e devolver energia elástica durante o movimento.",
            "x": null,
            "y": null
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Qual músculo gera torque de flexão do cotovelo e participa de uma alavanca de terceira classe?",
        "answers": [
          "Eixo do cotovelo",
          "Bíceps braquial",
          "Carga distal",
          "Abdutores do quadril"
        ],
        "correct": 1,
        "explain": "Produz torque de flexão; em uma configuração típica de flexão com carga na mão, a força muscular atua entre eixo e resistência."
      },
      {
        "q": "Qual elemento representa a referência de rotação em uma análise de alavanca?",
        "answers": [
          "Centro articular do quadril",
          "Pelve",
          "Quadríceps",
          "Eixo do cotovelo"
        ],
        "correct": 3,
        "explain": "Referência aproximada em torno da qual ocorre flexão e extensão."
      },
      {
        "q": "Qual grupo muscular produz torque para estabilizar a pelve no apoio em uma perna?",
        "answers": [
          "Abdutores do quadril",
          "Isquiotibiais",
          "Patela",
          "Tríceps sural"
        ],
        "correct": 0,
        "explain": "Geram torque que se opõe à queda da pelve contralateral no apoio unipodal."
      },
      {
        "q": "Qual referência é usada para calcular o braço de momento dos abdutores no plano frontal?",
        "answers": [
          "Cabeças metatarsais",
          "Tendão calcâneo",
          "Centro articular do quadril",
          "Bíceps braquial"
        ],
        "correct": 2,
        "explain": "Referência de rotação para análise do torque no plano frontal."
      },
      {
        "q": "Qual grupo controla excentricamente a flexão do joelho durante a descida de um degrau?",
        "answers": [
          "Eixo do cotovelo",
          "Quadríceps",
          "Carga distal",
          "Abdutores do quadril"
        ],
        "correct": 1,
        "explain": "Pode atuar concentricamente na subida ou excentricamente no controle da descida, dependendo da tarefa."
      },
      {
        "q": "Qual grupo muscular gera a maior parte do torque de flexão plantar na propulsão?",
        "answers": [
          "Centro articular do quadril",
          "Pelve",
          "Quadríceps",
          "Tríceps sural"
        ],
        "correct": 3,
        "explain": "Gera torque de flexão plantar e contribui para a propulsão na marcha."
      }
    ]
  }
};
