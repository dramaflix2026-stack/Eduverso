import Link from "next/link";
import LandingPreview from "./landing-preview";
import LandingCarousel from "./landing-carousel";
import LandingPricing from "./landing-pricing";
import MetaPixelTracking from "./meta-pixel";
import "./landing.css";

// Revalidate the public landing page so expired campaign copy is removed automatically.
export const revalidate = 60;
const BLACK_FRIDAY_END = Date.parse("2026-11-28T00:00:00-03:00");
export default function Landing(){
 const blackFriday = Date.now() < BLACK_FRIDAY_END;
 const promo = "Oferta Black Friday válida até 27/11";
 return <div className="edu-lp">
  {blackFriday && <div className="lp-bf-banner" aria-label={promo}>
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
     <div className="lp-hero-actions">
      <a href="#planos" className="lp-button lp-button-large">{blackFriday ? "Garantir minha oferta" : "Conhecer os planos"} <span aria-hidden="true">↗</span></a>
      <a href="#produto" className="lp-outline lp-button-large">Testar uma questão grátis <span aria-hidden="true">→</span></a>
     </div>
     <div className="lp-hero-points"><span><b aria-hidden="true">✓</b> Aulas e questões</span><span><b aria-hidden="true">✓</b> Revisão por assunto</span><span><b aria-hidden="true">✓</b> Estude no celular</span></div>
    </div>
    <div className="lp-hero-stage lp-carousel-stage">
     <div className="lp-stage-glow" aria-hidden="true"/>
     <div className="lp-hero-preview-label"><span aria-hidden="true">✦</span> CONHEÇA O EDUVERSO POR DENTRO</div>
     <LandingCarousel/>
     <p className="lp-illustration-note">Artes ilustrativas dos recursos. Consulte as condições de cada plano e complemento.</p>
    </div>
   </section>

   <section className="lp-benefits-fixed" aria-labelledby="lp-benefits-title">
    <div className="lp-container lp-benefits-shell">
     <span className="lp-eyebrow">MAIS POSSIBILIDADES. MENOS COMPLICAÇÃO.</span>
     <h2 id="lp-benefits-title">Tudo o que você precisa para <em>ir mais longe.</em></h2>
     <div className="lp-benefits-grid">
      <article className="lp-benefits-tile"><span className="lp-benefits-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5-10-5zM6 11v6c4 3 8 3 12 0v-6M22 9v7"/></svg></span><h3>Do Fundamental à Medicina</h3></article>
      <article className="lp-benefits-tile"><span className="lp-benefits-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4a3 3 0 0 0-5-2 3 3 0 0 0-3 4 4 4 0 0 0-1 7 4 4 0 0 0 3 6 3 3 0 0 0 6 0V4Zm0 0a3 3 0 0 1 5-2 3 3 0 0 1 3 4 4 4 0 0 1 1 7 4 4 0 0 1-3 6 3 3 0 0 1-6 0M7 6c0 2 2 3 5 3m5-3c0 2-2 3-5 3M6 15h3m6 0h3"/></svg></span><h3>Inteligência artificial</h3></article>
      <article className="lp-benefits-tile"><span className="lp-benefits-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/></svg></span><h3>Estude de onde estiver</h3></article>
      <article className="lp-benefits-tile"><span className="lp-benefits-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6m19 7h-5a2 2 0 0 0 0 4h5"/><path d="M16 15h.01"/></svg></span><h3>Sem mensalidades</h3></article>
     </div>
     <div className="lp-benefits-guarantee"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2 3.5 6v6c0 5 3.5 8 8.5 10 5-2 8.5-5 8.5-10V6L12 2z"/><path d="m8 12 3 3 5-5"/></svg><strong>7 dias de garantia</strong><span>Compre com tranquilidade.</span></div>
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
