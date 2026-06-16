# Bilder & Videos

In diesen Ordner kommen alle von der Kundin gelieferten Fotos und Videosequenzen.
Sie ersetzen die grafischen Platzhalter („FOTO .webp — …") auf der Website.

## Benötigte Medien (aus den aktuellen Platzhaltern)

| Datei (Vorschlag)                | Verwendung                         | Format / Ausrichtung      | Empfohlene Größe |
|----------------------------------|------------------------------------|---------------------------|------------------|
| `anna-mit-hund-hochkant.webp`    | Hero (Startbild)                   | hochkant, 4:5             | ca. 1000 × 1250  |
| `portrait-anna.webp`             | „Über mich"                        | hochkant, 4:5             | ca. 1000 × 1250  |
| `kitmir-tierschutzhund.webp`     | Tierschutz / KITMIR                | quer, 5:4                 | ca. 1250 × 1000  |
| `social/anna-mit-hund.webp`      | Vorschaubild Social Media (OG)     | quer, 1200 × 630          | 1200 × 630       |
| `assets/icons/logo.webp`         | Logo (für Schema.org / Sharing)    | quadratisch               | 512 × 512        |

> Videos: kurze Sequenzen (z. B. MP4/WebM) sind willkommen, idealerweise ohne Ton-Autoplay,
> max. ~10–15 s, komprimiert (< 5 MB). Wir binden sie barrierearm ein (kein Autoplay mit Ton,
> Bedienelemente, ggf. Untertitel).

## Hinweise für die Lieferung

- **Format:** bevorzugt `.webp` (kleiner, schnell). `.jpg`/`.png` werden von uns konvertiert.
- **Auflösung:** lieber zu groß als zu klein liefern – wir skalieren herunter.
- **Bildrechte:** bitte nur Fotos liefern, an denen die Kundin die Nutzungsrechte hat
  (eigene Aufnahmen oder mit Einwilligung der abgebildeten Personen).
- **Alternativtexte:** zu jedem Bild bitte einen kurzen beschreibenden Satz mitliefern
  (für Barrierefreiheit & SEO), z. B. „Anna kniet neben einem Border Collie auf einer Wiese".

## Was wir damit tun

1. Bilder in mehreren Größen (responsive) bereitstellen (`srcset`).
2. Korrekte `alt`-Texte und `loading="lazy"` ergänzen.
3. Platzhalter in `index.html` ersetzen (siehe `TODO(Kundin)`-Kommentare im Code).
