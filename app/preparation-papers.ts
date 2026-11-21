
/** Catálogo editorial de fontes oficiais verificadas. Nunca construir URLs de prova por ano. */
export type HistoricalPaper = { title:string; year:number|null; publisher:string; url:string; kind:"acervo"|"edicao"; note?:string };
const sources:Record<string,HistoricalPaper[]>={
"usp-fuvest":[
{year:null,title:"Acervo oficial FUVEST — todas as edições",publisher:"FUVEST",url:"https://www.fuvest.br/acervo-vestibular/",kind:"acervo",note:"Escolha o ano e consulte provas e gabaritos."},
{year:2026,title:"Vestibular USP 2026 — prova e gabarito",publisher:"FUVEST",url:"https://www.fuvest.br/acervo-vestibular-2026/",kind:"edicao"},
{year:2025,title:"Vestibular USP 2025 — prova e gabarito",publisher:"FUVEST",url:"https://www.fuvest.br/acervo-vestibular-2025/",kind:"edicao"},
{year:2024,title:"Vestibular USP 2024 — prova e gabarito",publisher:"FUVEST",url:"https://www.fuvest.br/acervo-vestibular-2024/",kind:"edicao"}
],
"enem-sisu":[
{year:null,title:"ENEM — provas e gabaritos por ano",publisher:"Inep",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",kind:"acervo",note:"Consulte as edições e as cores dos cadernos no portal do Inep."}
],
"unesp":[
{year:2026,title:"Vestibular Unesp 2026 — provas e gabaritos",publisher:"Vunesp",url:"https://www.vunesp.com.br/VNSP2504",kind:"edicao"},
{year:2025,title:"Vestibular Unesp 2025 — provas e gabaritos",publisher:"Vunesp",url:"https://www.vunesp.com.br/VNSP2404",kind:"edicao"},
{year:2023,title:"Vestibular Unesp 2023 — provas e gabaritos",publisher:"Vunesp",url:"https://www.vunesp.com.br/VNSP2206/",kind:"edicao"}
],
"enare":[{year:2026,title:"ENARE 2026 — provas e gabaritos oficiais",publisher:"FGV Conhecimento / HU Brasil",url:"https://enare2026.conhecimento.fgv.br/provas/",kind:"edicao",note:"Consulte a modalidade de residência e o caderno correspondente."}],
"revalida":[
{year:null,title:"Revalida — provas e gabaritos oficiais",publisher:"Inep",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/revalida/provas-e-gabaritos",kind:"acervo"}
],
"enamed":[
{year:null,title:"Enamed — provas e gabaritos oficiais",publisher:"Inep",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enamed/provas-e-gabaritos",kind:"acervo"}
],
"oab":[
{year:null,title:"Exame de Ordem — edições, cadernos e gabaritos",publisher:"OAB / FGV Conhecimento",url:"https://oab.fgv.br/Default.aspx",kind:"acervo"}
],
"cfc":[
{year:null,title:"Histórico do Exame de Suficiência — provas e gabaritos",publisher:"CRCRS",url:"https://www.crcrs.org.br/exame-de-suficiencia/",kind:"acervo"},
{year:2026,title:"Exame de Suficiência 2026/2 — provas e gabaritos",publisher:"FGV Conhecimento",url:"https://conhecimento.fgv.br/exames/cfc/2026.2",kind:"edicao"}
]
};
/** Para graduação, utilizar o acervo do vestibular selecionado, jamais fingir que existe uma prova separada por curso. */
export function getHistoricalPapers(goalId:string,admissionId?:string):HistoricalPaper[]{
return sources[goalId==="medicina"||["direito","engenharia","odontologia","psicologia","enfermagem","veterinaria","arquitetura","computacao","administracao"].includes(goalId)?(admissionId||"enem-sisu"):goalId] ?? [];
}
export function getHistoricalCatalogCount():number{return Object.values(sources).reduce((sum,list)=>sum+list.length,0);}
