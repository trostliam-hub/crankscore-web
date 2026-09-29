/* Aufraeumen (2026-09-29): Am 29.09. lag fuer ein paar Stunden die App auf
   crankscore.de. Browser, die sie damals geoeffnet haben, haben ihren Service
   Worker noch und fragen hier nach einer neuen Version davon. Diese Datei ist
   die Antwort: Sie loescht den alten Cache, meldet sich ab und laedt offene
   Fenster neu -- danach sehen alle den Teaser. Nicht loeschen, solange alte
   Besucher vorbeikommen koennten. */
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys()
      .then(function(namen){ return Promise.all(namen.map(function(n){ return caches.delete(n); })); })
      .then(function(){ return self.registration.unregister(); })
      .then(function(){ return self.clients.matchAll({type:"window"}); })
      .then(function(fenster){ fenster.forEach(function(f){ f.navigate(f.url); }); })
  );
});
