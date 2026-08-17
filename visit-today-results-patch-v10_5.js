window.patchRadarVisitTodayResultsV105=function(html){
const CSS=String.raw`
/* Radar Local V10.5 — cierre de campo del 17 de agosto */
.v104-route-banner.v105-summary{border-color:#b8dfca;background:#f1faf5}.v104-route-banner.v105-summary span{color:#08764a}.v104-route-banner.v105-summary em{background:#daf3e6;color:#08764a}.v104-field-log.v105-summary{border-color:#d7e6de;background:#fbfefc}.visit-stop.v105-card{border-color:#b8dfca;background:#f2faf6;opacity:1}.visit-stop.v105-card .v104-stop-note{color:#08764a!important}.visit-stop.v105-scale{border-color:#dce2e8;background:#f8f9fb;opacity:.72}.visit-stop.v105-retry{border-color:#ead9b9;background:#fffaf1}.visit-stop.v105-retry .v104-stop-note{color:#8b6319!important}
`;
const JS=String.raw`
(function(){
const ROUTE_DATE='2026-08-17';
const IDS=['11055226','11682280','10821806','7197654','11281677','9534743','10771471','4408429','8788752','11739719'];
const SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE;
const MARKER_KEY='radar_visit_route_seed_2026_08_17_v105';
const OUTCOMES={
 '8788752':{status:'recorded',label:'Tarjeta entregada',result:'card_delivered',note:'Tarjeta entregada en visita presencial.'},
 '11739719':{status:'skipped',label:'Descartado · compañía grande',result:'skip_large_company',note:'No se visitó; se descartó por escala.'},
 '10821806':{status:'skipped',label:'No entré · retomar con guion corto',result:'retry_confidence',note:'No entré; me dio pena.'}
};
const NOTES={
 '11055226':'Tarjeta entregada · esperan contacto',
 '11682280':'Tarjeta entregada',
 '10821806':'No entré · retomar con guion corto',
 '9534743':'Descartado · parecía automatizado',
 '10771471':'Había mucha gente · reintentar',
 '4408429':'Había mucha gente · reintentar',
 '8788752':'Tarjeta entregada',
 '11739719':'Descartado · compañía grande'
};
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value||fallback}catch{return fallback}}
function reported(previous,outcome,at){return Object.assign({},previous||{},{status:outcome.status,label:outcome.label,at:(previous&&previous.at)||at,source:'field_report'})}
function nextOpen(ids,done,from){const n=ids.length;if(!n)return 0;for(let step=1;step<=n;step++){const i=(from+step+n)%n;if(!done[ids[i]])return i}return Math.max(0,Math.min(n-1,from))}
function seed(){
 if(localDate()!==ROUTE_DATE||localStorage.getItem(MARKER_KEY)==='1')return false;
 const previous=read(SESSION_KEY,{}),ids=Array.isArray(previous.ids)&&previous.ids.length?previous.ids.map(String):IDS.slice(),done=Object.assign({},previous&&typeof previous.done==='object'?previous.done:{}),at=new Date().toISOString();
 Object.keys(OUTCOMES).forEach(function(id){done[id]=reported(done[id],OUTCOMES[id],at)});
 const replaced=new Set(Object.keys(OUTCOMES)),oldLog=Array.isArray(previous.fieldLog)?previous.fieldLog.filter(function(item){return !replaced.has(String(item&&item.id))}):[];
 Object.keys(OUTCOMES).forEach(function(id){const outcome=OUTCOMES[id];oldLog.push({id:id,result:outcome.result,note:outcome.note})});
 const start=Number.isInteger(previous.index)?previous.index:0,index=nextOpen(ids,done,start);
 localStorage.setItem(SESSION_KEY,JSON.stringify(Object.assign({},previous,{day:Number.isInteger(previous.day)?previous.day:0,source:previous.source||'basket',ids:ids,index:index,done:done,createdAt:previous.createdAt||at,routeLabel:'Cierre de campo · 17 agosto',startTime:previous.startTime||'09:00',fieldLog:oldLog})));
 localStorage.setItem(MARKER_KEY,'1');
 return true;
}
function setSummary(node,htmlText){if(!node||node.dataset.v105Summary==='1')return;node.dataset.v105Summary='1';node.classList.add('v105-summary');node.innerHTML=htmlText}
function decorate(){
 if(localDate()!==ROUTE_DATE)return;
 setSummary(document.querySelector('#visitsView .v104-route-banner'),'<div><span>CIERRE DE CAMPO · GIRO CAFETERÍAS</span><b>La Abuelita + Vive Café + Wego</b><small>Tres tarjetas entregadas. Café Café se descartó por escala; Ameyalli queda para retomar con un guion de entrada corto.</small></div><em>3 tarjetas entregadas</em>');
 setSummary(document.querySelector('#visitsView .v104-field-log'),'<b>Bitácora de hoy:</b> tarjetas en La Abuelita, Vive Café y Wego · descartados Breve (automatizado) y Café Café (compañía grande) · reintentar Mr Rocco y Vero con menos gente, y Ameyalli con guion corto.');
 document.querySelectorAll('#visitQueue .visit-stop').forEach(function(stop){
  const i=Number(stop.dataset.visitJump),id=IDS[i],target=stop.querySelector('span:nth-child(2)'),note=target&&target.querySelector('.v104-stop-note');
  stop.classList.remove('v104-next','v104-after','v105-card','v105-scale','v105-retry');
  if(id==='11055226'||id==='11682280'||id==='8788752')stop.classList.add('v105-card');
  if(id==='11739719'||id==='9534743')stop.classList.add('v105-scale');
  if(id==='10821806'||id==='10771471'||id==='4408429')stop.classList.add('v105-retry');
  if(target&&NOTES[id]){if(note){if(note.textContent!==NOTES[id])note.textContent=NOTES[id]}else{const next=document.createElement('small');next.className='v104-stop-note';next.textContent=NOTES[id];target.appendChild(next)}}
 });
}
seed();
let tries=0,timer=setInterval(function(){tries++;decorate();if(tries>=24)clearInterval(timer)},500);
setTimeout(decorate,180);setTimeout(decorate,900);
new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
window.radarTodayResultsV105={version:'10.5',date:ROUTE_DATE,outcomes:Object.assign({},OUTCOMES),restore:function(){localStorage.removeItem(MARKER_KEY);seed();location.reload()}};
})();
`;
const headPos=html.lastIndexOf('</head>');
if(headPos>=0)html=html.slice(0,headPos)+'<style>'+CSS+'</style>'+html.slice(headPos);
const pos=html.lastIndexOf('</body>');
if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
return html;
};
