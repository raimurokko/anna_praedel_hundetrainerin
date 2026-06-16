# Projekt: Website „Anna Prädel · Hundetraining"

Stand: 16.06.2026 · Verantwortlich (Entwicklung): Sophia Sophos · Kundin: Anna Prädel

Diese Datei hält alle Entscheidungen, die Struktur und den Stand fest. Das laufende
Aufgaben-/Ideenregister liegt in [`BACKLOG.md`](BACKLOG.md).

---

## 1. Ziel & Kontext

Eine Website für die Hundetrainerin Anna Prädel (Berlin Rudow). Ausgangspunkt waren zwei
Designentwürfe in [`designentwürfe/`](designentwürfe/). Die Kundin hat sich für die Variante
entschieden, die ursprünglich in `website/` als **gebündelte Einzeldatei** lag.

### Befund zur gewählten Datei
Die `Anna Prädel Hundetraining (offline).html` war **kein klassisches HTML**, sondern ein
client-seitig gerendertes React-Projekt in einem proprietären Bündel-Format („dc-runtime"):
- drei versteckte Blöcke (`manifest` = Base64+gzip-Assets, `ext_resources`, `template`),
- Inhalt in einer Template-Sprache (`{{ … }}`, `<sc-if>`, `<sc-for>`, `<x-dc>`),
- React/ReactDOM wurden zur Laufzeit von **unpkg.com** nachgeladen (also nicht wirklich offline),
- 5 eingebettete Assets: 1× JS-Runtime + 4× Figtree-Schriften (woff2).

Für SEO/AEO/LLM, Wartbarkeit und Serverbetrieb ist eine solche JS-Hülle die schlechteste
Grundlage (Crawler sehen ohne JS-Ausführung eine leere Seite). Daher der Neuaufbau (s. u.).

---

## 2. Getroffene Entscheidungen (mit Kundin abgestimmt)

| # | Thema | Entscheidung | Begründung |
|---|-------|--------------|------------|
| 1 | **Architektur** | Neuaufbau als **statische Website** (HTML5 + externes CSS/JS, kein Build-Step) | Server-fertiges HTML → optimal für SEO/AEO/Schema.org, leicht zu pflegen, läuft auf jedem Server, keine Framework-Abhängigkeit. |
| 2 | **Meta-Integration / DSGVO** | **Datensparsam**: einfache Links zu Instagram/Facebook/WhatsApp, Embeds nur per 2-Klick-Lösung | Beim Laden fließen keine Daten zu Meta → kein Cookie-Banner nötig, schlanke Datenschutzerklärung. |
| 3 | **Barrierefreiheits-Button** | **Eigenes, leichtes A11y-Panel** (rechts mittig, Rollstuhl-Symbol) | Drittanbieter-Overlays sind umstritten, stören teils Screenreader und senden Daten an Dritte. Echte Barrierefreiheit über semantisches HTML + WCAG. |
| 4 | **Seitenstruktur** | **One-Pager** + separate Rechtsseiten (Impressum, Datenschutz, Barrierefreiheit) | Design-treu und rechtssicher. |

---

## 3. Ordnerstruktur (Deploy-Wurzel = `website/`)

```
anna_prädel_hundetrainerin/
├─ PROJEKT.md              ← dieses Dokument
├─ BACKLOG.md              ← Aufgaben/Ideen
├─ README.md               ← Kurzüberblick
├─ .gitignore
├─ designentwürfe/         ← beide Original-Entwürfe (Referenz, nicht deployen)
└─ website/                ← DIESER Ordner kommt auf den Server
   ├─ index.html           ← Startseite (One-Pager)
   ├─ impressum.html
   ├─ datenschutz.html
   ├─ barrierefreiheit.html
   ├─ 404.html
   ├─ robots.txt
   ├─ sitemap.xml
   ├─ llms.txt             ← KI-/LLM-Beschreibung (AEO)
   ├─ site.webmanifest
   ├─ .well-known/
   │  └─ security.txt      ← RFC 9116
   ├─ assets/
   │  ├─ css/              ← style.css, fonts.css
   │  ├─ js/               ← main.js
   │  ├─ fonts/            ← Figtree (lokal, woff2)
   │  └─ icons/            ← favicon.svg etc.
   └─ bilder/              ← Fotos/Videos der Kundin (+ README mit Specs)
```

> Die ursprüngliche Bündel-Datei in `website/` war **byte-identisch** mit dem Entwurf in
> `designentwürfe/` und wurde daher aus `website/` entfernt (das Original bleibt unter
> `designentwürfe/` erhalten).
>
> **Hero-Variante:** Die beiden Entwürfe unterscheiden sich nur in der Hero-Sektion (eine
> Codezeile im Template). Maßgeblich ist die **Vollbild**-Variante: Foto als vollflächiger
> Hintergrund über die ganze Breite, dunkler Verlauf, weißer Text darüber. Diese ist umgesetzt.

---

## 4. Umsetzung der Anforderungen (a–n)

- **a) Auftrennung der All-in-one-Datei** → erledigt: separates HTML/CSS/JS, Schriften & Icons
  in `assets/`, Bilder in `bilder/`, server-fertige Struktur.
- **b) Sprache DE-DE, UTF-8, korrekte Umlaute** → erledigt: `<html lang="de">`, `charset=utf-8`,
  alle Umlaute wortgenau übernommen.
- **c) Git** → lokales Repo eingerichtet; GitHub-Remote `git@github.com:raimurokko/anna_praedel_hundetrainerin.git` verbunden, `main` gepusht (Upstream gesetzt).
- **d) sitemap.xml, robots.txt, security.txt, llms.txt** → angelegt. (Hinweis: Der etablierte
  Standard heißt `llms.txt`, nicht `llm.txt` – siehe llmstxt.org.)
- **e) Bilder/Videos der Kundin** → `bilder/`-Ordner + `bilder/README.md` mit konkreten Specs
  und Liste der benötigten Motive; Platzhalter im Code mit `TODO(Kundin)` markiert.
- **f) Meta-Integration + Datenschutz, minimal/DSGVO-konform** → Links statt Tracking; Datenschutz
  spiegelt das wider. **Kein Consent-Banner** (mangels nicht-notwendiger Cookies nicht erforderlich),
  stattdessen ein schlanker, nicht-blockierender **Info-Hinweis** (einmalig, wegklickbar, blendet
  nach 12 s aus), der die Datensparsamkeit aktiv kommuniziert.
- **g) Google-Schriften lokal** → Figtree (und die Lesehilfe OpenDyslexic) werden lokal
  ausgeliefert; keine Verbindung zu Google; in der Datenschutzerklärung entsprechend vermerkt
  (kein Consent nötig).
- **h) Barrierefreiheit + Button** → A11y-Panel rechts mittig (Rollstuhl-Symbol):
  Schriftgröße, **Dyslexie-Schrift (OpenDyslexic)**, Kontrast, Links unterstreichen,
  Animationen reduzieren und **Vorlesefunktion** (Web Speech API, lokal im Browser);
  dazu semantisches HTML, Skip-Link, Fokus-Stile, Tastaturbedienung. Panel + Scroll-up
  werden per `main.js` auf allen Seiten injiziert (eine Quelle der Wahrheit).
- **i) Scroll-up-Button** → erscheint nach ~60 % Viewport-Scroll, animiert, mit Fokus-Rücksprung.
- **j) Fixiertes Menü** → Header ist `position: fixed` (vorher nur „sticky"); Body-Offset gesetzt.
- **k) Schema.org + SEO/AEO/LLM** → JSON-LD-Graph (WebSite, WebPage, LocalBusiness/ProfessionalService,
  Person, FAQPage), Meta-/OG-/Twitter-Tags, Canonical, `llms.txt`, semantische Struktur.
- **l) Doku + Backlog** → dieses Dokument + `BACKLOG.md`.
- **m) Meinung/Entscheidungsvorschläge** → siehe Abschnitt 2 (vorab als Auswahl vorgelegt).
- **n) Rückfragen** → siehe Abschnitt 6 (offene Daten der Kundin).

---

## 5. Entwickeln, Vorschau & Deployment

**Lokale Vorschau** (statisch, kein Build):
```bash
cd website
python3 -m http.server 8080
# Browser: http://localhost:8080
```
Wichtig: über einen lokalen Server öffnen (nicht per `file://`), da absolute Pfade (`/assets/…`)
und das Manifest sonst nicht laden.

**Vorschau (GitHub Pages):** Live unter
`https://raimurokko.github.io/anna_praedel_hundetrainerin/` (Workflow
`.github/workflows/pages.yml`, veröffentlicht `website/`). Bewusst auf **noindex**
gesetzt (robots.txt + Meta nur im Deploy-Artefakt; die Quelle bleibt indexierbar).
Einmalige Aktivierung war: Repo → Settings → Pages → Source = „GitHub Actions".
Jeder Push auf `main` deployt automatisch neu.

**Deployment (Produktion):** Inhalt von `website/` 1:1 auf den Webspace/Server legen (Document-Root).
Voraussetzungen: HTTPS aktiv, `404.html` als Fehlerseite konfigurieren, korrekte MIME-Typen
für `.webp`/`.woff2`. Server-Logfile-Aufbewahrung mit der Datenschutzerklärung abgleichen.

---

## 6. Offene Daten der Kundin (blockierend für Go-Live)

Diese Angaben sind im Code als `TODO(Kundin)` bzw. in den Rechtsseiten als `[Platzhalter]` markiert:

1. **Domain** bestätigen (aktuell überall `hundetraining-annap.de`).
2. **Impressum:** ladungsfähige Anschrift, Telefon, E-Mail; Kleinunternehmer (§19 UStG) oder USt-IdNr.;
   Erlaubnis nach § 11 TierSchG (Behörde/Aktenzeichen).
3. **Hosting-Anbieter** (Name/Anschrift, Logfile-Aufbewahrungsdauer) für die Datenschutzerklärung.
4. **Kontaktdaten:** echte WhatsApp-Nummer (`wa.me/49…`), E-Mail bestätigen, Facebook-Seiten-URL
   (oder Karte entfernen), Instagram-Handle bestätigen.
5. **KITMIR e.V.** – Vereinsname/Link bestätigen.
6. **Bilder/Videos** inkl. Alternativtexte (siehe `website/bilder/README.md`).
7. **Datum** für „Stand:" in den Rechtstexten.

> Rechtlicher Hinweis: Impressum/Datenschutz sind sorgfältige Entwürfe, ersetzen aber keine
> Rechtsberatung. Vor Veröffentlichung prüfen (lassen).
