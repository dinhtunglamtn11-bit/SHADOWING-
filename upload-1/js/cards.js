// Sổ thẻ và thuật toán ôn lặp lại ngắt quãng (FSRS-5, hoặc SM-2 rút gọn nếu chọn trong Cài đặt).
// Thẻ lưu cùng dữ liệu khác và đồng bộ giữa các máy.
import * as store from './store.js';
import * as tracker from './tracker.js';
import { uid } from './util.js';
import { zhText, prefs } from './prefs.js';
import * as F from './fsrs.js';

export const MIN = 60e3, DAY = 864e5;
export const cardId = (itemId, i) => `c${itemId}_${i}`;

// Lưu một câu của video thành thẻ. weak = true khi là câu bạn làm yếu (chép/nói sai nhiều).
export function addCueCard(itemId, i, { weak = false } = {}) {
  const it = store.get('items', itemId);
  if (!it) return false;
  let cs = []; try { cs = JSON.parse(it.cues || '[]'); } catch {}
  const c = cs[i];
  if (!c) return false;
  const id = cardId(itemId, i), ex = store.get('cards', id);
  if (ex && !ex.deleted) {
    if (weak && !ex.weak) store.put('cards', id, { weak: true, due: Math.min(ex.due || 0, Date.now()) });
    return false;
  }
  store.put('cards', id, {
    type: 'sentence', lang: it.lang || 'zh', front: c.lines[0], back: c.lines.slice(1),
    itemId, idx: i, t0: c.start, t1: c.end, title: it.title,
    due: Date.now(), interval: 0, ease: 2.5, reps: 0, lapses: 0, last: 0, weak, created: Date.now(), deleted: false,
  });
  return true;
}

export function addManual({ lang, front, back, title = 'Thẻ tự thêm', type = 'manual' }) {
  const id = 'm' + uid();
  store.put('cards', id, {
    type, lang, front: zhText(front, lang), back: back.filter(Boolean).map(b => zhText(b, lang)), title,
    due: Date.now(), interval: 0, ease: 2.5, reps: 0, lapses: 0, last: 0, weak: false, created: Date.now(), deleted: false,
  });
  return id;
}

export const allCards = lang => store.list('cards').filter(c => (c.lang || 'zh') === lang);

// Thẻ cần ôn: thẻ đến hạn, thẻ đang học lại, rồi thẻ mới (ưu tiên câu yếu), tối đa newLimit thẻ mới
export function dueList(lang, newLimit = 10) {
  const now = Date.now(), all = allCards(lang);
  const reviews = all.filter(c => c.reps > 0 && c.due <= now).sort((a, b) => a.due - b.due);
  const learning = all.filter(c => c.reps === 0 && c.last && c.due <= now).sort((a, b) => a.due - b.due);
  const fresh = all.filter(c => !c.last).sort((a, b) => (b.weak ? 1 : 0) - (a.weak ? 1 : 0) || a.created - b.created).slice(0, newLimit);
  return [...reviews, ...learning, ...fresh];
}

// g: 0 = Quên, 1 = Khó, 2 = Được, 3 = Dễ. Mặc định dùng FSRS; có thể chuyển về thuật toán cổ điển trong Cài đặt.
export function schedule(c, g) {
  if ((prefs.srs || 'fsrs') === 'sm2') return scheduleSM2(c, g);
  const now = Date.now(), G = g + 1, r = prefs.retention || 0.9;
  let st;
  if (c.stab) st = F.next({ S: c.stab, D: c.diff || 5 }, G, Math.max(0, (now - (c.last || now)) / DAY));
  else if (c.reps > 0) st = F.next(F.fromSM2(c), G, Math.max(0, (now - (c.last || now)) / DAY)); // thẻ cũ chuyển từ SM-2
  else st = F.init(G); // thẻ mới
  let { reps = 0, lapses = 0 } = c, interval = 0, due;
  if (G === 1) { if (reps > 0) lapses++; reps = 0; due = now + 10 * MIN; }
  else { reps++; interval = F.interval(st.S, r); due = now + interval * DAY; }
  return { interval, ease: c.ease ?? 2.5, reps, lapses, due, last: now, weak: g >= 2 ? false : !!c.weak, stab: +st.S.toFixed(3), diff: +st.D.toFixed(3) };
}

// Thuật toán cổ điển (kiểu SM-2 rút gọn)
function scheduleSM2(c, g) {
  let { interval = 0, ease = 2.5, reps = 0, lapses = 0 } = c;
  const now = Date.now();
  let due;
  if (g === 0) { reps = 0; lapses++; ease = Math.max(1.3, ease - 0.2); interval = 0; due = now + 10 * MIN; }
  else {
    if (g === 1) { interval = Math.max(1, Math.round((interval || 1) * 1.2)); ease = Math.max(1.3, ease - 0.15); }
    else if (g === 2) interval = reps === 0 ? 1 : reps === 1 ? 3 : Math.max(interval + 1, Math.round(interval * ease));
    else { interval = reps === 0 ? 3 : reps === 1 ? 6 : Math.max(interval + 2, Math.round(interval * ease * 1.3)); ease += 0.15; }
    reps++; due = now + interval * DAY;
  }
  return { interval, ease: +ease.toFixed(2), reps, lapses, due, last: now, weak: g >= 2 ? false : !!c.weak };
}

export function previewText(c, g) {
  if (g === 0) return '10 phút';
  const d = schedule(c, g).interval;
  return d >= 60 ? Math.round(d / 30) + ' tháng' : d + ' ngày';
}
export function grade(id, g) {
  const c = store.get('cards', id);
  if (!c) return;
  store.put('cards', id, schedule(c, g));
  tracker.card();
}

export const remove = id => store.del('cards', id);
