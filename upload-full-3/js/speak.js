// Luyện nói: nghe câu gốc, ghi âm giọng bạn, nghe so sánh, rồi AI Whisper nghe lại giọng bạn để chấm.
// Bản ghi âm chỉ lưu trong máy này. Việc chấm chạy ngay trên máy, không gửi âm thanh đi đâu.
import { $, esc, toast, bus, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { addCueCard } from './cards.js';
import { M } from './media.js';
import { currentCues, currentItemId, currentLang, setSpeakMode, selectCue, playCueOnce, refreshList } from './player.js';
import { zhText } from './prefs.js';
import { loadSimplifier } from './util.js';
import { decodeAudio, transcribe, transcribeBg, warmBg } from './align.js';
import { itemsOf, compareItems } from './dictation.js';
import * as viz from './shadowviz.js';

const PINYIN = 'https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm';
const LETTER = /[\p{L}\p{N}]/u;

let on = false, idx = 0, recording = false, hasMine = false, scoring = false;
let stream = null, rec = null, chunks = [], timer = null, tick = null, ctx = null;
const mine = new Audio();
const counted = new Set();

const cues = () => currentCues();
const recId = i => `rec:${currentItemId()}:${i}`;
const stat = t => { $('#spStat').textContent = t || ''; };
const scores = () => (store.get('items', currentItemId())?.speak) || {};

// ---------- so sánh giọng nói với câu gốc ----------
// Tiếng Trung: so theo phiên âm (bỏ qua chữ giản/phồn và chữ đồng âm); các tiếng khác so theo chữ / từ.
async function pinyinItems(text, ignoreTone) {
  const { pinyin } = await import(/* @vite-ignore */ PINYIN);
  const chars = [...text];
  let arr = pinyin(text, { type: 'array', toneType: 'symbol' });
  if (arr.length !== chars.length) arr = chars.map(ch => pinyin(ch, { toneType: 'symbol' }));
  return chars.map((ch, i) => {
    if (!LETTER.test(ch)) return { s: ch, k: '' };
    let k = String(arr[i]).normalize('NFKC').toLowerCase();
    if (ignoreTone) k = k.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/v/g, 'u');
    return { s: ch, k };
  });
}
async function buildItems(text, lang) {
  if (lang === 'zh') return pinyinItems(text, $('#spTone').checked);
  return itemsOf(text, { words: langInfo(lang).words });
}

// ---------- ghi âm ----------
function meter(analyser) {
  const buf = new Uint8Array(analyser.fftSize);
  const t0 = performance.now();
  tick = setInterval(() => {
    analyser.getByteTimeDomainData(buf);
    let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v - 128));
    $('#spMeter i').style.width = Math.min(100, peak * 1.6) + '%';
    stat(`🔴 Đang ghi… ${((performance.now() - t0) / 1000).toFixed(1)} giây`);
  }, 80);
}

// ---------- sóng âm + cao độ: bản gốc ↔ giọng bạn ----------
let vizSeq = 0;
async function refreshViz() {
  const box = $('#spViz');
  if (!on || !$('#spVizOn').checked) { box.hidden = true; return; }
  const my = ++vizSeq, i = idx, cue = cues()[i], id = currentItemId(), offs = parseFloat($('#offset').value) || 0;
  box.hidden = false; $('#spVizNote').textContent = 'Đang đọc âm thanh…';
  const [xo, a] = await Promise.all([viz.origPCM(id), hasMine ? store.getAsset(recId(i)) : null]);
  if (my !== vizSeq) return;
  const o = xo && cue ? viz.analyse(xo, cue.start + offs - 0.1, cue.end + offs + 0.1) : null;
  let m = null;
  if (a?.blob) { try { const xm = await decodeAudio(a.blob); m = viz.analyse(xm, 0, xm.length / 16000); } catch { /* bỏ qua bản ghi hỏng */ } }
  if (my !== vizSeq) return;
  viz.draw($('#spWave'), $('#spPitch'), o, m);
  $('#spVizNote').textContent = !o && !m ? 'Chưa có dữ liệu: hãy ghi âm câu này.' : !o ? 'Không đọc được âm thanh gốc (video YouTube/TikTok hoặc chưa có file): chỉ hiện giọng bạn.' : !m ? 'Ghi âm giọng bạn để so sánh với bản gốc.' : '';
}

// ---------- tăng tốc dần: nghe và nhắc lại ở 0.6× → 0.75× → 0.9× → 1× ----------
let ramp = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
function stopRamp(keepMedia) {
  if (!ramp) return;
  ramp = false; $('#spRamp').textContent = '📈 Tăng tốc dần';
  if (!keepMedia) { M.pause(); stat(''); }
}
async function runRamp() {
  if (ramp) { stopRamp(); return; }
  if (recording) return;
  ramp = true; $('#spRamp').textContent = '■ Dừng tăng tốc';
  const steps = [0.6, 0.75, 0.9, 1], my = idx, cue = cues()[idx], dur = Math.max(0.8, cue.end - cue.start);
  for (let k = 0; k < steps.length && ramp && idx === my; k++) {
    stat(`📈 Tăng tốc ${k + 1}/${steps.length} (${steps[k]}×): nghe câu gốc…`);
    await origOnce(steps[k]);
    if (!ramp) return;
    stat(`📈 Tăng tốc ${k + 1}/${steps.length} (${steps[k]}×): tới lượt bạn nhắc lại`);
    await sleep(Math.max(900, dur / steps[k] * 1100));
  }
  if (!ramp) return;
  if (idx === my && $('#spRampRec').checked) { stopRamp(true); startRec(); } else stopRamp();
}

async function startRec() {
  if (recording) { rec?.stop(); return; }
  stopRamp();
  if (!navigator.mediaDevices?.getUserMedia) { toast('Trình duyệt này không cho dùng micro (cần mở bằng https)', 5000); return; }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  } catch (e) {
    toast(e.name === 'NotAllowedError' ? 'Bạn chưa cho phép dùng micro. Bấm biểu tượng ổ khóa trên thanh địa chỉ để cho phép.' : 'Không mở được micro: ' + e.message, 6000);
    return;
  }
  const lang = currentLang(), cue = cues()[idx];
  mine.pause();
  rec = new MediaRecorder(stream); chunks = [];
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  rec.onstop = async () => {
    clearInterval(tick); clearTimeout(timer);
    stream.getTracks().forEach(t => t.stop()); ctx?.close?.(); ctx = null;
    recording = false; $('#spMeter i').style.width = '0';
    $('#spRec').textContent = '🎙 Ghi âm'; $('#spRec').classList.add('primary');
    M.pause();
    const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
    if (blob.size < 1500) { stat('Bản ghi quá ngắn, hãy thử lại.'); return; }
    try { await store.putAsset(recId(idx), blob, 'rec'); } catch (e) { toast('Không lưu được bản ghi: ' + e.message); return; }
    hasMine = true; setButtons(); refreshViz();
    const key = currentItemId() + ':' + idx;
    if (!counted.has(key)) { counted.add(key); tracker.speak(); }
    stat('Đã ghi xong.');
    if ($('#spAuto').checked) score(); else stat('Đã ghi xong. Bấm “🎯 Chấm” để AI chấm, hoặc “⇄ Gốc → tôi” để nghe so sánh.');
  };
  recording = true;
  $('#spRec').textContent = '■ Dừng'; $('#spRec').classList.remove('primary');
  const Ctx = window.AudioContext || window.webkitAudioContext;
  ctx = new Ctx(); const an = ctx.createAnalyser(); an.fftSize = 512;
  ctx.createMediaStreamSource(stream).connect(an); meter(an);
  rec.start();
  const dur = Math.min(25, Math.max(2.5, (cue.end - cue.start) + 1.6)) * 1000;
  timer = setTimeout(() => { if (recording) rec.stop(); }, dur);
  if ($('#spWith').checked) playCueOnce(idx, parseFloat($('#spRate').value) || 1); // shadow cùng bản gốc (nên dùng tai nghe)
}

// ---------- nghe lại ----------
async function playMine() {
  const url = await store.assetURL(recId(idx));
  if (!url) { toast('Câu này chưa có bản ghi'); return; }
  M.pause(); mine.src = url;
  await mine.play().catch(() => toast('Không phát được bản ghi'));
  return new Promise(res => { mine.onended = res; mine.onpause = res; });
}
function origOnce(rate) { return new Promise(res => playCueOnce(idx, rate || parseFloat($('#spRate').value) || 1, res)); }
async function compareAB() {
  if (!hasMine) return;
  mine.pause();
  stat('Đang phát: bản gốc…'); await origOnce();
  await new Promise(r => setTimeout(r, 350));
  stat('Đang phát: giọng của bạn…'); await playMine();
  stat('');
}

// ---------- chấm điểm ----------
// Chấm một bản ghi so với câu gốc → { score, refHTML, typedHTML, heard }. Dùng chung cho khung Luyện nói và phần ghi âm khi học (bg: chạy ở luồng nền).
export async function grade(blob, ref, lang, { bg = false, onStep, onLoad } = {}) {
  onStep?.('Đang đọc bản ghi…');
  const x = await decodeAudio(blob);
  if (x.length < 8000) throw new Error('Bản ghi quá ngắn');
  onStep?.('AI đang nghe giọng bạn…');
  await loadSimplifier();
  const heard = zhText(await (bg ? transcribeBg : transcribe)(x, { lang, model: $('#spModel').value, onLoad }), lang);
  const A = await buildItems(ref, lang), B = await buildItems(heard, lang);
  return { ...compareItems(A, B), heard };
}
// Tải sẵn mô hình AI ở luồng nền để câu đầu tiên chấm được ngay
export const warmGrader = onLoad => warmBg($('#spModel').value, onLoad);

async function score() {
  if (scoring) return;
  const a = await store.getAsset(recId(idx));
  if (!a) { toast('Hãy ghi âm trước'); return; }
  scoring = true; setButtons();
  const lang = currentLang(), ref = cues()[idx].lines[0];
  try {
    const r = await grade(a.blob, ref, lang, { onStep: stat, onLoad: (p, f) => stat(`Đang tải mô hình AI… ${Math.round(p)}% (${f.split('/').pop()}). Chỉ tải lần đầu.`) }), heard = r.heard;
    const sc = { ...scores() }; sc[idx] = Math.max(sc[idx] ?? 0, r.score);
    store.put('items', currentItemId(), { speak: sc });
    if (r.score < 60 && addCueCard(currentItemId(), idx, { weak: true })) toast('Câu này còn yếu, đã vào sổ ôn 📒');
    const cls = r.score >= 90 ? 'ok' : r.score >= 60 ? 'miss' : 'bad', bcp = langInfo(lang).bcp;
    $('#spResult').hidden = false;
    $('#spResult').innerHTML =
      `<div class="score ${cls}">${r.score}%${r.score >= 95 ? ' 🎉 Rất rõ!' : ''}</div>` +
      `<div class="dim">Câu gốc</div><div class="line" lang="${bcp}">${r.refHTML}</div>` +
      `<div class="dim">Máy nghe được từ giọng bạn</div><div class="line" lang="${bcp}">${heard ? r.typedHTML : '<span class="dim">(không nghe được gì: hãy nói to hơn hoặc gần micro hơn)</span>'}</div>` +
      `<div class="dim"><span class="ok">xanh</span> nói đúng · <span class="miss">cam</span> thiếu hoặc nghe sai · <span class="bad">đỏ</span> thừa` +
      `${lang === 'zh' ? '. Tiếng Trung chấm theo phiên âm, nên chữ giản/phồn hay chữ đồng âm không bị tính sai.' : ''}</div>`;
    stat(''); header(); refreshList();
  } catch (e) {
    stat('Lỗi chấm: ' + (e.message || e));
    console.warn(e);
  } finally { scoring = false; setButtons(); }
}

// ---------- giao diện ----------
function header() {
  const sc = scores(), done = Object.keys(sc).length, total = cues().length;
  const avg = done ? Math.round(Object.values(sc).reduce((s, v) => s + v, 0) / done) : 0;
  $('#spNum').textContent = `Câu ${idx + 1}/${total}`;
  $('#spSum').textContent = done ? `Đã chấm ${done}/${total} câu · trung bình ${avg}%` : 'Chưa chấm câu nào';
}
function setButtons() {
  $('#spMine').disabled = !hasMine || recording; $('#spAB').disabled = !hasMine || recording;
  $('#spScore').disabled = !hasMine || recording || scoring;
  $('#spOrig').disabled = recording;
}

async function load(i) {
  const n = cues().length;
  if (i < 0 || i >= n) { if (i >= n) toast('Hết bài rồi!'); return; }
  if (recording) rec?.stop();
  stopRamp(true);
  mine.pause(); idx = i; $('#spResult').hidden = true; stat('');
  hasMine = await store.hasAsset(recId(i));
  $('#spToneRow').hidden = currentLang() !== 'zh';
  header(); setButtons(); selectCue(i); refreshViz();
  if (hasMine) stat('Câu này đã có bản ghi của bạn. Ghi lại để thay, hoặc bấm “⇄ Gốc → tôi”.');
}

function enter() {
  if (!currentItemId() || !cues().length) { toast('Hãy mở video có phụ đề trước'); return; }
  bus.emit('exitDict');
  on = true; setSpeakMode(true);
  $('#speakPanel').hidden = false; $('#btnSpeak').textContent = '↩ Thoát luyện nói';
  const sc = scores(); let start = cues().findIndex((_, i) => sc[i] == null); if (start < 0) start = 0;
  load(start);
  origOnce();
}
function exit() {
  stopRamp();
  $('#spViz').hidden = true;
  if (recording) rec?.stop();
  mine.pause(); on = false; setSpeakMode(false);
  $('#speakPanel').hidden = true; $('#btnSpeak').textContent = '🎙 Luyện nói';
}

export function init() {
  $('#btnSpeak').onclick = () => (on ? exit() : enter());
  $('#spOrig').onclick = () => { mine.pause(); playCueOnce(idx, parseFloat($('#spRate').value) || 1); };
  $('#spRec').onclick = startRec;
  $('#spRamp').onclick = runRamp;
  $('#spVizOn').onchange = refreshViz;
  $('#spMine').onclick = () => { playMine(); };
  $('#spAB').onclick = compareAB;
  $('#spScore').onclick = score;
  $('#spNext').onclick = () => load(idx + 1);
  $('#spPrev').onclick = () => load(idx - 1);
  $('#spTone').onchange = () => { if (!$('#spResult').hidden && hasMine) score(); };
  bus.on('exitSpeak', () => { if (on) exit(); });
  bus.on('speakGo', i => { if (on) { load(i); origOnce(); } });
  bus.on('speakExit', () => { on = false; $('#speakPanel').hidden = true; $('#btnSpeak').textContent = '🎙 Luyện nói'; });
  tracker.addSource(() => (recording || (!mine.paused && !mine.ended) ? currentLang() : null));
}
