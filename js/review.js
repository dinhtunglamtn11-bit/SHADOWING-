// Màn “Ôn tập”: ôn thẻ theo lịch lặp lại ngắt quãng, sổ thẻ, và bài tập hằng ngày.
import { $, $$, esc, toast, bus, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as cards from './cards.js';
import { playClip, canPlay, say, stopClip } from './clip.js';
import { prefs, savePrefs } from './prefs.js';
import * as quiz from './quiz.js';
import * as sets from './sets.js';
import * as writing from './writing.js';
import * as mistakeui from './mistakeui.js';
import { sayable } from './tts.js';

let tab = 'cards';
let session = null; // { queue: [id], total, done, flipped, listen }
const body = () => $('#rvBody');

function dueCount() { return cards.dueList(getLang(), prefs.newPerDay || 10).length; }
function updateBadge() { $('#rvDue').textContent = dueCount() || ''; }

function setTab(t) {
  tab = t;
  $$('#rvTabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  render();
}

function render() {
  updateBadge();
  if (tab !== 'quiz') quiz.deactivate();
  if (tab === 'quiz') { quiz.render(body()); return; }
  if (tab === 'mine') { sets.render(body()); return; }
  if (tab === 'write') { writing.render(body()); return; }
  if (tab === 'mistakes') { mistakeui.render(body()); return; }
  if (tab === 'deck') { renderDeck(); return; }
  session ? renderSession() : renderHome();
}

// ---------- ôn thẻ ----------
function renderHome() {
  const lang = getLang(), n = dueCount(), all = cards.allCards(lang);
  const fresh = all.filter(c => !c.last).length, weak = all.filter(c => c.weak).length;
  body().innerHTML = `<div class="qcard">
    <div class="rvbig">${n ? `📒 ${n} thẻ cần ôn hôm nay` : '🎉 Hôm nay không còn thẻ nào cần ôn'}</div>
    <div class="dim">${all.length} thẻ ${esc(langInfo().name)} trong sổ · ${fresh} thẻ mới · ${weak} câu yếu</div>
    ${n ? `<label class="dim"><input type="checkbox" id="rvListen" ${prefs.cardListen ? 'checked' : ''}> Chế độ nghe: ẩn chữ ở mặt trước, nghe câu rồi nhớ lại (cần video có file trong máy)</label>
    <div class="row"><button class="btn primary big" id="rvStart">▶ Bắt đầu ôn</button></div>` :
    `<div class="dim">Muốn thêm thẻ: ở màn 🎧 Học bấm <b>📒 Lưu câu</b>, hoặc thêm tay ở mục <b>Sổ thẻ</b>. Câu bạn chép hoặc nói sai nhiều cũng tự vào đây.</div>`}
  </div>`;
  $('#rvStart')?.addEventListener('click', start);
  $('#rvListen')?.addEventListener('change', e => { prefs.cardListen = e.target.checked; savePrefs(); });
}

function start() {
  const q = cards.dueList(getLang(), prefs.newPerDay || 10).map(c => c.id);
  if (!q.length) return renderHome();
  session = { queue: q, total: q.length, done: 0, flipped: false, listen: !!prefs.cardListen };
  renderSession();
}

async function renderSession() {
  const s = session;
  if (!s.queue.length) {
    session = null;
    body().innerHTML = `<div class="qcard"><div class="rvbig">🎉 Xong! Bạn đã ôn ${s.done} lượt</div><div class="row"><button class="btn primary" id="rvHome">Về trang ôn thẻ</button><button class="btn" id="rvQuiz">🧩 Làm bài tập hôm nay</button></div></div>`;
    $('#rvHome').onclick = render; $('#rvQuiz').onclick = () => setTab('quiz');
    updateBadge(); return;
  }
  const id = s.queue[0], c = store.get('cards', id);
  if (!c || c.deleted) { s.queue.shift(); return renderSession(); }
  const bcp = langInfo(c.lang).bcp;
  const hasClip = c.itemId ? await canPlay(c.itemId) : false;
  if (tab !== 'cards' || session !== s) return; // đã chuyển tab hoặc thoát trong lúc chờ
  const hide = s.listen && hasClip && !s.flipped;
  const front = hide ? '<div class="dim">🎧 Nghe rồi nhớ lại câu và nghĩa</div>' : `<div class="qtext" lang="${bcp}">${sayable(c.front, c.lang)}</div>`;
  const back = s.flipped ? (hide ? '' : '') + (c.back || []).map(l => `<div class="qback" lang="${bcp}">${esc(l)}</div>`).join('') : '';
  const meta = `${c.weak ? '<span class="bad">câu yếu</span> · ' : ''}${c.reps ? `đã ôn ${c.reps} lần` : 'thẻ mới'}${c.title ? ' · ' + esc(c.title) : ''}`;
  body().innerHTML = `<div class="qprog"><span>Còn ${s.queue.length} thẻ</span><progress max="${s.total}" value="${s.done}"></progress></div>
    <div class="qcard">
      <div class="dim">${meta}</div>
      <div class="row c"><button class="btn big" id="rvPlay">🔊 ${hasClip ? 'Nghe câu' : 'Đọc to'}</button></div>
      ${front}${s.flipped && hide ? `<div class="qtext" lang="${bcp}">${sayable(c.front, c.lang)}</div>` : ''}${back}
      ${s.flipped ? `<div class="grades">${[0, 1, 2, 3].map(g => `<button class="btn g${g}" data-g="${g}"><b>${['Quên', 'Khó', 'Được', 'Dễ'][g]}</b><small>${cards.previewText(c, g)}</small><i>${g + 1}</i></button>`).join('')}</div>`
        : '<div class="row c"><button class="btn primary big" id="rvFlip">Hiện đáp án (Space)</button></div>'}
    </div>`;
  const play = () => (hasClip ? playClip(c.itemId, c.t0, c.t1, c.lang) : say(c.front, bcp));
  $('#rvPlay').onclick = play;
  if (hide || s.listen) setTimeout(play, 150);
  $('#rvFlip')?.addEventListener('click', () => { s.flipped = true; renderSession(); });
  $$('.grades [data-g]', body()).forEach(b => b.onclick = () => gradeCard(id, +b.dataset.g));
}

function gradeCard(id, g) {
  const s = session; if (!s) return;
  stopClip();
  cards.grade(id, g);
  s.queue.shift();
  if (g === 0) s.queue.push(id); // quên: ôn lại ngay trong buổi này
  else s.done++;
  s.flipped = false;
  renderSession(); updateBadge();
}

document.addEventListener('keydown', e => {
  if (document.body.dataset.view !== 'review' || tab !== 'cards' || !session || e.target.matches('input,textarea,select')) return;
  if (!session.flipped && (e.code === 'Space' || e.key === 'Enter')) { e.preventDefault(); session.flipped = true; renderSession(); }
  else if (session.flipped && /^[1-4]$/.test(e.key)) gradeCard(session.queue[0], +e.key - 1);
});

// ---------- sổ thẻ ----------
function renderDeck() {
  const lang = getLang(), list = cards.allCards(lang).sort((a, b) => a.due - b.due), now = Date.now();
  const when = c => (!c.last ? 'thẻ mới' : c.due <= now ? 'đến hạn' : 'ôn sau ' + Math.max(1, Math.ceil((c.due - now) / 864e5)) + ' ngày');
  body().innerHTML = `<div class="row"><button class="btn primary" id="dkAdd">＋ Thêm thẻ</button><span class="grow"></span><span class="dim">${list.length} thẻ ${esc(langInfo().name)}</span></div>
    <div id="dkForm" class="qcard" hidden>
      <label class="dim">Mặt trước (từ/câu)<input id="dkFront" type="text" lang="${langInfo().bcp}"></label>
      <label class="dim">Phiên âm (không bắt buộc)<input id="dkPron" type="text"></label>
      <label class="dim">Nghĩa<input id="dkMean" type="text"></label>
      <div class="row"><button class="btn primary" id="dkSave">Lưu thẻ</button><button class="btn" id="dkCancel">Hủy</button></div>
    </div>
    <div class="cards">${list.length ? list.map(c => `<div class="card" style="cursor:default"><div class="ci"><b lang="${langInfo(c.lang).bcp}" style="white-space:normal">${sayable(c.front, c.lang)}</b><span class="dim">${esc((c.back || []).join(' · '))}</span><span class="dim">${c.weak ? '<span class="bad">câu yếu</span> · ' : ''}${when(c)}${c.title ? ' · ' + esc(c.title) : ''}</span></div><button class="btn" data-del="${c.id}" title="Xóa thẻ">🗑</button></div>`).join('')
      : '<div class="empty">Chưa có thẻ nào. Bấm “＋ Thêm thẻ”, hoặc ở màn 🎧 Học bấm “📒 Lưu câu”.</div>'}</div>`;
  $('#dkAdd').onclick = () => { $('#dkForm').hidden = false; $('#dkFront').focus(); };
  $('#dkCancel').onclick = () => { $('#dkForm').hidden = true; };
  $('#dkSave').onclick = () => {
    const front = $('#dkFront').value.trim();
    if (!front) { toast('Hãy nhập mặt trước của thẻ'); return; }
    cards.addManual({ lang, front, back: [$('#dkPron').value.trim(), $('#dkMean').value.trim()] });
    toast('Đã thêm thẻ'); renderDeck(); updateBadge();
  };
  $$('[data-del]', body()).forEach(b => b.onclick = () => { if (confirm('Xóa thẻ này?')) { cards.remove(b.dataset.del); renderDeck(); updateBadge(); } });
}

export function init() {
  writing.init();
  $('#rvTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setTab(b.dataset.t); });
  document.addEventListener('review-tab', e => setTab(e.detail));
  $('#ttsRate').value = String(prefs.ttsRate || 0.9);
  $('#ttsRate').onchange = e => { prefs.ttsRate = parseFloat(e.target.value) || 0.9; savePrefs(); };
  bus.on('prefs', () => { $('#ttsRate').value = String(prefs.ttsRate || 0.9); });
  bus.on('show', v => { if (v === 'review') render(); else updateBadge(); });
  bus.on('lang', () => { session = null; mistakeui.reset(); if (document.body.dataset.view === 'review') render(); updateBadge(); });
  bus.on('store', c => { if (c === 'cards' || c === 'items' || c === '*') { updateBadge(); if (document.body.dataset.view === 'review' && tab === 'deck') renderDeck(); } });
  updateBadge();
}
