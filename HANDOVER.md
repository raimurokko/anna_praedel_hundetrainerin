# Handover – Website „Hundetraining · Anna Prädel" (hundetraining-ap.de)

Stand: **03.08.2026** · Projektpfad: `~/projects/anna_prädel_hundetrainerin/`
Letzter Commit: **b64ffb6** (Rubrik Tiernotfall). Working Tree sauber, alles auf `main` gepusht.

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
- One-Pager `index.html` + Unterseiten: `impressum/datenschutz/barrierefreiheit.html`, `ratgeber/` (Übersicht + 8 Artikel), `tiernotfall/`.
- Design: Weinrot **#7E1F2D**, Fonts lokal (DejaVu Sans + Figtree, OpenDyslexic für A11y), Dark Mode, A11y-Panel (Schrift/Kontrast/Links/Motion/Dyslexie/Vorlesen), alles über `assets/js/main.js` (eine Quelle der Wahrheit).
- **Vorschau:** lokaler Server `python3 -m http.server 8137 --directory website` (aus dem Anna-Repo starten). Browser via `mcp__Claude_Browser__*` → `preview_start {url:"http://localhost:8137/…"}` (direktes `navigate` auf localhost wird per Policy geblockt; immer `preview_start`).

## 3. In dieser Session gebaut (Chronik)
1. Einzeltraining-Karten-Icons + Kontakt-Icons (echte SVG-Glyphen).
2. **E-Mail-Konfigurator** (nicht-modaler `<dialog>` + eigener Backdrop, damit der A11y-Button erreichbar bleibt; Themenauswahl als **Radio-Gruppe**; Fokus-Eingrenzung inkl. FAB; Aufräumen imperativ, weil das native `close`-Event nicht-modal unzuverlässig feuert).
3. SEO/GEO: **Social-Bild 1200×630** (`bilder/social/anna-mit-hund.jpg`, Crop aus Über-mich-Foto), **IPTC „human-made"** (DigitalSourceType=digitalCapture) in allen Fotos, Provenienz-Meta + Schema, PLZ + `areaServed` (Rudow-Umland) im Schema.
4. **A11y:** Accessible Names der Panel-Schalter (WCAG 4.1.2), Feld-Kontrast (1.4.11), Dyslexie-Schrift auf Formularen; WCAG-2.1-AA-Audit gefahren.
5. Galerie auf `<img loading=lazy>` umgestellt; Nav-Breakpoint responsiv; Kontakt-Grid 1×4/2×2/4×1.
6. **Ratgeber-System:** 8 Artikel + `/ratgeber/` Übersichtsseite, je „Kurz gesagt"-Direktantwort, `BlogPosting`+`FAQPage`+`Breadcrumb`-Schema, Cross-Linking.
7. **E-E-A-T:** „Qualifikation & Erfahrung"-Block in „Über mich" + `Person`-Schema (`hasCredential` § 11 TierSchG, `memberOf` Kitmir; **seit 3 Jahren**, Fortbildung via Praktika/Online/Vor-Ort, gewaltfrei).
8. Footer-Credit (Inu-Trust AG) + Hinweis auf **Digitale Ersthilfe** (digitale-ersthilfe.novumanalytica.com – kostenloser Novum-Hilfe-Service; `rel=nofollow`) auf allen Seiten.
9. **Rubrik „Tiernotfall"** – siehe §4.
- Keyword-Recherche: `keyword-recherche.md`.

## 4. Rubrik „Tiernotfall" (zuletzt gebaut) — WICHTIG
- Basiert auf `designentwürfe/annas-website-tiernotruf.zip` (Briefing von Sophia/Novum).
- **Datenmodell:** `website/daten/tiernotfall-kontakte.json` (+ `.schema.json`), 31 Kontakte.
- **Generator (statisch, kein CI):** `tools/generate-tiernotfall.js` → erzeugt `website/tiernotfall/index.html`.
  Pflege-Workflow: **nur JSON anfassen**, dann `node tools/generate-tiernotfall.js`, Ausgabe mitcommitten. `id` nie ändern, keine Nummern ohne Quelle.
- Seite: Sticky-Notrufnummern (112/110/Bürgertelefon), Entscheidungsbaum 9 Situationen als `<details>`, Kontaktkarten mit Badges (amtlich/gemeinnützig/**privat_kostenpflichtig** = Warn-Badge + Neutralitätshinweis), `tel:`-Links, `FAQPage`-Schema, **Print-CSS** (Akkordeons öffnen beim Druck via main.js Modul 8), Nav-Punkt „Notfall", Teaser-Kachel in der Tierschutz-Sektion.
- **Verifikation 03.08. (per Websuche, offizielle Quellen):** ✅ `fu-dueppel` (0160 3758447), `vet-neukoelln` (030 90239-6749), `tsv-katzenrettung` (Zentrale 030 76888-0; -139 nicht bestätigt), `kadaver-entsorgung` (Prozess). ⏳ bleiben Vorbehalt: `tierfang-berlin`, `tierheim-brandenburg` (LDS-Tierheim für Schönefeld noch offen).
- Doku: **`docs/tiernotfall.md`**. Wiederkehrende Tasks stehen im Backlog (halbjährlicher Review, nächster **Feb 2027**).
- **Offen (nur optische Nachkontrolle, nicht kritisch):** Homepage-Teaser-Kachel + Sticky-Nummern-Stapelung auf Mobil visuell final prüfen (Seite ist funktional, JSON-LD/Serving/Nav validiert).

## 5. Wichtige Dateien
- `website/index.html` (One-Pager + JSON-LD-`@graph` im `<head>`), `website/assets/css/style.css`, `website/assets/js/main.js` (8 Module: injectUI/A11y, Theme, Menü, Reveal, ScrollTop, Datenschutz-Note, E-Mail-Konfigurator, Print-Details).
- `website/ratgeber/` (index.html + 8 Artikel), `website/tiernotfall/`, `website/daten/`, `tools/generate-tiernotfall.js`.
- `BACKLOG.md`, `keyword-recherche.md`, `docs/tiernotfall.md`.

## 6. Offene Punkte / Backlog (Auszug — Details in BACKLOG.md)
- 🔴 **Go-Live:** Domain-DNS + **günstiger statischer Host** (Entscheidung Userin: statisch starten, Azure/Backend zurückgestellt); Datenschutz-Platzhalter (Hosting-Anbieter, Logfile-Dauer) füllen; „Stand"-Datum in Impressum/Datenschutz; Rechtstexte juristisch prüfen; danach noindex→index.
- 🔴 **Tiernotfall verify_before_launch:** `tierfang-berlin` + LDS-Tierheim recherchieren.
- 🟡 Instagram-Feed: DSGVO-konform nur mit Server/2-Klick; Userin klärt noch. Bis dahin nur Link. Option 1 (kuratierte statische Bilder) wäre sofort machbar.
- 🟢 EEAT von Userin „vorerst erledigt". Testimonials/Ratings bewusst **nicht** (Wunsch Userin).
- Konzept-Frage offen beantwortet: E-E-A-T lohnt v. a. auf **Nierenzentrum** (YMYL) > Inu/Novum > Anna.

## 7. Stolperfallen / Quirks
- **`main.js`/CSS werden gern STALE geliefert** (Browser-Cache). Zum Testen frisch nachladen: entweder `<script src>`/`<link href>` temporär `?v=` cache-busten (danach zurücksetzen!) oder per JS ein frisches `<link>`/`<script>` mit `?fresh=Date.now()` injizieren. `injectUI()` hat **keinen** Doppel-Injektions-Schutz → bei Re-Inject entstehen doppelte FABs.
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
