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
// ---------- câu thoại tự thêm ----------
const WHEN = [['tap', 'Chạm vào Lame', 'Tap on Lame'], ['idle', 'Chạm khi hôm nay chưa học', 'Tap before studying today'], ['ok', 'Làm đúng', 'Right answer'], ['bad', 'Làm sai', 'Wrong answer'], ['cheer', 'Đạt điểm cao', 'High score'], ['buy', 'Mua thẻ', 'Buying a card'], ['coin', 'Nhận xu', 'Getting coins'], ['chest', 'Mở rương', 'Opening a chest']];
const whenName = k => { const w = WHEN.find(x => x[0] === k) || WHEN[0]; return t(w[1], w[2]); };
const hourOpts = (from, to, sel) => Array.from({ length: to - from + 1 }, (_, i) => `<option value="${from + i}" ${from + i === sel ? 'selected' : ''}>${from + i} ${t('giờ', 'h')}</option>`).join('');
const timeText = x => (x.from === x.to || (x.from === 0 && x.to === 24) ? t('cả ngày', 'all day') : `${x.from}–${x.to} ${t('giờ', 'h')}`);
function drawSay() {
  const box = $('#lameSay'); if (!box) return;
  if (!box.firstElementChild) {
    box.innerHTML = `<h4>${t('Câu thoại của bạn', 'Your own lines')}</h4>
      <div class="uirow"><span>${t('Câu nói', 'Line')}</span><input id="lsText" type="text" maxlength="80" placeholder="${t('Ví dụ: Uống nước đê', 'e.g. Drink some water')}"></div>
      <div class="uirow"><span>${t('Tình huống', 'When')}</span><select id="lsWhen">${WHEN.map(([k]) => `<option value="${k}">${whenName(k)}</option>`).join('')}</select></div>
      <div class="uirow"><span>${t('Khung giờ', 'Hours')}</span><span class="lsHours"><label>${t('từ', 'from')} <select id="lsFrom">${hourOpts(0, 23, 0)}</select></label> <label>${t('đến', 'to')} <select id="lsTo">${hourOpts(1, 24, 24)}</select></label></span></div>
      <div class="uirow"><small class="dim">${t('0 đến 24 giờ là cả ngày. Chọn 22 đến 5 nếu muốn qua nửa đêm.', '0 to 24 means all day. Pick 22 to 5 to span midnight.')}</small><button class="btn primary" id="lsAdd">${t('＋ Thêm câu', '＋ Add line')}</button></div>
      <div id="lsList"></div>`;
  }
  const list = $('#lsList', box); list.innerHTML = '';
  const all = fx.sayList();
  if (!all.length) { list.innerHTML = `<small class="dim">${t('Chưa có câu nào bạn tự thêm. Các câu có sẵn của Lame vẫn dùng bình thường.', 'No custom lines yet. Lame’s built-in lines still work.')}</small>`; return; }
  for (const x of all) {
    const row = document.createElement('div'); row.className = 'lsItem';
    row.innerHTML = `<div><b></b><small class="dim">${whenName(x.when)} · ${timeText(x)}</small></div><button class="btn" data-lsdel="${x.id}" aria-label="${t('Xóa', 'Delete')}">🗑</button>`;
    row.querySelector('b').textContent = x.text; list.append(row);
  }
}
function sayClick(e) {
  const del = e.target.closest('[data-lsdel]');
  if (del) { fx.sayPut(fx.sayList().filter(x => String(x.id) !== del.dataset.lsdel)); drawSay(); return; }
  if (!e.target.closest('#lsAdd')) return;
  const input = $('#lsText'), text = input.value.trim();
  if (!text) { input.focus(); return; }
  const all = fx.sayList(); if (all.length >= 100) return;
  fx.sayPut([...all, { id: Date.now(), text, when: $('#lsWhen').value, from: +$('#lsFrom').value, to: +$('#lsTo').value }]);
  input.value = ''; drawSay(); input.focus();
}
async function redrawAll() { await Promise.all([refresh(), drawPreview().catch(() => {}), drawSlots().catch(() => {})]); }

export function init() {
  edge = document.createElement('canvas'); edge.id = 'lameEdge'; edge.hidden = true; edge.setAttribute('role', 'button'); edge.setAttribute('aria-label', 'Lame');
  edge.addEventListener('click', () => fx.tap()); // chạm vào chỉ có biểu cảm, động tác và câu thoại (vào Passport bằng thanh điều hướng)
  document.body.append(edge);
  fx.init({ edge, repaint: paintNow, eq: () => passport.getEq(), items: () => items });
  bus.on('show', () => refresh());
  bus.on('lame', () => redrawAll());
  bus.on('settingsOpen', () => { drawPreview().catch(() => {}); drawSlots().catch(() => {}); drawSay(); });
  $('#lameSay')?.addEventListener('click', sayClick);
  $('#lameSay')?.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'lsText') { e.preventDefault(); $('#lsAdd').click(); } });
  bus.on('ui', () => refresh()); // đổi cỡ / bật tắt trong Cài đặt
  $('#lameSlots')?.addEventListener('change', e => {
    const sel = e.target.closest('select[data-slot]'); if (!sel) return;
    const eq = passport.getEq(); if (sel.value) eq[sel.dataset.slot] = sel.value; else delete eq[sel.dataset.slot];
    passport.setEq(eq);
  });
  setTimeout(refresh, 800);
}
