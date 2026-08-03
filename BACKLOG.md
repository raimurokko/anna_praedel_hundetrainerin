# Backlog – Website Anna Prädel · Hundetraining

Legende: `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt
Priorität: 🔴 hoch · 🟡 mittel · 🟢 niedrig

---

## ✅ Session 03.08.2026

- E-E-A-T in „Über mich" + Person-Schema (§ 11 TierSchG, 3 Jahre, Fortbildung, Kitmir).
- 5 neue Ratgeber + Ratgeber-Übersichtsseite `/ratgeber/`; „Kurz gesagt"-Direktantworten in allen Artikeln.
- **Rubrik „Tiernotfall" `/tiernotfall/`** neu (Entscheidungsbaum 9 Situationen, Sticky-Notrufnummern,
  datengetrieben aus JSON → statisch generiert, Print-CSS, FAQPage-Schema, Nav-Punkt „Notfall",
  Teaser in Tierschutz). Doku: `docs/tiernotfall.md`.

## ✅ Session 04.08.2026 – Mobil-Nachkontrolle Tiernotfall

- [x] Optische Nachkontrolle (Teaser-Kachel + Sticky-Nummern auf Mobil) abgeschlossen.
- [x] 🔴 **Site-weiter Sticky-Bug behoben:** `body { overflow-x: hidden }` machte `<body>` zum
  Scroll-Container → `position: sticky` war überall wirkungslos (Notrufleiste + `.beziehung__sticky`).
  Regel entfernt, horizontaler Overflow bleibt durch `html { overflow-x: clip }` gekappt.
  Regressionsgeprüft (kein H-Scroll) bei 375/407/768/1320/1440 px, Startseite mit offenem Burger-Menü,
  `/ratgeber/`, `/datenschutz.html`, `/tiernotfall/`.
- [x] Notrufleiste auf Mobil sticky statt static, kompakt (72 px statt 98 px), Kurzlabels + `aria-label`.
- [x] Druck-Button lief auf 375 px aus dem Viewport (`.btn` = `white-space: nowrap`) → bricht jetzt um.
- [x] Teaser-Kachel auf ≤560 px ohne Deko-Pfeil (Text 6 → 4 Zeilen).

---

### 🔁 Tiernotfall – wiederkehrende Pflege-Tasks
- [ ] 🔴 **Vor Go-Live prüfen (verify_before_launch):** `tierfang-berlin` (030 9029 64718 nicht bestätigt)
  und `tierheim-brandenburg` → zuständiges LDS-Tierheim (Dahme-Spreewald, Schönefeld/Großziethen) recherchieren
  und als eigenen Eintrag anlegen.
- [ ] 🟡 **Halbjährlicher Review** (`meta.review_interval_months = 6`): alle Notrufnummern gegen die
  offizielle Quelle prüfen, `verified_date` aktualisieren, dann `node tools/generate-tiernotfall.js`.
  Nächster Review: **Februar 2027**.
- [ ] 🟢 Optional: eigene Einträge für Treptow-Köpenick (Altglienicke/Bohnsdorf/Adlershof) Veterinäramt
  ergänzen (analog `vet-neukoelln`).
- Pflege-Prinzip: **nur die JSON anfassen**, `id` nie ändern, keine Nummern ohne Quelle. Details: `docs/tiernotfall.md`.

---

## ✅ Session 22.07.2026

Erledigt: Einzeltraining-Karten-Icons (Herz/Pfote/Haus/Tasse), Kontakt-Icons
(WhatsApp/Instagram/Facebook/Briefumschlag als echte SVG-Glyphen), **E-Mail-Konfigurator**
(nicht-modaler Dialog, damit der Barrierefreiheits-Button erreichbar bleibt; Themenauswahl,
Live-Vorschau, mailto-Öffnen + Kopieren, mailto-Fallback ohne JS), **Social-Bild 1200×630**
aus dem Über-mich-Foto, **IPTC „human-made"** (DigitalSourceType=digitalCapture) in allen Fotos,
Provenienz per Meta + JSON-LD, `llms.txt` erweitert, PLZ im Schema, FAQ-Schema angeglichen,
toter Code entfernt (`.hero-word/.hero-claim`, `.termine-*`, `.booking-modal*`, hero-seq-JS,
`termine.js`, `data/termine.json`), **hero02/03 entfernt** (LCP).

**Ebenfalls erledigt (spätere Runden 22.07.):** E-Mail-Themenauswahl als barrierefreie
**Radio-Gruppe** (Dyslexie-Schrift greift überall → Dropdown-Caveat hinfällig), Accessible
Names der A11y-Schalter (WCAG 4.1.2), Feld-Kontrast (1.4.11), Tastatur-Fokus-Eingrenzung im
Dialog, strukturiertes **WCAG-2.1-AA-Audit**, Barrierefreiheitserklärung aktualisiert
(Stand 22.07.2026), **Facebook-URL eingetragen** (Kontakt-Karte, Footer, Schema `sameAs`, `llms.txt`).

**Neu offen (warten auf Input der Kundin):**
- [x] 🟡 **E-E-A-T:** von Userin vorerst als abgeschlossen betrachtet (03.08.2026). Bei Bedarf später:
  Qualifikation/Erfahrung + § 11 TierSchG sichtbar in „Über mich" + `Person`-Schema ergänzen.
- [ ] 🟢 Optional: echter Screenreader-/Tastatur-Durchlauf (VoiceOver/NVDA) durch einen Menschen für ein formales A11y-Testat.

---

## ✅ Erledigt (Grundgerüst)

- [x] Bündel-Datei analysiert & Assets/Inhalte extrahiert
- [x] Neuaufbau als statische Site (HTML/CSS/JS getrennt)
- [x] Figtree-Schriften lokal eingebunden (woff2)
- [x] One-Pager mit allen Sektionen, fixiertem Header, Dark-Mode
- [x] Hero als Vollbild-Variante (Hintergrundbild über ganze Breite) umgesetzt
- [x] Scroll-up-Button
- [x] Barrierefreiheits-Panel (Schrift, Kontrast, Links, Motion) – auf allen Seiten via main.js
- [x] Dyslexie-Schrift OpenDyslexic (lokal, OFL) als A11y-Option
- [x] Vorlesefunktion (Web Speech API, lokal im Browser)
- [x] GitHub-Remote verbunden & `main` gepusht (raimurokko/anna_praedel_hundetrainerin)
- [x] Datenschutz-Info-Hinweis (nicht-blockierend, kein Consent-Gate, Auto-Ausblenden)
- [x] Footer: KITMIR aus „Rechtliches" zu „Folge mir" verschoben (inhaltlich korrekt)
- [x] Datenschutz §8: Verweis auf verantwortliche Stelle (Punkt 1) bzw. Aufsichtsbehörde (Punkt 9) präzisiert
- [x] Inhalte überarbeitet (Hero, Beziehung, Über mich, Rassen, Angebot-Struktur)
- [x] Tierschutz-Sektion: Text + Vereinsname „Kitmir Tierhilfe Demirtas e.V." (auch Footer/Schema)
- [x] Angebot als einklappbare, einheitliche Akkordeons (Einzeltrainings/Gruppenkurse/Social Walks/Beratung)
- [x] Preise sichtbar bei den Angeboten + FAQ; Schema.org OfferCatalog mit priceSpecification
- [x] Schema.org-JSON-LD, OG-/Meta-Tags, Canonical
- [x] Rechtsseiten als Entwurf (Impressum, Datenschutz, Barrierefreiheit)
- [x] robots.txt, sitemap.xml, llms.txt, security.txt, site.webmanifest, favicon.svg
- [x] Lokales Git-Repository + erster Commit
- [x] Doku (PROJEKT.md) + dieses Backlog

---

## ✅ Anmerkungen-PDFs (Teil 1 + Teil 2) eingearbeitet — 25.06.2026

Quelle: `designentwürfe/Anmerkungen Website.pdf` + `…Teil 2.pdf`. Der Großteil von Teil 1 war
bereits umgesetzt; folgende Deltas (v. a. aus dem neueren Teil 2) wurden ergänzt:
- [x] Angebot-Karte „Mentale Beschäftigung" → „Beschäftigung"
- [x] „Grundgehorsam" aus SEO/Schema entfernt (Meta-Description, JSON-LD-Beschreibung, `knowsAbout`) + `llms.txt` angeglichen
- [x] FAQ „Für alle Rassen" gekürzt (Teilsatz „vom Welpen … Tierschutzhund" raus) — sichtbar + Schema
- [x] FAQ „Online-Kurse" gekürzt („… unverbindlich vormerken …" raus) — sichtbar + Schema
- [x] Beratung-Untertitel „· ab 25 €" entfernt (Konsistenz: keine „ab-Preise")
- [x] Einzeltraining-Untertitel entdoppelt → „Individuell für dich und deinen Hund" (Fließtext „Ganz auf euch zugeschnitten …" bleibt)
- [x] Impressum-PLZ auf 12355 korrigiert
- [x] Opener-Zeile „Beziehungsweise – mit Vertrauen Bindung schaffen." als Beziehungs-Überschrift gesetzt (26.06.2026)
- [x] Schriftart-Entscheidung: **bei DejaVu Sans bleiben** (Verdana nicht gewünscht, 26.06.2026)
- [x] Angebot-Karten → **Info-Karten ohne Link** umgesetzt + auf Desktop **4 nebeneinander** (mobil gestapelt, 1/2/4). Aktion läuft über „Termin anfragen" (26.06.2026).

---

## 🔴 Blockierend für Go-Live (Daten/Inhalte der Kundin)

- [x] Domain **hundetraining-ap.de** gesetzt (Rebranding Teil 3; früher beziehungsweise.com)
- [x] 🔴 Impressum: Anschrift (Neudecker Weg 49a, 12355 Berlin), Steuernummer 16/477/01055, § 11-Erlaubnis **und Telefon (0155 67557506)** eingetragen
- [x] 🔴 PLZ im Impressum korrigiert: **12355** (von Kundin bestätigt, 25.06.2026)
- [ ] 🔴 Datenschutz: Hosting-Anbieter + Logfile-Aufbewahrungsdauer eintragen (Platzhalter `[…]` in datenschutz.html)
- [x] 🔴 WhatsApp-Nummer eingetragen & von Kundin bestätigt (`wa.me/4915567557506`, 22.07.2026)
- [x] 🔴 E-Mail-Adresse **info@hundetraining-ap.de** (Rebranding; früher hallo@beziehungsweise.com)
- [x] 🔴 Facebook-Seiten-URL eingetragen (22.07.2026): https://www.facebook.com/share/1FQVGf99yg/ (Kontakt-Karte, Footer, Schema `sameAs`, `llms.txt`)
- [~] 🔴 „Stand:"-Datum in den Rechtsseiten: **Barrierefreiheit = 22.07.2026 gesetzt**; Impressum + Datenschutz noch `[Datum]`
- [ ] 🔴 Rechtstexte vor Veröffentlichung juristisch prüfen (lassen)
- [x] Preisauszeichnung (PAngV): **regulär USt-pflichtig** (nicht §19) → Preise als „inkl. gesetzlicher USt" ausgewiesen; Steuernummer im Impressum.
- [x] Standardschrift: **DejaVu Sans** (frei, Verdana-nah) lokal eingebunden, Figtree als Fallback. (Verdana selbst ist proprietär/nicht einbettbar.)
- [x] 🟡 Kundenwunsch (Teil 2): Verdana ausprobieren? → **Entscheidung Kundin (26.06.2026): bei DejaVu Sans bleiben.**
- [ ] 🟢 Perf: DejaVu-Sans-woff2 sind groß (~250 KB je Schnitt) – bei Bedarf auf genutzte Glyphen subsetten.
- [x] Corporate-Paket angelegt: CORPORATE.md (Farben HEX+RGB, Schriften, Logos).

## 🟠 Funktion: Termin-Kalender & Online-Anmeldung (Kundenwunsch)

Wunsch der Kundin für **Gruppenkurse** und **Social Walks**: ein dynamischer Kalender mit
Terminen, die sie selbst pflegen kann; Besucher melden sich pro Termin online an
(Name, Hund, Telefon, E-Mail, Anmerkungen); Anna erhält eine E-Mail und schickt eine
kurze Bestätigung. Aktuell führen die Buttons „Zur Anmeldung"/„Termin anfragen" zur
Kontakt-Sektion (Übergangslösung).

**Entscheidung (Kundin):** **eigenes kleines Backend** (volle Kontrolle, datensparsam).
**Wichtig:** Kundin ist **PHP gegenüber aus Sicherheitsgründen skeptisch** → Umsetzung daher
**bevorzugt in Node.js** (nicht PHP). Konkret zurückgestellt, bis **Produktiv-Hosting** und
**E-Mail-Postfach/SMTP** der Domain feststehen (das Backend kann nicht auf GitHub Pages laufen).

- [x] Frontend vorbereitet: Terminliste (`data/termine.json`) + barrierefreies Anmeldeformular
  (`assets/js/termine.js`); Übergangslösung per vorausgefüllter E-Mail. Andocken ans Backend
  später via `window.APHT_BOOKING_API`.
- [ ] 🟠 Hosting/Runtime festlegen (Node-fähig; PHP von Kundin nicht gewünscht) + E-Mail/SMTP klären
- [ ] 🟠 Backend (Node + SQLite): API (Termine, Anmeldung), Admin-Bereich für Termin-Pflege
  – Anna soll Termine künftig **selbst** anlegen/ändern (Antwort auf Rückfrage: ja, über den Admin-Bereich).
  – Gruppenkurse: keine freie-Plätze-Zahl, aber Status **„voll belegt"** umschaltbar (Frontend zeigt das bereits so).
  – Social Walks: Plätze sichtbar, auf 4 begrenzt.
- [ ] 🟠 Anmeldung je Termin: Speicherung + E-Mail-Benachrichtigung an Anna + Bestätigungsworkflow
- [ ] 🟠 DSGVO: AVV mit Hoster, Datenschutzerklärung ergänzen, Löschkonzept (z. B. nach dem Kurs), Spam-Schutz/TLS

## 🟡 Inhalte & Medien

- [x] 🟡 Fotos der Kundin einpflegen – Porträt „Über mich" (Anna02), Tierschutz-Bildakkordeon (tierschutz01–04) **und Hero-Bildsequenz (hero01–03, je WebP + 960px-Variante) erledigt**
- [x] 🟡 Hero-Sektion: **statisches Einzelfoto** (hero01, Bergfoto) als `<picture>` (AVIF + WebP-Fallback, responsiv, vorgeladen). Die anfängliche 3-Bild-Fade-Sequenz war auf Kundinwunsch (26.06.2026) wieder entfernt (mochte das Fade nicht). **hero02/03 am 22.07.2026 entfernt** (wegen LCP nicht genutzt).
- [x] 🟡 Social-Sharing-Bild (1200×630) ergänzt (22.07.2026: `bilder/social/anna-mit-hund.jpg`, Crop aus Über-mich-Foto; Logo 512×512 als icon-512.png vorhanden)
- [x] 🟡 Alternativtexte (`alt`) zu allen Bildern (im A11y-Audit 22.07.2026 bestätigt: keine fehlenden alt)
- [ ] 🟡 Responsive Bilder (`srcset`/`sizes`) + `loading="lazy"`
- [x] Markenzeichen „Herz mit Pfote": Favicon (SVG + favicon.ico 16/32), Touch-/PWA-Icons (180/192/512), Logo im Header/Footer (CSS-Maske, theme-fähig) und Schema.org-Logo
- [ ] 🟢 Kurze Videosequenzen einbinden (ohne Autoplay-Ton, mit Controls, ggf. Untertitel)

## 🟡 Qualität & Technik

- [ ] 🟡 Cross-Browser-/Mobile-Test (iOS Safari, Chrome, Firefox)
- [ ] 🟡 Lighthouse: Performance/SEO/Best Practices/Accessibility ≥ 95
- [ ] 🟡 Tastatur- & Screenreader-Test (Fokusreihenfolge, A11y-Panel als Dialog)
- [ ] 🟡 Schema.org mit Rich-Results-Test validieren
- [ ] 🟡 HTML-/Linkvalidierung (W3C, tote Links)
- [ ] 🟢 Server-Header: Caching (fonts/assets), Kompression (gzip/brotli), Security-Header (CSP, HSTS)
- [ ] 🟢 OpeningHours/Geo-Koordinaten in LocalBusiness ergänzen (falls gewünscht)

## 🟡 SEO & Content (laufendes Arbeitspaket — Kundenwunsch 25.06.2026)

Vereinbart: SEO als eigenes, fortlaufendes Paket (Artikel/Blog schreiben, Content posten).
Die **On-Page-Technik** (Schema.org, Meta/OG, Canonical, sitemap.xml, robots.txt, llms.txt) steht
bereits — hier geht es um **Inhalte & Reichweite**.
- [x] 🟡 Themen-/Keyword-Liste erstellt → siehe `keyword-recherche.md` (lokal Rudow/Neukölln + Umland, Service-Terms, frage-basierte AEO/GEO-Themen, Wettbewerb)
- [~] 🟡 Blog-/Ratgeber-Bereich: **angelegt als Demo** (03.08.2026) – `ratgeber/`-Ordner, 2 Muster-Artikel (Alleinebleiben, Leinenführigkeit) mit `BlogPosting`+`FAQPage`+`BreadcrumbList`-Schema, Teaser-Sektion + Nav auf der Startseite, Sitemap. Offen: Freigabe/Ausbau durch Anna, Übersichtsseite.
- [ ] 🟡 Redaktionsplan: regelmäßig Artikel verfassen & veröffentlichen (Themen siehe `keyword-recherche.md`)
- [ ] 🟢 Lokale Sichtbarkeit: Google-Business-Profil & lokale Verzeichnisse (sobald Adresse/Telefon final)
- [ ] 🟢 Interne Verlinkung Artikel ↔ Angebote; FAQ aus echten Kundenfragen wachsen lassen
- [ ] 🟢 Bilder-SEO (sprechende Dateinamen, `alt`-Texte, WebP) für Artikelmedien

## 🟢 Später / Optional

- [ ] 🟢 Angebot-Karten: eigene **Detail-/Übersichtsseite je Thema** (Alles rund um die Beziehung, Beschäftigung, Alleine bleiben, Alltagssituationen) – Texte/Inhalte von Kundin nötig (Wunsch 26.06.2026, vorerst zurückgestellt). Eignet sich auch als SEO-/Content-Bausteine.

- [x] GitHub-Remote anlegen & pushen — erledigt (siehe oben)
- [x] GitHub-Pages-Vorschau live (noindex): https://raimurokko.github.io/anna_praedel_hundetrainerin/
- [ ] 🟢 Pages-Workflow: Action-Versionen aktualisieren (Node-20-Deprecation-Warnung), wenn neuere Releases vorliegen
- [ ] 🟡 Vor Produktiv-Launch: Domain final setzen, dann Pages-Vorschau auf indexierbar umstellen ODER abschalten
- [x] Schrift-Lizenzen (OFL) verzeichnet: volle Lizenztexte + README in assets/fonts/, Verweise in fonts.css und Barrierefreiheitserklärung
- [ ] 🟢 Beim Deployment die `*-OFL.txt` + fonts/README.md mit hochladen (liegen in assets/fonts/)
- [ ] 🟢 Online-/Video-Kurs-Bereich („bald verfügbar") inhaltlich ausbauen
- [ ] 🟢 Einfaches Kontaktformular (nur falls gewünscht – sonst bleibt es bei Direktkanälen, datensparsamer)
- [ ] 🟢 Bewertungen/Testimonials (mit `Review`-Schema)
- [ ] 🟢 2-Klick-Instagram-Feed-Einbettung (falls die Kundin einen Feed möchte)
- [~] 🟢 Deploy-Pipeline / Hosting final festlegen
  → **Entscheidung Userin (03.08.2026): vorerst STATISCHE Website + regulärer günstiger Hosting-Service**
    (deutscher/DSGVO-freundlicher Anbieter, ~5–10 €/Mon inkl. Mail). Azure/Backend-Option (Kalender)
    vorerst zurückgestellt.
