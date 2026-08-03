#!/usr/bin/env node
/* Generator für die Tiernotfall-Seite.
   Liest daten/tiernotfall-kontakte.json und erzeugt website/tiernotfall/index.html
   als STATISCHES HTML (gut für SEO/LLM). Pflege-Workflow: nur die JSON anfassen,
   danach `node tools/generate-tiernotfall.js` ausführen.
   Doku: docs/tiernotfall.md */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'website/daten/tiernotfall-kontakte.json'), 'utf8'));
const byId = Object.fromEntries(data.contacts.map(c => [c.id, c]));

function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

const BADGE = { amtlich: 'amtlich', gemeinnuetzig: 'gemeinnützig', privat_kostenpflichtig: 'privat · kostenpflichtig' };

function card(id) {
  const c = byId[id];
  if (!c) return `<!-- WARN: unbekannte Kontakt-ID ${esc(id)} -->`;
  const parts = [];
  parts.push(`<div class="notfall-card notfall-card--${esc(c.org_type)}">`);
  parts.push(`  <div class="notfall-card__head"><span class="notfall-card__name">${esc(c.name)}</span>` +
             `<span class="notfall-badge notfall-badge--${esc(c.org_type)}">${esc(BADGE[c.org_type] || c.org_type)}</span></div>`);
  if (c.phone) parts.push(`  <a class="notfall-card__phone" href="tel:${esc(c.phone.e164)}">☎ ${esc(c.phone.display)}</a>`);
  if (c.availability) parts.push(`  <span class="notfall-card__avail">${esc(c.availability)}</span>`);
  if (c.address) parts.push(`  <span class="notfall-card__avail">${esc(c.address)}</span>`);
  if (c.email) parts.push(`  <a class="notfall-card__link" href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
  if (c.note) parts.push(`  <p class="notfall-card__note">${esc(c.note)}</p>`);
  if (c.url) parts.push(`  <a class="notfall-card__link" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Website öffnen</a>`);
  if (c.status === 'verify_before_launch') parts.push(`  <p class="notfall-card__verify">⚠ Diese Angabe wird noch geprüft – im Zweifel Polizei-Bürgertelefon anrufen.</p>`);
  parts.push(`</div>`);
  return parts.join('\n');
}

function step(s) {
  const inner = [];
  if (s.text) inner.push(`<p>${s.text}</p>`);
  if (s.contacts) inner.push(s.contacts.map(card).join('\n'));
  return `<li>${inner.join('\n')}</li>`;
}

// Situationen (Reihenfolge = Relevanz für Hundehalter in Annas Einzugsgebiet)
const SITS = [
  { id: 'gift', title: 'Mein Hund hat etwas Giftiges gefressen (Giftköder!)',
    faq: 'Sofort die nächste Tierklinik/den tierärztlichen Notdienst anrufen und hinfahren – nicht abwarten. Reste/Verpackung mitnehmen. Fundort ans Veterinäramt melden und andere Halter warnen.',
    steps: [
      { text: '<strong>Sofort</strong> die nächste Tierklinik / den tierärztlichen Notdienst anrufen und hinfahren – NICHT abwarten. Probe, Reste oder Verpackung des Köders mitnehmen.', contacts: ['tak-notdienst', 'fu-dueppel'] },
      { text: 'Fundort des Köders dem Veterinäramt des Bezirks melden und andere Halter warnen (Giftköder-Gruppen/Apps).', contacts: ['vet-neukoelln'] },
      { text: '<span class="notfall-warn">Wichtig: Der Giftnotruf der Charité berät ausschließlich zu Vergiftungen bei <em>Menschen</em> – nicht für Tiere. Nur relevant, falls z. B. ein Kind einen Köder angefasst hat.</span>', contacts: ['giftnotruf-charite'] }
    ] },
  { id: 'medizin', title: 'Mein Tier hat einen medizinischen Notfall',
    faq: 'Zuerst die eigene Tierarztpraxis, sonst tierärztlicher Notdienst / Tierklinik. Mobile Tiernotdienste sind privat und kostenpflichtig. Taxis in Berlin müssen Hunde/Katzen befördern.',
    steps: [
      { text: 'Wenn erreichbar: eigene Tierarztpraxis anrufen.' },
      { text: 'Sonst tierärztlicher Notdienst / Tierklinik:', contacts: ['tak-notdienst', 'fu-dueppel'] },
      { text: 'Optional (privat &amp; kostenpflichtig): mobile Tiernotdienste. <span class="notfall-neutral">Hinweis: Wir haben mit diesen Anbietern keine Geschäftsbeziehung.</span>', contacts: ['mobil-tierrettung-bb', 'mobil-tieraerzte-notdienst'] },
      { text: 'Gut zu wissen: Tierkliniken haben Kapazitätsengpässe – Wartezeit einplanen. Taxis in Berlin sind verpflichtet, Hunde und Katzen zu befördern.' }
    ] },
  { id: 'gefunden', title: 'Ich habe ein Haustier gefunden',
    faq: 'Chip kostenlos in jeder Tierarztpraxis/jedem Tierheim auslesen lassen, Register abfragen (TASSO/FINDEFIX), Fundmeldung machen und – Pflicht in Berlin – die Amtliche Tiersammelstelle informieren.',
    steps: [
      { text: 'Chip prüfen lassen: <strong>Jede Tierarztpraxis und jedes Tierheim liest den Chip kostenlos aus.</strong> (Chip ≠ Registrierung – er nützt nur, wenn das Tier bei TASSO, FINDEFIX o. ä. registriert ist.)' },
      { text: 'Registerabfrage online:', contacts: ['tasso-tkn', 'findefix-check', 'petmaxx'] },
      { text: 'Fundmeldung (24 h):', contacts: ['tasso-hotline', 'findefix-hotline', 'findefix-fundmeldung'] },
      { text: 'Amtlicher Weg Berlin (Fundtiere sind meldepflichtig, §§ 965 ff. BGB): Amtliche Tiersammelstelle, täglich 8–16 Uhr; außerhalb Polizei-Bürgertelefon.', contacts: ['tiersammelstelle'] },
      { text: 'Fund im Brandenburger Umland (z. B. Schönefeld): Tierheim des Landkreises.', contacts: ['tierheim-brandenburg'] }
    ] },
  { id: 'vermisst', title: 'Ich vermisse mein Tier',
    faq: 'Bei der Amtlichen Tiersammelstelle nachfragen (dort laufen Berliner Fundtiere auf), Suchmeldung bei TASSO (24 h), Polizeirevier des Verlustorts informieren. In Suchanzeigen keine private Nummer/Belohnung nennen.',
    steps: [
      { text: 'Bei der Amtlichen Tiersammelstelle anrufen – dort laufen Berliner Fundtiere auf.', contacts: ['tiersammelstelle'] },
      { text: 'Suchmeldung (24 h):', contacts: ['tasso-hotline'] },
      { text: '<strong>TASSO-Tipp:</strong> In öffentlichen Suchanzeigen keine private Telefonnummer und keine Belohnung nennen (Schutz vor Betrug).' },
      { text: 'Polizeirevier des Verlustorts informieren.', contacts: ['polizei-buergertelefon'] }
    ] },
  { id: 'wildtier', title: 'Ich habe ein verletztes oder hilfloses Wildtier gefunden',
    faq: 'Nicht jedes Jungtier ist hilfsbedürftig – erst anrufen, dann handeln. Wildvögel: NABU-Wildvogelstation bzw. verletzte direkt zur FU-Kleintierklinik. Säugetiere/Igel/Eichhörnchen: jeweilige Notrufe.',
    steps: [
      { text: 'Erst prüfen: <strong>Nicht jedes Jungtier ist hilfsbedürftig</strong> – Alttiere sind meist in der Nähe. Erst anrufen, dann handeln.' },
      { text: 'Wildvögel: Station anrufen; <em>verletzte</em> Wildvögel direkt zur FU-Kleintierklinik bringen (kostenlose Behandlung). Nicht unangekündigt zur Wildvogelstation bringen.', contacts: ['nabu-wildvogelstation', 'fu-dueppel'] },
      { text: 'Säugetiere (Fuchs, Marder, Waschbär …):', contacts: ['nabu-wildtiertelefon'] },
      { text: 'Eichhörnchen:', contacts: ['eichhoernchen-notruf', 'eichhoernchenhilfe-bb'] },
      { text: 'Igel:', contacts: ['igelschutz-berlin'] },
      { text: 'Überregional / Brandenburg:', contacts: ['wildtierschutz-de', 'wildtierhilfe-potsdam', 'tierrettung-potsdam'] },
      { text: 'Gefahrensituation (Tier auf der Fahrbahn, Bergung): Polizei-Bürgertelefon, bei Gefahr für Menschen 112.', contacts: ['polizei-buergertelefon'] }
    ] },
  { id: 'wildunfall', title: 'Wildunfall mit dem Auto',
    faq: 'Unfallstelle absichern, 110 anrufen, am Ort bleiben. Die Polizei verständigt den Jagdpächter und stellt eine Wildunfallbescheinigung aus. Verletztes Tier nicht anfassen, totes Wild nicht mitnehmen.',
    steps: [
      { text: 'Unfallstelle absichern, <strong>110 anrufen</strong>, am Unfallort bleiben.', contacts: ['notruf-110'] },
      { text: 'Die Polizei verständigt den Jagdpächter und stellt eine Wildunfallbescheinigung für die Versicherung aus.' },
      { text: 'Verletztes Tier nicht anfassen (Verletzungsgefahr), totes Wild nicht mitnehmen (Wilderei).' }
    ] },
  { id: 'quaelerei', title: 'Ich beobachte Tierquälerei / schlechte Haltung',
    faq: 'Akut (z. B. Hund im heißen Auto): sofort Polizei 110 – auch nachts/Wochenende. Nicht akut: Veterinär- und Lebensmittelaufsicht des Bezirks; zuständig ist das Veterinäramt, nicht das allgemeine Ordnungsamt.',
    steps: [
      { text: '<strong>Akut</strong> (z. B. Hund im heißen Auto): sofort Polizei 110 – gilt auch nachts und am Wochenende.', contacts: ['notruf-110'] },
      { text: 'Nicht akut: Veterinär- und Lebensmittelaufsicht des Bezirks (zuständig ist das Veterinäramt, nicht das allgemeine Ordnungsamt).', contacts: ['vet-neukoelln'] },
      { text: 'Beratung durch Tierschutzberater:', contacts: ['tsv-berater'] },
      { text: 'Info-Ressource:', contacts: ['landestierschutz'] },
      { text: 'Bei der Meldung Name, Anschrift und konkrete Beobachtung (Datum/Ort) angeben – anonyme Meldungen sind möglich, aber schwerer zu verfolgen.' }
    ] },
  { id: 'katze-baum', title: 'Katze auf dem Baum / Tier in misslicher Lage',
    faq: 'Die Berliner Feuerwehr ist dafür nicht zuständig – Ansprechpartner ist der Tierschutzverein/das Tierheim Berlin. Nur bei Gefahr für Menschen oder Verkehr 112.',
    steps: [
      { text: 'Die Berliner Feuerwehr ist dafür <strong>nicht</strong> zuständig – Ansprechpartner ist der Tierschutzverein / das Tierheim Berlin.', contacts: ['tsv-katzenrettung'] },
      { text: 'Nur bei Gefahr für Menschen oder den Verkehr: 112.', contacts: ['notruf-112'] }
    ] },
  { id: 'totes-tier', title: 'Ich habe ein totes Tier gefunden',
    faq: 'Haustier mit möglichem Chip der Tiersammelstelle melden (nur so erfährt der Halter davon). Wildtier/Kadaver auf öffentlichem Land: Veterinär-/Ordnungsamt des Bezirks. Auf Autobahn/Bundesstraße: Polizei.',
    steps: [
      { text: 'Haustier mit möglichem Chip: Tiersammelstelle informieren – nur so erfährt der Halter vom Schicksal seines Tieres.', contacts: ['tiersammelstelle'] },
      { text: 'Wildtier / Kadaver auf öffentlichem Land: Veterinär-/Ordnungsamt des Bezirks.', contacts: ['kadaver-entsorgung'] },
      { text: 'Auf Autobahn / Bundesstraße: Polizei.', contacts: ['notruf-110'] }
    ] }
];

// "Stand" = ältestes verified_date unter den aktiven Einträgen
const stand = data.contacts.filter(c => c.status === 'active' && c.verified_date).map(c => c.verified_date).sort()[0] || data.meta.last_full_review;

const sticky = ['notruf-112', 'notruf-110', 'polizei-buergertelefon'].map(id => {
  const c = byId[id];
  return `<a class="notfall-num" href="tel:${esc(c.phone.e164)}"><span class="notfall-num__n">${esc(c.phone.display)}</span><span class="notfall-num__l">${esc(c.name)}</span></a>`;
}).join('\n        ');

const situationsHtml = SITS.map(s => `      <details class="notfall-sit" id="sit-${s.id}">
        <summary><span>${s.title}</span><span class="sign" aria-hidden="true">+</span></summary>
        <ol class="notfall-steps">
${s.steps.map(step).join('\n')}
        </ol>
      </details>`).join('\n');

const faqLd = {
  '@type': 'FAQPage',
  mainEntity: SITS.map(s => ({ '@type': 'Question', name: s.title, acceptedAnswer: { '@type': 'Answer', text: s.faq } }))
};
const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': 'https://hundetraining-ap.de/tiernotfall/#webpage', url: 'https://hundetraining-ap.de/tiernotfall/', name: 'Tiernotfall in Berlin & Brandenburg', inLanguage: 'de-DE', isPartOf: { '@id': 'https://hundetraining-ap.de/#website' }, about: { '@id': 'https://hundetraining-ap.de/#business' } },
    { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hundetraining-ap.de/' }, { '@type': 'ListItem', position: 2, name: 'Tiernotfall' } ] },
    faqLd
  ]
};

const page = `<!DOCTYPE html>
<html lang="de" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tiernotfall in Berlin &amp; Brandenburg: alle wichtigen Nummern | Anna Prädel</title>
  <meta name="description" content="Tiernotfall in Berlin &amp; Brandenburg: alle wichtigen Notrufnummern für Hundehalter — Giftköder, Fundtiere, Wildtiere, Tierquälerei melden. Nach Situation sortiert, zum Ausdrucken.">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="author" content="Anna Prädel">
  <meta name="theme-color" content="#7E1F2D">
  <link rel="canonical" href="https://hundetraining-ap.de/tiernotfall/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="de_DE">
  <meta property="og:title" content="Tiernotfall in Berlin &amp; Brandenburg: alle wichtigen Nummern">
  <meta property="og:description" content="Notrufnummern für Hundehalter, nach Situation sortiert — Giftköder, Fundtiere, Wildtiere, Tierquälerei.">
  <meta property="og:url" content="https://hundetraining-ap.de/tiernotfall/">
  <meta property="og:image" content="https://hundetraining-ap.de/bilder/social/anna-mit-hund.jpg">
  <link rel="icon" href="../assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="../assets/fonts/dejavusans-latin-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../assets/css/fonts.css">
  <link rel="stylesheet" href="../assets/css/style.css">
  <script>
    (function () { try {
      var t = localStorage.getItem('apht-theme');
      if (t !== 'dark' && t !== 'light') t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      var fs = parseFloat(localStorage.getItem('apht-fontscale')); if (fs) document.documentElement.style.setProperty('--fontscale', fs);
      if (localStorage.getItem('apht-dyslexia') === 'on') document.documentElement.setAttribute('data-dyslexia', 'true');
      if (localStorage.getItem('apht-contrast') === 'on') document.documentElement.setAttribute('data-contrast', 'high');
      if (localStorage.getItem('apht-underline') === 'on') document.documentElement.setAttribute('data-underline', 'true');
      if (localStorage.getItem('apht-motion') === 'on') document.documentElement.setAttribute('data-motion', 'reduce');
    } catch (e) {} })();
  </script>
  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>
</head>
<body>
  <a class="skip-link" href="#hauptinhalt">Zum Inhalt springen</a>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="../index.html" aria-label="Anna Prädel Hundetraining – Startseite">
        <span class="brand__mark" aria-hidden="true"><span></span></span>
        <span class="brand__text"><span class="brand__name">Hundetraining</span><span class="brand__sub">Anna Prädel</span></span>
      </a>
      <nav class="nav-desktop" aria-label="Hauptnavigation">
        <a class="navlink" href="../index.html#beziehung">Beziehung</a>
        <a class="navlink" href="../index.html#angebot">Angebot</a>
        <a class="navlink" href="../index.html#ueber-mich">Über mich</a>
        <a class="navlink" href="../index.html#kurse">Kurse</a>
        <a class="navlink" href="../index.html#tierschutz">Tierschutz</a>
        <a class="navlink" href="index.html" aria-current="page">Notfall</a>
        <a class="navlink" href="../ratgeber/index.html">Ratgeber</a>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Zum dunklen Modus wechseln">
          <span class="theme-toggle__dot" aria-hidden="true"></span><span data-theme-text>Dunkel</span>
        </button>
        <a class="btn btn--primary btn--sm" href="../index.html#kontakt">Schreib mir</a>
      </nav>
      <div class="nav-mobile-controls">
        <button class="icon-btn" type="button" data-theme-toggle aria-label="Zum dunklen Modus wechseln"><span class="theme-toggle__dot" aria-hidden="true"></span></button>
        <button class="burger" type="button" data-burger aria-expanded="false" aria-controls="mobileNav" aria-label="Menü öffnen oder schließen"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button>
      </div>
    </div>
    <nav class="nav-mobile" id="mobileNav" data-mobile-nav data-open="false" aria-label="Hauptnavigation (mobil)">
      <a href="../index.html#beziehung">Beziehung</a>
      <a href="../index.html#angebot">Angebot</a>
      <a href="../index.html#ueber-mich">Über mich</a>
      <a href="../index.html#kurse">Kurse</a>
      <a href="../index.html#tierschutz">Tierschutz</a>
      <a href="index.html">Notfall</a>
      <a href="../ratgeber/index.html">Ratgeber</a>
      <a class="nav-mobile__cta" href="../index.html#kontakt">Schreib mir</a>
    </nav>
  </header>

  <main id="hauptinhalt">
    <div class="container section tiernotfall">
      <span class="eyebrow">Tiernotfall</span>
      <h1>Tiernotfall in Berlin &amp; Brandenburg</h1>
      <p class="muted tiernotfall__intro">Was ist passiert? Wähle deine Situation und folge den Schritten der Reihe nach. Die drei wichtigsten Nummern findest du oben immer griffbereit.</p>

      <div class="notfall-sticky" role="group" aria-label="Wichtigste Notrufnummern">
        ${sticky}
      </div>

      <div class="notfall-situations">
${situationsHtml}
      </div>

      <div class="notfall-outro">
        <p class="notfall-stand">Stand der Angaben: ${esc(stand)} · Nummer veraltet? <a href="../index.html#kontakt">Schreib uns.</a></p>
        <p class="notfall-disclaimer">Diese Übersicht ersetzt keine tierärztliche Beratung. Alle Angaben ohne Gewähr; im Zweifel immer den Notruf wählen.</p>
        <button type="button" class="btn btn--ghost" onclick="window.print()">🖨 Für den Kühlschrank ausdrucken</button>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="site-footer__bottom">
      <p>© <span id="year">2026</span> Hundetraining · Anna Prädel, Berlin ·
        <a href="../impressum.html">Impressum</a> · <a href="../datenschutz.html">Datenschutz</a> · <a href="../barrierefreiheit.html">Barrierefreiheit</a>
      </p>
      <p class="site-footer__credit">Umsetzung: <a href="https://www.inu-trust.ch" target="_blank" rel="nofollow noopener noreferrer">Inu-Trust AG</a></p>
      <p class="site-footer__credit site-footer__cause">Kostenlose Soforthilfe bei digitaler Gewalt, Stalking &amp; Online-Betrug: <a href="https://digitale-ersthilfe.novumanalytica.com" target="_blank" rel="nofollow noopener noreferrer">Digitale&nbsp;Ersthilfe</a></p>
    </div>
  </footer>
  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
  <script src="../assets/js/main.js" defer></script>
</body>
</html>
`;

fs.mkdirSync(path.join(ROOT, 'website/tiernotfall'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'website/tiernotfall/index.html'), page, 'utf8');
console.log('tiernotfall/index.html generiert · Situationen: ' + SITS.length + ' · Stand: ' + stand);
