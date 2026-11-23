// SCM: game luyện kỹ năng chuỗi cung ứng. 6 lĩnh vực × 3 độ khó = 18 case thực chiến chạy theo đồng hồ thật.
// Mỗi case có hồ sơ (bảng, hình), kế hoạch thời gian với các mốc khóa bước, form nhiều bước (tick, số, chọn, ma trận),
// sự kiện cập nhật giữa chừng ở case Khó, chấm điểm theo từng ô, chất lượng quyết định và 1–3 sao.
// Nội dung case: js/scm-cases.json và js/scm-cases2.json (trích từ SC_Case_Bank.docx và SC_Case_Bank_2_Analytics_Planning.docx bằng tools/scm/extract-cases.ps1); đáp án: js/scm-keys.js.
import { $, $$, esc, toast, bus } from './util.js';
import * as sfx from './sfx.js';
import * as store from './store.js';
import { KEYS } from './scm-keys.js';
import { icon, paintIcons, banner, mascot } from './scm-art.js';

const FIELDS = {
  A: { vi: 'Hải quan & chứng từ', en: 'Customs & documentation', ic: 'f-customs', blurb: 'Soát chứng từ, tính thuế, định giá hải quan, đối phó hậu kiểm.' },
  B: { vi: 'Thanh toán quốc tế', en: 'International payment', ic: 'f-pay', blurb: 'Chuyển tiền, thư tín dụng L/C, chọn điều khoản thanh toán.' },
  C: { vi: 'Mua hàng & tìm nguồn', en: 'Procurement & sourcing', ic: 'f-buy', blurb: 'So báo giá, TCO, hợp đồng chỉ số giá, nhiều nguồn cung.' },
  D: { vi: 'Khởi nghiệp & tài chính', en: 'Start-up & finance', ic: 'f-fin', blurb: 'Chọn mặt bằng, hình thức kinh doanh, kho lạnh và cấu trúc vốn.' },
  E: { vi: 'Phân tích chuỗi cung ứng', en: 'Supply chain analytics', ic: 'f-data', blurb: 'Làm sạch dữ liệu, KPI giao hàng, dự báo có kiểm soát lệch, giải thích chênh lệch cước phí.' },
  F: { vi: 'Lập kế hoạch & tối ưu', en: 'Planning & optimization', ic: 'f-plan', blurb: 'Xếp hàng lên xe, cỡ lô đặt hàng MRP, xếp lịch cầu bến dưới các ràng buộc cứng.' },
};
const LEVELS = { 1: { vi: 'Dễ', ic: 'lv-easy', steps: 4 }, 2: { vi: 'Trung bình', ic: 'lv-med', steps: 5 }, 3: { vi: 'Khó', ic: 'lv-hard', steps: 6 } };
const SPEEDS = { real: ['⏱ Thời gian thực', 1, 'Đồng hồ chạy đúng giờ thật: 3 ngày trong case là 3 ngày ngoài đời.'], fast: ['⏩ Nhanh ×24', 24, '1 giờ thật bằng 1 ngày trong case. Hợp để chơi trọn một case trong buổi.'], free: ['🧘 Tự do (không giới hạn giờ)', 0, 'Không khóa bước, không hết hạn. Luyện tập thoải mái nhưng vẫn được chấm sao.'] };
const ORDER = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'];
const FIELD_IDS = 'ABCDEF';
const SKEY = 'scm:v1', LV_COINS = { 1: [0, 200, 500, 1000], 2: [0, 400, 1000, 2000], 3: [0, 800, 2000, 4000] }; // xu cộng dồn theo số sao đạt được, nhân theo độ khó (Easy / Medium / Hard)
const reward = (code, s) => (LV_COINS[+String(code).charAt(1)] || LV_COINS[1])[s] || 0;
let DATA = null, S = { code: '', tab: 'file', home: true }, root = null, active = false, timer = 0, saveT = 0, dirty = false;
let DOC = load();

// ---------- lưu trạng thái ----------
function load() { try { const o = JSON.parse(localStorage.getItem(SKEY) || 'null'); if (o) return { runs: o.runs || {}, best: o.best || {}, speed: o.speed || 'real', all: !!o.all, t: o.t || 0 }; } catch { /* bỏ qua */ } return { runs: {}, best: {}, speed: 'real', all: false, t: 0 }; }
function save() { DOC.t = Date.now(); dirty = true; try { localStorage.setItem(SKEY, JSON.stringify(DOC)); } catch { /* bỏ qua */ } clearTimeout(saveT); saveT = setTimeout(push, 1500); }
function push() { dirty = false; store.put('prefs', 'scm', { ...DOC }); }
function pull() { // gộp với máy khác: mỗi case lấy lượt chơi mới hơn; sao lấy số cao hơn
  const r = store.get('prefs', 'scm'); if (!r) return; let ch = false;
  for (const [c, run] of Object.entries(r.runs || {})) { const m = DOC.runs[c]; if (!m || (run.t || 0) > (m.t || 0)) { DOC.runs[c] = run; ch = true; } }
  for (const [c, n] of Object.entries(r.best || {})) if (n > (DOC.best[c] || 0)) { DOC.best[c] = n; ch = true; }
  if ((r.t || 0) > (DOC.t || 0) && r.speed) { DOC.speed = r.speed; DOC.all = !!r.all; }
  if (ch) { try { localStorage.setItem(SKEY, JSON.stringify(DOC)); } catch { /* bỏ qua */ } }
}
export const coins = () => Object.entries(DOC.best).reduce((n, [c, s]) => n + reward(c, s), 0); // xu thưởng từ sao (Passport cộng vào số xu)

// ---------- dữ liệu case ----------
async function data() {
  if (DATA) return DATA;
  const [j1, j2] = await Promise.all(['./scm-cases.json', './scm-cases2.json'].map(async f => (await fetch(new URL(f, import.meta.url))).json())); const j = { cases: { ...j1.cases, ...j2.cases } }; DATA = {};
  for (const code of ORDER) {
    const c = j.cases[code]; if (!c) continue;
    const meta = (c.head.find(b => b.t === 'table') || { rows: [[], []] }).rows[1] || [], days = +(/(\d+)\s*days?/.exec(meta[2] || '') || [0, 3])[1];
    const brief = (c.head.find(b => b.t === 'p' && /^Brief\./.test(b.x)) || { x: '' }).x.replace(/^Brief\.\s*/, '');
    const pt = (c.plan.find(b => b.t === 'table') || { rows: [] }).rows.slice(1), ms = []; let updIdx = 0;
    const d0 = +((/\(\w{3}\s+(\d+)/.exec(meta[2] || '') || [0, 0])[1]); // ngày bắt đầu của case (dùng khi mốc ghi bằng ngày giờ cụ thể)
    for (const r of pt) {
      let h = /\+(\d+)\s*(h|days?)/.exec(r[1] || ''), hours = h ? +h[1] * (h[2][0] === 'h' ? 1 : 24) : 0;
      if (!h) { const ab = /\w{3}\s+(\d+)\s+\w{3}\s+(\d{1,2}):(\d\d)/.exec(r[1] || ''); if (ab && d0) { h = ab; hours = (+ab[1] - d0) * 24 + +ab[2] + +ab[3] / 60; } }
      const st = /Steps?\s+(\d)(?:\s*[–-]\s*(\d))?/.exec(r[2] || ''), id = /^(M\d)/.exec(r[0] || '');
      if (!h || !st || !id) continue;
      const steps = []; for (let k = +st[1]; k <= +(st[2] || st[1]); k++) steps.push(k);
      ms.push({ id: id[1], name: r[0].replace(/^M\d\s*[–-]\s*/, ''), h: hours, steps });
      const txt = (r[2] || '') + ' ' + (r[0] || ''), u = /Update released at M(\d)/.exec(txt); if (u) updIdx = +u[1]; else if (/released/i.test(txt)) updIdx = +id[1].slice(1) + 1; // "Exhibit 4 released" ở mốc Mk: hiện từ khi mốc Mk hết hạn
    }
    const updH = updIdx ? (updIdx >= 2 ? (ms[updIdx - 2] || { h: 0 }).h : 0) : -1; // cập nhật phát hành khi mốc liền trước hết hạn (đầu cửa sổ của mốc nêu tên)
    const stars = (c.stars.find(b => b.t === 'table') || { rows: [] }).rows.map(r => r.join(' ')).join('\n');
    DATA[code] = { code, name: c.name, f: code[0], lv: +code[1], days, hours: days * 24, brief, ms, updH, file: c.file, steps: c.steps, head: c.head, sol: c.sol, stars, meta };
  }
  return DATA;
}

// ---------- chuẩn hóa và chấm ----------
const ns = x => String(x ?? '').toUpperCase().replace(/[–—−]/g, '-').replace(/[^A-Z0-9+\-]/g, '').replace(/(^|[A-Z+\-])0+(\d)/g, '$1$2');
const nsStrong = x => ns(x).replace(/-/g, '');
export function parseNum(x) {
  if (x == null) return NaN; let t = String(x).trim().replace(/[%\s ]/g, '').replace(/[−–]/g, '-'); if (!t) return NaN;
  if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) t = t.replace(/,/g, ''); else if (/^-?\d{1,3}(\.\d{3}){2,}(,\d+)?$/.test(t) || /^-?\d{1,3}(\.\d{3})+,\d+$/.test(t)) t = t.replace(/\./g, '').replace(',', '.'); // "1.026.000" hoặc "1.026,5" là cách viết châu Âu; "50.368" là số thập phân else t = t.replace(',', '.');
  const n = parseFloat(t); return isFinite(n) ? n : NaN;
}
const canon = id => { const p = String(id).split('.'); return p.length === 4 && p[3] === '1' ? p.slice(0, 3).join('.') : id; };
const stepPts = s => +(/\((\d+)\s*points?/i.exec(s.title) || [0, 0])[1];
const isTick = t => t.t === 'table' && t.rows[0] && t.rows[0][0] === '#' && /Statement/.test(t.rows[0][1] || '');
const isRules = t => t.t === 'table' && t.rows[0] && /^Stars?\b|^Star rules/.test(t.rows[0][0] || '');
function okVal(spec, raw) {
  if (raw == null || String(raw).trim() === '') return false;
  if (spec.nums) { const got = (String(raw).match(/-?[\d.,]+/g) || []).map(parseNum).filter(Number.isFinite); return spec.nums.every(n => got.some(g => Math.abs(g - n) <= (spec.tol ?? 1))); }
  if (spec.v != null) { const n = parseNum(raw); if (!Number.isFinite(n)) return false; const tol = spec.tol != null ? spec.tol : Math.abs(spec.v) * (spec.rel ?? 0.01); return Math.abs(n - spec.v) <= tol + 1e-9; }
  if (spec.set) { const a = new Set(String(raw).toUpperCase().split(spec.set.some(x => x.includes('+')) ? /[^A-Z0-9+]+/ : /[^A-Z0-9]+/).filter(Boolean)), b = new Set(spec.set); return a.size === b.size && [...a].every(x => b.has(x)); }
  if (spec.s != null) { const p = nsStrong(raw), k = nsStrong(spec.s); return p === k || (k.length >= 5 && p.includes(k)) || (k === 'EQUITYCAP' && p.includes('EQUITY')) || (/^W\d$/.test(k) && p === k.slice(1)); } // "W5" nhận cả "5"
  return false;
}
// chấm toàn bộ một lượt chơi
function grade(cs, run) {
  const K = KEYS[cs.code] || { f: {}, ticks: {} }, A = id => run.ans[canon(id)], a = id => parseNum(A(id)), s = id => ns(A(id));
  const steps = []; let total = 0, penalty = 0, certWrong = 0, foundMain = 0, wrongMain = 0;
  for (const st of cs.steps) {
    const P = stepPts(st), n = st.n, tr = (K.ticks || {})[n]; let got = 0, wrong = 0, found = 0, detail = [];
    if (tr) {
      const chosen = new Set(run.ans[`${n}.tick`] || []), T = new Set(tr);
      for (const r of chosen) if (T.has(r)) found++; else wrong++;
      got = wrong >= 3 ? 0 : Math.max(0, found / T.size * P - 2 * wrong);
      detail = [{ t: 1, lab: `${found}/${T.size} ý đúng`, ok: found === T.size && !wrong }]; if (wrong) detail.push({ t: 1, lab: `${wrong} ý tick sai (−2 mỗi ý${wrong >= 3 ? ', trượt bước' : ''})`, ok: false });
      if (n === 1) { foundMain = found; wrongMain = wrong; }
    } else {
      const specs = Object.entries(K.f || {}).filter(([k]) => +k.split('.')[0] === n).map(([k, v]) => [canon(k), v]); const W = specs.reduce((x, [, v]) => x + (v.w ?? 1), 0) || 1;
      for (let [k, v] of specs) {
        const share = (v.w ?? 1) / W * P, raw = A(k); let part = 0;
        if (v.eng) { try { const x = v.eng({ a, s }); if (typeof x === 'string') v = { ...v, s: x, v: undefined }; else if (Number.isFinite(x)) v = { ...v, v: x }; } catch { /* dùng giá trị mặc định */ } } // đáp án tính lại từ lựa chọn của người chơi
        if (okVal(v, raw)) part = 1; else if (v.pf) { try { part = Math.max(0, Math.min(1, v.pf({ a, s }) || 0)); } catch { part = 0; } } else if (v.ft) { try { const fv = new Function('a', 's', 'return ' + v.ft)(a, s); if (Number.isFinite(fv) && okVal({ v: fv, tol: v.tol, rel: v.rel ?? 0.01 }, raw)) part = 0.6; } catch { /* bỏ qua */ } }
        got += share * part; detail.push({ lab: k, ok: part === 1, part, raw });
        if (run.cert[k] && part < 1 && raw != null && String(raw).trim() !== '') certWrong++;
      }
    }
    steps.push({ n, P, got: Math.round(got * 100) / 100, wrong, found, detail }); total += got;
  }
  penalty = Math.min(15, certWrong * 5); const score = Math.max(0, Math.round((total - penalty) * 10) / 10);
  const dqr = K.dq ? K.dq({ s, a }) : { dq: 100, valid: true };
  let stars = 0; const ex = K.star || {};
  if (dqr.valid) {
    if (score >= 60 && (ex.maxWrong == null || wrongMain <= ex.maxWrong)) stars = 1;
    if (stars && score >= 75 && dqr.dq >= 80 && (!ex.minFound || foundMain >= ex.minFound[1])) stars = 2;
    if (stars === 2 && score >= 90 && dqr.dq >= 100) stars = 3;
  }
  return { total: score, raw: Math.round(total * 10) / 10, penalty, certWrong, steps, dq: dqr.dq, valid: dqr.valid, why: dqr.why || '', stars };
}

// ---------- thời gian ----------
const speedOf = run => (SPEEDS[run.speed] || SPEEDS.real)[1];
function elapsed(run) { const sp = speedOf(run); return sp ? (Date.now() - run.start) / 36e5 * sp : 0; } // giờ trong case
const isFree = run => !speedOf(run);
function lockedBy(cs, run, n) { if (isFree(run) || run.sub) return run.sub ? 'Đã nộp' : ''; const e = elapsed(run); const m = cs.ms.find(m => m.steps.includes(n) && e >= m.h); return m ? m.id : ''; }
function fmtD(ms) { if (ms < 0) ms = 0; const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60, p = n => String(n).padStart(2, '0'); return (d ? d + ' ngày ' : '') + `${p(h)}:${p(m)}:${p(x)}`; }
const realMs = (run, hoursLeft) => hoursLeft / speedOf(run) * 36e5;
const updVisible = (cs, run) => cs.updH < 0 || run.sub || isFree(run) || elapsed(run) >= cs.updH;

// ---------- mở khóa ----------
const prevOf = code => { const l = +code[1]; return l > 1 ? code[0] + (l - 1) : ''; };
const unlocked = code => DOC.all || !prevOf(code) || (DOC.best[prevOf(code)] || 0) >= 1;

// ---------- vẽ ----------
const bi = f => `<span class="scm-bi" data-art="${f}" data-sc="3"></span>`;
function stars(n, sc = 2) { return `<span class="scm-stars">${[1, 2, 3].map(i => `<span data-art="${i <= n ? 'star' : 'star0'}" data-sc="${sc}"></span>`).join('')}</span>`; }
async function draw() {
  if (!root) return; const D = await data();
  if (S.home || !S.code) return drawHome(D);
  const cs = D[S.code], run = DOC.runs[S.code];
  if (!run) return drawIntro(cs);
  if (run.sub) return drawResult(cs, run);
  drawPlay(cs, run);
}
function drawHome(D) {
  clearInterval(timer); timer = 0;
  const done = ORDER.filter(c => DOC.best[c]).length, st = Object.values(DOC.best).reduce((n, v) => n + v, 0);
  let h = `<div class="scm-hero"><canvas id="scmBanner" class="scm-banner" aria-label="Cảng biển"></canvas><div class="scm-title"><h2>📦 SCM · Chuỗi cung ứng thực chiến</h2>
    <p>18 tình huống thật từ hải quan, thanh toán quốc tế, mua hàng, tài chính đến phân tích dữ liệu và lập kế hoạch. Mỗi case chạy theo <b>đồng hồ thật</b>: đọc hồ sơ, làm từng bước, bị khóa theo mốc, đối mặt cập nhật giữa chừng rồi nhận 1–3 sao.</p></div></div>
    <div class="scm-sum"><span>⭐ ${st}/${ORDER.length * 3}</span><span>✅ ${done}/${ORDER.length} ${'case có sao'}</span><span>🪙 +${coins()} ${'xu từ SCM'}</span><span class="grow"></span>
      <label class="scm-opt">${'Tốc độ mặc định'} <select id="scmSpeed">${Object.entries(SPEEDS).map(([k, v]) => `<option value="${k}" ${DOC.speed === k ? 'selected' : ''}>${v[0]}</option>`).join('')}</select></label>
      <label class="scm-opt"><input type="checkbox" id="scmAll" ${DOC.all ? 'checked' : ''}> ${'Mở hết case'}</label></div>`;
  for (const f of FIELD_IDS) {
    h += `<section class="scm-field"><header>${`<span class="scm-fi" data-art="${FIELDS[f].ic}" data-sc="4"></span>`}<div><b>${FIELDS[f].vi}</b><small class="dim">${FIELDS[f].en} · ${FIELDS[f].blurb}</small></div></header><div class="scm-cards">`;
    for (let l = 1; l <= 3; l++) {
      const code = f + l, cs = D[code]; if (!cs) continue; const run = DOC.runs[code], open = unlocked(code), best = DOC.best[code] || 0;
      let state = open ? '▶ Chưa chơi' : `🔒 Cần ★ ở ${prevOf(code)}`; if (run && !run.sub) state = '⏳ Đang chơi'; else if (run && run.sub) state = `✓ Đã nộp · ${run.res.total} điểm`;
      h += `<button class="scm-card${open ? '' : ' lock'}${best ? ' done' : ''}" data-case="${code}" ${open ? '' : 'disabled'} aria-label="${esc(cs.name)}"><span class="scm-ci" data-art="${code}" data-sc="5"></span><span class="scm-cb"><span class="scm-cc">${code} · <span data-art="${LEVELS[l].ic}" data-sc="1"></span>${LEVELS[l].vi}</span><b>${esc(cs.name)}</b><small class="dim">${cs.days} ngày · ${cs.steps.length} bước</small><span class="scm-cs">${stars(best, 1)}<span class="scm-st">${state}</span></span></span></button>`;
    }
    h += `</div></section>`;
  }
  h += `<div class="scm-note dim">Nội dung case bằng tiếng Anh như đề thật của ngành. Đáp án lấy từ lời giải đã tính sẵn của bộ case. Số liệu và quy định là giả định để học, hãy kiểm tra luật hiện hành trước khi áp dụng vào việc thật.</div>`;
  root.innerHTML = h; paintIcons(root); banner($('#scmBanner', root));
}
function drawIntro(cs) {
  clearInterval(timer); timer = 0;
  root.innerHTML = `<div class="scm-top"><button class="btn" data-go="home">← Danh sách case</button><b class="grow">${cs.code} · ${esc(cs.name)}</b></div>
    <div class="scm-intro"><span class="scm-ci big" data-art="${cs.code}" data-sc="8"></span><div><div class="scm-cc">${FIELDS[cs.f].vi} · <span data-art="${LEVELS[cs.lv].ic}" data-sc="1"></span>${LEVELS[cs.lv].vi}</div><h3>${esc(cs.name)}</h3>
      <p class="gt">${esc(cs.brief)}</p><p class="dim">Thời gian: <b>${cs.days} ngày</b> · ${cs.steps.length} bước · ${cs.ms.length} mốc khóa${cs.updH >= 0 ? ' · <b>có cập nhật giữa chừng</b>' : ''}</p><p class="scm-rw">🪙 Thưởng xu: ${[1, 2, 3].map(s => `<b>${'★'.repeat(s)} +${reward(cs.code, s) - reward(cs.code, s - 1)}</b>`).join(' · ')} <small class="dim">(mỗi mức sao chỉ nhận một lần, chơi lại để lên sao thì nhận phần chênh)</small></p></div></div>
    <div class="scm-spd"><b>Chọn nhịp thời gian</b>${Object.entries(SPEEDS).map(([k, v]) => `<label class="scm-sp"><input type="radio" name="scmSp" value="${k}" ${DOC.speed === k ? 'checked' : ''}> <span><b>${v[0]}</b><small class="dim">${v[2]}${v[1] ? ` Hết hạn sau ${fmtD(realMs({ speed: k }, cs.hours)).replace(/:\d\d$/, '')}.` : ''}</small></span></label>`).join('')}</div>
    <div class="row"><button class="btn primary" data-act="start">▶ Bắt đầu case</button></div>`;
  paintIcons(root);
}
function fileHtml(cs, run) {
  const vis = updVisible(cs, run); let hide = false, h = '';
  for (let i = 0; i < cs.file.length; i++) {
    const b = cs.file[i];
    if (b.t === 'p' && /^Exhibit \d+\s*[–-].*([Uu]pdate|correction|released)/.test(b.x)) hide = true; else if (b.t === 'p' && /^(Exhibit|Figure) \d+/.test(b.x) && hide) hide = false;
    if (hide && !vis) { if (b.t === 'p' && /Update|correction|released/i.test(b.x)) h +=`<div class="scm-upd locked">🔔 Cập nhật sẽ phát hành khi bước tiếp theo mở. Hãy hoàn thành phần trước.</div>`; continue; }
    h += blockHtml(b, cs.file[i + 1]);
    if (b.t === 'img' && cs.file[i + 1] && /^Figure/.test(cs.file[i + 1].x || '')) i++;
  }
  return h;
}
function blockHtml(b, next) {
  if (b.t === 'p') return /^Exhibit \d+/.test(b.x) ? `<h4 class="scm-ex">${esc(b.x)}</h4>` : /^Figure/.test(b.x) ? `<p class="dim scm-cap">${esc(b.x)}</p>` : `<p class="gt">${esc(b.x)}</p>`;
  if (b.t === 'img') { const cap = next && next.t === 'p' && /^Figure/.test(next.x) ? next.x : ''; return `<figure class="scm-fig"><img src="${new URL('./scm-img/' + b.f, import.meta.url).href}" alt="${esc(cap)}" loading="lazy"><figcaption class="dim">${esc(cap)}</figcaption></figure>`; }
  if (b.t === 'table') return tableHtml(b.rows, '', {});
  return '';
}
const cellHtml = x => esc(x).replace(/\n/g, '<br>');
function tableHtml(rows, _id, ctx) {
  if (!rows.length) return '';
  const head = rows.length > 1 && !(rows[0].length === 1) ? rows[0] : null, body = head ? rows.slice(1) : rows;
  return `<div class="scm-tw"><table class="scm-tb">${head ? `<thead><tr>${head.map(c => `<th>${cellHtml(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${body.map(r => `<tr>${r.map(c => `<td>${cellHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
// ô nhập
function optionsOf(rows, ri, ci) {
  const clean = s => s.split(/\s*\/\s*|\s*,\s*(?=[^,=]*=)/).map(x => x.replace(/\s*=.*/, '').trim()).filter(Boolean); // tách bằng dấu / (hoặc dấu , khi có dạng "C = company, H = household")
  const pick = txt => { const m = /\(([^()]+)\)\s*$/.exec(txt || ''); if (!m) return null; const t = m[1]; if (/e\.g\.|:/i.test(t) || !(/\//.test(t) || /=/.test(t))) return null; const o = clean(t); return o.length >= 2 && o.length <= 6 && o.every(x => x.length <= 14) ? o : null; };
  const unitOpts = txt => { const o = clean(txt); return o.length >= 2 && o.length <= 5 && o.every(x => /^[A-Za-z0-9+\-]{1,8}$/.test(x) && !/^(USD|VND|unit|k|m|bn)$/i.test(x)) ? o : null; };
  return pick(rows[0][ci]) || pick(rows[ri][0]) || (rows[ri][ci + 1] && /\//.test(rows[ri][ci + 1]) ? unitOpts(rows[ri][ci + 1]) : null);
}
function stepHtml(cs, run, st) {
  const lock = lockedBy(cs, run, st.n), n = st.n; let ti = 0, h = '';
  h += `<section class="scm-step${lock ? ' locked' : ''}" id="scmS${n}"><header><b>Bước ${n}</b><span class="scm-stt">${esc(st.title)}</span>${lock ? `<span class="scm-lk">🔒 ${lock === 'Đã nộp' ? 'Đã nộp' : 'Khóa ở ' + lock}</span>` : ''}</header>`;
  for (const t of st.tables) {
    if (t.t === 'p') { h += `<p class="dim gt">${esc(t.x)}</p>`; continue; }
    if (isRules(t)) { h += `<div class="scm-rules dim">${cellHtml(t.rows.map(r => r.join(' · ')).join('\n'))}</div>`; ti++; continue; }
    if (isTick(t)) {
      const ch = new Set(run.ans[`${n}.tick`] || []);
      h += `<div class="scm-tw"><table class="scm-tb scm-tick"><thead><tr><th>#</th><th>Statement</th><th>Tick</th></tr></thead><tbody>${t.rows.slice(1).map((r, i) => `<tr class="${ch.has(i + 1) ? 'on' : ''}"><td>${esc(r[0])}</td><td>${cellHtml(r[1])}</td><td><input type="checkbox" data-tick="${n}" data-row="${i + 1}" ${ch.has(i + 1) ? 'checked' : ''} ${lock ? 'disabled' : ''} aria-label="Tick ${esc(r[0])}"></td></tr>`).join('')}</tbody></table></div>`;
    } else {
      const head = t.rows[0].length > 0 ? t.rows[0] : null;
      h += `<div class="scm-tw"><table class="scm-tb scm-form"><thead><tr>${head.map(c => `<th>${cellHtml(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.slice(1).map((r, ri0) => { const ri = ri0 + 1; return `<tr>${r.map((c, ci) => {
        if (/^_{2,}$/.test(c.trim())) {
          const id = `${n}.${ti}.${ri}` + (ci !== 1 ? '.' + ci : ''), v = run.ans[id] ?? '', opts = optionsOf(t.rows, ri, ci), certOn = run.cert[id] ? 'checked' : '';
          const inp = opts ? `<select data-f="${id}" ${lock ? 'disabled' : ''}><option value="">—</option>${opts.map(o => `<option ${v === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>` : `<input type="text" inputmode="${/decimal|%|VND|USD|ratio|count|orders|days|month|k units|m\b|bn/i.test(r[ci + 1] || t.rows[0][ci + 1] || '') ? 'decimal' : 'text'}" data-f="${id}" value="${esc(v)}" ${lock ? 'disabled' : ''} autocomplete="off" spellcheck="false" aria-label="${esc(r[0])}">`;
          return `<td class="scm-in">${inp}<label class="scm-cert" title="Đánh dấu chắc chắn: nếu sai bị trừ 5 điểm"><input type="checkbox" data-cert="${id}" ${certOn} ${lock ? 'disabled' : ''}>🎯</label></td>`;
        }
        return `<td>${cellHtml(c)}</td>`;
      }).join('')}</tr>`; }).join('')}</tbody></table></div>`;
    }
    ti++;
  }
  return h + '</section>';
}
function timerHtml(cs, run) {
  if (isFree(run)) return `<div class="scm-tm"><b>🧘 Chế độ tự do</b><span class="dim">Không có giờ giới hạn. Bấm “Nộp bài” khi xong.</span></div>`;
  const e = elapsed(run), left = cs.hours - e;
  const rows = cs.ms.map(m => { const dleft = m.h - e, st = dleft <= 0 ? 'past' : cs.ms.find(x => x.h > e) === m ? 'cur' : 'next'; return `<li class="${st}"><b>${m.id}</b> ${esc(m.name)} <span class="dim">· khóa bước ${m.steps.join(', ')}</span><span class="grow"></span><span class="scm-cd" data-h="${m.h}">${dleft <= 0 ? '✓ đã khóa' : fmtD(realMs(run, dleft))}</span></li>`; }).join('');
  return `<div class="scm-tm"><div class="scm-clock"><span data-art="clock" data-sc="2"></span><b>Còn <span id="scmLeft">${fmtD(realMs(run, left))}</span></b><span class="dim">/ ${cs.days} ngày · ${SPEEDS[run.speed][0]}</span></div><div class="scm-bar"><i id="scmBar" style="width:${Math.min(100, 100 * e / cs.hours)}%"></i>${cs.ms.map(m => `<u style="left:${100 * m.h / cs.hours}%" title="${m.id}"></u>`).join('')}</div><ul class="scm-ms">${rows}</ul></div>`;
}
function drawPlay(cs, run) {
  const filled = cs.steps.map(st => stepAnswered(st, run));
  const tab = S.tab;
  root.innerHTML = `<div class="scm-top"><button class="btn" data-go="home">← Danh sách case</button><b class="grow">${cs.code} · ${esc(cs.name)}</b></div>
    <div class="scm-tmwrap" id="scmTm">${timerHtml(cs, run)}</div>
    <div class="seg scm-tabs"><button data-tab="file" class="${tab === 'file' ? 'on' : ''}">📁 Hồ sơ</button><button data-tab="form" class="${tab === 'form' ? 'on' : ''}">📝 Làm bài <small>${filled.filter(Boolean).length}/${cs.steps.length}</small></button></div>
    <div id="scmFile" ${tab === 'file' ? '' : 'hidden'}><p class="gt scm-brief"><b>Brief.</b> ${esc(cs.brief)}</p>${fileHtml(cs, run)}</div>
    <div id="scmForm" ${tab === 'form' ? '' : 'hidden'}>${cs.steps.map(st => stepHtml(cs, run, st)).join('')}<div class="row scm-submit"><button class="btn primary" data-act="submit">📤 Nộp bài và chấm điểm</button><button class="btn danger" data-act="abandon">Bỏ case này</button></div></div>`;
  paintIcons(root); startTimer(cs, run);
}
function stepAnswered(st, run) { const n = st.n; if ((run.ans[`${n}.tick`] || []).length) return true; return Object.keys(run.ans).some(k => k.startsWith(n + '.') && !k.includes('tick') && String(run.ans[k]).trim() !== ''); }
function startTimer(cs, run) {
  clearInterval(timer); if (isFree(run)) return; let lastKey = lockKey(cs, run);
  timer = setInterval(() => {
    if (!active || document.body.dataset.view !== 'scm' || S.home) return;
    const r = DOC.runs[S.code]; if (!r || r.sub) return;
    const e = elapsed(r), left = cs.hours - e;
    if (left <= 0) { clearInterval(timer); toast('⏰ Hết giờ: bài được nộp tự động'); submit(true); return; }
    const L = $('#scmLeft', root); if (L) L.textContent = fmtD(realMs(r, left)); const B = $('#scmBar', root); if (B) B.style.width = Math.min(100, 100 * e / cs.hours) + '%';
    $$('.scm-cd', root).forEach(el => { const d = +el.dataset.h - e; el.textContent = d <= 0 ? '✓ đã khóa' : fmtD(realMs(r, d)); });
    const k = lockKey(cs, r); if (k !== lastKey) { lastKey = k; toast('🔔 Một mốc vừa đến: xem lại các bước bị khóa hoặc phần cập nhật'); const keep = S.tab; draw().then(() => { S.tab = keep; }); }
  }, 1000);
}
const lockKey = (cs, run) => cs.ms.map(m => (elapsed(run) >= m.h ? 1 : 0)).join('') + (updVisible(cs, run) ? 'u' : '');

// ---------- kết quả ----------
function solHtml(cs) { let h = ''; for (let i = 0; i < cs.sol.length; i++) { const b = cs.sol[i]; if (b.t === 'h') h += `<h4 class="scm-ex">${esc(b.x)}</h4>`; else h += blockHtml(b, cs.sol[i + 1]); if (b.t === 'img' && cs.sol[i + 1] && /^Figure/.test(cs.sol[i + 1].x || '')) i++; } return h; }
function drawResult(cs, run) {
  clearInterval(timer); timer = 0; const r = run.res, why = !r.valid ? '⛔ Quyết định không hợp lệ (vi phạm giới hạn của case): không qua màn.' + (r.why ? ' ' + r.why : '') : r.stars === 0 ? 'Chưa đủ 60 điểm.' : '';
  const need = r.stars === 3 ? '' : r.stars === 2 ? 'Để đạt ★★★: ≥ 90 điểm và chọn đúng phương án tối ưu.' : r.stars === 1 ? 'Để đạt ★★: ≥ 75 điểm và chất lượng quyết định ≥ 80%.' : 'Để đạt ★: ≥ 60 điểm và quyết định hợp lệ.';
  root.innerHTML = `<div class="scm-top"><button class="btn" data-go="home">← Danh sách case</button><b class="grow">${cs.code} · ${esc(cs.name)}</b></div>
    <div class="scm-res"><div class="scm-rm"></div><div class="scm-rbig"><div class="scm-score">${r.total}<small>/100</small></div>${stars(r.stars, 3)}</div><div class="scm-rinfo"><b>${r.stars ? ['', 'Qua màn!', 'Làm tốt!', 'Xuất sắc!'][r.stars] : 'Chưa qua màn'}</b><span>Chất lượng quyết định: <b>${r.valid ? r.dq + '%' : 'không hợp lệ'}</b></span>${r.penalty ? `<span class="dim">Trừ ${r.penalty} điểm vì đánh dấu 🎯 chắc chắn nhưng sai.</span>` : ''}<span class="dim">${esc(why)} ${esc(need)}</span></div></div>
    <h4 class="scm-ex">Điểm từng bước</h4><div class="scm-tw"><table class="scm-tb"><thead><tr><th>Bước</th><th>Điểm</th><th>Chi tiết</th></tr></thead><tbody>${r.steps.map(s => `<tr><td>Bước ${s.n}: ${esc(cs.steps.find(x => x.n === s.n).title.replace(/\s*\(.*$/, ''))}</td><td><b>${s.got}</b> / ${s.P}</td><td>${s.detail.filter(d => d.t).map(d => `<span class="scm-dt ${d.ok ? 'ok' : 'bad'}">${esc(d.lab)}</span>`).join('') || (s.detail.length ? `${s.detail.filter(d => d.ok).length}/${s.detail.length} ô đúng${s.detail.some(d => d.part === 0.6) ? ' (có ô được 60% vì tính tiếp)' : ''}` : '')}</td></tr>`).join('')}</tbody></table></div>
    <div class="row"><button class="btn primary" data-act="retry">🔁 Chơi lại case này</button><button class="btn" data-go="home">Danh sách case</button><button class="btn" data-act="togglesol">${S.sol ? 'Ẩn lời giải' : '📖 Xem lời giải chi tiết'}</button></div>
    ${S.sol ? `<div class="scm-sol">${solHtml(cs)}</div>` : ''}`;
  paintIcons(root); const m = $('.scm-rm', root); if (m) m.append(mascot(6));
}

// ---------- hành động ----------
async function startCase(code) {
  const sp = ($('input[name=scmSp]:checked', root) || {}).value || DOC.speed; DOC.speed = sp;
  DOC.runs[code] = { start: Date.now(), speed: sp, ans: {}, cert: {}, sub: false, t: Date.now() }; S.tab = 'file'; S.sol = false; save(); sfx.play('unlock'); await draw();
}
function submit(auto) {
  const cs = DATA[S.code], run = DOC.runs[S.code]; if (!run || run.sub) return;
  if (!auto) { const un = cs.steps.filter(st => !stepAnswered(st, run)).length; if (!confirm(un ? `Còn ${un} bước chưa điền. Nộp bài ngay? (ô trống tính 0 điểm)` : 'Nộp bài và chấm điểm? Sau khi nộp không sửa được.')) return; }
  const res = grade(cs, run); run.res = res; run.sub = true; run.t = Date.now();
  const old = DOC.best[cs.code] || 0; if (res.stars > old) { DOC.best[cs.code] = res.stars; const gain = reward(cs.code, res.stars) - reward(cs.code, old); toast(`${'⭐'.repeat(res.stars)} ${cs.code}: ${res.stars} sao! +${gain} xu`, 4500); sfx.play('reward'); }
  save(); bus.emit('lamefx', res.stars >= 2 ? 'cheer' : res.stars === 1 ? 'ok' : 'bad'); S.sol = false; draw();
}
function onInput(e) {
  const run = DOC.runs[S.code]; if (!run || run.sub) return; const t = e.target;
  if (t.dataset.f) { run.ans[canon(t.dataset.f)] = t.value; } else if (t.dataset.cert) { if (t.checked) run.cert[canon(t.dataset.cert)] = true; else delete run.cert[canon(t.dataset.cert)]; }
  else if (t.dataset.tick) { const k = `${t.dataset.tick}.tick`, set = new Set(run.ans[k] || []); if (t.checked) set.add(+t.dataset.row); else set.delete(+t.dataset.row); run.ans[k] = [...set].sort((a, b) => a - b); t.closest('tr')?.classList.toggle('on', t.checked); }
  else return;
  run.t = Date.now(); save();
}
function onClick(e) {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.case) { S.home = false; S.code = b.dataset.case; S.sol = false; S.tab = 'file'; draw(); window.scrollTo(0, 0); return; }
  if (b.dataset.go === 'home') { S.home = true; S.code = ''; draw(); window.scrollTo(0, 0); return; }
  if (b.dataset.tab) { S.tab = b.dataset.tab; $$('.scm-tabs button', root).forEach(x => x.classList.toggle('on', x === b)); $('#scmFile', root).hidden = S.tab !== 'file'; $('#scmForm', root).hidden = S.tab !== 'form'; window.scrollTo(0, 0); return; }
  const a = b.dataset.act; if (!a) return;
  if (a === 'start') startCase(S.code);
  else if (a === 'submit') submit(false);
  else if (a === 'abandon') { if (confirm('Bỏ lượt chơi này? Mọi câu trả lời sẽ mất (sao đã có vẫn giữ).')) { delete DOC.runs[S.code]; save(); draw(); } }
  else if (a === 'retry') { delete DOC.runs[S.code]; save(); S.sol = false; draw(); window.scrollTo(0, 0); }
  else if (a === 'togglesol') { S.sol = !S.sol; draw(); }
}

// ---------- khởi tạo ----------
export function init() {
  root = $('#scmRoot'); if (!root) return;
  root.addEventListener('click', onClick); root.addEventListener('input', onInput); root.addEventListener('change', e => {
    if (e.target.id === 'scmSpeed') { DOC.speed = e.target.value; save(); } else if (e.target.id === 'scmAll') { DOC.all = e.target.checked; save(); draw(); } else onInput(e);
  });
  bus.on('show', v => { active = v === 'scm'; if (active) { pull(); draw(); } else clearInterval(timer); });
  bus.on('store', c => { if (c === 'prefs' || c === '*') pull(); });
  bus.on('flush', () => { clearTimeout(saveT); if (dirty) push(); }); // trước khi sao lưu: đẩy nốt dữ liệu còn chờ
}
export { KEYS };
