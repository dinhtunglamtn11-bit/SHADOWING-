// Sửa phụ đề ngay trong danh sách câu bên phải khung học: nút 📖 (đọc) / ✏️ (sửa) ở đầu cột.
// Ở chế độ sửa mỗi câu là một thẻ: giờ bắt đầu / kết thúc, 3 dòng chữ (gốc, phiên âm, nghĩa); gõ tới đâu tự lưu tới đó.
import { $, toast, langInfo, fmt } from './util.js';
import { currentCues, currentLang, setEditMode, isEditing, editCue, replaceCues, videoCueTime, playCue } from './player.js';

// gõ “14.5”, “0:14.5” hoặc “1:05” đều được
function parseT(s) {
  s = String(s).trim().replace(',', '.');
  if (!s) return NaN;
  if (s.includes(':')) { const p = s.split(':').map(Number); return p.some(x => !Number.isFinite(x)) ? NaN : p.reduce((a, x) => a * 60 + x, 0); }
  return parseFloat(s);
}

function focusCard(list, i) {
  const el = list.querySelector(`.cue.ed[data-i="${i}"]`);
  el?.scrollIntoView({ block: 'center' });
  el?.querySelector('[data-f=l1]')?.focus();
}

function act(list, what, i) {
  const cues = currentCues(), words = langInfo(currentLang()).words;
  const fresh = (start, lines = ['']) => ({ start: +start.toFixed(2), end: +(start + 2).toFixed(2), lines });
  if (what === 'play') { if (cues[i]) playCue(i); return; }
  if (what === 'del') {
    if (!confirm('Xóa câu này?')) return;
    replaceCues(cues.filter((_, k) => k !== i));
    return;
  }
  if (what === 'add' || what === 'addlast') {
    const at = what === 'add' ? i : cues.length - 1, base = cues[at], start = base ? (+base.end || 0) + 0.1 : videoCueTime();
    const next = [...cues.slice(0, at + 1), fresh(start), ...cues.slice(at + 1)];
    replaceCues(next); focusCard(list, at + 1);
    return;
  }
  if (what === 'merge') {
    if (i <= 0) { toast('Đây là câu đầu tiên'); return; }
    const p = cues[i - 1], r = cues[i], join = (a, b) => [a, b].filter(Boolean).join(' ');
    const lines = [0, 1, 2].map(k => (k === 0 && !words ? (p.lines[0] || '') + (r.lines[0] || '') : join(p.lines[k] || '', r.lines[k] || '')));
    while (lines.length > 1 && !lines[lines.length - 1]) lines.pop();
    const merged = { start: p.start, end: r.end, lines: [...lines, ...(p.lines.slice(3) || [])] };
    replaceCues([...cues.slice(0, i - 1), merged, ...cues.slice(i + 1)]); focusCard(list, i - 1);
  }
}

export function init() {
  const list = $('#cueList');
  list.addEventListener('click', e => {
    const m = e.target.closest('[data-cm]');
    if (m) { setEditMode(m.dataset.cm === 'edit'); return; }
    if (!isEditing()) return;
    const card = e.target.closest('.cue.ed'), i = card ? +card.dataset.i : -1;
    const tk = e.target.closest('[data-tk]');
    if (tk && card) { // lấy giờ hiện tại của video làm giờ bắt đầu / kết thúc (dùng để tự canh giờ cho video YouTube)
      const f = tk.dataset.tk, t = videoCueTime();
      if (editCue(i, f, t)) card.querySelector(`[data-f=${f}]`).value = fmt(currentCues()[i][f]);
      return;
    }
    const ea = e.target.closest('[data-ea]');
    if (ea) act(list, ea.dataset.ea, i);
  });
  // chữ: lưu theo từng phím; giờ: kiểm tra rồi lưu khi rời ô
  list.addEventListener('input', e => {
    const card = e.target.closest('.cue.ed'), f = e.target.dataset?.f;
    if (!isEditing() || !card || !f || f === 'start' || f === 'end') return;
    editCue(+card.dataset.i, f, e.target.value);
  });
  list.addEventListener('change', e => {
    const card = e.target.closest('.cue.ed'), f = e.target.dataset?.f;
    if (!isEditing() || !card || (f !== 'start' && f !== 'end')) return;
    const i = +card.dataset.i, c = currentCues()[i], v = parseT(e.target.value);
    const back = () => { e.target.value = fmt(c[f]); };
    if (!Number.isFinite(v) || v < 0) { toast('Giờ không hợp lệ: gõ số giây (14.5) hoặc phút:giây (0:14.5)'); back(); return; }
    if (f === 'end' && v <= c.start) { toast('Giờ kết thúc phải sau giờ bắt đầu'); back(); return; }
    const dur = Math.max(0.5, c.end - c.start);
    editCue(i, f, v);
    if (f === 'start' && c.end <= v) { editCue(i, 'end', v + dur); card.querySelector('[data-f=end]').value = fmt(c.end); } // dời giờ bắt đầu qua giờ kết thúc: giữ nguyên độ dài câu
    e.target.value = fmt(c[f]);
  });
}
