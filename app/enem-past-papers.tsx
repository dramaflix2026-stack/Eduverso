"use client";
import {useEffect,useMemo,useState} from "react";
import EnemPdfViewer from "./enem-pdf-viewer";
import type {EnemBook,EnemCatalog,EnemFile} from "./lib/enem-archive";
import styles from "./enem-past-papers.module.css";

const archive="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos";
const years=Array.from({length:2026-1998+1},(_,index)=>2026-index);
type Navigation={year:number|null;bookId:string;fileId:string};
const empty:Navigation={year:null,bookId:"",fileId:""};
const bookColors:Record<string,{stripe:string;contrast:string}>={
 Azul:{stripe:"#3286df",contrast:"#fff"},Amarelo:{stripe:"#f6c44e",contrast:"#161021"},
 Branco:{stripe:"#f5f3ff",contrast:"#18122b"},Verde:{stripe:"#51ba84",contrast:"#10251a"},
 Rosa:{stripe:"#e77bb3",contrast:"#1c0920"},Cinza:{stripe:"#aab0bf",contrast:"#181424"},
 Laranja:{stripe:"#f4a34f",contrast:"#241007"},Roxo:{stripe:"#a17ae4",contrast:"#180d27"},
 Marrom:{stripe:"#9d785e",contrast:"#fff"},Preto:{stripe:"#31323b",contrast:"#fff"},
 Vermelho:{stripe:"#df5b67",contrast:"#fff"}
};
function readLocation():Navigation{
 if(typeof window==="undefined")return empty;
 const params=new URLSearchParams(window.location.search);
 const year=Number(params.get("enemAno"));
 return {year:params.has("enemAno")&&Number.isInteger(year)&&year>=1998&&year<=2026?year:null,
  bookId:params.get("enemLivro")||"",fileId:params.get("enemDocumento")||""};
}
function labelFor(book:EnemBook){
 return book.number?"Caderno "+book.number+" · "+book.color:"Caderno "+book.color;
}
export default function EnemPastPapers(){
 const [nav,setNav]=useState<Navigation>(empty);
 const [ready,setReady]=useState(false);
 const [catalog,setCatalog]=useState<EnemCatalog|null>(null);
 const [pending,setPending]=useState(false);
 const [failure,setFailure]=useState("");
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{
  const restore=()=>{setNav(readLocation());setReady(true);};
  restore();window.addEventListener("popstate",restore);
  return()=>window.removeEventListener("popstate",restore);
 },[]);
 useEffect(()=>{
  if(nav.year===null){setCatalog(null);setFailure("");setPending(false);return;}
  const ctrl=new AbortController();
  const year=nav.year;
  setPending(true);setFailure("");setCatalog(null);
  fetch("/api/enem/catalog?ano="+year,{signal:ctrl.signal}).then(async res=>{
   const result=await res.json();
   if(!res.ok)throw Error(result.error||"Falha ao consultar o Inep.");
   setCatalog(result as EnemCatalog);
  }).catch(err=>{if(err?.name!=="AbortError")setFailure("Não foi possível carregar o catálogo oficial deste ano. Tente novamente.");})
   .finally(()=>{if(!ctrl.signal.aborted)setPending(false);});
  return()=>ctrl.abort();
 },[nav.year,attempt]);
 function navigate(next:Navigation){
  setNav(next);
  const url=new URL(window.location.href);
  if(next.year===null){for(const key of ["enemAno","enemLivro","enemDocumento","enemDia","enemCaderno","enemTipo"])url.searchParams.delete(key);}
  else{
   url.searchParams.set("enemAno",String(next.year));
   if(next.bookId)url.searchParams.set("enemLivro",next.bookId);else url.searchParams.delete("enemLivro");
   if(next.fileId)url.searchParams.set("enemDocumento",next.fileId);else url.searchParams.delete("enemDocumento");
   for(const key of ["enemDia","enemCaderno","enemTipo"])url.searchParams.delete(key);
  }
  window.history.pushState({},"",url.pathname+url.search+url.hash);
 }
 const books=catalog?.books||[];
 const currentBook=useMemo(()=>books.find(b=>b.id===nav.bookId),[books,nav.bookId]);
 const currentFile=useMemo(()=>currentBook?.documents.find(d=>d.id===nav.fileId),[currentBook,nav.fileId]);
 const applications=[...new Set(books.map(book=>book.application))];
 const source=catalog?.source||(archive+"/"+nav.year);
 function openFile(book:EnemBook,file:EnemFile){
  navigate({year:nav.year,bookId:book.id,fileId:file.id});
  window.requestAnimationFrame(()=>{document.getElementById("enem-document-reader")?.scrollIntoView({behavior:"smooth",block:"start"});});
 }
 return <section className="subject-course">
  <div className="subject-lesson">
   <span className="eyebrow">✦ EDUVERSO · PROVAS OFICIAIS</span>
   <h2>ENEM · Provas passadas</h2>
   {!ready?<p role="status">Carregando sua seleção...</p>:nav.year===null?<>
    <p>Explore as edições de 1998 a 2026. Abra um ano para escolher o dia, a cor do caderno e ler a prova ou seu gabarito diretamente no Eduverso, quando publicados pelo Inep.</p>
    <div className="enem-years">
     {years.map(year=><button key={year} type="button" className="enem-year" onClick={()=>navigate({year,bookId:"",fileId:""})}>
      <span>ENEM · ARQUIVO OFICIAL</span><strong>{year}</strong><small>Explorar cadernos e gabaritos →</small>
     </button>)}
    </div>
   </>:<>
    <button type="button" className={styles.back} onClick={()=>navigate(empty)}>← Todos os anos</button>
    <div className={styles.archiveHero}>
     <div><span className={styles.eyebrow}>ACERVO OFICIAL · {nav.year}</span><h3>ENEM {nav.year}</h3>
      <p>Escolha o caderno pela cor original. Os documentos são carregados do acervo do Inep sem sair da plataforma.</p></div>
     {catalog&&<strong>{books.length} caderno{books.length===1?"":"s"} listado{books.length===1?"":"s"}</strong>}
    </div>
    {pending&&<div className={styles.status} role="status">Consultando provas e gabaritos oficiais de {nav.year}...</div>}
    {failure&&<div className={styles.status} role="alert"><p>{failure}</p><button onClick={()=>setAttempt(x=>x+1)}>↻ Tentar novamente</button></div>}
    {catalog&&books.length===0&&<div className={styles.status}>
     <p>{catalog.warning||"Nenhum arquivo PDF foi localizado para este ano no índice do Inep."}</p>
     <a href={source} target="_blank" rel="noopener noreferrer">Consultar página oficial de {nav.year}</a>
    </div>}
    {applications.map(application=><div className={styles.application} key={application}>
     <h4>{application}</h4>
     {[null,1,2].map(day=>{
      const collection=books.filter(book=>book.application===application&&book.day===day);
      if(!collection.length)return null;
      return <div key={day===null?"unico":day}>
       <div className={styles.dayTitle}>{day===null?"Edição histórica · prova de um dia":day+"º dia · "+(day===1?"Linguagens e Ciências Humanas":"Matemática e Ciências da Natureza")}</div>
       <div className={styles.bookGrid}>{collection.map(book=>{
        const palette=bookColors[book.color]||{stripe:"#9f82e0",contrast:"#fff"};
        const files=book.documents.filter(file=>file.label==="Prova"||file.kind==="gabarito"||book.documents.filter(f=>f.kind==="prova").length===1);
        const extras=book.documents.filter(file=>!files.includes(file));
        return <article key={book.id} className={styles.bookCard} style={{borderTopColor:palette.stripe}}>
         <div className={styles.bookTop}>
          <span className={styles.colorDot} style={{backgroundColor:palette.stripe}} aria-hidden="true"/>
          <div><strong>{labelFor(book)}</strong><small>{book.special?"Versão "+book.special:"Documento oficial"}</small></div>
         </div>
         <div className={styles.bookButtons}>
          {files.map(file=><button key={file.id} type="button" aria-pressed={nav.fileId===file.id}
            className={nav.fileId===file.id?styles.fileActive:""} onClick={()=>openFile(book,file)}>
            {file.kind==="prova"?"📄 ":"✓ "}{file.label==="Prova"?"Ler prova":file.label==="Gabarito"?"Ver gabarito":file.label}
           </button>)}
          {!files.some(file=>file.kind==="gabarito")&&<span className={styles.noKey}>Gabarito não listado no acervo</span>}
         </div>
         {extras.length>0&&<details className={styles.extraVersions}><summary>Mais versões oficiais ({extras.length})</summary>
           {extras.map(file=><button type="button" key={file.id} onClick={()=>openFile(book,file)}>{file.label}</button>)}
         </details>}
        </article>;
       })}</div>
      </div>;
     })}
    </div>)}
    {currentBook&&currentFile&&<div id="enem-document-reader" className={styles.readerSection}>
     <span className={styles.eyebrow}>LEITURA INTEGRADA · DOCUMENTO ORIGINAL</span>
     <h4>{labelFor(currentBook)} · {currentFile.kind==="prova"?"Prova":"Gabarito"}</h4>
     <EnemPdfViewer key={currentFile.id} src={"/api/enem/pdf?ano="+nav.year+"&livro="+encodeURIComponent(currentBook.id)+"&documento="+encodeURIComponent(currentFile.id)}
       officialUrl={currentFile.url} title={"ENEM "+nav.year+" · "+labelFor(currentBook)+" · "+currentFile.label}/>
    </div>}
    {catalog&&<p className={styles.official}>Arquivos oficiais do Inep. A disponibilidade de cores, cadernos e gabaritos varia conforme o ano. <a href={source} target="_blank" rel="noopener noreferrer">Ver fonte original.</a></p>}
   </>}
  </div>
 </section>;
}
