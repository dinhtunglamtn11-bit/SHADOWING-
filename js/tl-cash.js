// TeaLab đợt "dòng tiền" (chỉ lượt chơi mới: st.rules >= 4).
// Lãi lỗ vẫn ghi nhận theo ngày phát sinh, nhưng TIỀN đi theo lịch riêng: lương trả theo tuần, tiền nhà 15 ngày, điện nước và thuế 30 ngày,
// một phần doanh thu qua QR / ví điện tử đến sáng hôm sau mới về. Nhờ vậy quán có thể lãi trên sổ mà vẫn hết tiền.
// File này không đụng DOM ngoài việc trả về chuỗi HTML cho màn "Dòng tiền".
import { PARAMS as P } from './tl-data.js';

const K = 1000, rm = v => Math.round(v);
export const CASH = {
  rentShare: 0.55, utilShare: 0.15,              // phần của chi phí cố định/ngày dồn thành tiền nhà, điện nước; phần còn lại trả ngay trong ngày
  every: { wage: 7, rent: 15, util: 30, tax: 30 }, // chu kỳ trả (ngày); ngày 90 trả hết
  taxRate: 0.045,                                  // thuế khoán trên doanh thu (GTGT 3% + TNCN 1,5%, quy ước game)
  walletShare: 0.35, walletFee: 0.01,              // phần khách trả qua QR / ví và phí
  lateFee: 0.01, loanCap: 5000 * K, lastDay: 90,
};
export const BILL_NAME = { wage: 'Lương nhân viên', rent: 'Tiền thuê mặt bằng', util: 'Điện nước', tax: 'Thuế' };
const ORDER = ['wage', 'rent', 'util', 'tax'];

export const isV4 = st => st.rules >= 4;
export function initCash(st) { st.acc ||= { wage: 0, rent: 0, util: 0, tax: 0 }; st.bills ||= []; st.settle ||= []; }
export const pendingIn = st => (st.settle || []).reduce((a, s) => a + s.amt, 0);            // tiền đang chờ về
export const accrued = st => ORDER.reduce((a, k) => a + (st.acc?.[k] || 0), 0);              // đã phát sinh, chưa đến hạn
export const overdue = st => (st.bills || []).reduce((a, b) => a + b.amt, 0);                // đến hạn mà chưa trả được
export const billsOwed = st => accrued(st) + overdue(st);
export const nextDue = (kind, day) => { const n = Math.ceil(day / CASH.every[kind]) * CASH.every[kind]; return day <= CASH.lastDay ? Math.min(CASH.lastDay, n) : n; };
const isDueDay = (kind, day) => day % CASH.every[kind] === 0 || day === CASH.lastDay; // ngày 90 trả hết; chơi tiếp sau mùa thì theo chu kỳ như thường

// cuối mỗi buổi: lương ghi nợ; phần khách trả qua ví chưa vào tiền mặt. Trả về phí ví (tính vào chi khác).
export function sessionCash(st, rev, wage) {
  initCash(st);
  st.acc.wage += wage;
  const amt = rm(rev * CASH.walletShare), fee = rm(amt * CASH.walletFee);
  if (amt > 0) { st.cash -= amt; st.settle.push({ day: st.day, amt: amt - fee }); }
  return fee;
}

// cuối ngày, phần phát sinh: trả { cashNow: phần chi phí cố định trả ngay, tax }
export function accrueDay(st, fixed, rev) {
  initCash(st);
  const rent = rm(fixed * CASH.rentShare), util = rm(fixed * CASH.utilShare), tax = rm(rev * CASH.taxRate);
  st.acc.rent += rent; st.acc.util += util; st.acc.tax += tax;
  return { cashNow: fixed - rent - util, tax };
}

// cuối ngày, phần tiền: nhận tiền ví, chuyển khoản đến hạn thành hóa đơn rồi trả (thiếu thì vay gia đình, hết hạn mức thì khất và bị phạt)
export function payDay(st, day) {
  initCash(st);
  const r = { settled: pendingIn(st), paid: 0, borrowed: 0, late: 0, issued: [], unpaid: [] };
  st.cash += r.settled; st.settle = [];
  for (const k of ORDER) if (isDueDay(k, day) && st.acc[k] > 0) { st.bills.push({ kind: k, amt: st.acc[k], day }); r.issued.push(k); st.acc[k] = 0; }
  st.bills.sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind) || a.day - b.day);
  const keep = [];
  for (const b of st.bills) {
    const short = b.amt - Math.max(0, st.cash);
    if (short > 0 && st.debt + short <= CASH.loanCap) { st.cash += short; st.debt += short; r.borrowed += short; }
    if (st.cash >= b.amt) { st.cash -= b.amt; r.paid += b.amt; continue; }
    const f = rm(b.amt * CASH.lateFee); b.amt += f; r.late += f; keep.push(b); r.unpaid.push(b);
  }
  st.bills = keep;
  return r;
}
export function lateEffects(st, day) { // khất lương thì nhân viên chán, khất tiền nhà lâu thì mang tiếng
  for (const b of st.bills) {
    if (b.kind === 'wage') for (const m of st.staff) m.mood = Math.max(0, (m.mood ?? 70) - 8);
    if (b.kind === 'rent' && day - b.day >= 3) st.rep = Math.max(0, st.rep - 1);
  }
}

// ---------- dự báo tiền mặt ----------
// Giả định: doanh thu, tiền nhập hàng, lương mỗi ngày bằng trung bình 7 ngày gần nhất.
export function forecastCash(st, days = 14) {
  initCash(st);
  const h = (st.hist || []).slice(-7), avg = k => (h.length ? h.reduce((a, x) => a + (x[k] || 0), 0) / h.length : 0);
  const rev = avg('rev'), buy = avg('cogs') + avg('spoil'), wage = avg('wage'), fixed = P.fixedDay[st.stage];
  const acc = { ...st.acc }, out = [];
  let cash = st.cash, wallet = pendingIn(st), late = overdue(st);
  for (let d = st.day; d < st.day + days && (d <= CASH.lastDay || st.day > CASH.lastDay); d++) {
    const part = d === st.day && st.hist.some(x => x.day === d) ? 0 : 1; // hôm nay đã chốt sổ thì không tính lại
    const inc = rev * (1 - CASH.walletShare) * part;
    let spend = (buy + fixed * (1 - CASH.rentShare - CASH.utilShare)) * part;
    acc.wage += wage * part; acc.rent += fixed * CASH.rentShare * part; acc.util += fixed * CASH.utilShare * part; acc.tax += rev * CASH.taxRate * part;
    const items = [];
    for (const k of ORDER) if (isDueDay(k, d) && acc[k] > 0) { items.push([BILL_NAME[k], acc[k]]); spend += acc[k]; acc[k] = 0; }
    for (const p of st.payables || []) if (p.due === d) { items.push(['Công nợ nhà cung cấp', p.amt]); spend += p.amt; }
    if (late) { spend += late; late = 0; }
    const back = wallet + rev * CASH.walletShare * (1 - CASH.walletFee) * part; wallet = 0;
    cash += inc + back - spend;
    out.push({ day: d, inc: rm(inc + back), out: rm(spend), cash: rm(cash), items });
  }
  return { rows: out, based: h.length };
}

// ---------- giao diện (trả về HTML) ----------
export function cashWarnHtml(st, c) { // dải nhắc ở pha chuẩn bị / xem lại
  if (!isV4(st)) return '';
  const { kfmt, E } = c;
  if (st.bills?.length) return `<div class="tl-arr tl-cashw bad">⚠️ <b>Đang khất hóa đơn:</b> ${kfmt(overdue(st))} <small>Mỗi ngày phạt thêm 1%.</small> <button class="btn" data-a="cashflow">💧 Xem dòng tiền</button></div>`;
  const soon = forecastCash(st, 4).rows, bill = soon.find(r => r.items.length), short = soon.find(r => r.cash < 0);
  if (short) return `<div class="tl-arr tl-cashw bad">⚠️ <b>Sắp thiếu tiền:</b> dự báo ${E.dayLabel(short.day)} còn ${kfmt(short.cash)} <button class="btn" data-a="cashflow">💧 Xem dòng tiền</button></div>`;
  if (bill) return `<div class="tl-arr tl-cashw">🧾 <b>Sắp đến hạn</b> ${E.dayLabel(bill.day)}: ${bill.items.map(([n, v]) => `<span class="tl-debt"><span>${n}</span> <b>${kfmt(v)}</b></span>`).join('')} <button class="btn" data-a="cashflow">💧 Xem dòng tiền</button></div>`;
  return '';
}
export function cashHtml(c) {
  const { st, E, kfmt } = c;
  initCash(st);
  const owe = E.owed(st), wait = pendingIn(st), free = st.cash + wait - billsOwed(st) - owe;
  const kpi = (v, label, bad) => `<div><b class="${bad ? 'bad' : ''}">${v < 0 ? '−' : ''}${kfmt(Math.abs(v))}</b><small>${label}</small></div>`;
  const row = (name, amt, when) => `<tr><td>${name}</td><td>${kfmt(amt)}</td><td>${when}</td></tr>`;
  const bills = [
    ...(st.bills || []).map(b => row(BILL_NAME[b.kind], b.amt, '<b class="bad">quá hạn</b>')),
    ...ORDER.filter(k => st.acc[k] > 0).map(k => row(BILL_NAME[k], st.acc[k], E.dayLabel(nextDue(k, st.day)))),
    ...(st.payables || []).map(p => row('Công nợ nhà cung cấp', p.amt, E.dayLabel(p.due))),
    ...(st.debt > 0 ? [row('Vay (lãi 0,05%/ngày)', st.debt, 'khi dư tiền')] : []),
  ];
  const f = forecastCash(st), low = f.rows.reduce((a, r) => (r.cash < a.cash ? r : a), f.rows[0] || { cash: st.cash, day: st.day });
  const last = st.hist.slice(-7), sum = k => last.reduce((a, x) => a + (x[k] || 0), 0);
  const before = st.hist[st.hist.length - last.length - 1]?.cash ?? P.startCash, moved = last.length ? last[last.length - 1].cash - before : 0, profit = sum('profit');
  return `<div class="tl-kpis">${kpi(st.cash, 'tiền mặt', st.cash < 0)}${kpi(wait, 'đang chờ về (ví, QR)')}${kpi(-(billsOwed(st) + owe), 'sẽ phải trả')}${kpi(free, 'thật sự còn lại', free < 0)}</div>
    <div class="dim tl-note">“Thật sự còn lại” = tiền mặt + tiền chờ về − mọi khoản phải trả. Đừng mua thiết bị hay nâng cấp bằng tiền sắp phải trả cho người khác.</div>
    <h4>Khoản phải trả</h4>
    ${bills.length ? `<table class="tl-t"><thead><tr><th>Khoản</th><th>Số tiền</th><th>Hạn</th></tr></thead><tbody>${bills.join('')}</tbody></table>` : '<div class="dim">Chưa có khoản nào.</div>'}
    <h4>Dự báo tiền mặt ${f.rows.length} ngày tới</h4>
    ${f.based ? `<div class="${low.cash < 0 ? 'tl-arr tl-cashw bad' : 'dim tl-note'}">${low.cash < 0 ? `⚠️ Thấp nhất ${E.dayLabel(low.day)}: thiếu ${kfmt(-low.cash)}. Hãy giảm nhập hàng, hoãn mua sắm hoặc tăng doanh thu trước ngày đó.` : `Thấp nhất ${E.dayLabel(low.day)}: còn ${kfmt(low.cash)}.`}</div>
    <table class="tl-t"><thead><tr><th>Ngày</th><th>Thu</th><th>Chi</th><th>Còn</th></tr></thead><tbody>${f.rows.map(r => `<tr><td>${r.day}${r.items.length ? ' 🧾' : ''}</td><td>${kfmt(r.inc)}</td><td>${kfmt(r.out)}</td><td class="${r.cash < 0 ? 'bad' : ''}">${r.cash < 0 ? '−' : ''}${kfmt(Math.abs(r.cash))}</td></tr>`).join('')}</tbody></table>
    <div class="dim tl-note">Ước tính theo trung bình ${f.based} ngày gần nhất. 🧾 = ngày có hóa đơn đến hạn.</div>` : '<div class="dim">Cần bán ít nhất một ngày để dự báo.</div>'}
    ${last.length ? `<h4>Lãi và tiền mặt ${last.length} ngày qua</h4>
    <table class="tl-t"><tbody>
      <tr><td>Lãi trên sổ</td><td class="${profit < 0 ? 'bad' : 'good'}">${profit < 0 ? '−' : '+'}${kfmt(Math.abs(profit))}</td></tr>
      <tr><td>Tiền mặt thay đổi</td><td class="${moved < 0 ? 'bad' : 'good'}">${moved < 0 ? '−' : '+'}${kfmt(Math.abs(moved))}</td></tr>
      <tr><td>Hóa đơn đã trả</td><td>${kfmt(sum('paid'))}</td></tr>
      <tr><td>Thuế phát sinh</td><td>${kfmt(sum('tax'))}</td></tr>
      <tr><td>Phí ví / QR</td><td>${kfmt(sum('fee'))}</td></tr>
      <tr><td>Phạt trả trễ</td><td>${kfmt(sum('late'))}</td></tr>
    </tbody></table>
    <div class="dim tl-note">Lãi và tiền mặt khác nhau vì tiền đi chậm hoặc nhanh hơn lãi: nhập hàng trước khi bán được, hóa đơn trả theo kỳ, tiền ví về sau một đêm.</div>` : ''}`;
}
