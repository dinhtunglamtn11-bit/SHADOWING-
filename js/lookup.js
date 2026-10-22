// Chạm vào chữ để tra nghĩa và thêm từ vào sổ thẻ.
// Bật bằng nút "Tra từ" (ở màn Học và màn Soạn). Khi bật, chạm chữ trong phụ đề, danh sách câu, ghi chú, tài liệu, bài tập là hiện khung tra.
//  - Tiếng Trung: từ điển CC-CEDICT chạy offline (dict.js).
//  - Tiếng Anh / Nhật / Hàn: Wiktionary tiếng Anh (wikt.js), cần mạng ở lần tra đầu của mỗi từ, sau đó được lưu lại trong máy.
import { $, $$, esc, toast, getLang, langInfo, bus } from './util.js';
import * as dict from './dict.js';
import * as wikt from './wikt.js';
import { say } from './tts.js';
import * as cards from './cards.js';
import * as store from './store.js';
import * as wvocab from './wvocab.js';

const BLOCK = '#now .l1, #cueList .cue .m, #nPreview, #docBody, .qtext, .qback, .qexp, #rvBody .rvbig, .nw-text, .nw-ttl';
// ký tự nào của từng ngôn ngữ thì chạm vào mới tra
const IS = {
  zh: /\p{Script=Han}/u,
  ja: /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]/u,
  ko: /[\p{Script=Hangul}\p{Script=Han}]/u,
  en: /\p{L}/u,
};
const SRC_ZH = 'Từ điển CC-CEDICT (CC BY-SA 4.0), nghĩa tiếng Anh.';
const SRC_WK = 'Wiktionary tiếng Anh (CC BY-SA 4.0), nghĩa tiếng Anh. Cần mạng ở lần tra đầu, từ đã tra được lưu lại trong máy.';
let on = false, cur = null, seq = 0;

function setOn(v) {
  on = v;
  try { localStorage.setItem('lookup', v ? '1' : '0'); } catch { /* bỏ qua */ }
  document.body.classList.toggle('lookup', v);
  $$('[data-lookup]').forEach(b => b.classList.toggle('on', v));
  if (!v) { hide(); return; }
  if (getLang() !== 'zh') { toast('Chạm vào từ để tra nghĩa (cần có mạng ở lần tra đầu của mỗi từ)', 3000); return; }
  if (!dict.ready()) {
    toast('Đang tải từ điển (khoảng 9 MB, chỉ lần đầu)…', 3500);
    dict.loadDict().then(() => toast('Từ điển đã sẵn sàng'), e => toast('Không tải được từ điển: ' + e.message, 5000));
  } else toast('Chạm vào chữ Hán để tra nghĩa', 2500);
}

const hide = () => { seq++; $('#lkPop').hidden = true; cur = null; };

function textNodes(blk) {
  const w = document.createTreeWalker(blk, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement.closest('.pxe,.spk') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
  const out = []; for (let n = w.nextNode(); n; n = w.nextNode()) out.push(n);
  return out;
}
function caretAt(x, y) {
  if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); return p && { node: p.offsetNode, offset: p.offset }; }
  const r = document.caretRangeFromPoint?.(x, y);
  return r && { node: r.startContainer, offset: r.startOffset };
}
function charRect(nodes, k) {
  let acc = 0;
  for (const n of nodes) {
    const L = n.nodeValue.length;
    if (k < acc + L) { const r = document.createRange(); r.setStart(n, k - acc); r.setEnd(n, k - acc + 1); return r.getBoundingClientRect(); }
    acc += L;
  }
  return null;
}

// Chữ nào ở vị trí chạm? (trả về chuỗi gốc + chỉ số)
function pick(blk, x, y, lang) {
  const hit = caretAt(x, y);
  if (!hit || !blk.contains(hit.node)) return null;
  const nodes = textNodes(blk), text = nodes.map(n => n.nodeValue).join('');
  let acc = 0, idx = -1;
  for (const n of nodes) { if (n === hit.node) { idx = acc + hit.offset; break; } acc += n.nodeValue.length; }
  if (idx < 0) return null;
  let k = idx;
  for (const c of [idx, idx - 1]) { // caret nằm giữa hai chữ: chọn chữ chứa điểm chạm
    if (c < 0 || c >= text.length) continue;
    const r = charRect(nodes, c);
    if (r && x >= r.left - 3 && x <= r.right + 3 && y >= r.top - 3 && y <= r.bottom + 3) { k = c; break; }
  }
  return k >= 0 && k < text.length && IS[lang].test(text[k]) ? { text, k } : null;
}

const SKIP_GLOSS = /^(CL:|surname |variant of|old variant of|see also|see |abbr\. for|also written|erhua variant)/i;
function meaning(entry) {
  const g = dict.glosses(entry[3]);
  const good = g.filter(x => !SKIP_GLOSS.test(x));
  return (good.length ? good : g).slice(0, 3).join('; ');
}

// Từ đang hiện trong khung: chữ, phiên âm, nghĩa gợi ý, ngôn ngữ, giọng đọc
function curWord() {
  if (!cur) return null;
  if (cur.wk) {
    const e = cur.ent?.[cur.words?.[cur.sel]];
    return e ? { lang: cur.lang, word: e.word, pron: e.pron, meaning: wikt.shortMeaning(e), say: e.word, bcp: langInfo(cur.lang).bcp } : null;
  }
  const c = cur.cands[cur.sel], e = c.entries[0];
  return { lang: 'zh', word: e[0], pron: dict.pinyinMarks(e[2]), meaning: meaning(e), say: c.word, bcp: 'zh-CN' };
}

function renderZh() {
  const { cands, sel } = cur, c = cands[sel];
  const ents = c.entries.slice(0, 4);
  $('#lkWord').lang = 'zh-CN';
  $('#lkPy').removeAttribute('data-ipa');
  $('#lkWord').textContent = c.word;
  $('#lkPy').textContent = dict.pinyinMarks(ents[0][2]);
  $('#lkCands').innerHTML = cands.length > 1 ? cands.map((x, i) => `<button class="chip ${i === sel ? 'on' : ''}" data-i="${i}" lang="zh-CN">${esc(x.word)}</button>`).join('') : '';
  $('#lkBody').innerHTML = ents.map(e => `<div class="lkent"><b>${esc(dict.pinyinMarks(e[2]))}</b>${e[1] !== e[0] ? ` <span class="dim" lang="zh-CN">(${esc(e[1])})</span>` : ''}
    <ol>${dict.glosses(e[3]).slice(0, 6).map(g => `<li>${esc(g)}</li>`).join('')}</ol></div>`).join('') + (c.entries.length > 4 ? `<div class="dim">… +${c.entries.length - 4}</div>` : '');
  $('#lkMean').value = meaning(ents[0]);
  $('#lkSrc').textContent = SRC_ZH;
}

function renderWk() {
  const { lang, words = [], sel = 0 } = cur, bcp = langInfo(lang).bcp, w = curWord();
  $('#lkSrc').textContent = SRC_WK;
  $('#lkWord').lang = bcp;
  $('#lkPy').toggleAttribute('data-ipa', lang === 'en'); // phông pixel không có ký hiệu IPA
  $('#lkCands').innerHTML = words.length > 1 ? words.slice(0, 8).map((x, i) => `<button class="chip ${i === sel ? 'on' : ''}" data-i="${i}" lang="${bcp}">${esc(x)}</button>`).join('') : '';
  if (!w) { // chưa có kết quả: đang tra / không có / không có mạng
    $('#lkWord').textContent = cur.shown || '';
    $('#lkPy').textContent = '';
    $('#lkMean').value = '';
    $('#lkBody').innerHTML = `<div class="dim">${cur.loading ? 'Đang tra…' : cur.fail ? 'Không tra được: từ này chưa có trong máy và đang không có mạng.' : 'Không có mục từ này trong Wiktionary. Thử chạm vào chữ khác trong từ.'}</div>`;
    return;
  }
  const e = cur.ent[words[sel]];
  $('#lkWord').textContent = e.word;
  $('#lkPy').textContent = e.pron;
  $('#lkBody').innerHTML = e.sections.map(s => `<div class="lkent">${s.pos ? `<b>${esc(s.pos)}</b>` : ''}<ol>${s.defs.slice(0, 6).map(g => `<li>${esc(g)}</li>`).join('')}</ol></div>`).join('');
  $('#lkMean').value = w.meaning;
}

const renderPop = () => (cur.wk ? renderWk() : renderZh());

function open(init, x, y) {
  cur = { sel: 0, ...init };
  const pop = $('#lkPop');
  pop.hidden = false;
  $('#lkWorld').hidden = !init.aid; // chỉ khi đang đọc một bài ở Thế giới của tôi
  renderPop();
  const narrow = matchMedia('(max-width: 800px)').matches;
  pop.style.left = pop.style.top = pop.style.right = pop.style.bottom = '';
  if (!narrow) { // đặt gần chỗ chạm, không tràn màn hình
    const w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(innerWidth - w - 8, x - w / 2)) + 'px';
    pop.style.top = Math.max(8, Math.min(innerHeight - h - 8, y + 22 + h > innerHeight ? y - h - 22 : y + 22)) + 'px';
  }
}

// Anh / Nhật / Hàn: mở khung ngay (đang tra…), có kết quả thì điền vào
async function tapWiki(lang, p, x, y, ctx) {
  const my = ++seq;
  open({ wk: true, lang, loading: true, shown: wikt.candidates(lang, p.text, p.k)[0] || p.text[p.k], ...ctx }, x, y);
  let r = null, fail = false;
  try { r = await wikt.resolve(lang, p.text, p.k); } catch { fail = true; }
  if (my !== seq || !cur) return; // đã chạm chữ khác hoặc đã đóng khung
  Object.assign(cur, r ? { ...r, loading: false } : { loading: false, fail });
  renderPop();
}

async function onTap(e) {
  if (!on) return;
  const lang = getLang();
  if (!IS[lang]) return;
  if (e.target.closest('#lkPop,button,a,input,textarea,select,dialog')) return;
  const blk = e.target.closest(BLOCK);
  if (!blk) return;
  const p = pick(blk, e.clientX, e.clientY, lang);
  if (!p) { hide(); return; }
  e.preventDefault(); e.stopPropagation(); // không tua video / phát tiếng khi đang tra từ
  const aid = blk.closest('#vWorld')?.querySelector('[data-aid]')?.dataset.aid || '';
  const ctx = { aid, sentence: aid ? wvocab.sentenceAt(p.text, p.k, lang !== 'zh') : '' };
  if (lang !== 'zh') { tapWiki(lang, p, e.clientX, e.clientY, ctx); return; }
  if (!dict.ready()) {
    try { toast('Đang tải từ điển…', 2000); await dict.loadDict(); } catch (err) { toast('Không tải được từ điển: ' + err.message, 5000); return; }
  }
  const cands = dict.candidatesAt(p.text, p.k);
  if (!cands.length) { toast(`Không có “${p.text[p.k]}” trong từ điển`, 2500); return; }
  seq++;
  open({ cands, ...ctx }, e.clientX, e.clientY);
}

async function pickCand(e) {
  const b = e.target.closest('[data-i]');
  if (!b || !cur) return;
  const i = +b.dataset.i;
  if (!cur.wk) { cur.sel = i; renderPop(); return; }
  const now = cur, w = now.words[i];
  if (!now.ent[w]) { // ứng viên chưa nạp: tra khi bấm vào
    try { now.ent[w] = await wikt.entry(now.lang, w); } catch { toast('Không tra được: đang không có mạng'); return; }
    if (cur !== now) return;
    if (!now.ent[w]) {
      now.words.splice(i, 1);
      now.sel = Math.min(now.sel, now.words.length - 1);
      toast(`Không có mục từ “${w}”`, 2500);
      renderPop();
      return;
    }
  }
  now.sel = i; renderPop();
}

export function init() {
  try { on = localStorage.getItem('lookup') === '1'; } catch { on = false; }
  document.body.classList.toggle('lookup', on);
  $$('[data-lookup]').forEach(b => { b.classList.toggle('on', on); b.onclick = () => setOn(!on); });
  document.addEventListener('click', onTap, true);
  bus.on('lang', hide);
  $('#lkClose').onclick = hide;
  $('#lkCands').onclick = pickCand;
  $('#lkSay').onclick = () => { const w = curWord(); if (w) say(w.say, w.bcp); };
  $('#lkAdd').onclick = () => {
    const w = curWord();
    if (!w) return;
    if (cards.allCards(w.lang).some(x => x.front === w.word)) { toast('Từ này đã có trong sổ thẻ'); return; }
    cards.addManual({ lang: w.lang, front: w.word, back: [w.pron, $('#lkMean').value.trim() || w.meaning, cur.sentence].filter(Boolean), title: 'Từ điển', type: 'word' });
    toast(`Đã thêm “${w.word}” vào sổ thẻ 📒`);
  };
  $('#lkWorld').onclick = () => {
    const w = curWord();
    if (!w) return;
    const a = store.get('articles', cur.aid);
    const r = wvocab.addWord({ lang: w.lang, word: w.word, pron: w.pron, meaning: $('#lkMean').value.trim() || w.meaning, sentence: cur.sentence, article: cur.aid, title: a?.title || '' });
    toast(r === 'dup' ? 'Từ này đã có trong từ vựng Thế giới' : `Đã lưu “${w.word}” vào từ vựng Thế giới 🌍`);
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && cur) hide(); });
  if (on && getLang() === 'zh') dict.loadDict().catch(() => {});
}
