// Bài tập hằng ngày: tự ra đề từ chính video và thẻ của bạn.
//  - Trắc nghiệm nghĩa: cho câu gốc, chọn nghĩa đúng.
//  - Nghe chọn câu: nghe một câu, chọn chữ đúng.
//  - Điền từ (chọn): câu bị khuyết một từ/chữ, chọn đáp án.
//  - Điền từ (gõ): câu bị khuyết, tự gõ đáp án.
// Câu làm sai tự vào sổ thẻ ôn.
import { $, esc, toast, vnDate, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as cards from './cards.js';
import { playClip, canPlay, stopClip } from './clip.js';
import { sayable, withSpeaker } from './tts.js';
import { zhText } from './prefs.js';

const N = 10;
const LETTER = /[\p{L}\p{N}]/u;
export const norm = s => s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

// ---------- ngẫu nhiên có hạt giống (cùng ngày thì đề không đổi) ----------
export function rngOf(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const shuffle = (arr, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uniq = a => [...new Set(a)];

// ---------- nghĩa của câu: dòng 3 (hoặc dòng 2 nếu dòng 2 không phải phiên âm) ----------
export function meaningOf(lines, lang) {
  if (lines.length >= 3) return lines[2];
  if (lines.length === 2) {
    if (lang === 'zh') {
      const han = [...lines[0]].filter(ch => /\p{Script=Han}/u.test(ch)).length;
      if (han && lines[1].split(/\s+/).filter(Boolean).length === han) return '';
    }
    return lines[1];
  }
  return '';
}

// ---------- gom tài liệu ----------
// Phụ đề đã phân tích, nhớ theo video (JSON.parse phụ đề dài mất vài mili-giây mỗi video, mỗi lần ra đề)
const cueCache = new Map();
function cuesOf(it) {
  const c = cueCache.get(it.id);
  if (c && c.src === it.cues) return c.cs;
  let cs = []; try { cs = JSON.parse(it.cues); } catch { /* phụ đề hỏng: bỏ qua */ }
  cueCache.set(it.id, { src: it.cues, cs });
  return cs;
}
// Nạp sẵn phụ đề các video lúc rảnh (từng lát ngắn, không chặn giao diện) để lần ra đề đầu tiên không phải phân tích lúc bạn đang chờ
export function warm() {
  const vids = store.list('items').filter(it => it.type === 'video' && (it.lang || 'zh') === getLang() && it.cues).slice(0, 40);
  let i = 0;
  const slice = () => {
    const t = performance.now();
    while (i < vids.length && performance.now() - t < 6) cuesOf(vids[i++]);
    if (i < vids.length) setTimeout(slice, 40);
  };
  setTimeout(slice, 300);
}
const MAX_VIDEOS = 30; // một đề chỉ có 10 câu: lấy ngẫu nhiên tối đa 30 video là đủ phong phú, thư viện hàng trăm video vẫn ra đề tức thì

async function gather(lang, rnd) {
  const mats = [];
  const vids = store.list('items').filter(it => it.type === 'video' && (it.lang || 'zh') === lang && it.cues);
  const pick = vids.length > MAX_VIDEOS ? shuffle(vids, rnd).slice(0, MAX_VIDEOS) : vids;
  const have = await store.assetKeys(); // một lần đọc cho mọi video, thay vì hỏi từng file
  for (const it of pick) {
    const has = !!it.assetId && have.has(it.assetId);
    cuesOf(it).forEach((c, i) => { if ((c.lines[0] || '').trim().length >= 2) mats.push({ itemId: it.id, idx: i, lines: c.lines, t0: c.start, t1: c.end, has }); });
  }
  for (const cd of cards.allCards(lang)) if (cd.type === 'manual') mats.push({ itemId: null, idx: -1, lines: [cd.front, ...(cd.back || [])], has: false });
  return mats;
}

// ---------- điền từ ----------
function makeCloze(line, lang, rnd, count) {
  if (langInfo(lang).words) {
    const parts = line.split(/(\s+)/);
    const cand = parts.map((p, i) => ({ p, i })).filter(x => !/^\s+$/.test(x.p) && (x.p.match(/\p{L}/gu) || []).length >= 3);
    if (!cand.length) return null;
    const pick = cand[Math.floor(rnd() * cand.length)];
    const answer = pick.p.replace(/[^\p{L}\p{N}']/gu, '').replace(/^'+|'+$/g, '');
    return { before: parts.slice(0, pick.i).join(''), after: parts.slice(pick.i + 1).join(''), blank: pick.p.replace(/[\p{L}\p{N}']+/u, '_____'), ans: answer };
  }
  const chars = [...line], idx = chars.map((c, i) => (LETTER.test(c) ? i : -1)).filter(i => i >= 0);
  if (idx.length < 3) return null;
  let s = idx[Math.floor(rnd() * idx.length)], k = 1;
  if (count === 2 && LETTER.test(chars[s + 1] || '')) k = 2;
  return { before: chars.slice(0, s).join(''), after: chars.slice(s + k).join(''), blank: '＿'.repeat(k), ans: chars.slice(s, s + k).join('') };
}

function tokenPool(mats, lang) {
  const out = [];
  for (const m of mats) {
    if (langInfo(lang).words) out.push(...(m.lines[0].match(/[\p{L}']{3,}/gu) || []).map(w => w.toLowerCase()));
    else out.push(...[...m.lines[0]].filter(c => LETTER.test(c)));
  }
  return uniq(out);
}

// ---------- ra đề ----------
export async function generate(lang, seed) {
  const rnd = rngOf(seed);
  const mats = await gather(lang, rnd);
  if (mats.length < 4) return { error: 'Cần ít nhất 4 câu có phụ đề (từ video hoặc thẻ) để ra bài tập. Hãy thêm video có phụ đề cho ' + langInfo(lang).name + '.' };
  const weak = new Set(cards.allCards(lang).filter(c => c.weak && c.itemId).map(c => c.itemId + ':' + c.idx));
  const ordered = shuffle(mats, rnd).sort((a, b) => (weak.has(b.itemId + ':' + b.idx) ? 1 : 0) - (weak.has(a.itemId + ':' + a.idx) ? 1 : 0));

  const withMeaning = mats.filter(m => meaningOf(m.lines, lang));
  const meanings = uniq(withMeaning.map(m => meaningOf(m.lines, lang)));
  const sentences = uniq(mats.map(m => m.lines[0]));
  const tokens = tokenPool(mats, lang);
  const types = ['mc-meaning', 'cloze-choice', 'mc-listen', 'cloze-type'].filter(t =>
    t === 'mc-meaning' ? meanings.length >= 4 :
    t === 'mc-listen' ? mats.some(m => m.has) && sentences.length >= 4 :
    tokens.length >= 4);
  if (!types.length) return { error: 'Chưa đủ dữ liệu để ra bài tập (cần phụ đề có nghĩa, hoặc đủ chữ để điền).' };

  const qs = [];
  const pickOpts = (answer, pool) => {
    const others = shuffle(pool.filter(x => x !== answer), rnd).slice(0, 3);
    const opts = shuffle([answer, ...others], rnd);
    return { options: opts, answer: opts.indexOf(answer) };
  };
  let guard = 0, p = 0;
  while (qs.length < N && guard++ < N * 8) {
    const type = types[qs.length % types.length], m = ordered[p++ % ordered.length]; // mỗi câu dùng 1 lần rồi mới lặp
    const base = { type, itemId: m.itemId, idx: m.idx, lines: m.lines, lang };
    if (type === 'mc-meaning') {
      const mean = meaningOf(m.lines, lang); if (!mean) continue;
      qs.push({ ...base, prompt: m.lines[0], ...pickOpts(mean, meanings) });
    } else if (type === 'mc-listen') {
      if (!m.has) continue;
      qs.push({ ...base, audio: { itemId: m.itemId, t0: m.t0, t1: m.t1 }, ...pickOpts(m.lines[0], sentences) });
    } else {
      const cl = makeCloze(m.lines[0], lang, rnd, type === 'cloze-type' ? 2 : 1); if (!cl) continue;
      const hint = meaningOf(m.lines, lang);
      if (type === 'cloze-choice') qs.push({ ...base, ...cl, hint, ...pickOpts(cl.ans, tokens) });
      else qs.push({ ...base, ...cl, hint });
    }
  }
  if (!qs.length) return { error: 'Không ra được câu hỏi nào từ dữ liệu hiện có.' };
  return { qs };
}

// ---------- giao diện ----------
let box = null, state = null, key = '', round = 0, busy = false, active = false;
export const deactivate = () => { active = false; stopClip(); }; // gọi khi chuyển sang tab khác
const keyOf = () => `quiz:${vnDate()}:${getLang()}:${round}`;
const save = () => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} };
const todayRounds = () => { let n = 0; try { for (const k of Object.keys(localStorage)) if (k.startsWith(`quiz:${vnDate()}:${getLang()}:`)) n++; } catch {} return n; };

export async function render(el) {
  box = el; active = true;
  if (busy) return;
  // mở lại lượt gần nhất chưa xong trong hôm nay; nếu xong hết thì hiện kết quả
  if (!state || state.lang !== getLang() || state.date !== vnDate()) {
    round = Math.max(0, todayRounds() - 1); key = keyOf();
    try { state = JSON.parse(localStorage.getItem(key) || 'null'); } catch { state = null; }
    if (state && (state.lang !== getLang() || state.date !== vnDate())) state = null;
  }
  if (!state) { await start(); return; }
  draw();
}

async function start() {
  busy = true; box.innerHTML = '<div class="empty">Đang ra đề…</div>';
  key = keyOf();
  const g = await generate(getLang(), key);
  busy = false;
  if (!active) return; // đã chuyển sang tab khác trong lúc ra đề
  if (g.error) { state = null; box.innerHTML = `<div class="empty">${esc(g.error)}</div>`; return; }
  state = { date: vnDate(), lang: getLang(), qs: g.qs, i: 0, res: [] };
  save(); draw();
}

function draw() {
  stopClip();
  const { qs, i, res } = state;
  if (i >= qs.length) return summary();
  const q = qs[i], bcp = langInfo(q.lang).bcp, answered = res[i] != null;
  const done = res.filter(r => r).length;
  let body = '';
  if (q.type === 'mc-meaning') body = `<div class="qlabel">Chọn nghĩa đúng · bấm vào chữ để nghe</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, q.lang)}</div>${opts(q, answered, false)}`;
  else if (q.type === 'mc-listen') body = `<div class="qlabel">Nghe và chọn câu đúng</div><div class="row c"><button class="btn primary big" id="qPlay">🔊 Nghe</button></div>${opts(q, answered, true)}`;
  else if (q.type === 'cloze-choice') body = `<div class="qlabel">Điền vào chỗ trống</div><div class="qtext" lang="${bcp}">${esc(q.before)}<span class="blank">${answered ? `<b class="${res[i].ok ? 'ok' : 'bad'}">${esc(res[i].ok ? q.ans : q.options[res[i].sel])}</b>` : esc(q.blank)}</span>${esc(q.after)}</div>${q.hint ? `<div class="dim">Nghĩa: ${esc(q.hint)}</div>` : ''}${opts(q, answered, true)}`;
  else body = `<div class="qlabel">Điền vào chỗ trống (gõ đáp án)</div><div class="qtext" lang="${bcp}">${esc(q.before)}<span class="blank">${answered ? `<b class="${res[i].ok ? 'ok' : 'bad'}">${esc(q.ans)}</b>` : esc(q.blank)}</span>${esc(q.after)}</div>${q.hint ? `<div class="dim">Nghĩa: ${esc(q.hint)}</div>` : ''}` +
    `<div class="row"><input id="qType" type="text" lang="${bcp}" autocomplete="off" autocapitalize="off" spellcheck="false" ${answered ? `value="${esc(res[i].typed || '')}" disabled` : ''} placeholder="Gõ phần còn thiếu"><button class="btn primary" id="qSubmit" ${answered ? 'hidden' : ''}>Trả lời</button></div>`;
  const fb = answered ? `<div class="qfb ${res[i].ok ? 'ok' : 'bad'}">${res[i].ok ? '✅ Đúng!' : '❌ Chưa đúng'}</div>` +
    `<div class="qexp" lang="${bcp}">${q.lines.map((l, k) => `<div class="${k ? 'dim' : ''}">${k ? esc(l) : sayable(l, q.lang)}</div>`).join('')}</div>` +
    `<div class="row"><button class="btn primary" id="qNext">${i + 1 >= qs.length ? 'Xem kết quả' : 'Tiếp ▶'}</button></div>` : '';
  box.innerHTML = `<div class="qprog"><span>Câu ${i + 1}/${qs.length}</span><progress max="${qs.length}" value="${done}"></progress></div><div class="qcard">${body}${fb}</div>`;

  $('#qPlay', box)?.addEventListener('click', async () => { if (!(await playClip(q.audio.itemId, q.audio.t0, q.audio.t1, q.lang))) toast('Không phát được: video chưa có file trên máy này'); });
  if (q.type === 'mc-listen' && !answered) setTimeout(() => $('#qPlay', box)?.click(), 200);
  box.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', () => answer(+b.dataset.o)));
  $('#qSubmit', box)?.addEventListener('click', submitTyped);
  $('#qType', box)?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); submitTyped(); } });
  $('#qNext', box)?.addEventListener('click', () => { state.i++; save(); draw(); });
  if (!answered) $('#qType', box)?.focus();
}

function opts(q, answered, mono) {
  return `<div class="qopts">${q.options.map((o, k) => {
    const r = state.res[state.i];
    const cls = answered ? (k === q.answer ? 'right' : r.sel === k ? 'wrong' : '') : '';
    // loa trong nút đáp án: chữ trong ô chọn đáp án, câu của dạng “nghe” chỉ cho nghe sau khi đã trả lời
    const spk = q.type === 'cloze-choice' || (q.type === 'mc-listen' && answered);
    return `<button class="qopt ${cls}" data-o="${k}" ${answered ? 'disabled' : ''} lang="${langInfo(q.lang).bcp}"><i>${k + 1}</i><span>${spk ? withSpeaker(o, q.lang) : esc(o)}</span></button>`;
  }).join('')}</div>`;
}

function record(ok, extra) {
  const q = state.qs[state.i];
  state.res[state.i] = { ok, ...extra };
  tracker.quiz(ok);
  if (!ok && q.itemId != null && q.idx >= 0 && cards.addCueCard(q.itemId, q.idx, { weak: true })) toast('Câu sai đã vào sổ ôn 📒');
  save(); draw();
}
function answer(o) { if (state.res[state.i] == null) record(o === state.qs[state.i].answer, { sel: o }); }
function submitTyped() {
  const q = state.qs[state.i], v = $('#qType', box).value;
  if (!v.trim()) { toast('Hãy gõ đáp án'); return; }
  record(norm(zhText(v, q.lang)) === norm(zhText(q.ans, q.lang)), { typed: v });
}

function summary() {
  const { qs, res } = state, ok = res.filter(r => r && r.ok).length;
  const pct = Math.round(100 * ok / qs.length);
  box.innerHTML = `<div class="qcard"><div class="score ${pct >= 80 ? 'ok' : pct >= 50 ? 'miss' : 'bad'}">${ok}/${qs.length} đúng · ${pct}%</div>` +
    `<div class="qlist">${qs.map((q, k) => `<div class="${res[k]?.ok ? 'ok' : 'bad'}" lang="${langInfo(q.lang).bcp}">${res[k]?.ok ? '✓' : '✗'} ${esc(q.lines[0].slice(0, 60))}</div>`).join('')}</div>` +
    `<div class="dim">${ok === qs.length ? '🎉 Hoàn hảo!' : 'Các câu sai đã được thêm vào sổ thẻ để ôn lại.'}</div>` +
    `<div class="row"><button class="btn primary" id="qMore">➕ Làm thêm ${N} câu nữa</button><button class="btn" id="qCards">📒 Ôn thẻ</button></div></div>`;
  $('#qMore', box).onclick = () => { round = todayRounds(); state = null; start(); };
  $('#qCards', box).onclick = () => document.dispatchEvent(new CustomEvent('review-tab', { detail: 'cards' }));
}

document.addEventListener('keydown', e => {
  if (!box || !box.isConnected || !state || document.body.dataset.view !== 'review' || e.target.matches('input,textarea')) return;
  const q = state.qs[state.i];
  if (!q || state.res[state.i] != null) { if (e.key === 'Enter' && state.res[state.i] != null) $('#qNext', box)?.click(); return; }
  if (/^[1-4]$/.test(e.key) && q.options && +e.key <= q.options.length) answer(+e.key - 1);
});
