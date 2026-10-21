// Kéo thả chip từ bằng chuột hoặc cảm ứng: chạm nhẹ = onTap(); kéo = onDrop(phần tử dưới con trỏ, x).
// Dùng cho sắp xếp câu và điền khuyết (exrun.js, exsheet.js).
export function grabChip(e, chip, onTap, onDrop) {
  if (e.button > 0) return;
  const sx = e.clientX, sy = e.clientY;
  let ghost = null;
  const move = ev => {
    if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
      ghost = chip.cloneNode(true); ghost.classList.add('ghost'); ghost.removeAttribute('data-b');
      ghost.style.minWidth = chip.getBoundingClientRect().width + 'px';
      document.body.appendChild(ghost); chip.classList.add('lifted');
    }
    if (ghost) { ghost.style.left = ev.clientX - ghost.offsetWidth / 2 + 'px'; ghost.style.top = ev.clientY - ghost.offsetHeight / 2 + 'px'; ev.preventDefault(); }
  };
  const off = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cancel); };
  const cancel = () => { off(); ghost?.remove(); chip.classList.remove('lifted'); };
  const up = ev => {
    off();
    if (!ghost) { onTap(); return; }
    ghost.remove();
    onDrop(document.elementFromPoint(ev.clientX, ev.clientY), ev.clientX);
  };
  document.addEventListener('pointermove', move, { passive: false });
  document.addEventListener('pointerup', up);
  document.addEventListener('pointercancel', cancel);
}
