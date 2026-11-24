// Đáp án chuẩn của 12 case SCM, lấy từ "Part II – Solutions and answer keys" của SC_Case_Bank (đã tính sẵn trong tài liệu).
// Khóa ô nhập: "bước.bảng.dòng[.cột]" (bảng và dòng đánh số như trong form, dòng 1 là dòng đầu tiên sau dòng tiêu đề, cột mặc định 1).
//   ticks[bước] = các dòng ĐÚNG (1-based). f[khóa] = { v (số) | s (chữ) | set (danh sách mã) | nums (nhiều số), tol (sai số tuyệt đối) | rel (tương đối), w (trọng số điểm), ft (công thức "tính tiếp" từ số của người chơi) }.
//   dq(g) trả về { dq: 0..100, valid: true/false } — chất lượng quyết định và quyết định có hợp lệ không. g.s(khóa) = chữ đã chuẩn hóa, g.a(khóa) = số.
//   ft dùng a('bước.bảng.dòng') để lấy số người chơi đã gõ.
import { b3Decision, d3Decision, c3Eval, c3Optimum, c3Decision, a3Eval, a3Decision } from './scm-engines.js';
import { c2Eval, c2Code, c2Decision, c2BreakEven } from './scm-engines2.js';
const c3m = g => [1, 2, 3, 4].map(r => [1, 2, 3].map(c => g.a(`6.0.${r}.${c}`) || 0)); // ma trận phân bổ C3 người chơi nhập
export const KEYS = {
  A1: {
    ticks: { 1: [2, 3, 4, 6, 7, 8, 9, 14] },
    f: {
      '2.0.1': { v: 75.45, tol: 0.05 }, '2.0.2': { v: 25225.45, rel: 0.001 }, '2.0.3': { v: 662168062, rel: 0.002 }, '2.0.4': { v: 66216806, rel: 0.002 }, '2.0.5': { v: 58270789, rel: 0.002 },
      '3.0.1': { v: 4725000, rel: 0.01 }, '3.0.2': { v: 2231250, rel: 0.01 }, '3.0.3': { v: 6900000, rel: 0.01 },
      '4.0.1': { s: 'A2', w: 8 }, '4.0.2': { v: 126718845, rel: 0.005, w: 7, ft: "a('2.0.4')+a('2.0.5')+({A:a('3.0.1'),A2:a('3.0.2'),B:a('3.0.3')})[s('4.0.1')]" },
    },
    dq: g => { const c = g.s('4.0.1'); return { A: { dq: 47, valid: true }, A2: { dq: 100, valid: true }, B: { dq: 0, valid: true }, C: { dq: 0, valid: false } }[c] || { dq: 0, valid: false }; },
    star: { maxWrong: 2, minFound: [1, 7] },
  },
  A2: {
    f: {
      '1.0.1.2': { s: 'ADD' }, '1.0.2.2': { s: 'ADD' }, '1.0.3.2': { s: 'EXCLUDE' }, '1.0.4.2': { s: 'ADD' }, '1.0.5.2': { s: 'ADD' }, '1.0.6.2': { s: 'DEDUCT' }, '1.0.7.2': { s: 'EXCLUDE' }, '1.0.8.2': { s: 'EXCLUDE' }, '1.0.9.2': { s: 'EXCLUDE' }, '1.0.10.2': { s: 'EXCLUDE' },
      '2.0.1': { v: 19.92, rel: 0.005 }, '2.0.2': { v: 19.75, rel: 0.005 }, '2.0.3': { v: 238864, rel: 0.005 }, '2.0.4': { v: 892152, rel: 0.005 },
      '4.0.1': { v: 105056469, rel: 0.01 }, '4.0.2': { v: 337944787, rel: 0.01 }, '4.0.3': { v: 3134730, rel: 0.01 }, '4.0.4': { v: 11152178, rel: 0.01 }, '4.0.5': { v: 87757123, rel: 0.01 },
      '5.1.1': { v: 501588290, rel: 0.01, w: 1 }, '5.1.2': { v: 236720279, rel: 0.01, w: 1 }, '5.1.3': { v: 518054609, rel: 0.01, w: 1 }, '5.1.4': { v: 253186598, rel: 0.01, w: 1 }, '5.1.5': { s: 'CD', w: 8 }, '5.1.6': { s: 'CFO', w: 4 },
    },
    ticks: { 3: [1, 3, 4] },
    dq: g => ({ AD: { dq: 6, valid: true }, CD: { dq: 100, valid: true }, AK: { dq: 0, valid: true }, CK: { dq: 94, valid: true } }[g.s('5.1.5')] || { dq: 0, valid: false }),
  },
  A3: {
    f: (() => {
      const code = [null, 'H', 'V', 'C', 'F', 'O', 'E', 'V', 'H', 'F', 'V', 'C', 'O', 'H', 'E', 'V', 'F', 'H', 'O', 'E', 'V', 'C', 'F', 'H', 'V'], f = {};
      for (let r = 1; r <= 6; r++) for (let k = 0; k < 4; k++) f[`1.0.${r}.${1 + k * 2}`] = { s: code[k * 6 + r] };
      Object.assign(f, {
        '2.0.1': { v: 21, tol: 0 }, '2.0.2': { v: 87.5, tol: 0.1 }, '2.0.3': { v: 26685.5, tol: 1 }, '2.0.4': { v: 89.9, tol: 0.1 }, '2.0.5': { v: 18, tol: 0 },
        '4.0.1': { v: 275.6, rel: 0.01, w: 3 }, '4.0.2': { v: 31.1, rel: 0.01, w: 3 }, '4.0.3': { v: 8.6, rel: 0.02, w: 3 }, '4.0.4': { v: 409.8, rel: 0.01, w: 3 }, '4.0.5': { v: 20.0, rel: 0.02, w: 2 }, '4.0.6': { v: 37.59, rel: 0.02, w: 3 }, '4.0.7': { v: 72.5, rel: 0.01, w: 3 },
        '5.1.1': { v: 820.2, rel: 0.01, w: 3 }, '5.1.2': { v: 602.3, rel: 0.01, w: 3 }, '5.1.3': { v: 836.6, rel: 0.01, w: 3 }, '5.1.4': { v: 543.7, rel: 0.01, w: 3 }, '5.1.5': { v: 811.7, rel: 0.01, w: 3 }, '5.1.6': { v: 618.7, rel: 0.01, w: 3 }, '5.1.7': { set: ['S3', 'S4', 'S5', 'S6'], w: 2 },
        '6.0.1': { s: 'D-D-D-R-Y', w: 8 }, '6.0.2': { v: 858.2, rel: 0.01, w: 4, eng: g => a3Eval(g.s('6.0.1')).worst }, '6.0.3': { v: 0, tol: 0.5, w: 3, eng: g => a3Eval(g.s('6.0.1')).aeo }, '6.0.4': { s: 'CFO', w: 3, eng: g => a3Eval(g.s('6.0.1')).approval }, '6.0.5': { v: 218.0, rel: 0.02, w: 2, eng: g => a3Eval('DDDDY').exp - a3Eval(g.s('6.0.1')).exp },
      });
      return f;
    })(),
    ticks: { 3: [2, 4, 5, 10] },
    dq: g => a3Decision(g.s('6.0.1')),
  },
  B1: {
    ticks: { 1: [3, 6, 7, 8, 9, 10, 11, 14] },
    f: {
      '2.0.1': { v: 57.0, tol: 0.05 }, '2.0.2': { v: 73.7, tol: 0.05 }, '2.0.3': { v: 28465.0, tol: 0.05 }, '2.0.4': { v: 28398.0, tol: 0.05 },
      '3.0.1': { v: 753774206, tol: 1000 }, '3.0.2': { v: 753474956, tol: 1000 }, '3.0.3': { v: 752272545, tol: 1000 },
      '4.0.1': { s: 'C', w: 8 }, '4.0.2': { v: 1501661, tol: 1000, w: 7, ft: "Math.max(a('3.0.1'),a('3.0.2'),a('3.0.3'))-({A:a('3.0.1'),B:a('3.0.2'),C:a('3.0.3')})[s('4.0.1')]" },
    },
    dq: g => ({ C: { dq: 100, valid: true }, B: { dq: 20, valid: true }, A: { dq: 0, valid: true } }[g.s('4.0.1')] || { dq: 0, valid: false }),
  },
  B2: {
    ticks: { 1: [2, 4, 5, 7, 10], 3: [1, 4, 6, 7] },
    f: {
      '2.0.1': { v: 186000, rel: 0.001 }, '2.0.2': { v: 3720, rel: 0.001 }, '2.0.3': { v: 204600, rel: 0.001 }, '2.0.4': { v: 18600, rel: 0.001 }, '2.0.5': { v: 279, tol: 0.5 }, '2.0.6': { s: '9NOV' },
      '4.0.1': { v: 174817, rel: 0.005 }, '4.0.2': { v: 178495, rel: 0.005 }, '4.0.3': { v: 180652, rel: 0.005 }, '4.0.4': { v: 175795, rel: 0.005 },
      '5.0.1': { s: 'O3', w: 10 }, '5.0.2': { v: 178367, rel: 0.005, w: 5 }, '5.0.3': { v: 4.79, tol: 0.05, w: 5 }, '5.0.4': { set: ['I', 'S', 'B'], w: 5 },
    },
    dq: g => ({ O3: { dq: 100, valid: true }, O2: { dq: 63, valid: true }, O4: { dq: 17, valid: true }, O1: { dq: 0, valid: true } }[g.s('5.0.1')] || { dq: 0, valid: false }),
  },
  B3: {
    ticks: { 1: [1, 2, 6, 8, 10], 3: [3, 8, 9, 10] },
    f: {
      '2.0.1': { v: 3150, tol: 0.5 }, '2.0.2': { v: 2.2, tol: 0.02 }, '2.0.3': { v: 58.8, tol: 0.1 }, '2.0.4': { v: 2.34, tol: 0.02 }, '2.0.5': { v: 0.46, tol: 0.02 },
      '4.0.1': { v: 129.4, tol: 0.5 }, '4.0.2': { v: 119.7, tol: 0.5 }, '4.0.3': { v: 91.6, tol: 0.5 }, '4.0.4': { v: 87.4, tol: 0.5 }, '4.0.5': { v: 88.5, tol: 0.5 },
      '5.1.1': { v: 484.4, tol: 1, w: 3 }, '5.1.2': { v: 611.2, tol: 1, w: 3 }, '5.1.3': { v: 572.7, tol: 1, w: 3 }, '5.1.4': { v: 540.9, tol: 1, w: 3 }, '5.1.5': { v: 577.1, tol: 1, w: 3 }, '5.1.6': { set: ['P1', 'P2', 'P3', 'P5'], w: 5 },
      '6.0.1': { s: 'T3-T4-T4-T2-T3', w: 8 }, '6.0.2': { s: 'A+B', w: 4 },
      // ba ô sau chấm theo CHÍNH kế hoạch người chơi chọn (engine tính lại), không phải theo kế hoạch tối ưu
      '6.0.3': { v: 565.0, tol: 1, w: 3, eng: g => b3Decision(g.s('6.0.1'), g.s('6.0.2')).e?.net }, '6.0.4': { v: 61.0, tol: 1, w: 3, eng: g => b3Decision(g.s('6.0.1'), g.s('6.0.2')).e?.unc }, '6.0.5': { v: 24.1, tol: 1, w: 2, eng: g => { const d = b3Decision(g.s('6.0.1'), g.s('6.0.2')); return d.e ? d.e.net - d.o.base : undefined; } },
    },
    dq: g => b3Decision(g.s('6.0.1'), g.s('6.0.2')), // engine duyệt 3.125 kế hoạch × 4 gói giảm thiểu
  },
  C1: {
    ticks: { 1: [1, 4, 5, 7, 8] },
    f: {
      '2.0.1': { v: 150, tol: 1 }, '2.0.2': { v: 74.2, tol: 1 }, '2.0.3': { v: -73.2, tol: 1 }, '2.0.4': { v: 82.5, tol: 1 }, '2.0.5': { v: 9383.5, tol: 1 },
      '3.0.1': { v: 9181.0, tol: 1 }, '3.0.2': { v: 9225.3, tol: 1 }, '3.0.3': { v: 9144.5, tol: 1 },
      '4.0.1': { s: 'C', w: 8 }, '4.0.2': { set: ['B'], w: 6 }, '4.0.3': { v: 28684384, rel: 0.01, w: 6, ft: "(9383.5-({A1:a('2.0.5'),A2:a('3.0.1'),B:a('3.0.2'),C:a('3.0.3')})[s('4.0.1')])*120000" },
    },
    dq: g => ({ C: { dq: 100, valid: true }, A2: { dq: 85, valid: true }, A1: { dq: 0, valid: true }, B: { dq: 0, valid: false } }[g.s('4.0.1')] || { dq: 0, valid: false }),
  },
  C2: {
    ticks: { 3: [2, 3, 4] },
    f: {
      '1.0.1': { s: 'A' }, '1.0.2': { s: 'A' }, '1.0.3': { s: 'A' }, '1.0.4': { s: 'B' }, '1.0.5': { s: 'B' }, '1.0.6': { s: 'B' }, '1.0.7': { s: 'C' }, '1.0.8': { s: 'C' }, '1.0.9': { s: 'C' }, '1.0.10': { s: 'C' },
      '2.0.1': { s: 'LEVERAGE' }, '2.0.2': { s: 'LEVERAGE' }, '2.0.3': { s: 'STRATEGIC' }, '2.0.4': { s: 'NONCRITICAL' }, '2.0.5': { s: 'BOTTLENECK' },
      '4.0.1': { v: 1.21, tol: 0.002 }, '4.0.2': { v: 58140, rel: 0.002 }, '4.0.3': { v: 50.368, rel: 0.002 }, '4.0.4': { v: 50.053, rel: 0.002 }, '4.0.5': { v: 51.88, rel: 0.002 }, '4.0.6': { v: 49.754, rel: 0.002 },
      '5.0.1': { s: 'S3', w: 10, pf: g => (c2Decision(g.s('5.0.1')).valid ? 0.5 : 0) }, '5.0.2': { v: 49.754, rel: 0.002, w: 5, eng: g => { const e = c2Eval(c2Code(g.s('5.0.1'))); return e ? e.ev : NaN; } }, '5.0.3': { v: 51.88, rel: 0.002, w: 5, eng: g => { const e = c2Eval(c2Code(g.s('5.0.1'))); return e ? e.worst : NaN; } }, '5.0.4': { v: 3.72, tol: 0.05, w: 5, eng: g => c2BreakEven(c2Code(g.s('5.0.1'))) }, '5.0.5': { s: 'CFO', w: 5, eng: g => { const e = c2Eval(c2Code(g.s('5.0.1'))); return e ? e.approval : undefined; } }, '5.0.6': { set: ['S2', 'S4', 'S5'], w: 2 },
    },
    dq: g => c2Decision(g.s('5.0.1')), // engine tính lại 6 cấu trúc × 3 kịch bản nhựa, lọc theo trần ngân sách 52,5 tỷ
  },
  C3: {
    ticks: { 1: [1, 2, 3, 5, 6], 3: [1, 5, 8, 9] },
    f: {
      '2.0.1': { v: 0.4619, tol: 0.0005 }, '2.0.2': { v: 0.4422, tol: 0.0005 }, '2.0.3': { v: 0.5131, tol: 0.0005 }, '2.0.4': { v: 0.5585, tol: 0.0005 }, '2.0.5': { v: 1.85, tol: 0.01 },
      '4.0.1': { v: 449.84, rel: 0.005 }, '4.0.2': { v: 1000, tol: 1 }, '4.0.3': { v: 4, tol: 0 }, '4.0.4': { v: 20, tol: 0.1 }, '4.0.5': { v: 64.27, rel: 0.01, ft: "514.12-a('4.0.1')" },
      '5.3.1': { v: 485.48, tol: 0.1 }, '5.3.2': { v: 529.57, tol: 0.1 }, '5.3.3': { v: 523.37, tol: 0.1 }, '5.3.4': { set: ['Y'], w: 3 }, '5.3.5': { v: 3, tol: 0, w: 2 }, '5.3.6': { v: 12.9, tol: 0.05, w: 1 },
      '6.0.1.1': { v: 0, tol: 1, w: 0.8 }, '6.0.1.2': { v: 0, tol: 1, w: 0.8 }, '6.0.1.3': { v: 0, tol: 1, w: 0.8 },
      '6.0.2.1': { v: 0, tol: 1, w: 0.8 }, '6.0.2.2': { v: 178, tol: 1, w: 0.8 }, '6.0.2.3': { v: 200, tol: 1, w: 0.8 },
      '6.0.3.1': { v: 400, tol: 1, w: 0.8 }, '6.0.3.2': { v: 0, tol: 1, w: 0.8 }, '6.0.3.3': { v: 0, tol: 1, w: 0.8 },
      '6.0.4.1': { v: 80, tol: 1, w: 0.8 }, '6.0.4.2': { v: 142, tol: 1, w: 0.8 }, '6.0.4.3': { v: 0, tol: 1, w: 0.8 },
      '6.1.1': { v: 528.05, tol: 0.3, w: 5, eng: g => c3Eval(c3m(g)).cost }, '6.1.2': { v: 3, tol: 0, w: 3, eng: g => c3Eval(c3m(g)).used }, '6.1.3': { v: 6.3, tol: 0.1, w: 3, eng: g => c3Eval(c3m(g)).annual }, '6.1.4': { s: 'CFO', w: 3, eng: g => c3Eval(c3m(g)).approval }, '6.1.5': { v: 1.52, tol: 0.1, w: 4, eng: g => c3Optimum(true).Y.cost - c3Eval(c3m(g)).cost },
    },
    dq: g => c3Decision(c3m(g)),
  },
  D1: {
    ticks: { 1: [1, 2, 4, 5] },
    f: {
      '2.0.1': { v: 95, tol: 0 }, '2.0.2': { v: 1026.0, tol: 0.1 }, '2.0.3': { v: 666.9, tol: 0.1 }, '2.0.4': { v: 428.2, tol: 0.1 }, '2.0.5': { v: 238.7, tol: 0.1 },
      '3.0.1': { v: 31.2, tol: 0.2 }, '3.0.2': { v: 39.7, tol: 0.2 }, '3.0.3': { v: 5.5, tol: 0.3 }, '3.0.4': { v: -20.5, tol: 0.3 }, '3.0.5': { v: 45.0, tol: 0.3 },
      '4.0.1': { s: 'C', w: 10 }, '4.0.2': { v: 9.3, tol: 0.1, w: 5 }, '4.0.3': { set: ['A', 'C'], w: 5 }, '4.0.4': { v: 138.7, tol: 0.2, w: 5 },
    },
    dq: g => ({ C: { dq: 100, valid: true }, A: { dq: 40, valid: true }, A330: { dq: 3, valid: true }, B: { dq: 0, valid: true } }[g.s('4.0.1')] || { dq: 0, valid: false }),
  },
  D2: {
    ticks: { 1: [2, 3, 4, 7], 3: [3, 4, 7] },
    f: {
      '2.0.1': { v: 3192.0, tol: 0.5 }, '2.0.2': { v: 957.6, tol: 0.5 }, '2.0.3': { v: 1898.3, tol: 0.5 }, '2.0.4': { v: 336.1, tol: 0.5 }, '2.0.5': { v: 23788, tol: 15 },
      '4.0.1': { v: 57.1, tol: 0.5 }, '4.0.2': { v: 505.0, tol: 0.5 }, '4.0.3': { v: 2617.4, tol: 0.5 }, '4.0.4': { v: 130.9, tol: 0.5 }, '4.0.5': { v: -37.9, tol: 0.5 }, '4.0.6': { v: 431.2, tol: 0.5 }, '4.0.7': { v: -65.1, tol: 0.5 },
      '5.0.1': { s: 'C', w: 8 }, '5.0.2': { s: 'L3', w: 6 }, '5.0.3': { v: 1390.6, tol: 1, w: 4 }, '5.0.4': { v: 1643.9, tol: 1, w: 4 }, '5.0.5': { v: 749.5, tol: 1, w: 4 }, '5.0.6': { s: 'ADVISORYBOARD', w: 4 },
    },
    dq: g => ({ 'C|L3': { dq: 100, valid: true }, 'C|L1': { dq: 66, valid: true }, 'H|L3': { dq: 34, valid: true }, 'H|L1': { dq: 0, valid: true } }[g.s('5.0.1') + '|' + g.s('5.0.2')] || { dq: 0, valid: false }),
  },
  D3: {
    ticks: { 1: [1, 3, 6, 7, 8, 9], 3: [1, 2, 8, 9] },
    f: {
      '2.0.1': { v: 13750, tol: 1 }, '2.0.2': { nums: [8250, 5500], tol: 1 }, '2.0.3': { v: 9600, tol: 1 }, '2.0.4': { v: 3399, tol: 1.5 }, '2.0.5': { v: -1458, tol: 1.5 },
      '4.0.1': { v: 1.17, tol: 0.01 }, '4.0.2': { v: 1.17, tol: 0.01 }, '4.0.3': { v: 3.81, tol: 0.02 }, '4.0.4': { v: 5.88, tol: 0.02 }, '4.0.5': { s: 'YES' },
      '5.0.1': { v: 6.25, tol: 0.02, w: 3 }, '5.0.2': { v: 5.07, tol: 0.02, w: 3 }, '5.0.3': { v: 4.91, tol: 0.02, w: 3 }, '5.0.4': { set: ['B', 'C'], w: 3 }, '5.0.5': { s: 'EQUITYCAP', w: 2 }, '5.0.6': { v: 1.08, tol: 0.01, w: 1 },
      '6.0.1': { s: 'M', w: 4 }, '6.0.2': { s: 'LEASE', w: 4 }, '6.0.3': { s: 'F1', w: 4 }, // các ô sau tính lại bằng engine từ chính lựa chọn quy mô / địa điểm / vốn của người chơi
      '6.0.4': { v: 5.07, tol: 0.02, w: 3, eng: g => { const d = d3Decision(g.s('6.0.1'), g.s('6.0.2'), g.s('6.0.3')); return d.e ? d.e.enpv / 1000 : undefined; } },
      '6.0.5': { v: 1.08, tol: 0.01, w: 2, eng: g => d3Decision(g.s('6.0.1'), g.s('6.0.2'), g.s('6.0.3')).e?.minDscr },
      '6.0.6': { v: 4.2, tol: 0.02, w: 2, eng: g => { const d = d3Decision(g.s('6.0.1'), g.s('6.0.2'), g.s('6.0.3')); return d.e ? d.e.shortfall / 1000 : undefined; } },
      '6.0.7': { v: 5.5, tol: 0.02, w: 2, eng: g => { const d = d3Decision(g.s('6.0.1'), g.s('6.0.2'), g.s('6.0.3')); return d.e ? d.e.equity / 1000 : undefined; } },
      '6.0.8': { s: 'CFO', w: 2, eng: g => { const d = d3Decision(g.s('6.0.1'), g.s('6.0.2'), g.s('6.0.3')); return d.e ? d.e.approval.toUpperCase() : undefined; } },
    },
    dq: g => d3Decision(g.s('6.0.1'), g.s('6.0.2'), g.s('6.0.3')), // engine duyệt 18 tổ hợp, 3 giới hạn, dữ liệu đã cập nhật
  },
};
// Ngân hàng case 2 (E1–E3, F1–F3) nằm ở scm-keys2.js và được nạp riêng trong scm.js (thiếu file này thì chỉ mất 6 case đó, app vẫn chạy)
