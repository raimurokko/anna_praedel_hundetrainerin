# Rubrik „Tiernotfall" – Doku & Pflege

Unterseite **`/tiernotfall/`** mit Notrufnummern für Hundehalter (Berlin & Brandenburg-Südumland),
nach Situation sortiert (Entscheidungsbaum, 9 Situationen). Basiert auf dem Briefing von Sophia/Novum
(`designentwürfe/annas-website-tiernotruf.zip`).

## Dateien
- **Datenquelle:** `website/daten/tiernotfall-kontakte.json` (Schema: `…/tiernotfall-kontakte.schema.json`)
- **Generator:** `tools/generate-tiernotfall.js` (Node, kein Buildstep/CI nötig)
- **Ausgabe (generiert, nicht von Hand editieren):** `website/tiernotfall/index.html`
- **Styles:** Abschnitt „Tiernotfall-Seite" in `website/assets/css/style.css` (inkl. `@media print`)
- **Print/Details:** Modul 8 in `website/assets/js/main.js` öffnet Akkordeons beim Drucken

## Pflege-Workflow (wichtig)
1. **Nur die JSON anfassen** (`website/daten/tiernotfall-kontakte.json`). Neue Kontakte via `id`
   referenzieren; `id` niemals ändern (nur `status: deprecated` setzen).
2. Danach Generator ausführen:
   ```bash
   node tools/generate-tiernotfall.js
   ```
3. Ergebnis (`website/tiernotfall/index.html`) mitcommitten. Die Situationen (Schritte + welche
   Kontakt-`id`s sie referenzieren) stehen im Generator (`SITS`-Array).

### Sticky-Notrufleiste
Die drei Nummern oben kommen aus der JSON (`notruf-112`, `notruf-110`, `polizei-buergertelefon`).
Auf schmalen Viewports (≤ 640 px) wird statt des vollen Kontaktnamens ein **Kurzlabel** angezeigt,
damit die Leiste kompakt bleibt und sticky sinnvoll ist. Die Kurzlabels stehen als reine
Darstellungs-Info im Generator (`STICKY_SHORT`), **nicht** in der JSON. Der volle Name bleibt für
Screenreader über `aria-label` am Link erhalten.

## Status-Feld
- `active` – wird gerendert.
- `verify_before_launch` – wird mit sichtbarem Vorbehalt-Hinweis gerendert; **vor Go-Live prüfen**.
- `deprecated` – wird nicht gerendert, `id` bleibt reserviert.
- `privat_kostenpflichtig` (org_type) wird als Warn-Badge gekennzeichnet + Neutralitätshinweis
  („keine Geschäftsbeziehung").

## Stand / Review
- Die Seite zeigt automatisch das **älteste `verified_date` der aktiven Einträge** als „Stand".
- `meta.review_interval_months = 6` → **halbjährlich alle Nummern gegen die Quelle prüfen** und
  `verified_date` aktualisieren (siehe Backlog).
- **Keine Nummern raten** – nur mit belegter offizieller Quelle ergänzen (`source`).

## Verifikation 03.08.2026 (per Websuche, offizielle Quellen)
- ✅ `fu-dueppel` – Notfall 0160 3758447, Notfallannahme Mo–Fr 8–18 / Sa-So-Feiertag 10–18 (vetmed.fu-berlin.de)
- ✅ `vet-neukoelln` – 030 90239-6749, vetleb@bezirksamt-neukoelln.de (berlin.de)
- ✅ `tsv-katzenrettung` – Durchwahl -139 **nicht** bestätigt → bestätigte Zentrale 030 76888-0 (tierschutz-berlin.de)
- ✅ `kadaver-entsorgung` – kein Zentraltelefon; Prozess über Veterinär-/Ordnungsamt (service.berlin.de)
- ⏳ `tierfang-berlin` – 030 9029 64718 **nicht** bestätigt (offizielle Anlaufstelle = Tiersammelstelle 76888-2xx) → bleibt `verify_before_launch`
- ⏳ `tierheim-brandenburg` – für Schönefeld/LDS zuständiges Tierheim (Dahme-Spreewald) noch zu recherchieren → bleibt `verify_before_launch`
