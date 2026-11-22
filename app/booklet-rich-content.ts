/**
 * Textos editoriais complementares que aprofundam a apostila além dos
 * cartões curtos usados pelo banco de exercícios.
 * Apenas conteúdos com revisão específica são incluídos aqui.
 */
export type DeepChapter={
 theory:string[];
 worked:string[];
 warnings:string[];
 check:string[];
};
const pct:Record<string,DeepChapter>={
 "conceito de porcentagem":{
  theory:[
   "Uma porcentagem é uma razão com base 100. A expressão 35% indica 35 partes de um conjunto dividido em 100 partes equivalentes: 35/100. Essa representação facilita comparar quantidades distintas desde que a referência seja identificada. Dizer que 20% de uma turma faltou não informa quantos estudantes faltaram até que se saiba o total de alunos.",
   "Três elementos precisam aparecer em qualquer situação: a base, também chamada valor total ou referência (100%); a taxa percentual, que informa a proporção; e a parte, que é o resultado da aplicação da taxa. A relação fundamental é parte = base x (taxa/100). Quando um desses elementos é desconhecido, podemos reorganizar a igualdade.",
   "Porcentagens podem ultrapassar 100%: uma meta atingida em 125% equivale a uma vez e um quarto da meta original. Taxas negativas aparecem em contextos de variação, mas não significam que uma quantidade física de objetos passou a ser negativa."
  ],
  worked:[
   "Problema: uma biblioteca possui 240 livros de literatura, e 15% deles são de poesia. Quantos livros de poesia existem?",
   "Passo 1 - Identifique a base: 240 livros representam 100%. Passo 2 - Transforme a taxa: 15% = 15/100 = 0,15. Passo 3 - Calcule: 240 x 0,15 = 36. Portanto, 36 livros são de poesia. Verificação: 10% de 240 = 24 e 5% = 12; a soma confirma 36.",
   "Outra leitura possível: 15% significa 15 de cada 100. A multiplicação permite adaptar a proporção a qualquer total sem arredondar a quantidade antes do fim."
  ],
  warnings:["Confundir 15% com o número 15 faz o resultado ficar cem vezes maior. Identifique também a grandeza de referência: 15% de 240 e 15% de 24 são valores diferentes."],
  check:["Explique, sem fórmula, o significado de 40%. Identifique qual número representa 100% em um desconto de 10% aplicado a um produto de R$ 80."]
 },
 "porcentagem e frações":{
  theory:[
   "Uma taxa percentual é uma fração de denominador 100. Assim, 50% corresponde a 50/100 = 1/2; 25% equivale a 1/4; 75% é 3/4. A conversão não altera o valor: troca apenas a maneira de representá-lo.",
   "Para simplificar uma fração, dividimos numerador e denominador pelo mesmo divisor comum diferente de zero. Em 20/100, ambos podem ser divididos por 20, resultando em 1/5. A fração simplificada costuma facilitar cálculos mentais e estimativas.",
   "O raciocínio inverso também é possível: para transformar 3/8 em porcentagem, calcule 3 dividido por 8 = 0,375 e depois multiplique por 100. O resultado é 37,5%. Nem toda fração produz uma porcentagem inteira."
  ],
  worked:[
   "Problema: três quartos de uma turma participaram de uma atividade. Qual porcentagem da turma participou?",
   "Passo 1 - Escreva a fração: 3/4. Passo 2 - Busque denominador 100: 3/4 = 75/100, pois multiplicamos numerador e denominador por 25. Passo 3 - Leia a razão: 75%. Se havia 28 estudantes, então 3/4 x 28 = 21 participantes."
  ],
  warnings:["Nunca multiplique apenas o numerador ou apenas o denominador ao criar frações equivalentes. Isso altera a razão."],
  check:["Registre 12,5% como fração simplificada. Transforme 2/5 em porcentagem e explique os passos."]
 },
 "porcentagem e decimais":{
  theory:[
   "A notação decimal é útil porque permite calcular percentuais por multiplicação. Para passar de porcentagem a decimal, divida por 100: 8% = 0,08; 12% = 0,12; 125% = 1,25. Para voltar ao formato percentual, multiplique por 100.",
   "Quando a taxa é inferior a 1%, a posição da vírgula merece atenção. Por exemplo, 0,5% = 0,005, enquanto 5% = 0,05: a primeira taxa é dez vezes menor. Essa distinção é importante em juros, erros de medida e probabilidades.",
   "A escrita decimal usa vírgula na convenção brasileira, mas muitos aplicativos e linguagens de programação usam ponto como separador decimal. O valor matemático é o mesmo; a notação depende da ferramenta."
  ],
  worked:[
   "Problema: uma empresa destina 2,5% de R$ 1.600 a um fundo. Quanto representa essa parcela?",
   "Passo 1 - Divida 2,5 por 100 e obtenha 0,025. Passo 2 - Multiplique 1.600 por 0,025. O resultado é R$ 40. Verifique usando 1% = R$ 16 e 1,5% = R$ 24; a soma é R$ 40."
  ],
  warnings:["0,25 corresponde a 25%, não a 0,25%. Sempre declare se um número está em forma decimal ou percentual."],
  check:["Explique por que 0,8% é 0,008. Transforme 1,2 em porcentagem e interprete uma taxa acima de 100%."]
 },
 "cálculo de porcentagens":{
  theory:[
   "Para descobrir uma parcela percentual de uma quantidade, multiplique a base pela taxa expressa em decimal: parcela = base x percentual/100. É a mesma ideia de uma fração da quantidade total, agora escrita como taxa.",
   "O resultado deve acompanhar a unidade da base. Se calculamos 18% de R$ 500, a resposta está em reais; se calculamos 18% de 500 estudantes, a resposta está em estudantes. Quando o contexto exige números inteiros, avalie a forma de arredondamento e não omita a unidade.",
   "Há estratégias de cálculo mental: 10% corresponde a um décimo, 1% a um centésimo e 5% à metade de 10%. Para calcular 17%, podemos somar 10% + 5% + 2%, desde que todas as partes sejam calculadas sobre a mesma base."
  ],
  worked:[
   "Problema: uma escola comprou 350 materiais e reservou 12% para reposição. Quantos itens foram reservados?",
   "Passo 1 - A base é 350. Passo 2 - Calcule 350 x 0,12 = 42. Passo 3 - Confirme: 10% de 350 são 35 e 2% são 7; 35 + 7 = 42. Logo, foram reservados 42 itens.",
   "A decomposição é útil para revisar multiplicações, mas não modifica a definição da operação."
  ],
  warnings:["Evite aplicar uma taxa sobre um subtotal quando o enunciado se refere ao total original. Leia qual base está sendo considerada."],
  check:["Calcule 18% de 250 por dois métodos. Compare as respostas e identifique a unidade."]
 },
 "descobrir a taxa percentual":{
  theory:[
   "Quando conhecemos a parte e o total, calculamos a taxa por meio da razão parte/total. Em seguida, multiplicamos por 100 para expressar essa relação como porcentagem. A operação responde à pergunta: que fração do todo corresponde à parte observada?",
   "É indispensável que parte e total tenham unidades compatíveis. Não faz sentido dividir a quantidade de alunos pelo valor em reais de um pagamento para obter uma porcentagem de presença. Também é preciso identificar o grupo de referência: 20 de 50 pessoas correspondem a 40%, mas 20 de 80 correspondem a 25%.",
   "O resultado pode ser superior a 100% quando a parte medida excede a referência; por exemplo, uma produção de 120 unidades em relação a uma meta de 100 representa 120% da meta."
  ],
  worked:[
   "Problema: 18 de 60 estudantes entregaram uma tarefa antes do prazo. Que percentual isso representa?",
   "Passo 1 - Parte = 18; total = 60. Passo 2 - Divida 18 por 60 e obtenha 0,3. Passo 3 - Multiplique 0,3 x 100 = 30%. Verificação: 30% de 60 = 18, exatamente a parte informada."
  ],
  warnings:["Na divisão, mantenha a ordem parte/total. Invertê-la geralmente produz uma porcentagem incompatível com a pergunta."],
  check:["Uma pesquisa recebeu 45 respostas de 150 convites. Determine a taxa de participação e comprove o resultado."]
 },
 "descobrir o valor total":{
  theory:[
   "Quando o enunciado informa uma parcela e a taxa que essa parcela representa, mas não o total, use a equação parte = taxa decimal x total. Isolando o total, obtemos total = parte/taxa decimal, desde que a taxa seja diferente de zero.",
   "Essa operação é diferente de aumentar a parte em determinado percentual. Se R$ 30 equivalem a 15% de um orçamento, o orçamento não é R$ 30 mais 15%: a quantia de R$ 30 já representa uma parte do todo desconhecido.",
   "A resposta costuma ser maior que a parcela quando a taxa está entre 0% e 100%. Essa propriedade é um teste rápido de plausibilidade, embora não substitua a resolução."
  ],
  worked:[
   "Problema: R$ 48 representam 12% do valor de uma compra. Qual é o valor total?",
   "Passo 1 - Escreva 48 = 0,12 x total. Passo 2 - Divida ambos os lados por 0,12: total = 48/0,12 = 400. Passo 3 - Confira: 12% de R$ 400 são R$ 48. Portanto, o valor total é R$ 400."
  ],
  warnings:["Não use uma taxa zero como divisor. Se a parcela e a taxa forem ambas zero, os dados não determinam um total único."],
  check:["R$ 75 representam 25% de um salário. Qual é o valor de referência? Faça a verificação."]
 },
 "descontos simples":{
  theory:[
   "Um desconto percentual reduz o valor original em certa proporção. Primeiro, calcule o valor descontado: desconto = preço original x taxa decimal. Em seguida, subtraia do preço original. Alternativamente, multiplique diretamente pelo fator (1 - taxa decimal).",
   "A base do cálculo é o preço antes do desconto. Essa referência importa porque uma redução de 20% sobre R$ 150 não equivale a retirar R$ 20. O resultado depende do preço inicial.",
   "Descontos sucessivos exigem outra análise: quando há duas reduções, a segunda taxa incide sobre o preço já reduzido, não sobre o valor inicial. O capítulo sobre descontos sucessivos detalha esse caso."
  ],
  worked:[
   "Problema: um livro custa R$ 120 e recebe 15% de desconto.",
   "Etapa 1 - Valor do desconto: 120 x 0,15 = R$ 18. Etapa 2 - Preço final: 120 - 18 = R$ 102. Pelo método do fator: 120 x 0,85 = R$ 102. Os dois caminhos levam à mesma resposta."
  ],
  warnings:["Não confunda o valor do desconto com o preço final. No exemplo, R$ 18 é a redução, enquanto R$ 102 é o preço após a redução."],
  check:["Explique como obter o preço final de R$ 260 com desconto de 5% sem fazer duas operações separadas."]
 },
 "acréscimos simples":{
  theory:[
   "Um acréscimo percentual aumenta o valor de referência. O adicional corresponde à base multiplicada pela taxa; o novo valor é a soma da base com esse adicional. Também é possível usar o fator multiplicativo (1 + taxa decimal).",
   "A relação entre fator e taxa permite fazer o raciocínio inverso: se o valor final é 1,08 vez o inicial, houve aumento de 8%. Essa forma é comum em reajustes de preço e crescimento de quantidades.",
   "Taxas sobre bases distintas não devem ser comparadas apenas pelo percentual. Um aumento de 10% aplicado a R$ 200 corresponde a R$ 20, enquanto o mesmo percentual sobre R$ 500 corresponde a R$ 50."
  ],
  worked:[
   "Problema: uma mensalidade de R$ 250 sofre reajuste de 8%.",
   "Etapa 1 - Taxa decimal: 8/100 = 0,08. Etapa 2 - Adicional: 250 x 0,08 = R$ 20. Etapa 3 - Valor final: R$ 270. Pelo fator: 250 x 1,08 = R$ 270."
  ],
  warnings:["Aplicar o fator 0,08 fornece somente o acréscimo, não o preço total. Para obter o valor reajustado diretamente, o fator correto é 1,08."],
  check:["Calcule um aumento de 6% sobre R$ 400 e diferencie o adicional do total atualizado."]
 },
 "aumentos sucessivos":{
  theory:[
   "Em aumentos sucessivos, cada taxa é aplicada ao valor resultante da etapa anterior. Por isso, a variação total não é a soma direta dos percentuais, exceto em situações particulares. A ferramenta correta é multiplicar os fatores de cada etapa.",
   "Se um preço sobe 10% e depois 10%, os fatores são 1,10 e 1,10. O fator conjunto é 1,21, que representa aumento acumulado de 21%, não 20%. O segundo aumento incide sobre uma base já maior.",
   "Quando as taxas são diferentes, o mesmo princípio vale: aumento de 5% seguido de aumento de 8% resulta em fator 1,05 x 1,08 = 1,134; a variação acumulada é 13,4%."
  ],
  worked:[
   "Problema: um serviço custa R$ 200 e sofre aumentos de 5% e 10%.",
   "Etapa 1 - Após 5%, o preço fica 200 x 1,05 = R$ 210. Etapa 2 - Após 10% sobre R$ 210, chega a 210 x 1,10 = R$ 231. Fator conjunto: 1,05 x 1,10 = 1,155. A variação total foi de 15,5%."
  ],
  warnings:["Somar 5% + 10% e aplicar 15% ao valor original resultaria em R$ 230, resposta incorreta para reajustes sequenciais."],
  check:["Mostre por que três aumentos de 10% não equivalem a aumento total de 30%."]
 },
 "descontos sucessivos":{
  theory:[
   "Quando há dois ou mais descontos, cada percentual reduz o valor já atualizado. O fator de um desconto de 10% é 0,90; o fator de 20% é 0,80. O fator combinado desses descontos é 0,90 x 0,80 = 0,72, ou seja, preço final equivalente a 72% do original.",
   "A redução acumulada, nesse caso, é 1 - 0,72 = 0,28 = 28%. Somar 10% e 20% e anunciar desconto de 30% seria incorreto, porque o segundo desconto incide sobre um preço menor.",
   "Uma situação importante: desconto de 20% seguido de aumento de 20% não restaura o preço inicial. Os fatores 0,80 e 1,20 produzem 0,96, isto é, 96% do valor original."
  ],
  worked:[
   "Problema: uma compra de R$ 500 recebe desconto de 12% e, no caixa, outro desconto de 5%.",
   "Etapa 1 - Primeiro desconto: 500 x 0,88 = R$ 440. Etapa 2 - Segundo desconto: 440 x 0,95 = R$ 418. Fator conjunto: 0,88 x 0,95 = 0,836. A redução acumulada foi de 16,4%, e o valor final é R$ 418."
  ],
  warnings:["Não desconte ambas as taxas diretamente sobre o valor original. Se uma oferta informa duas reduções, confirme a ordem e a base de incidência."],
  check:["Calcule o preço final após descontos consecutivos de 10% e 15% sobre R$ 200. Compare com um desconto único de 25%."]
 }
};
const cell:Record<string,DeepChapter>={
 "membrana plasmática":{
  theory:[
   "A membrana plasmática delimita a célula e controla a interação com o meio. Seu arranjo básico é uma bicamada de fosfolipídios, na qual regiões hidrofílicas se voltam para ambientes aquosos e regiões hidrofóbicas ficam voltadas para o interior da bicamada.",
   "Proteínas de membrana participam do transporte, da recepção de sinais e do reconhecimento celular. A seletividade não significa que a membrana seja totalmente impermeável: moléculas atravessam por diferentes mecanismos, dependendo de tamanho, carga e solubilidade."
  ],
  worked:["Ao comparar oxigênio e glicose, observe que o oxigênio pode atravessar a bicamada por difusão simples, enquanto a passagem de glicose frequentemente depende de transportadores específicos. O mecanismo depende do tipo celular."],
  warnings:["A membrana não é uma parede rígida. O modelo de mosaico fluido descreve sua organização dinâmica, com lipídios e proteínas que podem apresentar mobilidade."],
  check:["Liste duas funções da membrana além de delimitar a célula e relacione cada função a uma proteína possível."]
 },
 "citoplasma e organelas":{
  theory:[
   "O citoplasma compreende o citosol e as estruturas nele presentes. Em células eucarióticas, muitas funções ocorrem em compartimentos especializados, o que favorece a organização de reações químicas.",
   "Mitocôndrias participam de etapas da produção de ATP; ribossomos sintetizam proteínas; o retículo endoplasmático rugoso participa da produção e do processamento inicial de muitas proteínas; o complexo golgiense modifica, classifica e encaminha materiais."
  ],
  worked:["Uma célula que secreta grande quantidade de proteínas tende a possuir sistemas de síntese e transporte celular intensamente ativos. A sequência de participação de ribossomos, retículo endoplasmático e complexo golgiense ajuda a entender o processo."],
  warnings:["Nenhuma organela deve ser estudada isoladamente: uma atividade celular depende da integração de diversas estruturas."],
  check:["Descreva como a célula pode sintetizar e encaminhar uma proteína para secreção."]
 },
 "núcleo e dna":{
  theory:[
   "Em células eucarióticas, o núcleo contém grande parte do DNA. O envelope nuclear é formado por duas membranas e possui poros que regulam o trânsito de diferentes moléculas entre núcleo e citoplasma.",
   "O DNA armazena informação genética. A expressão gênica envolve processos como transcrição e tradução, pelos quais a informação é utilizada para produzir moléculas funcionais, incluindo proteínas."
  ],
  worked:["Durante a transcrição, uma sequência de DNA pode servir de molde para a síntese de RNA. Esse RNA pode participar da produção de proteínas no citoplasma."],
  warnings:["Nem todo DNA das células eucarióticas fica no núcleo: mitocôndrias e, em células fotossintetizantes, cloroplastos também podem conter material genético."],
  check:["Explique a diferença entre armazenar informação genética e utilizar essa informação para produzir proteínas."]
 }
};
function norm(s:string){return s.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();}
export function getDeepChapter(subject:string,topic:string,heading:string):DeepChapter|undefined{
 const key=norm(heading);
 if(norm(subject)==="matematica"&&norm(topic).includes("porcentagem"))return Object.entries(pct).find(([label])=>norm(label)===key)?.[1];
 if(norm(subject)==="biologia"&&norm(topic).includes("celul"))return Object.entries(cell).find(([label])=>norm(label)===key)?.[1];
 return undefined;
}
export function richChapterCount(subject:string,topic:string,headings:string[]):number{
 return headings.filter(x=>Boolean(getDeepChapter(subject,topic,x))).length;
}
