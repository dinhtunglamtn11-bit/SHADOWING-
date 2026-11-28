// Luyện âm → 📚 Phát âm: lộ trình học phát âm theo giáo trình (thanh mẫu → vận mẫu → thanh điệu → cặp dễ nhầm → tổng hợp).
// Mỗi bài có kiến thức ngắn, danh sách từ (bấm để nghe), và ba kiểu luyện: nghe-chọn (phân biệt cặp gần giống), gõ pinyin, đọc theo + ghi âm.
// Tiến độ lưu trong máy và đồng bộ qua kho dữ liệu (prefs/pylabpron). Tổng ôn gom từ đã làm đúng và từ hay sai.
// Giọng đọc dùng giọng có sẵn của máy (không tốn mạng / token). Ghi âm chỉ nằm trong RAM, không lưu.
import { $, $$, esc, toast, bus } from './util.js';
import { say } from './tts.js';
import * as tracker from './tracker.js';
import * as store from './store.js';
import { split, mark, gradeItem } from './pylab.js';
import { STAGES, UNITS, UNIT } from './pylab-pron-data.js';

const PUNCT = /[，。！？、；：,.!?;:\s]/g;
const markAll = py => py.split(' ').map(mark).join(' ');
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hid = id => { let h = 5381; for (let i = 0; i < id.length; i++) h = ((h * 33) ^ id.charCodeAt(i)) >>> 0; return h.toString(36); };
const tipHtml = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');

// ---------- chỉ mục từ ----------
const ALL = new Map();      // key -> item (kèm bài gốc u và nhóm gi)
const IN_UNITS = new Map(); // key -> [mã bài chứa từ này]
for (const u of UNITS) for (const it of u.items) {
  const cur = ALL.get(it.key); // chọn bối cảnh nhóm tốt nhất cho từ: ưu tiên bài cặp dễ nhầm (giai đoạn 4)
  if (!cur || (u.st === 'pair' && UNIT[cur.u].st !== 'pair')) ALL.set(it.key, { ...it, u: u.id, sy: it.py.split(' '), lv: 2, hzg: it.hz.replace(PUNCT, '') });
  (IN_UNITS.get(it.key) || IN_UNITS.set(it.key, []).get(it.key)).push(u.id);
}
const itemOf = k => ALL.get(k);
const ctx = (u, it) => ({ ...itemOf(it.key), u: u.id, gi: it.gi, nq: it.nq, nt: u.nt }); // từ trong bối cảnh của MỘT bài (để lấy đúng nhóm gần giống)

// cách đọc thực tế sau biến điệu (3+3 → 2+3, 不 trước thanh 4, 一 theo thanh sau); null nếu không đổi
function actual(it) {
  const sy = it.py.split(' '), ch = [...it.hz.replace(PUNCT, '')];
  if (ch.length !== sy.length) return null;
  const t = sy.map(s => +s.slice(-1)), o = t.slice();
  for (let k = 0; k < sy.length - 1; k++) {
    if (t[k] === 3 && t[k + 1] === 3) o[k] = 2;
    else if (ch[k] === '不' && t[k] === 4 && t[k + 1] === 4) o[k] = 2;
    else if (ch[k] === '一' && t[k] === 1) { if (t[k + 1] === 4) o[k] = 2; else if (t[k + 1] >= 1 && t[k + 1] <= 3) o[k] = 4; }
  }
  const py = sy.map((s, k) => s.slice(0, -1) + o[k]).join(' ');
  return py === it.py ? null : py;
}

// ---------- lưu tiến độ (trong máy + đồng bộ) ----------
const KEY = 'pylab:pron:v1';
let D = (() => { try { const d = JSON.parse(localStorage.getItem(KEY) || '{}'); return { c: d.c || {}, s: d.s || {} }; } catch { return { c: {}, s: {} }; } })();
let pushT = 0, pdirty = false;
const saveD = () => { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch { /* bỏ qua */ } pdirty = true; clearTimeout(pushT); pushT = setTimeout(pushNow, 2500); };
function pushNow() { pdirty = false; store.put('prefs', 'pylabpron', { c: D.c, s: D.s }); }
bus.on('flush', () => { clearTimeout(pushT); if (pdirty) pushNow(); });
function pull() {
  const r = store.get('prefs', 'pylabpron'); if (!r) return false;
  let ch = false;
  for (const [u, arr] of Object.entries(r.c || {})) { const have = new Set(D.c[u] ||= []); for (const h of arr) if (!have.has(h)) { D.c[u].push(h); ch = true; } }
  for (const [k, v] of Object.entries(r.s || {})) { const s = D.s[k] ||= [0, 0]; if (v[0] > s[0]) { s[0] = v[0]; ch = true; } if (v[1] > s[1]) { s[1] = v[1]; ch = true; } }
  if (ch) { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch { /* bỏ qua */ } }
  return ch;
}
bus.on('store', c => { if (c === 'prefs' || c === '*') { if (pull() && box && box.isConnected && P.view !== 'run') draw(); } });

const isWeak = k => { const s = D.s[hid(k)]; return !!s && s[1] > s[0]; };
const covSet = u => new Set(D.c[u] || []);
const unitCov = u => { const g = covSet(u.id); return u.items.reduce((n, it) => n + (g.has(hid(it.key)) ? 1 : 0), 0); };
const unitStar = u => u.items.length > 0 && unitCov(u) >= u.items.length;
const learnedKeys = () => { const s = new Set(); for (const u of UNITS) { const g = covSet(u.id); for (const it of u.items) if (g.has(hid(it.key))) s.add(it.key); } return s; };
function record(it, ok) {
  const s = D.s[hid(it.key)] ||= [0, 0]; s[ok ? 0 : 1]++;
  if (ok) for (const uid of IN_UNITS.get(it.key) || []) {
    const u = UNIT[uid], before = unitStar(u), arr = D.c[uid] ||= [], h = hid(it.key);
    if (!arr.includes(h)) arr.push(h);
    if (!before && unitStar(u)) toast('⭐ Hoàn thành 100% bài “' + u.t.split(' (')[0] + '”!', 2600);
  }
  tracker.quiz(ok); saveD();
}

// ---------- trạng thái ----------
let box = null;
const P = { view: 'home', unit: null, rmode: 'mix' };
let R = null; // lượt luyện đang chạy
const playIt = (it, slow = false) => say(it.hz, 'zh-CN', slow ? 0.55 : it.sy.length > 3 ? 0.8 : 0.7);

// bấm đúp vào nút tự chấm: lần thứ hai sẽ rơi trúng câu kế (chưa xem) nên bỏ qua
let ratedAt = 0;
const twice = () => { const t = Date.now(); if (t - ratedAt < 500) return true; ratedAt = t; return false; };

// ---------- ghi âm (chỉ trong RAM) ----------
let rec = null, recUrl = '', recBusy = false;
let recGen = 0, asking = -1, mineAu = null; // recGen tăng mỗi lần dừng / bỏ: micro mở muộn (đã sang câu khác) thì tắt ngay
function stopRec(drop = false) {
  recGen++; mineAu?.pause();
  try { rec?.recorder?.state === 'recording' && rec.recorder.stop(); } catch { /* bỏ qua */ }
  try { rec?.stream?.getTracks().forEach(t => t.stop()); } catch { /* bỏ qua */ }
  rec = null; recBusy = false;
  if (drop && recUrl) { URL.revokeObjectURL(recUrl); recUrl = ''; }
}
async function toggleRec() {
  if (recBusy) { rec?.recorder?.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Trình duyệt này không hỗ trợ ghi âm'); return; }
  try {
    if (asking === recGen) return; // đang chờ micro: bấm thêm không mở thêm luồng
    const gen = (asking = recGen);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    asking = -1;
    if (gen !== recGen) { stream.getTracks().forEach(t => t.stop()); return; }
    const recorder = new MediaRecorder(stream), chunks = [];
    recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    recorder.onstop = () => {
      if (rec?.recorder !== recorder) { stream.getTracks().forEach(t => t.stop()); return; } // đã sang câu khác / rời mục: bỏ bản ghi dở
      stream.getTracks().forEach(t => t.stop());
      if (recUrl) URL.revokeObjectURL(recUrl);
      recUrl = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })) : '';
      rec = null; recBusy = false; recBar();
    };
    rec = { recorder, stream }; recBusy = true; recorder.start(); recBar();
    setTimeout(() => { try { recorder.state === 'recording' && recorder.stop(); } catch { /* bỏ qua */ } }, 20000);
  } catch { asking = -1; toast('Chưa được phép dùng micro: hãy cho phép micro cho trang này', 4000); }
}
const playMine = () => { if (!recUrl) return; mineAu?.pause(); mineAu = new Audio(recUrl); mineAu.play().catch(() => {}); };
function compare(it) {
  if (!recUrl) { toast('Hãy ghi âm trước'); return; }
  const u = new SpeechSynthesisUtterance(it.hz); u.lang = 'zh-CN'; u.rate = 0.8; u.onend = () => setTimeout(playMine, 250);
  try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch { playMine(); }
}
function recBar() {
  const el = $('#pnRec', box); if (!el) return;
  el.textContent = recBusy ? '⏹ Dừng ghi' : '🎙 Ghi âm'; el.classList.toggle('on', recBusy);
  $$('#pnMine, #pnCmp', box).forEach(b => { b.disabled = !recUrl; });
}

// ---------- vẽ ----------
export function render(el) {
  box = el; pull();
  if (!box._pn) { box._pn = true; box.addEventListener('click', onClick); }
  draw();
}
export function leave() { stopRec(true); try { speechSynthesis.cancel(); } catch { /* bỏ qua */ } }
function draw() {
  if (!box) return;
  if (P.view === 'unit' && UNIT[P.unit]) return drawUnit(UNIT[P.unit]);
  if (P.view === 'review') return drawReview();
  if (P.view === 'run' && R) return drawRun();
  P.view = 'home'; drawHome();
}
const pbar = (pct, cls = '') => `<div class="plcov"><i class="${cls}"><b style="width:${pct}%"></b></i></div>`;
const unitPct = u => (u.items.length ? Math.floor(100 * unitCov(u) / u.items.length) : 0);

function drawHome() {
  const stars = UNITS.filter(unitStar).length, nW = [...ALL.keys()].filter(isWeak).length, nL = learnedKeys().size;
  box.innerHTML = `<div class="qcard pnhome"><div class="rvbig">📚 Lộ trình phát âm</div>
    <div class="dim">${UNITS.length} bài · ${ALL.size} từ và câu · ⭐ ${stars}/${UNITS.length} bài hoàn thành · đã đúng ${nL} từ</div>
    <div class="dim">Học theo thứ tự từ trên xuống: <b>thanh mẫu → vận mẫu → thanh điệu → cặp dễ nhầm → tổng hợp</b>. Mỗi bài: đọc phần kiến thức, bấm từng từ để nghe, rồi luyện nghe-chọn, gõ pinyin hoặc đọc theo và ghi âm. Làm đúng hết các từ của một bài là được ⭐.</div>
    <div class="row"><button class="btn primary big" id="pnReview">🔁 Tổng ôn</button><button class="btn" id="pnWeak" ${nW ? '' : 'disabled'}>⚠ Ôn từ hay sai (${nW})</button></div></div>
    ${STAGES.map(st => {
    const us = UNITS.filter(u => u.st === st.id), done = us.filter(unitStar).length;
    return `<div class="pnst"><div class="nw-sec">${esc(st.t)} <small class="dim">${done}/${us.length} bài</small></div><div class="dim">${esc(st.d)}</div>
      <div class="pnug">${us.map(u => {
    const pct = unitPct(u), star = unitStar(u);
    return `<button class="pnu ${star ? 'star' : ''}" data-u="${u.id}"><b>${star ? '⭐ ' : ''}${esc(u.t)}</b><span class="dim">${u.items.length} từ · ${star ? 100 : pct}%</span>${pbar(star ? 100 : pct)}</button>`;
  }).join('')}</div></div>`;
  }).join('')}`;
}

function wordRow(it) {
  const a = actual(it);
  return `<div class="pnw" data-say="${esc(it.key)}"><span class="plhz s" lang="zh">${esc(it.hz)}</span><span class="pnpy">${esc(markAll(it.py))}${a ? ` <small class="dim">→ đọc thực tế: ${esc(markAll(a))}</small>` : ''}</span><span class="pnvi dim">${esc(it.vi)}</span><button class="btn" data-say="${esc(it.key)}" title="Nghe">🔊</button><button class="btn" data-slow="${esc(it.key)}" title="Nghe chậm">🐢</button></div>`;
}
const listenOk = u => u.items.some(it => !it.nq && optionsFor(ctx(u, it)));
function drawUnit(u) {
  const have = unitCov(u), pct = unitPct(u), star = unitStar(u);
  box.innerHTML = `<div class="row plbar"><button class="btn" id="pnBack">← Lộ trình</button><b class="grow">${star ? '⭐ ' : ''}${esc(u.t)}</b></div>
    <div class="qcard pntip"><div class="qlabel">Kiến thức</div><div>${tipHtml(u.tip)}</div></div>
    <div class="plcov"><span>${star ? '⭐ Hoàn thành' : 'Tiến độ bài này'}</span><span class="cvn">${have}/${u.items.length} (${star ? 100 : pct}%)</span><i><b style="width:${star ? 100 : pct}%"></b></i></div>
    <div class="row pnact"><button class="btn primary" data-go="listen" ${listenOk(u) ? '' : 'disabled'} title="Nghe rồi chọn đáp án đúng">🎧 Nghe &amp; chọn</button><button class="btn" data-go="type" ${u.nt ? 'disabled' : ''} title="Nghe rồi gõ pinyin kèm số thanh">⌨ Gõ pinyin</button><button class="btn" data-go="speak" title="Đọc theo mẫu, ghi âm và so sánh">🎙 Đọc theo</button><button class="btn" data-go="mix" title="Trộn nghe-chọn và gõ pinyin">🔀 Trộn</button></div>
    <div class="dim">Bấm vào từng dòng để nghe mẫu; 🐢 để nghe chậm. Từ được ⭐ khi bạn làm đúng ít nhất một lần ở bất kỳ kiểu luyện nào.</div>
    <div class="pnlist">${u.groups.map(g => `<div class="pngrp">${g.ws.map(w => wordRow(itemOf(w.key))).join('')}</div>`).join('')}</div>`;
}

function drawReview() {
  const nW = [...ALL.keys()].filter(isWeak).length, L = learnedKeys();
  const modes = { listen: '🎧 Nghe & chọn', type: '⌨ Gõ pinyin', speak: '🎙 Đọc theo', mix: '🔀 Trộn' };
  box.innerHTML = `<div class="row plbar"><button class="btn" id="pnBack">← Lộ trình</button><b class="grow">🔁 Tổng ôn</b></div>
    <div class="qcard"><div class="dim">Chọn kiểu luyện, rồi chọn phạm vi ôn. Từ hay sai xuất hiện gấp đôi. Mỗi lượt khoảng 20 câu.</div>
    <div class="seg" id="pnRm">${Object.entries(modes).map(([k, n]) => `<button data-rm="${k}" class="${P.rmode === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
    <div class="pnug">
      <button class="pnu" data-rv="weak" ${nW ? '' : 'disabled'}><b>⚠ Từ hay sai</b><span class="dim">${nW} từ</span></button>
      <button class="pnu" data-rv="learned" ${L.size ? '' : 'disabled'}><b>✅ Tất cả từ đã đúng</b><span class="dim">${L.size} từ</span></button>
      <button class="pnu" data-rv="exam"><b>🎲 Kiểm tra tổng hợp</b><span class="dim">30 câu ngẫu nhiên từ mọi bài</span></button>
      ${STAGES.map(st => { const n = [...ALL.values()].filter(it => UNIT[it.u].st === st.id).length; const l = [...L].filter(k => UNIT[itemOf(k).u].st === st.id).length; return `<button class="pnu" data-rv="st:${st.id}"><b>${esc(st.t)}</b><span class="dim">đã đúng ${l}/${n} từ</span></button>`; }).join('')}
    </div>`;
}

// ---------- ra đề ----------
const syl = it => it.py.split(' ').length;
// các đáp án cho câu nghe-chọn: nhóm gần giống của từ + bổ sung từ cùng bài; trả về null nếu không đủ 2 phương án khác pinyin
function optionsFor(it) {
  if (!it || it.nq) return null;
  const u = UNIT[it.u], g = u.groups[it.gi]; if (!g || g.nq) return null;
  const seen = new Set([it.py]), opts = [it];
  const add = x => { if (x && !x.nq && !seen.has(x.py) && opts.length < 4) { seen.add(x.py); opts.push(x); } };
  shuffle(g.ws.filter(w => w.key !== it.key)).forEach(w => add(itemOf(w.key)));
  if (opts.length < 4) { // bổ sung đáp án nhiễu cùng bài, ưu tiên từ có cùng vận mẫu / thanh mẫu để khó nghe lẫn hơn
    const me = split(it.sy[0]), score = x => { const s = split(x.py.split(' ')[0]); return (s.f === me.f ? 2 : 0) + (s.i === me.i ? 1 : 0) + Math.random() * 0.9; };
    u.items.filter(x => syl(x) === syl(it) && x.gi !== it.gi).map(x => [score(x), x]).sort((a, b) => b[0] - a[0]).forEach(([, x]) => add(itemOf(x.key)));
  }
  return opts.length >= 2 ? shuffle(opts) : null;
}
function startRun({ title, pool, mode, n = 12, back }) {
  stopRec(true);
  const w = []; for (const it of pool) { w.push(it); if (isWeak(it.key)) w.push(it); }
  shuffle(w);
  const picked = [], seen = new Set();
  for (const it of w) { if (!seen.has(it.key)) { seen.add(it.key); picked.push(it); if (picked.length >= n) break; } }
  const qs = picked.map(it => {
    let m = mode;
    if (m === 'mix') m = Math.random() < 0.5 ? 'listen' : 'type';
    if (m === 'listen' && !optionsFor(it)) m = it.nt ? 'speak' : 'type';
    if (m === 'type' && it.nt) m = 'speak';
    return { it, mode: m };
  });
  if (!qs.length) { toast('Chưa có từ nào để luyện'); return; }
  R = { title, back, pool, mode, n, qs, i: 0, ok: 0, done: false, res: null, pick: null, opts: null, showHz: false };
  P.view = 'run'; setupQ(); draw(); autoPlay();
}
function setupQ() {
  const q = R.qs[R.i]; if (!q) return;
  R.done = false; R.res = null; R.pick = null; R.showHz = false; R.opts = q.mode === 'listen' ? (optionsFor(q.it) || [q.it]) : null;
  stopRec(true);
}
function autoPlay() { const q = R?.qs[R.i]; if (q && q.mode !== 'speak') setTimeout(() => { if (R && R.qs[R.i] === q && !R.done && box?.offsetParent) playIt(q.it); }, 250); }
const radio = (res, it) => `<div class="plrows">${res.rows.map(r => {
  const kt = r.key.t > 0 ? r.key.t : '';
  return `<div class="plsy ${r.ok ? 'ok' : 'bad'}"><b class="plch">${esc(r.ch || '')}</b><span class="plk"><i class="${r.iOk ? 'ok' : 'bad'}">${esc(r.key.i || '∅')}</i><i class="${r.fOk ? 'ok' : 'bad'}">${esc(r.key.f)}</i>${kt ? `<i class="${r.tOk ? 'ok' : 'bad'}">${kt}</i>` : ''}</span>${r.ok ? '' : `<span class="plg dim">${r.g ? 'bạn: ' + esc(r.got) : 'thiếu'}</span>`}</div>`;
}).join('')}</div>`;
const infoCard = it => { const a = actual(it); return `<div class="plans"><div class="plhz" lang="zh">${esc(it.hz)}</div><div class="plpy">${esc(markAll(it.py))}${a ? ` <small class="dim">→ đọc thực tế: ${esc(markAll(a))}</small>` : ''}</div><div class="dim">${esc(it.vi)}</div></div>`; };

function drawRun() {
  if (R.i >= R.qs.length) return drawEnd();
  const q = R.qs[R.i], it = q.it;
  const head = `<div class="row plbar"><button class="btn" id="pnStop">✕ Dừng</button><b class="grow">${esc(R.title)}</b><span class="dim">Câu ${R.i + 1}/${R.qs.length} · đúng ${R.ok}</span></div>${pbar(Math.round(100 * R.i / R.qs.length))}`;
  let body = '';
  if (q.mode === 'listen') {
    const opts = R.opts.map((o, k) => {
      const cls = R.done ? (o.key === it.key ? 'right' : R.pick === o.key ? 'wrong' : '') : '';
      return `<button class="qopt ${cls}" data-pick="${esc(o.key)}" ${R.done ? 'disabled' : ''}><i>${k + 1}</i><span><b>${esc(markAll(o.py))}</b> <small class="dim">${esc(o.hz)} · ${esc(o.vi)}</small></span></button>`;
    }).join('');
    const fb = R.done ? `<div class="qfb ${R.pick === it.key ? 'ok' : 'bad'}">${R.pick === it.key ? '✅ Đúng!' : '❌ Chưa đúng'}</div>${infoCard(it)}<div class="row"><button class="btn primary" id="pnNext">Tiếp ▶</button></div>` : '';
    body = `<div class="qlabel">Nghe và chọn đúng</div><div class="row c"><button class="btn primary big" id="pnPlay">🔊 Nghe</button><button class="btn" id="pnSlow">🐢 Chậm</button></div><div class="qopts">${opts}</div>${fb}`;
  } else if (q.mode === 'type') {
    const fb = R.done ? `<div class="qfb ${R.res.ok ? 'ok' : 'bad'}">${R.res.ok ? '✅ Đúng!' : `❌ Chưa đúng (${R.res.wrong}/${R.res.rows.length} âm tiết${R.res.extra ? `, thừa ${R.res.extra}` : ''})`}</div>${infoCard(it)}${radio(R.res, it)}<div class="dim plleg">Mỗi chữ: thanh mẫu · vận mẫu · thanh điệu (đỏ = sai). ∅ = không có thanh mẫu.</div><div class="row"><button class="btn primary" id="pnNext">Tiếp ▶</button></div>` : '';
    body = `<div class="qlabel">Nghe và gõ pinyin kèm số thanh${it.sy.length > 1 ? ', cách nhau bằng dấu cách' : ''} (ví dụ: ${it.sy.length > 1 ? 'ni3 hao3' : 'ma1'})</div>
      <div class="row c"><button class="btn primary big" id="pnPlay">🔊 Nghe</button><button class="btn" id="pnSlow">🐢 Chậm</button><button class="btn ${R.showHz ? 'on' : ''}" id="pnHz">👁 ${R.showHz ? 'Ẩn chữ Hán' : 'Xem chữ Hán'}</button></div>
      ${R.showHz && !R.done ? `<div class="plhz big" lang="zh">${esc(it.hz)}</div><div class="dim" style="text-align:center">${esc(it.vi)}</div>` : ''}
      <div class="row"><input id="pnIn" type="text" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="pinyin + số thanh…" ${R.done ? 'disabled' : ''}><button class="btn" id="pnU" tabindex="-1" title="Chèn chữ ü">ü</button><button class="btn primary" id="pnGo" ${R.done ? 'hidden' : ''}>Trả lời</button></div>${fb}`;
  } else {
    body = `<div class="qlabel">Đọc theo mẫu</div>${infoCard(it)}
      <div class="row c"><button class="btn primary" id="pnPlay">🔊 Mẫu</button><button class="btn" id="pnSlow">🐢 Chậm</button><button class="btn" id="pnRec">🎙 Ghi âm</button><button class="btn" id="pnMine" disabled>▶ Nghe lại mình</button><button class="btn" id="pnCmp" disabled>🔁 So sánh</button></div>
      <div class="dim">Bấm “Ghi âm”, đọc theo, bấm lại để dừng rồi nghe lại và so sánh với mẫu. Bản ghi chỉ nằm trong máy và mất khi sang câu khác.</div>
      <div class="row c"><span class="dim">Tự đánh giá:</span><button class="btn" data-self="1">✅ Đọc tốt</button><button class="btn" data-self="0">❌ Cần luyện thêm</button></div>`;
  }
  box.innerHTML = `${head}<div class="qcard plcard">${body}</div>`;
  if (q.mode === 'type' && !R.done) { const inp = $('#pnIn', box); inp?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); answerType(); } }); inp?.focus({ preventScroll: true }); }
  if (q.mode === 'speak') recBar();
}
function drawEnd() {
  const n = R.qs.length, pct = Math.round(100 * R.ok / n), bad = R.qs.filter(q => isWeak(q.it.key)).length;
  box.innerHTML = `<div class="row plbar"><b class="grow">${esc(R.title)}</b></div>
    <div class="qcard"><div class="rvbig">${pct >= 90 ? '🏆' : pct >= 70 ? '👍' : '💪'} ${R.ok}/${n} câu đúng (${pct}%)</div>
    <div class="dim">${pct >= 90 ? 'Rất tốt! Có thể sang bài kế tiếp.' : pct >= 70 ? 'Khá tốt. Làm thêm một lượt để chắc hơn.' : 'Nghe và đọc theo lại các từ sai, rồi làm lượt mới.'}${bad ? ` Còn ${bad} từ trong lượt này đang ở danh sách hay sai (sẽ gặp nhiều hơn).` : ''}</div>
    <div class="row"><button class="btn primary" id="pnAgain">↻ Làm lượt mới</button><button class="btn" id="pnExit">← Quay lại</button></div></div>`;
}
function answerType() {
  const v = ($('#pnIn', box)?.value || '').trim(); if (!v) { toast('Hãy gõ đáp án'); return; }
  const q = R.qs[R.i], it = q.it;
  R.res = gradeItem({ hz: it.hzg, sy: it.sy, lv: 2 }, v); R.done = true; if (R.res.ok) R.ok++; record(it, R.res.ok); draw();
}
function nextQ() { R.i++; setupQ(); draw(); if (R.i < R.qs.length) autoPlay(); scrollTo(0, 0); }
function exitRun() { stopRec(true); try { speechSynthesis.cancel(); } catch { /* bỏ qua */ } const b = R?.back; R = null; if (b) b(); else { P.view = 'home'; } draw(); scrollTo(0, 0); }

// ---------- sự kiện ----------
function poolFor(rv) {
  const all = [...ALL.values()], L = learnedKeys();
  if (rv === 'weak') return { title: '⚠ Từ hay sai', pool: all.filter(it => isWeak(it.key)), n: 20 };
  if (rv === 'learned') return { title: '✅ Ôn từ đã đúng', pool: all.filter(it => L.has(it.key)), n: 20 };
  if (rv === 'exam') return { title: '🎲 Kiểm tra tổng hợp', pool: all, n: 30 };
  const st = STAGES.find(s => s.id === rv.slice(3)), inSt = all.filter(it => UNIT[it.u].st === st.id), got = inSt.filter(it => L.has(it.key));
  return { title: '🔁 ' + st.t, pool: got.length >= 8 ? got : inSt, n: 20 };
}
function onClick(e) {
  const t = e.target;
  const sy = t.closest('[data-say],[data-slow]');
  if (sy && !R) { const it = itemOf(sy.dataset.say || sy.dataset.slow); if (it) playIt(it, sy.dataset.slow != null); return; }
  const u = t.closest('[data-u]'); if (u) { P.unit = u.dataset.u; P.view = 'unit'; draw(); scrollTo(0, 0); return; }
  const go = t.closest('[data-go]');
  if (go) { const un = UNIT[P.unit]; startRun({ title: un.t, pool: un.items.map(it => ctx(un, it)), mode: go.dataset.go, n: go.dataset.go === 'speak' ? 10 : 12, back: () => { P.view = 'unit'; } }); return; }
  if (t.closest('#pnBack')) { P.view = 'home'; draw(); scrollTo(0, 0); return; }
  if (t.closest('#pnReview')) { P.view = 'review'; draw(); scrollTo(0, 0); return; }
  if (t.closest('#pnWeak')) { const p = poolFor('weak'); startRun({ ...p, mode: P.rmode, back: () => { P.view = 'home'; } }); return; }
  const rm = t.closest('[data-rm]'); if (rm) { P.rmode = rm.dataset.rm; draw(); return; }
  const rv = t.closest('[data-rv]'); if (rv && !rv.disabled) { const p = poolFor(rv.dataset.rv); startRun({ ...p, mode: P.rmode, back: () => { P.view = 'review'; } }); return; }
  if (!R) return;
  if (t.closest('#pnStop') || t.closest('#pnExit')) { exitRun(); return; }
  if (t.closest('#pnAgain')) { startRun({ title: R.title, pool: R.pool, mode: R.mode, n: R.n, back: R.back }); return; }
  const q = R.qs[R.i]; if (!q) return;
  if (t.closest('#pnPlay')) { playIt(q.it); return; }
  if (t.closest('#pnSlow')) { playIt(q.it, true); return; }
  if (t.closest('#pnNext')) { nextQ(); return; }
  if (t.closest('#pnHz')) { const v = $('#pnIn', box)?.value || ''; R.showHz = !R.showHz; draw(); const i = $('#pnIn', box); if (i) { i.value = v; i.focus({ preventScroll: true }); } return; }
  if (t.closest('#pnU')) { const i = $('#pnIn', box); i.setRangeText('ü', i.selectionStart, i.selectionEnd, 'end'); i.focus(); return; }
  if (t.closest('#pnGo')) { answerType(); return; }
  const pk = t.closest('[data-pick]');
  if (pk && !R.done) { R.pick = pk.dataset.pick; R.done = true; const ok = R.pick === q.it.key; if (ok) R.ok++; record(q.it, ok); draw(); return; }
  if (t.closest('#pnRec')) { toggleRec(); return; }
  if (t.closest('#pnMine')) { playMine(); return; }
  if (t.closest('#pnCmp')) { compare(q.it); return; }
  const sf = t.closest('[data-self]');
  if (sf) { if (twice()) return; const ok = sf.dataset.self === '1'; if (ok) R.ok++; record(q.it, ok); toast(ok ? 'Tốt lắm! 👍' : 'Sẽ gặp lại từ này nhiều hơn', 1200); nextQ(); }
}
// phím tắt: Enter sang câu tiếp khi đã trả lời; 1–4 chọn đáp án nghe-chọn
document.addEventListener('keydown', e => {
  if (!box || !box.isConnected || P.view !== 'run' || !R || box.closest('[hidden]') || e.target.matches?.('input,textarea,select')) return;
  const q = R.qs[R.i]; if (!q) return;
  if (e.key === 'Enter' && R.done) $('#pnNext', box)?.click();
  else if (q.mode === 'listen' && !R.done && /^[1-4]$/.test(e.key)) $$('.qopt', box)[+e.key - 1]?.click();
});
