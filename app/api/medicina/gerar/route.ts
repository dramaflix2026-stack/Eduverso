import {NextRequest,NextResponse} from "next/server";
import {getMedDiscipline,getMedTopic} from "../../../medicine-curriculum";
export const runtime="nodejs";
const attemptWindowMs=60*60*1000;
const attemptLimit=8;
const usage=new Map<string,{start:number,count:number}>();
type Task="aprofundar"|"questoes"|"revisao";
const tasks:Record<Task,string>={
 aprofundar:"Crie uma explicação universitária progressiva, usando conceitos, mecanismos, exemplo aplicado e uma pequena autoavaliação.",
 questoes:"Crie quatro questões DIDÁTICAS INÉDITAS de múltipla escolha com três alternativas, gabarito e justificativa. Nunca afirme que são oficiais.",
 revisao:"Crie um roteiro de revisão com principais conceitos, diferenças frequentes, analogia cuidadosa e três perguntas com gabarito."
};
function json(data:unknown,status=200){return NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}})}
export async function GET(){
 return json({enabled:process.env.EDUVERSO_AI_ENABLED==="true"&&!!process.env.EDUVERSO_AI_API_KEY&&!!process.env.EDUVERSO_AI_CHAT_COMPLETIONS_URL&&!!process.env.NEXT_PUBLIC_SUPABASE_URL&&!!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,requiresAuthentication:true});
}
export async function POST(req:NextRequest){
 if(process.env.EDUVERSO_AI_ENABLED!=="true")return json({error:"A IA ainda não está habilitada no Eduverso."},503);
 const key=process.env.EDUVERSO_AI_API_KEY,url=process.env.EDUVERSO_AI_CHAT_COMPLETIONS_URL,model=process.env.EDUVERSO_AI_MODEL;
 const authUrl=process.env.NEXT_PUBLIC_SUPABASE_URL,publicKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!key||!url||!model||!authUrl||!publicKey)return json({error:"Integração de IA e autenticação ainda não configuradas."},503);
 let endpoint:URL;
 try{endpoint=new URL(url);if(endpoint.protocol!=="https:")throw new Error("Endpoint inválido");}catch{return json({error:"Configuração do provedor de IA inválida."},503)}
 const bearer=req.headers.get("authorization")??"";
 if(!bearer.startsWith("Bearer ")||bearer.length<30)return json({error:"É necessário entrar em sua conta para usar a IA."},401);
 let userId:string;
 try{
  const response=await fetch(new URL("/auth/v1/user",authUrl),{headers:{"apikey":publicKey,"authorization":bearer},signal:AbortSignal.timeout(7000),cache:"no-store"});
  if(!response.ok)return json({error:"Sua sessão não foi validada."},401);
  const user=await response.json();
  if(!user||typeof user.id!=="string")return json({error:"Usuário não identificado."},401);
  userId=user.id;
 }catch{return json({error:"Não foi possível validar sua sessão."},503)}
 const now=Date.now();const item=usage.get(userId);
 if(item&&now-item.start<attemptWindowMs&&item.count>=attemptLimit)return json({error:"Limite temporário de gerações atingido. Tente novamente mais tarde."},429);
 if(!item||now-item.start>=attemptWindowMs)usage.set(userId,{start:now,count:1});else usage.set(userId,{start:item.start,count:item.count+1});
 const contentLength=Number(req.headers.get("content-length")??"0");
 if(contentLength>4096)return json({error:"Solicitação muito grande."},413);
 let body:unknown;try{body=await req.json()}catch{return json({error:"JSON inválido."},400)}
 if(!body||typeof body!=="object")return json({error:"Conteúdo inválido."},400);
 const params=body as Record<string,unknown>;
 if(typeof params.discipline!=="string"||typeof params.topic!=="string"||typeof params.task!=="string")return json({error:"Parâmetros incompletos."},400);
 const discipline=getMedDiscipline(params.discipline);const topic=getMedTopic(params.discipline,params.topic);
 if(!discipline||!topic)return json({error:"Assunto não encontrado."},404);
 if(!Object.prototype.hasOwnProperty.call(tasks,params.task))return json({error:"Tipo de geração não permitido."},400);
 const task=params.task as Task;
 const system="Você é um assistente para estudantes adultos de graduação em Medicina no Brasil. Produza conteúdo acadêmico em português claro, detalhado e didático. NÃO oriente procedimentos invasivos, prescreva medicamentos, proponha doses, diagnostique um paciente real nem substitua diretrizes clínicas atuais. Separe teoria de exemplos e questões. Não invente provas oficiais, bibliografia ou referências verificáveis que não recebeu. Identifique o material como gerado por IA e incentive conferência em livros e protocolos atualizados.";
 const user=`Disciplina: ${discipline.title}. Tema: ${topic.name}. Material-base editorial: ${topic.theory}\nExemplo-base: ${topic.example}\nTarefa: ${tasks[task]}`;
 try{
  const response=await fetch(endpoint.toString(),{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},body:JSON.stringify({model,messages:[{role:"system",content:system},{role:"user",content:user}],max_tokens:1400,temperature:0.45}),signal:AbortSignal.timeout(25000),cache:"no-store"});
  if(!response.ok)return json({error:"O provedor de IA não concluiu a geração."},502);
  const result=await response.json();
  const text=result?.choices?.[0]?.message?.content;
  if(typeof text!=="string"||!text.trim())return json({error:"Resposta vazia do provedor."},502);
  return json({text:text.slice(0,12000),generatedByAI:true,disclaimer:"Material gerado por IA: revise criticamente e confirme com fontes médicas confiáveis."});
 }catch{return json({error:"Tempo de resposta da IA excedido ou falha de conexão."},502)}
}
