// Soạn văn bản: gắn video (từ thư viện hoặc dán link), âm thanh vào chữ đã bôi đen. Bấm chữ đã gắn là hiện khung video bên cạnh.
// Trong ô soạn, chữ đã gắn được tô màu (tím = video, xanh lá = âm thanh); thanh dưới thanh công cụ cho biết đang chọn gì và cho đổi / bỏ link.
import { $, $$, esc, toast, bus, uid, pickFile, getLang, langInfo, classifySrc } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { openSide } from './side.js';
import { addByLink } from './player.js';
import { zhText } from './prefs.js';
import { loadSimplifier } from './util.js';

// [[video:ID|chữ]]  hoặc  [[video:ID@12.5|chữ]] (mở video từ giây 12.5)  |  [[audio:ID|chữ]]
const TOK = /\[\[(audio|video):([A-Za-z0-9]+)(?:@(\d+(?:\.\d+)?))?(?:\|([^\]]*))?\]\]/g;
const stripTok = s => s.replace(/\[\[(?:audio|video):[^|\]]*\|?([^\]]*)\]\]/g, '$1');
let noteId = null, mode = 'edit', saveT = null;
let pending = { s: 0, e: 0 };  // đoạn chữ sẽ được gắn link (chốt lúc mở hộp thoại)
let lastSel = null;             // đoạn chữ vừa bôi đen (nhớ lại cả khi bấm nút làm ô soạn mất vùng chọn, nhất là trên điện thoại)
let curTok = null;              // link đang được chọn / con trỏ đang nằm trong
const wrote = new Set();
const audio = new Audio();
let playingId = null;

const note = () => (noteId ? store.get('items', noteId) : null);
const clean = s => s.replace(/[\[\]|]/g, '');

// các link trong văn bản: [{ s, e, type, id, start, label }]
function tokensOf(text) {
  return [...text.matchAll(TOK)].map(m => ({ s: m.index, e: m.index + m[0].length, type: m[1], id: m[2], start: parseFloat(m[3]) || 0, label: m[4] ?? '' }));
}
const overlaps = (t, s, e) => (s === e ? s > t.s && s < t.e : t.s < e && t.e > s);

export function newNote(folder = '') {
  const id = uid();
  store.put('items', id, { type: 'note', title: 'Ghi chú mới', lang: getLang(), folder, body: '', created: Date.now() });
  openNote(id, true);
  return id;
}

export function openNote(id, isNew = false) {
  if (!store.get('items', id)) return;
  flushSave();
  noteId = id; mode = isNew ? 'edit' : 'view';
  if (!isNew) tracker.read();
  fill();
  bus.emit('nav', 'notes');
}

function fill() {
  const n = note();
  $('#nEmpty').hidden = !!n; $('#nMain').hidden = !n;
  $$('#nMode button').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
  if (!n) return;
  $('#nTitle').value = n.title;
  $('#nBody').value = n.body || '';
  $('#nFolder').innerHTML = '<option value="">Chưa phân mục</option>' +
    store.list('folders').filter(f => (f.lang || 'zh') === (n.lang || 'zh')).map(f => `<option value="${f.id}" ${f.id === n.folder ? 'selected' : ''}>${esc(f.name)}</option>`).join('');
  $('#nBody').lang = $('#nHL').lang = $('#nPreview').lang = langInfo(n.lang || 'zh').bcp;
  $('#nSaved').textContent = '';
  lastSel = null; curTok = null;
  setMode(mode);
}

function setMode(m) {
  mode = m;
  $$('#nMode button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
  $('#nBox').hidden = m !== 'edit';
  $('#nPreview').hidden = m !== 'view';
  $('#nTools').hidden = m !== 'edit';
  $('#nSelBar').hidden = m !== 'edit';
  if (m === 'view') renderPreview(); else refreshEditor();
}

// ---------- ô soạn: tô màu chữ đã gắn, tự cao theo nội dung ----------
function syncHL() { // sao chép kiểu chữ của ô soạn sang lớp tô màu để hai lớp trùng khít từng ký tự
  const ta = $('#nBody'), hl = $('#nHL'), cs = getComputedStyle(ta);
  for (const p of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'tabSize']) hl.style[p] = cs[p];
  hl.style.border = `${cs.borderTopWidth} solid transparent`;
  hl.style.clipPath = cs.clipPath === 'none' ? '' : cs.clipPath;
  hl.style.borderRadius = cs.borderRadius;
}
function renderHL() {
  const text = $('#nBody').value;
  let out = '', last = 0;
  for (const t of tokensOf(text)) {
    out += esc(text.slice(last, t.s)) + `<mark class="h${t.type}">${esc(text.slice(t.s, t.e))}</mark>`;
    last = t.e;
  }
  $('#nHL').innerHTML = out + esc(text.slice(last)) + '​\n';
}
function autoGrow() {
  const ta = $('#nBody');
  if (ta.offsetParent === null) return;
  ta.style.height = 'auto';
  ta.style.height = ta.scrollHeight + (ta.offsetHeight - ta.clientHeight) + 'px';
}
function refreshEditor() { syncHL(); renderHL(); autoGrow(); readSel(); }

// ---------- vùng đang chọn ----------
function readSel() {
  const ta = $('#nBody'), s = ta.selectionStart ?? 0, e = ta.selectionEnd ?? 0;
  curTok = tokensOf(ta.value).find(t => overlaps(t, s, e)) || null;
  if (curTok) lastSel = null;
  else if (e > s) lastSel = { s, e };
  else if (document.activeElement === ta) lastSel = null; // bấm vào chỗ khác trong ô soạn: bỏ vùng chọn cũ
  renderSelBar();
}
function renderSelBar() {
  const bar = $('#nSelBar'); if (!bar) return;
  if (curTok) {
    const vid = curTok.type === 'video', it = store.get('items', curTok.id), ttl = it?.title || '';
    bar.innerHTML = `<span class="dim">${vid ? 'Link video' : 'Link âm thanh'}:</span> <b class="gt">${esc(curTok.label || ttl)}</b>${ttl && vid ? ` <span class="dim gt">→ ${esc(ttl)}</span>` : ''}
      <span class="nsa"><button class="btn" data-na="open">${vid ? '▶ Xem bên cạnh' : '▶ Nghe'}</button>${vid ? '<button class="btn" data-na="change">🎬 Đổi video</button><button class="btn" data-na="changeurl">🔗 Đổi bằng link</button>' : '<button class="btn" data-na="change">🔊 Đổi file</button>'}<button class="btn" data-na="unlink">✂ Bỏ link</button></span>`;
  } else if (lastSel) {
    const txt = $('#nBody').value.slice(lastSel.s, lastSel.e).replace(/\s+/g, ' ').trim();
    bar.innerHTML = `<span class="dim">Đã chọn:</span> <b class="gt">“${esc(txt.length > 40 ? txt.slice(0, 40) + '…' : txt)}”</b> <span class="dim">→ bấm nút Gắn video, Gắn link video hoặc Gắn âm thanh ở trên để gắn vào chữ này.</span>`;
  } else {
    bar.innerHTML = '<span class="dim">Bôi đen một từ trong ô soạn rồi bấm nút Gắn video, Gắn link video hoặc Gắn âm thanh ở trên. Chữ đã gắn được tô màu; sang chế độ Xem, bấm vào chữ đó là video hiện bên cạnh.</span>';
  }
}
// đoạn chữ sẽ gắn link: vùng đang bôi đen, hoặc vùng bôi đen gần nhất, hoặc vị trí con trỏ
function targetRange() {
  const ta = $('#nBody'), s = ta.selectionStart ?? 0, e = ta.selectionEnd ?? 0;
  if (e > s) return { s, e };
  if (curTok) return { s: curTok.s, e: curTok.e };
  if (lastSel && lastSel.e <= ta.value.length) return { ...lastSel };
  return { s, e };
}

// ---------- hiển thị ----------
const fmtText = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
function inline(line) {
  let out = '', last = 0;
  for (const m of line.matchAll(TOK)) {
    out += fmtText(line.slice(last, m.index));
    const label = esc(m[4] || (m[1] === 'audio' ? 'Âm thanh' : 'Video'));
    out += m[1] === 'audio'
      ? `<button class="wl" data-audio="${m[2]}" title="Nghe">${label}<sup>🔊</sup></button>`
      : `<button class="wl" data-video="${m[2]}" data-t="${m[3] || 0}" title="Xem video bên cạnh">${label}<sup>🎬</sup></button>`;
    last = m.index + m[0].length;
  }
  return out + fmtText(line.slice(last));
}
function renderPreview() {
  const text = $('#nBody').value;
  $('#nPreview').innerHTML = text.trim()
    ? text.split('\n').map(l => (/^#{1,3}\s/.test(l) ? `<h3>${inline(l.replace(/^#{1,3}\s/, ''))}</h3>` : l.trim() ? `<p>${inline(l)}</p>` : '<br>')).join('')
    : '<div class="empty">Ghi chú trống. Bấm “✏️ Sửa” để viết.</div>';
}

// ---------- lưu ----------
function save() {
  const n = note(); if (!n) return;
  const body = $('#nBody').value;
  store.put('items', noteId, { title: $('#nTitle').value.trim() || 'Không tên', body, folder: $('#nFolder').value });
  $('#nSaved').textContent = '✓ đã lưu';
  if (!wrote.has(noteId) && body.trim().length >= 10) { wrote.add(noteId); tracker.write(); }
}
// tiếng Trung: đổi chữ phồn thể sang giản thể (làm khi rời ô soạn để không nhảy con trỏ lúc đang gõ)
function simplifyNote() {
  const n = note(); if (!n || (n.lang || 'zh') !== 'zh') return;
  const ta = $('#nBody'), ti = $('#nTitle');
  const a = zhText(ta.value, 'zh'), b = zhText(ti.value, 'zh');
  if (a !== ta.value || b !== ti.value) {
    const s = ta.selectionStart, e = ta.selectionEnd; // giữ nguyên vùng bôi đen (trước đây đổi chữ làm mất vùng chọn)
    ta.value = a; ti.value = b;
    if (a.length === ta.value.length) ta.setSelectionRange(Math.min(s, a.length), Math.min(e, a.length));
    save(); renderHL(); toast('Đã chuyển chữ Trung sang giản thể');
  }
}
function flushSave() { if (saveT) { clearTimeout(saveT); saveT = null; if (noteId) save(); } }
function queueSave() { $('#nSaved').textContent = '…'; clearTimeout(saveT); saveT = setTimeout(() => { saveT = null; save(); }, 600); }

// Gắn link vào đoạn đã chốt (pending): bôi đen chữ nào thì chữ đó thành link; chưa bôi đen thì chèn tên video.
// Nếu đoạn đó đã là một link thì thay link cũ, giữ nguyên chữ hiển thị.
function place(type, id, fallbackLabel, startSec = 0) {
  const ta = $('#nBody'), v = ta.value;
  let { s, e } = pending;
  s = Math.min(s, v.length); e = Math.min(Math.max(e, s), v.length);
  let label = clean(v.slice(s, e).replace(/\s+/g, ' ').trim());
  const t = tokensOf(v).find(x => overlaps(x, s, e));
  if (t) { s = t.s; e = t.e; label = t.label; }
  label = label || clean(fallbackLabel);
  const tok = `[[${type}:${id}${startSec > 0 ? '@' + startSec : ''}|${label}]]`;
  ta.value = v.slice(0, s) + tok + v.slice(e);
  ta.focus(); ta.setSelectionRange(s, s + tok.length);
  lastSel = null;
  refreshEditor(); save();
  toast(type === 'video' ? `Đã gắn video vào “${label}” ✓` : `Đã gắn âm thanh vào “${label}” ✓`);
}
function unlink() {
  if (!curTok) return;
  const ta = $('#nBody'), v = ta.value, t = curTok;
  ta.value = v.slice(0, t.s) + t.label + v.slice(t.e);
  ta.focus(); ta.setSelectionRange(t.s, t.s + t.label.length);
  refreshEditor(); save();
  toast('Đã bỏ link, giữ lại chữ');
}

// ---------- âm thanh ----------
async function playAudio(id) {
  if (playingId === id && !audio.paused) { audio.pause(); return; }
  let url = await store.assetURL(id);
  if (!url) {
    const [f] = await pickFile('audio/*');
    if (!f) return;
    await store.putAsset(id, f, f.name);
    url = await store.assetURL(id);
  }
  playingId = id; audio.src = url; audio.play().catch(() => toast('Không phát được file âm thanh'));
}
function markPlaying() {
  $$('#nPreview [data-audio]').forEach(b => b.classList.toggle('playing', !audio.paused && b.dataset.audio === playingId));
}
audio.addEventListener('play', markPlaying);
audio.addEventListener('pause', markPlaying);
audio.addEventListener('ended', markPlaying);

// xem video bên cạnh mà không làm trang nhảy: giữ nguyên vị trí cuộn
function showVideo(id, t) {
  const y = scrollY;
  Promise.resolve(openSide(id, t)).finally(() => { scrollTo(0, y); requestAnimationFrame(() => scrollTo(0, y)); });
}

// ---------- hộp thoại ----------
function openNoteList() {
  const l = getLang();
  const items = store.list('items').filter(i => i.type === 'note' && (i.lang || 'zh') === l).sort((a, b) => (b.u || 0) - (a.u || 0));
  $('#noteList').innerHTML = items.length ? items.map(i =>
    `<div class="lib"><div class="n"><b>${esc(i.title)}</b><span>${esc(stripTok(i.body || '').trim().slice(0, 50))}</span></div>` +
    `<button class="btn" data-open="${i.id}">Mở</button><button class="btn" data-del="${i.id}">🗑</button></div>`).join('')
    : `<div class="empty">Chưa có ghi chú ${esc(langInfo().name)}.</div>`;
  $('#noteDlg').showModal();
}
function openVideoPicker(focusUrl = false) {
  const t = pending.e > pending.s ? $('#nBody').value.slice(pending.s, pending.e).replace(/\s+/g, ' ').trim() : '';
  const tok = tokensOf($('#nBody').value).find(x => overlaps(x, pending.s, pending.e));
  $('#vidHint').textContent = tok ? `Sẽ đổi video của link “${tok.label}”` : t ? `Sẽ gắn video vào chữ: “${t}”` : 'Chưa bôi đen chữ nào: sẽ chèn tên video. (Bôi đen chữ trong ô soạn trước để gắn link vào chữ đó.)';
  $('#vidStart').value = ''; $('#vidUrl').value = '';
  const items = store.list('items').filter(i => i.type === 'video').sort((a, b) => (b.u || 0) - (a.u || 0));
  $('#vidList').innerHTML = items.length ? items.map(i =>
    `<div class="lib"><div class="n"><b>${esc(i.title)}</b><span>${esc(langInfo(i.lang || 'zh').name)} · ${i.frame === 'portrait' ? 'khung dọc' : 'khung ngang'}${i.src ? ' · link' : ''}</span></div>` +
    `<button class="btn primary" data-pick="${i.id}">Chèn</button></div>`).join('')
    : '<div class="empty">Thư viện chưa có video nào. Dán link ở ô phía trên.</div>';
  $('#vidDlg').showModal();
  if (focusUrl) $('#vidUrl').focus();
}
// dán link video (YouTube, TikTok, .mp4): thêm vào thư viện (dùng lại nếu đã có) rồi gắn vào chữ
async function attachUrl() {
  const url = $('#vidUrl').value.trim();
  if (!url) { toast('Hãy dán link video vào ô'); return; }
  const c = classifySrc(url);
  if (c.kind === 'bad' || c.kind === 'none') { toast('Link không hợp lệ (phải bắt đầu bằng http hoặc https)'); return; }
  if (c.kind === 'link' && !confirm('Link này không phát trực tiếp được trong app (chỉ mở sang tab mới).\nVẫn gắn vào chữ?')) return;
  const start = parseFloat($('#vidStart').value) || c.start || 0;
  $('#vidUrlGo').disabled = true;
  let id = store.list('items').find(i => i.type === 'video' && (i.src || '').trim() === url)?.id;
  if (!id) id = await addByLink(url, '', note()?.folder || '');
  $('#vidUrlGo').disabled = false;
  if (!id) return;
  $('#vidDlg').close();
  place('video', id, store.get('items', id)?.title || 'Video', start);
}

export function init() {
  const ta = $('#nBody');
  $('#nTitle').addEventListener('input', queueSave);
  ta.addEventListener('input', () => { queueSave(); renderHL(); autoGrow(); readSel(); });
  ta.addEventListener('change', simplifyNote);
  $('#nTitle').addEventListener('change', simplifyNote);
  for (const ev of ['select', 'keyup', 'mouseup', 'touchend', 'focus']) ta.addEventListener(ev, readSel);
  document.addEventListener('selectionchange', () => { if (document.activeElement === ta) readSel(); });
  addEventListener('resize', () => { if (mode === 'edit') autoGrow(); });
  document.fonts?.ready.then(() => { if (mode === 'edit') refreshEditor(); });
  loadSimplifier();
  $('#nFolder').addEventListener('change', save);
  $('#nMode').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { simplifyNote(); flushSave(); setMode(b.dataset.m); } });
  $('#nNew').onclick = () => newNote('');
  $('#nList').onclick = openNoteList;
  const attachAudio = () => {
    if (!noteId) return;
    pending = targetRange();
    pickFile('audio/*').then(async ([f]) => {
      if (!f) return;
      const aid = uid();
      try { await store.putAsset(aid, f, f.name); } catch (e) { toast('Không lưu được: ' + e.message); return; }
      place('audio', aid, f.name.replace(/\.[^.]+$/, ''));
    });
  };
  $('#nAudio').onclick = attachAudio;
  $('#nVideo').onclick = () => { if (!noteId) return; pending = targetRange(); openVideoPicker(false); };
  $('#nLink').onclick = () => { if (!noteId) return; pending = targetRange(); openVideoPicker(true); };
  $('#vidUrlGo').onclick = attachUrl;
  $('#vidUrl').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); attachUrl(); } });
  $('#vidList').addEventListener('click', e => {
    const b = e.target.closest('[data-pick]'); if (!b) return;
    const v = store.get('items', b.dataset.pick);
    const start = parseFloat($('#vidStart').value) || 0;
    $('#vidDlg').close();
    place('video', b.dataset.pick, v.title, start);
  });
  // thanh dưới công cụ: thao tác trên link đang chọn
  $('#nSelBar').addEventListener('click', e => {
    const b = e.target.closest('[data-na]'); if (!b || !curTok) return;
    const t = curTok;
    if (b.dataset.na === 'open') { if (t.type === 'video') showVideo(t.id, t.start); else playAudio(t.id); }
    else if (b.dataset.na === 'unlink') unlink();
    else if (b.dataset.na === 'change') { pending = { s: t.s, e: t.e }; if (t.type === 'video') openVideoPicker(false); else attachAudio(); }
    else if (b.dataset.na === 'changeurl') { pending = { s: t.s, e: t.e }; openVideoPicker(true); }
  });
  $('#noteList').addEventListener('click', e => {
    const o = e.target.closest('[data-open]'), d = e.target.closest('[data-del]');
    if (o) { $('#noteDlg').close(); openNote(o.dataset.open); }
    else if (d && confirm('Xóa ghi chú này?')) { store.del('items', d.dataset.del); if (noteId === d.dataset.del) { noteId = null; fill(); } openNoteList(); }
  });
  $('#nPreview').addEventListener('click', e => {
    const a = e.target.closest('[data-audio]'), v = e.target.closest('[data-video]');
    if (a) playAudio(a.dataset.audio); else if (v) showVideo(v.dataset.video, parseFloat(v.dataset.t) || 0);
  });
  tracker.addSource(() => (!audio.paused && !audio.ended ? getLang() : null));
  bus.on('lang', () => { flushSave(); noteId = null; fill(); });
  bus.on('show', v => { if (v !== 'notes') flushSave(); else if (mode === 'edit' && noteId) refreshEditor(); });
  fill();
}
