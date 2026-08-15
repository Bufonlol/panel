window.patchRadarPerformanceV81=function(html){
const OLD_RENDER_ALL="function renderAll(fit=false){renderTodayV5();renderKPIs();renderNearby();renderLeads();renderPipeline();renderVerify();renderReports();renderSalesReportAddon();renderInspector();drawMap(fit)}";
const NEW_RENDER_ALL="function renderAll(fit=false){const m=typeof module!=='undefined'?module:'radar';if(m==='radar'){renderKPIs();renderNearby();renderInspector();drawMap(fit);return}if(m==='today'){renderTodayV5();renderInspector();return}if(m==='leads'){renderLeads();renderInspector();return}if(m==='pipeline'){renderPipeline();renderInspector();return}if(m==='verify'){renderVerify();renderInspector();return}if(m==='reports'){renderReports();renderSalesReportAddon();return}}";
if(!html.includes(OLD_RENDER_ALL))throw new Error('V8.1: eager renderAll signature not found');
html=html.replace(OLD_RENDER_ALL,NEW_RENDER_ALL);
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
renderAll=function(fit){renderActive(fit)};
const setModulePerfBase=setModule;
setModule=function(v){
  const r=setModulePerfBase(v);
  if(['radar','today','leads','pipeline','verify','reports'].includes(v))perfLater(()=>renderActive(false));
  return r;
};
window.radarPerfV81={renderActive:()=>renderActive(false),version:'8.1'};
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replaceAll('Weekly Prospecting OS V8</title>','Weekly Prospecting OS V8.1</title>');
html=html.replaceAll('Sales Intelligence V8</title>','Sales Intelligence V8.1</title>');
return html;
};
