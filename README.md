# CrankScore — Webseite

Startseite für CrankScore, die Web-App zum Planen, Prüfen und Einschätzen von
Mountainbikes. Live unter **https://crankscore.de** (die App selbst ist noch nicht veröffentlicht).

`index.html` mit eingebettetem CSS und JavaScript, dazu Impressum und Datenschutz, echte
App-Aufnahmen in `img/` und selbst gehostete Schriften in `fonts/` (Archivo, Inter,
IBM Plex Mono — SIL Open Font License, siehe `fonts/OFL-*.txt`).

Keine Abhängigkeiten, keine Cookies, kein Tracking. GitHub Pages veröffentlicht `main` unverändert.

**Deutsch und Englisch.** Alle Texte aller Seiten stehen in `texte.js`, je Schlüssel
`["Deutsch", "English"]`, Zahlen und Preise oben in `WERTE` (formatiert je Sprache).
Das HTML trägt nur die Schlüssel (`data-t`, `data-th`, `data-t-aria`, `data-t-alt`,
`data-t-title`, `data-t-content`). Nach jeder Textänderung:

    node werkzeuge/texte.mjs            # deutsche Fassung ins HTML schreiben, Skript-Version setzen
    node werkzeuge/texte.mjs --pruefen  # nur prüfen (fehlende Übersetzungen, Platzhalter, Sprachmischung)

`seite.js` schaltet auf allen Seiten Sprache und Design um und merkt sich die Wahl.
Das Vorschaubild für geteilte Links (`img/vorschau.png`) entsteht aus `werkzeuge/vorschau.html`.

**Hell und dunkel.** Schalter in der Kopfzeile (Mond/Sonne, auch auf Impressum und
Datenschutz) und im Fuß („Hell“, „Dunkel“, „Wie Gerät“). Die Wahl merkt sich der
Browser (`localStorage` `cs.design`); ohne Wahl folgt die Seite dem Gerät
(`prefers-color-scheme`), ohne JavaScript bleibt sie hell. Ein kleines Skript im
Kopf jeder Seite setzt `data-design="hell|dunkel"` vor dem ersten Bild, `seite.js`
übernimmt den Rest. **Icons** für Browser und Google-Suche: `favicon.ico`
(16/32/48), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` im
Hauptverzeichnis, dazu `img/favicon-96.png` und `img/icon-192.png`. Suchmaschinen
bekommen immer die deutsche Fassung, auch wenn sie sich als englischer Browser melden.
