// Engine tính toán xác định (deterministic) cho các case SCM: nhận phương án người chơi chọn, trả về lợi ích, chỉ số và vi phạm ràng buộc,
// và duyệt toàn bộ phương án để tìm tối ưu. Đáp án và chất lượng quyết định sinh từ engine nên luôn khớp số liệu của case.
// Hiện có: B3 (Payment Terms Tournament): 5^5 = 3.125 kế hoạch × 4 gói giảm thiểu rủi ro.

// ---------- B3: điều khoản thanh toán cho 5 người mua ----------
const B3 = {
  rate: 0.095, lgd: 0.85, capUnc: 110, // lãi vay 9,5%/năm, tổn thất khi vỡ nợ 85%, trần rủi ro chưa được bảo vệ (nghìn USD mỗi quý)
  buyers: [ // R: giá trị đơn hàng năm (nghìn USD), m: biên lợi nhuận gộp, pd: xác suất vỡ nợ
    { n: 'Berlin', R: 900, m: 0.22, pd: 0.008 }, { n: 'Midwest', R: 750, m: 0.20, pd: 0.02 }, { n: 'Sakura', R: 600, m: 0.24, pd: 0.005 },
    { n: 'Nile', R: 500, m: 0.28, pd: 0.06, pdUpd: 0.09, extraT2: 0.008 }, { n: 'Pacific', R: 400, m: 0.26, pd: 0.035 },
  ],
  terms: { // days: số ngày tài trợ ròng; fee: phí; unc: phần tổn thất vẫn do người bán chịu; lim: hạn mức khối lượng năm
    T1: { days: -8.6, fee: 0.0045, unc: 0, lim: Infinity }, T2: { days: 7, fee: 0.0085, unc: 0, lim: 800 }, T3: { days: 63, fee: 0.0075, unc: 0.10, lim: 900 },
    T4: { days: 17.75, fee: 0.012, unc: 0.10, lim: 1400, limUpd: 1000 }, T5: { days: 90, fee: 0, unc: 1, lim: Infinity },
  },
  win: { // xác suất thắng đơn theo điều khoản (null: không có)
    Berlin: [0.55, 0.70, 0.90, 0.95, 1], Midwest: [0.50, 0.65, 0.88, 0.95, 1], Sakura: [0.60, 0.75, 0.92, 0.96, 1], Nile: [0.50, 0.70, null, null, 0.85], Pacific: [0.45, 0.65, 0.85, 0.92, 1],
  },
  mit: { none: { cost: 0 }, A: { cost: 12 }, B: { cost: 10 }, AB: { cost: 22 } }, // A: khôi phục hạn mức T4 về 1.400; B: nâng hạn mức T3 lên 1.200
};
const CODES = ['T1', 'T2', 'T3', 'T4', 'T5'];
// plan: mảng 5 mã điều khoản; upd: dùng dữ liệu đã cập nhật; mit: 'none' | 'A' | 'B' | 'AB'
export function b3Eval(plan, upd = false, mit = 'none') {
  if (!Array.isArray(plan) || plan.length !== 5 || !plan.every(t => CODES.includes(t))) return null;
  const vol = { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0 }; let contrib = 0, unc = 0, ok = true; const cells = [];
  plan.forEach((t, i) => {
    const b = B3.buyers[i], tm = B3.terms[t], p = B3.win[b.n][CODES.indexOf(t)]; if (p == null) { ok = false; cells.push(null); return; }
    const V = b.R * p, pd = upd && b.pdUpd ? b.pdUpd : b.pd, fee = tm.fee + (t === 'T2' && b.extraT2 ? b.extraT2 : 0);
    const c = V * (b.m - tm.days / 365 * B3.rate - fee) - V * pd * B3.lgd * tm.unc; contrib += c; vol[t] += V; unc += V * tm.unc / 4; cells.push(c);
  });
  const limT4 = upd ? (/A/.test(mit) ? B3.terms.T4.lim : B3.terms.T4.limUpd) : B3.terms.T4.lim, limT3 = /B/.test(mit) ? 1200 : B3.terms.T3.lim;
  const breach = []; if (vol.T2 > B3.terms.T2.lim + 1e-9) breach.push('T2'); if (vol.T3 > limT3 + 1e-9) breach.push('T3'); if (vol.T4 > limT4 + 1e-9) breach.push('T4'); if (unc > B3.capUnc + 1e-9) breach.push('UNC');
  return { contrib, net: contrib - B3.mit[mit].cost, unc, vol, cells, feasible: ok && !breach.length, breach };
}
let b3Best = null;
// duyệt toàn bộ: tối ưu theo từng gói giảm thiểu, mốc so sánh = kế hoạch tốt nhất không giảm thiểu (dữ liệu đã cập nhật)
export function b3Optimum() {
  if (b3Best) return b3Best;
  const res = { none: null, A: null, B: null, AB: null };
  const rec = (plan) => { if (plan.length === 5) { for (const m of Object.keys(res)) { const e = b3Eval(plan, true, m); if (e && e.feasible && (!res[m] || e.net > res[m].net)) res[m] = { plan: plan.slice(), ...e }; } return; } for (const t of CODES) { plan.push(t); rec(plan); plan.pop(); } };
  rec([]); const all = Object.values(res).filter(Boolean), opt = all.reduce((a, b) => (b.net > a.net ? b : a)), base = res.none.net;
  return (b3Best = { byMit: res, opt, base });
}
export const b3Parse = s => { const t = String(s || '').toUpperCase().match(/T[1-5]/g); return t && t.length === 5 ? t : null; };
export const b3Mit = s => { const t = String(s || '').toUpperCase().replace(/[^AB]/g, ''); return t === 'AB' || t === 'BA' ? 'AB' : t === 'A' ? 'A' : t === 'B' ? 'B' : 'none'; };
// chất lượng quyết định = (net đã chọn − net tốt nhất không giảm thiểu) ÷ (net tối ưu − net tốt nhất không giảm thiểu)
export function b3Decision(planStr, mitStr) {
  const plan = b3Parse(planStr); if (!plan) return { dq: 0, valid: false, why: 'Kế hoạch phải gồm 5 mã T1–T5, ví dụ T3-T4-T4-T2-T3.' };
  const mit = b3Mit(mitStr), e = b3Eval(plan, true, mit); if (!e) return { dq: 0, valid: false, why: 'Điều khoản không áp dụng được cho người mua này.' };
  const o = b3Optimum(); if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join(', '), e };
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (e.net - o.base) / (o.opt.net - o.base)))), valid: true, e, o };
}

// ---------- D3: ColdLink, kho lạnh (quy mô × địa điểm × cấu trúc vốn) ----------
const D3 = {
  pos: { S: 1500, M: 2500, L: 4000 }, capexPer: { Lease: 5.5, Build: 12.5 }, dep: { Lease: 10, Build: 20 }, price: 0.4, discL: 0.06, // triệu VND
  fin: { F1: { share: 0.6, rate: 0.105, grace: 0, n: 7 }, F2: { share: 0.7, rate: 0.115, grace: 1, n: 6 }, F3: { share: 0.4, rate: 0.10, grace: 0, n: 7 } },
  occ: { base: [0.55, 0.70, 0.80, 0.85, 0.85], down: [0.43, 0.58, 0.68, 0.73, 0.73], up: [0.60, 0.75, 0.85, 0.90, 0.90] }, prob: { base: 0.5, down: 0.3, up: 0.2 },
  limits: { dscr: 1.05, liq: 4400, equity: 13500, equityUpd: 9000 }, disc: 0.14, tvMult: 6,
};
// một kịch bản: trả về các năm (doanh thu, EBITDA, lãi, gốc, thuế, CFADS, FCFE, DSCR) và NPV
function d3Scenario(scale, site, fin, occ, upd) {
  const P = D3.pos[scale], f = D3.fin[fin], rate = f.rate + (upd ? 0.015 : 0), capex = P * D3.capexPer[site], loan = capex * f.share, equity = capex - loan;
  const wage = 8.748 * (upd ? 1.05 : 1), yrs = []; let bal = loan, npv = -equity;
  for (let y = 1; y <= 5; y++) {
    const rev = P * occ[y - 1] * 12 * D3.price * (scale === 'L' ? 1 - D3.discL : 1);
    const ebitda = rev - (P * 12 * 0.06 + P * occ[y - 1] * 12 * 0.025) - (6 + P / 250) * wage * 12 - 360 - 0.019 * capex - (site === 'Lease' ? P * 12 * 0.05 : 0);
    const interest = bal * rate, principal = y <= f.grace ? 0 : loan / f.n, taxRate = rev <= 3000 ? 0.15 : 0.17, tax = taxRate * Math.max(0, ebitda - capex / D3.dep[site] - interest);
    const cfads = ebitda - tax, ds = interest + principal, fcfe = cfads - ds; bal -= principal;
    npv += fcfe / (1 + D3.disc) ** y; yrs.push({ rev, ebitda, interest, principal, tax, cfads, ds, dscr: cfads / ds, fcfe });
  }
  const tv = D3.tvMult * yrs[4].ebitda - bal; npv += tv / (1 + D3.disc) ** 5;
  return { yrs, npv, capex, loan, equity, tv };
}
export function d3Eval(scale, site, fin, upd = false) {
  if (!D3.pos[scale] || !D3.capexPer[site] || !D3.fin[fin]) return null;
  const sc = {}; for (const k of ['base', 'down', 'up']) sc[k] = d3Scenario(scale, site, fin, D3.occ[k], upd);
  const enpv = Object.keys(sc).reduce((n, k) => n + D3.prob[k] * sc[k].npv, 0), minDscr = Math.min(...sc.base.yrs.slice(1).map(y => y.dscr));
  const shortfall = -sc.down.yrs.reduce((n, y) => n + Math.min(0, y.fcfe), 0), equity = sc.base.equity, eqCap = upd ? D3.limits.equityUpd : D3.limits.equity;
  const breach = []; if (minDscr < D3.limits.dscr - 1e-9) breach.push('covenant'); if (shortfall > D3.limits.liq + 1e-9) breach.push('liquidity line'); if (equity > eqCap + 1e-9) breach.push('equity cap');
  return { sc, enpv, minDscr, shortfall, equity, approval: equity < 6000 ? 'CFO' : equity <= 12000 ? 'CEO' : 'Board', feasible: !breach.length, breach };
}
let d3Best = {};
export function d3Optimum(upd = true) {
  const key = upd ? 'u' : 'o'; if (d3Best[key]) return d3Best[key]; let best = null; const all = [];
  for (const s of ['S', 'M', 'L']) for (const site of ['Lease', 'Build']) for (const fin of ['F1', 'F2', 'F3']) { const e = d3Eval(s, site, fin, upd); all.push({ s, site, fin, ...e }); if (e.feasible && (!best || e.enpv > best.enpv)) best = { s, site, fin, ...e }; }
  const ref = d3Eval('S', 'Lease', 'F3', upd); return (d3Best[key] = { best, ref, all });
}
// chất lượng quyết định = (E[NPV] của lựa chọn − E[NPV] của phương án nhỏ an toàn S·Lease·F3) ÷ (tối ưu − mốc đó)
export function d3Decision(scale, site, fin) {
  const e = d3Eval(String(scale).toUpperCase().charAt(0), /^b/i.test(site) ? 'Build' : /^l/i.test(site) ? 'Lease' : '', String(fin).toUpperCase(), true);
  if (!e) return { dq: 0, valid: false, why: 'Chọn đủ quy mô (S/M/L), địa điểm (Lease/Build) và cấu trúc vốn (F1/F2/F3).' };
  const o = d3Optimum(true); if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join(', '), e };
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (e.enpv - o.ref.enpv) / (o.best.enpv - o.ref.enpv)))), valid: true, e, o };
}
// ---------- bộ giải tuyến tính nhỏ (simplex hai pha, quy tắc Bland): min c·x, mỗi ràng buộc {a, op:'<='|'>='|'=', b}, x ≥ 0 ----------
function lpSolve(c, cons) {
  const n = c.length, m = cons.length, EPS = 1e-9; let nv = n; const rows = [], basis = [], art = [];
  const slack = cons.filter(k => k.op !== '=').length, total = n + slack + m; let si = n;
  cons.forEach((k, i) => {
    let a = k.a.slice(), b = k.b, op = k.op; if (b < 0) { a = a.map(v => -v); b = -b; op = op === '<=' ? '>=' : op === '>=' ? '<=' : '='; }
    const r = new Array(total + 1).fill(0); a.forEach((v, j) => { r[j] = v; }); r[total] = b;
    if (op === '<=') { r[si] = 1; basis.push(si); si++; } else if (op === '>=') { r[si] = -1; si++; r[n + slack + i] = 1; basis.push(n + slack + i); art.push(n + slack + i); } else { r[n + slack + i] = 1; basis.push(n + slack + i); art.push(n + slack + i); }
    rows.push(r);
  });
  const run = (cost, allowed) => {
    for (let it = 0; it < 5000; it++) {
      let enter = -1; for (let j = 0; j < total; j++) { if (!allowed(j) || basis.includes(j)) continue; let z = cost[j]; for (let i = 0; i < m; i++) z -= cost[basis[i]] * rows[i][j]; if (z < -EPS) { enter = j; break; } }
      if (enter < 0) return true;
      let leave = -1, best = Infinity; for (let i = 0; i < m; i++) if (rows[i][enter] > EPS) { const t = rows[i][total] / rows[i][enter]; if (t < best - EPS || (Math.abs(t - best) <= EPS && basis[i] < basis[leave])) { best = t; leave = i; } }
      if (leave < 0) return false;
      const p = rows[leave][enter]; rows[leave] = rows[leave].map(v => v / p);
      for (let i = 0; i < m; i++) if (i !== leave) { const f = rows[i][enter]; if (f) rows[i] = rows[i].map((v, j) => v - f * rows[leave][j]); }
      basis[leave] = enter;
    }
    return false;
  };
  const c1 = new Array(total).fill(0); art.forEach(j => { c1[j] = 1; }); run(c1, () => true);
  if (art.some(j => { const i = basis.indexOf(j); return i >= 0 && rows[i][total] > 1e-6; })) return null; // vô nghiệm
  const c2 = new Array(total).fill(0); c.forEach((v, j) => { c2[j] = v; });
  if (!run(c2, j => !art.includes(j))) return null;
  const x = new Array(n).fill(0); basis.forEach((j, i) => { if (j < n) x[j] = rows[i][total]; });
  return { x, cost: x.reduce((s, v, j) => s + v * c[j], 0) };
}

// ---------- C3: nguồn cung kép cho nhà máy Thái Nguyên (4 nhà cung cấp × 3 nhà máy) ----------
const C3 = {
  price: [0.420, 0.395, 0.470, 0.545], lead: [18, 20, 10, 2], ppm: [800, 1500, 300, 200], cap: [600, 500, 400, 350], cn: [true, true, false, false],
  fr: [[0.035, 0.030, 0.022], [0.042, 0.036, 0.030], [0.050, 0.046, 0.040], [0.012, 0.006, 0.020]], dem: [480, 320, 200], fixed: 6, moq: 100, share: 450, local: 200, leadMax: 12,
};
// ma trận chi phí hàng-đơn-vị (USD) ở dữ liệu gốc hoặc đã cập nhật (thuế bổ sung 5% cho hàng Trung Quốc, giá S4 +3%)
export function c3Costs(upd = false) {
  return C3.price.map((p0, s) => { const p = upd && s === 3 ? p0 * 1.03 : p0; return C3.fr[s].map(f => p + f + (upd && C3.cn[s] ? 0.05 * (p + f) : 0) + C3.ppm[s] / 1e6 * 6 + p * 0.10 * C3.lead[s] / 365); });
}
// x: ma trận 4×3 (nghìn đơn vị); trả về chi phí tháng (nghìn USD), vi phạm, thời gian giao hàng trung bình
export function c3Eval(x, upd = true) {
  if (!Array.isArray(x) || x.length !== 4 || x.some(r => !Array.isArray(r) || r.length !== 3 || r.some(v => !Number.isFinite(v) || v < 0))) return null;
  const K = c3Costs(upd), vol = x.map(r => r[0] + r[1] + r[2]), tot = vol.reduce((a, b) => a + b, 0), used = vol.filter(v => v > 1e-9).length;
  const variable = x.reduce((s, r, i) => s + r.reduce((t, v, j) => t + v * K[i][j], 0), 0), cost = variable + used * C3.fixed, avgLead = tot ? vol.reduce((s, v, i) => s + v * C3.lead[i], 0) / tot : 0;
  const breach = []; [0, 1, 2].forEach(j => { if (Math.abs(x.reduce((s, r) => s + r[j], 0) - C3.dem[j]) > 0.5) breach.push('demand'); });
  vol.forEach((v, i) => { if (v > C3.cap[i] + 0.5) breach.push('capacity S' + (i + 1)); if (v > C3.share + 0.5) breach.push('share S' + (i + 1)); if (v > 1e-9 && v < C3.moq - 0.5) breach.push('MOQ S' + (i + 1)); });
  if (vol[3] < C3.local - 0.5) breach.push('local'); if (avgLead > C3.leadMax + 0.005) breach.push('lead time');
  const annual = cost * 12 / 1000; return { cost, used, avgLead, vol, annual, approval: annual < 3 ? 'PROCUREMENT DIRECTOR' : annual <= 10 ? 'CFO' : 'CEO', breach: [...new Set(breach)], feasible: !breach.length };
}
let c3Best = {};
// tối ưu: giải LP cho mỗi trong 15 tập nhà cung cấp, cộng chi phí cố định, lấy rẻ nhất
export function c3Optimum(upd = true) {
  const key = upd ? 'u' : 'o'; if (c3Best[key]) return c3Best[key]; const K = c3Costs(upd); let best = null;
  for (let mask = 1; mask < 16; mask++) {
    const S = [0, 1, 2, 3].filter(i => mask & (1 << i)), idx = (s, j) => S.indexOf(s) * 3 + j, nv = S.length * 3, cons = [], z = () => new Array(nv).fill(0);
    [0, 1, 2].forEach(j => { const a = z(); S.forEach(s => { a[idx(s, j)] = 1; }); cons.push({ a, op: '=', b: C3.dem[j] }); });
    S.forEach(s => { const a = z(); [0, 1, 2].forEach(j => { a[idx(s, j)] = 1; }); cons.push({ a: a.slice(), op: '<=', b: Math.min(C3.cap[s], C3.share) }, { a: a.slice(), op: '>=', b: C3.moq }); });
    if (S.includes(3)) { const a = z(); [0, 1, 2].forEach(j => { a[idx(3, j)] = 1; }); cons.push({ a, op: '>=', b: C3.local }); } else continue;
    const a = z(); S.forEach(s => { [0, 1, 2].forEach(j => { a[idx(s, j)] = C3.lead[s] - C3.leadMax; }); }); cons.push({ a, op: '<=', b: 0 });
    const cvec = z(); S.forEach(s => { [0, 1, 2].forEach(j => { cvec[idx(s, j)] = K[s][j]; }); });
    const r = lpSolve(cvec, cons); if (!r) continue; const tot = r.cost + S.length * C3.fixed;
    if (!best || tot < best.cost) { const x = [0, 1, 2, 3].map(s => [0, 1, 2].map(j => (S.includes(s) ? r.x[idx(s, j)] : 0))); best = { cost: tot, S, x }; }
  }
  const Y = c3Eval([[130, 120, 200], [0, 0, 0], [350, 0, 0], [0, 200, 0]], upd), Z = c3Eval([[0, 0, 0], [240, 120, 90], [240, 0, 110], [0, 200, 0]], upd);
  return (c3Best[key] = { best, Y, Z });
}
// chất lượng quyết định = (chi phí mốc Y − chi phí của bạn) ÷ (chi phí mốc Y − tối ưu); trong 0,2k của tối ưu = 100
export function c3Decision(x) {
  const e = c3Eval(x, true); if (!e) return { dq: 0, valid: false, why: 'Điền đủ 12 ô phân bổ bằng số không âm.' };
  if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join(', '), e };
  const o = c3Optimum(true); if (e.cost <= o.best.cost + 0.2) return { dq: 100, valid: true, e, o };
  return { dq: Math.max(0, Math.min(99, Math.round(100 * (o.Y.cost - e.cost) / (o.Y.cost - o.best.cost)))), valid: true, e, o };
}

// ---------- A3: thư kiểm tra hải quan (72 chiến lược H×V×F×O×E) ----------
// khoản thiếu và tiền lãi theo nhóm lỗi (VND triệu), tổng hợp từ sổ 24 tờ khai; hoàn thuế do khai dư (E)
const A3 = {
  cat: { H: { s: 275.6, i: 14.12 }, V: { s: 31.1, i: 1.85 }, F: { s: 8.6, i: 0.45 }, O: { s: 409.8, i: 21.17 } },
  defend: { H: { p: 0.55, legal: 45 }, M: { p: 0.35, legal: 75 }, V: { p: 0.85, legal: 30 }, F: { p: 0.95, legal: 20 }, O: { p: 0.60, legal: 35 } },
  refund: 20, refundFee: 5, aeo: 180, rFee: 18, rP: 0.5, line: 900, lineOld: 1000, budget: 100,
};
export function a3Parse(str) {
  const t = String(str || '').toUpperCase().match(/[A-Z]/g); if (!t || t.length !== 5) return null;
  const [h, v, f, o, e] = t; return 'DXM'.includes(h) &&'DX'.includes(v) && 'DX'.includes(f) && 'DXR'.includes(o) && 'YN'.includes(e) ? t : null;
}
export function a3Eval(str, line = A3.line) {
  const t = a3Parse(str); if (!t) return null; const [h, v, f, o, e] = t; let exp = 0, worst = 0, legal = 0, keep = 1; const L = A3.cat;
  const one = (k, ch) => {
    const c = L[k], dis = 1.1 * c.s + c.i;
    if (ch === 'D') { exp += dis; worst += dis; return; }
    if (ch === 'R') { exp += A3.rFee + A3.rP * dis; worst += A3.rFee + dis; return; }
    const d = A3.defend[ch === 'M' ? 'M' : k], lose = 1.2 * c.s + c.i; exp += d.p * lose + d.legal; worst += lose + d.legal; legal += d.legal; keep *= 1 - d.p;
  };
  one('H', h); one('V', v); one('F', f); one('O', o);
  if (e === 'Y') { exp += -A3.refund + A3.refundFee; worst += A3.refundFee; }
  const aeo = A3.aeo * (1 - keep); exp += aeo;
  const breach = []; if (worst > line + 1e-9) breach.push('credit line'); if (legal > A3.budget + 1e-9) breach.push('legal budget');
  return { code: t.join('-'), exp, worst, legal, aeo, approval: worst < 500 ? 'FINANCE DIRECTOR' : worst <= 1000 ? 'CFO' : 'CEO', breach, feasible: !breach.length };
}
export function a3All(line = A3.line) { const r = []; for (const h of 'DXM') for (const v of 'DX') for (const f of 'DX') for (const o of 'DXR') for (const e of 'YN') r.push(a3Eval([h, v, f, o, e].join(''), line)); return r; }
export function a3Optimum(line = A3.line) { return a3All(line).filter(x => x.feasible).reduce((a, b) => (b.exp < a.exp ? b : a)); }
// chất lượng quyết định = lợi ích so với chính sách mặc định S1 ÷ lợi ích tối ưu
export function a3Decision(str) {
  const e = a3Eval(str); if (!e) return { dq: 0, valid: false, why: 'Chiến lược gồm 5 chữ cái, ví dụ D-D-D-R-Y.' };
  if (!e.feasible) return { dq: 0, valid: false, why: 'Vi phạm: ' + e.breach.join(', ') + ` (tiền mặt xấu nhất ${e.worst.toFixed(1)}).`, e };
  const base = a3Eval('DDDDY').exp, opt = a3Optimum();
  return { dq: Math.max(0, Math.min(100, Math.round(100 * (base - e.exp) / (base - opt.exp)))), valid: true, e, opt };
}
