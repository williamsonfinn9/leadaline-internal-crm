/* ============================================================
   LeadaLine Demo Factory — package pages.
   Shared premium shell (dark, glassmorphism, client-branded) + every
   supporting page: Opportunities, Proposal, Dashboard, AI Prompt,
   Follow-up Email, Sales Report and the founder-only Meeting Brief.
   Exposes global `LL_PAGES`.
   ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory(require('./helpers.js'));
  else root.LL_PAGES = factory(root.LL_HELPERS);
})(typeof self !== 'undefined' ? self : this, function (H) {
  'use strict';
  var esc = H.esc, rich = H.rich, gbp = H.gbp;

  var NAV = [
    { href: '../index.html', label: 'Overview' },
    { href: '../report/', label: 'Report' },
    { href: '../dashboard/', label: 'Dashboard' },
    { href: '../proposal/', label: 'Proposal' },
    { href: '../demo/', label: 'Live demo' }
  ];

  function shellCss(p, internal) {
    var b = p.brand;
    var accentRgb = internal ? '59,130,246' : b.primaryRgb;
    var primary = internal ? '#3B82F6' : b.primary;
    var primaryHi = internal ? '#7CB3FF' : b.primaryHi;
    var accent = internal ? '#7C3AED' : b.accent;
    return ':root{--bg:' + (internal ? '#05080F' : b.bg) + ';--surface:' + (internal ? '#0A0F1C' : b.surface) + ';--surface-2:' + (internal ? '#0D1424' : b.surface2) + ';--line:rgba(255,255,255,.08);--line2:rgba(255,255,255,.14);--text:#EAF1F4;--muted:#8595A2;--muted-2:#5C6B77;--brand:' + primary + ';--brand-hi:' + primaryHi + ';--accent:' + accent + ';--brand-rgb:' + accentRgb + ';--good:#22C55E;--warn:#FFB454;--bad:#FF8A8A;--shadow:0 24px 60px rgba(0,0,0,.5)}' +
      '*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}' +
      'body{background:radial-gradient(1100px 700px at 85% -10%,rgba(var(--brand-rgb),.10),transparent 60%),radial-gradient(800px 600px at 0% 110%,rgba(var(--brand-rgb),.06),transparent 55%),var(--bg);color:var(--text);font-family:"Inter",system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.5;min-height:100vh}' +
      '.wrap{max-width:1040px;margin:0 auto;padding:0 24px 90px}' +
      'h1,h2,h3,.gk{font-family:"Space Grotesk",system-ui,sans-serif;letter-spacing:-.01em}' +
      'a{color:inherit}' +
      '.topbar{position:sticky;top:0;z-index:20;backdrop-filter:blur(14px);background:rgba(8,11,16,.72);border-bottom:1px solid var(--line)}' +
      '.topbar .in{max-width:1040px;margin:0 auto;display:flex;align-items:center;gap:14px;padding:12px 24px}' +
      '.blogo{display:flex;align-items:center;gap:9px;font-family:"Space Grotesk";font-weight:700;font-size:14px}' +
      '.blogo .mk{min-width:26px;height:26px;padding:0 6px;border-radius:7px;display:grid;place-items:center;font-size:11px;color:#04140a;background:linear-gradient(135deg,var(--brand),var(--accent))}' +
      '.tnav{margin-left:auto;display:flex;gap:4px;flex-wrap:wrap}.tnav a{font-size:12.5px;color:var(--muted);text-decoration:none;padding:6px 11px;border-radius:100px;border:1px solid transparent;transition:.15s}.tnav a:hover{color:var(--text);border-color:var(--line)}.tnav a.cur{color:var(--brand-hi);border-color:rgba(var(--brand-rgb),.35);background:rgba(var(--brand-rgb),.08)}' +
      '.hero{padding:54px 0 30px}.eyebrow{font-family:"Space Grotesk";text-transform:uppercase;letter-spacing:.2em;font-size:11px;font-weight:600;color:var(--brand);display:inline-flex;align-items:center;gap:9px;margin-bottom:16px}.eyebrow .sn{min-width:22px;height:22px;padding:0 5px;border-radius:6px;display:grid;place-items:center;background:rgba(var(--brand-rgb),.12);border:1px solid rgba(var(--brand-rgb),.3)}' +
      '.hero h1{font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.06;margin-bottom:14px}.grad{background:linear-gradient(100deg,var(--brand-hi),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}.lead{color:var(--muted);font-size:16px;max-width:640px}' +
      '.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px 24px;box-shadow:var(--shadow)}' +
      '.grid{display:grid;gap:14px}.g2{grid-template-columns:1fr 1fr}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}@media(max-width:820px){.g2,.g3,.g4{grid-template-columns:1fr}}' +
      '.sec{margin-top:40px}.sec-h{display:flex;align-items:baseline;gap:12px;margin-bottom:16px}.sec-h .n{font-family:"Space Grotesk";font-weight:700;font-size:13px;color:var(--brand);opacity:.8}.sec-h h2{font-size:22px;font-weight:600}' +
      '.stat{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px 18px}.stat .v{font-family:"Space Grotesk";font-weight:700;font-size:30px;line-height:1}.stat .v.g{color:var(--brand-hi)}.stat .v.r{color:var(--bad)}.stat .l{font-size:12px;color:var(--muted);margin-top:6px}.stat .sub{font-size:11px;color:var(--muted-2);margin-top:3px}' +
      '.list{display:flex;flex-direction:column;gap:10px}.item{display:flex;gap:13px;align-items:flex-start;background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:14px 16px}.item .ic{width:32px;height:32px;flex:0 0 32px;border-radius:9px;display:grid;place-items:center;font-size:16px;background:linear-gradient(140deg,rgba(var(--brand-rgb),.16),rgba(var(--brand-rgb),.06));border:1px solid rgba(var(--brand-rgb),.22)}.item h4{font-family:"Space Grotesk";font-size:14.5px;font-weight:600;margin-bottom:3px}.item p{color:var(--muted);font-size:13px}.item.bad .ic{background:rgba(255,138,138,.1);border-color:rgba(255,138,138,.25)}.item.good .ic{background:rgba(34,197,94,.1);border-color:rgba(34,197,94,.25)}' +
      '.tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;padding:3px 10px;border-radius:100px;border:1px solid var(--line);color:var(--muted)}.tag.on{color:var(--brand-hi);border-color:rgba(var(--brand-rgb),.35);background:rgba(var(--brand-rgb),.08)}.tag.warn{color:var(--warn);border-color:rgba(255,180,84,.3);background:rgba(255,180,84,.08)}.tag.good{color:var(--good);border-color:rgba(34,197,94,.3);background:rgba(34,197,94,.08)}.tag.bad{color:var(--bad);border-color:rgba(255,138,138,.3);background:rgba(255,138,138,.08)}' +
      'table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;font-family:"Space Grotesk";font-weight:600;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--muted-2);padding:10px 12px;border-bottom:1px solid var(--line)}td{padding:12px;border-bottom:1px solid var(--line);color:var(--text)}tr:last-child td{border-bottom:none}.money{font-family:"Space Grotesk";font-weight:600;color:var(--brand-hi)}' +
      '.bar{display:flex;align-items:center;gap:12px;margin-bottom:10px}.bar .bl{width:88px;font-size:12px;color:var(--muted)}.bar .trk{flex:1;height:9px;border-radius:9px;background:var(--surface-2);overflow:hidden}.bar .fl{height:100%;border-radius:9px;background:linear-gradient(90deg,var(--brand),var(--accent))}.bar .bv{width:40px;text-align:right;font-family:"Space Grotesk";font-weight:600;font-size:13px}' +
      '.cta{display:inline-flex;align-items:center;gap:8px;font-family:"Space Grotesk";font-weight:600;font-size:15px;padding:13px 26px;border-radius:100px;background:linear-gradient(100deg,var(--brand),var(--accent));color:#04140a;text-decoration:none}.cta.ghost{background:transparent;color:var(--text);border:1px solid var(--line2)}' +
      '.pill-row{display:flex;flex-wrap:wrap;gap:8px}.chip{font-size:12.5px;color:var(--muted);padding:7px 13px;border-radius:100px;border:1px solid var(--line);background:var(--surface)}' +
      '.note{font-size:11.5px;color:var(--muted-2);margin-top:10px}' +
      '.internal-band{background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);border-radius:12px;padding:11px 16px;font-size:12.5px;color:#7CB3FF;display:flex;align-items:center;gap:9px;margin-bottom:8px}' +
      '.foot{margin-top:56px;padding-top:22px;border-top:1px solid var(--line);display:flex;align-items:center;gap:10px;color:var(--muted-2);font-size:12px}.foot b{color:var(--muted)}' +
      '.step{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.step:last-child{border-bottom:none}.step .sd{width:30px;height:30px;flex:0 0 30px;border-radius:50%;display:grid;place-items:center;font-family:"Space Grotesk";font-weight:700;font-size:13px;color:var(--brand-hi);background:rgba(var(--brand-rgb),.1);border:1px solid rgba(var(--brand-rgb),.3)}.step h4{font-family:"Space Grotesk";font-size:14.5px;margin-bottom:2px}.step p{color:var(--muted);font-size:13px}' +
      'pre{white-space:pre-wrap;font-family:"JetBrains Mono","SF Mono",ui-monospace,monospace;font-size:12.5px;line-height:1.6;color:#cfe3ea;background:var(--surface-2);border:1px solid var(--line);border-radius:12px;padding:18px 20px;overflow-x:auto}code{font-family:"JetBrains Mono",monospace}' +
      '.copybtn{font-family:"Space Grotesk";font-size:12px;font-weight:600;color:var(--brand-hi);background:rgba(var(--brand-rgb),.08);border:1px solid rgba(var(--brand-rgb),.3);border-radius:100px;padding:6px 14px;cursor:pointer}.copybtn:hover{background:rgba(var(--brand-rgb),.16)}' +
      '.email{background:var(--surface);border:1px solid var(--line);border-radius:16px;overflow:hidden}.email .eh{padding:14px 18px;border-bottom:1px solid var(--line);font-size:12.5px;color:var(--muted)}.email .eh b{color:var(--text)}.email .eb{padding:22px 24px;font-size:14px;line-height:1.65;white-space:pre-wrap}';
  }

  function topbar(p, cur, internal) {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.label === cur ? ' class="cur"' : '') + '>' + esc(n.label) + '</a>';
    }).join('');
    var home = internal ? '../_founder.html' : '../index.html';
    return '<div class="topbar"><div class="in"><a class="blogo" href="' + home + '" style="text-decoration:none"><span class="mk">' + esc(p.shortName) + '</span> ' + esc(p.name) + (internal ? ' <span style="color:#7CB3FF;font-size:11px;font-weight:600">· INTERNAL</span>' : '') + '</a><nav class="tnav">' + links + '</nav></div></div>';
  }

  function shell(p, opts) {
    opts = opts || {};
    var internal = !!opts.internal;
    var head = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
      '<title>' + esc(opts.title || p.name) + '</title>' +
      '<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>' +
      '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>' +
      '<style>' + shellCss(p, internal) + (opts.css || '') + '</style></head><body>';
    var foot = '<div class="wrap"><div class="foot"><span class="mk" style="min-width:22px;height:22px;padding:0 5px;border-radius:6px;display:grid;place-items:center;font-size:10px;color:#04140a;background:linear-gradient(135deg,var(--brand),var(--accent));font-family:\'Space Grotesk\';font-weight:700">LL</span><span><b>' + esc(p.name) + '</b> · personalised demo package · powered by <b>LeadaLine</b></span></div></div>';
    return head + (opts.hideNav ? '' : topbar(p, opts.cur, internal)) + '<div class="wrap">' + opts.body + '</div>' + foot + (opts.script || '') + '</body></html>';
  }

  function statRow(r) {
    return '<div class="grid g4" style="margin-bottom:8px">' +
      '<div class="stat"><div class="v g">' + esc(r.enquiriesPerMonth) + '</div><div class="l">Est. enquiries / mo</div></div>' +
      '<div class="stat"><div class="v r">' + esc(r.missedPct) + '%</div><div class="l">Estimated missed</div></div>' +
      '<div class="stat"><div class="v g">' + gbp(r.avgJobValue) + '</div><div class="l">Avg job value</div></div>' +
      '<div class="stat"><div class="v g">' + gbp(r.extraMonthlyRevenue) + '</div><div class="l">Recoverable / mo (est.)</div></div>' +
    '</div>';
  }
  function cardGrid(cards) {
    return '<div class="grid g2">' + cards.map(function (c) {
      var tcls = c.tag === 'Founder only' ? 'bad' : (c.tag === 'Internal' ? 'warn' : 'on');
      return '<a href="' + c.href + '" style="text-decoration:none"><div class="item" style="align-items:center"><div class="ic">' + c.ic + '</div><div style="flex:1"><h4>' + esc(c.t) + ' <span class="tag ' + tcls + '" style="margin-left:6px">' + esc(c.tag) + '</span></h4><p>' + esc(c.d) + '</p></div><div style="color:var(--muted-2);font-size:20px">›</div></div></a>';
    }).join('') + '</div>';
  }

  // ---------------- Client-safe package landing (index.html) ----------------
  // Only client-facing pages. Safe to share the root URL with a prospect.
  function renderIndex(p) {
    var cards = [
      { href: 'demo/', ic: '📱', t: 'Live interactive demo', d: 'The AI Office Team, walked through step by step — with a live phone view.', tag: 'Client-facing' },
      { href: 'report/', ic: '📊', t: 'Opportunities we found', d: 'Website strengths, weaknesses and the ROI we estimate LeadaLine unlocks.', tag: 'Client-facing' },
      { href: 'dashboard/', ic: '🗂️', t: 'Lead dashboard', d: 'A pre-populated CRM showing exactly how ' + esc(p.name) + '\'s pipeline would look.', tag: 'Client-facing' },
      { href: 'proposal/', ic: '📄', t: 'Proposal', d: 'Branded proposal — problems, recommended package, pilot and timeline.', tag: 'Client-facing' }
    ];
    var body =
      '<div class="hero"><div class="eyebrow"><span class="sn">' + esc(p.shortName) + '</span> Personalised demo package</div>' +
      '<h1>Built for <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">A complete, personalised LeadaLine package — researched, branded and ready. ' + esc(p.location ? p.location + ' · ' : '') + esc(p.industry || '') + '</p></div>' +
      statRow(p.roi) +
      '<div class="sec"><div class="sec-h"><h2>Explore</h2></div>' + cardGrid(cards) + '</div>' +
      '<div class="note">Figures shown are estimates, modelled from public signals and industry benchmarks — clearly labelled throughout.</div>';
    return shell(p, { title: p.name + ' — Demo package', body: body, hideNav: true });
  }

  // ---------------- Founder control panel (_founder.html) ----------------
  // Everything, including internal + founder-only pages. Never linked from a
  // client-facing page. This is the entry point Finn/Cam use.
  function renderFounder(p) {
    var clientCards = [
      { href: 'demo/', ic: '📱', t: 'Live interactive demo', d: 'The AI Office Team walkthrough with live phone view.', tag: 'Client-facing' },
      { href: 'report/', ic: '📊', t: 'Opportunities we found', d: 'Strengths, weaknesses, missed opportunities and ROI.', tag: 'Client-facing' },
      { href: 'dashboard/', ic: '🗂️', t: 'Lead dashboard', d: 'Pre-populated sample CRM pipeline.', tag: 'Client-facing' },
      { href: 'proposal/', ic: '📄', t: 'Proposal', d: 'Branded proposal, pilot and timeline.', tag: 'Client-facing' },
      { href: 'email/', ic: '✉️', t: 'Follow-up email', d: 'Ready-to-send email + SMS variant.', tag: 'Client-facing' },
      { href: 'index.html', ic: '🔗', t: 'Client-safe landing', d: 'The root page — safe to share wholesale. No internal links.', tag: 'Client-facing' }
    ];
    var internalCards = [
      { href: 'ai-prompt/', ic: '🤖', t: 'AI receptionist prompt', d: 'Tuned assistant system prompt + qualification flow.', tag: 'Internal' },
      { href: 'meeting-brief/', ic: '🎯', t: 'Meeting brief', d: 'Objections, discovery questions, angle, upsells, decision maker.', tag: 'Founder only' }
    ];
    var body =
      '<div class="internal-band">🔒 Founder control panel — your entry point. The <b>Internal</b> and <b>Founder-only</b> pages below are not linked from any client-facing page. Share <code>index.html</code> or an individual page with the prospect — never this one.</div>' +
      '<div class="hero" style="padding-top:22px"><div class="eyebrow"><span class="sn">' + esc(p.shortName) + '</span> Demo package · control</div>' +
      '<h1>Everything we built for <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">' + esc(p.location ? p.location + ' · ' : '') + esc(p.industry || '') + (p.reviews ? ' · ' + p.reviews.rating + '★ (' + p.reviews.count + ')' : '') + '</p></div>' +
      statRow(p.roi) +
      '<div class="sec"><div class="sec-h"><h2>Client-facing</h2></div>' + cardGrid(clientCards) + '</div>' +
      '<div class="sec"><div class="sec-h"><h2>Internal &amp; founder-only</h2></div>' + cardGrid(internalCards) + '</div>';
    return shell(p, { title: p.name + ' — Founder control', body: body, hideNav: true, internal: true });
  }

  // ---------------- Opportunities / Report ----------------
  function renderOpportunities(p) {
    var r = p.roi;
    var strengths = (p.strengths && p.strengths.length) ? p.strengths : [{ title: 'Established brand', detail: 'Clear services and local presence.' }];
    var body =
      '<div class="hero"><div class="eyebrow"><span class="sn">✦</span> Opportunities we found</div>' +
      '<h1>What we saw on <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">A quick, honest read of the current site and enquiry experience — and where an AI office team moves the needle.</p></div>' +

      '<div class="grid g2">' +
        '<div><div class="sec-h"><span class="n">A</span><h2>Working well</h2></div><div class="list">' +
          strengths.map(function (s) { return '<div class="item good"><div class="ic">✓</div><div><h4>' + esc(s.title) + '</h4><p>' + esc(s.detail) + '</p></div></div>'; }).join('') +
        '</div></div>' +
        '<div><div class="sec-h"><span class="n">B</span><h2>Holding you back</h2></div><div class="list">' +
          p.weaknesses.map(function (w) { return '<div class="item bad"><div class="ic">!</div><div><h4>' + esc(w.title) + '</h4><p>' + esc(w.detail) + '</p></div></div>'; }).join('') +
        '</div></div>' +
      '</div>' +

      '<div class="sec"><div class="sec-h"><span class="n">C</span><h2>Where AI could help</h2></div><div class="grid g3">' +
        p.opportunities.map(function (o) { return '<div class="card"><div class="ic" style="width:34px;height:34px;border-radius:9px;display:grid;place-items:center;font-size:17px;background:linear-gradient(140deg,rgba(var(--brand-rgb),.16),rgba(var(--brand-rgb),.06));border:1px solid rgba(var(--brand-rgb),.22);margin-bottom:12px">→</div><h3 style="font-size:16px;margin-bottom:6px">' + esc(o.title) + '</h3><p style="color:var(--muted);font-size:13px">' + esc(o.detail) + '</p></div>'; }).join('') +
      '</div></div>' +

      '<div class="sec"><div class="sec-h"><span class="n">D</span><h2>Potential ROI <span class="tag warn" style="margin-left:8px">Estimated</span></h2></div>' +
        '<div class="grid g4" style="margin-bottom:14px">' +
          '<div class="stat"><div class="v">' + esc(r.enquiriesPerMonth) + '</div><div class="l">Enquiries / month</div><div class="sub">estimated</div></div>' +
          '<div class="stat"><div class="v r">' + esc(r.missedPct) + '%</div><div class="l">Missed / unanswered</div><div class="sub">≈ ' + esc(r.missedPerMonth) + ' / mo</div></div>' +
          '<div class="stat"><div class="v g">' + esc(r.recoveredJobs) + '</div><div class="l">Recoverable jobs / mo</div><div class="sub">at ' + Math.round(r.recoveryRate * 100) + '% recovery</div></div>' +
          '<div class="stat"><div class="v g">' + gbp(r.extraMonthlyRevenue) + '</div><div class="l">Extra revenue / mo</div><div class="sub">≈ ' + gbp(r.extraAnnualRevenue) + ' / yr</div></div>' +
        '</div>' +
        '<div class="card"><p style="color:var(--muted);font-size:13px">Model: <b style="color:var(--text)">' + esc(r.enquiriesPerMonth) + '</b> enquiries/mo × <b style="color:var(--text)">' + esc(r.missedPct) + '%</b> currently missed = ~' + esc(r.missedPerMonth) + ' lost/mo. Recovering <b style="color:var(--text)">' + Math.round(r.recoveryRate * 100) + '%</b> of those at an average job value of <b style="color:var(--text)">' + gbp(r.avgJobValue) + '</b> ≈ <span class="money">' + gbp(r.extraMonthlyRevenue) + '/month</span>. Figures are estimates to frame the conversation, not a guarantee.</p></div>' +
      '</div>' +
      '<div class="sec"><a class="cta" href="../proposal/">See the proposal →</a> <a class="cta ghost" href="../demo/">Open the live demo</a></div>';
    return shell(p, { title: p.name + ' — Opportunities we found', cur: 'Report', body: body });
  }

  // ---------------- Dashboard ----------------
  function renderDashboard(p) {
    var m = (p.dashboard && p.dashboard.metrics) || {};
    var leads = (p.dashboard && p.dashboard.leads) || [];
    var totalPipeline = (p.dashboard && p.dashboard.pipelineValue) || null;
    var sources = (p.dashboard && p.dashboard.sources) || [{ label: 'AI Voice', pct: 46 }, { label: 'Website', pct: 28 }, { label: 'WhatsApp', pct: 16 }, { label: 'Referral', pct: 10 }];
    function badge(s) { var map = { New: 'on', Booked: 'good', Urgent: 'bad', Quoted: 'warn', Won: 'good' }; return '<span class="tag ' + (map[s] || '') + '">' + esc(s) + '</span>'; }
    var rows = leads.map(function (l) {
      return '<tr><td><b>' + esc(l.name) + '</b><div style="font-size:11px;color:var(--muted-2)">' + esc(l.area || '') + '</div></td><td>' + esc(l.job) + '</td><td>' + badge(l.status) + '</td><td>' + esc(l.source || 'AI Voice') + '</td><td class="money">' + esc(l.value || '') + '</td></tr>';
    }).join('');
    var body =
      '<div class="hero"><div class="eyebrow"><span class="sn">' + esc(p.shortName) + '</span> Lead dashboard · sample data</div>' +
      '<h1>' + esc(p.name) + '\'s pipeline, <span class="grad">already populated.</span></h1>' +
      '<p class="lead">This is the CRM your enquiries would flow into — every lead captured, scored and tracked. Sample data shown to illustrate a typical week.</p></div>' +
      '<div class="grid g4" style="margin-bottom:16px">' +
        '<div class="stat"><div class="v g">' + esc(m.leadsWk || leads.length) + '</div><div class="l">Leads this week</div></div>' +
        '<div class="stat"><div class="v">' + esc(m.qualified || '') + '</div><div class="l">Qualified</div></div>' +
        '<div class="stat"><div class="v">' + esc(m.booked || '') + '</div><div class="l">Booked</div></div>' +
        '<div class="stat"><div class="v g">' + esc(m.answered || 92) + '%</div><div class="l">Answer rate</div></div>' +
      '</div>' +
      '<div class="grid g2">' +
        '<div class="card" style="padding:6px 6px"><table><thead><tr><th>Customer</th><th>Job</th><th>Status</th><th>Source</th><th>Value</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<div><div class="card" style="margin-bottom:14px"><h3 style="font-size:15px;margin-bottom:14px">Lead sources</h3>' +
          sources.map(function (s) { return '<div class="bar"><div class="bl">' + esc(s.label) + '</div><div class="trk"><div class="fl" style="width:' + s.pct + '%"></div></div><div class="bv">' + s.pct + '%</div></div>'; }).join('') +
        '</div>' +
        '<div class="card"><h3 style="font-size:15px;margin-bottom:8px">Pipeline value</h3><div class="stat" style="border:none;padding:0"><div class="v g">' + esc(totalPipeline || '—') + '</div><div class="l">open + booked (sample)</div></div></div></div>' +
      '</div>' +
      '<div class="note">Sample data illustrating a representative week for ' + esc(p.name) + '. Live data replaces this on day one.</div>';
    return shell(p, { title: p.name + ' — Lead dashboard', cur: 'Dashboard', body: body });
  }

  // ---------------- Proposal ----------------
  function renderProposal(p) {
    var r = p.roi;
    var pr = p.proposal || {};
    var problems = pr.problems || p.painPoints.slice(0, 4).map(function (x) { return typeof x === 'string' ? x : x.title; });
    var timeline = pr.timeline || [
      { t: 'Day 0 — Kick-off', d: 'We capture your services, areas, tone and FAQs. No work for you beyond a short call.' },
      { t: 'Day 1–3 — Build', d: 'We configure and train your AI office team on ' + esc(p.name) + ' specifics.' },
      { t: 'Day 4 — Go live', d: 'Your number and forms connect. The AI starts answering — you keep working.' },
      { t: 'Week 2+ — Tune', d: 'We refine qualification and follow-up against real enquiries and report weekly.' }
    ];
    var recommended = pr.recommendedTier || 'Full Office';
    var body =
      '<div class="hero"><div class="eyebrow"><span class="sn">' + esc(p.shortName) + '</span> Proposal</div>' +
      '<h1>An AI office team for <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">' + esc(pr.intro || ('Answer every enquiry, qualify every job, and chase every quote — without adding a person. Here\'s what we recommend and how the pilot works.')) + '</p></div>' +

      '<div class="sec"><div class="sec-h"><span class="n">01</span><h2>Why LeadaLine</h2></div><div class="grid g3">' +
        [['⚡', 'Built for trades &amp; local service', 'Not a generic chatbot — an AI team that knows how ' + esc(p.industry || 'your') + ' jobs actually flow.'], ['🇬🇧', 'Speed-to-lead wins', 'The business that answers first wins the job. Yours now answers in seconds, 24/7.'], ['🔒', 'Hands-off &amp; on-brand', 'Every message sounds like ' + esc(p.name) + '. You approve the tone once; it runs itself.']].map(function (c) { return '<div class="card"><div style="font-size:22px;margin-bottom:8px">' + c[0] + '</div><h3 style="font-size:15px;margin-bottom:6px">' + c[1] + '</h3><p style="color:var(--muted);font-size:13px">' + c[2] + '</p></div>'; }).join('') +
      '</div></div>' +

      '<div class="sec"><div class="sec-h"><span class="n">02</span><h2>Problems we identified</h2></div><div class="list">' +
        problems.map(function (pb) { return '<div class="item bad"><div class="ic">!</div><div><p style="color:var(--text);font-size:13.5px">' + esc(pb) + '</p></div></div>'; }).join('') +
      '</div></div>' +

      '<div class="sec"><div class="sec-h"><span class="n">03</span><h2>Recommended: the ' + esc(recommended) + '</h2></div>' +
        '<div class="card"><div class="pill-row" style="margin-bottom:14px">' +
          ['AI Receptionist', 'AI Sales Qualifier', 'AI Admin &amp; summaries', 'AI Booking', 'AI Follow-up', 'AI Reviews', 'Full CRM &amp; reporting'].map(function (f) { return '<span class="chip">✓ ' + f + '</span>'; }).join('') +
        '</div><p style="color:var(--muted);font-size:13.5px">The complete office — every stage from first enquiry to five-star review, tracked in one CRM. One recovered job a month more than covers it.</p></div>' +
      '</div>' +

      '<div class="sec"><div class="sec-h"><span class="n">04</span><h2>The pilot programme</h2></div>' +
        '<div class="grid g2"><div class="card"><h3 style="font-size:16px;margin-bottom:8px">Founding-client pilot</h3><p style="color:var(--muted);font-size:13.5px;margin-bottom:14px">Full Office, set up for you, at the founding rate. Cancel anytime in the first 30 days.</p><div style="display:flex;align-items:baseline;gap:12px"><span style="font-family:\'Space Grotesk\';text-decoration:line-through;color:var(--muted-2);font-size:18px">£749</span><span style="font-family:\'Space Grotesk\';font-weight:700;font-size:32px;color:var(--brand-hi)">£249<span style="font-size:13px;color:var(--muted)">/mo</span></span></div></div>' +
        '<div class="card"><h3 style="font-size:16px;margin-bottom:10px">The maths <span class="tag warn">est.</span></h3><p style="color:var(--muted);font-size:13.5px">Recovering ~' + esc(r.recoveredJobs) + ' missed jobs/mo at ' + gbp(r.avgJobValue) + ' ≈ <span class="money">' + gbp(r.extraMonthlyRevenue) + '/mo</span>. Against ' + gbp(249) + '/mo, that\'s a <b style="color:var(--text)">' + Math.max(1, Math.round(r.extraMonthlyRevenue / 249)) + '×</b> return on the pilot.</p></div></div>' +
      '</div>' +

      '<div class="sec"><div class="sec-h"><span class="n">05</span><h2>Implementation &amp; timeline</h2></div><div class="card">' +
        timeline.map(function (s, idx) { return '<div class="step"><div class="sd">' + (idx + 1) + '</div><div><h4>' + esc(s.t) + '</h4><p>' + esc(s.d) + '</p></div></div>'; }).join('') +
      '</div></div>' +
      '<div class="sec" style="text-align:center;padding-top:20px"><h2 style="font-size:24px;margin-bottom:8px">Ready when you are, ' + esc((p.contactFirstName) || 'team') + '.</h2><p class="lead" style="margin:0 auto 20px">Book a 15-minute call and we\'ll switch your AI office team on this week.</p><a class="cta" href="https://leadaline.com">Book a 15-min call →</a></div>';
    return shell(p, { title: p.name + ' — Proposal', cur: 'Proposal', body: body });
  }

  // ---------------- AI receptionist prompt ----------------
  function renderAiPrompt(p) {
    var ai = p.aiReceptionist || {};
    var prompt = buildPrompt(p);
    var qflow = ai.qualifyingQuestions || ['What service do you need?', 'What\'s the address / area?', 'Is this urgent or can it be scheduled?', 'Best number and time to call you back?'];
    var body =
      '<div class="internal-band">🔒 Internal — AI configuration for ' + esc(p.name) + '. Not shown to the client.</div>' +
      '<div class="hero" style="padding-top:22px"><div class="eyebrow"><span class="sn">🤖</span> AI Receptionist prompt</div>' +
      '<h1>The assistant, tuned for <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">Drop-in system prompt for the voice/chat assistant (Vapi / OpenAI / Claude). It already knows the services, areas, hours, emergency rules and tone.</p></div>' +
      '<div class="sec"><div class="sec-h"><h2>System prompt</h2><button class="copybtn" onclick="navigator.clipboard&amp;&amp;navigator.clipboard.writeText(document.getElementById(\'sysp\').innerText)">Copy</button></div>' +
        '<pre id="sysp">' + esc(prompt) + '</pre></div>' +
      '<div class="sec"><div class="sec-h"><h2>Qualification flow</h2></div><div class="card">' +
        qflow.map(function (q, i) { return '<div class="step"><div class="sd">' + (i + 1) + '</div><div><h4>' + esc(q) + '</h4></div></div>'; }).join('') +
      '</div></div>' +
      '<div class="sec"><div class="sec-h"><h2>Business terminology &amp; rules</h2></div><div class="grid g2">' +
        '<div class="card"><h3 style="font-size:14px;margin-bottom:8px">Emergency rule</h3><p style="color:var(--muted);font-size:13px">' + esc(ai.emergencyRule || (p.hours.emergency || 'Flag anything time-critical as urgent and alert the owner immediately.')) + '</p></div>' +
        '<div class="card"><h3 style="font-size:14px;margin-bottom:8px">Tone</h3><p style="color:var(--muted);font-size:13px">' + esc(ai.tone || 'Warm, local, straightforward. Confident but never pushy.') + '</p></div>' +
      '</div></div>';
    return shell(p, { title: p.name + ' — AI prompt', cur: null, internal: true, body: body });
  }

  function buildPrompt(p) {
    var ai = p.aiReceptionist || {};
    var svc = (p.services || []).map(function (s) { return '- ' + (s.name || s) + (s.detail ? ' (' + s.detail + ')' : ''); }).join('\n');
    var areas = (p.areas || []).join(', ');
    var faqs = (p.faqs || []).map(function (f) { return 'Q: ' + f.q + '\nA: ' + f.a; }).join('\n');
    return 'You are the AI receptionist for ' + p.name + (p.registration ? ' (' + p.registration + ')' : '') + ', ' + (p.industry || 'a local business') + ' based in ' + (p.location || 'the local area') + '.\n\n' +
      'GREETING\n"' + (ai.greeting || ('Thanks for calling ' + p.name + ', how can I help today?')) + '"\n\n' +
      'TONE\n' + (ai.tone || 'Warm, local and straightforward. Confident, helpful, never pushy. Speak like a trusted member of the team.') + '\n\n' +
      'SERVICES\n' + (svc || '- General enquiries') + '\n\n' +
      'AREAS COVERED\n' + (areas || p.location || 'Local area') + '\n\n' +
      'HOURS\nWeekdays: ' + (p.hours.weekdays || '—') + '\nSaturday: ' + (p.hours.saturday || '—') + '\nSunday: ' + (p.hours.sunday || 'Closed') + '\nEmergency: ' + (p.hours.emergency || 'By arrangement') + '\n\n' +
      'EMERGENCY RULE\n' + (ai.emergencyRule || 'If the caller describes anything time-critical or dangerous, treat as URGENT, reassure them, capture details fast, and alert the owner immediately.') + '\n\n' +
      'YOUR JOB ON EVERY ENQUIRY\n1. Answer warmly and identify the service needed.\n2. Qualify: ' + ((ai.qualifyingQuestions || ['service', 'address/area', 'urgency', 'best callback number & time']).join('; ')) + '.\n3. Capture clean structured data (name, contact, service, detail, area, urgency, callback preference, consent).\n4. Set expectations on next steps and callback time.\n5. Never quote a firm price — give guide ranges only and book a survey/callback.\n\n' +
      (faqs ? 'FAQs\n' + faqs + '\n\n' : '') +
      'Always confirm the details back to the caller before ending. Log every enquiry to the CRM.';
  }

  // ---------------- Follow-up email + SMS ----------------
  function renderEmail(p) {
    var e = p.email || {};
    var r = p.roi;
    var first = p.contactFirstName || 'there';
    var subject = e.subject || ('A quick idea for ' + p.name + ' — never miss another enquiry');
    var emailBody = e.body || (
      'Hi ' + first + ',\n\n' +
      'I had a look at ' + (p.website || p.name) + ' and put together something specifically for you.\n\n' +
      'Two things stood out: ' + (p.weaknesses[0] ? p.weaknesses[0].title.toLowerCase() : 'out-of-hours enquiries go unanswered') + ', and ' + (p.weaknesses[1] ? p.weaknesses[1].title.toLowerCase() : 'quotes aren\'t chased automatically') + '. On our estimates that\'s around ' + gbp(r.extraMonthlyRevenue) + '/month of recoverable work.\n\n' +
      'So I built you a live demo of an "AI office team" that answers every call, qualifies the job, books it in and chases quiet quotes — all sounding like ' + p.name + '.\n\n' +
      'It\'s a 15-minute call and I\'ll walk you through what we found. Does ' + (e.slot || 'Thursday or Friday afternoon') + ' work?\n\n' +
      'Best,\n' + (e.senderName || 'Finn') + '\nLeadaLine · leadaline.com'
    );
    var sms = e.sms || ('Hi ' + first + ', it\'s ' + (e.senderName || 'Finn') + ' at LeadaLine. Built ' + p.name + ' a quick personalised demo — an AI that answers & books every enquiry 24/7. Worth a 15-min look? I can send the link 👍');
    var body =
      '<div class="hero"><div class="eyebrow"><span class="sn">✉️</span> Follow-up</div>' +
      '<h1>Ready to send to <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">Personal, short, references what we found. Email and an SMS variant.</p></div>' +
      '<div class="sec"><div class="sec-h"><h2>Email</h2><button class="copybtn" onclick="navigator.clipboard&amp;&amp;navigator.clipboard.writeText(document.getElementById(\'emb\').innerText)">Copy</button></div>' +
        '<div class="email"><div class="eh">To: <b>' + esc(p.email || (first + '@' + (p.slug || 'company') + '.co.uk')) + '</b> &nbsp;·&nbsp; Subject: <b>' + esc(subject) + '</b></div><div class="eb" id="emb">' + esc(emailBody) + '</div></div></div>' +
      '<div class="sec"><div class="sec-h"><h2>SMS variant</h2><button class="copybtn" onclick="navigator.clipboard&amp;&amp;navigator.clipboard.writeText(document.getElementById(\'smsb\').innerText)">Copy</button></div>' +
        '<div class="card"><p id="smsb" style="font-size:14px;line-height:1.6">' + esc(sms) + '</p></div></div>';
    return shell(p, { title: p.name + ' — Follow-up email', cur: null, body: body });
  }

  // ---------------- Meeting brief (founder-only) ----------------
  function renderMeetingBrief(p) {
    var mb = p.meetingBrief || {};
    var r = p.roi;
    function listCard(title, items, cls) {
      return '<div><div class="sec-h"><h2>' + esc(title) + '</h2></div><div class="list">' +
        (items || []).map(function (it) { return '<div class="item ' + (cls || '') + '"><div class="ic">' + (cls === 'bad' ? '✕' : (cls === 'good' ? '✓' : '•')) + '</div><div><p style="color:var(--text);font-size:13.5px">' + rich(typeof it === 'string' ? it : (it.title || '')) + (it.detail ? '<span style="color:var(--muted)"> — ' + esc(it.detail) + '</span>' : '') + '</p></div></div>'; }).join('') +
        '</div></div>';
    }
    var body =
      '<div class="internal-band">🎯 Founder-only meeting brief — do <b>not</b> share with the client. Not linked from any client-facing page.</div>' +
      '<div class="hero" style="padding-top:22px"><div class="eyebrow"><span class="sn">🎯</span> Meeting brief</div>' +
      '<h1>Sales brief: <span class="grad">' + esc(p.name) + '</span></h1>' +
      '<p class="lead">' + esc(mb.summary || (p.name + ' — ' + (p.industry || 'local service') + ' in ' + (p.location || 'the area') + '. ' + (p.reviews ? p.reviews.rating + '★ (' + p.reviews.count + ' reviews). ' : '') + 'Est. ' + gbp(r.extraMonthlyRevenue) + '/mo recoverable.')) + '</p></div>' +

      '<div class="grid g2">' +
        '<div class="card"><h3 style="font-size:14px;margin-bottom:6px;color:var(--muted-2)">Decision maker</h3><p style="font-size:14px">' + esc(mb.decisionMaker || (p.contactFirstName ? p.contactFirstName + ' (owner)' : 'Owner / director — confirm on call')) + '</p></div>' +
        '<div class="card"><h3 style="font-size:14px;margin-bottom:6px;color:var(--muted-2)">Best angle</h3><p style="font-size:14px">' + esc(mb.bestAngle || 'Lead with missed-enquiry revenue and 24/7 answering — money left on the table, not "tech".') + '</p></div>' +
      '</div>' +

      '<div class="sec"><div class="grid g2">' +
        listCard('Likely objections', mb.objections || ['"I already answer my own phone" → but not on a roof / on Sundays.', '"Customers want a real person" → the AI books the human call, faster.', '"Too good to be true" → pilot, cancel in 30 days.'], 'warn') +
        listCard('Discovery questions', mb.discoveryQuestions || ['How many enquiries a week, roughly?', 'What happens to a call when you\'re on a job?', 'How do you chase quotes right now?', 'What\'s an average job worth to you?'], '') +
      '</div></div>' +

      '<div class="sec"><div class="grid g2">' +
        listCard('Upsell opportunities', mb.upsells || ['Reviews automation (local ranking).', 'Multi-location / extra number.', 'Reporting pack for the owner.'], 'good') +
        listCard('Things to mention', mb.mention || ['The specific gaps we found on their site.', 'Founding-client pricing (2 spots).', 'One recovered job covers the cost.'], '') +
      '</div></div>' +

      '<div class="sec">' + listCard('Things to avoid', mb.avoid || ['Don\'t over-promise exact revenue — frame as estimates.', 'Don\'t get pulled into deep tech talk.', 'Don\'t discount below the pilot rate.'], 'bad') + '</div>';
    return shell(p, { title: p.name + ' — Meeting brief (internal)', cur: null, internal: true, hideNav: false, body: body });
  }

  return {
    renderIndex: renderIndex,
    renderFounder: renderFounder,
    renderOpportunities: renderOpportunities,
    renderDashboard: renderDashboard,
    renderProposal: renderProposal,
    renderAiPrompt: renderAiPrompt,
    renderEmail: renderEmail,
    renderMeetingBrief: renderMeetingBrief,
    buildPrompt: buildPrompt
  };
});
