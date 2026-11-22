import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM, M_HAK } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('in');
// Ấn Độ · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.insari = { map: M_DRESS, pal: { ...base, t: '#d6246e', T: '#ffd84d', u: '#d6246e', b: '#ffd84d', x: '#ffd84d' }, patch: [[11, 5, 'T'], [11, 6, 'T'], [11, 9, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.insalwar = { map: M_TOP, pal: { ...base, t: '#1f9a8a', T: '#ffd84d', u: '#1f9a8a', b: '#ffd84d', p: '#1f9a8a', l: '#16766a', x: '#f5f5f5' }, patch: [[11, 4, 'T'], [11, 11, 'T'], [12, 7, 'T'], [12, 8, 'T']] };
OUTM.inlehenga = { map: M_DRESS, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#e8452c', b: '#ffd84d', x: '#c9a227' }, patch: [[11, 4, 'T'], [11, 7, 'T'], [11, 10, 'T'], [13, 5, 'T'], [13, 9, 'T'], [15, 4, 'T'], [15, 8, 'T'], [15, 11, 'T']] };
OUTM.inkurta = { map: M_TOP, pal: { ...base, t: '#e6c84a', T: '#c9a227', u: '#e6c84a', b: '#c9a227', p: '#ffffff', l: '#dfe6f8', x: '#8a5a2a' }, patch: [[11, 7, 'T'], [11, 8, 'T']] };
OUTM.indhoti = { map: M_HAK, pal: { ...base, t: '#ffffff', T: '#e8d8a8', u: '#ffffff', b: '#e8d8a8', p: '#ffffff', P: '#e8d8a8', x: '#8a5a2a' }, patch: [[11, 5, 'r'], [14, 5, 'r'], [14, 10, 'r']] };
OUTM.insherwani = { map: M_TOP, pal: { ...base, t: '#7a1a2a', T: '#ffd84d', u: '#7a1a2a', b: '#ffd84d', p: '#f5ecd0', l: '#f5ecd0', x: '#2b2b3a' }, patch: [[11, 5, 'T'], [11, 7, 'T'], [11, 9, 'T'], [13, 5, 'T'], [13, 7, 'T'], [13, 9, 'T']] };
OUTM.innehru = { map: M_TOP, pal: { ...base, t: '#2b4a8a', T: '#1b2f66', u: '#2b4a8a', b: '#1b2f66', p: '#ffffff', l: '#dfe6f8', x: '#2b2b3a' }, patch: [[11, 7, 'y'], [11, 9, 'y'], [13, 7, 'y'], [13, 9, 'y']] };
OUTM.inphiran = { map: M_KIM, pal: { ...base, t: '#8a5a2a', T: '#e8452c', u: '#8a5a2a', b: '#5a3a1a', x: '#5a3a1a' }, patch: [[11, 5, 'T'], [11, 10, 'T'], [13, 4, 'T'], [13, 11, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
Object.assign(OUT_KEY, { 'in-sari': 'insari', 'in-salwar': 'insalwar', 'in-lehenga': 'inlehenga', 'in-kurta': 'inkurta', 'in-dhoti': 'indhoti', 'in-sherwani': 'insherwani', 'in-nehru': 'innehru', 'in-phiran': 'inphiran' });
Object.assign(SLOT_OF, { 'in-sari': 'outfit', 'in-salwar': 'outfit', 'in-lehenga': 'outfit', 'in-kurta': 'outfit', 'in-dhoti': 'outfit', 'in-sherwani': 'outfit', 'in-nehru': 'outfit', 'in-phiran': 'outfit', 'in-pagri': 'head', 'in-bindi': 'face', 'in-mojari': 'feet' });
O['in-pagri'] = { y0: -1, pal: { o: '#ff9933', O: '#c9701a', y: '#ffd84d' }, rows: ['.....oooooo.....', '....oOoOoOoo....', '...oooyooooooo..', '..OoOoOoOoOoOo..'] };
O['in-bindi'] = { y0: 5, pal: { r: '#e8452c' }, rows: ['.......rr.......'] };
O['in-mojari'] = { y0: 18, pal: { g: '#7a3fc0', y: '#ffd84d' }, rows: ['...gg......gg...', '..gggg....gggg..', '..yyyy....yyyy..'] };

add(G, A, 'in-sari', 'Sari', 'Sari', 'Tấm vải dài khoảng năm đến chín mét, quấn quanh người không cần cắt may, mỗi vùng có cách quấn và chất liệu riêng.', null, { char: ['insari'], use: 'wear' });
add(G, A, 'in-salwar', 'Salwar kameez', 'Salwar kameez', 'Bộ gồm áo dài quá hông và quần rộng, kèm khăn dupatta, phổ biến với phụ nữ ở miền bắc và nhiều nơi khác.', null, { char: ['insalwar'], use: 'wear' });
add(G, A, 'in-lehenga', 'Lehenga choli', 'Lehenga choli', 'Váy dài xòe cùng áo ngắn, thường mặc trong đám cưới và lễ hội.', null, { char: ['inlehenga'], use: 'wear' });
add(G, A, 'in-kurta', 'Kurta pyjama', 'Kurta pyjama', 'Áo dài tay và quần rộng cho nam giới, mặc hằng ngày hoặc dịp lễ.', null, { char: ['inkurta'], use: 'wear' });
add(G, A, 'in-dhoti', 'Dhoti', 'Dhoti', 'Tấm vải quấn quanh eo và chân của nam giới ở nhiều vùng, nhất là miền nam và miền đông.', null, { char: ['indhoti'], use: 'wear' });
add(G, A, 'in-lungi', 'Lungi', 'Lungi', 'Tấm vải quấn eo gọn hơn, dùng ở nhà và nơi nóng bức.',
  d => { d.bg('c'); d.r(4, 2, 8, 3, 'e'); d.r(4, 5, 8, 9, 'b'); for (let y = 5; y < 14; y += 2) d.r(4, y, 8, 1, 'B'); for (let x = 5; x < 12; x += 2) d.r(x, 5, 1, 9, 'w'); d.r(4, 13, 8, 1, 'r'); d.r(3, 5, 1, 9, 'B'); d.r(12, 5, 1, 9, 'B'); }, SC);
add(G, A, 'in-sherwani', 'Sherwani', 'Sherwani', 'Áo khoác dài thêu cầu kỳ, trang phục cưới của chú rể.', null, { char: ['insherwani'], use: 'wear' });
add(G, A, 'in-nehru', 'Áo Nehru (Nehru jacket)', 'Nehru jacket', 'Áo vest cổ đứng, mang tên cựu Thủ tướng Jawaharlal Nehru.', null, { char: ['innehru'], use: 'wear' });
add(G, A, 'in-phiran', 'Phiran', 'Phiran', 'Áo choàng dài ấm của người Kashmir, mặc cho mùa đông.', null, { char: ['inphiran'], use: 'wear' });
add(G, A, 'in-khadi', 'Khadi', 'Khadi', 'Loại vải bông kéo sợi và dệt tay, gắn với phong trào độc lập.',
  d => { d.bg('e'); d.r(2, 3, 12, 10, 'W'); for (let y = 3; y < 13; y += 2) d.r(2, y, 12, 1, 't'); for (let x = 3; x < 14; x += 2) d.r(x, 3, 1, 10, 'u'); d.r(2, 13, 12, 1, 'n'); for (let x = 2; x < 14; x += 2) d.p('N', x, 14); d.p('r', 13, 2); }, SC);

// ----- Phụ kiện -----
add(G, B, 'in-bindi', 'Bindi', 'Bindi', 'Chấm tròn trên trán, trước kia mang ý nghĩa tôn giáo, nay còn là một nét trang trí.',
  d => { d.bg('u'); d.e(8, 8, 5, 5, 's'); d.e(8, 8, 2, 2, 'r'); d.e(8, 8, 1, 1, 'R'); d.p('k', 4, 5, 5, 4, 11, 4, 12, 5); d.p('y', 2, 2, 13, 2, 2, 13, 13, 13); }, { use: 'wear' });
add(G, B, 'in-sindoor', 'Sindoor', 'Sindoor', 'Bột đỏ kẻ ở đường rẽ tóc, thường là dấu hiệu của phụ nữ đã kết hôn theo truyền thống Ấn Độ giáo.',
  d => { d.bg('e'); d.e(8, 9, 5, 5.4, 's'); d.r(3, 2, 10, 4, 'k'); d.r(7, 2, 2, 4, 's'); d.r(7, 2, 2, 5, 'r'); d.p('k', 6, 8, 10, 8); d.p('m', 8, 12); }, SC);
add(G, B, 'in-mangalsutra', 'Mangalsutra', 'Mangalsutra', 'Dây chuyền hạt đen và vàng mà cô dâu đeo sau lễ cưới.',
  d => { d.l(3, 2, 5, 9, 'y'); d.l(13, 2, 11, 9, 'y'); d.l(5, 9, 8, 12, 'k'); d.l(11, 9, 8, 12, 'k'); for (const [x, y] of [[4, 5], [5, 8], [6, 10], [10, 10], [11, 8], [12, 5]]) d.p('k', x, y); d.e(8, 13, 2, 2, 'y'); d.e(8, 13, 1, 1, 'k'); }, H);
add(G, B, 'in-bangles', 'Vòng tay (bangles)', 'Bangles', 'Những chiếc vòng thủy tinh hoặc kim loại kêu leng keng, nhiều cô dâu đeo cả bộ.',
  d => { for (let i = 0; i < 5; i++) { d.e(8, 4 + i * 2, 5, 2, i % 2 ? 'r' : 'g'); d.e(8, 4 + i * 2, 3.6, 1, '_'); } d.p('y', 3, 4, 12, 8, 4, 12); d.p('w', 6, 3, 9, 10); }, H);
add(G, B, 'in-nath', 'Nath (khuyên mũi)', 'Nath (nose ring)', 'Khuyên mũi lớn của cô dâu ở một số vùng, nối bằng dây xích với tai.',
  d => { d.e(7, 9, 4, 4, 'y'); d.e(7, 9, 2.8, 2.8, '_'); d.p('r', 7, 13, 5, 12, 9, 12); d.p('w', 7, 5); d.l(10, 7, 14, 4, 'y'); d.p('Y', 12, 6); d.e(14, 4, 1.4, 1.4, 'y'); }, H);
add(G, B, 'in-jhumka', 'Jhumka', 'Jhumka', 'Bông tai hình chuông treo, kiểu trang sức quen thuộc khắp Ấn Độ.',
  d => { d.e(8, 3, 1.4, 1.4, 'y'); d.l(8, 4, 8, 6, 'y'); d.tri(4, 6, 8, 5, 'y'); d.r(4, 11, 8, 1, 'Y'); d.p('r', 8, 8); d.p('w', 5, 12, 8, 13, 11, 12); d.p('Y', 6, 9, 10, 9); }, H);
add(G, B, 'in-mehndi', 'Mehndi (henna)', 'Mehndi (henna)', 'Hình vẽ bằng bột lá móng lên tay và chân, nhất là trước ngày cưới.',
  d => { d.bg('u'); d.r(4, 5, 8, 9, 's'); for (const x of [4, 6, 8, 10]) d.r(x, 2, 2, 4, 's'); for (const [x, y] of [[5, 7], [7, 8], [9, 7], [6, 10], [8, 11], [10, 10], [7, 5]]) d.p('N', x, y); d.p('n', 5, 3, 7, 3, 9, 3, 11, 3); d.l(5, 12, 10, 12, 'N'); }, SC);
add(G, B, 'in-pagri', 'Khăn turban (pagri)', 'Turban (pagri)', 'Mũ quấn đầu của nam giới ở Rajasthan, Punjab và nhiều nơi, mỗi màu và kiểu quấn có ý nghĩa riêng.',
  d => { d.bg('c'); d.e(8, 8, 6, 5.4, 'o'); d.r(1, 11, 14, 5, '_'); d.e(8, 8, 6, 5, 'o'); d.r(1, 11, 14, 5, 'c'); d.p('O', 3, 7, 5, 9, 7, 7, 9, 9, 11, 7, 13, 9, 4, 5, 8, 4, 12, 5); d.p('y', 8, 3); d.e(8, 3, 1, 1, 'y'); d.p('O', 2, 10, 6, 11, 10, 11, 14, 10); }, { use: 'wear' });
add(G, B, 'in-pashmina', 'Khăn pashmina', 'Pashmina shawl', 'Khăn len mỏng từ lông dê vùng Himalaya, nổi tiếng vì nhẹ và ấm.',
  d => { d.r(2, 3, 12, 10, 'p'); d.r(2, 3, 12, 1, 'P'); d.r(2, 12, 12, 1, 'P'); for (const x of [2, 4, 6, 8, 10, 12]) d.r(x, 13, 1, 2, 'P'); d.p('y', 4, 6, 8, 5, 11, 6, 6, 9, 10, 9); d.p('w', 3, 4, 13, 11); }, H);
add(G, B, 'in-mojari', 'Mojari và Kolhapuri', 'Mojari and Kolhapuri sandals', 'Dép da thủ công của Rajasthan và vùng Kolhapur.',
  d => { d.bg('u'); d.e(8, 10, 6, 3, 'n'); d.r(2, 10, 12, 4, '_'); d.e(8, 10, 6, 3, 'n'); d.r(2, 11, 12, 3, 'N'); d.tri(1, 4, 5, 6, 'v'); d.p('y', 3, 6, 4, 8, 3, 9); d.tri(9, 5, 5, 6, 'v'); d.p('y', 11, 7, 12, 9); d.p('t', 4, 12, 11, 12); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'in-haveli', 'Haveli', 'Haveli', 'Dinh thự có sân trong của thương gia, thường chạm khắc và vẽ tranh tường ở Rajasthan và Gujarat.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'u'); d.r(1, 3, 14, 11, 'o'); d.r(1, 2, 14, 1, 'O'); d.r(5, 8, 6, 6, 'R'); d.e(8, 8, 3, 3, 'R'); d.r(7, 9, 2, 5, 'k'); for (const [x, y] of [[2, 4], [5, 4], [9, 4], [12, 4]]) d.r(x, y, 2, 3, 'k'); d.p('y', 3, 9, 12, 9, 3, 11, 12, 11); }, SC);
add(G, C, 'in-mudhouse', 'Nhà đất sét và mái tranh', 'Mud house with thatched roof', 'Kiểu nhà làng quê, thường trát phân bò và đất để chống nóng.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(3, 8, 10, 5, 'n'); d.tri(2, 3, 12, 5, 'Y'); d.r(7, 10, 2, 3, 'N'); d.r(4, 9, 2, 2, 'k'); d.p('t', 3, 5, 10, 6, 7, 4); d.p('w', 10, 10, 11, 11); d.e(14, 3, 1.4, 1.4, 'y'); }, SC);
add(G, C, 'in-nalukettu', 'Nalukettu của Kerala', 'Nalukettu of Kerala', 'Nhà gỗ mái dốc quanh một sân trời, thiết kế thông gió trong khí hậu ẩm.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 8, 12, 5, 'N'); d.tri(0, 3, 16, 5, 'R'); d.r(6, 9, 4, 4, 'u'); d.r(6, 9, 1, 4, 'n'); d.r(9, 9, 1, 4, 'n'); d.p('r', 3, 5, 12, 5); for (const x of [3, 5, 10, 12]) d.r(x, 9, 1, 4, 'n'); d.p('G', 0, 12, 15, 12); }, SC);
add(G, C, 'in-houseboat', 'Nhà thuyền (houseboat)', 'Houseboat', 'Thuyền gỗ làm nhà ở và quán nghỉ trên đầm phá Kerala và hồ Dal ở Kashmir.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(2, 8, 12, 3, 'N'); d.r(3, 5, 10, 3, 'n'); d.tri(2, 3, 12, 3, 'y'); d.p('c', 4, 6, 7, 6, 10, 6); d.r(1, 11, 14, 1, 'k'); d.p('w', 1, 14, 13, 13); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, C, 'in-stilthouse', 'Nhà sàn Đông Bắc', 'Northeast stilt house', 'Nhà tre dựng trên cọc để tránh ẩm và thú dữ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); for (const x of [3, 6, 9, 12]) d.r(x, 9, 1, 5, 'N'); d.r(2, 6, 12, 3, 't'); d.tri(1, 2, 14, 4, 'Y'); d.r(7, 7, 2, 2, 'k'); d.l(4, 15, 7, 9, 'n'); d.p('n', 3, 7, 11, 7); }, SC);
add(G, C, 'in-chawl', 'Chawl ở Mumbai', 'Chawl in Mumbai', 'Dãy nhà tập thể nhiều tầng cho công nhân, nay vẫn có người ở.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 2, 14, 12, 'y'); for (let y = 3; y < 13; y += 3) { d.r(1, y + 2, 14, 1, 'Y'); for (let x = 2; x < 14; x += 3) d.r(x, y, 2, 2, 'k'); } d.p('r', 3, 5, 9, 8, 6, 11, 12, 5); d.p('w', 12, 11); }, SC);
add(G, C, 'in-bungalow', 'Bungalow thời thuộc địa', 'Colonial bungalow', 'Nhà một tầng mái hiên rộng do người Anh xây ở các thành phố.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 7, 12, 6, 'e'); d.tri(0, 3, 16, 4, 'R'); d.r(3, 9, 10, 4, 'W'); for (const x of [3, 6, 9, 12]) d.r(x, 9, 1, 4, 'w'); d.r(7, 10, 2, 3, 'n'); d.p('c', 4, 8, 11, 8); }, SC);
add(G, C, 'in-stepwell', 'Giếng bậc thang (stepwell)', 'Stepwell', 'Công trình lấy nước nhiều bậc đá tinh xảo ở Gujarat và Rajasthan, cũng là nơi nghỉ mát.',
  d => { d.bg('u'); for (let i = 0; i < 7; i++) { d.r(i, 1 + i, 16 - 2 * i, 2, i % 2 ? 'n' : 't'); } d.r(7, 8, 2, 7, 'C'); d.r(6, 14, 4, 2, 'B'); d.p('N', 1, 3, 14, 3, 3, 7, 12, 7); d.p('y', 7, 0, 8, 0); }, SC);
add(G, C, 'in-rangoli', 'Rangoli trước cửa', 'Rangoli at the doorway', 'Hoa văn vẽ bằng bột màu hoặc bột gạo, đặt trước nhà để chào đón may mắn.',
  d => { d.bg('n'); d.r(0, 0, 16, 3, 'N'); d.e(8, 9, 6, 6, 'w'); d.e(8, 9, 4.6, 4.6, 'r'); d.e(8, 9, 3.2, 3.2, 'y'); d.e(8, 9, 1.8, 1.8, 'v'); d.p('w', 8, 9); for (const [x, y] of [[8, 3], [8, 15], [2, 9], [14, 9]]) d.p('o', x, y); d.p('g', 4, 5, 12, 5, 4, 13, 12, 13); }, SC);

// ----- Đồ dùng -----
add(G, E, 'in-thali', 'Thali', 'Thali', 'Khay kim loại có nhiều bát nhỏ, vừa là món ăn vừa là cách bày bữa cơm.',
  d => { d.bg('e'); d.e(8, 8, 7, 7, 'a'); d.e(8, 8, 6, 6, 'l'); d.e(4, 6, 2.2, 2.2, 'o'); d.e(12, 6, 2.2, 2.2, 'y'); d.e(4, 11, 2.2, 2.2, 'r'); d.e(12, 11, 2.2, 2.2, 'g'); d.e(8, 8, 2.4, 2.4, 'w'); d.p('t', 7, 8, 9, 8); }, H);
add(G, E, 'in-dabba', 'Dabba (hộp cơm)', 'Dabba (tiffin box)', 'Hộp cơm tầng, nổi tiếng nhờ hệ thống dabbawala giao cơm trưa ở Mumbai.',
  d => { d.r(4, 4, 8, 3, 'a'); d.r(4, 7, 8, 3, 'l'); d.r(4, 10, 8, 3, 'a'); d.r(4, 3, 8, 1, 'A'); d.r(4, 13, 8, 1, 'A'); d.l(8, 3, 8, 1, 'A'); d.l(5, 1, 11, 1, 'A'); d.p('A', 3, 5, 12, 5, 3, 8, 12, 8, 3, 11, 12, 11); d.p('w', 6, 5, 6, 8); }, H);
add(G, E, 'in-masaladabba', 'Masala dabba', 'Masala dabba (spice box)', 'Hộp tròn đựng bảy loại gia vị chính, vật dụng có mặt trong hầu hết gian bếp.',
  d => { d.e(8, 9, 7, 6, 'a'); d.e(8, 9, 6, 5, 'l'); d.e(5, 7, 1.8, 1.8, 'r'); d.e(11, 7, 1.8, 1.8, 'y'); d.e(5, 11, 1.8, 1.8, 'o'); d.e(11, 11, 1.8, 1.8, 'N'); d.e(8, 6, 1.6, 1.6, 'g'); d.e(8, 12, 1.6, 1.6, 'n'); d.e(8, 9, 1.2, 1.2, 'v'); }, H);
add(G, E, 'in-tawa', 'Tawa', 'Tawa', 'Chảo dẹt để nướng bánh chapati và dosa.',
  d => { d.e(7, 8, 6, 3, 'K'); d.e(7, 7, 6, 3, 'k'); d.e(7, 7, 4.4, 2, 'K'); d.l(12, 8, 15, 12, 'N'); d.l(13, 8, 15, 11, 'n'); d.e(6, 7, 2.4, 1.2, 'y'); d.p('o', 4, 7, 8, 6, 9, 8); d.p('w', 5, 3, 9, 2); }, H);
add(G, E, 'in-silbatta', 'Sil batta', 'Sil batta (grinding stone)', 'Bộ cối đá để nghiền gia vị và chutney.',
  d => { d.bg('e'); d.r(1, 9, 14, 5, 'a'); d.r(1, 9, 14, 1, 'l'); d.r(4, 6, 8, 3, 'A'); d.r(3, 7, 10, 2, 'a'); d.p('r', 3, 10, 6, 11, 9, 10, 12, 11); d.p('g', 5, 12, 11, 12); d.p('A', 2, 14, 13, 14); }, H);
add(G, E, 'in-kulhad', 'Kulhad', 'Kulhad (clay cup)', 'Chén đất nung dùng một lần cho trà chai, mang hương đất đặc trưng.',
  d => { d.bg('e'); d.dtri(3, 5, 10, 9, 'R'); d.r(3, 4, 10, 2, 'r'); d.r(3, 4, 10, 1, 'R'); d.p('N', 5, 8, 9, 10, 7, 12); d.p('w', 6, 1, 9, 2, 8, 3, 10, 0); d.r(5, 13, 6, 1, 'N'); }, H);
add(G, E, 'in-charpai', 'Charpai', 'Charpai (rope bed)', 'Giường khung gỗ đan dây, vừa là ghế vừa là giường ở nông thôn miền bắc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(1, 8, 14, 2, 'N'); for (let x = 2; x < 14; x += 2) d.r(x, 8, 1, 2, 't'); d.r(1, 7, 14, 1, 'n'); for (const x of [1, 14]) d.r(x, 10, 1, 4, 'N'); d.p('Y', 3, 6, 12, 6); d.p('r', 5, 5, 8, 5); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, E, 'in-diya', 'Diya', 'Diya (oil lamp)', 'Đèn dầu đất nung thắp trong lễ Diwali và nghi thức tôn giáo.',
  d => { d.e(8, 11, 6, 3, 'o'); d.r(2, 9, 12, 2, '_'); d.e(8, 10, 6, 2.4, 'o'); d.r(2, 11, 12, 3, 'O'); d.e(8, 5, 1.6, 3, 'y'); d.e(8, 6, 1, 2, 'r'); d.p('w', 8, 7); d.r(7, 8, 2, 1, 'k'); }, H);
add(G, E, 'in-charkha', 'Charkha', 'Charkha (spinning wheel)', 'Xa kéo sợi, gắn với phong trào độc lập và Mahatma Gandhi.',
  d => { d.e(6, 8, 5, 5, 'n'); d.e(6, 8, 3.8, 3.8, '_'); for (const [x, y] of [[6, 3], [6, 13], [1, 8], [11, 8], [3, 5], [9, 11], [9, 5], [3, 11]]) d.l(6, 8, x, y, 'N'); d.r(11, 10, 4, 4, 'n'); d.l(12, 8, 12, 10, 'N'); d.p('w', 12, 7, 11, 11, 14, 13); d.p('y', 6, 8); }, H);
add(G, E, 'in-autorickshaw', 'Xe kéo ba bánh (auto-rickshaw)', 'Auto-rickshaw', 'Phương tiện mui vàng đen quen thuộc trong thành phố.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(3, 4, 9, 2, 'k'); d.r(3, 6, 9, 6, 'y'); d.r(11, 7, 3, 5, 'y'); d.r(4, 7, 4, 3, 'k'); d.r(12, 8, 2, 2, 'c'); d.e(5, 13, 2, 2, 'k'); d.e(12, 13, 2, 2, 'k'); d.p('w', 5, 13, 12, 13); d.r(3, 11, 9, 1, 'k'); }, SC);
