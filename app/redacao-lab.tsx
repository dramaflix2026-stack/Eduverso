"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import styles from "./redacao-lab.module.css";

type Tab="editor"|"competencias"|"biblioteca"|"historico";
type SavedVersion={id:string;theme:string;essay:string;createdAt:string};
const topics=[
 "Desafios para o combate à desinformação na sociedade brasileira",
 "Caminhos para ampliar o acesso à cultura no Brasil",
 "Desafios para a valorização do trabalho de cuidado no Brasil"
];
const criteria=[
 {key:"C1",title:"Domínio da modalidade escrita formal",focus:"Releia concordância, regência, ortografia, pontuação e construção sintática.",tip:"Revise cada período isoladamente e confira se as ideias são claras."},
 {key:"C2",title:"Compreensão da proposta e repertório",focus:"Confirme se o tema foi atendido integralmente e se o repertório fundamenta a discussão.",tip:"Não use citações decorativas: explique a relação com a tese."},
 {key:"C3",title:"Seleção e organização dos argumentos",focus:"Apresente uma tese, desenvolva causas/consequências e defenda um ponto de vista.",tip:"Cada parágrafo argumentativo deve sustentar uma ideia central."},
 {key:"C4",title:"Mecanismos linguísticos de coesão",focus:"Relacione frases e parágrafos com conectivos adequados e retomadas referenciais.",tip:"Evite conectivos repetidos ou usados sem relação lógica."},
 {key:"C5",title:"Proposta de intervenção",focus:"Na proposta, apresente agente, ação, meio/modo, finalidade/efeito e detalhamento pertinente, respeitando os direitos humanos.",tip:"A intervenção deve responder a um problema defendido no texto."}
];
const prompts=[
 {title:"Planejar a tese",desc:"Que posição você pretende defender? Quais dois argumentos distintos sustentam essa posição?"},
 {title:"Construir argumentos",desc:"No desenvolvimento, explique por que o problema ocorre, apresente evidências e estabeleça relações de causa e consequência."},
 {title:"Revisar o repertório",desc:"Que conhecimento externo pertinente você consegue explicar, em vez de apenas mencionar?"},
 {title:"Concluir com intervenção",desc:"Quem atuará, o que fará, como fará, com qual finalidade e que detalhe torna a proposta mais concreta?"}
];
const maxEssay=18000;
const keyFor=(id:string)=>"eduverso:premium:redacao:v1:"+id;
function validVersion(value:unknown):value is SavedVersion{
 if(!value||typeof value!=="object")return false;
 const v=value as Partial<SavedVersion>;
 return typeof v.id==="string"&&typeof v.theme==="string"&&typeof v.essay==="string"&&v.essay.length<=maxEssay&&typeof v.createdAt==="string";
}
function countWords(value:string){return value.trim().length?value.trim().split(/\s+/u).length:0;}
function nonemptyParagraphs(value:string){return value.split(/\n\s*\n/u).map(s=>s.trim()).filter(Boolean);}
export default function RedacaoLab({userId}:{userId:string}){
 const [tab,setTab]=useState<Tab>("editor");
 const [theme,setTheme]=useState(topics[0]);
 const [essay,setEssay]=useState("");
 const [versions,setVersions]=useState<SavedVersion[]>([]);
 const [loaded,setLoaded]=useState(false);
 const [feedback,setFeedback]=useState("");
 const [focus,setFocus]=useState(0);
 const words=useMemo(()=>countWords(essay),[essay]);
 const paragraphs=useMemo(()=>nonemptyParagraphs(essay),[essay]);
 const checklist=[
  {label:"Tema definido e relacionado ao texto",ok:theme.trim().length>=12&&essay.trim().length>80},
  {label:"Texto desenvolvido em mais de um parágrafo",ok:paragraphs.length>=3},
  {label:"Ponto de vista e argumentos articulados",ok:words>=180&&paragraphs.length>=3},
  {label:"Conclusão e intervenção revisadas",ok:paragraphs.length>=4&&words>=260}
 ];
 useEffect(()=>{
  try{
   const raw=localStorage.getItem(keyFor(userId));
   if(raw){
    const parsed:unknown=JSON.parse(raw);
    if(Array.isArray(parsed))setVersions(parsed.filter(validVersion).slice(0,20));
   }
  }catch{setFeedback("Não foi possível carregar versões salvas neste dispositivo.");}
  setLoaded(true);
 },[userId]);
 function save(){
  if(!loaded)return;
  if(essay.trim().length<30){setFeedback("Escreva ao menos 30 caracteres antes de salvar uma versão.");return;}
  const item:SavedVersion={id:crypto.randomUUID(),theme:theme.slice(0,200),essay:essay.slice(0,maxEssay),createdAt:new Date().toISOString()};
  const next=[item,...versions].slice(0,20);
  try{localStorage.setItem(keyFor(userId),JSON.stringify(next));setVersions(next);setFeedback("Versão salva neste navegador. Ela não é sincronizada com outros aparelhos.");}
  catch{setFeedback("Sem espaço para salvar no navegador. Copie seu texto para mantê-lo seguro.");}
 }
 function removeVersion(id:string){
  const next=versions.filter(v=>v.id!==id);
  try{localStorage.setItem(keyFor(userId),JSON.stringify(next));setVersions(next);setFeedback("Versão excluída deste navegador.");}
  catch{setFeedback("Não foi possível excluir esta versão.")}
 }
 function restoreVersion(v:SavedVersion){
  if(essay.trim()&&!window.confirm("Substituir o texto atual por esta versão? Salve seu rascunho antes, se necessário."))return;
  setEssay(v.essay);setTheme(v.theme);setTab("editor");setFeedback("Versão recuperada no editor. Clique em Salvar versão para registrar alterações.");
 }
 const tabs:{id:Tab;title:string;icon:string}[]=[
  {id:"editor",title:"Meu texto",icon:"✎"},
  {id:"competencias",title:"Critérios ENEM",icon:"◎"},
  {id:"biblioteca",title:"Biblioteca",icon:"▤"},
  {id:"historico",title:"Minha evolução",icon:"↗"}
 ];
 return <main className={styles.page}>
  <header className={styles.header}>
   <Link className={styles.back} href={"/plataforma?disciplina="+encodeURIComponent("Laboratório de Redação ENEM")}>← Voltar ao Eduverso</Link>
   <div className={styles.kicker}>✦ EDUVERSO · LABORATÓRIO PREMIUM</div>
   <h1>Laboratório de <span>Redação ENEM.</span></h1>
   <p>Pratique a escrita com método, analise as competências e acompanhe suas versões. O mentor e a correção automática por IA serão ativados após a integração.</p>
   <div className={styles.headerFlags}><span>✎ Editor disponível</span><span>▤ Histórico neste aparelho</span><span>🔒 Correção por IA ainda indisponível</span></div>
  </header>
  <nav className={styles.tabs} aria-label="Áreas do laboratório">
   {tabs.map(item=><button type="button" key={item.id} className={tab===item.id?styles.selected:""} aria-current={tab===item.id?"page":undefined} onClick={()=>{setFeedback("");setTab(item.id);}}><span aria-hidden="true">{item.icon}</span> {item.title}</button>)}
  </nav>
  {tab==="editor"&&<div className={styles.workbench}>
   <section className={styles.editorPane} aria-label="Editor de redação">
    <div className={styles.paneTop}><div><span className={styles.kicker}>SEU RASCUNHO</span><h2>Escreva sua redação</h2></div><span className={styles.softBadge}>Treinamento</span></div>
    <label className={styles.fieldLabel} htmlFor="eduverso-redacao-theme">Tema de treino</label>
    <select id="eduverso-redacao-theme" value={topics.includes(theme)?theme:"personalizado"} onChange={e=>setTheme(e.target.value==="personalizado"?"":e.target.value)}>
     {topics.map(t=><option value={t} key={t}>{t}</option>)}
     <option value="personalizado">Tema personalizado</option>
    </select>
    {!topics.includes(theme)&&<input aria-label="Escreva um tema personalizado" maxLength={200} placeholder="Digite o tema escolhido" value={theme} onChange={e=>setTheme(e.target.value)}/>}
    <div className={styles.editorMeta}><span>Redação dissertativo-argumentativa</span><span>{words} palavras · {essay.length} caracteres</span></div>
    <textarea className={styles.essay} aria-label="Texto da redação" spellCheck value={essay} maxLength={maxEssay} onChange={e=>{setEssay(e.target.value);if(feedback)setFeedback("");}} placeholder="Apresente o tema e sua tese.\n\nDesenvolva o primeiro argumento.\n\nDesenvolva o segundo argumento.\n\nConclua com uma proposta de intervenção..."/>
    <div className={styles.editorActions}><button type="button" className={styles.primary} onClick={save} disabled={!loaded}>Salvar versão</button><span>Salvamento local e manual. Copie seu texto como segurança.</span></div>
    {feedback&&<p className={styles.message} role="status">{feedback}</p>}
   </section>
   <aside className={styles.mentorPane}>
    <span className={styles.kicker}>MENTORIA DE ESCRITA</span><h2>Orientações para evoluir</h2>
    <p className={styles.muted}>Estas orientações são fixas, não uma resposta da IA nem uma correção da sua redação.</p>
    <div className={styles.tipButtons}>{prompts.map((item,i)=><button type="button" className={focus===i?styles.tipSelected:""} onClick={()=>setFocus(i)} key={item.title}>{item.title}</button>)}</div>
    <div className={styles.tipCard}><strong>{prompts[focus].title}</strong><p>{prompts[focus].desc}</p></div>
    <h3>Checklist estrutural</h3>
    <div className={styles.checklist}>{checklist.map((item,i)=><div key={item.label}><span className={item.ok?styles.good:styles.pending}>{item.ok?"✓":"○"}</span><span>{item.label}</span></div>)}</div>
    <p className={styles.hint}>A checagem é baseada em quantidade de texto e parágrafos; não valida a qualidade nem a correção gramatical.</p>
    <div className={styles.disabledAI}><strong>✦ Mentor e avaliação por IA</strong><p>Integração com OpenAI pendente. Sem nota inventada, sem cobrança e sem descontar correções.</p></div>
   </aside>
  </div>}
  {tab==="competencias"&&<section className={styles.panel}><span className={styles.kicker}>MATRIZ DE REFERÊNCIA</span><h2>As cinco competências avaliadas no ENEM</h2><p className={styles.muted}>Cada competência pode receber de 0 a 200 pontos na avaliação do ENEM. Aqui, os critérios são apresentados para estudo; nenhum ponto é atribuído enquanto a correção por IA não estiver ativa.</p><div className={styles.rubric}>{criteria.map(item=><article key={item.key}><div className={styles.competencyHeader}><span>{item.key}</span><strong>{item.title}</strong><small>Não avaliado</small></div><p>{item.focus}</p><p className={styles.learningTip}>Para revisar: {item.tip}</p></article>)}</div><a href="https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/a-redacao-do-enem-2026-cartilha-do-a-participante" target="_blank" rel="noopener noreferrer" className={styles.reference}>Consultar a Cartilha do Participante 2026 (Inep) ↗</a></section>}
  {tab==="biblioteca"&&<section className={styles.panel}><span className={styles.kicker}>BIBLIOTECA COMENTADA</span><h2>Estude a construção de redações de alto desempenho</h2><p className={styles.muted}>A seleção editorial de textos por ano ainda está em curadoria. Comece pelas redações exemplificadas e comentadas no material oficial, sem confundir uma produção de treino com um texto que realmente recebeu nota 1000.</p><div className={styles.libraryGrid}><article><span>FONTE OFICIAL · 2026</span><h3>Cartilha da Redação do ENEM 2026</h3><p>Critérios de avaliação, orientações e exemplos comentados de redações de 2025. Leia o material para estudar a organização dos argumentos e o desenvolvimento da proposta de intervenção.</p><a href="https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/a-redacao-do-enem-2026-cartilha-do-a-participante" target="_blank" rel="noopener noreferrer">Consultar material do Inep ↗</a></article><article><span>MÉTODO DE ESTUDO</span><h3>Como analisar uma redação exemplar</h3><p>Identifique tese, repertório pertinente, progressão dos argumentos, conectores e proposta de intervenção. Reescreva uma estratégia com suas próprias palavras para praticar.</p></article><article><span>EM CONSTRUÇÃO</span><h3>Acervo por ano e competência</h3><p>Organização planejada de exemplos autenticamente documentados por edição, com comentários originais, fontes e licenças verificadas antes de publicar.</p></article></div></section>}
  {tab==="historico"&&<section className={styles.panel}><span className={styles.kicker}>SUAS VERSÕES</span><h2>Histórico de redações</h2><p className={styles.muted}>O histórico fica apenas neste dispositivo e navegador, associado à sua conta. Ele não está sincronizado com a nuvem; a limpeza dos dados do navegador pode apagá-lo.</p>{!versions.length?<div className={styles.empty}>Nenhuma versão salva. Escreva no editor e selecione <strong>Salvar versão</strong> para começar.</div>:<div className={styles.history}>{versions.map(item=><article key={item.id}><div><small>{new Date(item.createdAt).toLocaleString("pt-BR")}</small><h3>{item.theme||"Tema personalizado"}</h3><p>{countWords(item.essay)} palavras · {nonemptyParagraphs(item.essay).length} parágrafos</p></div><div className={styles.historyActions}><button type="button" onClick={()=>restoreVersion(item)}>Abrir versão</button><button type="button" onClick={()=>{if(window.confirm("Excluir esta versão salva deste dispositivo?"))removeVersion(item.id);}}>Excluir</button></div></article>)}</div>}{feedback&&<p role="status" className={styles.message}>{feedback}</p>}</section>}
  <footer className={styles.foot}>Eduverso · Ferramenta de prática não oficial. Nenhuma nota obtida aqui equivale à avaliação do Inep.</footer>
 </main>;
}
