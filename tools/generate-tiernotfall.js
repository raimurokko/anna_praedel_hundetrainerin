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

/* Korrektur-Meldung: vorausgefuellte Mail statt Sprung in die Kontakt-Sektion.
   Die abgefragten Felder sind genau die, die fuer die JSON-Pflege gebraucht werden
   (Eintrag, Fehler, richtige Angabe, Quelle) – "keine Nummern ohne Quelle". */
const KORREKTUR_MAIL = 'info@hundetraining-ap.de';
const korrekturBody = [
  'Hallo Anna,', '',
  'auf der Seite hundetraining-ap.de/tiernotfall/ stimmt eine Angabe nicht mehr:', '',
  'Welcher Eintrag: ',
  'Was ist veraltet oder falsch: ',
  'Richtige Angabe (falls bekannt): ',
  'Quelle / Link (falls vorhanden): ', '',
  'Viele Grüße'
].join('\n');
const korrekturMailto = 'mailto:' + KORREKTUR_MAIL +
  '?subject=' + encodeURIComponent('Tiernotfall-Seite: Korrektur zu einem Eintrag') +
  '&body=' + encodeURIComponent(korrekturBody);

/* ---------- Kuehlschrank-Version (kompakte Druckseite, Ziel: 1 Blatt A4) ----------
   Kurztitel + eine Handlungszeile je Situation. Inhaltlich destilliert aus
   SITS[].faq/steps oben – hier stehen bewusst KEINE zusaetzlichen Fakten. */
const PRINT_META = {
  gift:        { short: 'Giftköder / Vergiftung',        tip: 'Sofort Klinik/Notdienst anrufen und hinfahren – nicht abwarten. Reste des Köders mitnehmen.' },
  medizin:     { short: 'Medizinischer Notfall',         tip: 'Erst die eigene Praxis, sonst Notdienst/Klinik. Taxis in Berlin müssen Hunde und Katzen befördern.' },
  gefunden:    { short: 'Haustier gefunden',             tip: 'Chip kostenlos auslesen lassen (jede Praxis, jedes Tierheim), Register abfragen, Tiersammelstelle melden (Pflicht).' },
  vermisst:    { short: 'Tier vermisst',                 tip: 'Tiersammelstelle fragen, Suchmeldung bei TASSO, Polizeirevier des Verlustorts. In Anzeigen keine private Nummer, keine Belohnung.' },
  wildtier:    { short: 'Wildtier verletzt / hilflos',   tip: 'Nicht jedes Jungtier braucht Hilfe – erst anrufen, dann handeln.' },
  wildunfall:  { short: 'Wildunfall mit dem Auto',       tip: 'Unfallstelle absichern, 110 anrufen, am Ort bleiben. Tier nicht anfassen, totes Wild nicht mitnehmen.' },
  quaelerei:   { short: 'Tierquälerei / schlechte Haltung', tip: 'Akut (z. B. Hund im heißen Auto): sofort 110, auch nachts. Sonst Veterinäramt des Bezirks.' },
  'katze-baum':{ short: 'Katze auf dem Baum',            tip: 'Die Feuerwehr ist nicht zuständig – Tierschutzverein anrufen. 112 nur bei Gefahr für Menschen.' },
  'totes-tier':{ short: 'Totes Tier gefunden',           tip: 'Haustier mit Chip der Tiersammelstelle melden – nur so erfährt der Halter vom Schicksal seines Tieres.' }
};

// Kurznamen fuer den Druck (die vollen Namen sprengen die Spaltenbreite).
const PRINT_SHORT = {
  'notruf-112': 'Feuerwehr / Rettungsdienst',
  'notruf-110': 'Polizei-Notruf',
  'polizei-buergertelefon': 'Polizei Berlin, Bürgertelefon',
  'tiersammelstelle': 'Amtl. Tiersammelstelle',
  'tierfang-berlin': 'Amtlicher Tierfang Berlin',
  'tasso-hotline': 'TASSO Notrufzentrale',
  'tasso-tkn': 'TASSO Chip-Abfrage',
  'findefix-hotline': 'FINDEFIX Service-Telefon',
  'findefix-check': 'FINDEFIX Chip-Abfrage',
  'findefix-fundmeldung': 'FINDEFIX Fundmeldung',
  'petmaxx': 'Petmaxx (Metasuche Register)',
  'tak-notdienst': 'Tierärztekammer-Notdienst',
  'fu-dueppel': 'FU-Kleintierklinik Düppel',
  'giftnotruf-charite': 'Giftnotruf Charité – nur für Menschen!',
  'nabu-wildtiertelefon': 'NABU Wildtiertelefon',
  'nabu-wildvogelstation': 'NABU Wildvogelstation',
  'eichhoernchen-notruf': 'Eichhörnchen Notruf e.V.',
  'eichhoernchenhilfe-bb': 'Eichhörnchenhilfe Berlin/BB',
  'igelschutz-berlin': 'AK Igelschutz Berlin',
  'wildtierschutz-de': 'Wildtierschutz Dtl.',
  'wildtierhilfe-potsdam': 'Wildtierhilfe Potsdam',
  'tierrettung-potsdam': 'Tierrettung Potsdam',
  'tierheim-berlin': 'Tierheim Berlin',
  'tierheim-brandenburg': 'Tierheim Brandenburg/Havel',
  'tsv-berater': 'Tierschutzberater, TSV Berlin',
  'tsv-katzenrettung': 'Tierschutz Berlin, Tierrettung',
  'vet-neukoelln': 'Veterinäramt Neukölln (Rudow)',
  'landestierschutz': 'Landestierschutzbeauftragte',
  'mobil-tierrettung-bb': 'Mobile Tiernotfallrettung BB',
  'mobil-tieraerzte-notdienst': 'Tierärzte im Notdienst BB',
  'kadaver-entsorgung': 'Ordnungsamt des Bezirks / BSR'
};

const NOTRUF_IDS = ['notruf-112', 'notruf-110', 'polizei-buergertelefon'];

function domainOf(url) {
  const m = String(url || '').match(/^https?:\/\/(?:www\.)?([^/]+)/i);
  return m ? m[1] : '';
}

/* Kontakte je Situation: aus den steps eingesammelt, dedupliziert.
   Die drei Notrufnummern stehen bereits im Kopfblock -> hier weglassen. */
function printContacts(sit) {
  const seen = new Set();
  const out = [];
  (sit.steps || []).forEach(st => (st.contacts || []).forEach(id => {
    if (seen.has(id) || NOTRUF_IDS.includes(id)) return;
    seen.add(id);
    const c = byId[id];
    if (!c || c.status === 'deprecated') return;
    const value = c.phone ? c.phone.display : domainOf(c.url);
    if (!value) return;
    const flags = [];
    if (c.org_type === 'privat_kostenpflichtig') flags.push('privat, kostenpflichtig');
    if (c.status === 'verify_before_launch') flags.push('wird noch geprüft');
    out.push({ name: PRINT_SHORT[id] || c.name, value, isPhone: !!c.phone, e164: c.phone && c.phone.e164, flags });
  }));
  return out;
}

const printBlocks = SITS.map(s => {
  const meta = PRINT_META[s.id] || { short: s.title, tip: '' };
  const rows = printContacts(s).map(r => {
    const val = r.isPhone
      ? `<a class="kb-num" href="tel:${esc(r.e164)}">${esc(r.value)}</a>`
      : `<span class="kb-web">${esc(r.value)}</span>`;
    const flag = r.flags.length ? ` <span class="kb-flag">(${esc(r.flags.join('; '))})</span>` : '';
    return `      <li><span class="kb-name">${esc(r.name)}${flag}</span>${val}</li>`;
  }).join('\n');
  return `    <section class="kb-sit">
      <h2>${esc(meta.short)}</h2>
      ${meta.tip ? `<p class="kb-tip">${esc(meta.tip)}</p>` : ''}
      <ul class="kb-list">
${rows}
      </ul>
    </section>`;
}).join('\n');

const notrufBlock = NOTRUF_IDS.map(id => {
  const c = byId[id];
  return `      <a class="kb-emerg" href="tel:${esc(c.phone.e164)}"><strong>${esc(c.phone.display)}</strong><span>${esc(PRINT_SHORT[id] || c.name)}</span></a>`;
}).join('\n');

const kuehlschrank = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tiernotfall Berlin – Notrufnummern zum Ausdrucken | Anna Prädel</title>
<meta name="description" content="Kompakte Übersicht aller wichtigen Tiernotfall-Nummern für Berlin und Brandenburg – auf ein Blatt A4 zum Ausdrucken und an den Kühlschrank hängen.">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="https://hundetraining-ap.de/tiernotfall/">
<link rel="icon" href="../assets/icons/favicon.svg" type="image/svg+xml">
<style>
  /* Eigenstaendiges CSS: bewusst OHNE style.css, damit der Druck exakt
     kontrollierbar bleibt (Ziel: genau 1 Blatt A4). */
  *, *::before, *::after { box-sizing: border-box; }
  :root { --ink: #1a1a1a; --line: #c9c9c9; --wine: #7E1F2D; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0; padding: 14mm 12mm; background: #fff; color: var(--ink);
    font-family: 'DejaVu Sans', Verdana, Geneva, sans-serif;
    font-size: 9.7pt; line-height: 1.3;
  }
  a { color: inherit; text-decoration: none; }
  .kb-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    border-bottom: 2px solid var(--wine); padding-bottom: 5px; margin-bottom: 8px; }
  .kb-head h1 { font-size: 16pt; margin: 0; color: var(--wine); letter-spacing: -.01em; }
  .kb-head p { margin: 0; font-size: 8.6pt; color: #555; }
  .kb-head .kb-src { margin-left: auto; }
  .kb-emergrow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 9px; }
  .kb-emerg { display: flex; flex-direction: column; align-items: center; justify-content: center;
    border: 1.6pt solid var(--wine); border-radius: 3mm; padding: 4px 3px; text-align: center; }
  .kb-emerg strong { font-size: 17pt; line-height: 1.05; color: var(--wine); }
  .kb-emerg span { font-size: 8.2pt; color: #444; }
  .kb-grid { column-count: 2; column-gap: 8mm; column-rule: 1px solid var(--line); }
  .kb-sit { break-inside: avoid; page-break-inside: avoid; margin: 0 0 6px; }
  .kb-sit h2 { font-size: 10.6pt; margin: 0 0 1px; color: var(--wine);
    border-bottom: .8pt solid var(--line); padding-bottom: 1px; }
  .kb-tip { margin: 1px 0 2px; font-size: 8.8pt; color: #333; }
  .kb-list { list-style: none; margin: 0; padding: 0; }
  .kb-list li { display: flex; gap: 5px; align-items: baseline;
    border-bottom: .4pt dotted var(--line); padding: .6px 0; }
  .kb-name { flex: 1 1 auto; min-width: 0; }
  .kb-flag { color: #666; font-size: 7.9pt; }
  .kb-num { flex: 0 0 auto; font-weight: 700; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .kb-web { flex: 0 0 auto; color: #444; white-space: nowrap; font-size: 8.5pt; }
  .kb-foot { margin-top: 8px; padding-top: 5px; border-top: 1px solid var(--line);
    font-size: 8pt; color: #555; display: flex; gap: 10px; justify-content: space-between; flex-wrap: wrap; }
  .kb-actions { margin: 0 0 12px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
  .kb-actions button, .kb-actions a.kb-back {
    font: inherit; font-size: 10pt; padding: 9px 18px; border-radius: 999px; cursor: pointer;
    border: 1px solid var(--wine); background: var(--wine); color: #fff; }
  .kb-actions a.kb-back { background: transparent; color: var(--wine); }
  .kb-actions .kb-hint { font-size: 9pt; color: #555; }
  @media screen { body { max-width: 210mm; margin: 0 auto; box-shadow: 0 0 0 1px #eee; } }
  @media print {
    @page { size: A4 portrait; margin: 10mm; }
    body { padding: 0; font-size: 9.5pt; }
    .kb-actions { display: none !important; }
    a { color: #000; }
  }
</style>
</head>
<body>
  <div class="kb-actions">
    <button type="button" onclick="window.print()">Drucken / als PDF sichern</button>
    <a class="kb-back" href="./">Zurück zur Notfall-Seite</a>
    <span class="kb-hint">Passt auf ein Blatt A4. Im Druckdialog „Als PDF sichern“ wählen, um die Datei zu behalten.</span>
  </div>

  <header class="kb-head">
    <h1>Tiernotfall Berlin &amp; Brandenburg</h1>
    <p>Stand: ${esc(stand)}</p>
    <p class="kb-src">hundetraining-ap.de/tiernotfall/</p>
  </header>

  <div class="kb-emergrow">
${notrufBlock}
  </div>

  <div class="kb-grid">
${printBlocks}
  </div>

  <footer class="kb-foot">
    <span>Diese Übersicht ersetzt keine tierärztliche Beratung. Alle Angaben ohne Gewähr – im Zweifel immer den Notruf wählen.</span>
    <span>Hundetraining · Anna Prädel, Berlin</span>
  </footer>
</body>
</html>
`;

// Kurzlabels nur fuer die Sticky-Leiste auf schmalen Viewports (Darstellung, kein Inhalt aus der JSON)
const STICKY_SHORT = {
  'notruf-112': 'Feuerwehr',
  'notruf-110': 'Polizei',
  'polizei-buergertelefon': 'Bürgertelefon'
};

const sticky = ['notruf-112', 'notruf-110', 'polizei-buergertelefon'].map(id => {
  const c = byId[id];
  const short = STICKY_SHORT[id] || c.name;
  return `<a class="notfall-num" href="tel:${esc(c.phone.e164)}" aria-label="${esc(c.name)}: ${esc(c.phone.display)}"><span class="notfall-num__n">${esc(c.phone.display)}</span><span class="notfall-num__l" aria-hidden="true"><span class="notfall-num__l-full">${esc(c.name)}</span><span class="notfall-num__l-short">${esc(short)}</span></span></a>`;
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
        <p class="notfall-stand">Stand der Angaben: ${esc(stand)} · Nummer veraltet? <a href="${esc(korrekturMailto)}">Korrektur melden.</a></p>
        <p class="notfall-disclaimer">Diese Übersicht ersetzt keine tierärztliche Beratung. Alle Angaben ohne Gewähr; im Zweifel immer den Notruf wählen.</p>
        <a class="btn btn--ghost" href="kuehlschrank.html">🖨 Für den Kühlschrank ausdrucken</a>
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
fs.writeFileSync(path.join(ROOT, 'website/tiernotfall/kuehlschrank.html'), kuehlschrank, 'utf8');

const printRows = SITS.reduce((n, s) => n + printContacts(s).length, 0);
console.log('tiernotfall/index.html generiert · Situationen: ' + SITS.length + ' · Stand: ' + stand);
console.log('tiernotfall/kuehlschrank.html generiert · Nummern-Zeilen: ' + printRows + ' (Ziel: 1 Blatt A4)');
