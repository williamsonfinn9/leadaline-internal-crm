/* ============================================================
   LeadaLine Demo Factory — minimal store-only ZIP writer.
   No dependencies, no compression (fine for HTML/CSS/JSON). Builds a
   valid .zip Blob entirely client-side so a generated package can be
   downloaded as one file. Exposes global `LL_ZIP`.
   ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.LL_ZIP = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CRC_TABLE = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function utf8(str) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(str);
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 128) out.push(c);
      else if (c < 2048) { out.push(192 | (c >> 6), 128 | (c & 63)); }
      else { out.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63)); }
    }
    return new Uint8Array(out);
  }

  function u16(n) { return [n & 0xFF, (n >> 8) & 0xFF]; }
  function u32(n) { return [n & 0xFF, (n >> 8) & 0xFF, (n >> 16) & 0xFF, (n >>> 24) & 0xFF]; }

  // files: { "path/name.html": "content string", ... }  -> Blob
  function make(files) {
    var chunks = [], central = [], offset = 0;
    Object.keys(files).forEach(function (name) {
      var nameBytes = utf8(name);
      var data = utf8(files[name]);
      var crc = crc32(data);
      var local = [].concat(
        u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0)
      );
      var localHeader = new Uint8Array(local.length + nameBytes.length);
      localHeader.set(local, 0); localHeader.set(nameBytes, local.length);
      chunks.push(localHeader, data);

      var cen = [].concat(
        u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length),
        u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset)
      );
      var cenHeader = new Uint8Array(cen.length + nameBytes.length);
      cenHeader.set(cen, 0); cenHeader.set(nameBytes, cen.length);
      central.push(cenHeader);
      offset += localHeader.length + data.length;
    });

    var centralSize = central.reduce(function (a, c) { return a + c.length; }, 0);
    var end = new Uint8Array([].concat(
      u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length),
      u32(centralSize), u32(offset), u16(0)
    ));
    return new Blob(chunks.concat(central, [end]), { type: 'application/zip' });
  }

  return { make: make, crc32: crc32 };
});
