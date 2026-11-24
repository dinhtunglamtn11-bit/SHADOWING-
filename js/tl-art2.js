// TeaLab: bộ tranh bổ sung (icon, hiệu ứng cảnh, minh họa). Dữ liệu thuần, không phụ thuộc DOM; tl-art.js nạp vào.
const IC10 = {
  // tốc độ, tâm trạng, hướng dẫn
  speed2: ['..........', 'k...k.....', 'kk..kk....', 'kyk.kyk...', 'kyykkyyk..', 'kyk.kyk...', 'kk..kk....', 'k...k.....', '..........', '..........'],
  speed4: ['..........', '..........', 'k..k..k...', 'kk.kk.kk..', 'kykkykkyk.', 'kk.kk.kk..', 'k..k..k...', '..........', '..........', '..........'],
  mood: ['..kkkkkk..', '.kyyyyyyk.', 'kyykyykyyk', 'kyyyyyyyyk', 'kyyyyyyyyk', 'kykyyyykyk', 'kyykkkkyyk', '.kyyyyyyk.', '..kkkkkk..', '..........'],
  arrow: ['....kk....', '...kyyk...', '...kyyk...', '...kyyk...', 'kkkkyykkkk', 'kyyyyyyyyk', '.kyyyyyyk.', '..kyyyyk..', '...kyyk...', '....kk....'],
  bubble: ['.kkkkkkkk.', 'kwwwwwwwwk', 'kwwwwwwwwk', 'kwkwkwkwwk', 'kwwwwwwwwk', '.kkkkwkkk.', '....kwk...', '.....k....', '..........', '..........'],
  // lịch / thời tiết
  firework: ['....y.....', '.r..y..r..', '..r.y.r...', '...ryr....', 'yyyyyyyyy.', '...ryr....', '..r.y.r...', '.r..y..r..', '....y.....', '..........'],
  school: ['..........', '.kkkkkkkk.', 'kwwwkkwwwk', 'kwbbkkbbwk', 'kwwwkkwwwk', 'kwbbkkbbwk', 'kwwwkkwwwk', 'kwbbkkbbwk', '.kkkkkkkk.', '..........'],
  market: ['..........', '.kkkkkkkk.', 'krwrwrwrwk', 'krwrwrwrwk', 'kkkkkkkkkk', '.k......k.', '.kyoyopyk.', '.kkkkkkkk.', '.k......k.', '.k......k.'],
  fog: ['...kkkk...', '..kssssk..', '.kssssssk.', 'kssssssssk', '.kkkkkkkk.', '..........', '.SSSSSSSS.', '..........', '..SSSSSSSS', '..........'],
  warm: ['....o.....', '.o..o..o..', '..ooooo...', '..oyyyo...', 'ooyyyyyoo.', '..oyyyo...', '..ooooo...', '.o..o..o..', '....o.....', '..........'],
  thunder: ['..kkkk....', '.kddddk...', 'kddddddkk.', 'kddddddddk', '.kkkkkkkk.', '...kyyk...', '..kyyk....', '.kyyyyk...', '...kyk....', '....k.....'],
  eye: ['..........', '..........', '..kkkkkk..', '.kwwwwwwk.', 'kwwbbbbwwk', 'kwwbkkbwwk', '.kwwwwwwk.', '..kkkkkk..', '..........', '..........'],
  eyeHalf: ['..........', '..........', '..kkkkkk..', '.kddddddk.', 'kddddddddk', 'kwwbkkbwwk', '.kwwwwwwk.', '..kkkkkk..', '..........', '..........'],
  eyeOff: ['..........', '..........', '..kkkkkkr.', '.ksssssrk.', 'ksssSSrSsk', 'kssSrSSssk', '.kssrsssk.', '..rkkkkk..', '..........', '..........'],
  // hộp thư
  mClue: ['..........', '..kkkk....', '.kbbbbk...', 'kbwbbbbk..', 'kbbbbbbk..', 'kbbbbbbk..', '.kbbbbkk..', '..kkkkkNk.', '......kNNk', '.......kk.'],
  mDecision: ['..kkkkkk..', '.kyyyyyyk.', 'kyyykkyyyk', 'kyykyykyyk', 'kyyyyykyyk', 'kyyyykyyyk', 'kyyyyyyyyk', 'kyyyykyyyk', '.kyyyyyyk.', '..kkkkkk..'],
  mInfo: ['..kkkkkk..', '.kbbbbbbk.', 'kbbbwwbbbk', 'kbbbbbbbbk', 'kbbbwwbbbk', 'kbbbwwbbbk', 'kbbbwwbbbk', 'kbbbwwbbbk', '.kbbbbbbk.', '..kkkkkk..'],
  mSystem: ['...kddk...', '.kkddddkk.', 'kddddddddk', 'kdddssdddk', 'dddsSSsddd', 'dddsSSsddd', 'kdddssdddk', 'kddddddddk', '.kkddddkk.', '...kddk...'],
  hourglass: ['kkkkkkkkkk', '.kwwwwwwk.', '..kwyywk..', '...kwwk...', '....kk....', '...kyyk...', '..kyyyyk..', '.kyyyyyyk.', 'kkkkkkkkkk', '..........'],
  // sao, huy hiệu
  starE: ['....kk....', '...ksSk...', '..ksSSsk..', 'kkksSSskkk', 'ksSSSSSSsk', '.ksSSSSsk.', '..ksSSsk..', '.ksSkkSsk.', '.kSk..kSk.', '.kk....kk.'],
  starXS: ['..p.kk.p..', '.ppkyykpp.', '..kyyyyk..', 'kkkyyyykkk', 'kyyyyyyyyk', '.kyyyyyyk.', '..kyyyyk..', '.kyykkyyk.', '.kyk..kyk.', '.kk....kk.'],
  // danh hiệu theo Điểm Mùa
  ttl1: ['..........', '...kk.kk..', '..kggkggk.', '..kgggggk.', '...kkgkk..', '.....g....', '.....g....', '.kNNNNNNk.', '.kNNNNNNk.', '..kkkkkk..'],
  ttl2: ['..........', '.kkkkkkkk.', 'krwrwrwrwk', 'kkkkkkkkkk', '.kbbbbbbk.', '.kbwwbddk.', '.kbwwbddk.', '.kbbbbddk.', '.kkkkkkkk.', '..........'],
  ttl3: ['..........', '....kk....', '..kkkkkk..', '.kttttttkk', 'kkttwtttkk', '.kttttttk.', '.kttttttk.', '..kkkkkk..', '..........', '..........'],
  ttl4: ['..........', 'k...kk...k', 'kk.kyyk.kk', 'kykkyykkyk', 'kyyyyyyyyk', 'kyrYyyYryk', 'kyyyyyyyyk', 'kkkkkkkkkk', '..........', '..........'],
  // bộ trang trí Mùa Xuân
  sp1: ['..p..pp...', '.ppp.ppp..', '..p.kN.p..', '.p..kNppp.', 'ppp.kN.p..', '.p.kN.....', '..kNk.....', '.kNNNNk...', '.kNNNNk...', '..kkkk....'],
  sp2: ['..y...y...', '.yoy.yoy..', '..y.kN.y..', '.y..kNyoy.', 'yoy.kN.y..', '.y.kN.....', '..kNk.....', '.kNNNNk...', '.kNNNNk...', '..kkkk....'],
  sp3: ['..........', 'pp..kk..pp', 'ppp.kk.ppp', 'pwpkkkkpwp', 'ppp.kk.ppp', '.pp.kk.pp.', '..p.kk.p..', '....kk....', '..........', '..........'],
  sp4: ['.kkkkkkkk.', '.krrrrrrk.', '.krrrrrrk.', '.kryyyyrk.', '.krrrrrrk.', '.kryyyyrk.', '.krrrrrrk.', '.krryyrrk.', '.krrrrrrk.', '.kkkkkkkk.'],
  sp5: ['k........k', '.kp....pk.', '..kpyypk..', '...kkkk...', '..........', 'k........k', '.kp....pk.', '..kpyypk..', '...kkkk...', '..........'],
  // phụ kiện ly, giao hàng, biển
  straw: ['......kkk.', '.....kwrk.', '....kwrk..', '...kwrk...', '..kwrk....', '.kwrk.....', '.kwrk.....', '.kwrk.....', '..kkk.....', '..........'],
  lid: ['..........', '..........', '...kkkk...', '..kwwwwk..', '.kwwwwwwk.', 'kkkkkkkkkk', 'kwwwwwwwwk', 'kkkkkkkkkk', '..........', '..........'],
  contract: ['..........', '.kkkkkkk..', 'kwwwwwwkk.', 'kwkkkkwwk.', 'kwwwwwwwk.', 'kwkkkkkwk.', 'kwwwwwwwk.', 'kwkkrrrwk.', 'kwwwwwwwk.', '.kkkkkkkk.'],
  priceBoard: ['..........', 'kkkkkkkkkk', 'kyyyyyyyyk', 'kykkkkkkyk', 'kyyyyyyyyk', 'kykkkkyyyk', 'kyyyyyyyyk', 'kkkkkkkkkk', '...k..k...', '...k..k...'],
  soldout: ['..........', 'kkkkkkkkkk', 'kSSSSSSSSk', 'kSrSSSSrSk', 'kSSrSSrSSk', 'kSSSrrSSSk', 'kSSSrrSSSk', 'kSSrSSrSSk', 'kSrSSSSrSk', 'kkkkkkkkkk'],
  cupFull: ['..y..y....', '.kkkkkkkk.', 'kwwwwwwwwk', '.kbbbbbbk.', '.kbbbbbbk.', '.kbwbbbbk.', '..kbbbbk..', '..kbbbbk..', '...kkkk...', '..........'],
  cupSpill: ['..........', '.kkkkkkk..', 'kwbbbbbwk.', 'kwbbbbbwk.', '.kkkkkkk..', '..........', '.kbbbbbbk.', 'kbBbbbbBbk', '.kkkkkkkk.', '..........'],
  // công cụ mua bằng IP
  ipCount: ['..........', 'kkkkkkkkkk', 'kwwwwwwwwk', 'kwkwkwkwwk', 'kwkwkwkwwk', 'kwkwkwkwwk', 'kwrrrrrrwk', 'kwwwwwwwwk', 'kkkkkkkkkk', '..........'],
  ipSurvey: ['...kkkk...', '.kkkddkkk.', 'kwgwkkkkwk', 'kwwwwwwwwk', 'kwgwkkkkwk', 'kwwwwwwwwk', 'kwgwkkkkwk', 'kwwwwwwwwk', '.kkkkkkkk.', '..........'],
  ipSupplier: ['..........', '.kkkkkkkk.', 'kmmmmmmmmk', 'kmyyyyyymk', 'kmmmmmmmmk', 'kmwwwwwwmk', 'kmwkkkkwmk', 'kmwwwwwwmk', 'kmmmmmmmmk', '.kkkkkkkk.'],
  ipDiag: ['..........', 'kkkkkkkkkk', 'kddddddddk', 'kddddgdddk', 'kdddgdgddk', 'kgggdddggk', 'kddddddddk', 'kkkkkkkkkk', '..........', '..........'],
  ipShelf: ['..........', 'kyyk.kkkk.', 'kyyk.kggk.', 'kkkkkkkkkk', '.kppk.kbbk', '.kppk.kbbk', 'kkkkkkkkkk', '.k......k.', '.k......k.', '..........'],
};
// khiên nhóm cột mốc A–E (sinh bằng chương trình)
const GL5 = { A: ['010', '101', '111', '101', '101'], B: ['110', '101', '110', '101', '110'], C: ['011', '100', '100', '100', '011'], D: ['110', '101', '101', '101', '110'], E: ['111', '100', '110', '100', '111'] };
const GRP_COL = { A: 'g', B: 'b', C: 'v', D: 'o', E: 'p' };
for (const L of 'ABCDE') {
  const col = GRP_COL[L], rows = ['kkkkkkkkkk', ...Array.from({ length: 7 }, () => 'k' + col.repeat(8) + 'k'), '.k' + col.repeat(6) + 'k.', '..kkkkkk..'].map(r => [...r]);
  GL5[L].forEach((gr, y) => [...gr].forEach((b, x) => { if (b === '1') rows[2 + y][4 + x] = 'w'; }));
  IC10['grp' + L] = rows.map(r => r.join(''));
}
export const EXTRA_IC = IC10;

// ---------- hiệu ứng lớp phủ cho cảnh ngoài ----------
export function sceneFx(g, o, R) {
  const { k = 0, sky = 'cloud', t = 0, decor = [], day = 1, hour = 0 } = o;
  if (decor.includes('snow')) { g.fillStyle = '#ffffff'; for (let i = 0; i < 46; i++) { const x = (i * 37 + Math.sin(t * 0.8 + i) * 4 + t * 3) % 164, y = (i * 23 + t * 14) % 100; g.fillRect(Math.round(x), Math.round(y), i % 5 ? 1 : 2, i % 5 ? 1 : 2); } }
  if ((decor.includes('newyear') && (day === 31 || day === 32) || (decor.includes('tet') && day === 68)) && k >= 3) { // pháo hoa: giao thừa dương lịch và mùng 1
    const cols = ['#ff5a5f', '#ffd84d', '#5fd068', '#5ab4ff', '#ff7fb5'];
    for (let j = 0; j < 3; j++) { const ph = (t * 0.7 + j * 1.0) % 3, rad = Math.min(15, ph * 9), fade = ph < 1.8 ? 1 : 0; if (!fade) continue; const cx = [30, 72, 122][j], cy = [22, 14, 24][j]; g.fillStyle = cols[(Math.floor(t * 0.7 / 3) + j * 2) % 5]; for (let a = 0; a < 14; a++) { const an = a * 0.45 + j; g.fillRect(Math.round(cx + Math.cos(an) * rad), Math.round(cy + Math.sin(an) * rad + ph * 2), 2, 2); } if (ph < 0.3) R(cx - 1, cy + 8 - ph * 30, 1, 4, '#ffffff'); }
  }
  if (sky === 'cold' || sky === 'monsoon') { // rét, sương mù trôi
    for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? '#e6f6ff2a' : '#ffffff22'; const off = (t * (3 + i) + i * 40) % 220 - 30; g.fillRect(Math.round(off), 54 + i * 9, 80, 5); g.fillRect(Math.round(off - 110), 58 + i * 9, 70, 4); }
  }
  if (sky === 'warm') { g.fillStyle = '#ffb86b1f'; g.fillRect(0, 0, 160, 58); g.fillStyle = '#fff3b026'; for (let i = 0; i < 4; i++) { const x = 10 + i * 34; g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 8, 0); g.lineTo(x + 38, 60); g.lineTo(x + 24, 60); g.fill(); } }
  if (o.rain && Math.floor(t * 2) % 13 === 0) { g.fillStyle = '#ffffff30'; g.fillRect(0, 0, 160, 100); } // chớp khi mưa to
  if (k === 4) { // S5: ba cảnh theo giờ (22h, 23h, 24h)
    g.fillStyle = ['#0b103000', '#0b103044', '#0b103077'][hour]; g.fillRect(0, 0, 160, 100);
    if (hour >= 1) for (let i = 0; i < 14; i++) R((i * 29 + 7) % 158, (i * 41) % 36, 1, 1, '#ffffff'); // trời nhiều sao hơn
    if (hour === 2) { g.fillStyle = '#c8d8ff22'; g.fillRect(0, 70, 160, 14); R(100, 17, 28, 3, '#ffd84d'); R(101, 18, 26, 1, '#2d1f47'); } // sương đêm và dải đèn biển “sắp đóng”
  }
}
// hiệu ứng trong nhà
export function interiorFx(g, o, R) {
  const { k = 0, decor = [], t = 0, hour = 0 } = o;
  if (decor.includes('cho')) { // Chợ Tết: chậu đào, cờ đuôi nheo, bao lì xì
    for (let i = 0; i < 16; i++) { R(i * 10 + 2, 1 + (i % 2), 6, 3, i % 2 ? '#ff5a5f' : '#ffd84d'); }
    R(58, 52, 14, 10, '#c2354a'); R(60, 40, 2, 13, '#8a5a36'); R(66, 42, 2, 11, '#8a5a36'); for (const [x, y] of [[56, 38], [61, 35], [64, 40], [68, 38], [59, 43]]) R(x, y, 3, 3, '#ff7fb5');
    R(40, 46, 8, 11, '#ff5a5f'); R(41, 47, 6, 9, '#ffd84d');
  }
  if (k === 4) { g.fillStyle = ['#14123000', '#14123040', '#14123070'][hour]; g.fillRect(0, 0, 160, 100); if (hour === 2) { g.fillStyle = '#ffd84d'; g.font = '8px monospace'; g.fillText('z', 112 + Math.sin(t * 2) * 2, 40 - ((t * 6) % 10)); g.fillText('z', 118, 34 - ((t * 5) % 8)); } }
}

// ---------- minh họa mới (160×64) ----------
export const ILL_EXTRA = ['sleep', 'daystart', 'dayend', 'weekend', 'final', 'season', 'summer'];
export function drawIllus2(kind, X) {
  const { g, R, sky, ground, person, ic } = X;
  const big = (name, x, y, s) => { const c = ic(name); if (!c) return; g.imageSmoothingEnabled = false; g.drawImage(c, x, y, c.width * s, c.height * s); };
  const stars = (n, col) => { for (let i = 0; i < n; i++) R((i * 41 + 9) % 158, (i * 17) % 40, 1, 1, i % 3 ? (col || '#ffffff') : '#ffd84d'); };
  const shop = (x, open) => { R(x, 22, 46, 28, '#e8d5b0'); R(x - 2, 16, 50, 7, '#ff5a5f'); for (let i = 0; i < 5; i++) R(x - 2 + i * 10, 16, 5, 7, '#ffffff'); R(x + 4, 28, 20, 14, '#9ad0ff'); R(x + 30, 30, 12, 20, '#8a5a36'); R(x + 31, 35, 5, 3, open ? '#5fd068' : '#ff5a5f'); };
  if (kind === 'sleep') { sky('#0b1030', '#2d2a5c'); stars(24); R(120, 7, 14, 14, '#fff3b0'); R(125, 7, 12, 14, '#1a1f48'); ground('#3a3f66'); R(20, 34, 74, 16, '#8a5a36'); R(22, 30, 70, 8, '#a98bff'); R(22, 30, 70, 2, '#c9b6ff'); R(24, 26, 16, 8, '#ffffff'); R(24, 26, 16, 1, '#e4dff7'); R(18, 28, 4, 22, '#5b3c22'); R(92, 32, 4, 18, '#5b3c22'); g.fillStyle = '#2d1f47'; g.fillRect(26, 22, 10, 6); person(24, 20, 'LA', 0); R(24, 20, 12, 7, '#a98bff'); big('sleepz', 40, 12, 2); R(104, 38, 18, 12, '#ffd84d'); R(106, 40, 14, 8, '#fff6dc'); R(112, 42, 1, 4, '#2d1f47'); R(112, 45, 4, 1, '#2d1f47'); R(105, 36, 4, 3, '#c86a1f'); R(117, 36, 4, 3, '#c86a1f'); }
  else if (kind === 'daystart') { sky('#ffb27a', '#bfe3ff'); R(60, 26, 22, 22, '#fff3b0'); R(63, 29, 16, 16, '#ffe066'); for (let i = 0; i < 8; i++) { const a = i * 0.785; R(71 + Math.cos(a) * 18, 37 + Math.sin(a) * 18, 2, 2, '#ffe066'); } ground('#b9b3cf'); shop(100, true); person(88, 30, 'LA', 0); big('signOpen', 22, 20, 3); R(8, 8, 18, 3, '#ffffff'); R(12, 5, 12, 3, '#ffffff'); R(124, 6, 22, 3, '#ffffff'); }
  else if (kind === 'dayend') { sky('#ff7a5a', '#3b2a6a'); R(110, 20, 20, 20, '#ffd84d'); R(110, 38, 20, 4, '#3b2a6a'); ground('#3a3f66'); shop(20, false); R(70, 26, 2, 24, '#2d1f47'); R(66, 24, 10, 4, '#2d1f47'); R(67, 28, 8, 6, '#fff3b0'); person(80, 32, 'LA', 0); big('coin', 124, 40, 2); big('coin', 134, 44, 2); big('coin', 144, 40, 2); stars(10); }
  else if (kind === 'weekend') { sky('#fff1cf', '#ffd890'); for (let i = 0; i < 30; i++) R((i * 53 + 5) % 158, (i * 29) % 60, 3, 2, ['#ff5a5f', '#5ab4ff', '#5fd068', '#ffd84d', '#ff7fb5'][i % 5]); R(46, 8, 68, 48, '#ffffff'); R(46, 8, 68, 10, '#ff5a5f'); R(46, 8, 68, 1, '#2d1f47'); R(46, 55, 68, 1, '#2d1f47'); R(46, 8, 1, 48, '#2d1f47'); R(113, 8, 1, 48, '#2d1f47'); for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) R(52 + c * 10, 22 + r * 11, 6, 6, (r * 6 + c) < 7 ? '#5fd068' : '#e4dff7'); big('star', 98, 38, 2); }
  else if (kind === 'final') { sky('#1d1a4a', '#5a4ab0'); stars(30); const cs = ['#ff5a5f', '#ffd84d', '#5fd068', '#5ab4ff', '#ff7fb5']; for (let j = 0; j < 4; j++) { const cx = 20 + j * 40, cy = 14 + (j % 2) * 8; for (let a = 0; a < 12; a++) R(cx + Math.cos(a * 0.52) * 9, cy + Math.sin(a * 0.52) * 9, 2, 2, cs[j]); } ground('#3a3f66'); R(60, 40, 40, 10, '#8a5a36'); R(56, 48, 48, 4, '#5b3c22'); big('trophy', 68, 8, 3); big('star', 40, 30, 2); big('star', 108, 30, 2); big('star', 24, 40, 1); big('star', 128, 42, 1); }
  else if (kind === 'season') { sky('#f3efff', '#e4dff7'); R(14, 6, 1, 50, '#2d1f47'); R(14, 56, 136, 1, '#2d1f47'); for (let i = 0; i < 10; i++) { const h = 6 + i * 3 + ((i * 7) % 5); R(20 + i * 13, 56 - h, 8, h, i % 2 ? '#a98bff' : '#6f55d6'); } let px = 24, py = 46; for (let i = 1; i < 10; i++) { const nx = 24 + i * 13, ny = 46 - i * 3 - ((i * 5) % 4); for (let s = 0; s < 13; s++) R(px + s, py + (ny - py) * s / 13, 2, 2, '#ff5a5f'); R(nx - 1, ny - 1, 4, 4, '#ffd84d'); px = nx; py = ny; } big('trophy', 128, 4, 2); }
  else if (kind === 'summer') { sky('#6fd0ff', '#e8f8ff'); R(124, 6, 22, 22, '#fff3b0'); R(127, 9, 16, 16, '#ffe066'); for (let i = 0; i < 8; i++) { const a = i * 0.785; R(135 + Math.cos(a) * 17, 17 + Math.sin(a) * 17, 2, 2, '#ffe066'); } R(0, 34, 160, 12, '#3cb4e8'); for (let i = 0; i < 12; i++) R(i * 14 + 2, 38 + (i % 2) * 3, 8, 1, '#ffffff'); R(0, 46, 160, 18, '#f3d9a0'); R(0, 46, 160, 1, '#c9a060'); R(34, 24, 2, 32, '#8a5a36'); R(18, 22, 34, 6, '#ff5a5f'); for (let i = 0; i < 4; i++) R(18 + i * 9, 22, 4, 6, '#ffffff'); R(20, 18, 30, 5, '#ff5a5f'); R(86, 34, 14, 20, '#ffffffcc'); R(88, 40, 10, 12, '#ffd23f'); R(90, 36, 3, 5, '#ffffff'); R(95, 28, 2, 12, '#ff5a5f'); R(106, 38, 12, 16, '#ffffffcc'); R(108, 44, 8, 8, '#8fbf4a'); R(113, 30, 2, 14, '#5fd068'); }
  else return false;
  return true;
}
