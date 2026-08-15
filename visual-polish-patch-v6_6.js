window.patchRadarVisualV66=function(html){
const CSS=`
/* Radar Local V6.6 — visual polish
   Principles: stronger hierarchy, fewer competing surfaces, consistent tokens,
   readable density, clear interaction states, restrained B2B visual language. */
:root{
  --bg:#f4f6f9;--surface:#ffffff;--surface2:#f8fafc;--line:#e6eaf0;--line2:#d8dee8;
  --text:#101828;--muted:#667085;--muted2:#98a2b3;--blue:#2563eb;--blue2:#eff6ff;
  --green:#168653;--green2:#ecf8f2;--amber:#c97a08;--amber2:#fff7e8;--red:#d84a4a;--red2:#fff1f1;
  --shadow:0 1px 2px rgba(16,24,40,.035),0 10px 28px rgba(16,24,40,.055);--radius:11px;
}
html{background:var(--bg)}
body{font-size:14px;line-height:1.46;letter-spacing:-.004em;background:var(--bg);color:var(--text);font-feature-settings:"tnum" 1,"cv02" 1,"cv03" 1,"cv04" 1}
button,input,select,textarea{font:inherit;color:inherit}
button{transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,transform .15s ease}
button:active{transform:translateY(1px)}
button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,a:focus-visible{outline:3px solid rgba(37,99,235,.16);outline-offset:2px}
.app{grid-template-columns:248px minmax(0,1fr) 392px}
.sidebar{padding:16px 12px;background:#fbfcfe;border-right:1px solid var(--line)}
.inspector{padding:20px;background:#fff;border-left:1px solid var(--line)}
.brand{gap:10px;margin:0 4px 17px;padding-bottom:14px;border-bottom:1px solid #edf0f4}
.logo{width:36px;height:36px;border-radius:9px;box-shadow:none;font-size:13px}
.brand b{font-size:15px;letter-spacing:-.025em}
.brand span{font-size:9px;letter-spacing:.015em;color:#7b8798;margin-top:2px}
.brand span:after{content:" · online";color:var(--green);font-weight:800}
.searchbox{margin-bottom:13px}
.searchbox input{height:40px;border-radius:9px;background:#fff;border-color:#e3e8ef;padding-left:35px;font-size:11.5px;box-shadow:0 1px 1px rgba(16,24,40,.02)}
.searchbox .mag{top:10px;color:#8793a4}.searchbox .kbd{top:9px;font-size:8px;background:#f8fafc}
.nav{gap:2px}
.navbtn{min-height:39px;border-radius:8px;padding:9px 10px;font-size:11px;font-weight:700;gap:9px;color:#526174;position:relative}
.navbtn:hover{background:#f2f5f9;color:#344054}
.navbtn.on{background:#eef4ff;color:#1f5ed1}
.navbtn.on:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--blue)}
.navicon{width:17px;opacity:.78}
.filter-card{margin-top:14px;padding:11px;border-radius:9px;border:0;background:#f3f6fa;box-shadow:inset 0 0 0 1px #ebeff4}
.filter-title{font-size:10px;margin-bottom:8px;color:#344054}
.grid2{gap:7px}.field{margin-top:8px}.label{font-size:9.5px;margin-bottom:5px;color:#667085}
.control,.textarea{border-radius:8px;border-color:#dde3eb;background:#fff;padding:9px 10px;font-size:10.5px;box-shadow:0 1px 1px rgba(16,24,40,.025)}
.control:focus,.textarea:focus{border-color:#98b7ed;box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.textarea{min-height:96px}
.pills{gap:5px;margin-top:8px}.filter-pill{border-radius:7px;padding:6px 8px;font-size:9px;background:#fff}
.filter-pill.on{background:#eaf2ff;border-color:#b9cff3;color:#205fcf}
.side-actions{gap:6px;margin-top:9px}
.btn{min-height:34px;border-radius:8px;padding:8px 11px;font-size:9.5px;font-weight:800;letter-spacing:-.005em}
.btn-primary{background:#2563eb;box-shadow:0 1px 2px rgba(37,99,235,.22)}.btn-primary:hover{background:#1f57cf}
.btn-secondary{background:#fff;border:1px solid #dce2ea;color:#3f4e62}.btn-secondary:hover{border-color:#c9d1dc;background:#fafbfc}
.btn-soft{background:#eff6ff;color:#245fc5;border-color:#cfe0fb}.btn-soft:hover{background:#e5efff}
.helper{font-size:9px;line-height:1.55;color:#8a96a6}.source-card{margin-top:12px;border-radius:9px;background:#fff;padding:9px;border-color:#e5e9ef}.source-card b{font-size:9.5px}.source-row{font-size:8.5px}
.main{background:#f5f7fa}
.location-card,.legend,.kpi,.iconbtn{box-shadow:0 2px 8px rgba(16,24,40,.06),0 1px 2px rgba(16,24,40,.04)}
.location-card{border-radius:10px;border-color:#e3e7ed;padding:10px 12px;min-width:245px;background:rgba(255,255,255,.97)}
.location-card b{font-size:12px}.location-card span{font-size:9px;margin-top:3px}
.iconbtn{width:38px;height:38px;border-radius:9px;border-color:#e2e7ed;color:#536274}
.legend{border-radius:9px;padding:9px 10px;font-size:8.5px;border-color:#e4e8ee}.legend b{font-size:9.5px}.legend-row{font-size:8.5px}
.cluster-label{min-width:34px;height:34px;font-size:10px;border-width:2px;box-shadow:0 3px 10px rgba(16,24,40,.12)}
.map-kpis{gap:6px}.kpi{border-radius:9px;padding:10px 11px;border-color:#e4e8ee;background:rgba(255,255,255,.97)}.kpi b{font-size:17px}.kpi span{font-size:8.5px;margin-top:3px}
.nearby{height:184px;padding:11px 14px;border-top-color:#e4e8ee}.section-head{margin-bottom:7px}.section-head h3{font-size:11.5px}.section-head span{font-size:8.5px}.table-wrap{height:137px}
.data-table{font-size:9.7px}.data-table th{padding:7px 8px;font-size:8.5px;letter-spacing:.015em;color:#7c8798;background:#fff}.data-table td{padding:8.5px 8px;border-bottom-color:#eef1f4}.data-table tbody tr:hover{background:#f6f9fd}
.badge{padding:4px 7px;font-size:8.5px;line-height:1.1;border-width:1px}.badge-gray{background:#f5f6f8;color:#667085;border-color:#eaecf0}
.module-page{padding:20px 22px}.page-head{margin-bottom:16px}.page-head h1{font-size:24px;letter-spacing:-.04em}.page-head p{font-size:10.5px;margin-top:5px;color:#7a8798}
.panel{border-radius:10px;border-color:#e5e9ef;box-shadow:0 1px 2px rgba(16,24,40,.025)}.panel-pad{padding:14px}
.big-table th,.big-table td{padding:10px 11px;font-size:9.8px}.big-table th{font-size:8.7px;color:#7d8999;letter-spacing:.015em}.big-table tbody tr:hover{background:#f7f9fc}
.pipeline{gap:10px}.column{border-radius:10px;padding:8px;background:#f5f7fa;border-color:#e5e9ef}.column-head{font-size:10px;padding:4px 4px 9px}.deal{border-radius:8px;padding:10px;border-color:#e4e8ed;box-shadow:0 1px 1px rgba(16,24,40,.02)}.deal:hover{border-color:#b7c7dd;background:#fff}.deal b{font-size:9.5px}.deal span{font-size:8.5px}
.verify-grid{gap:8px}.verify-card{border-radius:10px;padding:13px;border-color:#e5e9ef;box-shadow:none}.verify-card h3{font-size:10px}.verify-card .num{font-size:27px;margin:4px 0}.verify-card p{font-size:8.8px;line-height:1.45}.queue-row{padding:10px 1px}.queue-row b{font-size:9.5px}.queue-row span{font-size:8.5px;margin-top:2px;display:block}
.report-grid{gap:9px}.report-card{border-radius:10px;padding:14px;border-color:#e5e9ef;box-shadow:none}.report-card h3{font-size:10px;color:#475467}.report-card .metric{font-size:29px}.report-card p{font-size:8.8px;line-height:1.5}.barline{font-size:8.8px}
.inspector-head{gap:12px}.biz-title{gap:11px}.biz-icon{width:40px;height:40px;border-radius:9px;background:#f5f7fa;border-color:#e3e8ef;font-size:16px}.biz-title h2{font-size:17px;line-height:1.2;margin-top:0}.biz-title p{font-size:9.5px;margin-top:3px}.favorite{width:34px;height:34px;border-radius:8px}
.ins-tabs{gap:5px;margin:16px 0 15px;padding:3px;background:#f5f7fa;border:1px solid #ebeff4;border-radius:9px;overflow:visible}
.ins-tab{flex:1;border-radius:6px;padding:7px 6px;font-size:8.8px;border-bottom:0;color:#697789}.ins-tab:hover{background:#fff;color:#344054}.ins-tab.on{color:#205fcf;background:#fff;border-bottom:0;box-shadow:0 1px 2px rgba(16,24,40,.06)}
.score-grid{gap:6px}.score-card{border:0;border-radius:9px;padding:10px;background:#f6f8fb}.score-card span{font-size:8.5px}.score-card b{font-size:23px;margin-top:1px}.meter{height:3px;margin-top:6px;background:#e8edf3}
.facts{margin-top:11px;border-radius:9px;border-color:#e6eaf0}.fact{grid-template-columns:118px minmax(0,1fr);padding:9px 10px;border-bottom-color:#edf0f3}.fact span{font-size:9px}.fact b{font-size:9.5px;font-weight:700;color:#344054}
.recommend{margin-top:14px}.recommend h3{font-size:10.5px;margin-bottom:8px}.service-grid{grid-template-columns:1fr;gap:6px}.service{display:grid;grid-template-columns:32px minmax(0,1fr) auto;grid-template-areas:"icon title price" "icon desc price";column-gap:9px;row-gap:2px;align-items:center;border-radius:9px;padding:9px 10px;border-color:#e5e9ef;background:#fff}.service .sicon{grid-area:icon;width:30px;height:30px;border-radius:8px;margin:0}.service b{grid-area:title;font-size:9.5px}.service p{grid-area:desc;font-size:8.4px;margin:0;color:#7a8798;line-height:1.35}.service strong{grid-area:price;font-size:9px;white-space:nowrap;color:#344054}
.subcard{border-radius:10px!important;border-color:#e5e9ef!important;box-shadow:none!important}.subcard h3{font-size:10.5px!important}
.ins-actions{gap:6px;margin-top:11px}
.timeline-item b{font-size:9.5px}.timeline-item span{font-size:8.5px}
/* V6 command center — reduce card soup */
.v6-command{gap:12px}.v6-hero{gap:8px}.v6-card,.v6-kpi,.v6-panel{border-radius:11px;box-shadow:none;border-color:#e4e8ee}.v6-card{padding:17px}.v6-card .ey{font-size:8.5px;letter-spacing:.08em}.v6-card h2{font-size:24px;margin:5px 0 7px}.v6-card p{font-size:10.5px;line-height:1.55;color:#6c7889}.v6-kpi{padding:13px}.v6-kpi span{font-size:8.5px}.v6-kpi strong{font-size:22px;margin-top:3px}.v6-kpi small{font-size:8px}.v6-progress{height:5px;margin-top:8px}
.v6-segments{gap:3px;padding:4px;background:#fff;border:1px solid #e5e9ef;border-radius:11px;box-shadow:0 1px 2px rgba(16,24,40,.025)}.v6-seg{border:0!important;border-radius:8px;padding:9px 10px;background:transparent!important}.v6-seg:hover{background:#f5f7fa!important}.v6-seg.on{background:#eef4ff!important;box-shadow:inset 0 0 0 1px #d4e1f7}.v6-seg span{font-size:7.8px}.v6-seg strong{font-size:17px}.v6-seg small{font-size:7.7px;line-height:1.35}.research-ready-seg{background:transparent!important}.research-ready-seg.on{background:#edf8f2!important;box-shadow:inset 0 0 0 1px #cee9da}
.v6-panel{padding:13px}.v6-head{margin-bottom:9px}.v6-head h3{font-size:11px}.v6-head p{font-size:8.8px}.v6-row{grid-template-columns:52px minmax(210px,1.35fr) minmax(145px,.85fr) minmax(125px,.85fr) 90px 82px auto;gap:9px;padding:10px 8px}.v6-row.head{font-size:7.8px;color:#8792a2;letter-spacing:.02em}.v6-row:not(.head):hover{background:#f7f9fc}.v6-score{width:42px;height:42px;border-radius:9px;background:#edf8f2}.v6-score b{font-size:15px}.v6-score span{font-size:6.3px}.v6-name b{font-size:9.8px}.v6-name span{font-size:8px}.v6-cell span{font-size:7.3px}.v6-cell strong{font-size:8.8px}.v6-problem,.v6-channel{font-size:7.5px;padding:4px 6px}.v6-learn{font-size:7.2px;margin-top:2px}.v6-intel{border-radius:9px;padding:10px;background:#f7faff;border-color:#dfe8f4}.v6-intel h3{font-size:9.5px}.v6-intel p{font-size:8.2px}.v6-intel .nba{font-size:8.8px}.v6-research{gap:5px}.v6-research button{border-radius:7px;padding:7px 6px;font-size:7.8px}.v6-touch{border-radius:8px;padding:8px}.v6-touch p{font-size:8.3px}.v6-report{border-radius:11px;padding:13px;border-color:#e4e8ee}.v6-report-kpi{border-radius:8px;padding:9px}.v6-report-kpi span{font-size:7.5px}.v6-report-kpi strong{font-size:17px}.v6-learn-panel{border-radius:9px}.v6-perf-row{font-size:7.8px}
/* Research readiness */
.research-card{margin-top:11px;border:0;border-left:3px solid #d4dce8;border-radius:8px;background:#f7f9fc;padding:11px 12px}.research-card:has(.research-status.ready){border-left-color:var(--green);background:#f5fbf7}.research-card:has(.research-status.review){border-left-color:var(--amber);background:#fffbf4}.research-head h3{font-size:10px}.research-head p{font-size:8.5px}.research-status{padding:4px 7px;font-size:7.8px}.research-status.ready,.research-status.reviewed,.research-status.review,.research-status.pending{border:0}.research-note{font-size:8.8px;line-height:1.5;color:#536174}.research-meta{font-size:8px}.research-source{border-radius:6px;padding:5px 7px;font-size:7.5px;background:#fff}.research-inline{font-size:6.5px}
/* Route planner */
.route-modal{background:rgba(16,24,40,.42);backdrop-filter:blur(3px)}.route-card{border-radius:14px;border-color:#e2e7ed;box-shadow:0 24px 70px rgba(16,24,40,.18)}.route-head{padding:15px 17px;border-bottom-color:#e9edf2}.route-head h2{font-size:17px}.route-head p{font-size:9px}.route-body{padding:14px 17px 17px}.route-control label{font-size:8.5px}.route-stat{border-radius:9px;padding:10px;background:#f8fafc;border-color:#e6eaf0}.route-stat span{font-size:7.5px}.route-stat strong{font-size:16px}.route-list{border-radius:9px;border-color:#e5e9ef}.route-row{padding:10px 9px}.route-num{border-radius:7px}.route-name b{font-size:9.5px}.route-name span,.route-cell span{font-size:7.8px}.route-cell b{font-size:8.5px}.route-note{font-size:8.5px}
/* Better scrollbars without dominating the UI */
.sidebar,.inspector,.module-page,.table-wrap,.route-card{scrollbar-width:thin;scrollbar-color:#cfd6df transparent}
.sidebar::-webkit-scrollbar,.inspector::-webkit-scrollbar,.module-page::-webkit-scrollbar,.table-wrap::-webkit-scrollbar,.route-card::-webkit-scrollbar{width:7px;height:7px}.sidebar::-webkit-scrollbar-thumb,.inspector::-webkit-scrollbar-thumb,.module-page::-webkit-scrollbar-thumb,.table-wrap::-webkit-scrollbar-thumb,.route-card::-webkit-scrollbar-thumb{background:#d1d7df;border-radius:999px;border:2px solid transparent;background-clip:padding-box}
@media(max-width:1280px){.app{grid-template-columns:228px minmax(0,1fr) 360px}.sidebar{padding-inline:10px}.inspector{padding:16px}.v6-row{grid-template-columns:48px minmax(180px,1.25fr) minmax(120px,.8fr) 96px 74px auto}}
@media(max-width:1040px){.app{grid-template-columns:218px minmax(0,1fr)}.inspector{position:fixed;right:10px;top:10px;bottom:10px;width:min(390px,calc(100vw - 32px));z-index:1800;border:1px solid #e1e6ed;border-radius:13px;box-shadow:0 20px 60px rgba(16,24,40,.2)}.map-kpis{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){body{font-size:13px}.app{display:block}.sidebar{display:none}.main{height:calc(100dvh - 62px)}.module-page{padding:14px 12px}.page-head{align-items:flex-start;flex-direction:column}.page-head h1{font-size:21px}.mobile-nav{height:62px!important;background:rgba(255,255,255,.97)!important;backdrop-filter:blur(12px);border-top:1px solid #e5e9ef!important}.mobile-nav button{min-height:46px;font-size:8.5px!important}.map-toolbar{top:10px;left:10px;right:10px}.location-card{min-width:0;max-width:calc(100vw - 110px)}.legend{display:none}.map-kpis{left:10px;right:10px;bottom:188px;grid-template-columns:repeat(2,1fr)}.map-kpis .kpi:nth-child(n+5){display:none}.nearby{height:178px;padding:10px}.data-table{font-size:9px}.inspector{display:none!important}.mobile-sheet{border-radius:16px 16px 0 0!important;box-shadow:0 -16px 40px rgba(16,24,40,.14)!important}.v6-hero{grid-template-columns:1fr 1fr}.v6-card{grid-column:1/-1;padding:14px}.v6-card h2{font-size:20px}.v6-card p{font-size:9.8px}.v6-kpi{padding:11px}.v6-kpi strong{font-size:19px}.v6-segments{grid-template-columns:1fr 1fr!important}.v6-seg{padding:9px}.v6-row{grid-template-columns:44px minmax(160px,1fr) 82px;padding:9px 4px}.v6-row>*:nth-child(n+4){display:none}.route-modal{padding:6px}.route-card{border-radius:12px;max-height:96vh}.route-head{padding:13px}.route-body{padding:12px}.route-summary{grid-template-columns:1fr 1fr}.btn{min-height:36px}.control{min-height:38px}}
@media(max-width:430px){.v6-hero{grid-template-columns:1fr}.v6-kpi{display:grid;grid-template-columns:1fr auto;align-items:center}.v6-kpi strong{grid-column:2;grid-row:1/3}.v6-kpi small,.v6-progress{grid-column:1/-1}.v6-segments{grid-template-columns:1fr!important}.map-kpis{grid-template-columns:1fr 1fr}.kpi b{font-size:15px}.service{grid-template-columns:30px minmax(0,1fr);grid-template-areas:"icon title" "icon desc" "price price"}.service strong{margin-top:4px;text-align:right}.research-head{gap:7px}.research-status{max-width:145px;text-align:center}.route-summary{grid-template-columns:1fr 1fr}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
html=html.replace('</style>',CSS+'</style>');
html=html.replace('Radar Local — Sales Intelligence V6.5','Radar Local — Sales Intelligence V6.6');
html=html.replace('Sales intelligence · V6</span>','Sales intelligence · V6.6</span>');
html=html.replace('Radar Local V6 · Centro de mando','Radar Local V6.6 · Centro de mando');
return html;
};
