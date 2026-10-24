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
