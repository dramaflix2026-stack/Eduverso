"use client";
export type PdfSection={
 heading:string;paragraphs:string[];pageBreakBefore?:boolean;
 kind?:"standard"|"chapter"|"question"|"answer"|"example"|"highlight"|"summary";
};
export type PdfDocumentRequest={
 title:string;subtitle:string;fileName:string;
 sections:PdfSection[];note?:string;responseFields?:boolean;coverPage?:boolean;
};
function clean(value:string):string{
 return (value||"").replace(/[\r\t]+/g," ")
  .replace(/[“”]/g,'"').replace(/[‘’]/g,"'")
  .replace(/[—–−]/g," - ").replace(/[→⇒↗]/g," -> ").replace(/←/g," <- ")
  .replace(/×/g," x ").replace(/÷/g," / ")
  .replace(/≥/g,">=").replace(/≤/g,"<=").replace(/√/g,"raiz de ").replace(/∑/g,"soma")
  .replace(/π/g,"pi").replace(/[₀₁₂₃]/g,"").replace(/ᵀ/g,"T")
  .replace(/²/g,"2").replace(/³/g,"3")
  .replace(/[^\x20-\xFF\n]/g," ").replace(/ {2,}/g," ").trim();
}
export async function downloadStudyPdf(request:PdfDocumentRequest):Promise<void>{
 const {PDFDocument,StandardFonts,rgb}=await import("pdf-lib");
 const doc=await PDFDocument.create();
 doc.setTitle(clean(request.title));doc.setAuthor("Eduverso - Material Educacional");
 doc.setSubject(request.coverPage?"Apostila de estudos":"Apoio pedagógico e avaliação");
 doc.setKeywords(["Eduverso","educação","material didático"]);
 const font=await doc.embedFont(StandardFonts.Helvetica);
 const bold=await doc.embedFont(StandardFonts.HelveticaBold);
 const purple=rgb(.36,.19,.65),violet=rgb(.53,.34,.83),navy=rgb(.11,.08,.20);
 const ink=rgb(.15,.13,.21),muted=rgb(.43,.40,.50),line=rgb(.85,.82,.90);
 const subtle=rgb(.965,.949,.99),paper=rgb(.992,.991,.997),white=rgb(1,1,1);
 const W=595.28,H=841.89,LEFT=53,RIGHT=542,WIDTH=RIGHT-LEFT,MIN=80;
 const fontSize=10.8,leading=16.5;
 let page=doc.addPage([W,H]),y=764,coverPages=0;
 function wrap(value:string,size:number,f:typeof font,width=WIDTH):string[]{
  const out:string[]=[];
  for(const original of clean(value).split("\n")){
   let row="";
   for(const word of original.split(/\s+/).filter(Boolean)){
    const candidate=row?row+" "+word:word;
    if(f.widthOfTextAtSize(candidate,size)<=width){row=candidate;continue;}
    if(row){out.push(row);row="";}
    if(f.widthOfTextAtSize(word,size)<=width){row=word;continue;}
    let piece="";
    for(const char of word){
     if(f.widthOfTextAtSize(piece+char,size)>width&&piece){out.push(piece);piece=char;}
     else piece+=char;
    }
    row=piece;
   }
   out.push(row);
  }
  return out;
 }
 function topBar(p:typeof page){
  p.drawRectangle({x:0,y:H-15,width:W,height:15,color:purple});
  p.drawText("EDUVERSO",{x:LEFT,y:791,font:bold,size:11,color:purple});
  p.drawText("BIBLIOTECA DE CONHECIMENTO",{x:RIGHT-202,y:791,font:bold,size:7.4,color:muted});
  p.drawLine({start:{x:LEFT,y:780},end:{x:RIGHT,y:780},color:line,thickness:.75});
 }
 function newPage(){page=doc.addPage([W,H]);topBar(page);y=749;}
 function ensure(h:number){if(y-h<MIN)newPage();}
 function simpleLine(value:string,x:number,size:number,weight:"regular"|"bold"="regular",tone=ink,width=WIDTH,lh=size+6){
  const f=weight==="bold"?bold:font;
  const rows=wrap(value,size,f,width);
  for(const row of rows){ensure(lh);if(row)page.drawText(row,{x,y,size,font:f,color:tone});y-=lh;}
 }
 function textBlock(value:string,size=fontSize,opts?:{x?:number;width?:number;color?:typeof ink;bold?:boolean;after?:number;leading?:number}){
  const x=opts?.x??LEFT,width=opts?.width??WIDTH,tone=opts?.color??ink,f=opts?.bold?bold:font;
  const lh=opts?.leading??(size+5.7);
  const rows=wrap(value,size,f,width);
  for(const row of rows){
   ensure(lh);
   if(row)page.drawText(row,{x,y,size,font:f,color:tone});y-=lh;
  }
  y-=opts?.after??8;
 }
 function estimateParagraphs(paragraphs:string[],size:number,width=WIDTH){
  return paragraphs.reduce((h,p)=>h+wrap(p,size,font,width).length*(size+5.7)+10,0);
 }
 function drawCover(){
  coverPages=1;
  page.drawRectangle({x:0,y:0,width:W,height:H,color:navy});
  page.drawRectangle({x:0,y:H-16,width:W,height:16,color:violet});
  page.drawCircle({x:W-30,y:H-215,size:245,color:rgb(.19,.13,.34)});
  page.drawCircle({x:W+30,y:H-235,size:175,color:rgb(.28,.18,.48)});
  page.drawCircle({x:W-50,y:H-218,size:123,borderColor:rgb(.58,.40,.83),borderWidth:1.2,opacity:.55});
  page.drawRectangle({x:LEFT,y:H-140,width:48,height:48,color:violet});
  page.drawText("E",{x:LEFT+12,y:H-129,font:bold,size:30,color:white});
  page.drawText("EDUVERSO",{x:LEFT+61,y:H-115,font:bold,size:15,color:white});
  page.drawText("COLEÇÃO DE ESTUDOS",{x:LEFT,y:581,font:bold,size:11.5,color:rgb(.76,.64,.97)});
  let cy=539;
  for(const row of wrap(request.title.replace(/^Apostila de estudos\s*[-—]\s*/,""),30,bold,440).slice(0,5)){
   page.drawText(row,{x:LEFT,y:cy,size:30,font:bold,color:white});cy-=40;
  }
  cy-=12;
  for(const row of wrap(request.subtitle,12.2,font,425).slice(0,4)){
   page.drawText(row,{x:LEFT,y:cy,size:12.2,font,color:rgb(.85,.79,.92)});cy-=20;
  }
  page.drawLine({start:{x:LEFT,y:244},end:{x:RIGHT,y:244},thickness:1,color:rgb(.43,.31,.62)});
  page.drawText(request.sections.filter(s=>s.kind==="chapter"&&!/Referências|Gabarito|Atividades de fixação/.test(s.heading)).length.toString().padStart(2,"0")+"   CAPÍTULOS E SEÇÕES",{x:LEFT,y:209,size:11,font:bold,color:rgb(.91,.83,1)});
  page.drawText("TEORIA  /  EXEMPLOS  /  REVISÃO",{x:LEFT,y:179,size:9,font:bold,color:rgb(.71,.64,.85)});
  page.drawText("MATERIAL DIDÁTICO  -  EDUVERSO",{x:LEFT,y:66,size:8.5,font:bold,color:rgb(.70,.60,.82)});
  newPage();
 }
 if(request.coverPage)drawCover();
 else{topBar(page);y=749;}
 let chapterNumber=0;
 if(request.responseFields){
  ensure(140);
  textBlock(request.title,22,{bold:true,leading:27,after:8});
  textBlock(request.subtitle,10.5,{color:muted,after:18});
  textBlock("ALUNO(A): _____________________________________________   TURMA: ______________",9.5,{after:6});
  textBlock("DATA: ____/____/________   PROFESSOR(A): _________________________________",9.5,{after:9});
  page.drawRectangle({x:LEFT,y:y-25,width:WIDTH,height:40,color:subtle});
  y-=9;
  textBlock("Leia as questões com atenção. O gabarito está em seção separada ao final do arquivo.",9.3,{x:LEFT+11,width:WIDTH-22,after:20,color:muted});
 }else if(!request.coverPage){
  ensure(88);textBlock(request.title,21,{bold:true,leading:26,after:8});textBlock(request.subtitle,11,{color:muted,after:14});
 }
 for(const section of request.sections){
  const kind=section.kind||"standard";
  if(section.pageBreakBefore&&y<720)newPage();
  const bodySize=kind==="answer"?10.3:kind==="question"?11:fontSize;
  const narrow=kind==="example"||kind==="highlight"||kind==="question"?WIDTH-28:WIDTH;
  const full=estimateParagraphs(section.paragraphs,bodySize,narrow)+wrap(section.heading,kind==="chapter"?21:13.5,bold,WIDTH).length*25+22;
  if(kind==="chapter"){ensure(Math.min(Math.max(full,100),170));chapterNumber++;
   page.drawRectangle({x:LEFT,y:y-4,width:36,height:20,color:purple});
   page.drawText(String(chapterNumber).padStart(2,"0"),{x:LEFT+7,y:y+2,font:bold,size:10,color:white});
   y-=30;
   for(const row of wrap(section.heading,21,bold,WIDTH)){ensure(31);page.drawText(row,{x:LEFT,y,size:21,font:bold,color:navy});y-=29;}
   y-=7;page.drawLine({start:{x:LEFT,y:y+8},end:{x:RIGHT,y:y+8},color:line,thickness:1});
   for(const paragraph of section.paragraphs)textBlock(paragraph,11.1,{leading:17.6,after:12});
   y-=11;
   continue;
  }
  if((kind==="question"||kind==="answer")&&full<=620)ensure(full+15);
  else ensure(Math.min(full+10,115));
  const box=kind==="example"||kind==="highlight"||kind==="question";
  const boxFill=kind==="highlight"?rgb(.985,.965,.947):subtle;
  const x=box?LEFT+14:LEFT,width=box?WIDTH-28:WIDTH;
  if(box&&full<650){
   page.drawRectangle({x:LEFT,y:y-full+8,width:WIDTH,height:full+3,color:boxFill,
    borderColor:kind==="question"?line:rgb(.87,.82,.95),borderWidth:.8});
  }
  if(kind==="summary"){
   y-=5;
   page.drawLine({start:{x:LEFT,y:y+7},end:{x:RIGHT,y:y+7},thickness:1,color:line});
  }
  const headingTone=kind==="highlight"?rgb(.55,.31,.23):purple;
  for(const row of wrap(section.heading,kind==="question"?13.6:13.5,bold,width)){
   ensure(25);page.drawText(row,{x,y,size:kind==="question"?13.6:13.5,font:bold,color:headingTone});y-=23;
  }
  y-=2;
  for(const text of section.paragraphs){
   textBlock(text,bodySize,{x,width,leading:bodySize+5.7,after:kind==="question"?7:10,color:ink});
  }
  y-=kind==="question"?17:kind==="example"?19:13;
 }
 if(request.note){
  ensure(105);
  page.drawLine({start:{x:LEFT,y:y+11},end:{x:RIGHT,y:y+11},color:line,thickness:1});
  textBlock("NOTA EDITORIAL",{bold:true,color:purple,after:7,size:10});
  textBlock(request.note,9.5,{color:muted,leading:14.5,after:5});
 }
 const pages=doc.getPages();
 pages.forEach((p,index)=>{
  if(index<coverPages)return;
  p.drawLine({start:{x:LEFT,y:62},end:{x:RIGHT,y:62},color:line,thickness:.8});
  p.drawText("EDUVERSO  /  MATERIAL DE ESTUDO",{x:LEFT,y:44,size:8,font:bold,color:muted});
  p.drawText("Página "+(index+1)+" de "+pages.length,{x:RIGHT-87,y:44,size:8,font,color:muted});
 });
 const bytes=await doc.save();
 const blob=new Blob([new Uint8Array(bytes)],{type:"application/pdf"});
 const url=URL.createObjectURL(blob);
 const a=document.createElement("a");
 a.href=url;a.download=request.fileName.endsWith(".pdf")?request.fileName:request.fileName+".pdf";
 document.body.appendChild(a);a.click();a.remove();
 window.setTimeout(()=>URL.revokeObjectURL(url),7000);
}
