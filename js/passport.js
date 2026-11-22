// Passport: sưu tầm thẻ văn hóa các nước bằng xu kiếm được từ việc học. Chưa mua = hình đen trắng; mua rồi hiện màu và đọc được nguồn gốc;
// mua đủ một mục nhỏ / mục lớn thì mở câu chuyện của mục đó. Xu = tổng xu kiếm được từ số liệu học (tài liệu "days", nên tự đồng bộ) trừ giá các thẻ đã mua.
// Văn bản giao diện ở đây chọn theo ngôn ngữ app bằng t(việt, anh); tiếng Trung hiện bản tiếng Anh. Thẻ chỉ có tiếng Việt / tiếng Anh, không kèm tiếng của nước đó.
import { $, $$, esc, toast, bus, vnDate, addDays } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as A from './achieve.js';
import { prefs } from './prefs.js';
import * as sfx from './sfx.js';
import { uiLang } from './i18n.js';
import { WORLD } from './pass-world.js';
let COUNT = {}; // số thẻ từng nước (nạp riêng để thiếu file này không làm hỏng cả app)
import('./pass-count.js').then(m => { COUNT = m.COUNT; if (active && K) draw(); }).catch(() => { /* bỏ qua: số thẻ sẽ được đếm khi nạp nước đó */ });

let K = null, ST = null; // K: kho thẻ (nạp khi mở lần đầu), ST: câu chuyện
const KEY = 'passport:v1', WELCOME = 100;
const HWV = 2;
const TEST_COINS = 300; // XU THỬ NGHIỆM: cộng thẳng vào số xu để thử mua. Khi thử xong, đổi thành 0 (xu đã mua vẫn giữ, chỉ không cộng thêm nữa).
let P = load(), root = null, active = false, pushT = 0;
const S = { group: 1, cc: 'jp', cont: 'as', reg: 'ea', lv: 'world', habOpen: true, he: '', hn: '', hc: '10' };
// CC / CC_CONT / CC_REG lấy từ pass-world.js: chỉ các nước đã có thẻ (có mã) mới vào đây
const CC = {}, CC_CONT = {}, CC_REG = {};
for (const ct of WORLD) for (const rg of ct.regions) for (const e of rg.c) { const [vi, en, code] = e.split('|'); if (code) { CC[code] = [vi, en]; CC_CONT[code] = ct.k; CC_REG[code] = rg.k; } }
const firstIn = rk => Object.keys(CC).find(c => CC_REG[c] === rk); // nước đầu tiên đã có thẻ trong một khu vực
const kk = (cc, x) => (cc === 'jp' ? x : cc + ':' + x); // khóa câu chuyện: Nhật giữ khóa cũ, nước khác thêm tiền tố
const mine = () => K.items.filter(i => i.cc === S.cc);
const t = (vi, en) => (uiLang === 'vi' ? vi : en);
const SUBEN = { 'Địa danh': 'Landmarks', 'Mùa và thiên nhiên': 'Seasons and nature', 'Vùng miền': 'Regions', 'Hiện tượng đặc biệt': 'Natural phenomena', 'Trang phục': 'Clothing', 'Phụ kiện': 'Accessories', 'Nhà ở và đồ dùng': 'Home and household', 'Thói quen và phép tắc': 'Habits and etiquette', 'Món ăn': 'Dishes', 'Đồ uống và trà đạo': 'Drinks and tea ceremony', 'Món theo mùa và dịp lễ': 'Seasonal and festive food', 'Quy tắc bàn ăn': 'Table manners', 'Lễ hội và ngày lễ': 'Festivals and holidays', 'Nhạc cụ': 'Instruments', 'Nghệ thuật biểu diễn': 'Performing arts', 'Nghệ thuật truyền thống khác': 'Other traditional arts', 'Văn hóa hiện đại': 'Modern culture', 'Động vật': 'Animals', 'Linh vật': 'Mascots and spirits', 'Tín ngưỡng': 'Beliefs', 'Nhân vật và lịch sử': 'History and figures', 'Người nổi tiếng': 'Famous people' };
const subName = s => t(s, SUBEN[s] || s);
const EARN = { 'Thời gian học': 'Study time', 'Ôn thẻ': 'Card reviews', 'Trả lời đúng': 'Correct answers', 'Đọc, viết, nghe, nói': 'Reading, writing, listening, speaking', 'Nhiệm vụ ngày': 'Daily quests', 'Đạt mục tiêu ngày': 'Daily goal reached', 'Thói quen': 'Habits', 'Thưởng chuỗi ngày': 'Streak bonus', 'Bài đọc Thế giới': 'World articles' };

// ---------- lưu / đồng bộ ----------
function load() {
  // hwv 2: lần đổi xu thử nghiệm 3000 → 300, đặt lại mức xu cao nhất một lần (xu thử cũ bị thu hồi)
  try { const o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o) { const mig = !(o.hwv >= HWV); return { own: o.own || [], since: o.since || '', hw: mig ? 0 : o.hw || 0, hwv: HWV, seen: o.seen || [], last: mig ? 0 : o.last || 0, eq: o.eq || {}, eqT: o.eqT || 0, paid: o.paid || {}, extra: o.extra || 0, chestD: o.chestD || '', qz: o.qz || { d: '', n: 0 }, wk: o.wk || null, stamps: o.stamps || [] }; } } catch { /* bỏ qua */ }
  return { own: [], since: '', hw: 0, hwv: HWV, seen: [], last: 0, eq: {}, eqT: 0, paid: {}, extra: 0, chestD: '', qz: { d: '', n: 0 }, wk: null, stamps: [] };
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* bỏ qua */ } clearTimeout(pushT); pushT = setTimeout(() => store.put('prefs', 'passport', { ...P }), 2000); }
function pull() { // gộp với bản từ máy khác: thẻ đã mua lấy hợp, xu cao nhất lấy số lớn hơn
  if (hpull() && active && K) draw();
  const r = store.get('prefs', 'passport'); if (!r) return;
  const own = new Set([...P.own, ...(r.own || [])]), seen = new Set([...P.seen, ...(r.seen || [])]);
  const since = [P.since, r.since].filter(Boolean).sort()[0] || '';
  let hw = P.hw, hwv = P.hwv || 0; // bản xu mới hơn (hwv lớn hơn) thắng; cùng bản thì lấy xu cao hơn
  if ((r.hwv || 0) > hwv) { hw = r.hw || 0; hwv = r.hwv; } else if ((r.hwv || 0) === hwv) hw = Math.max(hw, r.hw || 0);
  const paid = { ...(r.paid || {}), ...(P.paid || {}) };
  const extra = Math.max(P.extra || 0, r.extra || 0), chestD = [P.chestD || '', r.chestD || ''].sort().pop(), stamps = [...new Set([...(P.stamps || []), ...(r.stamps || [])])];
  const qz = (r.qz?.d || '') > (P.qz?.d || '') || ((r.qz?.d || '') === (P.qz?.d || '') && (r.qz?.n || 0) > (P.qz?.n || 0)) ? r.qz : (P.qz || { d: '', n: 0 });
  let wk = P.wk; if (r.wk && (!wk || r.wk.k > wk.k)) wk = r.wk; else if (r.wk && wk && r.wk.k === wk.k) wk = { ...wk, n: Math.max(wk.n || 0, r.wk.n || 0), claimed: !!(wk.claimed || r.wk.claimed) };
  const more = extra !== (P.extra || 0) || chestD !== (P.chestD || '') || stamps.length !== (P.stamps || []).length || JSON.stringify(qz) !== JSON.stringify(P.qz) || JSON.stringify(wk) !== JSON.stringify(P.wk);
  const ch = more || own.size !== P.own.length || seen.size !== P.seen.length || since !== P.since || hw !== P.hw || hwv !== (P.hwv || 0) || Object.keys(paid).length !== Object.keys(P.paid || {}).length || (r.eqT || 0) > (P.eqT || 0);
  const eqNew = (r.eqT || 0) > (P.eqT || 0);
  P = { own: [...own], seen: [...seen], since, hw, hwv, paid, extra, chestD, qz, wk, stamps, last: Math.max(P.last, r.last || 0), eq: eqNew ? (r.eq || {}) : (P.eq || {}), eqT: Math.max(P.eqT || 0, r.eqT || 0) };
  if (K && missing()) ensure(S.cc).then(() => { bus.emit('lame'); if (active) draw(); }); // thẻ mới mua ở máy khác thuộc nước chưa nạp
  if (eqNew) bus.emit('lame');
  if (ch) { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* bỏ qua */ } if (active && K) draw(); }
}

// ---------- xu ----------
export const priceOf = it => (it.scene ? 40 : it.use === 'wear' ? 60 : it.use === 'pet' ? 50 : it.use === 'hold' ? 40 : 35) + (it.gr === 5 ? 5 : 0);
function dayParts(date, d) {
  const m = Math.floor((d.sec || 0) / 60), act = (d.r || 0) + (d.w || 0) + (d.d || 0) + (d.k || 0) + (d.x || 0);
  const ds = A.dailyFor(date), done = ds.filter(q => A.isDone(q, d)).length, goal = (prefs.goalMin || 15) * 60;
  return [
    ['Thời gian học', m * 2], ['Ôn thẻ', Math.floor((d.c || 0) / 2)], ['Trả lời đúng', d.qc || 0], // không có trần mỗi ngày
    ['Đọc, viết, nghe, nói', act * 2], ['Bài đọc Thế giới', (d.n || 0) * 13], ['Nhiệm vụ ngày', done * 8 + (ds.length && done === ds.length ? 20 : 0)], ['Đạt mục tiêu ngày', (d.sec || 0) >= goal ? 15 : 0],
  ];
}
function earned() {
  if (!P.since) return 0;
  const m = tracker.byDate(), today = vnDate();
  let sum = WELCOME + TEST_COINS + (P.extra || 0); // extra: xu từ rương, đố vui, thử thách tuần, tem
  for (const d of Object.keys(HB.days)) if (d <= today) sum += habitCoins(d);
  for (const [d, x] of m) if (d >= P.since && d <= today) { const b = dayParts(d, x).reduce((n, [, v]) => n + v, 0); sum += b + streakBonus(m, d, b); }
  for (let s = A.weekStart(P.since); s <= today; s = addDays(s, 7)) { const e = addDays(s, 6); sum += A.weeklyFor(s).filter(q => A.isDone(q, A.aggregate(m, s, e < today ? e : today))).length * 30; }
  for (let s = A.monthStart(P.since); s <= today; s = addDays(A.monthEnd(s), 1)) { const e = A.monthEnd(s); sum += A.monthlyFor(s).filter(q => A.isDone(q, A.aggregate(m, s, e < today ? e : today))).length * 100; }
  return sum;
}
const spent = () => P.own.reduce((n, id) => n + (P.paid?.[id] ?? (K?.byId[id] ? priceOf(K.byId[id]) : 0)), 0); // giá đã trả lúc mua (có thể được giảm)
// thưởng chuỗi ngày học: mỗi ngày học liên tiếp trước đó +10% xu của ngày, tối đa +50%
const studied = d => !!d && (d.sec || 0) >= 60;
function streakDays(m, date) { let n = 0; for (let d = addDays(date, -1); n < 5; d = addDays(d, -1)) { if (studied(m.get(d))) n++; else break; } return n; }
const streakPct = (m, date) => 10 * streakDays(m, date);
const streakBonus = (m, date, base) => (studied(m.get(date)) ? Math.floor(base * streakPct(m, date) / 100) : 0);
// giảm giá: thẻ cuối còn lại của một mục nhỏ được giảm một nửa
function curPrice(it) {
  const base = priceOf(it), sub = K ? K.items.filter(i => i.cc === it.cc && i.sub === it.sub) : [];
  return sub.length > 1 && sub.filter(i => !own(i.id)).length === 1 && !own(it.id) ? Math.round(base / 2) : base;
}
function balance() { const e = Math.max(P.hw, earned()); if (e > P.hw) { P.hw = e; save(); } return Math.max(0, e - spent()); } // xu kiếm được không bao giờ giảm lại (đổi mục tiêu ngày không làm mất xu)
function todayParts() {
  const m = tracker.byDate(), d = m.get(vnDate()) || A.blankDay(vnDate()), parts = dayParts(vnDate(), d), base = parts.reduce((n, [, v]) => n + v, 0);
  return [...parts, ['Thưởng chuỗi ngày', streakBonus(m, vnDate(), base)], ['Thói quen', habitCoins(vnDate())]];
}

// ---------- thói quen hằng ngày (daily habit): tự thêm, tự đặt xu thưởng, tick mỗi ngày ----------
const HKEY = 'habits:v1';
function hload() {
  try { const o = JSON.parse(localStorage.getItem(HKEY) || 'null'); if (o) return { list: o.list || [], days: o.days || {}, t: o.t || 0 }; } catch { /* bỏ qua */ }
  return { list: [], days: {}, t: 0 };
}
let HB = hload(), habPushT = 0;
const habList = () => HB.list.filter(x => !x.del);
const habDone = (date, id) => (HB.days[date] || []).includes(id);
function habitCoins(date) { return (HB.days[date] || []).reduce((n, id) => n + (+(HB.list.find(x => x.id === id)?.coins) || 0), 0); } // thói quen đã xóa vẫn giữ xu đã nhận
function hsave() {
  HB.t = Date.now(); try { localStorage.setItem(HKEY, JSON.stringify(HB)); } catch { /* bỏ qua */ }
  clearTimeout(habPushT); habPushT = setTimeout(() => store.put('prefs', 'habits', { list: HB.list, t: HB.t, ...Object.fromEntries(Object.entries(HB.days).map(([d, a]) => ['d_' + d, a])) }), 2000);
}
function hpull() { // gộp với máy khác: danh sách thói quen theo từng mục mới nhất, lịch tick lấy bản mới hơn
  const r = store.get('prefs', 'habits'); if (!r || !(r.t > HB.t)) return false;
  const byId = new Map(HB.list.map(x => [x.id, x]));
  for (const x of r.list || []) { const y = byId.get(x.id); if (!y || (x.t || 0) > (y.t || 0)) byId.set(x.id, x); }
  const days = {}; for (const k of Object.keys(r)) if (k.startsWith('d_') && Array.isArray(r[k]) && r[k].length) days[k.slice(2)] = r[k];
  HB = { list: [...byId.values()], days, t: r.t }; try { localStorage.setItem(HKEY, JSON.stringify(HB)); } catch { /* bỏ qua */ }
  return true;
}
function habRedraw() { if (active && K) draw(); bus.emit('habits'); } // vẽ lại Passport (nếu đang mở) và mục Nhiệm vụ
function habToggle(id) {
  const d = vnDate(), a = new Set(HB.days[d] || []); if (a.has(id)) a.delete(id); else { a.add(id); sfx.play('reward'); }
  if (a.size) HB.days[d] = [...a]; else delete HB.days[d]; hsave(); habRedraw();
}
function habSave() {
  const name = (S.hn || '').trim(), coins = Math.max(0, Math.min(9999, Math.round(+S.hc || 0)));
  if (!name) { toast(t('Hãy nhập tên thói quen.', 'Enter a habit name.')); return; }
  if (S.he) { const x = HB.list.find(y => y.id === S.he); if (x) Object.assign(x, { name, coins, t: Date.now() }); }
  else HB.list.push({ id: 'h' + Date.now().toString(36), name, coins, t: Date.now() });
  S.he = ''; S.hn = ''; S.hc = '10'; hsave(); habRedraw();
}
function habDel(id) { const x = HB.list.find(y => y.id === id); if (!x || !confirm(t(`Xóa thói quen "${x.name}"? Xu đã nhận vẫn được giữ.`, `Delete the habit "${x.name}"? Coins already earned are kept.`))) return; x.del = true; x.t = Date.now(); hsave(); habRedraw(); }

// ---------- cơ chế vui: rương ngày, đố vui văn hóa, thử thách tuần, tem bộ đồ ----------
const QZ_MAX = 3, WK_GOAL = 5; // đố vui tối đa 3 lượt/ngày; thử thách tuần: mua 5 thẻ của nước được chọn
const goalDone = () => { const d = tracker.byDate().get(vnDate()); return !!d && (d.sec || 0) >= (prefs.goalMin || 15) * 60; };
const chestReady = () => goalDone() && P.chestD !== vnDate();
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
function giveFree(list) { const c = list[Math.floor(Math.random() * list.length)]; if (!c) return null; P.own.push(c.id); (P.paid ||= {})[c.id] = 0; return c; }
function openChest() { // rương mỗi ngày sau khi đạt mục tiêu: xu ngẫu nhiên, thỉnh thoảng tặng một thẻ
  if (!chestReady()) return;
  P.chestD = vnDate(); const r = Math.random(), free = K.items.filter(i => !own(i.id)); let msg;
  if (r < 0.15 && free.length) { const c = giveFree(free); msg = t(`🎁 Rương tặng thẻ: ${name(c)}!`, `🎁 The chest gave a card: ${name(c)}!`); }
  else { const n = r < 0.6 ? 10 + Math.floor(Math.random() * 21) : r < 0.9 ? 30 + Math.floor(Math.random() * 21) : 50 + Math.floor(Math.random() * 21); P.extra = (P.extra || 0) + n; msg = t(`🎁 Rương tặng ${n} xu!`, `🎁 The chest gave ${n} coins!`); }
  save(); sfx.play('reward'); toast(msg, 3500); draw();
}
function weekNow() { // nước của thử thách tuần chọn cố định theo tuần nên mọi máy đều giống nhau
  const ws = A.weekStart(vnDate()), ccs = Object.keys(CC);
  if (!P.wk || P.wk.k !== ws) P.wk = { k: ws, cc: ccs[Math.floor(Date.parse(ws) / 6048e5) % ccs.length], n: 0, claimed: false };
  return P.wk;
}
async function claimWeek() {
  const w = weekNow(); if (w.claimed || w.n < WK_GOAL) return;
  w.claimed = true; P.extra = (P.extra || 0) + 60;
  await loadCC(w.cc).catch(() => {});
  const c = giveFree(K.items.filter(i => i.cc === w.cc && !own(i.id)));
  save(); sfx.play('reward'); toast(c ? t(`🎯 Hoàn thành! +60 xu và thẻ ${name(c)}`, `🎯 Done! +60 coins and the card ${name(c)}`) : t('🎯 Hoàn thành! +60 xu', '🎯 Done! +60 coins'), 4000); draw();
}
function checkStamps() { // mặc đủ ≥3 món của cùng một nước thì được tem + 30 xu (một lần mỗi nước)
  if (!K) return; const cnt = {};
  for (const id of Object.values(P.eq || {})) { const c = K.byId[id]?.cc; if (c) cnt[c] = (cnt[c] || 0) + 1; }
  for (const [c, n] of Object.entries(cnt)) if (n >= 3 && CC[c] && !(P.stamps || []).includes(c)) { (P.stamps ||= []).push(c); P.extra = (P.extra || 0) + 30; toast(t(`🛂 Tem mới: ${CC[c][0]}! +30 xu`, `🛂 New stamp: ${CC[c][1]}! +30 coins`), 4000); }
}
function buildQuiz() {
  const pool = K.items.filter(i => own(i.id) && i.note); if (pool.length < 3) return null;
  return shuffle(pool).slice(0, 3).map(it => {
    const word = it.vi.split(' (')[0], q = word.length > 2 ? it.note.split(word).join('…') : it.note;
    const others = shuffle(K.items.filter(i => i.id !== it.id && i.vi !== it.vi)).slice(0, 3);
    return { q, ans: it.id, opts: shuffle([it, ...others]).map(i => i.id) };
  });
}
const quizToday = () => (P.qz?.d === vnDate() ? P.qz.n : 0);
function startQuiz() {
  if (quizToday() >= QZ_MAX) { toast(t('Hôm nay đã hết lượt đố vui, mai chơi tiếp nhé.', 'No quiz rounds left today.')); return; }
  const qs = buildQuiz(); if (!qs) { toast(t('Cần mua ít nhất 3 thẻ để chơi đố vui.', 'Buy at least 3 cards to play the quiz.')); return; }
  S.quiz = { qs, i: 0, right: 0, pick: null }; draw();
}
function quizAnswer(k) { const z = S.quiz; if (!z || z.pick !== null) return; z.pick = k; if (z.qs[z.i].opts[k] === z.qs[z.i].ans) { z.right++; sfx.play('unlock'); } draw(); }
function quizNext() {
  const z = S.quiz; if (!z || z.pick === null) return; z.pick = null; z.i++;
  if (z.i >= z.qs.length) { z.done = true; z.coins = z.right * 5 + (z.right === z.qs.length ? 10 : 0); P.qz = { d: vnDate(), n: quizToday() + 1 }; if (z.coins) { P.extra = (P.extra || 0) + z.coins; sfx.play('reward'); } save(); }
  draw();
}
function quizHtml() {
  const z = S.quiz;
  if (z.done) return `<div class="pp-quiz"><b>${t('Kết quả', 'Result')}: ${z.right}/${z.qs.length}</b><div>${z.coins ? `+${z.coins} 🪙` : t('Lần sau sẽ tốt hơn!', 'Better luck next time!')}</div><button class="btn primary" data-fun="qclose">${t('Xong', 'Done')}</button></div>`;
  const q = z.qs[z.i];
  return `<div class="pp-quiz"><small class="dim">🧠 ${t('Đố vui văn hóa', 'Culture quiz')} · ${z.i + 1}/${z.qs.length}</small><p class="gt">${esc(q.q)}</p><div class="pp-qopts">${q.opts.map((id, k) => { const st = z.pick === null ? '' : id === q.ans ? ' ok' : k === z.pick ? ' bad' : ''; return `<button class="pp-qo${st}" data-fun="qa" data-k="${k}" ${z.pick !== null ? 'disabled' : ''}>${esc(name(K.byId[id]))}</button>`; }).join('')}</div>
    <div class="row">${z.pick !== null ? `<button class="btn primary" data-fun="qnext">${z.i + 1 >= z.qs.length ? t('Xem kết quả', 'See result') : t('Tiếp →', 'Next →')}</button>` : ''}<button class="btn" data-fun="qclose">${t('Thoát', 'Quit')}</button></div></div>`;
}
function funHtml() {
  const w = weekNow(), cn = CC[w.cc][uiLang === 'vi' ? 0 : 1], left = QZ_MAX - quizToday(), st = P.stamps || [];
  const chest = chestReady() ? `<button class="btn primary" data-fun="chest">${t('Mở rương', 'Open')}</button>` : `<small class="dim">${P.chestD === vnDate() ? t('Đã mở hôm nay ✓', 'Opened today ✓') : t('Đạt mục tiêu ngày để mở', 'Reach today’s goal to open')}</small>`;
  const wk = w.claimed ? `<small class="dim">${t('Đã nhận thưởng ✓', 'Reward claimed ✓')}</small>` : w.n >= WK_GOAL ? `<button class="btn primary" data-fun="claimwk">${t('Nhận thưởng', 'Claim')}</button>` : `<small class="dim">${w.n}/${WK_GOAL}</small>`;
  return `<div class="pp-fun">
    <div class="pp-fc"><b>🎁 ${t('Rương mỗi ngày', 'Daily chest')}</b><span class="dim">${t('Xu ngẫu nhiên, đôi khi tặng thẻ', 'Random coins, sometimes a card')}</span>${chest}</div>
    <div class="pp-fc"><b>🧠 ${t('Đố vui văn hóa', 'Culture quiz')}</b><span class="dim">${t('3 câu về thẻ bạn đã mua, +5 xu mỗi câu đúng (+10 nếu đúng cả 3)', '3 questions on cards you own, +5 per correct (+10 for 3/3)')}</span>${left > 0 ? `<button class="btn" data-fun="quiz">${t('Chơi', 'Play')} (${left})</button>` : `<small class="dim">${t('Hết lượt hôm nay', 'Done for today')}</small>`}</div>
    <div class="pp-fc"><b>🎯 ${t('Thử thách tuần', 'Weekly challenge')}: ${esc(cn)}</b><span class="dim">${t(`Mua ${WK_GOAL} thẻ của ${cn} trong tuần: +60 xu và 1 thẻ miễn phí`, `Buy ${WK_GOAL} ${cn} cards this week: +60 coins and a free card`)}</span>${wk}</div>
    <div class="pp-fc"><b>🛂 ${t('Tem hộ chiếu', 'Passport stamps')}</b><span class="dim">${t('Cho Lame mặc đủ 3 món của cùng một nước để được tem (+30 xu)', 'Dress Lame in 3 items from one country to earn its stamp (+30 coins)')}</span>${st.length ? `<span class="pp-stamps">${st.map(c => `<canvas class="ppFlag" data-cc="${c}" width="64" height="48" title="${esc(CC[c][uiLang === 'vi' ? 0 : 1])}"></canvas>`).join('')}</span>` : `<small class="dim">${t('Chưa có tem', 'No stamps yet')}</small>`}</div>
  </div>`;
}
// ---------- vẽ ----------
const gray = g => g.map(row => row.map(c => { if (!c) return null; const n = parseInt(c.slice(1), 16), r = n >> 16, gg = (n >> 8) & 255, b = n & 255, y = Math.round(0.3 * r + 0.59 * gg + 0.11 * b), v = Math.max(28, Math.round(y * 0.62)); return '#' + [v, v, v].map(x => x.toString(16).padStart(2, '0')).join(''); }));
const cache = new Map();
function sprite(it, colored) { // canvas mới mỗi lần; lưới được nhớ lại
  let g = cache.get(it.id); if (!g) { g = K.render(it); cache.set(it.id, g); }
  const cv = document.createElement('canvas'); K.paint(cv, colored ? g : gray(g), g.length > 20 ? 4 : 5); return cv;
}
const GROUP = {
  1: ['Nơi chốn và thiên nhiên', 'Places and nature', '🏯'], 2: ['Con người và đời sống', 'People and daily life', '👘'], 3: ['Ẩm thực', 'Food and drink', '🍣'],
  4: ['Văn hóa và nghệ thuật', 'Culture and arts', '🎎'], 5: ['Con vật, linh vật, tín ngưỡng, lịch sử', 'Animals, mascots, beliefs, history', '⛩'],
};
const gName = g => t(GROUP[g][0], GROUP[g][1]);
const own = id => P.own.includes(id), name = it => t(it.vi, it.en);
const subsOf = g => [...new Set(mine().filter(i => i.gr === g).map(i => i.sub))];
const stat = list => ({ n: list.filter(i => own(i.id)).length, t: list.length });
const lastVideo = () => store.list('items').filter(i => i.type !== 'note' && (+i.position || 0) > 0 && i.study !== false).sort((a, b) => (b.u || 0) - (a.u || 0))[0] || null;

// biểu tượng châu: hình bóng lãnh thổ riêng của từng châu, vẽ kiểu pixel (lưới 32×24, phóng gấp đôi), mỗi châu một màu
const SHAPES = {
  as: { c: '#ffb703', p: [[[3, 9], [6, 5], [11, 3], [17, 2], [24, 3], [29, 6], [30, 10], [27, 13], [26, 17], [23, 21], [20, 17], [17, 20], [15, 15], [11, 14], [8, 12], [4, 12]]] },
  af: { c: '#fb8500', p: [[[9, 3], [15, 2], [21, 4], [24, 8], [22, 12], [21, 17], [18, 22], [14, 21], [12, 16], [8, 13], [5, 9], [6, 5]]] },
  eu: { c: '#4a9be8', p: [[[3, 13], [5, 8], [9, 5], [10, 2], [14, 4], [19, 3], [24, 5], [28, 4], [29, 9], [24, 11], [20, 10], [18, 14], [21, 18], [17, 19], [14, 15], [10, 19], [7, 17], [7, 13]]] },
  am: { c: '#4fbf6a', p: [[[4, 3], [10, 1], [16, 2], [18, 5], [15, 8], [14, 10], [16, 12], [20, 13], [21, 16], [18, 20], [15, 23], [13, 19], [13, 14], [10, 11], [7, 9], [5, 6]]] },
  oc: { c: '#a06bdc', p: [[[4, 10], [9, 7], [15, 7], [19, 5], [22, 9], [21, 15], [16, 18], [10, 17], [6, 15]], [[25, 16], [27, 15], [26, 20], [24, 21]], [[22, 2], [28, 3], [26, 6]]] },
  an: { c: '#e8f2ff', p: [[[3, 16], [8, 13], [13, 14], [16, 11], [21, 13], [26, 13], [29, 17], [26, 21], [16, 22], [6, 21]]] },
};
function drawCont(cv, k) {
  const sh = SHAPES[k]; const c = cv.getContext('2d'); c.clearRect(0, 0, 64, 48); if (!sh) return;
  const tmp = document.createElement('canvas'); tmp.width = 32; tmp.height = 24; const g = tmp.getContext('2d');
  g.fillStyle = '#000'; for (const poly of sh.p) { g.beginPath(); poly.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill(); }
  const d = g.getImageData(0, 0, 32, 24).data, on = (x, y) => x >= 0 && y >= 0 && x < 32 && y < 24 && d[(y * 32 + x) * 4 + 3] > 110;
  for (let y = 0; y < 24; y++) for (let x = 0; x < 32; x++) {
    if (on(x, y)) { c.fillStyle = on(x, y - 1) ? sh.c : '#ffffff55'; c.fillStyle = sh.c; c.fillRect(x * 2, y * 2, 2, 2); if (!on(x, y + 1) || !on(x + 1, y)) { c.fillStyle = 'rgba(0,0,0,.28)'; c.fillRect(x * 2, y * 2 + (on(x, y + 1) ? 0 : 1), 2, on(x, y + 1) ? 2 : 1); } }
    else if (on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1)) { c.fillStyle = '#2b1d3a'; c.fillRect(x * 2, y * 2, 2, 2); }
  }
}
// khối thói quen hằng ngày: hiện ở mục Nhiệm vụ (quests.js gọi hàm này)
export function habitHtml() {
  hpull();
  const hl = habList(), hDone = hl.filter(x => habDone(vnDate(), x.id)).length, hToday = habitCoins(vnDate());
  return `<div class="pp-hab"><button class="pp-hh" data-hab="toggle"><b>✅ ${t('Thói quen hằng ngày', 'Daily habits')}</b><small>${hDone}/${hl.length}</small><span class="grow"></span><small>+${hToday} 🪙</small><span>${S.habOpen ? '▾' : '▸'}</span></button>
    <div class="pp-hbody" ${S.habOpen ? '' : 'hidden'}>${hl.map(x => `<div class="pp-hr${habDone(vnDate(), x.id) ? ' done' : ''}"><button class="pp-hc" data-hc="${x.id}" aria-label="${t('Đánh dấu hoàn thành', 'Mark done')}">${habDone(vnDate(), x.id) ? '☑' : '☐'}</button><span class="gt grow">${esc(x.name)}</span><b>+${+x.coins || 0} 🪙</b><button class="pp-hi" data-he="${x.id}" aria-label="${t('Sửa', 'Edit')}">✏️</button><button class="pp-hi" data-hd="${x.id}" aria-label="${t('Xóa', 'Delete')}">✕</button></div>`).join('') || `<div class="dim">${t('Chưa có thói quen nào. Thêm thói quen của bạn bên dưới, mỗi lần tick xong sẽ nhận xu bạn đặt.', 'No habits yet. Add your own below; each time you tick one you earn the coins you set.')}</div>`}
      <div class="pp-hf"><input id="habName" class="gt" maxlength="60" placeholder="${t('Tên thói quen (vd: Uống đủ nước)', 'Habit name (e.g. Drink water)')}" value="${esc(S.hn)}"><input id="habCoins" type="number" min="0" max="9999" inputmode="numeric" value="${esc(S.hc)}" aria-label="${t('Xu thưởng', 'Coin reward')}"><span class="dim">🪙</span>
        <button class="btn primary" data-hab="save">${S.he ? t('Lưu', 'Save') : t('Thêm', 'Add')}</button>${S.he ? `<button class="btn" data-hab="cancel">${t('Hủy', 'Cancel')}</button>` : ''}</div></div></div>`;
}

function drawFlag(cv, cc) { // cờ pixel nhỏ cho ô chọn nước
  const c = cv.getContext('2d'); c.fillStyle = '#fff'; c.fillRect(0, 0, 64, 48);
  if (cc === 'jp') { c.fillStyle = '#e8452c'; c.beginPath(); c.arc(32, 24, 14, 0, 7); c.fill(); return; }
  if (cc === 'in') { // cờ Ấn Độ: cam, trắng, xanh lá và bánh xe Ashoka Chakra
    c.fillStyle = '#ff9933'; c.fillRect(0, 0, 64, 16); c.fillStyle = '#fff'; c.fillRect(0, 16, 64, 16); c.fillStyle = '#138808'; c.fillRect(0, 32, 64, 16);
    c.strokeStyle = '#000080'; c.lineWidth = 2; c.beginPath(); c.arc(32, 24, 6, 0, 7); c.stroke();
    c.lineWidth = 1; c.beginPath(); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.moveTo(32, 24); c.lineTo(32 + Math.cos(a) * 6, 24 + Math.sin(a) * 6); } c.stroke();
    return;
  }
  if (cc === 'nz') { // cờ New Zealand: nền xanh, góc Union Jack, bốn ngôi sao đỏ
    c.fillStyle = '#00247d'; c.fillRect(0, 0, 64, 48);
    c.fillStyle = '#fff'; c.fillRect(0, 0, 30, 22); c.fillStyle = '#012169'; c.fillRect(1, 1, 28, 20);
    c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(30, 22); c.moveTo(30, 0); c.lineTo(0, 22); c.stroke();
    c.fillStyle = '#fff'; c.fillRect(12, 0, 6, 22); c.fillRect(0, 8, 30, 6);
    c.fillStyle = '#cc142b'; c.fillRect(13, 0, 4, 22); c.fillRect(0, 9, 30, 4);
    for (const [x, y] of [[46, 10], [40, 22], [52, 24], [46, 36]]) { c.fillStyle = '#fff'; c.fillRect(x - 3, y - 3, 6, 6); c.fillStyle = '#cc142b'; c.fillRect(x - 2, y - 2, 4, 4); }
    return;
  }
  if (cc === 'us') { // cờ Mỹ: 13 sọc đỏ trắng, ô xanh với các ngôi sao
    c.fillStyle = '#fff'; c.fillRect(0, 0, 64, 48);
    for (let i = 0; i < 7; i++) { c.fillStyle = '#b22234'; c.fillRect(0, i * 7, 64, 3.6); }
    c.fillStyle = '#3c3b6e'; c.fillRect(0, 0, 28, 25);
    c.fillStyle = '#fff'; for (let y = 0; y < 4; y++) for (let x = 0; x < 5; x++) c.fillRect(3 + x * 5, 3 + y * 5, 2, 2);
    return;
  }
  if (cc === 'eg') { // cờ Ai Cập: đỏ, trắng, đen và đại bàng vàng ở giữa
    c.fillStyle = '#ce1126'; c.fillRect(0, 0, 64, 16); c.fillStyle = '#fff'; c.fillRect(0, 16, 64, 16); c.fillStyle = '#000'; c.fillRect(0, 32, 64, 16);
    c.fillStyle = '#c09300'; c.fillRect(29, 18, 6, 11); c.fillRect(24, 20, 5, 4); c.fillRect(35, 20, 5, 4); c.fillRect(26, 25, 12, 3); c.fillRect(30, 15, 4, 4); return;
  }
  if (cc === 'fr') { c.fillStyle = '#0055a4'; c.fillRect(0, 0, 22, 48); c.fillStyle = '#fff'; c.fillRect(22, 0, 21, 48); c.fillStyle = '#ef4135'; c.fillRect(43, 0, 21, 48); return; }
  if (cc === 'vn') {
    c.fillStyle = '#da251d'; c.fillRect(0, 0, 64, 48); c.fillStyle = '#ffff00'; c.beginPath();
    for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 6 : 15; c.lineTo(32 + Math.cos(a) * r, 25 + Math.sin(a) * r); }
    c.closePath(); c.fill(); return;
  }
  if (cc === 'cn') {
    c.fillStyle = '#de2910'; c.fillRect(0, 0, 64, 48); c.fillStyle = '#ffde00';
    const star = (x, y, r, rot) => { c.beginPath(); for (let i = 0; i < 10; i++) { const a = rot + i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * 0.4 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fill(); };
    star(12, 12, 8, 0); star(23, 5, 2.6, 0.5); star(27, 11, 2.6, 0.2); star(27, 18, 2.6, 0); star(23, 24, 2.6, 0.3);
    return;
  }
  c.fillStyle = '#cd2e3a'; c.beginPath(); c.arc(32, 24, 11, Math.PI, 0); c.fill();
  c.fillStyle = '#0047a0'; c.beginPath(); c.arc(32, 24, 11, 0, Math.PI); c.fill();
  c.fillStyle = '#0047a0'; c.beginPath(); c.arc(26.5, 24, 5.5, 0, 7); c.fill();
  c.fillStyle = '#cd2e3a'; c.beginPath(); c.arc(37.5, 24, 5.5, 0, 7); c.fill();
  c.fillStyle = '#111';
  const tri = (x, y, broken) => { for (let i = 0; i < 3; i++) { const yy = y + i * 4; if (broken[i]) { c.fillRect(x, yy, 4, 2); c.fillRect(x + 6, yy, 4, 2); } else c.fillRect(x, yy, 10, 2); } };
  tri(4, 4, [0, 0, 0]); tri(50, 32, [1, 1, 1]); tri(50, 4, [1, 0, 1]); tri(4, 32, [0, 1, 0]);
}

function draw() {
  if (!K || !root) return;
  const bal = balance(), today = todayParts(), todayTot = today.reduce((n, p) => n + p[1], 0), fresh = bal - (P.last || 0);
  const all = stat(mine()), openHow = $('#ppHowBox', root) && !$('#ppHowBox', root).hidden;
  const h = [];
  h.push(`<div class="pp-top"><div class="pp-coins">🪙 <b>${bal}</b></div>${streakPct(tracker.byDate(), vnDate()) ? `<span class="pp-new">🔥 ${t('Chuỗi', 'Streak')} +${streakPct(tracker.byDate(), vnDate())}%</span>` : ''}${fresh > 0 && P.last ? `<span class="pp-new">+${fresh} ${t('xu mới', 'new coins')}</span>` : ''}
    <span class="grow"></span><button class="btn" id="ppHow">❓ ${t('Cách kiếm xu', 'How to earn coins')}</button></div>`);
  h.push(`<div class="pp-how" id="ppHowBox" ${openHow ? '' : 'hidden'}><b>${t(`Hôm nay đã kiếm được ${todayTot} xu`, `Earned today: ${todayTot} coins`)}</b>${today.map(([k, n]) => `<div class="ppr"><span>${esc(t(k, EARN[k] || k))}</span><b>+${n}</b></div>`).join('')}
    <div class="dim">${t('Xu tính từ việc học thật: phút học, thẻ ôn, câu trả lời đúng, nhiệm vụ ngày (+8 mỗi nhiệm vụ, +20 khi xong hết), đạt mục tiêu ngày (+15), nhiệm vụ tuần (+30), nhiệm vụ tháng (+100) và thói quen do bạn tự đặt. Không có mức tối đa. Học liên tiếp nhiều ngày được thưởng thêm 10% xu mỗi ngày liên tiếp (tối đa +50%), và thẻ cuối còn lại của một mục nhỏ được giảm nửa giá. Đọc bài ở Thế giới: +15 xu mỗi bài đọc xong lần đầu, +10 xu khi làm bài đạt từ 80% lần đầu, và thời gian đọc được tính như thời gian học. Thêm xu từ rương mỗi ngày, đố vui văn hóa, thử thách tuần và tem hộ chiếu.', 'Coins come from real study: study minutes, card reviews, correct answers, daily quests (+8 each, +20 when all are done), reaching the daily goal (+15), weekly quests (+30), monthly quests (+100) and your own habits. There is no cap. Studying on consecutive days adds 10% per day in a row (up to +50%), and the last remaining card of a sub-section is half price. Reading in World: +15 coins per article finished for the first time, +10 when you score 80%+ for the first time, and reading time counts as study time. More coins come from the daily chest, culture quiz, weekly challenge and passport stamps.')}</div></div>`);
  const ctryBtn = c => { const a = { n: cown(c), t: ctot(c) }; return `<button class="pp-ctry${c === S.cc ? ' on' : ''}" data-cc="${c}"><canvas class="ppFlag" data-cc="${c}" width="64" height="48"></canvas><span><b>${CC[c][uiLang === 'vi' ? 0 : 1]}</b><span class="dim">${a.n}/${a.t}${a.n === a.t ? ' ⭐' : ''}</span></span></button>`; };
  const contStat = k => { let n = 0, tt = 0; for (const c of Object.keys(CC)) if (CC_CONT[c] === k) { n += cown(c); tt += ctot(c); } return { n, t: tt }; };
  const regStat = rg => { let n = 0, tt = 0; for (const e of rg.c) { const code = e.split('|')[2]; if (code) { n += cown(code); tt += ctot(code); } } return { n, t: tt }; };
  const curCont = WORLD.find(x => x.k === S.cont) || WORLD[0], curReg = curCont.regions.find(r => r.k === S.reg) || null;
  const nameOf = e => { const [vi, en] = e.split('|'); return uiLang === 'vi' ? vi : en; };
  const countStat = ct => { const a = contStat(ct.k); return a.t ? `${a.n}/${a.t}${a.n === a.t ? ' ⭐' : ''}` : '—'; };
  const regHave = rg => rg.c.filter(e => e.split('|')[2]).length;
  const offBtn = e => `<div class="pp-ctry off"><span class="ppNoFlag"></span><span><b>${esc(nameOf(e))}</b><span class="dim">${t('Sắp có', 'Coming soon')}</span></span></div>`;
  // chọn từng lớp: Thế giới → Châu → Khu vực → Nước → thẻ
  const lv = S.lv === 'ctry' && CC[S.cc] && curReg ? 'ctry' : S.lv === 'reg' && curReg ? 'reg' : S.lv === 'cont' || S.lv === 'reg' ? 'cont' : 'world';
  const crumbs = [['world', '🌍 ' + t('Thế giới', 'World')]];
  if (lv !== 'world') crumbs.push(['cont', t(curCont.vi, curCont.en)]);
  if (lv === 'reg' || lv === 'ctry') crumbs.push(['reg', t(curReg.vi, curReg.en)]);
  if (lv === 'ctry') crumbs.push(['ctry', CC[S.cc][uiLang === 'vi' ? 0 : 1]]);
  h.push(`<div class="pp-crumb">${crumbs.map(([k, n], i) => (i === crumbs.length - 1 ? `<b>${esc(n)}</b>` : `<button data-nav="${k}">${esc(n)}</button><span class="dim">›</span>`)).join('')}</div>`);
  if (lv === 'world' && S.quiz) { h.push(quizHtml()); root.innerHTML = h.join(''); return; }
  if (lv === 'world') h.push(funHtml());
  if (lv !== 'ctry') {
    if (lv === 'world') h.push(`<div class="pp-world">${WORLD.map(ct => `<button class="pp-wc" data-ct="${ct.k}"><canvas class="ppCont" data-k="${ct.k}" width="64" height="48"></canvas><b>${t(ct.vi, ct.en)}</b><small class="dim">${countStat(ct)}</small></button>`).join('')}</div>`);
    else if (lv === 'cont') h.push(curCont.regions.length ? `<div class="pp-reglist">${curCont.regions.map(rg => { const a = regStat(rg); return `<button class="pp-rc" data-rg="${rg.k}"><b>${t(rg.vi, rg.en)}</b><small class="dim">${regHave(rg)}/${rg.c.length} ${t('nước có thẻ', 'countries with cards')}${a.t ? ` · ${a.n}/${a.t}` : ''}</small></button>`; }).join('')}</div>` : `<div class="pp-empty dim">${t(curCont.note ? curCont.note[0] : '', curCont.note ? curCont.note[1] : '')}</div>`);
    else h.push(`<div class="pp-cl">${curReg.c.map(e => { const code = e.split('|')[2]; return code ? ctryBtn(code) : offBtn(e); }).join('')}</div>`);
    root.innerHTML = h.join(''); $$('.ppFlag', root).forEach(cv => drawFlag(cv, cv.dataset.cc)); $$('.ppCont', root).forEach(cv => drawCont(cv, cv.dataset.k)); return;
  }
  h.push(`<div class="pp-tabs">${Object.keys(GROUP).map(g => { const s = stat(mine().filter(i => i.gr === +g)); return `<button class="pp-tab${+g === S.group ? ' on' : ''}" data-g="${g}"><span class="ic">${GROUP[g][2]}</span><span class="tn">${esc(gName(+g))}</span><small>${s.n}/${s.t}</small></button>`; }).join('')}</div>`);
  const items = mine().filter(i => i.gr === S.group), gs = stat(items), gDone = gs.n === gs.t;
  h.push(`<div class="pp-grp"><b>${esc(gName(S.group))}</b><small>${gs.n}/${gs.t}</small><span class="grow"></span>
    <button class="btn${gDone ? ' primary' : ''}" data-story="${kk(S.cc, 'g' + S.group)}" ${gDone ? '' : 'disabled'}>${gDone ? '📜 ' + t('Câu chuyện của mục này', 'Story of this section') : '🔒 ' + t(`Mua đủ ${gs.t} thẻ để mở câu chuyện`, `Buy all ${gs.t} cards to unlock the story`)}</button></div>`);
  for (const sub of subsOf(S.group)) {
    const list = items.filter(i => i.sub === sub), s = stat(list), done = s.n === s.t, shown = list;
    h.push(`<div class="pp-sub"><b>${esc(subName(sub))}</b><small>${s.n}/${s.t}</small><span class="grow"></span><button class="btn${done ? ' primary' : ''}" data-story="${esc(kk(S.cc, 's:' + sub))}" ${done ? '' : 'disabled'}>${done ? '📜 ' + t('Câu chuyện', 'Story') : `🔒 ${s.n}/${s.t}`}</button></div>`);
    h.push(`<div class="pp-grid">${shown.map(i => `<button class="pp-card${own(i.id) ? ' own' : ''}" data-id="${i.id}"><span class="cv"></span><span class="nm gt">${esc(name(i))}</span><span class="pr">${own(i.id) ? '✓' : '🪙 ' + curPrice(i)}</span></button>`).join('') || `<div class="dim">${t('Không có thẻ nào.', 'No cards.')}</div>`}</div>`);
  }
  root.innerHTML = h.join('');
  $$('.ppFlag', root).forEach(cv => drawFlag(cv, cv.dataset.cc));
  $$('.pp-card', root).forEach(b => { const it = K.byId[b.dataset.id]; $('.cv', b).replaceWith(Object.assign(sprite(it, own(it.id)), { className: 'cv' })); });
  if (fresh > 0 && P.last) sfx.play('reward');
  if (!P.last || fresh > 0) { P.last = bal; save(); }
}

// ---------- hộp thoại ----------
function openCard(id) {
  const it = K.byId[id], o = own(id), bal = balance(), dlg = $('#passDlg'), price = curPrice(it);
  $('#pdTitle').textContent = name(it); $('#pdSub').textContent = `${gName(it.gr)} · ${subName(it.sub)}`;
  const holder = $('#pdArt'); holder.innerHTML = ''; const cv = sprite(it, o); cv.style.width = cv.width * 2 + 'px'; cv.style.height = cv.height * 2 + 'px'; holder.append(cv);
  $('#pdNote').className = 'gt' + (o ? '' : ' lock'); $('#pdNote').textContent = o ? it.note : t('🔒 Mua thẻ này để đọc nguồn gốc của nó.', '🔒 Buy this card to read its origin.');
  $('#pdEn').textContent = o && uiLang !== 'vi' ? 'English text: coming soon' : '';
  $('#pdTag').textContent = it.use ? { wear: t('👕 Mặc được', '👕 Wearable'), hold: t('✋ Cầm được', '✋ Holdable'), pet: t('🐾 Đi cùng', '🐾 Companion') }[it.use] : '';
  const b = $('#pdBuy'); b.hidden = o; b.disabled = bal < price; const off = price < priceOf(it) ? t(' · giảm nửa giá (thẻ cuối của mục)', ' · half price (last card of the group)') : ''; b.textContent = t(`Mua · 🪙 ${price}${off}`, `Buy · 🪙 ${price}${off}`);
  $('#pdBal').textContent = o ? t('✓ Bạn đã có thẻ này', '✓ You own this card') : t(`Bạn có 🪙 ${bal}${bal < price ? ` · còn thiếu ${price - bal} xu` : ''}`, `You have 🪙 ${bal}${bal < price ? ` · ${price - bal} more coins needed` : ''}`);
  b.onclick = () => buy(id); dlg.showModal();
}
function buy(id) {
  const it = K.byId[id]; const price = curPrice(it); if (own(id) || balance() < price) return;
  if (price !== priceOf(it)) (P.paid ||= {})[id] = price; P.own.push(id); { const w = weekNow(); if (!w.claimed && it.cc === w.cc) w.n++; } save(); sfx.play('unlock'); $('#passDlg').close(); toast(t(`Đã mua: ${name(it)} ✓`, `Bought: ${name(it)} ✓`), 2200);
  const sub = K.items.filter(i => i.cc === it.cc && i.sub === it.sub), grp = K.items.filter(i => i.cc === it.cc && i.gr === it.gr);
  const done = [sub.every(i => own(i.id)) && kk(it.cc, 's:' + it.sub), grp.every(i => own(i.id)) && kk(it.cc, 'g' + it.gr)].filter(Boolean).filter(k => !P.seen.includes(k));
  draw();
  if (done.length) { P.seen.push(...done); save(); const key = done[done.length - 1]; setTimeout(() => { sfx.play('reward'); toast(t('📜 Mở khóa câu chuyện mới!', '📜 New story unlocked!'), 2600); openStory(key); }, 900); }
}
function openStory(key0) {
  const m = key0.match(/^(?:([a-z]{2}):)?(.*)$/), cc = m[1] || 'jp', key = m[2], g = key.startsWith('g'), data = g ? ST[cc].BIG[+key.slice(1)] : ST[cc].SUB[key.slice(2)]; if (!data) return;
  $('#psTitle').textContent = data.title; $('#psKind').textContent = g ? t(`Câu chuyện của mục: ${gName(+key.slice(1))}`, `Story of section: ${gName(+key.slice(1))}`) : t(`Câu chuyện: ${key.slice(2)}`, `Story: ${subName(key.slice(2))}`);
  $('#psBody').innerHTML = data.text.map(p => `<p class="gt">${esc(p)}</p>`).join('') + (uiLang !== 'vi' ? '<div class="dim">English text: coming soon</div>' : '');
  $('#passStory').showModal();
}

// ---------- Học tiếp (nằm ở mục Ôn tập) ----------
function renderContinue() {
  const box = $('#rvCont'); if (!box) return;
  const v = lastVideo();
  box.hidden = false;
  box.innerHTML = v ? `<div class="grow"><div class="dim">${t('Học tiếp', 'Continue')}</div><b class="gt">${esc(v.title || v.name || '')}</b></div><button class="btn primary" id="rvContGo">▶ ${t('Học tiếp', 'Continue')}</button>`
    : `<div class="grow"><b>${t('Chưa có video đang học', 'No video in progress')}</b><div class="dim">${t('Mở một video trong Thư viện để bắt đầu học.', 'Open a video in the Library to start studying.')}</div></div><button class="btn primary" id="rvContLib">📚 ${t('Thư viện', 'Library')}</button>`;
}

// ---------- khởi tạo ----------
const LOADED = new Set(), LOADING = new Map();
let kitP = null, KT = null; // KT: kho thẻ dùng chung; K chỉ gán sau khi đã nạp xong lần đầu
const ccOf = id => { const p = id.split('-')[0]; return p !== 'jp' && CC[p] ? p : 'jp'; }; // mã nước của một thẻ (thẻ Nhật không có tiền tố)
const ctot = c => (LOADED.has(c) ? KT.items.filter(i => i.cc === c).length : COUNT[c] || 0);
const cown = c => P.own.filter(id => ccOf(id) === c).length;
const missing = () => P.own.some(id => !LOADED.has(ccOf(id)));
function loadCC(cc) { // chỉ nạp thẻ + câu chuyện của nước cần xem (mỗi nước ~6 file), không nạp tất cả nước
  if (LOADED.has(cc)) return Promise.resolve();
  if (!LOADING.has(cc)) LOADING.set(cc, (async () => {
    await Promise.all([1, 2, 3, 4, 5].map(i => import(`./pass-${cc}${i}.js`)));
    if (cc !== 'jp' && cc !== 'kr') await import(`./pass-${cc}6.js`); // chỉnh lại / bỏ nền thẻ, phải nạp sau khi 1–5 đã đăng ký
    ST[cc] = await import(cc === 'jp' ? './pass-story.js' : `./pass-story-${cc}.js`);
    for (const i of KT.items) if (i.cc === cc) KT.byId[i.id] = i;
    LOADED.add(cc);
  })().finally(() => LOADING.delete(cc)));
  return LOADING.get(cc);
}
async function ensure(cc) { // nạp kho + các nước đã có thẻ mua (để tính xu, Lame) + nước đang xem
  if (!kitP) kitP = import('./pass-kit.js').then(kit => { ST = {}; KT = { items: kit.ITEMS, byId: {}, render: kit.render, paint: kit.paint }; });
  await kitP;
  await Promise.all([...new Set([...P.own.map(ccOf), ...(cc ? [cc] : [])])].map(c => loadCC(c).catch(() => {})));
  if (!K) K = KT;
}
const go = () => ensure(S.cc).then(draw); // đổi nước: nạp nước đó rồi vẽ
async function open() {
  root = $('#passRoot'); if (!root) return;
  if (!P.since) { P.since = vnDate(); save(); }
  await ensure(S.cc); pull(); if (active) draw();
}
export function init() {
  bus.on('worldpass', () => { P.extra = (P.extra || 0) + 10; save(); toast(t('📖 Bài đọc đạt từ 80% lần đầu: +10 xu', '📖 First 80%+ on an article: +10 coins'), 3000); if (active && K) draw(); });
  bus.on('show', v => { active = v === 'passport'; if (active) open(); if (v === 'review') renderContinue(); });
  bus.on('store', c => { if ((c === 'items' || c === '*') && document.body.dataset.view === 'review') renderContinue(); });
  $('#rvCont')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'rvContGo') { const v = lastVideo(); if (v) import('./player.js').then(m => m.openItem(v.id)); }
    else if (b.id === 'rvContLib') bus.emit('nav', 'library');
  });
  bus.on('store', c => { if ((c === 'prefs' || c === '*') && K) pull(); if (active && K && (c === 'days' || c === '*')) draw(); });
  document.addEventListener('click', e => {
    if (!active || !root || !root.contains(e.target)) return;
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'ppHow') { $('#ppHowBox').hidden = !$('#ppHowBox').hidden; return; }
    if (b.dataset.fun) { const f = b.dataset.fun; if (f === 'chest') openChest(); else if (f === 'quiz') startQuiz(); else if (f === 'claimwk') claimWeek(); else if (f === 'qa') quizAnswer(+b.dataset.k); else if (f === 'qnext') quizNext(); else if (f === 'qclose') { S.quiz = null; draw(); } return; }
    if (b.dataset.ct) { // chọn châu: sang khu vực đầu tiên có nước đã làm (nếu không có thì khu vực đầu tiên)
      const ct = WORLD.find(x => x.k === b.dataset.ct), rg = ct.regions.find(r => firstIn(r.k)) || ct.regions[0];
      S.cont = ct.k; S.reg = ''; S.lv = 'cont'; draw(); window.scrollTo(0, 0); return;
    }
    if (b.dataset.rg) { // chọn khu vực: nếu đang xem nước ở khu vực khác thì chuyển sang nước đầu tiên của khu vực này
      S.reg = b.dataset.rg; S.lv = 'reg'; draw(); window.scrollTo(0, 0); return;
    }
    if (b.dataset.cc) { S.cc = b.dataset.cc; S.cont = CC_CONT[S.cc]; S.reg = CC_REG[S.cc]; S.group = 1; S.lv = 'ctry'; go(); window.scrollTo(0, 0); return; }
    if (b.dataset.nav) { S.lv = b.dataset.nav; draw(); window.scrollTo(0, 0); return; }
    if (b.dataset.g) { S.group = +b.dataset.g; draw(); return; }
    if (b.dataset.story) { openStory(b.dataset.story); return; }
    if (b.classList.contains('pp-card')) openCard(b.dataset.id);
  });
  document.addEventListener('click', e => { // thói quen hằng ngày: hiện ở mục Nhiệm vụ nên bắt sự kiện trên cả trang
    const b = e.target.closest('.pp-hab button'); if (!b) return;
    if (b.dataset.hab === 'toggle') { S.habOpen = !S.habOpen; habRedraw(); return; }
    if (b.dataset.hab === 'save') { habSave(); return; }
    if (b.dataset.hab === 'cancel') { S.he = ''; S.hn = ''; S.hc = '10'; habRedraw(); return; }
    if (b.dataset.hc) { habToggle(b.dataset.hc); return; }
    if (b.dataset.he) { const x = HB.list.find(y => y.id === b.dataset.he); if (x) { S.he = x.id; S.hn = x.name; S.hc = String(x.coins ?? 0); habRedraw(); setTimeout(() => $('#habName')?.focus(), 0); } return; }
    if (b.dataset.hd) habDel(b.dataset.hd);
  });
  document.addEventListener('input', e => { if (e.target.id === 'habName') S.hn = e.target.value; else if (e.target.id === 'habCoins') S.hc = e.target.value; }); // giữ chữ đang gõ khi trang vẽ lại
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.target.id === 'habName' || e.target.id === 'habCoins')) { e.preventDefault(); habSave(); } });
  $('#pdClose')?.addEventListener('click', () => $('#passDlg').close());
  $('#psClose')?.addEventListener('click', () => $('#passStory').close());
  for (const id of ['passDlg', 'passStory']) $('#' + id)?.addEventListener('click', e => { if (e.target.id === id) e.target.close(); });
}

// ---------- dùng chung với nhân vật Lame ----------
export async function items() { await ensure(); return K; }
export const ownedIds = () => P.own.slice();
export const getEq = () => ({ ...(P.eq || {}) });
export function setEq(eq) { P.eq = { ...eq }; P.eqT = Date.now(); checkStamps(); save(); bus.emit('lame'); }








