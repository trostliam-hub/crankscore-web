/* Echte App-Aufnahmen als vergrösserbare Galerie. Ohne JavaScript bleiben die Bildlinks offen. */
(function(){
  "use strict";
  var dialog = document.getElementById("bild-galerie");
  if(!dialog || typeof dialog.showModal !== "function") return;

  var bild = document.getElementById("galerie-bild");
  var titel = document.getElementById("galerie-titel");
  var zaehler = document.getElementById("galerie-zaehler");
  var medien = dialog.querySelector(".galerie-medien");
  var schliessen = dialog.querySelector("[data-galerie-close]");
  var vorher = dialog.querySelector("[data-galerie-prev]");
  var nachher = dialog.querySelector("[data-galerie-next]");
  var zoom = dialog.querySelector("[data-galerie-zoom]");
  if(!bild || !titel || !zaehler || !medien || !schliessen || !vorher || !nachher || !zoom) return;

  var bilder = [], index = 0, ausloeser = null, anfrage = 0, gesperrt = null;
  var hintergrundStart = false;
  var fehler = document.createElement("div");
  var fehlerText = document.createElement("p");
  var original = document.createElement("a");
  fehler.className = "galerie-fehler";
  fehler.hidden = true;
  fehler.setAttribute("role", "alert");
  fehler.appendChild(fehlerText);
  fehler.appendChild(original);
  medien.appendChild(fehler);

  function text(k){ return window.CS && window.CS.t(k) || ""; }
  function alleBilder(){ return [].slice.call(document.querySelectorAll("a[data-galerie]")); }
  function aufnahme(a){ return a && a.querySelector("img[data-bild]"); }
  function quelle(a){
    var i = aufnahme(a);
    if(!i) return a.href;
    var s = i.currentSrc || i.src;
    /* Beim Sprachwechsel kann currentSrc bis zum nächsten Bild-Load noch die alte Sprache sein. */
    var sp = window.CS && window.CS.sprache;
    if(sp && i.src.indexOf("/" + sp + "/") !== -1 && s.indexOf("/" + sp + "/") === -1) s = i.src;
    return s || a.href;
  }
  function originalLink(a){
    try{
      var url = new URL(a.href, document.baseURI);
      return /^(https?:|file:)$/.test(url.protocol) ? url.href : quelle(a);
    }catch(e){ return quelle(a); }
  }
  function beschriftung(a){
    var k = a.getAttribute("data-galerie-titel");
    var i = aufnahme(a);
    return (k && text(k)) || (i && i.alt) || "";
  }
  function istZoom(){ return dialog.classList.contains("ist-zoom"); }
  function zoomText(){
    var k = istZoom() ? "gal.fit" : "gal.zoom";
    var t = text(k);
    zoom.setAttribute("aria-label", t);
    zoom.setAttribute("title", t);
    zoom.setAttribute("aria-pressed", String(istZoom()));
    var label = zoom.querySelector('[data-t="gal.zoom"], [data-t="gal.fit"], [data-galerie-label]');
    if(label){ label.setAttribute("data-t", k); label.textContent = t; }
  }
  function setzeZoom(wert){
    dialog.classList.toggle("ist-zoom", wert);
    medien.scrollTop = 0;
    medien.scrollLeft = 0;
    zoomText();
  }
  function texte(){
    var a = bilder[index];
    if(!a) return;
    titel.textContent = beschriftung(a);
    bild.alt = aufnahme(a) && aufnahme(a).alt || titel.textContent;
    zaehler.textContent = text("gal.count").replace("{index}", String(index + 1)).replace("{total}", String(bilder.length));
    [[schliessen, "gal.close"], [vorher, "gal.prev"], [nachher, "gal.next"]].forEach(function(p){ p[0].setAttribute("aria-label", text(p[1])); });
    fehlerText.textContent = text("gal.error");
    original.textContent = text("gal.original");
    original.href = originalLink(a);
    vorher.disabled = nachher.disabled = bilder.length < 2;
    zoomText();
  }
  function zeige(){
    var nummer = ++anfrage;
    var a = bilder[index];
    var src = quelle(a);
    texte();
    setzeZoom(false);
    fehler.hidden = true;
    bild.hidden = true;
    bild.removeAttribute("src");
    medien.setAttribute("aria-busy", "true");
    zoom.disabled = true;
    var laden = new Image();
    laden.onload = function(){
      if(nummer !== anfrage || !dialog.open) return;
      bild.src = src;
      bild.hidden = false;
      medien.removeAttribute("aria-busy");
      zoom.disabled = false;
    };
    laden.onerror = function(){
      if(nummer !== anfrage || !dialog.open) return;
      medien.removeAttribute("aria-busy");
      fehler.hidden = false;
    };
    laden.src = src;
  }
  function weiter(schritt){
    if(bilder.length < 2) return;
    index = (index + schritt + bilder.length) % bilder.length;
    zeige();
  }
  function sperreScroll(){
    var body = document.body, doc = document.documentElement;
    var eigenschaften = ["position", "top", "left", "right", "width", "overflow", "paddingRight"];
    gesperrt = {x: window.scrollX, y: window.scrollY, body: {}, overflow: doc.style.overflow, scrollBehavior: doc.style.scrollBehavior};
    eigenschaften.forEach(function(k){ gesperrt.body[k] = body.style[k]; });
    var rand = Math.max(0, window.innerWidth - doc.clientWidth);
    var abstand = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.position = "fixed";
    body.style.top = -gesperrt.y + "px";
    body.style.left = -gesperrt.x + "px";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if(rand) body.style.paddingRight = abstand + rand + "px";
    doc.style.overflow = "hidden";
  }
  function entsperreScroll(){
    if(!gesperrt) return;
    var vorheriger = gesperrt, doc = document.documentElement;
    gesperrt = null;
    Object.keys(vorheriger.body).forEach(function(k){ document.body.style[k] = vorheriger.body[k]; });
    doc.style.overflow = vorheriger.overflow;
    doc.style.scrollBehavior = "auto";
    if(ausloeser && ausloeser.isConnected) ausloeser.focus({preventScroll: true});
    window.scrollTo(vorheriger.x, vorheriger.y);
    doc.style.scrollBehavior = vorheriger.scrollBehavior;
  }
  function ausserhalb(e){
    var r = dialog.getBoundingClientRect();
    return e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
  }

  document.addEventListener("click", function(e){
    if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[data-galerie]");
    if(!a || !a.href || !aufnahme(a) || dialog.open) return;
    var gruppe = a.getAttribute("data-galerie-gruppe");
    bilder = alleBilder().filter(function(b){ return aufnahme(b) && b.href && (!gruppe || b.getAttribute("data-galerie-gruppe") === gruppe); });
    index = bilder.indexOf(a);
    if(index === -1) return;
    ausloeser = a;
    /* Vor showModal sichern: dessen Autofokus kann die Dokumentposition bereits ändern. */
    sperreScroll();
    try{ dialog.showModal(); }catch(err){ entsperreScroll(); ausloeser = null; return; }
    e.preventDefault();
    zeige();
    schliessen.focus({preventScroll: true});
  });
  schliessen.addEventListener("click", function(){ dialog.close(); });
  vorher.addEventListener("click", function(){ weiter(-1); });
  nachher.addEventListener("click", function(){ weiter(1); });
  zoom.addEventListener("click", function(){ setzeZoom(!istZoom()); });
  dialog.addEventListener("keydown", function(e){
    if(e.altKey || e.ctrlKey || e.metaKey) return;
    if(e.key === "Tab"){
      var fokussierbar = [].slice.call(dialog.querySelectorAll("a[href], button, input, textarea, select, [tabindex], [contenteditable]")).filter(function(el){
        return !el.disabled && (el.tabIndex >= 0 || el.isContentEditable) && !el.closest('[hidden], [inert], [aria-hidden="true"]') && el.getClientRects().length > 0 && window.getComputedStyle(el).visibility === "visible";
      });
      if(fokussierbar.length){
        var erstes = fokussierbar[0], letztes = fokussierbar[fokussierbar.length - 1];
        var aktuell = document.activeElement;
        if(fokussierbar.indexOf(aktuell) === -1 || (e.shiftKey && aktuell === erstes) || (!e.shiftKey && aktuell === letztes)){
          e.preventDefault();
          (e.shiftKey ? letztes : erstes).focus({preventScroll: true});
        }
      }
      return;
    }
    if(e.target.closest("input, textarea, select, [contenteditable]")) return;
    if(e.key === "ArrowLeft"){ e.preventDefault(); weiter(-1); }
    else if(e.key === "ArrowRight"){ e.preventDefault(); weiter(1); }
  });
  dialog.addEventListener("pointerdown", function(e){ hintergrundStart = ausserhalb(e); });
  dialog.addEventListener("pointerup", function(e){
    if(hintergrundStart && ausserhalb(e)) dialog.close();
    hintergrundStart = false;
  });
  dialog.addEventListener("pointercancel", function(){ hintergrundStart = false; });
  dialog.addEventListener("close", function(){
    anfrage++;
    hintergrundStart = false;
    medien.removeAttribute("aria-busy");
    entsperreScroll();
    bilder = [];
    ausloeser = null;
  });
  document.addEventListener("cs:sprache", function(){ if(dialog.open) zeige(); });
})();
