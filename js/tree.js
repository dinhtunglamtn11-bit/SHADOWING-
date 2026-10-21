// Thư mục lồng nhau (bài học): HSK1 › HSK bài 1 › … Mỗi thư mục là một tài liệu trong “folders” có thêm trường parent.
// Video / tài liệu / ghi chú dùng trường folder của chính chúng; bài tập (sets) và bài kiểm tra (tests) cũng có trường folder.
import * as store from './store.js';

const lg = f => f.lang || 'zh';
const cmp = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true });
export const allFolders = l => store.list('folders').filter(f => lg(f) === l);
const mapOf = l => new Map(allFolders(l).map(f => [f.id, f]));
const parentOf = (f, m) => (f.parent && m.has(f.parent) && f.parent !== f.id ? f.parent : '');

export function childrenOf(parent, l) {
  const m = mapOf(l);
  return [...m.values()].filter(f => parentOf(f, m) === (parent || '')).sort(cmp);
}
export function pathNames(id, l) {
  const m = mapOf(l), out = [];
  for (let f = m.get(id), g = 0; f && g < 30; f = m.get(parentOf(f, m)), g++) out.unshift(f.name);
  return out;
}
export const pathLabel = (id, l) => pathNames(id, l).join(' › ');

// Toàn bộ cây theo thứ tự duyệt sâu: [{ id, name, depth, label }]
export function flatTree(l) {
  const m = mapOf(l), out = [];
  const walk = (parent, depth, prefix) => {
    [...m.values()].filter(f => parentOf(f, m) === parent).sort(cmp).forEach(f => {
      const label = prefix ? prefix + ' › ' + f.name : f.name;
      out.push({ id: f.id, name: f.name, depth, label });
      if (depth < 20) walk(f.id, depth + 1, label);
    });
  };
  walk('', 0, '');
  return out;
}
export function subtreeIds(id, l) {
  const m = mapOf(l), out = [id];
  for (let i = 0; i < out.length && out.length < 500; i++) for (const f of m.values()) if (parentOf(f, m) === out[i] && !out.includes(f.id)) out.push(f.id);
  return out;
}

// <option> cho ô chọn thư mục (hiện cả đường dẫn)
export function options(l, selected, noneLabel = 'Chưa phân mục') {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  return `<option value="">${esc(noneLabel)}</option>` + flatTree(l).map(f => `<option value="${f.id}" ${f.id === selected ? 'selected' : ''}>${esc(f.label)}</option>`).join('');
}

// Thống kê nội dung của một thư mục (kể cả thư mục con)
export function statsOf(id, l) {
  const ids = new Set(subtreeIds(id, l)), s = { folders: ids.size - 1, video: 0, note: 0, doc: 0, sets: 0, tests: 0, q: 0 };
  for (const i of store.list('items')) if (lg(i) === l && ids.has(i.folder)) s[i.type === 'video' ? 'video' : i.type === 'note' ? 'note' : 'doc']++;
  for (const x of store.list('sets')) if (lg(x) === l && ids.has(x.folder)) s.sets++;
  for (const x of store.list('tests')) if (lg(x) === l && ids.has(x.folder)) s.tests++;
  return s;
}

// Xóa thư mục. cascade = true: xóa cả thư mục con; ngược lại thư mục con được chuyển lên cấp trên.
// Nội dung bên trong (video, bài tập…) không bị xóa mà về “Chưa phân mục”.
export function removeFolder(id, l, cascade) {
  const f = store.get('folders', id);
  const ids = cascade ? subtreeIds(id, l) : [id];
  for (const i of store.list('items')) if (ids.includes(i.folder)) store.put('items', i.id, { folder: '' });
  for (const c of ['sets', 'tests']) for (const x of store.list(c)) if (ids.includes(x.folder)) store.put(c, x.id, { folder: '' });
  if (!cascade) for (const c of childrenOf(id, l)) store.put('folders', c.id, { parent: f?.parent || '' });
  ids.forEach(x => store.del('folders', x));
}
