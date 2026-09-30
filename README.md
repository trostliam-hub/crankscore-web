# CrankScore — Webseite

Startseite für [CrankScore](https://app.crankscore.de), die App zum Planen, Prüfen und
Bewerten von Mountainbikes. Live unter **https://crankscore.de**.

Eine einzige HTML-Datei (`index.html`) mit eingebettetem CSS und JavaScript, dazu
Impressum, Datenschutz, echte App-Screenshots in `img/` und selbst gehostete Schriften in
`fonts/` (Archivo, Inter, IBM Plex Mono — SIL Open Font License, siehe `fonts/OFL-*.txt`).

Kein Build-Schritt, keine Abhängigkeiten, keine Cookies, kein Tracking.

**Hell und dunkel.** Schalter in der Kopfzeile (Mond/Sonne, auch auf Impressum und
Datenschutz) und im Fuß („Hell“, „Dunkel“, „Wie Gerät“). Die Wahl merkt sich der
Browser (`localStorage` `cs.design`); ohne Wahl folgt die Seite dem Gerät
(`prefers-color-scheme`), ohne JavaScript bleibt sie hell. Ein kleines Skript im
Kopf setzt `data-design="hell|dunkel"` vor dem ersten Bild; die Rechtsseiten
nutzen dafür `design.js`. **Icons** für Browser und Google-Suche: `favicon.ico`
(16/32/48), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` im
Hauptverzeichnis, dazu `img/favicon-96.png` und `img/icon-192.png`. Suchmaschinen
bekommen immer die deutsche Fassung, auch wenn sie sich als englischer Browser melden.
