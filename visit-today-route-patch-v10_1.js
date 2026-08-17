window.patchRadarVisitTodayRouteV101=function(html){
const CSS=String.raw`
/* Radar Local V10.1 — fixed field route for 17 Aug 2026 */
.v101-route-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 10px;padding:10px 12px;border:1px solid #cfe0f5;border-radius:12px;background:#f6faff;color:#36536f}.v101-route-banner div{min-width:0}.v101-route-banner span{display:block;font-size:7px;font-weight:900;letter-spacing:.08em;color:#1769e0}.v101-route-banner b{display:block;margin-top:2px;font-size:10px}.v101-route-banner em{flex:0 0 auto;border-radius:999px;background:#e9f8f1;color:#0d8554;padding:6px 8px;font-size:7px;font-style:normal;font-weight:900}
@media(max-width:700px){.v101-route-banner{padding:9px 10px}.v101-route-banner b{font-size:9px}.v101-route-banner em{font-size:6.5px}}
`;
const JS=String.raw`
(function(){
const ROUTE_DATE='2026-08-17';
const IDS=['11053380','11055226','9845804','10821806','7197654','11281677','9534743','10771471','4408429','9318952'];
const BASKET_KEY='radar_route_basket_v2';
const SESSION_KEY='radar_visit_session_v2_'+ROUTE_DATE;
const START_KEY='radar_visit_start_time_v91';
const MARKER_KEY='radar_visit_route_seed_2026_08_17_v101';
function localDate(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch{return fallback}}
function sameIds(a,b){return Array.isArray(a)&&a.length===b.length&&a.every(function(x,i){return String(x)===String(b[i])})}
function seed(){
 if(localDate()!==ROUTE_DATE)return false;
 const previous=read(SESSION_KEY,{}),done=previous&&typeof previous.done==='object'?previous.done:{};
 const currentId=Array.isArray(previous.ids)?String(previous.ids[Number(previous.index)||0]||''):'';
 let index=IDS.indexOf(currentId);if(index<0)index=IDS.findIndex(function(id){return !done[id]});if(index<0)index=0;
 if(!sameIds(previous.ids,IDS)||localStorage.getItem(MARKER_KEY)!=='1'){
  localStorage.setItem(BASKET_KEY,JSON.stringify(IDS));
  localStorage.setItem(SESSION_KEY,JSON.stringify({day:0,source:'basket',ids:IDS.slice(),index:index,done:done,createdAt:previous.createdAt||new Date().toISOString(),routeLabel:'Ruta cafeterías · 17 agosto',startTime:'09:00'}));
  localStorage.setItem(MARKER_KEY,'1');
 }
 localStorage.setItem(START_KEY,'09:00');
 return true;
}
function decorate(){
 if(localDate()!==ROUTE_DATE)return;
 const page=document.querySelector('#visitsView .visit-page'),shell=page&&page.querySelector('.visit-shell');
 if(!page||!shell||page.querySelector('.v101-route-banner'))return;
 const banner=document.createElement('div');banner.className='v101-route-banner';
 banner.innerHTML='<div><span>RUTA CARGADA · HOY</span><b>Vintage → La Abuelita → Fidelio → Ameyalli → Cafenatlan → Aroma → Breve → Mr Rocco → Vero → Fragolina</b></div><em>10 paradas · 09:00</em>';
 shell.parentElement.insertBefore(banner,shell);
}
seed();
setTimeout(decorate,350);setTimeout(decorate,1000);
new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
window.radarTodayRouteV101={version:'10.1',date:ROUTE_DATE,ids:IDS.slice(),start:'09:00',restore:function(){localStorage.removeItem(MARKER_KEY);seed();location.reload()}};
})();
`;
html=html.replace('</style>',CSS+'</style>');
const pos=html.lastIndexOf('</body>');
if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
return html;
};
