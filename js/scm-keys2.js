// Đáp án chuẩn của 6 case thuộc ngân hàng 2 (E: Phân tích chuỗi cung ứng, F: Lập kế hoạch và tối ưu), lấy từ "Part II – Solutions and answer keys".
// Cùng khuôn với scm-keys.js. Thêm: pf(g) = hệ số điểm từng phần (0..1) khi ô không khớp đáp án (dùng cho danh sách phương án: tối ưu = 1, hợp lệ nhưng chưa tối ưu = một phần, không hợp lệ = 0).
// Phần lớn ô số và chất lượng quyết định do engine trong scm-engines2.js tính lại từ lựa chọn của người chơi.
import { f1Eval, f1Decision, f2Eval, f2Decision, f2Optimum, f3Eval, f3Decision, e3Eval, e3Decision, e2Eval, e2Method, e2Decision } from './scm-engines2.js';

const f2Orders = g => [1, 2, 3, 4].map(r => [g.a(`5.0.${r}`), g.a(`5.0.${r}.2`)]).filter(o => Number.isFinite(o[0]) && Number.isFinite(o[1]));
const f2Pf = g => { const d = f2Decision(f2Orders(g)); return d.valid ? (d.optimal ? 1 : 10 / 18) : 0; };
const f2Cells = {}; for (let r = 1; r <= 4; r++) { f2Cells[`5.0.${r}`] = { w: 2.25, pf: f2Pf }; f2Cells[`5.0.${r}.2`] = { w: 2.25, pf: f2Pf }; }
const plan3 = g => [g.s('6.0.1'), g.s('6.0.2')];
const f3Pf = g => { const d = f3Decision(...plan3(g)); return d.valid ? (d.optimal ? 1 : 0.5) : 0; };
const strip = x => String(x || '').replace(/[+\-]/g, '');

export const KEYS2 = {
  E1: {
    ticks: { 1: [2, 3, 4, 6, 7] },
    f: {
      '2.0.1': { v: 15, tol: 0 }, '2.0.2': { v: 60.0, tol: 0.1 }, '2.0.3': { v: 66.7, tol: 0.1 }, '2.0.4': { v: 90.1, tol: 0.1 }, '2.0.5': { v: 2.40, tol: 0.01 },
      '3.0.1': { v: 80, tol: 0.1 }, '3.0.2': { v: 60, tol: 0.1 }, '3.0.3': { v: 40, tol: 0.1 }, '3.0.4': { s: 'C' }, '3.0.5': { v: 910, tol: 1 }, '3.0.6': { v: 40.7, tol: 0.1 },
      '4.0.1': { v: 14.35, tol: 0.05, w: 8 }, '4.0.2': { v: 12.80, tol: 0.05, w: 8 }, '4.0.3': { s: 'O2', w: 5 }, '4.0.4': { s: 'O3', w: 6 },
      '4.0.5': { v: 14.35, tol: 0.05, w: 3, eng: g => ({ O1: 0, O3: 14.35, O4: 12.8 })[g.s('4.0.4')] },
    },
    // O3 là tối ưu (14,35); O4 đạt 89% (tối đa ★★); O1 = 0%; O2 vượt giới hạn 3 đơn nên không hợp lệ
    dq: g => ({ O3: { dq: 100, valid: true }, O4: { dq: 89, valid: true }, O1: { dq: 0, valid: true }, O2: { dq: 0, valid: false, why: 'O2 cần 5 đơn bổ sung ở nhà vận tải A nhưng A chỉ nhận thêm tối đa 3 đơn.' } }[g.s('4.0.4')] || { dq: 0, valid: false }),
  },
  E2: {
    ticks: { 1: [1, 2, 3, 4, 8], 3: [1, 2, 4, 5] },
    f: {
      '2.0.1': { v: 378, tol: 0.1 }, '2.0.2': { v: 438.3, tol: 0.1 }, '2.0.3': { v: 280, tol: 0.1 }, '2.0.4': { v: 306.7, tol: 0.1 }, '2.0.5': { v: 12.4, tol: 0.1 },
      '4.0.1': { v: 17.2, tol: 0.1, eng: () => e2Eval('M1').wape }, '4.0.2': { v: 26.4, tol: 0.1, eng: () => e2Eval('M3').wape }, '4.0.3': { v: 4.4, tol: 0.1, eng: () => e2Eval('M5').wape }, '4.0.4': { v: 4.6, tol: 0.1, eng: () => e2Eval('M5').ts },
      '4.0.5': { set: ['M1', 'M2', 'M3'] }, '4.0.6': { s: 'M1' },
      '5.0.1': { s: 'M1', w: 12, pf: g => (e2Decision(g.s('5.0.1')).valid ? 0.5 : 0) },
      '5.0.2': { v: 143.2, tol: 0.2, w: 4, eng: g => { const m = e2Method(g.s('5.0.1')); return m ? e2Eval(m).ss : NaN; } },
      '5.0.3': { v: 196.0, tol: 0.2, w: 4, eng: () => e2Eval('M3').ss },
      '5.0.4': { v: 790.8, tol: 0.3, w: 6, eng: g => { const m = e2Method(g.s('5.0.1')); return m ? (e2Eval('M3').ss - e2Eval(m).ss) * 15 : NaN; } },
    },
    dq: g => e2Decision(g.s('5.0.1')), // engine tính lại 5 phương pháp trên dữ liệu đã hiệu chỉnh: WAPE, tracking signal, RMSE
  },
  E3: {
    ticks: { 1: [1, 3, 4, 6, 7, 8], 3: [1, 3, 7, 9] },
    f: {
      '2.0.1': { v: 78950, tol: 1 }, '2.0.2': { v: 84758, tol: 1 }, '2.0.3': { v: 5808, tol: 1 }, '2.0.4': { v: 7.4, tol: 0.1 }, '2.0.5': { nums: [607.3, 632.5], tol: 0.1 },
      '4.0.1': { v: 2429, tol: 2 }, '4.0.2': { v: -1569, tol: 2 }, '4.0.3': { v: 4948, tol: 2 }, '4.0.4': { v: 0, tol: 1, ft: "a('4.0.1')+a('4.0.2')+a('4.0.3')-5808" }, '4.0.5': { s: 'RATE' },
      '5.0.1': { v: 12087, tol: 2 }, '5.0.2': { v: 11591, tol: 2 }, '5.0.3': { nums: [3], tol: 0 }, '5.0.4': { v: 8, tol: 0 }, '5.0.5': { v: 3362, tol: 2 },
      '6.0.1': { set: ['A1', 'A4', 'A5'], w: 12, pf: g => (e3Decision(g.s('6.0.1')).valid ? 0.5 : 0) },
      '6.0.2': { v: 7, tol: 0, w: 3, eng: g => e3Eval(g.s('6.0.1')).effort },
      '6.0.3': { v: 6322, tol: 2, w: 3, eng: g => e3Eval(g.s('6.0.1')).save },
      '6.0.4': { v: 12493, tol: 2, w: 4, eng: g => e3Eval(g.s('6.0.1')).net },
      '6.0.5': { s: 'CFO', w: 3, eng: g => e3Eval(g.s('6.0.1')).approval },
    },
    dq: g => e3Decision(g.s('6.0.1')), // engine duyệt 32 tập con của A1–A5 với dữ liệu đã cập nhật
  },
  F1: {
    ticks: { 1: [2, 3, 5, 7, 8] },
    f: {
      '2.0.1': { nums: [9500, 9200, 11000], tol: 1 }, '2.0.2': { nums: [32, 31, 43], tol: 0.1 }, '2.0.3': { nums: [55, 58, 73], tol: 0.1 }, '2.0.4': { set: ['L1', 'L2'] }, '2.0.5': { s: 'BOTH' },
      '3.0.1': { v: 92.0, tol: 0.1 }, '3.0.2': { v: 86.1, tol: 0.1 },
      '3.0.3': { s: 'VOLUME', eng: g => { const e = f1Eval(g.s('4.0.1')); return e.feasible ? e.binding.toUpperCase() : undefined; } },
      '4.0.1': { set: ['O1', 'O2', 'O5', 'O6', 'O7'], w: 15, pf: g => (f1Decision(g.s('4.0.1')).valid ? 8 / 15 : 0) },
      '4.0.2': { v: 8200, tol: 1, w: 5, eng: g => f1Eval(g.s('4.0.1')).kg }, '4.0.3': { v: 35, tol: 0.1, w: 5, eng: g => f1Eval(g.s('4.0.1')).m3 },
      '4.0.4': { v: 60, tol: 0.1, w: 5, eng: g => f1Eval(g.s('4.0.1')).rev }, '4.0.5': { v: 5, tol: 0.1, w: 5, eng: g => f1Eval(g.s('4.0.1')).rev - 55 },
    },
    dq: g => f1Decision(g.s('4.0.1')), // engine kiểm tra lại mọi ràng buộc từ danh sách đơn và duyệt cả 256 tập đơn
  },
  F2: {
    ticks: { 1: [1, 2, 3, 5, 8], 3: [2, 5, 6, 8] },
    f: {
      '2.0.1': { v: 295, tol: 0 }, '2.0.2': { v: 275, tol: 0 }, '2.0.3': { s: 'W1' }, '2.0.4': { v: 80, tol: 0 }, '2.0.5': { v: 32.0, tol: 0.01 },
      '4.0.1': { v: 6, tol: 0 }, '4.0.2': { v: 540, tol: 0.1 }, '4.0.3': { v: 610, tol: 0.1 }, '4.0.4': { v: 660, tol: 0.1 }, '4.0.5': { set: ['P2', 'P3', 'P4'] }, '4.0.6': { s: 'P2' },
      ...f2Cells,
      '5.1.1': { v: 614, tol: 0.1, w: 6, eng: g => f2Eval(f2Orders(g)).cost }, '5.1.2': { v: 3, tol: 0, w: 3, eng: g => f2Eval(f2Orders(g)).n },
      '5.1.3': { s: 'W5', w: 4 }, '5.1.4': { v: 100, tol: 0.1, w: 4, eng: g => 714 - f2Eval(f2Orders(g)).cost },
    },
    dq: g => f2Decision(f2Orders(g)), // engine chạy lại từng tuần: tồn kho, bội số 25, tối thiểu 50, trần 150, tối đa 4 đơn
  },
  F3: {
    ticks: { 1: [3, 4, 5, 7], 3: [5, 6, 7, 8] },
    f: {
      '2.0.1': { v: 13.33, tol: 0.01 }, '2.0.2': { v: 15.00, tol: 0.01 }, '2.0.3': { nums: [6.67, 10.00], tol: 0.01 }, '2.0.4': { pf: g => (strip(g.s('2.0.4')) === 'B1B1B2' ? 1 : 0) }, '2.0.5': { v: 15.33, tol: 0.01 },
      '4.0.1': { v: 20.2, tol: 0.1 }, '4.0.2': { v: 4.3, tol: 0.1 }, '4.0.3': { v: 51.6, tol: 0.1 }, '4.0.4': { v: 0, tol: 0 }, '4.0.5': { s: 'V4' },
      '5.0.1': { pf: g => (strip(g.s('5.0.1')).replace(/[^V\d]/g, '') === 'V1V2V4V5V3' ? 1 : 0) }, '5.0.2': { v: 268.4, tol: 0.1 }, '5.0.3': { v: 329.1, tol: 0.1 },
      '5.0.4': { pf: g => { const t = g.s('5.0.4'); return /^NO/.test(t) ? (t.includes('V2') ? 1 : 0.5) : 0; } }, '5.0.5': { v: 2, tol: 0 },
      '6.0.1': { w: 6, pf: f3Pf }, '6.0.2': { w: 6, pf: f3Pf },
      '6.0.3': { v: 156.4, tol: 0.1, w: 5, eng: g => f3Eval({ B1: plan3(g)[0].match(/V[1-5]/g) || [], B2: plan3(g)[1].match(/V[1-5]/g) || [] }).cost },
      '6.0.4': { v: 1, tol: 0, w: 4, eng: g => f3Eval({ B1: plan3(g)[0].match(/V[1-5]/g) || [], B2: plan3(g)[1].match(/V[1-5]/g) || [] }).notices },
      '6.0.5': { s: 'TERMINAL OPERATIONS MANAGER', w: 4, eng: g => { const e = f3Eval({ B1: plan3(g)[0].match(/V[1-5]/g) || [], B2: plan3(g)[1].match(/V[1-5]/g) || [] }); return Number.isFinite(e.cost) ? e.approval : undefined; } },
    },
    dq: g => f3Decision(...plan3(g)), // engine duyệt mọi cách xếp 5 tàu vào 2 bến và mọi thứ tự, tính lại giờ bắt đầu với bến B2 đóng cửa
  },
};
