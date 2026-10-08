/* CrankScore – Sprache, Design und Meldungen fuer alle Seiten der Website (Start, Impressum, Datenschutz, 404).
   Die Texte stehen in texte.js. Das Markup ist deutsch; texte.js wird erst geladen, wenn Englisch gebraucht wird
   (englischer Browser, Klick auf EN) -- deutsche Besucher laden es nie. Das kleine Skript im <head> jeder Seite
   setzt das Design vor dem ersten Bild, blendet die Seite fuer englische Besucher kurz aus (Klasse en-lade) und
   laedt texte.js fuer sie schon vorab. Die Adresse von texte.js steht am Skript-Tag (data-texte, mit Version).

   Sprache: gespeicherte Wahl (cs.sprache), sonst die Sprache des Browsers; Suchmaschinen bekommen Deutsch
   (Googlebot meldet sich als en-US, Google zeigte die Seite deshalb englisch an).
   Design: gespeicherte Wahl (cs.design), ohne Wahl wie das Geraet. Beides gilt fuer alle Seiten und fuer alle
   offenen Tabs. Der Wechsel hell/dunkel blendet weich ueber (View Transitions, sonst Farbuebergang), ausser bei
   "weniger Bewegung". */
(function(){
  "use strict";
  var doc = document.documentElement;
  var skript = document.currentScript;
  var TEXTE_URL = (skript && skript.getAttribute("data-texte")) || "/texte.js";
  var SPRACHE_KEY = "cs.sprache", DESIGN_KEY = "cs.design";
  var BOT = /bot|crawl|spider|slurp|google-inspectiontool|lighthouse/i.test(navigator.userAgent || "");
  var ATTRIBUTE = {"data-t-aria": "aria-label", "data-t-alt": "alt", "data-t-title": "title", "data-t-content": "content"};
  /* Die Meldung steht hier und auf Englisch: sie erscheint gerade dann, wenn texte.js nicht geladen werden konnte */
  var EN_FEHLER = "English couldn’t be loaded. Please check your connection and try again.";
  var ruhig = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  function alle(sel, wo){ return [].slice.call((wo || document).querySelectorAll(sel)); }
  function lesen(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function schreiben(k, v){ try{ if(v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }

  /* ── Meldungen: kurz unten eingeblendet und fuer Screenreader angesagt (Live-Region besteht von Anfang an) ── */
  var meldung = document.createElement("div");
  meldung.className = "meldung"; meldung.setAttribute("role", "status"); meldung.setAttribute("aria-live", "polite");
  document.body.appendChild(meldung);
  var meldungZeit = 0;
  function melde(text, art){
    meldung.textContent = text;
    meldung.className = "meldung da" + (art === "fehler" ? " fehler" : "");
    clearTimeout(meldungZeit);
    meldungZeit = setTimeout(function(){ meldung.classList.remove("da"); }, art === "fehler" ? 6000 : 3500);
  }

  /* ── Sprache ── */
  var TX = window.CS_TEXTE || null, laden = null;
  function texteLaden(){
    if(TX) return Promise.resolve(TX);
    if(!laden) laden = new Promise(function(ok, fehler){
      var s = document.createElement("script");
      s.src = TEXTE_URL; s.async = true;
      s.onload = function(){ TX = window.CS_TEXTE || null; if(TX) ok(TX); else { laden = null; fehler(); } };
      s.onerror = function(){ laden = null; s.parentNode.removeChild(s); fehler(); };
      document.head.appendChild(s);
    });
    return laden;
  }
  var CS = window.CS = {
    sprache: "de",
    /* Text in der aktuellen Sprache; ohne geladenes Woerterbuch aus dem (deutschen) Markup */
    t: function(schluessel){
      var paar = TX && TX.texte[schluessel];
      if(paar) return TX.fuelle(paar[CS.sprache === "en" ? 1 : 0], CS.sprache);
      var e = document.querySelector('[data-t="' + schluessel + '"]');
      return e ? e.textContent : null;
    },
    melde: melde
  };
  var angezeigt = "de";  /* Sprache, die gerade im Dokument steht -- das Markup ist deutsch */
  function tausche(wert, sp){ return sp === "en" ? wert.replace(/\/de\//g, "/en/") : wert.replace(/\/en\//g, "/de/"); }
  function einsetzen(sp){
    function text(k){ var paar = TX.texte[k]; return paar ? TX.fuelle(paar[sp === "en" ? 1 : 0], sp) : null; }
    alle("[data-t]").forEach(function(e){ var t = text(e.getAttribute("data-t")); if(t !== null) e.textContent = t; });
    alle("[data-th]").forEach(function(e){ var t = text(e.getAttribute("data-th")); if(t !== null) e.innerHTML = t; });
    Object.keys(ATTRIBUTE).forEach(function(a){
      alle("[" + a + "]").forEach(function(e){ var t = text(e.getAttribute(a)); if(t !== null) e.setAttribute(ATTRIBUTE[a], t); });
    });
    /* App-Aufnahmen gibt es in beiden Sprachen (img/s/de, img/s/en), jeweils auch als AVIF und kleiner */
    alle("img[data-bild]").forEach(function(e){
      ["src", "srcset"].forEach(function(a){ var v = e.getAttribute(a); if(v) e.setAttribute(a, tausche(v, sp)); });
      if(e.parentNode && e.parentNode.nodeName === "PICTURE"){
        alle("source", e.parentNode).forEach(function(q){ q.setAttribute("srcset", tausche(q.getAttribute("srcset"), sp)); });
      }
    });
    angezeigt = sp;
  }
  function markieren(sp){
    CS.sprache = sp;
    doc.lang = sp;
    alle("button[data-sprache]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-sprache") === sp)); });
  }
  function setzeSprache(sp){
    if(sp === angezeigt){ markieren(sp); return Promise.resolve(); }
    return texteLaden().then(function(){ einsetzen(sp); markieren(sp); });
  }
  function startSprache(){
    var g = lesen(SPRACHE_KEY);
    if(g === "de" || g === "en") return g;
    if(BOT) return "de";
    var nl = ((navigator.languages && navigator.languages[0]) || navigator.language || "de").toLowerCase();
    return nl.indexOf("de") === 0 ? "de" : "en";
  }
  function sprachFehler(){ markieren(angezeigt); melde(EN_FEHLER, "fehler"); }
  function zeigen(){ doc.classList.remove("en-lade"); }
  markieren(angezeigt);
  if(startSprache() === "en") setzeSprache("en").catch(sprachFehler).then(zeigen); else zeigen();

  alle("button[data-sprache]").forEach(function(b){
    b.addEventListener("click", function(){
      var sp = b.getAttribute("data-sprache");
      if(sp === CS.sprache && sp === angezeigt) return;
      /* dauert das Nachladen spuerbar (ab 150 ms), pulsiert der Knopf */
      var knoepfe = alle('button[data-sprache="' + sp + '"]');
      var anzeige = setTimeout(function(){ knoepfe.forEach(function(k){ k.classList.add("laedt"); k.setAttribute("aria-busy", "true"); }); }, 150);
      setzeSprache(sp).then(function(){ schreiben(SPRACHE_KEY, sp); }, sprachFehler).then(function(){
        clearTimeout(anzeige);
        knoepfe.forEach(function(k){ k.classList.remove("laedt"); k.removeAttribute("aria-busy"); });
      });
    });
  });

  /* ── Design hell/dunkel: der Kopf-Schalter wechselt, Fuss und Menue bieten dazu "Wie Geraet".
     Ohne Wahl folgt die Seite dem Geraet, auch wenn es spaeter umschaltet. ── */
  var systemDunkel = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function gespeichertesDesign(){ var w = lesen(DESIGN_KEY); return w === "hell" || w === "dunkel" ? w : "auto"; }
  var designWahl = gespeichertesDesign();
  function zielDesign(){ return designWahl !== "auto" ? designWahl : (systemDunkel && systemDunkel.matches ? "dunkel" : "hell"); }
  function zeigeDesign(){
    var d = zielDesign();
    doc.setAttribute("data-design", d);
    alle('meta[name="theme-color"]').forEach(function(m){ m.setAttribute("content", d === "dunkel" ? "#07060d" : "#f4f4f8"); });
    var k = document.getElementById("design");
    if(k) k.setAttribute("aria-pressed", String(d === "dunkel"));
    alle("button[data-design-wahl]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-design-wahl") === designWahl)); });
  }
  /* weicher Wechsel: View Transition (die Seite blendet in 250 ms ueber), sonst gehen die Farben 250 ms ueber */
  var wechselZeit = 0;
  function weich(){
    if(zielDesign() === doc.getAttribute("data-design") || (ruhig && ruhig.matches)){ zeigeDesign(); return; }
    if(document.startViewTransition){ try{ document.startViewTransition(zeigeDesign); return; }catch(e){} }
    doc.classList.add("design-wechsel");
    zeigeDesign();
    clearTimeout(wechselZeit);
    wechselZeit = setTimeout(function(){ doc.classList.remove("design-wechsel"); }, 300);
  }
  function waehleDesign(w){ designWahl = w; schreiben(DESIGN_KEY, w === "auto" ? null : w); weich(); }
  zeigeDesign();
  var knopf = document.getElementById("design");
  if(knopf) knopf.addEventListener("click", function(){ waehleDesign(doc.getAttribute("data-design") === "dunkel" ? "hell" : "dunkel"); });
  alle("button[data-design-wahl]").forEach(function(b){ b.addEventListener("click", function(){ waehleDesign(b.getAttribute("data-design-wahl")); }); });
  if(systemDunkel){
    var systemWechsel = function(){ if(designWahl === "auto") weich(); };
    if(systemDunkel.addEventListener) systemDunkel.addEventListener("change", systemWechsel);
    else if(systemDunkel.addListener) systemDunkel.addListener(systemWechsel);
  }

  /* andere offene Tabs ziehen mit */
  window.addEventListener("storage", function(e){
    if(e.key === SPRACHE_KEY || e.key === null){ var sp = startSprache(); if(sp !== CS.sprache) setzeSprache(sp).catch(sprachFehler); }
    if(e.key === DESIGN_KEY || e.key === null){ designWahl = gespeichertesDesign(); weich(); }
  });
})();
