# Backlog – Website Anna Prädel · Hundetraining

Legende: `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt
Priorität: 🔴 hoch · 🟡 mittel · 🟢 niedrig

---

## ✅ Erledigt (Grundgerüst)

- [x] Bündel-Datei analysiert & Assets/Inhalte extrahiert
- [x] Neuaufbau als statische Site (HTML/CSS/JS getrennt)
- [x] Figtree-Schriften lokal eingebunden (woff2)
- [x] One-Pager mit allen Sektionen, fixiertem Header, Dark-Mode
- [x] Scroll-up-Button
- [x] Barrierefreiheits-Panel (Schrift, Kontrast, Links, Motion)
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

## 🟡 Inhalte & Medien

- [ ] 🟡 Fotos der Kundin einpflegen (Hero, Porträt, KITMIR) – siehe `website/bilder/README.md`
- [ ] 🟡 Social-Sharing-Bild (1200×630) + Logo (512×512) ergänzen
- [ ] 🟡 Alternativtexte (`alt`) zu allen Bildern
- [ ] 🟡 Responsive Bilder (`srcset`/`sizes`) + `loading="lazy"`
- [ ] 🟡 Echte Favicons/Touch-Icons (PNG 192/512, apple-touch-icon, favicon.ico) erzeugen
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

- [ ] 🟢 GitHub-Remote anlegen & pushen (Kundin/Sophia liefert Repo nach) — Punkt c
- [ ] 🟢 Online-/Video-Kurs-Bereich („bald verfügbar") inhaltlich ausbauen
- [ ] 🟢 Einfaches Kontaktformular (nur falls gewünscht – sonst bleibt es bei Direktkanälen, datensparsamer)
- [ ] 🟢 Bewertungen/Testimonials (mit `Review`-Schema)
- [ ] 🟢 2-Klick-Instagram-Feed-Einbettung (falls die Kundin einen Feed möchte)
- [ ] 🟢 Deploy-Pipeline / Hosting final festlegen
