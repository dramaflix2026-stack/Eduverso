import type {ReactNode} from "react";
const drawings:Record<string,ReactNode>={
 esqueletico:<path d="M8 5a3 3 0 1 0-4 4l7 7a3 3 0 1 0 4 4 3 3 0 1 0 4-4l-7-7a3 3 0 1 0-4-4Z"/>,
 muscular:<><path d="M4 18c1-4 3-7 5-8l2-5 4 1 1 3-3 1-1 4c2-2 5-3 7-1s2 5 0 7H7c-2 0-3-1-3-2Z"/><path d="M12 14c1 2 3 3 5 3"/></>,
 nervoso:<><path d="M12 5c-2-4-7-2-7 1-3 1-3 5-1 7-2 3 0 6 3 6 1 3 5 3 5 0V5Zm0 0c2-4 7-2 7 1 3 1 3 5 1 7 2 3 0 6-3 6-1 3-5 3-5 0"/><path d="M5 6c0 3 2 4 4 4m-5 3c2-1 4 0 5 2m10-9c0 3-2 4-4 4m5 3c-2-1-4 0-5 2"/></>,
 cardiovascular:<><path d="M12 21S2 15 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 13-10 13Z"/><path d="M4 12h4l2-4 3 8 2-4h5"/></>,
 respiratorio:<><path d="M11 3v8l-3 3m5-11v8l3 3M9 7C6 6 2 13 2 18c0 2 3 3 6 2 3-1 3-3 3-6m4-7c3-1 7 6 7 11 0 2-3 3-6 2-3-1-3-3-3-6"/></>,
 digestorio:<><path d="M10 2v6c-2 0-3 2-3 4 0 3 3 5 6 3 2-1 5-5 7-3 3 4-1 8-5 9H6c-3 0-4-3-2-5m9-14v5c3 0 6 0 6 3"/><path d="M8 18h7"/></>,
 urinario:<><path d="M8 3c-5-1-7 5-5 9 1 3 5 2 6-1l1-4c0-2 0-3-2-4Zm8 0c5-1 7 5 5 9-1 3-5 2-6-1l-1-4c0-2 0-3 2-4ZM9 11v5l3 3 3-3v-5m-3 8v3"/></>,
 endocrino:<><path d="M12 3v7m-2-3c-4-5-8-1-7 4 0 4 3 7 6 4l3-3 3 3c3 3 6 0 6-4 1-5-3-9-7-4M12 15v6"/><path d="M12 11h.01"/></>,
 linfatico:<><path d="M12 2 4 6v6c0 5 4 8 8 10 4-2 8-5 8-10V6l-8-4Z"/><path d="M12 7v10M7 12h10"/></>,
 reprodutor:<><path d="M9 8c-1-4-5-4-6-1-1 3 2 5 5 4m7-3c1-4 5-4 6-1 1 3-2 5-5 4M8 9c0 4 1 5 4 7 3-2 4-3 4-7M12 16v5"/><circle cx="3.5" cy="6.5" r="1"/><circle cx="20.5" cy="6.5" r="1"/></>,
 tegumentar:<><path d="m3 6 9-3 9 3-9 4-9-4Zm0 5 9 4 9-4M3 16l9 5 9-5"/><path d="M12 3V1"/></>,
 sentidos:<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
 lock:<><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/></>,
 search:<><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></>
};
export default function AtlasIcon({id}:{id:string}){return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{drawings[id]??drawings.nervoso}</svg>}
