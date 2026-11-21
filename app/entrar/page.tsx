"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent,useState} from "react";
import "../auth.css";
export default function Entrar(){
 const router=useRouter();
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [error,setError]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setError("");setNotice("");
  try{
   const response=await fetch("/api/auth/entrar",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({email,password})});
   const data=await response.json();
   if(!response.ok){setError(typeof data.error==="string"?data.error:"Não foi possível entrar.");return;}
   router.push("/plataforma");
   router.refresh();
  }catch{setError("Não foi possível conectar ao servidor. Tente novamente.");}
  finally{setBusy(false);}
 }
 return <main className="auth-shell"><section className="auth-panel">
  <Link href="/" className="auth-logo">✦ Eduverso<span>.</span></Link>
  <div className="auth-tag">BEM-VINDO DE VOLTA</div><h1>Entre no seu universo.</h1>
  <p>Use o e-mail e a senha já cadastrados para acompanhar seu aprendizado. Se esse endereço já foi utilizado anteriormente, não é necessário criar outra conta.</p>
  <form onSubmit={submit}>
   <label htmlFor="email">E-mail</label>
   <input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required autoComplete="email" placeholder="seu@email.com" maxLength={254}/>
   <label htmlFor="password">Senha</label>
   <input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required autoComplete="current-password" placeholder="Sua senha"/>
   <button type="submit" disabled={busy}>{busy?"Entrando...":"Entrar na plataforma →"}</button>
   {error&&<div className="auth-notice auth-error" role="alert">{error}</div>}
   {notice&&<div className="auth-notice" role="status">{notice}</div>}
  </form>
  <div className="auth-footer">Ainda não tem conta? <Link href="/cadastro">Cadastre-se</Link></div>
  <Link className="auth-explore" href="/plataforma">Explorar a versão de demonstração ↗</Link>
 </section></main>
}
