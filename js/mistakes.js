// Sổ lỗi: mỗi câu làm sai (ở bài tập, bài kiểm tra, bài đọc) được lưu lại kèm số lần sai để ôn riêng.
// Một câu có mã cố định (theo nội dung) nên làm sai ở nhiều nơi / nhiều máy vẫn gộp vào một dòng.
// Làm đúng liên tiếp MASTER lần thì coi là “đã nắm”; làm sai lại thì tính lại từ đầu.
import * as store from './store.js';
import { kindKey } from './exparse.js';

export const MASTER = 2;
const hash = s => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h.toString(36); };

// nội dung đại diện của câu hỏi: dùng làm mã và làm nhãn hiển thị
function labelOf(q) {
  if (q.kind === 'fill' || q.kind === 'cloze') return q.parts.map(p => (typeof p === 'string' ? p : `[${p.a[0]}]`)).join('');
  if (q.kind === 'order') return q.answers[0].join(' ');
  if (q.listen) return '🔊 ' + (q.kind === 'type' ? q.listen : q.options.find(o => o.ok)?.t || q.listen);
  return q.prompt || q.options?.find(o => o.ok)?.t || '';
}
export function keyOf(q) {
  const ans = q.kind === 'mc' ? q.options.find(o => o.ok)?.t : q.kind === 'tf' ? String(q.ans) : q.kind === 'type' ? q.answers.join('/') : labelOf(q);
  return hash([q.kind, q.prompt || '', q.listen || '', ans].join('|'));
}

export function record(q, ok, lang, src = '') {
  if (!q || !q.kind) return;
  const id = lang + '_' + keyOf(q), d = store.get('mistakes', id), now = Date.now();
  if (!ok) {
    store.put('mistakes', id, {
      lang, kind: kindKey(q), label: labelOf(q).slice(0, 160), qj: JSON.stringify(q), src: d && !d.deleted ? d.src || src : src,
      count: (d && !d.deleted ? d.count || 0 : 0) + 1, ok: 0, last: now, created: d && !d.deleted ? d.created || now : now, deleted: false,
    });
  } else if (d && !d.deleted) store.put('mistakes', id, { ok: (d.ok || 0) + 1, last: now });
}

export const all = lang => store.list('mistakes').filter(d => (d.lang || 'zh') === lang);
export const mastered = d => (d.ok || 0) >= MASTER;
export const qOf = d => { try { return JSON.parse(d.qj); } catch { return null; } };
