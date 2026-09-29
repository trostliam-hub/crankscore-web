# CrankScore — Webseite

Die Startseite unter **https://crankscore.de** (dieses Repo, GitHub Pages aus `main`).
Die **App** liegt in einem anderen Repo: `trostliam-hub/dreambuild`, erreichbar unter
**https://app.crankscore.de**. App-Änderungen gehören dorthin, nicht hierher.

- Alles auf Deutsch, Texte im Du. Schlicht, keine Werbesprache.
- Bilder sind echte Screenshots der App (`img/*.webp`). Keine gezeichneten Illustrationen
  als Ersatz für Bilder, keine fremden Produktfotos (Liams Regeln).
- Schriften liegen in `fonts/` (Archivo, Inter, IBM Plex Mono, alle OFL) — nie von Google laden.
- Impressum lädt die Anbieterangaben aus `https://app.crankscore.de/links.json` (Feld `betreiber`),
  damit Webseite und App nie Verschiedenes zeigen.
- Die Datei `CNAME` darf nicht weg (Domain crankscore.de).
- Zahlen auf der Seite (738 Teile, 125 Marken, 7 Disziplinen) stammen aus dem Katalog der App,
  Stand 2026-09-29 — bei großen Katalogänderungen nachziehen.
- Veröffentlichen: auf `main` pushen, GitHub Pages baut neu. Kein Stempel nötig.
