// Construtor editorial para expansão da primeira camada de 18 disciplinas de Medicina.
// As sementes por assunto são revisáveis e não substituem revisão médica por especialista.
import {medicineDisciplines,type MedTopic} from "./medicine-curriculum";
import type {DeepChapter,DeepQuestion} from "./medicine-anatomy-deep";
export type MedicalQuestionSeed={ask:string;right:string;wrong1:string;wrong2:string;why:string};
export type MedicalTopicSeed={
 topicId:string;mechanism:string;contrast:string;application:string;caution:string;
 terms?:[string,string][];questions?:[MedicalQuestionSeed,MedicalQuestionSeed,MedicalQuestionSeed];reference:string;
};
export type CreatedCourse={chapters:DeepChapter[];byTopic:Record<string,DeepChapter>;metrics:{modules:number;lessons:number;extraQuestions:number}};
const explanationHint="Estude o mecanismo, compare conceitos próximos e associe os exemplos às condições em que o conhecimento é válido. A conclusão sobre uma pessoa real exige contexto, avaliação e referências clínicas pertinentes.";
function buildLessonSections(topic:MedTopic,p:MedicalTopicSeed){
 return [
  {title:"Fundamentos e definições",paragraphs:[topic.theory,"Para compreender "+topic.name.toLowerCase()+", comece por reconhecer os elementos que participam do fenômeno e a sequência em que se relacionam. "+p.mechanism],bullets:[p.mechanism,p.contrast]},
  {title:"Mecanismos e relações",paragraphs:[p.mechanism,p.contrast],bullets:[p.contrast,"Compare o conceito com os fenômenos próximos antes de concluir que apresentam o mesmo mecanismo."]},
  {title:"Aplicação contextualizada",paragraphs:[topic.example,p.application],bullets:[p.application,"Identifique dados relevantes e descreva o que o cenário realmente demonstra, sem extrapolar sua finalidade."]},
  {title:"Síntese e limites da interpretação",paragraphs:[p.caution,explanationHint],bullets:[p.caution,"Uma questão didática não substitui observação real, diretrizes atualizadas ou supervisão profissional."]}
 ];
}
export function createAdvancedMedicalCourse(slug:string,seeds:MedicalTopicSeed[]):CreatedCourse{
 const d=medicineDisciplines.find(x=>x.slug===slug);
 if(!d)throw Error("Disciplina desconhecida: "+slug);
 if(d.topics.length!==seeds.length)throw Error("Número incorreto de tópicos em "+slug);
 const ids=new Set<string>();
 const chapters:DeepChapter[]=seeds.map((p,i)=>{
  const t=d.topics[i];
  if(t.id!==p.topicId||ids.has(p.topicId))throw Error("Tópicos fora de ordem ou repetidos: "+slug+" "+p.topicId);
  ids.add(p.topicId);
  if((p.questions&&p.questions.length!==3)||(p.terms&&p.terms.length<3))throw Error("Material de revisão incompleto: "+p.topicId);
  const neighborA=seeds[(i+1)%seeds.length];
  const neighborB=seeds[(i+3)%seeds.length];
  const autoQuestions:MedicalQuestionSeed[]=[
   {ask:"Qual afirmação caracteriza especificamente os mecanismos de "+t.name+"?",right:p.mechanism,wrong1:neighborA.mechanism,wrong2:neighborB.mechanism,why:"O conceito central desta etapa é: "+p.mechanism},
   {ask:"Ao comparar temas próximos, qual distinção corresponde a "+t.name+"?",right:p.contrast,wrong1:neighborA.contrast,wrong2:neighborB.contrast,why:"A distinção importante é: "+p.contrast},
   {ask:"Que interpretação está associada ao exemplo de "+t.name+"?",right:p.application,wrong1:neighborA.application,wrong2:neighborB.application,why:"A aplicação didática correspondente é: "+p.application}
  ];
  const questions:DeepQuestion[]=(p.questions??autoQuestions).map((q,j)=>{
   if([q.ask,q.right,q.wrong1,q.wrong2,q.why].some(x=>!x||x.trim().length<8)||new Set([q.right,q.wrong1,q.wrong2]).size!==3)throw Error("Alternativa inválida: "+p.topicId+"-"+j);
   const correct=(i+j)%3;
   const options=[q.wrong1,q.wrong2];options.splice(correct,0,q.right);
   return {id:p.topicId+"-extra-"+(j+1),prompt:q.ask,options,correct,explanation:q.why};
  });
  return {
   topicId:p.topicId,title:t.name,minutes:32,objectives:[
    "Identificar elementos e fundamentos de "+t.name.toLowerCase()+".",
    "Diferenciar o mecanismo e os conceitos associados ao assunto.",
    "Aplicar o raciocínio ao exemplo e reconhecer seus limites."],
   sections:buildLessonSections(t,p),
   caseStudy:t.example+" "+p.application,
   glossary:[{term:t.name,definition:t.theory},...(p.terms??[["Mecanismo principal",p.mechanism],["Distinção relevante",p.contrast],["Contexto de aplicação",p.application]]).map(([term,definition])=>({term,definition}))],
   reference:p.reference,questions
  };
 });
 return {chapters,byTopic:Object.fromEntries(chapters.map(ch=>[ch.topicId,ch])),metrics:{modules:chapters.length,lessons:chapters.reduce((n,ch)=>n+ch.sections.length,0),extraQuestions:chapters.reduce((n,ch)=>n+ch.questions.length,0)}};
}
