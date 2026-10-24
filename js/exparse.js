// Phân tích cú pháp bài tập (dùng cho "Bài tập của tôi" và bài kiểm tra trong "Tin tức").
//
// Mỗi dòng là một câu hỏi, bắt đầu bằng LOẠI: rồi các phần cách nhau bằng dấu |
//   TN: câu hỏi | *đúng | sai | sai | sai       trắc nghiệm (thường 4 đáp án), dấu * trước đáp án đúng
//   NN: câu hỏi | *đúng | *đúng | sai | sai       chọn NHIỀU đáp án (đánh * cho mọi đáp án đúng; phải chọn đủ và không chọn thừa)
//   DS: nhận định | đúng                          đúng / sai
//   G:  câu hỏi | đáp án / đáp án khác            tự luận ngắn (gõ đáp án)
//   Đ:  Tôi [go/goes] to [school]                 điền từ vào chỗ trống bằng cách gõ
//   S:  từ / từ / từ / từ | gợi ý                 sắp xếp các từ thành câu có nghĩa (từ cách nhau bằng /, hoặc bằng dấu cách)
//   N:  từ hoặc câu để máy đọc | *đúng | sai | …  nghe rồi chọn đáp án đúng (giọng máy)
//   NG: từ hoặc câu để máy đọc | đáp án / khác    nghe rồi gõ đáp án (bỏ phần đáp án thì là chép chính tả)
//   K:  Đoạn văn có [từ] bị khuyết | từ nhiễu / từ nhiễu    kéo thả từ vào chỗ trống
//   T:  từ | phiên âm | nghĩa                     từ vựng (tự sinh câu từ→nghĩa, nghĩa→từ, nghe→nghĩa)
//   thêm  ~ lời giải thích   ở cuối dòng      # Tên bộ   dòng tiêu đề      // ghi chú   dòng bị bỏ qua      \|  để viết dấu |      \n  xuống dòng
import { shuffle } from './quiz.js';

const uniq = a => [...new Set(a)];

const ALIAS = {
  tn: 'mc', mc: 'mc', q: 'mc', d: 'fill', dien: 'fill', fill: 'fill', g: 'type', type: 'type', ds: 'tf', tf: 'tf', t: 'vocab', w: 'vocab', v: 'vocab',
  s: 'order', sx: 'order', sapxep: 'order', order: 'order',
  n: 'listen', nghe: 'listen', ng: 'listentype', ngg: 'listentype',
  k: 'cloze', kt: 'cloze', cloze: 'cloze', keo: 'cloze',
  nn: 'multi', nhieu: 'multi', multi: 'multi', cn: 'multi',
};
export const flat = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().trim();
const kindOf = k => ALIAS[flat(k)];

export function splitBy(s, sep) { // tách theo sep, bỏ qua \sep
  const out = []; let cur = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '\\' && s[i + 1] === sep) { cur += sep; i++; }
    else if (ch === sep || (sep === '|' && ch === '｜')) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out.map(x => x.trim());
}
const TRUE = ['dung', 'd', 'true', 't', 'yes', 'y', '1'], FALSE = ['sai', 's', 'false', 'f', 'no', 'n', '0'];
const nl = s => s.replace(/\\n/g, '\n');

// Phân tích một đoạn bài tập thành câu hỏi. Kết quả được nhớ theo nội dung (chỉ đọc, không ai sửa nó) nên vẽ lại danh sách
// hàng chục bộ bài tập không phải phân tích lại từng bộ mỗi lần bấm.
const parsedMemo = new Map();
export function parseSet(text) {
  let r = parsedMemo.get(text);
  if (!r) {
    r = parseSetRaw(text);
    parsedMemo.set(text, r);
    if (parsedMemo.size > 300) parsedMemo.delete(parsedMemo.keys().next().value);
  }
  return r;
}
function parseSetRaw(text) {
  const qs = [], vocab = [], errors = [];
  let title = '';
  text.split(/\r?\n/).forEach((raw, li) => {
    const line = raw.trim(), n = li + 1;
    if (!line || line.startsWith('//')) return;
    if (line.startsWith('#')) { if (!title) title = line.replace(/^#+\s*/, ''); return; }
    const m = line.match(/^([A-Za-zĐđ]{1,6})\s*[:：]\s*(.*)$/);
    if (!m) { errors.push({ line: n, msg: 'thiếu “LOẠI:” ở đầu dòng (TN:, DS:, G:, Đ:, S:, N:, NG:, K: hoặc T:)' }); return; }
    const kind = kindOf(m[1]);
    if (!kind) { errors.push({ line: n, msg: `không biết loại “${m[1]}” (dùng TN, DS, G, Đ, S, N, NG, K hoặc T)` }); return; }
    // lời giải thích: phần sau dấu ~ (đứng sau khoảng trắng hoặc dấu |)
    let rest = m[2], explain = '';
    const ex = rest.match(/(?:^|[\s|｜])~\s*(.*)$/);
    if (ex) { explain = nl(ex[1].trim()); rest = rest.slice(0, ex.index); }
    const f = splitBy(rest, '|').filter((x, k, a) => x || k < a.length - 1);
    const err = msg => errors.push({ line: n, msg });

    if (kind === 'vocab') {
      if (f.length < 2 || f.length > 3 || f.some(x => !x)) return err('từ vựng cần dạng “T: từ | nghĩa” hoặc “T: từ | phiên âm | nghĩa”');
      vocab.push({ word: f[0], pron: f.length === 3 ? f[1] : '', meaning: f[f.length - 1], line: n });
    } else if (kind === 'mc' || kind === 'listen') {
      const need = kind === 'mc' ? 'trắc nghiệm cần câu hỏi và ít nhất 2 đáp án: TN: câu hỏi | *đúng | sai' : 'nghe-chọn cần dạng: N: câu để đọc | *đúng | sai | sai';
      if (f.length < 3) return err(need);
      const options = f.slice(1).map(x => ({ t: x.replace(/^\*\s*/, ''), ok: x.startsWith('*') }));
      if (options.some(o => !o.t)) return err('có đáp án bị trống');
      if (options.filter(o => o.ok).length !== 1) return err('phải đánh dấu * đúng một đáp án đúng');
      qs.push(kind === 'mc' ? { kind: 'mc', prompt: nl(f[0]), options, explain, line: n } : { kind: 'mc', listen: f[0], label: 'Nghe và chọn đáp án đúng', options, explain, line: n });
    } else if (kind === 'multi') {
      if (f.length < 3) return err('chọn nhiều đáp án cần dạng: NN: câu hỏi | *đúng | *đúng | sai | sai');
      const options = f.slice(1).map(x => ({ t: x.replace(/^\*\s*/, ''), ok: x.startsWith('*') }));
      if (options.some(o => !o.t)) return err('có đáp án bị trống');
      const good = options.filter(o => o.ok).length;
      if (!good) return err('phải đánh dấu * ít nhất một đáp án đúng');
      if (good === options.length) return err('cần có ít nhất một đáp án sai (không đánh dấu *)');
      qs.push({ kind: 'multi', prompt: nl(f[0]), options, explain, line: n });
    } else if (kind === 'fill') {
      const sent = nl(f[0] || ''), parts = []; let last = 0, blanks = 0;
      for (const b of sent.matchAll(/\[([^\]]+)\]/g)) {
        parts.push(sent.slice(last, b.index));
        parts.push({ a: splitBy(b[1], '/').filter(Boolean) });
        last = b.index + b[0].length; blanks++;
      }
      parts.push(sent.slice(last));
      if (!blanks) return err('điền từ cần đặt đáp án trong [ ], ví dụ: Đ: Tôi [đi] học');
      qs.push({ kind: 'fill', parts, hint: f[1] || '', explain, line: n });
    } else if (kind === 'type') {
      if (f.length < 2 || !f[1]) return err('gõ đáp án cần dạng: G: câu hỏi | đáp án / đáp án khác');
      qs.push({ kind: 'type', prompt: nl(f[0]), answers: splitBy(f[1], '/').filter(Boolean), explain, line: n });
    } else if (kind === 'listentype') {
      if (!f[0]) return err('nghe-gõ cần dạng: NG: câu để đọc | đáp án / đáp án khác (bỏ phần đáp án nếu là chép chính tả)');
      qs.push({ kind: 'type', listen: f[0], label: f[1] ? 'Nghe rồi gõ đáp án' : 'Nghe rồi gõ lại câu', answers: f[1] ? splitBy(f[1], '/').filter(Boolean) : [f[0]], explain, line: n });
    } else if (kind === 'tf') {
      const v = flat(f[1] || '');
      if (!TRUE.includes(v) && !FALSE.includes(v)) return err('đúng/sai cần dạng: DS: nhận định | đúng (hoặc sai)');
      qs.push({ kind: 'tf', prompt: nl(f[0]), ans: TRUE.includes(v), explain, line: n });
    } else if (kind === 'order') {
      // các cách xếp đúng cách nhau bằng ;; ; từ đứng sau dấu + là từ gây nhiễu (không thuộc câu)
      const variants = (f[0] || '').split(/\s*;;\s*/).map(v => (v.includes('/') ? splitBy(v, '/') : v.trim().split(/\s+/)).filter(Boolean));
      const main = variants[0] || [];
      const decoys = main.filter(t => t.startsWith('+')).map(t => t.slice(1));
      const answers = variants.map(v => v.filter(t => !t.startsWith('+')));
      if (answers[0].length < 2) return err('sắp xếp câu cần ít nhất 2 từ: S: từ / từ / từ | gợi ý');
      qs.push({ kind: 'order', answers, decoys, hint: f[1] || '', explain, line: n });
    } else if (kind === 'cloze') {
      const text0 = nl(f[0] || ''), parts = []; let last = 0, blanks = 0;
      for (const b of text0.matchAll(/\[([^\]]+)\]/g)) {
        parts.push(text0.slice(last, b.index));
        parts.push({ a: splitBy(b[1], '/').filter(Boolean) });
        last = b.index + b[0].length; blanks++;
      }
      parts.push(text0.slice(last));
      if (!blanks) return err('điền khuyết kéo thả cần đặt từ đúng trong [ ], ví dụ: K: Tôi [đi] học bằng [xe đạp] | xe buýt / máy bay');
      qs.push({ kind: 'cloze', parts, decoys: splitBy(f[1] || '', '/').filter(Boolean), hint: f[2] || '', explain, line: n });
    }
  });
  if (vocab.length === 1) errors.push({ line: vocab[0].line, msg: 'cần ít nhất 2 từ vựng để tạo câu trắc nghiệm' });
  return { title, qs, vocab, errors };
}

function mcFrom(prompt, correct, pool, rnd, extra = {}) {
  const others = shuffle(pool.filter(x => x !== correct), rnd).slice(0, 3);
  return { kind: 'mc', prompt, options: shuffle([correct, ...others], rnd).map(t => ({ t, ok: t === correct })), ...extra };
}

// Ra đề: trộn đáp án / từ, sinh câu từ vựng. opts: { shuffle, listen, count }
export function build(parsed, opts, rnd) {
  const out = parsed.qs.map(q => {
    if (q.kind === 'mc' || q.kind === 'multi') return { ...q, options: shuffle(q.options, rnd) };
    if (q.kind === 'order') return { ...q, bank: shuffle([...q.answers[0], ...q.decoys].map((t, id) => ({ t, id })), rnd) };
    if (q.kind === 'cloze') {
      const words = q.parts.filter(p => typeof p !== 'string').map(p => p.a[0]);
      return { ...q, bank: shuffle([...words, ...q.decoys].map((t, id) => ({ t, id })), rnd) };
    }
    return { ...q };
  });
  const V = parsed.vocab;
  if (V.length >= 2) {
    const meanings = uniq(V.map(v => v.meaning)), words = uniq(V.map(v => v.word));
    for (const v of V) {
      const info = `${v.word}${v.pron ? ' (' + v.pron + ')' : ''} = ${v.meaning}`;
      const card = { front: v.word, back: [v.pron, v.meaning] };
      out.push(mcFrom(v.word, v.meaning, meanings, rnd, { label: 'Chọn nghĩa đúng của từ', explain: info, card, sayPrompt: true }));
      out.push(mcFrom(v.meaning, v.word, words, rnd, { label: 'Chọn từ đúng cho nghĩa', explain: info, card }));
      if (opts.listen) out.push(mcFrom('', v.meaning, meanings, rnd, { label: 'Nghe và chọn nghĩa đúng', listen: v.word, explain: info, card }));
    }
  }
  const res = opts.shuffle ? shuffle(out, rnd) : out;
  return opts.count > 0 ? res.slice(0, opts.count) : res;
}

// Đếm số câu theo loại để hiện trong danh sách
export function countKinds(parsed) {
  const c = {};
  parsed.qs.forEach(q => { const k = q.listen ? (q.kind === 'type' ? 'listentype' : 'listen') : q.kind; c[k] = (c[k] || 0) + 1; });
  if (parsed.vocab.length >= 2) c.vocab = parsed.vocab.length;
  return c;
}

// Bài kiểm tra từ nhiều bộ bài tập. mode: 'group' = giữ theo từng bộ (mỗi bộ một phần, count = số câu mỗi bộ, 0 = tất cả);
// 'random' = trộn mọi câu rồi lấy ngẫu nhiên count câu (0 = tất cả). Mỗi lần gọi ra một đề khác.
export function buildTest(sets, { mode = 'random', count = 0, listen = true } = {}, rnd) {
  const per = sets.map(s => ({ s, qs: build(parseSet(s.text || ''), { shuffle: false, listen, count: 0 }, rnd) })).filter(x => x.qs.length);
  if (mode === 'group') {
    return per.flatMap(({ s, qs }) => (count > 0 ? shuffle(qs, rnd).slice(0, count) : qs).map(q => ({ ...q, sec: s.title || 'Bộ bài tập' })));
  }
  const all = shuffle(per.flatMap(x => x.qs), rnd);
  return count > 0 ? all.slice(0, count) : all;
}

// Phân loại một câu đã dựng theo “dạng câu” (để thống kê điểm theo dạng và lọc trong Sổ lỗi)
export const KIND_LABEL = { mc: 'Trắc nghiệm', multi: 'Chọn nhiều đáp án', tf: 'Đúng/Sai', type: 'Tự luận', fill: 'Điền từ', order: 'Sắp xếp câu', listen: 'Nghe-chọn', listentype: 'Nghe-gõ', cloze: 'Kéo thả', vocab: 'Từ vựng' };
export const kindKey = q => (q.kind === 'mc' ? (q.listen ? 'listen' : q.card ? 'vocab' : 'mc') : q.kind === 'type' ? (q.listen ? 'listentype' : 'type') : q.kind);