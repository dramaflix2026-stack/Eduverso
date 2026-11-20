import type {Lesson} from "./course-catalog";
// Primeira etapa da ampliação curricular: dez aulas autorais por trilha.
const curriculum:Record<string,Lesson[]>={
  "Ortografia": [
    {
      "title": "Letras, fonemas e grafia",
      "explain": "A escrita do português não reproduz os sons de maneira perfeitamente regular: um mesmo fonema pode ser representado por letras diferentes. Para decidir a grafia, observe a família da palavra, o contexto e a norma ortográfica.",
      "example": "Casa e exame têm som de /z/ escrito com S e X, respectivamente.",
      "question": "Qual palavra está grafada corretamente?",
      "options": [
        "ezame",
        "exame",
        "esame"
      ],
      "correct": 1,
      "feedback": "Exame escreve-se com X; o som isolado não determina a letra."
    },
    {
      "title": "S, SS, C, Ç e Z",
      "explain": "Entre vogais, S geralmente representa /z/, enquanto SS representa /s/. O Ç representa /s/ antes de A, O e U; nunca inicia palavra. A escolha entre C, S e Z também depende da formação vocabular.",
      "example": "Passo tem SS; casa tem S entre vogais; açúcar tem Ç.",
      "question": "Qual opção está correta?",
      "options": [
        "açúcar",
        "assúcar",
        "asúcar"
      ],
      "correct": 0,
      "feedback": "A grafia normativa é açúcar, com Ç."
    },
    {
      "title": "Uso de G e J",
      "explain": "G antes de E ou I pode representar o mesmo som que J. Substantivos terminados em -agem normalmente usam G; verbos derivados de palavras com J preservam J em suas formas.",
      "example": "A viagem foi longa. Espero que vocês viajem amanhã.",
      "question": "Complete: 'Espero que eles ___ hoje'.",
      "options": [
        "viagem",
        "viajem",
        "viajen"
      ],
      "correct": 1,
      "feedback": "Viajem é forma do verbo viajar, escrita com J."
    },
    {
      "title": "X e CH",
      "explain": "X e CH podem representar o mesmo som em palavras como xícara e chuva. Não existe regra única que resolva todos os casos: famílias de palavras e consulta ao dicionário ajudam a fixar grafias.",
      "example": "Enxada escreve-se com X; chuva escreve-se com CH.",
      "question": "Qual forma está correta?",
      "options": [
        "chícara",
        "xícara",
        "sícara"
      ],
      "correct": 1,
      "feedback": "Xícara é grafada com X."
    },
    {
      "title": "H, dígrafos e letra muda",
      "explain": "O H inicial não representa fonema na maioria das palavras portuguesas; em CH, LH e NH, participa de dígrafos. O H é mantido em palavras como hoje, homem e habilidade por convenção ortográfica.",
      "example": "Homem começa com H mudo; ninho contém o dígrafo NH.",
      "question": "Qual palavra tem H inicial na grafia normativa?",
      "options": [
        "oje",
        "hoje",
        "ojeh"
      ],
      "correct": 1,
      "feedback": "Hoje se escreve com H inicial, embora ele não seja pronunciado."
    },
    {
      "title": "R, RR e posição na palavra",
      "explain": "O R pode representar sons diferentes conforme a posição e a variedade linguística. Entre vogais, RR costuma indicar o som forte; um único R entre vogais indica o som fraco em muitas variedades do português brasileiro.",
      "example": "Caro e carro diferem na escrita e na pronúncia.",
      "question": "Qual palavra nomeia um veículo?",
      "options": [
        "caro",
        "carro",
        "caró"
      ],
      "correct": 1,
      "feedback": "Carro escreve-se com RR entre vogais."
    },
    {
      "title": "Por que, porque, por quê e porquê",
      "explain": "Por que é frequente em perguntas e equivale a 'por qual motivo'; porque introduz explicação ou causa; por quê ocorre antes de pausa ou pontuação; o porquê é substantivo e costuma vir com determinante.",
      "example": "Por que você saiu? Saí porque estava tarde. Você saiu por quê? Não sei o porquê.",
      "question": "Complete: 'Não fui à aula ___ estava doente'.",
      "options": [
        "por que",
        "porque",
        "por quê"
      ],
      "correct": 1,
      "feedback": "Porque introduz a justificativa da ausência."
    },
    {
      "title": "Mal e mau; mas e mais",
      "explain": "Mal é geralmente oposto de bem; mau é oposto de bom. Mas exprime contraste; mais exprime aumento ou quantidade. Verificar o sentido da frase ajuda a escolher a forma.",
      "example": "Ele passou mal. Foi um mau resultado. Estudou, mas errou. Quero mais tempo.",
      "question": "Complete: 'Ela queria sair, ___ estava chovendo'.",
      "options": [
        "mais",
        "mas",
        "máis"
      ],
      "correct": 1,
      "feedback": "Mas estabelece oposição entre querer sair e a chuva."
    },
    {
      "title": "Revisão de texto real",
      "explain": "Revisar ortografia exige ler por unidades de sentido, identificar palavras suspeitas e verificar grafias sem alterar a mensagem. Ferramentas automáticas ajudam, mas não substituem a análise do contexto.",
      "example": "Em 'Espero que eles viagem cedo', o contexto exige viajem, pois é verbo.",
      "question": "Qual revisão corrige 'Espero que eles viagem cedo'?",
      "options": [
        "Espero que eles viajem cedo.",
        "Espero que eles viagem cedo.",
        "Espero que eles viajen cedo."
      ],
      "correct": 0,
      "feedback": "A forma verbal do presente do subjuntivo é viajem."
    },
    {
      "title": "Desafio integrado de ortografia",
      "explain": "Em uma revisão completa, examine grafias que produzem sons semelhantes, emprego dos porquês e pares de palavras homófonas. Uma alternativa correta deve respeitar simultaneamente forma e sentido.",
      "example": "A frase 'Não sei por que ele passou mal' emprega por que e mal corretamente.",
      "question": "Qual frase está inteiramente correta?",
      "options": [
        "Não sei porque ele passou mau.",
        "Não sei por que ele passou mal.",
        "Não sei por quê ele passou mau."
      ],
      "correct": 1,
      "feedback": "Por que integra a oração interrogativa indireta; mal se opõe a bem."
    }
  ],
  "Acentuação gráfica": [
    {
      "title": "Sílaba tônica",
      "explain": "A sílaba tônica é pronunciada com maior destaque. A classificação em oxítona, paroxítona e proparoxítona depende de sua posição; nem toda sílaba tônica recebe acento gráfico.",
      "example": "Café é oxítona; fácil é paroxítona; lâmpada é proparoxítona.",
      "question": "Qual palavra é proparoxítona?",
      "options": [
        "café",
        "lâmpada",
        "papel"
      ],
      "correct": 1,
      "feedback": "Lâm-pa-da tem tonicidade na antepenúltima sílaba."
    },
    {
      "title": "Oxítonas",
      "explain": "Acentuam-se oxítonas terminadas em A(S), E(S), O(S), EM e ENS, além de casos previstos em outras regras. Identifique primeiro a sílaba tônica e depois a terminação.",
      "example": "Café, cipó e também são oxítonas acentuadas.",
      "question": "Qual oxítona exige acento?",
      "options": [
        "cafe",
        "papel",
        "amor"
      ],
      "correct": 0,
      "feedback": "A grafia correta é café, oxítona terminada em E."
    },
    {
      "title": "Paroxítonas",
      "explain": "Paroxítonas são palavras cuja penúltima sílaba é tônica. Acentuam-se, por exemplo, as terminadas em L, N, R, X, PS, Ã(S), ÃO(S), UM/UNS, I(S) e US.",
      "example": "Fácil, hífen e tórax seguem regras de paroxítonas.",
      "question": "Qual forma está correta?",
      "options": [
        "facil",
        "fácil",
        "facíl"
      ],
      "correct": 1,
      "feedback": "Fácil é paroxítona terminada em L."
    },
    {
      "title": "Proparoxítonas",
      "explain": "Todas as proparoxítonas recebem acento gráfico. Para reconhecê-las, separe as sílabas e localize a tonicidade na antepenúltima sílaba.",
      "example": "Música, médico e lâmpada são proparoxítonas.",
      "question": "Qual alternativa está corretamente acentuada?",
      "options": [
        "musica",
        "música",
        "musíca"
      ],
      "correct": 1,
      "feedback": "Música é proparoxítona e recebe acento."
    },
    {
      "title": "Monossílabos tônicos",
      "explain": "Monossílabos tônicos terminados em A(S), E(S) e O(S) recebem acento. Monossílabos átonos, como artigos e preposições, seguem outra lógica.",
      "example": "Pá, pé e pó recebem acento; de e me não.",
      "question": "Qual monossílabo tônico deve receber acento?",
      "options": [
        "pe",
        "pé",
        "pêh"
      ],
      "correct": 1,
      "feedback": "Pé é monossílabo tônico terminado em E."
    },
    {
      "title": "Ditongos abertos",
      "explain": "Ditongos abertos ÉI, ÉU e ÓI são acentuados em oxítonas e monossílabos tônicos, mas não nas paroxítonas segundo o Acordo Ortográfico.",
      "example": "Herói e céu têm acento; ideia e jiboia não.",
      "question": "Qual forma está correta?",
      "options": [
        "idéia",
        "ideia",
        "idêia"
      ],
      "correct": 1,
      "feedback": "Ideia é paroxítona e não recebe acento no ditongo aberto EI."
    },
    {
      "title": "Hiatos com I e U",
      "explain": "I e U tônicos em hiato geralmente recebem acento quando ficam sozinhos na sílaba ou acompanhados de S, observadas exceções. A divisão silábica ajuda a identificar o caso.",
      "example": "Sa-ú-de e pa-ís têm acento; ra-i-nha não.",
      "question": "Qual forma está correta?",
      "options": [
        "saude",
        "saúde",
        "saudê"
      ],
      "correct": 1,
      "feedback": "O U tônico em hiato recebe acento em saúde."
    },
    {
      "title": "Acentos diferenciais",
      "explain": "Alguns acentos distinguem formas de palavras: pôde (pretérito) e pode (presente); pôr (verbo) e por (preposição). Outros diferenciais antigos foram abolidos.",
      "example": "Ontem ele pôde sair; hoje ele pode sair.",
      "question": "Complete: 'Ontem ela não ___ comparecer'.",
      "options": [
        "pode",
        "pôde",
        "póde"
      ],
      "correct": 1,
      "feedback": "Pôde indica o pretérito perfeito, diferente de pode no presente."
    },
    {
      "title": "Revisão após o Acordo Ortográfico",
      "explain": "O Acordo Ortográfico eliminou alguns acentos, como em ideia, assembleia e voo. A revisão deve diferenciar regras atuais de grafias antigas ainda vistas em materiais desatualizados.",
      "example": "Voo não tem circunflexo; assembleia não tem acento agudo.",
      "question": "Qual grafia está atualizada?",
      "options": [
        "vôo",
        "voo",
        "vóo"
      ],
      "correct": 1,
      "feedback": "Voo perdeu o acento diferencial no Acordo Ortográfico."
    },
    {
      "title": "Desafio integrado de acentuação",
      "explain": "Resolver questões de acentuação exige combinar classificação tônica, terminações, hiatos e regras atuais. Não basta memorizar uma lista: explique por que a grafia escolhida segue a regra.",
      "example": "Médico é proparoxítona; país tem hiato; herói é oxítona com ditongo aberto.",
      "question": "Qual conjunto contém apenas grafias corretas?",
      "options": [
        "médico, país, herói",
        "medico, país, heroi",
        "médico, pais, herói"
      ],
      "correct": 0,
      "feedback": "As três palavras estão corretamente acentuadas por regras diferentes."
    }
  ],
  "Fonética e fonologia": [
    {
      "title": "Fonema e letra",
      "explain": "Fonema é uma unidade sonora capaz de distinguir palavras; letra é sua representação gráfica. Uma letra pode representar sons diferentes e um fonema pode ser representado por mais de uma letra.",
      "example": "Casa e queijo mostram que o som /k/ pode ser escrito com C ou QU.",
      "question": "Qual afirmação é correta?",
      "options": [
        "Fonema e letra são sempre iguais.",
        "Uma letra pode representar sons diferentes.",
        "Toda palavra tem igual número de letras e fonemas."
      ],
      "correct": 1,
      "feedback": "A relação entre sons e letras não é sempre biunívoca."
    },
    {
      "title": "Dígrafos consonantais",
      "explain": "Dígrafo ocorre quando duas letras representam um único fonema. CH, LH, NH e, em certos contextos, RR e SS são exemplos.",
      "example": "Chave tem CH representando um único som.",
      "question": "Qual sequência é dígrafo?",
      "options": [
        "br",
        "ch",
        "tr"
      ],
      "correct": 1,
      "feedback": "CH corresponde a um fonema."
    },
    {
      "title": "Encontros consonantais",
      "explain": "Encontro consonantal reúne fonemas consonantais em sequência, como PR e BL. Diferentemente do dígrafo, os sons permanecem distintos.",
      "example": "Prato tem encontro consonantal PR; chave tem dígrafo CH.",
      "question": "Qual palavra apresenta encontro consonantal?",
      "options": [
        "prato",
        "chuva",
        "ninho"
      ],
      "correct": 0,
      "feedback": "PR contém dois fonemas consonantais."
    },
    {
      "title": "Vogais e semivogais",
      "explain": "Em uma sílaba, a vogal constitui o núcleo; semivogais acompanham a vogal em ditongos. A análise depende da pronúncia e da organização silábica.",
      "example": "Pai apresenta vogal A e semivogal I na mesma sílaba.",
      "question": "Qual palavra apresenta ditongo?",
      "options": [
        "pai",
        "saúde",
        "poeta"
      ],
      "correct": 0,
      "feedback": "Pai reúne vogal e semivogal na mesma sílaba."
    },
    {
      "title": "Ditongo crescente e decrescente",
      "explain": "No ditongo crescente, a semivogal vem antes da vogal; no decrescente, depois. A classificação depende da realização fonética adotada.",
      "example": "Em pai, o ditongo AI é decrescente.",
      "question": "Qual palavra apresenta ditongo decrescente?",
      "options": [
        "pai",
        "poeta",
        "saída"
      ],
      "correct": 0,
      "feedback": "AI em pai forma ditongo decrescente."
    },
    {
      "title": "Hiato",
      "explain": "Hiato ocorre quando duas vogais pertencem a sílabas diferentes. Não se confunde com ditongo, cujos elementos permanecem na mesma sílaba.",
      "example": "Sa-ú-de e po-e-ta contêm hiato.",
      "question": "Qual palavra tem hiato?",
      "options": [
        "céu",
        "pai",
        "poeta"
      ],
      "correct": 2,
      "feedback": "Po-e-ta separa as vogais O e E em sílabas diferentes."
    },
    {
      "title": "Tritongo",
      "explain": "Tritongo é a sequência de semivogal, vogal e semivogal na mesma sílaba. A análise deve considerar a pronúncia efetiva.",
      "example": "Paraguai apresenta tritongo na sílaba guai em análises escolares.",
      "question": "Qual palavra é exemplo escolar de tritongo?",
      "options": [
        "Paraguai",
        "poeta",
        "saúde"
      ],
      "correct": 0,
      "feedback": "A sequência UAI em Paraguai forma tritongo."
    },
    {
      "title": "Divisão silábica",
      "explain": "A divisão silábica considera a pronúncia e convenções ortográficas. Dígrafos como CH e NH não se separam; RR e SS separam-se na translineação.",
      "example": "Ca-rro separa RR; ni-nho mantém NH na mesma sílaba.",
      "question": "Qual divisão está correta?",
      "options": [
        "car-ro",
        "ca-rro",
        "c-arr-o"
      ],
      "correct": 1,
      "feedback": "Em carro, as letras RR ficam em sílabas diferentes: car-ro."
    },
    {
      "title": "Tonicidade e classificação",
      "explain": "Palavras podem ser oxítonas, paroxítonas ou proparoxítonas conforme a posição da sílaba tônica. Tonicidade é fenômeno de pronúncia, independentemente de acento escrito.",
      "example": "Ca-fé é oxítona; ja-ne-la é paroxítona.",
      "question": "Qual palavra é oxítona?",
      "options": [
        "janela",
        "café",
        "médico"
      ],
      "correct": 1,
      "feedback": "Café tem a última sílaba tônica."
    },
    {
      "title": "Desafio integrado de fonologia",
      "explain": "Diferenciar letras, fonemas, dígrafos, encontros consonantais e vocálicos evita erros de análise. Em questões contextualizadas, compare a pronúncia com a representação escrita.",
      "example": "Chave contém dígrafo; prato contém encontro consonantal; poeta contém hiato.",
      "question": "Qual associação está correta?",
      "options": [
        "chave — encontro consonantal",
        "prato — dígrafo",
        "poeta — hiato"
      ],
      "correct": 2,
      "feedback": "Po-e-ta contém duas vogais em sílabas diferentes."
    }
  ]
,
"Formação de palavras": [
  {
    "title": "Radical, prefixo e sufixo",
    "explain": "O radical concentra o núcleo de sentido de uma família de palavras. Prefixos vêm antes dele; sufixos vêm depois e podem alterar classe gramatical e significado.",
    "example": "Em infelizmente: in- é prefixo, feliz é radical e -mente é sufixo.",
    "question": "Qual elemento aparece antes do radical?",
    "options": [
      "Sufixo",
      "Prefixo",
      "Desinência verbal sempre"
    ],
    "correct": 1,
    "feedback": "Prefixos são acrescentados antes do radical."
  },
  {
    "title": "Derivação prefixal",
    "explain": "A derivação prefixal acrescenta um prefixo a uma base existente. Frequentemente altera o sentido, mas nem sempre muda a classe gramatical.",
    "example": "Desfazer deriva de fazer com o prefixo des-, que indica reversão.",
    "question": "Qual palavra exemplifica derivação prefixal?",
    "options": [
      "desleal",
      "guarda-chuva",
      "planalto"
    ],
    "correct": 0,
    "feedback": "Desleal é formado com o prefixo des-."
  },
  {
    "title": "Derivação sufixal",
    "explain": "A derivação sufixal acrescenta um sufixo ao radical. Pode criar substantivos a partir de adjetivos, adjetivos a partir de substantivos ou outras classes.",
    "example": "Beleza deriva de belo com o sufixo -eza.",
    "question": "Qual palavra é formada por derivação sufixal?",
    "options": [
      "felizmente",
      "refazer",
      "passatempo"
    ],
    "correct": 0,
    "feedback": "Felizmente deriva de feliz com o sufixo -mente."
  },
  {
    "title": "Derivação parassintética",
    "explain": "Na parassíntese, prefixo e sufixo são acrescentados simultaneamente à base, sem que as formas intermediárias sejam usuais com o mesmo sentido. Não confunda com mera presença de ambos.",
    "example": "Anoitecer forma-se a partir de noite com a- e -ecer.",
    "question": "Qual palavra é exemplo de parassíntese?",
    "options": [
      "anoitecer",
      "infelizmente",
      "reler"
    ],
    "correct": 0,
    "feedback": "Anoitecer exige a combinação simultânea dos afixos."
  },
  {
    "title": "Derivação regressiva",
    "explain": "Na derivação regressiva, uma palavra se forma pela redução de outra, muitas vezes criando substantivos de ação a partir de verbos.",
    "example": "Compra relaciona-se ao verbo comprar e designa a ação ou resultado.",
    "question": "Qual par ilustra derivação regressiva na análise escolar?",
    "options": [
      "comprar → compra",
      "feliz → infeliz",
      "guarda + chuva"
    ],
    "correct": 0,
    "feedback": "Compra é substantivo associado à redução de comprar."
  },
  {
    "title": "Derivação imprópria",
    "explain": "A derivação imprópria ocorre quando uma palavra passa a exercer outra classe gramatical sem mudança na forma. O contexto sintático determina a nova função.",
    "example": "Em 'O jantar estava ótimo', jantar funciona como substantivo.",
    "question": "Em qual frase 'jantar' é substantivo?",
    "options": [
      "Vamos jantar cedo.",
      "O jantar esfriou.",
      "Eles querem jantar."
    ],
    "correct": 1,
    "feedback": "O artigo 'o' acompanha jantar usado como substantivo."
  },
  {
    "title": "Composição por justaposição",
    "explain": "Na justaposição, dois ou mais elementos se combinam mantendo sua estrutura sonora reconhecível. A grafia com ou sem hífen depende das regras ortográficas.",
    "example": "Guarda-chuva combina guarda e chuva sem perda sonora significativa.",
    "question": "Qual é exemplo de justaposição?",
    "options": [
      "guarda-chuva",
      "infeliz",
      "anoitecer"
    ],
    "correct": 0,
    "feedback": "Guarda-chuva combina duas bases preservadas."
  },
  {
    "title": "Composição por aglutinação",
    "explain": "Na aglutinação, os elementos formadores sofrem alteração ou perda fonética na união. É diferente da justaposição, que preserva mais claramente as bases.",
    "example": "Planalto resulta de plano + alto, com alteração na junção.",
    "question": "Qual palavra resulta de aglutinação?",
    "options": [
      "planalto",
      "passatempo",
      "refazer"
    ],
    "correct": 0,
    "feedback": "Planalto vem de plano + alto, com redução fonética."
  },
  {
    "title": "Siglas, acrônimos e abreviações",
    "explain": "Siglas reúnem letras iniciais de expressões; acrônimos podem ser pronunciados como palavras. Abreviações reduzem a escrita de um vocábulo e obedecem a convenções.",
    "example": "ONU é sigla de Organização das Nações Unidas; pág. abrevia página.",
    "question": "Qual alternativa é abreviação de uma palavra?",
    "options": [
      "pág.",
      "ONU",
      "IBGE"
    ],
    "correct": 0,
    "feedback": "Pág. é abreviação convencional de página."
  },
  {
    "title": "Revisão de processos de formação",
    "explain": "Para classificar uma formação, identifique a base, observe acréscimos e verifique se há junção de radicais ou mudança de classe sem alteração formal.",
    "example": "Desleal: prefixação; beleza: sufixação; planalto: aglutinação.",
    "question": "Qual associação está correta?",
    "options": [
      "desleal — sufixação",
      "planalto — aglutinação",
      "beleza — justaposição"
    ],
    "correct": 1,
    "feedback": "Planalto resulta da união com alteração de plano + alto."
  }
],
"Substantivos e artigos": [
  {
    "title": "O substantivo na oração",
    "explain": "Substantivos nomeiam entidades concretas e abstratas e podem funcionar como núcleo do sujeito, do objeto e de outros termos. Sua função depende da oração.",
    "example": "Em 'A coragem inspira', coragem é substantivo abstrato e núcleo do sujeito.",
    "question": "Qual palavra é substantivo?",
    "options": [
      "coragem",
      "corajoso",
      "corajosamente"
    ],
    "correct": 0,
    "feedback": "Coragem nomeia uma qualidade ou estado."
  },
  {
    "title": "Comuns e próprios",
    "explain": "Substantivos comuns nomeiam classes de seres; próprios individualizam pessoas, lugares e outras entidades, normalmente com inicial maiúscula.",
    "example": "Cidade é comum; Salvador é próprio.",
    "question": "Qual é substantivo próprio?",
    "options": [
      "rio",
      "Salvador",
      "escola"
    ],
    "correct": 1,
    "feedback": "Salvador individualiza uma cidade."
  },
  {
    "title": "Concretos e abstratos",
    "explain": "Substantivos concretos designam seres com existência concebida como independente, reais ou imaginários; abstratos nomeiam ações, qualidades, estados e sentimentos.",
    "example": "Fada é concreto na classificação gramatical; beleza é abstrato.",
    "question": "Qual substantivo é abstrato?",
    "options": [
      "beleza",
      "fada",
      "cadeira"
    ],
    "correct": 0,
    "feedback": "Beleza nomeia uma qualidade."
  },
  {
    "title": "Simples, compostos, primitivos e derivados",
    "explain": "Simples têm um radical; compostos, mais de um. Primitivos não derivam de outra palavra portuguesa; derivados são formados a partir de outra base.",
    "example": "Pedra é primitivo; pedreiro é derivado; guarda-chuva é composto.",
    "question": "Qual substantivo é composto?",
    "options": [
      "guarda-chuva",
      "pedreiro",
      "pedra"
    ],
    "correct": 0,
    "feedback": "Guarda-chuva reúne duas bases."
  },
  {
    "title": "Coletivos",
    "explain": "Substantivos coletivos nomeiam conjuntos de seres da mesma espécie ou categoria, mesmo no singular. A concordância verbal normalmente acompanha o núcleo singular.",
    "example": "Cardume designa um conjunto de peixes.",
    "question": "Qual substantivo coletivo designa peixes?",
    "options": [
      "cardume",
      "alcateia",
      "enxame"
    ],
    "correct": 0,
    "feedback": "Cardume é coletivo de peixes."
  },
  {
    "title": "Gênero dos substantivos",
    "explain": "O gênero gramatical pode ser masculino ou feminino e não equivale necessariamente a sexo biológico. Há substantivos comuns de dois gêneros, sobrecomuns e epicenos.",
    "example": "O estudante e a estudante: a mudança do artigo indica o gênero.",
    "question": "Qual par usa substantivo comum de dois gêneros?",
    "options": [
      "o estudante / a estudante",
      "o homem / a mulher",
      "o boi / a vaca"
    ],
    "correct": 0,
    "feedback": "Estudante mantém a forma e varia o artigo."
  },
  {
    "title": "Número e plural",
    "explain": "O plural de substantivos segue padrões e exceções conforme terminações e formação. Em palavras compostas, a flexão depende das classes dos elementos.",
    "example": "Cidadão → cidadãos; papel → papéis.",
    "question": "Qual é o plural correto de papel?",
    "options": [
      "papels",
      "papéis",
      "papeis"
    ],
    "correct": 1,
    "feedback": "Papel faz plural em -éis."
  },
  {
    "title": "Grau e efeitos de sentido",
    "explain": "Aumentativos e diminutivos podem indicar tamanho, afeto, ironia ou avaliação. Nem sempre o sufixo descreve dimensão literal.",
    "example": "Casinha pode indicar casa pequena ou afeto, dependendo do contexto.",
    "question": "Qual interpretação é adequada para 'casinha'?",
    "options": [
      "Sempre ironia",
      "Pode expressar afeto",
      "Nunca indica tamanho"
    ],
    "correct": 1,
    "feedback": "O diminutivo pode ter valor afetivo ou dimensional."
  },
  {
    "title": "Artigos definidos e indefinidos",
    "explain": "Artigos definidos apresentam referentes identificáveis no contexto; indefinidos introduzem referentes não especificados. Essa escolha interfere na progressão informacional.",
    "example": "Vi um cachorro. O cachorro entrou no jardim.",
    "question": "Qual artigo introduz um referente não identificado?",
    "options": [
      "o",
      "uma",
      "as"
    ],
    "correct": 1,
    "feedback": "Uma é artigo indefinido."
  },
  {
    "title": "Revisão contextualizada",
    "explain": "Identifique o núcleo substantivo, sua classificação e a função dos artigos no texto. Evite classificar palavras isoladamente quando o contexto altera sua função.",
    "example": "Em 'Uma professora chegou. A professora falou', os artigos organizam a referência.",
    "question": "Por que o segundo artigo é definido?",
    "options": [
      "Retoma professora já mencionada",
      "Indica quantidade exata",
      "Transforma verbo em adjetivo"
    ],
    "correct": 0,
    "feedback": "A professora retoma um referente apresentado antes."
  }
],
"Adjetivos e advérbios": [
  {
    "title": "Adjetivos e caracterização",
    "explain": "Adjetivos caracterizam substantivos, atribuindo qualidades, estados ou relações. Podem ocorrer junto ao nome ou como predicativo.",
    "example": "Em 'A sala silenciosa', silenciosa caracteriza sala.",
    "question": "Qual termo é adjetivo?",
    "options": [
      "silenciosa",
      "sala",
      "ontem"
    ],
    "correct": 0,
    "feedback": "Silenciosa caracteriza o substantivo sala."
  },
  {
    "title": "Adjetivos pátrios e relacionais",
    "explain": "Adjetivos pátrios indicam origem; relacionais vinculam substantivos a domínios ou áreas. Sua interpretação depende do substantivo que acompanham.",
    "example": "Cultura brasileira: brasileira indica origem ou relação com o Brasil.",
    "question": "Qual é adjetivo pátrio?",
    "options": [
      "brasileiro",
      "intensamente",
      "cidade"
    ],
    "correct": 0,
    "feedback": "Brasileiro indica relação com o Brasil."
  },
  {
    "title": "Locuções adjetivas",
    "explain": "Locução adjetiva é uma expressão com valor de adjetivo, frequentemente preposição mais substantivo. Nem toda locução possui equivalente em uma única palavra.",
    "example": "Amor de mãe pode ser descrito como amor materno em certos contextos.",
    "question": "Qual expressão é locução adjetiva?",
    "options": [
      "de inverno",
      "muito cedo",
      "correu rapidamente"
    ],
    "correct": 0,
    "feedback": "De inverno caracteriza um substantivo, como roupa de inverno."
  },
  {
    "title": "Concordância do adjetivo",
    "explain": "Adjetivos geralmente concordam em gênero e número com o substantivo. Em estruturas com múltiplos núcleos, há regras específicas de concordância.",
    "example": "As meninas estudiosas chegaram.",
    "question": "Qual expressão está correta?",
    "options": [
      "meninas estudioso",
      "meninas estudiosas",
      "menina estudiosas"
    ],
    "correct": 1,
    "feedback": "Adjetivo e substantivo estão no feminino plural."
  },
  {
    "title": "Grau comparativo",
    "explain": "O comparativo estabelece relações de superioridade, igualdade ou inferioridade. Pode usar mais... que, tão... quanto e menos... que.",
    "example": "Ana é tão dedicada quanto Bruno.",
    "question": "Qual frase expressa igualdade?",
    "options": [
      "Ana é mais alta que Bia.",
      "Ana é tão alta quanto Bia.",
      "Ana é menos alta que Bia."
    ],
    "correct": 1,
    "feedback": "Tão... quanto indica comparação de igualdade."
  },
  {
    "title": "Grau superlativo",
    "explain": "O superlativo intensifica uma qualidade de forma absoluta ou em relação a um grupo. O superlativo absoluto analítico usa intensificadores; o sintético usa sufixos.",
    "example": "Muito bonito é analítico; belíssimo é sintético.",
    "question": "Qual é superlativo absoluto sintético?",
    "options": [
      "belíssimo",
      "mais belo que",
      "tão belo quanto"
    ],
    "correct": 0,
    "feedback": "Belíssimo apresenta o sufixo -íssimo."
  },
  {
    "title": "Advérbios de tempo e lugar",
    "explain": "Advérbios modificam verbos, adjetivos ou outros advérbios, indicando circunstâncias. Ontem e amanhã indicam tempo; aqui e longe indicam lugar.",
    "example": "Ela chegou ontem e esperou aqui.",
    "question": "Qual advérbio indica lugar?",
    "options": [
      "aqui",
      "ontem",
      "lentamente"
    ],
    "correct": 0,
    "feedback": "Aqui indica localização."
  },
  {
    "title": "Advérbios de modo e intensidade",
    "explain": "Advérbios de modo indicam como algo acontece; de intensidade, o grau de uma característica ou ação. Muitos advérbios de modo terminam em -mente.",
    "example": "Ela respondeu calmamente; estava muito feliz.",
    "question": "Qual palavra indica intensidade?",
    "options": [
      "muito",
      "calmamente",
      "amanhã"
    ],
    "correct": 0,
    "feedback": "Muito intensifica o adjetivo feliz."
  },
  {
    "title": "Locuções adverbiais",
    "explain": "Locuções adverbiais são grupos de palavras com função adverbial. Podem expressar tempo, modo, lugar e outras circunstâncias.",
    "example": "À noite estudamos; com cuidado abrimos a caixa.",
    "question": "Qual expressão indica tempo?",
    "options": [
      "à noite",
      "com cuidado",
      "de madeira"
    ],
    "correct": 0,
    "feedback": "À noite é locução adverbial temporal."
  },
  {
    "title": "Revisão: adjetivo ou advérbio?",
    "explain": "Adjetivo caracteriza substantivo e varia frequentemente em gênero e número; advérbio modifica verbos, adjetivos ou outros advérbios e tende a ser invariável.",
    "example": "Em 'A aluna rápida corre rapidamente', rápida é adjetivo e rapidamente é advérbio.",
    "question": "Qual análise está correta?",
    "options": [
      "rápida é advérbio",
      "rapidamente é advérbio",
      "aluna é adjetivo"
    ],
    "correct": 1,
    "feedback": "Rapidamente modifica o verbo corre."
  }
]
,
"Pronomes": [
  {
    "title": "Pessoas do discurso",
    "explain": "Pronomes pessoais indicam participantes do discurso: primeira pessoa fala, segunda é interlocutora e terceira é referente. No português brasileiro, você usa concordância de terceira pessoa.",
    "example": "Eu escrevo; tu escreves; você escreve; nós escrevemos.",
    "question": "Qual pronome representa a primeira pessoa do plural?",
    "options": [
      "eles",
      "nós",
      "vocês"
    ],
    "correct": 1,
    "feedback": "Nós inclui quem fala."
  },
  {
    "title": "Pronomes retos e oblíquos",
    "explain": "Pronomes retos geralmente funcionam como sujeito; oblíquos atuam em outras funções, como complemento verbal. A escolha depende da construção sintática.",
    "example": "Eu vi o filme; ela me chamou.",
    "question": "Em 'Ela me chamou', me é:",
    "options": [
      "pronome oblíquo",
      "artigo",
      "adjetivo"
    ],
    "correct": 0,
    "feedback": "Me funciona como complemento do verbo chamou."
  },
  {
    "title": "Pronomes de tratamento",
    "explain": "Pronomes de tratamento dirigem-se ao interlocutor e normalmente exigem verbo na terceira pessoa. O grau de formalidade varia conforme a situação comunicativa.",
    "example": "Você chegou cedo? Vossa Excelência deseja falar?",
    "question": "Qual forma verbal concorda com 'você'?",
    "options": [
      "chegaste",
      "chegou",
      "cheguei"
    ],
    "correct": 1,
    "feedback": "Você exige concordância de terceira pessoa."
  },
  {
    "title": "Pronomes possessivos",
    "explain": "Possessivos expressam relações de posse ou vínculo e concordam em gênero e número com o elemento possuído, não necessariamente com o possuidor.",
    "example": "Meu livro, minhas anotações, nossos cadernos.",
    "question": "Qual expressão apresenta concordância adequada?",
    "options": [
      "minhas livro",
      "meus livros",
      "meu livros"
    ],
    "correct": 1,
    "feedback": "Meus concorda com livros, masculino plural."
  },
  {
    "title": "Pronomes demonstrativos",
    "explain": "Demonstrativos situam referentes no espaço, no tempo e no texto. Este, esse e aquele podem sinalizar diferentes relações de proximidade e retomada.",
    "example": "Este caderno aqui; aquele prédio ao longe.",
    "question": "Qual demonstrativo indica, em geral, maior distância?",
    "options": [
      "este",
      "aquele",
      "isto"
    ],
    "correct": 1,
    "feedback": "Aquele costuma indicar maior distância do falante e do interlocutor."
  },
  {
    "title": "Pronomes indefinidos",
    "explain": "Indefinidos referem-se a pessoas ou quantidades de modo impreciso. Alguns variam em gênero e número; outros são invariáveis.",
    "example": "Alguém ligou; muitos estudantes participaram.",
    "question": "Qual palavra é pronome indefinido?",
    "options": [
      "alguém",
      "ela",
      "este"
    ],
    "correct": 0,
    "feedback": "Alguém indica pessoa não identificada."
  },
  {
    "title": "Pronomes interrogativos",
    "explain": "Pronomes interrogativos introduzem perguntas diretas ou indiretas. Quem, qual, quanto e que podem assumir essa função conforme o contexto.",
    "example": "Quem chegou? Não sei qual escolher.",
    "question": "Qual pronome introduz a pergunta '___ chegou?'",
    "options": [
      "Quem",
      "Meu",
      "Aquele"
    ],
    "correct": 0,
    "feedback": "Quem é pronome interrogativo nessa frase."
  },
  {
    "title": "Pronomes relativos",
    "explain": "Relativos retomam um antecedente e iniciam oração subordinada adjetiva. Que, quem, cujo, o qual e onde têm usos específicos; cujo exprime posse e não aceita artigo depois.",
    "example": "O livro que li era ótimo; a autora cujos livros conheço.",
    "question": "Em 'A escola onde estudo', onde retoma:",
    "options": [
      "estudo",
      "escola",
      "a"
    ],
    "correct": 1,
    "feedback": "Onde retoma um lugar: escola."
  },
  {
    "title": "Ambiguidade pronominal",
    "explain": "Pronomes podem gerar ambiguidade quando há mais de um antecedente possível. A revisão deve esclarecer a referência sem comprometer a coesão.",
    "example": "João falou com Pedro quando ele saiu: 'ele' pode referir-se a ambos.",
    "question": "Qual revisão elimina a ambiguidade sobre quem saiu?",
    "options": [
      "João falou com Pedro quando ele saiu.",
      "Quando Pedro saiu, João falou com ele.",
      "Ele saiu quando João falou com Pedro."
    ],
    "correct": 1,
    "feedback": "A oração inicial identifica Pedro como quem saiu."
  },
  {
    "title": "Revisão integrada de pronomes",
    "explain": "Para classificar um pronome, analise sua função e seu referente na frase. Distinga posse, demonstração, indefinição e retomada relativa.",
    "example": "Em 'A menina cujo pai chegou', cujo indica relação de posse.",
    "question": "Qual análise está correta?",
    "options": [
      "cujo é pronome relativo de posse",
      "cujo é artigo definido",
      "cujo é pronome pessoal reto"
    ],
    "correct": 0,
    "feedback": "Cujo é relativo e estabelece relação possessiva entre antecedentes."
  }
],
"Verbos": [
  {
    "title": "Verbo e flexão",
    "explain": "Verbos exprimem processos, estados e acontecimentos e flexionam-se em pessoa, número, tempo e modo. A identificação do núcleo verbal ajuda a interpretar a oração.",
    "example": "Nós estudamos diariamente; ontem estudamos também.",
    "question": "Em 'Eles caminham', o verbo está em qual pessoa?",
    "options": [
      "primeira do singular",
      "terceira do plural",
      "segunda do singular"
    ],
    "correct": 1,
    "feedback": "Eles exige terceira pessoa do plural."
  },
  {
    "title": "Presente do indicativo",
    "explain": "O presente do indicativo pode indicar ação atual, habitual, verdade geral ou futuro próximo, conforme o contexto. A forma não determina sozinha o valor temporal.",
    "example": "A água ferve a 100 °C sob pressão atmosférica padrão; amanhã viajo.",
    "question": "Qual frase apresenta hábito no presente?",
    "options": [
      "Todos os dias leio.",
      "Ontem li.",
      "Lerei amanhã."
    ],
    "correct": 0,
    "feedback": "Todos os dias indica ação habitual."
  },
  {
    "title": "Pretérito perfeito e imperfeito",
    "explain": "O pretérito perfeito apresenta um evento concluído; o imperfeito frequentemente descreve hábitos, estados ou processos em andamento no passado.",
    "example": "Ontem li o livro; quando criança, lia à noite.",
    "question": "Qual forma indica hábito no passado?",
    "options": [
      "li ontem",
      "lia sempre",
      "lerei amanhã"
    ],
    "correct": 1,
    "feedback": "Lia, no contexto, expressa repetição no passado."
  },
  {
    "title": "Pretérito mais-que-perfeito",
    "explain": "O mais-que-perfeito indica evento anterior a outro evento passado. Na fala, a forma composta com tinha ou havia mais particípio é frequente.",
    "example": "Quando cheguei, ela já tinha saído.",
    "question": "Qual evento ocorreu primeiro?",
    "options": [
      "a chegada",
      "a saída dela",
      "ambos simultaneamente"
    ],
    "correct": 1,
    "feedback": "Tinha saído indica anterioridade à chegada."
  },
  {
    "title": "Futuro do presente e do pretérito",
    "explain": "O futuro do presente projeta ação posterior; o futuro do pretérito pode expressar hipótese, polidez ou consequência condicionada.",
    "example": "Amanhã estudarei; eu estudaria se tivesse tempo.",
    "question": "Qual forma expressa hipótese condicionada?",
    "options": [
      "estudaria",
      "estudei",
      "estudo"
    ],
    "correct": 0,
    "feedback": "Estudaria é futuro do pretérito em contexto hipotético."
  },
  {
    "title": "Indicativo, subjuntivo e imperativo",
    "explain": "O indicativo apresenta fatos e certezas relativas; o subjuntivo aparece frequentemente em hipóteses, desejos e possibilidades; o imperativo expressa pedidos ou ordens.",
    "example": "Se eu pudesse, viajaria; estude para a prova.",
    "question": "Qual oração emprega subjuntivo?",
    "options": [
      "Talvez ele venha.",
      "Ele vem sempre.",
      "Ele veio ontem."
    ],
    "correct": 0,
    "feedback": "Venha está no presente do subjuntivo."
  },
  {
    "title": "Infinitivo, gerúndio e particípio",
    "explain": "Formas nominais não apresentam a mesma flexão temporal das formas finitas. Infinitivo nomeia o processo; gerúndio indica desenvolvimento; particípio aparece em tempos compostos e outras construções.",
    "example": "Estudar, estudando e estudado são formas nominais.",
    "question": "Qual palavra está no gerúndio?",
    "options": [
      "estudar",
      "estudando",
      "estudado"
    ],
    "correct": 1,
    "feedback": "Estudando termina em -ndo e é gerúndio."
  },
  {
    "title": "Locuções e tempos compostos",
    "explain": "Locuções verbais combinam verbo auxiliar e principal. Em tempos compostos, ter ou haver mais particípio expressa relações temporais; outras locuções marcam aspecto ou modalidade.",
    "example": "Tenho estudado; vou viajar; estava lendo.",
    "question": "Em 'Estava lendo', qual é o auxiliar?",
    "options": [
      "lendo",
      "estava",
      "nenhum"
    ],
    "correct": 1,
    "feedback": "Estava é auxiliar da locução verbal."
  },
  {
    "title": "Voz ativa e passiva",
    "explain": "Na ativa, o sujeito costuma ser agente; na passiva analítica, o sujeito recebe a ação e o agente pode ser expresso por complemento. Nem todo verbo permite passivização.",
    "example": "A equipe concluiu o relatório → O relatório foi concluído pela equipe.",
    "question": "Qual frase está na voz passiva?",
    "options": [
      "A equipe analisou os dados.",
      "Os dados foram analisados.",
      "A equipe trabalha."
    ],
    "correct": 1,
    "feedback": "Foram analisados é construção passiva."
  },
  {
    "title": "Revisão de valores verbais",
    "explain": "A interpretação verbal exige observar tempo, modo, aspecto e contexto. Uma mesma forma pode indicar hábito, hipótese ou ação projetada, dependendo do enunciado.",
    "example": "Se estudasse, compreenderia melhor: hipótese e consequência.",
    "question": "Qual forma completa 'Se eu ___ tempo, viajaria'?",
    "options": [
      "tenho",
      "tivesse",
      "terei"
    ],
    "correct": 1,
    "feedback": "Tivesse é pretérito imperfeito do subjuntivo exigido na hipótese."
  }
],
"Preposições e conjunções": [
  {
    "title": "Preposição e relação entre termos",
    "explain": "Preposições ligam palavras ou expressões, estabelecendo relações de origem, destino, posse, meio ou assunto. Sua interpretação depende da construção.",
    "example": "Saí de casa; fui para a escola; viajei de ônibus.",
    "question": "Qual palavra é preposição?",
    "options": [
      "para",
      "mas",
      "ontem"
    ],
    "correct": 0,
    "feedback": "Para relaciona o verbo ir ao destino."
  },
  {
    "title": "Preposições essenciais e acidentais",
    "explain": "Essenciais funcionam tipicamente como preposições, como de, em e com. Acidentais pertencem a outras classes em certos usos, mas podem assumir função prepositiva.",
    "example": "Segundo o professor, a atividade será amanhã.",
    "question": "Em 'Segundo o professor', segundo funciona como:",
    "options": [
      "preposição",
      "numeral ordinal",
      "verbo"
    ],
    "correct": 0,
    "feedback": "Segundo introduz uma referência de fonte ou conformidade."
  },
  {
    "title": "Contrações e combinações",
    "explain": "Preposições podem combinar-se ou contrair-se com artigos e pronomes. Em + o forma no; de + a forma da; a + a pode resultar em à quando há crase.",
    "example": "Voltei da escola; moro no centro.",
    "question": "Qual expressão resulta de 'em + o'?",
    "options": [
      "no",
      "do",
      "ao"
    ],
    "correct": 0,
    "feedback": "Em + o forma no."
  },
  {
    "title": "Regência e sentido",
    "explain": "A preposição exigida por um verbo ou nome é parte da regência. Alterar a preposição pode modificar o sentido ou contrariar a norma-padrão.",
    "example": "Quem gosta, gosta de algo; quem confia, confia em alguém.",
    "question": "Complete: 'Ela confia ___ seus colegas'.",
    "options": [
      "em",
      "de",
      "com"
    ],
    "correct": 0,
    "feedback": "Confiar, nesse sentido, rege a preposição em."
  },
  {
    "title": "Conjunções coordenativas aditivas",
    "explain": "Conjunções coordenativas ligam elementos de mesma função sintática. E, nem e construções correlativas podem expressar adição.",
    "example": "Ela leu e resumiu o texto.",
    "question": "Qual conjunção indica adição?",
    "options": [
      "e",
      "mas",
      "portanto"
    ],
    "correct": 0,
    "feedback": "E acrescenta uma ação à outra."
  },
  {
    "title": "Conjunções adversativas e alternativas",
    "explain": "Adversativas exprimem contraste, como mas e porém. Alternativas apresentam escolhas ou alternância, como ou... ou.",
    "example": "Queria sair, mas chovia; ou estudo, ou descanso.",
    "question": "Qual conjunção expressa oposição?",
    "options": [
      "mas",
      "ou",
      "e"
    ],
    "correct": 0,
    "feedback": "Mas introduz contraste."
  },
  {
    "title": "Conjunções conclusivas e explicativas",
    "explain": "Conclusivas introduzem consequência lógica ou conclusão; explicativas justificam uma afirmação ou ordem. Portanto e pois podem ter valores diferentes conforme a posição e o contexto.",
    "example": "Estudou; portanto, avançou. Leve casaco, pois está frio.",
    "question": "Em 'Estudou; portanto, aprendeu', portanto indica:",
    "options": [
      "conclusão",
      "oposição",
      "alternância"
    ],
    "correct": 0,
    "feedback": "Portanto introduz conclusão."
  },
  {
    "title": "Conjunções subordinativas causais e condicionais",
    "explain": "Conjunções subordinativas ligam uma oração dependente à principal. Porque pode indicar causa; se pode estabelecer condição.",
    "example": "Ficamos em casa porque choveu; se chover, ficaremos.",
    "question": "Qual conjunção indica condição?",
    "options": [
      "se",
      "porque",
      "embora"
    ],
    "correct": 0,
    "feedback": "Se introduz uma condição."
  },
  {
    "title": "Concessivas, finais e temporais",
    "explain": "Embora introduz concessão; para que indica finalidade; quando marca referência temporal. Identificar a relação semântica ajuda a interpretar períodos complexos.",
    "example": "Embora cansada, estudou; estudou para que passasse.",
    "question": "Em 'Embora chovesse, saímos', há ideia de:",
    "options": [
      "concessão",
      "finalidade",
      "adição"
    ],
    "correct": 0,
    "feedback": "Embora marca concessão, ou seja, um obstáculo que não impediu a ação."
  },
  {
    "title": "Revisão das relações lógicas",
    "explain": "Na interpretação de textos, conjunções articulam argumentos e relações entre ideias. Trocar conectivos pode mudar o sentido e comprometer a coerência.",
    "example": "Não saiu porque estava doente; saiu embora estivesse doente.",
    "question": "Qual conectivo mantém a ideia de contraste?",
    "options": [
      "porém",
      "porque",
      "portanto"
    ],
    "correct": 0,
    "feedback": "Porém é adversativo e mantém o contraste."
  }
]
};
export function getExpandedPortugueseLessons(topic:string):Lesson[]|undefined{return curriculum[topic]}
