// Nhân vật Lame: hiện ở rìa màn hình với bộ đang mặc và món đang cầm; chỉnh trong Cài đặt → Nhân vật Lame.
// Chỉ chọn được những thẻ đã mua ở Passport. Hình được ghép trong pass-lame.js (nạp khi cần).
import { $, bus } from './util.js';
import { uiLang } from './i18n.js';
import { getUi } from './settings.js';
import * as passport from './passport.js';
import * as fx from './lamefx.js';

const t = (vi, en) => (uiLang === 'vi' ? vi : en);
const LABEL = { outfit: ['Trang phục', 'Outfit'], head: ['Đồ đội đầu / kiểu tóc', 'Headwear / hairstyle'], face: ['Mặt nạ', 'Mask'], waist: ['Đai', 'Belt'], feet: ['Giày dép', 'Footwear'], hold: ['Cầm trên tay', 'Held item'], pet: ['Đi cùng', 'Companion'] };
let L = null, items = null, edge = null, busy = false;

async function load() {
  if (L && items) return true;
  const [lame, K] = await Promise.all([import('./pass-lame.js'), passport.items()]);
  L = lame; items = K.byId; return true;
}
const paintGrid = (cv, g, s) => { cv.width = g[0].length * s; cv.height = g.length * s; const c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height); g.forEach((row, y) => row.forEach((col, x) => { if (col) { c.fillStyle = col; c.fillRect(x * s, y * s, s, s); } })); };
const name = it => (uiLang === 'vi' ? it.vi : it.en);

function visible() { const v = document.body.dataset.view; return getUi().lame !== 'off' && v !== 'player' && v !== 'doc'; }
async function refresh() {
  if (!edge) return;
  edge.hidden = !visible();
  if (edge.hidden) return;
  if (busy) return; busy = true;
  try { await load(); const eq = passport.getEq(), g = fx.compose(L, eq, items), s = +(getUi().lameSz) || 3; paintGrid(edge, g, s); edge.title = 'Lame'; } finally { busy = false; }
}
function paintNow() { if (!L || !items || !edge || edge.hidden) return; paintGrid(edge, fx.compose(L, passport.getEq(), items), +(getUi().lameSz) || 3); } // vẽ lại ngay (nét mặt, dáng nhún), không cần nạp lại
async function drawPreview() {
  const cv = $('#lamePrev'); if (!cv) return;
  await load(); const eq = passport.getEq(); paintGrid(cv, L.lameGrid(eq, items), 5);
  const worn = L.SLOTS.map(s => eq[s] && items[eq[s]] && name(items[eq[s]])).filter(Boolean);
  $('#lameSum').textContent = worn.length ? worn.join(' · ') : t('Lame chưa mặc hay cầm gì đặc biệt.', 'Lame has nothing special equipped yet.');
}
async function drawSlots() {
  const box = $('#lameSlots'); if (!box) return;
  await load(); const eq = passport.getEq(), own = new Set(passport.ownedIds());
  box.innerHTML = '';
  for (const s of L.SLOTS) {
    const opts = Object.values(items).filter(i => own.has(i.id) && L.slotOf(i) === s);
    const row = document.createElement('div'); row.className = 'uirow';
    row.innerHTML = `<span>${LABEL[s][uiLang === 'vi' ? 0 : 1]}</span>`;
    const sel = document.createElement('select'); sel.dataset.slot = s;
    sel.innerHTML = `<option value="">${t('— không —', '— none —')}</option>` + opts.map(i => `<option value="${i.id}" ${eq[s] === i.id ? 'selected' : ''}>${name(i).replace(/</g, '&lt;')}</option>`).join('');
    sel.disabled = !opts.length; if (!opts.length) sel.title = t('Chưa mua thẻ nào thuộc loại này', 'No card of this kind bought yet');
    row.append(sel); box.append(row);
  }
}
async function redrawAll() { await Promise.all([refresh(), drawPreview().catch(() => {}), drawSlots().catch(() => {})]); }

export function init() {
  edge = document.createElement('canvas'); edge.id = 'lameEdge'; edge.hidden = true; edge.setAttribute('role', 'button'); edge.setAttribute('aria-label', 'Lame');
  edge.addEventListener('click', () => { fx.play('greet'); setTimeout(() => bus.emit('nav', 'passport'), 550); }); // chào một cái rồi mới sang Passport
  document.body.append(edge);
  fx.init({ edge, repaint: paintNow, eq: () => passport.getEq(), items: () => items });
  bus.on('show', () => refresh());
  bus.on('lame', () => redrawAll());
  bus.on('settingsOpen', () => { drawPreview().catch(() => {}); drawSlots().catch(() => {}); });
  bus.on('ui', () => refresh()); // đổi cỡ / bật tắt trong Cài đặt
  $('#lameSlots')?.addEventListener('change', e => {
    const sel = e.target.closest('select[data-slot]'); if (!sel) return;
    const eq = passport.getEq(); if (sel.value) eq[sel.dataset.slot] = sel.value; else delete eq[sel.dataset.slot];
    passport.setEq(eq);
  });
  setTimeout(refresh, 800);
}
