import Image from "next/image";
import Link from "next/link";
import LandingPreview from "./landing-preview";
import LandingPricing from "./landing-pricing";
import MetaPixelTracking from "./meta-pixel";
import "./landing.css";

// Revalidate the public landing page so expired campaign copy is removed automatically.
export const revalidate = 60;
const BLACK_FRIDAY_END = Date.parse("2026-11-28T00:00:00-03:00");
const go=(name:string)=>"/plataforma?disciplina="+encodeURIComponent(name);
export default function Landing(){
 const blackFriday = Date.now() < BLACK_FRIDAY_END;
 const promo = "Oferta Black Friday válida até 27/11";
 return <div className="edu-lp">
  {blackFriday && <div className="lp-bf-banner" aria-label={promo}>
   <input className="lp-bf-pause" type="checkbox" id="lp-bf-pause" aria-label="Pausar faixa de oferta"/>
   <label className="lp-bf-pause-label" htmlFor="lp-bf-pause" aria-hidden="true"><span className="lp-bf-pause-icon">Ⅱ</span><span className="lp-bf-play-icon">▶</span></label>
   <div className="lp-bf-viewport" aria-hidden="true"><div className="lp-bf-track">{[0,1].map(group=><div className="lp-bf-group" key={group}>{[0,1,2,3].map(item=><span key={item}>✦ {promo} <b>•</b> Condição por tempo limitado <b>•</b></span>)}</div>)}</div></div>
   <span className="lp-bf-static" aria-hidden="true">{promo}</span>
  </div>}
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
   <section className="lp-hero lp-container lp-hero-redesign" aria-labelledby="lp-heading">
    <div className="lp-hero-copy">
     <span className="lp-eyebrow lp-hero-badge"><span className="lp-pulse" aria-hidden="true"/> {blackFriday ? "ÚLTIMOS DIAS DE BLACK FRIDAY" : "SEU ESTUDO EM UM SÓ LUGAR"}</span>
     <h1 id="lp-heading">Estude com mais clareza. <em>{blackFriday ? "Aproveite a Black Friday do Eduverso." : "Evolua com inteligência artificial."}</em></h1>
     <p className="lp-hero-subtitle">Da escola à Medicina: aulas, questões comentadas, revisões, trilhas e materiais com IA para você estudar no seu ritmo.</p>
     <p className="lp-hero-description">{blackFriday ? "Oferta especial por tempo limitado para transformar sua rotina de estudos com mais organização e prática." : "Organize sua rotina de estudos, pratique e acompanhe sua evolução em um só lugar."}</p>
     <div className="lp-hero-price"><span>A partir de <strong>R$ 49,90</strong></span><span>Pagamento único · sem mensalidade</span></div>
     <div className="lp-hero-actions">
      <a href="#planos" className="lp-button lp-button-large">{blackFriday ? "Garantir minha oferta" : "Conhecer os planos"} <span aria-hidden="true">↗</span></a>
      <a href="#produto" className="lp-outline lp-button-large">Testar uma questão grátis <span aria-hidden="true">→</span></a>
     </div>
     <div className="lp-hero-points"><span><b aria-hidden="true">✓</b> Aulas e questões</span><span><b aria-hidden="true">✓</b> Revisão por assunto</span><span><b aria-hidden="true">✓</b> Estude no celular</span></div>
    </div>
    <div className="lp-hero-stage" aria-label="Prévia ilustrativa da plataforma Eduverso">
     <div className="lp-stage-glow" aria-hidden="true"/>
     <div className="lp-hero-preview-label"><span aria-hidden="true">✦</span> CONHEÇA O EDUVERSO POR DENTRO</div>
     <div className="lp-app-window">
      <div className="lp-app-topbar">
       <span className="lp-app-minimark">✦</span><strong>Eduverso<span>.</span></strong><span className="lp-window-title">ÁREA DE ESTUDOS</span><span className="lp-app-avatar" aria-hidden="true">E</span>
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
     <div className="lp-hero-preview-footer"><span>✓ Aulas, prática e revisão</span><a href="#planos">{blackFriday ? "Oferta até 27/11" : "Conhecer planos"} <span aria-hidden="true">↗</span></a></div>
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
    <div className="lp-final-actions"><a href="#planos" className="lp-button">Ver os 2 planos <span aria-hidden="true">↗</span></a><a href="#produto" className="lp-outline">Testar demonstração <span aria-hidden="true">→</span></a></div>
    <small>Compre diretamente na Kiwify pelo botão do seu plano. Para vincular o acesso à sua conta, use no Eduverso o mesmo e-mail informado na compra.</small>
   </section>

   <section className="lp-container lp-guarantee lp-guarantee-art" aria-labelledby="lp-guarantee-title">
    <picture className="lp-guarantee-picture" aria-hidden="true">
     <source media="(max-width: 680px)" srcSet="/images/eduverso-garantia-mobile.svg"/>
     <img src="/images/eduverso-garantia-desktop.svg" alt="" loading="lazy" decoding="async"/>
    </picture>
    <div className="lp-guarantee-overlay" aria-hidden="true"/>
    <div className="lp-guarantee-content">
     <span className="lp-guarantee-kicker"><span aria-hidden="true">✦</span> COMPRA COM TRANQUILIDADE</span>
     <h2 id="lp-guarantee-title">Sua escolha tem <em>7 dias de garantia.</em></h2>
     <p>Se mudar de ideia, você pode solicitar o cancelamento e o reembolso em até 7 dias após a compra, pelos canais informados na contratação.</p>
     <div className="lp-guarantee-benefits"><span>✓ 7 dias para decidir</span><span>✓ Solicitação de reembolso</span></div>
     <a className="lp-button lp-guarantee-button" href="#planos">Conhecer os planos <span aria-hidden="true">↗</span></a>
     <small>Válida para compras realizadas. O cadastro não gera cobrança.</small>
    </div>
   </section>
  </main>

  <footer className="lp-footer lp-footer-redesign">
   <div className="lp-footer-highlight" aria-hidden="true"/>
   <div className="lp-container lp-footer-newtop">
    <div className="lp-footer-newbrand">
     <Link href="/" className="lp-logo" aria-label="Eduverso — início">
      <span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong>
     </Link>
     <h2>Seu universo de <em>possibilidades.</em></h2>
     <p>Explore o conhecimento, encontre seu ritmo e siga aprendendo. Tudo em um só lugar.</p>
     <a href="#produto" className="lp-footer-newcta">Explorar a plataforma <span aria-hidden="true">↗</span></a>
    </div>
    <div className="lp-footer-newlinks">
     <nav className="lp-footer-newcol" aria-label="Conhecer o Eduverso">
      <h3>Descubra</h3>
      <a href="#produto">Como é a plataforma</a>
      <a href="#planos">Planos e preços</a>
      <Link href="/plataforma">Demonstração</Link>
     </nav>
     <nav className="lp-footer-newcol" aria-label="Sua conta no Eduverso">
      <h3>Sua conta</h3>
      <Link href="/cadastro">Criar conta</Link>
      <Link href="/entrar">Fazer login</Link>
      <Link href="/plataforma">Área de estudos</Link>
     </nav>
    </div>
   </div>
   <div className="lp-container eduverso-privacy-footer"><MetaPixelTracking/></div>
   <div className="lp-container lp-footer-newbottom">
    <small>© {new Date().getFullYear()} Eduverso · Todos os direitos reservados.</small>
    <span>Aprender abre novos caminhos.</span>
    <a href="#topo">Voltar ao topo <span aria-hidden="true">↑</span></a>
   </div>
  </footer>
 </div>;
}
