import styles from "./premium-modules.module.css";

type PremiumKind="atlas"|"redacao";

const competences=[
 {short:"C1",name:"Domínio da escrita formal"},
 {short:"C2",name:"Compreensão do tema e repertório"},
 {short:"C3",name:"Seleção e organização de argumentos"},
 {short:"C4",name:"Coesão e mecanismos linguísticos"},
 {short:"C5",name:"Proposta de intervenção"}
];

const modules={
 atlas:{
  kicker:"ANATOMIA · EXPERIÊNCIA AVANÇADA",
  title:"Atlas Clínico Premium",
  description:"Um novo nível de exploração anatômica: imagens originais produzidas para o Eduverso, estruturas selecionáveis e conexões com a prática clínica.",
  price:"R$ 29,90",
  features:[
   {icon:"◈",title:"Atlas original e interativo",desc:"Ilustrações anatômicas autorais, com regiões, estruturas e camadas para explorar por toque."},
   {icon:"✦",title:"Exploração e animações",desc:"Ampliação, pontos interativos, relações entre estruturas e movimentos que apoiem o entendimento."},
   {icon:"◎",title:"Desafios clínicos",desc:"Identificação de estruturas, questões progressivas e aplicações com explicações detalhadas."},
   {icon:"▤",title:"Materiais de aprofundamento",desc:"Resumos ilustrados e materiais complementares, preparados com revisão anatômica."}
  ],
  note:"O atlas já incluído no Eduverso permanece acessível conforme o plano original. Este módulo será uma expansão premium, com conteúdo próprio."
 },
 redacao:{
  kicker:"ENEM · ESCRITA E EVOLUÇÃO",
  title:"Laboratório de Redação ENEM",
  description:"Um ambiente para planejar, escrever, revisar e aprender com redações de alto desempenho. A análise por IA será integrada posteriormente.",
  price:"R$ 19,90",
  features:[
   {icon:"✎",title:"Editor com método",desc:"Organização de tese, introdução, argumentos, repertório, conclusão e proposta de intervenção."},
   {icon:"✦",title:"Mentor de escrita com IA",desc:"Orientações de reescrita e conversas pedagógicas para desenvolver o texto, sem substituí-lo pelo aluno."},
   {icon:"◎",title:"Avaliação por competências",desc:"Devolutiva comentada com cinco competências, exemplos de trechos e pontuação apenas estimada."},
   {icon:"▤",title:"Acervo comentado e evolução",desc:"Estudos de redações de alto desempenho documentadas por ano e histórico das versões do próprio aluno."}
  ],
  note:"O laboratório será independente dos conteúdos básicos de redação do Eduverso. Qualquer nota por IA será pedagógica e estimada, nunca oficial do Inep."
 }
} as const;

export default function PremiumModulePreview({kind}:{kind:PremiumKind}){
 const module=modules[kind];
 return <section className={styles.wrapper} aria-label={module.title}>
  <div className={styles.hero}>
   <div className={styles.heroCopy}>
    <span className={styles.eyebrow}><span aria-hidden="true">✦</span> {module.kicker}</span>
    <h1>{module.title}<span className={styles.period}>.</span></h1>
    <p>{module.description}</p>
    <div className={styles.heroFoot}>
     <span className={styles.locked} aria-label="Acesso premium ainda não liberado">🔒 Acesso premium</span>
     <span className={styles.price}>Valor previsto: <strong>{module.price}</strong></span>
    </div>
   </div>
   <div className={styles.heroArt} aria-label="Prévia conceitual do módulo">
    <div className={styles.artWindow}>
     <div className={styles.artTop}><span>✦ Eduverso</span><span>PREVIEW</span></div>
     <div className={styles.artSymbol} aria-hidden="true">{kind==="atlas"?"🦴":"✍️"}</div>
     <strong>{kind==="atlas"?"Explore. Identifique. Compreenda.":"Planeje. Escreva. Evolua."}</strong>
     <small>Experiência premium em preparação</small>
    </div>
   </div>
  </div>
  <div className={styles.sectionHead}><span>O QUE ESTAMOS PREPARANDO</span><h2>Recursos do módulo</h2></div>
  <div className={styles.featureGrid}>{module.features.map(feature=><article className={styles.feature} key={feature.title}><span className={styles.featureIcon} aria-hidden="true">{feature.icon}</span><h3>{feature.title}</h3><p>{feature.desc}</p></article>)}</div>
  {kind==="redacao"&&<section className={styles.rubric} aria-labelledby="premium-rubric-title">
   <div><span className={styles.eyebrow}>REFERÊNCIA PEDAGÓGICA</span><h2 id="premium-rubric-title">Cinco competências do ENEM</h2><p>O projeto de avaliação seguirá a matriz publicada pelo Inep, com até 200 pontos por competência. O resultado da ferramenta será sempre uma estimativa não oficial.</p></div>
   <div className={styles.competenceList}>{competences.map(item=><div key={item.short} className={styles.competence}><strong>{item.short}</strong><span>{item.name}</span><small>0–200</small></div>)}</div>
  </section>}
  <div className={styles.notice}><span aria-hidden="true">🔒</span><div><strong>Prévia de um recurso adicional</strong><p>{module.note} A liberação por compra na Kiwify e as funcionalidades internas ainda não estão ativas nesta etapa.</p></div></div>
 </section>;
}
