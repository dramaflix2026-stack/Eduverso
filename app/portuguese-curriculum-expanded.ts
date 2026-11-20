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
,
"Sintaxe da oração": [
  {
    "title": "Frase, oração e período",
    "explain": "Frase é enunciado com sentido comunicativo; oração organiza-se em torno de verbo ou locução verbal; período é uma unidade de enunciado formada por uma ou mais orações.",
    "example": "'Que alegria!' é frase sem verbo; 'Ela chegou' é oração e período simples.",
    "question": "Qual enunciado contém oração?",
    "options": [
      "Silêncio!",
      "A turma chegou.",
      "Que surpresa!"
    ],
    "correct": 1,
    "feedback": "Chegou é verbo e constitui o núcleo da oração."
  },
  {
    "title": "Sujeito simples e composto",
    "explain": "O sujeito é o termo sobre o qual se faz uma declaração. É simples quando tem um núcleo e composto quando apresenta mais de um núcleo.",
    "example": "'Maria e Pedro chegaram': sujeito composto com núcleos Maria e Pedro.",
    "question": "Qual oração tem sujeito composto?",
    "options": [
      "Os alunos chegaram.",
      "Ana e Bia estudaram.",
      "Choveu ontem."
    ],
    "correct": 1,
    "feedback": "Ana e Bia são dois núcleos do sujeito."
  },
  {
    "title": "Sujeito oculto e indeterminado",
    "explain": "Sujeito oculto é recuperável pela flexão verbal ou contexto. Indeterminado não permite identificar o agente; pode ocorrer com verbo na terceira pessoa do plural sem referente definido.",
    "example": "'Chegamos cedo' tem sujeito oculto nós; 'Roubaram meu celular' pode ter sujeito indeterminado.",
    "question": "Em 'Estudamos ontem', o sujeito é:",
    "options": [
      "oculto: nós",
      "composto",
      "inexistente"
    ],
    "correct": 0,
    "feedback": "A desinência verbal permite recuperar nós."
  },
  {
    "title": "Oração sem sujeito",
    "explain": "Verbos impessoais podem formar orações sem sujeito, como haver com sentido de existir e fazer indicando tempo decorrido. Esses verbos permanecem no singular nesse uso.",
    "example": "'Há muitas pessoas aqui' e 'Faz dois anos' são orações sem sujeito.",
    "question": "Qual oração não tem sujeito?",
    "options": [
      "Os alunos chegaram.",
      "Há vagas disponíveis.",
      "Maria saiu."
    ],
    "correct": 1,
    "feedback": "Haver com sentido de existir é impessoal."
  },
  {
    "title": "Predicado verbal e nominal",
    "explain": "Predicado verbal tem verbo significativo como núcleo; predicado nominal tem nome predicativo como núcleo e verbo de ligação. O sentido do verbo na frase orienta a análise.",
    "example": "'O atleta correu' é verbal; 'O atleta está cansado' é nominal.",
    "question": "Qual frase tem predicado nominal?",
    "options": [
      "A criança dormiu.",
      "A criança parece feliz.",
      "A criança correu."
    ],
    "correct": 1,
    "feedback": "Feliz é predicativo do sujeito com verbo de ligação."
  },
  {
    "title": "Predicado verbo-nominal",
    "explain": "O predicado verbo-nominal apresenta um núcleo verbal e um predicativo, que atribui característica ao sujeito ou ao objeto.",
    "example": "'Os alunos chegaram cansados': chegaram é verbo significativo e cansados caracteriza os alunos.",
    "question": "Qual oração tem predicado verbo-nominal?",
    "options": [
      "Os alunos chegaram cansados.",
      "Os alunos dormiram.",
      "Os alunos estavam cansados."
    ],
    "correct": 0,
    "feedback": "Há verbo significativo e predicativo do sujeito."
  },
  {
    "title": "Transitividade verbal",
    "explain": "Verbos podem ser intransitivos, transitivos diretos, indiretos ou bitransitivos, conforme os complementos exigidos no contexto. A classificação pode variar conforme o sentido.",
    "example": "'Ela comprou livros' tem objeto direto; 'Ela gosta de livros' tem objeto indireto.",
    "question": "Em 'Ela precisa de ajuda', o verbo é:",
    "options": [
      "transitivo indireto",
      "intransitivo",
      "de ligação"
    ],
    "correct": 0,
    "feedback": "Precisar de exige complemento preposicionado."
  },
  {
    "title": "Complementos verbais",
    "explain": "Objeto direto completa verbo transitivo sem preposição obrigatória; objeto indireto exige preposição regida pelo verbo. É preciso distinguir preposição exigida de adjuntos circunstanciais.",
    "example": "'Entreguei o livro ao colega': o livro é objeto direto; ao colega é indireto.",
    "question": "Em 'Ele comprou flores', flores é:",
    "options": [
      "objeto direto",
      "sujeito",
      "vocativo"
    ],
    "correct": 0,
    "feedback": "Flores completa o verbo comprar sem preposição exigida."
  },
  {
    "title": "Adjunto adnominal e adverbial",
    "explain": "Adjunto adnominal determina ou caracteriza substantivos; adjunto adverbial acrescenta circunstâncias ao verbo, adjetivo ou advérbio.",
    "example": "'Os dois alunos atentos estudaram ontem': dois e atentos caracterizam alunos; ontem indica tempo.",
    "question": "Qual termo é adjunto adverbial em 'Ela estudou ontem'?",
    "options": [
      "Ela",
      "estudou",
      "ontem"
    ],
    "correct": 2,
    "feedback": "Ontem expressa circunstância de tempo."
  },
  {
    "title": "Revisão sintática integrada",
    "explain": "Para analisar uma oração, localize verbos, delimite o sujeito, identifique o predicado e examine complementos e modificadores. Evite confundir função sintática com classe de palavra.",
    "example": "'A professora explicou a matéria ontem': sujeito A professora, objeto direto a matéria, adjunto adverbial ontem.",
    "question": "Em 'O professor explicou a lição', 'a lição' é:",
    "options": [
      "objeto direto",
      "sujeito",
      "predicativo"
    ],
    "correct": 0,
    "feedback": "A lição completa diretamente o verbo explicou."
  }
],
"Período composto": [
  {
    "title": "Período simples e composto",
    "explain": "Período simples possui uma oração; período composto reúne duas ou mais orações. Locuções verbais podem constituir um único núcleo verbal, portanto não devem ser contadas como orações separadas.",
    "example": "'Vou estudar' contém uma locução verbal; 'Estudei e aprendi' contém duas orações.",
    "question": "Qual período é composto?",
    "options": [
      "Vou estudar.",
      "Ela correu e sorriu.",
      "A turma estava lendo."
    ],
    "correct": 1,
    "feedback": "Correu e sorriu são núcleos de duas orações."
  },
  {
    "title": "Coordenação assindética",
    "explain": "Orações coordenadas assindéticas não são introduzidas por conjunção coordenativa. Sua relação de sentido pode ser indicada por pontuação e contexto.",
    "example": "'Cheguei, sentei, esperei' contém três coordenadas assindéticas.",
    "question": "Qual período contém coordenação assindética?",
    "options": [
      "Cheguei, sentei, esperei.",
      "Cheguei porque chovia.",
      "Espero que venha."
    ],
    "correct": 0,
    "feedback": "As orações estão justapostas sem conjunção."
  },
  {
    "title": "Coordenação aditiva e adversativa",
    "explain": "Orações coordenadas sindéticas aditivas somam informações; adversativas expressam contraste. A conjunção ajuda a identificar a relação semântica.",
    "example": "'Leu e anotou' é aditiva; 'Leu, mas não entendeu' é adversativa.",
    "question": "Em 'Tentou, porém falhou', a segunda oração é:",
    "options": [
      "adversativa",
      "aditiva",
      "explicativa"
    ],
    "correct": 0,
    "feedback": "Porém introduz oposição."
  },
  {
    "title": "Coordenação alternativa e conclusiva",
    "explain": "Alternativas apresentam escolhas ou alternância; conclusivas exprimem resultado lógico ou inferência. Conectivos como ou e portanto orientam a classificação.",
    "example": "'Ou estudamos, ou descansamos'; 'Estudou, portanto passou'.",
    "question": "Qual conectivo introduz conclusão?",
    "options": [
      "ou",
      "portanto",
      "mas"
    ],
    "correct": 1,
    "feedback": "Portanto sinaliza conclusão."
  },
  {
    "title": "Coordenação explicativa",
    "explain": "Orações coordenadas explicativas justificam afirmações, ordens ou pedidos. É importante distingui-las de subordinadas causais pelo contexto e pela relação sintática.",
    "example": "'Leve casaco, pois está frio' apresenta justificativa para a recomendação.",
    "question": "Em 'Não saia, porque está chovendo', a oração introduzida justifica:",
    "options": [
      "a recomendação",
      "uma comparação",
      "uma alternativa"
    ],
    "correct": 0,
    "feedback": "A segunda oração explica o pedido de não sair."
  },
  {
    "title": "Subordinadas substantivas",
    "explain": "Orações subordinadas substantivas exercem funções típicas de substantivos, como sujeito, objeto direto e complemento nominal. Frequentemente começam com que ou se.",
    "example": "'Espero que você venha': a oração que você venha funciona como objeto direto de espero.",
    "question": "Em 'Desejo que todos participem', a subordinada é:",
    "options": [
      "substantiva objetiva direta",
      "adjetiva restritiva",
      "adverbial temporal"
    ],
    "correct": 0,
    "feedback": "A oração completa o verbo desejar sem preposição."
  },
  {
    "title": "Subordinadas adjetivas restritivas",
    "explain": "Orações adjetivas restritivas delimitam o referente de um substantivo e normalmente não são isoladas por vírgulas.",
    "example": "'Os alunos que estudaram passaram': a oração restringe quais alunos passaram.",
    "question": "Em 'Livros que inspiram são valiosos', a oração 'que inspiram' é:",
    "options": [
      "adjetiva restritiva",
      "adverbial causal",
      "substantiva subjetiva"
    ],
    "correct": 0,
    "feedback": "Que inspiram caracteriza e delimita livros."
  },
  {
    "title": "Subordinadas adjetivas explicativas",
    "explain": "Orações adjetivas explicativas acrescentam comentário sobre um referente já identificado e costumam aparecer entre vírgulas.",
    "example": "'Meu irmão, que mora longe, chegou': a oração acrescenta informação sobre meu irmão.",
    "question": "Qual frase tem adjetiva explicativa?",
    "options": [
      "Os alunos que estudaram passaram.",
      "Ana, que é médica, chegou.",
      "Quem estuda aprende."
    ],
    "correct": 1,
    "feedback": "A oração entre vírgulas acrescenta informação explicativa."
  },
  {
    "title": "Subordinadas adverbiais",
    "explain": "Orações subordinadas adverbiais indicam relações de causa, condição, concessão, tempo, finalidade e outras. O conectivo e o sentido do período orientam a análise.",
    "example": "'Se chover, ficaremos em casa' indica condição; 'Embora chovesse, saímos' indica concessão.",
    "question": "Em 'Quando chegou, telefonou', a subordinada indica:",
    "options": [
      "tempo",
      "causa",
      "finalidade"
    ],
    "correct": 0,
    "feedback": "Quando introduz circunstância temporal."
  },
  {
    "title": "Revisão de relações entre orações",
    "explain": "Classifique períodos contando orações, verificando dependência sintática e identificando conectivos. Pontuação e relação de sentido podem alterar a interpretação.",
    "example": "'Estudou, mas errou' tem coordenação adversativa; 'Estudou porque queria aprender' tem subordinada causal.",
    "question": "Qual período contém subordinada condicional?",
    "options": [
      "Se puder, irei.",
      "Irei e voltarei.",
      "Queria ir, mas fiquei."
    ],
    "correct": 0,
    "feedback": "Se puder expressa condição para a ação principal."
  }
],
"Concordância verbal": [
  {
    "title": "Sujeito simples",
    "explain": "A regra geral exige concordância do verbo com o núcleo do sujeito em pessoa e número. Termos intercalados não mudam o núcleo que determina a flexão.",
    "example": "'A lista de exercícios chegou': o núcleo é lista, no singular.",
    "question": "Qual frase está correta?",
    "options": [
      "A lista de exercícios chegaram.",
      "A lista de exercícios chegou.",
      "A lista de exercícios chegarem."
    ],
    "correct": 1,
    "feedback": "Chegou concorda com lista, núcleo singular."
  },
  {
    "title": "Sujeito composto anteposto",
    "explain": "Com sujeito composto antes do verbo, a concordância normalmente vai para o plural. Se houver pessoas gramaticais diferentes, aplicam-se regras de prioridade de pessoa.",
    "example": "'Maria e João estudaram' tem verbo no plural.",
    "question": "Qual frase está correta?",
    "options": [
      "Maria e João estudou.",
      "Maria e João estudaram.",
      "Maria e João estuda."
    ],
    "correct": 1,
    "feedback": "Dois núcleos antepostos exigem plural na regra geral."
  },
  {
    "title": "Sujeito composto posposto",
    "explain": "Quando o sujeito composto vem após o verbo, a norma admite frequentemente concordância no plural ou com o núcleo mais próximo, conforme a construção.",
    "example": "'Chegaram Maria e João' e 'Chegou Maria e João' são construções possíveis.",
    "question": "Qual alternativa apresenta concordância plural regular?",
    "options": [
      "Chegaram Ana e Pedro.",
      "Chegou as meninas.",
      "Chegaram a menina."
    ],
    "correct": 0,
    "feedback": "Chegaram concorda com os dois núcleos do sujeito composto."
  },
  {
    "title": "Verbo haver impessoal",
    "explain": "Haver com sentido de existir ou acontecer é impessoal e permanece na terceira pessoa do singular, inclusive em locuções verbais. O verbo existir, por sua vez, concorda com o sujeito.",
    "example": "'Havia problemas' e 'Existiam problemas' são construções corretas.",
    "question": "Qual frase segue a norma-padrão?",
    "options": [
      "Haviam problemas.",
      "Havia problemas.",
      "Houveram problemas."
    ],
    "correct": 1,
    "feedback": "Haver impessoal fica no singular."
  },
  {
    "title": "Verbo fazer temporal",
    "explain": "Fazer indicando tempo decorrido ou fenômeno meteorológico é impessoal e fica no singular, inclusive com auxiliar.",
    "example": "'Faz três meses' e 'Deve fazer três meses'.",
    "question": "Qual frase está correta?",
    "options": [
      "Fazem três anos.",
      "Faz três anos.",
      "Devem fazer três anos."
    ],
    "correct": 1,
    "feedback": "Fazer indicando tempo decorrido é impessoal."
  },
  {
    "title": "Verbo ser em expressões de tempo",
    "explain": "O verbo ser apresenta particularidades em expressões de hora, data e distância; na indicação de horas, concorda em geral com o numeral.",
    "example": "'É uma hora' e 'São duas horas'.",
    "question": "Qual frase indica corretamente o horário?",
    "options": [
      "É duas horas.",
      "São duas horas.",
      "São uma hora."
    ],
    "correct": 1,
    "feedback": "São concorda com duas horas."
  },
  {
    "title": "Pronomes relativos que e quem",
    "explain": "Com o relativo que, o verbo normalmente concorda com o antecedente; com quem, é comum a terceira pessoa do singular, embora existam outras construções admitidas.",
    "example": "'Fui eu que fiz'; 'Fui eu quem fez'.",
    "question": "Qual forma está correta?",
    "options": [
      "Fui eu que fez.",
      "Fui eu que fiz.",
      "Fui eu que fizeram."
    ],
    "correct": 1,
    "feedback": "Que retoma eu e o verbo concorda com a primeira pessoa."
  },
  {
    "title": "Expressões partitivas",
    "explain": "Expressões como a maioria de e grande parte de seguidas de plural podem admitir concordância com o núcleo singular ou com o termo plural, dependendo da construção e do foco.",
    "example": "'A maioria dos alunos chegou' e 'A maioria dos alunos chegaram' são possibilidades registradas.",
    "question": "Qual opção está correta?",
    "options": [
      "A maioria dos alunos chegou.",
      "A maioria dos alunos chegaste.",
      "A maioria dos alunos chegamos."
    ],
    "correct": 0,
    "feedback": "O singular concorda com o núcleo maioria."
  },
  {
    "title": "Índice de indeterminação e partícula apassivadora",
    "explain": "Com se indeterminador do sujeito, o verbo fica na terceira pessoa do singular; com se apassivador, o verbo concorda com o sujeito paciente.",
    "example": "'Precisa-se de funcionários' e 'Vendem-se casas'.",
    "question": "Qual frase está correta?",
    "options": [
      "Vende-se casas.",
      "Vendem-se casas.",
      "Precisam-se de funcionários."
    ],
    "correct": 1,
    "feedback": "Casas é sujeito paciente plural em construção passiva sintética."
  },
  {
    "title": "Revisão de concordância",
    "explain": "Para resolver casos de concordância, identifique o sujeito, o núcleo e possíveis verbos impessoais. Verifique se o se indetermina o sujeito ou forma voz passiva.",
    "example": "'Há vagas' usa haver impessoal; 'Existem vagas' concorda com vagas.",
    "question": "Qual alternativa está integralmente correta?",
    "options": [
      "Haviam vagas e fazem anos.",
      "Há vagas e faz dois anos.",
      "Existem vaga e fazem anos."
    ],
    "correct": 1,
    "feedback": "Haver e fazer temporal são impessoais e ficam no singular."
  }
]
,
"Concordância nominal": [
  {
    "title": "Regra geral",
    "explain": "Artigos, adjetivos, numerais e pronomes adjetivos concordam em gênero e número com o substantivo a que se referem.",
    "example": "As duas alunas dedicadas participaram.",
    "question": "Qual expressão segue a regra?",
    "options": [
      "as meninas estudiosa",
      "as meninas estudiosas",
      "a meninas estudiosas"
    ],
    "correct": 1,
    "feedback": "Todos os determinantes e o adjetivo concordam com meninas."
  },
  {
    "title": "Adjetivo após dois substantivos",
    "explain": "Um adjetivo posposto a dois substantivos pode ir ao plural ou concordar com o mais próximo, conforme a construção. O contexto deve evitar ambiguidade.",
    "example": "Comprei camisa e casaco novos.",
    "question": "Qual opção concorda com os dois núcleos?",
    "options": [
      "camisa e casaco novos",
      "camisa e casaco nova",
      "camisa e casaco novoas"
    ],
    "correct": 0,
    "feedback": "Novos está no masculino plural, abrangendo os dois substantivos."
  },
  {
    "title": "Adjetivo anteposto",
    "explain": "Quando o adjetivo precede substantivos de gêneros distintos, em geral concorda com o mais próximo; há particularidades para nomes próprios e parentesco.",
    "example": "Ela demonstrou grande coragem e esforço.",
    "question": "Qual expressão é adequada?",
    "options": [
      "belas livros e revistas",
      "belos livros e revistas",
      "belo livros e revistas"
    ],
    "correct": 1,
    "feedback": "Belos concorda com o substantivo mais próximo, livros."
  },
  {
    "title": "Predicativo do sujeito",
    "explain": "O predicativo atribui característica ao sujeito e concorda com ele, inclusive quando o verbo de ligação separa os termos.",
    "example": "As janelas estavam abertas.",
    "question": "Qual frase está correta?",
    "options": [
      "As janelas estavam aberto.",
      "As janelas estavam abertas.",
      "As janelas estava abertas."
    ],
    "correct": 1,
    "feedback": "Abertas concorda com janelas, feminino plural."
  },
  {
    "title": "É proibido, é necessário",
    "explain": "Expressões como é proibido e é necessário costumam permanecer invariáveis quando o substantivo aparece sem determinante; com artigo, ocorre concordância.",
    "example": "É proibido entrada; é proibida a entrada.",
    "question": "Qual frase está correta?",
    "options": [
      "É proibida a entrada.",
      "É proibido a entrada.",
      "É proibidas a entrada."
    ],
    "correct": 0,
    "feedback": "Com o artigo a, proibida concorda com entrada."
  },
  {
    "title": "Anexo, incluso e obrigado",
    "explain": "Anexo, incluso e obrigado são adjetivos e variam conforme o termo a que se referem. A locução em anexo é invariável.",
    "example": "Seguem anexas as planilhas. A aluna disse: obrigada.",
    "question": "Qual opção está correta?",
    "options": [
      "Seguem anexo as fotos.",
      "Seguem anexas as fotos.",
      "Seguem anexos as fotos."
    ],
    "correct": 1,
    "feedback": "Anexas concorda com fotos, feminino plural."
  },
  {
    "title": "Meio e meia",
    "explain": "Meio é invariável como advérbio com sentido de um pouco; como numeral fracionário, concorda com o substantivo.",
    "example": "Ela está meio cansada; tomou meia xícara.",
    "question": "Qual frase usa meio como advérbio corretamente?",
    "options": [
      "Ela está meia cansada.",
      "Ela está meio cansada.",
      "Ela está meios cansada."
    ],
    "correct": 1,
    "feedback": "Meio, no sentido de um pouco, não varia."
  },
  {
    "title": "Bastante e bastantes",
    "explain": "Bastante é invariável quando advérbio de intensidade; pode variar quando determina substantivo com sentido de muitos.",
    "example": "Estudaram bastante; havia bastantes razões.",
    "question": "Em qual frase bastante é advérbio?",
    "options": [
      "Havia bastantes alunos.",
      "Estudaram bastante.",
      "Bastantes pessoas vieram."
    ],
    "correct": 1,
    "feedback": "Modifica o verbo estudaram, portanto é invariável."
  },
  {
    "title": "Menos, alerta e só",
    "explain": "Menos é invariável. Alerta pode funcionar como advérbio invariável ou adjetivo variável em certos usos; só varia quando equivale a sozinho e não quando significa apenas.",
    "example": "Há menos dúvidas; elas ficaram sós; só elas responderam.",
    "question": "Qual frase está correta?",
    "options": [
      "menas dúvidas",
      "menos dúvidas",
      "menos dúvidaes"
    ],
    "correct": 1,
    "feedback": "Menos não apresenta flexão de gênero."
  },
  {
    "title": "Revisão de concordância nominal",
    "explain": "Identifique o substantivo núcleo, a função do modificador e os casos de invariabilidade. Em frases complexas, avalie se o adjetivo caracteriza um ou vários nomes.",
    "example": "As estudantes estavam meio preocupadas e enviaram as respostas anexas.",
    "question": "Qual frase está inteiramente correta?",
    "options": [
      "As alunas ficaram meia cansadas.",
      "As alunas ficaram meio cansadas.",
      "As alunas ficaram meios cansadas."
    ],
    "correct": 1,
    "feedback": "Meio é advérbio invariável e cansadas concorda com alunas."
  }
],
"Regência verbal e nominal": [
  {
    "title": "O que é regência",
    "explain": "Regência descreve como verbos e nomes se relacionam com complementos, inclusive a exigência de preposições. A escolha pode variar conforme o sentido.",
    "example": "Gostar de música; confiança em alguém.",
    "question": "Qual complemento atende à regência de gostar?",
    "options": [
      "gostar música",
      "gostar de música",
      "gostar para música"
    ],
    "correct": 1,
    "feedback": "Gostar exige a preposição de nesse uso."
  },
  {
    "title": "Assistir: ver e prestar assistência",
    "explain": "Na norma-padrão, assistir no sentido de ver costuma reger a; no sentido de prestar assistência, pode ser transitivo direto.",
    "example": "Assistimos ao filme; o médico assistiu o paciente.",
    "question": "Qual frase segue a regência formal no sentido de ver?",
    "options": [
      "Assisti ao espetáculo.",
      "Assisti o espetáculo.",
      "Assisti no espetáculo."
    ],
    "correct": 0,
    "feedback": "Assistir a é a regência formal para ver ou presenciar."
  },
  {
    "title": "Aspirar: respirar e desejar",
    "explain": "Aspirar no sentido de inalar é transitivo direto; no sentido de desejar ou almejar, exige a preposição a na norma-padrão.",
    "example": "Aspirou o perfume; aspira ao cargo.",
    "question": "Qual frase indica desejo com regência formal?",
    "options": [
      "Aspira o cargo.",
      "Aspira ao cargo.",
      "Aspira pelo cargo."
    ],
    "correct": 1,
    "feedback": "Aspirar a indica almejar."
  },
  {
    "title": "Preferir e comparação",
    "explain": "Na norma-padrão, preferir é transitivo direto e indireto, com a preposição a; evita-se combinar preferir com mais... do que na mesma construção.",
    "example": "Prefiro chá a café.",
    "question": "Qual frase segue a regência formal?",
    "options": [
      "Prefiro chá do que café.",
      "Prefiro mais chá a café.",
      "Prefiro chá a café."
    ],
    "correct": 2,
    "feedback": "Preferir estabelece a comparação com a preposição a."
  },
  {
    "title": "Obedecer e desobedecer",
    "explain": "Obedecer e desobedecer normalmente exigem a preposição a na norma-padrão, mesmo quando o complemento designa uma regra ou pessoa.",
    "example": "Obedeceu às instruções.",
    "question": "Qual frase apresenta regência adequada?",
    "options": [
      "Obedeceu as regras.",
      "Obedeceu às regras.",
      "Obedeceu das regras."
    ],
    "correct": 1,
    "feedback": "Obedecer a + as regras resulta em às regras."
  },
  {
    "title": "Chegar e ir",
    "explain": "Na norma-padrão formal, chegar e ir com destino geralmente pedem a; em indica localização ou outras relações e é comum em usos coloquiais de destino.",
    "example": "Cheguei à escola; fui ao centro.",
    "question": "Qual frase segue a regência formal de destino?",
    "options": [
      "Cheguei à escola.",
      "Cheguei na escola.",
      "Cheguei de escola."
    ],
    "correct": 0,
    "feedback": "Chegar a indica destino na norma-padrão formal."
  },
  {
    "title": "Lembrar e esquecer",
    "explain": "Lembrar e esquecer podem ser transitivos diretos sem pronome; com uso pronominal, costumam exigir de. A construção deve manter coerência.",
    "example": "Lembrei o compromisso; lembrei-me do compromisso.",
    "question": "Qual frase está correta?",
    "options": [
      "Lembrei-me do compromisso.",
      "Lembrei-me o compromisso.",
      "Esqueci-me a chave."
    ],
    "correct": 0,
    "feedback": "Lembrar-se rege de."
  },
  {
    "title": "Regência de nomes",
    "explain": "Substantivos, adjetivos e advérbios podem exigir preposições específicas: necessidade de, favorável a, compatível com, próximo de.",
    "example": "A proposta é favorável à mudança.",
    "question": "Qual complemento é adequado para favorável?",
    "options": [
      "favorável com a proposta",
      "favorável à proposta",
      "favorável de proposta"
    ],
    "correct": 1,
    "feedback": "Favorável rege a preposição a, que se contrai com o artigo a."
  },
  {
    "title": "Regência e crase",
    "explain": "Quando um termo rege a e o complemento feminino admite artigo a, ocorre crase. Identificar a regência é necessário antes de aplicar o acento grave.",
    "example": "Obedeceu à diretora; referiu-se à pesquisa.",
    "question": "Qual forma está correta?",
    "options": [
      "Referiu-se a pesquisa.",
      "Referiu-se à pesquisa.",
      "Referiu-se há pesquisa."
    ],
    "correct": 1,
    "feedback": "Referir-se a + a pesquisa resulta em à pesquisa."
  },
  {
    "title": "Revisão de regência",
    "explain": "Para resolver questões, identifique o sentido do verbo ou nome, a preposição exigida e o determinante do complemento. Considere o registro solicitado pelo enunciado.",
    "example": "Prefiro leitura a televisão; assisti ao filme; confio em você.",
    "question": "Qual frase está correta na norma-padrão?",
    "options": [
      "Aspiro ao cargo.",
      "Prefiro mais estudar do que trabalhar.",
      "Obedeço as normas."
    ],
    "correct": 0,
    "feedback": "Aspirar a, no sentido de desejar, exige a preposição a."
  }
],
"Crase": [
  {
    "title": "Conceito de crase",
    "explain": "Crase é a fusão de duas vogais a, geralmente preposição a e artigo feminino a(s), indicada pelo acento grave. O acento não é sinônimo de artigo feminino.",
    "example": "Vou à escola = vou a + a escola.",
    "question": "Qual forma está correta?",
    "options": [
      "Vou à escola.",
      "Vou á escola.",
      "Vou há escola."
    ],
    "correct": 0,
    "feedback": "O verbo ir pede a e escola admite artigo a."
  },
  {
    "title": "Teste do masculino",
    "explain": "Substituir um nome feminino por masculino pode revelar a fusão: se surgir ao, costuma haver à no feminino, preservada a mesma estrutura.",
    "example": "Vou à praia → vou ao parque.",
    "question": "Qual frase admite crase pelo teste do masculino?",
    "options": [
      "Vou à biblioteca.",
      "Vi à biblioteca.",
      "Comprei à revista."
    ],
    "correct": 0,
    "feedback": "Vou ao museu confirma a preposição a antes do artigo."
  },
  {
    "title": "Crase antes de nomes femininos",
    "explain": "A crase ocorre antes de substantivos femininos com artigo quando o termo anterior exige a preposição a. Sem preposição exigida, não ocorre fusão.",
    "example": "Entreguei o documento à secretária.",
    "question": "Qual frase está correta?",
    "options": [
      "Entreguei à carta.",
      "Entreguei a carta à diretora.",
      "Comprei à mochila."
    ],
    "correct": 1,
    "feedback": "Entregar algo a alguém: à diretora é complemento indireto."
  },
  {
    "title": "Locuções femininas",
    "explain": "Muitas locuções adverbiais, prepositivas e conjuntivas femininas recebem acento grave por convenção, como à noite, às vezes, à medida que e à procura de.",
    "example": "À noite, estudamos; à medida que lia, compreendia.",
    "question": "Qual locução está corretamente grafada?",
    "options": [
      "a noite, saímos",
      "à noite, saímos",
      "há noite, saímos"
    ],
    "correct": 1,
    "feedback": "À noite é locução adverbial feminina."
  },
  {
    "title": "Antes de verbo",
    "explain": "Não se usa crase antes de verbo no infinitivo, porque não há artigo feminino para se fundir à preposição.",
    "example": "Começou a estudar; voltou a trabalhar.",
    "question": "Qual frase está correta?",
    "options": [
      "Começou à estudar.",
      "Começou a estudar.",
      "Começou há estudar."
    ],
    "correct": 1,
    "feedback": "Antes do infinitivo estudar não ocorre crase."
  },
  {
    "title": "Antes de palavra masculina",
    "explain": "Em regra, não ocorre crase antes de palavra masculina, salvo casos específicos como locuções com feminino subentendido.",
    "example": "Foi a pé; escreveu a lápis.",
    "question": "Qual frase está correta?",
    "options": [
      "Foi à pé.",
      "Foi a pé.",
      "Foi há pé."
    ],
    "correct": 1,
    "feedback": "Pé é masculino e a locução não recebe crase."
  },
  {
    "title": "Antes de pronomes",
    "explain": "Em regra, não há crase antes de pronomes pessoais e de muitos indefinidos, pois não admitem artigo. Há exceções com demonstrativos aquele(s), aquela(s), aquilo e certos tratamentos.",
    "example": "Entreguei a ela; referi-me àquela situação.",
    "question": "Qual frase está correta?",
    "options": [
      "Entreguei à ela.",
      "Entreguei a ela.",
      "Entreguei há ela."
    ],
    "correct": 1,
    "feedback": "Ela é pronome pessoal e não admite artigo feminino."
  },
  {
    "title": "Àquele, àquela e àquilo",
    "explain": "Quando a regência exige a, ocorre crase com demonstrativos aquele, aquela e aquilo: a + aquele = àquele. O gênero masculino do demonstrativo não impede a fusão.",
    "example": "Referi-me àquele episódio; obedeci àquela regra.",
    "question": "Qual frase está correta?",
    "options": [
      "Referi-me àquele livro.",
      "Referi-me aquele livro.",
      "Referi-me háquele livro."
    ],
    "correct": 0,
    "feedback": "Referir-se a + aquele forma àquele."
  },
  {
    "title": "Crase facultativa",
    "explain": "Em determinados contextos, o artigo pode ser facultativo, como antes de possessivo feminino singular e de alguns nomes próprios femininos. Isso pode tornar facultativa a crase.",
    "example": "Entreguei o presente a minha irmã / à minha irmã.",
    "question": "Em qual caso a crase pode ser facultativa?",
    "options": [
      "Antes de verbo",
      "Antes de possessivo feminino singular",
      "Antes de pronome pessoal ela"
    ],
    "correct": 1,
    "feedback": "O artigo pode ser opcional antes de possessivo feminino singular."
  },
  {
    "title": "Revisão integrada de crase",
    "explain": "Verifique primeiro a regência e depois se o termo seguinte admite artigo. Use testes de substituição e reconheça locuções e demonstrativos especiais.",
    "example": "À tarde fomos à escola, mas voltamos a pé.",
    "question": "Qual frase está inteiramente correta?",
    "options": [
      "À tarde fui à escola a pé.",
      "A tarde fui à escola à pé.",
      "À tarde fui a escola à pé."
    ],
    "correct": 0,
    "feedback": "À tarde é locução; à escola tem fusão; a pé não recebe crase."
  }
]
,
"Pontuação": [
  {
    "title": "Ponto-final e organização",
    "explain": "O ponto-final encerra enunciados declarativos e ajuda a separar unidades de sentido. Pontuar não é apenas marcar pausas respiratórias: a pontuação organiza relações sintáticas e discursivas.",
    "example": "O projeto terminou. A equipe apresentou os resultados.",
    "question": "Qual sinal encerra uma declaração completa?",
    "options": [
      "Ponto-final",
      "Vírgula",
      "Dois-pontos"
    ],
    "correct": 0,
    "feedback": "O ponto-final marca o encerramento do enunciado declarativo."
  },
  {
    "title": "Vírgula em enumerações",
    "explain": "A vírgula separa elementos coordenados de uma enumeração quando não estão ligados por conjunção. A presença de e pode alterar a necessidade do sinal.",
    "example": "Comprei lápis, borracha, caderno e régua.",
    "question": "Qual frase pontua adequadamente uma enumeração?",
    "options": [
      "Comprei lápis borracha, caderno e régua.",
      "Comprei lápis, borracha, caderno e régua.",
      "Comprei, lápis borracha caderno."
    ],
    "correct": 1,
    "feedback": "As vírgulas separam os elementos enumerados."
  },
  {
    "title": "Vírgula e vocativo",
    "explain": "O vocativo chama ou interpela o interlocutor e deve ser isolado por vírgulas, mesmo quando aparece no início ou fim da oração.",
    "example": "Ana, feche a porta. Feche a porta, Ana.",
    "question": "Qual frase apresenta vocativo corretamente isolado?",
    "options": [
      "Pedro venha aqui.",
      "Pedro, venha aqui.",
      "Pedro venha, aqui."
    ],
    "correct": 1,
    "feedback": "Pedro é vocativo e deve ser separado por vírgula."
  },
  {
    "title": "Vírgula e aposto explicativo",
    "explain": "O aposto explicativo acrescenta informação sobre um termo e costuma vir entre vírgulas ou outros sinais equivalentes. Não se confunde com complemento necessário.",
    "example": "Machado de Assis, escritor brasileiro, nasceu no Rio de Janeiro.",
    "question": "Qual frase isola o aposto?",
    "options": [
      "Recife capital de Pernambuco é histórica.",
      "Recife, capital de Pernambuco, é histórica.",
      "Recife capital, de Pernambuco é histórica."
    ],
    "correct": 1,
    "feedback": "Capital de Pernambuco explica Recife e fica entre vírgulas."
  },
  {
    "title": "Vírgula e adjunto adverbial",
    "explain": "Adjuntos adverbiais deslocados, sobretudo longos, costumam ser isolados por vírgula. A vírgula pode ser facultativa com adjuntos curtos, conforme a clareza e o estilo.",
    "example": "Depois de várias horas de estudo, a turma descansou.",
    "question": "Qual frase marca corretamente o adjunto longo deslocado?",
    "options": [
      "Depois de várias horas de estudo, a turma descansou.",
      "Depois, de várias horas de estudo a turma descansou.",
      "Depois de várias horas, de estudo a turma descansou."
    ],
    "correct": 0,
    "feedback": "A vírgula delimita o adjunto adverbial antecipado."
  },
  {
    "title": "Vírgula entre sujeito e verbo",
    "explain": "Em regra, não se separa sujeito do predicado por vírgula. Intercalações explicativas podem aparecer entre vírgulas, mas isso não autoriza uma separação arbitrária.",
    "example": "Os estudantes atentos resolveram a atividade.",
    "question": "Qual frase evita separação indevida?",
    "options": [
      "Os estudantes, resolveram a atividade.",
      "Os estudantes resolveram a atividade.",
      "Os, estudantes resolveram a atividade."
    ],
    "correct": 1,
    "feedback": "Não se coloca vírgula entre sujeito e verbo sem intercalação."
  },
  {
    "title": "Vírgula e orações adjetivas",
    "explain": "Orações adjetivas explicativas são isoladas por vírgulas; restritivas, em regra, não. A pontuação pode mudar o conjunto de referentes.",
    "example": "Os alunos que estudaram passaram; Os alunos, que estudaram, passaram.",
    "question": "Qual frase apresenta oração explicativa?",
    "options": [
      "Os livros que comprei chegaram.",
      "Os livros, que comprei ontem, chegaram.",
      "Os livros de história chegaram."
    ],
    "correct": 1,
    "feedback": "A oração entre vírgulas acrescenta comentário explicativo."
  },
  {
    "title": "Ponto e vírgula",
    "explain": "O ponto e vírgula separa unidades coordenadas extensas ou itens complexos, especialmente quando já existem vírgulas internas. Seu uso organiza relações sem encerrar totalmente o período.",
    "example": "A equipe revisou os dados; o coordenador, o relatório.",
    "question": "Qual sinal pode separar orações coordenadas extensas?",
    "options": [
      "Ponto e vírgula",
      "Apóstrofo",
      "Hífen"
    ],
    "correct": 0,
    "feedback": "O ponto e vírgula pode separar orações coordenadas."
  },
  {
    "title": "Dois-pontos, travessão e aspas",
    "explain": "Dois-pontos introduzem explicação, enumeração ou citação; travessão pode marcar fala ou intercalação; aspas delimitam citações e usos especiais.",
    "example": "Ela anunciou: 'A prova foi adiada'.",
    "question": "Qual sinal introduz adequadamente uma enumeração?",
    "options": [
      "Dois-pontos",
      "Ponto de interrogação",
      "Reticências sempre"
    ],
    "correct": 0,
    "feedback": "Dois-pontos podem anunciar uma enumeração."
  },
  {
    "title": "Revisão de pontuação",
    "explain": "Revise a estrutura sintática, identifique vocativos e apostos e confira se a vírgula altera o sentido. A escolha de sinais deve apoiar a leitura e a organização do texto.",
    "example": "Professora, os alunos, que chegaram cedo, já estão na sala.",
    "question": "Qual frase está corretamente pontuada?",
    "options": [
      "Maria, traga o caderno.",
      "Maria traga, o caderno.",
      "Maria, traga, o caderno."
    ],
    "correct": 0,
    "feedback": "A vírgula isola o vocativo Maria sem separar verbo e objeto."
  }
],
"Colocação pronominal": [
  {
    "title": "Pronomes átonos e posições",
    "explain": "Pronomes oblíquos átonos podem aparecer antes, depois ou, em condições específicas, no interior do verbo. Essas posições recebem os nomes próclise, ênclise e mesóclise.",
    "example": "Não me disseram; disseram-me; dir-me-ão.",
    "question": "Em 'Não me disseram', ocorre:",
    "options": [
      "próclise",
      "ênclise",
      "mesóclise"
    ],
    "correct": 0,
    "feedback": "Me aparece antes do verbo."
  },
  {
    "title": "Próclise com negação",
    "explain": "Palavras negativas como não, nunca e jamais costumam atrair o pronome átono na norma-padrão quando não há pausa que altere a estrutura.",
    "example": "Nunca me avisaram da mudança.",
    "question": "Qual frase segue a próclise exigida pela negação?",
    "options": [
      "Não disseram-me.",
      "Não me disseram.",
      "Não disseram me."
    ],
    "correct": 1,
    "feedback": "Não favorece a colocação do pronome antes do verbo."
  },
  {
    "title": "Próclise com relativos",
    "explain": "Pronomes relativos como que e quem podem atrair pronomes átonos na oração que introduzem.",
    "example": "O livro que me deram era interessante.",
    "question": "Qual frase segue a norma-padrão?",
    "options": [
      "O livro que deram-me era bom.",
      "O livro que me deram era bom.",
      "O livro que deram me era bom."
    ],
    "correct": 1,
    "feedback": "Que, relativo, favorece a próclise."
  },
  {
    "title": "Próclise com conjunções subordinativas",
    "explain": "Conjunções subordinativas podem atrair o pronome átono, especialmente quando não há pausa entre a conjunção e o verbo.",
    "example": "Quando me chamarem, responderei.",
    "question": "Qual opção está adequada?",
    "options": [
      "Quando chamarem-me, responderei.",
      "Quando me chamarem, responderei.",
      "Quando chamarem me responderei."
    ],
    "correct": 1,
    "feedback": "Quando introduz oração subordinada e atrai me."
  },
  {
    "title": "Ênclise em início de oração formal",
    "explain": "Na norma-padrão escrita tradicional, evita-se iniciar oração com pronome átono. A ênclise pode ocorrer quando não há elemento atrativo; na fala brasileira, a próclise inicial é frequente.",
    "example": "Informaram-me sobre o prazo.",
    "question": "Qual opção segue a norma escrita formal tradicional?",
    "options": [
      "Me informaram ontem.",
      "Informaram-me ontem.",
      "Informaram me ontem."
    ],
    "correct": 1,
    "feedback": "Informaram-me emprega ênclise no início da oração."
  },
  {
    "title": "Ênclise com imperativo afirmativo",
    "explain": "No imperativo afirmativo, quando não há elemento atrativo, é comum a ênclise na norma-padrão.",
    "example": "Entregue-me o documento, por favor.",
    "question": "Qual forma está adequada?",
    "options": [
      "Me entregue o documento, por favor.",
      "Entregue-me o documento, por favor.",
      "Entregue me o documento."
    ],
    "correct": 1,
    "feedback": "Entregue-me apresenta ênclise ao imperativo afirmativo."
  },
  {
    "title": "Mesóclise com futuro",
    "explain": "A mesóclise pode ocorrer com futuro do presente ou do pretérito na norma escrita formal quando não há fator de próclise. É rara na fala brasileira.",
    "example": "Dir-lhe-ei a verdade; contar-me-ia depois.",
    "question": "Qual forma apresenta mesóclise?",
    "options": [
      "me dirão",
      "dir-me-ão",
      "disseram-me"
    ],
    "correct": 1,
    "feedback": "Dir-me-ão insere o pronome no interior da forma verbal futura."
  },
  {
    "title": "Colocação em locuções verbais",
    "explain": "Em locuções verbais, a posição do pronome depende do auxiliar, do verbo principal, de elementos atrativos e do registro. Algumas posições são aceitas na norma escrita, outras são típicas da fala.",
    "example": "Não me podem ajudar; podem ajudar-me.",
    "question": "Qual frase apresenta colocação formal possível?",
    "options": [
      "Podem ajudar-me.",
      "Podem ajudar me.",
      "Não podem-me ajudar."
    ],
    "correct": 0,
    "feedback": "A ênclise ao infinitivo é possível em locução verbal."
  },
  {
    "title": "Variação entre fala e escrita",
    "explain": "No português brasileiro, a próclise é muito frequente na fala e em textos informais, inclusive no início da frase. A avaliação deve considerar a norma solicitada e evitar preconceito linguístico.",
    "example": "Me avisaram ontem é corrente na fala; Avisaram-me é preferido na norma escrita tradicional.",
    "question": "Qual análise é adequada?",
    "options": [
      "A fala brasileira nunca usa próclise.",
      "A norma formal e a fala podem preferir posições diferentes.",
      "Toda próclise inicial é impossível na língua."
    ],
    "correct": 1,
    "feedback": "A colocação varia conforme registro e variedade linguística."
  },
  {
    "title": "Revisão de colocação pronominal",
    "explain": "Identifique primeiro o verbo e o pronome; depois procure palavras atrativas e verifique tempo verbal e registro. Não aplique regras de forma mecânica sem considerar o contexto.",
    "example": "Jamais me contaram; informar-lhe-ei; avisaram-me.",
    "question": "Qual frase segue a norma escrita formal?",
    "options": [
      "Jamais disseram-me.",
      "Jamais me disseram.",
      "Jamais disseram me."
    ],
    "correct": 1,
    "feedback": "Jamais atrai o pronome para antes do verbo."
  }
],
"Semântica": [
  {
    "title": "Significado e contexto",
    "explain": "A semântica estuda os sentidos de palavras, expressões e enunciados. O contexto pode selecionar diferentes interpretações de uma mesma forma.",
    "example": "Banco pode ser instituição financeira ou assento.",
    "question": "Em 'Sentei no banco da praça', banco significa:",
    "options": [
      "instituição financeira",
      "assento",
      "margem de rio obrigatoriamente"
    ],
    "correct": 1,
    "feedback": "O contexto de sentar seleciona o sentido de assento."
  },
  {
    "title": "Denotação e conotação",
    "explain": "Denotação é o uso mais literal ou referencial; conotação envolve sentidos figurados e associações expressivas.",
    "example": "O coração bombeia sangue é denotativo; Ela tem coração de pedra é conotativo.",
    "question": "Qual expressão é conotativa?",
    "options": [
      "A água ferveu.",
      "Ele tem coração de pedra.",
      "O relógio marcou oito horas."
    ],
    "correct": 1,
    "feedback": "Coração de pedra representa insensibilidade de modo figurado."
  },
  {
    "title": "Sinonímia contextual",
    "explain": "Sinônimos têm sentidos próximos, mas raramente são intercambiáveis em todos os contextos. O registro, a intensidade e a combinação com outras palavras influenciam a substituição.",
    "example": "Feliz e contente podem se aproximar em 'Ela está feliz/contente'.",
    "question": "Qual par apresenta proximidade de sentido?",
    "options": [
      "alegre e contente",
      "claro e escuro",
      "entrar e sair"
    ],
    "correct": 0,
    "feedback": "Alegre e contente podem ser sinônimos em muitos contextos."
  },
  {
    "title": "Antonímia",
    "explain": "Antônimos exprimem oposição semântica, que pode ser gradual, complementar ou relacional. Nem toda oposição equivale a simples negação.",
    "example": "Quente e frio expressam oposição gradual; vivo e morto, oposição mais complementar.",
    "question": "Qual par é antonímico?",
    "options": [
      "alto e baixo",
      "rápido e veloz",
      "feliz e contente"
    ],
    "correct": 0,
    "feedback": "Alto e baixo expressam sentidos opostos."
  },
  {
    "title": "Polissemia",
    "explain": "Polissemia ocorre quando uma mesma palavra apresenta sentidos relacionados entre si. É diferente de homonímia, em que formas coincidem sem relação semântica clara.",
    "example": "Cabeça do corpo e cabeça da equipe compartilham ideia de posição ou liderança.",
    "question": "Qual exemplo ilustra polissemia?",
    "options": [
      "cabeça do corpo / cabeça da equipe",
      "casa / mesa",
      "feliz / alegre"
    ],
    "correct": 0,
    "feedback": "Cabeça apresenta sentidos relacionados em contextos diferentes."
  },
  {
    "title": "Homonímia",
    "explain": "Homônimos compartilham forma sonora ou escrita, mas apresentam sentidos distintos. Podem ser homógrafos, homófonos ou perfeitos, conforme a coincidência.",
    "example": "Manga pode designar fruta ou parte de uma camisa.",
    "question": "Qual palavra exemplifica homonímia?",
    "options": [
      "manga",
      "bonito",
      "rapidamente"
    ],
    "correct": 0,
    "feedback": "Manga tem sentidos distintos com mesma forma."
  },
  {
    "title": "Paronímia",
    "explain": "Parônimos têm grafia ou pronúncia semelhantes, mas significados diferentes. A troca indevida pode alterar o sentido de textos formais.",
    "example": "Descrição é ato de descrever; discrição é reserva ou prudência.",
    "question": "Qual palavra completa 'Ele agiu com muita ___'?",
    "options": [
      "descrição",
      "discrição",
      "discreção"
    ],
    "correct": 1,
    "feedback": "Discrição significa reserva ou prudência."
  },
  {
    "title": "Ambiguidade lexical e sintática",
    "explain": "Ambiguidade surge quando um enunciado admite mais de uma interpretação. Pode resultar de palavra polissêmica, referência pronominal ou estrutura sintática.",
    "example": "Vi o homem com o telescópio: quem estava com o telescópio?",
    "question": "Qual revisão esclarece que o observador usou o instrumento?",
    "options": [
      "Vi o homem com o telescópio.",
      "Com o telescópio, observei o homem.",
      "Vi o homem que estava com o telescópio."
    ],
    "correct": 1,
    "feedback": "A construção explicita que o observador usou o telescópio."
  },
  {
    "title": "Pressupostos e implícitos",
    "explain": "Pressupostos são informações tomadas como dadas por certas expressões; inferências implícitas dependem do contexto e do conhecimento do leitor. Nem toda inferência é uma certeza.",
    "example": "João voltou a estudar pressupõe que ele já estudava antes.",
    "question": "O que 'Maria parou de fumar' pressupõe?",
    "options": [
      "Maria fumava antes.",
      "Maria nunca fumou.",
      "Maria começou hoje."
    ],
    "correct": 0,
    "feedback": "Parar de fumar pressupõe hábito anterior."
  },
  {
    "title": "Revisão de relações de sentido",
    "explain": "Para interpretar questões semânticas, observe o contexto, os efeitos figurados, a escolha lexical e informações implícitas. Uma palavra isolada pode não bastar para decidir o sentido.",
    "example": "Em 'A notícia caiu como uma bomba', bomba tem valor figurado.",
    "question": "Qual frase usa linguagem figurada?",
    "options": [
      "O aluno abriu o livro.",
      "A notícia caiu como uma bomba.",
      "O trem chegou às oito."
    ],
    "correct": 1,
    "feedback": "A comparação com bomba expressa impacto emocional, não explosão literal."
  }
]
,
"Figuras de linguagem": [
  {
    "title": "Linguagem figurada e efeitos de sentido",
    "explain": "Figuras de linguagem são recursos expressivos que alteram usos habituais de palavras, estruturas ou sons. Para identificá-las, observe o contexto e o efeito produzido, não apenas palavras isoladas.",
    "example": "Em 'A cidade acordou', uma ação humana é atribuída à cidade.",
    "question": "Qual enunciado contém uso figurado?",
    "options": [
      "O relógio marcou seis horas.",
      "A esperança floresceu.",
      "A porta estava aberta."
    ],
    "correct": 1,
    "feedback": "Florescer, associado à esperança, produz imagem figurada de desenvolvimento."
  },
  {
    "title": "Metáfora",
    "explain": "A metáfora estabelece aproximação implícita entre elementos de campos diferentes, sem conectivo comparativo explícito. A relação se apoia em características compartilhadas.",
    "example": "'Seus olhos são estrelas' aproxima olhos e estrelas pelo brilho.",
    "question": "Qual frase apresenta metáfora?",
    "options": [
      "Ele corre como vento.",
      "A vida é um palco.",
      "O vento soprou forte."
    ],
    "correct": 1,
    "feedback": "A vida é associada diretamente a um palco, sem 'como'."
  },
  {
    "title": "Comparação ou símile",
    "explain": "A comparação explicita uma aproximação entre elementos por conectivos como como, tal qual ou semelhante a. Diferencia-se da metáfora pelo vínculo comparativo expresso.",
    "example": "'A menina é rápida como uma flecha' apresenta comparação.",
    "question": "Qual frase contém comparação explícita?",
    "options": [
      "Sua voz é mel.",
      "Sua voz é doce como mel.",
      "Sua voz ecoou."
    ],
    "correct": 1,
    "feedback": "Como estabelece a comparação entre a voz e o mel."
  },
  {
    "title": "Metonímia",
    "explain": "Metonímia substitui um termo por outro com relação de proximidade ou associação, como autor pela obra, recipiente pelo conteúdo ou parte pelo todo em determinados contextos.",
    "example": "'Li Machado de Assis' significa que li uma obra do autor.",
    "question": "Em 'A turma leu Clarice Lispector', ocorre:",
    "options": [
      "metonímia",
      "hipérbole",
      "antítese"
    ],
    "correct": 0,
    "feedback": "O nome da autora representa suas obras."
  },
  {
    "title": "Personificação",
    "explain": "Personificação ou prosopopeia atribui características, ações ou sentimentos humanos a animais, objetos, fenômenos ou ideias.",
    "example": "'O vento sussurrava entre as árvores' atribui ao vento uma ação humana.",
    "question": "Qual frase apresenta personificação?",
    "options": [
      "A chuva começou cedo.",
      "O sol sorriu para a cidade.",
      "O sol estava forte."
    ],
    "correct": 1,
    "feedback": "Sorrir é ação humana atribuída ao sol."
  },
  {
    "title": "Hipérbole e eufemismo",
    "explain": "Hipérbole intensifica uma ideia por exagero expressivo; eufemismo suaviza uma informação considerada dura ou desagradável.",
    "example": "'Esperei uma eternidade' é hipérbole; 'Ele partiu' pode suavizar a referência à morte.",
    "question": "Qual frase exemplifica hipérbole?",
    "options": [
      "Esperei mil anos por você.",
      "Esperei vinte minutos.",
      "Esperei até as oito."
    ],
    "correct": 0,
    "feedback": "Mil anos exagera expressivamente o tempo de espera."
  },
  {
    "title": "Ironia",
    "explain": "A ironia cria contraste entre o enunciado literal e o sentido pretendido, frequentemente dependendo da situação e do tom. Não se deve inferir ironia sem pistas contextuais.",
    "example": "Ao encontrar a sala completamente bagunçada, alguém comenta: 'Que organização impecável!'",
    "question": "Na situação descrita, 'Que organização impecável!' expressa:",
    "options": [
      "elogio literal",
      "ironia",
      "descrição neutra"
    ],
    "correct": 1,
    "feedback": "O elogio aparente contrasta com a bagunça observada."
  },
  {
    "title": "Antítese e paradoxo",
    "explain": "Antítese aproxima ideias opostas; paradoxo reúne elementos aparentemente contraditórios para produzir um sentido complexo. A oposição isolada nem sempre constitui paradoxo.",
    "example": "'Entre risos e lágrimas' contém antítese; 'É ferida que dói e não se sente' constrói paradoxo.",
    "question": "Qual expressão apresenta antítese?",
    "options": [
      "amor e ódio",
      "céu azul",
      "música suave"
    ],
    "correct": 0,
    "feedback": "Amor e ódio são ideias opostas colocadas em relação."
  },
  {
    "title": "Aliteração, assonância e onomatopeia",
    "explain": "Aliteração repete sons consonantais; assonância, vocálicos; onomatopeia procura imitar sons. A análise se concentra na sonoridade efetiva do texto.",
    "example": "'O rato roeu a roupa' destaca repetição de /r/; 'tic-tac' imita som.",
    "question": "Qual palavra exemplifica onomatopeia?",
    "options": [
      "tic-tac",
      "gentileza",
      "saudade"
    ],
    "correct": 0,
    "feedback": "Tic-tac imita o som de um relógio."
  },
  {
    "title": "Revisão integrada de figuras",
    "explain": "Identifique primeiro o sentido literal e o contexto; depois verifique se o efeito nasce de aproximação, substituição, exagero, contraste ou sonoridade.",
    "example": "'Li um autor inteiro nas férias' pode usar metonímia e exagero, conforme o contexto.",
    "question": "Qual associação está correta?",
    "options": [
      "'O vento cantava' — personificação",
      "'Esperei uma eternidade' — eufemismo",
      "'Rápido como um raio' — metáfora sem comparação"
    ],
    "correct": 0,
    "feedback": "Cantar é ação humana atribuída ao vento."
  }
],
"Coesão e coerência": [
  {
    "title": "Coesão e coerência: diferenças",
    "explain": "Coesão é o conjunto de mecanismos linguísticos que conectam partes do texto; coerência é a construção de sentido compatível com contexto, propósito e conhecimentos mobilizados. Um texto pode ter conectivos e ainda ser incoerente.",
    "example": "'Choveu muito; por isso, a rua alagou' articula causa e consequência de modo coerente.",
    "question": "Qual afirmação está correta?",
    "options": [
      "Coesão e coerência são sinônimos.",
      "Conectivos garantem coerência automaticamente.",
      "Coesão articula elementos; coerência envolve sentido."
    ],
    "correct": 2,
    "feedback": "Os mecanismos de ligação não substituem a construção de sentido."
  },
  {
    "title": "Referência anafórica",
    "explain": "Anáfora retoma elemento já mencionado por pronomes, expressões equivalentes ou elipses, evitando repetição e sustentando a progressão textual.",
    "example": "'Marina chegou. Ela trouxe os livros': ela retoma Marina.",
    "question": "Em 'Pedro estudou. Ele passou', 'ele' retoma:",
    "options": [
      "Pedro",
      "estudou",
      "passou"
    ],
    "correct": 0,
    "feedback": "O pronome ele recupera Pedro."
  },
  {
    "title": "Referência catafórica",
    "explain": "Catáfora antecipa informação que será apresentada adiante. O leitor resolve a referência ao prosseguir no texto.",
    "example": "'Só desejo isto: que todos participem' antecipa a explicação de isto.",
    "question": "Em 'A notícia é esta: fomos aprovados', 'esta' é:",
    "options": [
      "catafórica",
      "antônimo",
      "vocativo"
    ],
    "correct": 0,
    "feedback": "Esta aponta para a informação que vem depois."
  },
  {
    "title": "Substituição lexical",
    "explain": "Sinônimos contextuais, hiperônimos e expressões nominais retomam referentes e evitam repetição excessiva. A substituição deve preservar a referência sem alterar indevidamente o sentido.",
    "example": "'O cachorro fugiu. O animal foi encontrado' retoma cachorro por animal.",
    "question": "Qual expressão retoma adequadamente 'um cachorro'?",
    "options": [
      "o animal",
      "a cidade",
      "o calendário"
    ],
    "correct": 0,
    "feedback": "Animal é termo mais geral que inclui cachorro."
  },
  {
    "title": "Elipse e repetição funcional",
    "explain": "A elipse omite termo recuperável pelo contexto. A repetição também pode ser coesiva quando enfatiza uma ideia ou mantém um referente; nem toda repetição é defeito.",
    "example": "'Ana leu o livro; Bruno, a revista' omite o verbo leu na segunda oração.",
    "question": "O que foi omitido em 'Ana leu o livro; Bruno, a revista'?",
    "options": [
      "o verbo leu",
      "o substantivo Ana",
      "a preposição de"
    ],
    "correct": 0,
    "feedback": "A estrutura permite recuperar leu."
  },
  {
    "title": "Conectivos de causa e consequência",
    "explain": "Porque, já que e visto que podem introduzir causas; portanto, assim e por isso podem indicar consequências ou conclusões. A escolha deve corresponder à relação lógica.",
    "example": "'O transporte parou; por isso, chegamos tarde'.",
    "question": "Qual conectivo indica consequência?",
    "options": [
      "por isso",
      "embora",
      "porém"
    ],
    "correct": 0,
    "feedback": "Por isso introduz resultado da situação anterior."
  },
  {
    "title": "Conectivos de contraste e concessão",
    "explain": "Mas e porém introduzem contraste coordenativo; embora e ainda que introduzem concessão. A relação semântica depende do período inteiro.",
    "example": "'Embora estivesse cansado, terminou a tarefa'.",
    "question": "Qual conectivo exprime concessão?",
    "options": [
      "embora",
      "porque",
      "portanto"
    ],
    "correct": 0,
    "feedback": "Embora apresenta obstáculo que não impede o resultado."
  },
  {
    "title": "Progressão temática",
    "explain": "Um texto progride quando acrescenta informação relevante ao tema, em vez de apenas repetir afirmações. Cada parágrafo deve contribuir para o objetivo comunicativo.",
    "example": "Um texto sobre reciclagem pode avançar de definição para impactos e soluções.",
    "question": "Qual sequência apresenta progressão temática?",
    "options": [
      "Definição, impactos, soluções",
      "Definição, definição, definição",
      "Soluções sem explicar o problema"
    ],
    "correct": 0,
    "feedback": "A sequência amplia gradualmente a discussão."
  },
  {
    "title": "Contradições e inferências",
    "explain": "Coerência exige avaliar compatibilidade entre afirmações e informações implícitas. Uma contradição pode ser intencional em literatura, mas em texto expositivo precisa ser explicada.",
    "example": "'A biblioteca estava fechada; ninguém pôde entrar' é coerente sem informação adicional.",
    "question": "Qual sequência é incoerente sem explicação adicional?",
    "options": [
      "A porta estava trancada; ninguém entrou.",
      "O local estava fechado; mesmo assim todos entraram livremente.",
      "O ônibus atrasou; cheguei depois."
    ],
    "correct": 1,
    "feedback": "Entrar livremente em local fechado exige contexto que explique a aparente contradição."
  },
  {
    "title": "Revisão de parágrafo",
    "explain": "Na revisão, verifique referentes pronominais, conectivos, ordem das ideias, repetição e adequação ao tema. Uma boa reescrita mantém o sentido e esclarece relações.",
    "example": "'Choveu. O jogo foi adiado' pode ser ligado por 'Por causa da chuva, o jogo foi adiado'.",
    "question": "Qual reescrita explicita a causa?",
    "options": [
      "Choveu, mas o jogo foi adiado.",
      "O jogo foi adiado porque choveu.",
      "O jogo foi adiado embora não chovesse."
    ],
    "correct": 1,
    "feedback": "Porque expressa a relação causal entre chuva e adiamento."
  }
],
"Gêneros textuais": [
  {
    "title": "Gênero textual e situação comunicativa",
    "explain": "Gêneros textuais são formas socialmente reconhecíveis de comunicação, definidas por finalidade, interlocutores, circulação e organização. Não se confundem com tipos textuais, como narração e argumentação.",
    "example": "Uma notícia informa fatos de interesse público; um convite busca convidar alguém.",
    "question": "O que ajuda a identificar um gênero?",
    "options": [
      "Apenas o número de palavras",
      "Finalidade e contexto de circulação",
      "Somente o tempo verbal"
    ],
    "correct": 1,
    "feedback": "O gênero depende da situação social e da finalidade."
  },
  {
    "title": "Notícia",
    "explain": "A notícia costuma informar acontecimentos de relevância pública, com título, informações centrais e desenvolvimento. O texto deve distinguir fatos verificados de opiniões.",
    "example": "'Escola inaugura biblioteca nesta segunda-feira' é título informativo.",
    "question": "Qual é a finalidade principal de uma notícia?",
    "options": [
      "Informar um acontecimento",
      "Vender necessariamente um produto",
      "Ensinar uma receita"
    ],
    "correct": 0,
    "feedback": "Notícia prioriza informação sobre acontecimentos."
  },
  {
    "title": "Reportagem",
    "explain": "A reportagem aprofunda um tema ou acontecimento, podendo reunir entrevistas, dados, contexto e diferentes perspectivas. Difere da notícia pela investigação e desenvolvimento mais extensos.",
    "example": "Uma reportagem sobre mobilidade urbana reúne estatísticas e relatos de moradores.",
    "question": "Qual recurso é típico de reportagem aprofundada?",
    "options": [
      "Apuração com fontes e dados",
      "Somente uma frase imperativa",
      "Apenas versos rimados"
    ],
    "correct": 0,
    "feedback": "Reportagens frequentemente combinam apuração, dados e entrevistas."
  },
  {
    "title": "Artigo de opinião",
    "explain": "O artigo de opinião defende uma tese sobre questão relevante com argumentos, exemplos e possível consideração de objeções. É essencial distinguir opinião de informação factual.",
    "example": "'A cidade precisa ampliar ciclovias' pode ser tese defendida com dados de mobilidade.",
    "question": "Qual elemento é central no artigo de opinião?",
    "options": [
      "Tese argumentativa",
      "Lista de ingredientes",
      "Instrução de montagem"
    ],
    "correct": 0,
    "feedback": "O artigo organiza argumentos em torno de uma tese."
  },
  {
    "title": "Editorial",
    "explain": "O editorial apresenta posicionamento institucional de um veículo ou organização sobre um tema. Em geral, não é assinado individualmente como um artigo pessoal.",
    "example": "Um jornal publica editorial defendendo transparência em políticas públicas.",
    "question": "O editorial expressa principalmente:",
    "options": [
      "posição institucional",
      "diário íntimo do repórter",
      "instruções de uso"
    ],
    "correct": 0,
    "feedback": "O editorial manifesta posição da instituição editorial."
  },
  {
    "title": "Crônica",
    "explain": "A crônica costuma partir de acontecimentos cotidianos para construir reflexão, humor, crítica ou lirismo. Pode combinar narração, descrição e comentário.",
    "example": "Uma cena no ônibus inspira reflexão sobre a pressa urbana.",
    "question": "Qual tema combina com uma crônica?",
    "options": [
      "Um episódio cotidiano com reflexão",
      "Somente tabela de especificações",
      "Apenas cláusulas contratuais"
    ],
    "correct": 0,
    "feedback": "A crônica frequentemente transforma o cotidiano em reflexão."
  },
  {
    "title": "Resenha",
    "explain": "A resenha apresenta e avalia uma obra, articulando informações sobre ela e apreciação fundamentada. Pode ser crítica ou descritiva, conforme o objetivo.",
    "example": "Uma resenha de filme resume aspectos essenciais e analisa roteiro e atuação.",
    "question": "Qual característica pertence à resenha crítica?",
    "options": [
      "Avaliação fundamentada de uma obra",
      "Somente instruções de montagem",
      "Proibição de qualquer opinião"
    ],
    "correct": 0,
    "feedback": "A resenha crítica combina apresentação e avaliação."
  },
  {
    "title": "Entrevista",
    "explain": "A entrevista organiza informações por perguntas e respostas ou por relato construído a partir delas. A seleção de perguntas depende do propósito e do perfil do entrevistado.",
    "example": "Uma pesquisadora responde sobre os resultados de um estudo.",
    "question": "Qual estrutura é comum na entrevista?",
    "options": [
      "Perguntas e respostas",
      "Somente estrofes",
      "Somente fórmulas matemáticas"
    ],
    "correct": 0,
    "feedback": "A entrevista frequentemente registra a interação entre entrevistador e entrevistado."
  },
  {
    "title": "Carta aberta e manifesto",
    "explain": "A carta aberta dirige-se publicamente a pessoas ou instituições, frequentemente com reivindicação ou posicionamento. O manifesto declara princípios e convoca adesão a uma causa.",
    "example": "Uma comunidade publica carta aberta solicitando melhorias na escola.",
    "question": "Qual finalidade é comum à carta aberta?",
    "options": [
      "Tornar pública uma reivindicação",
      "Registrar apenas uma compra",
      "Explicar exclusivamente um cálculo"
    ],
    "correct": 0,
    "feedback": "A carta aberta publiciza uma demanda ou posição."
  },
  {
    "title": "Gêneros digitais e revisão",
    "explain": "Postagens, comentários, e-mails e mensagens têm convenções variáveis conforme plataforma, público e objetivo. A análise deve considerar linguagem, autoria, credibilidade e circulação.",
    "example": "Um e-mail formal solicita informações; uma postagem pode divulgar campanha ou notícia.",
    "question": "Qual critério ajuda a adequar um e-mail profissional?",
    "options": [
      "Interlocutor e finalidade",
      "Usar sempre gírias",
      "Omitir completamente o assunto"
    ],
    "correct": 0,
    "feedback": "A adequação depende de quem recebe e do objetivo da mensagem."
  }
]
};
export function getExpandedPortugueseLessons(topic:string):Lesson[]|undefined{return curriculum[topic]}
