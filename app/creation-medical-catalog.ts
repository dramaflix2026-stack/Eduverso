import {medicineDisciplines,type MedDiscipline,type MedTopic} from "./medicine-curriculum";
import {advancedMedCourses} from "./medicine-advanced-catalog";
import {entranceSubjects} from "./medicine-entrance";
import {bones} from "./anatomy-atlas-data";
import {getMathLessons} from "./math-curriculum";
import {fractionUnits} from "./fraction-curriculum";
import {getLessons} from "./course-catalog";
import {isValidExercise,type LessonSource,type ExerciseItem} from "./exercise-bank";

export type MedicalTrack="vestibular"|"faculdade"|"revalida"|"atlas";
export type MedicalChoice={id:string;name:string;description:string};
export type MedicalContent={label:string;subjectLabel:string;lessons:LessonSource[];questions:ExerciseItem[]};
export const medicalTracks:{id:MedicalTrack;name:string;description:string}[]=[
 {id:"vestibular",name:"Vestibular de Medicina",description:"10 matérias de preparação e suas trilhas escolares"},
 {id:"faculdade",name:"Faculdade de Medicina",description:"18 disciplinas e 108 assuntos do currículo acadêmico"},
 {id:"revalida",name:"Revalida e Residência",description:"Revisões didáticas com foco clínico e internato — não são provas oficiais"},
 {id:"atlas",name:"Atlas de Anatomia",description:"12 estruturas ósseas, questões de reconhecimento e revisão"}
];

export function getMedicalChoices(track:MedicalTrack):MedicalChoice[]{
 if(track==="vestibular")return entranceSubjects.map(s=>({id:s.id,name:s.name,description:s.description}));
 if(track==="atlas")return [{id:"esqueleto",name:"Esqueleto humano",description:"12 estruturas do Atlas interativo"}];
 const disciplines=track==="revalida"
  ?medicineDisciplines.filter(d=>d.cycle!=="basico"||d.slug==="saude-coletiva")
  :medicineDisciplines;
 return [{id:"geral",name:track==="revalida"?"Revisão clínica geral":"Todas as disciplinas",description:"Questões e resumos de todo o acervo deste percurso"},
  ...disciplines.map(d=>({id:d.slug,name:d.title,description:d.description}))];
}
export function getMedicalTopics(track:MedicalTrack,id:string,schoolTopics:{name:string}[]=[]):MedicalChoice[]{
 if(track==="vestibular"){
  const entry=entranceSubjects.find(e=>e.id===id);
  if(!entry)return[];
  return schoolTopics.filter(t=>!entry.focusTopics||entry.focusTopics.includes(t.name)).map(t=>({id:t.name,name:t.name,description:"Trilha disponível"}));
 }
 if(track==="atlas")return bones.map(b=>({id:b.id,name:b.name,description:b.group}));
 const selected=medicineDisciplines.find(d=>d.slug===id);
 return selected?.topics.map(t=>({id:t.id,name:t.name,description:selected.title}))??[];
}
const safeLesson=(l:LessonSource)=>l.question&&l.options.length>1&&l.correct>=0&&l.correct<l.options.length;
function medEntries(d:MedDiscipline,topicFilter:string):{lessons:LessonSource[];questions:ExerciseItem[]}{
 const lessons:LessonSource[]=[];
 const questions:ExerciseItem[]=[];
 const deep=advancedMedCourses[d.slug];
 for(const topic of d.topics){
  if(topicFilter&&topic.id!==topicFilter)continue;
  const chapter=deep?.byTopic[topic.id];
  const advancedText=chapter?.sections.map(s=>
   s.title+". "+s.paragraphs.join(" ")+(s.bullets.length?" Pontos principais: "+s.bullets.join("; "):"")
  ).join("\n\n")||"";
  const body=[topic.theory,advancedText].filter(Boolean).join("\n\n").slice(0,12000);
  const lesson:LessonSource={
   title:d.title+" — "+topic.name,body,example:chapter?.caseStudy||topic.example,
   question:topic.question,options:topic.options,correct:topic.correct,feedback:topic.feedback
  };
  if(safeLesson(lesson)){
   lessons.push(lesson);
   questions.push({
    question:topic.question,options:[...topic.options],correct:topic.correct,
    explanation:topic.feedback,sourceTitle:lesson.title,kind:"original",sourceIndex:questions.length,level:"fundamentos"
   });
  }
  for(const q of chapter?.questions??[]){
   if(!q.prompt||!Array.isArray(q.options)||q.options.length<2||q.correct<0||q.correct>=q.options.length)continue;
   questions.push({
    question:q.prompt,options:[...q.options],correct:q.correct,explanation:q.explanation,
    sourceTitle:lesson.title,kind:"original",sourceIndex:questions.length,level:"aprofundado"
   });
  }
 }
 return {lessons,questions};
}
function schoolLessons(subject:string,topic:string):LessonSource[]{
 if(subject==="Matemática"&&topic==="Frações")return fractionUnits.map(l=>({...l,feedback:l.explain}));
 if(subject==="Matemática")return getMathLessons(topic).map(l=>({...l,explain:l.body}));
 return getLessons(subject,topic).map(l=>({...l,body:l.explain}));
}
function asExercises(lessons:LessonSource[]):ExerciseItem[]{
 const seen=new Set<string>();
 return lessons.filter(safeLesson).filter(l=>{
  const key=l.question.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
  if(!key||seen.has(key))return false;
  seen.add(key);return true;
 }).map((l,i)=>({
  question:l.question,options:[...l.options],correct:l.correct,
  explanation:l.feedback||l.body||l.explain||"",sourceTitle:l.title,kind:"original" as const,sourceIndex:i
 }));
}
export function getMedicalContent(track:MedicalTrack,id:string,topicId:string,schoolTopics:{name:string}[]=[]):MedicalContent{
 if(track==="vestibular"){
  const entry=entranceSubjects.find(e=>e.id===id);
  if(!entry)return {label:"Vestibular de Medicina",subjectLabel:"Vestibular de Medicina",lessons:[],questions:[]};
  const titles=schoolTopics.filter(t=>(!entry.focusTopics||entry.focusTopics.includes(t.name))&&(!topicId||t.name===topicId)).map(t=>t.name);
  const lessons=titles.flatMap(topic=>schoolLessons(entry.subject,topic));
  return {label:entry.name+(topicId?" — "+topicId:" — todos os assuntos"),subjectLabel:"Vestibular de Medicina · "+entry.name,
   lessons,questions:asExercises(lessons)};
 }
 if(track==="atlas"){
  const selected=bones.filter(b=>!topicId||b.id===topicId);
  const lessons:LessonSource[]=selected.map((b,i)=>{
   const wrong=bones.filter(x=>x.id!==b.id);
   const choices=[b.name,wrong[(i*3+1)%wrong.length].name,wrong[(i*5+3)%wrong.length].name];
   const rotate=i%3;const options=[...choices.slice(rotate),...choices.slice(0,rotate)];
   return {title:"Atlas — "+b.name,body:b.description,example:"Grupo anatômico: "+b.group,
    question:"Qual estrutura óssea corresponde à descrição: "+b.description,
    options,correct:(3-rotate)%3,feedback:"A estrutura é "+b.name+". "+b.description};
  });
  return {label:"Atlas de Anatomia"+(topicId?" — "+selected[0]?.name:" — esqueleto"),subjectLabel:"Medicina · Atlas de Anatomia",
   lessons,questions:asExercises(lessons)};
 }
 const source=track==="revalida"
  ?medicineDisciplines.filter(d=>d.cycle!=="basico"||d.slug==="saude-coletiva")
  :medicineDisciplines;
 const disciplines=id==="geral"?source:source.filter(d=>d.slug===id);
 const chunks=disciplines.map(d=>medEntries(d,topicId));
 const distinctQuestions=new Map<string,ExerciseItem>();
 for(const c of chunks)for(const q of c.questions){
  const key=q.question.trim().toLocaleLowerCase("pt-BR");
  if(key&&!distinctQuestions.has(key))distinctQuestions.set(key,q);
 }
 const name=id==="geral"?(track==="revalida"?"Revisão clínica geral":"Todas as disciplinas"):(disciplines[0]?.title||"Medicina");
 const topicName=topicId?disciplines[0]?.topics.find(t=>t.id===topicId)?.name:undefined;
 return {label:name+(topicName?" — "+topicName:""),subjectLabel:(track==="revalida"?"Revalida e Residência":"Faculdade de Medicina")+" · questões autorais",
  lessons:chunks.flatMap(c=>c.lessons),questions:[...distinctQuestions.values()].filter(isValidExercise)};
}
export function chooseMedicalQuestions(pool:ExerciseItem[],quantity:number,seed:number):ExerciseItem[]{
 const items=[...pool].filter(isValidExercise);let x=(seed+1)*2654435761>>>0;
 for(let i=items.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=x%(i+1);[items[i],items[j]]=[items[j],items[i]];}
 return items.sort((a,b)=>(a.level==="aprofundado"?0:1)-(b.level==="aprofundado"?0:1)).slice(0,Math.min(quantity,items.length));
}
