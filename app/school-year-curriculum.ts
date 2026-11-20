// Sequência orientativa por série do Ensino Médio: currículos escolares podem variar.
// Tópicos preparatórios para ENEM e concursos permanecem acessíveis em todas as séries.
export type SchoolYear = 1 | 2 | 3;
export const topicsBySchoolYear: Record<string, Record<SchoolYear, readonly string[]>> = {
  "Português": {
    "1": [
      "Gramática",
      "Interpretação",
      "Redação",
      "Literatura",
      "Ortografia",
      "Acentuação gráfica",
      "Fonética e fonologia",
      "Formação de palavras",
      "Substantivos e artigos",
      "Adjetivos e advérbios",
      "Pronomes",
      "Verbos",
      "Preposições e conjunções",
      "Pontuação",
      "Gêneros textuais",
      "Tipologia textual",
      "Variação linguística"
    ],
    "2": [
      "Gramática",
      "Interpretação",
      "Redação",
      "Literatura",
      "Verbos",
      "Sintaxe da oração",
      "Período composto",
      "Concordância verbal",
      "Concordância nominal",
      "Regência verbal e nominal",
      "Crase",
      "Pontuação",
      "Colocação pronominal",
      "Semântica",
      "Figuras de linguagem",
      "Coesão e coerência",
      "Gêneros textuais",
      "Escolas literárias"
    ],
    "3": [
      "Interpretação",
      "Redação",
      "Literatura",
      "Gramática",
      "Concordância verbal",
      "Concordância nominal",
      "Regência verbal e nominal",
      "Crase",
      "Pontuação",
      "Colocação pronominal",
      "Semântica",
      "Figuras de linguagem",
      "Coesão e coerência",
      "Gêneros textuais",
      "Tipologia textual",
      "Variação linguística",
      "Argumentação e repertório",
      "Escolas literárias",
      "Literatura brasileira"
    ]
  },
  "Física": {
    "1": [
      "Mecânica",
      "Energia",
      "Cinemática",
      "Dinâmica",
      "Gravitação",
      "Hidrostática"
    ],
    "2": [
      "Energia",
      "Termologia",
      "Termodinâmica",
      "Ondulatória e Acústica",
      "Óptica"
    ],
    "3": [
      "Eletricidade",
      "Óptica",
      "Física Moderna",
      "Ondulatória e Acústica",
      "Energia"
    ]
  },
  "Química": {
    "1": [
      "Introdução à Química",
      "Átomos",
      "Tabela periódica",
      "Modelos Atômicos",
      "Ligações",
      "Reações",
      "Funções Inorgânicas"
    ],
    "2": [
      "Reações",
      "Estequiometria",
      "Soluções Químicas",
      "Termoquímica",
      "Cinética Química",
      "Equilíbrio Químico",
      "Eletroquímica"
    ],
    "3": [
      "Química Orgânica",
      "Polímeros e Materiais",
      "Química Ambiental",
      "Eletroquímica",
      "Equilíbrio Químico",
      "Soluções Químicas"
    ]
  },
  "Biologia": {
    "1": [
      "Introdução à Biologia",
      "Bioquímica Celular",
      "Células",
      "Citologia Avançada",
      "Divisão Celular",
      "Histologia",
      "Classificação dos Seres Vivos",
      "Microbiologia"
    ],
    "2": [
      "Genética",
      "Evolução",
      "Embriologia",
      "Reprodução Humana",
      "Histologia",
      "Fisiologia Humana",
      "Botânica",
      "Zoologia"
    ],
    "3": [
      "Ecologia",
      "Genética",
      "Evolução",
      "Fisiologia Humana",
      "Reprodução Humana",
      "Microbiologia",
      "Botânica",
      "Zoologia"
    ]
  },
  "Anatomia": {
    "1": [
      "Introdução à Anatomia",
      "Sistema ósseo",
      "Sistema muscular",
      "Sistema Tegumentar",
      "Histologia",
      "Sistema circulatório"
    ],
    "2": [
      "Sistema circulatório",
      "Sistema Respiratório",
      "Sistema Digestório",
      "Sistema Urinário",
      "Sistema Linfático",
      "Sistema muscular",
      "Sistema Reprodutor"
    ],
    "3": [
      "Sistema nervoso",
      "Anatomia do Cérebro",
      "Sistema Endócrino",
      "Sistema Imunológico",
      "Órgãos dos Sentidos",
      "Anatomia Integrada",
      "Sistema Reprodutor",
      "Sistema circulatório"
    ]
  },
  "História": {
    "1": [
      "Introdução à História",
      "Pré-História",
      "História antiga",
      "História Medieval",
      "História da África",
      "História da América",
      "Brasil Colonial"
    ],
    "2": [
      "História moderna",
      "Revoluções Históricas",
      "Brasil Colonial",
      "Brasil Império",
      "História da América",
      "História da África",
      "História Cultural e Social"
    ],
    "3": [
      "História Contemporânea",
      "Brasil República",
      "História do Brasil",
      "Guerras Mundiais",
      "Guerra Fria",
      "Revoluções Históricas",
      "História Cultural e Social"
    ]
  },
  "Geografia": {
    "1": [
      "Introdução à Geografia",
      "Cartografia",
      "Clima",
      "Geologia e Relevo",
      "Hidrografia",
      "Biomas e Vegetação",
      "Geografia do Brasil"
    ],
    "2": [
      "População e Demografia",
      "Urbanização",
      "Geografia Agrária",
      "Geografia Econômica",
      "Geografia do Brasil",
      "Energia e Recursos Naturais",
      "Questões Ambientais"
    ],
    "3": [
      "Geopolítica",
      "Globalização",
      "Regionalização Mundial",
      "Questões Ambientais",
      "Energia e Recursos Naturais",
      "Geografia Econômica",
      "População e Demografia"
    ]
  },
  "Inglês": {
    "1": [
      "Vocabulário",
      "Gramática",
      "Fundamentos do Inglês",
      "Pronúncia e Fonética",
      "Tempos Verbais",
      "Inglês no Dia a Dia",
      "Compreensão Oral",
      "Conversação"
    ],
    "2": [
      "Gramática",
      "Conversação",
      "Tempos Verbais",
      "Verbos Modais",
      "Leitura e Interpretação",
      "Escrita em Inglês",
      "Compreensão Oral",
      "Phrasal Verbs e Expressões"
    ],
    "3": [
      "Conversação",
      "Leitura e Interpretação",
      "Escrita em Inglês",
      "Inglês para Viagens",
      "Inglês Profissional",
      "Cultura e Literatura",
      "Inglês para o ENEM",
      "Phrasal Verbs e Expressões"
    ]
  },
  "ENEM e Vestibulares": {
    "1": [
      "Redação ENEM",
      "Linguagens",
      "Ciências Humanas",
      "Ciências da Natureza",
      "Matemática ENEM",
      "Provas Passadas"
    ],
    "2": [
      "Redação ENEM",
      "Linguagens",
      "Ciências Humanas",
      "Ciências da Natureza",
      "Matemática ENEM",
      "Provas Passadas"
    ],
    "3": [
      "Redação ENEM",
      "Linguagens",
      "Ciências Humanas",
      "Ciências da Natureza",
      "Matemática ENEM",
      "Provas Passadas"
    ]
  },
  "Concursos": {
    "1": [
      "Raciocínio lógico",
      "Língua portuguesa",
      "Conhecimentos gerais"
    ],
    "2": [
      "Raciocínio lógico",
      "Língua portuguesa",
      "Conhecimentos gerais"
    ],
    "3": [
      "Raciocínio lógico",
      "Língua portuguesa",
      "Conhecimentos gerais"
    ]
  }
};

export function getTopicsBySchoolYear(subject: string, year: SchoolYear): readonly string[] {
  return topicsBySchoolYear[subject]?.[year] ?? [];
}
