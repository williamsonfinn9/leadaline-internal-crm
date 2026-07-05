/* ============================================================
   LeadaLine Demo Factory — shared helpers
   UMD module: works via <script> (browser, file://) and require() (node).
   Exposes global `LL_HELPERS`.
   ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.LL_HELPERS = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Allows a small, safe subset of inline markup (<b>) in copy fields.
  function rich(s) {
    return esc(s).replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>');
  }

  function slugify(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'company';
  }

  function hexToRgb(hex) {
    if (!hex) return '245,166,35';
    var h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    if (isNaN(n)) return '245,166,35';
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
  }

  // Mix a hex toward white by t (0..1) — used to derive a "hi" tint from a brand colour.
  function lighten(hex, t) {
    var rgb = hexToRgb(hex).split(',').map(Number);
    var out = rgb.map(function (c) { return Math.round(c + (255 - c) * t); });
    return '#' + out.map(function (c) { return ('0' + c.toString(16)).slice(-2); }).join('');
  }

  function gbp(n) {
    return '£' + Math.round(n).toLocaleString('en-GB');
  }

  // Initials from a person or company name (max 2 chars).
  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '—';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return { esc: esc, rich: rich, slugify: slugify, hexToRgb: hexToRgb, lighten: lighten, gbp: gbp, initials: initials };
});
