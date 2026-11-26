// TeaLab: vận hành chuỗi cung ứng (lượt luật v2): luật đặt hàng tự động, bảng chỉ số, dự báo nhu cầu, ABC–XYZ.
// Phần tính là hàm thuần trên st.log / st.hist; phần *Html chỉ trả chuỗi, opsClick / opsChange xử lý bấm trong cửa sổ.
import * as E from './tl-engine.js';
import * as D from './tl-data.js';
import * as ART from './tl-art.js';

const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const sd = a => { if (a.length < 2) return 0; const m = mean(a); return Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / (a.length - 1)); };
const kfmt = n => Math.round(n / 1000).toLocaleString('vi-VN') + 'K';
const num = (n, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toString().replace('.', ',');
const pct = x => Math.round(100 * x) + '%';
const PIC = { tranchau: 'prepPot', tra: 'teaPot' }, SIC = { cash: 'stCash', bar: 'stBar', pack: 'stPack', ship: 'truck' };
const openLog = st => (st.log || []).filter(r => r.open);
export const leadOf = sup => (sup === 'C' ? 8 : D.TERMS[sup].lead);
const share = (st, br) => (st.b2 ? (br === 'B' ? 0.25 : 0.75) : 1);
// nguyên liệu đang liên quan: thuộc món đang bật, hoặc còn trong kho, hoặc đã có luật
export const ingsInUse = (st, br = 'A') => D.ING_ORDER.filter(g => D.ITEM_ORDER.some(i => st.menu[i] && D.ITEMS[i].stage <= st.stage && D.inSeason(i, st.day) && D.ITEMS[i].ing.includes(g)) || E.stockOf(st, g) > 0 || E.polOf(st, g, br));

// ---------- gợi ý số cho luật ----------
export function suggest(st, g, br = 'A', sup = 'A', T = 2) {
  const rows = openLog(st).slice(-12); if (rows.length < 4) return null;
  const use = rows.map(r => (r.use[g] || 0) * share(st, br)), mu = mean(use), sg = sd(use), L = leadOf(sup), z = 1.65;
  if (!mu) return null;
  const ss = z * sg * Math.sqrt(L), s = Math.ceil(mu * L + ss);
  const day = 4 * mu, fee = D.TERMS[sup].fee / 3, price = E.marketPrice(st, g), zone = D.zoneOf(g), H = price * D.STORE.zone[zone].hold;
  const eoq = Math.sqrt(2 * day * fee / H);
  let Q = eoq;
  if (D.ING[g].grp === 'fresh') Q = Math.min(Q, mu * Math.max(2, (E.maxShelf(st, g) - 1) * 4)); // hàng tươi: không đặt quá phần dùng kịp trước khi hỏng
  const zoneUse = mean(rows.map(r => D.ING_ORDER.filter(x => D.zoneOf(x) === zone).reduce((a, x) => a + (r.use[x] || 0), 0))) * share(st, br);
  const room = E.capOf(st, zone, br) * 0.85 * (mu / Math.max(1, zoneUse)) - ss; // phần chỗ chứa chia theo tỷ lệ dùng trong khu
  Q = Math.max(Math.ceil(mu), Math.min(Math.ceil(Q), Math.max(Math.ceil(mu), Math.floor(room))));
  return { mu, sg, L, ss, s, Q, S: s + Q, T, Sper: Math.ceil(mu * (L + T) + z * sg * Math.sqrt(L + T)), eoq };
}

// ---------- chỉ số ----------
export function kpis(st) {
  const h = st.hist.slice(-7), sum = k => h.reduce((a, x) => a + (x[k] || 0), 0), log = openLog(st).slice(-28);
  const cogs = sum('cogs'), spoil = sum('spoil'), invs = h.filter(x => x.inv != null).map(x => x.inv), inv = invs.length ? invs[invs.length - 1] : null;
  const sup = ['A', 'B', 'C', 'D'].map(id => { const l = (st.supLog[id] || []).filter(x => x[1] !== 'đủ (sau khi trễ)'); return { id, n: l.length, otif: l.length ? l.filter(x => x[1] === 'đủ').length / l.length : null }; }).filter(x => x.n);
  return {
    days: h.length, sessions: log.length,
    fill: sum('buyers') ? 1 - sum('ls') / sum('buyers') : null,
    service: log.length ? log.filter(r => !r.ls).length / log.length : null,
    invDays: inv != null && cogs ? inv / (cogs / h.length) : null,
    turn: invs.length && mean(invs) ? cogs / mean(invs) : null,
    spoil: cogs + spoil ? spoil / (cogs + spoil) : null,
    hold: sum('hold'), inv, sup,
  };
}

// ---------- dự báo ----------
export const demandOf = r => (!r.ls ? r.cups : r.want > r.ls ? r.cups * r.want / (r.want - r.ls) : r.want * 1.4); // buổi hụt hàng: bù lại số ly lẽ ra bán được
export const METHODS = [['naive', 'Lấy y buổi cùng giờ hôm trước'], ['ma', 'Trung bình trượt 3 ngày'], ['es', 'San mũ (α = 0,3)'], ['wd', 'San mũ có hệ số theo thứ']];
function predict(m, hist, day) { // hist: các buổi cùng giờ trước đó [{d, y}]
  if (!hist.length) return null;
  if (m === 'naive') return hist[hist.length - 1].y;
  if (m === 'ma') return mean(hist.slice(-3).map(x => x.y));
  const es = a => a.reduce((s, y) => (s == null ? y : s + 0.3 * (y - s)), null);
  if (m === 'es') return es(hist.map(x => x.y));
  if (hist.length < 7) return null;
  const all = mean(hist.map(x => x.y)), f = w => { const a = hist.filter(x => D.dow(x.d) === w).map(x => x.y); return a.length && all ? Math.max(0.3, mean(a) / all) : 1; };
  return es(hist.map(x => x.y / f(D.dow(x.d)))) * f(D.dow(day));
}
export function nextTarget(st) { // buổi sắp tới cần dự báo
  if (st.phase === 'PREP') return { day: st.day, k: st.k };
  const ss = E.sessionsOfDay(st.day), i = ss.indexOf(st.k);
  return i < ss.length - 1 ? { day: st.day, k: ss[i + 1] } : { day: st.day + 1, k: 0 };
}
export function forecasts(st) {
  const by = {}, err = Object.fromEntries([...METHODS.map(m => m[0]), 'me'].map(m => [m, []]));
  for (const r of openLog(st)) {
    const hist = (by[r.k] ||= []), y = demandOf(r);
    for (const [m] of METHODS) { const f = predict(m, hist, r.d); if (f != null) err[m].push([f, y]); }
    if (r.f != null) err.me.push([r.f, y]);
    hist.push({ d: r.d, y });
  }
  const score = a => { const x = a.slice(-28), tot = x.reduce((s, [, y]) => s + y, 0); return x.length ? { n: x.length, mae: mean(x.map(([f, y]) => Math.abs(f - y))), wape: tot ? x.reduce((s, [f, y]) => s + Math.abs(f - y), 0) / tot : null, bias: mean(x.map(([f, y]) => f - y)) } : null; };
  const t = nextTarget(st), hist = by[t.k] || [];
  const rows = METHODS.map(([id, name]) => ({ id, name, next: predict(id, hist, t.day), err: score(err[id]) }));
  const ok = rows.filter(r => r.err && r.err.n >= 4 && r.next != null);
  const best = ok.length ? ok.reduce((a, b) => (b.err.mae < a.err.mae ? b : a)).id : null;
  return { target: t, rows, best, me: score(err.me) };
}

// ---------- ABC–XYZ ----------
export function abcxyz(st, days = 14) {
  const log = openLog(st).filter(r => r.d > st.day - days - 1), ds = [...new Set(log.map(r => r.d))];
  if (ds.length < 5) return null;
  const rows = D.ING_ORDER.map(g => {
    const daily = ds.map(d => log.filter(r => r.d === d).reduce((a, r) => a + (r.use[g] || 0), 0)), q = daily.reduce((a, b) => a + b, 0);
    return { g, q, value: q * E.marketPrice(st, g), cv: mean(daily) ? sd(daily) / mean(daily) : 0 };
  }).filter(r => r.q > 0).sort((a, b) => b.value - a.value);
  const tot = rows.reduce((a, r) => a + r.value, 0); let cum = 0;
  for (const r of rows) { const before = cum / tot; cum += r.value; r.share = r.value / tot; r.abc = before < 0.8 ? 'A' : before < 0.95 ? 'B' : 'C'; r.xyz = r.cv < 0.25 ? 'X' : r.cv < 0.5 ? 'Y' : 'Z'; }
  return { days: ds.length, rows };
}

// ---------- giao diện ----------
const MODE = [['off', 'Tự đặt tay'], ['sq', '(s, Q): còn ≤ s thì đặt Q'], ['ss', '(s, S): còn ≤ s thì đặt tới S'], ['per', 'Định kỳ: mỗi T buổi đặt tới S']];
const supsOf = (st, g) => Object.keys(D.SUPPLIERS).filter(x => { const s = D.SUPPLIERS[x]; return s.stage <= st.stage && (!s.needFlag || st.flags[s.needFlag]) && (!s.fresh || D.ING[g].grp === 'fresh'); });
const field = (g, k, label, v) => `<label>${label} <input class="tl-num" data-pol="${g}" data-k="${k}" type="text" inputmode="numeric" value="${v}"></label>`;

export function polHtml(c) {
  const { st, A, G } = c;
  if (!E.isV2(st)) return '<div class="dim">Đặt hàng tự động chỉ có ở lượt chơi mới.</div>';
  const br = G.polBr === 'B' && st.b2 ? 'B' : 'A';
  const brs = st.b2 ? `<div class="tl-sups"><button class="chip ${br === 'A' ? 'on' : ''}" data-polbr="A">🏪 Chi nhánh 1</button><button class="chip ${br === 'B' ? 'on' : ''}" data-polbr="B">🏬 Chi nhánh 2</button></div>` : '';
  const pay = `<div class="tl-sups"><button class="chip ${st.polPay !== 'credit' ? 'on' : ''}" data-polpay="now">💵 Trả ngay</button><button class="chip ${st.polPay === 'credit' ? 'on' : ''}" data-polpay="credit">🧾 Ghi nợ nếu được</button></div>`;
  const rows = ingsInUse(st, br).map(g => {
    const p = E.polOf(st, g, br), m = p?.m || 'off', sug = suggest(st, g, br, p?.sup || 'A', p?.T || 2), on = br === 'B' ? E.stockB(st, g) : E.stockOf(st, g);
    const fields = m === 'off' ? '' : `<div class="tl-polf">${m === 'per' ? field(g, 'T', 'T', p.T) : field(g, 's', 's', p.s)}${m === 'sq' ? field(g, 'Q', 'Q', p.Q) : field(g, 'S', 'S', p.S)}<label><span>Nhà cung cấp</span> <select data-pol="${g}" data-k="sup">${supsOf(st, g).map(x => `<option value="${x}" ${p.sup === x ? 'selected' : ''}>${x}</option>`).join('')}</select></label>${sug ? `<button class="btn" data-polsug="${g}">💡 Dùng số gợi ý</button>` : ''}</div>`;
    const hint = sug ? `<small class="dim">${`<span>Dùng trung bình ${num(sug.mu)} mỗi buổi, lệch chuẩn ${num(sug.sg)}.</span>`} <span>Gợi ý: s = ${sug.s}, Q = ${sug.Q}, S = ${m === 'per' ? sug.Sper : sug.S}.</span></small>` : '<small class="dim">Cần ít nhất 4 buổi số liệu để gợi ý.</small>';
    return `<div class="tl-pol ${m === 'off' ? '' : 'on'}"><div class="tl-polh"><span class="tl-ico">${A.ingIc(g, 22)}</span><div class="tl-nm"><b>${esc(D.ING[g].name)}</b><small class="dim"><span>kho ${on}</span> · <span>cả đang về ${E.positionOf(st, g, br)}</span></small></div><select data-pol="${g}" data-k="m">${MODE.map(([v, n]) => `<option value="${v}" ${m === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div>${fields}${hint}</div>`;
  }).join('');
  const log = (st.polLog || []).slice(0, 6).map(x => `<div class="tl-polog"><span>${E.dayLabel(x.d)} S${x.k + 1}${st.b2 ? (x.br === 'B' ? ' CN2' : ' CN1') : ''}</span> <span>${esc(x.msg)}</span></div>`).join('');
  return `${A.illus('auto')}<div class="dim tl-note">Luật chạy <b>sau mỗi buổi</b>, cả khi đi ngủ. “Còn” tính cả hàng đang trên đường. Nguyên liệu chưa đặt luật thì bạn tự đặt (khi đi ngủ, Kế hoạch đứng lo hộ).</div>
    <details class="tl-more"><summary>Cách chọn s, Q, S</summary><p>s (điểm đặt lại) = mức dùng mỗi buổi × số buổi chờ hàng + dự phòng 1,65 × lệch chuẩn × √(số buổi chờ). Q lấy theo EOQ, nhưng không quá phần dùng kịp (hàng tươi) và chỗ chứa. S = s + Q. Định kỳ thì S phải đủ cho cả số buổi chờ cộng T buổi.</p><p>Số gợi ý dựa trên 12 buổi gần nhất. Trước Tết, đợt rét hay lễ, hãy tự chỉnh vì quá khứ không biết trước.</p></details>
    ${brs}${pay}${rows}${log ? '<h4>Nhật ký đặt tự động</h4>' + log : ''}`;
}

function sawSvg(c) {
  const { st, G } = c, log = (st.log || []).slice(-24); if (log.length < 3) return '<div class="dim">Cần ít nhất 3 buổi số liệu để vẽ.</div>';
  const list = ingsInUse(st), g = list.includes(G.sawG) ? G.sawG : list[0];
  const pts = log.flatMap(r => [r.s0[g] || 0, r.s1[g] || 0]), p = E.polOf(st, g), line = p && p.m !== 'per' ? p.s : null;
  const W = 300, H = 120, mx = Math.max(1, ...pts, line || 0), px = i => 6 + i * (W - 12) / (pts.length - 1), py = v => H - 6 - v / mx * (H - 14);
  return `<div class="tl-sups">${list.map(x => `<button class="chip ${x === g ? 'on' : ''}" data-saw="${x}">${esc(D.ING[x].name)}</button>`).join('')}</div>
    <svg viewBox="0 0 ${W} ${H}" class="tl-svg"><polyline fill="none" stroke="#2f7ad1" stroke-width="2" points="${pts.map((v, i) => px(i) + ',' + py(v)).join(' ')}"/>${line != null ? `<line x1="6" x2="${W - 6}" y1="${py(line)}" y2="${py(line)}" stroke="#e8452c" stroke-width="1.5" stroke-dasharray="5 4"/>` : ''}</svg>
    <div class="dim tl-note"><span>Tồn kho đầu và cuối của ${log.length} buổi gần nhất, cao nhất ${mx}.</span> <span>Đi xuống là bán, nhảy lên là hàng về.</span>${line != null ? ` <span>Đường đỏ: điểm đặt lại s = ${line}.</span>` : ''}</div>`;
}
export function kpiHtml(c) {
  const k = kpis(c.st), v = (x, f) => (x == null ? '—' : f(x));
  const card = (name, val, note, cls = '') => `<div class="tl-kpi ${cls}"><small>${name}</small><b>${val}</b><small class="dim">${note}</small></div>`;
  const cards = [
    card('Tỷ lệ đáp ứng', v(k.fill, pct), 'Khách muốn mua mà không bị hết hàng.', k.fill == null ? '' : k.fill >= 0.95 ? 'good' : 'warn'),
    card('Mức phục vụ', v(k.service, pct), 'Số buổi không hụt hàng lần nào (28 buổi gần nhất).', k.service == null ? '' : k.service >= 0.9 ? 'good' : 'warn'),
    card('Số ngày tồn kho', v(k.invDays, x => num(x)), 'Hàng trong kho đủ dùng khoảng bao nhiêu ngày.'),
    card('Vòng quay kho (7 ngày)', v(k.turn, x => num(x)), 'Giá vốn đã dùng chia tồn kho trung bình.'),
    card('Tỷ lệ hỏng', v(k.spoil, pct), 'Giá trị hàng hỏng trên tổng hàng đã tiêu.', k.spoil == null ? '' : k.spoil <= 0.03 ? 'good' : 'warn'),
    card('Phí giữ hàng (7 ngày)', kfmt(k.hold), 'Tiền trả cho việc để hàng nằm kho.'),
  ].join('');
  const sup = !c.st.tools.supplier ? '<div class="dim tl-note">🔒 Mở “Nhật ký nhà cung cấp” bằng IP để xem tỷ lệ giao đúng hẹn và đủ hàng.</div>' : k.sup.map(x => `<div class="tl-row"><div class="tl-nm"><b>${esc(D.SUPPLIERS[x.id].name)}</b><small class="dim"><span>Giao đúng hẹn và đủ: ${pct(x.otif)}</span> · <span>${x.n} lần giao</span></small></div></div>`).join('') || '<div class="dim">Chưa có lần giao nào.</div>';
  const bw = E.bullwhip(c.st), roi = bw == null ? '' : `<div class="tl-arr"><span>Hiệu ứng roi da: đơn kho trung tâm dao động gấp ${num(bw)} lần mức dùng thật.</span></div>`;
  return `<div class="dim tl-note">Tính trên ${k.days} ngày gần nhất.</div><div class="tl-kpig">${cards}</div>${roi}<h4>Đồ thị răng cưa</h4>${sawSvg(c)}<h4>Nhà cung cấp</h4>${sup}`;
}
export function fcHtml(c) {
  const { st } = c;
  if (!st.tools.forecast) return '<div class="dim tl-note">🔒 Mở “Dự báo nhu cầu” bằng IP (mục Thành tích) từ ngày 8.</div>';
  const f = forecasts(st), t = f.target;
  const rows = f.rows.map(r => `<tr class="${r.id === f.best ? 'good' : ''}"><td><span>${r.name}</span>${r.id === f.best ? ' ★' : ''}</td><td>${r.next == null ? '—' : Math.round(r.next)}</td><td>${r.err ? num(r.err.mae) : '—'}</td><td>${r.err?.wape == null ? '—' : pct(r.err.wape)}</td><td>${r.err ? (r.err.bias > 0 ? '+' : '') + num(r.err.bias) : '—'}</td></tr>`).join('');
  const me = f.me ? `<tr><td><span>Dự đoán của bạn</span></td><td>—</td><td>${num(f.me.mae)}</td><td>${f.me.wape == null ? '—' : pct(f.me.wape)}</td><td>${(f.me.bias > 0 ? '+' : '') + num(f.me.bias)}</td></tr>` : '';
  const best = f.rows.find(r => r.id === f.best);
  return `<div class="dim tl-note"><span>Số ly dự báo cho buổi ${E.dayLabel(t.day)} S${t.k + 1}.</span> <span>Buổi hụt hàng được bù lại thành số ly lẽ ra bán được.</span></div>
    <table class="tl-t"><thead><tr><th>Cách dự báo</th><th>Ly</th><th>Sai số</th><th>Sai số %</th><th>Lệch</th></tr></thead><tbody>${rows}${me}</tbody></table>
    ${best ? `<div class="tl-arr"><span>Cách đang đúng nhất đoán khoảng ${Math.max(0, Math.round(best.next - 1.28 * 1.25 * best.err.mae))}–${Math.round(best.next + 1.28 * 1.25 * best.err.mae)} ly (khoảng 80%).</span></div>` : '<div class="dim tl-note">Cần thêm vài ngày số liệu để xếp hạng.</div>'}
    <details class="tl-more"><summary>Đọc bảng này thế nào</summary><p>Sai số = trung bình khoảng cách giữa dự báo và thực tế (MAE). Sai số % = tổng sai số chia tổng thực tế. Lệch dương là hay đoán cao, âm là hay đoán thấp. Máy không biết trước lịch: lễ, Tết, đợt rét. Bạn đọc Lịch và Thư rồi chỉnh thì có thể thắng máy.</p></details>`;
}
const ABC_TIP = { A: 'Giá trị lớn: canh kỹ, đặt luật riêng, xem lại thường xuyên.', B: 'Giá trị vừa: dùng luật tự động, thỉnh thoảng xem lại.', C: 'Giá trị nhỏ: đặt lô lớn, ít lần, giữ dư một chút.' };
const XYZ_TIP = { X: 'Dùng đều: dự phòng ít.', Y: 'Dao động vừa: xem theo thứ trong tuần.', Z: 'Thất thường: dự phòng nhiều, hoặc đặt sát nếu là hàng tươi.' };
export function abcHtml(c) {
  const { st, A } = c;
  if (!st.tools.abc) return '<div class="dim tl-note">🔒 Mở “Phân loại ABC–XYZ” bằng IP (mục Thành tích) từ ngày 10.</div>';
  const r = abcxyz(st); if (!r) return '<div class="dim">Cần ít nhất 5 ngày số liệu.</div>';
  const rows = r.rows.map(x => `<div class="tl-row"><span class="tl-ico">${A.ingIc(x.g, 22)}</span><div class="tl-nm"><b><span class="tl-cls ${x.abc}">${x.abc}${x.xyz}</span> <span>${esc(D.ING[x.g].name)}</span></b><small class="dim"><span>${pct(x.share)} giá trị dùng</span> · <span>biến động ${num(x.cv, 2)}</span></small><small class="dim"><span>${ABC_TIP[x.abc]}</span> <span>${XYZ_TIP[x.xyz]}</span></small></div></div>`).join('');
  return `<div class="dim tl-note"><span>Theo ${r.days} ngày gần nhất.</span> <span>A = nhóm chiếm 80% giá trị dùng, B = 15% kế, C = còn lại. X / Y / Z = đều / vừa / thất thường.</span></div>${rows}`;
}

// ---------- đợt 3: sơ chế theo mẻ, điểm nghẽn, hợp đồng, kho trung tâm ----------
const pin = (g, k, label, v, auto) => `<label><span>${label}</span> <input class="tl-num" data-p3="prep" data-g="${g}" data-k="${k}" type="text" inputmode="numeric" value="${v >= 0 ? v : ''}" placeholder="${auto}"></label>`;
export function prepSecHtml(s) {
  const rows = E.prepItems(s).map(g => {
    const p = E.prepPlan(s, g), P = D.PREP[g];
    return `<div class="tl-pol on"><div class="tl-polh"><span class="tl-ico">${ART.ic(PIC[g], 30)}</span><div class="tl-nm"><b>${P.name}</b><small class="dim"><span>Chín sau ${P.min} phút.</span> <span>Kho nguyên liệu thô: ${E.stockOf(s, g)}</span> · <span>buổi cùng giờ dùng khoảng ${p.est}</span></small></div></div>
      <div class="tl-polf">${pin(g, 'first', 'Nấu sẵn', p.set.first, p.first)}${pin(g, 'batch', 'Cỡ mẻ', p.set.batch, p.batch)}${pin(g, 'at', 'Nấu thêm khi còn', p.set.at, p.at)}</div></div>`;
  }).join('');
  return `${ART.illus('batch')}<div class="dim tl-note">Phần đã nấu chỉ ngon trong buổi đó: <b>dư thì đổ, thiếu thì mất khách</b>. Ô để trống là tự tính (số mờ). “Nấu thêm khi còn” = 0 thì không tự nấu, bạn bấm tay khi đang bán.</div>${rows}
    <details class="tl-more"><summary>Cách chọn số</summary><p>Đây là bài toán người bán báo: thiếu một phần mất cả tiền lãi một ly, dư một phần chỉ mất tiền nguyên liệu, nên nên nấu hơi dư hơn mức trung bình. Mẻ nhỏ đỡ đổ đi nhưng mỗi lần nấu lấy công của quầy pha.</p></details>`;
}
export function cookHtml(s, S) {
  if (!S?.prep) return '';
  return `<div class="tl-cook">${Object.entries(S.prep).map(([g, p]) => {
    const next = p.cooking.length ? Math.max(1, Math.min(...p.cooking.map(b => b.at)) - S.tick) : 0, ready = E.readyQty(S, g);
    return `<div class="tl-sc ${ready <= 0 ? 'out' : ready <= p.plan.at ? 'low' : 'ok'}">${ART.ic(PIC[g], 24)}<b>${ready}</b><small>${D.PREP[g].name}</small><i>${next ? `<span>đang nấu ${E.cookingQty(S, g)}, còn ${next} phút</span>` : `<span>sẵn dùng</span>`}</i><button class="btn" data-a="cook" data-v="${g}"><span>Nấu thêm ${p.plan.batch}</span> <small>1 AP</small></button></div>`;
  }).join('')}</div>`;
}
const STN = { cash: 'Thu ngân', bar: 'Pha chế', pack: 'Đóng gói', ship: 'Giao hàng' };
export function roleSelect(s, m) {
  if (!E.isV3(s)) return '';
  const v = s.assign?.[m.id] || '', opts = [['', 'Tự xếp'], ['cash', STN.cash], ['bar', STN.bar], ['pack', STN.pack], ...(s.stage >= 3 && s.equip.truck ? [['ship', STN.ship]] : [])];
  return `<select data-p3="role" data-id="${m.id}" aria-label="Trạm">${opts.map(([k, n]) => `<option value="${k}" ${v === k ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
}
export function utilHtml(r) {
  const extra = (r.waste ? `<div class="tl-dg warn"><span>Đổ đi phần nấu dư: ${kfmt(r.waste)}</span></div>` : '') + (r.notReady ? `<div class="tl-dg warn"><span>${r.notReady} khách bỏ đi vì món chưa kịp nấu.</span></div>` : '');
  const u = Object.entries(r.util || {}); if (!u.length) return extra;
  const lw = Object.entries(r.lwBy || {}), top = lw.length ? lw.reduce((a, b) => (b[1] > a[1] ? b : a)) : u.reduce((a, b) => (b[1] > a[1] ? b : a)), neck = lw.length ? top[1] >= 5 : top[1] >= 0.7;
  return `${extra}<h4>Công suất các trạm</h4>${u.map(([k, v]) => `<div class="tl-util ${v >= 0.85 ? 'hot' : ''}"><span>${ART.ic(SIC[k], 18)} <span>${STN[k]}</span></span><div class="tl-bar"><i style="width:${Math.min(100, Math.round(100 * v))}%"></i></div><b>${pct(v)}</b></div>`).join('')}
    <div class="dim tl-note"><span>Phần trăm là trung bình cả buổi: giờ cao điểm có thể quá tải dù trung bình thấp.</span> ${neck ? `<span>Điểm nghẽn: ${STN[top[0]]}.</span>${lw.length ? ` <span>${top[1]} khách bỏ đi khi hàng chờ dài nhất ở đây.</span>` : ''} <span>Thêm người hoặc chuyển người sang trạm này; tăng trạm khác không giúp gì.</span>` : '<span>Chưa trạm nào là điểm nghẽn rõ rệt.</span>'}</div>`;
}
export function contractHtml(s) {
  const list = (s.contracts || []).map(x => `<div class="tl-row"><div class="tl-nm"><b><span>${esc(D.ING[x.g].name)}</span> · ${x.sup}</b><small class="dim"><span>Tuần này đã mua ${x.got}/${x.week} phần.</span> <span>Hết hạn ${E.dayLabel(x.end)}</span></small></div><button class="btn" data-a="cbreak" data-v="${x.g}"><span>Huỷ</span> <small>${kfmt(E.breakFee(s, x))}</small></button></div>`).join('');
  const free = (s.contracts || []).length < D.CONTRACT.max;
  const gs = ingsInUse(s).filter(g => !(s.contracts || []).some(x => x.g === g));
  const form = free && gs.length ? `<div class="tl-step wrapx"><select id="tlCg" aria-label="Nguyên liệu">${gs.map(g => `<option value="${g}">${esc(D.ING[g].name)} · ${E.contractQty(s, g)}</option>`).join('')}</select><select id="tlCs" aria-label="Nhà cung cấp"><option value="A">A</option><option value="B">B</option></select><button class="btn primary" data-a="csign">Ký hợp đồng</button></div>` : '';
  return `${ART.illus('deal')}<div class="dim tl-note">Cam kết mua đủ số phần ghi cạnh tên <b>mỗi tuần</b>, suốt ${D.CONTRACT.days} ngày. Được giảm ${D.CONTRACT.disc * 100}%, giao đủ và đúng hẹn hơn. Mua thiếu phải bù ${D.CONTRACT.penalty * 100}% giá phần còn thiếu.</div>${list}${form}`;
}
export function hubHtml(s) {
  const h = s.hub, on = !!h?.on, bw = E.bullwhip(s);
  const stock = on ? D.ING_ORDER.filter(g => D.zoneOf(g) === 'dry').map(g => [g, h.lots[g].reduce((a, l) => a + l.q, 0)]).filter(([, q]) => q).map(([g, q]) => `<span class="tl-pill">${esc(D.ING[g].name)}: ${q}</span>`).join('') : '';
  return `${ART.illus('hub')}<div class="dim tl-note">Kho trung tâm trữ <b>hàng khô</b> cho cả hai chi nhánh, mua rẻ hơn ${D.HUB.disc * 100}% nhưng tốn ${kfmt(D.HUB.fee)} mỗi ngày và chờ ${D.HUB.lead} buổi. Chi nhánh xin hàng theo luật đặt hàng tự động: nguyên liệu chưa có luật thì không đi qua kho này.</div>
    <div class="tl-sups"><button class="chip ${on ? 'on' : ''}" data-a="hub" data-v="on">${on ? '☑' : '☐'} Dùng kho trung tâm</button>${on ? `<button class="chip ${h.share ? 'on' : ''}" data-a="hub" data-v="share">${h.share ? '☑' : '☐'} Chia sẻ dữ liệu bán</button>` : ''}</div>
    ${on ? `<div class="tl-stki">${stock || '<span class="dim">Kho trống.</span>'}</div>` : ''}
    ${bw != null ? `<div class="tl-arr"><span>Hiệu ứng roi da: đơn kho trung tâm dao động gấp ${num(bw)} lần mức dùng thật.</span></div>` : ''}`;
}

// ---------- phân tích sau mùa: quyết định tốn tiền nhất ----------
const WAIT = { bar: 'quầy pha', pack: 'bàn đóng gói', cash: 'quầy thu ngân', ship: 'giao hàng' };
const low = g => D.ING[g].name.toLowerCase();
// [biểu tượng, tên quyết định, chuyện đã xảy ra, lần sau làm gì]
function describe(st, key, x) {
  const [kind, id] = key.split(':'), u = Math.round(x.u);
  if (kind === 'stock') return ['soldout', `Đặt thiếu ${low(id)}`, `${u} khách bỏ đi vì kho hết hàng.`, st.rules >= 2 ? 'Đặt luật tự động với điểm đặt lại s cao hơn, nhất là trước ngày đông khách.' : 'Đặt dư thêm một buổi, nhất là trước ngày đông khách.'];
  if (kind === 'notready') return ['prepPot', `Nấu thiếu ${D.PREP[id].name.toLowerCase()}`, `${u} khách bỏ đi vì món chưa kịp nấu dù kho còn nguyên liệu.`, 'Tăng số nấu sẵn hoặc ngưỡng nấu thêm.'];
  if (kind === 'prep') return ['cupSpill', `Nấu dư ${D.PREP[id].name.toLowerCase()}`, `${u} phần đã nấu phải đổ đi.`, 'Giảm cỡ mẻ và ngưỡng nấu thêm, nhất là cuối buổi.'];
  if (kind === 'spoil') return ['cupSpill', `Trữ quá nhiều ${low(id)}`, `${u} phần hết hạn trong kho.`, 'Mỗi lần đặt ít hơn, đặt thường hơn.'];
  if (kind === 'wait') return ['hourglass', `Để nghẽn ở ${WAIT[id]}`, `${u} khách bỏ đi vì chờ quá lâu.`, st.stage < 2 ? 'Nghỉ giải lao đúng lúc, hoặc tăng giá nhẹ vào giờ đông.' : 'Thêm người hay thiết bị đúng ở chỗ nghẽn này.'];
  if (kind === 'price') return ['priceBoard', id === 'up' ? 'Đặt giá thấp hơn mức nên đặt' : id === 'dn' ? 'Đặt giá cao hơn mức nên đặt' : 'Đặt giá lệch nhau giữa các món', `${u} buổi chơi tay có mức giá khác cho lãi cao hơn.`, 'Dùng “Chạy lại giả định” và thử nghiệm giá để chọn mức giá.'];
  if (kind === 'hold') return ['whouse', 'Giữ tồn kho quá hai ngày dùng', 'Phần tồn vượt quá hai ngày dùng vẫn tính phí giữ mỗi ngày.', 'Đặt lô nhỏ hơn; xem EOQ và số ngày tồn kho.'];
  if (kind === 'fees') return ['truck', 'Đặt vụn nhiều lần', 'Phí giao vượt quá hai đơn mỗi ngày.', 'Gộp đơn cùng nhà cung cấp, đạt mức miễn phí giao.'];
  if (kind === 'express') return ['truck', 'Phải gọi giao khẩn', `${u} lần giao khẩn, giá và phí cao hơn đặt thường.`, 'Đặt trước một buổi dựa trên dự báo.'];
  if (kind === 'contract') return ['contract', 'Cam kết hợp đồng quá cao', 'Trả phí vì mua không đủ lượng đã cam kết.', 'Chỉ cam kết nguyên liệu dùng đều.'];
  if (kind === 'loan') return ['coin', 'Để âm tiền phải vay', 'Trả lãi vay.', 'Giữ tiền mặt dự phòng trước khi nâng cấp hay trữ hàng.'];
  return ['coin', key, '', ''];
}
export function topLosses(st, n = 3) {
  const all = Object.entries(st.loss || {}).sort((a, b) => b[1].amt - a[1].amt);
  return { rows: all.slice(0, n).map(([key, x]) => ({ key, x, d: describe(st, key, x) })), total: all.reduce((a, [, x]) => a + x.amt, 0) };
}
export function lossHtml(c) {
  const { st, A } = c, t = topLosses(st);
  if (!t.rows.length) return '<div class="dim">Chưa ghi được quyết định nào làm mất tiền. Chơi thêm vài ngày rồi xem lại.</div>';
  const done = st.season || st.day > 90;
  const cards = t.rows.map((r, i) => `<div class="tl-loss"><div class="tl-lossh"><b class="n">${i + 1}</b>${A.ic(r.d[0], 28)}<div class="tl-nm"><b>${r.d[1]}</b></div><b class="amt">−${kfmt(r.x.amt)}</b></div>
    <div><span>${r.d[2]}</span></div>${r.x.wd ? `<small class="dim"><span>Ngày nặng nhất: ${E.dayLabel(r.x.wd)}, mất ${kfmt(r.x.worst)}.</span></small>` : ''}<small class="tl-fix"><span>Lần sau:</span> <span>${r.d[3]}</span></small></div>`).join('');
  return `${A.illus('review3')}<div class="dim tl-note"><span>${done ? 'Ba quyết định tốn tiền nhất mùa này.' : 'Tạm tính đến hôm nay: ba quyết định tốn tiền nhất.'}</span> <span>Tính từ ngày ${st.lossFrom || 1}.</span></div>${cards}
    <details class="tl-more"><summary>Cách tính</summary><p>Đây là ước tính. Khách bỏ đi nhân với lãi gộp trung bình một khách. Hàng đổ đi tính theo giá mua. Giá bán so với việc chạy lại đúng buổi đó bằng mức giá khác, chỉ với buổi chơi tay. Các khoản có thể đánh đổi lẫn nhau: giảm hụt hàng thường làm tăng hàng hỏng.</p><p><span>Cộng mọi khoản đã ghi: ${kfmt(t.total)}.</span></p></details>`;
}

// ---------- bấm / đổi trong cửa sổ ----------
export function opsClick(x, c) {
  const { st, G } = c; let b;
  if ((b = x.closest('[data-polbr]'))) { G.polBr = b.dataset.polbr; c.refresh(); return true; }
  if ((b = x.closest('[data-polpay]'))) { st.polPay = b.dataset.polpay; c.save(false); c.refresh(); return true; }
  if ((b = x.closest('[data-saw]'))) { G.sawG = b.dataset.saw; c.refresh(); return true; }
  if ((b = x.closest('[data-polsug]'))) {
    const g = b.dataset.polsug, br = G.polBr === 'B' && st.b2 ? 'B' : 'A', p = E.polOf(st, g, br), s = p && suggest(st, g, br, p.sup, p.T || 2);
    if (s) { const r = E.cmd(st, G.S, { t: 'SET_POLICY', g, br, pol: { ...p, s: s.s, Q: s.Q, S: p.m === 'per' ? s.Sper : s.S } }); if (!r.ok) c.toast(r.reason, 2400); c.save(false); c.refresh(); }
    return true;
  }
  return false;
}
export function opsChange(t, c) {
  if (!t.dataset?.pol) return false;
  const { st, G } = c, g = t.dataset.pol, k = t.dataset.k, br = G.polBr === 'B' && st.b2 ? 'B' : 'A', old = E.polOf(st, g, br);
  let pol;
  if (k === 'm') { // đổi kiểu luật: điền sẵn số gợi ý (hoặc số tạm khi chưa đủ số liệu)
    const sup = old?.sup || 'A', s = suggest(st, g, br, sup, old?.T || 2) || { s: 30, Q: 100, S: 130, Sper: 150 };
    pol = t.value === 'off' ? null : { m: t.value, s: s.s, Q: s.Q, S: t.value === 'per' ? s.Sper : s.S, T: old?.T || 2, sup };
  } else pol = { ...old, [k]: k === 'sup' ? t.value : Math.max(0, Math.floor(+String(t.value).replace(',', '.') || 0)) };
  const r = E.cmd(st, G.S, { t: 'SET_POLICY', g, br, pol }); if (!r.ok) c.toast(r.reason, 2400);
  c.save(false);
  // ô số: không vẽ lại cửa sổ, để chạm sang ô kế bên không bị mất con trỏ / đóng bàn phím
  if (r.ok && k !== 'm' && k !== 'sup') { t.value = E.polOf(st, g, br)?.[k] ?? t.value; return true; }
  c.refresh(); return true;
}
