# CrankScore — Webseite

Die **Teaser-Seite** unter **https://crankscore.de** (dieses Repo, GitHub Pages aus `main`).
Die App ist **noch nicht veröffentlicht** (Liam 2026-09-29: „da soll nur ein Teaser sein“) —
die Seite verlinkt die App nicht. Die App liegt im Repo `trostliam-hub/dreambuild` und läuft
zum Testen unter https://trostliam-hub.github.io/dreambuild/. Diese Adresse nie auf der
Webseite nennen. App-Änderungen gehören ins App-Repo, nicht hierher.

- Deutsch und Englisch gleichwertig, im Deutschen durchgehend Du. Schlicht, keine Werbesprache, keine
  KI-Floskeln. Englisch eigenständig formuliert (britisch: catalogue, tyre, licence), nicht Wort für Wort.
  Keine absoluten Aussagen, die die App nicht belegt („jedes Teil passt“, „alle Daten bleiben auf dem Gerät“):
  genau sagen, was geprüft, was geschätzt und was nur ein Startwert ist (Textüberarbeitung 2026-10-08).
  Halbgeviertstrich mit `&nbsp;` davor, typografische Anführungszeichen und Apostrophe.
- Bilder sind echte Bildschirmaufnahmen der App, als Standbilder in `img/s/de/` und `img/s/en/`
  (die Seite tauscht sie mit der Sprache, `img[data-bild]`). Keine gezeichneten Illustrationen als
  Ersatz, keine fremden Produktfotos (Liams Regeln). Die gezeichnete Fahrerfigur der App bleibt
  draußen, bis Liam über die Figuren entschieden hat — die Fit-Karte zeigt deshalb nur Ausschnitte.
  Die alten Videos (`img/v/`) und ungenutzte Bilder sind seit 2026-10-06 entfernt.
- **Bildformate (2026-10-08):** zu jeder Aufnahme `name.webp` gibt es `name.avif` (gleiche Breite) und bei
  720 px (Handy) bzw. 900 px (Karten) breiten Bildern eine kleine Fassung `name-480`/`name-600` als `.avif` und `.webp`.
  Das Markup nutzt `<picture>` (AVIF zuerst) mit `srcset`/`sizes`; die `sizes`-Werte sind gemessen (Breite jedes
  Bildes bei 360–1920 px) -- bei Layout-Änderungen neu messen. Neue Aufnahme erzeugen (ffmpeg mit libaom/libwebp):
  `ffmpeg -i name.webp -c:v libaom-av1 -still-picture 1 -crf 33 -pix_fmt yuv444p name.avif`, klein:
  `-vf scale=480:-2:flags=lanczos` (bzw. 600) einmal mit `-c:v libwebp -quality 82` und einmal als AVIF mit `-crf 32`.
  `seite.js` tauscht beim Sprachwechsel `/de/`↔`/en/` in `src`, `srcset` und den `<source>`-Tags. Startbild
  (Handy im Kopfbereich) lädt sofort (`fetchpriority="high"`), alles andere `loading="lazy"`.
- **Helles Design (2026-09-30, Liam: „mit dem Design und solche Bilder die Website designen“):**
  Stil der Werbebilder nach bevel.health — weiße Seite, große Karten mit Farbverlauf (Lila, Nacht,
  Grün, Mint, Blau, Pfirsich), darin ein silbernes Handy mit App-Aufnahme und herausspringende
  App-Karten. Bühnen rechnen in `cqw`, alles skaliert mit der Kartenbreite. Nichts doppelt zeigen:
  was als Karte herausspringt, darf im Handy dahinter nicht zu sehen sein.
- **Bewegung (2026-10-08, Liam: „cleane Animationen“, meist 150–300 ms):** Variablen `--kurz` 150 ms,
  `--mittel` 200 ms, `--lang` 300 ms, Kurve `--raus`. Knöpfe: beim Zeigen 1 px hoch (nur mit Maus, `(hover:hover)`),
  beim Drücken leicht kleiner; Karten erscheinen einmal in 300 ms (12 px Weg, Geschwister 50 ms versetzt); der
  Startbereich erscheint sofort. Kein dauerndes Schweben mehr. Das Markenband läuft als eine Reihe langsam durch,
  hält beim Zeigen, bei Fokus, außerhalb des Bildes und mit dem Pause-Knopf (WCAG 2.2.2). Fragen klappen weich auf
  (`::details-content`, wo unterstützt). Hell/Dunkel blendet per View Transition in 250 ms über. Bei „weniger
  Bewegung“ steht alles still (Markenband als scrollbare Reihe), nichts blendet über. Keine Bewegung, die Layout
  verschiebt -- nur `opacity`/`transform`.
- **Kopfzeile und Menü:** Navigation ab 1024 px, darunter der Menü-Knopf: `<dialog id="menue">` über die ganze
  Fläche (Tastatur bleibt darin, Esc schließt, Fokus zurück auf den Knopf, Abschnitts-Links schließen und springen).
  Unter 600 px wandern Sprache und Design aus der Kopfzeile ins Menü; unter 360 px zeigt „Kommt bald“ nur den Punkt.
  Kopfzeile deckend, ohne Weichzeichner (`backdrop-filter` kostete beim Scrollen auf Handys Bilder pro Sekunde).
- **Farben und Flächen nur über Variablen** (`--flaeche`, `--zart`, `--schatten-weich`, `--schatten-karte` …); der
  Dunkelmodus setzt die Variablen neu. Dunkler Himmel als feste Ebene `body::before` (nicht
  `background-attachment:fixed`), Glas-Karten ohne `backdrop-filter`.
- **Design-Loop (2026-09-29/30, dunkles Design — gilt für das helle nur noch, wo es passt):** neun Kritikerrunden (Brief/System/Craft), Checkliste
  und bewusste Entscheidungen in `Design-Loop/checkliste.md` (Abschnitt D) — dort nachlesen,
  bevor etwas „verbessert“ wird, das absichtlich so ist. Rundenprotokoll in Obsidian
  „CrankScore Webseite“.
- **Prüfen vor jedem Push:** `node werkzeuge/texte.mjs --pruefen` (Schlüssel, Übersetzungen,
  Platzhalter, Sprachmischung, Geviertstriche, gleiches Kopf-Skript auf allen Seiten), dann beide
  Sprachen auf 320–1920 px ansehen (Kopfzeile, Menü, Umbrüche, Fuß, Rechtsseiten, 404, Texte nach Klicks),
  hell und dunkel, mit „weniger Bewegung“ und mit Tastatur.
- Designsystem-Regeln, die schon zugeschlagen haben: im Dunkelmodus trägt `body` die Grundfarbe (`var(--seite)`, sie
  geht auf die Leinwand über) und der feste Himmel `body::before` liegt mit `z-index:-1` darüber -- `html` bekommt
  keinen eigenen Hintergrund, sonst verdeckt der Body den Himmel; unter „weniger Bewegung“ Dauer `0s`, nicht `.01ms`
  (sonst hinkt die Seitenfarbe der Statusleiste ein Bild hinterher); Einblenden als **Animation mit
  `backwards`**, nicht als Transition (die überschreibt Hover-Transforms); vor jedem
  Gedankenstrich steht ein `&nbsp;`; Plex-Mono-Subset hat kein ✓/≠ (SVG bzw. Wort); im
  Handy-Block der Modi `align-items:stretch`, sonst scrollt das Karussell nicht.
- **Prüfungs-Kachel** (grün, „Prüfung“/„Compatibility check“): Bühne `aspect-ratio:1/.86`, der Ausschnitt mit
  Überschrift und Ergebnis liegt bei `top:62cqw` genau über derselben Zeile im Handy und endet 9 cqw über dem
  Kartenrand; darunter blendet `.blende` (13 cqw) das Handy aus. Gemessen 320–1440 px, DE/EN: Abstand zum Rand
  24–54 px, nichts abgeschnitten. Bei neuer Aufnahme oder anderem Text neu messen.
- Beispielaufbau aller Aufnahmen: Traumrad Trail, Specialized Stumpjumper Alloy, Score 99 ·
  6.247 € · 14,27 kg, Fahrer 182 cm / 78 kg. Bei neuen Aufnahmen alle Zahlen auf der Seite prüfen.
- Schriften liegen in `fonts/` (Inter 4.1, IBM Plex Mono 2.3, beide OFL) — nie von Google laden. Archivo ist seit
  2026-10-08 raus (nur noch die Rechtsseiten nutzten sie). Ersatzschrift `Inter Ersatz` (Arial/Liberation Sans mit
  Inters Maßen) verhindert, dass beim Nachladen von Inter etwas springt.
- Impressum ist statisch und noch unvollständig (Anbieterangaben fehlen — Liams Entscheidung).
  Wenn Liam die Angaben liefert: hier UND in der App (`links.json`, Feld `betreiber`) eintragen.
- Aufnahmen sind als Beispiel gekennzeichnet: „Beispielansicht“ / „Beispielausschnitte“ (EN „Sample view“ /
  „Sample crops“) — kurz, damit sie auf 320 px einzeilig bleiben. Das Aufnahmedatum steht im Fuß (`fuss.bilder`)
  und unter den Modi (`modi.quelle`), der Wert in `WERTE.aufnahme` in `texte.js`. Neue Aufnahmen = neues Datum.
  HTML-Nachbauten (Assistent-Knopf, Mein-Rad-Hinweis in den Modi) heißen „Nachbau“ — nie als echte Aufnahme ausgeben.
- Vorschaubild für geteilte Links (`img/vorschau.png`, og:image): Vorlage `werkzeuge/vorschau.html` (Texte aus
  `texte.js`, Aufnahme `img/s/de/pr.webp`), Anleitung im Kopf der Datei. Bei neuem Slogan oder neuen Aufnahmen neu erzeugen.
- Die Datei `CNAME` darf nicht weg (Domain crankscore.de).
- Zahlen, Preise und Daten stehen nur in `WERTE` oben in `texte.js` und kommen per Platzhalter in die Texte
  (`{zahl:teile}`, `{preis:proMonat}`, `{datum:seitenStand}` …), formatiert je Sprache (6,99 € / €6.99).
  Stand 2026-10-08 selbst nachgezählt: `docs/katalog.json` der App (Export 20261001-1533: 766 Teile, 125 Marken,
  7 Disziplinen), `FED_TAB` (15) und `GUIDE` (106, gezeigt als 100+) in der App-Version 20261008-0728.
  Die Zeile unter dem Zahlenband nennt diesen Stand (`katalog`, `appVersion`) — bei Katalogänderungen mitziehen.
- Preis und Free/Pro-Grenzen kommen aus der App (`PRO_MONAT`, `PRO_JAHR_MONAT`, `PRO_GUIDE_FREI`, `PRO_KULANZ`,
  Kommentar „Preise (Liam 2026-10-01)“): Pro 6,99 € im Monat oder 47,88 € im Jahr, Free ein Rad je Modus und
  10 Guide-Fragen am Tag, Pro offline 14 Tage. Die Fragen sagen „soll … kosten“, solange die App nicht veröffentlicht
  ist; Liams Bestätigung des Preises steht noch aus. E-MTBs: 7 Rahmen (5 Full Power, 2 Light-E). Ändert sich etwas,
  nur `WERTE` in `texte.js` anpassen und `node werkzeuge/texte.mjs` laufen lassen.
- Veröffentlichen: auf `main` pushen, GitHub Pages baut neu (mit Jekyll). Kein Stempel nötig.
- **Nicht veröffentlichen, was intern ist:** `_config.yml` schließt alle `*.md` und `Design-Loop/` aus
  (Prüfbericht 06.10.2026, Befund 02: `CLAUDE.md`, `README.md` und die Checkliste waren unter crankscore.de abrufbar).
  Keine `.nojekyll` anlegen — dann gilt der Ausschluss nicht mehr. Neue interne Dateien dort eintragen.
  Das Repo selbst ist öffentlich: was hier steht, ist auf GitHub lesbar, auch wenn es nicht auf der Seite liegt.
- `mtb-sw.js` ist ein Aufräum-Service-Worker für Browser, die am 29.09. kurz die App auf
  crankscore.de geöffnet hatten. Nicht löschen, nicht als echten Service Worker umbauen.
- **Texte zentral in `texte.js`** (seit 2026-10-08, alle Seiten einschließlich 404): je Schlüssel `["Deutsch", "English"]`.
  Im HTML tragen Elemente nur den Schlüssel: `data-t` (Text), `data-th` (mit HTML), `data-t-aria` / `data-t-alt` /
  `data-t-title` / `data-t-content` (Attribute, auch Titel und Meta-Beschreibungen). Neuer Text = Eintrag in
  `texte.js` + Schlüssel im HTML, danach `node werkzeuge/texte.mjs`: schreibt die englische Fassung ins HTML
  (Suchmaschinen und Besucher ohne JavaScript) und setzt die Skript-Version `?v=` neu. Nie Text nur im HTML ändern.
- **Standardsprache Englisch** (seit 2026-10-08, Liam: „beim ersten Besuch immer auf Englisch, unabhängig von Geräte-
  oder Browsersprache“). `node werkzeuge/texte.mjs` schreibt die englische Fassung ins HTML (`<html lang="en">`, Bilder
  aus `img/s/en/`, `og:locale` `en_GB`); Suchmaschinen, Besucher ohne JavaScript und jeder erste Besuch sehen Englisch.
  Keine Ausnahme für Browsersprache oder Bots.
- `seite.js` (alle Seiten) setzt Sprache und Design: Schalter DE/EN in Kopfzeile, Menü und Fuß. Nur eine bewusst
  gewählte Sprache wird gespeichert (`localStorage["cs.sprache"]`), ohne Wahl gilt immer Englisch; Design in `cs.design`.
  Beides gilt seitenübergreifend und in allen offenen Tabs. **`texte.js` lädt nur, wenn Deutsch gebraucht wird**
  (Erstbesucher laden es nie); die Adresse steht am Skript-Tag `<script src="/seite.js?v=…" data-texte="/texte.js?v=…">`,
  das deshalb VOR dem kleinen Kopf-Skript stehen muss. Das Kopf-Skript ist auf allen Seiten gleich: setzt Design und
  `theme-color` vor dem ersten Bild, blendet die Seite für Besucher mit gespeichertem Deutsch aus (Klasse `sprache-lade`,
  höchstens 2,5 s, damit nichts erst englisch und dann deutsch erscheint) und lädt `texte.js` für sie vorab. Lässt sich
  Deutsch nicht laden, meldet `seite.js` das auf Deutsch (Meldung unten, `CS.melde`) und bleibt englisch, ohne etwas zu
  speichern. Ohne JavaScript sind Sprach- und Designschalter, Menü und „Seite teilen“ ausgeblendet (`[data-design]`).
- **Statusleiste und oberster Rand:** genau ein `<meta name="theme-color">` ohne `media`; Kopf-Skript und `seite.js`
  setzen es auf die Seitenfarbe des aktiven Designs (hell `#f4f4f8` = Kopfzeile, dunkel `#07060d`), auch beim Umschalten.
  `body` trägt `var(--seite)` (färbt auch die Leinwand hinter Safari-Leisten und beim Überscrollen), die Kopfzeile ist
  deckend und reicht mit `padding-top:env(safe-area-inset-top)` unter die Statusleiste (`viewport-fit=cover`). Safari 26
  wertet `theme-color` nach unserem Stand nicht mehr aus und nimmt die Farbe der Kopfzeile bzw. Seite; ist in Safari
  die Website-Tönung („Allow Website Tinting“) aus, folgt die Leiste dem System -- das lässt sich von der Seite aus nicht
  ändern. Auf einem echten iPhone noch nicht geprüft (hier nur Chromium mit nachgestellter Safe Area). Hell ist bewusst `#f4f4f8`, nicht Reinweiß,
  damit Leiste und Kopfzeile eine Fläche bilden.
- `404.html`: eigene Fehlerseite in beiden Sprachen (GitHub Pages zeigt sie für jede unbekannte Adresse). Alle Pfade
  darin absolut (`/recht.css`, `/seite.js`), weil sie unter beliebigen Adressen erscheint.
- Rechtsseiten gibt es auf Deutsch und Englisch; die englische Fassung trägt den Hinweis, dass die deutsche
  verbindlich ist (`recht.hinweis`). Bei rechtlichen Texten nur sprachlich glätten, die rechtliche Bedeutung nicht
  ändern, nichts ergänzen, was Liam nicht geliefert hat. Datenschutz-„Stand“ nur bei inhaltlicher Änderung anheben.
- Fuß unter 1024 px zweispaltig — sonst brechen „Größe & Fahrwerk“ / „Sizing & suspension“ um.
