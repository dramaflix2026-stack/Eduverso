import {atlasViews,type AtlasView} from "./anatomy-atlas-collection-data";

/**
 * Sistema Esquelético → Pé: cinco vistas, com conteúdo e hotspots independentes.
 * A dorsal preserva as 9 estruturas e progresso do atlas original.
 * Dorsal/plantar/medial/lateral: DBCLS/TogoPic CC BY 4.0.
 * Tarso isolado: Anatomography/DBCLS CC BY-SA 2.1 JP; recorte da imagem original
 * sobre um pé para não exibir dois conjuntos de ossos ao mesmo tempo.
 * Posicionamento dos hotspots visualmente estimado, pendente de validação anatômica final.
 */
const previous=atlasViews.find(view=>view.id==="pe");
if(!previous)throw new Error("O atlas original do Pé não foi encontrado.");

const dorsal:AtlasView={
 ...previous,id:"pe-dorsal",title:"Pé direito — vista dorsal",short:"Vista dorsal",
 subtitle:"Explore ossos do tarso, metatarso e falanges na parte superior do pé.",
 image:"https://upload.wikimedia.org/wikipedia/commons/3/3e/202110_Dorsal_view_of_bones_of_right_foot.svg",
 ratio:"1 / 1",
 credit:"DataBase Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações do Eduverso"
};

export const footViews:AtlasView[]=[
 dorsal,
{
  "id": "pe-plantar",
  "title": "Pé direito — vista plantar",
  "short": "Vista plantar",
  "subtitle": "Identifique o retropé, os ossos da planta, os metatarsos e as falanges.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/4/4e/202110_Plantar_view_of_bones_of_right_foot.svg",
  "source": "https://commons.wikimedia.org/wiki/File:202110_Plantar_view_of_bones_of_right_foot.svg",
  "credit": "DataBase Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações didáticas do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica sem legendas: vista plantar do pé humano",
  "spots": [
    {
      "id": "pe-plantar-calcaneo",
      "name": "Calcâneo",
      "group": "Tarso · retropé",
      "x": 47,
      "y": 86,
      "description": "Osso volumoso do calcanhar, visível na extremidade posterior da planta.",
      "function": "Suporta a carga do retropé e recebe o tendão calcâneo.",
      "clinical": "A tuberosidade calcânea participa da sustentação e da propulsão da marcha.",
      "aliases": [
        "calcaneo"
      ]
    },
    {
      "id": "pe-plantar-talus",
      "name": "Tálus",
      "group": "Tarso · retropé",
      "x": 59,
      "y": 69,
      "description": "Osso tarsal superior ao calcâneo, parcialmente visível na perspectiva plantar.",
      "function": "Transmite a carga da perna ao pé na articulação talocrural.",
      "clinical": "A mobilidade subtalar depende da relação entre tálus e calcâneo.",
      "aliases": [
        "talus"
      ]
    },
    {
      "id": "pe-plantar-cuboide",
      "name": "Cuboide",
      "group": "Tarso · mediopé",
      "x": 45,
      "y": 59,
      "description": "Osso lateral do mediopé que se articula posteriormente com o calcâneo.",
      "function": "Sustenta a coluna lateral do pé.",
      "clinical": "Possui sulco plantar para o tendão do músculo fibular longo.",
      "aliases": [
        "cuboide"
      ]
    },
    {
      "id": "pe-plantar-navicular",
      "name": "Navicular",
      "group": "Tarso · mediopé",
      "x": 60,
      "y": 60,
      "description": "Osso medial do tarso localizado à frente da cabeça do tálus.",
      "function": "Integra o arco longitudinal medial.",
      "clinical": "Sua tuberosidade serve de inserção ao tendão do tibial posterior.",
      "aliases": [
        "navicular"
      ]
    },
    {
      "id": "pe-plantar-cuneiforme",
      "name": "Cuneiforme medial",
      "group": "Tarso · mediopé",
      "x": 60,
      "y": 51,
      "description": "Um dos três cuneiformes; articula-se com a base do primeiro metatarso.",
      "function": "Sustenta o primeiro raio e o arco longitudinal medial.",
      "clinical": "Sua articulação com o primeiro metatarso contribui à estabilidade da coluna medial.",
      "aliases": [
        "cuneiforme medial"
      ]
    },
    {
      "id": "pe-plantar-primeiro-meta",
      "name": "Primeiro metatarso",
      "group": "Metatarso",
      "x": 60,
      "y": 38,
      "description": "Osso longo entre o cuneiforme medial e a base do hálux.",
      "function": "Contribui para a transferência de carga no antepé.",
      "clinical": "Sua cabeça participa da articulação metatarsofalângica do hálux.",
      "aliases": [
        "metatarso 1"
      ]
    },
    {
      "id": "pe-plantar-quinto-meta",
      "name": "Quinto metatarso",
      "group": "Metatarso",
      "x": 35,
      "y": 40,
      "description": "Metatarso lateral que conduz à base do quinto dedo.",
      "function": "Ajuda na sustentação da borda lateral do antepé.",
      "clinical": "A tuberosidade de sua base é uma referência comum em lesões por inversão.",
      "aliases": [
        "metatarso 5"
      ]
    },
    {
      "id": "pe-plantar-falanges",
      "name": "Falanges dos dedos II–V",
      "group": "Dedos",
      "x": 43,
      "y": 18,
      "description": "Falanges do segundo ao quinto dedo vistas pela face plantar.",
      "function": "Contribuem para o equilíbrio e a fase final do apoio durante a marcha.",
      "clinical": "Cada dedo II–V possui, em geral, falanges proximal, média e distal.",
      "aliases": [
        "falanges"
      ]
    },
    {
      "id": "pe-plantar-sesamoides",
      "name": "Sesamoides do hálux",
      "group": "Hálux",
      "x": 61,
      "y": 28,
      "description": "Pequenos ossos geralmente presentes sob a cabeça do primeiro metatarso.",
      "function": "Melhoram a alavanca dos tendões flexores do hálux.",
      "clinical": "Sobrecarga da região pode causar sesamoidite.",
      "aliases": [
        "sesamoides"
      ]
    }
  ]
},
{
  "id": "pe-medial",
  "title": "Pé direito — vista medial",
  "short": "Vista medial",
  "subtitle": "Explore a coluna medial do pé, o arco longitudinal e as estruturas do retropé.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/b/b4/202111_Medial_view_of_bones_of_right_foot.svg",
  "source": "https://commons.wikimedia.org/wiki/File:202111_Medial_view_of_bones_of_right_foot.svg",
  "credit": "DataBase Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações didáticas do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica sem legendas: vista medial do pé humano",
  "spots": [
    {
      "id": "pe-medial-calcaneo",
      "name": "Calcâneo",
      "group": "Retropé",
      "x": 87,
      "y": 54,
      "description": "Maior osso tarsal, situado atrás e abaixo do tálus.",
      "function": "Forma o calcanhar e transmite carga ao solo.",
      "clinical": "A tuberosidade posterior recebe o tendão de Aquiles.",
      "aliases": [
        "calcaneo"
      ]
    },
    {
      "id": "pe-medial-talus",
      "name": "Tálus",
      "group": "Retropé",
      "x": 77,
      "y": 40,
      "description": "Osso localizado acima do calcâneo e abaixo da tíbia.",
      "function": "Integra a articulação talocrural e transmite carga ao retropé.",
      "clinical": "Sua cabeça se articula anteriormente com o navicular.",
      "aliases": [
        "talus"
      ]
    },
    {
      "id": "pe-medial-navicular",
      "name": "Navicular",
      "group": "Mediopé",
      "x": 64,
      "y": 47,
      "description": "Osso anterior ao tálus na coluna medial.",
      "function": "Contribui para o arco longitudinal medial.",
      "clinical": "A tuberosidade do navicular é referência para o tibial posterior.",
      "aliases": [
        "navicular"
      ]
    },
    {
      "id": "pe-medial-cuneiforme",
      "name": "Cuneiforme medial",
      "group": "Mediopé",
      "x": 54,
      "y": 47,
      "description": "Osso entre o navicular e a base do primeiro metatarso.",
      "function": "Sustenta a coluna medial do pé.",
      "clinical": "Participa da articulação tarsometatarsal do primeiro raio.",
      "aliases": [
        "cuneiforme medial"
      ]
    },
    {
      "id": "pe-medial-primeiro-meta",
      "name": "Primeiro metatarso",
      "group": "Antepé",
      "x": 38,
      "y": 51,
      "description": "Osso longitudinal do antepé ligado ao hálux.",
      "function": "Participa da propulsão e transferência de carga no passo.",
      "clinical": "É um elemento-chave da estabilidade do primeiro raio.",
      "aliases": [
        "metatarso 1"
      ]
    },
    {
      "id": "pe-medial-halux",
      "name": "Falange proximal do hálux",
      "group": "Dedos",
      "x": 19,
      "y": 60,
      "description": "Primeira falange do dedo maior do pé, vista de perfil.",
      "function": "Contribui para a movimentação do hálux durante a marcha.",
      "clinical": "Relaciona-se à articulação metatarsofalângica do primeiro dedo.",
      "aliases": [
        "halux",
        "dedao"
      ]
    }
  ]
},
{
  "id": "pe-lateral",
  "title": "Pé direito — vista lateral",
  "short": "Vista lateral",
  "subtitle": "Reconheça o calcâneo, o tálus e os ossos que sustentam a coluna lateral do pé.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/0/01/202111_Lateral_view_of_bones_of_right_foot.svg",
  "source": "https://commons.wikimedia.org/wiki/File:202111_Lateral_view_of_bones_of_right_foot.svg",
  "credit": "DataBase Center for Life Science (DBCLS) / TogoPic · CC BY 4.0 · hotspots e explicações didáticas do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica sem legendas: vista lateral do pé humano",
  "spots": [
    {
      "id": "pe-lateral-calcaneo",
      "name": "Calcâneo",
      "group": "Retropé",
      "x": 14,
      "y": 53,
      "description": "Osso volumoso posterior do pé, visto lateralmente.",
      "function": "Forma a base óssea do calcanhar.",
      "clinical": "Sua tuberosidade recebe a inserção do tendão calcâneo.",
      "aliases": [
        "calcaneo"
      ]
    },
    {
      "id": "pe-lateral-talus",
      "name": "Tálus",
      "group": "Retropé",
      "x": 25,
      "y": 40,
      "description": "Osso tarsal superior ao calcâneo.",
      "function": "Recebe forças da perna por meio da articulação do tornozelo.",
      "clinical": "Articula-se inferiormente com o calcâneo.",
      "aliases": [
        "talus"
      ]
    },
    {
      "id": "pe-lateral-cuboide",
      "name": "Cuboide",
      "group": "Mediopé",
      "x": 36,
      "y": 48,
      "description": "Osso da coluna lateral anterior ao calcâneo.",
      "function": "Sustenta as articulações com os metatarsos IV e V.",
      "clinical": "O sulco plantar recebe o tendão do fibular longo.",
      "aliases": [
        "cuboide"
      ]
    },
    {
      "id": "pe-lateral-cuneiforme",
      "name": "Cuneiforme lateral",
      "group": "Mediopé",
      "x": 47,
      "y": 45,
      "description": "Um dos três ossos cuneiformes, na região anterior do tarso.",
      "function": "Contribui para a articulação com o terceiro metatarso.",
      "clinical": "Participa da estabilidade estrutural do mediopé.",
      "aliases": [
        "cuneiforme lateral"
      ]
    },
    {
      "id": "pe-lateral-base-quinto",
      "name": "Base do quinto metatarso",
      "group": "Metatarso",
      "x": 42,
      "y": 55,
      "description": "Extremidade proximal do metatarso lateral do pé.",
      "function": "Transmite carga à coluna lateral do antepé.",
      "clinical": "Sua tuberosidade recebe inserção do tendão fibular curto.",
      "aliases": [
        "tuberosidade quinto metatarso"
      ]
    },
    {
      "id": "pe-lateral-quinto-meta",
      "name": "Quinto metatarso",
      "group": "Metatarso",
      "x": 62,
      "y": 53,
      "description": "Osso longo lateral que liga o mediopé ao dedo mínimo.",
      "function": "Sustenta a borda lateral do antepé.",
      "clinical": "Pode sofrer fraturas na base ou por estresse ao longo da diáfise.",
      "aliases": [
        "metatarso 5"
      ]
    },
    {
      "id": "pe-lateral-falanges",
      "name": "Falanges do quinto dedo",
      "group": "Dedos",
      "x": 85,
      "y": 56,
      "description": "Ossos que formam o dedo mínimo na extremidade lateral do pé.",
      "function": "Auxiliam no contato com o solo e equilíbrio.",
      "clinical": "Possuem articulações interfalângicas que permitem flexão e extensão.",
      "aliases": [
        "dedo minimo"
      ]
    }
  ]
},
{
  "id": "pe-tarso",
  "title": "Pé — ossos do tarso",
  "short": "Ossos do tarso",
  "subtitle": "Ampliação dos sete ossos tarsais coloridos do pé esquerdo em vista superior.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Tarsal_bones09_superior_view.png",
  "source": "https://commons.wikimedia.org/wiki/File:Tarsal_bones09_superior_view.png",
  "credit": "Anatomography / Database Center for Life Science (DBCLS) · CC BY-SA 2.1 JP · enquadramento, hotspots e explicações do Eduverso",
  "ratio": "1 / 1",
  "alt": "Ilustração anatômica sem legendas: ossos do tarso do pé humano",
  "imageCrop": {
    "left": 17,
    "top": 45,
    "width": 20,
    "height": 39
  },
  "spots": [
    {
      "id": "pe-tarso-talus",
      "name": "Tálus",
      "group": "Retropé",
      "x": 59,
      "y": 55,
      "description": "Osso roxo localizado sobre o calcâneo, ligando a perna ao tarso.",
      "function": "Transmite forças da tíbia e fíbula para o restante do pé.",
      "clinical": "Seu corpo compõe a articulação talocrural.",
      "aliases": [
        "talus",
        "astrágalo"
      ]
    },
    {
      "id": "pe-tarso-calcaneo",
      "name": "Calcâneo",
      "group": "Retropé",
      "x": 49,
      "y": 81,
      "description": "Osso amarelo posterior e inferior do retropé.",
      "function": "Sustenta o calcanhar e recebe o tendão calcâneo.",
      "clinical": "A tuberosidade calcânea é relevante na marcha e corrida.",
      "aliases": [
        "calcaneo"
      ]
    },
    {
      "id": "pe-tarso-navicular",
      "name": "Navicular",
      "group": "Mediopé",
      "x": 54,
      "y": 29,
      "description": "Osso vermelho situado entre o tálus e os cuneiformes.",
      "function": "Participa do arco longitudinal medial.",
      "clinical": "A tuberosidade navicular recebe inserção do tendão tibial posterior.",
      "aliases": [
        "navicular"
      ]
    },
    {
      "id": "pe-tarso-cuboide",
      "name": "Cuboide",
      "group": "Mediopé",
      "x": 18,
      "y": 35,
      "description": "Osso azul lateral anterior ao calcâneo.",
      "function": "Integra a coluna lateral do pé.",
      "clinical": "Possui sulco para o tendão do fibular longo.",
      "aliases": [
        "cuboide"
      ]
    },
    {
      "id": "pe-tarso-cuneiforme-medial",
      "name": "Cuneiforme medial",
      "group": "Mediopé",
      "x": 59,
      "y": 13,
      "description": "Cuneiforme verde do lado do primeiro metatarso.",
      "function": "Integra o primeiro raio do pé.",
      "clinical": "Articula-se com o navicular e o primeiro metatarso.",
      "aliases": [
        "cuneiforme medial"
      ]
    },
    {
      "id": "pe-tarso-cuneiforme-inter",
      "name": "Cuneiforme intermédio",
      "group": "Mediopé",
      "x": 41,
      "y": 18,
      "description": "Osso cuneiforme central do grupo anterior ao navicular.",
      "function": "Articula-se com a base do segundo metatarso.",
      "clinical": "É o menor dos três cuneiformes.",
      "aliases": [
        "cuneiforme intermedio"
      ]
    },
    {
      "id": "pe-tarso-cuneiforme-lateral",
      "name": "Cuneiforme lateral",
      "group": "Mediopé",
      "x": 25,
      "y": 20,
      "description": "Cuneiforme lateral que conecta o navicular a metatarsos adjacentes.",
      "function": "Contribui para a estabilidade do mediopé.",
      "clinical": "Articula-se principalmente com o terceiro metatarso.",
      "aliases": [
        "cuneiforme lateral"
      ]
    }
  ]
}
];
export const footViewIds=new Set(footViews.map(view=>view.id));
export const footViewIsValid=(id:string|null):boolean=>id!==null&&footViewIds.has(id);
