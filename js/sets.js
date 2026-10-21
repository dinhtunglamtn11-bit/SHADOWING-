// Bài tập của tôi: nhập nhiều câu cùng lúc bằng một đoạn văn bản theo cú pháp riêng, rồi làm bài.
//
// Mỗi dòng là một câu hỏi, bắt đầu bằng LOẠI: rồi các phần cách nhau bằng dấu |
//   T:  từ | phiên âm | nghĩa           từ vựng (tự sinh 3 câu: từ→nghĩa, nghĩa→từ, nghe→nghĩa)
//   TN: câu hỏi | *đúng | sai | sai      trắc nghiệm, dấu * đứng trước đáp án đúng
//   Đ:  Tôi [go/goes] to [school]        điền từ, đáp án để trong [ ], nhiều đáp án chấp nhận cách nhau bằng /
//   G:  câu hỏi | đáp án / đáp án khác   gõ đáp án
//   DS: nhận định | đúng                 đúng hay sai
//   thêm  ~ lời giải thích               ở cuối dòng (không bắt buộc)
//   # Tên bộ bài   dòng tiêu đề      // ghi chú      dòng bị bỏ qua      \|  để viết dấu | trong chữ
import { $, $$, esc, toast, uid, pickFile, getLang, langInfo, LANGS } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as cards from './cards.js';
import { sayable, withSpeaker, say, isTarget } from './tts.js';
import { rngOf, shuffle, norm } from './quiz.js';
import { zhText } from './prefs.js';
import { loadSimplifier } from './util.js';
import { trLines } from './i18n.js';

const uniq = a => [...new Set(a)];

// ---------- phân tích cú pháp ----------
const ALIAS = { tn: 'mc', mc: 'mc', q: 'mc', d: 'fill', dien: 'fill', fill: 'fill', g: 'type', type: 'type', ds: 'tf', tf: 'tf', t: 'vocab', w: 'vocab', v: 'vocab' };
const kindOf = k => ALIAS[k.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase()];

function splitBy(s, sep) { // tách theo sep, bỏ qua \sep
  const out = []; let cur = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '\\' && s[i + 1] === sep) { cur += sep; i++; }
    else if (ch === sep || (sep === '|' && ch === '｜')) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out.map(x => x.trim());
}
const TRUE = ['dung', 'd', 'true', 't', 'yes', 'y', '1', 'đúng'], FALSE = ['sai', 's', 'false', 'f', 'no', 'n', '0'];
const flat = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export function parseSet(text) {
  const qs = [], vocab = [], errors = [];
  let title = '';
  text.split(/\r?\n/).forEach((raw, li) => {
    const line = raw.trim(), n = li + 1;
    if (!line || line.startsWith('//')) return;
    if (line.startsWith('#')) { if (!title) title = line.replace(/^#+\s*/, ''); return; }
    const m = line.match(/^([A-Za-zĐđ]{1,5})\s*[:：]\s*(.*)$/);
    if (!m) { errors.push({ line: n, msg: 'thiếu “LOẠI:” ở đầu dòng (TN:, Đ:, G:, DS: hoặc T:)' }); return; }
    const kind = kindOf(m[1]);
    if (!kind) { errors.push({ line: n, msg: `không biết loại “${m[1]}” (dùng TN, Đ, G, DS hoặc T)` }); return; }
    // lời giải thích: phần sau dấu ~ (đứng sau khoảng trắng hoặc dấu |)
    let rest = m[2], explain = '';
    const ex = rest.match(/(?:^|[\s|｜])~\s*(.*)$/);
    if (ex) { explain = ex[1].trim(); rest = rest.slice(0, ex.index); }
    const f = splitBy(rest, '|').filter((x, k, a) => x || k < a.length - 1);
    const err = msg => errors.push({ line: n, msg });

    if (kind === 'vocab') {
      if (f.length < 2 || f.length > 3 || f.some(x => !x)) return err('từ vựng cần dạng “T: từ | nghĩa” hoặc “T: từ | phiên âm | nghĩa”');
      vocab.push({ word: f[0], pron: f.length === 3 ? f[1] : '', meaning: f[f.length - 1], line: n });
    } else if (kind === 'mc') {
      if (f.length < 3) return err('trắc nghiệm cần câu hỏi và ít nhất 2 đáp án: TN: câu hỏi | *đúng | sai');
      const options = f.slice(1).map(x => ({ t: x.replace(/^\*\s*/, ''), ok: x.startsWith('*') }));
      if (options.some(o => !o.t)) return err('có đáp án bị trống');
      if (options.filter(o => o.ok).length !== 1) return err('phải đánh dấu * đúng một đáp án đúng');
      qs.push({ kind: 'mc', prompt: f[0], options, explain, line: n });
    } else if (kind === 'fill') {
      const sent = f[0] || '', parts = []; let last = 0, blanks = 0;
      for (const b of sent.matchAll(/\[([^\]]+)\]/g)) {
        parts.push(sent.slice(last, b.index));
        parts.push({ a: splitBy(b[1], '/').filter(Boolean) });
        last = b.index + b[0].length; blanks++;
      }
      parts.push(sent.slice(last));
      if (!blanks) return err('điền từ cần đặt đáp án trong [ ], ví dụ: Đ: Tôi [đi] học');
      qs.push({ kind: 'fill', parts, hint: f[1] || '', explain, line: n });
    } else if (kind === 'type') {
      if (f.length < 2 || !f[1]) return err('gõ đáp án cần dạng: G: câu hỏi | đáp án / đáp án khác');
      qs.push({ kind: 'type', prompt: f[0], answers: splitBy(f[1], '/').filter(Boolean), explain, line: n });
    } else if (kind === 'tf') {
      const v = flat(f[1] || '');
      if (!TRUE.includes(v) && !FALSE.includes(v)) return err('đúng/sai cần dạng: DS: nhận định | đúng (hoặc sai)');
      qs.push({ kind: 'tf', prompt: f[0], ans: TRUE.includes(v), explain, line: n });
    }
  });
  if (vocab.length === 1) errors.push({ line: vocab[0].line, msg: 'cần ít nhất 2 từ vựng để tạo câu trắc nghiệm' });
  return { title, qs, vocab, errors };
}

export const EXAMPLES = {
  zh: `# Bài 1: Chào hỏi
T: 你好 | nǐ hǎo | Xin chào
T: 谢谢 | xièxie | Cảm ơn
T: 再见 | zàijiàn | Tạm biệt
T: 对不起 | duìbuqǐ | Xin lỗi
TN: “Cảm ơn” nói thế nào? | *谢谢 | 你好 | 再见 | 对不起
Đ: 我[每天]去学校 | Tôi đi học mỗi ngày
G: Xin chào | 你好 / nǐ hǎo
DS: 再见 nghĩa là “Xin chào” | sai ~ 再见 (zàijiàn) là tạm biệt`,
  en: `# Unit 1: Daily life
T: breakfast | bữa sáng
T: library | thư viện
T: weather | thời tiết
T: neighbour | hàng xóm
TN: What do you eat in the morning? | *breakfast | library | weather | neighbour
Đ: She [goes/went] to the [library] every day | Cô ấy đến thư viện mỗi ngày
G: bữa sáng | breakfast
DS: A library is a place to buy food | sai ~ Library là thư viện`,
  ko: `# Bài 1: Chào hỏi
T: 안녕하세요 | annyeonghaseyo | Xin chào
T: 감사합니다 | gamsahamnida | Cảm ơn
T: 죄송합니다 | joesonghamnida | Xin lỗi
T: 안녕히 가세요 | annyeonghi gaseyo | Tạm biệt
TN: “Cảm ơn” nói thế nào? | *감사합니다 | 안녕하세요 | 죄송합니다 | 안녕히 가세요
Đ: 저는 [학생]입니다 | Tôi là học sinh
G: Xin lỗi | 죄송합니다
DS: 안녕하세요 nghĩa là “Tạm biệt” | sai`,
  ja: `# Bài 1: Chào hỏi
T: こんにちは | konnichiwa | Xin chào
T: ありがとう | arigatou | Cảm ơn
T: すみません | sumimasen | Xin lỗi
T: さようなら | sayounara | Tạm biệt
TN: “Cảm ơn” nói thế nào? | *ありがとう | こんにちは | すみません | さようなら
Đ: 私は[学生]です | Tôi là học sinh
G: Xin lỗi | すみません
DS: こんにちは nghĩa là “Tạm biệt” | sai`,
};

// ---------- ra đề từ bộ đã phân tích ----------
function mcFrom(prompt, correct, pool, rnd, extra = {}) {
  const others = shuffle(pool.filter(x => x !== correct), rnd).slice(0, 3);
  return { kind: 'mc', prompt, options: shuffle([correct, ...others], rnd).map(t => ({ t, ok: t === correct })), ...extra };
}

export function build(parsed, opts, rnd) {
  const out = parsed.qs.map(q => (q.kind === 'mc' ? { ...q, options: shuffle(q.options, rnd) } : { ...q }));
  const V = parsed.vocab;
  if (V.length >= 2) {
    const meanings = uniq(V.map(v => v.meaning)), words = uniq(V.map(v => v.word));
    for (const v of V) {
      const info = `${v.word}${v.pron ? ' (' + v.pron + ')' : ''} = ${v.meaning}`;
      const card = { front: v.word, back: [v.pron, v.meaning] };
      out.push(mcFrom(v.word, v.meaning, meanings, rnd, { label: 'Chọn nghĩa đúng của từ', explain: info, card, sayPrompt: true }));
      out.push(mcFrom(v.meaning, v.word, words, rnd, { label: 'Chọn từ đúng cho nghĩa', explain: info, card }));
      if (opts.listen) out.push(mcFrom('', v.meaning, meanings, rnd, { label: 'Nghe và chọn nghĩa đúng', listen: v.word, explain: info, card }));
    }
  }
  const res = opts.shuffle ? shuffle(out, rnd) : out;
  return opts.count > 0 ? res.slice(0, opts.count) : res;
}

// ---------- chấm ----------
// tiếng Trung: gõ phồn thể hay giản thể đều được
const okAnswer = (typed, list, lang) => list.some(a => norm(zhText(a, lang)) === norm(zhText(typed, lang)));

// ---------- giao diện ----------
let box = null, mode = 'list', editId = null, run = null;
const runOpts = { shuffle: true, listen: true, count: 0 };

const setsOf = lang => store.list('sets').filter(s => (s.lang || 'zh') === lang).sort((a, b) => (b.u || 0) - (a.u || 0));

export function render(el) {
  box = el;
  if (mode === 'edit') return drawEditor();
  if (mode === 'run' && run) return drawQuestion();
  mode = 'list'; drawList();
}

function drawList() {
  const lang = getLang(), list = setsOf(lang);
  box.innerHTML = `<div class="row"><button class="btn primary" id="msNew">＋ Tạo bộ bài tập</button><span class="grow"></span>
      <label class="dim"><input type="checkbox" id="msShuf" ${runOpts.shuffle ? 'checked' : ''}> Trộn câu</label>
      <label class="dim"><input type="checkbox" id="msListen" ${runOpts.listen ? 'checked' : ''}> Có câu nghe</label>
      <label class="dim">Số câu <select id="msCount"><option value="0">Tất cả</option><option value="10">10</option><option value="20">20</option></select></label></div>
    <div class="dim" style="margin:4px 2px">Nhập nhiều câu cùng lúc: bấm “＋ Tạo bộ bài tập”, dán các dòng theo cú pháp (có hướng dẫn và ví dụ ngay trong màn soạn).</div>
    <div class="cards">${list.length ? list.map(s => {
      const p = parseSet(s.text || '');
      const n = p.qs.length + p.vocab.length * (p.vocab.length >= 2 ? (runOpts.listen ? 3 : 2) : 0);
      return `<div class="card" style="cursor:default"><div class="thumb">📝</div><div class="ci"><b>${esc(s.title || 'Bộ bài tập')}</b><span class="dim">${n} câu · ${p.vocab.length} từ vựng${p.errors.length ? ` · <span class="bad">${p.errors.length} dòng lỗi</span>` : ''}</span></div>
        <button class="btn primary" data-run="${s.id}">▶ Làm</button><button class="btn" data-edit="${s.id}">✎</button><button class="btn" data-del="${s.id}">🗑</button></div>`;
    }).join('') : `<div class="empty">Chưa có bộ bài tập ${esc(langInfo().name)} nào.</div>`}</div>`;
  $('#msCount', box).value = String(runOpts.count);
  $('#msNew', box).onclick = () => { editId = null; mode = 'edit'; drawEditor(); };
  $('#msShuf', box).onchange = e => { runOpts.shuffle = e.target.checked; };
  $('#msListen', box).onchange = e => { runOpts.listen = e.target.checked; drawList(); };
  $('#msCount', box).onchange = e => { runOpts.count = +e.target.value; };
  $$('[data-run]', box).forEach(b => b.onclick = () => start(b.dataset.run));
  $$('[data-edit]', box).forEach(b => b.onclick = () => { editId = b.dataset.edit; mode = 'edit'; drawEditor(); });
  $$('[data-del]', box).forEach(b => b.onclick = () => { if (confirm('Xóa bộ bài tập này?')) { store.del('sets', b.dataset.del); drawList(); } });
}

// ---------- soạn ----------
const HELP = `<details class="help"><summary>📖 Cú pháp nhập nhiều câu cùng lúc</summary>
<p>Mỗi dòng là một câu hỏi: <code>LOẠI: phần 1 | phần 2 | …</code> (các phần cách nhau bằng dấu <code>|</code>).</p>
<table>
<tr><td><code>T:</code> từ vựng</td><td><code>T: 你好 | nǐ hǎo | Xin chào</code><br><small>(phiên âm có thể bỏ). App tự sinh 3 câu: từ→nghĩa, nghĩa→từ, nghe→nghĩa.</small></td></tr>
<tr><td><code>TN:</code> trắc nghiệm</td><td><code>TN: Cảm ơn nói thế nào? | *谢谢 | 你好 | 再见</code><br><small>Dấu <code>*</code> đứng trước đáp án đúng (đúng một đáp án).</small></td></tr>
<tr><td><code>Đ:</code> điền từ</td><td><code>Đ: She [goes/went] to the [library] | Cô ấy đến thư viện</code><br><small>Đáp án để trong [ ]. Nhiều đáp án chấp nhận cách nhau bằng /. Có thể nhiều chỗ trống. Phần sau | là gợi ý.</small></td></tr>
<tr><td><code>G:</code> gõ đáp án</td><td><code>G: Xin chào | 你好 / nǐ hǎo</code><br><small>Các đáp án chấp nhận cách nhau bằng /.</small></td></tr>
<tr><td><code>DS:</code> đúng/sai</td><td><code>DS: 再见 nghĩa là “Xin chào” | sai</code></td></tr>
</table>
<p><b>Thêm giải thích:</b> đặt <code>~ lời giải thích</code> ở cuối dòng. <b>Tiêu đề:</b> dòng <code>#  Tên bộ</code>. <b>Ghi chú:</b> dòng bắt đầu bằng <code>//</code> bị bỏ qua. Muốn viết dấu | trong chữ thì gõ <code>\\|</code>.</p>
<p>Khi làm bài, chữ tiếng đang học có <b>🔊</b> bên cạnh, bấm là máy đọc.</p></details>`;

function drawEditor() {
  const s = editId ? store.get('sets', editId) : null;
  const lang = s?.lang || getLang();
  box.innerHTML = `${HELP}
    <label class="dim">Tên bộ bài tập<input id="msTitle" type="text" value="${esc(s?.title || '')}" placeholder="Ví dụ: Bài 1: Chào hỏi"></label>
    <label class="dim">Ngôn ngữ<select id="msLang">${LANGS.map(l => `<option value="${l.id}" ${l.id === lang ? 'selected' : ''}>${l.name}</option>`).join('')}</select></label>
    <label class="dim">Nội dung (mỗi dòng một câu)<textarea id="msText" class="mono" rows="14" spellcheck="false" placeholder="Dán hoặc gõ nhiều dòng ở đây. Bấm “Chèn ví dụ” để xem mẫu.">${esc(s?.text || '')}</textarea></label>
    <div id="msCheck" class="dim"></div>
    <div class="row"><button class="btn primary" id="msSave">💾 Lưu</button><button class="btn" id="msTry">▶ Lưu và làm thử</button><button class="btn" id="msEx">Chèn ví dụ</button><button class="btn" id="msFile">📂 Mở file .txt</button><span class="grow"></span><button class="btn" id="msCards">📒 Từ vựng → sổ thẻ</button><button class="btn" id="msBack">← Quay lại</button></div>`;
  const ta = $('#msText', box);
  const check = () => {
    const p = parseSet(ta.value), total = p.qs.length + p.vocab.length;
    $('#msCheck', box).innerHTML = (total ? `<span class="ok">✓ ${p.qs.length} câu + ${p.vocab.length} từ vựng hợp lệ</span>` : 'Chưa có dòng nào.') +
      (p.errors.length ? `<div class="bad">${p.errors.length} dòng có lỗi:</div>` + p.errors.slice(0, 8).map(e => `<div class="bad">dòng ${e.line}: ${esc(e.msg)}</div>`).join('') : '');
  };
  ta.addEventListener('input', check); check();
  const save = () => {
    const lg = $('#msLang', box).value;
    if (lg === 'zh') { const c = zhText(ta.value, 'zh'); if (c !== ta.value) { ta.value = c; check(); toast('Đã chuyển chữ Trung sang giản thể'); } }
    const p = parseSet(ta.value);
    if (!p.qs.length && !p.vocab.length) { toast('Chưa có câu hỏi hợp lệ nào để lưu'); return null; }
    const id = editId || uid(); editId = id;
    store.put('sets', id, { lang: lg, title: zhText($('#msTitle', box).value.trim(), lg) || p.title || 'Bộ bài tập', text: ta.value, created: s?.created || Date.now(), deleted: false });
    toast('Đã lưu ✓');
    return id;
  };
  $('#msSave', box).onclick = save;
  $('#msTry', box).onclick = () => { const id = save(); if (id) start(id); };
  $('#msEx', box).onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = trLines(EXAMPLES[$('#msLang', box).value] || EXAMPLES.zh); check(); } };
  $('#msFile', box).onclick = () => pickFile('.txt,text/plain').then(async ([f]) => { if (f) { ta.value = await f.text(); check(); if (!$('#msTitle', box).value) $('#msTitle', box).value = parseSet(ta.value).title || f.name.replace(/\.[^.]+$/, ''); } });
  $('#msCards', box).onclick = () => {
    const p = parseSet(ta.value), lg = $('#msLang', box).value; let n = 0;
    if (!p.vocab.length) { toast('Chưa có dòng từ vựng (T:) nào'); return; }
    const have = new Set(cards.allCards(lg).map(c => c.front));
    for (const v of p.vocab) if (!have.has(v.word)) { cards.addManual({ lang: lg, front: v.word, back: [v.pron, v.meaning] }); n++; }
    toast(n ? `Đã thêm ${n} từ vào sổ thẻ 📒` : 'Các từ này đã có trong sổ thẻ');
  };
  $('#msBack', box).onclick = () => { mode = 'list'; drawList(); };
}

// ---------- làm bài ----------
function start(id, only) {
  const s = store.get('sets', id); if (!s) return;
  const parsed = parseSet(s.text || '');
  if (!parsed.qs.length && parsed.vocab.length < 2) { toast('Bộ này chưa đủ câu hỏi hợp lệ'); return; }
  const rnd = rngOf('set' + id + Date.now());
  const qs = only || build(parsed, runOpts, rnd);
  run = { id, lang: s.lang || 'zh', title: s.title, qs, i: 0, res: [] };
  mode = 'run';
  document.dispatchEvent(new CustomEvent('review-tab', { detail: 'mine' }));
  drawQuestion();
}

function prompt(q) {
  const L = run.lang, bcp = langInfo(L).bcp;
  if (q.kind === 'mc') {
    if (q.listen) return `<div class="qlabel">${esc(q.label)}</div><div class="row c"><button class="btn primary big" id="msListenBtn">🔊 Nghe</button></div>`;
    return `<div class="qlabel">${esc(q.label || 'Chọn đáp án đúng')}</div><div class="qtext" lang="${bcp}">${q.sayPrompt || !q.label ? sayable(q.prompt, L) : esc(q.prompt)}</div>`;
  }
  if (q.kind === 'tf') return `<div class="qlabel">Đúng hay sai?</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>`;
  if (q.kind === 'type') return `<div class="qlabel">Gõ đáp án</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>`;
  return '';
}

function drawQuestion() {
  const { qs, i, res } = run;
  if (i >= qs.length) return summary();
  const q = qs[i], r = res[i], answered = r != null, L = run.lang, bcp = langInfo(L).bcp;
  let body = prompt(q);
  if (q.kind === 'mc') {
    body += `<div class="qopts">${q.options.map((o, k) => `<button class="qopt ${answered ? (o.ok ? 'right' : r.sel === k ? 'wrong' : '') : ''}" data-o="${k}" ${answered ? 'disabled' : ''} lang="${bcp}"><i>${k + 1}</i><span>${withSpeaker(o.t, L)}</span></button>`).join('')}</div>`;
  } else if (q.kind === 'tf') {
    body += `<div class="qopts two"><button class="qopt ${answered ? (q.ans === true ? 'right' : r.sel === true ? 'wrong' : '') : ''}" data-tf="1" ${answered ? 'disabled' : ''}><i>1</i><span>Đúng</span></button>` +
      `<button class="qopt ${answered ? (q.ans === false ? 'right' : r.sel === false ? 'wrong' : '') : ''}" data-tf="0" ${answered ? 'disabled' : ''}><i>2</i><span>Sai</span></button></div>`;
  } else if (q.kind === 'type') {
    body += `<div class="row"><input id="msIn" type="text" lang="${bcp}" autocomplete="off" autocapitalize="off" spellcheck="false" ${answered ? `value="${esc(r.typed)}" disabled class="${r.ok ? 'okin' : 'badin'}"` : ''} placeholder="Gõ đáp án"><button class="btn primary" id="msSubmit" ${answered ? 'hidden' : ''}>Trả lời</button></div>`;
    if (answered && !r.ok) body += `<div class="dim">Đáp án: ${q.answers.map(a => sayable(a, L)).join(' / ')}</div>`;
  } else if (q.kind === 'fill') {
    let b = 0;
    body += `<div class="qlabel">Điền vào chỗ trống</div><div class="qtext fill" lang="${bcp}">${q.parts.map(p => {
      if (typeof p === 'string') return esc(p);
      const k = b++, w = Math.max(3, Math.max(...p.a.map(a => [...a].length)) + 1);
      return `<input class="fin ${answered ? (r.each[k] ? 'okin' : 'badin') : ''}" data-b="${k}" size="${w}" autocomplete="off" autocapitalize="off" spellcheck="false" ${answered ? `value="${esc(r.typed[k] || '')}" disabled` : ''}>`;
    }).join('')}</div>${q.hint ? `<div class="dim">Gợi ý: ${esc(q.hint)}</div>` : ''}`;
    if (!answered) body += '<div class="row"><button class="btn primary" id="msSubmit">Trả lời</button></div>';
    else if (!r.ok) body += `<div class="dim">Đáp án: ${q.parts.filter(p => typeof p !== 'string').map(p => sayable(p.a[0], L) + (p.a.length > 1 ? ' <small>(hoặc ' + esc(p.a.slice(1).join(' / ')) + ')</small>' : '')).join(' · ')}</div>`;
  }
  let fb = '';
  if (answered) {
    const full = q.kind === 'fill' ? q.parts.map(p => (typeof p === 'string' ? p : p.a[0])).join('') : '';
    fb = `<div class="qfb ${r.ok ? 'ok' : 'bad'}">${r.ok ? '✅ Đúng!' : '❌ Chưa đúng'}</div>` +
      (full ? `<div class="qexp" lang="${bcp}">${sayable(full, L)}</div>` : '') +
      (q.explain ? `<div class="qexp dim">${esc(q.explain)}</div>` : '') +
      `<div class="row"><button class="btn primary" id="msNext">${i + 1 >= qs.length ? 'Xem kết quả' : 'Tiếp ▶'}</button></div>`;
  }
  box.innerHTML = `<div class="row"><button class="btn" id="msQuit">← Thoát</button><span class="dim">${esc(run.title || '')}</span></div>
    <div class="qprog"><span>Câu ${i + 1}/${qs.length}</span><progress max="${qs.length}" value="${res.filter(Boolean).length}"></progress></div>
    <div class="qcard">${body}${fb}</div>`;

  $('#msQuit', box).onclick = () => { run = null; mode = 'list'; drawList(); };
  $$('[data-o]', box).forEach(b => b.onclick = () => finish(q.options[+b.dataset.o].ok, { sel: +b.dataset.o }));
  $$('[data-tf]', box).forEach(b => b.onclick = () => finish((b.dataset.tf === '1') === q.ans, { sel: b.dataset.tf === '1' }));
  $('#msSubmit', box)?.addEventListener('click', submit);
  const inputs = $$('#msIn, .fin', box);
  inputs.forEach((inp, k) => inp.addEventListener('keydown', e => {
    if (e.key !== 'Enter' || e.isComposing) return;
    e.preventDefault();
    if (k < inputs.length - 1) inputs[k + 1].focus(); else submit();
  }));
  $('#msNext', box)?.addEventListener('click', () => { run.i++; drawQuestion(); });
  $('#msListenBtn', box)?.addEventListener('click', () => say(q.listen, bcp));
  if (q.listen && !answered) setTimeout(() => say(q.listen, bcp), 250);
  if (!answered) inputs[0]?.focus();
}

function finish(ok, extra) {
  if (run.res[run.i] != null) return;
  run.res[run.i] = { ok, ...extra };
  tracker.quiz(ok);
  drawQuestion();
}

function submit() {
  const q = run.qs[run.i];
  if (q.kind === 'type') {
    const v = $('#msIn', box).value;
    if (!v.trim()) { toast('Hãy gõ đáp án'); return; }
    finish(okAnswer(v, q.answers, run.lang), { typed: v });
  } else if (q.kind === 'fill') {
    const typed = $$('.fin', box).map(i => i.value), blanks = q.parts.filter(p => typeof p !== 'string');
    if (typed.every(t => !t.trim())) { toast('Hãy điền vào chỗ trống'); return; }
    const each = blanks.map((p, k) => okAnswer(typed[k] || '', p.a, run.lang));
    finish(each.every(Boolean), { typed, each });
  }
}

function summary() {
  const { qs, res } = run, ok = res.filter(r => r && r.ok).length, pct = Math.round(100 * ok / qs.length);
  const wrong = qs.filter((_, k) => !(res[k] && res[k].ok));
  box.innerHTML = `<div class="qcard"><div class="score ${pct >= 80 ? 'ok' : pct >= 50 ? 'miss' : 'bad'}">${ok}/${qs.length} đúng · ${pct}%</div>
    <div class="qlist">${qs.map((q, k) => `<div class="${res[k]?.ok ? 'ok' : 'bad'}">${res[k]?.ok ? '✓' : '✗'} ${esc(summaryText(q))}</div>`).join('')}</div>
    <div class="dim">${wrong.length ? `${wrong.length} câu chưa đúng.` : '🎉 Hoàn hảo!'}</div>
    <div class="row"><button class="btn primary" id="msAgain">↻ Làm lại</button>${wrong.length ? '<button class="btn" id="msWrong">🔁 Làm lại câu sai</button><button class="btn" id="msToCards">📒 Câu sai → sổ thẻ</button>' : ''}<button class="btn" id="msList">Danh sách</button></div></div>`;
  $('#msAgain', box).onclick = () => start(run.id);
  $('#msWrong', box)?.addEventListener('click', () => { const id = run.id; start(id, wrong.map(q => ({ ...q, options: q.options && shuffle(q.options, rngOf('w' + Date.now())) }))); });
  $('#msToCards', box)?.addEventListener('click', () => {
    let n = 0;
    for (const q of wrong) {
      const c = cardOf(q); if (!c) continue;
      cards.addManual({ lang: run.lang, front: c.front, back: c.back.filter(Boolean) }); n++;
    }
    toast(`Đã thêm ${n} thẻ vào sổ ôn 📒`);
  });
  $('#msList', box).onclick = () => { run = null; mode = 'list'; drawList(); };
}

function summaryText(q) {
  if (q.kind === 'fill') return q.parts.map(p => (typeof p === 'string' ? p : `[${p.a[0]}]`)).join('');
  if (q.listen) return '🔊 ' + q.options.find(o => o.ok).t;
  return q.prompt || q.options.find(o => o.ok).t;
}
// Nội dung thẻ ôn cho một câu sai
function cardOf(q) {
  if (q.card) return q.card;
  const ex = q.explain ? [q.explain] : [];
  if (q.kind === 'mc') return { front: q.prompt, back: [q.options.find(o => o.ok).t, ...ex] };
  if (q.kind === 'tf') return { front: q.prompt, back: [q.ans ? 'Đúng' : 'Sai', ...ex] };
  if (q.kind === 'type') return { front: q.prompt, back: [q.answers.join(' / '), ...ex] };
  if (q.kind === 'fill') return { front: q.parts.map(p => (typeof p === 'string' ? p : p.a[0])).join(''), back: [q.hint, ...ex] };
  return null;
}

document.addEventListener('keydown', e => {
  if (!box || !run || mode !== 'run' || document.body.dataset.view !== 'review' || e.target.matches('input,textarea,select')) return;
  const q = run.qs[run.i];
  if (!q) return;
  if (run.res[run.i] != null) { if (e.key === 'Enter') $('#msNext', box)?.click(); return; }
  if (/^[1-9]$/.test(e.key)) {
    if (q.kind === 'mc' && +e.key <= q.options.length) $$('[data-o]', box)[+e.key - 1]?.click();
    else if (q.kind === 'tf' && (e.key === '1' || e.key === '2')) $$('[data-tf]', box)[+e.key - 1]?.click();
  }
});
