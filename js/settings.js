// Cài đặt: ngôn ngữ giao diện + tùy biến diện mạo (lưu riêng từng máy trong localStorage 'ui') + vài mục học tập (đồng bộ qua prefs).
import { $, $$, toast, bus } from './util.js';
import { prefs, savePrefs } from './prefs.js';
import { uiLang } from './i18n.js';
import { pix } from './pixicons.js';
import { getBk, setBk, checkReminder } from './backup.js';
import * as sfx from './sfx.js';

export const UI_DEFAULTS = { lang: 'vi', theme: 'day', pal: 'candy', px: '3', corner: 'notch', font: 'pixel', icons: 'pixel', bg: 'check', motion: 'on', zoom: '100', sub: '100', hl: 'yellow' };

export function getUi() {
  try { return { ...UI_DEFAULTS, ...JSON.parse(localStorage.getItem('ui') || '{}') }; } catch { return { ...UI_DEFAULTS }; }
}
function saveUi(u) { try { localStorage.setItem('ui', JSON.stringify(u)); } catch {} }
const resolveTheme = t => (t === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day') : t);

// Đặt các thuộc tính data-* và biến CSS lên <html>
export function applyUi(u = getUi()) {
  const d = document.documentElement;
  for (const k of ['pal', 'px', 'corner', 'font', 'icons', 'bg', 'motion', 'hl']) d.dataset[k] = u[k];
  const theme = resolveTheme(u.theme);
  d.dataset.theme = theme;
  d.style.zoom = +u.zoom === 100 ? '' : String(u.zoom / 100); // cỡ chữ giao diện (zoom của trình duyệt)
  d.style.setProperty('--zf', String(u.zoom / 100)); // hệ số bù cho đơn vị vh/vw trong CSS
  d.style.setProperty('--sub', String(u.sub / 100));
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'night' ? '#1c1a3d' : '#b8723f');
  $('#btnTheme').innerHTML = `<span class="pxe">${pix(theme === 'night' ? 'sun' : 'moon')}</span>`;
}

function markSegs(u) {
  const bk = getBk();
  const cur = { ...u, sfx: prefs.sfx ? '1' : '0', sfxKind: prefs.sfxKind || 'soft', ttsRate: String(prefs.ttsRate || 0.9), lang: uiLang, bk: String(bk.days), srs: prefs.srs || 'fsrs', retention: String(prefs.retention || 0.9), rate: String(prefs.rate || 1) };
  $('#bkLast').textContent = bk.last ? 'Lần sao lưu gần nhất: ' + new Date(bk.last).toLocaleDateString('vi-VN') : 'Chưa sao lưu lần nào trên máy này.';
  $$('#uiDlg .uiseg').forEach(sg => $$('button', sg).forEach(b => b.classList.toggle('on', String(cur[sg.dataset.k]) === b.dataset.v)));
  $('#uiGoal').value = prefs.goalMin || 15;
  $('#uiNew').value = prefs.newPerDay || 10;
  $('#sfxVol').value = Math.round((prefs.sfxVol ?? 0.6) * 100);
}

export function init() {
  applyUi();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { if (getUi().theme === 'auto') applyUi(); });
  // nút đổi nhanh ngày/đêm ở đầu trang
  $('#btnTheme').onclick = () => {
    const u = getUi();
    u.theme = document.documentElement.dataset.theme === 'night' ? 'day' : 'night';
    saveUi(u); applyUi(u);
  };
  const dlg = $('#uiDlg');
  $('#btnSettings').onclick = () => { markSegs(getUi()); dlg.showModal(); };
  $('#uiClose').onclick = () => dlg.close();
  dlg.addEventListener('click', e => {
    if (e.target === dlg) { dlg.close(); return; }
    const b = e.target.closest('.uiseg button');
    if (!b) return;
    const k = b.parentElement.dataset.k, v = b.dataset.v;
    if (k === 'ttsRate') { prefs.ttsRate = parseFloat(v); savePrefs(); bus.emit('prefs'); markSegs(getUi()); return; }
    if (k === 'rate') { prefs.rate = parseFloat(v); savePrefs(); bus.emit('prefs'); markSegs(getUi()); return; }
    if (k === 'sfx' || k === 'sfxKind') { // âm thanh nút bấm (đồng bộ qua prefs)
      prefs[k] = k === 'sfx' ? +v : v; savePrefs(); bus.emit('prefs'); markSegs(getUi());
      if (prefs.sfx) sfx.play('ok');
      return;
    }
    if (k === 'srs' || k === 'retention') { prefs[k] = k === 'srs' ? v : parseFloat(v); savePrefs(); bus.emit('prefs'); markSegs(getUi()); return; }
    if (k === 'bk') { setBk({ days: +v, snooze: 0 }); checkReminder(); markSegs(getUi()); return; }
    const u = getUi();
    if (u[k] === v) return;
    u[k] = v; saveUi(u);
    if (k === 'lang') { toast('Đang đổi ngôn ngữ…'); setTimeout(() => location.reload(), 300); return; }
    applyUi(u); markSegs(u);
  });
  // thanh âm lượng: kéo tới đâu lưu tới đó, thả tay thì kêu thử một tiếng
  $('#sfxVol').oninput = e => { prefs.sfxVol = (+e.target.value || 0) / 100; };
  $('#sfxVol').onchange = () => { savePrefs(); bus.emit('prefs'); sfx.play('tap', true); };
  $('#sfxTest').onclick = () => { sfx.play('tap', true); setTimeout(() => sfx.play('ok', true), 220); };
  $('#uiGoal').onchange = e => { prefs.goalMin = Math.max(1, Math.min(600, +e.target.value || 15)); savePrefs(); bus.emit('prefs'); };
  $('#uiNew').onchange = e => { prefs.newPerDay = Math.max(1, Math.min(200, +e.target.value || 10)); savePrefs(); bus.emit('prefs'); };
  $('#uiReset').onclick = () => {
    const u = { ...UI_DEFAULTS, lang: getUi().lang };
    saveUi(u); applyUi(u); markSegs(u); toast('Đã đặt lại giao diện');
  };
  bus.on('prefs', () => { if (dlg.open) markSegs(getUi()); });
}
