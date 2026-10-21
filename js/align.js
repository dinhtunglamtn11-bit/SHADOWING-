// Tự động canh giờ từng từ cho phụ đề.
//  - Nhanh: nghe năng lượng âm thanh, chia chữ vào những đoạn có tiếng nói (không cần tải gì).
//  - Chính xác: AI Whisper chạy ngay trong trình duyệt (tải mô hình lần đầu), nhận ra từng từ và giờ của nó,
//    rồi ghép với chữ trong phụ đề của bạn. Câu nào ghép không được sẽ tự dùng cách Nhanh.
// Kết quả lưu vào cue.t: mảng giờ bắt đầu của từng chữ, tính bằng giây kể từ đầu câu.
import { tokensOf, tokenWeight } from './util.js';

const SR = 16000;
const PAD = 0.15;
const TRANSFORMERS = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6/dist/transformers.min.js';
const LANG_NAME = { en: 'english', zh: 'chinese', ko: 'korean', ja: 'japanese' };

// ---------- âm thanh ----------
export async function decodeAudio(blob) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx({ sampleRate: SR });
  try {
    const buf = await ctx.decodeAudioData(await blob.arrayBuffer());
    const n = buf.length, out = new Float32Array(n);
    for (let c = 0; c < buf.numberOfChannels; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < n; i++) out[i] += d[i] / buf.numberOfChannels;
    }
    return out;
  } finally { ctx.close?.(); }
}

const sliceOf = (x, cue) => {
  const a = Math.max(0, Math.floor((cue.start - PAD) * SR)), b = Math.min(x.length, Math.ceil((cue.end + PAD) * SR));
  return { data: x.subarray(a, b), base: a / SR };
};

// ---------- cách Nhanh: dựa vào năng lượng âm thanh ----------
function weights(toks, words) { return toks.map(t => tokenWeight(t, words)); }

function linearTimes(cue, w) {
  const total = w.reduce((s, x) => s + x, 0) || 1, dur = cue.end - cue.start;
  let acc = 0;
  return w.map(x => { const t = dur * acc / total; acc += x; return +t.toFixed(2); });
}

// Tìm các khung 20 ms có tiếng nói trong đoạn âm thanh của câu
function voicedFrames(x, cue) {
  const { data, base } = sliceOf(x, cue);
  const hop = SR / 50; // 20 ms
  const nf = Math.floor(data.length / hop);
  if (nf < 6) return { idx: [], base, nf };
  const rms = new Float32Array(nf);
  for (let f = 0; f < nf; f++) {
    let s = 0; const o = f * hop;
    for (let i = 0; i < hop; i++) s += data[o + i] * data[o + i];
    rms[f] = Math.sqrt(s / hop);
  }
  const sm = rms.map((_, i) => (rms[Math.max(0, i - 1)] + rms[i] + rms[Math.min(nf - 1, i + 1)]) / 3);
  const sorted = [...sm].sort((a, b) => a - b);
  const floor = sorted[Math.floor(nf * 0.1)], hi = sorted[Math.floor(nf * 0.9)];
  const thr = Math.max(floor * 3, hi * 0.18, 1e-4);
  const voiced = sm.map(v => v > thr);
  // lấp khoảng lặng ngắn (< 150 ms) giữa hai đoạn có tiếng, bỏ tiếng động rời rạc (< 60 ms)
  let i = 0;
  while (i < nf) {
    if (!voiced[i]) { let j = i; while (j < nf && !voiced[j]) j++; if (i > 0 && j < nf && j - i < 8) for (let k = i; k < j; k++) voiced[k] = true; i = j; }
    else i++;
  }
  i = 0;
  while (i < nf) {
    if (voiced[i]) { let j = i; while (j < nf && voiced[j]) j++; if (j - i < 3) for (let k = i; k < j; k++) voiced[k] = false; i = j; }
    else i++;
  }
  const idx = []; voiced.forEach((v, k) => { if (v) idx.push(k); });
  return { idx, base, nf };
}

export function energyTimes(x, cue, toks, words) {
  const w = weights(toks, words);
  const { idx, base } = voicedFrames(x, cue);
  if (idx.length < 4) return linearTimes(cue, w);
  const total = w.reduce((s, v) => s + v, 0) || 1;
  let acc = 0;
  return w.map(x => {
    const pos = Math.min(idx.length - 1, Math.floor(idx.length * acc / total));
    acc += x;
    return +Math.max(0, base + idx[pos] * 0.02 - cue.start).toFixed(2);
  });
}

// ---------- theo dõi âm tiết: đặt từng chữ đúng vào điểm bắt đầu của tiếng nói ----------
// 1) Tìm các điểm bắt đầu tiếng (onset) trong âm thanh.  2) Ước lượng số âm tiết của mỗi chữ/từ.
// 3) Ghép dãy âm tiết với dãy onset bằng quy hoạch động (giữ đúng thứ tự, cho phép bỏ qua onset thừa hoặc âm tiết thiếu).
// Nhờ vậy chữ sáng đúng lúc có tiếng, kể cả khi người nói ngắt nghỉ hoặc đọc nhanh chậm khác nhau.
export const TUNE = { sigmaHi: 3.5, sigmaLo: 3.5, lo: 0, hi: 99, sustain: 0.15, relThr: 0.3, minNovelty: 0.5, floorMul: 2.5, minGap: 0.09, weakCost: 1.5, pauseCost: 0 }; // tham số canh (chọn bằng cách đo trên âm thanh tổng hợp; pauseCost = 0: chưa dùng dấu câu làm mốc vì thử trên giọng thật cho kết quả kém hơn) (đã đo bằng âm thanh tổng hợp)
const SMALL_KANA = /[ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ]/;
export function syllablesOf(tok, lang) {
  if (lang === 'en') {
    const w = tok.toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return [...tok].filter(c => /\d/.test(c)).length;
    let n = (w.match(/[aeiouy]+/g) || []).length;
    if (w.length > 2 && /[^aeiouy]e$/.test(w) && !/(le|ye)$/.test(w)) n--;        // “name”, “make”: e câm
    if (/[^td]ed$/.test(w)) n--;                                                    // “loved”
    return Math.max(1, n);
  }
  let n = 0;
  for (const ch of tok) {
    if (!/[\p{L}\p{N}]/u.test(ch)) continue;
    if (lang === 'ja') { if (SMALL_KANA.test(ch)) continue; n += /\p{Script=Han}/u.test(ch) ? 2 : 1; }
    else n += 1; // tiếng Trung, Hàn: mỗi chữ một âm tiết
  }
  return n;
}

// Các điểm bắt đầu tiếng (giây, tính từ đầu câu) và độ mạnh của từng điểm
export function onsetsOf(x, cue) {
  const { data, base } = sliceOf(x, cue);
  const hop = SR / 100, nf = Math.floor(data.length / hop); // 10 ms
  if (nf < 12) return [];
  const E = new Float32Array(nf);
  for (let f = 0; f < nf; f++) {
    let s = 0, prev = f ? data[f * hop - 1] : 0;
    for (let i = 0; i < hop; i++) { const cur = data[f * hop + i], v = cur - 0.9 * prev; prev = cur; s += v * v; } // nhấn mạnh phụ âm đầu
    E[f] = s / hop;
  }
  const L = new Float32Array(nf);
  for (let f = 0; f < nf; f++) L[f] = Math.log(E[f] + 1e-8);
  const Ls = L.map((_, i) => (L[Math.max(0, i - 1)] + L[i] + L[Math.min(nf - 1, i + 1)]) / 3);
  const sorted = [...E].sort((a, b) => a - b);
  const eThr = Math.max(sorted[Math.floor(nf * 0.1)] * TUNE.floorMul, sorted[Math.floor(nf * 0.95)] * 0.004, 1e-7);
  const N = new Float32Array(nf);
  for (let f = 1; f < nf - 3; f++) N[f] = Math.max(0, Ls[f + 3] - Ls[f - 1]); // năng lượng tăng trong ~40 ms
  const nsorted = [...N].sort((a, b) => a - b);
  const nThr = Math.max(TUNE.minNovelty, nsorted[Math.floor(nf * 0.9)] * TUNE.relThr);
  const cand = [];
  for (let f = 2; f < nf - 3; f++) {
    if (!(N[f] >= nThr && N[f] >= N[f - 1] && N[f] >= N[f + 1] && E[Math.min(nf - 1, f + 3)] > eThr)) continue;
    // tiếng nói thật kéo dài ≥ ~60 ms; tiếng “tách”, tiếng động ngắn thì tắt ngay: bỏ
    let pk = 0, tail = 0;
    for (let k = f; k < Math.min(nf, f + 4); k++) pk = Math.max(pk, E[k]);
    for (let k = f + 5; k < Math.min(nf, f + 9); k++) tail = Math.max(tail, E[k]);
    if (tail < pk * (TUNE.sustain || 0)) continue;
    cand.push({ f, s: N[f] });
  }
  cand.sort((a, b) => b.s - a.s);
  const kept = [], gap = Math.round(TUNE.minGap * 100);
  for (const c of cand) if (kept.every(k => Math.abs(k.f - c.f) >= gap)) kept.push(c); // giữ điểm mạnh hơn khi hai điểm quá gần nhau
  kept.sort((a, b) => a.f - b.f);
  const times = kept.map(c => +(base + c.f * 0.01 + 0.005 - cue.start).toFixed(3)); // đỉnh năng lượng tăng nằm ngay sau lúc tiếng bắt đầu
  const top = Math.max(...kept.map(c => c.s), 1e-6);
  times.strength = kept.map(c => c.s / top); // độ mạnh 0..1 (điểm bắt đầu thật thường mạnh hơn tiếng nổ phụ)
  // điểm bắt đầu nằm ngay sau một quãng im lặng (≥ ~220 ms): thường ứng với chỗ sau dấu phẩy/dấu chấm
  times.afterPause = kept.map(c => { let run = 0, k = c.f - 1; while (k >= 0 && E[k] < eThr) { run++; k--; } return run >= 22; });
  return times;
}

// Ghép P (giờ dự kiến của từng âm tiết) với O (các onset). Trả về mảng: âm tiết m -> chỉ số onset hoặc -1.
function dpAlign(P, O, sigma = 0.9, missSyl = 2.0, skipOnset = 0.35, extra = null) {
  const M = P.length, K = O.length;
  const weak = (m, j) => (extra ? extra(m, j) : 0); // chi phí phụ: điểm yếu, hoặc không khớp chỗ ngắt nghỉ
  const dp = Array.from({ length: M + 1 }, () => new Float32Array(K + 1)), bt = Array.from({ length: M + 1 }, () => new Uint8Array(K + 1));
  for (let j = 1; j <= K; j++) { dp[0][j] = j * skipOnset; bt[0][j] = 2; }
  for (let m = 1; m <= M; m++) { dp[m][0] = m * missSyl; bt[m][0] = 1; }
  for (let m = 1; m <= M; m++) for (let j = 1; j <= K; j++) {
    const match = dp[m - 1][j - 1] + ((O[j - 1] - P[m - 1]) / sigma) ** 2 + weak(m - 1, j - 1), miss = dp[m - 1][j] + missSyl, skip = dp[m][j - 1] + skipOnset;
    if (match <= miss && match <= skip) { dp[m][j] = match; bt[m][j] = 0; }
    else if (miss <= skip) { dp[m][j] = miss; bt[m][j] = 1; }
    else { dp[m][j] = skip; bt[m][j] = 2; }
  }
  const map = new Array(M).fill(-1);
  let m = M, j = K;
  while (m > 0 && j > 0) {
    const b = bt[m][j];
    if (b === 0) { map[m - 1] = j - 1; m--; j--; } else if (b === 1) m--; else j--;
  }
  return map;
}

// prior: giờ chữ ước lượng ban đầu (từ cách Nhanh hoặc từ AI). Trả về giờ chữ đã chỉnh theo âm thanh, hoặc null nếu âm thanh không đủ rõ.
export function smartTimes(x, cue, toks, words, lang, prior) {
  const w = weights(toks, words);
  const syl = toks.map((t, i) => (w[i] > 0 ? Math.max(1, syllablesOf(t, lang)) : 0));
  const idxs = toks.map((_, i) => i).filter(i => syl[i] > 0);
  const O = onsetsOf(x, cue);
  const totalSyl = idxs.reduce((s, i) => s + syl[i], 0);
  if (!idxs.length || O.length < Math.max(3, totalSyl * 0.4)) return null;
  const dur = cue.end - cue.start, P = [], expectPause = [];
  idxs.forEach((ti, a) => {
    const p0 = prior[ti], p1 = a + 1 < idxs.length ? prior[idxs[a + 1]] : dur;
    // chữ ngay sau dấu câu: kỳ vọng có ngắt nghỉ trước nó
    let punct = false;
    for (let q = ti - 1; q >= 0 && w[q] === 0; q--) if (/[,.;:!?，。！？、；：…]/.test(toks[q])) punct = true;
    if (ti > 0 && w[ti - 1] > 0 && /[,.;:!?，。！？、；：…]$/.test(toks[ti - 1])) punct = true;
    for (let k = 0; k < syl[ti]; k++) { P.push(p0 + (p1 - p0) * k / syl[ti]); expectPause.push(k === 0 && punct); }
  });
  // Tin vào thứ tự các tiếng; giờ ước lượng chỉ dùng để chọn khi có nhiều cách ghép như nhau
  const ratio = O.length / totalSyl;
  const extra = (m, j) => {
    let c = TUNE.weakCost * (1 - O.strength[j]);
    if (expectPause[m]) { if (!O.afterPause[j]) c += TUNE.pauseCost; }       // sau dấu câu mà ghép vào tiếng không đứng sau chỗ ngắt: bị phạt
    else if (O.afterPause[j]) c += TUNE.pauseCost * 0.5;                      // không có dấu câu mà lại ghép vào tiếng sau ngắt nghỉ dài
    return c;
  };
  const map = dpAlign(P, O, ratio >= TUNE.lo && ratio <= TUNE.hi ? TUNE.sigmaHi : TUNE.sigmaLo, 2.0, 0.35, extra);
  const t = new Array(toks.length).fill(null);
  let m = 0;
  for (const ti of idxs) {
    const first = m; m += syl[ti];
    for (let q = first; q < m; q++) if (map[q] >= 0) { t[ti] = O[map[q]] - (q - first) * 0.12; break; }
  }
  // chữ chưa ghép được (và dấu câu): nội suy giữa hai chữ đã có giờ
  const known = t.map((v, i) => (v == null ? -1 : i)).filter(i => i >= 0);
  if (!known.length) return null;
  for (let i = 0; i < toks.length; i++) {
    if (t[i] != null) continue;
    const a = known.filter(k => k < i).pop(), b = known.find(k => k > i);
    if (a != null && b != null) t[i] = t[a] + (t[b] - t[a]) * (i - a) / (b - a);
    else if (a != null) t[i] = t[a] + (prior[i] - prior[a]);
    else t[i] = t[b] - (prior[b] - prior[i]);
  }
  for (let i = 0; i < t.length; i++) { t[i] = Math.max(0, t[i]); if (i && t[i] < t[i - 1]) t[i] = t[i - 1]; }
  return t.map(v => +v.toFixed(2));
}

// ---------- cách Chính xác: Whisper ----------
let asr = null, asrModel = '';
async function loadWhisper(model, onLoad) {
  if (asr && asrModel === model) return asr;
  const T = await import(/* @vite-ignore */ TRANSFORMERS);
  T.env.allowLocalModels = false;
  asr = await T.pipeline('automatic-speech-recognition', model, {
    progress_callback: p => { if (p.status === 'progress') onLoad?.(p.progress || 0, p.file || ''); },
  });
  asrModel = model;
  return asr;
}

// Thêm dòng phiên âm pinyin (dòng 2) cho các câu mới có 1 dòng; mỗi chữ Hán một âm tiết. Trả về số câu đã thêm.
export async function addPinyin(cues) {
  const { pinyin } = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm');
  let made = 0;
  for (const c of cues) {
    if (c.lines.length !== 1) continue;
    const text = c.lines[0], chars = [...text];
    let arr = pinyin(text, { type: 'array', toneType: 'symbol' });
    if (arr.length !== chars.length) arr = chars.map(ch => pinyin(ch, { toneType: 'symbol' }));
    const syl = [];
    chars.forEach((ch, i) => { if (/[\p{L}\p{N}]/u.test(ch)) syl.push(arr[i]); });
    if (syl.length) { c.lines.splice(1, 0, syl.join(' ')); made++; }
  }
  return made;
}

// ---------- tự tạo phụ đề từ giọng nói ----------
// Điểm im lặng nhất trong khoảng [a, b] giây (để cắt đoạn âm thanh mà không cắt ngang lời nói)
function quietPoint(x, a, b) {
  const win = Math.floor(0.2 * SR);
  let best = b, bestE = Infinity;
  for (let t = a; t + 0.2 <= b; t += 0.1) {
    const o = Math.floor(t * SR);
    let s = 0; for (let i = 0; i < win; i += 4) s += x[o + i] * x[o + i];
    if (s < bestE) { bestE = s; best = t + 0.1; }
  }
  return best;
}
const rmsOf = (x, s, e) => {
  const a = Math.max(0, Math.floor(s * SR)), b = Math.min(x.length, Math.floor(e * SR));
  if (b <= a) return 0;
  let sum = 0, n = 0; for (let i = a; i < b; i += 3) { sum += x[i] * x[i]; n++; }
  return Math.sqrt(sum / Math.max(1, n));
};

// Chia câu quá dài thành nhiều câu ngắn tại dấu câu, thời gian chia theo độ dài chữ
function splitLong(c, words) {
  if (c.end - c.start <= 9 || c.lines[0].length < 24) return [c];
  const parts = c.lines[0].split(words ? /(?<=[.!?;])\s+/ : /(?<=[。！？；.!?;])/).map(s => s.trim()).filter(Boolean);
  if (parts.length < 2) return [c];
  const total = parts.reduce((s, p) => s + p.length, 0);
  let t = c.start;
  return parts.map(p => { const d = (c.end - c.start) * p.length / total, o = { start: +t.toFixed(2), end: +(t + d).toFixed(2), lines: [p] }; t += d; return o; });
}

// Nghe cả đoạn âm thanh và trả về danh sách câu {start, end, lines:[chữ]}
export async function transcribeAll(x, { lang, model = 'Xenova/whisper-base', onLoad, onProgress, signal } = {}) {
  const t = await loadWhisper(model, onLoad);
  const total = x.length / SR, out = [];
  let pos = 0;
  while (pos < total - 0.4) {
    if (signal?.aborted) throw new DOMException('Đã dừng', 'AbortError');
    let end = Math.min(total, pos + 28);
    if (end < total) end = quietPoint(x, end - 4, end);
    onProgress?.(pos, total);
    const slice = x.subarray(Math.floor(pos * SR), Math.floor(end * SR));
    const r = await t(slice, { language: LANG_NAME[lang] || undefined, task: 'transcribe', return_timestamps: true, chunk_length_s: 30 });
    for (const c of r.chunks || []) {
      const text = (c.text || '').trim();
      if (!text) continue;
      const s = c.timestamp?.[0] ?? 0, e = c.timestamp?.[1] ?? Math.min(end - pos, s + 3);
      const start = +(pos + s).toFixed(2), stop = +(pos + Math.max(e, s + 0.4)).toFixed(2);
      if (rmsOf(x, start, stop) < 0.004) continue; // Whisper hay “nghe ra chữ” ở chỗ im lặng: bỏ
      // AI hay bị “kẹt” lặp một câu liên tục: bỏ câu giống hệt nối liền ngay sau câu trước (câu lặp thật có khoảng nghỉ nên vẫn giữ)
      const prev = out[out.length - 1];
      if (prev && prev.lines[0] === text && start - prev.end < 0.5) continue;
      out.push(...splitLong({ start, end: stop, lines: [text] }, langWords(lang)));
    }
    pos = end;
    await new Promise(r => setTimeout(r));
  }
  onProgress?.(total, total);
  // không cho các câu chồng thời gian lên nhau
  for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].end) out[i - 1].end = Math.max(out[i - 1].start + 0.3, out[i].start - 0.02);
  return out;
}
const langWords = l => l === 'en';

// Nghe một đoạn âm thanh 16 kHz và trả về chữ nhận được (dùng để chấm phát âm)
export async function transcribe(x, { lang, model = 'Xenova/whisper-base', onLoad } = {}) {
  const t = await loadWhisper(model, onLoad);
  const r = await t(x, { language: LANG_NAME[lang] || undefined, task: 'transcribe', chunk_length_s: 30 });
  return (r.text || '').trim();
}

const norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

// Ghép từ nhận ra (có giờ) với chữ trong phụ đề. Trả về mảng giờ (giây, tính từ đầu đoạn âm thanh) hoặc null.
function mapToRef(toks, words, chunks) {
  const rec = [];
  for (const c of chunks) {
    const t = norm(c.text || ''); if (!t) continue;
    const s = c.timestamp?.[0] ?? 0, e = c.timestamp?.[1] ?? s + 0.3;
    if (words) rec.push({ k: t, s, e });
    else [...t].forEach((ch, i, a) => rec.push({ k: ch, s: s + (e - s) * i / a.length, e: s + (e - s) * (i + 1) / a.length }));
  }
  const ref = toks.map(t => norm(t));
  const n = ref.length, m = rec.length;
  if (!m) return null;
  // LCS giữa chữ trong phụ đề và chữ nhận ra
  const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    L[i][j] = ref[i] && ref[i] === rec[j].k ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const anchor = Array(n).fill(null);
  let i = 0, j = 0, hit = 0;
  while (i < n && j < m) {
    if (ref[i] && ref[i] === rec[j].k) { anchor[i] = rec[j].s; hit++; i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
  }
  const real = ref.filter(Boolean).length;
  if (!real || hit / real < 0.35) return null;
  // nội suy những chữ không khớp giữa các điểm neo
  const avg = Math.max(0.12, rec.reduce((s, r) => s + (r.e - r.s), 0) / rec.length);
  const out = anchor.slice();
  const known = out.map((v, k) => (v == null ? -1 : k)).filter(k => k >= 0);
  for (let k = 0; k < n; k++) {
    if (out[k] != null) continue;
    const prev = known.filter(q => q < k).pop(), next = known.find(q => q > k);
    if (prev != null && next != null) out[k] = out[prev] + (out[next] - out[prev]) * (k - prev) / (next - prev);
    else if (prev != null) out[k] = out[prev] + (k - prev) * avg;
    else out[k] = out[next] - (next - k) * avg;
  }
  for (let k = 1; k < n; k++) if (out[k] < out[k - 1]) out[k] = out[k - 1];
  return out;
}

// Giờ do AI đưa ra mà rơi vào chỗ im lặng thì dời tới lúc có tiếng kế tiếp (tối đa 0,6 giây)
function snapToVoice(x, cue, t) {
  const { idx, base } = voicedFrames(x, cue);
  if (idx.length < 4) return t;
  const set = new Set(idx);
  let prev = 0;
  return t.map(v => {
    let f = Math.round((cue.start + v - base) / 0.02);
    if (!set.has(f)) {
      const nx = idx.find(k => k > f);
      if (nx != null && (nx - f) * 0.02 <= 0.6) f = nx;
    }
    prev = Math.max(prev, +Math.max(0, base + f * 0.02 - cue.start).toFixed(2));
    return prev;
  });
}

// ---------- chạy cho cả video ----------
// opts: { mode: 'fast' | 'ai', model, words, lang, onProgress(done,total,note), onLoad(pct,file), signal }
export async function alignCues(x, cues, opts) {
  const { mode, words, lang, onProgress, onLoad, signal } = opts;
  let transcriber = null;
  if (mode === 'ai') transcriber = await loadWhisper(opts.model, onLoad);
  let aiCount = 0, fastCount = 0;
  for (let c = 0; c < cues.length; c++) {
    if (signal?.aborted) throw new DOMException('Đã dừng', 'AbortError');
    const cue = cues[c], toks = tokensOf(cue.lines[0], words);
    onProgress?.(c, cues.length, mode === 'ai' ? 'AI đang nghe câu' : 'Đang phân tích câu');
    let t = null;
    if (transcriber && toks.length) {
      try {
        const { data } = sliceOf(x, cue);
        const r = await transcriber(data, { language: LANG_NAME[lang] || undefined, task: 'transcribe', return_timestamps: 'word' });
        const m = mapToRef(toks, words, r.chunks || []);
        if (m) {
          const prior = m.map(v => +Math.max(0, v - PAD).toFixed(2));
          t = smartTimes(x, cue, toks, words, lang, prior) || snapToVoice(x, cue, prior); // chỉnh theo điểm bắt đầu tiếng
          aiCount++;
        }
      } catch (e) { console.warn('Whisper lỗi ở câu', c, e); }
      await new Promise(r => setTimeout(r)); // nhường giao diện
    }
    if (!t) { const prior = energyTimes(x, cue, toks, words); t = smartTimes(x, cue, toks, words, lang, prior) || prior; fastCount++; }
    cue.t = t;
    if (!transcriber && c % 10 === 0) await new Promise(r => setTimeout(r));
  }
  onProgress?.(cues.length, cues.length, '');
  return { aiCount, fastCount };
}
