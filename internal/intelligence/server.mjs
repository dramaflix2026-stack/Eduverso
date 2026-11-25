import http from 'node:http';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {timingSafeEqual,createHash,randomBytes,createHmac} from 'node:crypto';
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
CREATE TABLE IF NOT EXISTS funnel_events(event_id TEXT PRIMARY KEY,at TEXT NOT NULL,date TEXT NOT NULL,kind TEXT NOT NULL,session_hash TEXT NOT NULL,campaign_id TEXT,ad_id TEXT);
CREATE INDEX IF NOT EXISTS funnel_date ON funnel_events(date,kind);
CREATE INDEX IF NOT EXISTS funnel_session ON funnel_events(session_hash,at);
CREATE TABLE IF NOT EXISTS kiwify_orders(order_id TEXT PRIMARY KEY,product_id TEXT NOT NULL,product_name TEXT,approved_day TEXT,terminal_status TEXT,terminal_day TEXT,gross_cents INTEGER,fee_cents INTEGER,commission_cents INTEGER,received_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS kiwify_approved_day ON kiwify_orders(approved_day);
CREATE INDEX IF NOT EXISTS kiwify_terminal_day ON kiwify_orders(terminal_day);
CREATE TABLE IF NOT EXISTS learning_trials(id INTEGER PRIMARY KEY AUTOINCREMENT,campaign_id TEXT NOT NULL,created_at TEXT NOT NULL,rule TEXT NOT NULL,hypothesis TEXT NOT NULL,baseline_from TEXT NOT NULL,baseline_to TEXT NOT NULL,baseline_json TEXT NOT NULL,eval_from TEXT NOT NULL,eval_to TEXT NOT NULL,target_cpa REAL NOT NULL,status TEXT NOT NULL DEFAULT 'pending',result_json TEXT,evaluated_at TEXT,review TEXT,reviewed_at TEXT,UNIQUE(campaign_id,created_at,rule));
CREATE INDEX IF NOT EXISTS learning_trials_campaign ON learning_trials(campaign_id,status);
CREATE TABLE IF NOT EXISTS experiments(id INTEGER PRIMARY KEY AUTOINCREMENT,campaign_id TEXT NOT NULL,title TEXT NOT NULL,category TEXT NOT NULL,hypothesis TEXT NOT NULL,planned_action TEXT NOT NULL,metric TEXT NOT NULL,target REAL NOT NULL,days INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'planned',created_at TEXT NOT NULL,started_at TEXT,actual_action TEXT,base_from TEXT,base_to TEXT,baseline_json TEXT,eval_from TEXT,eval_to TEXT,result_json TEXT,evaluated_at TEXT,review TEXT,reviewed_at TEXT);
CREATE INDEX IF NOT EXISTS experiments_campaign_status ON experiments(campaign_id,status);
CREATE TABLE IF NOT EXISTS experiment_links(experiment_id INTEGER PRIMARY KEY,recommendation_id INTEGER NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS experiment_events(id INTEGER PRIMARY KEY AUTOINCREMENT,experiment_id INTEGER NOT NULL,at TEXT NOT NULL,kind TEXT NOT NULL,detail TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS experiment_events_exp ON experiment_events(experiment_id,at);
CREATE TABLE IF NOT EXISTS learning_daily(campaign_id TEXT NOT NULL,date TEXT NOT NULL,recorded_at TEXT NOT NULL,rule_version TEXT NOT NULL,metrics_json TEXT NOT NULL,alerts_json TEXT NOT NULL,PRIMARY KEY(campaign_id,date,rule_version));
CREATE TABLE IF NOT EXISTS strategy_recommendations(id INTEGER PRIMARY KEY AUTOINCREMENT,campaign_id TEXT NOT NULL,day TEXT NOT NULL,created_at TEXT NOT NULL,version TEXT NOT NULL,action TEXT NOT NULL,evidence_json TEXT NOT NULL,recommendation_json TEXT NOT NULL,review_status TEXT NOT NULL DEFAULT 'unreviewed',review_note TEXT,reviewed_at TEXT,UNIQUE(campaign_id,day,version,action));
CREATE INDEX IF NOT EXISTS strategy_campaign_day ON strategy_recommendations(campaign_id,day);
CREATE TABLE IF NOT EXISTS manager_decisions(id INTEGER PRIMARY KEY AUTOINCREMENT,campaign_id TEXT NOT NULL,fingerprint TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL,action TEXT NOT NULL,evidence_json TEXT NOT NULL,decision_json TEXT NOT NULL,proposal_json TEXT,status TEXT NOT NULL DEFAULT 'proposed',approved_at TEXT,review_note TEXT,experiment_id INTEGER,updated_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS manager_campaign_id ON manager_decisions(campaign_id,id);
CREATE TABLE IF NOT EXISTS manager_events(id INTEGER PRIMARY KEY AUTOINCREMENT,decision_id INTEGER NOT NULL,at TEXT NOT NULL,kind TEXT NOT NULL,detail TEXT NOT NULL);
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
const directMetaEnabled=()=>process.env.INTEL_META_DIRECT_ENABLED==='true';
const ready=()=>directMetaEnabled()&&/^act_\d+$/.test(process.env.META_AD_ACCOUNT_ID||'')&&/^v\d+\.\d+$/.test(metaVersion())&&!!process.env.META_ACCESS_TOKEN;
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
 let a;try{a=await metaGet(metaUrl('',{fields:'id,account_id,name,currency,timezone_name,account_status'}))}catch(e){throw Error('Conta de anúncios: '+e.message)}
 if(a.id!==process.env.META_AD_ACCOUNT_ID&&'act_'+a.account_id!==process.env.META_AD_ACCOUNT_ID)throw Error('Conta Meta inesperada');
 if(a.currency!=='BRL')throw Error('Moeda da conta diferente de BRL');
 if(a.timezone_name!=='America/Sao_Paulo')throw Error('Fuso da conta diferente de America/Sao_Paulo: '+clean(a.timezone_name,60));
 const d=today();
 let test;try{test=await metaGet(metaUrl('insights',{fields:'ad_id,spend,impressions',level:'ad',time_range:JSON.stringify({since:d,until:d}),limit:'1'}))}catch(e){throw Error('Permissão de Insights: '+e.message)}
 if(!Array.isArray(test.data))throw Error('Acesso a Insights não confirmado');
 console.info('META_CHECK_OK '+JSON.stringify({account:process.env.META_AD_ACCOUNT_ID,at:now()}));setSetting('meta_account_name',clean(a.name));setSetting('meta_checked_at',now());setSetting('meta_check_result','ok');setSetting('meta_check_error','');
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
 const stamp=now();if(!rows.length){console.info('META_INSIGHTS_EMPTY '+JSON.stringify({kind,since,until,at:stamp}));return {count:0,at:stamp}}const result=ingest({id:'meta-'+kind+'-'+since+'-'+stamp,at:stamp,source:'meta',rows:rows.map(metaRow)});console.info('META_INSIGHTS_OK '+JSON.stringify({kind,since,until,at:stamp,count:result.count}));return {count:result.count,at:stamp};
}
const elapsed=(k,minutes)=>!setting(k)||Date.now()-Date.parse(setting(k))>=minutes*60000;
function metaConnectionLabel(){
 if(!directMetaEnabled())return 'Desativada · fonte Supermetrics';
 if(!ready())return 'Aguardando token';
 if(setting('meta_check_result')==='error')return 'Acesso recusado ou falhou';
 if(setting('meta_check_result')!=='ok')return 'Aguardando teste';
 if(setting('meta_sync_result')==='error')return 'Falha na sincronização';
 if(setting('meta_sync_result')==='partial')return 'Sincronização parcial';
 if(setting('meta_hourly_result')==='empty')return 'Consulta sem linhas';
 if(!setting('meta_data_at'))return 'Acesso validado; sem importação comprovada';
 return elapsed('meta_data_at',240)?'Coleta direta desatualizada':'Coleta direta confirmada';
}
async function sync(force=false){
 if(!ready()||busy||(!force&&Date.now()-lastAttempt<5*60000))return {ok:false,reason:busy?'busy':'unavailable'};
 if(!force&&setting('meta_check_result')==='error'&&!elapsed('meta_checked_at',30))return {ok:false,reason:'permission_backoff'};
 busy=true;lastAttempt=Date.now();
 let discoveryFailed=false;
 try{
  if(force||elapsed('meta_checked_at',60)||setting('meta_check_result')!=='ok'){try{await checkMeta()}catch(e){setSetting('meta_checked_at',now());setSetting('meta_check_result','error');setSetting('meta_check_error',clean(e.message,200));throw e}}
  if(force||elapsed('discovery_at',30))try{await discover();setSetting('meta_discovery_error','')}catch(e){discoveryFailed=true;setSetting('meta_discovery_error',clean(e.message,200));console.warn('META_DISCOVERY_ERROR '+JSON.stringify({at:now(),error:clean(e.message,200)}));runStmt.run('discovery-error-'+now(),now(),'meta','discovery','failed',0,clean(e.message,200))}
  if(force||elapsed('hourly_at',60)){
   const d=today(),result=await insights(d,d,'hourly');setSetting('hourly_at',result.at);
   setSetting('meta_hourly_result',result.count>0?'imported':'empty');
   if(result.count>0)setSetting('meta_data_at',result.at);
  }
  if(elapsed('reconcile_at',1440)){
   const d=today(),configured=process.env.INTEL_START_DATE,lower=dayShift(d,-28);
   const first=dateOK(configured)?(!setting('reconcile_at')?configured:(configured>lower?configured:lower)):lower;
   for(let from=first;from<d;from=dayShift(from,14)){const to=dayShift(from,13)<d?dayShift(from,13):dayShift(d,-1);await insights(from,to,'reconcile')}
   setSetting('reconcile_at',now());
  }
  const partial=discoveryFailed||!!setting('meta_discovery_error');
  setSetting('meta_sync_result',partial?'partial':'ok');setSetting('meta_sync_error','');return {ok:!partial};
 }catch(e){console.warn('META_SYNC_ERROR '+JSON.stringify({at:now(),error:clean(e.message,200)}));setSetting('meta_sync_result','error');setSetting('meta_sync_error',clean(e.message,200));runStmt.run('sync-error-'+now(),now(),'meta','insights','failed',0,clean(e.message,200));return {ok:false}}finally{busy=false}
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
const costPer=(m,k)=>m.currencyOK&&m.spend.complete&&m[k].complete?ratio(m.spend.value,m[k].value):null;
const roasText=m=>m.roas===null?'—':m.roas.toFixed(2)+'x';
const spendShare=(m,base)=>m.currencyOK&&base.currencyOK&&m.spend.complete&&base.spend.complete?pct(ratio(m.spend.value,base.spend.value)):'—';
const campaigns=()=>db.prepare('SELECT * FROM campaigns ORDER BY scope DESC,seen_at DESC,name').all();
const allAds=()=>db.prepare('SELECT a.*,p.format,p.angle,p.hook,p.voice,p.visual,p.audience,p.duration,p.transcript,c.name campaign_name,c.scope FROM ads a LEFT JOIN profiles p ON p.ad_id=a.id LEFT JOIN campaigns c ON c.id=a.campaign_id ORDER BY c.name,a.name,a.id').all();
const names=Object.freeze({overview:'Visão geral',campaigns:'Campanhas',creatives:'Criativos',funnel:'Funil de conversão',tests:'Experimentos avançados',insights:'Gestor inteligente',decisions:'Histórico de decisões',learning:'Memória e aprendizado',finance:'Financeiro',settings:'Integrações'});
const mainNav=Object.entries(names).filter(([v])=>!['tests','decisions'].includes(v));
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
 const points=[];for(let d=from;d<=to&&points.length<366;d=dayShift(d,1)){const q=metrics(groups.get(d)||[]);points.push({label:d.slice(8,10)+'/'+d.slice(5,7)+(d===today()?'*':''),spend:q.currencyOK&&q.spend.complete?q.spend.value:null,clicks:q.clicks.complete?q.clicks.value:null,purchases:q.purchases.complete?q.purchases.value:null})}return points;
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
function funnelSummary(from,to,campaign,list){
 const records=db.prepare('SELECT event_id,at,date,kind,session_hash,campaign_id,ad_id FROM funnel_events WHERE date BETWEEN ? AND ? ORDER BY at,event_id').all(from,to);
 const groups=new Map();
 for(const e of records){if(!groups.has(e.session_hash))groups.set(e.session_hash,[]);groups.get(e.session_hash).push(e)}
 const excludedIds=new Set(list.filter(c=>c.scope==='excluded').map(c=>c.id));
 let sessions=0,views=0,engaged=0,cta=0,checkout=0,unknown=0,orphan=0;
 const match=id=>campaign==='all'?(!id||!excludedIds.has(id)):campaign==='excluded'?excludedIds.has(id):id===campaign;
 for(const es of groups.values()){
  const first=es.find(e=>e.kind==='landing_view');
  if(!first){if(match(es[0].campaign_id))orphan++;continue}
  const id=first.campaign_id;
  if(!match(id))continue;
  sessions++;if(!id||!list.some(c=>c.id===id))unknown++;
  const subsequent=es.filter(e=>e.at>=first.at);
  views+=subsequent.filter(e=>e.kind==='landing_view').length;
  if(subsequent.some(e=>e.kind==='engaged'))engaged++;
  if(subsequent.some(e=>e.kind==='cta_click'))cta++;
  if(subsequent.some(e=>e.kind==='checkout_redirect'))checkout++;
 }
 return {sessions,views,engaged,cta,checkout,unknown,orphan};
}
function funnelGraphic(stages,mode='previous'){
 const n=stages.length;
 return '<div class="funnel-graphic" role="list" aria-label="Funil esquemático">'+stages.map(([label,v],i)=>{
  const prev=mode==='base'?stages[0]?.[1]:stages[i-1]?.[1];
  const rate=i>0&&prev?.complete&&v.complete?ratio(v.value,prev.value):null;
  const width=100-(n>1?i/(n-1)*45:0);
  const info=i===0?'Base de observação':rate===null?'Taxa indisponível':pct(rate)+(mode==='base'?' das sessões':' da etapa anterior');
  return '<div role="listitem" class="funnel-step'+(v.value===null?' funnel-unknown':'')+'" style="--fw:'+width.toFixed(1)+'%;--fi:'+i+'"><div class="funnel-shape"><span>'+esc(label)+'</span><strong>'+esc(display(v))+'</strong><small>'+esc(info)+'</small></div></div>';
 }).join('')+'</div>'+note('Larguras esquemáticas para leitura; não proporcionais ao volume. Taxas somente com dados completos. — representa ausência de dado.');
}
function ownFunnel(from,to,campaign,list){
 const q=funnelSummary(from,to,campaign,list),last=setting('funnel_last_at'),hasEvents=!!last;
 const value=n=>q.sessions||q.orphan?integer(n):'—';
 const stageValue=n=>({value:q.sessions?n:null,complete:!!q.sessions});
 return block('Funil próprio · landing page',note(!hasEvents?'Aguardando conexão com a landing page. Não há dados próprios recebidos.':q.sessions?'Sessões observadas no período; não representa todos os visitantes.':'Nenhuma sessão com visualização de landing registrada no filtro.')+'<div class="grid">'+card('Sessões observadas',value(q.sessions))+card('Visualizações',value(q.views))+card('Sem campanha identificada',value(q.unknown))+'</div>'+funnelGraphic([['Sessões observadas',stageValue(q.sessions)],['Engajamento',stageValue(q.engaged)],['Clique no CTA',stageValue(q.cta)],['Saída para checkout',stageValue(q.checkout)]],'base')+note('Saída para checkout não significa checkout iniciado nem pagamento. Sessões são agrupadas pela primeira visualização registrada no período; cada etapa conta uma vez por sessão. Eventos sem visualização no filtro: '+integer(q.orphan)+'. Atribuição ausente fica separada da campanha original.')+note('Último evento recebido: '+timeFmt(last)));
}
function kiwifyConfigs(){
 const products=[['estudante',process.env.KIWIFY_PRODUCT_ID_ESTUDANTE,process.env.KIWIFY_WEBHOOK_TOKEN_ESTUDANTE],['professor',process.env.KIWIFY_PRODUCT_ID_PROFESSOR,process.env.KIWIFY_WEBHOOK_TOKEN_PROFESSOR]];
 const valid=products.filter(([plan,id,secret])=>typeof id==='string'&&/^[a-f0-9-]{36}$/i.test(id)&&typeof secret==='string'&&secret.length>=8).map(([plan,id,secret])=>({plan,id:id.toLowerCase(),secret}));
 if(new Set(valid.map(p=>p.secret)).size!==valid.length||new Set(valid.map(p=>p.id)).size!==valid.length)return [];
 return valid;
}
function kiwifyProducts(){return new Set(kiwifyConfigs().map(p=>p.id))}
function kiwifyReady(){return kiwifyConfigs().length>0}
function kiwifyAuth(raw,signature,configs){
 const matches=configs.filter(p=>kiwifyVerify(raw,signature,p.secret));
 return matches.length===1?matches[0]:null;
}
function kiwifySummary(from,to,campaign){
 const last=setting('kiwify_last_at');
 const sales=db.prepare('SELECT * FROM kiwify_orders WHERE approved_day BETWEEN ? AND ?').all(from,to);
 const returns=db.prepare("SELECT * FROM kiwify_orders WHERE terminal_day BETWEEN ? AND ?").all(from,to);
 const active=sales.filter(r=>!r.terminal_status);
 const cents=(rs,k)=>{if(!rs.length)return last?0:null;return rs.every(r=>r[k]!=null)?rs.reduce((sum,r)=>sum+r[k],0)/100:null};
 const count=rs=>last?integer(rs.length):'—';
 return block('Vendas confirmadas · Kiwify',note(!kiwifyReady()?'Aguardando token do webhook e IDs de produtos autorizados.':!last?'Recebimento habilitado; aguardando primeiro evento real.':'Último evento real: '+timeFmt(last))+(campaign!=='all'?note('Totais da operação no período, não atribuídos ao filtro de campanha.'):'')+'<div class="grid">'+card('Pagamentos aprovados',count(sales))+card('Vendas sem estorno registrado',count(active))+card('Valor aprovado',money(cents(sales,'gross_cents')))+card('Taxas informadas',money(cents(sales,'fee_cents')))+card('Comissão informada',money(cents(sales,'commission_cents')))+card('Reembolsos / chargebacks',count(returns))+'</div>'+note('Datas de aprovação conforme o dia informado pela Kiwify; estornos pelo dia informado, ou recebimento quando ausente. Valores em BRL; comissão informada não equivale a lucro nem saldo disponível. Cobertura começa nos eventos recebidos; não é histórico completo. Não somar com receitas atribuídas da Meta ou registros manuais.'));
}
const simulationFields=[['price','Ticket médio bruto (R$)',49.90,0.01,100000],['feePct','Taxas de pagamento (%)',0,0,100],['feeFixed','Taxa fixa por venda (R$)',0,0,100000],['taxPct','Impostos sobre receita retida (%)',0,0,100],['refundPct','Reembolsos previstos (%)',0,0,100],['variableCost','Custo variável por venda (R$)',0,0,100000],['fixedCost','Outros custos no período (R$)',0,0,10000000],['budget','Investimento diário em mídia (R$)',35.22,0,1000000],['days','Dias projetados',7,1,365],['cpa','CPA projetado (R$)',25,0.01,1000000],['marginPct','Margem desejada sobre receita retida (%)',20,0,100]];
function simulationInputs(params){
 const v={};for(const [k,label,initial,min,max] of simulationFields){const raw=params.get(k);const n=raw===null?initial:Number(raw);if(raw===''||!Number.isFinite(n)||n<min||n>max||(k==='days'&&!Number.isInteger(n)))throw Error('Valor inválido: '+label);v[k]=n}return v;
}
function calculateSimulation(v){
 const retained=v.price*(1-v.refundPct/100);
 const fees=v.price*v.feePct/100+v.feeFixed;
 const tax=retained*v.taxPct/100;
 const contribution=retained-fees-tax-v.variableCost;
 const spend=v.budget*v.days;
 const orders=spend/v.cpa;
 const gross=orders*v.price;
 const netRevenue=orders*retained;
 const profit=orders*contribution-spend-v.fixedCost;
 const margin=netRevenue>0?profit/netRevenue:null;
 const maxCpa=contribution>0?contribution*spend/(spend+v.fixedCost||1):null;
 const targetContribution=contribution-retained*v.marginPct/100;
 const targetCpa=targetContribution>0&&spend>0?targetContribution*spend/(spend+v.fixedCost):null;
 const breakEvenCpa=spend>0?maxCpa:null;
 const roas=spend>0?gross/spend:null;
 return {retained,fees,tax,contribution,spend,orders,gross,netRevenue,profit,margin,breakEvenCpa,targetCpa,breakEvenRoas:breakEvenCpa>0?v.price/breakEvenCpa:null,targetRoas:targetCpa>0?v.price/targetCpa:null,roas};
}
function simulationPanel(p,campaign,from,to,m){
 let v,error='';try{v=simulationInputs(p)}catch(e){error=e.message;v=simulationInputs(new URLSearchParams())}
 const q=calculateSimulation(v);
 const multiple=n=>n===null?'—':n.toFixed(2)+'x';
 const formFields=simulationFields.map(([k,label,initial,min,max])=>input(k,label,v[k],'number','required min="'+min+'" max="'+max+'" step="'+(k==='days'?'1':'0.01')+'"')).join('');
 const form='<form class="editor" method="get" action="/"><input type="hidden" name="view" value="finance"><input type="hidden" name="campaign" value="'+esc(campaign)+'"><input type="hidden" name="from" value="'+esc(from)+'"><input type="hidden" name="to" value="'+esc(to)+'"><div class="fields">'+formFields+'</div><button type="submit">Calcular projeção</button></form>';
 const scenarios=[.8,1,1.25,1.5,2].map(f=>{const x=calculateSimulation({...v,budget:v.budget*f});return cells([Math.round(f*100)+'%',money(v.budget*f),money(x.spend),integer(x.orders),money(x.gross),money(x.profit),x.margin===null?'—':pct(x.margin)])});
 const sensitivity=[.8,1,1.2,1.5].map(f=>{const x=calculateSimulation({...v,cpa:v.cpa*f});return cells([money(v.cpa*f),integer(x.orders),money(x.profit),x.margin===null?'—':pct(x.margin),multiple(x.roas)])});
 const result='<div class="grid">'+card('CPA máximo de equilíbrio',money(q.breakEvenCpa))+card('CPA máximo para margem alvo',money(q.targetCpa))+card('ROAS bruto de equilíbrio',multiple(q.breakEvenRoas))+card('ROAS bruto para margem alvo',multiple(q.targetRoas))+card('Contribuição por venda antes da mídia',money(q.contribution))+card('Lucro projetado',money(q.profit))+card('Margem projetada',q.margin===null?'—':pct(q.margin))+card('Vendas esperadas',integer(q.orders))+card('Investimento projetado',money(q.spend))+card('Receita bruta projetada',money(q.gross))+card('Receita retida projetada',money(q.netRevenue))+card('ROAS bruto projetado',multiple(q.roas))+'</div>';
 return block('Simulador de lucratividade e escala',note('Projeção hipotética, não resultado real. Ticket inicial de R$ 49,90 e orçamento de R$ 35,22 são exemplos editáveis. Preencha as taxas, reembolsos, custos, ticket médio (incluindo bump quando aplicável) e CPA estimado. Nenhuma taxa real é presumida.')+(error?'<div class="notice">'+esc(error)+'</div>':'')+note('CPA atribuído no filtro Meta: '+money(m.cpa)+' · use apenas se houver amostra representativa.')+form+result+note(q.contribution<=0?'A contribuição antes da mídia é negativa ou nula: não existe CPA positivo rentável nestas condições.':q.targetCpa===null?'Não existe CPA positivo para a margem alvo com estas premissas, ou o orçamento é zero.':'CPA máximo inclui os custos fixos do período projetado.')+note('Modelo conservador: taxas e custos variáveis são cobrados sobre todas as vendas aprovadas, inclusive reembolsadas; impostos sobre receita retida. Margem = lucro / receita após reembolsos. ROAS = receita bruta / mídia. Vendas esperadas são estimativas fracionárias, não promessas.'))+block('Cenários de orçamento',table(['Orçamento','Diário','Mídia total','Vendas esperadas','Receita bruta','Lucro','Margem'],scenarios)+note('Mantém o CPA constante para comparar cenários. A escala real pode elevar o CPA; não altera campanhas.'))+block('Sensibilidade à piora ou melhora do CPA',table(['CPA','Vendas esperadas','Lucro','Margem','ROAS bruto'],sensitivity)+note('Mesmo orçamento; CPA varia de 80% a 150% da premissa. Use esta tabela antes de decidir uma escala.'));
}
// Conservative screening rules, not a trained predictive model.
function diagnoseCampaign(q,context){
 const alerts=[],add=(level,title,why,next)=>alerts.push({level,title,why,next});
 if(!context.rowCount){add('neutral','Sem observações','Não há linhas de anúncio no filtro.','Aguardar coleta válida.');return alerts}
 if(context.stale)add('warning','Coleta desatualizada','A última observação do filtro é antiga para o dia atual.','Verificar integrações antes de interpretar desempenho.');
 if(!q.purchases.complete||!q.clicks.complete||!q.spend.complete||!q.impressions.complete||!q.currencyOK)add('warning','Cobertura incompleta','Métricas ausentes ou moeda não validada impedem conclusões financeiras.','Conferir origem e rastreamento; não converter ausências em zero.');
 if(!q.clicks.complete||q.clicks.value<100)add('neutral','Fase de observação','Menos de 100 cliques completos, ou cobertura desconhecida.','Manter coleta e não declarar vencedor por CTR isolado.');
 if(q.clicks.complete&&q.visits.complete&&q.clicks.value>=30&&ratio(q.visits.value,q.clicks.value)<.6)add('warning','Possível gargalo entre clique e página','Menos de 60% dos cliques aparecem como visitas atribuídas.','Testar carregamento, consentimento e rastreamento; não assumir causalidade.');
 if(q.visits.complete&&q.checkouts.complete&&q.visits.value>=50&&ratio(q.checkouts.value,q.visits.value)<.05)add('warning','Investigar oferta ou CTA','Menos de 5% das visitas aparecem como checkouts atribuídos.','Auditar clareza da oferta, botão e passagem ao checkout.');
 if(q.checkouts.complete&&q.purchases.complete&&q.checkouts.value>=20&&ratio(q.purchases.value,q.checkouts.value)<.2)add('warning','Investigar checkout','Menos de 20% dos checkouts aparecem como compras atribuídas.','Verificar pagamentos, preço e atribuição com a Kiwify.');
 if(q.purchases.complete&&q.spend.complete&&q.currencyOK&&q.purchases.value===0&&context.target>0&&q.spend.value>=3*context.target)add('warning','Investimento sem conversão atribuída','Gasto atingiu três vezes o CPA alvo informado e a fonte retornou zero compras.','Confirmar eventos e vendas reais; revisar manualmente o teste.');
 const stable=context.closedDays>=3&&context.closedPurchases>=10&&context.closedComplete&&context.closedCpa!==null&&context.target>0&&context.closedCpa<=context.target*.85;
 if(q.purchases.complete&&q.purchases.value>=10&&q.cpa!==null){
  if(!context.target)add('neutral','Definir CPA alvo','Há compras atribuídas, mas não existe meta financeira validada.','Calcular a margem e registrar o CPA alvo no painel.');
  else if(q.cpa>context.target)add('warning','CPA acima do alvo','CPA atribuído supera a meta financeira informada.','Conferir vendas reais e investigar criativos e funil antes de ampliar orçamento.');
  else if(stable&&!context.stale&&q.clicks.complete&&q.clicks.value>=100&&q.cpa<=context.target*.85)add('positive','Elegível para estudar escala','CPA atribuído com folga de 15% e ao menos três dias encerrados com dez compras completas.','Conciliar receita real e estabilidade diária; simular piora do CPA antes de decidir.');
  else add('neutral','Conversões observadas','Existe sinal de conversão, mas ainda falta maturidade ou folga financeira para estudar escala.','Acompanhar dias completos e validar pagamentos.');
 }
 if(!alerts.length)add('neutral','Monitoramento ativo','Não houve disparo das regras nesta seleção.','Continuar monitorando sem alteração automática.');
 return alerts;
}
function diagnoseContext(rows,target){
 const closed=rows.filter(r=>r.date<today()),cq=metrics(closed),lastAt=rows.reduce((a,r)=>r.at&&r.at>a?r.at:a,'');
 return {rowCount:rows.length,target,stale:rows.some(r=>r.date===today())&&(!lastAt||Date.now()-Date.parse(lastAt)>4*3600000),closedDays:new Set(closed.map(r=>r.date)).size,closedPurchases:cq.purchases.complete?cq.purchases.value:0,closedComplete:cq.purchases.complete&&cq.spend.complete&&cq.currencyOK,closedCpa:cq.cpa};
}
function diagnosticPanel(rows,byAd,adBy,byCampaign,list,campaign,m,form){
 const exact=list.some(c=>c.id===campaign),target=exact?num(setting('target_cpa:'+campaign)):null;
 const targetForm=exact?form('target_cpa','<input type="hidden" name="id" value="'+esc(campaign)+'">'+input('target_cpa','CPA alvo validado (R$)',target??'','number','min="0.01" max="1000000" step="0.01"')+note('Deixe vazio para remover a meta. Use o simulador financeiro com seus custos reais antes de definir.')):note('Selecione uma campanha específica para configurar sua meta financeira.');
 const render=alerts=>alerts.map(a=>'<article class="signal"><small>'+esc(a.level==='warning'?'ATENÇÃO':a.level==='positive'?'EVIDÊNCIA PARA REVISÃO':'OBSERVAÇÃO')+'</small><b>'+esc(a.title)+'</b>'+note(a.why)+note('Próximo passo: '+a.next)+'</article>').join('');
 const campaignsHtml=exact?'':list.filter(c=>byCampaign.has(c.id)&&(campaign==='excluded'?c.scope==='excluded':c.scope!=='excluded')).map(c=>{const rs=byCampaign.get(c.id),q=metrics(rs),t=num(setting('target_cpa:'+c.id));return fold(c.name||c.id,render(diagnoseCampaign(q,diagnoseContext(rs,t))))}).join('');
 const ads=[...byAd].map(([id,rs])=>{const q=metrics(rs);const evidence=!q.impressions.complete||!q.clicks.complete?'Dados incompletos':q.clicks.value<30||q.impressions.value<1000?'Amostra inicial':!q.purchases.complete?'Conversão incompleta':q.purchases.value<5?'Poucas compras atribuídas':'Sinal exploratório, não vencedor';return cells([adBy.get(id)?.name||id,rs[0].campaign_name,displayMoney(q,'spend'),display(q.clicks),pct(q.ctr),money(q.cpc),display(q.purchases),money(q.cpa),evidence])});
 const alerts=diagnoseCampaign(m,diagnoseContext(rows,target));
 return block('Diagnóstico assistido · regras v1',note('Regras conservadoras de triagem; limites são hipóteses operacionais, não benchmarks universais. Não inferem causalidade nem são machine learning treinado.')+render(alerts)+targetForm)+(!exact&&campaignsHtml?block('Diagnóstico por campanha',campaignsHtml):'')+block('Evidência por criativo',table(['Criativo','Campanha','Gasto','Cliques','CTR','CPC','Compras','CPA','Maturidade'],ads)+note('Não classificar vencedores entre campanhas com públicos, objetivos ou ofertas diferentes. Compras da Meta são atribuídas, não pagamentos confirmados.'));
}
const learningVersion='rules-v1';
function evidenceSnapshot(rows,from,to){
 const q=metrics(rows),span=Math.round((Date.parse(to+'T12:00:00Z')-Date.parse(from+'T12:00:00Z'))/86400000)+1;
 const days=new Set(rows.map(r=>r.date)).size;
 return {days,expectedDays:span,spend:q.spend.complete&&q.currencyOK?q.spend.value:null,purchases:q.purchases.complete?q.purchases.value:null,clicks:q.clicks.complete?q.clicks.value:null,cpa:q.cpa,complete:days===span&&q.spend.complete&&q.purchases.complete&&q.currencyOK};
}
const learningRows=(id,from,to)=>db.prepare('SELECT * FROM daily WHERE campaign_id=? AND date BETWEEN ? AND ? ORDER BY date,ad_id').all(id,from,to);
function evaluateTrial(snapshot,target){
 if(!snapshot.complete||snapshot.spend===null||snapshot.purchases===null)return 'inconclusive';
 if(snapshot.purchases===0&&snapshot.spend>=3*target)return 'target_missed';
 if(snapshot.purchases<10||snapshot.cpa===null)return 'inconclusive';
 return snapshot.cpa<=target?'target_met':'target_missed';
}
function refreshLearning(){
 // Only observed campaign data; no extrapolation of missing dates or missing conversions.
 const d=today(),closed=dayShift(d,-1),from=dayShift(closed,-6);
 const list=campaigns().filter(c=>c.scope==='tracked');
 tx(()=>{
 for(const c of list){
  const rs=learningRows(c.id,from,closed);if(!rs.length)continue;
  const q=metrics(rs),target=num(setting('target_cpa:'+c.id));
  const evidence=evidenceSnapshot(rs,from,closed);
  const alerts=diagnoseCampaign(q,diagnoseContext(rs,target));
  db.prepare('INSERT OR IGNORE INTO learning_daily VALUES(?,?,?,?,?,?)').run(c.id,closed,now(),learningVersion,JSON.stringify({...evidence,from,to:closed,target}),JSON.stringify(alerts));
 }
 // Wait two complete calendar days after the evaluation window for reporting lag.
 const cutoff=dayShift(d,-3);
 const pending=db.prepare("SELECT * FROM learning_trials WHERE status='pending' AND eval_to<=?").all(cutoff);
 for(const t of pending){
  const c=list.find(x=>x.id===t.campaign_id);if(!c)continue;
  const snapshot=evidenceSnapshot(learningRows(t.campaign_id,t.eval_from,t.eval_to),t.eval_from,t.eval_to);
  // Missing data can arrive later. Keep pending until seven additional days, then mark inconclusive.
  if(!snapshot.complete&&t.eval_to>dayShift(d,-10))continue;
  const status=evaluateTrial(snapshot,t.target_cpa);
  db.prepare('UPDATE learning_trials SET status=?,result_json=?,evaluated_at=? WHERE id=? AND status=?').run(status,JSON.stringify(snapshot),now(),t.id,'pending');
 }
 });
}
function learningPanel(campaign,list,form,options){
 const allowedIds=new Set(list.filter(c=>campaign==='all'?c.scope==='tracked':campaign==='excluded'?c.scope==='excluded':c.id===campaign).map(c=>c.id));
 const trials=db.prepare('SELECT * FROM learning_trials ORDER BY id DESC LIMIT 300').all().filter(t=>allowedIds.has(t.campaign_id));
 const snapshots=db.prepare('SELECT * FROM learning_daily ORDER BY date DESC,campaign_id LIMIT 500').all().filter(t=>allowedIds.has(t.campaign_id));
 const tracked=list.filter(c=>c.scope==='tracked'),trackedOptions=tracked.map(c=>[c.id,c.name||c.id]);
 const states={pending:'Aguardando janela',target_met:'Meta observada atingida',target_missed:'Meta observada não atingida',inconclusive:'Inconclusivo'};
 const eligible=trials.filter(t=>['target_met','target_missed'].includes(t.status)),met=eligible.filter(t=>t.status==='target_met').length;
 const current=tracked.find(c=>c.id===campaign)||tracked[0];
 const create=tracked.length?form('learning_trial',select('campaign_id','Campanha',trackedOptions,current?.id)+select('rule','Tipo de hipótese',[['observe','Manter / observar'],['creative','Teste de criativo'],['offer','Teste de oferta / funil'],['budget','Teste de orçamento']],'observe')+area('hypothesis','Hipótese e mudança planejada')+input('trial_target','CPA alvo observado (R$)',current?setting('target_cpa:'+current.id)||'':'','number','required min="0.01" max="1000000" step="0.01"')+input('trial_days','Dias completos de avaliação',7,'number','required min="3" max="30" step="1"')+note('A linha de base usa os sete dias completos anteriores. Avaliação inicia amanhã, com janela fixa e espera de dois dias completos para atribuição. Não altera anúncios.')):note('Nenhuma campanha monitorada disponível.');
 const items=trials.map(t=>{
  const base=JSON.parse(t.baseline_json),result=t.result_json?JSON.parse(t.result_json):null;
  return '<details><summary>'+esc(states[t.status]||t.status)+' · '+esc(list.find(c=>c.id===t.campaign_id)?.name||t.campaign_id)+'<small>'+esc(t.eval_from+' a '+t.eval_to+' · CPA alvo '+money(t.target_cpa))+'</small></summary>'+note(t.hypothesis)+compactMetrics([['CPA anterior',money(base.cpa)],['Compras anteriores',integer(base.purchases)],['Cobertura anterior',base.days+'/'+base.expectedDays+' dias'],['CPA observado',money(result?.cpa)],['Compras observadas',integer(result?.purchases)],['Cobertura observada',result?result.days+'/'+result.expectedDays+' dias':'—']])+note('O resultado indica cumprimento da meta atribuída, não prova efeito da intervenção.')+(t.status==='pending'?note('A avaliação será automática após o prazo e a disponibilidade de dados.'):form('learning_review','<input type="hidden" name="id" value="'+t.id+'">'+area('review','Revisão humana / contexto / alterações realmente aplicadas',t.review||'')))+'</details>';
 }).join('');
 const evidence=snapshots.slice(0,30).map(t=>{const q=JSON.parse(t.metrics_json),alerts=JSON.parse(t.alerts_json);return cells([t.date,list.find(c=>c.id===t.campaign_id)?.name||t.campaign_id,money(q.spend),integer(q.purchases),money(q.cpa),q.days+'/'+q.expectedDays,alerts.map(a=>a.title).join(' · ')])});
 return block('Memória estratégica · validação prospectiva','<div class="grid">'+card('Hipóteses registradas',integer(trials.length))+card('Aguardando avaliação',integer(trials.filter(t=>t.status==='pending').length))+card('Resultados avaliáveis',integer(eligible.length))+card('Metas observadas atingidas',eligible.length?pct(met/eligible.length):'—')+'</div>'+note('A taxa mede metas atingidas entre avaliações conclusivas, não precisão de uma IA nem efeito causal. Sem pagamentos conciliados, CPA é o atribuído pela Meta.'))+block('Novas hipóteses',note('Registre novos experimentos no Laboratório de testes. Os registros anteriores permanecem abaixo.'))+block('Histórico de hipóteses',items||note('Ainda não há hipóteses registradas.'))+block('Memória automática das campanhas',note('Uma fotografia imutável por campanha e dia encerrado, com janela retrospectiva de sete dias. Não soma coletas acumuladas.')+table(['Dia de referência','Campanha','Gasto','Compras','CPA','Dias cobertos','Diagnósticos'],evidence));
}
// Statistical estimates are conditional on the observed reporting source and spend.
function closedEvidence(rows){
 const q=metrics(rows),days=new Set(rows.map(r=>r.date)).size,sources=[...new Set(rows.map(r=>r.source))];
 const valid=rows.length>0&&q.currencyOK&&q.spend.complete&&q.purchases.complete&&q.spend.value>0&&sources.length===1&&typeof sources[0]==='string';
 return {days,source:sources.length===1?sources[0]:null,spend:valid?q.spend.value:null,purchases:valid?q.purchases.value:null,valid};
}
function rateEstimate(e,minDays=3,minEvents=20){
 if(!e.valid||e.days<minDays||e.purchases<minEvents)return null;
 const rate=e.purchases/e.spend,cpa=1/rate,delta=1.96/Math.sqrt(e.purchases);
 return {rate,cpa,low:cpa*Math.exp(-delta),high:cpa*Math.exp(delta)};
}
function historicalModel(own,hold,peers){
 if(!own.valid||own.days<14||own.purchases<30||!hold.valid||hold.days!==7||own.source!==hold.source)return null;
 const base=own.purchases/own.spend,eligible=peers.filter(e=>e.valid&&e.days>=7&&e.purchases>=10&&e.source===own.source);
 const sum=eligible.reduce((a,e)=>({spend:a.spend+e.spend,purchases:a.purchases+e.purchases}),{spend:0,purchases:0});
 // Limit borrowed evidence to 20% of own observed spend, never more.
 const borrowed=eligible.length>=2&&sum.purchases>=30?Math.min(own.spend*.2,sum.spend):0;
 const transferred=borrowed>0?(own.purchases+borrowed*(sum.purchases/sum.spend))/(own.spend+borrowed):null;
 const predicted=base*hold.spend,peerPredicted=transferred===null?null:transferred*hold.spend;
 return {base,transferred,predicted,peerPredicted,actual:hold.purchases,error:Math.abs(predicted-hold.purchases),peerError:peerPredicted===null?null:Math.abs(peerPredicted-hold.purchases),peerCount:eligible.length,borrowed};
}
function statisticalPanel(campaign,list,adBy,form){
 const eligible=list.filter(c=>c.scope==='tracked');
 const end=dayShift(today(),-3),holdStart=dayShift(end,-6),trainEnd=dayShift(holdStart,-1),trainStart=dayShift(trainEnd,-27);
 const current=eligible.find(c=>c.id===campaign);
 const cohort=c=>clean(setting('learning_cohort:'+c.id),80).trim().toLowerCase();
 const trainRows=db.prepare("SELECT d.* FROM daily d JOIN campaigns c ON c.id=d.campaign_id WHERE c.scope='tracked' AND d.date BETWEEN ? AND ? ORDER BY d.date,d.ad_id").all(trainStart,trainEnd);
 const testRows=db.prepare("SELECT d.* FROM daily d JOIN campaigns c ON c.id=d.campaign_id WHERE c.scope='tracked' AND d.date BETWEEN ? AND ? ORDER BY d.date,d.ad_id").all(holdStart,end);
 const selected=eligible.filter(c=>campaign==='all'||c.id===campaign);
 const evalRows=[],readiness=[];
 for(const c of selected){
  const own=closedEvidence(trainRows.filter(r=>r.campaign_id===c.id)),hold=closedEvidence(testRows.filter(r=>r.campaign_id===c.id));
  const peerCandidates=cohort(c)&&c.objective?eligible.filter(p=>p.id!==c.id&&cohort(p)===cohort(c)&&p.objective===c.objective):[];
  const peers=peerCandidates.map(p=>closedEvidence(trainRows.filter(r=>r.campaign_id===p.id)));
  const x=historicalModel(own,hold,peers);
  readiness.push(cells([c.name,own.days+'/28',integer(own.purchases),hold.days+'/7',own.source||'—',x?'Avaliação disponível':'Dados insuficientes ou incompatíveis']));
  if(x)evalRows.push(cells([c.name,integer(x.actual),integer(x.predicted),integer(x.error),integer(x.peerPredicted),integer(x.peerError),x.borrowed>0?x.peerCount+' pares; '+money(x.borrowed)+' de peso':'Não habilitada']));
 }
 const adGroups=new Map();
 for(const row of [...trainRows,...testRows]){if(!selected.some(c=>c.id===row.campaign_id))continue;if(!adGroups.has(row.ad_id))adGroups.set(row.ad_id,[]);adGroups.get(row.ad_id).push(row)}
 const ads=[...adGroups].map(([id,rs])=>{
  const e=closedEvidence(rs),q=metrics(rs),x=rateEstimate(e),ad=adBy.get(id);
  return cells([ad?.name||id,ad?.campaign_name||rs[0].campaign_id,e.days,display(q.impressions),pct(q.ctr),display(q.purchases),money(q.cpa),x?money(x.low)+' – '+money(x.high):'—',x?'Estimativa exploratória':'Amostra insuficiente']);
 });
 const cohortForm=current?form('learning_cohort','<input type="hidden" name="id" value="'+esc(current.id)+'">'+input('cohort','Grupo de campanhas comparáveis',setting('learning_cohort:'+current.id)||'','text','maxlength="80"')+note('Use o mesmo grupo apenas para campanhas com produto, preço, público, posicionamentos e atribuição comparáveis. Objetivo Meta e fonte de métricas também devem coincidir. Deixe vazio para desativar transferência.')):note('Selecione uma campanha monitorada para classificar seu grupo.');
 return block('Motor estatístico · beta',note('Janela de treinamento: '+trainStart+' a '+trainEnd+'; janela de teste temporal: '+holdStart+' a '+end+'. Os dois dias completos mais recentes são excluídos por atraso de atribuição.')+note('Modelo inicial: taxa histórica de compras atribuídas por real investido, ajustada apenas quando há pares explicitamente comparáveis. Não utiliza dados da janela de teste para estimar a taxa. Requer pelo menos 14 dias com observações, 30 compras no treino e sete dias cobertos no teste; não comprova cobertura de todos os anúncios.')+table(['Campanha','Dias treino','Compras treino','Dias teste','Fonte','Maturidade'],readiness)+cohortForm)+block('Validação temporal fora do treino',table(['Campanha','Compras observadas','Estimativa própria','Erro absoluto','Com transferência','Erro com transferência','Pares / peso'],evalRows)+note('Usa o gasto efetivamente observado na janela de teste. É uma avaliação retrospectiva condicional ao gasto, não previsão de vendas futuras. Um único período não demonstra superioridade. A transferência exige dois pares com pelo menos dez compras cada e 30 no total, com peso limitado a 20% do gasto próprio. Não altera anúncios.'))+block('Incerteza por criativo',table(['Criativo','Campanha','Dias','Impressões','CTR','Compras','CPA observado','Intervalo CPA 95% aprox.','Evidência'],ads)+note('Intervalo aproximado no modelo de Poisson com taxa estável, pelo menos 20 compras completas, três dias e uma única fonte. Não incorpora mudanças de público, atribuição ou leilão; não é garantia de confiança nem teste causal entre criativos.'));
}
const strategyVersion='strategy-v3';
function experimentEvent(id,kind,detail){db.prepare('INSERT INTO experiment_events(experiment_id,at,kind,detail) VALUES(?,?,?,?)').run(id,now(),kind,clean(detail,2000));}
function expRef(id){return 'EXP-'+String(id).padStart(3,'0')}
function expLink(id){return db.prepare('SELECT recommendation_id FROM experiment_links WHERE experiment_id=?').get(id)?.recommendation_id??null}
function workflowNav(view,campaign){return '<div class="workflow-nav">'+[['insights','Gestor inteligente'],['learning','Memória e aprendizado']].map(([v,l])=>'<a class="'+(v===view?'current':'')+'" href="?'+esc(new URLSearchParams({view:v,campaign}).toString())+'">'+esc(l)+'</a>').join('')+'</div>'}
function workflowContext(c){
 const active=db.prepare("SELECT id,title,status,eval_from,eval_to FROM experiments WHERE campaign_id=? AND status='running' ORDER BY id DESC").all(c);
 const prior=db.prepare("SELECT id,title,category,metric,target,status,result_json,review,reviewed_at FROM experiments WHERE campaign_id=? AND status IN ('target_met','target_missed','inconclusive') ORDER BY evaluated_at DESC,id DESC LIMIT 5").all(c);
 return {active,prior};
}
function proposalFor(action){
 const props={observe:['strategy','Manter campanha em observação','Verificar se a campanha atinge uma meta de eficiência sem alterar suas configurações.','Observar sem alterar campanha, criativos ou orçamento.'],hold:['strategy','Consolidar evidências da campanha','Verificar se os resultados permanecem compatíveis com a meta definida.','Manter configuração atual durante a janela.'],funnel:['landing','Investigar gargalo do funil','Uma alteração isolada na etapa indicada pode melhorar a métrica selecionada.','Definir uma única mudança manual e confirmar a execução no laboratório.'],review_zero:['offer','Investigar ausência de conversões','Uma revisão isolada de oferta ou checkout pode melhorar conversões após validação do rastreamento.','Validar pagamentos e escolher uma única intervenção manual.'],review_cpa:['strategy','Revisar eficiência de aquisição','Uma intervenção isolada pode aproximar o CPA da meta financeira.','Definir uma única mudança manual depois da conciliação.'],study_scale:['budget','Avaliar hipótese de escala','Uma mudança de investimento previamente aprovada pode manter o CPA dentro da meta.','Simular custos e aprovar manualmente antes de alterar qualquer orçamento.']};
 return props[action]||null;
}
function strategyDecision(e){
 const make=(action,title,priority,maturity,risk,why,next,gate)=>({action,title,priority,maturity,risk,why,next,gate});
 if(!e.rows||!e.todayRows||!e.fresh)return make('data','Verificar atualização dos dados','Alta','Insuficiente','Indeterminado','Não existe coleta recente do dia para esta campanha.','Confirmar a origem e atualizar a coleta.','Dados atuais com horário verificável.');
 if(!e.complete||!e.oneSource)return make('tracking','Validar rastreamento e cobertura','Alta','Insuficiente','Alto','Compras, gastos ou cliques incompletos, moeda inválida ou fontes misturadas.','Conciliar Meta, landing page e pagamentos antes de decidir.','Métricas completas e fonte comparável.');
 if(e.workflow?.active?.length)return make('experiment_active','Acompanhar experimento em andamento','Normal','Em avaliação','Alto para mudanças paralelas','Existe uma avaliação ativa nesta campanha. Evite intervenções conflitantes.','Acompanhar a janela e registrar ocorrências no laboratório.','Concluir ou cancelar justificadamente o experimento antes de propor outra intervenção.');
 if(e.funnelIssue)return make('funnel','Investigar gargalo de conversão','Alta','Exploratória','Moderado',e.funnelIssue,'Testar a etapa indicada e registrar a hipótese.','Confirmar rastreamento e mudança em teste controlado.');
 if(!e.target)return make('target','Definir CPA alvo rentável','Média','Financeira pendente','Alto','Ainda não há meta financeira registrada para a campanha.','Preencher custos reais no simulador e salvar CPA alvo.','CPA alvo validado pelo responsável.');
 if(e.purchases===0&&e.spend>=3*e.target)return make('review_zero','Revisar investimento sem conversões','Alta','Sinal operacional','Alto','Gasto observado de pelo menos três CPAs alvo e zero compras explicitamente retornadas.','Confirmar vendas e atribuição; revisar oferta e criativos manualmente.','Conciliação financeira e hipótese registrada.');
 if(e.closedDays<3||e.clicks<100||e.closedPurchases<10)return make('observe','Manter em observação','Normal','Inicial','Alto para escalar','A janela não atingiu os requisitos mínimos de volume e dias encerrados.','Aguardar novas coletas sem declarar vencedor.','100 cliques, três dias encerrados e dez compras atribuídas, no mínimo.');
 if(e.cpa!==null&&e.cpa>e.target)return make('review_cpa','Revisar CPA acima da meta','Alta','Exploratória','Alto','CPA atribuído da janela recente supera a meta registrada.','Avaliar funil e criativos; verificar receita efetiva.','CPA compatível com margem e pagamentos conciliados.');
 if(e.closedDays>=7&&e.closedPurchases>=20&&e.intervalHigh!==null&&e.intervalHigh<=e.target&&e.cpa!==null&&e.cpa<=e.target*.85&&e.dailyStable)return make('study_scale','Estudar cenário de escala','Média','Estatística exploratória','Moderado a alto','CPA com folga de 15%, limite superior aproximado abaixo da meta e estabilidade nos dias observados.','Simular piora do CPA e avaliar manualmente a margem antes de qualquer ajuste.','Conciliar vendas reais; aprovar cenário e teste manual. Não é autorização para aumentar orçamento.');
 return make('hold','Manter e consolidar evidências','Normal','Exploratória','Moderado','Há observações, mas não há evidência suficiente para estudar escala com segurança.','Acompanhar dias encerrados e revisar dispersão do CPA.','Sete dias maduros, 20 compras, intervalo e estabilidade compatíveis com a meta.');
}
function strategyEvidence(c){
 const d=today(),from=dayShift(d,-6),end=dayShift(d,-3),matureFrom=dayShift(end,-6);
 const rs=learningRows(c.id,from,d),closed=learningRows(c.id,matureFrom,end),q=metrics(rs),cq=metrics(closed);
 const target=num(setting('target_cpa:'+c.id)),tr=rs.filter(r=>r.date===d),stamp=tr.reduce((a,r)=>r.at&&r.at>a?r.at:a,'');
 const sources=new Set([...rs,...closed].map(r=>r.source));
 const e=closedEvidence(closed),interval=rateEstimate(e,7,20);
 const grouped=new Map();for(const row of closed){if(!grouped.has(row.date))grouped.set(row.date,[]);grouped.get(row.date).push(row)}
 const dailyStable=grouped.size===7&&target>0&&[...grouped.values()].every(g=>{const x=metrics(g);return x.cpa!==null&&x.cpa<=target*1.25});
 let funnelIssue=null;
 if(q.clicks.complete&&q.visits.complete&&q.clicks.value>=30&&q.visits.value/q.clicks.value<.6)funnelIssue='Menos de 60% dos cliques aparecem como visitas atribuídas.';
 else if(q.visits.complete&&q.checkouts.complete&&q.visits.value>=50&&q.checkouts.value/q.visits.value<.05)funnelIssue='Menos de 5% das visitas aparecem como checkouts atribuídos.';
 else if(q.checkouts.complete&&q.purchases.complete&&q.checkouts.value>=20&&q.purchases.value/q.checkouts.value<.2)funnelIssue='Menos de 20% dos checkouts aparecem como compras atribuídas.';
 return {from,to:d,matureFrom,matureTo:end,rows:rs.length,todayRows:tr.length,fresh:!!stamp&&Date.now()-Date.parse(stamp)<=4*3600000,stamp:stamp||null,complete:q.currencyOK&&q.spend.complete&&q.purchases.complete&&q.clicks.complete&&q.impressions.complete,oneSource:sources.size===1&&![undefined,null].includes([...sources][0]),source:sources.size===1?[...sources][0]:null,target,spend:q.spend.complete&&q.currencyOK?q.spend.value:null,purchases:q.purchases.complete?q.purchases.value:null,clicks:q.clicks.complete?q.clicks.value:null,cpa:q.cpa,closedDays:e.days,closedPurchases:e.valid?e.purchases:null,intervalHigh:interval?.high??null,dailyStable,funnelIssue,workflow:workflowContext(c.id)};
}
function refreshStrategy(){
 const d=today();
 for(const c of campaigns().filter(x=>x.scope==='tracked')){
  const e=strategyEvidence(c),r=strategyDecision(e);
  db.prepare('INSERT OR IGNORE INTO strategy_recommendations(campaign_id,day,created_at,version,action,evidence_json,recommendation_json) VALUES(?,?,?,?,?,?,?)').run(c.id,d,now(),strategyVersion,r.action,JSON.stringify(e),JSON.stringify(r));
 }
}
function strategyPanel(campaign,list,form){
 const selected=list.filter(c=>c.scope==='tracked'&&(campaign==='all'||campaign===c.id));
 const ids=new Set(selected.map(c=>c.id)),history=db.prepare('SELECT * FROM strategy_recommendations ORDER BY id DESC LIMIT 500').all().filter(r=>ids.has(r.campaign_id));
 const reviews=history.filter(r=>['helpful','incorrect','inconclusive'].includes(r.review_status));
 const labels={unreviewed:'Não revisada',helpful:'Útil / adequada',incorrect:'Inadequada',inconclusive:'Inconclusiva'};
 const render=selected.map(c=>{
  const e=strategyEvidence(c),r=strategyDecision(e),wf=e.workflow;
  const rec=history.find(t=>t.campaign_id===c.id&&t.day===today()&&t.version===strategyVersion&&t.action===r.action);
  const linked=rec?db.prepare('SELECT experiment_id FROM experiment_links WHERE recommendation_id=?').get(rec.id):null;
  const proposal=proposalFor(r.action);
  const controls=linked?note('Experimento vinculado: '+expRef(linked.experiment_id)+' · consulte o Laboratório.'):proposal&&rec&&!wf.active.length?'<details><summary>Criar experimento a partir desta recomendação</summary>'+form('experiment_from_recommendation','<input type="hidden" name="id" value="'+rec.id+'">'+input('title','Nome do experimento',proposal[1],'text','required maxlength="120"')+select('category','Categoria',Object.entries(experimentCategories),proposal[0])+area('hypothesis','Hipótese',proposal[2])+area('planned_action','Ação planejada',proposal[3])+select('metric','Métrica principal',Object.entries(experimentMetrics),'cpa')+input('target','Meta numérica (confirme unidade)',e.target??'','number','required min="0.01" max="1000000" step="0.01"')+select('days','Dias completos',[3,5,7,14,30].map(n=>[String(n),n+' dias']),'7')+note('Cria apenas um plano vinculado à recomendação; não executa nem inicia o teste. Confirme a meta.'))+'</details>':r.action==='data'||r.action==='tracking'?note('Prioridade técnica: valide a coleta e o rastreamento antes de criar um teste de desempenho.'):r.action==='target'?note('Valide o CPA alvo no Financeiro antes de propor um teste de rentabilidade.'):'';
  const context=(wf.active.length?note('Teste ativo: '+wf.active.map(x=>expRef(x.id)+' · '+x.title+' · '+expState(x)).join(' | ')):'')+(wf.prior.length?table(['Experimento anterior','Métrica','Resultado observado','Revisão humana'],wf.prior.map(x=>cells([expRef(x.id)+' · '+x.title,experimentMetrics[x.metric]||x.metric,experimentStates[x.status],x.review||'Pendente']))):note('Ainda não há resultados de experimentos anteriores para esta campanha.'));
  return '<article class="signal"><small>'+esc(c.name||c.id)+' · Prioridade '+esc(r.priority)+'</small><h3>'+esc(r.title)+'</h3>'+compactMetrics([['Maturidade',r.maturity],['Risco da decisão',r.risk],['CPA observado',money(e.cpa)],['CPA alvo',money(e.target)],['Gasto recente',money(e.spend)],['Compras atribuídas',integer(e.purchases)],['Dias maduros',e.closedDays+'/7'],['Limite superior CPA',money(e.intervalHigh)]])+note(r.why)+note('Próximo passo: '+r.next)+note('Condição: '+r.gate)+note('Coleta do dia: '+timeFmt(e.stamp)+' · '+(e.source||'fonte não uniforme'))+context+controls+'</article>';
 }).join('');
 const items=history.slice(0,40).map(t=>{
  const r=JSON.parse(t.recommendation_json),e=JSON.parse(t.evidence_json);
  return '<details><summary>'+esc(r.title)+' · '+esc(labels[t.review_status]||t.review_status)+'<small>'+esc((list.find(c=>c.id===t.campaign_id)?.name||t.campaign_id)+' · '+timeFmt(t.created_at))+'</small></summary>'+note(r.why)+note(r.next)+compactMetrics([['CPA observado',money(e.cpa)],['CPA alvo registrado',money(e.target)],['Compras',integer(e.purchases)],['Gasto',money(e.spend)]])+form('strategy_review','<input type="hidden" name="id" value="'+t.id+'">'+select('review_status','Avaliação humana',Object.entries(labels),t.review_status)+area('review_note','Justificativa e resultado observado',t.review_note||''))+'</details>';
 }).join('');
 return block('Recomendação estratégica atual',note('Calculada independentemente do filtro de datas: últimos sete dias até hoje e sete dias maduros encerrados há pelo menos dois dias completos. Risco e prioridade são classificações qualitativas, não probabilidades. Nenhuma alteração na Meta.')+(render||note('Selecione uma campanha monitorada. Campanhas excluídas não recebem recomendações.')))+block('Memória das recomendações','<div class="grid">'+card('Registros recentes',integer(history.length))+card('Revisões humanas',integer(reviews.length))+card('Consideradas úteis',integer(reviews.filter(x=>x.review_status==='helpful').length))+card('Consideradas inadequadas',integer(reviews.filter(x=>x.review_status==='incorrect').length))+'</div>'+note('Fotografia automática da primeira ocorrência de cada ação por campanha e dia. A recomendação atual é recalculada ao abrir a página. Avaliação humana não equivale a acurácia preditiva. Use Aprendizado para avaliar hipóteses prospectivas.')+(items||note('Aguardando primeiro registro automático.')));
}
const experimentCategories=Object.freeze({creative:'Criativos',audience:'Público',budget:'Orçamento',landing:'Landing page',offer:'Oferta e checkout',strategy:'Estratégia'});
const experimentMetrics=Object.freeze({cpa:'CPA Meta (R$) ≤',roas:'ROAS Meta (x) ≥',ctr:'CTR de link (%) ≥',cpc:'CPC de link (R$) ≤',purchases:'Compras atribuídas ≥',checkouts:'Checkouts Meta ≥',conversion:'Compras / visitas (%) ≥'});
const experimentMetricKeys=Object.freeze({cpa:['spend','purchases'],roas:['spend','revenue','purchases'],ctr:['clicks','impressions'],cpc:['spend','clicks'],purchases:['purchases'],checkouts:['checkouts'],conversion:['purchases','visits']});
const experimentStates=Object.freeze({planned:'Planejado',running:'Em andamento',target_met:'Meta atingida',target_missed:'Meta não atingida',inconclusive:'Inconclusivo',cancelled:'Cancelado'});
const expFmt=(k,v)=>v===null||v===undefined?'—':['cpa','cpc'].includes(k)?money(v):k==='roas'?v.toFixed(2)+'x':['ctr','conversion'].includes(k)?pct(v/100):integer(v);
function expEvidence(c,from,to,metric){
 const rs=learningRows(c,from,to),q=metrics(rs),days=new Set(rs.map(r=>r.date)).size,expected=Math.round((Date.parse(to+'T12:00:00Z')-Date.parse(from+'T12:00:00Z'))/86400000)+1;
 const sources=[...new Set(rs.map(r=>r.source))],source=sources.length===1?sources[0]:null;
 const known=k=>q[k].complete?q[k].value:null;
 const required=experimentMetricKeys[metric]||[];
 const coverage=days===expected&&!!source&&required.length>0&&required.every(k=>q[k].complete)&&(!required.some(k=>k==='spend'||k==='revenue')||q.currencyOK);
 const raw={cpa:q.cpa,roas:q.roas,ctr:q.ctr===null?null:100*q.ctr,cpc:q.cpc,purchases:known('purchases'),checkouts:known('checkouts'),conversion:q.purchases.complete&&q.visits.complete&&q.visits.value>0?100*q.purchases.value/q.visits.value:null};
 return {from,to,days,expected,source,coverage,value:coverage?raw[metric]:null,spend:q.currencyOK?known('spend'):null,impressions:known('impressions'),clicks:known('clicks'),visits:known('visits'),purchases:known('purchases'),checkouts:known('checkouts'),cpa:q.cpa,roas:q.roas,ctr:raw.ctr,cpc:q.cpc};
}
function expOutcome(e,metric,target){
 if(!e.coverage)return {status:'inconclusive',reason:'Cobertura incompleta ou fontes diferentes na janela.'};
 if(metric==='cpa'&&e.purchases===0&&e.spend>=3*target)return {status:'target_missed',reason:'Zero compras explicitamente retornadas e gasto de pelo menos três vezes o CPA alvo.'};
 if(e.value===null)return {status:'inconclusive',reason:'Métrica não calculável.'};
 if((['cpa','roas'].includes(metric)&&!(e.purchases>=10))||(metric==='ctr'&&!(e.impressions>=1000))||(metric==='cpc'&&!(e.clicks>=30))||(metric==='conversion'&&!(e.visits>=100&&e.purchases>=10)))return {status:'inconclusive',reason:'Amostra abaixo do mínimo operacional definido para a métrica.'};
 return {status:(['cpa','cpc'].includes(metric)?e.value<=target:e.value>=target)?'target_met':'target_missed',reason:'Meta observada comparada à janela fixa. Não demonstra causalidade.'};
}
function refreshExperiments(){
 const d=today(),cutoff=dayShift(d,-3);
 tx(()=>{for(const e of db.prepare("SELECT e.* FROM experiments e JOIN campaigns c ON c.id=e.campaign_id WHERE e.status='running' AND e.eval_to<=? AND c.scope='tracked'").all(cutoff)){
  const result=expEvidence(e.campaign_id,e.eval_from,e.eval_to,e.metric);
  if(!result.coverage&&e.eval_to>dayShift(d,-10))continue;
  const outcome=expOutcome(result,e.metric,e.target);
  db.prepare("UPDATE experiments SET status=?,result_json=?,evaluated_at=? WHERE id=? AND status='running'").run(outcome.status,JSON.stringify({...result,reason:outcome.reason}),now(),e.id);experimentEvent(e.id,'evaluated',experimentStates[outcome.status]+' · '+outcome.reason);
 }});
}
function expState(e){return e.status==='running'?(today()<e.eval_from?'Agendado':today()>e.eval_to?'Em avaliação':'Em andamento'):experimentStates[e.status]||e.status}
function experimentRows(campaign,list){
 const allowed=new Set(list.filter(c=>campaign==='all'?c.scope==='tracked':campaign==='excluded'?c.scope==='excluded':c.id===campaign).map(c=>c.id));
 return db.prepare('SELECT * FROM experiments ORDER BY id DESC').all().filter(e=>allowed.has(e.campaign_id));
}
function experimentPanel(campaign,list,form,readOnly=false){
 const rows=experimentRows(campaign,list),tracked=list.filter(c=>c.scope==='tracked'),eligible=rows.filter(e=>['target_met','target_missed'].includes(e.status)),met=eligible.filter(e=>e.status==='target_met').length;
 const options=tracked.map(c=>[c.id,c.name||c.id]),current=tracked.find(c=>c.id===campaign)||tracked[0];
 const active=rows.filter(e=>e.status==='running'),finished=rows.filter(e=>['target_met','target_missed','inconclusive'].includes(e.status));
 const stats='<div class="grid">'+[['Experimentos',rows.length],['Planejados',rows.filter(e=>e.status==='planned').length],['Em andamento',active.filter(e=>today()<=e.eval_to).length],['Em avaliação',active.filter(e=>today()>e.eval_to).length],['Meta atingida',met],['Meta não atingida',eligible.length-met],['Inconclusivos',rows.filter(e=>e.status==='inconclusive').length],['Taxa de metas atingidas',eligible.length?pct(met/eligible.length):'—']].map(([k,v])=>card(k,v)).join('')+'</div>';
 const categories='<div class="experiment-categories">'+Object.entries(experimentCategories).map(([k,v])=>'<div><b>'+esc(v)+'</b><small>'+esc({creative:'Gancho, formato, narração',audience:'Segmentação e público',budget:'Investimento e distribuição',landing:'Copy, CTA e experiência',offer:'Preço, bônus e checkout',strategy:'Manutenção e observação'}[k])+'</small></div>').join('')+'</div>';
 const create=tracked.length?form('experiment_create',input('title','Nome do experimento','','text','required maxlength="120"')+'<div class="fields">'+select('campaign_id','Campanha',options,current?.id)+select('category','Categoria',Object.entries(experimentCategories),'strategy')+'</div>'+area('hypothesis','Hipótese verificável')+area('planned_action','Ação planejada (uma variável ou observação)')+'<div class="fields">'+select('metric','Métrica principal',Object.entries(experimentMetrics),'cpa')+input('target','Meta numérica','','number','required min="0.01" max="1000000" step="0.01"')+select('days','Dias completos de avaliação',[3,5,7,14,30].map(n=>[String(n),n+' dias']),'7')+'</div>'+note('CPA e CPC: limite máximo em reais. CTR e conversão: percentual (ex.: 2 significa 2%). ROAS: múltiplo. Compras e checkouts: quantidade inteira na janela. Salvar cria um plano, não altera a Meta.')):note('Nenhuma campanha monitorada disponível.');
 const items=rows.filter(e=>!readOnly||finished.includes(e)).map(e=>{
  const b=e.baseline_json?JSON.parse(e.baseline_json):null,r=e.result_json?JSON.parse(e.result_json):null;
  const same=b?.coverage&&r?.coverage&&b.source===r.source&&b.expected===r.expected&&b.value!==null&&r.value!==null;
  const compare=same?expFmt(e.metric,r.value-b.value):'—';
  const actions=readOnly?'':e.status==='planned'?form('experiment_start','<input type="hidden" name="id" value="'+e.id+'">'+area('actual_action','Confirme a ação realmente executada ou que iniciou apenas observação')+note('A avaliação inicia amanhã. A linha de base são os mesmos dias de duração, terminando há três dias.')):'';
  const cancel=!readOnly&&['planned','running'].includes(e.status)?form('experiment_cancel','<input type="hidden" name="id" value="'+e.id+'">'+area('review','Justificativa do cancelamento')+note('Cancela apenas o registro interno.')):'';
  const review=!readOnly&&finished.includes(e)?form('experiment_review','<input type="hidden" name="id" value="'+e.id+'">'+area('review','Revisão humana, contexto e aprendizado',e.review||'')):'';
  return '<details class="experiment-item"><summary><span>EXP-'+String(e.id).padStart(3,'0')+' · '+esc(e.title)+'</span><small>'+esc(expState(e))+'</small></summary>'+note((list.find(c=>c.id===e.campaign_id)?.name||e.campaign_id)+' · '+experimentCategories[e.category]+' · '+experimentMetrics[e.metric]+' '+expFmt(e.metric,e.target))+(expLink(e.id)!==null?note('Origem: recomendação #'+expLink(e.id)):'')+note('Hipótese: '+e.hypothesis)+note('Plano: '+e.planned_action)+(e.actual_action?note('Execução informada: '+e.actual_action):'')+note(e.eval_from?'Avaliação: '+e.eval_from+' a '+e.eval_to:'Ainda não iniciado.')+compactMetrics([['Linha de base',expFmt(e.metric,b?.value)],['Resultado',expFmt(e.metric,r?.value)],['Diferença (mesma duração/fonte)',compare],['Cobertura anterior',b?b.days+'/'+b.expected:'—'],['Cobertura observada',r?r.days+'/'+r.expected:'—'],['Fonte observada',r?.source||'—']])+table(['Indicador','Antes','Depois'],[['Investimento',money(b?.spend),money(r?.spend)],['Impressões',integer(b?.impressions),integer(r?.impressions)],['CTR',expFmt('ctr',b?.ctr),expFmt('ctr',r?.ctr)],['CPC',money(b?.cpc),money(r?.cpc)],['Checkouts',integer(b?.checkouts),integer(r?.checkouts)],['Compras',integer(b?.purchases),integer(r?.purchases)],['CPA',money(b?.cpa),money(r?.cpa)],['ROAS',expFmt('roas',b?.roas),expFmt('roas',r?.roas)]].map(cells))+(r?note(r.reason):'')+(e.review?note('Revisão: '+e.review):'')+actions+cancel+review+'</details>';
 }).join('');
 if(readOnly)return block('Aprendizado · experimentos concluídos',note('Resultados provenientes do Laboratório de testes, sem duplicar registros. Metas atingidas não são prova de causalidade.')+items+(items?'':note('Nenhum experimento concluído.')));
 return block('Painel de experimentos',stats+note('Contadores do histórico da campanha selecionada; a janela de avaliação de cada experimento é independente do filtro de datas.'))+block('Categorias de teste',categories)+block('Novo experimento',create)+block('Experimentos e resultados',items||note('Nenhum experimento registrado.'));
}
function workflowHistory(campaign,list){
 const rows=experimentRows(campaign,list);
 const events=rows.flatMap(e=>{
  const saved=db.prepare('SELECT * FROM experiment_events WHERE experiment_id=? ORDER BY at,id').all(e.id);
  const inferred=[];
  if(!saved.some(x=>x.kind==='created'))inferred.push({at:e.created_at,kind:'created',detail:e.planned_action});
  if(e.started_at&&!saved.some(x=>x.kind==='started'))inferred.push({at:e.started_at,kind:'started',detail:e.actual_action});
  if(e.evaluated_at&&!saved.some(x=>x.kind==='evaluated'))inferred.push({at:e.evaluated_at,kind:'evaluated',detail:experimentStates[e.status]});
  if(e.reviewed_at&&!saved.some(x=>x.kind==='reviewed'||x.kind==='cancelled'))inferred.push({at:e.reviewed_at,kind:e.status==='cancelled'?'cancelled':'reviewed',detail:e.review});
  return [...saved,...inferred].map(x=>({...x,exp:e}));
 }).sort((a,b)=>String(b.at).localeCompare(String(a.at)));
 const labels={created:'Plano registrado',started:'Execução informada',evaluated:'Avaliação automática',reviewed:'Revisão humana',cancelled:'Cancelado'};
 return block('Linha do tempo automática dos experimentos',note('Histórico integral da campanha selecionada. Eventos do laboratório aparecem aqui automaticamente; decisões avulsas continuam abaixo.')+table(['Horário Brasília','Campanha','Experimento','Evento','Registro'],events.slice(0,300).map(x=>cells([timeFmt(x.at),list.find(c=>c.id===x.exp.campaign_id)?.name||x.exp.campaign_id,expRef(x.exp.id)+' · '+x.exp.title,labels[x.kind]||x.kind,x.detail]))));
}
const managerStatus={proposed:'Aguardando aprovação',approved:'Aprovada · acompanhamento',awaiting_execution:'Aprovada · execução manual pendente',monitoring:'Em acompanhamento',resolved:'Concluída',declined:'Solicitada revisão',superseded:'Substituída por análise mais recente'};
const managerActions={data:'Manter sem alterações · atualizar dados',tracking:'Manter sem alterações · validar rastreamento',experiment_active:'Manter experimento em acompanhamento',target:'Manter · definir CPA rentável',observe:'Manter em observação',hold:'Manter e consolidar',funnel:'Investigar gargalo',review_zero:'Revisar ausência de conversões',review_cpa:'Revisar eficiência',study_scale:'Estudar escala'};
function managerEvent(id,kind,detail){db.prepare('INSERT INTO manager_events(decision_id,at,kind,detail) VALUES(?,?,?,?)').run(id,now(),kind,clean(detail,2000))}
function managerProposal(e,r){
 const p=proposalFor(r.action);if(!p||!e.target||e.workflow.active.length)return null;
 const previous=e.workflow.prior.find(x=>x.category===p[0]&&x.metric==='cpa'&&x.status==='target_missed');
 return {category:p[0],title:p[1],hypothesis:p[2],action:p[3],metric:'cpa',target:e.target,days:7,observation:['observe','hold'].includes(r.action),caution:previous?'Meta anterior não atingida em '+expRef(previous.id)+'. Revise a hipótese antes de repetir uma intervenção.':null};
}
function managerAnalysis(c){
 const e=strategyEvidence(c),r=strategyDecision(e),proposal=managerProposal(e,r);
 const q=metrics(learningRows(c.id,e.from,e.to));
 const fingerprint=createHash('sha256').update(JSON.stringify([c.id,e.stamp,e.target,r.action,e.workflow.active.map(x=>x.id),e.workflow.prior.map(x=>[x.id,x.status,x.reviewed_at]),e.complete,e.oneSource,e.fresh,q.spend.value,q.clicks.value,q.visits.value,q.checkouts.value,q.purchases.value,q.revenue.value])).digest('hex');
 return {e,r,proposal,q,fingerprint};
}
function managerEnsure(c){
 const {e,r,proposal,fingerprint}=managerAnalysis(c);
 return tx(()=>{
  let row=db.prepare('SELECT * FROM manager_decisions WHERE fingerprint=?').get(fingerprint);
  const older=db.prepare("SELECT * FROM manager_decisions WHERE campaign_id=? AND fingerprint<>? AND status IN ('proposed','approved','awaiting_execution')").all(c.id,fingerprint);
  for(const old of older){
   if(old.status==='approved'&&old.action===r.action)continue;
   if(old.status==='awaiting_execution'&&old.action===r.action&&e.fresh&&e.complete&&e.oneSource&&proposal&&JSON.parse(old.proposal_json||'null')?.target===proposal.target)continue;
   const technical=['data','tracking','target'].includes(old.action);
   const fixed=old.action==='data'?e.fresh:old.action==='tracking'?e.complete&&e.oneSource:old.action==='target'?!!e.target:false;
   const status=old.status==='approved'&&technical&&fixed?'resolved':'superseded';
   db.prepare('UPDATE manager_decisions SET status=?,updated_at=? WHERE id=?').run(status,now(),old.id);
   managerEvent(old.id,status,status==='resolved'?'Condição técnica confirmada pela nova análise.':'Análise atualizada; proposta anterior preservada no histórico.');
  }
  if(!row){const result=db.prepare('INSERT INTO manager_decisions(campaign_id,fingerprint,created_at,action,evidence_json,decision_json,proposal_json,updated_at) VALUES(?,?,?,?,?,?,?,?)').run(c.id,fingerprint,now(),r.action,JSON.stringify(e),JSON.stringify(r),proposal?JSON.stringify(proposal):null,now());const id=Number(result.lastInsertRowid);managerEvent(id,'generated',r.title);row=db.prepare('SELECT * FROM manager_decisions WHERE id=?').get(id);}
  return row;
 });
}
function refreshManager(){
 for(const c of campaigns().filter(x=>x.scope==='tracked'))managerEnsure(c);
 tx(()=>{for(const d of db.prepare("SELECT d.id,e.status,e.result_json FROM manager_decisions d JOIN experiments e ON e.id=d.experiment_id WHERE d.status='monitoring' AND e.status IN ('target_met','target_missed','inconclusive','cancelled')").all()){
  db.prepare("UPDATE manager_decisions SET status='resolved',updated_at=? WHERE id=?").run(now(),d.id);managerEvent(d.id,'resolved',experimentStates[d.status]||d.status);
 }});
}
function startManagerExperiment(d,p,actual){
 const c=d.campaign_id,day=today(),from=dayShift(day,1),to=dayShift(day,p.days),baseTo=dayShift(day,-3),baseFrom=dayShift(baseTo,1-p.days);
 if(db.prepare("SELECT 1 FROM experiments WHERE campaign_id=? AND status='running'").get(c)||db.prepare("SELECT 1 FROM learning_trials WHERE campaign_id=? AND status='pending' AND eval_from<=? AND eval_to>=?").get(c,to,from))throw Error('Já existe avaliação ativa. Nenhum experimento duplicado foi criado.');
 const base=expEvidence(c,baseFrom,baseTo,p.metric);
 const result=db.prepare("INSERT INTO experiments(campaign_id,title,category,hypothesis,planned_action,metric,target,days,status,created_at,started_at,actual_action,base_from,base_to,baseline_json,eval_from,eval_to) VALUES(?,?,?,?,?,?,?,?,'running',?,?,?,?,?,?,?,?)").run(c,p.title,p.category,p.hypothesis,p.action,p.metric,p.target,p.days,now(),now(),actual,baseFrom,baseTo,JSON.stringify(base),from,to);
 const id=Number(result.lastInsertRowid);experimentEvent(id,'created','Gerado automaticamente pela decisão #'+d.id);experimentEvent(id,'started',actual);
 db.prepare("UPDATE manager_decisions SET status='monitoring',experiment_id=?,updated_at=? WHERE id=?").run(id,now(),d.id);managerEvent(d.id,'monitoring',expRef(id)+' · '+from+' a '+to);
}
function managerManage(a,f,id){
 if(!/^\d+$/.test(id||''))throw Error('Decisão inválida.');
 const d=db.prepare('SELECT * FROM manager_decisions WHERE id=?').get(Number(id)),c=d&&campaigns().find(x=>x.id===d.campaign_id&&x.scope==='tracked');
 if(!d||!c)throw Error('Decisão indisponível.');
 const {e,r,proposal,fingerprint}=managerAnalysis(c);
 const comment=clean(f.get('comment'),2000).trim();
 if(a==='manager_review'){
  if(d.status!=='proposed'||d.fingerprint!==fingerprint||!comment)throw Error('Atualize a decisão e informe o motivo da revisão.');
  tx(()=>{db.prepare("UPDATE manager_decisions SET status='declined',review_note=?,updated_at=? WHERE id=?").run(comment,now(),d.id);managerEvent(d.id,'declined',comment)});return;
 }
 if(a==='manager_approve'){
  if(d.status!=='proposed'||d.fingerprint!==fingerprint)throw Error('A decisão mudou. Atualize antes de aprovar.');
  tx(()=>{db.prepare("UPDATE manager_decisions SET status=?,approved_at=?,updated_at=? WHERE id=?").run(proposal&&!proposal.observation?'awaiting_execution':'approved',now(),now(),d.id);managerEvent(d.id,'approved','Decisão aprovada pelo responsável. Nenhuma alteração enviada à Meta.');
   if(proposal?.observation)startManagerExperiment(d,proposal,'Observação aprovada; nenhuma alteração externa solicitada.');
  });return;
 }
 if(a==='manager_confirm'){
  const p=JSON.parse(d.proposal_json||'null');
  if(d.status!=='awaiting_execution'||!comment||!p||!proposal||p.target!==proposal.target||r.action!==d.action||!e.fresh||!e.complete||!e.oneSource)throw Error('Execução não confirmável: verifique dados, meta e recomendação atuais.');
  tx(()=>{managerEvent(d.id,'execution_confirmed',comment);startManagerExperiment(d,p,comment)});return;
 }
 throw Error('Operação inválida.');
}
function managerCreativeRows(c,e){
 const current=learningRows(c.id,e.from,e.to),mature=learningRows(c.id,e.matureFrom,e.matureTo),groups=new Map();
 for(const x of current){if(!groups.has(x.ad_id))groups.set(x.ad_id,[]);groups.get(x.ad_id).push(x)}
 const ads=new Map(allAds().map(x=>[x.id,x]));
 return [...groups].map(([id,rs])=>{const q=metrics(rs),old=mature.filter(x=>x.ad_id===id),evidence=closedEvidence(old),est=rateEstimate(evidence,3,20);
 let action='Manter · amostra inicial',reason='Sem evidência comercial suficiente para classificar vencedor.';
 if(!e.fresh){action='Aguardar coleta';reason='Dados desatualizados.'}
 else if(!e.complete||!e.oneSource||!q.purchases.complete){action='Manter · validar conversões';reason='Cobertura incompleta; cliques não comprovam vendas.'}
 else if(e.workflow.active.length){action='Manter durante teste';reason='Evitar interferência no experimento ativo.'}
 else if(e.target&&evidence.valid&&evidence.days>=3&&evidence.purchases===0&&evidence.spend>=3*e.target){action='Revisar possível pausa';reason='Zero compras explicitamente informadas e gasto maduro ≥ 3 CPAs alvo. Confirmar pagamentos antes de agir.'}
 else if(e.target&&est&&est.low>e.target){action='Revisar substituição ou pausa';reason='Intervalo aproximado de CPA acima da meta em dados maduros. Exige revisão humana.'}
 else if(e.target&&est&&est.high<=e.target){action='Manter · eficiência favorável';reason='CPA maduro compatível com a meta; não prova superioridade nem autoriza escala.'}
 return cells([ads.get(id)?.name||id,displayMoney(q,'spend'),pct(q.ctr),money(q.cpc),display(q.checkouts),display(q.purchases),money(q.cpa),action,reason]);
 });
}
function managerPanel(campaign,list,form){
 const selected=list.filter(c=>c.scope==='tracked'&&(campaign==='all'||campaign===c.id));
 return block('Decisões estratégicas automáticas',note('Análise por campanha após novas coletas e a cada 15 minutos. A inteligência decide o que recomendar; alterações externas continuam exclusivamente manuais.')+selected.map(c=>{
  const {e,r,proposal,q,fingerprint}=managerAnalysis(c),d=managerEnsure(c),id='<input type="hidden" name="id" value="'+d.id+'">';
  const pending=db.prepare("SELECT * FROM manager_decisions WHERE campaign_id=? AND status='awaiting_execution' ORDER BY id DESC").all(c.id);
  const active=db.prepare("SELECT * FROM experiments WHERE campaign_id=? AND status='running' ORDER BY id DESC").all(c.id);
  const controls=d.status==='proposed'?form('manager_approve',id,'insights','Aprovar decisão')+fold('Solicitar revisão',form('manager_review',id+area('comment','Motivo da revisão'),'insights','Registrar revisão')):note(managerStatus[d.status]||d.status);
  const pendingHtml=pending.map(x=>fold('Execução manual pendente · decisão #'+x.id,form('manager_confirm','<input type="hidden" name="id" value="'+x.id+'">'+area('comment','Descreva a única ação realmente executada'),'insights','Confirmar execução e iniciar acompanhamento'))).join('');
  const previous=e.workflow.prior.length?table(['Experimento','Resultado','Revisão'],e.workflow.prior.map(x=>cells([expRef(x.id)+' · '+x.title,experimentStates[x.status],x.review||'—']))):note('Ainda não há experimentos concluídos.');
  return '<article class="signal manager-card"><small>'+esc(c.name||c.id)+' · decisão #'+d.id+' · '+esc(r.priority)+'</small><h2>'+esc(managerActions[r.action]||r.title)+'</h2>'+note(r.why)+compactMetrics([['Investimento',displayMoney(q,'spend')],['CTR',pct(q.ctr)],['CPC',money(q.cpc)],['Checkouts',display(q.checkouts)],['Compras',display(q.purchases)],['CPA',money(q.cpa)],['ROAS',roasText(q)],['CPA alvo',money(e.target)],['Maturidade',r.maturity],['Risco',r.risk]])+note('Próxima ação: '+r.next)+note('Condição: '+r.gate)+note('Última coleta: '+timeFmt(e.stamp)+' · '+(e.source||'fonte indisponível'))+note('Estado: '+(managerStatus[d.status]||d.status))+(proposal?note('Hipótese automática: '+proposal.hypothesis+' · CPA alvo '+money(proposal.target)+' · '+proposal.days+' dias.'):'')+(proposal?.caution?note(proposal.caution):'')+controls+pendingHtml+block('Decisão por criativo',table(['Criativo','Gasto','CTR','CPC','Checkouts','Compras','CPA','Decisão','Motivo'],managerCreativeRows(c,e)))+block('Acompanhamento ativo',active.length?active.map(x=>note(expRef(x.id)+' · '+x.title+' · '+expState(x)+' · '+x.eval_from+' a '+x.eval_to+' · '+experimentMetrics[x.metric]+' '+expFmt(x.metric,x.target))).join(''):note('Nenhuma avaliação ativa.'))+fold('Evidências de experimentos anteriores',previous)+'</article>';
 }).join('')+(selected.length?'':note('Selecione uma campanha monitorada. Campanhas excluídas não recebem decisões.')));
}
function managerMemory(campaign,list){
 const ids=new Set(list.filter(c=>c.scope==='tracked'&&(campaign==='all'||campaign===c.id)).map(c=>c.id));
 const rows=db.prepare('SELECT * FROM manager_decisions ORDER BY id DESC LIMIT 500').all().filter(d=>ids.has(d.campaign_id)),events=db.prepare('SELECT * FROM manager_events ORDER BY id DESC LIMIT 1000').all(),allowed=new Set(rows.map(x=>x.id));
 const details=rows.slice(0,40).map(d=>{const r=JSON.parse(d.decision_json),e=JSON.parse(d.evidence_json),p=JSON.parse(d.proposal_json||'null');return fold('#'+d.id+' · '+(managerActions[d.action]||r.title)+' · '+(managerStatus[d.status]||d.status),note(r.why)+note('Coleta: '+timeFmt(e.stamp))+note(p?'Hipótese: '+p.hypothesis:'Sem hipótese experimental necessária.')+(d.review_note?note('Revisão: '+d.review_note):'')+(d.experiment_id?note('Experimento: '+expRef(d.experiment_id)):'')+note('Campanha: '+(list.find(c=>c.id===d.campaign_id)?.name||d.campaign_id))) }).join('');
 return block('Memória de decisões automáticas','<div class="grid">'+card('Decisões registradas',integer(rows.length))+card('Aprovações humanas',integer(rows.filter(x=>x.approved_at).length))+card('Em acompanhamento',integer(rows.filter(x=>x.status==='monitoring').length))+card('Concluídas',integer(rows.filter(x=>x.status==='resolved').length))+'</div>'+details+note('Conclusão de uma decisão técnica não equivale a venda ou hipótese validada.'))+block('Linha do tempo das decisões',table(['Horário','Decisão','Evento','Registro'],events.filter(x=>allowed.has(x.decision_id)).slice(0,100).map(x=>cells([timeFmt(x.at),'#'+x.decision_id,({generated:'Gerada',approved:'Aprovada',declined:'Revisão solicitada',superseded:'Substituída',resolved:'Concluída',monitoring:'Acompanhamento',execution_confirmed:'Execução confirmada'})[x.kind]||x.kind,x.detail]))));
}
function page(csrf,url){
 const p=url.searchParams,view=Object.hasOwn(names,p.get('view'))?p.get('view'):'overview',list=campaigns(),ids=new Set(list.map(c=>c.id));
 const chosen=p.get('campaign'),campaign=chosen==='all'||chosen==='excluded'||ids.has(chosen)?chosen:(ids.has(original)?original:'all');
 let from=dateOK(p.get('from'))?p.get('from'):today(),to=dateOK(p.get('to'))?p.get('to'):today();if(to>today())to=today();if(from>to)from=to;if(from<dayShift(to,-365))from=dayShift(to,-365);
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
 const form=(action,body,back=view,label='Salvar')=>'<form class="editor" method="post" action="/manage">'+hidden+'<input type="hidden" name="filter_campaign" value="'+esc(campaign)+'"><input type="hidden" name="filter_from" value="'+esc(from)+'"><input type="hidden" name="filter_to" value="'+esc(to)+'">'+'<input type="hidden" name="action" value="'+action+'"><input type="hidden" name="back" value="'+esc(back)+'">'+body+'<button type="submit">'+esc(label)+'</button></form>';
 const options=list.map(c=>[c.id,c.name||c.id]);
 const last=latest(),error=db.prepare("SELECT * FROM runs WHERE status='failed' ORDER BY at DESC LIMIT 1").get();
 const kpis=[['Investimento',displayMoney(m,'spend')],['Impressões',display(m.impressions)],['CPM',money(m.cpm)],['Cliques no link',display(m.clicks)],['CTR de link',pct(m.ctr)],['CPC de link',money(m.cpc)],['Visitas à página',display(m.visits)],['Checkouts Meta',display(m.checkouts)],['Compras Meta',display(m.purchases)],['CPA Meta',money(m.cpa)],['Receita Meta',displayMoney(m,'revenue')],['ROAS Meta',m.roas===null?'—':m.roas.toFixed(2)+'x']];
 const adTable=()=>table(['Criativo','Campanha','Investimento','% do gasto','Impressões','CPM','Cliques','CTR','CPC','Visitas','Custo por visita','Checkouts','Custo por checkout','Compras','CPA','ROAS'],[...byAd].map(([id,rs])=>{const q=metrics(rs);return cells([adBy.get(id)?.name||id,rs[0].campaign_name,displayMoney(q,'spend'),spendShare(q,m),display(q.impressions),money(q.cpm),display(q.clicks),pct(q.ctr),money(q.cpc),display(q.visits),money(costPer(q,'visits')),display(q.checkouts),money(costPer(q,'checkouts')),display(q.purchases),money(q.cpa),roasText(q)])}));
 const creativeCards=()=>'<div class="creative-grid">'+[...byAd].map(([id,rs])=>{const q=metrics(rs);return '<details class="creative-card"><summary><div class="creative-name"><span class="creative-icon" aria-hidden="true">▶</span><div><b>'+esc(adBy.get(id)?.name||id)+'</b><small>'+esc(rs[0].campaign_name)+'</small></div></div><div class="creative-primary"><strong>'+esc(displayMoney(q,'spend'))+'</strong><small>'+esc(display(q.clicks))+' cliques</small></div><span class="chevron" aria-hidden="true">+</span></summary>'+compactMetrics([['Impressões',display(q.impressions)],['CPM',money(q.cpm)],['% do gasto',spendShare(q,m)],['CTR',pct(q.ctr)],['CPC',money(q.cpc)],['Visitas',display(q.visits)],['Custo por visita',money(costPer(q,'visits'))],['Checkouts',display(q.checkouts)],['Custo por checkout',money(costPer(q,'checkouts'))],['Compras',display(q.purchases)],['CPA',money(q.cpa)],['ROAS',roasText(q)]])+'</details>'}).join('')+(!byAd.size?note('Nenhum anúncio no período.'):'')+'</div>';
 const dailyTable=()=>{const d=new Map();for(const r of rows){if(!d.has(r.date))d.set(r.date,[]);d.get(r.date).push(r)}return table(['Dia','Gasto','Impressões','Cliques','Compras','CPA'],[...d].reverse().map(([date,rs])=>{const q=metrics(rs);return cells([date,displayMoney(q,'spend'),display(q.impressions),display(q.clicks),display(q.purchases),money(q.cpa)])}))};
 const completeness=note('— significa não retornado ou não calculável; parcial = soma somente dos valores conhecidos. Taxas só são calculadas com cobertura completa. Valores Meta atribuídos não são vendas confirmadas.');
 let content='';
 if(view==='overview'){
  content='<div class="overview-kpis"><div class="grid">'+[0,1,3,4,5,6].map(i=>card(...kpis[i])).join('')+'</div>'+fold('Mais indicadores',compactMetrics([2,7,8,9,10,11].map(i=>kpis[i])),'secondary-kpis')+'</div>'+block(from===to?'Evolução das coletas no dia':'Evolução no período',note(from===to?'Fotografias acumuladas do dia escolhido; nunca somar coletas.':'Valores diários consolidados. * Dia atual em andamento; não interprete como queda frente ao dia fechado. Lacunas indicam dados ausentes. Gráfico limitado aos primeiros 366 dias.')+'<div class="charts"><article><h3>Investimento</h3>'+timelineChart(trends.map(p=>({label:p.label,value:p.spend})),'Investimento',money)+'</article><article><h3>Cliques</h3>'+timelineChart(trends.map(p=>({label:p.label,value:p.clicks})),'Cliques',integer)+'</article></div>')+block('Desempenho por anúncio',creativeCards()+note('Toque no criativo para ver todos os indicadores. — indica dado ausente ou não calculável.'))+fold('Comparação com período anterior',compareTable(m,prev,prevFrom,prevTo),'comparison')+fold('Evolução diária',dailyTable())+block('Coletas recentes',collectionTable(campaign,from,to,filter));
 }else if(view==='campaigns'){
  content=block('Campanhas descobertas',note('Cada campanha é identificada pelo ID da Meta. Excluir da análise não apaga histórico nem altera os anúncios.')+table(['Campanha','Estrutura','Status Meta','Conjuntos','Anúncios','Gasto no período','Escopo'],list.map(c=>{const q=metrics(byCampaign.get(c.id)||[]);return ['<a href="'+esc(urlFor('overview',{campaign:c.id}))+'">'+esc(c.name||c.id)+'</a><small>'+esc(c.id)+'</small>',...cells([c.budget_mode,c.status,db.prepare('SELECT COUNT(*) n FROM adsets WHERE campaign_id=?').get(c.id).n,db.prepare('SELECT COUNT(*) n FROM ads WHERE campaign_id=?').get(c.id).n,displayMoney(q,'spend')]),form('scope','<input type="hidden" name="id" value="'+esc(c.id)+'">'+select('scope','Análise',[['tracked','Monitorada'],['excluded','Excluída']],c.scope))]})))+block('Conjuntos de anúncios',table(['Campanha','Conjunto','Status','Orçamento diário (centavos Meta normalizados)'],db.prepare('SELECT s.*,c.name campaign_name FROM adsets s LEFT JOIN campaigns c ON c.id=s.campaign_id').all().filter(s=>campaign==='all'?list.find(c=>c.id===s.campaign_id)?.scope!=='excluded':campaign==='excluded'?list.find(c=>c.id===s.campaign_id)?.scope==='excluded':s.campaign_id===campaign).map(s=>cells([s.campaign_name,s.name,s.status,money(s.daily_budget)]))));
 }else if(view==='creatives'){
  const creatives=adList.filter(a=>filter(a));
  content=block('Biblioteca de criativos',note('Os IDs são a referência permanente. Classifique o conteúdo e a hipótese do anúncio para comparar formatos sem confundir correlação e causa.')+creatives.map(a=>'<details><summary>'+esc(a.name||a.id)+' · '+esc(a.campaign_name||'')+'<small>'+esc(a.id)+'</small></summary>'+form('profile','<input type="hidden" name="id" value="'+esc(a.id)+'"><div class="fields">'+input('format','Formato',a.format)+input('angle','Argumento',a.angle)+input('hook','Gancho',a.hook)+input('voice','Narração',a.voice)+input('visual','Visual',a.visual)+input('audience','Público / segmento',a.audience)+input('duration','Duração',a.duration)+'</div>'+area('transcript','Transcrição ou descrição',a.transcript))+'</details>').join('')+(creatives.length?'':note('Nenhum anúncio encontrado para este filtro.')))+block('Desempenho',adTable());
 }else if(view==='funnel'){
  const stages=[['Impressões',m.impressions],['Cliques',m.clicks],['Visitas',m.visits],['Checkouts',m.checkouts],['Compras atribuídas',m.purchases]];
  content=block('Funil observado na Meta',funnelGraphic(stages)+compactMetrics([['Investimento',displayMoney(m,'spend')],['CPM',money(m.cpm)],['CPC',money(m.cpc)],['Custo por visita',money(costPer(m,'visits'))],['Custo por checkout',money(costPer(m,'checkouts'))],['CPA',money(m.cpa)]])+completeness)+ownFunnel(from,to,campaign,list)+block('Pagamento · cobertura Kiwify',note('Os pagamentos são dados da operação, não etapas atribuídas à campanha. Pix gerado, pendente e abandono ainda não são coletados; não representam zero.')+compactMetrics([['Pix gerados','—'],['Pix pendentes','—'],['Abandonos','—']]))+kiwifySummary(from,to,campaign);
 }else if(view==='tests'){
  content=workflowNav(view,campaign)+experimentPanel(campaign,list,form);
 }else if(view==='decisions'){
  const decisions=db.prepare('SELECT d.*,c.name campaign_name FROM decisions d LEFT JOIN campaigns c ON c.id=d.campaign_id ORDER BY d.id DESC').all().filter(filterDecision);
  function filterDecision(d){return campaign==='all'?list.find(c=>c.id===d.campaign_id)?.scope!=='excluded':campaign==='excluded'?list.find(c=>c.id===d.campaign_id)?.scope==='excluded':d.campaign_id===campaign}
  content=workflowNav(view,campaign)+workflowHistory(campaign,list)+block('Registrar decisão avulsa',form('decision',select('campaign_id','Campanha',options,ids.has(campaign)?campaign:options[0]?.[0])+area('hypothesis','Hipótese / motivo')+area('decision_action','Decisão / alteração planejada'))+note('Nenhuma ação é enviada à Meta. O registro serve para lembrar a hipótese e verificar o resultado.'))+block('Decisões e resultados',decisions.map(d=>'<details><summary>'+esc(d.action)+' · '+esc(d.status)+'<small>'+esc(d.campaign_name)+' · '+esc(timeFmt(d.at))+'</small></summary>'+note(d.hypothesis)+form('outcome','<input type="hidden" name="id" value="'+d.id+'">'+select('status','Status',[['planned','Planejado'],['applied','Aplicado manualmente'],['validated','Validado'],['rejected','Reprovado'],['inconclusive','Inconclusivo']],d.status)+area('outcome','Resultado observado',d.outcome))+'</details>').join('')+(decisions.length?'':note('Nenhuma decisão registrada.')));
 }else if(view==='insights'){
  content=managerPanel(campaign,list,form)+fold('Diagnóstico técnico e configuração do CPA',diagnosticPanel(rows,byAd,adBy,byCampaign,list,campaign,m,form))+fold('Histórico técnico de recomendações',strategyPanel(campaign,list,form))+fold('Experimentos avançados · registros existentes',experimentPanel(campaign,list,form));
 }else if(view==='learning'){
  const historical=db.prepare("SELECT d.*,c.scope FROM daily d JOIN campaigns c ON c.id=d.campaign_id WHERE c.scope='tracked' ORDER BY date").all();
  const summary=[];for(const key of ['format','angle','voice','visual','audience','duration']){const groups=new Map();for(const row of historical){const label=adBy.get(row.ad_id)?.[key];if(!label)continue;if(!groups.has(label))groups.set(label,[]);groups.get(label).push(row)}for(const [label,rs] of groups){const q=metrics(rs),n=new Set(rs.map(r=>r.campaign_id)).size;summary.push(cells([({format:'Formato',angle:'Argumento',voice:'Narração',visual:'Visual',audience:'Público',duration:'Duração'})[key]||key,label,n,new Set(rs.map(r=>r.ad_id)).size,displayMoney(q,'spend'),display(q.purchases),money(q.cpa),n>=2&&q.purchases.complete&&q.purchases.value>=10?'Comparação exploratória':'Amostra insuficiente']))}}
  content=managerMemory(campaign,list)+workflowHistory(campaign,list)+experimentPanel(campaign,list,form,true)+fold('Motor estatístico e memória técnica',statisticalPanel(campaign,list,adBy,form)+learningPanel(campaign,list,form,options))+block('Memória comparativa entre campanhas',note('O histórico considera campanhas monitoradas e os atributos preenchidos na biblioteca. Um grupo precisa de pelo menos duas campanhas e dez compras registradas com cobertura completa para iniciar uma comparação exploratória. Isso não demonstra causalidade.')+table(['Atributo','Valor','Campanhas','Criativos','Gasto','Compras','CPA','Evidência'],summary))+block('Maturidade do aprendizado',note('Estágio atual: memória automática, hipóteses prospectivas e estimador estatístico de taxa de compras com avaliação temporal. Estimativas ficam indisponíveis quando os dados não atendem aos critérios. Não há modelo preditivo complexo treinado nem decisões automáticas.'));
 }else if(view==='finance'){
  const financial=db.prepare('SELECT * FROM finance WHERE date BETWEEN ? AND ? ORDER BY date DESC').all(from,to), excludedM=metrics(all.filter(r=>r.scope==='excluded'));
  content=block('Investimento e atribuição Meta','<div class="grid">'+[['Gasto selecionado',displayMoney(m,'spend')],['Gasto excluído da análise (conta)',displayMoney(excludedM,'spend')],['Receita atribuída Meta',displayMoney(m,'revenue')],['ROAS Meta',m.roas===null?'—':m.roas.toFixed(2)+'x']].map(([k,v])=>card(k,v)).join('')+'</div>'+note('A receita atribuída não comprova pagamento. Os registros financeiros manuais abaixo são totais da operação por dia, não atribuídos à campanha.'))+kiwifySummary(from,to,campaign)+simulationPanel(p,campaign,from,to,m)+block('Conciliação financeira manual',form('finance',input('date','Dia',today(),'date','required')+'<div class="fields">'+[['gross','Receita confirmada'],['fees','Taxas'],['refunds','Reembolsos'],['taxes','Impostos'],['infra','Infraestrutura'],['other','Outros custos']].map(([k,v])=>input(k,v,'','number','min="0" step="0.01"')).join('')+'</div>')+table(['Dia','Receita','Taxas','Reembolsos','Impostos','Infra','Outros'],financial.map(f=>cells([f.date,money(f.gross),money(f.fees),money(f.refunds),money(f.taxes),money(f.infra),money(f.other)])))+note('Valores em branco permanecem desconhecidos. Margem líquida conciliada ainda pendente. Não duplique registros manuais com os da Kiwify.'));
 }else{
  content=block('Fonte de dados · Supermetrics', '<div class="grid">'+card('Fonte principal','Supermetrics · C01')+card('Última coleta importada',timeFmt(last?.at))+card('Origem da última coleta',last?.source)+card('Meta direta',metaConnectionLabel())+'</div>'+note('Importações externas de métricas da conta C01. O histórico técnico preserva falhas anteriores. A integração direta só é habilitada por configuração explícita; o Pixel e a Kiwify não são afetados.')+(directMetaEnabled()?'<form method="post" action="/sync">'+hidden+'<button '+(ready()?'':'disabled')+'>Sincronizar Meta direta</button></form>':'')+note('Atualizar a página não executa consulta ao Supermetrics. A próxima coleta depende do fluxo externo.'))+block('Recebimento sem reinício',note('API de entrada: '+(ingestKeyHash()?'credencial ativa':'aguardando gerar credencial')+'. O envio autenticado grava diretamente no banco, sem deploy.')+note('Última requisição de coleta aceita: '+timeFmt(setting('ingest_http_at')))+note('POST /api/ingest · JSON · Bearer. A origem permitida é Supermetrics, conta C01; dados sem cache e com horário explícito.')+'<details><summary>Gerenciar credencial</summary>'+note('Gerar uma nova chave revoga imediatamente a anterior. Guarde-a em local seguro; nunca coloque no GitHub.')+'<form method="post" action="/ingest-token">'+hidden+'<button>'+ (ingestKeyHash()?'Rotacionar credencial':'Gerar credencial de coleta')+'</button></form></details>')+block('Rastreamento da landing page',note('Conexão: '+(setting('funnel_last_at')?'eventos recebidos':funnelTokenHash()?'credencial ativa; aguardando eventos':'aguardando ativação'))+note('Último evento: '+timeFmt(setting('funnel_last_at')))+note('POST /api/funnel/events · JSON · Bearer. Somente servidor a servidor. Eventos: landing_view, engaged, cta_click, checkout_redirect. Não enviar nome, e-mail, telefone, IP ou URL completa. Usar identificador aleatório por sessão e respeitar as preferências de privacidade.')+'<details><summary>Credencial da landing page</summary>'+note('Esta chave deve ficar no backend da landing page, nunca no JavaScript público. Gerar uma nova revoga a anterior.')+'<form method="post" action="/funnel-token">'+hidden+'<button>'+(setting('funnel_token_hash')?'Rotacionar credencial':'Gerar credencial de rastreamento')+'</button></form></details>')+block('Kiwify · pagamentos',note('Recebimento: '+(kiwifyReady()?'habilitado':'aguardando configuração')+' · '+kiwifyProducts().size+' produtos autorizados.')+note('Último teste autenticado: '+timeFmt(setting('kiwify_test_at')))+note('Último evento real: '+timeFmt(setting('kiwify_last_at')))+note('Estudante: '+(kiwifyConfigs().some(p=>p.plan==='estudante')?'credencial configurada':'pendente')+' · teste: '+timeFmt(setting('kiwify_test_at:estudante')))+note('Professor: '+(kiwifyConfigs().some(p=>p.plan==='professor')?'credencial configurada':'pendente')+' · teste: '+timeFmt(setting('kiwify_test_at:professor')))+note('Configure KIWIFY_WEBHOOK_TOKEN_ESTUDANTE e KIWIFY_WEBHOOK_TOKEN_PROFESSOR separadamente, com os IDs dos respectivos produtos. Cadastre webhooks separados somente para aprovação, reembolso e chargeback.')+note('Produção: https://eduverso-intelligence-production.up.railway.app/api/kiwify/webhook')+note('Teste isolado: https://eduverso-intelligence-production.up.railway.app/api/kiwify/test')+note('Use primeiro o endereço de teste; ele não grava pedidos ou valores. Depois de validar, altere o endereço para produção. Não execute testes de venda na URL de produção. Nenhuma credencial de comprador será armazenada.'))+block('Importar coleta externa',note('Importação de JSON autenticada, sem modificar anúncios. Use id, at, source e rows com data, IDs e métricas. Importações repetidas com o mesmo ID são ignoradas.')+form('import','<label>JSON da coleta<textarea name="payload" rows="7" maxlength="500000" required></textarea></label>'))+block('Histórico técnico',table(['Horário Brasília','Fonte','Tipo','Resultado','Linhas','Erro'],db.prepare('SELECT * FROM runs ORDER BY at DESC LIMIT 100').all().map(r=>cells([timeFmt(r.at),r.source,r.kind,r.status,r.count,r.error])))+'<p><a href="/api/history">Exportar dados históricos (JSON)</a></p>');
 }
 const premiumStyles="\n.manager-card{padding:20px;margin:12px 0}.manager-card>h2{font-size:23px;color:#e8dbff;margin:10px 0}.manager-card>.editor{margin:10px 0}.manager-card section{margin-top:12px}.manager-card>.editor button{width:auto}.manager-card .mini-grid{margin:14px 0}\n.workflow-nav{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:7px;margin-bottom:8px}.workflow-nav a{padding:10px;border:1px solid #3b2b53;background:#171124;border-radius:8px;text-decoration:none;font-size:12px}.workflow-nav a.current{background:#39255b;color:#fff}\n.experiment-categories{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px}.experiment-categories>div{padding:14px;border:1px solid #392c50;border-radius:11px;background:#1b152b}.experiment-categories b{display:block;margin-bottom:6px;color:#e4d6ff}.experiment-item summary{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.experiment-item summary small{color:#c6a6ff}.experiment-item .editor{border-top:1px solid #392c50;padding-top:12px}\n.funnel-graphic{display:flex;flex-direction:column;gap:5px;align-items:center;max-width:640px;margin:18px auto}.funnel-step{width:var(--fw);min-width:150px;position:relative}.funnel-shape{clip-path:polygon(0 0,100% 0,94% 100%,6% 100%);background:linear-gradient(110deg,#7850c9,#452577);padding:14px 18px;text-align:center;display:flex;flex-direction:column;gap:3px;color:#fff}.funnel-step:nth-child(2) .funnel-shape{background:linear-gradient(110deg,#7043b6,#462876)}.funnel-step:nth-child(3) .funnel-shape{background:linear-gradient(110deg,#603b99,#3e2567)}.funnel-step:nth-child(4) .funnel-shape{background:linear-gradient(110deg,#51307e,#352052)}.funnel-step:nth-child(n+5) .funnel-shape{background:#39264e}.funnel-step.funnel-unknown .funnel-shape{background:#30273c;color:#e4dbee}.funnel-shape span{font-size:13px;font-weight:650}.funnel-shape strong{font-size:24px;line-height:1.1}.funnel-shape small{color:#f0e6ff;font-size:11px}.funnel-unknown small{color:#c4b7d3}@media(max-width:650px){.funnel-step{min-width:140px}.funnel-shape{padding:11px 13px}.funnel-shape strong{font-size:20px}}\n:root{--panel:#151323;--edge:#2c2840;--accent:#a78bfa;--muted:#a49ab8}\nbody{background:#0c0b14;font-variant-numeric:tabular-nums}\nheader{position:sticky;top:0;z-index:5;background:#100e1b;border-color:var(--edge);padding:12px 24px}\nheader button{background:#211b32;border:1px solid #3b2e53;padding:8px 13px;color:#d9caf9}\n.desktop-nav{background:#100e1b;border-color:var(--edge)}.navshell{display:none}\nmain{max-width:1280px;padding:22px}section{background:var(--panel);border-color:var(--edge);padding:17px;border-radius:13px;margin-bottom:12px}\nh1{font-size:27px;letter-spacing:-.6px;margin:4px 0 0}h2{font-size:17px;letter-spacing:-.2px;margin:0 0 12px}\n.page-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}\n.refresh-link{border:1px solid var(--edge);border-radius:9px;padding:8px 10px;text-decoration:none;font-size:12px;white-space:nowrap}\n.statusbar{display:flex;align-items:center;gap:10px;border:1px solid var(--edge);border-radius:10px;padding:10px 12px;background:#141121}\n.statusdot{width:8px;height:8px;border-radius:50%;background:#a78bfa;flex:none;box-shadow:0 0 0 4px #a78bfa19}\n.statusbar b{font-size:12px;font-weight:600}.statusbar small{font-size:11px;line-height:1.4}\n.filters{margin:12px 0 15px;gap:8px}.filters label{gap:4px}.filters input,.filters select{padding:9px 10px;min-width:0}.filters button{padding:10px 14px}\n.overview-kpis .grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:0 0 8px}.overview-kpis .metric{margin:0;background:linear-gradient(145deg,#1b172a,#151323);border-color:var(--edge);padding:13px;border-radius:12px}\n.metric small{font-size:12px;line-height:1.25}.metric b{font-size:23px;margin-top:6px;letter-spacing:-.4px}\n.fold{background:var(--panel);border:1px solid var(--edge);padding:0;margin:0 0 12px;border-radius:12px}.fold summary,.creative-card summary,.timeline-item summary{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:10px;cursor:pointer}.fold summary::-webkit-details-marker,.creative-card summary::-webkit-details-marker,.timeline-item summary::-webkit-details-marker{display:none}\n.fold summary{padding:13px 15px;font-size:14px}.fold summary span,.chevron{color:var(--accent);font-size:18px;font-weight:400}.fold[open]>summary span,.creative-card[open]>summary .chevron,.timeline-item[open]>summary .chevron{transform:rotate(45deg)}.fold-body{padding:0 14px 14px}\n.mini-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.mini-grid>div{padding:8px;background:#100e1b;border:1px solid #28243b;border-radius:8px;min-width:0}.mini-grid small{font-size:11px;line-height:1.35}.mini-grid strong{display:block;margin-top:3px;font-size:14px;overflow-wrap:anywhere}\n.creative-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:8px}.creative-card,.timeline-item{background:#110f1d;border:1px solid var(--edge);padding:0;margin:0;border-radius:10px;min-width:0}.creative-card summary,.timeline-item summary{padding:12px}.creative-name{display:flex;align-items:center;gap:9px;min-width:0;flex:1}.creative-name>div{min-width:0}.creative-name small{font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.creative-icon{display:grid;place-items:center;width:30px;height:30px;background:#2c2145;color:#c3a4ff;border-radius:8px;flex:none;font-size:12px}.creative-primary,.timeline-amount{text-align:right;white-space:nowrap}.creative-primary strong,.timeline-amount strong{font-size:15px}.creative-primary small,.timeline-amount small{font-size:11px}.creative-card>.mini-grid,.timeline-item>.mini-grid{padding:0 10px 10px}\n.compare-grid{display:grid;gap:0}.compare-row{display:grid;grid-template-columns:1.15fr 1fr 1fr .7fr;gap:5px;padding:9px 0;border-bottom:1px solid var(--edge);font-size:12px;align-items:center}.compare-row span{min-width:0;overflow-wrap:anywhere;text-align:right}.compare-row span:first-child{text-align:left}.compare-head{color:var(--muted);font-size:11px;font-weight:600}\n.timeline{display:grid;gap:7px}.timeline-item{border:0;border-bottom:1px solid var(--edge);border-radius:0;background:transparent}.timeline-item summary{justify-content:flex-start;padding:9px 1px}.timeline-item summary>div:nth-child(2){flex:1}.timeline-dot{width:7px;height:7px;background:#a78bfa;border-radius:50%;flex:none}.timeline-item small{font-size:11px}.charts article{border-color:var(--edge);background:#100e1a}.muted{font-size:12px;line-height:1.5;margin:8px 0 4px}\n@media(min-width:651px){.overview-kpis .grid{grid-template-columns:repeat(6,minmax(0,1fr))}}\n@media(max-width:650px){header{padding:10px 14px}header b{font-size:16px}.desktop-nav{display:none}.navshell{display:block;border-bottom:1px solid var(--edge);background:#100e1b}.navtoggle{display:flex;align-items:center;gap:9px;list-style:none;padding:10px 14px;font-size:13px}.navtoggle::-webkit-details-marker{display:none}.navcurrent{margin-left:auto;color:var(--muted);font-size:11px}.navshell nav{padding:4px 10px 10px}.navshell nav a{padding:10px}main{padding:12px}.page-heading{margin-bottom:9px}h1{font-size:24px}.tag{font-size:10px;letter-spacing:1px}.filters{margin:10px 0 12px}.filters input,.filters select{font-size:14px;min-height:39px}.filters label{font-size:11px}.filters button{font-size:13px}.overview-kpis .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.overview-kpis .metric{padding:10px 11px}.metric b{font-size:21px}.metric small{font-size:11px}section{padding:12px;margin-bottom:10px}h2{font-size:16px;margin-bottom:9px}.charts{gap:7px}.charts article{padding:8px}.charts h3{font-size:13px}.creative-grid{grid-template-columns:1fr}.mini-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.compare-row{font-size:11px;gap:4px}.compare-head{font-size:10px}.fold summary{padding:11px 12px}.fold-body{padding:0 12px 12px}}\n";
 const styles='.navshell{margin:0;border:0;padding:0;border-radius:0;background:#120e20}.navtoggle{display:none}@media(max-width:650px){.navtoggle{display:block;padding:12px 16px;color:#c5a6ff}}*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;background:#0d0b17;color:#f5f1ff;font:14px system-ui,-apple-system,sans-serif}header{background:#171124;border-bottom:1px solid #33264b;padding:15px 22px;display:flex;align-items:center;justify-content:space-between;gap:12px}header b{font-size:19px;letter-spacing:-.5px}header b span{color:#b490ff}header form{margin:0}nav{display:flex;gap:7px;flex-wrap:wrap;padding:12px 20px;border-bottom:1px solid #2b213d;background:#120e20}nav a{padding:9px 11px;border-radius:8px;color:#bdb3d1;text-decoration:none;font-size:13px}nav a.active{background:#39255b;color:#e2d3ff}main{max-width:1400px;margin:auto;padding:24px}h1{font-size:29px;margin:0 0 8px}h2{font-size:18px;margin:0 0 14px}section,.metric{background:#191427;border:1px solid #35294a;border-radius:15px;padding:16px;margin:0 0 15px;min-width:0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:12px}.grid .metric{margin:0 0 12px}.metric b{font-size:24px;display:block;margin-top:8px;overflow-wrap:anywhere}.muted,small{color:#b0a5c5;line-height:1.6}small{display:block;font-size:12px}p{margin:8px 0 12px}a{color:#c3a4ff}button{border:0;background:#8853df;color:white;font:inherit;font-weight:650;border-radius:9px;padding:11px 14px;cursor:pointer}button:disabled{opacity:.45;cursor:not-allowed}.filters,.fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;align-items:end}.filters{margin:15px 0}.editor{display:grid;gap:10px;margin:10px 0}.editor button{justify-self:start}label{display:grid;gap:6px;color:#d6cce7;font-size:12px}input,select,textarea{width:100%;border:1px solid #433353;background:#100c1d;border-radius:9px;color:#f4f0fc;padding:10px;font:inherit;font-size:14px}textarea{resize:vertical}table{border-collapse:collapse;width:100%;min-width:620px}th,td{padding:12px 9px;text-align:left;border-bottom:1px solid #382d49;vertical-align:top}th{font-size:12px;color:#b6aacb}td small{overflow-wrap:anywhere}.scroll{overflow:auto}details,.signal,.stage{background:#130f21;padding:14px;border-radius:10px;margin:9px 0;border:1px solid #30243f}summary{cursor:pointer;font-weight:650}.stage{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;align-items:center}.stage strong{color:#c5a6ff}.tag{font-size:11px;color:#b897ff;letter-spacing:1.5px;text-transform:uppercase}.notice{padding:10px 13px;border-radius:9px;background:#251b38;color:#d7c9f0;margin:10px 0;line-height:1.6}@media(max-width:650px){header{padding:12px 14px}header b{font-size:16px}nav{padding:8px 12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;white-space:normal}nav a{padding:9px 8px;font-size:12px}main{padding:14px}h1{font-size:25px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.metric{padding:12px}.metric b{font-size:19px}.filters{grid-template-columns:repeat(2,minmax(0,1fr))}.filters label:nth-child(2),.filters button{grid-column:1/-1}.stage{grid-template-columns:1fr 1fr}.stage small{grid-column:1/-1}input,select,textarea{font-size:16px}.scroll{overflow:visible}table,tbody,tr,td{display:block;width:100%;min-width:0}thead{display:none}tbody tr{border:1px solid #382d49;border-radius:11px;padding:9px 12px;margin:10px 0;background:#130f21}td{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:10px;align-items:start;padding:8px 0;border-bottom:1px solid #2a213a;overflow-wrap:anywhere}td:before{content:attr(data-label);color:#b0a5c5;font-size:12px;font-weight:600}td:first-child{font-weight:700}td:last-child{border-bottom:0}td.empty{display:block}td.empty:before{display:none}.cellvalue{min-width:0;text-align:right}.cellvalue form{text-align:left}.cellvalue small{white-space:normal}.grid .metric{margin:0}.grid{margin-bottom:15px}}';
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0d0b17"><title>Eduverso Intelligence</title><link rel="icon" type="image/svg+xml" href="/favicon.svg?v=1"><style>'+styles+'.charts{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:12px}.charts article{min-width:0;background:#130f21;border:1px solid #35294a;border-radius:12px;padding:12px}.charts h3{font-size:14px;margin:0 0 8px}.trendchart{display:block;width:100%;height:auto}@media(max-width:650px){.charts{grid-template-columns:1fr}.charts article{padding:8px}}'+premiumStyles+'</style></head><body><header><b>Eduverso <span>Intelligence</span></b><form method="post" action="/logout">'+hidden+'<button>Sair</button></form></header><nav class="desktop-nav" aria-label="Menu principal desktop">'+mainNav.map(([v,n])=>'<a class="'+(view===v?'active':'')+'" href="'+esc(urlFor(v))+'">'+esc(n)+'</a>').join('')+'</nav><details class="navshell"><summary class="navtoggle"><span aria-hidden="true">☰</span> Menu <span class="navcurrent">'+esc(names[view])+'</span></summary><nav aria-label="Menu principal">'+mainNav.map(([v,n])=>'<a class="'+(view===v?'active':'')+'" href="'+esc(urlFor(v))+'">'+esc(n)+'</a>').join('')+'</nav></details><main><div class="page-heading"><div><div class="tag">Inteligência comercial</div><h1>'+esc(names[view])+'</h1></div><a class="refresh-link" href="'+esc(urlFor(view))+'" aria-label="Recarregar painel">↻ Atualizar</a></div><div class="statusbar"><span class="statusdot"></span><div><b>'+esc(last?'Última coleta: '+timeFmt(last.at):'Aguardando coleta')+'</b><small>'+esc(last?.source||'Sem fonte')+' · '+list.length+' campanhas · '+esc('Meta direta: '+metaConnectionLabel())+'</small></div></div><form class="filters" method="get" action="/"><input type="hidden" name="view" value="'+esc(view)+'">'+select('campaign','Campanha',[['all','Todas monitoradas'],['excluded','Excluídas (histórico)'],...options],campaign)+input('from','De',from,'date','required')+input('to','Até',to,'date','required')+'<button>Filtrar</button></form>'+content+'</main></body></html>';
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
 else if(['manager_approve','manager_review','manager_confirm'].includes(a)){managerManage(a,f,id)}
 else if(a==='experiment_create'||a==='experiment_from_recommendation'){
 const rec=a==='experiment_from_recommendation'&&/^\d+$/.test(id||'')?db.prepare('SELECT * FROM strategy_recommendations WHERE id=?').get(Number(id)):null;
 if(a==='experiment_from_recommendation'&&(!rec||rec.day!==today()||rec.version!==strategyVersion||!proposalFor(rec.action)))throw Error('Recomendação desatualizada ou indisponível. Atualize a página.');
 const c=rec?rec.campaign_id:f.get('campaign_id'),title=txt('title',120),category=f.get('category'),metric=f.get('metric'),hypothesis=txt('hypothesis'),action=txt('planned_action'),target=Number(f.get('target')),days=Number(f.get('days'));
 if(!validID(c)||!db.prepare("SELECT 1 FROM campaigns WHERE id=? AND scope='tracked'").get(c)||!title||!hypothesis||!action||!Object.hasOwn(experimentCategories,category)||!Object.hasOwn(experimentMetrics,metric)||!Number.isFinite(target)||target<=0||target>1000000||(['ctr','conversion'].includes(metric)&&target>100)||(['purchases','checkouts'].includes(metric)&&!Number.isInteger(target))||![3,5,7,14,30].includes(days))throw Error('Preencha todos os campos e uma meta válida para a métrica.');
 tx(()=>{if(rec){const current=campaigns().find(x=>x.id===c);if(!current||strategyDecision(strategyEvidence(current)).action!==rec.action||db.prepare("SELECT 1 FROM experiments WHERE campaign_id=? AND status='running'").get(c))throw Error('A recomendação mudou ou existe um teste ativo. Atualize a página.');if(db.prepare('SELECT 1 FROM experiment_links WHERE recommendation_id=?').get(rec.id))throw Error('Já existe um experimento vinculado a esta recomendação.');}
 const result=db.prepare('INSERT INTO experiments(campaign_id,title,category,hypothesis,planned_action,metric,target,days,created_at) VALUES(?,?,?,?,?,?,?,?,?)').run(c,title,category,hypothesis,action,metric,target,days,now()),eid=Number(result.lastInsertRowid);
 if(rec)db.prepare('INSERT INTO experiment_links(experiment_id,recommendation_id) VALUES(?,?)').run(eid,rec.id);
 experimentEvent(eid,'created',(rec?'Recomendação #'+rec.id+' · ':'')+action);});
 }
 else if(a==='experiment_start'){
 const actual=txt('actual_action');if(!/^\d+$/.test(id||'')||!actual)throw Error('Confirme a ação executada.');
 tx(()=>{const e=db.prepare("SELECT e.* FROM experiments e JOIN campaigns c ON c.id=e.campaign_id WHERE e.id=? AND e.status='planned' AND c.scope='tracked'").get(Number(id));if(!e)throw Error('Experimento não disponível para iniciar.');
 const d=today(),evalFrom=dayShift(d,1),evalTo=dayShift(d,e.days),baseTo=dayShift(d,-3),baseFrom=dayShift(baseTo,1-e.days);
 const overlap=db.prepare("SELECT 1 FROM experiments WHERE campaign_id=? AND status='running' AND eval_from<=? AND eval_to>=?").get(e.campaign_id,evalTo,evalFrom)||db.prepare("SELECT 1 FROM learning_trials WHERE campaign_id=? AND status='pending' AND eval_from<=? AND eval_to>=?").get(e.campaign_id,evalTo,evalFrom);
 if(overlap)throw Error('Já existe avaliação sobreposta nesta campanha. Evite misturar intervenções.');
 const base=expEvidence(e.campaign_id,baseFrom,baseTo,e.metric);
 db.prepare("UPDATE experiments SET status='running',started_at=?,actual_action=?,base_from=?,base_to=?,baseline_json=?,eval_from=?,eval_to=? WHERE id=? AND status='planned'").run(now(),actual,baseFrom,baseTo,JSON.stringify(base),evalFrom,evalTo,e.id);experimentEvent(e.id,'started',actual);});
 }
 else if(a==='experiment_cancel'||a==='experiment_review'){
 const review=txt('review');if(!/^\d+$/.test(id||'')||!review)throw Error('Informe uma justificativa.');
 tx(()=>{const result=a==='experiment_cancel'?db.prepare("UPDATE experiments SET status='cancelled',review=?,reviewed_at=? WHERE id=? AND status IN ('planned','running')").run(review,now(),Number(id)):db.prepare("UPDATE experiments SET review=?,reviewed_at=? WHERE id=? AND status IN ('target_met','target_missed','inconclusive')").run(review,now(),Number(id));
 if(!result.changes)throw Error('Experimento ou estado inválido.');experimentEvent(Number(id),a==='experiment_cancel'?'cancelled':'reviewed',review);});
 }
 else if(a==='strategy_review'){
 const status=f.get('review_status'),noteText=txt('review_note');
 if(!/^\d+$/.test(id||'')||!['unreviewed','helpful','incorrect','inconclusive'].includes(status)||!db.prepare('SELECT 1 FROM strategy_recommendations WHERE id=?').get(Number(id)))throw Error('Recomendação ou avaliação inválida');
 if(status!=='unreviewed'&&!noteText)throw Error('Informe uma justificativa para avaliar a recomendação.');
 db.prepare('UPDATE strategy_recommendations SET review_status=?,review_note=?,reviewed_at=? WHERE id=?').run(status,noteText,now(),Number(id));
 }
 else if(a==='learning_cohort'){if(!validID(id)||!db.prepare("SELECT 1 FROM campaigns WHERE id=? AND scope='tracked'").get(id))throw Error('Campanha inválida');const value=txt('cohort',80);if(value)setSetting('learning_cohort:'+id,value);else db.prepare('DELETE FROM settings WHERE key=?').run('learning_cohort:'+id)}
 else if(a==='learning_trial'){
 const c=f.get('campaign_id'),rule=f.get('rule'),h=txt('hypothesis'),target=Number(f.get('trial_target')),days=Number(f.get('trial_days'));
 if(!validID(c)||!db.prepare("SELECT 1 FROM campaigns WHERE id=? AND scope='tracked'").get(c)||!['observe','creative','offer','budget'].includes(rule)||!h||!Number.isFinite(target)||target<.01||target>1000000||!Number.isInteger(days)||days<3||days>30)throw Error('Hipótese ou meta inválida');
 const d=today(),baseTo=dayShift(d,-1),baseFrom=dayShift(d,-7),evalFrom=dayShift(d,1),evalTo=dayShift(d,days);
 const baseline=evidenceSnapshot(learningRows(c,baseFrom,baseTo),baseFrom,baseTo);
 const overlap=db.prepare("SELECT 1 FROM learning_trials WHERE campaign_id=? AND status='pending' AND eval_from<=? AND eval_to>=?").get(c,evalTo,evalFrom);
 if(overlap||db.prepare("SELECT 1 FROM experiments WHERE campaign_id=? AND status='running' AND eval_from<=? AND eval_to>=?").get(c,evalTo,evalFrom))throw Error('Já existe uma hipótese pendente com janela sobreposta nesta campanha.');
 db.prepare('INSERT INTO learning_trials(campaign_id,created_at,rule,hypothesis,baseline_from,baseline_to,baseline_json,eval_from,eval_to,target_cpa) VALUES(?,?,?,?,?,?,?,?,?,?)').run(c,now(),rule,h,baseFrom,baseTo,JSON.stringify(baseline),evalFrom,evalTo,target);
 }
 else if(a==='learning_review'){if(!/^\d+$/.test(id||'')||!db.prepare("SELECT 1 FROM learning_trials WHERE id=? AND status<>'pending'").get(Number(id)))throw Error('Avaliação inexistente ou pendente');db.prepare('UPDATE learning_trials SET review=?,reviewed_at=? WHERE id=?').run(txt('review'),now(),Number(id))}
 else if(a==='target_cpa'){if(!validID(id)||!db.prepare('SELECT 1 FROM campaigns WHERE id=?').get(id))throw Error('Campanha inválida');const raw=f.get('target_cpa');if(raw===null||raw===''){db.prepare('DELETE FROM settings WHERE key=?').run('target_cpa:'+id)}else{const v=Number(raw);if(!Number.isFinite(v)||v<.01||v>1000000)throw Error('CPA alvo inválido');setSetting('target_cpa:'+id,v)}}
 else if(a==='finance'){const d=f.get('date');if(!dateOK(d)||d>today())throw Error('Data inválida');const keys=['gross','fees','refunds','taxes','infra','other'];const vals=keys.map(k=>{const v=f.get(k);if(v!==null&&v!==''&&num(v)===null)throw Error('Valor financeiro inválido');return num(v)});db.prepare('INSERT INTO finance VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(date) DO UPDATE SET gross=excluded.gross,fees=excluded.fees,refunds=excluded.refunds,taxes=excluded.taxes,infra=excluded.infra,other=excluded.other,updated_at=excluded.updated_at').run(d,...vals,now())}
 else if(a==='import'){const p=JSON.parse(f.get('payload')||'');for(const v of Array.isArray(p)?p:[p])ingest(v)}
 else throw Error('Operação inválida');
}
function history(){return {campaigns:campaigns(),ads:allAds(),daily:db.prepare('SELECT * FROM daily ORDER BY date,ad_id').all(),runs:db.prepare('SELECT * FROM runs ORDER BY at').all(),observations:db.prepare('SELECT * FROM observations ORDER BY run_id,date,ad_id').all(),decisions:db.prepare('SELECT * FROM decisions').all(),finance:db.prepare('SELECT * FROM finance').all(),experiments:db.prepare('SELECT * FROM experiments').all(),experiment_links:db.prepare('SELECT * FROM experiment_links').all(),experiment_events:db.prepare('SELECT * FROM experiment_events').all(),manager_decisions:db.prepare('SELECT * FROM manager_decisions').all(),manager_events:db.prepare('SELECT * FROM manager_events').all(),learning_trials:db.prepare('SELECT * FROM learning_trials').all(),learning_daily:db.prepare('SELECT * FROM learning_daily').all(),strategy_recommendations:db.prepare('SELECT * FROM strategy_recommendations').all()}}
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
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0c0918"><title>Eduverso Intelligence | Acesso interno</title><link rel="icon" type="image/svg+xml" href="/favicon.svg?v=1"><style>*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;background:radial-gradient(ellipse at 15% 10%,#30174d 0,transparent 48%),radial-gradient(ellipse at 100% 100%,#20163d 0,transparent 50%),#0c0918;color:#f7f4ff;font:15px system-ui,-apple-system,BlinkMacSystemFont,sans-serif;padding:24px}.shell{width:min(100%,960px);display:grid;grid-template-columns:1.1fr 1fr;border:1px solid #35294d;border-radius:26px;overflow:hidden;background:#151023;box-shadow:0 30px 100px #0007}.intro{padding:48px 38px;background:linear-gradient(150deg,#25173d,#171126);display:flex;flex-direction:column;justify-content:space-between;gap:30px}.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:760;letter-spacing:-.6px}.mark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#ad7aff,#7042dc);box-shadow:0 8px 24px #8850ff45}.mark svg{width:26px;height:26px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:2.1px;color:#c2a7ff;text-transform:uppercase}.intro h1{font-size:clamp(34px,4vw,48px);line-height:1.07;letter-spacing:-1.8px;margin:14px 0}.accent{color:#bb9aff}p{color:#b9afca;line-height:1.65;margin:0}.features{display:grid;gap:12px;color:#ddd1f3;font-size:14px}.features span{display:flex;gap:9px;align-items:center}.dot{width:7px;height:7px;background:#a477ff;border-radius:50%;box-shadow:0 0 12px #b48aff}.formside{padding:48px 36px;display:flex;flex-direction:column;justify-content:center}.formside h2{font-size:29px;margin:12px 0 8px;letter-spacing:-.8px}.formside form{display:grid;gap:16px;margin-top:28px}label{font-weight:600;font-size:13px;color:#e8e0f5;display:block;margin-bottom:8px}input{width:100%;background:#100d1c;border:1px solid #403451;border-radius:12px;padding:14px 15px;color:#fff;font:inherit;font-size:16px;outline:none}input:focus{border-color:#aa80ff;box-shadow:0 0 0 3px #9463ff25}button{min-height:48px;border:0;border-radius:12px;background:linear-gradient(105deg,#8957ec,#a575ff);color:white;font:inherit;font-weight:750;cursor:pointer;box-shadow:0 8px 25px #8253e52c}button:hover{filter:brightness(1.09)}.error{background:#481d36;border:1px solid #81415c;color:#ffd0df;border-radius:10px;padding:12px;font-size:13px}.foot{border-top:1px solid #322743;margin-top:28px;padding-top:18px;color:#a89db9;font-size:12px;display:flex;align-items:center;gap:8px}.foot svg{width:15px;height:15px;flex:none}@media(max-width:700px){body{padding:16px}.shell{grid-template-columns:1fr;border-radius:22px}.intro{padding:24px;gap:18px}.intro h1{font-size:30px;margin:9px 0}.intro p{font-size:13px}.features{display:none}.formside{padding:26px 24px 30px}.formside h2{font-size:26px}.formside form{margin-top:22px}.brand{font-size:20px}.mark{width:36px;height:36px}.foot{margin-top:22px}}</style></head><body><main class="shell"><section class="intro"><div class="brand"><span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19V5m0 14h18M7 15l4-4 3 3 6-7m-5 0h5v5"/></svg></span>Eduverso<span class="accent">Intelligence</span></div><div><div class="eyebrow">Central de inteligência comercial</div><h1>Dados que orientam <span class="accent">decisões.</span></h1><p>Monitoramento de campanhas, desempenho dos criativos e evolução comercial em um só lugar.</p></div><div class="features"><span><i class="dot"></i> Monitoramento de Meta Ads</span><span><i class="dot"></i> Histórico de desempenho</span><span><i class="dot"></i> Gestão de testes de criativos</span></div></section><section class="formside"><div class="eyebrow">Área administrativa</div><h2>Bem-vindo de volta</h2><p>Entre com suas credenciais para acessar o painel interno.</p><form method="post" action="/login"><input type="hidden" name="csrf" value="'+esc(csrf)+'">'+(error?'<div class="error" role="alert">'+esc(error)+'</div>':'')+'<div><label for="username">Usuário</label><input id="username" name="username" autocomplete="username" placeholder="Seu usuário" required maxlength="100"></div><div><label for="password">Senha</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Sua senha" required maxlength="256"></div><button type="submit">Acessar painel &rarr;</button></form><div class="foot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Acesso restrito · Eduverso Intelligence</div></section></main></body></html>';
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
const funnelKinds=new Set(['landing_view','engaged','cta_click','checkout_redirect']);
function validateFunnel(p){
 if(!p||typeof p!=='object'||Array.isArray(p))throw Error('Evento inválido');
 if(Object.keys(p).some(k=>!['event_id','session_id','at','kind','campaign_id','ad_id'].includes(k)))throw Error('Campos não permitidos no evento');
 const randomId=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(x);
 if(!randomId(p.event_id)||!randomId(p.session_id)||!funnelKinds.has(p.kind))throw Error('Identificador aleatório ou evento inválido');
 if(typeof p.at!=='string'||!/(?:Z|[+-]\d{2}:\d{2})$/.test(p.at)||!Number.isFinite(Date.parse(p.at)))throw Error('Horário inválido');
 const ms=Date.parse(p.at);if(ms>Date.now()+5*60000||ms<Date.now()-7*86400000)throw Error('Horário fora da janela de recebimento');
 for(const k of ['campaign_id','ad_id'])if(p[k]!=null&&!validID(p[k]))throw Error('Identificador de anúncio inválido');
 return {event_id:p.event_id.toLowerCase(),session_id:p.session_id.toLowerCase(),kind:p.kind,at:new Date(ms).toISOString(),date:new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo'}).format(new Date(ms)),campaign_id:p.campaign_id||null,ad_id:p.ad_id||null};
}
function recordFunnel(p){
 // Store keyed pseudonymous session identifiers; the original browser ID is never persisted.
 let salt=setting('funnel_session_salt');if(!salt){salt=randomBytes(32).toString('hex');setSetting('funnel_session_salt',salt)}
 const sessionHash=createHash('sha256').update(salt+':'+p.session_id).digest('hex');
 let campaignId=p.campaign_id,adId=p.ad_id;
 if(adId){const ad=db.prepare('SELECT campaign_id FROM ads WHERE id=?').get(adId);if(ad&&campaignId&&ad.campaign_id!==campaignId)throw Error('Anúncio não pertence à campanha');if(ad&&!campaignId)campaignId=ad.campaign_id}
 const result=db.prepare('INSERT OR IGNORE INTO funnel_events VALUES(?,?,?,?,?,?,?)').run(p.event_id,p.at,p.date,p.kind,sessionHash,campaignId,adId);
 if(result.changes){setSetting('funnel_last_at',now())}
 return {duplicate:!result.changes};
}
function funnelTokenHash(){const stored=setting('funnel_token_hash');if(stored)return stored;const initial=process.env.FUNNEL_INITIAL_TOKEN_HASH;return typeof initial==='string'&&/^[a-f0-9]{64}$/.test(initial)?initial:null}
async function handleFunnel(req,res){
 const expected=funnelTokenHash(),provided=(req.headers.authorization||'').match(/^Bearer (ef_[a-f0-9]{64})$/)?.[1];
 if(!expected){json(res,503,{ok:false,error:'Rastreamento ainda não habilitado'});return}
 if(!provided||!eq(tokenDigest(provided),expected)){json(res,401,{ok:false,error:'Credencial inválida'});return}
 if(req.method!=='POST'){json(res,405,{ok:false,error:'Método inválido'});return}
 if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||'')){json(res,415,{ok:false,error:'Use application/json'});return}
 if(Number(req.headers['content-length']||0)>4096){json(res,413,{ok:false,error:'Evento muito grande'});return}
 try{const p=validateFunnel(await readJson(req));const result=recordFunnel(p);json(res,result.duplicate?200:201,{ok:true,...result})}catch(e){const status=e.status||(/SQLITE|database/i.test(e.message)?500:400);if(!res.destroyed)json(res,status,{ok:false,error:status===500?'Erro de armazenamento':clean(e.message,160)})}
}
const kiwifyKinds=new Map([['order_approved','paid'],['subscription_renewed','paid'],['order_refunded','refunded'],['chargeback','chargedback'],['order_chargeback','chargedback']]);
function kiwifyVerify(raw,signature,secret){
 if(!secret||typeof signature!=='string'||!/^[a-f0-9]{40}$/i.test(signature))return false;
 const expected=createHmac('sha1',secret).update(raw).digest('hex');
 return eq(expected,signature.toLowerCase());
}
function kiwifyNormalize(p,received){
 const kind=p?.webhook_event_type,status=kiwifyKinds.get(kind);
 if(!status)return null;
 const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(x);
 if(!uuid(p.order_id)||!uuid(p.Product?.product_id))throw Error('Pedido ou produto inválido');
 const accepted=status==='chargedback'?['chargedback','chargeback']: [status];
 if(!accepted.includes(p.order_status))throw Error('Estado do pedido incompatível com evento');
 const c=p.Commissions||{},cents=x=>Number.isSafeInteger(x)&&x>=0?x:null;
 const date=x=>typeof x==='string'&&dateOK(x.slice(0,10))?x.slice(0,10):null;
 const approval=date(p.approved_date);
 if(status==='paid'&&!approval)throw Error('Data de aprovação ausente');
 return {order:p.order_id.toLowerCase(),product:p.Product.product_id.toLowerCase(),name:clean(p.Product.product_name,160),status,approval,terminalDay:status==='paid'?null:date(p.refunded_at)||date(p.updated_at)||new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo'}).format(new Date(received)),gross:c.currency==='BRL'?cents(c.charge_amount):null,fee:c.kiwify_fee_currency==='BRL'?cents(c.kiwify_fee):null,commission:c.product_base_price_currency==='BRL'&&c.currency==='BRL'?cents(c.my_commission):null,received};
}
function saveKiwify(p){
 return tx(()=>{
 const prior=db.prepare('SELECT * FROM kiwify_orders WHERE order_id=?').get(p.order);
 if(prior&&prior.product_id!==p.product)throw Error('Produto divergente no mesmo pedido');
 const terminal=prior?.terminal_status||(p.status==='paid'?null:p.status);
 const day=prior?.terminal_day||p.terminalDay;
 const approved=prior?.approved_day||p.approval;
 const gross=prior?.gross_cents??p.gross,fee=prior?.fee_cents??p.fee,commission=prior?.commission_cents??p.commission;
 if(prior&&prior.terminal_status===terminal&&prior.terminal_day===day&&prior.approved_day===approved&&prior.gross_cents===gross&&prior.fee_cents===fee&&prior.commission_cents===commission)return {duplicate:true};
 db.prepare('INSERT INTO kiwify_orders VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(order_id) DO UPDATE SET approved_day=excluded.approved_day,terminal_status=excluded.terminal_status,terminal_day=excluded.terminal_day,gross_cents=excluded.gross_cents,fee_cents=excluded.fee_cents,commission_cents=excluded.commission_cents,received_at=excluded.received_at').run(p.order,p.product,p.name,approved,terminal,day,gross,fee,commission,p.received);
 setSetting('kiwify_last_at',p.received);return {duplicate:false};
 });
}
async function handleKiwify(req,res,url){
 const test=url.pathname==='/api/kiwify/test',configs=kiwifyConfigs();
 if(!configs.length){json(res,503,{ok:false,error:'Integração não configurada'});return}
 if(req.method!=='POST'){json(res,405,{ok:false,error:'Método inválido'});return}
 if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||'')){json(res,415,{ok:false,error:'Use application/json'});return}
 try{
  const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>512*1024){json(res,413,{ok:false,error:'Payload muito grande'});return}chunks.push(chunk)}
  const raw=Buffer.concat(chunks);
  const authenticated=kiwifyAuth(raw,url.searchParams.get('signature'),configs);if(!authenticated){json(res,401,{ok:false,error:'Assinatura inválida'});return}
  let payload;try{payload=JSON.parse(raw.toString('utf8'))}catch{json(res,400,{ok:false,error:'JSON inválido'});return}
  const normalized=kiwifyNormalize(payload,now());
  if(test){if(!normalized){json(res,400,{ok:false,error:'Evento não suportado'});return}setSetting('kiwify_test_at',now());setSetting('kiwify_test_at:'+authenticated.plan,now());console.info('KIWIFY_TEST_OK '+JSON.stringify({plan:authenticated.plan}));json(res,200,{ok:true,test:true,plan:authenticated.plan});return}
  if(!normalized){json(res,200,{ok:true,ignored:true});return}
  if(normalized.product!==authenticated.id){json(res,403,{ok:false,error:'Produto não autorizado'});return}
  const result=saveKiwify(normalized);console.info('KIWIFY_EVENT '+JSON.stringify({plan:authenticated.plan,status:normalized.status,duplicate:result.duplicate}));json(res,200,{ok:true,...result});
 }catch(e){if(!res.destroyed)json(res,/SQLITE|database/i.test(e.message)?500:400,{ok:false,error:'Não foi possível validar ou armazenar o evento'});}
}
function html(res,status,body){res.writeHead(status,{'Content-Type':'text/html; charset=utf-8'});res.end(body)}
const loginNonce=req=>(req.headers.cookie||'').match(/(?:^|;\s*)eduverso_login=([a-f0-9]{64})(?:;|$)/)?.[1]||'';
const sessionCsrf=req=>createHash('sha256').update('dashboard-csrf:'+sid(req)).digest('hex');
function showLogin(res,status=200,error=''){const nonce=randomBytes(32).toString('hex');res.setHeader('Set-Cookie','eduverso_login='+nonce+'; Path=/login; HttpOnly; Secure; SameSite=Lax; Max-Age=900');html(res,status,loginPage(error,nonce))}
function redirect(res,path){res.writeHead(303,{Location:path});res.end()}
async function formBody(req){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>1024*1024)throw Error('Payload too large');chunks.push(chunk)}return new URLSearchParams(Buffer.concat(chunks).toString())}
const dashboardFavicon="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"#ad7aff\"/><stop offset=\"1\" stop-color=\"#7042dc\"/></linearGradient></defs><rect width=\"64\" height=\"64\" rx=\"15\" fill=\"url(#g)\"/><path d=\"M15 14v35h35M23 39l10-10 8 7 11-16m-10 0h10v10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>";
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
 if(['GET','HEAD'].includes(req.method)&&['/favicon.svg','/favicon.ico'].includes(new URL(req.url,'http://localhost').pathname)){res.setHeader('Cache-Control','public, max-age=86400');res.setHeader('Content-Type','image/svg+xml; charset=utf-8');res.end(req.method==='HEAD'?undefined:dashboardFavicon);return}
 if(req.url==='/health'){res.end('ok');return}
 const incomingUrl=new URL(req.url,'http://localhost');if(['/api/kiwify/webhook','/api/kiwify/test'].includes(incomingUrl.pathname)){await handleKiwify(req,res,incomingUrl);return}
 if(req.url==='/api/ingest'||req.url==='/api/ingest/status'){await handleIngest(req,res);return}
 if(req.url==='/api/funnel/events'){await handleFunnel(req,res);return}
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
 if(req.method==='POST'&&req.url==='/funnel-token'){
  const token='ef_'+randomBytes(32).toString('hex');setSetting('funnel_token_hash',tokenDigest(token));html(res,200,'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Credencial de rastreamento</title><style>body{background:#0c0b14;color:#f5f1ff;font:16px system-ui;padding:24px;max-width:640px;margin:auto}textarea{background:#191427;color:#f5f1ff;width:100%;box-sizing:border-box;padding:14px;border:1px solid #564070;border-radius:10px;font:14px monospace}a{color:#c5a6ff}</style><h1>Credencial de rastreamento</h1><p>Guarde no backend da landing page. Exibida apenas uma vez. A chave anterior foi revogada. Atualize EDUVERSO_INTELLIGENCE_FUNNEL_TOKEN no serviço da landing page.</p><textarea readonly rows="4">'+esc(token)+'</textarea><p>POST /api/funnel/events · Authorization: Bearer</p><p><a href="/?view=settings">Voltar às integrações</a></p></html>');return
 }
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
function learningTick(){try{refreshLearning()}catch(e){console.warn('LEARNING_ERROR',clean(e.message,200))}try{refreshExperiments()}catch(e){console.warn('EXPERIMENT_ERROR',clean(e.message,200))}}
learningTick();setInterval(learningTick,15*60*1000).unref();
function strategyTick(){try{refreshStrategy()}catch(e){console.warn('STRATEGY_ERROR',clean(e.message,200))}try{refreshManager()}catch(e){console.warn('MANAGER_ERROR',clean(e.message,200))}}
strategyTick();setInterval(strategyTick,15*60*1000).unref();
