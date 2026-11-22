"use client";
export type PdfSection={heading:string;paragraphs:string[];pageBreakBefore?:boolean;kind?:"standard"|"chapter"|"question"|"answer"};
export type PdfDocumentRequest={
 title:string;subtitle:string;fileName:string;
 sections:PdfSection[];note?:string;responseFields?:boolean;
};
function clean(text:string):string{
 return text.replace(/[\r\t]+/g," ").replace(/→|⇒|↗/g," -> ").replace(/←/g," <- ")
 .replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/−/g,"-")
 .replace(/×/g," x ").replace(/÷/g," / ").replace(/≥/g,">=").replace(/≤/g,"<=")
 .replace(/√/g,"raiz ").replace(/∑/g,"soma").replace(/π/g,"pi")
 .replace(/₁/g,"1").replace(/₂/g,"2").replace(/₃/g,"3").replace(/₀/g,"0")
 .replace(/ᵀ/g,"T").replace(/²/g,"2").replace(/³/g,"3")
 .replace(/[^\x20-\xFF\n]/g," ").replace(/ +/g," ").trim();
}
export async function downloadStudyPdf(request:PdfDocumentRequest){
 const {PDFDocument,StandardFonts,rgb}=await import("pdf-lib");
 const doc=await PDFDocument.create();
 doc.setTitle(clean(request.title));doc.setAuthor("Eduverso");
 doc.setSubject("Material de estudo e pratica");
 const regular=await doc.embedFont(StandardFonts.Helvetica);
 const bold=await doc.embedFont(StandardFonts.HelveticaBold);
 const purple=rgb(0.37,0.20,0.65),ink=rgb(0.14,0.12,0.21),muted=rgb(0.39,0.36,0.46),line=rgb(0.84,0.80,0.90);
 let page=doc.addPage([595.28,841.89]),y=779;
 const maxWidth=495;
 function drawHeader(){
  page.drawRectangle({x:0,y:825,width:595,height:17,color:purple});
  page.drawText("EDUVERSO  /  SEU UNIVERSO DE APRENDIZADO",{x:50,y:796,size:10,font:bold,color:purple});
  page.drawLine({start:{x:50,y:788},end:{x:545,y:788},color:line,thickness:0.7});
 }
 function nextPage(){page=doc.addPage([595.28,841.89]);drawHeader();y=763;}
 function ensure(height:number){if(y-height<65)nextPage();}
 function split(text:string,fontSize:number,font:typeof regular){
  const words=clean(text).split(/\s+/).filter(Boolean);
  const parts:string[]=[];let row="";
  for(const word of words){
   const candidate=row?row+" "+word:word;
   if(font.widthOfTextAtSize(candidate,fontSize)<=maxWidth){row=candidate;continue;}
   if(row)parts.push(row);
   row=word;
   if(font.widthOfTextAtSize(row,fontSize)>maxWidth){
    let chunk="";
    for(const c of row){if(font.widthOfTextAtSize(chunk+c,fontSize)>maxWidth){if(chunk)parts.push(chunk);chunk=c;}else chunk+=c;}
    row=chunk;
   }
  }
  if(row)parts.push(row);
  return parts.length?parts:[""];
 }
 function paragraph(text:string,size=10.5,isBold=false){
  const font=isBold?bold:regular;
  const paragraphs=text.split("\n");
  for(const original of paragraphs){
   const parts=split(original,size,font);
   for(const part of parts){ensure(size+6);page.drawText(part,{x:50,y,size,font,color:ink});y-=size+5;}
   y-=3;
  }
  y-=6;
 }
 drawHeader();y=760;
 ensure(70);
 paragraph(request.title,21,true);
 paragraph(request.subtitle,11);
 if(request.responseFields){
  ensure(48);
  paragraph("Aluno(a): ____________________________________     Turma: ___________",10);
  paragraph("Data: ____/____/________     Professor(a): __________________________",10);
  paragraph("Instrucoes: leia com atencao e assinale somente uma alternativa por questao. O gabarito comentado esta ao final deste documento.",9);
 }
 y-=8;
 for(const section of request.sections){
  if(section.pageBreakBefore)nextPage();
  // Mantenha o enunciado e as alternativas na mesma página quando couberem juntos.
  const fontSize=section.kind==="answer"?10:10.5;
  const sectionHeight=32+section.paragraphs.reduce((total,p)=>total+
    p.split("\n").reduce((lines,lineText)=>lines+split(lineText,fontSize,regular).length*(fontSize+5)+9,0)+6,0);
  ensure(section.kind==="chapter"?90:section.kind==="question"&&sectionHeight<640?sectionHeight:56);
  page.drawLine({start:{x:50,y:y+13},end:{x:545,y:y+13},color:section.kind==="chapter"?purple:line,thickness:section.kind==="chapter"?2:1});
  paragraph(section.heading,section.kind==="chapter"?19:section.kind==="answer"?12:13,true);
  for(const p of section.paragraphs)paragraph(p,fontSize);
  y-=section.kind==="chapter"?10:5;
 }
 if(request.note){ensure(55);paragraph("Nota sobre este material",12,true);paragraph(request.note,9);}
 const pages=doc.getPages();
 for(let i=0;i<pages.length;i++){
  const p=pages[i];
  p.drawLine({start:{x:50,y:50},end:{x:545,y:50},color:line,thickness:0.7});
  p.drawText("Eduverso • Material de apoio ao estudo",{x:50,y:35,size:8.5,font:regular,color:muted});
  p.drawText(`Pagina ${i+1} de ${pages.length}`,{x:450,y:35,size:8.5,font:regular,color:muted});
 }
 const bytes=await doc.save();
 const blob=new Blob([new Uint8Array(bytes)],{type:"application/pdf"});
 const url=URL.createObjectURL(blob);
 const link=document.createElement("a");link.href=url;link.download=request.fileName.endsWith(".pdf")?request.fileName:request.fileName+".pdf";
 document.body.appendChild(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),5000);
}
