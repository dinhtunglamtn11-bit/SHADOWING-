// Chạm vào chữ Hán để tra nghĩa (từ điển offline) và thêm từ vào sổ thẻ.
// Bật bằng nút "Tra từ" (ở màn Học và màn Soạn). Khi bật, chạm chữ Hán trong phụ đề, danh sách câu, ghi chú, tài liệu, bài tập là hiện khung tra.
import { $, $$, esc, toast, getLang } from './util.js';
import * as dict from './dict.js';
import { say } from './tts.js';
import * as cards from './cards.js';

const BLOCK = '#now .l1, #cueList .cue .m, #nPreview, #docBody, .qtext, .qback, .qexp, #rvBody .rvbig';
const HAN = /\p{Script=Han}/u;
let on = false, cur = null;

function setOn(v) {
  on = v;
  try { localStorage.setItem('lookup', v ? '1' : '0'); } catch { /* bỏ qua */ }
  document.body.classList.toggle('lookup', v);
  $$('[data-lookup]').forEach(b => b.classList.toggle('on', v));
  if (!v) { hide(); return; }
  if (!dict.ready()) {
    toast('Đang tải từ điển (khoảng 9 MB, chỉ lần đầu)…', 3500);
    dict.loadDict().then(() => toast('Từ điển đã sẵn sàng'), e => toast('Không tải được từ điển: ' + e.message, 5000));
  } else toast('Chạm vào chữ Hán để tra nghĩa', 2500);
}

const hide = () => { $('#lkPop').hidden = true; cur = null; };

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
function pick(blk, x, y) {
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
  return k >= 0 && k < text.length && HAN.test(text[k]) ? { text, k } : null;
}

const SKIP_GLOSS = /^(CL:|surname |variant of|old variant of|see also|see |abbr\. for|also written|erhua variant)/i;
function meaning(entry) {
  const g = dict.glosses(entry[3]);
  const good = g.filter(x => !SKIP_GLOSS.test(x));
  return (good.length ? good : g).slice(0, 3).join('; ');
}

function renderPop() {
  const { cands, sel } = cur, c = cands[sel];
  const ents = c.entries.slice(0, 4);
  $('#lkWord').textContent = c.word;
  $('#lkPy').textContent = dict.pinyinMarks(ents[0][2]);
  $('#lkCands').innerHTML = cands.length > 1 ? cands.map((x, i) => `<button class="chip ${i === sel ? 'on' : ''}" data-i="${i}" lang="zh-CN">${esc(x.word)}</button>`).join('') : '';
  $('#lkBody').innerHTML = ents.map(e => `<div class="lkent"><b>${esc(dict.pinyinMarks(e[2]))}</b>${e[1] !== e[0] ? ` <span class="dim" lang="zh-CN">(${esc(e[1])})</span>` : ''}
    <ol>${dict.glosses(e[3]).slice(0, 6).map(g => `<li>${esc(g)}</li>`).join('')}</ol></div>`).join('') + (c.entries.length > 4 ? `<div class="dim">… +${c.entries.length - 4}</div>` : '');
  $('#lkMean').value = meaning(ents[0]);
}

function open(cands, x, y) {
  cur = { cands, sel: 0 };
  const pop = $('#lkPop');
  pop.hidden = false;
  renderPop();
  const narrow = matchMedia('(max-width: 800px)').matches;
  pop.style.left = pop.style.top = pop.style.right = pop.style.bottom = '';
  if (!narrow) { // đặt gần chỗ chạm, không tràn màn hình
    const w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(innerWidth - w - 8, x - w / 2)) + 'px';
    pop.style.top = Math.max(8, Math.min(innerHeight - h - 8, y + 22 + h > innerHeight ? y - h - 22 : y + 22)) + 'px';
  }
}

async function onTap(e) {
  if (!on || getLang() !== 'zh') return;
  if (e.target.closest('#lkPop,button,a,input,textarea,select,dialog')) return;
  const blk = e.target.closest(BLOCK);
  if (!blk) return;
  const p = pick(blk, e.clientX, e.clientY);
  if (!p) { hide(); return; }
  e.preventDefault(); e.stopPropagation(); // không tua video / phát tiếng khi đang tra từ
  if (!dict.ready()) {
    try { toast('Đang tải từ điển…', 2000); await dict.loadDict(); } catch (err) { toast('Không tải được từ điển: ' + err.message, 5000); return; }
  }
  const cands = dict.candidatesAt(p.text, p.k);
  if (!cands.length) { toast(`Không có “${p.text[p.k]}” trong từ điển`, 2500); return; }
  open(cands, e.clientX, e.clientY);
}

export function init() {
  try { on = localStorage.getItem('lookup') === '1'; } catch { on = false; }
  document.body.classList.toggle('lookup', on);
  $$('[data-lookup]').forEach(b => { b.classList.toggle('on', on); b.onclick = () => setOn(!on); });
  document.addEventListener('click', onTap, true);
  $('#lkClose').onclick = hide;
  $('#lkCands').onclick = e => { const b = e.target.closest('[data-i]'); if (b && cur) { cur.sel = +b.dataset.i; renderPop(); } };
  $('#lkSay').onclick = () => cur && say(cur.cands[cur.sel].word, 'zh-CN');
  $('#lkAdd').onclick = () => {
    if (!cur) return;
    const c = cur.cands[cur.sel], e = c.entries[0], front = e[0];
    if (cards.allCards('zh').some(x => x.front === front)) { toast('Từ này đã có trong sổ thẻ'); return; }
    cards.addManual({ lang: 'zh', front, back: [dict.pinyinMarks(e[2]), $('#lkMean').value.trim() || meaning(e)], title: 'Từ điển', type: 'word' });
    toast(`Đã thêm “${front}” vào sổ thẻ 📒`);
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && cur) hide(); });
  if (on) dict.loadDict().catch(() => {});
}
