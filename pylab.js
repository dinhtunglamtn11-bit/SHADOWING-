// Luyện âm (Tiếng Trung): luyện nghe, phân biệt và nói pinyin, tập trung vào các thanh mẫu dễ nhầm
// (k · h, z · c · s, zh · ch · sh · r, j · q · x). 1000 mục trong pylab-data.js: 200 dễ (không thanh điệu), 500 trung bình
// (từ, có số thanh điệu), 300 khó (cả câu: thanh mẫu + vận mẫu + thanh điệu từng chữ). Đáp án đã được rà soát từng ngữ cảnh.
// Giọng đọc dùng giọng có sẵn của máy (không tốn mạng / token). Ghi âm chỉ nằm trong RAM, không lưu.
import { $, $$, esc, toast, getLang, bus, autoFocus } from './util.js';
import { say } from './tts.js';
import * as tracker from './tracker.js';
import { E, M, H } from './pylab-data.js';
import { M2, H2 } from './pylab-data2.js';
import { M3, H3 } from './pylab-data3.js';

// ---------- tách âm tiết: thanh mẫu · vận mẫu · thanh điệu ----------
const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's'];
const YW = { // y / w không phải thanh mẫu: quy về vận mẫu của âm tiết không thanh mẫu
  yi: 'i', ya: 'ia', ye: 'ie', yao: 'iao', you: 'iu', yan: 'ian', yin: 'in', yang: 'iang', ying: 'ing', yong: 'iong',
  yu: 'ü', yue: 'üe', yuan: 'üan', yun: 'ün', wu: 'u', wa: 'ua', wo: 'uo', wai: 'uai', wei: 'ui', wan: 'uan', wen: 'un', wang: 'uang', weng: 'ong',
};
const norm = s => s.toLowerCase().replace(/u:|v/g, 'ü').replace(/[^a-zü0-5]/g, '');
export function split(syl) {
  const m = /^([a-zü]+)([0-5])?$/.exec(norm(syl));
  if (!m) return { i: '', f: norm(syl), t: 0, bad: true };
  let b = m[1], t = m[2] ? +m[2] : 0;
  if (t === 0 && m[2] == null) t = -1; // chưa gõ thanh điệu
  if (YW[b]) return { i: '', f: YW[b], t };
  if (b === 'y' || b === 'w') return { i: '', f: b, t };
  const i = INITIALS.find(x => b.startsWith(x)) || '';
  let f = b.slice(i.length);
  if (/^[jqx]$/.test(i)) f = f.replace(/^u/, 'ü'); // ju / qu / xu viết u nhưng là ü
  if (/^[nl]$/.test(i) && f === 'ue') f = 'üe'; // nue / lue = nüe / lüe
  if (!f) f = i;
  return { i, f, t };
}
const TONE = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' };
export function mark(syl) { // zhong1 -> zhōng
  const m = /^([a-zü]+)([0-5])?$/.exec(syl);
  if (!m || !m[2] || m[2] === '5') return syl.replace(/[0-5]$/, '');
  const t = +m[2] - 1; let w = m[1];
  const pos = w.includes('a') ? w.indexOf('a') : w.includes('e') ? w.indexOf('e') : w.includes('ou') ? w.indexOf('o') : [...w].map((c, k) => (TONE[c] ? k : -1)).filter(k => k >= 0).pop();
  if (pos == null || pos < 0) return w;
  return w.slice(0, pos) + TONE[w[pos]][t] + w.slice(pos + 1);
}
const markAll = py => py.split(' ').map(mark).join(' ');

// ---------- dữ liệu ----------
const ITEMS = [
  ...E.map(([hz, py]) => ({ id: 'e' + hz, lv: 1, set: 1, hz, sy: [py] })),
  ...M.map(([hz, py]) => ({ id: 'm' + hz, lv: 2, set: 1, hz, sy: py.split(' ') })),
  ...M2.map(([hz, py]) => ({ id: 'm' + hz, lv: 2, set: 2, hz, sy: py.split(' ') })),
  ...M3.map(([hz, py]) => ({ id: 'm' + hz, lv: 2, set: 3, hz, sy: py.split(' ') })),
  ...H.map(([hz, py]) => ({ id: 'h' + hz, lv: 3, set: 1, hz, sy: py.split(' ') })),
  ...H2.map(([hz, py]) => ({ id: 'h' + hz, lv: 3, set: 2, hz, sy: py.split(' ') })),
  ...H3.map(([hz, py]) => ({ id: 'h' + hz, lv: 3, set: 3, hz, sy: py.split(' ') })),
];
const initOf = s => split(s).i;
const GROUPS = { all: ['Tất cả', null], kh: ['k · h', ['k', 'h']], zcs: ['z · c · s', ['z', 'c', 's']], zhr: ['zh · ch · sh · r', ['zh', 'ch', 'sh', 'r']], jqx: ['j · q · x', ['j', 'q', 'x']], oth: ['Khác', 'other'] };
const FOCUS = new Set(['k', 'h', 'z', 'c', 's', 'zh', 'ch', 'sh', 'r', 'j', 'q', 'x']);
const inGroup = (it, g) => {
  if (g === 'all') return true;
  const ins = it.sy.map(initOf);
  return GROUPS[g][1] === 'other' ? !ins.some(i => FOCUS.has(i)) : ins.some(i => GROUPS[g][1].includes(i));
};
const BASES = new Set(ITEMS.flatMap(it => it.sy.map(s => s.replace(/[0-5]$/, '')))); // mọi âm tiết có thật xuất hiện trong dữ liệu
const LV = { 0: 'Trộn', 1: 'Dễ', 2: 'Trung bình', 3: 'Khó' };

// ---------- thống kê (lưu trong máy, nhớ mục hay sai để cho gặp lại nhiều hơn) ----------
const SKEY = 'pylab:v1';
let stats = (() => { try { return JSON.parse(localStorage.getItem(SKEY) || '{}'); } catch { return {}; } })();
const saveStats = () => { try { localStorage.setItem(SKEY, JSON.stringify(stats)); } catch { /* bỏ qua */ } };
const mark2 = (id, ok) => { const s = stats[id] ||= [0, 0]; s[ok ? 0 : 1]++; saveStats(); };
const weak = id => { const s = stats[id]; return !!s && s[1] > s[0]; };

// ---------- trạng thái ----------
let box = null, backCb = null;
const AKEY = 'pylab:auto';
const S = { fopen: null, auto: false, mode: 'type', lv: 0, set: 0, grp: 'all', bag: [], cur: null, done: false, showHz: null, n: 0, ok: 0, disc: null, rec: null, recUrl: '', recBusy: false };
const inSet = it => S.set === 0 || it.set === S.set; // Bộ 1 / Bộ 2 / cả hai
const modeItems = () => ITEMS.filter(it => inSet(it) && (S.lv === 0 || it.lv === S.lv) && inGroup(it, S.grp) && (S.mode !== 'disc' || it.lv === 2 || (it.lv === 1 && split(it.sy[0]).i))); // phân biệt: bỏ chữ không có thanh mẫu, bỏ câu dài
function next() {
  stopRec(true);
  if (!S.bag.length) {
    const pool = modeItems();
    const ids = pool.flatMap(it => (weak(it.id) ? [it.id, it.id] : [it.id])); // mục hay sai xuất hiện gấp đôi
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    S.bag = ids;
  }
  const id = S.bag.shift();
  S.cur = ITEMS.find(it => it.id === id) || null; S.done = false; S.showHz = null; S.disc = null;
  if (S.cur && S.mode === 'disc') S.disc = makeDisc(S.cur);
  draw();
  if (S.auto && S.cur && S.mode !== 'speak') setTimeout(() => play(), 150); // mặc định KHÔNG tự đọc: chỉ phát khi bấm “Nghe”
}
const bcp = 'zh-CN';
function play(slow = false) {
  const it = S.cur; if (!it) return;
  say(it.hz, bcp, slow ? 0.55 : it.lv === 3 ? 0.8 : 0.7);
}

// ---------- chấm bài ----------
function parseInput(text, it) {
  const t = String(text || '').trim().toLowerCase().replace(/u:/g, 'ü').replace(/v/g, 'ü');
  if (!t) return [];
  if (it.lv === 1) return [t.replace(/[^a-zü]/g, '')]; // dễ: chỉ chữ cái, bỏ qua số
  if (/\d/.test(t)) return t.replace(/[,，.。;；]/g, ' ').match(/[a-zü]+[0-5]?/g) || []; // “kai1hui4” hay “kai1 hui4” đều được
  return t.split(/[\s,，.。;；]+/).filter(Boolean);
}
// các thanh điệu được chấp nhận cho từng âm tiết của đáp án (thanh nhẹ, 一 / 不, biến điệu thanh 3)
function okTones(it, k) {
  const key = split(it.sy[k]).t, ch = [...it.hz][k], nextT = k + 1 < it.sy.length ? split(it.sy[k + 1]).t : 0;
  if (key === 5) return 'any'; // thanh nhẹ: ai cũng nghe khác nhau, chỉ chấm thanh mẫu + vận mẫu
  const set = new Set([key]);
  if ('上里下边面头子'.includes(ch) && k > 0) { set.add(5); set.add(0); set.add(-1); } // 山上、桌子上、家里…: đọc nhẹ, gõ có thanh hay không đều được
  if (ch === '不' && key === 4 && nextT === 4) set.add(2);
  if (ch === '一') { set.add(1); set.add(2); set.add(4); }
  if (key === 3 && nextT === 3) set.add(2);
  return set;
}
export function gradeItem(it, text) {
  const got = parseInput(text, it), rows = [], chars = [...it.hz];
  let wrong = 0;
  for (let k = 0; k < it.sy.length; k++) {
    const key = split(it.sy[k]);
    const g = got[k] != null ? split(got[k]) : null;
    const alias = s => s.replace(/^shei/, 'shui');
    const gi = g ? g.i : '', gf = g ? g.f : '';
    const sameBase = g && (it.lv === 1 ? alias(norm(got[k]).replace(/[0-5]/g, '')) === alias(it.sy[k]) : (gi === key.i && gf === key.f) || alias(norm(got[k]).replace(/[0-5]/g, '')) === alias(it.sy[k].replace(/[0-5]/g, '')));
    const iOk = !!g && (it.lv === 1 ? sameBase : (gi === key.i || sameBase));
    const fOk = !!g && (it.lv === 1 ? sameBase : (gf === key.f || sameBase));
    let tOk = true;
    if (it.lv > 1) { const ok = okTones(it, k); tOk = !!g && (ok === 'any' || ok.has(g.t)); }
    const ok = !!g && sameBase && tOk;
    if (!ok) wrong++;
    rows.push({ ch: chars[k], key, g, got: got[k] || '', iOk, fOk, tOk, ok });
  }
  const extra = Math.max(0, got.length - it.sy.length);
  return { ok: wrong === 0 && extra === 0, rows, wrong, extra };
}

// ---------- phân biệt (nghe rồi chọn) ----------
const CONF = { k: ['h', 'g'], h: ['k', 'f'], g: ['k', 'h'], z: ['c', 's', 'zh'], c: ['z', 's', 'ch'], s: ['z', 'c', 'sh'], zh: ['ch', 'sh', 'z', 'r'], ch: ['zh', 'sh', 'c'], sh: ['zh', 'ch', 's', 'r'], r: ['sh', 'l', 'zh'], j: ['q', 'x'], q: ['j', 'x', 'ch'], x: ['j', 'q', 'sh'], b: ['p', 'd'], p: ['b', 't'], d: ['t', 'b'], t: ['d', 'p'], l: ['n', 'r'], n: ['l', 'm'], m: ['n', 'b'], f: ['h', 'p'] };
const spell = (i, f) => (/^[jqx]$/.test(i) ? i + f.replace(/^ü/, 'u') : i + f);
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function makeDisc(it) {
  if (it.lv === 1) { // phân biệt thanh mẫu: cùng vận mẫu, thanh mẫu dễ nhầm
    const key = split(it.sy[0]), target = it.sy[0];
    const cand = (CONF[key.i] || []).map(i => spell(i, key.f)).filter(s => BASES.has(s) && s !== target);
    let opts = cand.slice(0, 3);
    if (opts.length < 2) { // thiếu âm tiết có thật: bổ sung bằng âm tiết khác cùng nhóm
      const more = shuffle([...BASES].filter(b => b !== target && FOCUS.has(split(b).i) && !opts.includes(b)));
      opts = [...opts, ...more.slice(0, 3 - opts.length)];
    }
    return { kind: 'init', opts: shuffle([target, ...opts]).map(s => ({ v: s, label: s })), ans: target, note: 'Nghe và chọn âm đúng (thanh mẫu dễ nhầm)' };
  }
  const tgt = it.sy.join(' '), opts = new Set([tgt]); // phân biệt thanh điệu: đổi thanh của một âm tiết
  let guard = 0;
  while (opts.size < 4 && guard++ < 30) {
    const sy = it.sy.map(s => s);
    const k = Math.floor(Math.random() * sy.length), m = /^([a-zü]+)([1-5])$/.exec(sy[k]);
    if (!m) continue;
    const t = 1 + Math.floor(Math.random() * 4);
    if (t === +m[2]) continue;
    sy[k] = m[1] + t; opts.add(sy.join(' '));
  }
  return { kind: 'tone', opts: shuffle([...opts]).map(s => ({ v: s, label: markAll(s) })), ans: tgt, note: 'Nghe và chọn đúng thanh điệu' };
}

// ---------- ghi âm (chỉ trong RAM) ----------
function stopRec(drop = false) {
  try { S.rec?.recorder?.state === 'recording' && S.rec.recorder.stop(); } catch { /* bỏ qua */ }
  try { S.rec?.stream?.getTracks().forEach(t => t.stop()); } catch { /* bỏ qua */ }
  S.rec = null; S.recBusy = false;
  if (drop && S.recUrl) { URL.revokeObjectURL(S.recUrl); S.recUrl = ''; }
}
async function toggleRec() {
  if (S.recBusy) { S.rec?.recorder?.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Trình duyệt này không hỗ trợ ghi âm'); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream), chunks = [];
    recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    recorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      if (S.recUrl) URL.revokeObjectURL(S.recUrl);
      S.recUrl = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })) : '';
      S.rec = null; S.recBusy = false; drawRecBar();
    };
    S.rec = { recorder, stream }; S.recBusy = true; recorder.start();
    drawRecBar();
    setTimeout(() => { try { recorder.state === 'recording' && recorder.stop(); } catch { /* bỏ qua */ } }, 20000); // tối đa 20 giây
  } catch { toast('Chưa được phép dùng micro: hãy cho phép micro cho trang này', 4000); }
}
const playMine = () => { if (S.recUrl) new Audio(S.recUrl).play().catch(() => {}); };
function compare() { // nghe mẫu rồi tới giọng của bạn
  if (!S.recUrl) { toast('Hãy ghi âm trước'); return; }
  const it = S.cur, u = new SpeechSynthesisUtterance(it.hz);
  u.lang = bcp; u.rate = 0.8; u.onend = () => setTimeout(playMine, 250);
  try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch { playMine(); }
}
function drawRecBar() {
  const el = $('#plRec', box); if (!el) return;
  el.textContent = S.recBusy ? '⏹ Dừng ghi' : '🎙 Ghi âm';
  el.classList.toggle('on', S.recBusy);
  $$('#plMine, #plCmp', box).forEach(b => { b.disabled = !S.recUrl; });
}

// ---------- vẽ giao diện ----------
const poolCounts = () => {
  const c = {}; for (const g of Object.keys(GROUPS)) c[g] = ITEMS.filter(it => inSet(it) && (S.lv === 0 || it.lv === S.lv) && inGroup(it, g)).length;
  return c;
};
const SETNAME = { 0: 'Cả 3 bộ', 1: 'Bộ 1', 2: 'Bộ 2', 3: 'Bộ 3' };
const SETTIP = { 0: 'Cả ba bộ', 1: 'Bộ 1: 200 dễ + 500 trung bình + 300 khó', 2: 'Bộ 2: 500 trung bình (từ dài hơn) + 500 khó (câu dài hơn)', 3: 'Bộ 3: 200 trung bình + 800 khó (câu mới, dài, dày thanh mẫu dễ nhầm)' };
const lvName = l => (l === 0 ? 'Mọi mức' : LV[l]);
// Thanh bộ lọc gọn: ba nút có mũi tên ▼, bấm nút nào thì xổ ra lựa chọn của nút đó (mở một nút thì nút kia tự đóng)
function filterOptions() {
  const cnt = poolCounts();
  if (S.fopen === 'set') return `<div class="chips plopt" id="plSet">${[0, 1, 2, 3].map(s => `<button class="chip ${S.set === s ? 'on' : ''}" data-s="${s}" title="${SETTIP[s]}">${SETNAME[s]} <small>${ITEMS.filter(it => s === 0 || it.set === s).length}</small></button>`).join('')}</div>`;
  if (S.fopen === 'lv') return `<div class="chips plopt" id="plLv">${[0, 1, 2, 3].filter(l => S.mode !== 'disc' || l < 3).map(l => `<button class="chip ${S.lv === l ? 'on' : ''}" data-l="${l}">${lvName(l)} <small>${ITEMS.filter(it => inSet(it) && (l === 0 || it.lv === l)).length}</small></button>`).join('')}</div>`;
  if (S.fopen === 'grp') return `<div class="chips plopt" id="plGrp">${Object.entries(GROUPS).map(([k, [n]]) => `<button class="chip ${S.grp === k ? 'on' : ''}" data-g="${k}">${n} <small>${cnt[k]}</small></button>`).join('')}</div>`;
  return '';
}
function head() {
  const nWeak = ITEMS.filter(it => weak(it.id)).length, o = S.fopen;
  const fb = (k, label, val) => `<button class="btn plf ${o === k ? 'on' : ''}" data-f="${k}"><span class="dim">${label}</span> <b>${val}</b> <span class="ar">${o === k ? '▲' : '▼'}</span></button>`;
  return `<div class="plhead">
    <div class="row plbar"><button class="btn" id="plBack">← Thư viện</button><b class="grow">🔊 Luyện âm</b></div>
    <div class="seg" id="plMode"><button data-m="type" class="${S.mode === 'type' ? 'on' : ''}" title="Nghe rồi gõ pinyin">🎧 Nghe &amp; gõ</button><button data-m="disc" class="${S.mode === 'disc' ? 'on' : ''}" title="Nghe rồi chọn đáp án để phân biệt âm gần giống">🔀 Phân biệt</button><button data-m="speak" class="${S.mode === 'speak' ? 'on' : ''}" title="Đọc theo mẫu, ghi âm và so sánh">🎙 Đọc &amp; nói</button></div>
    <div class="row plfilters">${fb('set', 'Bộ:', SETNAME[S.set])}${fb('lv', 'Mức:', lvName(S.lv))}${fb('grp', 'Thanh mẫu:', GROUPS[S.grp][0])}</div>
    ${filterOptions()}
    <div class="dim plstat">Phiên này: ${S.n} câu${S.n ? ` · đúng ${S.ok} (${Math.round(100 * S.ok / S.n)}%)` : ''} · ${nWeak ? `${nWeak} mục hay sai (sẽ gặp nhiều hơn)` : 'chưa có mục hay sai'}</div>
  </div>`;
}
function refreshHead() { // chỉ vẽ lại phần đầu, giữ nguyên câu hỏi và chữ bạn đang gõ
  const el = $('.plhead', box); if (!el) return;
  el.outerHTML = head(); bindHead();
}
function hintFor(it) {
  return it.lv === 1 ? 'Gõ pinyin KHÔNG thanh điệu (ví dụ: kan). Có thể gõ v thay cho ü.'
    : it.lv === 2 ? 'Gõ pinyin kèm số thanh điệu (ví dụ: kai1 hui4). Thanh nhẹ không cần số hoặc gõ 5.'
      : 'Gõ cả câu: pinyin kèm số thanh điệu cho từng chữ, cách nhau bằng dấu cách (ví dụ: wo3 xi3 huan5 he1 cha2).';
}
function rowsHtml(res) {
  const tags = (r) => {
    const kt = r.key.t > 0 ? r.key.t : '';
    const gt = r.g ? (r.g.t > 0 ? r.g.t : '–') : '';
    return `<div class="plsy ${r.ok ? 'ok' : 'bad'}"><b class="plch">${esc(r.ch)}</b>
      <span class="plk"><i class="${r.iOk ? 'ok' : 'bad'}">${esc(r.key.i || '∅')}</i><i class="${r.fOk ? 'ok' : 'bad'}">${esc(r.key.f)}</i>${kt ? `<i class="${r.tOk ? 'ok' : 'bad'}">${kt}</i>` : ''}</span>
      ${r.ok ? '' : `<span class="plg dim">${r.g ? `bạn: ${esc(r.got)}` : 'thiếu'}${r.g && r.g.t < 0 && kt ? ' (chưa có thanh)' : ''}</span>`}</div>`;
  };
  return `<div class="plrows">${res.rows.map(tags).join('')}</div>`;
}
function drawType() {
  const it = S.cur, hzShown = S.showHz ?? (it.lv === 3);
  const input = `<div class="row"><input id="plIn" type="text" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${esc(it.lv === 1 ? 'pinyin (không thanh)…' : 'pinyin + số thanh…')}" ${S.done ? 'disabled' : ''}>
    <button class="btn" id="plU" tabindex="-1" title="Chèn chữ ü">ü</button><button class="btn primary" id="plGo" ${S.done ? 'hidden' : ''}>Trả lời</button></div>`;
  let fb = '';
  if (S.done) {
    const res = S.res;
    fb = `<div class="qfb ${res.ok ? 'ok' : 'bad'}">${res.ok ? '✅ Đúng!' : `❌ Chưa đúng (${res.wrong}/${res.rows.length} âm tiết${res.extra ? `, thừa ${res.extra}` : ''})`}</div>
      <div class="plans"><div class="plhz" lang="zh">${esc(it.hz)}</div><div class="plpy">${esc(markAll(it.sy.join(' ')))}${it.lv === 1 ? '' : ` <small class="dim">${esc(it.sy.join(' '))}</small>`}</div></div>
      ${rowsHtml(res)}
      <div class="dim plleg">Mỗi chữ: thanh mẫu · vận mẫu · thanh điệu (đỏ = sai). ∅ = không có thanh mẫu.</div>
      <div class="row"><button class="btn primary" id="plNext">Tiếp ▶</button></div>`;
  }
  return `<div class="qlabel">${LV[it.lv]} · ${it.lv === 3 ? 'nghe cả câu rồi gõ' : it.lv === 2 ? 'nghe từ, gõ pinyin + thanh điệu' : 'nghe, gõ pinyin không thanh'}</div>
    <div class="row c"><button class="btn primary big" id="plPlay">🔊 Nghe</button><button class="btn" id="plSlow">🐢 Chậm</button><button class="btn plauto ${S.auto ? 'on' : ''}" id="plAuto" title="Bật thì sang câu mới sẽ tự đọc; tắt thì chỉ đọc khi bạn bấm Nghe">🔁 <span class="lbl">${S.auto ? 'Tự phát: Bật' : 'Tự phát: Tắt'}</span></button><button class="btn ${hzShown ? 'on' : ''}" id="plHz">👁 ${hzShown ? 'Ẩn chữ Hán' : 'Xem chữ Hán'}</button></div>
    ${hzShown && !S.done ? `<div class="plhz big" lang="zh">${esc(it.hz)}</div>` : ''}
    ${input}<div class="dim">${hintFor(it)}</div>${fb}`;
}
function drawDisc() {
  const it = S.cur, d = S.disc;
  const opts = d.opts.map((o, k) => {
    const cls = S.done ? (o.v === d.ans ? 'right' : S.pick === o.v ? 'wrong' : '') : '';
    return `<button class="qopt ${cls}" data-v="${esc(o.v)}" ${S.done ? 'disabled' : ''}><i>${k + 1}</i><span>${esc(o.label)}</span></button>`;
  }).join('');
  const fb = S.done ? `<div class="qfb ${S.pick === d.ans ? 'ok' : 'bad'}">${S.pick === d.ans ? '✅ Đúng!' : '❌ Chưa đúng'}</div>
    <div class="plans"><div class="plhz" lang="zh">${esc(it.hz)}</div><div class="plpy">${esc(markAll(it.sy.join(' ')))}</div></div>
    <div class="row"><button class="btn primary" id="plNext">Tiếp ▶</button></div>` : '';
  return `<div class="qlabel">${d.note}</div>
    <div class="row c"><button class="btn primary big" id="plPlay">🔊 Nghe</button><button class="btn" id="plSlow">🐢 Chậm</button><button class="btn plauto ${S.auto ? 'on' : ''}" id="plAuto" title="Bật thì sang câu mới sẽ tự đọc; tắt thì chỉ đọc khi bạn bấm Nghe">🔁 <span class="lbl">${S.auto ? 'Tự phát: Bật' : 'Tự phát: Tắt'}</span></button></div>
    <div class="qopts">${opts}</div>${fb}`;
}
function drawSpeak() {
  const it = S.cur;
  return `<div class="qlabel">Đọc theo mẫu · ${LV[it.lv]}</div>
    <div class="plans"><div class="plhz big" lang="zh">${esc(it.hz)}</div><div class="plpy big">${esc(markAll(it.sy.join(' ')))}</div></div>
    <div class="row c"><button class="btn primary" id="plPlay">🔊 Mẫu</button><button class="btn" id="plSlow">🐢 Chậm</button><button class="btn" id="plRec">🎙 Ghi âm</button><button class="btn" id="plMine" disabled>▶ Nghe lại mình</button><button class="btn" id="plCmp" disabled>🔁 So sánh</button></div>
    <div class="dim">Bấm “Ghi âm”, đọc theo, bấm lại để dừng rồi nghe lại và so sánh với mẫu. Bản ghi chỉ nằm trong máy và mất khi sang câu khác.</div>
    <div class="row c"><span class="dim">Tự đánh giá:</span><button class="btn" data-self="1">✅ Đọc tốt</button><button class="btn" data-self="0">❌ Cần luyện thêm</button><button class="btn" id="plNext">Tiếp ▶</button></div>`;
}
function draw() {
  if (!box) return;
  const it = S.cur;
  if (!it) { box.innerHTML = head() + '<div class="empty">Không có mục nào khớp bộ lọc này. Hãy chọn nhóm khác.</div>'; bindHead(); return; }
  box.innerHTML = `${head()}<div class="qcard plcard">${S.mode === 'type' ? drawType() : S.mode === 'disc' ? drawDisc() : drawSpeak()}</div>`;
  bindHead(); bindCard();
}
function bindHead() {
  $('#plBack', box)?.addEventListener('click', () => { leave(); backCb?.(); });
  $$('#plMode [data-m]', box).forEach(b => b.onclick = () => { if (S.mode === b.dataset.m) return; S.mode = b.dataset.m; S.fopen = null; if (S.mode === 'disc' && S.lv === 3) S.lv = 0; S.bag = []; next(); });
  $$('.plf', box).forEach(b => b.onclick = () => { S.fopen = S.fopen === b.dataset.f ? null : b.dataset.f; refreshHead(); });
  $$('#plLv [data-l]', box).forEach(b => b.onclick = () => { S.lv = +b.dataset.l; S.fopen = null; S.bag = []; next(); });
  $$('#plSet [data-s]', box).forEach(b => b.onclick = () => { S.set = +b.dataset.s; S.fopen = null; S.bag = []; next(); });
  $$('#plGrp [data-g]', box).forEach(b => b.onclick = () => { S.grp = b.dataset.g; S.fopen = null; S.bag = []; next(); });
}
function answerType() {
  const v = $('#plIn', box).value;
  if (!v.trim()) { toast('Hãy gõ đáp án'); return; }
  S.res = gradeItem(S.cur, v); S.done = true; record(S.res.ok); draw();
}
function record(ok) { S.n++; if (ok) S.ok++; mark2(S.cur.id, ok); tracker.quiz(ok); }
function bindCard() {
  $('#plPlay', box)?.addEventListener('click', () => play());
  $('#plAuto', box)?.addEventListener('click', e => {
    S.auto = !S.auto; try { localStorage.setItem(AKEY, S.auto ? '1' : '0'); } catch { /* bỏ qua */ }
    const b = e.currentTarget; b.classList.toggle('on', S.auto); $('.lbl', b).textContent = S.auto ? 'Tự phát: Bật' : 'Tự phát: Tắt';
  });
  $('#plSlow', box)?.addEventListener('click', () => play(true));
  $('#plNext', box)?.addEventListener('click', next);
  if (S.mode === 'type') {
    $('#plHz', box)?.addEventListener('click', () => { S.showHz = !(S.showHz ?? (S.cur.lv === 3)); const v = $('#plIn', box)?.value; draw(); if ($('#plIn', box)) $('#plIn', box).value = v || ''; });
    $('#plGo', box)?.addEventListener('click', answerType);
    $('#plU', box)?.addEventListener('click', () => { const i = $('#plIn', box); i.setRangeText('ü', i.selectionStart, i.selectionEnd, 'end'); i.focus(); });
    const inp = $('#plIn', box);
    inp?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); answerType(); } });
    if (!S.done) autoFocus(inp);
  } else if (S.mode === 'disc') {
    $$('.qopt', box).forEach(b => b.addEventListener('click', () => { if (S.done) return; S.pick = b.dataset.v; S.done = true; record(S.pick === S.disc.ans); draw(); }));
  } else {
    $('#plRec', box)?.addEventListener('click', toggleRec);
    $('#plMine', box)?.addEventListener('click', playMine);
    $('#plCmp', box)?.addEventListener('click', compare);
    $$('[data-self]', box).forEach(b => b.addEventListener('click', () => { const ok = b.dataset.self === '1'; record(ok); toast(ok ? 'Tốt lắm! 👍' : 'Sẽ gặp lại câu này nhiều hơn', 1400); next(); }));
    drawRecBar();
  }
}

// phím tắt: Enter sang câu tiếp khi đã trả lời; 1–4 chọn đáp án ở chế độ phân biệt
document.addEventListener('keydown', e => {
  if (!box || !box.isConnected || box.closest('[hidden]') || e.target.matches?.('input,textarea,select')) return;
  if (e.key === 'Enter' && S.done) { $('#plNext', box)?.click(); }
  else if (S.mode === 'disc' && !S.done && /^[1-4]$/.test(e.key)) $$('.qopt', box)[+e.key - 1]?.click();
});

// ---------- vào / ra ----------
export function render(el, opts = {}) {
  box = el; backCb = opts.back || null;
  try { S.auto = localStorage.getItem(AKEY) === '1'; } catch { /* bỏ qua */ }
  S.fopen = null;
  if (!S.cur) next(); else draw();
}
export function leave() { stopRec(true); try { speechSynthesis.cancel(); } catch { /* bỏ qua */ } }
export function init() {
  bus.on('show', v => { if (v !== 'library') leave(); });
  bus.on('lang', () => { if (getLang() !== 'zh') leave(); });
}

init();
