"use client";
import type {CSSProperties,ReactNode} from "react";
import styles from "./anatomy-atlas-collection.module.css";

export type AtlasFamily="ossos"|"muscular"|"neuro"|"cardio"|"orgaos"|"outros";
const titles:Record<AtlasFamily,string>={
 ossos:"Estrutura óssea",muscular:"Movimento humano",neuro:"Rede neural",
 cardio:"Circulação e respiração",orgaos:"Sistemas internos",outros:"Sentidos e homeostase"
};
const symbols:Record<AtlasFamily,string>={ossos:"🦴",muscular:"💪",neuro:"🧠",cardio:"🫀",orgaos:"🫁",outros:"👁️"};
const palette:Record<AtlasFamily,[string,string]>={
 ossos:["#ba99ff","#6055e0"],muscular:["#ff9b8e","#dc5c7a"],neuro:["#d5a5ff","#955eea"],
 cardio:["#ff808e","#8e61e9"],orgaos:["#ffbf83","#e17697"],outros:["#8cdaf6","#7864db"]
};
export function atlasFamily(id:string):AtlasFamily{
 if(["anterior","posterior","cranio","coluna","torax","membro-superior","pelve","membro-inferior","pe"].includes(id))return"ossos";
 if(id.startsWith("musculos-"))return"muscular";
 if(["cerebro","medula-espinal","nervos-perifericos"].includes(id))return"neuro";
 if(["coracao","vasos-sanguineos","pulmoes"].includes(id))return"cardio";
 if(["sistema-digestorio","figado-pancreas","sistema-urinario","reprodutor-feminino","reprodutor-masculino"].includes(id))return"orgaos";
 return"outros";
}
function Drawing({family}:{family:AtlasFamily}):ReactNode{
 if(family==="ossos")return <g fill="none" stroke="#f4e4d7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
  <ellipse cx="210" cy="73" rx="39" ry="44" fill="#f1d8c5" strokeWidth="4"/>
  <path d="M187 106L195 128 226 128 234 106" strokeWidth="5"/>
  <path d="M210 130L210 257" strokeWidth="15"/>
  <path d="M179 137Q210 124 241 137M177 157Q210 145 243 157M176 179Q210 167 244 179M181 201Q210 191 239 201" strokeWidth="5"/>
  <path d="M185 126Q155 144 145 165M236 126Q266 144 275 165" strokeWidth="9"/>
  <path d="M145 165L128 232 111 280M275 165L292 232 308 280" strokeWidth="11"/>
  <path d="M186 251Q210 268 234 251L248 290 210 312 172 290Z" fill="#f1d8c5" strokeWidth="5"/>
  <path d="M189 303L168 396M230 303L251 396" strokeWidth="12"/>
  <path d="M168 396L160 456M251 396L260 456" strokeWidth="11"/>
  <path d="M160 455L135 477M260 455L284 477" strokeWidth="7"/>
 </g>;
 if(family==="muscular")return <g stroke="#f5a3a6" strokeWidth="4" strokeLinejoin="round">
  <ellipse cx="210" cy="74" rx="38" ry="45" fill="#d95a7f"/>
  <path d="M194 113L156 132 138 180 119 275 151 283 178 201 171 253 176 317 245 317 250 253 242 201 269 283 301 275 282 180 264 132 226 113Z" fill="#e26b78"/>
  <path d="M175 317L175 393 160 461 189 469 211 368 232 469 260 461 246 392 246 317" fill="#d65c78"/>
  <g stroke="#ffe4df" strokeWidth="3" fill="none" opacity=".9">
  <path d="M210 121L210 291M158 147Q186 150 205 168M263 147Q237 150 216 168M183 186L208 197 183 218 208 229 183 247 208 258M237 186L213 197 237 218 213 229 237 247 213 258"/>
  <path d="M149 169L135 246M271 169L285 246M176 321L190 391M245 321L230 391M164 400L181 455M259 400L240 455"/>
  </g>
 </g>;
 if(family==="neuro")return <g fill="none" stroke="#d6a9ff" strokeLinecap="round" strokeLinejoin="round">
  <path d="M170 93C131 81 128 28 172 22C191-14 243 4 252 24C289 18 307 65 278 90C291 120 261 150 232 137C209 157 182 140 177 122C147 133 131 114 145 93Z" fill="#9d64d9" strokeWidth="5"/>
  <g stroke="#fbd6ff" strokeWidth="3"><path d="M164 42Q200 49 187 89M194 20Q228 41 212 83M243 30Q220 60 251 84M278 65Q253 69 259 106M156 89L189 103M206 108L234 121" /></g>
  <path d="M214 140L214 420" stroke="#eeb8ff" strokeWidth="12"/>
  <g stroke="#d2a4ff" strokeWidth="4">{[172,205,239,272,306,341,376].map((y,i)=><g key={i}><path d={"M214 "+y+" Q170 "+(y+12)+" "+(147-i*4)+" "+(y+35)}/><path d={"M214 "+y+" Q258 "+(y+12)+" "+(281+i*4)+" "+(y+35)}/></g>)}</g>
 </g>;
 if(family==="cardio")return <g strokeLinejoin="round">
  <path d="M180 145Q120 108 111 176Q102 240 150 318Q177 349 196 320Z" fill="#cf92d7" stroke="#ffc5d0" strokeWidth="5"/>
  <path d="M242 145Q302 108 309 176Q317 240 271 318Q242 349 225 320Z" fill="#cf92d7" stroke="#ffc5d0" strokeWidth="5"/>
  <path d="M207 42L208 162M223 42L224 156" fill="none" stroke="#a7d6ff" strokeWidth="18" strokeLinecap="round"/>
  <path d="M209 169Q159 144 163 204Q165 250 209 279Q249 252 263 202Q270 152 228 169Z" fill="#e9537d" stroke="#ffb6b8" strokeWidth="5"/>
  <path d="M207 169L201 110Q193 78 169 79M223 165L236 99Q249 66 272 75" stroke="#fa979f" strokeWidth="13" fill="none" strokeLinecap="round"/>
  <path d="M211 206Q235 226 209 265" stroke="#ffcad1" strokeWidth="4" fill="none"/>
  <path d="M205 177Q165 175 152 204M232 177Q261 174 271 205" fill="none" stroke="#73b4ed" strokeWidth="6"/>
 </g>;
 if(family==="orgaos")return <g strokeWidth="5" strokeLinejoin="round">
  <path d="M113 137Q166 88 266 127Q277 177 249 212Q163 225 113 191Z" fill="#ad5579" stroke="#ffb3a1"/>
  <path d="M251 152Q300 159 298 213Q298 253 249 263Q236 239 248 212Z" fill="#d797ae" stroke="#ffbfca"/>
  <path d="M180 211Q201 199 214 225Q230 244 201 260Q159 256 180 211Z" fill="#eac08f" stroke="#ffe0a9"/>
  <path d="M144 256C121 275 120 343 152 366L263 365Q303 337 278 265Q262 243 242 258Q270 279 253 302Q239 316 253 335Q221 350 205 329Q179 301 155 334Q153 305 178 293Q191 270 166 263Z" fill="#cb738a" stroke="#f6ad9e"/>
  <path d="M170 280Q202 261 230 289Q190 289 190 313Q216 331 239 310M183 337Q210 317 227 343" stroke="#ffe0b2" fill="none" strokeWidth="6" strokeLinecap="round"/>
  <path d="M110 239Q77 261 97 312Q120 323 135 296Q137 254 110 239ZM311 239Q344 260 326 312Q302 323 288 296Q285 254 311 239Z" fill="#b57392" stroke="#ffb5b5"/>
 </g>;
 return <g stroke="#ffc7e1" strokeWidth="5" strokeLinejoin="round">
  <path d="M118 186Q210 87 302 186Q210 292 118 186Z" fill="#f6c4d7"/>
  <ellipse cx="210" cy="186" rx="55" ry="57" fill="#a5c6fa" stroke="#f8f3ff" strokeWidth="4"/>
  <circle cx="210" cy="186" r="32" fill="#7157c2"/><circle cx="210" cy="186" r="18" fill="#19162c"/><circle cx="198" cy="173" r="9" fill="white" stroke="none"/>
  <path d="M130 316Q146 267 190 282Q225 273 266 290L300 337 300 396 120 396Z" fill="#eeb6a2"/>
  <path d="M130 331Q170 305 200 333Q247 312 289 334M120 352Q150 330 177 354Q215 334 248 357Q280 340 300 358" fill="none" stroke="#a36eae" strokeWidth="5"/>
  {[[146,338],[181,339],[220,344],[260,335]].map(([x,y],i)=><g key={i}><path d={"M"+x+" "+y+"L"+(x-9)+" 300"} stroke="#513a86" strokeWidth="4"/><circle cx={x-9} cy="297" r="7" fill="#f9d5a2" stroke="none"/></g>)}
 </g>;
}
export default function AtlasArt({family,id,title,compact=false}:{family:AtlasFamily;id:string;title:string;compact?:boolean}){
 const [primary,secondary]=palette[family];
 const sid=id.replace(/[^a-z0-9-]/g,"");
 return <div className={styles.customArt+" "+(compact?styles.compactArt:"")} style={{"--artColor":primary,"--artSecondary":secondary} as CSSProperties}>
  <div className={styles.artCaption}><span>✦ EDUVERSO</span><span>{compact?"":"ATLAS DE ANATOMIA"}</span></div>
  <svg className={styles.artIllustration} viewBox="0 0 420 500" role="img" aria-label={"Ilustração esquemática de "+title} xmlns="http://www.w3.org/2000/svg">
   <defs><radialGradient id={"halo-"+sid}><stop stopColor={secondary} stopOpacity=".62"/><stop offset="1" stopColor={secondary} stopOpacity="0"/></radialGradient></defs>
   <ellipse cx="210" cy="230" rx="190" ry="215" fill={"url(#halo-"+sid+")"}/>
   <circle cx="210" cy="229" r="170" fill="none" stroke={primary} strokeWidth="2" opacity=".36"/>
   <circle cx="210" cy="229" r="137" fill="none" stroke={primary} strokeWidth="1" opacity=".18" strokeDasharray="4 9"/>
   <Drawing family={family}/>
  </svg>
  {!compact&&<div className={styles.artBottom}><strong>{title}</strong><span>{titles[family]}</span></div>}
  <span className={styles.artSeal} aria-hidden="true">{symbols[family]}</span>
 </div>;
}
