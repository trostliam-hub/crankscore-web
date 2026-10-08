/* CrankScore – alle Texte der Website an einer Stelle: Startseite, Impressum, Datenschutz.
   Jede Zeile: "schluessel": ["Deutsch", "English"]. Im HTML tragen Elemente den Schluessel als
   data-t (Text), data-th (Text mit HTML), data-t-aria / data-t-alt / data-t-title / data-t-content
   (Attribute). seite.js setzt beim Laden und beim Umschalten die gewaehlte Sprache ein.

   Zahlen, Preise und Daten stehen nur in WERTE und kommen per Platzhalter in die Texte:
   {zahl:x} Zahl, {preis:x} Euro-Betrag, {datum:x} langes Datum, {datumk:x} kurzes Datum,
   {wert:x} unveraendert. Das Format folgt der Sprache (6,99 € / €6.99, 30.09.2026 / 30 Sept 2026).

   Nach jeder Aenderung: node werkzeuge/texte.mjs
   Das schreibt die deutsche Fassung ins HTML (fuer Suchmaschinen und Besucher ohne JavaScript),
   aktualisiert die Versionsnummer der Skripte und prueft, dass kein Schluessel und keine
   Uebersetzung fehlt. Englisch: britische Schreibweise (catalogue, tyre, licence). */
(function(){
  "use strict";

  /* Stand 2026-10-08, nachgezaehlt in der App (Version 20261008-0728): docs/katalog.json
     (Export 20261001-1533), FED_TAB, GUIDE (106 Eintraege, gezeigt als 100+), PRO_MONAT,
     PRO_JAHR_MONAT, PRO_GUIDE_FREI, PRO_KULANZ. Preis laut App: Liam 2026-10-01. */
  var WERTE = {
    teile: 766, marken: 125, disziplinen: 7, federtabellen: 15, guideThemen: 100, pruefregeln: 20,
    emtbRahmen: 7, emtbFullPower: 5, emtbLight: 2,
    proMonat: 6.99, proJahr: 47.88, proJahrMonat: 3.99, guideFrei: 10, proOffline: 14,
    beispielPreis: 6247,
    katalog: "2026-10-01", appVersion: "20261008-0728",
    aufnahme: "2026-09-30",     /* Datum der App-Aufnahmen in img/s/de und img/s/en */
    seitenStand: "2026-10-08",  /* "Stand" im Schluss der Startseite */
    dsStand: "2026-09-30"       /* "Stand" der Datenschutzerklaerung */
  };

  var T = {
    /* ── Kopf der Startseite (Titel, Beschreibung, Vorschau beim Teilen) ── */
    "seite.titel": ["CrankScore – Passen die Teile deines Mountainbikes zusammen?",
                    "CrankScore – Will your mountain bike parts fit together?"],
    "seite.desc": ["CrankScore prüft, ob die Teile deines Mountainbikes zusammenpassen. Plane ein neues Rad, prüfe dein eigenes oder schätze ein Gebrauchtangebot ein.",
                   "CrankScore checks whether the parts on your mountain bike work together. Plan a new bike, check your own or size up a used one."],
    "seite.ogtitel": ["CrankScore – Passen die Teile deines Mountainbikes zusammen?",
                      "CrankScore – Will your mountain bike parts fit together?"],
    "seite.ogdesc": ["Neues Rad planen, eigenes Rad prüfen, Gebrauchtangebot einschätzen. Die Web-App fürs Mountainbike ist in der Testphase.",
                     "Plan a new bike, check your own, size up a used one. The web app for your mountain bike is in testing."],
    "seite.ogbild": ["Vorschaubild von CrankScore: die Überschrift „Passt das zusammen?“ neben einer Beispielansicht der App mit Score 99 und ohne Konflikte.",
      "CrankScore preview image: the German headline asking whether it all fits, next to a sample view of the app with a score of 99 and no conflicts."],

    /* ── Kopfzeile und Navigation ── */
    "weg": ["Zum Inhalt springen", "Skip to content"],
    "marke.aria": ["CrankScore – Startseite", "CrankScore – home"],
    "nav.aria": ["Abschnitte", "Sections"],
    "nav.prinzip": ["Prüfung", "The check"],
    "nav.modi": ["Modi", "Modes"],
    "nav.ablauf": ["So funktioniert’s", "How it works"],
    "nav.fed": ["Größe & Fahrwerk", "Sizing & suspension"],
    "nav.guide": ["Guide", "Guide"],
    "nav.mehr": ["Funktionen", "Features"],
    "nav.fragen": ["Fragen", "FAQ"],
    "sprache.aria": ["Sprache", "Language"],
    "design.aria": ["Dunkles Design", "Dark mode"],
    "bald": ["Kommt bald", "Coming soon"],
    "bald.aria": ["Kommt bald – zum aktuellen Stand", "Coming soon – see the current status"],

    /* ── Einstieg ── */
    "start.etikett": ["Die Web-App fürs Mountainbike", "The web app for your mountain bike"],
    "start.h1": ["Passt das zusammen?", "Does it all fit?"],
    "start.sub": ["Passt die neue Gabel zu deinem Rahmen? Läuft die Kassette auf deinem Freilauf? CrankScore prüft die Maße und Standards deiner Teile und zeigt dir mögliche Konflikte, bevor du etwas kaufst.",
                  "Will the new fork fit your frame? Will that cassette work with your freehub? CrankScore checks the dimensions and standards of your parts and flags potential conflicts before you buy anything."],
    "start.knopf": ["So prüft CrankScore", "How the check works"],
    "start.knopf2": ["Die drei Modi", "The three modes"],
    "start.fakten": ["<span><b>{zahl:teile}</b> Teile</span><span><b>{zahl:marken}</b> Marken</span><span><b>{zahl:disziplinen}</b> Disziplinen</span><span><b>Free</b> kostenlos</span><span><b>Pro</b> {preis:proMonat} im Monat</span>",
                     "<span><b>{zahl:teile}</b> parts</span><span><b>{zahl:marken}</b> brands</span><span><b>{zahl:disziplinen}</b> disciplines</span><span><b>Free</b> to use</span><span><b>Pro</b> {preis:proMonat} a month</span>"],
    "beispiel": ["Beispielansicht", "Sample view"],
    "ausschnitt": ["Beispielausschnitte", "Sample crops"],
    "alt.start": ["Beispielansicht der App: die Teileliste eines Trailbikes, davor Rahmen, Federgabel und Bremsen als Karten mit Preis und Gewicht.",
                  "Sample app view: the parts list of a trail bike, with the frame, fork and brakes shown as cards with price and weight."],

    /* ── Markenband ── */
    "band.aria": ["Marken im Katalog", "Brands in the catalogue"],
    "band.etikett": ["{zahl:marken} Marken im Katalog", "{zahl:marken} brands in the catalogue"],

    /* ── Prüfung und Score ── */
    "prinzip.etikett": ["Die Prüfung", "The check"],
    "prinzip.h2": ["Geprüft, wo Teile aufeinandertreffen", "Checked wherever parts meet"],
    "prinzip.p": ["Kommt ein Teil in deinen Aufbau, prüft CrankScore die Stellen, an denen es auf andere Teile trifft. Gibt es einen Konflikt, siehst du, woran es liegt, und bekommst Vorschläge aus dem Katalog, die ihn lösen können.",
      "When a part goes into your build, CrankScore checks the points where it meets other parts. If something clashes, you see why, along with suggestions from the catalogue that can fix it."],
    "pp1.b": ["Maße", "Dimensions"],
    "pp1.s": ["Federweg-Freigabe, Dämpfermaß, Lenkerklemmung, Stützendurchmesser", "Travel limit, shock size, bar clamp, seatpost diameter"],
    "pp2.b": ["Standards", "Standards"],
    "pp2.s": ["Achsen, Freilauf, Innenlager, Steuersatz, Bremsaufnahme, UDH", "Axles, freehub, bottom bracket, headset, brake mount, UDH"],
    "pp3.b": ["Einsatz", "Purpose"],
    "pp3.s": ["Passt das Teil zu dem, was du fährst, ob Trail, Enduro oder Downhill?", "Does the part suit what you ride, be it trail, enduro or downhill?"],
    "score.h3": ["Dein Score", "Your score"],
    "score.p": ["Eine Zahl von 0 bis 100 für den ganzen Aufbau. Dahinter stehen zwei Werte: Passform zeigt, ob die Teile technisch zusammenpassen, Einsatz, ob sie zu deiner Disziplin passen.",
                "One number from 0 to 100 for your whole build, based on two ratings: fit shows whether the parts work together technically, purpose whether they suit your discipline."],
    "alt.score": ["Beispielansicht: Score 99 von 100, „Stimmig. Alles zieht in Richtung Trail.“ Passform 100, Einsatz 98, {preis:beispielPreis}, 14,27 kg.",
                  "Sample view: score 99 out of 100, “Spot on. Everything pulls towards trail.” Fit 100, purpose 98, {preis:beispielPreis}, 14.27 kg."],
    "pruef.h3": ["Prüfung", "Compatibility check"],
    "pruef.p": ["Mehr als {zahl:pruefregeln} Regeln auf Basis gängiger Standards. Rot heißt: So lässt sich das Rad nicht bauen. Gelb heißt: Es geht, aber mit Kompromiss oder Adapter.",
                "More than {zahl:pruefregeln} rules based on established standards. Red means the bike can’t be built this way. Yellow means it works, but with a compromise or an adapter."],
    "alt.pruef": ["Beispielansicht: Die Prüfung meldet keine Konflikte, alle Maße passen.",
                  "Sample view: the check finds no conflicts and every dimension matches."],

    /* ── Drei Modi ── */
    "modi.etikett": ["Drei Modi", "Three modes"],
    "modi.h2": ["Neues Rad, dein Rad oder ein gebrauchtes", "A new bike, your bike or a used one"],
    "modi.p": ["Wähle, worum es geht. Die Prüfung ist in allen drei Modi dieselbe, nur der Ausgangspunkt ändert sich.",
               "Pick what you’re working on. The check is the same in all three modes; only the starting point changes."],
    "weg1.etikett": ["Traumrad", "Dream bike"],
    "weg1.h3": ["Ein neues Rad planen", "Plan a new bike"],
    "weg1.p": ["Du legst Disziplin, Budget und Wunschmarken fest. Der Assistent stellt daraus einen kompletten Aufbau zusammen, der die Prüfung ohne Konflikt besteht. Danach tauschst du, was du anders haben willst.",
               "Set your discipline, budget and favourite brands. The assistant puts together a complete build that passes the check without any conflicts. Then you swap whatever you’d like to change."],
    "weg1.beleg": ["Beispiel: Score 99 · {preis:beispielPreis}", "Example: score 99 · {preis:beispielPreis}"],
    "alt.m1": ["Nachbau eines Knopfs aus der App: Traumrad-Assistent – Disziplin, Budget, Marken und ein fertiger Aufbau.",
               "Recreated app button: Dream bike assistant – discipline, budget, brands and a finished build."],
    "m1.titel": ["Traumrad-Assistent", "Dream bike assistant"],
    "m1.sub": ["Disziplin, Budget, Marken – und ein fertiger Aufbau.", "Discipline, budget, brands – and a finished build."],
    "weg2.etikett": ["Mein Rad", "My bike"],
    "weg2.h3": ["Dein Rad prüfen", "Check your bike"],
    "weg2.p": ["Wie stimmig ist dein Rad, und passt das Teil, das du im Auge hast? Die App zeigt dir, was nicht zusammenpasst, und schlägt Teile vor, die den Konflikt lösen können.",
      "How well does your bike hang together, and will the part you’ve got your eye on fit? The app shows you what doesn’t work together and suggests parts that can resolve the conflict."],
    "alt.m2": ["Nachbau eines Hinweises aus der App: Trag ein, was an deinem Rad ist, und fang beim Rahmen an.",
               "Recreated app hint: enter what’s on your bike, starting with the frame."],
    "m2.titel": ["Trag ein, was an deinem Rad ist", "Enter what’s on your bike"],
    "m2.text": ["Fang beim Rahmen an – der legt Laufradgröße, Achsmaße und Tretlager fest und grenzt damit alles andere ein. Was du nicht weißt, lässt du offen; bewertet wird nur, was drin steht.",
                "Start with the frame – it sets wheel size, axle dimensions and bottom bracket and so narrows down everything else. Leave open what you don’t know; only what’s entered gets rated."],
    "weg3.etikett": ["Gebrauchtrad", "Used bike"],
    "weg3.h3": ["Ein Angebot einschätzen", "Check a used listing"],
    "weg3.p": ["Trag die Teile aus der Anzeige ein, dazu Modelljahr, Zustand und Preis. Die App schätzt den Gebrauchtwert und zeigt, ob der Preis fair wirkt und ob dir das Rad passt. Eine Besichtigung ersetzt das nicht.",
               "Enter the parts from the listing, plus model year, condition and asking price. The app estimates the used value and shows whether the price looks fair and whether the bike fits you. It’s no substitute for seeing the bike in person."],
    "alt.m3": ["Beispielansicht: ein Angebot einschätzen, Modelljahr 2023, Zustand „gepflegt, normale Spuren“.",
               "Sample view: checking a listing, model year 2023, condition “well kept, normal wear”."],
    "modi.quelle": ["Knopf und Hinweis in den ersten beiden Karten sind der App nachgebaut. Die dritte Karte zeigt eine Beispielansicht vom {datumk:aufnahme}.",
                    "The button and hint in the first two cards are recreated from the app. The third card shows a sample view from {datumk:aufnahme}."],

    /* ── So funktioniert's ── */
    "ablauf.etikett": ["So funktioniert’s", "How it works"],
    "ablauf.h2": ["In drei Schritten zum Score", "Three steps to your score"],
    "ablauf.p": ["Kein Konto, keine Anmeldung. Maße und Standards musst du nicht im Kopf haben, die App kennt sie für die Teile im Katalog.",
      "No account, no sign-up. You don’t need to know dimensions and standards by heart; the app knows them for the parts in its catalogue."],
    "s1.h3": ["Modus wählen", "Choose a mode"],
    "s1.p": ["Neues Rad, dein eigenes oder ein Gebrauchtangebot. Du brauchst nur eine Idee, was du fahren willst, die Teileliste deines Rads oder die Anzeige.",
      "A new bike, your own or a used one. All you need is an idea of what you want to ride, your bike’s spec or the listing."],
    "s1.a": ["Traumrad", "Dream bike"],
    "s1.b": ["Mein Rad", "My bike"],
    "s1.c": ["Gebrauchtrad", "Used bike"],
    "s2.h3": ["Teile eintragen", "Add your parts"],
    "s2.p": ["Gabel, Dämpfer, Laufräder, Antrieb: Bei jeder Auswahl siehst du sofort, welche Teile zu deinem Aufbau passen und welche nicht.",
             "Fork, shock, wheels, drivetrain: each time you pick a part, you can see straight away which options suit your build and which don’t."],
    "s2.a": ["Rahmen", "Frame"],
    "s2.b": ["Federgabel", "Fork"],
    "s2.c": ["Dämpfer · 190×45", "Shock · 190×45"],
    "s3.h3": ["Score und nächsten Schritt sehen", "See your score and next step"],
    "s3.p": ["Du bekommst den Score, die gefundenen Konflikte mit Lösungsvorschlägen und den einen Schritt, der dein Rad gerade am meisten weiterbringt. Mit Pro kommen Startwerte fürs Fahrwerk dazu.",
      "You get the score, any conflicts with suggested fixes and the one step that would improve your bike most right now. Pro adds starting values for your suspension."],
    "s3.a": ["Stimmig.", "Spot on."],
    "s3.b": ["Keine Konflikte.", "No conflicts."],

    /* ── Größe, Fahrwerk, Upgrades ── */
    "funk.etikett": ["Auf dich abgestimmt", "Set up for you"],
    "funk.h2": ["Dein Körper, dein Fahrstil", "Your body, your riding style"],
    "funk.p": ["Ob ein Rad wirklich passt, hängt nicht nur an den Teilen. CrankScore rechnet auch mit deinen Körpermaßen, deinem Gewicht und deiner Fahrweise.",
               "Whether a bike really works for you isn’t only about the parts. CrankScore also takes your body measurements, your weight and your riding style into account."],
    "fit.h3": ["Deine Größe", "Your sizing"],
    "fit.p": ["Aus deiner Körpergröße und, wenn du willst, Schrittlänge, Schulterbreite und Spannweite schätzt die App Rahmengröße, Lenkerbreite, Vorbau, Kurbellänge und Hub der Variostütze. Das sind Richtwerte, kein Bikefitting.",
              "From your height, plus your inseam, shoulder width and arm span if you like, the app estimates frame size, bar width, stem length, crank length and dropper travel. These are guide values, not a professional bike fit."],
    "alt.fit": ["Beispielausschnitte bei 182 cm Körpergröße: Rahmengröße L, Lenkerbreite 800 mm, Vorbau 40 bis 50 mm.",
                "Sample crops for a rider 182 cm tall: frame size L, bar width 800 mm, stem 40 to 50 mm."],
    "fed.h3": ["Fahrwerk", "Suspension"],
    "fed.kurz": ["Startwerte für Gabel und Dämpfer: das Sag-Ziel, also wie tief das Fahrwerk unter dir einsinken soll, dazu Zug- und Druckstufe in Klicks, gezählt wie auf dem Knopf. Einen Luftdruck nennt die App nur, wenn er belegt ist, etwa durch die Herstellertabelle für Modell und Baujahr deiner Gabel. Sonst führt sie dich mit einer Sag-Messung zum passenden Wert.",
                 "Starting values for fork and shock: a sag target, meaning how far the suspension should settle under your weight, plus rebound and compression in clicks, counted the way your dial is marked. The app only gives an air pressure when it’s backed up, for example by the manufacturer’s table for your fork’s model and year. Otherwise it walks you through a sag measurement to find the right value."],
    "alt.fed": ["Beispielausschnitte: Fahrprofil mit 78 kg, ruppigen Trails und zügigem Tempo; Startwert für die Federgabel 75 psi (5,2 bar) bei 18 % Sag.",
                "Sample crops: riding profile with 78 kg, rough trails and a brisk pace; fork starting value 75 psi (5.2 bar) at 18% sag."],
    "up.h3": ["Upgrades & Einkaufsliste", "Upgrades & shopping list"],
    "up.p": ["Unter Upgrades stehen nur Teile, die mindestens gleichwertig sind und besser abschneiden. Beim Planen zeigt die App auch günstigere Alternativen und sagt dir, was sich dabei ändert, etwa weniger Federweg. Die Einkaufsliste sammelt alles, mit Shop-Links oder als Text für deine Werkstatt.",
             "Upgrades only lists parts that are at least as good and score higher. When you’re planning, the app also shows cheaper alternatives and tells you what changes, such as less travel. The shopping list gathers everything, with shop links or as text for your workshop."],
    "alt.up": ["Beispielansichten: Upgrade auf den Reifen Maxxis Minion DHR II für einen Punkt mehr, daneben die Einkaufsliste mit 19 Teilen für {preis:beispielPreis}.",
               "Sample views: an upgrade to the Maxxis Minion DHR II tyre for one more point, next to the shopping list with 19 parts for {preis:beispielPreis}."],

    /* ── Guide ── */
    "guide.etikett": ["Der Guide", "The guide"],
    "guide.h2": ["Etwas unklar? Frag den Guide.", "Not sure? Ask the guide."],
    "guide.p": ["Der Guide beantwortet Fragen zu deinem Rad und zur Technik dahinter, direkt in der App. Er funktioniert offline und schickt nichts an einen KI-Dienst.",
      "The guide answers questions about your bike and the tech behind it, right inside the app. It works offline and doesn’t send anything to an AI service."],
    "g1.h3": ["Kennt dein Rad", "Knows your bike"],
    "g1.p": ["„Was fehlt zur 100?“ oder „Taugt mein Rad für Enduro?“ Der Guide rechnet die Antwort mit deinem Aufbau aus.",
             "“What’s missing for 100?” or “Is my bike up to enduro?” The guide works out the answer from your build."],
    "g2.h3": ["Prüft Teile", "Checks parts"],
    "g2.p": ["„Passt eine Fox 38?“ Der Guide sucht das Teil im Katalog und prüft, ob es an deinem Rad neue Konflikte gäbe.",
             "“Will a Fox 38 fit?” The guide finds the part in the catalogue and checks whether it would cause new conflicts on your bike."],
    "g3.h3": ["Erklärt Begriffe", "Explains the jargon"],
    "g3.p": ["Boost, Freilauf, Sag, HSC: in einfachen Worten, auch wenn du neu dabei bist.",
             "Boost, freehub, sag, HSC: in plain words, even if you’re new to this."],
    "g4.h3": ["Bringt dich hin", "Takes you there"],
    "g4.p": ["Unter den Antworten führen Knöpfe direkt zur passenden Stelle in der App.",
      "Buttons under the answers take you straight to the right place in the app."],
    "alt.guide": ["Beispielansicht des Guides: Auf „Passt eine Fox 38?“ nennt er die Fox 38 Factory für 1.549 €, gebaut für Enduro und Downhill, und meldet, dass ihr Federweg die Freigabe des Rahmens übersteigt.",
                  "Sample view of the guide: asked “Will a Fox 38 fit?”, it names the Fox 38 Factory at €1,549, built for enduro and downhill, and reports that its travel exceeds the frame’s limit."],

    /* ── Weitere Funktionen und Zahlen ── */
    "mehr.etikett": ["Weitere Funktionen", "More features"],
    "mehr.h2": ["Was sonst noch drinsteckt", "What else it can do"],
    "k4.h3": ["Datensicherung", "Backup"],
    "k4.p": ["Sichere Räder, Fahrerprofil, Setup und Notizen als Datei, auf Wunsch mit Fotos, und lade sie später wieder.",
             "Save your bikes, rider profile, setup and notes to a file, photos included if you like, and load them again later."],
    "k5.h3": ["Modelljahr", "Model year"],
    "k5.p": ["Ältere Jahrgänge kosten weniger, deshalb greift der Assistent bei knappem Budget auch zu einem älteren Rahmenjahrgang. Die Prüfung kennt außerdem Änderungen zwischen den Jahrgängen, etwa beim UDH.",
      "Older model years cost less, so the assistant may fall back on an older frame year when the budget is tight. The check also knows about changes between model years, such as UDH."],
    "k6.h3": ["Mehrere Räder", "Several bikes"],
    "k6.p": ["Jedes Rad behält seinen eigenen Aufbau. In Free hast du ein Rad pro Modus, mit Pro so viele, wie du willst.",
             "Each bike keeps its own build. Free gives you one bike per mode, Pro as many as you like."],
    "k7.h3": ["Dein Top-Cap-Foto", "Your top-cap photo"],
    "k7.p": ["Fotografier die Einstellknöpfe deiner Gabel und tipp sie an. Die App schreibt die Einstellung direkt ins Foto, und das Foto bleibt auf deinem Gerät.",
             "Take a photo of your fork’s adjusters and tap each one. The app writes the setting straight onto the photo, which stays on your device."],
    "k8.h3": ["Deutsch und Englisch", "German and English"],
    "k8.p": ["Die ganze App gibt es in beiden Sprachen, mit Preisen und Zahlen im passenden Format.",
             "The whole app is available in both languages, with prices and numbers in the right format."],
    "k9.h3": ["Funktioniert offline", "Works offline"],
    "k9.p": ["Nach dem ersten vollständigen Laden läuft die App ohne Netz, auf dem Trail wie in der Werkstatt. Nur aktuelle Preise brauchen eine Verbindung, und Pro bleibt offline {zahl:proOffline} Tage aktiv.",
             "Once it has fully loaded, the app works without a connection, on the trail or in the workshop. Only current prices need a signal, and Pro stays active offline for {zahl:proOffline} days."],
    "zahlen.aria": ["Der Katalog in Zahlen", "The catalogue in numbers"],
    "z1.zahl": ["{zahl:teile}", "{zahl:teile}"],
    "z1": ["Teile", "parts"],
    "z2.zahl": ["{zahl:marken}", "{zahl:marken}"],
    "z2": ["Marken", "brands"],
    "z3.zahl": ["{zahl:disziplinen}", "{zahl:disziplinen}"],
    "z3": ["Disziplinen", "disciplines"],
    "z4.zahl": ["{zahl:federtabellen}", "{zahl:federtabellen}"],
    "z4": ["Federtabellen", "suspension tables"],
    "z5.zahl": ["{zahl:guideThemen}+", "{zahl:guideThemen}+"],
    "z5": ["Guide-Themen", "guide topics"],
    "zahlen.quelle": ["Gezählt in der App: Katalog vom {datumk:katalog}, App-Version {wert:appVersion}.",
                      "Counted in the app: catalogue from {datumk:katalog}, app version {wert:appVersion}."],

    /* ── Datenschutz (Abschnitt auf der Startseite) ── */
    "daten.etikett": ["Datenschutz", "Privacy"],
    "daten.h2": ["Deine Räder bleiben auf deinem Gerät", "Your bikes stay on your device"],
    "daten.p": ["Die App braucht für deine Daten keinen Server: Prüfung, Score und die Antworten des Guides berechnet sie direkt auf deinem Gerät.",
      "The app doesn’t need a server for your data: it works out the check, the score and the guide’s answers right on your device."],
    "d1.h3": ["Kein Konto", "No account"],
    "d1.p": ["Keine Anmeldung, kein Passwort. Kaufst du Pro, gibst du deine E-Mail-Adresse bei Lemon Squeezy an, dem Anbieter, über den der Kauf läuft. Die App speichert nur den Lizenzcode.",
             "No sign-up, no password. If you buy Pro, you give your email address to Lemon Squeezy, which handles the purchase. The app only stores the licence code."],
    "d2.h3": ["Alles auf deinem Gerät", "Everything on your device"],
    "d2.p": ["Räder, Maße, Setup und Fotos liegen im Speicher deines Browsers. Willst du die Browserdaten löschen oder das Gerät wechseln, sichere vorher alles als Datei.",
      "Bikes, measurements, setup and photos live in your browser’s storage. Before you clear your browser data or switch devices, back everything up to a file."],
    "d3.h3": ["Kein Tracking", "No tracking"],
    "d3.p": ["Keine Analyse-Werkzeuge, keine Cookies. Deine Einträge verlassen dein Gerät nicht. Nur mit Pro prüft die App höchstens einmal am Tag den Lizenzcode bei Lemon Squeezy.",
             "No analytics, no cookies. Your entries never leave your device. Only with Pro does the app check the licence code with Lemon Squeezy, at most once a day."],

    /* ── Häufige Fragen ── */
    "fragen.etikett": ["Fragen", "FAQ"],
    "fragen.h2": ["Kurz beantwortet", "Quick answers"],
    "fragen.p": ["Das Wichtigste vor dem Start: Stand, Preis und wie verlässlich die Ergebnisse sind.",
                 "The essentials before launch: status, price and how reliable the results are."],
    "f1.q": ["Wann kommt CrankScore?", "When will CrankScore launch?"],
    "f1.a": ["CrankScore wird gerade getestet, einen Starttermin gibt es noch nicht. Wir veröffentlichen die App, sobald Katalog und Prüfung so ausgereift sind, dass du dich darauf verlassen kannst. Neuigkeiten findest du zuerst hier.",
      "CrankScore is currently in testing and there’s no launch date yet. We’ll release the app once the catalogue and the checks are solid enough for you to rely on. You’ll find news here first."],
    "f2.q": ["Was wird CrankScore kosten?", "What will CrankScore cost?"],
    "f2.a": ["Die Grundversion Free ist kostenlos und kommt ohne Konto aus. Pro soll {preis:proMonat} im Monat oder {preis:proJahr} im Jahr kosten, also {preis:proJahrMonat} im Monat, und jederzeit kündbar sein. Dafür gibt es beliebig viele Räder pro Modus (Free: eines), das Fahrwerk-Setup und den Guide ohne Tageslimit (Free: {zahl:guideFrei} Fragen am Tag).",
      "The basic version, Free, costs nothing and works without an account. Pro is set to cost {preis:proMonat} a month or {preis:proJahr} a year, which works out at {preis:proJahrMonat} a month, and you’ll be able to cancel at any time. It gives you as many bikes per mode as you like (Free: one), the suspension setup and the guide without a daily limit (Free: {zahl:guideFrei} questions a day)."],
    "f3.q": ["Was sagt der Score aus?", "What does the score tell me?"],
    "f3.a": ["Der Score fasst deinen Aufbau in einer Zahl von 0 bis 100 zusammen. Passform zeigt, ob die Teile technisch zusammenpassen, Einsatz, ob sie zu deiner Disziplin passen. Ab 85 ist der Aufbau stimmig, ab 60 fahrbar mit Kompromissen, darunter stimmt etwas Grundsätzliches nicht. Bewertet wird nur, was du eingetragen hast.",
             "The score sums up your build in one number from 0 to 100. Fit shows whether the parts work together technically, purpose whether they suit your discipline. From 85 the build is coherent, from 60 it’s rideable with compromises, and below that something fundamental is wrong. Only the parts you’ve entered are rated."],
    "f4.q": ["Wie verlässlich sind die Ergebnisse?", "How reliable are the results?"],
    "f4.a": ["Die Prüfung arbeitet mit Maßen und Standards aus Herstellerangaben. Sie kennt die gängigen Normen, aber nicht jede Besonderheit eines einzelnen Rahmenjahrgangs. Gebrauchtwerte sind Schätzungen, Fahrwerkswerte sind Startpunkte zum Feinstellen. Vor dem Kauf gilt das Datenblatt des Herstellers.",
             "The check works with dimensions and standards taken from manufacturer data. It knows the common standards, but not every quirk of a particular frame year. Used values are estimates, and suspension settings are starting points for fine-tuning. Before you buy, the manufacturer’s spec sheet has the final say."],
    "f5.q": ["Gibt es E-MTBs?", "Does it cover e-MTBs?"],
    "f5.a": ["Ja, aber die Auswahl ist noch klein: Im Katalog stehen {zahl:emtbRahmen} E-MTB-Rahmen, {zahl:emtbFullPower} mit Full-Power-Motor (Bosch, Shimano, Specialized) und {zahl:emtbLight} Light-E-Modelle mit kleinerem Motor (TQ, Shimano), dazu passende Kurbeln und Laufräder. Die App prüft, ob die Kurbel zur Motorwelle passt und ob Bremsen und Laufräder das Mehrgewicht aushalten. Das Fahrwerk-Setup rechnet Motor und Akku mit ein.",
             "Yes, though the selection is still small: the catalogue has {zahl:emtbRahmen} e-MTB frames, {zahl:emtbFullPower} with full-power motors (Bosch, Shimano, Specialized) and {zahl:emtbLight} light e-MTBs with smaller motors (TQ, Shimano), plus matching cranks and wheels. The app checks whether the crank fits the motor spindle and whether brakes and wheels can handle the extra weight. The suspension setup accounts for the motor and battery."],
    "f6.q": ["Gibt es CrankScore im App Store?", "Is CrankScore in the app stores?"],
    "f6.a": ["Nein, das ist Absicht: CrankScore läuft im Browser. Auf dem Handy legst du die App auf den Startbildschirm, dann öffnet sie sich wie jede andere App.",
             "No, and that’s deliberate: CrankScore runs in your browser. On your phone you can add it to your home screen, and it then opens like any other app."],
    "f7.q": ["Wie finanziert sich CrankScore?", "How is CrankScore funded?"],
    "f7.a": ["Über Pro und über Partnerlinks. Manche Shop-Links in der App werden mit „Anzeige“ gekennzeichnet sein. Kaufst du darüber, bekommt CrankScore eine kleine Provision, für dich bleibt der Preis gleich. Welches Teil passt, entscheidet die Prüfung, nicht die Provision.",
             "Through Pro and partner links. Some shop links in the app will be marked “Ad”. If you buy through one, CrankScore earns a small commission and your price stays the same. Which part fits is decided by the check, not by the commission."],

    /* ── Schluss ── */
    "schluss.h2": ["Kommt bald.", "Coming soon."],
    "schluss.p": ["Bis zum Start feilen wir weiter an Katalog und Prüfung. Kennst du jemanden, der gerade ein Rad plant oder ein gebrauchtes sucht? Dann teil die Seite.",
      "Until launch, we’re still fine-tuning the catalogue and the checks. Know someone who’s planning a bike or looking for a used one? Share this page with them."],
    "schluss.stand": ["Stand: {datum:seitenStand}", "Last updated: {datum:seitenStand}"],
    "schluss.knopf": ["Seite teilen", "Share this page"],
    "schluss.kopiert": ["Link kopiert", "Link copied"],  /* erscheint nach dem Klick auf "Seite teilen" */

    /* ── Fuß ── */
    "fuss.claim": ["Mountainbikes planen, prüfen und einschätzen. Teil für Teil.", "Plan, check and size up mountain bikes, part by part."],
    "fuss.h1": ["Inhalt", "On this page"],
    "fuss.h2": ["Rechtliches", "Legal"],
    "fuss.imp": ["Impressum", "Legal notice"],
    "fuss.ds": ["Datenschutz", "Privacy policy"],
    "fuss.h3": ["Sprache", "Language"],
    "fuss.h4": ["Design", "Appearance"],
    "design.hell": ["Hell", "Light"],
    "design.dunkel": ["Dunkel", "Dark"],
    "design.auto": ["Wie Gerät", "Match device"],
    "fuss.bilder": ["Alle App-Bilder sind Beispielansichten aus der Testversion vom {datumk:aufnahme}.",
                    "All app images are sample views from the test version of {datumk:aufnahme}."],
    "fuss.marken": ["Markennamen gehören ihren Inhabern und dienen nur dazu, die Teile im Katalog zu bezeichnen.",
                    "Brand names belong to their owners and are only used to identify parts in the catalogue."],

    /* ── Rechtsseiten: gemeinsam ── */
    "recht.etikett": ["Rechtliches", "Legal"],
    "recht.zurueck": ["Zur Startseite", "Back to home"],
    "recht.start": ["Startseite", "Home"],
    /* nur auf Englisch sichtbar (leeres Deutsch blendet den Absatz aus) */
    "recht.hinweis": ["", "This English version is provided for convenience. The German version is legally binding."],

    /* ── Impressum (sprachlich überarbeitet, Inhalt unverändert) ── */
    "imp.titel": ["Impressum – CrankScore", "Legal notice – CrankScore"],
    "imp.h1": ["Impressum", "Legal notice"],
    "imp.fehlt": ["Die Angaben zum Anbieter werden derzeit ergänzt.", "The provider details are currently being added."],
    "imp.ddg": ["Angaben gemäß § 5 DDG", "Information pursuant to Section 5 DDG (German Digital Services Act)"],
    "imp.kontakt": ["Kontakt", "Contact"],
    "imp.aff.h": ["Affiliate-Links", "Affiliate links"],
    "imp.aff.p": ["CrankScore wird sich unter anderem über Provisionen finanzieren. Shop-Links in der App, die mit „Anzeige“ gekennzeichnet sind, werden Affiliate-Links sein: Kaufst du nach einem Klick etwas, erhält CrankScore vom Shop eine Provision. Dein Preis ändert sich dadurch nicht. Diese Website selbst enthält keine Affiliate-Links.",
                  "CrankScore will be funded in part through commissions. Shop links in the app that are marked “Ad” will be affiliate links: if you buy something after clicking one, CrankScore receives a commission from the shop. This does not change your price. This website itself contains no affiliate links."],
    "imp.preise.h": ["Preise und Angaben", "Prices and information"],
    "imp.preise.p": ["Preise stammen aus den Produktdaten der Partnershops und werden mit Zeitstempel angezeigt; maßgeblich ist der Preis im Shop. Technische Daten und Kompatibilitätsprüfungen sind sorgfältig recherchiert, ersetzen aber nicht das Datenblatt des Herstellers.",
                     "Prices come from the partner shops’ product data and are shown with a timestamp; the price in the shop is what counts. Technical data and compatibility checks are carefully researched but do not replace the manufacturer’s spec sheet."],

    /* ── Datenschutzerklärung (sprachlich überarbeitet, Inhalt unverändert) ── */
    "ds.titel": ["Datenschutz – CrankScore", "Privacy policy – CrankScore"],
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
