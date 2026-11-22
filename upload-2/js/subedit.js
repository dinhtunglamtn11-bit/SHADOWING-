// Sửa phụ đề trong app: sửa chữ và giờ, thêm/xóa/gộp câu, dán hàng loạt dòng phiên âm hoặc nghĩa, xuất file .srt.
import { $, $$, esc, toast, langInfo, tokensOf } from './util.js';
import { currentItemId, currentCues, currentLang, applyCues, playCueOnce } from './player.js';
import { zhText } from './prefs.js';
import * as store from './store.js';

let rows = [];

const toRows = cues => cues.map(c => ({
  start: c.start, end: c.end, l1: c.lines[0] || '', l2: c.lines[1] || '', l3: c.lines[2] || '',
  extra: c.lines.slice(3), t: c.t, orig: c.lines[0] || '',
}));

function rowHTML(r, i) {
  return `<div class="srow" data-i="${i}">
    <div class="sn"><b>${i + 1}</b><button class="btn" data-act="play" title="Nghe câu này">▶</button></div>
    <div class="st"><input type="number" step="0.1" min="0" data-f="start" value="${r.start}" title="Bắt đầu (giây)"><input type="number" step="0.1" min="0" data-f="end" value="${r.end}" title="Kết thúc (giây)"></div>
    <div class="sl">
      <input type="text" data-f="l1" value="${esc(r.l1)}" placeholder="Dòng 1: tiếng gốc" lang="${langInfo(currentLang()).bcp}">
      <input type="text" data-f="l2" value="${esc(r.l2)}" placeholder="Dòng 2: phiên âm">
      <input type="text" data-f="l3" value="${esc(r.l3)}" placeholder="Dòng 3: nghĩa">
    </div>
    <div class="sa"><button class="btn" data-act="merge" title="Gộp với câu trên">⤴</button><button class="btn" data-act="add" title="Thêm câu mới bên dưới">＋</button><button class="btn" data-act="del" title="Xóa câu">🗑</button></div>
  </div>`;
}
function render() {
  $('#subRows').innerHTML = rows.map(rowHTML).join('') || '<div class="empty">Chưa có câu nào. Bấm “＋ Thêm câu”.</div>';
  $('#subCount').textContent = `${rows.length} câu`;
}

const fmtT = s => {
  const ms = Math.round(s * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60, x = ms % 1000;
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(h)}:${p(m)}:${p(sec)},${p(x, 3)}`;
};
export function toSrt(cues) {
  return cues.map((c, i) => {
    const lines = c.lines.slice();
    for (let k = 0; k < lines.length - 1; k++) if (!lines[k]) lines[k] = '–'; // giữ đúng vị trí dòng khi dòng giữa bị trống
    return `${i + 1}\n${fmtT(c.start)} --> ${fmtT(c.end)}\n${lines.join('\n')}\n`;
  }).join('\n');
}

// Gom dữ liệu đang sửa thành danh sách câu hợp lệ
function collect() {
  const words = langInfo(currentLang()).words;
  return rows.filter(r => r.l1.trim()).map(r => {
    let s = +r.start || 0, e = +r.end || s + 2;
    if (e <= s) e = s + 0.5;
    const lines = [r.l1, r.l2, r.l3].map(l => zhText(l.trim(), currentLang()));
    while (lines.length > 1 && !lines[lines.length - 1]) lines.pop();
    const c = { start: +s.toFixed(2), end: +e.toFixed(2), lines: [...lines, ...r.extra] };
    // giữ giờ từng từ nếu chữ gốc không đổi (hoặc đổi nhưng số chữ vẫn như cũ)
    if (r.t && (r.l1.trim() === r.orig.trim() || tokensOf(c.lines[0], words).length === r.t.length)) c.t = r.t;
    return c;
  }).sort((a, b) => a.start - b.start);
}

function bulk() {
  const text = $('#sbText').value.split(/\r?\n/);
  const lines = $('#sbSkip').checked ? text.map(s => s.trim()).filter(Boolean) : text.map(s => s.trim());
  const start = Math.max(1, +$('#sbFrom').value || 1) - 1, f = $('#sbTarget').value;
  if (!lines.length) { toast('Hãy dán nội dung vào ô'); return; }
  let n = 0;
  lines.forEach((ln, k) => { const r = rows[start + k]; if (r && (ln || !$('#sbSkip').checked)) { r[f] = ln; n++; } });
  render();
  $('#bulkDlg').close();
  toast(`Đã gán ${n} dòng vào ${f === 'l2' ? 'dòng phiên âm' : 'dòng nghĩa'}` + (lines.length > rows.length - start ? ` (dán ${lines.length} dòng nhưng chỉ có ${rows.length - start} câu từ vị trí này)` : ''), 5000);
}

export function init() {
  $('#btnSubEdit').onclick = () => {
    if (!currentItemId()) { toast('Hãy mở một video trước'); return; }
    rows = toRows(currentCues());
    if (!rows.length) rows = [{ start: 0, end: 2, l1: '', l2: '', l3: '', extra: [], t: null, orig: '' }];
    render();
    $('#subDlg').showModal();
  };
  $('#subClose').onclick = () => $('#subDlg').close();
  $('#subSave').onclick = () => {
    const cues = collect();
    if (!cues.length) { toast('Chưa có câu nào có chữ để lưu'); return; }
    applyCues(cues);
    $('#subDlg').close();
    toast(`Đã lưu ${cues.length} câu phụ đề ✓`);
  };
  $('#subAdd').onclick = () => {
    const last = rows[rows.length - 1], s = last ? last.end + 0.2 : 0;
    rows.push({ start: +s.toFixed(2), end: +(s + 2).toFixed(2), l1: '', l2: '', l3: '', extra: [], t: null, orig: '' });
    render(); $('#subRows').lastElementChild?.scrollIntoView({ block: 'center' });
  };
  $('#subExport').onclick = () => {
    const cues = collect();
    if (!cues.length) { toast('Chưa có phụ đề để xuất'); return; }
    const it = store.get('items', currentItemId());
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + toSrt(cues)], { type: 'text/plain;charset=utf-8' }));
    a.download = ((it && it.title) || 'phu-de') + '.srt';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  };
  $('#subBulk').onclick = () => { $('#sbText').value = ''; $('#sbFrom').value = 1; $('#bulkDlg').showModal(); };
  $('#sbClose').onclick = () => $('#bulkDlg').close();
  $('#sbApply').onclick = bulk;

  const box = $('#subRows');
  box.addEventListener('input', e => {
    const row = e.target.closest('.srow'), f = e.target.dataset.f;
    if (row && f) rows[+row.dataset.i][f] = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
  });
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'), row = e.target.closest('.srow');
    if (!b || !row) return;
    const i = +row.dataset.i, r = rows[i], words = langInfo(currentLang()).words;
    if (b.dataset.act === 'play') {
      const src = collect().find(c => Math.abs(c.start - r.start) < 0.01);
      if (!src) { toast('Câu này chưa có chữ'); return; }
      $('#subDlg').close(); // phát ở trình học rồi mở lại để sửa tiếp
      const idx = currentCues().findIndex(c => Math.abs(c.start - r.start) < 0.01);
      if (idx >= 0) playCueOnce(idx, 1, () => $('#subDlg').showModal()); else { toast('Hãy bấm Lưu trước khi nghe câu mới'); $('#subDlg').showModal(); }
    } else if (b.dataset.act === 'del') {
      rows.splice(i, 1); render();
    } else if (b.dataset.act === 'add') {
      const s = r.end + 0.1;
      rows.splice(i + 1, 0, { start: +s.toFixed(2), end: +(s + 2).toFixed(2), l1: '', l2: '', l3: '', extra: [], t: null, orig: '' }); render();
    } else if (b.dataset.act === 'merge') {
      if (i === 0) { toast('Đây là câu đầu tiên'); return; }
      const p = rows[i - 1], j = (a, b2) => [a, b2].filter(Boolean).join(' ');
      p.l1 = words ? j(p.l1, r.l1) : p.l1 + r.l1; p.l2 = j(p.l2, r.l2); p.l3 = j(p.l3, r.l3);
      p.end = r.end; p.t = null; rows.splice(i, 1); render();
    }
  });
}
