"use client";

import {useEffect,useState} from "react";

export type ProgressSyncState="local"|"syncing"|"synced"|"offline";
type RemoteProgress={topic:string;correct_answers:number;answered_questions:number};

const namespace="eduverso:profissionais:concluidas:v2";
const guestNamespace="eduverso:profissionais:concluidas:v1:";
const allowedTracks=new Set(["web","python","ti","security","ux","graphic","dados","projects","marketing"]);
const progressTopic=(index:number)=>"capitulo-"+String(index+1).padStart(2,"0");
const cacheKey=(trackId:string,userId:string|null)=>userId?namespace+":"+userId+":"+trackId:guestNamespace+trackId;

function normalized(values:number[],count:number){
 return [...new Set(values.filter(v=>Number.isInteger(v)&&v>=0&&v<count))].sort((a,b)=>a-b);
}
function readCache(trackId:string,userId:string|null,count:number){
 try{
  const raw:unknown=JSON.parse(localStorage.getItem(cacheKey(trackId,userId))||"[]");
  return normalized(Array.isArray(raw)?raw.filter((v):v is number=>typeof v==="number"):[],count);
 }catch{return [];}
}
function saveCache(trackId:string,userId:string|null,values:number[]){
 try{localStorage.setItem(cacheKey(trackId,userId),JSON.stringify(values));}catch{/* storage quota or disabled */}
}
async function writeRemote(trackId:string,index:number){
 const response=await fetch("/api/progresso",{
  method:"POST",credentials:"same-origin",cache:"no-store",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
   area:"profissionais",subject:trackId,topic:progressTopic(index),
   correct_answers:2,answered_questions:2
  })
 });
 if(!response.ok)throw new Error("Não foi possível sincronizar.");
}

export function useProfessionalProgress(trackId:string,chapterCount:number,userId:string|null){
 const [completed,setCompleted]=useState<number[]>([]);
 const [state,setState]=useState<ProgressSyncState>("local");

 useEffect(()=>{
  if(!allowedTracks.has(trackId)){setCompleted([]);setState("local");return;}
  const initial=readCache(trackId,userId,chapterCount);
  setCompleted(initial);
  if(!userId){setState("local");return;}
  let canceled=false;
  let inFlight=false;
  const controller=new AbortController();
  setState("syncing");

  const sync=async()=>{
   if(canceled||inFlight)return;
   inFlight=true;
   setState("syncing");
   try{
    const response=await fetch("/api/progresso?area=profissionais&subject="+encodeURIComponent(trackId),{
     method:"GET",credentials:"same-origin",cache:"no-store",signal:controller.signal
    });
    if(!response.ok)throw new Error("Consulta de progresso indisponível.");
    const json=await response.json() as {items?:RemoteProgress[]};
    if(!Array.isArray(json.items))throw new Error("Resposta de progresso inválida.");
    const server=normalized(json.items.flatMap(item=>{
     if(item.correct_answers<2||item.answered_questions<2)return [];
     const match=/^capitulo-(\d{2})$/.exec(item.topic||"");
     return match?[Number(match[1])-1]:[];
    }),chapterCount);
    if(canceled)return;
    // Re-read local cache AFTER fetch to avoid losing completions made while loading.
    const local=readCache(trackId,userId,chapterCount);
    const combined=normalized([...server,...local],chapterCount);
    saveCache(trackId,userId,combined);
    setCompleted(prev=>normalized([...prev,...combined],chapterCount));
    const pending=local.filter(index=>!server.includes(index));
    if(pending.length)await Promise.all(pending.map(index=>writeRemote(trackId,index)));
    if(!canceled)setState("synced");
   }catch{
    if(!canceled)setState("offline");
   }finally{inFlight=false;}
  };
  const resume=()=>{if(document.visibilityState==="visible")void sync();};
  void sync();
  window.addEventListener("online",resume);
  window.addEventListener("focus",resume);
  return()=>{canceled=true;controller.abort();window.removeEventListener("online",resume);window.removeEventListener("focus",resume);};
 },[trackId,chapterCount,userId]);

 function complete(index:number){
  if(!allowedTracks.has(trackId)||index<0||index>=chapterCount||!Number.isInteger(index))return;
  const existing=readCache(trackId,userId,chapterCount);
  if(existing.includes(index))return;
  const next=normalized([...existing,index],chapterCount);
  saveCache(trackId,userId,next);
  setCompleted(prev=>normalized([...prev,index],chapterCount));
  if(userId){
   setState("syncing");
   void writeRemote(trackId,index).then(()=>setState("synced")).catch(()=>setState("offline"));
  }
 }

 return {completed,syncState:state,complete};
}
