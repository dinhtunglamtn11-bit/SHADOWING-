// Sao lưu và khôi phục dữ liệu (phụ đề, thẻ, bài tập, tiến độ…). File video/PDF/âm thanh không nằm trong bản sao lưu.
import { $, toast, fmtMB, vnDate, loadSimplifier } from './util.js';
import * as store from './store.js';
import { prefs, savePrefs, zhText } from './prefs.js';
import * as cards from './cards.js';

function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

function summary(data) {
  return Object.entries(data).map(([c, list]) => `${c}: ${list.filter(d => !d.deleted).length}`).join(' · ');
}

// Chuyển mọi dữ liệu tiếng Trung đã lưu sang chữ giản thể (phụ đề, ghi chú, thẻ, bộ bài tập, danh sách chữ viết)
async function convertAllZh() {
  await loadSimplifier();
  const z = s => zhText(s, 'zh');
  let n = 0;
  for (const it of store.list('items')) {
    if ((it.lang || 'zh') !== 'zh') continue;
    const patch = {};
    if (it.title && z(it.title) !== it.title) patch.title = z(it.title);
    if (it.type === 'video' && it.cues) {
      try {
        const cs = JSON.parse(it.cues); let ch = false;
        for (const c of cs) {
          const nl = c.lines.map(z);
          if (nl.some((l, i) => l !== c.lines[i])) {
            if (c.t && [...nl[0]].length !== [...c.lines[0]].length) delete c.t; // số chữ đổi thì giờ từng từ không còn khớp
            c.lines = nl; ch = true;
          }
        }
        if (ch) patch.cues = JSON.stringify(cs);
      } catch { /* bỏ qua phụ đề hỏng */ }
    }
    if (it.type === 'note' && it.body && z(it.body) !== it.body) patch.body = z(it.body);
    if (Object.keys(patch).length) { store.put('items', it.id, patch); n++; }
  }
  for (const c of cards.allCards('zh')) {
    const front = z(c.front), back = (c.back || []).map(z);
    if (front !== c.front || back.some((b, i) => b !== c.back[i])) { store.put('cards', c.id, { front, back }); n++; }
  }
  for (const s of store.list('sets')) {
    if ((s.lang || 'zh') !== 'zh') continue;
    const text = z(s.text || ''), title = z(s.title || '');
    if (text !== s.text || title !== s.title) { store.put('sets', s.id, { text, title }); n++; }
  }
  try { const k = 'hw:list:zh', t = localStorage.getItem(k); if (t && z(t) !== t) { localStorage.setItem(k, z(t)); n++; } } catch { /* bỏ qua */ }
  return n;
}

// ---------- sao lưu + nhắc sao lưu (mỗi máy một cài đặt) ----------
const DAY = 864e5;
export function getBk() {
  let o = {}; try { o = JSON.parse(localStorage.getItem('bk') || '{}'); } catch { /* mặc định */ }
  return { days: 7, last: 0, first: 0, snooze: 0, ...o }; // days = 0: tắt nhắc
}
export function setBk(patch) { try { localStorage.setItem('bk', JSON.stringify({ ...getBk(), ...patch })); } catch { /* bỏ qua */ } }

export function exportBackup() {
  const d = store.dump();
  download(`shadowing-backup-${vnDate()}.json`, JSON.stringify({ app: 'shadowing', version: 1, exported: new Date().toISOString(), data: d }), 'application/json');
  setBk({ last: Date.now(), snooze: 0 });
  $('#bkBar').hidden = true;
  toast('Đã tạo file sao lưu');
}

function hasData() { return store.list('items').length + store.list('cards').length + store.list('sets').length > 0; }

export function checkReminder() {
  const b = getBk(), bar = $('#bkBar');
  if (!b.first) { setBk({ first: Date.now() }); bar.hidden = true; return; }
  const since = Date.now() - Math.max(b.last, b.first);
  if (!b.days || since < b.days * DAY || Date.now() < b.snooze || !hasData()) { bar.hidden = true; return; }
  const n = Math.floor(since / DAY);
  bar.hidden = false;
  bar.innerHTML = `🔔 Đã ${n} ngày chưa sao lưu dữ liệu. <button class="btn" id="bkNow">💾 Sao lưu ngay</button> <button class="btn" id="bkLater">Để sau</button> <button class="btn" id="bkOff">Tắt nhắc</button>`;
  $('#bkNow').onclick = exportBackup;
  $('#bkLater').onclick = () => { setBk({ snooze: Date.now() + 2 * DAY }); bar.hidden = true; };
  $('#bkOff').onclick = () => { setBk({ days: 0 }); bar.hidden = true; toast('Đã tắt nhắc sao lưu (bật lại trong ⚙ Cài đặt)'); };
}

export function init() {
  $('#simpOnly').onchange = e => { prefs.simpOnly = e.target.checked; savePrefs(); toast(prefs.simpOnly ? 'Chữ Trung sẽ luôn là giản thể' : 'Đã tắt tự chuyển giản thể'); };
  $('#dataSimp').onclick = async () => {
    if (!confirm('Chuyển toàn bộ dữ liệu tiếng Trung đã lưu (phụ đề, ghi chú, thẻ, bộ bài tập) sang chữ giản thể?\nBạn nên tạo file sao lưu trước.')) return;
    $('#dataSimp').disabled = true;
    const n = await convertAllZh();
    $('#dataSimp').disabled = false;
    toast(n ? `Đã chuyển ${n} mục sang giản thể ✓` : 'Dữ liệu đã là giản thể hết rồi', 4000);
  };
  $('#btnData').onclick = async () => {
    $('#simpOnly').checked = !!prefs.simpOnly;
    const d = store.dump();
    $('#dataInfo').textContent = 'Trong máy này: ' + summary(d);
    const u = await store.usage();
    $('#dataUsage').textContent = u ? `Bộ nhớ app đang dùng ${fmtMB(u.used)} (gồm video/PDF/âm thanh đã lưu trong máy này).` : '';
    $('#dataDlg').showModal();
  };
  $('#dataClose').onclick = () => $('#dataDlg').close();
  $('#dataExport').onclick = exportBackup;
  checkReminder();
  setInterval(checkReminder, 6 * 3600e3);
  $('#dataImport').onclick = () => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
    i.onchange = async () => {
      const f = i.files[0]; if (!f) return;
      try {
        const j = JSON.parse(await f.text());
        if (j.app !== 'shadowing' || !j.data) throw new Error('không phải file sao lưu của app này');
        let n = 0, skip = 0;
        for (const [c, list] of Object.entries(j.data)) for (const d of list) { if (store.restore(c, d.id, d)) n++; else skip++; }
        toast(`Đã khôi phục ${n} mục${skip ? ` (bỏ qua ${skip} mục đã có bản mới hơn)` : ''}`, 5000);
        $('#dataInfo').textContent = 'Trong máy này: ' + summary(store.dump());
      } catch (e) { toast('Không đọc được file: ' + e.message, 5000); }
    };
    i.click();
  };
}
