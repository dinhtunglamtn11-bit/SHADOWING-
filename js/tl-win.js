// TeaLab: các cửa sổ nổi (lịch, thư, thành tích, báo cáo, menu) và máy tính. Mỗi lúc chỉ một cửa sổ; máy tính mở chồng lên ô đang nhập.
import { esc } from './util.js';
import { calcEval, fmt, roundFor, FUNCS } from './tl-calc.js';

const pad = n => String(n).padStart(2, '0');
const wrap = (title, body, extra = '') => `<div class="tl-sheet"><div class="tl-wh"><button class="btn" data-wc>← Đóng</button><b>${title}</b>${extra}</div><div class="tl-wb">${body}</div></div>`;
let _A = null; // gắn khi vẽ cửa sổ thành tích để dùng sao pixel
const star = (n, max = 3) => Array.from({ length: max }, (_, i) => _A ? _A.ic(i < n ? 'star' : 'starE', 14) : `<span class="${i < n ? 'on' : ''}">★</span>`).join('');

// ---------- lịch ----------
const DAY_ICON = { 12: 'sale', 14: 'fog', 51: 'gift', 53: 'warn', 20: 'exam', 77: 'cold', 24: 'tree', 25: 'tree', 31: 'firework', 32: 'firework', 33: 'star', 34: 'star', 36: 'fog', 49: 'warn', 56: 'market', 57: 'market', 58: 'market', 59: 'market', 60: 'market', 63: 'cup', 65: 'lock', 66: 'lock', 67: 'market', 68: 'lantern', 72: 'lantern', 73: 'school', 76: 'heart', 82: 'lantern', 84: 'hot', 90: 'trophy' };
const WEATHER_HID = new Set([14, 36, 84, 49]); // tin thời tiết / kiểm tra bất ngờ chỉ hiện khi tới gần hoặc khi đã có thư
function calHtml(c) {
  const { st, D, E, A } = c, G = c.G; G.calM ??= (E.dayCard(st.day).date.m);
  const m = G.calM, first = D.dayKey(m, 1), len = m === 2 ? 28 : 31, dow0 = E.dayCard(first).dow;
  const mailDays = new Set(st.mails.filter(x => x.ev).map(x => x.day));
  const msFlag = {}; for (const M of D.MILESTONES) (msFlag[M.dl] ||= []).push(M.id);
  let cells = ''; for (let i = 0; i < dow0; i++) cells += '<i class="cd empty"></i>';
  for (let d = 1; d <= len; d++) {
    const dk = D.dayKey(m, d), card = E.dayCard(dk), past = dk < st.day, today = dk === st.day, ic = DAY_ICON[dk], shown = ic && (!WEATHER_HID.has(dk) || dk <= st.day + 5 || mailDays.has(dk)) && (dk <= st.day + 20 || !CAL_FAR.has(dk));
    cells += `<button class="cd ${past ? 'past' : ''} ${today ? 'today' : ''} ${card.holiday ? 'hol' : ''} ${G.calSel === dk ? 'sel' : ''}" data-cd="${dk}"><b>${d}</b>${shown ? A.ic(ic, 14) : ic && WEATHER_HID.has(dk) ? A.ic('eyeOff', 12) : ''}${shown && mailDays.has(dk) && !past ? A.ic('eyeHalf', 10) : ''}${msFlag[dk] ? '<u>★</u>' : ''}</button>`;
  }
  const sel = G.calSel || st.day, detail = dayDetail(c, sel);
  return `<div class="tl-tabs">${[12, 1, 2].map(x => `<button class="chip ${x === m ? 'on' : ''}" data-cm="${x}" title="Tháng ${x}/${x === 12 ? 2026 : 2027}">Tháng ${x}</button>`).join('')}</div>
    <div class="cal-h">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(x => `<i>${x}</i>`).join('')}</div><div class="cal-g">${cells}</div>
    <div class="cal-leg dim"><span>${A.ic('lock', 12)} nhà cung cấp đóng</span><span>${A.ic('star', 12)} lễ / cột mốc</span><span class="hol">ngày lễ lương ×3</span><span>${A.ic('eye', 12)} công khai</span><span>${A.ic('eyeHalf', 12)} đã báo trước</span><span>${A.ic('eyeOff', 12)} ẩn tới khi gần</span></div>${detail}`;
}
const CAL_FAR = new Set([76, 82]); // không báo quá xa (các mốc cuối mùa)
function dayDetail(c, dk) {
  const { st, D, E } = c, card = E.dayCard(dk), dt = card.date, isPast = dk < st.day;
  const wd = D.DOWN[card.dow], note = card.note && (dk <= st.day + 14 || !WEATHER_HID.has(dk)) ? card.note : null;
  const closures = Object.entries(D.SUPPLIERS).filter(([id, s]) => s.stage <= st.stage + 1 && !E.supplierOpenOn(id, dk)).map(([id]) => id);
  let weather = 'Chưa có dự báo (chỉ dự báo 5 ngày tới).';
  if (isPast || dk === st.day) { const T = card.w; weather = `${Math.round(T.tmin)}–${Math.round(T.tmax)}°C · ${D.SKY_NAME[T.sky]}`; }
  else if (dk - st.day <= 5) { const f = E.forecast(dk, 1, st.seed); weather = `dự báo ${Math.round(f.lo)}–${Math.round(f.hi)}°C (±2) · xác suất mưa ${Math.round(f.pRain * 100)}%`; }
  const ms = D.MILESTONES.filter(M => M.dl === dk);
  const hs = card.mult.HS[1] < 0.5 ? 'Học sinh nghỉ Tết.' : card.dow >= 5 ? 'Học sinh nghỉ cuối tuần (một phần).' : '';
  const mails = st.mails.filter(x => x.day === dk && x.ev);
  const ill = note && D.ILL_BY_DAY[dk] ? c.A.illus(D.ILL_BY_DAY[dk]) : '';
  return `<div class="cal-d">${ill}<b>${wd} ${pad(dt.dd)}/${pad(dt.m)} · ngày ${dk}${dk === st.day ? ' (hôm nay)' : ''}</b>
    ${note ? `<div><u>${esc(note[0])}</u>: ${esc(note[1])}</div>` : '<div class="dim">Không có sự kiện công khai.</div>'}
    <div class="dim">${esc(weather)}</div>${hs ? `<div class="dim">${hs}</div>` : ''}
    ${card.wageMul > 1 ? `<div>Lương lễ ×${card.wageMul} nếu mở cửa.</div>` : ''}${card.extra ? '<div>Có buổi S5 (22:00–24:00).</div>' : ''}
    ${closures.length ? `<div class="bad">Nhà cung cấp đóng cửa: ${closures.join(', ')}</div>` : ''}
    ${ms.length ? `<div>Hạn cột mốc: ${ms.map(M => M.id).join(', ')}</div>` : ''}
    ${mails.length ? `<div class="dim">Thư đã báo: ${mails.map(x => esc(x.title)).join('; ')}</div>` : ''}</div>`;
}

// ---------- thư ----------
const KIND = { CLUE: ['mClue', 'Manh mối'], DECISION: ['mDecision', 'Quyết định'], INFO: ['mInfo', 'Thông tin'], REWARD: ['star', 'Thưởng'], SYSTEM: ['mSystem', 'Hệ thống'] };
const SRC = { official: 'chính thức', trusted: 'nguồn tin cậy', rumor: 'tin đồn' };
function mailHtml(c) {
  const { st, A, G, D } = c, CAT = { 'Nhà cung cấp': 'supA', 'Quy định': 'face:IN', 'Đối thủ': 'face:RV', 'Chợ': 'sale', 'Vận hành': 'press', 'Nhân sự': 'staff', 'Thời tiết': 'cold', 'Tài chính': 'coin', 'Khách': 'heart' };
  const icon = m => { const cat = D.EVENT_BY_ID[m.ev]?.cat, k = CAT[cat]; if (k && k.startsWith('face:')) return A.face(k.slice(5), 22); return A.ic(k || KIND[m.kind][0], 18); };
  const srcIc = m => A.ic({ official: 'srcOff', trusted: 'srcTrust', rumor: 'srcRumor' }[m.src] || 'srcOff', 12);
  const list = [...st.mails].reverse(), open = list.filter(m => !(m.kind === 'DECISION' && m.resolved)), done = list.filter(m => m.kind === 'DECISION' && m.resolved);
  const sel = G.mailSel ? st.mails.find(m => m.id === G.mailSel) : null;
  const row = m => `<button class="tl-mail ${m.read ? '' : 'unread'} ${m.kind === 'DECISION' && !m.resolved ? 'urgent' : ''}" data-mail="${m.id}">${icon(m)}<span><b>${esc(m.title)}</b><small class="dim">${m.kind === 'DECISION' && !m.resolved ? A.ic('hourglass', 12) + ' cần quyết · ' : ''}${srcIc(m)} ${KIND[m.kind][1]} · ${SRC[m.src] || ''} · ngày ${m.day}</small></span></button>`;
  const ill = sel ? (D.ILL_BY_EVENT[sel.ev] || (sel.cal ? D.ILL_BY_DAY[sel.day] : '')) : '';
  const detail = sel ? `<div class="tl-md">${ill ? A.illus(ill) : ''}<b>${esc(sel.title)}</b><small class="dim">${KIND[sel.kind][1]} · ${SRC[sel.src] || ''}${sel.auto ? ' · dùng lựa chọn mặc định' : ''}</small><p>${esc(sel.body)}</p>${sel.kind === 'DECISION' ? (sel.resolved ? `<div class="tl-arr">Đã chọn: <b>${esc(sel.choices.find(x => x.id === sel.chosen)?.label || '')}</b></div>` : sel.choices.map((ch, i) => `<button class="btn ${i ? '' : ''}" data-choice="${sel.id}:${ch.id}">${esc(ch.label)}${i === 0 ? ' <small>(mặc định)</small>' : ''}${ch.hint ? `<small class="dim"> · ${esc(ch.hint)}</small>` : ''}</button>`).join('') + `<div class="dim">Quá hạn (hết ngày) hoặc khi đi ngủ, game dùng lựa chọn mặc định.</div>`) : ''}</div>` : '';
  const shown = open.slice(0, 7), more = open.slice(7);
  return `${detail}<div class="tl-ml">${shown.map(row).join('') || '<div class="dim">Chưa có thư.</div>'}${more.length ? `<details><summary>Thư cũ hơn (${more.length})</summary>${more.map(row).join('')}</details>` : ''}${done.length ? `<details><summary>Đã quyết định (${done.length})</summary>${done.map(row).join('')}</details>` : ''}</div>`;
}

// ---------- thành tích ----------
function achHtml(c) {
  const { st, D, E, A, G } = c, rows = E.milestoneRows(st), tot = E.totalStars(st); _A = A;
  const fmtV = (R, v) => (v == null ? '—' : R.M.k ? fmt(Math.round(v / R.M.k)) + 'k' : R.M.unit === '×' ? v.toFixed(2).replace('.', ',') : Math.round(v * 10) / 10 + (R.M.unit && R.M.unit !== '×' && R.M.unit !== 'ngày' ? R.M.unit : ''));
  const thTxt = M => M.th.map(x => (M.dir > 0 ? '≥ ' : '≤ ') + (M.k ? fmt(x) + 'k' : M.unit === '×' ? String(x).replace('.', ',') : x + (M.unit && M.unit !== 'ngày' ? M.unit : ''))).join(' · ');
  const groups = Object.entries(D.MG_NAME).map(([g, name]) => {
    const rs = rows.filter(r => r.M.g === g), s = rs.reduce((a, r) => a + r.stars, 0);
    return `<details class="tl-mg" ${G.mgOpen === g ? 'open' : ''} data-mg="${g}"><summary>${A.ic('grp' + g, 18)}<b>${g}. ${name}</b><span class="stars">${star(Math.min(3, Math.round(s / rs.length)))}</span><small class="dim">${s}/${rs.length * 3}</small></summary>${rs.map(r => `<div class="tl-ms ${r.open ? '' : 'lockd'}"><span class="msn"><b>${r.M.id}</b> ${esc(r.M.name)}</span><span class="stars">${star(r.stars)}</span><small class="dim">${r.open ? `Hạn ngày ${r.M.dl} · hiện ${fmtV(r, r.v)} · ${thTxt(r.M)}` : `Mở từ ngày ${r.M.open}`}${r.closed && !r.stars ? ' · chưa đạt' : ''}</small></div>`).join('')}</details>`;
  }).join('');
  const soon = `<details class="tl-mg"><summary><b>Sắp ra mắt</b></summary>${A.illus('soon')}${A.illus('summer')}${D.SOON.map(([id, n]) => `<div class="tl-ms lockd"><span class="msn"><b>${id}</b> ${esc(n)}</span><small class="dim">${A.ic('lock', 12)} sắp ra mắt</small></div>`).join('')}</details>`;
  const badges = D.BADGES.map(b => `<div class="tl-bd ${st.badges[b.id] ? 'on' : ''}" title="${esc(b.desc)}">${A.ic(st.badges[b.id] ? b.ic : 'lock', 28)}<small>${esc(b.name)}</small></div>`).join('');
  const IPI = { count: 'ipCount', survey: 'ipSurvey', supplier: 'ipSupplier', exp: 'flask', diag: 'ipDiag', shelf: 'ipShelf' };
  const tools = D.IP_TOOLS.map(t => `<div class="tl-row">${A.ic(IPI[t.id] || 'bolt', 22)}<div class="tl-nm"><b>${esc(t.name)}</b><small class="dim">${esc(t.desc)} · mở từ ngày ${t.day}</small></div>${st.tools[t.id] ? '<span class="chip on">Đã có</span>' : `<button class="btn" data-tool="${t.id}" ${st.ip < t.cost || st.day < t.day || (t.need && !st.tools[t.need]) ? 'disabled' : ''}>${t.cost} IP</button>`}</div>`).join('');
  return `<div class="tl-sum"><span>${A.ic('star', 18)} <b>${tot}/${D.MILESTONES.length * 3}</b> sao</span><span>${A.ic('bolt', 18)} <b>${st.ip}</b> IP</span><span>${A.ic('coin', 18)} <b>${st.coins}</b> xu</span></div>
    ${tot >= 10 ? (() => { const ch = E.weeklyOf(st.day), done = (st.weekly || []).filter(w => w.ok).length; return `<div class="tl-arr"><b>🎯 Thử thách tuần ${Math.ceil(st.day / 7)}: ${esc(ch.name)}</b><br>${esc(ch.desc)} Thưởng ${ch.ip} IP + ${ch.xu} xu, chấm cuối tuần (đã đạt ${done}/${(st.weekly || []).length} tuần).</div>`; })() : '<div class="dim tl-note">🔒 Thử thách tuần mở khi có 10 sao.</div>'}
    <div class="tl-unlg">${D.UNLOCKS.map(([n, name, desc, ic]) => `<div class="tl-ul ${tot >= n ? 'on' : ''}">${A.ic(tot >= n ? ic : 'lock', 22)}<span><b>${n}★ · ${esc(name)}</b><small class="dim">${esc(desc)}</small>${n === 30 ? `<span class="tl-sps">${[1, 2, 3, 4, 5].map(i => A.ic('sp' + i, 20)).join('')}</span>` : ''}<i class="tl-bar"><b style="width:${Math.min(100, Math.round(100 * tot / n))}%"></b></i></span></div>`).join('')}</div>
    ${groups}${soon}<h4>Huy hiệu</h4><div class="tl-bds">${badges}</div><h4>Công cụ mua bằng IP</h4>${tools}
    <div class="dim tl-note">Không có cột mốc nào đo biến ẩn. “Chưa đạt” không bị phạt gì; sao đã đạt không bị thu hồi.</div>`;
}

// ---------- báo cáo ----------
function reportHtml(c) {
  const { st, E, D, A, kfmt, G } = c, tab = G.rpTab || 'day';
  const tabs = [['day', 'Ngày'], ['chart', 'Biểu đồ'], ['led', 'Sổ cái'], ['sup', 'Nhà cung cấp'], ['kho', 'Kho'], ['note', 'Sổ giả thuyết'], ['sv', 'Đã lưu']];
  let body = '';
  if (tab === 'day') {
    const rows = st.hist.slice(-7).reverse();
    body = rows.length ? `<table class="tl-t"><thead><tr><th>Ngày</th><th>DT</th><th>Lãi</th><th>Ly</th><th>Bỏ đi</th><th>Hỏng</th></tr></thead><tbody>${rows.map(h => `<tr><td>${h.day}</td><td>${kfmt(h.rev)}</td><td class="${h.profit < 0 ? 'bad' : ''}">${kfmt(h.profit)}</td><td>${h.cups}</td><td>${h.ls + h.lw}</td><td>${kfmt(h.spoil)}</td></tr>`).join('')}</tbody></table><div class="dim tl-note">DT = doanh thu; lãi theo sổ kế toán (trừ giá vốn đã dùng, hao hụt, chi phí cố định, lương). “Bỏ đi” = hết hàng + chờ lâu.</div>` : '<div class="dim">Chưa có báo cáo ngày. Hết ngày đầu tiên báo cáo sẽ hiện ở đây.</div>';
    const reps = (st.dayReps || []).filter(r => r.day === st.day); if (reps.length) body += `<h4>Hôm nay (${E.dayLabel(st.day)})</h4>` + reps.map(r => `<div class="tl-row"><div class="tl-nm"><b>${D.SNAME[r.k]}${r.auto ? ' (tự chạy)' : ''}</b><small class="dim">${r.cups} ly · ${kfmt(r.rev)} · ${r.ls + r.lw} khách bỏ đi</small></div></div>`).join('');
  } else if (tab === 'chart') {
    const h = st.hist.slice(-30);
    if (h.length < 2) body = '<div class="dim">Cần ít nhất 2 ngày số liệu.</div>';
    else { const W = 300, H = 120, mx = Math.max(...h.map(x => x.cash), 1), mn = Math.min(...h.map(x => x.cash), 0), px = i => 8 + i * (W - 16) / (h.length - 1), py = v => H - 8 - (v - mn) / (mx - mn || 1) * (H - 16); const pm = Math.max(...h.map(x => Math.abs(x.profit)), 1);
      body = `<svg viewBox="0 0 ${W} ${H}" class="tl-svg"><polyline fill="none" stroke="#2f7ad1" stroke-width="2" points="${h.map((x, i) => px(i) + ',' + py(x.cash)).join(' ')}"/>${h.map((x, i) => `<rect x="${px(i) - 3}" y="${x.profit >= 0 ? H - 8 - x.profit / pm * 30 : H - 8}" width="6" height="${Math.abs(x.profit) / pm * 30}" fill="${x.profit >= 0 ? '#5fd068' : '#ff5a5f'}" opacity=".75"/>`).join('')}</svg><div class="dim tl-note">Đường xanh dương: tiền mặt (${h.length} ngày gần nhất). Cột: lãi mỗi ngày.</div>`; }
  } else if (tab === 'led') {
    const led = (st.cur?.led || []).slice().reverse();
    body = led.length ? `<table class="tl-t"><tbody>${led.map(([w, a]) => `<tr><td>${esc(w)}</td><td class="${a < 0 ? 'bad' : 'good'}">${a < 0 ? '−' : '+'}${kfmt(Math.abs(a))}</td></tr>`).join('')}</tbody></table>` : '<div class="dim">Chưa có giao dịch trong buổi này.</div>';
  } else if (tab === 'kho') {
    if (!st.tools.shelf) body = '<div class="dim">Mở “Kiểm kê chi tiết lô” bằng IP (mục Thành tích) để xem từng lô: số phần, hạn dùng, chất lượng.</div>';
    else body = D.ING_ORDER.filter(g => st.lots[g].some(l => l.q > 0)).map(g => `<div class="tl-row"><span class="tl-ico">${A.ingIc(g, 22)}</span><div class="tl-nm"><b>${esc(D.ING[g].name)}</b><small class="dim">${st.lots[g].filter(l => l.q > 0).map(l => `${l.q} phần · hết hạn ngày ${l.last + 1 - 0 > st.day ? l.last : l.last} · ${l.qual >= 0.97 ? 'tốt' : l.qual >= 0.88 ? 'ổn' : 'kém'}`).join(' | ')}</small></div></div>`).join('') || '<div class="dim">Kho trống.</div>';
  } else if (tab === 'sv') {
    const sl = c.slots(), sm = h => ({ n: h.length, rev: h.reduce((a, x) => a + x.rev, 0), prof: h.reduce((a, x) => a + x.profit, 0), ls: h.reduce((a, x) => a + x.ls, 0) });
    const cur = sm(st.hist);
    body = `<div class="dim tl-note">Số liệu đã lưu từ Menu. So với lượt hiện tại: ${cur.n} ngày, lãi ${kfmt(cur.prof)}, doanh thu ${kfmt(cur.rev)}.</div>` + (sl.map(x => { const m = sm(x.hist); return `<div class="tl-row"><div class="tl-nm"><b>${esc(x.name)}</b><small class="dim">${m.n} ngày · lãi ${kfmt(m.prof)} (${m.prof >= cur.prof ? '+' : '−'}${kfmt(Math.abs(m.prof - cur.prof))} so với hiện tại) · hụt hàng ${m.ls}</small></div><button class="btn" data-svx="${x.id}">⬇ CSV</button><button class="btn" data-svd="${x.id}">🗑</button></div>`; }).join('') || '<div class="dim">Chưa có số liệu nào được lưu.</div>') + `<div class="row"><button class="btn" data-svx="cur">⬇ Xuất CSV lượt hiện tại</button></div>`;
  } else if (tab === 'note') {
    const ns = (st.notes || []).slice().reverse(), lab = { open: '❓ chưa rõ', yes: '✅ đúng', no: '❌ sai' };
    body = `<div class="dim tl-note">Ghi giả thuyết của bạn (ví dụ “hạ giá trà đào buổi chiều thì lãi tăng”), rồi đánh dấu đúng / sai sau khi kiểm chứng bằng số liệu hoặc thử nghiệm giá.</div><textarea id="tlNote" rows="2" maxlength="240" placeholder="Giả thuyết của tôi…"></textarea><div class="row"><button class="btn primary" data-nadd>＋ Thêm</button></div>` +
      (ns.map(n => `<div class="tl-row"><div class="tl-nm"><b>${esc(n.text)}</b><small class="dim">ngày ${n.day} · ${lab[n.st]}</small></div><button class="btn" data-ns="${n.id}:yes">✅</button><button class="btn" data-ns="${n.id}:no">❌</button><button class="btn" data-ns="${n.id}:open">❓</button><button class="btn" data-nd="${n.id}">🗑</button></div>`).join('') || '<div class="dim">Chưa có giả thuyết nào.</div>');
  } else {
    body = ['A', 'B', 'C', 'D'].filter(id => D.SUPPLIERS[id].stage <= st.stage).map(id => { const log = st.supLog[id].slice(-8); return `<div class="tl-row"><div class="tl-nm"><b>${esc(D.SUPPLIERS[id].name)}</b><small class="dim">${st.tools.supplier ? (log.length ? log.map(([d, s]) => `ngày ${d}: ${s}`).join(' · ') : 'chưa có lần giao nào') : 'Mở nhật ký giao hàng bằng IP (mục Thành tích) từ ngày 4.'}</small></div></div>`; }).join('');
  }
  return `<div class="tl-tabs">${tabs.map(([k, n]) => `<button class="chip ${k === tab ? 'on' : ''}" data-rp="${k}">${n}</button>`).join('')}</div>${body}`;
}

// ---------- menu ----------
function menuHtml(c) {
  const { st, D, G } = c, s = st;
  return `<div class="tl-mn">
    <div class="tl-row"><div class="tl-nm"><b>Đi ngủ</b><small class="dim">Chạy các buổi còn lại theo kế hoạch đứng rồi sang ngày mới (phí 5%).</small></div><button class="btn primary" data-m="sleep" ${s.phase === 'LIVE' ? 'disabled' : ''}>😴 Đi ngủ</button></div>
    <h4>Kế hoạch đứng (khi đi ngủ sớm)</h4>
    <div class="tl-step wrapx">${['S1', 'S2', 'S3', 'S4', 'S5'].map((n, k) => `<button class="btn ${s.autoPlan.open[k] ? 'on' : ''}" data-m="plan" data-k="${k}">${s.autoPlan.open[k] ? '☑' : '☐'} ${n}</button>`).join('')}</div>
    <div class="dim tl-note">Buổi đánh dấu sẽ mở cửa với giá và thực đơn hiện tại; hàng được đặt theo mức dùng 3 ngày gần nhất. Không có buổi nào miễn phí: phí 5% doanh thu và không tính điểm chất lượng.</div>
    <h4>Cài đặt</h4>
    <div class="tl-row"><div class="tl-nm"><b>Tự mở thư khẩn</b><small class="dim">Thư cần quyết định tự bật cửa sổ ở đầu buổi.</small></div><button class="btn ${G.noAutoMail ? '' : 'on'}" data-m="auto">${G.noAutoMail ? '☐ Tắt' : '☑ Bật'}</button></div>
    <div class="tl-row"><div class="tl-nm"><b>Tên món tiếng Trung</b><small class="dim">Hiện chữ Hán và pinyin cạnh tên món và nguyên liệu (không ảnh hưởng cơ chế).</small></div><button class="btn ${G.profile?.zh ? 'on' : ''}" data-m="zh">${G.profile?.zh ? '☑ Bật' : '☐ Tắt'}</button></div>
    <div class="row"><button class="btn" data-m="savedata">💾 Lưu số liệu hiện tại</button></div>
    <div class="dim tl-note">Lưu lại sổ ngày (doanh thu, lãi, hụt hàng…) để xem lại và so sánh lượt chơi, xem ở Báo cáo → Đã lưu. Không lưu bản chơi.</div>
    <div class="dim tl-note">Nhạc riêng của game: ⚙ Cài đặt → Nhạc nền → “Nhạc TeaLab”.</div>
    <h4>Sao lưu</h4>
    <div class="row"><button class="btn" data-m="export">⬇ Xuất bản lưu</button><label class="btn">⬆ Nhập bản lưu<input type="file" accept="application/json" data-m="import" hidden></label></div>
    <h4>Chơi lại</h4>
    <div class="row"><select id="tlDiff">${Object.entries(D.DIFFS).map(([k, n]) => `<option value="${k}" ${s.diff === k ? 'selected' : ''}>${n}</option>`).join('')}</select><button class="btn" data-m="again">↻ Chơi lại từ 01/12/2026</button></div>
    <div class="dim tl-note">Nhàn: AP ×1,5, manh mối đáng tin hơn, sự kiện nhẹ hơn. Khó: AP ×0,75, sự kiện nặng hơn. Sao đã đạt và huy hiệu giữ trong hồ sơ.</div>
    <h4>Cách chơi nhanh</h4>
    <div class="dim tl-note">1) Mỗi buổi: <b>Chuẩn bị</b> (giá, đặt hàng, dự đoán) → <b>Mở cửa</b> (đồng hồ chạy, có lệnh tốn AP) → <b>Xem lại</b> (báo cáo, chẩn đoán, đặt hàng). 2) Hàng tươi hỏng nhanh, hàng khô để lâu; thiếu MỘT nguyên liệu là cả món hết. 3) Khách vượt ngưỡng giá sẽ bỏ đi hẳn. 4) Đọc <b>Thư</b> và <b>Lịch</b> trước các ngày lễ và Tết (nhà cung cấp đóng cửa). 5) Máy tính giúp tính lãi, lượng đặt, khoảng tin cậy.</div>
  </div>`;
}

// ---------- chẩn đoán cuối buổi ----------
export function diagnose(c, r) {
  const { E, D, A, kfmt } = c, out = [], s = c.st, ing = D.ING;
  const top = Object.entries(r.stockout || {}).sort((a, b) => b[1] - a[1])[0];
  if (r.ls > 0) out.push({ c: 'bad', t: `Hết hàng: ${r.ls} khách bỏ đi, nhiều nhất do thiếu <b>${esc(ing[top[0]].name.toLowerCase())}</b> (${top[1]}). Một nguyên liệu hết là cả món hết.` });
  const pk = r.perSlot.map((x, j) => [x.lw, j]).sort((a, b) => b[0] - a[0])[0];
  if (r.lw > 0) out.push({ c: 'warn', t: `Chờ lâu: ${r.lw} khách bỏ đi vì hàng đợi, nặng nhất khoảng ${pad(D.SSTART[r.k] + Math.floor(pk[1] / 2))}:${pk[1] % 2 ? '30' : '00'}. Hàng đợi dài làm giảm danh tiếng.` });
  if (r.over > 0 && r.over >= r.buyers * 0.2) out.push({ c: 'warn', t: `${r.over} khách thấy giá vượt mức họ chấp nhận (không mua gì). Nếu nhiều, thử hạ giá món đắt nhất.` });
  const by = Object.entries(r.by || {}).sort((a, b) => b[1] - a[1]);
  if (by.length) { const [it, q] = by[0], I = D.ITEMS[it]; out.push({ t: `Bán chạy nhất: <b>${esc(I.name)}</b> (${q} ly), lãi ${c.k1((s.prices[it] * 1000) - E.unitCost(s, it))} mỗi ly.` }); }
  if (r.errs) out.push({ c: 'warn', t: `Sức khỏe thấp làm ${r.errs} ly pha sai. Dùng “Nghỉ giải lao” khi sức xuống dưới 30.` });
  const near = D.ING_ORDER.filter(g => D.ING[g].grp === 'fresh' && E.lotsNear(s, g, s.day) > 5);
  if (near.length) out.push({ c: 'warn', t: `Sắp hết hạn: ${near.map(g => `${esc(ing[g].name.toLowerCase())} (${E.lotsNear(s, g, s.day)})`).join(', ')}. Dùng hết hoặc chịu hao.` });
  if (!out.length) out.push({ c: 'good', t: 'Buổi chạy khá trơn: ít khách bỏ đi, tồn kho ổn.' });
  if (r.sat) out.push({ t: `Độ hài lòng trung bình ${Math.round(r.sat * 100)}%${r.comments.length ? ` · khách nói: ${r.comments.slice(0, 2).map(esc).join(' ')}` : ''}` });
  return out.slice(0, 7);
}
export function whatIfHtml(c) {
  const G = c.G, s = c.st, S = G.lastS;
  if (!S || !S.snap) return '<div class="dim">Chỉ chạy lại được buổi vừa chơi trong phiên này.</div>';
  const base = { net: s.lastReport.rev - s.lastReport.cogs, cups: s.lastReport.cups };
  const w = G.wi || {};
  return `<div class="dim tl-note">Chạy lại CHÍNH buổi này (cùng khách, cùng may rủi) với giá khác. Lãi gộp thực tế: <b>${c.kfmt(base.net)}</b>.</div><div class="row"><button class="btn" data-a="wi" data-v="ref">Giá tham chiếu</button><button class="btn" data-a="wi" data-v="up">Giá +10%</button><button class="btn" data-a="wi" data-v="down">Giá −10%</button></div>${Object.entries(w).map(([k, r]) => `<div class="tl-arr">${{ ref: 'Giá tham chiếu', up: 'Giá +10%', down: 'Giá −10%' }[k]}: lãi gộp <b>${c.kfmt(r.net)}</b> (${r.net >= base.net ? '+' : '−'}${c.kfmt(Math.abs(r.net - base.net))}), ${r.cups} ly, ${r.ls + r.lw} khách bỏ đi. ${r.net > base.net * 1.02 ? 'Tốt hơn: có thể là kỹ năng định giá.' : r.net < base.net * 0.98 ? 'Kém hơn.' : 'Gần như nhau.'}</div>`).join('')}`;
}
export function runWhatIf(c, kind) {
  const G = c.G, S = G.lastS; if (!S || !S.snap) return;
  const f = { ref: (it, p) => c.D.ITEMS[it].p, up: (it, p) => p * 1.1, down: (it, p) => p * 0.9 }[kind];
  (G.wi ||= {})[kind] = c.E.whatIf(S, f);
}
export const afterDay = () => {};

// ---------- khung cửa sổ ----------
export function render(name, c) {
  switch (name) {
    case 'calendar': return wrap('📅 Lịch', calHtml(c));
    case 'mail': return wrap('✉ Hộp thư', mailHtml(c));
    case 'ach': return wrap('⭐ Thành tích', achHtml(c));
    case 'report': return wrap('📊 Báo cáo', reportHtml(c));
    case 'menu': return wrap('☰ Menu', menuHtml(c));
    default: return wrap('', '');
  }
}
export function bind(name, box, c) {
  if (box._b) return; box._b = 1; // chỉ đăng ký một lần (nội dung cửa sổ được vẽ lại nhiều lần)
  const G = c.G, E = c.E;
  box.addEventListener('click', e => {
    const st = c.st; // trạng thái hiện hành (có thể đã đổi sau khi chơi lại)
    if (e.target.closest('[data-wc]')) { c.closeWin(); return; }
    const x = e.target;
    let b;
    if ((b = x.closest('[data-cm]'))) { G.calM = +b.dataset.cm; c.refresh(); return; }
    if ((b = x.closest('[data-cd]'))) { G.calSel = +b.dataset.cd; c.refresh(); return; }
    if ((b = x.closest('[data-mail]'))) { const m = st.mails.find(q => q.id === +b.dataset.mail); if (m) { m.read = true; G.mailSel = m.id; } c.refresh(); return; }
    if ((b = x.closest('[data-choice]'))) { const [id, ch] = b.dataset.choice.split(':'); const r = E.cmd(st, G.S, { t: 'CHOOSE', mail: +id, choice: ch }); if (!r.ok) c.toast(r.reason, 2200); else c.toast('Đã chọn: ' + r.label, 1600); c.save(false); c.refresh(); return; }
    if ((b = x.closest('[data-mg]'))) { /* mở / đóng nhóm */ }
    if ((b = x.closest('[data-tool]'))) { const t = c.D.IP_TOOLS.find(q => q.id === b.dataset.tool); const r = E.cmd(st, G.S, { t: 'TOOL', tool: t }); if (!r.ok) c.toast(r.reason, 2200); else c.toast('Đã mở: ' + t.name, 1600); c.save(false); c.refresh(); return; }
    if ((b = x.closest('[data-rp]'))) { G.rpTab = b.dataset.rp; c.refresh(); return; }
    if ((b = x.closest('[data-svx]'))) { const hist = b.dataset.svx === 'cur' ? st.hist : (c.slots().find(q => q.id === +b.dataset.svx) || {}).hist || []; const csv = 'ngay,doanh_thu,gia_von,hang_hong,co_dinh,luong,lai,ly,het_hang,cho_lau,uy_tin,tien\n' + hist.map(h => [h.day, h.rev, h.cogs, h.spoil, h.fixed, h.wage, h.profit, h.cups, h.ls, h.lw, h.rep, h.cash].join(',')).join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'tealab-so-lieu.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); return; }
    if ((b = x.closest('[data-svd]'))) { c.delSlot(+b.dataset.svd); c.refresh(); return; }
    if (x.closest('[data-nadd]')) { const t = box.querySelector('#tlNote').value.trim(); if (t) { (st.notes ||= []).push({ id: Date.now() % 1e9, day: st.day, text: t, st: 'open' }); c.save(false); c.refresh(); } return; }
    if ((b = x.closest('[data-ns]'))) { const [id, v] = b.dataset.ns.split(':'), n = st.notes.find(q => q.id === +id); if (n) { n.st = v; c.save(false); c.refresh(); } return; }
    if ((b = x.closest('[data-nd]'))) { st.notes = st.notes.filter(q => q.id !== +b.dataset.nd); c.save(false); c.refresh(); return; }
    if ((b = x.closest('[data-m]'))) menuAct(b, c);
  });
  box.addEventListener('change', e => { const t = e.target; if (t.matches?.('input[type=file][data-m="import"]')) importSave(t, c); });
}
function menuAct(b, c) {
  const { G, st } = c, m = b.dataset.m;
  if (m === 'sleep') { if (confirm('Đi ngủ ngay? Các buổi còn lại chạy theo kế hoạch đứng (phí tự trông tiệm 5% doanh thu, không tính điểm chất lượng).')) { c.closeWin(); c.sleep(); } }
  else if (m === 'plan') { st.autoPlan.open[+b.dataset.k] = st.autoPlan.open[+b.dataset.k] ? 0 : 1; c.save(false); c.refresh(); }
  else if (m === 'auto') { G.noAutoMail = !G.noAutoMail; c.refresh(); }
  else if (m === 'zh') { G.profile.zh = !G.profile.zh; c.save(false); c.refresh(); }
  else if (m === 'savedata') { const x = c.saveData(); c.toast(`Đã lưu số liệu “${x.name}” (${x.hist.length} ngày)`, 2200); c.refresh(); }
  else if (m === 'export') { const blob = new Blob([localStorage.getItem('tealab:v1') || '{}'], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'tealab-' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  else if (m === 'again') { if (confirm('Chơi lại từ 01/12/2026? Sao đã đạt vẫn được ghi nhận trong hồ sơ.')) { const d = document.getElementById('tlDiff')?.value || 'chuan'; c.closeWin(); c.newGame(d); } }
}
function importSave(inp, c) {
  const f = inp.files[0]; if (!f) return;
  f.text().then(t => { try { const o = JSON.parse(t); if (!o || o.v !== 1 || !o.st) throw new Error('Tệp không đúng định dạng'); localStorage.setItem('tealab:v1', t); location.reload(); } catch (e) { c.toast('Không nhập được: ' + e.message, 3000); } });
}

// ---------- máy tính ----------
const KEYS = [['MC', 'MR', 'M+', 'M−', 'ANS'], ['C', 'CE', '⌫', '±', '%'], ['7', '8', '9', '÷', '('], ['4', '5', '6', '×', ')'], ['1', '2', '3', '−', '^'], ['0', ',', '=', '+', '√']];
const FA = [['x²', '^2'], ['1/x', '1÷('], ['|x|', 'ABS('], ['ln', 'LN('], ['eˣ', 'EXP('], ['ROUND', 'ROUND('], ['CEIL', 'CEIL('], ['FLOOR', 'FLOOR('], ['SUM', 'SUM('], ['AVG', 'AVG('], ['MIN', 'MIN('], ['MAX', 'MAX('], ['SD', 'SD('], ['COUNT', 'COUNT('], ['Δ%', 'Δ%('], ['MG', 'MG('], ['MGP', 'MGP(']];
const FB = [['NORM', 'NORM('], ['NORMINV', 'NORMINV('], ['CR', 'CR('], ['NV', 'NV('], ['BE', 'BE('], ['ROP', 'ROP('], ['CI', 'CI(']];
function dataVars(c) { // biến công khai (mục 17.4), chốt giá trị lúc chèn
  const { st, D, E } = c, v = [['TIEN', st.cash / 1000, 'Tiền mặt (k)'], ['R', st.rep, 'Danh tiếng R'], ['L', st.loyal, 'Khách quen L'], ['CPCD', D.PARAMS.fixedDay[st.stage] / 1000, 'Chi phí cố định/ngày (k)']];
  for (const i of D.ITEM_ORDER.filter(i => D.ITEMS[i].stage <= st.stage)) { v.push(['GIA ' + D.ITEMS[i].name, st.prices[i], 'Giá bán (k)']); v.push(['VON ' + D.ITEMS[i].name, Math.round(E.unitCost(st, i) / 100) / 10, 'Giá vốn một ly (k)']); }
  const h = st.hist.slice(-7); if (h.length) { v.push(['LY7', h.reduce((a, x) => a + x.cups, 0) / h.length, 'Số ly TB/ngày (7 ngày)']); v.push(['DT7', h.reduce((a, x) => a + x.rev, 0) / h.length / 1000, 'Doanh thu TB/ngày (k)']); v.push(['LAI7', h.reduce((a, x) => a + x.profit, 0) / h.length / 1000, 'Lãi TB/ngày (k)']); }
  if (h.length >= 7) { const per = st.hist.slice(-7).map(x => x.cups / Math.max(1, x.n || 4)), m = per.reduce((a, b) => a + b, 0) / per.length; v.push(['SDLY7', Math.sqrt(per.reduce((a, b) => a + (b - m) ** 2, 0) / 6), 'Độ lệch chuẩn số ly/buổi (7 ngày)']); }
  for (const g of D.ING_ORDER.filter(g => st.lots[g].length)) v.push(['TON ' + D.ING[g].name, E.stockOf(st, g), 'Số phần trong kho']);
  return v;
}
export function calcHtml(c) {
  const G = c.G, mem = G.calcMem || 0, tape = (G.calcTape || []).slice(-50).reverse(), vars = dataVars(c), B = c.st.day >= 5;
  return `<div class="tl-calcb"><div class="tl-wh"><button class="btn" data-cc>← Đóng</button><b>🧮 Máy tính</b><span class="dim">${mem ? 'M=' + fmt(mem) : ''}</span></div>
    <input id="tcIn" type="text" inputmode="none" spellcheck="false" autocomplete="off" value="${esc(G.calcExpr || '')}" placeholder="Nhập biểu thức, ví dụ 28 − 11,5"><div id="tcOut" class="tc-out"></div>
    <div class="tc-keys">${KEYS.map(r => r.map(k => `<button class="btn tc-k ${'÷×−+^='.includes(k) ? 'op' : ''} ${k === '=' ? 'eq' : ''}" data-k="${k}">${k}</button>`).join('')).join('')}</div>
    <div class="tc-fn">${FA.map(([n, t]) => `<button class="btn" data-ins="${esc(t)}">${n}</button>`).join('')}</div>
    <div class="tc-fn ${B ? '' : 'lock'}">${B ? FB.map(([n, t]) => `<button class="btn" data-ins="${esc(t)}">${n}</button>`).join('') : '<span class="dim">Hàm phân tích (NORM, NV, CI…) mở từ ngày 5.</span>'}</div>
    <div class="tc-row"><select id="tcData"><option value="">Dữ liệu ▾ (chèn giá trị công khai)</option>${vars.map(([n, val, d], i) => `<option value="${i}">${esc(n)} = ${fmt(+val.toFixed(2))} · ${esc(d)}</option>`).join('')}</select></div>
    <div class="tc-row"><button class="btn primary" data-use="any">↳ Dùng kết quả</button><button class="btn" data-use="price">→ Giá</button><button class="btn" data-use="qty">→ Đặt hàng</button><button class="btn" data-use="fc">→ Dự đoán</button></div>
    <div class="tc-tape"><b>Băng giấy</b> <button class="btn" data-tc="clr">Xóa</button>${tape.map((t, i) => `<button class="tc-t" data-tape="${esc(t[0])}"><span>${esc(t[0])}</span><b>= ${esc(t[1])}</b></button>`).join('') || '<div class="dim">Chưa có phép tính.</div>'}</div></div>`;
}
export function calcBind(box, c) {
  const G = c.G, inp = box.querySelector('#tcIn'), out = box.querySelector('#tcOut'); let vars = dataVars(c);
  const val = () => { const r = calcEval(inp.value); return r; };
  const show = () => { if (!inp.value.trim()) { out.textContent = ''; out.className = 'tc-out'; return; } const r = val(); if (r.ok) { out.textContent = '= ' + fmt(r.value); out.className = 'tc-out ok'; G.calcRes = r.value; } else { out.textContent = r.msg; out.className = 'tc-out err'; if (r.pos != null) { try { inp.setSelectionRange(r.pos, r.pos + 1); } catch { /* bỏ qua */ } } } G.calcExpr = inp.value; };
  const ins = t => { const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a; inp.value = inp.value.slice(0, a) + t + inp.value.slice(b); const p = a + t.length; inp.focus({ preventScroll: true }); inp.setSelectionRange(p, p); show(); };
  const tape = () => { const r = val(); if (!r.ok) { show(); return; } (G.calcTape ||= []).push([inp.value, fmt(r.value)]); if (G.calcTape.length > 50) G.calcTape.shift(); G.calcAns = r.value; G.calcExpr = ''; inp.value = fmt(r.value).replace(/\./g, ''); show(); box.innerHTML = calcHtml(c); calcBind(box, c); box.querySelector('#tcIn').value = fmt(r.value).replace(/\./g, ''); box.querySelector('#tcIn').dispatchEvent(new Event('input')); };
  inp.addEventListener('input', show); inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); tape(); } }); show();
  box._h = e => { // xử lý nhấn nút: gán lại mỗi lần vẽ (đóng kín đúng ô nhập hiện tại), nhưng chỉ đăng ký MỘT lần
    const x = e.target; let b;
    if (x.closest('[data-cc]')) { c.G.calc = false; box.hidden = true; document.getElementById('tlRoot')?.classList.remove('tl-paused'); document.querySelector('#tlTools button[data-w="calc"]')?.classList.remove('on'); return; }
    if ((b = x.closest('[data-k]'))) {
      const k = b.dataset.k;
      if (k === '=') tape(); else if (k === 'C') { inp.value = ''; show(); } else if (k === 'CE') { const m = /[0-9,.]+$/.exec(inp.value); inp.value = m ? inp.value.slice(0, m.index) : inp.value; show(); } else if (k === '⌫') { inp.value = inp.value.slice(0, -1); show(); }
      else if (k === '±') { const r = val(); if (r.ok) { inp.value = fmt(-r.value).replace(/\./g, ''); show(); } else ins('-'); }
      else if (k === 'MC') G.calcMem = 0; else if (k === 'MR') ins(fmt(G.calcMem || 0).replace(/\./g, '')); else if (k === 'M+') { const r = val(); if (r.ok) G.calcMem = (G.calcMem || 0) + r.value; } else if (k === 'M−') { const r = val(); if (r.ok) G.calcMem = (G.calcMem || 0) - r.value; }
      else if (k === 'ANS') ins(fmt(G.calcAns || 0).replace(/\./g, '')); else if (k === '√') ins('√('); else ins(k);
      if (['MC', 'M+', 'M−'].includes(k)) { box.querySelector('.tl-wh .dim').textContent = G.calcMem ? 'M=' + fmt(G.calcMem) : ''; }
      return;
    }
    if ((b = x.closest('[data-ins]'))) { ins(b.dataset.ins); return; }
    if ((b = x.closest('[data-tape]'))) { inp.value = b.dataset.tape; show(); return; }
    if (x.closest('[data-tc="clr"]')) { G.calcTape = []; box.innerHTML = calcHtml(c); calcBind(box, c); return; }
    if ((b = x.closest('[data-use]'))) {
      const r = val(); if (!r.ok) { c.toast('Chưa có kết quả hợp lệ', 1500); return; }
      let t = G.lastInput; if (!t || !t.isConnected) { c.toast('Hãy chạm vào một ô nhập (giá, số lượng, dự đoán) rồi mở máy tính', 2400); return; }
      const want = b.dataset.use; if (want !== 'any' && t.dataset.calc !== want) { c.toast('Ô đang chọn là ô “' + ({ price: 'giá', qty: 'số lượng đặt', fc: 'dự đoán' }[t.dataset.calc] || '?') + '”', 2200); return; }
      t.value = String(roundFor(t.dataset.calc, r.value)); t.dispatchEvent(new Event('change', { bubbles: true })); c.toast('Đã điền ' + t.value, 1200); return;
    }
  };
  if (!box._hb) { box._hb = 1; box.addEventListener('click', e => box._h(e)); }
  box.querySelector('#tcData').addEventListener('change', e => { const i = e.target.value; if (i === '') return; const [, v] = vars[+i]; ins(String(Math.round(v * 100) / 100).replace('.', ',')); e.target.value = ''; });
}
