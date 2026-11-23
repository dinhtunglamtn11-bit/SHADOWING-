import { add, SC, setCC, OUTM, M_DRESS, M_HAK, M_KIM, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('kr');
// Hàn Quốc · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở và đồ dùng', E = 'Thói quen và phép tắc';
const rng = (r0, r1, c0, c1, ch) => { const a = []; for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) a.push([r, c, ch]); return a; };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#c9a36a' };

// ----- Trang phục: bộ nào cũng mặc được lên Lame -----
OUTM.hanbokF = { map: M_DRESS, pal: { ...base, t: '#ffd84d', T: '#1f8f8a', u: '#ffd84d', b: '#e8452c', c: '#2fb5b0', C: '#1f8f8a', x: '#e8452c' },
  patch: [...rng(14, 15, 4, 11, 'c'), ...rng(16, 16, 3, 12, 'c'), ...rng(17, 17, 2, 13, 'c'), ...[2, 4, 6, 8, 10, 12].flatMap(c => [[18, c, 'c'], [18, c + 1, 'C']]), [12, 7, 'b'], [12, 8, 'b'], [13, 7, 'b'], [13, 8, 'b'], [13, 6, 'b'], [13, 9, 'b']] };
OUTM.hanbokM = { map: M_HAK, pal: { ...base, t: '#9ec8ff', T: '#7aa6e0', u: '#9ec8ff', b: '#3a2c6e', P: '#4a5068', p: '#8d96b0', x: '#2b2b3a' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [12, 7, 'T'], [12, 8, 'T']] };
OUTM.hanbokW = { map: M_KIM, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#4a7be0', b: '#ffd84d', w: '#ffffff', x: '#e8452c' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [12, 7, 'w'], [12, 8, 'w'], [13, 8, 'w'], [12, 4, 'T'], [13, 10, 'T'], [17, 5, 'T'], [17, 10, 'T'], [14, 5, 'T'], [16, 4, 'T'], [16, 11, 'T']] };
OUTM.dolbok = { map: M_TOP, pal: { ...base, t: '#ff8fc8', T: '#ffd84d', u: '#ffd84d', b: '#4a7be0', p: '#4a7be0', l: '#4a7be0', x: '#e8452c' }, patch: [[12, 3, 'T'], [13, 3, 'u'], [12, 12, 'u'], [13, 12, 'T']] };
OUTM.krSchool = { map: M_TOP, pal: { ...base, t: '#23306b', T: '#23306b', u: '#23306b', b: '#23306b', p: '#6b6f86', l: '#6b6f86', x: '#2b2b3a', w: '#ffffff', r: '#e8452c' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [12, 6, 'w'], [12, 9, 'w'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'r'], [13, 8, 'r']] };
Object.assign(OUT_KEY, { 'kr-hanbok-f': 'hanbokF', 'kr-hanbok-m': 'hanbokM', 'kr-hanbok-w': 'hanbokW', 'kr-dolbok': 'dolbok', 'kr-uniform': 'krSchool' });
Object.assign(SLOT_OF, { 'kr-hanbok-f': 'outfit', 'kr-hanbok-m': 'outfit', 'kr-hanbok-w': 'outfit', 'kr-dolbok': 'outfit', 'kr-uniform': 'outfit', 'kr-gat': 'head', 'kr-binyeo': 'head', 'kr-norigae': 'waist', 'kr-talchum': 'face' });
O['kr-gat'] = { y0: -2, pal: { d: '#2b2b3a', K: '#4a3f6a', r: '#e8452c' }, rows: ['......dddd......', '......dKKd......', '..dddddddddddd..', '.dddddddddddddd.', '..d..........d..'] };
O['kr-binyeo'] = { y0: -1, pal: { y: '#ffd84d', r: '#e8452c', h: '#6b4429', H: '#8a5a39' }, rows: ['......hhhh......', '.....hhhhhh.....', '..yyyyyyyyyyyyr.', '...hh......hh...'] };
O['kr-norigae'] = { y0: 15, pal: { r: '#e8452c', g: '#2fb5b0', p: '#ff8fc8', y: '#ffd84d' }, rows: ['..........ry....', '.........rrrr...', '..........gg....', '..........pp....', '.........pppp...'] };
O['kr-talchum'] = { y0: 5, pal: { n: '#c98a4a', k: '#2b1d3a', r: '#e8452c', w: '#ffffff' }, rows: ['....nnnnnnnn....', '....nkkn.kkn....'.replace('....nkkn.kkn....', '....nkknnkkn....'), '....nnnnnnnn....', '....nrwwwwrn....', '....nnrrrrnn....'] };

add(G, A, 'kr-hanbok-f', 'Hanbok nữ', 'Women\'s hanbok', 'Áo jeogori ngắn kết hợp váy chima xòe rộng, dải áo goreum thắt trước ngực. Màu sắc tươi và đường nét mềm làm nên vẻ đẹp đặc trưng của hanbok.', null, { char: ['hanbokF'], use: 'wear' });
add(G, A, 'kr-hanbok-m', 'Hanbok nam', 'Men\'s hanbok', 'Gồm áo jeogori, quần baji rộng buộc ở cổ chân và áo choàng ngoài durumagi. Kiểu rộng rãi giúp ngồi trên sàn thoải mái.', null, { char: ['hanbokM'], use: 'wear' });
add(G, A, 'kr-hanbok-w', 'Lễ phục cưới truyền thống', 'Traditional wedding attire', 'Bộ lễ phục thêu hoa văn mang ý nghĩa hạnh phúc, màu sắc rực rỡ. Ngày nay nhiều cặp đôi vẫn mặc trong lễ cưới truyền thống pyebaek.', null, { char: ['hanbokW'], use: 'wear' });
add(G, A, 'kr-dolbok', 'Dolbok (hanbok của em bé)', 'Dolbok (baby hanbok)', 'Hanbok của em bé trong lễ thôi nôi đầu tiên (dol). Hôm đó bé chọn một món đồ trong trò "doljabi" để người nhà đoán tương lai.', null, { char: ['dolbok'], use: 'wear' });
add(G, A, 'kr-uniform', 'Đồng phục học sinh', 'School uniform', 'Phần lớn học sinh Hàn Quốc mặc đồng phục gồm áo sơ mi, áo vest và quần hoặc váy, nhiều trường thêm cà vạt hoặc nơ.', null, { char: ['krSchool'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'kr-gat', 'Gat (mũ truyền thống)', 'Gat (traditional hat)', 'Mũ đội đầu của đàn ông thời Joseon, làm từ tre và lông ngựa, vành rộng, thường màu đen.',
  d => { d.e(8, 11, 7, 2.6, 'd'); d.r(5, 3, 6, 8, 'd'); d.e(8, 3.5, 3, 1.5, 'K'); d.r(5, 5, 6, 1, 'K'); d.l(5, 11, 4, 14, 'r'); d.l(11, 11, 12, 14, 'r'); d.p('K', 3, 11, 12, 11); }, { use: 'wear' });
add(G, B, 'kr-norigae', 'Norigae', 'Norigae', 'Dây trang sức treo ở hanbok của phụ nữ, kết bằng chỉ, ngọc và hạt. Mỗi hình dáng mang một ước nguyện như sống lâu hay nhiều phúc.',
  d => { d.r(7, 1, 2, 2, 'y'); d.e(8, 4, 2.2, 2, 'r'); d.e(8, 4, 1, 1, 'R'); d.e(8, 8, 1.8, 1.8, 'g'); d.p('y', 8, 7); for (const x of [6, 8, 10]) d.l(x, 10, x, 15, x === 8 ? 'p' : 'c'); d.r(5, 10, 6, 1, 'y'); d.l(6, 11, 5, 15, 'p'); d.l(10, 11, 11, 15, 'p'); }, { use: 'wear' });
add(G, B, 'kr-binyeo', 'Binyeo (trâm cài tóc)', 'Binyeo (hairpin)', 'Trâm dài cài búi tóc của phụ nữ, đồng thời cho biết thân phận: đầu trâm chạm hình chim, hoa hay phượng hoàng tùy người đeo.',
  d => { d.l(1, 14, 12, 3, 'Y'); d.l(2, 14, 13, 3, 'y'); d.e(13, 2.5, 2.3, 2.3, 'r'); d.e(13, 2.5, 1, 1, 'R'); d.p('g', 11, 4, 14, 5); d.l(1, 13, 0, 15, 'Y'); }, { use: 'wear' });
add(G, B, 'kr-buchae', 'Buchae (quạt)', 'Buchae (fan)', 'Quạt tay: quạt tròn của người dân và quạt gấp của quan lại. Ngày nay quạt còn là đạo cụ chính trong điệu múa quạt buchaechum.',
  d => { d.fan(8, 14, 7.5, 'w'); for (let a = 0; a <= 6; a++) { const t = Math.PI * (0.08 + a * 0.14); d.l(8, 14, 8 - Math.round(Math.cos(t) * 7), 14 - Math.round(Math.sin(t) * 7), 'n'); } d.fan(8, 14, 4, 'r'); d.fan(8, 14, 2, 'b'); d.r(7, 13, 2, 3, 'N'); d.p('r', 2, 9, 13, 9); }, { use: 'hold' });

// ----- Nhà ở và đồ dùng -----
add(G, C, 'kr-hanok', 'Hanok', 'Hanok', 'Nhà truyền thống mái ngói cong, khung gỗ, cửa dán giấy hanji. Vị trí được chọn theo nguyên tắc baesanimsu: lưng tựa núi, mặt hướng nước.',
  d => { d.bg('c'); d.tri(1, 3, 14, 4, 'K'); d.r(0, 6, 16, 1, 'A'); d.r(2, 7, 12, 6, 'e'); for (const x of [2, 7, 12]) d.r(x, 7, 1, 6, 'N'); d.r(3, 8, 3, 4, 'u'); d.r(8, 8, 3, 4, 'u'); d.r(2, 13, 12, 1, 'a'); d.r(0, 14, 16, 2, 'g'); d.tri(0, 0, 4, 3, 'G'); }, SC);
add(G, C, 'kr-ondol', 'Ondol (sưởi sàn)', 'Ondol (underfloor heating)', 'Hệ thống sưởi sàn: khói nóng từ bếp chạy dưới nền đá làm sàn ấm lên. Người Hàn ngồi, ăn và ngủ trên sàn ấm; ngày nay thường dùng ống nước nóng thay cho khói.',
  d => { d.r(0, 4, 16, 2, 't'); d.r(0, 6, 16, 8, 'A'); d.r(0, 6, 16, 1, 'a'); d.r(1, 9, 14, 3, 'N'); d.e(3, 11, 2, 1.5, 'o'); d.p('y', 3, 10); d.l(0, 10, 15, 10, 'r'); for (const x of [4, 8, 12]) { d.l(x, 3, x - 1, 2, 'x'); d.l(x - 1, 2, x, 0, 'x'); } d.r(0, 14, 16, 2, 'a'); }, SC);
add(G, C, 'kr-hanji', 'Hanji (giấy truyền thống)', 'Hanji (traditional paper)', 'Giấy làm từ vỏ cây dó, dai và thoáng khí, dùng làm cửa, quạt, đèn lồng và cả để phục chế sách cổ.',
  d => { d.r(2, 2, 12, 12, 'e'); d.r(2, 2, 12, 1, 'u'); for (let i = 0; i < 9; i++) { const x = 3 + (i * 5) % 10, y = 3 + (i * 3) % 10; d.l(x, y, x + 2, y + (i % 2 ? 1 : 0), 'W'); } d.l(12, 1, 5, 9, 'n'); d.p('d', 5, 10, 4, 10); d.r(2, 14, 12, 1, 'W'); }, { use: 'hold' });
add(G, C, 'kr-onggi', 'Onggi (chum vại)', 'Onggi (earthenware jars)', 'Chum vại đất nung dùng ủ kimchi, tương và đậu. Chất liệu có lỗ nhỏ li ti "biết thở", giúp thức ăn lên men đúng cách.',
  d => { d.e(5, 11, 4.2, 4.4, 'n'); d.r(3, 5, 4, 2, 'N'); d.r(2, 6, 6, 1, 'N'); d.e(12, 12, 3.4, 3.4, 'O'); d.r(10, 8, 4, 1, 'N'); d.p('t', 3, 10, 12, 11); d.p('N', 4, 13, 11, 14); d.r(0, 15, 16, 1, 'A'); d.p('r', 5, 9); }, SC);
add(G, C, 'kr-kimchifridge', 'Tủ lạnh kimchi', 'Kimchi refrigerator', 'Tủ lạnh riêng cho kimchi, giữ nhiệt độ ổn định để món ăn lên men chậm. Nhiều nhà Hàn có cả tủ lạnh thường và tủ lạnh kimchi.',
  d => { d.r(3, 1, 10, 14, 'w'); d.r(3, 1, 10, 1, 'l'); d.r(3, 6, 10, 1, 'a'); d.r(4, 7, 8, 7, 'W'); d.r(10, 8, 1, 4, 'A'); d.e(8, 4, 2.2, 1.8, 'r'); d.p('R', 8, 4); d.p('g', 7, 3, 9, 5); d.r(3, 15, 10, 1, 'A'); }, SC);

// ----- Thói quen và phép tắc -----
add(G, E, 'kr-twohands', 'Đưa nhận bằng hai tay', 'Giving and receiving with two hands', 'Đưa hoặc nhận đồ với người lớn tuổi bằng hai tay (hoặc một tay đỡ khuỷu tay kia) là cách thể hiện sự kính trọng, thường kèm một cái cúi đầu nhẹ.',
  d => { d.bg('t'); d.r(4, 4, 8, 6, 'r'); d.r(4, 4, 8, 1, 'R'); d.r(7, 4, 2, 6, 'y'); d.r(4, 6, 8, 1, 'y'); d.e(4, 11.5, 3, 1.6, 's'); d.e(12, 11.5, 3, 1.6, 's'); d.r(1, 12, 5, 2, 'S'); d.r(10, 12, 5, 2, 'S'); d.p('S', 3, 10, 12, 10); }, SC);
add(G, E, 'kr-nunchi', 'Nunchi', 'Nunchi', '"Đọc không khí": nhìn sắc mặt, cử chỉ để hiểu điều người khác chưa nói ra. Từ này nghĩa đen là "đo bằng mắt".',
  d => { d.e(8, 8, 7, 4.6, 'w'); d.e(11, 8, 2.8, 2.8, 'b'); d.e(11, 8, 1.4, 1.4, 'd'); d.p('w', 10, 7); d.l(1, 3, 13, 2, 'd'); d.l(2, 13, 14, 13, 'd'); d.r(0, 0, 16, 2, '_'); d.p('A', 6, 5, 4, 8); }, SC);
add(G, E, 'kr-jeong', 'Jeong', 'Jeong', 'Tình cảm gắn bó âm thầm, tích tụ theo thời gian giữa người với người. Rất khó dịch sang ngôn ngữ khác nhưng rất "Hàn".',
  d => { d.e(5.5, 5.5, 3, 2.6, 'r'); d.e(10.5, 5.5, 3, 2.6, 'r'); d.dtri(2.4, 6, 11.2, 7, 'r'); d.p('x', 4, 4, 5, 3); d.e(13, 13, 1.6, 1.4, 'p'); d.e(3, 13, 1.4, 1.2, 'p'); d.p('y', 8, 3); }, { use: 'hold' });
add(G, E, 'kr-palipali', 'Pali-pali', 'Pali-pali ("hurry hurry")', '"Nhanh lên, nhanh lên": văn hóa làm việc nhanh gọn, từ giao hàng trong ngày đến internet tốc độ cao.',
  d => { d.bg('Y'); d.e(10, 8, 5.4, 5.4, 'w'); d.e(10, 8, 4.4, 4.4, 'l'); d.l(10, 8, 10, 5, 'd'); d.l(10, 8, 13, 9, 'd'); d.p('r', 10, 8); for (const y of [4, 8, 12]) d.l(0, y, 4 + (y % 3), y, 'o'); d.p('w', 1, 6, 2, 10); }, SC);
