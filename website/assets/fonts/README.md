# Schriften & Lizenzen

Alle Schriften werden **lokal** ausgeliefert (keine Verbindung zu Google o. a.) und sind
frei lizenziert. Die jeweilige Lizenz-/Copyright-Datei muss bei jeder Weitergabe beiliegen.

| Schrift          | Rolle             | Dateien                    | Lizenz                       | Lizenztext             | Quelle |
|------------------|-------------------|----------------------------|------------------------------|------------------------|--------|
| **DejaVu Sans**  | **Standardschrift** | `dejavusans-latin-400/700.woff2` | Bitstream Vera / Public Domain | `DejaVuSans-LICENSE.txt` | https://dejavu-fonts.github.io |
| **Figtree**      | Fallback          | `figtree-*.woff2`          | SIL OFL 1.1                  | `Figtree-OFL.txt`      | https://github.com/erikdkennedy/figtree |
| **OpenDyslexic** | Lesehilfe (A11y)  | `opendyslexic-*.woff2`     | SIL OFL 1.1                  | `OpenDyslexic-OFL.txt` | https://opendyslexic.org |

OpenDyslexic dient als Lesehilfe (Barrierefreiheit) und wird nur geladen, wenn der
Nutzer den Dyslexie-Modus aktiviert.

> Wichtig fürs Deployment: Die Lizenz-Dateien (`*-OFL.txt`, `DejaVuSans-LICENSE.txt`) mit
> auf den Server legen (sie liegen im selben Ordner wie die Schriften).
