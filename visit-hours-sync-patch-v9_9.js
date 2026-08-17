window.patchRadarVisitHoursSyncV99=function(html){
const JS=String.raw`
(function(){
let syncing=false,last=0;
async function syncHoursAndPlan(force){
  if(syncing)return;
  const now=Date.now();
  if(!force&&now-last<1500)return;
  syncing=true;
  try{
    const hours=window.radarVisitHoursV90;
    if(hours&&typeof hours.refresh==='function')await hours.refresh();
  }catch(e){console.warn('Radar hours sync failed',e)}
  try{window.radarVisitItineraryV91&&window.radarVisitItineraryV91.replan&&window.radarVisitItineraryV91.replan()}catch(e){}
  last=Date.now();syncing=false;
}
function visitsOpen(){return !!document.getElementById('visitsView')?.classList.contains('on')}
setTimeout(function(){if(visitsOpen())syncHoursAndPlan(true)},650);
document.addEventListener('click',function(e){
  if(e.target.closest?.('[data-module="visits"],[data-mmodule="visits"],[data-visit-open],[data-visit-rebuild],[data-v91-plan],[data-visit-jump],[data-visit-next],[data-visit-prev]')){
    setTimeout(function(){syncHoursAndPlan(true)},120);
  }
});
setInterval(function(){if(visitsOpen())syncHoursAndPlan(false)},30000);
window.radarVisitHoursSyncV99={version:'9.9',sync:function(){return syncHoursAndPlan(true)}};
})();
`;
const pos=html.lastIndexOf('</body>');
if(pos>=0)html=html.slice(0,pos)+'<script>'+JS+'</script>'+html.slice(pos);
html=html.replace('Weekly Prospecting OS V9.8</title>','Weekly Prospecting OS V9.9</title>');
return html;
};
