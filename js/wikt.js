// Tra từ tiếng Anh / Nhật / Hàn bằng Wiktionary tiếng Anh (miễn phí, không cần khóa, cần mạng).
// Từ đã tra được giữ lại trong máy nên tra lại được cả khi mất mạng. Tiếng Trung dùng từ điển offline riêng (dict.js).
const API = 'https://en.wiktionary.org/w/api.php';
const SECTION = { en: 'English', ja: 'Japanese', ko: 'Korean' };
const KEEP = 400, KEY = 'wiktCache';

// ---------- nhớ từ đã tra ----------
let saved = null;
const mem = new Map();
function load() {
  if (saved) return saved;
  try { saved = new Map(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { saved = new Map(); }
  return saved;
}
function keep(k, v) {
  const m = load();
  m.delete(k); m.set(k, v);
  while (m.size > KEEP) m.delete(m.keys().next().value);
  try { localStorage.setItem(KEY, JSON.stringify([...m])); } catch { /* đầy bộ nhớ thì thôi */ }
}

// ---------- gọi Wiktionary ----------
async function api(params) {
  const q = new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
  const res = await fetch(`${API}?${q}`);
  if (!res.ok) throw new Error('Wiktionary trả lỗi ' + res.status);
  return res.json();
}

// Trong các tiêu đề này, trang nào có tồn tại? (một lần gọi cho cả danh sách)
async function existing(titles) {
  const out = new Set(), ask = [];
  for (const t of titles) {
    if (mem.get('x:' + t) === true) out.add(t);
    else if (mem.get('x:' + t) === undefined) ask.push(t);
  }
  for (let i = 0; i < ask.length; i += 40) {
    const part = ask.slice(i, i + 40);
    const r = await api({ action: 'query', titles: part.join('|') });
    const norm = new Map((r.query?.normalized || []).map(n => [n.to, n.from]));
    for (const p of r.query?.pages || []) {
      const from = norm.get(p.title) || p.title, ok = !p.missing && !p.invalid;
      mem.set('x:' + from, ok);
      if (ok) out.add(from);
    }
  }
  return out;
}

const text = el => el.textContent.replace(/\s+/g, ' ').trim();

// Chữ Nhật có furigana: 学(がっ)校(こう) -> がっこう
function kana(head) {
  const c = head.cloneNode(true);
  c.querySelectorAll('rp').forEach(n => n.remove());
  c.querySelectorAll('ruby').forEach(r => { const rt = r.querySelector('rt'); r.replaceWith(rt ? rt.textContent : r.textContent); });
  return text(c);
}

function parseSection(html, lang) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('style,script,sup,.references,.mw-references-wrap,.h-usage-example,.HQToggle,.citation-whole,.nyms,.mw-editsection').forEach(n => n.remove());
  const head = doc.querySelector('.headword-line');
  let pron = '';
  if (lang === 'ja') {
    const h = head?.querySelector('.headword'), k = h ? kana(h) : '', r = head?.querySelector('.headword-tr');
    const hasKana = /[぀-ヿ]/.test(k);
    pron = [hasKana && k !== text(h) ? k : '', r ? text(r) : ''].filter(Boolean).join(' · ');
  } else if (lang === 'ko') {
    const r = head?.querySelector('.headword-tr');
    pron = r ? text(r) : '';
  } else {
    const ipa = [...doc.querySelectorAll('.IPA')].map(text).find(x => x.startsWith('/'));
    pron = ipa || '';
  }
  const sections = [];
  let pos = '';
  for (const el of doc.querySelectorAll('h3,h4,h5,ol')) {
    if (/^H/.test(el.tagName)) { pos = text(el); continue; }
    if (el.closest('ol ol,ul,dl,table') || /^(Etymology|Pronunciation|Alternative forms|References|Further reading|See also|Anagrams)/i.test(pos)) continue;
    const defs = [...el.children].filter(li => li.tagName === 'LI').map(li => {
      const c = li.cloneNode(true);
      c.querySelectorAll('ul,ol,dl,dd').forEach(n => n.remove());
      return text(c);
    }).filter(d => d.length > 1).slice(0, 8);
    if (defs.length) sections.push({ pos: pos.replace(/\s*\d+$/, ''), defs });
  }
  if (!sections.length && lang === 'ja') { // trang chữ Hán chỉ trỏ sang trang chữ kana: 飲む -> 【のむ】 [verb] …
    const dds = [...doc.querySelectorAll('dl > dd')].map(text).filter(Boolean);
    const kanaForm = /【([^】]+)】/.exec(doc.body.textContent);
    const pos = /^\[([^\]]+)\]/.exec(dds[0] || '');
    const defs = dds.map(d => d.replace(/^\[[^\]]*\]\s*/, '').replace(/^[^:：]{0,30}[:：]\s*/, '')).filter(d => d.length > 1).slice(0, 6);
    if (defs.length) { sections.push({ pos: pos ? pos[1] : '', defs }); if (!pron && kanaForm) pron = kanaForm[1]; }
  }
  return { pron, sections: sections.slice(0, 4) };
}

// ---------- tiếng Anh: đọc thẳng văn bản wiki của trang (nhanh hơn nhiều so với để Wiktionary dựng HTML cho trang dài) ----------
const TAGS = { pres: 'present', past: 'past', part: 'participle', ptcp: 'participle', 'ing-form': 'present participle', 'ed-form': 'past tense', 's-verb-form': 'third-person singular present', p: 'plural', pl: 'plural', s: 'singular', sg: 'singular', comd: 'comparative', supd: 'superlative', simple: 'simple', spast: 'simple past', pastpart: 'past participle', pp: 'past participle', 3: 'third-person', 'en-ing form of': 'present participle of', 'en-past of': 'past tense of', 'en-third-person singular of': 'third-person singular of', 'en-irregular plural of': 'plural of' };
const NOT_POS =/^(Etymology|Pronunciation|Alternative|References|Further|See also|Anagrams|Derived|Related|Descendants|Translations|Usage|Synonyms|Antonyms|Hyponyms|Hypernyms|Coordinate|Statistics|Quotations|Conjugation|Declension|Inflection|Notes|Trivia|Collocations|Homophones|Hyphenation|Rhymes|Audio)/i;
function tpl(body) {
  const parts = body.split('|').map(x => x.trim()), name = parts[0].toLowerCase().replace(/_/g, ' ');
  const args = parts.slice(1).filter(a => !/^[\w-]+=/.test(a)); // bỏ tham số có tên (a=GA, t=…)
  if (/^(lb|lbl|label|context|cx)$/.test(name)) return '(' + args.slice(1).filter(a => a && a !== '_' && a !== 'and' && a !== 'or').join(', ') + ')';
  if (/^(q|qual|qualifier|i|qf|sense)$/.test(name)) return '(' + args.join(', ') + ')';
  if (/^(gloss|gl)$/.test(name)) return '(' + (args[0] || '') + ')';
  if (/^(l|ll|m|mention|link|l-self|m-self|ja-l|ko-l)$/.test(name)) return args[2] || args[1] || '';
  if (/^(w|wp|pedia)$/.test(name)) return args[1] || args[0] || '';
  if (/^(ng|n-g|ngd|non-gloss definition|non gloss definition|taxlink|taxfmt|vern)$/.test(name)) return args[0] || '';
  if (name === 'form of') return args[1] && args[2] ? `${args[1]} of ${args[2]}` : '';
  if (/^(infl of|inflection of)$/.test(name)) { // inflection of|en|run||pres|part -> present participle of run
    const tags = args.slice(3).filter(Boolean).map(g => TAGS[g] || g).filter(g => g !== ';');
    return args[1] ? `${tags.join(' ') || 'inflection'} of ${args[1]}` : '';
  }
  if (/^en-.* of$/.test(name)) return args[0] ? `${(TAGS[name] || name.slice(3))} ${args[0]}` : ''; // en-past of|run
  if (/ of$/.test(name)) return args[1] ? `${name} ${args[1]}` : ''; // plural of|en|dog, present participle of|en|run
  return '';
}
function wikiClean(s) {
  let t = s;
  for (let i = 0; i < 6 && t.includes('{{'); i++) t = t.replace(/\{\{([^{}]*)\}\}/g, (_, b) => tpl(b));
  return t.replace(/<ref[^>]*>[\s\S]*?<\/ref>|<ref[^>]*\/>|<[^>]+>/g, '').replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/'{2,}/g, '').replace(/\(\s*\)/g, '').replace(/\s+/g, ' ').trim();
}
function parseWikitextEn(wt) {
  const m = /^==\s*English\s*==\s*$/m.exec(wt);
  if (!m) return null;
  let body = wt.slice(m.index + m[0].length);
  const next = /^==[^=]/m.exec(body);
  if (next) body = body.slice(0, next.index);
  let sec = null, ipa = '';
  const sections = [];
  for (const line of body.split('\n')) {
    const h = /^={3,}\s*([^=]+?)\s*={3,}\s*$/.exec(line);
    if (h) { sec = NOT_POS.test(h[1]) ? null : { pos: h[1], defs: [] }; if (sec) sections.push(sec); continue; }
    if (!ipa) { const i = /\{\{IPA\|en\|([^|}]+)/.exec(line); if (i && i[1].startsWith('/')) ipa = i[1]; }
    const d = sec && /^#\s+(.*)$/.exec(line); // một dấu # + dấu cách = nghĩa chính; #: #* ## là ví dụ / nghĩa phụ
    if (!d) continue;
    const text = wikiClean(d[1]);
    if (text.length > 1 && sec.defs.length < 8) sec.defs.push(text);
  }
  const kept = sections.filter(s => s.defs.length).slice(0, 4);
  return kept.length ? { pron: ipa, sections: kept } : null;
}
async function entryEn(word) {
  const r = await api({ action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main', titles: word, redirects: '1' });
  const page = r.query?.pages?.[0];
  if (!page || page.missing || page.invalid) return null;
  const p = parseWikitextEn(page.revisions?.[0]?.slots?.main?.content || '');
  return p ? { word: page.title || word, pron: p.pron, sections: p.sections } : null;
}

// Mục từ đầy đủ của một từ, hoặc null nếu Wiktionary không có từ này trong ngôn ngữ đang tra
export async function entry(lang, word) {
  const key = `${lang}:${word}`, hit = load().get(key) ?? mem.get(key);
  if (hit) return hit;
  if (lang === 'en') {
    const e = await entryEn(word);
    if (e) keep(key, e);
    return e;
  }
  const sec = await api({ action: 'parse', page: word, prop: 'sections', redirects: '1' });
  const s = (sec.parse?.sections || []).find(x => x.toclevel === 1 && x.line === SECTION[lang]);
  if (!s) return null;
  const t = await api({ action: 'parse', page: word, section: s.index, prop: 'text', redirects: '1', disablelimitreport: '1', disableeditsection: '1' });
  const r = parseSection(t.parse.text, lang);
  if (!r.sections.length) return null;
  const e = { word: sec.parse.title || word, pron: r.pron, sections: r.sections }; // trang chuyển hướng (먹었다 -> 먹다) thì lấy tên trang thật
  keep(key, e);
  return e;
}

// ---------- đoán các dạng gốc có thể tra ----------
const HANGUL = /[가-힣]/;
// bỏ patchim: 갑 -> 가, 갔 -> 가, 합 -> 하
function noFinal(ch) {
  const n = ch.charCodeAt(0) - 0xAC00;
  if (n < 0 || n > 11171 || n % 28 === 0) return ch;
  return String.fromCharCode(0xAC00 + n - (n % 28));
}
const FINALS = [4, 8, 16, 17, 20]; // ㄴ ㄹ ㅁ ㅂ ㅆ: patchim hay gặp ở đuôi động từ / tính từ
const PARTICLE = /^(은|는|이|가|을|를|에|에서|에게|께|의|도|만|와|과|랑|하고|로|으로|부터|까지|처럼|보다|마다|조차|밖에|이나|나|이랑|이에요|예요|입니다|이다|이고|이라고|라고)$/;
function koCandidates(token) {
  const out = [], push = w => { if (w && !out.includes(w)) out.push(w); };
  const chars = [...token];
  for (let p = chars.length; p >= 1; p--) {
    const base = chars.slice(0, p).join(''), last = chars[p - 1], more = p < chars.length;
    if (more && PARTICLE.test(chars.slice(p).join(''))) { push(base); continue; } // danh từ + trợ từ: không đoán thành động từ
    const stem = [];
    if (more) { // còn đuôi phía sau (갑니다, 했어요, 해요…): đoán dạng nguyên mẫu
      if (last === '해' || last === '했') stem.push(chars.slice(0, p - 1).join('') + '하');
      const n = last.charCodeAt(0) - 0xAC00;
      if (n >= 0 && FINALS.includes(n % 28)) stem.push(chars.slice(0, p - 1).join('') + noFinal(last));
      if (!base.endsWith('다')) { stem.forEach(s => push(s + '다')); push(base + '다'); }
    }
    push(base);
  }
  return out;
}

const ROW_U = { き: 'く', ぎ: 'ぐ', し: 'す', ち: 'つ', に: 'ぬ', び: 'ぶ', み: 'む', り: 'る', い: 'う', っ: 'る', ん: 'む' };
const ROW_A = { か: 'く', が: 'ぐ', さ: 'す', た: 'つ', な: 'ぬ', ば: 'ぶ', ま: 'む', ら: 'る', わ: 'う' };
function jaDeinflect(s) {
  const out = [], push = w => { if (w && w !== s && !out.includes(w)) out.push(w); };
  const last = s.slice(-1), body = s.slice(0, -1);
  if (s === 'し' || s === 'せ' || s === 'さ') push('する');
  if (s === 'き' || s === 'こ' || s === '来') push('来る'), push('くる');
  if (ROW_U[last]) {
    push(body + ROW_U[last]);
    if (last === 'っ') { push(body + 'う'); push(body + 'つ'); push(body + 'く'); }
    if (last === 'ん') { push(body + 'ぶ'); push(body + 'ぬ'); }
    if (last === 'い') push(body + 'ぐ'), push(body + 'く');
  }
  if (ROW_A[last]) push(body + ROW_A[last]);
  if (last === 'く') push(body + 'い');
  if (s.endsWith('かっ')) push(s.slice(0, -2) + 'い');
  if (last !== 'る' && /[぀-ヿ一-鿿]/.test(last)) push(s + 'る');
  return out;
}
const AUX_NEXT = /^(ま[すしせ]|な[いかく]|た|だ|て|で|れ|られ|せ|さ|ば|よう|ず|ん|ちゃ|じゃ)/;

function segmentsJa(text) {
  try { return [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(text)].map(s => ({ s: s.segment, i: s.index })); } catch { return null; }
}

// Từ ứng viên tại vị trí k của chuỗi, ưu tiên nên thử trước: ['学校', '学', …]
export function candidates(lang, text, k) {
  const out = [], push = w => { w = w.trim(); if (w && !out.includes(w)) out.push(w); };
  if (lang === 'en') {
    let s = k, e = k;
    const ok = c => c && /[\p{L}\p{M}'’-]/u.test(c);
    while (s > 0 && ok(text[s - 1])) s--;
    while (e < text.length && ok(text[e])) e++;
    const w = text.slice(s, e).replace(/’/g, "'").replace(/^['-]+|['-]+$/g, '');
    push(w); push(w.toLowerCase());
    return out;
  }
  if (lang === 'ko') {
    let s = k, e = k;
    const ok = c => c && /[\p{Script=Hangul}\p{Script=Han}]/u.test(c);
    while (s > 0 && ok(text[s - 1])) s--;
    while (e < text.length && ok(text[e])) e++;
    koCandidates(text.slice(s, e)).forEach(push);
    return out;
  }
  // ja
  const segs = segmentsJa(text);
  if (!segs) { for (let n = Math.min(6, text.length - k); n >= 1; n--) push(text.slice(k, k + n)); return out; }
  let at = segs.findIndex((g, j) => k >= g.i && (j === segs.length - 1 || k < segs[j + 1].i));
  if (at < 0) at = 0;
  // các cụm bắt đầu từ chữ đang chạm, ngắn đến dài: 食 / 食べ / 食べまし / 食べました
  const accs = [];
  let acc = '';
  for (let j = at; j < segs.length && j < at + 4; j++) { acc += segs[j].s; if (acc.length <= 8) accs.push(acc); }
  const first = accs[0] ?? segs[at].s, rest = text.slice(segs[at].i + first.length);
  const infl = [...accs].reverse().flatMap(a => (/[぀-ゟ]$/.test(a) || a === first ? jaDeinflect(a) : []));
  [...accs].reverse().forEach(a => { if (a !== first) push(a); }); // từ ghép dài trước
  const conj = AUX_NEXT.test(rest) || (/^[一-鿿]$/.test(first) && /^[぀-ゟ]/.test(rest)); // 食|べました, 高|かった: có thể là động từ / tính từ đang chia
  if (conj) { infl.forEach(push); push(first); } else { push(first); infl.forEach(push); }
  return out;
}

// Ứng viên nào thật sự có mục từ? Trả về danh sách đã lọc, giữ thứ tự (hỏi Wiktionary một lần)
export async function find(lang, text, k) {
  const all = candidates(lang, text, k);
  if (lang === 'en' || all.length < 2) return all; // ít ứng viên: tra thẳng, khỏi hỏi trước
  const have = await existing(all);
  return all.filter(w => have.has(w));
}

// "present participle of run" -> "run": dạng gốc của một từ biến cách
// Chỉ nhận khi định nghĩa BẮT ĐẦU bằng kiểu "plural of dog" (từ khóa nằm trong 5 chữ đầu), để câu như "a form of exercise" không bị nhầm
const FORM_OF = /^(?:[\p{L}'-]+\s+){0,4}?(?:forms?|inflection|participle|tense|plural|singular|stem|conjugation|gerund|variant|spelling|misspelling|contraction|alternative|comparative|superlative|imperative|negative|polite|past|present|continuative|conditional|volitional|passive|causative|potential|honorific|humble)\b[^.;:]{0,40}?\b(?:of|for)\s+([\p{L}'-]+)\s*(?:[;,:]|$)/iu;
export function lemmaOf(e) {
  for (const s of e?.sections || []) {
    for (const d of s.defs) {
      const m = FORM_OF.exec(d.replace(/\([^)]*\)|\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim());
      if (m) return m[1];
    }
  }
  return '';
}

// Gom mọi thứ cho một lần chạm: danh sách từ ứng viên (đã có mục từ), từ nào đang chọn, và mục từ đã nạp.
// Mục từ của các ứng viên sau được nạp khi người dùng bấm vào (ent[w] chưa có thì gọi entry()).
export async function resolve(lang, text, k) {
  const words = await find(lang, text, k), ent = {};
  let head = null;
  while (words.length && !head) { // lấy ứng viên đầu tiên thật sự có mục từ đúng ngôn ngữ
    const e = await entry(lang, words[0]);
    if (e) head = e; else words.shift();
  }
  if (!head) return null;
  ent[words[0]] = head;
  let sel = 0;
  const lem = lemmaOf(head);
  if (lem && lem !== words[0]) {
    const le = await entry(lang, lem).catch(() => null);
    if (le) {
      const at = words.indexOf(lem);
      if (at > 0) words.splice(at, 1);
      words.splice(1, 0, lem); ent[lem] = le;
      if (lang !== 'en') sel = 1; // tiếng Nhật / Hàn: tra luôn dạng gốc (từ đang chia thì dạng gốc mới là từ cần học)
    }
  }
  return { words, sel, ent };
}

// Nghĩa ngắn để điền sẵn vào ô "Nghĩa"
export function shortMeaning(e) {
  const defs = e.sections.flatMap(s => s.defs).map(d => d.replace(/\s*\[[^\]]*\]/g, '').trim()).filter(Boolean);
  return defs.slice(0, 3).join('; ').slice(0, 160);
}
