window.patchRadarDemoPresentCleanV94=function(html){
const CSS=String.raw`
/* Radar Local V9.4 — direct presentation + clean demo iconography */
.coyo-direct-present .app{visibility:hidden!important}
.coyo-direct-present #coyoDemoModal{visibility:visible!important}
.coyo-demo-card em{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;font-weight:900!important;font-size:8px!important;letter-spacing:.05em!important;color:#2f5d45!important;background:#f2e9dc!important}
.coyo-demo-cta{gap:6px}.coyo-demo-cta .v94-arrow{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:900}
`;
const JS=String.raw`
(function(){
let opening=false,openedDirect=false;
function cleanIcons(root){
 const box=root||document.getElementById('coyoDemoBody');if(!box)return;
 box.querySelectorAll('.coyo-demo-card em').forEach(function(n,i){n.textContent=String(i+1).padStart(2,'0')});
 box.querySelectorAll('.coyo-demo-cta').forEach(function(n){
   n.innerHTML=n.textContent.replace(/[→↗★☕◇▤◉♧☺⌖▣◷]/g,'').trim()+' <span class="v94-arrow">-&gt;</span>';
 });
}
async function openFromUrl(){
 if(opening||openedDirect)return;
 const u=new URL(location.href),id=u.searchParams.get('demo');if(!id)return;
 const present=u.searchParams.get('present')==='1';
 opening=true;
 try{
   let b=null;
   if(window.radarDemoOpenHardfixV93?.ensure)b=await window.radarDemoOpenHardfixV93.ensure(id);
   else if(window.radarDemoAutoloadV92?.load){await window.radarDemoAutoloadV92.load(id);b=true}
   if(!b)throw new Error('No se pudo preparar la demo');
   const api=window.radarCoyoDemosV86;if(!api?.open)throw new Error('Demo COYO no disponible');
   if(present)document.documentElement.classList.add('coyo-direct-present');
   await api.open(String(id),present);
   openedDirect=true;
   setTimeout(function(){cleanIcons()},30);
 }catch(e){
   document.documentElement.classList.remove('coyo-direct-present');
   if(typeof toast==='function')toast(e instanceof Error?e.message:'No se pudo abrir la demo');
 }finally{opening=false}
}
const body=document.getElementById('coyoDemoBody');if(body)new MutationObserver(function(){cleanIcons(body)}).observe(body,{childList:true,subtree:true});
document.addEventListener('click',function(e){
 const close=e.target.closest?.('[data-coyo-close]');if(close)document.documentElement.classList.remove('coyo-direct-present');
 const demo=e.target.closest?.('[data-v89-open-demo],[data-coyo-demo-id],[data-v88-demo]');if(demo)setTimeout(function(){cleanIcons()},80);
},true);
setTimeout(openFromUrl,250);setTimeout(openFromUrl,800);setTimeout(openFromUrl,1600);
window.addEventListener('load',function(){setTimeout(openFromUrl,150)});
window.radarDemoPresentCleanV94={version:'9.4',openFromUrl:openFromUrl,clean:cleanIcons};
})();
`;
html=html.replace('</style>',CSS+'</style>');
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replace('Weekly Prospecting OS V9.3</title>','Weekly Prospecting OS V9.4</title>');
return html;
};
