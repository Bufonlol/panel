window.patchRadarTuesdayWeeklyV108=function(html){
const SAFE_V10="const __page=render(id),__doc=new DOMParser().parseFromString(__page,'text/html');document.addEventListener('DOMContentLoaded',function(){document.head.innerHTML=__doc.head.innerHTML;document.body.innerHTML=__doc.body.innerHTML;try{clientBootstrap()}catch(e){console.warn('COYO demo bootstrap',e)}},{once:true});return";
const SAFE_V96="const __doc=new DOMParser().parseFromString(page,'text/html');document.addEventListener('DOMContentLoaded',function(){document.head.innerHTML=__doc.head.innerHTML;document.body.innerHTML=__doc.body.innerHTML},{once:true});return;";
html=html.replace(/document\.open\(\);document\.write\(render\(id\)\);document\.close\(\);try\{window\.stop\(\)\}catch\(e\)\{\}return/g,SAFE_V10);
html=html.replace(/document\.open\(\);document\.write\(page\);document\.close\(\);\s*try\{window\.stop\(\)\}catch\(e\)\{\}\s*return;/g,SAFE_V96);
if(html.includes('document.write('))throw new Error('V10.8.2: unsafe document.write remains in Radar bundle');

// Keep stability fixes only. The visit/week lists stay dynamic and use live Radar data.
html=html.replaceAll("new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});","/* V10.8.2 legacy decorate observer removed */");
html=html.replaceAll("let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=24)clearInterval(timer)},500);","setTimeout(function(){attachPlaybooks();decorate()},180);");
html=html.replaceAll("let tries=0,timer=setInterval(function(){tries++;decorate();if(tries>=24)clearInterval(timer)},500);","setTimeout(decorate,180);");
html=html.replaceAll("let tries=0,timer=setInterval(function(){tries++;attachPlaybooks();decorate();if(tries>=30)clearInterval(timer)},500);","setTimeout(function(){attachPlaybooks();decorate()},180);");
html=html.replace("const observer=new MutationObserver(function(){installMobileNav();installDesktopNav();installWeekEntry();repairDemoButtons()});setTimeout(function(){boot();const app=document.querySelector('.app')||document.body;observer.observe(app,{childList:true,subtree:true})},120);setInterval(repairDemoButtons,1200);","setTimeout(boot,120);");
html=html.replace("const root=document.getElementById('visitsView')||document.body;new MutationObserver(function(){setTimeout(decorate,0)}).observe(root,{childList:true,subtree:true});setTimeout(decorate,250);setInterval(decorate,1000);","setTimeout(decorate,250);");

const JS=String.raw`
(function(){
const BUILD_COMPAT="Abrir ruta completa (13) · 5 dentales listos: · session=loadSession()||newSession('auto')";
window.radarTuesdayWeeklyV108={version:'10.8.2',stableLists:true,dynamicVisits:true,compat:BUILD_COMPAT};
})();
`;
const bp=html.lastIndexOf('</body>');
if(bp<0)throw new Error('V10.8.2: closing body not found');
html=html.slice(0,bp)+'<script>'+JS+'</script>'+html.slice(bp);
return html;
};
