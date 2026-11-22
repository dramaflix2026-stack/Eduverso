"use client";
import {useEffect,useMemo,useState} from "react";
import {getMathLessons} from "./math-curriculum";
import {fractionUnits} from "./fraction-curriculum";
import {getLessons} from "./course-catalog";
import {medicineDisciplines} from "./medicine-curriculum";
import {entranceSubjects} from "./medicine-entrance";
import {medicalTracks,getMedicalChoices,getMedicalTopics,getMedicalContent,chooseMedicalQuestions,type MedicalTrack} from "./creation-medical-catalog";
import {buildExercises,type LessonSource,type ExerciseItem} from "./exercise-bank";
import {downloadStudyPdf,type PdfDocumentRequest,type PdfSection} from "./lib/lesson-pdf";
import {makeBooklet,type BookletFormat} from "./booklet-content";
import {professionalTracks,getProfessionalTrack} from "./learning-professions";
import {makeProfessionalBooklet} from "./professional-course-pdf";
import styles from "./creation-center.module.css";

export type CreationTool="inicio"|"provas"|"apostilas"|"arquivos"|"biblioteca";
type SubjectOption={name:string;topics:{name:string}[]};
type Props={tool:CreationTool;onNavigate:(tool:CreationTool,professional?:boolean,trackId?:string)=>void;subjects:SubjectOption[];initialProfessional?:boolean;initialProfessionalTrack?:string};
type SavedMaterial={id:string;title:string;kind:string;date:string;pdf:PdfDocumentRequest};
const STORAGE="eduverso:central-criacao:material:v1";
const NAV: {id:Exclude<CreationTool,"inicio">;title:string;icon:string;subtitle:string}[]=[
 {id:"provas",title:"Gerador de provas",icon:"📝",subtitle:"Monte até 100 questões e baixe a prova completa com gabarito comentado ao final."},
 {id:"apostilas",title:"Criador de apostilas",icon:"📚",subtitle:"Material teórico completo ou apostila com atividades ao final, em PDF diagramado."},
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
function makeExam(subject:string,topic:string,items:ExerciseItem[],onlyAnswerKey=false):PdfDocumentRequest{
 const limited=items.slice(0,100);
 const questionSections:PdfSection[]=limited.map((q,i)=>({
  heading:"Questão "+String(i+1).padStart(2,"0"),
  kind:"question",
  paragraphs:[q.question,...q.options.map((choice,j)=>options[j]+") "+choice)]
 }));
 const summaryRows=Array.from({length:Math.ceil(limited.length/10)},(_,row)=>{
  const from=row*10;
  return limited.slice(from,from+10).map((q,i)=>{
   return String(from+i+1).padStart(2,"0")+" - "+options[q.correct];
  }).join("     ");
 });
 const commentarySections:PdfSection[]=limited.map((q,i)=>{
  const letter=options[q.correct]??"?";
  const correct=q.options[q.correct]??"";
  const rationale=q.explanation.trim();
  return {
   heading:"Questão "+String(i+1).padStart(2,"0")+" — alternativa "+letter,
   kind:"answer",
   paragraphs:[
    "Resposta correta: "+letter+") "+correct,
    "Justificativa e resolução: "+(rationale||"A explicação específica ainda não está registrada no catálogo desta questão; confira o material da disciplina antes de usar este gabarito."),
    "Conteúdo para revisão: "+q.sourceTitle
   ]
  };
 });
 const answerKey:PdfSection[]=[
  {heading:"GABARITO COMENTADO",kind:"chapter",pageBreakBefore:!onlyAnswerKey,
   paragraphs:["Conferência das respostas e resoluções das "+limited.length+" questões. Esta seção é destinada à correção e à revisão pedagógica."]},
  {heading:"Gabarito rápido — alternativas",kind:"standard",paragraphs:summaryRows},
  ...commentarySections
 ];
 return {
  title:(onlyAnswerKey?"Gabarito comentado":"Prova com gabarito comentado")+" — "+topic,
  subtitle:subject+" · "+limited.length+" questões · Eduverso",
  fileName:"eduverso-"+(onlyAnswerKey?"gabarito":"prova-com-gabarito")+"-"+fileSafe(topic)+".pdf",
  responseFields:!onlyAnswerKey,
  sections:onlyAnswerKey?answerKey:[{heading:"Origem e critérios de estudo",kind:"chapter",paragraphs:[
    "Questões de treinamento originadas do banco editorial Eduverso. Não são provas oficiais de universidades, do ENEM, do Revalida ou de outras instituições, salvo quando identificadas expressamente como documento oficial.",
    "Dificuldade: a seleção considera o acervo existente e a abrangência escolhida. O material pode reunir níveis diferentes e não deve ser apresentado como máxima complexidade sem revisão pedagógica específica.",
    "O gabarito comentado está reunido ao final. Confira cada resolução, a pertinência das alternativas e a matriz do processo seletivo ou curso antes de aplicar a prova."
   ]},...questionSections,...answerKey],
  note:"Questões e explicações organizadas a partir do acervo Eduverso. Antes da aplicação, revise enunciados, alternativas, resoluções e adequação à turma. Não se trata de uma avaliação oficial."
 };
}
function readSaved():SavedMaterial[]{
 try{const raw=JSON.parse(localStorage.getItem(STORAGE)||"[]");return Array.isArray(raw)?raw.filter(x=>x&&typeof x.id==="string"&&typeof x.title==="string"&&x.pdf&&Array.isArray(x.pdf.sections)).slice(0,12):[];}catch{return [];}
}
export default function CreationCenter({tool,onNavigate,subjects,initialProfessional=false,initialProfessionalTrack="web"}:Props){
 const choices=useMemo(()=>subjects.filter(s=>availableSubjects.includes(s.name)&&s.topics.length),[subjects]);
 const [sourceArea,setSourceArea]=useState<"escolar"|"profissional"|MedicalTrack>(initialProfessional?"profissional":"escolar");
 const [professionalId,setProfessionalId]=useState(initialProfessionalTrack);
 const [bookletFormat,setBookletFormat]=useState<BookletFormat>("teoria");
 const [medChoice,setMedChoice]=useState("geral");
 const [medTopic,setMedTopic]=useState("");
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
 const medChoices=useMemo(()=>sourceArea==="escolar"||sourceArea==="profissional"?[]:getMedicalChoices(sourceArea),[sourceArea]);
 const resolvedMedChoice=medChoices.find(c=>c.id===medChoice)?.id??medChoices[0]?.id??"";
 const entry=entranceSubjects.find(s=>s.id===resolvedMedChoice);
 const entranceTopics=choices.find(s=>s.name===entry?.subject)?.topics??[];
 const medTopics=useMemo(()=>sourceArea==="escolar"||sourceArea==="profissional"?[]:getMedicalTopics(sourceArea,resolvedMedChoice,entranceTopics),[sourceArea,resolvedMedChoice,entranceTopics]);
 const resolvedMedTopic=medTopics.some(t=>t.id===medTopic)?medTopic:"";
 const medContent=useMemo(()=>sourceArea==="escolar"||sourceArea==="profissional"?null:getMedicalContent(sourceArea,resolvedMedChoice,resolvedMedTopic,entranceTopics),[sourceArea,resolvedMedChoice,resolvedMedTopic,entranceTopics]);
 const professional=getProfessionalTrack(professionalId)??professionalTracks[0];
 const professionalMode=tool==="apostilas"&&sourceArea==="profissional";
 const lessons=useMemo(()=>professionalMode?professional.lessons:(medContent?.lessons??allLessons(subject,resolvedTopic)),[professionalMode,professional,medContent,subject,resolvedTopic]);
 useEffect(()=>{if(tool==="provas"&&sourceArea==="profissional")setSourceArea("escolar");},[tool,sourceArea]);
 useEffect(()=>{if(initialProfessional&&tool==="apostilas")setSourceArea("profissional");},[initialProfessional,tool]);
 const exam=useMemo(()=>medContent?chooseMedicalQuestions(medContent.questions,quantity,seed):buildExercises(lessons,quantity,seed,undefined,subject,resolvedTopic),[medContent,lessons,quantity,seed,subject,resolvedTopic]);
 const activeSubject=professionalMode?professional.category:(medContent?.subjectLabel??subject);
 const activeTopic=professionalMode?professional.name:(medContent?.label??resolvedTopic);
 function switchSubject(next:string){setSubject(next);setTopic(choices.find(s=>s.name===next)?.topics[0]?.name||"");setSeed(0);setNotice("");}
 function switchArea(next:"escolar"|"profissional"|MedicalTrack){setSourceArea(next);setMedChoice(next==="vestibular"?"biologia":next==="atlas"?"esqueleto":"geral");setMedTopic("");setSeed(0);setNotice("");}
 function switchMedicineChoice(next:string){setMedChoice(next);setMedTopic("");setSeed(0);setNotice("");}
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
  {tool==="inicio"&&<><div className={styles.grid}>{NAV.map(t=><button key={t.id} type="button" className={styles.tile} onClick={()=>onNavigate(t.id)}><span className={styles.tileIcon}>{t.icon}</span><strong>{t.title}</strong><small>{t.subtitle}</small><span className={styles.tileAction}>Abrir ferramenta ↗</span></button>)}</div>
   <div className={styles.highlightFeature}><span>✦ NOVAS FORMAÇÕES</span><strong>Programação, TI, Design, Dados e Negócios</strong><p>Trilhas introdutórias com capítulos explicativos e apostilas para baixar. Selecione Criador de Apostilas e escolha a área Formação profissional.</p><button type="button" onClick={()=>onNavigate("apostilas",true)}>Explorar trilhas e apostilas →</button></div></>}
  {(tool==="provas"||tool==="apostilas")&&section(tool==="provas"?"Monte sua prova":"Crie sua apostila",
   <><div className={styles.subjectPicker}>
     <span className={styles.subjectTitle}>Área de conhecimento</span>
     <div className={styles.areaChoices} role="group" aria-label="Escolher área de estudo">
       <button type="button" aria-pressed={sourceArea==="escolar"} className={styles.subjectChoice+" "+(sourceArea==="escolar"?styles.subjectChoiceActive:"")} onClick={()=>switchArea("escolar")}>📘 Fundamental e Médio</button>
       {tool==="apostilas"&&<button type="button" aria-pressed={sourceArea==="profissional"} className={styles.subjectChoice+" "+(sourceArea==="profissional"?styles.subjectChoiceActive:"")} onClick={()=>switchArea("profissional")}>💻 Formação profissional</button>}
       {medicalTracks.map(item=><button key={item.id} type="button" aria-pressed={sourceArea===item.id} className={styles.subjectChoice+" "+(sourceArea===item.id?styles.subjectChoiceActive:"")} onClick={()=>switchArea(item.id)}>{item.id==="vestibular"?"🎓":item.id==="faculdade"?"🫀":item.id==="revalida"?"⚕️":"🦴"} {item.name}</button>)}
     </div>
   </div>
   {professionalMode?<div className={styles.professionalArea}>
     <div className={styles.subjectPicker}>
      <span className={styles.subjectTitle}>Formações profissionais · escolha sua área <small>· {professionalTracks.length} trilhas disponíveis</small></span>
      <div className={styles.professionalGrid}>{professionalTracks.map(track=><button type="button" key={track.id}
       className={styles.professionalCard} aria-pressed={professionalId===track.id} onClick={()=>{setProfessionalId(track.id);setNotice("");}}>
       <span className={styles.professionalIcon}>{track.icon}</span><span><small>{track.category}</small><strong>{track.name}</strong><em>{track.description}</em></span>
      </button>)}</div>
     </div>
     <div className={styles.professionalSyllabus}><strong>Conteúdo inicial: {professional.name}</strong>
       {professional.lessons.map((lesson,i)=><span key={lesson.title}>{String(i+1).padStart(2,"0")} · {lesson.title}</span>)}
       <small>Trilha introdutória baseada em conteúdo editorial, com leitura de referência indicada no PDF. Não equivale a curso superior nem a certificação.</small>
     </div>
    </div>:sourceArea==="escolar"?<div className={styles.subjectPicker}>
     <span className={styles.subjectTitle}>Selecione a disciplina <small>· {choices.length} disponíveis</small></span>
     <div className={styles.subjectChoices} role="group" aria-label="Escolher disciplina para gerar materiais">
       {choices.map(item=><button type="button" key={item.name} aria-pressed={subject===item.name} className={styles.subjectChoice+" "+(subject===item.name?styles.subjectChoiceActive:"")} onClick={()=>switchSubject(item.name)}>{item.name}</button>)}
     </div>
   </div>:<div className={styles.subjectPicker}>
     <span className={styles.subjectTitle}>{sourceArea==="vestibular"?"Matérias do vestibular":sourceArea==="atlas"?"Módulo de Atlas":"Disciplinas de Medicina"} <small>· {medChoices.length} opções</small></span>
     <div className={styles.subjectChoices} role="group" aria-label="Escolher disciplina ou módulo de Medicina">
       {medChoices.map(item=><button type="button" key={item.id} title={item.description} aria-pressed={resolvedMedChoice===item.id} className={styles.subjectChoice+" "+(resolvedMedChoice===item.id?styles.subjectChoiceActive:"")} onClick={()=>switchMedicineChoice(item.id)}>{item.name}</button>)}
     </div>
     {sourceArea==="revalida"&&<p className={styles.hint}>Revisão com questões autorais de clínica, internato e saúde coletiva. Não reproduz provas oficiais do Revalida ou de residência.</p>}
   </div>}
   <div className={styles.formGrid}>
    {professionalMode?null:sourceArea==="escolar"?<label>Assunto<select value={resolvedTopic} onChange={e=>{setTopic(e.target.value);setSeed(0);setNotice("");}}>{topics.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label>:
     <label>Assunto ou abrangência<select value={resolvedMedTopic} onChange={e=>{setMedTopic(e.target.value);setSeed(0);setNotice("");}}>
       <option value="">Todos os assuntos disponíveis</option>
       {medTopics.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
     </select></label>}
    {tool==="provas"?<label>Quantidade de questões<select value={quantity} onChange={e=>{setQuantity(Number(e.target.value));setNotice("");}}>{[5,10,15,20,25,30,40,50,60,70,80,90,100].map(n=><option key={n} value={n}>{n} questões</option>)}</select></label>:
      <label>Aulas para incluir<select value={lessonLimit} onChange={e=>setLessonLimit(Number(e.target.value))}>{[5,10,15,20].map(n=><option key={n} value={n}>Até {n} aulas</option>)}</select></label>}
   </div>
   {tool==="apostilas"&&<div className={styles.bookletMode}>
     <div className={styles.bookletIntro}><span>ESCOLHA O FORMATO</span><strong>Você quer estudar ou aplicar atividades?</strong>
      <p>Apostilas começam com teoria e explicação. As perguntas são opcionais e nunca aparecem misturadas às explicações.</p></div>
     <div className={styles.bookletChoices} role="group" aria-label="Formato da apostila">
      <button type="button" className={styles.bookletChoice} aria-pressed={bookletFormat==="teoria"} onClick={()=>setBookletFormat("teoria")}>
       <span>📖</span><strong>Apostila teórica</strong><small>Conceitos, contextualização, capítulos, exemplos e referências. Sem perguntas obrigatórias.</small></button>
      <button type="button" className={styles.bookletChoice} aria-pressed={bookletFormat==="com-atividades"} onClick={()=>setBookletFormat("com-atividades")}>
       <span>📝</span><strong>Teoria + atividades</strong><small>O mesmo conteúdo teórico, com exercícios ao final e gabarito comentado em seção separada.</small></button>
     </div>
     <div className={styles.bookletPreview}><span>PRÉVIA DO SUMÁRIO</span><strong>{activeTopic}</strong>
       <div>{lessons.slice(0,lessonLimit).map((l,i)=><small key={i}>{String(i+1).padStart(2,"0")} · {l.title}</small>)}</div>
     </div>
    </div>}
   <p className={styles.hint}>{tool==="provas"?"Questões distintas disponíveis nesta rodada: "+exam.length+" de "+quantity+".":"Capítulos disponíveis para este assunto: "+Math.min(lessons.length,lessonLimit)+"."} Os PDFs utilizam o catálogo existente e conteúdo editorial; não dependem de IA.</p>
   {tool==="provas"&&exam.length<quantity&&<p className={styles.notice} role="status">Este recorte possui {exam.length} questões distintas disponíveis. O PDF terá somente essas {exam.length} questões — sem repetir perguntas para atingir {quantity}. Para ampliar o banco, selecione todos os assuntos ou outra disciplina.</p>}
   {tool==="provas"&&<button type="button" className={styles.secondary} onClick={()=>{setSeed(v=>v+37);setNotice("");}}>↻ Sortear outra versão</button>}
   <div className={styles.actions}>
    {tool==="provas"?<>
      <button disabled={busy||!exam.length} className={styles.primary} onClick={()=>create(makeExam(activeSubject,activeTopic,exam),"Prova")}>↓ Baixar prova + gabarito comentado (PDF)</button>
      <button disabled={busy||!exam.length} className={styles.secondary} onClick={()=>create(makeExam(activeSubject,activeTopic,exam,true),"Gabarito")}>↓ Baixar somente o gabarito (PDF)</button>
     </>:<button disabled={busy||!lessons.length} className={styles.primary} onClick={()=>create(professionalMode?makeProfessionalBooklet(professional,lessonLimit,bookletFormat):makeBooklet(activeSubject,activeTopic,lessonLimit,lessons,bookletFormat),"Apostila")}>↓ Baixar {bookletFormat==="teoria"?"apostila teórica":"apostila com atividades"} (PDF)</button>}
   </div></>)}
  {tool==="arquivos"&&section("Importar material de estudo",
    <><p className={styles.hint}>Envie um PDF com texto selecionável ou um arquivo TXT. A leitura acontece no navegador; nesta etapa, o arquivo é organizado em um PDF de revisão, sem reescrita por IA.</p>
    <label className={styles.upload}>📤 Selecionar arquivo TXT ou PDF<input type="file" accept=".txt,.pdf,text/plain,application/pdf" onChange={e=>{void receiveFile(e.target.files?.[0]);e.currentTarget.value="";}}/></label>
    {fileReading&&<p role="status">Lendo conteúdo do arquivo...</p>}
    {fileText&&<div className={styles.preview}><strong>{fileName}</strong><p>{fileText.slice(0,600)}{fileText.length>600?"...":""}</p><span>{fileText.length.toLocaleString("pt-BR")} caracteres extraídos</span></div>}
    <button type="button" className={styles.primary} disabled={busy||fileReading||!fileText} onClick={()=>create(fromFile(),"Roteiro de arquivo")}>↓ Preparar roteiro de estudo PDF</button></>)}
  {tool==="biblioteca"&&<>
    {section("Materiais do catálogo prontos para baixar",<div className={styles.readyGrid}>{starterMaterials.map(entry=><div className={styles.readyCard} key={entry.subject+"-"+entry.topic}><span>▤ {entry.subject}</span><strong>{entry.topic}</strong><button type="button" disabled={busy} onClick={()=>create(makeBooklet(entry.subject,entry.topic,10,allLessons(entry.subject,entry.topic),"teoria"),"Material pronto")}>↓ Baixar PDF</button></div>)}</div>)}
    {section("Medicina — apostilas das 18 disciplinas",<div className={styles.readyGrid}>{medicineDisciplines.map(d=><div className={styles.readyCard} key={d.slug}><span>🫀 Faculdade de Medicina</span><strong>{d.title}</strong><button type="button" disabled={busy} onClick={()=>{const content=getMedicalContent("faculdade",d.slug,"");void create(makeBooklet("Faculdade de Medicina",d.title,10,content.lessons,"teoria"),"Apostila de Medicina");}}>↓ Baixar PDF</button></div>)}</div>)}
    {section("Formações profissionais — apostilas introdutórias",<div className={styles.readyGrid}>
     {professionalTracks.map(t=><div className={styles.readyCard} key={t.id}><span>{t.icon} {t.category}</span><strong>{t.name}</strong>
      <p className={styles.hint}>{t.description}</p>
      <button type="button" disabled={busy} onClick={()=>create(makeProfessionalBooklet(t,20,"teoria"),"Apostila profissional")}>↓ Apostila teórica PDF</button>
     </div>)}
    </div>)}
    {section("Meus materiais salvos",<><p className={styles.hint}>Cópias dos materiais gerados nesta Central. Armazenadas somente neste navegador, não sincronizadas entre dispositivos.</p>
     {saved.length===0?<div className={styles.empty}>Ainda não há materiais salvos aqui. Gere uma prova, uma apostila ou um roteiro para começar.</div>:
     <div className={styles.savedList}>{saved.map(item=><div className={styles.savedItem} key={item.id}><div><strong>{item.title}</strong><small>{item.kind} · {item.date}</small></div><button type="button" disabled={busy} onClick={()=>create(item.pdf,item.kind,false)}>↓ PDF</button><button type="button" onClick={()=>{const next=saved.filter(x=>x.id!==item.id);try{localStorage.setItem(STORAGE,JSON.stringify(next));setSaved(next);}catch{setNotice("Não foi possível remover o registro.");}}}>Excluir</button></div>)}</div>}</>)}
   </>}
  {notice&&<p className={styles.notice} role="status">{notice}</p>}
  {tool!=="inicio"&&<p className={styles.footnote}>Material de apoio pedagógico. Antes de usar provas, exemplos ou gabaritos em sala de aula, confira a precisão do conteúdo e a adequação à turma.</p>}
 </div>;
}
