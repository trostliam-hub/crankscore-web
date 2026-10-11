# CrankScore — Webseite

Die Website unter **https://crankscore.de** (dieses Repo, GitHub Pages aus `main`). Seit 2026-10-11 ist sie für den
**gemeinsamen Release mit der App** gebaut (Liam: „Website und App sollen beim gemeinsamen Release in Design, Inhalt
und Funktionen übereinstimmen“). Die App liegt im Repo `trostliam-hub/dreambuild` und läuft zum Testen unter
https://trostliam-hub.github.io/dreambuild/. **Diese Testadresse nie auf der Website nennen oder verlinken**
(`werkzeuge/texte.mjs` bricht ab, wenn sie in `appAdresse` steht). App-Änderungen gehören ins App-Repo, nicht hierher.

## Release-Schalter „App öffnen“
- `WERTE.appAdresse` oben in `texte.js`. **Leer = vor dem Release:** alle App-Knöpfe (`a[data-app]`: Kopfzeile, Menü,
  Einstieg, Schluss) heißen „Kommt bald“/„Coming soon“ und öffnen die Frage `#q0` „Wann erscheint CrankScore?“;
  Elemente mit `data-vor-release` sind sichtbar, solche mit `data-nach-release` versteckt.
- **Zum Release:** die endgültige Adresse der App eintragen (nur `https://`, nie die Testadresse), dann
  `node werkzeuge/texte.mjs`. Danach heißen die Knöpfe „App öffnen“/„Open the app“ und führen zur App, die
  Vorab-Inhalte (Frage `#q0`, „Pro ist erhältlich, sobald die App startet“, „Bald startklar“) verschwinden.
- Vor dem Release prüfen, ob die Aussagen dann noch stimmen (siehe „Was die Seite verspricht“ unten).

## Was die Seite verspricht (Stand App-Version 20261011-1532, selbst geprüft am 11.10.2026)
- **Verfügbar** und auf der Seite als Funktion beschrieben: Prüfung (über 20 Regeln), Score aus Kompatibilität und
  Einsatz, Teile finden (Ziel, Marke, Budget; keine Rückschritte; „Behalten sinnvoll“), Vergleich vorher/nachher,
  **Adapter automatisch** (konkrete Artikel je Bremsmarke, vorn/hinten, bleibt/neu/entfällt, Richtpreise),
  Wunschliste mit vier Stufen und Test als Vorschau, Einkaufsliste (als Text kopierbar), Fahrwerk-Setup (Pro),
  Guide auf dem Gerät (Free 10 Fragen/Tag), mehrere Räder (Pro), Offline nach dem ersten Laden (lokal nachgeprüft),
  3D-Ansicht nur beim Propain Spindrift, E-MTBs.
- **Nicht als verfügbar beschrieben:** Live-Preise und Preisvergleich (Secret `PREIS_FEEDS` fehlt, die App zeigt
  „Richtpreis — kein geprüftes Angebot“), direkte Produktlinks (nur bei geprüftem Angebot; derzeit praktisch keine).
  Die Seite sagt nur, *wann* die App „Zum Produkt“ zeigt. Kommen die Feeds, Texte `e1`, `fe.l3`, `q6` neu prüfen.
- **Pro:** 6,99 € im Monat oder 3,99 € im Monat bei jährlicher Zahlung (47,88 € im Jahr), aus der App
  (`PRO_MONAT`, `PRO_JAHR_MONAT`; Liam 2026-10-01). Kauf über Lemon Squeezy, Freischaltung per Code ohne Konto.
  In `links.json` der App fehlen am 11.10. noch die Kauf-Links (`proKauf`, `proKaufJahr`) — vor dem Release klären.
- **Datenschutz:** kein Konto, Daten im Browser-Speicher, Guide auf dem Gerät, für Pro nur der Lizenzcode an
  Lemon Squeezy (höchstens einmal am Tag), Pro offline 14 Tage (`PRO_KULANZ`).
- Zahlen in `WERTE` (766 Teile, 125 Marken, 7 Disziplinen) am 11.10. mit `tools/katalog-export.mjs` aus dem
  veröffentlichten App-Stand gezählt. Bei Katalogänderungen neu zählen.

## Gestaltung (Release-Überarbeitung 2026-10-11)
- **Wie die App** (Designsystem aus APP-REDESIGN-001/BEVEL-002/003 im Austauschordner): warme helle Flächen
  (`--grund #f2f0ec`, Karten `#fbfaf7`), im Dunkeln Anthrazit (`#16181b`/`#1f2226`), **Stahlblau als einziger Akzent**
  (`#2563a8`, dunkel `#8ec2f7`, Knopffläche dunkel `#2f6db0`), Grün/Gelb/Rot nur für Zustände. Keine Verläufe, kein
  Leuchten, keine bunten Karten mehr. Alle Texte ≥ 4,5:1 (axe, 32 Kombinationen).
- **Schrift wie die App:** Überschriften, Zahlen und Maße in **Barlow Semi Condensed** 600/700, Fließtext in Inter.
  Ersatzschriften `Barlow Ersatz` / `Inter Ersatz` mit den Maßen der echten (keine Sprünge beim Nachladen).
  Schriften liegen in `fonts/` (OFL) — nie von Google laden. IBM Plex Mono ist seit 2026-10-11 raus.
- **Marke:** Logo der App (Kettenblatt mit Kurbel, Symbol `#cs-logo` im SVG am Seitenanfang, Stahlblau) und Schriftzug
  „CRANK“ + „SCORE“ (grau) wie am Unterrohr des Beispielrads. Die einzige Stelle mit gesperrten Versalien.
- **Aufbau der Startseite:** Einstieg (Leitsatz der App-Einführung „Dein Rad. Passende Teile. Klarer Plan.“, App-Knopf,
  Rad + Handy) → Für wen (drei Modi) → Produktansicht (Desktop-Aufnahme im Fenster) → Ablauf (4 Schritte) →
  Datenblatt (Seitenansicht mit Rahmenwerten aus dem Katalog) → Funktionen (5 Zeilen mit Handy, 6 Karten) →
  Beispiel (Bremse: größere Scheiben + Adapter, Werte aus der App) → Ehrlich gerechnet → Preise → Fragen → Schluss.
- **Bewegung:** 150/220/300 ms, Kurve `--raus`; Inhalte erscheinen einmal in 300 ms (12 px), Hell/Dunkel per View
  Transition 250 ms, Fragen klappen weich auf. Bei „weniger Bewegung“ steht alles still (Dauer `0s`, kein weiches Scrollen).
- **Kopfzeile:** Navigation ab 1120 px (darunter passt sie auf Deutsch nicht neben die Knöpfe), darunter Menü-Knopf
  mit `<dialog id="menue">`; Sprache/Design unter 760 px nur im Menü; App-Knopf unter 480 px nur im Einstieg und im Menü.
  Rechtsseiten: „Zur Startseite“ erst ab 580 px, unter 380 px kompakter Schriftzug.

## Bilder
- **App-Aufnahmen** sind echte Bildschirmaufnahmen aus dem veröffentlichten App-Stand, je Sprache und Design:
  `img/app/<de|en>/<hell|dunkel>/<szene>[-klein].<avif|webp>` (Handy 720/480 px, Desktop 1600/960 px). Szenen:
  `uebersicht`, `desktop` (Traumrad Propain Spindrift, Enduro, Score 96 — die App zeigt dort das Blender-Rad),
  `pruefung` (Kassette SRAM PG-1230 an Micro Spline), `finden` (Bremsen, Schritt 1 von 3), `vergleich` und `paket`
  (Mein Rad: Stumpjumper Alloy, Pike, XT M8120 203/180, Ziel Bremskraft → 220/203 mit Adaptern, 41 €), `wunsch`,
  `einkauf`. Im Markup steht je Handy ein `<picture class="nur-hell">` und ein `<picture class="nur-dunkel">`
  (CSS zeigt das passende; versteckte `loading="lazy"`-Bilder lädt der Browser nicht). `seite.js` tauscht
  `/en/`↔`/de/`. Aufnahme-Skript und Zustände: `belege/WEB-RELEASE-001/` im Austauschordner des App-Repos.
- **Radbilder** (`img/rad/rad-held|rad-seite|rad-heck[-mittel|-klein].<avif|webp>`, 1600/1200/900 px, transparent):
  mit Blender (`bpy` 5.0.1) aus dem App-Modell `3d/modell/spindrift-5-al.blend` gerendert (Cycles, 160 Samples).
  Rahmen nach Katalog-Geometrie nachgebaut, Anbauteile allgemein, Schriftzug CrankScore statt Herstellerlogo —
  so steht es auch auf der Seite (`blatt.quelle`, `fuss.bilder`). Keine Nahaufnahmen: dort sieht man die
  vereinfachten Anbauteile. Datenblatt-Punkte (`.punkt`, Anteile im Bild) kommen aus derselben Kamera.
- `werkzeuge/bilder.py` erzeugt aus Rohbildern die Web-Fassungen (Pillow ≥ 11.3 mit AVIF): `app <ordner>` und
  `rad <ordner>` (schneidet zu, lässt den Bodenschatten zu den Rändern auslaufen, rechnet Datenblatt-Punkte um).
- Vorschaubild für geteilte Links (`img/vorschau.png`, og:image): `werkzeuge/vorschau.html` (Texte aus `texte.js`,
  Rad aus `img/rad`, Handy `img/app/en/hell/uebersicht`), Anleitung im Kopf der Datei.
- Neue App-Aufnahmen = neues Datum in `WERTE.aufnahme` und `appVersion`, Zahlen im Beispiel (`bsp.*`) und in den
  Alternativtexten (`alt.app.*`) gegen die Aufnahmen prüfen.

## Texte und Sprache
- Deutsch und Englisch gleichwertig, im Deutschen durchgehend Du. Schlicht, keine Werbesprache, keine
  KI-Floskeln. Englisch eigenständig formuliert (britisch: catalogue, tyre, licence), nicht Wort für Wort.
  Keine absoluten Aussagen, die die App nicht belegt; genau sagen, was geprüft, geschätzt oder nur Richtwert ist.
  Vor jedem Halbgeviertstrich ein geschütztes Leerzeichen (` –`, prüft `texte.mjs`), typografische
  Anführungszeichen und Apostrophe. Begriffe wie in der App (Traumrad/Mein Rad/Gebraucht, Wunschliste, Einkauf,
  „Noch zu prüfen“, „Behalten sinnvoll“, Richtpreis).
- **Texte zentral in `texte.js`**: je Schlüssel `["Deutsch", "English"]`. Im HTML tragen Elemente nur den Schlüssel:
  `data-t` (Text), `data-th` (mit HTML), `data-t-aria` / `data-t-alt` / `data-t-title` / `data-t-content`.
  Neuer Text = Eintrag in `texte.js` + Schlüssel im HTML, danach `node werkzeuge/texte.mjs` (schreibt die englische
  Fassung ins HTML, setzt `?v=` neu, prüft Schlüssel, Platzhalter, Sprachmischung, Kopf-Skript). Nie Text nur im HTML ändern.
- Zahlen, Preise und Daten nur in `WERTE` oben in `texte.js`, per Platzhalter (`{zahl:teile}`, `{preis:proMonat}` …).
- **Standardsprache Englisch** (Liam 2026-10-08): erster Besuch, Suchmaschinen und ohne JavaScript immer Englisch.
  `seite.js` speichert nur eine bewusst gewählte Sprache (`cs.sprache`); Design in `cs.design`. `texte.js` lädt nur für
  Deutsch; die Adresse steht am Skript-Tag `<script src="/seite.js?v=…" data-texte="/texte.js?v=…">`, das deshalb VOR
  dem Kopf-Skript stehen muss. Das Kopf-Skript ist auf allen Seiten gleich (Design und `theme-color` vor dem ersten Bild,
  Klasse `sprache-lade` höchstens 2,5 s für gespeichertes Deutsch). Lässt sich Deutsch nicht laden: Meldung auf Deutsch.
- **Statusleiste:** genau ein `<meta name="theme-color">`; Kopf-Skript und `seite.js` setzen es auf die Seitenfarbe
  (hell `#f2f0ec`, dunkel `#16181b`). `body` trägt die Seitenfarbe, die Kopfzeile ist deckend und reicht unter die
  Safe Area. Safari 26 nimmt nach unserem Stand die Farbe von Kopfzeile/Seite statt `theme-color`; nicht auf echtem
  iPhone geprüft.
- Rechtsseiten auf Deutsch und Englisch; die englische Fassung trägt den Hinweis, dass die deutsche verbindlich ist.
  Bei rechtlichen Texten nur sprachlich glätten, nichts ergänzen, was Liam nicht geliefert hat. Ausnahme 2026-10-11:
  der Satz zu Preisen im Impressum (`imp.preise.p`) beschreibt jetzt Richtpreise und geprüfte Angebote wie in der App —
  Liam soll ihn bestätigen. Datenschutz-„Stand“ nur bei inhaltlicher Änderung anheben.
- Impressum ist noch unvollständig (Anbieterangaben fehlen — Liams Entscheidung). Wenn Liam die Angaben liefert:
  hier UND in der App (`links.json`, Feld `betreiber`) eintragen.

## Technik und Veröffentlichen
- Veröffentlichen: auf `main` pushen, GitHub Pages baut neu (mit Jekyll). Nur mit Liams ausdrücklicher Freigabe.
- Die Datei `CNAME` darf nicht weg (Domain crankscore.de). `mtb-sw.js` ist ein Aufräum-Service-Worker für Browser,
  die am 29.09. kurz die App auf crankscore.de geöffnet hatten: nicht löschen, nicht umbauen.
- **Nicht veröffentlichen, was intern ist:** `_config.yml` schließt `*.md`, `Design-Loop/` und `werkzeuge/` aus.
  Keine `.nojekyll` anlegen. Das Repo selbst ist öffentlich.
- `404.html`: Alle Pfade darin absolut (`/recht.css`, `/seite.js`, `/fonts/…`), weil sie unter beliebigen Adressen erscheint.
- **Prüfen vor jedem Push:** `node werkzeuge/texte.mjs --pruefen`, dann beide Sprachen auf 320–1920 px ansehen
  (Kopfzeile, Menü, Umbrüche, Bilder hell/dunkel, Fuß, Rechtsseiten, 404), mit „weniger Bewegung“ und mit Tastatur;
  html-validate, axe. Die Prüfskripte der Überarbeitung liegen im Austauschordner unter `belege/WEB-RELEASE-001/`.
- Ältere Gestaltungsentscheidungen (dunkles/helles Design 2026-09-29 bis 10-08, Design-Loop) stehen in
  `Design-Loop/checkliste.md`; sie gelten nur noch, wo sie zum App-Design passen.
