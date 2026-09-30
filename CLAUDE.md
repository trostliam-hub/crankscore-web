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
- Aufbau nach dem Vorbild bevel.health/de, dunkel mit Farbverläufen (Himmel aus drei Wolken,
  Parallaxe): Hero zweispaltig mit gekipptem Gerät (Aufbau-Ansicht), Marken-Laufband,
  Prinzip + Prüfstand, Modi mit klebendem Gerät (am Handy Bühne + Karussell), Guide-Karte
  mit Lichtrand, Federung, Weitere Funktionen, Zahlenband, Datenschutz, Fragen, Schluss.
  Alle Bewegungen fallen bei „weniger Bewegung“ weg; Videos laden erst im Bild; jedes
  Gerät hat einen Pausenknopf in der Legende (WCAG 2.2.2).
- **Design-Loop (2026-09-29/30):** neun Kritikerrunden (Brief/System/Craft), Checkliste
  und bewusste Entscheidungen in `Design-Loop/checkliste.md` (Abschnitt D) — dort nachlesen,
  bevor etwas „verbessert“ wird, das absichtlich so ist. Rundenprotokoll in Obsidian
  „CrankScore Webseite“.
- **Prüfen ohne Kritiker:** im Scratchpad liegen `web_check.py` (statisch: EN-Schlüssel,
  Steuerzeichen, App-Links, Tag-Bilanz, fehlende Dateien, CSS-Klammern) und `web_test3.py`
  (headless Chrome: Screenshots 390/768/1440/1920, Verhalten). Beide vor jedem Push.
- Designsystem-Regeln, die schon zugeschlagen haben: `body` braucht `background:transparent`
  (sonst überdeckt er den fixen Himmel mit `z-index:-1`); Einblenden als **Animation mit
  `backwards`**, nicht als Transition (die überschreibt Hover-Transforms); vor jedem
  Gedankenstrich steht ein `&nbsp;`; Plex-Mono-Subset hat kein ✓/≠ (SVG bzw. Wort); im
  Handy-Block der Modi `align-items:stretch`, sonst scrollt das Karussell nicht.
- Der **Prüfstand** ist eine Darstellung der Seite mit Werten aus der App und ist so
  beschriftet — nicht „Echte App“. Beispielaufbau: Enduro, Radon Swoop AL, Shimano-SLX-Antrieb
  + BB-MT800, Score 99 · 4.343 € · 15,26 kg; alle vier Belege (Hero, Prüfstand, Modi-Beleg,
  Guide-Aufnahme) tragen dieselbe Zahl — bei neuer Aufnahme alle vier prüfen.
- Schriften liegen in `fonts/` (Archivo, Inter, IBM Plex Mono, alle OFL) — nie von Google laden.
- Impressum ist statisch und noch unvollständig (Anbieterangaben fehlen — Liams Entscheidung).
  Wenn Liam die Angaben liefert: hier UND in der App (`links.json`, Feld `betreiber`) eintragen.
- Aufnahmen sind als „Echte App · Beispielanzeige“ gekennzeichnet (EN: „Real app · sample screen · German UI“).
- Die Datei `CNAME` darf nicht weg (Domain crankscore.de).
- Zahlen auf der Seite (738 Teile, 125 Marken, 7 Disziplinen, 15 Federtabellen, 106 Guide-Themen) stammen aus dem Katalog der App,
  Stand 2026-09-29 — bei großen Katalogänderungen nachziehen.
- Veröffentlichen: auf `main` pushen, GitHub Pages baut neu. Kein Stempel nötig.
- `mtb-sw.js` ist ein Aufräum-Service-Worker für Browser, die am 29.09. kurz die App auf
  crankscore.de geöffnet hatten. Nicht löschen, nicht als echten Service Worker umbauen.
- Zweisprachig: Deutsch steht im Markup, Englisch im Wörterbuch `EN` im Skript. Texte tragen
  `data-t="schlüssel"` (Text), `data-th` (mit HTML), `data-t-alt` / `data-t-aria` (Attribute).
  Neuer Text = Schlüssel im Markup UND Eintrag in `EN`. Schalter DE/EN in der Kopfzeile, Wahl in
  `localStorage["cs.sprache"]`; ohne Wahl entscheidet die Browsersprache. Rechtsseiten bleiben deutsch.
