// Hiển thị sóng âm và cao độ (đường cong thanh điệu) của câu gốc và giọng bạn để so sánh khi luyện nói.
// Chạy hoàn toàn trên máy: giải mã âm thanh, đo năng lượng và cao độ bằng tự tương quan (không cần mạng, không tốn token).
import { decodeAudio } from './align.js';
import { getBlob } from './alignui.js';
import * as store from './store.js';

const SR = 16000, HOP = 320, WIN = 1024; // khung 64 ms, bước 20 ms
const MAX_BYTES = 400 * 1024 * 1024;
let cache = { key: '', x: null, pending: null };

// Âm thanh của cả video (mono 16 kHz), giữ lại cho video đang luyện
export async function origPCM(itemId) {
  const it = store.get('items', itemId);
  if (!it) return null;
  const key = itemId + ':' + (it.assetId || it.src || '');
  if (cache.key === key) return cache.pending ?? cache.x;
  cache = { key, x: null, pending: null };
  cache.pending = (async () => {
    try {
      const blob = await getBlob(it, itemId);
      if (!blob || blob.size > MAX_BYTES) return null;
      return await decodeAudio(blob);
    } catch { return null; }
  })().then(x => { if (cache.key === key) { cache.x = x; cache.pending = null; } return x; });
  return cache.pending;
}

// Cao độ (Hz) của một khung, 0 nếu không phải tiếng có thanh
function pitch(x, o) {
  let r0 = 0;
  for (let i = 0; i < WIN; i++) r0 += x[o + i] * x[o + i];
  if (r0 < 1e-7) return 0;
  const L0 = 40, L1 = 230, r = new Float32Array(L1 + 2);
  let best = 0;
  for (let l = L0; l <= L1; l++) {
    let s = 0, e1 = 0, e2 = 0;
    const m = WIN - l;
    for (let i = 0; i < m; i++) { const a = x[o + i], b = x[o + i + l]; s += a * b; e1 += a * a; e2 += b * b; }
    r[l] = s / Math.sqrt(e1 * e2 + 1e-12);
    if (r[l] > best) best = r[l];
  }
  if (best < 0.5) return 0;
  let lag = 0;
  for (let l = L0 + 1; l < L1; l++) if (r[l] >= 0.9 * best && r[l] >= r[l - 1] && r[l] >= r[l + 1]) { lag = l; break; } // lag nhỏ nhất: tránh nhầm xuống quãng tám
  if (!lag) return 0;
  const a = r[lag - 1], b = r[lag], c = r[lag + 1], d = a - 2 * b + c;
  const ref = d ? lag + 0.5 * (a - c) / d : lag; // nội suy parabol
  return SR / ref;
}

// Phân tích đoạn [t0, t1] (giây): env = năng lượng, f0 = cao độ (0 = không có)
export function analyse(x, t0, t1) {
  const a = Math.max(0, Math.floor(t0 * SR)), b = Math.min(x.length, Math.ceil(t1 * SR));
  const n = Math.max(0, Math.floor((b - a - WIN) / HOP) + 1);
  const env = new Float32Array(n), f0 = new Float32Array(n);
  let mx = 0;
  for (let k = 0; k < n; k++) {
    const o = a + k * HOP; let e = 0;
    for (let i = 0; i < WIN; i++) e += x[o + i] * x[o + i];
    env[k] = Math.sqrt(e / WIN); if (env[k] > mx) mx = env[k];
  }
  for (let k = 0; k < n; k++) if (env[k] > mx * 0.12) f0[k] = pitch(x, a + k * HOP);
  // lọc trung vị 5 khung (bỏ giá trị lạc), bỏ đoạn có thanh quá ngắn
  const med = new Float32Array(n);
  for (let k = 0; k < n; k++) {
    const w = []; for (let j = Math.max(0, k - 2); j <= Math.min(n - 1, k + 2); j++) if (f0[j] > 0) w.push(f0[j]);
    med[k] = f0[k] > 0 && w.length >= 3 ? w.sort((p, q) => p - q)[w.length >> 1] : 0;
  }
  return { env, f0: med, mx };
}

// Mốc bắt đầu / kết thúc tiếng nói (chỉ số khung)
function span(t) {
  const thr = t.mx * 0.2; let s = 0, e = t.env.length - 1;
  while (s < e && t.env[s] < thr) s++;
  while (e > s && t.env[e] < thr) e--;
  return [s, Math.max(s + 1, e)];
}

const semitone = (f, ref) => 12 * Math.log2(f / ref);
function medianF0(t, s, e) {
  const v = []; for (let k = s; k <= e; k++) if (t.f0[k] > 0) v.push(t.f0[k]);
  return v.length >= 4 ? v.sort((a, b) => a - b)[v.length >> 1] : 0;
}

const C_ORIG = '#5ab4ff', C_MINE = '#ff8f3a', C_GRID = '#4a4285';
function prep(cv, h) {
  const dpr = Math.max(1, devicePixelRatio || 1), w = cv.clientWidth || 300;
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.height = h + 'px';
  const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
  return { g, w, h };
}

// Vẽ hai hàng sóng âm (gốc trên, bạn dưới) và một khung cao độ chồng hai đường
export function draw(waveCv, pitchCv, o, m) {
  const tr = [o && { ...o, c: C_ORIG, name: 0 }, m && { ...m, c: C_MINE, name: 1 }].filter(Boolean);
  for (const t of tr) { [t.s, t.e] = span(t); }
  const dur = Math.max(0.6, ...tr.map(t => (t.e - t.s) * HOP / SR)) + 0.25, pad = 0.08;
  const X = (t, k, w) => ((k - t.s) * HOP / SR + pad) / dur * w;

  const W = prep(waveCv, 96), g = W.g;
  g.strokeStyle = C_GRID; g.lineWidth = 1;
  [24, 72].forEach(y => { g.beginPath(); g.moveTo(0, y); g.lineTo(W.w, y); g.stroke(); });
  for (const t of tr) {
    const cy = t.name === 0 ? 24 : 72, amp = 20; g.fillStyle = t.c;
    for (let k = Math.max(0, t.s - 4); k <= Math.min(t.env.length - 1, t.e + 4); k++) {
      const h = Math.max(1, t.env[k] / (t.mx || 1) * amp), x = X(t, k, W.w);
      g.fillRect(Math.round(x), Math.round(cy - h), 3, Math.round(h * 2));
    }
  }
  const P = prep(pitchCv, 110), q = P.g;
  q.strokeStyle = C_GRID; q.lineWidth = 1;
  for (const st of [-12, -6, 0, 6, 12]) { const y = 55 - st * 3.6; q.beginPath(); q.moveTo(0, y); q.lineTo(P.w, y); q.stroke(); }
  for (const t of tr) {
    const ref = medianF0(t, t.s, t.e);
    if (!ref) continue;
    q.strokeStyle = t.c; q.lineWidth = 3; q.lineJoin = 'round'; q.beginPath();
    let pen = false;
    for (let k = t.s; k <= t.e; k++) {
      if (t.f0[k] > 0) {
        const y = 55 - Math.max(-14, Math.min(14, semitone(t.f0[k], ref))) * 3.6, x = X(t, k, P.w);
        if (pen) q.lineTo(x, y); else { q.moveTo(x, y); pen = true; }
      } else pen = false;
    }
    q.stroke();
  }
  return { orig: !!o, mine: !!m };
}
