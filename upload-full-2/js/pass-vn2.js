import { add, SC, setCC, OUTM, M_DRESS, M_KIM, M_TOP, M_HAK } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('vn');
// Việt Nam · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.aodai = { map: M_DRESS, pal: { ...base, t: '#ffffff', T: '#e8452c', u: '#ffffff', b: '#e8452c', x: '#e4dccb' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [14, 5, 'T'], [14, 10, 'T'], [17, 7, 'T'], [17, 8, 'T']] };
OUTM.tuthan = { map: M_DRESS, pal: { ...base, t: '#6b4a2a', T: '#e8452c', u: '#6b4a2a', b: '#e8452c', x: '#2b2b3a' }, patch: [[11, 6, 'T'], [11, 7, 'T'], [11, 8, 'T'], [11, 9, 'T'], [12, 7, 'T'], [12, 8, 'T'], [13, 7, 'T'], [13, 8, 'T']] };
OUTM.ngutha = { map: M_KIM, pal: { ...base, t: '#2a4a8a', T: '#ffd84d', u: '#2a4a8a', b: '#ffd84d', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [13, 4, 'T'], [13, 11, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.baba = { map: M_TOP, pal: { ...base, t: '#3a3a4a', T: '#2b2b3a', u: '#3a3a4a', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [12, 7, 'w'], [13, 7, 'w'], [14, 7, 'w']] };
OUTM.aothe = { map: M_HAK, pal: { ...base, t: '#2b2b3a', T: '#4a3f6a', u: '#2b2b3a', b: '#4a3f6a', P: '#e4dccb', p: '#fff3d6', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [13, 4, 'T'], [13, 11, 'T']] };
OUTM.thocam = { map: M_DRESS, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#e8452c', b: '#4a7be0', x: '#4a7be0' }, patch: [[14, 4, 'T'], [14, 6, 'b'], [14, 8, 'T'], [14, 10, 'b'], [16, 5, 'b'], [16, 7, 'T'], [16, 9, 'b'], [16, 11, 'T'], [18, 4, 'T'], [18, 6, 'b'], [18, 8, 'T'], [18, 10, 'b']] };
OUTM.hmong = { map: M_HAK, pal: { ...base, t: '#1f2f5a', T: '#e8452c', u: '#1f2f5a', b: '#e8452c', P: '#1f2f5a', p: '#3a4a8a', x: '#e8452c' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [12, 7, 'a'], [12, 8, 'a'], [14, 4, 'T'], [14, 11, 'T']] };
OUTM.cham = { map: M_KIM, pal: { ...base, t: '#7a3fc0', T: '#ffd84d', u: '#7a3fc0', b: '#ffd84d', x: '#ffd84d' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [14, 5, 'T'], [14, 10, 'T'], [16, 5, 'T'], [16, 10, 'T']] };
Object.assign(OUT_KEY, { 'vn-aodai': 'aodai', 'vn-tuthan': 'tuthan', 'vn-ngutha': 'ngutha', 'vn-baba': 'baba', 'vn-aothe': 'aothe', 'vn-thocam': 'thocam', 'vn-hmong': 'hmong', 'vn-cham': 'cham' });
Object.assign(SLOT_OF, { 'vn-aodai': 'outfit', 'vn-tuthan': 'outfit', 'vn-ngutha': 'outfit', 'vn-baba': 'outfit', 'vn-aothe': 'outfit', 'vn-thocam': 'outfit', 'vn-hmong': 'outfit', 'vn-cham': 'outfit', 'vn-nonla': 'head', 'vn-quaithao': 'head', 'vn-khanran': 'head', 'vn-khanmoqua': 'head', 'vn-khanpieu': 'head', 'vn-guoc': 'feet' });
O['vn-nonla'] = { y0: -4, pal: { h: '#e6c892', H: '#c9a36a', w: '#ffffff' }, rows: ['.......hh.......', '......hhhh......', '.....hHhhHh.....', '....hhhhhhhh....', '..hHhhhhhhhhHh..', '.hhhhhhhhhhhhhh.'] };
O['vn-quaithao'] = { y0: -3, pal: { b: '#2b1d3a', r: '#e8452c', B: '#4a3f6a' }, rows: ['...bbbbbbbbbb...', '.bbbBbbbbBbbbbb.', 'bbbbbbbbbbbbbbbb', '.rb..........br.', '.r............r.', '.r............r.'] };
O['vn-khanran'] = { y0: -1, pal: { n: '#8a5a2a', w: '#fff3d6' }, rows: ['..nwnwnwnwnwn...', '.nwnwnwnwnwnwn..', '.wnwn......nwnw.'] };
O['vn-khanmoqua'] = { y0: -1, pal: { k: '#2b1d3a', K: '#4a3f6a' }, rows: ['......kk........', '.....kkkkk.kk...', '...kkkkkkkkkkk..', '..kKkkkkkkkkKk..', '..kk........kk..'] };
O['vn-khanpieu'] = { y0: -1, pal: { r: '#e8452c', y: '#ffd84d', g: '#2fb5b0', p: '#ff8fc8' }, rows: ['..rrrrrrrrrrrr..', '.rryyrrrrrryyrr.', '.rgrrrrrrrrrgr..', '..rp........pr..'] };
O['vn-guoc'] = { y0: 18, pal: { n: '#b8895a', N: '#8a5a2a' }, rows: ['..nnnnn..nnnnn..', '...N...N.N...N..'] };

add(G, A, 'vn-aodai', 'Áo dài', 'Ao dai', 'Tà áo dài xẻ hai bên, mặc với quần, trở thành biểu tượng của phụ nữ Việt Nam. Đây cũng là đồng phục của nhiều trường học và lễ phục ngày Tết, ngày cưới.', null, { char: ['aodai'], use: 'wear' });
add(G, A, 'vn-tuthan', 'Áo tứ thân', 'Ao tu than (four-panel dress)', 'Chiếc áo của phụ nữ miền Bắc ngày xưa, hai vạt trước thường buộc lại với nhau, mặc để làm ruộng và đi hội, gắn với hình ảnh cô gái quan họ.', null, { char: ['tuthan'], use: 'wear' });
add(G, A, 'vn-ngutha', 'Áo ngũ thân', 'Ao ngu than (five-panel robe)', 'Áo dài năm tà của phụ nữ và nam giới thời trước, tiền thân của áo dài hiện đại. Người ta thường giải thích phần vạt con ở dưới là "con", ám chỉ trách nhiệm cha mẹ.', null, { char: ['ngutha'], use: 'wear' });
add(G, A, 'vn-baba', 'Áo bà ba', 'Ao ba ba', 'Áo cổ tròn, cài khuy giữa, may bằng vải mỏng, quen thuộc ở miền Nam và gắn với người nông dân miền sông nước.', null, { char: ['baba'], use: 'wear' });
add(G, A, 'vn-aothe', 'Áo the, khăn xếp', 'Ao the and khan xep', 'Bộ lễ phục của nam giới xưa, áo màu tối, đội khăn quấn nhiều vòng, thường mặc khi tế lễ và đi hội làng.', null, { char: ['aothe'], use: 'wear' });
add(G, A, 'vn-yem', 'Yếm', 'Yem (traditional bodice)', 'Chiếc áo lót hình thoi của phụ nữ xưa, mặc bên trong áo tứ thân, thường có màu đỏ, nâu hoặc vàng.',
  d => { d.bg('t'); d.l(5, 1, 3, 4, 'k'); d.l(11, 1, 13, 4, 'k'); d.l(8, 0, 8, 2, 'k'); d.tri(3, 2, 10, 5, 'r'); d.dtri(3, 6, 10, 9, 'r'); d.r(4, 3, 8, 1, 'R'); d.p('y', 8, 6, 7, 8, 9, 8, 8, 10); d.p('R', 8, 12); }, SC);
add(G, A, 'vn-thocam', 'Thổ cẩm dân tộc Thái, Mường, Tày', 'Brocade of the Thai, Muong and Tay peoples', 'Vải dệt tay với họa tiết nhiều màu, dùng may váy, áo và khăn, mỗi hoa văn kể một câu chuyện về người dệt.', null, { char: ['thocam'], use: 'wear' });
add(G, A, 'vn-hmong', 'Trang phục dân tộc Mông', 'Hmong costume', 'Vải lanh nhuộm chàm, váy xếp, thêu tay và đồ bạc, đẹp nhất vào các phiên chợ vùng cao.', null, { char: ['hmong'], use: 'wear' });
add(G, A, 'vn-cham', 'Trang phục dân tộc Chăm', 'Cham costume', 'Áo dài và khăn, vải dệt thủ công ở Ninh Thuận, Bình Thuận, thường gắn với lễ hội Katê.', null, { char: ['cham'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'vn-nonla', 'Nón lá', 'Non la (leaf hat)', 'Chiếc nón làm từ lá cọ và khung tre, che nắng mưa, gắn với hình ảnh người phụ nữ Việt. Nón bài thơ ở Huế có câu thơ hay hình vẽ hiện lên khi giơ lên trước ánh sáng.',
  d => { d.tri(0, 3, 16, 8, 't'); d.tri(3, 3, 10, 6, 'e'); d.r(0, 10, 16, 1, 'n'); d.p('n', 4, 7, 8, 5, 12, 7, 7, 9, 10, 9); d.l(3, 11, 3, 15, 'r'); d.l(12, 11, 12, 15, 'r'); d.p('y', 8, 2); d.r(7, 2, 2, 1, 'n'); }, { use: 'wear' });
add(G, B, 'vn-quaithao', 'Nón quai thao', 'Non quai thao', 'Chiếc nón rộng vành, quai lụa rủ xuống, thời xưa gắn với cô gái Kinh Bắc trong hội làng.',
  d => { d.e(8, 6, 8, 4.2, 'k'); d.e(8, 5, 6.4, 3, 'K'); d.e(8, 4, 4, 1.6, 'k'); d.l(2, 8, 2, 15, 'r'); d.l(14, 8, 14, 15, 'r'); d.r(1, 14, 2, 2, 'y'); d.r(13, 14, 2, 2, 'y'); d.p('r', 3, 9, 13, 9); }, { use: 'wear' });
add(G, B, 'vn-khanran', 'Khăn rằn', 'Khan ran (checkered scarf)', 'Khăn kẻ ô vuông nâu trắng của người Nam Bộ, dùng để quàng cổ, đội đầu, che bụi hay làm khăn lau mồ hôi.',
  d => { d.r(1, 3, 14, 10, 'w'); for (let y = 3; y < 13; y++) for (let x = 1; x < 15; x++) if ((x + y) % 4 < 2 && (x % 2) === (y % 2)) d.put(x, y, 'n'); for (let x = 1; x < 15; x += 2) d.p('n', x, 3, x, 12); d.l(1, 13, 0, 15, 'w'); d.l(14, 13, 15, 15, 'w'); d.l(5, 13, 5, 15, 'n'); d.l(10, 13, 10, 15, 'w'); }, { use: 'wear' });
add(G, B, 'vn-khanmoqua', 'Khăn mỏ quạ', 'Khan mo qua (crow-beak scarf)', 'Chiếc khăn của phụ nữ miền Bắc, quấn trên đầu với một góc nhọn như mỏ quạ.',
  d => { d.e(7, 9, 6, 4.6, 'k'); d.e(7, 8, 5, 3.4, 'K'); d.l(9, 5, 14, 2, 'k'); d.l(10, 6, 15, 3, 'k'); d.r(9, 4, 4, 2, 'k'); d.p('k', 14, 2, 15, 3, 15, 2); d.p('K', 5, 7, 8, 6); d.l(3, 12, 2, 15, 'k'); d.l(5, 13, 5, 15, 'k'); }, { use: 'wear' });
add(G, B, 'vn-khanpieu', 'Khăn piêu của người Thái', 'Thai khan pieu', 'Khăn thêu nhiều màu, cô gái Thái dùng làm quà gửi gắm tình cảm và đội khi nhảy xòe.',
  d => { d.r(2, 3, 12, 9, 'r'); d.r(2, 3, 12, 1, 'y'); d.r(2, 11, 12, 1, 'y'); for (const x of [4, 7, 10]) { d.p('g', x, 6, x + 1, 7); d.p('y', x, 8, x + 1, 9); d.p('p', x + 1, 6, x, 7); } for (let x = 2; x < 14; x += 2) d.p('p', x, 12, x, 13); d.p('w', 2, 5, 13, 5); }, { use: 'wear' });
add(G, B, 'vn-trambac', 'Trâm và vòng bạc dân tộc', 'Silver hairpins and bracelets', 'Trang sức thủ công của phụ nữ Dao, Mông, Thái, nặng và cầu kỳ, mang theo ước muốn bình an.',
  d => { d.e(5, 9, 4, 4, 'l'); d.e(5, 9, 3, 3, '_'); d.e(5, 9, 4, 4, 'a'); d.e(5, 9, 2.8, 2.8, '_'); d.p('w', 3, 6, 7, 6); d.l(9, 14, 15, 2, 'a'); d.l(10, 14, 15, 3, 'l'); d.e(14, 3, 1.6, 1.6, 'l'); d.p('y', 14, 3); d.p('w', 12, 8, 13, 10); }, { use: 'hold' });
add(G, B, 'vn-guoc', 'Guốc mộc', 'Guoc moc (wooden clogs)', 'Đôi guốc gỗ mộc kêu cộp cộp trên đường, từng là thứ giày dép phổ biến trong phố thị xưa.',
  d => { d.r(2, 9, 5, 2, 'n'); d.r(1, 10, 7, 2, 'n'); d.r(3, 12, 1, 2, 'N'); d.r(6, 12, 1, 2, 'N'); d.l(3, 8, 5, 9, 'r'); d.r(9, 6, 5, 2, 'n'); d.r(8, 7, 7, 2, 'n'); d.r(10, 9, 1, 2, 'N'); d.r(13, 9, 1, 2, 'N'); d.p('r', 10, 5, 12, 5); d.r(1, 14, 14, 1, 'a'); }, { use: 'wear' });
add(G, B, 'vn-rangden', 'Nhuộm răng đen', 'Blackened teeth', 'Tục lệ xưa của người Việt, hiện không còn phổ biến, vì người xưa coi hàm răng đen là đẹp và khỏe.',
  d => { d.bg('t'); d.e(8, 8, 6, 3.6, 'r'); d.r(3, 6, 10, 4, 'k'); d.p('K', 4, 7, 6, 7, 9, 7, 11, 7); d.r(2, 8, 12, 1, 'R'); d.p('w', 4, 3, 12, 3); d.r(5, 11, 6, 1, 'R'); }, SC);

// ----- Nhà ở -----
add(G, C, 'vn-nhasan', 'Nhà sàn', 'Stilt house', 'Nhà dựng trên cột cao, tránh ẩm ướt và thú dữ, của người Thái, Mường, Ba Na và nhiều dân tộc khác; gầm sàn thường nuôi gia súc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.tri(1, 2, 14, 4, 'y'); d.r(2, 6, 12, 4, 'n'); d.r(4, 7, 3, 3, 'u'); d.r(9, 7, 3, 3, 'u'); d.r(1, 10, 14, 1, 'N'); for (const x of [2, 6, 9, 13]) d.r(x, 11, 1, 3, 'N'); d.l(7, 11, 7, 13, 'n'); d.p('w', 12, 14); }, SC);
add(G, C, 'vn-nharong', 'Nhà rông Tây Nguyên', 'Rong communal house (Central Highlands)', 'Ngôi nhà chung cao vút, mái dốc nhô lên như lưỡi rìu, nơi cả làng họp bàn việc, tổ chức lễ hội và tiếp khách.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.tri(3, 0, 10, 10, 'y'); d.l(6, 0, 6, 9, 'Y'); d.l(9, 0, 9, 9, 'Y'); d.r(5, 9, 6, 1, 'N'); d.r(4, 10, 8, 3, 'n'); d.r(7, 11, 2, 3, 'k'); for (const x of [4, 11]) d.r(x, 13, 1, 2, 'N'); d.p('r', 7, 3, 8, 6); d.p('a', 4, 14, 11, 14); }, SC);
add(G, C, 'vn-nhadai', 'Nhà dài Ê Đê', 'Ede longhouse', 'Ngôi nhà sàn kéo dài, nhiều thế hệ sống chung, chủ yếu là của người phụ nữ chủ hộ trong chế độ mẫu hệ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.tri(0, 4, 16, 4, 'Y'); d.r(1, 8, 14, 3, 'n'); d.r(1, 11, 14, 1, 'N'); for (let x = 2; x < 15; x += 3) { d.r(x, 12, 1, 3, 'N'); d.r(x, 9, 2, 2, 'u'); } d.p('r', 2, 7, 13, 7); d.l(14, 12, 14, 15, 'N'); }, SC);
add(G, C, 'vn-ba-gian', 'Nhà ba gian hai chái', 'Three-bay house with two wings', 'Kiểu nhà gỗ truyền thống ở đồng bằng Bắc Bộ, ba gian giữa và hai chái hai bên, gian giữa đặt bàn thờ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.tri(1, 2, 14, 4, 'N'); d.r(2, 6, 12, 7, 'n'); d.r(2, 6, 12, 1, 'N'); for (const x of [2, 6, 9, 13]) d.r(x, 6, 1, 7, 'N'); d.r(6, 8, 3, 5, 'k'); d.p('u', 3, 9, 4, 9, 11, 9, 12, 9); d.p('r', 7, 9); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, C, 'vn-nharuong', 'Nhà rường Huế', 'Hue ruong house', 'Nhà gỗ quý với cột, rường, chạm khắc tinh xảo, thường nằm trong khu vườn yên tĩnh.',
  d => { d.bg('h'); d.r(0, 13, 16, 3, 'g'); d.tri(2, 3, 12, 4, 'R'); d.r(3, 7, 10, 6, 'N'); d.r(3, 7, 10, 1, 'n'); for (const x of [3, 6, 9, 12]) d.r(x, 7, 1, 6, 'n'); d.p('y', 4, 9, 7, 9, 10, 9, 5, 11, 8, 11, 11, 11); d.e(1, 12, 2, 2, 'G'); d.e(15, 12, 2, 2, 'G'); }, SC);
add(G, C, 'vn-trinhtuong', 'Nhà trình tường (người Hà Nhì)', 'Rammed-earth house (Ha Nhi)', 'Nhà đắp tường đất dày, mái lợp cỏ, ấm vào mùa đông và mát vào mùa hè, ở vùng cao Y Tý.',
  d => { d.bg('l'); d.tri(0, 5, 16, 10, 'a'); d.r(0, 13, 16, 3, 'w'); d.r(3, 8, 10, 6, 'O'); d.tri(2, 4, 12, 4, 'Y'); d.p('y', 4, 5, 8, 4, 11, 5); d.r(7, 10, 2, 4, 'N'); d.p('u', 4, 10, 11, 10); d.p('w', 1, 2, 14, 3); }, SC);
add(G, C, 'vn-nhanoi', 'Nhà nổi và nhà bè', 'Floating houses', 'Nhà trên mặt nước của người dân vùng sông nước, và làng chài ở Vịnh Hạ Long.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 10, 16, 1, 'b'); d.r(2, 11, 12, 1, 'N'); d.r(3, 6, 4, 5, 'e'); d.tri(2, 4, 6, 2, 'r'); d.r(9, 7, 4, 4, 'u'); d.tri(8, 5, 6, 2, 'R'); d.r(4, 8, 2, 3, 'N'); d.p('c', 3, 13, 10, 14, 13, 13); d.p('w', 1, 15, 8, 15); }, SC);

// ----- Đồ dùng -----
add(G, E, 'vn-battrang', 'Gốm Bát Tràng', 'Bat Trang ceramics', 'Làng gốm ven sông Hồng, nổi tiếng với bát, bình men trắng xanh và đồ thờ.',
  d => { d.e(8, 9, 5.4, 5.6, 'w'); d.r(6, 2, 4, 3, 'w'); d.r(5, 14, 6, 1, 'w'); d.r(6, 2, 4, 1, 'b'); d.r(5, 14, 6, 1, 'b'); d.p('b', 6, 7, 8, 6, 10, 7, 7, 9, 9, 9, 6, 11, 8, 12, 10, 11); d.p('l', 5, 8, 5, 10); }, { use: 'hold' });
add(G, E, 'vn-chieucoi', 'Chiếu cói', 'Sedge mat', 'Trải trong nhà, dùng để ngồi ăn cơm, tiếp khách, cuốn lại khi cần.',
  d => { d.r(1, 3, 14, 10, 'u'); for (let y = 3; y < 13; y++) for (let x = 1; x < 15; x++) if ((x + y) % 2 === 0) d.put(x, y, 'e'); d.r(1, 3, 14, 1, 'r'); d.r(1, 12, 14, 1, 'r'); d.r(1, 3, 1, 10, 'r'); d.r(14, 3, 1, 10, 'r'); d.p('o', 5, 7, 10, 8); }, SC);
add(G, E, 'vn-vong', 'Võng', 'Hammock', 'Võng treo ngoài hiên nhà và đưa kẽo kẹt, hình ảnh thân quen của các ngày hè nóng.',
  d => { d.r(0, 2, 2, 12, 'N'); d.r(14, 2, 2, 12, 'N'); d.l(2, 5, 8, 11, 'r'); d.l(8, 11, 14, 5, 'r'); d.l(2, 6, 8, 12, 'R'); d.l(8, 12, 14, 6, 'R'); d.p('y', 4, 8, 6, 10, 10, 10, 12, 8); d.p('N', 7, 14, 9, 14); }, SC);
add(G, E, 'vn-chongtre', 'Chõng tre và giường tre', 'Bamboo bed', 'Đồ nội thất rẻ mà bền, ngồi, nằm, phơi đồ đều được.',
  d => { d.r(0, 6, 16, 3, 'Y'); d.r(0, 6, 16, 1, 'y'); for (let x = 1; x < 16; x += 2) d.p('O', x, 7); d.r(1, 9, 2, 6, 'Y'); d.r(13, 9, 2, 6, 'Y'); d.r(1, 12, 14, 1, 'Y'); d.p('G', 3, 3, 12, 2); }, SC);
add(G, E, 'vn-noidat', 'Nồi đất và niêu', 'Clay pot', 'Dụng cụ nấu ăn cổ, kho cá, kho thịt trong nồi đất giữ được hương vị đậm đà.',
  d => { d.e(8, 10, 6, 4.4, 'N'); d.e(8, 10, 5, 3.6, 'n'); d.r(3, 5, 10, 2, 'N'); d.r(5, 4, 6, 1, 'n'); d.r(4, 6, 8, 1, 'N'); d.p('t', 5, 9, 10, 11); d.p('w', 6, 2, 8, 0, 10, 2); d.r(2, 14, 12, 1, 'k'); d.p('o', 4, 15, 8, 15, 12, 15); }, { use: 'hold' });
add(G, E, 'vn-mamcom', 'Mâm cơm và bát đũa', 'Rice tray and bowls', 'Bữa cơm Việt thường đặt trên mâm tròn, cả nhà ngồi quanh, dùng đũa và bát.',
  d => { d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 6.4, 4.4, 'u'); d.e(4, 9, 2, 1.4, 'w'); d.e(12, 9, 2, 1.4, 'w'); d.e(8, 7, 2, 1.4, 'r'); d.e(8, 11, 2, 1.4, 'g'); d.p('e', 3, 8, 4, 8, 11, 8); d.l(5, 14, 11, 11, 'N'); d.l(6, 14, 12, 11, 'n'); }, SC);
add(G, E, 'vn-bantho', 'Bàn thờ tổ tiên', 'Ancestral altar', 'Đặt ở nơi trang trọng nhất trong nhà, có bát hương, ảnh người đã mất và mâm quả dịp lễ.',
  d => { d.bg('R'); d.r(2, 9, 12, 5, 'N'); d.r(2, 9, 12, 1, 'n'); d.r(5, 3, 6, 5, 'e'); d.r(5, 3, 6, 1, 'k'); d.p('r', 5, 2, 10, 2); d.e(8, 5, 1.2, 1.2, 's'); d.e(4, 8, 1.4, 1.2, 'o'); d.e(12, 8, 1.4, 1.2, 'g'); d.r(7, 8, 2, 1, 'a'); d.l(8, 7, 8, 5, 'a'); d.p('y', 8, 4); d.p('w', 8, 1, 7, 0); }, SC);
