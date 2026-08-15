window.patchRadarRouteExportV71=function(html){
const CSS=`
.route-ai-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px;padding-top:10px;border-top:1px solid var(--line)}.route-ai-btn{background:#172033!important;color:#fff!important;border-color:#172033!important}.route-ai-btn:hover{background:#0d1422!important}.route-ai-note{display:flex;align-items:flex-start;gap:8px;margin-top:8px;padding:9px 10px;border-radius:10px;background:#f7f9fc;border:1px solid var(--line);font-size:8px;color:var(--muted);line-height:1.5}.route-ai-note b{color:var(--text)}
`;
const JS=String.raw`
(function(){
function routeIdsV71(){return [...document.querySelectorAll('#routePlan .route-open[data-id]')].map(x=>String(x.dataset.id||'')).filter(Boolean)}
function routeBusinessesV71(){const ids=routeIdsV71();return ids.map(id=>(Array.isArray(data)?data:[]).find(b=>String(b.denueId)===id)).filter(Boolean)}
function v71Text(v,fallback='No disponible'){const s=String(v??'').trim();return s||fallback}
function v71List(v){return Array.isArray(v)?v.filter(Boolean):[]}
function v71ResearchLabel(b){if(b.researchStatus==='reviewed'&&Number(b.researchConfidence||0)>=70&&b.operationalStatus==='operational'&&(b.phone||b.email))return'Listo para contactar';if(b.researchStatus==='reviewed')return'Investigado';if(b.researchStatus==='needs_review')return'Requiere revisión';return'Sin investigación enriquecida'}
function v71Offer(b){try{const p=typeof salesProfile==='function'?salesProfile(b):null;if(!p)return null;const pr=p.pricing||{};return{priority:Math.round(Number(p.priority)||0),problem:p.top?.problem||'No definido',solution:p.top?.name||'Solución digital',model:p.commercialModel||'sale',fit:Number(p.recurringFit)||0,sale:Number(pr.sale??p.top?.ticket??0)||0,setup:Number(pr.setup)||0,monthly:Number(pr.monthly)||0,term:Number(pr.term)||0,contract:Number(pr.contract)||0,probability:Number(p.probability)||0}}catch{return null}}
function v71Money(n){try{return typeof money==='function'?money(Number(n)||0):'$'+Number(n||0).toLocaleString('es-MX')}catch{return'$'+Number(n||0).toLocaleString('es-MX')}}
function v71Block(b,i){const o=v71Offer(b),src=v71List(b.researchSources).filter(x=>/^https?:\/\//i.test(String(x))).slice(0,8);const social=[b.facebookUrl&&'Facebook: '+b.facebookUrl,b.instagramUrl&&'Instagram: '+b.instagramUrl,b.tiktokUrl&&'TikTok: '+b.tiktokUrl].filter(Boolean);return [
'============================================================',
'PARADA '+(i+1)+' · '+v71Text(b.name,'Negocio'),
'============================================================',
'',
'DATOS DEL NEGOCIO',
'- DENUE ID: '+v71Text(b.denueId),
'- Ciudad: '+v71Text(b.city),
'- Giro Radar: '+v71Text(b.sector),
'- Actividad DENUE: '+v71Text(b.activity),
'- Dirección: '+v71Text(b.address),
'- Teléfono: '+v71Text(b.phone),
'- Email: '+v71Text(b.email),
'- Sitio web: '+v71Text(b.web),
'- Web DENUE original: '+v71Text(b.denueWeb),
'- Redes: '+(social.length?social.join(' | '):'No confirmadas'),
'- Estado operativo: '+v71Text(b.operationalStatus,'unknown'),
'- Presencia web: '+v71Text(b.webPresenceStatus,'unknown'),
'- Presencia social: '+v71Text(b.socialPresenceStatus,'unknown'),
'- Google/Maps: '+v71Text(b.googlePresenceStatus,'unknown'),
'- Google Maps URL: '+v71Text(b.googleMapsUrl),
'',
'INVESTIGACIÓN DE RADAR',
'- Estado: '+v71ResearchLabel(b),
'- Confianza de investigación: '+(b.researchConfidence==null?'No disponible':Math.round(Number(b.researchConfidence))+'%'),
'- Fecha revisada: '+(b.researchCheckedAt?new Date(b.researchCheckedAt).toLocaleDateString('es-MX'):'No disponible'),
'- Notas: '+v71Text(b.researchNotes,'Sin notas de investigación'),
'- Fuentes públicas: '+(src.length?src.join(' | '):'No guardadas'),
'',
'SCORES Y OPORTUNIDAD',
'- Opportunity Score: '+Math.round(Number(b.opportunityScore)||0)+'/100',
'- Confidence Score: '+Math.round(Number(b.confidenceScore)||0)+'/100',
'- Presence Score: '+Math.round(Number(b.presenceScore)||0)+'/100',
...(o?[
'- Prioridad comercial: '+o.priority+'/100',
'- Problema comercial sugerido: '+o.problem,
'- Solución sugerida: '+o.solution,
'- Modelo recomendado por Radar: '+(o.model==='rent'?'Renta mensual':'Venta única'),
'- Fit para renta: '+o.fit+'/100',
'- Venta sugerida: '+v71Money(o.sale),
'- Renta sugerida: '+v71Money(o.setup)+' setup + '+v71Money(o.monthly)+'/mes por '+o.term+' meses',
'- Valor contrato de renta: '+v71Money(o.contract),
'- Probabilidad inicial heurística: '+o.probability+'%'
]:[]),
'',
'CRM',
'- Etapa: '+v71Text(b.stage,'Nuevo'),
'- Próxima acción: '+v71Text(b.nextAction,'Sin definir'),
'- Seguimiento: '+(b.followUpAt?new Date(b.followUpAt).toLocaleString('es-MX'):'Sin programar'),
'- Notas CRM: '+v71Text(b.note,'Sin notas'),
''
].join('\n')}
function v71Dossier(){const rows=routeBusinessesV71();if(!rows.length)return'';const now=new Date().toLocaleString('es-MX');return [
'RADAR LOCAL · DOSSIER DE RUTA PARA CHATGPT',
'Generado: '+now,
'Prospectos: '+rows.length,
'',
'OBJETIVO',
'Quiero preparar propuestas comerciales personalizadas para visitar estos negocios. Usa los datos siguientes como punto de partida, pero no trates señales heurísticas de Radar como hechos confirmados.',
'',
'INSTRUCCIONES PARA CHATGPT',
'1. Investiga cada negocio con fuentes públicas actuales antes de redactar la propuesta cuando sea necesario.',
'2. Distingue claramente datos confirmados, probables y no verificados. No inventes que carece de web/redes/software si no existe evidencia.',
'3. Detecta problemas u oportunidades comerciales plausibles basados en evidencia pública y en el giro.',
'4. Para cada negocio recomienda qué ofrecer primero y por qué.',
'5. Compara una opción de VENTA ÚNICA contra una opción de RENTA MENSUAL; ajusta la propuesta si la solución recurrente no tiene sentido.',
'6. Genera para cada prospecto: diagnóstico breve, propuesta concreta, alcance, precio recomendado, alternativa de renta, argumento de valor, mensaje inicial de WhatsApp y guion corto para visita presencial.',
'7. Prioriza soluciones que podamos entregar de forma realista y evita promesas que los datos no sostengan.',
'8. Al final ordénalos por probabilidad de conseguir una reunión/venta y dime con cuáles empezaría.',
'',
...rows.map(v71Block)
].join('\n')}
async function v71Copy(){const t=v71Dossier();if(!t){toast('Genera una ruta primero');return}try{await navigator.clipboard.writeText(t);toast('Dossier para ChatGPT copiado')}catch{toast('No se pudo copiar el dossier')}}
function v71Download(){const t=v71Dossier();if(!t){toast('Genera una ruta primero');return}const blob=new Blob([t],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='radar-ruta-chatgpt-'+new Date().toISOString().slice(0,10)+'.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),500);toast('Dossier descargado')}
function v71Contacts(){const rows=routeBusinessesV71();if(!rows.length){toast('Genera una ruta primero');return}const t=rows.map((b,i)=>[(i+1)+'. '+b.name,b.phone?'Tel: '+b.phone:null,b.email?'Email: '+b.email:null,b.web?'Web: '+b.web:null,b.facebookUrl?'FB: '+b.facebookUrl:null,b.instagramUrl?'IG: '+b.instagramUrl:null].filter(Boolean).join(' | ')).join('\n');navigator.clipboard?.writeText(t).then(()=>toast('Contactos de la ruta copiados')).catch(()=>toast('No se pudo copiar'))}
function v71Inject(){const plan=document.getElementById('routePlan');if(!plan)return;const body=plan.closest('.route-body');if(!body||body.querySelector('.route-ai-actions'))return;const note=body.querySelector('.route-note');const wrap=document.createElement('div');wrap.innerHTML='<div class="route-ai-actions"><button id="routeChatGPT" class="btn route-ai-btn" type="button">✦ Copiar para ChatGPT</button><button id="routeDossierDownload" class="btn btn-secondary" type="button">Descargar dossier .txt</button><button id="routeContactsCopy" class="btn btn-secondary" type="button">Copiar contactos</button></div><div class="route-ai-note"><span>✦</span><div><b>Dossier comercial.</b> Exporta sólo las paradas de esta ruta con contacto, páginas, investigación, fuentes, scores y oferta Venta/Renta. No envía datos automáticamente a ChatGPT.</div></div>';const frag=document.createDocumentFragment();while(wrap.firstChild)frag.appendChild(wrap.firstChild);if(note)body.insertBefore(frag,note);else body.appendChild(frag);document.getElementById('routeChatGPT')?.addEventListener('click',v71Copy);document.getElementById('routeDossierDownload')?.addEventListener('click',v71Download);document.getElementById('routeContactsCopy')?.addEventListener('click',v71Contacts)}
const oldOpen=window.openRoutePlanner;if(typeof oldOpen==='function')window.openRoutePlanner=function(){const r=oldOpen.apply(this,arguments);setTimeout(v71Inject,0);return r};
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#routeNavBtn,.route-planner-quick'))setTimeout(v71Inject,20)});
setTimeout(v71Inject,250);
window.radarRouteDossierV71=v71Dossier;
})();
`;
html=html.replace('</style>',CSS+'</style>');
html=html.replace('</body>','<script>'+JS+'</script></body>');
html=html.replaceAll('Sales Intelligence V7</title>','Sales Intelligence V7.1</title>');
return html;
};
