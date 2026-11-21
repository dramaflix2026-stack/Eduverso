import {NextRequest} from "next/server";
import {authenticate,authResponse,sameOrigin,supabaseRequest} from "../../lib/eduverso-auth";
export const dynamic="force-dynamic";
type Progress={area:string;subject:string;topic:string;last_visited_at:string;correct_answers:number;answered_questions:number};
export async function GET(request:NextRequest){
 try{
  const session=await authenticate(request);
  if(!session)return authResponse(request,{error:"Entre para sincronizar seu progresso."},401);
  const result=await supabaseRequest<Progress[]>("/rest/v1/eduverso_progress?select=area,subject,topic,last_visited_at,correct_answers,answered_questions&order=last_visited_at.desc&limit=20",{accessToken:session.accessToken});
  if(!result.ok)return authResponse(request,{error:"Erro ao consultar progresso."},502,session);
  return authResponse(request,{items:result.data},200,session);
 }catch{return authResponse(request,{error:"Não foi possível consultar o progresso."},503);}
}
export async function POST(request:NextRequest){
 if(!sameOrigin(request))return authResponse(request,{error:"Origem não autorizada."},403);
 try{
  const session=await authenticate(request);
  if(!session)return authResponse(request,{error:"Entre para salvar seu progresso."},401);
  const input=await request.json();
  const area=typeof input.area==="string"?input.area.trim():"geral";
  const subject=typeof input.subject==="string"?input.subject.trim():"";
  const topic=typeof input.topic==="string"?input.topic.trim():"";
  if(!area||area.length>60||!subject||subject.length>180||topic.length>180)
   return authResponse(request,{error:"Dados de estudo inválidos."},400,session);
  const value={
   user_id:session.user.id,area,subject,topic,last_visited_at:new Date().toISOString(),
   correct_answers:Number.isInteger(input.correct_answers)&&input.correct_answers>=0&&input.correct_answers<=100000?input.correct_answers:0,
   answered_questions:Number.isInteger(input.answered_questions)&&input.answered_questions>=0&&input.answered_questions<=100000?input.answered_questions:0
  };
  const res=await supabaseRequest("/rest/v1/eduverso_progress?on_conflict=user_id,area,subject,topic",{
   method:"POST",accessToken:session.accessToken,headers:{"Prefer":"resolution=merge-duplicates,return=minimal"},body:value
  });
  return authResponse(request,res.ok?{ok:true}:{error:"Não foi possível sincronizar os estudos."},res.ok?200:502,session);
 }catch{return authResponse(request,{error:"Não foi possível salvar o progresso."},503);}
}
