window.patchRadarVisitTodayRouteV104=function(html){
const CSS=String.raw`
/* Radar Local V10.4 — field outcomes + two café-only next stops */
.v104-route-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 8px;padding:11px 12px;border:1px solid #c8dfd5;border-radius:12px;background:#f4fbf8;color:#31584a}.v104-route-banner div{min-width:0}.v104-route-banner span{display:block;font-size:7px;font-weight:900;letter-spacing:.08em;color:#0d8554}.v104-route-banner b{display:block;margin-top:3px;font-size:11px}.v104-route-banner small{display:block;margin-top:4px;font-size:7.5px;line-height:1.45;color:#60776d}.v104-route-banner em{flex:0 0 auto;border-radius:999px;background:#e7f1ff;color:#1769e0;padding:6px 8px;font-size:7px;font-style:normal;font-weight:900;white-space:nowrap}.v104-field-log{margin:0 0 10px;padding:9px 11px;border:1px solid #dfe6ee;border-radius:11px;background:#fbfcfe;color:#596a7e;font-size:8px;line-height:1.55}.v104-field-log b{color:#2f435c}.visit-stop .v104-stop-note{display:block!important;margin-top:3px!important;font-size:6.6px!important;font-weight:850!important;white-space:normal!important;line-height:1.25!important;color:#60748c!important}.visit-stop.v104-next{border-color:#98cbb5;background:#f3fbf7}.visit-stop.v104-next .v104-stop-note{color:#0d8554!important}.visit-stop.v104-after{border-color:#c7daf5;background:#f7faff}.visit-stop.v104-after .v104-stop-note{color:#1769e0!important}
@media(max-width:700px){.v104-route-banner{align-items:flex-start;padding:10px}.v104-route-banner b{font-size:10px}.v104-route-banner small{font-size:7px}.v104-route-banner em{font-size:6.5px}.v104-field-log{font-size:7.4px;padding:8px 9px}}
`;
const JS=String.raw`
(function(){
const ROUTE_DATE='2026-08-17';
const IDS=['11055226','11682280','10821806','7197654','11281677','9534743','10771471','4408429','8788752','11739719'];
const NEXT_INDEX=8;
const BASKET_KEY='radar_route_basket_v2';
const SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE;
const START_KEY='radar_visit_start_time_v91';
const MARKER_KEY='radar_visit_route_seed_2026_08_17_v104';
const NOTES={
 '11055226':'Tarjeta entregada · esperan contacto',
 '11682280':'Tarjeta entregada',
 '9534743':'Parecía ya automatizado',
 '10771471':'Muy concurrido · reintentar',
 '4408429':'Muy concurrido · reintentar',
 '8788752':'SIGUIENTE AHORA · validar abierto',
 '11739719':'DESPUÉS · sólo si está tranquilo'
};
const PLAYBOOKS={
 '8788752':{
  confidence:66,
  proposal_title:'Club de regreso · Wego Coffee & Beer',
  proposal_summary:'Un club digital muy simple para registrar visitas, activar una recompensa y guardar un canal directo con clientes frecuentes sin instalar una app.',
  evidence:['El registro público identifica una operación de 0 a 5 personas, un tamaño donde normalmente el dueño o encargado está cerca.','No aparece sitio web ni sistema propio confirmado; la ficha pública reciente sólo muestra una presencia mínima. Primero valida que siga abierto y cómo reconocen a quien regresa.'],
  angle:'Haz una validación de dos minutos. Si el dueño está ahí, entra por clientes frecuentes; si está cerrado o ya no opera, sigue sin esperar.',
  opening:'Hola, estoy ayudando a cafeterías pequeñas a hacer que sus clientes regresen con un club muy sencillo por QR. ¿Está la persona que lleva el negocio? Se lo enseño en dos minutos.',
  questions:['¿Tienen clientes que vienen seguido y ya los reconocen?','¿Usan alguna tarjeta de sellos o recompensa?','¿Tienen un WhatsApp directo para pedidos o promociones?','¿Qué beneficio sí podrían dar sin complicar la operación?'],
  features:['Tarjeta digital de visitas por QR','Recompensa sencilla definida por el negocio','Canal directo y voluntario por WhatsApp','Conteo básico de visitas y beneficios usados'],
  demo:['Registrar una visita de ejemplo','Mostrar el progreso hasta la recompensa','Abrir la vista del negocio con métricas de muestra'],
  price:{sale:'$3,000',rental:'$490/mes',setup:'$700'},
  close:'Si ya tienen clientes frecuentes pero todo depende de reconocerlos de memoria, podemos probar el club un mes sin cambiar su forma de cobrar.',
  follow_up:'Pide el WhatsApp del dueño y envía únicamente el enlace del demo personalizado de Wego.',
  avoid:'No prometas que está abierto ni que carece de sistema; ambas cosas se validan en el local.'
 },
 '11739719':{
  confidence:72,
  proposal_title:'Pedido directo + recompra · Café Café',
  proposal_summary:'Un menú corto que prepara el pedido para WhatsApp y, después de la compra, invita al cliente a volver mediante una experiencia propia y medible.',
  evidence:['La ficha pública reciente mantiene Café Café Bistro operando sobre Oriente 4 y con horario amplio los lunes.','No aparece un sitio propio en las fuentes revisadas; como es una operación más establecida, valida primero si los pedidos y la recompra ya están resueltos.'],
  angle:'No les vendas presencia digital ni un punto de venta. Pregunta si reciben pedidos directos y si tienen una forma propia de activar el regreso.',
  opening:'Hola, estoy mostrando a cafeterías locales una forma sencilla de recibir un pedido directo y dar una razón para que el cliente vuelva, sin depender de otra app. ¿Está el encargado?',
  questions:['¿Reciben pedidos directos por WhatsApp o sólo en mostrador y plataformas?','¿El cliente puede ver un menú corto antes de escribirles?','¿Tienen alguna dinámica para clientes frecuentes?','¿Saben cuántas personas regresan después de una primera compra?'],
  features:['Menú móvil con productos destacados','Pedido preparado para enviar por WhatsApp','Acceso guardable para volver a pedir','Beneficio de regreso medible'],
  demo:['Agregar dos productos al pedido','Elegir una hora de recolección','Preparar el mensaje completo para WhatsApp'],
  price:{sale:'$3,800',rental:'$590/mes',setup:'$900'},
  close:'Si ya tienen resueltos los pedidos y la recompra, no les quito tiempo. Si hoy todo empieza con mensajes incompletos, puedo dejarles un piloto corto.',
  follow_up:'Consigue el contacto del encargado y envía el demo de pedido directo con una sola pregunta concreta.',
  avoid:'No compitas con su forma de cobrar ni presupongas que no tienen herramientas; esta parada es para validar.'
 }
};
const HOURS={
 '11739719':{monday:[['09:00','22:30']],tuesday:[['09:00','22:30']],wednesday:[['09:00','22:30']],thursday:[['09:00','22:30']],friday:[['09:00','23:00']],saturday:[['09:00','23:00']],sunday:[['09:00','22:30']]}
};
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value||fallback}catch{return fallback}}
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function all(){try{return typeof data!=='undefined'&&Array.isArray(data)?data:[]}catch{return[]}}
function reported(previous,status,label,at){return Object.assign({},previous||{},{status:status,label:label,at:previous?.at||at,source:'field_report'})}
function seed(){
 if(localDate()!==ROUTE_DATE||localStorage.getItem(MARKER_KEY)==='1')return false;
 const previous=read(SESSION_KEY,{}),done=Object.assign({},previous&&typeof previous.done==='object'?previous.done:{}),at=new Date().toISOString();
 done['11055226']=reported(done['11055226'],'recorded',NOTES['11055226'],at);
 done['11682280']=reported(done['11682280'],'recorded',NOTES['11682280'],at);
 done['9534743']=reported(done['9534743'],'skipped',NOTES['9534743'],at);
 done['10771471']=reported(done['10771471'],'skipped',NOTES['10771471'],at);
 done['4408429']=reported(done['4408429'],'skipped',NOTES['4408429'],at);
 localStorage.setItem(BASKET_KEY,JSON.stringify(IDS));
 localStorage.setItem(SESSION_KEY,JSON.stringify({day:0,source:'basket',ids:IDS.slice(),index:NEXT_INDEX,done:done,createdAt:previous.createdAt||at,routeLabel:'Ruta actualizada · 17 agosto',startTime:'09:00',fieldLog:[
  {id:'11055226',result:'card_delivered',note:'Tarjeta entregada; comentaron que contactarían.'},
  {id:'11682280',result:'card_delivered',note:'Tarjeta entregada.'},
  {id:'9534743',result:'skip_automated',note:'Parecía tener la operación ya automatizada.'},
  {id:'10771471',result:'retry_quiet_time',note:'Había demasiada gente.'},
  {id:'4408429',result:'retry_quiet_time',note:'Había demasiada gente.'}
 ]}));
 localStorage.setItem(START_KEY,'09:00');
 localStorage.setItem(MARKER_KEY,'1');
 return true;
}
function attachPlaybooks(){
 const rows=all();if(!rows.length)return false;
 let found=0;
 rows.forEach(function(b){const id=idOf(b),p=PLAYBOOKS[id];if(!p)return;found++;b.salesPlaybook=p;b.researchStatus='reviewed';b.researchConfidence=p.confidence;if(id==='11739719')b.operationalStatus='operational';b.prospectingFitScore=id==='8788752'?78:71;b.prospectingTier='go_now';b.businessScale=id==='8788752'?'solo':'local_sme';b.decisionAccess=id==='8788752'?'owner_direct':'manager';b.procurementFriction=id==='8788752'?24:43;b.prospectingReason=id==='8788752'?'Cafetería de 0 a 5 personas y presencia digital mínima; valida operación y acceso al dueño antes de invertir más tiempo.':'Cafetería local abierta y cercana; oportunidad condicionada a que pedidos directos o recompra sigan siendo manuales.';if(HOURS[id]){b.businessHours=HOURS[id];b.business_hours=HOURS[id];b.hoursSource='directorio público revisado 17 ago 2026';b.hoursVerifiedAt='2026-08-17T12:00:00-06:00';b.hoursConfidence=72;}});
 return found===2;
}
function decorate(){
 if(localDate()!==ROUTE_DATE)return;
 attachPlaybooks();
 const page=document.querySelector('#visitsView .visit-page'),shell=page&&page.querySelector('.visit-shell');
 if(page&&shell&&!page.querySelector('.v104-route-banner')){
  const banner=document.createElement('div');banner.className='v104-route-banner';banner.innerHTML='<div><span>SIGUIENTES DOS · GIRO CAFETERÍAS</span><b>Wego Coffee & Beer → Café Café Bistro</b><small>Primero valida Wego por tamaño y cercanía. Si no está operando, sigue sin esperar a Café Café; ahí entra sólo si lo ves tranquilo.</small></div><em>2 tarjetas entregadas</em>';
  const log=document.createElement('div');log.className='v104-field-log';log.innerHTML='<b>Bitácora de hoy:</b> La Abuelita y Vive Café: tarjeta entregada · Breve: parecía automatizado · Mr Rocco y Vero: volver cuando haya menos gente.';
  shell.parentElement.insertBefore(log,shell);shell.parentElement.insertBefore(banner,log);
 }
 document.querySelectorAll('#visitQueue .visit-stop').forEach(function(stop){
  const i=Number(stop.dataset.visitJump),id=IDS[i],target=stop.querySelector('span:nth-child(2)');
  stop.classList.toggle('v104-next',id==='8788752');stop.classList.toggle('v104-after',id==='11739719');
  if(target&&!target.querySelector('.v104-stop-note')&&NOTES[id]){const note=document.createElement('small');note.className='v104-stop-note';note.textContent=NOTES[id];target.appendChild(note)}
 });
}
seed();attachPlaybooks();
let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=24)clearInterval(timer)},500);
setTimeout(decorate,180);setTimeout(decorate,900);
new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
window.radarTodayRouteV104={version:'10.4',date:ROUTE_DATE,ids:IDS.slice(),next:['8788752','11739719'],start:'09:00',restore:function(){localStorage.removeItem(MARKER_KEY);seed();location.reload()}};
})();
`;
const headPos=html.lastIndexOf('</head>');
if(headPos>=0)html=html.slice(0,headPos)+'<style>'+CSS+'</style>'+html.slice(headPos);
const pos=html.lastIndexOf('</body>');
if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
return html;
};
