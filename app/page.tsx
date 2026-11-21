import Image from "next/image";
import Link from "next/link";
import LandingSearch from "./landing-search";
import LandingPreview from "./landing-preview";
import LandingPaths from "./landing-paths";
import "./landing.css";

const go=(name:string)=>"/plataforma?disciplina="+encodeURIComponent(name);
const courses=[
 {name:"Matemática",detail:"Exercícios e resolução de problemas",image:"matematica.webp",href:go("Matemática")},
 {name:"Biologia",detail:"Do mundo microscópico à vida",image:"biologia.webp",href:go("Biologia")},
 {name:"Anatomia",detail:"Explore o corpo humano",image:"anatomia.webp",href:go("Anatomia")},
 {name:"ENEM",detail:"Prepare-se para a prova",image:"enem-e-vestibulares.webp",href:go("ENEM e Vestibulares")}
];

export default function Landing(){
 return <div className="edu-lp">
  <header className="lp-header">
   <div className="lp-container lp-header-inner">
    <Link href="/" className="lp-logo" aria-label="Eduverso — início"><span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong></Link>
    <nav className="lp-nav" aria-label="Navegação principal">
     <a href="#caminhos">Para quem é</a><a href="#produto">Como funciona</a><a href="#disciplinas">Conteúdos</a>
    </nav>
    <div className="lp-header-actions"><Link href="/entrar" className="lp-login">Entrar</Link><Link href="/cadastro" className="lp-button lp-button-small">Criar conta <span aria-hidden="true">↗</span></Link></div>
   </div>
  </header>
  <main>
   <section className="lp-hero lp-container" aria-labelledby="lp-heading">
    <div className="lp-hero-copy">
     <span className="lp-eyebrow"><span className="lp-pulse" aria-hidden="true"/> SEU ESTUDO EM UM SÓ LUGAR</span>
     <h1 id="lp-heading">Seu próximo passo começa com <em>um jeito melhor de estudar.</em></h1>
     <p>Da escola à Medicina, encontre aulas, questões e trilhas organizadas para estudar com clareza, praticar e seguir no seu ritmo.</p>
     <div className="lp-hero-actions">
      <Link href="/cadastro" className="lp-button lp-button-large">Começar agora <span aria-hidden="true">↗</span></Link>
      <a href="#produto" className="lp-outline lp-button-large">Conhecer a plataforma <span aria-hidden="true">→</span></a>
     </div>
     <div className="lp-hero-points"><span><b aria-hidden="true">✓</b> Aulas e questões</span><span><b aria-hidden="true">✓</b> Revisão por assunto</span><span><b aria-hidden="true">✓</b> Estude no celular</span></div>
    </div>
    <div className="lp-hero-stage" aria-label="Prévia ilustrativa da plataforma Eduverso">
     <div className="lp-stage-glow" aria-hidden="true"/>
     <div className="lp-app-window">
      <div className="lp-app-topbar">
       <span className="lp-app-minimark">✦</span><strong>Eduverso<span>.</span></strong><span className="lp-window-title">VISÃO DA PLATAFORMA</span><span className="lp-app-avatar" aria-hidden="true">E</span>
      </div>
      <div className="lp-app-body">
       <aside className="lp-app-sidebar" aria-hidden="true"><span className="lp-app-side-active">▦</span><span>◫</span><span>⌁</span><span>⚙</span></aside>
       <div className="lp-app-content">
        <span className="lp-app-kicker">SEU UNIVERSO DE APRENDIZADO</span>
        <h2>O que vamos aprender hoje?</h2>
        <p>Escolha uma matéria e avance no seu ritmo.</p>
        <div className="lp-app-courses">
         <Link href={go("Matemática")} className="lp-app-course">
          <Image src="/images/home/matematica.webp" alt="" fill sizes="(max-width: 680px) 40vw, 180px"/>
          <span className="lp-app-course-shade"/><span>Matemática <small>Explorar →</small></span>
         </Link>
         <Link href={go("Biologia")} className="lp-app-course">
          <Image src="/images/home/biologia.webp" alt="" fill sizes="(max-width: 680px) 40vw, 180px"/>
          <span className="lp-app-course-shade"/><span>Biologia <small>Explorar →</small></span>
         </Link>
        </div>
        <Link href={go("Matemática")} className="lp-app-lesson">
         <span className="lp-app-lesson-icon" aria-hidden="true">▤</span><span><small>EXEMPLO DE TRILHA</small><strong>Matemática · Frações</strong><em>Aula explicada → prática → revisão</em></span><span aria-hidden="true">↗</span>
        </Link>
       </div>
      </div>
     </div>
     <div className="lp-floating-chip lp-floating-chip-left" aria-hidden="true"><span>✦</span><strong>Conteúdos organizados</strong></div>
     <div className="lp-floating-chip lp-floating-chip-right" aria-hidden="true"><span>↗</span><strong>Aprenda no seu ritmo</strong></div>
     <p className="lp-illustration-note">Prévia ilustrativa da interface · veja as experiências reais abaixo</p>
    </div>
   </section>

   <section className="lp-proof" aria-label="O que você encontra no Eduverso">
    <div className="lp-container lp-proof-inner">
     <div><span aria-hidden="true">▤</span><p><strong>Da escola à graduação</strong><small>Trilhas para diferentes etapas</small></p></div>
     <div><span aria-hidden="true">✎</span><p><strong>Estudo com prática</strong><small>Questões e correção comentada</small></p></div>
     <div><span aria-hidden="true">◎</span><p><strong>Um lugar para evoluir</strong><small>Conteúdos, revisão e progresso</small></p></div>
    </div>
   </section>

   <section className="lp-section lp-container lp-choose-section" id="caminhos">
    <div className="lp-section-heading"><span className="lp-eyebrow">FEITO PARA O SEU MOMENTO</span><h2>Qual é o seu <em>objetivo?</em></h2><p>Escolha a área que mais combina com você e encontre o próximo passo para estudar.</p></div>
    <LandingPaths/>
   </section>

   <section id="produto" className="lp-section lp-container lp-product">
    <div className="lp-section-heading lp-centered">
     <span className="lp-eyebrow">CONHEÇA ANTES DE COMEÇAR</span>
     <h2>Veja o Eduverso <em>funcionando.</em></h2>
     <p>Uma plataforma que vai além de uma lista de matérias. Explore experiências disponíveis para os alunos.</p>
    </div>
    <LandingPreview/>
   </section>

   <section className="lp-section lp-container lp-learning" id="recursos">
    <div className="lp-section-heading"><span className="lp-eyebrow">APRENDIZADO NA PRÁTICA</span><h2>Entender, praticar e <em>lembrar.</em></h2><p>Ferramentas pensadas para transformar estudo em aprendizado ativo.</p></div>
    <div className="lp-learning-grid">
     <article className="lp-learning-feature">
      <div><span className="lp-number">01 / ESTUDE</span><h3>Primeiro, entenda a matéria.</h3><p>Comece pela explicação do assunto e veja exemplos antes de responder às questões.</p><Link href={go("Matemática")} className="lp-text-link">Explorar uma aula <span aria-hidden="true">↗</span></Link></div>
      <div className="lp-learning-image"><Image src="/images/home/matematica.webp" alt="Ilustração de matemática com números e formas geométricas" fill sizes="(max-width: 680px) 90vw, 480px"/></div>
     </article>
     <article className="lp-learning-feature lp-learning-feature-reverse">
      <div><span className="lp-number">02 / PRATIQUE</span><h3>Teste o que aprendeu.</h3><p>Faça questões com correção comentada e use desafios de identificação no atlas anatômico.</p><Link href="/plataforma?disciplina=Medicina&area=faculdade" className="lp-text-link">Conhecer o atlas <span aria-hidden="true">↗</span></Link></div>
      <div className="lp-learning-image"><Image src="/images/home/anatomia.webp" alt="Ilustração didática do corpo humano" fill sizes="(max-width: 680px) 90vw, 480px"/></div>
     </article>
    </div>
   </section>

   <section className="lp-section lp-container lp-discover" id="disciplinas">
    <div className="lp-section-heading lp-discover-head"><div><span className="lp-eyebrow">UM UNIVERSO DE CONTEÚDOS</span><h2>Encontre seu próximo <em>assunto.</em></h2><p>Escolha uma disciplina ou pesquise o que quer estudar hoje.</p></div><Link className="lp-text-link" href="/plataforma">Todas as áreas <span aria-hidden="true">↗</span></Link></div>
    <LandingSearch/>
    <div className="lp-subject-grid">{courses.map(c=><Link href={c.href} key={c.name} className="lp-subject-card">
     <Image src={"/images/home/"+c.image} alt="" fill sizes="(max-width: 680px) 45vw, 24vw"/>
     <span className="lp-subject-shade"/><span className="lp-subject-info"><strong>{c.name}</strong><small>{c.detail}</small></span><span className="lp-subject-arrow" aria-hidden="true">↗</span>
    </Link>)}</div>
   </section>

   <section className="lp-section lp-container lp-how" id="como-funciona">
    <div className="lp-section-heading lp-centered"><span className="lp-eyebrow">TRÊS PASSOS, NO SEU RITMO</span><h2>Estudar não precisa ser <em>complicado.</em></h2></div>
    <div className="lp-how-grid">
     <article><span>01</span><h3>Escolha seu caminho</h3><p>Encontre sua etapa de estudo e selecione uma disciplina.</p></article>
     <article><span>02</span><h3>Aprenda e pratique</h3><p>Abra uma trilha, estude o conteúdo e resolva atividades.</p></article>
     <article><span>03</span><h3>Continue evoluindo</h3><p>Retome seus assuntos e acompanhe seu percurso na conta.</p></article>
    </div>
   </section>

   <section className="lp-section lp-container lp-faq" id="perguntas">
    <div className="lp-section-heading"><span className="lp-eyebrow">DÚVIDAS FREQUENTES</span><h2>Antes de começar, <em>saiba mais.</em></h2></div>
    <div className="lp-faq-list">
     <details><summary>Quais áreas posso estudar no Eduverso?<span aria-hidden="true">+</span></summary><p>Há conteúdos do Ensino Fundamental e Médio, preparação para ENEM e concursos e uma área específica para Medicina. Cada área tem uma organização própria.</p></details>
     <details><summary>Posso conhecer a plataforma antes?<span aria-hidden="true">+</span></summary><p>Sim. Use a demonstração desta página para explorar as experiências disponíveis e conhecer a navegação.</p></details>
     <details><summary>O Eduverso funciona no celular?<span aria-hidden="true">+</span></summary><p>Sim. A plataforma é acessível pelo navegador do celular e também pelo computador.</p></details>
     <details><summary>Criar minha conta libera o conteúdo pago?<span aria-hidden="true">+</span></summary><p>O cadastro identifica o aluno, mas a liberação definitiva de conteúdos pagos depende da confirmação da compra.</p></details>
    </div>
   </section>

   <section className="lp-container lp-final">
    <span className="lp-eyebrow">SUA PRÓXIMA CONQUISTA COMEÇA AQUI</span>
    <h2>Um universo de aprendizado. <em>Um caminho só seu.</em></h2>
    <p>Explore, pratique e descubra até onde seu conhecimento pode chegar.</p>
    <div className="lp-final-actions"><Link href="/cadastro" className="lp-button">Criar minha conta <span aria-hidden="true">↗</span></Link><a href="#produto" className="lp-outline">Conhecer a plataforma <span aria-hidden="true">→</span></a></div>
    <small>Cadastro não equivale à liberação de compra. O acesso comercial será confirmado conforme o pagamento.</small>
   </section>
  </main>
  <footer className="lp-footer">
   <div className="lp-container lp-footer-inner">
    <Link href="/" className="lp-logo"><span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong></Link>
    <span>Seu universo de aprendizado.</span>
    <nav aria-label="Rodapé"><a href="#caminhos">Para quem é</a><a href="#produto">A plataforma</a><Link href="/entrar">Entrar</Link></nav>
    <small>© {new Date().getFullYear()} Eduverso</small>
   </div>
  </footer>
 </div>;
}
