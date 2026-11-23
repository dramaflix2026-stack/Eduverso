import type {BookletFormat} from "./booklet-content";
import type {PdfDocumentRequest,PdfSection} from "./lib/lesson-pdf";

/** Texto editorial original. Sem API, sem preenchimento sintético por template. */
type Chapter={
 title:string;
 theory:string[];
 worked:string[];
 warning:string;
 check:string;
 diagram?:{title:string;labels:string[];caption:string};
};
export const mechanicsChapters:Chapter[]=[
 {
  title:"Referencial e movimento",
  theory:[
   "Um corpo está em movimento quando a posição que ele ocupa muda com o tempo em relação a um referencial escolhido. Um referencial é o sistema usado para descrever onde algo está e como sua posição evolui. O mesmo passageiro pode permanecer em repouso em relação ao banco de um ônibus e, simultaneamente, estar em movimento em relação a uma pessoa parada na calçada. Não há contradição: as duas afirmações usam referenciais diferentes.",
   "Para analisar uma situação, escolha primeiro o objeto observado, em seguida identifique o referencial e só depois descreva a variação da posição. Isso evita frases imprecisas como 'o passageiro está parado' sem explicar em relação a quê. A trajetória também depende do referencial: um objeto que cai verticalmente dentro de um veículo em movimento pode ser descrito de modo diferente por quem observa do veículo ou da rua.",
   "A Cinemática estuda como os corpos se movimentam, sem precisar explicar de início quais forças provocaram essa situação. Em problemas escolares, representamos frequentemente o movimento em uma reta por um eixo de posições e instantes. Essa simplificação é útil para treinar grandezas como posição, deslocamento, velocidade e aceleração, mas não elimina a necessidade de definir o referencial."
  ],
  worked:[
   "Situação: Lara está sentada em um trem que se desloca em linha reta. Pedro está sentado ao lado dela e Ana espera na plataforma.",
   "Passo 1: escolha o trem como referencial. A posição de Lara em relação ao banco e a Pedro não se altera; ela está em repouso nesse sistema.",
   "Passo 2: escolha a plataforma como referencial. A posição de Lara em relação a Ana muda com o tempo; portanto, ela está em movimento. As duas descrições podem estar corretas."
  ],
  warning:"Não conclua que um corpo tem movimento ou repouso absoluto. A descrição sempre depende de um referencial declarado.",
  check:"Um estudante caminha pelo corredor de um ônibus. Ele pode estar em movimento em relação ao ônibus e à rua? Explique.",
  diagram:{title:"Escolha do referencial",labels:["Objeto observado","Referencial","Posição ao longo do tempo","Movimento ou repouso"],caption:"O resultado da análise depende de qual referencial foi escolhido."}
 },
 {
  title:"Velocidade média",
  theory:[
   "Em uma trajetória retilínea orientada, a velocidade média é calculada pela razão entre o deslocamento e o intervalo de tempo. A forma algébrica é v média = (posição final - posição inicial)/(tempo final - tempo inicial). Essa grandeza preserva a orientação do movimento: dependendo de como definimos o eixo, um deslocamento pode ser positivo, negativo ou nulo.",
   "É fundamental distinguir velocidade média vetorial de rapidez média. A rapidez média usa a distância total percorrida dividida pelo tempo total. Um ciclista que faz um percurso de ida e volta pode terminar exatamente no ponto de partida: nesse caso, o deslocamento total é zero e a velocidade média é zero, embora tenha pedalado vários metros e sua rapidez média seja diferente de zero.",
   "O intervalo de tempo sempre precisa ser positivo na análise habitual de um movimento observado ao longo do tempo. Antes de substituir valores na fórmula, converta os dados para unidades coerentes. Posições em metros e tempos em segundos geram velocidade em metros por segundo; quilômetros e horas produzem quilômetros por hora. O sinal da resposta informa o sentido em relação ao eixo escolhido."
  ],
  worked:[
   "Exemplo: um ciclista parte de x = 0 m, segue 300 m para leste e retorna 100 m para oeste. O trajeto completo dura 100 s. Considere leste o sentido positivo.",
   "Passo 1: distância total = 300 + 100 = 400 m. Passo 2: posição final = +200 m; deslocamento = 200 - 0 = +200 m.",
   "Passo 3: velocidade média = +200/100 = +2 m/s. A rapidez média, por sua vez, é 400/100 = 4 m/s. As respostas diferem porque medem grandezas distintas."
  ],
  warning:"Usar a distância total no cálculo da velocidade média vetorial é um erro comum. Observe se a pergunta usa deslocamento ou distância.",
  check:"Se uma pessoa volta ao ponto de partida depois de caminhar 1 km, qual é sua velocidade média no percurso inteiro? E a distância percorrida?",
  diagram:{title:"Duas medidas diferentes",labels:["Posição inicial","Percurso total","Posição final","Deslocamento"],caption:"Distância acompanha o caminho; deslocamento compara posições."}
 },
 {
  title:"Aceleração",
  theory:[
   "A aceleração descreve a mudança da velocidade com o tempo. No movimento retilíneo, uma aceleração média pode ser obtida pela variação da velocidade dividida pelo intervalo de tempo. Sua unidade no Sistema Internacional é metro por segundo ao quadrado, escrito m/s². Isso significa que a velocidade, medida em m/s, varia a cada segundo segundo a taxa indicada, quando a aceleração se mantém constante.",
   "Acelerar não significa apenas 'ir mais rápido'. A velocidade é uma grandeza que inclui direção e sentido, e pode mudar de módulo ou orientação. Um veículo que freia pode ter aceleração contrária à velocidade; um veículo que parte do repouso e aumenta sua rapidez pode apresentar aceleração no mesmo sentido. Mesmo um objeto em curva, com rapidez constante, pode ter aceleração pela mudança de direção da velocidade.",
   "Nos exercícios de movimento retilíneo, adote um eixo e indique os sinais de velocidade e aceleração. Em trechos com aceleração constante, a velocidade varia de maneira linear com o tempo e pode ser calculada por v = v inicial + a vezes t. Essa relação não deve ser usada como fórmula geral para movimentos em que a aceleração muda constantemente."
  ],
  worked:[
   "Exemplo: um carro aumenta sua velocidade de 4 m/s para 16 m/s em 6 s, em linha reta e no sentido positivo.",
   "Passo 1: calcule a variação da velocidade: 16 - 4 = 12 m/s. Passo 2: divida pelo tempo: 12/6 = 2 m/s².",
   "Interpretação: em média, a velocidade aumenta 2 m/s a cada segundo. Se a aceleração for constante, após 6 s o cálculo v = 4 + 2 vezes 6 confirma 16 m/s."
  ],
  warning:"O sinal negativo da aceleração não significa automaticamente redução da rapidez: o efeito depende também do sinal da velocidade.",
  check:"Uma bicicleta muda de 12 m/s para 6 m/s em 3 s, com sentido positivo. Qual é a aceleração média?",
  diagram:{title:"Variação da velocidade",labels:["Velocidade inicial","Velocidade final","Intervalo de tempo","Aceleração média"],caption:"Compare variações de velocidade em intervalos definidos."}
 },
 {
  title:"Leis de Newton",
  theory:[
   "As três leis de Newton são princípios fundamentais para analisar forças e mudanças no movimento. A primeira lei, associada à inércia, afirma que um corpo preserva seu estado de repouso ou de movimento retilíneo com velocidade constante quando a força resultante é nula. Isso não exige ausência de todas as forças: elas podem existir e se equilibrar, produzindo resultante zero.",
   "A segunda lei relaciona a força resultante à aceleração: para massa constante, a força resultante é igual à massa multiplicada pela aceleração. Não se deve confundir força aplicada isoladamente com força resultante. Quando há atrito, tração ou outras interações, é preciso somar vetorialmente todas as forças relevantes antes de calcular a aceleração. Em linha reta, o sinal dessa soma depende do eixo escolhido.",
   "A terceira lei descreve forças de interação: se um corpo A exerce força sobre B, B exerce força de mesmo módulo e direção oposta sobre A. Essas forças atuam em corpos diferentes; por isso, não se anulam ao calcular a resultante sobre apenas um dos corpos. O ato de caminhar, por exemplo, envolve a interação entre pé e solo e ajuda a visualizar esse princípio."
  ],
  worked:[
   "Exemplo: um bloco de massa 4 kg sofre força horizontal de 20 N para a direita e atrito de 8 N para a esquerda.",
   "Passo 1: escolha direita como positiva. A força resultante é 20 - 8 = 12 N para a direita.",
   "Passo 2: aplique a segunda lei: a = força resultante/massa = 12/4 = 3 m/s². Não seria correto usar 20/4, pois o atrito também atua sobre o bloco."
  ],
  warning:"Ação e reação não são forças que se anulam sobre o mesmo objeto; cada uma atua em um corpo diferente.",
  check:"Por que um livro apoiado em uma mesa pode permanecer em repouso mesmo estando sujeito a forças?"
 },
 {
  title:"Referencial e posição",
  theory:[
   "A posição indica onde um corpo se encontra em relação à origem de um eixo ou sistema de coordenadas. Em uma estrada representada por uma reta, podemos atribuir x = 0 m ao marco inicial, x = +100 m a um ponto em um sentido e x = -100 m ao mesmo afastamento no sentido oposto. Esses valores não dependem de quanto o corpo percorreu para chegar ao local: posição é uma coordenada, não a distância acumulada.",
   "A escolha da origem e do sentido positivo é uma convenção. Deslocar a origem altera os números usados para indicar posições, mas não modifica necessariamente o deslocamento entre dois pontos. Da mesma forma, inverter o sentido positivo pode mudar sinais das coordenadas e da velocidade, sem mudar o fenômeno físico observado. Essa ideia é importante para interpretar gráficos e fórmulas de Cinemática.",
   "Ao resolver problemas, escreva o referencial e a posição inicial, registre a posição final e verifique se o enunciado descreve um percurso ou um deslocamento. Em situações com mais de um móvel, cada posição pode ser descrita no mesmo eixo para facilitar comparações. Não trate coordenadas negativas como 'distâncias negativas': elas identificam o lado do eixo em relação à origem."
  ],
  worked:[
   "Exemplo: uma escola está no marco x = 300 m e uma biblioteca no marco x = -100 m, usando a praça como origem x = 0 m.",
   "Passo 1: a posição da escola é +300 m; a da biblioteca é -100 m. Passo 2: o deslocamento da escola para a biblioteca é -100 - 300 = -400 m.",
   "Interpretação: o estudante termina 400 m no sentido negativo do eixo em relação à posição inicial. Esse cálculo não revela se ele fez desvios no percurso."
  ],
  warning:"Posição e deslocamento são conceitos diferentes. Uma coordenada de -100 m não significa percurso de -100 m.",
  check:"Se a origem de um eixo mudar de lugar, o deslocamento entre dois pontos necessariamente muda? Justifique."
 },
 {
  title:"Deslocamento e distância",
  theory:[
   "A distância percorrida mede o comprimento total do caminho realizado e não fica negativa. O deslocamento compara a posição final com a inicial, podendo apresentar sentido e sinal conforme o eixo. No movimento retilíneo, o deslocamento é calculado por x final menos x inicial. Se o móvel retorna à posição de origem, o deslocamento é zero, embora a distância percorrida possa ser grande.",
   "Essa distinção aparece em corridas, deslocamentos urbanos e problemas de navegação. Um atleta pode completar uma volta inteira em uma pista e terminar na mesma linha de largada. Nesse caso, a distância corresponde ao comprimento da volta, mas o deslocamento total é zero. A igualdade entre o módulo do deslocamento e a distância só acontece em percursos sem retorno ou desvio relevante na direção considerada.",
   "Em exercícios com várias etapas, calcule a distância somando os comprimentos de cada trecho e o deslocamento somando os movimentos com seus sentidos. Indique a convenção de sinais: por exemplo, leste como positivo e oeste como negativo. Se o problema ocorrer em duas dimensões, o deslocamento é um vetor entre as posições extremas, enquanto a distância continua representando o comprimento total da trajetória."
  ],
  worked:[
   "Exemplo: uma pessoa caminha 3 m para leste e depois 3 m para oeste, em uma rua reta.",
   "Passo 1: distância = 3 + 3 = 6 m. Passo 2: deslocamento = +3 + (-3) = 0 m.",
   "Se ela tivesse caminhado 3 m para leste e mais 3 m para leste, distância e módulo do deslocamento seriam ambos 6 m. A comparação evidencia o papel do sentido."
  ],
  warning:"Não use a distância no lugar do deslocamento em fórmulas que pedem velocidade média vetorial.",
  check:"Uma pessoa percorre 100 m em uma direção e retorna 40 m. Quais são a distância e o deslocamento resultantes?"
 },
 {
  title:"Velocidade escalar média",
  theory:[
   "A velocidade escalar média, frequentemente tratada como rapidez média no Ensino Médio, é a distância total percorrida dividida pelo tempo total. Ela informa quanto caminho foi realizado, em média, por unidade de tempo, sem representar o sentido do movimento. A fórmula é rapidez média = distância percorrida/tempo decorrido. Seu valor não fica negativo em situações usuais de percurso.",
   "Não confunda a rapidez média com a velocidade instantânea mostrada, por exemplo, no velocímetro de um veículo. Durante uma viagem, o carro pode acelerar, parar em semáforos e retomar a marcha. A média do percurso considera o tempo total utilizado, inclusive as paradas, se esse for o intervalo solicitado. Também não é adequado calcular a média aritmética simples de velocidades em trechos com durações diferentes sem verificar os tempos envolvidos.",
   "A unidade depende das grandezas: quilômetros e horas resultam em km/h; metros e segundos resultam em m/s. Antes de resolver, certifique-se de que o enunciado pede distância total ou deslocamento. Em um trajeto de ida e volta, a rapidez média pode ser positiva enquanto a velocidade média vetorial é nula. Essa diferença ajuda a interpretar dados de viagens e atividades esportivas."
  ],
  worked:[
   "Exemplo: um ônibus percorre 120 km em 1 h 30 min e permanece parado por 30 min antes de concluir a viagem. Considere 120 km a distância total e 2 h o tempo total.",
   "Passo 1: transforme 1 h 30 min + 30 min em 2 h. Passo 2: rapidez média = 120/2 = 60 km/h.",
   "Se a pergunta excluísse explicitamente a parada, o tempo seria 1,5 h e o valor mudaria para 80 km/h. Ler o intervalo solicitado é indispensável."
  ],
  warning:"A média simples das velocidades de dois trechos não substitui o cálculo por distância total e tempo total quando os trechos têm durações diferentes.",
  check:"Um veículo viaja 100 km em 2 h e depois 50 km em 1 h. Qual é a rapidez média na viagem inteira?"
 },
 {
  title:"Conversão de velocidade",
  theory:[
   "As unidades mais comuns de velocidade em problemas escolares são metros por segundo (m/s) e quilômetros por hora (km/h). A conversão decorre de duas equivalências: 1 km = 1.000 m e 1 h = 3.600 s. Portanto, 1 km/h corresponde a 1.000/3.600 m/s, aproximadamente 1/3,6 m/s. Para transformar km/h em m/s, divida o número por 3,6; para passar de m/s a km/h, multiplique por 3,6.",
   "Essas relações precisam ser aplicadas à unidade inteira, e não apenas aos números isolados. Converter 72 km/h para m/s resulta em 20 m/s. O valor numérico fica menor porque o metro por segundo representa uma unidade diferente: uma velocidade de 20 metros a cada segundo corresponde a 72 quilômetros em uma hora. Isso não significa que o objeto desacelerou durante a conversão.",
   "Quando uma questão mistura distâncias em quilômetros e tempo em segundos, converta as grandezas antes do cálculo ou use uma relação equivalente com atenção às dimensões. Uma forma de conferir o resultado é pensar em aproximações: 36 km/h equivale a 10 m/s, então 72 km/h deve equivaler a 20 m/s. Faça a verificação de ordem de grandeza antes de registrar a resposta."
  ],
  worked:[
   "Exemplo 1: converta 90 km/h em m/s. Passo 1: identifique o sentido da conversão. Passo 2: divida 90 por 3,6. Resultado: 25 m/s.",
   "Exemplo 2: converta 15 m/s em km/h. Passo 1: multiplique 15 por 3,6. Resultado: 54 km/h.",
   "Conferência: 25 m/s vezes 3,6 retorna 90 km/h. A reversão da conta permite localizar erros antes da entrega."
  ],
  warning:"Não multiplique por 3,6 quando estiver passando de km/h para m/s: essa conversão é feita por divisão.",
  check:"Quanto vale 108 km/h em m/s? E 5 m/s em km/h?",
  diagram:{title:"Conversão entre unidades",labels:["km/h","Dividir por 3,6","m/s","Multiplicar por 3,6"],caption:"No retorno de m/s para km/h, use multiplicação por 3,6."}
 },
 {
  title:"Aceleração média",
  theory:[
   "A aceleração média descreve quanto a velocidade se altera durante um intervalo. Sua definição, para o movimento retilíneo, é a média da variação da velocidade por unidade de tempo: a média = (v final - v inicial)/(t final - t inicial). Ela é diferente da aceleração instantânea, que descreve a taxa de variação em um dado instante e exige uma análise mais localizada do movimento.",
   "O sinal deve ser interpretado com atenção. Se o eixo positivo aponta para leste e um carro move-se para leste perdendo velocidade, sua aceleração média pode ser negativa. Mas um móvel indo para oeste, com velocidade negativa, pode apresentar aceleração também negativa ao aumentar a rapidez naquele sentido. Por isso, dizer que toda aceleração negativa é uma desaceleração constitui erro conceitual.",
   "Um mesmo valor de aceleração média pode resultar de evoluções diferentes da velocidade durante o intervalo. Um carro pode acelerar rapidamente e depois permanecer com velocidade constante, enquanto outro aumenta a velocidade de maneira uniforme. Ambos podem ter a mesma variação total e o mesmo tempo decorrido. A média, portanto, resume o intervalo e não prova que a aceleração foi constante a cada instante."
  ],
  worked:[
   "Exemplo: um carro desloca-se no sentido positivo e reduz sua velocidade de 20 m/s para 8 m/s em 4 s.",
   "Passo 1: variação = 8 - 20 = -12 m/s. Passo 2: aceleração média = -12/4 = -3 m/s².",
   "Interpretação: a velocidade no sentido positivo diminuiu em média 3 m/s por segundo. A conta, sozinha, não permite afirmar que essa diminuição foi uniforme em todos os instantes."
  ],
  warning:"Em movimentos com aceleração variável, a aceleração média não descreve exatamente a aceleração de cada segundo.",
  check:"Uma moto muda de -5 m/s para -15 m/s em 5 s. Qual é a aceleração média? Sua rapidez aumentou ou diminuiu?"
 },
 {
  title:"Movimento uniforme",
  theory:[
   "No movimento retilíneo uniforme (MRU), a velocidade permanece constante ao longo do tempo, e a aceleração é nula nesse modelo idealizado. A posição pode ser calculada pela função horária x = x inicial + velocidade vezes tempo decorrido. Para aplicar a relação corretamente, mantenha um único referencial, estabeleça o sentido positivo do eixo e use unidades compatíveis para posição, velocidade e tempo.",
   "Um gráfico de posição em função do tempo para MRU é uma reta. Sua inclinação indica a velocidade: quando a reta cresce, a velocidade é positiva no eixo escolhido; quando diminui, ela é negativa. Já um gráfico de velocidade em função do tempo aparece como uma linha horizontal. Uma linha horizontal em velocidade zero representa repouso no referencial, caso particular de movimento com velocidade constante.",
   "No mundo real, veículos podem aproximar-se do MRU em trechos de estrada, mas a velocidade frequentemente apresenta pequenas variações. O modelo serve para resolver questões, estabelecer relações e interpretar gráficos. É importante não confundir movimento uniforme com força resultante constante e não nula: no modelo newtoniano, velocidade constante em linha reta está associada a aceleração zero e resultante nula."
  ],
  worked:[
   "Exemplo: um móvel inicia o trecho em x inicial = 10 m e passa a deslocar-se com velocidade constante de +4 m/s durante 5 s.",
   "Passo 1: substitua na função x = 10 + 4 vezes 5. Passo 2: calcule x = 30 m.",
   "O deslocamento foi 30 - 10 = +20 m. Se a velocidade fosse -4 m/s, a posição final seria -10 m após os mesmos 5 s, considerando o mesmo referencial."
  ],
  warning:"Não use a função horária do MRU em intervalos nos quais a velocidade está variando de forma relevante.",
  check:"Um móvel parte de x = 50 m com velocidade constante de -2 m/s. Qual é a posição após 10 s?",
  diagram:{title:"Função horária do MRU",labels:["Posição inicial","Velocidade constante","Tempo decorrido","Posição final"],caption:"Modelo linear: posição final = posição inicial + velocidade x tempo."}
 }
];
const SOURCE=[
 "OpenStax — College Physics, Cinemática e Dinâmica: https://openstax.org/details/books/college-physics-2e",
 "Khan Academy — Física, movimento e Leis de Newton: https://pt.khanacademy.org/science/physics",
 "As explicações e exercícios deste documento são materiais editoriais para estudo; não são enunciados de prova oficial."
];
export function makeMechanicsBooklet(topic:string,limit:number,format:BookletFormat):PdfDocumentRequest|null{
 if(limit<1||limit>mechanicsChapters.length)return null;
 const chapters=mechanicsChapters.slice(0,limit);
 const sections:PdfSection[]=[
  {heading:"Como estudar esta apostila",kind:"standard",paragraphs:[
   "Cada capítulo apresenta conceitos, diferenças importantes, uma resolução orientada e uma pergunta de conferência. Leia a teoria antes de conferir a resolução.",
   "Anote o referencial escolhido, organize as unidades e diferencie deslocamento de distância. O entendimento das grandezas físicas é mais importante do que memorizar fórmulas isoladas."
  ]}
 ];
 chapters.forEach((ch,i)=>{
  sections.push({heading:String(i+1).padStart(2,"0")+"  "+ch.title,kind:"chapter",paragraphs:ch.theory,diagram:ch.diagram});
  sections.push({heading:"Exemplo resolvido e comentado",kind:"example",paragraphs:ch.worked});
  sections.push({heading:"Atenção ao erro comum",kind:"highlight",paragraphs:[ch.warning]});
  sections.push({heading:"Confira seu entendimento",kind:"standard",paragraphs:[ch.check]});
 });
 if(format==="com-atividades"){
  sections.push({heading:"Atividades de revisão",kind:"standard",pageBreakBefore:true,paragraphs:[
   "Tente responder com suas próprias palavras e mostre os cálculos quando necessário."
  ]});
  chapters.forEach((ch,i)=>sections.push({heading:"Questão "+String(i+1).padStart(2,"0"),kind:"question",paragraphs:[ch.check]}));
  sections.push({heading:"Orientações para conferência",kind:"standard",pageBreakBefore:true,paragraphs:[
   "Retome o exemplo resolvido do capítulo correspondente e compare as grandezas utilizadas. As perguntas são discursivas e não possuem gabarito único."
  ]});
 }
 sections.push({heading:"Leituras para aprofundar",kind:"standard",paragraphs:SOURCE});
 return {title:"Mecânica — Apostila aprofundada",subtitle:"Física · "+limit+" capítulos desenvolvidos · "+(format==="teoria"?"Teoria comentada":"Teoria e exercícios")+" · Sem IA",
  fileName:"eduverso-fisica-mecanica-"+limit+"-capitulos"+(format==="teoria"?"":"-exercicios")+".pdf",
  coverPage:true,sections,
  note:"Apostila de apoio introdutório à Física. Textos, exemplos e esquemas elaborados para o Eduverso. Confira adequação à turma e ao currículo antes de distribuir."};
}
