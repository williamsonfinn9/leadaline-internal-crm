/* ============================================================
   LeadaLine Demo Factory — profile derivation
   Takes a raw CompanyProfile (the output of research) and fills in
   every computed field the templates rely on: brand tints, ROI maths,
   default opportunities. Idempotent — safe to run twice.
   Exposes global `LL_DERIVE`.
   ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory(
    (typeof module !== 'undefined' && module.exports) ? require('./helpers.js') : root.LL_HELPERS
  );
  else root.LL_DERIVE = factory(root.LL_HELPERS);
})(typeof self !== 'undefined' ? self : this, function (H) {
  'use strict';

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function deriveBrand(brand) {
    var b = brand || {};
    var primary = b.primary || '#F5A623';
    var accent = b.accent || '#FF7A1A';
    return {
      primary: primary,
      primaryHi: b.primaryHi || H.lighten(primary, 0.35),
      accent: accent,
      primaryRgb: H.hexToRgb(primary),
      accentRgb: H.hexToRgb(accent),
      bg: b.bg || '#0A0705',
      bg2: b.bg2 || '#080D13',
      surface: b.surface || '#0C131B',
      surface2: b.surface2 || '#111A24',
      line: b.line || '#1C2A36'
    };
  }

  // ROI model. All inputs are estimates the demo labels as such.
  function deriveRoi(p) {
    var r = p.roi || {};
    var enquiries = r.enquiriesPerMonth != null ? r.enquiriesPerMonth : 60;
    var missedPct = r.missedPct != null ? r.missedPct : 30;
    var avgJob = r.avgJobValue != null ? r.avgJobValue : 900;
    // Recovered jobs: a conservative share of currently-missed enquiries that
    // convert once answered/qualified/followed-up. Default recovery rate 35%.
    var recoveryRate = r.recoveryRate != null ? r.recoveryRate : 0.35;
    var missed = Math.round(enquiries * (missedPct / 100));
    var recovered = r.recoveredJobs != null ? r.recoveredJobs : Math.max(1, Math.round(missed * recoveryRate));
    var extraMonthly = r.extraMonthlyRevenue != null ? r.extraMonthlyRevenue : recovered * avgJob;
    return {
      enquiriesPerMonth: enquiries,
      missedPct: missedPct,
      missedPerMonth: missed,
      avgJobValue: avgJob,
      recoveryRate: recoveryRate,
      recoveredJobs: recovered,
      extraMonthlyRevenue: extraMonthly,
      extraAnnualRevenue: extraMonthly * 12
    };
  }

  var DEFAULT_WEAKNESSES = [
    { title: 'No 24/7 instant response', detail: 'Out-of-hours and weekend enquiries go to voicemail.' },
    { title: 'No lead qualification', detail: 'Every enquiry needs a manual call-back to scope.' },
    { title: 'No automated follow-up', detail: 'Quiet quotes are never chased.' }
  ];

  var DEFAULT_OPPORTUNITIES = [
    { title: '24/7 AI reception', detail: 'Answer every call, form and message instantly — including nights and weekends.' },
    { title: 'Instant qualification', detail: 'Score and scope every job before it reaches the owner.' },
    { title: 'Automated quote chasing', detail: 'Recover work that currently goes quiet after the first quote.' }
  ];

  function derive(raw) {
    var p = clone(raw || {});
    p.slug = p.slug || H.slugify(p.name);
    p.shortName = p.shortName || (p.name || 'Co').split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 3).toUpperCase();
    p.brand = deriveBrand(p.brand);
    p.roi = deriveRoi(p);
    p.weaknesses = (p.weaknesses && p.weaknesses.length) ? p.weaknesses : DEFAULT_WEAKNESSES;
    p.opportunities = (p.opportunities && p.opportunities.length) ? p.opportunities : DEFAULT_OPPORTUNITIES;
    p.strengths = p.strengths || [];
    p.painPoints = p.painPoints || [];
    p.services = p.services || [];
    p.areas = p.areas || [];
    p.faqs = p.faqs || [];
    p.reviews = p.reviews || null;
    p.hours = p.hours || { weekdays: 'Mon–Fri 8:00–18:00', saturday: 'Sat 9:00–13:00', sunday: 'Closed', emergency: '24/7 emergency line' };
    p.demo = p.demo || {};
    p.dashboard = p.dashboard || {};
    p.aiReceptionist = p.aiReceptionist || {};
    p.meta = p.meta || {};
    p.meta.generatedFor = p.name;
    return p;
  }

  return { derive: derive, deriveRoi: deriveRoi, deriveBrand: deriveBrand };
});
