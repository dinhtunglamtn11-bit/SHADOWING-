// Hiệu ứng khi bấm nút: vòng vuông sáng lan ra + vài tia pixel bay ra rồi tan.
// Chỉ dùng transform / opacity qua Web Animations API (chạy trên GPU) nên mượt; tự tắt khi chọn “Hiệu ứng chuyển động: Tắt”
// hoặc hệ điều hành bật “giảm chuyển động”. Thanh phát video và khung luyện nói không có hiệu ứng.
const HIT = 'button, .btn, .chip, [role=button], [role=tab], summary';
const QUIET = '#bar, #recBar, #speakPanel, #stage, .rb, [data-nosfx], [data-nofx]';
const COLORS = ['#ffd84d', '#ff8f3a', '#5fd068', '#7ec3ff', '#ff8fc0', '#a98bff'];
const MAX_LIVE = 30; // quá nhiều hạt cùng lúc (bấm liên tục) thì bỏ qua, giữ máy nhẹ
let layer = null, live = 0, last = 0;

const off = () => document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches;

const POP = 'showPopover' in HTMLElement.prototype;

function mount() {
  if (layer?.isConnected) return layer;
  layer = document.createElement('div');
  layer.id = 'fxLayer'; layer.setAttribute('aria-hidden', 'true');
  if (POP) layer.setAttribute('popover', 'manual'); // lớp trên cùng: hiệu ứng vẫn hiện trên cả hộp thoại <dialog>
  document.body.appendChild(layer);
  return layer;
}
function raise(L) { // hộp thoại mở sau sẽ nằm trên lớp hiệu ứng: đưa lớp lên lại
  try { if (L.matches(':popover-open')) L.hidePopover(); L.showPopover(); } catch { /* bỏ qua */ }
}

function burst(x, y, accent) {
  const L = mount();
  if (POP && (!L.matches(':popover-open') || document.querySelector('dialog[open]'))) raise(L);
  const done = el => () => { el.remove(); live--; };
  const ring = document.createElement('i');
  ring.className = 'fxr';
  ring.style.cssText = `left:${x}px;top:${y}px;border-color:${accent}`;
  L.appendChild(ring); live++;
  ring.animate([{ transform: 'translate(-50%,-50%) scale(.25)', opacity: 0.9 }, { transform: 'translate(-50%,-50%) scale(1.9)', opacity: 0 }], { duration: 380, easing: 'ease-out' }).onfinish = done(ring);
  const n = 7;
  for (let k = 0; k < n; k++) {
    const p = document.createElement('i');
    const a = (Math.PI * 2 * k) / n + Math.random() * 0.7, d = 24 + Math.random() * 26, s = 4 + 2 * Math.round(Math.random());
    p.className = 'fxp';
    p.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${k === 0 ? accent : COLORS[(k + Math.floor(Math.random() * 3)) % COLORS.length]}`;
    L.appendChild(p); live++;
    p.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${(Math.cos(a) * d).toFixed(1)}px), calc(-50% + ${(Math.sin(a) * d + 10).toFixed(1)}px)) scale(.2)`, opacity: 0 },
    ], { duration: 420 + Math.random() * 180, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = done(p);
  }
}

function onClick(e) {
  if (!e.isTrusted || off() || live > MAX_LIVE || document.hidden) return;
  const el = e.target.closest?.(HIT);
  if (!el || el.disabled || el.closest('[disabled],[aria-disabled=true]') || el.closest(QUIET)) return;
  const now = performance.now();
  if (now - last < 60) return;
  last = now;
  let x = e.clientX, y = e.clientY;
  if (!x && !y) { const r = el.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; } // bấm bằng bàn phím
  // mọi việc nặng (đọc màu nút, dựng hạt) để sau khung hình kế tiếp: lệnh bấm trả về ngay, không bị chậm
  requestAnimationFrame(() => burst(x, y, getComputedStyle(el).getPropertyValue('--c').trim() || '#ffd84d'));
}

export function init() {
  document.addEventListener('click', onClick, true);
}
