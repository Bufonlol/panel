window.patchRadarDemoOpenHardfixV93=function(html){
const JS=String.raw`
(function(){
const API='https://zurfsqmqiwjnakkdsdlk.supabase.co/functions/v1/radar-research';
let busy=false;
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function all(){try{return Array.isArray(data)?data:[]}catch{return[]}}
function findBiz(id){return all().find(function(b){return idOf(b)===String(id)})||null}
function getPlaybook(b){return b?.salesPlaybook||b?.sales_playbook||null}
async function ensure(id){const b=findBiz(id);if(!b)return null;const existing=getPlaybook(b);if(existing){b.salesPlaybook=existing;return b}
try{
 if(typeof toast==='function')toast('Cargando demo…');
 const r=await fetch(API+'?denue_id='+encodeURIComponent(String(id))+'&_='+Date.now(),{cache:'no-store',headers:{Accept:'application/json'}});
 const j=await r.json();
 if(!r.ok)throw new Error(j?.error||'No se pudo cargar la investigación');
 const p=j?.research?.sales_playbook||null;
 if(!p)throw new Error('La propuesta de este negocio no está disponible');
 b.salesPlaybook=p;b.sales_playbook=p;
 return b;
}catch(e){if(typeof toast==='function')toast(e instanceof Error?e.message:'No se pudo abrir la demo');return null}
}
function targetId(t){const a=t.closest?.('[data-v89-open-demo],[data-coyo-demo-id],[data-v88-demo]');if(!a)return null;return a.dataset.v89OpenDemo||a.dataset.coyoDemoId||a.dataset.v88Demo||null}
async function hardOpen(id){if(busy)return;busy=true;try{const b=await ensure(id);if(!b)return;const p=getPlaybook(b);if(!p)return;b.salesPlaybook=p;
 const api=window.radarCoyoDemosV86;
 if(!api?.open)throw new Error('Demo COYO no disponible');
 await api.open(String(id),false);
}catch(e){if(typeof toast==='function')toast(e instanceof Error?e.message:'No se pudo abrir la demo')}finally{busy=false}}
document.addEventListener('click',function(e){const id=targetId(e.target);if(!id)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();hardOpen(id)},true);
window.radarDemoOpenHardfixV93={version:'9.3',open:hardOpen,ensure:ensure};
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replace('Weekly Prospecting OS V9.2</title>','Weekly Prospecting OS V9.3</title>');
return html;
};
