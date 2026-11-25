export const nervosoLabs:Record<string,{title:string;intro:string;scenes:{file:string;label:string;description:string;ready:boolean;points:{name:string;x:number;y:number;description:string}[]}[];quiz:{q:string;answers:string[];correct:number;explain:string}[]}> = {
  "cerebro": {
    "title": "Cérebro",
    "intro": "Explore a organização externa e interna dos hemisférios cerebrais e suas relações com outras estruturas do encéfalo.",
    "scenes": [
      {
        "file": "lateral.png",
        "label": "Vista lateral",
        "description": "Visão externa de um hemisfério; limites lobares aproximados.",
        "points": [
          {
            "name": "Região frontal",
            "x": 26,
            "y": 33,
            "description": "Participa do planejamento, controle motor voluntário e funções executivas."
          },
          {
            "name": "Região parietal",
            "x": 54,
            "y": 27,
            "description": "Integra informações somatossensoriais e espaciais."
          },
          {
            "name": "Cerebelo",
            "x": 74,
            "y": 66,
            "description": "Coordena movimentos e participa da aprendizagem motora."
          }
        ],
        "ready": true
      },
      {
        "file": "superior.png",
        "label": "Vista superior",
        "description": "Hemisférios e superfície cortical vistos de cima.",
        "points": [
          {
            "name": "Hemisfério esquerdo da imagem",
            "x": 30,
            "y": 45,
            "description": "Cada hemisfério contém áreas motoras, sensitivas e associativas."
          },
          {
            "name": "Fissura longitudinal",
            "x": 50,
            "y": 44,
            "description": "Separa os hemisférios cerebrais."
          },
          {
            "name": "Giros corticais",
            "x": 70,
            "y": 62,
            "description": "Dobras que ampliam a superfície do córtex."
          }
        ],
        "ready": true
      },
      {
        "file": "sagital.png",
        "label": "Corte sagital",
        "description": "Plano mediano, com estruturas profundas e cerebelo.",
        "points": [
          {
            "name": "Corpo caloso",
            "x": 49,
            "y": 31,
            "description": "Grande comissura de fibras que conecta os hemisférios."
          },
          {
            "name": "Região talâmica",
            "x": 52,
            "y": 45,
            "description": "O tálamo integra e retransmite grande parte das informações destinadas ao córtex."
          },
          {
            "name": "Tronco encefálico",
            "x": 54,
            "y": 73,
            "description": "Conecta o encéfalo à medula e contém circuitos essenciais à vida."
          }
        ],
        "ready": true
      },
      {
        "file": "coronal.png",
        "label": "Corte coronal",
        "description": "Corte frontal ilustrativo; a representação interna é simplificada.",
        "points": [
          {
            "name": "Córtex cerebral",
            "x": 23,
            "y": 30,
            "description": "Camada superficial de substância cinzenta."
          },
          {
            "name": "Substância branca",
            "x": 34,
            "y": 42,
            "description": "Contém axônios que conectam regiões do sistema nervoso."
          },
          {
            "name": "Região ventricular",
            "x": 50,
            "y": 47,
            "description": "Os ventrículos contêm líquido cefalorraquidiano."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Qual estrutura conecta os hemisférios cerebrais?",
        "answers": [
          "Corpo caloso",
          "Bulbo",
          "Cerebelo",
          "Medula"
        ],
        "correct": 0,
        "explain": "O corpo caloso contém fibras comissurais."
      },
      {
        "q": "Qual lobo está mais associado ao processamento visual primário?",
        "answers": [
          "Frontal",
          "Occipital",
          "Parietal",
          "Temporal"
        ],
        "correct": 1,
        "explain": "O córtex visual primário localiza-se no lobo occipital."
      },
      {
        "q": "Onde se encontra o córtex motor primário?",
        "answers": [
          "Giro pós-central",
          "Cerebelo",
          "Giro pré-central",
          "Tálamo"
        ],
        "correct": 2,
        "explain": "O giro pré-central situa-se no lobo frontal."
      },
      {
        "q": "Qual é uma função dos giros?",
        "answers": [
          "Produzir hormônios",
          "Separar os ventrículos",
          "Conduzir sangue",
          "Ampliar a superfície cortical"
        ],
        "correct": 3,
        "explain": "As dobras aumentam a área do córtex."
      },
      {
        "q": "Qual estrutura retransmite grande parte das informações sensoriais ao córtex?",
        "answers": [
          "Tálamo",
          "Ponte",
          "Hipófise",
          "Bulbo"
        ],
        "correct": 0,
        "explain": "O tálamo é um importante centro de retransmissão."
      },
      {
        "q": "O que predomina na substância branca?",
        "answers": [
          "Corpos celulares exclusivamente",
          "Axônios, muitos mielinizados",
          "Líquor",
          "Tecido ósseo"
        ],
        "correct": 1,
        "explain": "A mielina contribui para a cor clara e condução eficiente."
      }
    ]
  },
  "cerebelo": {
    "title": "Cerebelo",
    "intro": "Estude a superfície cerebelar, a árvore da vida e a organização funcional das conexões cerebelares.",
    "scenes": [
      {
        "file": "posterior.png",
        "label": "Vista posterior",
        "description": "Superfície cerebelar com vermis mediano.",
        "points": [
          {
            "name": "Vermis",
            "x": 50,
            "y": 43,
            "description": "Região mediana relacionada ao controle axial e postural."
          },
          {
            "name": "Hemisfério cerebelar",
            "x": 26,
            "y": 50,
            "description": "Participa da coordenação dos movimentos."
          },
          {
            "name": "Fólios cerebelares",
            "x": 72,
            "y": 62,
            "description": "Dobras estreitas da superfície do cerebelo."
          }
        ],
        "ready": true
      },
      {
        "file": "inferior.png",
        "label": "Vista inferior",
        "description": "Vista inferior ilustrativa das conexões do cerebelo.",
        "points": [
          {
            "name": "Vermis inferior",
            "x": 50,
            "y": 58,
            "description": "Região mediana com funções de coordenação postural."
          },
          {
            "name": "Hemisfério cerebelar",
            "x": 25,
            "y": 58,
            "description": "Integra informações para ajustar a execução motora."
          },
          {
            "name": "Região dos pedúnculos",
            "x": 35,
            "y": 39,
            "description": "Os pedúnculos conectam o cerebelo ao tronco encefálico."
          }
        ],
        "ready": true
      },
      {
        "file": "sagital.png",
        "label": "Corte sagital",
        "description": "A árvore da vida é visível em corte.",
        "points": [
          {
            "name": "Árvore da vida",
            "x": 52,
            "y": 49,
            "description": "Substância branca cerebelar com ramificações que penetram os fólios."
          },
          {
            "name": "Córtex cerebelar",
            "x": 79,
            "y": 31,
            "description": "Camada superficial de substância cinzenta."
          },
          {
            "name": "Tronco encefálico adjacente",
            "x": 20,
            "y": 68,
            "description": "Relaciona-se ao cerebelo por meio dos pedúnculos."
          }
        ],
        "ready": true
      },
      {
        "file": "profunda.png",
        "label": "Estruturas profundas",
        "description": "Cores ilustrativas das regiões nucleares e fibras; não representam identificação histológica.",
        "points": [
          {
            "name": "Região dos núcleos profundos",
            "x": 30,
            "y": 53,
            "description": "Núcleos profundos integram a saída do circuito cerebelar; o desenho é esquemático."
          },
          {
            "name": "Região dos pedúnculos",
            "x": 33,
            "y": 37,
            "description": "Três pares de pedúnculos conectam o cerebelo ao tronco."
          },
          {
            "name": "Substância branca",
            "x": 75,
            "y": 60,
            "description": "Fibras de comunicação entre córtex, núcleos e outras regiões."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Qual é a principal função motora do cerebelo?",
        "answers": [
          "Produzir força diretamente",
          "Coordenar e ajustar movimentos",
          "Secretar cortisol",
          "Conduzir visão primária"
        ],
        "correct": 1,
        "explain": "O cerebelo ajusta precisão, timing e equilíbrio."
      },
      {
        "q": "O vermis situa-se em qual região?",
        "answers": [
          "Mediana",
          "Occipital",
          "Cervical",
          "Frontal"
        ],
        "correct": 0,
        "explain": "O vermis une as regiões medianas cerebelares."
      },
      {
        "q": "A árvore da vida é formada principalmente por quê?",
        "answers": [
          "Substância cinzenta",
          "Líquor",
          "Substância branca",
          "Osso"
        ],
        "correct": 2,
        "explain": "É o padrão ramificado da substância branca."
      },
      {
        "q": "Quais estruturas conectam o cerebelo ao tronco?",
        "answers": [
          "Corpo caloso",
          "Nervos ópticos",
          "Meninges",
          "Pedúnculos cerebelares"
        ],
        "correct": 3,
        "explain": "São três pares de pedúnculos."
      },
      {
        "q": "Qual célula fornece a principal saída do córtex cerebelar?",
        "answers": [
          "Célula de Purkinje",
          "Osteócito",
          "Hemácia",
          "Célula de Schwann"
        ],
        "correct": 0,
        "explain": "As células de Purkinje são neurônios de saída do córtex cerebelar."
      },
      {
        "q": "Uma alteração cerebelar pode causar qual achado?",
        "answers": [
          "Perda isolada de olfato",
          "Ataxia",
          "Hiperglicemia obrigatória",
          "Fratura"
        ],
        "correct": 1,
        "explain": "A ataxia corresponde à incoordenação dos movimentos."
      }
    ]
  },
  "tronco-encefalico": {
    "title": "Tronco encefálico",
    "intro": "Identifique mesencéfalo, ponte e bulbo nas diferentes perspectivas e compreenda suas funções.",
    "scenes": [
      {
        "file": "anterior.png",
        "label": "Vista anterior",
        "description": "Vista ventral ilustrativa dos três segmentos.",
        "points": [
          {
            "name": "Mesencéfalo",
            "x": 50,
            "y": 20,
            "description": "Região superior do tronco, envolvida em circuitos motores e reflexos."
          },
          {
            "name": "Ponte",
            "x": 50,
            "y": 43,
            "description": "Contém vias de passagem e circuitos associados ao cerebelo e à respiração."
          },
          {
            "name": "Bulbo",
            "x": 50,
            "y": 76,
            "description": "Participa do controle cardiorrespiratório e de reflexos como deglutição."
          }
        ],
        "ready": true
      },
      {
        "file": "posterior.png",
        "label": "Vista posterior",
        "description": "Superfície dorsal com a região do assoalho do quarto ventrículo.",
        "points": [
          {
            "name": "Colículos superiores",
            "x": 44,
            "y": 14,
            "description": "Participam da orientação reflexa a estímulos visuais."
          },
          {
            "name": "Colículos inferiores",
            "x": 44,
            "y": 23,
            "description": "Participam do processamento auditivo."
          },
          {
            "name": "Fossa romboide",
            "x": 50,
            "y": 48,
            "description": "Forma o assoalho do quarto ventrículo."
          }
        ],
        "ready": true
      },
      {
        "file": "lateral.png",
        "label": "Vista lateral",
        "description": "Perfil do tronco, com raízes cranianas representadas de forma simplificada.",
        "points": [
          {
            "name": "Mesencéfalo",
            "x": 57,
            "y": 24,
            "description": "Continua superiormente em direção ao diencéfalo."
          },
          {
            "name": "Ponte",
            "x": 32,
            "y": 42,
            "description": "A porção ventral forma a proeminência pontina."
          },
          {
            "name": "Bulbo",
            "x": 43,
            "y": 75,
            "description": "Continua inferiormente com a medula espinhal."
          }
        ],
        "ready": true
      },
      {
        "file": "sagital.png",
        "label": "Corte sagital",
        "description": "Corte ilustrativo com encéfalo adjacente; trajetos internos não individualizados.",
        "points": [
          {
            "name": "Região mesencefálica",
            "x": 51,
            "y": 28,
            "description": "Região superior do tronco encefálico."
          },
          {
            "name": "Região pontina",
            "x": 39,
            "y": 44,
            "description": "Localizada entre mesencéfalo e bulbo."
          },
          {
            "name": "Região bulbar",
            "x": 47,
            "y": 70,
            "description": "Porção inferior do tronco encefálico."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Quais são os três segmentos do tronco encefálico?",
        "answers": [
          "Tálamo, hipotálamo e hipófise",
          "Mesencéfalo, ponte e bulbo",
          "Córtex, cerebelo e medula",
          "Frontal, parietal e occipital"
        ],
        "correct": 1,
        "explain": "O tronco é constituído por mesencéfalo, ponte e bulbo."
      },
      {
        "q": "Qual segmento continua diretamente com a medula espinhal?",
        "answers": [
          "Bulbo",
          "Ponte",
          "Tálamo",
          "Cerebelo"
        ],
        "correct": 0,
        "explain": "O bulbo é a parte caudal do tronco."
      },
      {
        "q": "Qual estrutura participa de reflexos visuais de orientação?",
        "answers": [
          "Corpo caloso",
          "Hipocampo",
          "Colículo superior",
          "Núcleo caudado"
        ],
        "correct": 2,
        "explain": "Os colículos superiores integram respostas de orientação."
      },
      {
        "q": "A fossa romboide forma o assoalho de qual ventrículo?",
        "answers": [
          "Primeiro lateral",
          "Terceiro",
          "Segundo lateral",
          "Quarto"
        ],
        "correct": 3,
        "explain": "É a superfície dorsal da ponte e do bulbo aberto."
      },
      {
        "q": "Qual região possui centros essenciais ao controle cardiorrespiratório?",
        "answers": [
          "Bulbo",
          "Córtex visual",
          "Corpo caloso",
          "Hipocampo"
        ],
        "correct": 0,
        "explain": "Circuitos bulbares participam do controle vital."
      },
      {
        "q": "Qual região está entre o mesencéfalo e o bulbo?",
        "answers": [
          "Tálamo",
          "Ponte",
          "Cerebelo",
          "Hipófise"
        ],
        "correct": 1,
        "explain": "A ponte é o segmento intermediário."
      }
    ]
  },
  "medula": {
    "title": "Medula espinhal",
    "intro": "Explore a medula no canal vertebral, sua organização interna, raízes nervosas e terminação inferior.",
    "scenes": [
      {
        "file": "posterior.png",
        "label": "Vista posterior",
        "description": "Visão geral do canal vertebral aberto; níveis vertebrais não numerados.",
        "points": [
          {
            "name": "Medula espinhal",
            "x": 50,
            "y": 35,
            "description": "Conduz informações entre encéfalo e corpo e integra reflexos."
          },
          {
            "name": "Raízes espinhais",
            "x": 43,
            "y": 43,
            "description": "Conectam a medula aos nervos espinhais."
          },
          {
            "name": "Região lombossacral",
            "x": 50,
            "y": 79,
            "description": "Abriga as raízes descendentes abaixo da terminação medular."
          }
        ],
        "ready": true
      },
      {
        "file": "transversal.png",
        "label": "Corte transversal",
        "description": "Corte ampliado da substância cinzenta e branca.",
        "points": [
          {
            "name": "Substância cinzenta",
            "x": 47,
            "y": 17,
            "description": "Contém corpos neuronais, dendritos e sinapses; forma de H ou borboleta."
          },
          {
            "name": "Substância branca",
            "x": 40,
            "y": 12,
            "description": "Contém tratos ascendentes e descendentes."
          },
          {
            "name": "Canal central",
            "x": 51,
            "y": 18,
            "description": "Pequeno canal no centro da medula, relacionado ao sistema ventricular."
          }
        ],
        "ready": true
      },
      {
        "file": "raizes.png",
        "label": "Raízes nervosas",
        "description": "Vista oblíqua dos feixes nervosos; gânglios e raízes sensitivas/motoras não são individualizados com segurança.",
        "points": [
          {
            "name": "Feixes radiculares",
            "x": 43,
            "y": 30,
            "description": "Raízes dorsais conduzem aferências; raízes ventrais conduzem eferências."
          },
          {
            "name": "Região de saída dos nervos",
            "x": 28,
            "y": 33,
            "description": "Os nervos espinhais mistos resultam da união das raízes dorsal e ventral."
          },
          {
            "name": "Medula espinhal",
            "x": 55,
            "y": 51,
            "description": "Estrutura central do sistema nervoso no canal vertebral."
          }
        ],
        "ready": true
      },
      {
        "file": "cauda-equina.png",
        "label": "Cone e cauda equina",
        "description": "Região inferior do canal vertebral; filamento terminal não distinguido isoladamente.",
        "points": [
          {
            "name": "Cone medular",
            "x": 51,
            "y": 33,
            "description": "Extremidade afilada da medula, geralmente em L1–L2 no adulto."
          },
          {
            "name": "Cauda equina",
            "x": 49,
            "y": 67,
            "description": "Conjunto de raízes descendentes lombares, sacrais e coccígeas."
          },
          {
            "name": "Região do saco dural",
            "x": 64,
            "y": 55,
            "description": "O saco dural envolve a medula e as raízes; inferiormente contém líquor e a cauda equina."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Quantos pares de nervos espinhais existem normalmente?",
        "answers": [
          "12",
          "24",
          "31",
          "33"
        ],
        "correct": 2,
        "explain": "São 8 cervicais, 12 torácicos, 5 lombares, 5 sacrais e 1 coccígeo."
      },
      {
        "q": "Qual raiz conduz predominantemente aferências sensitivas?",
        "answers": [
          "Dorsal",
          "Ventral",
          "Filamento terminal",
          "Corpo caloso"
        ],
        "correct": 0,
        "explain": "A raiz dorsal leva informações sensitivas à medula."
      },
      {
        "q": "Onde ficam os corpos celulares dos neurônios sensitivos primários espinhais?",
        "answers": [
          "Corno anterior",
          "Gânglio da raiz dorsal",
          "Córtex cerebelar",
          "Ponte"
        ],
        "correct": 1,
        "explain": "O gânglio espinhal abriga os corpos celulares desses neurônios."
      },
      {
        "q": "Em qual nível vertebral geralmente termina a medula adulta?",
        "answers": [
          "C1",
          "T1",
          "S5",
          "L1–L2"
        ],
        "correct": 3,
        "explain": "A terminação em cone medular geralmente ocorre em L1–L2."
      },
      {
        "q": "Qual região possui formato de H no corte transversal?",
        "answers": [
          "Substância cinzenta",
          "Dura-máter",
          "Substância branca",
          "Raiz ventral"
        ],
        "correct": 0,
        "explain": "A substância cinzenta central tem formato de borboleta."
      },
      {
        "q": "O que é a cauda equina?",
        "answers": [
          "Um núcleo cerebral",
          "Conjunto de raízes espinhais descendentes",
          "Uma artéria",
          "Uma glândula"
        ],
        "correct": 1,
        "explain": "As raízes descem pelo canal abaixo do cone medular."
      }
    ]
  },
  "nervos-cranianos": {
    "title": "Nervos cranianos",
    "intro": "Explore a origem e os trajetos de nervos cranianos selecionados. As ilustrações são esquemáticas e não permitem identificação de todos os 12 pares com precisão.",
    "scenes": [
      {
        "file": "inferior.png",
        "label": "Base do encéfalo",
        "description": "Vista inferior ilustrativa; não constitui mapa exato dos 12 pares.",
        "points": [
          {
            "name": "Região anterior olfatória",
            "x": 45,
            "y": 15,
            "description": "O nervo olfatório relaciona-se à percepção de odores; as conexões desenhadas são simplificadas."
          },
          {
            "name": "Região pontina",
            "x": 50,
            "y": 49,
            "description": "Vários nervos cranianos emergem na ponte ou em sua junção com o bulbo."
          },
          {
            "name": "Região bulbar",
            "x": 50,
            "y": 71,
            "description": "Nervos como glossofaríngeo, vago e hipoglosso relacionam-se ao bulbo."
          }
        ],
        "ready": true
      },
      {
        "file": "optico.png",
        "label": "Via óptica",
        "description": "Esquema ilustrativo da via visual; os trajetos posteriores são simplificados.",
        "points": [
          {
            "name": "Nervo óptico",
            "x": 30,
            "y": 27,
            "description": "Transporta sinais da retina em direção ao quiasma."
          },
          {
            "name": "Quiasma óptico",
            "x": 50,
            "y": 41,
            "description": "Local de cruzamento parcial das fibras, sobretudo as provenientes das hemirretinas nasais."
          },
          {
            "name": "Trato óptico",
            "x": 69,
            "y": 53,
            "description": "Conduz informação visual em direção a centros encefálicos, incluindo o corpo geniculado lateral."
          }
        ],
        "ready": true
      },
      {
        "file": "trigemeo.png",
        "label": "Nervo trigêmeo",
        "description": "Distribuição esquemática das três divisões do trigêmeo.",
        "points": [
          {
            "name": "Região oftálmica (V1)",
            "x": 60,
            "y": 22,
            "description": "Divisão sensitiva associada à testa e à córnea."
          },
          {
            "name": "Região maxilar (V2)",
            "x": 57,
            "y": 40,
            "description": "Divisão sensitiva associada à região média da face e aos dentes superiores."
          },
          {
            "name": "Região mandibular (V3)",
            "x": 50,
            "y": 65,
            "description": "Divisão mista; participa da sensibilidade inferior da face e da mastigação."
          }
        ],
        "ready": true
      },
      {
        "file": "vago.png",
        "label": "Nervo vago",
        "description": "Trajeto esquemático e simplificado de conexões vagais viscerais.",
        "points": [
          {
            "name": "Trajeto cervical",
            "x": 40,
            "y": 20,
            "description": "O vago desce no pescoço junto aos vasos da bainha carotídea."
          },
          {
            "name": "Ramos torácicos",
            "x": 66,
            "y": 45,
            "description": "Participam do controle parassimpático cardíaco e pulmonar."
          },
          {
            "name": "Ramos abdominais",
            "x": 59,
            "y": 69,
            "description": "Participam da regulação de vísceras digestórias até parte do cólon."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Qual nervo craniano conduz a visão?",
        "answers": [
          "II — óptico",
          "V — trigêmeo",
          "X — vago",
          "VII — facial"
        ],
        "correct": 0,
        "explain": "O nervo óptico conduz informações da retina."
      },
      {
        "q": "Qual divisão do trigêmeo possui fibras motoras para mastigação?",
        "answers": [
          "V1",
          "V2",
          "V3",
          "Todas"
        ],
        "correct": 2,
        "explain": "A divisão mandibular é mista."
      },
      {
        "q": "Qual nervo participa amplamente do controle parassimpático visceral?",
        "answers": [
          "I",
          "IV",
          "VI",
          "X"
        ],
        "correct": 3,
        "explain": "O nervo vago fornece inervação parassimpática torácica e abdominal."
      },
      {
        "q": "O cruzamento parcial de fibras visuais ocorre onde?",
        "answers": [
          "Ponte",
          "Quiasma óptico",
          "Cerebelo",
          "Bulbo"
        ],
        "correct": 1,
        "explain": "No quiasma cruzam fibras das hemirretinas nasais."
      },
      {
        "q": "Qual par craniano está relacionado ao olfato?",
        "answers": [
          "I",
          "II",
          "VIII",
          "XII"
        ],
        "correct": 0,
        "explain": "O primeiro par é o olfatório."
      },
      {
        "q": "Qual nervo está principalmente ligado à expressão facial?",
        "answers": [
          "V",
          "X",
          "VII",
          "XII"
        ],
        "correct": 2,
        "explain": "O facial inerva os músculos da expressão facial."
      }
    ]
  }
};
