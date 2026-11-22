export type LessonSource={
 title:string;question:string;options:readonly string[];correct:number;
 example:string;body?:string;explain?:string;feedback?:string;module?:string;
};
export type ExerciseItem={
 question:string;options:string[];correct:number;explanation:string;
 sourceTitle:string;kind:"original"|"aplicacao"|"conceito"|"calculado";
 sourceIndex:number;
 level?:"fundamentos"|"aprofundado";
};
/** Integridade estrutural: ainda exige conferência editorial do conhecimento. */
export function isValidExercise(q:Pick<ExerciseItem,"question"|"options"|"correct"|"explanation">):boolean{
 const norm=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
 if(q.question.trim().length<16||q.options.length<3||q.correct<0||q.correct>=q.options.length)return false;
 if(!q.options[q.correct]||q.explanation.trim().length<24)return false;
 if(q.options.some(o=>!o||!o.trim()))return false;
 return new Set(q.options.map(norm)).size===q.options.length;
}
function order(indices:number[],seed:number){
 if(!indices.length)return [];
 const offset=Math.abs(seed)%indices.length;
 return [...indices.slice(offset),...indices.slice(0,offset)];
}
function numberQuestion(question:string,answer:number,wrong1:number,wrong2:number,explanation:string,sourceIndex=0):ExerciseItem{
 const answers=[answer,wrong1,wrong2];
 // Nunca exibir alternativas numericamente iguais.
 let offset=1;
 while(new Set(answers).size!==3&&offset<20){answers[1]=answer+offset;answers[2]=answer-offset;offset++;}
 const position=Math.abs(answer+wrong1+wrong2)%3;
 const choices=[...answers.slice(position),...answers.slice(0,position)].map(String);
 return {question,options:choices,correct:(3-position)%3,explanation,sourceTitle:"Exercício calculado",kind:"calculado",sourceIndex};
}
function calculatedMath(topic:string,n:number,seed:number):ExerciseItem|null{
 const a=2+(n*7+seed)%43,b=1+(n*5+seed)%19,c=1+(n*7+seed)%17,d=3+(n*11+seed)%31;
 const variant=n%6;
 if(topic==="Matrizes e determinantes"){
  if(variant===0){const ans=a*d-b*c;return numberQuestion(`Calcule o determinante de A = [[${a},${b}],[${c},${d}]].`,ans,ans+b,ans+c,`Para uma matriz 2×2, det(A) = ad − bc = ${a}×${d} − ${b}×${c} = ${ans}.`);}
  if(variant===1)return numberQuestion(`Na matriz A = [[${a},${b}],[${c},${d}]], qual é o elemento a₂₁?`,c,b,d,`O primeiro índice indica a linha, e o segundo, a coluna. a₂₁ = ${c}.`);
  if(variant===2){const ans=a+d;return numberQuestion(`Qual é o traço (soma da diagonal principal) de [[${a},${b}],[${c},${d}]]?`,ans,a+b,c+d,`Os termos da diagonal principal são ${a} e ${d}. O traço vale ${a} + ${d} = ${ans}.`);}
  if(variant===3){const ans=a+b;return numberQuestion(`Se A = [[${a},${b}],[${c},${d}]] e B = [[${b},${a}],[${d},${c}]], quanto vale (A+B)₁₁?`,ans,a*b,b*c,`Some os elementos da linha 1, coluna 1: ${a} + ${b} = ${ans}.`);}
  if(variant===4){const ans=2*b;return numberQuestion(`Para A = [[${a},${b}],[${c},${d}]], determine o elemento (2A)₁₂.`,ans,2*c,2*d,`A multiplicação escalar dobra cada entrada. (2A)₁₂ = 2×${b} = ${ans}.`);}
  return numberQuestion(`A = [[${a},${b}],[${c},${d}]]. Na matriz transposta Aᵀ, quanto vale o elemento a₁₂?`,c,b,a,`Transpor troca linhas e colunas. Aᵀ₁₂ = A₂₁ = ${c}.`);
 }
 if(topic==="Porcentagem"){const pct=5*(1+n%16),value=20*(2+(n*7+seed)%211),answer=pct*value/100;return numberQuestion(`Calcule ${pct}% de ${value}.`,answer,answer+value/20,answer+pct,`Multiplique ${value} por ${pct}/100: resultado = ${answer}.`);}
 if(topic==="Álgebra"||topic==="Equações e inequações"||topic==="Sistemas lineares"){const x=1+n%11,coef=2+n%7,intercept=1+(n*3+seed)%12;return numberQuestion(`Resolva a equação ${coef}x + ${intercept} = ${coef*x+intercept}.`,x,x+1,x+2,`Isolando a variável: ${coef}x = ${coef*x}; logo x = ${x}.`);}
 if(topic==="Funções"||topic==="Função afim"){const x=1+n%12,coef=2+n%7;const ans=coef*x+b;return numberQuestion(`Para f(x) = ${coef}x + ${b}, calcule f(${x}).`,ans,coef+b,ans+x,`Substitua x por ${x}: f(${x}) = ${coef}×${x} + ${b} = ${ans}.`);}
 if(topic==="Geometria"||topic==="Geometria espacial"){const ans=a*d;return numberQuestion(`Um retângulo tem base ${a} cm e altura ${d} cm. Qual é a sua área, em cm²?`,ans,2*(a+d),a+d,`Área do retângulo = base × altura = ${a}×${d} = ${ans} cm².`);}
 if(topic==="Estatística"){const x=a*3,y=b*3,z=c*3;const ans=(x+y+z)/3;return numberQuestion(`Qual é a média aritmética de ${x}, ${y} e ${z}?`,ans,ans+3,ans-3,`Some os valores e divida por 3: (${x} + ${y} + ${z})/3 = ${ans}.`);}
 return null;
}
export function buildExercises(lessons:LessonSource[],requested:number,seed:number,focusIndices?:number[],subject?:string,topic?:string):ExerciseItem[]{
 if(!lessons.length)return [];
 const all=lessons.map((_,i)=>i),selected=focusIndices?.length?focusIndices.filter(i=>i>=0&&i<lessons.length):all;
 const first=order(selected,seed);
 const remaining=order(all.filter(i=>!selected.includes(i)),seed+1);
 const result:ExerciseItem[]=[];const seen=new Set<string>();
 function add(item:ExerciseItem){
  const key=item.question.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
  if(!isValidExercise(item)||seen.has(key))return;
  result.push(item);seen.add(key);
 }
 function originals(indices:number[]){
  for(const i of indices){const l=lessons[i];if(l.correct<0||l.correct>=l.options.length)continue;
   add({question:l.question,options:[...l.options],correct:l.correct,explanation:l.feedback||l.example+" "+(l.body||l.explain||""),sourceTitle:l.title,kind:"original",sourceIndex:i});
  }
 }
 originals(first);
 if(result.length<requested&&subject==="Matemática"){
  for(let i=0;i<requested*6&&result.length<requested;i++){
   const q=calculatedMath(topic||"",i+Math.abs(seed)*59,Math.abs(seed)%97);
   if(q)add(q);
  }
 }
 // Não gerar perguntas de memorização artificial sobre o próprio texto da aula.
 if(result.length<requested)originals(remaining);
 return result.slice(0,requested);
}
