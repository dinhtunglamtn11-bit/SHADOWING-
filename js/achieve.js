// Nhiệm vụ theo ngày / tuần / tháng và thành tựu (huy hiệu) dài hạn. Mọi thứ được tính lại từ nhật ký học (tracker.byDate),
// nên không cần lưu thêm gì và đồng bộ giữa các máy tự động. Giờ Việt Nam.
import { addDays, vnDate } from './util.js';
import { rngOf, shuffle } from './quiz.js';
import { prefs } from './prefs.js';

export const blankDay = date => ({ date, sec: 0, s: 0, r: 0, w: 0, d: 0, k: 0, c: 0, q: 0, qc: 0, x: 0, n: 0, t: 0, tp: 0, h: {}, l: {} });
const KEYS = ['sec', 's', 'r', 'w', 'd', 'k', 'c', 'q', 'qc', 'x', 'n', 't', 'tp'];

// ---------- cấp độ ----------
export const xpOf = d => Math.floor((d.sec || 0) / 60 * 3 + (d.s || 0) + 2 * (d.c || 0) + 2 * (d.q || 0) + 3 * (d.d || 0) + 3 * (d.k || 0) + 2 * (d.x || 0) + 5 * (d.r || 0) + 5 * (d.w || 0) + 6 * (d.n || 0) + 8 * (d.t || 0));
const RANKS = [[1, 'Tân binh'], [3, 'Học đồ'], [5, 'Thợ luyện'], [8, 'Chiến binh'], [12, 'Hiệp sĩ'], [18, 'Pháp sư'], [25, 'Đại sư']];
export function levelOf(xp) {
  const L = Math.floor((1 + Math.sqrt(1 + xp * 0.08)) / 2), base = 50 * L * (L - 1), next = 50 * (L + 1) * L; // cần 50·L·(L−1) điểm để lên cấp L
  return { L, base, next, rank: RANKS.filter(r => L >= r[0]).pop()[1] };
}

// ---------- nhiệm vụ ----------
const q = (id, icon, name, goal, val, unit = 'câu', fixed = false) => ({ id, icon, name, goal, val, unit, fixed, show: v => `${Math.min(Math.floor(v), goal)}/${goal} ${unit}` });

export function dailyPool(g = prefs.goalMin || 15) {
  return [
    { ...q('time', '⏱', `Học đủ ${g} phút`, g * 60, a => a.sec, 'phút', true), show: v => `${Math.floor(v / 60)}/${g} phút` },
    q('shadow', '🗣', 'Shadow 20 câu', 20, a => a.s),
    q('read', '📖', 'Đọc 1 tài liệu hoặc ghi chú', 1, a => a.r, 'bài'),
    q('write', '✍️', 'Viết 1 ghi chú mới', 1, a => a.w, 'bài'),
    q('dict', '🎧', 'Chép chính tả 5 câu', 5, a => a.d),
    q('speak', '🎙', 'Luyện nói 5 câu', 5, a => a.k),
    q('cards', '📒', 'Ôn 10 thẻ', 10, a => a.c, 'thẻ'),
    q('quiz', '🧩', 'Bài tập hôm nay (10 câu)', 10, a => a.q),
    q('hw', '🖊', 'Viết 10 chữ', 10, a => a.x, 'chữ'),
    q('world', '🌍', 'Đọc xong 1 bài ở Thế giới của tôi', 1, a => a.n, 'bài'),
    q('test', '📋', 'Nộp 1 bài kiểm tra', 1, a => a.t, 'bài'),
    q('right', '🎯', 'Làm đúng 8 câu bài tập', 8, a => a.qc),
  ];
}
export const weeklyPool = () => [
  q('days', '📅', 'Học ít nhất 5 ngày trong tuần', 5, w => w.days, 'ngày'),
  q('time', '⏱', 'Học đủ 150 phút trong tuần', 150, w => w.sec / 60, 'phút'),
  q('goal', '🔥', 'Đạt mục tiêu thời gian 4 ngày', 4, w => w.goalDays, 'ngày'),
  q('shadow', '🗣', 'Shadow 150 câu', 150, w => w.s),
  q('cards', '📒', 'Ôn 70 thẻ', 70, w => w.c, 'thẻ'),
  q('quiz', '🧩', 'Làm 60 câu bài tập', 60, w => w.q),
  q('right', '🎯', 'Làm đúng 40 câu bài tập', 40, w => w.qc),
  q('test', '📋', 'Nộp 3 bài kiểm tra', 3, w => w.t, 'bài'),
  q('world', '🌍', 'Đọc xong 5 bài ở Thế giới của tôi', 5, w => w.n, 'bài'),
  q('write', '✍️', 'Viết 3 ghi chú', 3, w => w.w, 'bài'),
  q('dict', '🎧', 'Chép chính tả 25 câu', 25, w => w.d),
  q('speak', '🎙', 'Luyện nói 25 câu', 25, w => w.k),
  q('hw', '🖊', 'Viết 50 chữ', 50, w => w.x, 'chữ'),
];
export const monthlyPool = () => [
  q('days', '📅', 'Học ít nhất 20 ngày trong tháng', 20, m => m.days, 'ngày'),
  q('time', '⏱', 'Học đủ 600 phút trong tháng', 600, m => m.sec / 60, 'phút'),
  q('goal', '🔥', 'Đạt mục tiêu thời gian 15 ngày', 15, m => m.goalDays, 'ngày'),
  q('quiz', '🧩', 'Làm 250 câu bài tập', 250, m => m.q),
  q('test', '📋', 'Nộp 10 bài kiểm tra', 10, m => m.t, 'bài'),
  q('good', '🏅', 'Có 3 bài kiểm tra từ 80 điểm', 3, m => m.tp, 'bài'),
  q('world', '🌍', 'Đọc xong 20 bài ở Thế giới của tôi', 20, m => m.n, 'bài'),
  q('shadow', '🗣', 'Shadow 600 câu', 600, m => m.s),
  q('cards', '📒', 'Ôn 300 thẻ', 300, m => m.c, 'thẻ'),
  q('write', '✍️', 'Viết 12 ghi chú', 12, m => m.w, 'bài'),
];

// chọn một nhóm nhiệm vụ cố định cho mỗi ngày / tuần / tháng (cùng một ngày thì luôn ra cùng một bộ)
function pick(pool, n, seed) {
  const fixed = pool.filter(x => x.fixed), rest = shuffle(pool.filter(x => !x.fixed), rngOf(seed));
  return [...fixed, ...rest].slice(0, n);
}
export const dailyFor = date => pick(dailyPool(), 7, 'd' + date);
export const weekStart = date => { const dow = (new Date(date + 'T00:00:00Z').getUTCDay() + 6) % 7; return addDays(date, -dow); }; // thứ Hai
export const monthStart = date => date.slice(0, 7) + '-01';
export const weeklyFor = start => pick(weeklyPool(), 6, 'w' + start);
export const monthlyFor = start => pick(monthlyPool(), 5, 'm' + start);
export const WEEK_XP = 40, MONTH_XP = 150;

// Cộng số liệu của các ngày trong [from, to]
export function aggregate(m, from, to) {
  const a = { ...blankDay(from), days: 0, goalDays: 0 };
  const goal = (prefs.goalMin || 15) * 60;
  for (let d = from; d <= to; d = addDays(d, 1)) {
    const x = m.get(d); if (!x) continue;
    KEYS.forEach(k => { a[k] += x[k] || 0; });
    if (x.sec > 0) a.days++;
    if (x.sec >= goal) a.goalDays++;
  }
  return a;
}
export const monthEnd = start => { const d = new Date(start + 'T00:00:00Z'); d.setUTCMonth(d.getUTCMonth() + 1, 0); return d.toISOString().slice(0, 10); };
export const isDone = (def, agg) => def.val(agg) >= def.goal;

// XP thưởng cho mọi nhiệm vụ tuần / tháng đã hoàn thành trong lịch sử
export function bonusXp(m) {
  const weeks = new Set(), months = new Set();
  for (const d of m.keys()) { weeks.add(weekStart(d)); months.add(monthStart(d)); }
  let xp = 0;
  for (const s of weeks) { const a = aggregate(m, s, addDays(s, 6)); xp += weeklyFor(s).filter(x => isDone(x, a)).length * WEEK_XP; }
  for (const s of months) { const a = aggregate(m, s, monthEnd(s)); xp += monthlyFor(s).filter(x => isDone(x, a)).length * MONTH_XP; }
  return xp;
}

// ---------- thành tựu ----------
export const TIERS = ['bronze', 'silver', 'gold', 'diamond'];
export const TIER_NAME = { bronze: 'Đồng', silver: 'Bạc', gold: 'Vàng', diamond: 'Kim cương' };
const A = (id, glyph, name, desc, unit, tiers, stat) => ({ id, glyph, name, desc, unit, tiers, stat });
export const ACHIEVEMENTS = [
  A('time', 'time', 'Người bền bỉ', 'Tổng thời gian học', 'phút', [60, 600, 3000, 12000], t => t.sec / 60),
  A('days', 'cal', 'Chuyên cần', 'Số ngày có học', 'ngày', [7, 30, 100, 365], t => t.days),
  A('streak', 'flame', 'Lửa không tắt', 'Chuỗi ngày liên tiếp đạt mục tiêu thời gian', 'ngày', [3, 7, 30, 100], t => t.streak),
  A('shadow', 'mic', 'Người bóng', 'Số câu shadowing', 'câu', [100, 500, 2000, 10000], t => t.s),
  A('cards', 'card', 'Thẻ nhớ', 'Số lượt ôn thẻ', 'lượt', [100, 500, 2000, 10000], t => t.c),
  A('quiz', 'pencil', 'Người làm bài', 'Số câu bài tập đã làm', 'câu', [100, 500, 2000, 10000], t => t.q),
  A('right', 'target', 'Chính xác', 'Số câu bài tập làm đúng', 'câu', [50, 300, 1500, 8000], t => t.qc),
  A('test', 'check', 'Thí sinh', 'Số bài kiểm tra đã nộp', 'bài', [1, 10, 30, 100], t => t.t),
  A('good', 'star', 'Điểm cao', 'Số bài kiểm tra đạt từ 80 điểm', 'bài', [1, 5, 20, 60], t => t.tp),
  A('world', 'globe', 'Nhà thám hiểm', 'Số bài đã đọc xong ở Thế giới của tôi', 'bài', [1, 10, 40, 150], t => t.n),
  A('write', 'pencil', 'Cây bút', 'Số ghi chú đã viết', 'bài', [1, 10, 40, 150], t => t.w),
  A('read', 'book', 'Mọt sách', 'Số tài liệu, ghi chú, bài đã đọc', 'bài', [5, 30, 100, 400], t => t.r),
  A('dict', 'phones', 'Thính tai', 'Số câu chép chính tả', 'câu', [25, 150, 600, 3000], t => t.d),
  A('speak', 'mic', 'Giọng nói', 'Số câu luyện nói', 'câu', [25, 150, 600, 3000], t => t.k),
  A('hw', 'pencil', 'Nét chữ', 'Số chữ đã viết', 'chữ', [25, 150, 800, 4000], t => t.x),
  A('cups', 'trophy', 'Ngôi sao nhiệm vụ', 'Số ngày làm xong hết nhiệm vụ trong ngày', 'ngày', [1, 7, 30, 100], t => t.cups),
  A('level', 'up', 'Thăng cấp', 'Cấp độ đạt được', 'cấp', [3, 5, 10, 20], t => t.level),
];

// Quét nhật ký theo thời gian: ngày nào lần đầu đạt từng mốc thì ghi lại. Trả về { list, totals, got, total }
export function computeAchievements(m) {
  const dates = [...m.keys()].sort(), goal = (prefs.goalMin || 15) * 60;
  const t = { ...blankDay(''), days: 0, streak: 0, cups: 0, level: 1 };
  const when = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, [null, null, null, null]]));
  let run = 0, prevGoal = '', xp = 0;
  for (const d of dates) {
    const x = m.get(d);
    KEYS.forEach(k => { t[k] += x[k] || 0; });
    if (x.sec > 0) t.days++;
    if (x.sec >= goal) { run = prevGoal === addDays(d, -1) ? run + 1 : 1; prevGoal = d; t.streak = Math.max(t.streak, run); }
    if (dailyFor(d).every(def => isDone(def, x))) t.cups++;
    xp += xpOf(x); t.level = levelOf(xp).L;
    for (const a of ACHIEVEMENTS) { const v = a.stat(t); a.tiers.forEach((th, i) => { if (when[a.id][i] == null && v >= th) when[a.id][i] = d; }); }
  }
  const list = ACHIEVEMENTS.map(a => {
    const value = a.stat(t), got = when[a.id].filter(Boolean).length;
    return { def: a, value, got, next: a.tiers[got] ?? null, prev: got ? a.tiers[got - 1] : 0, when: when[a.id] };
  });
  return { list, totals: t, got: list.reduce((n, x) => n + x.got, 0), total: ACHIEVEMENTS.length * 4 };
}

// Báo thành tựu mới (mỗi máy nhớ riêng những gì đã báo)
export function newlyUnlocked(res) {
  const keys = res.list.flatMap(x => x.when.map((w, i) => (w ? `${x.def.id}:${i}` : null)).filter(Boolean));
  let seen = null;
  try { seen = JSON.parse(localStorage.getItem('achSeen') || 'null'); } catch { /* chưa có */ }
  try { localStorage.setItem('achSeen', JSON.stringify(keys)); } catch { /* bỏ qua */ }
  if (!seen) return [];
  const old = new Set(seen);
  return keys.filter(k => !old.has(k)).map(k => { const [id, i] = k.split(':'), x = res.list.find(y => y.def.id === id); return { def: x.def, tier: TIERS[+i] }; });
}

export const today = () => vnDate();
