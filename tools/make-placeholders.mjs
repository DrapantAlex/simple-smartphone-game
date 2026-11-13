// Genera gli sprite SEGNAPOSTO in public/assets/ seguendo docs/style-guide.md.
// Uso: node tools/make-placeholders.mjs
//
// Ogni SVG ha width/height = misura logica (px a 640×360) e viewBox 4 volte più grande.
// Gli sprite veri (passo 4 della roadmap) sostituiranno questi file con lo stesso nome.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const K = 4; // unità di viewBox per px logico

// Palette (sezione 2 della guida)
const P = {
  granata: '#8B1A2B', granataLuce: '#B8323F', granataOmbra: '#5A0F1A', contorno: '#2A0A10',
  panna: '#F4EFE6', oro: '#FFD84A',
  pelle: '#E8B48C', pelleOmbra: '#C98E64', capelliGrigi: '#C8C2BA',
  abito: '#2B2F3A', abitoLuce: '#444A5A', cravatta: '#3A6EA5', camicia: '#EEF0F4', nero: '#1A1C22', metallo: '#C0C6CE',
};
// Le parti "tintabili" sono bianche con ombra grigia: il gioco le colora (pelle, maglia...).
const T = { base: '#FFFFFF', ombra: '#BDBDBD' };
const LINE = `stroke="${P.contorno}" stroke-linejoin="round" stroke-linecap="round"`;

function svg(path, w, h, body) {
  const file = join(ROOT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w * K} ${h * K}">\n` +
    `<!-- SEGNAPOSTO generato da tools/make-placeholders.mjs: da sostituire con lo sprite definitivo -->\n${body}\n</svg>\n`);
}

// Generatore pseudo-casuale con seme: rigenerando si ottengono sempre gli stessi file.
let seed = 7;
const rnd = (a = 0, b = 1) => { seed = (seed * 16807) % 2147483647; return a + ((seed - 1) / 2147483646) * (b - a); };
const pick = (arr) => arr[Math.floor(rnd(0, arr.length))];

// ---------------------------------------------------------------- tifoso (parti tintabili)
// Sistema di riferimento della testa: 24×24 px, il collo (pivot) è in basso al centro.
svg('sprites/tifoso/head.svg', 24, 24, `
<ellipse cx="48" cy="50" rx="40" ry="40" fill="${T.base}"/>
<path d="M70 20 A40 40 0 0 1 64 87 A46 46 0 0 0 70 20Z" fill="${T.ombra}"/>
<ellipse cx="48" cy="50" rx="40" ry="40" fill="none" ${LINE} stroke-width="12"/>`);

svg('sprites/tifoso/face.svg', 24, 24, `
<ellipse cx="54" cy="48" rx="6" ry="9" fill="${P.contorno}"/><circle cx="56" cy="44" r="2.5" fill="#fff"/>
<ellipse cx="74" cy="48" rx="6" ry="9" fill="${P.contorno}"/><circle cx="76" cy="44" r="2.5" fill="#fff"/>
<path d="M50 34 L60 32 M70 32 L80 34" ${LINE} stroke-width="4" fill="none"/>
<path d="M56 64 Q66 80 78 64 Z" fill="${P.granataOmbra}" ${LINE} stroke-width="4"/>`);

svg('sprites/tifoso/hair.svg', 24, 24, `
<path d="M10 52 A40 40 0 0 1 84 32 Q66 26 52 32 Q40 22 30 34 Q20 40 22 58 Z" fill="${T.base}" ${LINE} stroke-width="8"/>`);

svg('sprites/tifoso/cap.svg', 24, 24, `
<path d="M10 44 A38 34 0 0 1 84 38 L84 44 Z" fill="${T.base}" ${LINE} stroke-width="8"/>
<path d="M60 40 L94 42 Q92 50 76 48 Z" fill="${T.ombra}" ${LINE} stroke-width="8"/>`);

// Busto 18×16: le spalle (attacco delle braccia) sono in alto.
svg('sprites/tifoso/torso.svg', 18, 16, `
<rect x="8" y="6" width="56" height="54" rx="18" fill="${T.base}"/>
<path d="M50 6 Q64 6 64 24 L64 42 Q64 60 46 60 Q58 40 50 6Z" fill="${T.ombra}"/>
<rect x="8" y="6" width="56" height="54" rx="18" fill="none" ${LINE} stroke-width="12"/>`);

svg('sprites/tifoso/scarf.svg', 20, 8, `
<path d="M14 6 L40 22 L30 30 L8 14 Z" fill="${P.granata}" ${LINE} stroke-width="6"/>
<rect x="24" y="4" width="50" height="16" rx="8" fill="${P.granata}" ${LINE} stroke-width="8"/>
<rect x="38" y="6" width="7" height="12" fill="${P.panna}"/><rect x="56" y="6" width="7" height="12" fill="${P.panna}"/>`);

// Arto 6×13: il pivot (spalla/anca) è in alto al centro.
svg('sprites/tifoso/arm.svg', 6, 13, `
<rect x="5" y="4" width="14" height="40" rx="7" fill="${T.base}" ${LINE} stroke-width="8"/>
<circle cx="12" cy="44" r="8" fill="${T.base}" ${LINE} stroke-width="8"/>`);

svg('sprites/tifoso/leg.svg', 7, 14, `
<rect x="6" y="2" width="14" height="40" rx="6" fill="${T.base}" ${LINE} stroke-width="8"/>
<path d="M4 40 L22 40 Q28 40 26 50 L4 50 Z" fill="#3A3A3A" ${LINE} stroke-width="6"/>`);

// ---------------------------------------------------------------- Cairo (colori fissi, freddi)
svg('sprites/cairo/head.svg', 26, 26, `
<ellipse cx="52" cy="54" rx="42" ry="44" fill="${P.pelle}"/>
<path d="M78 24 A42 44 0 0 1 72 94 A50 50 0 0 0 78 24Z" fill="${P.pelleOmbra}"/>
<ellipse cx="52" cy="54" rx="42" ry="44" fill="none" ${LINE} stroke-width="12"/>
<path d="M12 60 Q8 30 30 18 Q24 32 26 44 Z" fill="${P.capelliGrigi}" ${LINE} stroke-width="6"/>
<path d="M30 14 Q52 4 74 14 Q56 12 40 22 Z" fill="${P.capelliGrigi}" ${LINE} stroke-width="6"/>
<path d="M54 40 L66 38 M74 34 L88 30" ${LINE} stroke-width="5" fill="none"/>
<path d="M56 50 Q62 46 68 50" ${LINE} stroke-width="5" fill="none"/>
<path d="M76 48 Q82 44 88 48" ${LINE} stroke-width="5" fill="none"/>
<path d="M90 56 Q96 64 88 68" ${LINE} stroke-width="5" fill="${P.pelle}"/>
<path d="M62 78 Q74 84 88 74" ${LINE} stroke-width="5" fill="none"/>`);

svg('sprites/cairo/torso.svg', 20, 20, `
<rect x="8" y="6" width="64" height="70" rx="16" fill="${P.abito}" ${LINE} stroke-width="12"/>
<path d="M30 8 L40 40 L50 8 Z" fill="${P.camicia}" ${LINE} stroke-width="5"/>
<path d="M36 12 L44 12 L46 48 L40 56 L34 48 Z" fill="${P.cravatta}" ${LINE} stroke-width="4"/>
<path d="M58 14 Q70 16 70 40" stroke="${P.abitoLuce}" stroke-width="5" fill="none"/>`);

svg('sprites/cairo/leg.svg', 8, 16, `
<rect x="7" y="2" width="16" height="46" rx="6" fill="${P.abito}" ${LINE} stroke-width="8"/>
<path d="M4 46 L24 46 Q32 46 30 58 L4 58 Z" fill="${P.nero}" ${LINE} stroke-width="6"/>`);

// Braccio con la ventiquattrore (pende verso il basso, pivot in alto).
svg('sprites/cairo/arm-case.svg', 16, 24, `
<rect x="24" y="4" width="16" height="40" rx="8" fill="${P.abito}" ${LINE} stroke-width="8"/>
<circle cx="32" cy="48" r="8" fill="${P.pelle}" ${LINE} stroke-width="6"/>
<path d="M24 56 Q32 46 40 56" fill="none" ${LINE} stroke-width="6"/>
<rect x="6" y="56" width="52" height="36" rx="5" fill="${P.nero}" ${LINE} stroke-width="8"/>
<rect x="28" y="62" width="8" height="6" fill="${P.metallo}"/>`);

// Braccio col telefono all'orecchio (pivot in basso: la spalla).
svg('sprites/cairo/arm-phone.svg', 10, 18, `
<path d="M18 68 Q14 40 22 22" fill="none" ${LINE} stroke-width="22"/>
<path d="M18 68 Q14 40 22 22" fill="none" stroke="${P.abito}" stroke-width="12" stroke-linecap="round"/>
<circle cx="24" cy="16" r="8" fill="${P.pelle}" ${LINE} stroke-width="6"/>
<rect x="24" y="2" width="10" height="24" rx="3" fill="${P.nero}" ${LINE} stroke-width="4"/>`);

// ---------------------------------------------------------------- sfondi delle 4 zone
// far = colline e monumenti lontani (no contorno, colori chiari e poco saturi)
// mid = palazzi e monumenti (contorno 2 px desaturato)
// ground = strada sotto la linea del suolo (tile 64×60)
const FW = 640, FH = 170, MW = 640, MH = 200;
const midLine = `stroke="#5A4A50" stroke-width="8" stroke-linejoin="round"`;

function windows(x, y, w, h, rows, cols, shutter) {
  let s = '';
  const gx = w / cols, gy = h / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const wx = x + c * gx + gx * 0.3, wy = y + r * gy + gy * 0.25, ww = gx * 0.4, wh = gy * 0.5;
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#4A6A82"/>`;
    if (shutter) s += `<rect x="${wx - ww * 0.4}" y="${wy}" width="${ww * 0.35}" height="${wh}" fill="${shutter}"/><rect x="${wx + ww * 1.05}" y="${wy}" width="${ww * 0.35}" height="${wh}" fill="${shutter}"/>`;
  }
  return s;
}
// Sciarpa granata appesa (a righe panna): unica decorazione ammessa oltre agli striscioni.
const scarf = (x, y) => `<rect x="${x}" y="${y}" width="56" height="14" fill="${P.granata}"/><rect x="${x + 14}" y="${y}" width="8" height="14" fill="${P.panna}"/><rect x="${x + 34}" y="${y}" width="8" height="14" fill="${P.panna}"/>`;

// gap = [da, a]: tratto lasciato libero per un monumento (in unità di viewBox).
function buildings(colors, shutter, minH, maxH, bottom, withArcades, gap = null) {
  let s = '', x = 0;
  while (x < MW * K) {
    if (gap && x + 200 > gap[0] && x < gap[1]) { x = gap[1]; continue; }
    const limit = gap && x < gap[0] ? gap[0] : MW * K;
    const w = Math.min(rnd(340, 520), limit - x), h = rnd(minH, maxH), top = bottom - h, c = pick(colors);
    s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${c}" ${midLine}/>`;
    s += `<rect x="${x + w - 40}" y="${top}" width="40" height="${h}" fill="#000" opacity="0.1"/>`;
    s += `<rect x="${x - 6}" y="${top - 10}" width="${w + 12}" height="18" fill="${c}" ${midLine}/>`;
    const winBottom = withArcades ? bottom - 150 : bottom - 30;
    s += windows(x + 10, top + 30, w - 20, winBottom - top - 30, Math.max(1, Math.floor((winBottom - top - 30) / 110)), Math.max(2, Math.floor(w / 110)), shutter);
    if (rnd() < 0.6) s += scarf(x + rnd(40, w - 100), top + 80);
    if (withArcades) for (let ax = x + 20; ax + 100 < x + w; ax += 120) {
      s += `<path d="M${ax} ${bottom} L${ax} ${bottom - 90} A50 50 0 0 1 ${ax + 100} ${bottom - 90} L${ax + 100} ${bottom} Z" fill="#3A2A28" opacity="0.55"/>`;
    }
    x += w;
  }
  return s;
}

// Zona 1 — Centro: colline lontane + Mole Antonelliana; palazzi gialli con i portici.
svg('backgrounds/centro/far.svg', FW, FH, `
<path d="M0 680 L0 520 Q640 400 1280 500 Q1920 420 2560 520 L2560 680 Z" fill="#B9D3E6"/>
<g fill="#A9C1D6">
  <rect x="1380" y="480" width="200" height="200"/>
  <path d="M1360 480 L1600 480 L1530 260 L1430 260 Z"/>
  <rect x="1450" y="200" width="60" height="60"/>
  <path d="M1462 200 L1480 20 L1498 200 Z"/>
</g>`);
svg('backgrounds/centro/mid.svg', MW, MH, buildings(['#E3B868', '#D9A65A', '#C98E5A', '#EBC98A'], '#3D6B4A', 380, 540, MH * K, true));
svg('backgrounds/centro/ground.svg', 64, 60, `
<rect width="256" height="40" fill="#D8CDB8"/><rect y="36" width="256" height="6" fill="#9E927E"/>
<rect y="42" width="256" height="198" fill="#5E5964"/>
<rect y="104" width="256" height="10" fill="#8A8590"/><rect y="164" width="256" height="10" fill="#8A8590"/>
<rect x="0" y="0" width="4" height="40" fill="#000" opacity="0.1"/>`);

// Zona 2 — Lungo Po: collina con Superga (solo sagoma lontana, nessuna decorazione vicino);
// Gran Madre oltre il fiume; banchina dei Murazzi.
svg('backgrounds/po/far.svg', FW, FH, `
<path d="M0 680 L0 460 Q500 300 1100 330 Q1700 360 2560 470 L2560 680 Z" fill="#B7B39A"/>
<g fill="#A8A08C">
  <rect x="980" y="270" width="140" height="60"/>
  <path d="M1000 270 A50 50 0 0 1 1100 270 Z"/>
  <rect x="1046" y="200" width="8" height="30"/>
  <rect x="960" y="250" width="22" height="80"/><rect x="1118" y="250" width="22" height="80"/>
</g>`);
svg('backgrounds/po/mid.svg', MW, MH, `
<g>
  <rect x="900" y="420" width="560" height="200" fill="#E6DCC8" ${midLine}/>
  <path d="M880 420 L1180 330 L1480 420 Z" fill="#EFE6D6" ${midLine}/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${940 + i * 90}" y="440" width="34" height="180" fill="#D4C8B0" ${midLine}/>`).join('')}
  <path d="M1040 330 A140 140 0 0 1 1320 330 Z" fill="#C9C2B4" ${midLine}/>
  <rect x="1166" y="160" width="28" height="40" fill="#C9C2B4" ${midLine}/>
  ${buildings(['#E9C98E', '#D9A65A', '#EBD3A4'], '#3D6B4A', 300, 420, 620, false, [860, 1500])}
</g>
<rect y="620" width="2560" height="180" fill="#4F86A6"/>
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 330 + 40}" y="${660 + (i % 3) * 30}" width="140" height="6" fill="#F6D29A" opacity="0.7"/>`).join('')}`);
svg('backgrounds/po/ground.svg', 64, 60, `
<rect width="256" height="240" fill="#A89C88"/>
<rect y="0" width="256" height="14" fill="#C9BCA5"/>
<path d="M0 60 H256 M0 120 H256 M0 180 H256 M64 14 V60 M192 14 V60 M0 60 V120 M128 60 V120 M64 120 V180 M192 120 V180 M0 180 V240 M128 180 V240" stroke="#8A7E6C" stroke-width="5"/>`);

// Zona 3 — Via Filadelfia (tramonto): Alpi lontane; palazzine, alberi e tribuna del Filadelfia.
svg('backgrounds/filadelfia/far.svg', FW, FH, `
<path d="M0 680 L0 420 L300 260 L560 400 L900 200 L1200 380 L1500 240 L1900 420 L2200 280 L2560 420 L2560 680 Z" fill="#8A5A88" opacity="0.8"/>
<path d="M880 216 L900 200 L930 230 Z M1480 256 L1500 240 L1530 270 Z" fill="#F4D6E0" opacity="0.7"/>`);
svg('backgrounds/filadelfia/mid.svg', MW, MH, `
${buildings(['#D9A07A', '#C98E64', '#E0B48A'], '#3D6B4A', 380, 520, 800, false, [1140, 2280])}
<rect x="1180" y="520" width="1060" height="280" fill="#B8A898" ${midLine}/>
<path d="M1160 520 L2260 520 L2200 440 L1220 440 Z" fill="${P.granata}" ${midLine}/>
${Array.from({ length: 10 }, (_, i) => `<rect x="${1220 + i * 100}" y="560" width="60" height="18" fill="${P.granataLuce}"/>`).join('')}
${Array.from({ length: 22 }, (_, i) => `<rect x="${1190 + i * 48}" y="700" width="8" height="100" fill="#3A3030"/>`).join('')}
${scarf(1300, 620)}${scarf(1700, 620)}${scarf(2050, 620)}
${[200, 700, 2400].map((x) => `<rect x="${x - 8}" y="640" width="16" height="160" fill="#5A3A22" ${midLine}/><circle cx="${x}" cy="610" r="80" fill="#4A7A48" ${midLine}/>`).join('')}`);
svg('backgrounds/filadelfia/ground.svg', 64, 60, `
<rect width="256" height="40" fill="#C9B8A8"/><rect y="36" width="256" height="6" fill="#8E7E70"/>
<rect y="42" width="256" height="198" fill="#55505C"/>
<rect x="40" y="130" width="80" height="8" fill="#F4EFE6" opacity="0.6"/>`);

// Zona 4 — Olimpico Grande Torino (sera): città lontana; stadio con torre Maratona e riflettori.
svg('backgrounds/olimpico/far.svg', FW, FH, `
${Array.from({ length: 16 }, (_, i) => { const h = 120 + (i * 53) % 220, x = i * 160; return `<rect x="${x}" y="${680 - h}" width="150" height="${h}" fill="#262C50"/>` + Array.from({ length: 4 }, (_, k) => `<rect x="${x + 20 + (k % 2) * 70}" y="${700 - h + Math.floor(k / 2) * 40}" width="18" height="14" fill="#FFF6D0" opacity="${(i + k) % 3 ? 0.15 : 0.6}"/>`).join(''); }).join('')}`);
svg('backgrounds/olimpico/mid.svg', MW, MH, `
<path d="M0 800 L0 420 Q1280 300 2560 420 L2560 800 Z" fill="#4A4E70" ${midLine}/>
${Array.from({ length: 6 }, (_, r) => `<path d="M0 ${460 + r * 50} Q1280 ${350 + r * 50} 2560 ${460 + r * 50}" stroke="${r % 2 ? P.granata : P.granataOmbra}" stroke-width="22" fill="none"/>`).join('')}
<rect x="1700" y="40" width="200" height="760" fill="#5A5E80" ${midLine}/>
${Array.from({ length: 6 }, (_, i) => `<rect x="${1720 + i * 30}" y="70" width="14" height="700" fill="#3B3F6B"/>`).join('')}
<rect x="1680" y="20" width="240" height="40" fill="#6A6E90" ${midLine}/>
${[300, 1100, 2300].map((x) => `<rect x="${x - 8}" y="100" width="16" height="320" fill="#3A3F44"/><rect x="${x - 70}" y="60" width="140" height="60" rx="8" fill="#FFF6D0" ${midLine}/>`).join('')}`);
svg('backgrounds/olimpico/ground.svg', 64, 60, `
<rect width="256" height="240" fill="#4A4652"/><rect y="0" width="256" height="12" fill="#6E6A78"/>
<path d="M0 120 H256" stroke="#3A3640" stroke-width="6"/><path d="M128 12 V240" stroke="#3A3640" stroke-width="4"/>`);

console.log('Segnaposto generati in', ROOT);
