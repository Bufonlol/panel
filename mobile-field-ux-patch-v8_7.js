window.patchRadarMobileFieldV87=function(html){
const CSS=String.raw`
/* Radar Local V8.7 — mobile-first field UX */
.v87-more,.v87-more-backdrop{display:none}
.v87-sheet-bar{display:none}
@media(max-width:900px){
  :root{--v87-dock:68px}
  html,body{overscroll-behavior:none;-webkit-text-size-adjust:100%;touch-action:manipulation}
  body{font-size:14px!important}
  .app,.app.reports-wide{display:block!important;height:100dvh!important}
  .main,.app.reports-wide .main{height:100dvh!important;min-height:100dvh!important}
  .view{inset:0!important}
  .module-page,.app.reports-wide .module-page{padding:max(14px,env(safe-area-inset-top)) 12px calc(92px + env(safe-area-inset-bottom))!important;scroll-padding-bottom:100px;-webkit-overflow-scrolling:touch;overscroll-behavior-y:contain}
  .page-head{gap:9px!important;margin-bottom:13px!important;flex-direction:column!important;align-items:stretch!important}
  .page-head h1,.app.reports-wide #reportsView .page-head h1{font-size:24px!important;line-height:1.05!important}
  .page-head p,.app.reports-wide #reportsView .page-head p{font-size:11px!important;line-height:1.45!important}
  .page-actions{display:flex!important;width:100%;gap:7px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none}
  .page-actions::-webkit-scrollbar{display:none}.page-actions .btn{flex:0 0 auto}
  button,.btn,.iconbtn,.filter-pill,.ins-tab{touch-action:manipulation}
  .btn{min-height:42px!important;padding:10px 12px!important;font-size:11px!important;border-radius:11px!important}
  .iconbtn{width:44px!important;height:44px!important;min-height:44px!important}
  .control,.textarea,input.control,select.control,textarea.control{min-height:44px!important;font-size:16px!important;padding:10px 11px!important;border-radius:11px!important}
  .textarea{line-height:1.45!important}.label{font-size:10px!important;margin-bottom:6px!important}.helper{font-size:9.5px!important}
  .panel,.v8-card,.v6-panel,.sales-panel,.today-panel,.reports-panel{border-radius:14px!important;box-shadow:0 5px 16px rgba(28,44,76,.045)!important}
  .panel-pad,.v8-card,.v6-panel,.sales-panel,.today-panel{padding:13px!important}

  /* Primary field dock: 4 daily destinations + More */
  .mobile-nav{display:grid!important;grid-template-columns:repeat(5,1fr)!important;left:8px!important;right:8px!important;bottom:calc(8px + env(safe-area-inset-bottom))!important;height:var(--v87-dock)!important;padding:5px!important;border-radius:19px!important;z-index:1500!important;background:#fff!important;border:1px solid #dfe5ec!important;box-shadow:0 10px 28px rgba(23,37,59,.16)!important;backdrop-filter:none!important}
  .mobile-nav button{min-width:0!important;min-height:56px!important;padding:5px 2px!important;border-radius:14px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;font-size:9px!important;line-height:1!important;font-weight:800!important;color:#748195!important}
  .mobile-nav button.on{background:#edf4ff!important;color:#1769e0!important}
  .v87-ico{font-size:17px;line-height:1;font-weight:700}.v87-nav-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
  .v87-more-backdrop{position:fixed;display:block;z-index:1460;inset:0;background:rgba(17,26,40,.28);opacity:0;pointer-events:none;transition:opacity .16s ease}
  .v87-more-backdrop.on{opacity:1;pointer-events:auto}
  .v87-more{position:fixed;display:block;z-index:1480;left:8px;right:8px;bottom:calc(84px + env(safe-area-inset-bottom));padding:14px;background:#fff;border:1px solid #dfe5ec;border-radius:20px;box-shadow:0 18px 48px rgba(21,34,54,.2);transform:translateY(18px);opacity:0;pointer-events:none;transition:.16s ease}
  .v87-more.on{transform:none;opacity:1;pointer-events:auto}.v87-more-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}.v87-more-head b{font-size:13px}.v87-more-head span{font-size:9px;color:var(--muted)}
  .v87-more-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.v87-more-grid button{min-height:64px;border:1px solid var(--line);background:#fbfcfe;border-radius:13px;color:#536176;font-size:10px;font-weight:800;display:grid;place-items:center;gap:3px;padding:8px}.v87-more-grid button.on{border-color:#b7d0f7;background:#f2f7ff;color:var(--blue)}.v87-more-grid i{font-style:normal;font-size:18px;line-height:1}

  /* Map is truly full-screen, dock floats above it */
  .map-wrap{inset:0!important}.nearby{display:none!important}.legend{display:none!important}
  .map-toolbar{top:calc(8px + env(safe-area-inset-top))!important;left:8px!important;right:8px!important}.location-card{max-width:calc(100vw - 112px)!important;padding:9px 10px!important;border-radius:13px!important;box-shadow:0 6px 18px rgba(28,44,76,.1)!important}.location-card b{font-size:12px!important}.location-card span{font-size:9px!important}
  .map-kpis{top:calc(64px + env(safe-area-inset-top))!important;left:8px!important;right:8px!important;bottom:auto!important;display:flex!important;gap:7px!important;overflow-x:auto!important;scroll-snap-type:x proximity;scrollbar-width:none;padding-bottom:3px!important}.map-kpis::-webkit-scrollbar{display:none}.map-kpis .kpi{min-width:120px!important;scroll-snap-align:start;padding:9px 10px!important;border-radius:12px!important;box-shadow:0 5px 15px rgba(28,44,76,.08)!important}.kpi b{font-size:16px!important}.kpi span{font-size:8.5px!important}
  .leaflet-bottom{bottom:calc(78px + env(safe-area-inset-bottom))!important}.leaflet-control-attribution{font-size:6px!important}

  /* Business detail becomes a usable bottom sheet */
  .mobile-sheet{display:block!important;left:0!important;right:0!important;bottom:calc(82px + env(safe-area-inset-bottom))!important;max-height:76dvh!important;padding:22px 14px 18px!important;border:1px solid #dfe5ec!important;border-radius:24px 24px 16px 16px!important;box-shadow:0 -16px 42px rgba(20,34,55,.18)!important;z-index:1420!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;transition:transform .18s ease;background:#fff!important}
  .mobile-sheet.hide{display:none!important}.mobile-sheet:before{content:'';position:absolute;top:8px;left:50%;width:42px;height:4px;transform:translateX(-50%);border-radius:99px;background:#d5dbe3}
  .v87-sheet-bar{display:flex;justify-content:flex-end;margin:-7px 0 3px}.v87-sheet-close{width:38px;height:38px;border:0;border-radius:11px;background:#f2f5f8;color:#526174;font-size:18px;font-weight:700}
  .mobile-sheet .inspector-head{padding-right:2px}.mobile-sheet .biz-title{min-width:0}.mobile-sheet .biz-title>div:last-child{min-width:0}.mobile-sheet .biz-title h2{font-size:17px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mobile-sheet .biz-title p{font-size:9.5px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mobile-sheet .favorite{width:42px;height:42px;flex:0 0 auto}
  .mobile-sheet .ins-tabs{position:sticky;top:-22px;z-index:4;margin:12px -14px 13px;padding:8px 14px 0;background:#fff;display:flex;gap:4px;overflow-x:auto;scrollbar-width:none}.mobile-sheet .ins-tabs::-webkit-scrollbar{display:none}.mobile-sheet .ins-tab{flex:0 0 auto;min-height:40px;padding:9px 10px!important;font-size:10px!important;border-radius:9px}.mobile-sheet .ins-tab.on{background:#eef5ff;border-bottom:0!important}
  .mobile-sheet .score-grid{gap:7px}.mobile-sheet .score-card{padding:10px}.mobile-sheet .score-card span{font-size:8.5px}.mobile-sheet .score-card b{font-size:21px}.mobile-sheet .facts{border-radius:12px}.mobile-sheet .fact{grid-template-columns:1fr!important;gap:2px!important;padding:10px 11px!important}.mobile-sheet .fact span{font-size:9px!important}.mobile-sheet .fact b{text-align:left!important;font-size:10px!important}.mobile-sheet .service-grid{grid-template-columns:1fr!important}.mobile-sheet .service{padding:11px!important}.mobile-sheet .service b{font-size:10px!important}.mobile-sheet .service p{font-size:9px!important;min-height:0!important}.mobile-sheet .service strong{font-size:11px!important}.mobile-sheet .ins-actions{grid-template-columns:1fr 1fr!important;position:sticky;bottom:-18px;background:linear-gradient(transparent,#fff 18px);padding-top:22px;margin-top:7px}

  /* Filters: comfortable one-hand bottom sheet */
  .drawer{left:8px!important;right:8px!important;bottom:calc(8px + env(safe-area-inset-bottom))!important;max-height:86dvh!important;overflow:auto!important;padding:15px!important;border-radius:20px!important;z-index:1600!important;box-shadow:0 20px 54px rgba(21,34,54,.22)!important}.drawer .grid2{grid-template-columns:1fr!important}.backdrop{z-index:1590!important}

  /* Dense desktop rows become simple mobile lead cards */
  .today-row,.mission-row,.v6-row{grid-template-columns:48px minmax(0,1fr)!important;gap:10px!important;padding:12px 5px!important}.today-row>*:nth-child(n+3),.mission-row>*:nth-child(n+3),.v6-row>*:nth-child(n+3){display:none!important}.today-row.head,.mission-row.head,.v6-row.head{display:none!important}.today-score,.mission-score,.v6-score{width:44px!important;height:44px!important}.today-name b,.mission-name b,.v6-name b{font-size:11px!important}.today-name span,.mission-name span,.v6-name span{font-size:9px!important}
  .today-hero,.sales-hero,.v6-hero{gap:8px!important}.today-hero-main,.sales-card,.v6-card{padding:15px!important}.today-hero-main h2,.sales-card h2,.v6-card h2{font-size:21px!important}.today-hero-main p,.sales-card p,.v6-card p{font-size:10px!important;line-height:1.5}.today-metric,.sales-kpi,.v6-kpi{padding:11px!important}.today-metric strong,.sales-kpi strong,.v6-kpi strong{font-size:20px!important}

  /* Week: horizontal date rail + compact KPI rail */
  .v8-week-page{padding-bottom:0!important}.v8-week-kpis{display:flex!important;overflow-x:auto!important;scroll-snap-type:x proximity;border:0!important;background:transparent!important;gap:7px!important;scrollbar-width:none}.v8-week-kpis::-webkit-scrollbar{display:none}.v8-kpi{flex:0 0 138px!important;scroll-snap-align:start;border:1px solid var(--line)!important;border-radius:12px!important;background:#fff!important;padding:11px!important}.v8-kpi span{font-size:8.5px!important}.v8-kpi strong{font-size:20px!important}.v8-days{display:flex!important;overflow-x:auto!important;gap:8px!important;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:3px}.v8-days::-webkit-scrollbar{display:none}.v8-day{flex:0 0 145px!important;scroll-snap-align:start;padding:11px!important}.v8-day .dow{font-size:8.5px!important}.v8-day b{font-size:11px!important}.v8-focus{grid-template-columns:1fr!important}.v8-card h2{font-size:18px!important}.v8-focus-copy,.v8-script{font-size:10px!important}.v8-question{font-size:9.5px!important;padding:9px!important}.v8-prospect{grid-template-columns:minmax(0,1fr) auto!important;gap:8px!important;padding:12px 0!important}.v8-prospect b{font-size:11px!important}.v8-prospect span{font-size:9px!important}.v8-prospect-stat{display:none!important}.v8-actions{gap:6px!important}.v8-actions .btn,.v8-prospect .btn{min-height:38px!important;padding:8px 9px!important;font-size:9.5px!important}

  /* Kanban uses one near-full-width column per swipe */
  .pipeline{grid-template-columns:repeat(6,calc(100vw - 36px))!important;gap:10px!important;scroll-snap-type:x mandatory!important;overflow-x:auto!important;padding-bottom:8px!important}.pipeline .column{scroll-snap-align:start;min-height:calc(100dvh - 170px)!important;border-radius:14px!important}.deal{padding:11px!important}.deal b{font-size:10px!important}.deal span{font-size:9px!important}

  /* Reports / competition stay useful without huge vertical walls */
  .reports-kpis{grid-template-columns:1fr 1fr!important;gap:8px!important}.reports-kpi{padding:13px!important}.reports-kpi span{font-size:9px!important}.reports-kpi strong{font-size:23px!important}.reports-head h3{font-size:15px!important}.reports-head p{font-size:10px!important}.sector-wrap{margin-left:-4px;margin-right:-4px;padding-bottom:5px;-webkit-overflow-scrolling:touch}.competition-kpis{display:flex!important;overflow-x:auto!important;gap:7px!important;scrollbar-width:none}.competition-kpis::-webkit-scrollbar{display:none}.competition-kpi{flex:0 0 130px!important}.competition-kpis .competition-kpi:last-child{grid-column:auto!important}.competition-row{padding:12px!important}.competition-row h3{font-size:11px!important}.competition-row p{font-size:9.5px!important}.competition-chip{font-size:8px!important}.competition-toolbar{grid-template-columns:1fr!important}.competition-toolbar input{grid-column:auto!important}.competition-vs{grid-template-columns:1fr!important}

  /* Full-screen transactional modals on phones */
  .sales-modal,.v7-modal,.route-modal,.competition-modal,.v82-proposal-modal{padding:0!important;align-items:stretch!important}
  .sales-modal-card,.v7-modal-card,.route-card,.competition-modal-card,.v82-proposal-card{width:100%!important;height:100dvh!important;max-height:100dvh!important;border:0!important;border-radius:0!important;box-shadow:none!important}
  .sales-modal-card,.v7-modal-card,.route-card,.competition-modal-card,.v82-proposal-card{padding-bottom:env(safe-area-inset-bottom)!important}
  .sales-modal-head,.v7-modal-head,.route-head,.competition-modal-head,.v82-proposal-head{position:sticky!important;top:0!important;z-index:5!important;background:#fff!important;padding-top:max(13px,env(safe-area-inset-top))!important;backdrop-filter:none!important}
  .sales-form-grid,.v7-form-grid,.competition-form-grid{grid-template-columns:1fr!important}.route-controls,.route-filter-controls{grid-template-columns:1fr!important}.route-summary{grid-template-columns:1fr 1fr!important}.route-row{grid-template-columns:30px minmax(0,1fr)!important}.route-row>*:nth-child(n+3){display:none!important}.v82-process{grid-template-columns:1fr!important}.v82-proposal-body{padding-bottom:calc(22px + env(safe-area-inset-bottom))!important}
  .google-modal{padding:max(14px,env(safe-area-inset-top)) 12px calc(20px + env(safe-area-inset-bottom))!important}.google-result-top{gap:9px}.google-result-grid{grid-template-columns:1fr 1fr!important}

  /* COYO demo: keep the client-facing screen clean and readable */
  .coyo-demo-top{backdrop-filter:none!important;flex-wrap:wrap!important}.coyo-demo-brand{min-width:0}.coyo-demo-top-actions{width:100%;display:grid!important;grid-template-columns:1fr 1fr 1fr!important}.coyo-demo-top-actions .btn{min-width:0!important;padding:8px 6px!important;font-size:9px!important}.coyo-demo-main{padding:12px!important}.coyo-demo-phone{border-width:6px!important;border-radius:30px!important;min-height:0!important;width:100%!important;max-width:360px!important}.coyo-demo-screen{padding:14px 13px 18px!important}.coyo-demo-hero h3{font-size:23px!important}.coyo-demo-side p{font-size:10px!important}.coyo-demo-bullet{font-size:9px!important}.coyo-demo-disclaimer{font-size:8.5px!important}

  /* Rendering/performance */
  .mobile-nav,.location-card,.map-kpis .kpi,.mobile-sheet{backdrop-filter:none!important}
  .competition-row,.deal,.v8-card,.reports-panel,.today-panel,.sales-panel{content-visibility:auto;contain-intrinsic-size:1px 240px}
}
@media(max-width:540px){
  .today-hero,.sales-hero,.v6-hero{grid-template-columns:1fr 1fr!important}.today-hero-main,.sales-card,.v6-card{grid-column:1/-1!important}
  .sales-kpi:nth-child(n+4),.v6-kpi:nth-child(n+4){display:none!important}
  .v6-segments{grid-template-columns:1fr 1fr!important}.v6-seg{padding:10px!important}.v6-seg strong{font-size:16px!important}
  .v6-report-top,.sales-report-grid,.v7-report-grid{grid-template-columns:1fr 1fr!important}.v6-research{grid-template-columns:1fr 1fr!important}
  .reports-kpis{grid-template-columns:1fr 1fr!important}.coverage-row{grid-template-columns:1fr 38px!important}.coverage-row .coverage-track{grid-column:1/-1}.dist-row{grid-template-columns:minmax(90px,1fr) 38px minmax(70px,.8fr) 30px!important}
  .mobile-sheet{max-height:80dvh!important}.mobile-sheet .ins-actions{grid-template-columns:1fr!important}
  .pfit-grid{grid-template-columns:1fr 1fr!important}.v7-revenue-strip{grid-template-columns:1fr 1fr!important}.v7-rental-kpis{grid-template-columns:1fr 1fr!important}
  .competition-form-actions{display:grid!important;grid-template-columns:1fr 1fr!important}.competition-danger{margin-right:0!important;grid-column:1/-1}
  .google-result-top{flex-direction:column!important}.google-result-top .btn{width:100%}
}
@media(max-width:380px){.mobile-nav button{font-size:8px!important}.v87-ico{font-size:15px}.v87-more-grid{grid-template-columns:1fr 1fr}.reports-kpis{grid-template-columns:1fr!important}.google-result-grid{grid-template-columns:1fr!important}.score-grid{grid-template-columns:1fr 1fr!important}.score-grid .score-card:last-child{grid-column:1/-1}}
`;
const JS=String.raw`
(function(){
const primary=[['radar','◎','Mapa'],['week','▦','Semana'],['leads','◫','Leads'],['pipeline','↗','Pipeline']];
const secondary=[['today','⌂','Comando'],['rentals','$','Rentas'],['verify','✓','Verificar'],['reports','▤','Reportes'],['competition','◇','Competencia']];
let currentModule='radar';
function navMarkup(){return primary.map(function(x){return '<button type="button" data-v87-module="'+x[0]+'"><span class="v87-ico">'+x[1]+'</span><span class="v87-nav-label">'+x[2]+'</span></button>'}).join('')+'<button type="button" data-v87-more><span class="v87-ico">•••</span><span class="v87-nav-label">Más</span></button>'}
function moreMarkup(){return '<div class="v87-more-head"><div><b>Más herramientas</b><span>Radar completo, sin apretar el dock</span></div><button type="button" class="v87-sheet-close" data-v87-more-close>×</button></div><div class="v87-more-grid">'+secondary.map(function(x){return '<button type="button" data-v87-module="'+x[0]+'"><i>'+x[1]+'</i><span>'+x[2]+'</span></button>'}).join('')+'</div>'}
function buildNav(){const nav=document.querySelector('.mobile-nav');if(!nav||nav.dataset.v87==='1')return;nav.dataset.v87='1';nav.innerHTML=navMarkup();const more=document.createElement('section');more.id='v87More';more.className='v87-more';more.innerHTML=moreMarkup();const back=document.createElement('div');back.id='v87MoreBackdrop';back.className='v87-more-backdrop';document.body.appendChild(back);document.body.appendChild(more);nav.addEventListener('click',onNav);more.addEventListener('click',onNav);back.addEventListener('click',closeMore);syncActive()}
function onNav(e){const mod=e.target.closest?.('[data-v87-module]');if(mod){closeMore();if(typeof setModule==='function')setModule(mod.dataset.v87Module);return}if(e.target.closest?.('[data-v87-more]')){toggleMore();return}if(e.target.closest?.('[data-v87-more-close]'))closeMore()}
function toggleMore(){document.getElementById('v87More')?.classList.toggle('on');document.getElementById('v87MoreBackdrop')?.classList.toggle('on')}
function closeMore(){document.getElementById('v87More')?.classList.remove('on');document.getElementById('v87MoreBackdrop')?.classList.remove('on')}
function syncActive(v){if(v)currentModule=v;const nav=document.querySelector('.mobile-nav');if(!nav)return;nav.querySelectorAll('[data-v87-module]').forEach(function(b){b.classList.toggle('on',b.dataset.v87Module===currentModule)});const inMore=secondary.some(function(x){return x[0]===currentModule});nav.querySelector('[data-v87-more]')?.classList.toggle('on',inMore);document.querySelectorAll('#v87More [data-v87-module]').forEach(function(b){b.classList.toggle('on',b.dataset.v87Module===currentModule)})}
function closeSheet(){const s=document.getElementById('mobileSheet');if(s){s.classList.add('hide');s.style.transform='';s.style.transition=''}}
function decorateSheet(){const s=document.getElementById('mobileSheet');if(!s||s.classList.contains('hide'))return;if(!s.querySelector('[data-v87-sheet-close]')){const bar=document.createElement('div');bar.className='v87-sheet-bar';bar.innerHTML='<button class="v87-sheet-close" type="button" data-v87-sheet-close aria-label="Cerrar detalle">×</button>';s.prepend(bar)}if(s.dataset.v87Swipe!=='1'){s.dataset.v87Swipe='1';let start=0,last=0,drag=false;s.addEventListener('touchstart',function(e){if(s.scrollTop>2||!e.touches[0])return;start=last=e.touches[0].clientY;drag=true;s.style.transition='none'},{passive:true});s.addEventListener('touchmove',function(e){if(!drag||!e.touches[0])return;last=e.touches[0].clientY;const dy=Math.max(0,last-start);if(dy)s.style.transform='translateY('+Math.min(dy,170)+'px)'},{passive:true});s.addEventListener('touchend',function(){if(!drag)return;const dy=Math.max(0,last-start);drag=false;s.style.transition='transform .18s ease';if(dy>85)closeSheet();else{s.style.transform='';setTimeout(function(){s.style.transition=''},190)}})}}
function bindClose(){document.addEventListener('click',function(e){if(e.target.closest?.('[data-v87-sheet-close]'))closeSheet()})}
try{if(typeof setModule==='function'){const baseSet=setModule;setModule=function(v){currentModule=v;closeSheet();closeMore();const r=baseSet.apply(this,arguments);syncActive(v);requestAnimationFrame(function(){const view=document.getElementById(v+'View');view?.querySelector('.module-page')?.scrollTo({top:0,behavior:'instant'})});return r}}}catch{}
try{if(typeof renderInspector==='function'){const baseRender=renderInspector;renderInspector=function(){const r=baseRender.apply(this,arguments);setTimeout(decorateSheet,0);return r}}}catch{}
function onResize(){if(innerWidth>900){closeMore();const s=document.getElementById('mobileSheet');if(s)s.style.transform=''}setTimeout(function(){try{map?.invalidateSize()}catch{}},80)}
addEventListener('resize',onResize,{passive:true});bindClose();buildNav();setTimeout(function(){buildNav();decorateSheet()},350);
window.radarMobileFieldV87={version:'8.7',closeSheet:closeSheet,syncActive:syncActive};
})();
`;
html=html.replace('</style>',CSS+'\n</style>');
html=html.replace('</body>','<script>'+JS+'</script>\n</body>');
html=html.replace('Weekly Prospecting OS V8.6</title>','Weekly Prospecting OS V8.7</title>');
return html;
};
