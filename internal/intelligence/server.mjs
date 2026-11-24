import http from 'node:http';
import fs from 'node:fs';
import {timingSafeEqual} from 'node:crypto';
const dir=process.env.DATA_DIR||'/data', file=dir+'/state.json';
fs.mkdirSync(dir,{recursive:true});
const seed=JSON.parse(process.env.INITIAL_CATALOG||'{}');
let state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{catalog:seed,snapshots:[],lastSuccess:null,lastError:null};
function save(){fs.writeFileSync(file+'.tmp',JSON.stringify(state));fs.renameSync(file+'.tmp',file)}
save();
const ready=()=>/^act_\d+$/.test(process.env.META_AD_ACCOUNT_ID||'')&&/^v\d+\.\d+$/.test(process.env.META_GRAPH_VERSION||'')&&!!process.env.META_ACCESS_TOKEN&&!!process.env.META_CAMPAIGN_ID;
let syncing=false;
async function sync(){
 if(!ready()||syncing)return;
 syncing=true;
 try{
  const u=new URL('https://graph.facebook.com/'+process.env.META_GRAPH_VERSION+'/'+process.env.META_AD_ACCOUNT_ID+'/insights');
  const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo'}).format(new Date());
  u.search=new URLSearchParams({level:'ad',fields:'campaign_id,campaign_name,adset_id,adset_name,ad_id,ad_name,spend,impressions,reach,frequency,inline_link_clicks,actions,action_values,date_start,date_stop',time_increment:'1',time_range:JSON.stringify({since:state.catalog.startDate||date,until:date}),filtering:JSON.stringify([{field:'campaign.id',operator:'IN',value:[process.env.META_CAMPAIGN_ID]}]),limit:'100'}).toString();
  const rows=[]; let next=u.toString();
  for(let i=0;next&&i<100;i++){
   if(new URL(next).origin!=='https://graph.facebook.com')throw Error('Origem inesperada');
   const r=await fetch(next,{headers:{Authorization:'Bearer '+process.env.META_ACCESS_TOKEN},signal:AbortSignal.timeout(20000)});
   if(!r.ok)throw Error('Meta HTTP '+r.status);
   const j=await r.json();if(!Array.isArray(j.data))throw Error('Resposta inválida');
   rows.push(...j.data);next=j.paging?.next;
  }
  if(next)throw Error('Paginação incompleta');
  state.lastSuccess=new Date().toISOString();
  state.snapshots.push({at:state.lastSuccess,rows});state.lastError=null;save();
 }catch(e){state.lastError=e.message.slice(0,120);save()}finally{syncing=false}
}
const esc=s=>String(s??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const sum=(rows,k)=>rows.reduce((a,r)=>a+Number(r[k]||0),0);
const action=(rows,k)=>rows.reduce((a,r)=>a+Number((r.actions||[]).find(x=>x.action_type===k)?.value||0),0);
const ratio=(n,d)=>d?n/d:null;
const pct=n=>n===null?'—':(100*n).toFixed(2)+'%';
const br=n=>n===null?'—':money(n);
const today=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo'}).format(new Date());
function page(){
 const c=state.catalog, snap=state.snapshots.at(-1), rows=(snap?.rows||[]).filter(r=>r.date_start===today());
 const spend=sum(rows,'spend'),imp=sum(rows,'impressions'),clicks=sum(rows,'inline_link_clicks'),lpv=action(rows,'landing_page_view'),checkout=action(rows,'initiate_checkout'),purchases=action(rows,'purchase');
 const val=(v)=>snap?esc(v):'—';
 const cards=[['Investimento',money(spend)],['Impressões',imp],['CTR link',pct(ratio(clicks,imp))],['CPC link',br(ratio(spend,clicks))],['Visitas',lpv],['Checkouts Meta',checkout],['Compras Meta',purchases],['CPA Meta',br(ratio(spend,purchases))]];
 return '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Eduverso | Intelligence</title><style>*{box-sizing:border-box}body{margin:0;background:#0b1020;color:#e8edf8;font:15px system-ui}main{max-width:1150px;margin:auto;padding:26px}h1{font-size:32px;margin:8px 0}small,p{color:#9aa9c3;line-height:1.6}.tag{color:#79d7e8;font-size:12px;letter-spacing:2px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}.card,section{background:#141d30;border:1px solid #26334d;border-radius:16px;padding:18px;margin:12px 0}.card b{display:block;font-size:25px;margin-top:8px}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:12px 8px;border-bottom:1px solid #26334d}th{color:#a6b3ca;font-size:13px}.scroll{overflow:auto}a{color:#79d7e8}button{border:0;border-radius:8px;padding:10px 15px;background:#79d7e8;color:#0b1020;font-weight:bold}</style><main><div class="tag">EDUVERSO • INTELIGÊNCIA COMERCIAL</div><h1>Visão geral</h1><p>Somente leitura da Meta · horário de Brasília · '+esc(today())+'</p><section><b>'+esc(c.campaign||'Campanha a configurar')+'</b><p>ABO · 1 campanha / 1 conjunto / 3 anúncios · orçamento '+esc(c.dailyBudget?money(c.dailyBudget):'—')+'/dia</p><p>Conexão Meta: '+(ready()?'configurada':'aguardando credenciais e ID da campanha')+' · Última coleta: '+esc(state.lastSuccess||'nenhuma')+' · '+state.snapshots.length+' coletas armazenadas</p><p>'+esc(state.lastError||'')+'</p><form method="post" action="/sync"><button>Atualizar dados</button></form></section><h2>Hoje — Meta Ads</h2><div class="grid">'+cards.map(([k,v])=>'<div class="card"><small>'+k+'</small><b>'+val(v)+'</b></div>').join('')+'</div><section><h2>Catálogo de criativos</h2><p>Mesmo vídeo da plataforma, locução feminina sem rosto. A variável testada é a mensagem/narração; transcrições pendentes de conferência.</p><div class="scroll"><table><tr><th>Criativo</th><th>Argumento</th><th>Gancho registrado</th></tr>'+(c.creatives||[]).map(x=>'<tr><td>'+esc(x.id)+'</td><td>'+esc(x.angle)+'</td><td>'+esc(x.hook)+'</td></tr>').join('')+'</table></div></section><section><h2>Desempenho por anúncio · hoje</h2><div class="scroll"><table><tr><th>Anúncio</th><th>Gasto</th><th>Impressões</th><th>Cliques link</th><th>CTR link</th><th>Compras Meta</th></tr>'+rows.map(r=>'<tr><td>'+esc(r.ad_name)+'</td><td>'+money(r.spend)+'</td><td>'+esc(r.impressions)+'</td><td>'+esc(r.inline_link_clicks)+'</td><td>'+pct(ratio(Number(r.inline_link_clicks||0),Number(r.impressions)))+'</td><td>'+action([r],'purchase')+'</td></tr>').join('')+'</table></div><p>Conversões atribuídas pela Meta, não vendas confirmadas pela Kiwify. Sem dados recebidos, não exibimos resultados simulados.</p><a href="/api/history">Histórico bruto autenticado (JSON)</a></section></main></html>';
}
function allowed(req){const secret=process.env.DASHBOARD_PASSWORD;if(!secret)return false;const actual=Buffer.from(req.headers.authorization||'');const expected=Buffer.from('Basic '+Buffer.from('admin:'+secret).toString('base64'));return actual.length===expected.length&&timingSafeEqual(actual,expected)}
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','no-referrer');
 if(req.url==='/health'){res.end('ok');return}
 if(!process.env.DASHBOARD_PASSWORD){res.writeHead(503);res.end('Dashboard interno: acesso ainda nao configurado.');return}
 if(!allowed(req)){res.writeHead(401,{'WWW-Authenticate':'Basic realm="Eduverso Intelligence"'});res.end('Acesso restrito');return}
 if(req.method==='POST'&&req.url==='/sync'){
  if(req.headers['sec-fetch-site']==='cross-site'){res.writeHead(403);res.end();return}
  await sync();res.writeHead(303,{Location:'/'});res.end();return
 }
 if(req.method==='GET'&&req.url==='/api/history'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(state));return}
 if(req.method==='GET'&&req.url==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(page());return}
 res.writeHead(404);res.end('Not found');
}).listen(Number(process.env.PORT||3000),'0.0.0.0');
if(ready()){sync();setInterval(sync,30*60*1000).unref()}
