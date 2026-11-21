import {fundamentalLessons,type FundamentalSubjectId} from "./fundamental-curriculum";
import {yearOneRemaining} from "./fundamental-year1-remaining";

export type FundamentalQuestion={prompt:string;choices:[string,string,string];correct:number;explanation:string};
export type FundamentalTopic={id:string;title:string;objective:string;sections:string[];examples:string[];visual:string[];questions:FundamentalQuestion[];expanded:boolean};
const learningObjectives:Record<number,Record<string,string>>={
 "1": {
  "portugues": "Identificar letras e reconhecer o som inicial de palavras conhecidas.",
  "matematica": "Contar objetos e juntar pequenas quantidades.",
  "ciencias": "Distinguir seres vivos de objetos sem vida.",
  "historia": "Reconhecer registros e lembranças de acontecimentos pessoais.",
  "geografia": "Identificar lugares de convivência na comunidade.",
  "arte": "Experimentar combinações de cores em pinturas.",
  "educacao-fisica": "Reconhecer brincadeiras que desenvolvem movimento e equilíbrio.",
  "ensino-religioso": "Praticar o respeito por diferentes tradições familiares."
 },
 "2": {
  "portugues": "Identificar frases interrogativas e os sinais de pontuação.",
  "matematica": "Distinguir dezenas e unidades em números de dois algarismos.",
  "ciencias": "Reconhecer condições necessárias ao crescimento das plantas.",
  "historia": "Identificar diferentes fontes de registros históricos.",
  "geografia": "Interpretar símbolos e legendas de mapas simples.",
  "arte": "Reconhecer e representar texturas por meio de desenhos.",
  "educacao-fisica": "Valorizar a colaboração em jogos coletivos.",
  "ensino-religioso": "Respeitar celebrações e hábitos de diferentes famílias."
 },
 "3": {
  "portugues": "Localizar informações explícitas em pequenos textos.",
  "matematica": "Relacionar multiplicação à formação de grupos iguais.",
  "ciencias": "Reconhecer mudanças de estado da água.",
  "historia": "Comparar registros de transformações na comunidade.",
  "geografia": "Distinguir atividades do campo e da cidade.",
  "arte": "Identificar padrões rítmicos em músicas e brincadeiras.",
  "educacao-fisica": "Reconhecer brincadeiras tradicionais e suas regras.",
  "ensino-religioso": "Pesquisar significados de símbolos respeitando seu contexto."
 },
 "4": {
  "portugues": "Identificar marcas do discurso direto em narrativas.",
  "matematica": "Representar e calcular a metade de quantidades.",
  "ciencias": "Reconhecer o papel de produtores em cadeias alimentares.",
  "historia": "Reconhecer a diversidade dos povos indígenas brasileiros.",
  "geografia": "Usar pontos cardeais para expressar direções.",
  "arte": "Conhecer manifestações artísticas em seus contextos culturais.",
  "educacao-fisica": "Praticar regras e atitudes de jogo limpo.",
  "ensino-religioso": "Reconhecer o papel da memória na transmissão de tradições."
 },
 "5": {
  "portugues": "Distinguir afirmações verificáveis de opiniões.",
  "matematica": "Somar valores monetários escritos em números decimais.",
  "ciencias": "Identificar atitudes seguras diante de riscos elétricos.",
  "historia": "Contextualizar a abolição legal da escravidão e seus limites.",
  "geografia": "Identificar as cinco grandes regiões brasileiras.",
  "arte": "Compreender sequências de imagens como forma de narrativa.",
  "educacao-fisica": "Respeitar limites individuais durante atividades corporais.",
  "ensino-religioso": "Compreender o direito à liberdade de crença e de não crença."
 },
 "6": {
  "portugues": "Reconhecer o conflito e outros elementos da narrativa.",
  "matematica": "Somar frações com denominadores iguais.",
  "ciencias": "Identificar a célula como unidade estrutural dos seres vivos.",
  "historia": "Relacionar o rio Nilo à agricultura no Egito Antigo.",
  "geografia": "Distinguir latitude de longitude.",
  "arte": "Reconhecer elementos visuais como linhas, pontos e texturas.",
  "educacao-fisica": "Identificar atitudes de cooperação em esportes coletivos.",
  "ensino-religioso": "Dialogar com respeito sobre diferentes visões de mundo.",
  "ingles": "Utilizar cumprimentos básicos em inglês em situações cotidianas."
 },
 "7": {
  "portugues": "Identificar relações de causa expressas por conectivos.",
  "matematica": "Calcular porcentagens simples de quantidades.",
  "ciencias": "Reconhecer relações entre seres vivos e fatores ambientais.",
  "historia": "Identificar formas históricas de resistência à escravidão.",
  "geografia": "Compreender características e desafios da urbanização.",
  "arte": "Perceber a importância do corpo e da voz na interpretação teatral.",
  "educacao-fisica": "Reconhecer estratégias de cooperação em jogos.",
  "ensino-religioso": "Exercitar o diálogo respeitoso mesmo sem concordância.",
  "ingles": "Identificar ações em andamento no present continuous."
 },
 "8": {
  "portugues": "Identificar a tese defendida em um texto argumentativo.",
  "matematica": "Resolver equações lineares simples.",
  "ciencias": "Compreender que mudanças na puberdade ocorrem em ritmos diferentes.",
  "historia": "Relacionar a abolição legal à permanência de desigualdades.",
  "geografia": "Reconhecer motivos e exemplos de migração.",
  "arte": "Analisar enquadramento e ângulos na fotografia.",
  "educacao-fisica": "Reconhecer atitudes de inclusão em atividades corporais.",
  "ensino-religioso": "Relacionar atitudes solidárias à convivência ética.",
  "ingles": "Reconhecer ações passadas em inglês com verbos regulares."
 },
 "9": {
  "portugues": "Diferenciar informações verificáveis de julgamentos de valor em anúncios.",
  "matematica": "Resolver equações quadráticas simples por fatoração.",
  "ciencias": "Reconhecer genes como segmentos de DNA que carregam informação genética.",
  "historia": "Identificar o contexto e a importância da Constituição de 1988.",
  "geografia": "Reconhecer fluxos econômicos e produtivos globais.",
  "arte": "Avaliar autoria e contexto de imagens que circulam na mídia.",
  "educacao-fisica": "Planejar práticas corporais respeitando limites e diversidade.",
  "ensino-religioso": "Compreender liberdade de consciência e pluralismo.",
  "ingles": "Empregar comparativos básicos em frases em inglês."
 }
};
const expanded:Record<string,{intro:{sections:string[];examples:string[];visual:string[];questions:FundamentalQuestion[]};extra:Omit<FundamentalTopic,"expanded">[]}> = {
 "1:portugues": {
  "intro": {
   "sections": [
    "Cada palavra que falamos é formada por sons. Na escrita, usamos letras para registrar esses sons. Uma letra nem sempre corresponde a um único som, mas podemos começar observando o som que aparece no início das palavras.",
    "Na palavra MALA, ouvimos o som /m/ no começo. Escrevemos esse som inicial com a letra M. Já a palavra BOLA começa com o som representado por B. Ouça, fale e compare as palavras em voz alta.",
    "As letras A, E, I, O e U são chamadas de vogais. Elas aparecem em muitas palavras. Ao aprender a ler, observamos o formato da letra, o som que ela representa e as palavras em que aparece."
   ],
   "examples": [
    "Diga MALA e depois MACACO. As duas palavras começam com o mesmo som /m/. Agora diga BOLA: o primeiro som mudou.",
    "Observe as letras M – A – L – A. O M aparece no começo e a vogal A aparece duas vezes."
   ],
   "visual": [
    "M",
    "A",
    "L",
    "A"
   ],
   "questions": [
    {
     "prompt": "Qual palavra começa com a letra M?",
     "choices": [
      "Bola",
      "Mala",
      "Pato"
     ],
     "correct": 1,
     "explanation": "Mala começa com M. Ao falar MALA, o primeiro som é /m/."
    },
    {
     "prompt": "Qual palavra também começa com o mesmo som de MALA?",
     "choices": [
      "Macaco",
      "Casa",
      "Sapo"
     ],
     "correct": 0,
     "explanation": "Macaco e mala têm o som /m/ no início."
    },
    {
     "prompt": "Qual letra é uma vogal?",
     "choices": [
      "M",
      "S",
      "A"
     ],
     "correct": 2,
     "explanation": "A é uma vogal. As vogais são A, E, I, O e U."
    },
    {
     "prompt": "Qual palavra começa com a letra B?",
     "choices": [
      "Mala",
      "Bola",
      "Lua"
     ],
     "correct": 1,
     "explanation": "Bola começa com B; mala começa com M."
    },
    {
     "prompt": "Na palavra MALA, qual letra aparece duas vezes?",
     "choices": [
      "M",
      "L",
      "A"
     ],
     "correct": 2,
     "explanation": "A é a segunda e a quarta letra de MALA."
    }
   ]
  },
  "extra": [
   {
    "id": "vogais",
    "title": "Vogais e seus sons",
    "objective": "Reconhecer as cinco vogais em palavras do cotidiano.",
    "sections": [
     "As letras A, E, I, O e U são vogais. Elas aparecem em várias posições das palavras. Você pode reconhecer cada uma pela forma escrita e por sons que escuta quando fala.",
     "Observe as palavras ABELHA, ELEFANTE, IGREJA, OVO e UVA. Cada uma começa com uma vogal diferente. Diga as palavras com calma e perceba o som inicial.",
     "Algumas vogais podem ter sons diferentes conforme a palavra. Por enquanto, o importante é identificar sua escrita e ouvir com atenção."
    ],
    "examples": [
     "ABELHA começa com A; UVA começa com U.",
     "Em BOLA, a vogal O aparece no meio e A aparece no fim."
    ],
    "visual": [
     "A",
     "E",
     "I",
     "O",
     "U"
    ],
    "questions": [
     {
      "prompt": "Qual letra é uma vogal?",
      "choices": [
       "P",
       "E",
       "T"
      ],
      "correct": 1,
      "explanation": "E é uma das cinco vogais."
     },
     {
      "prompt": "Qual palavra começa com a vogal U?",
      "choices": [
       "Urso",
       "Bola",
       "Mesa"
      ],
      "correct": 0,
      "explanation": "URSO começa com U."
     },
     {
      "prompt": "Qual é a primeira letra de OVO?",
      "choices": [
       "A",
       "U",
       "O"
      ],
      "correct": 2,
      "explanation": "OVO começa com O."
     },
     {
      "prompt": "Que vogal aparece no fim de CASA?",
      "choices": [
       "A",
       "I",
       "U"
      ],
      "correct": 0,
      "explanation": "CASA termina com A."
     },
     {
      "prompt": "Quais são somente vogais?",
      "choices": [
       "A, E, I",
       "A, B, E",
       "E, F, O"
      ],
      "correct": 0,
      "explanation": "A, E e I são vogais; B e F são consoantes."
     }
    ]
   },
   {
    "id": "silabas",
    "title": "Sílabas e palmas",
    "objective": "Perceber partes sonoras das palavras por meio de palmas.",
    "sections": [
     "Quando falamos devagar, muitas palavras podem ser divididas em pequenas partes sonoras, chamadas sílabas.",
     "Fale BO-LA e bata uma palma para BO e outra para LA. Você ouviu duas partes. Na palavra CA-SA, também podemos bater duas palmas: CA e SA.",
     "A separação em sílabas ajuda a perceber a organização dos sons e a começar a ler palavras."
    ],
    "examples": [
     "BO-LA: duas palmas, uma em BO e outra em LA.",
     "JA-NE-LA: três palmas, uma para cada parte."
    ],
    "visual": [
     "BO",
     "LA"
    ],
    "questions": [
     {
      "prompt": "Quantas partes sonoras tem BO-LA?",
      "choices": [
       "Uma",
       "Duas",
       "Três"
      ],
      "correct": 1,
      "explanation": "BO e LA formam duas sílabas."
     },
     {
      "prompt": "Qual palavra pode ser separada em CA-SA?",
      "choices": [
       "Casa",
       "Pato",
       "Mesa"
      ],
      "correct": 0,
      "explanation": "CASA pode ser pronunciada CA-SA."
     },
     {
      "prompt": "Quantas sílabas tem JA-NE-LA?",
      "choices": [
       "Duas",
       "Quatro",
       "Três"
      ],
      "correct": 2,
      "explanation": "JA-NE-LA tem três sílabas."
     },
     {
      "prompt": "Qual palavra tem duas sílabas?",
      "choices": [
       "SOL",
       "BOLA",
       "MAR"
      ],
      "correct": 1,
      "explanation": "BO-LA tem duas sílabas. SOL e MAR têm uma."
     },
     {
      "prompt": "Para que servem as palmas nesta atividade?",
      "choices": [
       "Para sentir as partes sonoras",
       "Para mudar a escrita",
       "Para contar letras apenas"
      ],
      "correct": 0,
      "explanation": "As palmas ajudam a perceber as partes pronunciadas da palavra."
     }
    ]
   },
   {
    "id": "palavras",
    "title": "Lendo palavras conhecidas",
    "objective": "Identificar palavras simples observando letras e sons.",
    "sections": [
     "Ler uma palavra envolve observar as letras, relacioná-las aos sons e perceber o significado do que foi lido.",
     "Comece por palavras pequenas e conhecidas: PATO, BOLA e CASA. Fale as palavras, observe a primeira letra e acompanhe as demais letras.",
     "Uma palavra pode ter quatro letras e duas sílabas, como PATO: PA-TO. Com a prática, a leitura fica mais fluida."
    ],
    "examples": [
     "PATO começa com P e pode ser dividido em PA-TO.",
     "BOLA é uma palavra de quatro letras: B, O, L e A."
    ],
    "visual": [
     "PA",
     "TO"
    ],
    "questions": [
     {
      "prompt": "Qual palavra começa com a letra P?",
      "choices": [
       "Pato",
       "Casa",
       "Bola"
      ],
      "correct": 0,
      "explanation": "PATO começa com a letra P."
     },
     {
      "prompt": "Qual palavra tem quatro letras?",
      "choices": [
       "SOL",
       "BOLA",
       "MAR"
      ],
      "correct": 1,
      "explanation": "BOLA tem B, O, L e A: quatro letras."
     },
     {
      "prompt": "Como separamos PATO em duas sílabas?",
      "choices": [
       "P-ATO",
       "PAT-O",
       "PA-TO"
      ],
      "correct": 2,
      "explanation": "PA-TO tem duas sílabas."
     },
     {
      "prompt": "Qual palavra termina com a letra A?",
      "choices": [
       "PATO",
       "CASA",
       "SOL"
      ],
      "correct": 1,
      "explanation": "CASA termina com A."
     },
     {
      "prompt": "Qual letra aparece no começo de BOLA?",
      "choices": [
       "B",
       "O",
       "L"
      ],
      "correct": 0,
      "explanation": "A primeira letra de BOLA é B."
     }
    ]
   }
  ]
 },
 "1:matematica": {
  "intro": {
   "sections": [
    "Contar é descobrir quantos objetos há em um grupo. Para contar, apontamos para cada objeto uma única vez e falamos os números na sequência: um, dois, três...",
    "Adicionar significa juntar quantidades. Imagine três lápis sobre a mesa e mais dois lápis chegando. Primeiro conte os três; depois conte os dois novos. Agora há cinco lápis.",
    "Podemos registrar essa junção com números: 3 + 2 = 5. O sinal + indica adição, e o sinal = mostra que os dois lados representam a mesma quantidade."
   ],
   "examples": [
    "Você tem 3 lápis. Ganha mais 2. Juntando todos, são 5 lápis.",
    "Duas bolinhas e uma bolinha formam três bolinhas: 2 + 1 = 3."
   ],
   "visual": [
    "●",
    "●",
    "●",
    "+",
    "●",
    "●"
   ],
   "questions": [
    {
     "prompt": "Quanto é 3 + 2?",
     "choices": [
      "4",
      "5",
      "6"
     ],
     "correct": 1,
     "explanation": "Conte três objetos e depois mais dois: cinco ao todo."
    },
    {
     "prompt": "Quanto é 2 + 1?",
     "choices": [
      "3",
      "2",
      "4"
     ],
     "correct": 0,
     "explanation": "Duas unidades mais uma unidade formam três."
    },
    {
     "prompt": "Quanto é 4 + 1?",
     "choices": [
      "6",
      "4",
      "5"
     ],
     "correct": 2,
     "explanation": "Depois de quatro vem cinco; juntar mais uma unidade resulta em cinco."
    },
    {
     "prompt": "Qual conta representa juntar 2 e 2?",
     "choices": [
      "2 + 2",
      "2 - 2",
      "2 + 0"
     ],
     "correct": 0,
     "explanation": "Juntar duas quantidades de dois é 2 + 2."
    },
    {
     "prompt": "Se você tem 1 bola e ganha mais 3, fica com quantas?",
     "choices": [
      "3",
      "4",
      "5"
     ],
     "correct": 1,
     "explanation": "Uma bola mais três bolas resulta em quatro."
    }
   ]
  },
  "extra": [
   {
    "id": "contagem",
    "title": "Contando até 20",
    "objective": "Relacionar números até 20 com quantidades de objetos.",
    "sections": [
     "Os números seguem uma ordem. Depois de 9 vem 10; depois de 10 vem 11. Para contar uma coleção, toque em cada elemento uma vez.",
     "Podemos formar grupos de dez e acrescentar mais objetos. Dez objetos e três objetos correspondem ao número 13.",
     "Ler o numeral e contar a quantidade são habilidades diferentes. Treine as duas: observe 14 e tente separar quatorze objetos."
    ],
    "examples": [
     "10 tampinhas e mais 2 tampinhas formam 12 tampinhas.",
     "Depois de 18 vem 19 e depois 20."
    ],
    "visual": [
     "10",
     "+",
     "3",
     "=",
     "13"
    ],
    "questions": [
     {
      "prompt": "Qual número vem depois de 9?",
      "choices": [
       "8",
       "10",
       "11"
      ],
      "correct": 1,
      "explanation": "A sequência passa de 9 para 10."
     },
     {
      "prompt": "Quanto é 10 + 3?",
      "choices": [
       "13",
       "12",
       "14"
      ],
      "correct": 0,
      "explanation": "Dez unidades e mais três dão treze."
     },
     {
      "prompt": "Qual número vem imediatamente antes de 15?",
      "choices": [
       "16",
       "13",
       "14"
      ],
      "correct": 2,
      "explanation": "O número anterior a 15 é 14."
     },
     {
      "prompt": "Qual é o maior número?",
      "choices": [
       "12",
       "17",
       "11"
      ],
      "correct": 1,
      "explanation": "17 é maior que 12 e 11."
     },
     {
      "prompt": "Quantos objetos há em 10 + 5?",
      "choices": [
       "15",
       "14",
       "16"
      ],
      "correct": 0,
      "explanation": "Dez objetos e cinco objetos somam quinze."
     }
    ]
   },
   {
    "id": "subtracao",
    "title": "Tirar e descobrir quanto resta",
    "objective": "Resolver subtrações simples retirando elementos de um grupo.",
    "sections": [
     "Subtrair é uma maneira de descobrir quantos elementos restam quando retiramos uma quantidade de outra.",
     "Imagine cinco balas sobre a mesa. Se duas forem retiradas, restarão três. Escrevemos 5 - 2 = 3.",
     "Para praticar, desenhe bolinhas, risque as que foram retiradas e conte as que sobraram."
    ],
    "examples": [
     "5 maçãs menos 2 maçãs: sobram 3 maçãs.",
     "4 lápis menos 1 lápis: sobram 3 lápis."
    ],
    "visual": [
     "●",
     "●",
     "●",
     "●",
     "●"
    ],
    "questions": [
     {
      "prompt": "Quanto é 5 - 2?",
      "choices": [
       "2",
       "3",
       "4"
      ],
      "correct": 1,
      "explanation": "De cinco objetos, tire dois e conte os três restantes."
     },
     {
      "prompt": "Você tinha 4 lápis e deu 1. Quantos sobraram?",
      "choices": [
       "3",
       "2",
       "5"
      ],
      "correct": 0,
      "explanation": "Quatro menos um é três."
     },
     {
      "prompt": "Quanto é 3 - 3?",
      "choices": [
       "3",
       "1",
       "0"
      ],
      "correct": 2,
      "explanation": "Retirar todos os três deixa zero."
     },
     {
      "prompt": "Quanto é 6 - 1?",
      "choices": [
       "4",
       "5",
       "6"
      ],
      "correct": 1,
      "explanation": "Tirar um de seis deixa cinco."
     },
     {
      "prompt": "Qual conta representa tirar 2 de 5?",
      "choices": [
       "5 - 2",
       "5 + 2",
       "2 + 5"
      ],
      "correct": 0,
      "explanation": "O sinal - representa a retirada."
     }
    ]
   },
   {
    "id": "dezenas",
    "title": "Unidades e grupos de dez",
    "objective": "Formar uma dezena e reconhecer unidades restantes.",
    "sections": [
     "Uma dezena é formada por dez unidades. Podemos usar palitos, tampinhas ou desenhos para representar essa quantidade.",
     "Quando agrupamos dez objetos e deixamos mais dois separados, temos doze objetos. Registramos 12 como uma dezena e duas unidades.",
     "Agrupar facilita a contagem de coleções maiores. Primeiro conte os grupos de dez e depois os objetos soltos."
    ],
    "examples": [
     "10 palitos amarrados formam uma dezena.",
     "Uma dezena e 4 unidades correspondem ao número 14."
    ],
    "visual": [
     "10",
     "+",
     "4",
     "=",
     "14"
    ],
    "questions": [
     {
      "prompt": "Quantas unidades formam uma dezena?",
      "choices": [
       "5",
       "10",
       "20"
      ],
      "correct": 1,
      "explanation": "Dez unidades formam uma dezena."
     },
     {
      "prompt": "Uma dezena e 2 unidades formam qual número?",
      "choices": [
       "12",
       "10",
       "20"
      ],
      "correct": 0,
      "explanation": "Dez mais duas unidades formam doze."
     },
     {
      "prompt": "No número 15, quantas unidades ficam além da dezena?",
      "choices": [
       "1",
       "10",
       "5"
      ],
      "correct": 2,
      "explanation": "15 é uma dezena e cinco unidades."
     },
     {
      "prompt": "Qual número representa uma dezena e 7 unidades?",
      "choices": [
       "7",
       "17",
       "70"
      ],
      "correct": 1,
      "explanation": "10 + 7 = 17."
     },
     {
      "prompt": "Duas dezenas têm quantas unidades?",
      "choices": [
       "20",
       "12",
       "10"
      ],
      "correct": 0,
      "explanation": "Duas dezenas equivalem a vinte unidades."
     }
    ]
   }
  ]
 }
};
const improvedIntroQuestions:Record<string,FundamentalQuestion>={
 "1:geografia": {
  "prompt": "Qual lugar público costuma reunir pessoas para brincar e passear?",
  "choices": [
   "Praça",
   "Quarto",
   "Armário"
  ],
  "correct": 0,
  "explanation": "Uma praça é um espaço público de convivência e lazer."
 },
 "2:arte": {
  "prompt": "Qual palavra descreve uma superfície que parece cheia de pequenas irregularidades?",
  "choices": [
   "Lisa",
   "Rugosa",
   "Macia"
  ],
  "correct": 1,
  "explanation": "Rugosa indica uma superfície com pequenas irregularidades."
 },
 "5:historia": {
  "prompt": "Em que ano foi assinada a Lei Áurea?",
  "choices": [
   "1822",
   "1889",
   "1888"
  ],
  "correct": 2,
  "explanation": "A Lei Áurea foi assinada em 13 de maio de 1888."
 },
 "6:portugues": {
  "prompt": "Qual elemento apresenta o problema que movimenta uma narrativa?",
  "choices": [
   "Desfecho",
   "Conflito",
   "Título"
  ],
  "correct": 1,
  "explanation": "O conflito inicia ou movimenta as ações da narrativa."
 },
 "9:ciencias": {
  "prompt": "O que são genes?",
  "choices": [
   "Fragmentos de ar sem informação",
   "Segmentos de DNA com informação genética",
   "Partes exclusivas do sangue"
  ],
  "correct": 1,
  "explanation": "Genes são segmentos de DNA com informações hereditárias."
 }
};

export function getFundamentalTopics(year:number,subject:FundamentalSubjectId):FundamentalTopic[]{
 const lesson=fundamentalLessons[year]?.[subject];
 if(!lesson)return [];
 const key=year+":"+subject;
 const topicContent=expanded[key]??yearOneRemaining[key];
 const introExtra=topicContent?.intro;
 const defaultQuestion:FundamentalQuestion={prompt:lesson.question,choices:lesson.choices,correct:lesson.correct,explanation:lesson.feedback};
 const intro:FundamentalTopic={id:"introducao",title:lesson.title,objective:learningObjectives[year]?.[subject]??"Compreender o tema da aula inicial.",
   sections:introExtra?.sections??[lesson.theory],examples:introExtra?.examples??[lesson.example],visual:introExtra?.visual??[],
   questions:introExtra?.questions??[improvedIntroQuestions[key]??defaultQuestion],expanded:Boolean(introExtra)};
 return [intro,...(topicContent?.extra??[]).map(t=>({...t,expanded:true}))];
}
export const fundamentalTopicCount=Array.from({length:9},(_,i)=>i+1).reduce((total,year)=>{
 const s=Object.keys(fundamentalLessons[year]??{}) as FundamentalSubjectId[];
 return total+s.reduce((count,subject)=>count+getFundamentalTopics(year,subject).length,0);
},0);
