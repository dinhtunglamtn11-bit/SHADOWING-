// Từ điển Hán–Anh chạy offline (CC-CEDICT, CC BY-SA 4.0, https://cc-cedict.org).
// File dict/cedict.txt (~9 MB) chỉ tải khi dùng lần đầu, sau đó được trình duyệt giữ lại (service worker) nên dùng được khi mất mạng.
// Mỗi dòng: giản[|phồn] <TAB> pinyin số <TAB> nghĩa/nghĩa/…
let loading = null;
let S = null, T = null; // Map: từ giản thể / phồn thể -> [[giản, phồn, pinyin số, nghĩa], …]
let maxLen = 1;

export const ready = () => !!S;

export function loadDict(onProgress) {
  return loading ??= (async () => {
    const res = await fetch('dict/cedict.txt');
    if (!res.ok) throw new Error('không tải được từ điển (' + res.status + ')');
    const total = +res.headers.get('content-length') || 0;
    let text = '';
    if (res.body && total && onProgress) { // đọc dần để báo tiến độ
      const rd = res.body.getReader(), dec = new TextDecoder(); let got = 0;
      for (;;) { const { done, value } = await rd.read(); if (done) break; got += value.length; text += dec.decode(value, { stream: true }); onProgress(got / total); }
      text += dec.decode();
    } else text = await res.text();
    const s = new Map(), t = new Map();
    let i = 0;
    while (i < text.length) {
      let j = text.indexOf('\n', i); if (j < 0) j = text.length;
      if (text.charCodeAt(i) !== 35 && j > i) { // bỏ dòng chú thích bắt đầu bằng #
        const a = text.indexOf('\t', i), b = text.indexOf('\t', a + 1);
        if (a > 0 && b > 0 && b < j) {
          const w = text.slice(i, a), bar = w.indexOf('|');
          const simp = bar < 0 ? w : w.slice(0, bar), trad = bar < 0 ? w : w.slice(bar + 1);
          const e = [simp, trad, text.slice(a + 1, b), text.slice(b + 1, j)];
          (s.get(simp) || s.set(simp, []).get(simp)).push(e);
          if (trad !== simp) (t.get(trad) || t.set(trad, []).get(trad)).push(e);
          if (simp.length > maxLen) maxLen = simp.length;
        }
      }
      i = j + 1;
    }
    S = s; T = t;
    return true;
  })().catch(e => { loading = null; throw e; });
}

export const lookup = w => (S && (S.get(w) || T.get(w))) || null;

// Các từ bắt đầu tại vị trí i của chuỗi, dài nhất trước: [{ word, entries }]
export function candidatesAt(text, i, max = 8) {
  const out = [];
  if (!S) return out;
  for (let n = Math.min(max, maxLen, text.length - i); n >= 1; n--) {
    const w = text.slice(i, i + n), e = lookup(w);
    if (e) out.push({ word: w, entries: e });
  }
  return out;
}

// Cắt chuỗi thành các từ bằng cách khớp dài nhất; chữ không có trong từ điển bị bỏ qua
export function segmentWords(text, max = 6) {
  const out = [], han = /\p{Script=Han}/u;
  for (let i = 0; i < text.length;) {
    if (!han.test(text[i])) { i++; continue; }
    const c = candidatesAt(text, i, max)[0];
    if (c) { out.push(c.word); i += c.word.length; } else i++;
  }
  return out;
}

// pinyin số (ni3 hao3, lu:4, r5) -> pinyin có dấu
const TONE = { a: 'āáǎàa', e: 'ēéěèe', i: 'īíǐìi', o: 'ōóǒòo', u: 'ūúǔùu', 'ü': 'ǖǘǚǜü' };
function mark(syl) {
  const m = /^([A-Za-z:üÜ]+?)([1-5])$/.exec(syl);
  if (!m) return syl;
  const base = m[1].replace(/u:/gi, 'ü'), tone = +m[2], low = base.toLowerCase();
  if (tone === 5) return base;
  let k = low.indexOf('a');
  if (k < 0) k = low.indexOf('e');
  if (k < 0 && low.includes('ou')) k = low.indexOf('o');
  if (k < 0) for (let q = low.length - 1; q >= 0; q--) if ('aeiouü'.includes(low[q])) { k = q; break; }
  if (k < 0) return base;
  const rep = TONE[low[k]][tone - 1];
  return base.slice(0, k) + (base[k] !== low[k] ? rep.toUpperCase() : rep) + base.slice(k + 1);
}
export const pinyinMarks = py => py.split(' ').map(mark).join(' ');

// "to eat/to have a meal" -> ['to eat', 'to have a meal']
export const glosses = defs => defs.split('/').map(x => x.trim()).filter(Boolean);
