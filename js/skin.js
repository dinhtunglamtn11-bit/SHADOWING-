// Giao diện app mua ở cửa hàng: đặt data-skin lên <html> (màu + nền nằm trong exnews.css) và chạy hiệu ứng động bằng một canvas nhẹ.
// Bật/tắt giao diện và hiệu ứng trong Cài đặt (ui.skinOn / ui.skinFx); hiệu ứng tự tắt khi ẩn trang, khi chọn "Hiệu ứng chuyển động: Tắt" hoặc khi hệ điều hành yêu cầu giảm chuyển động.
import { $, bus } from './util.js';
import { getUi } from './settings.js';
import * as passport from './passport.js';
import { SKINS } from './pass-skins.js';

const byId = id => SKINS.find(s => s.id === id);
let cv = null, ctx = null, raf = 0, parts = [], kind = '', W = 0, H = 0, last = 0, shoot = null, shootT = 0;
const R = (a, b) => a + Math.random() * (b - a), pick = a => a[Math.floor(Math.random() * a.length)];

// ---------- hiệu ứng ----------
const FX = {
  petals: { n: 34, make: init => ({ x: R(0, W), y: init ? R(0, H) : -10, vy: R(30, 60), sw: R(0.6, 1.6), ph: R(0, 6), s: R(4, 7), col: pick(['#ffb7d0', '#ff8fb8', '#ffd5e5', '#ff9ec4']) }), upd(p, dt, t) { p.y += p.vy * dt; p.x += Math.sin(t * p.sw + p.ph) * 22 * dt; return p.y < H + 10; }, draw(p) { ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, p.s, p.s * 0.7); ctx.fillRect(p.x + 1, p.y - 1, p.s * 0.6, p.s * 0.6); } },
  bubbles: { n: 26, make: init => ({ x: R(0, W), y: init ? R(0, H) : H + 10, vy: R(-50, -20), sw: R(0.5, 1.4), ph: R(0, 6), r: R(3, 9) }), upd(p, dt, t) { p.y += p.vy * dt; p.x += Math.sin(t * p.sw + p.ph) * 14 * dt; return p.y > -20; }, draw(p) { ctx.strokeStyle = 'rgba(160, 240, 255, .55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(p.x - p.r * 0.4, p.y - p.r * 0.5, 2, 2); } },
  stars: { n: 70, make: () => ({ x: R(0, W), y: R(0, H), s: R(1, 3), ph: R(0, 6), sp: R(0.8, 2.4), col: pick(['#ffffff', '#ffd84d', '#9fd8ff', '#ffb7e8']) }), upd: () => true, draw(p, t) { ctx.globalAlpha = 0.25 + 0.6 * Math.abs(Math.sin(t * p.sp + p.ph)); ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, p.s, p.s); if (p.s > 2.4) { ctx.fillRect(p.x - 2, p.y + 0.5, 6, 1); ctx.fillRect(p.x + 0.5, p.y - 2, 1, 6); } ctx.globalAlpha = 1; } },
  fireflies: { n: 26, make: () => ({ x: R(0, W), y: R(0, H), vx: R(-12, 12), vy: R(-12, 12), ph: R(0, 6), sp: R(0.6, 1.8) }), upd(p, dt) { p.vx += R(-20, 20) * dt; p.vy += R(-20, 20) * dt; p.vx = Math.max(-26, Math.min(26, p.vx)); p.vy = Math.max(-26, Math.min(26, p.vy)); p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10; return true; }, draw(p, t) { const a = 0.15 + 0.85 * Math.max(0, Math.sin(t * p.sp + p.ph)); ctx.fillStyle = `rgba(220, 255, 120, ${a * 0.25})`; ctx.fillRect(p.x - 4, p.y - 4, 9, 9); ctx.fillStyle = `rgba(240, 255, 160, ${a})`; ctx.fillRect(p.x - 1, p.y - 1, 3, 3); } },
  sprinkles: { n: 34, make: init => ({ x: R(0, W), y: init ? R(0, H) : -10, vy: R(14, 38), rot: R(0, 3), vr: R(-1, 1), col: pick(['#ff7ab8', '#7ad0ff', '#ffe27a', '#b8f07a', '#c9a8ff', '#ffa86a']) }), upd(p, dt) { p.y += p.vy * dt; p.rot += p.vr * dt; return p.y < H + 10; }, draw(p) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col; ctx.fillRect(-4, -1, 8, 3); ctx.restore(); } },
  digital: { n: 26, make: init => ({ x: Math.round(R(0, W) / 8) * 8, y: init ? R(0, H) : -30, vy: R(120, 260), len: R(10, 28), col: Math.random() < 0.5 ? '0, 240, 255' : '255, 60, 220' }), upd(p, dt) { p.y += p.vy * dt; return p.y < H + 40; }, draw(p) { const g = ctx.createLinearGradient(0, p.y - p.len, 0, p.y); g.addColorStop(0, `rgba(${p.col}, 0)`); g.addColorStop(1, `rgba(${p.col}, .55)`); ctx.fillStyle = g; ctx.fillRect(p.x, p.y - p.len, 2, p.len); } },
  snow: { n: 60, make: init => ({ x: R(0, W), y: init ? R(0, H) : -6, vy: R(20, 50), sw: R(0.4, 1.2), ph: R(0, 6), s: R(2, 5) }), upd(p, dt, t) { p.y += p.vy * dt; p.x += Math.sin(t * p.sw + p.ph) * 16 * dt; return p.y < H + 8; }, draw(p) { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(p.x, p.y, p.s, p.s); ctx.fillStyle = 'rgba(120,170,230,.35)'; ctx.fillRect(p.x + 1, p.y + p.s, p.s, 1); } },
  dust: { n: 44, make: init => ({ x: init ? R(0, W) : -6, y: R(0, H), vx: R(20, 70), sw: R(0.5, 1.5), ph: R(0, 6), s: R(1, 3) }), upd(p, dt, t) { p.x += p.vx * dt; p.y += Math.sin(t * p.sw + p.ph) * 10 * dt; return p.x < W + 8; }, draw(p) { ctx.fillStyle = 'rgba(196, 140, 70, .45)'; ctx.fillRect(p.x, p.y, p.s * 2, p.s); } },
  leaves: { n: 26, make: init => ({ x: R(0, W), y: init ? R(0, H) : -10, vy: R(24, 55), sw: R(0.5, 1.4), ph: R(0, 6), rot: R(0, 6), vr: R(-1.5, 1.5), col: pick(['#e0661a', '#c9302a', '#e8a21a', '#a8481a', '#d8801a']) }), upd(p, dt, t) { p.y += p.vy * dt; p.x += Math.sin(t * p.sw + p.ph) * 26 * dt; p.rot += p.vr * dt; return p.y < H + 12; }, draw(p) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col; ctx.fillRect(-4, -3, 8, 6); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-4, 0, 8, 1); ctx.restore(); } },
};

function size() { if (!cv) return; W = innerWidth; H = innerHeight; cv.width = W; cv.height = H; }
function frame(now) {
  raf = requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000 || 0); last = now; const t = now / 1000, f = FX[kind];
  if (!f) return;
  ctx.clearRect(0, 0, W, H);
  parts = parts.filter(p => f.upd(p, dt, t));
  while (parts.length < f.n) parts.push(f.make(false));
  for (const p of parts) f.draw(p, t);
  if (kind === 'stars') { // thỉnh thoảng có một sao băng
    shootT -= dt;
    if (shootT <= 0 && !shoot) { shoot = { x: R(W * 0.3, W), y: R(0, H * 0.4), vx: -420, vy: 230, life: 0.9 }; shootT = R(5, 10); }
    if (shoot) { shoot.x += shoot.vx * dt; shoot.y += shoot.vy * dt; shoot.life -= dt; const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x + 90, shoot.y - 50); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x + 90, shoot.y - 50); ctx.stroke(); if (shoot.life <= 0) shoot = null; }
  }
}
function stop() { cancelAnimationFrame(raf); raf = 0; parts = []; shoot = null; if (cv) { cv.remove(); cv = null; ctx = null; } kind = ''; }
function start(k) {
  if (kind === k && raf) return;
  stop(); if (!FX[k]) return;
  kind = k; cv = document.createElement('canvas'); cv.id = 'skinFx'; document.body.append(cv); ctx = cv.getContext('2d'); size();
  parts = Array.from({ length: FX[k].n }, () => FX[k].make(true)); shootT = 3; last = performance.now(); raf = requestAnimationFrame(frame);
}

// ---------- áp dụng ----------
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export function apply() {
  const u = getUi(), id = passport.skinCur(), s = byId(id), on = !!s && u.skinOn === 'on' && passport.skinOwned().includes(id);
  const d = document.documentElement;
  if (on) d.dataset.skin = s.val; else delete d.dataset.skin;
  if (on && s.fx && u.skinFx === 'on' && u.motion !== 'off' && !reduced() && !document.hidden) start(s.fx); else stop();
  fillSelect();
}
function fillSelect() {
  const sel = $('#skinSel'); if (!sel) return;
  const owned = passport.skinOwned().map(byId).filter(Boolean), cur = passport.skinCur();
  sel.innerHTML = `<option value="">— không dùng —</option>` + owned.map(s => `<option value="${s.id}" ${s.id === cur ? 'selected' : ''}>${s.vi}</option>`).join('');
  sel.disabled = !owned.length;
  const hint = $('#skinHint'); if (hint) hint.textContent = owned.length ? 'Chọn giao diện bạn đã mua. Có thể bật / tắt giao diện và hiệu ứng động bên dưới.' : 'Chưa mua giao diện nào. Mua ở Passport → Cửa hàng trang trí → Giao diện app.';
}
export function init() {
  addEventListener('resize', size);
  document.addEventListener('visibilitychange', apply);
  bus.on('skin', apply); bus.on('ui', apply); bus.on('settingsOpen', fillSelect);
  $('#skinSel')?.addEventListener('change', e => passport.skinSet(e.target.value));
  apply();
}
