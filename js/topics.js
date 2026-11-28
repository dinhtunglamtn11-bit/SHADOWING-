// Thế giới của tôi → 🎯 Topics: tự nạp một loạt chủ đề, mỗi ngày (giờ Việt Nam) quay ra một chủ đề, tìm hiểu 15 hoặc 30 phút,
// dán nội dung tìm được vào rồi tự chấm điểm. Chủ đề dùng chung cho mọi ngôn ngữ.
// Dữ liệu (đồng bộ, xóa vào Thùng rác): 'topics' = danh sách chủ đề; 'topiclogs' = mỗi ngày một bài, mã tài liệu là ngày (YYYY-MM-DD).
// Đồng hồ lưu mốc kết thúc (endAt) nên rời màn, tắt màn hình hay đóng app rồi mở lại vẫn đúng.
import { $, $$, esc, toast, uid, bus, vnDate } from './util.js';
import * as store from './store.js';
import * as sfx from './sfx.js';
import * as art from './topicart.js';

// tắt hiệu ứng khi chọn “Hiệu ứng chuyển động: Tắt” hoặc hệ điều hành bật “giảm chuyển động”
const still = () => document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches;
const CONFETTI = ['#ffd84d', '#ff8f3a', '#5fd068', '#7ec3ff', '#ff8fc0', '#a98bff'];
function confetti(host, n = 26) { // mảnh giấy màu bung ra từ giữa khung rồi rơi
  if (!host || still()) return;
  const box = document.createElement('div');
  box.className = 'tp-confetti'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.5, d = 60 + Math.random() * 110;
    return `<i style="--dx:${Math.round(Math.cos(a) * d)}px;--dy:${Math.round(Math.sin(a) * d * 0.7 - 30)}px;--r:${Math.round(Math.random() * 540)}deg;--c:${CONFETTI[i % CONFETTI.length]};--t:${Math.round(Math.random() * 160)}ms"></i>`;
  }).join('');
  host.appendChild(box);
  setTimeout(() => box.remove(), 1700);
}
function starBurst(btn) {
  if (!btn || still()) return;
  const box = document.createElement('span');
  box.className = 'tp-stars'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = Array.from({ length: 6 }, (_, i) => `<i style="--dx:${Math.round(Math.cos(i * 1.05) * 34)}px;--dy:${Math.round(Math.sin(i * 1.05) * 30 - 12)}px">${art.sparkle()}</i>`).join('');
  btn.appendChild(box);
  setTimeout(() => box.remove(), 800);
}
const twinkles = () => `<span class="tp-tw" aria-hidden="true">${[1, 2, 3, 4].map(i => `<i class="s${i}">${art.sparkle()}</i>`).join('')}</span>`;

const DURS = [15, 30];
let root = null, bar = null, bindBar = null;
let listOpen = false, editId = '', shown = 30, spinning = 0;
const openLogs = new Set(); // bài cũ đang mở trong lịch sử
let draft = null, draftT = 0; // nội dung đang gõ, chưa kịp lưu: { id, patch }
let drawnSig = ''; // dấu vân tay dữ liệu đang hiện: chỉ vẽ lại khi nơi khác đổi dữ liệu
const sig = () => JSON.stringify([topics().map(x => [x.id, x.name]), logs().map(l => [l.id, l.name, l.score, l.doneAt, l.content, l.note, l.endAt, l.left, l.timerDone, l.dur])]);

const topics = () => store.list('topics').sort((a, b) => (a.created || 0) - (b.created || 0));
const logs = () => store.list('topiclogs').sort((a, b) => b.date.localeCompare(a.date));
const logOf = date => { const l = store.get('topiclogs', date); return l && !l.deleted ? { id: date, ...l } : null; };
const key = s => String(s || '').trim().toLowerCase();
const dmy = d => `${d.slice(8)}/${d.slice(5, 7)}/${d.slice(0, 4)}`;
const getDur = () => { try { return localStorage.getItem('topicDur') === '30' ? 30 : 15; } catch { return 15; } };
const setDur = n => { try { localStorage.setItem('topicDur', String(n)); } catch { /* bỏ qua */ } };
const onScreen = () => !!root && document.body.dataset.view === 'world' && document.body.dataset.wsec === 'topics' && !!$('#tpRoot', root);

// ---------- nhập danh sách ----------
// mỗi dòng một chủ đề; bỏ dấu đầu dòng (-, •, *) và số thứ tự (1. 2)); trùng tên thì bỏ qua
export function parseTopics(text) {
  return String(text || '').split('\n').map(l => l.replace(/^\s*(?:[-•*+–]\s+|\d{1,3}[.)、]\s*)/, '').replace(/\s+/g, ' ').trim().slice(0, 200)).filter(Boolean);
}
function addTopics(text) {
  const have = new Set(topics().map(t => key(t.name)));
  let added = 0, dup = 0;
  const now = Date.now();
  parseTopics(text).forEach((name, i) => {
    if (have.has(key(name))) { dup++; return; }
    have.add(key(name)); added++;
    store.put('topics', uid(), { name, created: now + i, deleted: false });
  });
  return { added, dup };
}

// ---------- quay chủ đề ----------
export function draw(today = vnDate()) {
  const have = logOf(today);
  if (have) return have; // đã quay hôm nay: luôn là chủ đề đó
  const all = topics();
  if (!all.length) return null;
  const prev = logs().find(l => l.date < today); // chủ đề lần quay gần nhất trước hôm nay
  let pool = all.filter(t => !prev || (t.id !== prev.topic && key(t.name) !== key(prev.name)));
  if (!pool.length) pool = all;
  const t = pool[Math.floor(Math.random() * pool.length)];
  store.put('topiclogs', today, { date: today, topic: t.id, name: t.name, drawn: Date.now(), dur: getDur(), endAt: 0, left: 0, timerDone: 0, content: '', score: 0, note: '', doneAt: 0, deleted: false, deletedAt: 0, purged: false });
  return logOf(today);
}
// Màn quay: máy rung → tên chủ đề lướt chậm dần → viên nang rơi, lật ra chủ đề. Kết quả đã lưu từ trước; chạm để bỏ qua.
const stopSpin = () => { clearTimeout(spinning); spinning = 0; };
function spin(final) {
  const card = $('.tp-card', root), names = topics().map(t => t.name);
  if (!card || still()) return;
  stopSpin();
  const ov = document.createElement('div');
  ov.className = 'tp-draw';
  ov.innerHTML = `<div class="tp-gacha">${art.machine()}<div class="tp-drop">${art.capsule()}</div></div>
    <div class="tp-roll"><span class="tp-u">?</span></div><small class="dim">Chạm để bỏ qua</small>`;
  card.appendChild(ov);
  const close = () => { stopSpin(); ov.classList.add('out'); setTimeout(() => ov.remove(), 250); };
  ov.onclick = close;
  const roll = $('.tp-roll span', ov);
  let n = 0;
  const reveal = () => {
    if (!ov.isConnected) return stopSpin();
    ov.classList.add('reveal');
    ov.innerHTML = `${twinkles()}<div class="tp-flip">${art.field(final)}<b class="tp-u">${esc(final)}</b></div>`;
    confetti(ov, 34); sfx.play('reward');
    spinning = setTimeout(close, 1600);
  };
  const step = () => {
    if (!ov.isConnected) return stopSpin();
    if (++n > 18) { ov.classList.add('drop'); spinning = setTimeout(reveal, 650); return; }
    roll.textContent = names[(Math.floor(Math.random() * names.length) + n) % names.length];
    roll.parentElement.classList.toggle('alt', n % 2 === 0);
    spinning = setTimeout(step, 60 + n * n * 0.55);
  };
  spinning = setTimeout(step, 500);
}

// ---------- đồng hồ ----------
const leftMs = l => (l.endAt ? Math.max(0, l.endAt - Date.now()) : l.left || (l.dur || 15) * 60000);
const mmss = ms => { const s = Math.ceil(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
const fracLeft = l => leftMs(l) / ((l.dur || 15) * 60000);
// đồng hồ cát chỉ vẽ lại khi mực cát đổi (để hạt cát đang rơi không bị giật)
const glassHtml = l => { const level = Math.round(fracLeft(l) * 14); return `<div class="tp-glass" id="tpGlass" data-level="${level}">${art.hourglass(level / 14, !!l.endAt)}</div>`; };
function updateRun(l) {
  const clock = $('#tpClock', root), glass = $('#tpGlass', root), fill = $('#tpFill', root);
  if (clock) clock.textContent = mmss(leftMs(l));
  if (glass && +glass.dataset.level !== Math.round(fracLeft(l) * 14)) glass.outerHTML = glassHtml(l);
  if (fill) fill.style.width = `${(100 * (1 - fracLeft(l))).toFixed(2)}%`;
  $('.tp-timer', root)?.classList.toggle('last', leftMs(l) <= 60000);
}
function timerHtml(l) {
  if (l.timerDone) return `<div class="tp-timer done"><div class="tp-ring">${art.alarm()}</div><b>Đã tìm hiểu đủ ${l.dur} phút</b><button class="btn" data-tp="reset">↺ Chạy lại</button></div>`;
  const running = !!l.endAt, paused = !running && l.left > 0;
  return `<div class="tp-timer ${running ? 'run' : ''} ${paused ? 'paused' : ''} ${running && leftMs(l) <= 60000 ? 'last' : ''}">
    <div class="seg" id="tpDur">${DURS.map(n => `<button data-tp="dur" data-n="${n}" class="${(l.dur || 15) === n ? 'on' : ''}" ${running || paused ? 'disabled' : ''}>${n} phút</button>`).join('')}</div>
    <div class="tp-face">${glassHtml(l)}<div class="tp-clock" id="tpClock">${mmss(leftMs(l))}</div></div>
    <div class="prog tp-bar"><i id="tpFill" style="width:${(100 * (1 - fracLeft(l))).toFixed(2)}%"></i></div>
    <div class="row c">${running ? '<button class="btn" data-tp="pause">⏸ Tạm dừng</button>' : `<button class="btn primary" data-tp="start">▶ ${paused ? 'Tiếp tục' : 'Bắt đầu tìm hiểu'}</button>`}${running || paused ? '<button class="btn" data-tp="reset">↺ Đặt lại</button>' : ''}</div></div>`;
}
function tick() {
  const now = Date.now();
  for (const l of store.list('topiclogs')) {
    if (!l.endAt || l.timerDone || l.endAt > now) continue;
    store.put('topiclogs', l.id, { timerDone: l.endAt, endAt: 0, left: 0 });
    sfx.play('reward');
    try { if (navigator.userActivation?.hasBeenActive) navigator.vibrate?.([200, 100, 200]); } catch { /* bỏ qua */ }
    toast(`⏰ Hết ${l.dur} phút tìm hiểu. Ghi lại những gì bạn tìm được nhé!`, 6000);
    refreshTimer();
    if (onScreen()) confetti($('.tp-card', root), 34);
    drawnSig = sig();
  }
  if (!onScreen()) return;
  const l = logOf(vnDate());
  if (l?.endAt) updateRun(l);
  if ($('#tpRoot', root).dataset.day !== vnDate() && !isTyping()) redraw(); // sang ngày mới khi đang mở màn này
}
function refreshTimer() {
  if (!onScreen()) return;
  const box = $('#tpTimer', root), l = logOf($('#tpRoot', root).dataset.day);
  if (box && l) box.innerHTML = timerHtml(l);
}

// ---------- bài viết ----------
function editorHtml(l) {
  return `<div class="tp-edit" data-log="${l.id}">
    <label class="tp-lb" for="tpC-${l.id}">Nội dung bạn tìm được</label>
    <textarea id="tpC-${l.id}" class="tp-content" rows="10" placeholder="Dán hoặc gõ những gì bạn vừa tìm hiểu được…">${esc(l.content || '')}</textarea>
    <div class="tp-lbrow"><span class="tp-lb">Tự chấm điểm (1–10)</span><span class="tp-mood">${l.score ? art.mood(l.score) : ''}</span></div>
    <div class="tp-scores">${Array.from({ length: 10 }, (_, i) => `<button class="btn ${l.score === i + 1 ? 'primary on' : ''}" data-tp="score" data-n="${i + 1}" aria-pressed="${l.score === i + 1}">${i + 1}</button>`).join('')}</div>
    <input class="tp-note" type="text" maxlength="300" value="${esc(l.note || '')}" placeholder="Nhận xét ngắn (không bắt buộc)">
    <div class="row"><button class="btn primary" data-tp="save">✅ Lưu bài</button></div></div>`;
}
function viewHtml(l) {
  return `<div class="tp-view" data-log="${l.id}">
    <div class="tp-u tp-text">${esc(l.content || '')}</div>
    ${l.note ? `<div class="dim">📝 <span class="tp-u">${esc(l.note)}</span></div>` : ''}
    <div class="row"><span class="tp-mood">${art.mood(l.score)}</span><span class="tp-score">⭐ ${l.score}/10</span><button class="btn" data-tp="edit">✎ Sửa</button></div></div>`;
}
const bodyOf = l => (l.doneAt && editId !== l.id ? viewHtml(l) : editorHtml(l));

function flushDraft() {
  clearTimeout(draftT);
  if (!draft) return;
  const { id, patch } = draft; draft = null;
  if (logOf(id)) store.put('topiclogs', id, patch);
  drawnSig = sig();
}
function typed(el) {
  const id = el.closest('[data-log]')?.dataset.log;
  if (!id) return;
  const field = el.classList.contains('tp-content') ? 'content' : 'note';
  if (draft && draft.id !== id) flushDraft();
  draft = { id, patch: { ...(draft?.patch || {}), [field]: el.value } };
  clearTimeout(draftT); draftT = setTimeout(flushDraft, 600);
}

// ---------- vẽ ----------
function todayHtml(today) {
  const all = topics(), l = logOf(today);
  if (!l) {
    return `<div class="tp-card"><div class="dim">Chủ đề hôm nay</div>
      <div class="tp-scene">${twinkles()}<div class="tp-idle">${art.machine()}</div></div>
      <div class="row c"><button class="btn primary big" data-tp="draw" ${all.length ? '' : 'disabled'}>🎲 Quay chủ đề hôm nay</button></div>
      <div class="dim">${all.length ? 'Mỗi ngày một chủ đề, không trùng với lần trước.' : 'Hãy thêm vài chủ đề vào danh sách bên dưới trước.'}</div></div>`;
  }
  return `<div class="tp-card"><div class="dim">Chủ đề hôm nay</div>
      <div class="tp-scene">${twinkles()}<div class="tp-float">${art.field(l.name)}</div></div>
      <div class="tp-name tp-u" id="tpName">${esc(l.name)}</div>
      <div id="tpTimer">${timerHtml(l)}</div></div>
    <div class="tp-card">${l.doneAt ? '<div class="tp-ok">🎉 Đã lưu bài hôm nay</div>' : ''}${bodyOf(l)}</div>`;
}
function historyHtml(today) {
  const list = logs().filter(l => l.date !== today);
  const scored = logs().filter(l => l.doneAt && l.score), avg = scored.length ? (scored.reduce((n, l) => n + l.score, 0) / scored.length).toFixed(1) : '';
  const entry = l => `<details class="tp-log" data-day="${l.id}" ${openLogs.has(l.id) ? 'open' : ''}><summary><span class="tp-mini">${art.field(l.name)}</span><span class="tp-date">${dmy(l.date)}</span><span class="tp-u grow">${esc(l.name)}</span><span class="tp-score">${l.doneAt ? `⭐ ${l.score}/10` : '<span class="dim">Chưa nộp</span>'}</span></summary>
      ${openLogs.has(l.id) ? `${bodyOf(l)}<div class="row"><button class="btn danger" data-tp="dellog" data-id="${l.id}">🗑 Xóa bài Topics này</button></div>` : ''}</details>`;
  return `<div class="row between"><h3>📚 Các bài trước</h3>${scored.length ? `<span class="dim"><span>${scored.length} bài đã chấm</span> · <span>Điểm TB ${avg}/10</span></span>` : ''}</div>
    ${list.length ? `<div class="tp-logs">${list.slice(0, shown).map(entry).join('')}</div>${list.length > shown ? '<div class="row c"><button class="btn" data-tp="more">▼ Hiện thêm</button></div>' : ''}` : `<div class="tp-none">${art.telescope()}<div class="dim">Chưa có bài nào từ những ngày trước.</div></div>`}`;
}
function listHtml() {
  const all = topics(), used = new Map();
  for (const l of logs()) used.set(l.topic, (used.get(l.topic) || 0) + 1);
  const open = listOpen || !all.length;
  return `<details class="tp-list" ${open ? 'open' : ''}><summary>🗂 Danh sách chủ đề (${all.length})</summary>
    <textarea id="tpImport" rows="5" placeholder="Mỗi dòng một chủ đề, ví dụ:&#10;Lỗ đen&#10;Lịch sử cà phê&#10;Kinh tế học hành vi"></textarea>
    <div class="row"><button class="btn primary" data-tp="import">＋ Thêm vào danh sách</button></div>
    ${all.map(t => `<div class="tp-item"><span class="tp-u grow">${esc(t.name)}</span>${used.get(t.id) ? `<small class="dim">đã quay ${used.get(t.id)} lần</small>` : ''}<button class="btn" data-tp="ren" data-id="${t.id}" title="Sửa chủ đề này" aria-label="Sửa chủ đề này">✎</button><button class="btn" data-tp="deltopic" data-id="${t.id}" title="Xóa chủ đề này" aria-label="Xóa chủ đề này">🗑</button></div>`).join('')}</details>`;
}
function redraw() {
  if (!root) return;
  flushDraft();
  stopSpin();
  const today = vnDate(), keep = $('#tpImport', root)?.value || '';
  root.innerHTML = `${bar()}<div id="tpRoot" data-day="${today}">${todayHtml(today)}${listHtml()}${historyHtml(today)}</div>`;
  bindBar();
  const imp = $('#tpImport', root); if (imp && keep) imp.value = keep;
  bind();
  drawnSig = sig();
}

function save(id) {
  flushDraft();
  const box = $(`.tp-edit[data-log="${id}"]`, root), l = logOf(id);
  if (!l || !box) return;
  const content = $('.tp-content', box).value.trim(), note = $('.tp-note', box).value.trim();
  if (!content) { toast('Hãy dán hoặc gõ nội dung bạn tìm được trước'); return; }
  if (!l.score) { toast('Hãy tự chấm điểm (1–10) trước khi lưu'); return; }
  editId = '';
  store.put('topiclogs', id, { content, note, doneAt: l.doneAt || Date.now() });
  toast('Đã lưu bài Topics');
  redraw();
  const view = $(`.tp-view[data-log="${id}"]`, root); // đóng dấu hoàn thành lên bài vừa lưu
  if (view && !still()) {
    const stamp = document.createElement('div');
    stamp.className = 'tp-stamp'; stamp.setAttribute('aria-hidden', 'true'); stamp.innerHTML = art.mood(l.score);
    const host = view.closest('.tp-card, .tp-log');
    host.appendChild(stamp); confetti(host, 30); sfx.play('reward');
    setTimeout(() => stamp.remove(), 1900);
  }
}
const keepScroll = f => { const sc = root.closest('.view'), y = scrollY, top = sc?.scrollTop || 0; f(); if (sc) sc.scrollTop = top; scrollTo(0, y); };

function act(b) { doAct(b); drawnSig = sig(); }
function doAct(b) {
  const a = b.dataset.tp, today = $('#tpRoot', root).dataset.day, l = logOf(today);
  if (a === 'draw') {
    if (today !== vnDate()) { redraw(); return; }
    const got = draw(today); if (!got) return;
    redraw(); spin(got.name);
  } else if (a === 'dur' && l) { setDur(+b.dataset.n); store.put('topiclogs', today, { dur: +b.dataset.n }); refreshTimer(); }
  else if (a === 'start' && l) { store.put('topiclogs', today, { endAt: Date.now() + leftMs(l), left: 0 }); refreshTimer(); }
  else if (a === 'pause' && l) { store.put('topiclogs', today, { left: leftMs(l), endAt: 0 }); refreshTimer(); }
  else if (a === 'reset' && l) { store.put('topiclogs', today, { endAt: 0, left: 0, timerDone: 0 }); refreshTimer(); }
  else if (a === 'score') {
    const id = b.closest('[data-log]').dataset.log, n = +b.dataset.n;
    flushDraft(); store.put('topiclogs', id, { score: n });
    $$('[data-tp="score"]', b.parentElement).forEach(x => { const on = +x.dataset.n === n; x.classList.toggle('primary', on); x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    const mood = $('.tp-mood', b.closest('[data-log]'));
    if (mood) { mood.innerHTML = art.mood(n); mood.classList.remove('pop'); void mood.offsetWidth; mood.classList.add('pop'); }
    starBurst(b);
  } else if (a === 'save') keepScroll(() => save(b.closest('[data-log]').dataset.log));
  else if (a === 'edit') { editId = b.closest('[data-log]').dataset.log; keepScroll(redraw); }
  else if (a === 'more') { shown += 30; keepScroll(redraw); }
  else if (a === 'import') {
    const el = $('#tpImport', root), { added, dup } = addTopics(el.value);
    if (!added && !dup) { toast('Hãy gõ ít nhất một chủ đề (mỗi dòng một chủ đề)'); return; }
    el.value = ''; listOpen = true;
    toast(dup ? `Đã thêm ${added} chủ đề, bỏ qua ${dup} chủ đề trùng` : `Đã thêm ${added} chủ đề`);
    keepScroll(redraw);
  } else if (a === 'ren') {
    const t = store.get('topics', b.dataset.id), name = (prompt('Sửa chủ đề:', t?.name || '') || '').replace(/\s+/g, ' ').trim().slice(0, 200);
    if (!name || name === t.name) return;
    store.put('topics', b.dataset.id, { name });
    const cur = logOf(vnDate());
    if (cur && cur.topic === b.dataset.id && !cur.doneAt) store.put('topiclogs', cur.id, { name });
    listOpen = true; keepScroll(redraw);
  } else if (a === 'deltopic') {
    if (!confirm('Xóa chủ đề này khỏi danh sách? Các bài đã viết vẫn được giữ.')) return;
    store.del('topics', b.dataset.id); listOpen = true; keepScroll(redraw); toast('Đã chuyển vào Thùng rác');
  } else if (a === 'dellog') {
    if (!confirm('Xóa bài này? Có thể khôi phục trong Thùng rác 30 ngày.')) return;
    flushDraft(); store.del('topiclogs', b.dataset.id); openLogs.delete(b.dataset.id); keepScroll(redraw); toast('Đã chuyển vào Thùng rác');
  }
}
function bind() {
  const box = $('#tpRoot', root);
  box.addEventListener('click', e => { const b = e.target.closest('[data-tp]'); if (b && !b.disabled) act(b); });
  box.addEventListener('input', e => { if (e.target.matches('.tp-content, .tp-note')) typed(e.target); });
  box.addEventListener('focusout', e => { if (e.target.matches('.tp-content, .tp-note')) flushDraft(); });
  $('.tp-list', box)?.addEventListener('toggle', e => { listOpen = e.target.open; });
  $$('.tp-log', box).forEach(d => d.addEventListener('toggle', () => {
    const id = d.dataset.day;
    if (d.open === openLogs.has(id)) return;
    if (d.open) openLogs.add(id); else openLogs.delete(id);
    keepScroll(redraw); // nội dung bài chỉ dựng khi mở
  }));
}

const isTyping = () => !!root && !!document.activeElement?.matches('textarea, input') && root.contains(document.activeElement);

export function render(el, opts) {
  root = el; bar = opts.bar; bindBar = opts.bindBar;
  redraw();
  tick();
}
export function leave() { flushDraft(); editId = ''; stopSpin(); $('.tp-draw', root || document)?.remove(); }

export function init() {
  setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) flushDraft(); else tick(); });
  addEventListener('pagehide', flushDraft);
  bus.on('nav', flushDraft);
  let t = 0;
  bus.on('store', c => { // dữ liệu từ máy khác: vẽ lại, trừ khi đang gõ
    if (c !== 'topics' && c !== '*' && c !== 'topiclogs') return;
    clearTimeout(t);
    t = setTimeout(() => { if (onScreen() && !isTyping() && !spinning && sig() !== drawnSig) keepScroll(redraw); }, 300);
  });
}
