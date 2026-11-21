"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent,useState} from "react";
import "../auth.css";
export default function Cadastro(){
 const router=useRouter();
 const [name,setName]=useState("");const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");const [confirm,setConfirm]=useState("");
 const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [notice,setNotice]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setError("");setNotice("");
  if(password!==confirm){setError("As senhas não conferem.");return;}
  setBusy(true);
  try{
   const response=await fetch("/api/auth/registrar",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({name,email,password,confirm})});
   const data=await response.json();
   if(!response.ok){setError(typeof data.error==="string"?data.error:"Não foi possível concluir o cadastro.");return;}
   if(data.authenticated){router.push("/plataforma");router.refresh();return;}
   setNotice(data.message||"Confira sua caixa de entrada para confirmar seu e-mail.");
   setPassword("");setConfirm("");
  }catch{setError("Não foi possível conectar ao servidor. Tente novamente.");}
  finally{setBusy(false);}
 }
 return <main className="auth-shell"><section className="auth-panel">
  <Link href="/" className="auth-logo">✦ Eduverso<span>.</span></Link>
  <div className="auth-tag">COMECE SUA JORNADA</div><h1>Seu próximo capítulo começa aqui.</h1>
  <p>Crie sua conta para identificar seu perfil e guardar seu histórico de estudos. A liberação definitiva do conteúdo pago depende da confirmação da compra.</p>
  <form onSubmit={submit}>
   <label htmlFor="name">Nome completo</label><input id="name" value={name} onChange={e=>setName(e.target.value)} type="text" minLength={2} maxLength={120} required autoComplete="name" placeholder="Nome e sobrenome"/>
   <label htmlFor="email">E-mail usado na compra</label><input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email" maxLength={254} required autoComplete="email" placeholder="seu@email.com"/>
   <label htmlFor="password">Senha</label><input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength={8} required autoComplete="new-password" placeholder="Mínimo de 8 caracteres"/>
   <label htmlFor="confirm">Confirmar senha</label><input id="confirm" value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" minLength={8} required autoComplete="new-password" placeholder="Repita sua senha"/>
   <button type="submit" disabled={busy}>{busy?"Criando conta...":"Criar minha conta →"}</button>
   {error&&<div role="alert" className="auth-notice auth-error">{error}</div>}
   {notice&&<div role="status" className="auth-notice auth-success">{notice} <Link href="/entrar">Ir para o login</Link></div>}
  </form>
  <div className="auth-footer">Já tem uma conta? <Link href="/entrar">Entrar</Link></div>
  <Link className="auth-explore" href="/plataforma">Conhecer a demonstração ↗</Link>
 </section></main>
}
