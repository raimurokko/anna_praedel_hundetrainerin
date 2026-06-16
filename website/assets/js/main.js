/* =============================================================
   Anna Prädel · Hundetraining – Interaktion
   Alles "progressive enhancement": ohne JS bleibt die Seite
   vollständig nutzbar und sichtbar.
   ============================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  /* ---------- localStorage-Helfer (defensiv) ---------- */
  function get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function set(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

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
      var skip = document.querySelector('main');
      if (skip) { skip.setAttribute('tabindex', '-1'); skip.focus({ preventScroll: true }); }
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

    /* Umschalter: Kontrast, Links unterstreichen, Animationen reduzieren */
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
    bindToggle('contrast', 'data-contrast', 'high');
    bindToggle('underline', 'data-underline', 'true');
    bindToggle('motion', 'data-motion', 'reduce');

    /* Zurücksetzen */
    var reset = panel.querySelector('[data-a11y-reset]');
    if (reset) reset.addEventListener('click', function () {
      ['apht-fontscale', 'apht-contrast', 'apht-underline', 'apht-motion'].forEach(function (k) {
        try { localStorage.removeItem(k); } catch (e) {}
      });
      root.removeAttribute('data-contrast');
      root.removeAttribute('data-underline');
      root.removeAttribute('data-motion');
      fontScale = applyFont(1);
      panel.querySelectorAll('[data-a11y-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    });
  }
})();
