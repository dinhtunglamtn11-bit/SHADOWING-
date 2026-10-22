// Tab “Sổ lỗi” trong Ôn tập: danh sách câu hay sai và nút ôn lại đúng những câu đó.
import { $, $$, esc, toast, getLang } from './util.js';
import * as store from './store.js';
import * as M from './mistakes.js';
import { runQuiz, reshuffle } from './exrun.js';
import { KIND_LABEL } from './exparse.js';
import { rngOf, shuffle } from './quiz.js';

let box = null, runner = null;
const filter = { kind: 'all', state: 'active', count: 10 };

export function render(el) {
  box = el;
  if (runner) { runner.attach(el); return; }
  draw();
}
export function reset() { runner?.stop(); runner = null; }

const poolOf = lang => M.all(lang).filter(d => !M.mastered(d) && (filter.kind === 'all' || d.kind === filter.kind)).sort((a, b) => (b.count || 0) - (a.count || 0) || (b.last || 0) - (a.last || 0));

function draw() {
  const lang = getLang(), all = M.all(lang), act = all.filter(d => !M.mastered(d)), done = all.length - act.length;
  const wrongTotal = all.reduce((n, d) => n + (d.count || 0), 0);
  const kinds = [...new Set(all.map(d => d.kind))];
  const shown = all.filter(d => (filter.state === 'all' || (filter.state === 'active' ? !M.mastered(d) : M.mastered(d))) && (filter.kind === 'all' || d.kind === filter.kind))
    .sort((a, b) => (b.count || 0) - (a.count || 0) || (b.last || 0) - (a.last || 0));
  const kcount = {}; act.forEach(d => { kcount[d.kind] = (kcount[d.kind] || 0) + 1; });
  const top = Object.keys(kcount).sort((a, b) => kcount[b] - kcount[a])[0];
  box.innerHTML = `<div class="qcard"><div class="rvbig">📕 Sổ lỗi</div>
      <div class="dim">${act.length} câu đang sai · ${done} câu đã nắm · ${wrongTotal} lượt sai</div>
      <div class="dim">Câu làm sai ở bài tập, bài kiểm tra và bài đọc tự vào đây. Làm đúng liên tiếp 2 lần là “đã nắm”.</div>${top ? `<div class="dim">Dạng sai nhiều nhất: <b>${esc(KIND_LABEL[top] || top)}</b> (${kcount[top]} câu)</div>` : ''}
      <div class="row"><button class="btn primary big" id="mbRun" ${poolOf(lang).length ? '' : 'disabled'}>▶ Ôn các câu hay sai</button>
        <label class="dim">Số câu <select id="mbCount">${[5, 10, 20, 30, 0].map(n => `<option value="${n}" ${n === filter.count ? 'selected' : ''}>${n || 'Tất cả'}</option>`).join('')}</select></label></div></div>
    <div class="row"><label class="dim">Dạng <select id="mbKind"><option value="all">Tất cả dạng</option>${kinds.map(k => `<option value="${k}" ${filter.kind === k ? 'selected' : ''}>${esc(KIND_LABEL[k] || k)}</option>`).join('')}</select></label>
      <label class="dim">Hiện <select id="mbState"><option value="active" ${filter.state === 'active' ? 'selected' : ''}>Đang sai</option><option value="done" ${filter.state === 'done' ? 'selected' : ''}>Đã nắm</option><option value="all" ${filter.state === 'all' ? 'selected' : ''}>Tất cả</option></select></label>
      <span class="grow"></span>${done ? '<button class="btn" id="mbClean">🗑 Xóa câu đã nắm</button>' : ''}</div>
    <div class="cards mbl">${shown.length ? shown.map(d => `<div class="card mbrow ${M.mastered(d) ? 'okc' : ''}" style="cursor:default"><div class="ci"><span class="kbs"><span class="kb">${esc(KIND_LABEL[d.kind] || d.kind)}</span></span><b class="mbq">${esc(d.label || '')}</b>
        <span class="dim">Sai ${d.count || 1} lần${d.src ? ' · <span class="mbsrc">' + esc(d.src) + '</span>' : ''} · ${M.mastered(d) ? '✓ đã nắm' : (d.ok ? 'đúng ' + d.ok + '/' + M.MASTER + ' lần liên tiếp' : 'đang sai')}</span></div>
        <button class="btn" data-del="${d.id}" title="Xóa khỏi sổ lỗi">🗑</button></div>`).join('')
      : `<div class="empty">${all.length ? 'Không có câu nào khớp bộ lọc.' : 'Chưa có câu sai nào. Cứ làm bài tập hoặc bài kiểm tra, câu nào sai sẽ tự vào đây.'}</div>`}</div>`;
  $('#mbRun', box)?.addEventListener('click', run);
  $('#mbCount', box).onchange = e => { filter.count = +e.target.value; };
  $('#mbKind', box).onchange = e => { filter.kind = e.target.value; draw(); };
  $('#mbState', box).onchange = e => { filter.state = e.target.value; draw(); };
  $('#mbClean', box)?.addEventListener('click', () => {
    if (!confirm('Xóa các câu đã nắm khỏi sổ lỗi?')) return;
    all.filter(M.mastered).forEach(d => store.del('mistakes', d.id)); draw();
  });
  $$('[data-del]', box).forEach(b => b.onclick = () => { store.del('mistakes', b.dataset.del); draw(); });
}

function run() {
  const lang = getLang();
  let pool = poolOf(lang);
  if (filter.count) pool = pool.slice(0, filter.count);
  const rnd = rngOf('mb' + Date.now());
  const qs = shuffle(pool.map(d => M.qOf(d)).filter(Boolean).map(reshuffle), rnd);
  if (!qs.length) { toast('Chưa có câu nào để ôn'); return; }
  runner?.stop();
  runner = runQuiz(box, { qs, lang, title: 'Sổ lỗi', exitLabel: 'Về sổ lỗi', onExit: () => { runner = null; draw(); }, onAgain: run });
}
