// Trilhas introdutórias originais do Eduverso. Organização orientativa, não reprodução completa da BNCC.
export const subjectMetadata = [
  {
    "id": "portugues",
    "name": "Língua Portuguesa",
    "symbol": "Aa",
    "category": "Linguagens",
    "description": "Ler, compreender e escrever"
  },
  {
    "id": "matematica",
    "name": "Matemática",
    "symbol": "∑",
    "category": "Matemática",
    "description": "Números, operações e raciocínio"
  },
  {
    "id": "ciencias",
    "name": "Ciências",
    "symbol": "⚗",
    "category": "Ciências da Natureza",
    "description": "Vida, matéria, Terra e universo"
  },
  {
    "id": "historia",
    "name": "História",
    "symbol": "♜",
    "category": "Ciências Humanas",
    "description": "Tempo, sociedade e memória"
  },
  {
    "id": "geografia",
    "name": "Geografia",
    "symbol": "◎",
    "category": "Ciências Humanas",
    "description": "Espaço, paisagens e sociedade"
  },
  {
    "id": "arte",
    "name": "Arte",
    "symbol": "✦",
    "category": "Linguagens",
    "description": "Expressão, criação e culturas"
  },
  {
    "id": "educacao-fisica",
    "name": "Educação Física",
    "symbol": "⚽",
    "category": "Linguagens",
    "description": "Movimento, jogos e participação"
  },
  {
    "id": "ensino-religioso",
    "name": "Ensino Religioso",
    "symbol": "◇",
    "category": "Ensino Religioso",
    "description": "Diversidade cultural, crenças e respeito"
  },
  {
    "id": "ingles",
    "name": "Língua Inglesa",
    "symbol": "EN",
    "category": "Linguagens",
    "description": "Leitura, vocabulário e comunicação"
  }
] as const;
export type FundamentalSubjectId = typeof subjectMetadata[number]["id"];
export type FundamentalGrade=1|2|3|4|5|6|7|8|9;
export type FundamentalLesson={title:string;theory:string;example:string;question:string;choices:[string,string,string];correct:number;feedback:string};
export const fundamentalLessons:Record<number,Partial<Record<FundamentalSubjectId,FundamentalLesson>>>={
  "1": {
    "portugues": {
      "title": "Letras e sons",
      "theory": "As letras representam sons da fala. As vogais são A, E, I, O e U. Identificar o som inicial de uma palavra ajuda a começar a ler e escrever.",
      "example": "Em 'mala', o primeiro som é representado pela letra M.",
      "question": "Qual palavra começa com a letra M?",
      "choices": [
        "Sapato",
        "Mala",
        "Bola"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Mala\". Em 'mala', o primeiro som é representado pela letra M."
    },
    "matematica": {
      "title": "Contar e adicionar",
      "theory": "Contar é associar um número a cada objeto. Adicionar é juntar quantidades, sem contar o mesmo objeto duas vezes.",
      "example": "Se temos 3 lápis e recebemos mais 2, ficamos com 5 lápis.",
      "question": "Quanto é 3 + 2?",
      "choices": [
        "4",
        "6",
        "5"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"5\". Se temos 3 lápis e recebemos mais 2, ficamos com 5 lápis."
    },
    "ciencias": {
      "title": "Seres vivos e não vivos",
      "theory": "Seres vivos têm ciclos de vida e realizam processos como crescimento. Objetos fabricados, como cadeiras, não são seres vivos.",
      "example": "Uma árvore nasce de uma semente, cresce e necessita de água e luz.",
      "question": "Qual exemplo é um ser vivo?",
      "choices": [
        "Árvore",
        "Pedra",
        "Caderno"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Árvore\". Uma árvore nasce de uma semente, cresce e necessita de água e luz."
    },
    "historia": {
      "title": "Minha história e minhas lembranças",
      "theory": "Fotos, objetos e relatos de pessoas ajudam a lembrar acontecimentos do passado. Podemos organizar acontecimentos em antes, durante e depois.",
      "example": "Uma fotografia de quando você era bebê é um registro de um momento anterior.",
      "question": "Qual objeto ajuda a conhecer acontecimentos do passado?",
      "choices": [
        "Papel em branco",
        "Fotografia antiga",
        "Borracha nova"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Fotografia antiga\". Uma fotografia de quando você era bebê é um registro de um momento anterior."
    },
    "geografia": {
      "title": "Lugares em que vivemos",
      "theory": "Casa, escola e praça são lugares de convivência. Cada lugar possui características e regras de cuidado coletivo.",
      "example": "Na escola existem salas, pátio e pessoas que compartilham o espaço.",
      "question": "Qual é um lugar de convivência?",
      "choices": [
        "Número 8",
        "Cor azul",
        "Praça"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Praça\". Na escola existem salas, pátio e pessoas que compartilham o espaço."
    },
    "arte": {
      "title": "Cores nas imagens",
      "theory": "As cores podem ser usadas para comunicar ideias e criar imagens. No modelo tradicional de pintura, vermelho, amarelo e azul são cores primárias.",
      "example": "Misturar amarelo com azul em tinta costuma produzir verde.",
      "question": "Qual dupla costuma formar verde na mistura de tintas?",
      "choices": [
        "Amarelo e azul",
        "Vermelho e azul",
        "Preto e vermelho"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Amarelo e azul\". Misturar amarelo com azul em tinta costuma produzir verde."
    },
    "educacao-fisica": {
      "title": "Brincadeiras e movimento",
      "theory": "Brincadeiras envolvem movimentos como saltar, correr e equilibrar-se. Respeitar os colegas e os limites do corpo faz parte do jogo.",
      "example": "Na amarelinha, é possível praticar saltos e equilíbrio.",
      "question": "Qual atividade trabalha o equilíbrio?",
      "choices": [
        "Ficar sentado por horas",
        "Amarelinha",
        "Assistir televisão imóvel"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Amarelinha\". Na amarelinha, é possível praticar saltos e equilíbrio."
    },
    "ensino-religioso": {
      "title": "Respeito às diferentes tradições",
      "theory": "Pessoas e famílias têm crenças, tradições e filosofias de vida variadas. Na convivência, ninguém deve ser desrespeitado por pensar diferente.",
      "example": "Ouvir um colega contar uma celebração familiar é uma atitude de respeito.",
      "question": "Como agir diante de uma tradição diferente da sua?",
      "choices": [
        "Zombar da pessoa",
        "Proibir a conversa",
        "Ouvir com respeito"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Ouvir com respeito\". Ouvir um colega contar uma celebração familiar é uma atitude de respeito."
    }
  },
  "2": {
    "portugues": {
      "title": "Frases e pontuação",
      "theory": "Uma frase comunica uma ideia. O ponto final encerra uma afirmação; o ponto de interrogação marca uma pergunta.",
      "example": "A frase 'Onde está meu livro?' termina com ponto de interrogação.",
      "question": "Qual frase é uma pergunta?",
      "choices": [
        "Hoje está calor.",
        "A turma começou.",
        "Você trouxe o caderno?"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Você trouxe o caderno?\". A frase 'Onde está meu livro?' termina com ponto de interrogação."
    },
    "matematica": {
      "title": "Dezenas e unidades",
      "theory": "No sistema decimal, dez unidades formam uma dezena. O valor do algarismo depende da posição em que ele aparece.",
      "example": "O número 24 representa 2 dezenas e 4 unidades.",
      "question": "Quantas dezenas há em 37?",
      "choices": [
        "3",
        "7",
        "37"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"3\". O número 24 representa 2 dezenas e 4 unidades."
    },
    "ciencias": {
      "title": "O que as plantas precisam",
      "theory": "As plantas necessitam de água, luz e condições adequadas para crescer. A luz participa do processo pelo qual produzem seu alimento.",
      "example": "Uma muda colocada em local iluminado e regada adequadamente tende a crescer melhor.",
      "question": "Qual recurso é importante para a maioria das plantas produzir alimento?",
      "choices": [
        "Vidro",
        "Luz",
        "Plástico"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Luz\". Uma muda colocada em local iluminado e regada adequadamente tende a crescer melhor."
    },
    "historia": {
      "title": "Registros de outras épocas",
      "theory": "Bilhetes, fotografias, cartas e relatos ajudam a estudar como a vida mudou com o tempo. Uma fonte histórica precisa ser interpretada.",
      "example": "Uma carta antiga pode mostrar como as pessoas se comunicavam.",
      "question": "Qual é uma fonte histórica escrita?",
      "choices": [
        "Pedra sem marcas",
        "Água de torneira",
        "Carta"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Carta\". Uma carta antiga pode mostrar como as pessoas se comunicavam."
    },
    "geografia": {
      "title": "Mapas e símbolos",
      "theory": "Mapas representam lugares vistos de cima e usam símbolos para identificar elementos. A legenda explica o que os símbolos significam.",
      "example": "Um desenho de árvore na legenda pode indicar uma praça ou área verde.",
      "question": "Para que serve a legenda do mapa?",
      "choices": [
        "Explicar símbolos",
        "Aumentar o mapa",
        "Apagar ruas"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Explicar símbolos\". Um desenho de árvore na legenda pode indicar uma praça ou área verde."
    },
    "arte": {
      "title": "Texturas visuais",
      "theory": "Texturas são características de superfícies percebidas pelo tato ou pela visão. Desenhos podem representar superfícies lisas, ásperas e rugosas.",
      "example": "Linhas irregulares podem sugerir a casca de uma árvore no desenho.",
      "question": "Qual palavra descreve uma textura?",
      "choices": [
        "Três",
        "Áspera",
        "Amanhã"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Áspera\". Linhas irregulares podem sugerir a casca de uma árvore no desenho."
    },
    "educacao-fisica": {
      "title": "Jogos cooperativos",
      "theory": "Em jogos cooperativos, participantes procuram atingir um objetivo coletivo. Colaboração e comunicação são mais importantes do que excluir colegas.",
      "example": "Transportar uma bola em dupla sem deixá-la cair exige colaboração.",
      "question": "Qual atitude fortalece um jogo cooperativo?",
      "choices": [
        "Esconder as regras",
        "Excluir colegas",
        "Ajudar a equipe"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Ajudar a equipe\". Transportar uma bola em dupla sem deixá-la cair exige colaboração."
    },
    "ensino-religioso": {
      "title": "Celebrações e convivência",
      "theory": "Celebrações culturais e religiosas podem envolver música, comida e encontros. Também há famílias que não seguem religião, e todas merecem respeito.",
      "example": "Uma família pode celebrar uma data de modo diferente de outra.",
      "question": "O que devemos fazer diante dessa diferença?",
      "choices": [
        "Respeitar as escolhas",
        "Obrigar todos a celebrar igual",
        "Ridicularizar os costumes"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Respeitar as escolhas\". Uma família pode celebrar uma data de modo diferente de outra."
    }
  },
  "3": {
    "portugues": {
      "title": "Compreensão de pequenos textos",
      "theory": "Identificar personagens, lugar e acontecimentos ajuda a compreender uma narrativa. É importante buscar informações escritas no texto.",
      "example": "Na frase 'Lia guardou o livro na mochila', sabemos onde o livro foi guardado.",
      "question": "Onde Lia guardou o livro?",
      "choices": [
        "Na mochila",
        "Na janela",
        "No jardim"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Na mochila\". Na frase 'Lia guardou o livro na mochila', sabemos onde o livro foi guardado."
    },
    "matematica": {
      "title": "Multiplicação como grupos iguais",
      "theory": "Multiplicar é uma forma de representar a adição de parcelas iguais. O resultado é chamado produto.",
      "example": "4 grupos com 3 objetos cada têm 4 × 3 = 12 objetos.",
      "question": "Quanto é 4 × 3?",
      "choices": [
        "10",
        "12",
        "7"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"12\". 4 grupos com 3 objetos cada têm 4 × 3 = 12 objetos."
    },
    "ciencias": {
      "title": "Mudanças da água",
      "theory": "A água pode estar em estado sólido, líquido ou gasoso. Congelamento transforma água líquida em gelo; evaporação transforma água líquida em vapor.",
      "example": "Uma poça pode diminuir quando parte da água evapora.",
      "question": "Como se chama a passagem da água líquida para vapor?",
      "choices": [
        "Congelamento",
        "Fusão",
        "Evaporação"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Evaporação\". Uma poça pode diminuir quando parte da água evapora."
    },
    "historia": {
      "title": "Transformações da comunidade",
      "theory": "Ruas, escolas e transportes podem mudar ao longo dos anos. Fotografias e depoimentos ajudam a comparar a comunidade de antes com a de hoje.",
      "example": "Uma foto de uma rua antiga pode mostrar como eram seus veículos.",
      "question": "Qual comparação permite estudar mudanças no bairro?",
      "choices": [
        "Fotos antigas e atuais",
        "Dois cadernos iguais",
        "Duas folhas em branco"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Fotos antigas e atuais\". Uma foto de uma rua antiga pode mostrar como eram seus veículos."
    },
    "geografia": {
      "title": "Campo e cidade",
      "theory": "No campo predominam diversas atividades rurais, como agricultura; nas cidades concentram-se muitos serviços, comércios e moradias. Há relações de troca entre ambos.",
      "example": "Alimentos cultivados no campo podem ser vendidos em mercados urbanos.",
      "question": "Qual atividade é frequentemente ligada à produção rural?",
      "choices": [
        "Tráfego no metrô",
        "Cultivo de alimentos",
        "Administração de um semáforo"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Cultivo de alimentos\". Alimentos cultivados no campo podem ser vendidos em mercados urbanos."
    },
    "arte": {
      "title": "Ritmo na música",
      "theory": "Ritmo é a organização dos sons e silêncios no tempo. Podemos perceber padrões rítmicos com palmas, voz e instrumentos.",
      "example": "Bater palmas em intervalos regulares cria um padrão de ritmo.",
      "question": "O que é essencial para perceber o ritmo?",
      "choices": [
        "A cor do papel",
        "O tamanho da sala",
        "Organização no tempo"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Organização no tempo\". Bater palmas em intervalos regulares cria um padrão de ritmo."
    },
    "educacao-fisica": {
      "title": "Brincadeiras tradicionais",
      "theory": "Brincadeiras transmitidas entre gerações fazem parte da cultura. As regras podem variar conforme a comunidade.",
      "example": "Pular corda e pega-pega são brincadeiras presentes em diferentes regiões.",
      "question": "Qual é um exemplo de brincadeira tradicional?",
      "choices": [
        "Pega-pega",
        "Digitar uma senha",
        "Ler um aviso"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Pega-pega\". Pular corda e pega-pega são brincadeiras presentes em diferentes regiões."
    },
    "ensino-religioso": {
      "title": "Símbolos e seus significados",
      "theory": "Símbolos podem representar ideias e tradições. Seu significado depende do contexto e deve ser compreendido sem preconceitos.",
      "example": "Um símbolo pode ter sentidos diferentes em comunidades distintas.",
      "question": "Como conhecer o significado de um símbolo cultural?",
      "choices": [
        "Ignorando o contexto",
        "Perguntando e pesquisando",
        "Adivinhando com preconceito"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Perguntando e pesquisando\". Um símbolo pode ter sentidos diferentes em comunidades distintas."
    }
  },
  "4": {
    "portugues": {
      "title": "Diálogo e discurso direto",
      "theory": "Em textos narrativos, o discurso direto apresenta as falas das personagens. Travessões ou aspas podem indicar essas falas.",
      "example": "Em '— Vamos brincar? — perguntou Ana.', o travessão inicia uma fala.",
      "question": "Qual sinal pode marcar a fala de uma personagem?",
      "choices": [
        "Asterisco obrigatório",
        "Travessão",
        "Sinal de porcentagem"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Travessão\". Em '— Vamos brincar? — perguntou Ana.', o travessão inicia uma fala."
    },
    "matematica": {
      "title": "Frações de um todo",
      "theory": "Uma fração representa partes iguais de uma unidade. Na fração 1/2, o inteiro foi dividido em duas partes iguais e uma foi considerada.",
      "example": "Metade de 8 figurinhas corresponde a 4 figurinhas.",
      "question": "Qual é a metade de 8?",
      "choices": [
        "2",
        "8",
        "4"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"4\". Metade de 8 figurinhas corresponde a 4 figurinhas."
    },
    "ciencias": {
      "title": "Cadeias alimentares",
      "theory": "Cadeias alimentares mostram relações de alimentação. Plantas são produtores; animais podem atuar como consumidores.",
      "example": "Na sequência capim → gafanhoto → sapo, o capim é produtor.",
      "question": "Qual organismo é produtor nessa cadeia?",
      "choices": [
        "Capim",
        "Sapo",
        "Gafanhoto"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Capim\". Na sequência capim → gafanhoto → sapo, o capim é produtor."
    },
    "historia": {
      "title": "Povos indígenas e diversidade",
      "theory": "Os povos indígenas do Brasil são diversos em línguas, histórias e modos de vida. Não constituem um único povo e participam da sociedade atual.",
      "example": "Diferentes povos podem falar línguas distintas e preservar conhecimentos próprios.",
      "question": "Qual afirmação respeita a diversidade indígena?",
      "choices": [
        "Os povos indígenas só existiram no passado",
        "Existem muitos povos indígenas distintos",
        "Todos os povos têm uma única cultura"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Existem muitos povos indígenas distintos\". Diferentes povos podem falar línguas distintas e preservar conhecimentos próprios."
    },
    "geografia": {
      "title": "Orientação e pontos cardeais",
      "theory": "Os pontos cardeais são norte, sul, leste e oeste. Eles ajudam a indicar direções em mapas e trajetos.",
      "example": "Em mapas comuns com norte no topo, o leste fica à direita.",
      "question": "Qual ponto cardeal é oposto ao norte?",
      "choices": [
        "Leste",
        "Oeste",
        "Sul"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Sul\". Em mapas comuns com norte no topo, o leste fica à direita."
    },
    "arte": {
      "title": "Manifestações culturais brasileiras",
      "theory": "Artes visuais, músicas, danças e festas expressam culturas diversas. Estudar uma manifestação envolve conhecer o contexto e as pessoas que a produzem.",
      "example": "Uma dança tradicional pode reunir música, figurinos e memória comunitária.",
      "question": "Qual atitude demonstra respeito à arte de outra comunidade?",
      "choices": [
        "Conhecer seu contexto",
        "Zombar das diferenças",
        "Tratar todas as culturas como iguais"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Conhecer seu contexto\". Uma dança tradicional pode reunir música, figurinos e memória comunitária."
    },
    "educacao-fisica": {
      "title": "Regras e jogo limpo",
      "theory": "Regras tornam os jogos mais organizados e seguros. O jogo limpo envolve respeito aos participantes e decisões combinadas.",
      "example": "Devolver a bola quando há interrupção é uma atitude de respeito.",
      "question": "O que representa jogo limpo?",
      "choices": [
        "Provocar colegas",
        "Respeitar os combinados",
        "Mudar regras escondido"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Respeitar os combinados\". Devolver a bola quando há interrupção é uma atitude de respeito."
    },
    "ensino-religioso": {
      "title": "Tradições e memória",
      "theory": "Histórias, objetos e festas podem transmitir valores de uma comunidade. Esses elementos devem ser abordados com respeito à diversidade.",
      "example": "Um relato de família pode explicar a origem de uma celebração.",
      "question": "Qual atitude favorece o diálogo sobre tradições?",
      "choices": [
        "Interrupção e deboche",
        "Imposição de uma crença",
        "Escuta respeitosa"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Escuta respeitosa\". Um relato de família pode explicar a origem de uma celebração."
    }
  },
  "5": {
    "portugues": {
      "title": "Fato e opinião",
      "theory": "Fato é uma informação que pode ser verificada; opinião expressa avaliação ou preferência. Distinguir ambos ajuda a ler notícias e anúncios.",
      "example": "'A biblioteca abriu às 8h' é verificável; 'a biblioteca é maravilhosa' expressa opinião.",
      "question": "Qual frase expressa uma opinião?",
      "choices": [
        "A biblioteca abriu às 8h",
        "O prédio tem duas portas",
        "A biblioteca é maravilhosa"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"A biblioteca é maravilhosa\". 'A biblioteca abriu às 8h' é verificável; 'a biblioteca é maravilhosa' expressa opinião."
    },
    "matematica": {
      "title": "Números decimais e dinheiro",
      "theory": "A parte depois da vírgula representa frações da unidade. No dinheiro, os centavos são centésimos do real.",
      "example": "R$ 2,50 + R$ 1,25 = R$ 3,75.",
      "question": "Quanto é R$ 2,50 + R$ 1,25?",
      "choices": [
        "R$ 3,75",
        "R$ 3,25",
        "R$ 4,75"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"R$ 3,75\". R$ 2,50 + R$ 1,25 = R$ 3,75."
    },
    "ciencias": {
      "title": "Energia e segurança",
      "theory": "A eletricidade permite o funcionamento de aparelhos, mas requer cuidados. Fios danificados e tomadas não devem ser manipulados por crianças.",
      "example": "Ao perceber um fio desencapado, afaste-se e avise um adulto responsável.",
      "question": "Qual atitude é segura diante de um fio danificado?",
      "choices": [
        "Jogar água",
        "Avisar um adulto e não tocar",
        "Tocar para testar"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Avisar um adulto e não tocar\". Ao perceber um fio desencapado, afaste-se e avise um adulto responsável."
    },
    "historia": {
      "title": "Abolição e cidadania no Brasil",
      "theory": "A Lei Áurea foi assinada em 1888 e aboliu juridicamente a escravidão no Brasil. A conquista de direitos e o enfrentamento do racismo continuaram depois disso.",
      "example": "O fim legal da escravidão não eliminou imediatamente as desigualdades sociais.",
      "question": "Em que ano foi assinada a Lei Áurea?",
      "choices": [
        "1822",
        "1988",
        "1888"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"1888\". O fim legal da escravidão não eliminou imediatamente as desigualdades sociais."
    },
    "geografia": {
      "title": "Regiões brasileiras",
      "theory": "O IBGE divide o Brasil em cinco grandes regiões para fins de estudo e estatística: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.",
      "example": "O estado de São Paulo está na Região Sudeste.",
      "question": "Quantas grandes regiões oficiais tem o Brasil?",
      "choices": [
        "5",
        "4",
        "7"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"5\". O estado de São Paulo está na Região Sudeste."
    },
    "arte": {
      "title": "Narrativas com imagens",
      "theory": "Imagens também podem contar histórias. Em histórias em quadrinhos, a sequência dos quadros ajuda a indicar a passagem do tempo.",
      "example": "Três quadros podem mostrar uma personagem acordando, saindo e chegando à escola.",
      "question": "O que organiza a sequência de uma história em quadrinhos?",
      "choices": [
        "Número de páginas sempre igual",
        "Quadros em ordem",
        "Uma única cor obrigatória"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Quadros em ordem\". Três quadros podem mostrar uma personagem acordando, saindo e chegando à escola."
    },
    "educacao-fisica": {
      "title": "Cuidado com o corpo no movimento",
      "theory": "Atividades físicas devem respeitar o corpo, o ambiente e os limites de cada pessoa. Hidratação e adaptação das brincadeiras favorecem a participação.",
      "example": "Pausas e água são importantes quando a atividade é prolongada.",
      "question": "Qual atitude é recomendada durante uma atividade física?",
      "choices": [
        "Ignorar sinais de desconforto",
        "Impedir colegas de participar",
        "Respeitar os próprios limites"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Respeitar os próprios limites\". Pausas e água são importantes quando a atividade é prolongada."
    },
    "ensino-religioso": {
      "title": "Liberdade de crença",
      "theory": "No Brasil, o respeito à liberdade de crença inclui o direito de ter religião, mudar de religião ou não seguir nenhuma.",
      "example": "Colegas podem ter religiões diferentes e continuar convivendo com respeito.",
      "question": "O que significa liberdade de crença?",
      "choices": [
        "Respeitar diferentes escolhas",
        "Obrigar todos a seguir a mesma tradição",
        "Proibir quem não tem religião"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Respeitar diferentes escolhas\". Colegas podem ter religiões diferentes e continuar convivendo com respeito."
    }
  },
  "6": {
    "portugues": {
      "title": "Elementos da narrativa",
      "theory": "Uma narrativa pode apresentar narrador, personagens, espaço, tempo e enredo. O conflito impulsiona os acontecimentos.",
      "example": "Em 'Maria perdeu a chave e procurou pela casa', a perda da chave é o conflito inicial.",
      "question": "Qual elemento indica o problema que movimenta a história?",
      "choices": [
        "Conflito",
        "Título obrigatório",
        "Número de letras"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Conflito\". Em 'Maria perdeu a chave e procurou pela casa', a perda da chave é o conflito inicial."
    },
    "matematica": {
      "title": "Operações com frações",
      "theory": "Para somar frações com o mesmo denominador, somamos os numeradores e mantemos o denominador. Depois podemos simplificar.",
      "example": "2/7 + 3/7 = 5/7.",
      "question": "Quanto é 2/7 + 3/7?",
      "choices": [
        "6/7",
        "5/7",
        "5/14"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"5/7\". 2/7 + 3/7 = 5/7."
    },
    "ciencias": {
      "title": "Células e organização da vida",
      "theory": "A célula é a unidade estrutural e funcional dos seres vivos. Organismos multicelulares possuem diversas células com funções diferentes.",
      "example": "Células musculares participam dos movimentos do corpo.",
      "question": "Qual é a unidade básica de organização dos seres vivos?",
      "choices": [
        "Planeta",
        "Rocha",
        "Célula"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Célula\". Células musculares participam dos movimentos do corpo."
    },
    "historia": {
      "title": "Civilizações antigas e o Nilo",
      "theory": "No Egito Antigo, as cheias do rio Nilo contribuíam para a fertilidade das áreas agrícolas. A sociedade egípcia se organizou de diferentes formas ao longo do tempo.",
      "example": "A deposição de sedimentos após enchentes favorecia o cultivo nas margens.",
      "question": "Por que o Nilo era importante para a agricultura egípcia?",
      "choices": [
        "Favorecia solos férteis",
        "Impedia toda atividade agrícola",
        "Criava montanhas de neve"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Favorecia solos férteis\". A deposição de sedimentos após enchentes favorecia o cultivo nas margens."
    },
    "geografia": {
      "title": "Latitude e longitude",
      "theory": "Latitude é a distância angular em relação à Linha do Equador; longitude é medida em relação ao meridiano de Greenwich.",
      "example": "Um lugar a 20° sul possui latitude no Hemisfério Sul.",
      "question": "Qual linha de referência é usada para medir latitude?",
      "choices": [
        "Meridiano de Greenwich",
        "Linha do Equador",
        "Trópico de Capricórnio como origem"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Linha do Equador\". Um lugar a 20° sul possui latitude no Hemisfério Sul."
    },
    "arte": {
      "title": "Elementos da linguagem visual",
      "theory": "Ponto, linha, forma, cor e textura são elementos usados na composição de imagens. Eles orientam a atenção e ajudam a expressar ideias.",
      "example": "Linhas curvas podem sugerir movimento em uma ilustração.",
      "question": "Qual é um elemento da linguagem visual?",
      "choices": [
        "Temperatura corporal",
        "Velocidade do vento",
        "Linha"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Linha\". Linhas curvas podem sugerir movimento em uma ilustração."
    },
    "educacao-fisica": {
      "title": "Esporte e regras coletivas",
      "theory": "Esportes coletivos possuem regras e estratégias. A participação exige respeito aos colegas, adversários e árbitros.",
      "example": "Um passe no momento certo pode organizar uma jogada.",
      "question": "Qual atitude contribui para o trabalho em equipe?",
      "choices": [
        "Passar a bola quando apropriado",
        "Ignorar colegas sempre",
        "Ofender a arbitragem"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Passar a bola quando apropriado\". Um passe no momento certo pode organizar uma jogada."
    },
    "ensino-religioso": {
      "title": "Culturas e visões de mundo",
      "theory": "Religiões, tradições culturais e filosofias de vida oferecem interpretações distintas sobre experiências humanas. O estudo escolar deve ser respeitoso e não confessional.",
      "example": "Uma mesma pergunta sobre o sentido da vida pode receber diferentes respostas.",
      "question": "Como dialogar com diferentes visões de mundo?",
      "choices": [
        "Desqualificar quem pensa diferente",
        "Escutar e argumentar com respeito",
        "Impor uma única resposta religiosa"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Escutar e argumentar com respeito\". Uma mesma pergunta sobre o sentido da vida pode receber diferentes respostas."
    },
    "ingles": {
      "title": "Cumprimentos em inglês",
      "theory": "Saudações mudam conforme a situação. 'Good morning' é usada de manhã e 'Good evening' é uma saudação usada à noite.",
      "example": "Ao chegar à escola pela manhã, alguém pode dizer 'Good morning'.",
      "question": "Qual cumprimento corresponde a 'bom dia'?",
      "choices": [
        "Good night",
        "Goodbye",
        "Good morning"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Good morning\". Ao chegar à escola pela manhã, alguém pode dizer 'Good morning'."
    }
  },
  "7": {
    "portugues": {
      "title": "Conectivos e coesão",
      "theory": "Conectivos relacionam ideias e tornam o texto mais claro. 'Porque' pode introduzir uma explicação ou causa.",
      "example": "'Fiquei em casa porque estava chovendo' indica uma razão.",
      "question": "Na frase do exemplo, o que 'porque' introduz?",
      "choices": [
        "Dúvida sem relação",
        "Causa",
        "Comparação"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Causa\". 'Fiquei em casa porque estava chovendo' indica uma razão."
    },
    "matematica": {
      "title": "Porcentagem do cotidiano",
      "theory": "Porcentagem representa uma parte de cada 100. Para calcular 25% de uma quantidade, podemos encontrar um quarto dela.",
      "example": "25% de 80 é 20.",
      "question": "Quanto é 25% de 80?",
      "choices": [
        "25",
        "40",
        "20"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"20\". 25% de 80 é 20."
    },
    "ciencias": {
      "title": "Ecossistemas e equilíbrio",
      "theory": "Ecossistema reúne seres vivos e fatores não vivos que interagem. A retirada de uma espécie pode afetar outras relações ecológicas.",
      "example": "A diminuição de polinizadores pode afetar a reprodução de diversas plantas.",
      "question": "Qual elemento faz parte de um ecossistema?",
      "choices": [
        "Seres vivos e ambiente físico",
        "Apenas animais grandes",
        "Somente seres humanos"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Seres vivos e ambiente físico\". A diminuição de polinizadores pode afetar a reprodução de diversas plantas."
    },
    "historia": {
      "title": "Colonização e sociedades no Brasil",
      "theory": "A colonização portuguesa ocorreu em territórios já habitados por muitos povos indígenas. A sociedade colonial também foi marcada pela escravização de africanos e seus descendentes, resistência e diversidade.",
      "example": "Quilombos foram formas históricas de resistência à escravidão.",
      "question": "O que foram quilombos em muitos contextos históricos?",
      "choices": [
        "Navios de guerra exclusivamente",
        "Comunidades de resistência",
        "Palácios da Coroa"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Comunidades de resistência\". Quilombos foram formas históricas de resistência à escravidão."
    },
    "geografia": {
      "title": "População e urbanização",
      "theory": "Urbanização é o crescimento relativo da população que vive nas cidades e a transformação dos espaços urbanos. Seus efeitos variam conforme o planejamento.",
      "example": "Transporte, moradia e saneamento são desafios de muitas cidades.",
      "question": "O que caracteriza a urbanização?",
      "choices": [
        "Desaparecimento de todas as áreas rurais",
        "Aumento obrigatório das florestas",
        "Aumento da população urbana"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Aumento da população urbana\". Transporte, moradia e saneamento são desafios de muitas cidades."
    },
    "arte": {
      "title": "Expressão cênica",
      "theory": "Teatro utiliza corpo, voz, espaço e interação para construir cenas. A interpretação pode variar conforme personagens e contexto.",
      "example": "Uma mudança de postura pode alterar a percepção de uma personagem.",
      "question": "Qual elemento pode contribuir para uma cena teatral?",
      "choices": [
        "Expressão corporal",
        "Somente uma fotografia fixa",
        "Apenas cálculo numérico"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Expressão corporal\". Uma mudança de postura pode alterar a percepção de uma personagem."
    },
    "educacao-fisica": {
      "title": "Estratégias em jogos",
      "theory": "Em jogos coletivos, observar posições e combinar estratégias melhora a participação. A estratégia precisa respeitar as regras.",
      "example": "Criar espaços livres em quadra pode facilitar a troca de passes.",
      "question": "Qual é um exemplo de estratégia coletiva?",
      "choices": [
        "Evitar qualquer comunicação",
        "Ocupar espaços de forma coordenada",
        "Ignorar as regras"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Ocupar espaços de forma coordenada\". Criar espaços livres em quadra pode facilitar a troca de passes."
    },
    "ensino-religioso": {
      "title": "Diálogo entre diferenças",
      "theory": "Diálogo respeitoso permite conhecer perspectivas religiosas e não religiosas sem exigir concordância. A convivência depende da liberdade de consciência.",
      "example": "Duas pessoas podem discordar sobre uma crença mantendo respeito mútuo.",
      "question": "O diálogo respeitoso exige concordância total?",
      "choices": [
        "Sim, sempre",
        "Só quando as pessoas têm a mesma crença",
        "Não, exige respeito"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Não, exige respeito\". Duas pessoas podem discordar sobre uma crença mantendo respeito mútuo."
    },
    "ingles": {
      "title": "Present continuous",
      "theory": "O present continuous descreve ações em andamento, geralmente com am/is/are + verbo com -ing.",
      "example": "'She is reading' significa que ela está lendo.",
      "question": "Qual frase indica uma ação em andamento?",
      "choices": [
        "She is reading.",
        "She reads every day.",
        "She read yesterday."
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"She is reading.\". 'She is reading' significa que ela está lendo."
    }
  },
  "8": {
    "portugues": {
      "title": "Tese e argumentação",
      "theory": "Em um texto argumentativo, a tese é a posição defendida. Argumentos apresentam razões, dados ou exemplos para sustentá-la.",
      "example": "Tese: 'A leitura deve ser incentivada'; argumento: 'Ela amplia o vocabulário'.",
      "question": "O que é a tese de um texto argumentativo?",
      "choices": [
        "A referência bibliográfica obrigatória",
        "Um erro de pontuação",
        "A ideia defendida"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"A ideia defendida\". Tese: 'A leitura deve ser incentivada'; argumento: 'Ela amplia o vocabulário'."
    },
    "matematica": {
      "title": "Equações do primeiro grau",
      "theory": "Uma equação estabelece igualdade entre expressões. Para encontrar a incógnita, aplicamos operações equivalentes aos dois lados.",
      "example": "3x + 5 = 20 implica 3x = 15, portanto x = 5.",
      "question": "Qual valor de x resolve 3x + 5 = 20?",
      "choices": [
        "5",
        "15",
        "20"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"5\". 3x + 5 = 20 implica 3x = 15, portanto x = 5."
    },
    "ciencias": {
      "title": "Puberdade e respeito ao corpo",
      "theory": "A puberdade envolve mudanças físicas e hormonais que acontecem em ritmos diferentes. Informações confiáveis e respeito à privacidade são importantes.",
      "example": "Duas pessoas da mesma idade podem começar essas mudanças em momentos diferentes.",
      "question": "Qual afirmação sobre puberdade é correta?",
      "choices": [
        "A puberdade não envolve hormônios",
        "As mudanças variam entre pessoas",
        "Todas as pessoas mudam no mesmo dia"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"As mudanças variam entre pessoas\". Duas pessoas da mesma idade podem começar essas mudanças em momentos diferentes."
    },
    "historia": {
      "title": "Abolição e desigualdade",
      "theory": "A escravidão foi abolida juridicamente no Brasil em 1888, mas a sociedade continuou marcada por desigualdades e pelo racismo. A cidadania envolve direitos e sua concretização.",
      "example": "A Lei Áurea não foi acompanhada de políticas suficientes de reparação social.",
      "question": "O que ocorreu em 1888?",
      "choices": [
        "A proclamação da República",
        "A promulgação da Constituição de 1988",
        "A abolição legal da escravidão no Brasil"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"A abolição legal da escravidão no Brasil\". A Lei Áurea não foi acompanhada de políticas suficientes de reparação social."
    },
    "geografia": {
      "title": "Migrações e território",
      "theory": "Migração é o deslocamento de pessoas entre lugares. Ela pode ocorrer por oportunidades de trabalho, estudo, conflitos, questões ambientais e outros motivos.",
      "example": "Uma família que muda de região para buscar emprego realiza um movimento migratório.",
      "question": "Qual situação caracteriza migração?",
      "choices": [
        "Mudança de residência entre regiões",
        "Passeio curto no quarteirão",
        "Troca de cadeira na sala"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Mudança de residência entre regiões\". Uma família que muda de região para buscar emprego realiza um movimento migratório."
    },
    "arte": {
      "title": "Fotografia e composição",
      "theory": "Na fotografia, enquadramento, luz e ângulo influenciam como uma cena é percebida. Fotografias são recortes da realidade, não relatos neutros de tudo que aconteceu.",
      "example": "A mesma praça fotografada de ângulos diferentes pode transmitir impressões distintas.",
      "question": "Qual recurso altera a composição de uma fotografia?",
      "choices": [
        "A tabuada",
        "Enquadramento",
        "Somente o número de palavras"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Enquadramento\". A mesma praça fotografada de ângulos diferentes pode transmitir impressões distintas."
    },
    "educacao-fisica": {
      "title": "Saúde, corpo e inclusão",
      "theory": "Práticas corporais devem valorizar saúde, participação e respeito à diversidade. Comparações ofensivas de aparência não ajudam o aprendizado.",
      "example": "Adaptar uma atividade para diferentes níveis de mobilidade favorece inclusão.",
      "question": "Qual conduta favorece uma prática inclusiva?",
      "choices": [
        "Expor colegas ao ridículo",
        "Excluir quem tem dificuldade",
        "Adaptar regras para participação"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Adaptar regras para participação\". Adaptar uma atividade para diferentes níveis de mobilidade favorece inclusão."
    },
    "ensino-religioso": {
      "title": "Ética e convivência",
      "theory": "Ética envolve refletir sobre ações e suas consequências na vida em sociedade. As pessoas podem justificar valores por razões religiosas ou não religiosas.",
      "example": "Ajudar alguém em dificuldade pode ser valorizado em diferentes tradições.",
      "question": "Qual atitude está ligada à convivência ética?",
      "choices": [
        "Solidariedade",
        "Discriminação",
        "Humilhação"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Solidariedade\". Ajudar alguém em dificuldade pode ser valorizado em diferentes tradições."
    },
    "ingles": {
      "title": "Simple past com verbos regulares",
      "theory": "O simple past expressa acontecimentos concluídos no passado. Muitos verbos regulares recebem -ed na forma afirmativa.",
      "example": "'I visited my friend yesterday' significa que visitei meu amigo ontem.",
      "question": "Qual frase está no passado?",
      "choices": [
        "I am visiting my friend.",
        "I visited my friend.",
        "I visit my friend."
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"I visited my friend.\". 'I visited my friend yesterday' significa que visitei meu amigo ontem."
    }
  },
  "9": {
    "portugues": {
      "title": "Leitura crítica de anúncios",
      "theory": "Textos publicitários usam imagens, escolhas de palavras e recursos persuasivos. O leitor deve separar informação verificável de promessa ou opinião.",
      "example": "'O melhor produto do mundo' é uma afirmação valorativa que exige análise crítica.",
      "question": "Qual frase é um julgamento de valor?",
      "choices": [
        "O melhor produto do mundo",
        "O produto pesa 500 g",
        "A embalagem é azul"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"O melhor produto do mundo\". 'O melhor produto do mundo' é uma afirmação valorativa que exige análise crítica."
    },
    "matematica": {
      "title": "Equação do segundo grau",
      "theory": "Uma equação quadrática pode ter duas raízes reais, uma ou nenhuma, dependendo dos coeficientes. Fatoração ajuda em alguns casos.",
      "example": "x² - 9 = 0 implica x² = 9 e tem raízes x = 3 e x = -3.",
      "question": "Quais são as raízes reais de x² - 9 = 0?",
      "choices": [
        "0 e 9",
        "-3 e 3",
        "Apenas 9"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"-3 e 3\". x² - 9 = 0 implica x² = 9 e tem raízes x = 3 e x = -3."
    },
    "ciencias": {
      "title": "Hereditariedade e genes",
      "theory": "Genes são segmentos de DNA associados a características hereditárias. Muitas características resultam da interação entre genes e ambiente.",
      "example": "A cor dos olhos envolve processos genéticos complexos e não depende de um único fator simples em todos os casos.",
      "question": "Onde estão os genes humanos?",
      "choices": [
        "No ar ao redor do corpo",
        "Apenas no sangue",
        "Em segmentos de DNA"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Em segmentos de DNA\". A cor dos olhos envolve processos genéticos complexos e não depende de um único fator simples em todos os casos."
    },
    "historia": {
      "title": "Constituição e redemocratização",
      "theory": "A Constituição brasileira de 1988 foi promulgada no contexto da redemocratização e afirma direitos e garantias fundamentais. Seu estudo ajuda a compreender a cidadania.",
      "example": "A Constituição de 1988 ficou conhecida como Constituição Cidadã.",
      "question": "Em que ano foi promulgada a atual Constituição brasileira?",
      "choices": [
        "1988",
        "1888",
        "1822"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"1988\". A Constituição de 1988 ficou conhecida como Constituição Cidadã."
    },
    "geografia": {
      "title": "Globalização e fluxos",
      "theory": "Globalização envolve intensificação das conexões econômicas, culturais, tecnológicas e informacionais. Seus efeitos são desiguais entre lugares e populações.",
      "example": "Um produto pode ser projetado em um país, fabricado em outro e vendido em vários continentes.",
      "question": "Qual exemplo demonstra fluxos da globalização?",
      "choices": [
        "Fim de todas as diferenças culturais",
        "Cadeias produtivas internacionais",
        "Isolamento completo dos países"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Cadeias produtivas internacionais\". Um produto pode ser projetado em um país, fabricado em outro e vendido em vários continentes."
    },
    "arte": {
      "title": "Arte, mídia e crítica",
      "theory": "Imagens circulam nas redes sociais e podem informar, emocionar ou persuadir. Analisar autoria e contexto ajuda a interpretar o que é visto.",
      "example": "Um cartaz pode usar cores e símbolos para defender uma ideia.",
      "question": "Qual prática favorece a leitura crítica de imagens?",
      "choices": [
        "Aceitar tudo sem questionar",
        "Ignorar a mensagem da imagem",
        "Verificar autoria e contexto"
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"Verificar autoria e contexto\". Um cartaz pode usar cores e símbolos para defender uma ideia."
    },
    "educacao-fisica": {
      "title": "Atividade física e bem-estar",
      "theory": "Práticas corporais variadas podem favorecer bem-estar, habilidades motoras e convivência. É importante considerar acessibilidade, limites individuais e prazer no movimento.",
      "example": "Uma caminhada ou um esporte adaptado pode ser adequado a diferentes pessoas.",
      "question": "Qual atitude combina com prática corporal saudável?",
      "choices": [
        "Respeitar limites e escolher atividade adequada",
        "Forçar dor intensa",
        "Comparar corpos para humilhar"
      ],
      "correct": 0,
      "feedback": "A resposta correta é \"Respeitar limites e escolher atividade adequada\". Uma caminhada ou um esporte adaptado pode ser adequado a diferentes pessoas."
    },
    "ensino-religioso": {
      "title": "Direitos humanos e pluralismo",
      "theory": "O pluralismo reconhece a existência de diferentes crenças e filosofias. Direitos fundamentais protegem a liberdade de consciência e a convivência sem discriminação.",
      "example": "Pessoas de diferentes tradições podem participar juntas de iniciativas comunitárias.",
      "question": "Qual princípio apoia o pluralismo?",
      "choices": [
        "Obrigação de professar uma religião",
        "Respeito à liberdade de consciência",
        "Discriminação por crença"
      ],
      "correct": 1,
      "feedback": "A resposta correta é \"Respeito à liberdade de consciência\". Pessoas de diferentes tradições podem participar juntas de iniciativas comunitárias."
    },
    "ingles": {
      "title": "Comparativos em inglês",
      "theory": "Comparativos expressam diferenças. Adjetivos curtos frequentemente recebem -er; outros usam more. 'Than' introduz o termo de comparação.",
      "example": "'This book is bigger than that one' compara o tamanho de dois livros.",
      "question": "Qual frase contém um comparativo adequado?",
      "choices": [
        "This book is big than that one.",
        "This book is most big than that one.",
        "This book is bigger than that one."
      ],
      "correct": 2,
      "feedback": "A resposta correta é \"This book is bigger than that one.\". 'This book is bigger than that one' compara o tamanho de dois livros."
    }
  }
};
