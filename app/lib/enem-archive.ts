/** Catálogo ENEM montado a partir das páginas OFICIAIS por ano do Inep.
 * Não pressupõe cores idênticas entre anos, nem inventa gabaritos ausentes.
 */
export const ENEM_BASE="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos";
export type EnemFile={id:string;kind:"prova"|"gabarito";label:string;url:string};
export type EnemBook={id:string;day:number|null;number:number|null;color:string;application:string;special:string|null;documents:EnemFile[]};
export type EnemCatalog={year:number;source:string;books:EnemBook[];warning?:string};

const colors=["Amarelo","Azul","Branco","Verde","Rosa","Cinza","Laranja","Roxo","Marrom","Preto","Vermelho"];
const colorRx=colors.join("|");
const norm=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const decode=(value:string)=>value.replace(/&nbsp;|&#160;/gi," ").replace(/&ndash;|&#8211;/gi,"–").replace(/&mdash;|&#8212;/gi,"—")
 .replace(/&ordm;|&#186;/gi,"º").replace(/&amp;/gi,"&").replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'")
 .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const plain=(value:string)=>decode(value.replace(/<script\b[\s\S]*?<\/script>/gi," ").replace(/<style\b[\s\S]*?<\/style>/gi," ")
 .replace(/<[^>]*>/g," ")).replace(/\s+/g," ").trim();

export function isOfficialEnemDocument(value:string):boolean{
 try{
  const u=new URL(value);
  return u.protocol==="https:"&&(
   (u.hostname==="download.inep.gov.br"&&u.pathname.includes("/enem/")&&/\.pdf$/i.test(u.pathname))||
   (u.hostname==="www.gov.br"&&u.pathname.includes("/inep/")&&(/\.pdf$/i.test(u.pathname)||u.pathname.includes("@@download/")))||
   (u.hostname==="fep.if.usp.br"&&u.pathname.startsWith("/~profis/arquivo/avaliacao/enem/provas_gabaritos/")&&/\.pdf$/i.test(u.pathname))
  );
 }catch{return false;}
}
function findHeader(html:string,anchorIndex:number){
 const from=Math.max(0,anchorIndex-3500);
 const context=plain(html.slice(from,anchorIndex));
 const full=new RegExp("([12])\\s*(?:º|°|o)?\\s*Dia\\s*[-–—]\\s*Caderno\\s*(\\d+)\\s*[-–—]\\s*("+colorRx+")","gi");
 const legacy=new RegExp("Caderno\\s+("+colorRx+")","gi");
 let last:{pos:number;day:number|null;book:number|null;color:string;end:number}|null=null;
 for(const match of context.matchAll(full)){
  const pos=match.index||0;
  if(!last||pos>=last.pos)last={pos,day:Number(match[1]),book:Number(match[2]),color:match[3],end:pos+match[0].length};
 }
 for(const match of context.matchAll(legacy)){
  const pos=match.index||0;
  if(!last||pos>=last.pos)last={pos,day:null,book:null,color:match[1],end:pos+match[0].length};
 }
 if(!last)return null;
 // O complemento entre o nome do caderno e o arquivo indica aplicação e acessibilidade.
 const tail=context.slice(last.end).slice(0,200);
 const app=/reaplica[cç][aã]o|ppl/i.test(tail)?"Reaplicação/PPL":
  /2\s*[ªa]\s*aplica[cç][aã]o|segunda aplica[cç][aã]o/i.test(tail)?"Segunda aplicação":"Aplicação regular";
 const special=/ledor|braile|libras|atendimento especializado/i.test(tail)
  ?(/ledor|braile|libras|atendimento especializado/i.exec(tail)?.[0]||"Atendimento especial"):null;
 return {day:last.day,number:last.book,color:last.color[0].toUpperCase()+last.color.slice(1).toLowerCase(),application:app,special};
}
function manual2025(year:number):EnemBook[]{
 if(year!==2025)return [];
 const pairs:[number,number,string][]=[[1,1,"Azul"],[1,2,"Amarelo"],[1,3,"Branco"],[1,4,"Verde"],[2,5,"Amarelo"],[2,6,"Cinza"],[2,7,"Azul"],[2,8,"Verde"]];
 return pairs.map(([day,number,color])=>{
  const id="regular-"+day+"-"+number+"-"+norm(color);
  const source="https://download.inep.gov.br/enem/provas_e_gabaritos/";
  return {id,day,number,color,application:"Aplicação regular",special:null,documents:[
   {id:id+"-prova",kind:"prova",label:"Prova",url:source+year+"_PV_impresso_D"+day+"_CD"+number+".pdf"},
   {id:id+"-gabarito",kind:"gabarito",label:"Gabarito",url:source+year+"_GB_impresso_D"+day+"_CD"+number+".pdf"}
  ]};
 });
}
export function parseEnemArchive(html:string,year:number):EnemCatalog{
 const source=ENEM_BASE+"/"+year;
 const books=new Map<string,EnemBook>();
 const anchors=/<a\b[^>]*href\s*=\s*(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/a\s*>/gi;
 for(const anchor of html.matchAll(anchors)){
  const label=plain(anchor[3]);
  const kind=/^gabarito\b/i.test(label)?"gabarito":/^prova\b/i.test(label)?"prova":null;
  if(!kind)continue;
  let url="";
  try{url=new URL(decode(anchor[1]||anchor[2]),source).href;}catch{continue;}
  if(!isOfficialEnemDocument(url)||!url.includes(String(year)))continue;
  const heading=findHeader(html,anchor.index||0);
  if(!heading)continue;
  const key=[heading.application,heading.day||0,heading.number||0,norm(heading.color),norm(heading.special||"")].join("-");
  if(!books.has(key))books.set(key,{id:key,...heading,documents:[]});
  const group=books.get(key)!;
  const variant=/ampliad|ledor|superampliad|nvda|dosvox|adaptad|especializad/i.test(label)
   ?label:"";
  if(group.documents.some(file=>file.url===url))continue;
  group.documents.push({id:key+"-"+norm(kind+"-"+(variant||"padrao"))+"-"+group.documents.length,
   kind,label:variant||(kind==="prova"?"Prova":"Gabarito"),url});
  const added=group.documents[group.documents.length-1];
  added.label=variant|| (kind==="prova"?"Prova":"Gabarito");
 }
 let found=[...books.values()];
 // A página oficial às vezes usa URLs fora do domínio de download;
 // nesse caso o único fallback conhecido e identificado é 2025.
 if(!found.length&&year===2025)found=manual2025(year);
 found.sort((a,b)=>{
  const n=(x:EnemBook)=>x.application==="Aplicação regular"?0:x.application==="Segunda aplicação"?1:2;
  return n(a)-n(b)||(a.day||1)-(b.day||1)||(a.number||0)-(b.number||0);
 });
 return {year,source,books:found,warning:!found.length?"O acervo oficial não retornou documentos PDF identificáveis para este ano.":undefined};
}

/** Cópias históricas dos exames e gabaritos, preservadas pelo Instituto de Física da USP.
 * Os nomes abaixo foram verificados no índice público de cada edição.
 */
const USP_ARCHIVE="https://fep.if.usp.br/~profis/arquivo/avaliacao/enem/provas_gabaritos/";
function uspDocument(year:number,kind:"prova"|"gabarito",color:string,day?:number):EnemFile{
 const colorCode=({Amarelo:"AMARELA",Azul:"AZUL",Branco:"BRANCA",Rosa:"ROSA",Cinza:"CINZA"} as Record<string,string>)[color];
 const prefix=year===2010?
  "PROVA_ENEM_"+year+"_"+colorCode+"_"+day+"D"+(kind==="gabarito"?"_GAB":""):
  (kind==="gabarito"?"GABARITO":"PROVA")+"_ENEM_"+year+"_"+colorCode;
 return {id:"usp-"+year+"-"+kind+"-"+color.toLowerCase()+"-"+(day||0),kind,label:kind==="prova"?"Prova":"Gabarito",
  url:USP_ARCHIVE+year+"/"+prefix+".pdf"};
}
function enrichHistorics(catalog:EnemCatalog):EnemCatalog{
 const year=catalog.year;
 if(year<1998||year>2010||year===2009)return catalog;
 const books=catalog.books.map(book=>({...book,documents:[...book.documents]}));
 if(year<=2006){
  let book=books.find(b=>b.color==="Amarelo");
  if(!book){book={id:"historic-"+year+"-amarelo",day:null,number:null,color:"Amarelo",
   application:"Aplicação regular",special:null,documents:[]};books.push(book);}
  if(!book.documents.some(f=>f.kind==="prova"))book.documents.push(uspDocument(year,"prova","Amarelo"));
  if(!book.documents.some(f=>f.kind==="gabarito"))book.documents.push(uspDocument(year,"gabarito","Amarelo"));
 }
 if(year===2007||year===2008){
  for(const color of ["Amarelo","Azul","Branco","Rosa"]){
   let book=books.find(b=>b.color===color);
   if(!book){book={id:"historic-"+year+"-"+color.toLowerCase(),day:null,number:null,color,
    application:"Aplicação regular",special:null,documents:[]};books.push(book);}
   if(!book.documents.some(f=>f.kind==="prova"))book.documents.push(uspDocument(year,"prova",color));
   if(!book.documents.some(f=>f.kind==="gabarito"))book.documents.push(uspDocument(year,"gabarito",color));
  }
 }
 if(year===2010){
  const pairs:[number,string][]=[[1,"Amarelo"],[1,"Azul"],[1,"Branco"],[1,"Rosa"],
   [2,"Amarelo"],[2,"Azul"],[2,"Cinza"],[2,"Rosa"]];
  for(const [day,color] of pairs){
   let book=books.find(b=>b.day===day&&b.color===color&&b.application==="Aplicação regular");
   if(!book){book={id:"usp-2010-"+day+"-"+color.toLowerCase(),day,number:null,color,
    application:"Aplicação regular",special:null,documents:[]};books.push(book);}
   if(!book.documents.some(f=>f.kind==="prova"))book.documents.push(uspDocument(year,"prova",color,day));
   if(!book.documents.some(f=>f.kind==="gabarito"))book.documents.push(uspDocument(year,"gabarito",color,day));
  }
 }
 books.sort((a,b)=>(a.day||1)-(b.day||1)||a.color.localeCompare(b.color,"pt-BR"));
 return {...catalog,books};
}
export async function getEnemCatalog(year:number):Promise<EnemCatalog>{
 if(!Number.isInteger(year)||year<1998||year>2026)throw Error("Ano do ENEM inválido");
 const source=ENEM_BASE+"/"+year;
 try{
  const response=await fetch(source,{signal:AbortSignal.timeout(18000),next:{revalidate:21600},headers:{"Accept":"text/html","User-Agent":"Mozilla/5.0 (compatible; Eduverso/1.0; +https://eduverso-web-production.up.railway.app)"}});
  if(!response.ok)throw Error("Falha HTTP "+response.status);
  const html=await response.text();
  const catalog=parseEnemArchive(html,year);
  if(catalog.books.length)return enrichHistorics(catalog);
  if(year!==2025)return enrichHistorics(catalog);
 }catch{/* Os documentos de 2025 já possuem URLs oficiais conhecidas. */}
 if(year===2025)return {year,source,books:manual2025(year)};
 return enrichHistorics({year,source,books:[],warning:"O catálogo do Inep está indisponível. Os arquivos históricos podem estar disponíveis no acervo da USP."});
}
