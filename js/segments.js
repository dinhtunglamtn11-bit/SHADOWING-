// Chia phụ đề thành các “đoạn” (ví dụ mỗi lượt thoại của một nhân vật).
// File phụ đề thường KHÔNG ghi ai đang nói, nên app đoán theo dấu hiệu có sẵn trong phụ đề:
//  - khoảng nghỉ giữa hai câu (người này nói xong, người kia mới nói);
//  - gạch đầu dòng “- ” / “– ” (quy ước phụ đề cho lời thoại đổi người);
//  - nhãn nhân vật ở đầu câu: “A: …”, “小明：…”, “[Nam] …”, “【女】…”.
// Không có dấu hiệu nào thì chia theo khoảng nghỉ và số câu tối đa mỗi đoạn; bạn chỉnh tay bằng nút ✂ cạnh câu.
import { $, toast } from './util.js';
import { currentCues, currentItemId, getSegs, setSegments, setSegMode, isSegMode } from './player.js';

const DASH = /^\s*[-–—―‐‑﹣－]\s*\S/;
const LABELS = [
  /^\s*[\[【（(]([^\]】）)\n]{1,14})[\]】）)]/,                       // [Nam]  【女】  (A)
  /^\s*([^\s:：,，.。!?！？"'“”‘’「」『』0-9][^\s:：,，.。!?！？"'“”‘’「」『』]{0,9})[:：]\s*\S/, // A:  小明：
];

// Nhãn nhân vật ở đầu câu (nếu có)
export function labelOf(cue) {
  const first = (cue.lines[0] || '');
  for (const re of LABELS) { const m = first.match(re); if (m && !/^\d+$/.test(m[1])) return m[1].trim(); }
  return null;
}

// o: { gap (giây, 0 = bỏ qua), dash, label, max (số câu tối đa mỗi đoạn, 0 = không giới hạn) }
// Trả về { starts: [chỉ số câu mở đầu mỗi đoạn], speakers: [nhãn đã gặp], dashCount }
export function autoSegments(cues, o) {
  const starts = new Set([0]), speakers = new Set();
  let dashCount = 0, prevLabel = null;
  cues.forEach((c, i) => {
    const lb = labelOf(c), isDash = DASH.test(c.lines[0] || '');
    if (lb) speakers.add(lb);
    if (isDash) dashCount++;
    if (i === 0) { prevLabel = lb; return; }
    const gap = c.start - cues[i - 1].end;
    if (o.gap > 0 && gap >= o.gap) starts.add(i);
    if (o.dash && isDash) starts.add(i);
    if (o.label && lb && lb !== prevLabel) starts.add(i);
    if (lb) prevLabel = lb;
  });
  let list = [...starts].sort((a, b) => a - b);
  // đoạn quá dài thì cắt đều
  if (o.max > 0) {
    const out = [];
    list.forEach((s, k) => {
      const end = list[k + 1] ?? cues.length, n = end - s, parts = Math.ceil(n / o.max);
      for (let p = 0; p < parts; p++) out.push(s + Math.round(p * n / parts));
    });
    list = [...new Set(out)].sort((a, b) => a - b);
  }
  return { starts: list, speakers: [...speakers], dashCount };
}

// ---------- hộp thoại ----------
const opts = () => ({
  gap: $('#sdGapOn').checked ? Math.max(0.1, parseFloat($('#sdGap').value) || 1.2) : 0,
  dash: $('#sdDash').checked, label: $('#sdLabel').checked,
  max: $('#sdMaxOn').checked ? Math.max(1, parseInt($('#sdMax').value, 10) || 6) : 0,
});

function preview() {
  const cues = currentCues();
  const r = autoSegments(cues, opts());
  const sizes = r.starts.map((s, k) => (r.starts[k + 1] ?? cues.length) - s);
  $('#sdPreview').innerHTML = `Sẽ chia thành <b>${r.starts.length} đoạn</b> (trung bình ${(cues.length / r.starts.length).toFixed(1)} câu mỗi đoạn, dài nhất ${Math.max(...sizes)} câu).` +
    `<br><span class="dim">Phát hiện: ${r.speakers.length ? 'nhãn nhân vật ' + r.speakers.slice(0, 6).join(', ') : 'không có nhãn nhân vật'} · ${r.dashCount} câu bắt đầu bằng gạch đầu dòng.</span>`;
  return r;
}

export function init() {
  $('#btnSeg').onclick = () => {
    if (isSegMode()) { setSegMode(false); return; }
    if (!currentItemId() || !currentCues().length) { toast('Hãy mở video có phụ đề trước'); return; }
    setSegMode(true);
    if (getSegs().length < 2) openDlg(); // chưa chia đoạn: gợi ý chia tự động
  };
  const openDlg = () => {
    if (!currentCues().length) { toast('Video cần có phụ đề trước'); return; }
    preview();
    $('#segDlg').showModal();
  };
  $('#sgSplit').onclick = openDlg;
  $('#sdClose').onclick = () => $('#segDlg').close();
  ['sdGapOn', 'sdGap', 'sdDash', 'sdLabel', 'sdMaxOn', 'sdMax'].forEach(id => $('#' + id).addEventListener('input', preview));
  $('#sdApply').onclick = () => {
    const r = preview();
    setSegments(r.starts);
    $('#segDlg').close();
    toast(`Đã chia thành ${r.starts.length} đoạn. Bấm ✂ cạnh một câu để chia thêm, “✕ gộp” để bỏ mốc.`, 5000);
  };
  $('#sdClear').onclick = () => { setSegments([0]); $('#segDlg').close(); toast('Đã xóa các mốc: cả video là một đoạn'); };
}
