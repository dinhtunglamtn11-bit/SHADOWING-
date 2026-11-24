// TeaLab: máy tính trong game (chương 17). Bộ phân tích biểu thức tự viết (không eval / Function), dùng dữ liệu công khai, không vào nhật ký lệnh.
import { normInv } from './tl-engine.js';

const ERR = { DIV0: 'Chia cho 0', SYNTAX: 'Cú pháp', DOMAIN: 'Ngoài miền', OVERFLOW: 'Số quá lớn' };
class CalcError extends Error { constructor(code, pos = 0) { super(ERR[code]); this.code = code; this.pos = pos; } }
const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; };
const Phi = x => { // hàm phân phối chuẩn tắc (xấp xỉ chính xác ~1e-7)
  if (x < -8) return 0; if (x > 8) return 1;
  let sum = x, term = x; for (let i = 1; i < 200; i++) { term *= x * x / (2 * i + 1); sum += term; if (Math.abs(term) < 1e-17) break; }
  return 0.5 + sum * Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
};

function tokenize(src) {
  const t = [], s = src.replace(/\s+/g, ' ');
  for (let i = 0; i < s.length;) {
    const ch = s[i];
    if (ch === ' ') { i++; continue; }
    if (/[0-9]/.test(ch) || ((ch === ',' || ch === '.') && /[0-9]/.test(s[i + 1] || ''))) {
      let j = i, seen = false; while (j < s.length && (/[0-9]/.test(s[j]) || ((s[j] === ',' || s[j] === '.') && !seen && /[0-9]/.test(s[j + 1] || '')))) { if (s[j] === ',' || s[j] === '.') seen = true; j++; }
      t.push({ k: 'num', v: parseFloat(s.slice(i, j).replace(',', '.')), p: i }); i = j; continue;
    }
    if (ch === '√') { t.push({ k: 'id', v: '√', p: i }); i++; continue; }
    if (/[A-Za-zΔ_]/.test(ch)) { let j = i + 1; while (j < s.length && /[A-Za-z0-9_%]/.test(s[j]) && !(s[j] === '%' && !/^Δ/.test(s.slice(i, j)))) j++; t.push({ k: 'id', v: s.slice(i, j), p: i }); i = j; continue; }
    if ('+-×÷*/^()%;'.includes(ch)) { t.push({ k: 'op', v: ch === '*' ? '×' : ch === '/' ? '÷' : ch, p: i }); i++; continue; }
    if (ch === '−') { t.push({ k: 'op', v: '-', p: i }); i++; continue; }
    throw new CalcError('SYNTAX', i);
  }
  return t;
}
const FN = {
  SQRT: a => { need(a, 1); if (a[0] < 0) throw new CalcError('DOMAIN'); return Math.sqrt(a[0]); }, '√': a => FN.SQRT(a), ABS: a => Math.abs(need(a, 1)[0]), LN: a => { if (!(need(a, 1)[0] > 0)) throw new CalcError('DOMAIN'); return Math.log(a[0]); }, EXP: a => Math.exp(need(a, 1)[0]),
  ROUND: a => { const n = a[1] || 0, f = 10 ** n; return Math.round((a[0] + Number.EPSILON * Math.sign(a[0])) * f) / f; }, CEIL: a => Math.ceil(need(a, 1)[0] - 1e-12), FLOOR: a => Math.floor(need(a, 1)[0] + 1e-12),
  SUM: a => a.reduce((x, y) => x + y, 0), AVG: a => { if (!a.length) throw new CalcError('SYNTAX'); return a.reduce((x, y) => x + y, 0) / a.length; }, MIN: a => Math.min(...a), MAX: a => Math.max(...a), COUNT: a => a.length,
  SD: a => { if (a.length < 2) throw new CalcError('DOMAIN'); const m = a.reduce((x, y) => x + y, 0) / a.length; return Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / (a.length - 1)); },
  'Δ%': a => { need(a, 2); if (a[0] === 0) throw new CalcError('DIV0'); return (a[1] - a[0]) / a[0] * 100; },
  MG: a => need(a, 2) && a[0] - a[1], MGP: a => { need(a, 2); if (a[0] === 0) throw new CalcError('DIV0'); return (a[0] - a[1]) / a[0] * 100; },
  NORM: a => Phi(need(a, 1)[0]), NORMINV: a => { if (!(need(a, 1)[0] > 0 && a[0] < 1)) throw new CalcError('DOMAIN'); return normInv(a[0]); },
  CR: a => { need(a, 2); const s = a[0] + a[1]; if (s === 0) throw new CalcError('DIV0'); return a[0] / s; },
  NV: a => { need(a, 4); const cr = a[2] + a[3]; if (cr === 0) throw new CalcError('DIV0'); const r = a[2] / cr; if (!(r > 0 && r < 1)) throw new CalcError('DOMAIN'); return a[0] + a[1] * normInv(r); },
  BE: a => { need(a, 2); if (a[1] === 0) throw new CalcError('DIV0'); return a[0] / a[1]; },
  ROP: a => { need(a, 4); if (a[1] < 0) throw new CalcError('DOMAIN'); return a[0] * a[1] + a[3] * a[2] * Math.sqrt(a[1]); },
  CI: a => { need(a, 3); if (!(a[2] > 0 && a[2] < 1) || a[1] <= 0) throw new CalcError('DOMAIN'); return normInv((1 + a[2]) / 2) * a[0] / Math.sqrt(a[1]); },
};
function need(a, n) { if (a.length !== n && !(n === 1 && a.length >= 1)) throw new CalcError('SYNTAX'); return a; }
export const FUNCS = Object.keys(FN);

export function calcEval(expr, vars = {}) {
  const T = tokenize(expr); let i = 0;
  const peek = () => T[i], eat = v => { const x = T[i]; if (x && x.k === 'op' && x.v === v) { i++; return true; } return false; };
  const fail = () => { throw new CalcError('SYNTAX', T[i] ? T[i].p : expr.length); };
  // trả về {v, pct}: pct = đó là số có hậu tố %, để áp quy ước phần trăm của máy tính văn phòng
  function addsub() {
    let a = muldiv();
    for (;;) {
      const o = peek(); if (!o || o.k !== 'op' || (o.v !== '+' && o.v !== '-')) break; i++;
      const b = muldiv(); a = { v: b.pct ? (o.v === '+' ? a.v + a.v * b.v : a.v - a.v * b.v) : (o.v === '+' ? a.v + b.v : a.v - b.v) };
    }
    return a;
  }
  function muldiv() {
    let a = unary();
    for (;;) {
      const o = peek(); if (!o || o.k !== 'op' || (o.v !== '×' && o.v !== '÷')) break; i++;
      const b = unary();
      if (o.v === '÷') { if (b.v === 0) throw new CalcError('DIV0', o.p); a = { v: a.v / b.v }; } else a = { v: a.v * b.v };
    }
    return a;
  }
  function unary() { if (eat('-')) { const x = unary(); return { v: -x.v, pct: x.pct }; } if (eat('+')) return unary(); return pow(); }
  function pow() { const a = post(); if (eat('^')) { const b = unary(); const r = Math.pow(a.v, b.v); if (!isFinite(r)) throw new CalcError(Number.isNaN(r) ? 'DOMAIN' : 'OVERFLOW'); return { v: r }; } return a; }
  function post() { let a = primary(); while (peek() && peek().k === 'op' && peek().v === '%') { i++; a = { v: a.v / 100, pct: true }; } return a; }
  function list() { const out = []; if (peek() && peek().k === 'op' && peek().v === ')') return out; do { out.push(addsub().v); } while (eat(';')); return out; }
  function primary() {
    const x = T[i]; if (!x) fail();
    if (x.k === 'num') { i++; return { v: x.v }; }
    if (x.k === 'op' && x.v === '(') { i++; const a = addsub(); if (!eat(')')) fail(); return a; }
    if (x.k === 'id') {
      i++; const name = x.v.toUpperCase().replace(/^Δ/, 'Δ');
      if (x.v === '√' && !(peek() && peek().k === 'op' && peek().v === '(')) { const y = pow(); return { v: FN.SQRT([y.v]) }; } // √144 không cần ngoặc
      if (peek() && peek().k === 'op' && peek().v === '(') { i++; const f = FN[name] || FN[x.v]; if (!f) throw new CalcError('SYNTAX', x.p); const a = list(); if (!eat(')')) fail(); const r = f(a); if (!isFinite(r)) throw new CalcError(Number.isNaN(r) ? 'DOMAIN' : 'OVERFLOW'); return { v: r }; }
      if (name in vars) return { v: vars[name] };
      throw new CalcError('SYNTAX', x.p);
    }
    fail();
  }
  try {
    if (!T.length) return { ok: false, error: 'SYNTAX', pos: 0, msg: ERR.SYNTAX };
    const r = addsub(); if (i < T.length) fail();
    if (!isFinite(r.v)) throw new CalcError('OVERFLOW');
    return { ok: true, value: r.v };
  } catch (e) { if (e instanceof CalcError) return { ok: false, error: e.code, pos: e.pos, msg: ERR[e.code] }; throw e; }
}
export function fmt(n) { // 12 chữ số có nghĩa, bỏ số 0 thừa, dấu phẩy thập phân, dấu chấm ngăn nghìn
  if (!isFinite(n)) return '—';
  let s = String(+n.toPrecision(12)); if (/e/i.test(s)) s = (+n.toPrecision(12)).toFixed(0);
  let [a, b] = s.split('.'); const neg = a.startsWith('-'); if (neg) a = a.slice(1);
  a = a.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '-' : '') + a + (b ? ',' + b : '');
}
export const roundFor = (kind, v) => (kind === 'qty' ? Math.ceil(v - 1e-9) : Math.round(v));
