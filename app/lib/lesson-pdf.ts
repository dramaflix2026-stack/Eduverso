"use client";
export type PdfSection={
 heading:string;paragraphs:string[];pageBreakBefore?:boolean;
 diagram?:{title:string;labels:string[];caption:string};
 kind?:"standard"|"chapter"|"question"|"answer"|"example"|"highlight"|"summary";
};
export type PdfDocumentRequest={
 title:string;subtitle:string;fileName:string;
 sections:PdfSection[];note?:string;responseFields?:boolean;coverPage?:boolean;expectedContentPages?:number;
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
 function drawDidacticDiagram(diagram:NonNullable<PdfSection["diagram"]>){
  const labels=diagram.labels.map(label=>clean(label).slice(0,64)).filter(Boolean).slice(0,5);
  if(labels.length<2)return;
  const diagramH=131;
  ensure(diagramH);
  const top=y+7;
  page.drawRectangle({x:LEFT,y:top-diagramH+5,width:WIDTH,height:diagramH,
    color:subtle,borderColor:line,borderWidth:.9});
  page.drawText(clean(diagram.title).slice(0,72),{x:LEFT+12,y:top-14,font:bold,size:11,color:purple});
  const gap=12;
  const boxW=(WIDTH-32-(labels.length-1)*gap)/labels.length;
  const boxY=top-79;
  labels.forEach((label,i)=>{
   const x=LEFT+16+i*(boxW+gap);
   page.drawRectangle({x,y:boxY,width:boxW,height:38,color:white,borderColor:violet,borderWidth:1});
   const rows=wrap(label,8.7,bold,boxW-10).slice(0,2);
   rows.forEach((row,j)=>page.drawText(row,{x:x+5,y:boxY+23-j*11,font:bold,size:8.7,color:navy}));
   if(i<labels.length-1){
    const ax=x+boxW,ay=boxY+19;
    page.drawLine({start:{x:ax+1,y:ay},end:{x:ax+gap-3,y:ay},thickness:1,color:violet});
    page.drawLine({start:{x:ax+gap-7,y:ay+3},end:{x:ax+gap-3,y:ay},thickness:1,color:violet});
    page.drawLine({start:{x:ax+gap-7,y:ay-3},end:{x:ax+gap-3,y:ay},thickness:1,color:violet});
   }
  });
  wrap(diagram.caption,8.2,font,WIDTH-32).slice(0,2).forEach((row,j)=>{
   page.drawText(row,{x:LEFT+16,y:boxY-18-j*11,font,size:8.2,color:muted});
  });
  y=top-diagramH-12;
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
  const isPanel=kind==="example"||kind==="highlight"||kind==="question";
  const contentWidth=isPanel?WIDTH-32:WIDTH;
  const contentX=isPanel?LEFT+16:LEFT;
  const headingSize=kind==="chapter"?20:13.4;
  const headingLines=wrap(section.heading,headingSize,bold,contentWidth);
  const lineH=bodySize+5.7;
  const pAfter=kind==="question"?6:9;
  const textHeight=section.paragraphs.reduce((sum,p)=>sum+wrap(p,bodySize,font,contentWidth).length*lineH+pAfter,0);
  const headingHeight=headingLines.length*(kind==="chapter"?27:22);
  const totalHeight=headingHeight+textHeight+(kind==="chapter"?53:isPanel?35:25);
  if(kind==="chapter"){
   // Capítulos curtos continuam na mesma página; mudanças ocorrem pelo espaço real.
   ensure(Math.min(totalHeight,155));
   chapterNumber++;
   page.drawRectangle({x:LEFT,y:y-6,width:42,height:21,color:purple});
   page.drawText(String(chapterNumber).padStart(2,"0"),{x:LEFT+11,y:y,font:bold,size:10,color:white});
   y-=34;
   for(const row of headingLines){
    ensure(30);page.drawText(row,{x:LEFT,y,size:20,font:bold,color:navy});y-=27;
   }
   y-=5;
   page.drawLine({start:{x:LEFT,y:y+9},end:{x:RIGHT,y:y+9},color:line,thickness:1});
   y-=12;
   for(const paragraph of section.paragraphs)textBlock(paragraph,11.1,{leading:17.3,after:11});
   if(section.diagram)drawDidacticDiagram(section.diagram);
   y-=14;
   continue;
  }
  // A caixa deve abranger todo o texto, nunca cruzar o bloco seguinte.
  // Para conteúdo muito longo, a caixa é omitida e o texto flui entre páginas.
  const availableHeight=y-MIN;
  const wholeBlock=totalHeight<=availableHeight||totalHeight<570;
  if(wholeBlock&&totalHeight<660)ensure(totalHeight+5);
  else ensure(45);
  const panelCanFit=isPanel&&totalHeight<650&&y-totalHeight>MIN;
  if(panelCanFit){
   page.drawRectangle({x:LEFT,y:y-totalHeight+2,width:WIDTH,height:totalHeight,
    color:kind==="highlight"?rgb(.991,.970,.936):subtle,
    borderColor:kind==="question"?line:rgb(.87,.82,.95),borderWidth:.8});
  }
  if(kind==="summary"){
   y-=5;
   page.drawLine({start:{x:LEFT,y:y+8},end:{x:RIGHT,y:y+8},color:line,thickness:.8});
  }
  y-=isPanel?14:6;
  const tone=kind==="highlight"?rgb(.52,.29,.19):purple;
  for(const row of headingLines){ensure(24);page.drawText(row,{x:contentX,y,size:headingSize,font:bold,color:tone});y-=22;}
  y-=5;
  for(const paragraph of section.paragraphs){
   textBlock(paragraph,bodySize,{x:contentX,width:contentWidth,leading:lineH,after:pAfter,color:ink});
  }
  // Espaço visual real entre cartões e capítulo seguinte; evita número roxo colado/por cima da caixa.
  y-=isPanel?27:8;
 }
 if(request.note){
  ensure(105);
  page.drawLine({start:{x:LEFT,y:y+11},end:{x:RIGHT,y:y+11},color:line,thickness:1});
  textBlock("NOTA EDITORIAL",10,{bold:true,color:purple,after:7});
  textBlock(request.note,9.5,{color:muted,leading:14.5,after:5});
 }
 const pages=doc.getPages();
 // Never quietly export a thin or padded document when the user asked for
 // a precise number of substantive theory pages. The cover is excluded.
 if(request.expectedContentPages!==undefined&&pages.length-coverPages!==request.expectedContentPages){
  throw new Error("A diagramação não conseguiu manter "+request.expectedContentPages+" páginas de teoria com a densidade solicitada. O PDF não foi baixado; ajuste a geração antes de tentar novamente.");
 }
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
