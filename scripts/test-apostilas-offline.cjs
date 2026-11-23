/* Smoke test real do motor editorial Eduverso, sem dependência da API OpenAI. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const ts=require("typescript");

require.extensions[".ts"]=(mod,filename)=>{
 const src=fs.readFileSync(filename,"utf8");
 const js=ts.transpileModule(src,{fileName:filename,compilerOptions:{
  module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,
  moduleResolution:ts.ModuleResolutionKind.Node10,esModuleInterop:true,
  jsx:ts.JsxEmit.ReactJSX
 }}).outputText;
 mod._compile(js,filename);
};

const {createOfflineBooklet}=require("../app/booklet-offline.ts");
const {downloadStudyPdf}=require("../app/lib/lesson-pdf.ts");
function result(subject,topic,limit,format="teoria",options={}){
 return createOfflineBooklet({subject,topic,limit,format,lessons:[],...options});
}
async function validatePdf(){
 // Browser download stub: captures the exact pdf-lib output without opening a browser.
 let generated=null;
 global.URL.createObjectURL=blob=>{generated=blob;return "blob:eduverso-test";};
 global.URL.revokeObjectURL=()=>{};
 global.document={body:{appendChild(){}},createElement(){return{
  set href(v){this._href=v;},set download(v){this._download=v;},click(){},remove(){}
 }}};
 global.window={setTimeout(){}};
 const climate=result("Geografia","Climas",5);
 assert.ok(climate.document,"Climas 5 capítulos: conteúdo bloqueado indevidamente");
 assert.equal(climate.requested,5);
 assert.equal(climate.reviewed,5);
 const chapters=climate.document.sections.filter(s=>s.kind==="chapter"&&/^\d{2}  /.test(s.heading));
 assert.equal(chapters.length,5,"Quantidade de capítulos diferente da solicitada");
 chapters.forEach((ch,i)=>{
  assert.ok(ch.paragraphs.join(" ").split(/\s+/).length>=200,"Capítulo "+(i+1)+" curto demais");
  assert.ok(ch.diagram&&ch.diagram.labels.length>=2,"Diagrama ausente no capítulo "+(i+1));
 });
 await downloadStudyPdf(climate.document);
 assert.ok(generated,"Falhou a exportação pelo pdf-lib");
 const bytes=new Uint8Array(await generated.arrayBuffer());
 assert.ok(bytes.length>15000,"PDF inesperadamente pequeno: "+bytes.length);
 fs.mkdirSync(path.join(__dirname,"../test-artifacts"),{recursive:true});
 fs.writeFileSync(path.join(__dirname,"../test-artifacts/climas-sem-ia-5-capitulos.pdf"),bytes);
 const {PDFDocument}=require("pdf-lib");
 const pdf=await PDFDocument.load(bytes);
 assert.ok(pdf.getPageCount()>=5,"PDF contém poucas páginas: "+pdf.getPageCount());

 // Real page text extraction: detect empty pages and verify all chapters appear.
 // Use the real Node.js runtime for pdfjs; the browser mocks are no longer needed.
 delete global.window;delete global.document;
 const pdfjs=await import("pdfjs-dist/legacy/build/pdf.mjs");
 const reader=await pdfjs.getDocument({data:new Uint8Array(bytes),useSystemFonts:true,disableFontFace:true}).promise;
 const perPage=[];
 for(let i=1;i<=reader.numPages;i++){
  const pg=await reader.getPage(i);
  const txt=(await pg.getTextContent()).items.map(t=>t.str||"").join(" ").trim();
  perPage.push(txt);
  assert.ok(txt.length>45,"Página "+i+" aparentemente vazia ("+txt.length+" caracteres)");
 }
 const full=perPage.join(" ");
 for(const name of ["Tempo atmosférico","Latitude","Circulação do ar","Climas brasileiros","Climogramas"]){
  assert.ok(full.includes(name),"Capítulo ausente no PDF: "+name);
 }
 await reader.destroy();
 console.log("PDF CLIMAS OK",JSON.stringify({pages:pdf.getPageCount(),bytes:bytes.length,charsPerPage:perPage.map(x=>x.length)}));
}
async function main(){
 for(const topic of ["Biomas e Vegetação","Climas"]){
  const good=result("Geografia",topic,5);
  assert.ok(good.document,topic+" deveria aceitar 5 capítulos");
  assert.equal(good.requested,5);
  assert.equal(good.reviewed,5);
  assert.equal(good.missing.length,0);
  assert.equal(good.document.sections.filter(s=>s.kind==="chapter"&&/^\d{2}  /.test(s.heading)).length,5);
  const activities=result("Geografia",topic,5,"com-atividades");
  assert.ok(activities.document,"Formato com atividades deve estar disponível: "+topic);
  assert.equal(activities.document.sections.filter(s=>/^Atividade \d{2}$/.test(s.heading)&&s.kind==="question").length,5);
  assert.equal(activities.document.sections.filter(s=>/^Atividade \d{2}$/.test(s.heading)&&s.kind==="answer").length,5);
  for(const count of [10,15,20]){
   const blocked=result("Geografia",topic,count);
   assert.equal(blocked.document,null,"O sistema não pode apresentar 5 capítulos como "+count);
   assert.equal(blocked.requested,count);
   assert.equal(blocked.reviewed,5);
   assert.equal(blocked.missing.length,count-5);
  }
 }
 // Never silently generate a Geografia booklet from Mathematics lesson sources.
 const unrelated=createOfflineBooklet({
  subject:"Filosofia",topic:"Ética",sourceSubject:"Matemática",sourceTopic:"Frações",
  limit:5,format:"teoria",lessons:Array.from({length:5},(_,i)=>({
   title:"Fração "+i,question:"Qual é a resposta correta?",options:["1","2","3"],correct:0,
   example:"Exemplo da Matemática",body:"Uma explicação curta."
  }))
 });
 assert.equal(unrelated.document,null,"Tema personalizado usou conteúdo de outra disciplina");
 const shallow=createOfflineBooklet({subject:"Matemática",topic:"Frações",limit:5,format:"teoria",
  lessons:Array.from({length:5},(_,i)=>({
   title:"Aula "+i,question:"Qual é a fração?",options:["1","2","3"],correct:0,
   example:"Exemplo curto.",body:"Explicação insuficiente."
  }))});
 assert.equal(shallow.document,null,"Apostila superficial foi aceita como aprofundada");
 await validatePdf();
 console.log("TODOS OS TESTES DE APOSTILAS OFFLINE PASSARAM");
}
main().catch(e=>{console.error(e);process.exitCode=1});
