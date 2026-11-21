import Link from "next/link";
import "../auth.css";
export default function AcessoPendente(){
 return <main className="auth-shell"><section className="auth-panel">
 <Link href="/" className="auth-logo">✦ Eduverso<span>.</span></Link>
 <div className="auth-tag">ACESSO EM CONFERÊNCIA</div>
 <h1>Sua conta está conectada.</h1>
 <p>O acesso completo depende de uma compra aprovada na Kiwify e de um e-mail confirmado. Use no cadastro o mesmo e-mail informado na compra.</p>
 <div className="auth-notice">Se você acabou de comprar, a autorização pode depender do recebimento da confirmação do pagamento.</div>
 <Link className="auth-explore" href="/entrar">Verificar meu login ↗</Link>
 </section></main>;
}
