"use client";
import {useEffect,useRef,useState} from "react";
import type {PDFDocumentProxy, PDFDocumentLoadingTask, RenderTask} from "pdfjs-dist";
import styles from "./enem-past-papers.module.css";

type Props={src:string;officialUrl:string;title:string;sourceLabel?:string};
export default function EnemPdfViewer({src,officialUrl,title,sourceLabel="Fonte original do Inep"}:Props){
 const [mode,setMode]=useState<"embedded"|"pages"|"alternate">("embedded");
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const frameRef=useRef<HTMLDivElement>(null);
 const [doc,setDoc]=useState<PDFDocumentProxy|null>(null);
 const [numPages,setNumPages]=useState(0);
 const [page,setPage]=useState(1);
 const [width,setWidth]=useState(720);
 const [loading,setLoading]=useState(true);
 const [rendering,setRendering]=useState(false);
 const [error,setError]=useState<string|null>(null);
 const [retry,setRetry]=useState(0);
 useEffect(()=>{
  const node=frameRef.current;
  if(!node)return;
  const setSize=()=>setWidth(node.clientWidth-20);
  setSize();
  const observer=new ResizeObserver(setSize);
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  let cancelled=false;
  let task:PDFDocumentLoadingTask|undefined;
  setLoading(true);setError(null);setNumPages(0);setDoc(null);setPage(1);
  if(mode!=="pages"){setLoading(false);return;}
  (async()=>{
   const pdfjs=await import("pdfjs-dist/legacy/build/pdf.mjs");
   if(cancelled)return;
   pdfjs.GlobalWorkerOptions.workerSrc="/api/enem/worker";
   task=pdfjs.getDocument({url:src,withCredentials:false,disableAutoFetch:true,disableRange:true,disableStream:true});
   const document=await task.promise;
   if(cancelled){void document.destroy();return;}
   setDoc(document);setNumPages(document.numPages);setLoading(false);
  })().catch(()=>{
   if(!cancelled){setLoading(false);setError("Não foi possível carregar este PDF pelo servidor. Use o modo de leitura integrada ou a visualização alternativa.");}
  });
  return()=>{
   cancelled=true;
   if(task)void task.destroy().catch(()=>{});
  };
 },[src,retry,mode]);
 useEffect(()=>{
  if(!doc)return;
  let cancelled=false;
  let renderingTask:RenderTask|undefined;
  setRendering(true);
  (async()=>{
   const pdfPage=await doc.getPage(page);
   if(cancelled)return;
   const canvas=canvasRef.current;
   const frame=frameRef.current;
   if(!canvas||!frame)return;
   const deviceScale=Math.max(1,Math.min(2,window.devicePixelRatio||1));
   const baseViewport=pdfPage.getViewport({scale:1});
   const frameWidth=Math.max(230,Math.min(920,width));
   const scale=frameWidth/baseViewport.width;
   const viewport=pdfPage.getViewport({scale:scale*deviceScale});
   canvas.width=Math.ceil(viewport.width);
   canvas.height=Math.ceil(viewport.height);
   canvas.style.width=Math.ceil(viewport.width/deviceScale)+"px";
   canvas.style.height=Math.ceil(viewport.height/deviceScale)+"px";
   const canvasContext=canvas.getContext("2d");
   if(!canvasContext)throw Error("canvas");
   renderingTask=pdfPage.render({canvasContext,viewport});
   await renderingTask.promise;
   if(!cancelled){setRendering(false);setError(null);}
  })().catch(err=>{
   if(!cancelled&&err?.name!=="RenderingCancelledException"){setRendering(false);setError("Não foi possível mostrar esta página. Use o modo de leitura integrada ou a visualização alternativa.");}
  });
  return()=>{
   cancelled=true;
   try{renderingTask?.cancel();}catch{}
  };
 },[doc,page,width]);
 return <div className={styles.viewer} aria-label={title}>
  <div className={styles.viewerTop}>
   <div><strong>Leitor de PDF · ENEM</strong><small>{title}</small></div>
   <span className={styles.officialBadge}>{sourceLabel}</span>
  </div>
  <div className={styles.readerActions}>
   <a href={officialUrl} target="_blank" rel="noopener noreferrer">↗ Abrir arquivo original</a>
   <a href={src} download={title.toLowerCase().replace(/[^a-z0-9]+/g,"-")+".pdf"}>↓ Baixar PDF</a>
  </div>
  <div className={styles.embeddedOptions} role="group" aria-label="Modo de leitura">
   <button type="button" className={mode==="embedded"?styles.activeReaderMode:""} onClick={()=>setMode("embedded")}>📖 Leitura integrada</button>
   <button type="button" className={mode==="alternate"?styles.activeReaderMode:""} onClick={()=>setMode("alternate")}>Visualização alternativa</button>
  </div>
  {mode!=="pages"&&<div className={styles.embeddedFrame}>
   <iframe title={title+" · leitor integrado"} loading="lazy"
    src={mode==="alternate"?"https://docs.google.com/gview?embedded=1&url="+encodeURIComponent(officialUrl):officialUrl+"#toolbar=1"}
    referrerPolicy="no-referrer" />
   <p>Se o PDF não aparecer neste navegador, use “Visualização alternativa” ou “Abrir arquivo original”. A visualização alternativa utiliza o Google Document Viewer.</p>
  </div>}
  {mode==="pages"&&numPages>0&&<div className={styles.pageBar} role="group" aria-label="Navegação pelas páginas">
   <button type="button" disabled={page<=1} onClick={()=>setPage(n=>Math.max(1,n-1))}>← Anterior</button>
   <span>Página <strong>{page}</strong> de {numPages}</span>
   <button type="button" disabled={page>=numPages} onClick={()=>setPage(n=>Math.min(numPages,n+1))}>Próxima →</button>
  </div>}
  <div className={styles.viewerFrame} ref={frameRef} style={mode==="pages"?undefined:{display:"none"}}>
   {(loading||rendering)&&!error&&<div className={styles.loader} role="status">{loading?"Carregando documento oficial...":"Renderizando página "+page+"..."}</div>}
   {error?<div role="alert" className={styles.readerError}><strong>O PDF não carregou.</strong><p>{error}</p><button type="button" onClick={()=>setRetry(n=>n+1)}>Tentar novamente</button><a href={officialUrl} target="_blank" rel="noopener noreferrer">Abrir documento original ↗</a></div>:<canvas ref={canvasRef} className={styles.pageCanvas} aria-label={`Página ${page} de ${numPages||"?"} do PDF`}/>}
  </div>
  {mode==="pages"&&numPages>1&&<div className={styles.pageBar} role="group" aria-label="Navegação inferior das páginas">
   <button type="button" disabled={page<=1} onClick={()=>setPage(n=>Math.max(1,n-1))}>← Página anterior</button>
   <button type="button" disabled={page>=numPages} onClick={()=>setPage(n=>Math.min(numPages,n+1))}>Próxima página →</button>
  </div>}
 </div>;
}
