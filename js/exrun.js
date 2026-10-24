// Chạy một lượt làm bài: trắc nghiệm, đúng/sai, gõ đáp án, điền từ, sắp xếp câu, kéo thả điền khuyết, nghe rồi chọn / gõ.
// Dùng cho “Bài tập của tôi” (sets.js): làm từng câu, có đáp án ngay. Bài làm một trang (kiểm tra, bài đọc) nằm ở exsheet.js.
import { $, $$, esc, toast, langInfo } from './util.js';
import * as tracker from './tracker.js';
import * as cards from './cards.js';
import { sayable, withSpeaker, say } from './tts.js';
import { rngOf, shuffle, norm } from './quiz.js';
import { zhText } from './prefs.js';
import { grabChip } from './dnd.js';
import * as mistakes from './mistakes.js';

// tiếng Trung: gõ phồn thể hay giản thể đều được
export const okAnswer = (typed, list, lang) => list.some(a => norm(zhText(a, lang)) === norm(zhText(typed, lang)));
export const same = (a, b, lang) => { const x = zhText(a, lang), y = zhText(b, lang); return norm(x) ? norm(x) === norm(y) : x === y; };
export const joiner = lang => (lang === 'zh' || lang === 'ja' ? '' : ' ');
export const blanksOf = q => q.parts.filter(p => typeof p !== 'string');
export const fullOf = (q, lang) => {
  if (q.kind === 'fill' || q.kind === 'cloze') return q.parts.map(p => (typeof p === 'string' ? p : p.a[0])).join('');
  if (q.kind === 'order') return q.answers[0].join(joiner(lang));
  return q.listen || '';
};

// Nội dung thẻ ôn cho một câu sai
export function cardOf(q, lang) {
  if (q.card) return q.card;
  const ex = q.explain ? [q.explain] : [];
  if (q.kind === 'mc') return { front: q.prompt || q.listen, back: [q.options.find(o => o.ok).t, ...ex] };
  if (q.kind === 'multi') return { front: q.prompt, back: [q.options.filter(o => o.ok).map(o => o.t).join(' / '), ...ex] };
  if (q.kind === 'tf') return { front: q.prompt, back: [q.ans ? 'Đúng' : 'Sai', ...ex] };
  if (q.kind === 'type') return { front: q.prompt || q.listen, back: [q.listen ? '' : q.answers.join(' / '), ...ex] };
  if (q.kind === 'fill' || q.kind === 'cloze') return { front: fullOf(q, lang), back: [q.hint, ...ex] };
  if (q.kind === 'order') return { front: fullOf(q, lang), back: [q.hint, ...ex] };
  return null;
}

function summaryText(q, lang) {
  if (q.kind === 'fill' || q.kind === 'cloze') return q.parts.map(p => (typeof p === 'string' ? p : `[${p.a[0]}]`)).join('');
  if (q.kind === 'order') return fullOf(q, lang);
  if (q.listen) return '🔊 ' + (q.kind === 'type' ? q.listen : q.options.find(o => o.ok).t);
  return q.prompt || q.options.find(o => o.ok).t;
}

export const reshuffle = q => {
  const rnd = rngOf('r' + Date.now() + Math.random());
  if (q.options) return { ...q, options: shuffle(q.options, rnd) };
  if (q.bank) return { ...q, bank: shuffle(q.bank, rnd) };
  return q;
};

let cur = null; // lượt đang chạy (để phím tắt biết)

// o: { qs, lang, title, onExit, exitLabel, onAgain, onDone({ok,total,pct}), extra:[{label, fn}] }
export function runQuiz(box0, o) {
  let box = box0;
  const L = o.lang || 'zh', bcp = langInfo(L).bcp, J = joiner(L);
  let S = null;
  const me = { get S() { return S; }, get box() { return box; } };
  const begin = qs => { S = { qs, i: 0, res: [], st: [], done: false }; cur = me; draw(); };
  const stOf = (q, i) => (S.st[i] ??= q.kind === 'multi' ? { picks: [] } : q.kind === 'order' ? { placed: [] } : { slots: blanksOf(q).map(() => null), focus: null });

  function promptOf(q) {
    if (q.kind === 'mc') {
      if (q.listen) return `<div class="qlabel">${esc(q.label)}</div>${listenRow()}`;
      return `<div class="qlabel">${esc(q.label || 'Chọn đáp án đúng')}</div><div class="qtext" lang="${bcp}">${q.sayPrompt || !q.label ? sayable(q.prompt, L) : esc(q.prompt)}</div>`;
    }
    if (q.kind === 'multi') return `<div class="qlabel">Chọn TẤT CẢ đáp án đúng (có ${q.options.filter(o => o.ok).length} đáp án đúng)</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>`;
    if (q.kind === 'tf') return `<div class="qlabel">Đúng hay sai?</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>`;
    if (q.kind === 'type') return q.listen ? `<div class="qlabel">${esc(q.label)}</div>${listenRow()}` : `<div class="qlabel">Gõ đáp án</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>`;
    return '';
  }
  const listenRow = () => '<div class="row c"><button class="btn primary big" id="msListenBtn">🔊 Nghe</button><button class="btn" id="msSlowBtn">🐢 Nghe chậm</button></div>';
  const chip = (b, cls, off) => `<button class="wchip ${cls}" data-b="${b.id}" ${off ? 'disabled' : ''}>${esc(b.t)}</button>`;

  function draw() {
    const { qs, i, res } = S;
    if (i >= qs.length) return summary();
    const q = qs[i], r = res[i], answered = r != null;
    let body = promptOf(q);
    if (q.kind === 'mc') {
      body += `<div class="qopts">${q.options.map((op, k) => `<button class="qopt ${answered ? (op.ok ? 'right' : r.sel === k ? 'wrong' : '') : ''}" data-o="${k}" ${answered ? 'disabled' : ''} lang="${bcp}"><i>${k + 1}</i><span>${withSpeaker(op.t, L)}</span></button>`).join('')}</div>`;
    } else if (q.kind === 'multi') {
      const st = stOf(q, i);
      body += `<div class="qopts">${q.options.map((op, k) => { const on = (answered ? r.picks : st.picks).includes(k); return `<button class="qopt ${answered ? (op.ok ? 'right' : on ? 'wrong' : '') : on ? 'sel' : ''}" data-m="${k}" ${answered ? 'disabled' : ''} lang="${bcp}"><i>${answered ? (op.ok ? '✓' : on ? '✗' : '') : on ? '✓' : k + 1}</i><span>${withSpeaker(op.t, L)}</span></button>`; }).join('')}</div>`;
      if (!answered) body += '<div class="row"><button class="btn primary" id="msSubmit">Kiểm tra</button></div>';
    } else if (q.kind === 'tf') {
      body += `<div class="qopts two"><button class="qopt ${answered ? (q.ans === true ? 'right' : r.sel === true ? 'wrong' : '') : ''}" data-tf="1" ${answered ? 'disabled' : ''}><i>1</i><span>Đúng</span></button>` +
        `<button class="qopt ${answered ? (q.ans === false ? 'right' : r.sel === false ? 'wrong' : '') : ''}" data-tf="0" ${answered ? 'disabled' : ''}><i>2</i><span>Sai</span></button></div>`;
    } else if (q.kind === 'type') {
      body += `<div class="row"><input id="msIn" type="text" lang="${bcp}" autocomplete="off" autocapitalize="off" spellcheck="false" ${answered ? `value="${esc(r.typed)}" disabled class="${r.ok ? 'okin' : 'badin'}"` : ''} placeholder="Gõ đáp án"><button class="btn primary" id="msSubmit" ${answered ? 'hidden' : ''}>Trả lời</button></div>`;
      if (answered && !r.ok) body += `<div class="dim">Đáp án: ${q.answers.map(a => sayable(a, L)).join(' / ')}</div>`;
    } else if (q.kind === 'fill') {
      let b = 0;
      body += `<div class="qlabel">Điền vào chỗ trống</div><div class="qtext fill" lang="${bcp}">${q.parts.map(p => {
        if (typeof p === 'string') return esc(p);
        const k = b++, w = Math.max(3, Math.max(...p.a.map(a => [...a].length)) + 1);
        return `<input class="fin ${answered ? (r.each[k] ? 'okin' : 'badin') : ''}" data-b="${k}" size="${w}" autocomplete="off" autocapitalize="off" spellcheck="false" ${answered ? `value="${esc(r.typed[k] || '')}" disabled` : ''}>`;
      }).join('')}</div>${q.hint ? `<div class="dim">Gợi ý: <span class="qhint">${esc(q.hint)}</span></div>` : ''}`;
      if (!answered) body += '<div class="row"><button class="btn primary" id="msSubmit">Trả lời</button></div>';
      else if (!r.ok) body += `<div class="dim">Đáp án: ${blanksOf(q).map(p => sayable(p.a[0], L) + (p.a.length > 1 ? ' <small>(hoặc ' + esc(p.a.slice(1).join(' / ')) + ')</small>' : '')).join(' · ')}</div>`;
    } else if (q.kind === 'order') {
      const st = stOf(q, i), used = new Set(st.placed), by = id => q.bank.find(b => b.id === id);
      body += `<div class="qlabel">Sắp xếp các từ thành câu có nghĩa</div>${q.hint ? `<div class="dim">Gợi ý: <span class="qhint">${esc(q.hint)}</span></div>` : ''}` +
        `<div class="ordzone ${answered ? (r.ok ? 'okz' : 'badz') : ''}" data-drop="zone" lang="${bcp}">${st.placed.length ? st.placed.map(id => chip(by(id), 'in', answered)).join('') : '<span class="dim ph">Bấm hoặc kéo các từ xuống đây</span>'}</div>` +
        `<div class="ordbank" data-drop="bank" lang="${bcp}">${q.bank.filter(b => !used.has(b.id)).map(b => chip(b, '', answered)).join('')}</div>`;
      if (!answered) body += '<div class="row"><button class="btn primary" id="msSubmit">Kiểm tra</button><button class="btn" id="exReset">↺ Xếp lại</button></div>';
      else if (!r.ok) body += `<div class="dim">Đáp án: ${esc(q.answers.map(a => a.join(J)).join('  /  '))}</div>`;
    } else if (q.kind === 'cloze') {
      const st = stOf(q, i), used = new Set(st.slots.filter(x => x != null)); let b = 0;
      body += `<div class="qlabel">Kéo các từ vào chỗ trống (hoặc bấm từ rồi bấm chỗ trống)</div><div class="qtext clz" lang="${bcp}">${q.parts.map(p => {
        if (typeof p === 'string') return esc(p);
        const k = b++, id = st.slots[k], w = id != null ? q.bank.find(x => x.id === id) : null;
        return `<span class="slot ${answered ? (r.each[k] ? 'okin' : 'badin') : st.focus === k ? 'foc' : ''}" data-slot="${k}">${w ? chip(w, 'in', answered) : '＿＿'}</span>`;
      }).join('')}</div>${q.hint ? `<div class="dim">Gợi ý: <span class="qhint">${esc(q.hint)}</span></div>` : ''}` +
        `<div class="ordbank" data-drop="bank" lang="${bcp}">${q.bank.filter(w => !used.has(w.id)).map(w => chip(w, '', answered)).join('')}</div>`;
      if (!answered) body += '<div class="row"><button class="btn primary" id="msSubmit">Kiểm tra</button><button class="btn" id="exReset">↺ Làm lại</button></div>';
      else if (!r.ok) body += `<div class="dim">Đáp án: ${blanksOf(q).map(p => sayable(p.a[0], L)).join(' · ')}</div>`;
    }
    let fb = '';
    if (answered) {
      const full = fullOf(q, L);
      fb = `<div class="qfb ${r.ok ? 'ok' : 'bad'}">${r.ok ? '✅ Đúng!' : '❌ Chưa đúng'}</div>` +
        (full ? `<div class="qexp" lang="${bcp}">${sayable(full, L)}</div>` : '') +
        (q.explain ? `<div class="qexp dim">${esc(q.explain)}</div>` : '') +
        `<div class="row"><button class="btn primary" id="msNext">${i + 1 >= qs.length ? 'Xem kết quả' : 'Tiếp ▶'}</button></div>`;
    }
    box.innerHTML = `<div class="row"><button class="btn" id="msQuit">← Thoát</button>${(o.side || []).map((x, k) => `<button class="btn" data-side="${k}">${esc(x.label)}</button>`).join('')}<span class="dim qtitle">${esc(o.title || '')}</span></div>
      <div class="qprog"><span>Câu ${i + 1}/${qs.length}</span><progress max="${qs.length}" value="${res.filter(Boolean).length}"></progress></div>
      <div class="qcard">${body}${fb}</div>`;

    $('#msQuit', box).onclick = () => { stop(); o.onExit?.(); };
    $$('[data-side]', box).forEach(b => b.onclick = () => { stop(); o.side[+b.dataset.side].fn(); });
    $$('[data-o]', box).forEach(b => b.onclick = () => finish(q.options[+b.dataset.o].ok, { sel: +b.dataset.o }));
    $$('[data-m]', box).forEach(b => b.onclick = () => { const st = stOf(q, i), k = +b.dataset.m; st.picks = st.picks.includes(k) ? st.picks.filter(x => x !== k) : [...st.picks, k]; draw(); });
    $$('[data-tf]', box).forEach(b => b.onclick = () => finish((b.dataset.tf === '1') === q.ans, { sel: b.dataset.tf === '1' }));
    $('#msSubmit', box)?.addEventListener('click', submit);
    const inputs = $$('#msIn, .fin', box);
    inputs.forEach((inp, k) => inp.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.isComposing) return;
      e.preventDefault();
      if (k < inputs.length - 1) inputs[k + 1].focus(); else submit();
    }));
    $('#msNext', box)?.addEventListener('click', () => { S.i++; draw(); });
    $('#msListenBtn', box)?.addEventListener('click', () => say(q.listen, bcp));
    $('#msSlowBtn', box)?.addEventListener('click', () => say(q.listen, bcp, 0.55));
    if (q.listen && !answered) setTimeout(() => { if (S.qs[S.i] === q && box.isConnected) say(q.listen, bcp); }, 250);
    if (!answered) inputs[0]?.focus();
    if (!answered && (q.kind === 'order' || q.kind === 'cloze')) wire(q);
  }

  // ---------- chạm / kéo thả cho sắp xếp câu và điền khuyết ----------
  function wire(q) {
    const st = stOf(q, S.i);
    $('#exReset', box)?.addEventListener('click', () => { S.st[S.i] = null; draw(); });
    $$('.slot', box).forEach(s => s.addEventListener('click', e => {
      if (e.target.closest('.wchip')) return;
      const k = +s.dataset.slot; st.focus = st.focus === k ? null : k; draw();
    }));
    $$('.wchip', box).forEach(c => {
      c.addEventListener('pointerdown', e => grab(e, c, q, st));
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); tap(q, st, +c.dataset.b, c); } });
    });
  }
  function grab(e, chip, q, st) {
    const id = +chip.dataset.b;
    grabChip(e, chip, () => tap(q, st, id, chip), (el, x) => drop(q, st, id, el, x));
  }
  function tap(q, st, id, chip) {
    const placed = !!chip.closest('.ordzone, .slot');
    if (q.kind === 'order') {
      if (placed) st.placed = st.placed.filter(x => x !== id); else st.placed.push(id);
    } else if (placed) {
      st.slots[st.slots.indexOf(id)] = null;
    } else {
      const k = st.focus != null && st.slots[st.focus] == null ? st.focus : st.slots.indexOf(null);
      if (k < 0) { toast('Hết chỗ trống: bấm một từ trong chỗ trống để gỡ ra'); return; }
      st.slots[k] = id; st.focus = null;
    }
    draw();
  }
  function drop(q, st, id, el, x) {
    if (q.kind === 'order') {
      const zone = el?.closest('.ordzone');
      if (zone) {
        st.placed = st.placed.filter(v => v !== id);
        const t = el.closest('.wchip');
        let at = st.placed.length;
        if (t && t.dataset.b != null) {
          const j = st.placed.indexOf(+t.dataset.b), r = t.getBoundingClientRect();
          if (j >= 0) at = x < r.left + r.width / 2 ? j : j + 1;
        }
        st.placed.splice(at, 0, id);
      } else if (el?.closest('.ordbank')) st.placed = st.placed.filter(v => v !== id);
    } else {
      const slot = el?.closest('.slot');
      if (slot) {
        const k = +slot.dataset.slot, from = st.slots.indexOf(id), prev = st.slots[k];
        st.slots[k] = id;
        if (from >= 0 && from !== k) st.slots[from] = prev ?? null;
      } else if (el?.closest('.ordbank')) {
        const from = st.slots.indexOf(id); if (from >= 0) st.slots[from] = null;
      }
    }
    draw();
  }

  function finish(ok, extra) {
    if (S.res[S.i] != null) return;
    S.res[S.i] = { ok, ...extra };
    tracker.quiz(ok);
    mistakes.record(S.qs[S.i], ok, L, o.title);
    draw();
  }
  function submit() {
    const q = S.qs[S.i];
    if (q.kind === 'multi') {
      const st = stOf(q, S.i);
      if (!st.picks.length) { toast('Hãy chọn ít nhất một đáp án'); return; }
      finish(q.options.every((o, k) => o.ok === st.picks.includes(k)), { picks: [...st.picks] });
    } else if (q.kind === 'type') {
      const v = $('#msIn', box).value;
      if (!v.trim()) { toast('Hãy gõ đáp án'); return; }
      finish(okAnswer(v, q.answers, L), { typed: v });
    } else if (q.kind === 'fill') {
      const typed = $$('.fin', box).map(x => x.value), blanks = blanksOf(q);
      if (typed.every(t => !t.trim())) { toast('Hãy điền vào chỗ trống'); return; }
      const each = blanks.map((p, k) => okAnswer(typed[k] || '', p.a, L));
      finish(each.every(Boolean), { typed, each });
    } else if (q.kind === 'order') {
      const st = stOf(q, S.i);
      if (st.placed.length < 2) { toast('Hãy xếp các từ thành câu'); return; }
      const words = st.placed.map(id => q.bank.find(b => b.id === id).t);
      finish(q.answers.some(a => a.length === words.length && a.every((w, k) => same(w, words[k], L))), {});
    } else if (q.kind === 'cloze') {
      const st = stOf(q, S.i);
      if (st.slots.some(x => x == null)) { toast('Hãy điền hết các chỗ trống'); return; }
      const each = blanksOf(q).map((p, k) => okAnswer(q.bank.find(b => b.id === st.slots[k]).t, p.a, L));
      finish(each.every(Boolean), { each });
    }
  }

  function summary() {
    const { qs, res } = S, ok = res.filter(r => r && r.ok).length, pct = Math.round(100 * ok / qs.length);
    const wrong = qs.filter((_, k) => !(res[k] && res[k].ok));
    if (!S.done) { S.done = true; o.onDone?.({ ok, total: qs.length, pct, qs, res }); }
    box.innerHTML = `<div class="qcard"><div class="score ${pct >= 80 ? 'ok' : pct >= 50 ? 'miss' : 'bad'}">${ok}/${qs.length} đúng · ${pct}%</div>
      <div class="qlist">${qs.map((q, k) => `<div class="${res[k]?.ok ? 'ok' : 'bad'}">${res[k]?.ok ? '✓' : '✗'} ${esc(summaryText(q, L))}</div>`).join('')}</div>
      <div class="dim">${wrong.length ? `${wrong.length} câu chưa đúng.` : '🎉 Hoàn hảo!'}</div>
      <div class="row"><button class="btn primary" id="msAgain">↻ Làm lại</button>${wrong.length ? '<button class="btn" id="msWrong">🔁 Làm lại câu sai</button><button class="btn" id="msToCards">📒 Câu sai → sổ thẻ</button>' : ''}${(o.extra || []).map((x, k) => `<button class="btn" data-x="${k}">${esc(x.label)}</button>`).join('')}<button class="btn" id="msList">${esc(o.exitLabel || 'Danh sách')}</button></div></div>`;
    $('#msAgain', box).onclick = () => (o.onAgain ? (stop(), o.onAgain()) : begin(o.qs.map(reshuffle)));
    $('#msWrong', box)?.addEventListener('click', () => begin(wrong.map(reshuffle)));
    $('#msToCards', box)?.addEventListener('click', () => {
      let n = 0;
      for (const q of wrong) {
        const c = cardOf(q, L); if (!c || !c.front) continue;
        cards.addManual({ lang: L, front: c.front, back: c.back.filter(Boolean) }); n++;
      }
      toast(`Đã thêm ${n} thẻ vào sổ ôn 📒`);
    });
    $$('[data-x]', box).forEach(b => b.onclick = () => { stop(); o.extra[+b.dataset.x].fn(); });
    $('#msList', box).onclick = () => { stop(); o.onExit?.(); };
  }

  const stop = () => { if (cur === me) cur = null; };
  begin(o.qs);
  // gắn lại vào khung mới (khi người dùng chuyển tab rồi quay lại) và vẽ lại câu đang làm
  return { stop, attach(b) { box = b; cur = me; draw(); } };
}

document.addEventListener('keydown', e => {
  if (!cur || !cur.box.isConnected || cur.box.offsetParent === null || e.target.matches('input,textarea,select')) return;
  const { S, box } = cur, q = S.qs[S.i];
  if (!q) return;
  if (e.key === 'Enter' && e.target.closest('button')) return; // để nút tự xử lý
  if (S.res[S.i] != null) { if (e.key === 'Enter') $('#msNext', box)?.click(); return; }
  if (/^[1-9]$/.test(e.key)) {
    if (q.kind === 'multi' && +e.key <= q.options.length) $$('[data-m]', box)[+e.key - 1]?.click();
    else if (q.kind === 'mc' && +e.key <= q.options.length) $$('[data-o]', box)[+e.key - 1]?.click();
    else if (q.kind === 'tf' && (e.key === '1' || e.key === '2')) $$('[data-tf]', box)[+e.key - 1]?.click();
  } else if (e.key === 'Enter' && (q.kind === 'order' || q.kind === 'cloze' || q.kind === 'multi')) $('#msSubmit', box)?.click();
});
