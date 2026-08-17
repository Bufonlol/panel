window.patchRadarVisitTuesdayDentalV107=function(html){
const CSS=String.raw`
/* Radar Local V10.7 — martes dental + cafeterías ya preparadas */
.v107-route-banner{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:0 0 8px;padding:12px;border:1px solid #b8cde4;border-radius:12px;background:linear-gradient(135deg,#eef6ff,#f5fbf7);color:#263f5b}.v107-route-banner div{min-width:0}.v107-route-banner span{display:block;font-size:7px;font-weight:950;letter-spacing:.09em;color:#1769a8}.v107-route-banner b{display:block;margin-top:3px;font-size:12px}.v107-route-banner small{display:block;margin-top:5px;font-size:7.5px;line-height:1.5;color:#607287}.v107-route-banner em{flex:0 0 auto;border-radius:999px;background:#235b87;color:#fff;padding:7px 9px;font-size:7px;font-style:normal;font-weight:950;white-space:nowrap}.v107-route-order{margin:0 0 8px;padding:10px 11px;border:1px solid #dce5ee;border-radius:11px;background:#fff;color:#52667a;font-size:7.4px;line-height:1.65}.v107-route-order b{color:#274b6b}.v107-route-script{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:0 0 10px}.v107-route-script div{padding:9px 10px;border:1px solid #dce5ee;border-radius:10px;background:#f8fbff;color:#53677c;font-size:7.3px;line-height:1.5}.v107-route-script div:last-child{background:#fffaf0;border-color:#eadcbf;color:#6a5a37}.v107-route-script b{color:#263f5b}.visit-stop.v107-dental{border-color:#9fbfdf;background:#f2f7fd}.visit-stop.v107-dental .v104-stop-note{color:#245f91!important}.visit-stop.v107-call{border-style:dashed;background:#fffaf1;border-color:#d8b979}.visit-stop.v107-open{border-color:#a8d6c2;background:#f3fbf7}.v107-dental-demo{border-color:#a9c6df!important;background:#f4f8fd!important}.v107-dental-demo p{font-size:8px;line-height:1.5;color:#5b6d80}.v107-dental-demo .v89-demo-brand span{color:#2f6b9c!important}
@media(max-width:700px){.v107-route-banner{padding:10px}.v107-route-banner b{font-size:10.5px}.v107-route-banner small{font-size:7px}.v107-route-script{grid-template-columns:1fr}.v107-route-order{font-size:7px;padding:8px 9px}}
`;
const JS=String.raw`
(function(){
window.__RADAR_TUESDAY_DENTAL_V107__=true;
const PREP_DATE='2026-08-17';
const ROUTE_DATE='2026-08-18';
const IDS=['4408429','10771471','9785081','4294961','4293514','8259500','11281677','7199299','7197654','10821806','11610538','10198658','7197871'];
const TIMES=['09:00','09:25','09:50','10:15','10:40','11:05','11:30','11:50','12:15','12:40','13:05','13:30','13:55'];
const DENTAL_IDS=['4294961','4293514','8259500','10198658','7197871'];
const DENTAL_SET=new Set(DENTAL_IDS);
const BASKET_KEY='radar_route_basket_v2';
const SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE;
const START_KEY='radar_visit_start_time_v91';
const MARKER_KEY='radar_visit_route_seed_2026_08_18_v107';
const NAMES={
 '4408429':'Vero','10771471':'Mr Rocco','9785081':'La Cereza','4294961':'Orthodent','4293514':'Dental La Concordia','8259500':'Clínica Dental Nureña','11281677':'Aroma Gourmet','7199299':'María Bonita','7197654':'Cafenatlan','10821806':'Ameyalli','11610538':'Café Don Gerardo','10198658':'Clínica Dental Del Ángel','7197871':'Clínica Odontológica Mexicana'
};
const NOTES={
 '4408429':'CAFÉ · reintento antes del pico',
 '10771471':'CAFÉ · reintento · preguntar por encargado',
 '9785081':'CAFÉ · validar abierto; máximo 2 min',
 '4294961':'DENTAL · llamar/validar horario · citas recurrentes',
 '4293514':'DENTAL · llamar antes · preguntar por quien lleva agenda',
 '8259500':'DENTAL · abre 10:00 · confirmaciones y ausencias',
 '11281677':'CAFÉ · pedidos de ocasión y fechas',
 '7199299':'CAFÉ · pedidos especiales + recompra',
 '7197654':'CAFÉ · origen, catálogo y pedidos',
 '10821806':'CAFÉ · entra con el guion de 10 segundos',
 '11610538':'CAFÉ · validar abierto; máximo 2 min',
 '10198658':'DENTAL · 10:00–20:00 · agenda y reprogramación',
 '7197871':'DENTAL · 10:00–20:00 · complementar, no reemplazar'
};
const CONFIG={
 '4294961':{name:'Orthodent',confidence:98,fit:78,tier:'call_first',access:'owner_direct',friction:29,angle:'Citas recurrentes de ortodoncia: confirmación, reprogramación y seguimiento por etapa.',evidence:['Registro de 0 a 5 personas y coincidencia exacta en Norte 26 #465.','Actividad social reciente en agosto de 2026; hay horarios públicos contradictorios, por eso se llama antes.'],extra:'¿Cómo controlan los seguimientos mensuales de ortodoncia cuando un paciente reprograma?',avoid:'No presupongas que no usan agenda. Hay fuentes de horario contradictorias: llama primero.'},
 '4293514':{name:'Dental La Concordia',confidence:82,fit:83,tier:'call_first',access:'owner_direct',friction:24,angle:'Una sola vista para agenda, confirmaciones y seguimiento entre especialidades.',evidence:['Clínica local de 0 a 5 personas en Norte 24 #85, con teléfonos y actividad social vigentes.','El horario del martes no está suficientemente confirmado; la parada requiere llamada breve.'],extra:'¿Una sola persona coordina las citas de todas las especialidades?',avoid:'No llegues afirmando que está abierto; confirma por teléfono y valida su proceso actual.'},
 '8259500':{name:'Clínica Dental Nureña',confidence:95,fit:86,tier:'go_now',access:'owner_direct',friction:22,angle:'Confirmaciones, cancelaciones y lista diaria de pendientes sin revisar chats uno por uno.',evidence:['Consultorio de 0 a 5 personas, dirección y teléfono coincidentes.','Directorio actualizado muestra atención los martes de 10:00 a 20:00.'],extra:'¿Al final del día pueden ver rápido quién confirmó, canceló o quedó sin responder?',avoid:'No vendas una página. Primero valida si agenda y WhatsApp ya están conectados.'},
 '10198658':{name:'Clínica Dental Del Ángel',confidence:98,fit:84,tier:'go_now',access:'owner_direct',friction:25,angle:'Convertir confirmaciones y cancelaciones en tareas claras para recepción y recuperar espacios.',evidence:['Clínica local de 0 a 5 personas, dirección, teléfono y Facebook coincidentes.','Fuente reciente muestra horario del martes de 10:00 a 20:00.'],extra:'Cuando alguien cancela, ¿cómo saben a quién reprogramar y cómo intentan llenar el espacio?',avoid:'No compitas con su presencia en directorios; enfócate en operación interna y seguimiento.'},
 '7197871':{name:'Clínica Odontológica Mexicana',confidence:96,fit:74,tier:'call_first',access:'manager',friction:38,angle:'Complementar la captación existente con confirmación, asistencia y recuperación de citas.',evidence:['Clínica de 0 a 5 personas coincidente en Poniente 16 #140B y activa en Doctoralia.','Fuente reciente muestra horario del martes de 10:00 a 20:00.'],extra:'Las citas que llegan de Doctoralia u otros canales, ¿terminan todas en una sola agenda operativa?',avoid:'Ya tiene presencia en Doctoralia. No vendas agenda online genérica ni reemplazo; valida el hueco operativo.'}
};
const HOURS={
 '4294961':{mon:[{open:'10:00',close:'19:00'}],tue:[{open:'10:00',close:'19:00'}],wed:[{open:'10:00',close:'19:00'}],thu:[{open:'10:00',close:'19:00'}],fri:[{open:'10:00',close:'19:00'}],sat:[],sun:[]},
 '8259500':{mon:[{open:'10:00',close:'20:00'}],tue:[{open:'10:00',close:'20:00'}],wed:[{open:'10:00',close:'20:00'}],thu:[{open:'10:00',close:'20:00'}],fri:[{open:'10:00',close:'20:00'}],sat:[{open:'10:00',close:'14:00'}],sun:[]},
 '10198658':{mon:[{open:'10:00',close:'20:00'}],tue:[{open:'10:00',close:'20:00'}],wed:[{open:'10:00',close:'20:00'}],thu:[{open:'10:00',close:'20:00'}],fri:[{open:'10:00',close:'20:00'}],sat:[{open:'10:00',close:'17:00'}],sun:[]},
 '7197871':{mon:[{open:'10:00',close:'20:00'}],tue:[{open:'10:00',close:'20:00'}],wed:[{open:'10:00',close:'20:00'}],thu:[{open:'10:00',close:'20:00'}],fri:[{open:'10:00',close:'20:00'}],sat:[{open:'10:00',close:'19:00'}],sun:[]}
};
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value||fallback}catch{return fallback}}
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function all(){try{return typeof data!=='undefined'&&Array.isArray(data)?data:[]}catch{return[]}}
function esc(v){return typeof safe==='function'?safe(v):String(v??'').replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
function firstOpen(done){for(let i=0;i<IDS.length;i++)if(!done[IDS[i]])return i;return Math.max(0,IDS.length-1)}
function seed(){
 const today=localDate();if(today!==PREP_DATE&&today!==ROUTE_DATE)return false;
 if(localStorage.getItem(MARKER_KEY)==='1'&&localStorage.getItem(SESSION_KEY))return false;
 const previous=read(SESSION_KEY,{}),done=Object.assign({},previous&&typeof previous.done==='object'?previous.done:{}),at=new Date().toISOString(),oldLog=Array.isArray(previous.fieldLog)?previous.fieldLog.slice():[];
 localStorage.setItem(BASKET_KEY,JSON.stringify(IDS));
 localStorage.setItem(SESSION_KEY,JSON.stringify(Object.assign({},previous,{day:1,source:'basket',ids:IDS.slice(),index:firstOpen(done),done:done,createdAt:previous.createdAt||at,routeLabel:'Martes · 5 dentales + 8 cafeterías',startTime:'09:00',fieldLog:oldLog})));
 localStorage.setItem(START_KEY,'09:00');localStorage.setItem(MARKER_KEY,'1');return true;
}
function playbook(c){return{
 confidence:c.confidence,proposal_title:'Agenda + seguimiento · '+c.name,proposal_summary:'Un flujo pequeño para que el paciente confirme, cancele o solicite otra hora y para que recepción vea pendientes, espacios liberados y seguimientos sin revisar conversaciones una por una.',evidence:c.evidence,angle:c.angle,
 opening:'Hola, trabajo con sistemas para clínicas que centralizan agenda, confirmaciones y seguimiento de pacientes. ¿Está la persona que lleva la operación? Preparé un ejemplo y tarda 30 segundos.',
 questions:['¿Cómo confirman actualmente las citas?','¿Qué pasa cuando un paciente cancela o no responde?','¿Recepción usa una sola agenda o varias herramientas?',c.extra],
 features:['Agenda por doctor y consultorio','Confirmar, cancelar o solicitar reprogramación','Lista de citas pendientes y espacios liberados','Seguimiento de pacientes y resumen diario'],
 demo:['Confirmar una cita como paciente','Solicitar reprogramación y ver la tarea','Cancelar y liberar el espacio','Cambiar a la vista de recepción con métricas de muestra'],
 price:{sale:'$6,500',rental:'$890/mes',setup:'$1,200'},
 close:'Si hoy confirmar y reprogramar depende de revisar mensajes, podemos probar sólo ese flujo durante dos semanas sin reemplazar todo lo que ya usan.',
 follow_up:'Envía el demo dental personalizado y pregunta cuántas citas quedan sin confirmar en una semana normal.',
 avoid:c.avoid+' No prometas automatización de WhatsApp hasta validar consentimiento, número, proveedor y costo de mensajería.'
}}
function attachPlaybooks(){
 const rows=all();if(!rows.length)return false;let found=0;
 rows.forEach(function(b){const id=idOf(b),c=CONFIG[id];if(!c)return;found++;b.salesPlaybook=playbook(c);b.researchStatus='reviewed';b.researchConfidence=c.confidence;b.operationalStatus='operational';b.prospectingFitScore=c.fit;b.prospectingTier=c.tier;b.businessScale='local_sme';b.decisionAccess=c.access;b.procurementFriction=c.friction;b.prospectingReason=c.angle+' Operación de 0 a 5 personas, por lo que el decisor suele estar cerca.';if(HOURS[id]){b.businessHours=HOURS[id];b.business_hours=HOURS[id];b.hoursSource=id==='4294961'?'Perfil social reciente; confirmar por conflicto con otro directorio':'Directorio comercial revisado el 17 ago 2026';b.hoursVerifiedAt='2026-08-17T18:00:00-06:00';b.hoursConfidence=id==='4294961'?68:id==='8259500'?88:90;}});
 return found===DENTAL_IDS.length;
}
function addPrep(page,shell,today){
 if(!page||!shell||page.querySelector('.v107-route-banner'))return;
 const banner=document.createElement('div');banner.className='v107-route-banner';banner.innerHTML='<div><span>'+(today===ROUTE_DATE?'RUTA DE HOY':'MAÑANA')+' · MARTES 18 · GIRO PRINCIPAL DENTALES</span><b>5 dentales + 8 cafeterías ya ordenadas</b><small>Las cafeterías de 09:00 sirven de calentamiento mientras abren los consultorios. Dental comienza a las 10:15; Orthodent y La Concordia requieren llamada breve antes de llegar.</small></div><em>13 PARADAS</em>';
 const order=document.createElement('div');order.className='v107-route-order';order.innerHTML='<b>Orden:</b> 09:00 Vero → 09:25 Mr Rocco → 09:50 La Cereza → <b>10:15 Orthodent → 10:40 Dental La Concordia → 11:05 Dental Nureña</b> → 11:30 Aroma → 11:50 María Bonita → 12:15 Cafenatlan → 12:40 Ameyalli → 13:05 Don Gerardo → <b>13:30 Dental Del Ángel → 13:55 Clínica Odontológica Mexicana</b>';
 const scripts=document.createElement('div');scripts.className='v107-route-script';scripts.innerHTML='<div><b>Entrada dental:</b><br>“Trabajo con sistemas para clínicas que centralizan agenda, confirmaciones y seguimiento. ¿Está quien lleva la operación? Tarda 30 segundos.”</div><div><b>Entrada cafetería:</b><br>“Estoy mostrando una idea para cafeterías locales. ¿Está la persona encargada? Tarda 30 segundos.”</div>';
 shell.parentElement.insertBefore(scripts,shell);shell.parentElement.insertBefore(order,scripts);shell.parentElement.insertBefore(banner,order);
}
function decorateDemo(){
 const root=document.getElementById('visitContent'),map=root&&root.querySelector('[data-visit-map]'),id=map&&map.dataset.visitMap;if(!root||!DENTAL_SET.has(String(id)))return;
 const card=root.querySelector('.v89-demo-card');if(!card||card.dataset.v107DentalDemo==='1')return;card.dataset.v107DentalDemo='1';card.classList.add('v107-dental-demo');card.innerHTML='<div class="v89-demo-brand"><b>COYO</b><span>Demo dental · agenda y seguimiento</span></div><p>Prueba la confirmación, reprogramación y cancelación desde la vista del paciente; después cambia a la vista de recepción.</p><button type="button" class="btn btn-primary v89-demo-open" data-v89-open-demo="'+esc(id)+'">Abrir demo dental completa</button>';
}
function decorate(){
 const today=localDate();if(today!==PREP_DATE&&today!==ROUTE_DATE)return;attachPlaybooks();
 const page=document.querySelector('#visitsView .visit-page'),shell=page&&page.querySelector('.visit-shell');addPrep(page,shell,today);decorateDemo();
 if(today!==ROUTE_DATE)return;
 document.querySelectorAll('#visitQueue .visit-stop').forEach(function(stop){const i=Number(stop.dataset.visitJump),id=IDS[i],target=stop.querySelector('span:nth-child(2)');if(!id||!target)return;stop.classList.remove('v106-priority','v106-retry','v106-validate');stop.classList.toggle('v107-dental',DENTAL_SET.has(id));stop.classList.toggle('v107-call',id==='4294961'||id==='4293514');stop.classList.toggle('v107-open',id==='8259500'||id==='10198658'||id==='7197871');let note=target.querySelector('.v104-stop-note');if(!note){note=document.createElement('small');note.className='v104-stop-note';target.appendChild(note)}if(note.textContent!==NOTES[id])note.textContent=NOTES[id];let chip=target.querySelector('.v106-time');if(!chip){chip=document.createElement('small');chip.className='v106-time';target.insertBefore(chip,note)}chip.textContent=TIMES[i];});
}
seed();attachPlaybooks();decorate();
let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=30)clearInterval(timer)},500);
setTimeout(decorate,180);setTimeout(decorate,900);new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
window.radarTuesdayDentalV107={version:'10.7',date:ROUTE_DATE,ids:IDS.slice(),times:TIMES.slice(),dentals:DENTAL_IDS.slice(),names:Object.assign({},NAMES),start:'09:00',restore:function(){localStorage.removeItem(MARKER_KEY);seed();location.reload()}};
})();
`;
const headPos=html.lastIndexOf('</head>');if(headPos>=0)html=html.slice(0,headPos)+'<style>'+CSS+'</style>'+html.slice(headPos);
const pos=html.lastIndexOf('</body>');if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
return html;
};
