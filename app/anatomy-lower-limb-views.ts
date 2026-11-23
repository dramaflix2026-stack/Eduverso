import type {AtlasView} from "./anatomy-atlas-collection-data";

/** Grupo Membro Inferior: cinco imagens distintas, 30 regiões de estudo.
 * Hip e knee: DBCLS/TogoPic CC BY 4.0; tíbia: Anatomography/DBCLS CC BY-SA 2.1 JP.
 * Mapas percentuais manuais e didáticos, a revisar na interface antes de uso como referência especializada.
 */
export const lowerLimbViews:AtlasView[]=[
  {
    "id": "membro-inferior-quadril",
    "short": "Quadril e fêmur",
    "title": "Membro inferior — articulação do quadril",
    "subtitle": "Localize o acetábulo, a cabeça e o colo do fêmur e os marcos pélvicos em vista anterior.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/202109_anterior_view_of_hip_joint.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202109_anterior_view_of_hip_joint.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações do Eduverso",
    "ratio": "1 / 1",
    "background": "#f5f1fa",
    "alt": "Atlas anatômico de quadril e fêmur, sem legendas sobre os ossos",
    "spots": [
      {
        "id": "mi-hip-ilio",
        "name": "Ílio",
        "group": "Pelve",
        "x": 34,
        "y": 26,
        "description": "Osso superior largo do osso do quadril, acima do acetábulo.",
        "function": "Participa da sustentação da pelve e fornece inserções musculares.",
        "clinical": "A crista ilíaca é uma referência anatômica palpável.",
        "aliases": [
          "ilio"
        ]
      },
      {
        "id": "mi-hip-acetabulo",
        "name": "Acetábulo",
        "group": "Articulação coxofemoral",
        "x": 49,
        "y": 44,
        "description": "Cavidade articular do osso do quadril na qual se encaixa a cabeça do fêmur.",
        "function": "Integra a articulação do quadril e transmite cargas para a pelve.",
        "clinical": "A profundidade do acetábulo contribui para a estabilidade coxofemoral.",
        "aliases": [
          "acetabulo"
        ]
      },
      {
        "id": "mi-hip-cabeca",
        "name": "Cabeça do fêmur",
        "group": "Fêmur proximal",
        "x": 59,
        "y": 42,
        "description": "Extremidade arredondada proximal do fêmur, articulada com o acetábulo.",
        "function": "Permite rotação e movimentos amplos do quadril.",
        "clinical": "A irrigação da cabeça femoral é relevante nas fraturas proximais.",
        "aliases": [
          "cabeca femoral"
        ]
      },
      {
        "id": "mi-hip-colo",
        "name": "Colo do fêmur",
        "group": "Fêmur proximal",
        "x": 62,
        "y": 52,
        "description": "Trecho estreito entre a cabeça femoral e os trocânteres.",
        "function": "Transmite forças da cabeça do fêmur à diáfise.",
        "clinical": "É um local importante de fraturas em adultos mais velhos.",
        "aliases": [
          "colo femoral"
        ]
      },
      {
        "id": "mi-hip-trocanter",
        "name": "Trocânter maior",
        "group": "Fêmur proximal",
        "x": 78,
        "y": 57,
        "description": "Proeminência lateral próxima à região do colo do fêmur.",
        "function": "Serve como inserção para músculos glúteos.",
        "clinical": "Sua região é palpável na face lateral do quadril.",
        "aliases": [
          "trocanter maior"
        ]
      },
      {
        "id": "mi-hip-corpo",
        "name": "Corpo do fêmur",
        "group": "Coxa",
        "x": 65,
        "y": 76,
        "description": "Porção alongada que continua inferiormente a partir da região trocantérica.",
        "function": "Transmite forças entre quadril e joelho.",
        "clinical": "A diáfise femoral forma parte do eixo mecânico do membro inferior.",
        "aliases": [
          "diafise do femur",
          "femur"
        ]
      }
    ]
  },
  {
    "id": "membro-inferior-joelho-anterior",
    "short": "Joelho anterior",
    "title": "Membro inferior — joelho frontal",
    "subtitle": "Estude patela, extremidade femoral distal e tíbia e fíbula proximais.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cc/202108_Anterior_view_of_knee_joint.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202108_Anterior_view_of_knee_joint.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações do Eduverso",
    "ratio": "1 / 1",
    "background": "#f5f1fa",
    "alt": "Atlas anatômico de joelho anterior, sem legendas sobre os ossos",
    "spots": [
      {
        "id": "mi-knee-ant-femur",
        "name": "Fêmur distal",
        "group": "Coxa",
        "x": 49,
        "y": 24,
        "description": "Extremidade inferior do fêmur, ampliada para formar os côndilos.",
        "function": "Transmite cargas para a tíbia pela articulação do joelho.",
        "clinical": "A cartilagem articular reveste as superfícies de contato.",
        "aliases": [
          "femur distal"
        ]
      },
      {
        "id": "mi-knee-ant-patela",
        "name": "Patela",
        "group": "Joelho",
        "x": 49,
        "y": 46,
        "description": "Osso sesamoide situado anteriormente à articulação do joelho.",
        "function": "Aumenta a eficiência mecânica do quadríceps.",
        "clinical": "Integra o mecanismo extensor do joelho.",
        "aliases": [
          "rotula"
        ]
      },
      {
        "id": "mi-knee-ant-cond-lat",
        "name": "Côndilo lateral do fêmur",
        "group": "Fêmur distal",
        "x": 33,
        "y": 43,
        "description": "Uma das duas superfícies arredondadas da extremidade distal femoral.",
        "function": "Articula-se com o platô tibial correspondente.",
        "clinical": "Contribui para estabilidade e movimento do joelho.",
        "aliases": [
          "condilo lateral"
        ]
      },
      {
        "id": "mi-knee-ant-cond-med",
        "name": "Côndilo medial do fêmur",
        "group": "Fêmur distal",
        "x": 65,
        "y": 43,
        "description": "Superfície arredondada distal femoral voltada medialmente.",
        "function": "Participa da articulação femorotibial.",
        "clinical": "Sua forma participa da mecânica de flexão e extensão.",
        "aliases": [
          "condilo medial"
        ]
      },
      {
        "id": "mi-knee-ant-tibia",
        "name": "Tíbia proximal",
        "group": "Perna",
        "x": 50,
        "y": 66,
        "description": "Extremidade superior alargada da tíbia que recebe o peso do corpo.",
        "function": "Forma a porção inferior da articulação femorotibial.",
        "clinical": "O platô tibial é uma superfície importante para apoio articular.",
        "aliases": [
          "tibia"
        ]
      },
      {
        "id": "mi-knee-ant-fibula",
        "name": "Cabeça da fíbula",
        "group": "Perna",
        "x": 74,
        "y": 70,
        "description": "Porção superior da fíbula, lateral à tíbia.",
        "function": "Oferece inserções ligamentares e articula-se com a tíbia.",
        "clinical": "A região do colo da fíbula é próxima ao nervo fibular comum.",
        "aliases": [
          "fibula proximal",
          "cabeca da fibula"
        ]
      }
    ]
  },
  {
    "id": "membro-inferior-joelho-posterior",
    "short": "Joelho posterior",
    "title": "Membro inferior — joelho dorsal",
    "subtitle": "Identifique os côndilos femorais e as estruturas ósseas posteriores do joelho.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/31/202108_Posterior_view_of_knee_joint.svg",
    "source": "https://commons.wikimedia.org/wiki/File:202108_Posterior_view_of_knee_joint.svg",
    "credit": "Database Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações do Eduverso",
    "ratio": "1 / 1",
    "background": "#f5f1fa",
    "alt": "Atlas anatômico de joelho posterior, sem legendas sobre os ossos",
    "spots": [
      {
        "id": "mi-knee-post-femur",
        "name": "Fêmur distal posterior",
        "group": "Coxa",
        "x": 51,
        "y": 24,
        "description": "Extremidade inferior do fêmur observada por trás.",
        "function": "Contribui para a sustentação e mobilidade da articulação femorotibial.",
        "clinical": "A fossa intercondilar separa os côndilos posteriormente.",
        "aliases": [
          "femur distal"
        ]
      },
      {
        "id": "mi-knee-post-cond-med",
        "name": "Côndilo medial do fêmur",
        "group": "Fêmur distal",
        "x": 38,
        "y": 42,
        "description": "Superfície articular posterior de um dos côndilos femorais.",
        "function": "Participa da mecânica femorotibial.",
        "clinical": "Fornece parte da superfície para flexão e extensão do joelho.",
        "aliases": [
          "condilo medial"
        ]
      },
      {
        "id": "mi-knee-post-cond-lat",
        "name": "Côndilo lateral do fêmur",
        "group": "Fêmur distal",
        "x": 65,
        "y": 42,
        "description": "Côndilo distal femoral situado no lado lateral.",
        "function": "Articula-se ao platô tibial lateral.",
        "clinical": "Sua topografia relaciona-se à fossa intercondilar.",
        "aliases": [
          "condilo lateral"
        ]
      },
      {
        "id": "mi-knee-post-fossa",
        "name": "Fossa intercondilar",
        "group": "Fêmur distal",
        "x": 50,
        "y": 49,
        "description": "Depressão posterior entre os côndilos femorais.",
        "function": "Aloja as inserções femorais dos ligamentos cruzados.",
        "clinical": "É marco anatômico do joelho posterior.",
        "aliases": [
          "fossa intercondilar"
        ]
      },
      {
        "id": "mi-knee-post-tibia",
        "name": "Tíbia proximal posterior",
        "group": "Perna",
        "x": 49,
        "y": 67,
        "description": "Porção superior da tíbia vista posteriormente.",
        "function": "Transmite cargas entre o fêmur e a perna.",
        "clinical": "A região posterior da tíbia participa das inserções ligamentares.",
        "aliases": [
          "tibia proximal"
        ]
      },
      {
        "id": "mi-knee-post-fibula",
        "name": "Cabeça da fíbula",
        "group": "Perna",
        "x": 73,
        "y": 71,
        "description": "Extremidade proximal do osso lateral da perna.",
        "function": "Articula-se com a tíbia na articulação tibiofibular proximal.",
        "clinical": "É marco palpável na região posterolateral do joelho.",
        "aliases": [
          "fibula",
          "cabeca fibula"
        ]
      }
    ]
  },
  {
    "id": "membro-inferior-perna-anterior",
    "short": "Perna anterior · tíbia",
    "title": "Membro inferior — tíbia anterior",
    "subtitle": "Estude a tíbia isolada em vista anterior, com seus relevos ósseos.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Right_tibia_-_close_up_-_anterior_view.png",
    "source": "https://commons.wikimedia.org/wiki/File:Right_tibia_-_close_up_-_anterior_view.png",
    "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
    "ratio": "1 / 1",
    "background": "#f5f1fa",
    "alt": "Atlas anatômico de perna anterior · tíbia, sem legendas sobre os ossos",
    "spots": [
      {
        "id": "mi-tibia-ant-cond-med",
        "name": "Côndilo medial da tíbia",
        "group": "Tíbia proximal",
        "x": 45,
        "y": 13,
        "description": "Parte medial da extremidade superior da tíbia.",
        "function": "Sustenta a superfície articular superior medial.",
        "clinical": "Participa do platô tibial.",
        "aliases": [
          "condilo medial"
        ]
      },
      {
        "id": "mi-tibia-ant-cond-lat",
        "name": "Côndilo lateral da tíbia",
        "group": "Tíbia proximal",
        "x": 56,
        "y": 13,
        "description": "Parte lateral da extremidade superior tibial.",
        "function": "Articula-se com o côndilo femoral lateral.",
        "clinical": "O menisco lateral se relaciona à superfície articular lateral.",
        "aliases": [
          "condilo lateral"
        ]
      },
      {
        "id": "mi-tibia-ant-tuberosidade",
        "name": "Tuberosidade da tíbia",
        "group": "Tíbia proximal",
        "x": 50,
        "y": 25,
        "description": "Proeminência óssea na face anterior logo abaixo do joelho.",
        "function": "É a inserção do ligamento patelar.",
        "clinical": "É uma referência palpável abaixo da patela.",
        "aliases": [
          "tuberosidade tibial"
        ]
      },
      {
        "id": "mi-tibia-ant-crista",
        "name": "Crista anterior da tíbia",
        "group": "Diáfise",
        "x": 50,
        "y": 44,
        "description": "Borda anterior longitudinal do corpo da tíbia, superficial na perna.",
        "function": "Dá contorno à região anterior da perna.",
        "clinical": "A crista tibial é palpável ao longo da maior parte da diáfise.",
        "aliases": [
          "crista tibial"
        ]
      },
      {
        "id": "mi-tibia-ant-corpo",
        "name": "Diáfise da tíbia",
        "group": "Diáfise",
        "x": 51,
        "y": 60,
        "description": "Corpo alongado do principal osso de suporte de peso da perna.",
        "function": "Conduz forças entre o joelho e o tornozelo.",
        "clinical": "Fraturas diafisárias podem envolver a face subcutânea da tíbia.",
        "aliases": [
          "corpo da tibia"
        ]
      },
      {
        "id": "mi-tibia-ant-maleolo",
        "name": "Maléolo medial",
        "group": "Tíbia distal",
        "x": 56,
        "y": 87,
        "description": "Projeção distal medial da tíbia no tornozelo.",
        "function": "Contribui para estabilizar a articulação talocrural.",
        "clinical": "É uma saliência óssea palpável no lado interno do tornozelo.",
        "aliases": [
          "maleolo medial"
        ]
      }
    ]
  },
  {
    "id": "membro-inferior-perna-posterior",
    "short": "Perna posterior · tíbia",
    "title": "Membro inferior — tíbia posterior",
    "subtitle": "Reconheça os principais relevos da tíbia observados pela face posterior.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Right_tibia_-_close_up_-_posterior_view.png",
    "source": "https://commons.wikimedia.org/wiki/File:Right_tibia_-_close_up_-_posterior_view.png",
    "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · hotspots e explicações do Eduverso",
    "ratio": "1 / 1",
    "background": "#f5f1fa",
    "alt": "Atlas anatômico de perna posterior · tíbia, sem legendas sobre os ossos",
    "spots": [
      {
        "id": "mi-tibia-post-cond-med",
        "name": "Côndilo medial da tíbia",
        "group": "Tíbia proximal",
        "x": 43,
        "y": 13,
        "description": "Porção superior medial da tíbia, observada por trás.",
        "function": "Participa do suporte de carga na articulação do joelho.",
        "clinical": "Forma parte do platô tibial.",
        "aliases": [
          "condilo medial"
        ]
      },
      {
        "id": "mi-tibia-post-cond-lat",
        "name": "Côndilo lateral da tíbia",
        "group": "Tíbia proximal",
        "x": 58,
        "y": 13,
        "description": "Porção superior lateral da tíbia.",
        "function": "Participa da superfície de contato com o fêmur.",
        "clinical": "Relaciona-se à cabeça da fíbula pela articulação tibiofibular proximal.",
        "aliases": [
          "condilo lateral"
        ]
      },
      {
        "id": "mi-tibia-post-linha",
        "name": "Linha do músculo sóleo",
        "group": "Face posterior",
        "x": 49,
        "y": 30,
        "description": "Crista oblíqua localizada na face posterior da tíbia proximal.",
        "function": "Serve de inserção ao músculo sóleo.",
        "clinical": "É um marco ósseo posterior importante do compartimento da perna.",
        "aliases": [
          "linha do soleo",
          "linha soleal"
        ]
      },
      {
        "id": "mi-tibia-post-corpo",
        "name": "Corpo da tíbia",
        "group": "Diáfise",
        "x": 50,
        "y": 51,
        "description": "Porção alongada posterior do osso da perna.",
        "function": "Sustenta peso e oferece origem muscular.",
        "clinical": "A face posterior recebe inserções musculares profundas.",
        "aliases": [
          "diafise da tibia"
        ]
      },
      {
        "id": "mi-tibia-post-distal",
        "name": "Extremidade distal da tíbia",
        "group": "Tíbia distal",
        "x": 50,
        "y": 76,
        "description": "Região distal que forma parte superior da articulação do tornozelo.",
        "function": "Transmite carga da perna ao tálus.",
        "clinical": "O maléolo medial prolonga-se da extremidade distal tibial.",
        "aliases": [
          "tibia distal"
        ]
      },
      {
        "id": "mi-tibia-post-maleolo",
        "name": "Maléolo medial",
        "group": "Tíbia distal",
        "x": 55,
        "y": 89,
        "description": "Projeção medial da tíbia que pode ser vista no tornozelo.",
        "function": "Participa da estabilidade da articulação talocrural.",
        "clinical": "É referência na avaliação de entorses e fraturas do tornozelo.",
        "aliases": [
          "maleolo medial"
        ]
      }
    ]
  }
];
export const lowerLimbViewIds=new Set(lowerLimbViews.map(view=>view.id));
export const lowerLimbViewIsValid=(id:string|null):boolean=>Boolean(id)&&lowerLimbViewIds.has(id as string);
