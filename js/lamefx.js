// Lame biết cử động và đổi nét mặt theo việc bạn làm: làm đúng thì vui nhảy lên, làm sai thì buồn lắc đầu, mua thẻ thì sáng mắt,
// nhận dấu hạng thì xoay vòng, lâu không đụng tới thì ngủ gật. Nét mặt vẽ thẳng lên hình đã ghép nên đi theo mọi trang phục;
// thú đi cùng và vật cầm cũng nhún nhảy theo (bằng độ lệch dọc trong lameGrid), và lời chào đổi theo nước của bộ đang mặc.
// Tôn trọng "Hiệu ứng chuyển động: Tắt" và chế độ giảm chuyển động của hệ điều hành: khi đó chỉ còn nét mặt và bong bóng chữ, không có động tác.
import { bus, vnDate, vnHour } from './util.js';
import { byDate } from './tracker.js';
import * as store from './store.js';

// ---------- câu thoại do người dùng tự thêm (Cài đặt → Nhân vật Lame), đồng bộ qua prefs ----------
export const sayList = () => store.get('prefs', 'lamesay')?.list || [];
export const sayPut = list => store.put('prefs', 'lamesay', { list });
// khung giờ [from, to): from = to là cả ngày; from > to là qua nửa đêm (ví dụ 22 → 5)
export const inHours = (x, h) => (x.from === x.to || (x.from === 0 && x.to === 24) ? true : x.from < x.to ? h >= x.from && h < x.to : h >= x.from || h < x.to);
const mine = when => { try { const h = vnHour(); return sayList().filter(x => x.when === when && inHours(x, h)).map(x => x.text); } catch { return []; } };
// câu tự thêm được ưu tiên một nửa số lần nói
const mix = (when, builtin, often) => { const own = mine(when); return own.length ? { lines: Math.random() < 0.5 || !builtin.length ? own : builtin, often: Math.max(often, 0.6) } : { lines: builtin, often }; };
const iconOr = (when, icons) => { const own = mine(when); return own.length && Math.random() < 0.6 ? pick(own) : pick(icons); };
import { getUi } from './settings.js';

let o = null; // { edge, repaint, eq, items }
let expr = 'normal', pose = { pet: 0, hold: 0 }, animT = 0, exprT = 0, lastOk = 0, sleeping = false, lastAct = Date.now(), tick = 0;
const pick = a => a[Math.floor(Math.random() * a.length)];
const motionOk = () => getUi().motion !== 'off' && !matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden;

// ---------- nét mặt (chỉ sửa những điểm ảnh khuôn mặt mặc định; có mặt nạ / kính ở ô "Mặt" thì giữ nguyên) ----------
const E = '#1b1030', SK = '#ffd5b5', CH = '#ff9bb0', MO = '#c4506a', DK = '#7a1a2a', TEAR = '#8fd3ff', LOVE = '#ff5c8a';
function eyeRow(g, px) { for (let y = 6; y < 16; y++) if (g[y] && g[y][px + 5] === E && g[y][px + 10] === E) return y; return -1; }
function applyExpr(g, px, ex) {
  const y = eyeRow(g, px); if (y < 0) return;
  const set = (x, yy, c, soft) => { const row = g[yy]; if (!row || x < 0 || x >= row.length) return; if (soft && row[x] !== SK && row[x] !== CH) return; row[x] = c; };
  const L = px + 5, R = px + 10;
  const arch = x => { set(x, y, SK); set(x - 1, y, E, 1); set(x + 1, y, E, 1); set(x, y - 1, E, 1); }; // mắt cười ^
  const shut = x => { set(x - 1, y, E, 1); set(x, y, E); set(x + 1, y, E, 1); };                     // mắt nhắm -
  const heart = x => { for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [0, 1]]) set(x + dx, y + dy, LOVE, dx || dy ? 1 : 0); };
  const mouth = (...cells) => { for (const [dx, dy] of [[7, 2], [8, 2]]) set(px + dx, y + dy, SK); for (const [dx, dy, c] of cells) set(px + dx, y + dy, c); };
  if (ex === 'happy') { arch(L); arch(R); mouth([6, 2, MO], [7, 2, MO], [8, 2, MO], [9, 2, MO]); }
  else if (ex === 'wink') { arch(R); mouth([7, 2, MO], [8, 2, MO], [9, 2, MO]); }
  else if (ex === 'love') { heart(L); heart(R); mouth([7, 2, MO], [8, 2, MO], [6, 1, CH], [9, 1, CH]); }
  else if (ex === 'sad') { set(px + 4, y + 1, TEAR, 1); set(px + 11, y + 1, TEAR, 1); mouth([7, 3, MO], [8, 3, MO], [6, 3, MO], [9, 3, MO]); for (const dx of [6, 9]) set(px + dx, y + 2, MO); }
  else if (ex === 'wow') { set(L, y - 1, E, 1); set(R, y - 1, E, 1); mouth([7, 2, DK], [8, 2, DK], [7, 3, DK], [8, 3, DK]); }
  else if (ex === 'sleep' || ex === 'blink') { shut(L); shut(R); if (ex === 'sleep') mouth([8, 2, MO]); }
}
// ghép hình Lame kèm nét mặt và dáng nhún (dùng ở lame.js thay cho gọi lameGrid trực tiếp)
export function compose(Lm, eq, items) {
  const g = Lm.lameGrid(eq, items, pose);
  if (expr !== 'normal' && !eq.face) applyExpr(g, eq.pet ? 10 : 0, expr);
  return g;
}

// ---------- bong bóng chữ ----------
// Lời chào: mỗi nước đã làm thẻ trong Passport phải có một dòng ở GREET (thêm nước mới thì thêm luôn ở đây).
const GREET = { jp: 'こんにちは!', kr: '안녕!', cn: '你好!', vn: 'Xin chào!', fr: 'Bonjour!', us: 'Hello!', eg: 'مرحبا!', nz: 'Kia ora!', in: 'नमस्ते!', my: 'Apa khabar?', br: 'Olá!', pt: 'Olá!', ch: 'Grüezi!', ly: 'مرحبا!', au: "G'day!", ar: '¡Hola!', gh: 'Akwaaba!', nl: 'Hallo!', it: 'Ciao!', sa: 'مرحبا!', ru: 'Привет!', mg: 'Salama!', ao: 'Olá!', ca: 'Hello! Bonjour!', lr: 'Hello!' };
function greeting() {
  const eq = o.eq(), items = o.items() || {};
  for (const s of ['outfit', 'head', 'face', 'waist', 'feet', 'hold', 'pet']) { const it = items[eq[s]]; if (it && GREET[it.cc]) return GREET[it.cc]; } // lời chào theo nước của món đang mặc (ưu tiên trang phục)
  return pick(['Xin chào!', 'Lame đây!', '你好!']);
}
function bubble(text) {
  if (!text || !o.edge || o.edge.hidden) return;
  document.querySelectorAll('.lameBubble').forEach(b => b.remove());
  const r = o.edge.getBoundingClientRect(), b = document.createElement('div');
  b.className = 'lameBubble'; b.textContent = text; document.body.append(b);
  // câu dài thì xuống dòng và không được tràn ra ngoài màn hình; đuôi bong bóng vẫn chỉ vào Lame
  const w = b.offsetWidth, h = b.offsetHeight, vw = document.documentElement.clientWidth, cx = r.left + r.width / 2;
  const x = Math.min(Math.max(cx, w / 2 + 6), vw - w / 2 - 6);
  b.style.left = Math.round(x) + 'px'; b.style.top = Math.max(8, Math.round(r.top - h - 12)) + 'px';
  b.style.setProperty('--ax', Math.round(Math.min(Math.max(cx - x + w / 2, 12), w - 12)) + 'px');
  const long = text.length > 12; if (long) b.style.animationDuration = '3.4s';
  setTimeout(() => b.remove(), long ? 3500 : 2300);
}

// ---------- câu thoại ----------
const studied = () => { const d = byDate().get(vnDate()); return !!d && ['sec', 's', 'r', 'w', 'd', 'k', 'c', 'q', 'x', 'n', 't'].some(k => d[k]); };
function tapLines() { // câu nói được lúc chạm vào, tùy giờ và việc hôm nay đã học chưa
  const h = vnHour(), out = ['Gì đó gì đó?'];
  if (h >= 5 && h < 11) out.push('Sáng rồi, học vài từ đê! ☀️');
  if (h >= 11 && h < 14) out.push('Trưa rồi, ăn gì đê?');
  if (h >= 22 || h < 5) out.push('Khuya rồi, ngủ sớm đê');
  if ((h >= 11 && h < 13) || (h >= 17 && h < 19)) out.push('Ăn đê');
  try { if (!studied()) out.push('Bạn lười à?', 'Học đê'); } catch { /* chưa đọc được số liệu thì bỏ qua */ }
  return out;
}
let lastLine = '';
const fresh = list => { const pool = list.length > 1 ? list.filter(x => x !== lastLine) : list; return (lastLine = pick(pool)); };
const TAP_ICONS = ['👋', '😆', '🙃', '😤', '💕', '🐾', '🤭'];
function ownTap() { const out = mine('tap'); try { if (!studied()) out.push(...mine('idle')); } catch { /* bỏ qua */ } return out; }
const tapSay = () => { const r = Math.random(), own = ownTap(); if (own.length && r < 0.45) return fresh(own); return r < 0.65 ? fresh(tapLines()) : r < 0.83 ? greeting() : fresh(TAP_ICONS); };
// phản ứng khi làm bài: chủ yếu là biểu tượng, thỉnh thoảng mới nói để khỏi lặp gây phiền
const react = (when, icons, builtin, often) => { const m = mix(when, builtin, often); return m.lines.length && Math.random() < m.often ? pick(m.lines) : pick(icons); };

// ---------- hiệu ứng theo sự kiện ----------
const FX = {
  ok: { expr: 'happy', anim: 'fx-hop', ms: 950, jump: 1, bub: () => (Math.random() < 0.5 ? react('ok', ['👍', '✨', '😄', '💪', '🌟', '🎯', '✅', '😎', '🔥', '👏', '🥳', '💯', '🤩'], ['Bạn thắng, nhưng tôi chưa bao giờ thuaaa'], 0.2) : '') },
  bad: { expr: 'sad', anim: 'fx-shake', ms: 800, bub: () => (Math.random() < 0.5 ? react('bad', ['😅', '💦', '🤔', '💪', '🙈', '😵', '🥲', '🫠', '❓', '🩹'], ['Bạn sợ à?', 'Suýt đúng'], 0.35) : '') },
  buy: { expr: 'love', anim: 'fx-pop', ms: 1200, jump: 1, bub: () => iconOr('buy', ['🛍️', '💖', '✨', '🤑', '🎀', '😍', '🛒', '💝']) },
  rank: { expr: 'wow', anim: 'fx-spin', ms: 1500, jump: 1, bub: arg => ({ bronze: '🥉', silver: '🥈', gold: '🥇', diamond: '💎' }[arg] || '🛂') + '!' },
  chest: { expr: 'wow', anim: 'fx-cheer', ms: 1400, jump: 1, bub: () => iconOr('chest', ['🎁', '🎊', '👀', '🗝️', '✨']) },
  coin: { expr: 'happy', anim: 'fx-pop', ms: 800, bub: () => iconOr('coin', ['🪙', '💰', '🤑', '✨']) },
  cheer: { expr: 'happy', anim: 'fx-cheer', ms: 1400, jump: 1, bub: () => react('cheer', ['🎉', '🏆', '👏', '🥳', '🎇', '👑', '💯'], ['Bạn thắng, nhưng tôi chưa bao giờ thuaaa'], 0.4) },
  greet: { expr: 'wink', anim: 'fx-wave', ms: 1100, bub: () => greeting() },
};
function setExpr(x, ms) {
  expr = x; clearTimeout(exprT); o.repaint();
  if (ms) exprT = setTimeout(() => { expr = sleeping ? 'sleep' : 'normal'; o.repaint(); }, ms);
}
function anim(cls, ms) {
  const e = o.edge; if (!e || !motionOk()) return;
  e.classList.remove('fx-hop', 'fx-shake', 'fx-wave', 'fx-pop', 'fx-spin', 'fx-cheer', 'fx-sleep'); void e.offsetWidth; e.classList.add(cls);
  clearTimeout(animT); animT = setTimeout(() => { e.classList.remove(cls); if (sleeping) e.classList.add('fx-sleep'); }, ms);
}
function jump() { // thú và vật cầm nhảy lên rồi rơi xuống
  if (!motionOk()) return; const seq = [[-2, -1], [-3, -2], [-1, -1], [0, 0]];
  seq.forEach(([p, h], i) => setTimeout(() => { pose = { pet: p, hold: h }; o.repaint(); }, i * 150));
}
export function play(kind, arg) {
  if (!o || !o.edge || o.edge.hidden) return;
  const f = FX[kind]; if (!f) return;
  if (kind === 'ok' || kind === 'bad') { const now = Date.now(); if (now - lastOk < 600) return; lastOk = now; } // câu liên tiếp thì không nhảy dồn dập
  wake(true); setExpr(f.expr, f.ms); anim(f.anim, f.ms); if (f.jump) jump(); const b = f.bub(arg); if (b) bubble(b);
}

// chạm vào Lame: mỗi lần một nét mặt và động tác khác lần trước, kèm lời chào
const TAPS = [
  { expr: 'wink', anim: 'fx-wave', ms: 1100 }, { expr: 'happy', anim: 'fx-hop', ms: 950, jump: 1 }, { expr: 'love', anim: 'fx-pop', ms: 1200 },
  { expr: 'wow', anim: 'fx-shake', ms: 800 }, { expr: 'happy', anim: 'fx-cheer', ms: 1400, jump: 1 }, { expr: 'wink', anim: 'fx-spin', ms: 1500 },
];
let lastTap = -1;
export function tap() {
  if (!o || !o.edge || o.edge.hidden) return;
  let i = Math.floor(Math.random() * TAPS.length); if (i === lastTap) i = (i + 1) % TAPS.length; lastTap = i;
  const f = TAPS[i]; wake(true); setExpr(f.expr, f.ms); anim(f.anim, f.ms); if (f.jump) jump(); bubble(tapSay());
}

// ---------- đời sống lúc rảnh: chớp mắt, nhún nhảy, ngủ gật ----------
function wake(quiet) { lastAct = Date.now(); if (!sleeping) return; sleeping = false; o.edge.classList.remove('fx-sleep'); if (!quiet) { setExpr('wow', 700); bubble(pick(['!', '😳', '⁉️', '🥱'])); } else expr = 'normal'; }
function blinkLoop() {
  setTimeout(() => { if (o && o.edge && !o.edge.hidden && expr === 'normal' && !document.hidden) { expr = 'blink'; o.repaint(); setTimeout(() => { if (expr === 'blink') { expr = 'normal'; o.repaint(); } }, 140); } blinkLoop(); }, 2600 + Math.random() * 3600);
}
function idleLoop() {
  setInterval(() => {
    if (!o || !o.edge || o.edge.hidden || document.hidden) return;
    const eq = o.eq();
    if ((eq.pet || eq.hold) && motionOk() && !sleeping && expr === 'normal') { tick++; pose = tick % 2 ? { pet: -1, hold: 0 } : { pet: 0, hold: -1 }; o.repaint(); } // thú và vật cầm nhún nhẹ khi rảnh
    else if (pose.pet || pose.hold) { if (sleeping || expr === 'normal') { pose = { pet: 0, hold: 0 }; o.repaint(); } }
    if (!sleeping && Date.now() - lastAct > 150000) { sleeping = true; expr = 'sleep'; o.repaint(); if (motionOk()) o.edge.classList.add('fx-sleep'); bubble(pick(['💤', '😴', '🌙', '🛌'])); }
    else if (sleeping && Date.now() % 9000 < 700) bubble(pick(['💤', '😴', '🌙', '🛌']));
  }, 700);
}
export function init(opts) {
  o = opts;
  bus.on('lamefx', d => (typeof d === 'string' ? play(d) : play(d.k, d.arg))); // bus chỉ mang một giá trị: chuỗi (tên hiệu ứng) hoặc { k, arg }
  for (const ev of ['pointerdown', 'keydown']) addEventListener(ev, () => { if (sleeping) wake(false); else lastAct = Date.now(); }, { passive: true });
  blinkLoop(); idleLoop();
}
