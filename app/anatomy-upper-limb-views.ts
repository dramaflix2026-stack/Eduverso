import type {AtlasView} from "./anatomy-atlas-collection-data";

/** MVP: 5 vistas do membro superior, cada qual com conteúdo e hotspots próprios.
 * Fontes: Wikimedia Commons; DBCLS/TogoPic CC BY 4.0 e Anatomography CC BY-SA 2.1 JP.
 * Posições percentuais manuais — validar visualmente com revisão anatômica antes da aprovação final.
 * O atlas anterior "membro-superior" permanece armazenado no histórico local sem ser sobrescrito.
 */
export const upperLimbViews:AtlasView[]=[
  {
    "id": "membro-superior-ombro",
    "title": "Membro superior — ombro",
    "short": "Ombro",
    "subtitle": "Explore a cintura escapular e o encaixe do úmero na articulação do ombro.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6f/202107_Anterior_view_of_the_shoulder_joint.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202107_Anterior_view_of_the_shoulder_joint.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · marcadores e explicações do Eduverso",
    "ratio": "1 / 1",
    "alt": "Ilustração anatômica da região Ombro do membro superior humano",
    "spots": [
      {
        "id": "ms-ombro-clavicula",
        "name": "Clavícula",
        "group": "Cintura escapular",
        "x": 51,
        "y": 19,
        "description": "Osso longo em S que conecta o esterno ao acrômio da escápula.",
        "function": "Sustenta a cintura escapular e transmite forças do membro superior ao esqueleto axial.",
        "clinical": "Sua extremidade lateral participa da articulação acromioclavicular.",
        "aliases": [
          "clavicula"
        ]
      },
      {
        "id": "ms-ombro-acromio",
        "name": "Acrômio",
        "group": "Escápula",
        "x": 35,
        "y": 33,
        "description": "Prolongamento lateral da espinha da escápula que forma o ponto mais alto do ombro.",
        "function": "Participa da articulação acromioclavicular e oferece inserção muscular.",
        "clinical": "A região subacromial está relacionada à passagem de tendões do manguito rotador.",
        "aliases": [
          "acromio"
        ]
      },
      {
        "id": "ms-ombro-escapula",
        "name": "Escápula",
        "group": "Cintura escapular",
        "x": 34,
        "y": 57,
        "description": "Osso plano triangular localizado na parte posterior do tórax.",
        "function": "Proporciona inserções musculares e estabilização para o movimento do ombro.",
        "clinical": "A cavidade glenoidal recebe a cabeça do úmero.",
        "aliases": [
          "omoplata",
          "escapula"
        ]
      },
      {
        "id": "ms-ombro-glenoide",
        "name": "Cavidade glenoidal",
        "group": "Articulação",
        "x": 53,
        "y": 41,
        "description": "Superfície articular da escápula voltada à cabeça do úmero.",
        "function": "Compõe a articulação glenoumeral, permitindo grande mobilidade.",
        "clinical": "Sua pequena profundidade exige estabilização muscular e capsuloligamentar.",
        "aliases": [
          "glenoide"
        ]
      },
      {
        "id": "ms-ombro-cabeca",
        "name": "Cabeça do úmero",
        "group": "Úmero proximal",
        "x": 64,
        "y": 43,
        "description": "Extremidade proximal arredondada do úmero.",
        "function": "Articula-se com a cavidade glenoidal para realizar os movimentos do ombro.",
        "clinical": "É uma estrutura relevante em luxações glenoumerais.",
        "aliases": [
          "cabeca do umero"
        ]
      },
      {
        "id": "ms-ombro-colo",
        "name": "Colo cirúrgico do úmero",
        "group": "Úmero proximal",
        "x": 65,
        "y": 58,
        "description": "Região de estreitamento situada inferiormente aos tubérculos do úmero.",
        "function": "Transmite forças entre a epífise proximal e a diáfise.",
        "clinical": "Fraturas do colo cirúrgico podem comprometer estruturas neurovasculares próximas.",
        "aliases": [
          "colo cirurgico"
        ]
      }
    ]
  },
  {
    "id": "membro-superior-braco",
    "title": "Membro superior — braço",
    "short": "Braço e úmero",
    "subtitle": "Reconheça os principais marcos ósseos do úmero, da cabeça ao cotovelo.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Humerus_-_anterior_view2.png",
    "source": "https://commons.wikimedia.org/wiki/File:Humerus_-_anterior_view2.png",
    "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · marcadores e explicações do Eduverso",
    "ratio": "1 / 1",
    "alt": "Úmero direito destacado em vermelho, com enquadramento exclusivo do osso",
    "spots": [
      {
        "id": "ms-braco-cabeca",
        "name": "Cabeça do úmero",
        "group": "Úmero proximal",
        "x": 27,
        "y": 12,
        "description": "Extremidade articular proximal do osso do braço.",
        "function": "Articula-se com a escápula, formando a articulação glenoumeral.",
        "clinical": "Tem importância na avaliação de luxações e fraturas proximais.",
        "aliases": [
          "cabeca do umero"
        ]
      },
      {
        "id": "ms-braco-tuberculo",
        "name": "Tubérculo maior do úmero",
        "group": "Úmero proximal",
        "x": 43,
        "y": 16,
        "description": "Proeminência óssea lateral próxima da cabeça umeral.",
        "function": "É ponto de inserção de tendões do manguito rotador.",
        "clinical": "Lesões e fraturas nessa região podem limitar os movimentos de ombro.",
        "aliases": [
          "tuberculo maior"
        ]
      },
      {
        "id": "ms-braco-colo",
        "name": "Colo cirúrgico",
        "group": "Úmero proximal",
        "x": 43,
        "y": 22,
        "description": "Trecho de transição logo abaixo dos tubérculos do úmero.",
        "function": "Conecta a extremidade proximal ao corpo ósseo.",
        "clinical": "Área relativamente frequente de fraturas proximais do úmero.",
        "aliases": [
          "colo cirurgico",
          "colo do umero"
        ]
      },
      {
        "id": "ms-braco-diafise",
        "name": "Diáfise do úmero",
        "group": "Corpo do úmero",
        "x": 54,
        "y": 49,
        "description": "Porção longa central do osso do braço.",
        "function": "Atua como alavanca para os músculos do braço e da cintura escapular.",
        "clinical": "O sulco do nervo radial situa-se na face posterior do corpo do úmero.",
        "aliases": [
          "corpo do umero",
          "diafise"
        ]
      },
      {
        "id": "ms-braco-epicondilo",
        "name": "Epicôndilo medial",
        "group": "Úmero distal",
        "x": 48,
        "y": 88,
        "description": "Proeminência óssea medial na extremidade inferior do úmero.",
        "function": "Serve de inserção aos músculos flexores e pronadores do antebraço.",
        "clinical": "O nervo ulnar passa posteriormente à região epicondilar medial.",
        "aliases": [
          "epicondilo medial"
        ]
      },
      {
        "id": "ms-braco-troclea",
        "name": "Tróclea do úmero",
        "group": "Úmero distal",
        "x": 63,
        "y": 91,
        "description": "Superfície articular distal do úmero, semelhante a uma polia.",
        "function": "Articula-se com a incisura troclear da ulna.",
        "clinical": "Participa do movimento de flexão e extensão do cotovelo.",
        "aliases": [
          "troclea"
        ]
      }
    ],
    "imageCrop": {
      "left": 71,
      "top": 31,
      "width": 23,
      "height": 58
    }
  },
  {
    "id": "membro-superior-cotovelo",
    "title": "Membro superior — cotovelo",
    "short": "Cotovelo",
    "subtitle": "Identifique os ossos e superfícies articulares responsáveis pela flexão e extensão.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/76/202107_Anterior_view_of_the_elbow_joint.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202107_Anterior_view_of_the_elbow_joint.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · marcadores e explicações do Eduverso",
    "ratio": "1 / 1",
    "alt": "Ilustração anatômica da região Cotovelo do membro superior humano",
    "spots": [
      {
        "id": "ms-cotovelo-umero",
        "name": "Úmero distal",
        "group": "Braço",
        "x": 50,
        "y": 32,
        "description": "Porção inferior do úmero que se articula com o antebraço.",
        "function": "Forma as superfícies articulares da tróclea e do capítulo.",
        "clinical": "Fraturas supracondilares ocorrem logo acima dessa região.",
        "aliases": [
          "umero distal"
        ]
      },
      {
        "id": "ms-cotovelo-capitulo",
        "name": "Capítulo do úmero",
        "group": "Articulação úmerorradial",
        "x": 42,
        "y": 51,
        "description": "Superfície arredondada lateral do úmero distal.",
        "function": "Articula-se com a cabeça do rádio.",
        "clinical": "Contribui para os movimentos de flexão e rotação do antebraço.",
        "aliases": [
          "capitulo",
          "capitulum"
        ]
      },
      {
        "id": "ms-cotovelo-troclea",
        "name": "Tróclea do úmero",
        "group": "Articulação úmeroulnar",
        "x": 56,
        "y": 53,
        "description": "Superfície distal em forma de polia na extremidade umeral.",
        "function": "Articula-se com a incisura troclear da ulna.",
        "clinical": "Orienta o movimento predominante em dobradiça do cotovelo.",
        "aliases": [
          "troclea"
        ]
      },
      {
        "id": "ms-cotovelo-radio",
        "name": "Cabeça do rádio",
        "group": "Rádio proximal",
        "x": 40,
        "y": 59,
        "description": "Extremidade proximal arredondada do rádio.",
        "function": "Permite movimentos de pronação e supinação em conjunto com a ulna.",
        "clinical": "Sua posição é importante na avaliação de luxação da cabeça radial.",
        "aliases": [
          "cabeca do radio",
          "radio"
        ]
      },
      {
        "id": "ms-cotovelo-ulna",
        "name": "Ulna proximal",
        "group": "Ulna",
        "x": 55,
        "y": 68,
        "description": "Porção superior da ulna, incluindo os processos olécrano e coronóide.",
        "function": "Forma a principal articulação de dobradiça com a tróclea umeral.",
        "clinical": "A região olecraniana é palpável na face posterior do cotovelo.",
        "aliases": [
          "ulna",
          "cubito"
        ]
      },
      {
        "id": "ms-cotovelo-olecrano",
        "name": "Olécrano",
        "group": "Ulna proximal",
        "x": 59,
        "y": 58,
        "description": "Projeção proximal posterior da ulna.",
        "function": "Recebe inserção do tríceps braquial e contribui para a estabilidade do cotovelo.",
        "clinical": "É o relevo ósseo mais evidente na face posterior do cotovelo.",
        "aliases": [
          "olecrano"
        ]
      }
    ]
  },
  {
    "id": "membro-superior-antebraco",
    "title": "Membro superior — antebraço",
    "short": "Antebraço",
    "subtitle": "Estude rádio e ulna em supinação, da articulação proximal à região distal.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4c/202202_Anterior_view_of_right_radius_and_ulna_in_supination.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202202_Anterior_view_of_right_radius_and_ulna_in_supination.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · marcadores e explicações do Eduverso",
    "ratio": "1 / 1",
    "alt": "Ilustração anatômica da região Antebraço do membro superior humano",
    "spots": [
      {
        "id": "ms-antebraco-radio-cabeca",
        "name": "Cabeça do rádio",
        "group": "Rádio proximal",
        "x": 47,
        "y": 20,
        "description": "Porção superior do rádio que se articula com o capítulo do úmero.",
        "function": "Participa da flexão do cotovelo e da pronação e supinação.",
        "clinical": "É um marco importante nas lesões proximais do rádio.",
        "aliases": [
          "cabeca do radio"
        ]
      },
      {
        "id": "ms-antebraco-ulna-prox",
        "name": "Ulna proximal",
        "group": "Ulna",
        "x": 54,
        "y": 25,
        "description": "Região superior da ulna, próxima ao cotovelo.",
        "function": "Articula-se com a tróclea do úmero e estabiliza o antebraço.",
        "clinical": "O processo coronóide auxilia a estabilidade do cotovelo.",
        "aliases": [
          "ulna",
          "cubito"
        ]
      },
      {
        "id": "ms-antebraco-radio-corpo",
        "name": "Corpo do rádio",
        "group": "Rádio",
        "x": 45,
        "y": 43,
        "description": "Porção alongada lateral do antebraço, no lado do polegar em posição anatômica.",
        "function": "Gira em torno da ulna durante pronação e supinação.",
        "clinical": "O rádio distal transmite carga à articulação do punho.",
        "aliases": [
          "radio",
          "diafise do radio"
        ]
      },
      {
        "id": "ms-antebraco-ulna-corpo",
        "name": "Corpo da ulna",
        "group": "Ulna",
        "x": 52,
        "y": 45,
        "description": "Porção alongada medial do antebraço em posição anatômica.",
        "function": "Oferece inserções musculares e articulações com o rádio.",
        "clinical": "Rádio e ulna são conectados pela membrana interóssea.",
        "aliases": [
          "ulna",
          "diafise da ulna"
        ]
      },
      {
        "id": "ms-antebraco-interossea",
        "name": "Membrana interóssea",
        "group": "Antebraço",
        "x": 49,
        "y": 43,
        "description": "Lâmina fibrosa estendida entre rádio e ulna.",
        "function": "Conecta os dois ossos e contribui para a transmissão de forças.",
        "clinical": "Sua integridade influencia a mecânica radioulnar.",
        "aliases": [
          "membrana interossea"
        ]
      },
      {
        "id": "ms-antebraco-radio-distal",
        "name": "Extremidade distal do rádio",
        "group": "Punho",
        "x": 44,
        "y": 59,
        "description": "Região inferior alargada do rádio próxima aos ossos do carpo.",
        "function": "Participa da articulação radiocárpica.",
        "clinical": "Fraturas do rádio distal são frequentes após quedas com apoio da mão.",
        "aliases": [
          "radio distal"
        ]
      },
      {
        "id": "ms-antebraco-ulna-distal",
        "name": "Extremidade distal da ulna",
        "group": "Punho",
        "x": 53,
        "y": 60,
        "description": "Porção inferior da ulna, próximo ao punho.",
        "function": "Compõe a articulação radioulnar distal.",
        "clinical": "A cabeça e o processo estilóide da ulna são referências importantes.",
        "aliases": [
          "ulna distal"
        ]
      }
    ]
  },
  {
    "id": "membro-superior-mao",
    "title": "Membro superior — mão e punho",
    "short": "Mão e punho",
    "subtitle": "Localize os ossos do carpo, metacarpos e falanges na mão direita.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f5/202110_Anterior_view_of_bones_of_right_hand.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202110_Anterior_view_of_bones_of_right_hand.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · marcadores e explicações do Eduverso",
    "ratio": "1 / 1",
    "alt": "Ilustração anatômica da região Mão e punho do membro superior humano",
    "spots": [
      {
        "id": "ms-mao-escafoide",
        "name": "Escafoide",
        "group": "Carpo",
        "x": 41,
        "y": 33,
        "description": "Osso da fileira proximal do carpo, no lado do polegar.",
        "function": "Participa da articulação radiocárpica e da estabilidade do punho.",
        "clinical": "Fraturas podem ocorrer após quedas com a mão estendida.",
        "aliases": [
          "escafoide"
        ]
      },
      {
        "id": "ms-mao-semilunar",
        "name": "Semilunar",
        "group": "Carpo",
        "x": 52,
        "y": 32,
        "description": "Osso da fileira proximal do carpo entre escafoide e piramidal.",
        "function": "Participa da articulação radiocárpica.",
        "clinical": "Sua vascularização é clinicamente importante na osteonecrose.",
        "aliases": [
          "lunar",
          "semilunar"
        ]
      },
      {
        "id": "ms-mao-trapezio",
        "name": "Trapézio",
        "group": "Carpo",
        "x": 36,
        "y": 42,
        "description": "Osso da fileira distal do carpo que se articula com o primeiro metacarpal.",
        "function": "Participa da oposição do polegar e da articulação carpometacarpal.",
        "clinical": "A articulação do polegar pode apresentar osteoartrose.",
        "aliases": [
          "trapezio"
        ]
      },
      {
        "id": "ms-mao-metacarpal",
        "name": "Segundo metacarpal",
        "group": "Metacarpo",
        "x": 46,
        "y": 55,
        "description": "Osso da palma que se estende da região do carpo em direção ao indicador.",
        "function": "Sustenta a arquitetura da mão e transmite forças para o dedo indicador.",
        "clinical": "Sua base articula-se com ossos da fileira distal do carpo.",
        "aliases": [
          "metacarpal ii",
          "segundo metacarpo"
        ]
      },
      {
        "id": "ms-mao-polegar",
        "name": "Falanges do polegar",
        "group": "Polegar",
        "x": 28,
        "y": 66,
        "description": "O polegar possui duas falanges, proximal e distal.",
        "function": "Permitem a preensão e os movimentos finos do polegar.",
        "clinical": "O polegar é fundamental na pinça de precisão.",
        "aliases": [
          "polegar",
          "falanges do polegar"
        ]
      },
      {
        "id": "ms-mao-falangeprox",
        "name": "Falanges proximais",
        "group": "Dedos",
        "x": 57,
        "y": 67,
        "description": "Primeiras falanges dos dedos, adjacentes às cabeças dos metacarpais.",
        "function": "Participam da flexão e extensão dos dedos.",
        "clinical": "Integram as articulações metacarpofalângicas.",
        "aliases": [
          "falange proximal"
        ]
      },
      {
        "id": "ms-mao-falangemedia",
        "name": "Falanges médias",
        "group": "Dedos",
        "x": 58,
        "y": 78,
        "description": "Falanges intermediárias dos dedos indicador ao mínimo, ausentes no polegar.",
        "function": "Contribuem para os movimentos das articulações interfalângicas.",
        "clinical": "São envolvidas em fraturas e luxações dos dedos.",
        "aliases": [
          "falange media"
        ]
      },
      {
        "id": "ms-mao-falangedistal",
        "name": "Falanges distais",
        "group": "Dedos",
        "x": 57,
        "y": 90,
        "description": "Últimas falanges dos dedos, localizadas nas pontas.",
        "function": "Sustentam as polpas digitais e as unhas.",
        "clinical": "São estruturas frequentes em lesões por esmagamento.",
        "aliases": [
          "falange distal"
        ]
      }
    ]
  }
];
export const upperLimbViewIds=new Set(upperLimbViews.map(view=>view.id));
export const upperLimbViewIsValid=(id:string|null):boolean=>Boolean(id)&&upperLimbViewIds.has(id as string);
