# Pre-Flight-Checkliste — crankscore.de (Design-Loop, 2026-09-29)

Entwurf: `C:\Users\trost\crankscore-web\index.html` (Assets in `img/`, `fonts/`, lokaler Test unter http://127.0.0.1:8766/index.html).
Auftraggeber: Liam. Wortlaut: „ist nicht schlecht aber das geht besser und das muss auch für PC optimiert sein.
Wichtig: der Hintergrund soll nicht nur schwarz sein, sondern Farbübergänge haben usw. Es muss eine professionelle
Webseite sein. Design hat oberste Priorität. Nicht aufhören, bis es perfekt ist.“ Vorbild: bevel.health/de — aber dunkel.

## A. Muss-Punkte des Briefs
1. Dunkel, aber **kein flächiges Schwarz**: Hintergrund mit Farbverläufen (Violett/Blau der Marke), die über die Seite hinweg wechseln.
2. **Für PC optimiert**: bei 1440 px und 1920 px wird die Breite genutzt (zweispaltige Layouts, große Geräteansichten, keine leeren Flächen, Hover-Zustände, sinnvolle Maximalbreiten). Handy (360/390 px) bleibt sauber, kein horizontales Scrollen.
3. **Bevel-Struktur**: Hero mit Gerät und Bewegung → Marken-Laufband → Prinzip/Prüfstand → Funktionen mit laufenden App-Videos → Guide → Federung → Funktionsraster → Zahlen → Datenschutz → Fragen → Schluss → Fuß mit Spalten.
4. **Bewegung**: Einblenden beim Scrollen, Videos, Neigung/Parallaxe, Zähler, Laufband, wandernder Lichtrand. Alles aus bei `prefers-reduced-motion`.
5. **Teaser**: kein Link zur App, Etikett „Kommt bald“, Aufnahmen als „Echte App · Beispielanzeige“ gekennzeichnet.
6. **Keine gezeichneten Figuren** (keine „Fit“-Aufnahme), **keine erfundenen Nutzerstimmen oder Bewertungen**, keine Fremdlogos (Markennamen nur als Text mit Hinweis im Fuß).
7. **Zweisprachig DE/EN**: Schalter in der Kopfzeile, jeder sichtbare Text, Seitentitel und Bildbeschreibungen wechseln; Rechtsseiten bleiben deutsch.
8. Zahlen echt: 738 Teile, 125 Marken, 7 Disziplinen, 15 Federtabellen, 106 Guide-Themen (Katalog 2026-09-29).

## B. Designsystem CrankScore (die App ist die Referenz)
- Farben: Nacht `#05040c`, Carbon `#0d0b18`/`#151226`, Linien `#2a2544`/`#1c1930`, Text `#f7f5ff`/`#c6c1e4`/`#8f89b3`,
  Akzent `#a47bff`, Eloxal-Verlauf `#8a4dff → #5b5bff → #2f8cff`, Erfolg `#2ef29a`, Warnung `#ffbe2e`, Fehler `#ff4f7b`. Keine fremden Akzentfarben. Systemfarben dürfen als `rgba(...)` mit Transparenz stehen (Schatten, Wolken, Glanzkanten, Kopfzeile = Nacht mit Alpha hinter Blur) — das sind keine Fremdfarben.
- Schrift: **Archivo** (breit, 800) nur für Überschriften und große Zahlen; **Inter** für Text; **IBM Plex Mono** für Etiketten/Messwerte (Versalien, gesperrt). Alle lokal in `fonts/`.
- Stufen am PC (bis 1599 px): h1 ≥ 72 px (zweispaltiger Hero, Archivo 125 % — „zusammen?" muss in die Spalte passen), h2 48–64 px; am Handy h1 ≥ 44 px, h2 ≥ 34 px. Fließtext 16–20 px, Etiketten 12–13 px. Nichts unter 12 px. Display-Stufen als Variablen: `--h1`, `--h2`, `--schluss` (40–64 px, zwischen h2 und h1), `--zahl` 64 px (Score), `--zahlen` 28–44 px (Katalogzahlen). **Ab 1600 px** gilt die große Stufe: h1 86 px, h2 60 px, Container 1400 px, Geräte 470/430/400 px.
- Formen: Radien 22–46 px bei Karten, Kacheln und Geräten (Icon-Kacheln 12–13 px), 999 px bei Pillen/Knöpfen; **konzentrische Ecken**: innerer Radius = äußerer Radius − Rand/Polster (Gerät 46 − 11 = 35, Guide-Karte 32 − 1 = 31) — so bleiben verschachtelte Rundungen parallel; Hauptknopf im Eloxal-Verlauf mit Leuchten; Glas-Karten (`rgba(21,18,38,.62)`) mit feiner Linie.
- Stimme: Deutsch, Du-Form, kurze Sätze, keine Werbesprache, keine Ausrufezeichen-Häufung.

## C. Technik
- Eine HTML-Datei mit eingebettetem CSS/JS, Assets nur lokal (Videos `img/v/*.webm` + WebP-Reserve + Poster). **Keine CDNs**, keine externen Schriften, kein Tracking.
- Videos laden erst im Bild (`preload="none"`/`metadata`), pausieren außerhalb; Reserve als animiertes WebP, wenn kein WebM.
- Keine Konsolenfehler, gültige Verschachtelung, `alt`/`aria-label` an Medien, sichtbarer Fokus, Skip-Link.
- Kein horizontales Scrollen bei 360, 390, 768, 1440, 1920 px.
- Seite ohne JavaScript weiterhin lesbar (Inhalte im Markup, deutsch).

## D. Bewusste Entscheidungen (Runde 2, mit Begründung — Kritiker bitte nur mit neuem Argument erneut anführen)
- Die sechs App-Aufnahmen zeigen die **deutsche Oberfläche**, auch in der englischen Fassung. Englische Aufnahmen kämen mit dem Release (die englischen App-Screens ändern sich bis dahin noch); in EN sind die Aufnahmen als „Real app · German UI“ gekennzeichnet.
- Unter 760 px ist die Kopfnavigation ausgeblendet, ohne Menü: Einseiter mit zwei Hero-Knöpfen in die Seite und den Links im Fuß. Ab 760 px (Tablet) ist die Navigation sichtbar.
- Der rotierende Lichtrand der Guide-Karte bleibt (eine zusammengesetzte Transform-Ebene, kein Filter). Der Himmel hat nur noch zwei Wolken ohne `filter:blur`, der Hero-Glow ist ein Verlauf ohne Filter.
- Kein Warteliste-Formular: der Anbieter (Brevo) ist nicht eingerichtet, das Impressum nicht vollständig — Liams Entscheidung, siehe Offene Punkte. Der Schluss führt deshalb zu den Fragen.
- (Runde 4) Die Modus-Karten sind Inhalt, keine Schalter: Klick am PC wechselt das Video (Komfort), die Tastatur-Bedienung sind die drei Punkte (echte Buttons, 44×28 px). Kein `role=button` auf `article`.
- (Runde 4) „Pure jumps / Pure downhill / All-round" sind die englischen Bezeichnungen der App selbst — die Webseite übernimmt die Produktbegriffe.
- (Runde 4) Unter der letzten Modus-Karte bleibt links Luft (≈ 37 vh): sie ist der Laufweg, in dem das klebende Handy rechts noch ganz im Bild steht, bis Karte 3 die Bildmitte verlässt. Kein Loch ohne Inhalt — rechts läuft das Video.
- (Runde 4) Vorzeige-Aufbau mit Shimano-SLX-Hebel/-Schaltwerk/-Kette zur XT-Kassette (statt SRAM GX × Shimano): Score 99, 4.343 €, 15,26 kg (mit BB-MT800-Lager). Dass der Assistent von sich aus SRAM-Hebel mit Shimano-Kassette mischt, ist ein Befund für die **App** (Offene Punkte), nicht für die Seite.
- (Runde 6) **Abgelehnt, Brief-Kritiker:** „1920 ist nur ein skaliertes 1440." Gemessen: ab 1600 px Container 1400 statt 1240 px, h1 86 statt 76 px, h2 60 statt 56 px, Geräte 470/430/400 statt 420/380/360 px (Hero-Gerät bei 1920×1080 = 420 px statt 337 px bei 1440×900). Dass zwischen 1440 und 1599 px dieselbe Stufe gilt, ist die Stufenlogik von Breakpoints, kein Mangel. Derselbe Kritiker hatte diese Stufe in Runde 3, 4 und 5 als erfüllt bewertet.
- (Runde 7) Hero: Text mittig neben einem hohen Gerät ist das Bevel-Muster; Luft über und unter dem Text ist gewollt. Geräte hängen an der Bildschirmhöhe, mit Untergrenze 300/280 px, damit Laptops (1366×768) keine Zwerggeräte bekommen — dort ragt das Gerät dann unter die Falz, was bei Bevel/Linear ebenso ist.
- (Runde 7) Der Prüfstand ist bewusst eine **Darstellung der Webseite** (Werte aus der App, Bildschirmaufnahme wäre für sechs Prüfzeilen unlesbar) und ist so beschriftet: „Werte aus der App, dargestellt von dieser Seite." Nicht „Echte App".
- (Runde 7) Hero-Aufnahme = Aufbau-Ansicht (`aufbau.webm`), Bühne startet mit dem Assistenten — zwei verschiedene Bildschirme derselben App, kein Doppel.
- (Runde 8) Häkchen im Prüfstand als Inline-SVG (Plex-Mono-Subset hat kein U+2713); Vergleich im Mein-Rad-Beleg ohne „≠“ (U+2260 ebenso nicht im Subset).
- (Runde 9) **Abgelehnt, System-Kritiker:** h1 86/h2 60 ab 1600 px (steht seit Runde 2 in D und jetzt in B); Wolken-rgba (erlaubte Alpha-Varianten); Kopfzeile `rgba(5,4,12,.55)` = Nacht mit Alpha hinter `backdrop-filter`, absichtlich dunkler als Glas-Karten; `figure[aria-labelledby]` auf das Etikett ist gültiges ARIA (die `figcaption` beschreibt, das Etikett benennt); `.status` trägt den Text „passt“ neben einem `aria-hidden`-SVG — Screenreader lesen „passt“.
- (Runde 10, Abschluss) Legende: Text darf zweizeilig werden, der Pausenknopf steht immer daneben (`flex-wrap:nowrap`); EN-Legende „Real app · German UI“. Prinzip gespiegelt (Prüfstand links) — die Zweispalter wechseln jetzt ab. Offen geblieben (niedrig): ungleiche Kartenhöhen im Funktionsraster (Grid-Zeilen, gewollt).
