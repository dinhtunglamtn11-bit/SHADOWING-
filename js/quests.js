// Nhiệm vụ: hôm nay / tuần / tháng, bảng thành tựu (huy hiệu) và thống kê thói quen học (giờ Việt Nam).
import { $, esc, bus, toast, vnDate, vnHour, addDays, LANGS } from './util.js';
import * as tracker from './tracker.js';
import { prefs, savePrefs } from './prefs.js';
import { pix, badge } from './pixicons.js';
import * as A from './achieve.js';
import { tr } from './i18n.js';

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
function heatmap(m, today, goalMin) {
  const WEEKS = 20, dow = d => (new Date(d + 'T00:00:00Z').getUTCDay() + 6) % 7; // thứ Hai = 0
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
    const tier = x.got ? A.TIERS[x.got - 1] : 'locked', d = x.def, nextTxt = `${Math.floor(x.value)}/${x.next ?? d.tiers[3]} ${d.unit}`;
    const pct = x.next != null ? Math.min(100, Math.round(100 * (x.value - x.prev) / (x.next - x.prev))) : 100;
    const pips = A.TIERS.map((t, i) => `<i class="pip ${t} ${x.when[i] ? 'on' : ''}" title="${tr(A.TIER_NAME[t])}: ${x.when[i] ? x.when[i].slice(8) + '/' + x.when[i].slice(5, 7) + '/' + x.when[i].slice(0, 4) : d.tiers[i] + ' ' + tr(d.unit)}"></i>`).join('');
    return `<div class="ach ${x.got ? 'got' : 'lock'} ${tier}" title="${esc(d.desc)}"><div class="abadge">${badge(tier, d.glyph)}</div><b>${esc(d.name)}</b>
      <small class="dim">${x.got ? A.TIER_NAME[tier] : 'Chưa mở khóa'}</small><div class="prog"><i style="width:${pct}%"></i></div><small class="ainfo">${nextTxt}</small><div class="pips">${pips}</div></div>`;
  };
  return `<div class="qhead"><div><div class="dim">Thành tựu dài hạn</div><h2>Huy hiệu ${res.got}/${res.total}</h2></div>
      <div class="streak">${pix('trophy')}<span class="sl">${res.list.filter(x => x.got === 4).length}<br><span class="dim">huy hiệu kim cương</span></span></div></div>
    ${recent.length ? `<div class="row recent"><span class="dim">Mới mở khóa:</span>${recent.map(r => `<span class="chip">${badge(r.tier, r.def.glyph)} ${esc(r.def.name)} · ${A.TIER_NAME[r.tier]}</span>`).join('')}</div>` : '<div class="dim" style="margin:4px 2px">Học đều mỗi ngày để mở khóa huy hiệu Đồng → Bạc → Vàng → Kim cương.</div>'}
    <div class="achs">${res.list.map(card).join('')}</div>`;
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

const TABS = [['today', '🌅 Hôm nay'], ['week', '📅 Tuần'], ['month', '🗓 Tháng'], ['ach', '🏅 Thành tựu'], ['stats', '📈 Thống kê']];

function render() {
  const m = tracker.byDate(), today = vnDate();
  const all = [...m.values()], xp = all.reduce((s, d) => s + A.xpOf(d), 0) + A.bonusXp(m), lv = A.levelOf(xp);
  const lvPct = Math.round(100 * (xp - lv.base) / (lv.next - lv.base));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6)).filter(d => (m.get(d)?.sec || 0) > 0).length;
  const cups = all.filter(d => A.dailyFor(d.date).every(q => A.isDone(q, d))).length;
  const hearts = Array.from({ length: 7 }, (_, i) => `<span class="hrt ${i < weekDays ? '' : 'off'}">❤</span>`).join('');
  const body = tab === 'week' ? periodTab(m, today, 'week') : tab === 'month' ? periodTab(m, today, 'month') : tab === 'ach' ? achTab(m) : tab === 'stats' ? statsTab(m, today) : todayTab(m, today);
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
    if (t) { tab = t.dataset.qt; render(); }
  });
  $('#questBody').addEventListener('change', e => {
    if (e.target.id === 'goalMin') { prefs.goalMin = Math.max(1, Math.min(600, +e.target.value || 15)); savePrefs(); render(); }
  });
  bus.on('show', v => { active = v === 'quest'; if (active) render(); });
  bus.on('store', c => { if (c === 'days' || c === 'prefs' || c === '*') { updateBadge(); if (active) render(); } });
  setInterval(() => { updateBadge(); if (active && !document.activeElement?.matches('input')) render(); }, 15000);
  updateBadge();
}
