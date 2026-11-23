// Chế độ tập trung khi học: ẩn thanh trên (đầu trang, nhắc sao lưu) và thanh dưới (các mục), chỉ còn trình học.
// Thoát bằng nút “Thoát” nổi ở góc, phím Esc, hoặc nút Back. Tự thoát khi chuyển sang mục khác.
import { $, bus } from './util.js';

const CLS = 'focus-mode';
export const on = () => document.body.classList.contains(CLS);

export function enter() {
  if (on()) return;
  document.body.classList.add(CLS);
  $('#focusExit').hidden = false;
  try { document.documentElement.requestFullscreen?.({ navigationUI: 'hide' })?.catch(() => {}); } catch { /* không hỗ trợ: vẫn ẩn thanh của app */ }
  scrollTo(0, 0);
}
export function exit() {
  if (!on()) return;
  document.body.classList.remove(CLS);
  $('#focusExit').hidden = true;
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
}

export function init() {
  $('#btnFocusMode').onclick = () => (on() ? exit() : enter());
  $('#focusExit').onclick = exit;
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && on() && !document.querySelector('dialog[open]') && document.querySelector('#lkPop')?.hidden !== false) exit();
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && on()) exit(); }); // thoát toàn màn hình của trình duyệt thì thoát luôn chế độ này
  bus.on('show', v => { if (v !== 'player') exit(); });
}
