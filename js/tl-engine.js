// TeaLab: engine (luật chơi). Không đụng DOM, không đọc đồng hồ thật, không Math.random: mọi số ngẫu nhiên theo bộ đếm u(seed, luồng, chỉ số),
// nên cùng (trạng thái đầu buổi, seed, lệnh) luôn ra cùng kết quả (dùng cho “chạy lại giả định”).
import {
  K, PARAMS as P, ITEMS, ITEM_ORDER, ING, ING_ORDER, SUPPLIERS, SEG, SEGS, BUYERS, PROFILE, DELTA, WEATHER_PLAN, WEATHER_SEED, MDOW, DAYMODS, THETA_MODS,
  HOLIDAY_WAGE, DEFAULT_CLOSED, EXTRA_SESSION_DAYS, inSeason, WEEKLY, UNLOCKS, SEASONAL, CAL_NOTES, EVENTS, EVENT_BY_ID, SCHEDULED, MILESTONES, TITLES, BADGES, dateOf, dayLabel, dow as dowOf, SKY_NAME, SESS_MIN,
} from './tl-data.js';

// ---------- số ngẫu nhiên theo bộ đếm ----------
const hash32 = x => { x ^= x >>> 16; x = Math.imul(x, 0x7feb352d); x ^= x >>> 15; x = Math.imul(x, 0x846ca68b); x ^= x >>> 16; return x >>> 0; };
const STREAM = {}; ['arr', 'theta', 'choice', 'cups', 'pat', 'subst', 'supplier', 'weather', 'event', 'staff', 'fb', 'mkt', 'misc', 'err'].forEach((s, i) => { STREAM[s] = (i + 1) * 0x9e3779b1; });
export const u = (seed, stream, i) => hash32(hash32((seed ^ STREAM[stream]) >>> 0) + Math.imul((i | 0) + 1, 0x85ebca6b)) / 4294967296;
export function normInv(p) { // Acklam
  p = Math.min(1 - 1e-12, Math.max(1e-12, p));
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239],
    b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572],
    c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783],
    d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  if (p < 0.02425) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - 0.02425) { const q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
const poissonInv = (lam, p) => { if (lam <= 0) return 0; let k = 0, pk = Math.exp(-lam), c = pk; while (p > c && k < 60) { k++; pk *= lam / k; c += pk; } return k; };
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const rm = x => Math.round(x); // làm tròn tiền về đồng
export const tau = (day, k) => day * 10 + k;
export const sessionsOfDay = day => (EXTRA_SESSION_DAYS.includes(day) ? [0, 1, 2, 3, 4] : [0, 1, 2, 3]);
const nextSess = (day, k) => { const s = sessionsOfDay(day); return k < s[s.length - 1] ? [day, k + 1] : [day + 1, 0]; };

// ---------- thời tiết và thẻ ngày ----------
function planOf(day) { return WEATHER_PLAN.find(p => day >= p[0] && day <= p[1]) || [day, day, 18, 26, 0.1, 'warm']; }
export function weatherDay(day) {
  const pl = planOf(day), tmin = pl[2] + (u(WEATHER_SEED, 'weather', day * 3) - 0.5) * 2.6, tmax = pl[3] + (u(WEATHER_SEED, 'weather', day * 3 + 1) - 0.5) * 2.6;
  const r = pl[5] === 'drizzle' ? 0 : u(WEATHER_SEED, 'weather', day * 3 + 2) < pl[4] * 0.15 ? 2 : u(WEATHER_SEED, 'weather', day * 3 + 2) < pl[4] ? 1 : 0;
  return { tmin, tmax, rain: r, sky: pl[5], drizzle: pl[5] === 'drizzle', cold: tmin <= 13, hot: tmax >= 27 };
}
export const tempAt = (w, k) => w.tmin + (w.tmax - w.tmin) * DELTA[k];
export function rainAt(w, day, k) { // buổi có mưa theo mức mưa (q = [0; 0,5; 0,85]); nếu ngày có mưa mà không buổi nào mưa thì ép S3
  if (!w.rain) return false;
  const q = [0, 0.5, 0.85][w.rain]; let any = false;
  for (let s = 0; s < 4; s++) if (u(WEATHER_SEED, 'weather', 1000 + day * 5 + s) < q) any = true;
  return k === 2 && !any ? true : u(WEATHER_SEED, 'weather', 1000 + day * 5 + k) < q;
}
export function forecast(day, k, seed) { // dự báo có nhiễu, luôn hiện độ bất định
  const w = weatherDay(day), T = tempAt(w, k), n = normInv(u(seed, 'weather', day * 7 + k)) * 1.5;
  const real = rainAt(w, day, k) || w.drizzle, pr = clamp((real ? 0.7 : 0.2) + normInv(u(seed, 'weather', 5000 + day * 7 + k)) * 0.15, 0, 1);
  return { T: T + n, lo: T + n - 2, hi: T + n + 2, pRain: pr, sky: w.sky };
}
const prod = (arr) => arr.reduce((a, b) => a * b, 1);
export function dayCard(day) {
  const dw = dowOf(day), dt = dateOf(day), w = weatherDay(day), mods = DAYMODS.filter(m => day >= m[0] && day <= m[1]);
  const mult = {}; // [phân khúc][buổi]
  for (const sg of SEGS) {
    mult[sg] = [0, 1, 2, 3, 4].map(k => {
      let v = MDOW[sg][dw][Math.min(k, 3)];
      for (const m of mods) { const x = m[2][sg]; if (x != null) v *= Array.isArray(x) ? x[k] : x; }
      return v;
    });
  }
  const th = prod(THETA_MODS.filter(t => day >= t[0] && day <= t[1]).map(t => t[2]));
  const wageMul = HOLIDAY_WAGE.includes(day) ? P.holidayWage : 1;
  return { day, dow: dw, date: dt, w, mult, thetaMul: th, wageMul, extra: EXTRA_SESSION_DAYS.includes(day), sessions: sessionsOfDay(day), note: CAL_NOTES[day] || null, label: dayLabel(day),
    defaultClosed: DEFAULT_CLOSED[day] || [], holiday: wageMul > 1 || day === 32 };
}
export const supplierOpenOn = (sid, day) => { const s = SUPPLIERS[sid]; return !s.closed.some(([a, b]) => day >= a && day <= b); };

// ---------- khởi tạo ----------
export function newRun(opts = {}) {
  const seed = (opts.seed || 20261201) >>> 0, diff = opts.diff || 'chuan';
  const x = {}; // quá trình giá chợ x_g(d+1) = 0,8·x_g(d) + σ·ε
  for (const g of ING_ORDER) {
    const sig = (ING[g].grp === 'fresh' ? 0.08 : 0.03) * P.difficulty[diff].sig; let v = 0; x[g] = [0];
    for (let d = 1; d <= 130; d++) { v = 0.8 * v + sig * normInv(u(seed, 'mkt', ING_ORDER.indexOf(g) * 1000 + d)); x[g].push(v); }
  }
  const st = {
    v: 1, seed, diff, day: 1, k: 0, phase: 'PREP', stage: 1, cash: P.startCash, rep: P.startRep, loyal: P.startLoyal, debt: 0, ap: 0, apCarry: 0, ip: 0, x,
    prices: Object.fromEntries(ITEM_ORDER.map(i => [i, ITEMS[i].p])), menu: Object.fromEntries(ITEM_ORDER.map(i => [i, ITEMS[i].stage === 1])),
    lots: Object.fromEntries(ING_ORDER.map(g => [g, []])), pending: [], orderId: 0, fx: [], mails: [], mailId: 0, plan: [], hist: [], cur: null,
    lame: { energy: 100 }, staff: [], staffId: 0, cand: [], equip: {}, supLog: { A: [], B: [], C: [], D: [] }, tools: {}, unl: {}, weekly: [], stars: {}, badges: {}, flags: {}, cal: [], calHits: 0,
    forecast: null, sessionsPlayed: 0, sessionsAuto: 0, autoPlan: { open: [1, 1, 1, 1, 0] }, lastReport: null, coins: 0, coinsToday: 0, season: null, stageDay: { 2: 0 }, lost: { gift: 0 },
    mood: [], promoDays: [], expressUsed: 0, comp: { m: 1.0 }, stockStreak: 0, repHist: [], exp: null, expList: [], expDone: 0, dqi: [], falseDays: [], notes: [], dayReps: [],
  };
  // lô khởi đầu như tea_sim2: một lượng hàng đủ cho buổi đầu
  const start = { ly: 150, tra: 150, duong: 150, da: 90, chanh: 40, sua: 40, tranchau: 40, dao: 40, gung: 40, matong: 60 };
  for (const [g, q] of Object.entries(start)) st.lots[g].push({ q, last: ING[g].shelf, cost: rm(ING[g].c * K), qual: 0.97 });
  st.plan = planEvents(st);
  return st;
}

// bản lưu cũ (trước khi có món / nguyên liệu mới): bổ sung các khóa còn thiếu để không sinh NaN
export function ensure(st) {
  for (const i of ITEM_ORDER) { if (!(i in st.prices)) st.prices[i] = ITEMS[i].p; if (!(i in st.menu)) st.menu[i] = ITEMS[i].stage === 1 && !!ITEMS[i].seasonal; }
  for (const g of ING_ORDER) {
    st.lots[g] ||= [];
    if (!st.x[g]) { const sig = (ING[g].grp === 'fresh' ? 0.08 : 0.03) * P.difficulty[st.diff].sig; let v = 0; st.x[g] = [0]; for (let d = 1; d <= 130; d++) { v = 0.8 * v + sig * normInv(u(st.seed, 'mkt', ING_ORDER.indexOf(g) * 1000 + d)); st.x[g].push(v); } }
  }
  st.supLog.D ||= []; if (st.stage >= 4 && !st.b2) st.b2 = { lots: Object.fromEntries(ING_ORDER.map(g => [g, []])) }; if (st.b2) for (const g of ING_ORDER) st.b2.lots[g] ||= []; st.exp ??= null; st.expList ||= []; st.dqi ||= []; st.falseDays ||= []; st.notes ||= []; st.dayReps ||= []; st.expDone ||= 0; st.tools ||= {}; st.flags ||= {}; st.unl ||= {}; st.weekly ||= [];
  st.plan = st.plan || planEvents(st);
  for (const p of EVENT_PLAN_EXTRA(st)) if (!st.plan.some(q => q.ev === p.ev && q.day === p.day)) st.plan.push(p);
  return st;
}
const EVENT_PLAN_EXTRA = st => SCHEDULED.filter(([d]) => d >= st.day).map(([d, id]) => ({ ev: id, day: d, k: id === 'E20' ? 2 : 0, clueT: tau(d, 0) - 10 * (EVENT_BY_ID[id].lead || 1), fixed: true }));

// ---------- giá chợ, tồn kho ----------
export function fxVal(st, t, ts, at = tau(st.day, st.k), op = 'mul') {
  let v = op === 'mul' ? 1 : 0;
  for (const f of st.fx) if (f.t === t && (f.ts || '') === (ts || '') && f.from <= at && at <= f.to) { if (op === 'mul') v *= f.v; else v += f.v; }
  return v;
}
export function marketPrice(st, g, day = st.day) {
  let s = 1; for (const [a, b, m] of SEASONAL) if (day >= a && day <= b && m[g]) s *= m[g];
  const at = tau(day, 0), ev = fxVal(st, 'price.ingredient', g, at, 'mul') * fxVal(st, 'price.group', ING[g].grp, at, 'mul');
  return ING[g].c * K * s * Math.exp(st.x[g][Math.min(day, 130)]) * ev;
}
export const stockOf = (st, g) => st.lots[g].reduce((a, l) => a + l.q, 0);
export const stockB = (st, g) => (st.b2 ? st.b2.lots[g].reduce((a, l) => a + l.q, 0) : 0);
export const lotsNear = (st, g, day) => st.lots[g].filter(l => l.last <= day + 1).reduce((a, l) => a + l.q, 0);
export function maxShelf(st, g) { return ING[g].shelf + (ING[g].grp === 'fresh' && st.equip.fridge ? 1 : 0); }
const takeOne = (st, g) => { const L = st.lots[g]; for (const l of L) if (l.q > 0) { l.q -= 1; return l; } return null; };
export const unitCost = (st, it) => ITEMS[it].ing.reduce((a, g) => a + marketPrice(st, g), 0);
export const itemAvail = (st, it, n = 1) => ITEMS[it].ing.every(g => stockOf(st, g) >= n);

// ---------- sự kiện và hộp thư ----------
function pushMail(st, m) { m.id = ++st.mailId; m.read = false; m.t = tau(st.day, st.k); m.day = st.day; m.k = st.k; st.mails.push(m); if (st.mails.length > 140) st.mails.splice(0, st.mails.length - 140); return m; }
export const unreadCount = st => st.mails.filter(m => !m.read).length;
export const openDecisions = st => st.mails.filter(m => m.kind === 'DECISION' && !m.resolved);
function planEvents(st) {
  const plan = [], seed = st.seed, last = {}; let sev3 = -9;
  for (const [d, id] of SCHEDULED) { const e = EVENT_BY_ID[id]; plan.push({ ev: id, day: d, k: id === 'E20' ? 2 : 0, clueT: tau(d, 0) - 10 * (e.lead || 1) + 0, fixed: true }); }
  for (let d = 4; d <= 130; d++) {
    if (plan.some(p => p.day === d && p.fixed)) continue;
    if (u(seed, 'event', d * 11) > 0.50) continue; // khoảng 1 sự kiện mỗi 2 ngày
    const pool = EVENTS.filter(e => e.w > 0 && !(e.noTet && d >= 63 && d <= 75) && (!last[e.id] || d - last[e.id] >= e.cd));
    const tot = pool.reduce((a, e) => a + e.w, 0); let r = u(seed, 'event', d * 11 + 1) * tot, pick = pool[0];
    for (const e of pool) { r -= e.w; if (r <= 0) { pick = e; break; } }
    if (!pick || (pick.sev >= 3 && d - sev3 < 3)) continue;
    if (pick.sev >= 3) sev3 = d; last[pick.id] = d;
    const k = Math.min(pick.maxK ?? 3, Math.floor(u(seed, 'event', d * 11 + 2) * 4)); // đơn đặt trước phải báo trước giờ khách đến
    plan.push({ ev: pick.id, day: d, k, clueT: tau(d, k) - Math.max(1, pick.lead || 0) * 10 + (pick.lead ? 0 : 0) });
  }
  return plan.sort((a, b) => tau(a.day, a.k) - tau(b.day, b.k));
}
function calendarMails(st) { // thư theo lịch (INFO): báo đúng ngày game
  const d = st.day, n = CAL_NOTES[d];
  if (n && st.k === 0 && !st.flags['cal' + d]) { st.flags['cal' + d] = 1; pushMail(st, { kind: 'INFO', src: 'official', cal: 1, title: n[0], body: n[1] + (d >= 4 && d <= 8 ? '' : '') }); }
}
function eventTick(st) { // phát manh mối và kích hoạt sự kiện đến hạn (đầu mỗi buổi)
  const at = tau(st.day, st.k), mag = P.difficulty[st.diff].mag, relAdj = P.difficulty[st.diff].rel;
  for (const p of st.plan) {
    const e = EVENT_BY_ID[p.ev]; if (!e || e.st && (st.stage < e.st[0] || st.stage > e.st[1])) continue;
    if (e.need === 'staff' && !st.staff.length) { if (tau(p.day, p.k) <= at) p.done = true; continue; } // sự kiện về nhân viên: bỏ qua khi chưa có nhân viên
    if (!p.clued && p.clueT <= at && tau(p.day, p.k) >= at - 0) {
      p.clued = true;
      if (e.clue) pushMail(st, { kind: 'CLUE', src: e.ch, title: (e.ch === 'rumor' ? 'Tin đồn: ' : e.ch === 'trusted' ? 'Nguồn quen: ' : '') + e.name, body: e.clue, ev: e.id });
    }
    if (!p.done && tau(p.day, p.k) <= at) {
      p.done = true;
      const rel = clamp((e.rel || 1) + relAdj, 0.05, 1), happens = rel >= 1 || u(st.seed, 'event', p.day * 97 + e.id.charCodeAt(2)) <= rel;
      p.happened = happens;
      if (!happens) { (st.falseDays ||= []).push(p.day); pushMail(st, { kind: 'INFO', src: e.ch, title: 'Báo động giả: ' + e.name, body: 'Sự kiện đã được báo trước nhưng không xảy ra lần này. Phản ứng quá sớm có thể tốn kém, đó là bài học về độ tin cậy của nguồn tin.', ev: e.id }); continue; }
      const dur = Math.max(1, e.dur || 1);
      for (const f of e.effects || []) applyFx(st, e, f, mag, tau(p.day, 0), tau(p.day + dur - 1, 9));
      if (e.choices && e.choices.length > 1) pushMail(st, { kind: 'DECISION', src: e.ch, title: e.name, body: e.body, ev: e.id, choices: e.choices.map(c => ({ id: c.id, label: c.label, hint: c.hint || '' })), defaultChoice: e.choices[0].id, deadline: at + 10 });
      else pushMail(st, { kind: 'INFO', src: e.ch, title: e.name, body: e.body, ev: e.id });
    }
  }
  // thư quyết định hết hạn: dùng lựa chọn mặc định
  for (const m of st.mails) if (m.kind === 'DECISION' && !m.resolved && (m.deadline <= at || m.day < st.day)) applyChoice(st, m.id, m.defaultChoice, true); // chỉ chọn được trong ngày nhận thư
}
// áp một hiệu ứng (Phụ lục C): đổi trạng thái ngay (tiền, danh tiếng, tâm trạng…) hoặc ghi hiệu ứng có hạn (nhân giá, nhân lưu lượng…)
function applyFx(st, e, f, mag, from, to) {
  if (f.t === 'cash.add') { const v = rm(f.v * mag); st.cash += v; ledger(st, 'Sự kiện: ' + e.name, v); return; }
  if (f.t === 'rep.add') { st.rep = clamp(st.rep + f.v, 0, 100); return; }
  if (f.t === 'loyal.add') { st.loyal = clamp(st.loyal + f.v, 0, P.loyalMax[st.stage]); return; }
  if (f.t === 'staff.mood') { for (const m of st.staff) m.mood = clamp((m.mood ?? 70) + f.v, 0, 100); return; }
  if (f.t === 'staff.energy') { for (const m of st.staff) m.energy = clamp((m.energy ?? 100) + f.v, 0, 100); return; }
  const v = f.op === 'mul' ? 1 + (f.v - 1) * mag : f.v * (f.op === 'add' && f.v > 0 ? mag : 1);
  st.fx.push({ id: e.id, t: f.t, ts: f.ts, op: f.op, v, from, to });
}
function special(st, sp) { // lựa chọn có tác động đặc biệt
  const day = st.day;
  if (sp === 'supD') st.flags.supD = day;
  else if (sp === 'leave3' || sp === 'leave1') { const m = st.staff.find(q => q.avail !== false); if (m) { m.avail = false; m.back = day + (sp === 'leave3' ? 3 : 1); } }
  else if (sp === 'goodCand') st.cand.unshift({ id: 'cg' + day, name: 'Lan', skill: 1.3, wage: 160 * K, rel: 0.97, trait: 'nhanh tay', seen: 1 });
  else if (sp === 'raise') for (const m of st.staff) { m.wage = rm(m.wage * 1.08); m.mood = clamp((m.mood ?? 70) + 8, 0, 100); }
  else if (sp === 'loan') { st.cash += 5000 * K; st.debt += 5000 * K; ledger(st, 'Vay ngân hàng', 5000 * K); }
  else if (sp === 'fridgeSale') { if (st.stage >= 2 && !st.equip.fridge && st.cash >= 4800 * K) { st.cash -= 4800 * K; st.equip.fridge = day; ledger(st, 'Mua tủ mát giảm giá', -4800 * K); } }
}
export function applyChoice(st, mailId, choiceId, auto = false) {
  const m = st.mails.find(x => x.id === mailId); if (!m || m.resolved) return { ok: false, reason: 'Thư này đã xử lý.' };
  const e = EVENT_BY_ID[m.ev], c = e.choices.find(x => x.id === choiceId); if (!c) return { ok: false, reason: 'Lựa chọn không có.' };
  const need = c.ap || 0;
  if (!auto && st.ap < need) return { ok: false, reason: 'Không đủ điểm hành động (AP).' };
  if (c.cash && !auto && st.cash + c.cash < -5000 * K) return { ok: false, reason: 'Không đủ tiền.' };
  if (!auto && c.sp === 'fridgeSale' && (st.stage < 2 || st.equip.fridge || st.cash < 4800 * K)) return { ok: false, reason: st.equip.fridge ? 'Bạn đã có tủ mát.' : 'Không đủ tiền mua tủ (4.800k).' };
  if (!auto && c.fx?.length && c.fx.every(f => /@\d/.test(f.ts || ''))) { // đơn đặt trước: buổi khách hẹn đã qua thì không nhận được nữa
    const last = Math.max(...c.fx.map(f => +f.ts.split('@')[1]));
    if (st.day > m.day || st.k > last || (st.k === last && st.phase !== 'PREP' && st.phase !== 'LIVE')) return { ok: false, reason: 'Buổi khách hẹn đã qua.' };
  }
  if (!auto && need) { st.ap -= need; if (st.phase !== 'PREP' && st.phase !== 'LIVE') st.apCarry = Math.min(st.apCarry || 0, st.ap); }
  if (c.cash) { st.cash += c.cash; ledger(st, e.name + ': ' + c.label, c.cash); }
  const at = tau(st.day, st.k), mag = P.difficulty[st.diff].mag;
  for (const f of c.fx || []) applyFx(st, e, f, 1, tau(st.day, 0), tau(st.day + Math.max(1, e.dur) - 1, 9));
  if (c.sp) special(st, c.sp);
  if (!auto && e.sev >= 2 && choiceId !== e.choices[0].id) st.flags.early = st.day; // phản ứng sớm sau manh mối (huy hiệu A06)
  if (e.id === 'E23' && choiceId === 'ignore') { /* hiệu ứng nền đã áp dụng */ }
  if (e.id === 'E23' && choiceId !== 'ignore') st.fx = st.fx.filter(f => !(f.id === 'E23'));
  if (e.id === 'E03' && choiceId === 'return') { st.fx = st.fx.filter(f => f.id !== 'E03'); const l = st.lots.dao.reduce((a, b) => a + b.q * b.cost, 0); st.cash += rm(l * 0.8); ledger(st, 'Trả lô đào', rm(l * 0.8)); st.lots.dao = []; }
  if (e.special === 'inspect' && choiceId === 'clean') st.flags.clean = st.day;
  m.resolved = true; m.chosen = choiceId; m.read = true; m.auto = auto;
  return { ok: true, label: c.label };
}
function inspectResult(st, dirty) { // kết quả kiểm tra vệ sinh (E33) ở cuối ngày xảy ra; dirty: cuối ngày còn lô đến hạn (đo trước khi bỏ hàng hỏng)
  const p = st.plan.find(x => x.ev === 'E33' && x.day === st.day && x.happened); if (!p) return;
  const bad = dirty && st.flags.clean !== st.day;
  if (bad) { st.rep = clamp(st.rep - 3, 0, 100); st.cash -= 400 * K; ledger(st, 'Phạt vệ sinh', -400 * K); pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Kiểm tra vệ sinh: chưa đạt', body: 'Kho còn lô hết hạn. Bạn bị phạt 400k và danh tiếng −3.' }); }
  else { st.rep = clamp(st.rep + 2, 0, 100); pushMail(st, { kind: 'REWARD', src: 'official', title: 'Kiểm tra vệ sinh: đạt', body: 'Kho sạch, giấy tờ đủ. Danh tiếng +2.' }); }
}
const ledger = (st, why, amt) => { (st.cur ||= {}).led ||= []; st.cur.led.push([why, amt]); if (st.cur.led.length > 40) st.cur.led.shift(); };

// ---------- nhân sự, thiết bị, nâng cấp ----------
const NAMES = ['Mai', 'Hùng', 'Lan', 'Tuấn', 'Hà', 'Nam', 'Linh', 'Phong', 'Thảo', 'Minh', 'Vy', 'Khoa'];
const TRAITS = ['chăm chỉ', 'học nhanh', 'hay trễ', 'điềm tĩnh', 'nhanh tay', 'hay quên'];
export function genCandidates(st) {
  const out = [], d = st.day;
  for (let i = 0; i < 3; i++) {
    const r = j => u(st.seed, 'staff', d * 100 + i * 10 + j), skill = 0.85 + r(0) * 0.4;
    out.push({ id: 'c' + d + '_' + i, name: NAMES[Math.floor(r(1) * NAMES.length)], skill, wage: rm((100 + (skill - 0.85) * 160) * K / 5000) * 5000, rel: 0.90 + r(2) * 0.09, trait: TRAITS[Math.floor(r(3) * TRAITS.length)], seen: 0 });
  }
  return out;
}
export const staffEff = (st, p) => (p.skill || 1) * (0.6 + 0.4 * (p.energy ?? 100) / 100) * (st.equip.press ? 1.1 : 1);
export function stations(st) { // ai làm gì: người đầu tiên thu ngân, người thứ hai giao hàng (từ GĐ3, có xe), còn lại cùng Lame pha chế
  const staff = st.staff.filter(s => s.avail !== false), cash = staff.length ? [staff[0]] : [];
  const ship = st.stage >= 3 && st.equip.truck && staff.length >= 2 ? [staff[1]] : [];
  const bar = [{ ...st.lame, id: 'lame', skill: 1 }, ...staff.filter(s => !cash.includes(s) && !ship.includes(s))];
  return { cash, bar, ship };
}
export function dqiAvg(st, days = 14) { const a = (st.dqi || []).filter(x => x[0] > st.day - days); return a.length ? a.reduce((s, x) => s + x[1], 0) / a.length : 0; }
export function upgradeStatus(st) { // điều kiện nâng lên giai đoạn kế tiếp
  const k = n => (n / K).toLocaleString('vi-VN') + 'k';
  if (st.stage === 1) { const U = P.upgrade2; const need = U.cash + 3000 * K; return { to: 2, ok: st.cash >= need && st.rep >= U.rep && st.day >= U.days, cost: U.cash, name: 'Tiệm nhỏ', need: [['Tiền ≥ ' + k(need) + ' (phí nâng cấp + vốn lưu động 3.000k)', st.cash >= need], ['Danh tiếng R ≥ ' + U.rep, st.rep >= U.rep], ['Đã mở ≥ ' + U.days + ' ngày', st.day >= U.days]] }; }
  if (st.stage === 2) { const U = P.upgrade3, sk = st.staff.filter(s => s.skill >= 1.1).length; const need = U.cash + 8000 * K; return { to: 3, ok: st.cash >= need && st.rep >= U.rep && sk >= 2, cost: U.cash, name: 'Cửa hàng', need: [['Tiền ≥ ' + k(need) + ' (phí nâng cấp + vốn lưu động 8.000k)', st.cash >= need], ['Danh tiếng R ≥ ' + U.rep, st.rep >= U.rep], ['Có ít nhất 2 nhân viên giỏi (tay nghề ≥ 1,1): hiện ' + sk, sk >= 2]] }; }
  if (st.stage === 3) { const U = P.upgrade4, d = dqiAvg(st); const need = U.cash + 15000 * K; return { to: 4, ok: st.cash >= need && st.rep >= U.rep && d >= U.dqi, cost: U.cash, name: 'Chuỗi (chi nhánh 2)', need: [['Tiền ≥ ' + k(need) + ' (phí nâng cấp + vốn lưu động 15.000k)', st.cash >= need], ['Danh tiếng R ≥ ' + U.rep, st.rep >= U.rep], ['DQI trung bình 14 ngày ≥ ' + U.dqi + ' (hiện ' + Math.round(d) + ')', d >= U.dqi]] }; }
  return { to: 0, ok: false, need: [], cost: 0, name: '' };
}
export const EQUIP = {
  fridge: { name: 'Tủ mát', price: 6000 * K, stage: 2, desc: 'Hàng tươi (sữa, trân châu, đào, vải, chanh, gừng…) dùng thêm 1 ngày.' },
  press: { name: 'Máy ép nắp tự động', price: 4500 * K, stage: 2, desc: 'Pha nhanh hơn 10%.' },
  pearl: { name: 'Bếp nấu trân châu', price: 2000 * K, stage: 2, desc: 'Giá vốn trân châu −8%.' },
  pos: { name: 'Máy POS + thực đơn điện tử', price: 2500 * K, stage: 3, desc: 'Thu ngân nhanh hơn: −5 giây mỗi đơn.' },
  truck: { name: 'Xe giao hàng', price: 3500 * K, stage: 3, desc: 'Mở kênh giao hàng (cần 2 nhân viên trở lên: một người chuyên giao).' },
};

// ---------- phiên chơi ----------
function newSession(st) {
  const day = st.day, k = st.k, card = dayCard(day), seed = hash32(st.seed ^ hash32(day * 31 + k * 7 + 1)), len = k === 4 ? 120 : SESS_MIN;
  const S = { day, k, seed, tick: 0, len, cust: 0, Wb: 0, Wc: 0, open: !(card.defaultClosed.includes(k) && !st.flags['open' + day + k]) && !st.flags['closed' + day + k], promo: false, promoUntil: 0, express: 0, breakUntil: 0,
    cmds: [], out: [], st: { rev: 0, cups: 0, buyers: 0, lostStock: 0, lostWait: 0, over: 0, none: 0, cogs: 0, wage: 0, sat: 0, satN: 0, perSlot: [], stockout: {}, by: {}, seg: {}, errs: 0, maxQ: 0, wait: 0, waitN: 0, comments: [] },
    snap: null, card };
  for (const sg of SEGS) S.st.seg[sg] = { visit: 0, buy: 0, lost: 0 };
  for (let j = 0; j < (k === 4 ? 4 : 8); j++) S.st.perSlot.push({ v: 0, b: 0, ls: 0, lw: 0 });
  S.lam = lamTable(st, S); S.Ws = 0;
  if (st.stage >= 4 && st.b2) { // chi nhánh 2: khách, hàng đợi, thống kê và kho riêng; cùng giá, thực đơn, tiền
    const B = { day, k, seed: (seed ^ 0xB2B2B2B2) >>> 0, tick: 0, len, cust: 0, Wb: 0, Wc: 0, Ws: 0, open: S.open, promo: false, out: [], card, rain: false, st: { rev: 0, cups: 0, buyers: 0, lostStock: 0, lostWait: 0, over: 0, none: 0, cogs: 0, wage: 0, sat: 0, satN: 0, perSlot: [], stockout: {}, by: {}, seg: {}, errs: 0, maxQ: 0, wait: 0, waitN: 0, comments: [] } };
    for (const sg of SEGS) B.st.seg[sg] = { visit: 0, buy: 0, lost: 0 };
    for (let j = 0; j < (k === 4 ? 4 : 8); j++) B.st.perSlot.push({ v: 0, b: 0, ls: 0, lw: 0 });
    B.lam = lamTable(st, B, P.branch); S.B = B;
  }
  return S;
}
const isMilk = it => ITEMS[it].ing.includes('sua'), isFruit = it => ITEMS[it].ing.some(g => ['dao', 'vai', 'chanhday', 'chanh'].includes(g));
function tasteAdd(st, it, at) {
  let v = fxVal(st, 'demand.taste', it, at, 'add') + fxVal(st, 'demand.taste', ITEMS[it].temp, at, 'add') + (isMilk(it) ? fxVal(st, 'demand.taste', 'milk', at, 'add') : 0) + (isFruit(it) ? fxVal(st, 'demand.taste', 'fruit', at, 'add') : 0);
  if (st.day === 82 && !isMilk(it)) v += 0.3; // Rằm tháng Giêng: ưa đồ không sữa
  return v;
}
function lamTable(st, S, opt) { // λ theo phân khúc và slot (mục 5.2); opt: hệ số vị trí / cơ cấu khách riêng của chi nhánh 2
  const k = S.k, at = tau(S.day, k), card = S.card, rain = rainAt(card.w, S.day, k), mR = 0.75 + 0.5 * st.rep / 100, loc = opt ? opt.loc : P.mloc[st.stage];
  const out = {}, nSlots = k === 4 ? 4 : 8;
  for (const sg of SEGS) {
    const sd = SEG[sg]; let nPass = BUYERS[sg][k] / sd.conv; if (sg === 'KQ') nPass *= clamp(st.loyal / 60, 0.4, 1.6);
    let m = card.mult[sg][k] * mR * loc * (opt ? opt.mix[sg] : 1) * fxVal(st, 'demand.mult', sg, at) * fxVal(st, 'demand.mult', sg + '@' + k, at);
    if (rain) m *= 0.85 * (sg === 'HS' ? 0.8 : 1); else if (card.w.drizzle) m *= 0.92;
    out[sg] = Array.from({ length: nSlots }, (_, j) => nPass * m * PROFILE[k][j] / 30);
  }
  S.rain = rain; S.mWeather = rain ? 0.85 : 1;
  return out;
}
export function beginSession(st) { // vào PREP của (ngày, buổi): nhận hàng, thư, AP
  const at = tau(st.day, st.k);
  if (st.k === 0) calendarMails(st);
  eventTick(st);
  // hàng đến hạn
  for (const p of st.pending.filter(p => p.t <= at && (!p.at || p.t < at))) deliver(st, p); // p.t < at: đơn khẩn còn kẹt từ buổi trước
  st.pending = st.pending.filter(p => !p.done);
  const base = Math.round(P.ap[st.stage] * P.difficulty[st.diff].ap);
  st.ap = base + Math.min(P.apCarry, st.apCarry || 0); st.apCarry = 0; st.expressUsed = 0;
  st.cur = { day: st.day, k: st.k, led: [], start: structuredClone({ cash: st.cash, rep: st.rep }), mode: 'hand' };
  st.forecast = null; st.phase = 'PREP';
  st.repAt = st.rep;
  for (const m of st.staff) if (m.avail === false && (m.back || 0) <= st.day) { m.avail = true; m.back = 0; } // nhân viên nghỉ phép quay lại
  const x = st.exp; if (x && !x.done) { x.arm = x.n % 2; st.prices[x.item] = x.arm ? x.pb : x.pa; } // thử nghiệm giá: xen kẽ hai mức giá theo buổi
  return st;
}
const lotsOf = (st, br) => (br === 'B' && st.b2 ? st.b2.lots : st.lots);
function deliver(st, p) {
  if (p.transfer) { const L = lotsOf(st, p.br); for (const l of p.lots) { L[l.g].push({ ...l }); L[l.g].sort((a, b) => a.last - b.last); } p.done = true; p.status = 'chuyển kho'; return; } // chuyển hàng giữa hai chi nhánh: giao đủ, giữ nguyên hạn dùng
  const day = st.day, rho = clamp(SUPPLIERS[p.sup].rho + fxVal(st, 'supplier.reliability', p.sup, tau(st.day, st.k), 'add') + (day === 35 ? -0.10 : 0), 0.05, 0.999);
  let frac = 1, status = 'đủ'; const r = u(st.seed, 'supplier', p.id * 3);
  if (!p.late && r > rho) { const r2 = u(st.seed, 'supplier', p.id * 3 + 1); if (r2 < 0.5) { p.late = 1; p.at = 0; const [nd, nk] = nextSess(st.day, st.k); p.t = tau(nd, nk); status = 'trễ'; st.supLog[p.sup].push([day, 'trễ']); return; } frac = 1 - (0.1 + 0.3 * u(st.seed, 'supplier', p.id * 3 + 2)); status = 'thiếu ' + Math.round((1 - frac) * 100) + '%'; }
  p.done = true; if (status !== 'trễ') st.supLog[p.sup].push([day, p.late ? 'đủ (sau khi trễ)' : status]);
  let refund = 0;
  for (const l of p.lines) {
    const q = Math.floor(l.q * frac); refund += (l.q - q) * l.cost;
    if (q <= 0) continue;
    const sd = SUPPLIERS[p.sup], qual = clamp(sd.q + normInv(u(st.seed, 'supplier', p.id * 53 + ING_ORDER.indexOf(l.g) + 7)) * sd.qsd + fxVal(st, 'lot.quality', l.g, tau(day, st.k), 'add'), 0.5, 1.1);
    lotsOf(st, p.br)[l.g].push({ q, last: day + maxShelf(st, l.g) - 1, cost: l.cost, qual });
  }
  if (refund > 0) { st.cash += rm(refund); ledger(st, 'Hoàn phần giao thiếu (' + p.sup + ')', rm(refund)); }
  p.status = status;
}
// ---------- lệnh ----------
const phaseOK = (st, ph) => ph.includes(st.phase);
export function cmd(st, S, c) {
  const live = st.phase === 'LIVE', fail = reason => ({ ok: false, reason });
  switch (c.t) {
    case 'SET_MENU': { if (!phaseOK(st, ['PREP'])) return fail('Chỉ đổi thực đơn ở pha chuẩn bị.'); const it = ITEMS[c.item]; if (!it || it.stage > st.stage) return fail('Món chưa mở.'); if (it.seasonal) { st.menu[c.item] = !!c.on; return { ok: true }; } const on = ITEM_ORDER.filter(i => st.menu[i] && !ITEMS[i].seasonal).length; if (c.on && on >= P.items[st.stage]) return fail('Đã đủ số món tối đa của giai đoạn này.'); st.menu[c.item] = !!c.on; return { ok: true }; }
    case 'SET_PRICE': {
      if (!phaseOK(st, ['PREP', 'LIVE'])) return fail('Không đổi giá lúc này.'); const it = ITEMS[c.item]; if (!it) return fail('Món không có.'); if (st.exp && !st.exp.done && st.exp.item === c.item) return fail('Món này đang trong thử nghiệm giá: dừng thử nghiệm trước khi đổi giá.');
      const p = Math.round(c.price), lo = Math.ceil(it.p * P.priceBand[0]), hi = Math.floor(it.p * P.priceBand[1]); if (!(p >= lo && p <= hi)) return fail(`Giá phải từ ${lo}k đến ${hi}k.`);
      if (p === st.prices[c.item]) return { ok: true };
      if (live) { if (st.ap < 1) return fail('Không đủ AP.'); st.ap -= 1; S.cmds.push({ tk: S.tick, ...c }); }
      st.prices[c.item] = p; return { ok: true };
    }
    case 'PLACE_ORDER': return placeOrder(st, c.sup, c.lines, false, S, c.br);
    case 'TRANSFER': { // chuyển hàng giữa hai chi nhánh: phí 40k, đến đầu buổi kế
      if (st.stage < 4 || !st.b2) return fail('Chuyển kho chỉ có ở giai đoạn 4.'); const from = c.from === 'B' ? st.b2.lots : st.lots, to = c.from === 'B' ? 'A' : 'B', g = c.g, q = Math.floor(c.q);
      if (!ING[g] || !(q > 0)) return fail('Chọn nguyên liệu và số phần.'); if (from[g].reduce((a, l) => a + l.q, 0) < q) return fail('Chi nhánh gửi không đủ hàng.'); if (st.cash < P.branch.fee) return fail('Không đủ tiền phí chuyển (40k).');
      let need = q; const moved = []; for (const l of from[g]) { if (need <= 0) break; const t = Math.min(l.q, need); l.q -= t; need -= t; moved.push({ g, q: t, last: l.last, cost: l.cost, qual: l.qual }); }
      st.cash -= P.branch.fee; ledger(st, 'Phí chuyển kho', -P.branch.fee); const [nd, nk] = nextSess(st.day, st.k); st.pending.push({ id: ++st.orderId, sup: 'A', transfer: true, br: to, lots: moved, t: tau(nd, nk), at: 0, lines: [] });
      return { ok: true, arrive: dayLabel(nd) + ' ' + ['S1', 'S2', 'S3', 'S4', 'S5'][nk] };
    }
    case 'EXPRESS_ORDER': if (!live) return fail('Giao khẩn chỉ dùng khi đang mở cửa.'); return placeOrder(st, 'B', c.lines, true, S);
    case 'FLASH_PROMO': { if (!live) return fail('Khuyến mãi chỉ dùng khi mở cửa.'); if (st.ap < 2) return fail('Cần 2 AP.'); if (S.promo) return fail('Đã khuyến mãi trong buổi này.'); st.ap -= 2; S.promo = true; S.cmds.push({ tk: S.tick, t: 'FLASH_PROMO' }); const n = st.promoDays.filter(d => st.day - d <= 3).length; S.promoMul = 1 + P.promoBoost / (1 + n); st.promoDays.push(st.day); return { ok: true }; }
    case 'TAKE_BREAK': { if (!live) return fail('Chỉ nghỉ khi đang mở cửa.'); if (st.ap < 1) return fail('Cần 1 AP.'); if (S.tick < S.breakUntil) return fail('Đang nghỉ rồi.'); st.ap -= 1; S.breakUntil = S.tick + 15; st.lame.energy = clamp(st.lame.energy + 10, 0, 100); S.cmds.push({ tk: S.tick, t: 'TAKE_BREAK' }); return { ok: true }; }
    case 'CLOSE_EARLY': { if (!live) return fail('Chỉ dùng khi đang mở cửa.'); if (st.ap < 1) return fail('Cần 1 AP.'); st.ap -= 1; S.open = false; S.cmds.push({ tk: S.tick, t: 'CLOSE_EARLY' }); return { ok: true }; }
    case 'REOPEN': { if (!live) return fail('Chỉ dùng khi đang mở cửa.'); if (S.open) return { ok: true }; if (st.ap < 1) return fail('Cần 1 AP.'); st.ap -= 1; S.open = true; S.cmds.push({ tk: S.tick, t: 'REOPEN' }); return { ok: true }; }
    case 'SET_FORECAST': { if (st.phase !== 'PREP') return fail('Chỉ đặt dự đoán trước khi mở cửa.'); if (st.forecast) return fail('Mỗi buổi chỉ đặt một lần.'); const lo = +c.lo, hi = +c.hi; if (!(lo >= 0 && hi > lo)) return fail('Khoảng dự đoán không hợp lệ.'); st.forecast = { lo, hi }; return { ok: true }; }
    case 'CHOOSE': { const r = applyChoice(st, c.mail, c.choice, false); if (r.ok && live && S) { S.lam = lamTable(st, S); if (S.B) S.B.lam = lamTable(st, S.B, P.branch); } return r; } // chọn khi đang bán: tính lại lượng khách ngay
    case 'UPGRADE': { if (st.phase !== 'REVIEW' && st.phase !== 'PREP') return fail('Nâng cấp ở pha xem lại hoặc chuẩn bị.'); const s = upgradeStatus(st); if (!s.to) return fail('Đã ở giai đoạn cao nhất của mùa này.'); if (!s.ok) return fail('Chưa đủ điều kiện nâng cấp.'); st.cash -= s.cost; ledger(st, 'Nâng cấp lên ' + s.name, -s.cost); st.stage = s.to; st.stageDay[s.to] = st.day; st.cand = genCandidates(st);
      for (const it of ITEM_ORDER) if (ITEMS[it].stage === s.to && !(it in st.menu)) st.menu[it] = false; for (const it of ITEM_ORDER) if (!(it in st.prices)) st.prices[it] = ITEMS[it].p;
      const body = { 2: 'Bạn có chỗ ngồi, hai trạm làm việc, thêm 4 món (bật trong Thực đơn), nhà cung cấp C và thiết bị. Chi phí cố định tăng lên 1.750k mỗi ngày: hãy tuyển người và tăng lưu lượng.', 3: 'Cửa hàng: thêm 4 món, tối đa 6 nhân viên, máy POS và xe giao hàng (kênh giao hàng tận nơi, cần một nhân viên chuyên giao), chi phí cố định 4.100k mỗi ngày, lưu lượng ×3,4.', 4: 'Chuỗi: chi nhánh thứ hai khai trương với kho và nhân viên riêng (đặt hàng cho từng nơi, chuyển hàng qua lại tốn 40k). Chi nhánh 2 thêm lưu lượng khách lớn, chi phí cố định 6.700k mỗi ngày, tối đa 8 nhân viên, 9 AP mỗi buổi.' }[s.to];
      if (s.to === 4) { st.b2 = { lots: Object.fromEntries(ING_ORDER.map(g => [g, []])) }; for (const [g, q] of Object.entries({ ly: 200, tra: 200, duong: 200, da: 120, chanh: 60, sua: 80, tranchau: 60, dao: 60, gung: 40, matong: 60 })) st.b2.lots[g].push({ q, last: st.day + ING[g].shelf - 1, cost: rm(ING[g].c * K), qual: 0.97 }); }
      if (s.to === 2) st.badges.A08 = st.badges.A08 || st.day; if (s.to === 3) st.badges.A09 = st.badges.A09 || st.day;
      pushMail(st, { kind: 'REWARD', src: 'official', title: 'Chào mừng giai đoạn ' + s.to + ': ' + s.name, body }); return { ok: true }; }
    case 'BUY_EQUIP': { const e = EQUIP[c.id]; if (!e || st.equip[c.id]) return fail('Đã có thiết bị này.'); if (st.stage < e.stage) return fail('Thiết bị này mở từ giai đoạn ' + e.stage + '.'); if (st.cash < e.price) return fail('Không đủ tiền.'); st.cash -= e.price; ledger(st, 'Mua ' + e.name, -e.price); st.equip[c.id] = st.day; return { ok: true }; }
    case 'HIRE': { if (st.stage < 2) return fail('Tuyển người từ giai đoạn 2.'); if (st.staff.length >= P.staffMax[st.stage]) return fail('Đã đủ số nhân viên tối đa của giai đoạn này.'); const x = st.cand.find(q => q.id === c.id); if (!x) return fail('Ứng viên không còn.'); st.staff.push({ id: 's' + (++st.staffId), name: x.name, skill: x.skill, wage: x.wage, rel: x.rel, trait: x.trait, energy: 100, mood: 70, shifts: 0, avail: true, since: st.day }); st.cand = st.cand.filter(q => q.id !== c.id); return { ok: true }; }
    case 'FIRE': { const i = st.staff.findIndex(q => q.id === c.id); if (i < 0) return fail('Không có nhân viên này.'); const m = st.staff[i]; const pay = m.wage * 2; if (st.cash < pay) return fail('Không đủ tiền bồi thường (' + (pay / K) + 'k).'); st.cash -= pay; ledger(st, 'Bồi thường ' + m.name, -pay); st.staff.splice(i, 1); for (const q of st.staff) q.mood = clamp(q.mood - 6, 0, 100); return { ok: true }; }
    case 'INTERVIEW': { if (st.phase === 'LIVE') return fail('Phỏng vấn ở pha chuẩn bị hoặc xem lại.'); const x = st.cand.find(q => q.id === c.id); if (!x) return fail('Ứng viên không còn.'); x.seen = 1; return { ok: true }; }
    case 'START_EXPERIMENT': {
      if (!st.tools.exp) return fail('Cần công cụ “Thử nghiệm giá” (mua bằng IP).'); if (st.phase !== 'PREP') return fail('Bắt đầu thử nghiệm ở pha chuẩn bị.'); if (st.exp && !st.exp.done) return fail('Đang có một thử nghiệm.');
      const it = ITEMS[c.item]; if (!it || !st.menu[c.item]) return fail('Món này chưa bán.'); const pa = st.prices[c.item], pb = Math.round(c.pb), lo = Math.ceil(it.p * P.priceBand[0]), hi = Math.floor(it.p * P.priceBand[1]);
      if (!(pb >= lo && pb <= hi) || pb === pa) return fail(`Giá thử phải khác giá hiện tại và nằm trong ${lo}–${hi}k.`);
      st.exp = { item: c.item, pa, pb, blocks: Math.max(6, Math.min(24, c.blocks || 12)), n: 0, a: [], b: [], arm: 0, done: false, start: st.day }; return { ok: true };
    }
    case 'STOP_EXPERIMENT': { if (st.exp && !st.exp.done) { st.prices[st.exp.item] = st.exp.pa; st.exp = null; } return { ok: true }; }
    case 'TOOL': { const t = (c.tool || {}); if (st.tools[t.id]) return fail('Đã có công cụ này.'); if (t.need && !st.tools[t.need]) return fail('Cần mở công cụ “Đếm khách” trước.'); if (st.day < t.day) return fail('Mở từ ngày ' + t.day + '.'); if (st.ip < t.cost) return fail('Không đủ điểm phân tích (IP).'); st.ip -= t.cost; st.tools[t.id] = st.day; return { ok: true }; }
    default: return fail('Lệnh không hỗ trợ.');
  }
}
// giá một phần khi đặt (dùng chung cho đặt hàng và số "Tổng" trên giao diện để hai nơi luôn khớp)
export const unitPrice = (st, sup, g, q = 0, express = false) => marketPrice(st, g) * SUPPLIERS[sup].mul * fxVal(st, 'supplier.price', sup) * (q >= P.discountQty ? 1 - P.discountPct : 1) * (st.equip.pearl && g === 'tranchau' ? 0.92 : 1) * (express ? P.expressMul : 1);
function placeOrder(st, sup, lines, express, S, br) {
  const sd = SUPPLIERS[sup], fail = reason => ({ ok: false, reason });
  if (!sd || sd.stage > st.stage || (sd.needFlag && !st.flags[sd.needFlag])) return fail('Nhà cung cấp này chưa mở.');
  lines = (lines || []).filter(l => l.q > 0 && ING[l.g]); if (!lines.length) return fail('Chưa chọn mặt hàng nào.');
  if (sd.fresh && lines.some(l => ING[l.g].grp !== 'fresh')) return fail('Nhà cung cấp C chỉ bán nhóm tươi.');
  if (express && (!sd.express || st.expressUsed >= 2 || st.ap < 2)) return fail(!sd.express ? 'Nhà cung cấp này không giao khẩn.' : st.ap < 2 ? 'Cần 2 AP.' : 'Tối đa 2 lần giao khẩn mỗi buổi.');
  let [d2, k2] = nextSess(st.day, st.k), arriveDay = express ? st.day : d2;
  if (sup === 'C') { let dd = st.day + 1; for (let i = 0; i < 4; i++) { /* đặt trước ít nhất 4 buổi */ } dd = st.day + 2; k2 = 0; d2 = dd; arriveDay = dd; }
  if (!supplierOpenOn(sup, arriveDay)) return fail(`${sd.name} đóng cửa vào ${dayLabel(arriveDay)}.`);
  let total = 0; const out = [];
  for (const l of lines) {
    const q = Math.floor(l.q), cost = rm(unitPrice(st, sup, l.g, q, express)); total += cost * q; out.push({ g: l.g, q, cost });
  }
  total += (express ? P.expressFee : sd.fee);
  if (st.cash < total) return fail('Không đủ tiền (' + Math.round(total / K) + 'k).');
  st.cash -= total; ledger(st, 'Đặt hàng ' + sup + (express ? ' (khẩn)' : ''), -total);
  st.pending.push({ id: ++st.orderId, sup, lines: out, t: express ? tau(st.day, st.k) : tau(d2, k2), at: express ? (S ? S.tick + 60 : 0) : 0, express: !!express, spent: total, br: br === 'B' && st.b2 ? 'B' : 'A' });
  if (express) { st.ap -= 2; st.expressUsed++; if (S) S.cmds.push({ tk: S.tick, t: 'EXPRESS_ORDER', lines }); }
  return { ok: true, total, arrive: express ? 'sau 60 phút' : dayLabel(d2) + ' ' + ['S1', 'S2', 'S3', 'S4', 'S5'][k2] };
}

// ---------- chạy một buổi ----------
export function startLive(st) {
  const S = newSession(st); S.snap = structuredClone({ ...st, mails: [], hist: [], x: st.x });
  if (!S.open) { S.out.push({ ty: 'closed' }); }
  st.phase = 'LIVE'; S.apStart = st.ap; return S;
}
function eff(st, list) { return list.reduce((a, p) => a + staffEff(st, p), 0); }
function wLogit(it, T) { return ITEMS[it].temp === 'cold' ? 0.06 * (T - 20) : -0.08 * (T - 20); }
function decide(st, S, sg, c, T, del) {
  const sd = SEG[sg], at = tau(S.day, S.k), card = S.card, beta = sd.beta * (del ? 1.3 : 1);
  const theta = sd.theta * (del ? 0.95 : 1) * card.thetaMul * fxVal(st, 'demand.theta', sg, at) * Math.exp(sd.sig * normInv(u(S.seed, 'theta', c)));
  const items = ITEM_ORDER.filter(i => st.menu[i] && inSeason(i, S.day) && st.prices[i] / ITEMS[i].p <= theta + 1e-9);
  const U0 = Math.log(ITEM_ORDER.filter(i => ITEMS[i].stage === 1 && !ITEMS[i].seasonal).reduce((a, i) => a + Math.exp(sd.taste[i]), 0)) - Math.log(sd.conv / (1 - sd.conv)), ex = {}; // tỷ lệ mua chuẩn tính trên 4 món gốc: thêm món mới thì khách mua nhiều hơn
  let den = Math.exp(U0);
  for (const i of items) { const m = st.prices[i] / ITEMS[i].p; ex[i] = Math.exp(sd.taste[i] + wLogit(i, T) + tasteAdd(st, i, at) - beta * (m - 1)); den += ex[i]; }
  return { theta, items, ex, den, p0: Math.exp(U0) / den, any: items.length > 0 };
}
export function advance(st, S, n) {
  const ev = [];
  for (let q = 0; q < n && S.tick < S.len; q++) {
    const tick = S.tick, slot = Math.floor(tick / 30), k = S.k, at = tau(S.day, k), T = tempAt(S.card.w, k);
    // hàng giao khẩn đến hạn
    for (const p of st.pending) if (p.at && !p.done && S.tick >= p.at) { deliver(st, p); ev.push({ ty: p.done ? 'delivery' : 'late', sup: p.sup }); } // giao trễ: đơn vẫn còn, về đầu buổi sau
    st.pending = st.pending.filter(p => !p.done);
    const stn = stations(st), onBreak = S.tick < S.breakUntil, capB = Math.max(0.2, eff(st, stn.bar) - (onBreak ? 0.5 : 0)), capC = stn.cash.length ? eff(st, stn.cash) : 0;
    const capS = stn.ship.length ? eff(st, stn.ship) : 0;
    S.Wb = Math.max(0, S.Wb - 60 * capB); S.Wc = Math.max(0, S.Wc - 60 * capC); S.Ws = Math.max(0, (S.Ws || 0) - 60 * capS);
    if (S.open && st.stage >= 3 && capS > 0) { // kênh giao hàng (mục 9.8): số đơn tỷ lệ với khách tại quán, mưa ×1,4
      const tot = SEGS.reduce((a, sg) => a + S.lam[sg][slot], 0), lamD = tot * P.delShare * (S.rain ? 1.4 : 1) * fxVal(st, 'demand.delivery.mult', '', at);
      const nD = poissonInv(lamD, u(S.seed, 'arr', 500000 + tick));
      for (let a = 0; a < nD; a++) { const c = S.cust++; let r = u(S.seed, 'misc', c * 3 + 1) * tot, sgd = 'VP'; for (const sg of SEGS) { r -= S.lam[sg][slot]; if (r <= 0) { sgd = sg; break; } } handle(st, S, sgd, c, T, capB, capC, slot, ev, capS); }
    }
    if (S.open) {
      for (let si = 0; si < 4; si++) {
        const sg = SEGS[si], lam = S.lam[sg][slot] * (S.promo && (sg === 'HS' || sg === 'DK') ? S.promoMul : 1) * (st.stage >= 2 ? compMul(st, sg) : 1);
        const nArr = poissonInv(lam, u(S.seed, 'arr', tick * 4 + si));
        for (let a = 0; a < nArr; a++) { const c = S.cust++; handle(st, S, sg, c, T, capB, capC, slot, ev); }
      }
    }
    if (S.B && S.open) { // chi nhánh 2 chạy song song, dùng kho riêng (đổi tạm st.lots)
      const B = S.B, cb = P.branch.crew * (st.equip.press ? 1.1 : 1); B.Wb = Math.max(0, B.Wb - 60 * cb);
      const keep = st.lots; st.lots = st.b2.lots;
      for (let si = 0; si < 4; si++) {
        const sg = SEGS[si], lam = B.lam[sg][slot] * compMul(st, sg), nArr = poissonInv(lam, u(B.seed, 'arr', tick * 4 + si));
        for (let a = 0; a < nArr; a++) { const c = B.cust++; handle(st, B, sg, c, T, cb, 0, slot, []); }
      }
      st.b2.lots = st.lots; st.lots = keep; B.out.length = 0;
    }
    if (S.Wb / capB > 60) S.st.maxQ = Math.max(S.st.maxQ, Math.round(S.Wb / 150));
    S.tick++;
    if (S.tick % 30 === 0) S.out.push({ ty: 'slot' });
  }
  for (const e of ev) S.out.push(e);
  return S.tick >= S.len;
}
function compMul(st, sg) { const on = ITEM_ORDER.filter(i => st.menu[i] && !ITEMS[i].seasonal), m = st.comp.m, pm = on.reduce((a, i) => a + st.prices[i] / ITEMS[i].p, 0) / Math.max(1, on.length); return 1 - 0.14 * Math.exp(-SEG[sg].beta * (pm - m) * 0.5) * (st.flags.compOff ? 0 : 1); }
function handle(st, S, sg, c, T, capB, capC, slot, ev, capS) {
  const del = capS !== undefined, sd = SEG[sg], D = decide(st, S, sg, c, T, del), R = S.st, at = tau(S.day, S.k), svcMul = fxVal(st, 'service.time', '', at);
  R.seg[sg].visit++; R.perSlot[slot].v++;
  if (!D.any) { R.over++; R.seg[sg].lost++; ev.push({ ty: 'pass', sg }); return; }
  const r = u(S.seed, 'choice', c); if (r < D.p0) { R.none++; ev.push({ ty: 'pass', sg }); return; }
  let acc = D.p0, chosen = null; for (const i of D.items) { acc += D.ex[i] / D.den; if (r < acc) { chosen = i; break; } }
  if (!chosen) { R.none++; return; }
  R.buyers++; R.perSlot[slot].b++;
  const avail = D.items.filter(i => itemAvail(st, i));
  if (!avail.includes(chosen)) {
    if (avail.length && u(S.seed, 'subst', c) < P.pSubst) chosen = avail.reduce((b, i) => (D.ex[i] > D.ex[b] ? i : b), avail[0]);
    else { R.lostStock++; R.perSlot[slot].ls++; R.seg[sg].lost++; const miss = ITEMS[chosen].ing.find(g => stockOf(st, g) < 1); R.stockout[miss] = (R.stockout[miss] || 0) + 1; ev.push({ ty: 'lost', why: 'stock', sg, item: chosen }); if (R.comments.length < 6 && u(S.seed, 'fb', c) < 0.35) R.comments.push(`“Hết ${ING[miss].name.toLowerCase()} rồi à?”`); return; }
  }
  const cupsP = sd.cups < 2 ? 1 + (u(S.seed, 'cups', c) < sd.cups - 1 ? 1 : 0) : 2;
  let cups = cupsP; if (cups === 2 && !itemAvail(st, chosen, 2)) cups = 1;
  const E = S.Wb / capB + (capC ? S.Wc / capC : 0) + (del ? (S.Ws || 0) / capS : 0), patience = sd.pat * (del ? 1.5 : 1) * Math.exp(0.3 * normInv(u(S.seed, 'pat', c)));
  if (E > patience) { R.lostWait++; R.perSlot[slot].lw++; R.seg[sg].lost++; ev.push({ ty: 'lost', why: 'wait', sg, item: chosen }); if (R.comments.length < 6 && u(S.seed, 'fb', c) < 0.4) R.comments.push('“Đứng chờ lâu quá!”'); return; }
  const price = st.prices[chosen] * K; let qsum = 0, wsum = 0, cogs = 0;
  for (let i = 0; i < cups; i++) for (const g of ITEMS[chosen].ing) { const lot = takeOne(st, g); if (lot) { cogs += lot.cost; const w = ['sua', 'dao', 'vai', 'matcha', 'chanhday', 'hoacuc', 'gung'].includes(g) ? 2 : 1; qsum += lot.qual * w; wsum += w; } }
  let Q = clamp(qsum / Math.max(1, wsum) * (0.95 + 0.05 * Math.max(...stations(st).bar.map(p => p.skill || 1))), 0.5, 1.1);
  const tired = st.lame.energy < 30 && u(S.seed, 'err', c) < P.errProb; if (tired) { Q -= 0.15; R.errs++; }
  const rev = price * cups + (del ? P.shipFee : 0); st.cash += rev; R.rev += rev; R.cups += cups; R.cogs += cogs; R.seg[sg].buy++;
  R.by[chosen] = (R.by[chosen] || 0) + cups; if (ITEMS[chosen].gift) R.giftRev = (R.giftRev || 0) + rev; if (del) { R.del = (R.del || 0) + 1; S.Ws = (S.Ws || 0) + P.shipSec; }
  S.Wc += capC ? Math.max(8, P.overheadCash - (st.equip.pos ? 5 : 0)) : 0; S.Wb += (capC ? 0 : P.overheadBar) + cups * ITEMS[chosen].svc * svcMul + (capC ? 30 : 0);
  R.wait += E; R.waitN++;
  const m = st.prices[chosen] / ITEMS[chosen].p, sat = clamp(0.70 + 1.2 * (Q - 0.90) - 0.35 * Math.min(1, E / patience) + 0.30 * Math.min(0.4, D.theta / m - 1), 0, 1);
  R.sat += sat; R.satN++; if (sat >= 0.75 && sg !== 'KQ') R.hi = (R.hi || 0) + 1;
  if (u(S.seed, 'fb', c * 3 + 1) < 0.12 && R.comments.length < 6) R.comments.push(sat > 0.8 ? '“Ngon, sẽ quay lại!”' : E / patience > 0.6 ? '“Chờ hơi lâu, nhưng thôi.”' : Q < 0.85 ? '“Trà hôm nay hơi nhạt.”' : m > D.theta * 0.9 ? '“Hơi đắt so với chỗ khác.”' : tired ? '“Bạn pha nhầm ly của tôi.”' : '“Cũng được.”');
  ev.push({ ty: 'buy', sg, item: chosen, cups, wait: E, sat });
}
export function finishSession(st, S, auto = false) { // chốt buổi: lương, báo cáo, điểm dự đoán
  const R = S.st, worked = S.open || R.cups > 0, holidayOff = !worked && S.card.defaultClosed.includes(S.k);
  for (const p of st.pending) if (p.at && !p.done) deliver(st, p); // đơn khẩn đặt sát giờ đóng: về khi hết buổi
  st.pending = st.pending.filter(p => !p.done);
  let wage = 0;
  if (S.B) { // gộp số liệu chi nhánh 2 vào báo cáo buổi; nhân viên chi nhánh tính lương theo buổi mở cửa
    const b = S.B.st; R.b2 = { rev: b.rev, cups: b.cups, ls: b.lostStock, lw: b.lostWait, buyers: b.buyers };
    for (const k of ['rev', 'cups', 'cogs', 'buyers', 'lostStock', 'lostWait', 'over', 'none', 'sat', 'satN', 'errs', 'wait', 'waitN']) R[k] += b[k];
    R.hi = (R.hi || 0) + (b.hi || 0); for (const [i, q] of Object.entries(b.by)) R.by[i] = (R.by[i] || 0) + q; for (const [g, q] of Object.entries(b.stockout)) R.stockout[g] = (R.stockout[g] || 0) + q;
    for (const sg of SEGS) { R.seg[sg].visit += b.seg[sg].visit; R.seg[sg].buy += b.seg[sg].buy; R.seg[sg].lost += b.seg[sg].lost; } b.perSlot.forEach((x, j) => { for (const k of ['v', 'b', 'ls', 'lw']) R.perSlot[j][k] += x[k]; });
    if (S.open) wage += P.branch.crew * P.branch.wage * S.card.wageMul;
  }
  if (!holidayOff && (worked || S.tick >= S.len)) for (const m of st.staff) { // nghỉ buổi: vẫn trả lương thường; ngày lễ đóng cửa mặc định: không có lương
    if (m.avail === false) continue; wage += m.wage * (worked ? S.card.wageMul : 1); if (!worked) continue;
    m.shifts = (m.shifts || 0) + 1; m.energy = clamp((m.energy ?? 100) - 10, 0, 100); m.mood = clamp((m.mood ?? 70) + (S.card.wageMul > 1 ? 1 : 2), 0, 100);
  }
  let otMin = 0; // tăng ca: đơn còn dồn lại cuối buổi được làm nốt, lương ×1,5 cho phần thời gian dùng thêm (mục 5.5)
  if (S.open && S.Wb > 60) { const cap = Math.max(0.5, st.staff.length ? eff(st, stations(st).bar) : 1); otMin = Math.min(60, Math.ceil(S.Wb / (60 * cap) / 5) * 5); if (otMin >= 5 && st.staff.length) { const ot = rm(st.staff.filter(m => m.avail !== false).reduce((a, m) => a + m.wage * (P.overtime - 1) * otMin / 240, 0) * S.card.wageMul); wage += ot; if (otMin >= 15) for (const m of st.staff) m.mood = clamp((m.mood ?? 70) - 3, 0, 100); } }
  st.cash -= wage; R.wage = wage; if (wage) ledger(st, 'Lương buổi ' + ['S1', 'S2', 'S3', 'S4', 'S5'][S.k], -wage);
  if (worked) st.lame.energy = clamp(st.lame.energy - 10, 0, 100);
  const lost = R.lostStock + R.lostWait, wants = R.buyers;
  const rep = { day: S.day, k: S.k, open: S.open, rev: R.rev, cups: R.cups, cogs: R.cogs, wage, buyers: wants, visit: SEGS.reduce((a, s) => a + R.seg[s].visit, 0), ls: R.lostStock, lw: R.lostWait, over: R.over, none: R.none, sat: R.satN ? R.sat / R.satN : 0, satN: R.satN, hi: R.hi || 0,
    by: R.by, seg: R.seg, perSlot: R.perSlot, stockout: R.stockout, comments: R.comments, maxQ: R.maxQ, wait: R.waitN ? R.wait / R.waitN : 0, errs: R.errs, auto, apLeft: st.ap, cmds: S.cmds.length };
  const f = st.forecast; if (f && !auto && worked) { const x = R.cups, IS = (f.hi - f.lo) + 10 * Math.max(0, f.lo - x) + 10 * Math.max(0, x - f.hi), score = clamp(100 * (1 - IS / Math.max(1, 1.5 * x)), 0, 100); rep.fc = { lo: f.lo, hi: f.hi, x, hit: x >= f.lo && x <= f.hi, score }; st.cal.push([S.day, score, rep.fc.hit ? 1 : 0]); if (rep.fc.hit) { st.calHits++; st.ip += 1; } if (score >= 75) st.ip += 1; }
  rep.ot = otMin; rep.giftRev = R.giftRev || 0; rep.del = R.del || 0; rep.b2 = R.b2 || null;
  if (!auto && S.snap && S.open) { try { rep.q = assess(S, rep); (st.dqi ||= []).push([S.day, rep.q.score]); } catch (e) { rep.q = null; } } // chấm chất lượng quyết định và tách may / kỹ năng bằng chạy lại cùng seed
  if (st.exp && !st.exp.done && S.open) trackExp(st, S, rep);
  st.apCarry = Math.min(P.apCarry, st.ap); st.sessionsPlayed++; if (auto) st.sessionsAuto++;
  rep.net = R.rev - R.cogs - wage; st.lastReport = rep; (st.cur ||= {}).rep = rep; (st.dayReps ||= []).push(rep);
  st.phase = 'REVIEW'; return rep;
}
export function runToEnd(st, S) { let guard = 0; while (!advance(st, S, 60) && guard++ < 10); S.out.length = 0; }
// “chạy lại giả định”: cùng trạng thái đầu buổi, cùng seed, đổi chính sách (giá)
export function whatIf(S, change, seedXor = 0) { // chạy lại buổi từ trạng thái đầu buổi; seedXor ≠ 0: cùng chính sách nhưng may rủi khác
  const st = structuredClone(S.snap); st.mails = []; const T = newSession(st), prices0 = { ...st.prices };
  for (const it of ITEM_ORDER) if (st.menu[it]) st.prices[it] = clamp(Math.round(change(it, prices0[it])), Math.ceil(ITEMS[it].p * 0.7), Math.floor(ITEMS[it].p * 1.5));
  if (seedXor) T.seed = (T.seed ^ seedXor) >>> 0;
  st.phase = 'LIVE'; T.lam = lamTable(st, T); T.promoMul = 1; T.open = S.cmds.some(c => c.t === 'CLOSE_EARLY') ? true : T.open;
  advance(st, T, T.len); T.out.length = 0;
  return { rev: T.st.rev, cogs: T.st.cogs, net: T.st.rev - T.st.cogs, cups: T.st.cups, ls: T.st.lostStock, lw: T.st.lostWait };
}
function assess(S, rep) { // DQI (chất lượng quyết định) + tách may rủi khỏi kỹ năng
  const act = rep.rev - rep.cogs, ref = whatIf(S, it => ITEMS[it].p), up = whatIf(S, (it, p) => p * 1.1), dn = whatIf(S, (it, p) => p * 0.9);
  const best = Math.max(act, ref.net, up.net, dn.net), pq = best > 0 ? clamp(100 * act / best, 0, 100) : 50;
  const bs = rep.buyers ? rep.ls / rep.buyers : 0, ws = rep.buyers ? rep.lw / rep.buyers : 0, sq = clamp(100 * (1 - 3 * bs), 0, 100), wq = clamp(100 * (1 - 3 * ws), 0, 100);
  let mean = 0; for (let i = 1; i <= 3; i++) mean += whatIf(S, (it, p) => p, 0x9e3779b1 * i).net / 3;
  return { score: 0.4 * pq + 0.35 * sq + 0.25 * wq, pq, sq, wq, luck: act - mean, mean, alt: { ref: ref.net, up: up.net, dn: dn.net } };
}
function trackExp(st, S, rep) {
  const x = st.exp, it = x.item, cups = (rep.by || {})[it] || 0, prof = cups * (st.prices[it] * K - unitCost(st, it));
  (x.arm ? x.b : x.a).push(prof); x.n++;
  if (x.n >= x.blocks) {
    const stat = arr => { const m = arr.reduce((a, b) => a + b, 0) / arr.length, v = arr.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, arr.length - 1); return [m, v]; };
    const [ma, va] = stat(x.a), [mb, vb] = stat(x.b), se = Math.sqrt(va / x.a.length + vb / x.b.length) || 1, z = (mb - ma) / se, conclusive = Math.abs(z) >= 1.645 && x.a.length >= 3 && x.b.length >= 3, better = mb > ma ? 'B' : 'A';
    x.done = true; x.res = { conclusive, better, ma, mb, z, pct: ma ? (mb - ma) / Math.abs(ma) : 0 };
    st.prices[it] = conclusive ? (better === 'B' ? x.pb : x.pa) : x.pa; (st.expList ||= []).push({ day: S.day, item: it, ...x.res, pa: x.pa, pb: x.pb });
    if (conclusive) { st.expDone = (st.expDone || 0) + 1; st.ip += 2; if (Math.abs(x.res.pct) >= 0.08) st.flags.priceWin = S.day; }
    pushMail(st, { kind: conclusive ? 'REWARD' : 'INFO', src: 'official', title: 'Kết quả thử nghiệm giá: ' + ITEMS[it].name, body: conclusive ? `Giá ${better === 'B' ? x.pb : x.pa}k cho lãi mỗi buổi cao hơn có ý nghĩa 90% (${Math.round(Math.abs(x.res.pct) * 100)}%). Thưởng 2 IP; giá đã được đặt về mức tốt hơn.` : `Chưa kết luận được (khác biệt nằm trong khoảng nhiễu). Giá về ${x.pa}k. Thử lại với khoảng giá khác hoặc nhiều buổi hơn.` });
  }
}

// ---------- kết thúc ngày ----------
export const sessionsLeft = st => sessionsOfDay(st.day).filter(k => k >= st.k + (st.phase === 'PREP' || st.phase === 'LIVE' ? 0 : 1)).length;
export function nextSession(st) { // sau REVIEW “Xong”
  const [d, k] = nextSess(st.day, st.k);
  if (d !== st.day) { st.phase = 'DAYEND'; return 'DAYEND'; }
  st.k = k; beginSession(st); return 'PREP';
}
function autoOrders(st) { // kế hoạch đứng: nhập về mức dùng trung bình 3 ngày gần nhất (nếu có), không phải chiến lược tối ưu
  const h = st.hist.filter(d => d.cups > 0).slice(-3), use = {}; for (const g of ING_ORDER) use[g] = 0; // ngày có bán: nghỉ / hết sạch hàng không làm kế hoạch đứng ngừng đặt mãi
  for (const d of h) for (const [it, q] of Object.entries(d.by || {})) if (st.menu[it] && inSeason(it, st.day)) for (const g of ITEMS[it].ing) use[g] += q / Math.max(1, h.length);
  const coming = (g, br) => st.pending.reduce((a, p) => a + ((p.br || 'A') === br && !p.done ? (p.lines.length ? p.lines : p.lots || []).reduce((s, l) => s + (l.g === g ? l.q : 0), 0) : 0), 0); // hàng đang trên đường, để không đặt trùng
  const sh = st.b2 ? 0.75 : 1, sup = supplierOpenOn('A', nextSess(st.day, st.k)[0]) ? 'A' : 'B';
  const lines = []; for (const g of ING_ORDER) { const need = Math.ceil(use[g] * 0.28 * 1.12 * sh) - stockOf(st, g) - coming(g, 'A'); if (need > 0 && (ING[g].grp === 'fresh' ? need > 3 : need > 10)) lines.push({ g, q: need }); }
  if (lines.length) placeOrder(st, sup, lines, false, null);
  if (st.b2) { const l2 = []; for (const g of ING_ORDER) { const have = st.b2.lots[g].reduce((a, l) => a + l.q, 0), need = Math.ceil(use[g] * 0.28 * 1.12 * 0.25) - have - coming(g, 'B'); if (need > 0 && (ING[g].grp === 'fresh' ? need > 3 : need > 10)) l2.push({ g, q: need }); } if (l2.length) placeOrder(st, sup, l2, false, null, 'B'); }
}
function runAuto(st) { // chạy các buổi còn lại của ngày bằng kế hoạch đứng
  while (st.phase !== 'DAYEND') {
    if (st.phase === 'PREP' || st.phase === 'LIVE') {
      const S = newSession(st); S.open = !!st.autoPlan.open[st.k] && !(DEFAULT_CLOSED[st.day] || []).includes(st.k); S.snap = null; st.phase = 'LIVE';
      st.ap = 0; if (S.open) { runToEnd(st, S); } else S.tick = S.len;
      const fee = rm(S.st.rev * P.sleepFee); st.cash -= fee; ledger(st, 'Phí tự trông tiệm 5%', -fee);
      finishSession(st, S, true); st.cur.mode = 'auto';
    }
    autoOrders(st);
    if (nextSession(st) === 'DAYEND') break;
    // buổi kế tiếp đã vào PREP: thư quyết định chưa đến hạn giữ sang hôm sau
  }
}
export function sleep(st) { // “đi ngủ”: chạy các buổi còn lại tự động rồi chốt ngày
  if (st.phase === 'REVIEW' && nextSession(st) === 'DAYEND') return closeDay(st);
  if (st.phase !== 'DAYEND') runAuto(st);
  return closeDay(st);
}
export function closeDay(st) {
  const day = st.day, reps = (st.dayReps || []).filter(r => r.day === day), card = dayCard(day); st.dayReps = [];
  // hàng hỏng
  let spoil = 0; const sp = {};
  const lossF = { fresh: clamp(fxVal(st, 'inventory.loss', 'fresh', tau(day, 0), 'add'), 0, 0.9), dry: clamp(fxVal(st, 'inventory.loss', 'dry', tau(day, 0), 'add'), 0, 0.9) };
  for (const L of [st.lots, st.b2?.lots]) { if (!L) continue; for (const g of ING_ORDER) { const f = lossF[ING[g].grp]; if (f > 0) for (const l of L[g]) { const lost = Math.floor(l.q * f); if (lost) { l.q -= lost; spoil += lost * l.cost; sp[g] = (sp[g] || 0) + lost; } } } } // sự kiện làm hỏng một phần kho (cúp điện, hỏng tủ lạnh…)
  const dirty = ING_ORDER.some(g => g !== 'da' && st.lots[g].some(l => l.q > 0 && l.last <= day));
  for (const L of [st.lots, st.b2 ? st.b2.lots : null]) { if (!L) continue; for (const g of ING_ORDER) { const keep = []; for (const l of L[g]) { if (l.last <= day) { spoil += l.q * l.cost; sp[g] = (sp[g] || 0) + l.q; } else keep.push(l); } L[g] = keep; } }
  for (const p of st.pending) if (p.transfer) p.lots = p.lots.filter(l => { if (l.last > day) return true; spoil += l.q * l.cost; sp[l.g] = (sp[l.g] || 0) + l.q; return false; }); // hàng đang chuyển kho cũng hết hạn như thường
  spoil = rm(spoil * (st.diff === 'nhan' ? 0.9 : 1)); // chỉ ghi vào sổ lãi lỗ: tiền hàng đã trả lúc đặt, không trừ tiền mặt lần nữa
  const fixed = rm(P.fixedDay[st.stage] * (fxVal(st, 'cost.fixed', '', tau(day, 0), 'mul'))); st.cash -= fixed;
  let interest = 0; if (st.debt > 0) { interest = rm(st.debt * 0.0005); st.cash -= interest; }
  // vay gia đình khi âm tiền (tối đa 5.000k)
  if (st.cash < 0 && st.debt < 5000 * K) { const b = Math.min(-st.cash, 5000 * K - st.debt); st.cash += b; st.debt += b; pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Vay gia đình', body: 'Tiền mặt âm nên bạn vay gia đình ' + Math.round(b / K) + 'k (lãi 0,05% mỗi ngày). Hãy tăng lợi nhuận để trả.' }); }
  else if (st.debt > 0 && st.cash > st.debt + 3000 * K) { st.cash -= st.debt; st.debt = 0; }
  inspectResult(st, dirty);
  const sum = k => reps.reduce((a, r) => a + (r[k] || 0), 0), by = {}; for (const r of reps) for (const [i, q] of Object.entries(r.by || {})) by[i] = (by[i] || 0) + q;
  const rev = sum('rev'), cogs = sum('cogs'), wage = sum('wage'), ls = sum('ls'), lw = sum('lw'), wants = sum('buyers'), satN = sum('satN');
  const sat = satN ? reps.reduce((a, r) => a + r.sat * r.satN, 0) / satN : 0.7, lostShare = wants ? (ls + lw) / wants : 0;
  const autoShare = reps.length ? reps.filter(r => r.auto).length : 0;
  // danh tiếng và khách quen (5.9)
  const target = 100 * clamp(sat * (1 - 1.5 * lostShare), 0, 1) * 1.0, rep0 = st.rep;
  if (reps.some(r => r.open || r.cups > 0)) st.rep = clamp(st.rep + 0.12 * (target - st.rep), 0, 100);
  const nhi = sum('hi'); st.loyal = clamp(0.97 * st.loyal + 0.10 * nhi, 0, P.loyalMax[st.stage]);
  // năng lượng qua đêm, nghỉ việc
  st.lame.energy = clamp(st.lame.energy + 35 + 10, 0, 100);
  for (const m of st.staff) { m.energy = clamp((m.energy ?? 100) + 35, 0, 100); }
  const quit = [];
  for (const m of [...st.staff]) { if (m.mood < 40 && u(st.seed, 'staff', day * 17 + m.id.charCodeAt(1)) < 0.04 * (40 - m.mood) / 40) { quit.push(m.name); st.staff = st.staff.filter(q => q !== m); st.flags.quitDay = day; } }
  for (const n of quit) pushMail(st, { kind: 'SYSTEM', src: 'official', title: n + ' xin nghỉ việc', body: 'Tâm trạng của ' + n + ' thấp trong nhiều ngày. Hãy chú ý chăm sóc nhân viên.' });
  if (st.stage >= 2 && day % 3 === 0) st.cand = genCandidates(st);
  // đối thủ giai đoạn 2
  if (st.stage >= 2) { const on = ITEM_ORDER.filter(i => st.menu[i] && !ITEMS[i].seasonal), pm = on.reduce((a, i) => a + st.prices[i] / ITEMS[i].p, 0) / Math.max(1, on.length); st.comp.m = clamp(st.comp.m + 0.3 * (pm - st.comp.m) + (u(st.seed, 'misc', day) - 0.5) * 0.04, 0.9, 1.15); }
  // sổ ngày
  const profit = rev - cogs - spoil - fixed - wage - interest;
  const h = { day, rev, cogs, spoil, fixed, wage, interest, profit, cups: sum('cups'), buyers: wants, ls, lw, over: sum('over'), rep: st.rep, loyal: st.loyal, cash: st.cash, stage: st.stage, by, sat, auto: autoShare, played: reps.filter(r => !r.auto).length, n: reps.length, sp, night: reps.find(r => r.k === 4)?.net, gift: sum('giftRev'), del: sum('del'), quit: quit.length > 0, staffN: st.staff.length + quit.length };
  st.hist.push(h); st.cur = null;
  if (st.hist.length > 130) st.hist.shift();
  // xu từ lợi nhuận (có trần mỗi ngày)
  const xu = Math.max(0, Math.min(P.xuCapDay, Math.floor(profit / (100 * K)) * P.xuPer100k)); st.coins = (st.coins || 0) + xu; h.xu = xu;
  const stars = milestoneTick(st, day), weekly = weeklyTick(st, day);
  unlockTick(st); checkBadges(st, h);
  // buổi chơi tay và ngày mới
  const res = { day, h, stars, xu, weekly, repDelta: st.rep - rep0 };
  if (day >= 90 && !st.season) { st.season = seasonScore(st); res.final = st.season; }
  st.day = day + 1; st.k = 0; st.expressUsed = 0;
  st.fx = st.fx.filter(f => f.to >= tau(st.day, 0));
  if (st.day <= 90 || st.flags.free) beginSession(st);
  else { st.phase = 'FINAL'; }
  return res;
}
export function playOn(st) { st.flags.free = 1; st.phase = 'PREP'; beginSession(st); }

// ---------- cột mốc, điểm mùa, huy hiệu ----------
const H = (st, d) => st.hist.find(x => x.day === d);
const sumH = (st, a, b, f) => { let s = 0, n = 0; for (let d = a; d <= b; d++) { const x = H(st, d); if (x) { s += f(x); n++; } } return { s, n }; };
// cột mốc "ít hụt hàng / ít hỏng" chỉ tính khi quán thật sự mở bán ít nhất 80% số ngày của giai đoạn đo
const openedEnough = (st, a, b) => { const r = sumH(st, a, b, x => (x.buyers > 0 ? 1 : 0)); return r.n > 0 && r.s >= Math.floor(r.n * 0.8); };
export function streakOf(st, upto = 999) { // chuỗi ngày dài nhất không ai nghỉ việc, đếm từ khi có nhân viên đầu tiên
  let best = 0, cur = 0, on = false;
  for (const h of st.hist) { if (h.day > upto) break; if ((h.staffN || 0) > 0) on = true; if (!on) continue; if (h.quit) cur = 0; else cur++; best = Math.max(best, cur); }
  return best;
}
export function metricValue(st, M) {
  const g = (d, f) => { const x = H(st, d); return x ? f(x) : null; };
  switch (M.m) {
    case 'rev_day': return g(M.at, x => x.rev);
    case 'rev_cum': return sumH(st, 1, M.at, x => x.rev).s;
    case 'profit_cum': return sumH(st, 1, M.at, x => x.profit).s;
    case 'profit_win': return sumH(st, M.a, M.b, x => x.profit).s;
    case 'rep': return g(M.at, x => x.rep);
    case 'loyal': return g(M.at, x => x.loyal);
    case 'stockout': { if (!openedEnough(st, M.a, M.b)) return null; const a = sumH(st, M.a, M.b, x => x.ls), b = sumH(st, M.a, M.b, x => x.buyers); return 1000 * a.s / Math.max(1, b.s); }
    case 'spoil': return openedEnough(st, M.a, M.b) ? sumH(st, M.a, M.b, x => x.spoil).s : null;
    case 'margin': { const p = sumH(st, M.a, M.b, x => x.profit).s, r = sumH(st, M.a, M.b, x => x.rev).s; return r ? 100 * p / r : null; }
    case 'lowstock': return sumH(st, M.a, M.b, x => (x.buyers > 0 && x.ls <= 2 ? 1 : 0)).s;
    case 'cal': return st.cal.filter(c => c[0] >= M.a && c[0] <= M.b).length >= 10 ? st.cal.filter(c => c[0] >= M.a && c[0] <= M.b).reduce((a, c) => a + c[1], 0) / st.cal.filter(c => c[0] >= M.a && c[0] <= M.b).length : 0;
    case 'stage2': return st.stageDay[2] || null;
    case 'stage3': return st.stageDay[3] || null;
    case 'dqi': { const a = (st.dqi || []).filter(x => x[0] >= M.a && x[0] <= M.b); return a.length >= 4 ? a.reduce((s, x) => s + x[1], 0) / a.length : null; }
    case 'exp': return (st.expList || []).filter(x => x.conclusive && x.day >= M.a && x.day <= M.b).length;
    case 'gift': { const g = sumH(st, M.a, M.b, x => x.gift || 0).s, r = sumH(st, M.a, M.b, x => x.rev).s; return r ? 100 * g / r : null; }
    case 'streak': return streakOf(st, M.dl);
    // các tỷ số so với kỳ gốc: kỳ gốc phải mở bán đủ ngày và có số dương, nếu không thì chưa chấm (đóng cửa kỳ gốc không được “vô cực”)
    case 'ratio_rev': { const x = H(st, M.at), b = sumH(st, M.ba, M.bb, y => y.rev); return x && b.s > 0 && openedEnough(st, M.ba, M.bb) ? x.rev / (b.s / b.n) : null; }
    case 'ratio_rev_avg': { const a = sumH(st, M.a, M.b, y => y.rev), b = sumH(st, M.ba, M.bb, y => y.rev); return a.n && b.s > 0 && openedEnough(st, M.ba, M.bb) ? (a.s / a.n) / (b.s / b.n) : null; }
    case 'ratio_profit': { const a = sumH(st, M.a, M.b, y => y.profit), b = sumH(st, M.ba, M.bb, y => y.profit); return a.n && b.n && b.s > 0 && openedEnough(st, M.ba, M.bb) ? (a.s / a.n) / (b.s / b.n) : null; }
    case 'ratio_profit3': { const a = sumH(st, M.a, M.b, y => y.profit), b = sumH(st, M.ba, M.bb, y => y.profit); return a.n && b.n && b.s > 0 && openedEnough(st, M.ba, M.bb) ? a.s / b.s : null; }
    case 'ratio_margin': { const m = (a, b) => { const p = sumH(st, a, b, y => y.profit).s, r = sumH(st, a, b, y => y.rev).s; return r ? p / r : null; }; const x = m(M.a, M.b), y = m(M.ba, M.bb); return x != null && y > 0 && openedEnough(st, M.ba, M.bb) ? x / y : null; }
    case 'season': return st.season ? st.season.score : null;
    default: return null;
  }
}
export const starsFor = (M, v) => { if (v == null) return 0; const t = M.th, val = M.k ? v / M.k : v; let s = 0; for (let i = 0; i < 3; i++) if (M.dir > 0 ? val >= t[i] - 1e-9 : val <= t[i] + 1e-9) s = i + 1; return s; };
function milestoneTick(st, day) {
  const got = [];
  for (const M of MILESTONES) {
    if (day < M.open || day > M.dl + 0) { continue; }
    const stg = M.m === 'stage2' ? 2 : M.m === 'stage3' ? 3 : 0;
    let due = day === M.dl;
    if (stg) due = day === M.dl || !!st.stageDay[stg]; // nâng giai đoạn: chấm ngay khi nâng (sao tăng dần theo ngày vào)
    else if (M.m === 'profit_cum' || M.m === 'rev_cum') due = day === M.at || (M.early && day >= M.at && day <= M.dl);
    if (!due) continue;
    let v = metricValue(st, M); if (stg && !st.stageDay[stg]) v = null;
    if (M.m === 'cal' && v === 0) v = null;
    const s = starsFor(M, v), old = st.stars[M.id] || 0;
    if (s > old) {
      st.stars[M.id] = s; const xp = P.starXu.slice(old, s).reduce((a, b) => a + b, 0), ip = P.starIp.slice(old, s).reduce((a, b) => a + b, 0);
      st.coins += xp; st.ip += ip; got.push({ id: M.id, name: M.name, stars: s, xu: xp, ip });
      pushMail(st, { kind: 'REWARD', src: 'official', title: `${'⭐'.repeat(s)} ${M.id}: ${M.name}`, body: `Bạn đạt ${s} sao. Thưởng: ${xp} xu của app và ${ip} IP.` });
    } else if (day === M.dl && !old) { st.stars[M.id] = 0; st.stars[M.id + 'closed'] = 1; }
  }
  return got;
}
export const weeklyOf = day => WEEKLY[(Math.ceil(day / 7) - 1) % WEEKLY.length];
export function weeklyTick(st, day) { // thử thách tuần: chấm cuối mỗi tuần game (khi đã có từ 10 sao)
  if (day % 7 !== 0 || totalStars(st) < 10) return null;
  const ch = weeklyOf(day), w = st.hist.slice(-7), sum = k => w.reduce((a, h) => a + (h[k] || 0), 0), rev = sum('rev'), prof = sum('profit'), rep0 = st.hist[st.hist.length - 8]?.rep ?? 50;
  const ok = { w1: () => sum('ls') <= 15, w2: () => sum('spoil') <= (st.stage === 1 ? 400 * K : 1500 * K), w3: () => rev > 0 && prof / rev >= 0.30, w4: () => st.rep >= rep0 + 2, w5: () => sum('lw') <= 25, w6: () => st.cal.filter(c => c[0] > day - 7 && c[2]).length >= 3, w7: () => w.every(h => !h.auto), w8: () => w.every(h => h.profit > 0) }[ch.id]() && w.filter(h => h.buyers > 0).length >= 6; // đóng cửa cả tuần không được tính đạt
  (st.weekly ||= []).push({ week: day / 7, id: ch.id, ok });
  if (ok) { st.ip += ch.ip; st.coins += ch.xu; }
  pushMail(st, { kind: ok ? 'REWARD' : 'INFO', src: 'official', title: (ok ? 'Đạt thử thách tuần: ' : 'Chưa đạt thử thách tuần: ') + ch.name, body: ok ? `${ch.desc} Thưởng ${ch.ip} IP và ${ch.xu} xu.` : `${ch.desc} Tuần sau có thử thách mới.` });
  return { ...ch, ok };
}
function unlockTick(st) { // mở khóa ở 10, 30, 60, 90 sao (mục 15.7)
  const t = totalStars(st); st.unl ||= {};
  for (const [n, name, desc] of UNLOCKS) {
    if (t < n || st.unl[n]) continue; st.unl[n] = st.day; let extra = '';
    if (n === 60) { st.coins += 200; st.ip += 10; extra = ' Thưởng 200 xu và 10 IP.'; }
    if (n === 90 && !st.badges.XS) { st.badges.XS = st.day; st.ip += 20; extra = ' Thưởng huy hiệu “Ngôi sao Xuân” và 20 IP.'; }
    pushMail(st, { kind: 'REWARD', src: 'official', title: `Mở khóa ${n} sao: ${name}`, body: desc + extra });
  }
}
export function totalStars(st) { return MILESTONES.reduce((a, M) => a + (st.stars[M.id] || 0), 0); }
export function netWorth(st) {
  let inv = 0; for (const L of [st.lots, st.b2?.lots]) if (L) for (const g of ING_ORDER) for (const l of L[g] || []) inv += l.q * l.cost;
  const eq = Object.entries(st.equip).reduce((a, [id, d]) => a + EQUIP[id].price * Math.max(0, 1 - (st.day - d) / 180), 0);
  return st.cash + inv + eq - st.debt;
}
export function seasonScore(st) {
  const diff = P.difficulty[st.diff], NW = clamp(100 * netWorth(st) / 200000000, 0, 100), Rep = st.rep;
  const cal = st.cal.length ? st.cal.reduce((a, c) => a + c[1], 0) / st.cal.length : 0;
  const last = st.hist.slice(-30).map(h => h.profit), mean = last.reduce((a, b) => a + b, 0) / Math.max(1, last.length), sd = Math.sqrt(last.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, last.length));
  const Stab = mean > 0 ? clamp(100 * (1 - sd / mean), 0, 100) : 0;
  const played = st.sessionsPlayed ? 100 * (st.sessionsPlayed - st.sessionsAuto) / st.sessionsPlayed : 0;
  const dq = st.dqi || [], dqi = dq.length ? dq.reduce((a, x) => a + x[1], 0) / dq.length : 0; // DQI trung bình các buổi chơi tay
  const raw = 0.30 * NW + 0.20 * Rep + 0.25 * dqi + 0.10 * cal + 0.10 * Stab + 0.05 * played, score = raw * diff.score;
  return { score, parts: { NW, Rep, DQI: dqi, Cal: cal, Stab, Play: played }, title: TITLES.find(t => score >= t[0])[1], nw: netWorth(st), profit: st.hist.reduce((a, h) => a + h.profit, 0) };
}
function checkBadges(st, h) {
  const set = (id, c) => { if (c && !st.badges[id]) { st.badges[id] = st.day; const b = BADGES.find(x => x.id === id); st.ip += b.ip; pushMail(st, { kind: 'REWARD', src: 'official', title: 'Huy hiệu: ' + b.name, body: b.desc + (b.ip ? ` Thưởng ${b.ip} IP.` : '') }); } };
  set('A01', st.day >= 1 && h.rev > 0);
  const last7 = st.hist.slice(-7); set('A02', last7.length === 7 && last7.every(x => x.ls <= 0 && x.buyers > 0));
  set('A03', st.calHits >= 5);
  const a = H(st, 24), b = H(st, 31); set('A10', a && b && (a.night ?? 0) > 0 && (b.night ?? 0) > 0);
  set('A12', st.day === 68 && h.rev > 0 && h.profit > 0);
  set('A04', (st.expDone || 0) >= 3); set('A05', !!st.flags.priceWin);
  set('A06', !!st.flags.early && h.profit > 0);
  const fd = (st.falseDays || []).filter(d => d <= st.day).length; set('A07', fd >= 3 && st.cash >= (H(st, Math.max(1, st.day - 6))?.cash ?? 0));
  set('A09', st.stage >= 3);
  if (st.day === 76) { const a = sumH(st, 65, 71, x => x.ls).s, b = sumH(st, 65, 71, x => x.buyers).s, sp = sumH(st, 65, 76, x => x.spoil).s, rv = sumH(st, 65, 76, x => x.rev).s; set('A11', b && 1000 * a / b <= 50 && sp <= 0.1 * rv); }
  set('A13', streakOf(st) >= 30);
  if (st.day >= 90) { set('A14', st.sessionsPlayed && (st.sessionsPlayed - st.sessionsAuto) / st.sessionsPlayed >= 0.8); set('A15', true); }
}
export const milestoneRows = st => MILESTONES.map(M => { const v = metricValue(st, M), s = st.stars[M.id] || 0; return { M, v, stars: s, open: st.day >= M.open, closed: st.day > M.dl || !!st.stars[M.id + 'closed'] }; });
export { dayLabel };
export function arrivalOf(st, sup) { // hàng đặt bây giờ sẽ đến lúc nào
  if (sup === 'C') { const dd = st.day + 2; return { day: dd, k: 0, ok: supplierOpenOn('C', dd), txt: dayLabel(dd) + ' S1' }; }
  const [d, k] = nextSess(st.day, st.k); return { day: d, k, ok: supplierOpenOn(sup, d), txt: dayLabel(d) + ' ' + ['S1', 'S2', 'S3', 'S4', 'S5'][k] };
}
export const avgCupsPerSession = st => { const h = st.hist.slice(-7); if (!h.length) return null; return h.reduce((a, x) => a + x.cups, 0) / h.reduce((a, x) => a + (x.n || 4), 0); };
export const apBase = st => Math.round(P.ap[st.stage] * P.difficulty[st.diff].ap);
