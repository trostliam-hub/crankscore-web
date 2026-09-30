/* Impressum und Datenschutz: dasselbe Design wie die Startseite -- gespeicherte Wahl (cs.design),
   sonst die Einstellung des Geraets. Laeuft im Kopf, damit die Seite gleich richtig erscheint;
   der Schalter in der Kopfzeile wird nach dem Laden verbunden. */
(function(){
  var KEY = "cs.design", doc = document.documentElement;
  var sys = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function gespeichert(){ try{ var w = localStorage.getItem(KEY); if(w === "hell" || w === "dunkel") return w; }catch(e){} return "auto"; }
  var wahl = gespeichert();
  function zeige(){
    var d = wahl !== "auto" ? wahl : (sys && sys.matches ? "dunkel" : "hell");
    doc.setAttribute("data-design", d);
    var m = document.querySelectorAll('meta[name="theme-color"]');
    for(var i = 0; i < m.length; i++) m[i].setAttribute("content", d === "dunkel" ? "#07060d" : "#f4f4f8");
    var k = document.getElementById("design");
    if(k) k.setAttribute("aria-pressed", String(d === "dunkel"));
  }
  zeige();
  document.addEventListener("DOMContentLoaded", function(){
    zeige();
    var k = document.getElementById("design");
    if(k) k.addEventListener("click", function(){
      wahl = doc.getAttribute("data-design") === "dunkel" ? "hell" : "dunkel";
      try{ localStorage.setItem(KEY, wahl); }catch(e){}
      zeige();
    });
  });
  if(sys){
    var wechsel = function(){ if(wahl === "auto") zeige(); };
    if(sys.addEventListener) sys.addEventListener("change", wechsel); else if(sys.addListener) sys.addListener(wechsel);
  }
  window.addEventListener("storage", function(e){ if(e.key === KEY || e.key === null){ wahl = gespeichert(); zeige(); } });
})();
