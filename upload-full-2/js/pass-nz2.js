import { add, SC, setCC, OUTM, M_TOP, M_KIM, M_HAK } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('nz');
// New Zealand · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.nzmerino = { map: M_TOP, pal: { ...base, t: '#7a8aa8', T: '#5a6a88', u: '#7a8aa8', b: '#5a6a88', p: '#3a3a4a', l: '#3a3a4a' }, patch: [[10, 6, 'T'], [10, 9, 'T'], [12, 5, 'T'], [12, 10, 'T']] };
OUTM.swanndri = { map: M_TOP, pal: { ...base, t: '#2f5a3a', T: '#1b1b1b', u: '#2f5a3a', b: '#1b1b1b', p: '#3a3a4a', l: '#3a3a4a' }, patch: [[10, 4, 'T'], [10, 7, 'T'], [10, 11, 'T'], [12, 4, 'T'], [12, 7, 'T'], [12, 11, 'T'], [14, 4, 'T'], [14, 7, 'T'], [14, 11, 'T']] };
OUTM.allblacks = { map: M_TOP, pal: { ...base, t: '#1b1b1b', T: '#444444', u: '#1b1b1b', b: '#444444', p: '#1b1b1b', l: '#1b1b1b' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [12, 7, 'w'], [12, 8, 'w'], [13, 8, 'w'], [13, 9, 'w']] };
OUTM.nzcasual = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#dfe6f8', u: '#ffffff', b: '#e8452c', p: '#3a5fb0', l: '#e8c892', x: '#e8c892' }, patch: [[11, 7, 'c'], [12, 7, 'c']] };
OUTM.kahu = { map: M_KIM, pal: { ...base, t: '#c89a5a', T: '#7a4a1a', u: '#c89a5a', b: '#2b1d3a', x: '#8a5a2a' }, patch: [[11, 4, 'w'], [11, 9, 'w'], [13, 5, 'y'], [13, 10, 'y'], [15, 4, 'w'], [15, 11, 'w'], [17, 3, 'T'], [17, 12, 'T']] };
OUTM.piupiu = { map: M_HAK, pal: { ...base, t: '#e8d8a8', T: '#2b1d3a', u: '#e8d8a8', b: '#2b1d3a', p: '#c8a46a', P: '#8a5a2a', x: '#8a5a2a' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [14, 5, 'r'], [14, 10, 'r']] };
OUTM.nzsuit = { map: M_TOP, pal: { ...base, t: '#3a3f5a', T: '#2b2f48', u: '#3a3f5a', b: '#2b2f48', p: '#3a3f5a', l: '#3a3f5a', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'g'], [12, 8, 'g']] };
Object.assign(OUT_KEY, { 'nz-merino': 'nzmerino', 'nz-swanndri': 'swanndri', 'nz-allblacks': 'allblacks', 'nz-casual': 'nzcasual', 'nz-kahu': 'kahu', 'nz-piupiu': 'piupiu', 'nz-suit': 'nzsuit' });
Object.assign(SLOT_OF, { 'nz-merino': 'outfit', 'nz-swanndri': 'outfit', 'nz-allblacks': 'outfit', 'nz-casual': 'outfit', 'nz-kahu': 'outfit', 'nz-piupiu': 'outfit', 'nz-suit': 'outfit', 'nz-jandals': 'feet', 'nz-gumboots': 'feet', 'nz-beanie': 'head', 'nz-shades': 'face' });
O['nz-beanie'] = { y0: -1, pal: { b: '#8a1a2a', B: '#5a0f1a', w: '#ffffff' }, rows: ['.....bbbbbb.....', '...bbbbwwbbbb...', '..bbbbbbbbbbbb..', '..BBBBBBBBBBBB..'] };
O['nz-shades'] = { y0: 5, pal: { g: '#2b2b3a', b: '#4a7be0' }, rows: ['....gggggggg....', '....gbbggbbg....', '....ggg..ggg....'] };
O['nz-jandals'] = { y0: 18, pal: { r: '#e8452c', k: '#2b2b3a' }, rows: ['...rr......rr...', '..rrrr....rrrr..', '..kkkk....kkkk..'] };
O['nz-gumboots'] = { y0: 17, pal: { n: '#4a3a1a', N: '#2b2b2b', y: '#ffd84d' }, rows: ['...nn......nn...', '...nn......nn...', '..nnn......nnn..', '..nnnn....nnnn..', '..NNNN....NNNN..'] };

add(G, A, 'nz-merino', 'Áo len màu merino', 'Merino wool sweater', 'Len cừu merino mềm và ấm, rất phổ biến trong áo len, áo lót và đồ thoải mái, có những thương hiệu nổi tiếng thế giới.', null, { char: ['nzmerino'], use: 'wear' });
add(G, A, 'nz-swanndri', 'Áo Swanndri', 'Swanndri jacket', 'Áo khoác len dày màu tối của người làm nông nghiệp và thợ săn, chống mưa lạnh rất tốt.', null, { char: ['swanndri'], use: 'wear' });
add(G, A, 'nz-allblacks', 'Áo đội tuyển All Blacks', 'All Blacks jersey', 'Áo đen của đội bóng bầu dục rugby quốc gia, nhiều người mặc đi để ủng hộ.', null, { char: ['allblacks'], use: 'wear' });
add(G, A, 'nz-casual', 'Quần short và áo thun', 'Shorts and a T-shirt', 'Trang phục của nhiều người dân, kể cả đi siêu thị hoặc lái xe, thường đi chân đất.', null, { char: ['nzcasual'], use: 'wear' });
add(G, A, 'nz-jandals', 'Dép jandals (dép xỏ ngón)', 'Jandals (flip-flops)', 'Cách gọi dép xỏ ngón của người New Zealand, mặc quanh năm ở vùng ven biển.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'y'); d.r(3, 4, 4, 9, 'r'); d.e(5, 4, 2, 1.4, 'r'); d.r(9, 4, 4, 9, 'r'); d.e(11, 4, 2, 1.4, 'r'); d.l(5, 6, 5, 9, 'k'); d.l(5, 7, 3, 9, 'k'); d.l(11, 6, 11, 9, 'k'); d.l(11, 7, 9, 9, 'k'); d.p('w', 2, 14, 13, 15); }, { use: 'wear' });
add(G, A, 'nz-gumboots', 'Giày gumboots (ủng cao su)', 'Gumboots', 'Ủng cao su cao cổ cho nông dân, sân trại và cả những ngày đất ướt.',
  d => { d.bg('u'); d.r(3, 1, 4, 11, 'n'); d.r(3, 10, 7, 3, 'n'); d.r(3, 1, 4, 1, 'N'); d.r(3, 13, 7, 1, 'N'); d.r(9, 1, 4, 11, 'n'); d.r(9, 10, 6, 3, 'n'); d.r(9, 1, 4, 1, 'N'); d.r(9, 13, 6, 1, 'N'); d.p('y', 4, 4, 10, 4); d.p('t', 3, 3, 9, 3); }, { use: 'wear' });
add(G, A, 'nz-kahu', 'Kahu huruhuru và kahu kiwi (áo choàng lông chim)', 'Feather cloaks (kahu huruhuru, kahu kiwi)', 'Áo choàng của người Māori dệt từ sợi lanh và gắn lông chim, dành cho người có vị thế trong bộ tộc.', null, { char: ['kahu'], use: 'wear' });
add(G, A, 'nz-piupiu', 'Piupiu', 'Piupiu', 'Váy sợi lanh cuộn tròn, mặc trong các buổi biểu diễn kapa haka và lễ hội.', null, { char: ['piupiu'], use: 'wear' });
add(G, A, 'nz-tamoko', 'Tā moko (xăm truyền thống)', 'Tā moko (traditional tattoo)', 'Hình xăm xoắn ốc trên mặt và cơ thể của người Māori, mỗi hình kể về dòng dõi và bản sắc riêng.',
  d => { d.bg('e'); d.e(8, 8, 5, 6.4, 's'); d.p('e', 5, 7, 11, 7); d.p('k', 5, 7, 11, 7); d.p('m', 8, 12); d.spiral(5, 9, 1, 'k'); d.spiral(11, 9, 1, 'k'); d.l(7, 3, 7, 5, 'k'); d.l(9, 3, 9, 5, 'k'); d.p('N', 8, 4, 5, 3, 11, 3); }, SC);
add(G, A, 'nz-suit', 'Đồ vest công sở và đồ đi biển', 'Business wear and beachwear', 'Những người làm văn phòng ở Auckland và Wellington mặc gọn gàng, nhưng không quá trang trọng.', null, { char: ['nzsuit'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'nz-pounamu', 'Pounamu (ngọc xanh)', 'Pounamu (greenstone)', 'Loại đá ngọc xanh lá của Đảo Nam, được người Māori xem là báu vật và dùng làm đồ trang sức, vũ khí và dụng cụ.',
  d => { d.e(8, 8, 5, 6, 'g'); d.e(7, 6, 3, 3, 'h'); d.e(8, 8, 5, 6, 'g'); d.e(7, 6, 2.4, 2.6, 'h'); d.p('G', 10, 11, 11, 9, 6, 12, 8, 13); d.p('w', 6, 4); d.p('G', 4, 8); }, H);
add(G, B, 'nz-heitiki', 'Hei-tiki', 'Hei-tiki', 'Món hình người nhỏ chạm bằng pounamu, đeo trên cổ, thường được truyền lại qua nhiều đời.',
  d => { d.e(8, 6, 3, 3, 'g'); d.r(6, 9, 4, 4, 'g'); d.l(6, 10, 3, 8, 'g'); d.l(9, 10, 12, 8, 'g'); d.l(7, 13, 5, 15, 'g'); d.l(9, 13, 11, 15, 'g'); d.p('G', 7, 5, 9, 5, 8, 8); d.p('h', 6, 5); d.p('c', 8, 1); d.p('k', 8, 2); }, H);
add(G, B, 'nz-koru', 'Koru', 'Koru', 'Hình xoắn ốc lấy cảm hứng từ mầm dương xỉ đang bật ra, biểu tượng của sự sống mới, có trên mặt dây chuyền và logo.',
  d => { d.bg('k'); d.spiral(8, 8, 2, 'h'); d.spiral(8, 8, 1.6, 'g'); d.l(8, 10, 8, 15, 'h'); d.p('g', 7, 4, 9, 11); d.p('w', 8, 8); }, SC);
add(G, B, 'nz-heimatau', 'Hei matau', 'Hei matau (fish hook)', 'Móc câu cá chạm bằng xương hoặc ngọc, biểu tượng của sự an toàn khi đi biển và sự thịnh vượng.',
  d => { d.l(9, 1, 9, 10, 'W'); d.r(8, 1, 2, 2, 'W'); d.e(7, 10, 3, 3, 'W'); d.e(7, 10, 1.4, 1.4, '_'); d.l(4, 10, 4, 5, 'W'); d.p('w', 9, 4, 4, 6); d.p('t', 9, 8, 6, 12); d.p('k', 9, 0); }, H);
add(G, B, 'nz-carving', 'Đồ chạm xương và gỗ', 'Bone and wood carving', 'Nghệ nhân Māori chạm khắc với nhiều họa tiết truyền thống, bán ở nhiều cửa hàng lưu niệm.',
  d => { d.r(5, 2, 6, 13, 'n'); d.e(8, 4, 3.4, 3, 'N'); d.p('w', 7, 4, 9, 4); d.p('k', 7, 4, 9, 4); d.p('r', 8, 6); d.l(6, 8, 10, 8, 'N'); d.l(6, 10, 10, 10, 'N'); d.l(6, 12, 10, 12, 'N'); d.p('t', 6, 9, 9, 11, 7, 13); }, H);
add(G, B, 'nz-beanie', 'Khăn len và mũ len', 'Scarves and beanies', 'Phụ kiện cần thiết cho mùa đông ở miền nam.',
  d => { d.bg('l'); d.e(8, 9, 5, 5, 'r'); d.r(2, 9, 12, 6, '_'); d.e(8, 9, 5, 5, 'r'); d.r(2, 9, 12, 5, 'r'); d.r(2, 12, 12, 3, 'R'); d.e(8, 2, 1.6, 1.6, 'w'); d.p('w', 5, 7, 8, 8, 11, 7); d.p('R', 4, 10, 8, 10, 12, 10); }, { use: 'wear' });
add(G, B, 'nz-ketebag', 'Túi kete dệt', 'Woven kete bag', 'Giỏ dệt từ sợi lanh (harakeke), dùng để đựng đồ trong nhiều gia đình Māori.',
  d => { d.r(3, 5, 10, 9, 't'); d.l(5, 5, 8, 1, 'n'); d.l(11, 5, 8, 1, 'n'); for (let y = 6; y < 14; y += 2) d.r(3, y, 10, 1, 'n'); for (let x = 4; x < 13; x += 3) d.r(x, 6, 1, 8, 'u'); d.r(3, 13, 10, 1, 'N'); }, H);
add(G, B, 'nz-shades', 'Kính râm và kem chống nắng', 'Sunglasses and sunscreen', 'Vật dụng quan trọng vì lớp ozone mỏng ở vùng này, tia cực tím mạnh.',
  d => { d.bg('y'); d.e(5, 8, 3.2, 2.8, 'k'); d.e(11, 8, 3.2, 2.8, 'k'); d.r(7, 7, 2, 1, 'k'); d.l(2, 7, 0, 6, 'k'); d.l(14, 7, 15, 6, 'k'); d.p('b', 4, 7, 10, 7); d.p('w', 3, 7, 9, 7); d.r(5, 12, 6, 3, 'o'); d.r(6, 11, 4, 1, 'w'); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'nz-villa', 'Nhà gỗ một tầng (bungalow/villa)', 'Timber bungalow and villa', 'Kiểu nhà gỗ mái tôn, thấp tầng, phổ biến từ cuối thế kỷ mười chín đến đầu thế kỷ hai mươi.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 7, 12, 6, 'w'); d.tri(1, 3, 14, 4, 'r'); d.r(4, 8, 3, 3, 'c'); d.r(9, 8, 3, 3, 'c'); d.r(7, 10, 2, 3, 'n'); d.p('k', 5, 9, 10, 9); d.p('W', 2, 12, 13, 12); }, SC);
add(G, C, 'nz-quarteracre', 'Giấc mơ bốn mươi mét vuông (quarter-acre dream)', 'The quarter-acre dream', 'Ước mơ có một mảnh đất riêng, một ngôi nhà và một khu vườn.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'h'); d.r(4, 6, 8, 5, 'w'); d.tri(3, 3, 10, 3, 'R'); d.r(7, 8, 2, 3, 'n'); d.e(2, 8, 2, 3, 'g'); d.r(1, 11, 1, 2, 'N'); d.p('r', 13, 13, 14, 14, 11, 14); d.p('y', 12, 14); d.p('W', 0, 15, 15, 15); }, SC);
add(G, C, 'nz-bach', 'Bach (crib) để nghỉ', 'Bach (crib) holiday house', 'Ngôi nhà nhỏ giản dị ở bãi biển, ở Đảo Nam gọi là crib, dùng làm nơi nghỉ cuối tuần.',
  d => { d.bg('c'); d.r(0, 8, 16, 3, 'C'); d.r(0, 11, 16, 5, 'y'); d.r(4, 6, 8, 6, 'c'); d.r(4, 5, 8, 1, 'w'); d.tri(3, 3, 10, 2, 'o'); d.r(7, 8, 2, 4, 'N'); d.p('w', 1, 9, 14, 9); d.p('Y', 2, 14, 12, 15); d.p('r', 13, 12); }, SC);
add(G, C, 'nz-wharenui', 'Wharenui (nhà họp lớn)', 'Wharenui (meeting house)', 'Ngôi nhà chính của marae, mái dốc, cột gỗ chạm khắc, tượng trưng cho tổ tiên của bộ tộc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 8, 12, 5, 'R'); d.tri(1, 3, 14, 5, 'n'); d.p('r', 7, 3, 8, 2, 9, 3); d.r(6, 9, 4, 4, 'k'); d.p('w', 3, 10, 12, 10, 4, 12, 11, 12); d.l(1, 8, 8, 3, 'N'); d.l(14, 8, 8, 3, 'N'); d.p('y', 8, 7); }, SC);
add(G, C, 'nz-marae', 'Marae', 'Marae', 'Khu đất cộng đồng của Māori với nhà họp, nhà ăn, nơi tổ chức lễ cưới, tang lễ và các cuộc họp.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'h'); d.r(0, 11, 16, 1, 'u'); d.r(5, 5, 7, 5, 'R'); d.tri(4, 2, 9, 3, 'n'); d.r(7, 7, 3, 3, 'k'); d.r(0, 8, 4, 2, 'e'); d.p('w', 1, 10, 3, 10, 12, 13, 14, 14); d.p('k', 3, 13, 6, 14, 9, 13); }, SC);
add(G, C, 'nz-pa', 'Pā (làng phòng thủ)', 'Pā (fortified village)', 'Làng có hàng rào gỗ và hào xây trên đồi, dùng để bảo vệ dân làng thời chiến tranh giữa các bộ tộc.',
  d => { d.bg('c'); d.tri(0, 6, 16, 10, 'G'); for (let x = 2; x < 15; x += 2) { d.r(x, 6, 1, 5, 'N'); d.p('n', x, 5); } d.r(0, 11, 16, 1, 'N'); d.r(5, 8, 6, 3, 'R'); d.r(7, 9, 2, 2, 'k'); d.r(0, 14, 16, 2, 'n'); }, SC);
add(G, C, 'nz-pataka', 'Pātaka', 'Pātaka (raised storehouse)', 'Kho nhỏ đặt trên cột cao để chứa lương thực, tránh chuột và ẩm ướt.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(4, 9, 1, 5, 'N'); d.r(11, 9, 1, 5, 'N'); d.r(3, 5, 10, 4, 'n'); d.tri(2, 2, 12, 3, 'N'); d.r(7, 6, 2, 3, 'k'); d.p('R', 4, 6, 11, 6); d.l(8, 9, 6, 14, 'N'); d.p('t', 5, 8, 10, 8); }, SC);
add(G, C, 'nz-napier', 'Nhà thời Art Deco ở Napier', 'Art Deco architecture in Napier', 'Sau trận động đất năm 1931, thành phố được xây lại theo phong cách Art Deco, nay là điểm du lịch.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 4, 12, 10, 'p'); d.r(2, 3, 12, 1, 'P'); d.r(4, 1, 8, 2, 'p'); d.p('y', 8, 0); for (const x of [4, 7, 10]) { d.r(x, 6, 2, 3, 'B'); d.r(x, 10, 2, 3, 'B'); } d.p('P', 2, 9, 13, 9); d.r(7, 12, 2, 2, 'k'); }, SC);
add(G, C, 'nz-aucklandflat', 'Nhà chung cư ở Auckland', 'Apartment blocks in Auckland', 'Thành phố đông dân nhất phải xây nhiều cao ốc để đáp ứng nhu cầu nhà ở.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 5, 5, 9, 'A'); d.r(6, 2, 4, 12, 'K'); d.r(10, 6, 5, 8, 'a'); for (const [x, y] of [[2, 6], [4, 6], [2, 9], [4, 9], [7, 3], [8, 3], [7, 6], [8, 6], [7, 9], [8, 9], [11, 7], [13, 7], [11, 10], [13, 10]]) d.p('y', x, y); d.p('w', 3, 1); }, SC);
add(G, C, 'nz-quakehouse', 'Nhà gỗ chống động đất', 'Earthquake-resistant timber house', 'Nhà gỗ nhẹ và có khả năng chịu rung lắc, phù hợp vùng đất hay có động đất.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'N'); d.r(3, 7, 10, 6, 'W'); d.tri(2, 3, 12, 4, 'N'); d.r(6, 9, 4, 4, 'k'); d.l(3, 7, 13, 13, 'n'); d.l(13, 7, 3, 13, 'n'); d.l(1, 14, 3, 12, 'r'); d.l(15, 14, 13, 12, 'r'); d.p('y', 7, 11); }, SC);

// ----- Đồ dùng -----
add(G, E, 'nz-ketebasket', 'Kete (giỏ sợi lanh)', 'Kete (flax basket)', 'Đồ đựng dệt từ lá lanh, có nhiều cỡ và họa tiết.',
  d => { d.bg('e'); d.e(8, 9, 6, 5, 't'); d.r(2, 4, 12, 5, '_'); d.e(8, 9, 6, 5, 't'); d.r(2, 9, 12, 1, '_'); d.e(8, 9, 6, 5, 't'); d.r(1, 5, 14, 4, '_'); d.r(2, 7, 12, 7, 't'); d.l(4, 7, 8, 2, 'n'); d.l(12, 7, 8, 2, 'n'); d.p('n', 3, 9, 7, 9, 11, 9, 5, 12, 9, 12); d.p('u', 4, 10, 8, 11); }, H);
add(G, E, 'nz-waka', 'Waka (thuyền độc mộc)', 'Waka (canoe)', 'Thuyền dài chạm khắc của người Māori, từng dùng để đi biển và chiến đấu.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(1, 9, 14, 2, 'N'); d.tri(0, 6, 3, 4, 'R'); d.tri(13, 6, 3, 4, 'R'); d.r(1, 8, 14, 1, 'n'); for (const x of [4, 6, 8, 10, 12]) d.l(x, 7, x - 1, 11, 'W'); d.p('w', 2, 13, 12, 14); d.p('l', 5, 12, 10, 15); }, SC);
add(G, E, 'nz-toki', 'Toki (rìu đá)', 'Toki (stone adze)', 'Dụng cụ và vũ khí làm từ ngọc pounamu hoặc đá cứng.',
  d => { d.l(4, 14, 11, 4, 'n'); d.l(5, 14, 12, 4, 'N'); d.e(11, 5, 3, 3, 'g'); d.e(11, 5, 3, 3, 'g'); d.p('G', 13, 7, 12, 8); d.p('h', 10, 4, 11, 3); d.p('t', 5, 13, 7, 10); }, H);
add(G, E, 'nz-hangi', 'Hāngi (lò đất)', 'Hāngi (earth oven)', 'Hố đào để nấu chầm bằng đá nóng, dùng cho những bữa ăn lớn.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'n'); d.e(8, 11, 6, 3, 'N'); d.e(8, 11, 5, 2.2, 'k'); d.p('r', 5, 11, 8, 12, 11, 11); d.p('o', 6, 12, 10, 12); d.p('a', 4, 10, 12, 10); d.p('w', 6, 6, 9, 4, 8, 7, 11, 6, 7, 2); }, SC);
add(G, E, 'nz-buzzybee', 'Buzzy Bee', 'Buzzy Bee', 'Đồ chơi gỗ hình con ong có bánh xe, ra đời từ thập niên 1930, quen thuộc với nhiều thế hệ trẻ em.',
  d => { d.e(8, 8, 4, 3, 'y'); d.r(6, 5, 1, 6, 'k'); d.r(9, 5, 1, 6, 'k'); d.e(12, 7, 2, 2, 'y'); d.p('k', 13, 6); d.e(5, 4, 2, 2, 'l'); d.e(9, 3, 2, 2, 'l'); d.p('r', 14, 8); d.e(5, 13, 1.6, 1.6, 'r'); d.e(10, 13, 1.6, 1.6, 'r'); d.l(5, 11, 5, 13, 'N'); d.l(10, 11, 10, 13, 'N'); }, H);
add(G, E, 'nz-edmonds', 'Sách nấu ăn Edmonds', 'Edmonds Cookery Book', 'Cuốn công thức lâu đời có mặt trong rất nhiều gia đình.',
  d => { d.r(3, 2, 10, 13, 'r'); d.r(3, 2, 10, 1, 'R'); d.r(4, 4, 8, 4, 'e'); d.p('R', 5, 5, 6, 6, 8, 5, 10, 6); d.e(8, 11, 2.4, 2, 'y'); d.r(3, 14, 10, 1, 'R'); d.p('w', 5, 3); }, H);
add(G, E, 'nz-jug', 'Ấm đun nước điện (jug)', 'Electric jug', 'Cái ấm đun nước nhanh để pha trà và cà phê.',
  d => { d.r(4, 4, 7, 10, 'a'); d.r(4, 14, 7, 1, 'A'); d.r(5, 2, 5, 2, 'A'); d.r(6, 1, 3, 1, 'k'); d.l(11, 5, 13, 6, 'A'); d.l(13, 6, 13, 11, 'A'); d.l(13, 11, 11, 12, 'A'); d.r(5, 7, 1, 5, 'c'); d.p('y', 8, 14); d.p('w', 5, 5, 8, 6); }, H);
add(G, E, 'nz-bbq', 'Bàn đồ ăn BBQ ở sân sau', 'Backyard barbecue', 'Vật không thể thiếu cho những buổi tiệc mùa hè.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'h'); d.r(3, 8, 10, 3, 'k'); d.e(8, 8, 5, 2, 'K'); d.r(3, 8, 10, 1, 'a'); d.l(4, 11, 3, 15, 'k'); d.l(12, 11, 13, 15, 'k'); d.p('r', 5, 7, 8, 6, 11, 7); d.p('w', 7, 3, 9, 1, 8, 4); d.p('o', 6, 9, 10, 9); }, SC);
add(G, E, 'nz-teapot', 'Đồ pha trà và chiếc bình trà', 'Tea set and teapot', 'Trà chiều là thói quen kế thừa từ người Anh.',
  d => { d.e(7, 9, 5, 4, 'w'); d.r(5, 4, 4, 2, 'w'); d.p('r', 7, 3); d.l(12, 7, 14, 9, 'w'); d.l(14, 9, 12, 12, 'w'); d.l(2, 7, 0, 5, 'w'); d.p('c', 4, 8, 6, 10, 9, 8); d.p('P', 5, 7, 10, 10); d.r(3, 13, 9, 1, 'l'); }, H);
