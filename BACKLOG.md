# Backlog – Website Anna Prädel · Hundetraining

Legende: `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt
Priorität: 🔴 hoch · 🟡 mittel · 🟢 niedrig

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

## 🔴 Blockierend für Go-Live (Daten/Inhalte der Kundin)

- [ ] 🔴 Domain bestätigen (sonst Canonical/Sitemap/OG/Schema/security.txt anpassen)
- [ ] 🔴 Impressum vervollständigen (Anschrift, Tel., USt./§19, § 11 TierSchG)
- [ ] 🔴 Datenschutz: Hosting-Anbieter + Logfile-Aufbewahrungsdauer eintragen
- [ ] 🔴 Echte WhatsApp-Nummer eintragen (`wa.me/49…`)
- [ ] 🔴 E-Mail-Adresse bestätigen (überall `hallo@hundetraining-annap.de`)
- [ ] 🔴 Facebook-Seiten-URL eintragen **oder** Facebook-Karte entfernen
- [ ] 🔴 „Stand:"-Datum in den drei Rechtsseiten setzen
- [ ] 🔴 Rechtstexte vor Veröffentlichung juristisch prüfen (lassen)
- [x] Preisauszeichnung (PAngV): Kleinunternehmerregelung §19 UStG bestätigt → Endpreis-/§19-Hinweis bei den Preisen, in der FAQ und im Impressum ergänzt.

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
- [ ] 🟠 Anmeldung je Termin: Speicherung + E-Mail-Benachrichtigung an Anna + Bestätigungsworkflow
- [ ] 🟠 DSGVO: AVV mit Hoster, Datenschutzerklärung ergänzen, Löschkonzept (z. B. nach dem Kurs), Spam-Schutz/TLS

## 🟡 Inhalte & Medien

- [~] 🟡 Fotos der Kundin einpflegen – **Porträt „Über mich" erledigt (Anna02)**; noch offen: Hero, KITMIR – siehe `website/bilder/README.md`
- [ ] 🟡 Social-Sharing-Bild (1200×630) + Logo (512×512) ergänzen
- [ ] 🟡 Alternativtexte (`alt`) zu allen Bildern
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

## 🟢 Später / Optional

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
- [ ] 🟢 Deploy-Pipeline / Hosting final festlegen
