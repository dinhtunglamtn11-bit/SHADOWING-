// Trình học: phát video (file trong máy, link mp4 hoặc YouTube), phụ đề chạy theo, khung ngang / dọc.
import { $, esc, fmt, fmtS, toast, bus, uid, pickFile, getLang, langInfo, parseSubs, classifySrc, tokenWeight, tokensOf } from './util.js';
import { modeBar, editCard } from './cuehtml.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { prefs, savePrefs, zhText } from './prefs.js';
import { loadSimplifier } from './util.js';
import { addPinyin } from './align.js';
import { M } from './media.js';
import { addCueCard } from './cards.js';
import * as shortcuts from './shortcuts.js';

const now = $('#now'), list = $('#cueList'), stage = $('#stage'), grid = $('#pgrid');
export const temp = new Map(); // video chưa lưu vào máy (chỉ phát phiên này): id -> File
const tempUrls = new Map();
let cues = [], cur = -1, lastRender = -1, itemId = null, itemLang = 'zh';
let passT = 0, counted = false, lastTs = 0, lastSaved = 0;
let editOn = false, saveT = 0; // chế độ ✏️ sửa phụ đề ngay trong danh sách câu bên phải

const off = () => parseFloat($('#offset').value) || 0;
const item = () => (itemId ? store.get('items', itemId) : null);
// Tốc độ phát: mỗi video nhớ tốc độ riêng, video chưa chọn thì dùng tốc độ mặc định trong Cài đặt
const curRate = () => (itemId && store.get('items', itemId)?.rate) || prefs.rate;
const EMPTY = '<div class="main small">Chọn video trong Thư viện, hoặc bấm “＋ Thêm video”</div>';

export function currentItemId() { return itemId; }
// Phụ đề tiếng Trung luôn lưu bằng chữ giản thể
export async function simplifyCues(cs, lang) {
  if (lang !== 'zh' || !prefs.simpOnly) return cs;
  await loadSimplifier();
  return cs.map(c => ({ ...c, lines: c.lines.map(l => zhText(l, 'zh')) }));
}
export const currentCues = () => cues;
export const currentCueIndex = () => (cur >= 0 ? cur : Math.max(0, findCue(M.currentTime)));
export const currentLang = () => itemLang;
// Thời điểm bắt đầu / kết thúc của câu i trên đồng hồ video (đã cộng độ lệch phụ đề)
export const cueSpan = i => (cues[i] ? { start: cues[i].start + off(), end: cues[i].end + off() } : null);
// Câu nào đang có bản ghi tạm (ghi khi học shadowing, chỉ trong RAM): hiện nút ▶ nghe lại và 🎯 chấm điểm ở đầu câu
let marks = new Set();
const recBtns = i => `<button class="btn rb" data-rec="${i}" title="Nghe lại giọng bạn ở câu này">▶</button><button class="btn rb" data-sc="${i}" title="Chấm điểm câu này">🎯</button>`;
export const setRecMarks = s => { marks = s; };
export function markCue(i) {
  const t = list.querySelector(`.cue[data-i="${i}"] .t`);
  if (t && !t.querySelector('.rb')) t.insertAdjacentHTML('beforeend', recBtns(i));
}
// Điểm vừa chấm xong khi học shadowing: cập nhật huy hiệu 🎙 ở đầu câu ngay, khỏi vẽ lại cả danh sách
export function markScore(i, score) {
  const t = list.querySelector(`.cue[data-i="${i}"] .t`);
  if (!t) return;
  t.querySelector('.badge')?.remove();
  t.insertAdjacentHTML('beforeend', ` <span class="badge">🎙 ${score}%</span>`);
}
const timedCount = cs => cs.filter(c => c.t).length;
const titleText = (it, cs) => it.title + (cs.length && timedCount(cs) ? `  ✨ ${timedCount(cs)}/${cs.length} câu có giờ từng từ` : '');

// Lưu phụ đề đã canh từ và vẽ lại
export function applyCues(newCues) {
  if (!itemId) return;
  cues = newCues; lastRender = -1;
  store.put('items', itemId, { cues: JSON.stringify(newCues), cueCount: newCues.length });
  segs = normSegs(segs); // chỉnh phụ đề (thêm/xóa câu) có thể làm mốc chia đoạn lệch: bỏ mốc vượt quá số câu
  renderList(); updateSubHint(); updateSegBar();
  $('#itemTitle').textContent = titleText(item(), cues);
  const keep = cur; cur = -1; if (keep >= 0) setCur(keep);
}
export function setCuesFromFile(c) {
  cues = c; cur = -1; lastRender = -1;
  segs = []; segOn = false; document.body.classList.remove('segmode'); // phụ đề mới: mốc đoạn cũ không còn đúng
  store.put('items', itemId, { cues: JSON.stringify(c), cueCount: c.length, segs: [] });
  renderList(); updateSubHint(); updateSegBar();
  $('#itemTitle').textContent = titleText(item(), cues);
  now.innerHTML = '<div class="main small">Bấm Play hoặc chọn một câu</div>';
}

// ---------- thêm file ----------
export async function addMedia(files, folder = '') {
  const subs = files.filter(f => /\.(srt|vtt)$/i.test(f.name));
  const vids = files.filter(f => /^(video|audio)\//.test(f.type) || /\.(mp4|mkv|webm|mov|m4v|mp3|m4a|wav|ogg|aac)$/i.test(f.name));
  if (!vids.length) { toast(subs.length ? 'Hãy chọn kèm file video' : 'Không có file video nào'); return null; }
  const base = n => n.replace(/\.[^.]+$/, '').toLowerCase();
  let first = null;
  for (const f of vids) {
    const id = uid(), assetId = uid();
    let keep = true;
    if (f.size > 500 * 1024 * 1024) keep = confirm(`"${f.name}" nặng ${(f.size / 1048576).toFixed(0)} MB.\nLưu vào máy để mở lại 1 chạm?\n(Bấm Hủy: chỉ xem lần này, lần sau phải chọn lại file)`);
    if (keep) { try { await store.putAsset(assetId, f, f.name); } catch (e) { toast('Không lưu được vào máy: ' + e.message, 4000); keep = false; } }
    const sub = subs.find(s => base(s.name) === base(f.name)) || (vids.length === 1 ? subs[0] : null);
    let cj = '', n = 0;
    if (sub) { const c = await simplifyCues(parseSubs(await sub.text(), langInfo().words), getLang()); if (c.length) { cj = JSON.stringify(c); n = c.length; } }
    store.put('items', id, {
      type: 'video', title: f.name.replace(/\.[^.]+$/, ''), lang: getLang(), folder,
      assetId: keep ? assetId : '', fileName: f.name, size: f.size, src: '', cues: cj, cueCount: n, created: Date.now(), position: 0,
    });
    if (!keep) temp.set(id, f);
    first = first || id;
  }
  return first;
}

// Thêm video chỉ bằng link (YouTube, TikTok, link file .mp4…)
export async function addByLink(url, title, folder = '') {
  const c = classifySrc(url);
  if (c.kind === 'bad' || c.kind === 'none') { toast('Link không hợp lệ (phải bắt đầu bằng http hoặc https)'); return null; }
  if (!title && c.kind === 'youtube') {
    try {
      const ctl = new AbortController(); setTimeout(() => ctl.abort(), 3500);
      const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(url), { signal: ctl.signal });
      title = (await r.json()).title;
    } catch { /* không lấy được tên thì dùng tên mặc định */ }
  }
  const id = uid();
  store.put('items', id, {
    type: 'video', title: title || (c.kind === 'youtube' ? 'YouTube ' + c.id : c.kind === 'tiktok' ? 'TikTok ' + c.id : 'Video từ link'),
    lang: getLang(), folder, assetId: '', fileName: '', src: url.trim(), cues: '', cueCount: 0,
    frame: c.portrait ? 'portrait' : 'landscape', created: Date.now(), position: 0,
  });
  return id;
}

// Bấm trực tiếp trong sự kiện click của người dùng
export function pickAndAdd(folder = '') {
  return pickFile('video/*,audio/*,.srt,.vtt,.mkv', true).then(async fs => {
    if (!fs.length) return null;
    const vidCount = fs.filter(f => !/\.(srt|vtt)$/i.test(f.name)).length;
    const id = await addMedia(fs, folder);
    if (id && vidCount === 1) await openItem(id);
    else if (id) toast('Đã thêm ' + vidCount + ' video vào Thư viện');
    return id;
  });
}

// ---------- mở video ----------
export async function openItem(id) {
  const it = store.get('items', id);
  if (!it || it.deleted) return;
  persistPos();
  M.clear();
  if (editOn) { flushEdits(); editOn = false; document.body.classList.remove('cueedit'); } // sang video khác: thoát chế độ sửa
  if (dictOn) { setDictMode(false); bus.emit('dictExit'); }
  if (speakOn) { setSpeakMode(false); bus.emit('speakExit'); }
  itemId = id; itemLang = it.lang || getLang();
  try { cues = JSON.parse(it.cues || '[]'); } catch { cues = []; }
  cur = -1; lastRender = -1; passT = 0; counted = false; lastSaved = it.position || 0;
  bus.emit('item', id); // báo cho phần ghi âm khi học bỏ bản ghi tạm của video cũ
  $('#offset').value = it.offset || 0;
  applyPrefs(); // nạp tốc độ riêng của video này
  $('#itemTitle').textContent = titleText(it, cues);
  now.lang = list.lang = langInfo(itemLang).bcp;
  setFrame(it.frame || 'landscape');
  renderList();
  now.innerHTML = cues.length ? '<div class="main small">Bấm Play hoặc chọn một câu</div>' : '<div class="main small">Video này chưa có phụ đề. Bấm “📄 Phụ đề” để thêm.</div>';
  bus.emit('nav', 'player');
  segs = normSegs(Array.isArray(it.segs) ? it.segs : []); segOn = false; segIdx = 0; segAtEnd = false;
  document.body.classList.remove('segmode');
  updateSubHint(); updateSegBar(); migrateCues(id);

  // ưu tiên file trong máy, sau đó tới link nguồn
  let url = await store.assetURL(it.assetId);
  if (!url && temp.has(id)) {
    if (!tempUrls.has(id)) tempUrls.set(id, URL.createObjectURL(temp.get(id)));
    url = tempUrls.get(id);
  }
  const src = classifySrc(it.src);
  if (url) M.useFile(url);
  else if (src.kind === 'file') M.useFile(it.src.trim());
  else if (src.kind === 'youtube') await M.useYouTube(src.id, it.position > 1 ? it.position : src.start);
  else showNoSource(it, src);
}

function showNoSource(it, src) {
  const msg = { tiktok: 'TikTok không cho phụ đề chạy theo trong app', link: 'Link này không phát trực tiếp được trong app' }[src.kind] || 'Video chưa có trên máy này';
  now.innerHTML = `<div class="main small">${msg}</div><div class="sub">${esc(it.fileName || it.title)}</div><div class="row c">` +
    (src.kind === 'tiktok' ? '<button class="btn" id="viaSide">▶ Xem ở khung bên cạnh</button>' : '') +
    (it.src ? `<a class="btn" href="${esc(it.src)}" target="_blank" rel="noopener">↗ Mở link</a>` : '') +
    '<button class="btn primary" id="pickV">📂 Chọn file video</button></div>';
  $('#viaSide')?.addEventListener('click', () => bus.emit('openSide', { id: itemId, start: 0 }));
  $('#pickV').onclick = () => pickFile('video/*,audio/*').then(async ([f]) => {
    if (!f) return;
    const aid = it.assetId || uid();
    try { await store.putAsset(aid, f, f.name); store.put('items', itemId, { assetId: aid, fileName: f.name, size: f.size }); }
    catch (e) { temp.set(itemId, f); toast('Không lưu được vào máy, chỉ xem lần này'); }
    openItem(itemId);
  });
}

function setFrame(f) {
  stage.className = f; grid.className = 'grid ' + f;
  $('#btnFrame').textContent = f === 'portrait' ? '📱 Dọc (TikTok)' : '🖥 Ngang (YouTube)';
}

// ---------- chế độ chép chính tả ----------
let dictOn = false, dictIdx = -1, stopAt = null;

export function setDictMode(on) {
  dictOn = on; stopAt = null;
  document.body.classList.toggle('dictmode', on);
  M.playbackRate = curRate();
  renderList();
}
export function setDictIndex(i) {
  dictIdx = i; renderList();
  const el = list.querySelector(`.cue[data-i="${i}"]`);
  if (el) list.scrollTo({ top: el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2, behavior: 'smooth' });
}
export const refreshList = () => renderList();

// Phát đúng một câu rồi tự dừng (done được gọi khi dừng)
let stopCb = null;
export function playCueOnce(i, rate, done) {
  const c = cues[i]; if (!c) return;
  M.pause();
  M.playbackRate = rate || curRate();
  stopCb = done || null;
  stopAt = c.end + off();
  M.currentTime = Math.max(0, c.start + off() - 0.08);
  M.play();
}

// ---------- chế độ luyện nói ----------
let speakOn = false;
export function setSpeakMode(on) {
  speakOn = on; stopAt = null; stopCb = null;
  document.body.classList.toggle('speakmode', on);
  M.playbackRate = curRate();
}
export const selectCue = i => { if (cues[i]) setCur(i); };

// ---------- hiển thị phụ đề ----------
function renderList() {
  if (dictOn) { // đang chép chính tả: không lộ chữ, chỉ hiện số câu và điểm
    const sc = (item() && item().dict) || {};
    list.innerHTML = cues.map((c, i) =>
      `<div class="cue ${i === dictIdx ? 'active' : ''}" data-i="${i}"><div class="t">${fmt(c.start)}</div><div class="m">Câu ${i + 1} ` +
      `<span class="${sc[i] == null ? 'dim' : sc[i] >= 90 ? 'ok' : sc[i] >= 60 ? 'miss' : 'bad'}">${sc[i] == null ? '—' : '✓ ' + sc[i] + '%'}</span></div></div>`).join('');
    return;
  }
  const bar = itemId ? modeBar(editOn, cues.length) : '';
  if (editOn) {
    const bcp = langInfo(itemLang).bcp;
    list.innerHTML = bar + (cues.length ? cues.map((c, i) => editCard(c, i, bcp)).join('') : '<div class="empty">Chưa có câu nào. Bấm “＋ Thêm câu”.</div>');
    return;
  }
  const sp = (item() && item().speak) || {};
  const starts = new Map(segs.map((s, k) => [s, k]));
  list.innerHTML = bar + cues.map((c, i) => {
    const hd = segOn && starts.has(i)
      ? `<div class="seghd ${starts.get(i) === segIdx ? 'on' : ''}" data-k="${starts.get(i)}"><span>Đoạn ${starts.get(i) + 1} · ${fmtS(c.start)}</span>${i ? `<button class="cut" data-uncut="${i}" title="Bỏ mốc này (gộp với đoạn trên)">✕ gộp</button>` : ''}</div>` : '';
    const cut = segOn && i && !starts.has(i) ? `<button class="cut" data-cut="${i}" title="Chia đoạn ở đây (câu này bắt đầu đoạn mới)">✂</button>` : '';
    return hd + `<div class="cue" data-i="${i}"><div class="t">${fmt(c.start)}${sp[i] != null ? ` <span class="badge">🎙 ${sp[i]}%</span>` : ''}${marks.has(i) ? recBtns(i) : ''}${cut}</div><div class="m">${esc(c.lines[0])}</div>` +
      c.lines.slice(1).map(l => `<div class="s">${esc(l)}</div>`).join('') + '</div>';
  }).join('');
}

// ---------- sửa phụ đề ngay trong danh sách (nút ✏️ ở đầu cột phải) ----------
export const isEditing = () => editOn;
export const videoCueTime = () => Math.max(0, M.currentTime - off());
export const playCue = i => seekCue(i, true);

function doSave() {
  saveT = 0;
  if (itemId) store.put('items', itemId, { cues: JSON.stringify(cues), cueCount: cues.length });
  const s = $('#cueSaved'); if (s) s.textContent = 'Đã lưu ✓';
}
export function flushEdits() { if (saveT) { clearTimeout(saveT); doSave(); } }
const saveSoon = () => { clearTimeout(saveT); saveT = setTimeout(doSave, 600); const s = $('#cueSaved'); if (s) s.textContent = 'Đang lưu…'; };

// sửa một ô của một câu: f = start | end | l1 | l2 | l3 (không vẽ lại danh sách để khỏi mất chỗ đang gõ)
export function editCue(i, f, v) {
  const c = cues[i]; if (!c) return false;
  if (f === 'start' || f === 'end') {
    if (!Number.isFinite(v) || v < 0) return false;
    c[f] = +v.toFixed(2);
  } else {
    const k = { l1: 0, l2: 1, l3: 2 }[f], lines = (c.lines || []).slice();
    while (lines.length <= k) lines.push('');
    lines[k] = v; c.lines = lines;
    if (f === 'l1' && c.t && tokensOf(v, langInfo(itemLang).words).length !== c.t.length) delete c.t; // đổi số chữ thì giờ từng từ không còn đúng
  }
  if (i === cur) { lastRender = -1; renderNow(i); }
  saveSoon();
  return true;
}
// thêm / xóa / gộp câu: lưu ngay và vẽ lại
export function replaceCues(next) { flushEdits(); applyCues(next); }

// gom lại khi thoát chế độ sửa: bỏ câu không có chữ, sửa giờ sai, đổi giản thể, sắp xếp theo giờ
function normalizeCues() {
  const lang = itemLang;
  return cues.filter(c => (c.lines?.[0] || '').trim()).map(c => {
    const s = +c.start || 0; let e = +c.end || s + 2; if (e <= s) e = s + 0.5;
    const lines = (c.lines || []).map(l => zhText((l || '').trim(), lang));
    while (lines.length > 1 && !lines[lines.length - 1]) lines.pop();
    const n = { start: +s.toFixed(2), end: +e.toFixed(2), lines };
    if (c.t) n.t = c.t;
    return n;
  }).sort((a, b) => a.start - b.start);
}
export function setEditMode(on) {
  if (on === editOn) return true;
  if (on) {
    if (!itemId) { toast('Hãy mở một video trước'); return false; }
    if (dictOn || speakOn) { toast('Hãy tắt chế độ chép chính tả / luyện nói trước khi sửa phụ đề'); return false; }
    editOn = true; document.body.classList.add('cueedit'); renderList();
    return true;
  }
  flushEdits();
  const out = normalizeCues();
  if (cues.length && !out.length) { toast('Chưa có câu nào có chữ: hãy nhập chữ cho ít nhất một câu rồi thoát'); return false; }
  editOn = false; document.body.classList.remove('cueedit');
  applyCues(out);
  toast('Đã lưu phụ đề ✓');
  return true;
}

// ---------- chia đoạn ----------
// Một “đoạn” là nhóm câu liên tiếp (ví dụ một lượt thoại của nhân vật). segs = chỉ số câu mở đầu mỗi đoạn.
// Ở chế độ đoạn: video tự dừng khi hết đoạn; “Lặp lại” phát lại đoạn từ mốc đầu; “Tiếp tục” sang đoạn kế.
let segs = [], segOn = false, segIdx = 0, segAtEnd = false, segRepeat = 0;
const segEndCue = i => (segs[i + 1] ?? cues.length) - 1;
const segStartT = i => cues[segs[i]].start + off();
const segEndT = i => cues[segEndCue(i)].end + off();
const segOfCue = ci => { let k = 0; for (let j = 0; j < segs.length; j++) if (segs[j] <= ci) k = j; return k; };
export const getSegs = () => segs.slice();
export const isSegMode = () => segOn;

function normSegs(list) {
  if (!cues.length) return [];
  return [...new Set([0, ...list.filter(i => Number.isInteger(i) && i > 0 && i < cues.length)])].sort((a, b) => a - b);
}
export function setSegments(list) {
  segs = normSegs(list);
  if (itemId) store.put('items', itemId, { segs });
  segIdx = Math.min(segIdx, Math.max(0, segs.length - 1));
  renderList(); updateSegBar();
}
function updateSegBar() {
  const bar = $('#segBar'); if (!bar) return;
  $('#btnSeg').textContent = segs.length > 1 ? `📑 Chia đoạn (${segs.length})` : '📑 Chia đoạn';
  bar.hidden = !(segOn && segs.length);
  if (!segOn || !segs.length) return;
  const a = segs[segIdx], b = segEndCue(segIdx);
  $('#sgNum').textContent = `Đoạn ${segIdx + 1}/${segs.length}`;
  $('#sgTime').textContent = `${fmtS(cues[a].start)} – ${fmtS(cues[b].end)} · ${b - a + 1} câu${segAtEnd ? ' · đã hết đoạn: bấm Lặp lại hoặc Tiếp tục' : ''}`;
  list.querySelectorAll('.seghd').forEach(h => h.classList.toggle('on', +h.dataset.k === segIdx));
}
export function setSegMode(on) {
  if (on && !cues.length) { toast('Video cần có phụ đề trước'); return false; }
  segOn = on; segAtEnd = false;
  document.body.classList.toggle('segmode', on);
  if (on) segIdx = segOfCue(Math.max(0, findCue(M.currentTime)));
  renderList(); updateSegBar();
  return true;
}
// Phát đoạn i từ mốc đầu. keep = true khi tự lặp (không đặt lại số lần lặp)
export function playSeg(i, keep = false) {
  if (!segs.length) return;
  segIdx = Math.max(0, Math.min(segs.length - 1, i)); segAtEnd = false;
  if (!keep) segRepeat = +($('#sgAuto')?.value || 0);
  M.playbackRate = curRate();
  M.currentTime = segStartT(segIdx) + 0.001;
  M.play();
  setCur(segs[segIdx]); updateSegBar();
}
// Gọi trong vòng lặp phát: hết đoạn thì dừng (hoặc tự lặp)
function segTick() {
  if (!segOn || !segs.length || M.paused) return;
  const ct = M.currentTime;
  if (ct < segStartT(segIdx) - 0.4 || ct > segEndT(segIdx) + 0.4) { segIdx = segOfCue(Math.max(0, findCue(ct))); updateSegBar(); } // bạn vừa tua sang chỗ khác
  if (ct >= segEndT(segIdx) - 0.02) {
    M.pause();
    if (segRepeat > 0) { segRepeat--; playSeg(segIdx, true); }
    else { segAtEnd = true; updateSegBar(); }
  }
}

// Hiển thị tối đa 3 dòng: 1 = tiếng gốc, 2 = phiên âm, 3 = nghĩa. Cả ba cùng sáng dần theo giọng nói.
let info = null;
const sum = a => a.reduce((s, x) => s + x, 0);
const cumBefore = a => { let s = 0; return a.map(x => (s += x) - x); };

function renderNow(i) {
  if (i < 0) { now.innerHTML = '<div class="main small">…</div>'; lastRender = -1; info = null; return; }
  const c = cues[i], words = langInfo(itemLang).words;
  const toks = words ? c.lines[0].split(/(\s+)/) : [...c.lines[0]];
  const w1 = [];
  const main = toks.map(t => {
    if (/^\s+$/.test(t)) return t;
    w1.push(tokenWeight(t, words));
    return `<span class="ch">${esc(t)}</span>`;
  }).join('');
  let html = `<div class="l1 main">${main}</div>`;
  const rest = c.lines.slice(1).map(l => l.split(/\s+/).filter(Boolean));
  rest.forEach((ws, k) => { html += `<div class="sub l${Math.min(k + 2, 3)}">${ws.map(x => `<span class="w">${esc(x)}</span>`).join(' ')}</div>`; });
  // luôn đủ 3 dòng: dòng nào chưa có thì hiện chỗ trống mờ
  html += [2, 3].filter(k => c.lines.length < k).map(k => `<div class="subph l${k}">${k === 2 ? '— chưa có phiên âm —' : '— chưa có nghĩa —'}</div>`).join('');
  now.innerHTML = html;

  const content = w1.filter(x => x > 0).length;
  let pc = 0;
  info = {
    w1, tot: sum(w1) || 1, cum: cumBefore(w1),
    pc: [0, ...w1.map(x => (pc += x > 0 ? 1 : 0))],        // số chữ có nghĩa trong n chữ đầu
    lines: rest.map(ws => {
      const wt = ws.map(x => Math.max(1, [...x].filter(ch => /[\p{L}\p{N}]/u.test(ch)).length));
      return { direct: ws.length === content, tot: sum(wt) || 1, cum: cumBefore(wt), n: ws.length };
    }),
  };
  applyHide();
  lastRender = i;
}
// 0 = hiện hết, 1 = ẩn dòng cuối (nghĩa), 2 = ẩn cả phiên âm và nghĩa
function applyHide() {
  const h = prefs.hideSub, subs = now.querySelectorAll('.sub');
  subs.forEach((el, i) => { el.style.visibility = (h >= 2 || (h === 1 && i === subs.length - 1)) ? 'hidden' : 'visible'; });
  now.querySelectorAll('.subph').forEach(el => { el.style.visibility = (h >= 2 || (h === 1 && el.classList.contains('l3'))) ? 'hidden' : 'visible'; });
}

// Gợi ý khi phụ đề thiếu dòng phiên âm / nghĩa
function updateSubHint() {
  const el = $('#subHint');
  if (!el) return;
  const n = cues.length;
  if (!itemId || !n) { el.hidden = true; return; }
  const m2 = cues.filter(c => !c.lines[1]).length / n >= 0.5, m3 = cues.filter(c => !c.lines[2]).length / n >= 0.5;
  if (!m2 && !m3) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `Phụ đề chưa có <b>${m2 && m3 ? 'phiên âm và nghĩa' : m2 ? 'phiên âm' : 'nghĩa'}</b>. <button class="btn" id="hintPaste">📋 Dán phiên âm / nghĩa</button> <button class="btn" id="hintPrompt">🤖 Prompt mẫu cho AI</button>`;
  $('#hintPaste').onclick = () => bus.emit('openPaste', { prompt: false });
  $('#hintPrompt').onclick = () => bus.emit('openPaste', { prompt: true });
}

// Phụ đề tiếng Trung cũ: tự đổi sang giản thể và (một lần) tự tạo dòng pinyin nếu mới có 1 dòng
async function migrateCues(my) {
  if (itemLang !== 'zh' || !cues.length) return;
  let next = cues, changed = false;
  try {
    if (prefs.simpOnly) { const s = await simplifyCues(cues, 'zh'); if (JSON.stringify(s) !== JSON.stringify(cues)) { next = s; changed = true; } }
    const it = item();
    if (it && !it.pyDone && next.every(c => c.lines.length === 1)) {
      next = JSON.parse(JSON.stringify(next));
      if (await addPinyin(next)) changed = true;
      store.put('items', my, { pyDone: true });
    }
  } catch (e) { console.warn('migrate', e); return; }
  if (changed && itemId === my) { applyCues(next); toast('Đã đổi sang chữ giản thể và tự tạo phiên âm pinyin'); }
}

// Tỉ lệ đã đọc xong của câu (0..1), bám theo giờ từng chữ nếu có
function fraction(cc, rel, n, timed) {
  if (!info) return 0;
  if (!timed) return Math.min(1, Math.max(0, rel / (cc.end - cc.start)));
  if (n === 0) return 0;
  const k = n - 1, tEnd = k + 1 < cc.t.length ? cc.t[k + 1] : cc.end - cc.start;
  const part = Math.min(1, Math.max(0, (rel - cc.t[k]) / Math.max(0.05, tEnd - cc.t[k])));
  return Math.min(1, (info.cum[k] + info.w1[k] * part) / info.tot);
}

function findCue(t) {
  t -= off();
  let lo = 0, hi = cues.length - 1, ans = -1;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (cues[mid].start <= t) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
  return ans;
}

function setCur(i) {
  cur = i; passT = 0; counted = false;
  if (!dictOn) list.querySelectorAll('.cue.active').forEach(e => e.classList.remove('active'));
  if (i >= 0 && !dictOn) {
    const el = list.querySelector(`.cue[data-i="${i}"]`);
    if (el) {
      el.classList.add('active');
      const typing = editOn && list.contains(document.activeElement) && document.activeElement.matches?.('input'); // đang gõ trong danh sách thì không cuộn đi chỗ khác
      if (!typing) list.scrollTo({ top: el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2, behavior: 'smooth' });
    }
  }
  if (i !== lastRender) renderNow(i);
}

function seekCue(i, play) {
  i = Math.max(0, Math.min(cues.length - 1, i));
  if (!cues[i]) return;
  M.currentTime = cues[i].start + off() + 0.001;
  setCur(i);
  if (play) M.play();
}
const here = () => (cur < 0 ? Math.max(0, findCue(M.currentTime)) : cur);

function step() {
  const ts = performance.now();
  const dt = lastTs ? Math.min(1.5, (ts - lastTs) / 1000) : 0;
  lastTs = ts;
  if (stopAt != null && !M.paused && M.currentTime >= stopAt - 0.02) { // chép chính tả / luyện nói: hết câu thì dừng
    M.pause(); stopAt = null; M.playbackRate = curRate();
    const cb = stopCb; stopCb = null; cb?.();
  }
  segTick();
  if (cues.length) {
    const ct = M.currentTime, t = ct - off();
    const i = findCue(ct), c = cues[i];
    const idx = (c && t < c.end) ? i : -1;
    if (!segOn && cur >= 0 && cues[cur] && t >= cues[cur].end - 0.02 && !M.paused && idx !== cur) {
      if (prefs.loop) { M.currentTime = cues[cur].start + off(); passT = 0; counted = false; }
      else if (prefs.autopause) { M.pause(); M.currentTime = cues[cur].end + off() - 0.03; }
    }
    if (idx !== cur && (idx >= 0 || segOn || !(prefs.loop || prefs.autopause))) setCur(idx);
    if (cur >= 0 && cues[cur]) {
      const cc = cues[cur];
      if (!M.paused) {
        passT += dt * M.playbackRate;
        if (!counted && passT >= 0.8 * (cc.end - cc.start)) { counted = true; if (!dictOn && !speakOn) tracker.sentence(); }
      }
      const chs = now.querySelectorAll('.ch'), rel = t - cc.start + (prefs.wordLead ?? 30) / 1000; // chữ sáng sớm hơn một chút để bù độ trễ
      const timed = !!(cc.t && cc.t.length === chs.length);
      let n;
      if (timed) { n = 0; while (n < cc.t.length && cc.t[n] <= rel) n++; } // chữ nào tới giờ thì sáng
      else n = Math.round(Math.min(1, Math.max(0, rel / (cc.end - cc.start))) * chs.length); // chưa có giờ: chia đều
      chs.forEach((el, k) => el.classList.toggle('on', k < n));
      if (info && info.lines.length) {
        const f = fraction(cc, rel, n, timed);
        now.querySelectorAll('.sub').forEach((el, li) => {
          const L = info.lines[li]; if (!L) return;
          const lit = info.pc[n]; // phiên âm đúng số chữ: sáng cùng từng chữ gốc
          for (let k = 0; k < el.children.length; k++) {
            el.children[k].classList.toggle('on', L.direct ? k < lit : f > 0 && (k === 0 || L.cum[k] / L.tot < f));
          }
        });
      }
    }
  }
}
// rAF cho chữ chạy mượt; bộ định giờ dự phòng cho lúc trình duyệt ngưng vẽ (thu nhỏ, khóa màn hình…)
function loop() { if (!M.paused || document.body.dataset.view === 'player') step(); requestAnimationFrame(loop); } // đang ở trang khác và video không chạy: khỏi tính từng khung hình

function persistPos() {
  if (!itemId || !cues.length) return;
  const p = M.currentTime || 0;
  if (Math.abs(p - lastSaved) < 1.5) return;
  lastSaved = p;
  store.put('items', itemId, { position: p });
}

// ---------- cài đặt ----------
export function applyPrefs() {
  $('#wordLead').value = String(prefs.wordLead ?? 30);
  $('#rate').value = String(curRate());
  M.playbackRate = curRate();
  $('#loop').checked = prefs.loop;
  $('#autopause').checked = prefs.autopause;
  $('#hideSub').value = String(prefs.hideSub);
  $('#bLoop').classList.toggle('on', prefs.loop);
  $('#bHide').classList.toggle('on', prefs.hideSub > 0);
  $('#bHide').textContent = ['🙈', '🙈¹', '🙈²'][prefs.hideSub] || '🙈';
  applyHide();
}
function readPrefs() {
  const wl = parseInt($('#wordLead').value, 10);
  prefs.wordLead = Number.isFinite(wl) ? Math.max(-300, Math.min(500, wl)) : 30;
  const rate = parseFloat($('#rate').value) || 1;
  if (itemId) store.put('items', itemId, { rate }); else prefs.rate = rate;
  prefs.loop = $('#loop').checked;
  prefs.autopause = $('#autopause').checked;
  prefs.hideSub = +$('#hideSub').value || 0;
  applyPrefs();
  clearTimeout(readPrefs.t); readPrefs.t = setTimeout(savePrefs, 800);
}

export function init() {
  now.innerHTML = EMPTY;
  ['rate', 'loop', 'autopause', 'hideSub', 'wordLead'].forEach(id => $('#' + id).addEventListener('change', readPrefs));
  $('#offset').addEventListener('change', () => { if (itemId) store.put('items', itemId, { offset: off() }); });
  $('#btnSet').onclick = () => $('#settings').classList.toggle('open');
  $('#btnCard').onclick = () => {
    if (!itemId || !cues.length) { toast('Hãy mở video có phụ đề trước'); return; }
    const i = here();
    toast(addCueCard(itemId, i) ? `Đã lưu câu ${i + 1} vào sổ ôn 📒` : 'Câu này đã có trong sổ ôn');
  };
  $('#btnAdd').onclick = () => pickAndAdd('');
  $('#btnFrame').onclick = () => {
    if (!itemId) return;
    const f = (item().frame || 'landscape') === 'portrait' ? 'landscape' : 'portrait';
    store.put('items', itemId, { frame: f }); setFrame(f);
  };
  $('#sfile').onchange = async e => {
    const f = e.target.files[0]; e.target.value = '';
    if (!f) return;
    if (!itemId) { toast('Hãy mở một video trước'); return; }
    const c = await simplifyCues(parseSubs(await f.text(), langInfo(itemLang).words), itemLang);
    if (!c.length) { toast('Không đọc được phụ đề (cần SRT/VTT)'); return; }
    setCuesFromFile(c);
    if (timedCount(c)) toast(`Phụ đề có sẵn giờ từng từ ở ${timedCount(c)}/${c.length} câu`);
  };
  list.addEventListener('click', e => {
    const recB = e.target.closest('[data-rec],[data-sc]');
    if (recB) { e.stopPropagation(); bus.emit(recB.dataset.rec != null ? 'playRec' : 'scoreRec', +(recB.dataset.rec ?? recB.dataset.sc)); return; } // nghe lại / chấm giọng mình, không tua video
    const cutB = e.target.closest('[data-cut]'), unB = e.target.closest('[data-uncut]');
    if (cutB) { e.stopPropagation(); setSegments([...segs, +cutB.dataset.cut]); return; }          // chia đoạn: câu này mở đầu đoạn mới
    if (unB) { e.stopPropagation(); const k = +unB.dataset.uncut; setSegments(segs.filter(s => s !== k)); return; } // gộp lại
    if (editOn && !dictOn) return; // đang sửa: chạm vào ô nhập không được tua video
    const el = e.target.closest('.cue'); if (!el) return;
    if (segOn && !dictOn && !speakOn) { segIdx = segOfCue(+el.dataset.i); segAtEnd = false; segRepeat = +($('#sgAuto')?.value || 0); seekCue(+el.dataset.i, true); updateSegBar(); return; } // chọn câu làm điểm bắt đầu
    if (dictOn) bus.emit('dictGo', +el.dataset.i);
    else if (speakOn) bus.emit('speakGo', +el.dataset.i);
    else seekCue(+el.dataset.i, true);
  });

  $('#bPrev').onclick = () => (segOn ? playSeg(segIdx - 1) : seekCue(here() - 1, true));
  $('#bNext').onclick = () => (segOn ? playSeg(segIdx + 1) : seekCue(here() + 1, true));
  $('#bReplay').onclick = () => (segOn ? playSeg(segIdx) : seekCue(here(), true));
  $('#sgPrev').onclick = () => playSeg(segIdx - 1);
  $('#sgRepeat').onclick = () => playSeg(segIdx);
  $('#sgNext').onclick = () => { if (segIdx + 1 < segs.length) playSeg(segIdx + 1); else toast('Đây là đoạn cuối'); };
  $('#sgOff').onclick = () => setSegMode(false);
  $('#bPlay').onclick = () => (M.paused ? M.play() : M.pause());
  $('#bLoop').onclick = () => { $('#loop').checked = !$('#loop').checked; readPrefs(); };
  $('#bHide').onclick = () => { $('#hideSub').value = String(((+$('#hideSub').value || 0) + 1) % 3); readPrefs(); };
  M.addEventListener('play', () => {
    $('#bPlay').textContent = '⏸';
    if (segOn && segAtEnd) { // đang dừng ở cuối đoạn mà bấm phát: “Tiếp tục” sang đoạn kế
      if (segIdx + 1 < segs.length) playSeg(segIdx + 1);
      else { M.pause(); toast('Đã hết đoạn cuối'); }
    }
  });
  M.addEventListener('pause', () => { $('#bPlay').textContent = '▶'; persistPos(); });
  M.addEventListener('ended', persistPos);
  M.addEventListener('loadedmetadata', () => {
    const it = item(); if (!it) return;
    M.playbackRate = curRate();
    if (!it.frame && M.videoWidth) {
      const f = M.videoHeight > M.videoWidth ? 'portrait' : 'landscape';
      store.put('items', itemId, { frame: f }); setFrame(f);
    }
    const d = M.duration;
    if (isFinite(d) && d > 0 && it.duration !== Math.round(d)) store.put('items', itemId, { duration: Math.round(d) });
    if (it.position > 1 && it.position < d - 2) { M.currentTime = it.position; toast('Tiếp tục từ ' + fmtS(it.position)); }
  });

  document.addEventListener('keydown', e => {
    if (document.body.dataset.view !== 'player' || e.target.matches?.('input,select,textarea')) return;
    const a = shortcuts.actionFor(e);
    if (!a) return;
    e.preventDefault();
    if (a === 'play') M.paused ? M.play() : M.pause();
    else if (a === 'next') segOn ? playSeg(segIdx + 1) : seekCue(here() + 1, true);
    else if (a === 'prev') segOn ? playSeg(segIdx - 1) : seekCue(here() - 1, true);
    else if (a === 'replay') segOn ? playSeg(segIdx) : seekCue(here(), true);
    else if (a === 'loop') $('#bLoop').click();
    else if (a === 'hide') $('#bHide').click();
    else if (a === 'card') $('#btnCard').click();
    else if (a === 'lookup') $('#btnLookup').click();
    else if (a === 'slower' || a === 'faster') { // chuyển sang mức tốc độ kế bên trong danh sách
      const sel = $('#rate'), i = sel.selectedIndex + (a === 'faster' ? 1 : -1);
      if (i >= 0 && i < sel.options.length) { sel.selectedIndex = i; readPrefs(); toast(`Tốc độ ${sel.value}×`, 1200); }
    }
  });

  setInterval(() => { if (!M.paused) persistPos(); }, 10000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) persistPos(); });
  addEventListener('pagehide', persistPos);
  tracker.addSource(() => (itemId && !M.paused && !M.ended && M.readyState > 2 ? itemLang : null));
  bus.on('prefs', applyPrefs);
  bus.on('lang', () => { if (!itemId) now.innerHTML = EMPTY; });
  applyPrefs();
  requestAnimationFrame(loop);
  setInterval(step, 150);
}
