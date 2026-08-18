window.patchRadarPerformanceV81=function(html){
const OLD_RENDER_ALL="function renderAll(fit=false){renderTodayV5();renderKPIs();renderNearby();renderLeads();renderPipeline();renderVerify();renderReports();renderSalesReportAddon();renderInspector();drawMap(fit)}";
const NEW_RENDER_ALL="function renderAll(fit=false){const m=typeof module!=='undefined'?module:'radar';if(m==='radar'){renderKPIs();renderNearby();renderInspector();drawMap(fit);return}if(m==='today'){renderTodayV5();renderInspector();return}if(m==='leads'){renderLeads();renderInspector();return}if(m==='pipeline'){renderPipeline();renderInspector();return}if(m==='verify'){renderVerify();renderInspector();return}if(m==='reports'){renderReports();renderSalesReportAddon();return}}";
if(!html.includes(OLD_RENDER_ALL))throw new Error('V8.1: eager renderAll signature not found');
html=html.replace(OLD_RENDER_ALL,NEW_RENDER_ALL);

// Mobile field use does not need to block on all 6,000 rows before lists become usable.
// Desktop keeps the full universe; mobile gets a large enough working set for prospecting.
const OLD_DATA_LOAD="fetch(API+'?action=businesses&limit=6000',{headers:H({})})";
const NEW_DATA_LOAD="fetch(API+'?action=businesses&limit='+(typeof matchMedia==='function'&&matchMedia('(max-width:760px)').matches?1800:6000),{headers:H({})})";
if(html.includes(OLD_DATA_LOAD))html=html.replace(OLD_DATA_LOAD,NEW_DATA_LOAD);

const MAP_VISIBLE="const z=map.getZoom(),bounds=map.getBounds().pad(.2),visible=rows.filter(b=>bounds.contains([b.lat,b.lng]));";
const MAP_VISIBLE_OPT="const z=map.getZoom(),bounds=map.getBounds().pad(.2);let visible=rows.filter(b=>bounds.contains([b.lat,b.lng]));if(z>=15){const mobile=typeof matchMedia==='function'&&matchMedia('(max-width:760px)').matches,cap=mobile?140:320;if(visible.length>cap)visible=visible.slice().sort((a,b)=>(b.opportunityScore||0)-(a.opportunityScore||0)).slice(0,cap)}";
if(html.includes(MAP_VISIBLE))html=html.replace(MAP_VISIBLE,MAP_VISIBLE_OPT);

const LEADS_500="function renderLeads(){const d=filtered().slice().sort((a,b)=>b.opportunityScore-a.opportunityScore).slice(0,500);";
const LEADS_OPT="function renderLeads(){const mobile=typeof matchMedia==='function'&&matchMedia('(max-width:760px)').matches,d=filtered().slice().sort((a,b)=>b.opportunityScore-a.opportunityScore).slice(0,mobile?160:500);";
if(html.includes(LEADS_500))html=html.replace(LEADS_500,LEADS_OPT);

const JS=String.raw`
(function(){
const NativeMutationObserver=window.MutationObserver;
if(NativeMutationObserver&&!window.__radarVisitMutationGuard){
  const visitDecor='.v90-hours,.v90-nohours,.v90-proposal-hours,.v90-qhours,.v90-plan-chip,.v91-qtime,.v91-qsub,.v91-agenda,.v91-summary,.v91-start-wrap,.v91-plan-btn';
  const decorationNode=function(n){
    if(!n)return true;
    if(n.nodeType===1)return !!(n.matches?.(visitDecor)||n.closest?.(visitDecor));
    const p=n.parentElement||n.parentNode;
    return !!(p?.closest?.(visitDecor));
  };
  const decorationBatch=function(records){
    return !!records?.length&&records.every(function(m){
      const nodes=[...m.addedNodes,...m.removedNodes];
      if(!nodes.length)return !!m.target?.closest?.(visitDecor);
      return nodes.every(decorationNode);
    });
  };
  function RadarMutationObserver(callback){
    return new NativeMutationObserver(function(records,observer){
      if(decorationBatch(records))return;
      callback(records,observer);
    });
  }
  RadarMutationObserver.prototype=NativeMutationObserver.prototype;
  try{Object.setPrototypeOf(RadarMutationObserver,NativeMutationObserver)}catch{}
  window.MutationObserver=RadarMutationObserver;
  window.__radarVisitMutationGuard={version:'10.13',selector:visitDecor};
}
function perfLater(fn){if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>{try{fn()}catch(e){console.warn('Radar render',e)}});else setTimeout(()=>{try{fn()}catch(e){console.warn('Radar render',e)}},0)}
function withFilteredSnapshot(fn){
  const base=typeof filtered==='function'?filtered:null;
  let snapshot=null;
  if(base)filtered=function(){return snapshot||(snapshot=base())};
  try{return fn()}finally{if(base)filtered=base}
}
function renderActive(fit){
  return withFilteredSnapshot(()=>{
    const m=typeof module!=='undefined'?module:'radar';
    if(m==='radar'){
      if(typeof renderKPIs==='function')renderKPIs();
      if(typeof renderNearby==='function')renderNearby();
      if(typeof renderInspector==='function')renderInspector();
      if(typeof drawMap==='function')drawMap(!!fit);
      return;
    }
    if(m==='today'){
      if(typeof renderTodayV5==='function')renderTodayV5();
      if(typeof renderInspector==='function')renderInspector();
      return;
    }
    if(m==='leads'){
      if(typeof renderLeads==='function')renderLeads();
      if(typeof renderInspector==='function')renderInspector();
      return;
    }
    if(m==='pipeline'){
      if(typeof renderPipeline==='function')renderPipeline();
      if(typeof renderInspector==='function')renderInspector();
      return;
    }
    if(m==='verify'){
      if(typeof renderVerify==='function')renderVerify();
      if(typeof renderInspector==='function')renderInspector();
      return;
    }
    if(m==='reports'){
      if(typeof renderReports==='function')renderReports();
      if(typeof renderSalesReportAddon==='function')renderSalesReportAddon();
      return;
    }
    if(m==='week'){
      perfLater(()=>{const active=document.querySelector('#v8Days [data-v8-day].on')||document.querySelector('#v8Days [data-v8-day]');if(active)active.click()});
      return;
    }
    if(m==='rentals'){
      perfLater(()=>{const active=document.querySelector('[data-v7-rfilter].on');if(active)active.click()});
    }
  })
}
renderAll=function(fit){return renderActive(fit)};

if(typeof drawMap==='function'){
  const drawMapPerfBase=drawMap;
  let redrawTimer=0,redrawFrame=0,lastDrawAt=0;
  const now=()=>typeof performance!=='undefined'&&performance.now?performance.now():Date.now();
  function canDraw(){const el=document.getElementById('map');return !!el&&!!el.offsetParent&&(typeof module==='undefined'||module==='radar')}
  drawMap=function(fit){
    if(!canDraw())return;
    clearTimeout(redrawTimer);
    if(redrawFrame&&typeof cancelAnimationFrame==='function'){cancelAnimationFrame(redrawFrame);redrawFrame=0}
    if(fit){lastDrawAt=now();return drawMapPerfBase(true)}
    const delay=Math.max(0,140-(now()-lastDrawAt));
    redrawTimer=setTimeout(()=>{
      const run=()=>{redrawFrame=0;if(!canDraw())return;lastDrawAt=now();drawMapPerfBase(false)};
      if(typeof requestAnimationFrame==='function')redrawFrame=requestAnimationFrame(run);else run();
    },delay)
  }
}

const setModulePerfBase=setModule;
setModule=function(v){
  const r=setModulePerfBase(v);
  // Radar already schedules its own map invalidation/draw in the base handler.
  // Scheduling renderActive again here caused duplicate map work on every return to Radar.
  if(['today','leads','pipeline','verify','reports'].includes(v))perfLater(()=>renderActive(false));
  return r;
};
window.radarPerfV81={renderActive:()=>renderActive(false),version:'8.1',coalescedDraws:true,mobileMarkerCap:140,visitMutationGuard:true,mobileBusinessLimit:1800};
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replaceAll('Weekly Prospecting OS V8</title>','Weekly Prospecting OS V8.1</title>');
html=html.replaceAll('Sales Intelligence V8</title>','Sales Intelligence V8.1</title>');
return html;
};
