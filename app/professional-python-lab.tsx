"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import styles from "./professional-python-lab.module.css";

type WorkerPayload={nonce?:string;type?:"ready"|"result"|"error";output?:string;job?:number};
type Props={initialCode:string;chapter:number};
const PYODIDE_URL="https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";
const MAX_CODE=4000;
const MAX_OUTPUT=8000;

/** O código Python é executado em Worker dentro de iframe com origem opaca. */
export default function ProfessionalPythonLab({initialCode,chapter}:Props){
 const [code,setCode]=useState(initialCode);
 const [generation,setGeneration]=useState(0);
 const [status,setStatus]=useState<"loading"|"ready"|"failed">("loading");
 const [running,setRunning]=useState(false);
 const [output,setOutput]=useState("O resultado da execução aparecerá aqui.");
 const iframe=useRef<HTMLIFrameElement|null>(null);
 const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
 const job=useRef(0);
 const nonce=useRef("py-"+Math.random().toString(36).slice(2)+Date.now().toString(36));

 const frameHtml=useMemo(()=>{
  const workerSource=[
   "const indexURL="+JSON.stringify(PYODIDE_URL)+";",
   "let pyodide; let stdoutBuffer=[];",
   "function capture(text){ const current=stdoutBuffer.join('\\n'); if(current.length<8000)stdoutBuffer.push(String(text).slice(0,8000-current.length)); }",
   "(async()=>{try{importScripts(indexURL+'pyodide.js');pyodide=await loadPyodide({indexURL});self.postMessage({type:'ready'});}catch(err){self.postMessage({type:'error',output:'Não foi possível carregar o ambiente Python. Confira a conexão e reinicie.'});}})();",
   "self.addEventListener('message',async event=>{",
   " if(event.data?.type!=='run'||!pyodide)return;",
   " const {job,code}=event.data; stdoutBuffer=[];",
   " try {",
   "  pyodide.setStdout({batched:capture});pyodide.setStderr({batched:capture});",
   "  const value=await pyodide.runPythonAsync(code);",
   "  if(value!==undefined&&value!==null&&stdoutBuffer.length===0)capture(String(value));",
   "  self.postMessage({type:'result',job,output:stdoutBuffer.join('\\n')||'Execução concluída sem saída. Use print(...) para exibir o resultado.'});",
   " }catch(err){self.postMessage({type:'result',job,output:'Erro na execução:\\n'+String(err?.message||err).slice(0,8000)});}",
   "});"
  ].join("\n");
  const bootstrap=[
   "const nonce="+JSON.stringify(nonce.current)+";",
   "const source="+JSON.stringify(workerSource).replace(/</g,"\\u003c")+";",
   "const url=URL.createObjectURL(new Blob([source],{type:'application/javascript'}));",
   "let worker;",
   "try {",
   " worker=new Worker(url);",
   " worker.addEventListener('message',event=>{const d=event.data||{};parent.postMessage({nonce,type:d.type,output:String(d.output||'').slice(0,8000),job:d.job},'*');});",
   " worker.addEventListener('error',()=>parent.postMessage({nonce,type:'error',output:'Falha ao iniciar o ambiente Python.'},'*'));",
   "}catch{parent.postMessage({nonce,type:'error',output:'O navegador não permitiu criar o ambiente isolado.'},'*');}",
   "URL.revokeObjectURL(url);",
   "addEventListener('message',event=>{",
   " if(event.source!==parent||event.data?.nonce!==nonce)return;",
   " if(event.data.type==='run')worker?.postMessage({type:'run',job:event.data.job,code:String(event.data.code||'').slice(0,4000)});",
   " else if(event.data.type==='terminate'){worker?.terminate();worker=null;}",
   "});"
  ].join("\n");
  return "<!doctype html><html lang='pt-BR'><head><meta charset='utf-8'></head><body><script>"+bootstrap+"</script></body></html>";
 },[generation]);

 useEffect(()=>{
  const onMessage=(event:MessageEvent)=>{
   if(event.source!==iframe.current?.contentWindow||!event.data||typeof event.data!=="object")return;
   const payload=event.data as WorkerPayload;
   if(payload.nonce!==nonce.current)return;
   if(payload.type==="ready"){setStatus("ready");return;}
   if(payload.type==="error"){
    if(timeout.current){clearTimeout(timeout.current);timeout.current=null;}
    setRunning(false);setStatus("failed");setOutput(payload.output||"O laboratório não conseguiu carregar.");return;
   }
   if(payload.type==="result"&&payload.job===job.current){
    if(timeout.current){clearTimeout(timeout.current);timeout.current=null;}
    setRunning(false);setOutput((payload.output||"Sem saída.").slice(0,MAX_OUTPUT));
   }
  };
  window.addEventListener("message",onMessage);
  return()=>{window.removeEventListener("message",onMessage);if(timeout.current){clearTimeout(timeout.current);timeout.current=null;}};
 },[generation]);

 function execute(){
  if(status!=="ready"||running)return;
  if(!code.trim()){setOutput("Escreva um código Python antes de executar.");return;}
  if(code.length>MAX_CODE){setOutput("O código ultrapassa o limite de 4.000 caracteres.");return;}
  const id=++job.current;
  setRunning(true);setOutput("Executando em ambiente isolado...");
  iframe.current?.contentWindow?.postMessage({nonce:nonce.current,type:"run",job:id,code},"*");
  timeout.current=setTimeout(()=>{
   if(job.current!==id)return;
   iframe.current?.contentWindow?.postMessage({nonce:nonce.current,type:"terminate"},"*");
   setRunning(false);setStatus("failed");
   setOutput("A execução excedeu 8 segundos e foi interrompida. Revise o código e reinicie o ambiente.");
  },8000);
 }
 function resetEnvironment(){
  if(timeout.current){clearTimeout(timeout.current);timeout.current=null;}
  ++job.current;setStatus("loading");setRunning(false);
  setOutput("Carregando novo ambiente Python...");setGeneration(g=>g+1);
 }
 return <section className={styles.root} aria-label="Laboratório interativo de Python">
  <div className={styles.heading}>
   <div><span className={styles.eyebrow}>LABORATÓRIO INTERATIVO · CAPÍTULO {chapter}</span><h3>Execute seu próprio Python</h3><p>Altere o exemplo e veja a saída real. Tudo roda isoladamente no navegador, sem enviar o código ao servidor Eduverso.</p></div>
   <span className={status==="ready"?styles.ready:styles.state} role="status">{status==="ready"?"● Ambiente pronto":status==="loading"?"◌ Carregando Python":"● Reinicialização necessária"}</span>
  </div>
  <label htmlFor={"eduverso-python-code-"+chapter} className={styles.label}>Editor de código</label>
  <textarea id={"eduverso-python-code-"+chapter} value={code} onChange={event=>setCode(event.target.value.slice(0,MAX_CODE))} spellCheck={false} className={styles.editor} rows={Math.min(17,Math.max(7,code.split("\n").length+2))} aria-describedby={"eduverso-python-help-"+chapter}/>
  <div className={styles.actions}>
   <button type="button" className={styles.run} disabled={status!=="ready"||running} onClick={execute}>{running?"Executando...":"▶ Executar Python"}</button>
   <button type="button" className={styles.secondary} onClick={()=>{setCode(initialCode);setOutput("Código original restaurado. Execute novamente para ver a saída.");}}>Restaurar exemplo</button>
   <button type="button" className={styles.secondary} onClick={resetEnvironment}>Reiniciar ambiente</button>
  </div>
  <p id={"eduverso-python-help-"+chapter} className={styles.help}>Limite: 4.000 caracteres e 8 segundos por execução. É necessária conexão para carregar o Python na primeira utilização.</p>
  <div className={styles.console} aria-live="polite"><strong>Saída do programa</strong><pre>{output}</pre></div>
  <iframe title="Execução isolada de Python" ref={iframe} key={generation} sandbox="allow-scripts" srcDoc={frameHtml} className={styles.isolatedFrame} tabIndex={-1} aria-hidden="true"/>
 </section>;
}
