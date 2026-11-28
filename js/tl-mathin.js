// TeaLab: bộ nhập biểu thức "hiển thị tự nhiên" kiểu Casio fx-580VN X cho máy tính trong game.
// Biểu thức là cây: mỗi HÀNG là một mảng nút; nút khuôn (phân số, căn, mũ, trị tuyệt đối) chứa các hàng con trong .s.
//   { c: '5' }  ký tự / dấu / tên hàm ('EOQ(') / 'Ans' / 'π'
//   { k: 'frac', s: [tử, mẫu] } · { k: 'sqrt', s: [trong căn] } · { k: 'root', s: [bậc, trong căn] } · { k: 'pow', s: [số mũ] } · { k: 'abs', s: [trong] }
// Con trỏ = (row, i): đứng trước phần tử thứ i của hàng row. File này không đụng DOM: chỉ sửa cây, vẽ ra HTML và đổi ra chuỗi cho calcEval.
import { esc } from './util.js';

const SLOTS = { frac: 2, sqrt: 1, root: 2, pow: 1, abs: 1 };
const make = k => ({ k, s: Array.from({ length: SLOTS[k] }, () => []) });
const isDigit = n => !!n && !n.k && /^[0-9,]$/.test(n.c);
const isOpen = n => !!n && !n.k && n.c.endsWith('(');
const OPS = '+−×÷;';

export function editor(root = []) { return { root, row: root, i: root.length }; }
export const clone = root => JSON.parse(JSON.stringify(root));
export function load(ed, root) { ed.root = root; ed.row = root; ed.i = root.length; }
export const isEmpty = ed => !ed.root.length;

// ---------- vị trí và di chuyển ----------
function parentOf(row, target) { // hàng cha của hàng target: { row, idx, slot }
  for (let idx = 0; idx < row.length; idx++) {
    const n = row[idx];
    if (!n.k) continue;
    for (let slot = 0; slot < n.s.length; slot++) {
      if (n.s[slot] === target) return { row, idx, slot, node: n };
      const deeper = parentOf(n.s[slot], target);
      if (deeper) return deeper;
    }
  }
  return null;
}
function positions(row, out = []) { // mọi chỗ đặt được con trỏ, theo thứ tự đọc
  for (let i = 0; i <= row.length; i++) {
    out.push([row, i]);
    if (i < row.length && row[i].k) for (const s of row[i].s) positions(s, out);
  }
  return out;
}
export function move(ed, dir) { // ◀ ▶: đi qua từng ô; hết tử thì sang mẫu, hết ô thì ra ngoài (đến cuối biểu thức thì vòng lại)
  const all = positions(ed.root), at = all.findIndex(([r, i]) => r === ed.row && i === ed.i);
  [ed.row, ed.i] = all[(at + dir + all.length) % all.length];
}
export function home(ed) { ed.row = ed.root; ed.i = 0; }
export function end(ed) { ed.row = ed.root; ed.i = ed.root.length; }
export function vertical(ed, dir) { // ▲ ▼: giữa tử và mẫu, giữa bậc căn và biểu thức trong căn; false = không ở khuôn nào như vậy
  for (let p = parentOf(ed.root, ed.row); p; p = parentOf(ed.root, p.row)) {
    if (p.node.k !== 'frac' && p.node.k !== 'root') continue;
    const to = dir < 0 ? 0 : 1;
    if (p.slot === to) continue;
    ed.row = p.node.s[to]; ed.i = Math.min(ed.i, ed.row.length);
    return true;
  }
  return false;
}
export function exit(ed) { // ra khỏi ô đang đứng: con trỏ nằm ngay SAU cả khuôn
  const p = parentOf(ed.root, ed.row);
  if (!p) return false;
  ed.row = p.row; ed.i = p.idx + 1;
  return true;
}
export const depth = ed => { let d = 0; for (let p = parentOf(ed.root, ed.row); p; p = parentOf(ed.root, p.row)) d++; return d; };

// ---------- thêm / xóa ----------
export function put(ed, node) { ed.row.splice(ed.i, 0, node); ed.i++; return node; }
function operandStart(row, i) { // đầu của "một số / một cụm" nằm ngay trước vị trí i (để đưa lên tử số)
  let j = i;
  while (j > 0 && (row[j - 1].k === 'pow' || row[j - 1].c === '%')) j--;
  if (j === 0) return i;
  const n = row[j - 1];
  if (n.k) return j - 1;
  if (isDigit(n)) { while (j > 0 && isDigit(row[j - 1])) j--; return j; }
  if (n.c === ')') {
    let d = 0;
    for (let k = j - 1; k >= 0; k--) {
      if (!row[k].k && row[k].c === ')') d++;
      else if (isOpen(row[k]) && --d === 0) { while (k > 0 && !row[k - 1].k && /^[A-Za-z]$/.test(row[k - 1].c)) k--; return k; }
    }
    return i;
  }
  return n.c === 'Ans' || n.c === 'π' || n.c === 'e' ? j - 1 : i;
}
export function template(ed, kind) {
  const node = make(kind);
  if (kind === 'frac') {
    const j = operandStart(ed.row, ed.i);
    node.s[0] = ed.row.splice(j, ed.i - j);
    ed.row.splice(j, 0, node);
    ed.row = node.s[node.s[0].length ? 1 : 0]; ed.i = 0;
    return;
  }
  put(ed, node);
  ed.row = node.s[0]; ed.i = 0;
}
export function power(ed, text) { // x², x⁻¹: số mũ điền sẵn, con trỏ đứng sau
  const node = make('pow');
  node.s[0] = [...text].map(c => ({ c }));
  put(ed, node);
}
const blank = n => n.s.every(s => !s.length);
export function del(ed) { // phím DEL: xóa phần tử bên trái con trỏ; gặp khuôn còn nội dung thì chui vào trong để xóa tiếp
  if (ed.i > 0) {
    const n = ed.row[ed.i - 1];
    if (n.k && !blank(n)) { const s = [...n.s].reverse().find(x => x.length); ed.row = s; ed.i = s.length; return; }
    ed.row.splice(--ed.i, 1);
    return;
  }
  const p = parentOf(ed.root, ed.row);
  if (!p) return;
  if (p.slot > 0 && !blank(p.node)) { ed.row = p.node.s[p.slot - 1]; ed.i = ed.row.length; return; }
  // đầu ô thứ nhất: bỏ khuôn, giữ lại nội dung
  const keep = p.node.s.flat();
  p.row.splice(p.idx, 1, ...keep);
  ed.row = p.row; ed.i = p.idx;
}
export function delForward(ed) {
  if (ed.i < ed.row.length) { const n = ed.row[ed.i]; if (n.k && !blank(n)) { ed.row = n.s.find(s => s.length); ed.i = 0; } else ed.row.splice(ed.i, 1); }
}
export function delNumber(ed) { // CE: xóa cả số đang gõ
  if (ed.i > 0 && isDigit(ed.row[ed.i - 1])) { while (ed.i > 0 && isDigit(ed.row[ed.i - 1])) ed.row.splice(--ed.i, 1); } else del(ed);
}

// chèn một chuỗi viết liền (hướng dẫn công thức, bộ nhớ, dữ liệu, băng giấy cũ), ví dụ "ROP(50;2;12;1,64)" hay "√(2×3)^2"
export function type(ed, text) {
  const s = String(text), open = []; // mỗi '(' đang mở: true = đang ở trong khuôn (gặp ')' thì ra khỏi khuôn)
  for (let i = 0; i < s.length;) {
    const rest = s.slice(i);
    let m = /^(√\(|SQRT\(|ABS\()/i.exec(rest);
    if (m) { template(ed, /^abs/i.test(m[1]) ? 'abs' : 'sqrt'); open.push(true); i += m[1].length; continue; }
    if (s[i] === '√') { template(ed, 'sqrt'); const num = /^√([0-9,.]*)/.exec(rest)[1]; if (num) { type(ed, num); exit(ed); } i += 1 + num.length; continue; }
    if (s[i] === '^') {
      template(ed, 'pow');
      const num = /^\^([−-]?[0-9][0-9,.]*)/.exec(rest);
      if (num) { type(ed, num[1]); exit(ed); i += 1 + num[1].length; }
      else if (s[i + 1] === '(') { open.push(true); i += 2; } else i++;
      continue;
    }
    m = /^(Δ%|[A-Za-z_Δ][A-Za-z0-9_]*)\(/.exec(rest);
    if (m) { put(ed, { c: m[1].toUpperCase() + '(' }); open.push(false); i += m[0].length; continue; }
    if (/^Ans/i.test(rest)) { put(ed, { c: 'Ans' }); i += 3; continue; }
    const ch = s[i++];
    if (ch === ' ') continue;
    if (ch === '(') { open.push(false); put(ed, { c: '(' }); continue; }
    if (ch === ')') { if (open.pop()) exit(ed); else put(ed, { c: ')' }); continue; }
    put(ed, { c: ch === '-' ? '−' : ch === '*' ? '×' : ch === '/' ? '÷' : ch === '.' ? ',' : ch });
  }
}

// ---------- đổi ra chuỗi cho calcEval ----------
export function numStr(v) { // viết số ra đủ chữ số (không dùng dạng 1e+22 / 1e-9 vì bộ tính không đọc được)
  const s = String(v);
  if (!/e/i.test(s) || !isFinite(v)) return s;
  if (Math.abs(v) >= 1) return BigInt(v).toString();
  return v.toFixed(Math.min(100, 16 - Math.floor(Math.log10(Math.abs(v))))).replace(/\.?0+$/, '');
}
function linear(row, ans) {
  // gom thành "nhóm dấu ngoặc" rồi nối: hai giá trị đứng liền nhau (2√3, 2(1+1), 2Ans) là phép nhân và được ưu tiên như máy Casio
  let i = 0;
  const group = () => {
    const out = [];
    let run = [];
    const flush = () => { if (run.length) out.push(run.length > 1 ? '(' + run.join('×') + ')' : run[0]); run = []; };
    const postfix = suffix => { if (!run.length) { flush(); out.push(suffix); return; } let a = run[run.length - 1]; if (suffix[0] === '^' && /\^\([^()]*\)$/.test(a)) a = '(' + a + ')'; run[run.length - 1] = a + suffix; };
    while (i < row.length) {
      const n = row[i];
      if (n.k) {
        i++;
        const s = n.s.map(x => linear(x, ans));
        if (n.k === 'pow') postfix('^(' + s[0] + ')');
        else run.push(n.k === 'frac' ? `((${s[0]})÷(${s[1]}))` : n.k === 'sqrt' ? `√(${s[0]})` : n.k === 'root' ? `ROOT(${s[0]};${s[1]})` : `ABS(${s[0]})`);
        continue;
      }
      const c = n.c;
      if (c === ')') break;
      if (isDigit(n)) { let num = ''; while (isDigit(row[i])) num += row[i++].c; run.push(num); continue; }
      if (/^[A-Za-z_]$/.test(c) && c !== 'e') { let name = ''; while (row[i] && !row[i].k && /^[A-Za-z0-9_]$/.test(row[i].c)) name += row[i++].c; if (row[i]?.c === '(') { i++; run.push(name + '(' + group() + ')'); if (row[i]?.c === ')') i++; } else run.push(name); continue; }
      i++;
      if (isOpen(n)) { const inner = group(); if (row[i]?.c === ')') i++; run.push(c + inner + ')'); continue; } // thiếu ngoặc đóng thì tự đóng, như Casio
      if (c === '%') postfix('%');
      else if (c === 'Ans') run.push('(' + numStr(ans) + ')');
      else if (c === 'π') run.push('(' + Math.PI + ')');
      else if (c === 'e') run.push('(' + Math.E + ')');
      else if (OPS.includes(c)) { flush(); out.push(c); }
      else run.push(c);
    }
    flush();
    return out.join('');
  };
  let s = group();
  while (i < row.length) { i++; s += ')' + group(); } // ngoặc đóng thừa → calcEval báo lỗi cú pháp
  return s;
}
export const toExpr = (root, ans = 0) => linear(root, ans);

export function gotoEmpty(ed) { // sau khi báo lỗi: nhảy tới ô còn trống đầu tiên
  const hit = positions(ed.root).find(([r]) => r !== ed.root && !r.length);
  if (hit) [ed.row, ed.i] = hit; else end(ed);
}

export const hasFrac = row => row.some(n => n.k === 'frac' || (n.k && n.s.some(hasFrac)));

// phân số tối giản gần đúng của v (mẫu tối đa 10000), dùng cho phím S⇔D
export function toFraction(v) {
  if (!isFinite(v) || Math.abs(v) > 1e9 || Number.isInteger(v)) return null;
  const x = Math.abs(v);
  let h0 = 0, h1 = 1, k0 = 1, k1 = 0, r = x;
  for (let n = 0; n < 30; n++) {
    const a = Math.floor(r), h = a * h1 + h0, k = a * k1 + k0;
    if (k > 10000) return null;
    [h0, h1, k0, k1] = [h1, h, k1, k];
    if (Math.abs(x - h / k) <= 1e-11 * Math.max(1, x)) return { neg: v < 0, n: h, d: k };
    if (r - a < 1e-15) return null;
    r = 1 / (r - a);
  }
  return null;
}

// ---------- vẽ ----------
const RAD = '<svg class="mrad" viewBox="0 0 10 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 12 L2.6 11 L5.4 19 L10 1"/></svg>';
// cursor = ed (vẽ con trỏ) hoặc null. rows nhận danh sách hàng theo mã data-row, để biết người dùng chạm vào hàng nào.
export function render(root, cursor = null, rows = []) {
  const cur = '<i class="mc"></i>';
  const row = (r, top) => {
    const id = rows.push(r) - 1, at = cursor && cursor.row === r ? cursor.i : -1;
    let h = '';
    const cell = i => (at === i ? cur : '') + node(r[i], i);
    for (let i = 0; i < r.length; i++) {
      if (r[i + 1]?.k !== 'pow') { h += cell(i); continue; }
      // số mũ bám theo cơ số của nó (gộp lại), không bay lên đỉnh của cả dòng khi bên cạnh có phân số cao
      let g = cell(i);
      while (r[i + 1]?.k === 'pow') g += cell(++i);
      h += `<span class="mgrp">${g}</span>`;
    }
    if (at === r.length) h += cur;
    if (!r.length && !top) h = `<span class="mbox">${at === 0 ? cur : ''}</span>`;
    return `<span class="mr${at >= 0 && !top ? ' act' : ''}" data-row="${id}">${h}</span>`;
  };
  const node = (n, i) => {
    if (!n.k) return `<span class="mn${OPS.includes(n.c) ? ' op' : ''}${n.c.length > 1 ? ' fn' : ''}" data-i="${i}">${esc(n.c)}</span>`;
    const s = k => row(n.s[k]);
    if (n.k === 'frac') return `<span class="mn mfrac" data-i="${i}"><span class="mnum">${s(0)}</span><span class="mden">${s(1)}</span></span>`;
    if (n.k === 'sqrt') return `<span class="mn msqrt" data-i="${i}">${RAD}<span class="mbody">${s(0)}</span></span>`;
    if (n.k === 'root') return `<span class="mn mroot" data-i="${i}"><span class="midx">${s(0)}</span><span class="msqrt">${RAD}<span class="mbody">${s(1)}</span></span></span>`;
    if (n.k === 'pow') return `<span class="mn mpow" data-i="${i}">${s(0)}</span>`;
    return `<span class="mn mabs" data-i="${i}">${s(0)}</span>`;
  };
  return row(root, true);
}

// đặt con trỏ theo chỗ người dùng chạm (display là phần tử chứa HTML do render() tạo, rows là danh sách tương ứng)
export function tap(ed, display, rows, target, x) {
  let el = target.closest('[data-row]');
  if (!el || !display.contains(el)) el = display.querySelector('[data-row]');
  const r = rows[+el.dataset.row];
  if (!r) return;
  const items = [...el.querySelectorAll(':scope > [data-i], :scope > .mgrp > [data-i]')], mid = c => { const b = c.getBoundingClientRect(); return b.left + b.width / 2; };
  const hit = items.find(c => c.contains(target));
  ed.row = r;
  ed.i = hit ? +hit.dataset.i + (x > mid(hit) ? 1 : 0) : items.filter(c => mid(c) < x).length;
}
