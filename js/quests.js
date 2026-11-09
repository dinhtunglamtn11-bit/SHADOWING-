// Nhiệm vụ: hôm nay / tuần / tháng, bảng thành tựu (huy hiệu) và thống kê thói quen học (giờ Việt Nam).
import { $, esc, bus, toast, vnDate, vnHour, addDays, LANGS } from './util.js';
import * as tracker from './tracker.js';
import { prefs, savePrefs } from './prefs.js';
import { pix, badge } from './pixicons.js';
import * as A from './achieve.js';
import { tr } from './i18n.js';
import * as store from './store.js';
import * as notes from './notes.js';
import { getLang, uid } from './util.js';

let range = 14, tab = 'today';
let active = false;
export const levelOf = A.levelOf;

function streak(m) {
  const goal = (prefs.goalMin || 15) * 60;
  const ok = d => (m.get(d)?.sec || 0) >= goal;
  let d = vnDate(), n = 0;
  if (!ok(d)) d = addDays(d, -1);
  while (ok(d)) { n++; d = addDays(d, -1); }
  return n;
}

export function updateBadge() {
  const m = tracker.byDate(), today = vnDate(), t = m.get(today) || A.blankDay(today);
  const ds = A.dailyFor(today), done = ds.filter(q => A.isDone(q, t)).length;
  $('#qBadge').textContent = `${done}/${ds.length}`;
  $('#qBadge').classList.toggle('full', done === ds.length);
  const fresh = A.newlyUnlocked(A.computeAchievements(m));
  fresh.slice(0, 3).forEach((u, i) => setTimeout(() => toast(`🏅 Thành tựu mới: ${u.def.name} (${A.TIER_NAME[u.tier]})`, 4200), i * 600));
}

// ---------- biểu đồ SVG ----------
function bars(vals, labels, { goal = 0, hiIndex = -1, todayIndex = -1, labelEvery = 1, unit = 'phút' } = {}) {
  const W = 640, H = 190, pl = 30, pr = 6, pt = 12, pb = 22;
  const max = Math.max(goal, ...vals, 1) * 1.15, n = vals.length, bw = (W - pl - pr) / n, ch = H - pt - pb;
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  for (const f of [0, 0.5, 1]) {
    const y = pt + ch * (1 - f), v = Math.round(max / 1.15 * f);
    s += `<line x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}" class="grid"/><text x="${pl - 4}" y="${y + 3}" text-anchor="end">${v}</text>`;
  }
  vals.forEach((v, i) => {
    const h = ch * v / max, x = pl + i * bw + bw * 0.15;
    s += `<rect class="bar ${i === hiIndex ? 'hi' : ''} ${i === todayIndex ? 'today' : ''}" x="${x.toFixed(1)}" y="${(pt + ch - h).toFixed(1)}" width="${(bw * 0.7).toFixed(1)}" height="${Math.max(h, v ? 1 : 0).toFixed(1)}" rx="2"><title>${labels[i]}: ${v} ${unit}</title></rect>`;
    if (i % labelEvery === 0) s += `<text x="${(x + bw * 0.35).toFixed(1)}" y="${H - 6}" text-anchor="middle">${labels[i]}</text>`;
  });
  if (goal) { const y = pt + ch * (1 - goal / max); s += `<line x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}" class="goal"/>`; }
  return s + '</svg>';
}

// ---------- lịch hoạt động: mỗi ô là một ngày, đậm hơn nếu học nhiều phút hơn ----------
function heatmap(m, today, goalMin, WEEKS = 20) {
  const dow =d => (new Date(d + 'T00:00:00Z').getUTCDay() + 6) % 7; // thứ Hai = 0
  const monday = addDays(today, -dow(today)), start = addDays(monday, -7 * (WEEKS - 1));
  let cells = '', months = '', lastMonth = '';
  for (let w = 0; w < WEEKS; w++) {
    const first = addDays(start, w * 7), mo = first.slice(5, 7);
    months += `<span style="grid-column:${w + 1}">${mo !== lastMonth ? mo + '/' : ''}</span>`; lastMonth = mo;
    for (let r = 0; r < 7; r++) {
      const d = addDays(first, r);
      if (d > today) { cells += '<i class="hm fut"></i>'; continue; }
      const min = Math.round((m.get(d)?.sec || 0) / 60);
      const l = !min ? 0 : min < goalMin * 0.5 ? 1 : min < goalMin ? 2 : min < goalMin * 2 ? 3 : 4;
      cells += `<i class="hm l${l}${d === today ? ' today' : ''}" title="${d.slice(8)}/${d.slice(5, 7)}: ${min} phút"></i>`;
    }
  }
  const total = [...m.values()].filter(x => x.date >= start && x.date <= today && x.sec > 0).length;
  return `<div class="heat"><div class="hmo" style="grid-template-columns:repeat(${WEEKS}, 1fr)">${months}</div>
    <div class="hmg" style="grid-template-columns:repeat(${WEEKS}, 1fr)">${cells}</div>
    <div class="hml dim"><span>Ít</span><i class="hm l0"></i><i class="hm l1"></i><i class="hm l2"></i><i class="hm l3"></i><i class="hm l4"></i><span>Nhiều</span><span class="grow"></span><span>${total} ngày có học trong ${WEEKS} tuần</span></div></div>`;
}

const questCard = (q, agg, extra = '') => {
  const v = q.val(agg), p = Math.min(100, Math.round(100 * v / q.goal)), ok = v >= q.goal;
  return `<div class="quest ${ok ? 'done' : ''}"><span class="qi">${ok ? '✅' : q.icon}</span>
    <div class="qb"><b>${esc(q.name)}</b><div class="prog"><i style="width:${p}%"></i></div></div><span class="dim">${q.show(v)}</span>${extra}</div>`;
};

// ---------- từng tab ----------
function todayTab(m, today) {
  const t = m.get(today) || A.blankDay(today), ds = A.dailyFor(today), done = ds.filter(q => A.isDone(q, t)).length, goalMin = prefs.goalMin || 15;
  const langs = LANGS.map(l => [l, Math.ceil((t.l[l.id] || 0) / 60)]).filter(x => x[1] > 0).map(([l, mn]) => `<span class="chip">${l.short} ${mn}′</span>`).join('') || '<span class="dim">Chưa học hôm nay</span>';
  return `<div class="qhead">
      <div><div class="dim">Giờ Việt Nam (UTC+7)</div><h2>Hôm nay ${today.slice(8)}/${today.slice(5, 7)} · ${String(vnHour()).padStart(2, '0')}h</h2></div>
      <div class="streak">🔥 <b>${streak(m)}</b><span class="sl">ngày liên tiếp<br><span class="dim">đạt mục tiêu thời gian</span></span></div>
    </div>
    <div class="dim" style="margin:2px">Mỗi ngày có bộ nhiệm vụ khác nhau (nhiệm vụ thời gian luôn có).</div>
    <div class="quests">${ds.map(q => questCard(q, t)).join('')}</div>
    ${done === ds.length ? '<div class="allDone">🎉 Hoàn thành hết nhiệm vụ hôm nay!</div>' : `<div class="dim" style="margin:6px 2px">Còn ${ds.length - done} nhiệm vụ nữa.</div>`}
    <div class="row" style="margin:10px 0"><span class="dim">Hôm nay theo ngôn ngữ:</span>${langs}</div>
    <div class="row"><label class="dim">Mục tiêu mỗi ngày <input id="goalMin" type="number" min="1" max="600" value="${goalMin}" style="width:64px"> phút</label></div>`;
}

function periodTab(m, today, kind) {
  const week = kind === 'week', start = week ? A.weekStart(today) : A.monthStart(today), end = week ? addDays(start, 6) : A.monthEnd(start);
  const defs = week ? A.weeklyFor(start) : A.monthlyFor(start), agg = A.aggregate(m, start, end < today ? end : today);
  const done = defs.filter(q => A.isDone(q, agg)).length, left = Math.max(0, Math.round((new Date(end + 'T00:00:00Z') - new Date(today + 'T00:00:00Z')) / 864e5));
  const prevStart = week ? addDays(start, -7) : A.monthStart(addDays(start, -1)), prevEnd = week ? addDays(prevStart, 6) : A.monthEnd(prevStart);
  const prevDefs = week ? A.weeklyFor(prevStart) : A.monthlyFor(prevStart), prevAgg = A.aggregate(m, prevStart, prevEnd);
  const prevDone = prevDefs.filter(q => A.isDone(q, prevAgg)).length, reward = week ? A.WEEK_XP : A.MONTH_XP;
  const fmt = d => d.slice(8) + '/' + d.slice(5, 7);
  return `<div class="qhead"><div><div class="dim">${week ? 'Nhiệm vụ tuần' : 'Nhiệm vụ tháng'} · ${fmt(start)} – ${fmt(end)}</div><h2>${week ? 'Tuần này' : 'Tháng này'}</h2></div>
      <div class="streak"><b>${left}</b><span class="sl">ngày còn lại<br><span class="dim">${done}/${defs.length} đã xong</span></span></div></div>
    <div class="dim" style="margin:2px">${week ? `Mỗi nhiệm vụ tuần xong thưởng <b>+${reward} XP</b> vào cấp độ. Bộ nhiệm vụ đổi vào thứ Hai đầu tuần.` : `Mỗi nhiệm vụ tháng xong thưởng <b>+${reward} XP</b> vào cấp độ. Bộ nhiệm vụ đổi vào đầu tháng.`}</div>
    <div class="quests">${defs.map(q => questCard(q, agg, `<span class="rew">+${reward} XP</span>`)).join('')}</div>
    ${done === defs.length ? `<div class="allDone">${week ? '🎉 Hoàn thành hết nhiệm vụ tuần này!' : '🎉 Hoàn thành hết nhiệm vụ tháng này!'}</div>` : ''}
    <div class="dim" style="margin:10px 2px">${week ? 'Tuần trước' : 'Tháng trước'}: hoàn thành ${prevDone}/${prevDefs.length} nhiệm vụ.</div>`;
}

function achTab(m) {
  const res = A.computeAchievements(m), recent = res.list.flatMap(x => x.when.map((w, i) => w && { w, def: x.def, tier: A.TIERS[i] }).filter(Boolean)).sort((a, b) => b.w.localeCompare(a.w)).slice(0, 4);
  const card = x => {
    const tier = x.got ? A.TIERS[x.got - 1] : 'locked', d = x.def, nextTxt = `${Math.floor(x.value)}/${x.next ?? d.tiers[d.tiers.length - 1]} ${d.unit}`;
    const pct = x.next != null ? Math.min(100, Math.round(100 * (x.value - x.prev) / (x.next - x.prev))) : 100;
    const pips = A.TIERS.map((t, i) => `<i class="pip ${t} ${x.when[i] ? 'on' : ''}" title="${tr(A.TIER_NAME[t])}: ${x.when[i] ? x.when[i].slice(8) + '/' + x.when[i].slice(5, 7) + '/' + x.when[i].slice(0, 4) : d.tiers[i] + ' ' + tr(d.unit)}"></i>`).join('');
    return `<div class="ach ${x.got ? 'got' : 'lock'} ${tier}" title="${esc(d.desc)}"><div class="abadge">${badge(tier, d.glyph)}</div><b>${esc(d.name)}</b>
      <small class="dim">${x.got ? A.TIER_NAME[tier] : 'Chưa mở khóa'}</small><div class="prog"><i style="width:${pct}%"></i></div><small class="ainfo">${nextTxt}</small><div class="pips">${pips}</div></div>`;
  };
  return `<div class="qhead"><div><div class="dim">Thành tựu dài hạn</div><h2>Huy hiệu ${res.got}/${res.total}</h2></div>
      <div class="streak">${pix('trophy')}<span class="sl">${res.list.filter(x => x.got === A.TIERS.length).length}<br><span class="dim">huy hiệu huyền thoại</span></span></div></div>
    ${recent.length ? `<div class="row recent"><span class="dim">Mới mở khóa:</span>${recent.map(r => `<span class="chip">${badge(r.tier, r.def.glyph)} ${esc(r.def.name)} · ${A.TIER_NAME[r.tier]}</span>`).join('')}</div>` : '<div class="dim" style="margin:4px 2px">Học đều mỗi ngày để mở khóa huy hiệu Đồng → Bạc → Vàng → Kim cương → Huyền thoại.</div>'}
    <h3>🏆 Thành tựu lớn</h3><div class="dim" style="margin:2px">Cột mốc tổng hợp, mỗi cái có 5 mức. Chỉ có một cách để mở: học đều đặn trong thời gian dài.</div>
    <div class="achs big">${res.list.filter(x => x.def.big).map(card).join('')}</div>
    <h3>Huy hiệu</h3>
    <div class="achs">${res.list.filter(x => !x.def.big).map(card).join('')}</div>`;
}

function statsTab(m, today) {
  const goalMin = prefs.goalMin || 15;
  const days = Array.from({ length: range }, (_, i) => addDays(today, i - range + 1));
  const mins = days.map(d => Math.round((m.get(d)?.sec || 0) / 60)), labels = days.map(d => d.slice(8) + '/' + d.slice(5, 7));
  const week = days.slice(-7).reduce((s, d) => s + (m.get(d)?.sec || 0), 0), total = days.reduce((s, d) => s + (m.get(d)?.sec || 0), 0);
  const activeDays = days.filter(d => (m.get(d)?.sec || 0) > 0).length;
  const hours = Array(24).fill(0);
  for (const d of days) for (const k in (m.get(d)?.h || {})) hours[+k] += m.get(d).h[k];
  const hmin = hours.map(s => Math.round(s / 60)), best = hours.some(x => x > 0) ? hours.indexOf(Math.max(...hours)) : -1;
  return `<div class="tiles">
      <div><b>${Math.round(week / 60)}′</b><span>7 ngày qua</span></div>
      <div><b>${activeDays ? Math.round(total / 60 / activeDays) : 0}′</b><span>TB / ngày có học</span></div>
      <div><b>${activeDays}/${range}</b><span>ngày có học</span></div>
      <div><b>${best >= 0 ? best + 'h' : '–'}</b><span>giờ học nhiều nhất</span></div>
    </div>
    <h3>Lịch hoạt động</h3>
    ${heatmap(m, today, goalMin)}
    <div class="row between"><h3>Thời gian học mỗi ngày (phút)</h3>
      <div class="seg" id="rangeSeg">${[7, 14, 30].map(n => `<button data-r="${n}" class="${range === n ? 'on' : ''}">${n} ngày</button>`).join('')}</div></div>
    ${bars(mins, labels, { goal: goalMin, todayIndex: range - 1, labelEvery: range > 14 ? 5 : range > 7 ? 2 : 1 })}
    <div class="dim" style="margin-top:2px">Đường nét đứt là mục tiêu ${goalMin} phút.</div>
    <h3 style="margin-top:18px">Bạn học vào giờ nào? (giờ Việt Nam)</h3>
    ${bars(hmin, hours.map((_, i) => i + 'h'), { hiIndex: best, labelEvery: 3 })}
    <div class="dim" style="margin-top:2px">${best >= 0 ? `Thường học nhiều nhất lúc ${best}h–${(best + 1) % 24}h (trong ${range} ngày qua).` : 'Chưa có dữ liệu. Học vài buổi là biểu đồ sẽ hiện.'}</div>`;
}

// ---------- nhìn lại tuần ----------
let wkOff = 0; // 0 = tuần này, -1 = tuần trước…
const DOW = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
function reviewTab(m, today) {
  const goalMin = prefs.goalMin || 15, cur = A.weekStart(today), start = addDays(cur, 7 * wkOff), end = addDays(start, 6), upto = end < today ? end : today;
  const a = A.aggregate(m, start, upto), prev = A.aggregate(m, addDays(start, -7), addDays(start, -1));
  const inRange = ms => { const d = vnDate(ms || 0); return d >= start && d <= end; };
  const words = store.list('wwords').filter(w => inRange(w.created)).length + store.list('cards').filter(c => c.type !== 'sentence' && inRange(c.created)).length;
  const wrong = store.list('mistakes').filter(d => inRange(d.last)).sort((x, y) => (y.count || 0) - (x.count || 0)).slice(0, 3);
  const mins = Array.from({ length: 7 }, (_, i) => Math.round((m.get(addDays(start, i))?.sec || 0) / 60));
  const minsTot = Math.round(a.sec / 60), prevMin = Math.round(prev.sec / 60);
  const delta = prevMin ? Math.round(100 * (minsTot - prevMin) / prevMin) : null;
  const bestI = mins.some(x => x > 0) ? mins.indexOf(Math.max(...mins)) : -1;
  // một việc nên làm tuần sau: chọn theo điểm yếu rõ nhất của tuần này
  let tip;
  if (a.days < 3) tip = `Tuần sau thử học ít nhất 4 ngày, mỗi ngày chỉ cần ${goalMin} phút. Đều đặn quan trọng hơn học dồn.`;
  else if (wrong.length && (wrong[0].count || 0) >= 2) tip = 'Ôn lại những câu hay sai ở trên: làm lại đúng 1–2 lần là chúng thôi “quay lại” ngay.';
  else if (a.s < 40) tip = 'Tuần sau shadow nhiều hơn: đặt mục tiêu 10 câu mỗi ngày với một video bạn thích.';
  else if (a.c === 0) tip = 'Tuần này bạn chưa ôn thẻ nào. Tuần sau ôn 10 thẻ mỗi ngày để từ vựng không bị quên.';
  else if (a.n === 0) tip = 'Tuần sau đọc xong ít nhất 2 bài ở Thế giới của tôi để luyện đọc hiểu.';
  else if (delta !== null && delta < -30) tip = 'Thời gian học giảm so với tuần trước. Giữ nhịp bằng cách đặt một khung giờ cố định mỗi ngày.';
  else tip = `Bạn đang học rất đều. Thử nâng mục tiêu mỗi ngày thêm 5 phút (hiện ${goalMin} phút).`;
  const fmt = d => d.slice(8) + '/' + d.slice(5, 7);
  const sunday = wkOff === 0 && today === end;
  const tile = (n, label, extra = '') => `<div><b>${n}</b><span>${label}${extra}</span></div>`;
  return `<div class="qhead"><div><div class="dim">Nhìn lại tuần · ${fmt(start)} – ${fmt(end)}</div><h2>${wkOff === 0 ? 'Tuần này' : wkOff === -1 ? 'Tuần trước' : `${-wkOff} tuần trước`}</h2></div>
      <div class="row"><button class="btn" data-wk="-1">‹ Tuần trước</button><button class="btn" data-wk="1" ${wkOff === 0 ? 'disabled' : ''}>Tuần sau ›</button></div></div>
    ${sunday ? '<div class="allDone">📓 Hôm nay là Chủ nhật: xem lại cả tuần của bạn nhé!</div>' : ''}
    <div class="tiles">
      ${tile(minsTot + '′', 'phút học', delta === null ? '' : ` <small class="dim">(${delta >= 0 ? '+' : ''}${delta}% so với tuần trước)</small>`)}
      ${tile(`${a.days}/7`, 'ngày có học')}
      ${tile(a.s, 'câu shadowing')}
      ${tile(words, 'từ mới')}
      ${tile(a.c, 'lượt ôn thẻ')}
      ${tile(a.q ? `${a.qc}/${a.q}` : '–', 'câu bài tập đúng')}
    </div>
    <h3>Mỗi ngày trong tuần (phút)</h3>
    ${bars(mins, DOW, { goal: goalMin, todayIndex: wkOff === 0 ? (new Date(today + 'T00:00:00Z').getUTCDay() + 6) % 7 : -1, hiIndex: bestI })}
    <div class="dim" style="margin-top:2px"><span>${bestI >= 0 ? `Ngày học nhiều nhất: ${DOW[bestI]} (${mins[bestI]} phút).` : 'Tuần này chưa có dữ liệu học.'}</span> <span>Đường nét đứt là mục tiêu ${goalMin} phút.</span></div>
    <h3>Câu hay sai nhất</h3>
    ${wrong.length ? `<div class="rv-wrong">${wrong.map(d => `<div class="rv-row"><span class="gt grow">${esc(d.label || '')}</span><small class="dim">sai ${d.count || 1} lần</small></div>`).join('')}</div>` : '<div class="dim">Tuần này không ghi nhận câu sai nào.</div>'}
    <h3>Một việc nên làm tuần sau</h3>
    <div class="rv-tip"><span>💡</span> <span>${esc(tip)}</span></div>
    <h3 style="margin-top:18px">Bản đồ nhiệt 12 tuần</h3>
    ${heatmap(m, today, goalMin, 12)}`;
}

// ---------- nhật ký cuối ngày: mỗi ngày một ghi chú theo mẫu câu hỏi, gom thành dòng thời gian ----------
let jqOpen = false; // khung sửa câu hỏi đang mở
const DEFAULT_JQ =['Hôm nay mình học được gì?', 'Điều gì còn khó?', 'Ngày mai mình sẽ làm gì?'];
const jqs = () => (Array.isArray(prefs.journalQs) && prefs.journalQs.length ? prefs.journalQs : DEFAULT_JQ);
const journals = () => store.list('items').filter(i => i.type === 'note' && i.journal).sort((x, y) => y.journal.localeCompare(x.journal));
const fmtDay = d => { const w = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][new Date(d + 'T00:00:00Z').getUTCDay()]; return `${w} ${d.slice(8)}/${d.slice(5, 7)}/${d.slice(0, 4)}`; };
function answersOf(body) { // “## câu hỏi” + câu trả lời bên dưới
  return String(body || '').split(/^## /m).slice(1).map(s => { const [q, ...r] = s.split('\n'); return { q: q.trim(), a: r.join(' ').replace(/\s+/g, ' ').trim() }; });
}
function journalTab(today) {
  const list = journals(), mine = list.find(j => j.journal === today), qs = jqs();
  const entry = j => `<div class="jr" data-jopen="${j.id}" role="button" tabindex="0"><b class="jrd">${fmtDay(j.journal)}</b>
    ${answersOf(j.body).map(x => `<div class="jrq"><small class="dim">${esc(x.q)}</small><div class="gt">${x.a ? esc(x.a.length > 140 ? x.a.slice(0, 140) + '…' : x.a) : '<span class="dim">–</span>'}</div></div>`).join('') || '<div class="dim">Nhật ký trống.</div>'}</div>`;
  return `<div class="qhead"><div><div class="dim">Cuối ngày, viết vài dòng</div><h2>📓 Nhật ký</h2></div>
      <button class="btn primary" data-jnew="1">${mine ? '📖 Mở nhật ký hôm nay' : '✍️ Viết nhật ký hôm nay'}</button></div>
    <details class="jqs" ${jqOpen ? 'open' : ''}><summary>⚙ Câu hỏi của nhật ký (${qs.length})</summary>
      <div class="dim" style="margin:4px 0">Mỗi ngày mới sẽ có các câu hỏi này làm mẫu. Sửa, thêm hoặc xóa tùy ý (nhật ký đã viết giữ nguyên).</div>
      ${qs.map((q, i) => `<div class="row"><input class="jq grow" data-jq="${i}" value="${esc(q)}"><button class="btn" data-jqdel="${i}" title="Xóa câu hỏi này">✕</button></div>`).join('')}
      <div class="row"><button class="btn" data-jqadd="1">＋ Thêm câu hỏi</button><button class="btn" data-jqreset="1">↺ Về mặc định</button></div></details>
    <h3>Dòng thời gian</h3>
    ${list.length ? `<div class="jtl">${list.map(entry).join('')}</div>` : '<div class="empty">Chưa có nhật ký nào. Bấm “Viết nhật ký hôm nay” để bắt đầu.</div>'}`;
}
function openJournal(today) {
  let j = journals().find(x => x.journal === today);
  if (!j) {
    const id = uid();
    store.put('items', id, { type: 'note', title: `Nhật ký ${today.slice(8)}/${today.slice(5, 7)}/${today.slice(0, 4)}`, lang: getLang(), folder: '', journal: today, body: jqs().filter(Boolean).map(q => `## ${q}\n\n`).join('\n'), created: Date.now() });
    notes.openNote(id, true);
    return;
  }
  notes.openNote(j.id);
}

const TABS = [['today', '🌅 Hôm nay'], ['week', '📅 Tuần'], ['month', '🗓 Tháng'], ['review', '🔍 Nhìn lại'], ['journal', '📓 Nhật ký'], ['ach', '🏅 Thành tựu'], ['stats', '📈 Thống kê']];

function render() {
  const m = tracker.byDate(), today = vnDate();
  const all = [...m.values()], xp = all.reduce((s, d) => s + A.xpOf(d), 0) + A.bonusXp(m), lv = A.levelOf(xp);
  const lvPct = Math.round(100 * (xp - lv.base) / (lv.next - lv.base));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6)).filter(d => (m.get(d)?.sec || 0) > 0).length;
  const cups = all.filter(d => A.dailyFor(d.date).every(q => A.isDone(q, d))).length;
  const hearts = Array.from({ length: 7 }, (_, i) => `<span class="hrt ${i < weekDays ? '' : 'off'}">❤</span>`).join('');
  const body = tab === 'review' ? reviewTab(m, today) : tab === 'journal' ? journalTab(today) : tab === 'week' ? periodTab(m, today, 'week') : tab === 'month' ? periodTab(m, today, 'month') : tab === 'ach' ? achTab(m) : tab === 'stats' ? statsTab(m, today) : todayTab(m, today);
  $('#questBody').innerHTML = `
    <div class="hero">
      <div class="avatar">👤</div>
      <div class="hb">
        <div class="hname"><b>LV ${lv.L}</b><span>${lv.rank}</span><span class="grow"></span><span class="cups" title="Số ngày làm xong hết nhiệm vụ">🏆 ${cups}</span></div>
        <div class="xp" title="${xp} XP"><i style="width:${lvPct}%"></i></div>
        <div class="hmeta"><span>${xp - lv.base}/${lv.next - lv.base} XP</span><span class="grow"></span><span class="hearts" title="${weekDays}/7 ngày có học trong tuần">${hearts}</span></div>
      </div>
    </div>
    <div class="seg qtabs" id="qTabs">${TABS.map(([k, n]) => `<button data-qt="${k}" class="${tab === k ? 'on' : ''}">${n}</button>`).join('')}</div>
    ${body}`;
  updateBadge();
}

export function init() {
  $('#questBody').addEventListener('click', e => {
    const b = e.target.closest('[data-r]');
    if (b) { range = +b.dataset.r; render(); return; }
    const t = e.target.closest('[data-qt]');
    if (t) { tab = t.dataset.qt; render(); return; }
    const wk = e.target.closest('[data-wk]');
    if (wk) { wkOff = Math.min(0, wkOff + (+wk.dataset.wk)); render(); return; }
    const jo = e.target.closest('[data-jopen]');
    if (jo) { notes.openNote(jo.dataset.jopen); return; }
    if (e.target.closest('[data-jnew]')) { openJournal(vnDate()); return; }
    const jq = e.target.closest('[data-jqdel],[data-jqadd],[data-jqreset]');
    if (jq) {
      const d = jq.dataset, qs = [...jqs()];
      if (d.jqdel !== undefined) qs.splice(+d.jqdel, 1);
      else if (d.jqadd) qs.push('');
      else qs.splice(0, qs.length, ...DEFAULT_JQ);
      prefs.journalQs = qs.length ? qs : [...DEFAULT_JQ]; savePrefs(); jqOpen = true; render();
      if (d.jqadd) setTimeout(() => $('#questBody .jq:last-of-type')?.focus(), 0);
    }
  });
  $('#questBody').addEventListener('toggle', e => { if (e.target.matches?.('.jqs')) jqOpen = e.target.open; }, true);
  $('#questBody').addEventListener('change', e => {
    if (e.target.matches('.jq')) { const qs = [...jqs()]; qs[+e.target.dataset.jq] = e.target.value.trim(); prefs.journalQs = qs.filter(Boolean).length ? qs.filter(Boolean) : [...DEFAULT_JQ]; savePrefs(); render(); return; }
    if (e.target.id === 'goalMin') { prefs.goalMin = Math.max(1, Math.min(600, +e.target.value || 15)); savePrefs(); render(); }
  });
  bus.on('show', v => { active = v === 'quest'; if (active) render(); });
  bus.on('store', c => { if (c === 'days' || c === 'prefs' || c === '*') { updateBadge(); if (active) render(); } });
  setInterval(() => { if (document.hidden) return; updateBadge(); if (active && !document.activeElement?.matches('input')) render(); }, 15000);
  updateBadge();
}
