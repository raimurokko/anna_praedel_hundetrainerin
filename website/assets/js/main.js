/* =============================================================
   Anna Prädel · Hundetraining – Interaktion
   Alles "progressive enhancement": ohne JS bleibt die Seite
   vollständig nutzbar und sichtbar.

   Scroll-up-Button und Barrierefreiheits-Panel werden per JS
   injiziert, damit sie auf JEDER Seite identisch verfügbar sind
   (eine Quelle der Wahrheit statt Duplikat in jeder HTML-Datei).
   ============================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  /* ---------- localStorage-Helfer (defensiv) ---------- */
  function get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function set(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  /* ---------- 0. Bedien-Elemente injizieren ---------- */
  var canSpeak = ('speechSynthesis' in window) && (typeof window.SpeechSynthesisUtterance === 'function');

  function injectUI() {
    if (!document.querySelector('[data-scroll-top]')) {
      var st = document.createElement('button');
      st.className = 'scroll-top';
      st.type = 'button';
      st.setAttribute('data-scroll-top', '');
      st.setAttribute('aria-label', 'Nach oben scrollen');
      st.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      document.body.appendChild(st);
    }

    if (!document.querySelector('[data-a11y-fab]')) {
      var fab = document.createElement('button');
      fab.className = 'a11y-fab';
      fab.type = 'button';
      fab.setAttribute('data-a11y-fab', '');
      fab.setAttribute('aria-haspopup', 'dialog');
      fab.setAttribute('aria-expanded', 'false');
      fab.setAttribute('aria-controls', 'a11yPanel');
      fab.setAttribute('aria-label', 'Barrierefreiheit – Einstellungen öffnen');
      fab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zM5.2 7.3c0-.7.6-1.2 1.3-1.1 1.7.4 3.4.6 5.5.6s3.8-.2 5.5-.6c.7-.1 1.3.4 1.3 1.1 0 .6-.4 1-1 1.2-1.3.3-2.6.5-4 .6v3l2.6 6.4c.3.7-.1 1.5-.8 1.7-.6.2-1.3-.1-1.6-.8L12 16.2 9.6 22c-.3.7-1 1-1.6.8-.7-.2-1.1-1-.8-1.7L9.8 12.7v-3c-1.4-.1-2.7-.3-4-.6-.6-.2-1-.6-1-1.2z"/></svg>';
      document.body.appendChild(fab);
    }

    if (!document.querySelector('[data-a11y-panel]')) {
      var panel = document.createElement('div');
      panel.className = 'a11y-panel';
      panel.id = 'a11yPanel';
      panel.setAttribute('data-a11y-panel', '');
      panel.setAttribute('data-open', 'false');
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'false');
      panel.setAttribute('aria-label', 'Barrierefreiheit – Einstellungen');
      panel.innerHTML =
        '<div class="a11y-panel__head">' +
          '<h2>Barrierefreiheit</h2>' +
          '<button class="a11y-panel__close" type="button" data-a11y-close aria-label="Schließen">×</button>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row__label">Schriftgröße</span>' +
          '<span class="a11y-controls">' +
            '<button type="button" data-a11y-font="dec" aria-label="Schrift verkleinern">A−</button>' +
            '<span class="a11y-toggle" aria-hidden="true" data-a11y-fontval style="display:inline-flex;align-items:center;">100%</span>' +
            '<button type="button" data-a11y-font="inc" aria-label="Schrift vergrößern">A+</button>' +
          '</span>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row__label">Lesbare Schrift (Dyslexie)</span>' +
          '<button class="a11y-toggle" type="button" data-a11y-toggle="dyslexia" aria-pressed="false">An/Aus</button>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row__label">Hoher Kontrast</span>' +
          '<button class="a11y-toggle" type="button" data-a11y-toggle="contrast" aria-pressed="false">An/Aus</button>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row__label">Links unterstreichen</span>' +
          '<button class="a11y-toggle" type="button" data-a11y-toggle="underline" aria-pressed="false">An/Aus</button>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row__label">Animationen reduzieren</span>' +
          '<button class="a11y-toggle" type="button" data-a11y-toggle="motion" aria-pressed="false">An/Aus</button>' +
        '</div>' +
        (canSpeak ?
        '<div class="a11y-row" style="flex-direction:column;align-items:stretch;gap:8px;">' +
          '<span class="a11y-row__label">Vorlesen</span>' +
          '<span class="a11y-controls">' +
            '<button class="a11y-toggle" type="button" data-a11y-speak="toggle" style="flex:1;">▶ Vorlesen</button>' +
            '<button class="a11y-toggle" type="button" data-a11y-speak="stop" aria-label="Vorlesen stoppen">■</button>' +
          '</span>' +
          '<span class="a11y-reading-hint">Liest markierten Text vor – oder, wenn nichts markiert ist, die ganze Seite.</span>' +
        '</div>' : '') +
        '<button class="a11y-panel__reset" type="button" data-a11y-reset>Einstellungen zurücksetzen</button>';
      document.body.appendChild(panel);
    }
  }
  injectUI();

  /* ---------- 1. Theme (Hell/Dunkel) ---------- */
  // Erstes Setzen passiert inline im <head> (kein Flackern). Hier nur Umschalter.
  // Wichtig: Beim Laden NICHT speichern – sonst wird das automatisch erkannte
  // System-Theme eingefroren und spätere Systemwechsel ignoriert.
  function currentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function syncThemeLabels(theme) {
    var isDark = theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', isDark ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln');
      var text = btn.querySelector('[data-theme-text]');
      if (text) text.textContent = isDark ? 'Hell' : 'Dunkel';
    });
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    set('apht-theme', theme);
    syncThemeLabels(theme);
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });
  syncThemeLabels(currentTheme());

  // Systemwechsel folgen, solange der Nutzer noch nicht selbst gewählt hat.
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (get('apht-theme') === null) { var t = e.matches ? 'dark' : 'light'; root.setAttribute('data-theme', t); syncThemeLabels(t); }
    });
  } catch (e) {}

  /* ---------- 2. Mobile-Menü ---------- */
  var burger = document.querySelector('[data-burger]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  function setMenu(open) {
    if (!mobileNav || !burger) return;
    mobileNav.setAttribute('data-open', open ? 'true' : 'false');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      setMenu(mobileNav.getAttribute('data-open') !== 'true');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* ---------- 3. Scroll-Reveal ---------- */
  (function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = document.querySelectorAll('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- 4. Scroll-up-Button ---------- */
  var toTop = document.querySelector('[data-scroll-top]');
  if (toTop) {
    var onScroll = function () {
      var show = window.scrollY > window.innerHeight * 0.6;
      toTop.setAttribute('data-visible', show ? 'true' : 'false');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var m = document.querySelector('main');
      if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); }
    });
  }

  /* ---------- 5. Barrierefreiheits-Panel ---------- */
  var fab = document.querySelector('[data-a11y-fab]');
  var panel = document.querySelector('[data-a11y-panel]');
  if (fab && panel) {
    var closeBtn = panel.querySelector('[data-a11y-close]');

    function openPanel(open) {
      panel.setAttribute('data-open', open ? 'true' : 'false');
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { var f = panel.querySelector('button'); if (f) f.focus(); }
      else { fab.focus(); }
    }
    fab.addEventListener('click', function () { openPanel(panel.getAttribute('data-open') !== 'true'); });
    if (closeBtn) closeBtn.addEventListener('click', function () { openPanel(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.getAttribute('data-open') === 'true') openPanel(false);
    });

    /* Schriftgröße */
    var FONT_MIN = 0.9, FONT_MAX = 1.4, FONT_STEP = 0.1;
    function applyFont(scale) {
      scale = Math.max(FONT_MIN, Math.min(FONT_MAX, Math.round(scale * 10) / 10));
      root.style.setProperty('--fontscale', scale);
      set('apht-fontscale', scale);
      var out = panel.querySelector('[data-a11y-fontval]');
      if (out) out.textContent = Math.round(scale * 100) + '%';
      return scale;
    }
    var fontScale = parseFloat(get('apht-fontscale')) || 1;
    applyFont(fontScale);
    var inc = panel.querySelector('[data-a11y-font="inc"]');
    var dec = panel.querySelector('[data-a11y-font="dec"]');
    if (inc) inc.addEventListener('click', function () { fontScale = applyFont(fontScale + FONT_STEP); });
    if (dec) dec.addEventListener('click', function () { fontScale = applyFont(fontScale - FONT_STEP); });

    /* Umschalter: Dyslexie-Schrift, Kontrast, Links unterstreichen, Animationen */
    function bindToggle(name, attr, value) {
      var btn = panel.querySelector('[data-a11y-toggle="' + name + '"]');
      if (!btn) return;
      var saved = get('apht-' + name) === 'on';
      function apply(on) {
        if (on) root.setAttribute(attr, value); else root.removeAttribute(attr);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        set('apht-' + name, on ? 'on' : 'off');
      }
      apply(saved);
      btn.addEventListener('click', function () { apply(btn.getAttribute('aria-pressed') !== 'true'); });
    }
    bindToggle('dyslexia', 'data-dyslexia', 'true');
    bindToggle('contrast', 'data-contrast', 'high');
    bindToggle('underline', 'data-underline', 'true');
    bindToggle('motion', 'data-motion', 'reduce');

    /* Vorlesen (Web Speech API – läuft lokal im Browser) */
    if (canSpeak) {
      var synth = window.speechSynthesis;
      var speakToggle = panel.querySelector('[data-a11y-speak="toggle"]');
      var speakStop = panel.querySelector('[data-a11y-speak="stop"]');

      function pickGermanVoice() {
        var voices = synth.getVoices() || [];
        var de = voices.filter(function (v) { return /^de(-|_|$)/i.test(v.lang); });
        return de[0] || null;
      }
      function setSpeakLabel(txt) { if (speakToggle) speakToggle.firstChild ? (speakToggle.textContent = txt) : (speakToggle.textContent = txt); }
      function speaking(on) { fab.setAttribute('data-speaking', on ? 'true' : 'false'); }

      function startSpeaking() {
        var sel = (window.getSelection && window.getSelection().toString().trim()) || '';
        var text = sel;
        if (!text) {
          var m = document.querySelector('main');
          text = m ? (m.innerText || m.textContent || '') : (document.body.innerText || '');
        }
        text = text.replace(/\s+/g, ' ').trim();
        if (!text) return;
        synth.cancel();
        // In Häppchen aufteilen (manche Engines brechen lange Texte ab).
        var chunks = text.match(/[^.!?]+[.!?]*(\s|$)/g) || [text];
        var voice = pickGermanVoice();
        chunks.forEach(function (chunk, i) {
          var u = new SpeechSynthesisUtterance(chunk.trim());
          u.lang = (voice && voice.lang) || 'de-DE';
          if (voice) u.voice = voice;
          u.rate = 1; u.pitch = 1;
          if (i === chunks.length - 1) u.onend = function () { speaking(false); setSpeakLabel('▶ Vorlesen'); };
          synth.speak(u);
        });
        speaking(true); setSpeakLabel('⏸ Pause');
      }

      if (speakToggle) speakToggle.addEventListener('click', function () {
        if (synth.speaking && !synth.paused) { synth.pause(); setSpeakLabel('▶ Weiter'); speaking(false); }
        else if (synth.paused) { synth.resume(); setSpeakLabel('⏸ Pause'); speaking(true); }
        else { startSpeaking(); }
      });
      if (speakStop) speakStop.addEventListener('click', function () {
        synth.cancel(); speaking(false); setSpeakLabel('▶ Vorlesen');
      });
      // Stimmen laden ggf. asynchron nach.
      if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = pickGermanVoice;
      // Beim Verlassen der Seite Sprachausgabe beenden.
      window.addEventListener('beforeunload', function () { try { synth.cancel(); } catch (e) {} });
    }

    /* Zurücksetzen */
    var reset = panel.querySelector('[data-a11y-reset]');
    if (reset) reset.addEventListener('click', function () {
      ['apht-fontscale', 'apht-dyslexia', 'apht-contrast', 'apht-underline', 'apht-motion'].forEach(function (k) {
        try { localStorage.removeItem(k); } catch (e) {}
      });
      root.removeAttribute('data-dyslexia');
      root.removeAttribute('data-contrast');
      root.removeAttribute('data-underline');
      root.removeAttribute('data-motion');
      fontScale = applyFont(1);
      panel.querySelectorAll('[data-a11y-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      if (canSpeak) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    });
  }
})();
