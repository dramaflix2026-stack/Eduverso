import {fundamentalLessons,type FundamentalSubjectId} from "./fundamental-curriculum";
import type {FundamentalQuestion,FundamentalTopic} from "./fundamental-topic-catalog";

/** A seed is hand-authored for an age band; the renderer only formats it. */
export type Prompt = readonly [question:string,correct:string,alternativeA:string,alternativeB:string,why:string];
export type TopicSeed = {
 id:string;
 title:string;
 objective:string;
 explanation:string;
 application:string;
 practice:string;
 examples:readonly [string,string];
 markers:readonly string[];
 questions:readonly [Prompt,Prompt,Prompt,Prompt,Prompt];
};
export type YearSeeds = Record<string,readonly [TopicSeed,TopicSeed,TopicSeed]>;
function renderQuestion(seed:Prompt,position:number):FundamentalQuestion{
 const [prompt,right,wrongA,wrongB,reason]=seed;
 const index=(position+1)%3;
 const choices=["","",""] as [string,string,string];
 choices[index]=right;choices[(index+1)%3]=wrongA;choices[(index+2)%3]=wrongB;
 return {prompt,choices,correct:index,explanation:reason};
}
export function topicFromSeed(seed:TopicSeed):FundamentalTopic {
 return {
  id:seed.id,title:seed.title,objective:seed.objective,
  sections:[seed.explanation,seed.application,seed.practice],
  examples:[...seed.examples],visual:[...seed.markers],
  questions:seed.questions.map((q,i)=>renderQuestion(q,i)),
  expanded:true
 };
}
/** The original single-question introduction becomes a five-question general overview.
 * Its four new questions sample the three complementary topics. The specific topic
 * lesson always has explanations and exercises for the sampled question.
 */
export function expandedYearTopics(year:number,subject:FundamentalSubjectId,seeds:YearSeeds):FundamentalTopic[]|null{
 const group=seeds[subject];const base=fundamentalLessons[year]?.[subject];
 if(!group||!base)return null;
 const topics=group.map(topicFromSeed);
 const initial:FundamentalQuestion={prompt:base.question,choices:base.choices,correct:base.correct,explanation:base.feedback};
 const review=[topics[0].questions[0],topics[1].questions[0],topics[2].questions[0],topics[0].questions[1]];
 const intro:FundamentalTopic={
  id:"introducao",title:base.title,
  objective:"Revisar conhecimentos iniciais e preparar-se para os próximos assuntos desta disciplina.",
  sections:[
   base.theory,
   "Nesta trilha, você também vai explorar "+group.map(t=>t.title.toLocaleLowerCase("pt-BR")).join(", ")+". Cada assunto possui exemplos e atividades próprias, para que você possa avançar por etapas.",
   "Para começar, leia a explicação e o exemplo; em seguida faça as perguntas de diagnóstico. Algumas são antecipações dos próximos assuntos. Se houver dúvidas, abra o card correspondente e estude com mais profundidade."
  ],
  examples:[base.example,group[0].examples[0]],
  visual:["📖","🔎","✍️","✅"],
  questions:[initial,...review],
  expanded:true
 };
 return [intro,...topics];
}
export function auditYearSeeds(year:number,seeds:YearSeeds):string[]{
 const problems:string[]=[];
 for(const [subject,group] of Object.entries(seeds)){
  if(!fundamentalLessons[year]?.[subject as FundamentalSubjectId])problems.push("Unknown discipline: "+subject);
  if(group.length!==3)problems.push("Expected three extra topics: "+subject);
  const ids=new Set<string>();
  for(const topic of group){
   if(ids.has(topic.id)||!topic.id.match(/^[a-z-]+$/))problems.push("Duplicate/invalid id: "+subject+"/"+topic.id);
   ids.add(topic.id);
   if(topic.questions.length!==5||topic.examples.length!==2||topic.markers.length<3||!topic.explanation||!topic.application||!topic.practice)problems.push("Incomplete content: "+subject+"/"+topic.id);
   for(const [i,q] of topic.questions.entries()){
    if(q.length!==5||new Set([q[1],q[2],q[3]].map(v=>v.trim().toLocaleLowerCase("pt-BR"))).size!==3||q.some(v=>!v.trim()))problems.push("Question issue: "+subject+"/"+topic.id+"/"+i);
   }
  }
 }
 return problems;
}
