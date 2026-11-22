import type {ProfessionalTrack} from "./learning-professions";
import type {PdfDocumentRequest,PdfSection} from "./lib/lesson-pdf";
import type {BookletFormat} from "./booklet-content";
import {getProfessionalDepth} from "./professional-depth";

const letters=["A","B","C"];
function slug(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,65)}
export function makeProfessionalBooklet(track:ProfessionalTrack,limit=10,format:BookletFormat="teoria"):PdfDocumentRequest{
 const lessons=track.lessons.slice(0,Math.max(1,Math.min(20,limit)));
 const sections:PdfSection[]=[
  {heading:"Roteiro de aprendizagem",kind:"chapter",paragraphs:[
   "Eduverso - "+track.name+". Formação introdutória com conceitos, exemplos aplicados e desafios orientados. Esta apostila reúne os capítulos efetivamente disponíveis e não substitui treinamento supervisionado ou certificação profissional.",
   "Como estudar: leia a explicação principal, acompanhe o passo a passo, tente resolver o desafio sem olhar a solução e confira as justificativas. Em caso de dúvida, retome o capítulo e as leituras complementares."
  ]},
  {heading:"Índice",kind:"summary",paragraphs:lessons.map((item,i)=>(i+1)+". "+item.title)}
 ];
 lessons.forEach((item,i)=>{
  const deep=getProfessionalDepth(track.id,i);
  sections.push({heading:"Capítulo "+(i+1)+" - "+item.title,kind:"chapter",paragraphs:[
   item.explain, ...(deep?[deep.objective,deep.explanation]:[])
  ]});
  sections.push({heading:"Exemplo de aplicação",kind:"example",paragraphs:[item.example,item.context]});
  if(deep){
   sections.push({heading:"Procedimento passo a passo",kind:"standard",paragraphs:deep.steps.map((step,j)=>(j+1)+". "+step)});
   sections.push({heading:"Desafio prático",kind:"highlight",paragraphs:[deep.practice]});
   sections.push({heading:"Resolução comentada do desafio",kind:"standard",paragraphs:[deep.solution]});
  }
  sections.push({heading:"Erro frequente e prevenção",kind:"highlight",paragraphs:[item.pitfall]});
 });
 if(format==="com-atividades"){
  sections.push({heading:"Caderno de exercícios",kind:"chapter",pageBreakBefore:true,paragraphs:["Responda sem consultar o gabarito. São duas questões por capítulo e um desafio prático explicado dentro da teoria."]});
  lessons.forEach((lesson,i)=>{
   const extra=getProfessionalDepth(track.id,i)?.quiz;
   sections.push({heading:"Capítulo "+(i+1)+" - Questão 1",kind:"question",paragraphs:[lesson.question,...lesson.options.map((option,j)=>letters[j]+") "+option)]});
   if(extra)sections.push({heading:"Capítulo "+(i+1)+" - Questão 2",kind:"question",paragraphs:[extra.question,...extra.options.map((option,j)=>letters[j]+") "+option)]});
  });
  sections.push({heading:"Gabarito comentado",kind:"chapter",pageBreakBefore:true,paragraphs:["Consulte esta seção depois de tentar todas as questões."]});
  lessons.forEach((lesson,i)=>{
   const extra=getProfessionalDepth(track.id,i)?.quiz;
   sections.push({heading:"Capítulo "+(i+1)+" - Questão 1",kind:"answer",paragraphs:["Resposta: "+letters[lesson.correct]+") "+lesson.options[lesson.correct],lesson.feedback]});
   if(extra)sections.push({heading:"Capítulo "+(i+1)+" - Questão 2",kind:"answer",paragraphs:["Resposta: A) "+extra.options[0],extra.explanation]});
  });
 }
 sections.push({heading:"Leitura de referência e transparência",kind:"chapter",pageBreakBefore:true,paragraphs:[
  "Material de autoria editorial do Eduverso; referências externas servem para aprofundamento e não constituem endosso ou revisão oficial deste conteúdo.",
  "Leitura complementar: "+track.reference,
  "Exercícios de treinamento: questões autorais, não equivalentes a avaliações ou certificações profissionais oficiais. Consulte documentação atualizada para especificidades de cada profissão."
 ]});
 return {
  title:"Eduverso - "+track.name,
  subtitle:track.category+" · "+lessons.length+" capítulos · "+(format==="teoria"?"Apostila teórica":"Apostila com atividades"),
  fileName:"eduverso-profissional-"+slug(track.name)+(format==="teoria"?"-teoria":"-atividades")+".pdf",
  coverPage:true,
  sections,
  note:"Conteúdo introdutório para aprendizagem e prática. Não há certificado profissional associado a esta apostila."
 };
}
