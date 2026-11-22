import styles from "./learning-quality.module.css";
export type QualityMode="med-vestibular"|"med-faculdade"|"med-exames"|"med-instituicoes"|"fundamental"|"medio"|"enem"|"profissional"|"criacao"|"geral";
type Reference={label:string;url:string};
const ENEM="https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem";
const REVALIDA="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/revalida/provas-e-gabaritos";
const DCN="https://www.gov.br/mec/pt-br/cne/2025/outubro-2025/rces003_25.pdf";
const FUVEST="https://www.fuvest.br/acervo/";
const descriptions:Record<QualityMode,{headline:string;scope:string;level:string;references:Reference[];method:string}>={
 "med-vestibular":{
  headline:"Preparação de alta exigência para Medicina",
  scope:"Biologia, Química, Física, Matemática, interpretação e redação: competências cobradas nos processos seletivos mais concorridos.",
  level:"Meta editorial: dificuldade máxima adequada ao vestibular escolhido, com raciocínio em várias etapas e alternativas plausíveis. As questões atuais têm níveis variados e ainda exigem curadoria para atingir essa meta em todo o banco.",
  references:[{label:"Matriz do ENEM — Inep",url:ENEM},{label:"Acervo de provas — FUVEST",url:FUVEST}],
  method:"Questões e explicações das trilhas são textos didáticos próprios do acervo Eduverso; não foram copiadas nem oficialmente validadas pelo Inep ou pela FUVEST. Os documentos indicados são referências para orientar a cobertura e o nível."
 },
 "med-faculdade":{
  headline:"Formação médica: raciocínio e integração clínica",
  scope:"Do ciclo básico ao internato: conceitos, mecanismos, aplicações e integração entre sistemas, conforme o estágio de formação.",
  level:"Meta editorial: progressão até questões avançadas de aplicação e correlação clínica. O banco inclui itens introdutórios e não representa avaliação formal de competências.",
  references:[{label:"Diretrizes Curriculares Nacionais de Medicina — CNE/CES, 2025",url:DCN}],
  method:"Aulas, casos e questões são material didático do Eduverso. As diretrizes servem de referência curricular, não de certificação, endosso ou fonte literal das perguntas."
 },
 "med-exames":{
  headline:"Revalida e residência: preparação com rigor",
  scope:"Situações-problema, integração entre áreas e raciocínio clínico orientado por matrizes e editais específicos.",
  level:"Meta editorial: alta complexidade e resolução fundamentada, no padrão de exigência do exame escolhido. O acervo disponível é autoral, tem níveis variados e não equivale a provas oficiais.",
  references:[{label:"Revalida — provas, gabaritos e matriz, Inep",url:REVALIDA},{label:"DCN de Medicina — CNE/CES, 2025",url:DCN}],
  method:"Questões de revisão não são questões oficiais de Revalida/ENARE. A seleção depende do ano, da banca e do edital aplicável. Protocolos clínicos e recomendações exigem atualização específica."
 },
 "med-instituicoes":{
  headline:"Provas identificadas por instituição e processo seletivo",
  scope:"Cada universidade pode usar ENEM/Sisu, vestibular próprio, diferentes fases ou modalidades de ingresso.",
  level:"A dificuldade das provas oficiais é própria de cada edição; a plataforma não atribui nível máximo universal nem transforma uma questão autoral em questão institucional.",
  references:[{label:"FUVEST — acervo oficial",url:FUVEST},{label:"ENEM — provas e gabaritos, Inep",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos"}],
  method:"A seleção de instituição leva aos roteiros e às fontes cadastradas. Quando não há prova ou gabarito oficial integrados, isso deve ser informado ao estudante."
 },
 fundamental:{
  headline:"Rigor pedagógico adequado a cada ano",
  scope:"Conceitos progressivos, linguagem compreensível, exemplos concretos e exercícios que verificam compreensão real.",
  level:"O desafio máximo deve ser compatível com a etapa escolar: não é adequado impor dificuldade universitária ao Ensino Fundamental.",
  references:[{label:"Base Nacional Comum Curricular — MEC",url:"https://basenacionalcomum.mec.gov.br/"}],
  method:"O catálogo atual combina materiais editoriais e exercícios produzidos a partir das aulas da plataforma. A referência curricular não significa revisão oficial de cada item."
 },
 medio:{
  headline:"Preparação progressiva até alto desempenho",
  scope:"Da consolidação dos fundamentos à interpretação de gráficos, problemas contextualizados e raciocínio multi-etapas.",
  level:"Meta: alcançar questões de alto nível sem eliminar as intermediárias, necessárias à progressão do aprendizado.",
  references:[{label:"Matrizes de Referência do ENEM — Inep",url:ENEM}],
  method:"As explicações e questões do acervo Eduverso são didáticas, não provas oficiais; o nível precisa ser aferido por conteúdo e não apenas por um selo."
 },
 enem:{
  headline:"Conteúdo alinhado aos eixos do ENEM",
  scope:"Domínio de linguagens, compreensão de fenômenos, resolução de problemas, argumentação e propostas.",
  level:"Meta: problemas contextualizados e alta exigência cognitiva, sempre com gabarito e justificativa consistentes.",
  references:[{label:"Matrizes de Referência do ENEM — Inep",url:ENEM}],
  method:"Questões autorais são identificadas como autorais; somente o acervo de provas anteriores contém documentos institucionais identificados por edição e caderno."
 },
 profissional:{
  headline:"Aprendizado profissional baseado em competências",
  scope:"Conceito, aplicação real, estudo de caso e prática guiada, com desafios proporcionais à formação escolhida.",
  level:"Meta: progressão do nível introdutório ao avançado. As trilhas atuais incluem conteúdos iniciais e não representam certificação técnica.",
  references:[],
  method:"Materiais do catálogo são editoriais do Eduverso. Sempre conferir data, documentação técnica e requisitos específicos de cada profissão."
 },
 criacao:{
  headline:"Materiais pedagógicos com origem identificada",
  scope:"Provas, apostilas e atividades devem trazer objetivos, teoria, exemplos, questões distintas e resolução comentada quando aplicável.",
  level:"A dificuldade deve corresponder à área e ao público escolhido; quantidade de questões não substitui qualidade.",
  references:[],
  method:"Os PDFs atuais utilizam o catálogo editorial Eduverso e não empregam geração generativa em tempo real. Revise pertinência, respostas e explicações antes da distribuição."
 },
 geral:{
  headline:"Padrão pedagógico Eduverso",
  scope:"Explicações fundamentadas, exemplos aplicados, prática com feedback e caminhos claros de aprofundamento.",
  level:"Nível ajustado à matéria e ao objetivo do estudante; alta exigência quando a formação ou avaliação a requer.",
  references:[],
  method:"O conteúdo interno pode ser autoral ou reorganizado a partir do acervo. Referências externas indicam parâmetros de estudo, não homologação de cada questão."
 }
};
export default function LearningQuality({mode,compact=false}:{mode:QualityMode;compact?:boolean}){
 const item=descriptions[mode];
 return <aside className={styles.panel+" "+(compact?styles.compact:"")} aria-label="Origem e rigor pedagógico do conteúdo">
  <div className={styles.top}><span className={styles.symbol} aria-hidden="true">✦</span><span className={styles.eyebrow}>PADRÃO EDUVERSO · ORIGEM E RIGOR</span></div>
  <h2>{item.headline}</h2>
  {!compact&&<p className={styles.scope}>{item.scope}</p>}
  <div className={styles.criterion}><strong>◈ Exigência da matéria</strong><p>{item.level}</p></div>
  <div className={styles.criterion}><strong>◎ Origem das questões e explicações</strong><p>{item.method}</p></div>
  {item.references.length>0&&<div className={styles.links}><span>Documentos de referência</span>{item.references.map(ref=><a key={ref.url} target="_blank" rel="noopener noreferrer" href={ref.url}>{ref.label} ↗</a>)}</div>}
 </aside>;
}
