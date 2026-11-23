// Mục “Từ vựng” trong Ôn tập: kho từ vựng đầy đủ (nhập nhiều từ bằng cú pháp, sửa, nhóm, xuất ra) và bài tập từ vựng
// (trắc nghiệm 4 ý hoặc gõ từ, chọn khi làm bài). Dùng chung bộ “wwords” với Từ vựng của Thế giới nên từ tra khi đọc bài cũng nằm trong kho này.
// Cú pháp nhập (mỗi từ một dòng, các cột cách nhau bằng dấu | hoặc Tab):
//   từ | phiên âm | nghĩa | câu ví dụ | ghi chú          (chỉ cần “từ | nghĩa” cũng được, ba cột đầu là phổ biến nhất)
//   # Tên nhóm   hoặc   @nhóm: Tên nhóm                  (các từ phía dưới thuộc nhóm đó)
//   Dòng “T: từ | phiên âm | nghĩa” của bài tập cũ cũng nhập được.
import { $, $$, esc, toast, pickFile, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as cards from './cards.js';
import * as tracker from './tracker.js';
import { say } from './tts.js';
import { zhText } from './prefs.js';
import { vocabBankPrompt, VOCAB_BANK_SYNTAX as SYN } from './exprompts.js';

const wordsOf = lang => store.list('wwords').filter(w => (w.lang || 'zh') === lang && !w.deleted);
let root = null, view = 'bank', run = null, editId = '';
const F = { q: '', group: '', sort: 'new', n: 60 };
const SETUP_KEY = 'vocab:setup';
const T = (() => { const d = { group: '', count: 20, form: 'mix', dir: 'mix', speak: false, hint: true, accept: true }; try { return { ...d, ...JSON.parse(localStorage.getItem(SETUP_KEY) || '{}') }; } catch { return d; } })();
const saveSetup = () => { try { localStorage.setItem(SETUP_KEY, JSON.stringify(T)); } catch { /* bỏ qua */ } };
const shuf = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

// ---------- chuẩn hóa để so đáp án ----------
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const normPron = s => norm(s).replace(/\d/g, ''); // pinyin gõ không dấu hoặc kèm số thanh (ni3hao3) đều được
const altsOf = m => [...new Set([String(m || ''), ...String(m || '').split(/[;；,，/／]|\s{2,}/)].map(norm).filter(Boolean))];
function lev(a, b) { // khoảng cách sửa chữ, dùng để châm chước lỗi gõ nhầm một chữ ở từ dài
  const m = a.length, n = b.length; if (!m || !n) return Math.max(m, n); let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
function judge(q, given) { // q: { w, dir } → { ok, near }
  const g = norm(given); if (!g) return { ok: false };
  if (q.dir === 'm2w') {
    const lang = q.w.lang || 'zh', z = s => norm(lang === 'zh' ? zhText(s, 'zh') : s);
    if (g === norm(q.w.word) || z(given) === z(q.w.word)) return { ok: true };
    if (T.accept && q.w.pron && normPron(given) === normPron(q.w.pron) && normPron(given)) return { ok: true, near: 'phiên âm' };
    return { ok: false };
  }
  const alts = altsOf(q.w.meaning); if (alts.includes(g)) return { ok: true };
  if (g.length >= 5 && alts.some(a => a.length >= 5 && lev(a, g) <= 1)) return { ok: true, near: 'gần đúng' };
  return { ok: false };
}

// ---------- cú pháp nhập / xuất ----------
const splitCols = line => { // tách theo | (không tách \|) hoặc Tab
  if (line.includes('\t') && !/(^|[^\\])\|/.test(line)) return line.split('\t').map(x => x.trim());
  const out = []; let cur = ''; for (let i = 0; i < line.length; i++) { const c = line[i]; if (c === '\\' && line[i + 1] === '|') { cur += '|'; i++; } else if (c === '|') { out.push(cur.trim()); cur = ''; } else cur += c; } out.push(cur.trim()); return out;
};
export function parseVocab(text, defGroup = '') {
  const words = [], errors = []; let group = defGroup.trim();
  String(text || '').replace(/\r/g, '').split('\n').forEach((raw, i) => {
    let line = raw.trim(); if (!line || /^(\/\/|--)/.test(line)) return;
    const h = line.match(/^#{1,3}\s+(.+)$/) || line.match(/^@\s*(?:nh[oó]m|group)\s*[:：]\s*(.*)$/i); if (h) { group = h[1].trim(); return; }
    line = line.replace(/^T\s*[:：]\s*/i, '');
    let c = splitCols(line);
    if (c.length === 1) { const m = line.match(/^(.+?)\s+[=＝]\s+(.+)$/); if (m) c = [m[1].trim(), m[2].trim()]; }
    if (!c[0]) return;
    if (c.length === 1) { errors.push({ line: i + 1, msg: `dòng ${i + 1}: “${c[0].slice(0, 24)}” chưa có nghĩa` }); words.push({ word: c[0], pron: '', meaning: '', sentence: '', note: '', group }); return; }
    const w = c.length === 2 ? { word: c[0], pron: '', meaning: c[1], sentence: '', note: '' } : { word: c[0], pron: c[1], meaning: c[2], sentence: c[3] || '', note: c[4] || '' };
    words.push({ ...w, group });
  });
  return { words, errors };
}
const e1 = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
export function exportVocab(list) {
  const by = new Map(); list.forEach(w => { const g = w.group || ''; if (!by.has(g)) by.set(g, []); by.get(g).push(w); });
  return [...by.entries()].map(([g, ws]) => (g ? `# ${g}\n` : '') + ws.map(w => [w.word, w.pron || '', w.meaning || '', w.sentence || '', w.note || ''].map(e1).join(' | ').replace(/( \|\s*)+$/, '')).join('\n')).join('\n\n');
}
const SAMPLE = {
  zh: SYN,
  en: `# Daily life
hello | /həˈləʊ/ | xin chào | Hello, how are you?
thank you | | cảm ơn
goodbye | /ˌɡʊdˈbaɪ/ | tạm biệt

# Family
mother | /ˈmʌðər/ | mẹ
brother | /ˈbrʌðər/ | anh / em trai`,
  vi: `# Chào hỏi
xin chào | | hello
cảm ơn | | thank you`,
};
const sampleFor = lang => SAMPLE[lang] || SAMPLE.en;
// ---------- lưu / cập nhật từ ----------
// mode: 'fill' = chỉ bổ sung ô còn trống, 'over' = ghi đè bằng ô có dữ liệu, 'skip' = bỏ qua từ đã có
function putWord(lang, d, mode = 'fill') {
  const word = (d.word || '').trim(); if (!word) return null;
  const id = lang + '_' + word, old = store.get('wwords', id);
  if (old && !old.deleted) {
    if (mode === 'skip') return 'skip';
    const patch = {}; for (const k of ['pron', 'meaning', 'sentence', 'note', 'group']) { const v = (d[k] || '').trim(); if (v && (mode === 'over' || !old[k])) patch[k] = v; }
    if (Object.keys(patch).length) store.put('wwords', id, patch); return Object.keys(patch).length ? 'upd' : 'same';
  }
  store.put('wwords', id, { lang, word, pron: (d.pron || '').trim(), meaning: (d.meaning || '').trim(), sentence: (d.sentence || '').trim(), note: (d.note || '').trim(), group: (d.group || '').trim(), article: '', title: '', created: Date.now(), deleted: false });
  return 'new';
}
async function autoPinyin(words) { // thêm pinyin cho từ chữ Hán chưa có phiên âm (cần mạng để tải thư viện, không có mạng thì bỏ qua)
  const need = words.filter(w => !w.pron && /\p{Script=Han}/u.test(w.word)); if (!need.length) return 0;
  const { pinyin } = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm'); let n = 0;
  for (const w of need) { const chars = [...w.word]; let arr = pinyin(w.word, { type: 'array', toneType: 'symbol' }); if (arr.length !== chars.length) arr = chars.map(c => pinyin(c, { toneType: 'symbol' })); const syl = []; chars.forEach((c, i) => { if (/[\p{L}\p{N}]/u.test(c)) syl.push(arr[i]); }); if (syl.length) { w.pron = syl.join(' '); n++; } }
  return n;
}
const toCard = w => { if (!w || cards.allCards(w.lang || 'zh').some(c => c.front === w.word)) return false; cards.addManual({ lang: w.lang || 'zh', front: w.word, back: [w.pron, w.meaning, w.sentence].filter(Boolean), title: 'Từ vựng', type: 'word' }); return true; };
const groupsOf = ws => [...new Set(ws.map(w => w.group || '').filter(Boolean))].sort((a, b) => a.localeCompare(b));
const weak = w => (w.bad || 0) > 0 && (w.bad || 0) * 2 >= (w.ok || 0);

// ---------- vào / ra ----------
export function render(el) {
  root = el;
  if (view === 'run' && run && root.querySelector('.vq')) return;
  if (view === 'result' && run?.done) return drawResult();
  if (view === 'run') view = 'test';
  ({ bank: drawBank, import: drawImport, test: drawSetup }[view] || drawBank)();
}
export const reset = () => { view = 'bank'; run = null; editId = ''; F.q = ''; F.group = ''; F.n = 60; };
const nav = cur => `<div class="seg vc-nav"><button data-v="bank" class="${cur === 'bank' ? 'on' : ''}">📚 Kho từ vựng</button><button data-v="test" class="${cur === 'test' ? 'on' : ''}">✍️ Làm bài tập</button><button data-v="import" class="${cur === 'import' ? 'on' : ''}">📥 Nhập từ</button></div>`;
function bindNav() { $$('.vc-nav button', root).forEach(b => { b.onclick = () => { view = b.dataset.v; editId = ''; render(root); }; }); }

// ---------- kho từ vựng ----------
function drawBank() {
  const lang = getLang(), bcp = langInfo(lang).bcp, all = wordsOf(lang), groups = groupsOf(all);
  if (F.group && F.group !== '_none' && !groups.includes(F.group)) F.group = '';
  const q = F.q.trim().toLowerCase();
  let shown = all.filter(w => (!F.group || (F.group === '_none' ? !w.group : w.group === F.group)) && (!q || [w.word, w.pron, w.meaning, w.sentence].some(x => (x || '').toLowerCase().includes(q))));
  shown.sort(F.sort === 'az' ? (a, b) => a.word.localeCompare(b.word) : F.sort === 'weak' ? (a, b) => (b.bad || 0) - (a.bad || 0) || (b.created || 0) - (a.created || 0) : (a, b) => (b.created || 0) - (a.created || 0));
  const list = shown.slice(0, F.n), nWeak = all.filter(weak).length, ed = editId && store.get('wwords', editId), adding = editId === '_new';
  const mark = (s, w) => esc(s).split(esc(w)).join(`<mark>${esc(w)}</mark>`);
  root.innerHTML = `${nav('bank')}
    <div class="qcard"><div class="dim">${all.length} từ ${esc(langInfo().name)} · ${groups.length} nhóm${nWeak ? ` · <span class="bad">${nWeak} từ hay sai</span>` : ''}</div>
      <div class="row"><button class="btn primary" id="vcAdd">＋ Thêm từ</button><button class="btn" id="vcCards" ${all.length ? '' : 'disabled'} title="Thêm các từ chưa có vào Sổ thẻ để ôn theo lịch lặp lại">📒 Thêm tất cả vào sổ thẻ</button><button class="btn" id="vcCopy" ${shown.length ? '' : 'disabled'} title="Chép các từ đang hiển thị theo cú pháp nhập, để lưu hoặc dán sang nơi khác">📋 Chép cú pháp</button></div>
      ${adding || ed ? formHtml(ed || {}, groups, bcp) : ''}</div>
    <div class="row vc-filter"><input id="vcSearch" type="search" placeholder="🔍 Tìm từ, phiên âm, nghĩa…" value="${esc(F.q)}" style="flex:1;min-width:150px">
      <select id="vcGroup"><option value="">Tất cả nhóm</option>${groups.map(g => `<option value="${esc(g)}" ${F.group === g ? 'selected' : ''}>${esc(g)} (${all.filter(w => w.group === g).length})</option>`).join('')}${all.some(w => !w.group) && groups.length ? `<option value="_none" ${F.group === '_none' ? 'selected' : ''}>Chưa phân nhóm</option>` : ''}</select>
      <select id="vcSort"><option value="new" ${F.sort === 'new' ? 'selected' : ''}>Mới nhất</option><option value="az" ${F.sort === 'az' ? 'selected' : ''}>A → Z</option><option value="weak" ${F.sort === 'weak' ? 'selected' : ''}>Hay sai nhất</option></select></div>
    <div class="cards wvl">${list.length ? list.map(w => `<div class="card wvrow" style="cursor:default" data-id="${esc(w.id)}"><div class="ci"><span><b class="wvw" lang="${bcp}">${esc(w.word)}</b> <span class="wvp dim">${esc(w.pron || '')}</span></span>
        <span class="wvm">${esc(w.meaning || '—')}</span>${w.sentence ? `<span class="wvs" lang="${bcp}">${mark(w.sentence, w.word)}</span>` : ''}${w.note ? `<span class="dim">📝 ${esc(w.note)}</span>` : ''}
        <span class="dim">${w.group ? `<span class="vc-chip">${esc(w.group)}</span> ` : ''}${w.title ? 'Từ bài: ' + esc(w.title) + ' · ' : ''}${(w.ok || w.bad) ? `<span class="ok">✓ ${w.ok || 0}</span> <span class="${weak(w) ? 'bad' : 'dim'}">✗ ${w.bad || 0}</span>` : 'chưa làm bài'}</span></div>
        <span class="lbtns"><button class="btn" data-a="say" title="Nghe">🔊</button><button class="btn" data-a="edit" title="Sửa">✏️</button><button class="btn" data-a="card" title="Thêm vào sổ thẻ">📒</button><button class="btn" data-a="del" title="Xóa">🗑</button></span></div>`).join('')
      : `<div class="empty">${all.length ? 'Không có từ nào khớp.' : 'Kho từ vựng đang trống. Bấm “＋ Thêm từ”, hoặc “📥 Nhập từ” để dán nhiều từ cùng lúc bằng cú pháp (có prompt nhờ AI).'}</div>`}</div>
    ${shown.length > list.length ? `<div class="row c"><button class="btn" id="vcMore">▼ Hiện thêm ${Math.min(60, shown.length - list.length)} từ (còn ${shown.length - list.length})</button></div>` : ''}`;
  bindNav();
  $('#vcAdd').onclick = () => { editId = '_new'; drawBank(); $('#vfWord')?.focus(); };
  $('#vcCards').onclick = () => { const n = all.filter(toCard).length; toast(n ? `Đã thêm ${n} từ vào sổ thẻ 📒` : 'Các từ này đã có trong sổ thẻ'); };
  $('#vcCopy').onclick = async () => { const t = exportVocab(shown); try { await navigator.clipboard.writeText(t); toast(`Đã chép ${shown.length} từ theo cú pháp nhập ✓`); } catch { const ta = document.createElement('textarea'); ta.value = t; document.body.append(ta); ta.select(); document.execCommand?.('copy'); ta.remove(); toast('Đã chép ✓'); } };
  $('#vcSearch').oninput = e => { F.q = e.target.value; F.n = 60; const p = e.target.selectionStart; drawBank(); const s = $('#vcSearch'); s.focus(); s.setSelectionRange(p, p); };
  $('#vcGroup').onchange = e => { F.group = e.target.value; F.n = 60; drawBank(); };
  $('#vcSort').onchange = e => { F.sort = e.target.value; drawBank(); };
  $('#vcMore')?.addEventListener('click', () => { F.n += 60; const y = scrollY; drawBank(); scrollTo(0, y); });
  $('.wvl', root).onclick = e => {
    const b = e.target.closest('[data-a]'); if (!b) return; const id = b.closest('[data-id]').dataset.id, w = store.get('wwords', id); if (!w) return;
    if (b.dataset.a === 'say') say(w.word, bcp);
    else if (b.dataset.a === 'edit') { editId = id; drawBank(); scrollTo(0, 0); $('#vfWord')?.focus(); }
    else if (b.dataset.a === 'card') toast(toCard(w) ? 'Đã thêm vào sổ thẻ 📒' : 'Từ này đã có trong sổ thẻ');
    else if (b.dataset.a === 'del') { if (confirm(`Xóa từ “${w.word}”? (vào Thùng rác, giữ 30 ngày)`)) { store.del('wwords', id); drawBank(); } }
  };
  if (adding || ed) wireForm(lang);
}
function formHtml(w, groups, bcp) {
  return `<div class="vc-form"><b>${w.id ? '✏️ Sửa từ' : '＋ Thêm một từ'}</b>
    <div class="row"><label class="dim grow">Từ<input id="vfWord" type="text" lang="${bcp}" value="${esc(w.word || '')}" ${w.id ? 'readonly title="Muốn đổi chữ của từ, hãy xóa rồi thêm lại"' : ''}></label><label class="dim grow">Phiên âm<input id="vfPron" type="text" value="${esc(w.pron || '')}"></label></div>
    <label class="dim">Nghĩa<input id="vfMean" type="text" value="${esc(w.meaning || '')}" placeholder="nhiều nghĩa cách nhau bằng dấu ;"></label>
    <label class="dim">Câu ví dụ (không bắt buộc)<input id="vfSent" type="text" lang="${bcp}" value="${esc(w.sentence || '')}"></label>
    <div class="row"><label class="dim grow">Ghi chú (không bắt buộc)<input id="vfNote" type="text" value="${esc(w.note || '')}"></label><label class="dim grow">Nhóm<input id="vfGroup" type="text" list="vfGroups" value="${esc(w.group || '')}" placeholder="Bài 1, Chủ đề…"></label><datalist id="vfGroups">${groups.map(g => `<option value="${esc(g)}">`).join('')}</datalist></div>
    <div class="row"><button class="btn primary" id="vfSave">${w.id ? 'Lưu thay đổi' : 'Lưu từ'}</button><button class="btn" id="vfCancel">Hủy</button></div></div>`;
}
function wireForm(lang) {
  $('#vfCancel').onclick = () => { editId = ''; drawBank(); };
  $('#vfSave').onclick = () => {
    const word = $('#vfWord').value.trim(); if (!word) { toast('Hãy nhập từ'); return; }
    const d = { word, pron: $('#vfPron').value, meaning: $('#vfMean').value, sentence: $('#vfSent').value, note: $('#vfNote').value, group: $('#vfGroup').value };
    if (editId && editId !== '_new') { store.put('wwords', editId, { pron: d.pron.trim(), meaning: d.meaning.trim(), sentence: d.sentence.trim(), note: d.note.trim(), group: d.group.trim() }); toast('Đã lưu thay đổi ✓'); }
    else { const r = putWord(lang, d, 'fill'); toast(r === 'new' ? 'Đã thêm từ ✓' : 'Từ này đã có (đã bổ sung phần còn thiếu nếu có)'); }
    editId = ''; drawBank();
  };
}

// ---------- nhập nhiều từ ----------
function drawImport() {
  const lang = getLang(), groups = groupsOf(wordsOf(lang));
  root.innerHTML = `${nav('import')}
    <div class="qcard">
      <details class="help"><summary>📖 Cú pháp nhập từ</summary><pre class="mono nw-syn">${esc(SYN)}</pre>
        <p>Mỗi từ một dòng, các cột: <b>từ | phiên âm | nghĩa | câu ví dụ | ghi chú</b>, cách nhau bằng dấu | hoặc Tab (dán thẳng từ Excel, Google Sheets, Quizlet đều được). Chỉ cần <b>từ | nghĩa</b> cũng được: khi đó phiên âm để trống. Dòng bắt đầu bằng “# ” (hoặc “@nhóm:”) là tên nhóm cho các từ bên dưới. Nghĩa có nhiều cách hiểu thì cách nhau bằng dấu ; để bài tập gõ từ nhận cả hai. Dòng “T: …” của bài tập cũ cũng nhập được.</p></details>
      <details class="help"><summary>🤖 Nhờ AI lập danh sách từ (prompt)</summary>
        <div class="row"><label class="dim grow">Chủ đề<input id="vpTopic" type="text" placeholder="đồ ăn, du lịch, công việc… (để trống: AI tự chọn)"></label><label class="dim">Số từ <input id="vpN" type="number" min="5" max="100" value="20" style="width:76px"></label><label class="dim">Trình độ <input id="vpLv" type="text" placeholder="HSK2, N4, A2…" style="width:110px"></label></div>
        <textarea id="vpOut" class="mono" rows="9" readonly spellcheck="false"></textarea>
        <div class="row"><button class="btn primary" id="vpCopy">📋 Chép prompt</button><button class="btn" id="vpPaste">📥 Dán kết quả của AI</button></div>
        <div class="dim">Chép prompt → dán vào ChatGPT hoặc Claude → chép kết quả → quay lại bấm “Dán kết quả của AI”.</div></details>
      <label class="dim">Nội dung nhập<textarea id="viText" class="mono" rows="12" spellcheck="false" lang="${langInfo(lang).bcp}" placeholder="Dán danh sách từ theo cú pháp ở trên vào đây…"></textarea></label>
      <div class="row"><label class="dim grow">Nhóm mặc định (cho các từ chưa có dòng nhóm)<input id="viGroup" type="text" list="viGroups" placeholder="(không bắt buộc)"></label><datalist id="viGroups">${groups.map(g => `<option value="${esc(g)}">`).join('')}</datalist></div>
      <div class="dim">Với từ đã có trong kho:</div>
      <div class="seg" id="viMode"><button data-m="fill" class="on">Bổ sung ô còn trống</button><button data-m="over">Ghi đè bằng dữ liệu mới</button><button data-m="skip">Bỏ qua</button></div>
      ${lang === 'zh' ? '<label class="dim"><input type="checkbox" id="viPin" checked> Tự thêm pinyin cho từ chữ Hán chưa có phiên âm (cần mạng)</label>' : ''}
      <div id="viCheck" class="dim"></div>
      <div class="row"><button class="btn primary" id="viGo">📥 Nhập vào kho</button><button class="btn" id="viFile">📂 Mở file .txt / .csv</button><button class="btn" id="viEx">Chèn ví dụ</button></div>
    </div>`;
  bindNav();
  const ta = $('#viText'); let mode = 'fill';
  const check = () => {
    const p = parseVocab(ta.value, $('#viGroup').value), ws = p.words, g = new Set(ws.map(w => w.group).filter(Boolean)), have = new Set(wordsOf(lang).map(w => w.word));
    $('#viCheck').innerHTML = ws.length ? `<span class="ok">✓ ${ws.length} từ</span> · ${ws.filter(w => w.pron).length} có phiên âm · ${ws.filter(w => w.sentence).length} có ví dụ${g.size ? ` · ${g.size} nhóm` : ''} · ${ws.filter(w => have.has(w.word)).length} từ đã có trong kho` + (p.errors.length ? `<div class="bad">${p.errors.length} dòng chưa có nghĩa (vẫn nhập, bạn bổ sung sau):</div>` + p.errors.slice(0, 6).map(e => `<div class="bad">${esc(e.msg)}</div>`).join('') : '') : 'Chưa có từ nào.';
  };
  ta.addEventListener('input', check); $('#viGroup').addEventListener('input', check); check();
  $$('#viMode button', root).forEach(b => { b.onclick = () => { mode = b.dataset.m; $$('#viMode button', root).forEach(x => x.classList.toggle('on', x === b)); }; });
  const refreshP = () => { $('#vpOut').value = vocabBankPrompt({ lang, topic: $('#vpTopic').value.trim(), n: Math.max(5, Math.min(100, +$('#vpN').value || 20)), level: $('#vpLv').value.trim() }); }; $('#vpTopic').addEventListener('input', refreshP); $('#vpN').addEventListener('input', refreshP); $('#vpLv').addEventListener('input', refreshP); refreshP();
  $('#vpCopy').onclick = async () => { refreshP(); try { await navigator.clipboard.writeText($('#vpOut').value); toast('Đã chép prompt ✓'); } catch { $('#vpOut').select(); document.execCommand?.('copy'); toast('Đã chọn sẵn prompt: nhấn Ctrl+C để chép'); } };
  $('#vpPaste').onclick = async () => { let t = ''; try { t = (await navigator.clipboard.readText()).trim(); } catch { /* bị chặn */ } if (!t) { toast('Chưa đọc được bộ nhớ tạm: hãy dán (Ctrl+V) kết quả vào ô nội dung'); return; } ta.value = (ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n\n' : '') + t.replace(/^```\w*\n?|\n?```$/g, '').trim(); check(); toast('Đã dán vào ô nội dung ✓'); };
  $('#viEx').onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = sampleFor(lang); check(); } };
  $('#viFile').onclick = () => pickFile('.txt,.csv,text/plain,text/csv').then(async ([f]) => { if (f) { let t = await f.text(); if (/\.csv$/i.test(f.name)) t = t.replace(/^﻿/, '').split(/\r?\n/).map(l => l.replace(/"([^"]*)"/g, (m, s) => s.replace(/,/g, '\u0001')).split(',').map(c => c.replace(/\u0001/g, ',').trim()).join(' | ')).join('\n'); ta.value = t.replace(/^﻿/, ''); check(); } });
  $('#viGo').onclick = async () => {
    const p = parseVocab(ta.value, $('#viGroup').value); if (!p.words.length) { toast('Chưa có từ nào để nhập'); return; }
    const z = s => (lang === 'zh' ? zhText(s, 'zh') : s); p.words.forEach(w => { w.word = z(w.word); w.sentence = z(w.sentence); });
    let pn = 0; if ($('#viPin')?.checked) { try { pn = await autoPinyin(p.words); } catch { toast('Không tải được thư viện pinyin (cần mạng): đã nhập mà chưa thêm pinyin', 3500); } }
    const c = { new: 0, upd: 0, same: 0, skip: 0 }; for (const w of p.words) { const r = putWord(lang, w, mode); if (r) c[r]++; }
    toast(`Đã nhập: ${c.new} từ mới${c.upd ? `, cập nhật ${c.upd}` : ''}${c.skip + c.same ? `, bỏ qua ${c.skip + c.same} từ đã có` : ''}${pn ? ` · thêm pinyin cho ${pn} từ` : ''}`, 4500);
    view = 'bank'; F.group = ''; F.q = ''; F.sort = 'new'; render(root);
  };
}

// ---------- bài tập từ vựng ----------
function drawSetup() {
  const lang = getLang(), all = wordsOf(lang), groups = groupsOf(all), nWeak = all.filter(weak).length, week = Date.now() - 7 * 864e5, nNew = all.filter(w => (w.created || 0) > week).length;
  const withMeaning = all.filter(w => w.meaning).length;
  if (T.group && !['_weak', '_new', '_none'].includes(T.group) && !groups.includes(T.group)) T.group = '';
  const seg = (id, cur, items) => `<div class="seg" id="${id}">${items.map(([v, t]) => `<button data-v="${v}" class="${cur === v ? 'on' : ''}">${t}</button>`).join('')}</div>`;
  root.innerHTML = `${nav('test')}
    <div class="qcard"><b>✍️ Làm bài tập từ vựng</b>
      <div class="dim">${all.length} từ trong kho · ${withMeaning} từ có nghĩa dùng được cho bài tập</div>
      <label class="dim">Lấy từ<select id="vsGroup"><option value="">Tất cả từ (${all.length})</option>${groups.map(g => `<option value="${esc(g)}" ${T.group === g ? 'selected' : ''}>Nhóm: ${esc(g)} (${all.filter(w => w.group === g).length})</option>`).join('')}${nWeak ? `<option value="_weak" ${T.group === '_weak' ? 'selected' : ''}>Từ hay sai (${nWeak})</option>` : ''}${nNew ? `<option value="_new" ${T.group === '_new' ? 'selected' : ''}>Từ mới thêm 7 ngày qua (${nNew})</option>` : ''}</select></label>
      <label class="dim">Số câu <select id="vsCount">${[10, 20, 30, 50, 0].map(n => `<option value="${n}" ${T.count === n ? 'selected' : ''}>${n ? n : 'Tất cả'}</option>`).join('')}</select></label>
      <div class="dim">Dạng bài</div>${seg('vsForm', T.form, [['mc', '🔘 Trắc nghiệm 4 ý'], ['type', '⌨️ Gõ từ'], ['mix', '🔀 Trộn cả hai']])}
      <div class="dim">Chiều hỏi</div>${seg('vsDir', T.dir, [['w2m', 'Từ → Nghĩa'], ['m2w', 'Nghĩa → Từ'], ['mix', '🔀 Trộn']])}
      <div class="dim" id="vsHint"></div>
      <label class="dim"><input type="checkbox" id="vsHintOn" ${T.hint ? 'checked' : ''}> Hiện phiên âm gợi ý khi hỏi “Từ → Nghĩa”</label>
      <label class="dim"><input type="checkbox" id="vsSpeak" ${T.speak ? 'checked' : ''}> Máy đọc từ khi hiện câu hỏi</label>
      <label class="dim"><input type="checkbox" id="vsAcc" ${T.accept ? 'checked' : ''}> Khi gõ từ, chấp nhận gõ phiên âm (không dấu) thay cho chữ gốc</label>
      <div class="row"><button class="btn primary big" id="vsGo">▶ Bắt đầu</button></div></div>`;
  bindNav();
  const hint = () => { $('#vsHint').textContent = T.form === 'mc' ? 'Mỗi câu có 4 đáp án, bấm hoặc nhấn phím 1–4.' : T.form === 'type' ? 'Gõ đáp án rồi nhấn Enter. Hỏi “Từ → Nghĩa” thì gõ nghĩa (nhận nhiều nghĩa cách nhau bằng ;, châm chước gõ sai một chữ); hỏi “Nghĩa → Từ” thì gõ từ.' : 'Mỗi câu ngẫu nhiên là trắc nghiệm hoặc gõ từ.'; };
  hint();
  for (const [id, key] of [['vsForm', 'form'], ['vsDir', 'dir']]) $$('#' + id + ' button', root).forEach(b => { b.onclick = () => { T[key] = b.dataset.v; saveSetup(); $$('#' + id + ' button', root).forEach(x => x.classList.toggle('on', x === b)); hint(); }; });
  $('#vsGo').onclick = () => {
    Object.assign(T, { group: $('#vsGroup').value, count: +$('#vsCount').value, hint: $('#vsHintOn').checked, speak: $('#vsSpeak').checked, accept: $('#vsAcc').checked }); saveSetup();
    let ws = all.filter(w => w.meaning); if (T.group === '_weak') ws = ws.filter(weak); else if (T.group === '_new') ws = ws.filter(w => (w.created || 0) > week); else if (T.group) ws = ws.filter(w => w.group === T.group);
    start(ws, all);
  };
}
function distractors(w, dir, pool) {
  const key = x => (dir === 'w2m' ? x.meaning : x.word), seen = new Set([norm(key(w))]), cand = pool.filter(x => x.id !== w.id && key(x));
  const same = shuf(cand.filter(x => (x.group || '') === (w.group || ''))), rest = shuf(cand.filter(x => (x.group || '') !== (w.group || ''))), out = [];
  for (const x of [...same.slice(0, 2), ...rest, ...same.slice(2)]) { const k = norm(key(x)); if (!k || seen.has(k)) continue; seen.add(k); out.push(key(x)); if (out.length === 3) break; }
  return out.length === 3 ? out : null;
}
function makeQs(words, pool) {
  return shuf(words).slice(0, T.count || words.length).map(w => {
    const dir = T.dir === 'mix' ? (Math.random() < 0.5 ? 'w2m' : 'm2w') : T.dir; let form = T.form === 'mix' ? (Math.random() < 0.5 ? 'mc' : 'type') : T.form, opts = null;
    if (form === 'mc') { const d = distractors(w, dir, pool); if (d) opts = shuf([dir === 'w2m' ? w.meaning : w.word, ...d]); else form = 'type'; } // quá ít từ để ghép đủ 4 đáp án: câu này chuyển sang gõ từ
    return { w, dir, form, opts };
  });
}
function start(words, pool) {
  if (!words.length) { toast('Chưa có từ nào (có nghĩa) trong phần đã chọn'); return; }
  const qs = makeQs(words, pool); if (!qs.length) return;
  run = { qs, i: 0, res: [], answered: false, pool, done: false }; view = 'run'; drawQ();
}
function drawQ() {
  const r = run, q = r.qs[r.i], bcp = langInfo(q.w.lang || 'zh').bcp, w = q.w, ok = r.res.filter(x => x.ok).length;
  const prompt = q.dir === 'w2m' ? `<div class="vq-main gt" lang="${bcp}">${esc(w.word)}</div>${T.hint && w.pron ? `<div class="vq-pron dim">${esc(w.pron)}</div>` : ''}` : `<div class="vq-main vq-mean">${esc(w.meaning)}</div>`;
  const dirLbl = q.dir === 'w2m' ? 'Chọn / gõ NGHĨA của từ' : 'Chọn / gõ TỪ có nghĩa';
  root.innerHTML = `<div class="vq-top"><button class="btn" id="vqExit">✕ Thoát</button><progress max="${r.qs.length}" value="${r.i}"></progress><span class="dim">Câu ${r.i + 1}/${r.qs.length} · ✓ ${ok}</span></div>
    <div class="qcard vq" data-form="${q.form}"><div class="dim">${q.form === 'mc' ? '🔘 Trắc nghiệm' : '⌨️ Gõ từ'} · ${dirLbl}</div>
      ${prompt}<div class="row c"><button class="btn" id="vqSay" title="Nghe từ">🔊 Nghe từ</button></div>
      ${q.form === 'mc' ? `<div class="vq-opts">${q.opts.map((o, k) => `<button class="btn vq-o" data-k="${k}"><i>${k + 1}</i><span class="${q.dir === 'm2w' ? 'gt' : ''}" ${q.dir === 'm2w' ? `lang="${bcp}"` : ''}>${esc(o)}</span></button>`).join('')}</div>`
        : `<div class="row"><input id="vqIn" class="vq-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ${q.dir === 'm2w' ? `lang="${bcp}"` : ''} placeholder="${q.dir === 'm2w' ? 'Gõ từ…' : 'Gõ nghĩa…'}"><button class="btn primary" id="vqCheck">Kiểm tra</button><button class="btn" id="vqDk" title="Không biết: tính là sai và xem đáp án">Không biết</button></div>`}
      <div id="vqFb"></div><div class="row c"><button class="btn primary big" id="vqNext" hidden>Tiếp →</button></div></div>`;
  r.answered = false; $('#vqExit').onclick = exitRun;
  const speak = () => say(w.word, bcp); $('#vqSay').onclick = speak; if (T.speak && q.dir === 'w2m') setTimeout(speak, 150);
  if (q.form === 'mc') $$('.vq-o', root).forEach(b => { b.onclick = () => answerMc(+b.dataset.k); });
  else { $('#vqCheck').onclick = () => answerType(); $('#vqDk').onclick = () => answerType(true); setTimeout(() => $('#vqIn')?.focus(), 50); }
  $('#vqNext').onclick = next;
}
function feedback(q, ok, extra) {
  const w = q.w, ans = q.dir === 'w2m' ? w.meaning : w.word;
  $('#vqFb').innerHTML = `<div class="vq-fb ${ok ? 'good' : 'bad'}"><b>${ok ? '✓ Đúng' + (extra ? ` (${extra})` : '') : '✗ Chưa đúng'}</b><div>Đáp án: <b class="${q.dir === 'm2w' ? 'gt' : ''}">${esc(ans)}</b>${w.pron ? ` <span class="dim">${esc(w.pron)}</span>` : ''}</div>${q.dir === 'm2w' ? '' : `<div class="dim">${esc(w.word)}</div>`}${w.sentence ? `<div class="dim gt">${esc(w.sentence)}</div>` : ''}${w.note ? `<div class="dim">📝 ${esc(w.note)}</div>` : ''}</div>${!ok && q.form === 'type' ? '<div class="row c"><button class="btn" id="vqForce" title="Đáp án của bạn đúng nghĩa nhưng app chưa nhận ra (ví dụ từ đồng nghĩa)">Tính là đúng</button></div>' : ''}`;
  $('#vqForce')?.addEventListener('click', () => { const x = run.res[run.res.length - 1]; if (x && !x.ok) { x.ok = true; x.forced = true; feedback(q, true, 'bạn tự xác nhận'); updateTop(); } });
}
function updateTop() { const r = run; const s = $('.vq-top .dim', root); if (s) s.textContent = `Câu ${r.i + 1}/${r.qs.length} · ✓ ${r.res.filter(x => x.ok).length}`; }
function finishAnswer(q, ok, given, extra) {
  const r = run; r.answered = true; r.res.push({ w: q.w, q, ok, given, forced: false });
  feedback(q, ok, extra); const nx = $('#vqNext'); nx.hidden = false; nx.textContent = r.i + 1 >= r.qs.length ? 'Xem kết quả →' : 'Tiếp →'; updateTop();
}
function answerMc(k) {
  const r = run; if (r.answered) return; const q = r.qs[r.i], right = q.dir === 'w2m' ? q.w.meaning : q.w.word, pick = q.opts[k];
  $$('.vq-o', root).forEach((b, i) => { b.disabled = true; if (q.opts[i] === right) b.classList.add('right'); else if (i === k) b.classList.add('wrong'); });
  finishAnswer(q, pick === right, pick);
}
function answerType(giveUp) {
  const r = run; if (r.answered) return; const q = r.qs[r.i], inp = $('#vqIn'), given = giveUp ? '' : inp.value;
  if (!giveUp && !given.trim()) { inp.focus(); return; }
  const j = giveUp ? { ok: false } : judge(q, given); inp.disabled = true; $('#vqCheck').disabled = true; $('#vqDk').disabled = true;
  finishAnswer(q, j.ok, given, j.near);
}
function next() { const r = run; if (!r.answered) return; if (r.i + 1 >= r.qs.length) { finish(); return; } r.i++; drawQ(); scrollTo(0, 0); }
function flushStats(res) { // ghi kết quả vào từng từ (đếm đúng / sai) một lần khi kết thúc
  const seen = new Set(); for (const x of res) { if (seen.has(x.w.id)) continue; seen.add(x.w.id); const cur = store.get('wwords', x.w.id); if (!cur || cur.deleted) continue; store.put('wwords', x.w.id, x.ok ? { ok: (cur.ok || 0) + 1 } : { bad: (cur.bad || 0) + 1, lastBad: Date.now() }); }
}
function finish() { const r = run; r.done = true; flushStats(r.res); tracker.test(Math.round(100 * r.res.filter(x => x.ok).length / Math.max(1, r.res.length))); view = 'result'; drawResult(); scrollTo(0, 0); }
function exitRun() { const r = run; if (r && r.res.length && !r.done && !confirm('Thoát bài? Kết quả các câu đã làm vẫn được ghi nhận.')) return; if (r && r.res.length && !r.done) flushStats(r.res); run = null; view = 'test'; render(root); }
function drawResult() {
  const r = run, n = r.res.length, ok = r.res.filter(x => x.ok).length, pct = Math.round(100 * ok / Math.max(1, n)), bad = r.res.filter(x => !x.ok), bcp = langInfo(getLang()).bcp;
  root.innerHTML = `<div class="qcard"><div class="rvbig">${pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'} ${ok}/${n} câu đúng (${pct}%)</div>
    <div class="dim">${bad.length ? `${bad.length} từ chưa đúng, các từ này sẽ hay xuất hiện ở mục “Từ hay sai”.` : 'Không sai từ nào, rất tốt!'}</div>
    <div class="row">${bad.length ? '<button class="btn primary" id="vrRetry">🔁 Làm lại các từ sai</button>' : ''}<button class="btn ${bad.length ? '' : 'primary'}" id="vrAgain">🔄 Bài mới</button>${bad.length ? '<button class="btn" id="vrCards" title="Thêm các từ sai vào Sổ thẻ để ôn theo lịch lặp lại">📒 Thêm từ sai vào sổ thẻ</button>' : ''}<button class="btn" id="vrBank">← Kho từ vựng</button></div></div>
    <div class="cards wvl">${r.res.map(x => `<div class="card wvrow" style="cursor:default"><div class="ci"><span><b class="wvw" lang="${bcp}">${esc(x.w.word)}</b> <span class="wvp dim">${esc(x.w.pron || '')}</span></span><span class="wvm">${esc(x.w.meaning || '')}</span>${!x.ok && x.given ? `<span class="bad">Bạn chọn / gõ: ${esc(x.given)}</span>` : ''}</div><span class="${x.ok ? 'ok' : 'bad'}">${x.ok ? '✓' : '✗'}</span></div>`).join('')}</div>`;
  $('#vrBank').onclick = () => { run = null; view = 'bank'; render(root); };
  $('#vrAgain').onclick = () => { run = null; view = 'test'; render(root); };
  $('#vrRetry')?.addEventListener('click', () => { const pool = r.pool; start(bad.map(x => store.get('wwords', x.w.id) || x.w), pool); });
  $('#vrCards')?.addEventListener('click', () => { const k = bad.filter(x => toCard(store.get('wwords', x.w.id) || x.w)).length; toast(k ? `Đã thêm ${k} từ vào sổ thẻ 📒` : 'Các từ này đã có trong sổ thẻ'); });
}

// bàn phím khi đang làm bài: 1–4 chọn đáp án, Enter kiểm tra / sang câu tiếp
document.addEventListener('keydown', e => {
  if (!run || run.done || view !== 'run' || document.body.dataset.view !== 'review' || !root?.querySelector('.vq')) return;
  const r = run, q = r.qs[r.i];
  if (e.key === 'Enter') { e.preventDefault(); if (r.answered) next(); else if (q.form === 'type') answerType(); return; }
  if (q.form === 'mc' && !r.answered && /^[1-4]$/.test(e.key) && !e.target.matches('input,textarea,select')) { e.preventDefault(); answerMc(+e.key - 1); }
});
export function init() { /* không có gì cần khởi tạo trước: màn vẽ khi mở tab */ }
