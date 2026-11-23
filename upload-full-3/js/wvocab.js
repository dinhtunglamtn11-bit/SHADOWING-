// Từ vựng của “Thế giới của tôi”: từ tra trong bài đọc được lưu kèm câu chứa từ, có danh sách riêng,
// thêm vào sổ thẻ (ôn lặp lại) và làm bài kiểm tra từ vựng một trang (theo nhóm bài đọc hoặc ngẫu nhiên).
import { $, $$, esc, toast, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as cards from './cards.js';
import * as tracker from './tracker.js';
import { say } from './tts.js';
import { rngOf, shuffle } from './quiz.js';
import { buildTest } from './exparse.js';
import { runSheet, timeHtml, wireTime, readTime } from './exsheet.js';

export const wordsOf = lang => store.list('wwords').filter(w => (w.lang || 'zh') === lang);

// Lưu một từ (trùng từ thì bổ sung phần còn thiếu). Trả về 'new' | 'dup'
export function addWord({ lang, word, pron = '', meaning = '', sentence = '', article = '', title = '' }) {
  word = (word || '').trim();
  if (!word) return null;
  const id = lang + '_' + word, d = store.get('wwords', id);
  if (d && !d.deleted) {
    const patch = {};
    if (!d.sentence && sentence) { patch.sentence = sentence; patch.article = article; patch.title = title; }
    if (!d.meaning && meaning) patch.meaning = meaning;
    if (Object.keys(patch).length) store.put('wwords', id, patch);
    return 'dup';
  }
  store.put('wwords', id, { lang, word, pron, meaning, sentence, article, title, created: Date.now(), deleted: false });
  return 'new';
}

// câu chứa chữ ở vị trí k trong đoạn text
export function sentenceAt(text, k, dot = false) {
  const END = dot ? /[。！？!?.\n；;]/ : /[。！？!?\n；;]/; // chữ Anh / Hàn dùng dấu chấm để kết câu
  let s = k, e = k;
  while (s > 0 && !END.test(text[s - 1])) s--;
  while (e < text.length && !END.test(text[e])) e++;
  if (e < text.length) e++;
  return text.slice(s, e).trim().slice(0, 200);
}

let root = null, ctx = {}, view = 'list', runner = null;
const filter = { art: 'all', q: '' };
const pk = { count: 10, mode: 'random', ctxq: true, listen: true };

export function render(el, c) {
  root = el; ctx = c || ctx;
  if (view === 'run' && runner && root.querySelector('.sheet')) return;
  if (view === 'test') return drawTest();
  view = 'list'; drawList();
}
export const reset = () => { view = 'list'; runner = null; filter.art = 'all'; filter.q = ''; };

const artLabel = w => w.title || 'Thêm tay';
function drawList() {
  const lang = getLang(), bcp = langInfo(lang).bcp, all = wordsOf(lang).sort((a, b) => (b.created || 0) - (a.created || 0));
  const arts = [...new Map(all.map(w => [w.article || '', artLabel(w)])).entries()];
  if (filter.art !== 'all' && !arts.some(([k]) => k === filter.art)) filter.art = 'all';
  const q = filter.q.trim().toLowerCase();
  const shown = all.filter(w => (filter.art === 'all' || (w.article || '') === filter.art) && (!q || [w.word, w.pron, w.meaning].some(x => (x || '').toLowerCase().includes(q))));
  const mark = (s, word) => esc(s).split(esc(word)).join(`<mark>${esc(word)}</mark>`);
  root.innerHTML = `<div class="row"><button class="btn" id="wvBack">← Thế giới của tôi</button><b>📖 Từ vựng Thế giới</b></div>
    <div class="qcard"><div class="dim">${all.length} từ đã lưu${arts.length ? ` · từ ${arts.length} bài đọc` : ''}</div><div class="dim">Khi đọc bài, bật “Tra từ”, chạm vào chữ rồi bấm “Lưu vào từ vựng Thế giới”: từ được lưu kèm câu chứa nó.</div>
      <div class="row"><button class="btn primary big" id="wvTest" ${all.length >= 2 ? '' : 'disabled'}>🧠 Kiểm tra từ vựng</button><button class="btn" id="wvCards" ${all.length ? '' : 'disabled'} title="Thêm các từ chưa có vào sổ thẻ để ôn theo lịch lặp lại">📒 Thêm tất cả vào sổ thẻ</button><button class="btn" id="wvAdd">＋ Thêm từ</button></div>
      <div id="wvForm" hidden>
        <div class="row"><label class="dim grow">Từ<input id="wvWord" type="text" lang="${bcp}"></label><label class="dim grow">Phiên âm<input id="wvPron" type="text"></label></div>
        <label class="dim">Nghĩa<input id="wvMean" type="text"></label>
        <label class="dim">Câu ví dụ (không bắt buộc)<input id="wvSent" type="text" lang="${bcp}"></label>
        <div class="row"><button class="btn primary" id="wvSave">Lưu từ</button><button class="btn" id="wvCancel">Hủy</button></div>
      </div></div>
    <div class="row"><label class="dim">Bài đọc <select id="wvArt"><option value="all">Tất cả</option>${arts.map(([k, n]) => `<option value="${esc(k)}" ${filter.art === k ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
      <input id="wvSearch" type="search" placeholder="🔍 Tìm từ…" value="${esc(filter.q)}" style="flex:1;min-width:120px;max-width:240px"></div>
    <div class="cards wvl">${shown.length ? shown.map(w => `<div class="card wvrow" style="cursor:default"><div class="ci"><span><b class="wvw" lang="${bcp}">${esc(w.word)}</b> <span class="wvp dim">${esc(w.pron || '')}</span></span>
        <span class="wvm">${esc(w.meaning || '—')}</span>${w.sentence ? `<span class="wvs" lang="${bcp}">${mark(w.sentence, w.word)}</span>` : ''}<span class="dim">${w.title ? 'Từ bài: <span class="wvsrc">' + esc(w.title) + '</span>' : 'Thêm tay'}</span></div>
        <span class="lbtns"><button class="btn" data-say="${esc(w.id)}" title="Nghe">🔊</button><button class="btn" data-card="${esc(w.id)}" title="Thêm vào sổ thẻ">📒</button><button class="btn" data-del="${esc(w.id)}" title="Xóa">🗑</button></span></div>`).join('')
      : `<div class="empty">${all.length ? 'Không có từ nào khớp.' : 'Chưa có từ nào. Đọc một bài, bật “Tra từ”, chạm vào chữ Hán rồi bấm “Lưu vào từ vựng Thế giới”, hoặc bấm “＋ Thêm từ”.'}</div>`}</div>`;
  $('#wvBack').onclick = () => ctx.back?.();
  $('#wvTest')?.addEventListener('click', () => { view = 'test'; drawTest(); });
  $('#wvAdd').onclick = () => { $('#wvForm').hidden = false; $('#wvWord').focus(); };
  $('#wvCancel').onclick = () => { $('#wvForm').hidden = true; };
  $('#wvSave').onclick = () => {
    const word = $('#wvWord').value.trim();
    if (!word) { toast('Hãy nhập từ'); return; }
    const r = addWord({ lang, word, pron: $('#wvPron').value.trim(), meaning: $('#wvMean').value.trim(), sentence: $('#wvSent').value.trim() });
    toast(r === 'dup' ? 'Từ này đã có' : 'Đã lưu từ ✓'); drawList();
  };
  $('#wvArt').onchange = e => { filter.art = e.target.value; drawList(); };
  $('#wvSearch').oninput = e => { filter.q = e.target.value; const p = e.target.selectionStart; drawList(); const s = $('#wvSearch'); s.focus(); s.setSelectionRange(p, p); };
  $('#wvCards')?.addEventListener('click', () => { const n = all.filter(toCard).length; toast(n ? `Đã thêm ${n} từ vào sổ thẻ 📒` : 'Các từ này đã có trong sổ thẻ'); });
  $$('[data-say]', root).forEach(b => b.onclick = () => say(store.get('wwords', b.dataset.say)?.word, bcp));
  $$('[data-card]', root).forEach(b => b.onclick = () => { const w = store.get('wwords', b.dataset.card); toast(toCard(w) ? 'Đã thêm vào sổ thẻ 📒' : 'Từ này đã có trong sổ thẻ'); });
  $$('[data-del]', root).forEach(b => b.onclick = () => { store.del('wwords', b.dataset.del); drawList(); });
}

// thêm một từ vào sổ thẻ (kèm câu ví dụ); false nếu đã có
function toCard(w) {
  if (!w || cards.allCards(w.lang || 'zh').some(c => c.front === w.word)) return false;
  cards.addManual({ lang: w.lang || 'zh', front: w.word, back: [w.pron, w.meaning, w.sentence].filter(Boolean), title: 'Thế giới của tôi', type: 'word' });
  return true;
}

// ---------- bài kiểm tra từ vựng ----------
const e1 = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
function linesOf(words, pool, withCtx) {
  const out = [];
  for (const w of words) out.push(`T: ${e1(w.word)} | ${w.pron ? e1(w.pron) + ' | ' : ''}${e1(w.meaning || '?')}`);
  if (withCtx) {
    for (const w of words) {
      const s = w.sentence || '';
      if (!s || !s.includes(w.word) || /[\[\]]/.test(s)) continue;
      const decoys = shuffle(pool.filter(x => x.word !== w.word && !s.includes(x.word)), rngOf('d' + w.word)).slice(0, 3).map(x => e1(x.word).replace(/\//g, ' '));
      out.push(`K: ${e1(s.replace(w.word, `[${w.word}]`))} | ${decoys.join(' / ')} | ${e1(w.meaning || '')}`);
    }
  }
  return out.join('\n');
}

function drawTest() {
  const lang = getLang(), all = wordsOf(lang), arts = [...new Map(all.map(w => [w.article || '', artLabel(w)])).entries()];
  root.innerHTML = `<div class="row"><button class="btn" id="vtBack">← Từ vựng Thế giới</button><b>🧠 Kiểm tra từ vựng</b></div>
    <div class="qcard">
      <label class="dim">Lấy từ<select id="vtArt"><option value="all">Tất cả từ vựng (${all.length} từ)</option>${arts.map(([k, n]) => `<option value="${esc(k)}">${esc(n)}</option>`).join('')}</select></label>
      <div class="dim">Cách ra đề</div>
      <div class="seg" id="vtMode"><button data-m="group" class="${pk.mode === 'group' ? 'on' : ''}">🧱 Theo nhóm</button><button data-m="random" class="${pk.mode === 'random' ? 'on' : ''}">🎲 Ngẫu nhiên</button></div>
      <div class="dim" id="vtHint"></div>
      <label class="dim"><span id="vtCountLbl">Số câu của bài</span> <select id="vtCount"><option value="0">Tất cả</option>${[5, 10, 15, 20, 30, 50].map(n => `<option value="${n}" ${n === pk.count ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="dim"><input type="checkbox" id="vtCtx" ${pk.ctxq ? 'checked' : ''}> Thêm câu điền khuyết từ ngữ cảnh (câu đã lưu cùng từ)</label>
      <label class="dim"><input type="checkbox" id="vtListen" ${pk.listen ? 'checked' : ''}> Có câu nghe (máy đọc)</label>
      ${timeHtml('vtTime', 0)}
      <div class="row"><button class="btn primary big" id="vtGo">▶ Bắt đầu làm bài</button></div>
    </div>`;
  let mode = pk.mode;
  const hint = () => {
    $('#vtHint').textContent = mode === 'group' ? 'Giữ các từ theo từng bài đọc: mỗi bài là một phần riêng trên trang. Số câu bên dưới là số câu lấy ngẫu nhiên từ MỖI bài (“Tất cả” = lấy hết).' : 'Trộn câu hỏi của mọi từ đã chọn rồi lấy ngẫu nhiên. Mỗi lần làm là một đề khác nhau.';
    $('#vtCountLbl').textContent = mode === 'group' ? 'Số câu mỗi bài' : 'Số câu của bài';
  };
  hint(); wireTime(root, 'vtTime');
  $$('#vtMode button', root).forEach(b => b.onclick = () => { mode = b.dataset.m; $$('#vtMode button', root).forEach(x => x.classList.toggle('on', x === b)); hint(); });
  $('#vtBack').onclick = () => { view = 'list'; drawList(); };
  const cfg = {};
  const start = () => {
    Object.assign(cfg, { art: cfg.art ?? $('#vtArt').value, count: cfg.count ?? +$('#vtCount').value, ctx: cfg.ctx ?? $('#vtCtx').checked, listen: cfg.listen ?? $('#vtListen').checked, time: cfg.time ?? readTime(root, 'vtTime') });
    Object.assign(pk, { mode, count: cfg.count, ctxq: cfg.ctx, listen: cfg.listen });
    const words = wordsOf(lang).filter(w => cfg.art === 'all' || (w.article || '') === cfg.art);
    let sets;
    if (mode === 'group') {
      const by = new Map();
      words.forEach(w => { const k = w.article || ''; if (!by.has(k)) by.set(k, { title: artLabel(w), words: [] }); by.get(k).words.push(w); });
      sets = [...by.values()].map(x => ({ title: x.title, text: linesOf(x.words, words, cfg.ctx) }));
    } else sets = [{ title: 'Từ vựng', text: linesOf(words, words, cfg.ctx) }];
    const qs = buildTest(sets, { mode, count: cfg.count, listen: cfg.listen }, rngOf('vt' + Date.now()));
    if (!qs.length) { toast('Cần ít nhất 2 từ để ra bài kiểm tra'); return; }
    view = 'run';
    root.innerHTML = '<div class="row"><button class="btn" id="vtBack2">← Từ vựng Thế giới</button></div><div id="vtSheet"></div>';
    const back = () => { view = 'list'; runner = null; drawList(); scrollTo(0, 0); };
    $('#vtBack2').onclick = back;
    runner = runSheet($('#vtSheet'), {
      qs, lang, title: '', src: 'Từ vựng Thế giới', submitLabel: 'Hoàn thành & nộp bài', timeLimit: cfg.time,
      intro: `<div class="dim">${qs.length} câu hỏi · ${mode === 'group' ? 'theo nhóm' : 'ngẫu nhiên'}</div>${cfg.time ? '<div class="dim">Có giới hạn thời gian: hết giờ bài tự nộp.</div>' : ''}<div class="dim">Làm hết rồi bấm nút nộp bài ở cuối trang để chấm điểm.</div>`,
      onDone: r => tracker.test(r.pct), onAgain: start, onExit: back, exitLabel: '← Từ vựng Thế giới',
    });
    scrollTo(0, 0);
  };
  $('#vtGo').onclick = start;
}
