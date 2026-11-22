// Viết chữ theo kiểu “viết xong mới chấm”:
//  - Khung viết nhiều ô (mỗi chữ một ô). Bạn viết cả chữ, bấm “Nộp” thì app mới chấm và hiện đáp án.
//    Không có gợi ý hay báo lỗi từng nét. Bấm “Tiết lộ đáp án” để xem đáp án mà không chấm điểm.
//  - Bộ viết: tự nhập nghĩa tiếng Việt + chữ cần viết. Khi làm bài chỉ hiện nghĩa, chữ bị ẩn cho tới khi nộp/tiết lộ.
import { $, $$, esc, toast, uid, pickFile, getLang, langInfo, LANGS } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as cards from './cards.js';
import { sayable } from './tts.js';
import { prefs, zhText } from './prefs.js';
import { loadStrokesFor, gradeDrawing } from './strokes.js';
import { scoreStrokes, hangulCandidates } from './writing.js';
import { trLines } from './i18n.js';

const level = () => (['easy', 'mid', 'hard'].includes(prefs.hwLevel) ? prefs.hwLevel : 'mid');
const piecesOf = (text, lang) => (lang === 'en' ? [...text].filter(c => /[A-Za-z0-9]/.test(c)) : [...text].filter(c => /[\p{L}\p{N}]/u.test(c)));
const hwId = (lang, ch) => `${lang}:${ch}`;
const COLOR = { ok: '#6fcf7f', rev: '#ffd166', order: '#ffb84d', missing: '#ff7b72' };

// ---------- chấm bằng độ giống hình (Hangul và chữ không có dữ liệu nét) ----------
function shapeGrade(strokes, ch, lang, size) {
  const r = scoreStrokes(strokes, ch, lang, size, size, true);
  let score = r.score, note = '';
  const cands = hangulCandidates(ch);
  if (cands.length) {
    const tight = t => scoreStrokes(strokes, t, lang, size, size, true, 0.04).score, mine = tight(ch);
    const top = cands.filter(t => t !== ch).map(t => ({ t, s: tight(t) })).sort((a, b) => b.s - a.s)[0];
    if (top && top.s >= mine + 12 && top.s >= 70) { score = Math.min(score, 55); note = ` · Máy thấy giống “${top.t}” hơn`; }
  }
  return { score, detail: `giống ${Math.round(r.precision * 100)}% · đủ nét ${Math.round(r.recall * 100)}%${note}`, kind: 'shape' };
}

// ---------- khung viết nhiều ô ----------
// o: { answer, lang, meaning, pron, showPron, showModel, nextLabel, onNext, onGraded }
export function mountSubmitWriter(host, o) {
  const { answer, lang } = o, pieces = piecesOf(answer, lang), N = pieces.length, bcp = langInfo(lang).bcp;
  if (!N) { host.innerHTML = '<div class="empty">Không có chữ nào để viết.</div>'; return; }
  let graded = false, pronShown = !!o.showPron;
  host.innerHTML = `
    ${o.meaning ? `<div class="wmeaning">${esc(o.meaning)}</div>` : ''}
    ${o.pron ? `<div class="dim wpron">${pronShown ? esc(o.pron) : '<button class="btn" data-w="pron">💡 Hiện phiên âm</button>'}</div>` : ''}
    <div class="wrow"></div>
    <div class="dim wnote">Viết ${N} chữ vào ${N} ô (mỗi ô một chữ), viết xong bấm “Nộp”. App chỉ chấm khi bạn nộp.</div>
    <div class="row c wbtns">
      <button class="btn" data-w="undo">↶ Xóa nét cuối</button>
      <button class="btn" data-w="clear">🧹 Xóa hết</button>
      <button class="btn" data-w="reveal">👁 Tiết lộ đáp án</button>
      <button class="btn primary" data-w="submit">✔ Nộp</button>
    </div>
    <div class="wres"></div>`;
  const row = $('.wrow', host), W = Math.max(240, host.clientWidth || 320), gap = 8;
  const size = Math.max(96, Math.min(170, Math.floor((W - gap * (N - 1)) / N))), dpr = Math.min(2, devicePixelRatio || 1);
  const boxes = [], history = [];

  pieces.forEach((ch, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'wbox'; wrap.style.width = size + 'px'; wrap.style.height = size + 'px';
    if (o.showModel) { const m = document.createElement('div'); m.className = 'wmodel'; m.lang = bcp; m.textContent = ch; m.style.fontSize = size * 0.78 + 'px'; wrap.appendChild(m); }
    const c = document.createElement('canvas');
    c.width = size * dpr; c.height = size * dpr; c.style.width = size + 'px'; c.style.height = size + 'px'; c.className = 'hwpad';
    wrap.appendChild(c); row.appendChild(wrap);
    const b = { ch, c, ctx: c.getContext('2d'), size, strokes: [], cur: null, result: null };
    b.ctx.scale(dpr, dpr);
    const pos = e => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * (size / r.width), y: (e.clientY - r.top) * (size / r.height) }; };
    c.addEventListener('pointerdown', e => { if (graded) return; try { c.setPointerCapture(e.pointerId); } catch { /* bỏ qua */ } b.cur = [pos(e)]; b.strokes.push(b.cur); history.push(i); redraw(b); e.preventDefault(); });
    c.addEventListener('pointermove', e => { if (b.cur) { b.cur.push(pos(e)); redraw(b); } });
    ['pointerup', 'pointercancel'].forEach(t => c.addEventListener(t, () => { b.cur = null; }));
    boxes.push(b); redraw(b);
  });

  function line(ctx, pts, color, width, k = 1) {
    if (!pts.length) return;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (pts.length === 1) { ctx.beginPath(); ctx.arc(pts[0].x * k, pts[0].y * k, width / 2, 0, 7); ctx.fill(); return; }
    ctx.beginPath(); ctx.moveTo(pts[0].x * k, pts[0].y * k); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x * k, pts[i].y * k); ctx.stroke();
  }
  function redraw(b) {
    const { ctx, size: s } = b;
    ctx.clearRect(0, 0, s, s);
    ctx.strokeStyle = '#2c313a'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(s / 2, 0); ctx.lineTo(s / 2, s); ctx.moveTo(0, s / 2); ctx.lineTo(s, s / 2); ctx.stroke(); ctx.setLineDash([]);
    if (b.result) {
      const r = b.result, k = s / 109;
      if (r.kind === 'strokes') {
        r.exp.forEach((st, j) => line(ctx, st, COLOR[r.g.status[j]] + 'aa', Math.max(6, s * 0.055), k));   // nét mẫu tô màu theo kết quả
        r.g.aligned.forEach(st => line(ctx, st.map(p => ({ x: p.x, y: p.y })), 'rgba(255,255,255,.85)', Math.max(2, s * 0.018), k)); // nét bạn viết (đã căn)
      } else {
        ctx.font = `500 ${s * 0.78}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(124,196,255,.45)';
        ctx.fillText(b.ch, s / 2, s * 0.54);
        b.strokes.forEach(st => line(ctx, st, '#ffb84d', Math.max(4, s * 0.03)));
      }
      return;
    }
    b.strokes.forEach(st => line(ctx, st, '#e8eaed', Math.max(4, s * 0.035)));
  }

  async function gradeBox(b) {
    if (!b.strokes.length) return { score: 0, detail: 'Ô này chưa viết gì', kind: 'none' };
    const u109 = b.strokes.map(st => st.map(p => ({ x: p.x / b.size * 109, y: p.y / b.size * 109 })));
    let exp = null;
    try { exp = await loadStrokesFor(b.ch, lang); } catch { exp = null; }
    if (exp) { const g = gradeDrawing(u109, exp, level()); return { score: g.score, detail: g.msg, kind: 'strokes', g, exp }; }
    return shapeGrade(b.strokes, b.ch, lang, b.size);
  }

  function finishUI(title, results) {
    const total = results ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : null;
    const cls = total == null ? '' : total >= 85 ? 'ok' : total >= 60 ? 'miss' : 'bad';
    $('.wnote', host).hidden = true;
    $('.wbtns', host).innerHTML = '';
    $('.wres', host).innerHTML =
      `<div class="wans" lang="${bcp}">${sayable(answer, lang)}</div>` +
      (o.pron ? `<div class="dim">${esc(o.pron)}</div>` : '') +
      (total != null ? `<div class="score ${cls}">${total}%${total >= 95 ? ' 🎉' : ''}</div>` : `<div class="dim">${esc(title)}</div>`) +
      (results ? results.map((r, i) => `<div class="wd"><b lang="${bcp}">${esc(pieces[i])}</b> <span class="${r.score >= 85 ? 'ok' : r.score >= 60 ? 'miss' : 'bad'}">${r.score}%</span> <span class="dim">${esc(r.detail)}</span></div>`).join('') +
        '<div class="dim wlegend"><span class="ok">■</span> nét đúng · <span class="miss">■</span> đúng hình nhưng sai thứ tự · <span class="bad">■</span> thiếu hoặc sai · nét trắng là chữ bạn viết (đã căn lại)</div>' : '') +
      `<div class="row c"><button class="btn" data-w="retry">↺ Viết lại</button><button class="btn primary" data-w="next">${esc(o.nextLabel || 'Tiếp ▶')}</button></div>`;
  }

  async function submit() {
    if (graded) return;
    const empty = boxes.filter(b => !b.strokes.length).length;
    if (empty === N) { toast('Hãy viết gì đó rồi mới nộp'); return; }
    if (empty && !confirm(`${empty} ô chưa viết gì. Vẫn nộp?`)) return;
    graded = true;
    $('.wnote', host).textContent = 'Đang chấm…';
    const results = [];
    for (const b of boxes) results.push(await gradeBox(b));
    boxes.forEach((b, i) => { b.result = results[i]; redraw(b); });
    results.forEach((r, i) => {
      const ch = pieces[i], id = hwId(lang, ch), old = store.get('hw', id) || {};
      store.put('hw', id, { lang, char: ch, best: Math.max(old.best ?? 0, r.score), last: r.score, tries: (old.tries || 0) + 1, at: Date.now(), deleted: false });
      tracker.hw();
    });
    finishUI('', results);
    o.onGraded?.({ answer, score: Math.round(results.reduce((s, r) => s + r.score, 0) / N), results });
  }

  async function reveal() {
    if (graded) return;
    graded = true;
    for (const b of boxes) {
      let exp = null; try { exp = await loadStrokesFor(b.ch, lang); } catch { /* bỏ qua */ }
      b.result = exp ? { kind: 'strokes', exp, g: { status: exp.map(() => 'ok'), aligned: [] } } : { kind: 'shape' };
      redraw(b);
    }
    finishUI('Bạn đã xem đáp án nên lần này không được chấm điểm. Hãy viết lại để được tính.', null);
    o.onGraded?.({ answer, score: 0, revealed: true });
  }

  host.addEventListener('click', e => {
    const b = e.target.closest('[data-w]'); if (!b) return;
    const a = b.dataset.w;
    if (a === 'undo' && !graded) { const i = history.pop(); if (i != null) { boxes[i].strokes.pop(); redraw(boxes[i]); } }
    else if (a === 'clear' && !graded) { boxes.forEach(x => { x.strokes = []; redraw(x); }); history.length = 0; }
    else if (a === 'submit') submit();
    else if (a === 'reveal') reveal();
    else if (a === 'pron') { $('.wpron', host).textContent = o.pron; }
    else if (a === 'retry') mountSubmitWriter(host, o);
    else if (a === 'next') o.onNext?.();
  });
}

// ---------- Bộ viết: cú pháp  nghĩa | chữ cần viết | phiên âm (không bắt buộc) ----------
export function parseWrite(text, lang) {
  const entries = [], errors = [];
  text.split(/\r?\n/).forEach((raw, li) => {
    const line = raw.trim(); if (!line || line.startsWith('//') || line.startsWith('#')) return;
    const f = line.replace(/｜/g, '|').split('|').map(x => x.trim());
    if (f.length < 2 || !f[0] || !f[1]) { errors.push({ line: li + 1, msg: 'cần dạng: nghĩa tiếng Việt | chữ cần viết' }); return; }
    const answer = zhText(f[1], lang);
    if (!piecesOf(answer, lang).length) { errors.push({ line: li + 1, msg: 'phần chữ cần viết không có chữ nào' }); return; }
    entries.push({ m: f[0], a: answer, p: f[2] || '' });
  });
  return { entries, errors };
}
const EXAMPLE = {
  zh: 'xin chào | 你好 | nǐ hǎo\ncảm ơn | 谢谢 | xiè xie\ntạm biệt | 再见 | zài jiàn\nhọc sinh | 学生 | xué sheng\ntrường học | 学校 | xué xiào',
  ja: 'xin chào | こんにちは | konnichiwa\ncảm ơn | ありがとう | arigatou\nnước Nhật | 日本 | nihon\nngôn ngữ | 語 | go',
  ko: 'xin chào | 안녕 | annyeong\ncảm ơn | 감사 | gamsa\nhọc sinh | 학생 | haksaeng',
  en: 'bữa sáng | breakfast\nthư viện | library\nthời tiết | weather',
};

// ---------- giao diện Bộ viết ----------
let host = null, mode = 'list', editId = null, run = null;
const opt = { shuffle: true };
const setsOf = lang => store.list('wsets').filter(s => (s.lang || 'zh') === lang).sort((a, b) => (b.u || 0) - (a.u || 0));

export function renderSets(el) {
  host = el;
  if (mode === 'edit') return drawEditor();
  if (mode === 'run' && run) return drawRun();
  mode = 'list'; drawList();
}

function drawList() {
  const lang = getLang(), list = setsOf(lang);
  host.innerHTML = `<div class="qcard">
      <div class="dim">Nhập <b>nghĩa tiếng Việt</b> và <b>chữ cần viết</b>. Khi làm bài chỉ hiện nghĩa, chữ bị ẩn; viết xong bấm <b>Nộp</b> để chấm và xem đáp án (hoặc bấm <b>Tiết lộ đáp án</b>).</div>
      <div class="row"><button class="btn primary" id="wsNew">＋ Tạo bộ viết</button><span class="grow"></span><label class="dim"><input type="checkbox" id="wsShuf" ${opt.shuffle ? 'checked' : ''}> Trộn thứ tự</label></div>
    </div>
    <div class="cards">${list.length ? list.map(s => {
      const n = parseWrite(s.text || '', s.lang || 'zh').entries.length;
      return `<div class="card" style="cursor:default"><div class="thumb">🖊</div><div class="ci"><b>${esc(s.title || 'Bộ viết')}</b><span class="dim">${n} mục</span></div>
        <button class="btn primary" data-run="${s.id}">▶ Làm bài</button><button class="btn" data-edit="${s.id}">✎</button><button class="btn" data-del="${s.id}">🗑</button></div>`;
    }).join('') : `<div class="empty">Chưa có bộ viết ${esc(langInfo().name)} nào. Bấm “＋ Tạo bộ viết”.</div>`}</div>`;
  $('#wsNew', host).onclick = () => { editId = null; mode = 'edit'; drawEditor(); };
  $('#wsShuf', host).onchange = e => { opt.shuffle = e.target.checked; };
  $$('[data-run]', host).forEach(b => b.onclick = () => start(b.dataset.run));
  $$('[data-edit]', host).forEach(b => b.onclick = () => { editId = b.dataset.edit; mode = 'edit'; drawEditor(); });
  $$('[data-del]', host).forEach(b => b.onclick = () => { if (confirm('Xóa bộ viết này?')) { store.del('wsets', b.dataset.del); drawList(); } });
}

function drawEditor() {
  const s = editId ? store.get('wsets', editId) : null, lang = s?.lang || getLang();
  host.innerHTML = `<div class="qcard">
    <label class="dim">Tên bộ viết<input id="wsTitle" type="text" value="${esc(s?.title || '')}" placeholder="Ví dụ: Từ vựng bài 1"></label>
    <label class="dim">Ngôn ngữ<select id="wsLang">${LANGS.map(l => `<option value="${l.id}" ${l.id === lang ? 'selected' : ''}>${l.name}</option>`).join('')}</select></label>
    <label class="dim">Nội dung, mỗi dòng một mục:  <code>nghĩa tiếng Việt | chữ cần viết | phiên âm (không bắt buộc)</code>
      <textarea id="wsText" class="mono" rows="10" spellcheck="false" placeholder="xin chào | 你好 | nǐ hǎo">${esc(s?.text || '')}</textarea></label>
    <div id="wsCheck" class="dim"></div>
    <div class="row"><button class="btn primary" id="wsSave">💾 Lưu</button><button class="btn" id="wsTry">▶ Lưu và làm bài</button><button class="btn" id="wsEx">Chèn ví dụ</button><button class="btn" id="wsCards">＋ Từ sổ thẻ</button><button class="btn" id="wsFile">📂 Mở file .txt</button><span class="grow"></span><button class="btn" id="wsBack">← Quay lại</button></div>
  </div>`;
  const ta = $('#wsText', host), lg = () => $('#wsLang', host).value;
  const check = () => {
    const p = parseWrite(ta.value, lg());
    $('#wsCheck', host).innerHTML = (p.entries.length ? `<span class="ok">✓ ${p.entries.length} mục hợp lệ</span>` : 'Chưa có mục nào.') +
      p.errors.slice(0, 6).map(e => `<div class="bad">dòng ${e.line}: ${esc(e.msg)}</div>`).join('');
  };
  ta.addEventListener('input', check); check();
  const save = () => {
    let text = ta.value;
    if (lg() === 'zh') { const c = zhText(text, 'zh'); if (c !== text) { text = c; ta.value = c; toast('Đã chuyển chữ Trung sang giản thể'); } }
    const p = parseWrite(text, lg());
    if (!p.entries.length) { toast('Chưa có mục hợp lệ nào để lưu'); return null; }
    const id = editId || uid(); editId = id;
    store.put('wsets', id, { lang: lg(), title: $('#wsTitle', host).value.trim() || 'Bộ viết', text, created: s?.created || Date.now(), deleted: false });
    toast('Đã lưu ✓'); return id;
  };
  $('#wsSave', host).onclick = save;
  $('#wsTry', host).onclick = () => { const id = save(); if (id) start(id); };
  $('#wsEx', host).onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = trLines(EXAMPLE[lg()] || EXAMPLE.zh); check(); } };
  $('#wsCards', host).onclick = () => {
    const lang2 = lg(), lines = [];
    for (const c of cards.allCards(lang2)) {
      const back = (c.back || []).filter(Boolean), meaning = back[back.length - 1];
      if (!meaning || [...c.front].length > 6 || !piecesOf(c.front, lang2).length) continue;
      lines.push(`${meaning} | ${c.front}${back.length >= 2 ? ' | ' + back[0] : ''}`);
    }
    if (!lines.length) { toast('Sổ thẻ chưa có thẻ ngắn nào có nghĩa để lấy'); return; }
    ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + lines.join('\n'); check(); toast(`Đã thêm ${lines.length} mục từ sổ thẻ`);
  };
  $('#wsFile', host).onclick = () => pickFile('.txt,text/plain').then(async ([f]) => { if (f) { ta.value = await f.text(); check(); if (!$('#wsTitle', host).value) $('#wsTitle', host).value = f.name.replace(/\.[^.]+$/, ''); } });
  $('#wsBack', host).onclick = () => { mode = 'list'; drawList(); };
}

function start(id, only) {
  const s = store.get('wsets', id); if (!s) return;
  const lang = s.lang || 'zh', es = only || parseWrite(s.text || '', lang).entries;
  if (!es.length) { toast('Bộ này chưa có mục hợp lệ'); return; }
  let q = es.slice();
  if (opt.shuffle && !only) for (let i = q.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [q[i], q[j]] = [q[j], q[i]]; }
  run = { id, lang, title: s.title, q, i: 0, res: [] };
  mode = 'run';
  document.dispatchEvent(new CustomEvent('review-tab', { detail: 'write' }));
  drawRun();
}

function drawRun() {
  const { q, i, lang } = run;
  if (i >= q.length) return summary();
  const e = q[i];
  host.innerHTML = `<div class="row"><button class="btn" id="wrQuit">← Thoát</button><span class="dim">${esc(run.title || '')}</span></div>
    <div class="qprog"><span>Câu ${i + 1}/${q.length}</span><progress max="${q.length}" value="${i}"></progress></div>
    <div class="qcard" id="wrBox"></div>`;
  $('#wrQuit', host).onclick = () => { run = null; mode = 'list'; drawList(); };
  mountSubmitWriter($('#wrBox', host), {
    answer: e.a, lang, meaning: e.m, pron: e.p, showModel: false,
    nextLabel: i + 1 >= q.length ? 'Xem kết quả ▶' : 'Câu sau ▶',
    onGraded: r => { run.res[i] = r; },
    onNext: () => { run.i++; drawRun(); },
  });
}

function summary() {
  const { q, res, lang } = run, bcp = langInfo(lang).bcp;
  const scores = q.map((_, k) => res[k]?.score ?? 0), avg = Math.round(scores.reduce((s, v) => s + v, 0) / q.length);
  const weak = q.filter((_, k) => scores[k] < 70);
  host.innerHTML = `<div class="qcard"><div class="score ${avg >= 85 ? 'ok' : avg >= 60 ? 'miss' : 'bad'}">${avg}% trung bình</div>
    <div class="qlist">${q.map((e, k) => `<div class="${scores[k] >= 70 ? 'ok' : 'bad'}">${scores[k] >= 70 ? '✓' : '✗'} ${esc(e.m)} → <span lang="${bcp}">${esc(e.a)}</span> (${res[k]?.revealed ? 'đã xem đáp án' : scores[k] + '%'})</div>`).join('')}</div>
    <div class="row"><button class="btn primary" id="wsAgain">↻ Làm lại cả bộ</button>${weak.length ? `<button class="btn" id="wsWeak">🔁 Làm lại ${weak.length} mục chưa đạt</button>` : ''}<button class="btn" id="wsList">Danh sách</button></div></div>`;
  $('#wsAgain', host).onclick = () => start(run.id);
  $('#wsWeak', host)?.addEventListener('click', () => start(run.id, weak));
  $('#wsList', host).onclick = () => { run = null; mode = 'list'; drawList(); };
}
