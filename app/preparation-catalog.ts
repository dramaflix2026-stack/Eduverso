// Catálogo de objetivos de estudo, não catálogo de editais abertos.
// Conteúdos e exigências variam conforme instituição, cargo, curso, edição e edital.
export type PrepGroup = "vestibulares" | "cursos" | "concursos" | "profissionais";
export type PrepLevel = "superior" | "profissional" | "varia";
export type PrepFocus = "vestibular" | "medicina" | "exatas" | "humanas" | "saude" | "policial" | "juridico" | "fiscal" | "bancario" | "administrativo" | "educacao" | "ti";
export type PrepGoal = {group:PrepGroup;id:string;title:string;subtitle:string;level:PrepLevel;focus:PrepFocus;officialUrl?:string};
export type PrepTrack = {subject:string;topic:string};
export const prepGroups = [
  {
    "key": "vestibulares",
    "title": "Vestibulares e universidades",
    "subtitle": "Selecione a instituição ou o processo seletivo",
    "icon": "🎓"
  },
  {
    "key": "cursos",
    "title": "Preparação por curso",
    "subtitle": "Escolha a graduação que você quer conquistar",
    "icon": "🩺"
  },
  {
    "key": "concursos",
    "title": "Concursos públicos",
    "subtitle": "Organize seu estudo pela carreira",
    "icon": "🏛️"
  },
  {
    "key": "profissionais",
    "title": "Exames profissionais",
    "subtitle": "Avance para a próxima etapa da profissão",
    "icon": "📜"
  }
] as const;
export const prepCatalog: PrepGoal[] = [
  {
    "group": "vestibulares",
    "id": "usp-fuvest",
    "title": "USP / FUVEST",
    "subtitle": "Vestibular para cursos da Universidade de São Paulo",
    "level": "superior",
    "focus": "vestibular",
    "officialUrl": "https://www.fuvest.br/vestibular-da-usp/"
  },
  {
    "group": "vestibulares",
    "id": "unicamp",
    "title": "Unicamp / Comvest",
    "subtitle": "Preparação para o processo seletivo da Unicamp",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "unesp",
    "title": "Unesp / Vunesp",
    "subtitle": "Preparação para ingresso na Unesp",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "uerj",
    "title": "UERJ",
    "subtitle": "Preparação para as provas e etapas da UERJ",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "ufrj",
    "title": "UFRJ",
    "subtitle": "Estudo para as formas de ingresso divulgadas pela UFRJ",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "ufmg",
    "title": "UFMG",
    "subtitle": "Preparação para as modalidades de ingresso da UFMG",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "ufpr",
    "title": "UFPR",
    "subtitle": "Preparação para o processo seletivo da UFPR",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "ufrgs",
    "title": "UFRGS",
    "subtitle": "Preparação para o processo seletivo da UFRGS",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "ufsc",
    "title": "UFSC",
    "subtitle": "Preparação para o processo seletivo da UFSC",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "unb",
    "title": "UnB",
    "subtitle": "Preparação para seleção e ingresso na Universidade de Brasília",
    "level": "superior",
    "focus": "vestibular"
  },
  {
    "group": "vestibulares",
    "id": "ita",
    "title": "ITA",
    "subtitle": "Base de exatas para o vestibular do Instituto Tecnológico de Aeronáutica",
    "level": "superior",
    "focus": "exatas"
  },
  {
    "group": "vestibulares",
    "id": "ime",
    "title": "IME",
    "subtitle": "Base de exatas para ingresso no Instituto Militar de Engenharia",
    "level": "superior",
    "focus": "exatas"
  },
  {
    "group": "vestibulares",
    "id": "famerp",
    "title": "Famerp",
    "subtitle": "Preparação para processos seletivos da faculdade de medicina",
    "level": "superior",
    "focus": "medicina"
  },
  {
    "group": "vestibulares",
    "id": "famema",
    "title": "Famema",
    "subtitle": "Preparação para processos seletivos da faculdade de medicina",
    "level": "superior",
    "focus": "medicina"
  },
  {
    "group": "vestibulares",
    "id": "enem-sisu",
    "title": "ENEM / Sisu",
    "subtitle": "Estude para o ENEM e acompanhe as regras de ingresso",
    "level": "superior",
    "focus": "vestibular",
    "officialUrl": "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem"
  },
  {
    "group": "cursos",
    "id": "medicina",
    "title": "Medicina",
    "subtitle": "Escolha o vestibular e priorize a base de ciências da natureza",
    "level": "superior",
    "focus": "medicina"
  },
  {
    "group": "cursos",
    "id": "direito",
    "title": "Direito",
    "subtitle": "Linguagens, humanas e argumentação para o ingresso",
    "level": "superior",
    "focus": "humanas"
  },
  {
    "group": "cursos",
    "id": "engenharia",
    "title": "Engenharia",
    "subtitle": "Matemática e física como eixos centrais da preparação",
    "level": "superior",
    "focus": "exatas"
  },
  {
    "group": "cursos",
    "id": "odontologia",
    "title": "Odontologia",
    "subtitle": "Biologia, química e leitura científica",
    "level": "superior",
    "focus": "medicina"
  },
  {
    "group": "cursos",
    "id": "psicologia",
    "title": "Psicologia",
    "subtitle": "Biologia, humanas, leitura e produção textual",
    "level": "superior",
    "focus": "humanas"
  },
  {
    "group": "cursos",
    "id": "enfermagem",
    "title": "Enfermagem",
    "subtitle": "Biologia, anatomia, química e interpretação",
    "level": "superior",
    "focus": "saude"
  },
  {
    "group": "cursos",
    "id": "veterinaria",
    "title": "Medicina Veterinária",
    "subtitle": "Biologia, química e fundamentos da natureza",
    "level": "superior",
    "focus": "medicina"
  },
  {
    "group": "cursos",
    "id": "arquitetura",
    "title": "Arquitetura",
    "subtitle": "Geometria, matemática, história e interpretação",
    "level": "superior",
    "focus": "exatas"
  },
  {
    "group": "cursos",
    "id": "computacao",
    "title": "Ciência da Computação",
    "subtitle": "Matemática, lógica e raciocínio para vestibulares",
    "level": "superior",
    "focus": "ti"
  },
  {
    "group": "cursos",
    "id": "administracao",
    "title": "Administração e Economia",
    "subtitle": "Matemática, humanas e interpretação de dados",
    "level": "superior",
    "focus": "administrativo"
  },
  {
    "group": "concursos",
    "id": "policia-militar",
    "title": "Polícia Militar",
    "subtitle": "Preparação por editais estaduais",
    "level": "varia",
    "focus": "policial"
  },
  {
    "group": "concursos",
    "id": "policia-civil",
    "title": "Polícia Civil",
    "subtitle": "Bases comuns e estudos por cargo/estado",
    "level": "varia",
    "focus": "policial"
  },
  {
    "group": "concursos",
    "id": "pf-prf",
    "title": "Polícia Federal e PRF",
    "subtitle": "Base de concursos policiais federais",
    "level": "varia",
    "focus": "policial"
  },
  {
    "group": "concursos",
    "id": "policia-penal",
    "title": "Polícia Penal",
    "subtitle": "Conteúdos comuns para seleções estaduais e federais",
    "level": "varia",
    "focus": "policial"
  },
  {
    "group": "concursos",
    "id": "guarda-municipal",
    "title": "Guarda Municipal",
    "subtitle": "Português, lógica e legislação conforme município",
    "level": "varia",
    "focus": "policial"
  },
  {
    "group": "concursos",
    "id": "bombeiros",
    "title": "Corpo de Bombeiros",
    "subtitle": "Conhecimentos gerais e exatas conforme edital",
    "level": "varia",
    "focus": "policial"
  },
  {
    "group": "concursos",
    "id": "tribunais",
    "title": "Tribunais e Poder Judiciário",
    "subtitle": "Base comum para cargos do Judiciário",
    "level": "varia",
    "focus": "juridico"
  },
  {
    "group": "concursos",
    "id": "ministerio-publico",
    "title": "Ministério Público e Defensoria",
    "subtitle": "Base de seleção para carreiras de apoio e jurídicas",
    "level": "varia",
    "focus": "juridico"
  },
  {
    "group": "concursos",
    "id": "receita-fiscal",
    "title": "Receita Federal e Área Fiscal",
    "subtitle": "Matemática, português e disciplinas por cargo",
    "level": "varia",
    "focus": "fiscal"
  },
  {
    "group": "concursos",
    "id": "controle-auditoria",
    "title": "Controle e Auditoria",
    "subtitle": "Raciocínio, análise de dados e fundamentos",
    "level": "varia",
    "focus": "fiscal"
  },
  {
    "group": "concursos",
    "id": "bancarios",
    "title": "Concursos Bancários",
    "subtitle": "Matemática financeira, português e lógica",
    "level": "varia",
    "focus": "bancario"
  },
  {
    "group": "concursos",
    "id": "inss",
    "title": "INSS e Previdência",
    "subtitle": "Português, raciocínio e fundamentos por edital",
    "level": "varia",
    "focus": "administrativo"
  },
  {
    "group": "concursos",
    "id": "prefeituras",
    "title": "Prefeituras e Câmaras Municipais",
    "subtitle": "Preparação conforme cargo e município",
    "level": "varia",
    "focus": "administrativo"
  },
  {
    "group": "concursos",
    "id": "administracao-publica",
    "title": "Administração Pública Federal e Estadual",
    "subtitle": "Base para seleções de órgãos e CPNU",
    "level": "varia",
    "focus": "administrativo",
    "officialUrl": "https://www.gov.br/gestao/pt-br/concursonacional"
  },
  {
    "group": "concursos",
    "id": "educacao",
    "title": "Educação e Professores",
    "subtitle": "Português, conhecimentos pedagógicos e específicos",
    "level": "varia",
    "focus": "educacao"
  },
  {
    "group": "concursos",
    "id": "saude",
    "title": "Saúde e Enfermagem",
    "subtitle": "Fundamentos de saúde e matérias gerais",
    "level": "varia",
    "focus": "saude"
  },
  {
    "group": "concursos",
    "id": "forcas-armadas",
    "title": "Forças Armadas",
    "subtitle": "Preparação introdutória conforme instituição e cargo",
    "level": "varia",
    "focus": "exatas"
  },
  {
    "group": "concursos",
    "id": "legislativo",
    "title": "Poder Legislativo",
    "subtitle": "Língua portuguesa, lógica e conhecimentos por carreira",
    "level": "varia",
    "focus": "juridico"
  },
  {
    "group": "concursos",
    "id": "ti",
    "title": "Tecnologia da Informação",
    "subtitle": "Raciocínio, matemática e bases gerais",
    "level": "varia",
    "focus": "ti"
  },
  {
    "group": "concursos",
    "id": "estatais",
    "title": "Empresas Públicas e Estatais",
    "subtitle": "Português e conteúdos gerais conforme cargo",
    "level": "varia",
    "focus": "administrativo"
  },
  {
    "group": "profissionais",
    "id": "oab",
    "title": "OAB / Exame de Ordem",
    "subtitle": "Revisão introdutória, não substitui programa do exame",
    "level": "profissional",
    "focus": "juridico"
  },
  {
    "group": "profissionais",
    "id": "revalida",
    "title": "Revalida",
    "subtitle": "Exame para revalidação de diploma médico obtido no exterior",
    "level": "profissional",
    "focus": "saude",
    "officialUrl": "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/revalida"
  },
  {
    "group": "profissionais",
    "id": "enare",
    "title": "ENARE / Residência",
    "subtitle": "Seleção de residência conforme edital da edição",
    "level": "profissional",
    "focus": "saude",
    "officialUrl": "https://www.gov.br/pt-br/servicos/inscrever-se-no-exame-nacional-de-residencia-enare-candidato"
  },
  {
    "group": "profissionais",
    "id": "enamed",
    "title": "Enamed",
    "subtitle": "Estudo introdutório para avaliação de formação médica",
    "level": "profissional",
    "focus": "saude",
    "officialUrl": "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enamed"
  },
  {
    "group": "profissionais",
    "id": "cfc",
    "title": "Exame de Suficiência CFC",
    "subtitle": "Base de estudo preliminar; conferir edital profissional",
    "level": "profissional",
    "focus": "fiscal"
  }
];
const tracksByFocus:Record<PrepFocus, PrepTrack[]> = {
  "vestibular": [
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Matemática",
      "topic": "Funções"
    },
    {
      "subject": "História",
      "topic": "História do Brasil"
    },
    {
      "subject": "Geografia",
      "topic": "Geopolítica"
    },
    {
      "subject": "Física",
      "topic": "Mecânica"
    },
    {
      "subject": "Química",
      "topic": "Átomos"
    },
    {
      "subject": "Biologia",
      "topic": "Genética"
    },
    {
      "subject": "ENEM e Vestibulares",
      "topic": "Redação ENEM"
    }
  ],
  "medicina": [
    {
      "subject": "Biologia",
      "topic": "Fisiologia Humana"
    },
    {
      "subject": "Biologia",
      "topic": "Genética"
    },
    {
      "subject": "Química",
      "topic": "Química Orgânica"
    },
    {
      "subject": "Química",
      "topic": "Estequiometria"
    },
    {
      "subject": "Física",
      "topic": "Mecânica"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "ENEM e Vestibulares",
      "topic": "Redação ENEM"
    }
  ],
  "exatas": [
    {
      "subject": "Matemática",
      "topic": "Trigonometria"
    },
    {
      "subject": "Matemática",
      "topic": "Função quadrática"
    },
    {
      "subject": "Física",
      "topic": "Mecânica"
    },
    {
      "subject": "Física",
      "topic": "Eletricidade"
    },
    {
      "subject": "Química",
      "topic": "Estequiometria"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "ENEM e Vestibulares",
      "topic": "Redação ENEM"
    }
  ],
  "humanas": [
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Português",
      "topic": "Argumentação e repertório"
    },
    {
      "subject": "História",
      "topic": "Brasil República"
    },
    {
      "subject": "Geografia",
      "topic": "Geopolítica"
    },
    {
      "subject": "Biologia",
      "topic": "Genética"
    },
    {
      "subject": "ENEM e Vestibulares",
      "topic": "Redação ENEM"
    }
  ],
  "saude": [
    {
      "subject": "Biologia",
      "topic": "Fisiologia Humana"
    },
    {
      "subject": "Anatomia",
      "topic": "Anatomia Integrada"
    },
    {
      "subject": "Biologia",
      "topic": "Microbiologia"
    },
    {
      "subject": "Química",
      "topic": "Soluções Químicas"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Concursos",
      "topic": "Conhecimentos gerais"
    }
  ],
  "policial": [
    {
      "subject": "Concursos",
      "topic": "Língua portuguesa"
    },
    {
      "subject": "Concursos",
      "topic": "Raciocínio lógico"
    },
    {
      "subject": "Concursos",
      "topic": "Conhecimentos gerais"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Matemática",
      "topic": "Probabilidade"
    },
    {
      "subject": "História",
      "topic": "Brasil República"
    }
  ],
  "juridico": [
    {
      "subject": "Concursos",
      "topic": "Língua portuguesa"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Português",
      "topic": "Argumentação e repertório"
    },
    {
      "subject": "História",
      "topic": "Brasil República"
    },
    {
      "subject": "Concursos",
      "topic": "Conhecimentos gerais"
    }
  ],
  "fiscal": [
    {
      "subject": "Concursos",
      "topic": "Raciocínio lógico"
    },
    {
      "subject": "Matemática",
      "topic": "Matemática financeira"
    },
    {
      "subject": "Matemática",
      "topic": "Estatística"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Concursos",
      "topic": "Conhecimentos gerais"
    }
  ],
  "bancario": [
    {
      "subject": "Matemática",
      "topic": "Matemática financeira"
    },
    {
      "subject": "Matemática",
      "topic": "Porcentagem"
    },
    {
      "subject": "Matemática",
      "topic": "Estatística"
    },
    {
      "subject": "Concursos",
      "topic": "Raciocínio lógico"
    },
    {
      "subject": "Concursos",
      "topic": "Língua portuguesa"
    }
  ],
  "administrativo": [
    {
      "subject": "Concursos",
      "topic": "Língua portuguesa"
    },
    {
      "subject": "Concursos",
      "topic": "Raciocínio lógico"
    },
    {
      "subject": "Concursos",
      "topic": "Conhecimentos gerais"
    },
    {
      "subject": "Matemática",
      "topic": "Matemática financeira"
    },
    {
      "subject": "Português",
      "topic": "Interpretação"
    }
  ],
  "educacao": [
    {
      "subject": "Português",
      "topic": "Interpretação"
    },
    {
      "subject": "Português",
      "topic": "Gramática"
    },
    {
      "subject": "Matemática",
      "topic": "Porcentagem"
    },
    {
      "subject": "História",
      "topic": "História do Brasil"
    },
    {
      "subject": "Concursos",
      "topic": "Conhecimentos gerais"
    }
  ],
  "ti": [
    {
      "subject": "Matemática",
      "topic": "Álgebra"
    },
    {
      "subject": "Matemática",
      "topic": "Funções"
    },
    {
      "subject": "Matemática",
      "topic": "Probabilidade"
    },
    {
      "subject": "Matemática",
      "topic": "Análise combinatória"
    },
    {
      "subject": "Concursos",
      "topic": "Raciocínio lógico"
    },
    {
      "subject": "Inglês",
      "topic": "Leitura e Interpretação"
    }
  ]
};
export function getSuggestedPrepTracks(goal:PrepGoal):PrepTrack[]{return tracksByFocus[goal.focus] ?? [];}
export function getPrepGoal(id:string | null | undefined):PrepGoal | undefined {return prepCatalog.find(g=>g.id===id);}
