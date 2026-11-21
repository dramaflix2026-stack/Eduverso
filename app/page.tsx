import Image from "next/image";
import Link from "next/link";
import LandingSearch from "./landing-search";
import LandingPreview from "./landing-preview";
import "./landing.css";

const urlFor=(name:string)=>"/plataforma?disciplina="+encodeURIComponent(name);
const featured=[
 {name:"Matemática",slug:"matematica",description:"Raciocínio e resolução de problemas"},
 {name:"Português",slug:"portugues",description:"Leitura, escrita e interpretação"},
 {name:"Biologia",slug:"biologia",description:"A ciência da vida e dos seres vivos"},
 {name:"História",slug:"historia",description:"O passado que explica o presente"},
 {name:"ENEM e Vestibulares",slug:"enem-e-vestibulares",description:"Preparação com direção e prática"},
 {name:"Anatomia",slug:"anatomia",description:"O corpo humano em detalhes"}
];
const paths=[
 {title:"Estudos escolares",detail:"Matérias organizadas por etapa, do 1º ano ao Ensino Médio.",glyph:"▤",links:[
  {text:"Ensino Fundamental",href:urlFor("Ensino Fundamental")},
  {text:"Ensino Médio",href:urlFor("Ensino Médio")}
 ]},
 {title:"Preparação e carreiras",detail:"Trilhas para exames, vestibulares e concursos.",glyph:"◎",links:[
  {text:"ENEM e vestibulares",href:urlFor("ENEM e Vestibulares")},
  {text:"Concursos",href:"/plataforma?disciplina=Minha%20Prepara%C3%A7%C3%A3o&categoria=concursos"}
 ]},
 {title:"Medicina",detail:"Estudo da graduação, vestibular médico e exames profissionais.",glyph:"✚",links:[
  {text:"Vestibular de Medicina",href:"/plataforma?disciplina=Medicina&area=vestibular"},
  {text:"Faculdade de Medicina",href:"/plataforma?disciplina=Medicina&area=faculdade"},
  {text:"Revalida e residência",href:"/plataforma?disciplina=Medicina&area=exames"}
 ]}
];
const steps=[
 {n:"01",glyph:"◎",title:"Escolha seu universo",description:"Encontre a área que combina com seu momento."},
 {n:"02",glyph:"✧",title:"Entre em uma trilha",description:"Estude com aulas, exemplos e atividades."},
 {n:"03",glyph:"↗",title:"Evolua no seu ritmo",description:"Pratique, revise e acompanhe seu progresso."}
];
const benefits=[
 {glyph:"✎",title:"Questões com correção comentada",description:"Estude o conteúdo, responda às questões e entenda a explicação depois de praticar."},
 {glyph:"◉",title:"Atlas anatômico interativo",description:"Explore ossos, pratique identificação visual e responda aos flashcards digitando."},
 {glyph:"▤",title:"Provas anteriores do ENEM",description:"Consulte cadernos e gabaritos oficiais para se familiarizar com o exame."},
 {glyph:"↗",title:"Retome seus estudos",description:"Volte à última disciplina acessada na sua conta, sem precisar começar do zero."}
];

export default function Landing(){
 return <div className="edu-lp">
  <header className="lp-header">
   <Link href="/" className="lp-logo" aria-label="Eduverso, página inicial"><span aria-hidden="true">✦</span><strong>Eduverso<span className="lp-dot">.</span></strong></Link>
   <nav className="lp-nav" aria-label="Navegação principal"><a href="#caminhos">Caminhos</a><a href="#demonstracao">Veja por dentro</a><a href="#disciplinas">Disciplinas</a></nav>
   <div className="lp-actions"><Link href="/entrar" className="lp-login">Entrar</Link><Link href="/cadastro" className="lp-button lp-button-small">Criar conta</Link></div>
  </header>
  <main>
   <section className="lp-hero">
    <div className="lp-hero-copy">
     <span className="lp-eyebrow"><span className="lp-glint" aria-hidden="true"/> O SEU UNIVERSO DE APRENDIZADO</span>
     <h1>Aprender pode ser <em>extraordinário.</em></h1>
     <p>O Eduverso reúne disciplinas, trilhas e prática em um só lugar, para você aprender com clareza e avançar no seu ritmo.</p>
     <div className="lp-hero-actions">
      <Link href="/cadastro" className="lp-button">Criar minha conta <span aria-hidden="true">↗</span></Link>
      <a href="#demonstracao" className="lp-outline">Ver demonstração <span aria-hidden="true">→</span></a>
     </div>
    </div>
    <div className="lp-hero-visual">
     <div className="lp-hero-halo" aria-hidden="true"/>
     <div className="lp-visual-frame">
      <Image src="/images/hero-eduverso/home-desktop.png" alt="Ilustração roxa de livros e elementos do universo do conhecimento" fill priority sizes="(max-width: 860px) 92vw, 47vw"/>
     </div>
     <span className="lp-visual-chip lp-visual-chip-a" aria-hidden="true">✦ Conhecimento</span>
     <span className="lp-visual-chip lp-visual-chip-b" aria-hidden="true">↗ Novas descobertas</span>
    </div>
   </section>
   <div className="lp-stats" aria-label="Destaques da plataforma">
    <div><span className="lp-stat-icon" aria-hidden="true">▤</span><span><strong>11</strong><small>áreas de conhecimento</small></span></div>
    <div><span className="lp-stat-icon" aria-hidden="true">⌁</span><span><strong>+40</strong><small>trilhas de aprendizagem</small></span></div>
    <div><span className="lp-stat-icon" aria-hidden="true">▯</span><span><strong>Estude onde quiser</strong><small>no computador ou celular</small></span></div>
   </div>
   <section id="caminhos" className="lp-section lp-paths">
    <div className="lp-title"><span className="lp-eyebrow">COMECE POR AQUI</span><h2>Escolha seu <em>caminho.</em></h2><p>Encontre o que mais combina com o seu momento.</p></div>
    <div className="lp-path-grid">{paths.map(p=><article className="lp-path-card lp-path-v2" key={p.title}>
     <div className="lp-path-header"><span className="lp-path-icon" aria-hidden="true">{p.glyph}</span><h3>{p.title}</h3><p>{p.detail}</p></div>
     <nav className="lp-path-options" aria-label={"Acessos de "+p.title}>
      {p.links.map(link=><Link key={link.text} href={link.href}>{link.text}<span aria-hidden="true">↗</span></Link>)}
     </nav>
    </article>)}</div>
   </section>
   <section id="demonstracao" className="lp-section lp-demo-section">
    <div className="lp-title lp-demo-title"><span className="lp-eyebrow">VEJA O PRODUTO FUNCIONANDO</span><h2>Conheça o Eduverso <em>por dentro.</em></h2><p>Explore uma tela real da plataforma: aulas com atividades, atlas anatômico e provas do ENEM.</p></div>
    <LandingPreview/>
   </section>
   <section id="buscar" className="lp-section lp-search-section">
    <div className="lp-title"><span className="lp-eyebrow">ENCONTRE O QUE PRECISA</span><h2>O que você quer <em>estudar hoje?</em></h2></div>
    <LandingSearch/>
   </section>
   <section id="disciplinas" className="lp-section lp-featured">
    <div className="lp-subject-heading"><div className="lp-title"><span className="lp-eyebrow">EXPLORE MAIS</span><h2>Disciplinas <em>em destaque.</em></h2><p>Uma amostra dos conhecimentos que você pode explorar.</p></div><Link href="/plataforma" className="lp-text-link">Ver a plataforma <span aria-hidden="true">↗</span></Link></div>
    <div className="lp-subject-grid">{featured.map(s=><Link key={s.slug} href={urlFor(s.name)} className="lp-subject-card">
     <Image src={"/images/home/"+s.slug+".webp"} alt="" fill sizes="(max-width: 760px) 45vw, (max-width: 1100px) 45vw, 37vw"/>
     <span className="lp-subject-shade" aria-hidden="true"/>
     <span className="lp-subject-info"><strong>{s.name}</strong><small>{s.description}</small></span>
     <span className="lp-subject-arrow" aria-hidden="true">↗</span>
    </Link>)}</div>
   </section>
   <section id="como-funciona" className="lp-section lp-process">
    <div className="lp-title"><span className="lp-eyebrow">SIMPLES DESDE O PRIMEIRO PASSO</span><h2>Como <em>funciona.</em></h2><p>Em poucos passos, você começa a aprender.</p></div>
    <div className="lp-process-grid">{steps.map(s=><article key={s.n}><span className="lp-step">{s.n}</span><span className="lp-step-icon" aria-hidden="true">{s.glyph}</span><h3>{s.title}</h3><p>{s.description}</p></article>)}</div>
   </section>
   <section id="beneficios" className="lp-section lp-benefits">
    <div className="lp-title"><span className="lp-eyebrow">UMA EXPERIÊNCIA FEITA PARA VOCÊ</span><h2>Recursos que fazem <em>diferença.</em></h2><p>Funcionalidades que você pode experimentar na plataforma — não apenas promessas.</p></div>
    <div className="lp-benefit-list">{benefits.map(s=><article key={s.title}><span className="lp-benefit-icon" aria-hidden="true">{s.glyph}</span><div><h3>{s.title}</h3><p>{s.description}</p></div></article>)}</div>
   </section>
   <section className="lp-final">
    <span className="lp-eyebrow">SUA JORNADA COMEÇA AQUI</span>
    <h2>Existe um universo inteiro esperando por <em>você.</em></h2>
    <p>Conheça as ferramentas e escolha como deseja começar.</p>
    <div className="lp-final-actions"><Link href="/cadastro" className="lp-button">Criar minha conta <span aria-hidden="true">↗</span></Link><a href="#demonstracao" className="lp-outline">Ver demonstração <span aria-hidden="true">→</span></a></div>
    <small className="lp-cta-note">Criar conta não libera automaticamente o conteúdo pago. O acesso completo depende da compra confirmada.</small>
   </section>
  </main>
  <footer className="lp-footer">
   <Link href="/" className="lp-logo"><span aria-hidden="true">✦</span><strong>Eduverso<span className="lp-dot">.</span></strong></Link>
   <p>Seu universo de aprendizado.</p>
   <nav aria-label="Links do rodapé"><a href="#caminhos">Caminhos</a><a href="#demonstracao">Demonstração</a><a href="#disciplinas">Disciplinas</a><Link href="/entrar">Entrar</Link></nav>
   <small>© {new Date().getFullYear()} Eduverso</small>
  </footer>
 </div>
}
