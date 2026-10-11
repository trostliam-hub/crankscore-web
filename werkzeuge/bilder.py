"""Web-Fassungen der Bilder fuer crankscore.de (AVIF und WebP, je zwei Groessen).

  python bilder.py app <roh-ordner>      App-Aufnahmen <szene>-<sprache>-<hell|dunkel>.png
                                         -> img/app/<sprache>/<design>/<szene>[-klein].avif|webp
  python bilder.py rad <render-ordner>   Blender-Renderings (transparent) -> img/rad/<name>[-klein].avif|webp

Braucht Pillow ab 11.3 (AVIF eingebaut). Handy-Aufnahmen: 720 und 480 px breit, Desktop: 1600 und 960 px,
Renderings: auf den Inhalt zugeschnitten, 1600, 1200 und 900 px. werkzeuge/ wird nicht veroeffentlicht."""
import os, sys, glob
from PIL import Image

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def speichern(im, ziel, breite):
    if im.width != breite:
        im = im.resize((breite, round(im.height * breite / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    im.save(ziel + ".avif", quality=58, speed=4)
    im.save(ziel + ".webp", quality=82, method=6)
    return im.size

def app(ordner):
    for pfad in sorted(glob.glob(os.path.join(ordner, "*-*-*.png"))):
        szene, sprache, design = os.path.basename(pfad)[:-4].rsplit("-", 2)
        im = Image.open(pfad).convert("RGB")
        gross, klein = (1600, 960) if szene == "desktop" else (720, 480)
        basis = os.path.join(WURZEL, "img", "app", sprache, design, szene)
        g = speichern(im, basis, gross); speichern(im, basis + "-klein", klein)
        print(szene, sprache, design, g)

def schatten_weich(im, rand=0.12, sockel=5):
    """Schatten des Schattenfaengers (schwarz, teiltransparent): schwachen Schleier abziehen und zu den Bildraendern
    weich auslaufen lassen -- sonst zeichnet sich der Bildrand als Kante im Boden ab."""
    import math
    w, h = im.size
    px = im.load()
    rw, rh = max(1, w * rand), max(1, h * rand)
    for y in range(h):
        fy = min(1.0, y / rh, (h - 1 - y) / rh)
        for x in range(w):
            r, g, b, a = px[x, y]
            if 0 < a < 255 and max(r, g, b) < 12:
                f = min(fy, x / rw, (w - 1 - x) / rw)
                f = f * f * (3 - 2 * f) if f < 1 else 1.0
                px[x, y] = (0, 0, 0, max(0, round((a - sockel) * f)))
    return im

def rad(ordner):
    for pfad in sorted(glob.glob(os.path.join(ordner, "rad-*.png"))):
        name = os.path.basename(pfad)[:-4]
        im = Image.open(pfad).convert("RGBA")
        # zuschneiden: Rad (deckend) plus Rand; der weiche Schatten darf an den Rand laufen
        maske = im.getchannel("A").point(lambda a: 255 if a > 140 else 0)
        l, o, r, u = maske.getbbox()
        rand = round((r - l) * 0.04)
        box = (max(0, l - rand), max(0, o - rand), min(im.width, r + rand), min(im.height, round(u + rand * 1.6)))
        # Bildpunkte fuer Beschriftungen (aus web_render.py) auf den Ausschnitt umrechnen
        punkte = os.path.join(ordner, name + "-punkte.json")
        if os.path.exists(punkte):
            import json
            p = json.load(open(punkte))
            neu = {k: [round((x * im.width - box[0]) / (box[2] - box[0]), 4), round((y * im.height - box[1]) / (box[3] - box[1]), 4)] for k, (x, y) in p.items()}
            json.dump(neu, open(os.path.join(ordner, name + "-punkte-web.json"), "w"), indent=1)
        im = schatten_weich(im.crop(box))
        basis = os.path.join(WURZEL, "img", "rad", name)
        g = speichern(im, basis, 1600); speichern(im, basis + "-mittel", 1200); speichern(im, basis + "-klein", 900)
        print(name, g)

{"app": app, "rad": rad}[sys.argv[1]](sys.argv[2])
