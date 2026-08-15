window.patchRadarVisitRouteDefaultV721=function(html){
const JS=String.raw`
(function(){
function routeVisitDefault721(){
  const s=document.getElementById('routeProspectingFit');
  if(!s)return false;
  if(!s.dataset.v721Initialized){
    s.value='go_now';
    s.dataset.v721Initialized='1';
  }
  const go=[...s.options].find(o=>o.value==='go_now');
  const rec=[...s.options].find(o=>o.value==='recommended');
  if(go)go.textContent='Sólo IR AHORA';
  if(rec)rec.textContent='IR AHORA + llamar primero';
  const note=document.querySelector('#routeModal .route-pfit-note');
  if(note)note.textContent='Por defecto la ruta física incluye sólo IR AHORA. Usa LLAMAR PRIMERO para preparar contactos antes de desplazarte.';
  return true;
}
function openVisitDefault(){
  setTimeout(()=>{
    if(routeVisitDefault721())document.getElementById('routeGenerate')?.click();
  },60);
}
document.addEventListener('click',e=>{
  if(e.target.closest&&e.target.closest('#routeNavBtn,.route-planner-quick'))openVisitDefault();
});
const oldOpen=window.openRoutePlanner;
if(typeof oldOpen==='function')window.openRoutePlanner=function(){
  const r=oldOpen.apply(this,arguments);
  openVisitDefault();
  return r;
};
setTimeout(routeVisitDefault721,400);
window.routeVisitDefault721=routeVisitDefault721;
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replaceAll('Sales Intelligence V7.2</title>','Sales Intelligence V7.2.1</title>');
return html;
};
