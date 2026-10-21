// Đổi ngôn ngữ giao diện (Việt / Anh / Trung).
// Chữ gốc trong mã và HTML là tiếng Việt; khi chọn ngôn ngữ khác, mọi chữ giao diện được dịch lúc hiển thị
// bằng từ điển: khớp nguyên câu, khớp mẫu có {} (số, tên…), tách theo " · ", rồi thay cụm dài trong câu.
//  - Anh: en-a…en-d (khóa = câu tiếng Việt, giá trị = tiếng Anh).
//  - Trung: tiếng Việt → tiếng Anh (en-*) → tiếng Trung (zh-en.js, khóa = câu tiếng Anh). Câu nào chưa có bản Trung thì hiện tiếng Anh.
// Muốn thêm một ngôn ngữ mới: làm một file giống zh-en.js rồi thêm vào LOADERS bên dưới.
// Nội dung của người học (phụ đề, thẻ, ghi chú, đáp án) không bị dịch.

function readLang() {
  try { const l = JSON.parse(localStorage.getItem('ui') || '{}').lang; return l === 'en' || l === 'zh' ? l : 'vi'; } catch { return 'vi'; }
}
export const uiLang = readLang();

const SYMS = '\\s\\p{Extended_Pictographic}\\uFE0F\\u200D＋✔✓✕✗✎✂↩↺↻↶⇄←→↗⬇⬆▶⏭⏮■☰·✨—–';
const AFFIX = new RegExp(`^([${SYMS}]*)([\\s\\S]*?)([${SYMS}]*)$`, 'u');
const HAS_VI = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
const isLetter = ch => !!ch && /\p{L}/u.test(ch);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = s => s.normalize('NFC').replace(/️/g, '').replace(/\s+/g, ' ');
const coreOf = s => { const m = AFFIX.exec(s); return m && m[2] ? m[2] : s; };

// Câu nằm trong vùng này là nội dung của người dùng: gần như không dịch
const USER_OK = new Set(['chưa có phiên âm', 'chưa có nghĩa', 'Đúng', 'Sai']);
const USER_SEL = '.cue .m,.cue .s,#now .main:not(.small),#now .sub,.qtext,.qexp,.qopt,.qback,.preview,.txt,.wans,.wmeaning,.pvrow,.srow,.ci b,.lib .n b,.wd b,.gt,.nw-h,.nw-lead,.nw-tag,.nw-ttl,.nw-text,.nw-src,.nw-syn,.wchip,.slot,.qhint,.qtitle,#msItem option,#wtFolder option:not(:first-child),.uipv,textarea,[contenteditable]';

// Nạp từ điển của ngôn ngữ đang chọn (chỉ tải khi không dùng tiếng Việt)
const EN_FILES = ['en-a', 'en-b', 'en-c', 'en-d'];
const LOADERS = {
  en: async () => Object.assign({}, ...(await Promise.all(EN_FILES.map(f => import(`./${f}.js`)))).map(m => m.default)),
  zh: async () => {
    const en = await LOADERS.en(), zh = (await import('./zh-en.js')).default;
    return Object.fromEntries(Object.entries(en).map(([k, v]) => [k, zh[coreOf(v)] ?? v]));
  },
};
const DICT = uiLang === 'vi' ? {} : await LOADERS[uiLang]();

let E = null, PATS = [], KEYS = [];
function build() {
  E = new Map(); PATS = []; KEYS = [];
  for (const dict of [DICT]) {
    for (const [k, v] of Object.entries(dict)) {
      const key = norm(coreOf(k)), val = coreOf(v);
      if (/\{[*~#]?\}/.test(key)) {
        // {} số hoặc cụm ngắn (chỉ nhận số khi mẫu ngắn), {#} luôn là số, {*} cụm bất kỳ, {~} cụm bất kỳ và được dịch tiếp (thông báo giao diện)
        const parts = key.split(/(\{[*~#]?\})/), isPh = p => /^\{[*~#]?\}$/.test(p), lit = parts.filter(p => !isPh(p)).join('').length;
        const full = new Set(); let k = 0;
        const src = parts.map(p => { if (!isPh(p)) return esc(p); if (p === '{~}') full.add(k); k++; return p === '{#}' || (p === '{}' && lit < 8) ? '([\\d.,:/%]+)' : '(.*?)'; }).join('');
        PATS.push({ re: new RegExp(`^${src}$`, 'su'), tpl: val, lit, full, dot: key.includes(' · ') });
      } else {
        E.set(key, val);
        if (key.length >= 5) KEYS.push([key, val]);
      }
    }
  }
  PATS.sort((a, b) => b.lit - a.lit);
  KEYS.sort((a, b) => b[0].length - a[0].length);
}

// điền mẫu: {} lần lượt, {2} theo số, {1:ít|nhiều} = số + từ chia số ít/nhiều
function fill(tpl, caps, full) {
  let i = 0;
  return tpl.replace(/\{(\d*)(?::([^|}]*)\|([^}]*))?\}/g, (_, d, a, b) => {
    const idx = d ? +d - 1 : i++;
    const raw = caps[idx] ?? '';
    const cap = full?.has(idx) ? tr(raw) : exact(raw);
    return a !== undefined ? cap + ' ' + (parseFloat(raw) === 1 ? a : b) : cap;
  });
}
function exact(raw) { // chỉ dịch khớp nguyên cụm, dùng cho phần chèn trong mẫu
  const m = AFFIX.exec(raw);
  if (!m || !m[2]) return raw;
  const t = E.get(norm(m[2]));
  return t === undefined ? raw : m[1] + t + m[3];
}
function replaceKey(s, k, v) {
  let i = 0, out = '', changed = false;
  for (;;) {
    const j = s.indexOf(k, i);
    if (j < 0) break;
    if (isLetter(s[j - 1]) || isLetter(s[j + k.length])) { out += s.slice(i, j + k.length); i = j + k.length; continue; }
    out += s.slice(i, j) + v; i = j + k.length; changed = true;
  }
  return changed ? out + s.slice(i) : s;
}

function lookup(core, user) {
  const n = norm(core);
  const e = E.get(n);
  if (user) {
    if (e !== undefined && USER_OK.has(n)) return e;
    const m = /^Câu (\d+)$/.exec(n);
    return m ? 'Line ' + m[1] : null;
  }
  if (e !== undefined) return e;
  if (!HAS_VI.test(n)) return null;
  const hit = dot => { for (const p of PATS) { if (p.dot !== dot) continue; const m = p.re.exec(n); if (m) return fill(p.tpl, m.slice(1), p.full); } return null; };
  let r = hit(true); // mẫu có sẵn dấu ' · ' bên trong thì thử trước
  if (r != null) return r;
  if (n.includes(' · ')) { // chuỗi ghép bằng ' · ': dịch từng phần
    let ch = false;
    const out = n.split(' · ').map(x => { const t = tr(x); if (t !== x) ch = true; return t; });
    if (ch) return out.join(' · ');
  }
  r = hit(false);
  if (r != null) return r;
  let out = n;
  for (const [k, v] of KEYS) if (out.includes(k)) out = replaceKey(out, k, v);
  return out !== n ? out : null;
}

const cache = new Map();
export function tr(s, user = false) {
  if (uiLang === 'vi' || typeof s !== 'string' || !s) return s;
  if (!E) build();
  const ck = (user ? '\u0001' : '') + s;
  let r = cache.get(ck);
  if (r !== undefined) return r;
  const m = AFFIX.exec(s);
  r = s;
  if (m && m[2]) { const t = lookup(m[2], user); if (t != null) r = m[1] + t + m[3]; }
  if (cache.size > 8000) cache.clear();
  cache.set(ck, r);
  return r;
}
export const trLines = s => (uiLang === 'vi' ? s : String(s).split('\n').map(l => tr(l)).join('\n'));

// ---------- áp dụng lên giao diện ----------
const ATTRS = ['title', 'placeholder', 'aria-label', 'alt'];
const SKIP = 'script,style,.pxe';
function trText(tn) {
  const p = tn.parentElement;
  if (!p || p.closest(SKIP)) return;
  const s = tn.nodeValue;
  if (!s || !s.trim()) return;
  const o = tr(s, !!p.closest(USER_SEL));
  if (o !== s) tn.nodeValue = o;
}
function trAttrs(el) {
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v) { const o = trLines(v); if (o !== v) el.setAttribute(a, o); }
  }
}
function scan(node) {
  if (node.nodeType === 3) { trText(node); return; }
  if (node.nodeType !== 1 || node.closest(SKIP)) return;
  trAttrs(node);
  node.querySelectorAll('[title],[placeholder],[aria-label],[alt]').forEach(trAttrs);
  const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT), list = [];
  for (let n = w.nextNode(); n; n = w.nextNode()) list.push(n);
  list.forEach(trText);
}

export function initI18n(root = document.body) {
  document.documentElement.lang = uiLang === 'zh' ? 'zh-CN' : uiLang;
  document.documentElement.dataset.uilang = uiLang;
  if (uiLang === 'vi') return;
  // hộp thoại hệ thống: confirm / alert / prompt
  for (const f of ['confirm', 'alert']) { const orig = window[f].bind(window); window[f] = m => orig(tr(String(m))); }
  const origPrompt = window.prompt.bind(window);
  window.prompt = (m, d) => origPrompt(tr(String(m)), d);
  scan(root);
  new MutationObserver(ms => {
    for (const m of ms) {
      if (m.type === 'characterData') trText(m.target);
      else if (m.type === 'attributes') { const v = m.target.getAttribute(m.attributeName); if (v) { const o = trLines(v); if (o !== v) m.target.setAttribute(m.attributeName, o); } }
      else m.addedNodes.forEach(scan);
    }
  }).observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}
