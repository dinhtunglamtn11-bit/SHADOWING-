// Cài đặt → Thống kê nội dung: đếm số bài đã thêm ở từng mục (Article, Flash, Focus, Keyword, Story, kho từ vựng, thẻ, bài tập, video, tài liệu, ghi chú),
// theo ngôn ngữ đang chọn và theo tất cả ngôn ngữ. Chỉ đọc dữ liệu, không ghi gì; bài trong Thùng rác không được tính.
import { $, esc, bus, LANGS, getLang, langInfo } from './util.js';
import * as store from './store.js';

const langOf = d => d.lang || 'zh';
const posts = k => () => store.list('posts').filter(p => (p.kind || 'flash') === k);
const items = (...types) => () => store.list('items').filter(i => types.includes(i.type || 'video'));
// mỗi mục: id, biểu tượng, tên, hàm trả về danh sách bản ghi (có trường lang), nhãn đơn vị
const SECTIONS = [
  { group: 'Thế giới' },
  { icon: '📰', name: 'Article', unit: 'bài', get: () => store.list('articles') },
  { icon: '⚡', name: 'Flash', unit: 'bài', get: posts('flash') },
  { icon: '🔭', name: 'Focus', unit: 'bài', get: posts('focus') },
  { icon: '🔑', name: 'Keyword', unit: 'thuật ngữ', get: posts('keyword') },
  { icon: '📜', name: 'Story', unit: 'truyện', get: () => store.list('stories'), more: { unit: 'chương', get: () => store.list('chapters') } },
  { group: 'Ôn tập' },
  { icon: '🔠', name: 'Kho từ vựng', unit: 'từ', get: () => store.list('wwords') },
  { icon: '📒', name: 'Thẻ ôn tập', unit: 'thẻ', get: () => store.list('cards') },
  { icon: '📋', name: 'Bài tập của tôi', unit: 'bộ', get: () => store.list('sets') },
  { group: 'Thư viện' },
  { icon: '🎬', name: 'Video', unit: 'video', get: items('video') },
  { icon: '📄', name: 'Tài liệu', unit: 'tài liệu', get: items('pdf', 'doc') },
  { icon: '📝', name: 'Ghi chú', unit: 'ghi chú', get: items('note') },
];
const countBy = list => { const m = {}; for (const d of list) { const l = langOf(d); m[l] = (m[l] || 0) + 1; } return m; };

export function stats() { // trả về [{ name, icon, unit, by: {lang: n}, total, more }]
  return SECTIONS.filter(s => !s.group).map(s => { const by = countBy(s.get()), total = Object.values(by).reduce((a, b) => a + b, 0), mb = s.more ? countBy(s.more.get()) : null; return { ...s, by, total, moreBy: mb, moreTotal: mb ? Object.values(mb).reduce((a, b) => a + b, 0) : 0 }; });
}
function draw() {
  const box = $('#statBox'); if (!box) return;
  const cur = getLang(), data = new Map(stats().map(s => [s.name, s]));
  const fmt = (n, unit) => `<b>${n}</b> <small class="dim">${unit}</small>`;
  const detail = s => LANGS.filter(l => s.by[l.id]).map(l => `${l.short} ${s.by[l.id]}`).join(' · ');
  let html = `<div class="dim">Đang chọn: <b>${esc(langInfo().name)}</b>. Bài trong Thùng rác không được tính.</div><table class="stat-tb"><thead><tr><th>Mục</th><th>${esc(langInfo().short)} ${esc(langInfo().name)}</th><th>Tất cả</th></tr></thead><tbody>`;
  for (const s of SECTIONS) {
    if (s.group) { html += `<tr class="stat-g"><th colspan="3">${esc(s.group)}</th></tr>`; continue; }
    const d = data.get(s.name), c = d.by[cur] || 0;
    html += `<tr><td>${s.icon} ${esc(s.name)}${detail(d) ? `<br><small class="dim">${esc(detail(d))}</small>` : ''}</td><td>${fmt(c, s.unit)}${d.moreBy ? `<br>${fmt(d.moreBy[cur] || 0, s.more.unit)}` : ''}</td><td>${fmt(d.total, s.unit)}${d.moreBy ? `<br>${fmt(d.moreTotal, s.more.unit)}` : ''}</td></tr>`;
  }
  box.innerHTML = html + '</tbody></table>';
}
export function init() {
  bus.on('settingsOpen', draw);
  $('#statRefresh')?.addEventListener('click', draw);
  bus.on('lang', () => { if ($('#uiDlg')?.open) draw(); });
}
