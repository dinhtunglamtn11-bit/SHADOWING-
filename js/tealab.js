// TeaLab: giao diện game (tab “🍵 TeaLab” cạnh chọn ngôn ngữ). Vào game là chỉ còn game: thanh Passport / Thư viện / Ôn tập… và chọn ngôn ngữ được ẩn,
// vẫn giữ nút ← (back), âm thanh và cài đặt. Bố cục theo đặc tả mục 3.9: thanh trên 6 số, cảnh cửa hàng, MỘT bảng hành động theo pha, hàng 6 nút công cụ;
// lịch / thư / thành tích / máy tính / báo cáo / menu là cửa sổ nổi (mỗi lúc một cái; máy tính được mở chồng lên ô đang nhập).
import { $, $$, esc, toast, bus } from './util.js';
import { HUD_HELP } from './tl-guide.js';
import { uiLang, tr } from './i18n.js';
import { archive, mergeLife, mergeProfile, ensureProfile } from './tl-hist.js';
import * as store from './store.js';
import * as E from './tl-engine.js';
import * as O from './tl-ops.js';
import * as D from './tl-data.js';
import * as A from './tl-art.js';
import * as W from './tl-win.js';
import { SSTART, SNAME } from './tl-data.js';

const KEY = 'tealab:v1';
export const G = { st: null, S: null, profile: null, speed: 1, paused: false, win: null, calc: false, acc: 0, last: 0, t: 0, vis: [], feed: [], sec: 'prices', sup: 'A', ord: {}, lastInput: null, alive: false, root: null, raf: 0, busy: false, tip: 0, openUrgent: -1 };
const PROFILE0 = () => ({ coinsPrev: 0, best: {}, badges: {}, runs: 0, bestSeason: 0 });
const kfmt = v => (Math.round(v / 1000)).toLocaleString('vi-VN') + 'k';
const k1 = v => (Math.round(v / 100) / 10).toLocaleString('vi-VN') + 'k';
export { kfmt, k1 };
const pad = n => String(n).padStart(2, '0');

// ---------- lưu / tải ----------
function save(sync) {
  try {
    const pf = G.profile; pf.live = G.st ? G.st.coins || 0 : 0; mergeLife(pf, G.st, D); // thành tích đã đạt luôn được giữ trong hồ sơ
    localStorage.setItem(KEY, JSON.stringify({ v: 1, profile: pf, st: G.st, S: G.S ? { ...G.S, snap: null, out: [] } : null }));
    localStorage.setItem('tealab:coins', String((pf.coinsPrev || 0) + (G.st ? G.st.coins || 0 : 0)));
  } catch (e) { toast('Không lưu được TeaLab: ' + (e.message || e), 3500); }
  if (sync) syncSoon();
}
let syncT = 0;
function syncSoon() { clearTimeout(syncT); syncT = setTimeout(() => { try { const o = JSON.parse(localStorage.getItem(KEY)); const s = JSON.stringify(o); if (s.length < 700000) store.put('prefs', 'tealab', { json: s, t: Date.now() }); } catch { /* bỏ qua */ } }, 4000); }
function load() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (o && o.v === 1) { G.profile = o.profile || PROFILE0(); G.st = o.st; G.S = o.S; }
  } catch { /* bỏ qua */ }
  G.profile ||= PROFILE0(); ensureProfile(G.profile);
  if (G.st) { E.ensure(G.st); G.st.runId ||= Date.now(); G.st.t0 ||= G.st.runId; mergeLife(G.profile, G.st, D); } // bản lưu cũ: gắn mã lượt, gộp thành tích vào hồ sơ // bản lưu cũ: bổ sung món / nguyên liệu / trường mới
}
function pullRemote() { // bản lưu từ máy khác: lấy bản có nhiều ngày hơn
  const r = store.get('prefs', 'tealab'); if (!r || !r.json || G.alive && G.st && G.st.phase === 'LIVE') return;
  try { const o = JSON.parse(r.json); const l = G.st, rt = o?.st?.t0 || o?.st?.runId || 0, lt = l?.t0 || 0; // lượt mới hơn thắng; cùng lượt thì lấy bản đi xa hơn (không để bản cũ đè lượt vừa chơi lại)
    const ri = o?.st?.imp || 0, li = l?.imp || 0; // bản vừa nhập tay (imp) được ưu tiên hơn bản đồng bộ cũ
    if (o && o.st && (!l || (l.silent && !l.sessionsPlayed && o.st.sessionsPlayed > 0) || (ri !== li ? ri > li : rt === lt ? o.st.day > l.day : rt > lt && !o.st.silent))) { G.profile = mergeProfile(G.profile, o.profile); G.st = E.ensure(o.st); G.st.runId ||= Date.now(); G.st.t0 ||= G.st.runId; G.S = o.S; if (G.root) render(); } } catch { /* bỏ qua */ }
}

// ---------- vòng chơi ----------
function newGame(diff = 'chuan') {
  if (G.st && G.st.season) { G.profile.runs++; G.profile.coinsPrev += G.st.coins || 0; G.profile.bestSeason = Math.max(G.profile.bestSeason, G.st.season.score); } else if (G.st && G.st.day > 1) { G.profile.coinsPrev += G.st.coins || 0; }
  archive(G.profile, G.st, E, D); // ghi lượt vừa chơi vào lịch sử; kỷ lục (sao, huy hiệu) vẫn được giữ
  const imp = G.st?.imp; G.st = E.newRun({ seed: 20261201, diff }); if (imp) G.st.imp = imp; G.st.runId = Date.now(); G.st.t0 = G.st.runId; G.st.dayReps = []; E.beginSession(G.st); G.S = null; G.ord = {}; G.sec = 'prices'; G.win = null; G.feed = []; G.vis = [];
  save(true); render();
}
const st = () => G.st;
function pausedNow() { return G.paused || !!G.win || G.calc || document.hidden; }
function goLive() {
  const s = st(); if (s.phase !== 'PREP') return;
  G.S = E.startLive(s); G.vis = []; G.feed = []; G.paused = false; G.acc = 0; G.openUrgent = -1; save(false); render();
}
function skipSession() { const s = st(); if (s.phase !== 'PREP') return; s.flags['closed' + s.day + s.k] = 1; G.S = E.startLive(s); G.S.open = false; G.S.tick = G.S.len; finish(); }
function openAnyway() { const s = st(); s.flags['open' + s.day + s.k] = 1; goLive(); }
function finish() {
  const s = st(), S = G.S; E.finishSession(s, S, false); G.lastS = S; G.wi = {}; G.cmSeen = 0; G.S = null; G.vis = []; G.paused = false; save(true); render();
  const r = s.lastReport; if (r && r.fc && r.fc.hit) toast('🔮 Dự đoán trúng: +1 IP', 2200);
}
function nextSession() { const s = st(), res = E.nextSession(s); G.sec = 'prices'; save(true); render(); checkUrgent(); return res; }
function sleep() {
  const s = st(); if (s.phase === 'LIVE') return; const day = s.day;
  G.busy = true; render(); // màn chuyển cảnh “đi ngủ”
  setTimeout(() => {
    const res = E.sleep(s); G.busy = false; G.S = null; G.vis = []; save(true); G.dayRes = res; render(); W.afterDay?.(ctx, res);
    for (const x of res.stars || []) toast(`${'⭐'.repeat(x.stars)} ${x.id} · ${x.name}`, 2600);
    if ((res.stars || []).length) burst(res.stars.reduce((a, x) => a + x.stars, 0));
    if (res.xu) toast(`+${res.xu} xu từ lợi nhuận hôm nay`, 2000);
    checkUrgent();
  }, 900);
}
function burst(n) { // hiệu ứng nhận sao: chùm sao bay lên vài giây (không chặn thao tác)
  const root = $('#tlRoot'); if (!root) return; const b = document.createElement('div'); b.className = 'tl-burst'; b.setAttribute('aria-hidden', 'true');
  b.innerHTML = Array.from({ length: Math.min(14, 5 + n * 2) }, (_, i) => `<i style="--dx:${Math.round(Math.cos(i * 2.4) * 90)}px;--dy:${-70 - (i % 4) * 28}px;--d:${(i % 5) * 60}ms">${A.ic('star', 22)}</i>`).join('');
  root.appendChild(b); setTimeout(() => b.remove(), 1800);
}
function checkUrgent() { const s = st(); if (s.phase !== 'PREP') return; const urgent = E.openDecisions(s).filter(m => m.t >= E.tau(s.day, 0) && G.openUrgent !== s.day * 10 + s.k); if (urgent.length && !G.win) { G.openUrgent = s.day * 10 + s.k; openWin('mail'); } }

// ---------- cửa sổ nổi ----------
export function openWin(name) { if (G.win === name) { closeWin(); return; } G.win = name; if (G.calc) G.calc = false; renderWin(); applyPause(); }
export function closeWin() { const was = G.win; G.win = null; renderWin(); applyPause(); if (was === 'pol') panel(); }
function applyPause() { /* đồng hồ tự dừng khi có cửa sổ (pausedNow) */ const b = $('#tlRoot'); if (b) b.classList.toggle('tl-paused', pausedNow() && st()?.phase === 'LIVE'); }
function renderWin() {
  const box = $('#tlWin'); if (!box) return;
  box.classList.toggle('open', !!G.win); box.hidden = !G.win;
  if (!G.win) { box.innerHTML = ''; box.dataset.cur = ''; $$('#tlTools button').forEach(b => b.classList.remove('on')); return; }
  const same = box.dataset.cur === G.win && box.firstElementChild; // vẽ lại cùng cửa sổ (đổi tab, bấm nút): không chạy lại hiệu ứng trượt
  const sc = same ? box.querySelector('.tl-wb')?.scrollTop || 0 : 0, sc2 = same ? box.firstElementChild.scrollTop : 0;
  box.innerHTML = W.render(G.win, ctx); if (sc) { const wb = box.querySelector('.tl-wb'); if (wb) wb.scrollTop = sc; } if (sc2 && box.firstElementChild) box.firstElementChild.scrollTop = sc2; box.dataset.cur = G.win; if (same) box.firstElementChild?.classList.add('noanim');
  $$('#tlTools button').forEach(b => b.classList.toggle('on', b.dataset.w === G.win)); W.bind?.(G.win, box, ctx);
}
const SLOTKEY = 'tealab:slots';
export const slots = () => { try { return JSON.parse(localStorage.getItem(SLOTKEY) || '[]'); } catch { return []; } };
const saveSlots = a => { try { localStorage.setItem(SLOTKEY, JSON.stringify(a.slice(0, 6))); } catch (e) { toast('Không lưu được số liệu: ' + (e.message || e), 3000); } };
function saveData(name) { // lưu số liệu (không lưu bản chơi): sổ ngày hiện tại để xem lại, so sánh và xuất CSV
  const s = G.st; const a = slots(); a.unshift({ id: Date.now() % 1e9, name: name || `Ngày ${s.day}`, t: Date.now(), day: s.day, stage: s.stage, hist: s.hist.map(h => ({ day: h.day, rev: h.rev, cogs: h.cogs, spoil: h.spoil, fixed: h.fixed, wage: h.wage, profit: h.profit, cups: h.cups, ls: h.ls, lw: h.lw, rep: Math.round(h.rep * 10) / 10, cash: h.cash, hold: h.hold || 0, other: h.other || 0, stage: h.stage })) }); saveSlots(a); return a[0];
}
const ctx = { slots, saveData, delSlot: id => saveSlots(slots().filter(x => x.id !== id)), G, E, D, A, get st() { return G.st; }, kfmt, k1, openWin, closeWin, save, newGame, sleep, refresh: () => { hud(); panel(); renderWin(); }, toast, render: () => render(), openCalc: () => toggleCalc(true) };

// ---------- máy tính (cửa sổ chồng) ----------
function toggleCalc(on) { G.calc = on ?? !G.calc; const c = $('#tlCalc'); if (!c) return; c.hidden = !G.calc; if (G.calc) { c.innerHTML = W.calcHtml(ctx); W.calcBind(c, ctx); } applyPause(); $$('#tlTools button[data-w="calc"]').forEach(b => b.classList.toggle('on', G.calc)); }

// ---------- vẽ khung chính ----------
export function mount(root) {
  G.root = root; load(); if (!G.st) { G.profile ||= PROFILE0(); newGameSilent(); }
  root.innerHTML = `<div id="tlRoot" class="tl">
    <div class="tl-hud" id="tlHud"></div>
    <div class="tl-main">
      <div class="tl-left"><div class="tl-scene"><canvas id="tlCv" width="${A.SCENE_W}" height="${A.SCENE_H}"></canvas><div class="tl-tags" id="tlTags"></div><button class="tl-viewbtn" id="tlView" title="Xem bên ngoài / bên trong tiệm">🏠 Vào trong</button></div></div>
      <div class="tl-right"><div class="tl-panel" id="tlPanel"></div></div>
    </div>
    <div class="tl-tools" id="tlTools">
      <button data-w="calendar">${A.ic('cal', 22)}<span>Lịch</span></button>
      <button data-w="mail">${A.ic('mail', 22)}<span>Thư</span><em id="tlMailBadge" hidden></em></button>
      <button data-w="ach">${A.ic('trophy', 22)}<span>Thành tích</span></button>
      <button data-w="calc">${A.ic('calc', 22)}<span>Máy tính</span></button>
      <button data-w="report">${A.ic('report', 22)}<span>Báo cáo</span></button>
      <button data-w="menu">${A.ic('menu', 22)}<span>Menu</span></button>
    </div>
    <div class="tl-calc" id="tlCalc" hidden></div>
    <div class="tl-win" id="tlWin" hidden></div>
    <div class="tl-fade" id="tlFade" hidden></div>
  </div>`;
  bindRoot(root); G.cv = $('#tlCv'); G.g = G.cv.getContext('2d'); G.g.imageSmoothingEnabled = false; render();
}
function newGameSilent() { G.st = E.newRun({ seed: 20261201, diff: 'chuan' }); G.st.silent = 1;G.st.runId = Date.now(); G.st.t0 = G.st.runId; G.st.dayReps = []; E.beginSession(G.st); }
export function render() { hud(); panel(); renderWin(); fade(); drawNow(); }
function fade() { const f = $('#tlFade'); if (f) { f.hidden = !G.busy; f.innerHTML = G.busy ? `<div>${A.illus('sleep')}<p>Đi ngủ…</p><small>Các buổi còn lại chạy theo kế hoạch đứng.</small></div>` : ''; } }
const clockText = () => { const s = st(), S = G.S; const k = s.k, base = SSTART[k]; if (s.phase === 'LIVE' && S) { const m = S.tick; return `${pad(base + Math.floor(m / 60))}:${pad(m % 60)}`; } if (s.phase === 'REVIEW') return `${pad(base + (k === 4 ? 2 : 4))}:00`; return `${pad(base)}:00`; };
const hudMoney = v => (Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(Math.abs(v) >= 1e8 ? 0 : 1).replace('.', ',') + (uiLang === 'vi' ? 'tr' : 'M') : kfmt(v)); // thanh trên: 240,0tr thay vì 240.028k cho gọn
export function hud() {
  const h = $('#tlHud'), s = st(); if (!h || !s) return; const card = E.dayCard(s.day), dt = card.date;
  const dayTxt = s.day > 90 ? 'N' + s.day : 'N' + s.day, wk = (uiLang === 'vi' ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])[card.dow];
  const chip = (id, icon, val, sub, cls = '') => `<div class="hc ${cls}" id="${id}">${A.ic(icon, 20)}<b>${val}</b><small>${sub}</small></div>`;
  h.innerHTML = chip('hD', 'day', dayTxt, `${wk} ${pad(dt.dd)}/${pad(dt.m)}`) + chip('hT', 'clock', clockText(), 'giờ game') + chip('hK', s.k >= 3 ? 'moon' : 'sun', 'S' + (s.k + 1), D.SNAME[s.k]) + chip('hM', 'coin', hudMoney(s.cash), 'tiền', s.cash < 0 ? 'bad' : '') + chip('hA', 'bolt', s.ap, 'AP', s.phase === 'LIVE' && s.ap < 2 ? 'low' : '') + chip('hR', 'rep', Math.round(s.rep), 'uy tín R');
  const tb = $('#tlTools'); if (tb && tb.offsetHeight) tb.parentElement.style.setProperty('--tltools', tb.offsetHeight + 'px'); // thanh “Xong/Mở cửa” dính ngay trên hàng công cụ, không để hở
  const n = E.unreadCount(s), b = $('#tlMailBadge'); if (b) { b.hidden = !n; b.textContent = n > 9 ? '9+' : n; }
  tags();
}
function tags() {
  const t = $('#tlTags'), s = st(); if (!t || !s) return; const card = E.dayCard(s.day), w = card.w, T = E.tempAt(w, s.k);
  const sky = (E.rainAt(w, s.day, s.k) ? 'rain' : w.drizzle ? 'drizzle' : w.cold ? 'cold' : w.hot ? 'hot' : ['gloom', 'humid', 'cloud', 'monsoon', 'showers'].includes(w.sky) ? 'cloud' : 'sun');
  const f = E.forecast(s.day, s.k, s.seed);
  t.innerHTML = `<span class="tg">${A.ic(sky, 16)} ${Math.round(T)}°C</span><span class="tg dim">${esc(D.SKY_NAME[w.sky] || '')}</span>${card.note ? `<span class="tg note">${esc(card.note[0])}</span>` : ''}${s.phase === 'PREP' ? `<span class="tg dim">Dự báo ${Math.round(f.lo)}–${Math.round(f.hi)}°C · mưa ${Math.round(f.pRain * 100)}%</span>` : ''}`;
}

// ---------- bảng hành động theo pha ----------
function panel() {
  const p = $('#tlPanel'), s = st(); if (!p || !s) return;
  let html;
  if (G.busy) html = '<div class="empty">…</div>';
  else if (s.phase === 'PREP') html = prepHtml(s);
  else if (s.phase === 'LIVE') html = liveHtml(s);
  else if (s.phase === 'REVIEW') html = reviewHtml(s);
  else if (s.phase === 'DAYEND') html = dayEndHtml(s);
  else html = finalHtml(s);
  p.innerHTML = html; bindPanel(p);
}
const sec = (id, title, body, badge = '') => `<section class="tl-sec ${G.sec === id ? 'open' : ''}" data-sec="${id}"><button class="tl-sech" data-a="sec" data-v="${id}"><span>${title}</span>${badge ? `<em>${badge}</em>` : ''}<i>${G.sec === id ? '▲' : '▼'}</i></button>${G.sec === id ? `<div class="tl-secb">${body}</div>` : ''}</section>`;
const inShop = (s, i) => D.inSeason(i, s.day) || D.inSeason(i, s.day + 6); // món theo mùa: hiện từ 6 ngày trước mùa đến hết mùa
const menuItems = s => D.ITEM_ORDER.filter(i => D.ITEMS[i].stage <= s.stage && inShop(s, i));
function priceRows(s, live) {
  const items = menuItems(s).filter(i => s.menu[i] || !live), maxOn = D.PARAMS.items[s.stage], on = D.ITEM_ORDER.filter(i => s.menu[i] && !D.ITEMS[i].seasonal).length, ex = s.exp && !s.exp.done ? s.exp.item : '';
  return items.map(i => {
    const it = D.ITEMS[i], p = s.prices[i], cost = E.unitCost(s, i), lo = Math.ceil(it.p * 0.7), hi = Math.floor(it.p * 1.5), avail = it.ing.every(g => qOf(s, g, 'a') > 0);
    return `<div class="tl-row ${s.menu[i] ? '' : 'off'}"><span class="tl-ico">${A.cup(i, 28)}</span><div class="tl-nm"><b>${esc(it.name)}</b>${G.profile?.zh ? `<span class="zh" lang="zh">${esc(it.zh)}</span>` : ''}<small class="dim">${it.temp === 'hot' ? 'nóng' : 'lạnh'} · ref ${it.p}k · vốn ${k1(cost)} · lãi ${k1(p * 1000 - cost)}${avail ? '' : ' · <u class="bad">thiếu hàng</u>'}</small></div>
      ${s.menu[i] ? (ex === i ? `<span class="chip on" title="Đang thử nghiệm giá ${s.exp.pa}k ↔ ${s.exp.pb}k">🧪 ${s.exp.pa}k↔${s.exp.pb}k</span>` : `<div class="tl-step"><button class="btn" data-a="pm" data-i="${i}" data-d="-1" aria-label="giảm giá">−</button><input class="tl-num" data-calc="price" data-i="${i}" type="text" inputmode="numeric" value="${p}" aria-label="Giá ${esc(it.name)}"><button class="btn" data-a="pm" data-i="${i}" data-d="1" aria-label="tăng giá">＋</button></div><small class="dim tl-rng">${lo}–${hi}k</small>`) : ''}
      ${(s.stage >= 2 || it.seasonal) && !live ? `<button class="btn tl-tg ${s.menu[i] ? 'on' : ''}" data-a="menu" data-i="${i}" ${!s.menu[i] && !it.seasonal && on >= maxOn ? 'disabled' : ''}>${s.menu[i] ? '☑' : '☐'}</button>` : ''}</div>`;
  }).join('');
}
function avgUse(s, g) { const h = s.hist.slice(-5); if (!h.length) return 0; let q = 0; for (const d of h) for (const [it, n] of Object.entries(d.by || {})) if (D.ITEMS[it]?.ing.includes(g)) q += n; return q / h.reduce((a, d) => a + (d.n || 4), 0); }
function stockLine(s, g) { // kho kèm biểu tượng trạng thái: đủ, sắp hết, hết, gần hết hạn
  const b2 = G.br === 'B' && s.b2, q = b2 ? E.stockB(s, g) : E.stockOf(s, g), near = b2 ? 0 : E.lotsNear(s, g, s.day), use = avgUse(s, g) * (s.b2 ? (b2 ? 0.25 : 0.75) : 1);
  const st = q <= 0 ? 'stOut' : near && ING_FRESH(g) && near >= q * 0.5 ? 'stSoon' : use && q < use ? 'stLow' : 'stOk';
  return `${A.ic(st, 14)} ${q}${near && ING_FRESH(g) ? ` <u class="bad" title="hết hạn hôm nay hoặc ngày mai">⏳${near}</u>` : ''}`;
}
const ING_FRESH = g => D.ING[g].grp === 'fresh';
// ---------- luật kho v2: sức chứa, điều kiện đặt, công nợ ----------
function capHtml(s) {
  const br = G.br === 'B' && s.b2 ? 'B' : 'A';
  const bars = D.ZONES.map(z => { const cap = E.capOf(s, z, br), used = E.usedOf(s, z, br), pct = Math.min(100, Math.round(100 * used / cap)), Z = D.STORE.zone[z]; return `<div class="tl-cap ${pct >= 90 ? 'full' : ''}"><div><span>${A.ic('z' + z[0].toUpperCase() + z.slice(1), 18)} ${Z.name}</span><b>${used}/${cap}</b></div><div class="tl-bar"><i style="width:${pct}%"></i></div><small class="dim">trống ${E.freeOf(s, z, br)} · giữ ${Z.hold * 100}%/ngày</small></div>`; }).join('');
  const buy = Object.entries(E.EQUIP).filter(([, e]) => e.store).map(([id, e]) => `<div class="tl-row"><span class="tl-ico">${A.ic(id, 28)}</span><div class="tl-nm"><b>${esc(e.name)}</b><small class="dim">${esc(e.desc)}</small></div>${s.equip[id] ? '<span class="chip on">Đã có</span>' : `<button class="btn" data-a="equip" data-v="${id}" ${s.cash < e.price ? 'disabled' : ''}>${kfmt(e.price)}</button>`}</div>`).join('');
  const debts = (s.payables || []).map(p => `<span class="tl-debt"><span>NCC ${p.sup}</span> <b>${kfmt(p.amt)}</b> <span>hạn ${E.dayLabel(p.due)}</span></span>`).join('');
  return `<div class="tl-caps">${bars}</div><div class="dim tl-note">Phí giữ hàng hiện tại: <b>${kfmt(E.holdCost(s))}</b> mỗi ngày. Chỗ đang dùng tính cả hàng đang trên đường.</div>
    ${debts ? `<div class="tl-arr">🧾 <b>Công nợ:</b> ${debts}<br><small>Tự trừ tiền vào cuối ngày đến hạn.</small></div>` : ''}
    ${br === 'A' ? `<details class="tl-more" id="tlGrow" ${G.growOpen ? 'open' : ''}><summary>🔧 Mở rộng kho</summary>${A.illus('store')}${buy}</details>` : ''}`;
}
function termsHtml(s, sup) {
  const T = D.TERMS[sup], lead = sup === 'C' ? 'đặt trước 2 ngày, về S1' : `chờ ${T.lead} buổi`;
  const tiers = D.TIERS.slice().reverse().map(([q, d]) => `${q}+: −${Math.round(d * 100)}%`).join(' · ');
  const credit = !T.credit ? 'Không cho ghi nợ.' : E.creditOpen(s, sup) ? `Đã cho ghi nợ ${D.CREDIT.days} ngày (hạn mức còn ${kfmt(E.creditLeft(s))}). Trả ngay được giảm ${D.CREDIT.disc * 100}%.` : `Cho ghi nợ sau ${D.CREDIT.after} lần nhận hàng.`;
  return `<span>Thời gian giao: <b>${lead}</b>.</span> <span>Đặt tối thiểu: <b>${T.min ? kfmt(T.min) : 'không'}</b>.</span> <span>Phí giao ${kfmt(T.fee)}, miễn phí từ ${kfmt(T.free)}.</span><br><span>Giảm giá theo số phần mỗi mặt hàng:</span> <span>${tiers}.</span><br><span>${credit}</span>`;
}
const ordLines = () => Object.entries(G.ord).filter(([, q]) => q > 0).map(([g, q]) => ({ g, q }));
const payCredit = (s, sup) => G.pay === 'credit' && E.creditOpen(s, sup);
function ordSum(s, sup) { // dòng giải thích đơn đang soạn: tiền hàng, phí giao, còn thiếu gì
  if (!E.isV2(s)) return '';
  const Q = E.quote(s, sup, ordLines(), { credit: payCredit(s, sup), br: G.br }); if (!Q.lines.length) return '';
  const T = D.TERMS[sup], out = [`<span>Tiền hàng ${kfmt(Q.goods)} + phí giao ${kfmt(Q.fee)}</span>`];
  if (Q.fee) out.push(`<span class="dim">Thêm ${kfmt(T.free - Q.goods)} tiền hàng để miễn phí giao.</span>`);
  if (Q.short) out.push(`<u class="bad">Chưa đạt mức tối thiểu, thiếu ${kfmt(Q.short)}.</u>`);
  for (const z of Q.over) out.push(`<u class="bad">${D.STORE.zone[z].name} không đủ chỗ: cần ${Q.need[z]}, trống ${E.freeOf(s, z, Q.br)}.</u>`);
  return out.join('<br>');
}
function p3Change(t) { // ô của đợt 3: sơ chế và phân trạm
  const s = st(), res = r => { if (r && !r.ok) toast(r.reason, 2400); };
  if (t.dataset.p3 === 'role') res(E.cmd(s, G.S, { t: 'ASSIGN', id: t.dataset.id, role: t.value }));
  else { // ô số sơ chế: chỉ ghi lại, không vẽ lại bảng (giữ con trỏ khi chạm sang ô kế)
    const g = t.dataset.g, cur = E.prepPlan(s, g).set, v = String(t.value).trim(); res(E.cmd(s, G.S, { t: 'SET_PREP', g, ...cur, [t.dataset.k]: v === '' ? -1 : Math.max(0, Math.floor(+v.replace(',', '.') || 0)) }));
    const now = E.prepPlan(s, g).set[t.dataset.k]; t.value = now >= 0 ? now : ''; save(false); return;
  }
  save(false); panel();
}
function orderHtml(s) {
  const sups = Object.keys(D.SUPPLIERS).filter(x => D.SUPPLIERS[x].stage <= s.stage && (!D.SUPPLIERS[x].needFlag || s.flags[D.SUPPLIERS[x].needFlag])), sup = sups.includes(G.sup) ? G.sup : 'A', sd = D.SUPPLIERS[sup], arr = E.arrivalOf(s, sup);
  const rows = grp => D.ING_ORDER.filter(g => D.ING[g].grp === grp && (!sd.fresh || grp === 'fresh') && (D.ITEM_ORDER.some(i => s.stage >= D.ITEMS[i].stage && inShop(s, i) && D.ITEMS[i].ing.includes(g)) || g === 'ly')).map(g => {
    const price = E.unitPrice(s, sup, g), q = +(G.ord[g] || 0);
    return `<div class="tl-row"><span class="tl-ico">${A.ingIc(g, 22)}</span><div class="tl-nm"><b>${esc(D.ING[g].name)}</b>${G.profile?.zh ? `<span class="zh" lang="zh">${esc(D.ING_ZH[g] || '')}</span>` : ''}<small class="dim">kho ${stockLine(s, g)} · ${k1(price)}/phần</small></div><div class="tl-step"><input class="tl-num" data-calc="qty" data-g="${g}" type="text" inputmode="numeric" value="${q || ''}" placeholder="0" aria-label="Số phần ${esc(D.ING[g].name)}"><button class="btn" data-a="oq" data-g="${g}" data-d="10">+10</button><button class="btn" data-a="oq" data-g="${g}" data-d="50">+50</button></div></div>`;
  }).join('');
  const total = orderTotal(s, sup), v2 = E.isV2(s);
  const pay = v2 && E.creditOpen(s, sup) ? `<div class="tl-sups"><button class="chip ${G.pay !== 'credit' ? 'on' : ''}" data-a="pay" data-v="now">💵 Trả ngay (−${D.CREDIT.disc * 100}%)</button><button class="chip ${G.pay === 'credit' ? 'on' : ''}" data-a="pay" data-v="credit">🧾 Ghi nợ ${D.CREDIT.days} ngày</button></div>` : '';
  const brs = s.b2 ? `<div class="tl-sups"><button class="chip ${G.br !== 'B' ? 'on' : ''}" data-a="brsel" data-v="A">🏪 Chi nhánh 1</button><button class="chip ${G.br === 'B' ? 'on' : ''}" data-a="brsel" data-v="B">🏬 Chi nhánh 2</button></div>` : '';
  return `${brs}${v2 ? capHtml(s) : '<div class="dim tl-note">Lượt này đang theo luật kho cũ. Sức chứa kho, phí giữ hàng và công nợ có từ lượt chơi mới.</div>'}${pendingHtml(s)}<div class="dim tl-note">Không biết đặt bao nhiêu? <button class="btn" data-a="guidefm">📐 Công thức EOQ, ROP, NV</button></div><div class="tl-sups">${sups.map(x => `<button class="chip ${x === sup ? 'on' : ''}" data-a="sup" data-v="${x}">${A.ic('sup' + x, 16)} ${esc(D.SUPPLIERS[x].name)}</button>`).join('')}</div>
    <div class="dim tl-note">${esc(sd.note)}${v2 ? '' : ` Phí giao ${kfmt(sd.fee)}`}${sd.express ? ' · giao khẩn khi mở cửa' : ''}${v2 ? '' : '. ≥150 phần: giảm 10%.'}</div>
    ${v2 ? `<div class="dim tl-note tl-terms">${termsHtml(s, sup)}</div>` : ''}
    <div class="tl-arr ${arr.ok ? '' : 'bad'}">${arr.ok ? `${A.face('CO', 22)} Hàng đến: <b>${esc(arr.txt)}</b>` : `⚠ ${esc(sd.name)} đóng cửa vào ${esc(arr.txt)}: không đặt được.`}</div>
    <details class="tl-grp" open><summary>Nhóm tươi (hỏng nhanh)</summary>${rows('fresh') || '<div class="dim">Không có.</div>'}</details>
    ${sd.fresh ? '' : `<details class="tl-grp"><summary>Nhóm khô (để được lâu)</summary>${rows('dry')}</details>`}
    ${v2 ? `<div class="row"><button class="btn" data-a="win" data-v="pol">🤖 Đặt hàng tự động${Object.keys(s.pol?.A || {}).length ? ` (${Object.keys(s.pol.A).length})` : ''}</button></div>` : ''}${pay}<div class="tl-note" id="tlOrdSum">${ordSum(s, sup)}</div>
    <div class="row"><span class="grow">Tổng: <b id="tlOrdTotal">${total ? kfmt(total) : '0k'}</b></span><button class="btn primary" data-a="order" ${arr.ok ? '' : 'disabled'}>Đặt hàng</button></div>`;
}
function forecastHtml(s) {
  const a = E.avgCupsPerSession(s), f = s.forecast, last = s.lastReport;
  return `<div class="dim tl-note">Đoán khoảng 80% cho TỔNG SỐ LY của buổi này. Khoảng hẹp mà trúng được điểm cao hơn; trúng +1 IP. ${a ? `Trung bình 7 ngày gần nhất: <b>${a.toFixed(1)}</b> ly mỗi buổi.` : 'Chưa có số liệu: hãy chơi vài buổi trước.'}</div>
    ${f ? `<div class="tl-arr">Đã chốt: <b>${f.lo}–${f.hi}</b> ly</div>` : `<div class="tl-step"><label>Thấp <input class="tl-num" data-calc="fc" id="tlFl" type="text" inputmode="numeric" placeholder="vd 18"></label><label>Cao <input class="tl-num" data-calc="fc" id="tlFh" type="text" inputmode="numeric" placeholder="vd 32"></label><button class="btn" data-a="fc">Chốt</button></div>`}
    <div class="dim tl-note">Điểm hiệu chỉnh trung bình: ${s.cal.length ? Math.round(s.cal.reduce((x, y) => x + y[1], 0) / s.cal.length) : '—'} (${s.cal.length} dự đoán, trúng ${s.calHits}).</div>`;
}
function staffHtml(s) {
  const eq = Object.entries(E.EQUIP).filter(([, e]) => s.stage >= e.stage && !e.store).map(([id, e]) => `<div class="tl-row"><span class="tl-ico">${A.ic(id, 26)}</span><div class="tl-nm"><b>${esc(e.name)}</b><small class="dim">${esc(e.desc)}</small></div>${s.equip[id] ? '<span class="chip on">Đã có</span>' : `<button class="btn" data-a="equip" data-v="${id}" ${s.cash < e.price ? 'disabled' : ''}>${kfmt(e.price)}</button>`}</div>`).join('');
  const staff = s.staff.map(m => `<div class="tl-row"><span class="tl-ico">${A.face('ST', 30)}</span><div class="tl-nm"><b>${esc(m.name)}</b><small class="dim">${esc(m.trait)} · lương ${kfmt(m.wage)}/buổi · ${m.shifts >= 4 ? (m.skill > 1.1 ? 'làm nhanh' : m.skill < 0.95 ? 'làm chậm' : 'làm bình thường') : 'đang làm quen'}</small><div class="tl-bar"><i style="width:${Math.round(m.energy)}%"></i></div><small class="dim">sức ${Math.round(m.energy)} · tâm trạng ${m.mood > 65 ? '🙂' : m.mood > 40 ? '😐' : '😟'}</small></div>${O.roleSelect(s, m)}<button class="btn" data-a="fire" data-v="${m.id}">Cho nghỉ</button></div>`).join('') || '<div class="dim">Chưa có nhân viên. Tuyển người để mở trạm thu ngân.</div>';
  const cand = s.cand.map(c => `<div class="tl-row"><span class="tl-ico">${A.face('ST', 30)}</span><div class="tl-nm"><b>${esc(c.name)}</b><small class="dim">${esc(c.trait)} · lương ${kfmt(c.wage)}/buổi${c.seen ? ` · tay nghề ≈ ${c.skill > 1.1 ? 'giỏi' : c.skill < 0.95 ? 'yếu' : 'khá'}` : ''}</small></div>${c.seen ? '' : `<button class="btn" data-a="intv" data-v="${c.id}">Phỏng vấn</button>`}<button class="btn primary" data-a="hire" data-v="${c.id}" ${s.staff.length >= D.PARAMS.staffMax[s.stage] ? 'disabled' : ''}>Thuê</button></div>`).join('') || '<div class="dim">Chưa có ứng viên mới (mỗi 3 ngày có thêm).</div>';
  const note = s.stage >= 3 ? '<div class="dim tl-note">Giai đoạn 3: người thứ nhất làm thu ngân, người thứ hai chuyên giao hàng (cần xe giao hàng), còn lại pha chế cùng Lame.</div>' : '';
  return `${E.isV3(s) ? A.illus('stations') : ''}<h4>Nhân viên (${s.staff.length}/${D.PARAMS.staffMax[s.stage]})</h4>${note}${staff}<h4>Ứng viên</h4>${cand}<h4>Thiết bị</h4>${eq}`;
}
function upgradeHtml(s) {
  const u = E.upgradeStatus(s);
  const info = { 2: 'thêm 4 món, nhân viên, trạm thu ngân, nhà cung cấp C, thiết bị, đối thủ. Chi phí cố định 1.750k mỗi ngày.', 3: 'thêm 4 món, tối đa 6 nhân viên, máy POS và xe giao hàng (kênh giao hàng tận nơi, cần một nhân viên chuyên giao). Chi phí cố định 4.100k mỗi ngày.', 4: 'chi nhánh thứ hai (kho, nhân viên và khách riêng; chuyển hàng giữa hai chi nhánh tốn 40k), lưu lượng lớn hơn nhiều, tối đa 8 nhân viên. Chi phí cố định 6.700k mỗi ngày.' }[u.to] || '';
  return `<div class="dim tl-note">Nâng lên <b>${esc(u.name)}</b>: ${info}</div>${u.need.map(([t, ok]) => `<div class="tl-chk ${ok ? 'ok' : ''}">${A.ic(ok ? 'check' : 'lock', 16)} ${esc(t)}</div>`).join('')}<div class="row"><span class="grow dim">Phí nâng cấp ${kfmt(u.cost)}</span><button class="btn primary" data-a="upgrade" ${u.ok ? '' : 'disabled'}>Nâng cấp</button></div>`;
}
function expHtml(s) { // thử nghiệm giá: xen kẽ hai mức giá theo buổi, kết luận có ý nghĩa 90%
  const x = s.exp, items = D.ITEM_ORDER.filter(i => s.menu[i] && !D.ITEMS[i].seasonal && D.ITEMS[i].stage <= s.stage);
  const list = (s.expList || []).slice(-4).reverse().map(r => `<div class="tl-dg ${r.conclusive ? 'good' : ''}">${esc(D.ITEMS[r.item].name)}: ${r.pa}k ↔ ${r.pb}k · ${r.conclusive ? `giá ${r.better === 'B' ? r.pb : r.pa}k tốt hơn ${Math.round(Math.abs(r.pct) * 100)}% (có ý nghĩa 90%)` : 'chưa kết luận được'}</div>`).join('');
  const body = x && !x.done ? `<div class="tl-arr">Đang thử <b>${esc(D.ITEMS[x.item].name)}</b>: ${x.pa}k ↔ ${x.pb}k, buổi chẵn / lẻ xen kẽ. Tiến độ ${x.n}/${x.blocks} buổi.</div><div class="row"><button class="btn" data-a="expstop">Dừng thử nghiệm</button></div>`
    : `<div class="dim tl-note">Chọn món và một mức giá thử. Giá sẽ xen kẽ giữa giá hiện tại và giá thử theo từng buổi; hết ${12} buổi game so lãi hai mức bằng kiểm định 90%. Thưởng 2 IP khi có kết luận.</div><div class="tl-step"><select id="tlXi">${items.map(i => `<option value="${i}">${esc(D.ITEMS[i].name)} (${s.prices[i]}k)</option>`).join('')}</select><input class="tl-num" data-calc="fc" id="tlXp" type="text" inputmode="numeric" placeholder="giá thử (k)"><button class="btn primary" data-a="expgo">Bắt đầu</button></div>`;
  return body + (list ? '<h4>Kết quả gần đây</h4>' + list : '');
}
function prepHtml(s) {
  const card = E.dayCard(s.day), closed = card.defaultClosed.includes(s.k) && !s.flags['open' + s.day + s.k], hol = card.wageMul > 1;
  const decs = E.openDecisions(s).length;
  const up = s.stage < 4 ? sec('up', '🏪 Nâng cấp tiệm', upgradeHtml(s), E.upgradeStatus(s).ok ? 'sẵn sàng' : '') : '';
  const tut = D.TUTORIAL[s.day] && s.day <= 7 ? `<div class="tl-tut"><b>${A.ic('arrow', 14, 'tl-bob')} ${esc(D.TUTORIAL[s.day][0])}</b><span>${esc(D.TUTORIAL[s.day][1])}</span></div>` : '';
  return `<div class="tl-ph"><b>Chuẩn bị · ${D.SNAME[s.k]} ${D.SHOURS[s.k]}</b>${decs ? `<button class="btn tl-warnb" data-a="win" data-v="mail">${A.ic('warn', 16)} ${decs} thư cần quyết định</button>` : ''}</div>${tut}
    ${shortageHtml(s)}
    ${sec('prices', '💲 Giá & thực đơn', `<div class="dim tl-note">Giá có thể đổi bất cứ lúc nào (khi mở cửa tốn 1 AP). Khách vượt ngưỡng giá sẽ bỏ đi hẳn.</div>${priceRows(s, false)}`)}
    ${sec('order', '📦 Đặt hàng', orderHtml(s))}
    ${sec('fc', '🔮 Dự đoán', forecastHtml(s))}
    ${s.b2 ? sec('tr', '🚚 Chuyển kho giữa hai chi nhánh', `<div class="dim tl-note">Mỗi chi nhánh có kho riêng. Chuyển hàng tốn 40k và đến đầu buổi kế. Kho chi nhánh 2 hiện ở mục Đặt hàng (chọn “Chi nhánh 2”).</div><div class="tl-step"><select id="tlTf"><option value="A">từ CN1 → CN2</option><option value="B">từ CN2 → CN1</option></select><select id="tlTg">${D.ING_ORDER.filter(g => E.stockOf(s, g) || E.stockB(s, g)).map(g => `<option value="${g}">${esc(D.ING[g].name)} (CN1 ${E.stockOf(s, g)} · CN2 ${E.stockB(s, g)})</option>`).join('')}</select><input class="tl-num" data-calc="qty" id="tlTq" type="text" inputmode="numeric" placeholder="số phần"><button class="btn primary" data-a="trgo">Chuyển</button></div>`) : ''}
    ${s.tools.exp ? sec('exp', '🧪 Thử nghiệm giá', expHtml(s), s.exp && !s.exp.done ? 'đang chạy' : '') : ''}
    ${E.prepItems(s).length ? sec('prep', '🧋 Sơ chế theo mẻ', O.prepSecHtml(s)) : ''}
    ${E.isV3(s) && s.stage >= D.CONTRACT.stage ? sec('con', '📃 Hợp đồng mua hàng', O.contractHtml(s), s.contracts?.length ? `${s.contracts.length}/${D.CONTRACT.max}` : '') : ''}
    ${E.isV3(s) && s.stage >= D.HUB.stage ? sec('hub', '🏭 Kho trung tâm', O.hubHtml(s), s.hub?.on ? 'đang chạy' : '') : ''}
    ${s.stage >= 2 ? sec('staff', '👥 Nhân sự & thiết bị', staffHtml(s)) : ''}
    ${up}
    ${closed ? `<div class="tl-arr bad">${A.ic('signClosed', 22)} Hôm nay đóng cửa theo mặc định (${esc(card.note?.[0] || 'ngày lễ')}). Mở cửa thì lương ×${card.wageMul}, nhu cầu thấp và không có hàng giao.</div>` : hol ? `<div class="tl-arr">Ngày lễ: lương nhân viên ×${card.wageMul} nếu mở cửa.</div>` : ''}
    <div class="row tl-go">${closed ? `<button class="btn primary big" data-a="openany">▶ Vẫn mở cửa</button><button class="btn" data-a="skip">Giữ đóng cửa</button>` : `<button class="btn primary big" data-a="live">▶ Mở cửa</button><button class="btn" data-a="skip" title="Nghỉ buổi này (vẫn trả lương, thuê mặt bằng)">Nghỉ buổi</button>`}</div>`;
}
function liveHtml(s) {
  const S = G.S; if (!S) return '<div class="empty">Đang tải buổi…</div>';
  const R = S.st;
  return `<div class="tl-ph"><b>Đang mở cửa · ${D.SNAME[s.k]}</b><span class="dim" id="tlLiveClock"></span></div>
    <div class="tl-speed"><button class="btn ${G.paused ? 'on' : ''}" data-a="pause">${A.ic(G.paused ? 'play' : 'pause', 14)} ${G.paused ? (uiLang === 'vi' ? 'Tiếp' : 'Resume') : 'Dừng'}</button>${[1, 2, 4].map(x => `<button class="btn ${G.speed === x ? 'on' : ''}" data-a="spd" data-v="${x}">${A.ic('speed' + x, 14)} ×${x}</button>`).join('')}</div>
    <div class="tl-stats" id="tlLive"></div>
    <div id="tlCook">${O.cookHtml(s, S)}</div>
    <details class="tl-more tl-stock" id="tlStockBox" ${G.stkOpen === false ? '' : 'open'}><summary>📦 Theo dõi kho trực tiếp</summary><div id="tlStock"></div></details>
    <div class="tl-cmds">
      <button class="btn" data-a="cmd" data-v="price">💲 Đổi giá<small>1 AP</small></button>
      <button class="btn" data-a="cmd" data-v="express">🚚 Giao khẩn<small>2 AP</small></button>
      <button class="btn" data-a="cmd" data-v="promo" ${S.promo ? 'disabled' : ''}>📣 Khuyến mãi<small>2 AP</small></button>
      <button class="btn" data-a="cmd" data-v="break">☕ Nghỉ giải lao<small>1 AP</small></button>
      <button class="btn" data-a="cmd" data-v="${S.open ? 'close' : 'reopen'}">${S.open ? '🚪 Đóng cửa sớm' : '🔓 Mở lại'}<small>1 AP</small></button>
    </div>
    <div id="tlSub">${G.subLive ? subLive(s) : ''}</div>
    <div class="tl-feed" id="tlFeed"></div>`;
}
function subLive(s) {
  if (G.subLive === 'price') return `<div class="tl-subb"><b>Đổi giá (1 AP mỗi lần)</b>${priceRows(s, true)}</div>`;
  if (G.subLive === 'express') { const items = D.ING_ORDER.filter(g => D.ITEM_ORDER.some(i => s.menu[i] && D.inSeason(i, s.day) && D.ITEMS[i].ing.includes(g))); return `<div class="tl-subb"><b>Giao khẩn từ đại lý B (2 AP, giá ×1,3, hàng đến sau 60 phút)</b>${items.map(g => `<div class="tl-row"><span class="tl-ico">${A.ingIc(g, 22)}</span><div class="tl-nm"><b>${esc(D.ING[g].name)}</b><small class="dim">kho ${E.stockOf(s, g)}</small></div><div class="tl-step"><input class="tl-num" data-calc="qty" data-g="${g}" data-ex="1" type="text" inputmode="numeric" placeholder="0"></div></div>`).join('')}<div class="row"><button class="btn primary" data-a="exp">Gửi đơn khẩn</button><button class="btn" data-a="subx">Đóng</button></div></div>`; }
  return '';
}
// ---------- đơn hàng đang trên đường ----------
// Quy tắc giao hàng: đơn đặt lúc nào cũng về ĐẦU BUỔI KẾ TIẾP (nhà cung cấp C: sau 2 ngày, vào S1). Giao khẩn (nhà B) về sau ~60 phút khi đang bán.
const SLBL = k => `S${k + 1} ${pad(D.SSTART[k])}:00`;
const itemsOf = p => (p.lines && p.lines.length ? p.lines : (p.lots || [])).map(l => ({ g: l.g, q: l.q }));
function incoming(s) { return s.pending.filter(p => !p.done).map(p => ({ p, lab: p.at ? 'giao khẩn, về trong buổi' : `${E.dayLabel(Math.floor(p.t / 10))} ${SLBL(p.t % 10)}`, short: p.at ? 'sớm' : SLBL(p.t % 10).split(' ')[0] })); }
const incomingFor = (s, g, key) => incoming(s).find(x => (x.p.br || 'A') === (key === 'b' ? 'B' : 'A') && itemsOf(x.p).some(l => l.g === g));
function pendingHtml(s) {
  const list = incoming(s);
  const when = E.isV2(s) ? 'Mỗi nhà cung cấp có thời gian giao riêng: xem dòng “Hàng đến” trước khi đặt.' : 'Đơn đặt bây giờ sẽ về đầu buổi kế tiếp.';
  if (!list.length) return E.isV2(s) ? '<div class="dim tl-note">📭 Chưa có đơn nào đang trên đường. ' + when + '</div>' : '<div class="dim tl-note">📭 Chưa có đơn nào đang trên đường. Hàng đặt <b>bây giờ</b> chỉ về <b>đầu buổi kế tiếp</b>, nên cần đặt trước một buổi.</div>';
  return `<div class="tl-arr"><b>🚚 Đơn đang trên đường (${list.length})</b>${list.map(({ p, lab }) => `<div class="tl-pend"><b>${p.transfer ? 'Chuyển kho' : 'NCC ' + p.sup}${p.br === 'B' ? ' → CN2' : p.br === 'H' ? ' → Kho trung tâm' : ''}</b> · về <b>${esc(lab)}</b><small class="dim">${itemsOf(p).slice(0, 6).map(l => `<span>${esc(D.ING[l.g].name)}</span> ×${l.q}`).join(', ')}${itemsOf(p).length > 6 ? '…' : ''}</small></div>`).join('')}<div class="dim tl-note">${when}</div></div>`;
}
function shortage(s) { // món đang bật nhưng thiếu nguyên liệu ngay lúc này
  const items = D.ITEM_ORDER.filter(i => onSale(s, i) && !E.itemAvail(s, i, 1)), miss = [...new Set(items.flatMap(i => D.ITEMS[i].ing.filter(g => E.stockOf(s, g) < 1)))];
  return { items, miss };
}
function shortageHtml(s) {
  const { items, miss } = shortage(s); if (!miss.length) return '';
  return `<div class="tl-arr bad">⚠ <b>Kho đang thiếu:</b> ${miss.map(g => { const c = incomingFor(s, g, 'a'); return `<span>${esc(D.ING[g].name.toLowerCase())}</span><span>${c ? ` (đang về ${c.short})` : ' (chưa đặt)'}</span>`; }).join(', ')}.<br>Món không bán được lúc này: ${items.map(i => '<span>' + esc(D.ITEMS[i].name) + '</span>').join(', ')}.<br><small>Hàng đặt bây giờ sớm nhất là đầu buổi kế tiếp, không kịp cho buổi này. Có thể dùng <b>Giao khẩn</b> khi đang bán (nhà cung cấp B).</small></div>`;
}

// ---------- theo dõi kho trực tiếp trong buổi bán ----------
// Mẫu số lượng tồn từng nguyên liệu theo phút game để ước lượng tốc độ dùng (trong ~90 phút gần nhất) và thời gian còn đủ hàng.
const onSale = (s, i) => s.menu[i] && D.ITEMS[i].stage <= s.stage && D.inSeason(i, s.day); // món theo mùa ngoài mùa (vd. Quà trà Tết) không tính
const liveIngs = s => D.ING_ORDER.filter(g => g === 'ly' || D.ITEM_ORDER.some(i => onSale(s, i) && D.ITEMS[i].ing.includes(g)));
// đang bán có sơ chế: còn bán được = nguyên liệu thô + phần đã nấu + phần đang nấu
const qOf = (s, g, key) => (key === 'b' ? E.stockB(s, g) : E.stockOf(s, g) + (s.phase === 'LIVE' && G.S?.prep?.[g] ? E.readyQty(G.S, g) + E.cookingQty(G.S, g) : 0));
function stockTrack(s, S) {
  if (!S) return;
  if (G.stkS !== S) { G.stkS = S; G.stk = { a: {}, b: {}, max: {}, st: {}, out: [] }; G.stkHtml = ''; }
  for (const key of s.b2 ? ['a', 'b'] : ['a']) for (const g of liveIngs(s)) {
    const q = qOf(s, g, key), arr = (G.stk[key][g] ||= []); arr.push([S.tick, q]); while (arr.length > 2 && S.tick - arr[0][0] > 90) arr.shift();
    G.stk.max[key + g] = Math.max(G.stk.max[key + g] || 0, q);
  }
}
function stockRows(s, S, key) {
  const left = Math.max(0, S.len - S.tick), rows = [];
  for (const g of liveIngs(s)) {
    const arr = G.stk?.[key]?.[g] || [], now = qOf(s, g, key); let rate = 0;
    if (arr.length >= 2) { const [t0, q0] = arr[0], dt = S.tick - t0; if (dt >= 8) rate = Math.max(0, (q0 - now) / dt); }
    const eta = rate > 0 ? now / rate : Infinity, was = G.stk?.st?.[key + g];
    const state = now <= 0 ? 'out' : (eta < left || now <= 6) ? 'low' : (was === 'low' && eta < left * 1.3 ? 'low' : 'ok'); // “low” chỉ về “ok” khi dư hẳn 30% (tránh nhấp nháy)
    rows.push({ g, q: now, rate, eta, state, max: Math.max(G.stk?.max?.[key + g] || 0, now, 1) });
  }
  const rank = { out: 0, low: 1, ok: 2 }; return rows.sort((a, b) => rank[a.state] - rank[b.state] || a.eta - b.eta);
}
function stockAlerts(s, S) { // báo khi một nguyên liệu chuyển sang “sắp hết” hoặc “hết”
  const out = [];
  for (const key of s.b2 ? ['a', 'b'] : ['a']) for (const r of stockRows(s, S, key)) {
    const k = key + r.g, prev = G.stk.st[k] || 'ok', nm = D.ING[r.g].name.toLowerCase() + (s.b2 ? (key === 'b' ? ' (CN2)' : ' (CN1)') : '');
    if (r.state !== prev) {
      if (r.state === 'out') { feedPush(`⛔ Hết ${nm}: món dùng nó không bán được`, 'bad'); if ((G.stk.toasts = (G.stk.toasts || 0) + 1) <= 3) toast(`⛔ Hết ${nm}`, 2200); }
      else if (r.state === 'low' && prev === 'ok') feedPush(`⚠ ${nm} ${r.q <= 6 ? 'sắp hết' : 'sẽ hết trước khi đóng cửa'} (còn ${r.q}${r.eta < Infinity ? `, đủ ~${Math.round(r.eta)} phút` : ''})`, 'warn');
      else if (r.state === 'ok' && prev !== 'ok') feedPush(`✅ ${nm} đã đủ trở lại`, 'good');
      G.stk.st[k] = r.state;
    }
    if (r.state === 'out' && key === 'a') out.push(nm);
  }
  G.stk.out = out;
}
function stockHtml(s, S) {
  const blk = (key, title) => {
    const rows = stockRows(s, S, key), bad = rows.filter(r => r.state !== 'ok').length;
    const items = D.ITEM_ORDER.filter(i => onSale(s, i)).map(i => ({ i, n: Math.min(...D.ITEMS[i].ing.map(g => qOf(s, g, key))) }));
    const incLbl = r => { const i = incomingFor(s, r.g, key); return i ? 'về ' + i.short : 'hết'; };
    const cell = r => `<div class="tl-sc ${r.state}" title="${esc(D.ING[r.g].name)}">${A.ingIc(r.g, 20)}<b>${r.q}</b><small>${esc(D.ING[r.g].name)}</small><i>${r.state === 'out' ? incLbl(r) : r.rate > 0 ? '~' + (r.eta > 240 ? '240+' : Math.round(r.eta)) + (uiLang === 'vi' ? 'p' : 'm') : '—'}</i><u style="width:${Math.min(100, Math.round(100 * r.q / r.max))}%"></u></div>`;
    return `<div class="tl-stk"><div class="tl-stkh"><b>${title}</b><span class="tl-flag ${bad ? 'warn' : 'ok'}">${bad ? bad + ' cần chú ý' : 'Kho ổn'}</span>${bad && s.phase === 'LIVE' ? '<button class="btn" data-a="cmd" data-v="express">🚚 Giao khẩn</button>' : ''}</div>
      <div class="tl-stki">${items.map(x => `<span class="tl-pill ${x.n <= 0 ? 'out' : x.n < 10 ? 'low' : ''}">${A.cup(x.i, 14)} ${esc(uiLang === 'vi' ? D.ITEMS[x.i].name.replace(/^Trà /, '') : D.ITEMS[x.i].name)}: ${x.n <= 0 ? 'HẾT' : '~' + x.n}</span>`).join('')}</div>
      ${bad ? `<div class="tl-stkg">${rows.filter(r => r.state !== 'ok').map(cell).join('')}</div>` : ''}
      <details class="tl-more tl-stkall" id="tlStkAll${key}" ${(G.stkAll ||= {})[key] ? 'open' : ''}><summary>${bad ? `Xem ${rows.length - bad} nguyên liệu còn đủ` : `Xem ${rows.length} nguyên liệu`}</summary><div class="tl-stkg">${rows.filter(r => r.state === 'ok').map(cell).join('')}</div></details></div>`;
  };
  return (s.b2 ? blk('a', '🏪 Chi nhánh 1') + blk('b', '🏬 Chi nhánh 2') : blk('a', '📦 Kho đang bán')) + `<div class="dim tl-note">Số to = còn bao nhiêu phần. “~25p” = ước tính còn đủ khoảng 25 phút theo tốc độ dùng gần đây. Màu vàng = sẽ hết trước khi đóng cửa hoặc còn ≤ 6. Món chỉ bán được khi đủ MỌI nguyên liệu của nó.</div>`;
}
function stockUI(s, S) {
  const el = $('#tlStock'); if (!el || !S) return; stockTrack(s, S); stockAlerts(s, S);
  const h = stockHtml(s, S); if (h !== G.stkHtml) { G.stkHtml = h; el.innerHTML = h; }
  const tg = $('#tlTags'), has = !!G.stk.out.length; if (tg) { let o = tg.querySelector('.tg.stk'); if (has) { if (!o) { o = document.createElement('span'); o.className = 'tg stk'; tg.appendChild(o); } o.textContent = '⛔ Hết: ' + G.stk.out.slice(0, 3).map(n => tr(n)).join(', '); } else o?.remove(); }
}
function liveStats() {
  const s = st(), S = G.S, el = $('#tlLive'); if (!S || !el) return; const R = S.st; stockUI(s, S);
  const ls = R.lostStock + R.lostWait;
  el.innerHTML = `<div><b>${R.cups}</b><small>ly bán</small></div><div><b>${kfmt(R.rev)}</b><small>doanh thu</small></div><div><b>${Math.round(S.Wb / 150)}</b><small>đơn đang chờ</small></div><div class="${ls ? 'bad' : ''}"><b>${ls}</b><small>khách bỏ đi</small></div>`;
  const c = $('#tlLiveClock'); if (c) c.textContent = S.open ? '' : 'đang đóng cửa';
  const ck = $('#tlCook'); if (ck) { const html = O.cookHtml(s, S); if (html !== G.cookHtml || !ck.firstElementChild) { G.cookHtml = html; ck.innerHTML = html; } }
  const f = $('#tlFeed'); if (f) f.innerHTML = G.feed.slice(-6).reverse().map(x => `<div class="${x.c || ''}">${esc(x.t)}</div>`).join('');
}
function reviewHtml(s) {
  const r = s.lastReport; if (!r) return '<div class="empty">Chưa có báo cáo.</div>';
  const last = s.k === E.sessionsOfDay(s.day).slice(-1)[0], gross = r.rev - r.cogs - r.wage - (r.waste || 0);
  const maxV = Math.max(1, ...r.perSlot.map(x => x.v));
  const bars = r.perSlot.map((x, j) => `<div class="bar" title="${pad(SSTART[r.k] + Math.floor(j / 2))}:${j % 2 ? '30' : '00'} · ${x.v} khách ghé, ${x.ls + x.lw} bỏ đi"><i class="v" style="height:${Math.round(100 * x.b / maxV)}%"></i><i class="l" style="height:${Math.round(100 * (x.ls + x.lw) / maxV)}%"></i></div>`).join('');
  const diag = W.diagnose ? W.diagnose(ctx, r) : [];
  const lost = r.ls + r.lw, mood = s.lame.energy < 35 ? 'tired' : lost > 8 ? 'worry' : r.sat > 0.85 && r.cups >= 28 ? 'excited' : r.sat > 0.78 ? 'happy' : '';
  return `<div class="tl-ph">${A.faceMood('LA', mood, 34)}<b>Xem lại · ${D.SNAME[r.k]}${r.auto ? ' (tự chạy)' : ''}</b></div>
    <div class="tl-kpis"><div><b>${kfmt(r.rev)}</b><small>doanh thu</small></div><div class="${gross < 0 ? 'bad' : 'good'}"><b>${kfmt(gross)}</b><small>lãi gộp buổi</small></div><div><b>${r.cups}</b><small>ly bán</small></div><div class="${r.ls + r.lw ? 'warn' : ''}"><b>${r.ls + r.lw}</b><small>khách bỏ đi</small></div></div>
    <div class="tl-chart"><div class="bars">${bars}</div><small class="dim">Khách mua mỗi 30 phút (xanh) và khách bỏ đi (đỏ)</small></div>
    ${r.fc ? `<div class="tl-arr ${r.fc.hit ? '' : 'bad'}">🔮 Dự đoán ${r.fc.lo}–${r.fc.hi} ly: thực tế <b>${r.fc.x}</b> ${r.fc.hit ? '(trúng)' : '(trượt)'} · điểm ${Math.round(r.fc.score)}</div>` : ''}
    ${r.ot ? `<div class="tl-dg warn">⏱ Tăng ca ${r.ot} phút để làm nốt đơn dồn lại (lương nhân viên phần thêm ×1,5).</div>` : ''}
    ${r.b2 ? `<div class="tl-dg">🏬 Chi nhánh 2: ${kfmt(r.b2.rev)} doanh thu, ${r.b2.cups} ly, ${r.b2.ls + r.b2.lw} khách bỏ đi${r.b2.ls ? ' (hết hàng: chuyển kho hoặc đặt cho chi nhánh 2)' : ''}.</div>` : ''}
    ${r.del ? `<div class="tl-dg">🛵 ${r.del} đơn giao tận nơi trong buổi này.</div>` : ''}
    ${r.q ? (s.tools.diag ? `<div class="tl-dg ${r.q.score >= 65 ? 'good' : r.q.score < 45 ? 'warn' : ''}"><b>Chất lượng quyết định (DQI): ${Math.round(r.q.score)}/100</b> · giá ${Math.round(r.q.pq)} · tồn kho ${Math.round(r.q.sq)} · hàng đợi ${Math.round(r.q.wq)}<br>May rủi: lãi gộp thực tế ${r.q.luck >= 0 ? 'cao hơn' : 'thấp hơn'} trung bình ${kfmt(Math.abs(r.q.luck))} so với cùng chính sách ở các buổi khách khác (phần này không do kỹ năng).</div>` : `<div class="tl-dg dim">🔒 Chẩn đoán đầy đủ (DQI, tách may và kỹ năng) mở bằng IP trong mục Thành tích.</div>`) : ''}
    ${O.utilHtml(r)}
    <h4>Chẩn đoán</h4>${diag.slice(0, 2).map(x => `<div class="tl-dg ${x.c || ''}">${x.t}</div>`).join('')}${diag.length > 2 ? `<details class="tl-more"><summary>Xem thêm ${diag.length - 2} nhận xét</summary>${diag.slice(2).map(x => `<div class="tl-dg ${x.c || ''}">${x.t}</div>`).join('')}</details>` : ''}
    ${sec('whatif', '🔁 Chạy lại giả định (cùng seed)', W.whatIfHtml ? W.whatIfHtml(ctx) : '')}
    ${sec('order', '📦 Đặt hàng cho buổi sau', orderHtml(s))}
    <div class="row tl-go">${last ? `<button class="btn primary big" data-a="sleepbtn">😴 Đi ngủ</button>` : `<button class="btn primary big" data-a="next">Buổi tiếp theo ▶</button><button class="btn" data-a="sleepbtn">😴 Đi ngủ</button>`}</div>`;
}
function dayEndHtml(s) {
  const h = s.hist[s.hist.length - 1], reps = (s.dayReps || []).filter(r => r.day === s.day);
  const rev = reps.reduce((a, r) => a + r.rev, 0), cups = reps.reduce((a, r) => a + r.cups, 0);
  return `<div class="tl-ph"><b>Hết ngày ${s.day} · ${E.dayLabel(s.day)}</b></div>
    ${A.illus(s.day % 7 === 0 ? 'weekend' : 'dayend')}
    <div class="tl-kpis"><div><b>${kfmt(rev)}</b><small>doanh thu</small></div><div><b>${cups}</b><small>ly bán</small></div><div><b>${kfmt(s.cash)}</b><small>tiền hiện có</small></div><div><b>${Math.round(s.rep)}</b><small>uy tín R</small></div></div>
    <div class="dim tl-note">Bấm “Đi ngủ” để chốt ngày: hàng hỏng, thuê mặt bằng, lương, ${E.isV2(s) ? 'phí giữ hàng, công nợ đến hạn, ' : ''}cập nhật danh tiếng, tin tức hôm sau và chấm cột mốc.</div>
    ${sec('order', '📦 Đặt hàng cho sáng mai', orderHtml(s))}
    <div class="row tl-go"><button class="btn primary big" data-a="sleepbtn">😴 Đi ngủ</button></div>`;
}
function finalHtml(s) {
  const f = s.season || E.seasonScore(s);
  return `<div class="tl-ph"><b>🏆 Chung kết mùa “Xuân Đinh Mùi”</b></div>
    ${A.illus('final')}
    <div class="tl-final">${A.ic('ttl' + (D.TITLES.length - D.TITLES.findIndex(t => t[1] === f.title)), 56)}<div class="tl-title">${esc(f.title)}</div><div class="tl-score">${Math.round(f.score)}<small>điểm mùa</small></div>
    <div class="tl-parts">${Object.entries(f.parts).map(([k, v]) => `<div><small>${k}</small><div class="tl-bar"><i style="width:${Math.round(v)}%"></i></div><b>${Math.round(v)}</b></div>`).join('')}</div>
    <div class="dim tl-note">Tài sản ròng ${kfmt(f.nw)} · lãi cả mùa ${kfmt(f.profit)} · ⭐ ${E.totalStars(s)}/${D.MILESTONES.length * 3} · xu nhận ${s.coins}</div></div>
    <h4>Ba quyết định tốn tiền nhất</h4>${O.lossHtml(ctx)}
    <div class="row tl-go"><button class="btn primary big" data-a="free">Chơi tiếp (không còn sự kiện)</button><button class="btn" data-a="again">Chơi lại từ 01/12</button></div>
    <div class="row"><button class="btn" data-a="savefin">💾 Lưu số liệu</button><button class="btn" data-a="viewseason">📈 Xem lại mùa</button></div>`;
}

// ---------- sự kiện giao diện ----------
function bindRoot(root) {
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-w]'); if (b && b.closest('#tlTools')) { if (b.dataset.w === 'calc') toggleCalc(); else openWin(b.dataset.w); return; }
    const a = e.target.closest('[data-a]'); if (a) onAct(a, e);
  });
  root.addEventListener('toggle', e => { if (e.target.id === 'tlGrow') G.growOpen = e.target.open; else if (e.target.id === 'tlStockBox') G.stkOpen = e.target.open; else if (e.target.classList?.contains('tl-stkall')) (G.stkAll ||= {})[e.target.id.slice(-1)] = e.target.open; }, true); // nhớ trạng thái mở/đóng khối theo dõi kho
  root.addEventListener('click', e => { const hc = e.target.closest('#tlHud .hc'); if (hc && HUD_HELP[hc.id]) { toast(HUD_HELP[hc.id], 5200); return; } const b = e.target.closest('#tlView'); if (b) { G.view = G.view === 'in' ? 'out' : 'in'; b.textContent = G.view === 'in' ? '🚪 Ra ngoài' : '🏠 Vào trong'; drawNow(); } });
  root.addEventListener('focusin', e => { if (e.target.matches?.('.tl-num')) G.lastInput = e.target; });
  root.addEventListener('change', e => {
    const t = e.target; if (t.dataset?.p3) { p3Change(t); return; } if (!t.matches?.('.tl-num')) return;
    const s = st();
    if (t.dataset.calc === 'price') { const r = E.cmd(s, G.S, { t: 'SET_PRICE', item: t.dataset.i, price: parseInt(String(t.value).replace(/\D/g, '')) }); if (!r.ok) toast(r.reason, 2200); renderPartial(); }
    else if (t.dataset.calc === 'qty') { const v = Math.max(0, Math.floor(+String(t.value).replace(',', '.') || 0)); if (t.dataset.ex) { G.exq = G.exq || {}; G.exq[t.dataset.g] = v; } else { G.ord[t.dataset.g] = v; updOrdTotal(); } t.value = v || ''; }
  });
  document.addEventListener('visibilitychange', () => { if (G.alive && document.hidden && st()?.phase === 'LIVE') save(false); });
}
function renderPartial() { // vẽ lại sau khi con trỏ đã sang ô mới, rồi trả con trỏ về đúng ô đó
  setTimeout(() => { const a = document.activeElement, i = a?.matches?.('.tl-num[data-i]') ? a.dataset.i : null; hud(); panel(); if (i) $(`.tl-num[data-i="${i}"]`, $('#tlPanel'))?.focus(); }, 0);
}
function orderTotal(s, sup) { return E.quote(s, sup, ordLines(), { credit: payCredit(s, sup), br: G.br }).total; }
function updOrdTotal() { const s = st(), t = orderTotal(s, D.SUPPLIERS[G.sup] && D.SUPPLIERS[G.sup].stage <= s.stage ? G.sup : 'A'); const el = $('#tlOrdTotal'); if (el) el.textContent = t ? kfmt(t) : '0k'; const sm = $('#tlOrdSum'); if (sm) sm.innerHTML = ordSum(s, D.SUPPLIERS[G.sup] && D.SUPPLIERS[G.sup].stage <= s.stage ? G.sup : 'A'); }
function onAct(a, ev) {
  const s = st(), d = a.dataset, act = d.a, res = r => { if (r && !r.ok) toast(r.reason, 2400); return r; };
  switch (act) {
    case 'sec': G.sec = G.sec === d.v ? '' : d.v; panel(); break;
    case 'pm': { const p = s.prices[d.i] + (+d.d); res(E.cmd(s, G.S, { t: 'SET_PRICE', item: d.i, price: p })); hud(); panel(); if (s.phase === 'LIVE' && G.subLive === 'price') { const x = $('#tlSub'); if (x) { x.innerHTML = subLive(s); } } break; }
    case 'menu': res(E.cmd(s, G.S, { t: 'SET_MENU', item: d.i, on: !s.menu[d.i] })); panel(); break;
    case 'pay': G.pay = d.v; panel(); break;
    case 'cook': { const r = res(E.cmd(s, G.S, { t: 'COOK', g: d.v })); if (r?.ok) toast(`🧋 Đang nấu ${r.got} phần, ${r.min} phút nữa xong`, 2000); G.cookHtml = ''; hud(); liveStats(); break; }
    case 'csign': { const r = res(E.cmd(s, G.S, { t: 'SIGN_CONTRACT', g: $('#tlCg')?.value, sup: $('#tlCs')?.value })); if (r?.ok) { toast('📃 Đã ký hợp đồng', 1800); save(false); panel(); } break; }
    case 'cbreak': if (confirm('Huỷ hợp đồng này và trả phí huỷ?')) { res(E.cmd(s, G.S, { t: 'BREAK_CONTRACT', g: d.v })); hud(); save(false); panel(); } break;
    case 'hub': { const h = s.hub; res(E.cmd(s, G.S, d.v === 'share' ? { t: 'SET_HUB', share: !h?.share } : { t: 'SET_HUB', on: !h?.on })); save(false); panel(); break; }
    case 'sup': G.sup = d.v; G.ord = {}; panel(); break;
    case 'brsel': G.br = d.v; G.ord = {}; panel(); break;
    case 'trgo': { const g = $('#tlTg')?.value, q = parseInt($('#tlTq')?.value), from = $('#tlTf')?.value; const r = res(E.cmd(s, G.S, { t: 'TRANSFER', g, q, from })); if (r?.ok) { toast('🚚 Chuyển kho: đến ' + r.arrive, 2200); hud(); save(false); panel(); } break; }
    case 'oq': G.ord[d.g] = (+G.ord[d.g] || 0) + (+d.d); { const inp = $(`input[data-g="${d.g}"]`, $('#tlPanel')); if (inp) inp.value = G.ord[d.g]; } updOrdTotal(); break;
    case 'order': { const lines = Object.entries(G.ord).filter(([, q]) => q > 0).map(([g, q]) => ({ g, q })); const r = res(E.cmd(s, G.S, { t: 'PLACE_ORDER', sup: G.sup, lines, br: G.br, credit: payCredit(s, G.sup) })); if (r?.ok) { toast(r.credit ? `Đã ghi nợ: ${kfmt(r.total)} · đến ${r.arrive} · hạn trả ${r.due}` : `Đã đặt hàng: ${kfmt(r.total)} · đến ${r.arrive}`, 2400); G.ord = {}; hud(); save(false); panel(); } break; }
    case 'fc': { const lo = parseInt($('#tlFl')?.value), hi = parseInt($('#tlFh')?.value); const r = res(E.cmd(s, G.S, { t: 'SET_FORECAST', lo, hi })); if (r?.ok) { toast('Đã chốt dự đoán', 1500); panel(); } break; }
    case 'hire': res(E.cmd(s, G.S, { t: 'HIRE', id: d.v })); hud(); panel(); break;
    case 'fire': if (confirm('Cho nhân viên này nghỉ? Phải bồi thường 2 buổi lương và những người còn lại sẽ buồn.')) res(E.cmd(s, G.S, { t: 'FIRE', id: d.v })); hud(); panel(); break;
    case 'intv': res(E.cmd(s, G.S, { t: 'INTERVIEW', id: d.v })); panel(); break;
    case 'equip': res(E.cmd(s, G.S, { t: 'BUY_EQUIP', id: d.v })); hud(); panel(); break;
    case 'upgrade': if (res(E.cmd(s, G.S, { t: 'UPGRADE' }))?.ok) { toast('🏪 Chào mừng giai đoạn ' + s.stage + '!', 3000); G.sec = 'staff'; G.ord = {}; save(true); render(); } break;
    case 'expgo': { const it = $('#tlXi')?.value, pb = parseInt($('#tlXp')?.value); const r = res(E.cmd(s, G.S, { t: 'START_EXPERIMENT', item: it, pb, blocks: 12 })); if (r?.ok) { toast('🧪 Bắt đầu thử nghiệm giá', 1800); save(false); panel(); } break; }
    case 'expstop': res(E.cmd(s, G.S, { t: 'STOP_EXPERIMENT' })); save(false); panel(); break;
    case 'win': openWin(d.v); break;
    case 'live': { const sh = shortage(s); if (sh.miss.length && !confirm(`Đang thiếu: ${sh.miss.map(g => tr(D.ING[g].name).toLowerCase()).join(', ')}.\nCác món dùng chúng sẽ KHÔNG bán được trong buổi này (hàng đặt bây giờ sớm nhất là đầu buổi sau).\nVẫn mở cửa?`)) break; goLive(); break; }
    case 'skip': if (confirm(E.dayCard(s.day).defaultClosed.includes(s.k) ? 'Giữ đóng cửa? Vẫn trả thuê mặt bằng, không phải trả lương lễ.' : 'Nghỉ buổi này? Vẫn trả thuê mặt bằng và lương.')) skipSession(); break;
    case 'openany': openAnyway(); break;
    case 'pause': G.paused = !G.paused; panel(); applyPause(); break;
    case 'guidefm': G.gdTab = 'fm'; G.gdQ = ''; G.win = null; openWin('guide'); break;
    case 'spd': G.speed = +d.v; panel(); break;
    case 'cmd': liveCmd(d.v); break;
    case 'subx': G.subLive = null; panel(); break;
    case 'exp': { const lines = Object.entries(G.exq || {}).filter(([, q]) => q > 0).map(([g, q]) => ({ g, q })); const r = res(E.cmd(s, G.S, { t: 'EXPRESS_ORDER', lines })); if (r?.ok) { toast(`Giao khẩn ${kfmt(r.total)}: hàng đến sau 60 phút`, 2400); G.exq = {}; G.subLive = null; hud(); panel(); } break; }
    case 'next': nextSession(); break;
    case 'sleepbtn': if (confirm(s.phase === 'DAYEND' ? 'Đi ngủ và sang ngày mới?' : 'Đi ngủ sớm? Các buổi còn lại chạy theo kế hoạch đứng (phí tự trông tiệm 5% doanh thu, không tính điểm chất lượng).')) sleep(); break;
    case 'free': E.playOn(s); save(true); render(); break;
    case 'savefin': { const x = saveData(); toast(`Đã lưu số liệu “${x.name}” (${x.hist.length} ngày). Xem ở Báo cáo → Đã lưu.`, 2600); break; }
    case 'viewseason': G.rpTab = 'chart'; G.win = null; openWin('report'); break;
    case 'again': if (confirm('Chơi lại từ 01/12/2026? Sao đã đạt vẫn được ghi nhận trong hồ sơ.')) newGame(s.diff); break;
    case 'wi': W.runWhatIf?.(ctx, d.v); panel(); break;
    default: break;
  }
}
function liveCmd(v) {
  const s = st(), S = G.S, res = r => { if (r && !r.ok) toast(r.reason, 2400); return r; };
  if (v === 'price') { G.subLive = G.subLive === 'price' ? null : 'price'; panel(); }
  else if (v === 'express') { G.subLive = G.subLive === 'express' ? null : 'express'; G.exq = {}; panel(); }
  else if (v === 'promo') { if (res(E.cmd(s, S, { t: 'FLASH_PROMO' }))?.ok) { toast('📣 Khuyến mãi chớp nhoáng cho học sinh và du khách', 2000); } hud(); panel(); }
  else if (v === 'break') { if (res(E.cmd(s, S, { t: 'TAKE_BREAK' }))?.ok) toast('☕ Nghỉ 15 phút: sức +10, quầy chậm lại', 1800); hud(); panel(); }
  else if (v === 'close') { if (res(E.cmd(s, S, { t: 'CLOSE_EARLY' }))?.ok) toast('🚪 Đã đóng cửa đến hết buổi', 1800); hud(); panel(); }
  else if (v === 'reopen') { res(E.cmd(s, S, { t: 'REOPEN' })); hud(); panel(); }
}
function bindPanel(p) { if (st().phase === 'LIVE') liveStats(); }

// ---------- vòng lặp và hoạt họa ----------
function feedPush(t, c) { G.feed.push({ t, c }); if (G.feed.length > 12) G.feed.shift(); }
function consume(S) {
  const s = st(); let lostMsg = 0;
  for (const e of S.out) {
    if (e.ty === 'buy') { { const gm = A.shopGeo(s.stage); (G.fl ||= []).push({ x: gm.coinX + (S.cust % 5) * 3 - 6, y: gm.coinY + 4, t0: G.t }); } if (G.fl.length > 24) G.fl.shift(); G.vis.push({ x: -8, seg: e.sg, v: (G.vis.length * 7 + S.cust) % 3, st: 'in', serveAt: S.tick + Math.min(60, Math.max(2, Math.round(e.wait / 60))), item: e.item, sat: e.sat, y: 56 + (G.vis.length % 3) * 3 }); }
    else if (e.ty === 'lost') { G.vis.push({ x: -8, seg: e.sg, v: S.cust % 3, st: 'lost', why: e.why, y: 58, t0: G.t }); if (lostMsg++ < 1) feedPush(e.why === 'stock' ? 'Khách bỏ đi: món hết hàng' : 'Khách bỏ đi: chờ lâu', 'bad'); }
    else if (e.ty === 'late') { feedPush('🚚 Đơn khẩn bị trễ: về đầu buổi sau', 'warn'); toast('🚚 Đơn khẩn bị trễ, về đầu buổi sau', 2400); }
    else if (e.ty === 'delivery') { feedPush('🚚 Hàng giao khẩn đã đến', 'good'); toast('🚚 Hàng giao khẩn đã đến', 1600); }
    else if (e.ty === 'closed') feedPush('Quán đang đóng cửa', 'warn');
  }
  S.out.length = 0;
  const cm = S.st.comments; if (cm.length > (G.cmSeen || 0)) { for (let i = G.cmSeen || 0; i < cm.length; i++) feedPush(cm[i]); G.cmSeen = cm.length; }
  if (G.vis.length > 40) G.vis.splice(0, G.vis.length - 40);
}
function drawNow(fdt = 0) {
  const s = st(), g = G.g; if (!s || !g) return; const card = E.dayCard(s.day), w = card.w, S = G.S;
  const open = S ? S.open : !(card.defaultClosed.includes(s.k) && !s.flags['open' + s.day + s.k]);
  const tired = s.staff.map(m => (m.energy ?? 100) < 35);
  const hour = s.k === 4 ? (s.phase === 'LIVE' && S && S.len ? Math.min(2, Math.floor(3 * S.tick / S.len)) : s.phase === 'REVIEW' ? 2 : 0) : 0; // S5: 22h, 23h, 24h
  if (G.view === 'in') { A.drawInterior(g, { hour, decor: A.decorOf(s.day).concat(s.unl && s.unl[30] ? ['spring'] : []), tired, stage: s.stage, k: s.k, staffN: s.staff.length, guests: Math.min(6, G.vis.filter(c => c.st === 'in').length + (s.phase === 'LIVE' ? 1 : 0)), t: G.t, open }); }
  else
  A.drawScene(g, { hour, tired, stage: s.stage, k: s.k, sky: w.sky, rain: E.rainAt(w, s.day, s.k), open, t: G.t, decor: A.decorOf(s.day).concat(s.unl && s.unl[30] ? ['spring'] : []), staffN: s.stage >= 2 ? s.staff.length : 0, day: s.day, promo: !!(S && S.promo), dusk: false });
  // khách
  const live = s.phase === 'LIVE' && S, tick = live ? S.tick : 0, geo = A.shopGeo(s.stage), counterX = geo.counterX, dt = Math.min(0.1, fdt) * (live ? Math.max(1, G.speed) : 1);
  let q = 0; for (const c of G.vis) {
    if (c.st === 'in') { const tx = counterX - 12 - q * 9; q++; c.x += Math.min(40 * dt, Math.max(0, tx - c.x)) * (c.x < tx ? 1 : 0); if (c.x >= tx - 0.5) c.x = tx; if (tick >= c.serveAt) { c.st = 'out'; c.bub = 'ok'; c.t0 = G.t; } }
    else if (c.st === 'out') { c.x -= 28 * dt; c.y = Math.max(52, c.y - 4 * dt); if (c.x < -12) c.dead = 1; }
    else if (c.st === 'lost') { c.x += Math.min(30 * dt, 20 * dt); c.bub = c.why === 'wait' ? 'angry' : 'bye'; if (G.t - c.t0 > 1.6 || c.x > counterX - 8) { c.x -= 36 * dt; } if (G.t - c.t0 > 3.2) c.dead = 1; }
    A.drawPerson(g, c.x, c.y, c.seg, c.v, c.st === 'lost' && c.why === 'wait' ? 'angry' : '');
    if (c.bub || (c.st === 'in' && c.x >= counterX - 12 - 9 * 5 && tick - c.serveAt > -3)) { /* bong bóng */ }
    if (c.st === 'in' && c.x >= (counterX - 12 - (q - 1) * 9) - 1 && c.serveAt - tick > 15) g.drawImage(A.bubble('wait'), Math.round(c.x) + 1, Math.round(c.y) - 9);
    else if (c.bub) g.drawImage(A.bubble(c.bub), Math.round(c.x) + 1, Math.round(c.y) - 9);
  }
  G.vis = G.vis.filter(c => !c.dead);
  if (G.fl && G.fl.length) { // tiền bay lên mỗi khi bán được ly
    G.fl = G.fl.filter(f => G.t - f.t0 < 1.1);
    for (const f of G.fl) { const a = G.t - f.t0, y = Math.round(f.y - a * 16); g.fillStyle = '#2d1f47'; g.fillRect(Math.round(f.x) - 1, y - 1, 5, 5); g.fillStyle = a > 0.8 ? '#fff1a8' : '#ffd84d'; g.fillRect(Math.round(f.x), y, 3, 3); }
  }
  if (E.tempAt(w, s.k) < 18 && s.stage >= 1) { // khói bốc lên từ quầy khi trời lạnh
    g.fillStyle = '#ffffffaa'; const bx = geo.steamX; for (let i = 0; i < 3; i++) { const a = (G.t * 6 + i * 3.3) % 10; g.fillRect(bx + i * 4 + Math.round(Math.sin(G.t * 2 + i) * 1), geo.winY + 8 - Math.round(a), 1, 2); }
  }
  if (live && S.tick < 3) { /* mở cửa */ }
}
// Vẽ: chạy theo nhịp màn hình (requestAnimationFrame, mượt 60 khung/giây). Đồng hồ game vẫn do bộ hẹn giờ 50 ms lo (loop), và bộ hẹn giờ
// cũng vẽ bù khi rAF bị trình duyệt hạn chế (tab nền, khung chìm) nên hình không đứng im.
function draw(ts, viaRaf) {
  if (!G.alive || document.body.dataset.view !== 'tealab') return;
  if (viaRaf) G.rafAt = ts; else if (G.rafAt && ts - G.rafAt < 100) return; // bộ hẹn giờ chỉ vẽ bù khi rAF đang bị hạn chế (>100 ms chưa chạy)
  if (viaRaf && G.fr && ts - G.fr < (G.S && st()?.phase === 'LIVE' && !pausedNow() ? 12 : 45)) return; // ngoài giờ bán chỉ cần ~20 khung/giây, đỡ tốn pin
  const fdt = G.fr ? Math.min(0.25, Math.max(0, (ts - G.fr) / 1000)) : 0.016; G.fr = ts; G.t += fdt;
  drawNow(fdt);
}
function rafLoop() { if (!G.alive) { G.rafId = 0; return; } draw(performance.now(), true); G.rafId = requestAnimationFrame(rafLoop); }
function loop(ts) {
  if (!G.alive) return;
  if (document.body.dataset.view !== 'tealab') { G.last = 0; return; }
  const dt = G.last ? Math.min(250, ts - G.last) : 16; G.last = ts; G.dt = dt / 1000;
  const s = st(); if (!s) return;
  if (s.phase === 'LIVE' && G.S && !pausedNow()) {
    G.acc += dt; const per = 750 / G.speed; let n = Math.floor(G.acc / per);
    if (n > 0) {
      if (n > 8) { n = 8; G.acc = 0; } else G.acc -= n * per;
      const before = Math.floor(G.S.tick / 30);
      const done = E.advance(s, G.S, n); consume(G.S);
      const clk = $('#hT b'); if (clk) clk.textContent = clockText();
      const m = $('#hM b'); if (m) m.textContent = hudMoney(s.cash); const ap = $('#hA b'); if (ap) ap.textContent = s.ap;
      liveStats();
      if (Math.floor(G.S.tick / 30) !== before && !done) save(false); // điểm lưu mỗi slot (30 phút game)
      if (done) finish();
    }
  }
  draw(ts, false);
}
export function enter() { // vào mục TeaLab
  if (!G.alive) { G.alive = true; G.raf = setInterval(() => loop(performance.now()), 50); } // đồng hồ game dùng bộ hẹn giờ (không phải rAF) để chạy đều và còn chạy được khi khung hình bị trình duyệt hạn chế
  if (!G.rafId) { G.fr = 0; G.rafId = requestAnimationFrame(rafLoop); }
  pullRemote(); if (!G.root) return; render(); checkUrgent(); A.warm?.();
}
export function leave() { if (G.st?.phase === 'LIVE') save(false); G.paused = true; if (G.rafId) { cancelAnimationFrame(G.rafId); G.rafId = 0; } }
export function init() {
  const host = $('#tlHost'); if (host && !G.root) mount(host);
  bus.on('show', v => { if (v === 'tealab') { G.paused = false; enter(); } else if (G.alive) leave(); });
  bus.on('store', c => { if (c === 'prefs' || c === '*') pullRemote(); });
  bus.on('flush', () => { if (G.st) save(false); });
}
export const coins = () => { try { return +localStorage.getItem('tealab:coins') || 0; } catch { return 0; } };
