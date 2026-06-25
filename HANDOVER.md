# Handover – Website „Anna Prädel · Hundetraining" / beziehungsweise.com

Stand: 25.06.2026 · Projektpfad: `~/projects/anna_prädel_hundetrainerin/`

Dieses Dokument fasst den **kompletten Stand** zusammen, damit jederzeit (auch in
einer neuen Sitzung) nahtlos weitergearbeitet werden kann. Ergänzend:
[`PROJEKT.md`](PROJEKT.md) (Entscheidungen/Struktur), [`BACKLOG.md`](BACKLOG.md)
(Aufgaben), [`CORPORATE.md`](CORPORATE.md) (Farben/Schriften/Logo).

---

## 1. Kurzüberblick

- **Was:** Statische Website für die Hundetrainerin Anna Prädel (Berlin-Rudow).
  Marke/Domain: **beziehungsweise**.
- **Technik:** Reines **HTML5 + CSS + Vanilla-JS, KEIN Build-Step**. Alles
  selbst gehostet (DSGVO-konform), keine externen CDN-Assets zur Laufzeit.
- **Pfade:** durchgängig **relativ** (subpfad-sicher → läuft auf GitHub-Pages-
  Unterpfad UND später am Domain-Root).
- **Sprache:** Deutsch (de-DE), UTF-8, Umlaute wortgenau.

### Wichtige Adressen
| | |
|---|---|
| **Repo (SSH)** | `git@github.com:raimurokko/anna_praedel_hundetrainerin.git` |
| **Live-Vorschau** | https://raimurokko.github.io/anna_praedel_hundetrainerin/ (GitHub Pages, **noindex**) |
| **Ziel-Domain** | `https://beziehungsweise.com` (DNS noch nicht gesetzt; Seite nutzt sie bereits in Canonical/OG/Schema/Sitemap) |
| **Git-Identität** | Raimu Rokku · raimu.rokku@novumanalytica.com |
| **Deploy-Wurzel** | der Ordner **`website/`** (genau dieser kommt auf den Server) |

---

## 2. Lokale Entwicklung & Vorschau

```bash
cd website
python3 -m http.server 8080      # → http://localhost:8080
```
Wichtig: über einen lokalen Server öffnen (nicht per `file://`), sonst laden
relative Pfade/Manifest nicht sauber.

Für die Claude-Preview existiert `.claude/launch.json` (Server „anna-praedel-website"
auf Port 8137, `--directory anna_prädel_hundetrainerin/website`).

---

## 3. Deployment (GitHub Pages)

- Workflow: **`.github/workflows/pages.yml`** – veröffentlicht bei jedem Push auf
  `main` den Ordner `website/`.
- **Jeder Push deployt automatisch.** Pages-Quelle ist „GitHub Actions" (einmalig
  vom Repo-Owner aktiviert worden).
- Der Workflow setzt die **Vorschau auf `noindex`** (überschreibt `robots.txt` +
  injiziert `<meta name="robots" content="noindex,nofollow">` **nur im Deploy-
  Artefakt**; die Quelldateien bleiben indexierbar für die spätere echte Domain).
- **Deploy beobachten:** `gh run watch <id>` bzw. `gh run list`.

### ⚠️ Einschränkungen des `gh`-PAT (wichtig!)
Der lokal hinterlegte fine-grained PAT (User `raimurokko`) kann **NICHT**:
Pages aktivieren, Workflows re-runnen, die Pages-API lesen (`403`). Er kann nur
**git push** (löst Deploy aus) und **Runs lesen** (`gh run list/view/watch`).
→ Um einen Deploy neu auszulösen: einen (ggf. leeren) Commit pushen.
→ Node-Deprecation-Warnung der Actions besteht, Deploys laufen aber grün.

---

## 4. Seitenstruktur & Dateien

```
website/
├─ index.html              One-Pager (Hero, Beziehung, „Für alle Rassen", Angebot,
│                           Über mich, Kurse, Tierschutz, FAQ, Kontakt, Footer)
├─ impressum.html · datenschutz.html · barrierefreiheit.html · 404.html
├─ robots.txt · sitemap.xml · llms.txt · site.webmanifest · favicon.ico
├─ .well-known/security.txt
├─ data/termine.json       Termine für Gruppenkurse/Social Walks (Beispiel-Daten!)
├─ assets/
│  ├─ css/style.css        Haupt-Stylesheet (Abschnitte oben im Datei-Kopf nummeriert)
│  ├─ css/fonts.css        @font-face (DejaVu Sans, Figtree, OpenDyslexic)
│  ├─ js/main.js           Theme, Menü, Scroll-Reveal, Scroll-up, A11y-Panel,
│  │                       Datenschutz-Hinweis – injiziert UI auf allen Seiten
│  ├─ js/termine.js        Termin-Liste + Anmelde-Formular (Modal)
│  ├─ fonts/               woff2 + Lizenztexte (OFL / Public Domain)
│  └─ icons/               favicon.svg, heart-paw-mark.svg (CSS-Maske), icon-192/512.png, apple-touch-icon.png
└─ bilder/                 Anna02 (Über mich), tierschutz01–04 (Galerie), README mit Bild-Specs
```
Doku/Repo-Wurzel: `PROJEKT.md`, `BACKLOG.md`, `CORPORATE.md`, `README.md`,
`HANDOVER.md`, `.gitignore`, `designentwürfe/` (Originale + neue Kundenmaterialien).

---

## 5. Umgesetzte Features

- **Layout:** fixierter Header, One-Pager mit Anker-Navigation, Footer (Folge mir
  inkl. „Kitmir Tierhilfe Demirtas e.V.", Rechtliches).
- **Hero (Vollbild):** Foto-Hintergrund (noch Platzhalter), Wortmarke
  **„beziehung·sweise"** als Weinrot-/Rosé-Verlauf (`background-clip:text`),
  Claim „mit Vertrauen Bindung schaffen".
- **Angebot:** vier **einklappbare Akkordeons** (`<details class="offer-acc">`):
  Einzeltrainings (Karten → Kontakt), Gruppenkurse, Social Walks, Beratung vor der
  Anschaffung. Jeweils mit **Preis-Block** und „Anfragen/Anmelden".
- **Über mich:** Foto `Anna02` (WebP + PNG-Fallback, abgerundet).
- **Tierschutz:** **aufklappendes Bild-Akkordeon** (Desktop: Hover/Fokus öffnet
  ein Panel; Touch: 2×2-Raster, dezente Unterschriften), 4 echte Fotos.
- **Dark Mode** (folgt System, per Button umschaltbar, gespeichert).
- **Barrierefreiheit:** Skip-Link, semantisches HTML, Fokus-Stile; A11y-Panel
  (Symbol Rollstuhl, rechts mittig): Schriftgröße, **Dyslexie-Schrift**, hoher
  Kontrast, Links unterstreichen, Animationen reduzieren, **Vorlesen** (Web Speech
  API, lokal). Barrierefreiheitserklärung vorhanden.
- **Scroll-up-Button**, **Datenschutz-Info-Hinweis** (kein Consent-Gate, einmalig,
  blendet aus).
- **SEO/AEO:** Schema.org-JSON-LD (WebSite, WebPage, LocalBusiness/ProfessionalService,
  Person, FAQPage, **OfferCatalog mit Preisen**), OG-/Twitter-Tags, Canonical,
  `sitemap.xml`, `robots.txt`, `llms.txt`, `security.txt`.

---

## 6. Inhaltliche Eckdaten (Stand jetzt)

- **Preise (Endpreise, inkl. gesetzlicher USt – KEIN §19!):**
  - Einzeltraining: Ersttermin 60 Min. **70 €**, Folgetermin 45 Min. **60 €**
  - Gruppenstunde 60 Min. **15 €** (max. 6 Teilnehmer)
  - Social Walk: 60 Min. **20 €**, 90 Min. **30 €** (Plätze auf **4** begrenzt)
  - Beratung vor der Anschaffung 60 Min.: Videochat **25 €**, vor Ort **50 €**
- **Steuer:** regulär umsatzsteuerpflichtig; **Steuernummer 16/477/01055** (im Impressum).
  Preishinweis überall: „… inkl. gesetzlicher Umsatzsteuer."
- **Impressum:** Anna Prädel, **Neudecker Weg 49a, 12344 Berlin**; Erlaubnis nach
  **§ 11 Abs. 1 Nr. 8 f TierSchG** (Bezirksamt Neukölln, Ordnungsamt – Veterinär-
  und Lebensmittelaufsicht). ⚠️ **PLZ 12344 ist zu verifizieren** (Rudow meist 12349/12351/12355).
- **Verein:** Kitmir Tierhilfe Demirtas e.V. (https://kitmir.de).
- **Kontakt:** Instagram `hundetraining_anna_p`; E-Mail vorläufig
  `hallo@beziehungsweise.com` (⚠️ bestätigen); WhatsApp/Facebook = Platzhalter.

---

## 7. Corporate / Design-Tokens (Details in CORPORATE.md)

- **Primärfarbe Weinrot** `#7E1F2D` = RGB 126, 31, 45 (Dark-Mode-Akzent Rosé `#E07A8B`).
  Vollständige Palette (HEX+RGB) in `CORPORATE.md`.
- **Schriften (alle lokal):** **DejaVu Sans** = Standard (Verdana-Alternative, frei),
  **Figtree** = Fallback (OFL), **OpenDyslexic** = Lesehilfe (OFL).
  – Hinweis: „Verdana" war gewünscht, ist aber proprietär/nicht einbettbar → DejaVu Sans gewählt.
- **Logo/Bildmarke:** „Herz mit Pfote". Farbig: `assets/icons/favicon.svg`;
  Form/Maske (theme-fähig, im Header/Footer per CSS-Maske): `assets/icons/heart-paw-mark.svg`.

---

## 8. Offene / blockierende Punkte vor Go-Live (siehe BACKLOG.md)

**🔴 Daten der Kundin / Recht:**
- Domain `beziehungsweise.com` per DNS auf das Hosting zeigen; bei Go-Live
  Pages-Vorschau abschalten oder auf indexierbar stellen.
- E-Mail `hallo@beziehungsweise.com` bestätigen; echte **WhatsApp-Nummer**;
  **Facebook**-URL eintragen oder Karte entfernen.
- **PLZ im Impressum prüfen** (12344?).
- „Stand:"-Datum in den 3 Rechtsseiten setzen; Rechtstexte juristisch prüfen lassen.
- Datenschutz: **Hosting-Anbieter** + Logfile-Aufbewahrungsdauer eintragen.

**🟡 Medien:**
- **Hero-Foto** (quer, hochauflösend) liefern → `bilder/`, dann `<img>` im Hero
  einkommentieren (Platzhalter „FOTO .webp — Anna mit Hund, quer" ersetzen).
- **Social-Sharing-Bild** 1200×630 (`bilder/social/anna-mit-hund.webp`) + **Logo-webp**
  (für OG/Schema `assets/icons/icon-512.png` ist gesetzt).

**🟠 Großes Feature – Termin-Kalender & Online-Anmeldung (Gruppenkurse/Social Walks):**
- Entscheidung der Kundin: **eigenes kleines Backend**. **PHP ist NICHT gewünscht
  (Sicherheitsbedenken) → Umsetzung in Node.js.**
- Aktuell: Frontend steht (`data/termine.json` + `assets/js/termine.js`,
  Anmeldeformular). Übergangslösung ohne Backend = **vorausgefüllte E-Mail**.
  Sobald API da: in HTML `window.APHT_BOOKING_API = "<endpoint>"` setzen → POST statt Mail.
- Anna soll Termine **selbst** pflegen können (Admin); Gruppenkurse zeigen **keine**
  freie-Plätze-Zahl, nur „voll belegt"; Social Walks zeigen Plätze (max 4).
- DSGVO: AVV mit Hoster, Datenschutzerklärung ergänzen, Löschkonzept, Spam-Schutz/TLS.

**🟢 Sonstiges:** GitHub-Pages-Action-Versionen aktualisieren (Node-Deprecation);
DejaVu-woff2 bei Bedarf subsetten (≈250 KB/Schnitt).

---

## 9. ⚠️ Noch nicht gesichtete Kunden-Materialien
In `designentwürfe/` liegen neue Dateien, die noch **nicht eingearbeitet** sind:
- `Anmerkungen Website.pdf` und `Anmerkungen Website Teil 2.pdf` → **wahrscheinlich
  weitere Änderungswünsche – als Erstes lesen!**
- mehrere `WhatsApp Image …jpeg` → mögliche weitere Fotos.
- `anna_KI_01.mp4`, `anna_KI_02.mp4` → mögliche Hero-Videos / Clips.

---

## 10. Stolperfallen / gelernte Lektionen (wichtig für Folgearbeit)

1. **`url()` in CSS-Custom-Property** löst relativ zum **Stylesheet** auf (nicht zum
   Dokument) → führte zu falschem Bildpfad `/assets/css/bilder/…`. Lösung im
   Tierschutz-Akkordeon: Bild per **Inline `background-image`** je Panel (relativ zum
   Dokument, subpfad-sicher).
2. **`overflow-x: hidden/clip` kappt `position:fixed`-Elemente NICHT zuverlässig**
   (Safari/Chrome) → off-canvas geparkte fixed-Elemente erzeugen horizontalen Scroll.
   Lösung: fixed-Panels **nicht** off-canvas parken, sondern in der Box ein-/ausblenden
   (Fade+Scale). `html{overflow-x:clip}` bleibt als Sicherheitsnetz.
3. **Claude-Preview-Eigenheiten:** emuliert **kein** `hover:none` (Touch-Layout muss
   man per Klon/Style simulieren); Screenshots sind nur bei **scrollY 0** (ggf. hoher
   Viewport) zuverlässig; `scroll-behavior:smooth` + Scroll-Restoration stören
   programmatisches Scrollen; `[data-reveal]`-Elemente vor Screenshots sichtbar schalten.
4. **Cache:** Nach Deploy ggf. Browser/CDN-Cache → hart neu laden (⌘⇧R) / `?v=N`.
5. **Bilder:** JPEG/PNG → **WebP** per `cwebp` (vorhanden); PNG→Icons per `rsvg-convert`.
   Ecken „sichtbar abrunden" = `.media`/`.media--photo` (border-radius + overflow:hidden).

---

## 11. Verifikations-Workflow (bewährt)
- `node -e` zum **Validieren des JSON-LD** (JSON.parse des `<script type=ld+json>`).
- `curl -s "<live>?cb=$RANDOM"` zum Prüfen der **tatsächlich ausgelieferten** Dateien
  (umgeht Browser-Cache) – so Live-Stand vs. lokal vergleichen.
- Claude-Preview (`preview_start` „anna-praedel-website", `preview_eval`,
  `preview_screenshot`, `preview_resize`) für visuelle/DOM-Checks.

---

## 12. Gespeichertes (Memory, gilt sitzungsübergreifend)
- Google-/Webfonts immer **lokal** einbinden.
- **DSGVO-datensparsam** arbeiten (minimaler Datenaustausch, kein Tracking, keine
  unnötigen Drittanbieter; Meta nur per Link/2-Klick).
- Aktiv **Meinung/Empfehlungen** einbringen und als Entscheidungsvorschläge anbieten.

---

## 13. Nächste sinnvolle Schritte (Vorschlag)
1. **`designentwürfe/Anmerkungen Website(.../Teil 2).pdf` lesen** und Änderungen einarbeiten.
2. Offene Kundendaten einsammeln (E-Mail, WhatsApp, Facebook, PLZ-Check, Hosting).
3. Hero-Foto/Social-Bild einbauen, sobald geliefert (ggf. `anna_KI_*.mp4` als Hero-Video prüfen).
4. Backend (Node) für Termine/Anmeldung planen, sobald Hosting feststeht.
5. Vor Go-Live: Lighthouse, Rich-Results-Test, Cross-Browser-/Mobile-Test, Rechtsprüfung.
