window.patchRadarResearchedGoNowV722=function(html){
const JS=String.raw`
(function(){
const prevProfile=window.prospectingProfile;
if(typeof prevProfile!=='function')return;
window.prospectingProfile=function(b){
  const f=prevProfile(b);
  const researched=b?.researchStatus==='reviewed'&&b?.operationalStatus==='operational';
  if(researched)return f;
  if(f?.tier==='go_now'||f?.source==='heuristic'){
    return {...f,score:Math.min(Number(f?.score)||0,68),tier:'call_first',reason:b?.researchStatus==='needs_review'?'Requiere revisión antes de invertir una visita física. Confirma operación, identidad y decisor.':'Aún no ha sido investigado y confirmado. Radar no lo enviará a una ruta física hasta validar operación y acceso al decisor.',source:'heuristic_unverified'};
  }
  return f;
};
function refreshFitLabels(){
  document.querySelectorAll('.v6-row[data-lead-id]').forEach(row=>{
    const b=(Array.isArray(data)?data:[]).find(x=>String(x.denueId)===String(row.dataset.leadId));
    if(!b)return;
    const f=window.prospectingProfile(b),badge=row.querySelector('.pfit-inline');
    if(badge&&f?.source==='heuristic_unverified'){
      badge.className='pfit-inline call_first';
      badge.textContent='INVESTIGAR PRIMERO';
      badge.title=f.reason||'';
    }
  });
  document.querySelectorAll('#routePlan .route-row').forEach(row=>{
    const id=row.querySelector('.route-open')?.dataset.id,b=(Array.isArray(data)?data:[]).find(x=>String(x.denueId)===String(id));
    if(!b)return;
    const f=window.prospectingProfile(b),badge=row.querySelector('.pfit-inline');
    if(badge&&f?.source==='heuristic_unverified'){
      badge.className='pfit-inline call_first';
      badge.textContent='INVESTIGAR PRIMERO';
      badge.title=f.reason||'';
    }
  });
}
const obs=new MutationObserver(()=>refreshFitLabels());
setTimeout(()=>{refreshFitLabels();const app=document.querySelector('.app')||document.body;obs.observe(app,{childList:true,subtree:true})},300);
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replaceAll('Sales Intelligence V7.2.1</title>','Sales Intelligence V7.2.2</title>');
return html;
};
