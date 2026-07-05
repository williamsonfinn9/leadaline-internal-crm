#!/usr/bin/env node
/* ============================================================
   LeadaLine Demo Factory — build script.
   Renders a CompanyProfile into a static /demos/<slug>/ package.

   Usage:
     node scripts/build-demos.cjs                 # build all bundled profiles
     node scripts/build-demos.cjs d3c ashworth    # build named bundled profiles
     node scripts/build-demos.cjs ./path/to.json  # build from a profile JSON file
   ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var ENGINE = require(path.join(ROOT, 'factory', 'engine', 'index.js'));
var PROFILES = require(path.join(ROOT, 'factory', 'profiles.js'));
var RESEARCH = require(path.join(ROOT, 'factory', 'research.js'));

function writePackage(rawProfile) {
  var pkg = ENGINE.renderPackage(rawProfile);
  var dir = path.join(ROOT, 'demos', pkg.profile.slug);
  var count = 0;
  Object.keys(pkg.files).forEach(function (rel) {
    var full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, pkg.files[rel]);
    count++;
  });
  console.log('  ✓ ' + pkg.profile.name + '  → demos/' + pkg.profile.slug + '/  (' + count + ' files)');
  return pkg.profile.slug;
}

function resolveProfiles(args) {
  if (!args.length) return PROFILES.all;
  var out = [];
  args.forEach(function (a) {
    if (a.endsWith('.json')) {
      out.push(JSON.parse(fs.readFileSync(path.resolve(a), 'utf8')));
    } else if (PROFILES[a]) {
      out.push(PROFILES[a]);
    } else {
      var m = PROFILES.all.filter(function (p) { return p.slug === a || p.slug.indexOf(a) !== -1; })[0];
      if (m) out.push(m);
      else { console.warn('  ! no bundled profile "' + a + '" — synthesising'); out.push(RESEARCH.synthesize({ name: a })); }
    }
  });
  return out;
}

console.log('LeadaLine Demo Factory — building packages…');
var built = resolveProfiles(process.argv.slice(2)).map(writePackage);
console.log('Done. ' + built.length + ' package(s) built.');
