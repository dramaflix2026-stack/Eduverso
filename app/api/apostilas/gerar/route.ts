import {NextRequest,NextResponse} from "next/server";
import {authenticate,authResponse,getPaidPlan,sameOrigin} from "../../../lib/eduverso-auth";
import type {PdfDocumentRequest,PdfSection} from "../../../lib/lesson-pdf";

export const dynamic="force-dynamic";
export const maxDuration=120;

// Disabled until the project owner explicitly enables the paid AI provider.
function configured(){
 return process.env.EDUVERSO_AI_ENABLED==="true"&&Boolean(process.env.EDUVERSO_AI_API_KEY);
}
export async function GET(){
 return NextResponse.json({available:configured()},{headers:{"Cache-Control":"no-store"}});
}

type ContentPage={heading:string;paragraphs:string[]};
type Activity={question:string;answer:string};
type Draft={pages:ContentPage[];activities:Activity[]};
const LENGTHS=new Set([3,5,8,10]);
const uniqueWords=(value:string)=>value.trim().split(/\s+/).filter(Boolean).length;
const clean=(value:string,max=8000)=>value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g," ").trim().slice(0,max);
const fileSafe=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,54)||"estudos";

// Local safety throttle is supplemental; a durable per-account usage quota is
// required before broad public enablement across multiple service replicas.
const inFlight=new Set<string>();
const counts=new Map<string,{used:number,resetAt:number}>();
function claim(id:string){
 const now=Date.now();
 const record=counts.get(id);
 if(inFlight.has(id))return false;
 if(record&&record.resetAt>now&&record.used>=4)return false;
 counts.set(id,{used:(record&&record.resetAt>now?record.used:0)+1,resetAt:record&&record.resetAt>now?record.resetAt:now+24*60*60*1000});
 inFlight.add(id);return true;
}

function validDraft(raw:unknown,count:number,format:string):Draft{
 if(!raw||typeof raw!=="object")throw new Error("A IA não retornou uma apostila válida.");
 const item=raw as Partial<Draft>;
 if(!Array.isArray(item.pages)||item.pages.length!==count)throw new Error("A IA não entregou o número solicitado de páginas.");
 const paragraphsSeen=new Set<string>(),headings=new Set<string>();
 for(const [index,page] of item.pages.entries()){
  if(!page||typeof page.heading!=="string"||page.heading.trim().length<7||page.heading.trim().length>110||
    !Array.isArray(page.paragraphs)||page.paragraphs.length<4||page.paragraphs.length>6||
    page.paragraphs.some(p=>typeof p!=="string"||uniqueWords(p)<45||uniqueWords(p)>125))
   throw new Error("A página "+(index+1)+" não atingiu o padrão de aprofundamento.");
  const wordCount=page.paragraphs.reduce((n,p)=>n+uniqueWords(p),0);
  if(wordCount<255||wordCount>390)throw new Error("A página "+(index+1)+" não tem a densidade didática adequada.");
  const heading=page.heading.trim().toLocaleLowerCase("pt-BR");
  if(headings.has(heading))throw new Error("A IA repetiu um capítulo.");
  headings.add(heading);
  for(const paragraph of page.paragraphs){
   const normalized=paragraph.trim().toLocaleLowerCase("pt-BR");
   if(paragraphsSeen.has(normalized))throw new Error("A IA repetiu explicações.");
   paragraphsSeen.add(normalized);
  }
 }
 if(!Array.isArray(item.activities)||item.activities.length>8||
   item.activities.some(a=>!a||typeof a.question!=="string"||typeof a.answer!=="string"))
  throw new Error("O material de atividades retornou dados inválidos.");
 if(format==="com-atividades"&&(item.activities.length<3||item.activities.some(a=>uniqueWords(a.answer)<25)))
  throw new Error("As atividades precisam de gabarito comentado.");
 return {pages:item.pages,activities:item.activities};
}

const responseSchema={
 type:"object",
 properties:{
  pages:{type:"array",items:{type:"object",properties:{heading:{type:"string"},paragraphs:{type:"array",items:{type:"string"}}},required:["heading","paragraphs"],additionalProperties:false}},
  activities:{type:"array",items:{type:"object",properties:{question:{type:"string"},answer:{type:"string"}},required:["question","answer"],additionalProperties:false}}
 },
 required:["pages","activities"],additionalProperties:false
};

export async function POST(request:NextRequest){
 if(!sameOrigin(request))return NextResponse.json({error:"Origem não autorizada."},{status:403});
 if(!configured())return NextResponse.json({error:"A geração aprofundada por IA ainda não foi ativada no servidor. Nenhuma apostila superficial será entregue como completa."},{status:503});
 const session=await authenticate(request).catch(()=>null);
 if(!session)return NextResponse.json({error:"Entre na sua conta para gerar a apostila."},{status:401});
 const tester=(process.env.EDUVERSO_AI_TESTER_EMAIL||"").trim().toLowerCase();
 const paid=await getPaidPlan(session).catch(()=>null);
 if(!paid&&(!tester||session.user.email?.toLowerCase()!==tester))
  return authResponse(request,{error:"A geração por IA está disponível para contas com acesso ativo."},403,session);
 if(Number(request.headers.get("content-length")||0)>16000)
  return authResponse(request,{error:"Solicitação muito grande."},413,session);
 let input:Record<string,unknown>;
 try{input=await request.json();}catch{return authResponse(request,{error:"Dados inválidos."},400,session);}
 const subject=typeof input.subject==="string"?clean(input.subject,90):"";
 const topic=typeof input.topic==="string"?clean(input.topic,110):"";
 const pageCount=typeof input.pageCount==="number"?input.pageCount:0;
 const format=input.format==="com-atividades"?"com-atividades":"teoria";
 const level=typeof input.level==="string"?clean(input.level,60):"Ensino Médio";
 const chapters=Array.isArray(input.chapters)?input.chapters.filter((v):v is string=>typeof v==="string").slice(0,20).map(v=>clean(v,90)):[];
 if(subject.length<2||topic.length<2||!LENGTHS.has(pageCount)||chapters.join("").length>1800)
  return authResponse(request,{error:"Escolha uma matéria, um assunto e uma extensão válidos."},400,session);
 if(!claim(session.user.id))return authResponse(request,{error:"Limite temporário de geração atingido. Tente novamente mais tarde."},429,session);
 try{
  const instructions=[
   "Você é um professor e editor pedagógico brasileiro rigoroso, especialista em conteúdos escolares, vestibulares, concursos e ensino superior.",
   "Produza uma apostila DIDÁTICA E APROFUNDADA em português brasileiro para o tema solicitado. NÃO crie resumos ou definições de uma linha.",
   "Entregue EXATAMENTE "+pageCount+" páginas de teoria, cada página com título próprio e 4 ou 5 parágrafos coesos.",
   "Cada página deve conter entre 290 e 345 palavras, distribuídas em parágrafos de 55 a 100 palavras. Nunca preencha espaço repetindo conceitos.",
   "Distribua os temas de modo progressivo: conceitos e distinções, mecanismos e causas, características e comparações, exemplos concretos contextualizados, consequências e aplicação ao estudo.",
   "Cada página precisa apresentar pelo menos um exemplo específico inteiramente explicado com raciocínio passo a passo dentro dos parágrafos.",
   "Escreva em prosa clara, com termos técnicos explicados quando surgem, nível de exigência adequado ao público. Não use explicações vagas nem frases de marketing.",
   "Quando tratar de Geografia, apresente relações espaciais, ambientais, processos históricos e exemplos do Brasil, evitando generalizações falsas.",
   "Quando tratar de Matemática e Ciências, detalhe mecanismos e etapas de resolução, com resultados coerentes e unidades corretas.",
   "Quando tratar de Medicina, trate o material como recurso introdutório educacional, sem substituir diretrizes clínicas ou formação supervisionada.",
   "Não invente estatísticas, citações, normas, datas, instituições, fontes ou questões oficiais. Não afirme que foi validado pelo MEC, Inep ou por bancas.",
   "Nenhuma página deve repetir a explicação de outra. Evite conclusões e introduções vazias.",
   ...(subject.toLocaleLowerCase("pt-BR").includes("geografia")&&/bioma|vegetação|vegetacao/i.test(topic)?[
    "Para Biomas e Vegetação, desenvolva a diferença entre bioma, vegetação e ecossistema, e cubra explicitamente os SEIS biomas brasileiros: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa. Não omita Pantanal nem Pampa por limitações do catálogo original.",
    "Explique clima, regime de chuvas, tipos de vegetação, solo, adaptação de espécies, relações ecológicas, ocupação humana, impactos ambientais e proteção, com comparações fundamentadas entre biomas e exemplos concretos do Brasil."
   ]:[]),
   format==="com-atividades"?"Inclua 4 atividades autorais de fixação com respostas explicadas de pelo menos 35 palavras cada em activities.":"Devolva activities como um array vazio.",
   "Responda apenas com o JSON definido no formato de saída."
  ].join("\n");
  const prompt=[
   "Disciplina: "+subject,
   "Assunto: "+topic,
   "Nível de ensino: "+level,
   "Número de páginas teóricas obrigatórias: "+pageCount,
   "Tópicos de referência já existentes no Eduverso (use se pertinentes; não confunda títulos curtos com explicações): "+chapters.join("; "),
   "Formato: "+format
  ].join("\n");
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),100000);
  let response:Response;
  try{
   response=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",signal:controller.signal,
    headers:{"Authorization":"Bearer "+process.env.EDUVERSO_AI_API_KEY,"Content-Type":"application/json"},
    body:JSON.stringify({
     model:process.env.EDUVERSO_AI_MODEL||"gpt-4.1-mini",
     messages:[{role:"system",content:instructions},{role:"user",content:prompt}],
     response_format:{type:"json_schema",json_schema:{name:"eduverso_apostila",strict:true,schema:responseSchema}},
     max_completion_tokens:Math.min(15000,pageCount*1000+1300)
    }),
    cache:"no-store"
   });
  }finally{clearTimeout(timer);}
  if(!response.ok)throw new Error(response.status===429?"O serviço de IA está com o limite de uso atingido.":"O serviço de IA não respondeu corretamente.");
  const result=await response.json() as {choices?:Array<{message?:{content?:string;refusal?:string}}>};
  if(result.choices?.[0]?.message?.refusal)throw new Error("O serviço não conseguiu redigir este conteúdo.");
  let raw:unknown;
  try{raw=JSON.parse(result.choices?.[0]?.message?.content||"");}catch{throw new Error("O serviço de IA retornou dados incompletos.");}
  const draft=validDraft(raw,pageCount,format);
  const sections:PdfSection[]=draft.pages.map((item,i)=>({
   heading:String(i+1).padStart(2,"0")+"  "+clean(item.heading,110),
   kind:"chapter",pageBreakBefore:i>0,paragraphs:item.paragraphs.map(p=>clean(p,1900))
  }));
  if(format==="com-atividades"){
   sections.push({heading:"Atividades de fixação",kind:"chapter",pageBreakBefore:true,
    paragraphs:["Responda com suas palavras após estudar as páginas teóricas. Confira os comentários ao final."]});
   for(const [i,a] of draft.activities.entries())sections.push({heading:"Atividade "+(i+1),kind:"question",paragraphs:[clean(a.question,1300)]});
   sections.push({heading:"Gabarito comentado",kind:"chapter",pageBreakBefore:true,
    paragraphs:["Utilize as resoluções para identificar o raciocínio necessário, não somente memorizar as respostas."]});
   for(const [i,a] of draft.activities.entries())sections.push({heading:"Resposta "+(i+1),kind:"answer",paragraphs:[clean(a.answer,1800)]});
  }
  const document:PdfDocumentRequest={
   title:"Apostila de estudos - "+topic,
   subtitle:subject+" · "+pageCount+" páginas de teoria aprofundada · Conteúdo assistido por IA",
   fileName:"eduverso-apostila-aprofundada-"+fileSafe(topic)+".pdf",
   coverPage:true,
   expectedContentPages:format==="teoria"?pageCount:undefined,
   sections
  };
  return authResponse(request,{document,actualTheoryPages:pageCount,format},200,session);
 }catch(error){
  const message=error instanceof Error?error.message:"Falha ao gerar o material.";
  return authResponse(request,{error:message.startsWith("The " )?"Não foi possível gerar o material.":message},502,session);
 }finally{inFlight.delete(session.user.id);}
}
