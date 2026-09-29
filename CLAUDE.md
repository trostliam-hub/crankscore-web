# CrankScore — Webseite

Die **Teaser-Seite** unter **https://crankscore.de** (dieses Repo, GitHub Pages aus `main`).
Die App ist **noch nicht veröffentlicht** (Liam 2026-09-29: „da soll nur ein Teaser sein“) —
die Seite verlinkt die App nicht. Die App liegt im Repo `trostliam-hub/dreambuild` und läuft
zum Testen unter https://trostliam-hub.github.io/dreambuild/. Diese Adresse nie auf der
Webseite nennen. App-Änderungen gehören ins App-Repo, nicht hierher.

- Alles auf Deutsch, Texte im Du. Schlicht, keine Werbesprache.
- Bilder sind echte Screenshots der App (`img/*.webp`). Keine gezeichneten Illustrationen
  als Ersatz für Bilder, keine fremden Produktfotos (Liams Regeln).
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
