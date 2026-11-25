// TeaLab: cảnh ngoài phố, vẽ bằng chương trình trên khung 160×100. Quán TeaLab là một CỬA HÀNG có mặt tiền (biển hiệu, mái hiên sọc, cửa kính, quầy sau cửa sổ),
// to dần theo giai đoạn: 1 cửa hàng nhỏ, 2 cửa hàng, 3 cửa hàng hai gian, 4 thêm chi nhánh bên trái.
const OUT = '#2d1f47', GOLD = '#ffd84d';
const GEO = { 1: { x0: 90, x1: 148, top: 28, bays: 1, signH: 9, winH: 16 }, 2: { x0: 80, x1: 148, top: 20, bays: 1, signH: 10, winH: 20 }, 3: { x0: 62, x1: 150, top: 16, bays: 2, signH: 10, winH: 24 }, 4: { x0: 62, x1: 150, top: 16, bays: 2, signH: 10, winH: 24 } };
const BASE_Y = 72; // đáy mặt tiền = mép vỉa hè

// hình học dùng chung cho cảnh, hàng khách xếp hàng, tiền bay, khói
export function shopGeo(stage = 1, spec) {
  const g = spec || GEO[Math.min(4, Math.max(1, stage))], doorW = 16, doorX = g.x1 - 4 - doorW, signY = g.top + 5, awnY = signY + g.signH + 1, winY = awnY + 9;
  const span = doorX - 4 - (g.x0 + 4), bw = g.bays === 2 ? Math.floor((span - 4) / 2) : span, bays = [];
  for (let i = 0; i < g.bays; i++) bays.push([g.x0 + 4 + i * (bw + 4), bw]);
  const slots = []; for (const [bx, w] of bays) for (let x = bx + 3; x + 10 <= bx + w - 1; x += 11) slots.push(x);
  const baseY = winY + g.winH + 2;
  return { ...g, doorW, doorX, signY, awnY, winY, bays, bw, slots, baseY, counterX: g.x0 - 4, coinX: bays[0][0] + (bays[0][1] >> 1), coinY: winY + 6, steamX: bays[0][0] + 4, personY: winY + g.winH - 14 };
}

const TILE = (R, x, y, w, h, a, b) => { for (let j = 0; j < h; j += 6) for (let i = 0; i < w; i += 12) R(x + i + (j % 12 ? 6 : 0), y + j, 11, 5, ((i / 12 + j / 6) | 0) % 2 ? a : b); };

function skyline(g, R, o, D) {
  const { k = 0 } = o, night = k === 4, lit = k >= 3, far = D.mix('#8fa0c8', D.bot, night ? 0.9 : 0.45), near = night ? '#161c40' : D.mix('#7a86b8', D.bot, 0.25), nearDark = night ? '#10163a' : D.mix('#6a74a6', D.bot, 0.3);
  // lớp xa (nhạt)
  for (let i = 0; i < 9; i++) { const x = i * 19 - 4, h = 22 + ((i * 11) % 4) * 6; R(x, 58 - h, 17, h, night ? '#1d2552' : far); if (i % 3 === 0) { R(x + 7, 58 - h - 5, 1, 5, night ? '#2b3560' : far); R(x + 6, 58 - h - 6, 3, 1, '#c2354a'); } }
  // lớp gần: nhà cao với cửa sổ, mái, bồn nước
  for (let i = 0; i < 12; i++) {
    const x = i * 14 - 3, h = 18 + ((i * 7) % 5) * 5, w = 12;
    R(x, 58 - h, w, h, near); R(x, 58 - h, w, 2, nearDark); R(x + w - 2, 58 - h + 2, 2, h - 2, nearDark);
    if (i % 4 === 1) { R(x + 3, 58 - h - 4, 6, 4, nearDark); R(x + 4, 58 - h - 6, 1, 2, nearDark); R(x + 7, 58 - h - 6, 1, 2, nearDark); }
    if (i % 5 === 3) R(x + 5, 58 - h - 6, 1, 6, nearDark);
    for (let r = 0; r < Math.floor((h - 5) / 5); r++) for (let c = 0; c < 2; c++) { const on = lit && ((i * 3 + r * 5 + c * 7) % 4 !== 0); R(x + 2 + c * 5, 58 - h + 4 + r * 5, 3, 3, on ? (night ? '#ffd84d' : '#ffb84d') : (night ? '#232b5a' : '#c6d6f0')); }
  }
}

function sidewalk(g, R, o) {
  const { k = 0, t = 0 } = o, night = k === 4;
  R(0, 58, 160, 14, night ? '#3a3f66' : '#c4bedb'); TILE(R, 0, 60, 160, 12, night ? '#3d4270' : '#cbc5e0', night ? '#353a60' : '#bdb7d4');
  R(0, 57, 160, 1, night ? '#4a5088' : '#e4dff7'); R(0, 71, 160, 1, '#6b6590'); R(0, 72, 160, 2, night ? '#555a88' : '#e0dcef'); // lề đường
  R(0, 74, 160, 26, night ? '#262a4a' : '#7d7799'); for (let y = 74; y < 100; y += 3) R(0, y, 160, 1, night ? '#2a2e52' : '#827c9e'); // mặt đường
  for (let x = 0; x < 160; x += 20) R(x + ((t * 2) % 20 - 20), 88, 10, 2, night ? '#6a6f99' : '#efeaf9');
  R(0, 98, 160, 2, night ? '#1c1f3a' : '#6a6488');
}

function lampPosts(g, R, o) {
  const { k = 0 } = o; if (k < 3) { for (const lx of [22, 118]) { R(lx, 38, 2, 34, '#4a4378'); R(lx - 3, 36, 8, 3, '#4a4378'); R(lx - 2, 39, 6, 2, '#cfd6e8'); } return; }
  for (const lx of [22, 118]) { R(lx, 38, 2, 34, '#2d1f47'); R(lx - 3, 36, 8, 3, '#2d1f47'); R(lx - 2, 39, 6, 3, '#fff3b0'); g.fillStyle = '#fff3b030'; g.fillRect(lx - 8, 42, 18, 30); g.fillStyle = '#fff3b018'; g.fillRect(lx - 12, 46, 26, 26); }
}

function tree(g, R, x, o) { // cây ven đường
  const { t = 0 } = o, sw = Math.round(Math.sin(t * 1.2 + x) * 0.6);
  R(x + 3, 50, 3, 22, '#6b4226'); R(x + 3, 50, 1, 22, '#8a5a36'); R(x, 70, 9, 2, '#8a8fa0'); // gốc + bồn
  R(x - 3 + sw, 30, 15, 12, '#2f9a4a'); R(x - 1 + sw, 26, 11, 6, '#3dbb5a'); R(x - 4 + sw, 38, 17, 8, '#2f9a4a'); R(x + 1 + sw, 34, 3, 3, '#5fd068'); R(x + 7 + sw, 40, 3, 3, '#5fd068'); R(x - 2 + sw, 44, 14, 3, '#238038');
}

function glassFill(R, x, y, w, h, lit) { for (let j = 0; j < h; j += 2) R(x, y + j, w, 2, lit ? (j < h / 2 ? '#fff0bd' : '#ffe08a') : (j < h / 2 ? '#d6ecfb' : '#bcdcf3')); }

function window_(R, g, o, G, bx, bw, lit, open, idx) {
  const y = G.winY, h = G.winH, jars = ['#5fd068', '#c9905a', '#ffd84d', '#ff7fb5', '#a98bff', '#3cc8b4'];
  R(bx - 2, y - 2, bw + 4, h + 4, '#5b3a22'); R(bx - 2, y - 2, bw + 4, 1, '#8a5a36'); R(bx - 2, y + h + 1, bw + 4, 1, '#3b2418'); // khung gỗ
  glassFill(R, bx, y, bw, h, lit);
  if (!open) { R(bx, y, bw, h, '#7d8296'); for (let j = 0; j < h; j += 2) R(bx, y + j, bw, 1, '#656a80'); R(bx, y + h - 3, bw, 3, '#4a4f64'); return; }
  R(bx + 2, y + 6, bw - 4, 1, '#8a5a36'); for (let i = 0; i < Math.floor((bw - 6) / 4); i++) { const c = jars[(i + idx * 2) % jars.length]; R(bx + 3 + i * 4, y + 3, 3, 3, c); R(bx + 3 + i * 4, y + 2, 3, 1, '#ffffff'); } // kệ hũ trà
  if (h >= 20) { R(bx + bw - 13, y + 8, 10, 6, OUT); R(bx + bw - 12, y + 9, 8, 4, '#1c1233'); R(bx + bw - 11, y + 10, 5, 1, '#ffffff'); R(bx + bw - 11, y + 12, 4, 1, GOLD); } // bảng thực đơn nhỏ
  const mx = bx + (bw >> 1); R(mx, y, 1, 2, '#3b2418'); R(mx - 2, y + 2, 5, 2, GOLD); if (lit) { g.fillStyle = '#fff3b040'; g.beginPath(); g.arc(mx, y + 5, 7, 0, 6.3); g.fill(); } // đèn thả
}

function windowFront(R, bx, bw, G, open, lit) {
  const y = G.winY, h = G.winH; if (!open) return;
  R(bx - 1, y + h - 5, bw + 2, 5, '#a06a3c'); R(bx - 1, y + h - 5, bw + 2, 1, '#c9905a'); R(bx - 1, y + h - 1, bw + 2, 1, '#6b4226'); // quầy gỗ
  for (let i = 0; i < Math.floor((bw - 4) / 8); i++) { R(bx + 3 + i * 8, y + h - 8, 3, 3, '#ffffff'); R(bx + 3 + i * 8, y + h - 9, 3, 1, '#9a93c4'); } // ly trên quầy
  R(bx + bw - 8, y + h - 8, 6, 3, '#5b5478'); R(bx + bw - 7, y + h - 7, 4, 1, '#5fd068'); // máy tính tiền
  for (let i = 0; i < 3; i++) R(bx + 4 + i * 6, y + 2 + i * 2, 1, 6 - i * 2, '#ffffff55'); // vệt phản chiếu kính
  R(bx - 3, y + h + 1, bw + 6, 2, '#c9905a'); // bệ cửa sổ
}

function flowerBox(R, bx, bw, G, o) {
  const y = G.winY + G.winH + 3, cols = ['#ff7fb5', '#ffd84d', '#ffffff', '#ff9a3c']; R(bx, y, bw, 4, '#6b4226'); R(bx, y, bw, 1, '#8a5a36');
  for (let i = 0; i < bw; i += 2) { R(bx + i, y - 2 - (i % 3 === 0 ? 1 : 0), 1, 2, '#2f9a4a'); if (i % 4 === 0) R(bx + i, y - 3 - (i % 3 === 0 ? 1 : 0), 2, 2, cols[(i / 4 | 0) % 4]); if (i % 6 === 1) R(bx + i, y + 4, 1, 2, '#3dbb5a'); }
}

function door(R, g, G, o, lit, open) {
  const dx = G.doorX, dw = G.doorW, dy = G.winY - 3, dh = BASE_Y - dy;
  R(dx - 2, dy, dw + 4, dh, '#5b3a22'); R(dx - 2, dy, dw + 4, 1, '#8a5a36');
  const gh = Math.min(dh - 10, 20); glassFill(R, dx, dy + 2, dw, gh, lit && open);
  if (!open) { for (let j = 0; j < gh; j += 2) R(dx, dy + 2 + j, dw, 1, '#656a80'); }
  R(dx + (dw >> 1), dy + 2, 1, gh, '#5b3a22'); // nẹp giữa
  R(dx, dy + 2 + gh, dw, dh - 2 - gh, '#8a5a36'); R(dx + 2, dy + 4 + gh, dw - 4, dh - 8 - gh, '#a06a3c'); R(dx + 2, dy + 4 + gh, dw - 4, 1, '#c9905a'); // tấm cánh dưới
  R(dx + dw - 4, dy + 4 + gh - 3, 2, 3, GOLD); // tay nắm
  R(dx + 3, dy + 5, 10, 5, open ? '#2f9a4a' : '#c2354a'); R(dx + 3, dy + 5, 10, 1, '#ffffff55'); // biển Mở/Đóng treo cửa
  if (open) { for (let i = 0; i < 3; i++) R(dx + 5 + i * 3, dy + 7, 1, 2, '#ffffff'); } else { R(dx + 5, dy + 7, 6, 1, '#ffffff'); }
  R(dx + 1, BASE_Y - 2, dw - 2, 2, '#c2354a'); R(dx + 1, BASE_Y - 2, dw - 2, 1, '#e8454d'); // thảm chùi chân
  // đèn tường hai bên cửa
  for (const lx of [dx - 5, dx + dw + 3]) { if (lx < G.x0 + 1 || lx > G.x1 - 2) continue; R(lx, dy + 6, 2, 1, '#3b2418'); R(lx - 1, dy + 7, 4, 5, '#3b2418'); R(lx, dy + 8, 2, 3, lit ? '#fff3b0' : '#cfd6e8'); if (lit) { g.fillStyle = '#fff3b030'; g.beginPath(); g.arc(lx + 1, dy + 9, 8, 0, 6.3); g.fill(); } }
}

function shopBody(g, R, o, G, D, label, lit, open, withBranchStaff) {
  const { x0, x1, top } = G, w = x1 - x0;
  g.fillStyle = '#00000026'; g.fillRect(x0 - 2, BASE_Y, w + 4, 3); // bóng đổ xuống vỉa hè
  // tường gạch
  R(x0, top + 4, w, BASE_Y - top - 4, '#f2e0ba'); for (let y = top + 6, row = 0; y < BASE_Y; y += 4, row++) { R(x0, y, w, 1, '#e4cd9f'); for (let x = x0 + (row % 2) * 4; x < x1; x += 8) R(x, y + 1, 1, 3, '#e4cd9f'); }
  R(x0, top + 4, 2, BASE_Y - top - 4, '#dcc79a'); R(x1 - 2, top + 4, 2, BASE_Y - top - 4, '#dcc79a'); // trụ góc
  // chân tường ốp gỗ
  R(x0, G.baseY, w, BASE_Y - G.baseY, '#8a5a36'); for (let x = x0 + 2; x < x1; x += 4) R(x, G.baseY + 1, 1, BASE_Y - G.baseY - 1, '#6b4226'); R(x0 - 1, G.baseY, w + 2, 2, '#a06a3c'); R(x0 - 1, G.baseY, w + 2, 1, '#c9905a');
  // mái đua + bảng hiệu
  R(x0 - 2, top, w + 4, 3, '#6b4226'); R(x0 - 2, top, w + 4, 1, '#a06a3c'); R(x0 - 1, top + 3, w + 2, 1, '#3b2418');
  const sy = G.signY, sh = G.signH, sx = x0 + 3, sw = w - 6;
  R(sx - 1, sy - 1, sw + 2, sh + 2, GOLD); R(sx, sy, sw, sh, '#2d1f47'); R(sx, sy + sh - 1, sw, 1, '#1c1233');
  const tw = label.length * 4 - 1, tx = x0 + ((w - tw) >> 1), ty = sy + ((sh - 5) >> 1);
  D.glyphs(R, tx, ty, label, lit ? '#fff7cf' : GOLD);
  if (lit) { g.fillStyle = '#ffd84d26'; g.fillRect(sx - 2, sy - 2, sw + 4, sh + 4); }
  // ly trà và lá hai đầu biển
  R(sx + 3, sy + 2, 5, 4, '#ffffff'); R(sx + 4, sy + 3, 3, 2, '#c9905a'); R(sx + 8, sy + 3, 1, 2, '#ffffff'); R(sx + 4, sy + 1, 1, 1, '#ffffff99'); R(sx + 6, sy, 1, 2, '#ffffff99');
  R(sx + sw - 8, sy + 2, 5, 3, '#5fd068'); R(sx + sw - 7, sy + 1, 3, 1, '#3dbb5a'); R(sx + sw - 6, sy + 5, 1, 2, '#2f9a4a');
  // mái hiên sọc đỏ trắng, mép lượn
  const ay = G.awnY; for (let x = x0 - 3, i = 0; x < x1 + 3; x += 5, i++) { const c = i % 2 ? '#ffffff' : '#e8454d', d = i % 2 ? '#e4dff7' : '#b3303a'; R(x, ay, 5, 5, c); R(x, ay + 4, 5, 1, d); R(x + 1, ay + 5, 3, 1, c); R(x + 2, ay + 6, 1, 1, c); }
  R(x0 - 3, ay - 1, w + 6, 1, '#b3303a'); g.fillStyle = '#00000030'; g.fillRect(x0, ay + 7, w, 2);
  if (o.promo) { R(x0 + 6, ay + 1, w - 12, 5, '#c2354a'); R(x0 + 7, ay + 2, w - 14, 3, GOLD); for (let i = 0; i < Math.floor((w - 14) / 4); i++) R(x0 + 9 + i * 4, ay + 3, 2, 1, '#c2354a'); } // dải khuyến mãi
  // cửa sổ, cửa ra vào
  G.bays.forEach(([bx, bw], i) => { window_(R, g, o, G, bx, bw, lit, open, i); });
  return { after: () => { G.bays.forEach(([bx, bw]) => { windowFront(R, bx, bw, G, open, lit); flowerBox(R, bx, bw, G, o); }); door(R, g, G, o, lit, open); } };
}

function people(g, o, G, D) {
  const { open = true, t = 0, staffN = 0, tired = [] } = o; if (!open) return;
  const slots = G.slots, lame = slots[0] ?? G.bays[0][0] + 3;
  g.drawImage(D.personCanvas('LA', 0), lame, G.personY + (Math.sin(t * 3) > 0.7 ? 1 : 0));
  for (let i = 0; i < Math.min(staffN, slots.length - 1); i++) g.drawImage(D.personCanvas('ST', i, { tired: tired[i] }), slots[i + 1], G.personY + (tired[i] ? 1 : 0) + (!tired[i] && Math.sin(t * 3 + i) > 0.8 ? -1 : 0));
}

function aframe(R, x, y, ch) { R(x, y + 11, 1, 2, '#6b4226'); R(x + 9, y + 11, 1, 2, '#6b4226'); R(x - 1, y, 12, 11, '#8a5a36'); R(x, y + 1, 10, 9, '#1c1233'); R(x + 2, y + 2, 6, 1, '#ffffff'); R(x + 2, y + 4, 4, 1, GOLD); R(x + 2, y + 6, 6, 1, '#ffffff'); R(x + 6, y + 8, 2, 2, ch); R(x + 2, y + 8, 2, 2, '#ffffff'); }

function pot(R, x, y, h, col) { R(x, y, 8, 6, '#c2354a'); R(x - 1, y, 10, 1, '#e8454d'); R(x + 1, y + 6, 6, 2, '#8a2a36'); R(x + 1, y - h, 6, h, col || '#2f9a4a'); R(x - 1, y - h + 3, 10, h - 3, col || '#2f9a4a'); R(x + 2, y - h - 2, 4, 3, '#3dbb5a'); R(x + 3, y - h + 2, 1, 1, '#ff7fb5'); R(x + 6, y - h + 5, 1, 1, '#ffd84d'); }

function bistro(R, x, y, stools) { R(x, y, 12, 3, '#c9905a'); R(x, y, 12, 1, '#e8c79a'); R(x + 5, y + 3, 2, 6, '#5b3a22'); R(x + 2, y + 9, 8, 1, '#5b3a22'); R(x + 3, y - 3, 3, 3, '#ffffff'); R(x + 3, y - 3, 3, 1, '#c9905a'); if (stools) { for (const sx of [x - 5, x + 12]) { R(sx, y + 2, 5, 2, '#e8454d'); R(sx + 2, y + 4, 1, 6, '#5b3a22'); } } }

function parasol(R, x, y) { R(x + 8, y, 1, 14, '#5b3a22'); for (let i = 0; i < 4; i++) { R(x + i * 5, y - 1 + (i === 0 || i === 3 ? 1 : 0), 5, 3 - (i === 0 || i === 3 ? 1 : 0), i % 2 ? '#ffffff' : '#e8454d'); } R(x + 2, y - 2, 14, 1, '#b3303a'); }

function van(R, x, y, t) { const by = y + Math.round(Math.sin(t * 2) * 0.4); R(x, by, 26, 11, '#ffffff'); R(x, by, 26, 1, '#e4dff7'); R(x + 17, by + 2, 9, 9, '#5ab4ff'); R(x + 19, by + 3, 6, 4, '#bfe3ff'); R(x, by + 5, 18, 3, '#e8454d'); R(x + 2, by + 1, 6, 3, '#ffd84d'); R(x + 3, by + 2, 4, 1, '#c86a1f'); for (const wx of [x + 4, x + 18]) { R(wx, by + 9, 6, 5, OUT); R(wx + 1, by + 10, 4, 3, '#9a93c4'); R(wx + 2, by + 11, 2, 1, OUT); } R(x + 25, by + 8, 1, 2, '#ffd84d'); }

function decorLayer(g, R, o, G, D, d) {
  const { t = 0, k = 0 } = o, x0 = G.x0, x1 = G.x1, ay = G.awnY, blink = i => ((t | 0) + i) % 2;
  if (d === 'noel') {
    for (let i = 0; i < 4; i++) R(5 + i * 2 - 0, 40 + i * 7, 14 - i * 2 + 4, 7, i % 2 ? '#238038' : '#2f9a4a'); // cây thông tầng
    for (let i = 0; i < 4; i++) { R(3 + i, 46 + i * 7 - 4, 18 - i * 2, 1, '#3dbb5a'); } R(11, 68, 4, 4, '#6b4226'); R(10, 34, 6, 6, GOLD); R(11, 32, 4, 2, GOLD); R(12, 30, 2, 2, '#fff3b0');
    for (let i = 0; i < 9; i++) R(6 + (i * 5) % 16, 44 + (i * 7) % 22, 2, 2, ['#ff5a5f', GOLD, '#5ab4ff'][(i + blink(i)) % 3]);
    R(2, 68, 5, 4, '#e8454d'); R(2, 70, 5, 1, '#ffd84d'); R(7, 69, 4, 3, '#5ab4ff'); R(14, 68, 5, 4, '#ffd84d'); R(16, 68, 1, 4, '#e8454d'); // hộp quà
    for (let x = x0; x < x1; x += 6) R(x, ay + 8, 2, 2, ['#ff5a5f', GOLD, '#5fd068'][((x / 6 | 0) + blink(1)) % 3]); // dây đèn dưới mái hiên
    R(G.doorX + 2, G.winY - 1, 12, 6, '#2f9a4a'); R(G.doorX + 2, G.winY, 12, 1, '#3dbb5a'); R(G.doorX + 7, G.winY + 2, 3, 3, '#e8454d'); // vòng nguyệt quế
  }
  if (d === 'newyear') {
    for (let i = 0; i <= 18; i++) { const x = x0 - 6 + i * ((x1 - x0 + 12) / 18), y = G.top - 3 + Math.round(Math.sin(i / 18 * Math.PI) * 3); R(x, y, 2, 2, [GOLD, '#ffffff', '#ff7fb5'][(i + blink(i)) % 3]); }
    for (const [bx, c] of [[x0 - 6, '#ffd84d'], [x0 - 2, '#c9d4ff'], [x1 + 3, '#ffd84d']]) { R(bx, 56, 4, 5, c); R(bx + 1, 55, 2, 1, c); R(bx + 1, 61, 1, 5, '#8a8fa0'); R(bx + 1, 57, 1, 1, '#ffffff'); }
  }
  if (d === 'cho') {
    for (let i = 0; i < 16; i++) { const y = 6 + Math.round(Math.sin(i * 0.8 + t * 0.8) * 2); R(i * 10 + 1, y, 6, 5, i % 2 ? '#e8454d' : GOLD); R(i * 10 + 3, y + 5, 2, 1, i % 2 ? '#e8454d' : GOLD); } R(0, 6, 160, 1, '#5b3a22');
    for (const [x, c] of [[8, '#e8454d'], [26, GOLD]]) { R(x, 52, 14, 3, c); for (let i = 0; i < 3; i++) R(x + i * 5, 52, 3, 3, '#ffffff'); R(x, 55, 1, 14, '#5b3a22'); R(x + 13, 55, 1, 14, '#5b3a22'); R(x - 1, 64, 16, 3, '#c9905a'); for (let i = 0; i < 4; i++) { R(x + 1 + i * 3, 60, 2, 4, ['#ff7fb5', '#ff9a3c', '#e8454d', '#ffd84d'][i]); R(x + 1 + i * 3, 59, 2, 1, '#2f9a4a'); } }
  }
  if (d === 'tet') {
    for (let i = 0; i < 3; i++) { const lx = x0 + 10 + i * Math.floor((x1 - x0 - 20) / 2), sw = Math.round(Math.sin(t + i) * 1); R(lx, ay + 7, 1, 3, '#5b3a22'); R(lx - 3 + sw, ay + 10, 7, 8, '#e8454d'); R(lx - 2 + sw, ay + 11, 5, 6, GOLD); R(lx - 1 + sw, ay + 12, 3, 4, '#e8454d'); R(lx + sw, ay + 18, 1, 4, GOLD); R(lx - 1 + sw, ay + 21, 3, 1, GOLD); } // đèn lồng đỏ
    for (const dx of [G.doorX - 9, G.doorX + G.doorW + 6]) if (dx > x0 && dx < x1 - 1) { R(dx, G.winY - 1, 3, 20, '#c2354a'); R(dx, G.winY - 1, 3, 1, GOLD); R(dx + 1, G.winY + 3, 1, 3, GOLD); R(dx + 1, G.winY + 9, 1, 3, GOLD); } // câu đối đỏ
    R(x1 + 1, 56, 9, 6, '#c2354a'); for (let i = 0; i < 3; i++) R(x1 + 2 + i * 3, 52, 2, 4, '#2f9a4a'); R(x1, 44, 11, 12, '#2f9a4a'); for (const [a, b] of [[2, 46], [6, 49], [3, 52], [8, 45], [7, 53]]) R(x1 + a, b, 2, 2, '#ff9a3c'); // cây quất
    R(4, 40, 2, 30, '#6b4226'); for (let i = 0; i < 12; i++) R((i * 5) % 14, 38 + (i * 4) % 20, 3, 3, i % 2 ? '#ff7fb5' : '#ffb0cc'); // cành đào
  }
  if (d === 'valentine') {
    for (let i = 0; i < 8; i++) { const x = x0 + 2 + i * Math.floor((x1 - x0 - 6) / 7), y = ay + 8 + (i % 2) * 2; R(x, y, 3, 2, '#ff5a5f'); R(x + 3, y, 3, 2, '#ff5a5f'); R(x, y + 2, 6, 2, '#ff5a5f'); R(x + 1, y + 4, 4, 1, '#ff5a5f'); R(x + 2, y + 5, 2, 1, '#ff5a5f'); }
    for (const bx of [G.doorX - 8, G.doorX + G.doorW + 3]) if (bx > x0 && bx < x1 - 4) { R(bx, 52, 6, 5, '#ff7fb5'); R(bx + 3, 52, 3, 5, '#ff7fb5'); R(bx + 1, 57, 4, 1, '#ff7fb5'); R(bx + 2, 58, 1, 10, '#8a8fa0'); }
  }
  if (d === 'ram') {
    for (let i = 0; i < 5; i++) { const x = 8 + i * 30, y = 10 + (i % 2) * 5 + Math.round(Math.sin(t + i) * 1); R(x + 3, y - 5, 1, 5, '#5b3a22'); R(x, y, 8, 9, GOLD); R(x + 1, y + 1, 6, 7, '#ff9a3c'); R(x + 2, y + 2, 4, 5, GOLD); R(x + 3, y + 9, 2, 3, '#e8454d'); }
  }
  if (d === 'spring') {
    for (const bx of [x0 - 9, x1 + 2]) { R(bx, 64, 8, 6, '#c2354a'); R(bx - 1, 64, 10, 1, '#e8454d'); R(bx + 3, 54, 2, 10, '#2f9a4a'); for (const [a, b, c] of [[0, 52, '#ff7fb5'], [4, 49, GOLD], [6, 53, '#ff9a3c'], [2, 57, '#ffffff'], [5, 58, '#ff7fb5']]) R(bx + a, b, 3, 3, c); }
  }
}

function branch(g, R, o, D, lit, open) {
  const G = shopGeo(2, { x0: 4, x1: 52, top: 24, bays: 1, signH: 9, winH: 18 });
  const parts = shopBody(g, R, o, G, D, 'TEALAB 2', lit, open); R(G.x0 + 5, G.signY + G.signH + 1, 0, 0, '#000');
  const sl = G.slots[0] ?? G.bays[0][0] + 3; if (open) { g.drawImage(D.personCanvas('ST', 3), sl, G.personY + (Math.sin(o.t * 3 + 2) > 0.8 ? -1 : 0)); if (G.slots[1]) g.drawImage(D.personCanvas('ST', 4), G.slots[1], G.personY); }
  parts.after(); return G;
}

// ---------- bên trong cửa hàng ----------
export function drawRoom(g, R, o, D) {
  const { stage = 1, k = 0, staffN = 0, guests = 0, t = 0, open = true, tired = [] } = o, night = k >= 3, dark = k === 4;
  const wallA = ['#f6e6c6', '#fff0cc', '#f8dfb0', '#d8b88a', '#7a688f'][k], wallB = ['#efd9b0', '#f6e3b4', '#f0d09a', '#c9a77a', '#6b5a8a'][k];
  const wood1 = night ? '#6a4e86' : '#b9905e', wood2 = night ? '#5c4278' : '#a67c4c', trim = night ? '#2d1f47' : '#7a4e2a';
  // tường: giấy dán sọc nhẹ + ốp gỗ chân tường
  R(0, 0, 160, 60, wallA); for (let x = 0; x < 160; x += 10) R(x, 0, 5, 60, wallB);
  R(0, 0, 160, 3, trim); R(0, 3, 160, 1, night ? '#5a4a7a' : '#a06a3c');
  R(0, 42, 160, 18, night ? '#5a4272' : '#9c6b3f'); for (let x = 0; x < 160; x += 8) R(x, 44, 1, 16, night ? '#4a3562' : '#7a4e2a'); R(0, 42, 160, 2, night ? '#6a5290' : '#c9905a');
  // sàn gỗ ván ngang
  R(0, 60, 160, 40, wood1); for (let y = 60; y < 100; y += 5) { R(0, y, 160, 1, wood2); for (let x = ((y / 5) % 2) * 12; x < 160; x += 24) R(x, y + 1, 1, 4, wood2); } R(0, 60, 160, 3, trim);
  // cửa sổ nhìn ra phố (màu trời theo buổi) + rèm
  const sk = D.SKY[k]; const win = (x, w) => { for (let y = 8; y < 38; y += 2) R(x, y, w, 2, D.mix(sk[0], sk[1], (y - 8) / 30)); for (let i = 0; i < 4; i++) { const bx = x + 2 + i * Math.floor(w / 4), bh = 6 + (i * 5) % 9; R(bx, 38 - bh, Math.floor(w / 4) - 2, bh, dark ? '#161c40' : '#8d9bc4'); } R(x - 2, 6, w + 4, 2, '#7a4e2a'); R(x - 2, 38, w + 4, 3, '#c9905a'); R(x - 2, 6, 2, 35, '#7a4e2a'); R(x + w, 6, 2, 35, '#7a4e2a'); R(x + (w >> 1), 8, 1, 30, '#7a4e2a'); R(x - 1, 8, 5, 22, '#d9535f'); R(x + w - 4, 8, 5, 22, '#d9535f'); R(x - 1, 8, 5, 2, '#b3303a'); R(x + w - 4, 8, 5, 2, '#b3303a'); };
  win(10, 38); if (stage >= 3) win(58, 28);
  // cây cảnh trên bệ cửa sổ
  R(18, 33, 6, 5, '#c2354a'); R(17, 28, 8, 6, '#2f9a4a'); R(19, 25, 4, 4, '#3dbb5a');
  // khung tranh khi chỉ có một cửa sổ
  if (stage < 3) { R(58, 12, 22, 16, '#5b3a22'); R(60, 14, 18, 12, '#cfe8f8'); R(60, 22, 18, 4, '#5fa84a'); R(66, 16, 6, 6, '#fff3b0'); R(63, 20, 5, 2, '#ffffff'); }
  // bảng thực đơn phấn
  R(90, 6, 56, 26, '#5b3a22'); R(92, 8, 52, 22, '#1c1233'); const cols = ['#ffd84d', '#5fd068', '#ff7fb5', '#5ab4ff', '#ffb08a', '#cfe8a0']; R(96, 10, 14, 1, '#ffffff'); R(112, 10, 4, 1, '#ffd84d'); R(125, 10, 14, 1, '#ffffff');
  for (let i = 0; i < Math.min(5, 2 + stage); i++) { R(96, 14 + i * 3, 3, 2, cols[i]); R(101, 14 + i * 3, 22 + (i * 5) % 10, 1, '#e4dff7'); R(133, 14 + i * 3, 7, 1, '#ffd84d'); }
  // đèn thả
  for (const lx of [30, 80, 130]) { R(lx, 3, 1, 8, '#3b2418'); R(lx - 4, 11, 9, 3, '#ffd84d'); R(lx - 3, 14, 7, 1, '#fff3b0'); if (night) { g.fillStyle = '#fff3b030'; g.beginPath(); g.arc(lx, 16, 14, 0, 6.3); g.fill(); } }
  // kệ sau quầy: hũ trà, hộp, máy pha
  R(96, 40, 62, 3, '#7a4e2a'); R(96, 43, 62, 1, '#3b2418'); const jars = ['#5fd068', '#c9905a', '#ffd84d', '#ff7fb5', '#a98bff', '#3cc8b4'];
  for (let i = 0; i < 6; i++) { R(100 + i * 9, 33, 7, 7, jars[i]); R(100 + i * 9, 32, 7, 2, '#ffffff'); R(102 + i * 9, 35, 2, 3, '#ffffff66'); }
  if (stage >= 2) { R(140, 22, 16, 18, '#cfd6e8'); R(141, 23, 14, 16, '#9aa0a8'); R(143, 26, 2, 9, OUTL); R(147, 26, 6, 4, '#5ab4ff'); R(147, 33, 6, 5, '#e4dff7'); R(122, 28, 12, 12, '#5b5478'); R(124, 30, 8, 5, '#c2354a'); R(123, 37, 10, 2, '#9a93c4'); }
  // quầy: mặt gỗ + tủ kính trưng bày + máy tính tiền
  R(84, 56, 76, 5, '#c9905a'); R(84, 56, 76, 1, '#e8c79a'); R(84, 61, 76, 1, '#6b4226'); R(84, 62, 76, 20, '#8a5a36'); for (let x = 86; x < 160; x += 6) R(x, 63, 1, 18, '#6b4226');
  R(88, 64, 48, 14, '#cfe8f8'); R(88, 64, 48, 1, '#ffffff'); R(88, 77, 48, 1, '#9a93c4'); R(88, 70, 48, 1, '#e4dff7');
  for (let i = 0; i < 5; i++) { R(91 + i * 9, 66, 6, 4, ['#ffd84d', '#ff7fb5', '#c9905a', '#5fd068', '#ffffff'][i]); R(91 + i * 9, 72, 6, 4, ['#ff9a3c', '#a98bff', '#ffd84d', '#e8454d', '#c9905a'][i]); }
  R(138, 66, 18, 12, '#6b4226'); R(140, 68, 14, 8, '#a06a3c'); R(120, 51, 14, 8, OUTL); R(121, 52, 12, 5, open ? '#5fd068' : '#ff5a5f'); R(135, 53, 8, 5, '#e4dff7'); R(144, 49, 6, 7, '#ffffff'); R(144, 49, 6, 1, '#9a93c4'); R(151, 51, 4, 5, '#c2354a'); R(151, 49, 4, 2, '#2f9a4a');
  for (let i = 0; i < 3; i++) { R(92 + i * 6, 52, 4, 5, '#ffffff'); R(92 + i * 6, 52, 4, 1, '#9a93c4'); } R(106, 51, 5, 5, '#3cc8b4'); R(106, 50, 5, 1, '#ffffff');
  // người sau quầy
  g.drawImage(D.personCanvas('LA', 0), 108, 44 + (Math.sin(t * 3) > 0.7 ? 1 : 0)); for (let i = 0; i < Math.min(staffN, 4); i++) g.drawImage(D.personCanvas('ST', i, { tired: tired[i] }), 122 + i * 11 - (i >= 2 ? 4 : 0), 44 + (tired[i] ? 1 : 0));
  if (!open) { R(84, 56, 76, 6, '#c2354a'); R(110, 40, 30, 8, '#c2354a'); R(112, 42, 26, 4, '#ffffff'); }
  // chỗ ngồi
  const guest = (i, x, y) => { if (i < guests) { g.drawImage(D.personCanvas(['HS', 'VP', 'DK', 'KQ'][i % 4], i % 3), x + 4, y - 9); R(x + 7, y - 1, 2, 2, '#ffffff'); } };
  if (stage === 1) { // quầy bar kính nhìn ra phố + ghế cao
    R(8, 64, 60, 4, '#c9905a'); R(8, 64, 60, 1, '#e8c79a'); R(8, 68, 60, 2, '#6b4226'); for (let i = 0; i < 3; i++) { const x = 14 + i * 18; R(x, 76, 8, 3, '#e8454d'); R(x + 3, 79, 2, 12, '#5b3a22'); R(x + 1, 90, 6, 1, '#5b3a22'); if (i < guests) { g.drawImage(D.personCanvas(['HS', 'VP', 'DK'][i % 3], i % 3), x - 1, 66); } R(x + 1, 61, 4, 3, '#ffffff'); }
  } else {
    const tables = stage === 2 ? 2 : stage === 3 ? 4 : 6;
    for (let i = 0; i < tables; i++) { const x = 8 + (i % 3) * 26, y = 72 + Math.floor(i / 3) * 14; R(x + 3, y, 12, 5, '#c9905a'); R(x + 3, y, 12, 1, '#e8c79a'); R(x + 3, y + 5, 12, 1, '#8a5a36'); R(x + 8, y + 6, 2, 5, '#6b4226'); R(x + 5, y + 11, 8, 1, '#6b4226'); R(x, y + 1, 3, 7, '#ff9a3c'); R(x + 15, y + 1, 3, 7, '#ff9a3c'); R(x + 1, y + 8, 1, 3, '#6b4226'); R(x + 16, y + 8, 1, 3, '#6b4226'); R(x + 7, y - 2, 3, 3, '#ffffff'); guest(i, x, y); }
  }
  // cây trong chậu hai góc
  R(2, 80, 9, 8, '#c2354a'); R(2, 80, 9, 1, '#e8454d'); R(1, 66, 11, 15, '#2f9a4a'); R(3, 62, 7, 6, '#3dbb5a'); R(5, 70, 1, 1, '#ff7fb5'); R(8, 74, 1, 1, '#ffd84d');
  if (stage >= 2) { R(150, 84, 8, 8, '#c2354a'); R(149, 72, 10, 13, '#2f9a4a'); R(151, 68, 6, 5, '#3dbb5a'); }
  if (night) { g.fillStyle = '#ffd84d3a'; g.beginPath(); g.arc(120, 28, 42, 0, 6.3); g.fill(); }
  // đêm S5: trăng ngoài cửa sổ, dây đèn nhấp nháy
  if (k === 4) { const hour = o.hour || 0, mx = 14 + hour * 11, my = 14 - hour * 2; R(mx, my, 7, 7, '#fff3b0'); R(mx + 3, my, 6, 7, '#0b1030'); for (let i = 0; i < 16; i++) R(4 + i * 10, 4 + (i % 2) * 2, 2, 2, (Math.floor(t * 2) + i) % 3 ? '#ffd84d' : '#ff9a3c'); R(0, 5, 160, 1, '#2d1f47'); }
}
const OUTL = '#2d1f47';

export function drawTown(g, o, R, D) {
  const { stage = 1, k = 0, open = true, t = 0, decor = [] } = o, lit = k >= 3 || o.rain, G = shopGeo(stage);
  skyline(g, R, o, D); sidewalk(g, R, o); lampPosts(g, R, o);
  if (stage < 4) tree(g, R, 30, o); else tree(g, R, 56, o);
  if (stage >= 4) branch(g, R, o, D, lit, open);
  const body = shopBody(g, R, o, G, D, 'TEALAB', lit, open);
  people(g, o, G, D); body.after();
  // đồ ngoài phố
  aframe(R, G.x0 - 14 - (stage >= 3 ? 0 : 0), 59, '#ff7fb5');
  pot(R, G.x1 + 1, 64, 6, '#2f9a4a'); if (G.x0 > 70) pot(R, G.x0 - 3, 64, 5, '#3dbb5a');
  if (stage === 2) bistro(R, 56, 62, true);
  if (stage >= 3) { parasol(R, 36, 46); bistro(R, 40, 62, true); van(R, 86 - 46, 76, t); }
  if (stage >= 3) { for (let x = G.x0 - 2; x < G.x1 + 2; x += 6) { R(x, G.awnY + 8, 1, 2, '#3b2418'); R(x, G.awnY + 10, 2, 2, [GOLD, '#fff3b0'][((x / 6 | 0) + (t | 0)) % 2]); } } // dây đèn bóng
  for (const d of decor) decorLayer(g, R, o, G, D, d);
  if (k === 3) { g.fillStyle = '#ff7a4a18'; g.fillRect(0, 0, 160, 100); }
  if (k >= 3) { g.fillStyle = '#ffd84d2e'; g.beginPath(); g.arc(G.bays[0][0] + (G.bays[0][1] >> 1), G.winY + 12, 30, 0, 6.3); g.fill(); }
  return G;
}
