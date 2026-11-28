// Mục thẻ và nhóm con trong sổ thẻ (riêng cho từng ngôn ngữ). Lưu ở prefs/decks nên đồng bộ cùng cài đặt:
//   d: { mã: { n: tên, l: ngôn ngữ, p: mã mục cha ('' = mục chính), del: đã xóa } }
// Thẻ trỏ tới mục bằng trường deck. Xóa mục không xóa thẻ: thẻ trở về “Chưa phân mục”.
import * as store from './store.js';
import { esc, uid } from './util.js';

const all = () => store.get('prefs', 'decks')?.d || {};
const save = (id, patch) => store.put('prefs', 'decks', { d: { ...all(), [id]: { ...all()[id], ...patch } } });
const byName = (a, b) => a.n.localeCompare(b.n, 'vi', { numeric: true });

export const exists = id => !!(id && all()[id] && !all()[id].del);
export function list(lang) { // theo thứ tự cây: mục chính, rồi các nhóm con ngay dưới
  const live = Object.entries(all()).map(([id, x]) => ({ id, ...x })).filter(x => !x.del && x.l === lang);
  const top = live.filter(x => !x.p || !live.some(y => y.id === x.p)).sort(byName);
  return top.flatMap(t => [{ ...t, depth: 0 }, ...live.filter(c => c.p === t.id).sort(byName).map(c => ({ ...c, depth: 1 }))]);
}
export const isTop = id => exists(id) && !exists(all()[id].p);
export function nameOf(id) { // “Mục / Nhóm”
  if (!exists(id)) return '';
  const x = all()[id];
  return exists(x.p) ? `${all()[x.p].n} / ${x.n}` : x.n;
}
export function add(lang, name, parent = '') {
  const n = String(name || '').trim().slice(0, 60);
  if (!n) return '';
  const p = isTop(parent) ? parent : '';
  const same = list(lang).find(x => x.n.toLowerCase() === n.toLowerCase() && (exists(x.p) ? x.p : '') === p);
  if (same) return same.id;
  const id = 'k' + uid();
  save(id, { n, l: lang, p, del: false });
  return id;
}
export const rename = (id, name) => { const n = String(name || '').trim().slice(0, 60); if (n && exists(id)) save(id, { n }); };
export function remove(id) {
  if (!exists(id)) return;
  for (const [cid, c] of Object.entries(all())) if (c.p === id) save(cid, { p: '' }); // nhóm con thành mục chính
  save(id, { del: true });
}
// bộ lọc: '*' tất cả · '' chưa phân mục · mã mục (gồm cả nhóm con)
export function matches(card, filter) {
  if (filter === '*') return true;
  const d = exists(card.deck) ? card.deck : '';
  if (filter === '') return d === '';
  return d === filter || (d !== '' && all()[d].p === filter);
}
export const fixFilter = f => (f === '*' || f === '' || exists(f) ? f : '*');
// <option> cho ô chọn; tên mục là chữ của người dùng nên mang lớp không dịch
export function options(lang, selected, { all: withAll = false, none = 'Chưa phân mục', create = false } = {}) {
  return (withAll ? `<option value="*" ${selected === '*' ? 'selected' : ''}>Tất cả mục</option>` : '') +
    `<option value="" ${selected === '' ? 'selected' : ''}>${none}</option>` +
    list(lang).map(d => `<option class="cal-u" value="${d.id}" ${selected === d.id ? 'selected' : ''}>${d.depth ? '　└ ' : ''}${esc(d.n)}</option>`).join('') +
    (create ? '<option value="__new">＋ Tạo mục mới…</option>' : '');
}
