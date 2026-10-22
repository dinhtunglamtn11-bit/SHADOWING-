// Thùng rác: mục đã xóa được giữ 30 ngày để khôi phục, sau đó nội dung bị dọn (store.purgeOld).
import { $, esc, toast, fmtMB } from './util.js';
import * as store from './store.js';

const KEEP_DAYS = 30, DAY = 864e5;
const KIND = { items: 'Video / tài liệu / ghi chú', cards: 'Thẻ', sets: 'Bộ bài tập', wsets: 'Bộ viết', folders: 'Mục', articles: 'Bài đọc', wfolders: 'Thư mục chủ đề', tests: 'Bài kiểm tra', mistakes: 'Sổ lỗi', wwords: 'Từ vựng Thế giới' };

function label(c, d) {
  if (c === 'cards') return [d.front, (d.back || [])[0]].filter(Boolean).join(' · ');
  if (c === 'folders') return d.name;
  if (c === 'mistakes') return d.label;
  if (c === 'wwords') return [d.word, d.meaning].filter(Boolean).join(' · ');
  return d.title || d.name || '';
}
function icon(c, d) {
  if (c === 'items') return d.type === 'video' ? '🎬' : d.type === 'note' ? '📝' : '📄';
  return { cards: '📒', sets: '🧩', wsets: '🖊', folders: '📂', articles: '📰', wfolders: '📂', tests: '📋', mistakes: '📕', wwords: '🌍' }[c] || '📄';
}
const deletedAt = d => d.deletedAt || d.u || 0;

export function entries() {
  const out = [];
  for (const c of store.TRASHABLE) for (const d of store.listDeleted(c)) out.push({ c, d });
  return out.sort((a, b) => deletedAt(b.d) - deletedAt(a.d));
}

function ago(t) {
  const n = Math.floor((Date.now() - t) / DAY);
  return n <= 0 ? 'hôm nay' : n + ' ngày trước';
}

function render() {
  const list = entries(), box = $('#trashList');
  $('#trashEmpty').hidden = list.length > 0;
  $('#trashClear').disabled = !list.length;
  box.innerHTML = list.map(({ c, d }) => {
    const left = Math.max(0, KEEP_DAYS - Math.floor((Date.now() - deletedAt(d)) / DAY));
    return `<div class="lib"><span class="ti">${icon(c, d)}</span>
      <div class="n"><b>${esc(label(c, d)) || '—'}</b><span>${KIND[c]} · xóa ${ago(deletedAt(d))} · còn ${left} ngày</span></div>
      <button class="btn" data-r="${c}|${d.id}">↩ Khôi phục</button><button class="btn danger" data-p="${c}|${d.id}">🗑 Xóa hẳn</button></div>`;
  }).join('');
  refresh();
}

export function refresh() {
  const n = entries().length;
  const b = $('#btnTrash');
  if (b) b.innerHTML = `🗑 Thùng rác${n ? ` (${n})` : ''}`;
}

export function init() {
  store.purgeOld(KEEP_DAYS);
  const dlg = $('#trashDlg');
  $('#btnTrash').onclick = () => { render(); dlg.showModal(); };
  $('#trashClose').onclick = () => dlg.close();
  $('#btnSettings').addEventListener('click', refresh);
  $('#trashList').onclick = e => {
    const r = e.target.closest('[data-r]'), p = e.target.closest('[data-p]');
    if (r) {
      const [c, id] = r.dataset.r.split('|');
      store.undelete(c, id);
      toast(c === 'items' && store.get(c, id)?.type !== 'note' ? 'Đã khôi phục (file video/PDF đã xóa khỏi máy, hãy chọn lại file)' : 'Đã khôi phục', 4500);
      render();
    } else if (p && confirm('Xóa hẳn mục này? Không thể khôi phục nữa.')) {
      const [c, id] = p.dataset.p.split('|');
      store.purge(c, id); render();
    }
  };
  $('#trashClear').onclick = () => {
    const list = entries();
    if (!list.length || !confirm(`Xóa hẳn ${list.length} mục trong thùng rác? Không thể khôi phục nữa.`)) return;
    list.forEach(({ c, d }) => store.purge(c, d.id));
    render(); toast('Đã dọn sạch thùng rác');
  };
  refresh();
}
