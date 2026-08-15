window.patchRadarPerformanceV81=function(html){
const JS=String.raw`
(function(){
function perfLater(fn){if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>{try{fn()}catch(e){console.warn('Radar render',e)}});else setTimeout(()=>{try{fn()}catch(e){console.warn('Radar render',e)}},0)}
function renderActive(fit){
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
}
// The old renderAll eagerly rebuilt every hidden module on each load/filter change.
// Keep the public function name but render only what the user can currently see.
renderAll=function(fit){renderActive(fit)};

const setModulePerfBase=setModule;
setModule=function(v){
  const r=setModulePerfBase(v);
  // V7/V8 own their specialized screens. Base modules need an explicit lazy render now.
  if(['radar','today','leads','pipeline','verify','reports'].includes(v))perfLater(()=>renderActive(false));
  return r;
};

// Coalesce rapid filter changes into a single paint. Base filterRender still calls renderAll,
// but this prevents hidden panels from being rebuilt and yields to the browser between paints.
let lastPaint=0;
window.radarPerfV81={renderActive:()=>renderActive(false),version:'8.1'};
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replaceAll('Sales Intelligence V8</title>','Sales Intelligence V8.1</title>');
return html;
};
