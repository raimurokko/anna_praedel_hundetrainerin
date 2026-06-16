# Anna Prädel · Hundetraining – Website

Statische Website (HTML5 + CSS + Vanilla-JS, kein Build-Step) für die Hundetrainerin
Anna Prädel in Berlin Rudow.

## Schnellstart (lokale Vorschau)

```bash
cd website
python3 -m http.server 8080
# → http://localhost:8080
```

> Über einen lokalen Server öffnen, nicht per Doppelklick (`file://`), sonst laden die
> absoluten Pfade (`/assets/…`) nicht.

## Deployment

Den **kompletten Inhalt von `website/`** in das Document-Root des Webservers legen.
HTTPS aktivieren und `404.html` als Fehlerseite konfigurieren.

## Dokumentation

- [`PROJEKT.md`](PROJEKT.md) – Entscheidungen, Struktur, Anforderungen, offene Punkte
- [`BACKLOG.md`](BACKLOG.md) – Aufgabenliste
- [`website/bilder/README.md`](website/bilder/README.md) – benötigte Bilder/Videos

## Eckdaten

- Sprache: Deutsch (de-DE), UTF-8
- Schriften: Figtree, lokal (keine Google-Server)
- Datenschutz: datensparsam, kein Tracking, kein Cookie-Banner nötig
- Barrierefreiheit: A11y-Panel + semantisches HTML (WCAG 2.1 AA als Ziel)
