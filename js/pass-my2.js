import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('my');
// Malaysia · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.mykurung = { map: M_DRESS, pal: { ...base, t: '#2fa58f', T: '#ffd84d', u: '#2fa58f', b: '#1f7a6a', x: '#1f7a6a' }, patch: [[11, 5, 'T'], [11, 10, 'T'], [13, 4, 'T'], [13, 11, 'T']] };
OUTM.mymelayu = { map: M_TOP, pal: { ...base, t: '#c9a227', T: '#a8281a', u: '#c9a227', b: '#a8281a', p: '#c9a227', l: '#c9a227', x: '#2b2b3a' }, patch: [[11, 5, 'T'], [11, 6, 'T'], [11, 7, 'T'], [11, 8, 'T'], [11, 9, 'T'], [11, 10, 'T']] };
OUTM.mykebaya = { map: M_DRESS, pal: { ...base, t: '#f2d6e8', T: '#c94a8a', u: '#f2d6e8', b: '#7a3fc0', x: '#7a3fc0' }, patch: [[11, 4, 'y'], [11, 7, 'y'], [11, 10, 'y'], [13, 5, 'T'], [13, 9, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.mycheong = { map: M_DRESS, pal: { ...base, t: '#d6241e', T: '#ffd84d', u: '#d6241e', b: '#a8281a', x: '#ffd84d' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [13, 6, 'T'], [13, 9, 'T'], [15, 5, 'T'], [15, 10, 'T']] };
OUTM.mysari = { map: M_DRESS, pal: { ...base, t: '#e8872c', T: '#7a1a2a', u: '#e8872c', b: '#7a1a2a', x: '#ffd84d' }, patch: [[11, 5, 'y'], [11, 6, 'y'], [11, 9, 'y'], [13, 5, 'y'], [13, 10, 'y']] };
OUTM.mypunjabi = { map: M_TOP, pal: { ...base, t: '#2b6ac9', T: '#ffd84d', u: '#2b6ac9', b: '#ffd84d', p: '#f5ecd0', l: '#f5ecd0', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T']] };
OUTM.myborneo = { map: M_KIM, pal: { ...base, t: '#2b2b3a', T: '#e8452c', u: '#2b2b3a', b: '#c9a227', x: '#8a5a2a' }, patch: [[11, 4, 'T'], [11, 6, 'w'], [11, 9, 'w'], [11, 11, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'w'], [15, 11, 'w'], [17, 3, 'T'], [17, 12, 'T']] };
Object.assign(OUT_KEY, { 'my-kurung': 'mykurung', 'my-melayu': 'mymelayu', 'my-kebaya': 'mykebaya', 'my-cheong': 'mycheong', 'my-sari': 'mysari', 'my-punjabi': 'mypunjabi', 'my-borneo': 'myborneo' });
Object.assign(SLOT_OF, { 'my-kurung': 'outfit', 'my-melayu': 'outfit', 'my-kebaya': 'outfit', 'my-cheong': 'outfit', 'my-sari': 'outfit', 'my-punjabi': 'outfit', 'my-borneo': 'outfit', 'my-songkok': 'head', 'my-tanjak': 'head', 'my-tudung': 'head', 'my-flower': 'head', 'my-keris': 'waist' });
O['my-songkok'] = { y0: 0, pal: { k: '#1b1b2a', K: '#3a3a4a' }, rows: ['....kkkkkkkk....', '...kkkkkkkkkk...', '...KKKKKKKKKK...'] };
O['my-tanjak'] = { y0: -1, pal: { r: '#a8281a', Y: '#c9a227', y: '#ffd84d', R: '#7a1a2a' }, rows: ['.....rYYYYr.....', '....rYyYYyYr....', '...rrYYYYYYrr...', '..RRRRRRRRRRRR..'] };
O['my-tudung'] = { y0: 0, pal: { p: '#e06aa0', P: '#b84a80' }, rows: ['....pppppppp....', '...pppppppppp...', '..pppppppppppp..', '..pp........pp..'] };
O['my-flower'] = { y0: 0, pal: { r: '#e8452c', y: '#ffd84d', g: '#2f7d3a' }, rows: ['..r.y.r.y.r.y.r.', '...gggggggggg...'] };
O['my-keris'] = { y0: 15, pal: { n: '#5a3a1a', a: '#c0c8d8', Y: '#ffd84d' }, rows: ['..nnnnnnnnnnnn..', '.........aY......'] };

add(G, A, 'my-kurung', 'Baju kurung', 'Baju kurung', 'Bộ áo dài tay rộng và váy hoặc sarong của phụ nữ Mã Lai, mặc trong dịp lễ, đi làm và đồng phục học sinh. Kiểu dáng kín đáo, chất liệu nhẹ hợp khí hậu nóng, và mỗi dịp Hari Raya cả gia đình thường may đồng bộ một màu.', null, { char: ['mykurung'], use: 'wear' });
add(G, A, 'my-melayu', 'Baju Melayu', 'Baju Melayu', 'Bộ đồ truyền thống của nam giới gồm áo dài tay, quần rộng và thường kèm một đoạn vải quấn ngang hông gọi là samping. Bộ này hay đi cùng mũ songkok, đặc biệt trong lễ Hồi giáo và đám cưới.', null, { char: ['mymelayu'], use: 'wear' });
add(G, A, 'my-kebaya', 'Kebaya Nyonya', 'Nyonya kebaya', 'Áo ngắn ôm, tay dài, thường thêu ren tinh xảo, do phụ nữ người Peranakan (người Hoa sinh sống lâu đời ở Malaysia) mặc cùng sarong batik. Chiếc áo được ghim bằng bộ trâm cài kerongsang rất cầu kỳ.', null, { char: ['mykebaya'], use: 'wear' });
add(G, A, 'my-cheong', 'Cheongsam (sườn xám) và samfu', 'Cheongsam and samfu', 'Trang phục của người Hoa, cheongsam thường xuất hiện trong dịp Tết còn samfu là bộ áo quần gọn nhẹ mặc thường ngày. Sắc đỏ được ưa chuộng vì mang ý nghĩa may mắn.', null, { char: ['mycheong'], use: 'wear' });
add(G, A, 'my-sari', 'Sari và punjabi', 'Sari and punjabi', 'Trang phục của người gốc Ấn, sari là tấm vải dài quấn quanh người, còn punjabi (kurta) là bộ áo dài kèm quần rộng. Màu sắc rực rỡ và thêu kim tuyến là điểm đặc trưng của các dịp lễ như Deepavali.', null, { char: ['mysari'], use: 'wear' });
add(G, A, 'my-borneo', 'Trang phục Sabah và Sarawak', 'Sabah and Sarawak costumes', 'Người Kadazan-Dusun, Bajau, Iban, Bidayuh và nhiều dân tộc khác có bộ đồ riêng, thường đính hạt cườm, kim loại và tua rua. Phụ nữ thường quấn váy dệt tay, nam giới đội mũ lông chim hoặc đeo chuỗi hạt lớn trong lễ hội.', null, { char: ['myborneo'], use: 'wear' });
add(G, A, 'my-batik', 'Batik và songket', 'Batik and songket', 'Hai loại vải nổi tiếng, batik vẽ sáp rồi nhuộm màu còn songket dệt chỉ vàng hoặc bạc nổi trên nền lụa. Cả hai thường dùng cho áo dài lễ, váy và khăn.',
  d => { d.bg('e'); d.r(1, 2, 7, 12, 'b'); d.r(8, 2, 7, 12, 'R'); for (const [x, y] of [[3, 4], [5, 8], [3, 11], [6, 5]]) { d.e(x, y, 1.2, 1.2, 'y'); d.p('c', x, y); } for (let y = 3; y < 14; y += 3) d.r(8, y, 7, 1, 'y'); for (let x = 9; x < 15; x += 2) d.p('Y', x, 5, x, 9, x, 12); }, SC);

// ----- Phụ kiện -----
add(G, B, 'my-songkok', 'Songkok (mũ nhung đen)', 'Songkok (black velvet cap)', 'Chiếc mũ không vành của nam giới Mã Lai, thường đội khi đi nhà thờ Hồi giáo hoặc dịp trang trọng. Nhiều người đội cả khi tham dự đám cưới hay lễ Hari Raya.',
  d => { d.bg('u'); d.r(3, 5, 10, 8, 'k'); d.r(3, 4, 10, 1, 'K'); d.r(4, 3, 8, 1, 'K'); d.r(3, 12, 10, 1, 'K'); d.p('a', 5, 7, 8, 8, 11, 7); d.r(2, 13, 12, 1, 'W'); }, { use: 'wear' });
add(G, B, 'my-tanjak', 'Tengkolok và tanjak', 'Tengkolok and tanjak', 'Khăn đội đầu bằng vải songket được gấp thành kiểu đặc trưng, thường là phụ kiện của vua, quý tộc và chú rể. Mỗi bang có cách gấp và tên gọi riêng.',
  d => { d.bg('e'); d.tri(4, 1, 8, 6, 'r'); d.r(3, 7, 10, 5, 'Y'); d.r(3, 7, 10, 1, 'y'); for (let x = 4; x < 13; x += 2) d.p('R', x, 9, x + 1, 10); d.p('y', 8, 3, 7, 5, 9, 5); d.r(2, 12, 12, 1, 'R'); }, { use: 'wear' });
add(G, B, 'my-keris', 'Keris', 'Keris', 'Loại dao găm lưỡi lượn sóng, vừa là vũ khí vừa là biểu tượng quyền lực và danh dự của người Mã Lai. Nhiều lưỡi keris được rèn công phu và được xem là mang theo linh khí.',
  d => { d.bg('e'); d.l(8, 1, 7, 4, 'a'); d.l(7, 4, 9, 7, 'a'); d.l(9, 7, 7, 10, 'a'); d.p('l', 8, 2, 8, 5, 8, 8); d.r(5, 10, 6, 1, 'Y'); d.r(7, 11, 2, 3, 'n'); d.e(8, 14, 1.6, 1.4, 'N'); d.p('y', 6, 10, 10, 10); }, { use: 'wear' });
add(G, B, 'my-kerongsang', 'Kerongsang (trâm cài)', 'Kerongsang (brooch set)', 'Bộ ba trâm vàng hoặc bạc nối nhau bằng dây xích, dùng để cài áo kebaya Nyonya. Chúng thường được chạm hoa lá tinh xảo và truyền lại qua nhiều đời.',
  d => { d.bg('P'); for (const x of [3, 8, 13]) { d.e(x, 6, 2.2, 2.2, 'y'); d.e(x, 6, 1.2, 1.2, 'r'); d.p('Y', x, 4, x, 8, x - 2, 6, x + 2, 6); } d.l(3, 9, 8, 11, 'y'); d.l(8, 11, 13, 9, 'y'); d.e(8, 12, 1.4, 1.4, 'y'); }, H);
add(G, B, 'my-tudung', 'Tudung và hijab', 'Tudung and hijab', 'Khăn trùm đầu của phụ nữ Hồi giáo, có rất nhiều kiểu, màu sắc và chất liệu thời trang khác nhau. Nhiều thương hiệu trong nước bán các mẫu tudung đang được ưa chuộng.',
  d => { d.bg('e'); d.e(8, 8, 6, 7, 'p'); d.e(8, 8, 3.6, 4.4, 's'); d.p('k', 7, 7, 9, 7); d.p('m', 8, 10); d.r(3, 13, 10, 3, 'p'); d.p('P', 4, 4, 12, 4, 3, 10, 13, 10); d.p('w', 8, 2); }, { use: 'wear' });
add(G, B, 'my-iban', 'Chuỗi hạt và vòng cổ của người Iban', 'Iban beads and necklaces', 'Vòng cườm nhiều màu, trang sức bạc và thắt lưng kim loại nặng, thường dùng trong lễ Gawai. Những món đồ này thể hiện địa vị và được giữ gìn như vật gia truyền.',
  d => { d.bg('e'); for (let i = 0; i < 12; i++) { const a = 0.4 + i * 0.2; d.e(8 + Math.cos(a * 2.2 + 1.6) * 5.4, 4 + Math.sin(a * 2.2 + 1.6) * 6, 1.1, 1.1, ['r', 'y', 'b', 'g', 'o', 'p'][i % 6]); } d.e(8, 12, 2, 2, 'a'); d.e(8, 12, 1, 1, 'A'); }, H);
add(G, B, 'my-flower', 'Vòng hoa và mũ lá của người bản địa', 'Flower wreaths and leaf hats', 'Nhóm Orang Asli ở bán đảo và dân tộc ở Borneo từng dùng hoa, lá và sợi cây làm mũ, vòng đeo cổ. Ngày nay chúng còn xuất hiện trong các màn trình diễn văn hóa.',
  d => { d.bg('h'); d.e(8, 9, 6, 4, 'g'); d.e(8, 9, 4, 2.6, '_'); d.e(8, 9, 6, 4, 'g'); d.e(8, 10, 4, 2.4, '_'); for (const [x, y, c] of [[3, 9, 'r'], [5, 6, 'y'], [8, 5, 'r'], [11, 6, 'y'], [13, 9, 'r'], [6, 13, 'y'], [10, 13, 'r']]) d.p(c, x, y); d.p('G', 4, 8, 12, 8, 8, 14); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'my-rumahmelayu', 'Rumah Melayu (nhà sàn Mã Lai)', 'Rumah Melayu (Malay stilt house)', 'Ngôi nhà gỗ dựng trên cột cao, mái dốc để thoát mưa và nhiều cửa sổ để đón gió. Gầm nhà thoáng giúp tránh ngập và là nơi nghỉ mát, cất đồ vào ngày nóng.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); for (const x of [3, 6, 9, 12]) d.r(x, 9, 1, 5, 'N'); d.r(2, 5, 12, 4, 'n'); d.tri(1, 1, 14, 4, 'R'); d.r(4, 6, 2, 2, 'y'); d.r(10, 6, 2, 2, 'y'); d.r(7, 6, 2, 3, 'N'); d.l(8, 9, 6, 13, 'n'); }, SC);
add(G, C, 'my-longhouse', 'Rumah panjang (nhà dài)', 'Rumah panjang (longhouse)', 'Một dãy nhà dài trên cột, nơi cả một cộng đồng người Iban, Bidayuh hay Orang Ulu cùng sống, mỗi gia đình một căn nối với hiên chung. Hiên chung là nơi tiếp khách, phơi lúa và tổ chức lễ hội.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); for (let x = 1; x < 16; x += 2) d.r(x, 9, 1, 5, 'N'); d.r(0, 6, 16, 3, 'n'); d.tri(0, 3, 16, 3, 'Y'); for (const x of [2, 5, 8, 11, 14]) d.r(x, 7, 1, 2, 'k'); d.p('y', 1, 9, 15, 9); }, SC);
add(G, C, 'my-shophouse', 'Nhà phố Peranakan (shophouse)', 'Peranakan shophouse', 'Dãy nhà phố hẹp và sâu, mặt tiền sơn màu và có hiên dưới mái che, rất thường gặp ở Penang và Melaka. Bên trong có giếng trời, bàn thờ tổ tiên và đồ gỗ chạm khắc.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(0, 3, 5, 11, 'x'); d.r(5, 4, 5, 10, 'y'); d.r(10, 3, 6, 11, 'c'); for (const x of [1, 6, 11, 13]) { d.r(x, 5, 2, 3, 'B'); d.r(x, 9, 2, 3, 'B'); } d.p('R', 0, 3, 10, 3, 5, 4); d.r(2, 12, 2, 2, 'k'); }, SC);
add(G, C, 'my-minang', 'Nhà Minangkabau ở Negeri Sembilan', 'Minangkabau house in Negeri Sembilan', 'Mái cong như sừng trâu, do cộng đồng Minangkabau từ đảo Sumatra mang sang. Kiểu mái này trở thành nét kiến trúc rất riêng của bang.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 8, 10, 5, 'n'); d.l(2, 8, 4, 3, 'R'); d.l(4, 3, 8, 6, 'R'); d.l(8, 6, 12, 3, 'R'); d.l(12, 3, 14, 8, 'R'); d.p('r', 3, 4, 13, 4); d.r(7, 9, 2, 4, 'N'); d.p('y', 5, 10, 11, 10); }, SC);
add(G, C, 'my-kampungair', 'Kampung Air (làng nước)', 'Kampung Air (water village)', 'Làng nhà sàn dựng trên mặt biển của người Bajau và các cộng đồng ven biển Sabah. Nhà nối với nhau bằng những cây cầu ván hẹp, thuyền nhỏ là phương tiện chính.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); for (const x of [2, 9]) { d.r(x, 9, 1, 4, 'N'); d.r(x + 4, 9, 1, 4, 'N'); d.r(x - 1, 5, 7, 4, 'n'); d.tri(x - 1, 2, 7, 3, 'r'); } d.l(5, 9, 9, 9, 'N'); d.r(5, 14, 5, 1, 'N'); d.p('w', 1, 12, 8, 12, 12, 13); }, SC);
add(G, C, 'my-highrise', 'Nhà ở cao tầng và chung cư', 'High-rise apartments', 'Tại Kuala Lumpur và Penang, hầu hết người dân đô thị sống trong căn hộ cao tầng. Nhiều khu có hồ bơi chung, phòng gym và khu ăn uống ngay tầng dưới.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 3, 6, 11, 'A'); d.r(8, 1, 7, 13, 'a'); for (let y = 4; y < 13; y += 2) for (const x of [2, 4, 9, 11, 13]) d.p('y', x, y); d.r(5, 14, 3, 1, 'C'); }, SC);
add(G, C, 'my-terrace', 'Rumah teres (nhà liền kề)', 'Terrace house', 'Loại nhà phổ biến nhất ở ngoại ô, hai tầng, có mái hiên nhỏ phía trước. Nhiều gia đình rào cổng và cho phép gia đình nhiều thế hệ cùng ở.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); for (const [x, c] of [[0, 'w'], [5, 'y'], [10, 'x']]) { d.r(x, 5, 5, 9, c); d.tri(x, 2, 5, 3, 'R'); d.r(x + 1, 7, 1, 2, 'B'); d.r(x + 3, 7, 1, 2, 'B'); d.r(x + 2, 11, 1, 3, 'N'); } d.l(0, 13, 15, 13, 'k'); }, SC);
add(G, C, 'my-colonial', 'Nhà thời thuộc địa Anh', 'British colonial house', 'Những dinh thự mái ngói đỏ, cột trắng và hiên rộng, hiện còn nhiều ở Cameron Highlands và Kuala Lumpur. Một số đã thành khách sạn hoặc bảo tàng.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 7, 12, 6, 'w'); d.tri(0, 3, 16, 4, 'R'); for (const x of [3, 6, 9, 12]) d.r(x, 9, 1, 4, 'W'); d.r(7, 10, 2, 3, 'n'); d.p('c', 4, 8, 11, 8); d.r(10, 1, 2, 3, 'R'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'my-tepak', 'Tepak sirih (khay trầu cau)', 'Tepak sirih (betel tray)', 'Hộp trang trí để đựng trầu, vôi và cau, từng là món đồ đón khách quý và dùng trong đám cưới. Nó biểu tượng cho sự hiếu khách.',
  d => { d.bg('e'); d.r(2, 6, 12, 7, 'Y'); d.r(2, 5, 12, 1, 'y'); d.r(2, 12, 12, 1, 'Y'); d.e(5, 9, 1.8, 1.8, 'g'); d.e(8, 9, 1.8, 1.8, 'w'); d.e(11, 9, 1.8, 1.8, 'r'); d.p('y', 3, 7, 12, 7, 8, 12); d.p('N', 5, 14, 11, 14); }, H);
add(G, E, 'my-mengkuang', 'Tikar mengkuang (chiếu lá dứa)', 'Mengkuang mat', 'Chiếu đan từ lá mengkuang, vừa để ngồi vừa để ngủ. Nhiều làng còn lưu giữ nghề đan truyền thống này.',
  d => { d.bg('e'); for (let y = 2; y < 14; y += 2) d.r(1, y, 14, 1, y % 4 ? 'u' : 't'); for (let x = 2; x < 15; x += 3) d.r(x, 2, 1, 12, x % 2 ? 'r' : 'g'); d.r(1, 14, 14, 1, 'n'); d.p('R', 4, 6, 10, 10); }, SC);
add(G, E, 'my-tudungsaji', 'Tudung saji', 'Tudung saji (food cover)', 'Chiếc mũ che thức ăn hình nón đan bằng lá hoặc vải, đặt lên mâm cơm để tránh ruồi. Đây là hình ảnh quen thuộc ở bàn ăn nông thôn.',
  d => { d.bg('e'); d.e(8, 12, 7, 2, 'n'); d.tri(2, 3, 12, 9, 'r'); d.tri(4, 5, 8, 7, 'R'); for (const [x, y] of [[6, 8], [9, 7], [8, 10], [5, 10], [11, 10]]) d.p('y', x, y); d.p('w', 8, 2); d.r(1, 13, 14, 1, 'N'); }, SC);
add(G, E, 'my-wau', 'Wau (diều Mã Lai)', 'Wau (Malay kite)', 'Diều trang trí rực rỡ ở bờ đông, thả vào mùa gió, có nhiều hình dạng như chim, trăng lưỡi liềm hay đuôi cá. Tiếng diều rít trong gió cũng là một nét văn hóa.',
  d => { d.bg('c'); d.e(8, 6, 5, 3.4, 'r'); d.e(8, 5, 3, 2, 'y'); d.tri(4, 3, 3, 2, 'p'); d.tri(10, 3, 3, 2, 'p'); d.e(8, 6, 1.4, 1.4, 'b'); d.l(8, 9, 8, 15, 'y'); d.p('p', 7, 11, 9, 13, 7, 15); d.p('w', 2, 2, 13, 14); }, H);
add(G, E, 'my-gasing', 'Gasing (con quay)', 'Gasing (spinning top)', 'Con quay nặng bằng gỗ quý, người chơi quấn dây rồi tung xuống đất, thi xem ai quay lâu nhất. Một số con có thể quay hơn một giờ.',
  d => { d.bg('e'); d.e(8, 7, 5, 3.4, 'n'); d.e(8, 6, 5, 2, 'N'); d.tri(6, 9, 4, 6, 'N'); d.r(8, 2, 1, 2, 'a'); d.p('y', 4, 6, 12, 6); d.p('r', 5, 8, 11, 8); d.l(2, 14, 14, 14, 'W'); }, H);
add(G, E, 'my-congkak', 'Congkak', 'Congkak', 'Bàn chơi bằng gỗ có nhiều hố, người chơi chuyền hạt hoặc vỏ ốc từ hố này sang hố khác. Trò chơi tương tự mancala ở nhiều nơi khác.',
  d => { d.bg('e'); d.r(1, 4, 14, 8, 'n'); d.r(1, 4, 14, 1, 'N'); d.r(1, 11, 14, 1, 'N'); for (let x = 2; x < 14; x += 2) { d.e(x + 0.5, 6.5, 0.8, 0.8, 'k'); d.e(x + 0.5, 9.5, 0.8, 0.8, 'k'); } d.e(1.5, 8, 1.2, 2, 'k'); d.e(14.5, 8, 1.2, 2, 'k'); d.p('w', 4, 6, 8, 9, 12, 6); }, SC);
add(G, E, 'my-sumpit', 'Ống thổi tên (sumpit)', 'Blowpipe (sumpit)', 'Vũ khí săn bắn dài của người Orang Asli và các dân tộc Borneo, thổi mũi tên nhỏ để bắn thú. Có loại tẩm nhựa độc dùng trong quá khứ.',
  d => { d.bg('e'); d.l(1, 14, 14, 3, 'n'); d.l(2, 14, 15, 3, 'N'); d.p('w', 14, 2, 13, 3); d.r(5, 12, 5, 1, 'a'); d.p('k', 1, 14, 15, 2); d.p('r', 3, 5, 5, 6, 7, 4); }, H);
add(G, E, 'my-trishaw', 'Xe lôi (trishaw)', 'Trishaw', 'Xe đạp ba bánh chở khách ở George Town và Melaka, thường được trang trí hoa giả và nhạc. Du khách thích đi xe này để ngắm phố cổ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 6, 7, 5, 'p'); d.tri(0, 3, 9, 3, 'r'); d.e(10, 13, 2, 2, 'k'); d.e(5, 13, 2, 2, 'k'); d.l(8, 11, 11, 7, 'a'); d.l(11, 7, 12, 4, 'a'); d.p('y', 3, 7, 6, 8, 13, 3); d.p('w', 10, 13, 5, 13); }, SC);
