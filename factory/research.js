/* ============================================================
   LeadaLine Demo Factory — research adapter.
   research(input) -> Promise<CompanyProfile>

   This is the ONE seam where live AI research plugs in. Today it:
     1. matches a bundled profile (exact, reproducible demos), else
     2. synthesises a believable baseline profile from the inputs +
        industry heuristics, so "Generate Demo" always yields output.

   To wire real research, implement `providers.claude` / `providers.openai`
   (see FUTURE section) — they must return the same CompanyProfile shape,
   which flows unchanged into the engine.
   Exposes global `LL_RESEARCH`.
   ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory(require('./profiles.js'), require('./engine/helpers.js'));
  else root.LL_RESEARCH = factory(root.LL_PROFILES, root.LL_HELPERS);
})(typeof self !== 'undefined' ? self : this, function (PROFILES, H) {
  'use strict';

  function domainOf(url) {
    return String(url || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').trim();
  }

  // Deterministic hue from a name — gives each synthesised brand a distinct colour.
  function hueFromName(name) {
    var h = 0, s = String(name || 'company');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
    return h;
  }
  function hslHex(h, s, l) {
    s /= 100; l /= 100;
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
    return '#' + [r, g, b].map(function (v) { return ('0' + Math.round((v + m) * 255).toString(16)).slice(-2); }).join('');
  }

  // Industry heuristics — used only when synthesising an unknown company.
  var INDUSTRY = {
    'default': {
      icon: '⚡', cats: ['domestic', 'commercial'],
      services: [{ name: 'Callouts & jobs' }, { name: 'Installations' }, { name: 'Servicing & maintenance' }, { name: 'Emergency work' }],
      weaknesses: [
        { title: 'No 24/7 instant response', detail: 'Out-of-hours enquiries go to voicemail.' },
        { title: 'No online booking', detail: 'Every job arranged by phone tag.' },
        { title: 'No lead qualification', detail: 'Owner triages every enquiry manually.' },
        { title: 'No quote follow-up', detail: 'Quiet quotes are never chased.' }
      ],
      roi: { enquiriesPerMonth: 60, missedPct: 30, avgJobValue: 850 }
    },
    'electric': { icon: '⚡', cats: ['domestic', 'commercial', 'industrial'], roi: { avgJobValue: 1100 } },
    'plumb': { icon: '🔧', cats: ['domestic', 'landlord', 'commercial'], roi: { avgJobValue: 950 } },
    'roof': { icon: '🏠', cats: ['domestic', 'commercial'], roi: { avgJobValue: 2200 } },
    'dental': { icon: '🦷', cats: ['NHS', 'private', 'cosmetic'], roi: { avgJobValue: 380 } },
    'garage': { icon: '🚗', cats: ['servicing', 'MOT', 'repairs'], roi: { avgJobValue: 320 } },
    'law': { icon: '⚖️', cats: ['family', 'property', 'commercial'], roi: { avgJobValue: 1500 } },
    'clean': { icon: '🧽', cats: ['domestic', 'commercial', 'end-of-tenancy'], roi: { avgJobValue: 180 } }
  };

  function pickIndustry(industry) {
    var key = String(industry || '').toLowerCase();
    for (var k in INDUSTRY) { if (k !== 'default' && key.indexOf(k) !== -1) return Object.assign({}, INDUSTRY['default'], INDUSTRY[k], { roi: Object.assign({}, INDUSTRY['default'].roi, INDUSTRY[k].roi || {}) }); }
    return INDUSTRY['default'];
  }

  function synthesize(input) {
    var name = input.name || titleCase(domainOf(input.website).replace(/\.(co\.uk|com|org|net|uk).*$/, '').replace(/[-.]/g, ' ')) || 'Your Company';
    var ind = pickIndustry(input.industry);
    var hue = hueFromName(name);
    var primary = hslHex(hue, 78, 56), accent = hslHex((hue + 22) % 360, 82, 52);
    var loc = input.location || 'your area';
    return {
      name: name,
      shortName: name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 3).toUpperCase(),
      industry: input.industry || 'local service business',
      location: loc,
      website: domainOf(input.website) || (H.slugify(name) + '.co.uk'),
      email: 'hello@' + (H.slugify(name)) + '.co.uk',
      brand: { primary: primary, accent: accent },
      serviceCategories: ind.cats,
      services: ind.services,
      areas: [loc],
      weaknesses: ind.weaknesses,
      painPoints: ['Missed calls become missed jobs', 'Out-of-hours enquiries lost', 'Quotes not chased', 'Admin overload'],
      roi: ind.roi,
      demo: {
        phoneIcon: ind.icon,
        sampleLead: { name: 'New enquiry', service: (ind.services[0] || {}).name || 'Job', product: 'Standard job', area: loc, quality: 'High', value: '£' + Math.round(ind.roi.avgJobValue * 0.7) + '–' + Math.round(ind.roi.avgJobValue * 1.5), summary: 'Fresh enquiry captured by the AI receptionist and qualified automatically.', recommendedAction: 'Call back to book a survey and quote at standard rate.' }
      },
      dashboard: {
        metrics: { leadsWk: 14, qualified: 11, booked: 6, answered: 92 },
        leads: [
          { id: 'L1', name: 'New enquiry', job: (ind.services[0] || {}).name || 'Job', status: 'New', scls: 'new', area: loc, service: (ind.services[0] || {}).name, value: '£' + ind.roi.avgJobValue, quality: 'High', summary: 'Captured and qualified by the AI receptionist.', activity: [['Enquiry captured', 'AI Receptionist'], ['Owner alerted', 'AI Admin']] },
          { id: 'L2', name: 'Repeat customer', job: (ind.services[1] || {}).name || 'Install', status: 'Booked', scls: 'book', area: loc, service: (ind.services[1] || {}).name, value: '£' + (ind.roi.avgJobValue * 2), quality: 'High', summary: 'Booked automatically into the diary.', activity: [['Enquiry captured', 'AI Receptionist'], ['Booked', 'AI Booking']] },
          { id: 'L3', name: 'Quote pending', job: (ind.services[2] || {}).name || 'Servicing', status: 'Quoted', scls: '', area: loc, service: (ind.services[2] || {}).name, value: '£' + Math.round(ind.roi.avgJobValue * 1.4), quality: 'Medium', summary: 'Quote sent, auto follow-up scheduled.', activity: [['Enquiry captured', 'AI Receptionist'], ['Quote sent', 'Owner']] }
        ]
      },
      meta: { synthesised: true }
    };
  }

  function titleCase(s) { return String(s || '').replace(/\b\w/g, function (c) { return c.toUpperCase(); }).trim(); }

  function matchBundled(input) {
    var d = domainOf(input.website);
    var n = String(input.name || '').toLowerCase();
    return PROFILES.all.filter(function (p) {
      return (d && (domainOf(p.website) === d || d.indexOf(p.slug) !== -1)) ||
        (n && p.name.toLowerCase() === n) ||
        (input.slug && input.slug === p.slug);
    })[0];
  }

  // Provider seam — implement to enable live research. Each returns a Promise<CompanyProfile>.
  var providers = {
    // claude: async function(input, cfg){ ... call Claude API, return CompanyProfile ... },
    // openai: async function(input, cfg){ ... },
  };

  function research(input, opts) {
    input = input || {};
    opts = opts || {};
    return new Promise(function (resolve) {
      // 1. Live provider (future): opts.provider = 'claude' | 'openai'
      if (opts.provider && providers[opts.provider]) {
        return resolve(providers[opts.provider](input, opts.config || {}));
      }
      // 2. Bundled exact match (reproducible showcase demos)
      var bundled = matchBundled(input);
      if (bundled && !opts.forceSynthesize) return resolve(bundled);
      // 3. Synthesise a believable baseline
      resolve(synthesize(input));
    });
  }

  return { research: research, synthesize: synthesize, matchBundled: matchBundled, providers: providers, domainOf: domainOf };
});
