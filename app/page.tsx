import Image from "next/image";
import Link from "next/link";
import LandingPreview from "./landing-preview";
import LandingPricing from "./landing-pricing";
import "./landing.css";

const go=(name:string)=>"/plataforma?disciplina="+encodeURIComponent(name);
export default function Landing(){
 return <div className="edu-lp">
  <header className="lp-header" id="topo">
   <div className="lp-container lp-header-inner">
    <Link href="/" className="lp-logo" aria-label="Eduverso — início"><span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong></Link>
    <nav className="lp-nav" aria-label="Navegação principal">
     <a href="#produto">Conheça por dentro</a><a href="#planos">Planos</a>
    </nav>
    <div className="lp-header-actions"><Link href="/entrar" className="lp-login">Entrar</Link><Link href="/cadastro" className="lp-button lp-button-small">Criar conta <span aria-hidden="true">↗</span></Link></div>
   </div>
  </header>
  <main>
   <section className="lp-hero lp-container" aria-labelledby="lp-heading">
    <div className="lp-hero-copy">
     <span className="lp-eyebrow"><span className="lp-pulse" aria-hidden="true"/> SEU ESTUDO EM UM SÓ LUGAR</span>
     <h1 id="lp-heading">Aprenda melhor. <em>Evolua no seu ritmo.</em></h1>
     <p>Da escola à Medicina: aulas, questões comentadas e trilhas para você aprender com clareza, praticar e continuar evoluindo.</p>
     <div className="lp-hero-actions">
      <a href="#planos" className="lp-button lp-button-large">Conhecer os planos <span aria-hidden="true">↗</span></a>
      <a href="#produto" className="lp-outline lp-button-large">Testar uma questão <span aria-hidden="true">→</span></a>
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
     <a href="#planos" className="lp-floating-chip lp-floating-chip-right lp-offer-chip" aria-label="Conhecer os três planos, a partir de R$ 29,90"><span className="lp-offer-chip-icon" aria-hidden="true">✦</span><span><strong>A partir de R$ 29,90</strong><small>3 opções de acesso ↗</small></span></a>
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

   <section id="produto" className="lp-section lp-container lp-product">
    <div className="lp-section-heading lp-centered">
     <span className="lp-eyebrow">CONHEÇA ANTES DE COMEÇAR</span>
     <h2>Veja o Eduverso <em>funcionando.</em></h2>
     <p>Uma plataforma que vai além de uma lista de matérias. Explore experiências disponíveis para os alunos.</p>
    </div>
    <LandingPreview/>
   </section>

   <LandingPricing/>

   <section className="lp-container lp-final">
    <span className="lp-eyebrow">SUA PRÓXIMA CONQUISTA COMEÇA AQUI</span>
    <h2>Seu próximo avanço começa <em>com uma escolha.</em></h2>
    <p>Conheça os planos, escolha sua jornada e experimente a plataforma antes de contratar.</p>
    <div className="lp-final-actions"><a href="#planos" className="lp-button">Ver os 3 planos <span aria-hidden="true">↗</span></a><a href="#produto" className="lp-outline">Testar demonstração <span aria-hidden="true">→</span></a></div>
    <small>Valores exibidos para escolha. O cadastro não realiza cobrança nem libera planos pagos automaticamente.</small>
   </section>

   <section className="lp-container lp-guarantee" aria-labelledby="lp-guarantee-title">
    <div className="lp-guarantee-seal" aria-hidden="true">
     <span className="lp-guarantee-spark">✦</span>
     <strong>7</strong>
     <span>DIAS</span>
    </div>
    <div className="lp-guarantee-copy">
     <span className="lp-eyebrow">MAIS SEGURANÇA NA SUA DECISÃO</span>
     <h2 id="lp-guarantee-title">Você tem <em>7 dias de garantia.</em></h2>
     <p>Contratou e mudou de ideia? Você poderá solicitar o cancelamento e o reembolso em até 7 dias após a compra, pelos canais de atendimento informados na contratação.</p>
     <span className="lp-guarantee-footnote">A garantia é válida para compras efetivamente realizadas. O cadastro, por si só, não gera cobrança.</span>
    </div>
    <a className="lp-guarantee-link" href="#planos" aria-label="Comparar planos do Eduverso">Ver planos <span aria-hidden="true">↗</span></a>
   </section>
  </main>

  <footer className="lp-footer">
   <div className="lp-footer-ambient" aria-hidden="true"/>
   <div className="lp-container lp-footer-main">
    <div className="lp-footer-brand">
     <Link href="/" className="lp-logo" aria-label="Eduverso — página inicial"><span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong></Link>
     <p>Seu universo de aprendizado. Descubra novos caminhos, pratique com propósito e evolua no seu ritmo.</p>
     <div className="lp-footer-brand-pills" aria-label="Diferenciais do Eduverso">
      <span>✦ Conhecimento</span><span>✦ Prática</span><span>✦ Evolução</span>
     </div>
    </div>
    <div className="lp-footer-navigation">
     <nav className="lp-footer-column" aria-label="Explorar o Eduverso">
      <h3>Explore</h3>
      <a href="#produto">Conhecer a plataforma</a>
      <a href="#planos">Planos e preços</a>
      <Link href="/plataforma">Ver demonstração</Link>
     </nav>
     <nav className="lp-footer-column" aria-label="Acesso à conta">
      <h3>Sua jornada</h3>
      <Link href="/cadastro">Criar minha conta</Link>
      <Link href="/entrar">Entrar</Link>
      <Link href="/plataforma">Acessar estudos</Link>
     </nav>
    </div>
   </div>
   <div className="lp-container lp-footer-bottom">
    <small>© {new Date().getFullYear()} Eduverso. Todos os direitos reservados.</small>
    <span>Aprender é descobrir possibilidades.</span>
    <a href="#topo">Voltar ao topo <span aria-hidden="true">↑</span></a>
   </div>
  </footer>
 </div>;
}
