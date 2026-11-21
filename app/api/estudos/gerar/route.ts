import {NextRequest,NextResponse} from "next/server";
import {authenticate,hasPaidAccess,sameOrigin} from "../../../lib/eduverso-auth";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const attempts=new Map<string,{start:number,count:number}>();
function reply(error:string,status=503){return NextResponse.json({error},{status,headers:{"Cache-Control":"no-store"}});}
export async function POST(req:NextRequest){
 if(!sameOrigin(req))return reply("Origem não autorizada.",403);
 if(process.env.EDUVERSO_AI_ENABLED!=="true")return reply("A geração por IA ainda não está ativada.",503);
 const apiKey=process.env.EDUVERSO_AI_API_KEY,endpoint=process.env.EDUVERSO_AI_CHAT_COMPLETIONS_URL,model=process.env.EDUVERSO_AI_MODEL;
 if(!apiKey||!endpoint||!model)return reply("Provedor de IA não configurado.",503);
 let aiUrl:URL;try{aiUrl=new URL(endpoint);if(aiUrl.protocol!=="https:")throw Error("invalid");}catch{return reply("Endpoint de IA inválido.",503);}
 let session;try{session=await authenticate(req);}catch{return reply("Não foi possível validar sua conta.",503);}
 if(!session)return reply("Faça login para gerar novo material por IA.",401);
 if(process.env.EDUVERSO_REQUIRE_PURCHASE==="true"&&!(await hasPaidAccess(session)))return reply("Plano ativo necessário para usar IA.",403);
 const now=Date.now(),old=attempts.get(session.user.id);
 if(old&&now-old.start<3600000&&old.count>=5)return reply("Limite temporário de gerações atingido.",429);
 if(!old||now-old.start>=3600000)attempts.set(session.user.id,{start:now,count:1});
 else attempts.set(session.user.id,{start:old.start,count:old.count+1});
 let input:unknown;try{input=await req.json()}catch{return reply("Requisição inválida.",400);}
 if(!input||typeof input!=="object")return reply("Dados inválidos.",400);
 const data=input as Record<string,unknown>;
 if(!["subject","topic","title","material"].every(k=>typeof data[k]==="string"))return reply("Dados incompletos.",400);
 const subject=String(data.subject).slice(0,80),topic=String(data.topic).slice(0,120),title=String(data.title).slice(0,160),material=String(data.material).slice(0,6000);
 if(!subject||!topic||!material)return reply("Informe conteúdo para revisão.",400);
 try{
  const response=await fetch(aiUrl.toString(),{
   method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+apiKey},
   body:JSON.stringify({model,temperature:0.45,max_tokens:1800,messages:[
    {role:"system",content:"Você é um professor didático do Eduverso. Produza em português brasileiro um MATERIAL NOVO DE REVISÃO, derivado APENAS do conteúdo-base fornecido, sem inventar referências, fontes, provas oficiais ou alegar fatos não confirmados. Estruture com: Objetivos de aprendizagem; Explicação aprofundada; Dois exemplos comentados; Erros frequentes; Resumo de revisão; Cinco perguntas de autoavaliação com respostas ao final. Seja rigoroso matematicamente. Se faltar base factual para exemplos, explicite a limitação. Identifique o resultado como material gerado por IA, sujeito a verificação."},
    {role:"user",content:`Disciplina: ${subject}\nTema: ${topic}\nAula: ${title}\nMaterial-base: ${material}`}
   ]}),signal:AbortSignal.timeout(30000),cache:"no-store"
  });
  if(!response.ok)return reply("O provedor de IA não concluiu a geração.",502);
  const result=await response.json();
  const content=result?.choices?.[0]?.message?.content;
  if(typeof content!=="string"||!content.trim())return reply("O provedor retornou material vazio.",502);
  const res=NextResponse.json({material:content.slice(0,18000),generatedByAI:true},{headers:{"Cache-Control":"private, no-store"}});
  return res;
 }catch{return reply("A geração por IA não respondeu. Tente novamente.",502);}
}
