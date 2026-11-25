import ClarityTracking from "./clarity-tracking";
import LandingPreview from "./landing-preview";
import LandingDemoCarousel from "./landing-demo-carousel";
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
    <a href="/" className="lp-logo" aria-label="Eduverso — início"><span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong></a>
    <nav className="lp-nav" aria-label="Navegação principal">
     <a href="#produto">Conheça por dentro</a><a href="#planos">Planos</a><a href="/blog">Blog</a><a href="/ferramentas">Ferramentas grátis</a>
    </nav>
    <div className="lp-header-actions"><a href="/entrar" className="lp-login">Entrar</a><a href="/cadastro" className="lp-button lp-button-small">Criar conta <span aria-hidden="true">↗</span></a></div>
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
      <a href="#demonstracao" className="lp-outline lp-button-large">Testar uma questão grátis <span aria-hidden="true">→</span></a>
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

   <section id="produto" className="lp-section lp-container lp-product lp-product-gallery">
    <div className="lp-section-heading lp-centered">
     <span className="lp-eyebrow">CONHEÇA ANTES DE COMEÇAR</span>
     <h2>Veja o Eduverso <em>em ação.</em></h2>
     <p>Explore as ferramentas que podem transformar sua rotina de estudos.</p>
    </div>
    <LandingDemoCarousel><LandingPreview/></LandingDemoCarousel>
   </section>

   <LandingPricing/>

   

   <section aria-label="Garantia de 7 dias" style={{padding:"24px 0",background:"#0b0915"}}>
    <div style={{position:"relative",width:"100%",maxWidth:720,margin:"0 auto"}}>
     <img src="/images/file_00000000a324820ea37a2b187162972a.webp" alt="Sua escolha tem 7 dias de garantia. Se mudar de ideia, solicite o cancelamento e o reembolso em até 7 dias após a compra pelos canais informados na contratação. Válida para compras realizadas. O cadastro não gera cobrança." style={{display:"block",width:"100%",height:"auto"}} loading="lazy" decoding="async"/>
     <a href="#planos" aria-label="Conhecer os planos" style={{position:"absolute",left:"15%",top:"74%",width:"70%",height:"9%",borderRadius:40}}/>
    </div>
   </section>
  </main>

  <footer className="lp-footer lp-footer-redesign">
   <div className="lp-footer-highlight" aria-hidden="true"/>
   <div className="lp-container lp-footer-newtop">
    <div className="lp-footer-newbrand">
     <a href="/" className="lp-logo" aria-label="Eduverso — início">
      <span className="lp-mark" aria-hidden="true">✦</span><strong>Eduverso<span>.</span></strong>
     </a>
     <h2>Seu universo de <em>possibilidades.</em></h2>
     <p>Explore o conhecimento, encontre seu ritmo e siga aprendendo. Tudo em um só lugar.</p>
     
     <div className="lp-footer-contact">
      <span className="lp-footer-contact-label">ACOMPANHE O EDUVERSO</span>
      <a className="lp-footer-instagram" href="https://www.instagram.com/eduverso.ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram do Eduverso, @eduverso.ai (abre em nova aba)"><span className="lp-footer-instagram-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span><span><strong>@eduverso.ai</strong><small>Siga nosso Instagram</small></span><span className="lp-contact-arrow" aria-hidden="true">↗</span></a>
      <a className="lp-footer-whatsapp" href="https://wa.me/5511984216363?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20Eduverso." target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.669.149-.198.297-.767.967-.94 1.165-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.004 0a11.9 11.9 0 0 0-10.29 17.89L0 24l6.29-1.65a11.9 11.9 0 0 0 5.71 1.46h.005C18.58 23.81 24 18.47 24 11.9c0-3.18-1.24-6.17-3.49-8.42A11.86 11.86 0 0 0 12.004 0zm0 21.79a9.87 9.87 0 0 1-5.034-1.38l-.36-.214-3.73.98.996-3.638-.235-.373a9.88 9.88 0 0 1-1.52-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9z"/></svg><span>Fale conosco pelo WhatsApp</span><span aria-hidden="true">↗</span></a>
     </div>
    </div>
    <div className="lp-footer-newlinks">
     <nav className="lp-footer-newcol" aria-label="Conhecer o Eduverso">
      <h3>Descubra</h3>
      <a href="#produto">Como é a plataforma</a>
      <a href="#planos">Planos e preços</a>
      <a href="/plataforma">Demonstração</a>
      <a href="/blog">Blog educacional</a>
      <a href="/ferramentas">Ferramentas gratuitas</a>
     </nav>
     <nav className="lp-footer-newcol" aria-label="Sua conta no Eduverso">
      <h3>Sua conta</h3>
      <a href="/cadastro">Criar conta</a>
      <a href="/entrar">Fazer login</a>
      <a href="/plataforma">Área de estudos</a>
     </nav>
    </div>
   </div>
   <div className="lp-container eduverso-privacy-footer"><MetaPixelTracking/><ClarityTracking/></div>
   <div className="lp-container lp-footer-newbottom">
    <div className="lp-footer-legal"><strong>CNPJ: 65.879.205/0001-34</strong><small>© {new Date().getFullYear()} Eduverso · Todos os direitos reservados.</small></div>
    <span>Aprender abre novos caminhos.</span>
    <a href="#topo">Voltar ao topo <span aria-hidden="true">↑</span></a>
   </div>
  </footer>
  <a className="lp-whatsapp-floating" href="https://wa.me/5511984216363?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20Eduverso." target="_blank" rel="noopener noreferrer" aria-label="Fale com o Eduverso pelo WhatsApp (abre em nova aba)" title="Fale conosco pelo WhatsApp"><span className="lp-whatsapp-floating-label">Fale conosco</span><span className="lp-whatsapp-floating-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.669.149-.198.297-.767.967-.94 1.165-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.004 0a11.9 11.9 0 0 0-10.29 17.89L0 24l6.29-1.65a11.9 11.9 0 0 0 5.71 1.46h.005C18.58 23.81 24 18.47 24 11.9c0-3.18-1.24-6.17-3.49-8.42A11.86 11.86 0 0 0 12.004 0zm0 21.79a9.87 9.87 0 0 1-5.034-1.38l-.36-.214-3.73.98.996-3.638-.235-.373a9.88 9.88 0 0 1-1.52-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9z"/></svg></span></a>
 </div>;
}
