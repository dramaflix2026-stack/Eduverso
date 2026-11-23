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
