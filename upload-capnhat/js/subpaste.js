// Thêm phụ đề bằng cách DÁN VĂN BẢN, nhập một lúc cả 3 thứ: chữ gốc | phiên âm | nghĩa.
//
// Cú pháp (mỗi câu một dòng):
//   chữ gốc | phiên âm | nghĩa tiếng Việt
//   [01:23] chữ gốc | phiên âm | nghĩa        ([mm:ss] ở đầu dòng là giờ bắt đầu, không bắt buộc)
// Hoặc mỗi câu là một khối 3 dòng, các khối cách nhau bằng dòng trống:
//   chữ gốc
//   phiên âm
//   nghĩa
// Hoặc dán nguyên file .srt/.vtt (đã có giờ).
import { $, $$, esc, toast, bus, langInfo, parseSubs, tokensOf } from './util.js';
import { currentItemId, currentCues, currentLang, applyCues, setCuesFromFile, simplifyCues } from './player.js';
import * as store from './store.js';
import { M } from './media.js';
import { getBlob } from './alignui.js';
import { decodeAudio, transcribeAll, addPinyin } from './align.js';
import { zhText } from './prefs.js';
import { trLines } from './i18n.js';

const LATIN = /^[\p{Script=Latin}\p{M}\s'’‘,.!?;:()\-–—0-9/]+$/u;
const LETTER = /[\p{L}\p{N}]/u;
const nk = s => (s || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

// ---------- phân tích văn bản dán ----------
function timeOf(s) { // 1:23.5 | 01:23 | 00:01:23.500 -> giây
  const p = s.replace(',', '.').split(':').map(parseFloat);
  return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p.length === 2 ? p[0] * 60 + p[1] : p[0];
}
function splitFields(line) {
  const parts = line.replace(/｜/g, '|').split(/(?<!\\)\|/).map(x => x.replace(/\\\|/g, '|').trim());
  while (parts.length && !parts[0]) parts.shift();            // dạng bảng: | a | b | c |
  while (parts.length && !parts[parts.length - 1]) parts.pop();
  return parts;
}
const clean = l => l.replace(/^\s*(?:[-*•]\s+|\d+[.)、]\s+)/, '').replace(/[`]|\*\*/g, '').trim();
function takeTime(line) {
  const m = line.match(/^\s*\[(\d+(?::\d+){1,2}(?:[.,]\d+)?)\]\s*/);
  return m ? { start: timeOf(m[1]), rest: line.slice(m[0].length) } : { start: null, rest: line };
}
const cap3 = f => (f.length > 3 ? [f[0], f[1], f.slice(2).join(' | ')] : f);

export function parsePasted(text, lang) {
  const words = langInfo(lang).words;
  text = (text || '').replace(/^﻿/, '').replace(/\r/g, '').trim();
  if (!text) return { kind: 'empty', entries: [] };
  if (/-->/.test(text)) {
    const cs = parseSubs(text, words);
    return { kind: 'srt', entries: cs.map(c => ({ start: c.start, end: c.end, lines: c.lines, t: c.t })) };
  }
  const lines = text.split('\n');
  const entries = [];
  if (lines.some(l => /[|｜]/.test(l))) { // mỗi dòng: gốc | phiên âm | nghĩa
    for (const raw of lines) {
      if (!raw.trim() || /^[\s|:\-]+$/.test(raw)) continue;
      const { start, rest } = takeTime(clean(raw));
      const f = cap3(splitFields(rest));
      if (f.length) entries.push({ start, lines: f });
    }
    return { kind: 'pipe', entries };
  }
  const blocks = text.split(/\n\s*\n/).map(b => b.split('\n').map(clean).filter(Boolean)).filter(b => b.length);
  // một khối 2–3 dòng duy nhất: chỉ coi là MỘT câu (gốc/phiên âm/nghĩa) nếu dòng 2 trông giống phiên âm; nếu không thì mỗi dòng là một câu
  const VIET = /[ăâđêôơưàảãạáằẳẵặắầẩẫậấèẻẽẹéềểễệếìỉĩịíòỏõọóồổỗộốờởỡợớùủũụúừửữựứỳỷỹỵý]/i;
  const oneEntry = b => b.length > 1 && b.length <= 3 && (words ? b.length === 3 && VIET.test(b[2]) : LATIN.test(b[1]) && !LATIN.test(b[0]));
  if (blocks.length > 1 || (blocks.length === 1 && oneEntry(blocks[0]))) {
    for (const b of blocks) {
      const { start, rest } = takeTime(b[0]);
      entries.push({ start, lines: cap3([rest, ...b.slice(1)]) });
    }
    return { kind: 'blocks', entries };
  }
  // không có dòng trống, không có |: thử nhận ra từng cụm 3 dòng liên tiếp (gốc, phiên âm, nghĩa)
  const flat = lines.map(clean).filter(Boolean);
  if (flat.length >= 3 && flat.length % 3 === 0 && !words && flat.every((l, i) => i % 3 !== 1 || LATIN.test(l)) && flat.every((l, i) => i % 3 !== 0 || !LATIN.test(l))) {
    for (let i = 0; i < flat.length; i += 3) { const { start, rest } = takeTime(flat[i]); entries.push({ start, lines: [rest, flat[i + 1], flat[i + 2]] }); }
    return { kind: 'triples', entries };
  }
  for (const l of flat) { const { start, rest } = takeTime(l); entries.push({ start, lines: [rest] }); }
  return { kind: 'lines', entries };
}

// ---------- prompt mẫu cho AI ----------
const PHONETIC = {
  zh: { name: 'tiếng Trung', rule: 'Phiên âm: pinyin có dấu thanh, MỖI CHỮ HÁN MỘT ÂM TIẾT, các âm tiết cách nhau bằng một dấu cách, bỏ dấu câu.', ex: '你好，今天天气很好 | nǐ hǎo jīn tiān tiān qì hěn hǎo | Xin chào, hôm nay thời tiết rất đẹp', script: 'Dùng chữ Hán GIẢN THỂ ở phần chữ gốc.' },
  en: { name: 'tiếng Anh', rule: 'Phiên âm: IPA của TỪNG TỪ (không có dấu / /), các từ cách nhau bằng một dấu cách, đúng thứ tự và đúng số lượng từ của câu gốc.', ex: 'Hello, how are you today? | həˈloʊ haʊ ɑr ju təˈdeɪ | Xin chào, hôm nay bạn thế nào?', script: '' },
  ko: { name: 'tiếng Hàn', rule: 'Phiên âm: romaja theo quy tắc Revised Romanization của TỪNG TỪ, các từ cách nhau bằng một dấu cách, đúng thứ tự và số lượng từ của câu gốc.', ex: '안녕하세요 만나서 반갑습니다 | annyeonghaseyo mannaseo bangapseumnida | Xin chào, rất vui được gặp bạn', script: '' },
  ja: { name: 'tiếng Nhật', rule: 'Phiên âm: romaji (Hepburn) của TỪNG TỪ/CỤM, các cụm cách nhau bằng một dấu cách.', ex: '今日はいい天気ですね | kyou wa ii tenki desu ne | Hôm nay trời đẹp nhỉ', script: '' },
};
export function promptFor(lang) {
  const p = PHONETIC[lang] || PHONETIC.zh;
  return `Bạn là trợ lý dạy ${p.name}. Tôi sẽ gửi một đoạn lời thoại (hoặc phụ đề) bằng ${p.name}. Hãy tách thành từng câu ngắn theo ý nghĩa (mỗi câu một dòng) rồi viết lại theo ĐÚNG cú pháp sau, không thêm gì khác:

chữ gốc | phiên âm | nghĩa tiếng Việt

Quy tắc:
1. ${p.script ? p.script : 'Giữ nguyên chữ gốc, chỉ sửa lỗi chính tả rõ ràng.'}
2. ${p.rule}
3. Nghĩa: dịch tự nhiên, dễ hiểu sang tiếng Việt.
4. Mỗi câu đúng MỘT dòng, giữ nguyên thứ tự, không bỏ sót câu nào, không đánh số, không dùng markdown (không **, không gạch đầu dòng), không giải thích.
5. Dùng dấu | để ngăn cách 3 phần, đúng 2 dấu | mỗi dòng.
6. Nếu lời thoại có mốc thời gian (ví dụ 01:23), đặt nó trong dấu [ ] ở đầu dòng: [01:23] chữ gốc | phiên âm | nghĩa

Ví dụ kết quả:
${p.ex}

Đây là lời thoại:
(dán lời thoại vào đây)`;
}
export const EXAMPLE = {
  zh: '你好，今天天气很好 | nǐ hǎo jīn tiān tiān qì hěn hǎo | Xin chào, hôm nay thời tiết rất đẹp\n我们去吃饭吧 | wǒ men qù chī fàn ba | Chúng ta đi ăn cơm đi\n你叫什么名字 | nǐ jiào shén me míng zi | Bạn tên là gì',
  en: 'Hello, how are you today? | həˈloʊ haʊ ɑr ju təˈdeɪ | Xin chào, hôm nay bạn thế nào?\nI want to learn English | aɪ wɑnt tu lɜrn ˈɪŋglɪʃ | Tôi muốn học tiếng Anh',
  ko: '안녕하세요 만나서 반갑습니다 | annyeonghaseyo mannaseo bangapseumnida | Xin chào, rất vui được gặp bạn\n저는 학생입니다 | jeoneun haksaengimnida | Tôi là học sinh',
  ja: '今日はいい天気ですね | kyou wa ii tenki desu ne | Hôm nay trời đẹp nhỉ\n私は学生です | watashi wa gakusei desu | Tôi là học sinh',
};

// ---------- áp dụng vào video ----------
// Gán vào các câu đang có: ưu tiên ghép theo chữ gốc (theo thứ tự), không ghép được thì ghép theo thứ tự câu
function assignExisting(cues, entries, keepL1) {
  const map = new Array(entries.length).fill(-1);
  let pos = 0, matched = 0;
  entries.forEach((e, i) => {
    const k = nk(e.lines[0]);
    for (let j = pos; j < cues.length; j++) if (nk(cues[j].lines[0]) === k) { map[i] = j; pos = j + 1; matched++; break; }
  });
  const byText = matched >= entries.length * 0.7;
  if (!byText) entries.forEach((e, i) => { map[i] = i < cues.length ? i : -1; });
  const out = cues.map(c => ({ ...c, lines: [...c.lines] }));
  entries.forEach((e, i) => {
    const c = out[map[i]]; if (!c) return;
    if (keepL1) c.lines = [c.lines[0], ...e.lines.slice(1)];
    else { if (c.t && nk(e.lines[0]) !== nk(c.lines[0])) delete c.t; c.lines = e.lines; }
  });
  return { cues: out, used: map.filter(x => x >= 0).length, byText };
}

// Dòng có giờ [mm:ss] là mốc. Dòng không có giờ KHÔNG bị bỏ: được chia đều (theo độ dài chữ) vào khoảng giữa hai mốc kề nhau.
export function buildTimed(entries, totalDur = 0) {
  const len = e => Math.max(1, [...(e.lines[0] || '')].filter(ch => LETTER.test(ch)).length);
  let last = -1;
  const es = entries.map(e => { // mốc phải tăng dần: mốc lùi lại thì coi như dòng không có giờ
    if (e.start != null && e.start >= last) { last = e.start; return { ...e }; }
    return { ...e, start: null };
  });
  const anchors = es.map((e, i) => (e.start != null ? i : -1)).filter(i => i >= 0);
  if (!anchors.length) return [];
  const out = [];
  const spread = (from, to, t0, t1) => { // các dòng from..to-1 chia đều khoảng [t0, t1]
    const ws = []; for (let i = from; i < to; i++) ws.push(len(es[i]));
    const tot = ws.reduce((a, b) => a + b, 0); let acc = 0;
    for (let i = from; i < to; i++) {
      const s = t0 + (t1 - t0) * acc / tot; acc += ws[i - from]; const e = t0 + (t1 - t0) * acc / tot;
      out.push({ start: +s.toFixed(2), end: +Math.max(e - 0.02, s + 0.3).toFixed(2), lines: es[i].lines });
    }
  };
  if (anchors[0] > 0) spread(0, anchors[0], 0, Math.max(es[anchors[0]].start, 0.3 * anchors[0]));
  anchors.forEach((a, k) => {
    const nextA = anchors[k + 1] ?? es.length, t0 = es[a].start;
    const t1 = nextA < es.length ? es[nextA].start : (totalDur > t0 + 1 ? totalDur : t0 + 3 * (nextA - a));
    spread(a, nextA, t0, Math.max(t1, t0 + 0.4 * (nextA - a)));
  });
  return out;
}

// Chữ trong văn bản dán chưa có giờ: nghe âm thanh để biết chỗ nào là chỗ nào rồi dàn các câu theo độ dài chữ
function mapLines(entries, segs) {
  const len = s => Math.max(1, [...s].filter(ch => LETTER.test(ch)).length);
  const segLen = segs.map(s => len(s.lines[0])), segTot = segLen.reduce((a, b) => a + b, 0);
  const cum = []; let acc = 0; segLen.forEach(l => { cum.push(acc); acc += l; });
  const timeAt = p => { // p: vị trí chữ (0..segTot)
    let i = segLen.length - 1;
    for (let k = 0; k < segLen.length; k++) if (p < cum[k] + segLen[k]) { i = k; break; }
    const f = Math.min(1, Math.max(0, (p - cum[i]) / segLen[i]));
    return segs[i].start + f * (segs[i].end - segs[i].start);
  };
  const uLen = entries.map(e => len(e.lines[0])), uTot = uLen.reduce((a, b) => a + b, 0);
  let a = 0;
  const out = entries.map((e, i) => {
    const s = timeAt(a / uTot * segTot); a += uLen[i]; const en = timeAt(a / uTot * segTot);
    return { start: +s.toFixed(2), end: +Math.max(en, s + 0.4).toFixed(2), lines: e.lines };
  });
  for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].end) out[i - 1].end = Math.max(out[i - 1].start + 0.3, out[i].start - 0.02);
  return out;
}

// Canh theo NỘI DUNG: so từng chữ của văn bản dán với từng chữ Whisper nghe được (quy hoạch động Needleman–Wunsch, chỉ xét dải quanh đường chéo),
// rồi lấy giờ của chữ đầu và chữ cuối mỗi câu. Chữ nghe sai vẫn được ghép (thay thế), đoạn thừa hoặc thiếu được bỏ qua nên không bị lệch dây chuyền.
// Câu nào chữ đầu / cuối rơi sát mép một đoạn tiếng thì lấy đúng mép đoạn đó, nên không dính vào khoảng nghỉ. Trả về { cues, ratio } hoặc null nếu văn bản quá khác với tiếng.
export function alignScript(entries, segs) {
  const nrm = s => [...String(s || '').toLowerCase()].filter(ch => LETTER.test(ch));
  const S = [], eRange = [];
  entries.forEach((e, i) => { const a = S.length; for (const ch of nrm(e.lines[0])) S.push(ch); eRange.push([a, S.length]); });
  const R = [], rSeg = [], rOff = [], segLen = [];
  segs.forEach((g, k) => { const cs = nrm(g.lines[0]); segLen.push(cs.length); cs.forEach((ch, p) => { R.push(ch); rSeg.push(k); rOff.push(p); }); });
  const n = S.length, m = R.length; if (!n || !m) return null;
  const B = Math.min(700, Math.max(60, Math.ceil(0.15 * Math.max(n, m)))), W = 2 * B + 1, NEG = -1e9;
  const lo = i => Math.max(0, Math.round(i * m / n) - B), hi = i => Math.min(m, Math.round(i * m / n) + B);
  const dir = new Uint8Array((n + 1) * W); // 1 chéo, 2 bỏ chữ trong văn bản dán, 3 bỏ chữ Whisper nghe được
  let prev = new Int32Array(m + 2).fill(NEG), cur = new Int32Array(m + 2).fill(NEG);
  for (let j = lo(0); j <= hi(0); j++) { prev[j] = -j; dir[j - lo(0)] = 3; }
  for (let i = 1; i <= n; i++) {
    const l = lo(i), h = hi(i); cur.fill(NEG);
    for (let j = l; j <= h; j++) {
      let best = NEG, d = 0;
      if (j > 0 && prev[j - 1] > NEG) { const v = prev[j - 1] + (S[i - 1] === R[j - 1] ? 2 : -1); if (v > best) { best = v; d = 1; } }
      if (prev[j] > NEG) { const v = prev[j] - 1; if (v > best) { best = v; d = 2; } }
      if (j > l && cur[j - 1] > NEG) { const v = cur[j - 1] - 1; if (v > best) { best = v; d = 3; } }
      cur[j] = best; dir[i * W + (j - l)] = d;
    }
    [prev, cur] = [cur, prev];
  }
  let j = Math.min(m, hi(n)); if (prev[j] <= NEG) return null;
  const map = new Int32Array(n).fill(-1); let i = n, same = 0;
  while (i > 0 && j >= 0) {
    const l = lo(i), d = dir[i * W + (j - l)];
    if (d === 1) { map[i - 1] = j - 1; if (S[i - 1] === R[j - 1]) same++; i--; j--; } else if (d === 2) i--; else if (d === 3) j--; else break;
  }
  const ratio = same / n; if (ratio < 0.4) return null; // văn bản dán quá khác với tiếng nói: để cách chia theo độ dài lo
  const tAt = (jj, edge) => { const g = segs[rSeg[jj]], L = Math.max(1, segLen[rSeg[jj]]), p = rOff[jj], d = (g.end - g.start) / L; // edge: 0 = đầu chữ, 1 = cuối chữ
    if (edge === 0 && p <= 1) return g.start; if (edge === 1 && p >= L - 2) return g.end; return g.start + (p + edge) * d; };
  const fixed = entries.map((e, k) => {
    const [a, b] = eRange[k]; let f = -1, l2 = -1, cnt = 0; for (let q = a; q < b; q++) if (map[q] >= 0) { if (f < 0) f = q; l2 = q; cnt++; }
    if (f < 0 || cnt < Math.max(1, 0.2 * (b - a))) return null;
    return { start: tAt(map[f], 0), end: tAt(map[l2], 1) };
  });
  const len = k => Math.max(1, eRange[k][1] - eRange[k][0]), out = new Array(entries.length);
  let k = 0; while (k < entries.length) {
    if (fixed[k]) { out[k] = { ...fixed[k] }; k++; continue; }
    let q = k; while (q < entries.length && !fixed[q]) q++; // k..q-1 không có chỗ khớp: chia đều theo độ dài chữ vào khoảng giữa hai câu đã định giờ
    const t0 = k > 0 ? out[k - 1].end : segs[0].start, t1 = q < entries.length ? fixed[q].start : segs[segs.length - 1].end;
    const tot = Array.from({ length: q - k }, (_, z) => len(k + z)).reduce((x, y) => x + y, 0); let acc = 0;
    for (let z = k; z < q; z++) { const s = t0 + (t1 - t0) * acc / tot; acc += len(z); out[z] = { start: s, end: t0 + (t1 - t0) * acc / tot }; }
    k = q;
  }
  const cues = entries.map((e, z) => ({ start: +out[z].start.toFixed(2), end: +Math.max(out[z].end, out[z].start + 0.4).toFixed(2), lines: e.lines }));
  for (let z = 1; z < cues.length; z++) { if (cues[z].start < cues[z - 1].start) cues[z].start = cues[z - 1].start; if (cues[z].start < cues[z - 1].end) cues[z - 1].end = +Math.max(cues[z - 1].start + 0.3, cues[z].start - 0.02).toFixed(2); }
  return { cues, ratio };
}

// ---------- giao diện ----------
let ctl = null, parsed = { kind: 'empty', entries: [] };

function suggestedMode(p) {
  if (p.kind === 'srt') return 'srt';
  if (p.entries.some(e => e.start != null)) return 'times';
  return currentCues().length ? 'existing' : 'ai';
}
const MODE_TEXT = {
  srt: 'Thay phụ đề bằng nội dung dán (đã có giờ)',
  times: 'Tạo phụ đề theo giờ [mm:ss] ở đầu mỗi dòng',
  existing: 'Gán vào các câu đang có theo thứ tự',
  ai: 'AI nghe video và tự canh giờ cho từng câu (cần file video trong máy, mất vài phút)',
};

function preview() {
  const lang = currentLang();
  parsed = parsePasted($('#pgText').value, lang);
  const es = parsed.entries, n = es.length;
  if (!n) { $('#pgPreview').innerHTML = '<span class="dim">Chưa có nội dung. Dán văn bản vào ô trên, hoặc bấm “Chèn ví dụ”.</span>'; $('#pgApply').disabled = true; return; }
  const w2 = es.filter(e => e.lines[1]).length, w3 = es.filter(e => e.lines[2]).length, wt = es.filter(e => e.start != null || e.end != null).length;
  const mode = $('#pgMode').value === 'auto' ? suggestedMode(parsed) : $('#pgMode').value;
  $('#pgPreview').innerHTML = `<div><span class="ok">✓ ${n} câu</span> · ${w2} có phiên âm · ${w3} có nghĩa${wt ? ` · ${wt} có giờ` : ''} <span class="dim">(kiểu: ${{ srt: 'file phụ đề', pipe: 'gốc | phiên âm | nghĩa', blocks: 'khối nhiều dòng', triples: 'cụm 3 dòng', lines: 'mỗi dòng một câu' }[parsed.kind]})</span></div>` +
    `<div class="dim">Cách áp dụng: ${MODE_TEXT[mode]}</div>` +
    es.slice(0, 3).map(e => `<div class="pvrow" lang="${langInfo(lang).bcp}"><b>${esc(e.lines[0] || '')}</b><span>${esc(e.lines[1] || '—')}</span><span>${esc(e.lines[2] || '—')}</span></div>`).join('') +
    (n > 3 ? `<div class="dim">… và ${n - 3} câu nữa</div>` : '');
  if (mode === 'times' && wt < n) $('#pgPreview').insertAdjacentHTML('beforeend', `<div class="miss">Chỉ ${wt}/${n} dòng có giờ [mm:ss]: ${n - wt} dòng còn lại sẽ được chia đều vào khoảng giữa các mốc giờ (theo độ dài chữ). Muốn canh chính xác hơn, hãy thêm giờ cho nhiều dòng hơn hoặc chọn “AI tự canh giờ”.</div>`);
  $('#pgKeepRow').hidden = mode !== 'existing';
  $('#pgModelRow').hidden = mode !== 'ai';
  $('#pgApply').disabled = false;
  if (mode === 'existing' && currentCues().length && n !== currentCues().length) $('#pgPreview').insertAdjacentHTML('beforeend', `<div class="miss">Video có ${currentCues().length} câu nhưng bạn dán ${n} câu: app sẽ ghép theo chữ gốc, câu nào không ghép được sẽ bị bỏ qua.</div>`);
}

async function apply() {
  const id = currentItemId(), lang = currentLang();
  if (!id) { toast('Hãy mở một video trước'); return; }
  let entries = parsed.entries.map(e => ({ ...e, lines: e.lines.map(l => zhText(l, lang)) }));
  if (!entries.length) return;
  const mode = $('#pgMode').value === 'auto' ? suggestedMode(parsed) : $('#pgMode').value;
  $('#pgApply').disabled = true; $('#pgStat').textContent = '';
  try {
    let cues;
    if (mode === 'srt') cues = entries.map(e => ({ start: e.start, end: e.end, lines: e.lines, ...(e.t ? { t: e.t } : {}) }));
    else if (mode === 'times') {
      cues = buildTimed(entries, isFinite(M.duration) ? M.duration : 0);
      if (!cues.length) throw new Error('Không có dòng nào có giờ [mm:ss] ở đầu.');
    } else if (mode === 'existing') {
      if (!currentCues().length) throw new Error('Video chưa có câu nào. Hãy chọn cách “AI tự canh giờ”, hoặc thêm giờ [mm:ss] vào đầu mỗi dòng.');
      const r = assignExisting(currentCues(), entries, $('#pgKeep').checked);
      cues = r.cues;
      $('#pgStat').textContent = `Đã gán ${r.used}/${entries.length} câu (${r.byText ? 'ghép theo chữ gốc' : 'ghép theo thứ tự'}).`;
    } else { // ai
      const it = store.get('items', id), blob = await getBlob(it, id);
      if (!blob) throw new Error('Video này chưa có file trên máy. Hãy chọn file video trước.');
      if (blob.size > 400 * 1024 * 1024) throw new Error('File quá nặng để phân tích (giới hạn khoảng 400 MB).');
      ctl = new AbortController(); $('#pgStop').hidden = false;
      $('#pgProg').hidden = false; $('#pgProg').removeAttribute('value'); $('#pgStat').textContent = 'Đang đọc âm thanh…';
      const x = await decodeAudio(blob);
      const segs = await transcribeAll(x, {
        lang, model: $('#pgModel').value, signal: ctl.signal,
        onLoad: (p, f) => { $('#pgProg').value = p / 100; $('#pgStat').textContent = `Đang tải mô hình AI… ${Math.round(p)}% (${f.split('/').pop()}). Chỉ tải lần đầu.`; },
        onProgress: (d, n) => { $('#pgProg').value = d / n; $('#pgStat').textContent = `AI đang nghe… ${Math.floor(d / 60)}:${String(Math.floor(d % 60)).padStart(2, '0')} / ${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}`; },
      });
      if (!segs.length) throw new Error('Không nghe ra lời nói nào trong video.');
      const al = alignScript(entries, segs);
      if (al) { cues = al.cues; $('#pgStat').textContent = `Đã canh giờ ${cues.length} câu theo giọng nói (khớp ${Math.round(al.ratio * 100)}% chữ với tiếng nghe được).`; }
      else { cues = mapLines(entries, segs); $('#pgStat').textContent = `Đã canh giờ ${cues.length} câu, nhưng văn bản dán khác tiếng nói khá nhiều nên chỉ chia theo độ dài chữ. Hãy kiểm tra lại giờ từng câu.`; }
    }
    cues = await simplifyCues(cues, lang);
    if (lang === 'zh' && cues.some(c => c.lines.length === 1)) { try { await addPinyin(cues); } catch { /* không có mạng: bỏ qua */ } }
    if (mode === 'existing') applyCues(cues); else setCuesFromFile(cues);
    toast(`Đã thêm phụ đề: ${cues.length} câu ✓`);
    $('#pgDlg').close();
  } catch (e) {
    $('#pgStat').textContent = e.name === 'AbortError' ? 'Đã dừng.' : 'Lỗi: ' + (e.message || e);
    if (e.name !== 'AbortError') console.warn(e);
  } finally { ctl = null; $('#pgStop').hidden = true; $('#pgProg').hidden = true; $('#pgApply').disabled = !parsed.entries.length; }
}

// ---------- tải phụ đề về máy ----------
const pad = (n, w = 2) => String(n).padStart(w, '0');
const tcode = (s, sep) => { const ms = Math.round(Math.max(0, s) * 1000); return `${pad(Math.floor(ms / 3600000))}:${pad(Math.floor(ms / 60000) % 60)}:${pad(Math.floor(ms / 1000) % 60)}${sep}${pad(ms % 1000, 3)}`; };
const mmss = s => { const c = Math.round(Math.max(0, s) * 100), m = Math.floor(c / 6000); return `${pad(m)}:${pad(Math.floor(c / 100) % 60)}.${pad(c % 100)}`; };
const pickLines = (c, use) => c.lines.map((l, i) => (use[i] ? l : null)).filter(l => l != null);
export function buildExport(cues, fmt, use = [true, true, true]) {
  const rows = cues.map(c => ({ c, ls: pickLines(c, use) })).filter(r => r.ls.some(l => (l || '').trim()));
  if (fmt === 'srt') return rows.map((r, i) => `${i + 1}\n${tcode(r.c.start, ',')} --> ${tcode(r.c.end, ',')}\n${r.ls.map(l => l || '–').join('\n')}\n`).join('\n');
  if (fmt === 'vtt') return 'WEBVTT\n\n' + rows.map(r => `${tcode(r.c.start, '.')} --> ${tcode(r.c.end, '.')}\n${r.ls.map(l => l || '–').join('\n')}\n`).join('\n');
  if (fmt === 'csv') {
    const q = s => '"' + String(s ?? '').replace(/"/g, '""') + '"';
    return ['Bắt đầu,Kết thúc,Chữ gốc,Phiên âm,Nghĩa', ...rows.map(r => [q(tcode(r.c.start, '.')), q(tcode(r.c.end, '.')), ...[0, 1, 2].map(i => q(use[i] ? r.c.lines[i] || '' : ''))].join(','))].join('\r\n');
  }
  return rows.map(r => `[${mmss(r.c.start)}] ${r.ls.map(l => (l || '').replace(/\|/g, '\\|')).join(' | ')}`).join('\n'); // txt: dán lại vào app được
}
function exportState() {
  const cues = currentCues(), use = [$('#pgxL1').checked, $('#pgxL2').checked, $('#pgxL3').checked], fmt = $('#pgxFmt').value;
  return { cues, use, fmt };
}
function drawExport() {
  const { cues, use, fmt } = exportState();
  $('#pgxInfo').textContent = cues.length ? `Video đang có ${cues.length} câu phụ đề.` : 'Video này chưa có phụ đề để tải.';
  const text = cues.length ? buildExport(cues.slice(0, 4), fmt, use) : '';
  $('#pgxPrev').textContent = text ? text + (cues.length > 4 ? `\n… (${cues.length - 4} câu nữa)` : '') : '';
  $('#pgxGo').disabled = !cues.length || !use.some(Boolean); $('#pgxCopy').disabled = $('#pgxGo').disabled;
}
function doExport() {
  const { cues, use, fmt } = exportState();
  if (!cues.length || !use.some(Boolean)) return;
  const it = store.get('items', currentItemId());
  const name = (((it && (it.title || it.name)) || 'phu-de').replace(/[\/:*?"<>|]+/g, ' ').trim() || 'phu-de') + '.' + fmt;
  const body = buildExport(cues, fmt, use), bom = fmt === 'srt' || fmt === 'vtt' ? '' : '﻿'; // txt/csv: BOM để Excel và Notepad đọc đúng chữ Hán
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([bom + body], { type: 'text/plain;charset=utf-8' }));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(`Đã tải ${name} (${cues.length} câu) ✓`, 3000);
}

function open(showPrompt) {
  if (!currentItemId()) { toast('Hãy mở một video trước'); return; }
  const lang = currentLang();
  $('#pgPromptText').value = trLines(promptFor(lang));
  $('#pgPromptBox').hidden = !showPrompt;
  $('#pgStat').textContent = ''; $('#pgProg').hidden = true; $('#pgStop').hidden = true;
  setTab(showPrompt ? 'paste' : (currentCues().length ? 'paste' : 'file'));
  preview();
  $('#pgDlg').showModal();
}
function setTab(t) {
  $$('#pgTabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  $('#pgFilePane').hidden = t !== 'file'; $('#pgPastePane').hidden = t !== 'paste'; $('#pgExportPane').hidden = t !== 'export';
  if (t === 'export') drawExport();
}

export function init() {
  $('#btnPaste').onclick = () => open(false);
  bus.on('openPaste', d => open(!!d?.prompt));
  $('#pgClose').onclick = () => { ctl?.abort(); $('#pgDlg').close(); };
  $('#pgTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setTab(b.dataset.t); });
  $('#pgPick').onclick = () => { $('#pgDlg').close(); $('#sfile').click(); };
  $('#pgText').addEventListener('input', preview);
  $('#pgMode').addEventListener('change', preview);
  $('#pgExample').onclick = () => { $('#pgText').value = trLines(EXAMPLE[currentLang()] || EXAMPLE.zh); preview(); };
  $('#pgPromptBtn').onclick = () => { $('#pgPromptBox').hidden = !$('#pgPromptBox').hidden; };
  $('#pgCopy').onclick = async () => {
    const t = $('#pgPromptText').value;
    try { await navigator.clipboard.writeText(t); toast('Đã sao chép prompt. Dán vào ChatGPT/Claude kèm lời thoại của bạn.', 5000); }
    catch { $('#pgPromptText').select(); document.execCommand?.('copy'); toast('Đã chọn sẵn prompt, bấm Ctrl+C để sao chép'); }
  };
  $('#pgxFmt').addEventListener('change', drawExport); ['#pgxL1', '#pgxL2', '#pgxL3'].forEach(s => $(s).addEventListener('change', drawExport));
  $('#pgxGo').onclick = doExport;
  $('#pgxCopy').onclick = async () => { // chép timeline cả video theo cú pháp "[mm:ss.cc] gốc | phiên âm | nghĩa", dán lại vào hộp “Dán phụ đề” của video khác (kể cả link YouTube) là dùng được
    const { cues, use } = exportState(); if (!cues.length) return; const t = buildExport(cues, 'txt', use);
    try { await navigator.clipboard.writeText(t); toast(`Đã chép timeline ${cues.length} câu ✓ Dán vào “Dán phụ đề” của video khác.`, 4000); }
    catch { $('#pgxPrev').textContent = t; const r = document.createRange(); r.selectNodeContents($('#pgxPrev')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Trình duyệt chặn chép tự động: đã chọn sẵn toàn bộ, bấm Ctrl+C.', 5000); }
  };
  $('#pgApply').onclick = apply;
  $('#pgStop').onclick = () => ctl?.abort();
}
