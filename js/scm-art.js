// Hình minh họa pixel cho mục SCM: biểu tượng 4 lĩnh vực, 12 case, sao, cấp độ, bảng hiệu cảng biển và nhân vật quản lý có mũ bảo hộ.
// Mọi hình vẽ bằng mã (không cần file ảnh), dùng bộ vẽ 16×16 của Passport (pass-kit.js).
import { D, paint } from './pass-kit.js';

// ---------- biểu tượng 16×16 ----------
const ART = {
  // 4 lĩnh vực
  'f-customs': d => { d.bg('B'); d.r(2, 1, 10, 13, 'w'); d.r(2, 1, 10, 2, 'a'); d.r(4, 5, 6, 1, 'A'); d.r(4, 7, 5, 1, 'A'); d.r(4, 9, 4, 1, 'A'); d.e(11, 11, 3.2, 3.2, 'R'); d.e(11, 11, 2.4, 2.4, 'r'); d.p('w', 10, 10, 12, 10, 11, 11, 10, 12, 12, 12); d.p('y', 3, 14, 12, 14); },
  'f-pay': d => { d.bg('b'); d.tri(1, 2, 14, 4, 'w'); d.r(2, 6, 12, 1, 'l'); for (const x of [3, 6, 9, 12]) d.r(x, 7, 2, 5, 'w'); d.r(1, 12, 14, 2, 'a'); d.r(0, 14, 16, 2, 'A'); d.e(8, 4, 1.4, 1.4, 'y'); d.p('Y', 8, 4); d.p('y', 1, 1, 14, 1); },
  'f-buy': d => { d.bg('u'); d.r(1, 9, 7, 6, 'n'); d.r(1, 9, 7, 1, 'N'); d.r(4, 9, 1, 6, 'y'); d.r(8, 9, 7, 6, 't'); d.r(8, 9, 7, 1, 'n'); d.r(11, 9, 1, 6, 'y'); d.r(4, 3, 8, 6, 'o'); d.r(4, 3, 8, 1, 'O'); d.r(7, 3, 2, 6, 'y'); d.p('r', 13, 5, 14, 6, 13, 7); d.l(14, 6, 13, 4, 'w'); },
  'f-fin': d => { d.bg('B'); d.r(2, 10, 3, 5, 'g'); d.r(6, 7, 3, 8, 'y'); d.r(10, 4, 3, 11, 'o'); d.r(0, 15, 16, 1, 'a'); d.l(2, 8, 7, 5, 'w'); d.l(7, 5, 12, 2, 'w'); d.p('w', 12, 3, 11, 2, 12, 1, 13, 2); d.e(3, 3, 2, 2, 'y'); d.p('Y', 3, 3); },
  // 12 case
  A1: d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(1, 8, 9, 5, 'r'); d.r(1, 8, 9, 1, 'R'); for (let x = 2; x < 10; x += 2) d.r(x, 9, 1, 3, 'R'); d.r(9, 2, 5, 7, 'w'); d.r(10, 1, 5, 7, 'e'); d.r(11, 0, 4, 6, 'l'); d.p('A', 10, 3, 12, 3, 11, 5, 13, 2); d.p('r', 14, 7); },
  A2: d => { d.bg('u'); d.r(2, 1, 9, 13, 'w'); d.r(2, 1, 9, 2, 'a'); d.r(4, 5, 5, 1, 'A'); d.r(4, 7, 4, 1, 'A'); d.p('R', 4, 10, 8, 12, 6, 11); d.l(4, 12, 8, 10, 'r'); d.e(11, 10, 3, 3, 'l'); d.e(11, 10, 2, 2, 'c'); d.l(13, 12, 15, 14, 'N'); },
  A3: d => { d.bg('P'); d.r(1, 4, 14, 9, 'e'); d.l(1, 4, 8, 9, 'W'); d.l(15, 4, 8, 9, 'W'); d.r(1, 12, 14, 1, 'W'); d.e(11, 11, 3.4, 3.4, 'r'); d.e(11, 11, 2.6, 2.6, 'R'); d.p('w', 10, 10, 12, 10, 10, 12, 12, 12); d.p('k', 4, 7, 7, 7, 5, 9); },
  B1: d => { d.bg('c'); d.r(1, 3, 14, 10, 'b'); d.r(1, 5, 14, 2, 'B'); d.r(2, 9, 5, 1, 'l'); d.r(2, 11, 8, 1, 'c'); d.e(12, 10, 2.2, 2.2, 'y'); d.p('r', 10, 1, 11, 2, 12, 3, 13, 2, 14, 1); d.l(10, 3, 14, 3, 'R'); d.p('w', 13, 1); },
  B2: d => { d.bg('u'); d.r(3, 1, 10, 13, 'e'); d.r(2, 0, 12, 2, 'Y'); d.r(2, 13, 12, 2, 'Y'); d.r(5, 4, 6, 1, 'N'); d.r(5, 6, 5, 1, 'N'); d.r(5, 8, 4, 1, 'N'); d.l(9, 8, 14, 14, 'r'); d.l(14, 8, 9, 14, 'r'); d.p('R', 10, 9, 13, 9, 10, 13, 13, 13); },
  B3: d => { d.bg('B'); d.e(8, 8, 6.5, 6.5, 'b'); d.e(8, 8, 6.5, 6.5, 'C'); d.p('g', 5, 5, 6, 5, 6, 6, 9, 9, 10, 9, 10, 10, 8, 4, 11, 7); d.l(1, 8, 14, 8, 'c'); d.l(8, 1, 8, 14, 'c'); d.e(8, 8, 3, 6.5, 'b'); d.p('y', 3, 6, 12, 5, 4, 11, 13, 10, 8, 12); d.p('r', 8, 3); },
  C1: d => { d.bg('u'); d.r(1, 9, 6, 6, 'n'); d.r(7, 9, 7, 6, 't'); d.r(3, 3, 7, 6, 'o'); d.r(1, 9, 13, 1, 'N'); d.r(3, 3, 7, 1, 'O'); d.r(5, 3, 1, 6, 'y'); d.r(3, 9, 1, 6, 'y'); d.r(10, 9, 1, 6, 'y'); d.r(11, 2, 4, 4, 'w'); d.p('r', 12, 3, 13, 4); d.p('k', 12, 4); },
  C2: d => { d.bg('c'); d.r(2, 3, 7, 11, 'b'); d.e(5.5, 3, 3.5, 1.4, 'l'); d.r(2, 7, 7, 1, 'B'); d.r(2, 11, 7, 1, 'B'); d.e(5.5, 14, 3.5, 1.4, 'B'); d.r(10, 3, 5, 10, 'w'); d.l(10, 11, 12, 8, 'r'); d.l(12, 8, 14, 5, 'r'); d.p('g', 11, 12, 13, 10); },
  C3: d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.r(1, 6, 5, 6, 'A'); d.tri(1, 4, 5, 3, 'r'); d.r(2, 8, 1, 2, 'y'); d.r(4, 8, 1, 2, 'y'); d.r(10, 6, 5, 6, 'A'); d.tri(10, 4, 5, 3, 'r'); d.r(11, 8, 1, 2, 'y'); d.r(13, 8, 1, 2, 'y'); d.l(6, 9, 9, 9, 'w'); d.p('w', 8, 8, 8, 10); d.p('y', 7, 14, 8, 14, 9, 14); },
  D1: d => { d.bg('c'); d.r(1, 6, 14, 9, 'x'); d.r(1, 4, 14, 3, 'r'); for (let x = 1; x < 15; x += 4) d.r(x, 4, 2, 3, 'w'); d.r(3, 9, 5, 6, 'B'); d.r(10, 9, 4, 3, 'y'); d.r(1, 14, 14, 2, 'a'); d.r(11, 1, 4, 2, 'k'); d.r(12, 0, 2, 1, 'k'); d.p('y', 14, 3); },
  D2: d => { d.bg('u'); d.tri(1, 3, 8, 5, 'R'); d.r(2, 8, 6, 6, 'w'); d.r(4, 10, 2, 4, 'n'); d.r(9, 8, 6, 6, 'N'); d.r(9, 8, 6, 1, 'n'); d.r(11, 7, 2, 1, 'k'); d.r(11, 10, 2, 1, 'y'); d.p('y', 12, 2, 12, 4); d.l(10, 1, 14, 1, 'y'); },
  D3: d => { d.bg('B'); d.r(0, 12, 16, 4, 'l'); d.r(1, 7, 8, 5, 'w'); d.r(9, 8, 5, 4, 'c'); d.r(10, 9, 2, 2, 'B'); d.e(3, 13, 1.6, 1.6, 'k'); d.e(11, 13, 1.6, 1.6, 'k'); d.p('b', 2, 8, 4, 8, 6, 8); d.l(3, 1, 3, 5, 'l'); d.l(1, 3, 5, 3, 'l'); d.l(1, 1, 5, 5, 'c'); d.l(5, 1, 1, 5, 'c'); d.p('w', 12, 2, 14, 4, 13, 3); },
  // phụ
  star: d => { d.bg('_'); d.r(7, 1, 2, 3, 'y'); d.r(3, 4, 10, 3, 'y'); d.r(4, 7, 8, 3, 'y'); d.r(3, 10, 3, 3, 'y'); d.r(10, 10, 3, 3, 'y'); d.r(7, 4, 2, 6, 'u'); d.p('Y', 7, 3, 8, 3); d.outline(); },
  star0: d => { d.bg('_'); d.r(7, 1, 2, 3, 'a'); d.r(3, 4, 10, 3, 'a'); d.r(4, 7, 8, 3, 'a'); d.r(3, 10, 3, 3, 'a'); d.r(10, 10, 3, 3, 'a'); d.outline(); },
  lock: d => { d.bg('_'); d.r(3, 7, 10, 8, 'Y'); d.r(3, 7, 10, 1, 'y'); d.r(5, 2, 6, 6, 'a'); d.r(7, 4, 2, 4, '_'); d.r(7, 10, 2, 3, 'k'); d.outline(); },
  clock: d => { d.bg('_'); d.e(8, 8, 6, 6, 'w'); d.e(8, 8, 4.6, 4.6, 'e'); d.l(8, 8, 8, 4, 'k'); d.l(8, 8, 11, 8, 'k'); d.p('r', 8, 8); d.outline(); },
  check: d => { d.bg('_'); d.l(3, 8, 6, 12, 'g'); d.l(6, 12, 13, 3, 'g'); d.l(3, 7, 6, 11, 'G'); d.l(6, 11, 13, 2, 'G'); d.outline(); },
  'lv-easy': d => { d.bg('_'); d.e(8, 9, 5.5, 5, 'g'); d.e(8, 9, 4, 3.6, 'h'); d.l(8, 4, 8, 14, 'G'); d.p('G', 6, 8, 10, 8, 6, 11, 10, 11); d.outline(); },
  'lv-med': d => { d.bg('_'); d.e(8, 8, 6, 6, 'o'); d.e(8, 8, 4.4, 4.4, 'y'); d.r(7, 4, 2, 5, 'O'); d.r(7, 9, 4, 2, 'O'); d.outline(); },
  'lv-hard': d => { d.bg('_'); d.tri(3, 1, 10, 14, 'r'); d.tri(5, 5, 6, 10, 'o'); d.tri(7, 9, 2, 6, 'y'); d.outline(); },
  coin: d => { d.bg('_'); d.e(8, 8, 6, 6, 'Y'); d.e(8, 8, 5, 5, 'y'); d.r(7, 4, 2, 8, 'Y'); d.p('u', 5, 5, 6, 4); d.outline(); },
};
export const hasArt = n => !!ART[n];
// canvas pixel của một biểu tượng; scale = số điểm màn hình trên mỗi điểm ảnh; outline = viền tối quanh hình
export function icon(name, scale = 4, outline = true) {
  const d = new D(); (ART[name] || ART['f-fin'])(d); if (outline && !/^(star|lock|clock|check|lv-|coin)/.test(name)) d.outline();
  const cv = document.createElement('canvas'); cv.className = 'scm-px'; paint(cv, d.g, scale); cv.style.width = 16 * scale + 'px'; cv.style.height = 16 * scale + 'px'; cv.setAttribute('aria-hidden', 'true'); return cv;
}
// vẽ các biểu tượng trong một vùng HTML: phần tử có data-art="tên" và data-sc="cỡ"
export function paintIcons(root) { root.querySelectorAll('[data-art]').forEach(el => { if (el.dataset.done) return; el.dataset.done = '1'; el.replaceChildren(icon(el.dataset.art, +el.dataset.sc || 4, el.dataset.ol !== '0')); }); }

// ---------- bảng hiệu cảng biển 192×60 ----------
const BW = 192, BH = 60;
export function banner(cv) {
  cv.width = BW; cv.height = BH; const c = cv.getContext('2d'); const R = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
  // trời hoàng hôn theo dải màu
  ['#2b2f77', '#3b3f94', '#5a4aa8', '#8a5fb0', '#c777a8', '#f09a8a', '#ffc27a'].forEach((col, i) => R(0, i * 5, BW, 5, col));
  R(140, 22, 22, 22, '#ffdf8a'); R(144, 18, 14, 4, '#ffdf8a'); R(144, 44, 14, 3, '#ffdf8a'); R(142, 24, 18, 18, '#fff2c0');
  for (const [x, y, w] of [[10, 8, 24], [60, 14, 30], [110, 6, 22]]) { R(x, y, w, 3, '#d9b6e8'); R(x + 4, y - 3, w - 10, 3, '#e8cbf0'); }
  // biển
  R(0, 40, BW, 20, '#2a5aa8'); for (let y = 42; y < 60; y += 4) for (let x = (y % 8 ? 0 : 6); x < BW; x += 12) R(x, y, 6, 1, '#4d85d8');
  R(0, 40, BW, 2, '#7fb3ec');
  // cầu cảng và kho
  R(0, 44, 70, 16, '#4a4f6a'); R(0, 44, 70, 2, '#6a6f8c'); R(6, 28, 36, 16, '#c9704a'); R(6, 26, 36, 3, '#a8503a'); for (let x = 9; x < 40; x += 8) R(x, 34, 5, 10, '#4a3a5a');
  // cần cẩu
  R(50, 14, 3, 30, '#e8452c'); R(46, 14, 30, 3, '#e8452c'); R(46, 10, 3, 6, '#e8452c'); R(70, 17, 1, 12, '#222'); R(66, 29, 9, 5, '#2fa58f'); R(50, 14, 3, 30, '#ff6a4a'); R(52, 40, 9, 4, '#8a8fa8');
  // tàu chở container
  R(80, 38, 90, 8, '#2b2b3a'); R(76, 42, 8, 4, '#2b2b3a'); R(160, 34, 14, 12, '#d9d9e8'); R(163, 36, 8, 4, '#4a7be0'); R(166, 28, 4, 6, '#e8452c');
  const cols = ['#e8452c', '#ffd84d', '#2fa58f', '#4a7be0', '#ff9f43', '#c94a8a'];
  for (let r = 0; r < 3; r++) for (let k = 0; k < 8 - r; k++) { const x = 84 + k * 9 + r * 4, y = 36 - r * 5; R(x, y, 8, 5, cols[(k * 2 + r * 3) % 6]); R(x, y, 8, 1, 'rgba(255,255,255,.35)'); R(x + 3, y + 1, 1, 4, 'rgba(0,0,0,.25)'); }
  R(78, 46, 94, 3, '#c0302a');
  // máy bay nhỏ và đàn chim
  R(30, 4, 8, 2, '#fff'); R(34, 2, 2, 6, '#fff'); R(28, 4, 3, 1, '#ffc27a'); for (const [x, y] of [[96, 10], [104, 7], [112, 12]]) { R(x, y, 3, 1, '#2b1d3a'); R(x + 3, y + 1, 3, 1, '#2b1d3a'); }
  // người quản lý đội mũ bảo hộ đứng trên cầu cảng
  R(20, 40, 6, 6, '#ffd84d'); R(19, 39, 8, 2, '#ffd84d'); R(20, 36, 6, 4, '#ffd5b5'); R(20, 35, 6, 2, '#ffd84d'); R(21, 37, 1, 1, '#1b1030'); R(24, 37, 1, 1, '#1b1030'); R(18, 40, 10, 8, '#ff9f43'); R(18, 44, 10, 1, '#ffd84d'); R(20, 48, 3, 6, '#2b3a8a'); R(24, 48, 3, 6, '#2b3a8a'); R(27, 41, 6, 8, '#fff'); R(28, 43, 4, 1, '#4a7be0'); R(28, 45, 4, 1, '#4a7be0');
}
// nhân vật quản lý nhỏ (16×16) dùng làm "người hướng dẫn" trong màn kết quả
export function mascot(scale = 5) {
  const d = new D(); d.bg('_'); d.r(4, 1, 8, 3, 'y'); d.r(3, 3, 10, 1, 'Y'); d.r(5, 4, 6, 4, 's'); d.p('k', 6, 5, 9, 5); d.p('m', 7, 7, 8, 7); d.r(3, 8, 10, 5, 'o'); d.r(3, 11, 10, 1, 'y'); d.r(4, 13, 3, 3, 'B'); d.r(9, 13, 3, 3, 'B'); d.r(11, 8, 4, 5, 'w'); d.p('b', 12, 9, 13, 9, 12, 11, 13, 11); d.outline();
  const cv = document.createElement('canvas'); cv.className = 'scm-px'; paint(cv, d.g, scale); cv.style.width = 16 * scale + 'px'; cv.style.height = 16 * scale + 'px'; return cv;
}
