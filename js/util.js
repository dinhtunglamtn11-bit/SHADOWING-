// Tiện ích dùng chung: DOM, định dạng, ngôn ngữ, giờ Việt Nam, đọc phụ đề.

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const p2 = n => String(n).padStart(2, '0');
export const fmt = t => { const m = Math.floor(t / 60), s = (t % 60).toFixed(1).padStart(4, '0'); return m + ':' + s; };
export const fmtS = t => { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + p2(t % 60); };
export const fmtMB = b => b >= 1048576 ? (b / 1048576).toFixed(b >= 1e8 ? 0 : 1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
export const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

export function toast(msg, ms = 2600) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), ms);
}

// ---------- bus sự kiện ----------
const et = new EventTarget();
export const bus = {
  emit: (n, d) => et.dispatchEvent(new CustomEvent(n, { detail: d })),
  on: (n, f) => et.addEventListener(n, e => f(e.detail)),
};

// ---------- ngôn ngữ ----------
export const LANGS = [
  { id: 'en', short: 'EN', name: 'Tiếng Anh', bcp: 'en', words: true },
  { id: 'zh', short: '中', name: 'Tiếng Trung', bcp: 'zh-CN' },
  { id: 'ko', short: '한', name: 'Tiếng Hàn', bcp: 'ko' },
  { id: 'ja', short: '日', name: 'Tiếng Nhật', bcp: 'ja' },
];
let lang = 'zh';
try { const s = localStorage.getItem('lang'); if (LANGS.some(l => l.id === s)) lang = s; } catch {}
export const getLang = () => lang;
export const langInfo = (id = lang) => LANGS.find(l => l.id === id) || LANGS[1];
export function setLang(id) {
  lang = id;
  try { localStorage.setItem('lang', id); } catch {}
  bus.emit('lang', id);
}

// ---------- giờ Việt Nam (UTC+7, không có giờ mùa hè) ----------
const VN = 7 * 3600e3;
export const vnDate = (ms = Date.now()) => new Date(ms + VN).toISOString().slice(0, 10);
export const vnHour = (ms = Date.now()) => new Date(ms + VN).getUTCHours();
export const addDays = (dateStr, n) => { const d = new Date(dateStr + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

export function deviceId() {
  try {
    let d = localStorage.getItem('dev');
    if (!d) { d = uid(); localStorage.setItem('dev', d); }
    return d;
  } catch { return 'x'; }
}

// ---------- nhận dạng link nguồn của video ----------
// kind: youtube | tiktok | file (link trực tiếp .mp4…) | link (mở sang tab khác) | none | bad
function parseT(s) {
  if (!s) return 0;
  if (/^\d+(\.\d+)?$/.test(s)) return +s;
  const m = s.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  return m ? (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0)) : 0;
}
export function classifySrc(u) {
  u = (u || '').trim();
  if (!u) return { kind: 'none' };
  let url;
  try { url = new URL(u); } catch { return { kind: 'bad' }; }
  if (!/^https?:$/.test(url.protocol)) return { kind: 'bad' };
  const h = url.hostname.replace(/^(www|m|music)\./, '');
  let id = null;
  if (h === 'youtu.be') id = url.pathname.slice(1, 12);
  else if (/(^|\.)youtube(-nocookie)?\.com$/.test(h)) {
    id = url.searchParams.get('v');
    if (!id) { const mm = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/); id = mm && mm[1]; }
  }
  if (id && /^[\w-]{11}$/.test(id)) {
    return { kind: 'youtube', id, start: parseT(url.searchParams.get('t') || url.searchParams.get('start')), portrait: /\/shorts\//.test(url.pathname) };
  }
  if (/(^|\.)tiktok\.com$/.test(h)) {
    const mm = url.pathname.match(/\/video\/(\d{8,25})/);
    return mm ? { kind: 'tiktok', id: mm[1], portrait: true } : { kind: 'link' };
  }
  if (/\.(mp4|webm|ogv|mov|m4v|mp3|m4a|ogg|wav|aac)$/i.test(url.pathname)) return { kind: 'file' };
  return { kind: 'link' };
}
export const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

// Mở hộp chọn file. Phải gọi trực tiếp trong sự kiện bấm của người dùng.
export function pickFile(accept, multiple = false) {
  return new Promise(res => {
    const i = document.createElement('input');
    i.type = 'file'; i.accept = accept; i.multiple = multiple;
    i.onchange = () => res([...i.files]);
    i.oncancel = () => res([]);
    i.click();
  });
}

// ---------- chữ Trung giản thể ----------
// Chuyển phồn thể → giản thể bằng OpenCC (tương ứng 1-1 theo ký tự nên không làm lệch giờ từng từ).
const OPENCC = 'https://cdn.jsdelivr.net/npm/opencc-js@1.4.2/dist/esm/t2cn.js';
let conv = null, convP = null;
export function loadSimplifier() {
  return convP ||= import(/* @vite-ignore */ OPENCC)
    .then(m => { conv = m.Converter({ from: 'tw', to: 'cn' }); return conv; })
    .catch(e => { convP = null; console.warn('Không tải được bộ chuyển giản thể:', e); return null; });
}
export const simp = s => (conv && s ? conv(s) : s);

// ---------- tách chữ để tô sáng ----------
// Tiếng Anh tách theo từ; tiếng Trung / Nhật / Hàn tách theo từng ký tự. Bỏ qua khoảng trắng.
export const tokensOf = (line, words) => (words ? line.split(/\s+/).filter(Boolean) : [...line].filter(c => !/\s/.test(c)));
// Trọng số khi chia thời gian: dấu câu = 0, từ dài nặng hơn từ ngắn
export const tokenWeight = (tok, words) => {
  const n = [...tok].filter(c => /[\p{L}\p{N}]/u.test(c)).length;
  return words ? Math.max(n, 0) : (n ? 1 : 0);
};

// ---------- đọc SRT / VTT ----------
function parseTime(s) {
  const m = s.trim().replace(',', '.').match(/(?:(\d+):)?(\d+):(\d+)\.(\d+)/);
  if (!m) return NaN;
  return (+(m[1] || 0)) * 3600 + (+m[2]) * 60 + (+m[3]) + (+('0.' + m[4]));
}
// Một số file .vtt có giờ ngay trước từng từ: 你<00:01.200>好<00:01.500>吗
const TS = /<(?:(\d+):)?(\d+):(\d+)[.,](\d+)>/g;
function inlineTimes(raw, start, end, words) {
  if (!/<(?:\d+:)?\d+:\d+[.,]\d+>/.test(raw)) return null;
  const strip = s => s.replace(/<[^>]+>/g, '');
  const pieces = [];
  let last = 0, t = start, m;
  TS.lastIndex = 0;
  while ((m = TS.exec(raw))) {
    pieces.push({ text: strip(raw.slice(last, m.index)), t });
    t = (+(m[1] || 0)) * 3600 + (+m[2]) * 60 + (+m[3]) + (+('0.' + m[4]));
    last = m.index + m[0].length;
  }
  pieces.push({ text: strip(raw.slice(last)), t });
  const out = [];
  pieces.forEach((p, i) => {
    const toks = tokensOf(p.text, words), e = i + 1 < pieces.length ? pieces[i + 1].t : end;
    toks.forEach((_, k) => out.push(+(p.t + (e - p.t) * k / Math.max(1, toks.length) - start).toFixed(2)));
  });
  return out;
}
export function parseSubs(text, words = false) {
  text = text.replace(/^﻿/, '').replace(/\r/g, '');
  const out = [];
  for (const block of text.split(/\n{2,}/)) {
    const lines = block.split('\n').filter(l => l.trim() !== '');
    const i = lines.findIndex(l => l.includes('-->'));
    if (i < 0) continue;
    const [a, b] = lines[i].split('-->');
    const start = parseTime(a), end = parseTime(b.trim().split(/\s+/)[0]);
    if (isNaN(start) || isNaN(end)) continue;
    const rawLines = lines.slice(i + 1);
    const body = rawLines.map(l => l.replace(/<[^>]+>/g, '').replace(/\{\\[^}]*\}/g, '').trim()).filter(Boolean);
    if (!body.length) continue;
    const cue = { start, end, lines: body };
    const t = inlineTimes(rawLines.find(l => l.replace(/<[^>]+>/g, '').trim()) || '', start, end, words);
    if (t && t.length === tokensOf(body[0], words).length) cue.t = t;
    out.push(cue);
  }
  return out.sort((x, y) => x.start - y.start);
}
