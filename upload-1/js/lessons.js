// Bài học: thư mục lồng nhau (ví dụ HSK1 › HSK bài 1), mỗi thư mục chứa bài học (ghi chú / tài liệu), video, bài tập và bài kiểm tra.
// Bài kiểm tra gom câu hỏi từ các bộ bài tập trong thư mục, theo nhóm hoặc ngẫu nhiên, và hiện tất cả trên MỘT trang để làm rồi nộp bài.
import { $, $$, esc, toast, uid, bus, getLang, langInfo } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as tree from './tree.js';
import * as notes from './notes.js';
import { pickAndAdd, openItem } from './player.js';
import { rngOf } from './quiz.js';
import { parseSet, buildTest } from './exparse.js';
import { runSheet, timeHtml, wireTime, readTime } from './exsheet.js';
import { pix } from './pixicons.js';

let box = null, H = {}, cur = '', view = 'browse', editTest = null, runner = null;
const L = () => getLang();
const iconOf = i => (i.type === 'video' ? 'clapper' : i.type === 'note' ? 'a_book' : 'note');

export function render(el, hooks) {
  box = el; H = hooks || H;
  const f = cur && store.get('folders', cur);
  if (cur && (!f || f.deleted)) cur = '';
  if (view === 'testrun' && runner) return;
  if (view === 'testedit') return drawTestEditor();
  view = 'browse'; drawBrowse();
}
export const reset = () => { cur = ''; view = 'browse'; runner = null; };

const statLine = s => [s.folders && `${s.folders} thư mục`, s.video && `${s.video} video`, (s.note + s.doc) && `${s.note + s.doc} bài học / tài liệu`, s.sets && `${s.sets} bài tập`, s.tests && `${s.tests} bài kiểm tra`].filter(Boolean).join(' · ') || 'Chưa có nội dung';

// ---------- tiến độ: video đã xem (từ 85%) hoặc bài học đã đánh dấu, bài tập đã làm ít nhất một lần, bài kiểm tra đạt từ 80% ----------
const nat = (a, b) => (a.title || '').localeCompare(b.title || '', undefined, { numeric: true });
const doneItem = i => !!i.done || (i.type === 'video' && i.duration > 0 && (i.position || 0) / i.duration >= 0.85);
const doneSet = s => (s.tries || 0) > 0;
const doneTest = t => (t.best ?? -1) >= 80;
const KIND_ICON = { video: '🎬', note: '📝', pdf: '📄', text: '📄', set: '🧩', test: '📋' };

// các việc trực tiếp trong một thư mục, theo thứ tự: bài học / video, bài tập, bài kiểm tra
function todosOf(fid, l) {
  const items = store.list('items').filter(i => (i.lang || 'zh') === l && i.folder === fid).sort(nat);
  const sets = store.list('sets').filter(s => (s.lang || 'zh') === l && s.folder === fid).sort(nat);
  const tests = store.list('tests').filter(t => (t.lang || 'zh') === l && t.folder === fid).sort(nat);
  return [
    ...items.map(x => ({ kind: 'item', type: x.type, id: x.id, title: x.title || 'Không tên', done: doneItem(x) })),
    ...sets.map(x => ({ kind: 'set', type: 'set', id: x.id, title: x.title || 'Bộ bài tập', done: doneSet(x) })),
    ...tests.map(x => ({ kind: 'test', type: 'test', id: x.id, title: x.title || 'Bài kiểm tra', done: doneTest(x) })),
  ];
}
function progressOf(fid, l) {
  const ids = fid ? tree.subtreeIds(fid, l) : tree.flatTree(l).map(f => f.id);
  let done = 0, total = 0;
  for (const id of ids) for (const t of todosOf(id, l)) { total++; if (t.done) done++; }
  return { done, total, pct: total ? Math.round(100 * done / total) : 0 };
}
// việc đầu tiên chưa xong trong cây, bắt đầu từ thư mục fid (rồi tới các thư mục con theo thứ tự)
function findNext(fid, l, depth = 0) {
  if (fid) { const todo = todosOf(fid, l).find(t => !t.done); if (todo) return { folder: fid, todo }; }
  if (depth > 20) return null;
  for (const c of tree.childrenOf(fid, l)) { const r = findNext(c.id, l, depth + 1); if (r) return r; }
  return null;
}
const pbar = pr => (pr.total ? `<div class="pbar"><div class="prog"><i style="width:${pr.pct}%"></i></div><small>${pr.done}/${pr.total} · ${pr.pct}%</small></div>` : '');

function crumbs() {
  const l = L(), names = [];
  let id = cur;
  const m = new Map(tree.allFolders(l).map(f => [f.id, f]));
  for (let g = 0; id && m.has(id) && g < 30; g++) { names.unshift({ id, name: m.get(id).name }); id = m.get(id).parent || ''; }
  return `<div class="crumbs"><button class="chip ${cur ? '' : 'on'}" data-go="">🎓 Bài học</button>${names.map((n, i) => `<span class="dim">›</span><button class="chip ${i === names.length - 1 ? 'on' : ''}" data-go="${n.id}"><span class="gt">${esc(n.name)}</span></button>`).join('')}</div>`;
}

function nextBar(l) {
  const nx = findNext(cur, l), pr = progressOf(cur, l);
  if (nx) {
    const t = nx.todo, where = nx.folder !== cur ? ` <span class="dim">·</span> <span class="dim gt">${esc(tree.pathLabel(nx.folder, l))}</span>` : '';
    return `<div class="row nextbar"><button class="btn primary big" id="lsNext">▶ ${cur ? 'Bài tiếp theo' : 'Học tiếp'}</button><span class="dim">Tiếp theo:</span> <span>${KIND_ICON[t.type] || '📄'} <b class="gt">${esc(t.title)}</b></span>${where}</div>`;
  }
  return pr.total ? `<div class="allDone">${cur ? '🎉 Đã hoàn thành thư mục này!' : '🏆 Đã hoàn thành tất cả bài học!'}</div>` : '';
}

function drawBrowse() {
  const l = L(), subs = tree.childrenOf(cur, l), here = cur ? store.get('folders', cur) : null;
  const items = cur ? store.list('items').filter(i => (i.lang || 'zh') === l && i.folder === cur).sort(nat) : [];
  const sets = cur ? store.list('sets').filter(s => (s.lang || 'zh') === l && s.folder === cur).sort(nat) : [];
  const tests = cur ? store.list('tests').filter(t => (t.lang || 'zh') === l && t.folder === cur).sort(nat) : [];
  const folderCard = f => {
    const st = tree.statsOf(f.id, l), pr = progressOf(f.id, l), hasKids = st.folders > 0;
    return `<div class="lf ${pr.total && pr.done === pr.total ? 'full' : ''}" data-lf="${f.id}" tabindex="0"><div class="lfart">${pix(hasKids ? 'a_books' : 'a_book')}</div><div class="lfb"><b class="gt">${esc(f.name)}</b><span class="dim">${esc(statLine(st))}</span>${pbar(pr)}</div></div>`;
  };
  const row = (art, id, title, meta, btns, done, extra = '') => `<div class="lrow ${done ? 'done' : ''}"><span class="lart">${pix(art)}</span><div class="ci" data-open="${id}"><b class="gt">${esc(title)}</b><span class="dim">${done ? '✓ ' : ''}${esc(meta)}</span></div><span class="lbtns">${extra}${btns}</span></div>`;
  const rootPr = progressOf('', l);
  box.innerHTML = `${crumbs()}
    <div class="row">${cur ? `<button class="btn primary" id="lsNewSub">＋ Tạo thư mục con</button><button class="btn" id="lsRen">✎ Đổi tên</button><button class="btn" id="lsDel">🗑 Xóa thư mục</button>` : '<button class="btn primary" id="lsNewSub">＋ Mục lớn mới (ví dụ HSK1)</button>'}</div>
    ${!cur && !subs.length ? `<div class="empty"><div class="emptyart">${pix('a_books')}</div>Chưa có mục bài học nào.<br>Tạo một mục lớn (ví dụ <b>HSK1</b>), bên trong tạo các thư mục nhỏ (<b>HSK bài 1</b>, <b>HSK bài 2</b>…), rồi thêm bài học, video, bài tập và bài kiểm tra vào từng thư mục nhỏ.</div>` : ''}
    ${!cur && subs.length ? `<div class="dim" style="margin:4px 2px">Tiến độ toàn bộ:</div>${pbar(rootPr)}` : ''}
    ${cur || subs.length ? nextBar(l) : ''}
    ${subs.length ? `<div class="nw-sec">${cur ? 'Thư mục con' : 'Các mục lớn'}</div><div class="lfs">${subs.map(folderCard).join('')}</div>` : ''}
    ${cur ? `<div class="nw-sec gt">${pix('a_folder')} ${esc(here?.name || '')}</div>
      <div class="dim">${esc(statLine(tree.statsOf(cur, l)))}</div>${pbar(progressOf(cur, l))}
      <div class="row addbar"><span class="dim">Thêm vào thư mục này:</span><button class="btn" id="lsVideo">🎬 Video</button><button class="btn" id="lsLink">🔗 Link video</button><button class="btn" id="lsDoc">📄 Tài liệu</button><button class="btn" id="lsNote">📝 Bài học mới (ghi chú)</button><button class="btn" id="lsSet">🧩 Bài tập mới</button><button class="btn" id="lsTest">📋 Bài kiểm tra mới</button></div>
      ${items.length ? `<div class="nw-sec">Bài học và video</div>${items.map(i => row(iconOf(i), i.id, i.title || 'Không tên', i.type === 'video' ? `${i.cueCount || 0} câu phụ đề` : i.type === 'note' ? ((i.body || '').replace(/\s+/g, ' ').trim().slice(0, 50) || 'Ghi chú trống') : i.type === 'pdf' ? 'PDF' : 'Văn bản', `<button class="btn more" data-itedit="${i.id}" title="Sửa">⋯</button>`, doneItem(i), `<button class="btn tg ${doneItem(i) ? 'on' : ''}" data-tgi="${i.id}" title="Đánh dấu đã học xong / chưa">${doneItem(i) ? '☑' : '☐'}</button>`)).join('')}` : ''}
      ${sets.length ? `<div class="nw-sec">Bài tập</div>${sets.map(s => row('a_exercise', s.id, s.title || 'Bộ bài tập', `${parseSet(s.text || '').qs.length + parseSet(s.text || '').vocab.length} câu hỏi${s.tries ? ' · đã làm ' + s.tries + ' lần · cao nhất ' + s.best + '%' : ''}`, `<button class="btn primary" data-srun="${s.id}">▶ Làm</button><button class="btn" data-sedit="${s.id}">✎</button><button class="btn" data-sdel="${s.id}">🗑</button>`, doneSet(s))).join('')}` : ''}
      ${tests.length ? `<div class="nw-sec">Bài kiểm tra</div>${tests.map(t => row('a_test', t.id, t.title || 'Bài kiểm tra', `${t.mode === 'group' ? 'theo nhóm' : 'ngẫu nhiên'}${t.count ? ' · ' + t.count + ' câu hỏi' : ' · tất cả câu hỏi'}${t.time ? ' · ⏱ ' + t.time + ' phút' : ''}${t.best != null ? ' · cao nhất ' + t.best + '%' : ''}${t.tries ? ' · đã làm ' + t.tries + ' lần' : ''}`, `<button class="btn primary" data-trun="${t.id}">▶ Làm bài</button><button class="btn" data-tedit="${t.id}">✎</button><button class="btn" data-tdel="${t.id}">🗑</button>`, doneTest(t))).join('')}` : ''}` : ''}`;
  bindBrowse();
}

// mở một việc trong danh sách “tiếp theo”
function openTodo(nx) {
  const t = nx.todo, l = L();
  cur = nx.folder;
  if (t.kind === 'item') {
    const it = store.get('items', t.id); if (!it) return;
    if (it.type === 'video') openItem(t.id);
    else { if (!it.done) store.put('items', t.id, { done: true }); if (it.type === 'note') notes.openNote(t.id); else H.openDoc?.(t.id); }
  } else if (t.kind === 'set') openSets({ run: [t.id], title: t.title });
  else runTest(t.id);
}
function bindBrowse() {
  const l = L();
  $$('[data-go]', box).forEach(b => b.onclick = () => { cur = b.dataset.go; drawBrowse(); scrollTo(0, 0); });
  $$('[data-lf]', box).forEach(c => {
    c.onclick = () => { cur = c.dataset.lf; drawBrowse(); scrollTo(0, 0); };
    c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); } };
  });
  $('#lsNewSub', box)?.addEventListener('click', () => {
    const name = (prompt(cur ? 'Tên thư mục con (ví dụ: HSK bài 1):' : 'Tên mục lớn (ví dụ: HSK1, Tiếng Trung giao tiếp):') || '').trim();
    if (!name) return;
    const id = uid(); store.put('folders', id, { name, lang: l, parent: cur, created: Date.now() });
    cur = id; drawBrowse(); scrollTo(0, 0);
  });
  $('#lsRen', box)?.addEventListener('click', () => {
    const f = store.get('folders', cur), name = (prompt('Tên mới:', f?.name) || '').trim();
    if (name) { store.put('folders', cur, { name }); drawBrowse(); }
  });
  $('#lsDel', box)?.addEventListener('click', () => {
    const f = store.get('folders', cur), st = tree.statsOf(cur, l);
    const tail = 'Video, tài liệu, ghi chú và bài tập bên trong không bị xóa, chỉ chuyển về “Chưa phân mục”.';
    if (!confirm(st.folders ? `Xóa thư mục “${f?.name}” và ${st.folders} thư mục con? ${tail}` : `Xóa thư mục “${f?.name}”? ${tail}`)) return;
    const up = f?.parent || '';
    tree.removeFolder(cur, l, true); cur = up; drawBrowse();
  });
  $('#lsVideo', box)?.addEventListener('click', () => pickAndAdd(cur).then(drawBrowse));
  $('#lsLink', box)?.addEventListener('click', () => H.addLink?.(cur));
  $('#lsDoc', box)?.addEventListener('click', () => H.addDocs?.(cur).then(drawBrowse));
  $('#lsNote', box)?.addEventListener('click', () => notes.newNote(cur));
  $('#lsSet', box)?.addEventListener('click', () => openSets({ newIn: cur }));
  $('#lsTest', box)?.addEventListener('click', () => { editTest = { folder: cur }; view = 'testedit'; drawTestEditor(); });
  $$('[data-open]', box).forEach(c => c.onclick = () => {
    const id = c.dataset.open, it = store.get('items', id); if (!it) return;
    if (it.type === 'video') { openItem(id); return; }
    if (!it.done) store.put('items', id, { done: true }); // mở bài học / tài liệu từ thư mục = đã học
    if (it.type === 'note') notes.openNote(id); else H.openDoc?.(id);
  });
  $$('[data-tgi]', box).forEach(b => b.onclick = () => { const id = b.dataset.tgi, it = store.get('items', id); if (it) store.put('items', id, { done: !it.done }); });
  $('#lsNext', box)?.addEventListener('click', () => { const nx = findNext(cur, l); if (nx) openTodo(nx); });
  $$('[data-itedit]', box).forEach(b => b.onclick = () => H.openEdit?.(b.dataset.itedit));
  $$('[data-srun]', box).forEach(b => b.onclick = () => openSets({ run: [b.dataset.srun], title: store.get('sets', b.dataset.srun)?.title }));
  $$('[data-sedit]', box).forEach(b => b.onclick = () => openSets({ edit: b.dataset.sedit }));
  $$('[data-sdel]', box).forEach(b => b.onclick = () => { if (confirm('Xóa bộ bài tập này?')) { store.del('sets', b.dataset.sdel); drawBrowse(); } });
  $$('[data-trun]', box).forEach(b => b.onclick = () => runTest(b.dataset.trun));
  $$('[data-tedit]', box).forEach(b => b.onclick = () => { editTest = { id: b.dataset.tedit }; view = 'testedit'; drawTestEditor(); });
  $$('[data-tdel]', box).forEach(b => b.onclick = () => { if (confirm('Xóa bài kiểm tra này?')) { store.del('tests', b.dataset.tdel); drawBrowse(); } });
}

// Mở màn “Bài tập của tôi” (bên Ôn tập) để soạn / làm bộ bài tập; xong có thể quay về thư mục này
function openSets(detail) {
  bus.emit('nav', 'review');
  document.dispatchEvent(new CustomEvent('sets-open', { detail: { ...detail, back: () => bus.emit('nav', 'library') } }));
}

// ---------- soạn bài kiểm tra ----------
function setsInTree(folder) {
  const l = L(), ids = new Set(tree.subtreeIds(folder, l));
  return store.list('sets').filter(s => (s.lang || 'zh') === l && ids.has(s.folder));
}
function drawTestEditor() {
  const t = editTest?.id ? store.get('tests', editTest.id) : null, folder = t?.folder ?? editTest?.folder ?? cur, l = L();
  const avail = setsInTree(folder), chosen = new Set(t?.setIds?.length ? t.setIds : avail.map(s => s.id));
  const nOf = s => { const p = parseSet(s.text || ''); return p.qs.length + p.vocab.length; };
  box.innerHTML = `<div class="row"><button class="btn" id="teBack">← Quay lại</button><b>📋 ${t ? 'Sửa bài kiểm tra' : 'Tạo bài kiểm tra'}</b><span class="dim gt">${esc(tree.pathLabel(folder, l))}</span></div>
    <div class="qcard">
      <label class="dim">Tên bài kiểm tra<input id="teTitle" type="text" value="${esc(t?.title || '')}" placeholder="Ví dụ: Kiểm tra HSK bài 1"></label>
      <div class="dim">Cách ra đề</div>
      <div class="seg" id="teMode"><button data-m="group" class="${t?.mode === 'group' ? 'on' : ''}">🧱 Theo nhóm</button><button data-m="random" class="${t?.mode === 'group' ? '' : 'on'}">🎲 Ngẫu nhiên</button></div>
      <div class="dim" id="teHint"></div>
      <label class="dim"><span id="teCountLbl">Số câu</span> <select id="teCount"><option value="0">Tất cả</option>${[5, 10, 15, 20, 30, 50].map(n => `<option value="${n}">${n}</option>`).join('')}</select></label>
      <label class="dim"><input type="checkbox" id="teListen" ${t?.listen === false ? '' : 'checked'}> Có câu nghe (máy đọc)</label>
      ${timeHtml('teTime', t?.time || 0)}
      <div class="dim">Lấy câu hỏi từ các bộ bài tập (trong thư mục này và các thư mục con):</div>
      ${avail.length ? `<div class="tesets">${avail.map(s => `<label class="pk"><input type="checkbox" data-sid="${s.id}" ${chosen.has(s.id) ? 'checked' : ''}> <span class="gt">${esc(s.title || 'Bộ bài tập')}</span> <small class="dim">${nOf(s)} câu · ${esc(tree.pathLabel(s.folder, l))}</small></label>`).join('')}</div>`
        : '<div class="empty">Chưa có bộ bài tập nào trong thư mục này. Hãy tạo bài tập trước (nút “Bài tập mới”), rồi quay lại tạo bài kiểm tra.</div>'}
      <div class="row"><button class="btn primary" id="teSave">💾 Lưu</button><button class="btn" id="teTry">▶ Lưu và làm thử</button><button class="btn" id="teCancel">Hủy</button></div>
    </div>`;
  $('#teCount', box).value = String(t?.count || 0);
  let mode = t?.mode === 'group' ? 'group' : 'random';
  const hint = () => {
    $('#teHint', box).textContent = mode === 'group' ? 'Giữ các câu theo từng bộ bài tập: mỗi bộ là một phần riêng trên trang. Số câu bên dưới là số câu lấy ngẫu nhiên từ MỖI bộ (“Tất cả” = lấy hết).' : 'Trộn câu của mọi bộ đã chọn rồi lấy ngẫu nhiên. Mỗi lần làm là một đề khác nhau.';
    $('#teCountLbl', box).textContent = mode === 'group' ? 'Số câu mỗi bộ' : 'Số câu của bài';
  };
  hint(); wireTime(box, 'teTime');
  $$('#teMode button', box).forEach(b => b.onclick = () => { mode = b.dataset.m; $$('#teMode button', box).forEach(x => x.classList.toggle('on', x === b)); hint(); });
  const save = () => {
    const ids = $$('[data-sid]', box).filter(c => c.checked).map(c => c.dataset.sid);
    if (!ids.length) { toast('Hãy chọn ít nhất một bộ bài tập'); return null; }
    const id = t?.id || uid();
    store.put('tests', id, { lang: l, folder, title: $('#teTitle', box).value.trim() || 'Bài kiểm tra', mode, count: +$('#teCount', box).value, listen: $('#teListen', box).checked, time: readTime(box, 'teTime'), setIds: ids.length === avail.length ? [] : ids, created: t?.created || Date.now(), deleted: false });
    toast('Đã lưu ✓');
    return id;
  };
  const back = () => { view = 'browse'; editTest = null; drawBrowse(); };
  $('#teSave', box).onclick = () => { if (save()) back(); };
  $('#teTry', box).onclick = () => { const id = save(); if (id) runTest(id); };
  $('#teCancel', box).onclick = $('#teBack', box).onclick = back;
}

// ---------- làm bài kiểm tra: tất cả câu trên một trang ----------
function runTest(id) {
  const t = store.get('tests', id); if (!t) return;
  const l = t.lang || 'zh', ids = t.setIds?.length ? t.setIds : setsInTree(t.folder).map(s => s.id);
  const sets = ids.map(x => store.get('sets', x)).filter(s => s && !s.deleted);
  const qs = buildTest(sets, { mode: t.mode, count: t.count, listen: t.listen !== false }, rngOf('t' + id + Date.now()));
  if (!qs.length) { toast('Bài kiểm tra này chưa có câu hỏi: kiểm tra lại các bộ bài tập đã chọn'); return; }
  view = 'testrun'; editTest = null;
  box.innerHTML = `<div class="row"><button class="btn" id="trBack">← ${esc(tree.pathLabel(t.folder, l) || 'Bài học')}</button></div><div id="trSheet"></div>`;
  const back = () => { runner = null; view = 'browse'; drawBrowse(); scrollTo(0, 0); };
  $('#trBack', box).onclick = back;
  runner = runSheet($('#trSheet', box), {
    qs, lang: l, title: t.title, src: t.title, submitLabel: 'Hoàn thành & nộp bài', timeLimit: t.time || 0,
    intro: `<div class="dim">${qs.length} câu hỏi · ${t.mode === 'group' ? 'theo nhóm' : 'ngẫu nhiên'}</div>${t.time ? '<div class="dim">Có giới hạn thời gian: hết giờ bài tự nộp.</div>' : ''}<div class="dim">Làm hết rồi bấm nút nộp bài ở cuối trang để chấm điểm.</div>`,
    onDone: r => {
      const c = store.get('tests', id) || {};
      store.put('tests', id, { best: Math.max(c.best ?? 0, r.pct), tries: (c.tries || 0) + 1, last: r.pct });
      tracker.test(r.pct);
    },
    onAgain: () => runTest(id), onExit: back, exitLabel: '← Về thư mục',
  });
  scrollTo(0, 0);
}

bus.on('lang', () => { cur = ''; view = 'browse'; runner = null; editTest = null; });
