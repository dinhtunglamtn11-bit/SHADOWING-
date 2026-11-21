// Âm thanh nút bấm kiểu pixel nhưng mịn: máy tự tạo bằng WebAudio (không có file âm thanh nên cập nhật cùng app).
// Sóng vuông / tam giác như máy game cổ, nhưng vào âm mềm, lọc bớt chói và trượt nhẹ cao độ để nghe êm tai.
// Bật / tắt, âm lượng, kiểu âm nằm trong prefs (đồng bộ giữa các máy khi đã đăng nhập).
import { prefs } from './prefs.js';
import { bus } from './util.js';

// Nút âm thanh chung ở đầu trang: tắt / bật cả tiếng nút bấm lẫn nhạc nền (lưu riêng từng máy)
export const muted = () => { try { return localStorage.getItem('muteAll') === '1'; } catch { return false; } };
export function setMuted(on) { try { localStorage.setItem('muteAll', on ? '1' : '0'); } catch { /* bỏ qua */ } bus.emit('mute', on); }

// [kiểu sóng, bội tần, độ to] cho từng kiểu âm; lp = tần số cắt của bộ lọc, gain = độ to chung
const KINDS = {
  soft: { waves: [['triangle', 1, 1], ['square', 2, 0.16]], lp: 2800, gain: 0.9 },   // Pixel mịn
  chip: { waves: [['square', 1, 1]], lp: 7000, gain: 0.45 },                          // Pixel cổ điển
  bubble: { waves: [['sine', 1, 1]], lp: 4200, gain: 1.1 },                           // Nhẹ nhàng
  glass: { glass: true },                                                             // Thủy tinh (âm mới: trong, ngắn, ít vang)
};
// Mỗi âm là vài nốt: f = tần số (Hz), to = trượt tới, d = độ dài (giây), at = trễ (giây), v = độ to
const NOTES = {
  tap: [{ f: 660, to: 880, d: 0.07 }],
  primary: [{ f: 523, d: 0.06 }, { f: 784, d: 0.09, at: 0.055 }],
  tab: [{ f: 440, to: 540, d: 0.06, v: 0.9 }],
  back: [{ f: 600, to: 420, d: 0.08 }],
  del: [{ f: 320, to: 190, d: 0.12 }],
  toggle: [{ f: 880, d: 0.04 }, { f: 1175, d: 0.05, at: 0.04 }],
  ok: [{ f: 523, d: 0.08 }, { f: 659, d: 0.08, at: 0.07 }, { f: 784, d: 0.16, at: 0.14 }],
  bad: [{ f: 262, d: 0.12 }, { f: 196, d: 0.2, at: 0.1 }],
  reward: [{ f: 523, d: 0.08 }, { f: 659, d: 0.08, at: 0.07 }, { f: 784, d: 0.1, at: 0.14 }, { f: 1047, d: 0.3, at: 0.22 }],
  unlock: [{ f: 170, to: 85, d: 0.15 }, { f: 392, d: 0.5, at: 0.28 }, { f: 587, d: 0.5, at: 0.34 }, { f: 784, d: 0.6, at: 0.4 }],
};

let ac = null, master = null, last = 0;

function ctx() {
  if (ac) return ac;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ac = new AC();
  master = ac.createGain();
  const comp = ac.createDynamicsCompressor(); // tránh vỡ tiếng khi nhiều âm chồng nhau
  master.connect(comp); comp.connect(ac.destination);
  return ac;
}

function tone(n, k) {
  const t0 = ac.currentTime + (n.at || 0) + 0.004;
  const g = ac.createGain(), f = ac.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = k.lp; f.Q.value = 0.6;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(k.gain * (n.v ?? 1), t0 + 0.008); // vào âm mềm, không bị tiếng “tách”
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.d);
  f.connect(g); g.connect(master);
  for (const [type, mul, vol] of k.waves) {
    const o = ac.createOscillator(), og = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(n.f * mul, t0);
    if (n.to) o.frequency.exponentialRampToValueAtTime(n.to * mul, t0 + n.d * 0.8);
    og.gain.value = vol;
    o.connect(og); og.connect(f);
    o.start(t0); o.stop(t0 + n.d + 0.03);
  }
}

// force: phát dù đang tắt (nút “Thử âm” trong Cài đặt)
export function play(kind = 'tap', force = false) {
  if (!force && (!prefs.sfx || muted())) return;
  const now = performance.now();
  if (now - last < 40 && !force) return; // một lần bấm không kêu hai lần
  last = now;
  const a = ctx();
  if (!a) return;
  if (a.state === 'suspended') a.resume();
  const vol = Math.max(0, Math.min(1, +prefs.sfxVol));
  if (!vol) return;
  master.gain.value = 0.5 * Math.pow(vol, 1.5);
  const k = KINDS[prefs.sfxKind] || KINDS.glass;
  if (k.glass) { glassPlay(kind); return; }
  for (const n of NOTES[kind] || NOTES.tap) tone(n, k);
}

// Chạm vào đâu thì kêu: nút, thẻ, tab, ô chọn. Thanh phát video và khung luyện nói im lặng để không lẫn vào tiếng đang nghe / ghi âm.
const HIT = 'button, .btn, .chip, [role=button], [role=tab], summary, .card, .nw-card, .wf, .qopt, .wchip, input[type=checkbox], input[type=radio]';
const QUIET = '#bar, #recBar, #speakPanel, #stage, .rb, [data-nosfx]';
function kindOf(el) {
  if (el.matches('input')) return 'toggle';
  if (el.closest('#nav, .seg, [role=tab]')) return 'tab';
  const t = (el.textContent || '').trim(), hint = `${el.id} ${el.getAttribute('title') || ''} ${[...el.attributes].map(a => a.name).join(' ')}`;
  if (/^[←‹]/.test(t) || /back|quay lại/i.test(`${t} ${hint}`)) return 'back';
  if (/^🗑|data-del|delete|xóa/i.test(`${t} ${hint}`) || el.dataset.a === 'del') return 'del';
  if (el.classList.contains('primary')) return 'primary';
  return 'tap';
}
function onClick(e) {
  if (!e.isTrusted || !prefs.sfx || muted()) return; // chỉ tiếng bấm thật của người dùng, không phải click do mã tự gọi
  const el = e.target.closest?.(HIT);
  if (!el || el.disabled || el.closest('[disabled],[aria-disabled=true]') || el.closest(QUIET)) return;
  const k = kindOf(el);
  setTimeout(() => play(k), 0); // để sau: lệnh bấm chạy trước, tiếng không làm chậm
}

export function init() {
  document.addEventListener('click', onClick, true);
}

// ---------- âm thanh kiểu “thủy tinh”: sin / tam giác mềm, vang rất nhẹ ----------
// bấm = một tiếng “tinh” ngắn; nhận thưởng = bốn nốt chuông đi lên; mở khóa = hai tiếng “cạch” rồi hợp âm sáng.
let gbus = null;
function glassBus() {
  if (gbus) return gbus;
  const dry = ac.createGain(), wet = ac.createGain(), conv = ac.createConvolver(), lp = ac.createBiquadFilter(), input = ac.createGain();
  const n = Math.floor(ac.sampleRate * 0.95), b = ac.createBuffer(2, n, ac.sampleRate); let s = 11;
  for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); let y = 0; for (let i = 0; i < n; i++) { s = (s * 16807) % 2147483647; y += (((s / 2147483647) * 2 - 1) * Math.pow(1 - i / n, 3.2) - y) * 0.32; d[i] = y; } }
  conv.buffer = b; lp.type = 'lowpass'; lp.frequency.value = 4500; lp.Q.value = 0.5; wet.gain.value = 0.2;
  input.connect(lp); lp.connect(dry); lp.connect(conv); conv.connect(wet); dry.connect(master); wet.connect(master);
  return (gbus = { input, wet });
}
function gv(o, out, scale) { // một nốt: nhiều họa âm cộng lại, vào mềm và tắt dần
  const t0 = ac.currentTime + (o.t || 0) + 0.004, g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(o.v * scale, t0 + (o.a ?? 0.006)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.d); g.connect(out);
  for (const [r, vol, type] of (o.p || [[1, 1, 'sine']])) {
    const os = ac.createOscillator(), og = ac.createGain();
    os.type = type || 'sine'; os.frequency.setValueAtTime(o.f * r, t0); if (o.to) os.frequency.exponentialRampToValueAtTime(o.to * r, t0 + o.d * 0.8);
    og.gain.value = vol; os.connect(og); og.connect(g); os.start(t0); os.stop(t0 + o.d + 0.05);
  }
}
function gtick(o, out, scale) { // tiếng “cạch” của chốt khóa: nhiễu ngắn qua bộ lọc dải
  const n = Math.floor(ac.sampleRate * o.d), b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0); let s = 5;
  for (let i = 0; i < n; i++) { s = (s * 16807) % 2147483647; d[i] = ((s / 2147483647) * 2 - 1) * Math.pow(1 - i / n, 2.5); }
  const src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  src.buffer = b; f.type = 'bandpass'; f.frequency.value = o.f; f.Q.value = 1.2; g.gain.value = o.v * scale; src.connect(f); f.connect(g); g.connect(out); src.start(ac.currentTime + (o.t || 0));
}
const BELL = [[1, 1, 'sine'], [2, 0.26, 'sine'], [3, 0.09, 'sine']];
function glassPlay(kind) {
  const bus = glassBus(), out = bus.input;
  const click = (m = 1, sc = 2.7) => gv({ f: 1760 * m, d: 0.24, v: 0.42, a: 0.003, p: [[1, 1, 'sine'], [2.76, 0.15, 'sine'], [5.4, 0.04, 'sine']] }, out, sc);
  bus.wet.gain.value = kind === 'reward' || kind === 'unlock' ? 0.2 : 0.006; // bấm gần như khô, thưởng và mở khóa vang nhẹ
  if (kind === 'ok') { gv({ f: 988, d: 0.07, v: 0.3, a: 0.004, p: [[1, 1, 'sine'], [2, 0.12, 'sine']] }, out, 1.17); gv({ f: 1480, t: 0.045, d: 0.22, v: 0.4, a: 0.004, p: [[1, 1, 'sine'], [2, 0.14, 'sine']] }, out, 1.17); }
  else if (kind === 'bad') { gv({ f: 330, to: 220, d: 0.2, v: 0.35, p: [[1, 1, 'sine'], [2, 0.15, 'triangle']] }, out, 1); }
  else if (kind === 'reward') {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => gv({ f, t: [0, 0.075, 0.15, 0.235][i], d: i === 3 ? 0.95 : 0.38, v: i === 3 ? 0.4 : 0.3, p: BELL }, out, 1.02));
    [2093, 2637, 3136].forEach((f, i) => gv({ f, t: 0.36 + i * 0.07, d: 0.2, v: 0.045 }, out, 1.02));
  } else if (kind === 'unlock') {
    gtick({ t: 0, d: 0.035, f: 1500, v: 0.4 }, out, 1.24); gv({ f: 170, to: 85, d: 0.15, v: 0.6, p: [[1, 1, 'sine'], [2, 0.2, 'triangle']] }, out, 1.24);
    gtick({ t: 0.11, d: 0.03, f: 2000, v: 0.28 }, out, 1.24); gv({ f: 230, to: 125, t: 0.11, d: 0.11, v: 0.4, p: [[1, 1, 'sine'], [2, 0.2, 'triangle']] }, out, 1.24);
    [392, 587.33, 783.99, 987.77].forEach((f, i) => gv({ f, t: 0.3 + i * 0.055, a: 0.05, d: 1.15, v: 0.22, p: [[1, 1, 'triangle'], [2, 0.2, 'sine']] }, out, 1.24));
    gv({ f: 1175, to: 1568, t: 0.55, a: 0.08, d: 0.5, v: 0.06 }, out, 1.24);
  } else click(kind === 'back' ? 0.85 : kind === 'del' ? 0.7 : kind === 'toggle' ? 1.2 : 1);
}
