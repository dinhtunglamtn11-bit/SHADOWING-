// Bài tập của tôi: nhập nhiều câu cùng lúc bằng một đoạn văn bản theo cú pháp riêng, rồi làm bài.
// Bộ bài tập có thể gắn với một video / tài liệu / ghi chú trong thư viện; danh sách chia mục theo đó.
// Cú pháp từng dạng câu nằm ở exparse.js, phần làm bài ở exrun.js, prompt nhờ AI tạo bài ở exprompts.js.
import { $, $$, esc, toast, uid, pickFile, getLang, langInfo, LANGS, bus } from './util.js';
import * as store from './store.js';
import * as cards from './cards.js';
import * as tracker from './tracker.js';
import * as tree from './tree.js';
import { rngOf, shuffle } from './quiz.js';
import { zhText } from './prefs.js';
import { trLines } from './i18n.js';
import { parseSet, build, countKinds, buildTest } from './exparse.js';
import { runSheet, timeHtml, wireTime, readTime } from './exsheet.js';
import { pix } from './pixicons.js';
import { plain } from './richtext.js';
import { runQuiz } from './exrun.js';
import { KIND_ORDER, setPrompt, promptPanel } from './exprompts.js';

export { parseSet, build };

export const EXAMPLES = {
  zh: `# Bài 1: Chào hỏi
T: 你好 | nǐ hǎo | Xin chào
T: 谢谢 | xièxie | Cảm ơn
T: 再见 | zàijiàn | Tạm biệt
T: 对不起 | duìbuqǐ | Xin lỗi
TN: “Cảm ơn” nói thế nào? | *谢谢 | 你好 | 再见 | 对不起
DS: 再见 nghĩa là “Xin chào” | sai ~ 再见 (zàijiàn) là tạm biệt
Đ: 我[每天]去学校 | Tôi đi học mỗi ngày
G: Xin chào | 你好 / nǐ hǎo
S: 我 / 喜欢 / 学 / 中文 | Tôi thích học tiếng Trung
K: 我每天[早上]喝[咖啡]，不喝茶。 | 晚上 / 牛奶 | Tôi uống cà phê mỗi sáng
N: 谢谢 | *Cảm ơn | Xin chào | Tạm biệt | Xin lỗi
NG: 你好吗？ | 你好吗`,
  en: `# Unit 1: Daily life
T: breakfast | bữa sáng
T: library | thư viện
T: weather | thời tiết
T: neighbour | hàng xóm
TN: What do you eat in the morning? | *breakfast | library | weather | neighbour
DS: A library is a place to buy food | sai ~ Library là thư viện
Đ: She [goes/went] to the [library] every day | Cô ấy đến thư viện mỗi ngày
G: bữa sáng | breakfast
S: I / like / to / read / books | Tôi thích đọc sách
K: Every [morning] I drink [coffee] before [work]. | evening / tea / school | Mỗi sáng tôi uống cà phê trước giờ làm
N: breakfast | *Bữa sáng | Thư viện | Thời tiết | Hàng xóm
NG: How are you today?`,
  ko: `# Bài 1: Chào hỏi
T: 안녕하세요 | annyeonghaseyo | Xin chào
T: 감사합니다 | gamsahamnida | Cảm ơn
T: 죄송합니다 | joesonghamnida | Xin lỗi
T: 안녕히 가세요 | annyeonghi gaseyo | Tạm biệt
TN: “Cảm ơn” nói thế nào? | *감사합니다 | 안녕하세요 | 죄송합니다 | 안녕히 가세요
DS: 안녕하세요 nghĩa là “Tạm biệt” | sai
Đ: 저는 [학생]입니다 | Tôi là học sinh
G: Xin lỗi | 죄송합니다
S: 저는 / 학생 / 입니다 | Tôi là học sinh
K: 저는 [매일] [학교]에 갑니다. | 집 / 가끔 | Tôi đi học mỗi ngày
N: 감사합니다 | *Cảm ơn | Xin chào | Xin lỗi | Tạm biệt
NG: 안녕하세요`,
  ja: `# Bài 1: Chào hỏi
T: こんにちは | konnichiwa | Xin chào
T: ありがとう | arigatou | Cảm ơn
T: すみません | sumimasen | Xin lỗi
T: さようなら | sayounara | Tạm biệt
TN: “Cảm ơn” nói thế nào? | *ありがとう | こんにちは | すみません | さようなら
DS: こんにちは nghĩa là “Tạm biệt” | sai
Đ: 私は[学生]です | Tôi là học sinh
G: Xin lỗi | すみません
S: 私は / 学生 / です | Tôi là học sinh
K: 私は[毎日]、[学校]に行きます。 | 家 / 時々 | Tôi đi học mỗi ngày
N: ありがとう | *Cảm ơn | Xin chào | Xin lỗi | Tạm biệt
NG: こんにちは`,
};

// ---------- trạng thái ----------
let box = null, mode = 'list', editId = null, draft = null, promptCtx = null, runner = null, runLang = null, backTo = null;
// quay lại nơi đã mở màn này (ví dụ thư mục bài học) hoặc về danh sách
const goBack = () => { runner = null; mode = 'list'; if (backTo) { const f = backTo; backTo = null; f(); } else drawList(); };
const runOpts = { shuffle: true, listen: true, count: 0, kind: 'all' };
const pk = { kinds: ['TN', 'DS', 'S', 'K', 'N', 'G'], count: 5 };

const SHORT = { mc: 'Trắc nghiệm', multi: 'Chọn nhiều', tf: 'Đúng/Sai', type: 'Tự luận', fill: 'Điền từ', order: 'Sắp xếp câu', listen: 'Nghe-chọn', listentype: 'Nghe-gõ', cloze: 'Kéo thả', vocab: 'Từ vựng' };
const KIND_FILTER = [['all', 'Tất cả dạng'], ['mc', 'Trắc nghiệm'], ['multi', 'Chọn nhiều'], ['tf', 'Đúng/Sai'], ['type', 'Tự luận'], ['fill', 'Điền từ'], ['order', 'Sắp xếp câu'], ['cloze', 'Kéo thả'], ['listen', 'Có nghe']];
const kindOfQ = q => (q.listen ? 'listen' : q.kind);

const setsOf = lang => store.list('sets').filter(s => (s.lang || 'zh') === lang).sort((a, b) => (b.u || 0) - (a.u || 0));
const itemsOfLang = lang => store.list('items').filter(i => (i.lang || 'zh') === lang);
const iconOf = i => (i.type === 'video' ? '🎬' : i.type === 'note' ? '📝' : i.type === 'pdf' ? '📄' : '📃');
const countOf = (p, listen = runOpts.listen) => p.qs.length + (p.vocab.length >= 2 ? p.vocab.length * (listen ? 3 : 2) : 0);

export function render(el) {
  box = el;
  if (mode === 'run' && runner) {
    if (runLang && runLang !== getLang()) { runner.stop(); runner = null; mode = 'list'; }
    else { runner.attach(el); return; }
  }
  if (mode === 'sheet') { if (el.querySelector('.sheet')) return; mode = 'list'; }
  if (mode === 'edit') return drawEditor();
  if (mode === 'prompt') return drawPromptView();
  mode = 'list'; drawList();
}

// Từ thư viện: mở bài tập của một video / tài liệu (chưa có thì mở màn soạn, đã gắn sẵn mục đó)
document.addEventListener('exercises-for', e => {
  const id = e.detail;
  runner?.stop(); runner = null; mode = 'list';
  document.dispatchEvent(new CustomEvent('review-tab', { detail: 'mine' }));
  if (!box) return;
  if (setsOf(getLang()).some(s => s.itemId === id)) { drawList(); box.querySelector('[data-g="' + id + '"]')?.scrollIntoView(); }
  else { editId = null; draft = { itemId: id, title: store.get('items', id)?.title || '' }; mode = 'edit'; drawEditor(); }
});

// Từ thư mục bài học (lessons.js): soạn / làm bộ bài tập rồi quay lại thư mục
document.addEventListener('sets-open', e => {
  const d = e.detail || {};
  runner?.stop(); runner = null; backTo = d.back || null;
  document.dispatchEvent(new CustomEvent('review-tab', { detail: 'mine' }));
  if (!box) return;
  if (d.run) { start(d.run, d.title); return; }
  if (d.edit) { editId = d.edit; draft = null; }
  else { editId = null; draft = { folder: d.newIn || '' }; }
  mode = 'edit'; drawEditor();
});

// ---------- danh sách, chia mục theo thư mục bài học / video / tài liệu ----------
function setCard(s) {
  const p = parseSet(s.text || ''), kc = countKinds(p);
  const chips = Object.keys(kc).map(k => `<span class="kb">${esc(SHORT[k])} ${kc[k]}</span>`).join('');
  return `<div class="card" style="cursor:default"><div class="thumb">${pix('a_exercise')}</div><div class="ci"><b>${esc(s.title || 'Bộ bài tập')}</b><span class="dim">${countOf(p)} câu hỏi${p.errors.length ? ` · <span class="bad">${p.errors.length} dòng lỗi</span>` : ''}</span><span class="kbs">${chips}</span></div>
    <button class="btn primary" data-run="${s.id}">▶ Làm</button><button class="btn" data-edit="${s.id}">✎</button><button class="btn" data-del="${s.id}">🗑</button></div>`;
}

function drawList() {
  const lang = getLang(), list = setsOf(lang), items = new Map(itemsOfLang(lang).map(i => [i.id, i]));
  const groups = new Map();
  const fmap = new Map(tree.allFolders(lang).map(f => [f.id, f]));
  for (const s of list) {
    const key = s.folder && fmap.has(s.folder) ? 'F:' + s.folder : s.itemId && items.has(s.itemId) ? 'I:' + s.itemId : '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  const keys = [...groups.keys()].sort((a, b) => (a === '') - (b === '') || Math.max(...groups.get(b).map(s => s.u || 0)) - Math.max(...groups.get(a).map(s => s.u || 0)));
  const total = s => groups.get(s).reduce((n, x) => n + countOf(parseSet(x.text || '')), 0);
  box.innerHTML = `<div class="row"><button class="btn primary" id="msNew">＋ Tạo bộ bài tập</button><button class="btn" id="msPrompt" title="Tạo prompt để nhờ ChatGPT / Claude tách văn bản thành nhiều câu hỏi">🤖 Prompt nhờ AI</button>${list.length ? '<button class="btn" id="msQuick" title="Ra một bài kiểm tra ngẫu nhiên từ mọi bộ bài tập, hiện trên một trang">📋 Kiểm tra nhanh</button>' + timeHtml('msQT', 0) : ''}<span class="grow"></span>
      <label class="dim"><input type="checkbox" id="msShuf" ${runOpts.shuffle ? 'checked' : ''}> Trộn câu</label>
      <label class="dim"><input type="checkbox" id="msListen" ${runOpts.listen ? 'checked' : ''}> Có câu nghe</label>
      <label class="dim">Dạng <select id="msKind">${KIND_FILTER.map(([v, n]) => `<option value="${v}">${n}</option>`).join('')}</select></label>
      <label class="dim">Số câu <select id="msCount"><option value="0">Tất cả</option><option value="10">10</option><option value="20">20</option></select></label></div>
    <div class="dim" style="margin:4px 2px">Bài tập được chia theo mục video / tài liệu. Nhập nhiều câu cùng lúc: bấm “Tạo bộ bài tập” rồi dán các dòng theo cú pháp, hoặc bấm “Prompt nhờ AI” để AI tách văn bản thành câu hỏi.</div>
    ${list.length ? keys.map(k => {
      const it = k.startsWith('I:') ? items.get(k.slice(2)) : null, ss = groups.get(k), fid = k.startsWith('F:') ? k.slice(2) : '';
      return `<details class="grp" open data-g="${esc(k.slice(2))}"><summary><span class="gt">${fid ? '🎓 ' + esc(tree.pathLabel(fid, lang)) : it ? iconOf(it) + ' ' + esc(it.title || 'Không tên') : '📚 Chung (chưa gắn với video / tài liệu)'}</span> <small class="dim">${ss.length} bộ · ${total(k)} câu hỏi</small></summary>
        <div class="row"><button class="btn primary" data-grun="${esc(k)}">▶ Làm cả mục</button><button class="btn" data-gnew="${esc(k)}">＋ Bộ mới</button><button class="btn" data-gprompt="${esc(k)}">🤖 Prompt cho mục này</button></div>
        <div class="cards">${ss.map(setCard).join('')}</div></details>`;
    }).join('') : `<div class="empty">Chưa có bộ bài tập ${esc(langInfo().name)} nào.</div>`}`;
  $('#msCount', box).value = String(runOpts.count);
  $('#msKind', box).value = runOpts.kind;
  $('#msNew', box).onclick = () => { editId = null; draft = null; mode = 'edit'; drawEditor(); };
  $('#msPrompt', box).onclick = () => { promptCtx = { itemId: '' }; mode = 'prompt'; drawPromptView(); };
  $('#msShuf', box).onchange = e => { runOpts.shuffle = e.target.checked; };
  $('#msListen', box).onchange = e => { runOpts.listen = e.target.checked; drawList(); };
  $('#msKind', box).onchange = e => { runOpts.kind = e.target.value; };
  $('#msCount', box).onchange = e => { runOpts.count = +e.target.value; };
  $$('[data-run]', box).forEach(b => b.onclick = () => start([b.dataset.run]));
  $$('[data-edit]', box).forEach(b => b.onclick = () => { editId = b.dataset.edit; draft = null; mode = 'edit'; drawEditor(); });
  $$('[data-del]', box).forEach(b => b.onclick = () => { if (confirm('Xóa bộ bài tập này?')) { store.del('sets', b.dataset.del); drawList(); } });
  const gTitle = k => (k.startsWith('F:') ? tree.pathLabel(k.slice(2), lang) : items.get(k.slice(2))?.title);
  $$('[data-grun]', box).forEach(b => b.onclick = () => start(groups.get(b.dataset.grun).map(s => s.id), gTitle(b.dataset.grun)));
  $$('[data-gnew]', box).forEach(b => b.onclick = () => { const k = b.dataset.gnew; editId = null; draft = k.startsWith('F:') ? { folder: k.slice(2) } : { itemId: k.slice(2) }; mode = 'edit'; drawEditor(); });
  $$('[data-gprompt]', box).forEach(b => b.onclick = () => { const k = b.dataset.gprompt; promptCtx = { itemId: k.startsWith('I:') ? k.slice(2) : '' }; mode = 'prompt'; drawPromptView(); });
  if ($('#msQT', box)) wireTime(box, 'msQT');
  $('#msQuick', box)?.addEventListener('click', () => quickTest(list, readTime(box, 'msQT')));
}

// ---------- prompt nhờ AI ----------
async function sourceOf(id) {
  const it = id && store.get('items', id);
  if (!it || it.deleted) return '';
  let t = '';
  try {
    if (it.type === 'note') t = plain((it.body || '').replace(/\[\[(?:audio|video):[^|\]]*\|?([^\]]*)\]\]/g, '$1'));
    else if (it.type === 'video' && it.cues) t = JSON.parse(it.cues).map(c => (c.lines || [])[0] || '').filter(Boolean).join('\n');
    else if (it.type === 'text' && it.assetId) { const a = await store.getAsset(it.assetId); if (a?.blob) t = await a.blob.text(); }
  } catch { /* không đọc được thì để trống */ }
  return t.trim().slice(0, 8000);
}

function drawPromptView() {
  const lang = getLang(), it = promptCtx.itemId ? store.get('items', promptCtx.itemId) : null;
  box.innerHTML = `<div class="row"><button class="btn" id="pvBack">← Quay lại</button><b>🤖 Prompt nhờ AI tạo bài tập</b>${it ? ` <span class="gt">${esc(it.title || '')}</span>` : ''}</div><div class="qcard"><div id="pvHost"></div></div>`;
  $('#pvBack', box).onclick = () => { mode = 'list'; drawList(); };
  promptPanel($('#pvHost', box), {
    state: pk, source: () => sourceOf(promptCtx.itemId), build: o => setPrompt({ lang, kinds: o.kinds, count: o.count, title: it?.title || '', source: o.source }),
    onPaste: text => { editId = null; draft = { itemId: promptCtx.itemId, text, title: it?.title || '' }; mode = 'edit'; drawEditor(); },
  });
}

// ---------- soạn ----------
const HELP = `<details class="help"><summary>📖 Cú pháp nhập nhiều câu cùng lúc</summary>
<p>Mỗi dòng là một câu hỏi: <code>LOẠI: phần 1 | phần 2 | …</code> (các phần cách nhau bằng dấu <code>|</code>).</p>
<table>
<tr><td><code>TN:</code> trắc nghiệm</td><td><code>TN: Cảm ơn nói thế nào? | *谢谢 | 你好 | 再见 | 对不起</code><br><small>Dấu <code>*</code> đứng trước đáp án đúng (đúng một đáp án, thường 4 đáp án).</small></td></tr>
<tr><td><code>DS:</code> đúng/sai</td><td><code>DS: 再见 nghĩa là “Xin chào” | sai</code></td></tr>
<tr><td><code>S:</code> sắp xếp câu</td><td><code>S: 我 / 喜欢 / 学 / 中文 | Tôi thích học tiếng Trung</code><br><small>Các từ cách nhau bằng /, viết đúng thứ tự (app tự xáo trộn); phần sau | là gợi ý. Có nhiều cách xếp đúng: ngăn cách bằng <code>;;</code>. Từ gây nhiễu: đặt <code>+</code> trước từ.</small></td></tr>
<tr><td><code>G:</code> tự luận ngắn</td><td><code>G: Xin chào | 你好 / nǐ hǎo</code><br><small>Các đáp án chấp nhận cách nhau bằng /.</small></td></tr>
<tr><td><code>Đ:</code> điền từ</td><td><code>Đ: She [goes/went] to the [library] | Cô ấy đến thư viện</code><br><small>Đáp án để trong [ ]. Nhiều đáp án chấp nhận cách nhau bằng /. Có thể nhiều chỗ trống. Phần sau | là gợi ý.</small></td></tr>
<tr><td><code>K:</code> đoạn văn khuyết (kéo thả)</td><td><code>K: 我每天[早上]喝[咖啡]。 | 晚上 / 牛奶 | gợi ý</code><br><small>Từ đúng để trong [ ]; phần sau | là các từ gây nhiễu (cách nhau bằng /). Người học kéo từ vào chỗ trống.</small></td></tr>
<tr><td><code>N:</code> nghe và chọn</td><td><code>N: 谢谢 | *Cảm ơn | Xin chào | Tạm biệt | Xin lỗi</code><br><small>Máy đọc phần đầu thành tiếng (người học không thấy chữ), chọn nghĩa đúng.</small></td></tr>
<tr><td><code>NG:</code> nghe và gõ</td><td><code>NG: 你好吗？ | 你好吗</code><br><small>Nghe rồi gõ. Bỏ phần sau | thì đáp án chính là câu được đọc (chép chính tả).</small></td></tr>
<tr><td><code>T:</code> từ vựng</td><td><code>T: 你好 | nǐ hǎo | Xin chào</code><br><small>(phiên âm có thể bỏ). App tự sinh 3 câu: từ→nghĩa, nghĩa→từ, nghe→nghĩa.</small></td></tr>
</table>
<p><b>Thêm giải thích:</b> đặt <code>~ lời giải thích</code> ở cuối dòng. <b>Tiêu đề:</b> dòng <code>#  Tên bộ</code>. <b>Ghi chú:</b> dòng bắt đầu bằng <code>//</code> bị bỏ qua. Muốn viết dấu | trong chữ thì gõ <code>\\|</code>, xuống dòng thì gõ <code>\\n</code>.</p>
<p>Khi làm bài, chữ tiếng đang học có <b>🔊</b> bên cạnh, bấm là máy đọc.</p></details>`;

function drawEditor() {
  const s = editId ? store.get('sets', editId) : null;
  const lang = s?.lang || draft?.lang || getLang(), start0 = s?.itemId ?? draft?.itemId ?? '';
  box.innerHTML = `${HELP}
    <label class="dim">Tên bộ bài tập<input id="msTitle" type="text" value="${esc(s?.title || draft?.title || '')}" placeholder="Ví dụ: Bài 1: Chào hỏi"></label>
    <label class="dim">Ngôn ngữ<select id="msLang">${LANGS.map(l => `<option value="${l.id}" ${l.id === lang ? 'selected' : ''}>${l.name}</option>`).join('')}</select></label>
    <label class="dim">Thư mục bài học (ví dụ HSK1 › HSK bài 1)<select id="msFolder"></select></label>
    <label class="dim">Thuộc mục (video / tài liệu / ghi chú)<select id="msItem"></select></label>
    <details class="help" id="msAi"><summary>🤖 Nhờ AI tách văn bản thành nhiều câu (prompt)</summary><div id="msAiHost"></div></details>
    <label class="dim">Nội dung (mỗi dòng một câu)<textarea id="msText" class="mono" rows="14" spellcheck="false" placeholder="Dán hoặc gõ nhiều dòng ở đây. Bấm “Chèn ví dụ” để xem mẫu.">${esc(s?.text || draft?.text || '')}</textarea></label>
    <div id="msCheck" class="dim"></div>
    <div class="row"><button class="btn primary" id="msSave">💾 Lưu</button><button class="btn" id="msTry">▶ Lưu và làm thử</button><button class="btn" id="msEx">Chèn ví dụ</button><button class="btn" id="msFile">📂 Mở file .txt</button><span class="grow"></span><button class="btn" id="msCards">📒 Từ vựng → sổ thẻ</button><button class="btn" id="msBack">← Quay lại</button></div>`;
  const ta = $('#msText', box), sel = $('#msItem', box);
  const fillItems = (lg, cur) => {
    const items = itemsOfLang(lg).sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    sel.innerHTML = `<option value="">📚 Chung (không gắn)</option>` + items.map(i => `<option value="${i.id}" ${i.id === cur ? 'selected' : ''}>${iconOf(i)} ${esc(i.title || 'Không tên')}</option>`).join('');
  };
  fillItems(lang, start0);
  const fsel = $('#msFolder', box);
  fsel.innerHTML = tree.options(lang, s?.folder ?? draft?.folder ?? '', 'Không thuộc thư mục nào');
  const check = () => {
    const p = parseSet(ta.value), total = p.qs.length + p.vocab.length, kc = countKinds(p);
    $('#msCheck', box).innerHTML = (total ? `<span class="ok">✓ ${p.qs.length} câu + ${p.vocab.length} từ vựng hợp lệ</span> <span class="kbs">${Object.keys(kc).map(k => `<span class="kb">${esc(SHORT[k])} ${kc[k]}</span>`).join('')}</span>` : 'Chưa có dòng nào.') +
      (p.errors.length ? `<div class="bad">${p.errors.length} dòng có lỗi:</div>` + p.errors.slice(0, 8).map(e => `<div class="bad">dòng ${e.line}: ${esc(e.msg)}</div>`).join('') : '');
  };
  ta.addEventListener('input', check); check();
  $('#msLang', box).onchange = e => { fillItems(e.target.value, ''); fsel.innerHTML = tree.options(e.target.value, '', 'Không thuộc thư mục nào'); panel?.reload(); };

  let panel = null;
  $('#msAi', box).addEventListener('toggle', () => {
    if (!$('#msAi', box).open || panel) return;
    panel = promptPanel($('#msAiHost', box), {
      state: pk, source: () => sourceOf(sel.value),
      build: o => setPrompt({ lang: $('#msLang', box).value, kinds: o.kinds, count: o.count, title: $('#msTitle', box).value.trim(), source: o.source }),
      onPaste: text => { ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n' + text : text; check(); toast('Đã dán vào ô nội dung ✓'); },
    });
  });
  sel.addEventListener('change', () => panel?.reload());
  $('#msTitle', box).addEventListener('change', () => panel?.reload());

  const save = () => {
    const lg = $('#msLang', box).value;
    if (lg === 'zh') { const c = zhText(ta.value, 'zh'); if (c !== ta.value) { ta.value = c; check(); toast('Đã chuyển chữ Trung sang giản thể'); } }
    const p = parseSet(ta.value);
    if (!p.qs.length && !p.vocab.length) { toast('Chưa có câu hỏi hợp lệ nào để lưu'); return null; }
    const id = editId || uid(); editId = id;
    store.put('sets', id, { lang: lg, title: zhText($('#msTitle', box).value.trim(), lg) || p.title || 'Bộ bài tập', text: ta.value, itemId: sel.value, folder: fsel.value, created: s?.created || Date.now(), deleted: false });
    toast('Đã lưu ✓');
    return id;
  };
  $('#msSave', box).onclick = save;
  $('#msTry', box).onclick = () => { const id = save(); if (id) start([id]); };
  $('#msEx', box).onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = trLines(EXAMPLES[$('#msLang', box).value] || EXAMPLES.zh); check(); } };
  $('#msFile', box).onclick = () => pickFile('.txt,text/plain').then(async ([f]) => { if (f) { ta.value = await f.text(); check(); if (!$('#msTitle', box).value) $('#msTitle', box).value = parseSet(ta.value).title || f.name.replace(/\.[^.]+$/, ''); } });
  $('#msCards', box).onclick = () => {
    const p = parseSet(ta.value), lg = $('#msLang', box).value; let n = 0;
    if (!p.vocab.length) { toast('Chưa có dòng từ vựng (T:) nào'); return; }
    const have = new Set(cards.allCards(lg).map(c => c.front));
    for (const v of p.vocab) if (!have.has(v.word)) { cards.addManual({ lang: lg, front: v.word, back: [v.pron, v.meaning] }); n++; }
    toast(n ? `Đã thêm ${n} từ vào sổ thẻ 📒` : 'Các từ này đã có trong sổ thẻ');
  };
  $('#msBack', box).onclick = goBack;
}

// Kiểm tra nhanh: trộn câu của mọi bộ bài tập (ngôn ngữ đang học), 20 câu, hiện trên một trang
function quickTest(list, time = 0) {
  const lang = getLang(), qs = buildTest(list, { mode: 'random', count: 20, listen: runOpts.listen }, rngOf('qt' + Date.now()));
  if (!qs.length) { toast('Chưa có câu hỏi để ra bài kiểm tra'); return; }
  mode = 'sheet';
  const again = () => quickTest(setsOf(lang), time);
  runSheet(box, {
    qs, lang, title: '', src: 'Kiểm tra nhanh', submitLabel: 'Hoàn thành & nộp bài', timeLimit: time,
    intro: `<div class="dim">${qs.length} câu ngẫu nhiên</div>${time ? '<div class="dim">Có giới hạn thời gian: hết giờ bài tự nộp.</div>' : ''}<div class="dim">Làm hết rồi bấm nút nộp bài ở cuối trang để chấm điểm.</div>`,
    onDone: r => tracker.test(r.pct), onAgain: again, onExit: goBack, exitLabel: 'Danh sách',
  });
}

// ---------- làm bài ----------
function start(ids, title) {
  const sets = ids.map(id => { const d = store.get('sets', id); return d && { ...d, id }; }).filter(Boolean);
  if (!sets.length) return;
  const lang = sets[0].lang || 'zh', rnd = rngOf('set' + ids.join() + Date.now());
  let qs = sets.flatMap(s => build(parseSet(s.text || ''), { shuffle: false, listen: runOpts.listen, count: 0 }, rnd).map(q => ({ ...q, sid: s.id })));
  if (runOpts.kind !== 'all') qs = qs.filter(q => kindOfQ(q) === runOpts.kind);
  if (!qs.length) { toast(runOpts.kind === 'all' ? 'Bộ này chưa đủ câu hỏi hợp lệ' : 'Không có câu thuộc dạng đã chọn'); return; }
  if (runOpts.shuffle) qs = shuffle(qs, rnd);
  if (runOpts.count > 0) qs = qs.slice(0, runOpts.count);
  runner?.stop();
  mode = 'run'; runLang = lang;
  runner = runQuiz(box, {
    qs, lang, title: title || sets[0].title,
    onExit: goBack,
    onAgain: () => start(ids, title),
    // ghi lại mỗi bộ đã làm (số lần + điểm cao nhất) để thư mục bài học tính tiến độ
    onDone: r => {
      const by = {};
      r.qs.forEach((q, i) => { if (!q.sid) return; (by[q.sid] ||= { ok: 0, n: 0 }); by[q.sid].n++; if (r.res[i]?.ok) by[q.sid].ok++; });
      for (const [sid, x] of Object.entries(by)) { const c = store.get('sets', sid) || {}; store.put('sets', sid, { tries: (c.tries || 0) + 1, best: Math.max(c.best ?? 0, Math.round(100 * x.ok / x.n)) }); }
    },
  });
}
