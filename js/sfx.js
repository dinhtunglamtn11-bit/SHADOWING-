// Âm thanh nút bấm kiểu pixel nhưng mịn: máy tự tạo bằng WebAudio (không có file âm thanh nên cập nhật cùng app).
// Sóng vuông / tam giác như máy game cổ, nhưng vào âm mềm, lọc bớt chói và trượt nhẹ cao độ để nghe êm tai.
// Bật / tắt, âm lượng, kiểu âm nằm trong prefs (đồng bộ giữa các máy khi đã đăng nhập).
import { prefs } from './prefs.js';

// [kiểu sóng, bội tần, độ to] cho từng kiểu âm; lp = tần số cắt của bộ lọc, gain = độ to chung
const KINDS = {
  soft: { waves: [['triangle', 1, 1], ['square', 2, 0.16]], lp: 2800, gain: 0.9 },   // Pixel mịn
  chip: { waves: [['square', 1, 1]], lp: 7000, gain: 0.45 },                          // Pixel cổ điển
  bubble: { waves: [['sine', 1, 1]], lp: 4200, gain: 1.1 },                           // Nhẹ nhàng
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
  if (!force && !prefs.sfx) return;
  const now = performance.now();
  if (now - last < 40 && !force) return; // một lần bấm không kêu hai lần
  last = now;
  const a = ctx();
  if (!a) return;
  if (a.state === 'suspended') a.resume();
  const vol = Math.max(0, Math.min(1, +prefs.sfxVol));
  if (!vol) return;
  master.gain.value = 0.5 * Math.pow(vol, 1.5);
  const k = KINDS[prefs.sfxKind] || KINDS.soft;
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
  if (!e.isTrusted || !prefs.sfx) return; // chỉ tiếng bấm thật của người dùng, không phải click do mã tự gọi
  const el = e.target.closest?.(HIT);
  if (!el || el.disabled || el.closest('[disabled],[aria-disabled=true]') || el.closest(QUIET)) return;
  play(kindOf(el));
}

export function init() {
  document.addEventListener('click', onClick, true);
}
