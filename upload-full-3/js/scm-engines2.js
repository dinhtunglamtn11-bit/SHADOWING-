// Engine tính xác định cho ngân hàng case 2: Phân tích (E) và Lập kế hoạch (F).
// Nhận phương án người chơi chọn, tính lại chi phí, vi phạm ràng buộc, duyệt toàn bộ phương án để tìm tối ưu; đáp án và chất lượng quyết định sinh từ đây.

// ---------- F1: chọn đơn lên xe (8 đơn, 2 ràng buộc, 2 đơn ưu tiên) ----------
const F1 = {
  orders: { O1: [2000, 8, 14], O2: [1500, 6, 11], O3: [3200, 10, 17], O4: [1800, 12, 15], O5: [2500, 7, 16], O6: [900, 9, 10], O7: [1300, 5, 9], O8: [2800, 8, 13] }, prio: ['O1', 'O2'], maxKg: 10000, maxM3: 36,
};
export const f1Parse = s => [...new Set(String(s || '').toUpperCase().match(/O\s*[1-8]/g) || [])].map(x => x.replace(/\s/g, ''));
export function f1Eval(list) {
  const set = Array.isArray(list) ? list : f1Parse(list); let kg = 0, m3 = 0, rev = 0;
  for (const o of set) { const d = F1.orders[o]; if (d) { kg += d[0]; m3 += d[1]; rev += d[2]; } }
  const breach = []; if (kg > F1.maxKg) breach.push('weight'); if (m3 > F1.maxM3) breach.push('volume'); for (const p of F1.prio) if (!set.includes(p)) breach.push('priority ' + p);
  return { set, kg, m3, rev, breach, feasible: set.length > 0 && !breach.length, binding: kg / F1.maxKg > m3 / F1.maxM3 ? 'weight' : 'volume' };
}
let f1Best = null;
export function f1Optimum() {
  if (f1Best) return f1Best; const ids = Object.keys(F1.orders); let best = null;
  for (let m = 0; m < 256; m++) { const e = f1Eval(ids.filter((_, i) => m & (1 << i))); if (e.feasible && (!best || e.rev > best.rev)) best = e; }
  return (f1Best = best);
}
export function f1Decision(s) {
  const e = f1Eval(s); if (!e.feasible) return { dq: 0, valid: false, why: e.set.length ? 'Vi phạm: ' + e.breach.join(', ') : 'Chưa chọn đơn nào.', e };
  const base = f1Eval(['O1', 'O2', 'O3', 'O8']).rev, opt = f1Optimum().rev;
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (e.rev - base) / (opt - base)))), valid: true, e };
}

// ---------- F2: cỡ lô cho dây chuyền van (8 tuần) ----------
const F2 = { orig: [40, 0, 65, 30, 0, 85, 20, 55], upd: [40, 0, 40, 30, 60, 85, 20, 55], inv0: 20, setup: 150, hold: 0.4, step: 25, min: 50, maxOrders: 4 };
// orders: [[tuần 1..8, số lượng], ...]; cap: trần cỡ lô (0 = không giới hạn)
export function f2Eval(orders, upd = true, cap = 150) {
  const g = upd ? F2.upd : F2.orig, os = (orders || []).filter(o => o && Number.isFinite(o[0]) && Number.isFinite(o[1]) && o[1] > 0), breach = [];
  const rec = new Array(8).fill(0);
  for (const [w, q] of os) { if (w < 1 || w > 8 || w !== Math.round(w)) { breach.push('week'); continue; } rec[w - 1] += q; if (q % F2.step || q < F2.min) breach.push('lot size'); if (cap && q > cap) breach.push('lot cap'); }
  if (os.length > F2.maxOrders) breach.push('orders');
  let inv = F2.inv0, hold = 0, firstOut = 0; const end = [];
  for (let t = 0; t < 8; t++) { inv += rec[t] - g[t]; if (inv < 0 && !firstOut) firstOut = t + 1; end.push(inv); if (inv > 0) hold += inv; }
  if (firstOut) breach.push('stock-out');
  const b = [...new Set(breach)];
  return { cost: os.length * F2.setup + hold * F2.hold, n: os.length, firstOut, end, breach: b, feasible: os.length > 0 && !b.length };
}
const f2Cache = {};
export function f2Optimum(upd = true, cap = 150) {
  const key = (upd ? 'u' : 'o') + cap; if (f2Cache[key]) return f2Cache[key]; const g = upd ? F2.upd : F2.orig; let best = null;
  for (let m = 1; m < 256; m++) {
    const wk = []; for (let t = 0; t < 8; t++) if (m & (1 << t)) wk.push(t); if (wk.length > F2.maxOrders || wk[0] !== 0) continue;
    // mỗi đơn phủ nhu cầu tới tuần đặt kế tiếp, làm tròn lên bội 25 (tối thiểu 50)
    const orders = []; let inv = F2.inv0, ok = true;
    for (let k = 0; k < wk.length; k++) {
      const from = wk[k], to = k + 1 < wk.length ? wk[k + 1] : 8; let need = 0; for (let t = from; t < to; t++) need += g[t];
      let q = Math.max(0, need - inv); q = q ? Math.max(F2.min, Math.ceil(q / F2.step) * F2.step) : 0; if (cap && q > cap) { ok = false; break; }
      if (q) orders.push([from + 1, q]); inv = inv + q - need;
    }
    if (!ok) continue; const e = f2Eval(orders, upd, cap); if (e.feasible && (!best || e.cost < best.cost - 1e-9)) best = { orders, ...e };
  }
  return (f2Cache[key] = best);
}
export function f2Decision(orders) {
  const e = f2Eval(orders, true, 150); if (!e.n) return { dq: 0, valid: false, why: 'Chưa điền đơn đặt hàng nào.', e };
  if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join(', '), e };
  const o = f2Optimum(true, 150), p2 = f2Eval([[1, 150], [6, 150], [8, 150]], true, 150).cost;
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (p2 - e.cost) / (p2 - o.cost)))), valid: true, e, o, optimal: e.cost <= o.cost + 0.05 };
}

// ---------- F3: kế hoạch cầu bến (5 tàu × 2 bến) ----------
const F3 = {
  vessels: { V1: { eta: 0, len: 180, dr: 9.5, mv: 600, etd: 14 }, V2: { eta: 2, len: 260, dr: 12.5, mv: 1200, etd: 22 }, V3: { eta: 4, etaU: 12, len: 190, dr: 10.5, mv: 450, etd: 16 }, V4: { eta: 6, len: 230, dr: 11.8, mv: 900, etd: 24 }, V5: { eta: 10, len: 200, dr: 11.0, mv: 700, etd: 26 } },
  berths: { B1: { len: 300, dr: 14, cr: 3 }, B2: { len: 240, dr: 12, cr: 2, closed: [16, 28] } },
};
export const f3Seq = s => (String(s || '').toUpperCase().match(/V\s*[1-5]/g) || []).map(x => x.replace(/\s/g, ''));
// plan: { B1: [mã tàu theo thứ tự], B2: [...] }; upd: dùng dữ liệu đã cập nhật (B2 đóng giờ 16–28, ETA của V3 = 12)
export function f3Eval(plan, upd = true) {
  const all = [...(plan.B1 || []), ...(plan.B2 || [])], ids = Object.keys(F3.vessels), breach = [];
  if (all.length !== 5 || new Set(all).size !== 5 || !ids.every(v => all.includes(v))) return { feasible: false, breach: ['each vessel exactly once'], cost: NaN };
  let wait = 0, late = 0, cost = 0, notices = 0, worst = '', worstLate = -1; const rows = [];
  for (const b of ['B1', 'B2']) {
    const B = F3.berths[b]; let free = 0;
    for (const v of plan[b] || []) {
      const V = F3.vessels[v], eta = upd && V.etaU != null ? V.etaU : V.eta; if (V.len > B.len || V.dr > B.dr) breach.push(`${v} not compatible with ${b}`);
      const svc = V.mv / (B.cr * 30); let start = Math.max(eta, free); if (upd && B.closed && start < B.closed[1] && start + svc > B.closed[0]) start = Math.max(start, B.closed[1]);
      const end = start + svc, w = start - eta, l = Math.max(0, end - V.etd); wait += w; late += l; cost += 1.5 * w + 5 * l; if (l > 6) notices++; if (l > worstLate) { worstLate = l; worst = v; } free = end; rows.push({ v, b, eta, start, end, w, l });
    }
  }
  return { cost, wait, late, notices, worst, rows, breach, feasible: !breach.length, approval: cost < 100 ? 'DUTY MANAGER' : cost <= 250 ? 'TERMINAL OPERATIONS MANAGER' : 'TERMINAL DIRECTOR' };
}
const f3Cache = {};
export function f3Optimum(upd = true) {
  const key = upd ? 'u' : 'o'; if (f3Cache[key]) return f3Cache[key]; const ids = ['V1', 'V2', 'V3', 'V4', 'V5']; let best = null;
  const perms = a => (a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));
  for (let m = 0; m < 32; m++) {
    const b1 = ids.filter((_, i) => m & (1 << i)), b2 = ids.filter((_, i) => !(m & (1 << i)));
    for (const p1 of perms(b1)) for (const p2 of perms(b2)) { const e = f3Eval({ B1: p1, B2: p2 }, upd); if (e.feasible && (!best || e.cost < best.cost - 1e-9)) best = { plan: { B1: p1, B2: p2 }, ...e }; }
  }
  return (f3Cache[key] = best);
}
export function f3Decision(b1, b2) {
  const plan = { B1: f3Seq(b1), B2: f3Seq(b2) }, e = f3Eval(plan, true);
  if (!Number.isFinite(e.cost)) return { dq: 0, valid: false, why: 'Mỗi tàu V1–V5 phải xuất hiện đúng một lần trong hai dãy.', e };
  if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join('; '), e };
  const o = f3Optimum(true), A = f3Eval({ B1: ['V1', 'V2', 'V4', 'V5'], B2: ['V3'] }, true).cost;
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (A - e.cost) / (A - o.cost)))), valid: true, e, o, optimal: e.cost <= o.cost + 0.05 };
}

// ---------- E3: danh mục hành động tiết kiệm cước (32 tập con) ----------
const E3 = { eff: { A1: 2, A2: 4, A3: 3, A4: 2, A5: 3 }, one: { A1: 0, A2: 120, A3: 90, A4: 0, A5: 150 } };
function e3Savings(upd) {
  const up = upd ? 1.06 : 1, hp = 196 * up, hn = 1240 * up, dn = 668 * up, roadSpend = 42 * 196 + 24 * 1240 + 27 * 668;
  return { A1: 0.05 * 42 * hp, A2: 4 * (hn - 800), A3: (upd ? 1 : 5) * (dn - 430), A4: (upd ? 0.06 : 0.02) * roadSpend, A5: 0.08 * 24 * hn };
}
export const e3Parse = s => [...new Set(String(s || '').toUpperCase().match(/A\s*[1-5]/g) || [])].map(x => x.replace(/\s/g, '')).sort();
export function e3Eval(list, upd = true) {
  const set = Array.isArray(list) ? list : e3Parse(list), sv = e3Savings(upd); let effort = 0, save = 0, one = 0;
  for (const a of set) { effort += E3.eff[a] || 0; save += sv[a] || 0; one += E3.one[a] || 0; }
  const breach = []; if (effort > 8) breach.push('effort'); if (set.includes('A2') && set.includes('A5')) breach.push('same lane'); if (set.includes('A2') && set.includes('A3')) breach.push('two mode shifts');
  const net = 2 * save - one;
  return { set, effort, save, one, net, breach, feasible: set.length > 0 && !breach.length, approval: net < 5000 ? 'LOGISTICS DIRECTOR' : net <= 15000 ? 'CFO' : 'CEO' };
}
const e3Cache = {};
export function e3Optimum(upd = true) {
  const key = upd ? 'u' : 'o'; if (e3Cache[key]) return e3Cache[key]; let best = null; const ids = ['A1', 'A2', 'A3', 'A4', 'A5'];
  for (let m = 1; m < 32; m++) { const e = e3Eval(ids.filter((_, i) => m & (1 << i)), upd); if (e.feasible && (!best || e.net > best.net)) best = e; }
  return (e3Cache[key] = best);
}
export function e3Decision(s) {
  const e = e3Eval(s, true); if (!e.set.length) return { dq: 0, valid: false, why: 'Chưa chọn hành động nào.', e };
  if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join(', '), e };
  const o = e3Optimum(true), low = Math.min(e3Eval(['A3', 'A4', 'A5']).net, e3Eval(['A1', 'A2', 'A4']).net);
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (e.net - low) / (o.net - low)))), valid: true, e, o, optimal: e.net >= o.net - 0.5 };
}

// ---------- E2: so sánh 5 phương pháp dự báo (doanh số 24 tháng, Nov 2024 – Oct 2026) ----------
const E2 = { y: [236, 227, 243, 248, 272, 288, 344, 400, 443, 439, 341, 280, 268, 300, 283, 252, 292, 306, 389, 460, 466, 471, 378, 327], lost: { 20: 55, 21: 70 }, t0: 18 };
export function e2Series(corrected) { const y = E2.y.slice(); if (corrected) for (const [i, v] of Object.entries(E2.lost)) y[+i] += v; return y; }
export function e2Forecast(m, y, t) {
  if (m === 'M1') return y[t - 1];
  if (m === 'M2') return (y[t - 1] + y[t - 2] + y[t - 3]) / 3;
  if (m === 'M3') { let L = (y[0] + y[1] + y[2]) / 3; for (let k = 3; k < t; k++) L = 0.3 * y[k] + 0.7 * L; return L; }
  if (m === 'M4') return y[t - 12];
  const sum = (a, b) => { let s = 0; for (let i = a; i <= b; i++) s += y[i]; return s; };
  return y[t - 12] * sum(t - 6, t - 1) / sum(t - 18, t - 13);
}
export function e2Eval(m, corrected = true) {
  const y = e2Series(corrected), err = []; let sa = 0;
  for (let t = E2.t0; t < 24; t++) { err.push(y[t] - e2Forecast(m, y, t)); sa += y[t]; }
  const sumAbs = err.reduce((a, b) => a + Math.abs(b), 0), mad = sumAbs / err.length, tot = err.reduce((a, b) => a + b, 0), rmse = Math.sqrt(err.reduce((a, b) => a + b * b, 0) / err.length);
  return { m, wape: 100 * sumAbs / sa, bias: 100 * tot / sa, ts: tot / mad, rmse, ss: 1.65 * rmse, valid: Math.abs(tot / mad) <= 4, err };
}
export const e2Method = s => { const m = /M\s*([1-5])/i.exec(String(s || '')); return m ? 'M' + m[1] : ''; };
export function e2Decision(s) {
  const m = e2Method(s); if (!m) return { dq: 0, valid: false, why: 'Chọn một phương pháp M1–M5.' };
  const all = ['M1', 'M2', 'M3', 'M4', 'M5'].map(k => e2Eval(k, true)), e = all.find(x => x.m === m), best = all.filter(x => x.valid).reduce((a, b) => (b.wape < a.wape ? b : a)), m3 = all[2];
  if (!e.valid) return { dq: 0, valid: false, why: `${m} có tracking signal ${e.ts.toFixed(1)} (|TS| > 4): phương pháp bị lệch, không hợp lệ.`, e };
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (m3.wape - e.wape) / (m3.wape - best.wape)))), valid: true, e, best };
}

// ---------- C2: hợp đồng giá nhựa cho vỏ nhựa (6 cấu trúc × 3 kịch bản chỉ số nhựa) ----------
// Chuỗi chỉ số nhựa 12 tháng đọc từ Hình 1 của đề (tháng 0 = 100); khớp với bảng lời giải (S3 Base 50,053; Spike 51,880; Fall 47,033, v.v.)
const C2 = {
  P0: 53300, vol: 75000, labour: 1.07, budget: 52.5, // giá hiện tại (VND), sản lượng tháng (vỏ), chỉ số lao động & năng lượng, trần ngân sách (tỷ VND)
  idx: { base: [100, 101, 101, 102, 102, 103, 103, 104, 104, 104, 105, 105], spike: [100, 104, 110, 118, 126, 132, 135, 134, 130, 128, 126, 125], fall: [100, 98, 96, 95, 93, 91, 90, 89, 88, 87, 86, 85] },
  prob: { base: 0.5, spike: 0.25, fall: 0.25 },
  struct: { S1: { fixed: 0.05 }, S2: {}, S3: { c: 0.08, prem: 0.01 }, S4: { dual: true }, S5: { c: 0.12, prem: 0.005 }, S6: { c: 0.05, prem: 0.02 } },
  alt: { price: 0.94, quality: 0.01, setup: 450_000_000, from: 7, share: 0.3 },
};
export const c2Factor = i => 0.55 * i / 100 + 0.25 * C2.labour + 0.20; // hệ số giá theo chỉ số nhựa
// chi phí cả năm (tỷ VND) của một cấu trúc trong một kịch bản
export function c2Cost(code, scen) {
  const st = C2.struct[code]; if (!st) return NaN; let sum = 0;
  C2.idx[scen].forEach((i, m) => {
    const f = c2Factor(i); let price;
    if (st.fixed != null) price = C2.P0 * (1 + st.fixed);
    else if (st.c != null) price = C2.P0 * (1 + st.prem) * Math.min(1 + st.c, Math.max(1 - st.c, f));
    else if (st.dual) { const idxP = C2.P0 * f, altP = C2.P0 * C2.alt.price * (1 + C2.alt.quality); price = m + 1 >= C2.alt.from ? (1 - C2.alt.share) * idxP + C2.alt.share * altP : idxP; }
    else price = C2.P0 * f;
    sum += C2.vol * price;
  });
  return (sum + (st.dual ? C2.alt.setup : 0)) / 1e9;
}
export function c2Eval(code) {
  const sc = {}; for (const k of ['base', 'spike', 'fall']) sc[k] = c2Cost(code, k); if (!Number.isFinite(sc.base)) return null;
  const ev = Object.keys(sc).reduce((n, k) => n + C2.prob[k] * sc[k], 0), worst = Math.max(...Object.values(sc));
  return { code, sc, ev, worst, valid: worst <= C2.budget + 1e-9, approval: worst < 30 ? 'PROCUREMENT DIRECTOR' : worst <= 60 ? 'CFO' : 'CEO' };
}
export const c2Code = s => { const m = /S\s*([1-6])/i.exec(String(s || '')); return m ? 'S' + m[1] : ''; };
export function c2Decision(s) {
  const code = c2Code(s); if (!code) return { dq: 0, valid: false, why: 'Chọn một cấu trúc S1–S6.' };
  const all = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map(c2Eval), ok = all.filter(x => x.valid), e = all.find(x => x.code === code);
  if (!e.valid) return { dq: 0, valid: false, why: `${code} có chi phí xấu nhất ${e.worst.toFixed(1)} tỷ, vượt trần ngân sách 52,5 tỷ.`, e };
  const worstV = ok.reduce((a, b) => (b.ev > a.ev ? b : a)), best = ok.reduce((a, b) => (b.ev < a.ev ? b : a));
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (worstV.ev - e.ev) / (worstV.ev - best.ev)))), valid: true, e, best };
}
// mức phụ phí cố định cao nhất để S1 vẫn bằng chi phí kỳ vọng của cấu trúc (theo % P0)
export const c2BreakEven = code => { const e = c2Eval(code); return e ? 100 * (e.ev * 1e9 / (C2.vol * 12 * C2.P0) - 1) : NaN; };
