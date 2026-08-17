window.patchRadarOperationalSafetyV98=function(html){
const JS=String.raw`
(function(){
const CLOSED_OP=new Set(['permanently_closed','temporarily_closed','closed','not_found','inactive','ceased']);
const CLOSED_GOOGLE=new Set(['CLOSED_PERMANENTLY','PERMANENTLY_CLOSED','CLOSED_TEMPORARILY','TEMPORARILY_CLOSED','CLOSED']);
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function list(){try{return Array.isArray(data)?data:[]}catch{return[]}}
function closed(b){
  if(!b)return true;
  const op=String(b.operationalStatus??b.operational_status??'').trim().toLowerCase();
  const gb=String(b.googleBusinessStatus??b.google_business_status??'').trim().toUpperCase();
  return CLOSED_OP.has(op)||CLOSED_GOOGLE.has(gb);
}
function reason(b){
  const gb=String(b?.googleBusinessStatus??b?.google_business_status??'').toUpperCase();
  if(CLOSED_GOOGLE.has(gb))return 'Google Maps / estado operativo indica que este establecimiento está cerrado. Radar lo excluye de visitas y rutas.';
  return 'El establecimiento no tiene estado operativo válido para una visita física. Radar lo excluye hasta verificar que siga abierto.';
}
function wrapProfile(){
  try{
    const base=window.prospectingProfile;
    if(typeof base!=='function'||base.__operationalSafetyV98)return;
    const wrapped=function(b){
      if(closed(b))return{score:0,tier:'skip',reason:reason(b),source:'operational_safety_v98'};
      return base.apply(this,arguments);
    };
    wrapped.__operationalSafetyV98=true;
    window.prospectingProfile=wrapped;
    try{prospectingProfile=wrapped}catch{}
  }catch{}
}
function eligibleId(id){const b=list().find(function(x){return idOf(x)===String(id)});return !!b&&!closed(b)}
function cleanArray(raw){return(Array.isArray(raw)?raw:[]).map(String).filter(eligibleId)}
function sanitizeStorage(){
  if(!list().length)return false;
  let changed=false;
  try{
    const k='radar_route_basket_v2',raw=JSON.parse(localStorage.getItem(k)||'[]'),next=cleanArray(raw);
    if(Array.isArray(raw)&&next.length!==raw.length){localStorage.setItem(k,JSON.stringify(next));changed=true}
  }catch{}
  try{
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);if(!k||!k.startsWith('radar_visit_session_v2_'))continue;
      try{
        const s=JSON.parse(localStorage.getItem(k)||'null');if(!s||!Array.isArray(s.ids))continue;
        const next=cleanArray(s.ids);
        if(next.length!==s.ids.length){
          s.ids=next;s.index=Math.max(0,Math.min(Number(s.index)||0,Math.max(0,next.length-1)));
          if(s.done&&typeof s.done==='object')Object.keys(s.done).forEach(function(id){if(!next.includes(String(id)))delete s.done[id]});
          localStorage.setItem(k,JSON.stringify(s));changed=true;
        }
      }catch{}
    }
  }catch{}
  if(changed){
    try{window.radarVisitModeV88?.rebuild?.('auto')}catch{}
    try{typeof toast==='function'&&toast('Ruta actualizada: se retiraron negocios cerrados')}catch{}
  }
  return changed;
}
function markClosed(){
  const byId=new Map(list().map(function(b){return[idOf(b),b]}));
  document.querySelectorAll('[data-lead-id],[data-v89-business],[data-visit-jump]').forEach(function(el){
    const id=el.dataset.leadId||el.dataset.v89Business||el.dataset.visitJumpBusiness;if(!id)return;
    const b=byId.get(String(id));if(b&&closed(b)){el.classList.add('radar-closed-blocked');el.setAttribute('data-operational-blocked','1')}
  });
}
function run(){wrapProfile();sanitizeStorage();markClosed()}
run();setTimeout(run,120);setTimeout(run,500);setTimeout(run,1400);setInterval(run,5000);
window.radarOperationalSafetyV98={version:'9.8',closed:closed,sanitize:sanitizeStorage,run:run};
})();
`;
const CSS=String.raw`
.radar-closed-blocked{opacity:.5!important;filter:grayscale(.35)}
`;
html=html.replace('</style>',CSS+'</style>');
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replace('Weekly Prospecting OS V9.6</title>','Weekly Prospecting OS V9.8</title>');
return html;
};
