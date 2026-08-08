# Handover – Website „Hundetraining · Anna Prädel" (hundetraining-ap.de)

Stand: **04.08.2026** · Projektpfad: `~/projects/anna_prädel_hundetrainerin/`
Working Tree sauber, alles auf `main` gepusht (Deploy = Push).

> Hinweis: Das **primäre Arbeitsverzeichnis der Session war fälschlich `digitale-ersthilfe-website`**.
> Immer mit **absoluten Pfaden** auf `~/projects/anna_prädel_hundetrainerin/` arbeiten (Bash-`cwd` resettet je Aufruf).

---

## 1. Adressen & Fakten
- **Repo:** `github.com:raimurokko/anna_praedel_hundetrainerin` · Branch `main` · Git-Identität **Raimu Rokko**
- **Deploy = Push auf `main`** → GitHub Actions „Deploy to GitHub Pages" → live in ~20 s. Deploy-Wurzel: **`website/`**.
- **Vorschau (noindex-Staging):** https://raimurokko.github.io/anna_praedel_hundetrainerin/
- **Ziel-Domain (noch nicht live):** `hundetraining-ap.de` — alle Canonical/OG/Schema stehen bereits darauf.
- **Kontakt:** info@hundetraining-ap.de · Telefon/WhatsApp **0155 67557506** (`wa.me/4915567557506`)
- **Social:** Instagram `hundetraining_anna_p` · Facebook `facebook.com/share/1FQVGf99yg/`
- **User/Auftraggeber:** Sophia / Novum (novumanalytica.com). **Inu-Trust AG** (inu-trust.ch) ist im Footer „Umsetzung"-Credit das Gesicht, **Novum** der Technologiepartner im Hintergrund (nicht sichtbar auf Annas Seite).
- **⚠️ `gh` CLI-Auth ist abgelaufen** (401) → `gh run list` etc. gehen nicht; Deploy-Status via GitHub-Web prüfen.

## 2. Was die Site ist / Technik
- Statische Site, **reines HTML/CSS/JS, kein Build-Tool/CI** (außer dem Tiernotfall-Generator, s. u.).
- One-Pager `index.html` + Unterseiten: `impressum/datenschutz/barrierefreiheit.html`, `ratgeber/` (Übersicht + 14 Artikel), `tiernotfall/`.
- Design: Weinrot **#7E1F2D**, Fonts lokal (DejaVu Sans + Figtree, OpenDyslexic für A11y), Dark Mode, A11y-Panel (Schrift/Kontrast/Links/Motion/Dyslexie/Vorlesen), alles über `assets/js/main.js` (eine Quelle der Wahrheit).
- **Vorschau:** lokaler Server `python3 -m http.server 8137 --directory website` (aus dem Anna-Repo starten). Browser via `mcp__Claude_Browser__*` → `preview_start {url:"http://localhost:8137/…"}` (direktes `navigate` auf localhost wird per Policy geblockt; immer `preview_start`).

## 3. In dieser Session gebaut (Chronik)
1. Einzeltraining-Karten-Icons + Kontakt-Icons (echte SVG-Glyphen).
2. **E-Mail-Konfigurator** (nicht-modaler `<dialog>` + eigener Backdrop, damit der A11y-Button erreichbar bleibt; Themenauswahl als **Radio-Gruppe**; Fokus-Eingrenzung inkl. FAB; Aufräumen imperativ, weil das native `close`-Event nicht-modal unzuverlässig feuert).
3. SEO/GEO: **Social-Bild 1200×630** (`bilder/social/anna-mit-hund.jpg`, Crop aus Über-mich-Foto), **IPTC „human-made"** (DigitalSourceType=digitalCapture) in allen Fotos, Provenienz-Meta + Schema, PLZ + `areaServed` (Rudow-Umland) im Schema.
4. **A11y:** Accessible Names der Panel-Schalter (WCAG 4.1.2), Feld-Kontrast (1.4.11), Dyslexie-Schrift auf Formularen; WCAG-2.1-AA-Audit gefahren.
5. Galerie auf `<img loading=lazy>` umgestellt; Nav-Breakpoint responsiv; Kontakt-Grid 1×4/2×2/4×1.
6. **Ratgeber-System:** Übersichtsseite `/ratgeber/` + Artikel (Stand 04.08.: **14**, nach den Streichungen aus Teil 4), je „Kurz gesagt"-Direktantwort, `BlogPosting`+`FAQPage`+`Breadcrumb`-Schema, Cross-Linking.
7. **E-E-A-T:** „Qualifikation & Erfahrung"-Block in „Über mich" + `Person`-Schema (`hasCredential` § 11 TierSchG, `memberOf` Kitmir; **seit 2022** (04.08. von „über 3 Jahren“ umgestellt, s. u.), Fortbildung via Praktika/Online/Vor-Ort, gewaltfrei).
8. Footer-Credit (Inu-Trust AG) + Hinweis auf **Digitale Ersthilfe** (digitale-ersthilfe.novumanalytica.com – kostenloser Novum-Hilfe-Service; `rel=nofollow`) auf allen Seiten.
9. **Rubrik „Tiernotfall"** – siehe §4.
- Keyword-Recherche: `keyword-recherche.md` (enthält seit 04.08. einen Abdeckungs-Stand).
10. **Positionierung sichtbar gemacht (04.08.):** „mobiles Hundetraining / ich komme zu euch nach
    Hause / Hausbesuch" kam im sichtbaren Text vorher **0×** vor, obwohl es Annas Kern-Positionierung
    ist. Jetzt in Hero-Pill, Hero-Absatz, eigenem Block `.mobil-box` (H3, vor den Angebot-Akkordeons),
    Meta-/OG-Description, Schema-`description`/`knowsAbout` und `llms.txt`. Umlandorte Großziethen
    und Waltersdorf ergänzt (`areaServed` = 12 Orte).
11. **8 neue Ratgeber (04.08.):** Alltagstraining, Zweithund, Gewaltfreies
    Hundetraining, Silvester (Berlin/Böller, verlinkt auf /tiernotfall/), Hundebegegnungen,
    Hund und Baby/Kind, Autofahren, Hund im Winter. (Leinenführigkeit und Hund-und-Baby wurden
    danach auf Wunsch der Kundin wieder gelöscht → 14, siehe Punkt 14.) Erzeugt jeweils aus dem Rahmen eines
    bestehenden Artikels, damit Header/Nav/Footer identisch bleiben.
    **Saison-Hinweis:** Der Startseiten-Teaser zeigt nur 3 Artikel – ab Oktober Silvester/Winter
    nach vorn holen, im Sommer Hitze (steht auch in `keyword-recherche.md`).
    ⚠️ **Offen zu bestätigen:** „seit 2022" als Erfahrungsangabe (vorher „seit über 3 Jahren", was
    ab 2026 auf 2023 zurückrechnet) – mit Anna gegenprüfen, steht auch im `BACKLOG.md`.

## 4. Rubrik „Tiernotfall" (zuletzt gebaut) — WICHTIG
- Basiert auf `designentwürfe/annas-website-tiernotruf.zip` (Briefing von Sophia/Novum).
- **Datenmodell:** `website/daten/tiernotfall-kontakte.json` (+ `.schema.json`), 31 Kontakte.
- **Generator (statisch, kein CI):** `tools/generate-tiernotfall.js` → erzeugt **zwei** Dateien:
  `website/tiernotfall/index.html` und `website/tiernotfall/kuehlschrank.html` (kompakte
  Druckfassung, 1 Blatt A4, eigenes CSS ohne `style.css`, `noindex`, nicht in der Sitemap).
  Nach JSON-Änderungen prüfen, ob es noch **ein** Blatt ist – Befehl in `docs/tiernotfall.md`.
  Pflege-Workflow: **nur JSON anfassen**, dann `node tools/generate-tiernotfall.js`, Ausgabe mitcommitten. `id` nie ändern, keine Nummern ohne Quelle.
- Seite: Sticky-Notrufnummern (112/110/Bürgertelefon), Entscheidungsbaum 9 Situationen als `<details>`, Kontaktkarten mit Badges (amtlich/gemeinnützig/**privat_kostenpflichtig** = Warn-Badge + Neutralitätshinweis), `tel:`-Links, `FAQPage`-Schema, **Print-CSS** (Akkordeons öffnen beim Druck via main.js Modul 8), Nav-Punkt „Notfall", Teaser-Kachel in der Tierschutz-Sektion.
- **Verifikation 03.08. (per Websuche, offizielle Quellen):** ✅ `fu-dueppel` (0160 3758447), `vet-neukoelln` (030 90239-6749), `tsv-katzenrettung` (Zentrale 030 76888-0; -139 nicht bestätigt), `kadaver-entsorgung` (Prozess). ⏳ bleiben Vorbehalt: `tierfang-berlin`, `tierheim-brandenburg` (LDS-Tierheim für Schönefeld noch offen).
- Doku: **`docs/tiernotfall.md`**. Wiederkehrende Tasks stehen im Backlog (halbjährlicher Review, nächster **Feb 2027**).
- **Optische Nachkontrolle erledigt (04.08.2026)** – dabei drei echte Mobil-Bugs gefunden und behoben:
  1. `body { overflow-x: hidden }` machte `<body>` zum Scroll-Container und setzte **jedes
     `position: sticky` site-weit ausser Kraft** (Notrufleiste *und* `.beziehung__sticky`). Regel
     entfernt; `html { overflow-x: clip }` kappt den horizontalen Overflow weiterhin allein.
  2. Sticky-Leiste war auf ≤640 px zusätzlich auf `position: static` gesetzt → widersprach dem
     Intro („oben immer griffbereit"). Jetzt sticky + kompakt (3 Spalten `1fr 1fr 1.6fr`,
     Kurzlabels via `STICKY_SHORT` im Generator, voller Name im `aria-label`); Höhe 98 → 72 px.
  3. „Für den Kühlschrank ausdrucken" (`.btn` hat `white-space: nowrap`) ragte auf 375 px um 35 px
     aus dem Viewport → in `.notfall-outro` auf Mobil umbrechend.
  Zusätzlich: Teaser-Kachel auf ≤560 px ohne Deko-Pfeil, damit der Text nicht 6-zeilig quetscht.

12. **Tiernotfall im Footer (04.08.):** auf 22 von 24 Seiten als eigene Zeile
    (`.site-footer__notfall`, Warndreieck-SVG), platziert **vor** „Umsetzung"/„Digitale Ersthilfe".
    Nicht auf `tiernotfall/index.html` (Selbstlink) und `kuehlschrank.html`. Die 404-Seite hat den
    Link separat, da sie keinen Standard-Footer hat.
    ⚠️ **Footer ist auf jeder Seite dupliziert** (kein Include, kein Build) – neue Seiten immer aus
    einer bestehenden kopieren, sonst fehlt die Zeile.

13. **Hosting-Entscheidung (04.08.):** Entscheidungsvorlage **IONOS Deploy Now vs. Webhosting-Paket**
    steht am Ende von `BACKLOG.md`. Kurzfassung: beides technisch möglich; Deploy Now erhält den
    heutigen Git-Flow (Push = Deploy, Unterordner `website/` per `dist-folder` konfigurierbar),
    liefert aber **kein Mail-Postfach** – das ist wegen `info@hundetraining-ap.de` Pflicht.
    Beide laufen auf Apache, damit lösen sich per `.htaccess` endlich CSP/HSTS/Caching –
    auf GitHub Pages nicht möglich. Noch **offen: Entscheidung der Userin**.

14. **Anmerkungen Teil 4 umgesetzt (04.08.):** Alle neun Punkte der Kundin. Kern: Die Ratgeber
    sollen **erklären, nicht anleiten** – sämtliche Schritt-für-Schritt-Teile sind raus.
    Gelöscht: `leinenfuehrigkeit.html` (Ansatz nicht ihrer, Thema zu individuell) und
    `hund-und-kind.html` → **14 Artikel**. Hitze-Artikel: falscher Erste-Hilfe-Rat („langsam
    kühlen") durch Eskalation an die Tiermedizin + Notfallnummern ersetzt.
    ⚠️ **Folge:** `alltagstraining` (208 Wörter) und `rueckruf-trainieren` (229) sind jetzt sehr
    dünn – Entscheidung offen, steht im `BACKLOG.md`.
    ⚠️ **Beim Löschen eines Artikels immer mitziehen:** Übersichtskarte, `ItemList`-Schema der
    Übersicht, `sitemap.xml`, `llms.txt`, Startseiten-Teaser, „Weitere Beiträge" in allen anderen
    Artikeln – und prüfen, ob Titel/„Kurz gesagt"/Meta noch etwas versprechen, das entfernt wurde.

## 5. Wichtige Dateien
- `website/index.html` (One-Pager + JSON-LD-`@graph` im `<head>`), `website/assets/css/style.css`, `website/assets/js/main.js` (8 Module: injectUI/A11y, Theme, Menü, Reveal, ScrollTop, Datenschutz-Note, E-Mail-Konfigurator, Print-Details).
- `website/ratgeber/` (index.html + 14 Artikel), `website/tiernotfall/`, `website/daten/`, `tools/generate-tiernotfall.js`.
- `BACKLOG.md`, `keyword-recherche.md`, `docs/tiernotfall.md`.

## 6. Offene Punkte / Backlog (Auszug — Details in BACKLOG.md)
- 🔴 **Go-Live:** Domain-DNS + **günstiger statischer Host** (Entscheidung Userin: statisch starten, Azure/Backend zurückgestellt); Datenschutz-Platzhalter (Hosting-Anbieter, Logfile-Dauer) füllen; „Stand"-Datum in Impressum/Datenschutz; Rechtstexte juristisch prüfen; danach noindex→index.
- 🔴 **Tiernotfall verify_before_launch:** `tierfang-berlin` + LDS-Tierheim recherchieren.
- 🟡 Instagram-Feed: DSGVO-konform nur mit Server/2-Klick; Userin klärt noch. Bis dahin nur Link. Option 1 (kuratierte statische Bilder) wäre sofort machbar.
- 🟢 EEAT von Userin „vorerst erledigt". Testimonials/Ratings bewusst **nicht** (Wunsch Userin).
- Konzept-Frage offen beantwortet: E-E-A-T lohnt v. a. auf **Nierenzentrum** (YMYL) > Inu/Novum > Anna.

## 7. Stolperfallen / Quirks
- **`main.js`/CSS werden gern STALE geliefert** (Browser-Cache). Zum Testen frisch nachladen: entweder `<script src>`/`<link href>` temporär `?v=` cache-busten (danach zurücksetzen!) oder per JS ein frisches `<link>`/`<script>` mit `?fresh=Date.now()` injizieren. `injectUI()` hat **keinen** Doppel-Injektions-Schutz → bei Re-Inject entstehen doppelte FABs.
- **`position: sticky` ist empfindlich:** ein Vorfahre mit `overflow` ≠ `visible` (auch `auto`!) wird
  zum Sticky-Scroll-Container. `html { overflow-x: clip }` ist ok, **`body { overflow-x: hidden }` nicht** –
  das hatte site-weit alles Sticky lautlos totgelegt. Nach Layout-Änderungen an `html`/`body` prüfen:
  `getBoundingClientRect().top` des Sticky-Elements über zwei Scrollpositionen vergleichen.
- **`scroll-behavior: smooth` auf `html`** macht auch `window.scrollTo()`/`.scrollTop =` **asynchron** →
  ein direkt danach gelesenes `scrollY` ist noch 0 und täuscht „Seite scrollt nicht" vor.
  Für Messungen `window.scrollTo({top: N, behavior: 'instant'})` verwenden.
- **CSS-Reload per `?fresh=` ist async:** nach dem Cache-Busting im **nächsten** Tool-Aufruf messen,
  sonst misst man noch das alte Stylesheet (führt zu falschen „greift nicht"-Schlüssen).
- **Screenshots blanken oft** bei `scrollY≠0` / nach dynamischen Änderungen → erneut screenshotten oder `get_page_text`/DOM-Checks nutzen. Isolat-Prüfseiten (bei scrollY 0) sind zuverlässig.
- **macOS sed:** `sed -i ''`. **zsh:** Globs auf gelöschte Dateien failen → git-Pfadspecs quoten.
- **Nav-Breakpoint:** 7 Punkte brauchen ~1293px → aktuell Burger bei ≤1320px. Bei Nav-Änderung neu messen (`nav-desktop.scrollWidth + brand + padding`).
- **Sektions-Farbband** alterniert plain/`--band` (`--surface-2`). Beim Einfügen einer Sektion die Alternierung der Folgesektionen mitkorrigieren (Markup: band = `<section class="section--band"><div class="container section">`, plain = `<section class="section container">`).
- **JSON-LD nach jeder Schema-Änderung prüfen:** `node -e '…JSON.parse(<script ld+json>)…'`. **FAQPage sichtbar = Schema** (Google-Anforderung).
- **`.btn` in `.legal`-Seiten:** `.legal a`-Farbe überschrieb Button-Text → Overrides `.legal a.btn--*` vorhanden.
- **Tiernotfall:** nach JSON-Edit **Generator laufen lassen**, sonst ändert sich das HTML nicht.
- **Commit-Trailer:** `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Commit/Push nur auf Wunsch (hier ist Push=Deploy=erwünschter Flow).

## 8. Letzte Commits (main)
```
b64ffb6 Neue Rubrik Tiernotfall (/tiernotfall/) – datengetrieben, statisch generiert
942a1d5 5 neue Ratgeber + Ratgeber-Übersichtsseite (/ratgeber/)
8d5269f E-E-A-T: Qualifikation & Erfahrung in „Über mich" + Person-Schema
25f6a23 Neuer Ratgeber: Hund und Hitze (saisonal, Berlin) + integriert
b4fd972 Ratgeber: fett gesetzte Direkt-Antwort („Kurz gesagt") oben
f625c29 Responsive-Fixes: Nav-Breakpoint, Kontakt-Grid, Sektions-Farbband
```

---
**Tipp Start nächste Session:** absolute Pfade auf `~/projects/anna_prädel_hundetrainerin/`; Server auf 8137 starten; für JS/CSS-Tests Cache-Busting bedenken; offene 🔴-Go-Live-Punkte mit dem User klären.
