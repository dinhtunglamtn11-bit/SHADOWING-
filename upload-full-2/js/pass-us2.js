import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('us');
// Hoa Kỳ · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.usjeans = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#dfe6f8', u: '#ffffff', b: '#2a4a8a', p: '#3a5fb0', l: '#2a4a8a', x: '#f5f5f5' }, patch: [[13, 5, 'y'], [13, 10, 'y'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.ustee = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#dfe6f8', u: '#ffffff', b: '#2a4a8a', p: '#2b2b3a', l: '#2b2b3a', x: '#f5f5f5' }, patch: [[11, 7, 'r'], [11, 8, 'r'], [12, 7, 'r'], [12, 8, 'r']] };
OUTM.hoodie = { map: M_TOP, pal: { ...base, t: '#8a8aa0', T: '#6b6f86', u: '#8a8aa0', b: '#6b6f86', p: '#3a3a4a', l: '#3a3a4a', x: '#f5f5f5' }, patch: [[10, 5, 'T'], [10, 6, 'T'], [10, 9, 'T'], [10, 10, 'T'], [13, 6, 'T'], [13, 7, 'T'], [13, 8, 'T'], [13, 9, 'T']] };
OUTM.varsity = { map: M_TOP, pal: { ...base, t: '#8a1a2a', T: '#e8d8a8', u: '#e8d8a8', b: '#8a1a2a', p: '#3a5fb0', l: '#3a5fb0', x: '#f5f5f5' }, patch: [[11, 5, 'y'], [11, 6, 'y'], [12, 5, 'y']] };
OUTM.jersey = { map: M_TOP, pal: { ...base, t: '#1f3fa0', T: '#e8452c', u: '#1f3fa0', b: '#e8452c', p: '#ffffff', l: '#ffffff', x: '#f5f5f5' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'w'], [12, 8, 'w'], [13, 7, 'w'], [13, 8, 'w']] };
OUTM.aloha = { map: M_TOP, pal: { ...base, t: '#2fb5b0', T: '#ff8fc8', u: '#2fb5b0', b: '#ffd84d', p: '#e4dccb', l: '#e4dccb', x: '#f5f5f5' }, patch: [[11, 5, 'T'], [11, 9, 'y'], [12, 7, 'r'], [13, 5, 'y'], [13, 10, 'T'], [14, 6, 'r'], [14, 9, 'y']] };
OUTM.ussuit = { map: M_TOP, pal: { ...base, t: '#23306b', T: '#1b1b4a', u: '#23306b', b: '#1b1b4a', p: '#23306b', l: '#23306b', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'r'], [13, 8, 'r']] };
OUTM.prom = { map: M_DRESS, pal: { ...base, t: '#7a3fc0', T: '#ffd84d', u: '#7a3fc0', b: '#ffd84d', x: '#ffd84d' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [14, 5, 'T'], [14, 10, 'T'], [16, 4, 'T'], [16, 11, 'T']] };
OUTM.western = { map: M_TOP, pal: { ...base, t: '#d94a2a', T: '#8a1a2a', u: '#d94a2a', b: '#8a5a2a', p: '#3a5fb0', l: '#3a5fb0', x: '#8a5a2a' }, patch: [[11, 4, 'T'], [11, 7, 'T'], [11, 10, 'T'], [13, 4, 'T'], [13, 7, 'T'], [13, 10, 'T'], [15, 4, 'T'], [15, 7, 'T'], [15, 10, 'T']] };
OUTM.amish = { map: M_DRESS, pal: { ...base, t: '#3a3a6a', T: '#2b2b4a', u: '#3a3a6a', b: '#2b2b4a', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 6, 'T'], [12, 9, 'T']] };
OUTM.native = { map: M_KIM, pal: { ...base, t: '#e8d8a8', T: '#e8452c', u: '#e8d8a8', b: '#2fb5b0', x: '#8a5a2a' }, patch: [[11, 5, 'T'], [11, 6, 'b'], [11, 9, 'b'], [11, 10, 'T'], [13, 4, 'T'], [13, 7, 'b'], [13, 11, 'T'], [15, 4, 'b'], [15, 11, 'b'], [17, 3, 'T'], [17, 12, 'T']] };
Object.assign(OUT_KEY, { 'us-jeans': 'usjeans', 'us-tee': 'ustee', 'us-hoodie': 'hoodie', 'us-varsity': 'varsity', 'us-jersey': 'jersey', 'us-aloha': 'aloha', 'us-suit': 'ussuit', 'us-prom': 'prom', 'us-western': 'western', 'us-amish': 'amish', 'us-native': 'native' });
Object.assign(SLOT_OF, { 'us-jeans': 'outfit', 'us-tee': 'outfit', 'us-hoodie': 'outfit', 'us-varsity': 'outfit', 'us-jersey': 'outfit', 'us-aloha': 'outfit', 'us-suit': 'outfit', 'us-prom': 'outfit', 'us-western': 'outfit', 'us-amish': 'outfit', 'us-native': 'outfit', 'us-cap': 'head', 'us-stetson': 'head', 'us-sneakers': 'feet', 'us-boots': 'feet', 'us-aviator': 'face', 'us-buckle': 'waist' });
O['us-cap'] = { y0: -1, pal: { b: '#1f3fa0', B: '#14286a', w: '#ffffff' }, rows: ['....bbbbbbbb....', '...bbbbwwbbbb...', '..bbbbbbbbbbbb..', '..bBBBBBBBBBBBBB'.slice(0, 16)] };
O['us-stetson'] = { y0: -3, pal: { n: '#8a5a2a', N: '#5a3a1a', t: '#e6c892' }, rows: ['......nnnn......', '.....nnnnnn.....', '.....NNNNNN.....', '..nnnnnnnnnnnn..', '.nnnnnnnnnnnnnn.', '..N..........N..'] };
O['us-sneakers'] = { y0: 18, pal: { w: '#ffffff', r: '#e8452c', k: '#2b2b3a' }, rows: ['...wwk....kww...', '..wwwwk..kwwww..', '..rrrrr..rrrrr..'] };
O['us-boots'] = { y0: 17, pal: { n: '#8a5a2a', N: '#5a3a1a', y: '#ffd84d' }, rows: ['...nn......nn...', '...nn......nn...', '..nyn......nyn..', '..nnnn....nnnn..', '..NNNN....NNNN..'] };
O['us-aviator'] = { y0: 5, pal: { g: '#2b2b3a', y: '#ffd84d', b: '#4a7be0' }, rows: ['....yyyyyyyy....', '....gbgyygbg....', '....ggg..ggg....'] };
O['us-buckle'] = { y0: 15, pal: { n: '#5a3a1a', y: '#ffd84d', Y: '#c9a227' }, rows: ['..nnnnnnnnnnnn..', '..nnnnyyyynnnn..'.replace('yyyy', 'yYYy')] };

add(G, A, 'us-jeans', 'Quần jeans (blue jeans)', 'Blue jeans', 'Quần vải denim xanh, ban đầu là đồ bảo hộ cho thợ mỏ và công nhân, nay mặc ở mọi tầng lớp.', null, { char: ['usjeans'], use: 'wear' });
add(G, A, 'us-tee', 'Áo thun (T-shirt)', 'T-shirt', 'Áo cotton cộc tay, từng là đồ lót của lính hải quân, sau đó trở thành áo mặc ngoài phổ biến nhất.', null, { char: ['ustee'], use: 'wear' });
add(G, A, 'us-hoodie', 'Áo hoodie và áo nỉ (sweatshirt)', 'Hoodie and sweatshirt', 'Áo nỉ có mũ trùm, mặc ở trường học và phòng tập.', null, { char: ['hoodie'], use: 'wear' });
add(G, A, 'us-varsity', 'Áo bomber và áo varsity', 'Bomber and varsity jackets', 'Áo khoác của phi công và đội tuyển trường, thường có chữ cái đính trên ngực.', null, { char: ['varsity'], use: 'wear' });
add(G, A, 'us-jersey', 'Áo thi đấu thể thao (jersey)', 'Sports jersey', 'Áo thi đấu bóng bầu dục, bóng rổ hay khúc côn cầu, người hâm mộ mặc đi học, đi làm.', null, { char: ['jersey'], use: 'wear' });
add(G, A, 'us-aloha', 'Áo sơ mi aloha', 'Aloha shirt', 'Áo hoa sặc sỡ gắn với Hawaii, vừa là đồ đi biển vừa là trang phục công sở ngày thứ sáu ở đó.', null, { char: ['aloha'], use: 'wear' });
add(G, A, 'us-suit', 'Bộ vest công sở', 'Business suit', 'Trang phục của người làm việc văn phòng, nhất là ở Wall Street và Washington.', null, { char: ['ussuit'], use: 'wear' });
add(G, A, 'us-prom', 'Váy dạ hội prom', 'Prom dress', 'Buổi dạ tiệc cuối cấp ba, học sinh diện váy dài và vest đặc biệt.', null, { char: ['prom'], use: 'wear' });
add(G, A, 'us-western', 'Trang phục cao bồi (western wear)', 'Western wear', 'Sơ mi kẻ ô, quần jeans và ủng da, còn được mặc ở Texas và miền Tây.', null, { char: ['western'], use: 'wear' });
add(G, A, 'us-amish', 'Trang phục người Amish', 'Amish clothing', 'Váy dài, nón rộng vành, giữ lối sống giản dị ở Pennsylvania và Ohio.', null, { char: ['amish'], use: 'wear' });
add(G, A, 'us-native', 'Trang phục truyền thống của các bộ lạc bản địa', 'Native American regalia', 'Trang phục thêu hạt và đồ chạm lông chim, mặc trong lễ hội powwow chứ không phải đồ đời thường.', null, { char: ['native'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'us-cap', 'Mũ lưỡi trai (baseball cap)', 'Baseball cap', 'Mũ có lưỡi, gắn với đội bóng chày và được đội khắp nơi ngoài sân vận động.',
  d => { d.bg('c'); d.e(7, 9, 6, 5, 'b'); d.r(1, 9, 14, 6, '_'); d.e(7, 9, 6, 5, 'b'); d.r(1, 9, 14, 1, 'B'); d.r(8, 9, 8, 2, 'B'); d.e(5, 7, 1.6, 1.6, 'w'); d.p('r', 5, 7); d.p('w', 2, 2, 13, 3); }, { use: 'wear' });
add(G, B, 'us-stetson', 'Mũ cao bồi Stetson', 'Stetson cowboy hat', 'Chiếc nón rộng vành biểu tượng của miền Tây.',
  d => { d.bg('u'); d.e(8, 11, 7, 2.6, 'n'); d.r(5, 4, 6, 7, 'n'); d.e(8, 4, 3, 1.6, 'N'); d.r(5, 9, 6, 1, 'N'); d.p('y', 8, 9); d.p('t', 4, 11, 12, 11); d.p('N', 1, 12, 14, 12); }, { use: 'wear' });
add(G, B, 'us-sneakers', 'Giày Converse và Nike', 'Converse and Nike sneakers', 'Giày thể thao đã thành thời trang đường phố, hai thương hiệu gắn liền với bóng rổ.',
  d => { d.bg('e'); d.r(3, 5, 5, 6, 'w'); d.r(3, 10, 10, 3, 'w'); d.r(3, 12, 11, 1, 'r'); d.r(4, 4, 3, 1, 'k'); d.p('r', 9, 10, 12, 10); d.p('k', 4, 6, 6, 8, 5, 9); d.p('a', 8, 11, 11, 11); d.r(3, 13, 11, 1, 'a'); }, { use: 'wear' });
add(G, B, 'us-boots', 'Ủng cao bồi', 'Cowboy boots', 'Ủng da gót nhọn, vừa để cưỡi ngựa vừa là thời trang vùng Texas.',
  d => { d.bg('u'); d.r(4, 1, 5, 9, 'n'); d.r(4, 9, 9, 3, 'n'); d.r(4, 1, 5, 1, 'N'); d.r(4, 12, 9, 1, 'N'); d.r(4, 13, 2, 2, 'N'); d.p('y', 5, 4, 7, 5, 6, 7, 8, 9, 10, 10, 11, 11); d.p('t', 4, 2, 4, 6); d.r(12, 11, 2, 2, 'n'); }, { use: 'wear' });
add(G, B, 'us-aviator', 'Kính Ray-Ban Aviator', 'Ray-Ban Aviator sunglasses', 'Kính phi công gọng mảnh, biểu tượng thời trang từ đầu thế kỷ hai mươi.',
  d => { d.bg('c'); d.e(5, 8, 3.2, 3, 'g'); d.e(11, 8, 3.2, 3, 'g'); d.e(5, 8, 3.2, 3, 'g'); d.e(5, 8, 2.4, 2.2, 'b'); d.e(11, 8, 2.4, 2.2, 'b'); d.l(8, 6, 8, 7, 'y'); d.l(2, 6, 0, 5, 'y'); d.l(14, 6, 15, 5, 'y'); d.p('w', 4, 7, 10, 7); d.r(2, 5, 12, 1, 'y'); }, { use: 'wear' });
add(G, B, 'us-navajo', 'Đồ trang sức bạc và ngọc lam của người Navajo', 'Navajo silver and turquoise jewellery', 'Đồ thủ công truyền thống của người bản địa Tây Nam, nghệ thuật được nhiều người sưu tầm.',
  d => { d.e(8, 6, 6, 5, 'a'); d.e(8, 6, 4.6, 3.6, '_'); d.e(8, 6, 6, 5, 'a'); d.e(8, 6, 4.6, 3.6, '_'); d.e(8, 11, 3, 3, 'l'); d.e(8, 11, 2, 2, 'c'); d.e(8, 11, 1, 1, 'C'); d.p('l', 4, 6, 12, 6, 8, 10); d.p('c', 5, 3, 11, 3); d.p('C', 8, 14); }, H);
add(G, B, 'us-tiffany', 'Hộp quà xanh Tiffany', 'Tiffany blue box', 'Màu xanh ngọc nhẹ gắn liền với nhãn hiệu trang sức New York.',
  d => { d.bg('e'); d.r(2, 6, 12, 8, 'c'); d.r(2, 6, 12, 1, 'h'); d.r(7, 6, 2, 8, 'w'); d.r(2, 9, 12, 2, 'w'); d.p('w', 5, 4, 10, 4, 4, 3, 11, 3); d.l(8, 6, 5, 3, 'w'); d.l(8, 6, 11, 3, 'w'); }, H);
add(G, B, 'us-backpack', 'Ba lô và túi tote', 'Backpacks and tote bags', 'Phụ kiện sử dụng để đi học, đi làm và mua sắm.',
  d => { d.r(3, 4, 8, 11, 'r'); d.e(7, 4, 4, 2, 'r'); d.r(3, 9, 8, 6, 'R'); d.r(5, 10, 4, 3, 'r'); d.r(4, 3, 6, 1, 'k'); d.l(11, 6, 14, 10, 'k'); d.r(12, 8, 3, 6, 'e'); d.l(12, 8, 13, 4, 'n'); d.l(14, 8, 13, 4, 'n'); d.p('y', 7, 11); }, H);
add(G, B, 'us-buckle', 'Thắt lưng khóa lớn', 'Big belt buckle', 'Phụ kiện nổi tiếng của cao bồi, thường được trao làm giải thưởng cuộc thi rodeo.',
  d => { d.bg('n'); d.r(0, 6, 16, 4, 'N'); d.r(0, 6, 16, 1, 'n'); d.r(4, 4, 8, 8, 'y'); d.r(5, 5, 6, 6, 'Y'); d.e(8, 8, 2, 2, 'y'); d.p('r', 8, 8); d.p('u', 5, 5, 10, 10); d.r(4, 4, 8, 1, 'u'); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'us-ranch', 'Nhà ngoại ô một tầng (ranch house)', 'Ranch house', 'Kiểu nhà thấp trải dài, phổ biến sau Thế chiến thứ hai khi ngoại ô phát triển.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(1, 7, 14, 6, 'e'); d.tri(0, 4, 16, 3, 'N'); d.r(5, 9, 3, 4, 'N'); d.r(2, 9, 2, 2, 'c'); d.r(10, 9, 4, 2, 'c'); d.r(11, 2, 2, 3, 'R'); d.p('W', 3, 10, 12, 10); d.p('G', 0, 11, 15, 12); }, SC);
add(G, C, 'us-colonial', 'Nhà gỗ kiểu thuộc địa Colonial', 'Colonial house', 'Nhà mặt tiền cân đối, gạch đỏ hoặc gỗ trắng, quen thuộc ở New England.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 5, 12, 8, 'w'); d.tri(1, 1, 14, 4, 'k'); d.r(11, 0, 2, 3, 'R'); for (const [x, y] of [[3, 6], [6, 6], [10, 6], [3, 9], [10, 9]]) d.r(x, y, 2, 2, 'k'); d.r(7, 9, 2, 4, 'r'); d.p('y', 8, 11); d.p('A', 3, 6, 6, 6, 10, 6); }, SC);
add(G, C, 'us-victorian', 'Nhà Victoria (Painted Ladies)', 'Victorian houses (Painted Ladies)', 'Dãy nhà gỗ nhiều màu ở San Francisco, trang trí rườm rà.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(0, 6, 5, 7, 'p'); d.tri(0, 3, 5, 3, 'P'); d.r(5, 5, 5, 8, 'y'); d.tri(5, 2, 5, 3, 'Y'); d.r(10, 6, 6, 7, 'c'); d.tri(10, 3, 6, 3, 'C'); d.p('w', 1, 8, 3, 8, 6, 7, 8, 7, 11, 8, 13, 8, 1, 10, 3, 10, 6, 10, 8, 10, 11, 10, 13, 10); d.p('r', 2, 12, 7, 12, 12, 12); }, SC);
add(G, C, 'us-brownstone', 'Nhà brownstone ở New York', 'New York brownstone', 'Nhà phố xây bằng đá nâu, cầu thang trước cửa đặc trưng.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 2, 10, 12, 'N'); d.r(3, 2, 10, 1, 'n'); for (const y of [4, 7, 10]) for (const x of [5, 9]) { d.r(x, y, 2, 2, 'k'); d.r(x - 1, y + 2, 4, 1, 'n'); } d.r(7, 11, 2, 3, 'k'); d.l(1, 15, 6, 11, 'a'); d.p('y', 2, 13, 4, 12); }, SC);
add(G, C, 'us-skyscraper', 'Cao ốc văn phòng và chung cư cao tầng', 'Office towers and high-rise apartments', 'Mỹ là nơi ra đời nhiều cao ốc đầu tiên, nhất là ở Chicago và New York.',
  d => { d.bg('B'); d.r(0, 14, 16, 2, 'a'); d.r(1, 6, 4, 8, 'K'); d.r(6, 1, 4, 13, 'A'); d.r(11, 4, 4, 10, 'K'); d.l(8, 1, 8, 0, 'a'); for (let y = 3; y < 14; y += 2) for (const x of [7, 8]) d.p('y', x, y); for (let y = 8; y < 14; y += 2) d.p('y', 2, y, 3, y, 12, y - 2, 13, y - 2); }, SC);
add(G, C, 'us-logcabin', 'Nhà gỗ trong rừng (log cabin)', 'Log cabin', 'Nhà gỗ thô mộc, biểu tượng của người khai hoang, giờ dùng làm nhà nghỉ cuối tuần.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'N'); d.r(3, 7, 10, 6, 'n'); for (let y = 7; y < 13; y += 2) d.r(3, y, 10, 1, 'N'); d.tri(2, 3, 12, 4, 'N'); d.r(11, 1, 2, 3, 'a'); d.r(7, 9, 2, 4, 'k'); d.r(4, 9, 2, 2, 'u'); d.tri(0, 5, 3, 8, 'g'); d.tri(13, 6, 3, 7, 'g'); d.p('w', 11, 0); }, SC);
add(G, C, 'us-adobe', 'Nhà gạch bùn adobe', 'Adobe house', 'Nhà tường đất sét màu nâu ở New Mexico, có gốc từ người Pueblo và người Tây Ban Nha.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'o'); d.r(2, 6, 12, 7, 'o'); d.r(2, 5, 12, 1, 'O'); d.r(6, 9, 4, 4, 'N'); d.r(3, 7, 2, 2, 'k'); d.r(11, 7, 2, 2, 'k'); d.l(1, 4, 1, 8, 'N'); d.l(4, 4, 4, 8, 'N'); d.l(8, 4, 8, 7, 'N'); d.l(12, 4, 12, 7, 'N'); d.p('r', 3, 4, 5, 4, 9, 4, 13, 4); }, SC);
add(G, C, 'us-mobile', 'Nhà di động (mobile home)', 'Mobile home', 'Loại nhà lắp sẵn kéo đi bằng xe, giá rẻ, phổ biến ở nhiều bang.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 7, 14, 5, 'w'); d.r(1, 7, 14, 1, 'a'); d.r(1, 11, 14, 1, 'b'); d.r(3, 8, 3, 3, 'c'); d.r(10, 8, 3, 3, 'c'); d.r(7, 8, 2, 4, 'N'); d.e(4, 13, 1.6, 1.6, 'k'); d.e(12, 13, 1.6, 1.6, 'k'); d.l(0, 12, 1, 12, 'a'); }, SC);
add(G, C, 'us-barn', 'Nhà trang trại đỏ và silo', 'Red barn and silo', 'Chuồng đỏ cùng tháp chứa ngũ cốc, hình ảnh quen thuộc của nông thôn Trung Tây.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 6, 8, 7, 'r'); d.tri(1, 3, 10, 3, 'R'); d.r(5, 8, 2, 5, 'w'); d.p('w', 5, 8, 6, 9, 5, 12, 6, 11); d.r(11, 4, 3, 9, 'a'); d.e(12.5, 4, 1.6, 1.4, 'A'); d.p('l', 12, 6, 12, 9); }, SC);
add(G, C, 'us-suburb', 'Nhà ngoại ô có bãi cỏ và ga-ra', 'Suburban home with a lawn and garage', 'Một giấc mơ Mỹ, mỗi nhà có sân trước cỏ xanh và đỗ xe trong nhà.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.r(1, 6, 7, 5, 'y'); d.tri(0, 3, 9, 3, 'N'); d.r(9, 8, 6, 3, 'w'); d.r(10, 8, 4, 3, 'a'); d.r(3, 8, 2, 3, 'c'); d.r(11, 6, 3, 2, 'k'); d.p('w', 0, 13, 15, 13); d.r(2, 12, 12, 1, 'a'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'us-schoolbus', 'Xe buýt vàng của trường học', 'Yellow school bus', 'Một hình ảnh đặc trưng, đưa hàng triệu trẻ mỗi sáng đến trường.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 5, 14, 7, 'y'); d.r(1, 5, 14, 1, 'o'); d.r(1, 10, 14, 1, 'k'); for (const x of [2, 5, 8, 11]) d.r(x, 6, 2, 2, 'c'); d.r(14, 7, 1, 3, 'k'); d.e(4, 12, 1.8, 1.8, 'k'); d.e(12, 12, 1.8, 1.8, 'k'); d.p('r', 14, 5, 1, 5); }, SC);
add(G, E, 'us-pickup', 'Xe bán tải (pickup truck)', 'Pickup truck', 'Loại xe được yêu thích ở nông thôn và miền Nam, để chở đồ và kéo rơ-moóc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(8, 6, 6, 6, 'r'); d.r(9, 7, 4, 2, 'c'); d.r(1, 8, 7, 4, 'R'); d.r(1, 8, 7, 1, 'r'); d.r(0, 11, 15, 1, 'k'); d.e(4, 12, 1.8, 1.8, 'k'); d.e(12, 12, 1.8, 1.8, 'k'); d.e(4, 12, 0.8, 0.8, 'a'); d.e(12, 12, 0.8, 0.8, 'a'); }, SC);
add(G, E, 'us-mailbox', 'Hộp thư ven đường (mailbox)', 'Roadside mailbox', 'Hộp thư gắn trên cột trước nhà ở ngoại ô.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(7, 8, 2, 7, 'N'); d.r(3, 4, 10, 5, 'b'); d.e(8, 4, 5, 2, 'b'); d.r(3, 8, 10, 1, 'B'); d.r(12, 2, 1, 4, 'r'); d.r(11, 2, 2, 1, 'r'); d.p('w', 5, 6, 8, 6); }, H);
add(G, E, 'us-masonjar', 'Lọ thủy tinh Mason jar', 'Mason jar', 'Lọ miệng rộng nắp vặn dùng để muối dưa, chứa nước uống và trang trí.',
  d => { d.r(4, 1, 8, 2, 'a'); d.r(4, 1, 8, 1, 'l'); d.r(5, 3, 6, 1, 'A'); d.r(3, 4, 10, 10, 'l'); d.r(4, 5, 8, 8, 'c'); d.r(4, 5, 8, 2, 'w'); d.p('w', 5, 8, 5, 10); d.p('r', 6, 10, 9, 11, 7, 12); d.r(3, 14, 10, 1, 'a'); }, H);
add(G, E, 'us-solocup', 'Cốc đỏ Solo', 'Red Solo cup', 'Chiếc cốc nhựa đỏ xuất hiện ở mọi buổi tiệc của sinh viên.',
  d => { d.tri(3, 2, 10, 12, 'r'); d.r(3, 2, 10, 2, 'R'); d.r(2, 2, 12, 1, 'w'); d.r(4, 7, 8, 1, 'R'); d.r(5, 10, 6, 1, 'R'); d.r(5, 13, 6, 1, 'R'); d.p('w', 5, 4); }, H);
add(G, E, 'us-cooler', 'Thùng đá cách nhiệt (cooler)', 'Cooler', 'Đồ mang theo khi cắm trại, cùng nhà làm đồ nướng ngoài trời.',
  d => { d.r(2, 6, 12, 8, 'b'); d.r(2, 6, 12, 2, 'w'); d.r(2, 7, 12, 1, 'a'); d.r(6, 4, 4, 2, 'a'); d.r(6, 4, 4, 1, 'l'); d.r(0, 8, 2, 3, 'a'); d.r(14, 8, 2, 3, 'a'); d.p('w', 5, 10, 10, 12); d.r(2, 14, 12, 1, 'B'); }, H);
add(G, E, 'us-grill', 'Máy nướng BBQ (grill)', 'BBQ grill', 'Vật không thể thiếu ở sân sau của nhiều gia đình vào mùa hè.',
  d => { d.e(8, 6, 6, 4, 'k'); d.r(2, 6, 12, 1, 'a'); d.r(3, 7, 10, 3, 'k'); d.p('r', 5, 9, 8, 9, 11, 9); d.l(5, 10, 3, 15, 'a'); d.l(11, 10, 13, 15, 'a'); d.l(8, 10, 8, 15, 'a'); d.p('w', 6, 3, 9, 1, 11, 3); d.r(14, 5, 1, 3, 'a'); }, SC);
add(G, E, 'us-quilt', 'Chăn quilt', 'Quilt', 'Chăn khâu từ nhiều mảnh vải, được truyền lại trong nhiều gia đình ở nông thôn.',
  d => { d.r(1, 1, 14, 14, 'k'); for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) d.r(2 + x * 4, 2 + y * 4, 4, 4, ['r', 'y', 'b', 'g', 'w', 'p', 'o', 'c', 'v'][(x + y * 3) % 9]); for (let i = 2; i < 14; i += 4) { d.p('k', i, 2, i, 13, 2, i, 13, i); } }, SC);
add(G, E, 'us-rockingchair', 'Ghế bập bênh (rocking chair)', 'Rocking chair', 'Đồ nội thất ngoài hiên nhà ở miền Nam và New England.',
  d => { d.l(4, 1, 4, 11, 'N'); d.l(5, 1, 5, 11, 'n'); d.l(4, 4, 10, 4, 'N'); d.l(4, 6, 10, 6, 'n'); d.r(4, 10, 9, 2, 'n'); d.l(10, 10, 12, 4, 'N'); d.l(3, 14, 6, 15, 'N'); d.l(6, 15, 12, 15, 'N'); d.l(12, 15, 14, 13, 'N'); d.l(5, 12, 5, 14, 'N'); d.l(11, 12, 11, 14, 'N'); }, SC);
add(G, E, 'us-appliances', 'Đồ điện gia dụng cỡ lớn', 'Large home appliances', 'Tủ lạnh hai cánh, máy giặt và máy sấy trong nhà giặt riêng là điều quen thuộc ở nhiều gia đình.',
  d => { d.bg('e'); d.r(1, 1, 6, 14, 'w'); d.r(1, 1, 6, 14, 'l'); d.r(1, 7, 6, 1, 'a'); d.r(6, 3, 1, 3, 'a'); d.r(6, 9, 1, 4, 'a'); d.r(9, 7, 6, 8, 'w'); d.r(9, 7, 6, 1, 'a'); d.e(12, 11, 2.4, 2.4, 'a'); d.e(12, 11, 1.6, 1.6, 'c'); d.p('r', 10, 8); d.p('b', 12, 8); }, SC);
