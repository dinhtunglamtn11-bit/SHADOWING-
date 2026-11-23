// Bài tập gắn với video: vừa xem video (bên trái) vừa làm bài (cột bên phải, thay cho danh sách câu).
// Dùng đúng cú pháp và trình làm bài của “Bài tập của tôi”: trắc nghiệm (TN), chọn nhiều (NN), đúng/sai (DS), điền từ (Đ, K),
// tự luận (G), sắp xếp câu (S), nghe rồi chọn / gõ (N, NG). Nội dung bài lưu ngay trong video (đồng bộ cùng video).
import { $, $$, esc, toast, bus, langInfo } from './util.js';
import * as store from './store.js';
import { M } from './media.js';
import { currentItemId, currentCues, currentLang } from './player.js';
import { parseSet, build, countKinds, KIND_LABEL } from './exparse.js';
import { runQuiz } from './exrun.js';
import { rngOf } from './quiz.js';
import { setPrompt, promptPanel, KIND_ORDER, KIND_INFO, EX } from './exprompts.js';

let host = null, tab = 'do', runner = null, aiState = { kinds: ['TN', 'NN', 'DS', 'Đ'], count: 3 };
export const isOpen = () => document.body.classList.contains('vx-on');

const EXAMPLES = {
  zh: `# Bài tập video
TN: 视频里的人在做什么？ | *做家务 | 去上班 | 在睡觉 | 在看电影
NN: 下面哪些是家务？（选所有正确的） | *洗碗 | *扫地 | 睡觉 | *洗衣服
DS: 今天我要在家里做家务。 | đúng
Đ: 今天我要在[家里]边做家务。
G: “做家务”的意思是什么？ | làm việc nhà / làm việc nhà cửa`,
  en: `# Video exercises
TN: What is the speaker doing? | *Housework | Working | Sleeping | Watching TV
NN: Which of these are chores? | *Washing dishes | *Sweeping | Sleeping | *Doing laundry
DS: The speaker is at the office. | sai
Đ: Today I [clean] the [house].`,
};
const exampleFor = lang => EXAMPLES[lang] || EXAMPLES.zh;

function item() { const id = currentItemId(); return id ? { id, ...store.get('items', id) } : null; }

export function open(t) {
  const it = item();
  if (!it) { toast('Hãy mở một video trước'); return; }
  if (t) tab = t; else tab = (it.ex || '').trim() ? 'do' : 'edit';
  document.body.classList.add('vx-on'); host.hidden = false;
  setTimeout(() => host.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50); // điện thoại: bài tập nằm dưới video, cuộn tới đó
  draw();
}
export function close() {
  runner?.stop(); runner = null;
  document.body.classList.remove('vx-on'); host.hidden = true; host.innerHTML = '';
}

function draw() {
  runner?.stop(); runner = null;
  const it = item(); if (!it) { close(); return; }
  host.innerHTML = `<div class="cuebar"><div class="seg" id="vxTab"><button data-t="do" class="${tab === 'do' ? 'on' : ''}" title="Làm bài tập của video này">📝 Làm bài tập</button><button data-t="edit" class="${tab === 'edit' ? 'on' : ''}" title="Nhập hoặc sửa bài tập của video này">✏️ Soạn bài</button></div>
      <span class="grow"></span><button class="btn" id="vxClose" title="Quay lại danh sách phụ đề">📖 Phụ đề</button></div>
    <div id="vxBody" class="vxbody"></div>`;
  $('#vxTab', host).onclick = e => { const b = e.target.closest('button'); if (b && b.dataset.t !== tab) { tab = b.dataset.t; draw(); } };
  $('#vxClose', host).onclick = close;
  if (tab === 'do') drawDo(it); else drawEdit(it);
}

// ---------- làm bài ----------
function drawDo(it) {
  const box = $('#vxBody', host), lang = currentLang();
  const parsed = parseSet(it.ex || ''), qs = build(parsed, { shuffle: false, listen: true, count: 0 }, rngOf('vx' + it.id + Date.now()));
  if (!qs.length) {
    box.innerHTML = `<div class="empty">Video này chưa có bài tập.<div class="row c"><button class="btn primary" id="vxToEdit">✏️ Soạn bài tập</button></div>
      <div class="dim">Bạn có thể tự gõ câu hỏi, hoặc dùng “🤖 Prompt AI” để nhờ ChatGPT/Claude ra đề từ chính phụ đề của video.</div></div>`;
    $('#vxToEdit', box).onclick = () => { tab = 'edit'; draw(); };
    return;
  }
  const n = qs.length, best = it.exBest;
  box.innerHTML = `<div class="dim vxinfo">${n} câu${it.exTries ? ` · đã làm ${it.exTries} lần` : ''}${best != null ? ` · điểm cao nhất ${best}%` : ''}</div><div id="vxRun"></div>`;
  runner = runQuiz($('#vxRun', box), {
    qs, lang, title: it.title || '',
    onExit: close, exitLabel: 'Về phụ đề',
    onAgain: () => draw(),
    onDone: r => {
      const c = store.get('items', it.id) || {}, prevBest = c.exBest;
      store.put('items', it.id, { exTries: (c.exTries || 0) + 1, exBest: Math.max(c.exBest ?? 0, r.pct), exLast: r.pct });
      setTimeout(() => verdict(r, prevBest), 0); // thêm nhận xét khả năng nghe hiểu lên đầu màn kết quả
    },
  });
}

// Nhận xét khả năng nghe hiểu theo điểm bài tập
function verdict(r, prevBest) {
  const run = $('#vxRun', host); if (!run) return;
  const p = r.pct;
  const [icon, title, tip] = p >= 90 ? ['🌟', 'Nghe hiểu rất tốt', 'Bạn hiểu gần như toàn bộ nội dung video.']
    : p >= 70 ? ['👍', 'Nghe hiểu khá tốt', 'Bạn nắm phần lớn nội dung. Xem lại các câu sai rồi nghe lại đoạn tương ứng.']
    : p >= 50 ? ['📘', 'Nghe hiểu mức trung bình', 'Hãy xem lại video với phụ đề / phiên âm, nghe từng câu rồi làm lại bài.']
    : ['🌱', 'Cần luyện thêm', 'Thử phát chậm hơn, bật phiên âm và nghĩa, chia đoạn để nghe lại, rồi làm lại bài.'];
  const cmp = prevBest == null ? '' : p > prevBest ? ` Tiến bộ so với lần cao nhất trước (${prevBest}%).` : p === prevBest ? ` Bằng điểm cao nhất trước (${prevBest}%).` : ` Điểm cao nhất trước đó: ${prevBest}%.`;
  run.querySelector('.vxverdict')?.remove();
  run.insertAdjacentHTML('afterbegin', `<div class="vxverdict"><b>${icon} ${title} · ${p}%</b><div class="dim">${tip}${cmp}</div></div>`);
}

// Bảng cú pháp để chép (dán vào ChatGPT/Claude hoặc ghi chú)
function syntaxSheet(lang) {
  const ex = EX[lang] || EX.zh;
  const rows = KIND_ORDER.filter(k => k !== 'T').map(k => `${KIND_INFO[k].name}\n  Cú pháp: ${KIND_INFO[k].syntax}\n  Ví dụ:   ${ex[k]}`).join('\n\n');
  return `CÚ PHÁP CÂU HỎI (mỗi dòng một câu hỏi, các phần cách nhau bằng dấu |)

${rows}

LƯU Ý
- Dòng đầu có thể là tiêu đề: # Tên bài
- Dấu * đứng trước đáp án đúng; [ ] là chỗ trống cần điền.
- Cần viết dấu | trong chữ thì viết \\| ; muốn xuống dòng trong câu thì viết \\n
- Giải thích (không bắt buộc) đặt cuối dòng sau dấu ~ , ví dụ: ~ vì …
- Dòng bắt đầu bằng // là ghi chú, bị bỏ qua.`;
}

// ---------- soạn bài ----------
function drawEdit(it) {
  const box = $('#vxBody', host), lang = currentLang();
  box.innerHTML = `<textarea id="vxText" class="mono" rows="12" spellcheck="false" placeholder="TN: câu hỏi | *đáp án đúng | sai | sai | sai&#10;DS: nhận định | đúng&#10;Đ: Tôi [đi] học mỗi ngày">${esc(it.ex || '')}</textarea>
    <div id="vxInfo" class="dim"></div>
    <div class="row"><button class="btn primary" id="vxSave">💾 Lưu bài tập</button><button class="btn" id="vxExample">Chèn ví dụ</button><button class="btn danger" id="vxClear">🗑 Xóa bài</button></div>
    <details class="vxsyn" open><summary>📋 Cú pháp nhập câu hỏi (chép để dùng)</summary><textarea id="vxSyn" class="mono" rows="10" readonly spellcheck="false"></textarea>
      <div class="row"><button class="btn primary" id="vxSynCopy">📋 Chép cú pháp</button></div></details>
    <details class="vxsyn" open><summary>🤖 Prompt nhờ AI ra đề từ phụ đề của video</summary><div id="vxAiHost" class="help"></div></details>`;
  const ta = $('#vxText', box), info = $('#vxInfo', box);
  const check = () => {
    const p = parseSet(ta.value);
    const counts = countKinds(p), total = Object.values(counts).reduce((a, b) => a + b, 0);
    const errs = p.errors.slice(0, 5).map(e => `<div class="miss">Dòng ${e.line}: ${esc(e.msg)}</div>`).join('') + (p.errors.length > 5 ? `<div class="dim">… và ${p.errors.length - 5} lỗi nữa</div>` : '');
    info.innerHTML = (ta.value.trim() ? (total ? `<span class="ok">✓ ${total} câu</span> · ${Object.entries(counts).map(([k, v]) => `${KIND_LABEL[k] || k} ${v}`).join(' · ')}` : '<span class="miss">Chưa có câu hỏi hợp lệ.</span>') : '<span class="dim">Chưa có nội dung.</span>') + errs;
    return total;
  };
  ta.addEventListener('input', check); check();
  $('#vxSave', box).onclick = () => {
    const total = check();
    store.put('items', it.id, { ex: ta.value.trim() });
    toast(total ? `Đã lưu ${total} câu hỏi ✓` : 'Đã lưu (chưa có câu hỏi hợp lệ)', 2500);
    if (total) { tab = 'do'; draw(); }
  };
  $('#vxExample', box).onclick = () => { if (ta.value.trim() && !confirm('Thay nội dung đang có bằng bài ví dụ?')) return; ta.value = exampleFor(lang); check(); };
  $('#vxClear', box).onclick = () => { if (!ta.value.trim() && !it.ex) return; if (!confirm('Xóa toàn bộ bài tập của video này?')) return; store.put('items', it.id, { ex: '', exTries: 0, exBest: null }); ta.value = ''; check(); toast('Đã xóa bài tập'); };
  $('#vxSyn', box).value = syntaxSheet(lang);
  $('#vxSynCopy', box).onclick = async () => {
    const t = $('#vxSyn', box).value;
    try { await navigator.clipboard.writeText(t); toast('Đã chép cú pháp ✓ (dán vào ChatGPT/Claude hoặc ghi chú)'); }
    catch { $('#vxSyn', box).select(); document.execCommand?.('copy'); toast('Đã chọn sẵn cú pháp: nhấn Ctrl+C để chép'); }
  };
  promptPanel($('#vxAiHost', box), {
    kinds: KIND_ORDER, state: aiState, fields: [],
    build: o => setPrompt({ lang, kinds: o.kinds, count: o.count, title: it.title || '', source: o.source }),
    source: async () => currentCues().map(c => c.lines.filter(Boolean).join(' | ')).join('\n'), // dùng chính phụ đề của video làm nguồn
  });
}

export function init() {
  host = $('#vxPanel'); if (!host) return;
  bus.on('vx', t => { if (t === 'toggle') { isOpen() ? close() : open(); } else open(t); });
  $('#btnVx')?.addEventListener('click', () => (isOpen() ? close() : open()));
  let offered = null;
  bus.on('item', () => { offered = null; if (isOpen()) close(); }); // mở video khác: đóng bảng bài tập của video cũ
  // xem hết video mà video có bài tập: tự mở bài tập (bên cạnh trên máy rộng, bên dưới trên điện thoại) để kiểm tra khả năng nghe hiểu
  M.addEventListener('ended', () => {
    const it = item(); if (!it || isOpen() || offered === it.id || !(it.ex || '').trim()) return;
    offered = it.id; open('do'); toast('Đã xem xong: làm bài tập để kiểm tra khả năng nghe hiểu', 4000);
  });
  bus.on('show', v => { if (v !== 'player' && isOpen()) close(); });
}
