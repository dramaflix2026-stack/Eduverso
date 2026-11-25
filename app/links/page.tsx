import type { Metadata } from "next";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Links oficiais | Eduverso",
  description: "Acesse o Eduverso Universitário, Eduverso Professor e Atlas Anatomia Premium.",
  alternates: { canonical: "https://eduversoai.com.br/links" },
};

const links = [
  { title: "Checkout Universitário", description: "Transforme sua rotina de estudos", href: "https://pay.kiwify.com.br/pE7Jcf1", icon: "student" },
  { title: "Checkout Professor", description: "Mais possibilidades para ensinar", href: "https://pay.kiwify.com.br/htmdQJL", icon: "teacher" },
  { title: "Atlas Anatomia Premium", description: "Explore a anatomia de forma interativa", href: "/atlas-premium", icon: "atlas" },
] as const;

function LinkIcon({ kind }: { kind: typeof links[number]["icon"] }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === "student" ? <><path d="m2 9 10-5 10 5-10 5-10-5ZM6 11v6c4 3 8 3 12 0v-6M22 9v7"/></> : kind === "teacher" ? <><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M12 16v5m-5 0h10M8 8h8m-8 4h5"/></> : <path d="M16.8 3.2a3 3 0 0 1 4 4 3 3 0 0 1-3.2 4.3l-6.1 6.1a3 3 0 0 1-4.3 3.2 3 3 0 0 1-4-4 3 3 0 0 1 3.2-4.3l6.1-6.1a3 3 0 0 1 4.3-3.2Z"/>}
  </svg>;
}

export default function OfficialLinks() {
  return <main className={styles.page}>
    <div className={styles.content}>
      <header className={styles.header}>
        <span className={styles.mark} aria-hidden="true"><img src="/icon.svg" alt="" width="54" height="54"/></span>
        <h1>Eduverso<span> AI</span></h1>
        <p>Seu universo de estudos com inteligência artificial.</p>
      </header>
      <nav className={styles.links} aria-label="Links oficiais do Eduverso"><p className={styles.navLabel}>ESCOLHA SUA EXPERIÊNCIA</p>
        {links.map(item => <a className={styles.link+(item.icon==="atlas"?" "+styles.featured:"")} href={item.href} key={item.icon}>
          <span className={styles.icon}><LinkIcon kind={item.icon}/></span>
          <span className={styles.copy}><strong>{item.title}</strong><small>{item.description}</small>{item.icon==="atlas"&&<span className={styles.tag}>Laboratório interativo</span>}</span>
          <svg className={styles.arrow} aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>)}
      </nav>
      <footer className={styles.footer}><p>Aprenda. Evolua. Transforme.</p><small>© 2026 Eduverso AI</small></footer>
    </div>
  </main>;
}
