# CrankScore — Webseite

Website für CrankScore, die Web-App zum Planen, Prüfen und Aufrüsten von Mountainbikes.
Live unter **https://crankscore.de**. Seit 2026-10-11 für den gemeinsamen Release mit der App
gebaut: gleiche Gestaltung (warme Flächen, Stahlblau, Barlow Semi Condensed und Inter, Logo der App),
gleiche Begriffe, nur Funktionen, die im App-Stand tatsächlich funktionieren.

`index.html` mit eingebettetem CSS und JavaScript, dazu Impressum, Datenschutz und eine eigene
404-Seite. Bilder in `img/`: echte App-Aufnahmen je Sprache und Design (`img/app/`) und mit
Blender gerenderte Ansichten des 3D-Rads aus der App (`img/rad/`), jeweils AVIF und WebP in
mehreren Größen. Schriften selbst gehostet in `fonts/` (Inter, Barlow Semi Condensed — SIL Open
Font License, siehe `fonts/OFL-*.txt`).

Keine Abhängigkeiten, keine Cookies, kein Tracking. GitHub Pages veröffentlicht `main` unverändert.

**App öffnen.** Die Adresse der App steht an einer Stelle: `WERTE.appAdresse` in `texte.js`.
Leer (vor dem Release) zeigen alle App-Knöpfe „Kommt bald“ und führen zur Frage
„Wann erscheint CrankScore?“. Mit Adresse heißen sie „App öffnen“ und führen zur App; danach
`node werkzeuge/texte.mjs` ausführen. Die Testadresse der App gehört nie auf die Website.

**Deutsch und Englisch.** Alle Texte aller Seiten stehen in `texte.js`, je Schlüssel
`["Deutsch", "English"]`, Zahlen und Preise oben in `WERTE` (formatiert je Sprache).
Das HTML trägt nur die Schlüssel (`data-t`, `data-th`, `data-t-aria`, `data-t-alt`,
`data-t-title`, `data-t-content`). Nach jeder Textänderung:

    node werkzeuge/texte.mjs            # englische Fassung ins HTML schreiben, Skript-Version setzen
    node werkzeuge/texte.mjs --pruefen  # nur prüfen (fehlende Übersetzungen, Platzhalter, Sprachmischung)

**Englisch ist Standard:** Beim ersten Besuch erscheint die Seite immer englisch, egal welche
Sprache Gerät oder Browser haben. `seite.js` schaltet auf allen Seiten Sprache und Design um und
merkt sich eine gewählte Sprache; `texte.js` lädt es erst, wenn Deutsch gebraucht wird. Unter
1120 px öffnet ein Menü-Knopf alle Abschnitte, App, Sprache und Design (`<dialog>`). Bewegungen
sind kurz (150–300 ms) und entfallen bei „weniger Bewegung“.

**Bilder neu erzeugen.** `werkzeuge/bilder.py app <ordner>` macht aus App-Aufnahmen
(`<szene>-<sprache>-<hell|dunkel>.png`) die Web-Fassungen, `werkzeuge/bilder.py rad <ordner>` aus
Blender-Renderings (schneidet zu, weicher Bodenschatten). Das Vorschaubild für geteilte Links
(`img/vorschau.png`) entsteht aus `werkzeuge/vorschau.html`.

**Hell und dunkel.** Schalter in der Kopfzeile (Mond/Sonne, auch auf Impressum und
Datenschutz), im Menü und im Fuß („Hell“, „Dunkel“, „Wie Gerät“). Die Wahl merkt sich der
Browser (`localStorage` `cs.design`); ohne Wahl folgt die Seite dem Gerät
(`prefers-color-scheme`), ohne JavaScript bleibt sie hell. Die App-Aufnahmen wechseln mit dem
Design. **Icons** für Browser und Google-Suche: `favicon.ico` (16/32/48), `favicon-16x16.png`,
`favicon-32x32.png`, `apple-touch-icon.png` im Hauptverzeichnis, dazu `img/favicon-96.png` und
`img/icon-192.png`. Suchmaschinen und Besucher ohne JavaScript bekommen die englische Fassung.
Statusleiste und oberster Rand (`theme-color`, Hintergrund, Safe Area) folgen dem aktiven Design.
