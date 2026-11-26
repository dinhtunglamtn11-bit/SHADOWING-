// TeaLab: engine (luật chơi). Không đụng DOM, không đọc đồng hồ thật, không Math.random: mọi số ngẫu nhiên theo bộ đếm u(seed, luồng, chỉ số),
// nên cùng (trạng thái đầu buổi, seed, lệnh) luôn ra cùng kết quả (dùng cho “chạy lại giả định”).
import {
  K, PARAMS as P, ITEMS, ITEM_ORDER, ING, ING_ORDER, SUPPLIERS, SEG, SEGS, BUYERS, PROFILE, DELTA, WEATHER_PLAN, WEATHER_SEED, MDOW, DAYMODS, THETA_MODS,
  HOLIDAY_WAGE, zoneOf, ZONES, STORE, TERMS, TIERS, CREDIT, PREP, PACK_SHARE, BAR_CROWD, CONTRACT, HUB, CRISES, DEFAULT_CLOSED, EXTRA_SESSION_DAYS, inSeason, WEEKLY, UNLOCKS, SEASONAL, CAL_NOTES, EVENTS, EVENT_BY_ID, SCHEDULED, MILESTONES, TITLES, BADGES, dateOf, dayLabel, dow as dowOf, SKY_NAME, SESS_MIN,
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
    v: 1, rules: 3, payables: [], contracts: [], prep: {}, assign: {}, seed, diff, day: 1, k: 0, phase: 'PREP', stage: 1, cash: P.startCash, rep: P.startRep, loyal: P.startLoyal, debt: 0, ap: 0, apCarry: 0, ip: 0, x,
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
  pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Luật kho: chỗ chứa có hạn, giữ hàng có phí', body: 'Kệ khô, tủ lạnh và ngăn đá đều có sức chứa. Hàng tồn tốn phí giữ mỗi ngày. Mỗi nhà cung cấp có mức đặt tối thiểu, thời gian giao và mức miễn phí giao riêng. Xem mục Đặt hàng và Kho.' });
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
  if (f.t === 'cash.add') { const v = rm(f.v * mag); st.cash += v; spend(st, -v); ledger(st, 'Sự kiện: ' + e.name, v); return; }
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
  else if (sp.startsWith('hedge:')) { const [, id, kind] = sp.split(':'); st.flags['hedge' + id] = kind; if (kind === 'space') st.fx.push({ id, t: 'store.boost', op: 'add', v: 0.4, from: tau(day, 0), to: tau(day + 11, 9) }); }
  else if (sp === 'fridgeSale') { if (st.stage >= 2 && !st.equip.fridge && st.cash >= 4800 * K) { st.cash -= 4800 * K; st.equip.fridge = day; ledger(st, 'Mua tủ mát giảm giá', -4800 * K); } }
}
export function applyChoice(st, mailId, choiceId, auto = false) {
  const m = st.mails.find(x => x.id === mailId); if (!m || m.resolved) return { ok: false, reason: 'Thư này đã xử lý.' };
  const e = EVENT_BY_ID[m.ev], c = e.choices.find(x => x.id === choiceId); if (!c) return { ok: false, reason: 'Lựa chọn không có.' };
  const need = c.ap || 0;
  if (!auto && st.ap < need) return { ok: false, reason: 'Không đủ điểm hành động (AP).' };
  if (c.cash && !auto && st.cash + c.cash < -5000 * K) return { ok: false, reason: 'Không đủ tiền.' };
  if (!auto && c.sp === 'fridgeSale' && (st.stage < 2 || st.equip.fridge || st.cash < 4800 * K)) return { ok: false, reason: st.equip.fridge ? 'Bạn đã có tủ mát.' : 'Không đủ tiền mua tủ (4.800K).' };
  if (!auto && c.fx?.length && c.fx.every(f => /@\d/.test(f.ts || ''))) { // đơn đặt trước: buổi khách hẹn đã qua thì không nhận được nữa
    const last = Math.max(...c.fx.map(f => +f.ts.split('@')[1]));
    if (st.day > m.day || st.k > last || (st.k === last && st.phase !== 'PREP' && st.phase !== 'LIVE')) return { ok: false, reason: 'Buổi khách hẹn đã qua.' };
  }
  if (!auto && need) { st.ap -= need; if (st.phase !== 'PREP' && st.phase !== 'LIVE') st.apCarry = Math.min(st.apCarry || 0, st.ap); }
  if (c.cash) { st.cash += c.cash; spend(st, -c.cash); ledger(st, e.name + ': ' + c.label, c.cash); }
  const at = tau(st.day, st.k), mag = P.difficulty[st.diff].mag;
  for (const f of c.fx || []) applyFx(st, e, f, 1, tau(st.day, 0), tau(st.day + Math.max(1, e.dur) - 1, 9));
  if (c.sp) special(st, c.sp);
  if (!auto && e.sev >= 2 && choiceId !== e.choices[0].id) st.flags.early = st.day; // phản ứng sớm sau manh mối (huy hiệu A06)
  if (e.id === 'E23' && choiceId === 'ignore') { /* hiệu ứng nền đã áp dụng */ }
  if (e.id === 'E23' && choiceId !== 'ignore') st.fx = st.fx.filter(f => !(f.id === 'E23'));
  if (e.id === 'E03' && choiceId === 'return') { st.fx = st.fx.filter(f => f.id !== 'E03'); const l = st.lots.dao.reduce((a, b) => a + b.q * b.cost, 0); st.cash += rm(l * 0.8); spend(st, l - rm(l * 0.8)); ledger(st, 'Trả lô đào', rm(l * 0.8)); st.lots.dao = []; }
  if (e.special === 'inspect' && choiceId === 'clean') st.flags.clean = st.day;
  m.resolved = true; m.chosen = choiceId; m.read = true; m.auto = auto;
  return { ok: true, label: c.label };
}
function inspectResult(st, dirty) { // kết quả kiểm tra vệ sinh (E33) ở cuối ngày xảy ra; dirty: cuối ngày còn lô đến hạn (đo trước khi bỏ hàng hỏng)
  const p = st.plan.find(x => x.ev === 'E33' && x.day === st.day && x.happened); if (!p) return;
  const bad = dirty && st.flags.clean !== st.day;
  if (bad) { st.rep = clamp(st.rep - 3, 0, 100); st.cash -= 400 * K; spend(st, 400 * K); ledger(st, 'Phạt vệ sinh', -400 * K); pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Kiểm tra vệ sinh: chưa đạt', body: 'Kho còn lô hết hạn. Bạn bị phạt 400K và danh tiếng −3.' }); }
  else { st.rep = clamp(st.rep + 2, 0, 100); pushMail(st, { kind: 'REWARD', src: 'official', title: 'Kiểm tra vệ sinh: đạt', body: 'Kho sạch, giấy tờ đủ. Danh tiếng +2.' }); }
}
// khoản chi khác trong ngày (phí giao, phí tự trông, chuyển kho, sự kiện…), âm là khoản thu
const spend = (st, v) => { st.dayOther = (st.dayOther || 0) + v; };
const grossProfit = x => x.profit + (x.other || 0); // lãi dùng để chấm cột mốc: chưa trừ khoản chi khác, đúng mức đã cân ngưỡng sao
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
export function stations(st) { // ai làm gì: mặc định người đầu tiên thu ngân, người thứ hai giao hàng (từ GĐ3, có xe), còn lại cùng Lame pha chế
  const staff = st.staff.filter(s => s.avail !== false), as = (st.rules >= 3 && st.assign) || {}, canShip = st.stage >= 3 && !!st.equip.truck;
  const role = s => (as[s.id] === 'ship' && !canShip ? 'bar' : as[s.id] || 'auto');
  let cash = staff.filter(s => role(s) === 'cash'), ship = staff.filter(s => role(s) === 'ship');
  const pack = staff.filter(s => role(s) === 'pack'), auto = staff.filter(s => role(s) === 'auto');
  if (!cash.length && auto.length) cash = [auto.shift()];
  if (!ship.length && canShip && staff.length >= 2 && auto.length) ship = [auto.shift()];
  const bar = [{ ...st.lame, id: 'lame', skill: 1 }, ...auto, ...staff.filter(s => role(s) === 'bar')];
  return { cash, bar, ship, pack };
}
// công suất quầy pha: từ đợt 3 quầy chật, người sau làm được ít hơn
export function barCap(st, list) {
  const e = list.map(p => staffEff(st, p));
  return st.rules >= 3 ? e.sort((a, b) => b - a).reduce((a, v, i) => a + v * (BAR_CROWD[Math.min(i, BAR_CROWD.length - 1)]), 0) : e.reduce((a, b) => a + b, 0);
}

// ---------- đợt 3: sơ chế theo mẻ ----------
export const isV3 = st => st.rules >= 3;
export const prepOn = (st, g) => isV3(st) && !!PREP[g] && st.stage >= PREP[g].stage;
export const prepItems = st => Object.keys(PREP).filter(g => prepOn(st, g));
export function prepPlan(st, g, k = st.k) { // số -1 = tự tính theo các buổi cùng giờ gần đây
  const p = st.prep?.[g] || {}, rows = (st.log || []).filter(r => r.open && r.k === k).slice(-4);
  const est = rows.length ? Math.round(rows.reduce((a, r) => a + Math.max(0, (r.use[g] || 0) - (r.w?.[g] || 0)) * Math.min(1.6, r.want ? r.want / Math.max(1, r.want - r.ls) : 1), 0) / rows.length) : PREP[g].batch * 2; // chỉ lấy phần bán được: tính cả phần đổ đi thì nấu dư lại đẩy ước lượng lên mãi
  const batch = p.batch > 0 ? p.batch : Math.max(PREP[g].batch, Math.ceil(est * 0.2));
  return { est, first: p.first >= 0 ? p.first : Math.round(est * PREP[g].share), batch, at: p.at >= 0 ? p.at : Math.max(PREP[g].at, Math.ceil(est * PREP[g].min / 240 * PREP[g].cover)), set: { first: p.first ?? -1, batch: p.batch ?? -1, at: p.at ?? -1 } };
}
export const readyQty = (S, g) => (S.prep?.[g]?.ready || []).reduce((a, l) => a + l.q, 0);
export const cookingQty = (S, g) => (S.prep?.[g]?.cooking || []).reduce((a, b) => a + b.q, 0);
function cook(st, S, g, qty, now) { // lấy nguyên liệu thô ra nấu; now = mẻ nấu sẵn trước giờ mở cửa
  let need = qty; const lots = [];
  for (const l of st.lots[g]) { if (need <= 0) break; const t = Math.min(l.q, need); if (t > 0) { l.q -= t; need -= t; lots.push({ q: t, cost: l.cost, qual: l.qual }); } }
  const got = qty - need; if (!got) return 0;
  const P3 = S.prep[g]; P3.made += got;
  if (now) P3.ready.push(...lots); else { P3.cooking.push({ q: got, at: S.tick + PREP[g].min, lots }); S.Wb += PREP[g].work; }
  return got;
}
function prepStart(st, S, now = true) { // now = false: mở cửa lại giữa buổi, không có mẻ nấu sẵn
  if (!isV3(st) || !S.open) return;
  for (const g of prepItems(st)) {
    if (!ITEM_ORDER.some(i => st.menu[i] && inSeason(i, S.day) && ITEMS[i].ing.includes(g))) continue;
    const plan = prepPlan(st, g, S.k); (S.prep ||= {})[g] = { ready: [], cooking: [], made: 0, plan };
    cook(st, S, g, plan.first, now);
  }
}
function prepTick(st, S) {
  for (const [g, p] of Object.entries(S.prep || {})) {
    for (const b of p.cooking) if (S.tick >= b.at) { p.ready.push(...b.lots); b.done = true; }
    p.cooking = p.cooking.filter(b => !b.done);
    const plan = p.plan;
    if (S.open && plan.at > 0 && readyQty(S, g) + cookingQty(S, g) <= plan.at && S.len - S.tick > PREP[g].min + 45) cook(st, S, g, plan.batch, false);
  }
}
const have = (st, S, g, n) => (S.prep?.[g] ? readyQty(S, g) >= n : stockOf(st, g) >= n);
const takePrep = (st, S, g) => { if (!S.prep?.[g]) return takeOne(st, g); for (const l of S.prep[g].ready) if (l.q > 0) { l.q -= 1; return l; } return null; };
function prepEnd(S) { // hết buổi: phần đã nấu mà chưa bán phải đổ đi
  let cost = 0; const by = {}, val = {};
  for (const [g, p] of Object.entries(S.prep || {})) for (const l of [...p.ready, ...p.cooking.flatMap(b => b.lots)]) if (l.q > 0) { cost += l.q * l.cost; by[g] = (by[g] || 0) + l.q; val[g] = (val[g] || 0) + l.q * l.cost; }
  return { cost: rm(cost), by, val };
}

// ---------- sổ quyết định tốn tiền (cho phân tích sau mùa) ----------
export function avgMargin(st) { // lãi gộp trung bình một khách mua: giá trừ giá vốn của các món đang bán, nhân 1,25 ly
  const on = ITEM_ORDER.filter(i => st.menu[i] && !ITEMS[i].seasonal && ITEMS[i].stage <= st.stage);
  return on.length ? Math.max(0, on.reduce((a, i) => a + st.prices[i] * K - unitCost(st, i), 0) / on.length * 1.25) : 0;
}
export function addLoss(st, key, amt, units = 0) {
  if (!(amt > 0)) return;
  st.lossFrom ??= st.day;
  const x = ((st.loss ||= {})[key] ||= { amt: 0, u: 0, d: 0, da: 0, worst: 0, wd: 0 });
  x.amt += amt; x.u += units;
  if (x.d !== st.day) { x.d = st.day; x.da = 0; }
  x.da += amt; if (x.da > x.worst) { x.worst = x.da; x.wd = st.day; }
}
function sessionLosses(st, R, rep, waste) {
  const m = avgMargin(st), nr = R.notReadyBy || {};
  for (const [g, c] of Object.entries(R.stockout || {})) { const n = Math.min(c, nr[g] || 0); addLoss(st, 'stock:' + g, (c - n) * m, c - n); addLoss(st, 'notready:' + g, n * m, n); }
  if (R.lostWait) { const by = R.lwBy || { bar: R.lostWait }, tot = Object.values(by).reduce((a, b) => a + b, 0) || 1; for (const [w, n] of Object.entries(by)) { const c = n / tot * R.lostWait; addLoss(st, 'wait:' + w, c * m, c); } }
  for (const [g, q] of Object.entries(waste.by)) addLoss(st, 'prep:' + g, waste.val[g] || 0, q);
  if (rep.q?.alt) { // giá: chạy lại cùng khách với giá khác; chỉ tính khi chênh trên 5%
    const act = rep.rev - rep.cogs, best = Object.entries(rep.q.alt).reduce((a, b) => (b[1] > a[1] ? b : a));
    if (best[1] - act > Math.max(0, act * 0.05)) addLoss(st, 'price:' + best[0], best[1] - act, 1);
  }
}

// ---------- đợt 3: hợp đồng ----------
export const contractOf = (st, sup, g) => (st.contracts || []).find(c => c.sup === sup && c.g === g && st.day <= c.end);
export function contractQty(st, g) { // lượng cam kết mỗi tuần: khoảng 70% mức dùng gần đây
  const rows = (st.log || []).filter(r => r.open).slice(-20), mu = rows.length ? rows.reduce((a, r) => a + (r.use[g] || 0), 0) / rows.length : 0;
  return Math.max(30, Math.round(mu * 28 * 0.7 / 10) * 10);
}
export const breakFee = (st, c) => rm(c.week * ING[c.g].c * K * CONTRACT.penalty);
function contractTick(st, day) { // cuối ngày: chốt tuần cam kết
  let pen = 0;
  for (const c of st.contracts || []) {
    if ((day - c.start + 1) % 7 === 0) {
      let open = 0; for (let d = day - 6; d <= day; d++) if (supOpen(st, c.sup, d)) open++; // nhà cung cấp đóng cửa ngày nào thì không đòi cam kết ngày đó
      const short = Math.max(0, Math.round(c.week * open / 7) - c.got);
      if (short) { const p = rm(short * ING[c.g].c * K * CONTRACT.penalty); pen += p; pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Hợp đồng: mua chưa đủ cam kết', body: 'Còn thiếu ' + short + ' phần ' + ING[c.g].name.toLowerCase() + ' trong tuần. Phí bù ' + Math.round(p / K) + 'k.' }); }
      c.got = 0;
    }
    if (day >= c.end) pushMail(st, { kind: 'INFO', src: 'official', title: 'Hợp đồng đã hết hạn', body: 'Hợp đồng ' + ING[c.g].name.toLowerCase() + ' kết thúc.' });
  }
  st.contracts = (st.contracts || []).filter(c => day < c.end);
  st.cash -= pen; return pen;
}

// ---------- đợt 3: khủng hoảng nhiều bước ----------
export const crisisDay = (st, c) => c.day + Math.floor(u(st.seed, 'event', 9000 + c.id.charCodeAt(2)) * 3);
function crisisTick(st) {
  if (!isV3(st) || st.day > 90) return;
  for (const c of CRISES) {
    const d0 = crisisDay(st, c), hedge = st.flags['hedge' + c.id];
    if (st.day === d0 - c.warn && !st.flags['warn' + c.id]) { st.flags['warn' + c.id] = 1; const e = EVENT_BY_ID[c.id]; pushMail(st, { kind: 'DECISION', src: e.ch, title: e.name, body: e.body, ev: c.id, choices: e.choices.map(x => ({ id: x.id, label: x.label, hint: '' })), defaultChoice: 'none', deadline: tau(st.day, 0) + 10 }); }
    c.steps.forEach((s, i) => {
      if (st.day !== d0 + s.at || st.flags['step' + c.id + i]) return; st.flags['step' + c.id + i] = 1;
      if (hedge === s.risk) { pushMail(st, { kind: 'REWARD', src: 'official', ev: c.id, title: 'Phương án dự phòng phát huy tác dụng', body: s.title + '. Nhờ chuẩn bị trước, tiệm bạn không bị ảnh hưởng.' }); return; }
      for (const f of s.fx) st.fx.push({ id: c.id, t: f.t, ts: f.ts, op: f.op || 'add', v: f.v, from: tau(st.day, 0), to: tau(st.day + s.dur - 1, 9) });
      pushMail(st, { kind: 'INFO', src: 'official', ev: c.id, title: s.title, body: s.body });
    });
  }
}
export const supOpen = (st, sup, day) => supplierOpenOn(sup, day) && !(st.fx || []).some(f => f.t === 'supplier.closed' && f.ts === sup && f.from <= tau(day, 0) && tau(day, 0) <= f.to);
export function dqiAvg(st, days = 14) { const a = (st.dqi || []).filter(x => x[0] > st.day - days); return a.length ? a.reduce((s, x) => s + x[1], 0) / a.length : 0; }
export function upgradeStatus(st) { // điều kiện nâng lên giai đoạn kế tiếp
  const k = n => (n / K).toLocaleString('vi-VN') + 'K';
  const free = st.cash - owed(st); // tiền thật sự của mình: trừ phần còn nợ nhà cung cấp
  if (st.stage === 1) { const U = P.upgrade2; const need = U.cash + 3000 * K; return { to: 2, ok: free >= need && st.rep >= U.rep && st.day >= U.days, cost: U.cash, name: 'Tiệm nhỏ', need: [['Tiền ≥ ' + k(need) + ' (phí nâng cấp + vốn lưu động 3.000K)', st.cash >= need], ['Danh tiếng R ≥ ' + U.rep, st.rep >= U.rep], ['Đã mở ≥ ' + U.days + ' ngày', st.day >= U.days]] }; }
  if (st.stage === 2) { const U = P.upgrade3, sk = st.staff.filter(s => s.skill >= 1.1).length; const need = U.cash + 8000 * K; return { to: 3, ok: free >= need && st.rep >= U.rep && sk >= 2, cost: U.cash, name: 'Cửa hàng', need: [['Tiền ≥ ' + k(need) + ' (phí nâng cấp + vốn lưu động 8.000K)', st.cash >= need], ['Danh tiếng R ≥ ' + U.rep, st.rep >= U.rep], ['Có ít nhất 2 nhân viên giỏi (tay nghề ≥ 1,1): hiện ' + sk, sk >= 2]] }; }
  if (st.stage === 3) { const U = P.upgrade4, d = dqiAvg(st); const need = U.cash + 15000 * K; return { to: 4, ok: free >= need && st.rep >= U.rep && d >= U.dqi, cost: U.cash, name: 'Chuỗi (chi nhánh 2)', need: [['Tiền ≥ ' + k(need) + ' (phí nâng cấp + vốn lưu động 15.000K)', st.cash >= need], ['Danh tiếng R ≥ ' + U.rep, st.rep >= U.rep], ['DQI trung bình 14 ngày ≥ ' + U.dqi + ' (hiện ' + Math.round(d) + ')', d >= U.dqi]] }; }
  return { to: 0, ok: false, need: [], cost: 0, name: '' };
}
export const EQUIP = {
  fridge: { name: 'Tủ mát', price: 6000 * K, stage: 2, desc: 'Hàng tươi (sữa, trân châu, đào, vải, chanh, gừng…) dùng thêm 1 ngày.' },
  press: { name: 'Máy ép nắp tự động', price: 4500 * K, stage: 2, desc: 'Pha nhanh hơn 10%.' },
  pearl: { name: 'Bếp nấu trân châu', price: 2000 * K, stage: 2, desc: 'Giá vốn trân châu −8%.' },
  pos: { name: 'Máy POS + thực đơn điện tử', price: 2500 * K, stage: 3, desc: 'Thu ngân nhanh hơn: −5 giây mỗi đơn.' },
  truck: { name: 'Xe giao hàng', price: 3500 * K, stage: 3, desc: 'Mở kênh giao hàng (cần 2 nhân viên trở lên: một người chuyên giao).' },
  rack: { name: 'Kệ kho phụ', price: 900 * K, stage: 1, store: 'dry', desc: 'Kệ khô chứa thêm 50%.' },
  coldbox: { name: 'Tủ lạnh phụ', price: 1600 * K, stage: 1, store: 'cold', desc: 'Tủ lạnh chứa thêm 50%.' },
  freezer: { name: 'Ngăn đá phụ', price: 1000 * K, stage: 1, store: 'ice', desc: 'Ngăn đá chứa thêm 50%.' },
};

// ---------- luật kho v2: sức chứa, công nợ, báo giá ----------
export const isV2 = st => st.rules >= 2;
export function capOf(st, zone, br = 'A') {
  if (br === 'H') return HUB.cap[zone];
  if (br === 'B') return STORE.b2[zone];
  const boost = Object.entries(EQUIP).some(([id, e]) => e.store === zone && st.equip[id]) ? STORE.boost : 0;
  return Math.round(STORE.cap[st.stage][zone] * (1 + boost + fxVal(st, 'store.boost', '', tau(st.day, st.k), 'add'))); // cộng thêm khi thuê kho tạm
}
// số chỗ đang dùng: hàng trong kho + hàng đang trên đường tới đúng chi nhánh đó
export function usedOf(st, zone, br = 'A') {
  const L = lotsOf(st, br); let n = 0;
  for (const g of ING_ORDER) if (zoneOf(g) === zone) n += L[g].reduce((a, l) => a + l.q, 0);
  for (const p of st.pending) if (!p.done && (p.br || 'A') === br) for (const l of (p.transfer ? p.lots : p.lines)) if (zoneOf(l.g) === zone) n += l.q;
  return n;
}
export const freeOf = (st, zone, br = 'A') => Math.max(0, capOf(st, zone, br) - usedOf(st, zone, br));
export const holdCost = st => { if (!isV2(st)) return 0; let c = 0; for (const L of [st.lots, st.b2?.lots, st.hub?.lots]) if (L) for (const g of ING_ORDER) { const r = STORE.zone[zoneOf(g)].hold; for (const l of L[g]) c += l.q * l.cost * r; } return rm(c); }; // phí giữ hàng một ngày
export const creditOpen = (st, sup) => isV2(st) && !!TERMS[sup]?.credit && (st.supLog[sup] || []).filter(x => x[1] !== 'trễ').length >= CREDIT.after;
export const owed = st => (st.payables || []).reduce((a, p) => a + p.amt, 0);
export const creditLeft = st => Math.max(0, CREDIT.limit[st.stage] - owed(st));
const leadSess = (day, k, n) => { let d = day, s = k; for (let i = 0; i < n; i++) [d, s] = nextSess(d, s); return [d, s]; };
// báo giá một đơn: dùng chung cho đặt hàng và số "Tổng" trên giao diện để hai nơi luôn khớp
export function quote(st, sup, lines, opt = {}) {
  const sd = SUPPLIERS[sup], v2 = isV2(st), express = !!opt.express, br = opt.br === 'B' && st.b2 ? 'B' : 'A';
  const early = v2 && !express && !opt.credit && creditOpen(st, sup) ? 1 - CREDIT.disc : 1; // đã được ghi nợ mà trả ngay thì giảm giá
  const out = []; let goods = 0; const need = { dry: 0, cold: 0, ice: 0 };
  for (const l of lines || []) {
    const q = Math.floor(l.q); if (!(q > 0) || !ING[l.g]) continue;
    const cost = rm(unitPrice(st, sup, l.g, q, express) * early); goods += cost * q; need[zoneOf(l.g)] += q; out.push({ g: l.g, q, cost });
  }
  const fee = !out.length ? 0 : express ? P.expressFee : v2 ? (goods >= TERMS[sup].free ? 0 : TERMS[sup].fee) : sd.fee;
  const over = v2 ? ZONES.filter(z => need[z] > 0 && need[z] > freeOf(st, z, br)) : [];
  const short = v2 && !express && out.length && goods < TERMS[sup].min ? TERMS[sup].min - goods : 0;
  return { lines: out, goods, fee, total: goods + fee, need, over, short, br, early: early < 1 };
}
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
  if (st.k === 0) { calendarMails(st); crisisTick(st); }
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
const lotsOf = (st, br) => (br === 'H' && st.hub ? st.hub.lots : br === 'B' && st.b2 ? st.b2.lots : st.lots);
function deliver(st, p) {
  if (p.transfer) { const L = lotsOf(st, p.br); for (const l of p.lots) { L[l.g].push({ ...l }); L[l.g].sort((a, b) => a.last - b.last); } p.done = true; p.status = 'chuyển kho'; return; } // chuyển hàng giữa hai chi nhánh: giao đủ, giữ nguyên hạn dùng
  const day = st.day, rho = clamp(SUPPLIERS[p.sup].rho + (p.lines.some(l => l.contract) ? CONTRACT.rel : 0) + fxVal(st, 'supplier.reliability', p.sup, tau(st.day, st.k), 'add') + (day === 35 ? -0.10 : 0), 0.05, 0.999);
  let frac = 1, status = 'đủ'; const r = u(st.seed, 'supplier', p.id * 3);
  if (!p.late && r > rho) { const r2 = u(st.seed, 'supplier', p.id * 3 + 1); if (r2 < 0.5) { p.late = 1; p.at = 0; const [nd, nk] = nextSess(st.day, st.k); p.t = tau(nd, nk); status = 'trễ'; st.supLog[p.sup].push([day, 'trễ']); return; } frac = 1 - (0.1 + 0.3 * u(st.seed, 'supplier', p.id * 3 + 2)); status = 'thiếu ' + Math.round((1 - frac) * 100) + '%'; }
  p.done = true; if (status !== 'trễ') st.supLog[p.sup].push([day, p.late ? 'đủ (sau khi trễ)' : status]);
  let refund = 0;
  for (const l of p.lines) {
    const q = l.contract ? l.q : Math.floor(l.q * frac); refund += (l.q - q) * l.cost; // dòng thuộc hợp đồng được ưu tiên giao đủ
    if (q <= 0) continue;
    const sd = SUPPLIERS[p.sup], qual = clamp(sd.q + normInv(u(st.seed, 'supplier', p.id * 53 + ING_ORDER.indexOf(l.g) + 7)) * sd.qsd + fxVal(st, 'lot.quality', l.g, tau(day, st.k), 'add'), 0.5, 1.1);
    lotsOf(st, p.br)[l.g].push({ q, last: day + maxShelf(st, l.g) - 1, cost: l.cost, qual });
  }
  if (refund > 0) { const debt = (st.payables || []).find(x => x.id === p.id); if (debt) debt.amt = Math.max(0, debt.amt - rm(refund)); else { st.cash += rm(refund); ledger(st, 'Hoàn phần giao thiếu (' + p.sup + ')', rm(refund)); } }
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
      const p = Math.round(c.price), lo = Math.ceil(it.p * P.priceBand[0]), hi = Math.floor(it.p * P.priceBand[1]); if (!(p >= lo && p <= hi)) return fail(`Giá phải từ ${lo}K đến ${hi}K.`);
      if (p === st.prices[c.item]) return { ok: true };
      if (live) { if (st.ap < 1) return fail('Không đủ AP.'); st.ap -= 1; S.cmds.push({ tk: S.tick, ...c }); }
      st.prices[c.item] = p; return { ok: true };
    }
    case 'SET_POLICY': { if (!isV2(st)) return fail('Đặt hàng tự động chỉ có ở lượt chơi mới.'); if (!ING[c.g]) return fail('Nguyên liệu không có.'); const br = c.br === 'B' && st.b2 ? 'B' : 'A'; st.pol ||= { A: {}, B: {} };
      const p = c.pol; if (!p || p.m === 'off') { delete st.pol[br][c.g]; return { ok: true }; } const n = v => Math.max(0, Math.floor(+v || 0)), o = { m: p.m, s: n(p.s), Q: n(p.Q), S: n(p.S), T: Math.max(1, n(p.T)), sup: SUPPLIERS[p.sup] ? p.sup : 'A' };
      if (o.m === 'sq' && !(o.Q > 0)) return fail('Lượng đặt Q phải lớn hơn 0.'); if (o.m === 'ss' && !(o.S > o.s)) return fail('Mức đặt tới S phải lớn hơn điểm đặt lại s.'); if (o.m === 'per' && !(o.S > 0)) return fail('Mức đặt tới S phải lớn hơn 0.'); if (!['sq', 'ss', 'per'].includes(o.m)) return fail('Kiểu luật không có.');
      st.pol[br][c.g] = o; return { ok: true }; }
    case 'SET_PREP': { if (!prepOn(st, c.g)) return fail('Sơ chế theo mẻ chưa mở.'); const n = v => (v === '' || v == null || +v < 0 ? -1 : Math.min(300, Math.floor(+v || 0))); (st.prep ||= {})[c.g] = { first: n(c.first), batch: n(c.batch), at: n(c.at) }; return { ok: true }; }
    case 'COOK': { if (!live || !S.open) return fail('Chỉ nấu thêm khi đang mở cửa.'); if (!S.prep?.[c.g]) return fail('Sơ chế theo mẻ chưa mở.'); if (st.ap < 1) return fail('Cần 1 AP.'); const got = cook(st, S, c.g, S.prep[c.g].plan.batch, false); if (!got) return fail('Hết nguyên liệu để nấu.'); st.ap -= 1; S.cmds.push({ tk: S.tick, t: 'COOK', g: c.g }); return { ok: true, got, min: PREP[c.g].min }; }
    case 'ASSIGN': { if (!isV3(st)) return fail('Phân trạm chỉ có ở lượt chơi mới.'); if (!st.staff.some(x => x.id === c.id)) return fail('Không có nhân viên này.'); st.assign ||= {}; if (['cash', 'bar', 'pack', 'ship'].includes(c.role)) st.assign[c.id] = c.role; else delete st.assign[c.id]; return { ok: true }; }
    case 'SIGN_CONTRACT': {
      if (!isV3(st) || st.stage < CONTRACT.stage) return fail('Hợp đồng mở từ giai đoạn 2.'); if (!['A', 'B'].includes(c.sup) || !ING[c.g]) return fail('Chỉ ký hợp đồng với nhà cung cấp A hoặc B.');
      st.contracts ||= []; if (st.contracts.length >= CONTRACT.max) return fail('Tối đa 2 hợp đồng cùng lúc.'); if (st.contracts.some(x => x.g === c.g)) return fail('Nguyên liệu này đã có hợp đồng.');
      if ((st.log || []).filter(r => r.open).length < 8) return fail('Cần ít nhất 8 buổi số liệu để ký hợp đồng.');
      st.contracts.push({ g: c.g, sup: c.sup, week: contractQty(st, c.g), start: st.day, end: st.day + CONTRACT.days - 1, got: 0 }); return { ok: true };
    }
    case 'BREAK_CONTRACT': { const x = (st.contracts || []).find(q => q.g === c.g); if (!x) return fail('Không có hợp đồng này.'); const fee = breakFee(st, x); if (st.cash < fee) return fail('Không đủ tiền (' + Math.round(fee / K) + 'k).'); st.cash -= fee; spend(st, fee); ledger(st, 'Phí huỷ hợp đồng', -fee); st.contracts = st.contracts.filter(q => q !== x); return { ok: true }; }
    case 'SET_HUB': {
      if (!isV3(st) || st.stage < HUB.stage) return fail('Kho trung tâm mở ở giai đoạn 4.');
      st.hub ||= { on: false, share: false, lots: Object.fromEntries(ING_ORDER.map(g => [g, []])), req: {}, out: {} };
      if (c.on === false && st.hub.on) { const lots = []; for (const g of ING_ORDER) for (const l of st.hub.lots[g]) if (l.q > 0) lots.push({ ...l, g }); for (const g of ING_ORDER) st.hub.lots[g] = []; if (lots.length) { const [nd, nk] = nextSess(st.day, st.k); st.pending.push({ id: ++st.orderId, sup: 'A', transfer: true, br: 'A', lots, t: tau(nd, nk), at: 0, lines: [] }); } }
      if (c.on === false) for (const p of st.pending) if (p.br === 'H') p.br = 'A'; // đơn đang về kho trung tâm chuyển sang chi nhánh 1
      if (c.on != null) st.hub.on = !!c.on; if (c.share != null) st.hub.share = !!c.share; return { ok: true };
    }
    case 'PLACE_ORDER': return placeOrder(st, c.sup, c.lines, false, S, c.br, { credit: c.credit });
    case 'TRANSFER': { // chuyển hàng giữa hai chi nhánh: phí 40K, đến đầu buổi kế
      if (st.stage < 4 || !st.b2) return fail('Chuyển kho chỉ có ở giai đoạn 4.'); const from = c.from === 'B' ? st.b2.lots : st.lots, to = c.from === 'B' ? 'A' : 'B', g = c.g, q = Math.floor(c.q);
      if (!ING[g] || !(q > 0)) return fail('Chọn nguyên liệu và số phần.'); if (from[g].reduce((a, l) => a + l.q, 0) < q) return fail('Chi nhánh gửi không đủ hàng.'); if (st.cash < P.branch.fee) return fail('Không đủ tiền phí chuyển (40K).');
      if (isV2(st) && q > freeOf(st, zoneOf(g), to)) return fail('Chi nhánh nhận không đủ chỗ trong kho.');
      let need = q; const moved = []; for (const l of from[g]) { if (need <= 0) break; const t = Math.min(l.q, need); l.q -= t; need -= t; moved.push({ g, q: t, last: l.last, cost: l.cost, qual: l.qual }); }
      st.cash -= P.branch.fee; spend(st, P.branch.fee); ledger(st, 'Phí chuyển kho', -P.branch.fee); const [nd, nk] = nextSess(st.day, st.k); st.pending.push({ id: ++st.orderId, sup: 'A', transfer: true, br: to, lots: moved, t: tau(nd, nk), at: 0, lines: [] });
      return { ok: true, arrive: dayLabel(nd) + ' ' + ['S1', 'S2', 'S3', 'S4', 'S5'][nk] };
    }
    case 'EXPRESS_ORDER': if (!live) return fail('Giao khẩn chỉ dùng khi đang mở cửa.'); return placeOrder(st, 'B', c.lines, true, S);
    case 'FLASH_PROMO': { if (!live) return fail('Khuyến mãi chỉ dùng khi mở cửa.'); if (st.ap < 2) return fail('Cần 2 AP.'); if (S.promo) return fail('Đã khuyến mãi trong buổi này.'); st.ap -= 2; S.promo = true; S.cmds.push({ tk: S.tick, t: 'FLASH_PROMO' }); const n = st.promoDays.filter(d => st.day - d <= 3).length; S.promoMul = 1 + P.promoBoost / (1 + n); st.promoDays.push(st.day); return { ok: true }; }
    case 'TAKE_BREAK': { if (!live) return fail('Chỉ nghỉ khi đang mở cửa.'); if (st.ap < 1) return fail('Cần 1 AP.'); if (S.tick < S.breakUntil) return fail('Đang nghỉ rồi.'); st.ap -= 1; S.breakUntil = S.tick + 15; st.lame.energy = clamp(st.lame.energy + 10, 0, 100); S.cmds.push({ tk: S.tick, t: 'TAKE_BREAK' }); return { ok: true }; }
    case 'CLOSE_EARLY': { if (!live) return fail('Chỉ dùng khi đang mở cửa.'); if (st.ap < 1) return fail('Cần 1 AP.'); st.ap -= 1; S.open = false; S.cmds.push({ tk: S.tick, t: 'CLOSE_EARLY' }); return { ok: true }; }
    case 'REOPEN': { if (!live) return fail('Chỉ dùng khi đang mở cửa.'); if (S.open) return { ok: true }; if (st.ap < 1) return fail('Cần 1 AP.'); st.ap -= 1; S.open = true; if (!S.prep) prepStart(st, S, false); S.cmds.push({ tk: S.tick, t: 'REOPEN' }); return { ok: true }; }
    case 'SET_FORECAST': { if (st.phase !== 'PREP') return fail('Chỉ đặt dự đoán trước khi mở cửa.'); if (st.forecast) return fail('Mỗi buổi chỉ đặt một lần.'); const lo = +c.lo, hi = +c.hi; if (!(lo >= 0 && hi > lo)) return fail('Khoảng dự đoán không hợp lệ.'); st.forecast = { lo, hi }; return { ok: true }; }
    case 'CHOOSE': { const r = applyChoice(st, c.mail, c.choice, false); if (r.ok && live && S) { S.lam = lamTable(st, S); if (S.B) S.B.lam = lamTable(st, S.B, P.branch); } return r; } // chọn khi đang bán: tính lại lượng khách ngay
    case 'UPGRADE': { if (st.phase !== 'REVIEW' && st.phase !== 'PREP') return fail('Nâng cấp ở pha xem lại hoặc chuẩn bị.'); const s = upgradeStatus(st); if (!s.to) return fail('Đã ở giai đoạn cao nhất của mùa này.'); if (!s.ok) return fail('Chưa đủ điều kiện nâng cấp.'); st.cash -= s.cost; ledger(st, 'Nâng cấp lên ' + s.name, -s.cost); st.stage = s.to; st.stageDay[s.to] = st.day; st.cand = genCandidates(st);
      for (const it of ITEM_ORDER) if (ITEMS[it].stage === s.to && !(it in st.menu)) st.menu[it] = false; for (const it of ITEM_ORDER) if (!(it in st.prices)) st.prices[it] = ITEMS[it].p;
      const body = { 2: 'Bạn có chỗ ngồi, hai trạm làm việc, thêm 4 món (bật trong Thực đơn), nhà cung cấp C và thiết bị. Chi phí cố định tăng lên 1.750K mỗi ngày: hãy tuyển người và tăng lưu lượng.', 3: 'Cửa hàng: thêm 4 món, tối đa 6 nhân viên, máy POS và xe giao hàng (kênh giao hàng tận nơi, cần một nhân viên chuyên giao), chi phí cố định 4.100K mỗi ngày, lưu lượng ×3,4.', 4: 'Chuỗi: chi nhánh thứ hai khai trương với kho và nhân viên riêng (đặt hàng cho từng nơi, chuyển hàng qua lại tốn 40K). Chi nhánh 2 thêm lưu lượng khách lớn, chi phí cố định 6.700K mỗi ngày, tối đa 8 nhân viên, 9 AP mỗi buổi.' }[s.to];
      if (s.to === 4) { st.b2 = { lots: Object.fromEntries(ING_ORDER.map(g => [g, []])) }; for (const [g, q] of Object.entries({ ly: 200, tra: 200, duong: 200, da: 120, chanh: 60, sua: 80, tranchau: 60, dao: 60, gung: 40, matong: 60 })) st.b2.lots[g].push({ q, last: st.day + ING[g].shelf - 1, cost: rm(ING[g].c * K), qual: 0.97 }); }
      if (s.to === 2) st.badges.A08 = st.badges.A08 || st.day; if (s.to === 3) st.badges.A09 = st.badges.A09 || st.day;
      pushMail(st, { kind: 'REWARD', src: 'official', title: 'Chào mừng giai đoạn ' + s.to + ': ' + s.name, body });
      const more = isV3(st) && { 2: 'Từ giờ trân châu phải nấu và trà phải ủ theo mẻ: xem mục Sơ chế theo mẻ trước khi mở cửa. Bạn cũng phân được trạm cho nhân viên và ký hợp đồng mua hàng.', 4: 'Bạn mở được kho trung tâm cho hai chi nhánh ở pha chuẩn bị.' }[s.to];
      if (more) pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Việc mới ở giai đoạn ' + s.to, body: more });
      return { ok: true }; }
    case 'BUY_EQUIP': { const e = EQUIP[c.id]; if (!e || st.equip[c.id]) return fail('Đã có thiết bị này.'); if (e.store && !isV2(st)) return fail('Thiết bị kho chỉ có ở lượt chơi mới.'); if (st.stage < e.stage) return fail('Thiết bị này mở từ giai đoạn ' + e.stage + '.'); if (st.cash < e.price) return fail('Không đủ tiền.'); st.cash -= e.price; ledger(st, 'Mua ' + e.name, -e.price); st.equip[c.id] = st.day; return { ok: true }; }
    case 'HIRE': { if (st.stage < 2) return fail('Tuyển người từ giai đoạn 2.'); if (st.staff.length >= P.staffMax[st.stage]) return fail('Đã đủ số nhân viên tối đa của giai đoạn này.'); const x = st.cand.find(q => q.id === c.id); if (!x) return fail('Ứng viên không còn.'); st.staff.push({ id: 's' + (++st.staffId), name: x.name, skill: x.skill, wage: x.wage, rel: x.rel, trait: x.trait, energy: 100, mood: 70, shifts: 0, avail: true, since: st.day }); st.cand = st.cand.filter(q => q.id !== c.id); return { ok: true }; }
    case 'FIRE': { const i = st.staff.findIndex(q => q.id === c.id); if (i < 0) return fail('Không có nhân viên này.'); const m = st.staff[i]; const pay = m.wage * 2; if (st.cash < pay) return fail('Không đủ tiền bồi thường (' + (pay / K) + 'k).'); st.cash -= pay; spend(st, pay); ledger(st, 'Bồi thường ' + m.name, -pay); st.staff.splice(i, 1); for (const q of st.staff) q.mood = clamp(q.mood - 6, 0, 100); return { ok: true }; }
    case 'INTERVIEW': { if (st.phase === 'LIVE') return fail('Phỏng vấn ở pha chuẩn bị hoặc xem lại.'); const x = st.cand.find(q => q.id === c.id); if (!x) return fail('Ứng viên không còn.'); x.seen = 1; return { ok: true }; }
    case 'START_EXPERIMENT': {
      if (!st.tools.exp) return fail('Cần công cụ “Thử nghiệm giá” (mua bằng IP).'); if (st.phase !== 'PREP') return fail('Bắt đầu thử nghiệm ở pha chuẩn bị.'); if (st.exp && !st.exp.done) return fail('Đang có một thử nghiệm.');
      const it = ITEMS[c.item]; if (!it || !st.menu[c.item]) return fail('Món này chưa bán.'); const pa = st.prices[c.item], pb = Math.round(c.pb), lo = Math.ceil(it.p * P.priceBand[0]), hi = Math.floor(it.p * P.priceBand[1]);
      if (!(pb >= lo && pb <= hi) || pb === pa) return fail(`Giá thử phải khác giá hiện tại và nằm trong ${lo}–${hi}K.`);
      st.exp = { item: c.item, pa, pb, blocks: Math.max(6, Math.min(24, c.blocks || 12)), n: 0, a: [], b: [], arm: 0, done: false, start: st.day }; return { ok: true };
    }
    case 'STOP_EXPERIMENT': { if (st.exp && !st.exp.done) { st.prices[st.exp.item] = st.exp.pa; st.exp = null; } return { ok: true }; }
    case 'TOOL': { const t = (c.tool || {}); if (st.tools[t.id]) return fail('Đã có công cụ này.'); if (t.need && !st.tools[t.need]) return fail('Cần mở công cụ “Đếm khách” trước.'); if (st.day < t.day) return fail('Mở từ ngày ' + t.day + '.'); if (st.ip < t.cost) return fail('Không đủ điểm phân tích (IP).'); st.ip -= t.cost; st.tools[t.id] = st.day; return { ok: true }; }
    default: return fail('Lệnh không hỗ trợ.');
  }
}
// giá một phần khi đặt (dùng chung cho đặt hàng và số "Tổng" trên giao diện để hai nơi luôn khớp)
const discountOf = (st, q) => (isV2(st) ? (TIERS.find(t => q >= t[0]) || [0, 0])[1] : q >= P.discountQty ? P.discountPct : 0);
export const unitPrice = (st, sup, g, q = 0, express = false) => marketPrice(st, g) * (!express && contractOf(st, sup, g) ? 1 - CONTRACT.disc : 1) * SUPPLIERS[sup].mul * fxVal(st, 'supplier.price', sup) * (1 - discountOf(st, q)) * (st.equip.pearl && g === 'tranchau' ? 0.92 : 1) * (express ? P.expressMul : 1);
function placeOrder(st, sup, lines, express, S, br, opt = {}) {
  const sd = SUPPLIERS[sup], fail = reason => ({ ok: false, reason }), v2 = isV2(st), k$ = n => Math.round(n / K).toLocaleString('vi-VN') + 'K';
  if (!sd || sd.stage > st.stage || (sd.needFlag && !st.flags[sd.needFlag])) return fail('Nhà cung cấp này chưa mở.');
  lines = (lines || []).filter(l => l.q > 0 && ING[l.g]); if (!lines.length) return fail('Chưa chọn mặt hàng nào.');
  if (sd.fresh && lines.some(l => ING[l.g].grp !== 'fresh')) return fail('Nhà cung cấp C chỉ bán nhóm tươi.');
  if (express && (!sd.express || st.expressUsed >= 2 || st.ap < 2)) return fail(!sd.express ? 'Nhà cung cấp này không giao khẩn.' : st.ap < 2 ? 'Cần 2 AP.' : 'Tối đa 2 lần giao khẩn mỗi buổi.');
  let [d2, k2] = leadSess(st.day, st.k, v2 ? TERMS[sup].lead || 1 : 1), arriveDay = express ? st.day : d2;
  if (sup === 'C') { d2 = st.day + 2; k2 = 0; arriveDay = d2; }
  if (!supOpen(st, sup, arriveDay)) return fail(`${sd.name} đóng cửa vào ${dayLabel(arriveDay)}.`);
  const credit = !!opt.credit && !express && creditOpen(st, sup), Q = quote(st, sup, lines, { express, credit, br }), total = Q.total;
  if (!Q.lines.length) return fail('Chưa chọn mặt hàng nào.');
  if (Q.over.length) return fail('Không đủ chỗ: ' + STORE.zone[Q.over[0]].name + ' chỉ còn ' + freeOf(st, Q.over[0], Q.br) + ' phần.');
  if (Q.short && !opt.auto) return fail('Chưa đạt mức đặt tối thiểu, còn thiếu ' + k$(Q.short) + ' tiền hàng.');
  if (opt.credit && !express && !credit) return fail('Nhà cung cấp này chưa cho ghi nợ.');
  if (credit && total > creditLeft(st)) return fail('Vượt hạn mức công nợ, còn ' + k$(creditLeft(st)) + '.');
  if (!credit && st.cash < total) return fail('Không đủ tiền (' + Math.round(total / K) + 'k).');
  const id = ++st.orderId;
  if (credit) (st.payables ||= []).push({ id, sup, amt: total, due: st.day + CREDIT.days });
  else { st.cash -= total; ledger(st, 'Đặt hàng ' + sup + (express ? ' (khẩn)' : ''), -total); }
  spend(st, Q.fee); // phí giao không nằm trong giá vốn hàng nên phải vào sổ lãi lỗ riêng
  if (!express) for (const l of Q.lines) { const x = contractOf(st, sup, l.g); if (x) { x.got += l.q; l.contract = 1; } }
  st.pending.push({ id, sup, lines: Q.lines, t: express ? tau(st.day, st.k) : tau(d2, k2), at: express ? (S ? S.tick + 60 : 0) : 0, express: !!express, spent: total, br: Q.br });
  if (express) addLoss(st, 'express', rm(Q.goods * (1 - 1 / P.expressMul) + P.expressFee - P.deliveryFee), 1); else st.dayFee = (st.dayFee || 0) + Q.fee;
  if (express) { st.ap -= 2; st.expressUsed++; if (S) S.cmds.push({ tk: S.tick, t: 'EXPRESS_ORDER', lines }); }
  return { ok: true, total, credit, due: credit ? dayLabel(st.day + CREDIT.days) : '', arrive: express ? 'sau 60 phút' : dayLabel(d2) + ' ' + ['S1', 'S2', 'S3', 'S4', 'S5'][k2] };
}
// ---------- sổ buổi và luật đặt hàng tự động (chỉ lượt luật v2) ----------
const stockMap = st => Object.fromEntries(ING_ORDER.map(g => [g, stockOf(st, g)]));
function logSession(st, S, rep) { // mỗi buổi một dòng: khách, ly, hụt hàng, lượng dùng và tồn đầu / cuối buổi của từng nguyên liệu (cho chỉ số, dự báo, ABC–XYZ)
  const R = S.st, use = {};
  for (const [it, q] of Object.entries(R.by || {})) for (const g of ITEMS[it].ing) use[g] = (use[g] || 0) + q;
  for (const [g, q] of Object.entries(rep.wasteBy || {})) use[g] = (use[g] || 0) + q; // phần nấu rồi đổ cũng là đã tiêu
  (st.log ||= []).push({ w: rep.wasteBy && Object.keys(rep.wasteBy).length ? rep.wasteBy : undefined, d: S.day, k: S.k, f: rep.fc ? (rep.fc.lo + rep.fc.hi) / 2 : null, open: S.open || R.cups > 0 ? 1 : 0, cups: R.cups, ls: R.lostStock, want: R.buyers, use, s0: st.cur?.stk0 || stockMap(st), s1: stockMap(st) });
  if (st.log.length > 140) st.log.splice(0, st.log.length - 140);
}
// vị trí tồn kho = hàng còn dùng được + hàng đang trên đường (buổi cuối ngày: bỏ lô sẽ hết hạn đêm nay)
export function positionOf(st, g, br = 'A') {
  const L = br === 'B' && st.b2 ? st.b2.lots : st.lots, ss = sessionsOfDay(st.day), lastSess = st.phase !== 'PREP' && st.k === ss[ss.length - 1];
  let n = L[g].reduce((a, l) => a + (lastSess && l.last <= st.day ? 0 : l.q), 0);
  for (const p of st.pending) if (!p.done && (p.br || 'A') === br) for (const l of (p.transfer ? p.lots : p.lines)) if (l.g === g) n += l.q;
  return n;
}
export const polOf = (st, g, br = 'A') => st.pol?.[br]?.[g] || null;
export function policyQty(st, g, br = 'A') { // số phần luật muốn đặt lúc này
  const p = polOf(st, g, br); if (!p) return 0; const pos = positionOf(st, g, br);
  if (p.m === 'sq') return pos <= p.s ? p.Q : 0;
  if (p.m === 'ss') return pos <= p.s ? Math.max(0, p.S - pos) : 0;
  if (p.m === 'per') return st.sessionsPlayed % p.T === 0 ? Math.max(0, p.S - pos) : 0;
  return 0;
}
const polNote = (st, br, msg) => { (st.polLog ||= []).unshift({ d: st.day, k: st.k, br, msg }); st.polLog.length = Math.min(st.polLog.length, 12); };
export function runPolicies(st) { // chạy sau khi chốt mỗi buổi: đơn về đúng theo thời gian giao của nhà cung cấp
  if (!isV2(st) || !st.pol) return;
  const hubOn = !!st.hub?.on, asked = {};
  for (const br of st.b2 ? ['A', 'B'] : ['A']) {
    const groups = {}, fromHub = [];
    const needed = g => ITEM_ORDER.some(i => st.menu[i] && ITEMS[i].stage <= st.stage && (inSeason(i, st.day) || inSeason(i, st.day + 2)) && ITEMS[i].ing.includes(g)); // món hết mùa hay đã tắt thì không đặt nữa
    for (const g of ING_ORDER) { const q = needed(g) ? Math.floor(policyQty(st, g, br)) : 0; if (q <= 0) continue; if (hubOn && zoneOf(g) === 'dry') { asked[g] = (asked[g] || 0) + q; fromHub.push({ g, q }); } else (groups[polOf(st, g, br).sup || 'A'] ||= []).push({ g, q }); }
    if (fromHub.length) for (const l of hubShip(st, br, fromHub)) (groups[polOf(st, l.g, br).sup || 'A'] ||= []).push(l); // kho trung tâm thiếu: chi nhánh tự mua phần còn lại
    for (const [want, lines] of Object.entries(groups)) {
      const usable = id => { const sd = SUPPLIERS[id]; return sd && sd.stage <= st.stage && (!sd.needFlag || st.flags[sd.needFlag]) && (!sd.fresh || lines.every(l => ING[l.g].grp === 'fresh')) && arrivalOf(st, id).ok; };
      const sup = [want, 'A', 'B'].find(usable);
      if (!sup) { polNote(st, br, 'Không đặt được: nhà cung cấp đóng cửa.'); continue; }
      const free = {}; for (const z of ZONES) free[z] = freeOf(st, z, br);
      const fit = lines.map(l => { const z = zoneOf(l.g), q = Math.min(l.q, free[z]); free[z] -= q; return { g: l.g, q }; });
      if (fit.some((l, i) => l.q < lines[i].q)) polNote(st, br, 'Kho đầy: một phần đơn bị cắt bớt.');
      const ls = fit.filter(l => l.q > 0); if (!ls.length) continue;
      const credit = st.polPay === 'credit' && creditOpen(st, sup);
      let r = placeOrder(st, sup, ls, false, null, br, { credit });
      if (!r.ok && credit) r = placeOrder(st, sup, ls, false, null, br, {});
      polNote(st, br, r.ok ? 'Đã đặt ' + sup + ': ' + Math.round(r.total / K) + 'k.' : sup + ': ' + r.reason);
    }
  }
  if (hubOn) hubReplenish(st, asked);
}
// ---------- đợt 3: kho trung tâm và hiệu ứng roi da ----------
function hubShip(st, br, lines) { // chi nhánh xin hàng: kho trung tâm gửi phần đang có, về đầu buổi sau
  const moved = [], free = {}; for (const z of ZONES) free[z] = freeOf(st, z, br); const short = [];
  for (const l of lines) {
    const z = zoneOf(l.g); let need = Math.min(l.q, free[z]); const want = need;
    for (const x of st.hub.lots[l.g]) { if (need <= 0) break; const t = Math.min(x.q, need); if (t > 0) { x.q -= t; need -= t; moved.push({ g: l.g, q: t, last: x.last, cost: x.cost, qual: x.qual }); } }
    free[z] -= want - need; if (need > 0) short.push({ g: l.g, q: need });
    st.hub.lots[l.g] = st.hub.lots[l.g].filter(x => x.q > 0);
  }
  if (moved.length) { const [nd, nk] = nextSess(st.day, st.k); st.pending.push({ id: ++st.orderId, sup: 'A', transfer: true, br, lots: moved, t: tau(nd, nk), at: 0, lines: [] }); }
  if (short.length) polNote(st, br, 'Kho trung tâm không đủ hàng, chi nhánh tự mua phần thiếu.');
  return short;
}
const meanSd = a => { const m = a.reduce((x, y) => x + y, 0) / Math.max(1, a.length); return [m, a.length > 1 ? Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / (a.length - 1)) : m * 0.5]; };
function hubReplenish(st, asked) { // kho trung tâm tự đặt: dự báo theo số bán thật (chia sẻ dữ liệu) hoặc theo đơn chi nhánh gửi lên
  const H = st.hub, ok = id => { const [d] = leadSess(st.day, st.k, HUB.lead); return supOpen(st, id, d); }, sup = ['A', 'B'].find(ok);
  const gs = ING_ORDER.filter(g => zoneOf(g) === 'dry' && ['A', 'B'].some(br => polOf(st, g, br))), lines = []; let total = 0;
  const free = {}; for (const z of ZONES) free[z] = freeOf(st, z, 'H');
  for (const g of gs) {
    const req = (H.req[g] ||= []); req.push(asked[g] || 0); if (req.length > 24) req.shift();
    // chia sẻ dữ liệu: nhìn số khách mua thật (bù buổi hụt hàng); không chia sẻ: chỉ thấy đơn chi nhánh gửi lên
    const used = (st.log || []).slice(-12).filter(r => r.open).map(r => (r.use[g] || 0) * Math.min(1.6, r.want ? r.want / Math.max(1, r.want - r.ls) : 1)), seen = H.share && used.some(v => v > 0) ? used : req.slice(-12);
    const [mu, sg] = meanSd(seen);
    const pos = H.lots[g].reduce((a, l) => a + l.q, 0) + st.pending.reduce((a, p) => a + (p.br === 'H' && !p.done ? p.lines.reduce((s, l) => s + (l.g === g ? l.q : 0), 0) : 0), 0);
    const L = HUB.lead, z = 1.65 * sg * Math.sqrt(L), z2 = zoneOf(g); let q = 0;
    if (sup && pos <= mu * L + z) q = Math.min(free[z2], Math.max(0, Math.ceil(mu * (L + 4) + z - pos)));
    if (q > 0) { const cost = rm(unitPrice(st, sup, g, q) * (1 - HUB.disc)); if (st.cash >= total + cost * q) { total += cost * q; free[z2] -= q; const k = contractOf(st, sup, g); if (k) k.got += q; lines.push(k ? { g, q, cost, contract: 1 } : { g, q, cost }); } else q = 0; }
    const out = (H.out[g] ||= []); out.push(q); if (out.length > 24) out.shift();
  }
  if (!lines.length) return;
  total += TERMS[sup].fee; st.cash -= total; spend(st, TERMS[sup].fee); ledger(st, 'Kho trung tâm đặt hàng', -total);
  const [d, k] = leadSess(st.day, st.k, HUB.lead);
  st.pending.push({ id: ++st.orderId, sup, lines, t: tau(d, k), at: 0, br: 'H' });
}
export function bullwhip(st) { // độ dao động đơn đặt của kho trung tâm so với số dùng thật; > 1 là khuếch đại
  if (!st.hub) return null; const rs = [];
  for (const [g, out] of Object.entries(st.hub.out || {})) {
    const a = out.slice(-20), b = (st.log || []).slice(-a.length).map(r => r.use[g] || 0); if (a.length < 8 || b.length < a.length) continue;
    const cv = x => { const [m, s] = meanSd(x); return m ? s / m : 0; }, base = cv(b); if (base > 0 && a.some(v => v > 0)) rs.push(cv(a) / base);
  }
  return rs.length ? rs.reduce((x, y) => x + y, 0) / rs.length : null;
}
// ---------- chạy một buổi ----------
export function startLive(st) {
  if (st.cur && isV2(st)) st.cur.stk0 = stockMap(st);
  const S = newSession(st); S.snap = structuredClone({ ...st, mails: [], hist: [], log: (st.log || []).slice(-40), loss: null, x: st.x });
  prepStart(st, S);
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
    const stn = stations(st), onBreak = S.tick < S.breakUntil, capB = Math.max(0.2, barCap(st, stn.bar) - (onBreak ? 0.5 : 0)), capC = stn.cash.length ? eff(st, stn.cash) : 0;
    const capS = stn.ship.length ? eff(st, stn.ship) : 0;
    S.capP = stn.pack.length ? eff(st, stn.pack) : 0;
    if (S.open) { const cp = (S.st.cap ||= { cash: 0, bar: 0, pack: 0, ship: 0 }); cp.bar += 60 * capB; cp.cash += 60 * capC; cp.pack += 60 * S.capP; cp.ship += 60 * capS; }
    prepTick(st, S);
    S.Wb = Math.max(0, S.Wb - 60 * capB); S.Wc = Math.max(0, S.Wc - 60 * capC); S.Ws = Math.max(0, (S.Ws || 0) - 60 * capS); S.Wp = Math.max(0, (S.Wp || 0) - 60 * S.capP);
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
  const can = (i, n = 1) => ITEMS[i].ing.every(g => have(st, S, g, n));
  const avail = D.items.filter(i => can(i));
  if (!avail.includes(chosen)) {
    if (avail.length && u(S.seed, 'subst', c) < P.pSubst) chosen = avail.reduce((b, i) => (D.ex[i] > D.ex[b] ? i : b), avail[0]);
    else { R.lostStock++; R.perSlot[slot].ls++; R.seg[sg].lost++; const miss = ITEMS[chosen].ing.find(g => !have(st, S, g, 1)); R.stockout[miss] = (R.stockout[miss] || 0) + 1; if (S.prep?.[miss] && stockOf(st, miss) > 0) { R.notReady = (R.notReady || 0) + 1; (R.notReadyBy ||= {})[miss] = (R.notReadyBy[miss] || 0) + 1; } ev.push({ ty: 'lost', why: 'stock', sg, item: chosen }); if (R.comments.length < 6 && u(S.seed, 'fb', c) < 0.35) R.comments.push(`“Hết ${ING[miss].name.toLowerCase()} rồi à?”`); return; }
  }
  const cupsP = sd.cups < 2 ? 1 + (u(S.seed, 'cups', c) < sd.cups - 1 ? 1 : 0) : 2;
  let cups = cupsP; if (cups === 2 && !can(chosen, 2)) cups = 1;
  const E = Math.max(S.Wb / capB, S.capP ? (S.Wp || 0) / S.capP : 0) + (capC ? S.Wc / capC : 0) + (del ? (S.Ws || 0) / capS : 0), patience = sd.pat * (del ? 1.5 : 1) * Math.exp(0.3 * normInv(u(S.seed, 'pat', c)));
  if (E > patience && isV3(st) && !capS) { const parts = [['bar', S.Wb / capB], ['pack', S.capP ? (S.Wp || 0) / S.capP : 0], ['cash', capC ? S.Wc / capC : 0]], w = parts.reduce((a, b) => (b[1] > a[1] ? b : a))[0]; (R.lwBy ||= {})[w] = (R.lwBy[w] || 0) + 1; }
  if (E > patience && isV3(st) && capS) { const w = (S.Ws || 0) / capS > E / 2 ? 'ship' : 'bar'; (R.lwBy ||= {})[w] = (R.lwBy[w] || 0) + 1; }
  if (E > patience) { R.lostWait++; R.perSlot[slot].lw++; R.seg[sg].lost++; ev.push({ ty: 'lost', why: 'wait', sg, item: chosen }); if (R.comments.length < 6 && u(S.seed, 'fb', c) < 0.4) R.comments.push('“Đứng chờ lâu quá!”'); return; }
  const price = st.prices[chosen] * K; let qsum = 0, wsum = 0, cogs = 0;
  for (let i = 0; i < cups; i++) for (const g of ITEMS[chosen].ing) { const lot = takePrep(st, S, g); if (lot) { cogs += lot.cost; const w = ['sua', 'dao', 'vai', 'matcha', 'chanhday', 'hoacuc', 'gung'].includes(g) ? 2 : 1; qsum += lot.qual * w; wsum += w; } }
  let Q = clamp(qsum / Math.max(1, wsum) * (0.95 + 0.05 * Math.max(...stations(st).bar.map(p => p.skill || 1))), 0.5, 1.1);
  const tired = st.lame.energy < 30 && u(S.seed, 'err', c) < P.errProb; if (tired) { Q -= 0.15; R.errs++; }
  const rev = price * cups + (del ? P.shipFee : 0); st.cash += rev; R.rev += rev; R.cups += cups; R.cogs += cogs; R.seg[sg].buy++;
  R.by[chosen] = (R.by[chosen] || 0) + cups; if (ITEMS[chosen].gift) R.giftRev = (R.giftRev || 0) + rev; if (del) { R.del = (R.del || 0) + 1; S.Ws = (S.Ws || 0) + P.shipSec; }
  const work = cups * ITEMS[chosen].svc * svcMul, packW = S.capP ? work * PACK_SHARE : 0, cashW = capC ? Math.max(8, P.overheadCash - (st.equip.pos ? 5 : 0)) : 0, barW = (capC ? 0 : P.overheadBar) + work - packW + (capC ? 30 : 0);
  S.Wc += cashW; S.Wb += barW; S.Wp = (S.Wp || 0) + packW;
  const ld = (R.load ||= { cash: 0, bar: 0, pack: 0, ship: 0 }); ld.cash += cashW; ld.bar += barW; ld.pack += packW; if (del) ld.ship += P.shipSec;
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
  const waste = prepEnd(S);
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
  if (S.open && S.Wb > 60) { const cap = Math.max(0.5, st.staff.length ? barCap(st, stations(st).bar) : 1); otMin = Math.min(60, Math.ceil(S.Wb / (60 * cap) / 5) * 5); if (otMin >= 5 && st.staff.length) { const ot = rm(st.staff.filter(m => m.avail !== false).reduce((a, m) => a + m.wage * (P.overtime - 1) * otMin / 240, 0) * S.card.wageMul); wage += ot; if (otMin >= 15) for (const m of st.staff) m.mood = clamp((m.mood ?? 70) - 3, 0, 100); } }
  st.cash -= wage; R.wage = wage; if (wage) ledger(st, 'Lương buổi ' + ['S1', 'S2', 'S3', 'S4', 'S5'][S.k], -wage);
  if (worked) st.lame.energy = clamp(st.lame.energy - 10, 0, 100);
  const lost = R.lostStock + R.lostWait, wants = R.buyers;
  const rep = { day: S.day, k: S.k, open: S.open, rev: R.rev, cups: R.cups, cogs: R.cogs, wage, buyers: wants, visit: SEGS.reduce((a, s) => a + R.seg[s].visit, 0), ls: R.lostStock, lw: R.lostWait, over: R.over, none: R.none, sat: R.satN ? R.sat / R.satN : 0, satN: R.satN, hi: R.hi || 0,
    by: R.by, seg: R.seg, perSlot: R.perSlot, stockout: R.stockout, comments: R.comments, maxQ: R.maxQ, wait: R.waitN ? R.wait / R.waitN : 0, errs: R.errs, auto, apLeft: st.ap, cmds: S.cmds.length };
  const f = st.forecast; if (f && !auto && worked) { const x = R.cups, IS = (f.hi - f.lo) + 10 * Math.max(0, f.lo - x) + 10 * Math.max(0, x - f.hi), score = clamp(100 * (1 - IS / Math.max(1, 1.5 * x)), 0, 100); rep.fc = { lo: f.lo, hi: f.hi, x, hit: x >= f.lo && x <= f.hi, score }; st.cal.push([S.day, score, rep.fc.hit ? 1 : 0]); if (rep.fc.hit) { st.calHits++; st.ip += 1; } if (score >= 75) st.ip += 1; }
  rep.ot = otMin; rep.giftRev = R.giftRev || 0; rep.del = R.del || 0; rep.b2 = R.b2 || null;
  rep.waste = waste.cost; rep.wasteBy = waste.by; rep.notReady = R.notReady || 0; rep.notReadyBy = R.notReadyBy || null; rep.lwBy = R.lwBy || null;
  if (isV3(st) && S.open && R.load) { rep.util = {}; for (const k of ['cash', 'bar', 'pack', 'ship']) if (R.cap?.[k]) rep.util[k] = R.load[k] / R.cap[k]; }
  if (!auto && S.snap && S.open) { try { rep.q = assess(S, rep); (st.dqi ||= []).push([S.day, rep.q.score]); } catch (e) { rep.q = null; } } // chấm chất lượng quyết định và tách may / kỹ năng bằng chạy lại cùng seed
  if (st.exp && !st.exp.done && S.open) trackExp(st, S, rep);
  st.apCarry = Math.min(P.apCarry, st.ap); st.sessionsPlayed++; if (auto) st.sessionsAuto++;
  rep.net = R.rev - R.cogs - wage - waste.cost; sessionLosses(st, R, rep, waste); st.lastReport = rep; (st.cur ||= {}).rep = rep; (st.dayReps ||= []).push(rep);
  st.phase = 'REVIEW';
  if (isV2(st)) { logSession(st, S, rep); runPolicies(st); }
  return rep;
}
export function runToEnd(st, S) { let guard = 0; while (!advance(st, S, 60) && guard++ < 10); S.out.length = 0; }
// “chạy lại giả định”: cùng trạng thái đầu buổi, cùng seed, đổi chính sách (giá)
export function whatIf(S, change, seedXor = 0) { // chạy lại buổi từ trạng thái đầu buổi; seedXor ≠ 0: cùng chính sách nhưng may rủi khác
  const st = structuredClone(S.snap); st.mails = []; const T = newSession(st), prices0 = { ...st.prices };
  prepStart(st, T);
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
    pushMail(st, { kind: conclusive ? 'REWARD' : 'INFO', src: 'official', title: 'Kết quả thử nghiệm giá: ' + ITEMS[it].name, body: conclusive ? `Giá ${better === 'B' ? x.pb : x.pa}K cho lãi mỗi buổi cao hơn có ý nghĩa 90% (${Math.round(Math.abs(x.res.pct) * 100)}%). Thưởng 2 IP; giá đã được đặt về mức tốt hơn.` : `Chưa kết luận được (khác biệt nằm trong khoảng nhiễu). Giá về ${x.pa}K. Thử lại với khoảng giá khác hoặc nhiều buổi hơn.` });
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
  const h = st.hist.filter(d => d.buyers > 0).slice(-3), use = {}; for (const g of ING_ORDER) use[g] = 0; // ngày có khách muốn mua (kể cả bán được 0 ly vì hết hàng)
  const per = {}; for (const d of h) for (const [it, q] of Object.entries(d.by || {})) per[it] = (per[it] || 0) + q / h.length;
  const want = h.reduce((a, d) => a + d.buyers, 0) / Math.max(1, h.length), lostS = h.reduce((a, d) => a + d.ls, 0) / Math.max(1, h.length);
  if (lostS > want * 0.15) { // đang hụt hàng nặng: số bán thấp giả tạo, nhập theo số khách muốn mua, chia cho mọi món đang bán
    const on = ITEM_ORDER.filter(it => st.menu[it] && !ITEMS[it].seasonal && ITEMS[it].stage <= st.stage);
    for (const it of on) per[it] = Math.max(per[it] || 0, want * 1.1 / on.length);
  }
  for (const it of ITEM_ORDER) if (ITEMS[it].seasonal && st.menu[it] && inSeason(it, st.day)) per[it] = Math.max(per[it] || 0, want * 0.05); // món theo mùa chưa bán được lần nào vẫn phải có hàng
  for (const [it, q] of Object.entries(per)) if (st.menu[it] && inSeason(it, st.day)) for (const g of ITEMS[it].ing) use[g] += q;
  const sh = st.b2 ? 0.75 : 1, sup = supOpen(st, 'A', nextSess(st.day, st.k)[0]) ? 'A' : 'B';
  // vị trí tồn tính cả hàng đang về, bỏ lô hết hạn đêm nay; ngưỡng bỏ qua đơn vụn phải nhỏ hơn mức cần giữ, nếu không nguyên liệu dùng ít sẽ không bao giờ được nhập
  const cover = isV2(st) ? Math.max(1, TERMS[sup].lead) : 1, worth = (g, need, tgt) => need > 0 && need > Math.min(ING[g].grp === 'fresh' ? 3 : 10, tgt * 0.4);
  const lines = []; for (const g of ING_ORDER) { if (polOf(st, g, 'A')) continue; const tgt = Math.ceil(use[g] * 0.28 * 1.12 * sh * cover * (prepOn(st, g) ? 1.25 : 1)), need = tgt - positionOf(st, g, 'A'); /* món sơ chế hao thêm phần nấu dư */ if (worth(g, need, tgt)) lines.push({ g, q: need }); }
  const fit = (ls, br) => { if (!isV2(st)) return ls; const free = {}; for (const z of ZONES) free[z] = freeOf(st, z, br); return ls.map(l => { const z = zoneOf(l.g), q = Math.min(l.q, free[z]); free[z] -= q; return { g: l.g, q }; }).filter(l => l.q > 0); };
  if (lines.length) placeOrder(st, sup, fit(lines, 'A'), false, null, 'A', { auto: true });
  if (st.b2) { const l2 = []; for (const g of ING_ORDER) { if (polOf(st, g, 'B')) continue; const tgt = Math.ceil(use[g] * 0.28 * 1.12 * 0.25 * cover), need = tgt - positionOf(st, g, 'B'); if (worth(g, need, tgt)) l2.push({ g, q: need }); } if (l2.length) placeOrder(st, sup, fit(l2, 'B'), false, null, 'B', { auto: true }); }
}
function runAuto(st) { // chạy các buổi còn lại của ngày bằng kế hoạch đứng
  while (st.phase !== 'DAYEND') {
    if (st.phase === 'PREP' || st.phase === 'LIVE') {
      if (st.cur && isV2(st) && st.phase === 'PREP') st.cur.stk0 = stockMap(st);
      const S = newSession(st); S.open = !!st.autoPlan.open[st.k] && !(DEFAULT_CLOSED[st.day] || []).includes(st.k); S.snap = null; st.phase = 'LIVE'; prepStart(st, S);
      st.ap = 0; if (S.open) { runToEnd(st, S); } else S.tick = S.len;
      const fee = rm(S.st.rev * P.sleepFee); st.cash -= fee; spend(st, fee); ledger(st, 'Phí tự trông tiệm 5%', -fee);
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
  let spoil = 0; const sp = {}, spv = {}, hit = (g, q, cost) => { spoil += q * cost; sp[g] = (sp[g] || 0) + q; spv[g] = (spv[g] || 0) + q * cost; };
  const lossF = { fresh: clamp(fxVal(st, 'inventory.loss', 'fresh', tau(day, 0), 'add'), 0, 0.9), dry: clamp(fxVal(st, 'inventory.loss', 'dry', tau(day, 0), 'add'), 0, 0.9) };
  for (const L of [st.lots, st.b2?.lots, st.hub?.lots]) { if (!L) continue; for (const g of ING_ORDER) { const f = lossF[ING[g].grp]; if (f > 0) for (const l of L[g]) { const lost = Math.floor(l.q * f); if (lost) { l.q -= lost; hit(g, lost, l.cost); } } } } // sự kiện làm hỏng một phần kho (cúp điện, hỏng tủ lạnh…)
  const dirty = ING_ORDER.some(g => g !== 'da' && st.lots[g].some(l => l.q > 0 && l.last <= day));
  for (const L of [st.lots, st.b2?.lots, st.hub?.lots]) { if (!L) continue; for (const g of ING_ORDER) { const keep = []; for (const l of L[g]) { if (l.last <= day) hit(g, l.q, l.cost); else keep.push(l); } L[g] = keep; } }
  for (const p of st.pending) if (p.transfer) p.lots = p.lots.filter(l => { if (l.last > day) return true; hit(l.g, l.q, l.cost); return false; }); // hàng đang chuyển kho cũng hết hạn như thường
  const waste = reps.reduce((a, r) => a + (r.waste || 0), 0); spoil += waste; // trân châu, trà đã nấu mà không bán hết
  for (const [g, v] of Object.entries(spv)) addLoss(st, 'spoil:' + g, v, sp[g] || 0);
  spoil = rm(spoil * (st.diff === 'nhan' ? 0.9 : 1)); // chỉ ghi vào sổ lãi lỗ: tiền hàng đã trả lúc đặt, không trừ tiền mặt lần nữa
  const pen = isV3(st) ? contractTick(st, day) : 0; // phí mua thiếu cam kết
  const hubFee = st.hub?.on ? HUB.fee : 0; st.cash -= hubFee;
  const fixed = rm(P.fixedDay[st.stage] * (fxVal(st, 'cost.fixed', '', tau(day, 0), 'mul'))); st.cash -= fixed;
  let interest = 0; if (st.debt > 0) { interest = rm(st.debt * 0.0005); st.cash -= interest; }
  const hold = holdCost(st); st.cash -= hold; // phí giữ hàng tính trên hàng còn lại sau khi bỏ hàng hỏng
  const due = (st.payables || []).filter(p => p.due <= day), paid = due.reduce((a, p) => a + p.amt, 0);
  if (paid > 0) { st.cash -= paid; st.payables = st.payables.filter(p => p.due > day); pushMail(st, { kind: 'SYSTEM', src: 'official', title: 'Đã trả công nợ đến hạn', body: 'Trả nhà cung cấp ' + Math.round(paid / K) + 'k.' }); }
  // vay gia đình khi âm tiền (tối đa 5.000K)
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
  const other = rm(st.dayOther || 0); st.dayOther = 0;
  const profit = rev - cogs - spoil - fixed - hubFee - wage - interest - hold - pen - other;
  const inv = [st.lots, st.b2?.lots, st.hub?.lots].reduce((a, L) => a + (L ? ING_ORDER.reduce((x, g) => x + L[g].reduce((y, l) => y + l.q * l.cost, 0), 0) : 0), 0);
    addLoss(st, 'contract', pen, 1); addLoss(st, 'loan', interest, 1);
  if (isV2(st)) { addLoss(st, 'fees', (st.dayFee || 0) - 2 * TERMS.A.fee, 1); if (cogs > 0 && inv > 2 * cogs) addLoss(st, 'hold', rm(hold * (inv - 2 * cogs) / inv), 1); }
  st.dayFee = 0;
  const h = { day, rev, other, cogs, spoil, waste: rm(waste * (st.diff === 'nhan' ? 0.9 : 1)), fixed: fixed + hubFee, wage, interest: interest + pen, pen, hold, inv, profit, cups: sum('cups'), buyers: wants, ls, lw, over: sum('over'), rep: st.rep, loyal: st.loyal, cash: st.cash, stage: st.stage, by, sat, auto: autoShare, played: reps.filter(r => !r.auto).length, n: reps.length, sp, night: reps.find(r => r.k === 4)?.net, gift: sum('giftRev'), del: sum('del'), quit: quit.length > 0, staffN: st.staff.length + quit.length };
  st.hist.push(h); st.cur = null;
  if (st.hist.length > 130) st.hist.shift();
  // xu từ lợi nhuận (có trần mỗi ngày)
  const xu = Math.max(0, Math.min(P.xuCapDay, Math.floor((profit + other) / (100 * K)) * P.xuPer100k)); st.coins = (st.coins || 0) + xu; h.xu = xu;
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
    case 'profit_cum': return sumH(st, 1, M.at, grossProfit).s;
    case 'profit_win': return sumH(st, M.a, M.b, grossProfit).s;
    case 'rep': return g(M.at, x => x.rep);
    case 'loyal': return g(M.at, x => x.loyal);
    case 'stockout': { if (!openedEnough(st, M.a, M.b)) return null; const a = sumH(st, M.a, M.b, x => x.ls), b = sumH(st, M.a, M.b, x => x.buyers); return 1000 * a.s / Math.max(1, b.s); }
    case 'spoil': return openedEnough(st, M.a, M.b) ? sumH(st, M.a, M.b, x => x.spoil - (x.waste || 0)).s : null; // cột mốc đo hàng hỏng trong kho, không tính phần nấu dư
    case 'margin': { const p = sumH(st, M.a, M.b, grossProfit).s, r = sumH(st, M.a, M.b, x => x.rev).s; return r ? 100 * p / r : null; }
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
    case 'ratio_profit': { const a = sumH(st, M.a, M.b, grossProfit), b = sumH(st, M.ba, M.bb, grossProfit); return a.n && b.n && b.s > 0 && openedEnough(st, M.ba, M.bb) ? (a.s / a.n) / (b.s / b.n) : null; }
    case 'ratio_profit3': { const a = sumH(st, M.a, M.b, grossProfit), b = sumH(st, M.ba, M.bb, grossProfit); return a.n && b.n && b.s > 0 && openedEnough(st, M.ba, M.bb) ? a.s / b.s : null; }
    case 'ratio_margin': { const m = (a, b) => { const p = sumH(st, a, b, grossProfit).s, r = sumH(st, a, b, y => y.rev).s; return r ? p / r : null; }; const x = m(M.a, M.b), y = m(M.ba, M.bb); return x != null && y > 0 && openedEnough(st, M.ba, M.bb) ? x / y : null; }
    case 'season': return st.season ? st.season.score : null;
    default: return null;
  }
}
export const starsFor = (M, v) => { if (v == null) return 0; const t = M.th, val = M.k ? v / M.k : v; let s = 0; for (let i = 0; i < 3; i++) if (M.dir > 0 ? val >= t[i] - 1e-9 : val <= t[i] + 1e-9) s = i + 1; return s; };
// sao là thưởng cho người chơi: trong kỳ đo phải tự chơi ít nhất một nửa số buổi (đi ngủ cả kỳ thì không được sao)
export function handShare(st, a, b) {
  const p = sumH(st, a, b, x => x.played ?? x.n ?? 0).s, n = sumH(st, a, b, x => x.n ?? 0).s;
  return n ? p / n : 0;
}
export const handEnough = (st, M, day) => handShare(st, M.a ?? 1, Math.min(day, M.b ?? M.at ?? day)) >= 0.5;
function milestoneTick(st, day) {
  const got = [], blocked = [];
  for (const M of MILESTONES) {
    if (day < M.open || day > M.dl + 0) { continue; }
    const stg = M.m === 'stage2' ? 2 : M.m === 'stage3' ? 3 : 0;
    let due = day === M.dl;
    if (stg) due = day === M.dl || !!st.stageDay[stg]; // nâng giai đoạn: chấm ngay khi nâng (sao tăng dần theo ngày vào)
    else if (M.m === 'profit_cum' || M.m === 'rev_cum') due = day === M.at || (M.early && day >= M.at && day <= M.dl);
    if (!due) continue;
    let v = metricValue(st, M); if (stg && !st.stageDay[stg]) v = null;
    if (M.m === 'cal' && v === 0) v = null;
    let s = starsFor(M, v); const old = st.stars[M.id] || 0;
    if (s > old && !handEnough(st, M, day)) { if (day === M.dl) blocked.push(M.id); s = 0; }
    if (s > old) {
      st.stars[M.id] = s; const xp = P.starXu.slice(old, s).reduce((a, b) => a + b, 0), ip = P.starIp.slice(old, s).reduce((a, b) => a + b, 0);
      st.coins += xp; st.ip += ip; got.push({ id: M.id, name: M.name, stars: s, xu: xp, ip });
      pushMail(st, { kind: 'REWARD', src: 'official', title: `${'⭐'.repeat(s)} ${M.id}: ${M.name}`, body: `Bạn đạt ${s} sao. Thưởng: ${xp} xu của app và ${ip} IP.` });
    } else if (day === M.dl && !old) { st.stars[M.id] = 0; st.stars[M.id + 'closed'] = 1; }
  }
  if (blocked.length) pushMail(st, { kind: 'INFO', src: 'official', title: 'Sao không được tính vì phần lớn buổi tự chạy', body: 'Cột mốc ' + blocked.join(', ') + ' đạt chỉ tiêu, nhưng trong kỳ đo bạn tự chơi chưa tới một nửa số buổi.' });
  return got;
}
export const weeklyOf = day => WEEKLY[(Math.ceil(day / 7) - 1) % WEEKLY.length];
export function weeklyTick(st, day) { // thử thách tuần: chấm cuối mỗi tuần game (khi đã có từ 10 sao)
  if (day % 7 !== 0 || totalStars(st) < 10) return null;
  const ch = weeklyOf(day), w = st.hist.slice(-7), sum = k => w.reduce((a, h) => a + (h[k] || 0), 0), rev = sum('rev'), prof = sum('profit'), rep0 = st.hist[st.hist.length - 8]?.rep ?? 50;
  const ok = { w1: () => sum('ls') <= 15, w2: () => sum('spoil') - sum('waste') <= (st.stage === 1 ? 400 * K : 1500 * K), w3: () => rev > 0 && prof / rev >= 0.30, w4: () => st.rep >= rep0 + 2, w5: () => sum('lw') <= 25, w6: () => st.cal.filter(c => c[0] > day - 7 && c[2]).length >= 3, w7: () => w.every(h => !h.auto), w8: () => w.every(h => grossProfit(h) > 0) }[ch.id]() && w.filter(h => h.buyers > 0).length >= 6; // đóng cửa cả tuần không được tính đạt
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
  let inv = 0; for (const L of [st.lots, st.b2?.lots, st.hub?.lots]) if (L) for (const g of ING_ORDER) for (const l of L[g] || []) inv += l.q * l.cost;
  const eq = Object.entries(st.equip).reduce((a, [id, d]) => a + EQUIP[id].price * Math.max(0, 1 - (st.day - d) / 180), 0);
  return st.cash + inv + eq - st.debt - owed(st);
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
  set('A12', st.day === 68 && h.rev > 0 && grossProfit(h) > 0);
  set('A04', (st.expDone || 0) >= 3); set('A05', !!st.flags.priceWin);
  set('A06', !!st.flags.early && h.profit > 0);
  const fd = (st.falseDays || []).filter(d => d <= st.day).length; set('A07', fd >= 3 && st.cash >= (H(st, Math.max(1, st.day - 6))?.cash ?? 0));
  set('A09', st.stage >= 3);
  if (st.day === 76) { const a = sumH(st, 65, 71, x => x.ls).s, b = sumH(st, 65, 71, x => x.buyers).s, sp = sumH(st, 65, 76, x => x.spoil - (x.waste || 0)).s, rv = sumH(st, 65, 76, x => x.rev).s; set('A11', b && 1000 * a / b <= 50 && sp <= 0.1 * rv); }
  set('A13', streakOf(st) >= 30);
  if (st.day >= 90) { set('A14', st.sessionsPlayed && (st.sessionsPlayed - st.sessionsAuto) / st.sessionsPlayed >= 0.8); set('A15', true); }
}
export const milestoneRows = st => MILESTONES.map(M => { const v = metricValue(st, M), s = st.stars[M.id] || 0; return { M, v, stars: s, open: st.day >= M.open, closed: st.day > M.dl || !!st.stars[M.id + 'closed'] }; });
export { dayLabel };
export function arrivalOf(st, sup) { // hàng đặt bây giờ sẽ đến lúc nào
  if (sup === 'C') { const dd = st.day + 2; return { day: dd, k: 0, ok: supOpen(st, 'C', dd), txt: dayLabel(dd) + ' S1' }; }
  const [d, k] = leadSess(st.day, st.k, isV2(st) ? TERMS[sup].lead : 1); return { day: d, k, ok: supOpen(st, sup, d), txt: dayLabel(d) + ' ' + ['S1', 'S2', 'S3', 'S4', 'S5'][k] };
}
export const avgCupsPerSession = st => { const h = st.hist.slice(-7); if (!h.length) return null; return h.reduce((a, x) => a + x.cups, 0) / h.reduce((a, x) => a + (x.n || 4), 0); };
export const apBase = st => Math.round(P.ap[st.stage] * P.difficulty[st.diff].ap);
