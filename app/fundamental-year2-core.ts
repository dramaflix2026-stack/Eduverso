import type {FundamentalQuestion,FundamentalTopic} from "./fundamental-topic-catalog";
// Conteúdo original, introdutório, do 2º ano. Não implica cobertura integral da BNCC.
export const yearTwoCore:Record<string,{intro:{sections:string[];examples:string[];visual:string[];questions:FundamentalQuestion[]};extra:Omit<FundamentalTopic,"expanded">[]}> = {
 "2:portugues": {
  "intro": {
   "sections": [
    "Uma frase comunica uma ideia que pode ser compreendida por quem lê ou escuta. Podemos escrever frases para contar o que aconteceu, pedir ajuda, convidar alguém ou fazer uma pergunta.",
    "Em frases escritas, usamos sinais de pontuação para indicar como a mensagem termina. O ponto final encerra uma afirmação. O ponto de interrogação mostra que estamos fazendo uma pergunta.",
    "Leia em voz alta: 'A turma chegou.' e 'A turma chegou?'. As palavras são parecidas, mas a intenção muda com a pontuação. Pratique criando uma afirmação e uma pergunta sobre sua escola."
   ],
   "examples": [
    "'Hoje tem aula.' é uma frase afirmativa e termina com ponto final.",
    "'Onde está meu lápis?' faz uma pergunta e termina com ponto de interrogação."
   ],
   "visual": [
    ".",
    "?",
    "✏️",
    "📖"
   ],
   "questions": [
    {
     "prompt": "Qual frase contém uma pergunta?",
     "choices": [
      "O sino tocou.",
      "Você encontrou o livro?",
      "A mochila é azul."
     ],
     "correct": 1,
     "explanation": "O ponto de interrogação marca a frase que pergunta algo."
    },
    {
     "prompt": "Qual sinal termina normalmente uma frase afirmativa simples?",
     "choices": [
      "Ponto de interrogação (?)",
      "Vírgula (,)",
      "Ponto final (.)"
     ],
     "correct": 2,
     "explanation": "O ponto final pode encerrar uma afirmação."
    },
    {
     "prompt": "Em 'Você quer brincar?', por que usamos '?'?",
     "choices": [
      "Porque perguntamos algo",
      "Porque a frase é uma lista",
      "Porque é o nome de uma pessoa"
     ],
     "correct": 0,
     "explanation": "A frase pergunta se alguém deseja brincar."
    },
    {
     "prompt": "Qual frase está pontuada como pergunta?",
     "choices": [
      "A turma terminou a atividade.",
      "Onde fica a biblioteca?",
      "Eu gosto de histórias."
     ],
     "correct": 1,
     "explanation": "'Onde fica a biblioteca?' pede uma informação."
    },
    {
     "prompt": "Qual frase está pontuada como afirmação?",
     "choices": [
      "Os alunos chegaram?",
      "Onde chegaram os alunos?",
      "Os alunos chegaram."
     ],
     "correct": 2,
     "explanation": "'Os alunos chegaram.' conta um acontecimento."
    }
   ]
  },
  "extra": [
   {
    "id": "silabas",
    "title": "Palavras e sílabas",
    "objective": "Separar oralmente palavras em sílabas e comparar quantidades.",
    "sections": [
     "Quando falamos, podemos perceber que muitas palavras têm partes sonoras chamadas sílabas. Falar devagar e bater uma palma para cada parte ajuda a escutar essas divisões.",
     "Observe CA-SA: são duas sílabas. Já CA-NE-CA tem três. As palavras também podem ter uma única sílaba, como SOL. O número de sílabas não é necessariamente o mesmo número de letras.",
     "Experimente dizer seu nome e os nomes de objetos da sala em voz alta. Faça uma palma por sílaba e compare palavras mais curtas e mais longas sem pressa."
    ],
    "examples": [
     "BO-LA tem duas sílabas: BO e LA.",
     "JA-NE-LA tem três sílabas: JA, NE e LA."
    ],
    "visual": [
     "BO",
     "LA",
     "👏",
     "👏"
    ],
    "questions": [
     {
      "prompt": "Quantas sílabas há em BO-LA?",
      "choices": [
       "1",
       "2",
       "3"
      ],
      "correct": 1,
      "explanation": "BO e LA são duas sílabas."
     },
     {
      "prompt": "Qual palavra tem três sílabas?",
      "choices": [
       "Casa",
       "Sol",
       "Janela"
      ],
      "correct": 2,
      "explanation": "JA-NE-LA apresenta três partes sonoras."
     },
     {
      "prompt": "Qual separação de CASA está correta?",
      "choices": [
       "CA-SA",
       "CAS-A",
       "C-AS-A"
      ],
      "correct": 0,
      "explanation": "Ao pronunciar devagar, ouvimos CA e SA."
     },
     {
      "prompt": "Qual palavra possui apenas uma sílaba?",
      "choices": [
       "Panela",
       "Sol",
       "Boneca"
      ],
      "correct": 1,
      "explanation": "SOL é pronunciada em uma sílaba."
     },
     {
      "prompt": "Quantas sílabas há em CA-NE-CA?",
      "choices": [
       "2",
       "4",
       "3"
      ],
      "correct": 2,
      "explanation": "CA, NE e CA são três sílabas."
     }
    ]
   },
   {
    "id": "leitura",
    "title": "Lendo pequenos textos",
    "objective": "Localizar informações explícitas em pequenos enunciados e relatos.",
    "sections": [
     "Ler um texto é procurar entender o que suas palavras dizem. Para isso, vale observar quem participa da história, onde os acontecimentos ocorrem e o que acontece primeiro.",
     "Leia: 'Lia levou uma bola ao parque. Ela brincou com seu irmão e depois voltou para casa.' O texto informa quem levou a bola, onde brincou e o que fez depois.",
     "Para responder a uma pergunta, procure a parte do texto que traz a informação. Se tiver dúvida, releia a frase antes de escolher, sem tentar inventar detalhes que não aparecem."
    ],
    "examples": [
     "No texto sobre Lia, ela levou uma bola ao parque.",
     "Depois de brincar, Lia voltou para casa, conforme o relato."
    ],
    "visual": [
     "📖",
     "👧",
     "⚽",
     "🌳"
    ],
    "questions": [
     {
      "prompt": "No texto, o que Lia levou ao parque?",
      "choices": [
       "Um guarda-chuva",
       "Uma bola",
       "Uma bicicleta"
      ],
      "correct": 1,
      "explanation": "O texto diz que Lia levou uma bola."
     },
     {
      "prompt": "Onde Lia brincou?",
      "choices": [
       "Na biblioteca",
       "No mercado",
       "No parque"
      ],
      "correct": 2,
      "explanation": "O lugar citado na história é o parque."
     },
     {
      "prompt": "Com quem Lia brincou?",
      "choices": [
       "Com seu irmão",
       "Com a professora",
       "Com uma vizinha"
      ],
      "correct": 0,
      "explanation": "O texto informa que ela brincou com o irmão."
     },
     {
      "prompt": "O que Lia fez depois de brincar?",
      "choices": [
       "Foi nadar no rio",
       "Voltou para casa",
       "Viajou de avião"
      ],
      "correct": 1,
      "explanation": "A última ação relatada é que voltou para casa."
     },
     {
      "prompt": "Para conferir uma resposta sobre o texto, o que é melhor fazer?",
      "choices": [
       "Adivinhar rapidamente",
       "Ignorar a história",
       "Reler a parte correspondente"
      ],
      "correct": 2,
      "explanation": "Reler ajuda a encontrar a informação escrita."
     }
    ]
   },
   {
    "id": "bilhetes-listas",
    "title": "Bilhetes e listas",
    "objective": "Reconhecer finalidades de bilhetes e listas do cotidiano.",
    "sections": [
     "Usamos a escrita para lembrar e comunicar informações. Uma lista reúne itens, como materiais para a aula ou compras para o lanche. Cada item costuma aparecer em uma linha.",
     "Um bilhete é uma mensagem curta destinada a alguém. Pode indicar para quem foi escrito, trazer um recado e mostrar quem o enviou. O texto deve ser claro para a pessoa que vai recebê-lo.",
     "Experimente escrever uma lista de três objetos para levar à escola. Depois, faça um bilhete simples: 'Vovó, deixei o desenho na mesa. Ana.' Compare a finalidade dos dois textos."
    ],
    "examples": [
     "Lista da mochila: caderno, lápis e borracha.",
     "Bilhete: 'Pai, o livro está na sala. Bia.' É uma mensagem para uma pessoa."
    ],
    "visual": [
     "📝",
     "✉️",
     "📚",
     "✏️"
    ],
    "questions": [
     {
      "prompt": "Qual texto é mais adequado para anotar vários materiais?",
      "choices": [
       "Placa de trânsito",
       "Lista",
       "Poema longo obrigatório"
      ],
      "correct": 1,
      "explanation": "Listas ajudam a reunir e conferir itens."
     },
     {
      "prompt": "Para que serve um bilhete?",
      "choices": [
       "Para contar todos os números do mundo",
       "Para substituir sempre todos os livros",
       "Para transmitir um recado curto"
      ],
      "correct": 2,
      "explanation": "Um bilhete comunica uma mensagem breve."
     },
     {
      "prompt": "Em uma lista de compras, o que costuma aparecer?",
      "choices": [
       "Itens que precisam ser comprados",
       "Somente um nome de rua",
       "Apenas uma pergunta sobre a data"
      ],
      "correct": 0,
      "explanation": "A lista apresenta os itens de interesse."
     },
     {
      "prompt": "Em 'Mãe, chego após a aula. Leo.', quem assina o bilhete?",
      "choices": [
       "Aula",
       "Leo",
       "Mãe"
      ],
      "correct": 1,
      "explanation": "Leo aparece como quem enviou o recado."
     },
     {
      "prompt": "Qual frase seria um recado claro para alguém?",
      "choices": [
       "Azul de três amanhã.",
       "Mesa lápis céu sem relação.",
       "Bia, deixei seu lápis na mesa."
      ],
      "correct": 2,
      "explanation": "Um bilhete útil comunica informação compreensível."
     }
    ]
   }
  ]
 },
 "2:matematica": {
  "intro": {
   "sections": [
    "Nos números que usamos todos os dias, dez unidades formam uma dezena. Podemos agrupar dez palitos e deixá-los amarrados. Assim, contamos grupos de dez com mais facilidade.",
    "No número 24, o 2 está na posição das dezenas: vale vinte unidades. O 4 está na posição das unidades: vale quatro. Portanto, 24 é formado por duas dezenas e quatro unidades.",
    "Essa ideia ajuda a comparar quantidades. O número 32 tem três dezenas e duas unidades, sendo maior que 23, que tem duas dezenas e três unidades."
   ],
   "examples": [
    "37 é igual a 3 dezenas e 7 unidades.",
    "50 tem 5 dezenas e nenhuma unidade solta."
   ],
   "visual": [
    "10",
    "+",
    "10",
    "+",
    "4"
   ],
   "questions": [
    {
     "prompt": "Quantas dezenas há em 37?",
     "choices": [
      "37",
      "3",
      "7"
     ],
     "correct": 1,
     "explanation": "O algarismo 3 ocupa a casa das dezenas."
    },
    {
     "prompt": "Quantas unidades soltas há em 24?",
     "choices": [
      "2",
      "20",
      "4"
     ],
     "correct": 2,
     "explanation": "O algarismo 4 ocupa a casa das unidades."
    },
    {
     "prompt": "Qual número tem 4 dezenas e 2 unidades?",
     "choices": [
      "42",
      "24",
      "402"
     ],
     "correct": 0,
     "explanation": "Quarenta mais dois corresponde a 42."
    },
    {
     "prompt": "Quantas unidades formam uma dezena?",
     "choices": [
      "100",
      "10",
      "5"
     ],
     "correct": 1,
     "explanation": "Dez unidades formam uma dezena."
    },
    {
     "prompt": "Qual número é maior?",
     "choices": [
      "23",
      "22",
      "32"
     ],
     "correct": 2,
     "explanation": "32 tem três dezenas; 23 e 22 têm apenas duas."
    }
   ]
  },
  "extra": [
   {
    "id": "adicao",
    "title": "Somando dezenas e unidades",
    "objective": "Resolver adições simples usando decomposição de dezenas e unidades.",
    "sections": [
     "Para somar números, podemos separar as dezenas das unidades. Isso facilita entender o cálculo e conferir o resultado com desenhos, palitos ou o quadro de valor de lugar.",
     "Na conta 23 + 14, juntamos 20 + 10 = 30 e 3 + 4 = 7. Depois somamos 30 + 7 e encontramos 37. O método funciona porque cada parte mantém seu valor.",
     "Se a soma das unidades chegar a dez, podemos formar uma nova dezena. Na conta 18 + 5, as oito unidades com mais cinco formam treze: uma dezena e três unidades, resultando em 23."
    ],
    "examples": [
     "23 + 14 = (20 + 10) + (3 + 4) = 37.",
     "18 + 5 = 23 porque 8 + 5 forma 13 unidades."
    ],
    "visual": [
     "2",
     "3",
     "+",
     "1",
     "4"
    ],
    "questions": [
     {
      "prompt": "Quanto é 23 + 14?",
      "choices": [
       "47",
       "37",
       "36"
      ],
      "correct": 1,
      "explanation": "20 + 10 = 30 e 3 + 4 = 7; juntos são 37."
     },
     {
      "prompt": "Quanto é 10 + 20?",
      "choices": [
       "12",
       "21",
       "30"
      ],
      "correct": 2,
      "explanation": "Uma dezena mais duas dezenas formam três dezenas."
     },
     {
      "prompt": "Quanto é 18 + 5?",
      "choices": [
       "23",
       "22",
       "13"
      ],
      "correct": 0,
      "explanation": "18 mais cinco unidades resulta em 23."
     },
     {
      "prompt": "Quanto é 12 + 6?",
      "choices": [
       "20",
       "18",
       "16"
      ],
      "correct": 1,
      "explanation": "Doze mais seis é dezoito."
     },
     {
      "prompt": "Quanto é 34 + 12?",
      "choices": [
       "45",
       "56",
       "46"
      ],
      "correct": 2,
      "explanation": "30 + 10 = 40 e 4 + 2 = 6; total 46."
     }
    ]
   },
   {
    "id": "subtracao",
    "title": "Retirando e comparando quantidades",
    "objective": "Resolver subtrações pequenas e interpretar quanto resta ou falta.",
    "sections": [
     "Subtrair pode significar retirar objetos de um grupo ou descobrir a diferença entre quantidades. Usamos o sinal de menos para registrar essa operação.",
     "Se você possui 15 tampinhas e entrega 4, restam 11. Podemos pensar primeiro nas cinco unidades: 5 - 4 = 1, mantendo uma dezena, o que resulta em 11.",
     "Também podemos comparar: uma criança tem 12 figurinhas e outra tem 8. A diferença é quatro figurinhas, pois 12 - 8 = 4. Desenhar objetos ajuda a entender o cálculo."
    ],
    "examples": [
     "15 - 4 = 11 porque quatro unidades são retiradas de quinze.",
     "12 - 8 = 4 é a diferença entre doze e oito."
    ],
    "visual": [
     "15",
     "−",
     "4",
     "=",
     "11"
    ],
    "questions": [
     {
      "prompt": "Quanto é 15 - 4?",
      "choices": [
       "19",
       "11",
       "10"
      ],
      "correct": 1,
      "explanation": "Quinze menos quatro deixa onze."
     },
     {
      "prompt": "Quanto é 12 - 8?",
      "choices": [
       "5",
       "20",
       "4"
      ],
      "correct": 2,
      "explanation": "Doze menos oito resulta em quatro."
     },
     {
      "prompt": "Se havia 20 frutas e 3 foram retiradas, quantas restaram?",
      "choices": [
       "17",
       "23",
       "13"
      ],
      "correct": 0,
      "explanation": "20 - 3 = 17."
     },
     {
      "prompt": "Quanto é 18 - 10?",
      "choices": [
       "28",
       "8",
       "10"
      ],
      "correct": 1,
      "explanation": "Retirar uma dezena de dezoito deixa oito."
     },
     {
      "prompt": "Uma criança tem 9 lápis e outra tem 6. Qual é a diferença?",
      "choices": [
       "15",
       "2",
       "3"
      ],
      "correct": 2,
      "explanation": "9 - 6 = 3 lápis de diferença."
     }
    ]
   },
   {
    "id": "formas",
    "title": "Figuras geométricas ao nosso redor",
    "objective": "Reconhecer círculo, quadrado, triângulo e retângulo em objetos.",
    "sections": [
     "As figuras geométricas ajudam a observar formas presentes em objetos e desenhos. Um círculo é arredondado; um triângulo tem três lados; o quadrado tem quatro lados iguais.",
     "O retângulo também tem quatro lados, com lados opostos de mesmo comprimento. Uma porta costuma lembrar um retângulo, e uma roda pode lembrar um círculo.",
     "Observe a sala e procure objetos que se parecem com essas figuras. Uma figura geométrica é uma representação idealizada; um objeto real pode ser parecido sem ser perfeitamente igual."
    ],
    "examples": [
     "Uma janela retangular pode lembrar a forma de um retângulo.",
     "O desenho de uma placa triangular apresenta três lados."
    ],
    "visual": [
     "◯",
     "△",
     "□",
     "▭"
    ],
    "questions": [
     {
      "prompt": "Qual figura tem três lados?",
      "choices": [
       "Quadrado",
       "Triângulo",
       "Círculo"
      ],
      "correct": 1,
      "explanation": "O triângulo tem três lados."
     },
     {
      "prompt": "Qual figura é arredondada e não tem vértices?",
      "choices": [
       "Triângulo",
       "Retângulo",
       "Círculo"
      ],
      "correct": 2,
      "explanation": "O círculo não possui cantos."
     },
     {
      "prompt": "Qual figura tem quatro lados de mesmo comprimento?",
      "choices": [
       "Quadrado",
       "Triângulo",
       "Círculo"
      ],
      "correct": 0,
      "explanation": "Um quadrado possui quatro lados iguais."
     },
     {
      "prompt": "Uma porta de sala geralmente lembra qual figura?",
      "choices": [
       "Triângulo",
       "Retângulo",
       "Círculo"
      ],
      "correct": 1,
      "explanation": "Muitas portas têm forma aproximadamente retangular."
     },
     {
      "prompt": "Qual destas figuras pode ser usada para desenhar uma roda?",
      "choices": [
       "Quadrado",
       "Triângulo",
       "Círculo"
      ],
      "correct": 2,
      "explanation": "Uma roda é representada frequentemente por uma forma circular."
     }
    ]
   }
  ]
 },
 "2:ciencias": {
  "intro": {
   "sections": [
    "As plantas são seres vivos e precisam de condições adequadas para crescer. Entre elas estão água, luz e acesso a substâncias presentes no ambiente.",
    "Grande parte das plantas utiliza a luz do Sol para produzir alimento por meio da fotossíntese. A água também participa de processos essenciais e ajuda a manter a planta funcionando.",
    "Cada espécie precisa de cuidados específicos. Uma planta pode adoecer com falta de água ou com excesso dela. Observe uma planta com orientação de um adulto e registre mudanças sem arrancá-la."
   ],
   "examples": [
    "Uma muda de feijão costuma se desenvolver melhor com luz e regas adequadas.",
    "Uma planta colocada muito tempo no escuro pode apresentar mudanças no crescimento."
   ],
   "visual": [
    "☀️",
    "💧",
    "🌱",
    "🌿"
   ],
   "questions": [
    {
     "prompt": "Qual recurso é importante para a fotossíntese da maioria das plantas?",
     "choices": [
      "Vidro",
      "Luz",
      "Plástico"
     ],
     "correct": 1,
     "explanation": "A luz fornece energia para a fotossíntese."
    },
    {
     "prompt": "Qual material a planta absorve pelas raízes, em geral?",
     "choices": [
      "Tinta",
      "Gasolina",
      "Água"
     ],
     "correct": 2,
     "explanation": "As raízes absorvem água do solo ou de outro meio."
    },
    {
     "prompt": "Todas as plantas devem receber exatamente a mesma quantidade de água?",
     "choices": [
      "Não, cada espécie possui necessidades",
      "Sim, sempre a mesma",
      "Sim, quanto mais água melhor"
     ],
     "correct": 0,
     "explanation": "Plantas diferentes necessitam de cuidados distintos."
    },
    {
     "prompt": "O que uma planta pode mostrar se não receber condições adequadas?",
     "choices": [
      "Crescer sempre sem limite",
      "Dificuldades de desenvolvimento",
      "Virar um objeto de plástico"
     ],
     "correct": 1,
     "explanation": "Condições inadequadas podem afetar o crescimento."
    },
    {
     "prompt": "Qual é uma boa maneira de acompanhar uma planta?",
     "choices": [
      "Arrancá-la todos os dias",
      "Pintar suas folhas com tinta",
      "Observar e registrar mudanças"
     ],
     "correct": 2,
     "explanation": "Observar regularmente permite perceber transformações sem danificá-la."
    }
   ]
  },
  "extra": [
   {
    "id": "partes-plantas",
    "title": "Raízes, caules e folhas",
    "objective": "Identificar partes comuns das plantas e suas funções gerais.",
    "sections": [
     "Muitas plantas possuem raiz, caule e folhas. A raiz ajuda a fixar a planta e absorve água e nutrientes. O caule sustenta outras partes e participa do transporte de substâncias.",
     "As folhas de muitas plantas realizam a fotossíntese, processo que depende da luz. Algumas plantas apresentam flores, frutos e sementes em determinados momentos da vida.",
     "Nem todas as plantas possuem essas partes da mesma maneira ou de forma facilmente visível. Para aprender, observe uma planta conhecida e desenhe suas partes sem prejudicá-la."
    ],
    "examples": [
     "Em uma muda de feijão, podemos reconhecer raízes, caule e folhas.",
     "Em uma árvore, o tronco faz parte do caule e sustenta galhos e folhas."
    ],
    "visual": [
     "🌱",
     "🌿",
     "🍃",
     "🌸"
    ],
    "questions": [
     {
      "prompt": "Qual parte geralmente absorve água do solo?",
      "choices": [
       "Fruto",
       "Raiz",
       "Flor"
      ],
      "correct": 1,
      "explanation": "As raízes absorvem água e ajudam na fixação."
     },
     {
      "prompt": "Qual parte sustenta folhas e galhos em muitas plantas?",
      "choices": [
       "Semente",
       "Pétala",
       "Caule"
      ],
      "correct": 2,
      "explanation": "O caule sustenta partes da planta."
     },
     {
      "prompt": "Em qual parte ocorre grande parte da fotossíntese de muitas plantas?",
      "choices": [
       "Folhas",
       "Raízes exclusivamente",
       "Frutos exclusivamente"
      ],
      "correct": 0,
      "explanation": "As folhas costumam captar luz para a fotossíntese."
     },
     {
      "prompt": "Uma semente pode originar o quê, em condições adequadas?",
      "choices": [
       "Um copo",
       "Uma nova planta",
       "Uma pedra"
      ],
      "correct": 1,
      "explanation": "A germinação pode dar origem a uma nova planta."
     },
     {
      "prompt": "Como estudar as partes de uma planta de modo cuidadoso?",
      "choices": [
       "Quebrar todos os galhos",
       "Pintar raízes com produtos desconhecidos",
       "Observar e desenhar sem arrancar"
      ],
      "correct": 2,
      "explanation": "A observação respeitosa evita danos à planta."
     }
    ]
   },
   {
    "id": "materiais",
    "title": "Materiais e suas propriedades",
    "objective": "Distinguir objetos de materiais e reconhecer propriedades observáveis.",
    "sections": [
     "Um objeto é algo que utilizamos ou observamos, como uma cadeira ou um copo. Esse objeto pode ser feito de diferentes materiais, como madeira, vidro, plástico ou metal.",
     "Os materiais possuem propriedades que podemos comparar com segurança. Alguns são transparentes, outros opacos; alguns são flexíveis, outros rígidos. Essas características influenciam seu uso.",
     "Um mesmo material pode aparecer em objetos diferentes. Procure exemplos ao seu redor e, com orientação, observe sem tocar em materiais cortantes, muito quentes ou perigosos."
    ],
    "examples": [
     "Um copo de vidro transparente permite ver através dele; uma caneca opaca não.",
     "Uma colher pode ser feita de metal, enquanto uma régua pode ser feita de plástico."
    ],
    "visual": [
     "🥤",
     "🪵",
     "🔧",
     "📏"
    ],
    "questions": [
     {
      "prompt": "Qual é um material usado para fabricar objetos?",
      "choices": [
       "Amanhã",
       "Madeira",
       "Passear"
      ],
      "correct": 1,
      "explanation": "Madeira é um material usado em móveis e outros objetos."
     },
     {
      "prompt": "O que significa dizer que um material é transparente?",
      "choices": [
       "Sempre é macio",
       "Sempre é pesado",
       "Permite ver através dele"
      ],
      "correct": 2,
      "explanation": "Materiais transparentes deixam passar luz e permitem ver imagens através deles."
     },
     {
      "prompt": "Qual destes exemplos descreve um objeto?",
      "choices": [
       "Copo",
       "Transparência",
       "Rigidez"
      ],
      "correct": 0,
      "explanation": "Copo é um objeto; transparência e rigidez são propriedades."
     },
     {
      "prompt": "Um mesmo objeto pode ser feito de materiais diferentes?",
      "choices": [
       "Somente quando o objeto é muito grande",
       "Sim, como copos de vidro e plástico",
       "Não, todos os objetos têm um material único"
      ],
      "correct": 1,
      "explanation": "Objetos semelhantes podem ser produzidos com materiais distintos."
     },
     {
      "prompt": "Qual cuidado é importante ao investigar materiais?",
      "choices": [
       "Pegar vidro quebrado na mão",
       "Encostar em objetos muito quentes",
       "Evitar contato com objetos cortantes"
      ],
      "correct": 2,
      "explanation": "A investigação deve priorizar segurança."
     }
    ]
   },
   {
    "id": "sombras",
    "title": "Luz, sombras e observação",
    "objective": "Perceber como a posição da luz influencia a formação de sombras.",
    "sections": [
     "Quando a luz encontra um objeto que a bloqueia, pode surgir uma sombra em uma superfície atrás dele. Isso acontece porque a luz não atravessa todos os materiais da mesma maneira.",
     "Em um dia ensolarado, é possível observar a sombra de uma árvore no chão. Se a posição aparente do Sol muda ao longo do dia, a direção e o tamanho dessa sombra também podem mudar.",
     "Para experimentar de modo seguro, use uma lanterna e um objeto opaco sobre uma mesa. Nunca olhe diretamente para o Sol, laser ou luzes muito fortes."
    ],
    "examples": [
     "Uma lanterna iluminando um brinquedo opaco pode projetar sua sombra na parede.",
     "A sombra de uma árvore ao meio-dia pode ser diferente da sombra em outro horário."
    ],
    "visual": [
     "🔦",
     "🧸",
     "⬛",
     "☀️"
    ],
    "questions": [
     {
      "prompt": "O que pode formar uma sombra?",
      "choices": [
       "Qualquer objeto completamente invisível",
       "Um objeto que bloqueia parte da luz",
       "Apenas um número escrito"
      ],
      "correct": 1,
      "explanation": "Uma sombra surge onde a luz é bloqueada."
     },
     {
      "prompt": "Qual objeto pode ajudar a observar sombras com segurança?",
      "choices": [
       "Laser apontado para os olhos",
       "Fogo sem supervisão",
       "Lanterna comum"
      ],
      "correct": 2,
      "explanation": "Uma lanterna permite experiências simples com luz."
     },
     {
      "prompt": "Por que a sombra de uma árvore pode mudar durante o dia?",
      "choices": [
       "Porque muda a posição aparente do Sol",
       "Porque a árvore sempre desaparece",
       "Porque o chão muda de planeta"
      ],
      "correct": 0,
      "explanation": "A direção da luz varia conforme o movimento aparente do Sol."
     },
     {
      "prompt": "O que significa dizer que um objeto é opaco?",
      "choices": [
       "Produz luz por conta própria",
       "Não permite ver claramente através dele",
       "É sempre feito de papel"
      ],
      "correct": 1,
      "explanation": "Materiais opacos impedem a passagem direta de luz visível."
     },
     {
      "prompt": "Qual cuidado é importante ao observar a luz do dia?",
      "choices": [
       "Olhar fixamente para o Sol",
       "Usar um espelho para mirar a luz nos olhos",
       "Não olhar diretamente para o Sol"
      ],
      "correct": 2,
      "explanation": "Olhar diretamente para o Sol pode prejudicar os olhos."
     }
    ]
   }
  ]
 },
 "2:historia": {
  "intro": {
   "sections": [
    "Podemos conhecer acontecimentos antigos por meio de registros deixados por pessoas e grupos. Fotografias, cartas, jornais, desenhos e objetos são fontes históricas.",
    "Uma carta pode mostrar o que uma pessoa contou em determinada época. Uma fotografia mostra um recorte do momento registrado. Para entender melhor, precisamos perguntar quando, onde e por quem a fonte foi produzida.",
    "Relatos orais também ajudam a conhecer o passado. Duas pessoas podem lembrar de um mesmo acontecimento de maneiras diferentes, por isso é importante escutar e comparar fontes com respeito."
   ],
   "examples": [
    "Uma carta antiga revela formas de comunicação entre pessoas de outra época.",
    "Uma fotografia de uma rua pode mostrar veículos e construções que já mudaram."
   ],
   "visual": [
    "✉️",
    "📷",
    "📰",
    "🕰️"
   ],
   "questions": [
    {
     "prompt": "Qual é uma fonte histórica escrita?",
     "choices": [
      "Água da torneira",
      "Carta",
      "Pedra sem inscrição conhecida"
     ],
     "correct": 1,
     "explanation": "Uma carta registra mensagens escritas de outra época."
    },
    {
     "prompt": "O que uma fotografia mostra?",
     "choices": [
      "Tudo o que aconteceu no mundo",
      "Todos os acontecimentos futuros",
      "Um recorte de um momento"
     ],
     "correct": 2,
     "explanation": "Fotografias registram parte de uma situação."
    },
    {
     "prompt": "Qual pergunta ajuda a conhecer uma fonte histórica?",
     "choices": [
      "Quando ela foi produzida?",
      "Qual cor devemos escolher sem observar?",
      "Quantos planetas há no desenho sem contexto?"
     ],
     "correct": 0,
     "explanation": "A data e o contexto ajudam na interpretação."
    },
    {
     "prompt": "O relato de uma pessoa sobre um acontecimento passado é chamado de...",
     "choices": [
      "Objeto sem história",
      "Fonte oral",
      "Fórmula matemática"
     ],
     "correct": 1,
     "explanation": "Relatos orais também podem servir de fonte."
    },
    {
     "prompt": "Por que podemos consultar mais de uma fonte sobre um evento?",
     "choices": [
      "Para garantir que todos dirão exatamente igual",
      "Para evitar qualquer investigação",
      "Para comparar informações e perspectivas"
     ],
     "correct": 2,
     "explanation": "Comparar fontes amplia a compreensão do passado."
    }
   ]
  },
  "extra": [
   {
    "id": "tempo-rotinas",
    "title": "Rotinas e passagem do tempo",
    "objective": "Organizar acontecimentos usando ontem, hoje e amanhã.",
    "sections": [
     "A passagem do tempo aparece na organização dos dias, das semanas e de nossas atividades. Palavras como ontem, hoje e amanhã nos ajudam a localizar os acontecimentos.",
     "Ontem se refere ao dia anterior ao de hoje; amanhã, ao dia seguinte. Podemos também organizar uma sequência de ações: tomar café, estudar, brincar e descansar.",
     "As rotinas variam entre famílias e comunidades. Uma criança pode estudar pela manhã e outra à tarde, mas ambas conseguem registrar a ordem de suas atividades."
    ],
    "examples": [
     "Se hoje é terça-feira, ontem foi segunda-feira e amanhã será quarta-feira.",
     "Em um calendário, podemos assinalar um passeio que acontecerá na próxima semana."
    ],
    "visual": [
     "📅",
     "⏰",
     "🌞",
     "🌙"
    ],
    "questions": [
     {
      "prompt": "Se hoje é terça-feira, que dia foi ontem?",
      "choices": [
       "Sexta-feira",
       "Segunda-feira",
       "Quarta-feira"
      ],
      "correct": 1,
      "explanation": "Ontem é o dia imediatamente anterior."
     },
     {
      "prompt": "Se hoje é terça-feira, qual será o dia de amanhã?",
      "choices": [
       "Segunda-feira",
       "Domingo",
       "Quarta-feira"
      ],
      "correct": 2,
      "explanation": "Amanhã é o dia seguinte ao de hoje."
     },
     {
      "prompt": "Qual objeto ajuda a organizar datas?",
      "choices": [
       "Calendário",
       "Copo vazio",
       "Caderno sem páginas"
      ],
      "correct": 0,
      "explanation": "Um calendário permite acompanhar dias e meses."
     },
     {
      "prompt": "As rotinas de todas as famílias são iguais?",
      "choices": [
       "Sim, todos estudam no mesmo período",
       "Não, podem variar",
       "Sim, todos acordam na mesma hora"
      ],
      "correct": 1,
      "explanation": "As rotinas podem ser diferentes conforme a família."
     },
     {
      "prompt": "Como podemos mostrar a ordem de atividades de um dia?",
      "choices": [
       "Misturando fatos sem relação",
       "Escolhendo apenas a cor azul",
       "Com uma sequência de desenhos"
      ],
      "correct": 2,
      "explanation": "Desenhos em sequência ajudam a representar o tempo."
     }
    ]
   },
   {
    "id": "trabalhos",
    "title": "Trabalhos e serviços na comunidade",
    "objective": "Reconhecer profissões e atividades importantes na convivência.",
    "sections": [
     "Em uma comunidade, as pessoas realizam diferentes trabalhos. Há quem cuide da saúde, ensine, produza alimentos, limpe os espaços públicos, construa objetos ou transporte pessoas.",
     "Os trabalhos podem mudar ao longo dos anos. Novas ferramentas surgem e algumas tarefas são realizadas de maneiras diferentes. Conhecer essas mudanças ajuda a compreender a vida das comunidades.",
     "Todo trabalho digno merece respeito. Devemos evitar ideias como 'trabalho de homem' e 'trabalho de mulher': diferentes pessoas podem exercer muitas profissões."
    ],
    "examples": [
     "Uma professora ensina e ajuda os alunos a aprender.",
     "Uma pessoa responsável pela coleta de resíduos contribui para o cuidado da cidade."
    ],
    "visual": [
     "🏥",
     "🏫",
     "🧹",
     "🌾"
    ],
    "questions": [
     {
      "prompt": "Quem costuma ensinar em uma sala de aula?",
      "choices": [
       "Árvore no parque",
       "Professor ou professora",
       "Motorista de navio na sala"
      ],
      "correct": 1,
      "explanation": "Professores exercem atividades de ensino."
     },
     {
      "prompt": "Qual trabalho ajuda no cuidado dos espaços públicos?",
      "choices": [
       "Espalhar lixo nas ruas",
       "Quebrar bancos da praça",
       "Coleta de resíduos"
      ],
      "correct": 2,
      "explanation": "A coleta de resíduos faz parte de serviços comunitários."
     },
     {
      "prompt": "Profissões podem mudar conforme novas tecnologias surgem?",
      "choices": [
       "Sim",
       "Não, nunca",
       "Somente em histórias inventadas"
      ],
      "correct": 0,
      "explanation": "Ferramentas e tecnologias alteram modos de trabalhar."
     },
     {
      "prompt": "Qual atitude devemos ter em relação a diferentes profissões?",
      "choices": [
       "Desprezo",
       "Respeito",
       "Zombaria"
      ],
      "correct": 1,
      "explanation": "Trabalhos dignos devem ser valorizados."
     },
     {
      "prompt": "Uma profissão é exclusiva de homens ou de mulheres por natureza?",
      "choices": [
       "Sim, todas são divididas por sexo",
       "Sim, só uma pessoa por cidade pode trabalhar",
       "Não, diferentes pessoas podem exercê-la"
      ],
      "correct": 2,
      "explanation": "Diferentes pessoas podem exercer profissões sem discriminação."
     }
    ]
   },
   {
    "id": "memoria-comunidade",
    "title": "Memórias e mudanças no bairro",
    "objective": "Comparar passado e presente de lugares com registros e relatos.",
    "sections": [
     "Um bairro possui histórias de pessoas e de espaços. Ruas, escolas, praças e transportes podem mudar à medida que a comunidade cresce ou se transforma.",
     "Para estudar essas mudanças, podemos comparar fotos antigas e atuais ou conversar com moradores que conhecem a região há muito tempo. Nem todas as mudanças são iguais para todas as pessoas.",
     "A memória da comunidade também está em festas, histórias e nomes de lugares. Ao registrar relatos, devemos pedir autorização e respeitar a experiência das pessoas."
    ],
    "examples": [
     "Uma rua que antes tinha poucas casas pode apresentar novos prédios atualmente.",
     "Fotografias de uma praça em duas épocas ajudam a notar mudanças em seus equipamentos."
    ],
    "visual": [
     "🏘️",
     "📸",
     "🌳",
     "🛣️"
    ],
    "questions": [
     {
      "prompt": "Como observar mudanças em uma praça ao longo dos anos?",
      "choices": [
       "Adivinhando sem conhecer o lugar",
       "Comparando fotografias de épocas diferentes",
       "Olhando duas folhas sem registro"
      ],
      "correct": 1,
      "explanation": "Fotos de momentos distintos ajudam a identificar transformações."
     },
     {
      "prompt": "Que fonte pode informar como era o bairro no passado?",
      "choices": [
       "Uma conta sem relação com o bairro",
       "Somente a cor de uma mochila",
       "Relato de um morador antigo"
      ],
      "correct": 2,
      "explanation": "Moradores podem compartilhar memórias da comunidade."
     },
     {
      "prompt": "O que pode mudar em um bairro?",
      "choices": [
       "Construções e transportes",
       "O fato de que o passado já aconteceu",
       "A existência do planeta Terra"
      ],
      "correct": 0,
      "explanation": "Construções, usos e serviços podem mudar."
     },
     {
      "prompt": "A memória de uma comunidade está somente em prédios?",
      "choices": [
       "Sim, apenas em carros",
       "Não, também em festas e relatos",
       "Sim, apenas em prédios"
      ],
      "correct": 1,
      "explanation": "Festas, histórias e tradições também preservam memórias."
     },
     {
      "prompt": "Ao registrar a história de outra pessoa, o que é importante?",
      "choices": [
       "Publicar tudo sem consentimento",
       "Inventar detalhes em seu nome",
       "Pedir autorização e ouvir com respeito"
      ],
      "correct": 2,
      "explanation": "Consentimento e respeito são essenciais ao registrar relatos."
     }
    ]
   }
  ]
 }
};
