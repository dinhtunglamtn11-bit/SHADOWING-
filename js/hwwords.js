// Viết chữ → “Từ mới (cấp · chương)”: nhập từ vựng mới (chữ | phiên âm | nghĩa), gắn cấp (HSK…) và chương,
// rồi chỉ viết đúng các từ đó theo bộ lọc. Từ nhiều chữ thì các ô viết hiện cạnh nhau.
//  - Luyện / ôn (có gợi ý): tập nét từng nét trên mọi ô, tô theo mẫu mờ, hoặc tự nhớ.
//  - Kiểm tra: không gợi ý, không hiện đáp án giữa chừng, cuối bài mới có kết quả.
// Mỗi từ là một tài liệu trong bộ sưu tập “hwwords” (đồng bộ, vào Thùng rác khi xóa).
import { $, $$, esc, toast, uid, bus, getLang, langInfo, loadSimplifier } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { say } from './tts.js';
import { prefs, savePrefs, zhText } from './prefs.js';
import { loadStrokesFor, createCoach } from './strokes.js';
import { mountSubmitWriter, boxSize } from './writeset.js';
import { promptFor } from './prompts.js';

const COL = 'hwwords';
const PASS = 70; // từ đạt từ 70% trở lên
const PAGE = 60;
const PINYIN = 'https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm';
const LEVELS_OF = {
  zh: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7-9'],
  ja: ['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1'],
  ko: ['TOPIK 1', 'TOPIK 2', 'TOPIK 3', 'TOPIK 4', 'TOPIK 5', 'TOPIK 6'],
  en: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
};
const EXAMPLE = {
  zh: '学习 | xué xí | học tập\n图书馆 | tú shū guǎn | thư viện\n朋友 | péng you | bạn bè',
  ja: '学生 | gakusei | học sinh\n図書館 | toshokan | thư viện\nともだち | tomodachi | bạn bè',
  ko: '학생 | haksaeng | học sinh\n도서관 | doseogwan | thư viện\n친구 | chingu | bạn bè',
  en: 'library | /ˈlaɪbrəri/ | thư viện\nweather | /ˈweðər/ | thời tiết\nfriend | /frend/ | bạn bè',
};

const piecesOf = (text, lang) => (lang === 'en' ? [...text].filter(c => /[A-Za-z0-9]/.test(c)) : [...text].filter(c => /[\p{L}\p{N}]/u.test(c)));
const hwLevel = () => (['easy', 'mid', 'hard'].includes(prefs.hwLevel) ? prefs.hwLevel : 'mid');
const cmp = (a, b) => String(a).localeCompare(String(b), 'vi', { numeric: true });
const scoreCls = s => (s >= 85 ? 'ok' : s >= 60 ? 'miss' : 'bad');

// ---------- dữ liệu ----------
const wordsOf = lang => store.list(COL).filter(w => (w.lang || 'zh') === lang)
  .sort((a, b) => cmp(a.level, b.level) || cmp(a.chapter, b.chapter) || (a.created || 0) - (b.created || 0));

// chỉ nhận từ vựng, không nhận cả câu
function wordError(word, lang) {
  const n = piecesOf(word, lang).length;
  if (!n) return 'phần chữ cần viết không có chữ nào';
  const long = lang === 'en' ? n > 20 || word.trim().split(/\s+/).length > 3 : n > 8 || /[。？！，、；?!,;]/.test(word);
  return long ? 'dài quá: mục này chỉ nhận từ vựng, không nhận cả câu' : '';
}

// cú pháp mỗi dòng:  chữ | phiên âm | nghĩa   (bỏ phiên âm thì:  chữ | nghĩa)
export function parseWords(text, lang) {
  const entries = [], errors = [];
  String(text).split(/\r?\n/).forEach((raw, li) => {
    let line = raw.trim().replace(/｜/g, '|');
    if (!line || /^(```|#|\/\/)/.test(line) || /^[|\-: ]+$/.test(line)) return; // dòng trống, rào code, tiêu đề, vạch bảng
    line = line.replace(/^[-*•]\s+/, '').replace(/^\d+\s*[.)、]\s*/, '').replace(/^[TWV]\s*[:：]\s*/, '').replace(/^\|/, '').replace(/\|$/, '');
    const f = line.split(/[|\t]/).map(x => x.trim());
    if (/^(chữ|chữ hán|từ|word|汉字)$/i.test(f[0])) return; // dòng tên cột
    const word = zhText(f[0], lang), pron = f.length > 2 ? f[1] : '', meaning = f.length > 2 ? f.slice(2).filter(Boolean).join(' | ') : (f[1] || '');
    if (f.length < 2 || !word || !meaning) { errors.push({ line: li + 1, msg: 'cần dạng: chữ | phiên âm | nghĩa' }); return; }
    const err = wordError(word, lang);
    if (err) { errors.push({ line: li + 1, msg: err }); return; }
    entries.push({ word, pron, meaning });
  });
  return { entries, errors };
}

async function fillPinyin(entries, lang) { // tiếng Trung thiếu phiên âm thì tự điền (không có mạng thì bỏ qua)
  if (lang !== 'zh' || entries.every(e => e.pron)) return;
  try {
    const { pinyin } = await import(/* @vite-ignore */ PINYIN);
    entries.forEach(e => { if (!e.pron && /\p{Script=Han}/u.test(e.word)) e.pron = pinyin(e.word, { toneType: 'symbol' }); });
  } catch { /* không có mạng */ }
}

// thêm mới; từ đã có trong đúng cấp + chương thì cập nhật phiên âm / nghĩa. Trả về mã các từ đã lưu.
function saveWords(entries, lang, level, chapter) {
  const have = new Map(wordsOf(lang).filter(w => (w.level || '') === level && (w.chapter || '') === chapter).map(w => [w.word, w.id]));
  const now = Date.now(), ids = new Set();
  let added = 0, updated = 0;
  entries.forEach((e, i) => {
    let id = have.get(e.word);
    if (id) { if (!ids.has(id)) updated++; store.put(COL, id, { pron: e.pron || store.get(COL, id).pron || '', meaning: e.meaning }); }
    else { id = uid(); have.set(e.word, id); added++; store.put(COL, id, { lang, word: e.word, pron: e.pron, meaning: e.meaning, level, chapter, created: now + i, deleted: false }); }
    ids.add(id);
  });
  return { ids: [...ids], added, updated };
}

function record(id, score) {
  const w = store.get(COL, id); if (!w || w.deleted) return;
  store.put(COL, id, { best: Math.max(w.best ?? 0, score), last: score, tries: (w.tries || 0) + 1, at: Date.now() });
}

// ---------- bộ lọc (nhớ theo ngôn ngữ, chỉ trong máy) ----------
const DEF = { level: '*', chapter: '*', weak: false, shuffle: true, pron: true, hint: 'trace', newLevel: '', newChapter: '' };
const FKEY = lang => 'hww:' + lang;
const loadOpt = lang => { try { return { ...DEF, ...JSON.parse(localStorage.getItem(FKEY(lang)) || '{}') }; } catch { return { ...DEF }; } };
const saveOpt = () => { try { localStorage.setItem(FKEY(S.lang), JSON.stringify(S.opt)); } catch { /* bỏ qua */ } };

const S = { mode: 'list', lang: null, opt: { ...DEF }, shown: PAGE, editId: null, draft: '', run: null };
let host = null, coaches = [], token = 0;

function stopCoaches() { coaches.forEach(c => { try { c.destroy(); } catch { /* bỏ qua */ } }); coaches = []; token++; }

export function renderWords(el) {
  host = el;
  const lang = getLang();
  if (S.lang !== lang) { S.lang = lang; S.opt = loadOpt(lang); S.mode = 'list'; S.run = null; S.draft = ''; S.shown = PAGE; }
  if (lang === 'zh') loadSimplifier();
  draw();
}
function draw() {
  stopCoaches();
  if ((S.mode === 'practice' || S.mode === 'test') && S.run) return drawRun();
  if (S.mode === 'result' && S.run) return drawResult();
  if (S.mode === 'add') return drawAdd();
  if (S.mode === 'edit') return drawEdit();
  S.mode = 'list'; drawList();
}
const go = mode => { S.mode = mode; draw(); };

// ---------- danh sách + bộ lọc ----------
function filtered(all) {
  const o = S.opt;
  return all.filter(w => (o.level === '*' || (w.level || '') === o.level) && (o.chapter === '*' || (w.chapter || '') === o.chapter));
}
const labelSpan = (v, none) => (v ? `<span class="hww-u">${esc(v)}</span>` : `<span>${none}</span>`);
const optionHtml = (v, sel, none) => (v ? `<option class="hww-u" value="${esc(v)}" ${v === sel ? 'selected' : ''}>${esc(v)}</option>` : `<option value="" ${sel === '' ? 'selected' : ''}>${none}</option>`);

function drawList() {
  const lang = S.lang, o = S.opt, all = wordsOf(lang), bcp = langInfo(lang).bcp;
  const levels = [...new Set(all.map(w => w.level || ''))].sort(cmp);
  if (o.level !== '*' && !levels.includes(o.level)) o.level = '*';
  const chapters = [...new Set(all.filter(w => o.level === '*' || (w.level || '') === o.level).map(w => w.chapter || ''))].sort(cmp);
  if (o.chapter !== '*' && !chapters.includes(o.chapter)) o.chapter = '*';
  const list = filtered(all), weak = list.filter(w => w.last == null || w.last < PASS);
  const target = o.weak ? weak : list;

  const groups = [];
  for (const w of list.slice(0, S.shown)) {
    const key = (w.level || '') + '\u0000' + (w.chapter || '');
    if (groups[groups.length - 1]?.key !== key) groups.push({ key, level: w.level || '', chapter: w.chapter || '', rows: [] });
    groups[groups.length - 1].rows.push(w);
  }
  const total = key => list.filter(w => (w.level || '') + '\u0000' + (w.chapter || '') === key).length;
  const badge = w => (w.last == null ? '<span class="dim">chưa viết</span>' : `<span class="${scoreCls(w.last)}">${w.last}%</span>`);

  host.innerHTML = `<div class="qcard">
      <div class="dim">Nhập từ vựng mới (chữ, phiên âm, nghĩa), gắn cấp và chương, rồi chỉ viết đúng các từ đó. Từ nhiều chữ được viết cùng lúc trên các ô cạnh nhau.</div>
      <div class="row"><button class="btn primary" id="hwwAdd">＋ Nhập từ mới</button></div>
    </div>
    ${all.length ? `<div class="qcard">
      <div class="hww-filters">
        <label class="dim">Cấp<select id="hwwLevel"><option value="*">Tất cả cấp</option>${levels.map(v => optionHtml(v, o.level === '*' ? null : o.level, 'Không cấp')).join('')}</select></label>
        <label class="dim">Chương<select id="hwwChapter"><option value="*">Tất cả chương</option>${chapters.map(v => optionHtml(v, o.chapter === '*' ? null : o.chapter, 'Không chương')).join('')}</select></label>
        <label class="dim">Độ khắt khe<select id="hwwStrict"><option value="easy">Dễ</option><option value="mid">Vừa</option><option value="hard">Khó</option></select></label>
      </div>
      <div class="row hww-checks">
        <label class="dim"><input type="checkbox" id="hwwShuffle" ${o.shuffle ? 'checked' : ''}> Trộn thứ tự</label>
        <label class="dim"><input type="checkbox" id="hwwWeak" ${o.weak ? 'checked' : ''}> Chỉ từ chưa đạt</label>
        <label class="dim"><input type="checkbox" id="hwwPron" ${o.pron ? 'checked' : ''}> Hiện phiên âm khi kiểm tra</label>
      </div>
      <div class="dim">${list.length} từ trong bộ lọc · ${weak.length} từ chưa đạt</div>
      <div class="row"><button class="btn primary" id="hwwPractice" ${target.length ? '' : 'disabled'}>✍️ Luyện / ôn viết (${target.length})</button><button class="btn" id="hwwTest" ${target.length ? '' : 'disabled'}>📋 Kiểm tra (${target.length})</button></div>
    </div>
    <div class="qcard">
      ${groups.map(g => `<div class="hww-group"><b>${labelSpan(g.level, 'Không cấp')} · ${labelSpan(g.chapter, 'Không chương')}</b><span class="dim">${total(g.key)} từ</span></div>
        ${g.rows.map(w => `<div class="hww-row">
          <b class="hww-u hww-word" lang="${bcp}">${esc(w.word)}</b>
          <span class="hww-info"><span class="hww-u dim">${esc(w.pron || '')}</span><span class="hww-u">${esc(w.meaning || '')}</span></span>
          <span class="hww-stat">${badge(w)}</span>
          <span class="hww-acts"><button class="btn" data-hwsay="${w.id}" title="Nghe đọc">🔊</button><button class="btn" data-edit="${w.id}" title="Sửa">✎</button><button class="btn" data-del="${w.id}" title="Xóa">🗑</button></span>
        </div>`).join('')}`).join('')}
      ${list.length > S.shown ? `<div class="row c"><button class="btn" id="hwwMore">▼ Hiện thêm (còn ${list.length - S.shown})</button></div>` : ''}
      ${o.level !== '*' || o.chapter !== '*' ? `<div class="row"><span class="grow"></span><button class="btn" id="hwwDelAll">🗑 Xóa ${list.length} từ đang lọc</button></div>` : ''}
    </div>` : `<div class="empty">Chưa có từ mới ${esc(langInfo(lang).name)} nào. Bấm “＋ Nhập từ mới”.</div>`}`;

  $('#hwwAdd', host).onclick = () => { // đang lọc một cấp / chương thì nhập thẳng vào đó
    if (o.level !== '*') o.newLevel = o.level;
    if (o.chapter !== '*') o.newChapter = o.chapter;
    saveOpt(); go('add');
  };
  if (!all.length) return;
  const set = (key, val) => { o[key] = val; S.shown = PAGE; saveOpt(); drawList(); };
  $('#hwwLevel', host).onchange = e => { o.chapter = '*'; set('level', e.target.value); };
  $('#hwwChapter', host).onchange = e => set('chapter', e.target.value);
  $('#hwwStrict', host).value = hwLevel();
  $('#hwwStrict', host).onchange = e => { prefs.hwLevel = e.target.value; savePrefs(); };
  $('#hwwShuffle', host).onchange = e => set('shuffle', e.target.checked);
  $('#hwwWeak', host).onchange = e => set('weak', e.target.checked);
  $('#hwwPron', host).onchange = e => set('pron', e.target.checked);
  $('#hwwPractice', host).onclick = () => start('practice', target.map(w => w.id));
  $('#hwwTest', host).onclick = () => start('test', target.map(w => w.id));
  $('#hwwMore', host)?.addEventListener('click', () => { S.shown += PAGE; drawList(); });
  $('#hwwDelAll', host)?.addEventListener('click', () => {
    if (!confirm(`Xóa ${list.length} từ đang lọc? Có thể khôi phục trong Thùng rác 30 ngày.`)) return;
    list.forEach(w => store.del(COL, w.id)); o.level = '*'; o.chapter = '*'; saveOpt(); drawList(); toast('Đã chuyển vào Thùng rác');
  });
  $$('[data-hwsay]', host).forEach(b => b.onclick = () => say(store.get(COL, b.dataset.hwsay).word, bcp));
  $$('[data-edit]', host).forEach(b => b.onclick = () => { S.editId = b.dataset.edit; go('edit'); });
  $$('[data-del]', host).forEach(b => b.onclick = () => {
    if (!confirm('Xóa từ này? Có thể khôi phục trong Thùng rác 30 ngày.')) return;
    store.del(COL, b.dataset.del); drawList(); toast('Đã chuyển vào Thùng rác');
  });
}

// ---------- chọn cấp / chương trong form ----------
function levelField(lang, current) {
  const opts = [...new Set([...LEVELS_OF[lang] || [], ...wordsOf(lang).map(w => w.level).filter(Boolean), ...(current ? [current] : [])])];
  return `<label class="dim">Cấp<select id="hwwFLevel"><option value="">Không cấp</option>${opts.map(v => `<option class="hww-u" value="${esc(v)}" ${v === current ? 'selected' : ''}>${esc(v)}</option>`).join('')}<option value="__new">✎ Nhãn khác…</option></select></label>
    <label class="dim" id="hwwFCustomBox" hidden>Nhãn cấp mới<input id="hwwFCustom" type="text" maxlength="30" placeholder="Ví dụ: Giáo trình Hán ngữ"></label>`;
}
function chapterField(lang, current) {
  const opts = [...new Set(wordsOf(lang).map(w => w.chapter).filter(Boolean))].sort(cmp);
  return `<label class="dim">Chương<input id="hwwFChapter" type="text" maxlength="40" list="hwwChList" value="${esc(current || '')}" placeholder="Ví dụ: Bài 1"></label>
    <datalist id="hwwChList">${opts.map(v => `<option value="${esc(v)}"></option>`).join('')}</datalist>`;
}
function bindLevel() {
  $('#hwwFLevel', host).onchange = e => { const custom = e.target.value === '__new'; $('#hwwFCustomBox', host).hidden = !custom; if (custom) $('#hwwFCustom', host).focus(); };
}
const readLevel = () => { const v = $('#hwwFLevel', host).value; return v === '__new' ? $('#hwwFCustom', host).value.trim() : v; };
const readChapter = () => $('#hwwFChapter', host).value.trim();

// ---------- nhập nhiều từ ----------
function drawAdd() {
  const lang = S.lang, o = S.opt;
  host.innerHTML = `<div class="row"><button class="btn" id="hwwBack">← Quay lại</button></div>
    <div class="qcard">
      <div class="hww-filters">${levelField(lang, o.newLevel)}${chapterField(lang, o.newChapter)}</div>
      <label class="dim">Mỗi dòng một từ:  <code>chữ | phiên âm | nghĩa</code>
        <textarea id="hwwText" class="mono" rows="8" spellcheck="false" placeholder="学习 | xué xí | học tập">${esc(S.draft)}</textarea></label>
      <div class="dim">Bỏ phiên âm cũng được; tiếng Trung sẽ tự điền pinyin khi có mạng.</div>
      <div id="hwwCheck" class="dim"></div>
      <div class="row"><button class="btn primary" id="hwwSave">💾 Lưu</button><button class="btn" id="hwwSaveGo">▶ Lưu và luyện</button><button class="btn" id="hwwEx">Chèn ví dụ</button></div>
    </div>
    <div class="qcard">
      <b>Nhờ AI soạn danh sách</b>
      <div class="dim">Chép prompt, gửi cho ChatGPT / Claude, rồi dán kết quả vào ô ở trên. Sửa mẫu prompt ở ⚙ Cài đặt → Prompt tổng.</div>
      <div class="hww-filters">
        <label class="dim">Chủ đề (không bắt buộc)<input id="hwwTopic" type="text" placeholder="Ví dụ: đồ ăn"></label>
        <label class="dim">Số từ<input id="hwwN" type="number" min="1" max="60" value="15"></label>
      </div>
      <div class="row"><button class="btn" id="hwwCopy">📋 Chép prompt</button></div>
      <textarea id="hwwPrompt" rows="8" readonly hidden></textarea>
    </div>`;
  const ta = $('#hwwText', host);
  const check = () => {
    S.draft = ta.value;
    const p = parseWords(ta.value, lang);
    $('#hwwCheck', host).innerHTML = (p.entries.length ? `<span class="ok">✓ ${p.entries.length} từ hợp lệ</span>` : '<span>Chưa có từ nào.</span>') +
      p.errors.slice(0, 6).map(e => `<div class="bad">dòng ${e.line}: ${esc(e.msg)}</div>`).join('');
  };
  ta.addEventListener('input', check); check();
  bindLevel();
  $('#hwwBack', host).onclick = () => go('list');
  $('#hwwEx', host).onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = EXAMPLE[lang] || EXAMPLE.zh; check(); } };
  let busy = false;
  const save = async () => {
    if (busy) return null;
    const p = parseWords(ta.value, lang);
    if (!p.entries.length) { toast('Chưa có từ hợp lệ nào để lưu'); return null; }
    if (p.errors.length && !confirm(`${p.errors.length} dòng bị lỗi sẽ bị bỏ qua. Vẫn lưu ${p.entries.length} từ?`)) return null;
    const level = readLevel(), chapter = readChapter();
    busy = true;
    await fillPinyin(p.entries, lang);
    busy = false;
    const r = saveWords(p.entries, lang, level, chapter);
    o.newLevel = level; o.newChapter = chapter; o.level = level; o.chapter = chapter; S.draft = ''; S.shown = PAGE; saveOpt();
    toast(r.updated ? `Đã thêm ${r.added} từ, cập nhật ${r.updated} từ` : `Đã thêm ${r.added} từ`);
    return r;
  };
  $('#hwwSave', host).onclick = async () => { if (await save()) go('list'); };
  $('#hwwSaveGo', host).onclick = async () => { const r = await save(); if (r) start('practice', r.ids); };
  $('#hwwCopy', host).onclick = async () => {
    const text = promptFor('newwords', { lang, level: readLevel() || 'sơ cấp', topic: $('#hwwTopic', host).value.trim() || 'tự chọn theo trình độ', n: Math.max(1, Math.min(60, +$('#hwwN', host).value || 15)) });
    const out = $('#hwwPrompt', host);
    out.value = text;
    try { await navigator.clipboard.writeText(text); toast('Đã chép prompt ✓'); }
    catch { out.hidden = false; out.select(); toast('Đã chọn sẵn prompt: nhấn Ctrl+C để chép'); }
  };
}

// ---------- sửa một từ ----------
function drawEdit() {
  const w = store.get(COL, S.editId);
  if (!w || w.deleted) return go('list');
  const lang = w.lang || 'zh';
  host.innerHTML = `<div class="qcard">
    <label class="dim">Chữ cần viết<input id="hwwWord" type="text" lang="${langInfo(lang).bcp}" value="${esc(w.word)}"></label>
    <label class="dim">Phiên âm<input id="hwwPr" type="text" value="${esc(w.pron || '')}"></label>
    <label class="dim">Nghĩa<input id="hwwMean" type="text" value="${esc(w.meaning || '')}"></label>
    <div class="hww-filters">${levelField(lang, w.level || '')}${chapterField(lang, w.chapter || '')}</div>
    <div class="row"><button class="btn primary" id="hwwSave">💾 Lưu</button><button class="btn" id="hwwBack">Hủy</button></div>
  </div>`;
  bindLevel();
  $('#hwwBack', host).onclick = () => go('list');
  $('#hwwSave', host).onclick = () => {
    const word = zhText($('#hwwWord', host).value.trim(), lang), meaning = $('#hwwMean', host).value.trim();
    if (!word || !meaning) { toast('Cần có chữ và nghĩa'); return; }
    const err = wordError(word, lang);
    if (err) { toast(err); return; }
    const changed = word !== w.word; // đổi chữ thì điểm cũ không còn đúng
    store.put(COL, S.editId, { word, pron: $('#hwwPr', host).value.trim(), meaning, level: readLevel(), chapter: readChapter(), ...(changed ? { best: null, last: null, tries: 0 } : {}) });
    toast('Đã lưu ✓'); go('list');
  };
}

// ---------- làm bài ----------
function start(mode, ids) {
  const q = ids.filter(id => { const w = store.get(COL, id); return w && !w.deleted; });
  if (!q.length) { toast('Không có từ nào để viết'); return go('list'); }
  if (S.opt.shuffle) for (let i = q.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [q[i], q[j]] = [q[j], q[i]]; }
  S.run = { kind: mode, q, i: 0, res: {} };
  go(mode);
}
const wordAt = () => { const r = S.run, w = store.get(COL, r.q[r.i]); return w && !w.deleted ? { id: r.q[r.i], ...w } : null; };
function step(d) {
  const r = S.run; if (!r) return;
  r.i = Math.max(0, r.i + d);
  if (r.i >= r.q.length) return go('result');
  draw();
}
function onResult(id, res) {
  const r = S.run; if (!r || res.revealed) { if (r && res.revealed) r.res[id] = res; return; }
  r.res[id] = res; record(id, res.score);
}

function drawRun() {
  const r = S.run, test = r.kind === 'test';
  if (r.i >= r.q.length) return go('result');
  const w = wordAt();
  if (!w) { r.q.splice(r.i, 1); return r.q.length ? drawRun() : go('list'); }
  const lang = S.lang, hint = S.opt.hint, last = r.i + 1 >= r.q.length;
  host.innerHTML = `<div class="row"><button class="btn" id="hwwQuit">← Thoát</button><span class="dim">${test ? 'Đang kiểm tra' : 'Luyện / ôn viết'} · ${labelSpan(w.level, 'Không cấp')} · ${labelSpan(w.chapter, 'Không chương')}</span></div>
    <div class="qprog"><span>Từ ${r.i + 1}/${r.q.length}</span><progress max="${r.q.length}" value="${r.i}"></progress></div>
    ${test ? '' : '<div class="seg" id="hwwHint"><button data-h="trace">🖊 Tập nét (gợi ý từng nét)</button><button data-h="model">👁 Tô theo mẫu</button><button data-h="memo">🧠 Tự nhớ</button></div>'}
    <div class="qcard" id="hwwBox"></div>
    ${test ? '' : `<div class="row c"><button class="btn" id="hwwPrev" ${r.i ? '' : 'disabled'}>◀ Từ trước</button><button class="btn" id="hwwSay">🔊 Nghe đọc</button><button class="btn" id="hwwSkip">${last ? 'Xem kết quả ▶' : 'Từ sau ▶'}</button></div>`}`;
  $('#hwwQuit', host).onclick = () => {
    if (test && Object.keys(r.res).length && !confirm('Thoát bài kiểm tra đang làm dở?')) return;
    S.run = null; go('list');
  };
  const box = $('#hwwBox', host);
  const pron = w.pron ? w.pron : '';
  if (test) {
    mountSubmitWriter(box, {
      answer: w.word, lang, meaning: w.meaning, pron: S.opt.pron ? pron : '', showPron: true, showModel: false, exam: true,
      onGraded: res => onResult(w.id, res), onNext: () => step(1),
    });
    return;
  }
  $$('#hwwHint button', host).forEach(b => { b.classList.toggle('on', b.dataset.h === hint); b.onclick = () => { S.opt.hint = b.dataset.h; saveOpt(); draw(); }; });
  $('#hwwPrev', host).onclick = () => step(-1);
  $('#hwwSay', host).onclick = () => say(w.word, langInfo(lang).bcp);
  $('#hwwSkip', host).onclick = () => step(1);
  if (hint === 'trace') traceWord(box, w);
  else writeWord(box, w, hint === 'model');
}

function writeWord(box, w, showModel) {
  const r = S.run;
  mountSubmitWriter(box, {
    answer: w.word, lang: S.lang, meaning: w.meaning, pron: w.pron || '', showPron: true, showModel,
    nextLabel: r.i + 1 >= r.q.length ? 'Xem kết quả ▶' : 'Từ sau ▶',
    onGraded: res => onResult(w.id, res), onNext: () => step(1),
  });
}

// Tập nét: mỗi chữ một ô đặt cạnh nhau, ô nào cũng gợi ý nét mờ và báo sai nét / sai thứ tự
async function traceWord(box, w) {
  const lang = S.lang, bcp = langInfo(lang).bcp, chars = piecesOf(w.word, lang), mine = token;
  box.innerHTML = '<div class="dim">Đang tải dữ liệu nét…</div>';
  const data = await Promise.all(chars.map(ch => loadStrokesFor(ch, lang).catch(() => null)));
  if (mine !== token || !box.isConnected) return; // đã chuyển sang từ khác trong lúc tải
  if (data.some(d => !d)) { // Hangul, hoặc không tải được: tô theo mẫu mờ
    writeWord(box, w, true);
    box.insertAdjacentHTML('afterbegin', '<div class="dim">Từ này chưa có dữ liệu nét, chuyển sang kiểu tô theo mẫu (không kiểm tra thứ tự nét).</div>');
    return;
  }
  box.innerHTML = `<div class="wmeaning">${esc(w.meaning)}</div>
    <div class="dim wpron"><span class="hww-u">${esc(w.pron || '')}</span></div>
    <div class="wans" lang="${bcp}">${esc(w.word)}</div>
    <div class="wrow"></div>
    <div class="dim wnote">Viết đúng thứ tự và hướng từng nét; nét mờ là gợi ý.</div>
    <div class="row c" id="hwwTBtns"><button class="btn" id="hwwTHint">💡 Gợi ý nét</button><button class="btn" id="hwwTWatch">🎬 Xem nét</button><button class="btn" id="hwwTRedo">↺ Làm lại</button></div>
    <div id="hwwTRes"></div>`;
  const row = $('.wrow', box), n = chars.length, size = boxSize(row.clientWidth, n, 220);
  const done = new Array(n).fill(null);
  let active = 0, watching = false;
  const note = t => { const el = $('.wnote', box); if (el) el.textContent = t || 'Viết đúng thứ tự và hướng từng nét; nét mờ là gợi ý.'; };
  const watch = on => {
    watching = on;
    coaches.forEach(c => (on ? c.animate(true) : c.stopAnim()));
    const b = $('#hwwTWatch', box); if (b) b.textContent = on ? '⏹ Dừng xem' : '🎬 Xem nét';
  };
  chars.forEach((ch, i) => {
    const cell = document.createElement('div');
    cell.className = 'wbox'; cell.style.width = size + 'px'; cell.style.height = size + 'px';
    row.appendChild(cell);
    cell.addEventListener('pointerdown', () => { active = i; if (watching) watch(false); }, true);
    coaches.push(createCoach(cell, {
      strokes: data[i], size, mode: 'trace', level: hwLevel(),
      onMessage: note,
      onDone: ({ mistakes, strokes }) => {
        done[i] = { score: Math.round(100 * strokes / (strokes + mistakes)), mistakes, strokes };
        cell.classList.add('hww-done');
        if (done.every(Boolean)) finish();
      },
    }));
  });
  $('#hwwTHint', box).onclick = () => { if (watching) watch(false); const i = done[active] ? done.findIndex(d => !d) : active; if (i >= 0) coaches[i].hint(); };
  $('#hwwTWatch', box).onclick = () => watch(!watching);
  $('#hwwTRedo', box).onclick = draw;
  function finish() {
    const score = Math.round(done.reduce((s, d) => s + d.score, 0) / n);
    chars.forEach((ch, i) => {
      const id = `${lang}:${ch}`, old = store.get('hw', id) || {};
      store.put('hw', id, { lang, char: ch, best: Math.max(old.best ?? 0, done[i].score), last: done[i].score, tries: (old.tries || 0) + 1, at: Date.now(), deleted: false });
      tracker.hw();
    });
    onResult(w.id, { score });
    const mist = done.reduce((s, d) => s + d.mistakes, 0), total = done.reduce((s, d) => s + d.strokes, 0), last = S.run.i + 1 >= S.run.q.length;
    note(`${total} nét, sai ${mist} lần`);
    $('#hwwTBtns', box).innerHTML = `<button class="btn" id="hwwTRedo">↺ Viết lại</button><button class="btn primary" id="hwwTNext">${last ? 'Xem kết quả ▶' : 'Từ sau ▶'}</button>`;
    $('#hwwTRes', box).innerHTML = `<div class="score hww-score ${scoreCls(score)}">${score}%${score >= 95 ? ' 🎉' : ''}</div>`;
    $('#hwwTRedo', box).onclick = draw;
    $('#hwwTNext', box).onclick = () => step(1);
  }
}

function drawResult() {
  const r = S.run, test = r.kind === 'test', lang = S.lang, bcp = langInfo(lang).bcp;
  const rows = r.q.map(id => ({ id, w: store.get(COL, id), res: r.res[id] })).filter(x => x.w);
  const graded = test ? rows : rows.filter(x => x.res && !x.res.revealed);
  const scores = graded.map(x => x.res?.score ?? 0);
  const avg = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : null;
  const passed = scores.filter(v => v >= PASS).length;
  const weak = rows.filter(x => (x.res ? x.res.revealed || x.res.score < PASS : test)).map(x => x.id);
  const status = x => {
    if (!x.res) return '<span class="dim">chưa viết</span>';
    if (x.res.skipped) return '<span class="bad">bỏ qua</span>';
    if (x.res.revealed) return '<span class="dim">đã xem đáp án</span>';
    return `<span class="${scoreCls(x.res.score)}">${x.res.score}%</span>`;
  };
  host.innerHTML = `<div class="qcard">
    <b>${test ? 'Kết quả kiểm tra' : 'Kết quả buổi luyện'}</b>
    ${avg == null ? '<div class="dim">Bạn chưa chấm từ nào trong lượt này.</div>' : `<div class="score hww-score ${scoreCls(avg)}">${avg}% trung bình</div><div class="dim">${passed}/${graded.length} từ đạt (từ ${PASS}% trở lên)</div>`}
    ${rows.map(x => `<div class="hww-row"><b class="hww-u hww-word" lang="${bcp}">${esc(x.w.word)}</b>
        <span class="hww-info"><span class="hww-u dim">${esc(x.w.pron || '')}</span><span class="hww-u">${esc(x.w.meaning || '')}</span></span>
        <span class="hww-stat">${status(x)}</span></div>`).join('')}
    <div class="row">
      <button class="btn primary" id="hwwAgain">${test ? '↻ Kiểm tra lại' : '↻ Luyện lại'}</button>
      ${weak.length ? `<button class="btn" id="hwwWeakAgain">🔁 Luyện ${weak.length} từ chưa đạt</button>` : ''}
      ${test ? '' : '<button class="btn" id="hwwToTest">📋 Kiểm tra các từ này</button>'}
      <button class="btn" id="hwwList">Danh sách</button>
    </div></div>`;
  $('#hwwAgain', host).onclick = () => start(r.kind, r.q);
  $('#hwwWeakAgain', host)?.addEventListener('click', () => start('practice', weak));
  $('#hwwToTest', host)?.addEventListener('click', () => start('test', r.q));
  $('#hwwList', host).onclick = () => { S.run = null; go('list'); };
}

// dữ liệu đến từ máy khác (hoặc khôi phục từ Thùng rác) khi đang xem danh sách thì vẽ lại
bus.on('store', c => { if (c === COL && S.mode === 'list' && host?.isConnected && S.lang === getLang()) drawList(); });
