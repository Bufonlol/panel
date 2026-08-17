window.patchRadarDemoPresentCleanV94=function(html){
const CSS=String.raw`
/* Radar Local V9.4 — direct presentation + clean demo iconography */
.coyo-direct-present .app{visibility:hidden!important}
.coyo-direct-present #coyoDemoModal{visibility:visible!important}
#v94DirectLoading{position:fixed;inset:0;z-index:8190;background:#f4eadc;display:none;place-items:center;color:#1f2a25;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.coyo-direct-present #v94DirectLoading{display:grid}
#v94DirectLoading>div{padding:18px 20px;border:1px solid #dccab8;border-radius:16px;background:#fffaf1;font-size:12px;font-weight:800;box-shadow:0 18px 50px rgba(31,42,37,.12)}
.coyo-demo-card em{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;font-weight:900!important;font-size:8px!important;letter-spacing:.05em!important;color:#2f5d45!important;background:#f2e9dc!important}
.coyo-demo-cta{gap:6px}.coyo-demo-cta .v94-arrow{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:900}
`;
const JS=String.raw`
(function(){
const API='https://zurfsqmqiwjnakkdsdlk.supabase.co/functions/v1/radar-research';
let opening=false,openedDirect=false,tries=0,retryTimer=null;
function idOf(b){return String((b&&(b.denueId??b.denue_id??b.id))||'')}
function arr(){try{return Array.isArray(data)?data:null}catch{return null}}
function localBiz(id){const a=arr();return a?a.find(function(b){return idOf(b)===String(id)})||null:null}
function cleanIcons(root){
 const box=root||document.getElementById('coyoDemoBody');if(!box)return;
 box.querySelectorAll('.coyo-demo-card em').forEach(function(n,i){n.textContent=String(i+1).padStart(2,'0')});
 box.querySelectorAll('.coyo-demo-cta').forEach(function(n){
   const txt=n.textContent.replace(/[→↗★☕◇▤◉♧☺⌖▣◷]/g,'').trim();
   n.innerHTML=txt+' <span class="v94-arrow">-&gt;</span>';
 });
}
function loading(on){
 let el=document.getElementById('v94DirectLoading');
 if(on&&!el){el=document.createElement('div');el.id='v94DirectLoading';el.innerHTML='<div>Preparando demo COYO…</div>';document.body.appendChild(el)}
 if(!on&&el)el.remove();
}
async function ensureDirect(id){
 let b=localBiz(id),p=b?.salesPlaybook||b?.sales_playbook||null;
 if(b&&p){b.salesPlaybook=p;return b}
 if(window.radarDemoOpenHardfixV93?.ensure){
   try{const x=await window.radarDemoOpenHardfixV93.ensure(id);if(x)return x}catch{}
 }
 const r=await fetch(API+'?denue_id='+encodeURIComponent(String(id))+'&_='+Date.now(),{cache:'no-store',headers:{Accept:'application/json'}});
 const j=await r.json();if(!r.ok)throw new Error(j?.error||'No se pudo cargar la investigación');
 const research=j?.research||null;const playbook=research?.sales_playbook||null;
 if(!research||!playbook)throw new Error('La demo de este prospecto no está disponible');
 b=localBiz(id);
 if(!b){
   const a=arr();if(!a)throw new Error('Radar todavía está cargando los negocios');
   b={denueId:String(research.denue_id||id),denue_id:String(research.denue_id||id),name:research.name||('Prospecto '+id),activityClass:research.activity_class||'',activity_class:research.activity_class||'',sector:research.sector||'',salesPlaybook:playbook,sales_playbook:playbook,researchStatus:research.research_status||'reviewed',research_status:research.research_status||'reviewed',researchConfidence:research.research_confidence??null,research_confidence:research.research_confidence??null};
   a.push(b);
 }else{b.salesPlaybook=playbook;b.sales_playbook=playbook}
 return b;
}
async function openFromUrl(silent){
 if(opening||openedDirect)return false;
 const u=new URL(location.href),id=u.searchParams.get('demo');if(!id)return false;
 const present=u.searchParams.get('present')==='1';
 if(present){document.documentElement.classList.add('coyo-direct-present');loading(true)}
 opening=true;tries++;
 try{
   const b=await ensureDirect(id);if(!b)throw new Error('No se pudo preparar la demo');
   const api=window.radarCoyoDemosV86;if(!api?.open)throw new Error('Demo COYO no disponible');
   await api.open(String(id),present);
   openedDirect=true;loading(false);cleanIcons();setTimeout(function(){cleanIcons()},80);
   if(retryTimer){clearInterval(retryTimer);retryTimer=null}
   return true;
 }catch(e){
   if(tries>=24){document.documentElement.classList.remove('coyo-direct-present');loading(false);if(!silent&&typeof toast==='function')toast(e instanceof Error?e.message:'No se pudo abrir la demo')}
   return false;
 }finally{opening=false}
}
const body=document.getElementById('coyoDemoBody');if(body)new MutationObserver(function(){cleanIcons(body)}).observe(body,{childList:true,subtree:true});
document.addEventListener('click',function(e){
 const close=e.target.closest?.('[data-coyo-close]');if(close){document.documentElement.classList.remove('coyo-direct-present');loading(false)}
 const demo=e.target.closest?.('[data-v89-open-demo],[data-coyo-demo-id],[data-v88-demo]');if(demo)setTimeout(function(){cleanIcons()},80);
},true);
const params=new URL(location.href).searchParams;if(params.get('demo')){
 if(params.get('present')==='1'){document.documentElement.classList.add('coyo-direct-present');setTimeout(function(){loading(true)},0)}
 setTimeout(function(){openFromUrl(true)},150);
 retryTimer=setInterval(function(){if(openedDirect||tries>=24){clearInterval(retryTimer);retryTimer=null;return}openFromUrl(tries<23)},500);
}
window.radarDemoPresentCleanV94={version:'9.4',openFromUrl:openFromUrl,clean:cleanIcons,ensure:ensureDirect};
})();
`;
html=html.replace('</style>',CSS+'</style>');
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replace('Weekly Prospecting OS V9.3</title>','Weekly Prospecting OS V9.4</title>');
return html;
};
