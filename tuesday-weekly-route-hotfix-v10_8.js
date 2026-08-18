window.patchRadarTuesdayWeeklyV108=function(html){
const CSS=`
/* Radar Local V10.10 — martes desde las 09:00 */
.v108-week-note{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;padding:10px 11px;border:1px solid #afd7c6;border-radius:10px;background:#f3fbf7;color:#315b4b;font-size:8.5px;line-height:1.5}
.v108-week-note b{color:#116a49}.v108-week-note em{flex:0 0 auto;padding:4px 7px;border-radius:999px;background:#def4e9;color:#126546;font-size:7px;font-style:normal;font-weight:900}
.v108-tier{font-size:8.5px!important}.v108-tier.go{color:#0d8554}.v108-tier.call{color:#95650d}.v108-prospects{border-top:1px solid #edf1f5;padding-top:2px}
.v108-prospects .v8-prospect{grid-template-columns:minmax(0,1fr) 72px 88px auto}.v8-day[data-v8-day="1"].v108-ready{border-color:#91c9b2;background:#f7fcf9}
.v109-route-order{margin-top:10px;padding:10px;border:1px solid #d7e5de;border-radius:11px;background:#fff}.v109-route-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:7px}
.v109-route-head b{display:block;color:#244f3f;font-size:9px}.v109-route-head small{display:block;margin-top:2px;color:#73827b;font-size:6.8px;line-height:1.45}
.v109-route-head em{flex:0 0 auto;padding:4px 7px;border-radius:999px;background:#eef7f3;color:#297056;font-size:6.4px;font-style:normal;font-weight:950}
.v109-route-list{display:grid;gap:4px}.v109-route-row{display:grid;grid-template-columns:18px minmax(0,1fr) auto;align-items:center;gap:7px;padding:6px 7px;border:1px solid #edf1ef;border-radius:8px;background:#fbfcfc}
.v109-route-row>span:first-child{display:grid;place-items:center;width:18px;height:18px;border-radius:999px;background:#edf4f1;color:#456b5c;font-size:6px;font-weight:950}
.v109-route-row b{font-size:7.2px;color:#31493f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v109-route-row small{display:block;margin-top:1px;color:#7a8881;font-size:6px}
.v109-kind{padding:3px 5px;border-radius:999px;font-size:5.8px;font-weight:950;white-space:nowrap}.v109-kind.cafe{background:#fff5df;color:#8b6420}.v109-kind.dental{background:#eaf3ff;color:#315f91}
.v109-exclusions{margin-top:7px;padding:7px 8px;border-radius:8px;background:#f7f8f9;color:#69747a;font-size:6.2px;line-height:1.45}.v109-exclusions b{color:#4d5a61}
.v109-final-badge{display:inline-flex;align-items:center;gap:4px;margin-left:5px;padding:2px 5px;border-radius:999px;background:#dff5ea;color:#0e6f49;font-size:5.8px;font-weight:950;vertical-align:middle}
@media(max-width:700px){.v108-week-note{align-items:flex-start;flex-direction:column}.v108-prospects .v8-prospect{grid-template-columns:minmax(0,1fr) auto}.v109-route-head{align-items:flex-start}}
`;
const JS=String.raw`
(function(){
if(window.__RADAR_TUESDAY_WEEKLY_V108__)return;
window.__RADAR_TUESDAY_WEEKLY_V108__=true;
const PREP_DATE='2026-08-17',ROUTE_DATE='2026-08-18',START_TIME='09:00',VERSION='10.10';
const BUILD_COMPAT='Abrir ruta completa (13) · 5 dentales listos:';
const ROUTE_IDS=['7197654','10821806','9534743','11682280','11055226','11053380','7197871','10198658','4294961','10771471','4293514','4408429','8259500'];
const DENTAL_IDS=['4294961','4293514','8259500','10198658','7197871'];
const CAFE_IDS=['7197654','4408429','10771471','11053380','11055226','11682280','9534743','10821806'];
const EXCLUDED_IDS=['8788752','11739719','9785081','11281677'];
const GO_NOW=new Set(['8259500','10198658']);
const NAMES={
 '7197654':'Cafenatlan','10821806':'Ameyalli','9534743':'Breve Café Orizaba','11682280':'Vive Café Veracruz',
 '11055226':'Café La Abuelita','11053380':'Vintage Coffee','7197871':'Clínica Odontológica Mexicana',
 '10198658':'Clínica Dental Del Ángel','4294961':'Orthodent','10771471':'Mr Rocco',
 '4293514':'Dental La Concordia','4408429':'Vero','8259500':'Clínica Dental Nureña'
};
const WINDOWS={
 '7197654':'08:00–16:00','10821806':'09:00–20:30','9534743':'09:00–21:00','11682280':'09:00–20:00',
 '11055226':'09:30–20:00','11053380':'09:00–21:00','7197871':'LLAMAR ANTES','10198658':'10:00–20:00',
 '4294961':'LLAMAR ANTES','10771471':'08:00–21:00','4293514':'LLAMAR ANTES','4408429':'08:30–15:45','8259500':'10:00–20:00'
};
const ETA={
 '7197654':'09:00','10821806':'09:15','9534743':'09:30','11682280':'09:45','11055226':'10:00','11053380':'10:15',
 '7197871':'10:30','10198658':'10:45','4294961':'11:05','10771471':'11:20','4293514':'11:35','4408429':'11:50','8259500':'12:05'
};
const BASKET_KEY='radar_route_basket_v2',SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE,START_KEY='radar_visit_start_time_v91',MARKER_KEY='radar_visit_route_seed_2026_08_18_v110';
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value==null?fallback:value}catch{return fallback}}
function esc(v){return typeof safe==='function'?safe(v):String(v??'').replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function all(){try{return typeof data!=='undefined'&&Array.isArray(data)?data:[]}catch{return[]}}
function biz(id){return all().find(function(b){return idOf(b)===String(id)})||null}
function fit(b){try{return b&&typeof prospectingProfile==='function'?Math.round(Number(prospectingProfile(b)?.score||b.prospectingFitScore||0)):Math.round(Number(b?.prospectingFitScore||b?.opportunityScore||0))}catch{return Math.round(Number(b?.prospectingFitScore||0))}}
function priority(b){try{return b&&typeof salesProfile==='function'?Math.round(Number(salesProfile(b)?.priority||0)):Math.round(Number(b?.opportunityScore||0))}catch{return Math.round(Number(b?.opportunityScore||0))}}
function exact(ids,expected){return Array.isArray(ids)&&ids.length===expected.length&&expected.every(function(id,i){return String(ids[i])===id})}
function firstOpen(done){for(let i=0;i<ROUTE_IDS.length;i++)if(!done[ROUTE_IDS[i]])return i;return Math.max(0,ROUTE_IDS.length-1)}
function repair(force){
 const today=localDate();if(!force&&today!==PREP_DATE&&today!==ROUTE_DATE)return false;
 const previous=read(SESSION_KEY,{}),done=Object.assign({},previous&&typeof previous.done==='object'?previous.done:{}),fieldLog=Array.isArray(previous?.fieldLog)?previous.fieldLog.slice():[];
 let changed=false;
 if(!exact(previous?.ids,ROUTE_IDS)||previous?.routeVersion!==VERSION||previous?.startTime!==START_TIME){
  const at=new Date().toISOString();
  localStorage.setItem(SESSION_KEY,JSON.stringify(Object.assign({},previous,{
   day:1,source:'basket',ids:ROUTE_IDS.slice(),index:firstOpen(done),done:done,createdAt:previous?.createdAt||at,
   routeLabel:'Martes · 09:00 · 5 dentales + 8 cafeterías',routeVersion:VERSION,excludedIds:EXCLUDED_IDS.slice(),startTime:START_TIME,fieldLog:fieldLog
  })));
  changed=true;
 }
 if(!exact(read(BASKET_KEY,[]),ROUTE_IDS)){localStorage.setItem(BASKET_KEY,JSON.stringify(ROUTE_IDS));changed=true}
 if(localStorage.getItem(START_KEY)!==START_TIME){localStorage.setItem(START_KEY,START_TIME);changed=true}
 localStorage.setItem(MARKER_KEY,'1');
 return changed;
}
function isTargetWeek(){const card=document.querySelector('#v8Days [data-v8-day="1"]'),date=String(card?.querySelector('.date')?.textContent||'').toLowerCase(),title=String(document.getElementById('v8WeekTitle')?.textContent||'').toLowerCase();return /(^|\D)18(\D|$)/.test(date)&&/ago/.test(date)&&/2026/.test(title)}
function dentalRows(){return DENTAL_IDS.map(function(id){const b=biz(id);return{id:id,name:NAMES[id]||b?.name||id,address:b?.address||b?.city||'Orizaba',phone:b?.phone||'',fit:fit(b),priority:priority(b),go:GO_NOW.has(id)}})}
function dentalHtml(r){return '<div class="v8-prospect" data-v108-dental="'+r.id+'"><div><b>'+esc(r.name)+'</b><span>'+esc(r.address)+(r.phone?' · '+esc(r.phone):'')+'</span></div><div class="v8-prospect-stat"><span>FIT</span><strong class="v8-pfit">'+r.fit+'/100</strong></div><div class="v8-prospect-stat"><span>ACCESO</span><strong class="v108-tier '+(r.go?'go':'call')+'">'+(r.go?'IR AHORA':'LLAMAR ANTES')+'</strong></div><div class="v8-actions" style="margin:0"><button class="btn btn-soft" type="button" data-v8-id="'+r.id+'" onclick="v8OpenLead(this.dataset.v8Id)">Ver</button></div></div>'}
function routeRow(id,i){const dental=DENTAL_IDS.includes(id),name=NAMES[id]||biz(id)?.name||id;return '<div class="v109-route-row" data-v109-stop="'+id+'"><span>'+String(i+1).padStart(2,'0')+'</span><div><b>'+esc(name)+'</b><small>'+esc(ETA[id]+' · '+WINDOWS[id])+'</small></div><span class="v109-kind '+(dental?'dental':'cafe')+'">'+(dental?'DENTAL':'CAFÉ')+'</span></div>'}
function decorateDays(){
 if(!isTargetWeek())return;
 const card=document.querySelector('#v8Days [data-v8-day="1"]'),ready=card?.querySelector('.ready');if(!card||!ready)return;
 ready.textContent='13 desde 09:00';ready.classList.remove('zero');card.classList.add('v108-ready');
}
function decorateDetail(){
 if(!isTargetWeek())return;
 const detail=document.getElementById('v8DayDetail'),eye=String(detail?.querySelector('.v8-eyebrow')?.textContent||'');if(!detail||!/^Martes\b/i.test(eye))return;
 const goal=Array.from(detail.querySelectorAll('.v8-goal')).find(function(x){return /META DE PARADAS/i.test(x.textContent||'')});
 if(goal?.querySelector('b'))goal.querySelector('b').textContent='13';
 const button=detail.querySelector('button[onclick*="v8PrepareRoute(1)"]');
 if(button){button.disabled=false;button.removeAttribute('disabled');button.textContent='Abrir ruta 09:00 (13)'}
 const actions=button?.closest('.v8-actions');
 let note=detail.querySelector('.v108-week-note');if(!note&&actions){note=document.createElement('div');note.className='v108-week-note';actions.insertAdjacentElement('afterend',note)}
 if(note)note.innerHTML='<span><b>Salida 09:00:</b> primero cafés ya abiertos; las clínicas entran a partir de las 10:30 para no llegar antes. <span class="v109-final-badge">V10.10</span></span><em>13 PARADAS</em>';
 let list=detail.querySelector('.v8-prospects'),empty=detail.querySelector('.v8-empty');
 if(!list){list=document.createElement('div');list.className='v8-prospects';(empty||note||actions)?.insertAdjacentElement('afterend',list);empty?.remove()}
 if(list){const rows=dentalRows(),sig=rows.map(r=>[r.id,r.address,r.phone,r.fit,r.go].join(':')).join('|');if(list.dataset.v110Signature!==sig){list.classList.add('v108-prospects');list.innerHTML=rows.map(dentalHtml).join('');list.dataset.v110Signature=sig}}
 let order=detail.querySelector('.v109-route-order');if(!order){order=document.createElement('div');order.className='v109-route-order';(list||note||actions)?.insertAdjacentElement('afterend',order)}
 if(order&&order.dataset.signature!==VERSION+'|'+ROUTE_IDS.join('|')){order.innerHTML='<div class="v109-route-head"><div><b>Ruta de hoy · salida 09:00</b><small>Acomodada por horario y zona. Las horas son objetivos de llegada; si una visita se alarga, continúa en orden.</small></div><em>8 CAFÉS + 5 DENTALES</em></div><div class="v109-route-list">'+ROUTE_IDS.map(routeRow).join('')+'</div><div class="v109-exclusions"><b>Fuera:</b> Wego (ya visitado), Café Café (escala grande), La Cereza (cerrado permanentemente) y Aroma Gourmet (cierre temporal).</div>';order.dataset.signature=VERSION+'|'+ROUTE_IDS.join('|')}
}
function ownRebuildButtons(){document.querySelectorAll('[data-visit-rebuild]').forEach(function(btn){btn.removeAttribute('data-visit-rebuild');btn.setAttribute('data-v110-rebuild','1')})}
function decorate(){decorateDays();decorateDetail();ownRebuildButtons()}
function dispatchTuesday(){const sel=document.getElementById('visitDaySelect');if(!sel)return;sel.value='1';try{sel.dispatchEvent(new Event('change',{bubbles:true}))}catch{}}
function openTuesday(){repair(true);if(window.radarVisitModeV88?.open)window.radarVisitModeV88.open();else if(typeof setModule==='function')setModule('visits');setTimeout(function(){dispatchTuesday();repair(true)},100);setTimeout(function(){dispatchTuesday();repair(true);decorate()},450);if(typeof toast==='function')toast('Ruta de hoy lista desde las 09:00 · 13 paradas')}
async function copyTuesday(){const text=['RADAR LOCAL · MARTES 18 · SALIDA 09:00','13 paradas · 8 cafeterías + 5 clínicas','','Ruta:',...ROUTE_IDS.map(function(id,i){return(i+1)+'. '+ETA[id]+' · '+NAMES[id]+' · '+(DENTAL_IDS.includes(id)?'DENTAL':'CAFÉ')+' · '+WINDOWS[id]}),'','Excluidos: Wego, Café Café, La Cereza y Aroma Gourmet.'].join('\n');try{await navigator.clipboard.writeText(text);if(typeof toast==='function')toast('Ruta de las 09:00 copiada')}catch{}}
const basePrepare=window.v8PrepareRoute,baseCopy=window.v8CopyDay;
window.v8PrepareRoute=function(i){if(Number(i)===1&&isTargetWeek()){openTuesday();return}return typeof basePrepare==='function'?basePrepare.apply(this,arguments):undefined};
window.v8CopyDay=function(i){if(Number(i)===1&&isTargetWeek())return copyTuesday();return typeof baseCopy==='function'?baseCopy.apply(this,arguments):undefined};
document.addEventListener('click',function(e){const t=e.target?.closest?.('[data-v110-rebuild]'),sel=document.getElementById('visitDaySelect');if(!t||!sel||sel.value!=='1'||localDate()!==ROUTE_DATE)return;e.preventDefault();e.stopImmediatePropagation();repair(true);setTimeout(function(){dispatchTuesday();repair(true);decorate()},0);if(typeof toast==='function')toast('Ruta 09:00 restaurada')},true);
repair(false);decorate();setTimeout(decorate,120);setTimeout(decorate,700);let tries=0,timer=setInterval(function(){tries++;repair(false);decorate();if(tries>=40)clearInterval(timer)},500);new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
window.radarTuesdayWeeklyV108={version:VERSION,date:ROUTE_DATE,startTime:START_TIME,routeIds:ROUTE_IDS.slice(),dentalIds:DENTAL_IDS.slice(),cafeIds:CAFE_IDS.slice(),excludedIds:EXCLUDED_IDS.slice(),repair:repair,decorate:decorate,open:openTuesday};
})();
`;
const headPos=html.lastIndexOf('</head>');if(headPos>=0)html=html.slice(0,headPos)+'<style>'+CSS+'</style>'+html.slice(headPos);
const pos=html.lastIndexOf('</body>');if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
return html;
};
