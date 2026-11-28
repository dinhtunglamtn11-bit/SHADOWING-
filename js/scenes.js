// Tranh minh họa và hiệu ứng chung cho app, vẽ bằng code (không cần file ảnh):
//  - dải tranh động ở đầu các mục Thư viện, Ôn tập, Thế giới, Nhiệm vụ (chạm để thu gọn / mở lại);
//  - hình nhỏ cho các chỗ đang trống (.empty);
//  - pháo giấy khi hoàn thành nhiệm vụ, ôn xong, điểm cao.
// Tắt chuyển động trong Cài đặt (hoặc máy bật "giảm chuyển động") thì tranh đứng yên và không có pháo giấy.
import { bus } from './util.js';

const off = () => document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches;
const night = () => document.documentElement.dataset.theme === 'night';
const W = 320, H = 40, INK = '#2d1f47';
const pen = g => (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };

// ---------- mảnh vẽ dùng chung ----------
function sky(R, t) {
  const n = night(), bands = n ? ['#171238', '#201a4a', '#2a225a', '#332a68'] : ['#bfe6ff', '#cdeeff', '#ddf4ff', '#eefaff'];
  bands.forEach((c, i) => R(0, i * 8, W, 8, c));
  if (n) { for (let i = 0; i < 26; i++) if ((Math.floor(t * 2) + i * 7) % 9) R((i * 53) % W, (i * 17) % 20, 1, 1, i % 3 ? '#ffffff' : '#ffd84d'); R(286, 5, 8, 8, '#fff3b0'); R(289, 3, 8, 8, bands[0]); }
  else { R(284, 5, 10, 10, '#ffd84d'); R(286, 3, 6, 14, '#ffd84d'); R(282, 7, 14, 6, '#ffd84d'); for (let i = 0; i < 3; i++) cloud(R, ((t * (4 + i) + i * 130) % (W + 40)) - 30, 3 + i * 5); }
}
const cloud = (R, x, y) => { R(x + 4, y, 10, 3, '#ffffff'); R(x, y + 3, 20, 4, '#ffffff'); R(x + 2, y + 7, 16, 1, '#e4f0fa'); };
const ground = (R, c1, c2) => { R(0, 32, W, 8, c1); R(0, 32, W, 1, c2); for (let x = 3; x < W; x += 11) R(x, 35 + (x % 3), 2, 1, c2); };
function cat(R, x, y, t, col = '#ff9a3c') {
  const blink = t % 3.4 < 0.15;
  R(x + 2, y + 8, 12, 8, col); R(x + 3, y, 10, 9, col); R(x + 3, y - 2, 2, 2, col); R(x + 11, y - 2, 2, 2, col);
  R(x + 5, y + 3, 2, blink ? 1 : 2, INK); R(x + 9, y + 3, 2, blink ? 1 : 2, INK); R(x + 7, y + 6, 2, 1, '#ff7fb5');
  const tail = Math.round(Math.sin(t * 3) * 2); R(x + 14, y + 11, 3, 2, col); R(x + 16, y + 8 + tail, 2, 4, col);
}
function person(R, x, y, shirt, step) {
  R(x + 2, y, 5, 5, '#ffd3a8'); R(x + 2, y, 5, 2, INK); R(x + 3, y + 2, 1, 1, INK); R(x + 6, y + 2, 1, 1, INK); R(x + 1, y + 5, 7, 6, shirt);
  R(x + 2 + step, y + 11, 2, 4, INK); R(x + 5 - step, y + 11, 2, 4, INK);
}
const bulb = (R, x, y, on) => { R(x + 1, y, 5, 5, on ? '#ffd84d' : '#cfd6e8'); R(x, y + 1, 7, 3, on ? '#ffd84d' : '#cfd6e8'); R(x + 2, y + 5, 3, 3, '#9aa0a8'); if (on) { R(x - 3, y + 2, 2, 1, '#ffd84d'); R(x + 8, y + 2, 2, 1, '#ffd84d'); R(x + 3, y - 3, 1, 2, '#ffd84d'); } };
const glyph = (g, ch, x, y, c) => { g.fillStyle = c; g.font = 'bold 9px sans-serif'; g.textBaseline = 'top'; g.fillText(ch, Math.round(x), Math.round(y)); };

// ---------- các cảnh ----------
const SCENES = {
  library(R, t, g) { // góc đọc sách: kệ sách, mèo ngồi đọc, chữ bay lên
    sky(R, t); ground(R, '#b9905e', '#8a5a36');
    for (const bx of [8, 232]) { R(bx, 8, 58, 25, '#8a5a36'); for (let row = 0; row < 2; row++) { for (let i = 0; i < 11; i++) { const h = 7 + ((i * 3 + row) % 4); R(bx + 3 + i * 5, 19 + row * 12 - h, 4, h, ['#e8454d', '#5ab4ff', '#ffd84d', '#5fd068', '#a98bff', '#ff8fc0'][(i + row * 2 + bx) % 6]); } R(bx + 2, 19 + row * 12, 54, 2, '#5b3a22'); } }
    cat(R, 150, 17, t); R(142, 28, 14, 5, '#ffffff'); R(156, 28, 14, 5, '#ffffff'); R(155, 27, 2, 7, '#e8454d'); for (let i = 0; i < 3; i++) { R(144, 29 + i * 1.5, 9, 0.6, '#9aa0a8'); R(159, 29 + i * 1.5, 9, 0.6, '#9aa0a8'); }
    ['学', 'A', 'あ', '한', 'é'].forEach((ch, i) => { const p = (t * 0.22 + i * 0.2) % 1; glyph(g, ch, 82 + i * 38 + Math.sin(t * 2 + i) * 4, 27 - p * 26, night() ? '#ffd84d' : '#6f55d6'); });
  },
  review(R, t) { // thẻ lật bay ngang, bóng đèn "à ra thế"
    sky(R, t); ground(R, '#8fd05a', '#4f9a2a');
    for (let i = 0; i < 5; i++) {
      const x = ((t * 18 + i * 70) % (W + 30)) - 20, y = 10 + Math.sin(t * 2 + i * 1.7) * 6, flip = Math.abs(Math.cos(t * 2.2 + i)), w = Math.max(2, 16 * flip);
      R(x + (16 - w) / 2, y, w, 12, INK); R(x + (16 - w) / 2 + 1, y + 1, Math.max(0, w - 2), 10, Math.cos(t * 2.2 + i) > 0 ? '#ffffff' : ['#ff8fc0', '#5ab4ff', '#ffd84d'][i % 3]);
      if (flip > 0.7 && Math.cos(t * 2.2 + i) > 0) { R(x + 3, y + 4, 10, 1, '#9aa0a8'); R(x + 3, y + 7, 7, 1, '#9aa0a8'); }
    }
    person(R, 150, 18, '#ff8f3a', 0); bulb(R, 160, 7, t % 4 > 2);
    R(40, 24, 3, 9, '#6b4226'); R(34, 14, 15, 11, '#2f9a4a'); R(37, 11, 9, 5, '#5fd068'); R(262, 24, 3, 9, '#6b4226'); R(256, 15, 15, 10, '#2f9a4a');
  },
  world(R, t) { // quả địa cầu quay, máy bay giấy lượn quanh
    sky(R, t); ground(R, '#7ec3ff', '#3f8fd1');
    for (let i = 0; i < 18; i++) R((i * 19 + t * 6) % W, 34 + (i % 3) * 2, 6, 1, '#cfe8ff');
    const cx = 160, cy = 19, r = 15;
    for (let y = -r; y <= r; y++) { const half = Math.floor(Math.sqrt(r * r - y * y)); R(cx - half, cy + y, half * 2 + 1, 1, '#3f8fd1'); for (let x = -half; x <= half; x++) { const u = Math.floor(x + t * 5 + 200); if (Math.sin(u * 0.31) + Math.cos(y * 0.42 + u * 0.13) > 0.75) R(cx + x, cy + y, 1, 1, '#5fd068'); } }
    R(cx - 8, cy - 10, 4, 3, '#ffffff66');
    const a = t * 0.9, px = cx + Math.cos(a) * 55, py = cy - 2 + Math.sin(a) * 11, dir = -Math.sin(a) > 0 ? 1 : -1;
    R(px, py, 8, 1, '#ffffff'); R(px + (dir > 0 ? 3 : 1), py - 2, 4, 2, '#ffffff'); R(px + (dir > 0 ? 0 : 6), py + 1, 2, 2, '#cfd6e8');
    for (let i = 1; i < 5; i++) R(px - dir * i * 6, py + 1, 2, 1, '#ffffff99');
    for (const [x, c] of [[30, '#e8454d'], [270, '#ffd84d']]) { R(x, 16, 1, 17, INK); R(x + 1, 16 + Math.sin(t * 4) , 12, 7, c); R(x + 4, 18, 4, 3, '#ffffff'); }
  },
  quest(R, t) { // leo núi cắm cờ
    sky(R, t);
    const peak = (cx, h, c, snow) => { for (let i = 0; i < h; i++) R(cx - i * 2.2, 32 - h + i, i * 4.4 + 2, 1, c); if (snow) for (let i = 0; i < 7; i++) R(cx - i * 2.2, 32 - h + i, i * 4.4 + 2, 1, '#ffffff'); };
    peak(70, 18, '#9a93c4'); peak(250, 22, '#8a80b8', true); peak(170, 28, '#6f66a8', true);
    ground(R, '#5fd068', '#2f9a4a');
    R(171, 0, 1, 8, INK); R(172, Math.round(Math.sin(t * 4)), 11, 5, '#e8454d'); R(175, 1 + Math.round(Math.sin(t * 4)), 3, 3, '#ffd84d');
    const p = (t * 0.06) % 1, hx = 112 + p * 55, hy = 20 - p * 17; person(R, hx, hy, '#5ab4ff', Math.floor(t * 4) % 2); R(hx - 2, hy + 5, 3, 5, '#c2354a');
    for (let i = 0; i < 4; i++) if (Math.floor(t * 3 + i) % 4 === 0) { const x = 200 + i * 22, y = 8 + (i % 2) * 9; R(x, y - 2, 1, 5, '#ffd84d'); R(x - 2, y, 5, 1, '#ffd84d'); }
    cat(R, 24, 17, t, '#cfd6e8');
  },
};

// ---------- dải tranh đầu mục ----------
const HIDE_KEY = 'scenesHidden';
const hidden = () => { try { return localStorage.getItem(HIDE_KEY) === '1'; } catch { return false; } };
const banners = new Map(); // view -> { box, cv, g }
function banner(view) {
  if (!SCENES[view]) return null;
  if (banners.has(view)) return banners.get(view);
  const section = document.getElementById('v' + view[0].toUpperCase() + view.slice(1));
  if (!section) return null;
  const box = document.createElement('button');
  box.type = 'button'; box.className = 'scn-ban'; box.setAttribute('data-nosfx', ''); box.setAttribute('data-nofx', '');
  box.setAttribute('aria-label', 'Thu gọn hoặc mở tranh');
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  box.appendChild(cv);
  box.onclick = () => { try { localStorage.setItem(HIDE_KEY, hidden() ? '0' : '1'); } catch { /* bỏ qua */ } paintHidden(); draw(); };
  section.prepend(box);
  const o = { box, cv, g: cv.getContext('2d') };
  o.g.imageSmoothingEnabled = false;
  banners.set(view, o);
  return o;
}
const paintHidden = () => { for (const o of banners.values()) o.box.classList.toggle('min', hidden()); };
let t0 = performance.now(), io = null;
export function draw() { // vẽ dải của mục đang mở
  const view = document.body.dataset.view, o = banners.get(view);
  if (!o || o.box.dataset.out === '1' || hidden()) return;
  if (io && !o.watched) { o.watched = true; io.observe(o.box); }
  const t = off() ? 3 : (performance.now() - t0) / 1000;
  SCENES[view](pen(o.g), t, o.g);
}

// ---------- hình cho chỗ đang trống ----------
const art = new Map();
function emptyArt(view) {
  const key = view + (night() ? 'n' : 'd');
  if (art.has(key)) return art.get(key);
  const cv = document.createElement('canvas'); cv.width = 64; cv.height = 40;
  const g = cv.getContext('2d'), R = pen(g);
  R(8, 35, 48, 3, night() ? '#4a4285' : '#d8cfe8');
  if (view === 'review') { for (const [x, y, c] of [[10, 12, '#5ab4ff'], [18, 9, '#ff8fc0'], [26, 6, '#ffffff']]) { R(x, y, 20, 26, INK); R(x + 1, y + 1, 18, 24, c); } R(30, 13, 11, 2, '#9aa0a8'); R(30, 18, 8, 2, '#9aa0a8'); cat(R, 44, 20, 1); }
  else if (view === 'world') { for (let y = -13; y <= 13; y++) { const h = Math.floor(Math.sqrt(169 - y * y)); R(22 - h, 22 + y, h * 2 + 1, 1, '#3f8fd1'); } R(14, 14, 8, 6, '#5fd068'); R(20, 22, 9, 7, '#5fd068'); cat(R, 40, 20, 1, '#cfd6e8'); R(46, 6, 10, 1, '#9aa0a8'); R(49, 4, 4, 2, '#9aa0a8'); }
  else if (view === 'quest') { R(20, 6, 2, 30, INK); R(22, 7, 20, 12, '#e8454d'); R(28, 10, 6, 6, '#ffd84d'); cat(R, 40, 20, 1); }
  else if (view === 'scm') { for (const [x, y] of [[12, 22], [27, 22], [20, 9]]) { R(x, y, 14, 14, INK); R(x + 1, y + 1, 12, 12, '#c9905a'); R(x + 6, y + 1, 3, 12, '#ffd84d'); } cat(R, 44, 20, 1); }
  else { for (let i = 0; i < 4; i++) { R(8 + i, 30 - i * 6, 26 - i * 2, 6, INK); R(9 + i, 31 - i * 6, 24 - i * 2, 4, ['#e8454d', '#5ab4ff', '#5fd068', '#ffd84d'][i]); } cat(R, 40, 20, 1); }
  const url = cv.toDataURL();
  art.set(key, url);
  return url;
}
function decorateEmpty(el) {
  if (el.dataset.scn || el.closest('dialog, #lkPop, .tl')) return;
  el.dataset.scn = '1';
  if ([...el.querySelectorAll('*')].some(c => c.offsetHeight > 36 && c.offsetWidth > 36 && !c.firstElementChild)) return; // khung trống đã có sẵn hình lớn thì thôi
  const img = document.createElement('img');
  img.className = 'scn-empty'; img.alt = ''; img.src = emptyArt(document.body.dataset.view);
  el.prepend(img);
}

// ---------- pháo giấy ----------
const COLORS = ['#ffd84d', '#ff8f3a', '#5fd068', '#5ab4ff', '#ff8fc0', '#a98bff'];
export function confetti(el, n = 36) {
  if (off() || document.hidden || !el?.isConnected) return;
  const r = el.getBoundingClientRect();
  if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
  const layer = document.createElement('div'); layer.className = 'scn-confetti'; layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  const x = r.left + r.width / 2, y = r.top + Math.min(r.height / 2, 60);
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'), dx = (Math.random() - 0.5) * Math.min(420, innerWidth), up = 40 + Math.random() * 110;
    p.style.cssText = `left:${x}px;top:${y}px;background:${COLORS[i % COLORS.length]};width:${4 + (i % 3) * 2}px;height:${4 + ((i + 1) % 3) * 2}px`;
    layer.appendChild(p);
    p.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${dx * 0.6}px,${-up}px) rotate(180deg)`, opacity: 1, offset: 0.4 }, { transform: `translate(${dx}px,${90 + Math.random() * 80}px) rotate(520deg)`, opacity: 0 }], { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' });
  }
  setTimeout(() => layer.remove(), 1900);
}
const cheered = new Set(); // mỗi thành tích chỉ ăn mừng một lần (nhiều màn tự vẽ lại định kỳ)
const CHEER = '.allDone, .rvbig, .score.ok';
function maybeCheer(el) {
  if (el.closest('.tl')) return;
  const text = el.textContent.trim();
  const win = el.matches('.allDone') ? /🎉|Hoàn thành|Done|完成/.test(text) || !!el.querySelector('.pxe')
    : el.matches('.rvbig') ? /Xong|Finished|Done|完成/.test(text) && !/không còn|Không còn/.test(text)
      : parseInt(text, 10) >= 90;
  if (!win) return;
  const key = `${document.body.dataset.view}|${el.className}|${text}`;
  if (cheered.has(key)) return;
  cheered.add(key);
  requestAnimationFrame(() => confetti(el, el.matches('.score') ? 24 : 40));
}

export function init() {
  // phần tử mới được gom lại, xử lý ở khung hình sau: không làm chậm lệnh bấm đang vẽ trang
  const queue = new Set();
  let waiting = false;
  const handle = el => { if (el.matches('.empty')) decorateEmpty(el); else maybeCheer(el); };
  const flush = () => {
    waiting = false;
    for (const node of queue) {
      if (!node.isConnected) continue;
      if (node.matches('.empty, ' + CHEER)) handle(node);
      node.querySelectorAll('.empty, ' + CHEER).forEach(handle);
    }
    queue.clear();
  };
  const scan = node => {
    if (node.nodeType !== 1 || node.tagName === 'I') return;
    queue.add(node);
    if (!waiting) { waiting = true; setTimeout(flush, 60); }
  };
  new MutationObserver(list => { for (const m of list) m.addedNodes.forEach(scan); }).observe(document.body, { childList: true, subtree: true });
  scan(document.body);
  const open = view => requestAnimationFrame(() => { // sau khi trang mới đã hiện: không chặn lệnh chuyển mục
    const o = banner(view);
    paintHidden();
    if (o) draw();
    if (!off()) { // chỉ mờ dần vào, một lớp duy nhất (card đồ họa lo, không dàn lại trang)
      document.querySelector('.view.active')?.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 140, easing: 'ease-out' });
      document.querySelector('#nav button.on i')?.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
    }
  });
  bus.on('show', open);
  open(document.body.dataset.view);
  // dải tranh cuộn khỏi màn hình thì thôi vẽ
  if ('IntersectionObserver' in window) io = new IntersectionObserver(list => { for (const e of list) e.target.dataset.out = e.isIntersecting ? '' : '1'; });
  // 12 khung/giây là đủ cho tranh pixel; ẩn tab hoặc tắt chuyển động thì không vẽ lại
  setInterval(() => { if (!document.hidden && !off()) draw(); }, 83);
}
