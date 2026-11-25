// TeaLab: hồ sơ và lịch sử các lượt chơi. Mỗi lượt chơi (mùa 90 ngày) có bản ghi riêng: sao từng cột mốc, huy hiệu, điểm mùa, lãi...
// Thành tích đã đạt ở BẤT KỲ lượt nào vẫn được công nhận và giữ trong hồ sơ (kỷ lục); sang lượt mới mọi thứ tính lại từ đầu để so sánh.
import { esc } from './util.js';

const MAXRUNS = 40;
export const ensureProfile = p => { p.best ||= {}; p.badges ||= {}; p.hist ||= []; p.runN ||= p.hist.length; return p; };
const sum = o => Object.values(o).reduce((a, b) => a + b, 0);

export function runRecord(st, E, D, n) {
  const stars = {}; for (const m of D.MILESTONES) if (st.stars[m.id]) stars[m.id] = st.stars[m.id];
  const badges = {}; for (const b of D.BADGES) if (st.badges[b.id]) badges[b.id] = st.badges[b.id];
  const f = st.season || (st.day >= 90 ? E.seasonScore(st) : null);
  return { id: st.runId || st.t0 || 0, n, t0: st.t0 || st.runId || Date.now(), t1: Date.now(), diff: st.diff, day: Math.min(st.day, 90), stars, badges, total: sum(stars), nb: Object.keys(badges).length, score: f ? Math.round(f.score) : null, title: f ? f.title : '', profit: st.hist.reduce((a, h) => a + h.profit, 0), nw: Math.round(E.netWorth(st)), ip: st.ip || 0, xu: st.coins || 0, final: !!st.season };
}
// gộp hồ sơ từ máy khác: kỷ lục lấy cao nhất, lịch sử lấy hợp của hai bên
export function mergeProfile(a, b) {
  a = ensureProfile(a || {}); if (!b) return a; ensureProfile(b);
  const best = { ...b.best }; for (const [k, v] of Object.entries(a.best)) best[k] = Math.max(best[k] || 0, v);
  const hist = new Map(); for (const r of [...b.hist, ...a.hist]) { const o = hist.get(r.id); if (!o || r.t1 > o.t1) hist.set(r.id, r); }
  return { ...b, ...a, best, badges: { ...b.badges, ...a.badges }, hist: [...hist.values()].sort((x, y) => y.t1 - x.t1).slice(0, MAXRUNS), runN: Math.max(a.runN || 0, b.runN || 0), runs: Math.max(a.runs || 0, b.runs || 0), coinsPrev: Math.max(a.coinsPrev || 0, b.coinsPrev || 0), bestSeason: Math.max(a.bestSeason || 0, b.bestSeason || 0), zh: a.zh ?? b.zh };
}
// cộng thành tích của lượt hiện tại vào kỷ lục hồ sơ (gọi mỗi lần lưu): đã đạt là giữ
export function mergeLife(p, st, D) {
  ensureProfile(p); if (!st) return;
  for (const m of D.MILESTONES) { const v = st.stars[m.id] || 0; if (v > (p.best[m.id] || 0)) p.best[m.id] = v; }
  for (const b of D.BADGES) if (st.badges[b.id] && !p.badges[b.id]) p.badges[b.id] = st.runId || 1;
}
// lưu lượt vừa chơi vào lịch sử trước khi chơi lượt mới
export function archive(p, st, E, D) {
  ensureProfile(p); if (!st) return null; mergeLife(p, st, D);
  const total = sum(Object.fromEntries(D.MILESTONES.map(m => [m.id, st.stars[m.id] || 0])));
  if (st.day <= 1 && !total && !st.hist.length) return null;
  p.runN = (p.runN || 0) + 1; const rec = runRecord(st, E, D, p.runN);
  p.hist = [rec, ...p.hist.filter(r => r.id !== rec.id)].slice(0, MAXRUNS); return rec;
}
export const allRuns = (p, st, E, D) => { ensureProfile(p); const cur = st ? { ...runRecord(st, E, D, (p.runN || 0) + 1), cur: true } : null; return cur ? [cur, ...p.hist.filter(r => r.id !== cur.id)] : p.hist.slice(); };

const dstr = t => new Date(t).toLocaleDateString('vi-VN');
const stars = (n, max = 3) => '<span class="hs-st">' + '★'.repeat(n) + '<i>' + '★'.repeat(max - n) + '</i></span>';
const runName = r => `Lượt ${r.n}${r.cur ? ' (đang chơi)' : ''}`;

function overview(c, runs) {
  const { st, D, G } = c, p = G.profile, M = D.MILESTONES, lifeStars = sum(Object.fromEntries(M.map(m => [m.id, Math.max(p.best[m.id] || 0, st?.stars[m.id] || 0)]))), curStars = runs[0]?.cur ? runs[0].total : 0;
  const lifeBadges = D.BADGES.filter(b => p.badges[b.id] || st?.badges[b.id]), done = runs.filter(r => !r.cur);
  const bestScore = Math.max(0, ...runs.map(r => r.score || 0)), bestTotal = Math.max(0, ...runs.map(r => r.total));
  const grp = Object.entries(D.MG_NAME).map(([g, name]) => { const ms = M.filter(m => m.g === g), life = sum(Object.fromEntries(ms.map(m => [m.id, Math.max(p.best[m.id] || 0, st?.stars[m.id] || 0)]))), cur = sum(Object.fromEntries(ms.map(m => [m.id, st?.stars[m.id] || 0]))), max = ms.length * 3; return `<div class="hs-gr"><b>${g}. ${esc(name)}</b><span class="hs-bar"><i class="life" style="width:${Math.round(100 * life / max)}%"></i><i class="cur" style="width:${Math.round(100 * cur / max)}%"></i></span><small>${cur} / ${life} / ${max}</small></div>`; }).join('');
  return `<div class="tl-sum"><span>${c.A.ic('star', 18)} <b>${lifeStars}/${M.length * 3}</b> sao kỷ lục</span><span>${c.A.ic('ribbon', 18)} <b>${lifeBadges.length}/${D.BADGES.length}</b> huy hiệu</span><span><b>${runs.length}</b> lượt</span></div>
    <div class="dim tl-note">Thành tích đã đạt ở bất kỳ lượt nào vẫn được công nhận và giữ trong hồ sơ. Mỗi lượt mới tính lại từ đầu: bạn có đạt lại được chúng và vượt kỷ lục hay không.</div>
    <div class="tl-kpis"><div><b>${bestTotal}</b><small>sao nhiều nhất một lượt</small></div><div><b>${bestScore || '—'}</b><small>Điểm Mùa cao nhất</small></div><div><b>${done.filter(r => r.final).length}</b><small>mùa trọn vẹn</small></div><div><b>${curStars}</b><small>sao lượt này</small></div></div>
    <h4>Theo nhóm cột mốc</h4><div class="dim tl-note">Mỗi hàng: lượt này / kỷ lục / tối đa. Thanh xanh = lượt này, thanh nhạt = kỷ lục hồ sơ.</div>${grp}
    <h4>Huy hiệu</h4><div class="tl-bds">${D.BADGES.map(b => { const cur = !!st?.badges[b.id], life = !!p.badges[b.id] || cur; return `<div class="tl-bd ${cur ? 'on' : life ? 'rec' : ''}" title="${esc(b.desc)}">${c.A.ic(life ? b.ic : 'lock', 28)}<small>${esc(b.name)}</small><small class="dim">${cur ? 'lượt này' : life ? 'đã có (hồ sơ)' : 'chưa đạt'}</small></div>`; }).join('')}</div>`;
}

function runCard(c, r, runs) {
  const { D } = c, M = D.MILESTONES;
  const grp = Object.entries(D.MG_NAME).map(([g, name]) => { const ms = M.filter(m => m.g === g), s = sum(Object.fromEntries(ms.map(m => [m.id, r.stars[m.id] || 0]))); return `<div class="hs-gr"><b>${g}. ${esc(name)}</b><span class="hs-bar"><i class="cur" style="width:${Math.round(100 * s / (ms.length * 3))}%"></i></span><small>${s} / ${ms.length * 3}</small></div>`; }).join('');
  const bd = D.BADGES.filter(b => r.badges[b.id]).map(b => `<span class="tl-pill">${c.A.ic(b.ic, 14)} ${esc(b.name)}</span>`).join(' ') || '<span class="dim">Chưa có huy hiệu.</span>';
  const got = M.filter(m => r.stars[m.id]).map(m => `<div class="hs-ms"><b>${m.id}</b> ${esc(m.name)}${stars(r.stars[m.id])}</div>`).join('') || '<div class="dim">Chưa đạt cột mốc nào.</div>';
  return `<details class="tl-more hs-run ${r.cur ? 'cur' : ''}"><summary><span class="hs-t"><b>${esc(runName(r))}</b> <small class="dim">${dstr(r.t0)} · ${esc(D.DIFFS[r.diff] || r.diff)}</small></span><span class="hs-s">★ ${r.total}/${M.length * 3} · 🏅 ${r.nb} · ngày ${r.day}${r.score != null ? ` · ${r.score}đ` : ''}</span></summary>
    <div class="tl-kpis"><div><b>${r.total}</b><small>sao</small></div><div><b>${r.nb}</b><small>huy hiệu</small></div><div><b>${r.score != null ? r.score : '—'}</b><small>Điểm Mùa</small></div><div><b>${Math.round(r.profit / 1e6)}tr</b><small>lãi cả lượt</small></div></div>
    ${r.title ? `<div class="tl-arr">Danh hiệu: <b>${esc(r.title)}</b>${r.final ? '' : ' (tạm tính)'}</div>` : ''}
    ${grp}<h4>Huy hiệu lượt này</h4><div>${bd}</div><h4>Cột mốc đã đạt (${Object.keys(r.stars).length})</h4>${got}</details>`;
}

function compare(c, runs) {
  const { D, G } = c, M = D.MILESTONES; G.hsCmp = (G.hsCmp || []).filter(id => runs.some(r => r.id === id));
  if (!G.hsCmp.length) G.hsCmp = runs.slice(0, 2).map(r => r.id);
  const pick = G.hsCmp.map(id => runs.find(r => r.id === id)).filter(Boolean).sort((a, b) => a.n - b.n);
  const chips = runs.map(r => `<button class="chip ${G.hsCmp.includes(r.id) ? 'on' : ''}" data-hc="${r.id}">${esc(runName(r))} · ★${r.total}</button>`).join('');
  if (pick.length < 2) return `<div class="dim tl-note">Chọn ít nhất hai lượt để so sánh (tối đa 4). Bạn có ${runs.length} lượt trong hồ sơ.</div><div class="tl-tabs">${chips}</div>`;
  const best = (vals) => Math.max(...vals), row = (label, vals, fmt) => { const mx = best(vals); return `<tr><td class="hs-n">${label}</td>${vals.map(v => `<td class="${v === mx && mx > 0 && vals.filter(x => x === mx).length < vals.length ? 'hs-best' : ''}">${fmt(v)}</td>`).join('')}</tr>`; };
  const head = `<tr><th></th>${pick.map(r => `<th>${esc('Lượt ' + r.n)}${r.cur ? '<br><small>đang chơi</small>' : ''}</th>`).join('')}</tr>`;
  const tot = row('Tổng sao', pick.map(r => r.total), v => v) + row('Huy hiệu', pick.map(r => r.nb), v => v) + row('Điểm Mùa', pick.map(r => r.score ?? 0), v => v || '—') + row('Lãi cả lượt (tr)', pick.map(r => Math.round(r.profit / 1e6)), v => v) + row('Ngày chơi', pick.map(r => r.day), v => v);
  const mrows = Object.entries(D.MG_NAME).map(([g, name]) => `<tr class="hs-g"><td colspan="${pick.length + 1}">${g}. ${esc(name)}</td></tr>` + M.filter(m => m.g === g).map(m => row(`<b>${m.id}</b> ${esc(m.name)}`, pick.map(r => r.stars[m.id] || 0), v => (v ? stars(v) : '<span class="dim">–</span>'))).join('')).join('');
  const brows = D.BADGES.map(b => row(`${c.A.ic(b.ic, 12)} ${esc(b.name)}`, pick.map(r => (r.badges[b.id] ? 1 : 0)), v => (v ? '✔' : '<span class="dim">–</span>'))).join('');
  const a = pick[pick.length - 1], b = pick[0], ds = a.total - b.total, db = a.nb - b.nb;
  const verdict = pick.length === 2 ? `<div class="tl-arr ${ds < 0 ? 'bad' : ''}"><b>${esc('Lượt ' + a.n)}</b> so với <b>${esc('Lượt ' + b.n)}</b>: ${ds >= 0 ? '+' : '−'}${Math.abs(ds)} sao, ${db >= 0 ? '+' : '−'}${Math.abs(db)} huy hiệu${a.score != null && b.score != null ? `, Điểm Mùa ${a.score - b.score >= 0 ? '+' : '−'}${Math.abs(a.score - b.score)}` : ''}.</div>` : '';
  return `<div class="tl-tabs">${chips}</div>${verdict}<div class="hs-tbl"><table class="tl-t hs-t2"><thead>${head}</thead><tbody>${tot}<tr class="hs-g"><td colspan="${pick.length + 1}">Cột mốc (số sao)</td></tr>${mrows}<tr class="hs-g"><td colspan="${pick.length + 1}">Huy hiệu</td></tr>${brows}</tbody></table></div><div class="dim tl-note">Ô nền vàng = lượt đạt cao nhất ở hàng đó.</div>`;
}

export function histHtml(c) {
  const { st, E, D, G } = c, tab = G.hsTab || 'ov', runs = allRuns(G.profile, st, E, D);
  const tabs = [['ov', 'Tổng quan'], ['runs', 'Các lượt'], ['cmp', 'So sánh']];
  const head = `<div class="tl-tabs">${tabs.map(([k, n]) => `<button class="chip ${tab === k ? 'on' : ''}" data-hs="${k}">${n}</button>`).join('')}</div>`;
  const body = tab === 'ov' ? overview(c, runs) : tab === 'runs' ? (runs.map(r => runCard(c, r, runs)).join('') || '<div class="dim">Chưa có lượt nào.</div>') : compare(c, runs);
  return head + body;
}
// xử lý bấm trong cửa sổ hồ sơ; trả true nếu đã xử lý
export function histClick(x, c) {
  const G = c.G; let b;
  if ((b = x.closest('[data-hs]'))) { G.hsTab = b.dataset.hs; c.refresh(); return true; }
  if ((b = x.closest('[data-hc]'))) { const id = +b.dataset.hc, sel = G.hsCmp || []; G.hsCmp = sel.includes(id) ? sel.filter(v => v !== id) : [...sel, id].slice(-4); c.refresh(); return true; }
  return false;
}
