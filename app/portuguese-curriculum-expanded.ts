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
};
export function getExpandedPortugueseLessons(topic:string):Lesson[]|undefined{return curriculum[topic]}
