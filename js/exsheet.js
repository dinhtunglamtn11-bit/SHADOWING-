// Làm bài MỘT TRANG: mọi câu hỏi nằm trên cùng một trang, làm xong hết rồi bấm “Hoàn thành” để chấm điểm.
// Dùng cho bài kiểm tra (lessons.js) và phần câu hỏi dưới bài đọc của “Thế giới của tôi” (world.js).
import { $, $$, esc, toast, langInfo } from './util.js';
import * as tracker from './tracker.js';
import * as cards from './cards.js';
import { sayable, withSpeaker, say } from './tts.js';
import { okAnswer, same, joiner, blanksOf, fullOf, cardOf, reshuffle } from './exrun.js';
import { grabChip } from './dnd.js';

const initState = q => (q.kind === 'order' ? { placed: [] } : q.kind === 'cloze' ? { slots: blanksOf(q).map(() => null), focus: null }
  : q.kind === 'fill' ? { typed: blanksOf(q).map(() => '') } : q.kind === 'type' ? { typed: '' } : { sel: null });

// o: { qs (mỗi câu có thể có sec = tên phần), lang, title, intro, submitLabel, onDone({ok,total,pct}), onExit, exitLabel, onAgain, extra:[{label, fn}] }
export function runSheet(box, o) {
  const L = o.lang || 'zh', bcp = langInfo(L).bcp, J = joiner(L), qs = o.qs;
  const st = qs.map(initState);
  let res = null; // sau khi nộp: [{ ok, each }]
  const chip = (b, cls, off) => `<button class="wchip ${cls}" data-b="${b.id}" ${off ? 'disabled' : ''}>${esc(b.t)}</button>`;

  const answered = i => {
    const q = qs[i], s = st[i];
    if (q.kind === 'mc' || q.kind === 'tf') return s.sel != null;
    if (q.kind === 'type') return !!s.typed.trim();
    if (q.kind === 'fill') return s.typed.some(t => t.trim());
    if (q.kind === 'order') return s.placed.length > 0;
    return s.slots.some(x => x != null);
  };

  function blockHtml(i) {
    const q = qs[i], s = st[i], g = !!res, r = res?.[i], dis = g ? 'disabled' : '';
    const listenRow = `<div class="row"><button class="btn" data-say="${i}">🔊 Nghe</button><button class="btn" data-slow="${i}">🐢 Nghe chậm</button></div>`;
    let b = '';
    if (q.kind === 'mc') {
      b = `<div class="qlabel">${esc(q.label || 'Chọn đáp án đúng')}</div>${q.listen ? listenRow : `<div class="qtext" lang="${bcp}">${q.sayPrompt || !q.label ? sayable(q.prompt, L) : esc(q.prompt)}</div>`}` +
        `<div class="qopts">${q.options.map((op, k) => `<button class="qopt ${g ? (op.ok ? 'right' : s.sel === k ? 'wrong' : '') : s.sel === k ? 'sel' : ''}" data-o="${k}" ${dis} lang="${bcp}"><i>${String.fromCharCode(65 + k)}</i><span>${withSpeaker(op.t, L)}</span></button>`).join('')}</div>`;
    } else if (q.kind === 'tf') {
      const cls = v => (g ? (q.ans === v ? 'right' : s.sel === v ? 'wrong' : '') : s.sel === v ? 'sel' : '');
      b = `<div class="qlabel">Đúng hay sai?</div><div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>` +
        `<div class="qopts two"><button class="qopt ${cls(true)}" data-tf="1" ${dis}><i>A</i><span>Đúng</span></button><button class="qopt ${cls(false)}" data-tf="0" ${dis}><i>B</i><span>Sai</span></button></div>`;
    } else if (q.kind === 'type') {
      b = `<div class="qlabel">${esc(q.listen ? q.label : 'Gõ đáp án')}</div>${q.listen ? listenRow : `<div class="qtext" lang="${bcp}">${sayable(q.prompt, L)}</div>`}` +
        `<input class="sin ${g ? (r.ok ? 'okin' : 'badin') : ''}" type="text" lang="${bcp}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ đáp án" value="${esc(s.typed)}" ${dis}>` +
        (g && !r.ok ? `<div class="dim">Đáp án: ${q.answers.map(a => sayable(a, L)).join(' / ')}</div>` : '');
    } else if (q.kind === 'fill') {
      let n = 0;
      b = `<div class="qlabel">Điền vào chỗ trống</div><div class="qtext fill" lang="${bcp}">${q.parts.map(p => {
        if (typeof p === 'string') return esc(p);
        const k = n++, w = Math.max(3, Math.max(...p.a.map(a => [...a].length)) + 1);
        return `<input class="fin ${g ? (r.each[k] ? 'okin' : 'badin') : ''}" data-b="${k}" size="${w}" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(s.typed[k] || '')}" ${dis}>`;
      }).join('')}</div>${q.hint ? `<div class="dim">Gợi ý: <span class="qhint">${esc(q.hint)}</span></div>` : ''}` +
        (g && !r.ok ? `<div class="dim">Đáp án: ${blanksOf(q).map(p => sayable(p.a[0], L) + (p.a.length > 1 ? ' <small>(hoặc ' + esc(p.a.slice(1).join(' / ')) + ')</small>' : '')).join(' · ')}</div>` : '');
    } else if (q.kind === 'order') {
      const used = new Set(s.placed), by = id => q.bank.find(x => x.id === id);
      b = `<div class="qlabel">Sắp xếp các từ thành câu có nghĩa</div>${q.hint ? `<div class="dim">Gợi ý: <span class="qhint">${esc(q.hint)}</span></div>` : ''}` +
        `<div class="ordzone ${g ? (r.ok ? 'okz' : 'badz') : ''}" data-drop="zone" lang="${bcp}">${s.placed.length ? s.placed.map(id => chip(by(id), 'in', g)).join('') : '<span class="dim ph">Bấm hoặc kéo các từ xuống đây</span>'}</div>` +
        (g ? '' : `<div class="ordbank" data-drop="bank" lang="${bcp}">${q.bank.filter(x => !used.has(x.id)).map(x => chip(x, '', g)).join('')}</div><div class="row"><button class="btn exreset">↺ Xếp lại</button></div>`) +
        (g && !r.ok ? `<div class="dim">Đáp án: ${esc(q.answers.map(a => a.join(J)).join('  /  '))}</div>` : '');
    } else if (q.kind === 'cloze') {
      const used = new Set(s.slots.filter(x => x != null)); let n = 0;
      b = `<div class="qlabel">Kéo các từ vào chỗ trống (hoặc bấm từ rồi bấm chỗ trống)</div><div class="qtext clz" lang="${bcp}">${q.parts.map(p => {
        if (typeof p === 'string') return esc(p);
        const k = n++, id = s.slots[k], w = id != null ? q.bank.find(x => x.id === id) : null;
        return `<span class="slot ${g ? (r.each[k] ? 'okin' : 'badin') : s.focus === k ? 'foc' : ''}" data-slot="${k}">${w ? chip(w, 'in', g) : '＿＿'}</span>`;
      }).join('')}</div>${q.hint ? `<div class="dim">Gợi ý: <span class="qhint">${esc(q.hint)}</span></div>` : ''}` +
        (g ? '' : `<div class="ordbank" data-drop="bank" lang="${bcp}">${q.bank.filter(x => !used.has(x.id)).map(x => chip(x, '', g)).join('')}</div><div class="row"><button class="btn exreset">↺ Làm lại</button></div>`) +
        (g && !r.ok ? `<div class="dim">Đáp án: ${blanksOf(q).map(p => sayable(p.a[0], L)).join(' · ')}</div>` : '');
    }
    let fb = '';
    if (g) {
      const full = fullOf(q, L);
      fb = `<div class="qfb ${r.ok ? 'ok' : 'bad'}">${r.ok ? '✅ Đúng rồi' : '❌ Chưa đúng'}</div>` + (full ? `<div class="qexp" lang="${bcp}">${sayable(full, L)}</div>` : '') + (q.explain ? `<div class="qexp dim">${esc(q.explain)}</div>` : '');
    }
    return `<section class="sq ${g ? (r.ok ? 'ok' : 'bad') : ''}" data-i="${i}"><div class="sqn">${i + 1}</div><div class="sqb">${b}${fb}</div></section>`;
  }

  const listHtml = () => qs.map((q, i) => (q.sec && q.sec !== qs[i - 1]?.sec ? `<h4 class="sqsec gt">${esc(q.sec)}</h4>` : '') + blockHtml(i)).join('');
  const el = i => box.querySelector(`.sq[data-i="${i}"]`);

  function draw() {
    box.innerHTML = `<div class="sheet">${o.title ? `<h3 class="shtitle gt">${esc(o.title)}</h3>` : ''}${o.intro || ''}<div id="shTop"></div><div class="shlist">${listHtml()}</div>
      <div class="shbar"><span class="dim" id="shCount"></span><progress id="shProg" max="${qs.length}" value="0"></progress>${res ? '' : `<button class="btn primary big" id="shSubmit">✅ ${esc(o.submitLabel || 'Hoàn thành')}</button>`}</div></div>`;
    qs.forEach((_, i) => wire(i));
    $('#shSubmit', box)?.addEventListener('click', submit);
    count();
  }
  function redo(i) { const n = el(i); n.outerHTML = blockHtml(i); wire(i); count(); }
  function count() {
    const a = qs.filter((_, i) => answered(i)).length;
    const c = $('#shCount', box), p = $('#shProg', box);
    if (c) c.textContent = res ? `${res.filter(r => r.ok).length}/${qs.length} đúng` : `Đã trả lời ${a}/${qs.length}`;
    if (p) p.value = res ? res.filter(r => r.ok).length : a;
  }

  function wire(i) {
    const q = qs[i], s = st[i], n = el(i);
    if (!n || res) { if (n) wireSay(n, i); return; }
    $$('[data-o]', n).forEach(b => b.onclick = () => { s.sel = +b.dataset.o; redo(i); });
    $$('[data-tf]', n).forEach(b => b.onclick = () => { s.sel = b.dataset.tf === '1'; redo(i); });
    $('.sin', n)?.addEventListener('input', e => { s.typed = e.target.value; count(); });
    $$('.fin', n).forEach(inp => inp.addEventListener('input', e => { s.typed[+inp.dataset.b] = e.target.value; count(); }));
    $('.exreset', n)?.addEventListener('click', () => { st[i] = initState(q); redo(i); });
    $$('.slot', n).forEach(sl => sl.addEventListener('click', e => { if (e.target.closest('.wchip')) return; const k = +sl.dataset.slot; s.focus = s.focus === k ? null : k; redo(i); }));
    $$('.wchip', n).forEach(c => {
      const id = +c.dataset.b;
      c.addEventListener('pointerdown', e => grabChip(e, c, () => tap(i, id, c), (target, x) => drop(i, id, target, x)));
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(i, id, c); } });
    });
    wireSay(n, i);
  }
  function wireSay(n, i) {
    $('[data-say]', n)?.addEventListener('click', () => say(qs[i].listen, bcp));
    $('[data-slow]', n)?.addEventListener('click', () => say(qs[i].listen, bcp, 0.55));
  }

  function tap(i, id, c) {
    const q = qs[i], s = st[i], placed = !!c.closest('.ordzone, .slot');
    if (q.kind === 'order') { if (placed) s.placed = s.placed.filter(x => x !== id); else s.placed.push(id); }
    else if (placed) s.slots[s.slots.indexOf(id)] = null;
    else {
      const k = s.focus != null && s.slots[s.focus] == null ? s.focus : s.slots.indexOf(null);
      if (k < 0) { toast('Hết chỗ trống: bấm một từ trong chỗ trống để gỡ ra'); return; }
      s.slots[k] = id; s.focus = null;
    }
    redo(i);
  }
  function drop(i, id, target, x) {
    const q = qs[i], s = st[i];
    if (q.kind === 'order') {
      if (target?.closest('.ordzone')) {
        s.placed = s.placed.filter(v => v !== id);
        const t = target.closest('.wchip');
        let at = s.placed.length;
        if (t && t.dataset.b != null) { const j = s.placed.indexOf(+t.dataset.b), r = t.getBoundingClientRect(); if (j >= 0) at = x < r.left + r.width / 2 ? j : j + 1; }
        s.placed.splice(at, 0, id);
      } else if (target?.closest('.ordbank')) s.placed = s.placed.filter(v => v !== id);
    } else {
      const slot = target?.closest('.slot');
      if (slot) {
        const k = +slot.dataset.slot, from = s.slots.indexOf(id), prev = s.slots[k];
        s.slots[k] = id;
        if (from >= 0 && from !== k) s.slots[from] = prev ?? null;
      } else if (target?.closest('.ordbank')) { const from = s.slots.indexOf(id); if (from >= 0) s.slots[from] = null; }
    }
    redo(i);
  }

  function grade(i) {
    const q = qs[i], s = st[i];
    if (q.kind === 'mc') return { ok: !!q.options[s.sel]?.ok };
    if (q.kind === 'tf') return { ok: s.sel === q.ans };
    if (q.kind === 'type') return { ok: !!s.typed.trim() && okAnswer(s.typed, q.answers, L) };
    if (q.kind === 'fill') { const each = blanksOf(q).map((p, k) => !!(s.typed[k] || '').trim() && okAnswer(s.typed[k], p.a, L)); return { ok: each.every(Boolean), each }; }
    if (q.kind === 'order') { const words = s.placed.map(id => q.bank.find(b => b.id === id).t); return { ok: q.answers.some(a => a.length === words.length && a.every((w, k) => same(w, words[k], L))) }; }
    const each = blanksOf(q).map((p, k) => s.slots[k] != null && okAnswer(q.bank.find(b => b.id === s.slots[k]).t, p.a, L));
    return { ok: each.every(Boolean), each };
  }

  function submit() {
    if (res) return;
    const blank = qs.filter((_, i) => !answered(i)).length;
    if (blank && !confirm(`Còn ${blank} câu chưa trả lời. Vẫn nộp bài?`)) return;
    res = qs.map((_, i) => grade(i));
    res.forEach(r => tracker.quiz(r.ok));
    const ok = res.filter(r => r.ok).length, pct = Math.round(100 * ok / qs.length), wrong = qs.filter((_, i) => !res[i].ok);
    draw();
    $('#shTop', box).innerHTML = `<div class="qcard sheetscore"><div class="score ${pct >= 80 ? 'ok' : pct >= 50 ? 'miss' : 'bad'}">${ok}/${qs.length} đúng · ${pct}%</div>
      <div class="dim">${wrong.length ? `${wrong.length} câu chưa đúng: xem đáp án và giải thích ngay bên dưới từng câu.` : '🎉 Hoàn hảo!'}</div>
      <div class="row"><button class="btn primary" id="shAgain">↻ Làm lại</button>${wrong.length ? '<button class="btn" id="shWrong">🔁 Làm lại câu sai</button><button class="btn" id="shCards">📒 Câu sai → sổ thẻ</button>' : ''}${(o.extra || []).map((x, k) => `<button class="btn" data-x="${k}">${esc(x.label)}</button>`).join('')}${o.onExit ? `<button class="btn" id="shExit">${esc(o.exitLabel || 'Thoát')}</button>` : ''}</div></div>`;
    $('#shAgain', box).onclick = () => (o.onAgain ? o.onAgain() : runSheet(box, { ...o, qs: qs.map(reshuffle) }));
    $('#shWrong', box)?.addEventListener('click', () => runSheet(box, { ...o, qs: wrong.map(reshuffle), onDone: null, title: (o.title ? o.title + ' · ' : '') + 'câu sai' }));
    $('#shCards', box)?.addEventListener('click', () => {
      let n = 0;
      for (const q of wrong) { const c = cardOf(q, L); if (!c || !c.front) continue; cards.addManual({ lang: L, front: c.front, back: c.back.filter(Boolean) }); n++; }
      toast(`Đã thêm ${n} thẻ vào sổ ôn 📒`);
    });
    $$('[data-x]', box).forEach(b => b.onclick = () => o.extra[+b.dataset.x].fn());
    $('#shExit', box)?.addEventListener('click', () => o.onExit());
    $('#shTop', box).scrollIntoView({ block: 'start', behavior: 'smooth' });
    o.onDone?.({ ok, total: qs.length, pct, wrong });
  }

  draw();
  return { stop() {} };
}
