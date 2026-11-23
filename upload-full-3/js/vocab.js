// Tự rút từ vựng từ phụ đề của video đang mở (tiếng Trung): liệt kê từ, chọn rồi thêm hàng loạt vào sổ thẻ.
import { $, $$, esc, toast, getLang } from './util.js';
import * as dict from './dict.js';
import * as cards from './cards.js';
import * as store from './store.js';
import { currentCues, currentItemId, currentLang } from './player.js';

let rows = [], shown = [];

const SKIP_GLOSS = /^(CL:|surname |variant of|old variant of|see also|see |abbr\. for|also written|erhua variant)/i;
const meaningOf = e => { const g = dict.glosses(e[3]), good = g.filter(x => !SKIP_GLOSS.test(x)); return (good.length ? good : g).slice(0, 3).join('; '); };

async function analyse() {
  const cues = currentCues();
  if (!currentItemId() || !cues.length) { $('#vocList').innerHTML = ''; $('#vocStat').textContent = 'Hãy mở một video có phụ đề trước.'; return; }
  if (currentLang() !== 'zh') { $('#vocList').innerHTML = ''; $('#vocStat').textContent = 'Tính năng này hiện chỉ dành cho tiếng Trung.'; return; }
  $('#vocStat').textContent = 'Đang tải từ điển…';
  try { await dict.loadDict(); } catch (e) { $('#vocStat').textContent = 'Không tải được từ điển: ' + e.message; return; }
  const freq = new Map(), first = new Map();
  cues.forEach((c, i) => { for (const w of dict.segmentWords(c.lines[0] || '')) { freq.set(w, (freq.get(w) || 0) + 1); if (!first.has(w)) first.set(w, i); } });
  rows = [...freq].map(([w, n]) => {
    const e = dict.lookup(w)[0];
    return { w, n, at: first.get(w), py: dict.pinyinMarks(e[2]), mean: meaningOf(e), proper: /^surname /i.test(dict.glosses(e[3])[0] || '') };
  });
  render();
}

function render() {
  const have = new Set(cards.allCards('zh').map(c => c.front));
  const hideHave = $('#vocHave').checked, min2 = $('#vocMin2').checked;
  shown = rows.filter(r => !(hideHave && have.has(r.w)) && !(min2 && [...r.w].length < 2) && !r.proper)
    .sort((a, b) => b.n - a.n || a.at - b.at).slice(0, 400);
  $('#vocStat').textContent = `${shown.length} từ (từ ${rows.length} từ khác nhau trong video).`;
  $('#vocList').innerHTML = shown.map((r, i) => `<label class="vocrow"><input type="checkbox" data-i="${i}" ${r.n >= 2 || i < 30 ? 'checked' : ''}>
    <b lang="zh-CN">${esc(r.w)}</b><span class="vpy">${esc(r.py)}</span><span class="vmean dim">${esc(r.mean)}</span><span class="vn dim">×${r.n}</span></label>`).join('');
  count();
}

const checked = () => $$('#vocList input:checked').map(x => shown[+x.dataset.i]);
function count() { const n = checked().length; $('#vocAdd').textContent = `＋ Thêm ${n} từ vào thẻ`; $('#vocAdd').disabled = !n; }

export function init() {
  const dlg = $('#vocDlg');
  $('#btnVocab').onclick = () => { dlg.showModal(); analyse(); };
  $('#vocClose').onclick = () => dlg.close();
  $('#vocHave').onchange = $('#vocMin2').onchange = render;
  $('#vocList').onchange = count;
  $('#vocAll').onclick = () => { $$('#vocList input').forEach(x => { x.checked = true; }); count(); };
  $('#vocNone').onclick = () => { $$('#vocList input').forEach(x => { x.checked = false; }); count(); };
  $('#vocAdd').onclick = () => {
    const withMean = $('#vocMean').checked, title = store.get('items', currentItemId())?.title || 'Từ vựng';
    const list = checked(); let n = 0;
    for (const r of list) { cards.addManual({ lang: 'zh', front: r.w, back: [r.py, withMean ? r.mean : ''], title, type: 'word' }); n++; }
    toast(`Đã thêm ${n} từ vào sổ thẻ 📒`);
    render();
  };
}
