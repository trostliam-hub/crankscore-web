# CrankScore — Webseite

Die **Teaser-Seite** unter **https://crankscore.de** (dieses Repo, GitHub Pages aus `main`).
Die App ist **noch nicht veröffentlicht** (Liam 2026-09-29: „da soll nur ein Teaser sein“) —
die Seite verlinkt die App nicht. Die App liegt im Repo `trostliam-hub/dreambuild` und läuft
zum Testen unter https://trostliam-hub.github.io/dreambuild/. Diese Adresse nie auf der
Webseite nennen. App-Änderungen gehören ins App-Repo, nicht hierher.

- Alles auf Deutsch, Texte im Du. Schlicht, keine Werbesprache.
- Bilder sind echte Bildschirmaufnahmen der App, als Standbilder in `img/s/de/` und `img/s/en/`
  (die Seite tauscht sie mit der Sprache, `img[data-bild]`). Keine gezeichneten Illustrationen als
  Ersatz, keine fremden Produktfotos (Liams Regeln). Die gezeichnete Fahrerfigur der App bleibt
  draußen, bis Liam über die Figuren entschieden hat — die Fit-Karte zeigt deshalb nur Ausschnitte.
  Die alten Videos (`img/v/`) und ungenutzte Bilder sind seit 2026-10-06 entfernt.
- **Helles Design (2026-09-30, Liam: „mit dem Design und solche Bilder die Website designen“):**
  Stil der Werbebilder nach bevel.health — weiße Seite, große Karten mit Farbverlauf (Lila, Nacht,
  Grün, Mint, Blau, Pfirsich), darin ein silbernes Handy mit App-Aufnahme und herausspringende
  App-Karten. Bühnen rechnen in `cqw`, alles skaliert mit der Kartenbreite. Nichts doppelt zeigen:
  was als Karte herausspringt, darf im Handy dahinter nicht zu sehen sein. Bewegung (Einblenden,
  leichtes Schweben, Laufband) fällt bei „weniger Bewegung“ weg.
- **Design-Loop (2026-09-29/30, dunkles Design — gilt für das helle nur noch, wo es passt):** neun Kritikerrunden (Brief/System/Craft), Checkliste
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
- Beispielaufbau aller Aufnahmen: Traumrad Trail, Specialized Stumpjumper Alloy, Score 99 ·
  6.247 € · 14,27 kg, Fahrer 182 cm / 78 kg. Bei neuen Aufnahmen alle Zahlen auf der Seite prüfen.
- Schriften liegen in `fonts/` (Archivo, Inter, IBM Plex Mono, alle OFL) — nie von Google laden.
- Impressum ist statisch und noch unvollständig (Anbieterangaben fehlen — Liams Entscheidung).
  Wenn Liam die Angaben liefert: hier UND in der App (`links.json`, Feld `betreiber`) eintragen.
- Aufnahmen sind mit Datum gekennzeichnet: „App-Aufnahme 30.09.2026“ (EN „App screenshot 30 Sep 2026“),
  Ausschnitte „App-Ausschnitte 30.09.2026“ (EN „App crops 30 Sep 2026“) — kurz, damit sie auf 320 px einzeilig bleiben. Neue Aufnahmen = neues Datum. HTML-Nachbauten (Assistent-Knopf,
  Mein-Rad-Hinweis in den Modi) heißen „Nachbau“ und stehen so unter den Modus-Karten — nie als echte Aufnahme ausgeben.
- Die Datei `CNAME` darf nicht weg (Domain crankscore.de).
- Zahlen auf der Seite (766 Teile, 125 Marken, 7 Disziplinen, 15 Federtabellen, 106 Guide-Einträge) am 2026-10-06 selbst
  nachgezählt: `docs/katalog.json` der App (Export 20261001-1533), `FED_TAB` und `GUIDE` in der App-Version 20261005-1544.
  Die Zeile unter dem Zahlenband nennt diesen Stand — bei Katalogänderungen Zahlen UND Zeile nachziehen.
- Preis und Free/Pro-Grenzen kommen aus der App (`PRO_MONAT`, `PRO_JAHR_MONAT`, `PRO_GUIDE_FREI`, `PRO_KULANZ`):
  Stand 2026-10-06 Pro 6,99 € im Monat oder 47,88 € im Jahr, Free ein Rad je Modus und 10 Guide-Fragen am Tag,
  Pro offline 14 Tage. E-MTBs gibt es im Katalog (7 Rahmen). Ändert sich etwas davon, Startbereich, Funktionen,
  Fragen und Datenschutz-Abschnitt in DE und EN anpassen.
- Veröffentlichen: auf `main` pushen, GitHub Pages baut neu (mit Jekyll). Kein Stempel nötig.
- **Nicht veröffentlichen, was intern ist:** `_config.yml` schließt alle `*.md` und `Design-Loop/` aus
  (Prüfbericht 06.10.2026, Befund 02: `CLAUDE.md`, `README.md` und die Checkliste waren unter crankscore.de abrufbar).
  Keine `.nojekyll` anlegen — dann gilt der Ausschluss nicht mehr. Neue interne Dateien dort eintragen.
  Das Repo selbst ist öffentlich: was hier steht, ist auf GitHub lesbar, auch wenn es nicht auf der Seite liegt.
- `mtb-sw.js` ist ein Aufräum-Service-Worker für Browser, die am 29.09. kurz die App auf
  crankscore.de geöffnet hatten. Nicht löschen, nicht als echten Service Worker umbauen.
- Zweisprachig: Deutsch steht im Markup, Englisch im Wörterbuch `EN` im Skript. Texte tragen
  `data-t="schlüssel"` (Text), `data-th` (mit HTML), `data-t-alt` / `data-t-aria` (Attribute).
  Neuer Text = Schlüssel im Markup UND Eintrag in `EN`. Schalter DE/EN in der Kopfzeile, Wahl in
  `localStorage["cs.sprache"]`; ohne Wahl entscheidet die Browsersprache. Rechtsseiten bleiben deutsch.
