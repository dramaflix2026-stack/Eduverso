"use client";
import {useEffect,useState} from "react";
import EnemPdfViewer from "./enem-pdf-viewer";
import styles from "./enem-past-papers.module.css";

const archive="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos";
const years=Array.from({length:2026-1998+1},(_,i)=>2026-i);
type Kind="prova"|"gabarito";
type Selection={year:number|null;day:1|2;book:number;kind:Kind};
const defaults:Selection={year:null,day:1,book:1,kind:"prova"};
const editions=[
 {day:1,book:1,color:"Azul"},{day:1,book:2,color:"Amarelo"},
 {day:1,book:3,color:"Branco"},{day:1,book:4,color:"Verde"},
 {day:2,book:5,color:"Amarelo"},{day:2,book:6,color:"Cinza"},
 {day:2,book:7,color:"Azul"},{day:2,book:8,color:"Verde"}
] as const;

function readSelection():Selection{
 if(typeof window==="undefined")return defaults;
 const p=new URLSearchParams(window.location.search);
 const y=Number(p.get("enemAno"));
 const year=p.has("enemAno")&&Number.isInteger(y)&&y>=1998&&y<=2026?y:null;
 const day:1|2=p.get("enemDia")==="2"?2:1;
 const c=Number(p.get("enemCaderno"));
 const book=editions.some(x=>x.day===day&&x.book===c)?c:day===1?1:5;
 const kind:Kind=p.get("enemTipo")==="gabarito"?"gabarito":"prova";
 return {year,day,book,kind};
}

export default function EnemPastPapers(){
 const [selection,setSelection]=useState<Selection>(defaults);
 const [restored,setRestored]=useState(false);
 useEffect(()=>{
  const restore=()=>{setSelection(readSelection());setRestored(true)};
  restore();window.addEventListener("popstate",restore);
  return()=>window.removeEventListener("popstate",restore);
 },[]);
 function choose(next:Selection){
  setSelection(next);
  const url=new URL(window.location.href);
  if(next.year===null){
   for(const key of ["enemAno","enemDia","enemCaderno","enemTipo"])url.searchParams.delete(key);
  }else{
   url.searchParams.set("enemAno",String(next.year));
   if(next.year===2025){
    url.searchParams.set("enemDia",String(next.day));
    url.searchParams.set("enemCaderno",String(next.book));
    url.searchParams.set("enemTipo",next.kind);
   }else{
    for(const key of ["enemDia","enemCaderno","enemTipo"])url.searchParams.delete(key);
   }
  }
  window.history.pushState({},"",url.pathname+url.search+url.hash);
 }
 const {year,day,book,kind}=selection;
 const validBook=editions.find(item=>item.day===day&&item.book===book)??editions[0];
 const officialPdf=year===2025?`https://download.inep.gov.br/enem/provas_e_gabaritos/2025_${kind==="prova"?"PV":"GB"}_impresso_D${day}_CD${validBook.book}.pdf`:null;
 const hostedPdf=year===2025?`/api/enem/pdf?ano=2025&dia=${day}&caderno=${validBook.book}&tipo=${kind}`:null;
 return <section className="subject-course">
  <div className="subject-lesson">
   <span className="eyebrow">DOCUMENTOS OFICIAIS DO INEP</span>
   <h2>Provas passadas do ENEM</h2>
   {!restored?<p role="status">Carregando sua seleção...</p>:year===null?<>
    <p>Escolha o ano da prova. A edição de 2025 pode ser lida página por página dentro do Eduverso; os outros anos têm acesso ao acervo oficial do Inep.</p>
    <div className="enem-years">
     {years.map(y=><button type="button" key={y} onClick={()=>choose({...defaults,year:y})} className="enem-year"><span>ENEM</span><strong>{y}</strong><small>{y===2025?"Ler PDF no Eduverso":"Consultar acervo oficial"} →</small></button>)}
    </div>
   </>:<>
    <button className={styles.back} type="button" onClick={()=>choose(defaults)}>← Voltar aos anos</button>
    <h3>ENEM {year}</h3>
    {year===2025&&hostedPdf&&officialPdf?<>
     <p>Aplicação regular de 2025. Selecione o dia, o caderno e o documento para ler a prova ou o gabarito no próprio Eduverso.</p>
     <div className={styles.controls}>
      <div className={styles.controlGroup} role="group" aria-label="Dia da prova">
       {([1,2] as const).map(d=><button type="button" key={d} className={day===d?styles.selected:""} aria-pressed={day===d} onClick={()=>choose({...selection,day:d,book:d===1?1:5})}>{d}º dia</button>)}
      </div>
      <div className={styles.controlGroup} role="group" aria-label="Caderno e cor">
       {editions.filter(e=>e.day===day).map(e=><button type="button" key={e.book} className={validBook.book===e.book?styles.selected:""} aria-pressed={validBook.book===e.book} onClick={()=>choose({...selection,book:e.book})}>Caderno {e.book} · {e.color}</button>)}
      </div>
      <div className={styles.controlGroup} role="group" aria-label="Tipo de documento">
       {(["prova","gabarito"] as const).map(k=><button type="button" key={k} className={kind===k?styles.selected:""} aria-pressed={kind===k} onClick={()=>choose({...selection,kind:k})}>{k==="prova"?"📄 Ver prova":"✓ Ver gabarito"}</button>)}
      </div>
     </div>
     <EnemPdfViewer key={hostedPdf} src={hostedPdf} officialUrl={officialPdf} title={`ENEM 2025 · ${kind} · ${day}º dia · Caderno ${validBook.book}`}/>
     <p className={styles.official}>Fonte: Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep). Material da aplicação regular.</p>
    </>:<>
     <p>Para esta edição, consulte a coleção oficial do Inep. A leitura interna será ampliada conforme os arquivos forem validados.</p>
     <a className={styles.archiveLink} href={archive+"/"+year} target="_blank" rel="noopener noreferrer">Consultar provas e gabaritos do ENEM {year} no Inep ↗</a>
    </>}
   </>}
  </div>
 </section>;
}
