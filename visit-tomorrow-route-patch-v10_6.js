window.patchRadarVisitTomorrowRouteV106=function(html){
const CSS=String.raw`
/* Radar Local V10.6 — ruta de cafeterías para el martes 18 de agosto */
.v106-tomorrow-banner{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:0 0 8px;padding:12px;border:1px solid #b9d6ca;border-radius:12px;background:linear-gradient(135deg,#f1faf6,#fbf7ed);color:#254f40}.v106-tomorrow-banner div{min-width:0}.v106-tomorrow-banner span{display:block;font-size:7px;font-weight:950;letter-spacing:.09em;color:#08764a}.v106-tomorrow-banner b{display:block;margin-top:3px;font-size:12px}.v106-tomorrow-banner small{display:block;margin-top:5px;font-size:7.5px;line-height:1.5;color:#5f756c}.v106-tomorrow-banner em{flex:0 0 auto;border-radius:999px;background:#1f5c43;color:#fff;padding:7px 9px;font-size:7px;font-style:normal;font-weight:950;white-space:nowrap}.v106-route-order{margin:0 0 8px;padding:10px 11px;border:1px solid #dde5e0;border-radius:11px;background:#fff;color:#52655c;font-size:7.6px;line-height:1.65}.v106-route-order b{color:#274d3e}.v106-script{margin:0 0 10px;padding:10px 11px;border-left:3px solid #d1a944;border-radius:3px 10px 10px 3px;background:#fff9e9;color:#665727;font-size:7.7px;line-height:1.55}.v106-script b{color:#3f371c}.visit-stop.v106-priority{border-color:#9bcbb6;background:#f3fbf7}.visit-stop.v106-retry{border-color:#ead7ae;background:#fffaf0}.visit-stop.v106-validate{border-color:#d5dce5;background:#f8fafc}.visit-stop.v106-validate .v104-stop-note{color:#657388!important}.visit-stop .v106-time{display:inline-flex!important;align-items:center!important;margin:0 5px 0 0!important;border-radius:999px!important;background:#e8f2ed!important;color:#246046!important;padding:2px 5px!important;font-size:6px!important;font-weight:950!important;letter-spacing:.03em!important}.visit-stop .v104-stop-note{white-space:normal!important}.v106-guardrail{display:block;margin-top:3px;color:#7c6653;font-size:6.6px;font-weight:800;line-height:1.25}
@media(max-width:700px){.v106-tomorrow-banner{padding:10px}.v106-tomorrow-banner b{font-size:10.5px}.v106-tomorrow-banner small{font-size:7px}.v106-tomorrow-banner em{font-size:6.4px}.v106-route-order,.v106-script{font-size:7.2px;padding:8px 9px}}
`;
const JS=String.raw`
(function(){
const PREP_DATE='2026-08-17';
const ROUTE_DATE='2026-08-18';
const IDS=['4408429','10771471','9785081','11281677','7199299','7197654','10821806','11610538'];
const TIMES=['09:00','09:25','09:50','10:15','10:35','11:00','11:25','11:50'];
const BASKET_KEY='radar_route_basket_v2';
const SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE;
const START_KEY='radar_visit_start_time_v91';
const MARKER_KEY='radar_visit_route_seed_2026_08_18_v106';
const NAMES={
 '4408429':'Vero','10771471':'Mr Rocco','9785081':'La Cereza','11281677':'Aroma Gourmet',
 '7199299':'María Bonita','7197654':'Cafenatlan','10821806':'Ameyalli','11610538':'Café Don Gerardo'
};
const NOTES={
 '4408429':'REINTENTO · antes del pico · pedido directo',
 '10771471':'REINTENTO · preguntar por encargado · club de regreso',
 '9785081':'VALIDAR ABIERTO · máximo 2 min; si no, sigue',
 '11281677':'PRIORIDAD · pedidos de ocasión y fechas',
 '7199299':'PRIORIDAD · pedidos especiales + recompra',
 '7197654':'PRIORIDAD · origen, catálogo y pedidos',
 '10821806':'REINTENTO · entra con el guion de 10 segundos',
 '11610538':'VALIDAR ABIERTO · negocio pequeño; máximo 2 min'
};
const PLAYBOOKS={
 '9785081':{
  confidence:64,
  proposal_title:'Club de regreso · La Cereza',
  proposal_summary:'Una tarjeta digital sencilla por QR para registrar visitas y convertir clientes frecuentes en regresos medibles, sin cambiar la forma de cobrar.',
  evidence:['La cafetería conserva una presencia pública local activa en 2026.','El horario y el acceso al responsable no están suficientemente confirmados; valida la operación antes de presentar.'],
  angle:'Es una parada de validación rápida. Si está abierto y el dueño está cerca, enseña el club de visitas; si no, continúa en dos minutos.',
  opening:'Hola, estoy mostrando a cafeterías pequeñas una tarjeta digital de visitas por QR para que sus clientes regresen. ¿Está la persona encargada? Se la enseño en 30 segundos.',
  questions:['¿Ya reconocen de alguna forma a quienes vienen seguido?','¿Usan tarjeta de sellos o alguna recompensa?','¿Qué beneficio sería fácil de entregar sin complicar caja?'],
  features:['Tarjeta digital de visitas','Recompensa definida por la cafetería','QR en mostrador','Conteo básico de visitas y beneficios'],
  demo:['Registrar una visita','Mostrar el progreso a una recompensa','Abrir métricas de ejemplo para el negocio'],
  price:{sale:'$3,000',rental:'$490/mes',setup:'$700'},
  close:'Si hoy todo depende de reconocer al cliente de memoria, podemos probarlo un mes sin cambiar su cobro.',
  follow_up:'Pide el WhatsApp del dueño y envía sólo el demo personalizado.',
  avoid:'No afirmes que el horario está confirmado ni que carecen de sistema; primero valida.'
 },
 '7199299':{
  confidence:79,
  proposal_title:'Pedidos de ocasión + regreso · María Bonita',
  proposal_summary:'Un flujo corto para elegir postre, ocasión y fecha antes de abrir WhatsApp, seguido de una invitación para volver en la próxima fecha especial.',
  evidence:['Hay actividad pública reciente en 2026 y referencias vigentes a su ubicación en Oriente 4.','La operación parece local y de escala accesible, pero el proceso actual de pedidos debe validarse con el responsable.'],
  angle:'Entra por pedidos especiales completos, no por redes sociales. Demuestra cómo llega producto, fecha y ocasión en un solo mensaje.',
  opening:'Hola, estoy mostrando a cafeterías locales una forma de recibir pedidos especiales con producto y fecha completos desde el primer mensaje. ¿Está quien los coordina? Tarda 30 segundos.',
  questions:['¿Les piden pasteles o postres para fechas específicas?','¿Qué datos suelen faltar en el primer mensaje?','¿Quién confirma disponibilidad y anticipo?','¿Invitan al cliente a volver para su siguiente ocasión?'],
  features:['Catálogo corto de productos especiales','Fecha y ocasión antes de WhatsApp','Mensaje de pedido completo','Recordatorio voluntario de próxima fecha'],
  demo:['Elegir un producto de muestra','Seleccionar una fecha','Preparar el mensaje completo','Mostrar la vista de pedidos iniciados'],
  price:{sale:'$3,800',rental:'$590/mes',setup:'$900'},
  close:'Si reciben pedidos con datos incompletos, el piloto puede ordenar sólo ese flujo sin tocar su caja ni sus redes.',
  follow_up:'Envía el demo al responsable de pedidos con una pregunta sobre los datos que más se les pierden.',
  avoid:'No presupongas que los pedidos son manuales; valida el proceso actual.'
 },
 '11610538':{
  confidence:61,
  proposal_title:'Tarjeta digital de visitas · Café Don Gerardo',
  proposal_summary:'Un club de regreso mínimo por QR para reconocer clientes frecuentes y medir visitas sin instalar una aplicación ni sumar trabajo pesado.',
  evidence:['El negocio aparece en directorios públicos recientes como cafetería local en Sur 10.','No hay horario público suficientemente confiable; confirma apertura y presencia del dueño antes de invertir tiempo.'],
  angle:'Validación corta y directa al dueño. Enseña sólo la experiencia del cliente y pregunta si una recompensa simple les funcionaría.',
  opening:'Hola, estoy ayudando a cafeterías pequeñas a reconocer a sus clientes frecuentes con una tarjeta digital por QR. ¿Está el dueño? Se lo muestro en 30 segundos.',
  questions:['¿Tienen clientes que regresan cada semana?','¿Los reconocen de memoria o llevan alguna tarjeta?','¿Qué recompensa sencilla sí podrían sostener?'],
  features:['Registro de visita por QR','Progreso visible para el cliente','Recompensa configurable','Resumen básico para el dueño'],
  demo:['Registrar una visita','Desbloquear un beneficio','Cambiar a la vista del negocio'],
  price:{sale:'$3,000',rental:'$490/mes',setup:'$700'},
  close:'Si hay clientes frecuentes y no quieren una app complicada, podemos probar una tarjeta mínima durante un mes.',
  follow_up:'Pide contacto directo del dueño y manda el demo con una sola línea.',
  avoid:'No esperes si está cerrado y no prometas resultados; es una parada de validación.'
 }
};
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value||fallback}catch{return fallback}}
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function all(){try{return typeof data!=='undefined'&&Array.isArray(data)?data:[]}catch{return[]}}
function firstOpen(done){for(let i=0;i<IDS.length;i++)if(!done[IDS[i]])return i;return Math.max(0,IDS.length-1)}
function seed(){
 const today=localDate();if(today!==PREP_DATE&&today!==ROUTE_DATE)return false;
 if(localStorage.getItem(MARKER_KEY)==='1'&&localStorage.getItem(SESSION_KEY))return false;
 const previous=read(SESSION_KEY,{}),done=Object.assign({},previous&&typeof previous.done==='object'?previous.done:{}),at=new Date().toISOString();
 const oldLog=Array.isArray(previous.fieldLog)?previous.fieldLog.slice():[];
 localStorage.setItem(BASKET_KEY,JSON.stringify(IDS));
 localStorage.setItem(SESSION_KEY,JSON.stringify(Object.assign({},previous,{day:1,source:'basket',ids:IDS.slice(),index:firstOpen(done),done:done,createdAt:previous.createdAt||at,routeLabel:'8 cafeterías locales · martes 18 agosto',startTime:'09:00',fieldLog:oldLog})));
 localStorage.setItem(START_KEY,'09:00');
 localStorage.setItem(MARKER_KEY,'1');
 return true;
}
function attachPlaybooks(){
 const rows=all();if(!rows.length)return false;let found=0;
 rows.forEach(function(b){const id=idOf(b),p=PLAYBOOKS[id];if(!p)return;found++;b.salesPlaybook=p;b.researchStatus='reviewed';b.researchConfidence=p.confidence;b.operationalStatus='operational';b.prospectingFitScore=id==='7199299'?82:id==='9785081'?76:74;b.prospectingTier='go_now';b.businessScale=id==='7199299'?'local_sme':'solo';b.decisionAccess='owner_direct';b.procurementFriction=id==='7199299'?31:22;b.prospectingReason=id==='7199299'?'Cafetería local activa con oportunidad concreta en pedidos de ocasión y recompra; valida el flujo actual.':'Cafetería pequeña con acceso probable al dueño; visita de validación corta antes de invertir seguimiento.';});
 return found===3;
}
function addPrep(page,shell,today){
 if(!page||!shell||page.querySelector('.v106-tomorrow-banner'))return;
 const banner=document.createElement('div');banner.className='v106-tomorrow-banner';
 banner.innerHTML=today===ROUTE_DATE?'<div><span>RUTA DE HOY · MARTES 18 · 09:00</span><b>8 cafeterías locales, en orden</b><small>Sin hoteles, cadenas ni compañías grandes. La Cereza y Don Gerardo son validación rápida: si no están abiertos, sigue sin esperar.</small></div><em>8 paradas</em>':'<div><span>MAÑANA · MARTES 18 · 09:00</span><b>Ruta de 8 cafeterías ya guardada</b><small>Vero y Mr Rocco van temprano para evitar el pico. Ameyalli queda después de seis entradas para que llegues con el discurso calentado.</small></div><em>LISTA</em>';
 const order=document.createElement('div');order.className='v106-route-order';order.innerHTML='<b>Orden:</b> 09:00 Vero → 09:25 Mr Rocco → 09:50 La Cereza → 10:15 Aroma → 10:35 María Bonita → 11:00 Cafenatlan → 11:25 Ameyalli → 11:50 Don Gerardo';
 const script=document.createElement('div');script.className='v106-script';script.innerHTML='<b>Entrada de 10 segundos:</b> “Hola, ¿está la persona encargada? Estoy mostrando una idea para cafeterías locales; tarda 30 segundos.”';
 shell.parentElement.insertBefore(script,shell);shell.parentElement.insertBefore(order,script);shell.parentElement.insertBefore(banner,order);
}
function decorate(){
 const today=localDate();if(today!==PREP_DATE&&today!==ROUTE_DATE)return;
 attachPlaybooks();
 const page=document.querySelector('#visitsView .visit-page'),shell=page&&page.querySelector('.visit-shell');addPrep(page,shell,today);
 if(today!==ROUTE_DATE)return;
 document.querySelectorAll('#visitQueue .visit-stop').forEach(function(stop){
  const i=Number(stop.dataset.visitJump),id=IDS[i],target=stop.querySelector('span:nth-child(2)');if(!id||!target)return;
  stop.classList.toggle('v106-priority',id==='11281677'||id==='7199299'||id==='7197654');
  stop.classList.toggle('v106-retry',id==='4408429'||id==='10771471'||id==='10821806');
  stop.classList.toggle('v106-validate',id==='9785081'||id==='11610538');
  let note=target.querySelector('.v104-stop-note');if(!note){note=document.createElement('small');note.className='v104-stop-note';target.appendChild(note)}
  if(note.textContent!==NOTES[id])note.textContent=NOTES[id];
  let chip=target.querySelector('.v106-time');if(!chip){chip=document.createElement('small');chip.className='v106-time';target.insertBefore(chip,note)}chip.textContent=TIMES[i];
 });
}
seed();attachPlaybooks();
let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=24)clearInterval(timer)},500);
setTimeout(decorate,180);setTimeout(decorate,900);
new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
window.radarTomorrowRouteV106={version:'10.6',date:ROUTE_DATE,ids:IDS.slice(),times:TIMES.slice(),names:Object.assign({},NAMES),start:'09:00',restore:function(){localStorage.removeItem(MARKER_KEY);seed();location.reload()}};
})();
`;
const headPos=html.lastIndexOf('</head>');
if(headPos>=0)html=html.slice(0,headPos)+'<style>'+CSS+'</style>'+html.slice(headPos);
const pos=html.lastIndexOf('</body>');
if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
return html;
};
