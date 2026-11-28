// Luyện âm (Tiếng Nhật): nghe & gõ kana, phân biệt âm gần giống, đọc & nói, Bảng chữ (hiragana, katakana, âm đục, âm ghép,
// âm mở rộng, chữ dễ nhầm: vai trò giống mục Bộ thủ bên tiếng Trung) và Phát âm (lộ trình bài học theo giáo trình, có đếm mora,
// cách đọc thực tế, âm của ん). Gõ Latinh là tự ra kana nên không cần cài bộ gõ tiếng Nhật.
// Giọng đọc dùng giọng có sẵn của máy (không tốn mạng / token). Ghi âm chỉ nằm trong RAM, không lưu.
import { $, $$, esc, toast, getLang, bus } from './util.js';
import { say, voiceFor } from './tts.js';
import * as tracker from './tracker.js';
import * as store from './store.js';
import * as K from './jalab-data.js';
import { STAGES, UNITS, UNIT } from './jalab-pron-data.js';

const BCP = 'ja-JP';
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hid = id => { let h = 5381; for (let i = 0; i < id.length; i++) h = ((h * 33) ^ id.charCodeAt(i)) >>> 0; return h.toString(36); };
const bold = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const norm = s => String(s || '').normalize('NFKC').replace(/[\s.,!?;:…'’"“”()\[\]·\/、。「」・-]/g, '');
const readings = it => (it.p ? it.p.split('/') : [it.w]);
const shownP = it => (it.p && norm(it.p.split('/')[0]) !== norm(it.w) ? it.p.split('/').map(x => `[${x}]`).join(' / ') : '');
const isSent = w => /[。？?]$/.test(w) || [...norm(w)].length > 9;
const isSingle = w => K.moras(w).length === 1 && [...w].length <= 2;
const kataOnly = w => K.isKata(w) && !/[ぁ-ゖ]/.test(w);
const moraText = w => { const m = K.moras(w); return `${m.length} mora: ${m.join(' · ')}`; };

// ---------- kho mục ----------
const POOL = new Map(); // id -> mục
const mk = (x, lv, grp) => {
  let it = POOL.get(x.w);
  if (!it) POOL.set(x.w, it = { id: x.w, w: x.w, p: x.p || '', vi: x.vi, lv: 0, grps: new Set() });
  if (!it.p && x.p) it.p = x.p;
  if (!it.vi) it.vi = x.vi;
  if (!it.lv && lv) it.lv = lv;
  if (grp) it.grps.add(grp);
  return it;
};
// mức dễ: từng âm của bảng chữ (bỏ を ぢ づ vì nghe giống hệt お じ ず)
const EASY = [];
for (const [grid, grp] of [[K.BASIC, 'va'], [K.DAKU, 'dg'], [K.YOON, 'yo']]) {
  for (const r of grid) for (const c of r.cells) {
    if (!c || 'をぢづ'.includes(c[0])) continue;
    EASY.push(mk({ w: c[0], vi: `âm “${c[1]}” (hiragana)` }, 1, grp));
    EASY.push(mk({ w: K.toKata(c[0]), vi: `âm “${c[1]}” (katakana)` }, 1, 'kt'));
  }
}
const WORDS = Object.entries(K.WORDS).flatMap(([g, l]) => l.map(x => mk(x, 2, g)));
const SENTS = Object.entries(K.SENTS).flatMap(([g, l]) => l.map(x => mk(x, 3, g)));
const MAIN = [...new Set([...EASY, ...WORDS, ...SENTS])];
// phân biệt: mỗi nhóm gần giống
const DSET = new Map(); // id -> [nhóm]
const DITEMS = [];
for (const set of K.DISC) {
  const ws = set.ws.map(x => mk(x, 0, null));
  for (const it of ws) {
    if (!DSET.has(it.id)) { DSET.set(it.id, []); DITEMS.push(it); }
    DSET.get(it.id).push({ g: set.g, ws });
  }
}
// bài học: từ trong từng bài (bản riêng của bài được ưu tiên về nghĩa và cách đọc)
for (const u of UNITS) {
  u.items = [];
  u.groups.forEach((line, gi) => line.forEach(x => {
    const a = u.ans ? x.p : '', p = u.ans ? '' : x.p;
    const base = mk({ w: x.w, p, vi: x.vi }, 0, null);
    if (!u.items.some(i => i.id === base.id)) u.items.push({ id: base.id, w: x.w, p: p || (u.ans ? '' : base.p), a, vi: x.vi || base.vi, gi });
  }));
}
const findIt = id => (id?.startsWith('L') ? K.LETTERS.find(l => l.id === id) : POOL.get(id)) || null;
// các chữ thuộc nhóm “dễ nhầm”
const CF = new Set([...K.CONFUSE.h, ...K.CONFUSE.k].flatMap(([s]) => s.split(' ')));
const lettersOf = g => K.LETTERS.filter(l => g === 'all' || (g === 'cf' ? CF.has(l.ch) : l.g === g));
const ROMA = new Map(K.LETTERS.map(l => [l.ch, l.rom]));

// ---------- lưu: tiến độ + số lần đúng / sai (trong máy, đồng bộ qua kho dữ liệu prefs/jalab) ----------
const KEY = 'jalab:v1';
let D = (() => { try { const d = JSON.parse(localStorage.getItem(KEY) || '{}'); return { c: d.c || {}, s: d.s || {} }; } catch { return { c: {}, s: {} }; } })();
let pushT = 0, pdirty = false;
const saveLocal = () => { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch { /* bỏ qua */ } };
const save = () => { saveLocal(); pdirty = true; clearTimeout(pushT); pushT = setTimeout(pushNow, 2500); };
function pushNow() { pdirty = false; store.put('prefs', 'jalab', { c: D.c, s: D.s }); }
bus.on('flush', () => { clearTimeout(pushT); if (pdirty) pushNow(); });
function pull() {
  const r = store.get('prefs', 'jalab'); if (!r) return false;
  let ch = false;
  for (const [k, arr] of Object.entries(r.c || {})) { const have = new Set(D.c[k] ||= []); for (const h of arr) if (!have.has(h)) { D.c[k].push(h); ch = true; } }
  for (const [k, v] of Object.entries(r.s || {})) { const s = D.s[k] ||= [0, 0]; if (v[0] > s[0]) { s[0] = v[0]; ch = true; } if (v[1] > s[1]) { s[1] = v[1]; ch = true; } }
  if (ch) saveLocal();
  return ch;
}
const isWeak = id => { const s = D.s[hid(id)]; return !!s && s[1] > s[0]; };
const got = key => new Set(D.c[key] || []);
const covOf = (key, items) => { const g = got(key); return items.reduce((n, it) => n + (g.has(hid(it.id)) ? 1 : 0), 0); };
function addCov(key, id, items, name) {
  const before = covOf(key, items), arr = D.c[key] ||= [], h = hid(id);
  if (!arr.includes(h)) arr.push(h);
  if (items.length && before < items.length && covOf(key, items) >= items.length) toast(`⭐ Hoàn thành 100% ${name}!`, 2600);
}
const covBar = (label, have, total) => {
  const pct = total ? Math.floor(100 * have / total) : 0;
  return `<div class="plcov"><span>${total && have >= total ? '⭐ Hoàn thành' : label}</span><span class="cvn">${have}/${total} (${pct}%)</span><i><b style="width:${pct}%"></b></i></div>`;
};
const ukey = u => 'u:' + u.id;
const learned = () => { const s = new Set(); for (const u of UNITS) { const g = got(ukey(u)); for (const it of u.items) if (g.has(hid(it.id))) s.add(it.id); } return s; };

// ---------- trạng thái ----------
const MODES = [['type', '🎧 Nghe &amp; gõ', 'Nghe rồi gõ kana'], ['disc', '🔀 Phân biệt', 'Nghe rồi chọn để phân biệt âm gần giống'], ['speak', '🎙 Đọc &amp; nói', 'Đọc theo mẫu, ghi âm và so sánh'], ['abc', '🔤 Bảng chữ', 'Hiragana, katakana, âm đục, âm ghép, chữ dễ nhầm'], ['pron', '📚 Phát âm', 'Lộ trình bài học phát âm theo giáo trình']];
const ASUB = [['table', '📋 Bảng kana'], ['conf', '👯 Dễ nhầm'], ['card', '🃏 Thẻ học'], ['pick', '🔀 Chọn âm'], ['type', '⌨ Gõ Latinh']];
const LVN = ['Mọi mức', 'Âm đơn', 'Từ', 'Câu'];
const DGROUPS = ['all', 'va', 'dg', 'yo', 'ch', 'so', 'nn'];
const PKEY = 'jalab:ui';
const V = { mode: 'type', abc: 'table', lv: 0, grp: 'all', lg: 'hb', fopen: null, view: 'home', unit: null, rmode: 'mix', letter: 'Lあ', kata: false, rom: true };
try { const p = JSON.parse(localStorage.getItem(PKEY) || '{}'); for (const k of ['mode', 'abc', 'lv', 'grp', 'lg', 'rom', 'kata']) if (p[k] !== undefined) V[k] = p[k]; } catch { /* bỏ qua */ }
if (!MODES.some(m => m[0] === V.mode)) V.mode = 'type';
if (!ASUB.some(m => m[0] === V.abc)) V.abc = 'table';
if (!K.NGROUPS[V.grp]) V.grp = 'all';
if (!K.LGROUPS[V.lg]) V.lg = 'hb';
const savePrefs = () => { try { localStorage.setItem(PKEY, JSON.stringify({ mode: V.mode, abc: V.abc, lv: V.lv, grp: V.grp, lg: V.lg, rom: V.rom, kata: V.kata })); } catch { /* bỏ qua */ } };

const flag = (k, def) => { try { const v = localStorage.getItem(k); return v == null ? def : v === '1'; } catch { return def; } };
const setFlag = (k, v) => { try { localStorage.setItem(k, v ? '1' : '0'); } catch { /* bỏ qua */ } };
let autoOn = flag('jalab:auto', false), kbOn = flag('jalab:kb', false);

let box = null, backCb = null;
let M = null;  // lượt luyện liên tục ở các chế độ chính: { key, bag, n, ok }
let R = null;  // lượt luyện trong mục Phát âm: { title, qs, i, ok, ... }
let T = null;  // câu đang hỏi: { kind, it, opts, done, pick, ok, input, showHz, flip, kata }
let ended = null; // kết quả { n, ok } sau khi bấm Kết thúc

// ---------- phát tiếng ----------
// chữ đơn は / へ: đọc bằng katakana để giọng máy không đọc thành trợ từ “wa” / “e”
const literal = t => (t === 'は' ? 'ハ' : t === 'へ' ? 'ヘ' : t);
const speak = (text, slow = false) => say(literal(text), BCP, slow ? 0.55 : [...text].length > 8 ? 0.9 : 0.75);
const sayOf = it => it.say || it.w;
const play = slow => { if (T) speak(sayOf(T.it), slow); };

// ngắt tiếng đang đọc (đổi câu, đổi tab, rời mục)
const hush = () => { try { speechSynthesis.cancel(); } catch { /* bỏ qua */ } };

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
function compare() {
  if (!recUrl) { toast('Hãy ghi âm trước'); return; }
  const u = new SpeechSynthesisUtterance(literal(sayOf(T.it))); u.lang = BCP; u.rate = 0.8;
  const v = voiceFor(BCP); if (v) u.voice = v;
  u.onend = () => setTimeout(playMine, 250);
  u.onerror = e => { if (e.error !== 'canceled' && e.error !== 'interrupted') playMine(); }; // máy thiếu giọng đọc: vẫn cho nghe lại bản ghi
  try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch { playMine(); }
}
function recBar() {
  const el = $('[data-a="rec"]', box); if (!el) return;
  el.textContent = recBusy ? '⏹ Dừng ghi' : '🎙 Ghi âm'; el.classList.toggle('on', recBusy);
  $$('[data-a="mine"], [data-a="cmp"]', box).forEach(b => { b.disabled = !recUrl; });
}

// ---------- ra đề ----------
// các phương án “cách đọc” sai nhưng giống thật: đọc y như chữ viết, bỏ trường âm / っ / ん, đọc sai trợ từ
function wrongReadings(it) {
  const bare = s => s.replace(/[。？]/g, ''); // mọi phương án bỏ dấu câu, kẻo nhìn dấu là đoán ra
  const ok = new Set(readings(it).map(norm)), right = bare(readings(it)[0]), ch = [...right], out = new Map();
  const same = K.soundKey(norm(right)); // phương án nghe giống hệt đáp án (を=お, おう=おお) thì bỏ, trừ bản viết nguyên
  const add = s => { const k = norm(s); if (k && !ok.has(k) && !out.has(k) && K.soundKey(k) !== same) out.set(k, s); };
  ch.forEach((c, i) => {
    const drop = () => add(ch.filter((_, j) => j !== i).join(''));
    const put = x => { const n = ch.slice(); n[i] = x; add(n.join('')); };
    if (i > 0 && 'あいうえおー'.includes(c)) drop();
    if (c === 'っ') { drop(); put('つ'); }
    if (c === 'ん') drop();
    if (c === 'わ') put('は');
    if (c === 'え') put('へ');
    if (c === 'お' && i > 0) { put('を'); put('う'); }
    if ('ゃゅょ'.includes(c)) put({ 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ' }[c]);
  });
  if (out.size < 3) ch.forEach((c, i) => { if (c === '。' || c === '？') return; const n = ch.slice(); n.splice(i + 1, 0, i % 2 ? 'っ' : 'う'); add(n.join('')); });
  const list = shuffle([...out.values()]);
  const written = bare(it.w);
  return (ok.has(norm(written)) ? list : [written, ...list.filter(x => norm(x) !== norm(written))]).slice(0, 3);
}
const keyOf = it => K.soundKey(norm(readings(it)[0]));
function listenOpts(it, unit) {
  if (unit) {
    const line = unit.items.filter(x => x.gi === it.gi);
    if (!unit.pair) { // bài thường: thêm từ cùng bài, ưu tiên cùng độ dài
      const len = x => K.moras(x.w).length;
      line.push(...shuffle(unit.items.filter(x => x.gi !== it.gi)).sort((a, b) => Math.abs(len(a) - len(it)) - Math.abs(len(b) - len(it))));
    }
    const seen = new Set([keyOf(it)]), opts = [it];
    for (const x of line) { const k = keyOf(x); if (!seen.has(k) && opts.length < 4) { seen.add(k); opts.push(x); } }
    return opts.length >= 2 ? shuffle(opts) : null;
  }
  const sets = DSET.get(it.id); if (!sets) return null;
  const s = sets.filter(x => V.grp === 'all' || x.g === V.grp), set = shuffle([...(s.length ? s : sets)])[0];
  return shuffle([it, ...shuffle(set.ws.filter(x => x.id !== it.id)).slice(0, 3)]);
}
const canMora = it => !isSent(it.w) && K.moras(it.w).length > 0;
const nAfter = it => { // âm của ん đầu tiên, theo chữ đứng sau
  const m = K.moras(K.toHira(it.w)), i = m.indexOf('ん'); if (i < 0) return '';
  const nx = m[i + 1]?.[0] || '';
  if ('まみむめもばびぶべぼぱぴぷぺぽ'.includes(nx) && nx) return 'm';
  if ('たちつてとだぢづでどなにぬねのらりるれろ'.includes(nx) && nx) return 'n';
  if ('かきくけこがぎぐげご'.includes(nx) && nx) return 'ng';
  return 'mũi';
};
const NOPT = { m: '[m] mím môi', n: '[n] lưỡi chạm lợi', ng: '[ng] gốc lưỡi nâng', 'mũi': 'âm mũi (không chạm đâu)' };
const romOf = it => it.a || ROMA.get(it.w) || '';
function makeQ(it, kind, unit = null) {
  const q = { kind, it, unit, done: false, pick: null, ok: false, input: '', showHz: false, flip: false, opts: null, kata: kataOnly(it.w) };
  if (kind === 'listen') q.opts = listenOpts(it, unit)?.map(o => ({ v: o.id, it: o }));
  if (kind === 'read') {
    q.ans = readings(it)[0].replace(/[。？]/g, '');
    q.opts = shuffle([q.ans, ...wrongReadings(it)]).map(s => ({ v: s }));
  }
  if (kind === 'mora') {
    const n = K.moras(it.w).length, lo = Math.max(1, n - 1 - Math.floor(Math.random() * 2));
    q.ans = String(n); q.opts = [0, 1, 2, 3].map(i => ({ v: String(lo + i) }));
  }
  if (kind === 'nsound') { q.ans = it.a || nAfter(it); q.opts = Object.keys(NOPT).map(v => ({ v })); }
  if (kind === 'lpick') {
    const seen = new Set([it.rom]), others = [];
    for (const l of shuffle(K.LETTERS.filter(l => l.g === it.g))) if (!seen.has(l.rom) && others.length < 3) { seen.add(l.rom); others.push(l); }
    q.opts = shuffle([it, ...others]).map(l => ({ v: l.id, label: l.rom }));
  }
  return q;
}
// Latinh người học gõ -> so với kana của từ (nhận cả Hepburn, Kunrei, trường âm viết lặp hoặc dấu -)
const macron = s => s.toLowerCase().replace(/[āâ]/g, 'aa').replace(/[īî]/g, 'ii').replace(/[ūû]/g, 'uu').replace(/[ēê]/g, 'ee').replace(/[ōô]/g, 'oo');
function romOk(input, want, kana) {
  const clean = s => macron(s).replace(/[\s.,!?'’-]/g, '');
  if (want && clean(input) === clean(want)) return true;
  const typed = K.romaji(macron(input).replace(/\s/g, ''), false, true);
  return K.soundKey(typed.replace(/\s/g, '')) === K.soundKey(kana); // không dùng norm: norm bỏ mất dấu trường âm gõ bằng “-”
}
function typedOk(q) {
  const it = q.it, a = norm(q.input);
  if (q.kind === 'rom') return romOk(q.input, romOf(it), it.w);
  // chữ đơn: so đúng chữ gõ ra (không gộp theo âm, kẻo “wo” được tính cho お)
  if (q.kind === 'ltype') return q.input.trim().toLowerCase() === it.rom || K.toHira(K.romaji(q.input.trim(), false, true)) === K.toHira(it.ch);
  if (q.kind === 'rtype') return readings(it).some(r => K.toHira(norm(r)) === K.toHira(a));
  const w = norm(it.w);
  if (a === w) return true;
  if (/[ぁ-ゖ]/.test(w) && K.isKata(w)) return K.toHira(a) === K.toHira(w); // từ trộn hai bộ chữ (ベトナムじん)
  // âm đơn: hai chữ đọc giống hệt nhau (じ/ぢ, ず/づ, お/を) đều được chấp nhận
  return isSingle(w) && K.isKata(a) === K.isKata(w) && K.soundKey(a) === K.soundKey(w);
}

// ---------- các chế độ chính ----------
const poolFor = () => {
  if (V.mode === 'abc') return lettersOf(V.lg);
  if (V.mode === 'disc') return DITEMS.filter(it => V.grp === 'all' || DSET.get(it.id).some(s => s.g === V.grp));
  return MAIN.filter(it => (V.lv === 0 || it.lv === V.lv) && (V.grp === 'all' || it.grps.has(V.grp)) && (V.mode !== 'speak' || V.lv === 1 || it.lv > 1));
};
const mainKey = () => (V.mode === 'abc' ? ['abc', V.abc, V.lg] : V.mode === 'disc' ? ['disc', V.grp] : [V.mode, V.lv, V.grp]).join('|');
const drills = () => V.mode === 'type' || V.mode === 'disc' || V.mode === 'speak' || (V.mode === 'abc' && ['card', 'pick', 'type'].includes(V.abc));
function nextMain() {
  hush();
  ended = null;
  stopRec(true);
  if (!M || M.key !== mainKey()) M = { key: mainKey(), bag: [], n: 0, ok: 0 };
  if (!M.bag.length) {
    const pool = poolFor();
    // trộn mọi mức thì giảm bớt âm đơn (số lượng rất nhiều) để còn gặp từ và câu
    const use = V.mode === 'type' && V.lv === 0 && V.grp !== 'kt' ? pool.filter(it => it.lv !== 1 || Math.random() < 0.35) : pool;
    M.bag = shuffle(use.flatMap(it => (isWeak(it.id) ? [it.id, it.id] : [it.id])));
  }
  const it = findIt(M.bag.shift());
  const kind = V.mode === 'abc' ? { card: 'card', pick: 'lpick', type: 'ltype' }[V.abc] : { type: 'type', disc: 'listen', speak: 'speak' }[V.mode];
  T = it ? makeQ(it, kind) : null;
  draw();
  if (autoOn) autoPlay();
}
function record(ok) {
  const q = T; q.ok = ok;
  const s = D.s[hid(q.it.id)] ||= [0, 0]; s[ok ? 0 : 1]++;
  if (R) {
    if (ok) {
      R.ok++;
      for (const u of UNITS) if (u.items.some(x => x.id === q.it.id)) addCov(ukey(u), q.it.id, u.items, `bài “${u.t}”`);
    }
  } else {
    M.n++; if (ok) { M.ok++; addCov(M.key, q.it.id, poolFor(), 'phần này'); }
  }
  tracker.quiz(ok); save();
}

// ---------- vẽ: phần đầu ----------
const chipRow = (attr, entries, cur) => `<div class="chips plopt">${entries.map(([k, n, c]) => `<button class="chip ${String(cur) === String(k) ? 'on' : ''}" ${attr}="${k}">${n}${c != null ? ` <small>${c}</small>` : ''}</button>`).join('')}</div>`;
const fbtn = (k, label, val) => `<button class="btn plf ${V.fopen === k ? 'on' : ''}" data-f="${k}"><span class="dim">${label}</span> <b>${val}</b> <span class="ar">${V.fopen === k ? '▲' : '▼'}</span></button>`;
function head() {
  let sub = '';
  if (V.mode === 'abc') {
    sub = `<div class="seg">${ASUB.map(([k, n]) => `<button data-abc="${k}" class="${V.abc === k ? 'on' : ''}">${n}</button>`).join('')}</div>`;
    if (drills()) sub += `<div class="row plfilters">${fbtn('lg', 'Nhóm:', K.LGROUPS[V.lg])}</div>${V.fopen === 'lg' ? chipRow('data-lg', Object.entries(K.LGROUPS).map(([k, n]) => [k, n, lettersOf(k).length]), V.lg) : ''}`;
  } else if (V.mode !== 'pron') {
    const lvPool = l => MAIN.filter(it => (l === 0 || it.lv === l) && (V.grp === 'all' || it.grps.has(V.grp)) && (V.mode !== 'speak' || l === 1 || it.lv > 1)).length;
    sub = `<div class="row plfilters">${V.mode === 'disc' ? '' : fbtn('lv', 'Mức:', LVN[V.lv])}${fbtn('grp', 'Nhóm:', K.NGROUPS[V.grp])}</div>`;
    if (V.fopen === 'lv') sub += chipRow('data-lv', LVN.map((n, l) => [l, n, lvPool(l)]), V.lv);
    if (V.fopen === 'grp') sub += chipRow('data-grp', Object.entries(K.NGROUPS).filter(([k]) => V.mode !== 'disc' || DGROUPS.includes(k)).map(([k, n]) => [k, n]), V.grp);
  }
  let stat = '';
  if (drills()) {
    const pool = poolFor(), nWeak = pool.filter(it => isWeak(it.id)).length;
    stat = `${covBar('Tiến độ phần này', covOf(mainKey(), pool), pool.length)}<div class="dim plstat">Phiên này: ${M?.n || 0} câu${M?.n ? ` · đúng ${M.ok} (${Math.round(100 * M.ok / M.n)}%)` : ''} · ${nWeak ? `${nWeak} mục hay sai (sẽ gặp nhiều hơn)` : 'chưa có mục hay sai'}</div>`;
  }
  return `<div class="plhead">
    <div class="row plbar"><button class="btn" data-a="lib">← Thư viện</button><b class="grow">🔊 Luyện âm tiếng Nhật</b></div>
    <div class="seg">${MODES.map(([k, n, tip]) => `<button data-m="${k}" class="${V.mode === k ? 'on' : ''}" title="${tip}">${n}</button>`).join('')}</div>
    ${sub}${stat}</div>`;
}

// ---------- vẽ: một câu hỏi ----------
const playRow = extra => `<div class="row c"><button class="btn primary big" data-a="play">🔊 Nghe</button><button class="btn" data-a="slow">🐢 Chậm</button>${extra || ''}</div>`;
const autoBtn = () => (R ? '' : `<button class="btn ${autoOn ? 'on' : ''}" data-a="auto" title="Bật thì sang câu mới sẽ tự đọc">🔁 ${autoOn ? 'Tự phát: Bật' : 'Tự phát: Tắt'}</button>`);
const info = it => `<div class="plans"><div class="plhz" lang="ja">${esc(it.w)}</div>${shownP(it) ? `<div class="plpy" lang="ja">đọc: ${esc(shownP(it))}</div>` : ''}<div class="dim">${esc(it.vi)}</div>${canMora(it) ? `<div class="dim" lang="ja">${esc(moraText(it.w))}</div>` : ''}</div>`;
const nextRow = () => '<div class="row"><button class="btn primary" data-a="next">Tiếp ▶</button></div>';
const verdict = (ok, msg) => `<div class="qfb ${ok ? 'ok' : 'bad'}">${ok ? '✅ Đúng!' : '❌ Chưa đúng'}${msg ? ' ' + msg : ''}</div>`;
// so từng mora (đỏ = sai)
function moraRows(want, typed) {
  const a = K.moras(want), b = K.moras(typed);
  if (!a.length) return '';
  return `<div class="plrows">${a.map((c, i) => `<div class="plsy ${c === b[i] ? 'ok' : 'bad'}"><b class="plch" lang="ja">${esc(c)}</b>${c === b[i] ? '' : `<span class="plg dim">${b[i] ? 'bạn: ' + esc(b[i]) : 'thiếu'}</span>`}</div>`).join('')}</div>${b.length > a.length ? `<div class="dim">Bạn gõ thừa: ${esc(b.slice(a.length).join(''))}</div>` : ''}`;
}
function keyboard() {
  if (!kbOn) return '';
  const k = c => { const x = T?.kata ? K.toKata(c) : c; return `<button class="btn" data-j="${x}">${x}</button>`; };
  return `<div class="klkb" lang="ja">${K.KEYROWS.map(row => `<div>${row.map(k).join('')}</div>`).join('')}<div><button class="btn klsp" data-a="mod"title="Thêm ゛ ゜ hoặc thu nhỏ chữ vừa gõ">゛゜小</button>${k('っ')}<button class="btn" data-j="ー" title="Trường âm">ー</button><button class="btn" data-a="bs" title="Xóa một chữ">⌫</button></div></div>`;
}
function kanaInput(q, hint) {
  return `<div class="row"><input class="klin" type="text" lang="ja" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${hint}" value="${esc(q.input)}" ${q.done ? 'disabled' : ''}><button class="btn primary" data-a="go" ${q.done ? 'hidden' : ''}>Trả lời</button></div>
    ${q.done ? '' : `<div class="row"><button class="btn" data-a="script" title="Đổi bộ chữ khi gõ Latinh">${q.kata ? 'カタカナ' : 'ひらがな'} ⇄</button><button class="btn ${kbOn ? 'on' : ''}" data-a="kb">⌨ Bàn phím kana</button></div><div class="dim">Gõ Latinh là tự ra kana (sushi → すし, kitte → きって, ん gõ nn, dấu - → ー), hoặc dùng bộ gõ tiếng Nhật.${q.kata ? ' Âm mở rộng: ファ fa, ティ thi, ディ dhi, ウェ we, シェ she, ヴァ va.' : ''}</div>${keyboard()}`}`;
}
const latinInput = (q, hint) => `<div class="row"><input class="klin" type="text" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${hint}" value="${esc(q.input)}" ${q.done ? 'disabled' : ''}><button class="btn primary" data-a="go" ${q.done ? 'hidden' : ''}>Trả lời</button></div>`;
const again = '<div class="row c"><button class="btn" data-a="play">🔊 Nghe</button><button class="btn" data-a="slow">🐢 Chậm</button></div>';
function qHtml() {
  const q = T, it = q.it;
  const optBtns = (label, right) => `<div class="qopts">${q.opts.map((o, k) => {
    const cls = q.done ? (right(o) ? 'right' : q.pick === o.v ? 'wrong' : '') : '';
    return `<button class="qopt ${cls}" data-pick="${esc(o.v)}" ${q.done ? 'disabled' : ''}><i>${k + 1}</i><span>${label(o)}</span></button>`;
  }).join('')}</div>`;
  const top = () => `<div class="plhz big" lang="ja">${esc(it.w)}</div><div class="dim" style="text-align:center">${esc(it.vi)}</div>`;
  if (q.kind === 'listen') {
    return `<div class="qlabel">Nghe và chọn đúng</div>${playRow(autoBtn())}
      ${optBtns(o => `<b lang="ja">${esc(o.it.w)}</b>${q.done && o.it.vi ? ` <small class="dim">${esc(o.it.vi)}</small>` : ''}`, o => o.v === it.id)}
      ${q.done ? verdict(q.ok) + info(it) + nextRow() : ''}`;
  }
  if (q.kind === 'type') {
    const w = norm(it.w), script = kataOnly(w) ? 'Katakana' : K.isKata(w) ? 'kana' : 'Hiragana';
    return `<div class="qlabel">Nghe rồi gõ bằng ${script} (${K.moras(w).length} mora)</div>
      ${playRow(autoBtn() + `<button class="btn ${q.showHz ? 'on' : ''}" data-a="hint">👁 ${q.showHz ? 'Ẩn nghĩa' : 'Gợi ý nghĩa'}</button>`)}
      ${q.showHz && !q.done ? `<div class="dim" style="text-align:center">${esc(it.vi)}</div>` : ''}
      ${kanaInput(q, script === 'Katakana' ? 'カタカナ…' : 'ひらがな…')}
      ${q.done ? verdict(q.ok, !q.ok && it.p && readings(it).some(r => norm(r) === norm(q.input)) ? '— đó là cách đọc, còn chữ viết thì khác' : !q.ok && K.toHira(norm(q.input)) === K.toHira(w) ? '— đúng âm nhưng sai bộ chữ' : q.ok && norm(q.input) !== w ? '— đọc giống nhau, chữ trong đề là bên dưới' : '') + info(it) + moraRows(w, q.input) + nextRow() : ''}`;
  }
  if (q.kind === 'read' || q.kind === 'rtype') {
    const after = q.done ? `${verdict(q.ok)}<div class="plans"><div class="plpy" lang="ja">đọc: ${esc(readings(it).map(x => `[${x}]`).join(' / '))}</div></div>${q.kind === 'rtype' ? moraRows(readings(it)[0], q.input) : ''}${again}${nextRow()}` : '';
    if (q.kind === 'read') return `<div class="qlabel">Từ / câu này đọc thế nào?</div>${top()}${optBtns(o => `<b lang="ja">[${esc(o.v)}]</b>`, o => o.v === q.ans)}${after}`;
    return `<div class="qlabel">Gõ cách đọc thực tế bằng kana</div>${top()}${kanaInput(q, '[cách đọc]…')}${after}`;
  }
  if (q.kind === 'mora') {
    return `<div class="qlabel">Từ này có mấy mora? (thử vỗ tay mỗi nhịp một tiếng)</div>${top()}${again}
      ${optBtns(o => `<b>${o.v} mora</b>`, o => o.v === q.ans)}
      ${q.done ? `${verdict(q.ok)}<div class="plans"><div class="plpy" lang="ja">${esc(K.moras(it.w).join(' · '))}</div></div>${nextRow()}` : ''}`;
  }
  if (q.kind === 'nsound') {
    return `<div class="qlabel">Chữ ん (ン) đầu tiên trong từ này đọc thế nào?</div>${top()}${again}
      ${optBtns(o => `<b>${NOPT[o.v]}</b>`, o => o.v === q.ans)}
      ${q.done ? `${verdict(q.ok)}<div class="dim">m: trước ま ば ぱ · n: trước た だ な ら · ng: trước か が · mũi: cuối từ, trước nguyên âm, s, h, y, w</div>${nextRow()}` : ''}`;
  }
  if (q.kind === 'rom') {
    return `<div class="qlabel">Đọc rồi gõ Romaji</div>${top()}${latinInput(q, 'ví dụ: sushi, koohii')}
      ${q.done ? `${verdict(q.ok)}<div class="plans"><div class="plpy">${esc(romOf(it))}</div></div>${again}${nextRow()}` : ''}`;
  }
  if (q.kind === 'kana') {
    return `<div class="qlabel">Viết bằng hiragana</div><div class="plhz big">${esc(it.a)}</div><div class="dim" style="text-align:center">${esc(it.vi)}</div>${kanaInput(q, 'ひらがな…')}
      ${q.done ? verdict(q.ok) + info(it) + moraRows(it.w, q.input) + again + nextRow() : ''}`;
  }
  if (q.kind === 'speak') {
    return `<div class="qlabel">Đọc theo mẫu</div>${info(it)}
      <div class="row c"><button class="btn primary" data-a="play">🔊 Mẫu</button><button class="btn" data-a="slow">🐢 Chậm</button><button class="btn" data-a="rec">🎙 Ghi âm</button><button class="btn" data-a="mine" disabled>▶ Nghe lại mình</button><button class="btn" data-a="cmp" disabled>🔁 So sánh</button></div>
      <div class="dim">Bấm “Ghi âm”, đọc theo, bấm lại để dừng rồi nghe lại và so sánh với mẫu. Bản ghi chỉ nằm trong máy và mất khi sang câu khác.</div>
      <div class="row c"><span class="dim">Tự đánh giá:</span><button class="btn" data-self="1">✅ Đọc tốt</button><button class="btn" data-self="0">❌ Cần luyện thêm</button>${R ? '' : '<button class="btn" data-a="next">Tiếp ▶</button>'}</div>`;
  }
  // ---- bảng chữ ----
  const big = `<div class="plhz big radhz" lang="ja">${it.ch}</div>`;
  if (q.kind === 'card') {
    if (!q.flip) return `<div class="qlabel">Chữ này đọc thế nào?</div>${big}<div class="row c"><button class="btn" data-a="play">🔊 Nghe</button><button class="btn primary" data-a="flip">👁 Xem đáp án</button></div><div class="dim">Nhớ lại cách đọc rồi lật thẻ để tự chấm.</div>`;
    return `${big}${letterInfo(it)}<div class="row c"><button class="btn" data-a="play">🔊 Nghe</button><button class="btn" data-self="1">✅ Nhớ rồi</button><button class="btn" data-self="0">❌ Chưa nhớ</button></div>`;
  }
  const after = q.done ? verdict(q.ok) + letterInfo(it) + nextRow() : '';
  if (q.kind === 'lpick') return `<div class="qlabel">Chọn cách đọc của chữ</div>${big}<div class="row c"><button class="btn" data-a="play">🔊 Nghe</button></div>${optBtns(o => esc(o.label), o => o.v === it.id)}${after}`;
  return `<div class="qlabel">Gõ Romaji của chữ</div>${big}<div class="row c"><button class="btn" data-a="play">🔊 Nghe</button></div>${latinInput(q, 'ví dụ: shi, kya, n')}${after}`;
}

// ---------- bảng chữ ----------
const letterInfo = l => `<div class="plans"><div><b>${esc(l.rom)}</b> · IPA [${esc(l.ipa)}]${l.other ? ` · ${K.isKata(l.ch) ? 'hiragana' : 'katakana'}: <b lang="ja">${l.other}</b>` : ''}</div><div>${esc(l.vi)}</div>${l.ex ? `<div class="dim">Ví dụ: <span lang="ja">${esc(l.ex)}</span></div>` : ''}${l.note ? `<div class="dim">⚠ Dễ nhầm — ${esc(l.note)}</div>` : ''}</div>`;
const sayBtn = (w, cls = 'btn') => `<button class="${cls}" data-say-ja="${esc(w)}">🔊 <span lang="ja">${esc(w)}</span></button>`;
function kanaGrid(grid, cols) {
  const conv = c => (V.kata ? K.toKata(c) : c);
  return `<div class="klwrap"><table class="kltbl"><thead><tr><th></th>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
    <tbody>${grid.map(r => `<tr><th>${r.name}</th>${r.cells.map(c => {
    if (!c) return '<td></td>';
    const ch = conv(c[0]);
    return `<td class="${V.letter === 'L' + ch ? 'on' : ''}"><button data-letter="L${ch}" lang="ja">${ch}${V.rom ? `<small>${c[1]}</small>` : ''}</button></td>`;
  }).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function drawTable() {
  let cur = findIt(V.letter) || findIt('Lあ');
  const exWords = cur.ex ? cur.ex.split(', ').map(x => x.split(' (')[0]).filter(x => /^[ぁ-ゖァ-ヺー]+$/.test(x)) : [];
  return `<div class="qcard klinfo"><div class="plhz big radhz" lang="ja">${cur.ch}</div>${letterInfo(cur)}
      <div class="row c">${sayBtn(cur.say, 'btn primary')}${exWords.map(w => sayBtn(w)).join('')}</div></div>
    <div class="row"><button class="btn ${V.kata ? '' : 'on'}" data-kata="0">ひらがな Hiragana</button><button class="btn ${V.kata ? 'on' : ''}" data-kata="1">カタカナ Katakana</button><button class="btn ${V.rom ? 'on' : ''}" data-a="rom">Latinh: ${V.rom ? 'hiện' : 'ẩn'}</button></div>
    <div class="nw-sec">46 chữ cơ bản (清音)</div>${kanaGrid(K.BASIC, K.COLS)}
    <div class="nw-sec">Âm đục ゛ và bán đục ゜</div>${kanaGrid(K.DAKU, K.COLS)}
    <div class="nw-sec">Âm ghép (拗音): 1 mora</div>${kanaGrid(K.YOON, K.YCOLS)}
    ${V.kata ? `<div class="nw-sec">Katakana mở rộng cho âm nước ngoài</div><div class="klgrid">${lettersOf('ke').map(l => `<button class="klc ${l.id === cur.id ? 'on' : ''}" data-letter="${l.id}"><b lang="ja">${l.ch}</b><small>${l.rom}</small></button>`).join('')}</div>` : ''}
    <div class="dim">Bấm một chữ để nghe và xem cách đọc ở khung trên cùng. Đọc theo hàng ngang (あいうえお, かきくけこ…): đó cũng là thứ tự từ điển. Khi đã quen, tắt dòng Latinh.</div>`;
}
function drawConfuse() {
  const part = (title, list) => `<div class="nw-sec">${title}</div><div class="pnlist">${list.map(([s, t]) => `<div class="pngrp"><div class="row">${s.split(' ').map(c => `<button class="klc" data-say-ja="${c}"><b lang="ja">${c}</b><small>${ROMA.get(c) || ''}</small></button>`).join('')}</div><div>${esc(t)}</div></div>`).join('')}</div>`;
  return `${part('Hiragana dễ nhầm', K.CONFUSE.h)}${part('Katakana dễ nhầm', K.CONFUSE.k)}
    <div class="dim">Bấm chữ để nghe. Luyện riêng: Thẻ học hoặc Chọn âm, nhóm “Chữ dễ nhầm”.</div>`;
}

// ---------- Phát âm: lộ trình ----------
const pbar = pct => `<div class="plcov"><i><b style="width:${pct}%"></b></i></div>`;
const kindsOf = u => {
  const k = u.kinds || ['listen', 'type', 'speak'];
  const all = u.rule ? ['read', 'rtype', ...k] : k;
  return all.filter(x => x !== 'listen' || u.items.some(it => listenOpts(it, u)));
};
const KN = { read: '🧩 Chọn cách đọc', rtype: '✍ Gõ cách đọc', mora: '👏 Đếm mora', nsound: '👃 Âm của ん', rom: '🔡 Gõ Romaji', kana: '✍ Viết hiragana', listen: '🎧 Nghe &amp; chọn', type: '⌨ Nghe &amp; gõ', speak: '🎙 Đọc theo' };
// ô “~さ:L く:H” vẽ thành sơ đồ cao độ
const cell = c => (c.startsWith('~') ? `<span class="japit" lang="ja">${c.slice(1).split(' ').map(x => { const [m, h] = x.split(':'); return `<span class="${h === 'H' ? 'h' : 'l'}" title="${h === 'H' ? 'cao' : 'thấp'}">${esc(m)}</span>`; }).join('')}</span>` : esc(c));
const tableHtml = src => {
  const rows = src.split('\n').map(r => r.split('^'));
  return `<div class="klwrap"><table class="klt"><thead><tr>${rows[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r => `<tr>${r.map(c => `<td>${cell(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
};
const wordRow = it => `<div class="pnw" data-say-ja="${esc(it.w)}"><span class="plhz s" lang="ja">${esc(it.w)}</span><span class="pnpy" lang="ja">${esc(shownP(it))}</span><span class="pnvi dim">${esc(it.vi)}</span><button class="btn" data-say-ja="${esc(it.w)}" title="Nghe">🔊</button><button class="btn" data-slow-ja="${esc(it.w)}" title="Nghe chậm">🐢</button></div>`;
const allUnitItems = () => { const m = new Map(); for (const u of UNITS) for (const it of u.items) if (!m.has(it.id) || u.rule) m.set(it.id, { it, u }); return [...m.values()]; };
function drawHome() {
  const withW = UNITS.filter(u => u.items.length), stars = withW.filter(u => covOf(ukey(u), u.items) >= u.items.length).length;
  const nW = allUnitItems().filter(x => isWeak(x.it.id)).length;
  return `<div class="qcard"><div class="rvbig">📚 Lộ trình phát âm</div>
    <div class="dim">${UNITS.length} bài · ⭐ ${stars}/${withW.length} bài luyện đã hoàn thành · đã đúng ${learned().size} từ</div>
    <div class="dim">Học từ trên xuống: <b>chữ viết &amp; mora → nguyên âm → hiragana → âm đục, âm ghép → trường âm, っ, ん → katakana → cao độ → bài tập</b>. Mỗi bài có kiến thức, từ mẫu để bấm nghe, và các kiểu luyện. Làm đúng hết từ của một bài là được ⭐.</div>
    <div class="row"><button class="btn primary big" data-a="review">🔁 Tổng ôn</button><button class="btn" data-rv="weak" ${nW ? '' : 'disabled'}>⚠ Ôn từ hay sai (${nW})</button></div></div>
    ${STAGES.map(st => {
    const us = UNITS.filter(u => u.st === st.id);
    return `<div class="pnst"><div class="nw-sec">${esc(st.t)}</div><div class="dim">${esc(st.d)}</div><div class="pnug">${us.map(u => {
      const have = covOf(ukey(u), u.items), pct = u.items.length ? Math.floor(100 * have / u.items.length) : 0, star = u.items.length && have >= u.items.length;
      return `<button class="pnu ${star ? 'star' : ''}" data-u="${u.id}"><b>${star ? '⭐ ' : ''}${esc(u.t)}</b><span class="dim">${u.items.length ? `${u.items.length} từ · ${pct}%` : 'bài đọc'}</span>${u.items.length ? pbar(pct) : ''}</button>`;
    }).join('')}</div></div>`;
  }).join('')}`;
}
function drawUnit(u) {
  const i = UNITS.indexOf(u), nx = UNITS[i + 1];
  const lines = u.groups.map((_, gi) => u.items.filter(it => it.gi === gi)).filter(l => l.length);
  return `<div class="row plbar"><button class="btn" data-a="home">← Lộ trình</button><b class="grow">${esc(u.t)}</b></div>
    <div class="qcard pntip"><div class="qlabel">Kiến thức</div><div>${bold(u.tip)}</div>${u.tables.map(tableHtml).join('')}</div>
    ${u.items.length ? `${covBar('Tiến độ bài này', covOf(ukey(u), u.items), u.items.length)}
    <div class="row pnact">${kindsOf(u).map((k, n) => `<button class="btn ${n === 0 ? 'primary' : ''}" data-go="${k}">${KN[k]}</button>`).join('')}</div>
    <div class="dim">Bấm vào từng dòng để nghe mẫu; 🐢 để nghe chậm. [ ] là cách đọc thực tế.</div>
    <div class="pnlist">${lines.map(l => `<div class="pngrp">${l.map(wordRow).join('')}</div>`).join('')}</div>` : ''}
    ${nx ? `<div class="row"><button class="btn" data-u="${nx.id}">Bài kế: ${esc(nx.t)} ▶</button></div>` : ''}`;
}
function drawReview() {
  const L = learned(), all = allUnitItems(), nW = all.filter(x => isWeak(x.it.id)).length;
  const modes = { mix: '🔀 Trộn', listen: '🎧 Nghe &amp; chọn', type: '⌨ Nghe &amp; gõ', read: '🧩 Cách đọc', mora: '👏 Đếm mora', speak: '🎙 Đọc theo' };
  return `<div class="row plbar"><button class="btn" data-a="home">← Lộ trình</button><b class="grow">🔁 Tổng ôn</b></div>
    <div class="qcard"><div class="dim">Chọn kiểu luyện rồi chọn phạm vi. Từ hay sai xuất hiện gấp đôi. Mỗi lượt khoảng 20 câu.</div>
    <div class="seg">${Object.entries(modes).map(([k, n]) => `<button data-rm="${k}" class="${V.rmode === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
    <div class="pnug">
      <button class="pnu" data-rv="weak" ${nW ? '' : 'disabled'}><b>⚠ Từ hay sai</b><span class="dim">${nW} từ</span></button>
      <button class="pnu" data-rv="learned" ${L.size ? '' : 'disabled'}><b>✅ Tất cả từ đã đúng</b><span class="dim">${L.size} từ</span></button>
      <button class="pnu" data-rv="exam"><b>🎲 Kiểm tra tổng hợp</b><span class="dim">30 câu ngẫu nhiên từ mọi bài</span></button>
      ${STAGES.map(st => { const n = all.filter(x => x.u.st === st.id).length; return n ? `<button class="pnu" data-rv="st:${st.id}"><b>${esc(st.t)}</b><span class="dim">${n} từ</span></button>` : ''; }).join('')}
    </div>`;
}
// chọn kiểu câu hỏi cho một từ trong một bài
function runQ(it, u, mode) {
  const kinds = kindsOf(u), canListen = !u.kinds || u.kinds.includes('listen'), canType = !u.kinds || u.kinds.includes('type');
  const ruled = u.rule && !!it.p;
  let m = mode;
  if (m === 'mix') {
    const special = kinds.filter(k => ['mora', 'nsound', 'rom', 'kana'].includes(k) && (k !== 'mora' || canMora(it)));
    m = shuffle([...(ruled ? ['read', 'read'] : []), ...special, ...special, ...(canListen ? ['listen'] : []), ...(canType ? ['type'] : [])])[0] || 'speak';
  }
  if (m === 'mora' && !canMora(it)) m = 'speak';
  let q = makeQ(it, m, u);
  if (m === 'listen' && !q.opts) q = makeQ(it, canType ? 'type' : 'speak', u);
  return q;
}
function startRun({ title, list, mode, n = 12, back }) {
  stopRec(true);
  if (mode === 'read') list = list.filter(x => x.it.p);
  if (mode === 'mora') list = list.filter(x => canMora(x.it));
  const w = []; for (const x of list) { w.push(x); if (isWeak(x.it.id)) w.push(x); }
  const picked = [], seen = new Set();
  for (const x of shuffle(w)) { if (!seen.has(x.it.id)) { seen.add(x.it.id); picked.push(x); if (picked.length >= n) break; } }
  if (!picked.length) { toast('Chưa có từ nào để luyện'); return; }
  R = { title, list, mode, n, back, qs: picked.map(x => runQ(x.it, x.u, mode)), i: 0, ok: 0 };
  V.view = 'run'; T = R.qs[0]; draw(); autoPlay(); scrollTo(0, 0);
}
// tự đọc sau một nhịp, trừ khi đã sang câu khác, đã trả lời hoặc đã rời mục (khung bị ẩn)
function autoPlay() { const q = T; if (q && (q.kind === 'listen' || q.kind === 'type')) setTimeout(() => { if (T === q && !q.done && box?.offsetParent) play(); }, 250); }
function drawRun() {
  if (R.i >= R.qs.length) {
    const n = R.qs.length, pct = Math.round(100 * R.ok / n);
    return `<div class="row plbar"><b class="grow">${esc(R.title)}</b></div>
      <div class="qcard"><div class="rvbig">${pct >= 90 ? '🏆' : pct >= 70 ? '👍' : '💪'} ${R.ok}/${n} câu đúng (${pct}%)</div>
      <div class="dim">${pct >= 90 ? 'Rất tốt! Có thể sang bài kế tiếp.' : pct >= 70 ? 'Khá tốt. Làm thêm một lượt để chắc hơn.' : 'Nghe và đọc theo lại các từ sai, rồi làm lượt mới.'}</div>
      <div class="row"><button class="btn primary" data-a="again">↻ Làm lượt mới</button><button class="btn" data-a="stop">← Quay lại</button></div></div>`;
  }
  return `<div class="row plbar"><button class="btn" data-a="stop">✕ Dừng</button><b class="grow">${esc(R.title)}</b><span class="dim">Câu ${R.i + 1}/${R.qs.length} · đúng ${R.ok}</span></div>${pbar(Math.round(100 * R.i / R.qs.length))}<div class="qcard plcard">${qHtml()}</div>`;
}
function exitRun() { stopRec(true); try { speechSynthesis.cancel(); } catch { /* bỏ qua */ } V.view = R.back; R = null; T = null; draw(); scrollTo(0, 0); }
function reviewPool(rv) {
  const all = allUnitItems(), L = learned();
  if (rv === 'weak') return { title: '⚠ Từ hay sai', list: all.filter(x => isWeak(x.it.id)), n: 20 };
  if (rv === 'learned') return { title: '✅ Ôn từ đã đúng', list: all.filter(x => L.has(x.it.id)), n: 20 };
  if (rv === 'exam') return { title: '🎲 Kiểm tra tổng hợp', list: all, n: 30 };
  const st = STAGES.find(s => s.id === rv.slice(3));
  return { title: '🔁 ' + st.t, list: all.filter(x => x.u.st === st.id), n: 20 };
}

// ---------- vẽ chung ----------
function draw() {
  if (!box) return;
  let body = '';
  if (V.mode === 'pron') {
    if (V.view === 'run' && R) { box.innerHTML = drawRun(); afterDraw(); return; }
    body = V.view === 'unit' && UNIT[V.unit] ? drawUnit(UNIT[V.unit]) : V.view === 'review' ? drawReview() : drawHome();
  } else if (drills() && ended) body = drawEnded();
  else if (V.mode === 'abc' && V.abc === 'table') body = drawTable();
  else if (V.mode === 'abc' && V.abc === 'conf') body = drawConfuse();
  else body = T ? `<div class="qcard plcard"><div class="row plend"><span class="grow"></span><button class="btn" data-a="end">⏹ Kết thúc</button></div>${qHtml()}</div>` : '<div class="empty">Không có mục nào khớp bộ lọc này. Hãy chọn nhóm khác.</div>';
  box.innerHTML = head() + body;
  afterDraw();
}
function afterDraw() {
  recBar();
  const inp = $('.klin', box);
  // chỉ tự đặt con trỏ khi dùng chuột: trên điện thoại sẽ bật bàn phím máy che mất đề
  if (inp && !inp.disabled && matchMedia('(pointer: fine)').matches) { inp.focus({ preventScroll: true }); inp.setSelectionRange(inp.value.length, inp.value.length); }
}
// sửa ô gõ tại vị trí con trỏ
function edit(fn) {
  const i = $('.klin', box); if (!i || i.disabled) return;
  const a = i.selectionStart ?? i.value.length, b = i.selectionEnd ?? a;
  const before = fn(i.value.slice(0, a), a !== b);
  i.value = before + i.value.slice(b);
  i.setSelectionRange(before.length, before.length);
  if (T) T.input = i.value;
}
const kanaKind = () => T && ['type', 'rtype', 'kana'].includes(T.kind);
// đổi Latinh đã gõ (phần trước con trỏ) thành kana
function toKana(i) {
  const a = i.selectionStart ?? i.value.length, head = i.value.slice(0, a);
  const next = K.romaji(head, T.kata);
  if (next === head) return;
  i.value = next + i.value.slice(a);
  i.setSelectionRange(next.length, next.length);
}
function onInput(e) {
  if (!T || !e.target.classList.contains('klin')) return;
  if (kanaKind() && !e.isComposing) toKana(e.target);
  T.input = e.target.value;
}
function answer() {
  let v = $('.klin', box)?.value || '';
  if (kanaKind()) v = K.romaji(v, T.kata, true);
  if (!v.trim()) { toast('Hãy gõ đáp án'); return; }
  T.input = v.trim(); T.done = true; record(typedOk(T)); draw();
}
function goNext() {
  if (!R) { nextMain(); return; }
  stopRec(true); hush(); R.i++; T = R.qs[R.i] || null; draw(); autoPlay(); scrollTo(0, 0);
}
// Kết thúc phiên bất kỳ lúc nào: chưa trả lời câu nào thì về Thư viện luôn, có rồi thì hiện kết quả trước
function endSession() {
  leave();
  const sum = { n: M?.n || 0, ok: M?.ok || 0 };
  M = null; T = null;
  if (!sum.n) { backCb?.(); return; }
  ended = sum; draw(); scrollTo(0, 0);
}
function drawEnded() {
  const { n, ok } = ended, pct = Math.round(100 * ok / n);
  return `<div class="qcard plcard"><div class="rvbig">${pct >= 90 ? '🏆' : pct >= 70 ? '👍' : '💪'} ${ok}/${n} câu đúng (${pct}%)</div>
    <div class="dim">Đã kết thúc phiên luyện.</div>
    <div class="row"><button class="btn primary" data-a="restart">↻ Làm lượt mới</button><button class="btn" data-a="lib">← Thư viện</button></div></div>`;
}
function setMode(m) {
  if (V.mode === m) return;
  stopRec(true); hush(); V.mode = m; V.fopen = null; R = null; T = null; ended = null; V.view = V.unit && V.view === 'unit' ? 'unit' : 'home';
  if (m === 'disc' && !DGROUPS.includes(V.grp)) V.grp = 'all';
  savePrefs(); M = null;
  if (drills()) nextMain(); else draw();
}
function refilter() { V.fopen = null; ended = null; savePrefs(); M = null; T = null; if (drills()) nextMain(); else draw(); }
const keepInput = () => { const v = $('.klin', box)?.value; if (T && v != null) T.input = v; };

// ---------- sự kiện ----------
function onClick(e) {
  const t = e.target.closest('button, [data-say-ja]'); if (!t || t.disabled || !box.contains(t)) return;
  const d = t.dataset;
  if (d.sayJa !== undefined) { speak(d.sayJa); return; }
  if (d.slowJa !== undefined) { speak(d.slowJa, true); return; }
  if (d.j !== undefined) { edit(s => s + d.j); return; }
  if (d.m) { setMode(d.m); return; }
  if (d.abc) { if (V.abc === d.abc) return; stopRec(true); V.abc = d.abc; refilter(); return; }
  if (d.f) { V.fopen = V.fopen === d.f ? null : d.f; keepInput(); draw(); return; }
  if (d.lv !== undefined) { V.lv = +d.lv; refilter(); return; }
  if (d.grp) { V.grp = d.grp; refilter(); return; }
  if (d.lg) { V.lg = d.lg; refilter(); return; }
  if (d.letter) { V.letter = d.letter; speak(findIt(d.letter).say); draw(); return; }
  if (d.kata !== undefined) {
    V.kata = d.kata === '1';
    const cur = findIt(V.letter); // giữ nguyên âm đang xem, đổi sang bộ chữ kia
    if (cur?.other && K.isKata(cur.ch) !== V.kata) V.letter = 'L' + cur.other; else if (cur && !cur.other) V.letter = V.kata ? 'Lア' : 'Lあ';
    savePrefs(); draw(); return;
  }
  if (d.u) { hush(); V.unit = d.u; V.view = 'unit'; draw(); scrollTo(0, 0); return; }
  if (d.go) { const u = UNIT[V.unit]; startRun({ title: u.t, list: u.items.map(it => ({ it, u })), mode: d.go, n: d.go === 'speak' ? 10 : 12, back: 'unit' }); return; }
  if (d.rm) { V.rmode = d.rm; draw(); return; }
  if (d.rv) { const p = reviewPool(d.rv); startRun({ ...p, mode: V.rmode, back: V.view === 'review' ? 'review' : 'home' }); return; }
  if (d.pick !== undefined) {
    if (!T || T.done) return;
    T.pick = d.pick; T.done = true; record(d.pick === (T.ans ?? T.it.id)); draw(); return;
  }
  if (d.self !== undefined) {
    if (twice()) return;
    const ok = d.self === '1'; record(ok); toast(ok ? 'Tốt lắm! 👍' : 'Sẽ gặp lại mục này nhiều hơn', 1200); goNext(); return;
  }
  switch (d.a) {
    case 'lib': leave(); backCb?.(); break;
    case 'home': hush(); V.view = 'home'; draw(); scrollTo(0, 0); break;
    case 'review': hush(); V.view = 'review'; draw(); scrollTo(0, 0); break;
    case 'stop': exitRun(); break;
    case 'again': startRun({ title: R.title, list: R.list, mode: R.mode, n: R.n, back: R.back }); break;
    case 'play': play(false); break;
    case 'slow': play(true); break;
    case 'next': goNext(); break;
    case 'end': endSession(); break;
    case 'restart': nextMain(); break;
    case 'go': answer(); break;
    case 'flip': ratedAt = Date.now(); T.flip = true; draw(); break;
    case 'hint': keepInput(); T.showHz = !T.showHz; draw(); break;
    case 'auto': autoOn = !autoOn; setFlag('jalab:auto', autoOn); t.classList.toggle('on', autoOn); t.textContent = autoOn ? '🔁 Tự phát: Bật' : '🔁 Tự phát: Tắt'; break;
    case 'kb': keepInput(); kbOn = !kbOn; setFlag('jalab:kb', kbOn); draw(); break;
    case 'script': keepInput(); T.kata = !T.kata; draw(); break;
    case 'mod': edit(s => K.modifyLast(s)); break;
    case 'bs': edit((s, sel) => (sel ? s : s.slice(0, -1))); break;
    case 'rom': V.rom = !V.rom; savePrefs(); draw(); break;
    case 'rec': toggleRec(); break;
    case 'mine': playMine(); break;
    case 'cmp': compare(); break;
  }
}
function onKey(e) {
  if (!e.target.classList?.contains('klin')) return;
  if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); e.stopPropagation(); answer(); }
}
// phím tắt ngoài ô gõ: Enter = lật thẻ / sang câu tiếp; 1–4 = chọn đáp án
document.addEventListener('keydown', e => {
  if (!box || !box.isConnected || box.closest('[hidden]') || e.target.matches?.('input,textarea,select') || !T) return;
  if (e.key === 'Enter' && e.target.matches?.('button')) return; // Enter trên nút: để nút tự bấm; phím số vẫn chọn được
  if (V.mode === 'pron' ? V.view !== 'run' : !drills()) return;
  if (e.key === 'Enter') $(T.kind === 'card' && !T.flip ? '[data-a="flip"]' : '[data-a="next"]', box)?.click();
  else if (!T.done && /^[1-4]$/.test(e.key)) $$('.qopt', box)[+e.key - 1]?.click();
});

// ---------- vào / ra ----------
export function render(el, opts = {}) {
  box = el; backCb = opts.back || null; V.fopen = null; ended = null; pull();
  if (!box._jl) {
    box._jl = true; box.addEventListener('click', onClick); box.addEventListener('keydown', onKey); box.addEventListener('input', onInput);
    box.addEventListener('compositionend', e => { if (T && e.target.classList.contains('klin')) { if (kanaKind()) toKana(e.target); T.input = e.target.value; } });
  }
  if (V.mode !== 'pron' && drills() && (!T || !M || M.key !== mainKey())) nextMain(); else draw();
}
export function leave() { stopRec(true); try { speechSynthesis.cancel(); } catch { /* bỏ qua */ } }
bus.on('store', c => { if ((c === 'prefs' || c === '*') && pull() && box?.isConnected && V.mode === 'pron' && V.view !== 'run') draw(); });
bus.on('show', v => { if (v !== 'library') leave(); });
bus.on('lang', () => { if (getLang() !== 'ja') leave(); });
