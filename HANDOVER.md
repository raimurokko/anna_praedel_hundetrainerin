# Handover – Website „Hundetraining · Anna Prädel" (hundetraining-ap.de)

Stand: **22.07.2026** (Ende dieser Session) · Projektpfad: `~/projects/anna_prädel_hundetrainerin/`

Kompakter, aber vollständiger Übergabestand für die nächste Session. Diese Session drehte sich v. a. um **Hero-/LCP-Optimierung** und ein **großes Rebranding** (Anmerkungen Teil 3).

---

## 1. Kurzüberblick & Adressen
- Statische One-Pager-Website für die Hundetrainerin **Anna Prädel** (Berlin). Reines **HTML/CSS/JS, kein Build-Tool**.
- Repo (lokal): `/Users/dramallama/projects/anna_prädel_hundetrainerin`
- Git-Identität: **Raimu Rokko** · Remote: `github.com:raimurokko/anna_praedel_hundetrainerin` · Branch: `main`
- **Deploy-Wurzel: `website/`**
- **Deploy = Push auf `main`** → GitHub Actions „Deploy Preview to GitHub Pages" → live in ~20 s. Prüfen mit `gh run list -L 3`.
- Vorschau-URL (GitHub Pages, **noindex**): https://raimurokko.github.io/anna_praedel_hundetrainerin/
- **Produktions-Domain (Ziel, NOCH NICHT live):** `hundetraining-ap.de` — DNS muss noch auf GitHub Pages (oder finales Hosting) zeigen. Alle Canonical/OG/Schema-URLs stehen bereits auf diese Domain.
- **E-Mail:** `info@hundetraining-ap.de` · **Telefon/WhatsApp:** `0155 67557506` (⚠️ WhatsApp-Nutzung angenommen – siehe §7)
- Instagram: https://www.instagram.com/hundetraining_anna_p · Kitmir Tierhilfe Demirtas e.V.: https://kitmir.de
- HEAD-Commit am Session-Ende: `feea69c` (Teil-3-Rebranding).

## 2. Lokale Vorschau
- `.claude/launch.json` (Name **`anna-praedel-website`**, Port **8137**) startet `python3 -m http.server 8137 --directory website`. **⚠️ Diese Datei ist NICHT committet (untracked)** – bei Bedarf neu anlegen:
  ```json
  { "version": "0.0.1", "configurations": [
    { "name": "anna-praedel-website", "runtimeExecutable": "python3",
      "runtimeArgs": ["-m","http.server","8137","--directory","website"], "port": 8137 } ] }
  ```
- Vorschau über **`mcp__Claude_Browser__*`** (das separate `Claude_Preview`-MCP war zeitweise weg): `preview_start {name}`, dann `computer {action:"screenshot"}` / `navigate` / **`get_page_text`**.
- **`get_page_text` ist am zuverlässigsten** für Inhaltsprüfung – Screenshots hängen/blanken oft (s. §11).

## 3. Was diese Session passiert ist (grob chronologisch)
1. **Anmerkungen Teil 1+2** eingearbeitet (Texte, PLZ 12355, kein §19, SEO/Content-Backlog).
2. Mobiler Artefakt behoben: gestreifter **Platzhalter hinter der Tierschutz-Galerie**.
3. **Hero:** erst 3-Bild-Fade-Sequenz + Pause-Button gebaut → **später auf Kundinwunsch auf EIN statisches Foto reduziert** (Fade gefiel nicht).
4. **Angebot-Karten** → Info-Karten (nicht klickbar), Desktop 4-spaltig.
5. **Großes LCP-Thema** (mehrere Runden) – siehe §6.
6. Gestreiften Lade-Platzhalter bei **allen** Bildern entfernt.
7. **Kalender-Beratung** → Kundin wählte **Idee B** (Kalender-Feed `.ics`), Empfehlung mailbox.org.
8. **Anmerkungen Teil 3 = Rebranding** (Domain, Marke, Angebot-Straffung, Preise) – siehe §5.

## 4. Aktueller Inhaltsstand
- **Hero:** EIN statisches Foto (`hero01`, Bergfoto) als `<picture>` (AVIF + WebP-Fallback, responsiv, vorgeladen). H1 „**Mit Vertrauen Bindung schaffen**", Pill „Hundetraining in Berlin". Keine Animation/kein Pause-Button. `object-position:50% 38%`.
- **Logo/Marke:** „**Hundetraining**" (oben) / „Anna Prädel" (drunter). Markenname überall „**Hundetraining · Anna Prädel**".
- **Beziehung-Abschnitt:** H2 „Vertrauen ist die Grundlage." + neuer kurzer Text (Eyebrow „Meine Haltung").
- **Angebot:** nur **Einzeltrainings** (4 Info-Karten: Alles rund um die Beziehung / Beschäftigung / Alleine bleiben / Alltagssituationen) + **Beratung vor der Anschaffung**.
- **Preise (aktuell):** Einzeltraining **Ersttermin 90 Min. 100 €**, **Folgetermin 60 Min. 80 €**; Beratung 60 Min. Videochat 25 € / bei euch zu Hause 50 €. Alle Preise „inkl. gesetzlicher USt".
- **Gruppenkurse & Social Walks: entfernt** (auf Kundinwunsch „vorerst").
- Weitere Sektionen unverändert: **Über mich**, **Online-/Video-Kurse** („bald verfügbar" – bleibt, ≠ Gruppenkurse), **Tierschutz** (Kitmir, Bild-Akkordeon), **FAQ**, **Kontakt** (Karten WhatsApp/Instagram/Facebook/E-Mail; Notiz „Einzeltraining bei euch zu Hause – in ganz Berlin").

## 5. Rebranding-Details (Teil 3)
- Domain `beziehungsweise.com` → `hundetraining-ap.de` (überall: Canonical/OG/Schema/Sitemap/robots/security.txt/llms.txt).
- E-Mail `hallo@beziehungsweise.com` → `info@hundetraining-ap.de`.
- **Wortmarke „beziehungsweise" komplett raus** (Hero-H1, Beziehung-H2, Domain).
- „Berlin Rudow" → „Berlin" in Marketing/SEO (Impressum-Adresse bleibt Berlin/12355).
- Telefon/WhatsApp ergänzt; Schema `telephone: +4915567557506`.

## 6. LCP / Bilder (WICHTIG)
- **Das Hero-Bild ist das LCP-Element.** Setup: `<picture>` mit `<source type=image/avif>` + `<source type=image/webp>` + `<img fetchpriority="high">`, plus `<link rel=preload as=image type="image/avif">` im `<head>`.
- **AVIF MUSS mit `avifenc` (libavif/aom) erzeugt werden, NICHT mit macOS `sips`!** sips-AVIF war nicht standardkonform → **lud in Firefox nicht** (Firefox wählt die avif-Source, kann sie nicht dekodieren, und `<picture>` fällt dann NICHT auf WebP zurück). `avifenc` (diese Session via `brew install libavif` installiert) erzeugt Standard-AVIF (8-bit/YUV420), das überall lädt.
  - Rezept: JPEG → PNG (`sips --resampleWidth <w> in.jpeg --out r.png`) → `avifenc -q <Q> -y 420 -d 8 -s 4 r.png out.avif`. Verwendet: **960/1280 q42, voll q48**.
- WebP-Fallback via `cwebp -m 6 -sharp_yuv` (~**960/1280 q50, voll q60**).
- Dateien in `website/bilder/`: `hero01|02|03` je als `.avif` + `.webp` in **960 / 1280 / voll** (hero01/03=1600, hero02=1384) + `.jpeg`-Original.
  **Nur `hero01` wird aktuell genutzt** (statischer Hero); hero02/03 liegen für später bereit (z. B. Galerie).
- Responsive Breiten **960/1280/1600** – die 1280er ist wichtig, damit High-DPR-Mobil nicht das volle 1600 (275 KB) als LCP lädt.
- Kopf-Zuschnitt-Fix: `object-position`-Y je Foto auf die Kopfhöhe (hero01 **38%**, hero02 **15%**, hero03 **25%**) – sonst schneidet der breite Desktop-Hero die Köpfe oben ab.
- **LCP-Messwerte** (multiregional, Mobil, Lighthouse 12; vor den letzten 2 Commits): **DE 2,5 s** / US-East 2,4 s (Score 97) / Übersee ~4 s. Die Übersee-Werte = **GitHub-Pages-Netzwerkdistanz** (verschwindet auf eigenem Host). **DE (europe-west3) ist der relevante Wert** (Berliner Zielgruppe). Nach AVIF-Preload + statischem Hero **noch nicht neu gemessen**.
- **Offen:** **Firefox-Test** (lädt das AVIF?) – sollte mit avifenc klappen, aber vom Kunden noch nicht bestätigt. Nächster LCP-Hebel falls nötig: render-blockierendes CSS (kritisches CSS inline).

## 7. ⚠️ Offene Rückfragen an Kundin/User (aus der letzten Nachricht dieser Session)
1. **WhatsApp-Nummer:** `0155 67557506` (als Telefon angegeben) wurde **auch für WhatsApp** eingesetzt (angenommen). Bestätigen/korrigieren.
2. **Beziehung-Überschrift** „Vertrauen ist die Grundlage." – passt das (Ersatz für „Beziehungsweise …")?
3. **Icons für Einzeltraining-Karten** (Haus/Kaffeetasse …): war „kein Muss", **nicht umgesetzt** (Kreis-Icons blieben). Einbauen?
4. **Facebook-Karte/-Link:** noch **Platzhalter** (`facebook.com/`). URL liefern oder Karte entfernen.
5. **Markenname überall gedreht** („Hundetraining · Anna Prädel") – explizit gewünscht war nur das Logo; OK dass alles gedreht ist?
6. **„Kurse"-Sektion** (Online-/Video-Kurse „bald verfügbar") bleibt – bestätigt?

## 8. Weitere offene/blockierende Punkte
- **Domain-DNS:** `hundetraining-ap.de` auf GitHub Pages (oder finales Hosting) zeigen lassen; danach Vorschau indexierbar stellen oder abschalten.
- **Hosting final:** Empfehlung DSGVO + späteres Node-Backend: deutscher Host (~5–8 €/Mon), z. B. Uberspace/Hetzner/Netcup. GitHub Pages ist nur Vorschau.
- **Rechtstexte:** „Stand: [Datum]" in Impressum/Datenschutz/Barrierefreiheit setzen; juristische Prüfung. Datenschutz: Hosting-Anbieter + Logfile-Aufbewahrungsdauer eintragen.
- **Social-Sharing-Bild:** `og:image` verweist auf `bilder/social/anna-mit-hund.webp` – **Datei fehlt noch** (1200×630 liefern).
- **Kalender (Idee B) – geparkt** (Gruppen/Walks raus). Wenn zurück: Anna pflegt Termine in DSGVO-Kalender (**mailbox.org** oder Nextcloud) mit **öffentlichem iCal-Link MIT Details** – **Proton/Tuta ungeeignet** (E2E; Tuta-Feed nur Frei/Belegt). Ein Cron (z. B. GitHub Action) holt den `.ics` → schreibt `data/termine.json`. `termine.js`/`data/termine.json` liegen noch im Repo (Include aus `index.html` bereits entfernt). Anmeldung bleibt first-party (E-Mail/WhatsApp).
- **Toter Code (Aufräumen optional):** CSS `.hero-word`/`.hero-claim` (Wortmarke) und `.termine-*`/Booking-Modal (Termine) sind ungenutzt.

## 9. Corporate / Features
- Weinrot **`#7E1F2D`** (RGB 126,31,45).
- Schriften: **DejaVu Sans** (lokal, Verdana-nah) + Figtree-Fallback; OpenDyslexic (A11y). **Verdana abgelehnt** (proprietär) – nicht erneut vorschlagen.
- Logo: „Herz mit Pfote" (CSS-Maske, theme-fähig).
- Features: Dark Mode, A11y-Panel (Schriftgröße/Kontrast/Links/Motion/Dyslexie/Vorlesen), nicht-blockierender Datenschutz-Hinweis, Schema.org JSON-LD, OG/Meta, sitemap/robots/llms.txt/security.txt/manifest, lokale Schriften (kein Google).

## 10. Rechtliches / Geschäftsdaten
- **Anna Prädel, Neudecker Weg 49a, 12355 Berlin** (PLZ von Kundin bestätigt, war fälschlich 12344).
- Steuernummer des Betriebes: **16/477/01055**. **Regulär USt-pflichtig (NICHT §19)** → Preise „inkl. gesetzlicher USt".
- Erlaubnis nach **§ 11 Abs. 1 Nr. 8 f TierSchG** (Bezirksamt Neukölln, Veterinär-/Lebensmittelaufsicht).

## 11. Stolperfallen / Workflow-Quirks
- **Vorschau:** Screenshots **blanken oft beim ersten Versuch** nach dynamischen Änderungen → erneut screenshotten. Bei `scrollY≠0` unzuverlässig → `get_page_text` nutzen oder hohen Viewport bei scrollY 0. CSS/JS-**Cache**: mit `?cb=` neu laden, ggf. Stylesheet/Script-`href` explizit cache-busten; `main.js` wird gern stale geliefert (frisch nachladen zum Handler-Testen). Programmatisches Scrollen von `scroll-behavior:smooth` blockiert → `document.documentElement.style.scrollBehavior='auto'` + `history.scrollRestoration='manual'`. `@media (hover:none)` (Touch-Layout) wird **nicht emuliert** → per injiziertem CSS erzwingen. `img.naturalWidth` meldet viewport-skalierte Werte (Artefakt) → `new Image()` für echte Maße. Responsive-Doppel-Download nur bei Viewport-Resize-Übergängen (Artefakt), nicht bei stabilem Kalt-Load.
- **zsh:** unquoted `$VAR` in `for`-Loop **trennt NICHT** → Array `X=(a b c)` + `for f in "${X[@]}"`.
- **sed (macOS):** `sed -i ''`.
- **PDF lesen:** poppler fehlt → Read-Tool rendert keine PDFs. Stattdessen Ghostscript: `gs -q -dNOPAUSE -dBATCH -sDEVICE=png16m -r150 -sOutputFile=/tmp/p%d.png "datei.pdf"`, dann PNG mit Read lesen. Anmerkungen-PDFs in `designentwürfe/` und `~/Downloads/` („Anmerkungen Website Teil 1/2/3").
- **JSON-LD prüfen:** `node -e '…JSON.parse(<script ld+json>)…'` (nach jeder Schema-Änderung).
- **Deploy prüfen:** `gh run list -L 3`.
- Installiert diese Session: **`libavif` (avifenc)** via brew; `cwebp` & `gs` waren schon da.

## 12. Nächste sinnvolle Schritte
1. Die **6 offenen Rückfragen** (§7) mit dem User klären.
2. **Firefox- + Lighthouse-Check** des aktuellen Standes abwarten (v. a. DE-LCP; lädt AVIF in Firefox?).
3. **Domain-DNS** + finales Hosting; danach Vorschau indexierbar/abschalten.
4. **Rechtstexte** finalisieren (Datum, Hosting-Angaben, Prüfung).
5. Bei Bedarf: Karten-Icons, Social-Sharing-Bild, Kalender (Idee B) reaktivieren, toten Code aufräumen.

## 13. Letzte Commits (main)
```
feea69c Anmerkungen Teil 3: Rebranding (Domain/Marke), Angebot gestrafft, neue Preise
2de9c5a Bilder: gestreiften Lade-Platzhalter entfernt (Ueber mich u. a.)
97d7502 Hero: statisches Einzelfoto statt Fade-Sequenz (Kundinwunsch)
8e71c81 Hero: Kopf-Crop wirklich behoben - object-position der 3 Fotos auf die Kopfpartie
f47767f Hero LCP: AVIF-Preload (type=image/avif)
b01348f Hero: AVIF richtig nachgeruestet (avifenc/aom, Standard 8-bit/YUV420)
74ad3d9 Hero: AVIF entfernt (Firefox/Cross-Browser-Fix) + LCP-Optimierung
```
(Ältere Historie: WebP-Kompression, AVIF-via-sips [verworfen], Angebot-Karten, Hero-Sequenz, Teil-1/2-Deltas.)

---
**Tipp für den Start der nächsten Session:** zuerst §7 (offene Rückfragen) mit dem User klären und den Firefox-/Lighthouse-Rückmeldung abfragen – davon hängen die nächsten Schritte ab.
