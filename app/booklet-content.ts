import type {LessonSource} from "./exercise-bank";
import type {PdfDocumentRequest,PdfSection} from "./lib/lesson-pdf";
import type {ProfessionalLesson} from "./learning-professions";
import {getDeepChapter,richChapterCount} from "./booklet-rich-content";
export type BookletFormat="teoria"|"com-atividades";
type Enrichment={introduction:string[];sections:{heading:string;paragraphs:string[]}[];sources:{name:string;url:string}[]};
const percent:Enrichment={
 introduction:[
 "A porcentagem é uma maneira de expressar proporções usando 100 como base. Em vez de decorar uma fórmula diferente para cada situação, identifique o valor de referência, a taxa e o resultado que está sendo procurado. Esse raciocínio permite resolver desde comparações simples até aumentos e descontos sucessivos.",
 "Uma taxa de 25% corresponde à fração 25/100 e ao número decimal 0,25. Para encontrar 25% de um valor, multiplique esse valor por 0,25. Na operação inversa, a parte conhecida pode ser dividida pela taxa decimal para encontrar o total.",
 "Uma mudança de 10% não significa sempre acrescentar ou retirar a mesma quantidade: depende da base sobre a qual a taxa é aplicada. Quando há várias mudanças, cada fator incide sobre o valor atualizado. Por isso, dois aumentos de 10% representam o fator 1,10 x 1,10 = 1,21, isto é, aumento acumulado de 21%."
 ],
 sections:[
  {heading:"Como compreender uma taxa",paragraphs:[
   "Comece pela pergunta: 100% de quê? O valor de referência é fundamental. Se o preço de um produto é R$ 200, então 100% corresponde a R$ 200. Uma parcela de 15% é 0,15 x 200 = R$ 30.",
   "Taxa, parte e total podem ser representados pela relação parte = taxa decimal x total. Para calcular a taxa, divida parte por total; para recuperar o total, divida a parte pela taxa. Use sempre unidades coerentes e confira se o resultado faz sentido."
  ]},
  {heading:"Variações, aumentos e descontos",paragraphs:[
   "Para um aumento de 12%, multiplique o valor por 1,12. Para um desconto de 12%, multiplique por 0,88. Esses fatores evitam a soma de valores percentuais sobre bases diferentes.",
   "Exemplo: um produto de R$ 100 sofre desconto de 20% e depois aumento de 20%. O resultado é 100 x 0,80 x 1,20 = R$ 96. Não se retorna a R$ 100 porque o segundo cálculo usa R$ 80 como base."
  ]},
  {heading:"Como conferir a resposta",paragraphs:[
   "Antes de calcular, estime o resultado. Se a taxa é de 5%, a parcela deve ser pequena em relação ao total. Se você obteve um resultado maior que o total com taxa inferior a 100%, verifique se dividiu ou multiplicou corretamente.",
   "Nos problemas com dinheiro, informe a unidade monetária e mantenha a precisão adequada. Nos problemas com quantidade de pessoas, analise a possibilidade de números inteiros e o contexto do enunciado."
  ]}
 ],
 sources:[{name:"Khan Academy — Porcentagens sucessivas",url:"https://pt.khanacademy.org/math/em-mat-algebra/x34e9dd8107ca5eda%3Aestudo-das-taxas/x34e9dd8107ca5eda%3Aporcentagem/a/calculando-porcentagens-progressivas"}]
};
const cells:Enrichment={
 introduction:[
 "A teoria celular reúne ideias essenciais para o estudo da vida: os organismos são constituídos de células, a célula é a unidade estrutural e funcional dos seres vivos, e novas células surgem de células preexistentes. O conjunto de reações que ocorre na célula permite obter energia, construir moléculas e manter condições adequadas à vida.",
 "Em células eucarióticas, o núcleo é delimitado por membrana e abriga grande parte do material genético. Em procariontes, o DNA não fica contido em um núcleo envolvido por membrana. A comparação deve considerar também organelas, organização interna e funções, evitando tratar todas as células de um mesmo grupo como idênticas.",
 "Membranas celulares são estruturas dinâmicas organizadas principalmente em uma bicamada de lipídios, com proteínas associadas. Parte das substâncias atravessa a membrana por mecanismos passivos; outras exigem proteínas transportadoras específicas e energia direta ou indireta.",
 "Osmose é o movimento líquido de água através de uma membrana semipermeável em resposta a diferenças de potencial da água. Em meio hipotônico, uma célula animal pode ganhar água e inchar. Em células vegetais, a parede celular contribui para limitar a expansão e produzir pressão de turgor."
 ],
 sections:[
  {heading:"Estruturas celulares e suas relações",paragraphs:[
   "O citoplasma inclui o citosol e as estruturas nele presentes. Mitocôndrias participam da respiração celular e do metabolismo energético. Ribossomos realizam a síntese de proteínas. O retículo endoplasmático e o complexo golgiense participam do processamento, da síntese e do transporte de diferentes moléculas.",
   "Cloroplastos são encontrados em muitos organismos eucarióticos fotossintetizantes, incluindo plantas e algas. Não são uma característica de células animais. A parede celular vegetal proporciona suporte e participa da manutenção da forma, mas não substitui as funções seletivas da membrana plasmática."
  ]},
  {heading:"Transporte pela membrana",paragraphs:[
   "Na difusão simples, algumas moléculas se deslocam espontaneamente a favor do gradiente. Na difusão facilitada, proteínas da membrana participam do transporte, sem consumo direto de ATP pelo próprio mecanismo. No transporte ativo, há deslocamento contra o gradiente eletroquímico, com uso direto ou indireto de energia.",
   "Um exemplo clássico de transporte ativo primário é a bomba de sódio e potássio, que utiliza ATP para manter gradientes de íons. Esses gradientes são importantes para vários processos fisiológicos."
  ]},
  {heading:"Como estudar citologia",paragraphs:[
   "Ao analisar cada componente, responda a três perguntas: onde está localizado, qual função desempenha e como se relaciona com as demais estruturas? Comparar células procarióticas, animais e vegetais em uma tabela pode facilitar a revisão.",
   "Diferencie os fenômenos por sua condição: direção do movimento, participação de proteínas e uso de energia. Essa estratégia é mais confiável do que memorizar termos isolados."
  ]}
 ],
 sources:[{name:"OpenStax — Estrutura e função celular / transporte passivo",url:"https://query.libretexts.org/Idioma_Portugues/Livro%3A_Conceitos_em_Biologia_%28OpenStax%29/03%3A_Estrutura_e_fun%C3%A7%C3%A3o_celular/3.05%3A_Transporte_passivo"}]
};
function getEnrichment(subject:string,topic:string):Enrichment|undefined{
 if(subject==="Matemática"&&topic.toLocaleLowerCase("pt-BR").includes("porcentagem"))return percent;
 if(subject==="Biologia"&&topic.toLocaleLowerCase("pt-BR").includes("célul"))return cells;
 return undefined;
}
const letters=["A","B","C","D","E"];
const sentence=(s:string)=>s.trim().replace(/\s+/g," ");
export function makeBooklet(subject:string,topic:string,limit:number,items:LessonSource[],format:BookletFormat="teoria"):PdfDocumentRequest|null{
 const lessons=items.slice(0,Math.max(1,Math.min(20,limit)));
 if(!lessons.length)return null;
 const prepared=getEnrichment(subject,topic);
 const isProfessional=items.some(x=>"reference" in x);
 const isActivities=format==="com-atividades";
 const sections:PdfSection[]=[
  {heading:"Seu roteiro de aprendizagem",kind:"chapter",paragraphs:[
   "Este material foi preparado para leitura, compreensão e revisão do tema "+topic+". Leia a explicação antes de resolver qualquer atividade. Retome exemplos e anote dúvidas ao longo dos capítulos.",
   "Ao concluir, você deverá ser capaz de reconhecer os conceitos apresentados, explicar seu significado com suas palavras e relacioná-los às aplicações demonstradas."
  ]},
  {heading:"O que você vai estudar",kind:"summary",paragraphs:lessons.map((l,i)=>String(i+1).padStart(2,"0")+"  "+l.title)}
 ];
 if(prepared){
  sections.push({heading:"Fundamentos essenciais",kind:"chapter",paragraphs:prepared.introduction});
  for(const block of prepared.sections)sections.push({heading:block.heading,kind:"standard",paragraphs:block.paragraphs});
 }
 lessons.forEach((lesson,i)=>{
  const professional=lesson as ProfessionalLesson;
  const explanation=sentence(lesson.body||lesson.explain||"");
  const example=sentence(lesson.example||"");
  const ownContext=typeof professional.context==="string"?professional.context:"";
  const pitfall=typeof professional.pitfall==="string"?professional.pitfall:"";
  const deep=getDeepChapter(subject,topic,lesson.title);
  const heading=String(i+1).padStart(2,"0")+"  "+lesson.title;
  // Nunca apresentar um resumo de uma linha como se fosse uma aula aprofundada.
  // O banco de questões fornece a base; os capítulos editoriais complementam a teoria.
  const theory=deep?.theory?.length?deep.theory:[explanation];
  sections.push({heading,kind:"chapter",paragraphs:theory});
  if(deep?.worked?.length)sections.push({heading:"Resolução orientada passo a passo",kind:"example",paragraphs:deep.worked});
  else if(example)sections.push({heading:"Exemplo aplicado",kind:"example",paragraphs:[example]});
  if(ownContext)sections.push({heading:"Conexão com a prática",kind:"standard",paragraphs:[ownContext]});
  const caution=deep?.warnings?.length?deep.warnings:(pitfall?[pitfall]:[]);
  if(caution.length)sections.push({heading:"Erros que merecem atenção",kind:"highlight",paragraphs:caution});
  if(deep?.check?.length)sections.push({heading:"Verifique se compreendeu",kind:"standard",paragraphs:deep.check});
 });
 if(isActivities){
  sections.push({heading:"Atividades de fixação",kind:"chapter",pageBreakBefore:true,
   paragraphs:["Resolva as atividades apenas depois de estudar os capítulos. O gabarito comentado aparece em uma seção separada, ao final."]});
  lessons.forEach((lesson,i)=>sections.push({heading:"Atividade "+String(i+1).padStart(2,"0"),kind:"question",paragraphs:[
    lesson.question,...lesson.options.map((opt,j)=>(letters[j]||String(j+1))+") "+opt)
  ]}));
  sections.push({heading:"Gabarito e explicações",kind:"chapter",pageBreakBefore:true,
   paragraphs:["Compare suas respostas com os comentários e volte ao capítulo relacionado para revisar dúvidas."]});
  lessons.forEach((lesson,i)=>{
   const deep=getDeepChapter(subject,topic,lesson.title);
   const details=["Resposta: "+letters[lesson.correct]+") "+(lesson.options[lesson.correct]||""),
    "Explicação: "+(lesson.feedback||lesson.body||lesson.explain||"")];
   if(deep?.worked?.length)details.push("Resolução orientada: "+deep.worked.join(" "));
   if(deep?.warnings?.length)details.push("Cuidado: "+deep.warnings.join(" "));
   sections.push({heading:"Atividade "+String(i+1).padStart(2,"0")+" — "+letters[lesson.correct],kind:"answer",paragraphs:details});
  });
 }
 const professionalSources=isProfessional?Array.from(new Set(lessons.map(l=>(l as ProfessionalLesson).reference).filter(Boolean))).map((u,i)=>({name:"Leitura de referência "+(i+1),url:u})):[];
 const sources=[...(prepared?.sources||[]),...professionalSources];
 if(sources.length)sections.push({heading:"Referências e leituras complementares",kind:"chapter",pageBreakBefore:true,
  paragraphs:[...sources.map(item=>item.name+"\n"+item.url),
   "As explicações deste documento foram redigidas e organizadas editorialmente; as referências são sugestões de aprofundamento, e não uma certificação acadêmica ou revisão institucional do material."]});
 const reviewedCount=richChapterCount(subject,topic,lessons.map(l=>l.title));
 const subtitle=[subject,topic,isActivities?"Teoria e atividades":"Apostila teórica",reviewedCount?"Capítulos aprofundados: "+reviewedCount:""].filter(Boolean).join(" · ");
 return {
  title:"Apostila de estudos — "+topic,subtitle,fileName:"eduverso-apostila-"+topic.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,55)+".pdf",
  coverPage:true,
  sections,
  note:"Material de apoio organizado a partir do acervo editorial do Eduverso"+(prepared?" e complementado com explicações conceituais revisadas para este tema":"")+". Não constitui material oficial de instituição de ensino. Confira o conteúdo antes de distribuir."
 };
}
