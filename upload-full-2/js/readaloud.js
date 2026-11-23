// Đọc to ghi chú và tài liệu chữ bằng giọng máy (tiếng Trung, Nhật, Hàn; thêm tiếng Anh) + chọn giọng trong Cài đặt.
// Dùng giọng có sẵn của trình duyệt/hệ điều hành: miễn phí, không cần mạng nếu máy đã cài giọng, không tốn token.
import { $, $$, esc, toast, bus, getLang } from './util.js';
import { prefs } from './prefs.js';
import { voiceFor, savedVoices, allVoices, say } from './tts.js';

const HANR = /\p{Script=Han}/u, KANA = /[\p{Script=Hiragana}\p{Script=Katakana}]/u, HANGUL = /\p{Script=Hangul}/u;
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const VIET = /[ăâđêôơưàảãạáằẳẵặắầẩẫậấèẻẽẹéềểễệếìỉĩịíòỏõọóồổỗộốờởỡợớùủũụúừửữựứỳỷỹỵý]/i;
const BCP = { zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR' };
const SAMPLE = { zh: '你好，很高兴认识你。', ja: 'こんにちは、はじめまして。', ko: '안녕하세요, 만나서 반갑습니다.' };
const NAME = { zh: 'Tiếng Trung', ja: 'Tiếng Nhật', ko: 'Tiếng Hàn' };
const ROOTS = '#nPreview, #docBody .txt, #vWorld .nw-text';

let session = 0, tapOn = false;
const readVi = () => { try { return localStorage.getItem('readvi') === '1'; } catch { return false; } };

// ---------- gom chữ và chia câu ----------
function textNodes(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement.closest('.pxe,sup,script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
  const out = []; for (let n = w.nextNode(); n; n = w.nextNode()) out.push(n);
  return out;
}
function collect(root) {
  const nodes = textNodes(root), breaks = new Set();
  let text = '', prev = null;
  for (const n of nodes) {
    const blk = n.parentElement.closest('p,h1,h2,h3,h4,li,pre,div');
    if (prev && blk !== prev) breaks.add(text.length);
    prev = blk; text += n.nodeValue;
  }
  const sents = [], END = /[。！？!?；;…\n]/, CLOSE = /[」』）)”"'’】]/;
  let s = 0;
  const push = e => { if (/[\p{L}\p{N}]/u.test(text.slice(s, e))) sents.push({ s, e }); s = e; };
  for (let i = 0; i < text.length; i++) {
    if (breaks.has(i) && i > s) push(i);
    const ch = text[i];
    if (END.test(ch) || (ch === '.' && /\s|^$/.test(text[i + 1] ?? ' '))) {
      let e = i + 1;
      while (e < text.length && (END.test(text[e]) && text[e] !== '\n' || CLOSE.test(text[e])) && !breaks.has(e)) e++;
      push(e); i = e - 1;
    }
  }
  if (s < text.length) push(text.length);
  return { nodes, text, sents };
}
function rangeOf(nodes, a, b) {
  const r = document.createRange(); let acc = 0, setS = false;
  for (const n of nodes) {
    const L = n.nodeValue.length;
    if (!setS && a < acc + L) { r.setStart(n, a - acc); setS = true; }
    if (setS && b <= acc + L) { r.setEnd(n, b - acc); return r; }
    acc += L;
  }
  if (setS) { const last = nodes[nodes.length - 1]; r.setEnd(last, last.nodeValue.length); }
  return r;
}

// ---------- chia câu thành các đoạn theo ngôn ngữ để chọn đúng giọng ----------
function runsOf(sentence, lang) {
  const cjk = HANGUL.test(sentence) ? 'ko' : KANA.test(sentence) || lang === 'ja' ? 'ja' : lang === 'ko' ? 'ko' : 'zh';
  const runs = []; let cur = null;
  const add = (kind, ch) => { if (cur && cur.kind === kind) cur.t += ch; else runs.push(cur = { kind, t: ch }); };
  for (const ch of sentence) {
    if (CJK.test(ch)) add('cjk', ch);
    else if (/[\p{L}\p{N}]/u.test(ch)) add('lat', ch);
    else if (cur) cur.t += ch; // dấu câu và khoảng trắng đi theo đoạn đang đọc
  }
  return runs.map(r => {
    if (r.kind === 'cjk') return { t: r.t, bcp: BCP[cjk] };
    if (VIET.test(r.t)) return readVi() ? { t: r.t, bcp: 'vi-VN' } : null;
    return lang === 'en' || readVi() ? { t: r.t, bcp: 'en-US' } : null;
  }).filter(r => r && /[\p{L}\p{N}]/u.test(r.t));
}

function speakRun(t, bcp, my) {
  return new Promise(res => {
    if (my !== session) { res(); return; }
    const u = new SpeechSynthesisUtterance(t);
    u.lang = bcp; const v = voiceFor(bcp); if (v) u.voice = v;
    u.rate = prefs.ttsRate || 0.9;
    u.onend = u.onerror = () => res();
    speechSynthesis.speak(u);
  });
}

// ---------- tô sáng câu đang đọc ----------
const canMark = typeof CSS !== 'undefined' && CSS.highlights && typeof Highlight !== 'undefined';
const mark = r => { if (canMark) CSS.highlights.set('reading', new Highlight(r)); };
const unmark = () => { if (canMark) CSS.highlights.delete('reading'); };

export function stop() {
  session++;
  try { speechSynthesis.cancel(); } catch { /* bỏ qua */ }
  unmark(); setBtn(false);
}
function setBtn(on) { $$('[data-readall]').forEach(b => { b.innerHTML = on ? '■ Dừng đọc' : '🔊 Đọc'; b.classList.toggle('on', on); }); }

// Đọc từ câu thứ from; only = chỉ đọc một câu
async function readFrom(root, from = 0, only = false) {
  if (!('speechSynthesis' in window)) { toast('Trình duyệt này không có giọng đọc'); return; }
  stop();
  const my = ++session, { nodes, text, sents } = collect(root), lang = getLang();
  if (!sents.length) { toast('Không có chữ để đọc'); return; }
  setBtn(true);
  for (let k = from; k < sents.length && my === session; k++) {
    const { s, e } = sents[k];
    mark(rangeOf(nodes, s, e));
    for (const r of runsOf(text.slice(s, e), lang)) await speakRun(r.t, r.bcp, my);
    if (only) break;
  }
  if (my === session) { unmark(); setBtn(false); }
}

function rootNow() {
  const v = document.body.dataset.view;
  if (v === 'notes') { if ($('#nPreview').hidden) $('#nMode [data-m=view]')?.click(); return $('#nPreview'); }
  if (v === 'doc') return $('#docBody .txt');
  if (v === 'world') return $('#vWorld .nw-text');
  return null;
}

// ---------- chạm vào câu để đọc ----------
function caretAt(x, y) {
  if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); return p && { node: p.offsetNode, offset: p.offset }; }
  const r = document.caretRangeFromPoint?.(x, y);
  return r && { node: r.startContainer, offset: r.startOffset };
}
function onTap(e) {
  if (!tapOn || document.body.classList.contains('lookup')) return;
  if (e.target.closest('button,a,input,textarea,select,dialog,#lkPop')) return;
  const root = e.target.closest(ROOTS);
  if (!root) return;
  const hit = caretAt(e.clientX, e.clientY);
  if (!hit || !root.contains(hit.node)) return;
  const { nodes, sents } = collect(root);
  let acc = 0, idx = -1;
  for (const n of nodes) { if (n === hit.node) { idx = acc + hit.offset; break; } acc += n.nodeValue.length; }
  const k = sents.findIndex(x => idx >= x.s && idx < x.e);
  if (k < 0) return;
  e.preventDefault(); e.stopPropagation();
  readFrom(root, k, true);
}

function setTap(v) {
  tapOn = v;
  try { localStorage.setItem('tapread', v ? '1' : '0'); } catch { /* bỏ qua */ }
  document.body.classList.toggle('tapread', v);
  $$('[data-tapread]').forEach(b => b.classList.toggle('on', v));
  if (v) toast(document.body.classList.contains('lookup') ? 'Đang bật Tra từ: hãy tắt Tra từ để chạm câu đọc' : 'Chạm vào một câu để nghe câu đó', 3000);
}

// ---------- chọn giọng trong Cài đặt ----------
function renderVoices() {
  const saved = savedVoices(), vs = allVoices();
  $('#voiceList').innerHTML = Object.keys(BCP).map(l => {
    const list = vs.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(l));
    const opts = `<option value="">Tự chọn</option>` + list.map(v => `<option value="${esc(v.voiceURI)}" ${saved[l] === v.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
    return `<div class="uirow"><span>${NAME[l]}</span><span class="voicebox"><select data-voice="${l}" ${list.length ? '' : 'disabled'}>${opts}</select><button class="btn" data-vtest="${l}">▶ Nghe thử</button></span></div>` +
      (list.length ? '' : `<small class="dim">Máy chưa có giọng ${NAME[l].toLowerCase()}. Cài thêm trong cài đặt hệ thống (Cài đặt → Ngôn ngữ / Giọng nói).</small>`);
  }).join('');
  $('#readVi').checked = readVi();
}

export function init() {
  try { speechSynthesis.addEventListener('voiceschanged', () => { if ($('#uiDlg').open) renderVoices(); }); } catch { /* bỏ qua */ }
  $('#btnSettings').addEventListener('click', renderVoices);
  $('#voiceList').addEventListener('change', e => {
    const s = e.target.closest('[data-voice]'); if (!s) return;
    const o = savedVoices(); if (s.value) o[s.dataset.voice] = s.value; else delete o[s.dataset.voice];
    try { localStorage.setItem('voices', JSON.stringify(o)); } catch { /* bỏ qua */ }
    say(SAMPLE[s.dataset.voice], BCP[s.dataset.voice]);
  });
  $('#voiceList').addEventListener('click', e => { const b = e.target.closest('[data-vtest]'); if (b) say(SAMPLE[b.dataset.vtest], BCP[b.dataset.vtest]); });
  $('#readVi').onchange = e => { try { localStorage.setItem('readvi', e.target.checked ? '1' : '0'); } catch { /* bỏ qua */ } };

  try { tapOn = localStorage.getItem('tapread') === '1'; } catch { tapOn = false; }
  document.body.classList.toggle('tapread', tapOn);
  $$('[data-tapread]').forEach(b => { b.classList.toggle('on', tapOn); b.onclick = () => setTap(!tapOn); });
  $$('[data-readall]').forEach(b => {
    b.onclick = () => {
      if (b.classList.contains('on')) { stop(); return; }
      const root = rootNow();
      if (!root) { if (document.body.dataset.view === 'doc') toast('Chỉ đọc được tài liệu dạng chữ (không phải PDF)'); return; }
      readFrom(root);
    };
  });
  document.addEventListener('click', onTap, true);
  bus.on('show', () => stop());
  addEventListener('pagehide', stop);
}
