// TeaLab (Tiệm Trà của Lame): dữ liệu nội dung. Không có luật chơi ở đây (xem tl-engine.js).
// Nguồn: đặc tả “Tiệm Trà của Lame” v2.0 + tea_sim2.py (giai đoạn 1). Tiền: đồng (số nguyên); hiển thị theo nghìn đồng (k).
export const K = 1000;
export const SESS_MIN = 240, SLOT_MIN = 30;
export const SNAME = ['Sáng', 'Trưa', 'Chiều', 'Tối', 'Đêm'];
export const SHOURS = ['06:00–10:00', '10:00–14:00', '14:00–18:00', '18:00–22:00', '22:00–24:00'];
export const SSTART = [6, 10, 14, 18, 22];

// ---------- tham số (Phụ lục B) ----------
export const PARAMS = {
  startCash: 3000 * K, startRep: 50, startLoyal: 60, loyalMax: [0, 90, 140, 220, 300],
  fixedDay: [0, 550 * K, 1750 * K, 4100 * K, 6700 * K], ap: [0, 6, 7, 8, 9], apCarry: 2, items: [0, 4, 8, 12, 12], staffMax: [0, 0, 3, 6, 8],
  mloc: [0, 1.0, 2.5, 3.5, 4.7], branch: { loc: 1.6, mix: { VP: 0.6, HS: 1.7, DK: 0.8, KQ: 0.8 }, crew: 2, wage: 110 * K, fee: 40 * K }, // giai đoạn 4: chi nhánh 2 (nhiều học sinh), có kho và nhân viên riêng; chuyển hàng giữa hai chi nhánh tốn phí // hiệu chỉnh bằng harness để lãi/ngày đạt dải mục tiêu của đặc tả (mục 9.3) khi đã tính lương nhân viên
  delShare: 0.35, shipSec: 420, shipFee: 12 * K, upgrade3: { cash: 60000 * K, rep: 65 }, upgrade4: { cash: 160000 * K, rep: 72, dqi: 55 },
  overheadBar: 60, overheadCash: 25, deliveryFee: 15 * K, discountQty: 150, discountPct: 0.10,
  sleepFee: 0.05, pSubst: 0.4, errProb: 0.06, wageLive: [0, 0, 120 * K], overtime: 1.5, holidayWage: 3,
  xuPer100k: 1, xuCapDay: 30, starXu: [80, 160, 320], starIp: [2, 4, 8],
  upgrade2: { cash: 20000 * K, rep: 55, days: 14 }, priceBand: [0.7, 1.5], expressMul: 1.3, expressFee: 30 * K,
  maxStaff: 3, promoBoost: 0.10, difficulty: { nhan: { ap: 1.5, rel: 0.15, mag: 0.7, sig: 0.7, score: 0.8 }, chuan: { ap: 1, rel: 0, mag: 1, sig: 1, score: 1 }, kho: { ap: 0.75, rel: -0.1, mag: 1.2, sig: 1.2, score: 1.15 } },
};

// ---------- món, nguyên liệu (tea_sim2) ----------
// p: giá tham chiếu (k); svc: giây pha; temp: cold/hot
export const ITEMS = {
  tra_da:   { name: 'Trà đá chanh', p: 14, svc: 45, temp: 'cold', ing: ['ly', 'tra', 'chanh', 'duong', 'da'], stage: 1, zh: '柠檬茶 níngméng chá' },
  tra_sua:  { name: 'Trà sữa trân châu', p: 28, svc: 150, temp: 'cold', ing: ['ly', 'tra', 'sua', 'tranchau', 'duong', 'da'], stage: 1, zh: '珍珠奶茶 zhēnzhū nǎichá' },
  tra_dao:  { name: 'Trà đào', p: 25, svc: 110, temp: 'cold', ing: ['ly', 'tra', 'dao', 'duong', 'da'], stage: 1, zh: '桃子茶 táozi chá' },
  tra_gung: { name: 'Trà gừng mật ong', p: 20, svc: 75, temp: 'hot', ing: ['ly', 'tra', 'gung', 'matong', 'duong'], stage: 1, zh: '姜茶 jiāng chá' },
  tra_vai:  { name: 'Trà vải', p: 26, svc: 100, temp: 'cold', ing: ['ly', 'tra', 'vai', 'duong', 'da'], stage: 2, zh: '荔枝茶 lìzhī chá' },
  tra_matcha: { name: 'Matcha sữa', p: 32, svc: 160, temp: 'cold', ing: ['ly', 'matcha', 'sua', 'duong', 'da'], stage: 2, zh: '抹茶牛奶 mǒchá niúnǎi' },
  tra_cd:   { name: 'Trà chanh dây', p: 22, svc: 90, temp: 'cold', ing: ['ly', 'tra', 'chanhday', 'duong', 'da'], stage: 2, zh: '百香果茶 bǎixiāngguǒ chá' },
  tra_cuc:  { name: 'Trà hoa cúc mật ong', p: 24, svc: 70, temp: 'hot', ing: ['ly', 'hoacuc', 'matong', 'duong'], stage: 2, zh: '菊花茶 júhuā chá' },
  tra_oi:   { name: 'Trà ổi hồng', p: 27, svc: 105, temp: 'cold', ing: ['ly', 'tra', 'oi', 'duong', 'da'], stage: 3, zh: '番石榴茶 fānshíliú chá' },
  tra_sen:  { name: 'Trà sen vàng', p: 30, svc: 95, temp: 'cold', ing: ['ly', 'sen', 'duong', 'da'], stage: 3, zh: '莲花茶 liánhuā chá' },
  tra_nuong: { name: 'Trà sữa nướng', p: 34, svc: 170, temp: 'hot', ing: ['ly', 'tra', 'sua', 'matong', 'duong'], stage: 3, zh: '烤奶茶 kǎo nǎichá' },
  tra_dua:  { name: 'Trà dừa', p: 29, svc: 100, temp: 'cold', ing: ['ly', 'tra', 'dua', 'duong', 'da'], stage: 3, zh: '椰子茶 yēzi chá' },
  // món theo mùa (không tính vào số món tối đa): túi / hộp quà trà Tết, bán 20/01 đến 09/02 (ngày 51–71)
  qua_tet:  { name: 'Quà trà Tết', p: 60, svc: 40, temp: 'cold', ing: ['hopqua', 'tra'], stage: 1, seasonal: [51, 71], gift: true, zh: '新年茶礼 xīnnián chálǐ' },
};
export const ITEM_ORDER = Object.keys(ITEMS);
// giá/phần (k), số ngày dùng được kể cả ngày nhận, nhóm
export const ING = {
  ly: { name: 'Ly + nắp', c: 1.0, shelf: 365, grp: 'dry' }, tra: { name: 'Lá trà', c: 0.9, shelf: 90, grp: 'dry' },
  duong: { name: 'Đường', c: 0.5, shelf: 180, grp: 'dry' }, da: { name: 'Đá', c: 0.6, shelf: 1, grp: 'fresh' },
  chanh: { name: 'Chanh', c: 1.2, shelf: 3, grp: 'fresh' }, sua: { name: 'Sữa tươi', c: 4.0, shelf: 3, grp: 'fresh' },
  tranchau: { name: 'Trân châu', c: 3.2, shelf: 2, grp: 'fresh' }, dao: { name: 'Đào', c: 6.0, shelf: 2, grp: 'fresh' },
  gung: { name: 'Gừng', c: 1.5, shelf: 7, grp: 'fresh' }, matong: { name: 'Mật ong', c: 3.0, shelf: 180, grp: 'dry' },
  vai: { name: 'Vải', c: 5.0, shelf: 2, grp: 'fresh' }, matcha: { name: 'Bột matcha', c: 5.5, shelf: 90, grp: 'dry' },
  chanhday: { name: 'Chanh dây', c: 4.0, shelf: 3, grp: 'fresh' }, hoacuc: { name: 'Hoa cúc', c: 2.0, shelf: 120, grp: 'dry' },
  oi: { name: 'Ổi hồng', c: 4.5, shelf: 2, grp: 'fresh' }, sen: { name: 'Trà sen', c: 3.5, shelf: 120, grp: 'dry' }, dua: { name: 'Nước dừa', c: 4.0, shelf: 3, grp: 'fresh' },
  hopqua: { name: 'Hộp / túi quà', c: 14.0, shelf: 365, grp: 'dry' },
};
export const ING_ORDER = Object.keys(ING);
export const FRESH_C_ONLY = true; // nhà cung cấp C chỉ bán nhóm tươi

// ---------- nhà cung cấp (Phụ lục B.3; khi lệch mục 5.7 thì Phụ lục B thắng) ----------
export const SUPPLIERS = {
  A: { name: 'A · Chợ đầu mối', mul: 1.00, rho: 0.95, q: 0.97, qsd: 0.04, fee: 15 * K, express: false, stage: 1, closed: [[32, 33], [65, 74]], note: 'Ổn định, giá chợ, chất lượng cao.' },
  B: { name: 'B · Đại lý', mul: 0.93, rho: 0.85, q: 0.90, qsd: 0.06, fee: 15 * K, express: true, stage: 1, closed: [[66, 71]], note: 'Rẻ hơn, hay trễ hoặc thiếu; có giao khẩn.' },
  D: { name: 'D · Nhà cung cấp mới', mul: 0.85, rho: 0.70, q: 0.88, qsd: 0.10, fee: 15 * K, express: false, stage: 2, needFlag: 'supD', closed: [], note: 'Rẻ nhất nhưng hay thất thường, chất lượng chưa rõ.' },
  C: { name: 'C · Nông trại sạch', mul: 1.05, rho: 0.90, q: 1.05, qsd: 0.04, fee: 15 * K, express: false, stage: 2, fresh: true, closed: [[63, 73]], note: 'Chỉ nhóm tươi, chất lượng rất cao; giao đầu S1, đặt trước 4 buổi.' },
};

// ---------- phân khúc khách (tea_sim2) ----------
export const SEG = {
  VP: { name: 'Văn phòng', beta: 0.9, theta: 1.40, sig: 0.18, pat: 200, conv: 0.50, cups: 1.15, taste: { tra_da: 0.3, tra_sua: 0.0, tra_dao: 0.5, tra_gung: 0.2, tra_vai: 0.3, tra_matcha: 0.4, tra_cd: 0.3, tra_cuc: 0.2 } },
  HS: { name: 'Học sinh, sinh viên', beta: 2.0, theta: 1.18, sig: 0.13, pat: 480, conv: 0.55, cups: 1.10, taste: { tra_da: 0.3, tra_sua: 0.9, tra_dao: 0.4, tra_gung: -0.2, tra_vai: 0.4, tra_matcha: 0.5, tra_cd: 0.6, tra_cuc: -0.3 } },
  DK: { name: 'Du khách, khách nhóm', beta: 0.6, theta: 1.90, sig: 0.20, pat: 600, conv: 0.50, cups: 1.60, taste: { tra_da: 0.0, tra_sua: 0.4, tra_dao: 0.6, tra_gung: 0.2, tra_vai: 0.5, tra_matcha: 0.3, tra_cd: 0.5, tra_cuc: 0.3 } },
  KQ: { name: 'Khách quen', beta: 1.0, theta: 1.40, sig: 0.20, pat: 600, conv: 0.80, cups: 1.20, taste: { tra_da: 0.3, tra_sua: 0.3, tra_dao: 0.3, tra_gung: 0.3, tra_vai: 0.3, tra_matcha: 0.3, tra_cd: 0.3, tra_cuc: 0.3 } },
};
export const SEGS = ['VP', 'HS', 'DK', 'KQ'];
// khẩu vị các món mới theo phân khúc (món chưa khai báo ở trên)
const NEWTASTE = { tra_oi: [0.3, 0.5, 0.5, 0.3], tra_sen: [0.5, 0.0, 0.5, 0.4], tra_nuong: [0.1, 0.8, 0.5, 0.3], tra_dua: [0.3, 0.6, 0.6, 0.3], qua_tet: [0.4, -1.5, 0.9, 1.1] };
for (const [it, v] of Object.entries(NEWTASTE)) SEGS.forEach((sg, i) => { SEG[sg].taste[it] = v[i]; });
export const BUYERS = { VP: [13, 14, 6, 5, 0], HS: [6, 4, 19, 6, 1], DK: [2, 4, 4, 8, 7], KQ: [4, 4, 5, 6, 2] };
export const PROFILE = [
  [0.03, 0.07, 0.34, 0.24, 0.12, 0.08, 0.07, 0.05],
  [0.03, 0.05, 0.09, 0.26, 0.32, 0.12, 0.08, 0.05],
  [0.04, 0.06, 0.08, 0.10, 0.14, 0.34, 0.14, 0.10],
  [0.05, 0.09, 0.18, 0.24, 0.17, 0.12, 0.09, 0.06],
  [0.30, 0.35, 0.25, 0.10],
];
export const DELTA = [0.20, 0.85, 0.90, 0.40, 0.25]; // nhiệt độ theo buổi

// ---------- lịch ----------
const MLEN = [31, 31, 28, 31, 30, 31]; // Dec 2026, Jan, Feb 2027, Mar...
const MNAME = [[2026, 12], [2027, 1], [2027, 2], [2027, 3], [2027, 4], [2027, 5]];
export function dateOf(d) { // ngày game d (1 = 01/12/2026, thứ Ba)
  let r = d - 1, m = 0; while (m < MLEN.length - 1 && r >= MLEN[m]) { r -= MLEN[m]; m++; }
  const dow = (d + 0) % 7; // 0 = thứ Hai … 6 = Chủ nhật (d=1 → thứ Ba)
  return { y: MNAME[m][0], m: MNAME[m][1], dd: r + 1, dow };
}
export const DOWN = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
export const dow = d => (d % 7); // d=1 → 1 (thứ Ba)
export const dayLabel = d => { const x = dateOf(d); return `${String(x.dd).padStart(2, '0')}/${String(x.m).padStart(2, '0')}`; };
export const dayKey = (m, dd) => (m === 12 ? dd : m === 1 ? 31 + dd : m === 2 ? 62 + dd : 90 + dd);

// ---------- thời tiết theo kịch bản (mục 8.9): [ngày đầu, ngày cuối, tmin, tmax, xác suất mưa nhỏ, kiểu] ----------
export const WEATHER_PLAN = [
  [1, 7, 17, 23, 0.05, 'cloud'], [8, 13, 15, 21, 0.03, 'cool'], [14, 14, 14, 17, 0.10, 'monsoon'], [15, 19, 14, 18, 0.25, 'gloom'], [20, 23, 16, 22, 0.05, 'warm'],
  [24, 25, 15, 20, 0.02, 'dry'], [26, 31, 17, 22, 0.35, 'showers'], [32, 35, 14, 19, 0.03, 'dry'], [36, 42, 9, 14, 0.03, 'cold'], [43, 49, 13, 19, 0.02, 'dry'],
  [50, 56, 15, 20, 0.0, 'drizzle'], [57, 62, 16, 22, 0.05, 'warm'], [63, 71, 17, 22, 0.30, 'humid'], [72, 76, 18, 24, 0.02, 'sunny'], [77, 83, 16, 20, 0.0, 'drizzle'], [84, 90, 20, 28, 0.02, 'hot'],
];
export const WEATHER_SEED = 20261201;
export const SKY_NAME = { cloud: 'Nhiều mây', cool: 'Se lạnh', monsoon: 'Gió mùa Đông Bắc', gloom: 'Âm u, lạnh', warm: 'Ấm', dry: 'Khô', showers: 'Mưa nhỏ rải rác', cold: 'Rét đậm', drizzle: 'Mưa phùn', humid: 'Ẩm, âm u', sunny: 'Nắng nhẹ', hot: 'Nắng ấm' };

// ---------- hệ số nhu cầu theo thứ (B.5): chuẩn hóa để trung bình tuần = 1 ----------
const HS_SCHOOL = [0.9, 0.7, 1.1, 1.0], HS_OFF = [0.8, 1.5, 1.3, 0.9];
function buildMdow() {
  const raw = { HS: {}, VP: {}, DK: {}, KQ: {} };
  for (let d = 0; d < 7; d++) {
    const off = d <= 4 ? 0 : d === 5 ? 0.4 : 1;
    raw.HS[d] = HS_SCHOOL.map((a, i) => (1 - off) * a + off * HS_OFF[i]);
    raw.VP[d] = Array(4).fill(d <= 4 ? 1 : d === 5 ? 0.6 : 0.4);
    raw.DK[d] = Array(4).fill([0.9, 0.9, 0.9, 0.9, 1.1, 1.3, 1.2][d]);
    raw.KQ[d] = Array(4).fill(1);
  }
  const out = { HS: {}, VP: {}, DK: {}, KQ: {} };
  for (const sg of Object.keys(raw)) {
    const scale = [0, 1, 2, 3].map(s => 7 / [0, 1, 2, 3, 4, 5, 6].reduce((a, d) => a + raw[sg][d][s], 0));
    for (let d = 0; d < 7; d++) out[sg][d] = raw[sg][d].map((v, s) => v * scale[s]);
  }
  return out;
}
export const MDOW = buildMdow();

// ---------- sửa đổi theo ngày lịch: [ngày đầu, ngày cuối, {phân khúc: [S1..S5] hoặc số}] ----------
const A = (v) => v; // viết gọn
export const DAYMODS = [
  [14, 46, { HS: [0.9, 1, 1, 1.2, 1] }],                                   // mùa thi
  [24, 24, { DK: [1, 1, 1, 1.8, 1.5] }], [25, 25, { DK: [1, 1.3, 1.3, 1.3, 1] }], // Noel
  [31, 31, { DK: [1, 1, 1, 1.7, 1.8] }],                                   // giao thừa dương lịch
  [32, 34, { VP: 0.25, DK: 1.3 }],                                         // Tết Dương
  [56, 60, { DK: 1.3, KQ: 1.3 }],                                          // chợ Tết
  [61, 61, { DK: [1.2, 1, 1, 1, 1], HS: [0.8, 0.8, 0.8, 0.8, 0.8] }],      // ông Công ông Táo
  [63, 75, { HS: 0.35 }],                                                  // học sinh nghỉ Tết
  [66, 72, { VP: 0.10 }],                                                  // công chức nghỉ Tết (28 tháng Chạp đến mùng 5)
  [67, 67, { KQ: [1.4, 1.4, 0.4, 0.4, 0.5], DK: [1.4, 1.4, 0.4, 0.4, 0.5], HS: [0.4, 0.4, 0.4, 0.4, 0.4] }], // giao thừa
  [68, 68, { VP: 0.25, HS: 0.25, DK: 0.25, KQ: 0.25 }],                    // mùng 1
  [69, 69, { VP: 0.35, HS: 0.35, DK: 0.35, KQ: 0.35 }], [70, 70, { VP: 0.5, HS: 0.5, DK: 0.5, KQ: 0.5 }], [71, 71, { VP: 0.7, HS: 0.7, DK: 0.7, KQ: 0.7 }],
  [76, 76, { DK: [1, 1, 1.6, 1.6, 1.6], HS: [1, 1, 1.3, 1.3, 1.3] }],      // Valentine
  [82, 82, { DK: [1.5, 1.5, 1, 1, 1] }],                                   // Rằm tháng Giêng
];
export const THETA_MODS = [[67, 68, 1.3]];     // giao thừa, mùng 1: θ × 1,3 (khách chấp nhận giá cao hơn)
export const HOLIDAY_WAGE = [32, 67, 68, 69, 70, 71]; // ngày lương lễ ×3 (quy ước game)
export const DEFAULT_CLOSED = { 68: [0, 1, 2, 3, 4] }; // mùng 1: mặc định đóng cửa
export const EXTRA_SESSION_DAYS = [24, 31, 67];       // có buổi S5

// giá chợ theo mùa (nhân với giá gốc): [ngày đầu, ngày cuối, {nguyên liệu: hệ số}]
export const SEASONAL = [
  [23, 25, { dao: 1.15, sua: 1.15 }], [56, 60, { dao: 1.22, sua: 1.22, duong: 1.15 }], [61, 62, { dao: 1.3, sua: 1.3, duong: 1.2 }], [63, 70, { dao: 1.2, sua: 1.2, duong: 1.15 }], [71, 73, { dao: 1.1, sua: 1.1 }],
];

// ---------- sự kiện theo ngày lịch (thư thông tin + hiệu ứng) ----------
export const CAL_NOTES = {
  1: ['Khai trương!', 'Ngày đầu tiên của mùa. Bán thử, xem giá và tồn kho, đừng ngại hỏi dữ liệu.'],
  12: ['Săn sale 12.12', 'Đại lý B giảm 8% nhóm khô trong ngày. Tích trữ nhóm khô có lợi, nhóm tươi thì hỏng nhanh.'],
  14: ['Gió mùa Đông Bắc về', 'Nhiệt độ tụt mạnh trong 24 giờ. Món nóng sẽ bán chạy hơn món lạnh. Mùa thi cũng bắt đầu: học sinh ghé quán buổi tối nhiều hơn.'],
  24: ['Đêm Giáng sinh', 'Du khách rất đông từ tối. Có buổi S5 (22:00 đến 24:00). Giá đào và sữa đã tăng từ hôm qua.'],
  31: ['Giao thừa dương lịch', 'Tối và đêm rất đông. Nhà cung cấp A đóng cửa 01/01 và 02/01: đặt hàng sớm.'],
  32: ['Tết Dương lịch', 'Văn phòng nghỉ, du khách đông hơn. Nếu mở cửa 01/01, lương nhân viên tính ×3.'],
  36: ['Rét đậm', 'Nhiệt độ xuống dưới 13°C vài ngày. Trà gừng, trà hoa cúc nóng được ưa chuộng, học sinh ra ngoài ít hơn.'],
  49: ['Kiểm tra vệ sinh cuối năm', 'Sắp có đoàn kiểm tra vệ sinh an toàn thực phẩm. Dọn kho, bỏ lô hết hạn.'],
  56: ['Chợ Tết', 'Giá đào, sữa, đường tăng. Khách quen và du khách đông hơn. Nhà cung cấp sẽ đóng cửa dịp Tết, hãy tính lượng dự trữ.'],
  63: ['Học sinh nghỉ Tết', 'Học sinh gần như không ra quán đến hết 13/02. Nhà cung cấp C đóng cửa đến 11/02.'],
  65: ['Nhà cung cấp A đóng cửa', 'A đóng từ 03/02 đến 12/02. B đóng từ 04/02 đến 09/02. Nhập hàng khô đủ cho cả kỳ nghỉ.'],
  66: ['28 tháng Chạp', 'Công chức nghỉ Tết. Văn phòng vắng. Đây là ngày nhập hàng cuối cùng cho kỳ nghỉ.'],
  67: ['Giao thừa', 'Sáng và trưa mua quà muộn, chiều vắng. Buổi tối nên cân nhắc đóng cửa. Có buổi S5 tùy chọn. Lương ×3.'],
  68: ['Mùng 1 Tết', 'Mặc định đóng cửa. Nếu mở: lương ×3, nhu cầu thấp, không có hàng giao.'],
  72: ['Mùng 5 khai trương', 'Đại lý B mở lại. Khách quen có thể lì xì nếu bạn mở cửa.'],
  73: ['Hồi phục sau Tết', 'Văn phòng đi làm lại. Nhà cung cấp lần lượt mở lại. Nhân viên có thể không quay lại.'],
  76: ['Valentine', 'Cặp đôi đông từ chiều đến tối. Khuyến mãi 2 ly có thể hợp.'],
  82: ['Rằm tháng Giêng', 'Du khách đông ở gần điểm lễ vào buổi sáng và trưa. Đồ uống không sữa được ưa chuộng.'],
  84: ['Nắng ấm trở lại', 'Nhiệt độ nhích dần, tăng mạnh từ 25/02. Món lạnh bán chạy.'],
  90: ['Ngày cuối mùa', 'Hết ngày này là chung kết mùa. Chốt ngày thật tốt!'],
};

// ---------- mẫu sự kiện ngẫu nhiên (rút gọn từ mục 8.7; mức độ và giá trị là điểm xuất phát) ----------
// ch: kênh manh mối; lead: số buổi báo trước; rel: xác suất xảy ra thật; dur: số ngày hiệu lực
// effects: {t: mục tiêu (Phụ lục C), op, v, ts: lát cắt}; choices[0] là lựa chọn mặc định
export const EVENTS = [
  { id: 'E01', name: 'Sữa tươi khan', cat: 'Chợ', sev: 2, w: 3, cd: 12, ch: 'trusted', lead: 1, rel: 0.8, dur: 3, st: [1, 4],
    clue: 'Bản tin chợ: nguồn sữa tươi đang khan, giá có thể tăng khoảng 25% trong vài ngày tới.', body: 'Giá sữa tăng 25% trong 3 ngày.',
    effects: [{ t: 'price.ingredient', ts: 'sua', op: 'mul', v: 1.25 }],
    choices: [{ id: 'bear', label: 'Chịu giá' }, { id: 'stock', label: 'Tích trữ trước (rủi ro hỏng)', hint: 'Mở bảng đặt hàng và nhập sữa hôm nay.' }, { id: 'menu', label: 'Giảm bán món có sữa', fx: [{ t: 'demand.taste', ts: 'milk', op: 'add', v: -0.15 }] }] },
  { id: 'E02', name: 'Nhà cung cấp A giao trễ', cat: 'Nhà cung cấp', sev: 1, w: 3, cd: 10, ch: 'official', lead: 1, rel: 0.6, dur: 2, st: [1, 4],
    clue: 'Nhật ký giao hàng: A đã trễ vài lần gần đây. Có thể sắp tới còn trễ nữa.', body: 'Độ tin cậy của A giảm 0,10 trong 2 ngày.',
    effects: [{ t: 'supplier.reliability', ts: 'A', op: 'add', v: -0.10 }],
    choices: [{ id: 'bear', label: 'Chịu rủi ro' }, { id: 'backup', label: 'Đặt dự phòng ở B', hint: 'Đặt thêm hàng khô và tươi ở B.' }] },
  { id: 'E03', name: 'Lô đào kém chất lượng', cat: 'Nhà cung cấp', sev: 1, w: 2, cd: 14, ch: 'rumor', lead: 0, rel: 0.7, dur: 2, st: [1, 4],
    clue: 'Khách nhận xét: “Trà đào hôm nay hơi bở”.', body: 'Chất lượng đào giảm 0,15 trong 2 ngày.',
    effects: [{ t: 'lot.quality', ts: 'dao', op: 'add', v: -0.15 }],
    choices: [{ id: 'use', label: 'Dùng hết' }, { id: 'return', label: 'Trả hàng (hoàn 80%, mất 1 buổi)', cash: 0 }] },
  { id: 'E06', name: 'Giá trân châu rớt', cat: 'Chợ', sev: 1, w: 2, cd: 14, ch: 'trusted', lead: 0, rel: 0.9, dur: 2, st: [1, 4],
    clue: 'Bản tin chợ: trân châu đang rớt giá, có thể giảm 30% trong 2 ngày.', body: 'Trân châu giảm 30% trong 2 ngày. Hạn dùng ngắn (2 ngày).',
    effects: [{ t: 'price.ingredient', ts: 'tranchau', op: 'mul', v: 0.7 }], choices: [{ id: 'skip', label: 'Bỏ qua' }, { id: 'stock', label: 'Nhập nhiều (nhớ hạn 2 ngày)' }] },
  { id: 'E10', name: 'Giá chanh theo mùa', cat: 'Chợ', sev: 1, w: 2, cd: 14, ch: 'trusted', lead: 1, rel: 0.8, dur: 4, st: [1, 4],
    clue: 'Bản tin chợ: chanh đang vào đầu vụ, giá nhích lên.', body: 'Chanh +30% trong 4 ngày.', effects: [{ t: 'price.ingredient', ts: 'chanh', op: 'mul', v: 1.3 }],
    choices: [{ id: 'bear', label: 'Chịu giá' }, { id: 'price', label: 'Tăng giá trà đá chanh nhẹ' }] },
  { id: 'E11', name: 'Giá đường nhích dần', cat: 'Chợ', sev: 1, w: 2, cd: 20, ch: 'trusted', lead: 2, rel: 0.7, dur: 7, st: [1, 4],
    clue: 'Xu hướng giá: đường đang nhích lên hai ngày liền.', body: 'Đường +12% trong tuần.', effects: [{ t: 'price.ingredient', ts: 'duong', op: 'mul', v: 1.12 }],
    choices: [{ id: 'bear', label: 'Chịu giá' }, { id: 'stock', label: 'Mua sớm nhóm khô' }] },
  { id: 'E21', name: 'Nhóm học sinh đặt lớn', cat: 'Khách', sev: 1, w: 2, cd: 10, ch: 'official', lead: 1, rel: 0.8, dur: 1, st: [1, 4], noTet: true,
    clue: 'Tin nhắn: một lớp học định ghé mua khoảng 25 đến 30 ly vào chiều mai.', maxK: 2, body: 'Một lớp muốn đặt 25 đến 30 ly vào buổi Chiều. Chỉ khi bạn nhận thì họ mới đến (chọn trước khi mở cửa).',
    effects: [], choices: [{ id: 'decline', label: 'Từ chối' }, { id: 'accept', label: 'Nhận và chuẩn bị trước', fx: [{ t: 'demand.mult', ts: 'HS@2', op: 'mul', v: 2.3 }] }] },
  { id: 'E22', name: 'Khách quen xin món riêng', cat: 'Khách', sev: 1, w: 2, cd: 12, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: 'Một khách quen hỏi liệu có thể giảm đường ly của họ không.', body: 'Đáp ứng thì danh tiếng +1 và khách quen +2.', effects: [],
    choices: [{ id: 'no', label: 'Từ chối' }, { id: 'yes', label: 'Đáp ứng', fx: [{ t: 'rep.add', op: 'add', v: 1 }, { t: 'loyal.add', op: 'add', v: 2 }] }] },
  { id: 'E23', name: 'Đánh giá một sao', cat: 'Khách', sev: 1, w: 2, cd: 14, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: 'Có một đánh giá một sao về hàng chờ lâu trên mạng.', body: 'Danh tiếng −2 nếu không xử lý.', effects: [{ t: 'rep.add', op: 'add', v: -2 }],
    choices: [{ id: 'ignore', label: 'Bỏ qua' }, { id: 'reply', label: 'Phản hồi chân thành (1 AP)', ap: 1, fx: [{ t: 'rep.add', op: 'add', v: 2 }] }, { id: 'gift', label: 'Tặng một ly (−28k)', cash: -28 * K, fx: [{ t: 'rep.add', op: 'add', v: 2 }] }] },
  { id: 'E24', name: 'Người nổi tiếng mạng ghé quán', cat: 'Khách', sev: 2, w: 1, cd: 25, ch: 'rumor', lead: 1, rel: 0.5, dur: 2, st: [1, 4],
    clue: 'Tin đồn: một người có nhiều người theo dõi sắp ghé khu này.', body: 'Lưu lượng ×1,8 trong 2 ngày nếu chất lượng tốt.', effects: [{ t: 'demand.mult', ts: 'DK', op: 'mul', v: 1.8 }, { t: 'demand.mult', ts: 'HS', op: 'mul', v: 1.4 }],
    choices: [{ id: 'none', label: 'Không chuẩn bị' }, { id: 'prep', label: 'Chuẩn bị kho và nhân sự', hint: 'Nhập thêm hàng cho 2 ngày tới.' }] },
  { id: 'E42', name: 'Xu hướng vị mới', cat: 'Chợ', sev: 1, w: 2, cd: 20, ch: 'rumor', lead: 1, rel: 0.8, dur: 5, st: [1, 4],
    clue: 'Khách bàn về các món trà trái cây, đang là xu hướng.', body: 'Khẩu vị lệch sang trà trái cây (+0,3) trong 5 ngày.', effects: [{ t: 'demand.taste', ts: 'fruit', op: 'add', v: 0.3 }],
    choices: [{ id: 'skip', label: 'Bỏ qua' }, { id: 'push', label: 'Đẩy món trà đào, trà vải' }] },
  { id: 'E44', name: 'Hội chợ phố đi bộ', cat: 'Chợ', sev: 1, w: 2, cd: 21, ch: 'official', lead: 2, rel: 0.9, dur: 2, st: [1, 4],
    clue: 'Biển báo: hội chợ ở phố đi bộ cuối tuần này.', body: 'Chiều và tối cuối tuần du khách đông hơn 40%.', effects: [{ t: 'demand.mult', ts: 'DK@2', op: 'mul', v: 1.4 }, { t: 'demand.mult', ts: 'DK@3', op: 'mul', v: 1.4 }],
    choices: [{ id: 'none', label: 'Không làm gì' }, { id: 'prep', label: 'Chuẩn bị thêm hàng' }] },
  { id: 'E50', name: 'Lệ phí, giấy phép đến hạn', cat: 'Quy định', sev: 1, w: 1, cd: 30, ch: 'official', lead: 2, rel: 1, dur: 1, st: [1, 4],
    clue: 'Nhắc: lệ phí giấy phép sắp đến hạn nộp (khoảng 1.000k).', body: 'Phí giấy phép 1.000k.', effects: [],
    choices: [{ id: 'pay', label: 'Nộp đủ', cash: -1000 * K }, { id: 'late', label: 'Hoãn (phạt 30%)', cash: -1300 * K }] },
  { id: 'E51', name: 'Hoàn tiền nhỏ', cat: 'Tài chính', sev: 1, w: 1, cd: 30, ch: 'official', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: 'Thư: bạn được hoàn một khoản nhỏ (đóng nhầm thuế).', body: 'Nhận hoàn tiền.', effects: [], choices: [{ id: 'take', label: 'Nhận', cash: 500 * K }] },
  { id: 'E53', name: 'Sai sót két tiền', cat: 'Vận hành', sev: 1, w: 1, cd: 30, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [2, 4],
    clue: 'Cuối buổi két tiền lệch so với sổ.', body: 'Mất 300k tiền mặt.', effects: [{ t: 'cash.add', op: 'add', v: -300 * K }], choices: [{ id: 'bear', label: 'Chịu' }, { id: 'audit', label: 'Đối soát (1 AP)', ap: 1, fx: [{ t: 'cash.add', op: 'add', v: 180 * K }] }] },
  { id: 'E20', name: 'Đơn đoàn công ty (tất niên)', cat: 'Khách', sev: 2, w: 0, cd: 5, ch: 'official', lead: 2, rel: 0.9, dur: 1, st: [1, 4],
    clue: 'Cuộc gọi đặt trước: một công ty muốn đặt 40 đến 60 ly cho buổi tất niên.', body: 'Công ty muốn đặt đơn tất niên vào buổi Chiều. Chỉ khi bạn nhận thì đoàn mới đến (chọn trước khi mở cửa).',
    effects: [], choices: [{ id: 'decline', label: 'Từ chối' }, { id: 'accept', label: 'Nhận (cần đủ hàng và công suất)', fx: [{ t: 'demand.mult', ts: 'VP@2', op: 'mul', v: 2.5 }] }] },
  { id: 'E33', name: 'Kiểm tra vệ sinh an toàn thực phẩm', cat: 'Quy định', sev: 2, w: 0, cd: 20, ch: 'official', lead: 1, rel: 1, dur: 1, st: [1, 4],
    clue: 'Thông báo: đoàn kiểm tra vệ sinh sẽ đến cơ sở trong vài ngày tới. Cuối ngày kiểm tra, kho còn lô đến hạn (không tính đá) sẽ bị phạt: bán hết, đừng nhập dư, hoặc chọn Dọn kho khi đoàn đến.', body: 'Đoàn kiểm tra đã đến. Cuối ngày kho còn lô đến hạn (không tính đá) thì bị phạt; sạch thì danh tiếng tăng.', effects: [],
    choices: [{ id: 'none', label: 'Không chuẩn bị' }, { id: 'clean', label: 'Dọn kho và làm giấy xác nhận (−300k)', cash: -300 * K }], special: 'inspect' },
  { id: 'E04', name: 'Khuyến mãi 12.12', cat: 'Chợ', sev: 1, w: 0, cd: 5, ch: 'official', lead: 1, rel: 1, dur: 1, st: [1, 4],
    clue: 'Tin chào hàng: đại lý B giảm 8% nhóm khô vào 12/12.', body: 'B giảm 8% nhóm khô trong ngày 12/12.', effects: [{ t: 'price.group', ts: 'dry', op: 'mul', v: 0.92 }],
    choices: [{ id: 'skip', label: 'Bỏ qua' }, { id: 'dry', label: 'Tích trữ nhóm khô' }, { id: 'fresh', label: 'Tích trữ nhóm tươi (bẫy: hỏng nhanh)' }] },
  // ----- đợt bổ sung: vận hành, nhân sự, đối thủ, tài chính, thời tiết -----
  { id: 'E05', name: 'Cúp điện theo lịch', cat: 'Vận hành', sev: 2, w: 2, cd: 25, ch: 'official', lead: 1, rel: 0.95, dur: 1, st: [1, 4],
    clue: 'Thông báo điện lực: sắp cắt điện theo lịch vài giờ, tủ lạnh sẽ ngừng chạy.', body: 'Cúp điện: nhóm tươi có thể hỏng khoảng 20% và đá đắt hơn 60% trong ngày.',
    effects: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: 0.2 }, { t: 'price.ingredient', ts: 'da', op: 'mul', v: 1.6 }],
    choices: [{ id: 'bear', label: 'Chịu' }, { id: 'ice', label: 'Mua đá khối giữ lạnh (−150k)', cash: -150 * K, fx: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: -0.12 }] }, { id: 'move', label: 'Chuyển hàng tươi gửi chỗ khác (−250k)', cash: -250 * K, fx: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: -0.2 }] }] },
  { id: 'E07', name: 'Đại lý B tăng giá', cat: 'Nhà cung cấp', sev: 1, w: 2, cd: 40, ch: 'official', lead: 1, rel: 1, dur: 30, st: [2, 4],
    clue: 'Tin báo giá: đại lý B thông báo tăng giá khoảng 6% từ tuần sau.', body: 'Giá của B tăng 6% cố định.', effects: [{ t: 'supplier.price', ts: 'B', op: 'mul', v: 1.06 }],
    choices: [{ id: 'accept', label: 'Chấp nhận' }, { id: 'negotiate', label: 'Thương lượng (1 AP, giảm một nửa mức tăng)', ap: 1, fx: [{ t: 'supplier.price', ts: 'B', op: 'mul', v: 0.97 }] }] },
  { id: 'E08', name: 'Giao thiếu hàng', cat: 'Nhà cung cấp', sev: 1, w: 2, cd: 14, ch: 'rumor', lead: 0, rel: 0.5, dur: 2, st: [1, 4],
    clue: 'Nhật ký giao hàng: lần giao gần nhất của A thiếu hàng. Có thể lần tới cũng vậy.', body: 'Các lần giao sắp tới của A có nguy cơ thiếu.', effects: [{ t: 'supplier.reliability', ts: 'A', op: 'add', v: -0.35 }],
    choices: [{ id: 'bear', label: 'Chịu rủi ro' }, { id: 'claim', label: 'Khiếu nại (1 AP, nhận bồi thường 120k)', ap: 1, fx: [{ t: 'cash.add', op: 'add', v: 120 * K }] }] },
  { id: 'E09', name: 'Nhà cung cấp D chào hàng', cat: 'Nhà cung cấp', sev: 1, w: 1, cd: 60, ch: 'trusted', lead: 0, rel: 1, dur: 1, st: [2, 4],
    clue: 'Tin nhắn: một nhà cung cấp mới (D) chào giá rẻ hơn khoảng 15%, chất lượng chưa rõ.', body: 'Nhà cung cấp D muốn bạn thử một lô nhỏ.', effects: [],
    choices: [{ id: 'no', label: 'Từ chối' }, { id: 'try', label: 'Thử lô nhỏ (mở nhà cung cấp D, −300k)', cash: -300 * K, sp: 'supD' }] },
  { id: 'E12', name: 'Nhân viên xin về quê ăn Tết', cat: 'Nhân sự', sev: 2, w: 0, cd: 5, ch: 'trusted', lead: 2, rel: 0.9, dur: 3, st: [2, 4], need: 'staff',
    clue: 'Tin nhắn: một vài nhân viên hỏi xin nghỉ sớm để về quê ăn Tết.', body: 'Một nhân viên xin nghỉ 3 ngày.', effects: [],
    choices: [{ id: 'ok', label: 'Đồng ý cho nghỉ', sp: 'leave3' }, { id: 'stay', label: 'Trả lương ×2 để ở lại (−300k)', cash: -300 * K, fx: [{ t: 'staff.mood', op: 'add', v: 4 }] }, { id: 'temp', label: 'Cho nghỉ và thuê thời vụ thay (−350k)', cash: -350 * K, fx: [{ t: 'staff.mood', op: 'add', v: 10 }] }] },
  { id: 'E13', name: 'Nhân viên nghỉ ốm', cat: 'Nhân sự', sev: 1, w: 2, cd: 14, ch: 'trusted', lead: 1, rel: 0.6, dur: 1, st: [2, 4], need: 'staff',
    clue: 'Tin nhắn tối qua: một nhân viên thấy trong người không khỏe.', body: 'Thiếu một người trong một ngày.', effects: [],
    choices: [{ id: 'solo', label: 'Tự gánh', sp: 'leave1' }, { id: 'sub', label: 'Gọi người thay (−150k)', cash: -150 * K }] },
  { id: 'E14', name: 'Ứng viên giỏi xuất hiện', cat: 'Nhân sự', sev: 1, w: 1, cd: 30, ch: 'trusted', lead: 0, rel: 1, dur: 1, st: [2, 4],
    clue: 'Tin nhắn: một người có kinh nghiệm pha chế muốn xin làm.', body: 'Ứng viên có tay nghề cao nhưng đòi lương cao.', effects: [],
    choices: [{ id: 'skip', label: 'Bỏ qua' }, { id: 'hire', label: 'Cho vào danh sách ứng viên', sp: 'goodCand' }] },
  { id: 'E16', name: 'Nhân viên đòi tăng lương', cat: 'Nhân sự', sev: 1, w: 2, cd: 25, ch: 'rumor', lead: 0, rel: 0.8, dur: 1, st: [2, 4], need: 'staff',
    clue: 'Một nhân viên nói bóng gió chuyện lương thấp.', body: 'Tâm trạng nhân viên giảm 10 nếu không xử lý.', effects: [{ t: 'staff.mood', op: 'add', v: -10 }],
    choices: [{ id: 'no', label: 'Từ chối' }, { id: 'raise', label: 'Tăng lương 8%', sp: 'raise' }, { id: 'bonus', label: 'Thưởng một lần (−500k)', cash: -500 * K, fx: [{ t: 'staff.mood', op: 'add', v: 12 }] }] },
  { id: 'E19', name: 'Khách khen nhân viên', cat: 'Nhân sự', sev: 1, w: 2, cd: 14, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: 'Một khách quen khen quán phục vụ nhanh và dễ thương.', body: 'Danh tiếng +1, tâm trạng nhân viên +6.', effects: [{ t: 'rep.add', op: 'add', v: 1 }, { t: 'staff.mood', op: 'add', v: 6 }], choices: [] },
  { id: 'E25', name: 'Khiếu nại vệ sinh', cat: 'Khách', sev: 1, w: 1, cd: 30, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: 'Một khách phàn nàn ly có mùi lạ.', body: 'Danh tiếng −1 nếu không xử lý.', effects: [{ t: 'rep.add', op: 'add', v: -1 }],
    choices: [{ id: 'ignore', label: 'Bỏ qua' }, { id: 'check', label: 'Kiểm tra kho và xin lỗi (1 AP)', ap: 1, fx: [{ t: 'rep.add', op: 'add', v: 1 }] }, { id: 'show', label: 'Trình giấy tờ (−100k)', cash: -100 * K, fx: [{ t: 'rep.add', op: 'add', v: 1 }] }] },
  { id: 'E26', name: 'Đoàn du khách nước ngoài', cat: 'Khách', sev: 1, w: 2, cd: 20, ch: 'trusted', lead: 1, rel: 0.8, dur: 1, st: [2, 4],
    clue: 'Tin nhắn: một đoàn khoảng 20 du khách nước ngoài sẽ ghé khu này.', body: 'Du khách đông và ít nhạy giá hơn hôm nay.', effects: [{ t: 'demand.mult', ts: 'DK', op: 'mul', v: 1.6 }, { t: 'demand.theta', ts: 'DK', op: 'mul', v: 1.2 }],
    choices: [{ id: 'skip', label: 'Bỏ qua' }, { id: 'menu', label: 'Làm bảng thực đơn đa ngôn ngữ (−100k)', cash: -100 * K, fx: [{ t: 'demand.theta', ts: 'DK', op: 'mul', v: 1.08 }] }] },
  { id: 'E27', name: 'Khách quen giới thiệu bạn bè', cat: 'Khách', sev: 1, w: 2, cd: 20, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: 'Một khách quen dẫn theo mấy người bạn đến thử.', body: 'Khách quen +6.', effects: [{ t: 'loyal.add', op: 'add', v: 6 }], choices: [] },
  { id: 'E28', name: 'Họp lớp cuối năm', cat: 'Khách', sev: 1, w: 1, cd: 30, ch: 'official', lead: 1, rel: 0.9, dur: 1, st: [2, 4],
    clue: 'Đặt trước: một nhóm họp lớp muốn đặt 15 đến 20 ly buổi tối.', body: 'Nhóm họp lớp muốn đến buổi Tối. Chỉ khi bạn nhận thì họ mới đến (chọn trước khi mở cửa).', effects: [],
    choices: [{ id: 'no', label: 'Từ chối' }, { id: 'yes', label: 'Nhận', fx: [{ t: 'demand.mult', ts: 'KQ@3', op: 'mul', v: 2.1 }, { t: 'demand.mult', ts: 'HS@3', op: 'mul', v: 1.4 }] }] },
  { id: 'E30', name: 'Máy ép nắp hỏng', cat: 'Vận hành', sev: 1, w: 2, cd: 30, ch: 'official', lead: 1, rel: 0.7, dur: 2, st: [2, 4],
    clue: 'Máy ép nắp chạy ì ạch, thời gian pha dài ra thấy rõ.', body: 'Thời gian pha tăng 30% đến khi sửa.', effects: [{ t: 'service.time', ts: '', op: 'mul', v: 1.3 }],
    choices: [{ id: 'bear', label: 'Chịu' }, { id: 'slow', label: 'Sửa chậm (−300k)', cash: -300 * K, fx: [{ t: 'service.time', ts: '', op: 'mul', v: 0.85 }] }, { id: 'fast', label: 'Sửa nhanh (−800k)', cash: -800 * K, fx: [{ t: 'service.time', ts: '', op: 'mul', v: 0.77 }] }] },
  { id: 'E31', name: 'Mất điện đột ngột', cat: 'Vận hành', sev: 1, w: 1, cd: 40, ch: 'rumor', lead: 0, rel: 1, dur: 1, st: [1, 4],
    clue: '', body: 'Mất điện đột ngột: quán vắng hơn và đá tan, nhóm tươi hao.', effects: [{ t: 'demand.mult', ts: 'VP', op: 'mul', v: 0.75 }, { t: 'demand.mult', ts: 'HS', op: 'mul', v: 0.75 }, { t: 'inventory.loss', ts: 'fresh', op: 'add', v: 0.08 }],
    choices: [{ id: 'wait', label: 'Chờ' }, { id: 'ice', label: 'Mua đá bổ sung (−100k)', cash: -100 * K, fx: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: -0.06 }] }] },
  { id: 'E32', name: 'Kẹt xe, ngập đường', cat: 'Vận hành', sev: 2, w: 1, cd: 30, ch: 'official', lead: 1, rel: 0.7, dur: 1, st: [1, 4],
    clue: 'Dự báo mưa lớn: có thể ngập vài tuyến đường quanh khu bạn.', body: 'Giao hàng trễ và không có đơn giao tận nơi.', effects: [{ t: 'supplier.reliability', ts: 'A', op: 'add', v: -0.3 }, { t: 'supplier.reliability', ts: 'B', op: 'add', v: -0.3 }, { t: 'demand.delivery.mult', op: 'mul', v: 0 }],
    choices: [{ id: 'bear', label: 'Chịu' }, { id: 'early', label: 'Đặt hàng sớm hôm nay', hint: 'Đặt trước các món cần dùng.' }] },
  { id: 'E35', name: 'Hỏng tủ lạnh', cat: 'Vận hành', sev: 2, w: 1, cd: 45, ch: 'official', lead: 1, rel: 0.7, dur: 1, st: [2, 4],
    clue: 'Nhiệt độ trong tủ lạnh tăng dần, có tiếng kêu lạ.', body: 'Tủ hỏng: nhóm tươi hỏng thêm 30%.', effects: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: 0.3 }],
    choices: [{ id: 'bear', label: 'Chịu' }, { id: 'fix', label: 'Sửa gấp (−600k)', cash: -600 * K, fx: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: -0.3 }] }, { id: 'move', label: 'Di dời hàng (−250k)', cash: -250 * K, fx: [{ t: 'inventory.loss', ts: 'fresh', op: 'add', v: -0.18 }] }] },
  { id: 'E38', name: 'Chủ nhà tăng tiền thuê', cat: 'Tài chính', sev: 1, w: 1, cd: 60, ch: 'official', lead: 2, rel: 1, dur: 40, st: [2, 4],
    clue: 'Thư báo: chủ nhà dự kiến tăng thuê khoảng 8% từ tuần sau.', body: 'Chi phí cố định tăng 8%.', effects: [{ t: 'cost.fixed', ts: '', op: 'mul', v: 1.08 }],
    choices: [{ id: 'accept', label: 'Chấp nhận' }, { id: 'negotiate', label: 'Thương lượng (1 AP, giảm một nửa)', ap: 1, fx: [{ t: 'cost.fixed', ts: '', op: 'mul', v: 0.96 }] }] },
  { id: 'E39', name: 'Đối thủ khuyến mãi 30%', cat: 'Đối thủ', sev: 1, w: 2, cd: 20, ch: 'rumor', lead: 1, rel: 0.6, dur: 3, st: [2, 4],
    clue: 'Mấy khách học sinh bảo quán bên cạnh đang giảm giá mạnh.', body: 'Học sinh ghé quán bạn ít hơn 15% trong 3 ngày.', effects: [{ t: 'demand.mult', ts: 'HS', op: 'mul', v: 0.85 }],
    choices: [{ id: 'hold', label: 'Giữ giá' }, { id: 'promo', label: 'Giảm giá một số món cho học sinh', hint: 'Hạ giá các món học sinh hay mua.' }] },
  { id: 'E40', name: 'Đối thủ mở cạnh bên', cat: 'Đối thủ', sev: 2, w: 0.7, cd: 90, ch: 'official', lead: 2, rel: 0.9, dur: 130, st: [2, 4],
    clue: 'Biển báo: sắp có một quán trà mở ngay cạnh.', body: 'Lưu lượng giảm khoảng 12% lâu dài.', effects: [{ t: 'demand.mult', ts: 'VP', op: 'mul', v: 0.88 }, { t: 'demand.mult', ts: 'HS', op: 'mul', v: 0.88 }, { t: 'demand.mult', ts: 'DK', op: 'mul', v: 0.9 }],
    choices: [{ id: 'keep', label: 'Giữ nguyên' }, { id: 'quality', label: 'Nâng chất lượng (−800k)', cash: -800 * K, fx: [{ t: 'demand.mult', ts: 'VP', op: 'mul', v: 1.05 }, { t: 'demand.mult', ts: 'HS', op: 'mul', v: 1.05 }] }] },
  { id: 'E43', name: 'Quán gần đó đóng cửa', cat: 'Đối thủ', sev: 1, w: 1, cd: 40, ch: 'rumor', lead: 0, rel: 0.6, dur: 14, st: [2, 4],
    clue: 'Tin đồn: quán trà gần đây sắp đóng cửa.', body: 'Lưu lượng tăng khoảng 10% trong 2 tuần.', effects: [{ t: 'demand.mult', ts: 'VP', op: 'mul', v: 1.1 }, { t: 'demand.mult', ts: 'HS', op: 'mul', v: 1.1 }],
    choices: [{ id: 'none', label: 'Không làm gì' }, { id: 'stock', label: 'Nhập thêm hàng', hint: 'Tăng lượng đặt vài ngày.' }] },
  { id: 'E45', name: 'Rét đậm', cat: 'Thời tiết', sev: 1, w: 0, cd: 5, ch: 'official', lead: 1, rel: 1, dur: 7, st: [1, 4],
    clue: 'Dự báo: đợt rét đậm sắp về, có ngày xuống dưới 13°C.', body: 'Rét đậm: món nóng được ưa chuộng, học sinh ra quán ít hơn.', effects: [{ t: 'demand.taste', ts: 'hot', op: 'add', v: 0.35 }, { t: 'demand.taste', ts: 'cold', op: 'add', v: -0.2 }, { t: 'demand.mult', ts: 'HS', op: 'mul', v: 0.9 }],
    choices: [{ id: 'keep', label: 'Giữ thực đơn' }, { id: 'hot', label: 'Chuyển sang món nóng', hint: 'Đặt thêm gừng, mật ong, hoa cúc.' }] },
  { id: 'E46', name: 'Mưa phùn kéo dài', cat: 'Thời tiết', sev: 1, w: 0, cd: 5, ch: 'official', lead: 1, rel: 1, dur: 6, st: [1, 4],
    clue: 'Dự báo: mưa phùn nhiều ngày liền.', body: 'Mưa phùn: khách giảm nhẹ, món nóng nhỉnh hơn.', effects: [{ t: 'demand.taste', ts: 'hot', op: 'add', v: 0.1 }], choices: [] },
  { id: 'E47', name: 'Nắng ấm bất thường', cat: 'Thời tiết', sev: 1, w: 0, cd: 5, ch: 'official', lead: 1, rel: 1, dur: 5, st: [1, 4],
    clue: 'Dự báo: nắng ấm lên rõ, có ngày trên 27°C.', body: 'Món lạnh bán chạy hơn, đá hao nhanh.', effects: [{ t: 'demand.taste', ts: 'cold', op: 'add', v: 0.2 }, { t: 'price.ingredient', ts: 'da', op: 'mul', v: 1.2 }],
    choices: [{ id: 'keep', label: 'Giữ' }, { id: 'ice', label: 'Đặt thêm đá', hint: 'Đá chỉ dùng được trong ngày.' }] },
  { id: 'E48', name: 'Gió mùa Đông Bắc về', cat: 'Thời tiết', sev: 2, w: 0, cd: 5, ch: 'official', lead: 1, rel: 0.9, dur: 3, st: [1, 4],
    clue: 'Dự báo: gió mùa Đông Bắc về, nhiệt độ tụt khoảng 6°C trong 24 giờ.', body: 'Cơ cấu món lệch nhanh sang món nóng.', effects: [{ t: 'demand.taste', ts: 'hot', op: 'add', v: 0.3 }, { t: 'demand.taste', ts: 'cold', op: 'add', v: -0.15 }],
    choices: [{ id: 'keep', label: 'Giữ' }, { id: 'hot', label: 'Đặt khẩn món nóng', hint: 'Gừng, mật ong, hoa cúc.' }] },
  { id: 'E49', name: 'Ngân hàng chào vay', cat: 'Tài chính', sev: 1, w: 1, cd: 60, ch: 'official', lead: 0, rel: 1, dur: 1, st: [2, 4],
    clue: 'Thư ngân hàng: chào vay 5.000k lãi nhẹ để mở rộng sớm.', body: 'Khoản vay 5.000k, lãi 0,05% mỗi ngày.', effects: [],
    choices: [{ id: 'no', label: 'Từ chối' }, { id: 'loan', label: 'Vay 5.000k', sp: 'loan' }] },
  { id: 'E52', name: 'Thiết bị giảm giá', cat: 'Chợ', sev: 1, w: 1, cd: 45, ch: 'trusted', lead: 1, rel: 1, dur: 3, st: [2, 4],
    clue: 'Tin nhắn: nhà cung cấp thiết bị giảm 20% trong 3 ngày.', body: 'Tủ mát giảm 20% (4.800k) nếu bạn chưa có.', effects: [],
    choices: [{ id: 'skip', label: 'Bỏ qua' }, { id: 'buy', label: 'Mua tủ mát giảm giá (−4.800k)', sp: 'fridgeSale' }] },
];
export const EVENT_BY_ID = Object.fromEntries(EVENTS.map(e => [e.id, e]));
// sự kiện theo ngày: [ngày game, mã mẫu]
export const SCHEDULED = [[12, 'E04'], [14, 'E48'], [36, 'E45'], [50, 'E46'], [53, 'E33'], [58, 'E12'], [65, 'E20'], [77, 'E46'], [84, 'E47']];

// ---------- cột mốc sao (mục 15.5, các cột mốc giai đoạn 1 đã mô phỏng + các cột mốc ngày lễ) ----------
// k: kiểu đo; hạn: deadlineDay; mở: openDay; dir: 1 càng cao càng tốt, -1 càng thấp càng tốt; th: ngưỡng 1,2,3 sao
export const MILESTONES = [
  { id: 'CT01', g: 'A', name: 'Doanh thu ngày 5', m: 'rev_day', at: 5, open: 1, dl: 5, dir: 1, th: [2550, 2650, 3050], k: 1000 },
  { id: 'CT02', g: 'A', name: 'Doanh thu 7 ngày đầu', m: 'rev_cum', at: 7, open: 1, dl: 7, dir: 1, th: [18250, 18900, 19850], k: 1000, early: 1 },
  { id: 'CT03', g: 'A', name: 'Lãi tích lũy đến hết ngày 7', m: 'profit_cum', at: 7, open: 1, dl: 7, dir: 1, th: [5750, 6300, 7250], k: 1000, early: 1 },
  { id: 'CT04', g: 'A', name: 'Doanh thu ngày 10', m: 'rev_day', at: 10, open: 3, dl: 10, dir: 1, th: [2600, 2850, 3150], k: 1000 },
  { id: 'CT05', g: 'A', name: 'Khách bỏ đi vì hết hàng, ngày 8–14 (‰)', m: 'stockout', a: 8, b: 14, open: 8, dl: 14, dir: -1, th: [25, 11, 4], unit: '‰' },
  { id: 'CT06', g: 'A', name: 'Giá trị hàng hỏng, ngày 8–14', m: 'spoil', a: 8, b: 14, open: 8, dl: 14, dir: -1, th: [1280, 1130, 880], k: 1000 },
  { id: 'CT07', g: 'A', name: 'Lãi tích lũy đến hết ngày 14', m: 'profit_cum', at: 14, open: 1, dl: 14, dir: 1, th: [12150, 13300, 14300], k: 1000, early: 1 },
  { id: 'CT08', g: 'A', name: 'Danh tiếng R cuối ngày 14', m: 'rep', at: 14, open: 1, dl: 14, dir: 1, th: [65, 67, 68] },
  { id: 'CT09', g: 'A', name: 'Biên lãi ròng ngày 8–14 (%)', m: 'margin', a: 8, b: 14, open: 8, dl: 14, dir: 1, th: [32, 36, 38], unit: '%' },
  { id: 'CT10', g: 'A', name: 'Số ngày ít hụt hàng, ngày 8–21 (tối đa 14)', m: 'lowstock', a: 8, b: 21, open: 8, dl: 21, dir: 1, th: [8, 11, 13] },
  { id: 'CT11', g: 'A', name: 'Lãi ròng hai tuần, ngày 15–28', m: 'profit_win', a: 15, b: 28, open: 15, dl: 28, dir: 1, th: [12450, 13700, 14750], k: 1000 },
  { id: 'CT12', g: 'A', name: 'Lãi tích lũy đến hết ngày 28', m: 'profit_cum', at: 28, open: 1, dl: 28, dir: 1, th: [24700, 27150, 28700], k: 1000, early: 1 },
  { id: 'CT13', g: 'A', name: 'Danh tiếng R cuối ngày 28', m: 'rep', at: 28, open: 1, dl: 28, dir: 1, th: [68, 69, 70] },
  { id: 'CT14', g: 'B', name: 'Điểm hiệu chỉnh dự đoán TB, ngày 5–30 (tối thiểu 10 dự đoán)', m: 'cal', a: 5, b: 30, open: 5, dl: 30, dir: 1, th: [45, 60, 75] },
  { id: 'CT15', g: 'B', name: 'DQI trung bình các buổi chơi tay, ngày 22–35', m: 'dqi', a: 22, b: 35, open: 22, dl: 35, dir: 1, th: [45, 55, 65] },
  { id: 'CT16', g: 'B', name: 'Số thử nghiệm giá có kết luận ý nghĩa 90%, ngày 6–45', m: 'exp', a: 6, b: 45, open: 6, dl: 45, dir: 1, th: [1, 3, 5] },
  { id: 'CT21', g: 'C', name: 'Vào giai đoạn 3 (ngày nâng cấp)', m: 'stage3', open: 1, dl: 80, dir: -1, th: [80, 62, 50], early: 1, unit: 'ngày' },
  { id: 'CT22', g: 'C', name: 'Giữ chân nhân viên: chuỗi ngày dài nhất không ai nghỉ việc, đến ngày 75', m: 'streak', open: 21, dl: 75, dir: 1, th: [20, 30, 45], unit: 'ngày' },
  { id: 'CT26', g: 'D', name: 'Mùa quà Tết 20/01–09/02: tỷ trọng doanh thu món quà (%)', m: 'gift', a: 51, b: 71, open: 51, dl: 71, dir: 1, th: [8, 12, 18], unit: '%' },
  { id: 'CT17', g: 'C', name: 'Vào giai đoạn 2 (ngày nâng cấp)', m: 'stage2', open: 1, dl: 45, dir: -1, th: [45, 28, 20], early: 1, unit: 'ngày' },
  { id: 'CT18', g: 'C', name: 'Khách quen L cuối ngày 45', m: 'loyal', at: 45, open: 8, dl: 45, dir: 1, th: [40, 60, 80] },
  { id: 'CT19', g: 'C', name: 'Lãi tích lũy đến hết ngày 60', m: 'profit_cum', at: 60, open: 1, dl: 60, dir: 1, th: [45000, 75000, 105000], k: 1000, early: 1 },
  { id: 'CT20', g: 'C', name: 'Danh tiếng R cuối ngày 60', m: 'rep', at: 60, open: 1, dl: 60, dir: 1, th: [65, 72, 80] },
  { id: 'CT23', g: 'D', name: 'Đêm Noel 24/12: doanh thu ÷ TB ngày 17–23/12', m: 'ratio_rev', at: 24, ba: 17, bb: 23, open: 17, dl: 24, dir: 1, th: [1.15, 1.30, 1.45], unit: '×' },
  { id: 'CT24', g: 'D', name: 'Giao thừa 31/12: doanh thu ÷ TB ngày 17–23/12', m: 'ratio_rev', at: 31, ba: 17, bb: 23, open: 24, dl: 31, dir: 1, th: [1.15, 1.30, 1.45], unit: '×' },
  { id: 'CT25', g: 'D', name: 'Tết Dương 01–03/01: lãi 3 ngày ÷ lãi 28–30/12', m: 'ratio_profit3', a: 32, b: 34, ba: 28, bb: 30, open: 28, dl: 34, dir: 1, th: [0.70, 0.90, 1.10], unit: '×' },
  { id: 'CT27', g: 'D', name: 'Chợ Tết 25–29/01: biên lãi ÷ biên lãi 18–24/01', m: 'ratio_margin', a: 56, b: 60, ba: 49, bb: 55, open: 49, dl: 60, dir: 1, th: [0.90, 1.00, 1.10], unit: '×' },
  { id: 'CT28', g: 'D', name: 'NCC đóng cửa 03–09/02: khách bỏ đi vì hết hàng (‰)', m: 'stockout', a: 65, b: 71, open: 58, dl: 71, dir: -1, th: [120, 80, 50], unit: '‰' },
  { id: 'CT29', g: 'D', name: 'Giao thừa đến mùng 4: lãi TB ngày ÷ lãi TB 28/01–03/02', m: 'ratio_profit', a: 67, b: 71, ba: 59, bb: 65, open: 60, dl: 71, dir: 1, th: [0.25, 0.40, 0.55], unit: '×' },
  { id: 'CT30', g: 'D', name: 'Hồi phục 11–13/02: doanh thu TB ÷ TB 25–31/01', m: 'ratio_rev_avg', a: 73, b: 75, ba: 56, bb: 62, open: 66, dl: 75, dir: 1, th: [0.80, 0.90, 1.00], unit: '×' },
  { id: 'CT31', g: 'D', name: 'Valentine 14/02: doanh thu ÷ TB ngày 18–24/01', m: 'ratio_rev', at: 76, ba: 49, bb: 55, open: 69, dl: 76, dir: 1, th: [1.10, 1.25, 1.40], unit: '×' },
  { id: 'CT32', g: 'D', name: 'Rằm 20/02: doanh thu ÷ TB ngày 16–19/02', m: 'ratio_rev', at: 82, ba: 77, bb: 80, open: 75, dl: 82, dir: 1, th: [1.05, 1.15, 1.25], unit: '×' },
  { id: 'CT33', g: 'D', name: 'Thời tiết 22–27/02: lãi TB ngày ÷ TB 16–19/02', m: 'ratio_profit', a: 84, b: 89, ba: 77, bb: 80, open: 77, dl: 89, dir: 1, th: [0.95, 1.05, 1.15], unit: '×' },
  { id: 'CT34', g: 'E', name: 'Lãi tích lũy cả mùa (hết ngày 90)', m: 'profit_cum', at: 90, open: 1, dl: 90, dir: 1, th: [100000, 150000, 220000], k: 1000, early: 1 },
  { id: 'CT35', g: 'E', name: 'Điểm Mùa', m: 'season', open: 1, dl: 90, dir: 1, th: [40, 60, 80] },
];
export const SOON = [['GĐ5', 'Thương hiệu: nhượng quyền, sản phẩm đóng gói (sau mùa, sắp ra mắt)'], ['Mùa Hè 2027', 'Mùa mới với lịch và sự kiện mới (sắp ra mắt)']];
export const MG_NAME = { A: 'Khởi động', B: 'Kỹ năng phân tích', C: 'Tăng trưởng', D: 'Lễ và Tết', E: 'Chung kết' };

export const TITLES = [[80, 'Huyền thoại Xuân'], [60, 'Bậc thầy trà'], [40, 'Chủ tiệm'], [0, 'Học việc']];
export const BADGES = [
  { id: 'A01', name: 'Khai trương', desc: 'Hoàn thành ngày đầu tiên.', ip: 3, ic: 'cup' },
  { id: 'A02', name: 'Không hụt hàng', desc: '7 ngày liền không bỏ lỡ khách vì hết hàng.', ip: 10, ic: 'box' },
  { id: 'A03', name: 'Nhà dự báo', desc: '5 dự đoán khoảng trúng.', ip: 10, ic: 'chart' },
  { id: 'A04', name: 'Nhà khoa học', desc: 'Kết luận 3 thử nghiệm giá có khoảng tin cậy 90%.', ip: 15, ic: 'flask' },
  { id: 'A05', name: 'Giá đúng', desc: 'Tìm được giá làm lãi món cao hơn ít nhất 8% so với giá gốc, được xác nhận bằng thử nghiệm.', ip: 10, ic: 'tag' },
  { id: 'A06', name: 'Phản ứng sớm', desc: 'Hành động ngay sau manh mối của một sự kiện nặng.', ip: 8, ic: 'bolt' },
  { id: 'A07', name: 'Không bị lừa', desc: 'Gặp 3 báo động giả mà tiền không giảm.', ip: 8, ic: 'check' },
  { id: 'A08', name: 'Tiệm nhỏ', desc: 'Nâng lên giai đoạn 2.', ip: 10, ic: 'shop' },
  { id: 'A09', name: 'Cửa hàng', desc: 'Nâng lên giai đoạn 3.', ip: 15, ic: 'shop2' },
  { id: 'A11', name: 'Tết trọn vẹn', desc: 'Qua chuỗi Tết với ít hụt hàng và hàng hỏng thấp.', ip: 20, ic: 'lantern' },
  { id: 'A13', name: 'Giữ người', desc: 'Không nhân viên nào nghỉ việc trong 30 ngày.', ip: 10, ic: 'staff' },
  { id: 'A10', name: 'Qua Noel', desc: 'Có lãi cả đêm 24/12 và 31/12.', ip: 0, ic: 'tree' },
  { id: 'A12', name: 'Chủ nhân hậu', desc: 'Mở cửa mùng 1 và trả đủ lương lễ mà vẫn có lãi.', ip: 0, ic: 'lantern' },
  { id: 'XS', name: 'Ngôi sao Xuân', desc: 'Đạt 90 sao cột mốc trong một mùa.', ip: 20, ic: 'starXS' },
  { id: 'A14', name: 'Trọn mùa', desc: 'Chơi tay ít nhất 80% số buổi.', ip: 0, ic: 'star' },
  { id: 'A15', name: 'Chung cuộc', desc: 'Đến ngày 90.', ip: 0, ic: 'trophy' },
];
export const IP_TOOLS = [
  { id: 'count', name: 'Đếm khách', cost: 6, day: 3, desc: 'Báo cáo hiện thêm số khách ghé từng giờ, số khách bỏ đi theo lý do.' },
  { id: 'survey', name: 'Khảo sát nhanh', cost: 8, day: 5, desc: 'Cho biết phân khúc nào đang nhạy giá nhất trong buổi gần nhất.' },
  { id: 'supplier', name: 'Nhật ký nhà cung cấp', cost: 5, day: 4, desc: 'Hiện lịch sử giao đủ, thiếu, trễ của từng nhà cung cấp.' },
  { id: 'exp', name: 'Thử nghiệm giá', cost: 10, day: 6, need: 'count', desc: 'Đổi giá một món xen kẽ giữa hai mức qua nhiều buổi để biết mức nào lãi hơn, kèm kết luận thống kê.' },
  { id: 'diag', name: 'Chẩn đoán đầy đủ', cost: 6, day: 7, desc: 'Báo cáo cuối buổi có điểm chất lượng quyết định (DQI) và tách phần may rủi khỏi kỹ năng.' },
  { id: 'shelf', name: 'Kiểm kê chi tiết lô', cost: 4, day: 3, desc: 'Xem từng lô trong kho: số phần, ngày hết hạn, chất lượng (tốt, ổn, kém).' },
];
export const DIFFS = { nhan: 'Nhàn', chuan: 'Chuẩn', kho: 'Khó' };
export const inSeason = (it, day) => { const s = ITEMS[it].seasonal; return !s || (day >= s[0] && day <= s[1]); };
// chuỗi hướng dẫn tuần khai trương (N1–N7), theo ngày chơi: hiện ở đầu bảng hành động
export const TUTORIAL = {
  1: ['N1 · Bán hàng cơ bản', 'Mở phần “Giá & thực đơn”, xem lãi mỗi ly rồi bấm “Mở cửa”. Hết buổi, xem báo cáo và đặt hàng cho buổi sau.'],
  2: ['N2 · Hết hàng đầu tiên', 'Thiếu MỘT nguyên liệu là cả món hết. Xem “kho” ở phần Đặt hàng: hàng tươi hỏng nhanh, hàng khô để lâu.'],
  3: ['N3 · Giá và khách', 'Mỗi khách có một mức giá chấp nhận. Giá cao quá thì họ bỏ đi hẳn. Thử đổi giá một món rồi xem báo cáo.'],
  4: ['N4 · Nhà cung cấp', 'A ổn định, B rẻ hơn nhưng hay trễ hoặc thiếu và có giao khẩn. Đừng dồn hết vào một nơi.'],
  5: ['N5 · Dự đoán khoảng', 'Trước khi mở cửa, đoán khoảng số ly sẽ bán. Khoảng hẹp mà trúng được điểm cao hơn và thưởng IP. Máy tính nhóm B đã mở.'],
  6: ['N6 · Thử nghiệm giá', 'Mua “Thử nghiệm giá” bằng IP (Thành tích) để biết mức giá nào lãi hơn, có kết luận thống kê.'],
  7: ['N7 · Ôn tập tuần', 'Xem Báo cáo → Biểu đồ và các cột mốc ở Thành tích. Chẩn đoán đầy đủ (mua bằng IP) cho điểm chất lượng quyết định.'],
};
// minh họa cho sự kiện lớn: theo ngày lịch và theo mã sự kiện (vẽ trong tl-art.js: illus)
export const ILL_BY_DAY = { 24: 'noel', 25: 'noel', 31: 'nye', 32: 'nye', 53: 'inspect', 56: 'tet', 65: 'closed', 66: 'closed', 67: 'tet', 68: 'tet', 72: 'tet', 76: 'valentine', 82: 'ram' };
export const ILL_BY_EVENT = { E33: 'inspect', E04: 'closed', E20: 'noel', E28: 'noel', E07: 'closed', E02: 'closed' };
// tên nguyên liệu bằng tiếng Trung (hiện khi bật “Tên món tiếng Trung” trong Menu)
export const ING_ZH = { ly: '杯子 bēizi', tra: '茶叶 cháyè', duong: '糖 táng', da: '冰 bīng', chanh: '柠檬 níngméng', sua: '牛奶 niúnǎi', tranchau: '珍珠 zhēnzhū', dao: '桃子 táozi', gung: '姜 jiāng', matong: '蜂蜜 fēngmì', vai: '荔枝 lìzhī', matcha: '抹茶 mǒchá', chanhday: '百香果 bǎixiāngguǒ', hoacuc: '菊花 júhuā', oi: '番石榴 fānshíliú', sen: '莲花 liánhuā', dua: '椰子 yēzi', hopqua: '礼盒 lǐhé' };
// thử thách tuần (mở khi có 10 sao): chấm cuối mỗi tuần game (ngày chia hết cho 7); thưởng IP + xu
export const WEEKLY = [
  { id: 'w1', name: 'Một tuần không hụt hàng', desc: 'Tổng khách bỏ đi vì hết hàng cả tuần không quá 15.', ip: 4, xu: 40 },
  { id: 'w2', name: 'Kho gọn, ít hao', desc: 'Giá trị hàng hỏng cả tuần không quá 400k (giai đoạn 1) / 1.500k (giai đoạn sau).', ip: 4, xu: 40 },
  { id: 'w3', name: 'Biên lãi cao', desc: 'Biên lãi ròng cả tuần từ 30% trở lên.', ip: 5, xu: 50 },
  { id: 'w4', name: 'Uy tín đi lên', desc: 'Danh tiếng R cuối tuần cao hơn đầu tuần ít nhất 2 điểm.', ip: 4, xu: 40 },
  { id: 'w5', name: 'Hàng đợi ngắn', desc: 'Tổng khách bỏ đi vì chờ lâu cả tuần không quá 25.', ip: 4, xu: 40 },
  { id: 'w6', name: 'Nhà dự báo của tuần', desc: 'Có ít nhất 3 dự đoán khoảng trúng trong tuần.', ip: 5, xu: 50 },
  { id: 'w7', name: 'Tự tay chơi trọn tuần', desc: 'Không có buổi nào chạy tự động (không đi ngủ sớm).', ip: 3, xu: 30 },
  { id: 'w8', name: 'Lãi đều mọi ngày', desc: 'Không có ngày nào lỗ trong tuần.', ip: 5, xu: 50 },
];
// mở khóa theo số sao (mục 15.7)
export const UNLOCKS = [[10, 'Thử thách tuần', 'Mỗi tuần một điều kiện đặc biệt, thưởng IP và xu.', 'tag'], [30, 'Bộ trang trí “Mùa Xuân”', 'Cây mai, chậu hoa và dây hoa trang trí tiệm.', 'sp1'], [60, 'Danh hiệu “Chủ tiệm có tâm”', 'Thưởng 200 xu và 10 IP.', 'ribbon'], [90, 'Huy hiệu “Ngôi sao Xuân”', 'Huy hiệu đặc biệt khi đạt 90 sao.', 'starXS']];
