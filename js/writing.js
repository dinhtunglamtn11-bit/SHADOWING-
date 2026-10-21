// Luyện viết chữ.
//  - Chữ Hán (tiếng Trung, kanji tiếng Nhật): thư viện Hanzi Writer, xem nét chạy, viết từng nét và kiểm tra ĐÚNG THỨ TỰ NÉT.
//  - Kana, Hangul, chữ Latin (chưa có dữ liệu nét): tô theo mẫu hoặc viết từ trí nhớ, app chấm độ giống hình dạng
//    (không kiểm tra được thứ tự nét).
import { $, $$, esc, toast, bus, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as cards from './cards.js';
import { say } from './tts.js';
import { zhText, prefs, savePrefs } from './prefs.js';
import { loadSimplifier } from './util.js';
import { loadKvg, createCoach } from './strokes.js';

// độ khắt khe khi chấm chữ Hán (Hanzi Writer): leniency càng cao càng dễ tính
const HWL = { easy: { leniency: 1.7, back: true, hint: 2 }, mid: { leniency: 1.25, back: false, hint: 3 }, hard: { leniency: 0.95, back: false, hint: false } };
const level = () => (HWL[prefs.hwLevel] ? prefs.hwLevel : 'mid');
export const hangulCandidates = ch => { // các chữ Hangul dễ nhầm với chữ cần viết
  const c = ch.codePointAt(0);
  if (c >= 0x3131 && c <= 0x3163) return [...'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ'];
  if (c >= 0xAC00 && c <= 0xD7A3) {
    const s = c - 0xAC00, T = s % 28, V = Math.floor(s / 28) % 21, L = Math.floor(s / 588), out = new Set();
    const mk = (l, v, t) => String.fromCodePoint(0xAC00 + (l * 21 + v) * 28 + t);
    for (let l = 0; l < 19; l++) out.add(mk(l, V, T));
    for (let v = 0; v < 21; v++) out.add(mk(L, v, T));
    for (let t = 0; t < 28; t++) out.add(mk(L, V, t));
    return [...out];
  }
  return [];
};

const HW_JS = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
const ZH_DATA = c => `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(c)}.json`;
const JP_DATA = c => `https://cdn.jsdelivr.net/gh/chanind/hanzi-writer-data-jp@master/data/${encodeURIComponent(c)}.json`;
const HAN = /\p{Script=Han}/u;

// ---------- Hanzi Writer ----------
let hwP = null;
function loadHW() {
  if (window.HanziWriter) return Promise.resolve(window.HanziWriter);
  return hwP ||= new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = HW_JS;
    s.onload = () => res(window.HanziWriter);
    s.onerror = () => { hwP = null; rej(new Error('Không tải được bộ viết chữ (cần có mạng ở lần đầu)')); };
    document.head.appendChild(s);
  });
}
const loaderFor = lang => (char, onLoad, onError) => {
  const urls = lang === 'ja' ? [JP_DATA(char), ZH_DATA(char)] : [ZH_DATA(char)]; // kanji ưu tiên dữ liệu tiếng Nhật
  (async () => {
    for (const u of urls) { try { const r = await fetch(u); if (r.ok) { onLoad(await r.json()); return; } } catch { /* thử nguồn khác */ } }
    onError();
  })();
};

// ---------- chấm bằng độ giống hình dạng (Kana, Hangul, Latin) ----------
const FONT = {
  zh: '"Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif',
  ja: '"Yu Gothic","Hiragino Sans","Noto Sans JP","Meiryo",sans-serif',
  ko: '"Malgun Gothic","Apple SD Gothic Neo","Noto Sans KR",sans-serif',
  en: 'Arial,"Helvetica Neue",sans-serif',
};
function drawGlyph(ctx, text, W, H, lang, { fill, stroke, lw } = {}) {
  let fs = H * 0.78;
  ctx.font = `500 ${fs}px ${FONT[lang] || FONT.zh}`;
  const m = ctx.measureText(text).width;
  if (m > W * 0.9) { fs *= (W * 0.9) / m; ctx.font = `500 ${fs}px ${FONT[lang] || FONT.zh}`; }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.strokeText(text, W / 2, H * 0.54); }
  if (fill) { ctx.fillStyle = fill; ctx.fillText(text, W / 2, H * 0.54); }
}
function maskFrom(draw, mw, mh) {
  const c = document.createElement('canvas'); c.width = mw; c.height = mh;
  const x = c.getContext('2d', { willReadFrequently: true });
  draw(x);
  const d = x.getImageData(0, 0, mw, mh).data, m = new Uint8Array(mw * mh);
  for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 60 ? 1 : 0;
  return m;
}
function drawStrokes(ctx, strokes, lw) {
  ctx.strokeStyle = '#000'; ctx.fillStyle = '#000'; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const s of strokes) {
    if (!s.length) continue;
    if (s.length === 1) { ctx.beginPath(); ctx.arc(s[0].x, s[0].y, lw / 2, 0, 7); ctx.fill(); continue; }
    ctx.beginPath(); ctx.moveTo(s[0].x, s[0].y); for (const p of s.slice(1)) ctx.lineTo(p.x, p.y); ctx.stroke();
  }
}
const bbox = (m, w, h) => {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (m[y * w + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return x1 < 0 ? null : { x0, y0, x1, y1 };
};
const count = m => { let n = 0; for (const v of m) n += v; return n; };
const both = (a, b) => { let n = 0; for (let i = 0; i < a.length; i++) if (a[i] && b[i]) n++; return n; };

// strokes: các nét người dùng vẽ (toạ độ trong khung W×H). normalize: dời/phóng nét vẽ cho khớp khung chữ mẫu (viết từ trí nhớ)
export function scoreStrokes(strokes, text, lang, W, H, normalize, tol = 0.06) {
  const mw = 120, k = mw / W, mh = Math.round(H * k);
  const r = mw * tol, lw = mw * 0.075;
  const T = maskFrom(x => drawGlyph(x, text, mw, mh, lang, { fill: '#000' }), mw, mh);
  const Td = maskFrom(x => drawGlyph(x, text, mw, mh, lang, { fill: '#000', stroke: '#000', lw: 2 * r }), mw, mh);
  let pts = strokes.map(s => s.map(p => ({ x: p.x * k, y: p.y * k })));
  if (normalize) {
    const tb = bbox(T, mw, mh), all = pts.flat();
    if (tb && all.length) {
      const ux0 = Math.min(...all.map(p => p.x)) - lw / 2, ux1 = Math.max(...all.map(p => p.x)) + lw / 2;
      const uy0 = Math.min(...all.map(p => p.y)) - lw / 2, uy1 = Math.max(...all.map(p => p.y)) + lw / 2;
      const tw = tb.x1 - tb.x0 + 1, th = tb.y1 - tb.y0 + 1, uw = Math.max(ux1 - ux0, 1), uh = Math.max(uy1 - uy0, 1);
      const sc = Math.min(tw / uw, th / uh), cx = (ux0 + ux1) / 2, cy = (uy0 + uy1) / 2, tcx = (tb.x0 + tb.x1) / 2, tcy = (tb.y0 + tb.y1) / 2;
      pts = pts.map(s => s.map(p => ({ x: tcx + (p.x - cx) * sc, y: tcy + (p.y - cy) * sc })));
    }
  }
  const U = maskFrom(x => drawStrokes(x, pts, lw), mw, mh);
  const Ud = maskFrom(x => drawStrokes(x, pts, lw + 2 * r), mw, mh);
  const nU = count(U), nT = count(T);
  if (!nU || !nT) return { score: 0, precision: 0, recall: 0 };
  const precision = both(U, Td) / nU, recall = both(T, Ud) / nT;
  const F = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  return { score: Math.min(100, Math.round(F * 105)), precision, recall };
}

// Khung vẽ tay
function createPad(host, { text, lang, size, wide, mode, onChange }) {
  const W = wide ? size : size, H = wide ? Math.round(size * 0.5) : size, dpr = Math.min(2, devicePixelRatio || 1);
  const c = document.createElement('canvas');
  c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px'; c.className = 'hwpad';
  host.innerHTML = ''; host.appendChild(c);
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  let strokes = [], cur = null, locked = false, result = null;

  function redraw() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#2c313a'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke(); ctx.setLineDash([]);
    if (mode !== 'free' || result) drawGlyph(ctx, text, W, H, lang, { fill: result ? 'rgba(124,196,255,.45)' : 'rgba(255,255,255,.16)' });
    ctx.strokeStyle = result ? '#ffb84d' : '#e8eaed'; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = Math.max(5, W * 0.03); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const s of result ? result.shown : strokes) {
      if (s.length === 1) { ctx.beginPath(); ctx.arc(s[0].x, s[0].y, ctx.lineWidth / 2, 0, 7); ctx.fill(); continue; }
      ctx.beginPath(); ctx.moveTo(s[0].x, s[0].y); for (const p of s.slice(1)) ctx.lineTo(p.x, p.y); ctx.stroke();
    }
  }
  const pos = e => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) }; };
  c.addEventListener('pointerdown', e => { if (locked) return; try { c.setPointerCapture(e.pointerId); } catch { /* một số trình duyệt không cho */ } cur = [pos(e)]; strokes.push(cur); redraw(); onChange?.(strokes.length); e.preventDefault(); });
  c.addEventListener('pointermove', e => { if (!cur) return; cur.push(pos(e)); redraw(); });
  ['pointerup', 'pointercancel'].forEach(t => c.addEventListener(t, () => { cur = null; }));
  redraw();
  return {
    undo() { if (locked) return; strokes.pop(); redraw(); onChange?.(strokes.length); },
    clear() { strokes = []; locked = false; result = null; redraw(); onChange?.(0); },
    get strokes() { return strokes; },
    // đưa nét vẽ (từ bên ngoài, dùng khi thử)
    feed(s) { strokes = s; redraw(); },
    check() {
      const normalize = mode === 'free';
      const r = scoreStrokes(strokes, text, lang, W, H, normalize);
      locked = true;
      // hiện nét đã chuẩn hóa chồng lên chữ mẫu
      result = { shown: normalize ? normalizedForShow(strokes, text, lang, W, H) : strokes };
      redraw();
      return r;
    },
  };
}
function normalizedForShow(strokes, text, lang, W, H) {
  const mw = 120, k = mw / W, mh = Math.round(H * k), lw = mw * 0.075;
  const T = maskFrom(x => drawGlyph(x, text, mw, mh, lang, { fill: '#000' }), mw, mh), tb = bbox(T, mw, mh), all = strokes.flat().map(p => ({ x: p.x * k, y: p.y * k }));
  if (!tb || !all.length) return strokes;
  const ux0 = Math.min(...all.map(p => p.x)) - lw / 2, ux1 = Math.max(...all.map(p => p.x)) + lw / 2, uy0 = Math.min(...all.map(p => p.y)) - lw / 2, uy1 = Math.max(...all.map(p => p.y)) + lw / 2;
  const tw = tb.x1 - tb.x0 + 1, th = tb.y1 - tb.y0 + 1, sc = Math.min(tw / Math.max(ux1 - ux0, 1), th / Math.max(uy1 - uy0, 1));
  const cx = (ux0 + ux1) / 2, cy = (uy0 + uy1) / 2, tcx = (tb.x0 + tb.x1) / 2, tcy = (tb.y0 + tb.y1) / 2;
  return strokes.map(s => s.map(p => ({ x: (tcx + (p.x * k - cx) * sc) / k, y: (tcy + (p.y * k - cy) * sc) / k })));
}

// ---------- danh sách chữ ----------
const LIST_KEY = lang => 'hw:list:' + lang;
const DEFAULTS = { zh: '你 好 学 习 中 文', ja: '日 本 語 学 生', ko: '가 나 다 라 마', en: 'hello world' };
const BASIC = {
  ja: 'あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん',
  ko: 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ',
};
const KATA = 'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン';
const loadList = lang => { let t; try { t = localStorage.getItem(LIST_KEY(lang)) ?? DEFAULTS[lang] ?? ''; } catch { t = DEFAULTS[lang] ?? ''; } return zhText(t, lang); };
const saveList = (lang, t) => { try { localStorage.setItem(LIST_KEY(lang), t); } catch { /* bỏ qua */ } };
const unitsOf = text => [...new Set(text.split(/[\s,;，、]+/).filter(Boolean))];
const charsOf = unit => (/\s/.test(unit) ? [] : (HAN.test(unit) || [...unit].length <= 3 ? [...unit].filter(c => /[\p{L}\p{N}]/u.test(c)) : [unit]));
// Tiếng Anh: cả từ là một “chữ”; các ngôn ngữ khác: từng ký tự
// Tiếng Anh: luyện từng chữ cái của từ; các ngôn ngữ khác: từng ký tự
const piecesOf = (unit, lang) => (lang === 'en' ? [...unit].filter(c => /[A-Za-z0-9]/.test(c)) : [...unit].filter(c => /[\p{L}\p{N}]/u.test(c)));

const hwId = (lang, ch) => `${lang}:${ch}`;
const mastery = (lang, unit) => {
  const ps = piecesOf(unit, lang); if (!ps.length) return 0;
  const bests = ps.map(p => store.get('hw', hwId(lang, p))?.best);
  if (bests.some(b => b == null)) return 0;
  const m = Math.min(...bests); return m >= 85 ? 3 : m >= 60 ? 2 : 1;
};

// ---------- giao diện ----------
let box = null, state = { units: [], u: 0, p: 0, mode: 'free', view: 'list', hide: false, w: null, pad: null, done: null, mist: 0 };

export function render(el) {
  // hai màn: luyện từng chữ trong danh sách, hoặc “Bộ viết” (nhập nghĩa + chữ, ẩn chữ khi làm bài)
  el.innerHTML = '<div class="seg" id="hwView"><button data-v="list">📚 Luyện chữ</button><button data-v="sets">📝 Bộ viết (nghĩa → chữ)</button></div><div id="hwBody"></div>';
  $$('#hwView button', el).forEach(b => { b.classList.toggle('on', b.dataset.v === state.view); b.onclick = () => { state.view = b.dataset.v; render(el); }; });
  box = $('#hwBody', el);
  if (state.view === 'sets') { cleanup(); import('./writeset.js').then(m => m.renderSets(box)); return; }
  const lang = getLang();
  if (lang === 'zh') loadSimplifier().then(() => { const t = $('#hwList', box); if (t && zhText(t.value, 'zh') !== t.value) { t.value = zhText(t.value, 'zh'); saveList('zh', t.value); state.units = unitsOf(t.value); chips(); } });
  state.units = unitsOf(loadList(lang));
  if (state.u >= state.units.length) state.u = 0;
  draw();
}

function draw() {
  const lang = getLang();
  box.innerHTML = `<div class="qcard">
      <label class="dim">Chữ cần luyện (cách nhau bằng dấu cách; có thể là từ nhiều chữ)
        <textarea id="hwList" rows="2" spellcheck="false" lang="${langInfo(lang).bcp}">${esc(loadList(lang))}</textarea></label>
      <div class="row">
        <button class="btn" id="hwAddCards">＋ Từ sổ thẻ</button>
        <button class="btn" id="hwAddVideo">＋ Từ video</button>
        <button class="btn" id="hwAddSets">＋ Từ bộ bài tập</button>
        ${BASIC[lang] ? '<button class="btn" id="hwAddBasic">＋ Bảng chữ cái cơ bản</button>' : ''}
        ${lang === 'ja' ? '<button class="btn" id="hwAddKata">＋ Katakana</button>' : ''}
        <span class="grow"></span><button class="btn" id="hwClear">Xóa</button>
      </div>
      <div class="chips" id="hwChips"></div></div>
    <div class="qcard" id="hwStage"></div>`;
  $('#hwList', box).addEventListener('input', e => { saveList(lang, e.target.value); state.units = unitsOf(zhText(e.target.value, lang)); state.u = Math.min(state.u, Math.max(0, state.units.length - 1)); chips(); });
  // tiếng Trung: gõ/dán chữ phồn thể thì tự đổi sang giản thể khi rời ô
  $('#hwList', box).addEventListener('change', e => { const c = zhText(e.target.value, lang); if (c !== e.target.value) { e.target.value = c; saveList(lang, c); state.units = unitsOf(c); chips(); stage(); toast('Đã chuyển sang chữ giản thể'); } });
  $('#hwAddCards', box).onclick = () => addUnits(cards.allCards(lang).map(c => c.front.split(/\s+/)[0]).slice(0, 40), 'sổ thẻ');
  $('#hwAddVideo', box).onclick = () => addUnits(fromVideos(lang), 'video');
  $('#hwAddSets', box).onclick = () => addUnits(fromSets(lang), 'bộ bài tập');
  $('#hwAddBasic', box)?.addEventListener('click', () => addUnits(unitsOf(BASIC[lang]), 'bảng chữ cái'));
  $('#hwAddKata', box)?.addEventListener('click', () => addUnits(unitsOf(KATA), 'katakana'));
  $('#hwClear', box).onclick = () => { if (confirm('Xóa toàn bộ danh sách chữ?')) { saveList(lang, ''); state.units = []; draw(); } };
  chips(); stage();
}

function addUnits(list, from) {
  const lang = getLang(), have = new Set(unitsOf(loadList(lang)));
  const fresh = list.filter(u => u && !have.has(u));
  if (!fresh.length) { toast(`Không có chữ mới từ ${from}`); return; }
  saveList(lang, (loadList(lang).trim() + ' ' + fresh.join(' ')).trim());
  toast(`Đã thêm ${fresh.length} chữ từ ${from}`);
  state.units = unitsOf(loadList(lang)); draw();
}
function fromVideos(lang) { // các chữ hay gặp nhất trong phụ đề mà bạn chưa viết giỏi
  const freq = new Map();
  for (const it of store.list('items')) {
    if (it.type !== 'video' || (it.lang || 'zh') !== lang || !it.cues) continue;
    let cs = []; try { cs = JSON.parse(it.cues); } catch { /* bỏ qua */ }
    for (const c of cs) {
      const toks = lang === 'en' ? (c.lines[0].match(/[A-Za-z']{4,}/g) || []).map(w => w.toLowerCase()) : [...c.lines[0]].filter(ch => (lang === 'ko' ? /\p{Script=Hangul}/u : /\p{Script=Han}/u).test(ch));
      toks.forEach(t => freq.set(t, (freq.get(t) || 0) + 1));
    }
  }
  return [...freq].sort((a, b) => b[1] - a[1]).map(x => x[0]).filter(u => (store.get('hw', hwId(lang, u))?.best ?? 0) < 85).slice(0, 20);
}
function fromSets(lang) {
  const out = [];
  for (const s of store.list('sets')) if ((s.lang || 'zh') === lang) for (const m of (s.text || '').matchAll(/^\s*(?:T|W|V)\s*[:：]\s*([^|\n]+)/gim)) out.push(m[1].trim());
  return out.slice(0, 40);
}

function chips() {
  const lang = getLang();
  const hideChars = state.hide && state.mode === 'free'; // đang viết từ trí nhớ: không để lộ chữ ở dãy ô phía trên
  $('#hwChips', box).innerHTML = state.units.length ? state.units.map((u, i) => `<button class="chip m${mastery(lang, u)} ${i === state.u ? 'on' : ''}" data-u="${i}" lang="${langInfo(lang).bcp}">${hideChars ? i + 1 : esc(u)}</button>`).join('') : '<span class="dim">Danh sách trống. Gõ chữ vào ô trên hoặc bấm “＋”.</span>';
  $$('#hwChips [data-u]', box).forEach(b => b.onclick = () => { state.u = +b.dataset.u; state.p = 0; stage(); chips(); });
}

const MODES = '<div class="seg" id="hwMode"><button data-m="free">✍️ Tự viết rồi nộp</button><button data-m="trace">🖊 Tập nét (gợi ý từng nét)</button><button data-m="watch">🎬 Xem nét</button></div>' +
  '<label class="dim">Độ khắt khe <select id="hwLevel"><option value="easy">Dễ</option><option value="mid">Vừa</option><option value="hard">Khó</option></select></label>';
function bindModes() {
  $('#hwLevel', box).value = level();
  $('#hwLevel', box).onchange = e => { prefs.hwLevel = e.target.value; savePrefs(); stage(); };
  $$('#hwMode button', box).forEach(b => { b.classList.toggle('on', b.dataset.m === state.mode); b.onclick = () => { state.mode = b.dataset.m; stage(); }; });
}

// Chế độ “Tự viết rồi nộp”: viết cả chữ vào các ô, bấm Nộp mới chấm và hiện đáp án (không gợi ý từng nét)
async function stageSubmit(unit, lang, host) {
  const meaning = cards.allCards(lang).find(c => c.front.startsWith(unit))?.back?.filter(Boolean).join(' · ') || '';
  const hide = state.hide;
  host.innerHTML = `<div class="row between"><b lang="${langInfo(lang).bcp}">${hide ? `Chữ ${state.u + 1}/${state.units.length}` : esc(unit)}</b>
      <span>${hide ? '' : '<button class="btn" id="hwSay" title="Nghe đọc">🔊</button>'}</span></div>
    <div class="row">${MODES}</div>
    <label class="dim chk"><input type="checkbox" id="hwHide" ${hide ? 'checked' : ''}> Ẩn chữ mẫu (viết từ trí nhớ, chỉ hiện nghĩa/phiên âm)</label>
    <div id="hwSubmit"></div>
    <div class="dim hwcredit">Dữ liệu nét: Make Me a Hanzi (chữ Hán), hanzi-writer-data-jp (kanji), KanjiVG (kana, chữ Latin, CC BY-SA 3.0).</div>`;
  bindModes();
  $('#hwHide', box).onchange = e => { state.hide = e.target.checked; chips(); stage(); };
  $('#hwSay', box)?.addEventListener('click', () => say(unit, langInfo(lang).bcp));
  let pron = '';
  if (lang === 'zh' && HAN.test(unit)) { try { pron = (await import('https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm')).pinyin(unit, { toneType: 'symbol' }); } catch { /* không có mạng: bỏ */ } }
  const { mountSubmitWriter } = await import('./writeset.js');
  if (!$('#hwSubmit', box)) return; // đã chuyển chữ khác trong lúc tải
  mountSubmitWriter($('#hwSubmit', box), {
    answer: unit, lang, meaning: hide ? meaning : '', pron: hide ? pron : '', showPron: false, showModel: !hide,
    nextLabel: 'Chữ sau ▶',
    onGraded: () => chips(),
    onNext: () => { state.u = (state.u + 1) % Math.max(1, state.units.length); state.p = 0; chips(); stage(); },
  });
}

async function stage() {
  const lang = getLang(), unit = state.units[state.u], host = $('#hwStage', box);
  cleanup();
  if (!unit) { host.innerHTML = '<div class="empty">Hãy thêm chữ cần luyện ở trên.</div>'; return; }
  if (state.mode === 'free') { await stageSubmit(unit, lang, host); return; }
  const ps = piecesOf(unit, lang);
  if (state.p >= ps.length) state.p = 0;
  const ch = ps[state.p], isHan = HAN.test(ch);
  const meaning = cards.allCards(lang).find(c => c.front.startsWith(unit))?.back?.filter(Boolean).join(' · ') || '';
  host.innerHTML = `<div class="row between"><b>${esc(unit)} <span class="dim">· chữ ${state.p + 1}/${ps.length}</span></b>
      <span><button class="btn" id="hwSay" title="Nghe đọc">🔊</button></span></div>
    ${meaning ? `<div class="dim">${esc(meaning)}</div>` : ''}<div class="dim" id="hwPy"></div>
    <div class="row">${MODES}</div>
    <div id="hwBox" class="hwbox"></div>
    <div class="dim" id="hwNote"></div>
    <div class="row c" id="hwBtns"></div>
    <div id="hwResult"></div>
    <div class="dim hwcredit">Dữ liệu nét: Make Me a Hanzi (chữ Hán), hanzi-writer-data-jp (kanji), KanjiVG (kana, chữ Latin, CC BY-SA 3.0).</div>`;
  bindModes();
  $('#hwSay', box).onclick = () => say(unit, langInfo(lang).bcp);
  if (lang === 'zh' && isHan) import('https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm').then(m => { const el = $('#hwPy', box); if (el) el.textContent = m.pinyin(ch, { toneType: 'symbol' }); }).catch(() => {});
  const size = Math.max(220, Math.min(340, ($('#hwBox', box).clientWidth || 320)));
  const code = ch.codePointAt(0), kana = code >= 0x3041 && code <= 0x30FF, latin = /^[A-Za-z0-9]$/.test(ch);
  if (isHan) await startHanzi(ch, lang, size);
  else if (kana || latin) await startKvg(ch, lang, size); // chấm từng nét bằng dữ liệu KanjiVG
  else startPad(ch, lang, size);                            // Hangul và các chữ khác: nhận diện hình dạng
}

function cleanup() { try { state.w?.cancelQuiz?.(); } catch { /* bỏ qua */ } try { state.coach?.destroy(); } catch { /* bỏ qua */ } state.w = null; state.pad = null; state.coach = null; state.done = null; }

// --- Kana, chữ Latin: chấm từng nét (thứ tự, hướng, hình dạng), tự căn kích cỡ và vị trí ---
async function startKvg(ch, lang, size) {
  const hostEl = $('#hwBox', box); hostEl.style.width = size + 'px'; hostEl.style.height = size + 'px';
  let data;
  try { data = await loadKvg(ch); }
  catch (e) { $('#hwNote', box).textContent = 'Chữ này chưa tải được dữ liệu nét (' + e.message + '), chuyển sang kiểu tô theo mẫu.'; startPad(ch, lang, size); return; }
  const mode = state.mode === 'watch' ? 'watch' : state.mode, n = data.strokes.length;
  const base = `${n} nét. Viết đúng thứ tự và hướng từng nét; app tự căn theo kích cỡ và vị trí bạn viết.`;
  const coach = createCoach(hostEl, {
    strokes: data.strokes, size, mode: mode === 'free' ? 'free' : 'trace', level: level(),
    onMessage: t => { const el = $('#hwNote', box); if (el) el.textContent = t || base; },
    onDone: ({ mistakes, strokes }) => finish(ch, lang, Math.round(100 * strokes / (strokes + mistakes)), `${strokes} nét, sai ${mistakes} lần`),
  });
  state.coach = coach;
  if (mode === 'watch') {
    $('#hwNote', box).textContent = `${n} nét. Xem thứ tự nét, rồi chuyển sang “Có gợi ý” để tự viết.`;
    coach.animate(true);
    buttons('<button class="btn" id="hwNext">Viết thử ▶</button>');
    $('#hwNext', box).onclick = () => { state.mode = 'trace'; stage(); };
    return;
  }
  $('#hwNote', box).textContent = base;
  buttons('<button class="btn" id="hwRedo">↺ Làm lại</button><button class="btn" id="hwHint">💡 Gợi ý nét</button><button class="btn" id="hwSkip">Bỏ qua ⏭</button>');
  $('#hwRedo', box).onclick = stage;
  $('#hwHint', box).onclick = () => coach.hint();
  $('#hwSkip', box).onclick = () => advance();
}

function buttons(html) { $('#hwBtns', box).innerHTML = html; }

// --- chữ Hán: kiểm tra từng nét ---
async function startHanzi(ch, lang, size) {
  const hostEl = $('#hwBox', box); hostEl.style.height = size + 'px'; hostEl.style.width = size + 'px';
  let HW;
  try { HW = await loadHW(); } catch (e) { $('#hwNote', box).textContent = e.message; startPad(ch, lang, size); return; }
  const mode = state.mode, loader = loaderFor(lang);
  const nStrokes = await HW.loadCharacterData(ch, { charDataLoader: loader }).then(d => d.strokes.length).catch(() => 0);
  if (!nStrokes) { $('#hwNote', box).textContent = 'Chữ này chưa có dữ liệu nét, chuyển sang kiểu tô theo mẫu (không kiểm tra thứ tự nét).'; startPad(ch, lang, size); return; }
  hostEl.innerHTML = '';
  const w = HW.create(hostEl, ch, {
    width: size, height: size, padding: 18, showCharacter: false, showOutline: mode !== 'free',
    strokeColor: '#e8eaed', outlineColor: '#4a505c', drawingColor: '#ffb84d', highlightColor: '#7cc4ff',
    strokeAnimationSpeed: 1.3, delayBetweenStrokes: 220, drawingWidth: Math.round(size / 15),
    showHintAfterMisses: mode === 'free' ? false : HWL[level()].hint, leniency: HWL[level()].leniency, acceptBackwardsStrokes: HWL[level()].back,
    charDataLoader: loader,
  });
  state.w = w; state.mist = 0;
  if (mode === 'watch') {
    $('#hwNote', box).textContent = `${nStrokes} nét. Xem thứ tự nét, rồi chuyển sang “Có gợi ý” để tự viết.`;
    w.showOutline(); w.loopCharacterAnimation();
    buttons('<button class="btn" id="hwNext">Viết thử ▶</button>');
    $('#hwNext', box).onclick = () => { state.mode = 'trace'; stage(); };
    return;
  }
  $('#hwNote', box).textContent = `${nStrokes} nét. Viết đúng thứ tự và hướng từng nét; nét sai sẽ báo và gợi ý sau 3 lần sai.`;
  buttons('<button class="btn" id="hwRedo">↺ Làm lại</button><button class="btn" id="hwHint">💡 Xem lại nét</button><button class="btn" id="hwSkip">Bỏ qua ⏭</button>');
  $('#hwRedo', box).onclick = stage;
  $('#hwHint', box).onclick = () => { state.mist += 2; w.animateCharacter(); };
  $('#hwSkip', box).onclick = () => advance();
  w.quiz({
    onMistake: () => { state.mist++; },
    onComplete: s => {
      const m = Math.max(state.mist, s.totalMistakes || 0);
      const score = Math.round(100 * nStrokes / (nStrokes + m));
      finish(ch, lang, score, `${nStrokes} nét, sai ${m} lần`);
    },
  });
}

// --- Kana, Hangul, Latin: chấm độ giống ---
function startPad(ch, lang, size) {
  const hostEl = $('#hwBox', box), mode = state.mode === 'watch' ? 'trace' : state.mode;
  hostEl.style.width = size + 'px'; hostEl.style.height = (lang === 'en' ? Math.round(size * 0.5) : size) + 'px';
  const pad = createPad(hostEl, { text: ch, lang, size, wide: lang === 'en', mode, onChange: n => { const b = $('#hwCheck', box); if (b) b.disabled = !n; } });
  state.pad = pad;
  $('#hwNote', box).textContent = (state.mode === 'watch' ? 'Chữ này chưa có dữ liệu nét để chạy. ' : '') +
    (mode === 'trace' ? 'Tô theo chữ mẫu mờ rồi bấm Kiểm tra. App chấm độ giống hình dạng, không kiểm tra thứ tự nét.' : 'Viết từ trí nhớ (không có chữ mẫu) rồi bấm Kiểm tra. App chấm độ giống hình dạng, không kiểm tra thứ tự nét.');
  buttons('<button class="btn" id="hwUndo">↶ Xóa nét cuối</button><button class="btn" id="hwRedo">↺ Viết lại</button><button class="btn primary" id="hwCheck" disabled>✔ Kiểm tra</button><button class="btn" id="hwSkip">Bỏ qua ⏭</button>');
  $('#hwUndo', box).onclick = () => pad.undo();
  $('#hwRedo', box).onclick = stage;
  $('#hwSkip', box).onclick = () => advance();
  $('#hwCheck', box).onclick = () => {
    if (!pad.strokes.length) return;
    const strokes = pad.strokes.map(s => s.map(p => ({ ...p })));
    const r = pad.check();
    let score = r.score, detail = `giống ${Math.round(r.precision * 100)}% (nét thừa) · ${Math.round(r.recall * 100)}% (đủ nét)`;
    // Hangul: so với các chữ dễ nhầm; nếu giống chữ khác hơn thì báo và không cho điểm cao
    const cands = hangulCandidates(ch);
    if (cands.length) {
      // so với các chữ dễ nhầm bằng dung sai chặt hơn mức chấm thường (dung sai rộng thì chữ đơn giản như ㅣ bị lẫn với ㅏ)
      // đo trên các jamo vẽ giả: nhận ra đúng ~91%, báo nhầm chữ đúng ~2%, bắt được chữ sai ~93%
      // luôn căn lại kích cỡ/vị trí khi nhận diện (chữ nào là chữ nào không phụ thuộc chỗ bạn viết)
      const tight = t => scoreStrokes(strokes, t, lang, size, size, true, 0.04).score;
      const mine = tight(ch);
      const scored = cands.filter(t => t !== ch).map(t => ({ t, s: tight(t) })).sort((a, b) => b.s - a.s);
      const top = scored[0];
      if (top && top.s >= mine + 12 && top.s >= 70) { score = Math.min(score, 55); detail += ` · Máy thấy giống “${top.t}” (${top.s}%) hơn chữ cần viết (${mine}%)`; }
      else if (!top || mine >= top.s) detail += ' · Máy nhận ra đúng chữ này';
    }
    finish(ch, lang, score, detail);
  };
}

// ---------- kết quả ----------
function finish(ch, lang, score, detail) {
  const id = hwId(lang, ch), old = store.get('hw', id) || {};
  store.put('hw', id, { lang, char: ch, best: Math.max(old.best ?? 0, score), last: score, tries: (old.tries || 0) + 1, at: Date.now(), deleted: false });
  tracker.hw();
  const cls = score >= 85 ? 'ok' : score >= 60 ? 'miss' : 'bad';
  $('#hwResult', box).innerHTML = `<div class="score ${cls}">${score}%${score >= 95 ? ' 🎉' : ''}</div><div class="dim">${esc(detail)}</div>
    <div class="row c"><button class="btn" id="hwAgain">↺ Viết lại</button><button class="btn primary" id="hwNext2">Chữ sau ▶</button></div>`;
  $('#hwAgain', box).onclick = stage;
  $('#hwNext2', box).onclick = advance;
  if (score < 60 && lang !== 'en' && cards.allCards(lang).every(c => c.front !== ch)) { /* chữ viết yếu: gợi ý thêm thẻ */ $('#hwResult', box).insertAdjacentHTML('beforeend', '<div class="dim">Chữ này còn yếu: viết thêm vài lần nữa nhé.</div>'); }
  chips();
}

function advance() {
  const lang = getLang(), unit = state.units[state.u]; if (!unit) return;
  const ps = piecesOf(unit, lang);
  if (state.p + 1 < ps.length) state.p++;
  else { state.p = 0; state.u = (state.u + 1) % state.units.length; }
  chips(); stage();
}

export function init() {
  bus.on('lang', () => { cleanup(); });
}
