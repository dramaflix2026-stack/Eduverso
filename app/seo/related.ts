import {articles,tools} from "./catalog";
const normalize=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const tokens=(s:string)=>new Set(normalize(s).split(/[^a-z0-9]+/).filter(x=>x.length>=4&&!["como","para","sobre","entre","calcular","exemplos","ferramenta","estudar","estudo","exercicios"].includes(x)));
const overlap=(a:Set<string>,b:Set<string>)=>[...a].filter(x=>b.has(x)).length;
type A=typeof articles[number];type T=typeof tools[number];
export function relatedArticles(a:A,limit=5){const terms=tokens(a.title+" "+a.description);return articles.filter(x=>x.slug!==a.slug).map(x=>({x,score:Number(x.tool===a.tool)*12+Number(x.category===a.category)*5+overlap(terms,tokens(x.title+" "+x.description))*2})).sort((a,b)=>b.score-a.score||a.x.slug.localeCompare(b.x.slug)).slice(0,limit).map(v=>v.x)}
export function guidesForTool(t:T,limit=6){return articles.filter(a=>a.tool===t.slug).sort((a,b)=>Number(b.slug===t.article)-Number(a.slug===t.article)).slice(0,limit)}
export function relatedTools(t:T,limit=8){const terms=tokens(t.name+" "+t.description);return tools.filter(x=>x.slug!==t.slug).map(x=>({x,score:Number(x.category===t.category)*10+overlap(terms,tokens(x.name+" "+x.description))*2})).sort((a,b)=>b.score-a.score||a.x.slug.localeCompare(b.x.slug)).slice(0,limit).map(v=>v.x)}
