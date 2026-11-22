import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('eg');
// Ai Cập · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#8a5a2a' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.galabeya = { map: M_KIM, pal: { ...base, t: '#e8dcc0', T: '#c9b88a', u: '#e8dcc0', b: '#c9b88a', x: '#8a5a2a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [12, 7, 'T'], [12, 8, 'T'], [16, 6, 'T'], [16, 9, 'T']] };
OUTM.abaya = { map: M_DRESS, pal: { ...base, t: '#2b2b3a', T: '#4a3f6a', u: '#2b2b3a', b: '#4a3f6a', x: '#2b2b3a' }, patch: [[11, 5, 'T'], [11, 10, 'T'], [14, 4, 'T'], [14, 11, 'T']] };
OUTM.egsuit = { map: M_TOP, pal: { ...base, t: '#3a3a4a', T: '#2b2b3a', u: '#3a3a4a', b: '#2b2b3a', p: '#3a3a4a', l: '#3a3a4a', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'r'], [13, 8, 'r']] };
OUTM.nubian = { map: M_DRESS, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#e8452c', b: '#2fb5b0', x: '#ffd84d' }, patch: [[12, 4, 'T'], [12, 6, 'b'], [12, 8, 'T'], [12, 10, 'b'], [14, 5, 'b'], [14, 7, 'T'], [14, 9, 'b'], [14, 11, 'T'], [16, 4, 'T'], [16, 6, 'b'], [16, 8, 'T'], [16, 10, 'b'], [18, 5, 'b'], [18, 8, 'T'], [18, 11, 'b']] };
OUTM.bedouin = { map: M_KIM, pal: { ...base, t: '#8a5a2a', T: '#e8452c', u: '#8a5a2a', b: '#e8452c', x: '#5a3a1a' }, patch: [[12, 3, 'T'], [12, 12, 'T'], [14, 3, 'T'], [14, 12, 'T'], [16, 3, 'T'], [16, 12, 'T'], [11, 7, 'a'], [11, 8, 'a']] };
OUTM.dancer = { map: M_DRESS, pal: { ...base, t: '#d94a8a', T: '#ffd84d', u: '#ff8fc8', b: '#ffd84d', x: '#ffd84d' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'T'], [15, 11, 'T'], [17, 3, 'T'], [17, 12, 'T'], [18, 2, 'T'], [18, 13, 'T']] };
OUTM.kilt = { map: M_TOP, pal: { ...base, t: '#ffd5b5', T: '#eab08f', u: '#ffd5b5', b: '#ffffff', p: '#ffffff', l: '#ffd5b5', x: '#c9a36a' }, patch: [[11, 6, 'y'], [11, 7, 'y'], [11, 8, 'y'], [11, 9, 'y'], [12, 5, 'b'], [12, 10, 'b'], [13, 6, 'y'], [13, 9, 'y']] };
Object.assign(OUT_KEY, { 'eg-galabeya': 'galabeya', 'eg-abaya': 'abaya', 'eg-suit': 'egsuit', 'eg-nubian': 'nubian', 'eg-bedouin': 'bedouin', 'eg-dancer': 'dancer', 'eg-kilt': 'kilt' });
Object.assign(SLOT_OF, { 'eg-galabeya': 'outfit', 'eg-abaya': 'outfit', 'eg-suit': 'outfit', 'eg-nubian': 'outfit', 'eg-bedouin': 'outfit', 'eg-dancer': 'outfit', 'eg-kilt': 'outfit', 'eg-turban': 'head', 'eg-usekh': 'waist', 'eg-kohl': 'face' });
O['eg-turban'] = { y0: -2, pal: { w: '#ffffff', W: '#dfe6f8' }, rows: ['....wwwwwwww....', '...wWwwwwwwWw...', '..wwwWwwwwWwww..', '..wWwwwwwwwwWw..', '...wwwwwwwwww...'] };
O['eg-usekh'] = { y0: 9, pal: { y: '#ffd84d', b: '#4a7be0', r: '#e8452c', g: '#5fb85a' }, rows: ['..yyyyyyyyyyyy..', '..ybrgbrgbrgy...', '...yrgbrgbry....', '....ybrgbry.....'] };
O['eg-kohl'] = { y0: 6, pal: { k: '#2b1d3a' }, rows: ['....kkk..kkk....', '...kk......kk...'] };

add(G, A, 'eg-galabeya', 'Galabeya (jellabiya)', 'Galabeya (jellabiya)', 'Áo dài suông đến mắt cá, vải cotton nhẹ, nam giới mặc ở nông thôn và ở nhà, mặc nhiều vào mùa hè.', null, { char: ['galabeya'], use: 'wear' });
add(G, A, 'eg-turban', 'Khăn đội đầu (turban và khăn quấn)', 'Turbans and head wraps', 'Nông dân vùng Thượng Ai Cập hay quấn khăn trắng quanh đầu để che nắng.',
  d => { d.bg('c'); d.e(8, 8, 6.4, 5, 'w'); d.e(8, 7, 5.4, 3.6, 'l'); d.l(3, 9, 12, 5, 'W'); d.l(3, 11, 13, 7, 'W'); d.l(4, 6, 11, 4, 'W'); d.r(4, 12, 8, 2, 'w'); d.p('a', 5, 8, 9, 6, 11, 9); }, { use: 'wear' });
add(G, A, 'eg-abaya', 'Hijab và áo choàng abaya', 'Hijab and abaya', 'Phụ nữ Hồi giáo thường quấn khăn trùm đầu, mức độ che phủ khác nhau tùy gia đình và vùng miền.', null, { char: ['abaya'], use: 'wear' });
add(G, A, 'eg-suit', 'Vest và áo sơ mi', 'Suit and shirt', 'Ở Cairo và Alexandria, nhiều người đi làm ăn mặc theo kiểu phương Tây.', null, { char: ['egsuit'], use: 'wear' });
add(G, A, 'eg-nubian', 'Trang phục Nubia', 'Nubian dress', 'Váy áo nhiều màu sắc rực rỡ, đính hạt và thêu sặc sỡ, đặc trưng của vùng Aswan.', null, { char: ['nubian'], use: 'wear' });
add(G, A, 'eg-bedouin', 'Trang phục người Bedouin ở Sinai', 'Bedouin clothing of Sinai', 'Áo dài rộng, khăn trùm đầu và đồ trang sức bạc, hợp với đời sống du mục trong sa mạc.', null, { char: ['bedouin'], use: 'wear' });
add(G, A, 'eg-dancer', 'Trang phục vũ công múa bụng', 'Belly-dance costume', 'Bộ đồ lấp lánh hạt cườm và tua rua, gắn với văn hóa biểu diễn hơn là đời thường.', null, { char: ['dancer'], use: 'wear' });
add(G, A, 'eg-kilt', 'Trang phục Ai Cập cổ đại', 'Ancient Egyptian dress', 'Váy dài vải lanh trắng (kilt cho nam, váy ôm cho nữ) rất hợp khí hậu nóng, vải lanh dệt từ cây lanh trồng ven sông Nile.', null, { char: ['kilt'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'eg-usekh', 'Vòng cổ rộng (usekh)', 'Wide collar (usekh)', 'Kiểu vòng cổ nhiều lớp hạt và đá màu đeo cả ở ngực lẫn vai, xuất hiện trong nhiều tranh tường cổ.',
  d => { d.bg('u'); d.e(8, 5, 7, 4.6, 'y'); d.e(8, 5, 4, 2.6, 'u'); d.r(0, 0, 16, 3, 'u'); for (let i = 0; i < 6; i++) { const a = 0.4 + i * 0.5; d.p(['b', 'r', 'g', 'b', 'r', 'g'][i], 8 + Math.cos(a + 0.7) * 5.4, 5 + Math.sin(a + 0.7) * 3.4); d.p(['r', 'g', 'b', 'r', 'g', 'b'][i], 8 - Math.cos(a + 0.7) * 5.4, 5 + Math.sin(a + 0.7) * 3.4); } d.r(2, 12, 12, 1, 'y'); }, { use: 'wear' });
add(G, B, 'eg-kohl', 'Kohl', 'Kohl eyeliner', 'Bột kẻ mắt đen vừa để làm đẹp, vừa để chắn nắng, được dùng từ thời cổ đại và ngày nay vẫn còn phổ biến.',
  d => { d.bg('e'); d.e(8, 8, 6.4, 3.4, 'w'); d.e(8, 8, 2.6, 2.6, 'N'); d.e(8, 8, 1.2, 1.2, 'k'); d.l(1, 8, 4, 6, 'k'); d.l(4, 6, 12, 6, 'k'); d.l(12, 6, 15, 8, 'k'); d.p('k', 2, 9, 3, 10, 14, 9, 15, 10); d.p('w', 8, 7); }, { use: 'wear' });
add(G, B, 'eg-scarab', 'Bọ hung scarab', 'Scarab amulet', 'Bùa hộ mệnh hình con bọ hung, tượng trưng cho sự tái sinh và được làm thành nhẫn, mặt dây chuyền.',
  d => { d.bg('u'); d.e(8, 9, 5, 4, 'b'); d.e(8, 9, 4, 3, 'B'); d.l(8, 5, 8, 14, 'b'); d.e(8, 4.5, 2, 1.6, 'c'); d.l(3, 7, 1, 5, 'k'); d.l(13, 7, 15, 5, 'k'); d.l(3, 11, 1, 13, 'k'); d.l(13, 11, 15, 13, 'k'); d.p('y', 6, 8, 10, 8, 6, 11, 10, 11); }, H);
add(G, B, 'eg-ankh', 'Ankh', 'Ankh', 'Biểu tượng chữ thập có quai tròn, nghĩa là "sự sống", thường gặp trên đồ lưu niệm và trang sức.',
  d => { d.bg('c'); d.e(8, 4, 2.6, 3, 'y'); d.e(8, 4, 1.4, 1.8, 'c'); d.r(7, 7, 2, 8, 'y'); d.r(3, 9, 10, 2, 'y'); d.p('Y', 7, 14, 3, 10, 12, 10); d.r(7, 7, 1, 8, 'u'); }, H);
add(G, B, 'eg-horuseye', 'Mắt Horus', 'Eye of Horus', 'Biểu tượng che chở, được làm thành bùa đeo và treo trong nhà.',
  d => { d.bg('B'); d.e(8, 7, 6, 3.2, 'w'); d.e(9, 7, 2.4, 2.4, 'b'); d.e(9, 7, 1.2, 1.2, 'k'); d.l(1, 7, 4, 5, 'k'); d.l(4, 5, 13, 5, 'k'); d.l(13, 5, 15, 7, 'k'); d.l(3, 9, 3, 13, 'y'); d.l(5, 10, 3, 13, 'y'); d.p('y', 4, 14, 2, 13, 8, 12, 9, 13, 8, 14); d.p('k', 4, 8); }, H);
add(G, B, 'eg-cartouche', 'Vàng và bạc thủ công (cartouche)', 'Gold and silver cartouches', 'Tiệm kim hoàn ở Khan el-Khalili làm cartouche, tên khắc bằng chữ tượng hình theo yêu cầu.',
  d => { d.bg('e'); d.e(8, 8, 3, 6, 'y'); d.r(5, 3, 6, 10, 'y'); d.r(6, 4, 4, 8, 'u'); d.r(5, 13, 6, 1, 'Y'); d.r(4, 12, 8, 1, 'Y'); d.l(7, 5, 7, 11, 'k'); d.p('k', 9, 5, 9, 7, 8, 9, 9, 10, 9, 11); d.r(6, 2, 4, 1, 'y'); }, H);
add(G, B, 'eg-attar', 'Nước hoa tinh dầu', 'Perfume oils', 'Nước hoa pha từ hoa sen, hoa nhài và hương trầm, đóng trong những chai thủy tinh nhỏ.',
  d => { d.r(6, 1, 4, 3, 'y'); d.r(7, 4, 2, 1, 'o'); d.e(8, 10, 5, 5, 'v'); d.e(8, 10, 4, 4, 'p'); d.p('l', 5, 8, 6, 7); d.p('w', 5, 7, 6, 8); d.r(5, 14, 6, 1, 'y'); d.p('y', 8, 9, 7, 11, 9, 11); }, H);
add(G, B, 'eg-bedouinjewel', 'Khăn choàng và trang sức Bedouin', 'Bedouin scarves and jewellery', 'Dây chuyền bạc, vòng tay nặng và khăn thêu, đồng thời là tài sản của người phụ nữ.',
  d => { d.bg('e'); d.e(8, 7, 5, 5, 'a'); d.e(8, 7, 3.4, 3.4, 'e'); d.p('l', 5, 5, 11, 9); for (let i = 0; i < 6; i++) { const a = i * 1.05; d.p('r', 8 + Math.cos(a) * 4.4, 7 + Math.sin(a) * 4.4); } d.l(8, 12, 8, 15, 'a'); d.e(8, 14, 1.4, 1.4, 'r'); d.r(2, 14, 4, 2, 'r'); d.p('y', 3, 14, 4, 15); }, H);

// ----- Nhà ở -----
add(G, C, 'eg-mudhouse', 'Nhà gạch bùn ở nông thôn', 'Rural mud-brick house', 'Tường dày, mái bằng, giúp nhà mát vào ban ngày và giữ ấm ban đêm.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(2, 6, 12, 7, 'o'); d.r(2, 5, 12, 1, 'O'); d.r(4, 8, 2, 2, 'k'); d.r(10, 8, 2, 2, 'k'); d.r(7, 9, 2, 4, 'N'); d.p('O', 3, 11, 12, 12); d.p('G', 13, 3, 14, 4); d.p('w', 2, 2, 9, 3); }, SC);
add(G, C, 'eg-nubianhouse', 'Nhà Nubia sơn màu', 'Painted Nubian house', 'Nhà vòm gạch bùn sơn xanh, vàng, cam, vẽ cả hình cá sấu hoặc chuyến hành hương ở cửa nhà.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(2, 7, 12, 6, 'b'); d.e(8, 7, 6, 3, 'b'); d.r(2, 10, 12, 1, 'y'); d.r(2, 12, 12, 1, 'r'); d.r(6, 9, 4, 4, 'o'); d.r(7, 10, 2, 3, 'k'); d.p('y', 4, 8, 11, 8); d.p('g', 3, 9, 12, 9); d.p('w', 8, 4); }, SC);
add(G, C, 'eg-mashrabiya', 'Mashrabiya', 'Mashrabiya', 'Lớp lưới gỗ chạm lộ ở cửa sổ kiểu Hồi giáo, vừa lọc nắng vừa cho gió lùa vào mà vẫn giữ kín đáo.',
  d => { d.r(1, 1, 14, 14, 'N'); d.r(2, 2, 12, 12, 'n'); for (let y = 2; y < 14; y += 2) for (let x = 2 + (y % 4); x < 14; x += 4) { d.e(x + 1, y + 0.5, 1.4, 1.2, 'N'); d.p('u', x + 1, y); } d.r(1, 1, 14, 1, 'k'); d.r(1, 14, 14, 1, 'k'); }, SC);
add(G, C, 'eg-oldcairo', 'Nhà phố Cairo Cổ', 'Old Cairo townhouse', 'Nhà nhiều tầng, sân trong, tường đá vàng ở khu Islamic Cairo.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 3, 12, 11, 'u'); d.r(2, 3, 12, 1, 'o'); for (let y = 5; y < 13; y += 3) for (const x of [4, 7, 10]) { d.r(x, y, 2, 2, 'N'); d.r(x - 1, y + 2, 4, 1, 'n'); } d.r(6, 11, 4, 3, 'k'); d.p('o', 3, 4, 12, 4); }, SC);
add(G, C, 'eg-frenchapt', 'Chung cư thời Pháp–Anh ở Cairo', 'Colonial-era apartment blocks in Cairo', 'Những tòa nhà mặt tiền trang trí kiểu châu Âu ở trung tâm, nay đã cũ nhưng vẫn rất có hồn.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 2, 14, 12, 'e'); d.r(1, 2, 14, 2, 'W'); for (let y = 5; y < 13; y += 3) for (let x = 3; x < 14; x += 4) { d.r(x, y, 2, 2, 'A'); d.r(x - 1, y + 2, 4, 1, 'k'); } d.p('Y', 4, 3, 11, 3); d.r(7, 12, 2, 2, 'N'); }, SC);
add(G, C, 'eg-pigeon', 'Nhà tháp bồ câu', 'Pigeon tower', 'Tòa tháp đất sét hình chóp dành nuôi bồ câu ở nông thôn, lấy thịt và phân bón.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.tri(4, 2, 8, 11, 'o'); d.r(4, 11, 8, 2, 'O'); for (let y = 5; y < 12; y += 2) for (let x = 6 - Math.floor((y - 2) / 3); x < 11; x += 2) d.p('k', x, y); d.p('w', 1, 4, 14, 6, 13, 3); d.p('l', 2, 6, 13, 8); }, SC);
add(G, C, 'eg-tent', 'Lều Bedouin', 'Bedouin tent', 'Lều vải dệt từ lông dê hoặc lạc đà, dễ tháo ráp khi di chuyển.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.r(1, 6, 14, 5, 'k'); d.r(1, 5, 14, 1, 'K'); d.l(1, 5, 3, 3, 'N'); d.l(14, 5, 12, 3, 'N'); d.r(3, 3, 10, 2, 'k'); d.r(5, 8, 6, 3, 'N'); d.r(3, 11, 1, 3, 'N'); d.r(12, 11, 1, 3, 'N'); d.p('r', 3, 7, 12, 7); d.p('o', 2, 14, 12, 14); }, SC);
add(G, C, 'eg-roofhouse', 'Khu ổ chuột và nhà trên mái', 'Informal housing and rooftop homes', 'Do dân số tăng nhanh, nhiều nhà ở Cairo xây chồng lên mái nhà cũ.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.r(1, 7, 6, 5, 'e'); d.r(8, 5, 7, 7, 'u'); d.r(2, 4, 4, 3, 'o'); d.r(9, 2, 5, 3, 'r'); d.r(1, 7, 6, 1, 'W'); d.p('k', 2, 9, 4, 9, 10, 8, 12, 8, 10, 10, 12, 10); d.p('w', 2, 5, 11, 3); d.l(13, 2, 13, 0, 'N'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'eg-shisha', 'Shisha (hookah)', 'Shisha (hookah)', 'Ống điếu nước hút thuốc có hương trái cây, bày ở quán cà phê để mọi người ngồi trò chuyện.',
  d => { d.r(7, 0, 2, 2, 'y'); d.r(6, 2, 4, 2, 'a'); d.r(7, 4, 2, 4, 'l'); d.e(8, 11, 4, 4, 'c'); d.e(8, 11, 3, 3, 'b'); d.r(5, 14, 6, 1, 'a'); d.l(10, 5, 14, 9, 'r'); d.l(14, 9, 14, 13, 'r'); d.p('w', 7, 0, 9, 0, 5, 3); d.p('y', 8, 11); }, H);
add(G, E, 'eg-fanous', 'Đèn lồng Ramadan (fanous)', 'Ramadan lantern (fanous)', 'Chiếc đèn kim loại và kính màu, thắp sáng khắp nơi trong tháng Ramadan.',
  d => { d.l(8, 0, 8, 2, 'a'); d.r(6, 2, 4, 2, 'y'); d.r(4, 4, 8, 8, 'r'); d.r(4, 4, 8, 1, 'y'); d.r(5, 6, 2, 2, 'c'); d.r(9, 6, 2, 2, 'g'); d.r(7, 9, 2, 2, 'u'); d.r(3, 11, 10, 2, 'y'); d.r(6, 13, 4, 2, 'Y'); d.p('o', 8, 7); }, H);
add(G, E, 'eg-brass', 'Đồ đồng và đồ thau chạm', 'Engraved brass ware', 'Khay, bình, đèn được gò bằng tay ở Cairo Cổ.',
  d => { d.e(8, 9, 7, 5, 'y'); d.e(8, 9, 6, 4, 'Y'); d.e(8, 9, 5, 3.2, 'y'); d.e(8, 9, 1.8, 1.4, 'O'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.p('O', 8 + Math.cos(a) * 3.6, 9 + Math.sin(a) * 2.4); } d.p('u', 3, 8, 12, 7); d.r(5, 14, 6, 1, 'Y'); }, H);
add(G, E, 'eg-zeer', 'Gốm và đồ đất nung (zeer)', 'Pottery and clay zeer jar', 'Bình đựng nước zeer làm bằng đất xốp để giữ nước mát mà không cần tủ lạnh.',
  d => { d.e(8, 10, 5, 4.4, 'o'); d.r(6, 2, 4, 3, 'O'); d.r(5, 3, 6, 1, 'O'); d.e(8, 7, 3.4, 2.2, 'o'); d.r(4, 14, 8, 2, 'N'); d.p('O', 5, 9, 11, 10, 7, 12); d.p('c', 5, 13, 10, 13); d.p('t', 5, 8, 6, 7); }, H);
add(G, E, 'eg-textile', 'Thảm và vải dệt', 'Rugs and woven cloth', 'Thảm len dệt tay và khăn bông cotton Ai Cập, nổi tiếng nhờ sợi dài.',
  d => { d.r(1, 3, 14, 10, 'r'); d.r(2, 4, 12, 8, 'R'); d.r(3, 5, 10, 6, 'y'); d.r(4, 6, 8, 4, 'b'); d.e(8, 8, 2.4, 1.6, 'r'); d.p('w', 8, 8); for (let x = 1; x < 15; x += 2) d.p('w', x, 2, x, 13); }, SC);
add(G, E, 'eg-papyrus', 'Giấy papyrus', 'Papyrus paper', 'Giấy làm từ thân cói, vẽ tranh cổ, bán nhiều cho khách du lịch.',
  d => { d.r(2, 2, 12, 12, 'u'); d.r(2, 2, 12, 1, 'Y'); d.r(2, 13, 12, 1, 'Y'); d.p('e', 3, 3, 12, 12); d.e(8, 6, 1.6, 1.8, 'o'); d.r(7, 8, 2, 4, 'b'); d.l(4, 12, 11, 12, 'r'); d.p('k', 4, 4, 5, 4, 11, 4, 4, 6, 11, 7, 4, 9); d.p('G', 12, 10); }, H);
add(G, E, 'eg-inlay', 'Đồ khảm xà cừ', 'Mother-of-pearl inlay', 'Hộp, cờ vua và bàn tay khảm vỏ trai trên gỗ.',
  d => { d.r(2, 4, 12, 9, 'N'); d.r(2, 4, 12, 1, 'n'); d.r(2, 12, 12, 1, 'k'); for (let y = 6; y < 12; y += 2) for (let x = 3 + (y % 4 ? 0 : 2); x < 13; x += 4) { d.p('w', x, y, x + 1, y); d.p('l', x, y + 1); } d.p('w', 8, 8); d.r(7, 3, 2, 1, 'y'); }, H);
add(G, E, 'eg-lowtable', 'Bàn trà thấp và gối tựa', 'Low tea table and cushions', 'Góc tiếp khách truyền thống với gối dày ngồi sát đất.',
  d => { d.r(0, 12, 16, 4, 'r'); d.r(4, 8, 8, 2, 'n'); d.r(5, 10, 1, 3, 'N'); d.r(10, 10, 1, 3, 'N'); d.e(4, 11, 3, 2.4, 'y'); d.e(13, 11, 3, 2.4, 'g'); d.p('r', 3, 11, 13, 11); d.r(6, 6, 2, 2, 'w'); d.p('N', 7, 6); d.p('w', 6, 4, 8, 3); d.p('y', 1, 1, 14, 2); }, SC);
