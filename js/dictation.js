// Nghe chép chính tả: phát từng câu (ẩn chữ), bạn gõ lại, app so sánh và chấm điểm.
//  - Tiếng Anh: so theo từng từ (bỏ qua hoa/thường và dấu câu).
//  - Tiếng Trung / Nhật / Hàn: so theo từng ký tự (bỏ qua dấu câu và khoảng trắng).
//  - Có thể chép theo "phiên âm" (dòng 2 của phụ đề) và bỏ qua dấu thanh/dấu giọng.
import { $, esc, toast, bus, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { addCueCard } from './cards.js';
import { zhText } from './prefs.js';
import { currentCues, currentItemId, currentLang, setDictMode, setDictIndex, playCueOnce, refreshList } from './player.js';

// ---------- so sánh ----------
const LETTER = /[\p{L}\p{N}]/u;

export function itemsOf(text, { words, pron, ignoreTone }) {
  const strip = s => (pron && ignoreTone ? s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/v/g, 'u').replace(/đ/g, 'd') : s);
  if (words) {
    return text.split(/(\s+)/).filter(x => x !== '').map(p => ({
      s: p,
      k: /^\s+$/.test(p) ? '' : p.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/[^\p{L}\p{N}']/gu, '').replace(/^'+|'+$/g, ''),
    }));
  }
  return [...text].map(ch => {
    const n = strip(ch.normalize('NFKC').toLowerCase());
    return { s: ch, k: LETTER.test(n) ? n : '' };
  });
}

// ref: đáp án, typed: bài của bạn. Trả về điểm 0..100 và hai chuỗi đã đánh dấu đúng/sai.
export const compare = (ref, typed, opt) => compareItems(itemsOf(ref, opt), itemsOf(typed, opt));

// A, B: danh sách {s: chữ hiển thị, k: khóa so sánh ('' = bỏ qua, ví dụ dấu câu}
export function compareItems(A, B) {
  const a = A.filter(x => x.k), b = B.filter(x => x.k);
  const n = a.length, m = b.length;
  const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    L[i][j] = a[i].k === b[j].k ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i].k === b[j].k) { a[i].m = b[j].m = true; i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
  }
  const score = !n ? (m ? 0 : 100) : Math.round(100 * L[0][0] / Math.max(n, m));
  const html = (items, bad) => items.map(x => (x.k ? `<span class="${x.m ? 'ok' : bad}">${esc(x.s)}</span>` : esc(x.s))).join('');
  return { score, typedHTML: html(B, 'bad'), refHTML: html(A, 'miss'), refCount: n, typedCount: m, matched: L[0][0] };
}

// ---------- giao diện ----------
let on = false, idx = 0, checked = false, hints = 0;
const counted = new Set();

const cues = () => currentCues();
const wordsMode = () => langInfo(currentLang()).words;
const target = () => ($('#dTarget').value === 'pron' && cues()[idx]?.lines[1] ? 'pron' : 'orig');
const refText = () => { const c = cues()[idx]; return target() === 'pron' ? c.lines[1] : c.lines[0]; };
const opts = () => ({ words: wordsMode() && target() === 'orig', pron: target() === 'pron', ignoreTone: $('#dTone').checked });

function scores() { const it = store.get('items', currentItemId()); return (it && it.dict) || {}; }

function header() {
  const sc = scores(), done = Object.keys(sc).length, total = cues().length;
  const avg = done ? Math.round(Object.values(sc).reduce((s, v) => s + v, 0) / done) : 0;
  $('#dNum').textContent = `Câu ${idx + 1}/${total}`;
  $('#dSum').textContent = done ? `Đã chép ${done}/${total} câu · điểm trung bình ${avg}%` : 'Chưa chép câu nào';
}

function load(i) {
  const n = cues().length;
  if (i < 0 || i >= n) { if (i >= n) finish(); return; }
  idx = i; checked = false; hints = 0;
  $('#dText').value = ''; $('#dText').lang = langInfo(currentLang()).bcp;
  $('#dHint').textContent = ''; $('#dResult').hidden = true;
  $('#dCheck').textContent = '✔ Kiểm tra'; $('#dNext').hidden = true;
  const hasPron = !!cues()[i].lines[1];
  $('#dTargetRow').hidden = !hasPron;
  if (!hasPron) $('#dTarget').value = 'orig';
  $('#dToneRow').hidden = target() !== 'pron';
  header(); setDictIndex(i);
  replay(false);
  $('#dText').focus();
}

function replay(slow) {
  if (!on) return;
  playCueOnce(idx, slow ? 0.6 : parseFloat($('#dRate').value) || 1);
}

function check() {
  if (checked) { load(idx + 1); return; }
  const typed = zhText($('#dText').value, currentLang()); // gõ phồn thể vẫn tính là đúng
  if (!typed.trim()) { toast('Hãy gõ những gì bạn nghe được rồi mới kiểm tra'); return; }
  const c = cues()[idx], r = compare(zhText(refText(), currentLang()), typed, opts());
  checked = true;
  const sc = { ...scores() }; sc[idx] = Math.max(sc[idx] ?? 0, r.score);
  store.put('items', currentItemId(), { dict: sc });
  const key = currentItemId() + ':' + idx;
  if (!counted.has(key)) { counted.add(key); tracker.dictation(); }
  if (r.score < 60 && addCueCard(currentItemId(), idx, { weak: true })) toast('Câu này còn yếu, đã vào sổ ôn 📒');
  const others = c.lines.filter((_, k) => (target() === 'pron' ? k !== 1 : k !== 0)).map(l => `<div class="dim">${esc(l)}</div>`).join('');
  $('#dResult').hidden = false;
  $('#dResult').innerHTML =
    `<div class="score ${r.score >= 90 ? 'ok' : r.score >= 60 ? 'miss' : 'bad'}">${r.score}%${r.score === 100 ? ' 🎉 Chính xác!' : ''}</div>` +
    `<div class="dim">Bài của bạn</div><div class="line" lang="${langInfo(currentLang()).bcp}">${r.typedHTML}</div>` +
    `<div class="dim">Đáp án${target() === 'pron' ? ' (phiên âm)' : ''}</div><div class="line" lang="${langInfo(currentLang()).bcp}">${r.refHTML}</div>` + others +
    `<div class="dim" style="margin-top:4px"><span class="ok">xanh</span> đúng · <span class="bad">đỏ</span> sai/thừa · <span class="miss">cam</span> thiếu hoặc nghe sai</div>`;
  $('#dCheck').textContent = '↻ Làm lại';
  $('#dNext').hidden = false;
  header(); refreshList();
  setDictIndex(idx);
}

function hint() {
  if (!on) return;
  const items = itemsOf(refText(), opts());
  hints++;
  let shown = 0, out = '';
  for (const x of items) { if (x.k) { if (shown >= hints) break; shown++; } out += x.s; }
  $('#dHint').textContent = '💡 ' + out + (shown < items.filter(x => x.k).length ? ' …' : '');
}

function finish() {
  const sc = scores(), v = Object.values(sc), avg = v.length ? Math.round(v.reduce((s, x) => s + x, 0) / v.length) : 0;
  toast(`Hết bài! Điểm trung bình ${avg}% (${v.length}/${cues().length} câu)`, 5000);
}

function enter() {
  if (!currentItemId() || !cues().length) { toast('Hãy mở video có phụ đề trước'); return; }
  bus.emit('exitSpeak');
  on = true; setDictMode(true);
  $('#dictPanel').hidden = false; $('#btnDict').textContent = '↩ Thoát chép';
  const sc = scores(); let start = cues().findIndex((_, i) => sc[i] == null); if (start < 0) start = 0;
  load(start);
}
function exit() {
  on = false; setDictMode(false);
  $('#dictPanel').hidden = true; $('#btnDict').textContent = '✍️ Chép chính tả';
}

export function init() {
  $('#btnDict').onclick = () => (on ? exit() : enter());
  $('#dReplay').onclick = () => replay(false);
  $('#dSlow').onclick = () => replay(true);
  $('#dHintBtn').onclick = hint;
  $('#dCheck').onclick = () => (checked ? load(idx) : check());
  $('#dNext').onclick = () => load(idx + 1);
  $('#dPrev').onclick = () => load(idx - 1);
  $('#dTarget').onchange = () => { $('#dToneRow').hidden = target() !== 'pron'; if (checked) { checked = false; check(); } };
  $('#dTone').onchange = () => { if (checked) { checked = false; check(); } };
  $('#dText').addEventListener('keydown', e => {
    if (e.isComposing) return; // đang gõ bằng bộ gõ (pinyin, kana…): không bắt phím Enter
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check(); }
    else if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); replay(false); }
  });
  $('#dText').addEventListener('keydown', e => { if (e.ctrlKey && e.key === ' ') { e.preventDefault(); replay(false); } });
  bus.on('exitDict', () => { if (on) exit(); });
  bus.on('dictGo', i => { if (on) load(i); });
  bus.on('dictExit', () => { on = false; $('#dictPanel').hidden = true; $('#btnDict').textContent = '✍️ Chép chính tả'; });
}
