/* CrankScore – alle Texte der Website an einer Stelle: Startseite, Impressum, Datenschutz, 404.
   Jede Zeile: "schluessel": ["Deutsch", "English"]. Im HTML tragen Elemente den Schluessel als
   data-t (Text), data-th (Text mit HTML), data-t-aria / data-t-alt / data-t-title / data-t-content
   (Attribute). Englisch ist Standard und steht im HTML; seite.js laedt diese Datei nur fuer Deutsch.

   Zahlen, Preise und Daten stehen nur in WERTE und kommen per Platzhalter in die Texte:
   {zahl:x} Zahl, {preis:x} Euro-Betrag, {datum:x} langes Datum, {datumk:x} kurzes Datum,
   {wert:x} unveraendert. Das Format folgt der Sprache (6,99 € / €6.99, 30.09.2026 / 30 Sept 2026).

   Nach jeder Aenderung: node werkzeuge/texte.mjs
   Das schreibt die englische Fassung ins HTML (erster Besuch, Suchmaschinen, ohne JavaScript),
   aktualisiert die Versionsnummer der Skripte und prueft, dass kein Schluessel und keine
   Uebersetzung fehlt. Englisch: britische Schreibweise (catalogue, tyre, licence). */
(function(){
  "use strict";

  /* Stand 2026-10-11, nachgezaehlt im veroeffentlichten App-Stand (main, Version 20261011-1532):
     Katalog-Export mit tools/katalog-export.mjs (766 Teile, 125 Marken, 7 Disziplinen), PRO_MONAT,
     PRO_JAHR_MONAT, PRO_GUIDE_FREI, PRO_KULANZ (14 Tage). Preis laut App: Liam 2026-10-01.
     Rahmenwerte im Datenblatt: Katalogeintrag f-spindrift (Propain Spindrift).

     appAdresse: Adresse der App zum gemeinsamen Release. Leer = vor dem Release: Knoepfe heissen
     "Kommt bald" und fuehren zur Frage "Wann erscheint CrankScore?". Mit Adresse heissen sie
     "App oeffnen" und fuehren dorthin; Elemente mit data-vor-release verschwinden, solche mit
     data-nach-release erscheinen. Danach node werkzeuge/texte.mjs ausfuehren.
     NIE die Testadresse der App eintragen. */
  var WERTE = {
    appAdresse: "",
    teile: 766, marken: 125, disziplinen: 7, pruefregeln: 20,
    frei: 0, proMonat: 6.99, proJahr: 47.88, proJahrMonat: 3.99, guideFrei: 10, proOffline: 14,
    appVersion: "20261011-1532",
    aufnahme: "2026-10-11",     /* Datum der App-Aufnahmen in img/app/ */
    dsStand: "2026-09-30"       /* "Stand" der Datenschutzerklaerung */
  };

  var T = {
    /* ── Kopf der Startseite (Titel, Beschreibung, Vorschau beim Teilen) ── */
    "seite.titel": ["CrankScore – Mountainbike planen und prüfen, ob die Teile passen",
                    "CrankScore – Plan your mountain bike and check that the parts fit"],
    "seite.desc": ["CrankScore prüft Maße und Standards deines Mountainbikes, findet passende Teile samt Adapter und führt Wunsch- und Einkaufsliste. Für ein neues Rad oder dein eigenes. Web-App, ohne Konto.",
                   "CrankScore checks the dimensions and standards on your mountain bike, finds parts that fit, adapters included, and keeps your wishlist and shopping list. For a new build or your own bike. Web app, no account."],
    "seite.ogtitel": ["CrankScore – Dein Rad. Passende Teile. Klarer Plan.",
                      "CrankScore – Your bike. Matching parts. A clear plan."],
    "seite.ogdesc": ["Die Web-App prüft, ob die Teile deines Mountainbikes zusammenpassen, findet passende Teile samt Adapter und plant den Einkauf.",
                     "The web app checks whether your mountain bike’s parts work together, finds parts that fit, adapters included, and plans what to buy."],
    "seite.ogbild": ["Vorschaubild von CrankScore: der englische Leitsatz der Website neben einem 3D-Rendering eines weißen Enduro-Fullys und einer echten Ansicht der App mit Score 96.",
      "CrankScore preview image: the headline “Your bike. Matching parts. A clear plan.” next to a 3D render of a white full-suspension enduro bike and a real app view with a score of 96."],

    /* ── Kopfzeile, Navigation, Menü ── */
    "weg": ["Zum Inhalt springen", "Skip to content"],
    "marke.aria": ["CrankScore – Startseite", "CrankScore – home"],
    "nav.aria": ["Abschnitte", "Sections"],
    "nav.ablauf": ["So funktioniert’s", "How it works"],
    "nav.funktionen": ["Funktionen", "Features"],
    "nav.beispiel": ["Beispiel", "Example"],
    "nav.preise": ["Preise", "Pricing"],
    "nav.fragen": ["Fragen", "FAQ"],
    "sprache.aria": ["Sprache", "Language"],
    "design.aria": ["Dunkles Design", "Dark mode"],
    "menue.oeffnen": ["Menü öffnen", "Open menu"],
    "menue.schliessen": ["Menü schließen", "Close menu"],
    "menue.aria": ["Menü", "Menu"],
    "menue.nav": ["Abschnitte der Seite", "Page sections"],
    /* Hauptknopf: mit WERTE.appAdresse "App öffnen", sonst "Kommt bald" (setzt werkzeuge/texte.mjs) */
    "app.oeffnen": ["App öffnen", "Open the app"],
    "app.bald": ["Kommt bald", "Coming soon"],

    /* ── Einstieg ── */
    "start.etikett": ["Die Web-App für dein Mountainbike", "The web app for your mountain bike"],
    "start.h1": ["Dein Rad.<br>Passende Teile.<br>Klarer Plan.", "Your bike.<br>Matching parts.<br>A clear plan."],
    "start.lead": ["CrankScore prüft, ob die Teile deines Mountainbikes zusammenpassen – nach Maßen, Standards und Herstellerfreigaben. Die App findet passende Teile samt Adapter, vergleicht sie mit deinen und plant den Einkauf.",
                   "CrankScore checks whether the parts on your mountain bike work together – by dimensions, standards and manufacturer approvals. It finds parts that fit, adapters included, compares them with yours and plans what to buy."],
    "start.knopf2": ["So funktioniert’s", "How it works"],
    "start.fakten": ["<span><b>{zahl:teile}</b> Teile</span><span><b>{zahl:marken}</b> Marken</span><span><b>{zahl:disziplinen}</b> Disziplinen</span>",
                     "<span><b>{zahl:teile}</b> parts</span><span><b>{zahl:marken}</b> brands</span><span><b>{zahl:disziplinen}</b> disciplines</span>"],
    "start.daten": ["Ohne Konto · Daten bleiben auf deinem Gerät · Läuft auch offline", "No account · Your data stays on your device · Works offline"],
    "start.bild": ["Echte Ansicht aus der App. Das Rad: 3D-Modell aus der App, in Blender gerendert.",
                   "Real view from the app. The bike: the app’s 3D model, rendered in Blender."],
    "alt.rad.held": ["3D-Rendering eines weißen Enduro-Fullys mit roter Federgabel und dem Schriftzug CrankScore auf dem Unterrohr, schräg von vorn.",
                     "3D render of a white full-suspension enduro bike with a red fork and the CrankScore lettering on the down tube, seen from the front at an angle."],
    "alt.app.uebersicht": ["App-Ansicht Aufbau: Propain Spindrift als Traumrad, gerendert als 3D-Modell; Gesamtscore 96 für Enduro, Kompatibilität 94, Einsatz 98.",
                           "App view Build: a Propain Spindrift as a dream bike, shown as a 3D model; overall score 96 for enduro, compatibility 94, discipline 98."],

    /* ── Für wen: drei Modi ── */
    "zg.etikett": ["Für wen", "Who it’s for"],
    "zg.h2": ["Für alle, die ihr Rad selbst planen.", "For riders who plan their own bike."],
    "zg.p": ["Du musst kein Mechaniker sein. CrankScore kennt die Standards – du entscheidest, was an dein Rad kommt. Drei Modi, eine Prüfung.",
             "You don’t need to be a mechanic. CrankScore knows the standards; you decide what goes on your bike. Three modes, one check."],
    "m1.etikett": ["Traumrad", "Dream bike"],
    "m1.h3": ["Ein neues Rad planen", "Plan a new bike"],
    "m1.p": ["Wähle Disziplin und Budget. Die App stellt einen stimmigen Aufbau zusammen, den du Teil für Teil anpasst – oder du baust ab dem Rahmen selbst auf.",
             "Choose your discipline and budget. The app puts together a coherent build that you can adjust part by part – or you build it up yourself from the frame."],
    "m2.etikett": ["Mein Rad", "My bike"],
    "m2.h3": ["Dein Rad erfassen und aufrüsten", "Record and upgrade your bike"],
    "m2.p": ["Trag ein, was verbaut ist. Die Prüfung zeigt, was nicht zusammenpasst, und welche Upgrades für dein Ziel wirklich etwas bringen.",
             "Enter what’s fitted. The check shows what doesn’t work together and which upgrades actually make a difference for your goal."],
    "m3.etikett": ["Gebraucht", "Used"],
    "m3.h3": ["Ein Angebot einschätzen", "Size up a listing"],
    "m3.p": ["Trag die Teile aus dem Inserat ein, dazu Modelljahr und Zustand. Die App schätzt, ob der Preis fair ist. Eine Besichtigung ersetzt das nicht.",
             "Enter the parts from the listing, plus model year and condition. The app estimates whether the price is fair. It’s no substitute for seeing the bike."],

    /* ── Produktansicht ── */
    "produkt.etikett": ["Die App", "The app"],
    "produkt.h2": ["Alles Wichtige auf einen Blick.", "Everything that matters, at a glance."],
    "produkt.p": ["Oben dein Rad, daneben der Score, darunter die Prüfung. Am Handy wie am Rechner – im Browser, ohne Installation.",
                  "Your bike at the top, the score beside it, the check below. On your phone or your computer – in the browser, nothing to install."],
    "alt.app.desktop": ["App-Ansicht am Rechner: links das Rad, rechts Gesamtscore 96, Kompatibilität 94, Einsatz 98, Preis und Gewicht, darunter die Prüfung ohne Konflikte.",
                        "Desktop app view: the bike on the left; on the right an overall score of 96, compatibility 94, discipline 98, price and weight, and below them the check with no conflicts."],
    "p1.h3": ["Ein Score, zwei Werte", "One score, two ratings"],
    "p1.p": ["Kompatibilität misst, ob alles mechanisch passt. Einsatz, ob die Teile zu deiner Disziplin passen. Daraus entsteht der Score von 0 bis 100.",
             "Compatibility measures whether everything fits mechanically; discipline, whether the parts suit how you ride. Together they make the score from 0 to 100."],
    "p2.h3": ["Die Prüfung sagt, was offen ist", "The check says what’s open"],
    "p2.p": ["Konflikte, Kompromisse und fehlende Angaben stehen direkt unter dem Rad – und auch, was nicht geprüft wurde.",
             "Conflicts, compromises and missing details sit right below the bike – along with anything that hasn’t been checked."],
    "p3.h3": ["Ein Tipp zum nächsten Schritt", "One tap to the next step"],
    "p3.p": ["„Was möchtest du verbessern?“ führt direkt zur Teilesuche – mit Ziel, Marke und Budget.",
             "“What would you like to improve?” takes you straight to the part finder – with goal, brand and budget."],

    /* ── So funktioniert's ── */
    "ablauf.etikett": ["So funktioniert’s", "How it works"],
    "ablauf.h2": ["Vom Rad zur Einkaufsliste in vier Schritten.", "From bike to shopping list in four steps."],
    "ablauf.p": ["Kein Konto, keine Anmeldung. Maße und Standards musst du nicht kennen – die App kennt sie für die Teile im Katalog.",
                 "No account, no sign-up. You don’t need to know dimensions and standards – the app knows them for the parts in its catalogue."],
    "s1.h3": ["Rad wählen oder eintragen", "Pick or enter your bike"],
    "s1.p": ["Plane ein neues Rad, trag dein eigenes ein oder ein Gebrauchtangebot. Fang beim Rahmen an, er legt vieles fest.",
             "Plan a new bike, enter your own or a used listing. Start with the frame – it decides a lot."],
    "s2.h3": ["Prüfung lesen", "Read the check"],
    "s2.p": ["Rot heißt: So lässt sich das Rad nicht bauen. Gelb: Es geht, mit Kompromiss oder Adapter. Konflikte führen direkt zur Lösungssuche.",
             "Red means the bike can’t be built this way. Amber: it works, with a compromise or an adapter. Conflicts lead straight to a fix."],
    "s3.h3": ["Passendes Teil finden", "Find a part that fits"],
    "s3.p": ["Ziel, Marke, Budget – drei kurze Fragen. Die App zeigt passende Teile, vergleicht sie mit deinem und rechnet Adapter und Zubehör mit.",
             "Goal, brand, budget – three quick questions. The app shows parts that fit, compares them with yours and includes adapters and accessories in the cost."],
    "s4.h3": ["Merken, testen, kaufen", "Save, try, buy"],
    "s4.p": ["Probier ein Teil im Aufbau aus, bevor du es übernimmst. Die Einkaufsliste zeigt, was du wirklich kaufen musst.",
             "Try a part in your build before you commit. The shopping list shows what you actually need to buy."],

    /* ── Datenblatt: was geprüft wird (Werte: Katalogeintrag Propain Spindrift) ── */
    "blatt.etikett": ["Was geprüft wird", "What gets checked"],
    "blatt.h2": ["Kompatibilität heißt: Maße, die stimmen.", "Compatibility means dimensions that match."],
    "blatt.p": ["Jeder Rahmen bringt feste Maße mit. Gegen sie prüft CrankScore die Teile, die du einbaust – mit über {zahl:pruefregeln} Regeln, von der Achse bis zur Sattelstütze.",
                "Every frame comes with fixed dimensions. CrankScore checks the parts you fit against them – with more than {zahl:pruefregeln} rules, from the axles to the seatpost."],
    "alt.rad.seite": ["3D-Rendering desselben Rads in der Seitenansicht, mit nummerierten Punkten an Hinterachse, Bremsaufnahme, Dämpfer, Tretlager, Sitzrohr, Steuerrohr und Vorderrad.",
                      "3D render of the same bike from the side, with numbered points at the rear axle, brake mount, shock, bottom bracket, seat tube, head tube and front wheel."],
    "b1.k": ["Hinterachse", "Rear axle"],
    "b1.w": ["148 × 12 mm Boost · UDH", "148 × 12 mm Boost · UDH"],
    "b2.k": ["Bremse hinten", "Rear brake"],
    "b2.w": ["Post Mount 180 · Scheibe bis 203 mm", "Post mount 180 · rotor up to 203 mm"],
    "b3.k": ["Dämpfer", "Shock"],
    "b3.w": ["230 × 65 mm, Standard-Aufnahme", "230 × 65 mm, standard mount"],
    "b4.k": ["Tretlager", "Bottom bracket"],
    "b4.w": ["BSA, 73 mm", "BSA, 73 mm"],
    "b5.k": ["Sitzrohr", "Seat tube"],
    "b5.w": ["Stütze 31,6 mm · 240 mm Einstecktiefe", "31.6 mm post · 240 mm insertion"],
    "b6.k": ["Steuerrohr", "Head tube"],
    "b6.w": ["tapered · Gabeln bis 180 mm Federweg", "tapered · forks up to 180 mm travel"],
    "b7.k": ["Laufräder", "Wheels"],
    "b7.w": ["29″ vorn · 27,5″ hinten · Reifen hinten bis 66 mm", "29″ front · 27.5″ rear · rear tyre up to 66 mm"],
    "blatt.quelle": ["Werte aus dem Katalog der App für den Rahmen Propain Spindrift. Das 3D-Modell bildet den Rahmen nach; Anbauteile sind allgemein dargestellt, der Schriftzug CrankScore ersetzt das Herstellerlogo.",
                     "Figures from the app’s catalogue for the Propain Spindrift frame. The 3D model recreates the frame; components are shown generically, and the CrankScore lettering replaces the manufacturer’s logo."],

    /* ── Funktionen ── */
    "funk.etikett": ["Funktionen", "Features"],
    "funk.h2": ["Was CrankScore für dich erledigt.", "What CrankScore does for you."],
    "funk.p": ["Jede Funktion beantwortet eine Frage, die beim Schrauben aufkommt – mit Werten aus dem Katalog statt Bauchgefühl.",
               "Each feature answers a question that comes up when you work on a bike – with catalogue data rather than gut feeling."],
    "fp.etikett": ["Kompatibilitätsprüfung", "Compatibility check"],
    "fp.h3": ["Findet Konflikte, bevor du bestellst.", "Spots conflicts before you order."],
    "fp.p": ["Passt die SRAM-Kassette auf deinen Micro-Spline-Freilauf? Die Prüfung zeigt, was nicht zusammenpasst und warum – und wenn die Lösung nur eine andere Ausführung eines vorhandenen Teils ist, sagt sie das.",
             "Will that SRAM cassette fit your Micro Spline freehub? The check shows what doesn’t work together and why – and when the fix is just a different version of a part you already have, it says so."],
    "fp.l1": ["Über {zahl:pruefregeln} Regeln: Achsen, Freilauf, Dämpfermaß, Innenlager, Steuersatz, Bremsaufnahme, Reifenfreiheit, Klemmungen",
              "More than {zahl:pruefregeln} rules: axles, freehub, shock size, bottom bracket, headset, brake mount, tyre clearance, clamps"],
    "fp.l2": ["Passt, Kompromiss, passt nicht – immer mit Wort, nicht nur mit Farbe", "Fits, compromise, doesn’t fit – always in words, not just colour"],
    "fp.l3": ["Fehlt eine Angabe, fragt die App gezielt nach, statt zu raten", "If a detail is missing, the app asks for it rather than guessing"],
    "alt.app.pruefung": ["App-Ansicht Prüfung: „Freilaufkörper passt nicht zur Kassette“ – der Laufradsatz hat Micro Spline, die Kassette braucht HG; dazu ein Kompromiss bei Schaltwerk und Kassette.",
                         "App view of the check: “Freehub body doesn’t fit the cassette” – the wheelset has Micro Spline, the cassette needs HG; plus a compromise between derailleur and cassette."],
    "ff.etikett": ["Teile finden", "Part finder"],
    "ff.h3": ["Drei Fragen statt hundert Datenblätter.", "Three questions instead of a hundred spec sheets."],
    "ff.p": ["Sag, was besser werden soll, welche Marke du magst und was du ausgeben willst. Die App zeigt passende Teile – und nur solche, die für dein Ziel besser und nirgends schlechter sind als dein jetziges.",
             "Say what should improve, which brands you like and what you want to spend. The app shows parts that fit – and only ones that are better for your goal and no worse anywhere than what you have."],
    "ff.l1": ["Ziele wie mehr Bremskraft, weniger Gewicht oder ein defektes Teil ersetzen", "Goals such as more stopping power, less weight or replacing a broken part"],
    "ff.l2": ["Dein Budget gilt für Teil und Zubehör zusammen", "Your budget covers the part and its accessories together"],
    "ff.l3": ["Gibt es nichts Besseres, rät die App, dein Teil zu behalten", "If nothing beats your part, the app tells you to keep it"],
    "alt.app.finden": ["App-Ansicht Teile finden: Bremsen, Schritt 1 von 3 – „Was soll sich verbessern?“ mit Zielen von mehr Bremskraft bis günstiger ersetzen.",
                       "App view of the part finder: brakes, step 1 of 3 – “What should improve?” with goals ranging from more stopping power to a cheaper replacement."],
    "fv.etikett": ["Vergleich und Adapter", "Comparison and adapters"],
    "fv.h3": ["Vorher und nachher, mit allem, was dazugehört.", "Before and after, with everything it takes."],
    "fv.p": ["Dein Teil und das neue stehen nebeneinander, Wert für Wert, mit Urteil für dein Ziel. Braucht der Wechsel einen Adapter, wählt die App ihn aus: den passenden Artikel deiner Bremsmarke, vorn und hinten getrennt, mit Grund.",
             "Your part and the new one side by side, value by value, with a verdict for your goal. If the switch needs an adapter, the app picks it: the right part number from your brake’s brand, front and rear separately, with the reason."],
    "fv.l1": ["Kosten des Wechsels mit Adapter und Zubehör, soweit Preise bekannt sind", "Cost of the switch including adapters and accessories, where prices are known"],
    "fv.l2": ["Was bleibt, was neu nötig ist, was entfällt", "What stays, what’s needed, what’s no longer needed"],
    "fv.l3": ["Kompatibilität des ganzen Rads vorher und nachher", "Whole-bike compatibility before and after"],
    "alt.app.vergleich": ["App-Ansicht Vorher und nachher: Shimano XT M8120 mit Scheiben 203/180 mm gegen dieselbe Bremse mit 220/203 mm – Scheiben besser, Bauart und Bremsflüssigkeit gleich, Gewicht nicht vergleichbar.",
                          "App view Before and after: Shimano XT M8120 with 203/180 mm rotors against the same brake with 220/203 mm – rotors better, design and brake fluid the same, weight not comparable."],
    "fw.etikett": ["Wunschliste", "Wishlist"],
    "fw.h3": ["Erst ausprobieren, dann übernehmen.", "Try it first, then commit."],
    "fw.p": ["Merk dir Teile für jedes Rad und bring sie in vier Stufen voran: gemerkt, im Aufbau testen, kaufen, montiert. Ein Test ist nur eine Vorschau – gespeichert bleibt dein echtes Teil, bis du übernimmst.",
             "Save parts for each bike and move them through four stages: saved, trying in build, buying, fitted. A trial is only a preview – your real part stays saved until you commit."],
    "fw.l1": ["Score und Prüfung zeigen das Testteil sofort", "Score and check reflect the trial part straight away"],
    "fw.l2": ["Ziel und Budget lassen sich je Eintrag ändern", "Goal and budget can be changed for each item"],
    "fw.l3": ["Jede Änderung steht im Verlauf, mit Rückgängig", "Every change is logged and can be undone"],
    "alt.app.wunsch": ["App-Ansicht Wunschliste: Magura MT4 in der Stufe „Im Aufbau testen“ mit dem Status „Geprüft passend“, darunter eine RockShox Lyrik Ultimate in der Stufe „Kaufen“.",
                       "App view Wishlist: a Magura MT4 at the “Trying in build” stage with the status “Checked: fits”, and below it a RockShox Lyrik Ultimate at the “Buying” stage."],
    "fe.etikett": ["Einkauf", "Shopping"],
    "fe.h3": ["Eine Liste für den Shop oder die Werkstatt.", "One list for the shop or the workshop."],
    "fe.p": ["Die Einkaufsliste sammelt jedes Teil mit Preis und rechnet die Summe aus. Als Text kopiert, nimmst du sie mit in deine Werkstatt. Bestellt wird im Shop – CrankScore verkauft selbst nichts.",
             "The shopping list gathers every part with its price and adds up the total. Copy it as text and take it to your bike shop. You order from the shop – CrankScore doesn’t sell anything itself."],
    "fe.l1": ["Beim eigenen Rad nur, was du wirklich neu brauchst", "For your own bike, only what you actually need to buy"],
    "fe.l2": ["Schon verbaute Adapter sind markiert, damit du sie nicht doppelt kaufst", "Adapters you already have are marked so you don’t buy them twice"],
    "fe.l3": ["„Zum Produkt“ nur bei einem geprüften Angebot für genau diese Ausführung", "“View product” only with a verified offer for exactly that version"],
    "alt.app.einkauf": ["App-Ansicht Einkaufsliste: 19 Teile mit Summe, darunter Rahmen Propain Spindrift, Federgabel Marzocchi Bomber Z1 Coil und Dämpfer RockShox Super Deluxe Coil.",
                        "App view Shopping list: 19 parts with a total, including a Propain Spindrift frame, a Marzocchi Bomber Z1 Coil fork and a RockShox Super Deluxe Coil shock."],
    "pro.marke": ["Pro", "Pro"],
    "k1.h3": ["Fahrwerk-Setup", "Suspension setup"],
    "k1.p": ["Startwerte für Gabel und Dämpfer: Sag-Ziel, Zug- und Druckstufe in Klicks, gezählt wie auf deinem Knopf. Einen Luftdruck nennt die App nur, wenn er belegt ist.",
             "Starting values for fork and shock: sag target, rebound and compression in clicks, counted the way your dial is marked. The app only gives an air pressure when it’s backed by data."],
    "k2.h3": ["Guide", "Guide"],
    "k2.p": ["Fragen zu deinem Rad und zur Technik, beantwortet auf deinem Gerät – ohne KI-Dienst im Hintergrund. In Free {zahl:guideFrei} Fragen am Tag.",
             "Questions about your bike and the tech behind it, answered on your device – no AI service in the background. Free includes {zahl:guideFrei} questions a day."],
    "k3.h3": ["Mehrere Räder", "Several bikes"],
    "k3.p": ["Jedes Rad behält Aufbau, Wunschliste und Verlauf. In Free ein Rad je Modus, mit Pro so viele, wie du willst.",
             "Each bike keeps its own build, wishlist and history. Free gives you one bike per mode, Pro as many as you like."],
    "k4.h3": ["Offline und auf dem Home-Bildschirm", "Offline and on your home screen"],
    "k4.p": ["Kein App Store nötig: Leg CrankScore auf den Home-Bildschirm. Nach dem ersten Laden läuft die App auch ohne Netz.",
             "No app store needed: add CrankScore to your home screen. After the first load, it works without a connection too."],
    "k5.h3": ["3D-Ansicht", "3D view"],
    "k5.p": ["Beim Propain Spindrift zeigt die App das Rad als 3D-Modell – drehbar, Baugruppen einzeln hervorgehoben. Andere Rahmen erscheinen als Schema aus der Katalog-Geometrie.",
             "For the Propain Spindrift, the app shows the bike as a 3D model you can rotate, with assemblies highlighted one by one. Other frames appear as a diagram drawn from catalogue geometry."],
    "k6.h3": ["E-MTBs", "E-MTBs"],
    "k6.p": ["Im Katalog stehen auch E-MTB-Rahmen. Die App prüft, ob die Kurbel zur Motorwelle passt und ob Bremsen und Laufräder das Mehrgewicht tragen.",
             "The catalogue includes e-MTB frames. The app checks whether the crank fits the motor spindle and whether brakes and wheels can take the extra weight."],

    /* ── Beispiel (Werte aus der App, Stand WERTE.aufnahme) ── */
    "bsp.etikett": ["Ein Beispiel aus der App", "An example from the app"],
    "bsp.h2": ["Mehr Bremskraft – ohne neue Bremse.", "More stopping power – without a new brake."],
    "bsp.p": ["Ein Specialized Stumpjumper Alloy mit RockShox Pike und Shimano XT M8120, Scheiben 203 mm vorn und 180 mm hinten. Ziel: mehr Bremskraft und Standfestigkeit.",
              "A Specialized Stumpjumper Alloy with a RockShox Pike and Shimano XT M8120 brakes, a 203 mm rotor at the front and 180 mm at the rear. Goal: more stopping power and fade resistance."],
    "bsp.1": ["<b>Kein Modellwechsel.</b> Ob eine andere Bremse bei gleicher Scheibe stärker bremst, ist ohne Herstellerwerte nicht belegbar. Die App rät deshalb, die XT zu behalten.",
              "<b>No new model.</b> Whether another brake stops harder with the same rotor can’t be shown without manufacturer data, so the app recommends keeping the XT."],
    "bsp.2": ["<b>Größere Scheiben:</b> 220 mm vorn, 203 mm hinten – der Weg zu mehr Bremskraft, der sich belegen lässt.",
              "<b>Bigger rotors:</b> 220 mm front, 203 mm rear – the route to more stopping power that can actually be backed up."],
    "bsp.3": ["<b>Adapter automatisch:</b> vorn Shimano SM-MA-F220P/PM statt F203P/PM, hinten neu SM-MA-F203P/PM – jeweils mit Grund und Richtpreis.",
              "<b>Adapters picked automatically:</b> Shimano SM-MA-F220P/PM instead of F203P/PM at the front and a new SM-MA-F203P/PM at the rear – each with the reason and a guide price."],
    "bsp.4": ["<b>Ehrlich bei Lücken:</b> Dass der Rahmen hinten 203 mm freigibt, ist nicht belegt. Die App markiert das als „Noch zu prüfen“ und fragt nach, statt zu raten.",
              "<b>Honest about gaps:</b> there’s no record that the frame is rated for 203 mm at the rear. The app flags it as “Still to check” and asks, rather than guessing."],
    "bsp.5": ["<b>Kosten des Wechsels:</b> 41 € Richtpreis für die Adapter. Die Scheiben kommen dazu – ihr Preis steht nicht im Katalog.",
              "<b>Cost of the switch:</b> €41 guide price for the adapters. The rotors come on top – their price isn’t in the catalogue."],
    "bsp.quelle": ["Werte aus der App, Stand {datumk:aufnahme}. Preise sind Richtpreise auf UVP-Niveau, keine Angebote.",
                   "Figures from the app as of {datumk:aufnahme}. Prices are guide prices at RRP level, not offers."],
    "alt.app.paket": ["App-Ansicht „Was der Wechsel umfasst“: Die Shimano XT M8120 bleibt; neu nötig sind Scheiben mit 220 und 203 mm sowie die Adapter SM-MA-F203P/PM für hinten (17 €) und SM-MA-F220P/PM für vorn (24 €); der Adapter SM-MA-F203P/PM vorn entfällt; Kosten des Wechsels 41 €.",
                      "App view “What the switch includes”: the Shimano XT M8120 stays; needed are 220 and 203 mm rotors plus the SM-MA-F203P/PM adapter for the rear (€17) and the SM-MA-F220P/PM for the front (€24); the front SM-MA-F203P/PM is no longer needed; cost of the switch €41."],

    /* ── Ehrlich gerechnet ── */
    "eh.etikett": ["Ehrlich gerechnet", "Straight answers"],
    "eh.h2": ["Klare Aussagen, auch über Grenzen.", "Clear answers, limits included."],
    "eh.p": ["CrankScore soll dir helfen, Fehlkäufe zu vermeiden. Dazu gehört, offen zu sagen, was die App weiß und was nicht.",
             "CrankScore is there to help you avoid buying the wrong part. That means being open about what the app knows and what it doesn’t."],
    "e1.h3": ["Richtpreise, klar gekennzeichnet", "Guide prices, clearly labelled"],
    "e1.p": ["Die App rechnet mit Richtpreisen auf UVP-Niveau. Einen Link „Zum Produkt“ zeigt sie nur, wenn ein geprüftes Angebot für genau diese Ausführung vorliegt – aktuell, lieferbar, mit Stand.",
             "The app works with guide prices at RRP level. It only shows a “View product” link when there’s a verified offer for exactly that version – recent, in stock and dated."],
    "e2.h3": ["Keine geratenen Werte", "No guesswork"],
    "e2.p": ["Fehlt im Katalog eine Angabe, etwa die Bremsaufnahme deines Rahmens, fragt die App nach. Bis dahin zählt sie weder als besser noch als schlechter.",
             "If the catalogue lacks a detail, such as your frame’s brake mount, the app asks you for it. Until then it counts as neither better nor worse."],
    "e3.h3": ["Unabhängig von Shops", "Independent of shops"],
    "e3.p": ["CrankScore verkauft keine Teile. Welches Teil passt, entscheidet die Prüfung. Ist ein Link ein Partnerlink, steht „Anzeige“ daneben.",
             "CrankScore doesn’t sell parts. Which part fits is decided by the check. If a link is a partner link, it’s marked “Ad”."],
    "e4.h3": ["Deine Daten bleiben bei dir", "Your data stays with you"],
    "e4.p": ["Kein Konto, kein Tracking. Räder, Maße und Fotos liegen nur im Speicher deines Browsers. Für Pro geht allein der Lizenzcode zur Prüfung an Lemon Squeezy.",
             "No account, no tracking. Bikes, measurements and photos live only in your browser’s storage. For Pro, only the licence code goes to Lemon Squeezy to be checked."],

    /* ── Preise ── */
    "pr.etikett": ["Preise", "Pricing"],
    "pr.h2": ["Kostenlos starten. Pro, wenn du mehr brauchst.", "Start for free. Go Pro when you need more."],
    "pr.p": ["Free kann fast alles. Pro ergänzt, was vor allem Vielschrauber brauchen.", "Free does almost everything. Pro adds what keen home mechanics tend to need."],
    "free.name": ["Free", "Free"],
    "free.preis": ["{preis:frei}", "{preis:frei}"],
    "free.sub": ["Kostenlos, ohne Konto", "No cost, no account"],
    "free.l1": ["Prüfung, Score und fehlende Angaben", "Check, score and missing details"],
    "free.l2": ["Teile finden, vergleichen, Adapter im Paket", "Part finder, comparison, adapters in the package"],
    "free.l3": ["Wunschliste und Einkaufsliste", "Wishlist and shopping list"],
    "free.l4": ["Ein Rad je Modus", "One bike per mode"],
    "free.l5": ["Guide: {zahl:guideFrei} Fragen am Tag", "Guide: {zahl:guideFrei} questions a day"],
    "pro.preis": ["{preis:proMonat}", "{preis:proMonat}"],
    "pro.einheit": ["im Monat", "a month"],
    "pro.sub": ["oder {preis:proJahrMonat} im Monat bei jährlicher Zahlung ({preis:proJahr} im Jahr)", "or {preis:proJahrMonat} a month billed yearly ({preis:proJahr} a year)"],
    "pro.l1": ["Alles aus Free", "Everything in Free"],
    "pro.l2": ["Beliebig viele Räder je Modus", "As many bikes per mode as you like"],
    "pro.l3": ["Fahrwerk-Setup für Gabel und Dämpfer", "Suspension setup for fork and shock"],
    "pro.l4": ["Guide ohne Tageslimit", "Guide with no daily limit"],
    "pr.hinweis": ["Pro schaltest du mit dem Code aus der Kauf-Mail frei – ohne Konto. Der Kauf läuft über Lemon Squeezy.",
                   "You unlock Pro with the code from your purchase email – no account needed. Payment is handled by Lemon Squeezy."],
    "pr.bald": ["Pro ist erhältlich, sobald die App startet.", "Pro will be available once the app launches."],

    /* ── Häufige Fragen ── */
    "fragen.etikett": ["Fragen", "FAQ"],
    "fragen.h2": ["Häufige Fragen", "Frequently asked questions"],
    "q0.q": ["Wann erscheint CrankScore?", "When will CrankScore launch?"],
    "q0.a": ["CrankScore ist in der Testphase. Wir veröffentlichen die App, sobald Katalog und Prüfung so ausgereift sind, dass du dich darauf verlassen kannst. Dann steht hier „App öffnen“.",
             "CrankScore is in testing. We’ll release the app once the catalogue and the check are solid enough for you to rely on. When that happens, you’ll find “Open the app” here."],
    "q1.q": ["Was kostet CrankScore?", "What does CrankScore cost?"],
    "q1.a": ["Free ist kostenlos und ohne Konto nutzbar. Pro kostet {preis:proMonat} im Monat oder {preis:proJahrMonat} im Monat bei jährlicher Zahlung ({preis:proJahr} im Jahr) und bringt beliebig viele Räder, das Fahrwerk-Setup und den Guide ohne Tageslimit.",
             "Free costs nothing and needs no account. Pro costs {preis:proMonat} a month, or {preis:proJahrMonat} a month billed yearly ({preis:proJahr} a year), and adds unlimited bikes, the suspension setup and the guide with no daily limit."],
    "q2.q": ["Brauche ich ein Konto?", "Do I need an account?"],
    "q2.a": ["Nein. Du öffnest die App im Browser und legst los. Auch für Pro brauchst du kein Konto: Du schaltest es mit dem Code aus der Kauf-Mail frei.",
             "No. You open the app in your browser and get started. Pro doesn’t need an account either: you unlock it with the code from your purchase email."],
    "q3.q": ["Wo werden meine Daten gespeichert?", "Where is my data stored?"],
    "q3.a": ["Nur auf deinem Gerät, im Speicher deines Browsers. Löschst du die Browserdaten oder wechselst das Gerät, sind sie weg – sichere sie vorher in der App als Datei. Für Pro geht nur der Lizenzcode zur Prüfung an Lemon Squeezy, höchstens einmal am Tag.",
             "Only on your device, in your browser’s storage. If you clear your browser data or switch devices, it’s gone – so back it up to a file in the app first. For Pro, only the licence code goes to Lemon Squeezy to be checked, at most once a day."],
    "q4.q": ["Funktioniert CrankScore offline?", "Does CrankScore work offline?"],
    "q4.a": ["Ja. Nach dem ersten vollständigen Laden läuft die App auch ohne Netz, in der Werkstatt wie unterwegs. Pro bleibt ohne Verbindung {zahl:proOffline} Tage aktiv.",
             "Yes. After the first full load, the app works without a connection, in the workshop or out on the trail. Pro stays active offline for {zahl:proOffline} days."],
    "q5.q": ["Wie kommt die App auf mein Handy?", "How do I get the app on my phone?"],
    "q5.a": ["Ohne App Store: Auf dem iPhone tippst du in Safari auf „Teilen“ und dann auf „Zum Home-Bildschirm“. Unter Android wählst du in Chrome im Menü „App installieren“ oder „Zum Startbildschirm hinzufügen“.",
             "No app store needed: on an iPhone, tap Share in Safari, then “Add to Home Screen”. On Android, open the Chrome menu and choose “Install app” or “Add to Home screen”."],
    "q6.q": ["Woher kommen die Preise?", "Where do the prices come from?"],
    "q6.a": ["Die App rechnet mit Richtpreisen auf UVP-Niveau und setzt ältere Modelljahre günstiger an. Liegt für genau diese Ausführung ein geprüftes Angebot eines Partnershops vor, zeigt sie dessen Preis mit Stand und Versand. Verbindlich ist immer der Preis im Shop.",
             "The app works with guide prices at RRP level and prices older model years lower. If there’s a verified offer from a partner shop for exactly that version, it shows that price with its date and shipping. The price in the shop is always what counts."],
    "q7.q": ["Wie zuverlässig ist die Prüfung?", "How reliable is the check?"],
    "q7.a": ["Sie arbeitet mit Maßen, Standards und Herstellerfreigaben aus dem Katalog. Fehlt eine Angabe, fragt die App nach, und was sie nicht prüft, steht direkt unter dem Score. Vor dem Kauf gilt das Datenblatt des Herstellers.",
             "It works with dimensions, standards and manufacturer approvals from the catalogue. If a detail is missing, the app asks for it, and anything it doesn’t check is listed right below the score. Before you buy, the manufacturer’s spec sheet has the final say."],
    "q8.q": ["Für welche Räder ist CrankScore gedacht?", "Which bikes is CrankScore for?"],
    "q8.a": ["Für Mountainbikes von XC über Trail und Enduro bis Downhill, Dirt, Slopestyle und Trial – Hardtails, Fullys und E-MTBs. Im Katalog stehen {zahl:teile} Teile von {zahl:marken} Marken.",
             "For mountain bikes from XC, trail and enduro to downhill, dirt, slopestyle and trials – hardtails, full-suspension bikes and e-MTBs. The catalogue holds {zahl:teile} parts from {zahl:marken} brands."],
    "q9.q": ["Gibt es CrankScore im App Store?", "Is CrankScore in the app stores?"],
    "q9.a": ["Nein, das ist Absicht: CrankScore ist eine Web-App und läuft im Browser, auf dem Handy wie am Rechner.",
             "No, and that’s deliberate: CrankScore is a web app that runs in your browser, on your phone or your computer."],
    "q10.q": ["In welchen Sprachen gibt es CrankScore?", "Which languages is CrankScore available in?"],
    "q10.a": ["Website und App gibt es auf Deutsch und Englisch, mit Preisen und Zahlen im passenden Format.",
              "The website and the app are available in German and English, with prices and numbers in the right format."],

    /* ── Schluss ── */
    "schluss.h2": ["Bereit für deinen Aufbau?", "Ready to plan your build?"],
    "schluss.p": ["Öffne CrankScore im Browser, wähle dein Rad und sieh, was passt.", "Open CrankScore in your browser, pick your bike and see what fits."],
    "schluss.bald.h2": ["Bald startklar.", "Almost ready."],
    "schluss.bald.p": ["CrankScore ist in der Testphase. Kennst du jemanden, der gerade ein Rad plant oder aufrüstet? Dann teil die Seite.",
                       "CrankScore is in testing. Know someone who’s planning or upgrading a bike? Share this page with them."],
    "schluss.knopf": ["Seite teilen", "Share this page"],
    "schluss.kopiert": ["Link kopiert", "Link copied"],  /* erscheint nach dem Klick auf "Seite teilen" */
    "schluss.fehler": ["Kopieren hat nicht geklappt. Die Adresse lautet crankscore.de.", "Couldn’t copy the link. The address is crankscore.de."],
    "alt.rad.heck": ["3D-Rendering desselben Rads schräg von hinten links.", "3D render of the same bike from the rear left at an angle."],

    /* ── Fuß ── */
    "fuss.claim": ["Mountainbikes planen, prüfen und aufrüsten – Teil für Teil.", "Plan, check and upgrade mountain bikes, part by part."],
    "fuss.h1": ["Inhalt", "On this page"],
    "fuss.h2": ["Rechtliches", "Legal"],
    "fuss.imp": ["Impressum", "Legal notice"],
    "fuss.ds": ["Datenschutz", "Privacy policy"],
    "fuss.h3": ["Sprache", "Language"],
    "fuss.h4": ["Design", "Appearance"],
    "design.hell": ["Hell", "Light"],
    "design.dunkel": ["Dunkel", "Dark"],
    "design.auto": ["Wie Gerät", "Match device"],
    "fuss.bilder": ["App-Ansichten: echte Aufnahmen der App, Stand {datumk:aufnahme} (Version {wert:appVersion}). Radbilder: 3D-Modell aus der App, gerendert mit Blender.",
                    "App views: real screenshots of the app as of {datumk:aufnahme} (version {wert:appVersion}). Bike images: the app’s 3D model, rendered in Blender."],
    "fuss.marken": ["Markennamen gehören ihren Inhabern und dienen nur dazu, die Teile im Katalog zu bezeichnen.",
                    "Brand names belong to their owners and are only used to identify parts in the catalogue."],

    /* ── Rechtsseiten: gemeinsam ── */
    "recht.etikett": ["Rechtliches", "Legal"],
    "recht.zurueck": ["Zur Startseite", "Back to home"],
    "recht.start": ["Startseite", "Home"],
    "fehler.titel": ["Seite nicht gefunden – CrankScore", "Page not found – CrankScore"],
    "fehler.etikett": ["Fehler 404", "Error 404"],
    "fehler.h1": ["Diese Seite gibt es nicht.", "This page doesn’t exist."],
    "fehler.p": ["Vielleicht steckt ein Tippfehler in der Adresse, oder die Seite ist umgezogen. Auf der Startseite findest du alles über CrankScore.",
      "There may be a typo in the address, or the page has moved. You’ll find everything about CrankScore on the home page."],
    "fehler.knopf": ["Zur Startseite", "Go to the home page"],
    /* nur auf Englisch sichtbar (leeres Deutsch blendet den Absatz aus) */
    "recht.hinweis": ["", "This English version is provided for convenience. The German version is legally binding."],

    /* ── Impressum (sprachlich überarbeitet; 2026-10-11: Satz zu Preisen an den App-Stand angepasst, Richtpreise) ── */
    "imp.titel": ["Impressum – CrankScore", "Legal notice – CrankScore"],
    "imp.h1": ["Impressum", "Legal notice"],
    "imp.fehlt": ["Die Angaben zum Anbieter werden derzeit ergänzt.", "The provider details are currently being added."],
    "imp.ddg": ["Angaben gemäß § 5 DDG", "Information pursuant to Section 5 DDG (German Digital Services Act)"],
    "imp.kontakt": ["Kontakt", "Contact"],
    "imp.aff.h": ["Affiliate-Links", "Affiliate links"],
    "imp.aff.p": ["CrankScore wird sich unter anderem über Provisionen finanzieren. Shop-Links in der App, die mit „Anzeige“ gekennzeichnet sind, werden Affiliate-Links sein: Kaufst du nach einem Klick etwas, erhält CrankScore vom Shop eine Provision. Dein Preis ändert sich dadurch nicht. Diese Website selbst enthält keine Affiliate-Links.",
                  "CrankScore will be funded in part through commissions. Shop links in the app that are marked “Ad” will be affiliate links: if you buy something after clicking one, CrankScore receives a commission from the shop. This does not change your price. This website itself contains no affiliate links."],
    "imp.preise.h": ["Preise und Angaben", "Prices and information"],
    "imp.preise.p": ["Preise in der App sind Richtpreise auf UVP-Niveau oder stammen aus geprüften Angeboten von Partnershops und werden dann mit Stand angezeigt; maßgeblich ist der Preis im Shop. Technische Daten und Kompatibilitätsprüfungen sind sorgfältig recherchiert, ersetzen aber nicht das Datenblatt des Herstellers.",
                     "Prices in the app are guide prices at RRP level or come from verified partner-shop offers, which are then shown with their date; the price in the shop is what counts. Technical data and compatibility checks are carefully researched but do not replace the manufacturer’s spec sheet."],

    /* ── Datenschutzerklärung (sprachlich überarbeitet, Inhalt unverändert) ── */
    "ds.titel": ["Datenschutz – CrankScore", "Privacy policy – CrankScore"],
    "ds.h1": ["Datenschutz", "Privacy policy"],
    "ds.kurz": ["<b>Kurz gesagt:</b> Diese Website setzt keine Cookies, nutzt keine Analyse- oder Tracking-Werkzeuge und lädt keine Inhalte von fremden Servern. Diese Erklärung gilt für die Website crankscore.de.",
                "<b>In short:</b> This website sets no cookies, uses no analytics or tracking tools and loads no content from third-party servers. This policy applies to the website crankscore.de."],
    "ds.1.h": ["1. Verantwortlicher", "1. Controller"],
    "ds.1.p": ['Siehe <a href="impressum.html">Impressum</a>.', 'See the <a href="impressum.html">legal notice</a>.'],
    "ds.2.h": ["2. Bereitstellung der Website (Hosting)", "2. Hosting of the website"],
    "ds.2.p": ['Die Website wird über GitHub Pages ausgeliefert, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf verarbeitet GitHub die technisch nötigen Verbindungsdaten, insbesondere deine IP-Adresse, um die Seite auszuliefern und den Dienst abzusichern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist die sichere und stabile Bereitstellung der Website. Für die Übermittlung in die USA stützt sich GitHub auf das EU-US Data Privacy Framework. Details: <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">Datenschutzerklärung von GitHub</a>.',
               'The website is served via GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you visit the site, GitHub processes the connection data that is technically required, in particular your IP address, in order to deliver the site and keep the service secure. The legal basis is Art. 6(1)(f) GDPR; our legitimate interest is providing the website securely and reliably. For transfers to the USA, GitHub relies on the EU-US Data Privacy Framework. Details: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub’s privacy statement</a>.'],
    "ds.3.h": ["3. Schriftarten und Bilder", "3. Fonts and images"],
    "ds.3.p": ["Schriftarten und Bilder liegen auf demselben Server wie die Website. Es gibt keine Verbindung zu Google Fonts oder anderen Schriftdiensten.",
               "Fonts and images are stored on the same server as the website. There is no connection to Google Fonts or any other font service."],
    "ds.4.h": ["4. Sprache und Design", "4. Language and appearance"],
    "ds.4.p": ["Wählst du auf der Website eine Sprache (Deutsch oder Englisch) oder ein Design (hell oder dunkel), speichert dein Browser diese Wahl im lokalen Speicher (localStorage) auf deinem Gerät. Die Angabe wird weder an uns noch an Dritte übertragen und dient nur dazu, die Seite so anzuzeigen, wie du es eingestellt hast (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.",
               "If you choose a language (German or English) or an appearance (light or dark) on the website, your browser saves this choice in local storage (localStorage) on your device. It is not transmitted to us or to third parties and is used solely to display the site the way you set it (Section 25(2) no. 2 TDDDG). You can delete it at any time in your browser settings."],
    "ds.5.h": ["5. Kontakt", "5. Contact"],
    "ds.5.p": ["Schreibst du uns eine E-Mail, verarbeiten wir deine Angaben, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b oder f DSGVO), und löschen sie, sobald sie nicht mehr gebraucht werden.",
               "If you send us an email, we process your details in order to answer your enquiry (Art. 6(1)(b) or (f) GDPR) and delete them once they are no longer needed."],
    "ds.6.h": ["6. Deine Rechte", "6. Your rights"],
    "ds.6.p": ["Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), etwa bei der Behörde deines Bundeslands.",
               "You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21). You can also lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example the authority of your federal state (Bundesland)."],
    "ds.stand": ["Stand: {datumk:dsStand}", "Last updated: {datumk:dsStand}"]
  };

  /* Platzhalter ersetzen, Format nach Sprache (Deutsch: de-DE, Englisch: en-GB) */
  function fuelle(text, sprache){
    var loc = sprache === "en" ? "en-GB" : "de-DE";
    return String(text).replace(/\{(zahl|preis|datum|datumk|wert):([A-Za-z0-9]+)\}/g, function(alles, art, name){
      var w = WERTE[name];
      if(w === undefined) return alles;
      if(art === "wert") return String(w);
      if(art === "zahl") return new Intl.NumberFormat(loc).format(w);
      if(art === "preis"){
        var nachkomma = w % 1 ? 2 : 0;
        return new Intl.NumberFormat(loc, {style:"currency", currency:"EUR", minimumFractionDigits:nachkomma, maximumFractionDigits:nachkomma}).format(w);
      }
      var tag = new Date(w + "T12:00:00Z");
      if(art === "datum") return new Intl.DateTimeFormat(loc, {day:"numeric", month:"long", year:"numeric", timeZone:"UTC"}).format(tag);
      return new Intl.DateTimeFormat(loc, sprache === "en" ? {day:"numeric", month:"short", year:"numeric", timeZone:"UTC"}
                                                           : {day:"2-digit", month:"2-digit", year:"numeric", timeZone:"UTC"}).format(tag);
    });
  }

  window.CS_TEXTE = {werte: WERTE, texte: T, fuelle: fuelle};
})();
