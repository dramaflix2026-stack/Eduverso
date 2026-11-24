import http from 'node:http';
import fs from 'node:fs';
import {timingSafeEqual,createHash,randomBytes} from 'node:crypto';
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
 return '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Eduverso | Intelligence</title><style>*{box-sizing:border-box}body{margin:0;background:#0b1020;color:#e8edf8;font:15px system-ui}main{max-width:1150px;margin:auto;padding:26px}h1{font-size:32px;margin:8px 0}small,p{color:#9aa9c3;line-height:1.6}.tag{color:#79d7e8;font-size:12px;letter-spacing:2px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}.card,section{background:#141d30;border:1px solid #26334d;border-radius:16px;padding:18px;margin:12px 0}.card b{display:block;font-size:25px;margin-top:8px}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:12px 8px;border-bottom:1px solid #26334d}th{color:#a6b3ca;font-size:13px}.scroll{overflow:auto}a{color:#79d7e8}button{border:0;border-radius:8px;padding:10px 15px;background:#79d7e8;color:#0b1020;font-weight:bold}</style><main><div class="tag">EDUVERSO • INTELIGÊNCIA COMERCIAL</div><form method="post" action="/logout" style="float:right"><button style="background:#26334d;color:#e8edf8">Sair</button></form><h1>Visão geral</h1><p>Somente leitura da Meta · horário de Brasília · '+esc(today())+'</p><section><b>'+esc(c.campaign||'Campanha a configurar')+'</b><p>ABO · 1 campanha / 1 conjunto / 3 anúncios · orçamento '+esc(c.dailyBudget?money(c.dailyBudget):'—')+'/dia</p><p>Conexão Meta: '+(ready()?'configurada':'aguardando credenciais e ID da campanha')+' · Última coleta: '+esc(state.lastSuccess||'nenhuma')+' · '+state.snapshots.length+' coletas armazenadas</p><p>'+esc(state.lastError||'')+'</p><form method="post" action="/sync"><button>Atualizar dados</button></form></section><h2>Hoje — Meta Ads</h2><div class="grid">'+cards.map(([k,v])=>'<div class="card"><small>'+k+'</small><b>'+val(v)+'</b></div>').join('')+'</div><section><h2>Catálogo de criativos</h2><p>Mesmo vídeo da plataforma, locução feminina sem rosto. A variável testada é a mensagem/narração; transcrições pendentes de conferência.</p><div class="scroll"><table><tr><th>Criativo</th><th>Argumento</th><th>Gancho registrado</th></tr>'+(c.creatives||[]).map(x=>'<tr><td>'+esc(x.id)+'</td><td>'+esc(x.angle)+'</td><td>'+esc(x.hook)+'</td></tr>').join('')+'</table></div></section><section><h2>Desempenho por anúncio · hoje</h2><div class="scroll"><table><tr><th>Anúncio</th><th>Gasto</th><th>Impressões</th><th>Cliques link</th><th>CTR link</th><th>Compras Meta</th></tr>'+rows.map(r=>'<tr><td>'+esc(r.ad_name)+'</td><td>'+money(r.spend)+'</td><td>'+esc(r.impressions)+'</td><td>'+esc(r.inline_link_clicks)+'</td><td>'+pct(ratio(Number(r.inline_link_clicks||0),Number(r.impressions)))+'</td><td>'+action([r],'purchase')+'</td></tr>').join('')+'</table></div><p>Conversões atribuídas pela Meta, não vendas confirmadas pela Kiwify. Sem dados recebidos, não exibimos resultados simulados.</p><a href="/api/history">Histórico bruto autenticado (JSON)</a></section></main></html>';
}
const sessions=new Map(), TTL=8*60*60*1000;
const hash=x=>createHash('sha256').update(x).digest();
const eq=(a,b)=>timingSafeEqual(hash(String(a)),hash(String(b)));
const sid=req=>(req.headers.cookie||'').match(/(?:^|;\s*)eduverso_session=([a-f0-9]{64})(?:;|$)/)?.[1];
function allowed(req){const token=sid(req), expires=sessions.get(token);if(!expires||expires<=Date.now()){if(token)sessions.delete(token);return false}return true}
const cookie=(value,age)=>'eduverso_session='+value+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age='+age;
let failures=0, windowEnd=0;
function canAttempt(){if(Date.now()>=windowEnd){failures=0;windowEnd=Date.now()+60000}return failures<12}
function loginPage(error=''){
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0c0918"><title>Eduverso Intelligence | Acesso interno</title><style>*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;background:radial-gradient(ellipse at 15% 10%,#30174d 0,transparent 48%),radial-gradient(ellipse at 100% 100%,#20163d 0,transparent 50%),#0c0918;color:#f7f4ff;font:15px system-ui,-apple-system,BlinkMacSystemFont,sans-serif;padding:24px}.shell{width:min(100%,960px);display:grid;grid-template-columns:1.1fr 1fr;border:1px solid #35294d;border-radius:26px;overflow:hidden;background:#151023;box-shadow:0 30px 100px #0007}.intro{padding:48px 38px;background:linear-gradient(150deg,#25173d,#171126);display:flex;flex-direction:column;justify-content:space-between;gap:30px}.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:760;letter-spacing:-.6px}.mark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#ad7aff,#7042dc);box-shadow:0 8px 24px #8850ff45}.mark svg{width:26px;height:26px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:2.1px;color:#c2a7ff;text-transform:uppercase}.intro h1{font-size:clamp(34px,4vw,48px);line-height:1.07;letter-spacing:-1.8px;margin:14px 0}.accent{color:#bb9aff}p{color:#b9afca;line-height:1.65;margin:0}.features{display:grid;gap:12px;color:#ddd1f3;font-size:14px}.features span{display:flex;gap:9px;align-items:center}.dot{width:7px;height:7px;background:#a477ff;border-radius:50%;box-shadow:0 0 12px #b48aff}.formside{padding:48px 36px;display:flex;flex-direction:column;justify-content:center}.formside h2{font-size:29px;margin:12px 0 8px;letter-spacing:-.8px}.formside form{display:grid;gap:16px;margin-top:28px}label{font-weight:600;font-size:13px;color:#e8e0f5;display:block;margin-bottom:8px}input{width:100%;background:#100d1c;border:1px solid #403451;border-radius:12px;padding:14px 15px;color:#fff;font:inherit;font-size:16px;outline:none}input:focus{border-color:#aa80ff;box-shadow:0 0 0 3px #9463ff25}button{min-height:48px;border:0;border-radius:12px;background:linear-gradient(105deg,#8957ec,#a575ff);color:white;font:inherit;font-weight:750;cursor:pointer;box-shadow:0 8px 25px #8253e52c}button:hover{filter:brightness(1.09)}.error{background:#481d36;border:1px solid #81415c;color:#ffd0df;border-radius:10px;padding:12px;font-size:13px}.foot{border-top:1px solid #322743;margin-top:28px;padding-top:18px;color:#a89db9;font-size:12px;display:flex;align-items:center;gap:8px}.foot svg{width:15px;height:15px;flex:none}@media(max-width:700px){body{padding:16px}.shell{grid-template-columns:1fr;border-radius:22px}.intro{padding:24px;gap:18px}.intro h1{font-size:30px;margin:9px 0}.intro p{font-size:13px}.features{display:none}.formside{padding:26px 24px 30px}.formside h2{font-size:26px}.formside form{margin-top:22px}.brand{font-size:20px}.mark{width:36px;height:36px}.foot{margin-top:22px}}</style></head><body><main class="shell"><section class="intro"><div class="brand"><span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19V5m0 14h18M7 15l4-4 3 3 6-7m-5 0h5v5"/></svg></span>Eduverso<span class="accent">Intelligence</span></div><div><div class="eyebrow">Central de inteligência comercial</div><h1>Dados que orientam <span class="accent">decisões.</span></h1><p>Monitoramento de campanhas, desempenho dos criativos e evolução comercial em um só lugar.</p></div><div class="features"><span><i class="dot"></i> Monitoramento de Meta Ads</span><span><i class="dot"></i> Histórico de desempenho</span><span><i class="dot"></i> Gestão de testes de criativos</span></div></section><section class="formside"><div class="eyebrow">Área administrativa</div><h2>Bem-vindo de volta</h2><p>Entre com suas credenciais para acessar o painel interno.</p><form method="post" action="/login">'+(error?'<div class="error" role="alert">'+esc(error)+'</div>':'')+'<div><label for="username">Usuário</label><input id="username" name="username" autocomplete="username" placeholder="Seu usuário" required maxlength="100"></div><div><label for="password">Senha</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Sua senha" required maxlength="256"></div><button type="submit">Acessar painel &rarr;</button></form><div class="foot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Acesso restrito · Eduverso Intelligence</div></section></main></body></html>';
}
function html(res,status,body){res.writeHead(status,{'Content-Type':'text/html; charset=utf-8'});res.end(body)}
function redirect(res,path){res.writeHead(303,{Location:path});res.end()}
async function formBody(req){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>4096)throw Error('Payload too large');chunks.push(chunk)}return new URLSearchParams(Buffer.concat(chunks).toString())}
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
 if(req.url==='/health'){res.end('ok');return}
 if(!process.env.DASHBOARD_PASSWORD){html(res,503,loginPage('Acesso administrativo ainda não configurado.'));return}
 if(req.method==='POST'&&(req.headers['sec-fetch-site']==='cross-site'||(req.headers.origin&&req.headers.origin!=='https://'+req.headers.host))){res.writeHead(403);res.end();return}
 if(req.method==='GET'&&req.url==='/login'){if(allowed(req)){redirect(res,'/');return}html(res,200,loginPage());return}
 if(req.method==='POST'&&req.url==='/login'){
  if(!canAttempt()){html(res,429,loginPage('Muitas tentativas. Aguarde um minuto e tente novamente.'));return}
  try{
   const f=await formBody(req);const validUser=eq(f.get('username')||'',process.env.DASHBOARD_USERNAME||'admin');const validPassword=eq(f.get('password')||'',process.env.DASHBOARD_PASSWORD);
   if(!validUser||!validPassword){failures++;html(res,401,loginPage('Usuário ou senha incorretos.'));return}
   for(const [id,expires] of sessions)if(expires<=Date.now())sessions.delete(id);
   if(sessions.size>=1000)sessions.delete(sessions.keys().next().value);
   const previous=sid(req);if(previous)sessions.delete(previous);
   const token=randomBytes(32).toString('hex');sessions.set(token,Date.now()+TTL);res.setHeader('Set-Cookie',cookie(token,TTL/1000));redirect(res,'/');return
  }catch{if(!res.destroyed)html(res,400,loginPage('Não foi possível processar o login.'));return}
 }
 if(!allowed(req)){if(req.url.startsWith('/api/')){res.writeHead(401,{'Content-Type':'application/json'});res.end('{"error":"Acesso restrito"}');return}redirect(res,'/login');return}
 if(req.method==='POST'&&req.url==='/logout'){sessions.delete(sid(req));res.setHeader('Set-Cookie',cookie('',0));redirect(res,'/login');return}
 if(req.method==='POST'&&req.url==='/sync'){await sync();redirect(res,'/');return}
 if(req.method==='GET'&&req.url==='/api/history'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(state));return}
 if(req.method==='GET'&&req.url==='/'){html(res,200,page());return}
 res.writeHead(404);res.end('Not found');
}).listen(Number(process.env.PORT||3000),'0.0.0.0');
if(ready()){sync();setInterval(sync,30*60*1000).unref()}
