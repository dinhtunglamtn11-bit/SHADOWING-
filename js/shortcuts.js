// Phím tắt ở màn Học: đặt lại được trong ⚙ Cài đặt (lưu riêng từng máy). Dùng KeyboardEvent.code nên không phụ thuộc bố cục bàn phím.
import { $, esc, toast } from './util.js';

export const ACTIONS = [
  { id: 'play', name: 'Phát / dừng', def: 'Space' },
  { id: 'next', name: 'Câu sau (hoặc đoạn sau)', def: 'ArrowRight' },
  { id: 'prev', name: 'Câu trước (hoặc đoạn trước)', def: 'ArrowLeft' },
  { id: 'replay', name: 'Nghe lại câu', def: 'KeyR' },
  { id: 'loop', name: 'Bật / tắt lặp câu', def: 'KeyL' },
  { id: 'hide', name: 'Ẩn / hiện phiên âm và nghĩa', def: 'KeyH' },
  { id: 'card', name: 'Lưu câu vào sổ thẻ', def: 'KeyS' },
  { id: 'slower', name: 'Phát chậm lại', def: 'BracketLeft' },
  { id: 'faster', name: 'Phát nhanh lên', def: 'BracketRight' },
  { id: 'lookup', name: 'Bật / tắt tra từ', def: 'KeyT' },
];
const KEY = 'keys', RESERVED = new Set(['Escape', 'Tab', 'Enter', 'Backspace', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight']);

function load() {
  let o = {}; try { o = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { /* mặc định */ }
  return Object.fromEntries(ACTIONS.map(a => [a.id, a.id in o ? o[a.id] : a.def]));
}
let map = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(map)); } catch { /* bỏ qua */ } };

// Phím vừa nhấn ứng với hành động nào (không dùng khi giữ Ctrl/Alt/Cmd để khỏi chặn phím tắt của trình duyệt)
export function actionFor(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || !e.code) return null;
  for (const [id, code] of Object.entries(map)) if (code && code === e.code) return id;
  return null;
}

export function label(code) {
  if (!code) return '—';
  if (/^Key[A-Z]$/.test(code)) return code.slice(3);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  return { Space: 'Space', ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', BracketLeft: '[', BracketRight: ']', Comma: ',', Period: '.', Slash: '/', Semicolon: ';', Quote: "'", Minus: '-', Equal: '=', Backquote: '`', Backslash: '\\' }[code] || code;
}

let capturing = null;
function renderList() {
  $('#keyList').innerHTML = ACTIONS.map(a => `<div class="uirow"><span>${esc(a.name)}</span><button class="btn keybtn ${capturing === a.id ? 'on' : ''}" data-a="${a.id}">${capturing === a.id ? 'Nhấn phím…' : esc(label(map[a.id]))}</button></div>`).join('');
}

export function init() {
  renderList();
  $('#keyList').onclick = e => {
    const b = e.target.closest('[data-a]');
    if (!b) return;
    capturing = capturing === b.dataset.a ? null : b.dataset.a;
    renderList();
  };
  // đang chờ phím mới: chặn mọi phím khác (kể cả của trình học) cho tới khi chọn xong
  document.addEventListener('keydown', e => {
    if (!capturing) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.code === 'Escape') { capturing = null; renderList(); return; }
    if (e.code === 'Backspace') { map[capturing] = ''; save(); capturing = null; renderList(); return; }
    if (RESERVED.has(e.code)) return;
    const clash = Object.entries(map).find(([id, c]) => c === e.code && id !== capturing);
    if (clash) { map[clash[0]] = ''; toast(`Phím ${label(e.code)} đã gỡ khỏi “${ACTIONS.find(a => a.id === clash[0]).name}”`); }
    map[capturing] = e.code; save(); capturing = null; renderList();
  }, true);
  $('#keyReset').onclick = () => { map = Object.fromEntries(ACTIONS.map(a => [a.id, a.def])); save(); capturing = null; renderList(); toast('Đã đặt lại phím tắt'); };
}
