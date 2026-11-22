// Sao lưu và khôi phục dữ liệu (phụ đề, thẻ, bài tập, tiến độ…). File video/PDF/âm thanh không nằm trong bản sao lưu.
import { $, toast, fmtMB, vnDate, loadSimplifier, bus } from './util.js';
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
  for (const a of store.list('articles')) {
    if ((a.lang || 'zh') !== 'zh') continue;
    const patch = {};
    for (const f of ['title', 'tag', 'source', 'body', 'qtext']) if (a[f] && z(a[f]) !== a[f]) patch[f] = z(a[f]);
    if (Object.keys(patch).length) { store.put('articles', a.id, patch); n++; }
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

// Cài đặt riêng của máy (chỉ nằm trong trình duyệt, không có trong kho đồng bộ): đi kèm file sao lưu, khi khôi phục chỉ điền vào chỗ còn trống
const LOCAL_KEYS = ['ui', 'lang', 'studyNew', 'voices', 'muteAll', 'lookup', 'hw:list:zh', 'readvi', 'tapread', 'achSeen'];
// Bản "tiến độ" nhẹ: chỉ lịch sử học, xu / thẻ Passport / thói quen / Luyện âm (nằm trong prefs), thẻ ôn và câu sai. Không có phụ đề, ghi chú, bộ bài tập.
const LIGHT = ['days', 'prefs', 'cards', 'mistakes'];
// Ba tài liệu tiến độ này tự gộp theo từng phần (thẻ đã mua lấy hợp, xu và mức hoàn thành lấy số lớn hơn…), nên khi khôi phục luôn nhận bản trong file.
// Nếu không, máy mới (đã tự tạo sẵn tài liệu rỗng với giờ mới hơn file) sẽ bỏ qua bản sao lưu và mất hết tiến độ.
const MERGED = { prefs: ['passport', 'habits', 'pylab'] };
function snapshot(light) {
  bus.emit('flush'); // các tính năng ghi dở (Passport, thói quen, Luyện âm) đẩy nốt dữ liệu vào kho trước khi chụp
  const all = store.dump(), data = light ? Object.fromEntries(LIGHT.map(c => [c, all[c]])) : all, local = {};
  for (const k of LOCAL_KEYS) { try { const v = localStorage.getItem(k); if (v != null) local[k] = v; } catch { /* bỏ qua */ } }
  return { app: 'shadowing', version: 2, kind: light ? 'progress' : 'full', exported: new Date().toISOString(), data, local };
}
export function exportBackup(light) {
  light = light === true;
  download(`shadowing-${light ? 'tiendo' : 'backup'}-${vnDate()}.json`, JSON.stringify(snapshot(light)), 'application/json');
  setBk({ last: Date.now(), snooze: 0 });
  $('#bkBar').hidden = true;
  toast(light ? 'Đã tạo file sao lưu tiến độ' : 'Đã tạo file sao lưu');
}
// Mô tả ngắn nội dung một bản sao lưu: tiến độ Passport, số mục
function describe(data) {
  const pp = (data.prefs || []).find(p => p.id === 'passport'), cards = (data.cards || []).filter(c => !c.deleted).length;
  const parts = [];
  if (pp) parts.push(`Passport: ${(pp.own || []).length} thẻ`);
  if ((data.days || []).length) parts.push(`${data.days.length} ngày học`);
  if (cards) parts.push(`${cards} thẻ ôn`);
  const rest = Object.entries(data).filter(([c]) => !['days', 'prefs', 'cards', 'mistakes'].includes(c)).map(([c, l]) => [c, l.filter(d => !d.deleted).length]).filter(([, n]) => n).map(([c, n]) => `${c}: ${n}`);
  return parts.concat(rest).join(' · ') || 'trống';
}

function hasData() { return store.list('items').length + store.list('cards').length + store.list('sets').length + store.list('articles').length > 0; }

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
    const d = store.dump(), pp = store.get('prefs', 'passport');
    $('#dataInfo').textContent = 'Trong máy này: ' + summary(d) + (pp ? ` · Passport: ${(pp.own || []).length} thẻ` : '');
    const u = await store.usage();
    $('#dataUsage').textContent = u ? `Bộ nhớ app đang dùng ${fmtMB(u.used)} (gồm video/PDF/âm thanh đã lưu trong máy này).` : '';
    $('#dataDlg').showModal();
  };
  $('#dataClose').onclick = () => $('#dataDlg').close();
  $('#dataExport').onclick = () => exportBackup(false);
  $('#dataExportLight').onclick = () => exportBackup(true);
  checkReminder();
  setInterval(checkReminder, 6 * 3600e3);
  $('#dataImport').onclick = () => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
    i.onchange = async () => {
      const f = i.files[0]; if (!f) return;
      try {
        const j = JSON.parse(await f.text());
        if (j.app !== 'shadowing' || !j.data) throw new Error('không phải file sao lưu của app này');
        const when = j.exported ? new Date(j.exported).toLocaleString('vi-VN') : 'không rõ ngày';
        if (!confirm(`File sao lưu ${j.kind === 'progress' ? '(chỉ tiến độ) ' : ''}tạo lúc ${when}:\n${describe(j.data)}\n\nKhôi phục vào máy này? (Chỉ ghi đè những mục mới hơn bản đang có.)`)) return;
        let n = 0, skip = 0, setn = 0;
        for (const [c, list] of Object.entries(j.data)) for (const d of list) { const force = (MERGED[c] || []).includes(d.id); if (store.restore(c, d.id, force ? { ...d, u: Date.now() } : d)) n++; else skip++; }
        for (const [k, v] of Object.entries(j.local || {})) { try { if (LOCAL_KEYS.includes(k) && localStorage.getItem(k) == null) { localStorage.setItem(k, v); setn++; } } catch { /* bỏ qua */ } }
        toast(`Đã khôi phục ${n} mục${skip ? ` (bỏ qua ${skip} mục đã có bản mới hơn)` : ''}${setn ? `, ${setn} cài đặt (đang tải lại…)` : ''}`, 5000);
        if (setn) setTimeout(() => location.reload(), 1800);
        $('#dataInfo').textContent = 'Trong máy này: ' + summary(store.dump());
      } catch (e) { toast('Không đọc được file: ' + e.message, 5000); }
    };
    i.click();
  };
}
