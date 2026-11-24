import http from 'node:http';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {timingSafeEqual,createHash,randomBytes} from 'node:crypto';
const dir=process.env.DATA_DIR||'/data';
fs.mkdirSync(dir,{recursive:true});
const db=new DatabaseSync(dir+'/intelligence.sqlite');
db.exec("PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; PRAGMA busy_timeout=5000;");
db.exec(`
CREATE TABLE IF NOT EXISTS campaigns(id TEXT PRIMARY KEY,name TEXT NOT NULL,status TEXT,budget_mode TEXT,daily_budget REAL,lifetime_budget REAL,objective TEXT,scope TEXT NOT NULL DEFAULT 'tracked',seen_at TEXT);
CREATE TABLE IF NOT EXISTS adsets(id TEXT PRIMARY KEY,campaign_id TEXT NOT NULL,name TEXT,status TEXT,daily_budget REAL,lifetime_budget REAL,seen_at TEXT);
CREATE TABLE IF NOT EXISTS ads(id TEXT PRIMARY KEY,campaign_id TEXT NOT NULL,adset_id TEXT,name TEXT,status TEXT,creative_id TEXT,seen_at TEXT);
CREATE TABLE IF NOT EXISTS profiles(ad_id TEXT PRIMARY KEY,format TEXT,angle TEXT,hook TEXT,voice TEXT,visual TEXT,audience TEXT,duration TEXT,transcript TEXT);
CREATE TABLE IF NOT EXISTS runs(id TEXT PRIMARY KEY,at TEXT NOT NULL,source TEXT NOT NULL,kind TEXT NOT NULL,status TEXT NOT NULL,count INTEGER NOT NULL DEFAULT 0,error TEXT);
CREATE TABLE IF NOT EXISTS daily(date TEXT NOT NULL,ad_id TEXT NOT NULL,campaign_id TEXT NOT NULL,adset_id TEXT,source TEXT NOT NULL,at TEXT NOT NULL,currency TEXT,spend REAL,impressions REAL,clicks REAL,visits REAL,checkouts REAL,purchases REAL,revenue REAL,PRIMARY KEY(date,ad_id));
CREATE INDEX IF NOT EXISTS daily_campaign_date ON daily(campaign_id,date);
CREATE TABLE IF NOT EXISTS observations(run_id TEXT NOT NULL,date TEXT NOT NULL,ad_id TEXT NOT NULL,campaign_id TEXT NOT NULL,adset_id TEXT,currency TEXT,spend REAL,impressions REAL,clicks REAL,visits REAL,checkouts REAL,purchases REAL,revenue REAL,PRIMARY KEY(run_id,date,ad_id));
CREATE INDEX IF NOT EXISTS observations_date_campaign ON observations(date,campaign_id);
CREATE TABLE IF NOT EXISTS decisions(id INTEGER PRIMARY KEY AUTOINCREMENT,at TEXT NOT NULL,campaign_id TEXT NOT NULL,hypothesis TEXT NOT NULL,action TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'planned',outcome TEXT,updated_at TEXT);
CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS finance(date TEXT PRIMARY KEY,gross REAL,fees REAL,refunds REAL,taxes REAL,infra REAL,other REAL,updated_at TEXT);
`);
const now=()=>new Date().toISOString();
const today=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo'}).format(new Date());
const dayShift=(d,n)=>{const x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)};
const dateOK=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
const validID=x=>typeof x==='string'&&/^\d{1,30}$/.test(x);
const clean=(x,n=300)=>typeof x==='string'?x.slice(0,n):'';
const num=x=>x===null||x===undefined||x===''?null:(Number.isFinite(Number(x))&&Number(x)>=0?Number(x):null);
const metricKeys=['spend','impressions','clicks','visits','checkouts','purchases','revenue'];
const excluded=new Set((process.env.INTEL_EXCLUDED_CAMPAIGNS||'').split(',').map(x=>x.trim()).filter(Boolean));
const original=process.env.META_CAMPAIGN_ID||'';
const setting=k=>db.prepare('SELECT value FROM settings WHERE key=?').get(k)?.value;
const setSetting=(k,v)=>db.prepare('INSERT INTO settings VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k,String(v));
const tx=fn=>{db.exec('BEGIN IMMEDIATE');try{const v=fn();db.exec('COMMIT');return v}catch(e){db.exec('ROLLBACK');throw e}};
const runStmt=db.prepare('INSERT OR IGNORE INTO runs(id,at,source,kind,status,count,error) VALUES(?,?,?,?,?,?,?)');
const campStmt=db.prepare("INSERT INTO campaigns(id,name,scope,seen_at) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=CASE WHEN excluded.name<>'' THEN excluded.name ELSE campaigns.name END,seen_at=MAX(COALESCE(campaigns.seen_at,''),excluded.seen_at)");
const setStmt=db.prepare("INSERT INTO adsets(id,campaign_id,name,seen_at) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET campaign_id=excluded.campaign_id,name=CASE WHEN excluded.name<>'' THEN excluded.name ELSE adsets.name END,seen_at=MAX(COALESCE(adsets.seen_at,''),excluded.seen_at)");
const adStmt=db.prepare("INSERT INTO ads(id,campaign_id,adset_id,name,seen_at) VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET campaign_id=excluded.campaign_id,adset_id=COALESCE(excluded.adset_id,ads.adset_id),name=CASE WHEN excluded.name<>'' THEN excluded.name ELSE ads.name END,seen_at=MAX(COALESCE(ads.seen_at,''),excluded.seen_at)");
const dailyStmt=db.prepare('INSERT INTO daily VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(date,ad_id) DO UPDATE SET campaign_id=excluded.campaign_id,adset_id=excluded.adset_id,source=excluded.source,at=excluded.at,currency=excluded.currency,spend=excluded.spend,impressions=excluded.impressions,clicks=excluded.clicks,visits=excluded.visits,checkouts=excluded.checkouts,purchases=excluded.purchases,revenue=excluded.revenue WHERE excluded.at>=daily.at');
const observationStmt=db.prepare('INSERT OR REPLACE INTO observations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)');
function ingest(payload){
 const source=payload.source;
 if(!['meta','supermetrics','manual','legacy'].includes(source)||!Array.isArray(payload.rows)||payload.rows.length>20000)throw Error('Formato de coleta inválido');
 const stamp=typeof payload.at==='string'&&Number.isFinite(Date.parse(payload.at))?new Date(payload.at).toISOString():null;
 if(!stamp||Date.parse(stamp)>Date.now()+5*60000)throw Error('Horário da coleta inválido');
 const id=source==='supermetrics'?'supermetrics-'+createHash('sha256').update(JSON.stringify([stamp,payload.rows])).digest('hex'):(clean(payload.id,120)||createHash('sha256').update(JSON.stringify(payload)).digest('hex'));
 const prepared=payload.rows.map(r=>{
  if(!dateOK(r.date)||r.date>today()||!validID(r.campaign_id)||!validID(r.ad_id)||(r.adset_id&&!validID(r.adset_id)))throw Error('Identificador ou data inválida');
  const currency=typeof r.currency==='string'&&/^[A-Z]{3}$/.test(r.currency)?r.currency:null;
  return {...r,adset_id:r.adset_id||null,currency,metrics:metricKeys.map(k=>num(r[k]))}
 });
 if(new Set(prepared.map(r=>r.date+'|'+r.ad_id)).size!==prepared.length)throw Error('Linhas duplicadas na mesma coleta');
 return tx(()=>{
  if(db.prepare('SELECT 1 FROM runs WHERE id=?').get(id))return {duplicate:true,count:0};
  if(source==='supermetrics'&&payload.id&&db.prepare('SELECT 1 FROM runs WHERE id=? AND at=?').get(clean(payload.id,120),stamp))return {duplicate:true,count:0};
  runStmt.run(id,stamp,source,'insights','success',prepared.length,null);
  for(const r of prepared){
   campStmt.run(r.campaign_id,clean(r.campaign_name),excluded.has(r.campaign_id)?'excluded':'tracked',stamp);
   if(r.adset_id)setStmt.run(r.adset_id,r.campaign_id,clean(r.adset_name),stamp);
   adStmt.run(r.ad_id,r.campaign_id,r.adset_id,clean(r.ad_name),stamp);
   dailyStmt.run(r.date,r.ad_id,r.campaign_id,r.adset_id,source,stamp,r.currency,...r.metrics);
   observationStmt.run(id,r.date,r.ad_id,r.campaign_id,r.adset_id,r.currency,...r.metrics);
  }
  return {duplicate:false,count:prepared.length};
 });
}
const actionValue=(r,k,field='actions')=>{const a=(r[field]||[]).find(x=>x.action_type===k);return a?num(a.value):null};
function metaRow(r){return {date:r.date_start,campaign_id:r.campaign_id,campaign_name:r.campaign_name,adset_id:r.adset_id,adset_name:r.adset_name,ad_id:r.ad_id,ad_name:r.ad_name,currency:r.account_currency,spend:r.spend,impressions:r.impressions,clicks:r.inline_link_clicks,visits:actionValue(r,'landing_page_view'),checkouts:actionValue(r,'offsite_conversion.fb_pixel_initiate_checkout'),purchases:actionValue(r,'offsite_conversion.fb_pixel_purchase'),revenue:actionValue(r,'offsite_conversion.fb_pixel_purchase','action_values')}}
try{
 const legacyFile=dir+'/state.json';
 if(!setting('legacy_migrated')&&fs.existsSync(legacyFile)){
  const legacy=JSON.parse(fs.readFileSync(legacyFile,'utf8'));
  for(const snap of legacy.snapshots||[])ingest({id:'legacy-'+snap.at,at:snap.at,source:'legacy',rows:(snap.rows||[]).map(metaRow)});
  setSetting('legacy_migrated','yes');
 }
 const bootstrap=JSON.parse(process.env.INTEL_BOOTSTRAP_JSON||'[]');for(const p of bootstrap){const imported=ingest(p);console.info('INTEL_IMPORT '+JSON.stringify({id:p.id,source:p.source,at:p.at,count:imported.count,duplicate:imported.duplicate}))}
 const known=[['120253370674280064','[CR-01]'],['120253370708770064','[CR-02]'],['120253370708780064','[CR-03]']];
 if(original==='120253370674300064'){
  for(const [id,name] of known){adStmt.run(id,original,'120253370674350064',name,now());db.prepare('INSERT OR IGNORE INTO profiles(ad_id,format,voice,visual) VALUES(?,?,?,?)').run(id,'Vídeo','Feminina, sem rosto','Mesmo vídeo demonstrativo da plataforma')}
  db.prepare("UPDATE campaigns SET budget_mode=COALESCE(budget_mode,'ABO'),daily_budget=COALESCE(daily_budget,35.22) WHERE id=?").run(original);
 }
}catch(e){console.error('Falha na importação inicial:',e.message);runStmt.run('bootstrap-error-'+now(),now(),'manual','bootstrap','failed',0,clean(e.message,200))}
const metaVersion=()=>process.env.META_GRAPH_VERSION||'v25.0';
const ready=()=>/^act_\d+$/.test(process.env.META_AD_ACCOUNT_ID||'')&&/^v\d+\.\d+$/.test(metaVersion())&&!!process.env.META_ACCESS_TOKEN;
let busy=false,lastAttempt=0;
const metaRoot='https://graph.facebook.com';
function metaUrl(path,params={}){
 if(!['','campaigns','adsets','ads','insights'].includes(path))throw Error('Recurso Meta não permitido');
 const u=new URL(metaRoot+'/'+metaVersion()+'/'+process.env.META_AD_ACCOUNT_ID+(path?'/'+path:''));
 u.search=new URLSearchParams(params).toString();return u;
}
async function metaGet(u){
 const url=new URL(u);if(url.origin!==metaRoot||url.username||url.password)throw Error('Origem Meta inesperada');
 url.searchParams.delete('access_token');
 const res=await fetch(url,{method:'GET',redirect:'error',headers:{Authorization:'Bearer '+process.env.META_ACCESS_TOKEN},signal:AbortSignal.timeout(30000)});
 let data;try{data=await res.json()}catch{throw Error('Resposta Meta inválida (HTTP '+res.status+')')}
 if(!res.ok||data.error){
  const code=Number(data.error?.code||0),sub=Number(data.error?.error_subcode||0);
  const diagnosis=code===190?'token inválido ou expirado':code===10||code===200?'permissão insuficiente':code===4||code===17||code===32||code===613||res.status===429?'limite temporário de chamadas':'falha na consulta';
  throw Error('Meta HTTP '+res.status+' · código '+code+(sub?' / '+sub:'')+' · '+diagnosis);
 }
 return data;
}
async function graph(path,params){
 const base=metaUrl(path,{...params,limit:'100'});let next=base.toString(),rows=[];
 const seen=new Set();
 for(let i=0;next&&i<200;i++){
  const url=new URL(next);
  if(url.origin!==metaRoot||url.pathname!==base.pathname)throw Error('Paginação Meta inesperada');
  url.searchParams.delete('access_token');if(seen.has(url.href))throw Error('Paginação Meta repetida');seen.add(url.href);
  const data=await metaGet(url);if(!Array.isArray(data.data))throw Error('Resposta Meta inválida');
  rows.push(...data.data);next=data.paging?.next;
 }
 if(next)throw Error('Paginação Meta incompleta');return rows;
}
async function checkMeta(){
 const a=await metaGet(metaUrl('',{fields:'id,account_id,name,currency,timezone_name,account_status'}));
 if(a.id!==process.env.META_AD_ACCOUNT_ID&&'act_'+a.account_id!==process.env.META_AD_ACCOUNT_ID)throw Error('Conta Meta inesperada');
 if(a.currency!=='BRL')throw Error('Moeda da conta diferente de BRL');
 if(a.timezone_name!=='America/Sao_Paulo')throw Error('Fuso da conta diferente de America/Sao_Paulo: '+clean(a.timezone_name,60));
 const d=today();
 const test=await metaGet(metaUrl('insights',{fields:'ad_id,spend,impressions',level:'ad',time_range:JSON.stringify({since:d,until:d}),limit:'1'}));
 if(!Array.isArray(test.data))throw Error('Acesso a Insights não confirmado');
 setSetting('meta_account_name',clean(a.name));setSetting('meta_checked_at',now());setSetting('meta_check_result','ok');setSetting('meta_check_error','');
 return a;
}
async function discover(){
 const [campaigns,sets,ads]=await Promise.all([graph('campaigns',{fields:'id,name,effective_status,objective,daily_budget,lifetime_budget'}),graph('adsets',{fields:'id,campaign_id,name,effective_status,daily_budget,lifetime_budget'}),graph('ads',{fields:'id,campaign_id,adset_id,name,effective_status,creative{id}'})]);
 const stamp=now();
 tx(()=>{
  for(const c of campaigns){if(!validID(c.id))continue;campStmt.run(c.id,clean(c.name),excluded.has(c.id)?'excluded':'tracked',stamp);const cb=(num(c.daily_budget)||0)>0||(num(c.lifetime_budget)||0)>0;const ab=sets.some(s=>s.campaign_id===c.id&&((num(s.daily_budget)||0)>0||(num(s.lifetime_budget)||0)>0));const activeSets=sets.filter(s=>s.campaign_id===c.id&&s.effective_status==='ACTIVE');const budget=(k)=>{const vals=activeSets.map(s=>num(s[k])).filter(v=>v!==null&&v>0);return vals.length?vals.reduce((a,b)=>a+b,0)/100:null};db.prepare('UPDATE campaigns SET status=?,objective=?,budget_mode=?,daily_budget=?,lifetime_budget=? WHERE id=?').run(c.effective_status||null,c.objective||null,cb?'CBO':ab?'ABO':null,cb?(num(c.daily_budget)||0)/100:ab?budget('daily_budget'):null,cb?(num(c.lifetime_budget)||0)/100:ab?budget('lifetime_budget'):null,c.id)}
  for(const s of sets){if(!validID(s.id)||!validID(s.campaign_id))continue;setStmt.run(s.id,s.campaign_id,clean(s.name),stamp);db.prepare('UPDATE adsets SET status=?,daily_budget=?,lifetime_budget=? WHERE id=?').run(s.effective_status||null,num(s.daily_budget)===null?null:Number(s.daily_budget)/100,num(s.lifetime_budget)===null?null:Number(s.lifetime_budget)/100,s.id)}
  for(const a of ads){if(!validID(a.id)||!validID(a.campaign_id))continue;adStmt.run(a.id,a.campaign_id,validID(a.adset_id)?a.adset_id:null,clean(a.name),stamp);db.prepare('UPDATE ads SET status=?,creative_id=? WHERE id=?').run(a.effective_status||null,a.creative?.id||null,a.id)}
  runStmt.run('discover-'+stamp,stamp,'meta','discovery','success',campaigns.length+sets.length+ads.length,null);setSetting('discovery_at',stamp);
 });
}
async function insights(since,until,kind){
 const rows=await graph('insights',{level:'ad',fields:'campaign_id,campaign_name,adset_id,adset_name,ad_id,ad_name,account_currency,spend,impressions,inline_link_clicks,actions,action_values,date_start,date_stop',time_increment:'1',time_range:JSON.stringify({since,until})});
 const stamp=now();ingest({id:'meta-'+kind+'-'+since+'-'+stamp,at:stamp,source:'meta',rows:rows.map(metaRow)});
}
const elapsed=(k,minutes)=>!setting(k)||Date.now()-Date.parse(setting(k))>=minutes*60000;
async function sync(force=false){
 if(!ready()||busy||(!force&&Date.now()-lastAttempt<5*60000))return {ok:false,reason:busy?'busy':'unavailable'};
 busy=true;lastAttempt=Date.now();
 try{
  if(force||elapsed('meta_checked_at',60)||setting('meta_check_result')!=='ok'){try{await checkMeta()}catch(e){setSetting('meta_checked_at',now());setSetting('meta_check_result','error');setSetting('meta_check_error',clean(e.message,200));throw e}}
  if(force||elapsed('discovery_at',30))try{await discover()}catch(e){runStmt.run('discovery-error-'+now(),now(),'meta','discovery','failed',0,clean(e.message,200))}
  if(force||elapsed('hourly_at',60)){const d=today();await insights(d,d,'hourly');setSetting('hourly_at',now())}
  if(elapsed('reconcile_at',1440)){
   const d=today();const configured=process.env.INTEL_START_DATE;const lower=dayShift(d,-28);const first=dateOK(configured)?(!setting('reconcile_at')?configured:(configured>lower?configured:lower)):lower;
   for(let from=first;from<d;from=dayShift(from,14)){const to=dayShift(from,13)<d?dayShift(from,13):dayShift(d,-1);await insights(from,to,'reconcile')}
   setSetting('reconcile_at',now());
  }
  setSetting('meta_sync_result','ok');setSetting('meta_sync_error','');return {ok:true};
 }catch(e){setSetting('meta_sync_result','error');setSetting('meta_sync_error',clean(e.message,200));runStmt.run('sync-error-'+now(),now(),'meta','insights','failed',0,clean(e.message,200));return {ok:false}}finally{busy=false}
}
const esc=s=>String(s??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>n===null||n===undefined?'—':Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const integer=n=>n===null||n===undefined?'—':Number(n).toLocaleString('pt-BR',{maximumFractionDigits:1});
const pct=n=>n===null?'—':(100*n).toLocaleString('pt-BR',{maximumFractionDigits:2,minimumFractionDigits:2})+'%';
const ratio=(n,d)=>n===null||d===null||d===0?null:n/d;
const total=(rows,k)=>{const v=rows.map(r=>r[k]).filter(x=>x!==null&&x!==undefined);return {value:v.length?v.reduce((a,b)=>a+Number(b),0):null,complete:!!rows.length&&v.length===rows.length}};
function metrics(rows){const t=Object.fromEntries(metricKeys.map(k=>[k,total(rows,k)]));const full=(a,b)=>t[a].complete&&t[b].complete?ratio(t[a].value,t[b].value):null;const currencyOK=rows.length>0&&rows.every(r=>r.currency==='BRL');return {...t,currencyOK,ctr:full('clicks','impressions'),cpc:currencyOK?full('spend','clicks'):null,cpm:currencyOK&&full('spend','impressions')!==null?1000*full('spend','impressions'):null,cpa:currencyOK?full('spend','purchases'):null,roas:currencyOK?full('revenue','spend'):null}}
const display=(t,format=integer)=>t.value===null?'—':format(t.value)+(t.complete?'':' · parcial');
const displayMoney=(m,k)=>m.currencyOK?display(m[k],money):'—';
const campaigns=()=>db.prepare('SELECT * FROM campaigns ORDER BY scope DESC,seen_at DESC,name').all();
const allAds=()=>db.prepare('SELECT a.*,p.format,p.angle,p.hook,p.voice,p.visual,p.audience,p.duration,p.transcript,c.name campaign_name,c.scope FROM ads a LEFT JOIN profiles p ON p.ad_id=a.id LEFT JOIN campaigns c ON c.id=a.campaign_id ORDER BY c.name,a.name,a.id').all();
const names=Object.freeze({overview:'Visão geral',campaigns:'Campanhas',creatives:'Criativos',funnel:'Funil de conversão',tests:'Laboratório de testes',insights:'Inteligência comercial',decisions:'Histórico de decisões',learning:'Aprendizado',finance:'Financeiro',settings:'Integrações'});
function table(head,rows){return '<div class="scroll"><table><thead><tr>'+head.map(x=>'<th>'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+(rows.length?rows.map(row=>'<tr>'+row.map((v,i)=>'<td data-label="'+esc(head[i])+'"><div class="cellvalue">'+v+'</div></td>').join('')+'</tr>').join(''):'<tr><td colspan="'+head.length+'" class="muted empty">Sem dados para este filtro.</td></tr>')+'</tbody></table></div>'}
const cells=xs=>xs.map(esc);
const input=(name,label,value='',type='text',extra='')=>'<label>'+esc(label)+'<input name="'+name+'" type="'+type+'" value="'+esc(value??'')+'" '+extra+'></label>';
const area=(name,label,value='')=>'<label>'+esc(label)+'<textarea name="'+name+'" rows="3" maxlength="2000">'+esc(value??'')+'</textarea></label>';
const select=(name,label,options,value)=>'<label>'+esc(label)+'<select name="'+name+'">'+options.map(([id,n])=>'<option value="'+esc(id)+'"'+(id===value?' selected':'')+'>'+esc(n)+'</option>').join('')+'</select></label>';
const card=(k,v)=>'<div class="metric"><small>'+esc(k)+'</small><b>'+esc(v)+'</b></div>';
const block=(title,body)=>'<section><h2>'+esc(title)+'</h2>'+body+'</section>';
const note=s=>'<p class="muted">'+esc(s)+'</p>';
const timeFmt=s=>s?new Date(s).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}):'—';
const latest=()=>db.prepare("SELECT * FROM runs WHERE kind='insights' AND status='success' ORDER BY at DESC LIMIT 1").get();

function timelineChart(points,label,format){
 const valid=points.filter(p=>Number.isFinite(p.value));
 if(!valid.length)return note('Sem dados completos para este gráfico.');
 const w=480,h=190,l=62,r=24,t=15,b=33,max=Math.max(1,...valid.map(p=>p.value)),x=i=>l+(w-l-r)*(points.length===1?.5:i/(points.length-1)),y=v=>h-b-(h-b-t)*v/max;
 let out='<svg class="trendchart" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(label)+'"><title>'+esc(label)+'</title>';
 for(let i=0;i<=4;i++){const v=max*i/4;out+='<line x1="'+l+'" y1="'+y(v)+'" x2="'+(w-r)+'" y2="'+y(v)+'" stroke="#433353" stroke-dasharray="3 5"/><text x="'+(l-8)+'" y="'+(y(v)+4)+'" text-anchor="end" fill="#b0a5c5" font-size="11">'+esc(format(v))+'</text>'}
 let last=null;points.forEach((p,i)=>{if(!Number.isFinite(p.value)){last=null;return}if(last!==null)out+='<line x1="'+x(last)+'" y1="'+y(points[last].value)+'" x2="'+x(i)+'" y2="'+y(p.value)+'" stroke="#b48aff" stroke-width="2.5"/>';out+='<circle cx="'+x(i)+'" cy="'+y(p.value)+'" r="4" fill="#c4a4ff"><title>'+esc(p.label+' · '+format(p.value))+'</title></circle>';last=i});
 const step=Math.max(1,Math.ceil(points.length/5));points.forEach((p,i)=>{if(i%step===0||i===points.length-1)out+='<text x="'+x(i)+'" y="'+(h-13)+'" text-anchor="middle" fill="#b0a5c5" font-size="11">'+esc(p.label)+'</text>'});
 return out+'</svg>';
}
function dailySeries(rows,from,to){
 const groups=new Map();for(const row of rows){if(!groups.has(row.date))groups.set(row.date,[]);groups.get(row.date).push(row)}
 const points=[];for(let d=from;d<=to&&points.length<366;d=dayShift(d,1)){const q=metrics(groups.get(d)||[]);points.push({label:d.slice(8,10)+'/'+d.slice(5,7),spend:q.currencyOK&&q.spend.complete?q.spend.value:null,clicks:q.clicks.complete?q.clicks.value:null,purchases:q.purchases.complete?q.purchases.value:null})}return points;
}
function intradaySeries(date,filter){
 const runs=db.prepare("SELECT * FROM runs WHERE kind='insights' AND status='success' ORDER BY at DESC LIMIT 200").all().reverse();
 const result=[];for(const run of runs){const rs=db.prepare('SELECT o.*,c.scope FROM observations o JOIN campaigns c ON c.id=o.campaign_id WHERE run_id=? AND date=?').all(run.id,date).filter(filter);if(!rs.length)continue;const q=metrics(rs);result.push({label:new Date(run.at).toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit'}),spend:q.currencyOK&&q.spend.complete?q.spend.value:null,clicks:q.clicks.complete?q.clicks.value:null})}return result;
}
function compareTable(current,previous,previousFrom,previousTo){
 const vals=[['Investimento',current.currencyOK&&current.spend.complete?current.spend.value:null,previous.currencyOK&&previous.spend.complete?previous.spend.value:null,money],['Impressões',current.impressions.complete?current.impressions.value:null,previous.impressions.complete?previous.impressions.value:null,integer],['Cliques',current.clicks.complete?current.clicks.value:null,previous.clicks.complete?previous.clicks.value:null,integer],['CTR',current.ctr,previous.ctr,pct],['CPC',current.cpc,previous.cpc,money],['CPA',current.cpa,previous.cpa,money]];
 return note('Período anterior: '+previousFrom+' a '+previousTo+'. O dia atual pode estar incompleto.')+'<div class="compare-grid"><div class="compare-row compare-head"><span>Indicador</span><span>Atual</span><span>Anterior</span><span>Var.</span></div>'+vals.map(([k,a,b,f])=>'<div class="compare-row">'+[k,a===null?'—':f(a),b===null?'—':f(b),a===null||b===null||b===0?'—':pct((a-b)/b)].map(v=>'<span>'+esc(v)+'</span>').join('')+'</div>').join('')+'</div>';
}

function compactMetrics(items){return '<div class="mini-grid">'+items.map(([label,value])=>'<div><small>'+esc(label)+'</small><strong>'+esc(value)+'</strong></div>').join('')+'</div>'}
function fold(title,body,cls=''){return '<details class="fold '+cls+'"><summary>'+esc(title)+'<span aria-hidden="true">+</span></summary><div class="fold-body">'+body+'</div></details>'}
function page(csrf,url){
 const p=url.searchParams,view=Object.hasOwn(names,p.get('view'))?p.get('view'):'overview',list=campaigns(),ids=new Set(list.map(c=>c.id));
 const chosen=p.get('campaign'),campaign=chosen==='all'||chosen==='excluded'||ids.has(chosen)?chosen:(ids.has(original)?original:'all');
 let from=dateOK(p.get('from'))?p.get('from'):today(),to=dateOK(p.get('to'))?p.get('to'):today();if(to>today())to=today();if(from>to)from=to;
 const all=db.prepare('SELECT d.*,c.scope,c.name campaign_name,a.name ad_name FROM daily d JOIN campaigns c ON c.id=d.campaign_id LEFT JOIN ads a ON a.id=d.ad_id WHERE d.date BETWEEN ? AND ? ORDER BY d.date,d.ad_id').all(from,to);
 const filter=r=>campaign==='all'?r.scope!=='excluded':campaign==='excluded'?r.scope==='excluded':r.campaign_id===campaign;
 const rows=all.filter(filter),m=metrics(rows),adList=allAds(),adBy=new Map(adList.map(a=>[a.id,a]));
 const span=Math.round((Date.parse(to+'T12:00:00Z')-Date.parse(from+'T12:00:00Z'))/86400000)+1, prevTo=dayShift(from,-1),prevFrom=dayShift(from,-span);
 const prevRows=db.prepare('SELECT d.*,c.scope FROM daily d JOIN campaigns c ON c.id=d.campaign_id WHERE date BETWEEN ? AND ?').all(prevFrom,prevTo).filter(filter), prev=metrics(prevRows);
 const trends=from===to?intradaySeries(from,filter):dailySeries(rows,from,to);
 const byAd=new Map();for(const row of rows){if(!byAd.has(row.ad_id))byAd.set(row.ad_id,[]);byAd.get(row.ad_id).push(row)}
 const byCampaign=new Map();for(const row of all){if(!byCampaign.has(row.campaign_id))byCampaign.set(row.campaign_id,[]);byCampaign.get(row.campaign_id).push(row)}
 const urlFor=(v,extra={})=>'?'+new URLSearchParams({view:v,campaign,from,to,...extra});
 const hidden='<input type="hidden" name="csrf" value="'+esc(csrf)+'">';
 const form=(action,body,back=view)=>'<form class="editor" method="post" action="/manage">'+hidden+'<input type="hidden" name="filter_campaign" value="'+esc(campaign)+'"><input type="hidden" name="filter_from" value="'+esc(from)+'"><input type="hidden" name="filter_to" value="'+esc(to)+'">'+'<input type="hidden" name="action" value="'+action+'"><input type="hidden" name="back" value="'+esc(back)+'">'+body+'<button type="submit">Salvar</button></form>';
 const options=list.map(c=>[c.id,c.name||c.id]);
 const last=latest(),error=db.prepare("SELECT * FROM runs WHERE status='failed' ORDER BY at DESC LIMIT 1").get();
 const kpis=[['Investimento',displayMoney(m,'spend')],['Impressões',display(m.impressions)],['CPM',money(m.cpm)],['Cliques no link',display(m.clicks)],['CTR de link',pct(m.ctr)],['CPC de link',money(m.cpc)],['Visitas à página',display(m.visits)],['Checkouts Meta',display(m.checkouts)],['Compras Meta',display(m.purchases)],['CPA Meta',money(m.cpa)],['Receita Meta',displayMoney(m,'revenue')],['ROAS Meta',m.roas===null?'—':m.roas.toFixed(2)+'x']];
 const adTable=()=>table(['Criativo','Campanha','Investimento','Impressões','Cliques','CTR','CPC','Visitas','Compras','CPA'],[...byAd].map(([id,rs])=>{const q=metrics(rs);return cells([adBy.get(id)?.name||id,rs[0].campaign_name,displayMoney(q,'spend'),display(q.impressions),display(q.clicks),pct(q.ctr),money(q.cpc),display(q.visits),display(q.purchases),money(q.cpa)])}));
 const creativeCards=()=>'<div class="creative-grid">'+[...byAd].map(([id,rs])=>{const q=metrics(rs);return '<details class="creative-card"><summary><div class="creative-name"><span class="creative-icon" aria-hidden="true">▶</span><div><b>'+esc(adBy.get(id)?.name||id)+'</b><small>'+esc(rs[0].campaign_name)+'</small></div></div><div class="creative-primary"><strong>'+esc(displayMoney(q,'spend'))+'</strong><small>'+esc(display(q.clicks))+' cliques</small></div><span class="chevron" aria-hidden="true">+</span></summary>'+compactMetrics([['Impressões',display(q.impressions)],['CTR',pct(q.ctr)],['CPC',money(q.cpc)],['Visitas',display(q.visits)],['Compras',display(q.purchases)],['CPA',money(q.cpa)]])+'</details>'}).join('')+(!byAd.size?note('Nenhum anúncio no período.'):'')+'</div>';
 const dailyTable=()=>{const d=new Map();for(const r of rows){if(!d.has(r.date))d.set(r.date,[]);d.get(r.date).push(r)}return table(['Dia','Gasto','Impressões','Cliques','Compras','CPA'],[...d].reverse().map(([date,rs])=>{const q=metrics(rs);return cells([date,displayMoney(q,'spend'),display(q.impressions),display(q.clicks),display(q.purchases),money(q.cpa)])}))};
 const completeness=note('— significa não retornado ou não calculável; parcial = soma somente dos valores conhecidos. Taxas só são calculadas com cobertura completa. Valores Meta atribuídos não são vendas confirmadas.');
 let content='';
 if(view==='overview'){
  content='<div class="overview-kpis"><div class="grid">'+[0,1,3,4,5,6].map(i=>card(...kpis[i])).join('')+'</div>'+fold('Mais indicadores',compactMetrics([2,7,8,9,10,11].map(i=>kpis[i])),'secondary-kpis')+'</div>'+block(from===to?'Evolução das coletas no dia':'Evolução no período',note(from===to?'Fotografias acumuladas do dia escolhido; nunca somar coletas.':'Valores diários consolidados. Lacunas indicam dados ausentes. Gráfico limitado aos primeiros 366 dias.')+'<div class="charts"><article><h3>Investimento</h3>'+timelineChart(trends.map(p=>({label:p.label,value:p.spend})),'Investimento',money)+'</article><article><h3>Cliques</h3>'+timelineChart(trends.map(p=>({label:p.label,value:p.clicks})),'Cliques',integer)+'</article></div>')+block('Desempenho por anúncio',creativeCards()+note('Toque no criativo para ver todos os indicadores. — indica dado ausente ou não calculável.'))+fold('Comparação com período anterior',compareTable(m,prev,prevFrom,prevTo),'comparison')+fold('Evolução diária',dailyTable())+block('Coletas recentes',collectionTable(campaign,from,to,filter));
 }else if(view==='campaigns'){
  content=block('Campanhas descobertas',note('Cada campanha é identificada pelo ID da Meta. Excluir da análise não apaga histórico nem altera os anúncios.')+table(['Campanha','Estrutura','Status Meta','Conjuntos','Anúncios','Gasto no período','Escopo'],list.map(c=>{const q=metrics(byCampaign.get(c.id)||[]);return ['<a href="'+esc(urlFor('overview',{campaign:c.id}))+'">'+esc(c.name||c.id)+'</a><small>'+esc(c.id)+'</small>',...cells([c.budget_mode,c.status,db.prepare('SELECT COUNT(*) n FROM adsets WHERE campaign_id=?').get(c.id).n,db.prepare('SELECT COUNT(*) n FROM ads WHERE campaign_id=?').get(c.id).n,displayMoney(q,'spend')]),form('scope','<input type="hidden" name="id" value="'+esc(c.id)+'">'+select('scope','Análise',[['tracked','Monitorada'],['excluded','Excluída']],c.scope))]})))+block('Conjuntos de anúncios',table(['Campanha','Conjunto','Status','Orçamento diário (centavos Meta normalizados)'],db.prepare('SELECT s.*,c.name campaign_name FROM adsets s LEFT JOIN campaigns c ON c.id=s.campaign_id').all().filter(s=>campaign==='all'?list.find(c=>c.id===s.campaign_id)?.scope!=='excluded':campaign==='excluded'?list.find(c=>c.id===s.campaign_id)?.scope==='excluded':s.campaign_id===campaign).map(s=>cells([s.campaign_name,s.name,s.status,money(s.daily_budget)]))));
 }else if(view==='creatives'){
  const creatives=adList.filter(a=>filter(a));
  content=block('Biblioteca de criativos',note('Os IDs são a referência permanente. Classifique o conteúdo e a hipótese do anúncio para comparar formatos sem confundir correlação e causa.')+creatives.map(a=>'<details><summary>'+esc(a.name||a.id)+' · '+esc(a.campaign_name||'')+'<small>'+esc(a.id)+'</small></summary>'+form('profile','<input type="hidden" name="id" value="'+esc(a.id)+'"><div class="fields">'+input('format','Formato',a.format)+input('angle','Argumento',a.angle)+input('hook','Gancho',a.hook)+input('voice','Narração',a.voice)+input('visual','Visual',a.visual)+input('audience','Público / segmento',a.audience)+input('duration','Duração',a.duration)+'</div>'+area('transcript','Transcrição ou descrição',a.transcript))+'</details>').join('')+(creatives.length?'':note('Nenhum anúncio encontrado para este filtro.')))+block('Desempenho',adTable());
 }else if(view==='funnel'){
  const stages=[['Impressões',m.impressions],['Cliques',m.clicks],['Visitas',m.visits],['Checkouts',m.checkouts],['Compras atribuídas',m.purchases]];
  content=block('Funil observado na Meta',stages.map(([k,v],i)=>'<div class="stage"><b>'+esc(k)+'</b><strong>'+esc(display(v))+'</strong><small>'+esc(i&&v.complete&&stages[i-1][1].complete?pct(ratio(v.value,stages[i-1][1].value)):'—')+' da etapa anterior</small></div>').join('')+completeness+note('Rastreamento próprio da landing page e confirmação Kiwify ainda não conectados. Nenhum funil de vendas próprio é simulado.'));
 }else if(view==='tests'||view==='decisions'){
  const decisions=db.prepare('SELECT d.*,c.name campaign_name FROM decisions d LEFT JOIN campaigns c ON c.id=d.campaign_id ORDER BY d.id DESC').all().filter(filterDecision);
  function filterDecision(d){return campaign==='all'?list.find(c=>c.id===d.campaign_id)?.scope!=='excluded':campaign==='excluded'?list.find(c=>c.id===d.campaign_id)?.scope==='excluded':d.campaign_id===campaign}
  content=block(view==='tests'?'Registrar hipótese de teste':'Registrar decisão',form('decision',select('campaign_id','Campanha',options,ids.has(campaign)?campaign:options[0]?.[0])+area('hypothesis','Hipótese / motivo')+area('decision_action','Decisão / alteração planejada'))+note('Nenhuma ação é enviada à Meta. O registro serve para lembrar a hipótese e verificar o resultado.'))+block('Decisões e resultados',decisions.map(d=>'<details><summary>'+esc(d.action)+' · '+esc(d.status)+'<small>'+esc(d.campaign_name)+' · '+esc(timeFmt(d.at))+'</small></summary>'+note(d.hypothesis)+form('outcome','<input type="hidden" name="id" value="'+d.id+'">'+select('status','Status',[['planned','Planejado'],['applied','Aplicado manualmente'],['validated','Validado'],['rejected','Reprovado'],['inconclusive','Inconclusivo']],d.status)+area('outcome','Resultado observado',d.outcome))+'</details>').join('')+(decisions.length?'':note('Nenhuma decisão registrada.')));
 }else if(view==='insights'){
  const suggestions=[];
  if(!rows.length)suggestions.push(['Sem dados','Aguarde uma coleta ou importe dados reais.']);
  else{
   if(!m.purchases.complete)suggestions.push(['Dados de compras incompletos','Não trate a ausência de registros como zero. Verifique atribuição e rastreamento.']);
   if((m.clicks.value||0)<100)suggestions.push(['Amostra inicial','Menos de 100 cliques conhecidos neste filtro. Não classifique vencedores nem escale com base apenas em CTR.']);
   if(m.clicks.complete&&m.visits.complete&&m.clicks.value>=30&&ratio(m.visits.value,m.clicks.value)<.6)suggestions.push(['Verificar passagem para a página','Menos de 60% dos cliques aparecem como visitas. Investigue carregamento, consentimento e atribuição; não conclua causalidade.']);
   if(m.purchases.complete&&m.purchases.value>=10)suggestions.push(['Conversões observadas','Compare CPA com a margem real e estabilidade em diferentes dias antes de considerar escala.']);
   suggestions.push(['Modo de decisão assistida','Recomendações são regras iniciais auditáveis, não um modelo treinado. Nenhuma mudança automática é executada.']);
  }
  content=block('Diagnóstico por regras',suggestions.map(([a,b])=>'<article class="signal"><b>'+esc(a)+'</b>'+note(b)+'</article>').join(''))+block('Indicadores do período','<div class="grid">'+kpis.map(([k,v])=>card(k,v)).join('')+'</div>');
 }else if(view==='learning'){
  const historical=db.prepare("SELECT d.*,c.scope FROM daily d JOIN campaigns c ON c.id=d.campaign_id WHERE c.scope='tracked' ORDER BY date").all();
  const summary=[];for(const key of ['format','angle','voice','visual','audience','duration']){const groups=new Map();for(const row of historical){const label=adBy.get(row.ad_id)?.[key];if(!label)continue;if(!groups.has(label))groups.set(label,[]);groups.get(label).push(row)}for(const [label,rs] of groups){const q=metrics(rs),n=new Set(rs.map(r=>r.campaign_id)).size;summary.push(cells([key,label,n,new Set(rs.map(r=>r.ad_id)).size,displayMoney(q,'spend'),display(q.purchases),money(q.cpa),n>=2&&q.purchases.complete&&q.purchases.value>=10?'Comparação exploratória':'Amostra insuficiente']))}}
  content=block('Memória comparativa entre campanhas',note('O histórico considera campanhas monitoradas e os atributos preenchidos na biblioteca. Um grupo precisa de pelo menos duas campanhas e dez compras registradas com cobertura completa para iniciar uma comparação exploratória. Isso não demonstra causalidade.')+table(['Atributo','Valor','Campanhas','Criativos','Gasto','Compras','CPA','Evidência'],summary))+block('Maturidade do aprendizado',note('Estágio atual: coleta, classificação e estatística descritiva. Treinamento de modelos, validação fora da amostra e recomendações probabilísticas ficam condicionados ao volume e qualidade dos dados.'));
 }else if(view==='finance'){
  const financial=db.prepare('SELECT * FROM finance WHERE date BETWEEN ? AND ? ORDER BY date DESC').all(from,to), excludedM=metrics(all.filter(r=>r.scope==='excluded'));
  content=block('Investimento e atribuição Meta','<div class="grid">'+[['Gasto selecionado',displayMoney(m,'spend')],['Gasto excluído da análise (conta)',displayMoney(excludedM,'spend')],['Receita atribuída Meta',displayMoney(m,'revenue')],['ROAS Meta',m.roas===null?'—':m.roas.toFixed(2)+'x']].map(([k,v])=>card(k,v)).join('')+'</div>'+note('A receita atribuída não comprova pagamento. Os registros financeiros manuais abaixo são totais da operação por dia, não atribuídos à campanha.'))+block('Conciliação financeira manual',form('finance',input('date','Dia',today(),'date','required')+'<div class="fields">'+[['gross','Receita confirmada'],['fees','Taxas'],['refunds','Reembolsos'],['taxes','Impostos'],['infra','Infraestrutura'],['other','Outros custos']].map(([k,v])=>input(k,v,'','number','min="0" step="0.01"')).join('')+'</div>')+table(['Dia','Receita','Taxas','Reembolsos','Impostos','Infra','Outros'],financial.map(f=>cells([f.date,money(f.gross),money(f.fees),money(f.refunds),money(f.taxes),money(f.infra),money(f.other)])))+note('Valores em branco permanecem desconhecidos. Kiwify automática e margem líquida conciliada ainda pendentes.'));
 }else{
  content=block('Meta Marketing API', '<div class="grid">'+card('Conexão',!ready()?'Aguardando token':setting('meta_check_result')==='ok'?'Acesso validado':setting('meta_check_result')==='error'?'Falha na conexão':'Aguardando teste')+card('Versão',metaVersion())+card('Último teste',timeFmt(setting('meta_checked_at')))+card('Último sucesso de insights',timeFmt(setting('hourly_at')))+'</div>'+note('Conta: '+(process.env.META_AD_ACCOUNT_ID||'não configurada')+' · '+(setting('meta_account_name')||'C01')+' · somente GET, leitura de anúncios. Nenhuma mudança é executada na Meta.')+(setting('meta_check_error')?note(setting('meta_check_error')):'')+(setting('meta_sync_error')?note(setting('meta_sync_error')):'')+note('Configure META_ACCESS_TOKEN nas variáveis privadas da Railway, com ads_read e acesso de análise à conta. Não envie o token pelo chat.')+'<p><a href="https://business.facebook.com/settings/system-users" target="_blank" rel="noopener noreferrer">Configurações de usuários do sistema</a></p>'+note('A coleta direta usa descoberta de entidades a cada 30 min, insights atuais a cada hora e reconciliação de até 28 dias diariamente.')+note('Supermetrics: dados importados são identificados pela origem e pelo horário. A conexão do ChatGPT não fornece automaticamente uma credencial à Railway.')+'<form method="post" action="/sync">'+hidden+'<button '+(ready()?'':'disabled')+'>Sincronizar Meta agora</button></form>'+note('Última coleta de dados: '+timeFmt(last?.at)+' · '+(last?.source||'sem origem')+(error?' · Última falha: '+error.error:'')))+block('Recebimento sem reinício',note('API de entrada: '+(ingestKeyHash()?'credencial ativa':'aguardando gerar credencial')+'. O envio autenticado grava diretamente no banco, sem deploy.')+note('Última requisição de coleta aceita: '+timeFmt(setting('ingest_http_at')))+note('POST /api/ingest · JSON · Bearer. A origem permitida é Supermetrics, conta C01; dados sem cache e com horário explícito.')+'<details><summary>Gerenciar credencial</summary>'+note('Gerar uma nova chave revoga imediatamente a anterior. Guarde-a em local seguro; nunca coloque no GitHub.')+'<form method="post" action="/ingest-token">'+hidden+'<button>'+ (ingestKeyHash()?'Rotacionar credencial':'Gerar credencial de coleta')+'</button></form></details>')+block('Importar coleta externa',note('Importação de JSON autenticada, sem modificar anúncios. Use id, at, source e rows com data, IDs e métricas. Importações repetidas com o mesmo ID são ignoradas.')+form('import',area('payload','JSON da coleta')))+block('Histórico técnico',table(['Horário Brasília','Fonte','Tipo','Resultado','Linhas','Erro'],db.prepare('SELECT * FROM runs ORDER BY at DESC LIMIT 100').all().map(r=>cells([timeFmt(r.at),r.source,r.kind,r.status,r.count,r.error])))+'<p><a href="/api/history">Exportar dados históricos (JSON)</a></p>');
 }
 const premiumStyles="\n:root{--panel:#151323;--edge:#2c2840;--accent:#a78bfa;--muted:#a49ab8}\nbody{background:#0c0b14;font-variant-numeric:tabular-nums}\nheader{position:sticky;top:0;z-index:5;background:#100e1b;border-color:var(--edge);padding:12px 24px}\nheader button{background:#211b32;border:1px solid #3b2e53;padding:8px 13px;color:#d9caf9}\n.desktop-nav{background:#100e1b;border-color:var(--edge)}.navshell{display:none}\nmain{max-width:1280px;padding:22px}section{background:var(--panel);border-color:var(--edge);padding:17px;border-radius:13px;margin-bottom:12px}\nh1{font-size:27px;letter-spacing:-.6px;margin:4px 0 0}h2{font-size:17px;letter-spacing:-.2px;margin:0 0 12px}\n.page-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}\n.refresh-link{border:1px solid var(--edge);border-radius:9px;padding:8px 10px;text-decoration:none;font-size:12px;white-space:nowrap}\n.statusbar{display:flex;align-items:center;gap:10px;border:1px solid var(--edge);border-radius:10px;padding:10px 12px;background:#141121}\n.statusdot{width:8px;height:8px;border-radius:50%;background:#a78bfa;flex:none;box-shadow:0 0 0 4px #a78bfa19}\n.statusbar b{font-size:12px;font-weight:600}.statusbar small{font-size:11px;line-height:1.4}\n.filters{margin:12px 0 15px;gap:8px}.filters label{gap:4px}.filters input,.filters select{padding:9px 10px;min-width:0}.filters button{padding:10px 14px}\n.overview-kpis .grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:0 0 8px}.overview-kpis .metric{margin:0;background:linear-gradient(145deg,#1b172a,#151323);border-color:var(--edge);padding:13px;border-radius:12px}\n.metric small{font-size:12px;line-height:1.25}.metric b{font-size:23px;margin-top:6px;letter-spacing:-.4px}\n.fold{background:var(--panel);border:1px solid var(--edge);padding:0;margin:0 0 12px;border-radius:12px}.fold summary,.creative-card summary,.timeline-item summary{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:10px;cursor:pointer}.fold summary::-webkit-details-marker,.creative-card summary::-webkit-details-marker,.timeline-item summary::-webkit-details-marker{display:none}\n.fold summary{padding:13px 15px;font-size:14px}.fold summary span,.chevron{color:var(--accent);font-size:18px;font-weight:400}.fold[open]>summary span,.creative-card[open]>summary .chevron,.timeline-item[open]>summary .chevron{transform:rotate(45deg)}.fold-body{padding:0 14px 14px}\n.mini-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.mini-grid>div{padding:8px;background:#100e1b;border:1px solid #28243b;border-radius:8px;min-width:0}.mini-grid small{font-size:11px;line-height:1.35}.mini-grid strong{display:block;margin-top:3px;font-size:14px;overflow-wrap:anywhere}\n.creative-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:8px}.creative-card,.timeline-item{background:#110f1d;border:1px solid var(--edge);padding:0;margin:0;border-radius:10px;min-width:0}.creative-card summary,.timeline-item summary{padding:12px}.creative-name{display:flex;align-items:center;gap:9px;min-width:0;flex:1}.creative-name>div{min-width:0}.creative-name small{font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.creative-icon{display:grid;place-items:center;width:30px;height:30px;background:#2c2145;color:#c3a4ff;border-radius:8px;flex:none;font-size:12px}.creative-primary,.timeline-amount{text-align:right;white-space:nowrap}.creative-primary strong,.timeline-amount strong{font-size:15px}.creative-primary small,.timeline-amount small{font-size:11px}.creative-card>.mini-grid,.timeline-item>.mini-grid{padding:0 10px 10px}\n.compare-grid{display:grid;gap:0}.compare-row{display:grid;grid-template-columns:1.15fr 1fr 1fr .7fr;gap:5px;padding:9px 0;border-bottom:1px solid var(--edge);font-size:12px;align-items:center}.compare-row span{min-width:0;overflow-wrap:anywhere;text-align:right}.compare-row span:first-child{text-align:left}.compare-head{color:var(--muted);font-size:11px;font-weight:600}\n.timeline{display:grid;gap:7px}.timeline-item{border:0;border-bottom:1px solid var(--edge);border-radius:0;background:transparent}.timeline-item summary{justify-content:flex-start;padding:9px 1px}.timeline-item summary>div:nth-child(2){flex:1}.timeline-dot{width:7px;height:7px;background:#a78bfa;border-radius:50%;flex:none}.timeline-item small{font-size:11px}.charts article{border-color:var(--edge);background:#100e1a}.muted{font-size:12px;line-height:1.5;margin:8px 0 4px}\n@media(min-width:651px){.overview-kpis .grid{grid-template-columns:repeat(6,minmax(0,1fr))}}\n@media(max-width:650px){header{padding:10px 14px}header b{font-size:16px}.desktop-nav{display:none}.navshell{display:block;border-bottom:1px solid var(--edge);background:#100e1b}.navtoggle{display:flex;align-items:center;gap:9px;list-style:none;padding:10px 14px;font-size:13px}.navtoggle::-webkit-details-marker{display:none}.navcurrent{margin-left:auto;color:var(--muted);font-size:11px}.navshell nav{padding:4px 10px 10px}.navshell nav a{padding:10px}main{padding:12px}.page-heading{margin-bottom:9px}h1{font-size:24px}.tag{font-size:10px;letter-spacing:1px}.filters{margin:10px 0 12px}.filters input,.filters select{font-size:14px;min-height:39px}.filters label{font-size:11px}.filters button{font-size:13px}.overview-kpis .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.overview-kpis .metric{padding:10px 11px}.metric b{font-size:21px}.metric small{font-size:11px}section{padding:12px;margin-bottom:10px}h2{font-size:16px;margin-bottom:9px}.charts{gap:7px}.charts article{padding:8px}.charts h3{font-size:13px}.creative-grid{grid-template-columns:1fr}.mini-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.compare-row{font-size:11px;gap:4px}.compare-head{font-size:10px}.fold summary{padding:11px 12px}.fold-body{padding:0 12px 12px}}\n";
 const styles='.navshell{margin:0;border:0;padding:0;border-radius:0;background:#120e20}.navtoggle{display:none}@media(max-width:650px){.navtoggle{display:block;padding:12px 16px;color:#c5a6ff}}*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;background:#0d0b17;color:#f5f1ff;font:14px system-ui,-apple-system,sans-serif}header{background:#171124;border-bottom:1px solid #33264b;padding:15px 22px;display:flex;align-items:center;justify-content:space-between;gap:12px}header b{font-size:19px;letter-spacing:-.5px}header b span{color:#b490ff}header form{margin:0}nav{display:flex;gap:7px;flex-wrap:wrap;padding:12px 20px;border-bottom:1px solid #2b213d;background:#120e20}nav a{padding:9px 11px;border-radius:8px;color:#bdb3d1;text-decoration:none;font-size:13px}nav a.active{background:#39255b;color:#e2d3ff}main{max-width:1400px;margin:auto;padding:24px}h1{font-size:29px;margin:0 0 8px}h2{font-size:18px;margin:0 0 14px}section,.metric{background:#191427;border:1px solid #35294a;border-radius:15px;padding:16px;margin:0 0 15px;min-width:0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:12px}.grid .metric{margin:0 0 12px}.metric b{font-size:24px;display:block;margin-top:8px;overflow-wrap:anywhere}.muted,small{color:#b0a5c5;line-height:1.6}small{display:block;font-size:12px}p{margin:8px 0 12px}a{color:#c3a4ff}button{border:0;background:#8853df;color:white;font:inherit;font-weight:650;border-radius:9px;padding:11px 14px;cursor:pointer}button:disabled{opacity:.45;cursor:not-allowed}.filters,.fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;align-items:end}.filters{margin:15px 0}.editor{display:grid;gap:10px;margin:10px 0}.editor button{justify-self:start}label{display:grid;gap:6px;color:#d6cce7;font-size:12px}input,select,textarea{width:100%;border:1px solid #433353;background:#100c1d;border-radius:9px;color:#f4f0fc;padding:10px;font:inherit;font-size:14px}textarea{resize:vertical}table{border-collapse:collapse;width:100%;min-width:620px}th,td{padding:12px 9px;text-align:left;border-bottom:1px solid #382d49;vertical-align:top}th{font-size:12px;color:#b6aacb}td small{overflow-wrap:anywhere}.scroll{overflow:auto}details,.signal,.stage{background:#130f21;padding:14px;border-radius:10px;margin:9px 0;border:1px solid #30243f}summary{cursor:pointer;font-weight:650}.stage{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;align-items:center}.stage strong{color:#c5a6ff}.tag{font-size:11px;color:#b897ff;letter-spacing:1.5px;text-transform:uppercase}.notice{padding:10px 13px;border-radius:9px;background:#251b38;color:#d7c9f0;margin:10px 0;line-height:1.6}@media(max-width:650px){header{padding:12px 14px}header b{font-size:16px}nav{padding:8px 12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;white-space:normal}nav a{padding:9px 8px;font-size:12px}main{padding:14px}h1{font-size:25px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.metric{padding:12px}.metric b{font-size:19px}.filters{grid-template-columns:repeat(2,minmax(0,1fr))}.filters label:nth-child(2),.filters button{grid-column:1/-1}.stage{grid-template-columns:1fr 1fr}.stage small{grid-column:1/-1}input,select,textarea{font-size:16px}.scroll{overflow:visible}table,tbody,tr,td{display:block;width:100%;min-width:0}thead{display:none}tbody tr{border:1px solid #382d49;border-radius:11px;padding:9px 12px;margin:10px 0;background:#130f21}td{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:10px;align-items:start;padding:8px 0;border-bottom:1px solid #2a213a;overflow-wrap:anywhere}td:before{content:attr(data-label);color:#b0a5c5;font-size:12px;font-weight:600}td:first-child{font-weight:700}td:last-child{border-bottom:0}td.empty{display:block}td.empty:before{display:none}.cellvalue{min-width:0;text-align:right}.cellvalue form{text-align:left}.cellvalue small{white-space:normal}.grid .metric{margin:0}.grid{margin-bottom:15px}}';
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0d0b17"><title>Eduverso Intelligence</title><style>'+styles+'.charts{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:12px}.charts article{min-width:0;background:#130f21;border:1px solid #35294a;border-radius:12px;padding:12px}.charts h3{font-size:14px;margin:0 0 8px}.trendchart{display:block;width:100%;height:auto}@media(max-width:650px){.charts{grid-template-columns:1fr}.charts article{padding:8px}}'+premiumStyles+'</style></head><body><header><b>Eduverso <span>Intelligence</span></b><form method="post" action="/logout">'+hidden+'<button>Sair</button></form></header><nav class="desktop-nav" aria-label="Menu principal desktop">'+Object.entries(names).map(([v,n])=>'<a class="'+(view===v?'active':'')+'" href="'+esc(urlFor(v))+'">'+esc(n)+'</a>').join('')+'</nav><details class="navshell"><summary class="navtoggle"><span aria-hidden="true">☰</span> Menu <span class="navcurrent">'+esc(names[view])+'</span></summary><nav aria-label="Menu principal">'+Object.entries(names).map(([v,n])=>'<a class="'+(view===v?'active':'')+'" href="'+esc(urlFor(v))+'">'+esc(n)+'</a>').join('')+'</nav></details><main><div class="page-heading"><div><div class="tag">Inteligência comercial</div><h1>'+esc(names[view])+'</h1></div><a class="refresh-link" href="'+esc(urlFor(view))+'" aria-label="Recarregar painel">↻ Atualizar</a></div><div class="statusbar"><span class="statusdot"></span><div><b>'+esc(last?'Última coleta: '+timeFmt(last.at):'Aguardando coleta')+'</b><small>'+esc(last?.source||'Sem fonte')+' · '+list.length+' campanhas · '+(ready()?'Meta direta':'Meta direta pendente')+'</small></div></div><form class="filters" method="get" action="/"><input type="hidden" name="view" value="'+esc(view)+'">'+select('campaign','Campanha',[['all','Todas monitoradas'],['excluded','Excluídas (histórico)'],...options],campaign)+input('from','De',from,'date','required')+input('to','Até',to,'date','required')+'<button>Filtrar</button></form>'+content+'</main></body></html>';
}
function collectionTable(campaign,from,to,filter){
 const runs=db.prepare("SELECT * FROM runs WHERE kind='insights' AND status='success' ORDER BY at DESC LIMIT 100").all();
 const result=[];for(const run of runs){const rs=db.prepare('SELECT o.*,c.scope FROM observations o LEFT JOIN campaigns c ON c.id=o.campaign_id WHERE run_id=? AND date BETWEEN ? AND ?').all(run.id,from,to).filter(filter);if(!rs.length)continue;const q=metrics(rs);result.push('<details class="timeline-item"><summary><span class="timeline-dot" aria-hidden="true"></span><div><b>'+esc(new Date(run.at).toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit'}))+'</b><small>'+esc(timeFmt(run.at).split(',')[0])+' · '+esc(run.source)+'</small></div><div class="timeline-amount"><strong>'+esc(displayMoney(q,'spend'))+'</strong><small>'+esc(display(q.clicks))+' cliques</small></div><span class="chevron" aria-hidden="true">+</span></summary>'+compactMetrics([['Impressões',display(q.impressions)],['Compras',display(q.purchases)],['Horário completo',timeFmt(run.at)]])+'</details>')}
 return (result.length?'<div class="timeline">'+result.join('')+'</div>':note('Nenhuma coleta no período.'))+note('Valores acumulados por coleta; não somar fotografias.');
}
function manage(f){
 const a=f.get('action'),id=f.get('id'),txt=(k,n=2000)=>clean(f.get(k),n).trim();
 if(a==='scope'){if(!validID(id)||!['tracked','excluded'].includes(f.get('scope')))throw Error('Escopo inválido');db.prepare('UPDATE campaigns SET scope=? WHERE id=?').run(f.get('scope'),id)}
 else if(a==='profile'){if(!validID(id)||!db.prepare('SELECT 1 FROM ads WHERE id=?').get(id))throw Error('Criativo inexistente');const keys=['format','angle','hook','voice','visual','audience','duration','transcript'];db.prepare('INSERT INTO profiles VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(ad_id) DO UPDATE SET format=excluded.format,angle=excluded.angle,hook=excluded.hook,voice=excluded.voice,visual=excluded.visual,audience=excluded.audience,duration=excluded.duration,transcript=excluded.transcript').run(id,...keys.map(k=>txt(k)))}
 else if(a==='decision'){const c=f.get('campaign_id'),h=txt('hypothesis'),d=txt('decision_action');if(!validID(c)||!h||!d||!db.prepare('SELECT 1 FROM campaigns WHERE id=?').get(c))throw Error('Preencha campanha, hipótese e decisão');db.prepare('INSERT INTO decisions(at,campaign_id,hypothesis,action,updated_at) VALUES(?,?,?,?,?)').run(now(),c,h,d,now())}
 else if(a==='outcome'){const status=f.get('status');if(!/^\d+$/.test(id||'')||!['planned','applied','validated','rejected','inconclusive'].includes(status))throw Error('Status inválido');db.prepare('UPDATE decisions SET status=?,outcome=?,updated_at=? WHERE id=?').run(status,txt('outcome'),now(),Number(id))}
 else if(a==='finance'){const d=f.get('date');if(!dateOK(d)||d>today())throw Error('Data inválida');const keys=['gross','fees','refunds','taxes','infra','other'];const vals=keys.map(k=>{const v=f.get(k);if(v!==null&&v!==''&&num(v)===null)throw Error('Valor financeiro inválido');return num(v)});db.prepare('INSERT INTO finance VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(date) DO UPDATE SET gross=excluded.gross,fees=excluded.fees,refunds=excluded.refunds,taxes=excluded.taxes,infra=excluded.infra,other=excluded.other,updated_at=excluded.updated_at').run(d,...vals,now())}
 else if(a==='import'){const p=JSON.parse(f.get('payload')||'');for(const v of Array.isArray(p)?p:[p])ingest(v)}
 else throw Error('Operação inválida');
}
function history(){return {campaigns:campaigns(),ads:allAds(),daily:db.prepare('SELECT * FROM daily ORDER BY date,ad_id').all(),runs:db.prepare('SELECT * FROM runs ORDER BY at').all(),observations:db.prepare('SELECT * FROM observations ORDER BY run_id,date,ad_id').all(),decisions:db.prepare('SELECT * FROM decisions').all(),finance:db.prepare('SELECT * FROM finance').all()}}
db.exec('CREATE TABLE IF NOT EXISTS dashboard_sessions(token_hash TEXT PRIMARY KEY,expires_at INTEGER NOT NULL); CREATE INDEX IF NOT EXISTS dashboard_sessions_expiry ON dashboard_sessions(expires_at)');
const TTL=30*24*60*60*1000;
const hash=x=>createHash('sha256').update(x).digest();
const eq=(a,b)=>timingSafeEqual(hash(String(a)),hash(String(b)));
const sid=req=>(req.headers.cookie||'').match(/(?:^|;\s*)eduverso_session=([a-f0-9]{64})(?:;|$)/)?.[1];
const sessionKey=token=>createHash('sha256').update(JSON.stringify([token,process.env.DASHBOARD_USERNAME||'admin',process.env.DASHBOARD_PASSWORD||''])).digest('hex');
const revoke=token=>{if(token)db.prepare('DELETE FROM dashboard_sessions WHERE token_hash=?').run(sessionKey(token))};
function allowed(req){const token=sid(req);if(!token)return false;const key=sessionKey(token),row=db.prepare('SELECT expires_at FROM dashboard_sessions WHERE token_hash=?').get(key);if(!row||row.expires_at<=Date.now()){if(row)revoke(token);return false}return true}
const cookie=(value,age)=>'eduverso_session='+value+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age='+age;
let failures=0, windowEnd=0;
function canAttempt(){if(Date.now()>=windowEnd){failures=0;windowEnd=Date.now()+60000}return failures<12}
function loginPage(error='',csrf=''){
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0c0918"><title>Eduverso Intelligence | Acesso interno</title><style>*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;background:radial-gradient(ellipse at 15% 10%,#30174d 0,transparent 48%),radial-gradient(ellipse at 100% 100%,#20163d 0,transparent 50%),#0c0918;color:#f7f4ff;font:15px system-ui,-apple-system,BlinkMacSystemFont,sans-serif;padding:24px}.shell{width:min(100%,960px);display:grid;grid-template-columns:1.1fr 1fr;border:1px solid #35294d;border-radius:26px;overflow:hidden;background:#151023;box-shadow:0 30px 100px #0007}.intro{padding:48px 38px;background:linear-gradient(150deg,#25173d,#171126);display:flex;flex-direction:column;justify-content:space-between;gap:30px}.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:760;letter-spacing:-.6px}.mark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#ad7aff,#7042dc);box-shadow:0 8px 24px #8850ff45}.mark svg{width:26px;height:26px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:2.1px;color:#c2a7ff;text-transform:uppercase}.intro h1{font-size:clamp(34px,4vw,48px);line-height:1.07;letter-spacing:-1.8px;margin:14px 0}.accent{color:#bb9aff}p{color:#b9afca;line-height:1.65;margin:0}.features{display:grid;gap:12px;color:#ddd1f3;font-size:14px}.features span{display:flex;gap:9px;align-items:center}.dot{width:7px;height:7px;background:#a477ff;border-radius:50%;box-shadow:0 0 12px #b48aff}.formside{padding:48px 36px;display:flex;flex-direction:column;justify-content:center}.formside h2{font-size:29px;margin:12px 0 8px;letter-spacing:-.8px}.formside form{display:grid;gap:16px;margin-top:28px}label{font-weight:600;font-size:13px;color:#e8e0f5;display:block;margin-bottom:8px}input{width:100%;background:#100d1c;border:1px solid #403451;border-radius:12px;padding:14px 15px;color:#fff;font:inherit;font-size:16px;outline:none}input:focus{border-color:#aa80ff;box-shadow:0 0 0 3px #9463ff25}button{min-height:48px;border:0;border-radius:12px;background:linear-gradient(105deg,#8957ec,#a575ff);color:white;font:inherit;font-weight:750;cursor:pointer;box-shadow:0 8px 25px #8253e52c}button:hover{filter:brightness(1.09)}.error{background:#481d36;border:1px solid #81415c;color:#ffd0df;border-radius:10px;padding:12px;font-size:13px}.foot{border-top:1px solid #322743;margin-top:28px;padding-top:18px;color:#a89db9;font-size:12px;display:flex;align-items:center;gap:8px}.foot svg{width:15px;height:15px;flex:none}@media(max-width:700px){body{padding:16px}.shell{grid-template-columns:1fr;border-radius:22px}.intro{padding:24px;gap:18px}.intro h1{font-size:30px;margin:9px 0}.intro p{font-size:13px}.features{display:none}.formside{padding:26px 24px 30px}.formside h2{font-size:26px}.formside form{margin-top:22px}.brand{font-size:20px}.mark{width:36px;height:36px}.foot{margin-top:22px}}</style></head><body><main class="shell"><section class="intro"><div class="brand"><span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19V5m0 14h18M7 15l4-4 3 3 6-7m-5 0h5v5"/></svg></span>Eduverso<span class="accent">Intelligence</span></div><div><div class="eyebrow">Central de inteligência comercial</div><h1>Dados que orientam <span class="accent">decisões.</span></h1><p>Monitoramento de campanhas, desempenho dos criativos e evolução comercial em um só lugar.</p></div><div class="features"><span><i class="dot"></i> Monitoramento de Meta Ads</span><span><i class="dot"></i> Histórico de desempenho</span><span><i class="dot"></i> Gestão de testes de criativos</span></div></section><section class="formside"><div class="eyebrow">Área administrativa</div><h2>Bem-vindo de volta</h2><p>Entre com suas credenciais para acessar o painel interno.</p><form method="post" action="/login"><input type="hidden" name="csrf" value="'+esc(csrf)+'">'+(error?'<div class="error" role="alert">'+esc(error)+'</div>':'')+'<div><label for="username">Usuário</label><input id="username" name="username" autocomplete="username" placeholder="Seu usuário" required maxlength="100"></div><div><label for="password">Senha</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Sua senha" required maxlength="256"></div><button type="submit">Acessar painel &rarr;</button></form><div class="foot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Acesso restrito · Eduverso Intelligence</div></section></main></body></html>';
}
// Dedicated ingestion credential; independent of the dashboard login and Meta token.
const ingestKeyHash=()=>setting('ingest_token_hash');
const tokenDigest=value=>createHash('sha256').update(value).digest('hex');
function ingestAuthorized(req){
 const expected=ingestKeyHash(),provided=(req.headers.authorization||'').match(/^Bearer (ei_[a-f0-9]{64})$/)?.[1];
 return !!expected&&!!provided&&eq(tokenDigest(provided),expected);
}
function issueIngestToken(){
 const token='ei_'+randomBytes(32).toString('hex');setSetting('ingest_token_hash',tokenDigest(token));setSetting('ingest_token_rotated_at',now());return token;
}
function json(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(obj))}
async function readJson(req){
 const length=Number(req.headers['content-length']||0);if(length>1024*1024){const e=Error('Payload acima de 1 MiB');e.status=413;throw e}
 let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>1024*1024){const e=Error('Payload acima de 1 MiB');e.status=413;throw e}chunks.push(chunk)}
 try{return JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{const e=Error('JSON inválido');e.status=400;throw e}
}
function validateExternal(p){
 if(!p||typeof p!=='object'||Array.isArray(p)||p.source!=='supermetrics'||p.account_id!==process.env.META_AD_ACCOUNT_ID||!/^act_\d+$/.test(p.account_id||''))throw Error('Fonte ou conta de anúncios inválida');
 if(typeof p.id!=='string'||!p.id.trim()||p.id.length>120||typeof p.at!=='string'||!/(?:Z|[+-]\d{2}:\d{2})$/.test(p.at)||!Number.isFinite(Date.parse(p.at)))throw Error('ID ou horário da coleta inválido');
 if(p.cache_used!==false)throw Error('A coleta precisa ser confirmada sem cache');
 if(!Array.isArray(p.rows)||!p.rows.length||p.rows.length>20000)throw Error('Quantidade de linhas inválida');
 const stamp=new Date(p.at).toISOString();if(Date.parse(stamp)>Date.now()+5*60000)throw Error('Horário futuro inválido');
 const dateOfCollection=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo'}).format(new Date(stamp));
 const rows=p.rows.map(r=>{
  if(!r||!dateOK(r.date)||r.date>dateOfCollection||!validID(r.campaign_id)||!validID(r.adset_id)||!validID(r.ad_id)||!['BRL'].includes(r.currency))throw Error('Data, moeda ou identificador inválido');
  for(const k of ['campaign_name','adset_name','ad_name'])if(typeof r[k]!=='string'||!r[k].trim()||r[k].length>300)throw Error('Nome de entidade inválido');
  for(const k of metricKeys)if(!Object.hasOwn(r,k)||(r[k]!==null&&(typeof r[k]!=='number'||!Number.isFinite(r[k])||r[k]<0)))throw Error('Métrica inválida ou ausente: '+k);
  return {date:r.date,campaign_id:r.campaign_id,campaign_name:r.campaign_name,adset_id:r.adset_id,adset_name:r.adset_name,ad_id:r.ad_id,ad_name:r.ad_name,currency:r.currency,...Object.fromEntries(metricKeys.map(k=>[k,r[k]]))};
 }).sort((a,b)=>(a.date+'|'+a.ad_id).localeCompare(b.date+'|'+b.ad_id));
 return {id:p.id,at:stamp,source:p.source,rows};
}
async function handleIngest(req,res){
 if(!ingestKeyHash()){json(res,503,{ok:false,error:'Integração ainda não habilitada'});return}
 if(!ingestAuthorized(req)){json(res,401,{ok:false,error:'Credencial de coleta inválida'});return}
 if(req.method==='GET'&&req.url==='/api/ingest/status'){
  const last=db.prepare("SELECT at,count,source FROM runs WHERE source='supermetrics' AND kind='insights' AND status='success' ORDER BY at DESC LIMIT 1").get();
  json(res,200,{ok:true,account_id:process.env.META_AD_ACCOUNT_ID,last_import:last||null,last_transport_at:setting('ingest_http_at')||null});return
 }
 if(req.method!=='POST'||req.url!=='/api/ingest'){json(res,405,{ok:false,error:'Método inválido'});return}
 if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||'')){json(res,415,{ok:false,error:'Use application/json'});return}
 try{
  const p=validateExternal(await readJson(req));const result=ingest(p);
  setSetting('ingest_http_at',now());console.info('INTEL_HTTP_IMPORT '+JSON.stringify({id:p.id,at:p.at,count:result.count,duplicate:result.duplicate}));
  json(res,result.duplicate?200:201,{ok:true,id:p.id,at:p.at,...result});
 }catch(e){const status=e.status||(/SQLITE|database|constraint/i.test(String(e.message))?500:400);if(status===500)console.error('INTEL_HTTP_ERROR',e.message);if(!res.destroyed)json(res,status,{ok:false,error:status===500?'Falha interna de armazenamento':clean(e.message,200)})}
}
function html(res,status,body){res.writeHead(status,{'Content-Type':'text/html; charset=utf-8'});res.end(body)}
const loginNonce=req=>(req.headers.cookie||'').match(/(?:^|;\s*)eduverso_login=([a-f0-9]{64})(?:;|$)/)?.[1]||'';
const sessionCsrf=req=>createHash('sha256').update('dashboard-csrf:'+sid(req)).digest('hex');
function showLogin(res,status=200,error=''){const nonce=randomBytes(32).toString('hex');res.setHeader('Set-Cookie','eduverso_login='+nonce+'; Path=/login; HttpOnly; Secure; SameSite=Lax; Max-Age=900');html(res,status,loginPage(error,nonce))}
function redirect(res,path){res.writeHead(303,{Location:path});res.end()}
async function formBody(req){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>1024*1024)throw Error('Payload too large');chunks.push(chunk)}return new URLSearchParams(Buffer.concat(chunks).toString())}
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
 if(req.url==='/health'){res.end('ok');return}
 if(req.url==='/api/ingest'||req.url==='/api/ingest/status'){await handleIngest(req,res);return}
 if(!process.env.DASHBOARD_PASSWORD){html(res,503,loginPage('Acesso administrativo ainda não configurado.'));return}
 if(req.method==='GET'&&req.url==='/login'){if(allowed(req)){redirect(res,'/');return}showLogin(res);return}
 if(req.method==='POST'&&req.url==='/login'){
  if(!canAttempt()){showLogin(res,429,'Muitas tentativas. Aguarde um minuto e tente novamente.');return}
  try{
   const f=await formBody(req);const nonce=loginNonce(req);if(!nonce||!eq(f.get('csrf')||'',nonce)){showLogin(res,403,'Sua sessão de login expirou. Tente novamente.');return}const validUser=eq(f.get('username')||'',process.env.DASHBOARD_USERNAME||'admin');const validPassword=eq(f.get('password')||'',process.env.DASHBOARD_PASSWORD);
   if(!validUser||!validPassword){failures++;showLogin(res,401,'Usuário ou senha incorretos.');return}
   db.prepare('DELETE FROM dashboard_sessions WHERE expires_at<=?').run(Date.now());
   revoke(sid(req));
   const token=randomBytes(32).toString('hex');db.prepare('INSERT INTO dashboard_sessions VALUES(?,?)').run(sessionKey(token),Date.now()+TTL);res.setHeader('Set-Cookie',[cookie(token,TTL/1000),'eduverso_login=; Path=/login; HttpOnly; Secure; SameSite=Lax; Max-Age=0']);redirect(res,'/');return
  }catch{if(!res.destroyed)showLogin(res,400,'Não foi possível processar o login.');return}
 }
 if(!allowed(req)){if(req.url.startsWith('/api/')){res.writeHead(401,{'Content-Type':'application/json'});res.end('{"error":"Acesso restrito"}');return}redirect(res,'/login');return}
 let f;
 if(req.method==='POST'){try{f=await formBody(req);if(!eq(f.get('csrf')||'',sessionCsrf(req))){html(res,403,'Sessão de formulário inválida. <a href="/">Voltar ao painel</a>');return}}catch{html(res,400,'Formulário inválido.');return}}
 if(req.method==='POST'&&req.url==='/logout'){revoke(sid(req));res.setHeader('Set-Cookie',cookie('',0));redirect(res,'/login');return}
 if(req.method==='POST'&&req.url==='/ingest-token'){
  const token=issueIngestToken();html(res,200,'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Credencial de coleta</title><style>body{background:#0c0b14;color:#f5f1ff;font:16px system-ui;padding:24px;max-width:640px;margin:auto}textarea{background:#191427;color:#f5f1ff;width:100%;box-sizing:border-box;padding:14px;border:1px solid #564070;border-radius:10px;font:14px monospace;overflow-wrap:anywhere}a{color:#c5a6ff}</style><h1>Credencial de coleta</h1><p>Copie e guarde a chave em um gerenciador de segredos. Ela é exibida somente agora. A credencial anterior foi revogada.</p><textarea readonly rows="4" aria-label="Credencial de coleta">'+esc(token)+'</textarea><p>Endpoint: POST /api/ingest · Authorization: Bearer · Content-Type: application/json</p><p><a href="/?view=settings">Voltar às integrações</a></p></html>');return
 }
 if(req.method==='POST'&&req.url==='/sync'){if(ready()&&!busy)void sync(true);redirect(res,'/?view=settings');return}
 if(req.method==='POST'&&req.url==='/manage'){try{manage(f);const back=Object.hasOwn(names,f.get('back'))?f.get('back'):'overview';redirect(res,'/?'+new URLSearchParams({view:back,campaign:f.get('filter_campaign')||'all',from:f.get('filter_from')||today(),to:f.get('filter_to')||today()}))}catch(e){html(res,400,'<p>'+esc(e.message)+'</p><a href="/">Voltar ao painel</a>')}return}
 if(req.method==='GET'&&req.url==='/api/history'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(history()));return}
 if(req.method==='GET'&&new URL(req.url,'http://localhost').pathname==='/'){try{html(res,200,page(sessionCsrf(req),new URL(req.url,'http://localhost')))}catch(e){console.error('Dashboard:',e.message);html(res,500,'<p>Falha ao carregar o painel.</p><a href="/">Tentar novamente</a>')}return}
 res.writeHead(404);res.end('Not found');
}).listen(Number(process.env.PORT||3000),'0.0.0.0');
if(ready()){sync();setInterval(sync,60*1000).unref()}
