import Image from "next/image";
import Link from "next/link";
import LandingSearch from "./landing-search";
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
 {title:"Estudos escolares",detail:"Ensino Fundamental e Médio, com matérias organizadas por etapa.",glyph:"▤",href:urlFor("Ensino Fundamental"),extra:{text:"Ensino Médio",href:urlFor("Ensino Médio")}},
 {title:"Preparação e carreiras",detail:"ENEM, vestibulares e concursos em trilhas direcionadas.",glyph:"◎",href:urlFor("ENEM e Vestibulares"),extra:{text:"Concursos",href:"/plataforma?disciplina=Minha%20Prepara%C3%A7%C3%A3o&categoria=concursos"}},
 {title:"Medicina",detail:"Do vestibular à graduação, com atlas e revisão anatômica.",glyph:"✚",href:"/plataforma?disciplina=Medicina&area=faculdade",extra:{text:"Vestibular de Medicina",href:"/plataforma?disciplina=Medicina&area=vestibular"}}
];
const steps=[
 {n:"01",glyph:"◎",title:"Escolha seu universo",description:"Encontre a área que combina com seu momento."},
 {n:"02",glyph:"✧",title:"Entre em uma trilha",description:"Estude com aulas, exemplos e atividades."},
 {n:"03",glyph:"↗",title:"Evolua no seu ritmo",description:"Pratique, revise e acompanhe seu progresso."}
];
const benefits=[
 {glyph:"✦",title:"Conteúdo organizado",description:"Disciplinas, assuntos e aulas em uma navegação intuitiva."},
 {glyph:"◎",title:"Aprendizado com prática",description:"Exemplos, perguntas e correção para consolidar conceitos."},
 {glyph:"↗",title:"Explore onde estiver",description:"Uma experiência adaptada ao computador e ao celular."}
];

export default function Landing(){
 return <div className="edu-lp">
  <header className="lp-header">
   <Link href="/" className="lp-logo" aria-label="Eduverso, página inicial"><span aria-hidden="true">✦</span><strong>Eduverso<span className="lp-dot">.</span></strong></Link>
   <nav className="lp-nav" aria-label="Navegação principal"><a href="#caminhos">Caminhos</a><a href="#disciplinas">Disciplinas</a><a href="#como-funciona">Como funciona</a></nav>
   <div className="lp-actions"><Link href="/entrar" className="lp-login">Entrar</Link><Link href="/cadastro" className="lp-button lp-button-small">Criar conta</Link></div>
  </header>
  <main>
   <section className="lp-hero">
    <div className="lp-hero-copy">
     <span className="lp-eyebrow"><span className="lp-glint" aria-hidden="true"/> O SEU UNIVERSO DE APRENDIZADO</span>
     <h1>Aprender pode ser <em>extraordinário.</em></h1>
     <p>O Eduverso reúne disciplinas, trilhas e prática em um só lugar, para você aprender com clareza e avançar no seu ritmo.</p>
     <div className="lp-hero-actions">
      <Link href="/cadastro" className="lp-button">Começar minha jornada <span aria-hidden="true">↗</span></Link>
      <Link href="/plataforma" className="lp-outline">Explorar a plataforma <span aria-hidden="true">→</span></Link>
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
    <div className="lp-path-grid">{paths.map(p=><article className="lp-path-card" key={p.title}>
     <Link href={p.href} className="lp-path-primary" aria-label={"Explorar "+p.title}>
      <span className="lp-path-icon" aria-hidden="true">{p.glyph}</span><span className="lp-path-arrow" aria-hidden="true">↗</span>
      <strong>{p.title}</strong><span className="lp-path-description">{p.detail}</span>
     </Link>
     <Link className="lp-path-extra" href={p.extra.href}>{p.extra.text} <span aria-hidden="true">→</span></Link>
    </article>)}</div>
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
    <div className="lp-title"><span className="lp-eyebrow">UMA EXPERIÊNCIA FEITA PARA VOCÊ</span><h2>Por que estudar no <em>Eduverso?</em></h2><p>Organização, prática e liberdade para descobrir mais.</p></div>
    <div className="lp-benefit-list">{benefits.map(s=><article key={s.title}><span className="lp-benefit-icon" aria-hidden="true">{s.glyph}</span><div><h3>{s.title}</h3><p>{s.description}</p></div></article>)}</div>
   </section>
   <section className="lp-final">
    <span className="lp-eyebrow">SUA JORNADA COMEÇA AQUI</span>
    <h2>Existe um universo inteiro esperando por <em>você.</em></h2>
    <p>Escolha o que aprender hoje. O próximo passo é seu.</p>
    <div className="lp-final-actions"><Link href="/cadastro" className="lp-button">Criar minha conta <span aria-hidden="true">↗</span></Link><Link href="/plataforma" className="lp-outline">Ver a plataforma <span aria-hidden="true">→</span></Link></div>
   </section>
  </main>
  <footer className="lp-footer">
   <Link href="/" className="lp-logo"><span aria-hidden="true">✦</span><strong>Eduverso<span className="lp-dot">.</span></strong></Link>
   <p>Seu universo de aprendizado.</p>
   <nav aria-label="Links do rodapé"><a href="#caminhos">Caminhos</a><a href="#disciplinas">Disciplinas</a><a href="#como-funciona">Sobre</a><Link href="/entrar">Entrar</Link></nav>
   <small>© {new Date().getFullYear()} Eduverso</small>
  </footer>
 </div>
}
