// Đọc to bằng giọng của máy. Bấm vào chữ hoặc biểu tượng 🔊 là nghe.
// Dùng giọng có sẵn trong trình duyệt/hệ điều hành, không tốn dữ liệu hay token.
import { esc, toast, langInfo } from './util.js';
import { prefs } from './prefs.js';

let voices = [];
const loadVoices = () => { try { voices = speechSynthesis.getVoices(); } catch { voices = []; } };
try { loadVoices(); speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch {}
const warned = new Set();

const SCRIPT = {
  zh: /\p{Script=Han}/u,
  ja: /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u,
  ko: /\p{Script=Hangul}/u,
};
const VIET = /[ăâđêôơưàảãạáằẳẵặắầẩẫậấèẻẽẹéềểễệếìỉĩịíòỏõọóồổỗộốờởỡợớùủũụúừửữựứỳỷỹỵý]/i;

// Chữ này có phải tiếng đang học (để đọc bằng giọng đó) hay là tiếng Việt?
export function isTarget(text, lang) {
  if (SCRIPT[lang]) return SCRIPT[lang].test(text);
  return /[a-z]/i.test(text) && !VIET.test(text);
}

// Giọng bạn đã chọn trong Cài đặt (lưu riêng từng máy vì mỗi máy có bộ giọng khác nhau)
export const savedVoices = () => { try { return JSON.parse(localStorage.getItem('voices') || '{}'); } catch { return {}; } };
export const allVoices = () => voices;
export function voiceFor(bcp) {
  const want = bcp.toLowerCase().replace('_', '-'), base = want.split('-')[0];
  const pick = savedVoices()[base];
  if (pick) { const v = voices.find(x => x.voiceURI === pick); if (v) return v; }
  return voices.find(v => v.lang.toLowerCase().replace('_', '-') === want)
    || voices.find(v => v.lang.toLowerCase().startsWith(base));
}

export function say(text, bcp, rate) {
  if (!text) return false;
  if (!('speechSynthesis' in window)) { toast('Trình duyệt này không có giọng đọc'); return false; }
  try { speechSynthesis.cancel(); } catch {}
  const u = new SpeechSynthesisUtterance(text);
  u.lang = bcp;
  const v = voiceFor(bcp);
  if (v) u.voice = v;
  else if (!warned.has(bcp)) { warned.add(bcp); toast('Máy chưa có giọng đọc cho ngôn ngữ này (' + bcp + '). Hãy cài thêm giọng trong cài đặt hệ thống.', 6000); }
  u.rate = rate || prefs.ttsRate || 0.9;
  speechSynthesis.speak(u);
  return true;
}

// Biểu tượng loa nhỏ, bấm là đọc đoạn text
export const spk = (text, bcp) => `<span class="spk" role="button" tabindex="0" data-say="${esc(text)}" data-lang="${bcp}" title="Nghe đọc">🔊</span>`;
// Chữ có thể bấm để nghe + loa bên cạnh (chỉ khi chữ đó là tiếng đang học)
export function sayable(text, lang) {
  if (!isTarget(text, lang)) return esc(text);
  const bcp = langInfo(lang).bcp;
  return `<span class="say" data-say="${esc(text)}" data-lang="${bcp}">${esc(text)}</span>${spk(text, bcp)}`;
}
// Chỉ thêm loa (dùng trong nút đáp án: bấm chữ là chọn, bấm loa là nghe)
export const withSpeaker = (text, lang) => esc(text) + (isTarget(text, lang) ? spk(text, langInfo(lang).bcp) : '');

// Bắt mọi lần bấm vào chữ/loa, kể cả khi nằm trong nút đáp án
document.addEventListener('click', e => {
  const el = e.target.closest('[data-say]');
  if (!el) return;
  e.preventDefault(); e.stopPropagation();
  say(el.dataset.say, el.dataset.lang);
}, true);
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('.spk')) {
    e.preventDefault(); e.stopPropagation(); say(e.target.dataset.say, e.target.dataset.lang);
  }
}, true);
