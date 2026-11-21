import type {FundamentalQuestion,FundamentalTopic} from "./fundamental-topic-catalog";

// Complementos originais do 1º ano. São trilhas introdutórias, não a totalidade das habilidades da BNCC.
// As alternativas são variadas e a posição da resposta muda entre as questões.
export const yearOneRemaining:Record<string,{intro:{sections:string[];examples:string[];visual:string[];questions:FundamentalQuestion[]};extra:Omit<FundamentalTopic,"expanded">[]}> = {
 "1:ciencias": {
  "intro": {
   "sections": [
    "Observe as coisas ao seu redor. Algumas são seres vivos, como plantas, cães e borboletas. Outras não são seres vivos, como pedras, brinquedos e cadeiras.",
    "Seres vivos passam por etapas da vida. Uma planta, por exemplo, pode surgir de uma semente e crescer quando encontra condições adequadas. Um brinquedo pode se mover quando alguém empurra, mas isso não o torna vivo.",
    "Para comparar, observe um ser vivo e um objeto: veja como são, do que precisam e o que acontece com o passar do tempo. Pessoas, animais e plantas são seres vivos, mesmo sendo diferentes entre si."
   ],
   "examples": [
    "Uma semente de feijão pode germinar e formar uma planta; uma pedrinha não cresce do mesmo modo.",
    "Um carrinho de brinquedo anda quando recebe um empurrão, mas não é um ser vivo."
   ],
   "visual": [
    "🌱",
    "🐱",
    "🪨",
    "🚗"
   ],
   "questions": [
    {
     "prompt": "Qual destes é um ser vivo?",
     "choices": [
      "Pedra",
      "Gato",
      "Carrinho de brinquedo"
     ],
     "correct": 1,
     "explanation": "O gato é um animal e um ser vivo. O carrinho e a pedra não são seres vivos."
    },
    {
     "prompt": "O que pode nascer de uma semente de feijão?",
     "choices": [
      "Um lápis de madeira",
      "Uma pedra redonda",
      "Uma planta de feijão"
     ],
     "correct": 2,
     "explanation": "Uma semente de feijão, em condições adequadas, pode germinar e originar uma planta."
    },
    {
     "prompt": "Por que um carrinho de brinquedo não é considerado um ser vivo?",
     "choices": [
      "Porque não realiza processos da vida como um organismo",
      "Porque pode ter rodas",
      "Porque costuma ser pequeno"
     ],
     "correct": 0,
     "explanation": "Mover-se quando alguém empurra não é suficiente para caracterizar a vida."
    },
    {
     "prompt": "Qual destes exemplos não é um ser vivo?",
     "choices": [
      "Árvore",
      "Cadeira",
      "Borboleta"
     ],
     "correct": 1,
     "explanation": "Uma cadeira é um objeto produzido por pessoas, enquanto borboleta e árvore são seres vivos."
    },
    {
     "prompt": "Qual par apresenta dois seres vivos?",
     "choices": [
      "Cachorro e mochila",
      "Girassol e copo",
      "Cachorro e girassol"
     ],
     "correct": 2,
     "explanation": "Cachorro e girassol são seres vivos, embora um seja animal e o outro planta."
    }
   ]
  },
  "extra": [
   {
    "id": "corpo-humano",
    "title": "Conhecendo o corpo humano",
    "objective": "Localizar partes do corpo e reconhecer algumas de suas funções.",
    "sections": [
     "Nosso corpo tem partes que podemos observar e nomear: cabeça, tronco, braços, mãos, pernas e pés. Cada parte participa de atividades que fazemos todos os dias.",
     "Usamos as pernas e os pés para caminhar e saltar. As mãos ajudam a segurar e manipular objetos. Os olhos participam da visão e as orelhas fazem parte da estrutura relacionada à audição.",
     "Cada corpo tem características próprias. Pessoas podem se mover e realizar atividades de maneiras diferentes, e todas merecem respeito. Você pode desenhar o corpo e apontar algumas de suas partes."
    ],
    "examples": [
     "Ao pegar uma bola, usamos braços e mãos para alcançá-la e segurá-la.",
     "Ao ouvir uma campainha, utilizamos a audição; ao olhar um desenho, utilizamos a visão."
    ],
    "visual": [
     "👀",
     "🖐️",
     "🦵",
     "🦶"
    ],
    "questions": [
     {
      "prompt": "Que parte do corpo usamos para segurar um lápis?",
      "choices": [
       "Orelha",
       "Mão",
       "Joelho"
      ],
      "correct": 1,
      "explanation": "A mão permite segurar e movimentar o lápis."
     },
     {
      "prompt": "Qual parte do corpo ajuda a caminhar?",
      "choices": [
       "Orelhas",
       "Cotovelos",
       "Pernas"
      ],
      "correct": 2,
      "explanation": "As pernas e os pés participam do movimento de caminhar."
     },
     {
      "prompt": "Qual sentido usamos para perceber uma música?",
      "choices": [
       "Audição",
       "Visão",
       "Paladar"
      ],
      "correct": 0,
      "explanation": "Ouvimos sons com a audição."
     },
     {
      "prompt": "Em que parte do corpo ficam os olhos?",
      "choices": [
       "Mãos",
       "Cabeça",
       "Pés"
      ],
      "correct": 1,
      "explanation": "Os olhos ficam na cabeça e participam da visão."
     },
     {
      "prompt": "Como devemos agir diante de corpos e capacidades diferentes?",
      "choices": [
       "Com deboche",
       "Com exclusão",
       "Com respeito e acolhimento"
      ],
      "correct": 2,
      "explanation": "As diferenças entre pessoas devem ser respeitadas e acolhidas."
     }
    ]
   },
   {
    "id": "higiene",
    "title": "Cuidando da saúde e da higiene",
    "objective": "Reconhecer hábitos de higiene e situações que exigem ajuda de adultos.",
    "sections": [
     "Hábitos de higiene ajudam a cuidar do corpo. Lavar as mãos com água e sabonete, escovar os dentes e manter os alimentos e o ambiente limpos são exemplos importantes.",
     "Lavar as mãos é especialmente importante antes de comer, após usar o banheiro e quando estiverem sujas. Esfregamos as palmas, as costas das mãos e entre os dedos, depois enxaguamos.",
     "Na hora de escovar os dentes, usamos escova e creme dental adequado com orientação de um adulto. Se precisar de ajuda para cuidar da saúde, procure uma pessoa responsável."
    ],
    "examples": [
     "Depois de brincar no parque e antes do lanche, lave as mãos com água e sabonete.",
     "Escovar os dentes com orientação ajuda a cuidar da saúde da boca."
    ],
    "visual": [
     "🧼",
     "💧",
     "🪥",
     "👐"
    ],
    "questions": [
     {
      "prompt": "O que é adequado fazer antes de comer?",
      "choices": [
       "Brincar na terra e começar a comer",
       "Lavar as mãos com água e sabonete",
       "Somente enxugar as mãos na roupa"
      ],
      "correct": 1,
      "explanation": "Lavar as mãos antes das refeições é um hábito de higiene."
     },
     {
      "prompt": "Após usar o banheiro, qual é o cuidado indicado?",
      "choices": [
       "Lavar apenas a mochila",
       "Evitar água nas mãos",
       "Lavar bem as mãos"
      ],
      "correct": 2,
      "explanation": "O uso de água e sabonete é importante depois de usar o banheiro."
     },
     {
      "prompt": "Qual objeto ajuda na higiene dos dentes?",
      "choices": [
       "Escova de dentes",
       "Pente",
       "Toalha de mesa"
      ],
      "correct": 0,
      "explanation": "A escova, usada corretamente com orientação, ajuda a limpar os dentes."
     },
     {
      "prompt": "Para lavar as mãos, é importante limpar também...",
      "choices": [
       "Somente os cotovelos",
       "Entre os dedos",
       "A parte externa da mochila"
      ],
      "correct": 1,
      "explanation": "Esfregar entre os dedos faz parte de uma lavagem cuidadosa."
     },
     {
      "prompt": "Se uma criança precisar de orientação para escovar os dentes, deve...",
      "choices": [
       "Deixar de escovar para sempre",
       "Usar qualquer produto desconhecido",
       "Pedir ajuda a um adulto responsável"
      ],
      "correct": 2,
      "explanation": "Uma pessoa responsável pode orientar o cuidado bucal adequado."
     }
    ]
   },
   {
    "id": "dia-noite",
    "title": "Dia, noite e nossa rotina",
    "objective": "Perceber a alternância entre dia e noite e organizar atividades cotidianas.",
    "sections": [
     "Durante o dia, geralmente vemos o Sol iluminar o céu. À noite, o lugar onde vivemos deixa de receber a luz direta do Sol. Isso acontece porque a Terra gira em torno de seu próprio eixo.",
     "Em muitos dias, estudamos, brincamos, comemos e descansamos em diferentes horários. As rotinas podem variar de pessoa para pessoa e de família para família.",
     "Podemos registrar acontecimentos em sequência: manhã, tarde e noite. Ao comparar rotinas, percebemos atividades que se repetem e outras que mudam conforme o dia."
    ],
    "examples": [
     "De manhã, alguém pode tomar café e ir à escola; à noite, pode jantar e descansar.",
     "Num desenho do dia, o Sol pode representar a claridade; num desenho da noite, podemos mostrar um céu escuro."
    ],
    "visual": [
     "☀️",
     "🌅",
     "🌙",
     "🛏️"
    ],
    "questions": [
     {
      "prompt": "Qual movimento da Terra explica a alternância de dia e noite?",
      "choices": [
       "Movimento das nuvens apenas",
       "Rotação da Terra",
       "Crescimento das árvores"
      ],
      "correct": 1,
      "explanation": "O giro da Terra em torno de seu eixo produz a alternância de iluminação."
     },
     {
      "prompt": "Qual período geralmente vem depois da manhã?",
      "choices": [
       "Madrugada anterior",
       "Outra manhã imediatamente",
       "Tarde"
      ],
      "correct": 2,
      "explanation": "Na organização usual do dia, manhã é seguida pela tarde."
     },
     {
      "prompt": "Qual atividade costuma fazer parte de uma rotina de cuidados?",
      "choices": [
       "Dormir tempo suficiente",
       "Nunca descansar",
       "Não beber água o dia todo"
      ],
      "correct": 0,
      "explanation": "Dormir é uma parte importante das rotinas de cuidado."
     },
     {
      "prompt": "O que podemos fazer para observar nossa rotina?",
      "choices": [
       "Dizer que todas as famílias fazem tudo na mesma hora",
       "Registrar atividades da manhã, tarde e noite",
       "Apagar todas as lembranças do dia"
      ],
      "correct": 1,
      "explanation": "Registrar atividades ajuda a perceber sequências e diferenças."
     },
     {
      "prompt": "Por que existe noite em nossa região?",
      "choices": [
       "Porque o Sol deixa de existir",
       "Porque todas as estrelas se apagam",
       "Porque a região fica temporariamente sem luz solar direta na rotação"
      ],
      "correct": 2,
      "explanation": "Na rotação da Terra, regiões alternam entre receber luz solar direta e ficar sem ela."
     }
    ]
   }
  ]
 },
 "1:historia": {
  "intro": {
   "sections": [
    "Cada pessoa tem uma história. Ela envolve acontecimentos vividos, pessoas conhecidas, lugares frequentados e mudanças ao longo do tempo. Podemos conhecer partes dessa história pelas nossas lembranças.",
    "Fotografias, desenhos antigos, objetos guardados e relatos de pessoas ajudam a recordar momentos. Esses registros são pistas sobre o que aconteceu, mas nem sempre mostram todos os detalhes.",
    "Converse com alguém de confiança sobre um acontecimento de quando você era menor. Você pode fazer um desenho para mostrar como era e como é hoje."
   ],
   "examples": [
    "Uma fotografia de aniversário pode ajudar a lembrar uma celebração passada.",
    "Um brinquedo guardado pode lembrar uma brincadeira de outra época."
   ],
   "visual": [
    "📷",
    "🎂",
    "🧸",
    "🖼️"
   ],
   "questions": [
    {
     "prompt": "Qual objeto pode registrar uma lembrança da infância?",
     "choices": [
      "Relógio desligado sem informação",
      "Fotografia",
      "Folha vazia sem registro"
     ],
     "correct": 1,
     "explanation": "Fotografias podem registrar momentos vividos."
    },
    {
     "prompt": "O relato de alguém que presenciou um acontecimento pode ajudar a...",
     "choices": [
      "Trocar uma data verdadeira por qualquer uma",
      "Garantir que todas as pessoas lembrem exatamente igual",
      "Conhecer informações sobre esse acontecimento"
     ],
     "correct": 2,
     "explanation": "Relatos podem trazer informações e perspectivas sobre o passado."
    },
    {
     "prompt": "Qual exemplo representa um acontecimento de sua história pessoal?",
     "choices": [
      "Seu primeiro dia na escola",
      "A previsão do tempo de um país distante",
      "Uma palavra sem relação com sua vida"
     ],
     "correct": 0,
     "explanation": "O primeiro dia na escola é um acontecimento que pode fazer parte da história pessoal."
    },
    {
     "prompt": "Uma fotografia mostra necessariamente tudo que aconteceu em um dia?",
     "choices": [
      "Sim, mostra acontecimentos futuros",
      "Não, registra apenas parte de um momento",
      "Sim, sempre registra todas as conversas"
     ],
     "correct": 1,
     "explanation": "Fotografias mostram recortes de situações e precisam de contexto."
    },
    {
     "prompt": "O que podemos comparar para perceber mudanças em nossa vida?",
     "choices": [
      "Dois lápis iguais na mesma mesa",
      "Somente números sem datas",
      "Registros de antes e de agora"
     ],
     "correct": 2,
     "explanation": "Comparar registros de tempos diferentes ajuda a perceber mudanças."
    }
   ]
  },
  "extra": [
   {
    "id": "antes-depois",
    "title": "Antes, agora e depois",
    "objective": "Organizar acontecimentos em uma sequência temporal simples.",
    "sections": [
     "História também é perceber a passagem do tempo. Algumas coisas aconteceram antes, outras acontecem agora e outras ainda poderão acontecer depois.",
     "Podemos ordenar acontecimentos de um dia: acordar, tomar café, ir à escola e voltar para casa. A ordem pode variar, mas conseguimos explicar o que aconteceu primeiro.",
     "Quando organizamos fotografias ou desenhos de acontecimentos, criamos uma sequência. Palavras como antes, depois, ontem e hoje nos ajudam a contar histórias."
    ],
    "examples": [
     "Antes do almoço, uma criança lavou as mãos. Depois do almoço, guardou os pratos.",
     "Em uma sequência de desenhos, podemos mostrar uma semente, uma muda e uma planta crescida."
    ],
    "visual": [
     "1️⃣",
     "2️⃣",
     "3️⃣"
    ],
    "questions": [
     {
      "prompt": "Na sequência acordar → tomar café → ir à escola, o que acontece primeiro?",
      "choices": [
       "Tomar café",
       "Acordar",
       "Ir à escola"
      ],
      "correct": 1,
      "explanation": "Acordar aparece antes das outras ações na sequência."
     },
     {
      "prompt": "Qual palavra usamos para algo que já aconteceu?",
      "choices": [
       "Depois de amanhã",
       "Daqui a pouco",
       "Antes"
      ],
      "correct": 2,
      "explanation": "Antes indica um momento anterior a outro."
     },
     {
      "prompt": "Se uma criança coloca os sapatos e depois sai de casa, o que ocorreu primeiro?",
      "choices": [
       "Colocar os sapatos",
       "Sair de casa",
       "Voltar para dormir após sair"
      ],
      "correct": 0,
      "explanation": "O enunciado informa que calçar os sapatos ocorreu antes da saída."
     },
     {
      "prompt": "Como podemos organizar três fotos de diferentes idades?",
      "choices": [
       "Sem observar a data ou a idade",
       "Da mais antiga à mais recente",
       "Pela cor da moldura apenas"
      ],
      "correct": 1,
      "explanation": "A ordem temporal compara os momentos registrados."
     },
     {
      "prompt": "O que significa 'agora' em uma sequência?",
      "choices": [
       "Um momento necessariamente de muitos anos atrás",
       "Apenas um futuro distante",
       "O momento presente"
      ],
      "correct": 2,
      "explanation": "Agora indica o presente."
     }
    ]
   },
   {
    "id": "familias",
    "title": "Famílias e formas de convivência",
    "objective": "Reconhecer a diversidade de famílias e os cuidados presentes na convivência.",
    "sections": [
     "As famílias podem ser formadas de muitas maneiras. Algumas crianças moram com mãe e pai; outras vivem com avós, uma pessoa responsável ou outros familiares. Nenhuma dessas formas deve ser motivo de preconceito.",
     "No cotidiano, pessoas podem dividir tarefas, oferecer cuidado e contar histórias. Cada família também pode ter costumes e horários diferentes.",
     "Na escola, convivemos com colegas que têm experiências próprias. Podemos aprender ouvindo relatos, respeitando a privacidade e evitando comparações ofensivas."
    ],
    "examples": [
     "Uma criança pode ser acompanhada pela avó à escola; outra, por um pai ou cuidador.",
     "Algumas famílias almoçam juntas; outras se encontram em horários diferentes."
    ],
    "visual": [
     "🏠",
     "👨‍👧",
     "👵",
     "🤝"
    ],
    "questions": [
     {
      "prompt": "As famílias são todas organizadas exatamente do mesmo jeito?",
      "choices": [
       "Sim, todas fazem as mesmas tarefas",
       "Não, existem várias formas de família",
       "Sim, todas vivem com as mesmas pessoas"
      ],
      "correct": 1,
      "explanation": "Existem diferentes arranjos familiares e todos merecem respeito."
     },
     {
      "prompt": "Qual atitude demonstra cuidado na convivência?",
      "choices": [
       "Zombar do modo de vida de alguém",
       "Esconder objetos dos colegas",
       "Ajudar uma pessoa quando ela precisa"
      ],
      "correct": 2,
      "explanation": "Ajudar quando possível é uma atitude de cuidado."
     },
     {
      "prompt": "Se um colega vive com os avós, devemos...",
      "choices": [
       "Respeitar sua família",
       "Dizer que sua família está errada",
       "Excluir o colega de brincadeiras"
      ],
      "correct": 0,
      "explanation": "Viver com os avós é uma das possíveis formas de organização familiar."
     },
     {
      "prompt": "Qual recurso pode ajudar a conhecer histórias familiares?",
      "choices": [
       "Exigir segredos de colegas",
       "Conversas e relatos com consentimento",
       "Inventar acontecimentos sobre outras pessoas"
      ],
      "correct": 1,
      "explanation": "Relatos voluntários ajudam a conhecer a trajetória familiar sem invadir a privacidade."
     },
     {
      "prompt": "Quando percebemos costumes diferentes entre famílias, podemos...",
      "choices": [
       "Rir de quem faz diferente",
       "Obrigar todos a mudar seus costumes",
       "Conversar com respeito"
      ],
      "correct": 2,
      "explanation": "O diálogo respeitoso valoriza as diferenças."
     }
    ]
   },
   {
    "id": "brincadeiras-tempo",
    "title": "Brincadeiras de ontem e de hoje",
    "objective": "Identificar permanências e mudanças nas brincadeiras entre gerações.",
    "sections": [
     "As brincadeiras também fazem parte da história. Algumas são conhecidas há muito tempo, como amarelinha, roda e esconde-esconde. Outras surgiram com objetos e tecnologias mais recentes.",
     "Podemos perguntar a pessoas de diferentes idades como brincavam quando eram crianças. Talvez tenham usado materiais diferentes ou combinado outras regras.",
     "Comparar brincadeiras do passado e do presente permite perceber o que mudou e o que permaneceu parecido. É importante respeitar as brincadeiras de cada comunidade."
    ],
    "examples": [
     "Uma pessoa mais velha pode contar como fazia brinquedos com materiais reutilizados.",
     "A amarelinha pode ser brincada em diversos lugares, com regras que variam."
    ],
    "visual": [
     "🪁",
     "🪀",
     "⚽",
     "🧸"
    ],
    "questions": [
     {
      "prompt": "Como descobrir uma brincadeira comum de outra época?",
      "choices": [
       "Afirmar que todas eram iguais às atuais",
       "Perguntar a pessoas que viveram naquela época",
       "Adivinhar sem consultar ninguém"
      ],
      "correct": 1,
      "explanation": "Relatos de pessoas mais velhas podem revelar brincadeiras do passado."
     },
     {
      "prompt": "O que pode mudar em uma brincadeira ao longo do tempo?",
      "choices": [
       "A necessidade de respeitar colegas, que desaparece",
       "O fato de que ninguém pode mais brincar",
       "Materiais e regras"
      ],
      "correct": 2,
      "explanation": "Materiais, regras e espaços de brincadeira podem mudar."
     },
     {
      "prompt": "Qual é um exemplo de brincadeira tradicional?",
      "choices": [
       "Amarelinha",
       "Digitar uma senha no celular",
       "Esperar uma atualização de programa"
      ],
      "correct": 0,
      "explanation": "Amarelinha é uma brincadeira conhecida em diferentes gerações."
     },
     {
      "prompt": "Uma mesma brincadeira pode ter regras diferentes?",
      "choices": [
       "Sim, mas somente em videogames",
       "Sim, conforme o grupo e o lugar",
       "Não, todas as regras são iguais no mundo"
      ],
      "correct": 1,
      "explanation": "Regras podem variar por região ou grupo."
     },
     {
      "prompt": "Qual comparação nos ajuda a conhecer mudanças históricas?",
      "choices": [
       "Dois desenhos feitos no mesmo instante",
       "Apenas o tamanho de um tênis",
       "Brincadeiras relatadas por pessoas de idades diferentes"
      ],
      "correct": 2,
      "explanation": "Comparar relatos de gerações diferentes ajuda a perceber transformações."
     }
    ]
   }
  ]
 },
 "1:geografia": {
  "intro": {
   "sections": [
    "Todos vivemos em lugares. Casa, escola, praça e rua são exemplos de espaços onde fazemos atividades e encontramos outras pessoas.",
    "Cada lugar pode ter usos diferentes. Na escola, podemos estudar e brincar. Na praça, podemos passear. Na rua, devemos ter cuidado com veículos e seguir orientações de segurança.",
    "Os lugares também podem mudar com o tempo. Ao observar uma rua, podemos notar árvores, casas, calçadas, lojas e espaços de uso coletivo."
   ],
   "examples": [
    "Uma praça pode ter bancos e árvores que as pessoas usam para descansar.",
    "Uma escola possui espaços diferentes, como sala de aula, biblioteca e pátio."
   ],
   "visual": [
    "🏠",
    "🏫",
    "🌳",
    "🛣️"
   ],
   "questions": [
    {
     "prompt": "Qual lugar costuma ter salas de aula e pátio?",
     "choices": [
      "Ponto de ônibus",
      "Escola",
      "Praça"
     ],
     "correct": 1,
     "explanation": "A escola possui espaços destinados a estudar e conviver."
    },
    {
     "prompt": "Qual lugar é frequentemente usado para passeio e brincadeira?",
     "choices": [
      "Armário fechado",
      "Porta de um veículo em movimento",
      "Praça"
     ],
     "correct": 2,
     "explanation": "Praças são espaços públicos de convivência e lazer."
    },
    {
     "prompt": "Que cuidado devemos ter ao atravessar uma rua?",
     "choices": [
      "Usar local seguro com orientação de um adulto",
      "Atravessar correndo sem olhar",
      "Brincar no meio dos carros"
     ],
     "correct": 0,
     "explanation": "Crianças devem atravessar com cuidado e orientação de pessoa responsável."
    },
    {
     "prompt": "Em um bairro, o que podemos observar?",
     "choices": [
      "Somente o céu, sem o chão",
      "Casas, ruas e outros espaços",
      "Apenas números"
     ],
     "correct": 1,
     "explanation": "Os bairros possuem diversos elementos naturais e construídos."
    },
    {
     "prompt": "A escola é um lugar que serve apenas para dormir?",
     "choices": [
      "Sim, é sua única função",
      "Sim, não há pessoas nesse lugar",
      "Não, é um espaço de estudo e convivência"
     ],
     "correct": 2,
     "explanation": "Na escola, as pessoas aprendem e convivem."
    }
   ]
  },
  "extra": [
   {
    "id": "caminhos",
    "title": "Caminhos e pontos de referência",
    "objective": "Reconhecer trajetos e pontos de referência em espaços conhecidos.",
    "sections": [
     "Um caminho é o percurso que fazemos entre dois lugares. Podemos descrever como sair de uma sala e chegar ao pátio, indicando portas, corredores e pontos de referência.",
     "Pontos de referência são objetos e lugares que ajudam na orientação, como uma árvore grande, um portão ou uma biblioteca. Eles facilitam explicar por onde passar.",
     "Uma criança deve conhecer trajetos seguros e seguir a orientação de um adulto responsável ao circular fora da escola. Na atividade, podemos desenhar um caminho simples dentro de um espaço conhecido."
    ],
    "examples": [
     "Para chegar à biblioteca, passe pelo corredor e siga até a porta azul, conforme a orientação da escola.",
     "Uma árvore perto do portão pode ajudar a reconhecer a entrada."
    ],
    "visual": [
     "🚪",
     "➡️",
     "📚",
     "🏫"
    ],
    "questions": [
     {
      "prompt": "O que é um ponto de referência?",
      "choices": [
       "Um som sem relação com o caminho",
       "Algo conhecido que ajuda a localizar um lugar",
       "Uma palavra que não indica nenhum lugar"
      ],
      "correct": 1,
      "explanation": "Uma árvore, um portão ou outro marco ajuda na orientação."
     },
     {
      "prompt": "Qual objeto pode ajudar a encontrar a entrada de uma escola?",
      "choices": [
       "Uma palavra inventada",
       "Uma cor sem localização",
       "O portão conhecido"
      ],
      "correct": 2,
      "explanation": "Um portão conhecido é um ponto de referência."
     },
     {
      "prompt": "O que significa descrever um trajeto?",
      "choices": [
       "Explicar por onde passar entre lugares",
       "Somente contar quantos alunos existem",
       "Cantar uma música sem falar do caminho"
      ],
      "correct": 0,
      "explanation": "Descrever um trajeto envolve indicar o percurso e seus pontos de referência."
     },
     {
      "prompt": "Ao caminhar fora de casa, qual atitude é recomendada para uma criança?",
      "choices": [
       "Ignorar a sinalização",
       "Seguir orientações de segurança e do adulto responsável",
       "Andar sozinha em qualquer rua"
      ],
      "correct": 1,
      "explanation": "Trajetos externos exigem cuidado e orientação."
     },
     {
      "prompt": "Qual desenho ajuda a explicar o caminho da sala até a biblioteca?",
      "choices": [
       "Um desenho sem nenhum lugar indicado",
       "Um número sem legenda",
       "Um desenho do percurso com pontos de referência"
      ],
      "correct": 2,
      "explanation": "Um esquema com lugares e setas pode representar o trajeto."
     }
    ]
   },
   {
    "id": "posicoes",
    "title": "Localizando objetos no espaço",
    "objective": "Usar palavras de posição para descrever onde estão objetos e pessoas.",
    "sections": [
     "Para localizar objetos, usamos palavras como em cima, embaixo, dentro, fora, perto e longe. Essas palavras ajudam a descrever o lugar onde alguma coisa está.",
     "Observe uma mesa com um livro sobre ela. Dizemos que o livro está em cima da mesa. Se uma bola está guardada numa caixa, dizemos que está dentro da caixa.",
     "A posição depende do ponto que observamos. Podemos praticar mudando um objeto de lugar e descrevendo a nova posição para um colega."
    ],
    "examples": [
     "O estojo está dentro da mochila; o caderno está em cima da mesa.",
     "O quadro fica à frente de quem olha da carteira para a parede da sala."
    ],
    "visual": [
     "📘",
     "⬆️",
     "📦",
     "⬇️"
    ],
    "questions": [
     {
      "prompt": "Uma bola guardada na caixa está...",
      "choices": [
       "Fora da sala obrigatoriamente",
       "Dentro da caixa",
       "Em cima do teto"
      ],
      "correct": 1,
      "explanation": "Dentro significa estar no interior de algo."
     },
     {
      "prompt": "Se um livro está sobre a mesa, podemos dizer que está...",
      "choices": [
       "Embaixo do chão",
       "Dentro de uma parede",
       "Em cima da mesa"
      ],
      "correct": 2,
      "explanation": "O livro está apoiado na parte superior da mesa."
     },
     {
      "prompt": "Qual palavra indica proximidade?",
      "choices": [
       "Perto",
       "Longe",
       "Ontem"
      ],
      "correct": 0,
      "explanation": "Perto indica que algo está a uma distância pequena, dependendo da referência."
     },
     {
      "prompt": "Se um lápis está fora do estojo, ele está...",
      "choices": [
       "No interior de uma caneta",
       "Do lado de fora do estojo",
       "Dentro do estojo"
      ],
      "correct": 1,
      "explanation": "Fora indica que o lápis não está dentro do estojo."
     },
     {
      "prompt": "Como indicar a posição de um objeto com mais clareza?",
      "choices": [
       "Falando somente que o objeto existe",
       "Mudando de assunto",
       "Dizendo a posição em relação a algo conhecido"
      ],
      "correct": 2,
      "explanation": "Usar uma referência, como mesa ou caixa, torna a descrição mais precisa."
     }
    ]
   },
   {
    "id": "cuidar-lugares",
    "title": "Cuidando dos lugares de convivência",
    "objective": "Reconhecer ações que ajudam a cuidar da escola, casa e espaços públicos.",
    "sections": [
     "Os lugares são compartilhados por pessoas, animais e plantas. Cuidar desses espaços é uma responsabilidade de quem os utiliza.",
     "Jogar resíduos no local adequado, evitar desperdícios e respeitar os objetos de uso coletivo são ações que ajudam a manter os ambientes agradáveis.",
     "Também podemos observar elementos naturais, como árvores e jardins, e elementos construídos, como bancos e calçadas. Ambos precisam de cuidado e de regras de convivência."
    ],
    "examples": [
     "Na sala, guardar materiais após uma atividade deixa o espaço organizado para todos.",
     "Na praça, usar as lixeiras e preservar as plantas ajuda a cuidar do lugar."
    ],
    "visual": [
     "🌳",
     "🗑️",
     "🏫",
     "🤝"
    ],
    "questions": [
     {
      "prompt": "Como podemos ajudar a conservar a sala de aula?",
      "choices": [
       "Deixar restos de comida no chão",
       "Guardar os materiais depois de usar",
       "Rasgar cartazes de colegas"
      ],
      "correct": 1,
      "explanation": "Organizar os materiais ajuda quem usa a sala."
     },
     {
      "prompt": "O que fazer com um papel sem uso?",
      "choices": [
       "Jogar pela janela",
       "Deixar no meio do pátio",
       "Colocá-lo no recipiente adequado"
      ],
      "correct": 2,
      "explanation": "O descarte adequado mantém os espaços limpos."
     },
     {
      "prompt": "Qual atitude demonstra cuidado com plantas da praça?",
      "choices": [
       "Evitar danificá-las",
       "Quebrar galhos por brincadeira",
       "Arrancar flores sem autorização"
      ],
      "correct": 0,
      "explanation": "Preservar as plantas é uma forma de cuidado com o lugar."
     },
     {
      "prompt": "Qual elemento costuma ser construído por pessoas?",
      "choices": [
       "Nuvem",
       "Calçada",
       "Árvore que cresceu naturalmente"
      ],
      "correct": 1,
      "explanation": "A calçada é um elemento construído no espaço."
     },
     {
      "prompt": "Por que combinamos regras para espaços compartilhados?",
      "choices": [
       "Para impedir sempre qualquer brincadeira",
       "Para que só uma pessoa possa usar o espaço",
       "Para ajudar na convivência e no cuidado coletivo"
      ],
      "correct": 2,
      "explanation": "Combinados podem favorecer segurança e uso respeitoso dos lugares."
     }
    ]
   }
  ]
 },
 "1:arte": {
  "intro": {
   "sections": [
    "As cores aparecem em desenhos, pinturas, roupas, objetos e paisagens. Artistas podem combinar cores para criar imagens e expressar ideias.",
    "Em atividades com tintas, podemos experimentar misturas. Misturar tinta amarela e tinta azul costuma produzir uma tonalidade de verde. O resultado pode mudar conforme os materiais.",
    "Não existe uma única maneira correta de criar arte. Observe as cores ao redor, escolha as que deseja utilizar e experimente combinações com cuidado."
   ],
   "examples": [
    "Pinte um sol de amarelo e experimente um céu de várias cores.",
    "Misture pequenas porções de tinta amarela e azul e observe a nova cor, com materiais adequados."
   ],
   "visual": [
    "🔴",
    "🟡",
    "🔵",
    "🟢"
   ],
   "questions": [
    {
     "prompt": "O que podemos fazer para descobrir uma cor nova usando tintas?",
     "choices": [
      "Contar os lápis sem usá-los",
      "Experimentar misturar duas cores",
      "Colocar a tinta longe do papel"
     ],
     "correct": 1,
     "explanation": "A mistura de tintas permite observar novas tonalidades."
    },
    {
     "prompt": "Em muitas tintas escolares, amarelo com azul costuma formar...",
     "choices": [
      "Vermelho",
      "Preto puro sempre",
      "Verde"
     ],
     "correct": 2,
     "explanation": "Amarelo e azul podem produzir uma tonalidade de verde."
    },
    {
     "prompt": "Qual recurso é usado para criar uma pintura?",
     "choices": [
      "Tinta e pincel",
      "Apenas uma régua sem material de cor",
      "Somente uma borracha sem papel"
     ],
     "correct": 0,
     "explanation": "Tintas e pincéis são materiais usados em pinturas."
    },
    {
     "prompt": "As pessoas precisam pintar um mesmo desenho sempre da mesma cor?",
     "choices": [
      "Sim, toda imagem precisa ser igual",
      "Não, podem fazer escolhas criativas",
      "Sim, não é permitido experimentar"
     ],
     "correct": 1,
     "explanation": "Na arte, escolhas de cores podem variar conforme a intenção."
    },
    {
     "prompt": "Onde encontramos cores para observar?",
     "choices": [
      "Apenas em um único caderno",
      "Somente em números escritos",
      "Em objetos, imagens e na natureza"
     ],
     "correct": 2,
     "explanation": "Cores aparecem em muitos elementos naturais e produzidos por pessoas."
    }
   ]
  },
  "extra": [
   {
    "id": "linhas-formas",
    "title": "Linhas e formas no desenho",
    "objective": "Reconhecer e criar linhas e formas variadas.",
    "sections": [
     "Desenhamos com linhas retas, curvas, onduladas e quebradas. Podemos usar essas linhas para representar caminhos, objetos e movimentos.",
     "Formas como círculo, quadrado e triângulo aparecem em muitos desenhos. Uma casa pode ser criada com um quadrado para a parede e um triângulo para o telhado.",
     "Você pode inventar sua própria composição. Experimente combinar linhas e formas, observando o tamanho e a posição de cada uma."
    ],
    "examples": [
     "Desenhe um círculo para representar uma roda.",
     "Crie uma casa usando uma forma quadrada e outra triangular."
    ],
    "visual": [
     "◯",
     "△",
     "□",
     "〰️"
    ],
    "questions": [
     {
      "prompt": "Qual forma tem três lados?",
      "choices": [
       "Círculo",
       "Triângulo",
       "Quadrado"
      ],
      "correct": 1,
      "explanation": "Um triângulo possui três lados."
     },
     {
      "prompt": "Qual forma não tem cantos?",
      "choices": [
       "Quadrado",
       "Triângulo",
       "Círculo"
      ],
      "correct": 2,
      "explanation": "O círculo é uma forma arredondada sem vértices."
     },
     {
      "prompt": "Que tipo de linha parece uma onda?",
      "choices": [
       "Ondulada",
       "Reta",
       "Pontilhada necessariamente"
      ],
      "correct": 0,
      "explanation": "Uma linha ondulada faz curvas que lembram ondas."
     },
     {
      "prompt": "Qual combinação pode representar uma casa simples?",
      "choices": [
       "Somente uma letra sem desenho",
       "Quadrado e triângulo",
       "Apenas dois números"
      ],
      "correct": 1,
      "explanation": "Um quadrado pode representar a parede e um triângulo o telhado."
     },
     {
      "prompt": "O que podemos variar ao criar desenhos com formas?",
      "choices": [
       "O fato de que todos devem desenhar igual",
       "A existência de cores no mundo",
       "Tamanho e posição"
      ],
      "correct": 2,
      "explanation": "Tamanho e posição das formas ajudam a compor uma imagem."
     }
    ]
   },
   {
    "id": "texturas",
    "title": "Descobrindo texturas na arte",
    "objective": "Identificar texturas e representá-las em trabalhos artísticos.",
    "sections": [
     "Textura é uma característica das superfícies. Algumas parecem lisas, outras rugosas, macias ou ásperas. Podemos perceber texturas pelo tato e também pelas imagens.",
     "Artistas usam linhas, pontos e cores para sugerir texturas. Pequenos riscos próximos podem representar uma superfície áspera, como a casca de uma árvore.",
     "Para experimentar, observe materiais seguros e peça orientação de um adulto. Não toque em superfícies que possam machucar, como vidro quebrado."
    ],
    "examples": [
     "A superfície de uma folha de papel lisa é diferente da de uma casca de árvore rugosa.",
     "No desenho, pontos e linhas podem sugerir a textura de uma pedra."
    ],
    "visual": [
     "📄",
     "🌳",
     "〰️",
     "✏️"
    ],
    "questions": [
     {
      "prompt": "Qual palavra pode descrever uma superfície com relevos?",
      "choices": [
       "Redonda apenas",
       "Rugosa",
       "Transparente necessariamente"
      ],
      "correct": 1,
      "explanation": "Rugosa descreve uma superfície com irregularidades."
     },
     {
      "prompt": "O que pode ajudar a sugerir textura em um desenho?",
      "choices": [
       "Apagar todas as marcas",
       "Não usar nenhuma forma",
       "Linhas e pontos"
      ],
      "correct": 2,
      "explanation": "Padrões de linhas e pontos podem representar texturas."
     },
     {
      "prompt": "Qual objeto costuma ter superfície lisa?",
      "choices": [
       "Folha de papel bem lisa",
       "Casca rugosa de árvore",
       "Lixa grossa"
      ],
      "correct": 0,
      "explanation": "Uma folha de papel lisa pode ser usada para comparar superfícies."
     },
     {
      "prompt": "É seguro tocar qualquer material para investigar texturas?",
      "choices": [
       "Sim, mesmo que esteja muito quente",
       "Não, devemos escolher materiais seguros",
       "Sim, mesmo se for cortante"
      ],
      "correct": 1,
      "explanation": "É importante evitar materiais perigosos e pedir orientação."
     },
     {
      "prompt": "Ao comparar texturas, podemos observar...",
      "choices": [
       "Somente a data no calendário",
       "A altura das notas musicais",
       "Diferenças entre superfícies"
      ],
      "correct": 2,
      "explanation": "Comparar superfícies ajuda a reconhecer texturas."
     }
    ]
   },
   {
    "id": "sons-ritmos",
    "title": "Sons, ritmo e movimento",
    "objective": "Experimentar ritmos e sons como elementos da expressão artística.",
    "sections": [
     "A arte também está presente na música. Podemos criar sons com a voz, palmas e instrumentos, e perceber quando eles são mais fortes, suaves, rápidos ou lentos.",
     "Ritmo é a organização de sons e pausas no tempo. Ao bater palmas em uma sequência, podemos repetir um padrão e perceber seus intervalos.",
     "Experimente criar um ritmo com duas palmas e uma pausa. Um colega pode repetir o mesmo padrão ou inventar outro. Respeite o volume dos sons e os ouvidos de todos."
    ],
    "examples": [
     "Bata duas palmas, faça uma pausa e repita a sequência.",
     "Escute uma música e acompanhe seu ritmo com movimentos suaves."
    ],
    "visual": [
     "👏",
     "👏",
     "⏸️",
     "🎵"
    ],
    "questions": [
     {
      "prompt": "O que faz parte de um ritmo?",
      "choices": [
       "A altura de uma cadeira",
       "Sons e pausas organizados no tempo",
       "Somente cores do desenho"
      ],
      "correct": 1,
      "explanation": "O ritmo organiza sons e silêncios."
     },
     {
      "prompt": "Qual atividade permite produzir sons com o corpo?",
      "choices": [
       "Observar uma fotografia em silêncio",
       "Contar formas no papel",
       "Bater palmas"
      ],
      "correct": 2,
      "explanation": "As palmas produzem sons que podem formar ritmos."
     },
     {
      "prompt": "Para repetir um padrão, precisamos observar...",
      "choices": [
       "A ordem dos sons e das pausas",
       "A cor do calçado apenas",
       "O tamanho do papel"
      ],
      "correct": 0,
      "explanation": "A sequência temporal define o padrão rítmico."
     },
     {
      "prompt": "Qual atitude ajuda a cuidar dos ouvidos nas atividades musicais?",
      "choices": [
       "Aumentar o volume sempre ao máximo",
       "Evitar sons muito altos perto dos colegas",
       "Gritar no ouvido de alguém"
      ],
      "correct": 1,
      "explanation": "Sons muito altos podem ser desconfortáveis e prejudiciais."
     },
     {
      "prompt": "Um ritmo pode ser executado de formas diferentes?",
      "choices": [
       "Não, somente com tambores",
       "Não, nunca com o corpo",
       "Sim, com voz, palmas ou instrumentos"
      ],
      "correct": 2,
      "explanation": "Podemos produzir ritmos usando diferentes fontes sonoras."
     }
    ]
   }
  ]
 },
 "1:educacao-fisica": {
  "intro": {
   "sections": [
    "Brincar é uma maneira de aprender a movimentar o corpo, imaginar situações e conviver com outras pessoas. Correr, saltar, caminhar e lançar são movimentos presentes em muitos jogos.",
    "Cada criança pode participar de um jeito. Algumas brincadeiras exigem mais equilíbrio; outras pedem atenção e colaboração. O importante é brincar com cuidado e respeitar limites.",
    "Antes de começar, observe se o espaço está livre de obstáculos perigosos e ouça as orientações de uma pessoa responsável. Combinar regras ajuda o grupo a se divertir com segurança."
   ],
   "examples": [
    "Na amarelinha, podemos praticar equilíbrio e pequenos saltos.",
    "Em um jogo de roda, podemos combinar movimentos e respeitar a vez dos colegas."
   ],
   "visual": [
    "🦶",
    "🤸",
    "🎯",
    "🤝"
   ],
   "questions": [
    {
     "prompt": "Qual brincadeira pode desenvolver equilíbrio?",
     "choices": [
      "Apenas escrever uma palavra",
      "Amarelinha",
      "Ficar imóvel diante da televisão"
     ],
     "correct": 1,
     "explanation": "A amarelinha pode envolver saltos e equilíbrio."
    },
    {
     "prompt": "O que devemos observar antes de brincar?",
     "choices": [
      "Se há objetos cortantes para pegar",
      "Se a passagem está bloqueada",
      "Se o local é seguro e adequado"
     ],
     "correct": 2,
     "explanation": "Um espaço seguro reduz riscos durante a brincadeira."
    },
    {
     "prompt": "Qual atitude ajuda o grupo a brincar melhor?",
     "choices": [
      "Respeitar regras combinadas",
      "Empurrar colegas para ganhar",
      "Impedir alguém de participar"
     ],
     "correct": 0,
     "explanation": "Combinados ajudam a organização do jogo."
    },
    {
     "prompt": "É necessário que todas as crianças façam os mesmos movimentos da mesma forma?",
     "choices": [
      "Sim, mesmo quando alguém sente dor",
      "Não, as atividades podem ser adaptadas",
      "Sim, sem considerar diferenças"
     ],
     "correct": 1,
     "explanation": "Brincadeiras podem ser adaptadas para participação de todos."
    },
    {
     "prompt": "Que movimento costuma fazer parte de uma brincadeira de pular corda?",
     "choices": [
      "Dormir",
      "Escrever sentado",
      "Saltar"
     ],
     "correct": 2,
     "explanation": "Pular corda envolve saltos coordenados."
    }
   ]
  },
  "extra": [
   {
    "id": "equilibrio",
    "title": "Equilíbrio e coordenação",
    "objective": "Reconhecer atividades que exigem equilíbrio e movimentos coordenados.",
    "sections": [
     "Equilíbrio é a capacidade de manter ou recuperar uma posição do corpo. Podemos praticar equilíbrio em atividades simples, como caminhar devagar sobre uma linha desenhada no chão.",
     "Coordenação acontece quando combinamos movimentos de diferentes partes do corpo. Lançar e pegar uma bola leve, por exemplo, exige atenção e controle dos braços e das mãos.",
     "Cada pessoa aprende em seu próprio ritmo. Comece por atividades adequadas, em local seguro, com ajuda e supervisão quando necessário."
    ],
    "examples": [
     "Caminhe devagar sobre uma linha no chão, sem precisar subir em nada alto.",
     "Lance uma bola macia para um colega e tente recebê-la com as mãos."
    ],
    "visual": [
     "➡️",
     "🦶",
     "🤲",
     "⚽"
    ],
    "questions": [
     {
      "prompt": "Qual atividade pode ajudar a praticar equilíbrio?",
      "choices": [
       "Empurrar alguém",
       "Caminhar sobre uma linha no chão",
       "Subir em um muro alto"
      ],
      "correct": 1,
      "explanation": "Uma linha no chão permite praticar equilíbrio com segurança."
     },
     {
      "prompt": "O que usamos para receber uma bola com as mãos?",
      "choices": [
       "Somente uma cor de roupa",
       "Apenas memória de números",
       "Coordenação e atenção"
      ],
      "correct": 2,
      "explanation": "Receber uma bola exige observar e coordenar movimentos."
     },
     {
      "prompt": "Quando uma brincadeira parece difícil, é adequado...",
      "choices": [
       "Pedir ajuda e tentar uma adaptação segura",
       "Continuar mesmo com dor intensa",
       "Zombar de quem tem dificuldade"
      ],
      "correct": 0,
      "explanation": "Podemos adaptar atividades e pedir orientação."
     },
     {
      "prompt": "Que material é mais adequado para iniciar uma brincadeira de lançar e pegar?",
      "choices": [
       "Pedra pontuda",
       "Bola leve e macia",
       "Objeto de vidro pesado"
      ],
      "correct": 1,
      "explanation": "Bolas leves e macias ajudam nas atividades iniciais."
     },
     {
      "prompt": "Para melhorar a coordenação, podemos...",
      "choices": [
       "Evitar qualquer tentativa",
       "Apagar as regras sem conversar",
       "Praticar movimentos em etapas"
      ],
      "correct": 2,
      "explanation": "A prática gradual pode desenvolver habilidades motoras."
     }
    ]
   },
   {
    "id": "regras",
    "title": "Regras, segurança e cuidado",
    "objective": "Compreender a função das regras e adotar atitudes seguras em brincadeiras.",
    "sections": [
     "Regras são combinados que orientam como uma brincadeira funciona. Elas ajudam o grupo a entender quem começa, como jogar e quando parar.",
     "Alguns cuidados protegem os participantes: escolher espaço adequado, evitar empurrões e respeitar sinais de cansaço ou desconforto.",
     "Podemos conversar para adaptar regras de modo que todos participem. O objetivo não é ganhar de qualquer maneira, mas brincar e aprender com segurança."
    ],
    "examples": [
     "Em pega-pega, o grupo combina os limites do espaço antes de começar.",
     "Se alguém precisa de uma pausa, os colegas podem interromper e reorganizar a brincadeira."
    ],
    "visual": [
     "📋",
     "🛑",
     "🤝",
     "💧"
    ],
    "questions": [
     {
      "prompt": "Para que servem regras em uma brincadeira?",
      "choices": [
       "Permitir empurrões perigosos",
       "Organizar a participação e o jogo",
       "Garantir que ninguém se divirta"
      ],
      "correct": 1,
      "explanation": "Regras orientam como brincar e conviver."
     },
     {
      "prompt": "Se um colega sente desconforto, a atitude adequada é...",
      "choices": [
       "Obrigá-lo a continuar",
       "Rir da situação",
       "Parar e pedir orientação, se necessário"
      ],
      "correct": 2,
      "explanation": "É importante respeitar sinais do corpo."
     },
     {
      "prompt": "Qual atitude é arriscada em um jogo com crianças?",
      "choices": [
       "Empurrar colegas",
       "Combinar regras",
       "Escolher espaço seguro"
      ],
      "correct": 0,
      "explanation": "Empurrões podem causar quedas e machucados."
     },
     {
      "prompt": "As regras podem ser adaptadas para incluir colegas?",
      "choices": [
       "Somente para excluir alguém",
       "Sim, com combinados do grupo",
       "Nunca, mesmo quando necessário"
      ],
      "correct": 1,
      "explanation": "Adaptar regras pode tornar jogos mais inclusivos."
     },
     {
      "prompt": "Antes do início de uma brincadeira, o grupo pode...",
      "choices": [
       "Esconder objetos perigosos no chão",
       "Impedir qualquer conversa",
       "Combinar limites do espaço"
      ],
      "correct": 2,
      "explanation": "Delimitar a área ajuda a segurança do grupo."
     }
    ]
   },
   {
    "id": "equipe",
    "title": "Cooperação e inclusão nas brincadeiras",
    "objective": "Participar de jogos valorizando colaboração e diversidade.",
    "sections": [
     "Em uma brincadeira coletiva, pessoas podem trabalhar juntas para alcançar um objetivo. Cooperar significa ajudar, conversar e respeitar as diferentes formas de participar.",
     "Nem todo jogo precisa ter um vencedor. Podemos propor desafios em grupo, como levar uma bola de um lado a outro sem deixá-la cair, ajustando a atividade às necessidades de quem participa.",
     "Se alguém tem dificuldade, podemos oferecer ajuda e combinar novas maneiras de brincar, sem humilhar ou excluir ninguém."
    ],
    "examples": [
     "Duas crianças podem transportar juntas uma bola macia até uma marca no chão.",
     "O grupo pode adaptar a distância de um lançamento para permitir que todos participem."
    ],
    "visual": [
     "🤲",
     "🤝",
     "🏐",
     "⭐"
    ],
    "questions": [
     {
      "prompt": "O que significa cooperar em uma brincadeira?",
      "choices": [
       "Ofender quem erra",
       "Ajudar o grupo a alcançar um objetivo",
       "Esconder a bola para ninguém jogar"
      ],
      "correct": 1,
      "explanation": "Cooperação envolve ações de ajuda e respeito."
     },
     {
      "prompt": "Um jogo coletivo precisa sempre de um vencedor?",
      "choices": [
       "Sim, sempre com eliminação",
       "Sim, sem qualquer participação de colegas",
       "Não, pode ter objetivo compartilhado"
      ],
      "correct": 2,
      "explanation": "Jogos cooperativos podem ter metas conjuntas."
     },
     {
      "prompt": "Quando alguém não consegue realizar um movimento, podemos...",
      "choices": [
       "Adaptar a atividade de forma respeitosa",
       "Excluir a pessoa sem conversa",
       "Zombar para ela desistir"
      ],
      "correct": 0,
      "explanation": "A adaptação facilita a inclusão."
     },
     {
      "prompt": "Qual atitude demonstra trabalho em equipe?",
      "choices": [
       "Impedir que outros participem",
       "Ouvir sugestões dos colegas",
       "Decidir sozinho sem conversar"
      ],
      "correct": 1,
      "explanation": "Escutar colegas favorece acordos coletivos."
     },
     {
      "prompt": "Qual é um objetivo de uma brincadeira cooperativa?",
      "choices": [
       "Proibir ajuda mútua",
       "Apontar erros para humilhar",
       "Realizar uma tarefa juntos"
      ],
      "correct": 2,
      "explanation": "A realização coletiva é a proposta de jogos cooperativos."
     }
    ]
   }
  ]
 },
 "1:ensino-religioso": {
  "intro": {
   "sections": [
    "As pessoas e suas famílias podem ter crenças, festas, histórias e costumes diferentes. Algumas seguem uma religião; outras não seguem nenhuma. Todas merecem respeito.",
    "Na escola, podemos conhecer essas diferenças sem precisar concordar com tudo ou adotar uma crença. Ouvir com atenção e evitar apelidos ofensivos são atitudes importantes.",
    "Se um colega conta como sua família celebra uma data, podemos fazer perguntas educadas, respeitando sua vontade de falar ou não sobre o assunto."
   ],
   "examples": [
    "Um colega pode celebrar uma data com música; outro pode ter uma tradição diferente.",
    "Uma criança pode contar um costume de família, enquanto outra prefere não compartilhar."
   ],
   "visual": [
    "🤝",
    "🏠",
    "💬",
    "🌎"
   ],
   "questions": [
    {
     "prompt": "Como agir quando um colega conta uma tradição diferente da sua?",
     "choices": [
      "Impedir a conversa",
      "Ouvir com respeito",
      "Ridicularizar o colega"
     ],
     "correct": 1,
     "explanation": "O respeito permite conhecer tradições diferentes."
    },
    {
     "prompt": "Todas as famílias seguem a mesma religião?",
     "choices": [
      "Sim, sem exceção",
      "Sim, todas participam das mesmas festas",
      "Não, existem crenças e escolhas diferentes"
     ],
     "correct": 2,
     "explanation": "Há diversidade de crenças, costumes e não crenças."
    },
    {
     "prompt": "Uma pessoa que não segue religião merece respeito?",
     "choices": [
      "Sim, assim como qualquer outra pessoa",
      "Não, deve ficar sem amigos",
      "Somente se concordar com a maioria"
     ],
     "correct": 0,
     "explanation": "O respeito não depende de seguir uma religião."
    },
    {
     "prompt": "Se alguém prefere não contar sua tradição, devemos...",
     "choices": [
      "Inventar histórias sobre ela",
      "Respeitar sua decisão",
      "Obrigar a pessoa a falar"
     ],
     "correct": 1,
     "explanation": "Cada pessoa pode decidir o que deseja compartilhar."
    },
    {
     "prompt": "Qual atitude ajuda a convivência entre diferentes famílias?",
     "choices": [
      "Usar apelidos ofensivos",
      "Impor um único costume a todos",
      "Fazer perguntas com educação"
     ],
     "correct": 2,
     "explanation": "Perguntas respeitosas ajudam o diálogo."
    }
   ]
  },
  "extra": [
   {
    "id": "costumes-familias",
    "title": "Costumes de diferentes famílias",
    "objective": "Conhecer hábitos familiares valorizando as diferenças.",
    "sections": [
     "Cada família pode ter maneiras próprias de se reunir, preparar comidas, ouvir músicas e comemorar acontecimentos. Algumas tradições passam de uma geração para outra.",
     "Esses costumes podem ser religiosos ou não religiosos. Para aprender sobre eles, podemos observar histórias, relatos e objetos culturais, sempre respeitando a privacidade das pessoas.",
     "O que é comum numa família pode ser novidade para outra. Conhecer diferenças não significa que uma família seja melhor do que a outra."
    ],
    "examples": [
     "Uma família pode reunir pessoas para contar histórias em determinada data.",
     "Outra família pode ter o costume de cozinhar uma receita especial aos fins de semana."
    ],
    "visual": [
     "🏠",
     "🎶",
     "🍲",
     "📖"
    ],
    "questions": [
     {
      "prompt": "O que são costumes familiares?",
      "choices": [
       "Regras iguais para todas as pessoas do mundo",
       "Hábitos e práticas de uma família",
       "Objetos que só podem ser usados na escola"
      ],
      "correct": 1,
      "explanation": "Costumes são práticas e hábitos partilhados por pessoas."
     },
     {
      "prompt": "Um costume familiar pode ser passado entre gerações?",
      "choices": [
       "Não, nunca",
       "Sim, mas apenas por números",
       "Sim, por relatos e práticas"
      ],
      "correct": 2,
      "explanation": "Muitos costumes são transmitidos por convivência e histórias."
     },
     {
      "prompt": "Todos os costumes familiares são obrigatoriamente religiosos?",
      "choices": [
       "Não, podem ser religiosos ou não",
       "Sim, sem exceção",
       "Não existem costumes familiares"
      ],
      "correct": 0,
      "explanation": "Costumes podem ter várias origens e significados."
     },
     {
      "prompt": "Quando uma família tem costumes diferentes, devemos...",
      "choices": [
       "Imitar para ridicularizar",
       "Reconhecer e respeitar as diferenças",
       "Dizer que uma é melhor do que todas as outras"
      ],
      "correct": 1,
      "explanation": "A diversidade de costumes merece respeito."
     },
     {
      "prompt": "Como podemos conhecer um costume sem invadir a privacidade?",
      "choices": [
       "Obrigando a contar segredos",
       "Espiando sem autorização",
       "Por relatos oferecidos voluntariamente"
      ],
      "correct": 2,
      "explanation": "Ouvir relatos voluntários respeita a privacidade."
     }
    ]
   },
   {
    "id": "simbolos",
    "title": "Símbolos e seus significados",
    "objective": "Compreender que símbolos possuem significados conforme o contexto cultural.",
    "sections": [
     "Um símbolo é algo que pode representar uma ideia, um grupo ou uma tradição. Pode ser uma imagem, um objeto ou um gesto.",
     "O mesmo desenho pode ter sentidos diferentes conforme o lugar e o costume. Por isso, não devemos adivinhar o significado de um símbolo desconhecido sem perguntar ou pesquisar.",
     "Símbolos podem aparecer em celebrações religiosas, em festas culturais e também em situações não religiosas, como a bandeira de uma escola."
    ],
    "examples": [
     "Uma bandeira pode representar um país, uma escola ou uma comunidade.",
     "Um objeto usado numa celebração pode ter significado especial para quem participa."
    ],
    "visual": [
     "🏳️",
     "⭐",
     "🎨",
     "📚"
    ],
    "questions": [
     {
      "prompt": "O que é um símbolo?",
      "choices": [
       "Somente uma palavra com números",
       "Algo que representa uma ideia ou tradição",
       "Um objeto sem nenhum possível significado"
      ],
      "correct": 1,
      "explanation": "Símbolos podem representar ideias, grupos e tradições."
     },
     {
      "prompt": "Um símbolo pode ter significados diferentes conforme o contexto?",
      "choices": [
       "Não, nunca",
       "Apenas se for feito de metal",
       "Sim"
      ],
      "correct": 2,
      "explanation": "O contexto cultural influencia o significado de símbolos."
     },
     {
      "prompt": "Como conhecer o sentido de um símbolo desconhecido?",
      "choices": [
       "Perguntar e pesquisar com respeito",
       "Inventar uma resposta para zombar",
       "Ignorar quem conhece o símbolo"
      ],
      "correct": 0,
      "explanation": "Pesquisar o contexto ajuda a compreendê-lo."
     },
     {
      "prompt": "Qual pode ser um símbolo não religioso?",
      "choices": [
       "Uma opinião sobre outra pessoa",
       "Bandeira da escola",
       "Uma obrigação de seguir uma crença"
      ],
      "correct": 1,
      "explanation": "Uma bandeira escolar pode representar uma comunidade."
     },
     {
      "prompt": "Ao observar um símbolo importante para outra pessoa, devemos...",
      "choices": [
       "Destruí-lo para brincar",
       "Ridicularizar quem o valoriza",
       "Tratá-lo com respeito"
      ],
      "correct": 2,
      "explanation": "Respeitar símbolos ajuda a convivência."
     }
    ]
   },
   {
    "id": "conviver",
    "title": "Conviver com respeito e liberdade",
    "objective": "Reconhecer atitudes de respeito à liberdade de consciência e às escolhas pessoais.",
    "sections": [
     "Convivemos com pessoas que pensam e vivem de maneiras diferentes. Algumas têm religião, outras não. Podemos ser amigos e trabalhar juntos mesmo sem pensar da mesma forma.",
     "Respeitar a liberdade de consciência inclui não obrigar alguém a praticar uma tradição, não fazer piadas ofensivas e não impedir que as pessoas sejam tratadas com dignidade.",
     "Quando surge uma dúvida, podemos perguntar com educação. Se ocorrer discriminação, é importante procurar ajuda de um adulto responsável."
    ],
    "examples": [
     "Dois colegas podem brincar juntos mesmo tendo crenças diferentes.",
     "Se um colega sofre zombaria por um costume, podemos acolhê-lo e contar a um adulto de confiança."
    ],
    "visual": [
     "🤝",
     "💬",
     "🫶",
     "🏫"
    ],
    "questions": [
     {
      "prompt": "É possível ser amigo de alguém com crenças diferentes?",
      "choices": [
       "Somente se a pessoa mudar de crença",
       "Sim, com respeito mútuo",
       "Não, nunca"
      ],
      "correct": 1,
      "explanation": "A amizade não exige concordância religiosa."
     },
     {
      "prompt": "O que significa respeitar a liberdade de consciência?",
      "choices": [
       "Obrigar todos a seguir um costume",
       "Impedir qualquer pergunta educada",
       "Permitir escolhas pessoais sem imposição"
      ],
      "correct": 2,
      "explanation": "A liberdade de consciência inclui seguir uma crença ou não."
     },
     {
      "prompt": "Se um colega sofre preconceito, podemos...",
      "choices": [
       "Acolher e pedir ajuda a um adulto responsável",
       "Participar das ofensas",
       "Fingir que a discriminação é uma brincadeira normal"
      ],
      "correct": 0,
      "explanation": "Pedir ajuda pode proteger e apoiar a pessoa."
     },
     {
      "prompt": "Qual atitude demonstra respeito em uma conversa?",
      "choices": [
       "Exigir que todos concordem",
       "Ouvir sem ofender",
       "Interromper para humilhar"
      ],
      "correct": 1,
      "explanation": "Escuta respeitosa favorece o diálogo."
     },
     {
      "prompt": "Na escola, pessoas de diferentes crenças devem receber...",
      "choices": [
       "Tratamento pior para algumas pessoas",
       "Convites apenas se tiverem a mesma crença",
       "Tratamento digno e respeitoso"
      ],
      "correct": 2,
      "explanation": "A dignidade e o respeito valem para todas as pessoas."
     }
    ]
   }
  ]
 }
};
