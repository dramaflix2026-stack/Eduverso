import {generateExercises,topics,levels,type Topic,type Difficulty} from "../../../fraction-exercises";
import {NextRequest,NextResponse} from "next/server";
export const runtime="nodejs";
const questions=[
"1. Uma pizza foi dividida em 8 fatias iguais. Joao comeu 3. Qual fracao ele comeu?",
"2. Em 5/9, identifique o numerador e o denominador.",
"3. Represente 2/5 como duas partes de cinco partes iguais.",
"4. Qual e a fracao equivalente a 1/2: 2/4, 2/5 ou 3/4?",
"5. Complete: 2/3 = __/6.",
"6. Qual fracao e maior: 3/7 ou 5/7? Explique.",
"7. Compare 2/5 e 2/3. Qual e maior?",
"8. Calcule: 1/6 + 3/6.",
"9. Calcule: 5/8 - 2/8.",
"10. Uma receita usa 3/4 de xicara de leite. Se ja foram usados 1/4, quanto falta?",
"11. De 12 alunos, 4 usam oculos. Qual fracao da turma usa oculos? Simplifique.",
"12. Uma barra de chocolate tem 10 pedacos. Ana comeu 2 e Bruno comeu 3. Qual fracao foi comida ao todo?"
];
const answers=[
"1. 3/8. Sao tres fatias de um total de oito partes iguais.",
"2. Numerador = 5; denominador = 9. O numerador conta partes; o denominador define o total.",
"3. Divida uma figura em cinco partes iguais e pinte duas. Isso representa 2/5.",
"4. 2/4. Multiplicar numerador e denominador de 1/2 por 2 preserva o valor.",
"5. 4. Multiplique numerador e denominador de 2/3 por 2: 4/6.",
"6. 5/7. Com denominadores iguais, compare os numeradores: 5 > 3.",
"7. 2/3. Com numeradores iguais, partes de tercos sao maiores que partes de quintos.",
"8. 4/6 = 2/3. Some os numeradores e mantenha o denominador; depois simplifique.",
"9. 3/8. Subtraia os numeradores: 5 - 2 = 3; mantenha 8.",
"10. 2/4 = 1/2 de xicara. Subtraia 3/4 - 1/4.",
"11. 4/12 = 1/3. Divida numerador e denominador por 4.",
"12. 5/10 = 1/2. Foram consumidos 2 + 3 = 5 pedacos de 10."
];
const summary=[
"FRACOES - RESUMO DE ESTUDO",
"",
"1. O QUE E UMA FRACAO?",
"Uma fracao representa partes iguais de um inteiro. Exemplo: 3/4 significa tres de quatro partes.",
"",
"2. NUMERADOR E DENOMINADOR",
"O numerador fica acima da linha e indica as partes consideradas.",
"O denominador fica abaixo e indica em quantas partes iguais o inteiro foi dividido.",
"",
"3. FRACOES EQUIVALENTES",
"Multiplicar ou dividir numerador e denominador pelo mesmo numero nao nulo preserva o valor.",
"Exemplos: 1/2 = 2/4 = 3/6. Para simplificar 4/8, divida ambos por 4: 1/2.",
"",
"4. COMPARACAO",
"Com denominadores iguais, a maior fracao tem maior numerador: 4/7 > 2/7.",
"Com numeradores iguais e positivos, o menor denominador indica partes maiores: 2/3 > 2/5.",
"",
"5. ADICAO E SUBTRACAO",
"Quando os denominadores sao iguais, some ou subtraia os numeradores.",
"Exemplos: 1/5 + 2/5 = 3/5; 5/8 - 2/8 = 3/8.",
"Com denominadores diferentes, encontre um denominador comum antes de operar.",
"",
"6. SITUACOES DO COTIDIANO",
"Receitas, medidas, pizzas e divisoes usam fracoes.",
"Exemplo: 2 fatias de uma pizza de 8 fatias correspondem a 2/8 = 1/4.",
"",
"LEMBRETE: Para representar uma fracao de um unico inteiro, as partes devem ser iguais."
];
function ascii(s:string){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\x20-\x7e]/g,"?")}
function pdf(lines:string[],title:string){const pages:string[][]=[];let page:string[]=[];for(const line of lines){const parts=ascii(line).match(/.{1,88}(?:\\s|$)|.{1,88}/g)||[""];for(const part of parts){if(page.length>=45){pages.push(page);page=[]}page.push(part.trim())}}if(page.length)pages.push(page);const objects:string[]=[""];const add=(s:string)=>{objects.push(s);return objects.length-1};const catalog=add("");const root=add("");const font=add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");const pageIds:number[]=[];for(let p=0;p<pages.length;p++){const commands:string[]=["BT","/F1 11 Tf","50 790 Td","15 TL"];const header=ascii(title+" | Eduverso | Pagina "+(p+1));commands.push("("+header.replace(/[()\\]/g,"\\$&")+") Tj","0 -27 Td");for(const raw of pages[p]){const text=ascii(raw);const max=88;const parts=text.match(new RegExp(".{1,"+max+"}(?:\\s|$)|.{1,"+max+"}","g"))||[""];for(const part of parts){commands.push("("+part.trim().replace(/[()\\]/g,"\\$&")+") Tj","T*")}}commands.push("ET");const stream=commands.join("\n")+"\n";const streamId=add("<< /Length "+Buffer.byteLength(stream,"latin1")+" >>\nstream\n"+stream+"endstream");const pageId=add("<< /Type /Page /Parent "+root+" 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 "+font+" 0 R >> >> /Contents "+streamId+" 0 R >>");pageIds.push(pageId)}objects[root]="<< /Type /Pages /Count "+pageIds.length+" /Kids ["+pageIds.map(i=>i+" 0 R").join(" ")+"] >>";objects[catalog]="<< /Type /Catalog /Pages "+root+" 0 R >>";let output="%PDF-1.4\n";const offsets=[0];for(let i=1;i<objects.length;i++){offsets[i]=Buffer.byteLength(output,"latin1");output+=i+" 0 obj\n"+objects[i]+"\nendobj\n"}const start=Buffer.byteLength(output,"latin1");output+="xref\n0 "+objects.length+"\n0000000000 65535 f \n";for(let i=1;i<objects.length;i++)output+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";output+="trailer\n<< /Size "+objects.length+" /Root "+catalog+" 0 R >>\nstartxref\n"+start+"\n%%EOF";return Buffer.from(output,"latin1")}
export async function GET(request:NextRequest,{params}:{params:Promise<{tipo:string}>}){const {tipo}=await params;const url=new URL(request.url);const rawTopic=url.searchParams.get("tema")||"Todas as aulas";const topic:Topic=topics.includes(rawTopic as Topic)?rawTopic as Topic:"Todas as aulas";const rawLevel=url.searchParams.get("nivel")||"Misto";const level:Difficulty=levels.includes(rawLevel as Difficulty)?rawLevel as Difficulty:"Misto";const count=Math.max(5,Math.min(30,Number(url.searchParams.get("quantidade"))||12));const id=Number(url.searchParams.get("id"))||1;const generated=generateExercises(topic,level,count,id);const title=tipo==="exercicios"?"Lista de exercicios - Fracoes":tipo==="gabarito"?"Gabarito comentado - Fracoes":"Resumo - Fracoes";let lines:string[];if(tipo==="exercicios"){lines=["NOME: ____________________________________ DATA: ____/____/______","Versao: "+id+" | Tema: "+topic+" | Nivel: "+level,"Resolva as questoes. Cada lista possui gabarito da mesma versao.","",...generated.flatMap((q,i)=>[(i+1)+". "+q.question,"Resposta: __________________________________________",""])]}else if(tipo==="gabarito"){lines=["Versao: "+id+" | Tema: "+topic+" | Nivel: "+level,"Gabarito desta versao especifica. Confira apos resolver.","",...generated.flatMap((q,i)=>[(i+1)+". "+q.question,"Resposta: "+q.answer,"Explicacao: "+q.explanation,""])]}else if(tipo==="resumo"){const format=url.searchParams.get("formato")||"Completo";const groups:Record<string,string[]>={"Conceitos básicos":summary.slice(2,9),"Frações equivalentes":summary.slice(9,14),"Comparação":summary.slice(14,19),"Operações":summary.slice(19,25),"Problemas cotidianos":summary.slice(25)};const content=topic==="Todas as aulas"?summary:groups[topic]||summary;lines=["Tema: "+topic+" | Formato: "+format,"",...(format==="Rápido"?content.filter((_,i)=>i%2===0):content),...(format==="Com exemplos"?["","EXEMPLOS PARA PRATICAR",...generateExercises(topic,"Fácil",5,42).flatMap((q,i)=>[(i+1)+". "+q.question,"Resposta: "+q.answer+" - "+q.explanation])]:[])]}else{return new NextResponse("Material nao encontrado",{status:404})}return new NextResponse(new Uint8Array(pdf(lines,title)),{headers:{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="eduverso-fracoes-'+tipo+'-'+id+'.pdf"',"Cache-Control":"no-store"}})}
