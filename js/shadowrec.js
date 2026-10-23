// Ghi âm NGAY TRONG phiên học shadowing. Bản ghi chỉ là TẠM THỜI trong bộ nhớ, không lưu thành file nào:
//  - bật nút 🎙 ở thanh điều khiển rồi bấm Play, nói theo video; video chạy tới câu nào thì giọng bạn được ghi cho câu đó;
//  - mặc định CHỈ GHI: bạn nghe lại từng câu (nút ▶ ở đầu câu) và tự đánh giá. Chỉ khi bạn bấm 🎯 mới chấm điểm (hoặc bật “Chấm ngay”);
//  - chấm điểm dùng AI Whisper chạy ở luồng nền nên video và giao diện không bị khựng; chỉ lưu ĐIỂM của lần nói gần nhất
//    cho từng câu (cùng chỗ với điểm của khung Luyện nói), không lưu đoạn ghi âm;
//  - mỗi câu chỉ giữ bản ghi của lần nói gần nhất; hết video / đổi bài / rời trang / tắt nút 🎙 là xóa sạch.
//  - Nên dùng tai nghe để tiếng video không lọt vào micro (trình duyệt đã bật khử vọng nhưng tai nghe vẫn tốt nhất).
import { $, toast, bus, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { M } from './media.js';
import { currentCues, currentItemId, currentCueIndex, currentLang, cueSpan, markScore, setRecMarks, markCue, playCueOnce } from './player.js';
import * as speak from './speak.js';

const TAIL = 1.0;      // giây ghi thêm sau khi câu gốc hết: người học nói chậm hơn video một nhịp
const MIN_PEAK = 10;   // biên độ tối thiểu (0..128) để coi là có nói
const MIN_BYTES = 1500;
const MAX_KEEP = 80;   // tối đa 80 câu giữ trong RAM (mỗi câu vài chục KB); quá thì bỏ câu cũ nhất
const KEY = 'shadowRec', KEY_SCORE = 'shadowScore';
const MAX_QUEUE = 2;   // “Chấm ngay” mà máy chấm chậm hơn tốc độ nói (Whisper ~5 giây / câu) thì bỏ bớt câu cũ, ưu tiên câu mới
const sleep = ms => new Promise(r => setTimeout(r, ms));

let armed = false, opening = false, busy = false, startFailed = false, scoreOn = false, over = false, askedModel = false;
let stream = null, ctx = null, an = null, buf = null;
let lastI = -1;        // câu vừa nói gần nhất
let result = null, level = 0, track = -1, lastT = 0, lastPlay = 0, shown = '', epoch = 0;
let queue = [], scoring = false, scoringI = -1, loadMsg = '', mineUrl = '', mineIdx = -1;
const takes = new Map(); // câu đang ghi -> { rec, chunks, peak, partial, deadline, item, epoch }
const ram = new Map();   // câu -> bản ghi của lần nói gần nhất (chỉ trong RAM)
const marks = new Set(); // các câu đang có bản ghi (để vẽ nút ▶ 🎯 ở đầu câu)
const counted = new Set();
const mine = new Audio();

// ---------- micro ----------
async function openStream() {
  if (stream) return true;
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Trình duyệt này không cho ghi âm (cần mở bằng https)', 5000); return false; }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false } });
  } catch (e) {
    toast(e.name === 'NotAllowedError' ? 'Bạn chưa cho phép dùng micro. Bấm biểu tượng ổ khóa trên thanh địa chỉ để cho phép.' : 'Không mở được micro: ' + e.message, 6000);
    return false;
  }
  const Ctx = window.AudioContext || window.webkitAudioContext;
  ctx = new Ctx(); ctx.resume?.();
  an = ctx.createAnalyser(); an.fftSize = 512; buf = new Uint8Array(an.fftSize);
  ctx.createMediaStreamSource(stream).connect(an);
  return true;
}
function closeStream() {
  finishAll();
  stream?.getTracks().forEach(t => t.stop());
  stream = null; ctx?.close?.(); ctx = null; an = null; level = 0;
}
function readLevel() {
  if (!an) return 0;
  an.getByteTimeDomainData(buf);
  let p = 0; for (const v of buf) p = Math.max(p, Math.abs(v - 128));
  return p;
}

// ---------- ghi từng câu (chỉ trong RAM) ----------
function startTake(i, sp, ct) {
  if (takes.has(i)) finish(i); // tua lại / phát lại cùng câu: chốt lần trước rồi ghi lần mới
  const chunks = [], rec = (() => { try { return new MediaRecorder(stream); } catch { return null; } })();
  const t = { rec, chunks, peak: 0, partial: ct > sp.start + 0.8, item: currentItemId(), epoch,
    deadline: performance.now() + Math.min(25, (sp.end - ct) / Math.max(0.3, M.playbackRate) + TAIL) * 1000 };
  try {
    if (!rec) throw new Error('trình duyệt không hỗ trợ');
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    rec.onstop = () => done(i, t);
    rec.start();
  } catch (e) { // micro bị ngắt (rút tai nghe…) hoặc trình duyệt từ chối: nhả micro, lần phát sau sẽ mở lại
    if (!stream?.active) closeStream();
    if (!startFailed) toast('Không ghi âm được câu này: ' + e.message);
    startFailed = true; setTimeout(() => { startFailed = false; }, 5000);
    return;
  }
  takes.set(i, t);
}
function finish(i) {
  const t = takes.get(i);
  if (!t) return;
  takes.delete(i);
  try { if (t.rec.state !== 'inactive') t.rec.stop(); } catch { /* đã dừng */ }
}
const finishAll = () => [...takes.keys()].forEach(finish);

// Ghi xong một câu: bỏ nếu im lặng / chỉ ghi được nửa câu / đã sang video khác; ngược lại giữ trong RAM (thay bản cũ của câu đó)
function done(i, t) {
  const blob = new Blob(t.chunks, { type: t.rec.mimeType || 'audio/webm' });
  if (t.epoch !== epoch || t.item !== currentItemId() || t.partial || blob.size < MIN_BYTES || t.peak < MIN_PEAK) return;
  const key = t.item + ':' + i;
  if (!counted.has(key)) { counted.add(key); tracker.speak(); }
  if (!over) {
    if (i === mineIdx) mine.pause();
    ram.delete(i); ram.set(i, blob);
    while (ram.size > MAX_KEEP) { const old = ram.keys().next().value; ram.delete(old); marks.delete(old); document.querySelectorAll(`#cueList .cue[data-i="${old}"] .rb`).forEach(b => b.remove()); }
    lastI = i; marks.add(i); markCue(i); $('#rbBtns').hidden = false;
  }
  if (scoreOn) enqueue({ i, item: t.item, blob, epoch });
}

// ---------- chấm điểm (chỉ khi bạn bấm 🎯, hoặc khi bật “Chấm ngay”) ----------
function enqueue(job) {
  if (job.manual) queue.unshift(job);                 // bấm chấm là chấm, không bị bỏ
  else {
    queue.push(job);
    while (queue.filter(j => !j.manual).length > MAX_QUEUE) queue.splice(queue.findIndex(j => !j.manual), 1);
  }
  pump();
}
async function pump() {
  if (scoring) return;
  const job = queue.shift();
  if (!job) { if (over) dropAudio(); return; }
  scoring = true; scoringI = job.i;
  try { await scoreJob(job); } finally { scoring = false; scoringI = -1; pump(); }
}
async function scoreJob(job) {
  const cue = currentCues()[job.i];
  if (!cue || job.epoch !== epoch || job.item !== currentItemId()) return;
  try {
    const r = await speak.grade(job.blob, cue.lines[0], currentLang(), { bg: true, onLoad: p => { loadMsg = `Đang tải mô hình AI… ${Math.round(p)}%`; } });
    loadMsg = '';
    if (job.epoch !== epoch || job.item !== currentItemId()) return; // đã sang video khác: bỏ kết quả
    const sc = { ...(store.get('items', job.item)?.speak || {}) };
    sc[job.i] = r.score;                                              // chỉ giữ điểm của lần nói gần nhất
    store.put('items', job.item, { speak: sc });
    markScore(job.i, r.score);
    showResult(job.i, r);
  } catch (e) {
    loadMsg = '';
    if (job.epoch === epoch) toast('Chưa chấm được: ' + (e.message || e), 4000);
    console.warn(e);
  }
}
function showResult(i, r) {
  result = { i, score: r.score };
  const cls = r.score >= 90 ? 'ok' : r.score >= 60 ? 'miss' : 'bad', bcp = langInfo(currentLang()).bcp, el = $('#rbResult');
  el.hidden = false;
  el.innerHTML = `<div class="score ${cls}">Câu ${i + 1}: ${r.score}%</div>` +
    `<div class="line" lang="${bcp}">${r.refHTML}</div>` +
    `<div class="line" lang="${bcp}">${r.heard ? r.typedHTML : '<span class="dim">(không nghe được gì: hãy nói to hơn hoặc gần micro hơn)</span>'}</div>`;
}
// Lần đầu cần tải mô hình AI (~80 MB): hỏi trước, đồng ý một lần là đủ; sau đó dùng offline được
async function modelCached() { try { return (await caches.keys()).some(k => /transformers/i.test(k)); } catch { return true; } }
async function allowModel() {
  if (askedModel || await modelCached()) return true;
  if (!confirm('Chấm điểm cần tải mô hình AI (khoảng 80 MB, chỉ lần đầu, sau đó dùng offline được). Tải bây giờ?')) return false;
  askedModel = true;
  return true;
}
async function scoreOne(i) {
  const blob = ram.get(i);
  if (!blob) { toast('Chưa có bản ghi để chấm'); return; }
  if (!(await allowModel())) return;
  enqueue({ i, item: currentItemId(), blob, epoch, manual: true });
}

// ---------- xóa sạch bản ghi tạm ----------
function dropAudio() {
  ram.clear(); marks.clear(); lastI = -1; mineIdx = -1; mine.pause();
  document.querySelectorAll('#cueList .rb').forEach(b => b.remove());
  if (mineUrl) { URL.revokeObjectURL(mineUrl); mineUrl = ''; }
  mine.removeAttribute('src');
}
function wipe() {
  epoch++; queue.length = 0; over = false;
  for (const i of [...takes.keys()]) { const t = takes.get(i); takes.delete(i); try { if (t.rec.state !== 'inactive') t.rec.stop(); } catch { /* đã dừng */ } }
  dropAudio(); result = null; track = -1; loadMsg = '';
  $('#rbResult').hidden = true; $('#rbBtns').hidden = true;
}

// ---------- vòng kiểm tra 10 lần / giây ----------
const blocked = () => {
  const c = document.body.classList;
  return busy || c.contains('speakmode') || c.contains('dictmode') || c.contains('cueedit');
};
function tick() {
  if (!armed) return;
  const now = performance.now(), playing = !M.paused && document.body.dataset.view === 'player';
  if (playing) lastPlay = now;
  level = readLevel();
  for (const t of takes.values()) t.peak = Math.max(t.peak, level);
  if (!playing) {
    for (const t of takes.values()) t.deadline = Math.min(t.deadline, now + 700); // dừng video: cho nói nốt rồi chốt
    if (stream && !takes.size && now - lastPlay > 20000) closeStream();           // dừng lâu: nhả micro
  } else if (!stream) {
    if (!opening) { opening = true; openStream().finally(() => { opening = false; }); }
  } else if (!blocked()) {
    const ct = M.currentTime, i = currentCueIndex(), sp = cueSpan(i), jumped = ct < lastT - 0.4;
    lastT = ct;
    if (sp && ct >= sp.start - 0.3 && ct <= sp.end && (i !== track || jumped)) { track = i; startTake(i, sp, ct); }
  }
  for (const [i, t] of [...takes]) if (now >= t.deadline) finish(i);
  status();
}
function status() {
  const el = $('#rbTxt');
  if (!el) return;
  const n = takes.size;
  const s = busy ? 'Đang nghe lại…' : loadMsg || (n ? `🔴 Đang ghi câu ${Math.max(...takes.keys()) + 1}` : scoring ? `⏳ Đang chấm câu ${scoringI + 1}…`
    : result ? `✓ Câu ${result.i + 1}: ${result.score}%` : lastI >= 0 ? `✓ Đã ghi câu ${lastI + 1}` : M.paused ? '🎙 Sẵn sàng: bấm Play và nói theo video' : '🎙 Đang nghe giọng bạn…');
  if (s !== shown) { shown = s; el.textContent = s; }
  $('#rbMeter i').style.width = Math.min(100, level * 1.6) + '%';
  $('#bRec').classList.toggle('rec', n > 0);
}

// ---------- nghe lại giọng mình ở câu i ----------
async function playMine(i) {
  const blob = ram.get(i);
  if (!blob) { toast('Chưa có bản ghi để nghe'); return; }
  if (mineIdx === i && !mine.paused) { mine.pause(); return; }
  M.pause(); mine.pause();
  if (mineUrl) URL.revokeObjectURL(mineUrl);
  mineUrl = URL.createObjectURL(blob); mineIdx = i;
  mine.src = mineUrl;
  await mine.play().catch(() => toast('Không phát được bản ghi'));
  await new Promise(res => { mine.onended = res; mine.onpause = res; });
}
async function compare(i) {
  if (busy || !ram.has(i)) return;
  busy = true; mine.pause();
  try {
    const c = currentCues()[i], dur = c ? c.end - c.start : 5;
    await Promise.race([new Promise(res => playCueOnce(i, 1, res)), sleep((dur + 3) * 1000)]);
    M.pause(); await sleep(350);
    await playMine(i);
  } finally { busy = false; track = -1; }
}

// ---------- nút bật / tắt ----------
function paint() {
  $('#bRec').classList.toggle('on', armed);
  if (!armed) $('#bRec').classList.remove('rec');
  $('#recBar').hidden = !armed;
  $('#rbScoreOn').checked = scoreOn;
}
const saveFlag = (k, v) => { try { localStorage.setItem(k, v ? '1' : '0'); } catch { /* bỏ qua */ } };
async function toggle() {
  if (armed) {
    armed = false; wipe(); closeStream(); paint(); saveFlag(KEY, false);
    return;
  }
  if (!currentItemId() || !currentCues().length) { toast('Hãy mở video có phụ đề trước'); return; }
  if (!(await openStream())) return;
  armed = true; over = false; shown = '';
  if (scoreOn && !(await allowModel())) scoreOn = false, saveFlag(KEY_SCORE, false);
  paint(); saveFlag(KEY, true);
  toast('Đã bật ghi âm khi học: bấm Play và nói theo video. Bản ghi chỉ là tạm thời, hết video là xóa; muốn chấm điểm thì bấm 🎯.', 6000);
}

export function init() {
  try { armed = localStorage.getItem(KEY) === '1'; scoreOn = localStorage.getItem(KEY_SCORE) === '1'; } catch { armed = false; }
  try { for (const k of Object.keys(localStorage)) if (k.startsWith('shadowRecs:')) localStorage.removeItem(k); } catch { /* dọn khóa của bản thử cũ */ }
  setRecMarks(marks);
  $('#bRec').onclick = toggle;
  $('#rbPlay').onclick = () => playMine(lastI);
  $('#rbAB').onclick = () => compare(lastI);
  $('#rbScore').onclick = () => scoreOne(lastI);
  $('#rbScoreOn').onchange = async e => {
    scoreOn = e.target.checked; saveFlag(KEY_SCORE, scoreOn);
    if (scoreOn && !(await allowModel())) { scoreOn = false; e.target.checked = false; saveFlag(KEY_SCORE, false); }
  };
  bus.on('playRec', playMine);
  bus.on('scoreRec', scoreOne);
  bus.on('item', () => wipe());
  M.addEventListener('pause', () => { track = -1; });
  M.addEventListener('play', () => { track = -1; lastT = M.currentTime; over = false; });
  M.addEventListener('ended', () => { over = true; $('#rbBtns').hidden = true; dropAudio(); }); // hết video: xóa bản ghi (câu đang chấm dở vẫn được chấm xong, điểm vẫn hiện)
  bus.on('show', v => { if (v !== 'player') { wipe(); closeStream(); } });
  addEventListener('pagehide', () => { wipe(); closeStream(); });
  setInterval(tick, 100);
  paint();
}
