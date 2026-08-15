window.patchRadarVisitRouteDefaultV721=function(html){
html=html.replace('<option value="recommended">Sólo recomendados</option><option value="go_now">Sólo IR AHORA</option>','<option value="go_now" selected>Sólo IR AHORA</option><option value="recommended">IR AHORA + llamar primero</option>');
html=html.replace("document.getElementById('routeProspectingFit')?.value||'recommended'","document.getElementById('routeProspectingFit')?.value||'go_now'");
html=html.replace('Por defecto la ruta excluye prospectos ESTRATÉGICOS y SALTAR. Así prioriza negocios accesibles para una visita o contacto frío.','Por defecto la ruta física incluye sólo IR AHORA. Usa LLAMAR PRIMERO para preparar contactos antes de desplazarte.');
html=html.replaceAll('Sales Intelligence V7.2</title>','Sales Intelligence V7.2.1</title>');
return html;
};
