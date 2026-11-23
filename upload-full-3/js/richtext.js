// Định dạng chữ nhẹ cho bài đọc (Thế giới của tôi → Article). Bài vẫn là chữ thường, định dạng nằm ngay trong chữ:
//   **đậm**     *nghiêng*     {{c:red|chữ màu}}     {{h:yellow|chữ tô nền như bút dạ quang}}
// Màu: red orange yellow green blue purple pink gray. Chữ không có ký hiệu thì hiện như cũ.
export const TEXT_COLORS = ['red', 'orange', 'green', 'blue', 'purple', 'pink'];
export const HL_COLORS = ['yellow', 'green', 'blue', 'pink', 'orange', 'purple'];
const NAMES = 'red|orange|yellow|green|blue|purple|pink|gray';

// text đã được esc(): chỉ đổi các ký hiệu thành thẻ HTML (không có chữ nào của người dùng được chèn thô)
export function inline(text) {
  return text
    .replace(new RegExp(`\\{\\{([ch]):(${NAMES})\\|([^{}]*?)\\}\\}`, 'g'), (_, k, c, t) => (k === 'c' ? `<span class="rc rc-${c}">${t}</span>` : `<mark class="rh rh-${c}">${t}</mark>`))
    .replace(/\*\*(?=\S)(.+?)(?<=\S)\*\*/g, '<b>$1</b>')
    .replace(/(?<!\*)\*(?=\S)(.+?)(?<=\S)\*(?!\*)/g, '<i>$1</i>');
}
// bỏ hết ký hiệu: dùng cho phần tóm tắt, đếm chữ, gửi cho AI
export function plain(raw) {
  return String(raw || '')
    .replace(new RegExp(`\\{\\{[ch]:(?:${NAMES})\\|([^{}]*?)\\}\\}`, 'g'), '$1')
    .replace(/\*\*(?=\S)(.+?)(?<=\S)\*\*/g, '$1')
    .replace(/(?<!\*)\*(?=\S)(.+?)(?<=\S)\*(?!\*)/g, '$1');
}

// ---------- thụt đầu dòng và gạch đầu dòng ----------
// Đầu dòng có khoảng trắng (2 dấu cách = 1 cấp, Tab = 2 cấp) thì lùi vào tương ứng; dòng bắt đầu bằng "- ", "* ", "• " hoặc "1. " thành gạch đầu dòng.
export function lineInfo(raw) {
  const m = /^([ \t\u3000]*)([\s\S]*)$/.exec(raw);
  let w = 0;
  for (const c of m[1]) w += c === '\t' ? 4 : c === '\u3000' ? 2 : 1;
  const b = /^([-*•·]|\d{1,3}[.)])[ \t]+([\s\S]*)$/.exec(m[2]);
  return { lv: Math.min(8, Math.floor(w / 2)), mark: b ? (/^\d/.test(b[1]) ? b[1] : '•') : '', rest: b ? b[2] : m[2] };
}
export const lineCls = i => 'ln' + (i.mark ? ' li' : '') + (i.lv ? ' in' : '');
export const lineBu = i => (i.mark ? `<span class="bu">${i.mark}</span>` : '');

// thao tác trên ô soạn (textarea): thụt vào / lùi ra / bật tắt gạch đầu dòng cho các dòng đang chọn
function lineRange(ta) {
  const v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
  const a = v.lastIndexOf('\n', s - 1) + 1;
  let b = v.indexOf('\n', e > s && v[e - 1] === '\n' ? e - 1 : e);
  if (b < 0) b = v.length;
  return { a, b, s, e, block: v.slice(a, b) };
}
function applyLines(ta, r, out) {
  const d0 = out.split('\n')[0].length - r.block.split('\n')[0].length;
  ta.value = ta.value.slice(0, r.a) + out + ta.value.slice(r.b);
  ta.focus(); ta.setSelectionRange(Math.max(r.a, r.s + d0), Math.max(r.a, r.e + out.length - r.block.length));
  ta.dispatchEvent(new Event('input'));
}
export function indentLines(ta, dir) {
  const r = lineRange(ta);
  applyLines(ta, r, r.block.split('\n').map(l => (dir > 0 ? '  ' + l : l.replace(/^(\t|\u3000| {1,2})/, ''))).join('\n'));
}
export function bulletLines(ta) {
  const r = lineRange(ta), ls = r.block.split('\n'), has = l => /^\s*([-*•·]|\d{1,3}[.)])[ \t]+/.test(l);
  const all = ls.filter(l => l.trim()).every(has);
  applyLines(ta, r, ls.map(l => (!l.trim() ? l : all ? l.replace(/^(\s*)([-*•·]|\d{1,3}[.)])[ \t]+/, '$1') : has(l) ? l : l.replace(/^(\s*)/, '$1- '))).join('\n'));
}
export function tabKey(ta) { // Tab / Shift+Tab trong ô soạn: thụt vào / lùi ra thay vì nhảy sang ô khác
  ta.addEventListener('keydown', e => { if (e.key === 'Tab' && !e.ctrlKey && !e.altKey && !e.metaKey) { e.preventDefault(); indentLines(ta, e.shiftKey ? -1 : 1); } });
}
