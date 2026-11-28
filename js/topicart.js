// Tranh pixel cho mục Topics, vẽ bằng code (không cần file ảnh): tô các khối lên lưới điểm ảnh, tự viền nét tối, đổi ra SVG.
const INK = '#2d1f47';
const P = { w: '#ffffff', c: '#fff1cf', r: '#ff5a5f', R: '#c2354a', o: '#ff9a3c', y: '#ffd84d', Y: '#d9a41c', g: '#5fd068', G: '#2f9a4a', t: '#3cc8b4', b: '#5ab4ff', B: '#2f7ad1', v: '#a98bff', V: '#6f55d6', p: '#ff7fb5', n: '#c9905a', N: '#8a5a36', s: '#e4dff7', S: '#9a93c4', k: INK };

function grid(W, H) {
  const m = Array.from({ length: H }, () => Array(W).fill(''));
  const set = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < W && y < H) m[y][x] = c; };
  return {
    W, H, m, set,
    rect(x, y, w, h, c) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) set(i, j, c); },
    disc(cx, cy, rx, c, ry = rx) { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) set(x, y, c); },
    line(x0, y0, x1, y1, c) { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1); for (let i = 0; i <= n; i++) set(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, c); },
    outline() { // mọi ô trống nằm sát ô đã tô thành nét viền
      const add = [];
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (!m[y][x] && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => m[y + dy]?.[x + dx] && m[y + dy][x + dx] !== 'k')) add.push([x, y]);
      add.forEach(([x, y]) => { m[y][x] = 'k'; });
      return this;
    },
  };
}
function rects(g) {
  let out = '';
  g.m.forEach((row, y) => {
    for (let x = 0; x < g.W;) {
      const c = row[x]; let n = 1;
      while (x + n < g.W && row[x + n] === c) n++;
      if (c) out += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${P[c]}"/>`;
      x += n;
    }
  });
  return out;
}
const svg = (g, cls = '', extra = '') => `<svg class="tp-art ${cls}" viewBox="0 0 ${g.W} ${g.H}" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects(g)}${extra}</svg>`;
const cache = new Map();
const once = (key, make) => { if (!cache.has(key)) cache.set(key, make()); return cache.get(key); };

// ---------- 8 tranh "lĩnh vực": mỗi chủ đề luôn nhận cùng một tranh ----------
const FIELDS = [
  g => { g.disc(10, 8, 3.4, 's', 7); g.rect(7, 8, 7, 7, 's'); g.disc(10, 8, 1.8, 'b'); g.rect(9, 1, 3, 2, 'r'); g.rect(5, 12, 2, 4, 'r'); g.rect(14, 12, 2, 4, 'r'); g.rect(8, 15, 5, 1, 'S'); g.rect(9, 16, 3, 2, 'o'); g.set(10, 18, 'y'); }, // tên lửa
  g => { for (const [a, c] of [[0, 'b'], [60, 'v'], [120, 't']]) { const r = a * Math.PI / 180; for (let t = 0; t < 6.3; t += 0.08) { const x = Math.cos(t) * 8.5, y = Math.sin(t) * 3.2; g.set(10 + x * Math.cos(r) - y * Math.sin(r), 10 + x * Math.sin(r) + y * Math.cos(r), c); } } g.disc(10, 10, 2.4, 'r'); g.set(9, 9, 'w'); }, // nguyên tử
  g => { g.disc(10, 7.5, 6, 'y'); g.rect(7, 11, 7, 3, 'y'); g.disc(8, 6, 1.6, 'w'); g.rect(8, 14, 5, 2, 'S'); g.rect(9, 16, 3, 2, 's'); g.line(10, 9, 10, 13, 'o'); g.line(8, 9, 12, 9, 'o'); }, // bóng đèn
  g => { g.disc(10, 9, 7.5, 'b'); g.disc(7, 6.5, 2.8, 'g', 2.2); g.disc(12.5, 11, 3, 'g', 3.4); g.disc(14, 5, 1.4, 'g'); g.rect(8, 17, 5, 1, 'N'); g.rect(6, 18, 9, 1, 'n'); }, // địa cầu
  g => { g.rect(2, 5, 8, 11, 'c'); g.rect(11, 5, 8, 11, 'c'); g.rect(1, 15, 19, 2, 'r'); g.rect(10, 5, 1, 11, 'n'); for (const y of [7, 9, 11, 13]) { g.rect(3, y, 5, 1, 'S'); g.rect(13, y, 5, 1, 'S'); } g.rect(14, 3, 2, 6, 'p'); }, // quyển sách
  g => { g.disc(8, 8, 6, 'y'); g.disc(8, 8, 4.2, 'b'); g.disc(6.5, 6.5, 1.4, 'w'); for (let i = 0; i < 6; i++) g.rect(12 + i, 12 + i, 3, 2, 'n'); }, // kính lúp
  g => { g.rect(6, 14, 9, 5, 'n'); g.rect(5, 13, 11, 2, 'N'); g.rect(10, 7, 1, 6, 'G'); g.disc(6.5, 7, 4, 'g', 2.4); g.disc(14, 5, 4, 'g', 2.4); g.set(5, 6, 'w'); g.set(13, 4, 'w'); }, // mầm cây
  g => { g.disc(10, 10, 5.6, 'v'); g.disc(8, 8, 1.8, 'p'); g.set(12, 12, 'V'); g.set(13, 11, 'V'); for (let t = -0.2; t < 3.4; t += 0.05) { g.set(10 + Math.cos(t) * 9, 10 + Math.sin(t) * 2.6 - Math.cos(t) * 2.2, 'y'); } g.set(3, 3, 'w'); g.set(17, 16, 'w'); }, // hành tinh
];
const hash = s => [...String(s || '')].reduce((h, c) => (h * 31 + c.codePointAt(0)) >>> 0, 7);
export const field = name => { const i = hash(String(name || '').trim().toLowerCase()) % FIELDS.length; return once('f' + i, () => { const g = grid(21, 20); FIELDS[i](g); return svg(g.outline(), 'tpa-field'); }); };

// ---------- máy quay chủ đề (viên nang trong lồng kính) ----------
export const machine = () => once('machine', () => {
  const g = grid(30, 36);
  g.disc(15, 12, 11, 's');
  for (const [x, y, c] of [[10, 15, 'r'], [16, 17, 'y'], [21, 14, 'g'], [13, 10, 'b'], [19, 9, 'p'], [8, 10, 'v']]) { g.disc(x, y, 2.6, c); g.set(x - 1, y - 1, 'w'); }
  g.disc(8, 6, 1.5, 'w'); g.rect(10, 0, 11, 2, 'R');
  g.rect(5, 21, 21, 3, 'R'); g.rect(6, 24, 19, 10, 'r');
  g.disc(11, 28, 2.6, 'y'); g.line(9, 28, 13, 28, 'k'); g.rect(17, 27, 6, 5, 'k'); g.rect(18, 28, 4, 3, 'V');
  g.rect(5, 34, 21, 1, 'R');
  return svg(g.outline(), 'tpa-machine');
});
export const capsule = () => once('capsule', () => { const g = grid(13, 13); g.disc(6, 6, 5, 'w'); for (let y = 7; y < 13; y++) for (let x = 0; x < 13; x++) if (g.m[y][x]) g.m[y][x] = 'o'; g.rect(1, 6, 11, 1, 'y'); g.set(4, 3, 's'); return svg(g.outline(), 'tpa-capsule'); });

// ---------- đồng hồ cát: frac = phần thời gian còn lại (1 → 0) ----------
export function hourglass(frac, running) {
  const g = grid(17, 23), f = Math.max(0, Math.min(1, frac));
  const half = y => Math.max(1, Math.round(6 - (y < 11 ? Math.max(0, y - 5) : Math.max(0, 17 - y)))); // nửa bề rộng lòng kính ở hàng y
  for (let y = 3; y <= 19; y++) { const w = half(y); g.rect(8 - w, y, 2 * w + 1, 1, 's'); }
  const top = Math.round(f * 7), low = Math.round((1 - f) * 7);
  for (let y = 11 - top; y < 11; y++) { const w = half(y); if (y >= 3) g.rect(8 - w, y, 2 * w + 1, 1, 'y'); }
  for (let y = 20 - low; y <= 19; y++) { const w = half(y); g.rect(8 - w, y, 2 * w + 1, 1, 'y'); }
  g.rect(1, 1, 15, 2, 'n'); g.rect(1, 20, 15, 2, 'n');
  const grain = running && f > 0 ? '<rect class="tp-grain" x="8" y="11" width="1" height="2" fill="#d9a41c"/><rect class="tp-grain g2" x="8" y="11" width="1" height="1" fill="#d9a41c"/>' : '';
  return svg(g.outline(), 'tpa-glass', grain);
}
export const alarm = () => once('alarm', () => {
  const g = grid(25, 24);
  g.disc(5, 5, 3.4, 'r'); g.disc(19, 5, 3.4, 'r'); g.rect(11, 2, 3, 3, 'y');
  g.disc(12, 13, 8.6, 'R'); g.disc(12, 13, 6.6, 'w'); g.line(12, 13, 12, 8, 'k'); g.line(12, 13, 16, 13, 'k'); g.set(12, 13, 'r');
  g.line(6, 21, 4, 23, 'n'); g.line(18, 21, 20, 23, 'n');
  return svg(g.outline(), 'tpa-alarm');
});

// ---------- tự chấm điểm: 1–4 mầm non, 5–7 ngôi sao, 8–10 cúp vàng ----------
function star(g, cx, cy, R) {
  const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * 0.45 : R; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; });
  for (let y = 0; y < g.H; y++) for (let x = 0; x < g.W; x++) {
    let inside = false;
    for (let i = 0, j = 9; i < 10; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside; }
    if (inside) g.set(x, y, 'y');
  }
}
export function mood(score) {
  const k = score >= 8 ? 'cup' : score >= 5 ? 'star' : 'sprout';
  return once('m' + k, () => {
    if (k === 'sprout') { const g = grid(21, 20); FIELDS[6](g); return svg(g.outline(), 'tpa-mood'); }
    const g = grid(21, 20);
    if (k === 'star') { star(g, 10, 10, 9.5); g.set(8, 10, 'k'); g.set(12, 10, 'k'); g.rect(9, 12, 3, 1, 'o'); }
    else { g.rect(5, 2, 11, 7, 'y'); g.disc(10, 8, 5.4, 'y', 4); g.rect(2, 3, 3, 2, 'Y'); g.rect(2, 3, 2, 5, 'Y'); g.rect(16, 3, 3, 2, 'Y'); g.rect(17, 3, 2, 5, 'Y'); g.rect(9, 12, 3, 4, 'Y'); g.rect(6, 16, 9, 3, 'n'); g.rect(7, 4, 2, 4, 'w'); }
    return svg(g.outline(), 'tpa-mood');
  });
}

// ---------- tranh cho chỗ còn trống ----------
export const telescope = () => once('tele', () => {
  const g = grid(30, 24);
  for (let i = 0; i < 14; i++) g.rect(6 + i, 13 - Math.round(i * 0.6), 2, 4, i > 10 ? 'y' : i < 3 ? 'S' : 'b');
  g.line(13, 14, 8, 22, 'n'); g.line(13, 14, 18, 22, 'n'); g.line(13, 14, 13, 22, 'N');
  for (const [x, y] of [[25, 3], [4, 4], [23, 15]]) { g.set(x, y, 'y'); g.set(x - 1, y, 'y'); g.set(x + 1, y, 'y'); g.set(x, y - 1, 'y'); g.set(x, y + 1, 'y'); }
  return svg(g.outline(), 'tpa-none');
});
export const sparkle = () => once('spark', () => { const g = grid(7, 7); g.rect(3, 1, 1, 5, 'y'); g.rect(1, 3, 5, 1, 'y'); g.set(3, 3, 'w'); return svg(g, 'tpa-spark'); });
