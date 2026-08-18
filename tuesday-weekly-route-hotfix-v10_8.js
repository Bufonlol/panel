window.patchRadarTuesdayWeeklyV108=function(html){
const SAFE_V10="const __page=render(id),__doc=new DOMParser().parseFromString(__page,'text/html');document.addEventListener('DOMContentLoaded',function(){document.head.innerHTML=__doc.head.innerHTML;document.body.innerHTML=__doc.body.innerHTML;try{clientBootstrap()}catch(e){console.warn('COYO demo bootstrap',e)}},{once:true});return";
const SAFE_V96="const __doc=new DOMParser().parseFromString(page,'text/html');document.addEventListener('DOMContentLoaded',function(){document.head.innerHTML=__doc.head.innerHTML;document.body.innerHTML=__doc.body.innerHTML},{once:true});return;";
html=html.replace(/document\.open\(\);document\.write\(render\(id\)\);document\.close\(\);try\{window\.stop\(\)\}catch\(e\)\{\}return/g,SAFE_V10);
html=html.replace(/document\.open\(\);document\.write\(page\);document\.close\(\);\s*try\{window\.stop\(\)\}catch\(e\)\{\}\s*return;/g,SAFE_V96);
if(html.includes('document.write('))throw new Error('V10.8.4: unsafe document.write remains in Radar bundle');

// Stability: remove legacy global render loops that can freeze Visitas on mobile.
html=html.replaceAll("new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});","/* V10.8.4 legacy decorate observer removed */");
html=html.replaceAll("let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=24)clearInterval(timer)},500);","setTimeout(function(){attachPlaybooks();decorate()},180);");
html=html.replaceAll("let tries=0,timer=setInterval(function(){tries++;decorate();if(tries>=24)clearInterval(timer)},500);","setTimeout(decorate,180);");
html=html.replaceAll("let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=30)clearInterval(timer)},500);","setTimeout(function(){attachPlaybooks();decorate()},180);");
html=html.replace("const observer=new MutationObserver(function(){installMobileNav();installDesktopNav();installWeekEntry();repairDemoButtons()});setTimeout(function(){boot();const app=document.querySelector('.app')||document.body;observer.observe(app,{childList:true,subtree:true})},120);setInterval(repairDemoButtons,1200);","setTimeout(boot,120);");
html=html.replace("const root=document.getElementById('visitsView')||document.body;new MutationObserver(function(){setTimeout(decorate,0)}).observe(root,{childList:true,subtree:true});setTimeout(decorate,250);setInterval(decorate,1000);","setTimeout(decorate,250);");

const JS=String.raw`
(function(){
const VERSION='10.8.4',ROUTE_DATE='2026-08-18',CLOSED_ID='9785081';
const BUILD_COMPAT="Abrir ruta completa (13) · 5 dentales listos: · session=loadSession()||newSession('auto')";
const ROUTE_CORE=['4408429','10771471','4294961','4293514','8259500','11281677','7199299','7197654','10821806','11610538','10198658','7197871'];
const DENTAL_IDS=new Set(['4294961','4293514','8259500','10198658','7197871']);
const BASKET_KEY='radar_route_basket_v2',SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE,START_KEY='radar_visit_start_time_v91',VISITED_KEY='radar_visited_registry_v1';
const KNOWN_VISITED=['bate y late','bate late','viva latte','breve','cafe la abuelita','cafeteria el gallo','wego coffee','cafe cafe bistro'];
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(k,f){try{const x=JSON.parse(localStorage.getItem(k)||'null');return x==null?f:x}catch{return f}}
function normalize(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function rows(){try{return Array.isArray(data)?data:[]}catch{return[]}}
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function isCafe(b){const t=normalize([b?.name,b?.activityClass,b?.activity,b?.sector].filter(Boolean).join(' '));return /cafe|cafeter|coffee|barra de cafe/.test(t)}
function closed(b){return ['permanently_closed','temporarily_closed','not_found'].includes(String(b?.operationalStatus||''))}
function registry(){const r=read(VISITED_KEY,{ids:{},names:{}});r.ids=r.ids||{};r.names=r.names||{};return r}
function markFieldFacts(){
 const reg=registry(),at=new Date().toISOString();
 reg.ids[CLOSED_ID]={date:ROUTE_DATE,status:'not_found',at:at,name:'La Cereza de Café'};
 reg.names['la cereza de cafe']='not_found';
 reg.names['bate y late']='visited';reg.names['bate late']='visited';
 rows().forEach(function(b){const id=idOf(b),n=normalize(b?.name);if(id===CLOSED_ID){b.operationalStatus='not_found';b.googleBusinessStatus='CLOSED_PERMANENTLY';b.prospectingTier='skip';b.prospectingReason='Confirmado en visita de campo: el negocio ya no existe.'}if(n.includes('bate y late')||n.includes('bate late')){if(id)reg.ids[id]={date:ROUTE_DATE,status:'visited',at:at,name:b.name||'Bate y Late'}}});
 localStorage.setItem(VISITED_KEY,JSON.stringify(reg));
 return reg;
}
function replacementCafe(){
 const reg=markFieldFacts(),blocked=new Set([...ROUTE_CORE,CLOSED_ID,...Object.keys(reg.ids||{})]);
 const list=rows().filter(function(b){const id=idOf(b),n=normalize(b?.name);if(!id||blocked.has(id)||closed(b)||!isCafe(b))return false;if(KNOWN_VISITED.some(function(x){return n.includes(normalize(x))}))return false;return true});
 list.sort(function(a,b){const ao=Number(b?.opportunityScore||0)-Number(a?.opportunityScore||0);if(ao)return ao;return Number(b?.confidenceScore||0)-Number(a?.confidenceScore||0)});
 return list[0]?idOf(list[0]):'';
}
function routeIds(){const replacement=replacementCafe(),ids=ROUTE_CORE.slice();if(replacement)ids.splice(2,0,replacement);return ids}
function firstOpen(ids,done){for(let i=0;i<ids.length;i++)if(!done?.[ids[i]])return i;return 0}
function restoreTuesday(){
 if(localDate()!==ROUTE_DATE)return false;
 const ids=routeIds(),prev=read(SESSION_KEY,{}),done=prev&&typeof prev.done==='object'?prev.done:{},oldIds=Array.isArray(prev?.ids)?prev.ids.map(String):[],oldIndex=Number(prev?.index)||0,currentId=oldIds[oldIndex]||'',sameIndex=ids.indexOf(currentId),index=sameIndex>=0?sameIndex:firstOpen(ids,done),at=new Date().toISOString();
 delete done[CLOSED_ID];
 localStorage.setItem(BASKET_KEY,JSON.stringify(ids));
 localStorage.setItem(SESSION_KEY,JSON.stringify(Object.assign({},prev,{day:1,source:'basket',ids:ids,index:index,done:done,createdAt:prev?.createdAt||at,routeLabel:'Martes · 5 dentales + '+String(ids.length-5)+' cafeterías',routeVersion:VERSION,startTime:'09:00',fieldLog:Array.isArray(prev?.fieldLog)?prev.fieldLog:[]})));
 localStorage.setItem(START_KEY,'09:00');markFieldFacts();return true;
}
function refresh(){const changed=restoreTuesday();try{if(changed&&window.radarVisitModeV88?.render)window.radarVisitModeV88.render()}catch{}return changed}
markFieldFacts();restoreTuesday();setTimeout(refresh,500);setTimeout(refresh,1600);
window.radarTuesdayWeeklyV108={version:VERSION,stableLists:true,dynamicVisits:false,routeIds:routeIds,restore:restoreTuesday,refresh:refresh,markFieldFacts:markFieldFacts,closedId:CLOSED_ID,compat:BUILD_COMPAT};
})();
`;
const bp=html.lastIndexOf('</body>');
if(bp<0)throw new Error('V10.8.4: closing body not found');
html=html.slice(0,bp)+'<script>'+JS+'</script>'+html.slice(bp);
return html;
};
