/* CrankScore – Sprache und Design fuer alle Seiten der Website (Start, Impressum, Datenschutz).
   Die Texte stehen in texte.js. Das kleine Skript im <head> jeder Seite setzt das Design und
   blendet die Seite fuer englische Besucher kurz aus (Klasse en-lade), bis hier die Texte stehen.

   Sprache: gespeicherte Wahl (cs.sprache), sonst die Sprache des Browsers; Suchmaschinen bekommen
   Deutsch (Googlebot meldet sich als en-US, Google zeigte die Seite deshalb englisch an).
   Design: gespeicherte Wahl (cs.design), ohne Wahl wie das Geraet. Beides gilt fuer alle Seiten
   und fuer alle offenen Tabs. */
(function(){
  "use strict";
  var doc = document.documentElement;
  var TX = window.CS_TEXTE;
  var SPRACHE_KEY = "cs.sprache", DESIGN_KEY = "cs.design";
  var BOT = /bot|crawl|spider|slurp|google-inspectiontool|lighthouse/i.test(navigator.userAgent || "");
  var ATTRIBUTE = {"data-t-aria": "aria-label", "data-t-alt": "alt", "data-t-title": "title", "data-t-content": "content"};

  function alle(sel){ return [].slice.call(document.querySelectorAll(sel)); }
  function lesen(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function schreiben(k, v){ try{ if(v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }

  /* ── Sprache ── */
  var CS = window.CS = {
    sprache: "de",
    /* Text in der aktuellen Sprache, z. B. fuer Meldungen nach einem Klick */
    t: function(schluessel){ return text(schluessel, CS.sprache); }
  };
  function text(schluessel, sp){
    var paar = TX && TX.texte[schluessel];
    if(!paar) return null;
    return TX.fuelle(paar[sp === "en" ? 1 : 0], sp);
  }
  function setzeSprache(sp){
    CS.sprache = sp;
    alle("[data-t]").forEach(function(e){ var t = text(e.getAttribute("data-t"), sp); if(t !== null) e.textContent = t; });
    alle("[data-th]").forEach(function(e){ var t = text(e.getAttribute("data-th"), sp); if(t !== null) e.innerHTML = t; });
    Object.keys(ATTRIBUTE).forEach(function(a){
      alle("[" + a + "]").forEach(function(e){ var t = text(e.getAttribute(a), sp); if(t !== null) e.setAttribute(ATTRIBUTE[a], t); });
    });
    /* App-Aufnahmen gibt es in beiden Sprachen: img/s/de und img/s/en */
    alle("img[data-bild]").forEach(function(e){
      var s = e.getAttribute("src");
      e.setAttribute("src", sp === "en" ? s.replace("/de/", "/en/") : s.replace("/en/", "/de/"));
    });
    doc.lang = sp;
    alle("button[data-sprache]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-sprache") === sp)); });
  }
  function startSprache(){
    var g = lesen(SPRACHE_KEY);
    if(g === "de" || g === "en") return g;
    if(BOT) return "de";
    var nl = ((navigator.languages && navigator.languages[0]) || navigator.language || "de").toLowerCase();
    return nl.indexOf("de") === 0 ? "de" : "en";
  }
  setzeSprache(startSprache());
  doc.classList.remove("en-lade");
  alle("button[data-sprache]").forEach(function(b){
    b.addEventListener("click", function(){
      var sp = b.getAttribute("data-sprache");
      setzeSprache(sp);
      schreiben(SPRACHE_KEY, sp);
    });
  });

  /* ── Design hell/dunkel: der Kopf-Schalter wechselt, der Fuss der Startseite bietet dazu
     "Wie Geraet". Ohne Wahl folgt die Seite dem Geraet, auch wenn es spaeter umschaltet. ── */
  var systemDunkel = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function gespeichertesDesign(){ var w = lesen(DESIGN_KEY); return w === "hell" || w === "dunkel" ? w : "auto"; }
  var designWahl = gespeichertesDesign();
  function zeigeDesign(){
    var d = designWahl !== "auto" ? designWahl : (systemDunkel && systemDunkel.matches ? "dunkel" : "hell");
    doc.setAttribute("data-design", d);
    alle('meta[name="theme-color"]').forEach(function(m){ m.setAttribute("content", d === "dunkel" ? "#07060d" : "#f4f4f8"); });
    var knopf = document.getElementById("design");
    if(knopf) knopf.setAttribute("aria-pressed", String(d === "dunkel"));
    alle("button[data-design-wahl]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-design-wahl") === designWahl)); });
  }
  function waehleDesign(w){
    designWahl = w;
    schreiben(DESIGN_KEY, w === "auto" ? null : w);
    zeigeDesign();
  }
  zeigeDesign();
  var knopf = document.getElementById("design");
  if(knopf) knopf.addEventListener("click", function(){ waehleDesign(doc.getAttribute("data-design") === "dunkel" ? "hell" : "dunkel"); });
  alle("button[data-design-wahl]").forEach(function(b){ b.addEventListener("click", function(){ waehleDesign(b.getAttribute("data-design-wahl")); }); });
  if(systemDunkel){
    var systemWechsel = function(){ if(designWahl === "auto") zeigeDesign(); };
    if(systemDunkel.addEventListener) systemDunkel.addEventListener("change", systemWechsel);
    else if(systemDunkel.addListener) systemDunkel.addListener(systemWechsel);
  }

  /* andere offene Tabs ziehen mit */
  window.addEventListener("storage", function(e){
    if(e.key === SPRACHE_KEY || e.key === null){ var sp = startSprache(); if(sp !== CS.sprache) setzeSprache(sp); }
    if(e.key === DESIGN_KEY || e.key === null){ designWahl = gespeichertesDesign(); zeigeDesign(); }
  });
})();
