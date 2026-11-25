export const nervosoLabs:Record<string,{title:string;intro:string;scenes:{file:string;label:string;description:string;ready:boolean;points:{name:string;x:number|null;y:number|null;description:string}[]}[];quiz:{q:string;answers:string[];correct:number;explain:string}[]}> = {
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
  },
  "nervos-perifericos": {
    "title": "Nervos periféricos",
    "intro": "Estude os plexos e as principais vias nervosas dos membros. As imagens esquemáticas não individualizam todos os fascículos.",
    "scenes": [
      {
        "file": "plexo-braquial.webp",
        "label": "Plexo braquial",
        "description": "Vista anterior da região cervicoaxilar. As raízes e os fascículos estão representados de forma simplificada.",
        "points": [
          {
            "name": "Região das raízes",
            "x": 79,
            "y": 23,
            "description": "O plexo braquial é formado principalmente pelos ramos anteriores de C5 a T1."
          },
          {
            "name": "Região dos troncos",
            "x": 63,
            "y": 31,
            "description": "Os troncos superior, médio e inferior organizam as fibras antes das divisões."
          },
          {
            "name": "Região dos ramos terminais",
            "x": 28,
            "y": 57,
            "description": "O plexo origina os nervos axilar, musculocutâneo, mediano, radial e ulnar."
          }
        ],
        "ready": true
      },
      {
        "file": "membro-superior.webp",
        "label": "Nervos do membro superior",
        "description": "Vista anterior ilustrativa. Os trajetos dos nervos individuais não são completamente separáveis nesta representação.",
        "points": [
          {
            "name": "Feixes nervosos do braço",
            "x": 33,
            "y": 29,
            "description": "Os ramos do plexo braquial distribuem fibras motoras e sensitivas pelo braço."
          },
          {
            "name": "Trajeto nervoso no antebraço",
            "x": 52,
            "y": 57,
            "description": "Mediano, ulnar e radial contribuem para a inervação do antebraço e da mão."
          },
          {
            "name": "Ramos digitais",
            "x": 78,
            "y": 85,
            "description": "Os nervos digitais conduzem a sensibilidade e participam da distribuição nervosa da mão."
          }
        ],
        "ready": true
      },
      {
        "file": "plexo-lombossacral.png",
        "label": "Plexo lombossacral",
        "description": "Vista anterior esquemática da região lombossacral. Os feixes nervosos individuais não são diferenciados com precisão nesta ilustração.",
        "points": [
          {
            "name": "Região do plexo lombar",
            "x": 34,
            "y": 27,
            "description": "Formado principalmente por ramos anteriores de L1 a L4; contribui para a inervação abdominal e do membro inferior."
          },
          {
            "name": "Região do plexo sacral",
            "x": 63,
            "y": 51,
            "description": "Formado principalmente por L4 a S4; distribui fibras à pelve e aos membros inferiores."
          },
          {
            "name": "Região de saída dos nervos para a coxa",
            "x": 23,
            "y": 69,
            "description": "Nesta região passam nervos destinados ao membro inferior. O nervo femoral, originado de L2 a L4, inerva o quadríceps; seu trajeto individual não pode ser confirmado neste desenho."
          }
        ],
        "ready": true
      },
      {
        "file": "ciatico.png",
        "label": "Nervo ciático",
        "description": "Vista posterior oblíqua esquemática do trajeto ciático e de suas divisões. Os trajetos distais são simplificados.",
        "points": [
          {
            "name": "Nervo ciático",
            "x": 43,
            "y": 30,
            "description": "Origina-se de L4 a S3 e percorre habitualmente a região posterior da coxa."
          },
          {
            "name": "Nervo tibial",
            "x": 43,
            "y": 64,
            "description": "Inerva músculos da região posterior da perna e estruturas plantares."
          },
          {
            "name": "Região do ramo fibular comum",
            "x": 50,
            "y": 47,
            "description": "Segue lateralmente próximo à cabeça da fíbula e origina os ramos superficial e profundo."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Quais raízes contribuem principalmente para o plexo braquial?",
        "answers": [
          "C5–T1",
          "T2–T6",
          "L2–L4",
          "S2–S4"
        ],
        "correct": 0,
        "explain": "Os ramos anteriores de C5 a T1 constituem tipicamente o plexo braquial."
      },
      {
        "q": "Qual nervo é especialmente associado ao túnel do carpo?",
        "answers": [
          "Radial",
          "Mediano",
          "Femoral",
          "Tibial"
        ],
        "correct": 1,
        "explain": "O nervo mediano atravessa o túnel do carpo."
      },
      {
        "q": "Qual nervo inerva o quadríceps?",
        "answers": [
          "Ulnar",
          "Vago",
          "Femoral",
          "Tibial"
        ],
        "correct": 2,
        "explain": "O nervo femoral fornece inervação motora ao quadríceps."
      },
      {
        "q": "Quais são as duas divisões principais do nervo ciático?",
        "answers": [
          "Mediano e ulnar",
          "Femoral e obturatório",
          "Axilar e radial",
          "Tibial e fibular comum"
        ],
        "correct": 3,
        "explain": "O ciático divide-se nos nervos tibial e fibular comum."
      },
      {
        "q": "Qual nervo passa próximo ao colo da fíbula?",
        "answers": [
          "Fibular comum",
          "Mediano",
          "Facial",
          "Hipoglosso"
        ],
        "correct": 0,
        "explain": "O fibular comum contorna o colo da fíbula, onde é superficial."
      },
      {
        "q": "Qual tipo de fibra leva informações sensitivas ao sistema nervoso central?",
        "answers": [
          "Eferente",
          "Aferente",
          "Exclusivamente motora",
          "Exclusivamente glandular"
        ],
        "correct": 1,
        "explain": "Fibras aferentes conduzem sinais em direção ao sistema nervoso central."
      }
    ]
  },
  "sinapses": {
    "title": "Sinapses",
    "intro": "Explore a transmissão química e elétrica entre células excitáveis. Cores, distâncias e partículas das imagens são recursos esquemáticos, não representações moleculares em escala.",
    "scenes": [
      {
        "file": "quimica.webp",
        "label": "Sinapse química",
        "description": "Visão ampliada do terminal pré-sináptico e da membrana pós-sináptica.",
        "points": [
          {
            "name": "Vesículas sinápticas",
            "x": 42,
            "y": 32,
            "description": "Armazenam neurotransmissores que podem ser liberados por exocitose."
          },
          {
            "name": "Fenda sináptica",
            "x": 55,
            "y": 56,
            "description": "Espaço extracelular pelo qual os neurotransmissores difundem."
          },
          {
            "name": "Receptores pós-sinápticos",
            "x": 61,
            "y": 64,
            "description": "Proteínas que respondem à ligação do neurotransmissor."
          }
        ],
        "ready": true
      },
      {
        "file": "exocitose.webp",
        "label": "Liberação de neurotransmissores",
        "description": "Representação da fusão vesicular e liberação química.",
        "points": [
          {
            "name": "Terminal pré-sináptico",
            "x": 35,
            "y": 38,
            "description": "A chegada de um potencial de ação pode abrir canais de cálcio dependentes de voltagem."
          },
          {
            "name": "Vesícula em fusão",
            "x": 52,
            "y": 53,
            "description": "A entrada de cálcio favorece a fusão das vesículas com a membrana."
          },
          {
            "name": "Neurotransmissores",
            "x": 58,
            "y": 62,
            "description": "Moléculas liberadas na fenda que podem alcançar receptores."
          }
        ],
        "ready": true
      },
      {
        "file": "receptores.webp",
        "label": "Receptores pós-sinápticos",
        "description": "Ilustração de receptores e resposta celular. O brilho representa atividade, não corrente elétrica visível.",
        "points": [
          {
            "name": "Neurotransmissores",
            "x": 59,
            "y": 50,
            "description": "Moléculas que podem ligar-se a receptores específicos."
          },
          {
            "name": "Receptor ionotrópico ilustrativo",
            "x": 58,
            "y": 62,
            "description": "A ligação do neurotransmissor pode alterar a abertura de um canal iônico."
          },
          {
            "name": "Membrana pós-sináptica",
            "x": 49,
            "y": 72,
            "description": "Mudanças de condutância podem alterar o potencial de membrana; nem toda sinapse gera um potencial de ação."
          }
        ],
        "ready": true
      },
      {
        "file": "eletrica.webp",
        "label": "Sinapse elétrica",
        "description": "Esquema de junções comunicantes; dimensões e brilho não são literais.",
        "points": [
          {
            "name": "Membrana da primeira célula",
            "x": 45,
            "y": 43,
            "description": "A membrana contém conexons que se alinham aos da célula adjacente."
          },
          {
            "name": "Junção comunicante",
            "x": 51,
            "y": 50,
            "description": "Canais intercelulares permitem passagem direta de íons e pequenas moléculas."
          },
          {
            "name": "Membrana da segunda célula",
            "x": 51,
            "y": 59,
            "description": "A transmissão elétrica é frequentemente rápida e pode ser bidirecional."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Qual íon desencadeia tipicamente a liberação vesicular?",
        "answers": [
          "Cloreto",
          "Cálcio",
          "Ferro",
          "Magnésio"
        ],
        "correct": 1,
        "explain": "A entrada de cálcio no terminal promove a fusão vesicular."
      },
      {
        "q": "Como neurotransmissores atravessam a fenda química?",
        "answers": [
          "Difusão",
          "Fluxo sanguíneo",
          "Transporte ósseo",
          "Contração muscular"
        ],
        "correct": 0,
        "explain": "As moléculas liberadas difundem pela fenda."
      },
      {
        "q": "O que permite comunicação direta em sinapses elétricas?",
        "answers": [
          "Vesículas",
          "Mielina",
          "Junções comunicantes",
          "Hormônios circulantes"
        ],
        "correct": 2,
        "explain": "As junções comunicantes conectam os citoplasmas por canais."
      },
      {
        "q": "Qual receptor funciona diretamente como canal iônico regulado por ligante?",
        "answers": [
          "Receptor nuclear",
          "Receptor metabotrópico",
          "Transportador de glicose",
          "Receptor ionotrópico"
        ],
        "correct": 3,
        "explain": "O ionotrópico modifica a condutância iônica diretamente."
      },
      {
        "q": "Toda ligação a receptor pós-sináptico gera potencial de ação?",
        "answers": [
          "Não, depende da integração dos sinais",
          "Sim, sempre",
          "Somente no cerebelo",
          "Apenas em sinapses elétricas"
        ],
        "correct": 0,
        "explain": "Os efeitos pós-sinápticos podem ser excitatórios ou inibitórios e são integrados pela célula."
      },
      {
        "q": "Qual mecanismo pode terminar a ação de um neurotransmissor?",
        "answers": [
          "Ossificação",
          "Recaptação ou degradação",
          "Produção de hemácias",
          "Contração do axônio"
        ],
        "correct": 1,
        "explain": "Recaptação, degradação e difusão podem limitar o sinal."
      }
    ]
  },
  "reflexos": {
    "title": "Reflexos",
    "intro": "Estude respostas reflexas medulares e do tronco encefálico. As ilustrações de IA são esquemáticas; algumas setas e trajetos estão inconsistentes e não devem ser usados para inferir o sentido anatômico da condução. Use as explicações e a revisão especializada.",
    "scenes": [
      {
        "file": "arco-medular.webp",
        "label": "Arco reflexo medular",
        "description": "Circuito de estiramento simplificado. As setas ilustradas não são uma referência confiável de direção.",
        "points": [
          {
            "name": "Fuso neuromuscular",
            "x": 20,
            "y": 22,
            "description": "Detecta o estiramento muscular e envia informação pelas fibras sensitivas."
          },
          {
            "name": "Gânglio da raiz dorsal",
            "x": 49,
            "y": 19,
            "description": "Abriga os corpos celulares dos neurônios sensitivos espinhais."
          },
          {
            "name": "Região da substância cinzenta",
            "x": 76,
            "y": 29,
            "description": "A aferência Ia pode excitar diretamente o motoneurônio alfa no reflexo de estiramento; outros circuitos usam interneurônios."
          }
        ],
        "ready": true
      },
      {
        "file": "patelar.png",
        "label": "Reflexo patelar",
        "description": "Representação esquemática da resposta de extensão do joelho. A posição ilustrada do martelo e as setas não são referência confiável de técnica ou de direção da condução nervosa.",
        "points": [
          {
            "name": "Região do quadríceps",
            "x": 16,
            "y": 19,
            "description": "A percussão adequada do ligamento patelar estira o quadríceps."
          },
          {
            "name": "Região do joelho",
            "x": 31,
            "y": 52,
            "description": "O estímulo do ligamento patelar desencadeia a resposta reflexa."
          },
          {
            "name": "Região medular",
            "x": 78,
            "y": 20,
            "description": "O reflexo envolve principalmente L2–L4, com predomínio de L4, e o nervo femoral."
          }
        ],
        "ready": true
      },
      {
        "file": "retirada.webp",
        "label": "Reflexo de retirada",
        "description": "Resposta protetora a estímulo nocivo; a ilustração simplifica as conexões e apresenta inconsistências nas setas.",
        "points": [
          {
            "name": "Receptor nociceptivo",
            "x": 17,
            "y": 22,
            "description": "Terminações nervosas livres detectam estímulos potencialmente lesivos."
          },
          {
            "name": "Região de integração medular",
            "x": 76,
            "y": 18,
            "description": "Interneurônios medulares coordenam o reflexo polissináptico."
          },
          {
            "name": "Membro em retirada",
            "x": 22,
            "y": 71,
            "description": "A ativação de músculos flexores e a inibição de antagonistas ajudam a afastar o membro do estímulo."
          }
        ],
        "ready": true
      },
      {
        "file": "pupilar.webp",
        "label": "Reflexo fotomotor pupilar",
        "description": "Resposta à luz. Os trajetos e setas são esquemáticos e não representam fielmente as conexões bilaterais.",
        "points": [
          {
            "name": "Retina ilustrada",
            "x": 45,
            "y": 38,
            "description": "Detecta luz e inicia a via aferente pelo nervo óptico."
          },
          {
            "name": "Região mesencefálica",
            "x": 78,
            "y": 29,
            "description": "A via pré-tectal projeta-se bilateralmente aos núcleos de Edinger–Westphal."
          },
          {
            "name": "Região da íris",
            "x": 42,
            "y": 74,
            "description": "O esfíncter da pupila contrai-se por ação parassimpática conduzida pelo nervo oculomotor e pelo gânglio ciliar."
          }
        ],
        "ready": true
      }
    ],
    "quiz": [
      {
        "q": "Qual receptor detecta o estiramento no reflexo miotático?",
        "answers": [
          "Fuso neuromuscular",
          "Retina",
          "Corpúsculo gustativo",
          "Órgão vestibular"
        ],
        "correct": 0,
        "explain": "O fuso detecta mudanças no comprimento muscular."
      },
      {
        "q": "Qual nervo participa do reflexo patelar?",
        "answers": [
          "Tibial",
          "Femoral",
          "Mediano",
          "Facial"
        ],
        "correct": 1,
        "explain": "O nervo femoral conduz as fibras aferentes e eferentes do reflexo."
      },
      {
        "q": "Qual é uma característica do reflexo de retirada?",
        "answers": [
          "É exclusivamente cortical",
          "Depende de um único neurônio",
          "É polissináptico",
          "É sempre voluntário"
        ],
        "correct": 2,
        "explain": "Interneurônios espinhais coordenam a resposta protetora."
      },
      {
        "q": "Qual nervo constitui a via aferente do reflexo fotomotor?",
        "answers": [
          "Vago",
          "Troclear",
          "Oculomotor",
          "Óptico"
        ],
        "correct": 3,
        "explain": "O nervo óptico conduz a informação luminosa à via pré-tectal."
      },
      {
        "q": "Qual nervo conduz a via parassimpática eferente do reflexo fotomotor?",
        "answers": [
          "Oculomotor",
          "Facial",
          "Trigêmeo",
          "Abducente"
        ],
        "correct": 0,
        "explain": "O III par conduz fibras pré-ganglionares até o gânglio ciliar."
      },
      {
        "q": "Qual resposta é esperada no reflexo patelar?",
        "answers": [
          "Flexão dos dedos",
          "Extensão do joelho",
          "Dilatação pupilar",
          "Abdução do ombro"
        ],
        "correct": 1,
        "explain": "A contração reflexa do quadríceps promove extensão do joelho."
      }
    ]
  }
};
