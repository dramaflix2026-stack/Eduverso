import type {FundamentalQuestion,FundamentalTopic} from "./fundamental-topic-catalog";
// Conteúdos didáticos introdutórios do 2º ano, sem equivalência à totalidade das habilidades da BNCC.
export const yearTwoOther:Record<string,{intro:{sections:string[];examples:string[];visual:string[];questions:FundamentalQuestion[]};extra:Omit<FundamentalTopic,"expanded">[]}> = {
 "2:geografia": {
  "intro": {
   "sections": [
    "Um mapa é uma representação de um lugar. Ele pode mostrar ruas, rios, construções ou caminhos vistos de cima. Os mapas não precisam ter todos os detalhes: mostram informações selecionadas.",
    "Para facilitar a leitura, os mapas podem usar cores, desenhos e símbolos. A legenda explica o que esses símbolos significam. Um desenho de árvore, por exemplo, pode indicar uma área verde.",
    "Observe com atenção um mapa simples da escola. Compare o desenho com os espaços reais e encontre o pátio, as salas e o portão usando os símbolos disponíveis."
   ],
   "examples": [
    "Num mapa do bairro, um pequeno desenho de árvore pode representar uma praça.",
    "Uma legenda pode indicar que um símbolo azul corresponde a um rio."
   ],
   "visual": [
    "🗺️",
    "🌳",
    "🏠",
    "📍"
   ],
   "questions": [
    {
     "prompt": "Para que serve a legenda de um mapa?",
     "choices": [
      "Para apagar caminhos",
      "Para aumentar a altura dos prédios",
      "Para explicar os símbolos"
     ],
     "correct": 2,
     "explanation": "A legenda apresenta o significado dos símbolos do mapa."
    },
    {
     "prompt": "O que um mapa pode mostrar?",
     "choices": [
      "Ruas e lugares de uma região",
      "Todos os pensamentos das pessoas",
      "A história completa de cada morador"
     ],
     "correct": 0,
     "explanation": "Mapas podem representar ruas, construções e elementos naturais."
    },
    {
     "prompt": "Em um mapa, uma árvore desenhada pode representar...",
     "choices": [
      "Uma pergunta de matemática",
      "Uma área verde, conforme a legenda",
      "Um número de telefone sempre"
     ],
     "correct": 1,
     "explanation": "O significado do símbolo depende da legenda."
    },
    {
     "prompt": "Qual imagem ajuda a encontrar o pátio da escola?",
     "choices": [
      "Uma foto de outro planeta sem identificação",
      "Um calendário do ano passado",
      "Um mapa simples da escola"
     ],
     "correct": 2,
     "explanation": "O mapa escolar mostra a organização dos espaços."
    },
    {
     "prompt": "Um mapa precisa representar todos os detalhes da realidade?",
     "choices": [
      "Não, apresenta informações selecionadas",
      "Sim, todos os objetos do mundo",
      "Sim, até pensamentos e sons"
     ],
     "correct": 0,
     "explanation": "Um mapa simplifica a realidade para destacar o que interessa."
    }
   ]
  },
  "extra": [
   {
    "id": "trajetos",
    "title": "Trajetos e referências",
    "objective": "Descrever caminhos conhecidos com pontos de referência e segurança.",
    "sections": [
     "Um trajeto é o caminho percorrido entre um lugar e outro. Para explicar como chegar à biblioteca da escola, podemos usar expressões como siga em frente, vire à direita e passe pelo portão.",
     "Pontos de referência facilitam a orientação. Um mural, uma árvore ou uma porta colorida podem ajudar alguém a reconhecer onde está. Uma seta em um desenho mostra uma direção.",
     "Na rua, crianças precisam de orientação de um adulto responsável e atenção à segurança. Para esta atividade, descreva um trajeto dentro de um espaço familiar, como da sala até o pátio."
    ],
    "examples": [
     "Da sala à biblioteca, podemos passar pelo corredor e virar perto do mural.",
     "O portão principal pode funcionar como referência para a entrada."
    ],
    "visual": [
     "🚪",
     "➡️",
     "🏫",
     "📚"
    ],
    "questions": [
     {
      "prompt": "O que é um trajeto?",
      "choices": [
       "Um objeto sem localização",
       "Uma cor de tinta",
       "O caminho entre dois lugares"
      ],
      "correct": 2,
      "explanation": "Trajeto é um percurso realizado entre lugares."
     },
     {
      "prompt": "O que pode ser um ponto de referência?",
      "choices": [
       "Uma árvore conhecida perto do caminho",
       "Um número inventado sem localização",
       "Somente o nome de uma pessoa distante"
      ],
      "correct": 0,
      "explanation": "Uma árvore visível pode ajudar a reconhecer o local."
     },
     {
      "prompt": "Em um desenho de percurso, o que uma seta costuma indicar?",
      "choices": [
       "O nome de quem desenhou sempre",
       "Uma direção",
       "O preço da escola"
      ],
      "correct": 1,
      "explanation": "Setas podem indicar para onde seguir."
     },
     {
      "prompt": "Qual é uma maneira clara de explicar um caminho?",
      "choices": [
       "Dizer apenas que o lugar existe",
       "Misturar locais sem sequência",
       "Citar marcos e direções em ordem"
      ],
      "correct": 2,
      "explanation": "Direções ordenadas e referências tornam o trajeto compreensível."
     },
     {
      "prompt": "Qual cuidado é importante ao andar pela rua?",
      "choices": [
       "Seguir regras de segurança e orientação responsável",
       "Atravessar sem observar o trânsito",
       "Ignorar as faixas de pedestres"
      ],
      "correct": 0,
      "explanation": "Crianças devem circular em segurança com orientação adequada."
     }
    ]
   },
   {
    "id": "paisagens",
    "title": "Paisagens naturais e construídas",
    "objective": "Identificar elementos da natureza e modificações feitas pelas pessoas.",
    "sections": [
     "Paisagem é tudo o que podemos perceber em um lugar, como construções, plantas, ruas, rios e sons. Ao olhar uma fotografia, notamos elementos diferentes que compõem a cena.",
     "Elementos naturais incluem rios, montanhas e árvores que crescem na natureza. Elementos construídos pelas pessoas incluem prédios, pontes e estradas. Uma paisagem pode misturar esses dois tipos.",
     "As paisagens mudam com o tempo. A construção de uma ponte ou o crescimento de uma árvore pode alterar o que vemos. Observe o bairro e identifique elementos naturais e construídos."
    ],
    "examples": [
     "Numa praça, uma árvore e um banco aparecem juntos, mas têm origens diferentes.",
     "Uma ponte é construída; um rio é um elemento natural da paisagem."
    ],
    "visual": [
     "🌳",
     "🌉",
     "🏢",
     "🌊"
    ],
    "questions": [
     {
      "prompt": "Qual elemento costuma ser construído pelas pessoas?",
      "choices": [
       "Rio natural",
       "Montanha",
       "Ponte"
      ],
      "correct": 2,
      "explanation": "Uma ponte é construída para permitir passagens."
     },
     {
      "prompt": "Qual exemplo é um elemento natural de uma paisagem?",
      "choices": [
       "Montanha",
       "Prédio",
       "Calçada"
      ],
      "correct": 0,
      "explanation": "Montanhas são formações naturais."
     },
     {
      "prompt": "Uma paisagem pode reunir árvores e edifícios?",
      "choices": [
       "Apenas se estiver dentro de um livro",
       "Sim",
       "Não, nunca"
      ],
      "correct": 1,
      "explanation": "Uma paisagem pode combinar elementos naturais e construídos."
     },
     {
      "prompt": "O que pode modificar a paisagem de uma rua?",
      "choices": [
       "Uma palavra escrita num papel distante",
       "O número de letras do nome de um aluno",
       "A construção de uma praça"
      ],
      "correct": 2,
      "explanation": "Construções e mudanças ambientais alteram paisagens."
     },
     {
      "prompt": "Ao observar uma fotografia de um lugar, o que podemos identificar?",
      "choices": [
       "Elementos naturais e construídos",
       "O pensamento exato de todas as pessoas",
       "Todos os acontecimentos futuros"
      ],
      "correct": 0,
      "explanation": "Uma fotografia pode mostrar diferentes partes da paisagem."
     }
    ]
   },
   {
    "id": "agua-ambiente",
    "title": "Água e cuidados com os lugares",
    "objective": "Reconhecer usos da água e ações para cuidar do ambiente.",
    "sections": [
     "A água é importante para pessoas, animais e plantas. Usamos água para beber, preparar alimentos e fazer higiene. Em muitas comunidades, rios e reservatórios ajudam no abastecimento.",
     "Nem toda água encontrada no ambiente é própria para beber. Ela precisa passar por cuidados e, em muitos lugares, por tratamento. Também devemos evitar desperdícios e impedir que resíduos sejam jogados nos rios.",
     "Em casa e na escola, podemos fechar a torneira quando não estiver sendo utilizada e avisar um adulto quando houver vazamentos. Pequenas ações ajudam a cuidar dos recursos disponíveis."
    ],
    "examples": [
     "Ao ensaboar as mãos, podemos fechar a torneira e abri-la novamente para enxaguar.",
     "Não devemos beber água diretamente de rios sem tratamento."
    ],
    "visual": [
     "💧",
     "🚰",
     "🌊",
     "🌱"
    ],
    "questions": [
     {
      "prompt": "Qual atitude ajuda a evitar desperdício de água?",
      "choices": [
       "Deixar a torneira aberta sem necessidade",
       "Ignorar um vazamento",
       "Fechar a torneira quando não está sendo usada"
      ],
      "correct": 2,
      "explanation": "Fechar a torneira reduz o desperdício."
     },
     {
      "prompt": "Qual uso da água é importante para a saúde?",
      "choices": [
       "Beber água potável",
       "Beber qualquer água de poça",
       "Usar água suja para cozinhar"
      ],
      "correct": 0,
      "explanation": "A água própria para consumo é importante para a saúde."
     },
     {
      "prompt": "O que fazer ao notar um vazamento em casa?",
      "choices": [
       "Esconder o problema",
       "Avisar uma pessoa responsável",
       "Aumentar a abertura da torneira"
      ],
      "correct": 1,
      "explanation": "Avisar uma pessoa responsável ajuda a resolver o vazamento."
     },
     {
      "prompt": "O que pode prejudicar um rio?",
      "choices": [
       "Proteger suas margens",
       "Evitar lançar resíduos",
       "Descartar lixo em suas águas"
      ],
      "correct": 2,
      "explanation": "Lixo e poluentes podem afetar os rios."
     },
     {
      "prompt": "Toda água de rio pode ser bebida diretamente?",
      "choices": [
       "Não, pode exigir tratamento e avaliação",
       "Sim, sempre",
       "Sim, se parecer transparente"
      ],
      "correct": 0,
      "explanation": "A aparência clara não garante potabilidade."
     }
    ]
   }
  ]
 },
 "2:arte": {
  "intro": {
   "sections": [
    "Textura é uma característica da superfície de um objeto. Algumas superfícies são lisas; outras são ásperas, rugosas ou macias. Podemos conhecer texturas pelo olhar e, quando for seguro, pelo toque.",
    "Artistas podem desenhar linhas, pontos e marcas para representar texturas. Um desenho com vários pequenos traços pode sugerir a superfície de uma árvore, enquanto linhas suaves podem sugerir tecido.",
    "Crie um desenho de três objetos e tente mostrar texturas diferentes em cada um. Use materiais seguros e não toque em objetos cortantes ou muito quentes."
   ],
   "examples": [
    "A casca de uma árvore pode parecer rugosa, com marcas e relevos.",
    "Uma folha de papel lisa pode ser representada com poucas marcas."
   ],
   "visual": [
    "🌳",
    "📄",
    "✏️",
    "〰️"
   ],
   "questions": [
    {
     "prompt": "Qual palavra descreve uma superfície cheia de pequenas irregularidades?",
     "choices": [
      "Lisa",
      "Transparente",
      "Rugosa"
     ],
     "correct": 2,
     "explanation": "Rugosa indica pequenas irregularidades e relevos."
    },
    {
     "prompt": "O que pode criar a aparência de textura num desenho?",
     "choices": [
      "Pontos e linhas",
      "Somente o título escrito",
      "O nome do dia da semana"
     ],
     "correct": 0,
     "explanation": "Padrões de linhas e pontos sugerem texturas."
    },
    {
     "prompt": "O papel de desenho bem liso costuma apresentar que textura?",
     "choices": [
      "Cortante",
      "Lisa",
      "Muito espinhosa"
     ],
     "correct": 1,
     "explanation": "Uma superfície uniforme pode ser descrita como lisa."
    },
    {
     "prompt": "Antes de tocar em uma superfície desconhecida, devemos...",
     "choices": [
      "Tocar sempre, mesmo se for cortante",
      "Usar os olhos sem avaliar o risco",
      "Verificar se é segura e pedir orientação"
     ],
     "correct": 2,
     "explanation": "A observação deve priorizar a segurança."
    },
    {
     "prompt": "Dois objetos podem ter texturas diferentes?",
     "choices": [
      "Sim, uma pedra pode ser áspera e um tecido macio",
      "Não, tudo tem a mesma textura",
      "Apenas objetos com a mesma cor"
     ],
     "correct": 0,
     "explanation": "Texturas variam entre materiais e superfícies."
    }
   ]
  },
  "extra": [
   {
    "id": "cores-misturas",
    "title": "Cores e misturas na pintura",
    "objective": "Experimentar misturas de cores usando tintas e observar resultados.",
    "sections": [
     "Na pintura, podemos combinar cores para criar outras tonalidades. O resultado depende das tintas utilizadas e das quantidades misturadas, por isso experimentar é importante.",
     "Em muitas tintas escolares, misturar azul e amarelo produz verde. Misturar vermelho e amarelo pode produzir laranja. Essas misturas são exemplos simples, mas não são regras absolutas para todos os materiais.",
     "Experimente misturar pequenas quantidades, observe a nova cor e registre os resultados com desenhos. Use materiais próprios para crianças e cuide do espaço compartilhado."
    ],
    "examples": [
     "Misturar azul e amarelo em tintas escolares costuma resultar em verde.",
     "Misturar vermelho e amarelo em muitas tintas pode produzir laranja."
    ],
    "visual": [
     "🔴",
     "🟡",
     "🔵",
     "🟢"
    ],
    "questions": [
     {
      "prompt": "Qual cor costuma surgir da mistura de tinta azul e amarela?",
      "choices": [
       "Roxo",
       "Marrom sempre",
       "Verde"
      ],
      "correct": 2,
      "explanation": "Azul e amarelo costumam formar verde em tintas escolares."
     },
     {
      "prompt": "Qual cor costuma surgir de vermelho e amarelo em tinta?",
      "choices": [
       "Laranja",
       "Verde",
       "Azul"
      ],
      "correct": 0,
      "explanation": "Vermelho e amarelo podem produzir laranja."
     },
     {
      "prompt": "O resultado de uma mistura pode variar com o material?",
      "choices": [
       "Somente se houver música",
       "Sim",
       "Não, nunca"
      ],
      "correct": 1,
      "explanation": "Diferentes pigmentos e proporções podem produzir tonalidades diferentes."
     },
     {
      "prompt": "Como descobrir novas misturas de tinta?",
      "choices": [
       "Misturando produtos desconhecidos sem orientação",
       "Desenhando sem observar as cores",
       "Experimentando pequenas porções com cuidado"
      ],
      "correct": 2,
      "explanation": "A experimentação cuidadosa ajuda a explorar tonalidades."
     },
     {
      "prompt": "Qual atitude favorece uma atividade de pintura coletiva?",
      "choices": [
       "Organizar os materiais e cuidar do espaço",
       "Espalhar tinta nos colegas",
       "Ignorar qualquer orientação"
      ],
      "correct": 0,
      "explanation": "O cuidado com materiais e espaço permite participar com segurança."
     }
    ]
   },
   {
    "id": "musica",
    "title": "Sons, silêncios e ritmos",
    "objective": "Criar e reconhecer sequências rítmicas com o corpo e objetos seguros.",
    "sections": [
     "Música é uma forma de expressão artística que envolve sons e silêncios organizados. Podemos perceber ritmos por meio de palmas, passos e instrumentos de percussão.",
     "Um ritmo pode alternar sons curtos e pausas. Quando repetimos uma sequência como palma, palma, pausa, criamos um padrão que outra pessoa pode reconhecer e reproduzir.",
     "Ouça atentamente diferentes músicas e observe como os sons mudam em intensidade e velocidade. Durante as atividades, cuide do volume para não incomodar nem prejudicar os ouvidos."
    ],
    "examples": [
     "O padrão palma, palma, pausa pode ser repetido várias vezes.",
     "Uma sequência lenta pode ser tocada mais depressa mantendo a mesma ordem de sons."
    ],
    "visual": [
     "👏",
     "👏",
     "⏸️",
     "🎶"
    ],
    "questions": [
     {
      "prompt": "O que faz parte da organização de um ritmo?",
      "choices": [
       "A cor da parede",
       "A quantidade de janelas",
       "Sons e pausas no tempo"
      ],
      "correct": 2,
      "explanation": "Um ritmo combina sons e pausas de maneira organizada."
     },
     {
      "prompt": "Qual movimento pode criar um som musical com o corpo?",
      "choices": [
       "Bater palmas",
       "Fechar os olhos em silêncio apenas",
       "Desenhar um círculo sem som"
      ],
      "correct": 0,
      "explanation": "Palmas podem produzir padrões sonoros."
     },
     {
      "prompt": "Qual sequência tem um silêncio indicado?",
      "choices": [
       "Palma, palma, palma, palma",
       "Palma, palma, pausa",
       "Palma, palma, palma"
      ],
      "correct": 1,
      "explanation": "Uma pausa representa um momento sem o som daquela sequência."
     },
     {
      "prompt": "Um padrão rítmico pode ser repetido?",
      "choices": [
       "Não, nunca",
       "Somente uma vez por ano",
       "Sim"
      ],
      "correct": 2,
      "explanation": "Repetir um ritmo permite perceber seu padrão."
     },
     {
      "prompt": "Qual cuidado é adequado durante atividades com som?",
      "choices": [
       "Evitar volumes muito altos",
       "Gritar perto do ouvido de colegas",
       "Aumentar o volume sem limite"
      ],
      "correct": 0,
      "explanation": "Volume adequado protege os ouvidos."
     }
    ]
   },
   {
    "id": "teatro",
    "title": "Gestos e personagens no teatro",
    "objective": "Usar gestos, voz e movimento para criar pequenas cenas.",
    "sections": [
     "No teatro, pessoas criam personagens e representam situações para um público. O corpo, a voz, as expressões e o espaço ajudam a contar a história.",
     "Um personagem pode demonstrar alegria por meio de um sorriso e de movimentos animados. Outro pode representar surpresa com gestos e uma expressão facial diferente.",
     "Você pode inventar uma pequena cena sobre alguém que encontrou um objeto perdido. Combine com colegas quem interpreta cada personagem e respeite diferentes formas de participar."
    ],
    "examples": [
     "Um personagem que procura um livro pode olhar ao redor e perguntar onde ele está.",
     "Mudar a voz ou a postura pode ajudar a representar uma personagem de história."
    ],
    "visual": [
     "🎭",
     "🙂",
     "🤔",
     "🎬"
    ],
    "questions": [
     {
      "prompt": "O que ajuda a representar um personagem no teatro?",
      "choices": [
       "Somente uma conta matemática",
       "Apenas o nome da escola",
       "Gestos e voz"
      ],
      "correct": 2,
      "explanation": "Gestos, voz e expressões podem caracterizar personagens."
     },
     {
      "prompt": "Qual gesto pode representar surpresa?",
      "choices": [
       "Abrir os olhos e reagir com o corpo",
       "Virar uma página sem olhar",
       "Apagar todos os desenhos"
      ],
      "correct": 0,
      "explanation": "A expressão corporal ajuda a demonstrar emoções em cena."
     },
     {
      "prompt": "Para criar uma cena em grupo, é importante...",
      "choices": [
       "Trocar papéis sem avisar e brigar",
       "Combinar papéis e respeitar colegas",
       "Impedir que alguém participe"
      ],
      "correct": 1,
      "explanation": "A colaboração organiza a representação."
     },
     {
      "prompt": "Uma peça teatral pode contar uma história?",
      "choices": [
       "Não, teatro serve somente para cantar números",
       "Somente quando não há público",
       "Sim"
      ],
      "correct": 2,
      "explanation": "Uma cena teatral pode apresentar personagens e acontecimentos."
     },
     {
      "prompt": "O corpo pode expressar ideias mesmo sem palavras?",
      "choices": [
       "Sim, por meio dos gestos",
       "Não, somente palavras comunicam",
       "Somente quando há uma câmera"
      ],
      "correct": 0,
      "explanation": "Gestos e expressões também comunicam."
     }
    ]
   }
  ]
 },
 "2:educacao-fisica": {
  "intro": {
   "sections": [
    "Em jogos cooperativos, pessoas trabalham juntas para alcançar um objetivo. O desafio não precisa ser derrotar outra equipe. Pode ser manter uma bola no ar ou completar um percurso em grupo.",
    "Colaborar envolve conversar, respeitar os colegas e oferecer ajuda quando necessário. Cada participante pode contribuir de um jeito, considerando suas possibilidades.",
    "Antes de começar, combinem as regras e verifiquem se o espaço está seguro. Se o grupo não alcançar o objetivo na primeira tentativa, pode conversar e experimentar uma estratégia diferente."
   ],
   "examples": [
    "Duas crianças podem transportar juntas uma bola sem deixá-la cair.",
    "O grupo pode organizar uma sequência de passes para que todos participem."
   ],
   "visual": [
    "🤝",
    "🏐",
    "🙂",
    "⭐"
   ],
   "questions": [
    {
     "prompt": "Qual atitude fortalece um jogo cooperativo?",
     "choices": [
      "Esconder as regras",
      "Excluir colegas",
      "Ajudar a equipe"
     ],
     "correct": 2,
     "explanation": "Cooperação envolve apoio e objetivos compartilhados."
    },
    {
     "prompt": "Em um jogo cooperativo, a meta pode ser...",
     "choices": [
      "Completar uma tarefa juntos",
      "Impedir qualquer ajuda",
      "Fazer alguém ficar de fora"
     ],
     "correct": 0,
     "explanation": "Jogos cooperativos valorizam metas coletivas."
    },
    {
     "prompt": "Quando uma tentativa não funciona, o grupo pode...",
     "choices": [
      "Desistir de respeitar colegas",
      "Conversar e mudar a estratégia",
      "Culpar sempre uma pessoa"
     ],
     "correct": 1,
     "explanation": "Reorganizar a estratégia é parte da cooperação."
    },
    {
     "prompt": "Quem pode participar de uma brincadeira cooperativa adaptada?",
     "choices": [
      "Somente quem corre muito rápido",
      "Apenas quem não comete erros",
      "Pessoas com diferentes habilidades"
     ],
     "correct": 2,
     "explanation": "Adaptações podem favorecer a participação."
    },
    {
     "prompt": "Antes do jogo, é adequado...",
     "choices": [
      "Combinar regras e observar a segurança",
      "Esconder obstáculos no chão",
      "Começar sem ouvir os colegas"
     ],
     "correct": 0,
     "explanation": "Regras e segurança são importantes para todos."
    }
   ]
  },
  "extra": [
   {
    "id": "equilibrio",
    "title": "Equilíbrio e coordenação",
    "objective": "Explorar movimentos que exigem controle do corpo de forma segura.",
    "sections": [
     "Equilíbrio ajuda a manter o corpo estável ou recuperar a posição depois de um movimento. Podemos praticá-lo em atividades simples, como caminhar sobre uma linha marcada no chão.",
     "Coordenação permite combinar movimentos de mãos, braços, pernas e olhos. Jogar e receber uma bola macia pode ser uma forma de praticar essas habilidades.",
     "As atividades devem ser realizadas em espaço seguro, sem alturas perigosas. O ritmo de aprendizagem varia e as brincadeiras podem ser adaptadas com ajuda de uma pessoa responsável."
    ],
    "examples": [
     "Caminhar lentamente sobre uma linha no chão pode treinar o equilíbrio.",
     "Lançar e receber uma bola leve exige atenção e coordenação."
    ],
    "visual": [
     "👣",
     "➡️",
     "🤲",
     "⚽"
    ],
    "questions": [
     {
      "prompt": "Qual atividade simples trabalha o equilíbrio com segurança?",
      "choices": [
       "Subir no parapeito de uma janela",
       "Correr sobre um telhado",
       "Caminhar sobre uma linha no chão"
      ],
      "correct": 2,
      "explanation": "Uma linha no chão oferece um exercício de equilíbrio sem altura."
     },
     {
      "prompt": "Qual habilidade usamos ao receber uma bola?",
      "choices": [
       "Coordenação",
       "Apenas leitura",
       "Somente contagem"
      ],
      "correct": 0,
      "explanation": "Olhar e movimentos das mãos e braços precisam estar coordenados."
     },
     {
      "prompt": "As crianças desenvolvem habilidades motoras todas no mesmo ritmo?",
      "choices": [
       "Sim, sempre com a mesma facilidade",
       "Não, o ritmo varia",
       "Sim, todas no mesmo dia"
      ],
      "correct": 1,
      "explanation": "Cada pessoa aprende e se desenvolve de forma própria."
     },
     {
      "prompt": "Qual objeto é mais seguro para iniciar atividades de arremesso?",
      "choices": [
       "Vidro quebrado",
       "Pedra pontuda",
       "Bola leve e macia"
      ],
      "correct": 2,
      "explanation": "Bolas macias ajudam na prática inicial."
     },
     {
      "prompt": "Se uma atividade está difícil, o grupo pode...",
      "choices": [
       "Adaptá-la com orientação",
       "Obrigar alguém a se machucar",
       "Fazer piadas sobre quem errou"
      ],
      "correct": 0,
      "explanation": "Adaptações permitem aprender com segurança."
     }
    ]
   },
   {
    "id": "brincadeiras-brasil",
    "title": "Brincadeiras de diferentes lugares",
    "objective": "Conhecer brincadeiras tradicionais e respeitar variações culturais.",
    "sections": [
     "Brincadeiras são parte da cultura. Pessoas de diferentes regiões do Brasil podem brincar de amarelinha, pega-pega, roda ou peteca com regras e nomes variados.",
     "Uma brincadeira pode ser transmitida entre gerações. Pessoas da família ou comunidade podem ensinar como brincavam na infância e quais materiais utilizavam.",
     "Conhecer essas diferenças ajuda a valorizar culturas diversas. Em uma brincadeira nova, é importante ouvir as regras e combinar adaptações para que todos participem."
    ],
    "examples": [
     "A peteca pode ser usada em brincadeiras de lançamento e recepção.",
     "A amarelinha pode ter desenhos e regras diferentes conforme o lugar."
    ],
    "visual": [
     "🪀",
     "🪁",
     "🤸",
     "🌎"
    ],
    "questions": [
     {
      "prompt": "Qual é um exemplo de brincadeira tradicional conhecida no Brasil?",
      "choices": [
       "Digitar uma senha",
       "Esperar um aplicativo carregar",
       "Amarelinha"
      ],
      "correct": 2,
      "explanation": "A amarelinha faz parte de brincadeiras populares."
     },
     {
      "prompt": "As regras de uma brincadeira podem variar por região?",
      "choices": [
       "Sim",
       "Não, nunca",
       "Somente nas escolas com internet"
      ],
      "correct": 0,
      "explanation": "Brincadeiras podem assumir formas diferentes em lugares distintos."
     },
     {
      "prompt": "Como conhecer brincadeiras de outras gerações?",
      "choices": [
       "Proibindo novas regras",
       "Conversando com pessoas que as praticaram",
       "Adivinhando sem perguntar"
      ],
      "correct": 1,
      "explanation": "Relatos podem mostrar como eram as brincadeiras do passado."
     },
     {
      "prompt": "Qual atitude demonstra respeito a outra brincadeira cultural?",
      "choices": [
       "Zombar de quem a ensina",
       "Impedir que o grupo experimente",
       "Ouvir suas regras e participar com respeito"
      ],
      "correct": 2,
      "explanation": "Valorizar diferentes brincadeiras ajuda a convivência."
     },
     {
      "prompt": "Para incluir mais pessoas, o grupo pode...",
      "choices": [
       "Adaptar regras quando necessário",
       "Excluir quem aprende mais devagar",
       "Esconder os materiais"
      ],
      "correct": 0,
      "explanation": "Adaptações podem ampliar a participação."
     }
    ]
   },
   {
    "id": "seguranca",
    "title": "Regras, respeito e inclusão",
    "objective": "Identificar cuidados de segurança e atitudes de respeito nos jogos.",
    "sections": [
     "Regras combinadas ajudam a organizar jogos e podem torná-los mais seguros. Precisamos conhecer os limites do espaço, os materiais usados e como interromper uma brincadeira quando necessário.",
     "Respeitar o corpo significa evitar empurrões perigosos, prestar atenção a sinais de desconforto e oferecer pausas. As pessoas podem participar de formas diferentes.",
     "Uma brincadeira inclusiva considera as necessidades do grupo. Se alguém não consegue realizar um movimento, podemos buscar outra forma de participação com ajuda da pessoa responsável."
    ],
    "examples": [
     "Antes de correr no pátio, o grupo pode combinar os limites da brincadeira.",
     "Se alguém precisa descansar, é adequado permitir uma pausa."
    ],
    "visual": [
     "🛑",
     "💧",
     "🧑‍🤝‍🧑",
     "🛝"
    ],
    "questions": [
     {
      "prompt": "Por que combinamos regras antes de uma brincadeira?",
      "choices": [
       "Para deixar os colegas confusos",
       "Para permitir empurrões",
       "Para organizar e cuidar da segurança"
      ],
      "correct": 2,
      "explanation": "Regras claras ajudam na organização e segurança."
     },
     {
      "prompt": "Se um colega sente dor durante uma atividade, devemos...",
      "choices": [
       "Parar e buscar orientação",
       "Obrigar a continuar",
       "Rir da situação"
      ],
      "correct": 0,
      "explanation": "Sinais de dor e desconforto devem ser respeitados."
     },
     {
      "prompt": "Uma brincadeira é mais inclusiva quando...",
      "choices": [
       "Impede qualquer ajuda",
       "Permite adaptações e participação",
       "Exclui pessoas diferentes"
      ],
      "correct": 1,
      "explanation": "Inclusão envolve participação com respeito."
     },
     {
      "prompt": "Qual atitude não é apropriada em um jogo?",
      "choices": [
       "Combinar limites",
       "Pedir uma pausa quando necessário",
       "Empurrar colegas com força"
      ],
      "correct": 2,
      "explanation": "Empurrões perigosos podem machucar."
     },
     {
      "prompt": "Quem deve ser tratado com respeito nas brincadeiras?",
      "choices": [
       "Todos os participantes",
       "Somente os vencedores",
       "Apenas quem corre mais rápido"
      ],
      "correct": 0,
      "explanation": "O respeito vale para todo o grupo."
     }
    ]
   }
  ]
 },
 "2:ensino-religioso": {
  "intro": {
   "sections": [
    "Famílias e comunidades podem celebrar acontecimentos de maneiras diferentes. Algumas celebrações têm ligação religiosa; outras são culturais, familiares ou cívicas. Há pessoas que não participam de celebrações religiosas.",
    "Em uma celebração, podem existir músicas, comidas, histórias e encontros, conforme os costumes de cada grupo. Conhecer uma tradição não significa ter de praticá-la.",
    "Na convivência, devemos respeitar quem celebra de forma diferente e quem não deseja participar. Podemos conhecer costumes por relatos voluntários, sem pressionar colegas a contar suas crenças."
   ],
   "examples": [
    "Uma família pode reunir pessoas para uma data religiosa; outra pode celebrar um aniversário sem conteúdo religioso.",
    "Duas comunidades podem preparar músicas e alimentos diferentes em suas festas."
   ],
   "visual": [
    "🎉",
    "🎵",
    "🏠",
    "🤝"
   ],
   "questions": [
    {
     "prompt": "O que devemos fazer diante de uma celebração diferente da nossa?",
     "choices": [
      "Ridicularizar a pessoa",
      "Obrigar todos a celebrar igual",
      "Respeitar os costumes"
     ],
     "correct": 2,
     "explanation": "O respeito às diferenças fortalece a convivência."
    },
    {
     "prompt": "Todas as celebrações são religiosas?",
     "choices": [
      "Não, há celebrações de diferentes tipos",
      "Sim, todas obrigatoriamente",
      "Não existe nenhuma celebração cultural"
     ],
     "correct": 0,
     "explanation": "Há celebrações religiosas, familiares, culturais e cívicas."
    },
    {
     "prompt": "Conhecer uma tradição exige praticá-la?",
     "choices": [
      "Sim, para continuar na escola",
      "Não, podemos aprender sem adotar a prática",
      "Sim, sempre"
     ],
     "correct": 1,
     "explanation": "Estudar tradições não exige adesão religiosa."
    },
    {
     "prompt": "Como aprender sobre celebrações familiares sem invadir a privacidade?",
     "choices": [
      "Exigir que contem segredos",
      "Espalhar informações sem permissão",
      "Ouvir relatos oferecidos voluntariamente"
     ],
     "correct": 2,
     "explanation": "Relatos voluntários respeitam escolhas pessoais."
    },
    {
     "prompt": "Uma pessoa pode não participar de celebrações religiosas?",
     "choices": [
      "Sim, e deve ser respeitada",
      "Não, é proibido",
      "Somente se mudar de escola"
     ],
     "correct": 0,
     "explanation": "A liberdade de crença inclui o direito de não participar."
    }
   ]
  },
  "extra": [
   {
    "id": "simbolos",
    "title": "Símbolos e histórias culturais",
    "objective": "Entender que objetos e imagens podem representar tradições e ideias.",
    "sections": [
     "Símbolos podem representar pessoas, grupos, ideias ou tradições. Uma imagem, um gesto, uma cor ou um objeto pode ter significado especial em certo contexto cultural.",
     "Para compreender um símbolo, precisamos conhecer a história e as pessoas que o utilizam. O mesmo desenho pode ter sentidos diferentes conforme o lugar e a tradição.",
     "Podemos observar símbolos culturais e religiosos sem julgá-los. É importante não fazer suposições ofensivas nem usar objetos importantes para alguém como motivo de brincadeira desrespeitosa."
    ],
    "examples": [
     "Uma bandeira pode representar uma comunidade escolar ou um país.",
     "Um objeto usado em uma tradição pode ter significado especial para quem participa."
    ],
    "visual": [
     "🏳️",
     "⭐",
     "🪷",
     "📖"
    ],
    "questions": [
     {
      "prompt": "O que é um símbolo?",
      "choices": [
       "Um objeto sempre sem significado",
       "Somente uma conta matemática",
       "Algo que representa uma ideia ou grupo"
      ],
      "correct": 2,
      "explanation": "Símbolos podem representar tradições e ideias."
     },
     {
      "prompt": "O significado de um símbolo pode depender do contexto?",
      "choices": [
       "Sim",
       "Não, é sempre idêntico",
       "Somente se for feito de metal"
      ],
      "correct": 0,
      "explanation": "O contexto cultural influencia o sentido de símbolos."
     },
     {
      "prompt": "Como compreender melhor um símbolo desconhecido?",
      "choices": [
       "Ignorar quem conhece a tradição",
       "Pesquisar e perguntar com respeito",
       "Inventar um significado para ofender"
      ],
      "correct": 1,
      "explanation": "Conhecer a história e o contexto ajuda a interpretar símbolos."
     },
     {
      "prompt": "Uma bandeira escolar pode ser um símbolo de quê?",
      "choices": [
       "De uma regra de trânsito obrigatoriamente",
       "De uma operação matemática",
       "Da comunidade escolar"
      ],
      "correct": 2,
      "explanation": "Uma bandeira pode representar um grupo."
     },
     {
      "prompt": "Qual atitude é respeitosa diante de um símbolo importante para outro grupo?",
      "choices": [
       "Tratá-lo com cuidado",
       "Destruí-lo por brincadeira",
       "Ridicularizar quem o valoriza"
      ],
      "correct": 0,
      "explanation": "Respeitar símbolos também é respeitar as pessoas."
     }
    ]
   },
   {
    "id": "liberdade",
    "title": "Liberdade de crença e de não crença",
    "objective": "Reconhecer direitos de pessoas com crenças e filosofias diferentes.",
    "sections": [
     "Todas as pessoas merecem tratamento digno, independentemente de sua religião ou de não seguirem uma religião. Ninguém deve ser humilhado por suas escolhas ou pela tradição de sua família.",
     "Na escola, podemos conversar sobre diferenças com respeito e sem obrigar alguém a participar de práticas religiosas. Aprender sobre uma tradição não é o mesmo que adotá-la.",
     "Se uma criança presencia preconceito, deve procurar ajuda de uma pessoa adulta de confiança. Apoiar quem sofre discriminação é uma atitude importante de convivência."
    ],
    "examples": [
     "Duas crianças com crenças diferentes podem estudar e brincar juntas.",
     "Uma pessoa que não segue religião merece o mesmo respeito que todas as outras."
    ],
    "visual": [
     "🤝",
     "🗣️",
     "🫶",
     "🏫"
    ],
    "questions": [
     {
      "prompt": "Quem deve ser respeitado na escola?",
      "choices": [
       "Somente pessoas da mesma religião",
       "Apenas quem concorda com todos",
       "Pessoas de diferentes crenças e sem religião"
      ],
      "correct": 2,
      "explanation": "A dignidade vale para todas as pessoas."
     },
     {
      "prompt": "Podemos aprender sobre uma tradição sem praticá-la?",
      "choices": [
       "Sim",
       "Não, nunca",
       "Somente quando existe uma festa"
      ],
      "correct": 0,
      "explanation": "Conhecer uma tradição não implica segui-la."
     },
     {
      "prompt": "Se alguém sofre preconceito por sua crença, o que podemos fazer?",
      "choices": [
       "Divulgar apelidos ofensivos",
       "Apoiar a pessoa e pedir ajuda responsável",
       "Rir junto"
      ],
      "correct": 1,
      "explanation": "Acolhimento e apoio ajudam a combater a discriminação."
     },
     {
      "prompt": "Qual é uma atitude ligada à liberdade de consciência?",
      "choices": [
       "Obrigar todos a seguir a mesma crença",
       "Impedir perguntas educadas",
       "Respeitar a escolha de ter ou não religião"
      ],
      "correct": 2,
      "explanation": "A liberdade inclui crenças e não crenças."
     },
     {
      "prompt": "Amizades entre pessoas com tradições diferentes são possíveis?",
      "choices": [
       "Sim, com respeito",
       "Não, só entre pessoas iguais",
       "Somente se ninguém conversar"
      ],
      "correct": 0,
      "explanation": "A convivência respeitosa não exige crenças idênticas."
     }
    ]
   },
   {
    "id": "lugares-memorias",
    "title": "Lugares de encontro e memória",
    "objective": "Reconhecer lugares e práticas de reunião de diferentes comunidades.",
    "sections": [
     "Comunidades podem se reunir em praças, casas, escolas e outros lugares para celebrar, conversar e guardar memórias. Algumas se reúnem em espaços religiosos; outras, em locais culturais ou comunitários.",
     "O significado de um lugar depende da história e das pessoas que o utilizam. Um espaço pode ser importante por receber encontros, celebrações, músicas e histórias.",
     "Podemos conhecer esses lugares por desenhos, fotografias e relatos respeitosos. Não devemos entrar em locais privados sem autorização nem fotografar pessoas sem consentimento."
    ],
    "examples": [
     "Uma comunidade pode reunir pessoas em uma praça para um evento cultural.",
     "Um espaço de reunião religiosa pode ser importante para seus participantes, assim como um centro cultural é para outros grupos."
    ],
    "visual": [
     "🏠",
     "🏫",
     "🌳",
     "💬"
    ],
    "questions": [
     {
      "prompt": "Qual lugar pode receber encontros comunitários?",
      "choices": [
       "Somente um objeto dentro da mochila",
       "Apenas um número escrito",
       "Praça"
      ],
      "correct": 2,
      "explanation": "Praças podem servir como espaços de convivência."
     },
     {
      "prompt": "Um lugar importante para uma comunidade pode guardar o quê?",
      "choices": [
       "Memórias e tradições",
       "Somente cálculos sem relação",
       "Todos os sonhos das pessoas"
      ],
      "correct": 0,
      "explanation": "Lugares podem estar ligados a histórias e práticas coletivas."
     },
     {
      "prompt": "Para fotografar pessoas numa atividade, devemos...",
      "choices": [
       "Divulgar sem avisar",
       "Pedir autorização",
       "Fotografar escondido"
      ],
      "correct": 1,
      "explanation": "Consentimento é importante no registro de pessoas."
     },
     {
      "prompt": "Todas as comunidades se reúnem no mesmo tipo de espaço?",
      "choices": [
       "Sim, num único prédio",
       "Sim, somente em casas iguais",
       "Não, existem espaços diversos"
      ],
      "correct": 2,
      "explanation": "Os lugares de encontro variam conforme as comunidades."
     },
     {
      "prompt": "O que ajuda a conhecer a história de um lugar de encontro?",
      "choices": [
       "Ouvir relatos e observar registros",
       "Inventar informações sobre os participantes",
       "Ignorar o contexto"
      ],
      "correct": 0,
      "explanation": "Relatos e registros ajudam a compreender a memória do lugar."
     }
    ]
   }
  ]
 }
};
