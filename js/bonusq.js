// Nhiệm vụ THÊM (ngày / tuần / tháng): thưởng thêm xu, dựa trên các tính năng mới (Topics, Lịch, Từ mới luyện viết, mục thẻ,
// TeaLab, máy tính, Story, Nhật ký, Thói quen…). Chúng cộng THÊM vào bộ nhiệm vụ chính (achieve.js), không thay bộ cũ,
// nên xu, XP, cấp, huy hiệu đã có không đổi.
// Xu đã thưởng được ghi vào sổ (prefs/questlog + localStorage): xóa thẻ, lịch, bài… về sau không làm mất xu đã nhận.
import { vnDate, addDays } from './util.js';
import { rngOf, shuffle } from './quiz.js';
import * as store from './store.js';
import * as A from './achieve.js';

export const START = '2026-11-28'; // trước ngày này không có nhiệm vụ thêm
const PASS = 70; // từ luyện viết đạt từ 70% (như mục Từ mới)

// ---------- đo số liệu thật trong khoảng [from, to] ----------
const inR = (c, ms) => { if (!ms) return false; const d = vnDate(ms); return d >= c.from && d <= c.to; };
const days = (c, ok) => { let n = 0; for (let d = c.from; d <= c.to; d = addDays(d, 1)) { const x = c.m.get(d); if (x && ok(x, d)) n++; } return n; };
const logsDone = c => c.data.logs.filter(l => inR(c, l.doneAt)).length;
const timers = c => c.data.logs.filter(l => inR(c, l.timerDone)).length;
const calDone = c => c.data.events.reduce((n, e) => n + Object.entries(e.done || {}).filter(([d, v]) => v && d >= c.from && d <= c.to).length, 0);
const calAdd = c => c.data.events.filter(e => inR(c, e.created)).length;
const hwNew = c => c.data.hwwords.filter(w => inR(c, w.created)).length;
const hwPass = c => c.data.hwwords.filter(w => inR(c, w.at) && (w.last || 0) >= PASS).length;
const cardNew = c => c.data.cards.filter(k => inR(c, k.created)).length;
const deckAdd = c => c.data.cards.filter(k => k.deck && inR(c, k.created)).length;
const posts = c => c.data.posts.filter(p => inR(c, p.saved) || (p.comments || []).some(x => inR(c, x.t))).length;
const written = j => String(j.body || '').split('\n').some(l => l.trim() && !l.startsWith('##'));
const journals = c => c.data.journals.filter(j => j.journal >= c.from && j.journal <= c.to && written(j)).length;
const habits = c => Object.entries(c.data.habits).filter(([d]) => d >= c.from && d <= c.to).reduce((n, [, v]) => n + (v?.length || 0), 0);
const early = d => Object.entries(d.h || {}).reduce((n, [h, s]) => n + (+h < 9 ? s : 0), 0); // giây học trước 9 giờ sáng
const twoLangs = d => Object.values(d.l || {}).filter(s => s >= 300).length;
const KINDS = ['s', 'r', 'w', 'd', 'k', 'c', 'q', 'x', 'n', 't'];
const kinds = d => KINDS.filter(k => (d[k] || 0) > 0).length;
const best = (c, f) => { let n = 0; for (let d = c.from; d <= c.to; d = addDays(d, 1)) { const x = c.m.get(d); if (x) n = Math.max(n, f(x)); } return n; };
const cups = c => days(c, (x, d) => A.dailyFor(d).every(def => A.isDone(def, x)));

// ---------- danh sách nhiệm vụ ----------
const q = (id, icon, name, goal, unit, coins, val, fixed = false) => ({ id, icon, name, goal, unit, coins, val, fixed, show: v => `${Math.min(Math.floor(v), goal)}/${goal} ${unit}` });

const DAILY = [
  q('topic', '🎯', 'Nộp bài Topics hôm nay', 1, 'bài', 15, logsDone, true),
  q('timer', '⏱', 'Tìm hiểu trọn một lượt đồng hồ Topics', 1, 'lượt', 10, timers),
  q('caldone', '📅', 'Đánh dấu xong 1 việc trong Lịch', 1, 'việc', 10, calDone),
  q('caladd', '➕', 'Thêm 1 việc mới vào Lịch', 1, 'việc', 8, calAdd),
  q('hwnew', '🔠', 'Nhập 5 từ mới để luyện viết', 5, 'từ', 10, hwNew),
  q('hwpass', '✍', 'Viết đạt 3 từ mới (từ 70%)', 3, 'từ', 12, hwPass),
  q('cardnew', '📒', 'Lưu 5 thẻ mới', 5, 'thẻ', 10, cardNew),
  q('deck', '🗂', 'Lưu 3 thẻ mới vào một mục thẻ', 3, 'thẻ', 10, deckAdd),
  q('tea', '💎', 'Bán 2 buổi ở TeaLab', 2, 'buổi', 12, c => c.agg.tl),
  q('calc', '💡', 'Tính 3 phép bằng máy tính TeaLab', 3, 'phép', 8, c => c.agg.cm),
  q('chapter', '📜', 'Đọc hết 1 chương Story', 1, 'chương', 10, c => c.agg.st),
  q('post', '⭐', 'Lưu hoặc bình luận 1 bài Flash, Focus, Keyword', 1, 'bài', 8, posts),
  q('journal', '📓', 'Viết nhật ký cuối ngày', 1, 'bài', 10, journals),
  q('habit', '🔥', 'Tick 2 thói quen', 2, 'lần', 8, habits),
  q('long', '🏆', 'Học đủ 45 phút trong ngày', 45, 'phút', 20, c => c.agg.sec / 60),
  q('early', '🌅', 'Học 10 phút trước 9 giờ sáng', 10, 'phút', 12, c => best(c, early) / 60),
  q('langs', '🌍', 'Học 2 ngôn ngữ, mỗi thứ ít nhất 5 phút', 2, 'ngôn ngữ', 15, c => best(c, twoLangs)),
  q('mixed', '🎲', 'Làm 4 loại hoạt động khác nhau', 4, 'loại', 15, c => best(c, kinds)),
];
const WEEKLY = [
  q('topic', '🎯', 'Nộp 4 bài Topics', 4, 'bài', 60, logsDone, true),
  q('caldone', '📅', 'Đánh dấu xong 5 việc trong Lịch', 5, 'việc', 40, calDone),
  q('hwnew', '🔠', 'Nhập 25 từ mới để luyện viết', 25, 'từ', 40, hwNew),
  q('hwpass', '✍', 'Viết đạt 20 từ mới (từ 70%)', 20, 'từ', 50, hwPass),
  q('cardnew', '📒', 'Lưu 30 thẻ mới', 30, 'thẻ', 40, cardNew),
  q('tea', '💎', 'Bán 10 buổi ở TeaLab', 10, 'buổi', 50, c => c.agg.tl),
  q('calc', '💡', 'Tính 15 phép bằng máy tính TeaLab', 15, 'phép', 30, c => c.agg.cm),
  q('chapter', '📜', 'Đọc hết 5 chương Story', 5, 'chương', 40, c => c.agg.st),
  q('post', '⭐', 'Lưu hoặc bình luận 5 bài Flash, Focus, Keyword', 5, 'bài', 30, posts),
  q('journal', '📓', 'Viết nhật ký 4 ngày', 4, 'ngày', 50, journals),
  q('habit', '🔥', 'Tick 12 lần thói quen', 12, 'lần', 40, habits),
  q('early', '🌅', 'Học trước 9 giờ sáng (10 phút) trong 3 ngày', 3, 'ngày', 50, c => days(c, x => early(x) >= 600)),
  q('langs', '🌍', 'Học 2 ngôn ngữ trong cùng một ngày, 3 ngày', 3, 'ngày', 50, c => days(c, x => twoLangs(x) >= 2)),
  q('long', '🏆', 'Học 45 phút một ngày, đủ 2 ngày', 2, 'ngày', 60, c => days(c, x => x.sec >= 2700)),
  q('carddays', '📒', 'Ôn thẻ trong 4 ngày khác nhau', 4, 'ngày', 50, c => days(c, x => x.c > 0)),
  q('hwdays', '🖊', 'Luyện viết chữ trong 3 ngày khác nhau', 3, 'ngày', 40, c => days(c, x => x.x > 0)),
  q('shadowdays', '🗣', 'Shadow trong 4 ngày khác nhau', 4, 'ngày', 50, c => days(c, x => x.s > 0)),
];
const MONTHLY = [
  q('topic', '🎯', 'Nộp 15 bài Topics', 15, 'bài', 200, logsDone, true),
  q('caldone', '📅', 'Đánh dấu xong 20 việc trong Lịch', 20, 'việc', 120, calDone),
  q('hwnew', '🔠', 'Nhập 100 từ mới để luyện viết', 100, 'từ', 150, hwNew),
  q('hwpass', '✍', 'Viết đạt 80 từ mới (từ 70%)', 80, 'từ', 180, hwPass),
  q('cardnew', '📒', 'Lưu 150 thẻ mới', 150, 'thẻ', 150, cardNew),
  q('tea', '💎', 'Bán 40 buổi ở TeaLab', 40, 'buổi', 150, c => c.agg.tl),
  q('chapter', '📜', 'Đọc hết 20 chương Story', 20, 'chương', 150, c => c.agg.st),
  q('journal', '📓', 'Viết nhật ký 15 ngày', 15, 'ngày', 180, journals),
  q('habit', '🔥', 'Tick 60 lần thói quen', 60, 'lần', 150, habits),
  q('long', '🏆', 'Học 45 phút một ngày, đủ 8 ngày', 8, 'ngày', 200, c => days(c, x => x.sec >= 2700)),
  q('carddays', '📒', 'Ôn thẻ trong 15 ngày khác nhau', 15, 'ngày', 180, c => days(c, x => x.c > 0)),
  q('mixed', '🎲', 'Làm 4 loại hoạt động trong 10 ngày', 10, 'ngày', 200, c => days(c, x => kinds(x) >= 4)),
  q('cups', '⭐', 'Xong hết nhiệm vụ chính trong 5 ngày', 5, 'ngày', 200, cups),
];
const SPEC = {
  day: { pool: DAILY, n: 5, all: 20, end: s => s, start: d => d },
  week: { pool: WEEKLY, n: 6, all: 80, end: s => addDays(s, 6), start: A.weekStart },
  month: { pool: MONTHLY, n: 6, all: 300, end: A.monthEnd, start: A.monthStart },
};
export const allBonus = kind => SPEC[kind].all;
export const periodOf = (kind, date) => { const start = SPEC[kind].start(date); return { start, end: SPEC[kind].end(start) }; };
// cùng một ngày / tuần / tháng thì máy nào cũng ra cùng một bộ
export function questsFor(kind, start) {
  const { pool, n } = SPEC[kind], fixed = pool.filter(x => x.fixed), rest = shuffle(pool.filter(x => !x.fixed), rngOf(`x${kind}${start}`));
  return [...fixed, ...rest].slice(0, n);
}

export function snapshot() {
  let hb = {};
  try { hb = JSON.parse(localStorage.getItem('habits:v1') || 'null')?.days || {}; } catch { /* bỏ qua */ }
  return {
    logs: store.list('topiclogs'), events: store.list('events'), hwwords: store.list('hwwords'), cards: store.list('cards'),
    posts: store.list('posts'), journals: store.list('items').filter(i => i.type === 'note' && i.journal), habits: hb,
  };
}
export const context = (m, kind, start, data = snapshot()) => {
  const end = SPEC[kind].end(start), today = vnDate(), to = end < today ? end : today;
  return { m, from: start, to, data, agg: A.aggregate(m, start, to) };
};

// ---------- sổ xu đã thưởng ----------
const LKEY = 'questlog:v1';
let got = null; // { 'day:2026-11-28:topic': [xu, ngày nhận] }
function readLocal() { try { return JSON.parse(localStorage.getItem(LKEY) || '{}') || {}; } catch { return {}; } }
export function ledger() {
  const remote = store.get('prefs', 'questlog')?.got || {};
  got = { ...remote, ...readLocal(), ...(got || {}) };
  return got;
}
export const total = () => Object.values(ledger()).reduce((n, v) => n + (+v[0] || 0), 0);
export const coinsOn = date => Object.values(ledger()).reduce((n, v) => n + (v[1] === date ? +v[0] || 0 : 0), 0);
export const keyOf = (kind, start, id) => `${kind}:${start}:${id}`;

// Ghi nhận mọi nhiệm vụ thêm vừa hoàn thành. Xét lại vài kỳ gần đây (dữ liệu từ máy khác có thể về muộn).
export function claim(m) {
  const today = vnDate();
  if (today < START) return [];
  const log = ledger(), data = snapshot(), fresh = [];
  const starts = {
    day: Array.from({ length: 7 }, (_, i) => addDays(today, -i)),
    week: [A.weekStart(today), addDays(A.weekStart(today), -7)],
    month: [A.monthStart(today), A.monthStart(addDays(A.monthStart(today), -1))],
  };
  const add = (key, coins, name) => { log[key] = [coins, today]; fresh.push({ key, coins, name }); };
  for (const [kind, list] of Object.entries(starts)) {
    for (const start of list) {
      if (SPEC[kind].end(start) < START) continue;
      const defs = questsFor(kind, start), open = defs.filter(d => !log[keyOf(kind, start, d.id)]);
      if (open.length) {
        const c = context(m, kind, start, data);
        for (const d of open) if (d.val(c) >= d.goal) add(keyOf(kind, start, d.id), d.coins, d.name);
      }
      const allKey = keyOf(kind, start, 'all');
      if (!log[allKey] && defs.every(d => log[keyOf(kind, start, d.id)])) add(allKey, SPEC[kind].all, '');
    }
  }
  const remote = store.get('prefs', 'questlog')?.got || {};
  if (fresh.length) { try { localStorage.setItem(LKEY, JSON.stringify(log)); } catch { /* bỏ qua */ } }
  if (Object.keys(log).some(k => !remote[k])) store.put('prefs', 'questlog', { got: { ...log } });
  return fresh;
}
