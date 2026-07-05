/* ============================================================
   LeadaLine Demo Factory — UI orchestration.
   Wires the form to research() -> engine.renderPackage(), animates the
   generation pipeline, and renders the resulting package with live
   preview + one-click .zip download. Runs entirely in the browser.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var H = window.LL_HELPERS, ENGINE = window.LL_ENGINE, RESEARCH = window.LL_RESEARCH, ZIP = window.LL_ZIP;

  var STEPS = [
    { k: 'research', t: 'Company research', s: 'Logo, colours, services, areas, hours, reviews, contact' },
    { k: 'analysis', t: 'Business analysis', s: 'Pain points & where LeadaLine adds the most value' },
    { k: 'demo', t: 'Personalise the demo', s: 'Cloning the AI Office Team walkthrough for this brand' },
    { k: 'ai', t: 'Tune the AI receptionist', s: 'Services, tone, emergency rules, qualification flow' },
    { k: 'dashboard', t: 'Populate the dashboard', s: 'Believable pipeline, leads, values & sources' },
    { k: 'insights', t: 'Opportunities & ROI', s: 'Strengths, weaknesses & recoverable revenue (est.)' },
    { k: 'proposal', t: 'Proposal & follow-up', s: 'Branded proposal, email and SMS' },
    { k: 'brief', t: 'Founder meeting brief', s: 'Objections, discovery, angle, upsells (internal)' },
    { k: 'package', t: 'Package it up', s: 'Assembling /demos/<company>/ — ready to share' }
  ];

  var blobUrls = [];
  function toBlobUrl(html) { var u = URL.createObjectURL(new Blob([html], { type: 'text/html' })); blobUrls.push(u); return u; }
  function clearBlobs() { blobUrls.forEach(URL.revokeObjectURL); blobUrls = []; }

  function renderSteps() {
    $('steps').innerHTML = STEPS.map(function (s) {
      return '<div class="stp" data-k="' + s.k + '"><div class="dot">' + '○' + '</div><div class="st"><b>' + s.t + '</b><span>' + s.s + '</span></div><div class="stat"></div></div>';
    }).join('');
  }

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function esc(s) { return H.esc(s); }

  var PAGE_META = {
    'demo/index.html': { ic: '📱', t: 'Live interactive demo', s: 'AI Office Team walkthrough', tag: '' },
    'report/index.html': { ic: '📊', t: 'Opportunities we found', s: 'Strengths, gaps & ROI', tag: '' },
    'dashboard/index.html': { ic: '🗂️', t: 'Lead dashboard', s: 'Sample CRM pipeline', tag: '' },
    'proposal/index.html': { ic: '📄', t: 'Proposal', s: 'Pilot, timeline & maths', tag: '' },
    'email/index.html': { ic: '✉️', t: 'Follow-up email + SMS', s: 'Ready to send', tag: '' },
    'index.html': { ic: '🔗', t: 'Client-safe landing', s: 'Share this root wholesale', tag: '' },
    'ai-prompt/index.html': { ic: '🤖', t: 'AI receptionist prompt', s: 'System prompt + flow', tag: 'int' },
    'meeting-brief/index.html': { ic: '🎯', t: 'Meeting brief', s: 'Founder-only sales brief', tag: 'found' },
    '_founder.html': { ic: '🧭', t: 'Founder control panel', s: 'Your entry point — all pages', tag: 'found' }
  };
  var CLIENT_ORDER = ['demo/index.html', 'report/index.html', 'dashboard/index.html', 'proposal/index.html', 'email/index.html', 'index.html'];
  var INTERNAL_ORDER = ['_founder.html', 'ai-prompt/index.html', 'meeting-brief/index.html'];

  function pageCard(path, files) {
    var m = PAGE_META[path]; if (!m) return '';
    var tag = m.tag === 'int' ? '<span class="tag int">Internal</span>' : (m.tag === 'found' ? '<span class="tag found">Founder only</span>' : '');
    return '<div class="panel pcard"><div class="ic">' + m.ic + '</div><div class="pt"><b>' + esc(m.t) + tag + '</b><span>' + esc(m.s) + '</span></div>' +
      '<div class="go"><button class="mini p" data-preview="' + path + '">Preview</button><button class="mini" data-open="' + path + '">Open ↗</button></div></div>';
  }

  function renderResult(pkg) {
    var p = pkg.profile, files = pkg.files, r = p.roi, b = p.brand;
    var el = $('result');
    el.innerHTML =
      '<div class="panel rhead"><div class="swatch" style="background:linear-gradient(135deg,' + b.primary + ',' + b.accent + ')">' + esc(p.shortName) + '</div>' +
        '<div><h2>' + esc(p.name) + '</h2><div class="sub">' + esc(p.location ? p.location + ' · ' : '') + esc(p.industry || '') + (p.meta && p.meta.synthesised ? ' · <span style="color:var(--warn)">synthesised profile</span>' : '') + '</div></div>' +
        '<div class="ractions"><button class="btn primary" id="dlZip">⬇ Download package (.zip)</button><button class="btn ghost" id="openFounder">🧭 Founder panel</button></div></div>' +
      '<div class="stats">' +
        '<div class="panel stat-c"><div class="v g">' + esc(r.enquiriesPerMonth) + '</div><div class="l">Est. enquiries / mo</div></div>' +
        '<div class="panel stat-c"><div class="v r">' + esc(r.missedPct) + '%</div><div class="l">Estimated missed</div></div>' +
        '<div class="panel stat-c"><div class="v">' + H.gbp(r.avgJobValue) + '</div><div class="l">Avg job value</div></div>' +
        '<div class="panel stat-c"><div class="v g">' + H.gbp(r.extraMonthlyRevenue) + '</div><div class="l">Recoverable / mo (est.)</div></div>' +
      '</div>' +
      '<div class="sectitle">Client-facing</div><div class="grid">' + CLIENT_ORDER.map(function (x) { return pageCard(x, files); }).join('') + '</div>' +
      '<div class="sectitle">Internal &amp; founder-only</div><div class="grid">' + INTERNAL_ORDER.map(function (x) { return pageCard(x, files); }).join('') + '</div>';

    el.classList.add('show');

    el.querySelectorAll('[data-preview]').forEach(function (btn) {
      btn.addEventListener('click', function () { openPreview(btn.getAttribute('data-preview'), files, p); });
    });
    el.querySelectorAll('[data-open]').forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(toBlobUrl(files[btn.getAttribute('data-open')]), '_blank'); });
    });
    $('dlZip').addEventListener('click', function () { downloadZip(pkg); });
    $('openFounder').addEventListener('click', function () { window.open(toBlobUrl(files['_founder.html']), '_blank'); });
  }

  function openPreview(path, files, p) {
    var m = PAGE_META[path] || { t: 'Preview' };
    $('mTitle').textContent = m.t;
    $('mSub').textContent = p.name + ' · ' + path;
    $('mFrame').srcdoc = files[path];
    $('modal').classList.add('show');
  }
  function closePreview() { $('modal').classList.remove('show'); $('mFrame').srcdoc = ''; }

  function downloadZip(pkg) {
    var files = {};
    var base = pkg.profile.slug + '/';
    Object.keys(pkg.files).forEach(function (k) { files[base + k] = pkg.files[k]; });
    var blob = ZIP.make(files);
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = pkg.profile.slug + '-leadaline-demo.zip';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var busy = false;
  function generate() {
    if (busy) return;
    var website = $('fWebsite').value.trim();
    var name = $('fName').value.trim();
    var industry = $('fIndustry').value.trim();
    $('genErr').textContent = '';
    if (!website && !name) { $('genErr').textContent = 'Enter a website or a business name to generate.'; return; }
    busy = true;
    $('genBtn').disabled = true;
    clearBlobs();
    $('result').classList.remove('show');
    $('result').innerHTML = '';
    renderSteps();
    $('stageArea').style.display = 'block';

    run(website, name, industry).catch(function (e) {
      $('genErr').textContent = 'Generation failed: ' + (e && e.message ? e.message : e);
    }).then(function () { busy = false; $('genBtn').disabled = false; });
  }

  async function run(website, name, industry) {
    var stepEls = {};
    STEPS.forEach(function (s) { stepEls[s.k] = $('steps').querySelector('[data-k="' + s.k + '"]'); });
    function set(k, cls, stat) {
      var e = stepEls[k]; if (!e) return;
      if (cls === 'active') { e.classList.add('active'); e.querySelector('.dot').textContent = ''; }
      if (cls === 'done') { e.classList.remove('active'); e.classList.add('done'); e.querySelector('.dot').textContent = '✓'; if (stat) e.querySelector('.stat').textContent = stat; }
    }

    // Research first (the real work), then reveal progressively for a premium feel.
    set('research', 'active');
    await delay(650);
    var profile = await RESEARCH.research({ website: website, name: name, industry: industry });
    var pkg = ENGINE.renderPackage(profile);
    var p = pkg.profile;
    set('research', 'done', (p.services ? p.services.length : 0) + ' services · ' + (p.areas ? p.areas.length : 0) + ' areas');

    var stats = {
      analysis: (p.painPoints ? p.painPoints.length : 0) + ' pain points',
      demo: '11 scenes',
      ai: 'prompt tuned',
      dashboard: ((p.dashboard && p.dashboard.leads) ? p.dashboard.leads.length : 0) + ' leads',
      insights: H.gbp(p.roi.extraMonthlyRevenue) + '/mo',
      proposal: 'email + SMS',
      brief: 'founder-only',
      package: Object.keys(pkg.files).length + ' files'
    };
    var order = ['analysis', 'demo', 'ai', 'dashboard', 'insights', 'proposal', 'brief', 'package'];
    for (var i = 0; i < order.length; i++) {
      var k = order[i];
      set(k, 'active');
      await delay(360 + Math.round(200 * (1 - Math.abs(i - order.length / 2) / order.length)));
      set(k, 'done', stats[k]);
    }
    await delay(300);
    renderResult(pkg);
    $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---- wire up ----
  document.addEventListener('DOMContentLoaded', function () {
    $('genBtn').addEventListener('click', generate);
    $('fWebsite').addEventListener('keydown', function (e) { if (e.key === 'Enter') generate(); });
    $('fName').addEventListener('keydown', function (e) { if (e.key === 'Enter') generate(); });
    document.querySelectorAll('.schip').forEach(function (c) {
      c.addEventListener('click', function () {
        $('fWebsite').value = c.getAttribute('data-site');
        $('fName').value = c.getAttribute('data-name');
        $('fIndustry').value = c.getAttribute('data-ind') || '';
        generate();
      });
    });
    $('mClose').addEventListener('click', closePreview);
    $('modal').addEventListener('click', function (e) { if (e.target === $('modal')) closePreview(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePreview(); });
  });
})();
