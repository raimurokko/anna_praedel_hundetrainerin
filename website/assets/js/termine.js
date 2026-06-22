/* =============================================================
   Anna Prädel · Hundetraining – Termine & Anmeldung (Frontend)

   - Lädt Termine aus /data/termine.json und zeigt sie bei
     Gruppenkursen und Social Walks an.
   - Anmeldung pro Termin über ein barrierefreies Formular.

   ANBINDUNG ANS BACKEND (später, Variante A oder B):
   Sobald die API steht, einfach window.APHT_BOOKING_API auf die
   Endpoint-URL setzen (z. B. in index.html vor diesem Skript:
     <script>window.APHT_BOOKING_API = "/api/anmeldung";</script>)
   Dann wird die Anmeldung per fetch()-POST übermittelt statt per
   E-Mail. Ohne diese Variable greift die E-Mail-Übergangslösung.
   ============================================================= */
(function () {
  'use strict';

  var DATA_URL = 'data/termine.json';
  var BOOKING_EMAIL = 'hallo@hundetraining-annap.de'; // TODO(Kundin): bestätigen
  var API = (typeof window.APHT_BOOKING_API === 'string' && window.APHT_BOOKING_API) || null;

  var boxes = document.querySelectorAll('[data-termine]');
  if (!boxes.length) return;

  /* ---------- Datum hübsch (de-DE) ---------- */
  function parseDate(s) {
    var p = (s || '').split('-');
    if (p.length !== 3) return null;
    return new Date(+p[0], +p[1] - 1, +p[2]); // lokales Datum, 00:00
  }
  function fmtDate(d) {
    try { return new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(d); }
    catch (e) { return d.toLocaleDateString('de-DE'); }
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Daten laden & rendern ---------- */
  fetch(DATA_URL, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      boxes.forEach(function (box) {
        var key = box.getAttribute('data-termine');
        var items = (data && data[key]) || [];
        // nur kommende Termine, chronologisch
        items = items
          .map(function (t) { return { t: t, d: parseDate(t.date) }; })
          .filter(function (x) { return x.d && x.d >= today; })
          .sort(function (a, b) { return a.d - b.d; });
        renderBox(box, items);
      });
    })
    .catch(function () { /* Datei fehlt/Netz weg: Fallback-Text bleibt stehen */ });

  function renderBox(box, items) {
    var list = box.querySelector('[data-termine-list]');
    var empty = box.querySelector('[data-termine-empty]');
    var fallback = box.querySelector('[data-termine-fallback]');
    if (!list || !items.length) return; // ohne Termine: Fallback bleibt sichtbar

    list.innerHTML = '';
    items.forEach(function (x) {
      var t = x.t;
      var frei = (typeof t.frei === 'number') ? t.frei : null;
      var ausgebucht = frei !== null && frei <= 0;
      var li = document.createElement('li');
      li.className = 'termine-item';
      li.innerHTML =
        '<div class="termine-item__info">' +
          '<span class="termine-item__date">' + esc(fmtDate(x.d)) + (t.time ? ', ' + esc(t.time) + ' Uhr' : '') + '</span>' +
          '<span class="termine-item__title">' + esc(t.title || 'Termin') + '</span>' +
          (t.ort ? '<span class="termine-item__meta">' + esc(t.ort) + '</span>' : '') +
          (t.hinweis ? '<span class="termine-item__meta">' + esc(t.hinweis) + '</span>' : '') +
          (frei !== null ? '<span class="termine-item__spots' + (ausgebucht ? ' is-full' : '') + '">' + (ausgebucht ? 'Ausgebucht' : (frei + ' von ' + (t.plaetze || frei) + ' Plätzen frei')) + '</span>' : '') +
        '</div>';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--primary btn--sm termine-item__btn';
      if (ausgebucht) { btn.disabled = true; btn.textContent = 'Ausgebucht'; }
      else { btn.textContent = 'Anmelden'; btn.addEventListener('click', function () { openBooking(t, x.d); }); }
      li.appendChild(btn);
      list.appendChild(li);
    });

    list.hidden = false;
    if (empty) empty.hidden = true;
    if (fallback) fallback.hidden = true;
  }

  /* ---------- Anmelde-Formular (Modal) ---------- */
  var modal, lastFocus;

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.setAttribute('data-open', 'false');
    modal.innerHTML =
      '<div class="booking-modal__backdrop" data-close></div>' +
      '<div class="booking-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title">' +
        '<button class="booking-modal__close" type="button" data-close aria-label="Schließen">×</button>' +
        '<h2 id="booking-title">Anmeldung</h2>' +
        '<p class="booking-modal__termin" data-booking-termin></p>' +
        '<form data-booking-form novalidate>' +
          '<label>Name *<input name="name" type="text" autocomplete="name" required></label>' +
          '<label>Hund (Name, Rasse, Alter)<input name="hund" type="text"></label>' +
          '<label>Telefon<input name="telefon" type="tel" autocomplete="tel"></label>' +
          '<label>E-Mail *<input name="email" type="email" autocomplete="email" required></label>' +
          '<label>Anmerkungen<textarea name="anmerkungen" rows="3"></textarea></label>' +
          '<label class="booking-modal__consent"><input name="consent" type="checkbox" required> Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anmeldung verarbeitet werden. Hinweise in der <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a>. *</label>' +
          '<p class="booking-modal__error" data-booking-error hidden></p>' +
          '<div class="booking-modal__actions">' +
            '<button type="button" class="btn btn--ghost" data-close>Abbrechen</button>' +
            '<button type="submit" class="btn btn--primary" data-booking-submit>Anmeldung senden</button>' +
          '</div>' +
          '<p class="booking-modal__hint" data-booking-hint></p>' +
        '</form>' +
        '<div class="booking-modal__success" data-booking-success hidden>' +
          '<p><strong>Danke!</strong> <span data-booking-success-text></span></p>' +
          '<button type="button" class="btn btn--primary" data-close>Schließen</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', closeBooking);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('data-open') === 'true') closeBooking();
    });
    modal.querySelector('[data-booking-form]').addEventListener('submit', onSubmit);
  }

  var current = null;
  function openBooking(t, d) {
    if (!modal) buildModal();
    current = { t: t, d: d };
    lastFocus = document.activeElement;
    var form = modal.querySelector('[data-booking-form]');
    form.hidden = false; form.reset();
    modal.querySelector('[data-booking-success]').hidden = true;
    modal.querySelector('[data-booking-error]').hidden = true;
    modal.querySelector('[data-booking-hint]').textContent =
      API ? '' : 'Hinweis: Es öffnet sich dein E-Mail-Programm mit einer vorausgefüllten Nachricht – bitte zum Abschicken auf „Senden" tippen.';
    modal.querySelector('[data-booking-termin]').textContent =
      (t.title || 'Termin') + ' · ' + fmtDate(d) + (t.time ? ', ' + t.time + ' Uhr' : '') + (t.ort ? ' · ' + t.ort : '');
    modal.setAttribute('data-open', 'true');
    document.documentElement.style.overflow = 'hidden';
    var first = modal.querySelector('input[name="name"]');
    if (first) first.focus();
  }

  function closeBooking() {
    if (!modal) return;
    modal.setAttribute('data-open', 'false');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var errEl = modal.querySelector('[data-booking-error]');
    var data = {
      terminId: current.t.id, typ: current.t.title, datum: current.t.date, zeit: current.t.time || '', ort: current.t.ort || '',
      name: form.name.value.trim(), hund: form.hund.value.trim(),
      telefon: form.telefon.value.trim(), email: form.email.value.trim(),
      anmerkungen: form.anmerkungen.value.trim(), consent: form.consent.checked
    };
    // Validierung
    var err = '';
    if (!data.name) err = 'Bitte gib deinen Namen an.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) err = 'Bitte gib eine gültige E-Mail-Adresse an.';
    else if (!data.consent) err = 'Bitte bestätige die Verarbeitung deiner Angaben.';
    if (err) { errEl.textContent = err; errEl.hidden = false; return; }
    errEl.hidden = true;

    if (API) {
      var btn = modal.querySelector('[data-booking-submit]');
      btn.disabled = true; btn.textContent = 'Wird gesendet …';
      fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json().catch(function () { return {}; }); })
        .then(function () { showSuccess('Deine Anmeldung ist eingegangen – ich melde mich mit einer Bestätigung.'); })
        .catch(function () { errEl.textContent = 'Senden hat nicht geklappt. Bitte später erneut versuchen oder direkt per E-Mail melden.'; errEl.hidden = false; })
        .then(function () { btn.disabled = false; btn.textContent = 'Anmeldung senden'; });
    } else {
      // Übergangslösung: vorausgefüllte E-Mail
      var subject = 'Anmeldung: ' + data.typ + ' am ' + data.datum;
      var body =
        'Hallo Anna,\n\nich möchte mich für folgenden Termin anmelden:\n' +
        '• Kurs/Termin: ' + data.typ + '\n• Datum: ' + fmtDate(current.d) + (data.zeit ? ', ' + data.zeit + ' Uhr' : '') + '\n• Ort: ' + data.ort + '\n\n' +
        'Meine Angaben:\n• Name: ' + data.name + '\n• Hund: ' + data.hund + '\n• Telefon: ' + data.telefon + '\n• E-Mail: ' + data.email + '\n• Anmerkungen: ' + data.anmerkungen + '\n\nViele Grüße';
      window.location.href = 'mailto:' + BOOKING_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      showSuccess('Dein E-Mail-Programm sollte sich mit einer vorausgefüllten Anmeldung geöffnet haben. Bitte schick sie ab – ich bestätige dir dann deinen Platz.');
    }
  }

  function showSuccess(msg) {
    modal.querySelector('[data-booking-form]').hidden = true;
    modal.querySelector('[data-booking-success-text]').textContent = msg;
    modal.querySelector('[data-booking-success]').hidden = false;
  }
})();
