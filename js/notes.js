// Soạn văn bản: chèn file âm thanh, hoặc liên kết tới video trong thư viện (bấm là hiện khung video bên cạnh).
import { $, $$, esc, toast, bus, uid, pickFile, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { openSide } from './side.js';
import { zhText } from './prefs.js';
import { loadSimplifier } from './util.js';

// [[video:ID|chữ]]  hoặc  [[video:ID@12.5|chữ]] (mở video từ giây 12.5)  |  [[audio:ID|chữ]]
const TOK = /\[\[(audio|video):([A-Za-z0-9]+)(?:@(\d+(?:\.\d+)?))?(?:\|([^\]]*))?\]\]/g;
const stripTok = s => s.replace(/\[\[(?:audio|video):[^|\]]*\|?([^\]]*)\]\]/g, '$1');
let noteId = null, mode = 'edit', saveT = null, sel = { s: 0, e: 0 };
const wrote = new Set();
const audio = new Audio();
let playingId = null;

const note = () => (noteId ? store.get('items', noteId) : null);
const clean = s => s.replace(/[\[\]|]/g, '');

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
  $('#nBody').lang = $('#nPreview').lang = langInfo(n.lang || 'zh').bcp;
  $('#nSaved').textContent = '';
  setMode(mode);
}

function setMode(m) {
  mode = m;
  $$('#nMode button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
  $('#nBody').hidden = m !== 'edit';
  $('#nPreview').hidden = m !== 'view';
  $('#nTools').hidden = m !== 'edit';
  if (m === 'view') renderPreview();
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
      : `<button class="wl" data-video="${m[2]}" data-t="${m[3] || 0}" title="Xem video">${label}<sup>🎬</sup></button>`;
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
  if (a !== ta.value || b !== ti.value) { ta.value = a; ti.value = b; save(); toast('Đã chuyển chữ Trung sang giản thể'); }
}
function flushSave() { if (saveT) { clearTimeout(saveT); saveT = null; if (noteId) save(); } }
function queueSave() { $('#nSaved').textContent = '…'; clearTimeout(saveT); saveT = setTimeout(() => { saveT = null; save(); }, 600); }

// Ghi nhớ đoạn chữ đang bôi đen trong ô soạn (trước khi mở hộp thoại)
function captureSel() {
  const ta = $('#nBody');
  sel = { s: ta.selectionStart ?? ta.value.length, e: ta.selectionEnd ?? ta.value.length };
  return ta.value.slice(sel.s, sel.e).replace(/\s+/g, ' ').trim();
}
// Gắn link vào đoạn đã bôi đen, hoặc chèn mới nếu chưa bôi đen
function place(type, id, fallbackLabel, startSec = 0) {
  const ta = $('#nBody');
  const label = clean(ta.value.slice(sel.s, sel.e).replace(/\s+/g, ' ').trim() || fallbackLabel);
  const tok = `[[${type}:${id}${startSec > 0 ? '@' + startSec : ''}|${label}]]`;
  ta.value = ta.value.slice(0, sel.s) + tok + ta.value.slice(sel.e);
  ta.selectionStart = ta.selectionEnd = sel.s + tok.length;
  ta.focus(); save();
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
function openVideoPicker() {
  const items = store.list('items').filter(i => i.type === 'video').sort((a, b) => (b.u || 0) - (a.u || 0));
  $('#vidList').innerHTML = items.length ? items.map(i =>
    `<div class="lib"><div class="n"><b>${esc(i.title)}</b><span>${esc(langInfo(i.lang || 'zh').name)} · ${i.frame === 'portrait' ? 'khung dọc' : 'khung ngang'}</span></div>` +
    `<button class="btn primary" data-pick="${i.id}">Chèn</button></div>`).join('')
    : '<div class="empty">Thư viện chưa có video nào.</div>';
  $('#vidDlg').showModal();
}

export function init() {
  $('#nTitle').addEventListener('input', queueSave);
  $('#nBody').addEventListener('input', queueSave);
  $('#nBody').addEventListener('change', simplifyNote);
  $('#nTitle').addEventListener('change', simplifyNote);
  loadSimplifier();
  $('#nFolder').addEventListener('change', save);
  $('#nMode').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { simplifyNote(); flushSave(); setMode(b.dataset.m); } });
  $('#nNew').onclick = () => newNote('');
  $('#nList').onclick = openNoteList;
  $('#nAudio').onclick = () => {
    if (!noteId) return;
    captureSel();
    pickFile('audio/*').then(async ([f]) => {
      if (!f) return;
      const aid = uid();
      try { await store.putAsset(aid, f, f.name); } catch (e) { toast('Không lưu được: ' + e.message); return; }
      place('audio', aid, f.name.replace(/\.[^.]+$/, ''));
    });
  };
  $('#nVideo').onclick = () => {
    if (!noteId) return;
    const t = captureSel();
    $('#vidHint').textContent = t ? `Sẽ gắn video vào chữ: “${t}”` : 'Chưa bôi đen chữ nào: sẽ chèn tên video. (Bôi đen chữ trong ô soạn trước để gắn link vào chữ đó.)';
    $('#vidStart').value = '';
    openVideoPicker();
  };
  $('#vidList').addEventListener('click', e => {
    const b = e.target.closest('[data-pick]'); if (!b) return;
    const v = store.get('items', b.dataset.pick);
    const start = parseFloat($('#vidStart').value) || 0;
    $('#vidDlg').close();
    place('video', b.dataset.pick, v.title, start);
  });
  $('#noteList').addEventListener('click', e => {
    const o = e.target.closest('[data-open]'), d = e.target.closest('[data-del]');
    if (o) { $('#noteDlg').close(); openNote(o.dataset.open); }
    else if (d && confirm('Xóa ghi chú này?')) { store.del('items', d.dataset.del); if (noteId === d.dataset.del) { noteId = null; fill(); } openNoteList(); }
  });
  $('#nPreview').addEventListener('click', e => {
    const a = e.target.closest('[data-audio]'), v = e.target.closest('[data-video]');
    if (a) playAudio(a.dataset.audio); else if (v) openSide(v.dataset.video, parseFloat(v.dataset.t) || 0);
  });
  tracker.addSource(() => (!audio.paused && !audio.ended ? getLang() : null));
  bus.on('lang', () => { flushSave(); noteId = null; fill(); });
  bus.on('show', v => { if (v !== 'notes') flushSave(); });
  fill();
}
