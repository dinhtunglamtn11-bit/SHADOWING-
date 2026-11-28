// Màu trang đọc: nút “🎨 Màu trang” (data-rdpick) ở Article, Story, Flash, Focus, Keyword mở bảng chọn tông màu trơn.
// Màu của từng tông nằm trong exnews.css (khóa theo data-rd / data-v); lựa chọn lưu cùng cài đặt giao diện (ui.rd).
import { getUi, setUi } from './settings.js';

export const THEMES = [
  ['default', 'Theo giao diện'],
  ['ink', 'Đen · chữ trắng'], ['dark', 'Than · chữ kem'], ['gray', 'Xám · chữ trắng'], ['slate', 'Xám xanh'],
  ['navy', 'Xanh đêm'], ['forest', 'Rừng đậm'], ['cocoa', 'Cà phê'], ['plum', 'Tím mận'],
  ['white', 'Trắng · chữ đen'], ['silver', 'Xám nhạt'], ['paper', 'Giấy · chữ nâu'], ['sepia', 'Sách cũ'],
  ['green', 'Xanh dịu'], ['sky', 'Xanh trời'], ['rose', 'Hồng phấn'], ['lavender', 'Oải hương'],
];

let box = null;
const close = () => { box?.remove(); box = null; };

function open(btn) {
  close();
  const cur = getUi().rd;
  box = document.createElement('div');
  box.className = 'rdpick';
  box.innerHTML = `<b>Màu trang đọc</b><div class="rdgrid">${THEMES.map(([v, n]) => `<button type="button" class="rdsw${v === cur ? ' on' : ''}" data-v="${v}"><i>Aa 文</i><span>${n}</span></button>`).join('')}</div>`;
  (btn.closest('.nw-stage.full, .sp-wrap.full') || document.body).appendChild(box);
}

export function init() {
  document.addEventListener('click', e => {
    const pick = e.target.closest('[data-rdpick]');
    if (pick) { if (box) close(); else open(pick); return; }
    if (!box) return;
    const sw = e.target.closest('.rdsw');
    if (sw && box.contains(sw)) { setUi('rd', sw.dataset.v); box.querySelectorAll('.rdsw').forEach(b => b.classList.toggle('on', b === sw)); return; } // bảng vẫn mở để thử nhiều màu
    if (!box.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
