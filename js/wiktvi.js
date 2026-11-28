// Nghĩa tiếng Việt khi tra từ, lấy từ Wiktionary tiếng Việt (miễn phí, không cần khóa, cần mạng ở lần đầu; đã tra thì lưu trong máy).
const API = 'https://vi.wiktionary.org/w/api.php';
const KEY = 'wiktViCache2', KEEP = 400;
const SECTION = { en: /^Tiếng Anh$/, zh: /^Tiếng (Trung( Quốc)?|Quan Thoại|Hán)$/, ja: /^Tiếng Nhật( Bản)?$/, ko: /^Tiếng (Triều Tiên|Hàn( Quốc)?)$/ };
// mục không phải nghĩa
const SKIP = /^(Hậu duệ|Từ ghép|Từ phái sinh|Cách dùng|Thành ngữ|Cụm từ|Cách phát âm|Phát âm|Tham khảo|Từ nguyên|Chuyển tự|Âm đọc|Từ liên hệ|Từ dẫn xuất|Đồng nghĩa|Trái nghĩa|Dịch|Xem thêm|Từ tương tự|Cách viết khác|Biến thể)/i;

let saved = null;
const load = () => { if (saved) return saved; try { saved = new Map(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { saved = new Map(); } return saved; };
function keep(k, v) {
  const m = load();
  m.delete(k); m.set(k, v);
  while (m.size > KEEP) m.delete(m.keys().next().value);
  try { localStorage.setItem(KEY, JSON.stringify([...m])); } catch { /* đầy bộ nhớ thì thôi */ }
}

// văn bản thuần của trang -> [{ pos, defs }] cho một ngôn ngữ
export function parse(text, lang, word) {
  const out = [];
  let inLang = false, cur = null, headSeen = false, skipNext = false;
  for (const raw of String(text).split('\n')) {
    const line = raw.trim();
    const h2 = /^==\s*([^=].*?)\s*==$/.exec(line);
    if (h2) { inLang = SECTION[lang].test(h2[1]); cur = null; continue; }
    if (!inLang || !line) continue;
    const h3 = /^={3,}\s*(.*?)\s*={3,}$/.exec(line);
    if (h3) { cur = SKIP.test(h3[1]) ? null : { pos: h3[1], defs: [] }; headSeen = false; skipNext = false; if (cur) out.push(cur); continue; }
    if (!cur) continue;
    // câu ví dụ trong mục tiếng Trung / Nhật / Hàn: dòng chữ gốc, dòng phiên âm, rồi dòng dịch (không phải nghĩa của từ)
    const roman = /\[[^\]]*âm[^\]]*\]/i.test(line);
    if (roman || /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(line)) { skipNext = roman; if (!headSeen && line.startsWith(String(word))) headSeen = true; continue; }
    if (skipNext) { skipNext = false; continue; }
    if (!headSeen && line.toLowerCase().startsWith(String(word).toLowerCase())) { headSeen = true; continue; } // dòng nhắc lại từ + phiên âm
    if (/[—―]| – |^IPA|^\/.*\/$/.test(line)) continue; // ví dụ (“câu —  nghĩa”) hoặc phiên âm
    if (cur.defs.length < 5) cur.defs.push(line.replace(/\s+/g, ' '));
  }
  return out.filter(s => s.defs.length).slice(0, 4);
}

async function page(word) {
  const q = new URLSearchParams({ action: 'query', prop: 'extracts', explaintext: '1', format: 'json', formatversion: '2', origin: '*', redirects: '1', titles: word });
  const res = await fetch(`${API}?${q}`);
  if (!res.ok) throw new Error('Wiktionary ' + res.status);
  return (await res.json()).query?.pages?.[0]?.extract || '';
}

// Thử lần lượt các dạng (từ đang tra, rồi dạng gốc): trả { word, sections } hoặc null nếu không có
export async function lookupVi(lang, words) {
  for (const word of [...new Set(words.filter(Boolean))]) {
    const key = `${lang}:${word}`;
    let sections = load().get(key);
    if (!sections) {
      sections = parse(await page(word), lang, word);
      keep(key, sections);
    }
    if (sections.length) return { word, sections };
  }
  return null;
}
// Dự phòng khi Wiktionary tiếng Việt không có từ (nhất là tiếng Trung, Nhật): dịch máy miễn phí MyMemory. Chỉ gửi đúng từ đang tra.
export async function machineVi(lang, word) {
  const key = `mt:${lang}:${word}`, hit = load().get(key);
  if (hit !== undefined) return hit;
  const q = new URLSearchParams({ q: word, langpair: `${lang === 'zh' ? 'zh-CN' : lang}|vi` });
  const res = await fetch('https://api.mymemory.translated.net/get?' + q);
  if (!res.ok) throw new Error('MyMemory ' + res.status);
  const j = await res.json();
  if (+j.responseStatus !== 200 || j.quotaFinished) return '';
  const t = String(j.responseData?.translatedText || '').trim();
  const out = t && t.toLowerCase() !== word.toLowerCase() ? t.slice(0, 200) : ''; // trả lại nguyên từ = không dịch được
  keep(key, out);
  return out;
}
// “simple past of become” -> become: dạng gốc để tra tiếp khi từ biến thể không có nghĩa tiếng Việt
export const baseForm = def => /(?:past|participle|plural|singular|comparative|superlative|tense|form)\b[^;.]*?\bof ([A-Za-z][A-Za-z' -]{1,30}?)(?:[.;(,]|$)/i.exec(String(def || ''))?.[1]?.trim() || '';
export const shortVi = r => (r ? r.sections.flatMap(s => s.defs.slice(0, 2)).slice(0, 3).map(d => d.replace(/[.;]+$/, '')).join('; ') : '');
