# CrankScore — Webseite

Die **Teaser-Seite** unter **https://crankscore.de** (dieses Repo, GitHub Pages aus `main`).
Die App ist **noch nicht veröffentlicht** (Liam 2026-09-29: „da soll nur ein Teaser sein“) —
die Seite verlinkt die App nicht. Die App liegt im Repo `trostliam-hub/dreambuild` und läuft
zum Testen unter https://trostliam-hub.github.io/dreambuild/. Diese Adresse nie auf der
Webseite nennen. App-Änderungen gehören ins App-Repo, nicht hierher.

- Alles auf Deutsch, Texte im Du. Schlicht, keine Werbesprache.
- Bilder sind echte Bildschirmaufnahmen der App: Videos `img/v/*.webm` (VP9) mit animiertem
  WebP als Reserve und Poster-Standbild, erzeugt mit dem Aufnahme-Skript (headless Chrome, siehe
  Obsidian „CrankScore Webseite“). Keine gezeichneten Illustrationen als Ersatz für Bilder, keine
  fremden Produktfotos (Liams Regeln). Die Aufnahme „Fit“ zeigt die gezeichnete Fahrerfigur der
  App und bleibt draußen, bis Liam über die Figuren entschieden hat.
- Aufbau nach dem Vorbild bevel.health/de, aber in OLED-Schwarz: Hero mittig mit gekipptem
  Handy im Lichtstreifen, Marken-Laufband, Prüfstand, drei Modi mit Videos, Guide-Karte mit
  Lichtrand, Federung, Raster, Zahlen, Datenschutz, Fragen. Alle Bewegungen fallen bei
  „weniger Bewegung“ weg; Videos laden erst im Bild.
- Schriften liegen in `fonts/` (Archivo, Inter, IBM Plex Mono, alle OFL) — nie von Google laden.
- Impressum ist statisch und noch unvollständig (Anbieterangaben fehlen — Liams Entscheidung).
  Wenn Liam die Angaben liefert: hier UND in der App (`links.json`, Feld `betreiber`) eintragen.
- Screenshots sind als „Echte App · Beispielanzeige“ gekennzeichnet.
- Die Datei `CNAME` darf nicht weg (Domain crankscore.de).
- Zahlen auf der Seite (738 Teile, 125 Marken, 7 Disziplinen) stammen aus dem Katalog der App,
  Stand 2026-09-29 — bei großen Katalogänderungen nachziehen.
- Veröffentlichen: auf `main` pushen, GitHub Pages baut neu. Kein Stempel nötig.
- `mtb-sw.js` ist ein Aufräum-Service-Worker für Browser, die am 29.09. kurz die App auf
  crankscore.de geöffnet hatten. Nicht löschen, nicht als echten Service Worker umbauen.
- Zweisprachig: Deutsch steht im Markup, Englisch im Wörterbuch `EN` im Skript. Texte tragen
  `data-t="schlüssel"` (Text), `data-th` (mit HTML), `data-t-alt` / `data-t-aria` (Attribute).
  Neuer Text = Schlüssel im Markup UND Eintrag in `EN`. Schalter DE/EN in der Kopfzeile, Wahl in
  `localStorage["cs.sprache"]`; ohne Wahl entscheidet die Browsersprache. Rechtsseiten bleiben deutsch.
