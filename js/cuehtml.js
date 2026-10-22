// Giao diện bên phải khung học: thanh chuyển chế độ 📖 đọc / ✏️ sửa và thẻ sửa từng câu phụ đề.
// Chỉ dựng HTML (player.js vẽ, cueedit.js xử lý thao tác).
import { esc, fmt } from './util.js';

export function modeBar(editing, count) {
  return `<div class="cuebar"><div class="seg cuemode" id="cueMode"><button data-cm="read" class="${editing ? '' : 'on'}" title="Chế độ đọc: chỉ xem và chạm vào câu để phát, không sửa được">📖</button><button data-cm="edit" class="${editing ? 'on' : ''}" title="Chế độ sửa: sửa chữ, phiên âm, nghĩa và giờ bắt đầu / kết thúc của từng câu ngay tại đây">✏️</button></div>` +
    (editing
      ? `<span class="dim cuehint">Đang sửa · tự động lưu</span><span class="grow"></span><span class="dim" id="cueSaved"></span><button class="btn" data-ea="addlast" title="Thêm một câu mới ở cuối">＋ Thêm câu</button>`
      : `<span class="dim cuehint">${count ? count + ' câu · đang ở chế độ đọc' : 'Chế độ đọc'}</span>`) + '</div>';
}

// một câu ở chế độ sửa: giờ bắt đầu / kết thúc (gõ giây hoặc m:ss), 3 dòng chữ, các nút thao tác
export function editCard(c, i, bcp) {
  const L = c.lines || [];
  return `<div class="cue ed" data-i="${i}">
    <div class="ect"><b class="en">${i + 1}</b>
      <span class="tm"><input type="text" inputmode="decimal" data-f="start" value="${fmt(c.start)}" title="Giờ bắt đầu (giây hoặc m:ss)"><button class="btn" data-tk="start" title="Lấy giờ hiện tại của video làm giờ bắt đầu">⏱</button></span>
      <span class="dim">→</span>
      <span class="tm"><input type="text" inputmode="decimal" data-f="end" value="${fmt(c.end)}" title="Giờ kết thúc (giây hoặc m:ss)"><button class="btn" data-tk="end" title="Lấy giờ hiện tại của video làm giờ kết thúc">⏱</button></span>
      <span class="grow"></span>
      <button class="btn" data-ea="play" title="Phát câu này">▶</button><button class="btn" data-ea="merge" title="Gộp với câu trên">⤴</button><button class="btn" data-ea="add" title="Thêm câu mới bên dưới">＋</button><button class="btn" data-ea="del" title="Xóa câu này">🗑</button>
    </div>
    <input type="text" data-f="l1" value="${esc(L[0] || '')}" placeholder="Dòng 1: tiếng gốc" lang="${bcp}">
    <input type="text" data-f="l2" value="${esc(L[1] || '')}" placeholder="Dòng 2: phiên âm">
    <input type="text" data-f="l3" value="${esc(L[2] || '')}" placeholder="Dòng 3: nghĩa">
  </div>`;
}
