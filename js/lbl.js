// Chữ ghi chú cạnh biểu tượng (Cài đặt → “Chữ cạnh biểu tượng”):
//   Bật  = biểu tượng kèm chữ (như trước).
//   Tắt  = chỉ còn biểu tượng, trên toàn app. Giữ nguyên các nút ＋ màu xanh, nút chính (primary) và nút trong hộp thoại.
// Cách làm: bọc phần chữ đứng sau biểu tượng pixel trong <span class="bl">; CSS ẩn .bl khi <html data-lbl="off">.
// Nút nào bị ẩn chữ vẫn có title / aria-label là chính chữ đó để rê chuột hoặc đọc màn hình vẫn biết là nút gì.
const SEL = 'button, a.btn, summary, .chip';
let q = new Set(), timer = 0;

function wrap(el) {
  if (el.closest('dialog') || el.classList.contains('primary')) { el.dataset.nolbl = '1'; return; }
  let icon = null;
  for (const n of el.childNodes) { // biểu tượng phải đứng đầu nút (bỏ qua khoảng trắng)
    if (n.nodeType === 3 && !n.nodeValue.trim()) continue;
    if (n.nodeType === 1 && n.classList.contains('pxe')) icon = n;
    break;
  }
  if (!icon) return;
  if (icon.querySelector('use')?.getAttribute('href') === '#pxs-plus') { el.dataset.nolbl = '1'; return; } // nút ＋ (thêm…) giữ nguyên
  let text = '';
  for (let n = icon.nextSibling; n; n = n.nextSibling) {
    if (n.nodeType !== 3 || !n.nodeValue.trim()) continue;
    text += n.nodeValue;
    const s = document.createElement('span'); s.className = 'bl'; s.textContent = n.nodeValue; n.replaceWith(s); n = s;
  }
  text = text.replace(/\s+/g, ' ').trim();
  if (text) {
    if (!el.title) el.title = text;
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', text);
    el.dataset.lbl = '1';
  }
}
function flush() {
  timer = 0;
  const nodes = [...q]; q = new Set();
  for (const n of nodes) {
    if (!n.isConnected) continue;
    if (n.matches?.(SEL)) wrap(n);
    n.querySelectorAll?.(SEL).forEach(wrap);
  }
}
const schedule = n => { if (n) q.add(n); if (!timer) timer = setTimeout(flush, 30); };

function navTitles() { // thanh dưới: chữ nằm trong <span> riêng, chỉ cần gắn tên để rê chuột / đọc màn hình
  document.querySelectorAll('#nav button').forEach(b => { const t = b.querySelector(':scope > span')?.textContent.trim(); if (t) { b.title = t; b.setAttribute('aria-label', t); } });
}

export function init() {
  schedule(document.body); navTitles();
  new MutationObserver(ms => {
    for (const m of ms) {
      if (m.type === 'characterData') schedule(m.target.parentElement?.closest(SEL));
      else {
        if (m.target.nodeType === 1 && m.target.matches?.(SEL)) schedule(m.target);
        m.addedNodes.forEach(n => { if (n.nodeType === 1) schedule(n); });
      }
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(navTitles, 600);
}
