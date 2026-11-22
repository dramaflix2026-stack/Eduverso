/* Registros leves de atividade neste navegador; não representam tempo de estudo. */
export type StudyActivity={at:string;subject:string;topic:string;kind:"access"|"answer"|"completed"};
const KEY="eduverso:study-activity:v1";
const LIMIT=1000;

export function readStudyActivities():StudyActivity[]{
 if(typeof window==="undefined")return [];
 try{
  const value:unknown=JSON.parse(window.localStorage.getItem(KEY)||"[]");
  if(!Array.isArray(value))return [];
  return value.filter((item):item is StudyActivity=>{
   if(!item||typeof item!=="object")return false;
   const e=item as Partial<StudyActivity>;
   return typeof e.at==="string"&&Number.isFinite(Date.parse(e.at))&&typeof e.subject==="string"&&e.subject.length<=180&&typeof e.topic==="string"&&e.topic.length<=180&&(e.kind==="access"||e.kind==="answer"||e.kind==="completed");
  }).slice(-LIMIT);
 }catch{return [];}
}

export function recordStudyActivity(subject:string,topic="",kind:StudyActivity["kind"]="access"){
 if(typeof window==="undefined"||!subject.trim())return;
 try{
  const at=new Date().toISOString();
  const next:StudyActivity={at,subject:subject.trim().slice(0,180),topic:topic.trim().slice(0,180),kind};
  const existing=readStudyActivities();
  // Navegar repetidamente para o mesmo conteúdo não deve inflar a contagem de acessos.
  if(kind==="access"&&existing.some(x=>x.kind==="access"&&x.subject===next.subject&&x.topic===next.topic&&Date.parse(at)-Date.parse(x.at)<10*60*1000))return;
  window.localStorage.setItem(KEY,JSON.stringify([...existing.slice(-(LIMIT-1)),next]));
  window.dispatchEvent(new Event("eduverso:study-activity"));
 }catch{/* Armazenamento desabilitado: não bloquear o estudo. */}
}
