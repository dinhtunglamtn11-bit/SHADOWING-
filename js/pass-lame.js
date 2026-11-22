// Nhân vật Lame: ghép trang phục, đồ đội đầu, mặt nạ, đai, guốc, vật cầm và thú đi cùng thành một hình pixel.
// Mỗi thẻ trong Passport có tối đa một ô trang bị (slot). Thẻ không có ô thì chỉ để sưu tầm.
import { OUTM, M_HEAD, M_TOP, MP, MW, MH, MOY, mStamp, render } from './pass-kit.js';

export const SLOTS = ['outfit', 'head', 'face', 'waist', 'feet', 'hold', 'pet'];
export const SLOT_OF = {
  kimono: 'outfit', yukata: 'outfit', furisode: 'outfit', shiromuku: 'outfit', hakama: 'outfit', happi: 'outfit', uniform: 'outfit',
  obi: 'waist', geta: 'feet', kanzashi: 'head', samurai: 'head', ninja: 'head', tezuka: 'head', harajuku: 'head', geisha: 'head',
  noh: 'face', kabuki: 'face', kyogen: 'face', tengu: 'face', oni: 'face',
};
const NOHOLD = new Set(['ofuro', 'kotatsu', 'futon', 'toilet', 'hupmi', 'emoji']); // đồ cố định hoặc không cầm được
export const OUT_KEY = { kimono: 'kimono', yukata: 'yukata', furisode: 'furisode', shiromuku: 'shiromuku', hakama: 'hakama', happi: 'happi', uniform: 'sailor' };
export const slotOf = it => SLOT_OF[it.id] || (it.use === 'pet' ? 'pet' : it.use === 'hold' && !NOHOLD.has(it.id) ? 'hold' : null);

// áo phông mặc định
const TEE = { map: M_TOP, pal: { o: '#2b1d3a', t: '#ff6b6b', T: '#d94a4a', u: '#ff6b6b', b: '#3a2c6e', S: '#eab08f', s: '#ffd5b5', p: '#3f5fdc', l: '#ffd5b5', x: '#f5f5f5' } };

// lớp phủ: y0 = hàng bắt đầu (0 = đỉnh đầu, âm = phía trên đầu)
export const O = {
  kanzashi: { y0: -2, pal: { p: '#ff7fb5', y: '#ffd84d' }, rows: ['......hhhh......', '.....hhhhhh.....', '....hhhhhhhh....', '..........ppp...', '..........pyp...', '..........ppp...'] },
  samurai: { y0: -3, pal: { y: '#ffd84d', k: '#9aa4c4', K: '#5a6490' }, rows: ['....y......y....', '.....y....y.....', '....kkkkkkkk....', '...kkkkkkkkkk...', '...kKkkkkkkKk...', '...kkkkkkkkkk...', '...kkkkkkkkkk...', '..KKKKKKKKKKKK..', '..KK........KK..', '..KK........KK..', '..KK........KK..', '..KK........KK..'] },
  ninja: { y0: 0, pal: { d: '#2b2b3a', s: '#ffd5b5', e: '#1b1030', w: '#9aa4c4' }, rows: ['....dddddddd....', '...dddddddddd...', '..dddddddddddd..', '..dddddddddddd..', '..dddddddddddd..', '..dwwwwwwwwwwd..', '..ddsessssesdd..','..dddddddddddd..', '..dddddddddddd..', '...dddddddddd...'] },
  tezuka: { y0: -1, pal: { r: '#e8452c', R: '#a8281a' }, rows: ['......rr........', '....rrrrrrrr....', '..rrrrrrrrrrrr..', '..RRRRRRRRRRRR..'] },
  harajuku: { y0: -1, pal: { p: '#ff8fc8', y: '#ffd84d', r: '#e8452c' }, rows: ['..pp...yy...pp..', '.pppp.yrry.pppp.', '.pppp..yy..pppp.', '..pp........pp..'] },
  geisha: { y0: -2, pal: { d: '#2b2b3a', y: '#ffd84d', p: '#ff8fc8' }, rows: ['......dddd......', '.....dddddd.....', '...dddddddddd...', '..dddydddddyddd.', '..dddddddddddd..', '..ddpp......dd..'] },
  noh: { y0: 5, pal: { e: '#fff3d6', k: '#2b1d3a', r: '#c4506a' }, rows: ['....eeeeeeee....', '....ekeeeeke....', '....eeeeeeee....', '....eeerreee....','....eeeeeeee....'] },
  kabuki: { y0: 5, pal: { w: '#ffffff', r: '#e8452c', k: '#2b1d3a' }, rows: ['....wwwwwwww....', '...rkwwwwwkr....', '...rwwwwwwwr....', '....wwwrrwww....', '....wwwwwwww....'] },
  kyogen: { y0: 5, pal: { o: '#ff9f43', k: '#2b1d3a', x: '#ff8f8f' }, rows: ['....oooooooo....', '....okoooook....', '....oxooooxo....', '....okkkkkko....', '....oooooooo....'] },
  tengu: { y0: 5, pal: { r: '#e8452c', R: '#a8281a', w: '#ffffff' }, rows: ['....rrrrrrrr....', '....rwrrrrwr....', '....rrrrRRRRR...', '....rrrrRRRR....', '....rrrrrrrr....'] },
  oni: { y0: -1, pal: { y: '#ffd84d', b: '#4a7be0', w: '#ffffff', k: '#2b1d3a' }, rows: ['...y........y...', '..yy........yy..', '................', '................', '................', '................', '....bbbbbbbb....', '....bwbbbbwb....', '....bbbbbbbb....', '....bwwbbwwb....', '....bbbbbbbb....'] },
  obi: { y0: 15, pal: { y: '#ffd84d', r: '#e8452c', o: '#2b1d3a' }, rows: ['..oyyyyryyyyyo..', '..oyyyyyyyyyyo..'] },
  geta: { y0: 18, pal: { w: '#ffffff', b: '#c9a36a', B: '#8a5a2a' }, rows: ['....ww....ww....', '..bbbbb..bbbbb..', '...B..B..B..B...'] },
  hachimaki: { y0: 3, pal: { w: '#ffffff', r: '#e8452c' }, rows: ['..wwwwwwwwwwww..', '...wwwrrwwww....'] },
  hood: { y0: 0, pal: { w: '#ffffff', W: '#dfe6f8' }, rows: ['...wwwwwwwwww...', '..wwWWWWWWWWww..', '..wwwwwwwwwwww..', '..ww........ww..'] },
};
const ROWS = MH - 2; // bỏ hai hàng trống phía trên: còn 26 hàng (đủ chỗ cho mũ và bàn chân guốc)
const blank = (w, h) => Array.from({ length: h }, () => Array(w).fill(null));

function body(eq) {
  const g = blank(MW, MH), out = eq.outfit && OUT_KEY[eq.outfit] ? OUTM[OUT_KEY[eq.outfit]] : TEE;
  mStamp(g, out.map, 10, out.pal, out.patch);
  if (eq.waist && O[eq.waist]) mStamp(g, O[eq.waist].rows, O[eq.waist].y0, O[eq.waist].pal, null);
  if (eq.feet && O[eq.feet]) mStamp(g, O[eq.feet].rows, O[eq.feet].y0, O[eq.feet].pal, null); // mọi đôi giày/dép (không chỉ guốc geta)
  mStamp(g, M_HEAD, 0, MP, null);
  if (eq.face && O[eq.face]) mStamp(g, O[eq.face].rows, O[eq.face].y0, { ...O[eq.face].pal }, null);
  if (eq.head && O[eq.head]) mStamp(g, O[eq.head].rows, O[eq.head].y0, { ...MP, ...O[eq.head].pal }, null);
  else if (eq.outfit === 'happi') mStamp(g, O.hachimaki.rows, O.hachimaki.y0, O.hachimaki.pal, null);
  else if (eq.outfit === 'shiromuku') mStamp(g, O.hood.rows, O.hood.y0, O.hood.pal, null);
  return g.slice(2);
}
// thu nhỏ hình 16×16 của thẻ về 8×8 để "cầm" hoặc "đi cùng", rồi viền lại
function half(g) {
  const h = blank(8, 8);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const cnt = {}; let n = 0;
    for (const [dy, dx] of [[0, 0], [0, 1], [1, 0], [1, 1]]) { const c = g[y * 2 + dy][x * 2 + dx]; if (c) { cnt[c] = (cnt[c] || 0) + 1; n++; } }
    if (n >= 2) h[y][x] = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0];
  }
  const o = blank(10, 10);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (h[y][x]) o[y + 1][x + 1] = h[y][x];
  const d = '#2b1d3a', r = o.map(row => row.slice());
  for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) if (!o[y][x]) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X >= 0 && X < 10 && Y >= 0 && Y < 10 && o[Y][X]) { r[y][x] = d; break; } }
  return r;
}
// eq: { outfit, head, face, waist, feet, hold, pet } là mã thẻ; items: bảng mã → thẻ. Trả về lưới màu.
export function lameGrid(eq, items) {
  const b = body(eq), pet = eq.pet && items[eq.pet] ? half(render(items[eq.pet])) : null, hold = eq.hold && items[eq.hold] ? half(render(items[eq.hold])) : null;
  const padL = pet ? 10 : 0, padR = hold ? 10 : 0, W = padL + MW + padR, g = blank(W, ROWS);
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < MW; x++) g[y][padL + x] = b[y][x];
  if (pet) for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) if (pet[y][x]) g[ROWS - 10 + y][x] = pet[y][x];
  if (hold) for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) if (hold[y][x]) g[ROWS - 14 + y][padL + MW - 1 + x] = hold[y][x];
  return g;
}
