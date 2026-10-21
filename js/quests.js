// Nhiệm vụ mỗi ngày + biểu đồ thói quen học (giờ Việt Nam).
import { $, esc, bus, vnDate, vnHour, addDays, LANGS, langInfo } from './util.js';
import * as tracker from './tracker.js';
import { prefs, savePrefs } from './prefs.js';

let range = 14;
let active = false;

function defs() {
  const g = prefs.goalMin || 15;
  return [
    { icon: '⏱', name: `Học đủ ${g} phút`, goal: g * 60, val: a => a.sec, show: v => `${Math.floor(v / 60)}/${g} phút` },
    { icon: '🗣', name: 'Shadow 20 câu', goal: 20, val: a => a.s, show: v => `${v}/20 câu` },
    { icon: '📖', name: 'Đọc 1 tài liệu hoặc ghi chú', goal: 1, val: a => a.r, show: v => `${Math.min(v, 1)}/1` },
    { icon: '✍️', name: 'Viết 1 ghi chú mới', goal: 1, val: a => a.w, show: v => `${Math.min(v, 1)}/1` },
    { icon: '🎧', name: 'Chép chính tả 5 câu', goal: 5, val: a => a.d || 0, show: v => `${Math.min(v, 5)}/5 câu` },
    { icon: '🎙', name: 'Luyện nói 5 câu', goal: 5, val: a => a.k || 0, show: v => `${Math.min(v, 5)}/5 câu` },
    { icon: '📒', name: 'Ôn 10 thẻ', goal: 10, val: a => a.c || 0, show: v => `${Math.min(v, 10)}/10 thẻ` },
    { icon: '🧩', name: 'Bài tập hôm nay (10 câu)', goal: 10, val: a => a.q || 0, show: v => `${Math.min(v, 10)}/10 câu` },
    { icon: '🖊', name: 'Viết 10 chữ', goal: 10, val: a => a.x || 0, show: v => `${Math.min(v, 10)}/10 chữ` },
  ];
}
const blank = date => ({ date, sec: 0, s: 0, r: 0, w: 0, d: 0, k: 0, c: 0, q: 0, qc: 0, x: 0, h: {}, l: {} });

function streak(m) {
  const goal = (prefs.goalMin || 15) * 60;
  const ok = d => (m.get(d)?.sec || 0) >= goal;
  let d = vnDate(), n = 0;
  if (!ok(d)) d = addDays(d, -1);
  while (ok(d)) { n++; d = addDays(d, -1); }
  return n;
}

// ---------- cấp độ kiểu game: điểm kinh nghiệm cộng dồn từ nhật ký học ----------
const xpOf = d => Math.floor((d.sec || 0) / 60 * 3 + (d.s || 0) + 2 * (d.c || 0) + 2 * (d.q || 0) + 3 * (d.d || 0) + 3 * (d.k || 0) + 2 * (d.x || 0) + 5 * (d.r || 0) + 5 * (d.w || 0));
const RANKS = [[1, 'Tân binh'], [3, 'Học đồ'], [5, 'Thợ luyện'], [8, 'Chiến binh'], [12, 'Hiệp sĩ'], [18, 'Pháp sư'], [25, 'Đại sư']];
export function levelOf(xp) {
  const L = Math.floor((1 + Math.sqrt(1 + xp * 0.08)) / 2), base = 50 * L * (L - 1), next = 50 * (L + 1) * L; // cần 50·L·(L−1) điểm để lên cấp L
  return { L, base, next, rank: RANKS.filter(r => L >= r[0]).pop()[1] };
}

export function updateBadge() {
  const m = tracker.byDate(), t = m.get(vnDate()) || blank(vnDate());
  const ds = defs(), done = ds.filter(q => q.val(t) >= q.goal).length;
  $('#qBadge').textContent = `${done}/${ds.length}`;
  $('#qBadge').classList.toggle('full', done === ds.length);
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

function render() {
  const m = tracker.byDate(), today = vnDate(), t = m.get(today) || blank(today);
  const ds = defs(), done = ds.filter(q => q.val(t) >= q.goal).length;
  const goalMin = prefs.goalMin || 15;

  // 7 / 14 / 30 ngày gần nhất
  const days = Array.from({ length: range }, (_, i) => addDays(today, i - range + 1));
  const mins = days.map(d => Math.round((m.get(d)?.sec || 0) / 60));
  const labels = days.map(d => d.slice(8) + '/' + d.slice(5, 7));
  const week = days.slice(-7).reduce((s, d) => s + (m.get(d)?.sec || 0), 0);
  const total = days.reduce((s, d) => s + (m.get(d)?.sec || 0), 0);
  const activeDays = days.filter(d => (m.get(d)?.sec || 0) > 0).length;

  // phân bố theo giờ trong ngày (giờ VN) của khoảng đang xem
  const hours = Array(24).fill(0);
  for (const d of days) for (const k in (m.get(d)?.h || {})) hours[+k] += m.get(d).h[k];
  const hmin = hours.map(s => Math.round(s / 60));
  const best = hours.some(x => x > 0) ? hours.indexOf(Math.max(...hours)) : -1;

  const langs = LANGS.map(l => [l, Math.ceil((t.l[l.id] || 0) / 60)]).filter(x => x[1] > 0)
    .map(([l, mn]) => `<span class="chip">${l.short} ${mn}′</span>`).join('') || '<span class="dim">Chưa học hôm nay</span>';

  // cấp độ + tim tuần này + cúp (ngày làm xong hết nhiệm vụ)
  const all = [...m.values()], xp = all.reduce((s, d) => s + xpOf(d), 0), lv = levelOf(xp);
  const lvPct = Math.round(100 * (xp - lv.base) / (lv.next - lv.base));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6)).filter(d => (m.get(d)?.sec || 0) > 0).length;
  const cups = all.filter(d => ds.every(q => q.val(d) >= q.goal)).length;
  const hearts = Array.from({ length: 7 }, (_, i) => `<span class="hrt ${i < weekDays ? '' : 'off'}">❤</span>`).join('');

  $('#questBody').innerHTML = `
    <div class="hero">
      <div class="avatar">👤</div>
      <div class="hb">
        <div class="hname"><b>LV ${lv.L}</b><span>${lv.rank}</span><span class="grow"></span><span class="cups" title="Số ngày làm xong hết nhiệm vụ">🏆 ${cups}</span></div>
        <div class="xp" title="${xp} XP"><i style="width:${lvPct}%"></i></div>
        <div class="hmeta"><span>${xp - lv.base}/${lv.next - lv.base} XP</span><span class="grow"></span><span class="hearts" title="${weekDays}/7 ngày có học trong tuần">${hearts}</span></div>
      </div>
    </div>
    <div class="qhead">
      <div><div class="dim">Giờ Việt Nam (UTC+7)</div><h2>Hôm nay ${today.slice(8)}/${today.slice(5, 7)} · ${String(vnHour()).padStart(2, '0')}h</h2></div>
      <div class="streak">🔥 <b>${streak(m)}</b><span class="sl">ngày liên tiếp<br><span class="dim">đạt mục tiêu thời gian</span></span></div>
    </div>
    <div class="quests">${ds.map(q => {
      const v = q.val(t), p = Math.min(100, Math.round(100 * v / q.goal));
      return `<div class="quest ${v >= q.goal ? 'done' : ''}"><span class="qi">${v >= q.goal ? '✅' : q.icon}</span>
        <div class="qb"><b>${esc(q.name)}</b><div class="prog"><i style="width:${p}%"></i></div></div><span class="dim">${q.show(v)}</span></div>`;
    }).join('')}</div>
    ${done === ds.length ? '<div class="allDone">🎉 Hoàn thành hết nhiệm vụ hôm nay!</div>' : `<div class="dim" style="margin:6px 2px">Còn ${ds.length - done} nhiệm vụ nữa.</div>`}
    <div class="row" style="margin:10px 0"><span class="dim">Hôm nay theo ngôn ngữ:</span>${langs}</div>
    <div class="row"><label class="dim">Mục tiêu mỗi ngày <input id="goalMin" type="number" min="1" max="600" value="${goalMin}" style="width:64px"> phút</label></div>

    <div class="tiles">
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
  updateBadge();
}

export function init() {
  $('#questBody').addEventListener('click', e => {
    const b = e.target.closest('[data-r]');
    if (b) { range = +b.dataset.r; render(); }
  });
  $('#questBody').addEventListener('change', e => {
    if (e.target.id === 'goalMin') { prefs.goalMin = Math.max(1, Math.min(600, +e.target.value || 15)); savePrefs(); render(); }
  });
  bus.on('show', v => { active = v === 'quest'; if (active) render(); });
  bus.on('store', c => { if (c === 'days' || c === 'prefs' || c === '*') { updateBadge(); if (active) render(); } });
  setInterval(() => { updateBadge(); if (active && !document.activeElement?.matches('input')) render(); }, 15000);
  updateBadge();
}
