window.patchRadarDemoEdgeFastpathV96=function(html){
const EARLY=String.raw`<script>(function(){
const BASE='https://zurfsqmqiwjnakkdsdlk.supabase.co/functions/v1/coyo-demo';
function edgeUrl(id){return BASE+'?id='+encodeURIComponent(String(id||''))}
try{
  const u=new URL(location.href),id=u.searchParams.get('demo');
  if(id&&u.searchParams.get('present')==='1'){
    location.replace(edgeUrl(id));
    return;
  }
}catch(e){}
document.addEventListener('click',function(e){
  const btn=e.target&&e.target.closest?e.target.closest('[data-v89-open-demo]'):null;
  if(!btn)return;
  const id=btn.dataset.v89OpenDemo;
  if(!id)return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  location.href=edgeUrl(id);
},true);
window.radarDemoEdgeFastpathV96={version:'9.6',url:edgeUrl};
})();</script>`;
html=html.replace('<head>','<head>'+EARLY);
html=html.replace('Weekly Prospecting OS V9.5</title>','Weekly Prospecting OS V9.6</title>');
return html;
};
