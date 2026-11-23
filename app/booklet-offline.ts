import type {LessonSource} from "./exercise-bank";
import type {BookletFormat} from "./booklet-content";
import {makeBooklet} from "./booklet-content";
import {makeProfessionalBooklet} from "./professional-course-pdf";
import type {ProfessionalTrack} from "./learning-professions";
import type {PdfDocumentRequest,PdfSection} from "./lib/lesson-pdf";

/**
 * Motor editorial DETERMINÍSTICO: nenhuma chamada a modelos ou serviços pagos.
 * Não completar capítulos faltantes com prosa genérica ou repetições.
 * A existência de uma disciplina no catálogo não implica revisão editorial dela.
 */
export type OfflineBookletResult={
 document:PdfDocumentRequest|null;
 reviewed:number;
 requested:number;
 missing:string[];
 reason:string;
};
type ReviewedChapter={title:string;paragraphs:string[];diagram?:{title:string;labels:string[];caption:string}};
const count=(s:string)=>s.trim().split(/\s+/u).filter(Boolean).length;
const normalize=(s:string)=>s.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const geographyBiomes:ReviewedChapter[]=[
 {title:"Bioma, ecossistema e Amazônia",paragraphs:[
  "Um bioma corresponde a uma grande unidade ecológica reconhecida por condições climáticas, tipos de vegetação e história ambiental comuns. Ele não deve ser confundido com ecossistema, que descreve as interações entre organismos e fatores físicos em determinada área. Por exemplo, um trecho de floresta de terra firme, um igapó e um rio são ecossistemas diferentes que podem fazer parte do mesmo bioma amazônico. A vegetação é um componente visível do bioma, mas não o define sozinha: temperatura, regime de chuvas, solo, relevo e processos históricos também importam.",
  "Na Amazônia, temperaturas geralmente elevadas e chuvas abundantes sustentam amplas formações florestais, embora haja variações regionais e locais. A floresta apresenta vários estratos, com árvores de diferentes alturas, lianas e plantas que aproveitam nichos de luz e umidade. Não é correto imaginar um chão invariavelmente muito fértil: em extensas áreas, nutrientes circulam rapidamente entre a matéria orgânica e os seres vivos, enquanto parte dos solos é pobre em nutrientes disponíveis. O desmatamento interrompe essas relações e pode alterar a umidade e o funcionamento da paisagem.",
  "Para interpretar um mapa de vegetação, observe primeiro a legenda e a escala; em seguida, relacione as formações apresentadas às características climáticas e hidrográficas. Uma área periodicamente inundada pode ter vegetação diferente de uma área próxima que não alaga, mesmo dentro da Amazônia. Esse raciocínio evita generalizações e permite explicar por que um bioma pode reunir paisagens variadas. Como exercício de compreensão, compare uma floresta de terra firme com uma área inundável, indicando o papel da água, do solo e das adaptações das espécies."
 ],diagram:{title:"Fatores que ajudam a explicar a vegetação",labels:["Clima","Água e solo","Vegetação","Ecossistemas"],caption:"Relação conceitual; as interações ocorrem em várias direções."}},
 {title:"Cerrado: formações e sazonalidade",paragraphs:[
  "O Cerrado não é apenas uma paisagem de árvores pequenas e retorcidas: é um mosaico de formações campestres, savânicas e florestais, incluindo veredas e matas de galeria. Em muitas áreas, o clima apresenta uma estação mais chuvosa e outra mais seca, condição que influencia disponibilidade de água, crescimento vegetal e períodos de floração. A aparência das plantas também depende do tipo de solo, da profundidade das raízes e da frequência de perturbações. Portanto, não existe uma única vegetação que represente integralmente o bioma.",
  "Algumas espécies do Cerrado possuem cascas espessas, órgãos subterrâneos e capacidade de rebrotar após certos episódios de fogo. Essas características são adaptações ecológicas, mas não significam que toda queimada seja benéfica. Incêndios muito frequentes, intensos ou fora da dinâmica local podem prejudicar espécies, fauna, solo e recuperação da vegetação. Além disso, as raízes profundas de muitas plantas permitem acesso a água abaixo da superfície durante parte do período seco, o que ajuda a explicar a permanência de vegetação lenhosa em áreas sazonais.",
  "Um exemplo aplicado é comparar um campo aberto com uma mata de galeria próxima a um curso d'água: a maior disponibilidade de umidade ao longo do rio favorece estruturas vegetais diferentes daquelas encontradas em áreas mais expostas. Na leitura de uma paisagem, identifique a presença de cursos d'água, a densidade de árvores, a cobertura herbácea e os sinais de alteração humana. A expansão agropecuária e a fragmentação são temas relevantes para estudar conservação. O objetivo é compreender a relação entre processos naturais, ocupação territorial e biodiversidade, sem reduzir o Cerrado a uma única imagem."
 ],diagram:{title:"Mosaico de formações",labels:["Campos","Savanas","Matas de galeria"],caption:"Esquema de formações coexistentes, sem escala geográfica."}},
 {title:"Caatinga: adaptações ao semiárido",paragraphs:[
  "A Caatinga se associa principalmente a ambientes semiáridos do Nordeste brasileiro. Chuvas irregulares, períodos secos prolongados e elevada demanda atmosférica de água ajudam a explicar adaptações das plantas. Muitas espécies perdem folhas na estação seca, diminuindo a superfície de transpiração; outras apresentam tecidos que armazenam água ou raízes adaptadas à disponibilidade hídrica. Isso não torna o bioma biologicamente pobre ou desprovido de diversidade: suas espécies e interações ecológicas são próprias e merecem estudo detalhado.",
  "Observe que a perda sazonal das folhas, chamada caducifolia, é uma estratégia de economia de água, não necessariamente um sinal de morte da planta. Em um período chuvoso, a mesma paisagem pode ganhar grande cobertura verde e mostrar florescimento e crescimento. Cactáceas como o mandacaru são exemplos conhecidos, porém não representam sozinhas a diversidade de árvores, arbustos e plantas herbáceas existentes. A intensidade da seca varia entre localidades e anos, influenciando agricultura, disponibilidade de água e práticas de manejo.",
  "Como estudo aplicado, compare fotografias da mesma região em épocas diferentes e descreva o que mudou na cobertura vegetal; depois relacione essas mudanças à precipitação e à capacidade de armazenamento de água. A degradação do solo, o desmatamento e práticas de uso inadequadas podem intensificar a vulnerabilidade ambiental, mas processos como desertificação precisam ser analisados com critérios específicos. Uma boa explicação da Caatinga deve distinguir condições climáticas naturais de problemas associados à ação humana e reconhecer as estratégias de convivência com o semiárido."
 ],diagram:{title:"Resposta sazonal da vegetação",labels:["Período seco","Economia de água","Retomada das chuvas","Crescimento"],caption:"Sequência didática simplificada, não um calendário fixo."}},
 {title:"Mata Atlântica: diversidade e fragmentação",paragraphs:[
  "A Mata Atlântica reúne diferentes florestas e ecossistemas associados, distribuídos por áreas com condições ambientais variadas. Não se restringe a uma floresta homogênea à beira-mar: inclui, entre outras formações, florestas mais úmidas e formações sazonais, além de ecossistemas relacionados em determinadas regiões. Relevo, altitude, chuvas e temperatura ajudam a explicar diferenças entre paisagens. Uma mata de encosta sob chuvas frequentes pode ter estrutura distinta de uma formação em clima com períodos secos mais marcados.",
  "A longa ocupação humana de grande parte da área originalmente coberta pelo bioma resultou em forte transformação da paisagem. Quando uma floresta é fragmentada, grandes porções contínuas se tornam trechos menores separados por estradas, cultivos ou cidades. Essa mudança pode dificultar deslocamentos de espécies e alterar condições de luminosidade, vento e umidade nas bordas. A conectividade entre fragmentos e a recuperação de áreas degradadas são questões importantes para conservar espécies e processos ecológicos.",
  "Um exemplo é observar dois fragmentos de tamanhos semelhantes: um conectado a outras áreas vegetadas por corredores naturais e outro isolado por intensa urbanização. Mesmo sem saber quantas espécies vivem em cada um, é possível formular hipóteses sobre dispersão de sementes, circulação de animais e pressão humana. Para responder a questões de Geografia, combine análise de mapas, história da ocupação, relevo, condições de clima e consequências ambientais. Não conclua que todas as áreas do bioma possuem os mesmos riscos ou a mesma composição de espécies."
 ],diagram:{title:"Efeito da fragmentação",labels:["Área contínua","Fragmentação","Isolamento","Reconexão"],caption:"Esquema conceitual da conectividade; não representa área real."}},
 {title:"Pantanal e Pampa: paisagens e comparação",paragraphs:[
  "O Pantanal é marcado por paisagens relacionadas à dinâmica de cheias e secas e por grande variedade de ambientes aquáticos e terrestres. A inundação sazonal reorganiza a disponibilidade de habitats e influencia alimentação, reprodução e deslocamento de diversas espécies. Não se trata de uma região permanentemente coberta por água: dentro do mesmo ciclo, áreas podem ficar alagadas e posteriormente expostas. A compreensão do bioma exige relacionar relevo, rios, precipitação em diferentes partes da bacia e uso humano do território.",
  "O Pampa, associado ao extremo sul brasileiro, destaca-se por formações campestres com predomínio de herbáceas e gramíneas, embora apresente diversidade de ambientes e elementos arbustivos e arbóreos em locais específicos. Paisagens abertas não são sinônimo de ausência de biodiversidade nem áreas necessariamente degradadas. A substituição de campos nativos, práticas inadequadas de manejo e alterações no uso da terra podem impactar esses ecossistemas. A vegetação campestre tem dinâmica distinta da floresta e precisa de estratégias de conservação adequadas a essa característica.",
  "Compare os dois biomas usando a pergunta 'qual fator ajuda a organizar a paisagem?'. No Pantanal, os pulsos de inundação são fundamentais para compreender a distribuição temporal e espacial de ambientes; no Pampa, as formações campestres e as condições climáticas e edáficas são centrais. Ambos mostram que a biodiversidade brasileira vai muito além de florestas densas. Em uma atividade, descreva como uma mudança no regime hídrico afetaria uma área pantaneira e como a conversão de um campo nativo afetaria a paisagem do Pampa, distinguindo hipótese de fato observado."
 ],diagram:{title:"Duas dinâmicas de paisagem",labels:["Pantanal","Cheias e secas","Pampa","Campos nativos"],caption:"Comparação didática; os biomas têm também outros fatores ecológicos."}}
];


const geographyClimates:ReviewedChapter[]=[
 {title:"Tempo atmosférico, clima e variáveis",paragraphs:[
  "Tempo atmosférico é a condição observada da atmosfera em determinado momento, como uma tarde chuvosa, uma manhã seca ou uma passagem de frente fria. Clima corresponde ao comportamento estatístico dessas condições ao longo de períodos extensos. Não se pode concluir que o clima de uma cidade mudou porque fez frio em um único dia. Para investigar tendências, analisam-se séries históricas de temperatura, precipitação, umidade e outras variáveis, considerando a qualidade e a duração dos registros.",
  "As normais climatológicas do INMET apresentam estatísticas calculadas a partir de períodos históricos, como 1991 a 2020, e permitem comparar características médias de diferentes localidades. A temperatura pode ser descrita por médias e extremos; a precipitação pode ser apresentada por acumulados mensais e anuais. A distribuição das chuvas importa tanto quanto o total anual: dois municípios podem registrar volumes anuais parecidos e, ainda assim, ter estações secas muito diferentes.",
  "Para aplicar esses conceitos, imagine dois gráficos mensais: em um, as chuvas estão concentradas em poucos meses; no outro, estão distribuídas ao longo do ano. Mesmo que os totais sejam equivalentes, agricultura, disponibilidade de água e vegetação podem responder de forma distinta. Na interpretação, identifique unidades, eixos, período e estação de coleta antes de concluir. Descrever um padrão médio não significa prever com exatidão a condição meteorológica de um dia específico."
 ],diagram:{title:"O que comparar em um estudo climático",labels:["Temperatura","Precipitação","Sazonalidade","Séries históricas"],caption:"Esquema conceitual, sem valores meteorológicos medidos."}},
 {title:"Latitude, altitude, relevo e oceanos",paragraphs:[
  "A latitude influencia a distribuição da energia solar recebida pela superfície terrestre, afetando diferenças térmicas entre regiões. A altitude costuma estar associada a temperaturas menores em muitas situações, mas a relação observada depende das condições atmosféricas e da circulação de ar. O relevo pode influenciar o movimento de massas de ar e criar condições de chuva em determinadas encostas, enquanto áreas abrigadas podem apresentar comportamento distinto. A distância do oceano interfere na amplitude térmica e na disponibilidade de umidade.",
  "Próximo ao litoral, a presença do mar pode moderar variações de temperatura e contribuir para a umidade do ar. No interior, dependendo das condições locais, diferenças entre temperaturas diurnas e noturnas podem ser maiores. Correntes oceânicas, cobertura vegetal, urbanização e circulação atmosférica também participam desse sistema. Nenhum fator, isoladamente, define por completo o clima: é a combinação de condições e processos que explica o padrão de determinada localidade.",
  "Compare duas cidades na mesma latitude, uma em altitude elevada e outra próxima ao nível do mar. Antes de atribuir toda diferença térmica à latitude, observe altitude, relevo e localização. Depois compare uma cidade litorânea e outra interiorana, considerando umidade e amplitude térmica, sem assumir que todo litoral é sempre mais chuvoso. Em questões, relacione cada fenômeno à escala espacial do problema e evite tratar explicações locais como regras universais."
 ],diagram:{title:"Fatores geográficos do clima",labels:["Latitude","Altitude","Relevo","Influência marítima"],caption:"Fatores interagem; as setas não indicam uma ordem causal fixa."}},
 {title:"Circulação do ar, massas de ar e chuvas",paragraphs:[
  "Diferenças de aquecimento e pressão atmosférica contribuem para os movimentos do ar em diferentes escalas. Massas de ar possuem características de temperatura e umidade relacionadas às regiões de formação e podem modificar o tempo quando se deslocam. Uma frente ocorre na zona de contato entre massas de ar com propriedades diferentes. A passagem de sistemas frontais pode estar associada a mudanças de temperatura, vento, nebulosidade e precipitação, mas os efeitos dependem das condições de cada situação.",
  "As chuvas podem estar associadas à convecção, à elevação de ar úmido sobre o relevo ou ao encontro de sistemas atmosféricos, entre outros mecanismos. Na chuva convectiva, o aquecimento favorece a subida de ar, que pode se resfriar, condensar e formar nuvens. Em situações orográficas, o ar úmido ascende ao encontrar uma barreira topográfica; ao resfriar, pode ocorrer condensação. Esses mecanismos não são mutuamente exclusivos e podem atuar conjuntamente.",
  "Para interpretar uma notícia meteorológica, diferencie a previsão de um episódio de chuva da caracterização climática de uma região. Uma frente fria indica um processo atmosférico de curta duração, enquanto a frequência histórica de frentes e os efeitos médios da precipitação ajudam a compor o estudo do clima. Em exercícios, explique o mecanismo físico de formação da chuva antes de associá-lo a uma paisagem específica. Evite afirmar que toda chuva intensa decorre do mesmo mecanismo."
 ],diagram:{title:"Formação simplificada de chuva",labels:["Ar úmido","Ascensão","Resfriamento","Condensação"],caption:"Esquema didático; diferentes sistemas atmosféricos podem produzir chuva."}},
 {title:"Climas brasileiros e diversidade regional",paragraphs:[
  "O Brasil apresenta grande diversidade climática em razão de sua extensão territorial, diferenças de latitude, altitude, relevo, circulação atmosférica e influência oceânica. Classificações escolares frequentemente distinguem condições equatoriais, tropicais, semiáridas e subtropicais, além de variações de altitude e de influência marítima. As categorias são instrumentos para reconhecer padrões; seus limites e nomes podem variar conforme o método de classificação. Por isso, ao ler um mapa climático, confira a legenda e a instituição responsável.",
  "Em áreas equatoriais, temperaturas geralmente elevadas e elevada disponibilidade de umidade favorecem regimes úmidos, embora existam diferenças locais. Em muitas áreas tropicais do interior, observa-se sazonalidade de chuvas, com períodos mais secos e mais chuvosos. No semiárido, a irregularidade da precipitação e a frequência de secas têm grande relevância social e ambiental. No Sul, a atuação de sistemas atmosféricos e a latitude contribuem para características térmicas distintas de áreas mais próximas ao Equador.",
  "Um erro frequente é tentar definir o clima exclusivamente pela vegetação ou por um evento extremo registrado em um ano. A comparação de localidades precisa considerar dados de longa duração e distribuição sazonal. Para estudar, selecione duas cidades, consulte as normais do INMET e descreva semelhanças e diferenças no regime de chuvas e nas temperaturas médias. Ao concluir, relacione os padrões observados a fatores geográficos sem afirmar que uma variável explica tudo."
 ],diagram:{title:"Análise de regiões climáticas",labels:["Mapa e legenda","Temperaturas","Chuvas mensais","Fatores locais"],caption:"Roteiro para interpretação, não classificação cartográfica oficial."}},
 {title:"Climogramas, paisagem e variabilidade",paragraphs:[
  "Um climograma reúne informações mensais sobre temperatura e precipitação de uma localidade, geralmente por meio de uma linha e barras. Sua interpretação exige verificar os eixos, as unidades e o período usado na elaboração. Observe a amplitude térmica, os meses com maiores e menores precipitações e se existe uma estação seca bem marcada. Não deduza a posição geográfica apenas pela aparência geral do gráfico; combine o climograma com o nome da estação, a altitude e outros dados relevantes.",
  "A relação entre clima e vegetação envolve disponibilidade de água, temperaturas, solos e história ambiental. Uma sequência prolongada de meses com pouca chuva pode limitar o crescimento de determinadas plantas, mas não determina sozinha o tipo de cobertura vegetal. A atividade humana altera paisagens e pode modificar condições locais, como temperaturas urbanas e infiltração da água. O estudo de extremos também precisa distinguir episódios meteorológicos, variabilidade natural e tendências observadas em períodos mais longos.",
  "Para praticar, monte uma tabela com os doze meses e registre temperatura média e chuva mensal de uma estação do INMET, com fonte e período identificados. Depois marque os meses mais secos, compare as temperaturas e formule uma hipótese sobre como essa sazonalidade pode influenciar atividades humanas e vegetação. Por fim, explique o que o gráfico não permite concluir, como a previsão de chuvas em uma data futura. Esse procedimento desenvolve leitura crítica de dados, em vez de memorização de nomes."
 ],diagram:{title:"Etapas da leitura de um climograma",labels:["Eixos","Meses","Padrão sazonal","Interpretação"],caption:"Não representa uma série real de observações meteorológicas."}}
];

function validatedChapters(document:PdfDocumentRequest,titles:string[]):{missing:string[];reviewed:number}{
 const sections=document.sections;
 const starts=sections.map((section,index)=>({section,index})).filter(({section})=>section.kind==="chapter"&&
  (/^\d{2}\s{2}/.test(section.heading)||/^Capítulo \d+\s*[-–]/.test(section.heading)));
 // Section titles in question/gabarito blocks must never count as content chapters.
 const theoryEnd=sections.findIndex(section=>/^(Atividades de fixação|Caderno de exercícios|Gabarito)/i.test(section.heading));
 const validStarts=starts.filter(x=>theoryEnd<0||x.index<theoryEnd);
 const missing:string[]=[];let reviewed=0;
 titles.forEach((title,index)=>{
  const start=validStarts[index]?.index;
  const next=validStarts[index+1]?.index??(theoryEnd>=0?theoryEnd:sections.length);
  if(start===undefined){missing.push(title);return;}
  const paragraphs=sections.slice(start,next).filter(s=>s.kind!=="summary").flatMap(s=>s.paragraphs);
  const words=count(paragraphs.join(" "));
  const hasExample=sections.slice(start,next).some(s=>s.kind==="example"||/exemplo|resolução|aplicação|prátic/i.test(s.heading));
  if(words<150||!hasExample){missing.push(title);return;}
  reviewed++;
 });
 return {missing,reviewed};
}
export function createOfflineBooklet(args:{
 subject:string;topic:string;limit:number;lessons:LessonSource[];format:BookletFormat;professional?:ProfessionalTrack
}):OfflineBookletResult{
 const limit=Math.max(1,Math.min(20,Math.floor(args.limit)));
 const subject=normalize(args.subject),topic=normalize(args.topic);
 if((subject.includes("geografia")||subject==="geo")&&/bioma|vegetac/.test(topic)){
  const selected=geographyBiomes.slice(0,limit);
  const sections:PdfSection[]=selected.map((chapter,i)=>({
   heading:String(i+1).padStart(2,"0")+"  "+chapter.title,kind:"chapter",
   pageBreakBefore:i>0,paragraphs:chapter.paragraphs,diagram:chapter.diagram
  }));
  sections.push({heading:"Fontes para aprofundamento",kind:"standard",paragraphs:[
   "IBGE — Biomas do Brasil: https://www.ibge.gov.br/geociencias/cartas-e-mapas/informacoes-ambientais/15842-biomas.html",
   "IBGE Educa — Biomas brasileiros: https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/18307-biomas-brasileiros.html",
   "Esquemas visuais autorais elaborados para estudo; não são mapas, fotografias ou medições em escala."
  ]});
  return {document:{
   title:"Apostila editorial — "+args.topic,subtitle:"Geografia · "+selected.length+" capítulos desenvolvidos · Sem IA",
   fileName:"eduverso-biomas-editorial-sem-ia.pdf",coverPage:true,sections,
   note:"Material editorial para estudo. Os diagramas são esquemáticos e não substituem imagens científicas. Revisar antes de uso em sala."
  },reviewed:selected.length,requested:selected.length,missing:[],reason:"Acervo editorial específico disponível."};
 }
 if(subject.includes("geografia")&&/clima|climat/.test(topic)){
  const selected=geographyClimates.slice(0,limit);
  const sections:PdfSection[]=selected.map((chapter,i)=>({
   heading:String(i+1).padStart(2,"0")+"  "+chapter.title,kind:"chapter",
   pageBreakBefore:i>0,paragraphs:chapter.paragraphs,diagram:chapter.diagram
  }));
  sections.push({heading:"Fontes para estudo e verificação",kind:"standard",paragraphs:[
   "INMET — Normais Climatológicas: https://portal.inmet.gov.br/servicos/normais-climatológicas",
   "IBGE Educa — Tipos de clima no Brasil: https://educa.ibge.gov.br/professores/educa-atividades/17613-os-tipos-de-clima-no-brasil.html",
   "Diagramas autorais ilustrativos, sem medições ou escalas."
  ]});
  return {document:{
   title:"Apostila editorial — "+args.topic,subtitle:"Geografia · "+selected.length+" capítulos desenvolvidos · Sem IA",
   fileName:"eduverso-climas-editorial-sem-ia.pdf",coverPage:true,sections,
   note:"Material editorial para estudo e revisão. Confira os dados e as referências oficiais antes de uso em sala."
  },reviewed:selected.length,requested:selected.length,missing:[],reason:"Acervo editorial específico disponível."};
 }
 const lessons=args.lessons.slice(0,limit);
 if(!lessons.length)return {document:null,reviewed:0,requested:0,missing:[],reason:"Não há capítulos cadastrados para essa seleção."};
 const document=args.professional?makeProfessionalBooklet(args.professional,limit,args.format):
  makeBooklet(args.subject,args.topic,limit,lessons,args.format);
 if(!document)return {document:null,reviewed:0,requested:lessons.length,missing:lessons.map(l=>l.title),reason:"Faltam capítulos publicados."};
 const audit=validatedChapters(document,lessons.map(l=>l.title));
 if(audit.missing.length)return {document:null,reviewed:audit.reviewed,requested:lessons.length,missing:audit.missing,
  reason:"Há capítulos resumidos que ainda precisam de desenvolvimento editorial. A apostila não será anunciada como completa."};
 return {document:{...document,subtitle:document.subtitle+" · Conteúdo editorial sem IA"},reviewed:audit.reviewed,
  requested:lessons.length,missing:[],reason:"Capítulos cadastrados atingiram o critério estrutural mínimo; ainda requerem revisão pedagógica."};
}
