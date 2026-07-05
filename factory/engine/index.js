/* ============================================================
   LeadaLine Demo Factory — engine entrypoint.
   renderPackage(rawProfile) -> { "path/index.html": htmlString, ... }
   Works in the browser (global LL_ENGINE) and in node (require).
   ============================================================ */
(function (root, factory) {
  var isNode = (typeof module !== 'undefined' && module.exports);
  if (isNode) {
    module.exports = factory(require('./helpers.js'), require('./derive.js'), require('./demo.js'), require('./pages.js'));
  } else {
    root.LL_ENGINE = factory(root.LL_HELPERS, root.LL_DERIVE, root.LL_DEMO, root.LL_PAGES);
  }
})(typeof self !== 'undefined' ? self : this, function (H, D, DEMO, PAGES) {
  'use strict';

  function brandCss(p) {
    var b = p.brand;
    return '/* ' + p.name + ' — brand tokens (auto-generated) */\n:root{\n' +
      '  --brand:' + b.primary + ';\n  --brand-hi:' + b.primaryHi + ';\n  --accent:' + b.accent + ';\n' +
      '  --brand-rgb:' + b.primaryRgb + ';\n  --accent-rgb:' + b.accentRgb + ';\n' +
      '  --bg:' + b.bg + ';\n  --surface:' + b.surface + ';\n}\n';
  }

  function logoSvg(p) {
    var b = p.brand;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + b.primary + '"/><stop offset="1" stop-color="' + b.accent + '"/></linearGradient></defs>' +
      '<rect width="120" height="120" rx="26" fill="url(#g)"/>' +
      '<text x="60" y="60" dy=".35em" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="' + (p.shortName.length > 3 ? 30 : 40) + '" fill="#0A0705">' + H.esc(p.shortName) + '</text></svg>';
  }

  function renderPackage(rawProfile) {
    var p = D.derive(rawProfile);
    var out = {};
    out['index.html'] = PAGES.renderIndex(p);
    out['_founder.html'] = PAGES.renderFounder(p);
    out['demo/index.html'] = DEMO.render(p);
    out['report/index.html'] = PAGES.renderOpportunities(p);
    out['dashboard/index.html'] = PAGES.renderDashboard(p);
    out['proposal/index.html'] = PAGES.renderProposal(p);
    out['ai-prompt/index.html'] = PAGES.renderAiPrompt(p);
    out['email/index.html'] = PAGES.renderEmail(p);
    out['meeting-brief/index.html'] = PAGES.renderMeetingBrief(p);
    out['assets/brand.css'] = brandCss(p);
    out['assets/logo.svg'] = logoSvg(p);
    out['company.json'] = JSON.stringify(p, null, 2);
    return { profile: p, files: out };
  }

  return {
    renderPackage: renderPackage,
    renderDemo: DEMO.render,
    derive: D.derive,
    buildPrompt: PAGES.buildPrompt,
    brandCss: brandCss,
    logoSvg: logoSvg
  };
});
