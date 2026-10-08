#!/usr/bin/env node
/* Abgleich der Website-Texte mit texte.js.

   node werkzeuge/texte.mjs            schreibt die deutsche Fassung in index.html, impressum.html, 404.html und
                                       datenschutz.html (fuer Suchmaschinen und Besucher ohne
                                       JavaScript) und setzt die Versionsnummer von texte.js/seite.js
   node werkzeuge/texte.mjs --pruefen  schreibt nichts; Exit 1, wenn das HTML nicht zu texte.js passt

   Geprueft wird ausserdem: jeder Schluessel im HTML steht in texte.js, jeder Eintrag hat Deutsch und
   Englisch, kein Platzhalter bleibt offen, kein Eintrag ist ungenutzt, keine Sprachmischung
   (Umlaute oder deutsche Woerter im Englischen, englische Woerter im Deutschen), das Kopf-Skript ist
   auf allen Seiten gleich. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEITEN = ["index.html", "impressum.html", "datenschutz.html", "404.html"];
const PRUEFEN = process.argv.includes("--pruefen");
const lies = (d) => fs.readFileSync(path.join(WURZEL, d), "utf8");

const kontext = { window: {} };
vm.runInNewContext(lies("texte.js"), kontext);
const { texte: T, fuelle } = kontext.window.CS_TEXTE;

const fehler = [], hinweise = [];
const ATTR = { "data-t-aria": "aria-label", "data-t-alt": "alt", "data-t-title": "title", "data-t-content": "content" };
const NUR_DEUTSCH_LEER = new Set(["recht.hinweis"]);

const nbsp = (s) => s.replace(/ /g, "&nbsp;");
const escText = (s) => nbsp(s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
const escAttr = (s) => nbsp(s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
const deutsch = (k) => fuelle(T[k][0], "de");

/* Inhalt aller Elemente mit data-t / data-th ersetzen (passendes Schluss-Tag mit Verschachtelung) */
function ersetzeInhalte(html, attr, neu, benutzt) {
  const re = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\s${attr}="([^"]+)"[^>]*>`, "g");
  let aus = "", pos = 0, m;
  while ((m = re.exec(html))) {
    const tag = m[1], key = m[2], start = m.index + m[0].length;
    benutzt.add(key);
    const tr = new RegExp(`<${tag}\\b[^>]*>|</${tag}\\s*>`, "gi");
    tr.lastIndex = start;
    let tiefe = 1, t, ende = -1;
    while ((t = tr.exec(html))) {
      if (t[0][1] === "/") { if (--tiefe === 0) { ende = t.index; break; } }
      else if (!t[0].endsWith("/>")) tiefe++;
    }
    if (ende < 0) { fehler.push(`kein Schluss-Tag fuer <${tag} ${attr}="${key}">`); continue; }
    if (!T[key]) { fehler.push(`Schluessel fehlt in texte.js: ${key}`); continue; }
    aus += html.slice(pos, start) + neu(key);
    pos = ende;
    re.lastIndex = ende;
  }
  return aus + html.slice(pos);
}

/* Attribute (aria-label, alt, title, content) aus data-t-* setzen */
function ersetzeAttribute(html, benutzt) {
  return html.replace(/<[a-zA-Z][^>]*\sdata-t-(?:aria|alt|title|content)="[^"]+"[^>]*>/g, (tag) => {
    for (const [quelle, ziel] of Object.entries(ATTR)) {
      const m = tag.match(new RegExp(`\\s${quelle}="([^"]+)"`));
      if (!m) continue;
      const key = m[1];
      benutzt.add(key);
      if (!T[key]) { fehler.push(`Schluessel fehlt in texte.js: ${key}`); continue; }
      const wert = escAttr(deutsch(key));
      const vorhanden = new RegExp(`(\\s${ziel}=")[^"]*(")`);
      tag = vorhanden.test(tag) ? tag.replace(vorhanden, `$1${wert}$2`) : tag.replace(/^<([a-zA-Z0-9]+)/, `<$1 ${ziel}="${wert}"`);
    }
    return tag;
  });
}

const version = crypto.createHash("sha1").update(lies("texte.js")).update(lies("seite.js")).digest("hex").slice(0, 8);
const benutzt = new Set();
const kopfSkripte = new Map();
let geaendert = 0;

for (const seite of SEITEN) {
  const alt = lies(seite);
  let html = ersetzeInhalte(alt, "data-t", (k) => escText(deutsch(k)), benutzt);
  html = ersetzeInhalte(html, "data-th", (k) => nbsp(deutsch(k)), benutzt);
  html = ersetzeAttribute(html, benutzt);
  html = html.replace(/(texte|seite)\.js\?v=[0-9a-z]*/g, `$1.js?v=${version}`);
  for (const m of html.matchAll(/CS\.t\("([^"]+)"\)/g)) benutzt.add(m[1]);
  const kopf = html.match(/<script>\/\* Vor dem ersten Bild[\s\S]*?<\/script>/);
  kopfSkripte.set(seite, kopf ? kopf[0] : "");
  if (html !== alt) {
    geaendert++;
    if (PRUEFEN) fehler.push(`${seite} passt nicht zu texte.js (node werkzeuge/texte.mjs ausfuehren)`);
    else fs.writeFileSync(path.join(WURZEL, seite), html);
  }
}

/* Eintraege pruefen */
const DEUTSCHE_WOERTER = /\b(und|der|die|das|nicht|mit|für|ist|dein|deine|deinem|kein|keine|wird|auch|oder|bei|zum|zur|Teile|Rad|Räder)\b/;
const ENGLISCHE_WOERTER = /\b(the|and|with|your|you|which|this|that|from|for)\b/i;
const ERLAUBT_GLEICH = /^(Guide|Standards|Score|\{zahl:\w+\}\+?)$/;
for (const [k, paar] of Object.entries(T)) {
  if (!Array.isArray(paar) || paar.length !== 2 || paar.some((x) => typeof x !== "string")) { fehler.push(`${k}: braucht ["Deutsch", "English"]`); continue; }
  const [de, en] = paar;
  if (!en.trim()) fehler.push(`${k}: Englisch fehlt`);
  if (!de.trim() && !NUR_DEUTSCH_LEER.has(k)) fehler.push(`${k}: Deutsch fehlt`);
  for (const sp of ["de", "en"]) {
    const offen = fuelle(paar[sp === "de" ? 0 : 1], sp).match(/\{[a-z]+:[A-Za-z0-9]+\}/);
    if (offen) fehler.push(`${k} (${sp}): Platzhalter ohne Wert ${offen[0]}`);
  }
  const enText = en.replace(/<[^>]+>/g, " ").replace(/\(Bundesland\)/, "");
  if (/[äöüÄÖÜß]/.test(enText) || DEUTSCHE_WOERTER.test(enText)) fehler.push(`${k}: Deutsch im Englischen: ${en.slice(0, 80)}`);
  const deText = de.replace(/<[^>]+>/g, " ");
  if (ENGLISCHE_WOERTER.test(deText)) fehler.push(`${k}: Englisch im Deutschen: ${de.slice(0, 80)}`);
  if (de === en && !ERLAUBT_GLEICH.test(de)) hinweise.push(`${k}: Deutsch und Englisch gleich ("${de}")`);
  if (/ —|— /.test(de + en)) fehler.push(`${k}: Geviertstrich; auf der Website gilt der Halbgeviertstrich mit Leerzeichen`);
  if (/\s'|'\s|\w'\w/.test(de.replace(/<[^>]+>/g, "") + en.replace(/<[^>]+>/g, ""))) fehler.push(`${k}: gerades Apostroph, bitte ’`);
  if (/ {2}/.test(de + en)) fehler.push(`${k}: doppeltes Leerzeichen`);
}
for (const k of Object.keys(T)) if (!benutzt.has(k)) fehler.push(`ungenutzter Eintrag in texte.js: ${k}`);
const kopfe = new Set(kopfSkripte.values());
if (kopfe.size !== 1 || kopfe.has("")) fehler.push("Kopf-Skript ist nicht auf allen Seiten gleich: " + [...kopfSkripte].map(([s, k]) => `${s}:${k.length}`).join(", "));

const eintraege = Object.keys(T).length;
console.log(`${eintraege} Eintraege, ${benutzt.size} im HTML genutzt, Skript-Version ${version}` +
  (PRUEFEN ? "" : `, ${geaendert} Seite(n) geschrieben`));
for (const h of hinweise) console.log("Hinweis: " + h);
for (const f of fehler) console.log("FEHLER: " + f);
process.exit(fehler.length ? 1 : 0);
