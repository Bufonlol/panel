window.patchRadarDemoAutoloadV92=function(html){
const JS=String.raw`
(function(){
const API='https://zurfsqmqiwjnakkdsdlk.supabase.co/functions/v1/radar-research';
let wrapping=false;
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function findBiz(id){try{return Array.isArray(data)?data.find(function(b){return idOf(b)===String(id)}):null}catch{return null}}
async function loadPlaybook(id){const b=findBiz(id);if(!b)return null;if(b.salesPlaybook)return b.salesPlaybook;try{if(typeof toast==='function')toast('Cargando demo…');const r=await fetch(API+'?denue_id='+encodeURIComponent(String(id)),{headers:{Accept:'application/json'}});const j=await r.json();if(!r.ok)throw new Error(j?.error||'No se pudo cargar la investigación');const research=j?.research||null,p=research?.sales_playbook||null;if(!p)throw new Error('Este prospecto todavía no tiene una propuesta investigada');b.salesPlaybook=p;b.sales_playbook=p;if(research){b.researchStatus=research.research_status??b.researchStatus;b.research_status=research.research_status??b.research_status;b.researchConfidence=research.research_confidence??b.researchConfidence;b.research_confidence=research.research_confidence??b.research_confidence}return p}catch(e){if(typeof toast==='function')toast(e instanceof Error?e.message:'No se pudo cargar la demo');return null}}
function wrap(){if(wrapping)return;if(!window.radarCoyoDemosV86?.open){setTimeout(wrap,200);return}if(window.radarCoyoDemosV86.__autoloadV92)return;wrapping=true;const original=window.radarCoyoDemosV86.open.bind(window.radarCoyoDemosV86);window.radarCoyoDemosV86.open=async function(id,present){const b=findBiz(id);if(b&&!b.salesPlaybook){const p=await loadPlaybook(id);if(!p)return}return original(id,present)};window.radarCoyoDemosV86.__autoloadV92=true;wrapping=false}
setTimeout(wrap,100);setInterval(wrap,1500);window.radarDemoAutoloadV92={version:'9.2',load:loadPlaybook,wrap:wrap};
})();
`;
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replace('Weekly Prospecting OS V9.1</title>','Weekly Prospecting OS V9.2</title>');
return html;
};
