"use client";
import {useEffect,useMemo,useState} from "react";
import {getMathLessons} from "./math-curriculum";
import {fractionUnits} from "./fraction-curriculum";
import {getLessons} from "./course-catalog";
import {buildExercises,type LessonSource,type ExerciseItem} from "./exercise-bank";
import {downloadStudyPdf,type PdfDocumentRequest,type PdfSection} from "./lib/lesson-pdf";
import styles from "./creation-center.module.css";

export type CreationTool="inicio"|"provas"|"apostilas"|"arquivos"|"biblioteca";
type SubjectOption={name:string;topics:{name:string}[]};
type Props={tool:CreationTool;onNavigate:(tool:CreationTool)=>void;subjects:SubjectOption[]};
type SavedMaterial={id:string;title:string;kind:string;date:string;pdf:PdfDocumentRequest};
const STORAGE="eduverso:central-criacao:material:v1";
const NAV: {id:Exclude<CreationTool,"inicio">;title:string;icon:string;subtitle:string}[]=[
 {id:"provas",title:"Gerador de provas",icon:"📝",subtitle:"Questões do currículo, prova e gabarito em PDFs separados."},
 {id:"apostilas",title:"Apostilas e atividades",icon:"📚",subtitle:"Aulas organizadas com exemplos e prática para baixar."},
 {id:"arquivos",title:"Transformar arquivos em materiais",icon:"📄",subtitle:"Importe texto ou PDF e prepare um roteiro de estudo."},
 {id:"biblioteca",title:"Biblioteca de materiais prontos",icon:"▤",subtitle:"Acesse guias do catálogo e seus documentos salvos."}
];
const availableSubjects=["Matemática","Português","Física","Química","Biologia","História","Geografia","Inglês","Anatomia"];
const starterMaterials=[
 {subject:"Matemática",topic:"Porcentagem"},
 {subject:"Matemática",topic:"Equações e inequações"},
 {subject:"Matemática",topic:"Geometria"},
 {subject:"Português",topic:"Gramática"},
 {subject:"Biologia",topic:"Genética"},
 {subject:"Física",topic:"Mecânica"}
];
const fileSafe=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"material";
const options=["A","B","C","D","E","F"];
function allLessons(subject:string,topic:string):LessonSource[]{
 if(subject==="Matemática"&&topic==="Frações")return fractionUnits.map(l=>({...l,feedback:l.explain}));
 if(subject==="Matemática")return getMathLessons(topic).map(l=>({...l,explain:l.body}));
 return getLessons(subject,topic).map(l=>({...l,body:l.explain}));
}
function makeBooklet(subject:string,topic:string,limit=10):PdfDocumentRequest|null{
 const lessons=allLessons(subject,topic).slice(0,limit);
 if(!lessons.length)return null;
 const sections:PdfSection[]=lessons.map((l,i)=>({
  heading:String(i+1)+". "+l.title,
  paragraphs:[l.body||l.explain||"", "Exemplo aplicado: "+l.example, "Pratique: "+l.question,
   ...l.options.map((o,j)=>options[j]+") "+o),
   "Gabarito comentado: "+options[l.correct]+") "+l.options[l.correct]+". "+(l.feedback||l.body||l.explain||"")].filter(Boolean)
 }));
 return {title:"Apostila e atividades — "+topic,subtitle:"Eduverso · "+subject,fileName:"eduverso-apostila-"+fileSafe(topic)+".pdf",sections,
 note:"Material organizado a partir do conteúdo editorial já cadastrado no Eduverso, não gerado por inteligência artificial. Confira as questões e o gabarito antes de distribuir."};
}
function makeExam(subject:string,topic:string,items:ExerciseItem[],answers=false):PdfDocumentRequest{
 const sections:PdfSection[]=items.map((q,i)=>({heading:"Questão "+(i+1),paragraphs:[
  q.question,...q.options.map((choice,j)=>options[j]+") "+choice),
  ...(answers?["Resposta correta: "+options[q.correct]+") "+q.options[q.correct],"Explicação: "+q.explanation]:[])
 ]}));
 return {title:(answers?"Gabarito comentado":"Prova de revisão")+" — "+topic,
 subtitle:subject+" · "+items.length+" questões · Eduverso",
 fileName:"eduverso-"+(answers?"gabarito":"prova")+"-"+fileSafe(topic)+".pdf",sections,
 note:answers?"Gabarito elaborado com base nas aulas cadastradas. Revisão pedagógica recomendada.":"Prova montada com questões do catálogo Eduverso. Preencha nome, turma e data no espaço disponível."};
}
function readSaved():SavedMaterial[]{
 try{const raw=JSON.parse(localStorage.getItem(STORAGE)||"[]");return Array.isArray(raw)?raw.filter(x=>x&&typeof x.id==="string"&&typeof x.title==="string"&&x.pdf&&Array.isArray(x.pdf.sections)).slice(0,12):[];}catch{return [];}
}
export default function CreationCenter({tool,onNavigate,subjects}:Props){
 const choices=useMemo(()=>subjects.filter(s=>availableSubjects.includes(s.name)&&s.topics.length),[subjects]);
 const [subject,setSubject]=useState("Matemática");
 const [topic,setTopic]=useState("Porcentagem");
 const [quantity,setQuantity]=useState(10);
 const [seed,setSeed]=useState(0);
 const [lessonLimit,setLessonLimit]=useState(10);
 const [saved,setSaved]=useState<SavedMaterial[]>([]);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [fileText,setFileText]=useState("");
 const [fileName,setFileName]=useState("");
 const [fileReading,setFileReading]=useState(false);
 useEffect(()=>{setSaved(readSaved());},[]);
 useEffect(()=>{setNotice("");},[tool]);
 const topics=choices.find(s=>s.name===subject)?.topics??[];
 const resolvedTopic=topics.some(t=>t.name===topic)?topic:(topics[0]?.name||"");
 const lessons=useMemo(()=>allLessons(subject,resolvedTopic),[subject,resolvedTopic]);
 const exam=useMemo(()=>buildExercises(lessons,quantity,seed,undefined,subject,resolvedTopic),[lessons,quantity,seed,subject,resolvedTopic]);
 function switchSubject(next:string){setSubject(next);setTopic(choices.find(s=>s.name===next)?.topics[0]?.name||"");setSeed(0);setNotice("");}
 function store(pdf:PdfDocumentRequest,kind:string){
  const entry:SavedMaterial={id:String(Date.now())+"-"+Math.round(Math.random()*100000),title:pdf.title,kind,date:new Date().toLocaleDateString("pt-BR"),pdf};
  try{
   const next=[entry,...readSaved()].slice(0,12);
   localStorage.setItem(STORAGE,JSON.stringify(next));setSaved(next);
   return true;
  }catch{return false;}
 }
 async function create(pdf:PdfDocumentRequest|null,kind:string,save=true){
  if(!pdf){setNotice("Este assunto ainda não possui conteúdo suficiente no catálogo. Escolha outro.");return;}
  setBusy(true);setNotice("");
  try{await downloadStudyPdf(pdf);const wasSaved=save?store(pdf,kind):false;
   setNotice("PDF preparado para download."+(save?(wasSaved?" Uma cópia ficou na biblioteca deste navegador.":" Seu navegador não permitiu salvar uma cópia."):""));
  }catch{setNotice("O PDF não pôde ser preparado. Tente novamente.");}
  finally{setBusy(false);}
 }
 async function receiveFile(file?:File){
  if(!file)return;
  setNotice("");setFileText("");setFileName("");
  if(file.size>8*1024*1024){setNotice("O arquivo deve ter no máximo 8 MB.");return;}
  const type=file.name.toLowerCase();
  if(!type.endsWith(".txt")&&!type.endsWith(".pdf")){setNotice("Use um arquivo TXT ou PDF com texto selecionável.");return;}
  setFileReading(true);
  try{
   let text="";
   if(type.endsWith(".txt"))text=await file.text();
   else{
    const pdfjs=await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc="/api/enem/worker";
    const doc=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
    try{
     const n=Math.min(doc.numPages,30);
     for(let i=1;i<=n;i++){
      const page=await doc.getPage(i);
      const content=await page.getTextContent();
      text+="\n"+content.items.map(item=>"str" in item?item.str:"").join(" ");
     }
     if(doc.numPages>30)setNotice("Foram lidas somente as primeiras 30 páginas.");
    }finally{await doc.destroy();}
   }
   const cleaned=text.replace(/\s+/g," ").trim().slice(0,25000);
   if(cleaned.length<80){setNotice("Não foi encontrado texto suficiente. PDFs digitalizados como imagem precisam de OCR, que ainda não está disponível.");return;}
   setFileText(cleaned);setFileName(file.name);
  }catch{setNotice("Não foi possível ler o arquivo. Confirme se o PDF possui texto selecionável.");}
  finally{setFileReading(false);}
 }
 function fromFile():PdfDocumentRequest|null{
  if(!fileText)return null;
  const chunks=fileText.match(/.{1,620}(?:\s|$)/g)?.map(x=>x.trim()).filter(Boolean)??[fileText];
  return {title:"Roteiro de estudo — "+fileName,subtitle:"Material importado e organizado no Eduverso",
    fileName:"eduverso-revisao-"+fileSafe(fileName)+".pdf",
    sections:[
     {heading:"Objetivo",paragraphs:["Leia as informações fornecidas no arquivo e identifique os conceitos principais. Esta versão reorganiza o texto original: não cria explicações novas por IA."]},
     {heading:"Conteúdo do arquivo",paragraphs:chunks.slice(0,45)},
     {heading:"Revisão ativa",paragraphs:["Escreva, com suas palavras, os principais conceitos do material.","Liste três exemplos do conteúdo.","Crie cinco perguntas sobre os assuntos abordados.","Releia os pontos em que houver dúvidas."]}
    ],note:"Conteúdo extraído do arquivo enviado e processado localmente no navegador. A IA não foi usada. Confira integridade do texto e formatação antes de distribuir."};
 }
 function section(title:string,children:React.ReactNode){return <section className={styles.panel}><h2>{title}</h2>{children}</section>;}
 const selectedTool=NAV.find(x=>x.id===tool);
 return <div className={styles.root}>
  <header className={styles.hero}>
   <span className={styles.eyebrow}>✦ EDUVERSO · FERRAMENTAS EDUCACIONAIS</span>
   <h1>{selectedTool?selectedTool.title:"Central de Criação"}<span>.</span></h1>
   <p>{selectedTool?selectedTool.subtitle:"Crie, organize e baixe materiais educativos usando as aulas do Eduverso. Escolha a ferramenta que atende ao seu objetivo."}</p>
   {tool!=="inicio"&&<button type="button" className={styles.back} onClick={()=>onNavigate("inicio")}>← Voltar para as ferramentas</button>}
  </header>
  {tool==="inicio"&&<div className={styles.grid}>{NAV.map(t=><button key={t.id} type="button" className={styles.tile} onClick={()=>onNavigate(t.id)}><span className={styles.tileIcon}>{t.icon}</span><strong>{t.title}</strong><small>{t.subtitle}</small><span className={styles.tileAction}>Abrir ferramenta ↗</span></button>)}</div>}
  {(tool==="provas"||tool==="apostilas")&&section(tool==="provas"?"Monte sua prova":"Crie sua apostila",
   <><div className={styles.subjectPicker}>
     <span className={styles.subjectTitle}>Selecione a disciplina <small>· {choices.length} disponíveis</small></span>
     <div className={styles.subjectChoices} role="group" aria-label="Escolher disciplina para gerar materiais">
       {choices.map(item=><button type="button" key={item.name} aria-pressed={subject===item.name} className={styles.subjectChoice+" "+(subject===item.name?styles.subjectChoiceActive:"")} onClick={()=>switchSubject(item.name)}>{item.name}</button>)}
     </div>
   </div>
   <div className={styles.formGrid}>
    <label>Assunto<select value={resolvedTopic} onChange={e=>{setTopic(e.target.value);setSeed(0);setNotice("");}}>{topics.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label>
    {tool==="provas"?<label>Quantidade de questões<select value={quantity} onChange={e=>{setQuantity(Number(e.target.value));setNotice("");}}>{[5,10,15,20,30].map(n=><option key={n} value={n}>{n} questões</option>)}</select></label>:
      <label>Aulas para incluir<select value={lessonLimit} onChange={e=>setLessonLimit(Number(e.target.value))}>{[5,10,15,20].map(n=><option key={n} value={n}>Até {n} aulas</option>)}</select></label>}
   </div>
   <p className={styles.hint}>{tool==="provas"?"Questões distintas disponíveis nesta rodada: "+exam.length+" de "+quantity+".":"Aulas disponíveis para este assunto: "+lessons.length+"."} Os PDFs utilizam o catálogo existente; não dependem de IA.</p>
   {tool==="provas"&&<button type="button" className={styles.secondary} onClick={()=>{setSeed(v=>v+37);setNotice("");}}>↻ Sortear outra versão</button>}
   <div className={styles.actions}>
    {tool==="provas"?<>
      <button disabled={busy||!exam.length} className={styles.primary} onClick={()=>create(makeExam(subject,resolvedTopic,exam),"Prova")}>↓ Baixar prova PDF</button>
      <button disabled={busy||!exam.length} className={styles.secondary} onClick={()=>create(makeExam(subject,resolvedTopic,exam,true),"Gabarito")}>↓ Baixar gabarito comentado</button>
     </>:<button disabled={busy||!lessons.length} className={styles.primary} onClick={()=>create(makeBooklet(subject,resolvedTopic,lessonLimit),"Apostila")}>↓ Criar e baixar apostila PDF</button>}
   </div></>)}
  {tool==="arquivos"&&section("Importar material de estudo",
    <><p className={styles.hint}>Envie um PDF com texto selecionável ou um arquivo TXT. A leitura acontece no navegador; nesta etapa, o arquivo é organizado em um PDF de revisão, sem reescrita por IA.</p>
    <label className={styles.upload}>📤 Selecionar arquivo TXT ou PDF<input type="file" accept=".txt,.pdf,text/plain,application/pdf" onChange={e=>{void receiveFile(e.target.files?.[0]);e.currentTarget.value="";}}/></label>
    {fileReading&&<p role="status">Lendo conteúdo do arquivo...</p>}
    {fileText&&<div className={styles.preview}><strong>{fileName}</strong><p>{fileText.slice(0,600)}{fileText.length>600?"...":""}</p><span>{fileText.length.toLocaleString("pt-BR")} caracteres extraídos</span></div>}
    <button type="button" className={styles.primary} disabled={busy||fileReading||!fileText} onClick={()=>create(fromFile(),"Roteiro de arquivo")}>↓ Preparar roteiro de estudo PDF</button></>)}
  {tool==="biblioteca"&&<>
    {section("Materiais do catálogo prontos para baixar",<div className={styles.readyGrid}>{starterMaterials.map(entry=><div className={styles.readyCard} key={entry.subject+"-"+entry.topic}><span>▤ {entry.subject}</span><strong>{entry.topic}</strong><button type="button" disabled={busy} onClick={()=>create(makeBooklet(entry.subject,entry.topic,10),"Material pronto")}>↓ Baixar PDF</button></div>)}</div>)}
    {section("Meus materiais salvos",<><p className={styles.hint}>Cópias dos materiais gerados nesta Central. Armazenadas somente neste navegador, não sincronizadas entre dispositivos.</p>
     {saved.length===0?<div className={styles.empty}>Ainda não há materiais salvos aqui. Gere uma prova, uma apostila ou um roteiro para começar.</div>:
     <div className={styles.savedList}>{saved.map(item=><div className={styles.savedItem} key={item.id}><div><strong>{item.title}</strong><small>{item.kind} · {item.date}</small></div><button type="button" disabled={busy} onClick={()=>create(item.pdf,item.kind,false)}>↓ PDF</button><button type="button" onClick={()=>{const next=saved.filter(x=>x.id!==item.id);try{localStorage.setItem(STORAGE,JSON.stringify(next));setSaved(next);}catch{setNotice("Não foi possível remover o registro.");}}}>Excluir</button></div>)}</div>}</>)}
   </>}
  {notice&&<p className={styles.notice} role="status">{notice}</p>}
  {tool!=="inicio"&&<p className={styles.footnote}>Material de apoio pedagógico. Antes de usar provas, exemplos ou gabaritos em sala de aula, confira a precisão do conteúdo e a adequação à turma.</p>}
 </div>;
}
