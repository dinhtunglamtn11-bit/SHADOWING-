// Bộ công cụ vẽ pixel 16×16 cho thẻ Passport. Màu dùng ký tự: xem PAL.
export const PAL = {
  k:'#2b1d3a', K:'#4a3f6a', d:'#2b2b3a', w:'#ffffff', e:'#fff3d6', W:'#e4dccb',
  r:'#e8452c', R:'#a8281a', o:'#ff9f43', O:'#c9701a', y:'#ffd84d', Y:'#c9a227', x:'#ffb3b3', m:'#7a1a2a',
  g:'#5fb85a', G:'#2f7d3a', h:'#b8e08a', b:'#4a7be0', B:'#23306b', c:'#8fd3ff', C:'#2f80b8',
  p:'#ff8fc8', P:'#c94a8a', v:'#7a3fc0', V:'#4a2680', n:'#8a5a2a', N:'#5a3a1a', t:'#e6c892',
  s:'#ffd5b5', S:'#eab08f', a:'#9aa4c4', A:'#5a6490', l:'#dfe6ff', i:'#1b1030', u:'#ffe9a8',
};
const SZ = 16;
export class D {
  constructor() { this.g = Array.from({ length: SZ }, () => Array(SZ).fill(null)); }
  put(x, y, c) { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < SZ && y >= 0 && y < SZ) this.g[y][x] = c === '_' ? null : (PAL[c] || c); return this; }
  r(x, y, w, h, c) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.put(x + i, y + j, c); return this; }
  e(cx, cy, rx, ry, c) { for (let y = 0; y < SZ; y++) for (let x = 0; x < SZ; x++) if (((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2 <= 1) this.put(x, y, c); return this; }
  l(x0, y0, x1, y1, c) { let dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, er = dx + dy; for (;;) { this.put(x0, y0, c); if (x0 === x1 && y0 === y1) break; const e2 = 2 * er; if (e2 >= dy) { er += dy; x0 += sx; } if (e2 <= dx) { er += dx; y0 += sy; } } return this; }
  p(c, ...xy) { for (let i = 0; i < xy.length; i += 2) this.put(xy[i], xy[i + 1], c); return this; }
  tri(x, y, w, h, c) { const cx = x + w / 2; for (let j = 0; j < h; j++) { const half = (w / 2) * (j + 1) / h; for (let i = Math.ceil(cx - half); i < Math.floor(cx + half) + (half % 1 > 0 ? 0 : 0); i++) this.put(i, y + j, c); } return this; }
  dtri(x, y, w, h, c) { const cx = x + w / 2; for (let j = 0; j < h; j++) { const half = (w / 2) * (h - j) / h; for (let i = Math.ceil(cx - half); i < Math.floor(cx + half); i++) this.put(i, y + j, c); } return this; }
  s(x, y, rows) { rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') this.put(x + i, y + j, ch); })); return this; }
  bg(c) { return this.r(0, 0, SZ, SZ, c); }
  sky(a, b) { for (let y = 0; y < SZ; y++) this.r(0, y, SZ, 1, y < SZ / 2 ? a : b); return this; }
  spiral(cx, cy, turns, c) { for (let t = 0; t < turns * 40; t++) { const a = t / 40 * Math.PI * 2 * 1, rr = t / (turns * 40) * 6.5; this.put(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, c); } return this; }
  fan(cx, cy, r, c) { for (let y = 0; y < SZ; y++) for (let x = 0; x < SZ; x++) { const dx = x + .5 - cx, dy = y + .5 - cy; if (dy <= 0 && dx * dx + dy * dy <= r * r) this.put(x, y, c); } return this; }
  outline(c = 'k') { const o = this.g.map(r => r.slice()), col = PAL[c]; for (let y = 0; y < SZ; y++) for (let x = 0; x < SZ; x++) if (!this.g[y][x]) { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X >= 0 && X < SZ && Y >= 0 && Y < SZ && this.g[Y][X]) { o[y][x] = col; break; } } } this.g = o; return this; }
}
export function paint(canvas, g, s) { const h = g.length, w = g[0].length; canvas.width = w * s; canvas.height = h * s; const c = canvas.getContext('2d'); c.clearRect(0, 0, canvas.width, canvas.height); g.forEach((row, y) => row.forEach((col, x) => { if (col) { c.fillStyle = col; c.fillRect(x * s, y * s, s, s); } })); }

// ---------- nhân vật Lame 16×28 ----------
const MW = 16, MH = 28, MOY = 6;
const rp = (a, c, n, b) => a + c.repeat(n) + b, face = f => '..oh' + f + 'ho..';
const M_HEAD = ["....oooooooo....", "...ohhhhhhhho...", "..ohhHHhhhhhho..", "..ohhhhhhhhhho..", "..ohhhhhhhhhho..", face('ssssssss'), face('sesssses'), face('skssssks'), face('sssmmsss'), "...oSSSSSSSSo..."];
const M_TOP = ["......oSSo......", rp('..o', 't', 10, 'o..'), rp('..ou', 't', 8, 'uo..'), rp('..ou', 't', 8, 'uo..'), rp('..os', 't', 8, 'so..'), rp('..oS', 'b', 8, 'So..'), rp('...o', 'p', 8, 'o...'), "...opppoopppo...", "...ollo..ollo...", "..ooxxo..oxxoo.."];
const M_KIM = ["......oSSo......", rp('..o', 't', 10, 'o..'), rp('..ou', 't', 8, 'uo..'), rp('..ou', 't', 8, 'uo..'), rp('..os', 't', 8, 'so..'), rp('..o', 'b', 10, 'o..'), rp('..o', 'b', 10, 'o..'), rp('..o', 't', 10, 'o..'), '..o' + 'tTtTtTtTtT' + 'o..', "..ooxxo..oxxoo.."];
const M_HAK = ["......oSSo......", rp('..o', 't', 10, 'o..'), rp('..ou', 't', 8, 'uo..'), rp('..ou', 't', 8, 'uo..'), rp('..os', 't', 8, 'so..'), rp('..oS', 'b', 8, 'So..'), rp('..o', 'p', 10, 'o..'), '.o' + 'pPppPppPppPp' + 'o.', '.o' + 'pPppPppPppPp' + 'o.', "..ooxxo..oxxoo.."];
const M_DRESS = ["......oSSo......", rp('..o', 't', 10, 'o..'), rp('..ou', 't', 8, 'uo..'), rp('..ou', 't', 8, 'uo..'), rp('..os', 't', 8, 'so..'), rp('..oS', 'b', 8, 'So..'), rp('..o', 't', 10, 'o..'), '.o' + 'tttttttttttt' + 'o.', '.o' + 'tTtTtTtTtTtT' + 'o.', "..ooxxo..oxxoo.."];
const MP = { s:'#ffd5b5', S:'#eab08f', o:'#2b1d3a', e:'#1b1030', k:'#ff9bb0', m:'#c4506a', h:'#6b4429', H:'#8a5a39' };
const rng = (r0, r1, c0, c1, ch) => { const a = []; for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) a.push([r, c, ch]); return a; };
const OUTM = {
  kimono:   { map: M_KIM, pal: { o:'#2b1d3a', t:'#b8232b', T:'#ffd84d', u:'#b8232b', b:'#ffd84d', w:'#fff7e6', S:'#eab08f', s:'#ffd5b5', x:'#c9a36a' }, patch: [[11,6,'w'],[11,7,'w'],[12,7,'w'],[12,8,'w'],[13,8,'w'],[12,4,'T'],[13,10,'T'],[17,5,'T'],[17,10,'T'],[12,11,'T'],[13,4,'T'],[14,6,'T'],[16,4,'T'],[16,11,'T']] },
  yukata:   { map: M_KIM, pal: { o:'#2b1d3a', t:'#2f4fb8', T:'#e8f0ff', u:'#2f4fb8', b:'#ff6b9a', w:'#ffffff', S:'#eab08f', s:'#ffd5b5', x:'#c9a36a' }, patch: [[11,6,'w'],[11,7,'w'],[12,7,'w'],[12,8,'w'],[13,8,'w'],[12,4,'T'],[13,10,'T'],[17,5,'T'],[17,9,'T'],[12,11,'T'],[13,4,'T']] },
  furisode: { map: M_KIM, pal: { o:'#2b1d3a', t:'#d6246e', T:'#ffd84d', u:'#d6246e', b:'#ffd84d', w:'#fff7e6', S:'#eab08f', s:'#ffd5b5', x:'#c9a36a' }, patch: [...rng(12, 18, 1, 1, 'u'), ...rng(12, 18, 14, 14, 'u'), ...rng(14, 17, 0, 0, 'u'), ...rng(14, 17, 15, 15, 'u'), [11,6,'w'],[11,7,'w'],[12,7,'w'],[12,8,'w'],[13,8,'w'],[14,5,'T'],[15,10,'T'],[17,4,'T'],[17,11,'T'],[14,1,'T'],[16,14,'T'],[13,5,'T']] },
  shiromuku:{ map: M_KIM, pal: { o:'#2b1d3a', t:'#ffffff', T:'#dfe6f8', u:'#ffffff', b:'#e8eefc', w:'#ffffff', S:'#eab08f', s:'#ffd5b5', x:'#ffffff' }, patch: [[11,6,'T'],[11,7,'T'],[12,7,'T'],[12,8,'T'],[13,8,'T'],[12,4,'T'],[13,10,'T'],[17,5,'T'],[17,9,'T']] },
  hakama:   { map: M_HAK, pal: { o:'#2b1d3a', t:'#f5f5ff', T:'#dfe3f5', u:'#f5f5ff', b:'#3a2c6e', P:'#1c2563', p:'#2b3a8f', S:'#eab08f', s:'#ffd5b5', x:'#7a4a2a' }, patch: [[11,6,'T'],[11,9,'T']] },
  happi:    { map: M_TOP, pal: { o:'#2b1d3a', t:'#2f4fb8', T:'#1f3a8a', u:'#2f4fb8', b:'#ffffff', w:'#ffffff', S:'#eab08f', s:'#ffd5b5', p:'#f5f5ff', l:'#ffd5b5', x:'#7a4a2a' }, patch: [[11,6,'w'],[11,9,'w'],[12,6,'w'],[12,9,'w'],[13,6,'w'],[13,9,'w'],[14,6,'w'],[14,9,'w'],[12,7,'w'],[13,8,'w']] },
  sailor:   { map: M_DRESS, pal: { o:'#2b1d3a', t:'#ffffff', T:'#1f2f7a', u:'#ffffff', b:'#1f2f7a', B:'#1f2f7a', r:'#e8452c', S:'#eab08f', s:'#ffd5b5', x:'#2b2b3a' }, patch: [[11,5,'B'],[11,6,'B'],[11,9,'B'],[11,10,'B'],[12,5,'B'],[12,10,'B'],[13,6,'B'],[13,9,'B'],[12,7,'r'],[12,8,'r'],[13,7,'r'],...rng(16, 18, 2, 13, 'T')] },
};
const MACC = {
  hood: { y0: 0, pal: { w: '#ffffff', W: '#dfe6f8' }, rows: ["...wwwwwwwwww...", "..wwWWWWWWWWww..", "..wwwwwwwwwwww..", "..ww........ww.."] },
  hachimaki: { y0: 3, pal: { w: '#ffffff', r: '#e8452c' }, rows: ["..wwwwwwwwwwww..", "...wwwrrwwww...."] },
};
function mStamp(g, rows, y0, pal, patch) {
  const R = rows.map(r => r.split(''));
  (patch || []).forEach(([r, c, ch]) => { if (R[r - 10]) R[r - 10][c] = ch; });
  R.forEach((row, i) => { const y = y0 + MOY + i; if (y < 0 || y >= MH) return; row.forEach((c, x) => { if (c !== '.' && pal[c]) g[y][x] = pal[c]; }); });
}
export function charSprite(outfit, acc) {
  const g = Array.from({ length: MH }, () => Array(MW).fill(null)), O = OUTM[outfit];
  mStamp(g, O.map, 10, O.pal, O.patch); mStamp(g, M_HEAD, 0, MP, null);
  if (acc && MACC[acc]) mStamp(g, MACC[acc].rows, MACC[acc].y0, MACC[acc].pal, null);
  return g.slice(4, 28); // bỏ phần trống phía trên, còn 24 hàng
}

// ---------- đăng ký thẻ ----------
export const ITEMS = [];
// add(nhóm, mục nhỏ, id, tên Việt, tên Anh, ghi chú, hàm vẽ, tùy chọn { scene, use, char })
export function add(gr, sub, id, vi, en, note, fn, o = {}) { ITEMS.push({ gr, sub, id, vi, en, note, fn, ...o }); }
export function render(item) {
  if (item.char) return charSprite(item.char[0], item.char[1]);
  const d = new D(); item.fn(d); if (!item.scene) d.outline(); return d.g;
}

export const SC = { scene: true };
