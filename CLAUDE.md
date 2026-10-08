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
- **Prüfen vor jedem Push:** `node werkzeuge/texte.mjs --pruefen` (Schlüssel, Übersetzungen,
  Platzhalter, Sprachmischung, Geviertstriche, gleiches Kopf-Skript auf allen Seiten), dann beide
  Sprachen auf 320–1920 px ansehen (Kopfzeile, Umbrüche, Fuß, Rechtsseiten, Texte nach Klicks).
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
- **Texte zentral in `texte.js`** (seit 2026-10-08, alle drei Seiten): je Schlüssel `["Deutsch", "English"]`.
  Im HTML tragen Elemente nur den Schlüssel: `data-t` (Text), `data-th` (mit HTML), `data-t-aria` / `data-t-alt` /
  `data-t-title` / `data-t-content` (Attribute, auch Titel und Meta-Beschreibungen). Neuer Text = Eintrag in
  `texte.js` + Schlüssel im HTML, danach `node werkzeuge/texte.mjs`: schreibt die deutsche Fassung ins HTML
  (Suchmaschinen und Besucher ohne JavaScript) und setzt die Skript-Version `?v=` neu. Nie Text nur im HTML ändern.
- `seite.js` (alle Seiten) setzt Sprache und Design: Schalter DE/EN in der Kopfzeile aller Seiten und im Fuß, Wahl in
  `localStorage["cs.sprache"]`, ohne Wahl die Browsersprache, Suchmaschinen immer Deutsch; Design in `cs.design`.
  Beides gilt seitenübergreifend und in allen offenen Tabs. Das kleine Skript im `<head>` ist auf allen Seiten gleich
  (setzt das Design vor dem ersten Bild, blendet die Seite für englische Besucher bis zum Umschalten aus, höchstens 2,5 s).
  Ohne JavaScript sind Sprach- und Designschalter und „Seite teilen“ ausgeblendet (`[data-design]`).
- Rechtsseiten gibt es auf Deutsch und Englisch; die englische Fassung trägt den Hinweis, dass die deutsche
  verbindlich ist (`recht.hinweis`). Bei rechtlichen Texten nur sprachlich glätten, die rechtliche Bedeutung nicht
  ändern, nichts ergänzen, was Liam nicht geliefert hat. Datenschutz-„Stand“ nur bei inhaltlicher Änderung anheben.
- Kopfnavigation ab 1024 px (darunter Hero-Knöpfe und Fuß), Fuß darunter zweispaltig — sonst brechen
  „Größe & Fahrwerk“ / „Sizing & suspension“ um.
